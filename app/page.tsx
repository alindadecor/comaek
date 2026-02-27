"use client";
import { useEffect } from "react";
import "./page.css";
import DistributionMap from "../components/DistributionMap";

// 1. Data Configuration
const gridItems = [
    { id: 1, colSpan: "col-span-1", rowSpan: "row-span-1", type: "slideshow", images: ["/fresh-1.png", "/fresh-2.png"], title: "สดจากฟาร์ม", subtitle: "สู่เมนูโปรดของคุณ", link: "#", animation: "reveal-left" },
    { id: 2, colSpan: "col-span-1", rowSpan: "row-span-2", type: "live", flipType: "horizontal", front: { type: "image", image: "/farmer-1.png", title: "เกษตรกรมืออาชีพ", subtitle: "ดูแลด้วยความใส่ใจ" }, back: { type: "solid", bgColor: "bg-blue-900", icon: "fa-solid fa-users", title: "We Care", subtitle: "ทีมงานพร้อมดูแล 24 ชม." }, link: "#", animation: "reveal-up" },
    { id: 3, colSpan: "col-span-1 lg:col-span-2", rowSpan: "row-span-1", type: "slideshow", images: ["/water-1.jpg", "/water-2.mp4"], title: "ระบบน้ำหมุนเวียน", subtitle: "เทคโนโลยีบำบัดน้ำเป็นมิตรต่อสิ่งแวดล้อม", link: "#", animation: "reveal-right" },
    { id: 4, colSpan: "col-span-1", rowSpan: "row-span-1", type: "live", flipType: "vertical", front: { type: "solid", bgColor: "bg-red-600", icon: "fa-solid fa-heart", title: "ใส่ใจ", subtitle: "เลี้ยงด้วยใจ...เพื่อคุณภาพ" }, back: { type: "solid", bgColor: "bg-white", textColor: "text-red-600", icon: "fa-solid fa-hand-holding-heart", title: "Service Mind", subtitle: "บริการด้วยใจ รักษาคุณภาพ" }, link: "#", animation: "reveal-bounce" },
    { id: 5, colSpan: "col-span-1 lg:col-span-2", rowSpan: "row-span-2", type: "video", video: "/smart-farm.mp4", title: "Smart Farm", subtitle: "นวัตกรรมฟาร์มอัจฉริยะ ควบคุมด้วยเทคโนโลยี", link: "#", animation: "reveal-flip" },
    { id: 6, colSpan: "col-span-1 lg:col-span-2", rowSpan: "row-span-1", type: "live", flipType: "vertical", front: { type: "image", image: "/standard-1.jpg", title: "ฟาร์มมาตรฐาน", subtitle: "บริหารจัดการอย่างเป็นระบบ" }, back: { type: "video", video: "/standard-2.mp4", title: "เทคโนโลยีล้ำสมัย", subtitle: "ติดตามดูแล 24 ชั่วโมง" }, link: "#", animation: "reveal-left" },
    { id: 7, colSpan: "col-span-1", rowSpan: "row-span-1", type: "image", image: "https://images.unsplash.com/photo-1580674285054-bed31e145f59?q=80&w=1000&auto=format&fit=crop", title: "จัดส่งรวดเร็ว", subtitle: "รถห้องเย็นมาตรฐาน", link: "#", animation: "reveal-up" },
    { id: 8, colSpan: "col-span-1", rowSpan: "row-span-1", type: "live", flipType: "horizontal", front: { type: "solid", bgColor: "bg-blue-800", icon: "fa-solid fa-certificate", title: "GAP Certified", subtitle: "มาตรฐานการปฏิบัติ" }, back: { type: "solid", bgColor: "bg-blue-600", icon: "fa-solid fa-check-double", title: "ISO / GMP / HACCP", subtitle: "มั่นใจความปลอดภัยสากล" }, link: "#", animation: "reveal-bounce" },
    { id: 9, colSpan: "col-span-1", rowSpan: "row-span-1", type: "live", flipType: "horizontal", front: { type: "solid", bgColor: "bg-red-500", icon: "fa-solid fa-phone", title: "Contact Us", subtitle: "ติดต่อสอบถามราคาหน้าฟาร์ม" }, back: { type: "image", image: "/line-qr.png", isQR: true, title: "เพิ่มเพื่อน LINE", subtitle: "สแกนเพื่อสอบถาม" }, link: "#", animation: "reveal-right" },
    { id: 10, colSpan: "col-span-1", rowSpan: "row-span-1", type: "live", flipType: "vertical", front: { type: "solid", bgColor: "bg-slate-700", icon: "fa-solid fa-map-location-dot", title: "Location", subtitle: "เยี่ยมชมฟาร์มของเรา" }, back: { type: "image", image: "https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1000&auto=format&fit=crop", title: "Open Daily", subtitle: "08:00 - 17:00 น." }, link: "#", animation: "reveal-up" },
    { id: 11, colSpan: "col-span-1 lg:col-span-2", rowSpan: "row-span-1", type: "image", image: "https://images.unsplash.com/photo-1623961990059-28356e226a77?q=80&w=1000&auto=format&fit=crop", title: "แปรรูป & ส่งออก", subtitle: "ผลิตภัณฑ์กุ้งคุณภาพสู่ตลาดโลก", link: "#", animation: "reveal-up" },
    { id: 12, colSpan: "col-span-1", rowSpan: "row-span-1", type: "image", image: "/eco-farm.jpg", title: "ใส่ใจสิ่งแวดล้อม", subtitle: "ฟาร์มยั่งยืน เป็นมิตรต่อธรรมชาติ", link: "#", animation: "reveal-bounce" },
    { id: 13, colSpan: "col-span-1", rowSpan: "row-span-1", type: "image", image: "/premium-shrimp.jpg", title: "คุณภาพพรีเมียม", subtitle: "เนื้อแน่น หวาน ส่งตรงจากบ่อ", link: "#", animation: "reveal-left" }
];

