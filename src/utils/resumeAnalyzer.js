/**
 * resumeAnalyzer.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Core logic for analyzing resume text against job role requirements.
 * Includes job role definitions, skills database, and scoring algorithms.
 * ─────────────────────────────────────────────────────────────────────────────
 */

// Job role definitions with required skills, experience, and keywords
export const JOB_ROLES = {
  'Frontend Developer': {
    requiredSkills: ['HTML', 'CSS', 'JavaScript', 'React', 'TypeScript', 'Git', 'Responsive Design', 'REST APIs', 'NPM', 'Web APIs'],
    niceToHave: ['Vue.js', 'Angular', 'Next.js', 'Webpack', 'Testing', 'GraphQL', 'Figma', 'Tailwind CSS', 'Redux'],
    experienceKeywords: ['frontend', 'ui', 'web development', 'react', 'angular', 'vue', 'javascript', 'frontend engineer', 'ux'],
    minExperienceYears: 1,
    description: 'Build user interfaces and web experiences',
  },
  'Backend Developer': {
    requiredSkills: ['Node.js', 'Python', 'Java', 'SQL', 'REST APIs', 'Git', 'Databases', 'Authentication', 'Server Side'],
    niceToHave: ['Docker', 'Kubernetes', 'AWS', 'MongoDB', 'Redis', 'GraphQL', 'Microservices', 'CI/CD', 'Prisma'],
    experienceKeywords: ['backend', 'server', 'api', 'database', 'node', 'python', 'java', 'spring', 'backend engineer', 'cloud'],
    minExperienceYears: 1,
    description: 'Build server-side logic and APIs',
  },
  'Full Stack Developer': {
    requiredSkills: ['JavaScript', 'React', 'Node.js', 'SQL', 'Git', 'REST APIs', 'HTML', 'CSS', 'Database Management'],
    niceToHave: ['TypeScript', 'Docker', 'AWS', 'MongoDB', 'Next.js', 'GraphQL', 'Testing', 'CI/CD', 'System Design'],
    experienceKeywords: ['full stack', 'fullstack', 'frontend', 'backend', 'react', 'node', 'mern', 'mean', 'web developer'],
    minExperienceYears: 2,
    description: 'Work across the entire web stack',
  },
  'Data Scientist': {
    requiredSkills: ['Python', 'Machine Learning', 'Statistics', 'SQL', 'Data Analysis', 'Pandas', 'NumPy', 'Visualization'],
    niceToHave: ['TensorFlow', 'PyTorch', 'Spark', 'R', 'Deep Learning', 'NLP', 'Computer Vision', 'Tableau', 'Scikit-learn'],
    experienceKeywords: ['data science', 'machine learning', 'ml', 'ai', 'analytics', 'python', 'statistics', 'researcher'],
    minExperienceYears: 1,
    description: 'Extract insights from data using ML and statistics',
  },
  'Data Analyst': {
    requiredSkills: ['SQL', 'Excel', 'Python', 'Data Visualization', 'Statistics', 'Tableau', 'Power BI', 'Reporting'],
    niceToHave: ['R', 'Machine Learning', 'ETL', 'Spark', 'Google Analytics', 'A/B Testing', 'Looker', 'Spreadsheets'],
    experienceKeywords: ['data analyst', 'analytics', 'sql', 'excel', 'tableau', 'reporting', 'bi', 'business analyst'],
    minExperienceYears: 0,
    description: 'Analyze data to support business decisions',
  },
  'Machine Learning Engineer': {
    requiredSkills: ['Python', 'TensorFlow', 'PyTorch', 'Machine Learning', 'Deep Learning', 'SQL', 'Statistics', 'Git'],
    niceToHave: ['MLOps', 'Kubernetes', 'Spark', 'NLP', 'Computer Vision', 'AWS SageMaker', 'Feature Engineering', 'Model Deployment'],
    experienceKeywords: ['machine learning', 'deep learning', 'ml', 'ai', 'neural network', 'tensorflow', 'pytorch', 'ml engineer'],
    minExperienceYears: 2,
    description: 'Build and deploy machine learning models at scale',
  },
  'DevOps Engineer': {
    requiredSkills: ['Linux', 'Docker', 'Kubernetes', 'CI/CD', 'AWS', 'Git', 'Scripting', 'Monitoring', 'Terraform'],
    niceToHave: ['Ansible', 'Jenkins', 'Prometheus', 'Grafana', 'Azure', 'GCP', 'Security', 'CloudFormation'],
    experienceKeywords: ['devops', 'cloud', 'infrastructure', 'docker', 'kubernetes', 'aws', 'deployment', 'automation'],
    minExperienceYears: 2,
    description: 'Manage infrastructure and deployment pipelines',
  },
  'Cybersecurity Analyst': {
    requiredSkills: ['Network Security', 'Linux', 'Penetration Testing', 'SIEM', 'Incident Response', 'Firewalls', 'Cryptography', 'Compliance'],
    niceToHave: ['CEH', 'CISSP', 'Python', 'Forensics', 'Cloud Security', 'Zero Trust', 'OSINT', 'Malware Analysis', 'Risk'],
    experienceKeywords: ['security', 'cybersecurity', 'penetration', 'network', 'siem', 'incident', 'vulnerability', 'infosec'],
    minExperienceYears: 1,
    description: 'Protect systems and data from cyber threats',
  },
  'UI/UX Designer': {
    requiredSkills: ['Figma', 'User Research', 'Wireframing', 'Prototyping', 'Design Systems', 'Typography', 'Color Theory', 'Usability Testing'],
    niceToHave: ['Adobe XD', 'Sketch', 'Illustrator', 'Photoshop', 'Motion Design', 'HTML/CSS', 'Accessibility', 'Visual Design'],
    experienceKeywords: ['ui', 'ux', 'design', 'figma', 'wireframe', 'prototype', 'user experience', 'user interface'],
    minExperienceYears: 1,
    description: 'Design intuitive and beautiful user experiences',
  },
  'Product Manager': {
    requiredSkills: ['Product Strategy', 'Roadmapping', 'Agile', 'User Stories', 'Data Analysis', 'Stakeholder Management', 'Market Research', 'Communication'],
    niceToHave: ['SQL', 'A/B Testing', 'Figma', 'JIRA', 'OKRs', 'Go-to-Market', 'Pricing Strategy', 'Product Roadmap'],
    experienceKeywords: ['product manager', 'product management', 'pm', 'agile', 'scrum', 'roadmap', 'product lifecycle'],
    minExperienceYears: 2,
    description: 'Define and drive product vision and strategy',
  },
  'Mobile Developer': {
    requiredSkills: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Mobile UI', 'Git', 'REST APIs', 'App Store Deployment'],
    niceToHave: ['Objective-C', 'Java', 'Firebase', 'GraphQL', 'Redux', 'Native Modules', 'Push Notifications'],
    experienceKeywords: ['mobile', 'android', 'ios', 'react native', 'flutter', 'swift', 'kotlin', 'app developer'],
    minExperienceYears: 1,
    description: 'Build native and cross-platform mobile applications',
  },
  'Cloud Engineer': {
    requiredSkills: ['AWS', 'Azure', 'GCP', 'Terraform', 'Docker', 'Kubernetes', 'Cloud Security', 'Networking', 'Serverless'],
    niceToHave: ['Python', 'Go', 'Bash', 'Jenkins', 'Monitoring', 'FinOps', 'IAM', 'VPC'],
    experienceKeywords: ['cloud', 'aws', 'azure', 'google cloud', 'infrastructure', 'serverless', 'cloud engineer'],
    minExperienceYears: 2,
    description: 'Design and manage scalable cloud infrastructure',
  },
  'AI Engineer': {
    requiredSkills: ['Python', 'LLMs', 'Prompt Engineering', 'LangChain', 'PyTorch', 'TensorFlow', 'NLP', 'API Integration'],
    niceToHave: ['OpenAI SDK', 'Vector Databases', 'HuggingFace', 'Fine-tuning', 'Deployment', 'MLOps', 'Vector Search'],
    experienceKeywords: ['ai', 'artificial intelligence', 'llm', 'generative ai', 'gpt', 'nlp', 'ai engineer'],
    minExperienceYears: 1,
    description: 'Build and integrate AI/LLM powered applications',
  },
}

