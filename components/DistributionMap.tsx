"use client";
import { useEffect, useState } from "react";

// ข้อมูลปริมาณการส่งออก (จุดต่างๆ ในไทย)
const regionalData = [
    { id: "central", name: "ภาคกลาง (Central)", volume: 24390, lat: 14.5, lng: 100.5, color: "#3b82f6" },
    { id: "south", name: "ภาคใต้ (South)", volume: 500, lat: 8.5, lng: 99.0, color: "#3b82f6" },
    { id: "north", name: "ภาคเหนือ (North)", volume: 410, lat: 18.8, lng: 99.0, color: "#3b82f6" },
    { id: "east", name: "ภาคตะวันออก (East)", volume: 220, lat: 13.2, lng: 101.5, color: "#3b82f6" }
];

// ข้อมูล 4 เสาหลักเทคโนโลยี (Tech Nodes)
const techNodes = [
    { id: 1, title: "Smart Water IoT", desc: "เซนเซอร์ตรวจจับค่าน้ำและออกซิเจนเรียลไทม์ตลอด 24 ชม.", icon: "fa-water" },
    { id: 2, title: "Cold Chain Logistics", desc: "ควบคุมอุณหภูมิ -18°C ผ่าน GPS Tracking ส่งตรงถึงมือ", icon: "fa-snowflake" },
    { id: 3, title: "AI Quality Control", desc: "ระบบคัดกรองไซส์และตรวจสอบความสมบูรณ์ด้วย AI", icon: "fa-microchip" },
    { id: 4, title: "Global Standard", desc: "ตรวจสอบย้อนกลับได้ทุกขั้นตอน ผ่านมาตรฐาน GAP/HACCP", icon: "fa-shield-halved" }
];

const RATCHABURI_LAT = 13.5283;
const RATCHABURI_LNG = 99.8134;

