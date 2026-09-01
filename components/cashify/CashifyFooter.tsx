import Link from "next/link";

export default function CashifyFooter() {
  return (
    <footer className="bg-neutral-900 text-neutral-400 text-xs border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 pb-12 border-b border-neutral-800">
          <div>
            <h4 className="text-white font-bold mb-3 text-sm">Services</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="hover:text-white transition">Sell Phone</Link></li>
              <li><Link href="#" className="hover:text-white transition">Sell Laptop</Link></li>
              <li><Link href="#" className="hover:text-white transition">Sell Smart Watch</Link></li>
              <li><Link href="#" className="hover:text-white transition">Repair Phone</Link></li>
              <li><Link href="#" className="hover:text-white transition">Recycle Phone</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-3 text-sm">Company</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="hover:text-white transition">About Us</Link></li>
              <li><Link href="#" className="hover:text-white transition">Careers</Link></li>
              <li><Link href="#" className="hover:text-white transition">Articles</Link></li>
              <li><Link href="#" className="hover:text-white transition">Become Partner</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-3 text-sm">Help & Support</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="hover:text-white transition">FAQ</Link></li>
              <li><Link href="#" className="hover:text-white transition">Contact Us</Link></li>
              <li><Link href="#" className="hover:text-white transition">Warranty Policy</Link></li>
              <li><Link href="#" className="hover:text-white transition">Refund Policy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-3 text-sm">Legal</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="hover:text-white transition">Terms & Conditions</Link></li>
              <li><Link href="#" className="hover:text-white transition">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-white transition">E-Waste Policy</Link></li>
              <li><Link href="#" className="hover:text-white transition">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 text-center text-neutral-500 text-[11px] space-y-2">
          <p>© 2026 Cashify. All rights reserved.</p>
          <p>ISO 27001 Compliance Certified. All brand logos are property of their respective owners.</p>
        </div>
      </div>
    </footer>
  );
}