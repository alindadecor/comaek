"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

// --- ข้อมูลจำลองสินค้า (8 รายการ) พร้อมอัปเดตชื่อรูปหลักให้ตรงกับไฟล์ของคุณเป๊ะๆ ---
const productsData = [
    {
        id: "river-prawn",
        name: "กุ้งแม่น้ำ",
        engName: "River Prawn",
        desc: "กุ้งแม่น้ำคุณภาพพรีเมียม คัดไซส์พิเศษ เนื้อแน่น หัวมันเยิ้ม เหมาะสำหรับร้านอาหารซีฟู้ดชั้นนำ",
        image: "/main-river-prawn.png", // 👈 .png
        specs: [
            { size: "8-12 PCS./PCK", unit: "1 kg/PCK (10 PCK/CTN)", nw: "NW 80%", type: "Full / Semi Block" },
            { size: "11-12 PCS./PCK", unit: "1 kg/PCK (10 PCK/CTN)", nw: "NW 80%", type: "Full / Semi Block" },
            { size: "13-15 PCS./PCK", unit: "1 kg/PCK (10 PCK/CTN)", nw: "NW 80%", type: "Semi Block" }
        ],
        packImage: "/pack-river-prawn.jpg",
        weightPerPiece: "80-120 กรัม/ตัว",
        thawing: "ปล่อยให้น้ำแข็งละลายในช่องแช่เย็น (Chiller) อุณหภูมิ 0-4°C ประมาณ 8-12 ชั่วโมง เพื่อรักษาความหวานของเนื้อกุ้ง",
        recipe: {
            name: "กุ้งแม่น้ำเผาเตาถ่าน น้ำจิ้มซีฟู้ด",
            image: "/recipe-river-prawn.jpg",
            ingredients: ["กุ้งแม่น้ำ 3-5 ตัว", "พริกขี้หนูสวน 20 เม็ด", "กระเทียมไทย 1 หัว", "น้ำมะนาว 3 ช้อนโต๊ะ", "น้ำปลา 2 ช้อนโต๊ะ", "น้ำตาลปี๊บ 1 ช้อนโต๊ะ"],
            instructions: [
                "ผ่าหลังกุ้งแม่น้ำ ดึงเส้นดำออก เตรียมไว้",
                "นำกุ้งขึ้นย่างบนเตาถ่านไฟกลาง คอยสังเกตมันกุ้งให้เดือดเยิ้ม",
                "โขลกพริก กระเทียม ให้ละเอียด ปรุงรสด้วยน้ำมะนาว น้ำปลา น้ำตาล",
                "จัดกุ้งเผาใส่จาน เสิร์ฟพร้อมน้ำจิ้มซีฟู้ดรสแซ่บ"
            ]
        }
    },
    {
        id: "black-tiger",
        name: "กุ้งกุลาดำ",
        engName: "Black Tiger Shrimp",
        desc: "กุ้งกุลาดำลายสวย เนื้อสัมผัสกรอบเด้ง แช่แข็งด้วยเทคโนโลยี IQF เพื่อรักษาความสดระดับสูงสุด",
        image: "/main-black-tiger.jpg", // 👈 .jpg
        specs: [
            { size: "15-20 PCS./KG", unit: "1 kg/PCK (10 PCK/CTN)", nw: "NW 100%", type: "IQF / Semi Block" },
            { size: "21-25 PCS./KG", unit: "1 kg/PCK (10 PCK/CTN)", nw: "NW 100%", type: "IQF / Semi Block" },
            { size: "26-30 PCS./KG", unit: "1 kg/PCK (10 PCK/CTN)", nw: "NW 100%", type: "IQF / Semi Block" }
        ],
        packImage: "/pack-black-tiger.jpg",
        weightPerPiece: "40-60 กรัม/ตัว",
        thawing: "ละลายน้ำแข็งโดยให้น้ำไหลผ่าน (Running Water) ประมาณ 10-15 นาที",
        recipe: {
            name: "กุ้งกุลาดำคั่วพริกเกลือ",
            image: "/recipe-black-tiger.jpg",
            ingredients: ["กุ้งกุลาดำ 500 กรัม", "พริกขี้หนูสับ 3 ช้อนโต๊ะ", "กระเทียมสับ 3 ช้อนโต๊ะ", "เกลือป่น 1/2 ช้อนชา", "ต้นหอมซอย 2 ช้อนโต๊ะ"],
            instructions: [
                "นำกุ้งกุลาดำไปทอดในน้ำมันร้อนจัดให้เปลือกกรอบ และตักขึ้นพักไว้",
                "ตั้งกระทะใหม่ เจียวกระเทียมและพริกขี้หนูให้หอมเหลือง",
                "ใส่กุ้งที่ทอดไว้ลงไปคั่วให้เข้ากัน ปรุงรสด้วยเกลือป่น",
                "โรยต้นหอมซอย คั่วเร็วๆ อีกครั้งแล้วตักเสิร์ฟ"
            ]
        }
    },
    {
        id: "white-shrimp",
        name: "กุ้งขาว",
        engName: "Vannamei White Shrimp",
        desc: "กุ้งขาวแวนนาไม เลี้ยงในระบบบ่ออัจฉริยะ ปลอดสารตกค้าง ตอบโจทย์ทุกเมนูอาหาร",
        image: "/main-white-shrimp.jpg", // 👈 .jpg
        specs: [
            { size: "30-40 PCS./KG", unit: "1 kg/PCK (10 PCK/CTN)", nw: "NW 90%", type: "Semi Block" },
            { size: "40-50 PCS./KG", unit: "1 kg/PCK (10 PCK/CTN)", nw: "NW 90%", type: "Semi Block" },
            { size: "50-60 PCS./KG", unit: "1 kg/PCK (10 PCK/CTN)", nw: "NW 90%", type: "Semi Block" }
        ],
        packImage: "/pack-white-shrimp.jpg",
        weightPerPiece: "20-30 กรัม/ตัว",
        thawing: "แช่ถุงกุ้งในน้ำอุณหภูมิห้อง 15-20 นาที จนตัวกุ้งนิ่มและแยกออกจากกัน",
        recipe: {
            name: "ผัดไทยกุ้งสดไซส์จัมโบ้",
            image: "/recipe-white-shrimp.jpg",
            ingredients: ["กุ้งขาว 6-8 ตัว", "เส้นจันท์ 150 กรัม", "น้ำผัดไทย 4 ช้อนโต๊ะ", "ไข่ไก่ 2 ฟอง", "เต้าหู้เหลือง, ถั่วงอก, กุยช่าย"],
            instructions: [
                "ตั้งกระทะใส่น้ำมัน นำกุ้งขาวลงไปจี่ให้สุก 80% แล้วตักพักไว้",
                "ใส่เต้าหู้ลงผัด ตามด้วยเส้นจันท์และพรมน้ำเล็กน้อยให้เส้นนิ่ม",
                "ใส่น้ำผัดไทย ผัดให้เข้าเนื้อ ตอกไข่ใส่ลงไปแล้วรอให้ไข่สุก",
                "ใส่กุ้งที่พักไว้ ถั่วงอก และกุยช่าย คลุกเคล้าให้เข้ากัน พร้อมเสิร์ฟ"
            ]
        }
    },
    {
        id: "bk-shrimp",
        name: "เนื้อกุ้ง Bk",
        engName: "Headless Shell-on Shrimp",
        desc: "กุ้งตัดหัวไว้เปลือก (Bk) สะดวกต่อการนำไปประกอบอาหาร ประหยัดเวลาเตรียมวัตถุดิบ",
        image: "/main-bk-shrimp.png", // 👈 .png
        specs: [
            { size: "16-20 PCS./LB", unit: "1.8 kg/Block (6 Block/CTN)", nw: "NW 80%", type: "Block Frozen" },
            { size: "21-25 PCS./LB", unit: "1.8 kg/Block (6 Block/CTN)", nw: "NW 80%", type: "Block Frozen" },
            { size: "26-30 PCS./LB", unit: "1.8 kg/Block (6 Block/CTN)", nw: "NW 80%", type: "Block Frozen" }
        ],
        packImage: "/pack-bk-shrimp.jpg",
        weightPerPiece: "25-35 กรัม/ตัว",
        thawing: "ปล่อยให้น้ำแข็งละลายในช่องแช่เย็น (Chiller) 8-10 ชั่วโมง",
        recipe: {
            name: "ต้มยำกุ้งน้ำข้น",
            image: "/recipe-bk-shrimp.jpg",
            ingredients: ["กุ้ง Bk 10-12 ตัว", "ข่า ตะไคร้ ใบมะกรูด", "เห็ดฟาง 1 ถ้วย", "พริกเผา 2 ช้อนโต๊ะ", "นมข้นจืด 1/2 ถ้วย", "น้ำมะนาว, น้ำปลา"],
            instructions: [
                "ต้มน้ำให้เดือด ใส่ข่า ตะไคร้ ใบมะกรูด ฉีกให้หอม",
                "ใส่พริกเผาและเห็ดฟางลงไปต้มจนเดือด",
                "ใส่กุ้ง Bk ลงไปต้ม พอเริ่มสุกให้ใส่นมข้นจืด ปิดไฟทันที",
                "ปรุงรสด้วยน้ำมะนาว น้ำปลา และพริกขี้หนูทุบตามชอบ"
            ]
        }
    },
    {
        id: "pdto-shrimp",
        name: "เนื้อกุ้ง PDTO",
        engName: "Peeled Deveined Tail On",
        desc: "เนื้อกุ้งปอกเปลือก ผ่าหลังดึงเส้นดำออก ไว้หาง (PDTO) คัดเกรดพรีเมียม",
        image: "/main-pdto-shrimp.jpg", // 👈 .jpg
        specs: [
            { size: "26-30 PCS./LB", unit: "1 kg/PCK (10 PCK/CTN)", nw: "NW 100%", type: "IQF" },
            { size: "31-40 PCS./LB", unit: "1 kg/PCK (10 PCK/CTN)", nw: "NW 100%", type: "IQF" },
            { size: "41-50 PCS./LB", unit: "1 kg/PCK (10 PCK/CTN)", nw: "NW 100%", type: "IQF" }
        ],
        packImage: "/pack-pdto-shrimp.jpg",
        weightPerPiece: "15-25 กรัม/ตัว",
        thawing: "ละลายน้ำแข็งโดยให้น้ำไหลผ่าน (Running Water) 5-10 นาที พร้อมใช้งานทันที",
        recipe: {
            name: "กุ้งชุบแป้งทอดเทมปุระ",
            image: "/recipe-pdto-shrimp.jpg",
            ingredients: ["กุ้ง PDTO 15 ตัว", "แป้งเทมปุระ 1 ถ้วย", "น้ำเย็นจัด 1 ถ้วย", "น้ำมันสำหรับทอด", "เกลือป่นเล็กน้อย"],
            instructions: [
                "บั้งท้องกุ้งเล็กน้อยแล้วดัดให้ตัวตรง เพื่อให้กุ้งเหยียดตรงเวลาทอด",
                "ผสมแป้งเทมปุระกับน้ำเย็นจัด คนเบาๆ ให้เข้ากัน (ไม่ต้องเนียนมาก)",
                "ตั้งน้ำมันให้ร้อนจัด นำกุ้งชุบแป้งแล้วลงทอดทันที",
                "ทอดจนแป้งฟูเหลืองกรอบ ตักขึ้นสะเด็ดน้ำมัน เสิร์ฟพร้อมน้ำจิ้ม"
            ]
        }
    },
    {
        id: "clam-meat",
        name: "เนื้อหอยลายต้มแช่แข็ง",
        engName: "Boiled Clam Meat",
        desc: "เนื้อหอยลายคัดไซส์ ต้มสุกและแช่แข็งแบบบล็อก สะดวกพร้อมปรุงสำหรับเมนูผัดฉ่า หรือพาสต้า",
        image: "/main-clam-meat.png", // 👈 .png
        specs: [
            { size: "300-500 PCS./KG", unit: "1 kg/Block (10 Block/CTN)", nw: "NW 100%", type: "Block Frozen" },
            { size: "500-700 PCS./KG", unit: "1 kg/Block (10 Block/CTN)", nw: "NW 100%", type: "Block Frozen" },
            { size: "700-1000 PCS./KG", unit: "1 kg/Block (10 Block/CTN)", nw: "NW 100%", type: "Block Frozen" }
        ],
        packImage: "/pack-clam-meat.jpg",
        weightPerPiece: "2-5 กรัม/ตัว",
        thawing: "แช่ถุงในน้ำอุณหภูมิห้อง 20-30 นาที จนน้ำแข็งละลายหมด",
        recipe: {
            name: "สปาเก็ตตี้ผัดขี้เมาหอยลาย",
            image: "/recipe-clam-meat.jpg",
            ingredients: ["เนื้อหอยลาย 200 กรัม", "เส้นสปาเก็ตตี้ต้มสุก 200 กรัม", "พริกชี้ฟ้า พริกไทยอ่อน กระเทียม", "ใบกะเพรา 1 กำ", "ซอสหอยนางรม ซอสปรุงรส"],
            instructions: [
                "โขลกกระเทียมกับพริกให้พอหยาบ นำลงผัดในน้ำมันให้หอม",
                "ใส่เนื้อหอยลายลงไปผัดให้เข้ากัน (ไม่ต้องผัดนานเพราะหอยสุกมาแล้ว)",
                "ใส่เส้นสปาเก็ตตี้ ปรุงรสด้วยซอสหอยนางรมและซอสปรุงรส",
                "ใส่พริกไทยอ่อน พริกชี้ฟ้า และใบกะเพรา ผัดไฟแรงให้เข้ากัน พร้อมเสิร์ฟ"
            ]
        }
    },
    {
        id: "squid-ring",
        name: "เนื้อปลาหมึกหั่นแว่น",
        engName: "Frozen Squid Rings",
        desc: "ปลาหมึกกล้วยหั่นแว่นแช่แข็ง เนื้อขาวสะอาด กรอบเด้ง เหมาะสำหรับนำไปชุบแป้งทอด หรือต้มยำ",
        image: "/main-squid-ring.png", // 👈 .png
        specs: [
            { size: "3-5 CM./Ring", unit: "1 kg/Block (10 Block/CTN)", nw: "NW 80%", type: "Block Frozen" },
            { size: "5-7 CM./Ring", unit: "1 kg/Block (10 Block/CTN)", nw: "NW 80%", type: "Block Frozen" },
            { size: "Mixed Size", unit: "1 kg/Block (10 Block/CTN)", nw: "NW 80%", type: "Block Frozen" }
        ],
        packImage: "/pack-squid-ring.jpg",
        weightPerPiece: "ขนาดเส้นผ่าศูนย์กลาง 3-7 ซม.",
        thawing: "ละลายน้ำแข็งโดยให้น้ำไหลผ่าน 10-15 นาที แล้วซับน้ำให้แห้งก่อนปรุง",
        recipe: {
            name: "หมึกวงชุบแป้งทอด (คาลามารี)",
            image: "/recipe-squid-ring.jpg",
            ingredients: ["ปลาหมึกหั่นแว่น 300 กรัม", "แป้งสาลีเอนกประสงค์ 1 ถ้วย", "เกลือ, พริกไทย, ปาปริก้า", "ไข่ไก่ 1 ฟอง", "เกล็ดขนมปัง"],
            instructions: [
                "ซับปลาหมึกให้แห้งสนิท ปรุงรสด้วยเกลือและพริกไทยเล็กน้อย",
                "นำหมึกไปคลุกแป้งสาลีบางๆ ชุบไข่ และคลุกเกล็ดขนมปังให้ทั่ว",
                "ทอดในน้ำมันท่วม (Deep Fry) ไฟปานกลางค่อนข้างแรง จนเหลืองกรอบ",
                "ตักขึ้นสะเด็ดน้ำมัน เสิร์ฟพร้อมซอสทาร์ทาร์หรือมาโย"
            ]
        }
    },
    {
        id: "squid-tentacle",
        name: "หนวดปลาหมึกแช่แข็ง",
        engName: "Frozen Squid Tentacles",
        desc: "หนวดปลาหมึกกล้วยแช่แข็งบล็อก คัดเฉพาะส่วนหนวดที่เคี้ยวกรุบกรอบ สำหรับเมนูผัดกะเพรา หรือย่าง",
        image: "/main-squid-tentacle.png", // 👈 .png
        specs: [
            { size: "Small", unit: "1 kg/Block (10 Block/CTN)", nw: "NW 80%", type: "Block Frozen" },
            { size: "Medium", unit: "1 kg/Block (10 Block/CTN)", nw: "NW 80%", type: "Block Frozen" },
            { size: "Large", unit: "1 kg/Block (10 Block/CTN)", nw: "NW 80%", type: "Block Frozen" }
        ],
        packImage: "/pack-squid-tentacle.jpg",
        weightPerPiece: "คละไซส์ เล็ก-กลาง-ใหญ่",
        thawing: "ละลายน้ำแข็งโดยแช่น้ำอุณหภูมิห้อง 15-20 นาที",
        recipe: {
            name: "กะเพราหนวดปลาหมึกสุดแซ่บ",
            image: "/recipe-squid-tentacle.jpg",
            ingredients: ["หนวดปลาหมึก 300 กรัม", "พริกขี้หนู กระเทียม", "ใบกะเพรา 1 กำใหญ่", "ซอสหอยนางรม 2 ช้อนโต๊ะ", "น้ำปลา 1 ช้อนโต๊ะ", "น้ำตาลทราย 1/2 ช้อนชา"],
            instructions: [
                "นำหนวดปลาหมึกไปลวกในน้ำเดือดจัดประมาณ 30 วินาที เพื่อให้หมึกเด้งและน้ำไม่เยิ้มเวลาผัด",
                "ตั้งกระทะใส่น้ำมัน ผัดพริกกระเทียมโขลกให้หอม",
                "ใส่หนวดปลาหมึกลงไป ปรุงรสด้วยซอสหอยนางรม น้ำปลา น้ำตาล",
                "ใส่ใบกะเพรา ผัดไฟแรงอย่างรวดเร็ว ปิดไฟตักเสิร์ฟพร้อมข้าวสวย"
            ]
        }
    }
];

