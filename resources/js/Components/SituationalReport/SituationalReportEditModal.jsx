import { useEffect } from "react";
import { useForm } from "@inertiajs/react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import InputError from "@/components/InputError";

export default function SituationalReportEditModal({
    report,
    isOpen,
    onClose,
}) {
    const { data, setData, put, processing, errors, reset } = useForm({
        typhoon_name: "",
        date: "",
        typhoon_category: "",
    });

    useEffect(() => {
        if (report) {
            setData({
                typhoon_name: report.typhoon_name,
                date: report.date,
                typhoon_category: report.typhoon_category,
            });
        }
    }, [report]);

    const submit = (e) => {
        e.preventDefault();
        put(route("situational-reports.update", report.id), {
            onSuccess: () => {
                onClose();
                reset();
            },
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <form onSubmit={submit}>
                    <DialogHeader>
                        <DialogTitle>Edit Situational Report</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="typhoon_name">Typhoon Name</Label>
                            <Input
                                id="typhoon_name"
                                value={data.typhoon_name}
                                onChange={(e) =>
                                    setData("typhoon_name", e.target.value)
                                }
                            />
                            <InputError message={errors.typhoon_name} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="date">Date</Label>
                            <Input
                                id="date"
                                type="date"
                                value={data.date}
                                onChange={(e) =>
                                    setData("date", e.target.value)
                                }
                            />
                            <InputError message={errors.date} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="typhoon_category">
                                Typhoon Category
                            </Label>
                            <Select
                                onValueChange={(value) =>
                                    setData("typhoon_category", value)
                                }
                                value={data.typhoon_category}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Tropical Depression">
                                        Tropical Depression
                                    </SelectItem>
                                    <SelectItem value="Tropical Storm">
                                        Tropical Storm
                                    </SelectItem>
                                    <SelectItem value="Typhoon">
                                        Typhoon
                                    </SelectItem>
                                    <SelectItem value="Super Typhoon">
                                        Super Typhoon
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <InputError message={errors.typhoon_category} />
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
                            className="bg-blue-700 hover:bg-blue-800"
                        >
                            {processing ? "Updating..." : "Update Report"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
