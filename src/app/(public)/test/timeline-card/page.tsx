export default function TimelineCardPage() {
    return (
        <div className="min-h-screen bg-[#fbf6f3] flex flex-col h-screen overflow-hidden">
            <div className="p-10 text-center">Select a submission to review from the dashboard.</div>
        </div>
    );
}

// "use client";

// import { useState } from "react";
// import { TimelineCard, TimelineCardProps } from "~/components/timeline/TimelineCard";
// import mockData from "~/components/sample-data/timeline-variations.json";

// export default function TimelineTestPage() {
//     // Separate the interactive card data (event-2) from the rest
//     const initialEvent1 = mockData.find(d => d.id === "event-1");
//     const initialEvent2 = mockData.find(d => d.id === "event-2");

//     // State for the interactive card (Card 2)
//     const [card2Data, setCard2Data] = useState(initialEvent2 ? { ...initialEvent2.data } : {});
//     const [card2Config, setCard2Config] = useState({
//         showResources: true,
//         showLocation: true,
//         showLinks: true, // Specific resource types? No, just all resources.
//         showTime: true,
//         showEndTime: true,
//         notificationEnabled: true,
//         addToTimeline: true,
//         showAdminIcons: true,
//     });

//     // Helper to toggle config
//     const toggleConfig = (key: keyof typeof card2Config) => {
//         setCard2Config(prev => ({ ...prev, [key]: !prev[key] }));
//     };

//     // Construct the data passed to the component based on config
//     const getInteractiveData = () => {
//         const base = { ...card2Data };

//         // 1. Resources
//         if (!card2Config.showResources) {
//             base.resources = [];
//         }

//         // 2. Location
//         if (!card2Config.showLocation) {
//             base.location = null;
//         }

//         // 3. Time
//         if (!card2Config.showTime) {
//             base.startDatetime = undefined;
//             base.endDatetime = undefined;
//         } else if (!card2Config.showEndTime) {
//             base.endDatetime = undefined;
//         }

//         // 4. Notifications & Timeline
//         base.notificationEnabled = card2Config.notificationEnabled;
//         base.addToTimeline = card2Config.addToTimeline;

//         return base;
//     };

//     return (
//         <div className="min-h-screen bg-gray-50 p-8">
//             <div className="max-w-6xl mx-auto space-y-12">
//                 <header>
//                     <h1 className="text-3xl font-bold text-gray-900">Timeline Components Variations</h1>
//                     <p className="text-gray-500 mt-2">
//                         Testing the responsive TimelineCard component with different configurations.
//                     </p>
//                 </header>

//                 <hr className="border-gray-200" />

//                 {/* Variation 1: Event */}
//                 <section>
//                     <h2 className="text-xl font-bold text-gray-800 mb-6">1. Competition Event Version</h2>
//                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

//                         {/* Column 1: Static Card 1 */}
//                         <div className="space-y-4">
//                             <h3 className="text-lg font-semibold text-gray-700">Static Card (Event 1)</h3>
//                             {initialEvent1 && (
//                                 <TimelineCard
//                                     variant="event"
//                                     data={initialEvent1.data}
//                                     onEdit={() => console.log("Edit Event 1")}
//                                     onDelete={() => console.log("Delete Event 1")}
//                                 />
//                             )}
//                         </div>

//                         {/* Column 2: Interactive Card 2 */}
//                         <div className="space-y-6">
//                             <div className="flex justify-between items-center">
//                                 <h3 className="text-lg font-semibold text-gray-700">Interactive Card (Event 2)</h3>
//                                 <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full font-medium">Try the controls below!</span>
//                             </div>

//                             {/* The Card */}
//                             {initialEvent2 && (
//                                 <TimelineCard
//                                     variant="event"
//                                     data={getInteractiveData()}
//                                     onEdit={card2Config.showAdminIcons ? () => console.log("Edit Event 2") : undefined}
//                                     onDelete={card2Config.showAdminIcons ? () => console.log("Delete Event 2") : undefined}
//                                 />
//                             )}

//                             {/* Controls Panel */}
//                             <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
//                                 <h4 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-4">Real-time Controls</h4>
//                                 <div className="grid grid-cols-2 gap-4">
//                                     <label className="flex items-center gap-3 cursor-pointer group">
//                                         <input
//                                             type="checkbox"
//                                             checked={card2Config.showResources}
//                                             onChange={() => toggleConfig("showResources")}
//                                             className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 transition-all cursor-pointer"
//                                         />
//                                         <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">Show Resources</span>
//                                     </label>

