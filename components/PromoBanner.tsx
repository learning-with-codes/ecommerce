import Link from "next/link";

export default function PromoBanner() {
  return (
    <section className="py-20 bg-neutral-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-neutral-800/60 p-8 sm:p-16 border border-neutral-700 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-xl space-y-4 text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Join the private circle.
            </h2>
            <p className="text-neutral-400 text-base leading-relaxed">
              Get exclusive early access to low-volume drops, member pricing, and editorial design insights straight to your inbox.
            </p>
          </div>
          <div className="w-full lg:w-auto">
            <form className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
              <input
                type="email"
                placeholder="Enter your email address"
                required
                className="px-5 py-3.5 rounded-xl bg-neutral-900 border border-neutral-700 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-white text-sm"
              />
              <button
                type="submit"
                className="px-6 py-3.5 bg-white text-neutral-950 font-semibold rounded-xl hover:bg-neutral-200 transition text-sm whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}