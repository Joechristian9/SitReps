import { useForm } from "@inertiajs/react";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
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

export default function SituationalReportForm() {
    const { data, setData, post, processing, errors, reset } = useForm({
        typhoon_name: "",
        date: "",
        typhoon_category: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("situational-reports.store"), {
            onSuccess: () => reset(),
        });
    };

    return (
        <Card className="mb-6">
            <form onSubmit={submit}>
                <CardHeader>
                    <CardTitle>Add New Situational Report</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="typhoon_name">Typhoon Name</Label>
                        <Input
                            id="typhoon_name"
                            value={data.typhoon_name}
                            onChange={(e) =>
                                setData("typhoon_name", e.target.value)
                            }
                            placeholder="e.g., Karding"
                        />
                        <InputError message={errors.typhoon_name} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="date">Date</Label>
                        <Input
                            id="date"
                            type="date"
                            value={data.date}
                            onChange={(e) => setData("date", e.target.value)}
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
                                <SelectItem value="Typhoon">Typhoon</SelectItem>
                                <SelectItem value="Super Typhoon">
                                    Super Typhoon
                                </SelectItem>
                            </SelectContent>
                        </Select>
                        <InputError message={errors.typhoon_category} />
                    </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                    <Button
                        type="submit"
                        disabled={processing}
                        className="bg-blue-700 hover:bg-blue-800"
                    >
                        {processing ? "Saving..." : "Save Report"}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
}
