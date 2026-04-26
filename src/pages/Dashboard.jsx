import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { BarChart3, RefreshCw, Target, BookOpen, GraduationCap, Lightbulb, CheckCircle, XCircle, Clock, Zap, Compass, Star } from 'lucide-react'

function ScoreRing({ score }) {
  const [animated, setAnimated] = useState(0)
  useEffect(() => {
    const t = setTimeout(() => setAnimated(score), 300)
    return () => clearTimeout(t)
  }, [score])
  const r = 80, circ = 2 * Math.PI * r
  const offset = circ - (animated / 100) * circ
  const color = score >= 75 ? '#22c55e' : score >= 50 ? '#f59e0b' : score >= 30 ? '#f97316' : '#ef4444'
  
  return (
    <div className="relative flex items-center justify-center py-6">
      <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent rounded-full blur-2xl" />
      <svg width="220" height="220" className="-rotate-90 relative z-10 transition-transform duration-700 hover:scale-105">
        <circle cx="110" cy="110" r={r} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="20" />
        <circle cx="110" cy="110" r={r} fill="none" stroke={color} strokeWidth="20"
          strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
          style={{ transition:'stroke-dashoffset 2s cubic-bezier(0.4, 0, 0.2, 1)', filter:`drop-shadow(0 0 12px ${color}80)` }} />
      </svg>
      <div className="absolute text-center z-20">
        <p className="text-6xl font-black bg-clip-text text-transparent bg-gradient-to-b from-white to-midblue drop-shadow-lg">
          {animated}%
        </p>
        <p className="text-sm text-body font-bold tracking-widest uppercase mt-1">ATS Score</p>
      </div>
    </div>
  )
}

const ELIGIBILITY_STYLE = {
  High:       'bg-green-500/20 text-green-700 border-green-500/30 shadow-lg shadow-green-500/10',
  Medium:     'bg-yellow-500/20 text-amber-700 border-yellow-500/30 shadow-lg shadow-yellow-500/10',
  'Low-Medium':'bg-orange-500/20 text-orange-700 border-orange-500/30 shadow-lg shadow-orange-500/10',
  Low:        'bg-red-500/20 text-red-700 border-red-500/30 shadow-lg shadow-red-500/10',
}

// Generates a mock "Career Guidance" description
function generateCareerGuidance(jobRole, score, requiredCoverage, foundRequired) {
  let area = jobRole;
  let strengths = foundRequired.slice(0, 3).join(', ') || 'general technical skills';
  
  if (score >= 75) {
    return {
      title: `Highly Compatible for ${area}`,
      desc: `Your resume strongly aligns with the ${area} profile. Your foundation in ${strengths} gives you a significant competitive advantage. You are well-positioned for Senior or immediate mid-level roles in this domain.`,
      action: "Focus on networking and advanced mock interviews."
    }
  } else if (score >= 50) {
    return {
      title: `Strong Potential in ${area}`,
      desc: `You have a solid baseline in ${area}, largely supported by your knowledge of ${strengths}. However, some critical gaps are holding back your ATS performance.`,
      action: "Focus on filling the top 2 missing core skills to push your profile into the top tier."
    }
  } else {
    return {
      title: `Pivoting to ${area}`,
      desc: `While you've targeted ${area}, your current resume lacks the deep keyword coverage expected by ATS systems. If you have experience in ${strengths}, make sure to highlight it more prominently.`,
      action: "Consider entry-level roles or taking robust foundational courses before applying aggressively."
    }
  }
}

