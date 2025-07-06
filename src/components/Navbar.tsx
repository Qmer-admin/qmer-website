import Link from 'next/link'
import Image from 'next/image'

export default function Navbar() {
  return (
    <header className="w-full bg-black text-white px-4 py-4 fixed top-0 left-0 z-50 shadow-md">
      <nav className="w-full px-4 flex items-center justify-between">
        {/* Sol taraf: Logo + Marka Adı */}
        <Link href="/" className="flex items-center space-x-3">
          <Image
            src="/Qmer Logo.jpg"
            alt="QMER Logo"
            width={36}
            height={36}
            className="rounded-full"
          />
          <span className="text-lg font-bold tracking-wide">QMER LLC</span>
        </Link>

        {/* Sağ taraf: Menü Linkleri */}
        <div className="flex space-x-6 text-sm sm:text-base font-medium">
          <Link href="/" className="hover:text-amber-300 transition">Home</Link>
          <Link href="/about" className="hover:text-amber-300 transition">About</Link>
          <Link href="/orweym" className="hover:text-amber-300 transition">ORWEY-M</Link>
          <Link href="/contact" className="hover:text-amber-300 transition">Contact</Link>
        </div>
      </nav>
    </header>
  )
}
