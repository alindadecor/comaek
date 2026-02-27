"use client";
import React, { useEffect } from 'react';
import Link from 'next/link';

export default function AboutPage() {
    // แอนิเมชันตอนเลื่อนหน้าจอ
    useEffect(() => {
        const observerOptions = { root: null, rootMargin: '0px', threshold: 0.15 };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('opacity-100', 'translate-y-0');
                    entry.target.classList.remove('opacity-0', 'translate-y-10');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.fade-in-up').forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    return (
        <div className="w-full bg-[#f8fafc] font-prompt pt-[60px] md:pt-[90px]">
            
            {/* 🌟 1. HERO BANNER: 24 ปีแห่งความเชี่ยวชาญ 🌟 */}
            <div className="relative w-full h-[50vh] md:h-[60vh] bg-[#0A1931] flex items-center justify-center overflow-hidden">
                {/* ลายคลื่นและพื้นหลัง */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#0A1931] to-[#1B3A6B] z-0"></div>
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] z-0"></div>
                
                <div className="relative z-10 text-center px-4 max-w-4xl mx-auto fade-in-up opacity-0 translate-y-10 transition-all duration-1000">
                    <div className="inline-block bg-[#E31C23] text-white px-4 py-1.5 rounded-full text-sm font-bold tracking-widest uppercase mb-6 shadow-lg shadow-red-500/30">
                        Company Profile
                    </div>
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight drop-shadow-lg">
                        มากกว่า <span className="text-[#E31C23]">24 ปี</span> ของ ช.ฟาร์มกุ้ง
                    </h1>
                    <p className="text-xl md:text-2xl text-blue-100 font-light mb-4">
                        &quot;ยิ่งกว่าความเชี่ยวชาญ ยิ่งกว่าความมืออาชีพ&quot;
                    </p>
                    <p className="text-2xl md:text-3xl text-white font-bold drop-shadow-md">
                        คือเรายืน <span className="text-[#FFD700]">อยู่เคียงข้างลูกค้า</span> ของเรา
                    </p>
                </div>
                
                {/* SVG Wave ตัดขอบด้านล่าง */}
                <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10 rotate-180">
                    <svg className="relative block w-[calc(100%+1.3px)] h-[50px] md:h-[80px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#f8fafc"></path>
                    </svg>
                </div>
            </div>

            {/* 🌟 2. WHY CHOOSE US (DQRC Framework) - แบบ 2 คอลัมน์ 🌟 */}
            <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-16 md:py-24">
                <div className="text-center mb-16 fade-in-up opacity-0 translate-y-10 transition-all duration-700">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-[#0A1931] mb-4 uppercase">
                        Why <span className="text-[#E31C23]">Choose</span> Chor Farmkung?
                    </h2>
                    <p className="text-xl text-gray-500 font-medium">ทำไมต้องเลือก ช.ฟาร์มกุ้ง</p>
                    <div className="w-24 h-1.5 bg-[#E31C23] mx-auto mt-6 rounded-full"></div>
                </div>

                <div className="flex flex-col lg:flex-row gap-12 items-start">
                    
                    {/* 👉 ด้านซ้าย: พื้นที่สำหรับใส่วิดีโอ */}
                    <div className="w-full lg:w-1/2 fade-in-up opacity-0 translate-y-10 transition-all duration-700" style={{ transitionDelay: '100ms' }}>
                        <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl border-4 border-[#0A1931] relative bg-black">
                            <video
                                className="absolute inset-0 w-full h-full object-cover"
                                autoPlay
                                loop
                                muted
                                playsInline
                                controls
                            >
                                <source src="/about-video.mp4" type="video/mp4" />
                                เบราว์เซอร์ของคุณไม่รองรับการเล่นวิดีโอ
                            </video>
                        </div>
                    </div>

                    {/* 👉 ด้านขวา: กล่อง DQRC เรียงแนวตั้ง */}
                    <div className="w-full lg:w-1/2 flex flex-col gap-6 fade-in-up opacity-0 translate-y-10 transition-all duration-700" style={{ transitionDelay: '300ms' }}>
                        
                        {/* D - Differentiation */}
                        <div className="flex gap-5 items-start bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all border-l-8 border-[#0A1931] group hover:-translate-x-2">
                            <div className="w-14 h-14 shrink-0 bg-[#0A1931] text-white flex items-center justify-center text-2xl font-bold rounded-xl group-hover:bg-[#E31C23] transition-colors shadow-sm">
                                D
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-[#0A1931] mb-3">Differentiation - ความแตกต่าง</h3>
                                <ul className="space-y-2 text-gray-600">
                                    <li>• &quot;เพราะเราคือผู้เชี่ยวชาญด้านกุ้ง - ที่เข้าใจธุรกิจอาหารดีที่สุด&quot;</li>
                                    <li>• &quot;เราไม่ได้ขายแค่กุ้ง แต่ขายความมั่นใจในทุกคำ&quot;</li>
                                </ul>
                            </div>
                        </div>

                        {/* Q - Quality */}
                        <div className="flex gap-5 items-start bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all border-l-8 border-[#E31C23] group hover:-translate-x-2">
                            <div className="w-14 h-14 shrink-0 bg-[#E31C23] text-white flex items-center justify-center text-2xl font-bold rounded-xl group-hover:bg-[#0A1931] transition-colors shadow-sm">
                                Q
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-[#0A1931] mb-3">Quality - คุณภาพ</h3>
                                <ul className="space-y-2 text-gray-600">
                                    <li>• &quot;กุ้งของเรา ผ่านมาตรฐานสากลทุกขั้นตอน&quot;</li>
                                    <li>• &quot;คุณภาพคือสิ่งที่เรายึดถือ ไม่ใช่แค่คำพูด แต่คือการรับรอง&quot;</li>
                                </ul>
                            </div>
                        </div>

                        {/* R - Reliability */}
                        <div className="flex gap-5 items-start bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all border-l-8 border-[#0A1931] group hover:-translate-x-2">
                            <div className="w-14 h-14 shrink-0 bg-[#0A1931] text-white flex items-center justify-center text-2xl font-bold rounded-xl group-hover:bg-[#E31C23] transition-colors shadow-sm">
                                R
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-[#0A1931] mb-3">Reliability & Trust - ความน่าเชื่อถือ</h3>
                                <ul className="space-y-2 text-gray-600">
                                    <li>• &quot;24 ปีแห่งความไว้วางใจจากเชฟและร้านอาหารทั่วประเทศ&quot;</li>
                                    <li>• &quot;จากฟาร์มถึงจาน - ส่งมอบตรงเวลา มั่นใจได้ทุกล็อต&quot;</li>
                                </ul>
                            </div>
                        </div>

                        {/* C - Customer Solution */}
                        <div className="flex gap-5 items-start bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all border-l-8 border-[#E31C23] group hover:-translate-x-2">
                            <div className="w-14 h-14 shrink-0 bg-[#E31C23] text-white flex items-center justify-center text-2xl font-bold rounded-xl group-hover:bg-[#0A1931] transition-colors shadow-sm">
                                C
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-[#0A1931] mb-3">Customer Solution - การแก้ปัญหาลูกค้า</h3>
                                <ul className="space-y-2 text-gray-600">
                                    <li>• &quot;คุณโฟกัสที่เมนู เราดูแลคุณภาพกุ้งให้&quot;</li>
                                    <li>• &quot;หยุดปัญหาซัพพลายไม่เสถียร - ให้เราเป็นคำตอบของคุณ&quot;</li>
                                    <li className="font-bold text-[#1B3A6B]">• &quot;Your Shrimp Solution - From Farm to Kitchen&quot;</li>
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* 🌟 3. WHAT MAKES US DIFFERENT (จุดเด่น) 🌟 */}
            <div className="w-full bg-[#1B3A6B] py-16 md:py-24 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] pointer-events-none"></div>
                
                <div className="max-w-[1440px] mx-auto px-4 md:px-8 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-12">
                        
                        {/* Text Content */}
                        <div className="w-full lg:w-1/2 fade-in-up opacity-0 translate-y-10 transition-all duration-700">
                            <h2 className="text-4xl font-extrabold text-white mb-2">WHAT</h2>
                            <h3 className="text-2xl md:text-3xl font-bold text-blue-200 mb-10">ช.ฟาร์มกุ้ง มีอะไร <span className="text-[#E31C23] bg-white px-2 rounded">แตกต่าง?</span></h3>
                            
                            <div className="space-y-8">
                                {/* Point 1 */}
                                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 flex gap-6 hover:bg-white/20 transition-colors">
                                    <div className="w-16 h-16 shrink-0 bg-white text-[#1B3A6B] rounded-full flex items-center justify-center text-3xl shadow-lg">
                                        <i className="fas fa-award"></i>
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold text-white mb-2">เน้นความสด</h4>
                                        <p className="text-blue-100 text-sm leading-relaxed">
                                            เราเน้นความสดเป็นอันดับแรก โดยใช้กุ้งเป็นๆ จากฟาร์มที่ได้รับการรับรองจากกรมประมง เข้าผลิตในโรงงานมาตรฐานส่งออก
                                        </p>
                                    </div>
                                </div>

                                {/* Point 2 */}
                                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 flex gap-6 hover:bg-white/20 transition-colors">
                                    <div className="w-16 h-16 shrink-0 bg-white text-[#1B3A6B] rounded-full flex items-center justify-center text-3xl shadow-lg">
                                        <i className="fas fa-ruler-horizontal"></i>
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold text-white mb-2">คัดไซส์ตามความต้องการ</h4>
                                        <p className="text-blue-100 text-sm leading-relaxed">
                                            เราคัดไซส์กุ้ง ให้มีขนาดตามที่ลูกค้าต้องการ ไม่ใหญ่เกิน ไม่เล็กเกิน และมีให้ลูกค้าเลือกทุกไซส์อย่างแม่นยำ
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Video Mockup (แทนที่รูปภาพ แบบ Auto Play) */}
                        <div className="w-full lg:w-1/2 flex justify-center fade-in-up opacity-0 translate-y-10 transition-all duration-700 delay-200">
                            <div className="relative w-full max-w-md aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-[#0A1931]">
                                <video
                                    className="absolute inset-0 w-full h-full object-cover"
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                >
                                    <source src="/what-video.mp4" type="video/mp4" />
                                    เบราว์เซอร์ของคุณไม่รองรับการเล่นวิดีโอ
                                </video>

                                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-[#0A1931] to-transparent p-8 pt-20 pointer-events-none">
                                    <p className="text-white font-bold text-xl drop-shadow-md">Premium Selected Size</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* 🌟 4. VALUE ADDED SERVICES (บริการ B2B) - ปรับเป็นธีมสีแดง 🌟 */}
            <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-16 md:py-24">
                <div className="text-center mb-16 fade-in-up opacity-0 translate-y-10 transition-all duration-700">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#0A1931] mb-4">บริการเสริมเพื่อพาร์ทเนอร์ธุรกิจ</h2>
                    <p className="text-gray-500 max-w-2xl mx-auto">เราเข้าใจกระบวนการหลังบ้านของร้านอาหาร เราจึงออกแบบบริการที่ช่วยลดต้นทุนและเพิ่มความสะดวกให้คุณ</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Service 1: บริการตัดแต่ง (สีแดง) */}
                    <div className="bg-[#E31C23] p-8 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-2 transition-all text-center group fade-in-up opacity-0 translate-y-10">
                        <div className="w-20 h-20 mx-auto bg-white text-[#E31C23] rounded-full flex items-center justify-center text-4xl mb-6 group-hover:scale-110 group-hover:bg-[#0A1931] group-hover:text-white transition-all duration-300 shadow-sm">
                            <i className="fas fa-hands-helping"></i>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">บริการตัดแต่ง</h3>
                        <p className="text-white/90 text-sm leading-relaxed">
                            เรามีบริการตัดแต่ง แกะพร้อมใช้ เพื่อลดขั้นตอนในการจัดเตรียมวัตถุดิบของเชฟ ประหยัดเวลาและค่าแรง
                        </p>
                    </div>

                    {/* Service 2: วางแผนทำสต๊อก (สีแดง) */}
                    <div className="bg-[#E31C23] p-8 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-2 transition-all text-center group fade-in-up opacity-0 translate-y-10 delay-100">
                        <div className="w-20 h-20 mx-auto bg-white text-[#E31C23] rounded-full flex items-center justify-center text-4xl mb-6 group-hover:scale-110 group-hover:bg-[#0A1931] group-hover:text-white transition-all duration-300 shadow-sm">
                            <i className="fas fa-boxes"></i>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">วางแผนทำสต๊อก</h3>
                        <p className="text-white/90 text-sm leading-relaxed">
                            เราสามารถวางแผนทำสต๊อกสินค้าไว้ให้ลูกค้า เพื่อให้มั่นใจได้ว่าลูกค้าจะมีวัตถุดิบคุณภาพพร้อมใช้ตลอดทั้งปี
                        </p>
                    </div>

                    {/* Service 3: ทำราคายาวทั้งปี (สีแดง) */}
                    <div className="bg-[#E31C23] p-8 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-2 transition-all text-center group fade-in-up opacity-0 translate-y-10 delay-200">
                        <div className="w-20 h-20 mx-auto bg-white text-[#E31C23] rounded-full flex items-center justify-center text-4xl mb-6 group-hover:scale-110 group-hover:bg-[#0A1931] group-hover:text-white transition-all duration-300 shadow-sm">
                            <i className="fas fa-file-invoice-dollar"></i>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">ทำราคายาวทั้งปี</h3>
                        <p className="text-white/90 text-sm leading-relaxed">
                            เราสามารถยืนราคาวัตถุดิบยาวทั้งปี เพื่อให้ง่ายต่อการวางแผนคำนวณต้นทุน (Food Cost) ของร้านอาหาร
                        </p>
                    </div>
                </div>
            </div>

            {/* 🌟 5. CONTACT & LEGACY SECTION 🌟 */}
            <div className="w-full bg-[#f1f5f9] py-16 border-t border-gray-200">
                <div className="max-w-5xl mx-auto px-4 text-center fade-in-up opacity-0 translate-y-10 transition-all duration-700">
                    <div className="w-24 h-24 mx-auto mb-6 bg-white rounded-full p-4 shadow-md border border-gray-200">
                        <img src="/logo-en.png" alt="ช.ฟาร์มกุ้ง" className="w-full h-full object-contain" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-extrabold text-[#0A1931] mb-8">
                        &quot;ติดต่อเพื่อร่วมเป็นพาร์ทเนอร์ธุรกิจกับเรา&quot;
                    </h2>
                    
                    <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100 flex flex-col md:flex-row items-center justify-center gap-10">
                        
                        {/* 🌟 QR Code 🌟 */}
                        <div className="w-40 h-40 shrink-0 overflow-hidden rounded-xl border-2 border-gray-100 shadow-md hover:scale-105 transition-transform duration-300 p-2 bg-white">
                            <img 
                                src="/contact-qr.jpg" 
                                alt="LINE QR Code ช.ฟาร์มกุ้ง" 
                                className="w-full h-full object-contain"
                            />
                        </div>

                        {/* Contact Info */}
                        <div className="text-left space-y-4">
                            <a href="mailto:chor.farmkung@gmail.com" className="flex items-center gap-4 text-gray-700 hover:text-[#E31C23] transition-colors group">
                                <div className="w-10 h-10 rounded-full bg-[#0A1931] text-white flex items-center justify-center group-hover:bg-[#E31C23] transition-colors">
                                    <i className="fas fa-envelope"></i>
                                </div>
                                <span className="font-medium">chor.farmkung@gmail.com</span>
                            </a>
                            <a href="#" className="flex items-center gap-4 text-gray-700 hover:text-[#00B900] transition-colors group">
                                <div className="w-10 h-10 rounded-full bg-[#0A1931] text-white flex items-center justify-center group-hover:bg-[#00B900] transition-colors">
                                    <i className="fab fa-line text-xl"></i>
                                </div>
                                <span className="font-medium">@chorfarmkung</span>
                            </a>
                            <a href="#" className="flex items-center gap-4 text-gray-700 hover:text-[#1B3A6B] transition-colors group">
                                <div className="w-10 h-10 rounded-full bg-[#0A1931] text-white flex items-center justify-center group-hover:bg-[#1B3A6B] transition-colors">
                                    <i className="fas fa-globe"></i>
                                </div>
                                <span className="font-medium">www.chorfarmkung.com</span>
                            </a>
                        </div>
                    </div>

                    {/* Locations */}
                    <div className="mt-10 flex flex-col md:flex-row justify-center gap-4 md:gap-10 text-sm text-gray-500 font-medium">
                        <p><i className="fas fa-map-marker-alt text-[#E31C23] mr-2"></i> 179 หมู่ 3 ตำบลโคกฝ้าย อำเภอเมือง จังหวัดราชบุรี 70150</p>
                        <p className="hidden md:block">|</p>
                        <p><i className="fas fa-map-marker-alt text-[#E31C23] mr-2"></i> 923 187 ถ. พระรามที่ 2 ตำบลมหาชัย อำเภอเมืองสมุทรสาคร สมุทรสาคร 74000</p>
                    </div>
                </div>
            </div>

        </div>
    );
}