// resources/js/components/ui/table.jsx

import * as React from "react";
import { cn } from "@/lib/utils";

const Table = React.forwardRef(({ className, ...props }, ref) => (
    <div className="relative w-full overflow-auto rounded-lg border border-slate-200">
        <table
            ref={ref}
            className={cn("w-full caption-bottom text-sm", className)}
            {...props}
        />
    </div>
));
Table.displayName = "Table";

const TableHeader = React.forwardRef(({ className, ...props }, ref) => (
    <thead
        ref={ref}
        className={cn("[&_tr]:border-b-0", className)}
        {...props}
    />
));
TableHeader.displayName = "TableHeader";

const TableBody = React.forwardRef(({ className, ...props }, ref) => (
    <tbody
        ref={ref}
        className={cn(
            "[&_tr:last-child]:border-0 [&_tr:nth-child(even)]:bg-slate-50",
            className
        )}
        {...props}
    />
));
TableBody.displayName = "TableBody";

const TableFooter = React.forwardRef(({ className, ...props }, ref) => (
    <tfoot
        ref={ref}
        className={cn(
            "border-t bg-slate-100 font-medium text-slate-700 [&>tr]:last:border-b-0",
            className
        )}
        {...props}
    />
));
TableFooter.displayName = "TableFooter";

// --- MODIFIED ---
// Added classes to remove the right border from the last cell in any row.
const TableRow = React.forwardRef(({ className, ...props }, ref) => (
    <tr
        ref={ref}
        className={cn(
            "border-b border-slate-200 transition-colors hover:bg-blue-100/60 data-[state=selected]:bg-blue-100",
            "[&>th:last-child]:border-r-0 [&>td:last-child]:border-r-0", // Removes border from last column
            className
        )}
        {...props}
    />
));
TableRow.displayName = "TableRow";

// --- MODIFIED ---
// Added a right border to create vertical lines between header cells.
const TableHead = React.forwardRef(({ className, ...props }, ref) => (
    <th
        ref={ref}
        className={cn(
            "h-14 px-4 text-left align-middle font-semibold text-white bg-blue-700",
            "border-r border-blue-600", // Vertical line for header
            "[&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
            className
        )}
        {...props}
    />
));
TableHead.displayName = "TableHead";

// --- MODIFIED ---
// Added a right border to create vertical lines between body cells.
const TableCell = React.forwardRef(({ className, ...props }, ref) => (
    <td
        ref={ref}
        className={cn(
            "px-4 py-3 align-middle text-slate-700",
            "border-r border-slate-200", // Vertical line for body
            "[&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
            className
        )}
        {...props}
    />
));
TableCell.displayName = "TableCell";

const TableCaption = React.forwardRef(({ className, ...props }, ref) => (
    <caption
        ref={ref}
        className={cn("mt-4 text-sm text-slate-500", className)}
        {...props}
    />
));
TableCaption.displayName = "TableCaption";

export {
    Table,
    TableHeader,
    TableBody,
    TableFooter,
    TableHead,
    TableRow,
    TableCell,
    TableCaption,
};
