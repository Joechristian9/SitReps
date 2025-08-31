// resources/js/components/WeatherReportTable.jsx

import React from "react";
import { formatDistanceToNow } from "date-fns";
import { Edit, Trash2, History } from "lucide-react";
import DynamicTimestamp from "@/Components/DynamicTimestamp";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
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

const getInitials = (name = "") => {
    if (!name) return "?";
    const names = name.split(" ");
    if (names.length === 1) return names[0].charAt(0).toUpperCase();
    return (
        names[0].charAt(0) + names[names.length - 1].charAt(0)
    ).toUpperCase();
};

const HistoryItem = ({ historyEntry }) => {
    const userName = historyEntry.user?.name ?? "A deleted user";
    return (
        <div className="flex items-center gap-3">
            <div className="flex size-8 items-center justify-center rounded-full bg-muted text-muted-foreground font-medium text-xs">
                {getInitials(userName)}
            </div>
            <div className="grid gap-0.5">
                <p className="font-medium text-sm text-foreground">
                    {userName}
                </p>
                <p className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(historyEntry.created_at), {
                        addSuffix: true,
                    })}
                </p>
            </div>
        </div>
    );
};

const UserAvatar = ({ user, historyCount }) => {
    const userName = user?.name ?? "System";
    return (
        <div className="flex items-center gap-3">
            <div className="relative">
                <div className="flex size-9 items-center justify-center rounded-full bg-secondary text-secondary-foreground font-medium text-sm">
                    {getInitials(userName)}
                </div>
                {historyCount > 1 && (
                    <span className="absolute -bottom-1 -right-1 flex size-5 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                        {historyCount}
                    </span>
                )}
            </div>
            <div className="grid gap-0.5">
                <p className="font-medium text-foreground">{userName}</p>
                <p className="text-xs text-muted-foreground">
                    {user?.email ?? "No email available"}
                </p>
            </div>
        </div>
    );
};

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
                    <TableHead>Updated By</TableHead>
                    <TableHead>Last Update</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {reports.length === 0 ? (
                    <TableRow>
                        {" "}
                        <TableCell
                            colSpan="8"
                            className="text-center text-muted-foreground py-10"
                        >
                            {" "}
                            No weather reports found.{" "}
                        </TableCell>{" "}
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
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <button
                                            className="w-full text-left rounded-md hover:bg-muted/50 p-1 -m-1 transition-colors disabled:pointer-events-none"
                                            disabled={
                                                !report.editHistories ||
                                                report.editHistories.length ===
                                                    0
                                            }
                                        >
                                            <UserAvatar
                                                user={report.user}
                                                historyCount={
                                                    report.editHistories
                                                        ?.length || 0
                                                }
                                            />
                                        </button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-64 p-2 space-y-2">
                                        <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground px-2">
                                            <History className="size-4" />
                                            <span>Edit History</span>
                                        </div>

                                        {/* --- THE FIX: Use optional chaining (?.) --- */}
                                        {/* This will only run .map() if `editHistories` is an array. */}
                                        {/* If it's undefined or null, it will do nothing, preventing the crash. */}
                                        {report.editHistories?.map((entry) => (
                                            <HistoryItem
                                                key={entry.id}
                                                historyEntry={entry}
                                            />
                                        ))}
                                    </PopoverContent>
                                </Popover>
                            </TableCell>
                            <TableCell>
                                <DynamicTimestamp date={report.updated_at} />
                            </TableCell>
                            <TableCell className="text-right space-x-2">
                                <TooltipProvider delayDuration={100}>
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
