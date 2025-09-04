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
        post(route("situational-reports.store"), {
            onSuccess: () => reset(),
        });
    };

    return (
        <Card className="w-full max-w-5xl mx-auto shadow-lg">
            <form onSubmit={submit}>
                <CardHeader className="pb-4">
                    <CardTitle className="text-xl font-bold">
                        A. Present Weather Conditions
                    </CardTitle>
                    <CardDescription>
                        Enter the current weather details in an Excel-like grid.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    {/* Excel-like table layout */}
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-sm">
                            <thead>
                                <tr className="bg-gray-100 dark:bg-gray-800 text-left">
                                    <th className="border px-3 py-2">
                                        Municipality
                                    </th>
                                    <th className="border px-3 py-2">
                                        Sky Condition
                                    </th>
                                    <th className="border px-3 py-2">Wind</th>
                                    <th className="border px-3 py-2">
                                        Precipitation
                                    </th>
                                    <th className="border px-3 py-2">
                                        Sea Condition
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
                                    {/* Municipality */}
                                    <td className="border px-2 py-1">
                                        <Input
                                            value={data.municipality}
                                            onChange={(e) =>
                                                setData(
                                                    "municipality",
                                                    e.target.value
                                                )
                                            }
                                            className="h-9 focus:ring-2 focus:ring-blue-500"
                                            placeholder="e.g., San Jose"
                                        />
                                        <InputError
                                            message={errors.municipality}
                                            className="mt-1 text-xs"
                                        />
                                    </td>

                                    {/* Sky Condition */}
                                    <td className="border px-2 py-1">
                                        <Input
                                            value={data.sky_condition}
                                            onChange={(e) =>
                                                setData(
                                                    "sky_condition",
                                                    e.target.value
                                                )
                                            }
                                            className="h-9 focus:ring-2 focus:ring-blue-500"
                                            placeholder="e.g., Cloudy"
                                        />
                                        <InputError
                                            message={errors.sky_condition}
                                            className="mt-1 text-xs"
                                        />
                                    </td>

                                    {/* Wind */}
                                    <td className="border px-2 py-1">
                                        <Input
                                            value={data.wind}
                                            onChange={(e) =>
                                                setData("wind", e.target.value)
                                            }
                                            className="h-9 focus:ring-2 focus:ring-blue-500"
                                            placeholder="e.g., 15 kph NE"
                                        />
                                        <InputError
                                            message={errors.wind}
                                            className="mt-1 text-xs"
                                        />
                                    </td>

                                    {/* Precipitation */}
                                    <td className="border px-2 py-1">
                                        <Input
                                            value={data.precipitation}
                                            onChange={(e) =>
                                                setData(
                                                    "precipitation",
                                                    e.target.value
                                                )
                                            }
                                            className="h-9 focus:ring-2 focus:ring-blue-500"
                                            placeholder="e.g., Light Rains"
                                        />
                                        <InputError
                                            message={errors.precipitation}
                                            className="mt-1 text-xs"
                                        />
                                    </td>

                                    {/* Sea Condition */}
                                    <td className="border px-2 py-1">
                                        <Input
                                            value={data.sea_condition}
                                            onChange={(e) =>
                                                setData(
                                                    "sea_condition",
                                                    e.target.value
                                                )
                                            }
                                            className="h-9 focus:ring-2 focus:ring-blue-500"
                                            placeholder="e.g., Moderate"
                                        />
                                        <InputError
                                            message={errors.sea_condition}
                                            className="mt-1 text-xs"
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Info Note */}
                    <div className="mt-6 p-4 bg-blue-50 dark:bg-gray-800 border-l-4 border-blue-500 rounded-r-lg">
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                            <strong>Note:</strong> For non-coastal
                            municipalities, you may enter{" "}
                            <span className="font-medium">"N/A"</span> for Sea
                            Condition.
                        </p>
                    </div>
                </CardContent>

                <CardFooter className="flex justify-end pt-4">
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
