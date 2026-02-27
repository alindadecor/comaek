import Link from 'next/link';
import './Header.css'; 

export default function Header() {
  return (
    <header className="header-container font-prompt">
      <div className="logo">
  <Link href="/" className="logo-link">
    <img src="/your-logo.png" alt="โลโก้ ช.ฟาร์มกุ้ง" />
    <span className="logo-text">ช.ฟาร์มกุ้ง</span> {/* 👈 ต้องมีบรรทัดนี้นะครับ */}
  </Link>
</div>

      <nav>
        <ul className="nav-menu">
          <li><Link href="/">หน้าหลัก</Link></li>
          <li><Link href="/about">เกี่ยวกับเรา</Link></li>
          <li><Link href="/products">สินค้า / บริการ</Link></li>
          <li><Link href="#community">AI / COMMUNITY</Link></li>
          <li><Link href="#careers">ร่วมงานกับเรา</Link></li>
        </ul>
      </nav>
    </header>
  );
}