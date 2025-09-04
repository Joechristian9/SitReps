import { useForm } from "@inertiajs/react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import InputError from "@/components/InputError";

export default function PresentWeatherForm() {
    const { data, setData, post, processing, errors, reset } = useForm({
        municipality: "",
        sky_condition: "",
        wind: "",
        precipitation: "",
        sea_condition: "",
    });

    const submit = (e) => {
        e.preventDefault();
        // Make sure to use the correct route name for storing the report
        post(route("situational-reports.store"), {
            onSuccess: () => reset(),
        });
    };

    return (
        <Card className="w-full max-w-4xl mx-auto">
            <form onSubmit={submit}>
                <CardHeader>
                    <CardTitle>A. Present Weather Conditions</CardTitle>
                    <CardDescription>
                        Enter the current weather details for the reporting
                        municipality.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                    {/* Main grid for form layout */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Municipality Input */}
                        <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="municipality">Municipality</Label>
                            <Input
                                id="municipality"
                                value={data.municipality}
                                onChange={(e) =>
                                    setData("municipality", e.target.value)
                                }
                                placeholder="e.g., San Jose"
                            />
                            <InputError message={errors.municipality} />
                        </div>

                        {/* Sky Condition Input */}
                        <div className="space-y-2">
                            <Label htmlFor="sky_condition">Sky Condition</Label>
                            <Input
                                id="sky_condition"
                                value={data.sky_condition}
                                onChange={(e) =>
                                    setData("sky_condition", e.target.value)
                                }
                                placeholder="e.g., Cloudy"
                            />
                            <InputError message={errors.sky_condition} />
                        </div>

                        {/* Wind Input */}
                        <div className="space-y-2">
                            <Label htmlFor="wind">Wind</Label>
                            <Input
                                id="wind"
                                value={data.wind}
                                onChange={(e) =>
                                    setData("wind", e.target.value)
                                }
                                placeholder="e.g., 15 kph NE"
                            />
                            <InputError message={errors.wind} />
                        </div>

                        {/* Precipitation Input */}
                        <div className="space-y-2">
                            <Label htmlFor="precipitation">Precipitation</Label>
                            <Input
                                id="precipitation"
                                value={data.precipitation}
                                onChange={(e) =>
                                    setData("precipitation", e.target.value)
                                }
                                placeholder="e.g., Light Rains"
                            />
                            <InputError message={errors.precipitation} />
                        </div>

                        {/* Sea Condition Input */}
                        <div className="space-y-2">
                            <Label htmlFor="sea_condition">Sea Condition</Label>
                            <Input
                                id="sea_condition"
                                value={data.sea_condition}
                                onChange={(e) =>
                                    setData("sea_condition", e.target.value)
                                }
                                placeholder="e.g., Moderate"
                            />
                            <InputError message={errors.sea_condition} />
                        </div>
                    </div>

                    {/* Informational Note */}
                    <div className="!mt-8 p-4 bg-gray-50 dark:bg-gray-800 border-l-4 border-blue-500 rounded-r-lg">
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                            <strong>Note:</strong> For non-coastal
                            municipalities, you may enter "N/A" for the Sea
                            Condition. Always refer to official PAGASA
                            guidelines for accurate reporting.
                        </p>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                    <Button
                        type="submit"
                        disabled={processing}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                        {processing ? "Saving..." : "Save Weather Report"}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
}
