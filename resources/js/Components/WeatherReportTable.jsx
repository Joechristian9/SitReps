// resources/js/components/WeatherReportTable.jsx

import React from "react";
// --- 1. Import the date formatting function ---
import { formatDistanceToNow } from "date-fns";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Edit, Trash2 } from "lucide-react";

export default function WeatherReportTable({ reports, onEdit, onDelete }) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Municipality</TableHead>
                    <TableHead>Sky</TableHead>
                    <TableHead>Wind</TableHead>
                    <TableHead>Precipitation</TableHead>
                    <TableHead>Sea</TableHead>
                    <TableHead>Date</TableHead>
                    {/* --- 2. Add the new "Last Updated" column header --- */}
                    <TableHead>Last Updated</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {reports.length === 0 ? (
                    <TableRow>
                        {/* --- 3. Update colSpan for the empty state --- */}
                        <TableCell
                            colSpan="8"
                            className="text-center text-slate-500 py-10"
                        >
                            No weather reports found.
                        </TableCell>
                    </TableRow>
                ) : (
                    reports.map((report) => (
                        <TableRow key={report.id}>
                            <TableCell className="font-medium">
                                {report.municipality}
                            </TableCell>
                            <TableCell>{report.sky_condition}</TableCell>
                            <TableCell>{report.wind}</TableCell>
                            <TableCell>{report.precipitation}</TableCell>
                            <TableCell>{report.sea_condition}</TableCell>
                            <TableCell>
                                {new Date(
                                    report.report_date
                                ).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                })}
                            </TableCell>
                            {/* --- 4. Add the new cell with the formatted timestamp --- */}
                            <TableCell className="text-slate-600">
                                {formatDistanceToNow(
                                    new Date(report.updated_at),
                                    { addSuffix: true }
                                )}
                            </TableCell>
                            <TableCell className="text-right space-x-2">
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                onClick={() => onEdit(report)}
                                            >
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Edit Report</p>
                                        </TooltipContent>
                                    </Tooltip>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button
                                                variant="destructive"
                                                size="icon"
                                                onClick={() => onDelete(report)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Delete Report</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </TableCell>
                        </TableRow>
                    ))
                )}
            </TableBody>
        </Table>
    );
}
