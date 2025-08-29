import { Link } from "@inertiajs/react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ links }) {
    if (!links || links.length <= 3) {
        return null; // Don't render if there's only one page of results
    }

    // --- ENHANCEMENT: Separate the navigation from the page numbers ---
    const prevLink = links[0];
    const nextLink = links[links.length - 1];
    const pageLinks = links.slice(1, -1);

    return (
        <nav
            aria-label="Pagination"
            className="flex w-full items-center justify-between text-sm font-medium"
        >
            {/* --- ENHANCEMENT: Styled "Previous" Button --- */}
            <Link
                href={prevLink.url || "#"}
                preserveScroll
                className={cn(
                    "inline-flex items-center justify-center h-9 min-w-[2.25rem] px-3 gap-1 rounded-md border border-slate-200 bg-white text-slate-700 transition-colors hover:bg-slate-50",
                    !prevLink.url && "cursor-not-allowed opacity-50"
                )}
                as="button"
                disabled={!prevLink.url}
            >
                <ChevronLeft className="h-4 w-4" />
                <span>Previous</span>
            </Link>

            {/* --- ENHANCEMENT: Centered Page Numbers --- */}
            <div className="hidden items-center gap-1 md:flex">
                {pageLinks.map((link, index) => {
                    // Handle the ellipsis "..."
                    if (link.label.includes("...")) {
                        return (
                            <span
                                key={index}
                                className="flex h-9 w-9 items-center justify-center text-slate-400"
                            >
                                ...
                            </span>
                        );
                    }
                    // Handle actual page numbers
                    return (
                        <Link
                            key={index}
                            href={link.url || "#"}
                            preserveScroll
                            className={cn(
                                "flex h-9 w-9 items-center justify-center rounded-md transition-colors",
                                link.active
                                    ? "bg-blue-700 font-semibold text-white shadow-md"
                                    : "text-slate-700 hover:bg-blue-100"
                            )}
                            as="button"
                            disabled={!link.url}
                        >
                            {link.label}
                        </Link>
                    );
                })}
            </div>

            {/* --- ENHANCEMENT: Styled "Next" Button --- */}
            <Link
                href={nextLink.url || "#"}
                preserveScroll
                className={cn(
                    "inline-flex items-center justify-center h-9 min-w-[2.25rem] px-3 gap-1 rounded-md border border-slate-200 bg-white text-slate-700 transition-colors hover:bg-slate-50",
                    !nextLink.url && "cursor-not-allowed opacity-50"
                )}
                as="button"
                disabled={!nextLink.url}
            >
                <span>Next</span>
                <ChevronRight className="h-4 w-4" />
            </Link>
        </nav>
    );
}
