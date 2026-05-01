import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { JOB_ROLES } from '../utils/resumeAnalyzer'
import { Target, CheckCircle, XCircle, BookOpen, ArrowLeft, AlertCircle, Zap } from 'lucide-react'

function SkillGrid({ skills, type }) {
  if (skills.length === 0) return null;
  const isReq = type === 'required';
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {skills.map((item, index) => (
        <div key={item.skill} 
             className={`p-4 rounded-2xl border backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl animate-fade-in
             ${item.found 
               ? (isReq ? 'bg-green-500/10 border-green-500/20 shadow-green-500/5' : 'bg-midblue/10 border-midblue-200 shadow-blue-500/5') 
               : (isReq ? 'bg-red-500/10 border-red-500/20 shadow-red-500/5' : 'bg-navy-50 border-navy-100 shadow-sm')}
             `}
             style={{ animationDelay: `${index * 40}ms` }}>
          <div className="flex items-start justify-between mb-3">
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center
              ${item.found 
                  ? (isReq ? 'bg-green-500/20 text-green-700' : 'bg-midblue/20 text-midblue')
                  : (isReq ? 'bg-red-500/20 text-red-500' : 'bg-navy-50 text-body')}`}>
              {item.found ? <CheckCircle className="w-5 h-5"/> : <XCircle className="w-5 h-5"/>}
            </div>
            {isReq && !item.found && (
              <span className="flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider px-2 py-1 bg-red-500/20 text-red-700 rounded-full">
                <AlertCircle className="w-3 h-3"/> Critical
              </span>
            )}
          </div>
          <h4 className={`font-bold text-base mb-1 ${item.found ? 'text-navy' : 'text-body'}`}>{item.skill}</h4>
          <p className="text-xs text-body font-medium leading-relaxed mb-4">
            {item.found 
              ? 'Excellent! Detected in your resume.' 
              : (isReq ? 'Highly necessary to learn and improve.' : 'Optional, but gives you an edge.')}
          </p>
          {!item.found && (
            <Link to="/courses" className={`inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors
              ${isReq ? 'bg-red-500/20 text-red-700 hover:bg-red-500/30' : 'bg-navy-50 text-body hover:bg-navy-100 hover:text-navy'}`}>
              Learn Now <ArrowLeft className="w-3 h-3 rotate-180"/>
            </Link>
          )}
        </div>
      ))}
    </div>
  )
}

export default function SkillsGap() {
  const { analysisResult } = useApp()
  const [activeTab, setActiveTab] = useState('required')

  if (!analysisResult) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="text-center max-w-md animate-fade-in space-y-5">
          <div className="w-20 h-20 bg-navy-50 border border-navy-100 rounded-2xl flex items-center justify-center text-4xl mx-auto shadow-2xl">🎯</div>
          <h2 className="text-2xl font-extrabold text-navy">No Analysis Yet</h2>
          <p className="text-body">Analyze your resume first to see your targeted skills gap.</p>
          <Link to="/analyze" className="btn-primary">Analyze My Resume →</Link>
        </div>
      </div>
    )
  }

  const { jobRole, foundRequired, missingRequired, foundNiceToHave, missingNiceToHave, score } = analysisResult
  const roleData = JOB_ROLES[jobRole];

  if (!roleData) return null;

  const allRequired   = [...missingRequired.map(s=>({skill:s,found:false})), ...foundRequired.map(s=>({skill:s,found:true}))]
  const allNiceToHave = [...missingNiceToHave.map(s=>({skill:s,found:false})), ...foundNiceToHave.map(s=>({skill:s,found:true}))]
  const requiredPct   = Math.round((foundRequired.length / roleData.requiredSkills.length) * 100)
  const bonusPct      = Math.round((foundNiceToHave.length / roleData.niceToHave.length) * 100)

  return (
    <div className="page-wrapper animate-fade-in">
      {/* Background flair */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-midblue/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="section-label bg-emerald/10 text-emerald border-emerald-200">
              <Zap className="w-3.5 h-3.5 text-midblue" /> Deep Skill Analysis
            </div>
            <h1 className="text-4xl font-black text-navy tracking-tight mb-2">Skills Gap Report</h1>
            <p className="text-body">We mapped your resume against the industry standard requirements for <span className="text-midblue font-bold bg-blue-400/10 px-2 py-0.5 rounded ml-1">{jobRole}</span>.</p>
          </div>
          <Link to="/dashboard" className="btn-secondary h-fit">
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Link>
        </div>

        {/* High-Level Overview Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="card bg-gradient-to-br from-blue-600/10 to-purple-600/10 border-midblue/30 shadow-lg shadow-blue-500/5 relative overflow-hidden">
            <div className="absolute -right-4 -bottom-4 opacity-10 text-8xl">🎯</div>
            <p className="text-body text-xs tracking-wider uppercase font-bold mb-2 relative">Overall Competency</p>
            <div className="flex items-baseline gap-2 relative">
              <span className="text-5xl font-black text-navy">{score}%</span>
            </div>
            <div className="mt-4 h-2 bg-navy-50 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-midblue to-emerald rounded-full" style={{ width:`${score}%` }} />
            </div>
          </div>
          <div className="card border-green-500/20 bg-green-500/5 relative overflow-hidden">
            <p className="text-green-700/80 text-xs tracking-wider uppercase font-bold mb-2">Required Skills Met</p>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-black text-navy">{requiredPct}%</span>
              <span className="text-muted font-medium">({foundRequired.length}/{roleData.requiredSkills.length})</span>
            </div>
            <div className="mt-4 h-2 bg-green-500/10 rounded-full overflow-hidden">
              <div className="h-full bg-green-500 rounded-full transition-all duration-1000" style={{ width:`${requiredPct}%` }} />
            </div>
          </div>
          <div className="card border-midblue/10 bg-blue-500/5 relative overflow-hidden">
            <p className="text-midblue/80 text-xs tracking-wider uppercase font-bold mb-2">Bonus Skills Met</p>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-black text-navy">{bonusPct}%</span>
              <span className="text-muted font-medium">({foundNiceToHave.length}/{roleData.niceToHave.length})</span>
            </div>
            <div className="mt-4 h-2 bg-midblue/10 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full transition-all duration-1000" style={{ width:`${bonusPct}%` }} />
            </div>
          </div>
        </div>

        {/* Detailed Grid Map Tabs */}
        <div className="mb-6 flex gap-4">
          <button onClick={() => setActiveTab('required')}
            className={`flex-1 py-4 px-6 rounded-2xl text-sm font-bold transition-all duration-300 border-2
              ${activeTab === 'required' ? 'bg-emerald/10 border-emerald text-navy shadow-xl shadow-purple-500/10' : 'bg-navy-50 border-transparent text-body hover:bg-navy-100 hover:text-navy'}`}>
            <span className="text-lg mr-2">🔥</span> Core Required Skills ({roleData.requiredSkills.length})
          </button>
          <button onClick={() => setActiveTab('bonus')}
            className={`flex-1 py-4 px-6 rounded-2xl text-sm font-bold transition-all duration-300 border-2
              ${activeTab === 'bonus' ? 'bg-midblue/10 border-midblue text-navy shadow-xl shadow-blue-500/10' : 'bg-navy-50 border-transparent text-body hover:bg-navy-100 hover:text-navy'}`}>
            <span className="text-lg mr-2">✨</span> Nice-to-Have Skills ({roleData.niceToHave.length})
          </button>
        </div>

        <div className="mb-12">
          {activeTab === 'required' && (
            <div className="animate-fade-in">
              <div className="mb-6 p-4 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-700 text-sm flex items-start gap-3">
                <AlertCircle className="w-5 h-5 flex-shrink-0 text-orange-700"/>
                <p><strong>Note:</strong> These core skills are fundamental. Missing them significantly drops your chances of passing basic resume screenings for <span className="font-bold">{jobRole}</span>.</p>
              </div>
              <SkillGrid skills={allRequired} type="required" />
            </div>
          )}
          {activeTab === 'bonus' && (
            <div className="animate-fade-in">
               <div className="mb-6 p-4 rounded-xl bg-midblue/10 border border-midblue-200 text-midblue text-sm flex items-start gap-3">
                <Target className="w-5 h-5 flex-shrink-0 text-midblue"/>
                <p><strong>Note:</strong> These aren't rigidly required, but checking these boxes makes your resume stand out dramatically against other candidates.</p>
              </div>
              <SkillGrid skills={allNiceToHave} type="bonus" />
            </div>
          )}
        </div>

        <div className="flex justify-center mb-10">
          <Link to="/courses" className="btn-primary py-4 px-8 text-base group">
            <BookOpen className="w-5 h-5" />
            Browse Courses to Master Missing Skills
            <ArrowLeft className="w-5 h-5 rotate-180 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </div>
  )
}







