import type { Metadata } from "next";
import { Prompt } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer"; // 1. นำเข้า Component Footer

const prompt = Prompt({
  weight: ['300', '400', '500', '600', '700'], 
  subsets: ["latin", "thai"],
});

export const metadata: Metadata = {
  title: "ช.ฟาร์มกุ้ง",
  description: "เว็บไซต์ ช.ฟาร์มกุ้ง ยินดีต้อนรับ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className="scroll-smooth">
      <body className={`${prompt.className} flex flex-col min-h-screen bg-[#f0f4f8]`}>
        
        <Header />
        
        {/* ส่วนเนื้อหาหลัก จะยืดหยุ่นตามความสูงของหน้าจอ */}
        <main className="flex-grow">
          {children}
        </main>

        <Footer /> {/* 2. วาง Footer ไว้ล่างสุด */}

      </body>
    </html>
  );
}