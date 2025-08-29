// resources/js/components/DeleteConfirmationDialog.jsx

import { useForm } from "@inertiajs/react";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button"; // <-- Import Button for styling
import { AlertTriangle, Loader2 } from "lucide-react"; // <-- Import icons for better UX

export default function DeleteConfirmationDialog({ isOpen, onClose, report }) {
    const { delete: destroy, processing } = useForm();

    const handleDelete = () => {
        if (!report) return;
        destroy(route("weather.destroy", report.id), {
            // Preserve scroll position to avoid jarring page jump
            preserveScroll: true,
            onSuccess: () => onClose(),
        });
    };

    return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    {/* --- ENHANCEMENT: Icon for Visual Warning --- */}
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                        <AlertTriangle
                            className="h-6 w-6 text-red-600"
                            aria-hidden="true"
                        />
                    </div>

                    <div className="mt-3 text-center sm:mt-5">
                        <AlertDialogTitle>
                            Delete Weather Report?
                        </AlertDialogTitle>
                        <AlertDialogDescription className="mt-2">
                            This action cannot be undone. This will permanently
                            delete the weather report for{" "}
                            <span className="font-semibold text-slate-800">
                                {report?.municipality}
                            </span>
                            .
                        </AlertDialogDescription>
                    </div>
                </AlertDialogHeader>
                <AlertDialogFooter className="mt-5 sm:mt-6">
                    <AlertDialogCancel asChild>
                        {/* Using asChild to allow custom styling if needed */}
                        <Button variant="outline">Cancel</Button>
                    </AlertDialogCancel>
                    {/* --- ENHANCEMENT: Destructive Action Button --- */}
                    <Button
                        variant="destructive" // Use the red "destructive" style
                        onClick={handleDelete}
                        disabled={processing}
                    >
                        {/* --- ENHANCEMENT: Loading Indicator --- */}
                        {processing ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : null}
                        <span>{processing ? "Deleting..." : "Delete"}</span>
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
