// Certificate content verifier
// Extracts text from image (OCR) or PDF and checks for certificate keywords

// Keywords that must appear in a real certificate
const CERT_REQUIRED = [
  ['certificate', 'certification', 'certified', 'certify'],   // cert word
  ['completion', 'complete', 'completed', 'successfully'],     // completion word
  ['course', 'program', 'training', 'learning', 'module'],     // course word
]

// Keywords that strengthen the match (at least 1 needed)
const CERT_SUPPORTING = [
  'awarded', 'presented', 'congratulations', 'achievement',
  'udemy', 'coursera', 'edx', 'pluralsight', 'linkedin',
  'google', 'microsoft', 'amazon', 'aws', 'ibm',
  'hours', 'credential', 'verify', 'issued', 'date',
  'instructor', 'student', 'learner', 'graduate',
]

export async function extractTextFromCertificate(file) {
  const isPDF = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')
  const isImage = file.type.startsWith('image/')

  if (isPDF) {
    return await extractFromPDF(file)
  } else if (isImage) {
    return await extractFromImage(file)
  }
  return ''
}

async function extractFromPDF(file) {
  try {
    const pdfjsLib = await import('pdfjs-dist')
    pdfjsLib.GlobalWorkerOptions.workerSrc =
      'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js'
    const buf = await file.arrayBuffer()
    const pdf = await pdfjsLib.getDocument({ data: buf }).promise
    let text = ''
    for (let i = 1; i <= Math.min(pdf.numPages, 3); i++) {
      const page = await pdf.getPage(i)
      const content = await page.getTextContent()
      text += content.items.map(item => item.str).join(' ') + ' '
    }
    return text.toLowerCase()
  } catch (err) {
    console.error('PDF cert extraction error:', err)
    return ''
  }
}

async function extractFromImage(file) {
  try {
    const { createWorker } = await import('tesseract.js')
    const worker = await createWorker('eng', 1, {
      workerPath: 'https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/worker.min.js',
      langPath: 'https://tessdata.projectnaptha.com/4.0.0',
      corePath: 'https://cdn.jsdelivr.net/npm/tesseract.js-core@5/tesseract-core-simd-lstm.wasm.js',
      logger: () => {}, // suppress logs
    })
    const { data: { text } } = await worker.recognize(file)
    await worker.terminate()
    return text.toLowerCase()
  } catch (err) {
    console.error('OCR error:', err)
    return ''
  }
}

export function verifyCertificateContent(text, course, userName = '') {
  if (!text || text.trim().length < 20) {
    return { valid: false, reason: 'no_text', message: 'Could not read any text from this file. Please upload a clear certificate image or PDF.' }
  }

  const lower = text.toLowerCase()
  let score = 0
  const details = []

  // 1. IDENTITY CHECK (40 pts)
  if (userName && userName.length > 2) {
    // Split name and check for all parts (e.g., "John Doe" -> "john" and "doe")
    const nameParts = userName.toLowerCase().split(/\s+/).filter(p => p.length > 1)
    const matchedParts = nameParts.filter(part => lower.includes(part))
    
    if (matchedParts.length === nameParts.length) {
      score += 40
      details.push('Identity matched (User Name found)')
    } else if (matchedParts.length > 0) {
      score += 20
      details.push('Identity partially matched')
    } else {
      details.push('IDENTITY FAILED: Name not found on certificate')
    }
  } else {
    details.push('Identity check skipped (No name in profile)')
  }

  // 2. PROVIDER LOCK (15 pts)
  const provider = course.provider.toLowerCase()
  if (lower.includes(provider)) {
    score += 15
    details.push(`Platform matched: ${course.provider}`)
  } else {
    details.push(`PLATFORM MISMATCH: Expected ${course.provider}`)
  }

  // 3. TITLE PRECISION (30 pts)
  const commonWords = ['complete', 'masterclass', 'guide', 'bootcamp', 'professional', 'specialization', 'certificate', 'certification', 'course', 'with', 'from', 'basics', 'advanced', 'beginner', 'intermediate', 'incl', 'including', 'the', 'and']
  const titleWords = course.title.toLowerCase()
    .split(/[\s,()&-]+/)
    .filter(w => w.length > 3 && !commonWords.includes(w))
  
  const uniqueTitleWords = [...new Set(titleWords)]
  if (uniqueTitleWords.length > 0) {
    const matchedTitleWords = uniqueTitleWords.filter(w => lower.includes(w))
    const titleMatchRatio = matchedTitleWords.length / uniqueTitleWords.length
    
    if (titleMatchRatio >= 0.7) score += 30
    else if (titleMatchRatio >= 0.4) score += 15
    
    details.push(`Course Title Match: ${Math.round(titleMatchRatio * 100)}%`)
  } else {
    // Fallback for very short titles
    if (lower.includes(course.title.toLowerCase())) score += 30
    details.push('Course Title: Exact match')
  }

  // 4. AUTHENTICITY MARKERS (15 pts)
  const structuralMarkers = [
    'successfully completed', 'has completed', 'awarded to', 'this is to certify',
    'certificate of', 'completion', 'achievement', 'recognition',
    'credential id', 'serial number', 'verify at', 'issued on',
  ]
  const foundMarkers = structuralMarkers.filter(m => lower.includes(m))
  if (foundMarkers.length >= 2) score += 15
  else if (foundMarkers.length >= 1) score += 7
  
  // Date pattern check (very basic)
  const hasDate = /\d{1,2}[-/]\d{1,2}[-/]\d{2,4}|(?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\s+\d{1,2},?\s+\d{4}/i.test(lower)
  if (hasDate) score += 5 // bonus points for having a date

  const finalScore = Math.min(score, 100)
  const PASS_THRESHOLD = 85

  if (finalScore < PASS_THRESHOLD) {
    let failMessage = `Verification Score: ${finalScore}/100. This is below the strict requirement of ${PASS_THRESHOLD}.`
    if (score < 40 && userName) failMessage += " Specifically, we couldn't find your name on the certificate."
    else if (score < 60) failMessage += " The course title or platform does not match sufficiently."

    return {
      valid: false,
      reason: 'strict_fail',
      score: finalScore,
      details,
      message: failMessage + " Please upload the official certificate for this specific course."
    }
  }

  return { 
    valid: true, 
    score: finalScore,
    details,
    message: `Certificate verified with high confidence (${finalScore}/100). Success!` 
  }
}
