import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  badge?: string;
  title: string;
  description: string;
  breadcrumbs: BreadcrumbItem[];
}

export default function PageHeader({
  badge,
  title,
  description,
  breadcrumbs,
}: PageHeaderProps) {
  return (
    <div className="relative bg-[#06172e] text-white pt-10 pb-12 sm:pt-14 sm:pb-16 border-b border-blue-900/50 overflow-hidden font-sans">
      {/* Decorative Subtle Radial Background Glow */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-3/4 max-w-5xl h-64 bg-radial from-blue-600/20 via-blue-900/5 to-transparent blur-3xl opacity-70" 
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-4 sm:mb-6">
          <ol className="flex items-center gap-2 text-xs text-slate-400 flex-wrap">
            <li>
              <Link 
                href="/" 
                className="hover:text-sky-300 transition-colors flex items-center gap-1.5"
              >
                <Home className="w-3.5 h-3.5 text-sky-400" />
                <span>Beranda</span>
              </Link>
            </li>
            {breadcrumbs.map((item, idx) => {
              const isLast = idx === breadcrumbs.length - 1;
              return (
                <li key={idx} className="flex items-center gap-2">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                  {item.href && !isLast ? (
                    <Link 
                      href={item.href} 
                      className="hover:text-sky-300 transition-colors"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span className="text-sky-300 font-semibold" aria-current={isLast ? "page" : undefined}>
                      {item.label}
                    </span>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>

        {/* Badge & Title */}
        <div className="max-w-3xl space-y-3">
          {badge && (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-800/60 text-sky-300 text-xs font-bold uppercase tracking-wider shadow-xs">
              <span className="w-2 h-2 rounded-full bg-sky-400" />
              <span>{badge}</span>
            </div>
          )}

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            {title}
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed pt-1">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