export default function HomePage() {
    useEffect(() => {
        const observerOptions = { root: null, rootMargin: '0px', threshold: 0.15 };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-active');
                } else {
                    entry.target.classList.remove('reveal-active');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.bento-card').forEach(card => observer.observe(card));

        const slideIntervals: NodeJS.Timeout[] = [];
        document.querySelectorAll('.slideshow-container').forEach((container) => {
            const slides = container.querySelectorAll('.slide');
            if (slides.length < 2) return;
            let currentSlide = 0;
            const timer = setInterval(() => {
                slides[currentSlide].classList.remove('opacity-100');
                slides[currentSlide].classList.add('opacity-0');
                currentSlide = (currentSlide + 1) % slides.length;
                slides[currentSlide].classList.remove('opacity-0');
                slides[currentSlide].classList.add('opacity-100');
            }, 5000 + (Math.random() * 2000));
            slideIntervals.push(timer);
        });

        const flipIntervals: NodeJS.Timeout[] = [];
        document.querySelectorAll('.flipper').forEach(flipper => {
            const el = flipper as HTMLElement;
            const activeClass = el.dataset.flipType === 'vertical' ? 'flipped-vertical' : 'flipped-horizontal';
            const timer = setInterval(() => {
                if (!el.closest('.bento-card')?.matches(':hover')) {
                    el.classList.toggle(activeClass);
                    el.closest('.bento-card')?.classList.toggle('is-flipping');
                    setTimeout(() => { el.closest('.bento-card')?.classList.remove('is-flipping'); }, 800);
                }
            }, 4000 + (Math.random() * 5000));
            flipIntervals.push(timer);
        });

        return () => {
            observer.disconnect();
            slideIntervals.forEach(clearInterval);
            flipIntervals.forEach(clearInterval);
        };
    }, []);

    const renderText = (item: any, zIndex = 'z-10') => {
        if (!item.title && !item.subtitle) return null;
        return (
            <div className={`absolute bottom-0 left-0 p-6 w-full ${zIndex} text-white transform transition-transform duration-300 group-hover:-translate-y-1`}>
                {item.title && (
                    <div className="flex items-center gap-2 mb-1 transform transition-all duration-300 group-hover:translate-x-2">
                        <div className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]"></div>
                        <h3 className="text-lg font-bold shadow-black drop-shadow-md">{item.title}</h3>
                    </div>
                )}
                {item.subtitle && (
                    <p className="text-sm text-gray-200 pl-4 transform transition-all duration-300 group-hover:translate-x-2 delay-75">{item.subtitle}</p>
                )}
            </div>
        );
    };

    const getInnerContent = (data: any) => {
        const shineHtml = <div className="shine-effect"></div>;
        if (data.type === 'image') {
            return (
                <div className={`relative w-full h-full ${data.isQR ? 'bg-gray-100' : 'bg-gray-200'}`}>
                    {data.image && (
                        <img
                            src={data.image}
                            alt={data.title || ''}
                            className={`w-full h-full ${data.isQR ? 'object-contain p-4 pb-20' : 'object-cover'}`}
                        />
                    )}
                    <div className={`absolute inset-0 bg-gradient-to-t ${data.isQR ? 'from-black/90 via-transparent' : 'from-black/80 via-black/20'} to-transparent opacity-90`}></div>
                    {shineHtml}
                    {renderText(data)}
                </div>
            );
        } else if (data.type === 'video') {
            return (
                <div className="relative w-full h-full bg-gray-900">
                    {data.video && (
                        <video className="w-full h-full object-cover" autoPlay muted loop playsInline>
                            <source src={data.video} type="video/mp4" />
                        </video>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90"></div>
                    {shineHtml}
                    {renderText(data)}
                </div>
            );
        } else if (data.type === 'solid') {
            const textColor = data.textColor || 'text-white';
            return (
                <div className={`relative w-full h-full ${data.bgColor} p-6 flex flex-col justify-end ${textColor}`}>
                    {shineHtml}
                    <div className="mb-4"><i className={`${data.icon} text-3xl opacity-80 floating-icon`}></i></div>
                    <div>
                        <h3 className="text-xl font-bold mb-1">{data.title}</h3>
                        <p className="text-xs opacity-90 font-light">{data.subtitle}</p>
                    </div>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="w-full bg-[#f0f4f8]">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />

            {/* 🌟 HERO SECTION 🌟 */}
            <div className="relative w-full h-[65vh] md:h-[75vh] flex items-center justify-center overflow-hidden">
                <img
                    src="/hero-bg.png"
                    alt="Premium Seafood by Chor Farmkung"
                    className="absolute inset-0 w-full h-full object-cover object-center"
                />

                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#f0f4f8]"></div>

                <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-xl tracking-wide uppercase">
                        <span className="text-[#D90429]">Premium</span> Seafood
                    </h1>
                    <h2 className="text-xl md:text-3xl text-gray-100 font-medium mb-6 drop-shadow-md">
                        ความสดระดับสากล จากฟาร์มสู่โต๊ะอาหาร
                    </h2>
                    <p className="text-sm md:text-lg text-gray-300 mb-8 max-w-2xl drop-shadow line-clamp-3">
                        ผู้นำด้านการเพาะเลี้ยงและส่งออกกุ้งคุณภาพมาตรฐาน GAP พร้อมส่งมอบความสดใหม่ ปลอดภัย และใส่ใจสิ่งแวดล้อม
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <a href="#products" className="px-8 py-3 bg-[#D90429] text-white font-semibold rounded-full hover:bg-red-700 transition duration-300 shadow-[0_0_15px_rgba(217,4,41,0.5)]">
                            ดูสินค้าของเรา
                        </a>
                        <a href="#contact" className="px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-[#0F172A] transition duration-300">
                            ติดต่อสอบถาม
                        </a>
                    </div>
                </div>
            </div>
            {/* 🌟 END HERO SECTION 🌟 */}

            {/* 🌟 BENTO GRID SYSTEM (อัปเดตขยายเต็มจอ) 🌟 */}
            {/* แก้ไขตรงนี้: เปลี่ยนจาก max-w-7xl เป็น w-full และใช้ max-w-[1920px] กันหน้าจอ 4K เพี้ยน พร้อมเพิ่ม padding ซ้ายขวา */}
            <div className="bento-wrapper pt-8">
                <div className="w-full max-w-[1920px] mx-auto px-4 md:px-8 xl:px-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[200px] grid-flow-dense pb-20">
                    {gridItems.map((item: any) => {
                        const isLive = item.type === 'live';
                        const cardClassName = `bento-card rounded-2xl cursor-pointer block group ${item.colSpan} ${item.rowSpan} ${item.animation} ${isLive ? 'live-tile-wrapper' : ''}`;

                        if (isLive) {
                            const flipClass = item.flipType === 'vertical' ? 'flipped-vertical' : 'flipped-horizontal';
                            const backFaceClass = item.flipType === 'vertical' ? 'flip-back-vertical' : 'flip-back-horizontal';
                            return (
                                <a key={item.id} href={item.link} className={cardClassName}>
                                    <div className="perspective-container">
                                        <div className="flipper" data-flip-type={item.flipType}>
                                            <div className="flip-front">{getInnerContent(item.front)}</div>
                                            <div className={`flip-back ${backFaceClass}`}>{getInnerContent(item.back)}</div>
                                        </div>
                                    </div>
                                </a>
                            );
                        }

                        return (
                            <a key={item.id} href={item.link} className={cardClassName}>
                                {item.type === 'image' && (
                                    <>
                                        <div className="absolute inset-0 bg-gray-200 overflow-hidden">
                                            {item.image && <img src={item.image} alt={item.title} className="bg-zoom w-full h-full object-cover" />}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90"></div>
                                            <div className="shine-effect"></div>
                                        </div>
                                        {renderText(item)}
                                    </>
                                )}
                                {item.type === 'video' && (
                                    <>
                                        <div className="absolute inset-0 bg-gray-900 overflow-hidden">
                                            {item.video && (
                                                <video className="bg-zoom w-full h-full object-cover" autoPlay muted loop playsInline>
                                                    <source src={item.video} type="video/mp4" />
                                                </video>
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90"></div>
                                            <div className="shine-effect"></div>
                                        </div>
                                        {renderText(item)}
                                    </>
                                )}
                                {item.type === 'solid' && (
                                    <div className={`absolute inset-0 ${item.bgColor} p-6 flex flex-col justify-end text-white overflow-hidden`}>
                                        <div className="shine-effect"></div>
                                        <div className="mb-4 transform transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-12 origin-left">
                                            <i className={`${item.icon} text-3xl opacity-80 floating-icon`}></i>
                                        </div>
                                        <div className="relative z-10">
                                            <h3 className="text-xl font-bold mb-1 transform transition-all duration-300 group-hover:translate-x-1">{item.title}</h3>
                                            <p className="text-xs opacity-90 font-light transform transition-all duration-300 group-hover:translate-x-1 delay-75">{item.subtitle}</p>
                                        </div>
                                    </div>
                                )}

                                {item.type === 'slideshow' && (
                                    <>
                                        <div className="absolute inset-0 slideshow-container overflow-hidden bg-gray-200">
                                            {item.images?.map((mediaUrl: string, idx: number) => {
                                                const isVideo = mediaUrl.toLowerCase().endsWith('.mp4');

                                                return isVideo ? (
                                                    <video
                                                        key={idx}
                                                        src={mediaUrl}
                                                        className={`slide absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${idx === 0 ? 'opacity-100' : 'opacity-0'}`}
                                                        style={{ zIndex: idx === 0 ? 1 : 0 }}
                                                        autoPlay muted loop playsInline
                                                    />
                                                ) : (
                                                    <img
                                                        key={idx}
                                                        src={mediaUrl}
                                                        className={`slide absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${idx === 0 ? 'opacity-100' : 'opacity-0'}`}
                                                        style={{ zIndex: idx === 0 ? 1 : 0 }}
                                                        alt={item.title || "Slideshow image"}
                                                    />
                                                );
                                            })}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10"></div>
                                            <div className="shine-effect"></div>
                                        </div>
                                        {renderText(item, 'z-20')}
                                    </>
                                )}
                            </a>
                        );
                    })}
                </div>
            </div>
            {/* 🌟 END BENTO GRID SYSTEM 🌟 */}

            {/* 🌟 DISTRIBUTION MAP SECTION 🌟 */}
            <DistributionMap />

        </div>
    );
}