export default function ProductsPage() {
    const [filter, setFilter] = useState('all');
    
    // 🌟 State สำหรับการทำ Modal (Pop-up) 🌟
    const [selectedProduct, setSelectedProduct] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const filteredProducts = filter === 'all' 
        ? productsData 
        : productsData.filter(item => item.id === filter);

    useEffect(() => {
        const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };
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
    }, [filter]);

    // ฟังก์ชันเปิด-ปิด Modal
    const openModal = (product: any) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
        document.body.style.overflow = 'hidden'; // ป้องกันการเลื่อนหน้าจอเวลาเปิด Pop-up
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setTimeout(() => setSelectedProduct(null), 300); // รอ animation เฟดออกแล้วค่อยลบข้อมูล
        document.body.style.overflow = 'auto';
    };

    return (
        <div className="w-full bg-[#f8fafc] font-prompt pt-[60px]">
            
            {/* 🌟 HEADER BANNER 🌟 */}
            <div className="relative w-full h-[30vh] md:h-[35vh] bg-[#0A1931] flex flex-col items-center justify-center overflow-hidden border-b-4 border-[#E31C23]">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/clean-textile.png')]"></div>
                <div className="relative z-10 text-center px-4 fade-in-up opacity-0 translate-y-10 transition-all duration-700">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3 tracking-wide uppercase">
                        Premium <span className="text-[#FFD700]">Products</span>
                    </h1>
                    <p className="text-blue-100 text-lg font-light">วัตถุดิบคุณภาพระดับสากล ตอบโจทย์ทุกความต้องการของธุรกิจคุณ</p>
                </div>
            </div>

            {/* 🌟 1. SECTION: PRODUCTS (สินค้า) 🌟 */}
            <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-12 md:py-16">
                
                <div className="text-center mb-10 fade-in-up opacity-0 translate-y-10 transition-all duration-700">
                    <h2 className="text-3xl font-bold text-[#2B438A] mb-2">แคตตาล็อกสินค้า (Product Catalog)</h2>
                    <div className="w-20 h-1 bg-[#E31C23] mx-auto rounded-full"></div>
                </div>

                {/* Grid สินค้า สไตล์ Catalog (4 คอลัมน์) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredProducts.map((product, index) => (
                        <div 
                            key={product.id} 
                            className="bg-white rounded-2xl shadow-md hover:shadow-2xl border border-gray-100 transition-all duration-500 overflow-hidden flex flex-col fade-in-up opacity-0 translate-y-10 group"
                            style={{ transitionDelay: `${index * 100}ms` }}
                        >
                            {/* รูปภาพสินค้า */}
                            <div className="relative h-56 overflow-hidden bg-gray-50 border-b-4 border-[#2B438A]">
                                <img 
                                    src={product.image} 
                                    alt={product.name} 
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    onError={(e) => { e.currentTarget.src = '/hero-bg.png'; }} 
                                />
                                
                                <div className="absolute top-0 left-0 bg-green-600 text-white px-3 py-1.5 rounded-br-xl font-bold text-xs shadow-md flex items-center">
                                    <i className="fas fa-check mr-1"></i> IN STOCK
                                </div>

                                <div className="absolute top-0 right-0 bg-[#E31C23] text-white px-3 py-1.5 rounded-bl-xl font-bold text-xs shadow-md">
                                    <i className="fas fa-check-circle mr-1"></i> GAP / HACCP
                                </div>
                            </div>
                            
                            {/* ส่วนหัวรายละเอียดสินค้า */}
                            <div className="p-5 pb-0">
                                <h3 className="text-xl font-bold text-[#2B438A] mb-1">{product.name}</h3>
                                <p className="text-xs text-gray-500 font-medium mb-3 uppercase tracking-wider">{product.engName}</p>
                                <p className="text-gray-600 text-sm leading-relaxed mb-5 line-clamp-2">
                                    {product.desc}
                                </p>
                            </div>
                                
                            {/* ตารางสเปคสินค้า */}
                            <div className="px-5 flex-grow">
                                <div className="bg-[#f8fafc] rounded-xl border border-gray-200 overflow-hidden">
                                    <div className="bg-[#2B438A] text-white text-[10px] font-bold flex justify-between p-2.5 uppercase tracking-wider">
                                        <span className="w-2/5">Size / ขนาด</span>
                                        <span className="w-3/5 pl-2 border-l border-white/20">Specification</span>
                                    </div>
                                    <div className="divide-y divide-gray-200">
                                        {product.specs.map((spec, idx) => (
                                            <div key={idx} className="flex p-2.5 text-xs hover:bg-white transition-colors">
                                                <div className="w-2/5 font-bold text-[#E31C23] flex items-center pr-2">{spec.size}</div>
                                                <div className="w-3/5 pl-2 border-l border-gray-200 text-gray-600 flex flex-col gap-1 text-[10px] md:text-xs">
                                                    <span><i className="fas fa-box text-gray-400 w-3"></i> {spec.unit}</span>
                                                    <span><i className="fas fa-weight-hanging text-gray-400 w-3"></i> {spec.nw}</span>
                                                    <span><i className="fas fa-snowflake text-gray-400 w-3"></i> {spec.type}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            
                            {/* ปุ่ม Action (เพิ่มปุ่มเปิด Pop-up) */}
                            <div className="p-5 mt-auto flex flex-col gap-2">
                                <button 
                                    onClick={() => openModal(product)}
                                    className="w-full bg-[#f8fafc] border border-gray-200 text-[#0A1931] py-2.5 rounded-lg text-sm font-bold hover:bg-[#0A1931] hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
                                >
                                    <i className="fas fa-search"></i> ดูรายละเอียด & เมนูแนะนำ
                                </button>
                                <Link href="#contact" className="w-full bg-white border border-[#E31C23] text-[#E31C23] py-2.5 rounded-lg text-sm font-bold hover:bg-[#E31C23] hover:text-white transition-all duration-300 flex items-center justify-center gap-2">
                                    <i className="fas fa-file-invoice"></i> ขอใบเสนอราคา
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 🌟 2. VALUE ADDED SERVICES 🌟 */}
            <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-16 mt-10 border-t border-gray-100">
                <div className="text-center mb-12 fade-in-up">
                    <span className="text-[#E31C23] bg-red-50 px-4 py-1.5 rounded-full text-sm font-bold tracking-widest uppercase mb-4 inline-block border border-red-100">
                        Value-Added Services
                    </span>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-[#0A1931] mb-4">บริการเสริมเพื่อธุรกิจคุณ</h2>
                    <p className="text-gray-500 max-w-2xl mx-auto">ช่วยลดต้นทุนแฝง ประหยัดเวลาในครัว และยกระดับการจัดการวัตถุดิบของคุณให้ง่ายยิ่งขึ้น</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* บริการที่ 1: แกะเปลือกกุ้ง */}
                    <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
                        <div className="w-full h-48 bg-gray-100 relative overflow-hidden">
                            <img src="/service-1.jpg" alt="แกะเปลือกกุ้ง" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" onError={(e) => { e.currentTarget.src = 'https://placehold.co/400x300/e2e8f0/475569?text=Image+1'; }} />
                        </div>
                        <div className="p-6 text-center">
                            <div className="w-12 h-12 bg-[#0A1931] text-white rounded-full flex items-center justify-center text-xl mx-auto -mt-12 mb-4 relative z-10 border-4 border-white shadow-sm">
                                <i className="fas fa-hand-sparkles"></i>
                            </div>
                            <h3 className="text-lg font-bold text-[#0A1931] mb-2">แกะเปลือกกุ้ง</h3>
                            <p className="text-gray-600 text-sm">บริการแกะเปลือกกุ้งสดพร้อมใช้ ลดภาระงานหลังบ้าน ให้เชฟโฟกัสกับการปรุงอาหารได้เต็มที่</p>
                        </div>
                    </div>

                    {/* บริการที่ 2: ผ่าหลังกุ้ง */}
                    <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group delay-100">
                        <div className="w-full h-48 bg-gray-100 relative overflow-hidden">
                            <img src="/service-2.jpg" alt="ผ่าหลังกุ้ง" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" onError={(e) => { e.currentTarget.src = 'https://placehold.co/400x300/e2e8f0/475569?text=Image+2'; }} />
                        </div>
                        <div className="p-6 text-center">
                            <div className="w-12 h-12 bg-[#0A1931] text-white rounded-full flex items-center justify-center text-xl mx-auto -mt-12 mb-4 relative z-10 border-4 border-white shadow-sm">
                                <i className="fas fa-cut"></i>
                            </div>
                            <h3 className="text-lg font-bold text-[#0A1931] mb-2">ผ่าหลังกุ้ง</h3>
                            <p className="text-gray-600 text-sm">ผ่าหลังกุ้งให้สวยงามได้มาตรฐาน เตรียมพร้อมสำหรับการนำไปรังสรรค์เมนูต่างๆ ได้ทันที</p>
                        </div>
                    </div>

                    {/* บริการที่ 3: ดึงเส้นดำ */}
                    <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group delay-200">
                        <div className="w-full h-48 bg-gray-100 relative overflow-hidden">
                            <img src="/service-3.jpg" alt="ดึงเส้นดำ" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" onError={(e) => { e.currentTarget.src = 'https://placehold.co/400x300/e2e8f0/475569?text=Image+3'; }} />
                        </div>
                        <div className="p-6 text-center">
                            <div className="w-12 h-12 bg-[#0A1931] text-white rounded-full flex items-center justify-center text-xl mx-auto -mt-12 mb-4 relative z-10 border-4 border-white shadow-sm">
                                <i className="fas fa-magic"></i>
                            </div>
                            <h3 className="text-lg font-bold text-[#0A1931] mb-2">ดึงเส้นดำ</h3>
                            <p className="text-gray-600 text-sm">บริการดึงเส้นดำออกอย่างพิถีพิถัน เพื่อความสะอาด สวยงาม และเพิ่มความมั่นใจในทุกคำ</p>
                        </div>
                    </div>

                    {/* บริการที่ 4: จัดแพ็กตามจำนวน */}
                    <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group delay-300">
                        <div className="w-full h-48 bg-gray-100 relative overflow-hidden">
                            <img src="/service-4.jpg" alt="จัดแพ็กตามจำนวน" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" onError={(e) => { e.currentTarget.src = 'https://placehold.co/400x300/e2e8f0/475569?text=Image+4'; }} />
                        </div>
                        <div className="p-6 text-center">
                            <div className="w-12 h-12 bg-[#0A1931] text-white rounded-full flex items-center justify-center text-xl mx-auto -mt-12 mb-4 relative z-10 border-4 border-white shadow-sm">
                                <i className="fas fa-box-open"></i>
                            </div>
                            <h3 className="text-lg font-bold text-[#0A1931] mb-2">จัดแพ็กตามจำนวน</h3>
                            <p className="text-gray-600 text-sm">แบ่งบรรจุตามสัดส่วน หรือจำนวนที่คุณต้องการ เพื่อให้ง่ายต่อการคำนวณ Food Cost ต่อจาน</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* 🌟 3. พัฒนานวัตกรรมและเทคโนโลยีเพื่อคุณ 🌟 */}
            <div className="w-full bg-[#f1f5f9] py-16 border-t border-gray-200">
                <div className="max-w-[1440px] mx-auto px-4 md:px-8">
                    <div className="text-center mb-12 fade-in-up">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-[#0A1931] mb-4">
                            พัฒนานวัตกรรมและเทคโนโลยี <span className="text-[#E31C23]">เพื่อคุณ</span>
                        </h2>
                        <p className="text-gray-500 max-w-2xl mx-auto">
                            เราไม่หยุดนิ่งที่จะนำเทคโนโลยีระดับโลกมาประยุกต์ใช้ เพื่อควบคุมคุณภาพกุ้งทุกตัวให้สมบูรณ์แบบที่สุดก่อนถึงมือคุณ
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Tech 1: Cold Chain */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:border-[#1B3A6B] hover:shadow-lg transition-all group fade-in-up">
                            <div className="w-16 h-16 bg-[#0A1931] text-white rounded-xl flex items-center justify-center text-3xl mb-6 shadow-md group-hover:scale-110 group-hover:bg-[#E31C23] transition-all duration-300">
                                <i className="fas fa-truck-fast"></i>
                            </div>
                            <h3 className="text-xl font-bold text-[#0A1931] mb-3">Cold Chain Logistics</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                บริการจัดส่งด้วยรถห้องเย็น ควบคุมอุณหภูมิคงที่ -18°C ตลอดเส้นทาง พร้อมระบบ GPS Tracking ตรวจสอบสถานะได้แบบเรียลไทม์
                            </p>
                        </div>

                        {/* Tech 2: AI Quality */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:border-[#1B3A6B] hover:shadow-lg transition-all group fade-in-up delay-100">
                            <div className="w-16 h-16 bg-[#0A1931] text-white rounded-xl flex items-center justify-center text-3xl mb-6 shadow-md group-hover:scale-110 group-hover:bg-[#E31C23] transition-all duration-300">
                                <i className="fas fa-microchip"></i>
                            </div>
                            <h3 className="text-xl font-bold text-[#0A1931] mb-3">AI Quality Sorting</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                เทคโนโลยีคัดเกรดด้วยกล้อง AI Camera ตรวจจับขนาด สี และความสมบูรณ์ของตัวกุ้งได้อย่างแม่นยำ เพื่อให้ได้ไซส์ที่สม่ำเสมอ
                            </p>
                        </div>

                        {/* Tech 3: OEM */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:border-[#1B3A6B] hover:shadow-lg transition-all group fade-in-up delay-200">
                            <div className="w-16 h-16 bg-[#0A1931] text-white rounded-xl flex items-center justify-center text-3xl mb-6 shadow-md group-hover:scale-110 group-hover:bg-[#E31C23] transition-all duration-300">
                                <i className="fas fa-boxes-packing"></i>
                            </div>
                            <h3 className="text-xl font-bold text-[#0A1931] mb-3">OEM & Custom Standard</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                รองรับการผลิตและบรรจุภัณฑ์ตามสเปคของลูกค้า (OEM) สำหรับร้านอาหาร แฟรนไชส์ หรือแบรนด์ของคุณเอง ภายใต้มาตรฐานสากล
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* ========================================== */}
            {/* 🌟 4. MODAL (Pop-up แสดงรายละเอียดและเมนู) 🌟 */}
            {/* ========================================== */}
            {isModalOpen && selectedProduct && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 font-prompt">
                    {/* พื้นหลังสีดำโปร่งแสง (กดเพื่อปิด) */}
                    <div 
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
                        onClick={closeModal}
                    ></div>

                    {/* กล่อง Pop-up */}
                    <div className="relative bg-white w-full max-w-6xl max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row animate-[fadeIn_0.3s_ease-out]">
                        
                        {/* ปุ่มปิด X */}
                        <button 
                            onClick={closeModal}
                            className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/80 backdrop-blur text-gray-800 rounded-full flex items-center justify-center text-xl hover:bg-[#E31C23] hover:text-white shadow-md transition-colors"
                        >
                            <i className="fas fa-times"></i>
                        </button>

                        {/* ⬅️ ฝั่งซ้าย: รายละเอียดสินค้าและแพ็กเกจ */}
                        <div className="w-full md:w-1/2 bg-[#f8fafc] overflow-y-auto custom-scrollbar border-r border-gray-200">
                            <div className="relative h-64 md:h-80 bg-gray-200">
                                <img 
                                    src={selectedProduct.packImage || selectedProduct.image} 
                                    alt={`แพ็กเกจ ${selectedProduct.name}`}
                                    className="w-full h-full object-cover"
                                    onError={(e) => { e.currentTarget.src = '/hero-bg.png'; }} 
                                />
                                <div className="absolute top-4 left-4 bg-[#2B438A] text-white px-3 py-1.5 rounded-lg font-bold text-xs shadow-md">
                                    <i className="fas fa-box-open mr-1"></i> Packaging Style
                                </div>
                            </div>
                            
                            <div className="p-6 md:p-8">
                                <div className="inline-block bg-[#0A1931] text-white px-3 py-1 rounded text-xs font-bold mb-3 tracking-wider">
                                    {selectedProduct.engName}
                                </div>
                                <h2 className="text-3xl font-bold text-[#2B438A] mb-4">{selectedProduct.name}</h2>
                                <p className="text-gray-600 mb-6 leading-relaxed text-sm md:text-base">
                                    {selectedProduct.desc}
                                </p>

                                {/* ข้อมูลเชิงลึก */}
                                <div className="space-y-4 bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                                    <div className="flex gap-4 items-start">
                                        <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                                            <i className="fas fa-balance-scale"></i>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-[#0A1931] text-sm">น้ำหนักเฉลี่ยต่อตัว</h4>
                                            <p className="text-gray-500 text-sm">{selectedProduct.weightPerPiece}</p>
                                        </div>
                                    </div>
                                    <hr className="border-gray-100" />
                                    <div className="flex gap-4 items-start">
                                        <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                                            <i className="fas fa-temperature-arrow-up"></i>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-[#0A1931] text-sm">คำแนะนำการละลายน้ำแข็ง (Thawing)</h4>
                                            <p className="text-gray-500 text-sm">{selectedProduct.thawing}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ➡️ ฝั่งขวา: เมนูแนะนำ (Chef's Recommend) */}
                        <div className="w-full md:w-1/2 bg-white overflow-y-auto custom-scrollbar">
                            <div className="relative h-48 md:h-64 bg-gray-900">
                                <img 
                                    src={selectedProduct.recipe.image} 
                                    alt={selectedProduct.recipe.name}
                                    className="w-full h-full object-cover opacity-80"
                                    onError={(e) => { e.currentTarget.src = 'https://placehold.co/800x600/1B3A6B/FFFFFF?text=Chef+Recommend'; }} 
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                                <div className="absolute bottom-6 left-6 right-6">
                                    <span className="text-[#E31C23] bg-white px-2 py-1 rounded text-xs font-bold mb-2 inline-block shadow-sm">
                                        <i className="fas fa-utensils mr-1"></i> Chef&apos;s Recommend
                                    </span>
                                    <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight drop-shadow-md">
                                        {selectedProduct.recipe.name}
                                    </h3>
                                </div>
                            </div>

                            <div className="p-6 md:p-8">
                                {/* วัตถุดิบ */}
                                <div className="mb-8">
                                    <h4 className="text-lg font-bold text-[#0A1931] mb-4 border-b-2 border-red-100 pb-2 inline-block">
                                        วัตถุดิบที่ต้องใช้ (Ingredients)
                                    </h4>
                                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {selectedProduct.recipe.ingredients.map((ing: string, i: number) => (
                                            <li key={i} className="text-gray-600 text-sm flex items-start gap-2">
                                                <i className="fas fa-circle text-[#E31C23] text-[6px] mt-1.5"></i> {ing}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* วิธีทำ */}
                                <div>
                                    <h4 className="text-lg font-bold text-[#0A1931] mb-4 border-b-2 border-red-100 pb-2 inline-block">
                                        วิธีทำ (Instructions)
                                    </h4>
                                    <div className="space-y-4">
                                        {selectedProduct.recipe.instructions.map((step: string, i: number) => (
                                            <div key={i} className="flex gap-4">
                                                <div className="w-6 h-6 rounded-full bg-[#2B438A] text-white text-xs font-bold flex items-center justify-center shrink-0">
                                                    {i + 1}
                                                </div>
                                                <p className="text-gray-600 text-sm pt-0.5">{step}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            )}
            
            <style jsx global>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: #f1f1f1; 
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #cbd5e1; 
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #94a3b8; 
                }
            `}</style>
        </div>
    );
}