// Role mapping for aliases
export const ROLE_MAPPING = {
  'frontend': 'Frontend Developer',
  'backend': 'Backend Developer',
  'fullstack': 'Full Stack Developer',
  'data science': 'Data Scientist',
  'analytics': 'Data Analyst',
  'ml engineer': 'Machine Learning Engineer',
  'devops': 'DevOps Engineer',
  'security': 'Cybersecurity Analyst',
  'ux designer': 'UI/UX Designer',
  'product manager': 'Product Manager',
  'mobile': 'Mobile Developer',
  'ios': 'Mobile Developer',
  'android': 'Mobile Developer',
  'cloud': 'Cloud Engineer',
  'ai': 'AI Engineer',
  'llm': 'AI Engineer',
}

// Courses database
export const COURSES_DB = {
  'Frontend Developer': [
    { id: 'fe1', title: 'Complete React Developer Course', provider: 'Udemy', duration: '40 hours', level: 'Beginner', rating: 4.8, students: 125000, skill: 'React', free: false, price: '$14.99', image: '⚛️', description: 'Master React from scratch.' },
    { id: 'fe2', title: 'JavaScript Guide', provider: 'Udemy', duration: '52 hours', level: 'Beginner', rating: 4.7, students: 200000, skill: 'JavaScript', free: false, price: '$12.99', image: '🟨', description: 'Modern JavaScript ES6+.' },
  ],
  'Backend Developer': [
    { id: 'be1', title: 'Node.js - Complete Guide', provider: 'Udemy', duration: '40 hours', level: 'Beginner', rating: 4.7, students: 150000, skill: 'Node.js', free: false, price: '$14.99', image: '🟢', description: 'Build REST APIs.' },
    { id: 'be2', title: 'Python Backend Development', provider: 'Coursera', duration: '30 hours', level: 'Beginner', rating: 4.6, students: 90000, skill: 'Python', free: true, price: 'Free', image: '🐍', description: 'Django and FastAPI.' },
  ],
  'Full Stack Developer': [
    { id: 'fs1', title: 'MERN Stack - Complete Guide', provider: 'Udemy', duration: '48 hours', level: 'Intermediate', rating: 4.8, students: 130000, skill: 'React', free: false, price: '$14.99', image: '🔄', description: 'MongoDB, Express, React, Node.' },
  ],
  'Data Scientist': [
    { id: 'ds1', title: 'Python for Data Science', provider: 'Udemy', duration: '45 hours', level: 'Beginner', rating: 4.8, students: 180000, skill: 'Python', free: false, price: '$14.99', image: '🐍', description: 'Pandas, NumPy, Scikit-learn.' },
  ],
  'Data Analyst': [
    { id: 'da1', title: 'Google Data Analytics', provider: 'Coursera', duration: '180 hours', level: 'Beginner', rating: 4.8, students: 600000, skill: 'Data Analysis', free: false, price: '$49/mo', image: '📊', description: 'Official Google certificate.' },
  ],
  'Machine Learning Engineer': [
    { id: 'ml1', title: 'TensorFlow Developer', provider: 'Coursera', duration: '60 hours', level: 'Intermediate', rating: 4.8, students: 150000, skill: 'TensorFlow', free: false, price: '$49/mo', image: '🔥', description: 'Deep learning models.' },
  ],
  'DevOps Engineer': [
    { id: 'do1', title: 'Kubernetes Bootcamp', provider: 'Udemy', duration: '22 hours', level: 'Intermediate', rating: 4.7, students: 90000, skill: 'Kubernetes', free: false, price: '$14.99', image: '🐳', description: 'Container orchestration.' },
  ],
  'Cybersecurity Analyst': [
    { id: 'cs1', title: 'CompTIA Security+', provider: 'Udemy', duration: '30 hours', level: 'Beginner', rating: 4.7, students: 100000, skill: 'Network Security', free: false, price: '$14.99', image: '🔒', description: 'Security fundamentals.' },
  ],
  'UI/UX Designer': [
    { id: 'ux1', title: 'Google UX Design', provider: 'Coursera', duration: '200 hours', level: 'Beginner', rating: 4.8, students: 500000, skill: 'User Research', free: false, price: '$49/mo', image: '🎨', description: 'UX essentials.' },
  ],
  'Product Manager': [
    { id: 'pm1', title: 'Product Management Fundamentals', provider: 'Coursera', duration: '25 hours', level: 'Beginner', rating: 4.7, students: 90000, skill: 'Product Strategy', free: false, price: '$49/mo', image: '📋', description: 'PM basics.' },
  ],
  'Mobile Developer': [
    { id: 'mob1', title: 'React Native - The Practical Guide', provider: 'Udemy', duration: '32 hours', level: 'Intermediate', rating: 4.8, students: 85000, skill: 'React Native', free: false, price: '$14.99', image: '📱', description: 'Build iOS and Android apps.' },
  ],
  'Cloud Engineer': [
    { id: 'cld1', title: 'AWS Certified Solutions Architect', provider: 'Udemy', duration: '25 hours', level: 'Intermediate', rating: 4.8, students: 300000, skill: 'AWS', free: false, price: '$14.99', image: '☁️', description: 'Master AWS Cloud.' },
  ],
  'AI Engineer': [
    { id: 'ai1', title: 'Generative AI with LLMs', provider: 'Coursera', duration: '35 hours', level: 'Intermediate', rating: 4.9, students: 120000, skill: 'LLMs', free: false, price: '$49/mo', image: '🤖', description: 'Master Large Language Models.' },
  ],
}

