import { useEffect } from "react";
import { useForm } from "@inertiajs/react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import InputError from "@/components/InputError";

export default function WeatherReportModal({ report, isOpen, onClose }) {
    // 1. FORM STATE: Updated to match the WeatherReport model.
    const { data, setData, put, processing, errors, reset } = useForm({
        municipality: "",
        sky_condition: "",
        wind: "",
        precipitation: "",
        sea_condition: "",
    });

    // This effect populates the form whenever the 'report' prop changes.
    useEffect(() => {
        if (report) {
            // 2. CONTROLLED INPUT FIX: We use `|| ""` to ensure the value is
            // never null or undefined, which prevents React warnings.
            setData({
                municipality: report.municipality || "",
                sky_condition: report.sky_condition || "",
                wind: report.wind || "",
                precipitation: report.precipitation || "",
                sea_condition: report.sea_condition || "",
            });
        }
    }, [report]);

    const submit = (e) => {
        e.preventDefault();
        // The 'put' method sends the data to your controller's 'update' function.
        put(route("situational-reports.update", report.id), {
            onSuccess: () => {
                onClose(); // Close the modal on success
                reset(); // Reset the form for the next use
            },
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={submit}>
                    <DialogHeader>
                        <DialogTitle>Edit Weather Report</DialogTitle>
                        <DialogDescription>
                            Update the details for the report from{" "}
                            {report?.municipality}.
                        </DialogDescription>
                    </DialogHeader>

                    {/* 3. FORM FIELDS: UI completely updated for Weather Reports. */}
                    <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="municipality">Municipality</Label>
                            <Input
                                id="municipality"
                                value={data.municipality}
                                onChange={(e) =>
                                    setData("municipality", e.target.value)
                                }
                            />
                            <InputError message={errors.municipality} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="sky_condition">Sky Condition</Label>
                            <Input
                                id="sky_condition"
                                value={data.sky_condition}
                                onChange={(e) =>
                                    setData("sky_condition", e.target.value)
                                }
                            />
                            <InputError message={errors.sky_condition} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="wind">Wind</Label>
                            <Input
                                id="wind"
                                value={data.wind}
                                onChange={(e) =>
                                    setData("wind", e.target.value)
                                }
                            />
                            <InputError message={errors.wind} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="precipitation">Precipitation</Label>
                            <Input
                                id="precipitation"
                                value={data.precipitation}
                                onChange={(e) =>
                                    setData("precipitation", e.target.value)
                                }
                            />
                            <InputError message={errors.precipitation} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="sea_condition">Sea Condition</Label>
                            <Input
                                id="sea_condition"
                                value={data.sea_condition}
                                onChange={(e) =>
                                    setData("sea_condition", e.target.value)
                                }
                            />
                            <InputError message={errors.sea_condition} />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            disabled={processing}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={processing}
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                            {processing ? "Updating..." : "Update Report"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
