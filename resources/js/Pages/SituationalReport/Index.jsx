import { useState, useEffect } from "react";
import { usePage, Head } from "@inertiajs/react";
import { Toaster, toast } from "react-hot-toast";

// Layout and Reusable Components
import {
    SidebarProvider,
    SidebarInset,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import Breadcrumbs from "@/components/Breadcrumbs";
import Pagination from "@/components/Pagination";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardFooter,
} from "@/components/ui/card";

// --- MODIFICATION: Updated import paths ---
import SituationalReportForm from "@/components/SituationalReport/SituationalReportForm";
import SituationalReportTable from "@/components/SituationalReport/SituationalReportTable";
import SituationalReportEditModal from "@/components/SituationalReport/SituationalReportEditModal";

export default function Index() {
    const { reports, flash } = usePage().props;
    const [editingReport, setEditingReport] = useState(null);

    useEffect(() => {
        if (flash?.success) toast.success(flash.success);
        if (flash?.error) toast.error(flash.error);
    }, [flash]);

    const handleEdit = (report) => {
        setEditingReport(report);
    };

    const closeEditModal = () => {
        setEditingReport(null);
    };

    const breadcrumbs = [
        { href: route("dashboard"), label: "Dashboard" },
        { label: "Situational Reports" },
    ];

    return (
        <SidebarProvider>
            <Toaster position="top-right" />
            <AppSidebar />
            <Head title="Situational Reports" />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center justify-between px-4 border-b">
                    <div className="flex items-center gap-2">
                        <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="h-6" />
                        <Breadcrumbs crumbs={breadcrumbs} />
                    </div>
                </header>

                <main className="w-full p-6">
                    {/* The form to add a new report */}
                    <SituationalReportForm />

                    {/* The table to display existing reports */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Existing Reports</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <SituationalReportTable
                                reports={reports.data}
                                onEdit={handleEdit}
                            />
                        </CardContent>
                        <CardFooter>
                            <Pagination links={reports.links} />
                        </CardFooter>
                    </Card>
                </main>
            </SidebarInset>

            {/* The modal for editing a report */}
            <SituationalReportEditModal
                report={editingReport}
                isOpen={!!editingReport}
                onClose={closeEditModal}
            />
        </SidebarProvider>
    );
}
