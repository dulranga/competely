export default function JudgeDashboardPage() {
    return (
        <div className="min-h-screen bg-[#fbf6f3] flex flex-col h-screen overflow-hidden">
            <div className="p-10 text-center">Select a submission to review from the dashboard.</div>
        </div>
    );
}

// "use client";

// import { useState, useMemo, useEffect } from "react";
// import { useParams, useRouter } from "next/navigation";
// import { ChevronLeft, ZoomIn, ZoomOut, RotateCcw, FileText, Github, ExternalLink, CheckCircle } from "lucide-react";
// import { BarChart, XAxis, Tooltip, ResponsiveContainer, Cell, Bar } from "recharts";
// import { Button } from "~/components/ui/button";
// import { Slider } from "~/components/ui/slider";
// import { toast } from "sonner";
// import { cn } from "~/lib/utils";
// import { useJudge } from "../judge-context";

// const CRITERIA = [
//     { id: "innovation", label: "Innovation", max: 10, weight: "30%" },
//     { id: "functionality", label: "Functionality", max: 10, weight: "30%" },
//     { id: "uiux", label: "UI / UX", max: 10, weight: "20%" },
//     { id: "pitch", label: "Pitch & Presentation", max: 10, weight: "10%" },
//     { id: "impact", label: "Social Impact", max: 10, weight: "10%" },
// ];

// export default function JudgeReviewPage() {
//     const params = useParams();
//     const router = useRouter();
//     const { getSubmission, updateMarks, saveDraft, submitEvaluation } = useJudge();

//     // Get ID from params (handling potential array case)
//     const subId = Array.isArray(params.id) ? params.id[0] : params.id;

//     const submission = getSubmission(subId);

//     const [zoomLevel, setZoomLevel] = useState(1);
//     const [isSubmitting, setIsSubmitting] = useState(false);

//     // Effect: Move to "Reviewed" (Draft) on load if not finished
//     useEffect(() => {
//         if (submission && submission.status === "to_review") {
//             saveDraft(submission.id);
//         }
//     }, [submission, saveDraft]);

//     // Handle missing submission
//     if (!submission) {
//         return <div className="p-10 text-center">Submission not found</div>;
//     }

//     const isLocked = submission.status === "finished";

//     const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.1, 2));
//     const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.1, 0.5));
//     const handleResetZoom = () => setZoomLevel(1);

//     const handleMarkChange = (id: string, value: number[]) => {
//         if (isLocked) return;
//         updateMarks(submission.id, { ...submission.marks, [id]: value[0] });
//     };

//     const chartData = useMemo(() => {
//         return CRITERIA.map((c) => ({
//             name: c.label.split(" ")[0], // Short name for axis
//             fullLabel: c.label,
//             score: submission.marks[c.id] || 0,
//             max: c.max,
//             color:
//                 (submission.marks[c.id] || 0) > 7
//                     ? "#6dd594"
//                     : (submission.marks[c.id] || 0) > 4
//                       ? "#e5ab7d"
//                       : "#ff5f56",
//         }));
//     }, [submission.marks]);

//     const totalScore = Object.values(submission.marks).reduce((a, b) => a + b, 0);
//     const maxScore = CRITERIA.reduce((a, b) => a + b.max, 0);

//     const handleSubmit = async () => {
//         setIsSubmitting(true);
//         // Simulate API call
//         await new Promise((resolve) => setTimeout(resolve, 800));
//         submitEvaluation(submission.id);
//         setIsSubmitting(false);
//         toast.success("Evaluation submitted successfully!");
//         router.push("/test/judge-dashboard");
//     };