//                                     <label className="flex items-center gap-3 cursor-pointer group">
//                                         <input
//                                             type="checkbox"
//                                             checked={card2Config.showLocation}
//                                             onChange={() => toggleConfig("showLocation")}
//                                             className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 transition-all cursor-pointer"
//                                         />
//                                         <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">Show Location</span>
//                                     </label>

//                                     <label className="flex items-center gap-3 cursor-pointer group">
//                                         <input
//                                             type="checkbox"
//                                             checked={card2Config.showTime}
//                                             onChange={() => toggleConfig("showTime")}
//                                             className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 transition-all cursor-pointer"
//                                         />
//                                         <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">Show Date/Time</span>
//                                     </label>

//                                     <label className="flex items-center gap-3 cursor-pointer group">
//                                         <input
//                                             type="checkbox"
//                                             checked={card2Config.showEndTime}
//                                             onChange={() => toggleConfig("showEndTime")}
//                                             disabled={!card2Config.showTime}
//                                             className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
//                                         />
//                                         <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">Show End Time</span>
//                                     </label>

//                                     <label className="flex items-center gap-3 cursor-pointer group">
//                                         <input
//                                             type="checkbox"
//                                             checked={card2Config.notificationEnabled}
//                                             onChange={() => toggleConfig("notificationEnabled")}
//                                             className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 transition-all cursor-pointer"
//                                         />
//                                         <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">Notifications Enabled</span>
//                                     </label>

//                                     <label className="flex items-center gap-3 cursor-pointer group">
//                                         <input
//                                             type="checkbox"
//                                             checked={card2Config.addToTimeline}
//                                             onChange={() => toggleConfig("addToTimeline")}
//                                             className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 transition-all cursor-pointer"
//                                         />
//                                         <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">Add to Timeline Enabled</span>
//                                     </label>

//                                     <label className="flex items-center gap-3 cursor-pointer group col-span-2 pt-2 border-t border-gray-100 mt-2">
//                                         <input
//                                             type="checkbox"
//                                             checked={card2Config.showAdminIcons}
//                                             onChange={() => toggleConfig("showAdminIcons")}
//                                             className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 transition-all cursor-pointer"
//                                         />
//                                         <span className="text-sm font-medium text-gray-900 group-hover:text-black transition-colors">Show Admin Icons (Edit/Delete)</span>
//                                     </label>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </section>

//                 <hr className="border-gray-200" />

//                 {/* Variation 2: Delegate */}
//                 <section>
//                     <h2 className="text-xl font-bold text-gray-800 mb-6">2. Delegate Personal Timeline Version</h2>
//                     <div className="space-y-6">
//                         {mockData
//                             .filter((item) => item.variant === "delegate")
//                             .map((item) => (
//                                 <TimelineCard
//                                     key={item.id}
//                                     variant={item.variant as any}
//                                     data={item.data}
//                                 />
//                             ))}
//                     </div>
//                 </section>

//                 <hr className="border-gray-200" />

//                 {/* Variation 3: Home Page */}
//                 <section>
//                     <h2 className="text-xl font-bold text-gray-800 mb-6">3. Home Page Timeline Version</h2>
//                     <div className="flex flex-wrap gap-8 items-end">
//                         {mockData
//                             .filter((item) => item.variant === "home")
//                             .map((item) => (
//                                 <TimelineCard
//                                     key={item.id}
//                                     variant={item.variant as any}
//                                     data={item.data}
//                                 />
//                             ))}
//                     </div>
//                 </section>

//                 <hr className="border-gray-200" />

//                 {/* Variation 4: Calendar */}
//                 <section>
//                     <h2 className="text-xl font-bold text-gray-800 mb-6">4. Calendar Version</h2>
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                         {mockData
//                             .filter((item) => item.variant === "calendar")
//                             .map((item) => (
//                                 <TimelineCard
//                                     key={item.id}
//                                     variant={item.variant as any}
//                                     data={item.data}
//                                 />
//                             ))}
//                     </div>
//                 </section>
//             </div>
//         </div>
//     );
// }