export default function DistributionMap() {
    const [isMapLoaded, setIsMapLoaded] = useState(false);
    const [activeNode, setActiveNode] = useState<number | null>(null);

    const totalVolume = regionalData.reduce((sum, item) => sum + item.volume, 0);

    // โหลด Leaflet
    useEffect(() => {
        if (typeof window !== "undefined" && !document.getElementById("leaflet-css")) {
            const link = document.createElement("link");
            link.id = "leaflet-css";
            link.rel = "stylesheet";
            link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
            document.head.appendChild(link);

            const script = document.createElement("script");
            script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
            script.onload = () => setIsMapLoaded(true);
            document.body.appendChild(script);
        } else if (typeof window !== "undefined" && (window as unknown as { L: unknown }).L) {
            setTimeout(() => setIsMapLoaded(true), 0);
        }
    }, []);

    // วาดแผนที่
    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const leafletWindow = window as unknown as { L: any };
        if (isMapLoaded && leafletWindow.L) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const L = leafletWindow.L as any;
            const container = L.DomUtil.get('command-map');
            if (container != null && container._leaflet_id !== null) {
                container._leaflet_id = null;
            }

            // 🌟 ตั้งค่าแผนที่: ล็อก 100% และเปิดให้ซูมแบบทศนิยมได้ 🌟
            const map = L.map('command-map', {
                zoomControl: false,
                attributionControl: false,
                dragging: false,          // ห้ามลาก
                scrollWheelZoom: false,   // ห้ามซูมด้วยเมาส์
                doubleClickZoom: false,   // ห้ามดับเบิลคลิกซูม
                boxZoom: false,
                keyboard: false,
                touchZoom: false,         // ห้ามซูมด้วยนิ้วบนมือถือ
                zoomSnap: 0.1             // เปิดให้ซูมแบบจุดทศนิยม เพื่อให้ฟิตกรอบพอดีเป๊ะ
            });

            // 🌟 บังคับซูมให้พอดีกับขอบเขตประเทศไทยแบบเต็มกรอบ 🌟
            map.fitBounds([
                [5.61, 97.34],  // จุดขอบล่างซ้ายสุดของไทย
                [20.46, 105.61] // จุดขอบบนขวาสุดของไทย
            ], { padding: [10, 10] }); // เว้นขอบหายใจนิดนึง (10px) ไม่ให้ชิดขอบจอเกินไป

            // แผนที่ฐานแบบ Dark
            L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png', {
                subdomains: 'abcd', maxZoom: 10, minZoom: 4, opacity: 0.8
            }).addTo(map);

            // ดึงข้อมูล GeoJSON ของประเทศไทยแบบละเอียด และทำไฮไลท์เส้นขอบเรืองแสง
            fetch('https://raw.githubusercontent.com/johan/world.geo.json/master/countries/THA.geo.json')
                .then(response => response.json())
                .then(data => {
                    L.geoJSON(data, {
                        style: function () {
                            return {
                                color: '#38bdf8', // เส้นขอบสีฟ้าสว่าง
                                weight: 2,
                                opacity: 1,
                                fillColor: '#1e3a8a', // พื้นหลังในไทย
                                fillOpacity: 0.25,
                                className: 'thailand-highlight-path' // คลาสทำเงาเรืองแสง
                            };
                        }
                    }).addTo(map);
                })
                .catch(err => console.error("Failed to load Thailand GeoJSON", err));

            // ไอคอนจุดศูนย์กลาง (ราชบุรี)
            const hubIcon = L.divIcon({
                className: '',
                html: `<div class="relative w-6 h-6">
                        <div class="absolute inset-0 bg-red-600 rounded-full animate-ping opacity-75"></div>
                        <div class="relative w-full h-full bg-red-600 border-2 border-white rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(220,38,38,1)]">
                            <i class="fas fa-star text-white text-[8px]"></i>
                        </div>
                       </div>`,
                iconSize: [24, 24], iconAnchor: [12, 12]
            });
            L.marker([RATCHABURI_LAT, RATCHABURI_LNG], { icon: hubIcon, zIndexOffset: 1000 }).addTo(map);

            // วาดเส้นส่งสินค้าและจุดหมาย
            regionalData.forEach(region => {
                const getCurvedPath = (lat1: number, lng1: number, lat2: number, lng2: number) => {
                    const path = [];
                    for (let t = 0; t <= 1; t += 0.1) {
                        const lat = lat1 + (lat2 - lat1) * t;
                        const lng = lng1 + (lng2 - lng1) * t;
                        path.push([lat, lng]);
                    }
                    return path as [number, number][];
                };

                const curvePoints = getCurvedPath(RATCHABURI_LAT, RATCHABURI_LNG, region.lat, region.lng);

                L.polyline(curvePoints, { color: region.color, weight: 2, opacity: 0.8, dashArray: '4, 8', className: 'animate-[dash-flow_20s_linear_infinite]' }).addTo(map);

                const regionIcon = L.divIcon({
                    className: '',
                    html: `<div class="w-4 h-4 rounded-full bg-blue-500 border-2 border-white shadow-[0_0_10px_#3b82f6]"></div>`,
                    iconSize: [16, 16], iconAnchor: [8, 8]
                });
                L.marker([region.lat, region.lng], { icon: regionIcon }).addTo(map);
            });
        }
    }, [isMapLoaded]);

    return (
        <section className="w-full py-16 relative overflow-hidden font-prompt" id="intelligence-center"
            style={{ background: 'linear-gradient(to bottom, #0A1931, #0F172A)' }}>

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes dash-flow { to { stroke-dashoffset: -200; } }
                .thailand-highlight-path { filter: drop-shadow(0 0 12px rgba(59, 130, 246, 0.7)); }
                .grid-bg { background-size: 40px 40px; background-image: linear-gradient(to right, rgba(59, 130, 246, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(59, 130, 246, 0.05) 1px, transparent 1px); }
            `}} />

            <div className="absolute inset-0 grid-bg pointer-events-none z-0"></div>

            <div className="max-w-[1920px] mx-auto px-4 md:px-8 xl:px-12 relative z-10">

                {/* หัวข้อ */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-900/30 border border-blue-500/50 text-blue-300 text-xs font-bold tracking-widest uppercase mb-4">
                        <i className="fas fa-circle text-[8px] animate-pulse text-red-500"></i> Live Data Command Center
                    </div>
                    <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-2 tracking-tight drop-shadow-lg">
                        เครือข่ายอัจฉริยะ <span className="text-blue-400">ช.ฟาร์มกุ้ง</span>
                    </h2>
                    <p className="text-blue-200/80 font-light max-w-2xl mx-auto">ผสานปริมาณการจัดส่งระดับประเทศ เข้ากับเทคโนโลยีการจัดการฟาร์มแห่งอนาคต</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-auto lg:h-[600px]">

                    {/* ฝั่งซ้าย: ข้อมูล */}
                    <div className="col-span-1 lg:col-span-3 flex flex-col gap-4 order-2 lg:order-1">
                        <div className="bg-[#152347]/80 backdrop-blur-md border border-blue-500/20 rounded-2xl p-6 h-full flex flex-col shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"></div>

                            <h3 className="text-white font-bold text-lg border-b border-blue-500/20 pb-3 mb-6 flex items-center gap-2">
                                <i className="fas fa-chart-line text-blue-400"></i> ปริมาณจัดส่ง (มกราคม)
                            </h3>

                            <div className="mb-8">
                                <p className="text-xs text-blue-300 mb-1 uppercase tracking-wider">Total Volume</p>
                                <h4 className="text-4xl font-extrabold text-white drop-shadow-[0_0_10px_rgba(59,130,246,0.3)]">
                                    {totalVolume.toLocaleString()} <span className="text-base font-normal text-blue-300">กก.</span>
                                </h4>
                            </div>

                            <div className="space-y-6 flex-grow overflow-y-auto pr-2 custom-scrollbar">
                                {regionalData.map((region) => {
                                    const percentage = ((region.volume / totalVolume) * 100).toFixed(1);
                                    const visualWidth = Math.max(8, (Math.log10(region.volume) / Math.log10(25000)) * 100);

                                    return (
                                        <div key={region.id} className="relative z-10">
                                            <div className="flex justify-between items-end mb-1">
                                                <span className="text-sm font-medium text-blue-200">{region.name}</span>
                                                <span className="text-xs font-bold text-white">{region.volume.toLocaleString()} <span className="text-[10px] text-blue-400">({percentage}%)</span></span>
                                            </div>
                                            <div className="w-full bg-blue-900/30 rounded-full h-1.5">
                                                <div
                                                    className="h-1.5 rounded-full relative shadow-[0_0_8px_currentColor]"
                                                    style={{ width: `${visualWidth}%`, backgroundColor: region.color, color: region.color }}
                                                >
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* ตรงกลาง: แผนที่ประเทศไทย (ตอนนี้ซูมสุดขอบ ล็อกเน้นๆ) */}
                    <div className="col-span-1 lg:col-span-6 relative rounded-2xl overflow-hidden border border-blue-500/20 bg-[#0A1931] shadow-2xl min-h-[400px] order-1 lg:order-2">
                        {!isMapLoaded && (
                            <div className="absolute inset-0 flex items-center justify-center z-20 bg-[#0A1931]">
                                <div className="text-blue-400 flex flex-col items-center">
                                    <i className="fas fa-circle-notch fa-spin text-3xl mb-2"></i>
                                    <span className="text-xs tracking-widest">LOADING MAP...</span>
                                </div>
                            </div>
                        )}
                        <div id="command-map" className="w-full h-full relative z-10"></div>

                        {/* Legend */}
                        <div className="absolute bottom-4 right-4 bg-[#152347]/90 backdrop-blur border border-blue-500/30 rounded-xl p-3 z-20 shadow-lg text-xs text-blue-200">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="w-3 h-3 rounded-full bg-red-600 border border-white flex items-center justify-center"><i className="fas fa-star text-[6px] text-white"></i></span>
                                <span className="font-bold text-white">Hub (Ratchaburi)</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-blue-500 border border-white"></span>
                                <span>Partner / Region</span>
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="w-6 h-0.5 bg-blue-500 border-dashed border-t border-blue-300"></span>
                                <span>Live Route</span>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-1 lg:col-span-3 flex flex-col justify-between gap-4 order-3">
                        {techNodes.map((node) => (
                            <div
                                key={node.id}
                                className={`bg-[#152347]/80 backdrop-blur-md border rounded-xl p-4 flex gap-4 cursor-pointer transition-all duration-300 group hover:bg-blue-900/40 ${activeNode === node.id ? 'border-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'border-blue-500/20'}`}
                                onMouseEnter={() => setActiveNode(node.id)}
                                onMouseLeave={() => setActiveNode(null)}
                            >
                                <div className={`w-12 h-12 rounded-full shrink-0 flex items-center justify-center bg-gradient-to-br from-blue-600 to-blue-800 shadow-lg relative overflow-hidden`}>
                                    <i className={`fas ${node.icon} text-xl text-white drop-shadow-md z-10`}></i>
                                </div>
                                <div>
                                    <h4 className="text-white font-bold text-sm mb-1 group-hover:text-blue-300 transition-colors">{node.title}</h4>
                                    <p className="text-xs text-blue-200/70 leading-relaxed line-clamp-2">{node.desc}</p>
                                </div>
                            </div>
                        ))}

                        <div className="mt-2 flex gap-2">
                            <div className="flex-1 bg-[#1E3A8A] border border-blue-400/30 rounded-lg p-2 flex items-center justify-center gap-2 shadow-inner">
                                <i className="fas fa-certificate text-blue-300 text-lg"></i>
                                <span className="text-white text-xs font-bold tracking-wider">GAP</span>
                            </div>
                            <div className="flex-1 bg-[#1E3A8A] border border-blue-400/30 rounded-lg p-2 flex items-center justify-center gap-2 shadow-inner">
                                <i className="fas fa-check-double text-blue-300 text-lg"></i>
                                <span className="text-white text-xs font-bold tracking-wider">HACCP</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}