//     return (
//         <div className="min-h-screen bg-[#fbf6f3] flex flex-col h-screen overflow-hidden">
//             {/* Header */}
//             <header className="px-6 py-4 bg-white border-b border-[#e8e2de] flex items-center justify-between shrink-0 z-20">
//                 <div className="flex items-center gap-4">
//                     <button
//                         onClick={() => router.back()}
//                         className="p-2 hover:bg-[#fbf6f3] rounded-xl transition-colors text-[#0c0803]/60"
//                     >
//                         <ChevronLeft size={20} />
//                     </button>
//                     <div>
//                         <h1 className="text-lg font-black text-[#0c0803]">{submission.teamName}</h1>
//                         <p className="text-xs text-[#0c0803]/40 font-bold uppercase tracking-wide">
//                             {submission.projectTitle}
//                         </p>
//                     </div>
//                 </div>
//                 <div className="flex items-center gap-4">
//                     <div className="text-right mr-4">
//                         <div className="text-xs font-black text-[#0c0803]/30 uppercase tracking-widest">
//                             Total Score
//                         </div>
//                         <div className="text-2xl font-black text-[#0c0803]">
//                             {totalScore} <span className="text-lg text-[#0c0803]/30">/ {maxScore}</span>
//                         </div>
//                     </div>
//                     {isLocked ? (
//                         <div className="px-6 py-2 bg-[#fbf6f3] text-[#0c0803]/40 border border-[#e8e2de] rounded-xl font-bold flex items-center gap-2">
//                             <CheckCircle size={16} /> Submitted
//                         </div>
//                     ) : (
//                         <Button
//                             onClick={handleSubmit}
//                             disabled={isSubmitting}
//                             className="bg-[#0c0803] text-white hover:bg-[#0c0803]/80 rounded-xl px-6 font-bold"
//                         >
//                             {isSubmitting ? "Submitting..." : "Submit Evaluation"}
//                         </Button>
//                     )}
//                 </div>
//             </header>

//             {/* Split View Content */}
//             <div className="flex-1 flex overflow-hidden">
//                 {/* Left Panel: Submission Content */}
//                 <div className="flex-1 bg-[#fbf6f3] flex flex-col relative border-r border-[#e8e2de]">
//                     {/* Toolbar */}
//                     <div className="h-12 bg-white/80 backdrop-blur-sm border-b border-[#e8e2de] flex items-center justify-between px-4 sticky top-0 z-10">
//                         <div className="flex items-center gap-2">
//                             <span className="text-xs font-black uppercase tracking-widest text-[#0c0803]/40 flex items-center gap-2">
//                                 <FileText size={14} /> Project Description
//                             </span>
//                         </div>
//                         <div className="flex items-center gap-1 bg-white border border-[#e8e2de] rounded-lg p-1 shadow-sm">
//                             <button
//                                 onClick={handleZoomOut}
//                                 className="p-1.5 hover:bg-[#fbf6f3] rounded-md text-[#0c0803]/60"
//                             >
//                                 <ZoomOut size={16} />
//                             </button>
//                             <span className="text-xs font-mono w-12 text-center text-[#0c0803]/60">
//                                 {Math.round(zoomLevel * 100)}%
//                             </span>
//                             <button
//                                 onClick={handleZoomIn}
//                                 className="p-1.5 hover:bg-[#fbf6f3] rounded-md text-[#0c0803]/60"
//                             >
//                                 <ZoomIn size={16} />
//                             </button>
//                             <div className="w-px h-4 bg-[#e8e2de] mx-1" />
//                             <button
//                                 onClick={handleResetZoom}
//                                 className="p-1.5 hover:bg-[#fbf6f3] rounded-md text-[#0c0803]/60"
//                                 title="Reset Zoom"
//                             >
//                                 <RotateCcw size={14} />
//                             </button>
//                         </div>
//                     </div>

//                     {/* Content Scroll Area */}
//                     <div className="flex-1 overflow-auto p-8 flex justify-center bg-[#2e303d]/5">
//                         <div
//                             className="bg-white rounded-[2px] shadow-lg border border-[#e8e2de] p-12 max-w-3xl w-full min-h-[800px] transition-transform origin-top duration-200 ease-out"
//                             style={{ transform: `scale(${zoomLevel})` }}
//                         >
//                             <h1 className="text-4xl font-black text-[#0c0803] mb-6">{submission.projectTitle}</h1>

//                             <div className="flex flex-wrap gap-2 mb-8">
//                                 {submission.techStack.map((tech) => (
//                                     <span
//                                         key={tech}
//                                         className="px-3 py-1 bg-[#fbf6f3] border border-[#e8e2de] rounded-lg text-xs font-bold text-[#0c0803]/60"
//                                     >
//                                         {tech}
//                                     </span>
//                                 ))}
//                             </div>