export default function Dashboard() {
  const { analysisResult, enrolledCourses, courseProgress, analysisHistory } = useApp()

  if (!analysisResult) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8 bg-pageBg">
        <div className="text-center max-w-md animate-fade-in space-y-6">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-navy-100 rounded-3xl flex items-center justify-center text-5xl mx-auto shadow-2xl">📊</div>
          <h2 className="text-3xl font-black text-navy tracking-tight">No Insights Yet</h2>
          <p className="text-body text-base leading-relaxed">Your personalized career dashboard awaits. Upload your resume to unlock detailed ATS insights and skill mappings.</p>
          <Link to="/analyze" className="btn-primary py-4 px-8 text-lg mt-4 w-full">Analyze My Resume →</Link>
        </div>
      </div>
    )
  }

  const { score, eligibility, jobRole, foundRequired, missingRequired, foundNiceToHave, missingNiceToHave, breakdown, recommendations, requiredCoverage } = analysisResult
  const careerGuidance = generateCareerGuidance(jobRole, score, requiredCoverage, foundRequired);

  const breakdownData = [
    { name:'Required', value:breakdown.requiredSkills, color:'#3b82f6', max:60 },
    { name:'Bonus',    value:breakdown.niceToHave,    color:'#8b5cf6', max:20 },
    { name:'Experience',      value:breakdown.experience,    color:'#22c55e', max:20 },
  ]
  const skillPieData = [
    { name:'Found',   value:foundRequired.length,  fill:'#3b82f6' },
    { name:'Missing', value:missingRequired.length, fill:'rgba(255,255,255,0.03)' },
  ]
  const avgProgress = enrolledCourses.length > 0
    ? Math.round(Object.values(courseProgress).reduce((a,b) => a+b, 0) / enrolledCourses.length) : 0

  return (
    <div className="page-wrapper animate-fade-in min-h-screen">
      {/* Immersive Ambient Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-midblue/10 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-emerald/10 rounded-full blur-[150px] animate-pulse" style={{ animationDuration: '12s' }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 px-4 sm:px-6 lg:px-8">
        {/* Header Area */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-midblue-200 rounded-full text-midblue text-sm font-bold tracking-wide">
              <Zap className="w-4 h-4 text-midblue" /> Intelligence Dashboard
            </div>
            <h1 className="text-5xl lg:text-6xl font-black text-navy tracking-tight leading-tight">
              Analysis for <span className="bg-gradient-to-r from-midblue to-emerald bg-clip-text text-transparent">{jobRole}</span>
            </h1>
          </div>
          <Link to="/analyze" className="btn-secondary whitespace-nowrap h-fit">
            <RefreshCw className="w-4 h-4" /> Re-analyze Resume
          </Link>
        </div>

        {/* Global Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10 stagger-children">
          {[
            { label:'ATS Readiness',   value:`${score}%`, icon:Target, color:'blue' },
            { label:'Eligibility',     value:eligibility, icon:Star,   color:'purple' },
            { label:'Matched Skills',  value:`${foundRequired.length}`, icon:CheckCircle, color:'green' },
            { label:'Active Courses',  value:enrolledCourses.length, icon:BookOpen, color:'orange' },
          ].map((stat, i) => (
            <div key={i} className="bg-surface backdrop-blur-3xl border border-navy-100 rounded-3xl p-6 hover:bg-surface hover:-translate-y-1 transition-all duration-300 shadow-2xl">
              <div className={`w-12 h-12 rounded-2xl bg-${stat.color}-500/10 flex items-center justify-center mb-4 border border-${stat.color}-500/20`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-400 drop-shadow-md`} />
              </div>
              <p className="text-3xl font-black text-navy tracking-tight mb-1">{stat.value}</p>
              <p className="text-sm font-semibold text-body uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Main Analytics Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          
          {/* Hero Score Card */}
          <div className="lg:col-span-1 bg-gradient-to-b from-surface to-navy-50 backdrop-blur-xl border border-navy-100 rounded-3xl p-8 flex flex-col items-center justify-center relative overflow-hidden shadow-2xl border-t-navy-100">
            <h3 className="font-bold text-body mb-2 w-full text-left text-sm uppercase tracking-widest">Master Score</h3>
            <ScoreRing score={score} />
            <div className={`mt-6 px-6 py-2 rounded-full border text-sm font-black tracking-wide uppercase ${ELIGIBILITY_STYLE[eligibility] || ELIGIBILITY_STYLE['Low']}`}>
              {eligibility} Match
            </div>
          </div>

          {/* Detailed Breakdown */}
          <div className="lg:col-span-2 bg-surface backdrop-blur-xl border border-navy-100 rounded-3xl p-8 flex flex-col justify-between shadow-xl">
             <div className="mb-6">
                <h3 className="font-bold text-navy text-xl flex items-center gap-3">
                  <BarChart3 className="w-6 h-6 text-midblue" /> Score Distribution
                </h3>
                <p className="text-body text-sm mt-2">How your final score of {score}% was calculated across the evaluation matrix.</p>
             </div>
             <div className="space-y-8 flex-1 justify-center flex flex-col">
              {breakdownData.map(item => (
                <div key={item.name} className="relative">
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-body font-bold tracking-wide">{item.name} Scoring</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-black" style={{ color:item.color }}>{item.value}</span>
                      <span className="text-muted font-bold text-sm">/ {item.max} pts</span>
                    </div>
                  </div>
                  <div className="h-3 bg-navy/30 rounded-full overflow-hidden border border-navy-100 p-0.5">
                    <div className="h-full rounded-full relative overflow-hidden" style={{ width:`${(item.value/item.max)*100}%`, backgroundColor:item.color }}>
                      <div className="absolute inset-0 bg-surface w-full h-full shimmer" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── NEW: Career Compass / Area Recommendations ── */}
        <div className="mb-10 relative overflow-hidden bg-gradient-to-r from-blue-900/30 via-indigo-900/20 to-purple-900/30 rounded-3xl p-[1px]">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-md pointer-events-none" />
          <div className="bg-pageBg/80 backdrop-blur-3xl rounded-[23px] p-8 md:p-12 relative z-10 flex flex-col md:flex-row items-center gap-10">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center flex-shrink-0 border border-navy-100 shadow-2xl">
              <Compass className="w-12 h-12 md:w-16 md:h-16 text-midblue" />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 text-midblue font-bold uppercase tracking-widest text-xs mb-3">
                <Star className="w-4 h-4"/> Career Assessment Insight
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-navy mb-4">{careerGuidance.title}</h2>
              <p className="text-body text-base md:text-lg leading-relaxed mb-6">
                {careerGuidance.desc}
              </p>
              <div className="inline-flex bg-midblue/10 border border-midblue-200 px-5 py-3 rounded-xl">
                <p className="text-sm font-semibold text-midblue">
                  <span className="text-navy">Next Step:</span> {careerGuidance.action}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Deep Dive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-green-500/10 border border-green-500/20 rounded-3xl p-8 backdrop-blur-xl">
            <h3 className="font-bold text-green-700 text-lg mb-6 flex items-center gap-3">
              <div className="p-2 bg-green-500/20 rounded-lg"><CheckCircle className="w-5 h-5" /></div>
              Acquired Arsenal
            </h3>
            <div className="flex flex-wrap gap-2">
              {foundRequired.map(s => <span key={s} className="px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20 text-green-700 text-sm font-semibold hover:bg-green-500/20 transition-colors cursor-default">{s}</span>)}
              {foundNiceToHave.slice(0,5).map(s => <span key={s} className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 text-sm font-semibold hover:bg-emerald-500/20 transition-colors cursor-default">{s}</span>)}
              {foundRequired.length === 0 && <p className="text-muted text-sm font-medium">No strict matching skills discovered in your parsed text.</p>}
            </div>
          </div>

          <div className="bg-orange-500/10 border border-orange-500/20 rounded-3xl p-8 backdrop-blur-xl">
            <h3 className="font-bold text-orange-700 text-lg mb-6 flex items-center gap-3">
              <div className="p-2 bg-orange-500/20 rounded-lg"><XCircle className="w-5 h-5" /></div>
              Target Acumen
            </h3>
            <div className="flex flex-wrap gap-2">
              {missingRequired.map(s => <span key={s} className="px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-700 text-sm font-semibold hover:bg-red-500/20 transition-colors cursor-default">{s}</span>)}
              {missingNiceToHave.slice(0,4).map(s => <span key={s} className="px-3 py-1.5 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-700 text-sm font-semibold hover:bg-orange-500/20 transition-colors cursor-default">{s}</span>)}
            </div>
          </div>
        </div>

        {/* Global Nav Portals */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { to:'/skills',      icon:Target,       label:'Skills Matrix',  desc:'Deep dive into capability gaps' },
            { to:'/courses',     icon:BookOpen,     label:'Learning Hub',   desc:'Curated growth pathways' },
            { to:'/my-courses',  icon:GraduationCap,label:'Certifications', desc:'Track proofs of completion' },
          ].map(({ to, icon:Icon, label, desc }) => (
            <Link key={to} to={to} className="bg-surface border border-navy-100 hover:border-navy-100 rounded-3xl p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-white/5 group text-center block">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-slate-700/50 to-slate-800/50 border border-navy-100 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Icon className="w-8 h-8 text-navy" />
              </div>
              <h4 className="font-black text-navy text-lg mb-1">{label}</h4>
              <p className="text-body font-medium text-sm">{desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}







