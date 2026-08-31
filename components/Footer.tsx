import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-neutral-950 text-neutral-400 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-white text-sm font-semibold mb-4 tracking-wider uppercase">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-white transition">Audio</Link></li>
              <li><Link href="#" className="hover:text-white transition">Desk Setup</Link></li>
              <li><Link href="#" className="hover:text-white transition">Travel Essentials</Link></li>
              <li><Link href="#" className="hover:text-white transition">Limited Drops</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white text-sm font-semibold mb-4 tracking-wider uppercase">About</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-white transition">Philosophy</Link></li>
              <li><Link href="#" className="hover:text-white transition">Sustainability</Link></li>
              <li><Link href="#" className="hover:text-white transition">Careers</Link></li>
              <li><Link href="#" className="hover:text-white transition">Press Kit</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white text-sm font-semibold mb-4 tracking-wider uppercase">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-white transition">Order Status</Link></li>
              <li><Link href="#" className="hover:text-white transition">Shipping & Returns</Link></li>
              <li><Link href="#" className="hover:text-white transition">Warranty Claims</Link></li>
              <li><Link href="#" className="hover:text-white transition">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white text-sm font-semibold mb-4 tracking-wider uppercase">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-white transition">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-white transition">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-white transition">Cookie Settings</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-neutral-900 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-neutral-500">
          <p>© 2026 Aura Studio Inc. All rights reserved.</p>
          <p>Crafted for refined tastes.</p>
        </div>
      </div>
    </footer>
  );
}