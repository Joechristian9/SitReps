// resources/js/Pages/Weather/Index.jsx

import { useState, useEffect } from "react";
import { usePage, Head, router } from "@inertiajs/react";
import { Toaster, toast } from "react-hot-toast";

// Layout and Reusable Components
import {
    SidebarProvider,
    SidebarInset,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import WeatherFormModal from "@/components/WeatherFormModal";
import DeleteConfirmationDialog from "@/components/DeleteConfirmationDialog";
import WeatherReportTable from "@/components/WeatherReportTable";
import Pagination from "@/components/Pagination";
import Breadcrumbs from "@/components/Breadcrumbs";

// Shadcn UI Components
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle, Search } from "lucide-react";

export default function WeatherIndex() {
    const { reports, filters, flash } = usePage().props;

    // --- ENHANCEMENT 1: Refactored modal state management ---
    // Instead of 3 separate states, we use one object for cleaner logic.
    const [modalState, setModalState] = useState({ type: null, data: null });
    const [searchTerm, setSearchTerm] = useState(filters.search || "");

    // --- ENHANCEMENT 2: State to track when data is being filtered ---
    const [isFiltering, setIsFiltering] = useState(false);

    // Effect for showing toast notifications
    useEffect(() => {
        if (flash?.success) toast.success(flash.success);
        if (flash?.error) toast.error(flash.error);
    }, [flash]);

    // Effect for debounced search filtering
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            router.get(
                route("weather.index"),
                { search: searchTerm },
                {
                    preserveState: true,
                    replace: true,
                    // --- ENHANCEMENT 3: Use Inertia callbacks for precise loading state ---
                    onStart: () => setIsFiltering(true),
                    onFinish: () => setIsFiltering(false),
                }
            );
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm]);

    // --- Refactored handlers to use the new modal state object ---
    const handleAddNew = () => setModalState({ type: "add", data: null });
    const handleEdit = (report) =>
        setModalState({ type: "edit", data: report });
    const handleDelete = (report) =>
        setModalState({ type: "delete", data: report });
    const closeModal = () => setModalState({ type: null, data: null });

    const breadcrumbs = [
        { href: route("dashboard"), label: "Dashboard" },
        { label: "Weather Reports" },
    ];

    return (
        <SidebarProvider>
            <Toaster
                position="top-right"
                toastOptions={{
                    // Define default options for all toasts
                    className: "",
                    duration: 10000,
                    style: {
                        background: "#363636",
                        color: "#fff",
                    },

                    // Default options for specific types
                    success: {
                        duration: 3000,
                        theme: {
                            primary: "green",
                            secondary: "black",
                        },
                    },
                }}
            />
            <AppSidebar />
            <Head title="Weather Reports" />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center justify-between px-4 border-b">
                    <div className="flex items-center gap-2">
                        <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="h-6" />
                        <Breadcrumbs crumbs={breadcrumbs} />
                    </div>
                </header>

                <main className="w-full p-6">
                    <Card>
                        <CardHeader>
                            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                                <CardTitle>Present Weather Updates</CardTitle>
                                <div className="flex items-center gap-2 w-full md:w-auto">
                                    <div className="relative w-full md:w-64">
                                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                                        <Input
                                            type="search"
                                            placeholder="Search by municipality..."
                                            className="pl-8"
                                            value={searchTerm}
                                            onChange={(e) =>
                                                setSearchTerm(e.target.value)
                                            }
                                        />
                                    </div>
                                    <Button
                                        onClick={handleAddNew}
                                        className="shrink-0 bg-blue-700 text-white hover:bg-blue-800"
                                    >
                                        <PlusCircle className="h-4 w-4 mr-2" />
                                        Add Report
                                    </Button>
                                </div>
                            </div>
                        </CardHeader>
                        {/* --- ENHANCEMENT: Apply opacity transition during filtering for UX feedback --- */}
                        <CardContent
                            className={`transition-opacity duration-300 ${
                                isFiltering ? "opacity-50" : "opacity-100"
                            }`}
                        >
                            <WeatherReportTable
                                reports={reports.data}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                            />
                        </CardContent>
                        <CardFooter>
                            <Pagination links={reports.links} />
                        </CardFooter>
                    </Card>
                </main>
            </SidebarInset>

            {/* Modals now use the cleaner state logic */}
            <WeatherFormModal
                isOpen={modalState.type === "add" || modalState.type === "edit"}
                onClose={closeModal}
                report={modalState.data}
            />
            <DeleteConfirmationDialog
                isOpen={modalState.type === "delete"}
                onClose={closeModal}
                report={modalState.data}
            />
        </SidebarProvider>
    );
}