//                             <div className="space-y-6 text-[#0c0803]/80 leading-relaxed text-lg">
//                                 <p>{submission.description}</p>
//                                 <p>{submission.content}</p>
//                             </div>

//                             <div className="flex flex-col gap-4 mt-12 pt-8 border-t border-[#e8e2de]">
//                                 <h3 className="text-sm font-black uppercase tracking-widest text-[#0c0803]/40">
//                                     Links
//                                 </h3>
//                                 <div className="flex gap-4">
//                                     <a
//                                         href="#"
//                                         className="flex items-center gap-2 text-[#0c0803] font-bold hover:text-[#e5ab7d] transition-colors"
//                                     >
//                                         <Github size={18} /> Source Code
//                                     </a>
//                                     <a
//                                         href="#"
//                                         className="flex items-center gap-2 text-[#0c0803] font-bold hover:text-[#e5ab7d] transition-colors"
//                                     >
//                                         <ExternalLink size={18} /> Live Demo
//                                     </a>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Right Panel: Grading Interface */}
//                 <div className="w-[450px] bg-white border-l border-[#e8e2de] flex flex-col shrink-0">
//                     <div className="p-6 border-b border-[#e8e2de] bg-[#fbf6f3]/30">
//                         <h2 className="font-black text-xl text-[#0c0803] flex items-center gap-2">
//                             <CheckCircle className="text-[#6dd594]" size={20} /> Evaluation Criteria
//                         </h2>
//                     </div>

//                     <div className="flex-1 overflow-auto p-6 space-y-8 pb-32">
//                         {/* Visualization */}
//                         <div className="h-48 w-full bg-[#fbf6f3] rounded-2xl p-4 border border-[#e8e2de]">
//                             <ResponsiveContainer width="100%" height="100%">
//                                 <BarChart data={chartData} barSize={20}>
//                                     <XAxis
//                                         dataKey="name"
//                                         axisLine={false}
//                                         tickLine={false}
//                                         tick={{ fontSize: 10, fill: "#0c0803" }}
//                                     />
//                                     <Tooltip
//                                         cursor={{ fill: "transparent" }}
//                                         contentStyle={{
//                                             borderRadius: "12px",
//                                             border: "none",
//                                             boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
//                                         }}
//                                     />
//                                     <Bar dataKey="score" radius={[4, 4, 0, 0]}>
//                                         {chartData.map((entry, index) => (
//                                             <Cell key={`cell-${index}`} fill={entry.color} />
//                                         ))}
//                                     </Bar>
//                                 </BarChart>
//                             </ResponsiveContainer>
//                         </div>

//                         {/* Interactive Sliders */}
//                         <div className="space-y-8">
//                             {CRITERIA.map((criterion) => (
//                                 <div key={criterion.id} className="space-y-4">
//                                     <div className="flex items-center justify-between">
//                                         <div>
//                                             <label className="font-bold text-sm text-[#0c0803]">
//                                                 {criterion.label}
//                                             </label>
//                                             <div className="text-[10px] font-bold text-[#0c0803]/30 uppercase tracking-widest leading-none mt-1">
//                                                 Weight: {criterion.weight}
//                                             </div>
//                                         </div>
//                                         <div
//                                             className={cn(
//                                                 "px-3 py-1 rounded-lg border font-mono font-bold transition-colors",
//                                                 isLocked
//                                                     ? "bg-[#fbf6f3] border-[#e8e2de] text-[#0c0803]/40"
//                                                     : "bg-[#0c0803] text-white border-transparent",
//                                             )}
//                                         >
//                                             {submission.marks[criterion.id]}{" "}
//                                             <span
//                                                 className={cn(
//                                                     "text-xs",
//                                                     isLocked ? "text-[#0c0803]/20" : "text-white/50",
//                                                 )}
//                                             >
//                                                 / {criterion.max}
//                                             </span>
//                                         </div>
//                                     </div>
//                                     <Slider
//                                         value={[submission.marks[criterion.id] || 0]}
//                                         max={criterion.max}
//                                         step={1}
//                                         disabled={isLocked}
//                                         onValueChange={(val) => handleMarkChange(criterion.id, val)}
//                                         className={cn("py-2", isLocked && "opacity-50 cursor-not-allowed")}
//                                     />
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }
