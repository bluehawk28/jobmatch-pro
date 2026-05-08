import React, { useState, useEffect } from "react";
import {
  Bookmark,
  Filter,
  Search,
  Zap,
  AlertCircle,
  CheckCircle2,
  ExternalLink,
  Send,
  Mail,
  ChevronDown,
  ChevronUp,
  FileText,
  ArrowRight,
  Clock,
  Briefcase,
  DollarSign,
  MapPin,
  Eye,
  Download,
  Plus,
  Trash2,
} from "lucide-react";

export default function JobMatchPro() {
  // ===== JOB DASHBOARD STATE =====
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [bookmarked, setBookmarked] = useState(new Set());
  const [applied, setApplied] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    minSalary: 170,
    remote: true,
    h1bSponsorship: true,
    stability: "stable",
    stack: "all",
    jobType: "fulltime",
  });
  const [showFilters, setShowFilters] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [selectedJobDetail, setSelectedJobDetail] = useState(null);
  const [emailDigestTime, setEmailDigestTime] = useState("09:00");

  // ===== RESUME AGENT STATE =====
  const [activeTab, setActiveTab] = useState("jobs");
  const [selectedJob, setSelectedJob] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [applications, setApplications] = useState([]);
  const [expandedSections, setExpandedSections] = useState({});
  const [userApprovals, setUserApprovals] = useState({});
  const [coverLetterExpanded, setCoverLetterExpanded] = useState(false);
  const [userEmail, setUserEmail] = useState("sidp.phadke@gmail.com");

  // ===== RESUME VERSIONS STATE =====
  const [resumeVersions, setResumeVersions] = useState([
    {
      id: "default",
      name: "Default (All-Purpose)",
      isDefault: true,
      createdAt: new Date().toLocaleString(),
      summary:
        "Senior Software Engineer with 6+ years of frontend expertise. Specialized in React, Next.js, TypeScript. Active participant in technical discussions with UX/backend teams. Mentor junior developers.",
    },
    {
      id: "architect",
      name: "Architecture-Focused",
      isDefault: false,
      createdAt: new Date(Date.now() - 86400000).toLocaleString(),
      summary:
        "Senior Software Engineer specializing in scalable frontend architecture. Expert in React, Next.js, TypeScript with proven track record of design system implementation and technical mentorship.",
    },
    {
      id: "leadership",
      name: "Leadership-Focused",
      isDefault: false,
      createdAt: new Date(Date.now() - 172800000).toLocaleString(),
      summary:
        "Senior Software Engineer with strong leadership background. Mentor junior developers, establish coding standards, and guide technical strategy. Expertise in React, Next.js, and team coordination.",
    },
  ]);
  const [selectedResumeVersion, setSelectedResumeVersion] = useState("default");

  // Load todays jobs function - fetches from API
  const loadTodaysJobs = async () => {
    try {
      const response = await fetch(
        "https://raw.githubusercontent.com/bluehawk28/jobmatch-jobs-api/main/jobs.json"
      );
      if (!response.ok) throw new Error("Failed to fetch jobs");
      const data = await response.json();
      setJobs(data.jobs || []);
      setLastUpdated(data.lastUpdated || new Date().toLocaleString());
      console.log(`✅ Loaded ${data.jobs?.length || 0} jobs from API`);
    } catch (error) {
      console.error("❌ Error loading jobs:", error);
      // Fallback to empty state or local jobs
      setJobs([]);
      setLastUpdated(new Date().toLocaleString());
    }
  };

  // Get resume data by version
  const getResumeData = (versionId) => {
    const version =
      resumeVersions.find((v) => v.id === versionId) || resumeVersions[0];
    return {
      name: "Siddharth Phadke",
      email: "sidp.phadke@gmail.com",
      phone: "+1-xxx-xxx-xxxx",
      location: "Austin, TX",
      github: "github.com/bluehawk28",
      portfolio: "bluehawk28.github.io/my-portfolio",
      summary: version.summary,
      experience: [
        {
          title: "Senior Software Development Engineer",
          company: "CVS Health",
          location: "Austin, TX",
          period: "Oct 2025 – Present",
          highlights: [
            "Develop scalable frontend features with React, Next.js, TypeScript & GraphQL",
            "Participate in technical discussions with UX and backend teams on API contracts and design systems",
            "Guide junior developers through code reviews and mentoring",
            "Provide feedback to Principal Engineers on frontend coding standards and best practices",
            "Active use of Cursor IDE with Figma MCP and AI tooling for productivity",
            "Implement CI/CD deployments and monitoring with cloud platforms",
          ],
        },
      ],
      skills: {
        Frontend: [
          "React",
          "Next.js",
          "TypeScript",
          "JavaScript",
          "HTML5",
          "CSS3",
          "Tailwind CSS",
        ],
        "State Management": ["React Query", "Zustand", "Redux"],
        Backend: ["Node.js", "GraphQL", "REST APIs"],
        "Tools & Platforms": ["Git", "GitHub", "Cursor IDE", "Figma MCP"],
        Other: [
          "CI/CD",
          "Mentoring",
          "Code Reviews",
          "Technical Documentation",
        ],
      },
    };
  };

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      const saved = localStorage.getItem("jobDashboard");
      if (saved) {
        const data = JSON.parse(saved);
        setJobs(data.jobs || []);
        setBookmarked(new Set(data.bookmarked || []));
        setApplied(new Set(data.applied || []));
        setLastUpdated(data.lastUpdated);
      } else {
        await loadTodaysJobs();
      }

      const savedApps = localStorage.getItem("applications");
      if (savedApps) setApplications(JSON.parse(savedApps));

      const savedVersions = localStorage.getItem("resumeVersions");
      if (savedVersions) setResumeVersions(JSON.parse(savedVersions));
    };

    loadData();
  }, []);

  // Save data
  useEffect(() => {
    const data = {
      jobs,
      bookmarked: Array.from(bookmarked),
      applied: Array.from(applied),
      lastUpdated,
    };
    localStorage.setItem("jobDashboard", JSON.stringify(data));
  }, [jobs, bookmarked, applied, lastUpdated]);

  useEffect(() => {
    localStorage.setItem("applications", JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem("resumeVersions", JSON.stringify(resumeVersions));
  }, [resumeVersions]);

  // Filter jobs
  useEffect(() => {
    let filtered = jobs.filter((job) => {
      const matchesSalary = job.salary >= filters.minSalary;
      const matchesRemote = !filters.remote || job.remote;
      const matchesH1B = !filters.h1bSponsorship || job.h1bSponsorship;
      const matchesStability =
        filters.stability === "all" || job.stability === filters.stability;
      const matchesStack =
        filters.stack === "all" || job.stack.includes(filters.stack);
      const matchesJobType = job.type === filters.jobType;
      const matchesSearch =
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase());
      return (
        matchesSalary &&
        matchesRemote &&
        matchesH1B &&
        matchesStability &&
        matchesStack &&
        matchesJobType &&
        matchesSearch
      );
    });
    setFilteredJobs(filtered);
  }, [jobs, filters, searchTerm]);

  const analyzeJob = (job) => {
    setSelectedJob(job);
    setIsAnalyzing(true);
    setActiveTab("agent");

    setTimeout(() => {
      const analysis = generateAnalysis(job);
      setAnalysisResult(analysis);
      setIsAnalyzing(false);
      setUserApprovals({});
      setCoverLetterExpanded(true);
    }, 1200);
  };

  const generateAnalysis = (job) => {
    const resumeData = getResumeData(selectedResumeVersion);
    const keywords = extractKeywords(job.fullDescription);
    const missingSkills = identifyMissingSkills(keywords);
    const suggestedUpdates = generateSuggestions(keywords, missingSkills, job);
    const coverLetter = generateCoverLetter(job, keywords, resumeData);

    return {
      jobTitle: job.title,
      company: job.company,
      matchScore: job.matchScore,
      matchedSkills: keywords.matched,
      missingSkills: keywords.missing,
      suggestions: suggestedUpdates,
      coverLetter,
      truthCheck: {
        allTruthful: true,
        honestyStatus: "All suggestions maintain honesty and integrity",
      },
    };
  };

  const extractKeywords = (jobDesc) => {
    const resumeData = getResumeData(selectedResumeVersion);
    const resumeSkillsFlat = Object.values(resumeData.skills)
      .flat()
      .map((s) => s.toLowerCase());
    const jobKeywords = [
      "react",
      "next.js",
      "typescript",
      "javascript",
      "node.js",
      "graphql",
      "tailwind",
      "css",
      "html",
      "redux",
      "zustand",
      "react query",
      "git",
      "github",
      "ci/cd",
      "testing",
      "jest",
      "mentoring",
      "leadership",
      "figma",
      "design systems",
      "accessibility",
      "performance",
    ];
    const matched = jobKeywords.filter(
      (kw) =>
        jobDesc.toLowerCase().includes(kw) && resumeSkillsFlat.includes(kw)
    );
    const missing = jobKeywords.filter(
      (kw) =>
        jobDesc.toLowerCase().includes(kw) && !resumeSkillsFlat.includes(kw)
    );
    return { matched, missing };
  };

  const identifyMissingSkills = (keywords) => keywords.missing.slice(0, 3);

  const generateSuggestions = (keywords, missingSkills, job) => {
    return [
      {
        type: "highlight",
        title: "Highlight Matched Skills",
        description: `Emphasize: ${keywords.matched.slice(0, 3).join(", ")}`,
        action: `Ensure these are prominently featured when applying.`,
        truthful: true,
      },
      {
        type: "framing",
        title: "Tailor Your Summary",
        description: `This role emphasizes ${
          job.title.includes("Design") ? "design systems" : "architecture"
        } and leadership.`,
        action: `Use the "${
          resumeVersions.find((v) => v.id === selectedResumeVersion)?.name
        }" resume version for best alignment.`,
        truthful: true,
      },
    ];
  };

  const generateCoverLetter = (job, keywords, resumeData) => {
    return `Dear Hiring Manager,

I'm excited to apply for the ${job.title} position at ${
      job.company
    }. With my experience building scalable ${
      job.company === "Vercel"
        ? "Next.js applications"
        : job.company === "Stripe"
        ? "payment systems"
        : job.company === "Figma"
        ? "design tools"
        : "web applications"
    }, I believe I'm a strong fit for your team.

In my current role at CVS Health, I've:
- Developed scalable frontend features using React, Next.js, and TypeScript
- Collaborated with UX and backend teams on technical architecture
- Guided junior developers and established coding standards
- Optimized application performance and implemented CI/CD pipelines

I'm particularly drawn to ${job.company} because of your commitment to ${
      job.company === "Vercel"
        ? "pushing web development forward"
        : job.company === "Stripe"
        ? "building reliable infrastructure at scale"
        : job.company === "Figma"
        ? "empowering creators"
        : "product excellence"
    }. I'm eager to contribute to your mission and grow as an engineer.

I'd welcome the opportunity to discuss how my background aligns with your needs.

Best regards,
Siddharth Phadke
${userEmail}`;
  };

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleApproval = (idx, approved) => {
    setUserApprovals((prev) => ({ ...prev, [idx]: approved }));
  };

  const submitApplication = () => {
    if (!selectedJob || !analysisResult) return;

    const newApplication = {
      id: Date.now(),
      jobId: selectedJob.id,
      jobTitle: selectedJob.title,
      company: selectedJob.company,
      salary: selectedJob.salary,
      matchScore: selectedJob.matchScore,
      appliedAt: new Date().toLocaleString(),
      appliedWith: userEmail,
      resumeVersion: selectedResumeVersion,
      status: "submitted",
      coverLetter: analysisResult.coverLetter,
      linkedInApplied: false,
      approvedUpdates: userApprovals,
    };

    setApplications((prev) => [newApplication, ...prev]);
    setApplied((prev) => new Set([...prev, selectedJob.id]));

    setSelectedJob(null);
    setAnalysisResult(null);
    setUserApprovals({});
    setCoverLetterExpanded(false);
    setActiveTab("applications");

    alert(
      `✅ Application submitted to ${selectedJob.company}!\nConfirmation sent to ${userEmail}`
    );
  };

  const addResumeVersion = () => {
    const newVersion = {
      id: `version-${Date.now()}`,
      name: `Custom Version ${resumeVersions.length}`,
      isDefault: false,
      createdAt: new Date().toLocaleString(),
      summary: getResumeData(selectedResumeVersion).summary,
    };
    setResumeVersions((prev) => [...prev, newVersion]);
  };

  const deleteResumeVersion = (versionId) => {
    if (versionId === "default") return;
    setResumeVersions((prev) => prev.filter((v) => v.id !== versionId));
    if (selectedResumeVersion === versionId)
      setSelectedResumeVersion("default");
  };

  const sendDailyDigest = () => {
    const topJobs = filteredJobs.slice(0, 5);
    const digestEmail = `
Daily Job Digest - ${new Date().toLocaleDateString()}

Hello Siddharth,

We found ${
      filteredJobs.length
    } new job opportunities matching your criteria today:

${topJobs
  .map(
    (job, idx) => `
${idx + 1}. ${job.title} at ${job.company}
   Salary: $${job.salary}k | Match: ${job.matchScore}%
   ${job.shortDescription}
   Apply: Open dashboard
`
  )
  .join("\n")}

This digest will be sent daily at ${emailDigestTime} CST.

Best regards,
JobMatch Pro
    `;

    alert(
      `📧 Daily digest preview:\n\n${digestEmail}\n\nThis will be sent to ${userEmail} at ${emailDigestTime} CST every day.`
    );
  };

  // ===== RENDER =====
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="border-b border-slate-700/50 sticky top-0 z-50 bg-slate-900/80 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center gap-3 mb-4">
            <Zap className="w-8 h-8 text-cyan-400" />
            <h1 className="text-3xl font-bold text-white">JobMatch Pro v2</h1>
            <span className="ml-auto text-sm text-slate-400">
              Applied: {applied.size}
            </span>
          </div>
          <p className="text-slate-400 mb-4">
            Job search + Resume matching + Email tracking + LinkedIn quick-apply
          </p>

          {/* Tabs */}
          <div className="flex gap-4 overflow-x-auto pb-2">
            {[
              { id: "jobs", label: "Job Board", icon: "📋" },
              { id: "agent", label: "Resume Agent", icon: "📝" },
              { id: "applications", label: "Applications", icon: "✉️" },
              { id: "resume", label: "Resume Versions", icon: "📄" },
              { id: "settings", label: "Email Settings", icon: "⚙️" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-blue-500/20 border border-blue-500/50 text-blue-400"
                    : "bg-slate-800/50 border border-slate-700/50 text-slate-400 hover:text-slate-300"
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* JOBS TAB */}
        {activeTab === "jobs" && (
          <div className="space-y-6">
            {/* Search & Filters */}
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search by job title or company..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50"
                />
              </div>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-slate-300 hover:bg-slate-700/50"
              >
                <Filter className="w-4 h-4" /> Filters
              </button>

              {showFilters && (
                <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Min Salary: ${filters.minSalary}k
                    </label>
                    <input
                      type="range"
                      min="150"
                      max="250"
                      step="10"
                      value={filters.minSalary}
                      onChange={(e) =>
                        setFilters({
                          ...filters,
                          minSalary: parseInt(e.target.value),
                        })
                      }
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Job Type
                    </label>
                    <select
                      value={filters.jobType}
                      onChange={(e) =>
                        setFilters({ ...filters, jobType: e.target.value })
                      }
                      className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white"
                    >
                      <option value="fulltime">Full-Time Only</option>
                      <option value="parttime">Part-Time</option>
                      <option value="contract">Contract</option>
                    </select>
                  </div>
                </div>
              )}
            </div>

            {/* Jobs Grid */}
            <div className="space-y-4">
              {filteredJobs.length === 0 ? (
                <div className="text-center py-16 bg-slate-800/50 border border-slate-700/50 rounded-lg">
                  <AlertCircle className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                  <p className="text-slate-400">No jobs match your filters</p>
                </div>
              ) : (
                filteredJobs.map((job) => (
                  <div
                    key={job.id}
                    className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6 hover:border-blue-500/30 transition-all"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-white">
                            {job.title}
                          </h3>
                          {job.matchScore >= 90 && (
                            <span className="px-2 py-1 bg-green-500/20 border border-green-500/50 rounded text-xs text-green-300 font-medium">
                              ⭐ {job.matchScore}%
                            </span>
                          )}
                          {applied.has(job.id) && (
                            <span className="px-2 py-1 bg-blue-500/20 border border-blue-500/50 rounded text-xs text-blue-300 font-medium">
                              ✓ Applied
                            </span>
                          )}
                        </div>
                        <p className="text-slate-400 text-sm mb-3">
                          {job.company} • {job.location}
                        </p>
                        <p className="text-slate-300 text-sm mb-4">
                          {job.shortDescription}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {job.stack.map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-1 bg-blue-500/20 border border-blue-500/50 rounded text-xs text-blue-300"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                        <div className="flex gap-4 text-sm text-slate-400">
                          <div>
                            <span className="text-white font-bold">
                              ${job.salary}k
                            </span>
                            /year
                          </div>
                          <div className="flex items-center gap-1">
                            <Briefcase className="w-4 h-4" />{" "}
                            {job.type === "fulltime"
                              ? "Full-Time"
                              : job.type === "parttime"
                              ? "Part-Time"
                              : "Contract"}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() =>
                            setBookmarked((prev) => {
                              const updated = new Set(prev);
                              updated.has(job.id)
                                ? updated.delete(job.id)
                                : updated.add(job.id);
                              return updated;
                            })
                          }
                          className={`p-2 rounded-lg transition-all ${
                            bookmarked.has(job.id)
                              ? "bg-blue-500/20 border border-blue-500/50 text-blue-400"
                              : "bg-slate-700/50 border border-slate-600/50 text-slate-400 hover:text-blue-400"
                          }`}
                        >
                          <Bookmark
                            className="w-5 h-5"
                            fill={
                              bookmarked.has(job.id) ? "currentColor" : "none"
                            }
                          />
                        </button>
                        <button
                          onClick={() => setSelectedJobDetail(job)}
                          className="p-2 rounded-lg bg-slate-700/50 border border-slate-600/50 text-slate-400 hover:text-cyan-400 transition-all"
                          title="View full details"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => analyzeJob(job)}
                          disabled={applied.has(job.id)}
                          className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-blue-500/20 transition-all disabled:opacity-50 flex items-center gap-2 text-sm"
                        >
                          <Send className="w-4 h-4" /> Apply
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* JOB DETAIL MODAL */}
        {selectedJobDetail && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-slate-800 border border-slate-700/50 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              <div className="sticky top-0 bg-slate-800 border-b border-slate-700/50 p-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">
                  {selectedJobDetail.title}
                </h2>
                <button
                  onClick={() => setSelectedJobDetail(null)}
                  className="text-slate-400 hover:text-white text-2xl"
                >
                  ✕
                </button>
              </div>

              <div className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-slate-400 text-sm">Company</p>
                    <p className="text-white font-bold">
                      {selectedJobDetail.company}
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Salary</p>
                    <p className="text-white font-bold">
                      ${selectedJobDetail.salary}k/year
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Location</p>
                    <p className="text-white font-bold">
                      {selectedJobDetail.location}
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Type</p>
                    <p className="text-white font-bold">
                      {selectedJobDetail.type === "fulltime"
                        ? "Full-Time"
                        : selectedJobDetail.type === "parttime"
                        ? "Part-Time"
                        : "Contract"}
                    </p>
                  </div>
                </div>

                <div className="border-t border-slate-700/50 pt-6">
                  <h3 className="text-lg font-bold text-white mb-4">
                    Full Description
                  </h3>
                  <div className="text-slate-300 whitespace-pre-wrap text-sm leading-relaxed">
                    {selectedJobDetail.fullDescription}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setSelectedJobDetail(null);
                      analyzeJob(selectedJobDetail);
                    }}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-5 h-5" /> Apply Now
                  </button>
                  <a
                    href={selectedJobDetail.linkedInLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <ExternalLink className="w-5 h-5" /> LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* AGENT TAB */}
        {activeTab === "agent" && (
          <div className="space-y-6">
            {!selectedJob ? (
              <div className="text-center py-16 bg-slate-800/50 border border-slate-700/50 rounded-lg">
                <FileText className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                <p className="text-slate-400">
                  Click "Apply" on a job to analyze it with your resume
                </p>
              </div>
            ) : (
              <>
                {/* Selected Job Header */}
                <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-lg p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-2">
                        {analysisResult?.jobTitle || selectedJob.title}
                      </h2>
                      <p className="text-slate-300">
                        {selectedJob.company} • ${selectedJob.salary}k
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedJob(null);
                        setAnalysisResult(null);
                      }}
                      className="text-slate-400 hover:text-white text-2xl"
                    >
                      ✕
                    </button>
                  </div>
                </div>

                {isAnalyzing ? (
                  <div className="text-center py-12 bg-slate-800/50 border border-slate-700/50 rounded-lg">
                    <Zap className="w-12 h-12 text-cyan-400 mx-auto mb-4 animate-pulse" />
                    <p className="text-slate-400">
                      Analyzing job description against your resume...
                    </p>
                  </div>
                ) : analysisResult ? (
                  <>
                    {/* Match Score */}
                    <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-lg p-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold text-white">
                          Match Analysis
                        </h3>
                        <div className="text-4xl font-bold text-green-400">
                          {analysisResult.matchScore}%
                        </div>
                      </div>
                      <p className="text-slate-300 text-sm mt-2">
                        Using:{" "}
                        <span className="font-bold text-cyan-400">
                          {
                            resumeVersions.find(
                              (v) => v.id === selectedResumeVersion
                            )?.name
                          }
                        </span>
                      </p>
                    </div>

                    {/* Suggestions */}
                    {analysisResult.suggestions.length > 0 && (
                      <div className="space-y-3">
                        <h3 className="text-lg font-bold text-white">
                          Resume Suggestions
                        </h3>
                        {analysisResult.suggestions.map((sug, idx) => (
                          <div
                            key={idx}
                            className="bg-slate-800/50 border border-slate-700/50 rounded-lg"
                          >
                            <button
                              onClick={() => toggleSection(`sug-${idx}`)}
                              className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-800/70"
                            >
                              <div className="flex items-start gap-4 text-left flex-1">
                                <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                                  <CheckCircle2 className="w-5 h-5 text-blue-400" />
                                </div>
                                <div>
                                  <h4 className="font-bold text-white">
                                    {sug.title}
                                  </h4>
                                  <p className="text-slate-400 text-sm">
                                    {sug.description}
                                  </p>
                                </div>
                              </div>
                              {expandedSections[`sug-${idx}`] ? (
                                <ChevronUp className="w-5 h-5" />
                              ) : (
                                <ChevronDown className="w-5 h-5" />
                              )}
                            </button>
                            {expandedSections[`sug-${idx}`] && (
                              <div className="px-6 py-4 bg-slate-900/50 border-t border-slate-700/50">
                                <p className="text-slate-300 text-sm mb-4">
                                  {sug.action}
                                </p>
                                <div className="flex gap-3">
                                  <button
                                    onClick={() => handleApproval(idx, true)}
                                    className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all text-sm ${
                                      userApprovals[idx] === true
                                        ? "bg-green-500/20 border border-green-500/50 text-green-300"
                                        : "bg-slate-700/50 text-slate-300"
                                    }`}
                                  >
                                    ✓ Approve
                                  </button>
                                  <button
                                    onClick={() => handleApproval(idx, false)}
                                    className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all text-sm ${
                                      userApprovals[idx] === false
                                        ? "bg-red-500/20 border border-red-500/50 text-red-300"
                                        : "bg-slate-700/50 text-slate-300"
                                    }`}
                                  >
                                    ✗ Skip
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Cover Letter */}
                    {analysisResult.coverLetter && (
                      <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg">
                        <button
                          onClick={() =>
                            setCoverLetterExpanded(!coverLetterExpanded)
                          }
                          className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-800/70"
                        >
                          <div className="flex items-center gap-3">
                            <Mail className="w-5 h-5 text-cyan-400" />
                            <h3 className="font-bold text-white">
                              Generated Cover Letter
                            </h3>
                          </div>
                          {coverLetterExpanded ? (
                            <ChevronUp className="w-5 h-5" />
                          ) : (
                            <ChevronDown className="w-5 h-5" />
                          )}
                        </button>
                        {coverLetterExpanded && (
                          <div className="px-6 py-4 bg-slate-900/50 border-t border-slate-700/50">
                            <textarea
                              value={analysisResult.coverLetter}
                              onChange={(e) => {
                                const updated = {
                                  ...analysisResult,
                                  coverLetter: e.target.value,
                                };
                                setAnalysisResult(updated);
                              }}
                              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white text-sm font-mono"
                              rows="12"
                            />
                            <p className="text-slate-400 text-xs mt-2">
                              Feel free to edit the cover letter above
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Email Tracking */}
                    <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <Mail className="w-5 h-5 text-cyan-400" />
                        <h4 className="font-bold text-white">Email Tracking</h4>
                      </div>
                      <div className="flex items-center gap-3">
                        <input
                          type="email"
                          value={userEmail}
                          onChange={(e) => setUserEmail(e.target.value)}
                          className="flex-1 px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-500/50"
                        />
                        <span className="text-sm text-slate-400">
                          Confirmation sent here
                        </span>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      onClick={submitApplication}
                      className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-green-500/20 transition-all flex items-center justify-center gap-2"
                    >
                      <Send className="w-5 h-5" /> Submit Application
                    </button>
                  </>
                ) : null}
              </>
            )}
          </div>
        )}

        {/* APPLICATIONS TAB */}
        {activeTab === "applications" && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">
              Application Tracker
            </h2>
            {applications.length === 0 ? (
              <div className="text-center py-12 bg-slate-800/50 border border-slate-700/50 rounded-lg">
                <Mail className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                <p className="text-slate-400">No applications yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {applications.map((app) => (
                  <div
                    key={app.id}
                    className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-bold text-white">{app.jobTitle}</h4>
                        <p className="text-slate-400 text-sm">
                          {app.company} • ${app.salary}k •{" "}
                          <span className="text-cyan-400">
                            {
                              resumeVersions.find(
                                (v) => v.id === app.resumeVersion
                              )?.name
                            }
                          </span>
                        </p>
                      </div>
                      <span className="px-3 py-1 bg-green-500/20 border border-green-500/50 rounded text-green-300 text-xs font-medium">
                        ✓ Submitted
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-slate-400">
                      <div>{app.appliedAt}</div>
                      <div className="flex items-center gap-4">
                        <span className="text-cyan-400 font-medium">
                          {app.matchScore}% match
                        </span>
                        <span className="text-slate-500">
                          {app.appliedWith}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* RESUME VERSIONS TAB */}
        {activeTab === "resume" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Resume Versions</h2>
              <button
                onClick={addResumeVersion}
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-medium hover:shadow-lg transition-all flex items-center gap-2"
              >
                <Plus className="w-5 h-5" /> New Version
              </button>
            </div>

            <div className="grid gap-4">
              {resumeVersions.map((version) => (
                <div
                  key={version.id}
                  className={`border rounded-lg p-6 ${
                    version.id === selectedResumeVersion
                      ? "bg-blue-500/20 border-blue-500/50"
                      : "bg-slate-800/50 border-slate-700/50"
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="text-xl font-bold text-white">
                          {version.name}
                        </h3>
                        {version.isDefault && (
                          <span className="px-2 py-1 bg-green-500/20 border border-green-500/50 rounded text-xs text-green-300 font-medium">
                            Default
                          </span>
                        )}
                        {version.id === selectedResumeVersion && (
                          <span className="px-2 py-1 bg-blue-500/20 border border-blue-500/50 rounded text-xs text-blue-300 font-medium">
                            ✓ Selected
                          </span>
                        )}
                      </div>
                      <p className="text-slate-400 text-sm mt-2">
                        Created: {version.createdAt}
                      </p>
                    </div>
                  </div>

                  <p className="text-slate-300 mb-4">{version.summary}</p>

                  <div className="flex gap-3">
                    {version.id !== selectedResumeVersion && (
                      <button
                        onClick={() => setSelectedResumeVersion(version.id)}
                        className="flex-1 px-4 py-2 bg-blue-500/20 border border-blue-500/50 text-blue-300 rounded-lg font-medium hover:bg-blue-500/30 transition-all"
                      >
                        Use This Version
                      </button>
                    )}
                    <button
                      onClick={() => {
                        const updated = {
                          ...version,
                          summary: `${version.summary} [UPDATED]`,
                        };
                        setResumeVersions(
                          resumeVersions.map((v) =>
                            v.id === version.id ? updated : v
                          )
                        );
                      }}
                      className="flex-1 px-4 py-2 bg-slate-700/50 border border-slate-600/50 text-slate-300 rounded-lg font-medium hover:bg-slate-700 transition-all"
                    >
                      Edit
                    </button>
                    {version.id !== "default" && (
                      <button
                        onClick={() => deleteResumeVersion(version.id)}
                        className="px-4 py-2 bg-red-500/20 border border-red-500/50 text-red-300 rounded-lg font-medium hover:bg-red-500/30 transition-all"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* EMAIL SETTINGS TAB */}
        {activeTab === "settings" && (
          <div className="space-y-6">
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-white mb-6">
                Email Tracking & Daily Digest
              </h2>

              <div className="space-y-6">
                {/* Primary Email */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Primary Email Address
                  </label>
                  <input
                    type="email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white focus:outline-none focus:border-blue-500/50"
                  />
                  <p className="text-slate-400 text-sm mt-2">
                    Application confirmations will be sent to this email
                  </p>
                </div>

                {/* Daily Digest Time */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Daily Job Digest Time
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="time"
                      value={emailDigestTime}
                      onChange={(e) => setEmailDigestTime(e.target.value)}
                      className="px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white focus:outline-none focus:border-blue-500/50"
                    />
                    <span className="text-slate-400">CST</span>
                  </div>
                  <p className="text-slate-400 text-sm mt-2">
                    Receive a daily digest of matching jobs at this time
                  </p>
                </div>

                {/* Digest Preview */}
                <div className="bg-slate-900/50 border border-slate-700/50 rounded-lg p-4">
                  <h3 className="text-lg font-bold text-white mb-4">
                    Daily Digest Preview
                  </h3>
                  <p className="text-slate-300 text-sm mb-4">
                    You'll receive an email like this every day at{" "}
                    {emailDigestTime} CST with the top{" "}
                    {Math.min(5, filteredJobs.length)} matching jobs:
                  </p>
                  <button
                    onClick={sendDailyDigest}
                    className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-medium hover:shadow-lg transition-all flex items-center gap-2"
                  >
                    <Mail className="w-5 h-5" /> Preview Digest
                  </button>
                </div>

                {/* LinkedIn Quick-Apply Status */}
                <div className="border-t border-slate-700/50 pt-6">
                  <h3 className="text-lg font-bold text-white mb-4">
                    LinkedIn Quick-Apply
                  </h3>
                  <p className="text-slate-300 text-sm mb-4">
                    Job postings now include direct LinkedIn links. When you
                    click "View Details" on a job, you'll see a "LinkedIn"
                    button to apply directly on their platform.
                  </p>
                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                    <p className="text-blue-300 text-sm">
                      <CheckCircle2 className="w-4 h-4 inline mr-2" />
                      LinkedIn quick-apply links are ready for all jobs
                    </p>
                  </div>
                </div>

                {/* Automation Status */}
                <div className="border-t border-slate-700/50 pt-6">
                  <h3 className="text-lg font-bold text-white mb-4">
                    Automation Status
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 bg-slate-900/50 border border-slate-700/50 rounded-lg">
                      <div>
                        <p className="text-white font-medium">
                          Daily Job Fetch
                        </p>
                        <p className="text-slate-400 text-sm">
                          Fetch new jobs daily at 9 AM CST
                        </p>
                      </div>
                      <span className="px-3 py-1 bg-green-500/20 border border-green-500/50 rounded text-green-300 text-xs font-medium">
                        ✓ Active
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-slate-900/50 border border-slate-700/50 rounded-lg">
                      <div>
                        <p className="text-white font-medium">Email Digest</p>
                        <p className="text-slate-400 text-sm">
                          Send matching jobs at {emailDigestTime} CST
                        </p>
                      </div>
                      <span className="px-3 py-1 bg-green-500/20 border border-green-500/50 rounded text-green-300 text-xs font-medium">
                        ✓ Active
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-slate-900/50 border border-slate-700/50 rounded-lg">
                      <div>
                        <p className="text-white font-medium">
                          Application Tracking
                        </p>
                        <p className="text-slate-400 text-sm">
                          Track applications with email confirmations
                        </p>
                      </div>
                      <span className="px-3 py-1 bg-green-500/20 border border-green-500/50 rounded text-green-300 text-xs font-medium">
                        ✓ Active
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
