import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#F7F1E8] flex items-center justify-center px-5 py-20 text-[#29251F] sm:px-8 lg:px-10">
      <div className="mx-auto max-w-md text-center space-y-8">
        <div>
          <p className="mb-4 text-[0.7rem] uppercase tracking-[0.38em] text-[#75695B]">404</p>
          <h1 className="font-serif text-[clamp(2.5rem,6vw,5rem)] leading-[0.9] tracking-[-0.06em]">Page not found</h1>
        </div>

        <p className="text-lg leading-8 text-[#4d443d]">
          We couldn&apos;t find the page you&apos;re looking for. It may have been moved or archived.
        </p>

        <div className="flex flex-col gap-3 pt-4">
          <Link
            href="/shop"
            className="inline-block rounded-full bg-[#29251F] px-8 py-3 text-[0.68rem] font-medium uppercase tracking-[0.24em] text-[#F7F1E8] transition hover:bg-[#3d3530]"
          >
            Browse collection
          </Link>
          <Link
            href="/"
            className="inline-block rounded-full border border-[#29251F]/20 px-8 py-3 text-[0.68rem] font-medium uppercase tracking-[0.24em] text-[#29251F] transition hover:bg-[#EFE5D6]"
          >
            Return home
          </Link>
        </div>
      </div>
    </main>
  );
}