// ── Robust Skill Matching Helper ──────────────────────────────────────────────
function isSkillFound(text, skill) {
  if (!text || !skill) return false;
  
  const s = skill.toLowerCase();
  const t = text.toLowerCase();
  
  // 1. Direct inclusion
  if (t.includes(s)) return true;
  
  // 2. Common tech aliases and variations
  const aliases = {
    'javascript': ['js', 'es6', 'ecmascript'],
    'react': ['reactjs', 'react.js'],
    'node.js': ['nodejs', 'node js', 'node.js'],
    'vue.js': ['vuejs', 'vue js', 'vue.js'],
    'next.js': ['nextjs', 'next js', 'next.js'],
    'typescript': ['ts'],
    'ui/ux': ['ui ux', 'uiux', 'user interface', 'user experience'],
    'c++': ['cpp', 'c plus plus'],
    'c#': ['csharp', 'c sharp'],
    'sql': ['mysql', 'postgresql', 'postgres', 'sql server', 'oracle', 'sqlite', 'dbms', 'database'],
    'aws': ['amazon web services', 'ec2', 's3', 'lambda'],
    'gcp': ['google cloud', 'app engine', 'cloud run'],
    'azure': ['microsoft azure'],
    'nlp': ['natural language processing'],
    'ml': ['machine learning'],
    'ai': ['artificial intelligence'],
    'cv': ['computer vision'],
    'rest apis': ['rest api', 'restful', 'restful api', 'restful apis'],
    'html': ['html5'],
    'css': ['css3'],
    'github': ['git'],
    'ci/cd': ['cicd', 'jenkins', 'pipeline', 'github actions', 'gitlab ci'],
    'docker': ['containerization', 'containers'],
    'kubernetes': ['k8s', 'orchestration'],
    'machine learning': ['ml', 'supervised learning', 'unsupervised learning', 'modeling'],
    'deep learning': ['neural networks', 'cnn', 'rnn', 'transformers'],
    'statistics': ['probability', 'inference', 'hypothesis testing'],
    'data analysis': ['eda', 'cleaning data', 'wrangling'],
    'git': ['github', 'gitlab', 'version control', 'bitbucket'],
    'responsive design': ['mobile first', 'media queries', 'flexbox', 'css grid'],
  };
  
  const skillAliases = aliases[s] || [];
  for (const alias of skillAliases) {
    if (t.includes(alias)) return true;
  }
  
  // 3. Spaced-out letter detection (e.g. "R e a c t")
  const compressedText = t.replace(/\s/g, '');
  const compressedSkill = s.replace(/\s/g, '');
  if (compressedText.includes(compressedSkill)) return true;
  
  // 4. Regex match with word boundaries for short skills (e.g., 'C', 'R', 'Go')
  if (s.length <= 3) {
    const escaped = s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(^|[^a-zA-Z0-9])${escaped}([^a-zA-Z0-9]|$)`, 'i');
    if (regex.test(t)) return true;
  }
  
  return false;
}

// Extract text from PDF using pdfjs
export async function extractTextFromPDF(file) {
  try {
    const pdfjsLib = await import('pdfjs-dist')
    pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`

    const arrayBuffer = await file.arrayBuffer()
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise
    let fullText = ''

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i)
      const textContent = await page.getTextContent()
      const pageText = textContent.items.map(item => item.str).join(' ')
      fullText += pageText + ' '
    }

    return fullText.toLowerCase()
  } catch (err) {
    console.error('PDF extraction error:', err)
    return ''
  }
}

