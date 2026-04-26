import React from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, ArrowRight, Mail, Phone, Linkedin, MapPin, FileText, Target, Zap, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function ResumeShowcase() {
  return (
    <section className="w-full bg-pageBg py-24 relative overflow-hidden font-sans border-t border-navy-100">
      {/* Background glow orbs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none transform -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none transform translate-x-1/2 translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Left Side - 40% */}
          <div className="w-full lg:w-2/5 flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 w-fit">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span className="text-sm font-medium text-indigo-300 tracking-wide">Resume Guide</span>
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-bold text-navy leading-tight">
              What a Winning <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-emerald-400">Resume</span> Looks Like
            </h2>
            
            <p className="text-lg text-body">
              Use this as your blueprint before uploading to our AI analyzer.
            </p>
            
            <ul className="space-y-4 mt-2">
              {[
                "Clean single-column layout",
                "Quantified achievements with numbers",
                "ATS-friendly keyword placement",
                "Consistent formatting & spacing"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="text-body text-base">{item}</span>
                </li>
              ))}
            </ul>
            
            <div className="mt-6">
              <Link to="/analyze" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-emerald-600 hover:from-indigo-500 hover:to-emerald-500 text-navy font-semibold shadow-lg shadow-indigo-500/25 transition-all transform hover:-translate-y-0.5 w-fit">
                Analyze My Resume <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Right Side - 60% */}
          <div className="w-full lg:w-3/5 relative lg:pl-10">
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="relative w-full max-w-2xl mx-auto"
              style={{ perspective: 1000 }}
            >
              {/* Resume Card */}
              <div className="bg-white rounded-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform -rotate-1 hover:rotate-0 transition-transform duration-500 border border-navy-100">
                
                {/* Top Header Block */}
                <div className="bg-gradient-to-r from-indigo-600 to-emerald-600 px-8 py-7 text-navy">
                  <h3 className="text-3xl font-bold tracking-tight mb-1 text-navy">Arjun Mehta</h3>
                  <p className="text-indigo-100 font-medium text-lg mb-4">Full Stack Developer</p>
                  
                  <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-indigo-50/90">
                    <div className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" /> arjun@email.com</div>
                    <div className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" /> +91 98765 43210</div>
                    <div className="flex items-center gap-1.5"><Linkedin className="w-3.5 h-3.5" /> linkedin.com/in/arjunmehta</div>
                    <div className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> Hyderabad, India</div>
                  </div>
                </div>

                {/* Resume Body */}
                <div className="p-8 text-navy space-y-7 bg-[#FAFAFA]">
                  
                  {/* Summary */}
                  <section className="relative">
                    <h4 className="text-sm font-bold text-navy border-b border-navy-100 pb-1.5 mb-3 tracking-wider">PROFESSIONAL SUMMARY</h4>
                    <p className="text-sm leading-relaxed text-body">
                      Results-driven Full Stack Developer with 3+ years of experience building scalable web applications using React, Node.js, and AWS. Delivered 12+ production projects with a focus on performance and clean code.
                    </p>
                    
                    {/* Annotation Bubble */}
                    <div className="absolute -right-4 top-1/2 translate-x-full -translate-y-1/2 hidden xl:flex items-center gap-2">
                      <div className="h-0.5 w-8 bg-emerald-400 rounded-full"></div>
                      <div className="bg-pageBg border border-emerald-500/30 text-emerald-700 text-xs px-3 py-1.5 rounded-lg whitespace-nowrap font-medium flex items-center gap-1.5 shadow-xl shadow-emerald-500/10">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Tailored to the role
                      </div>
                    </div>
                  </section>

                  {/* Skills */}
                  <section className="relative">
                    <h4 className="text-sm font-bold text-navy border-b border-navy-100 pb-1.5 mb-3 tracking-wider">SKILLS</h4>
                    <div className="flex flex-wrap gap-2">
                      {['React.js', 'Node.js', 'TypeScript', 'PostgreSQL', 'AWS', 'Docker', 'REST APIs', 'Git', 'Tailwind CSS', 'MongoDB'].map(skill => (
                        <span key={skill} className="px-2.5 py-1 bg-navy-50 text-body rounded text-xs font-semibold">
                          {skill}
                        </span>
                      ))}
                    </div>
                    
                    {/* Annotation Bubble */}
                    <div className="absolute -left-4 top-1/2 -translate-x-full -translate-y-1/2 hidden xl:flex items-center gap-2">
                      <div className="bg-pageBg border border-indigo-500/30 text-indigo-400 text-xs px-3 py-1.5 rounded-lg whitespace-nowrap font-medium flex items-center gap-1.5 shadow-xl shadow-indigo-500/10">
                        <CheckCircle2 className="w-3.5 h-3.5" /> ATS keyword-rich
                      </div>
                      <div className="h-0.5 w-8 bg-indigo-400 rounded-full"></div>
                    </div>
                  </section>

                  {/* Experience */}
                  <section className="relative">
                    <h4 className="text-sm font-bold text-navy border-b border-navy-100 pb-1.5 mb-3 tracking-wider">EXPERIENCE</h4>
                    
                    <div className="space-y-5">
                      <div>
                        <div className="flex justify-between items-baseline mb-1">
                          <h5 className="text-sm font-bold text-navy">Software Developer — TechCorp Solutions, Hyderabad</h5>
                          <span className="text-xs text-muted font-bold">2022–Present</span>
                        </div>
                        <ul className="list-disc list-inside text-sm text-body space-y-1.5 marker:text-body ml-1">
                          <li>Reduced page load time by <span className="font-bold text-navy">40%</span> by implementing lazy loading and code splitting in React</li>
                          <li>Built REST APIs serving <span className="font-bold text-navy">50,000+ daily active users</span></li>
                          <li>Led a team of 3 developers to ship a billing module <span className="font-bold text-navy">2 weeks ahead of schedule</span></li>
                        </ul>
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-baseline mb-1">
                          <h5 className="text-sm font-bold text-navy">Junior Developer — StartupXYZ</h5>
                          <span className="text-xs text-muted font-bold">2021–2022</span>
                        </div>
                        <ul className="list-disc list-inside text-sm text-body space-y-1.5 marker:text-body ml-1">
                          <li>Developed <span className="font-bold text-navy">8 responsive UI components</span> used across 3 products</li>
                          <li>Automated reporting pipeline saving <span className="font-bold text-navy">5 hours/week</span> of manual work</li>
                        </ul>
                      </div>
                    </div>
                    
                    {/* Annotation Bubble */}
                    <div className="absolute -right-4 top-[40%] translate-x-full -translate-y-1/2 hidden xl:flex items-center gap-2">
                      <div className="h-0.5 w-8 bg-emerald-400 rounded-full"></div>
                      <div className="bg-pageBg border border-emerald-500/30 text-emerald-700 text-xs px-3 py-1.5 rounded-lg whitespace-nowrap font-medium flex items-center gap-1.5 shadow-xl shadow-emerald-500/10">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Use numbers & impact
                      </div>
                    </div>
                  </section>

                  {/* Education & Projects */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <section>
                      <h4 className="text-sm font-bold text-navy border-b border-navy-100 pb-1.5 mb-3 tracking-wider">EDUCATION</h4>
                      <div className="text-sm text-body space-y-0.5">
                        <p className="font-bold text-navy">B.Tech in Computer Science</p>
                        <p>JNTU Hyderabad | 2021</p>
                        <p className="font-bold text-navy mt-1">CGPA: 8.4/10</p>
                      </div>
                    </section>
                    
                    <section>
                      <h4 className="text-sm font-bold text-navy border-b border-navy-100 pb-1.5 mb-3 tracking-wider">PROJECTS</h4>
                      <ul className="text-sm text-body space-y-2.5">
                        <li>
                          <span className="font-bold text-navy flex items-center gap-1">★ LetMeCheck</span>
                          <p className="text-xs mt-0.5 pl-4">AI Resume Analyzer (React, Supabase, Gemini API)</p>
                        </li>
                        <li>
                          <span className="font-bold text-navy flex items-center gap-1">★ E-Commerce Platform</span>
                          <p className="text-xs mt-0.5 pl-4">10,000+ users, payment gateway integration</p>
                        </li>
                      </ul>
                    </section>
                  </div>

                </div>
                
                {/* Score Badge Overlay */}
                <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-pageBg border-2 border-emerald-500/50 flex flex-col items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.4)] z-10 rotate-3">
                  <span className="text-emerald-700 text-2xl font-black leading-none mt-1">92</span>
                  <span className="text-[9px] text-body font-bold uppercase tracking-wider mt-1">AI Score</span>
                </div>
              </div>
            </motion.div>

          </div>
        </div>

        {/* Bottom Stat Cards */}
        <div className="mt-24 flex flex-wrap justify-center gap-4 lg:gap-8">
          {[
            { icon: FileText, label: "1 Page" },
            { icon: Target, label: "ATS Optimised" },
            { icon: Zap, label: "Keyword Rich" }
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
              className="flex items-center gap-3 px-6 py-3.5 rounded-xl bg-navy-50 border border-navy-100 backdrop-blur-md shadow-lg hover:bg-navy-100 transition-colors"
            >
              <stat.icon className="w-5 h-5 text-indigo-400" />
              <span className="text-navy font-semibold text-sm tracking-wide">{stat.label}</span>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}