// Analyze resume text against job role
export function analyzeResume(resumeText, jobRole) {
  const text = resumeText.toLowerCase()
  
  const mappedRole = ROLE_MAPPING[jobRole] || jobRole;
  let roleData = JOB_ROLES[mappedRole];

  // Fallback for custom job roles
  if (!roleData) {
    const keywords = jobRole.toLowerCase().split(/[\s/-]+/).filter(w => w.length > 2)
    roleData = {
      requiredSkills: keywords.length > 0 ? keywords.slice(0, 5).map(w => w.charAt(0).toUpperCase() + w.slice(1)) : ['Communication', 'Problem Solving'],
      niceToHave: ['Agile', 'Teamwork', 'Project Management'],
      experienceKeywords: keywords.length > 0 ? keywords : ['experience', 'work', 'project'],
      minExperienceYears: 1,
      description: `Analysis for ${jobRole} (Custom Role)`
    }
  }

  const ALL_COURSES = Object.values(COURSES_DB).flat()
  
  function getCourseForSkill(skillName, roleName) {
    const roleSpecificCourses = COURSES_DB[roleName] || []
    
    // 1. Try role-specific match for this skill
    const roleMatch = roleSpecificCourses.find(c => 
      c.skill.toLowerCase() === skillName.toLowerCase() || 
      c.title.toLowerCase().includes(skillName.toLowerCase())
    )
    if (roleMatch) return roleMatch

    // 2. Try global match for this skill
    const globalMatch = ALL_COURSES.find(c => 
      c.skill.toLowerCase() === skillName.toLowerCase() || 
      c.title.toLowerCase().includes(skillName.toLowerCase())
    )
    if (globalMatch) return globalMatch

    // 3. Fallback to role's first course
    if (roleSpecificCourses.length > 0) return roleSpecificCourses[0]

    // 4. Final fallback
    return ALL_COURSES[0]
  }

  // Check required skills
  const foundRequired = roleData.requiredSkills.filter(skill => isSkillFound(text, skill))
  const missingRequired = roleData.requiredSkills.filter(skill => !isSkillFound(text, skill))
  
  // Check nice-to-have skills
  const foundNiceToHave = roleData.niceToHave.filter(skill => isSkillFound(text, skill))
  const missingNiceToHave = roleData.niceToHave.filter(skill => !isSkillFound(text, skill))
  
  // Check experience keywords
  const experienceMatches = roleData.experienceKeywords.filter(kw => isSkillFound(text, kw))

  // Extract years of experience
  const yearMatches = text.match(/(\d+)\+?\s*years?\s*(of\s*)?(experience|exp)/gi) || []
  const maxYears = yearMatches.reduce((max, match) => {
    const num = parseInt(match)
    return num > max ? num : max
  }, 0)

  // Calculate scores
  const requiredWeight = 60;
  const niceToHaveWeight = 20;
  const expKeywordWeight = 15;
  const expYearsWeight = 5;

  const requiredScore = roleData.requiredSkills.length > 0 
    ? (foundRequired.length / roleData.requiredSkills.length) * requiredWeight 
    : requiredWeight;
  
  const niceToHaveScore = roleData.niceToHave.length > 0 
    ? (foundNiceToHave.length / roleData.niceToHave.length) * niceToHaveWeight 
    : niceToHaveWeight;
    
  const experienceScore = roleData.experienceKeywords.length > 0 
    ? Math.min((experienceMatches.length / roleData.experienceKeywords.length) * expKeywordWeight, expKeywordWeight) 
    : expKeywordWeight;
    
  const yearsScore = maxYears >= roleData.minExperienceYears 
    ? expYearsWeight 
    : (maxYears / Math.max(roleData.minExperienceYears, 1)) * expYearsWeight;

  const totalScore = Math.round(requiredScore + niceToHaveScore + experienceScore + yearsScore)
  const clampedScore = Math.min(Math.max(totalScore, 5), 98)

  const requiredCoverage = roleData.requiredSkills.length > 0 ? foundRequired.length / roleData.requiredSkills.length : 1;
  let eligibility = 'Low'
  let eligibilityColor = 'red'
  if (clampedScore >= 75) { eligibility = 'High'; eligibilityColor = 'green' }
  else if (clampedScore >= 50) { eligibility = 'Medium'; eligibilityColor = 'yellow' }
  else if (clampedScore >= 30) { eligibility = 'Low-Medium'; eligibilityColor = 'orange' }

  const recommendations = []
  if (missingRequired.length > 0) recommendations.push(`Learn these critical skills: ${missingRequired.slice(0, 3).join(', ')}`)
  if (maxYears < roleData.minExperienceYears) recommendations.push(`Gain at least ${roleData.minExperienceYears} year(s) of relevant experience`)

  return {
    score: clampedScore,
    eligibility,
    eligibilityColor,
    jobRole,
    foundRequired,
    missingRequired,
    foundNiceToHave,
    missingNiceToHave,
    requiredCoverage: Math.round(requiredCoverage * 100),
    experienceYears: maxYears,
    recommendations,
    breakdown: {
      requiredSkills: Math.round(requiredScore),
      niceToHave: Math.round(niceToHaveScore),
      experience: Math.round(experienceScore + yearsScore),
    },
    courses: missingRequired.map(skill => getCourseForSkill(skill, jobRole)),
    roleDescription: roleData.description,
  }
}
