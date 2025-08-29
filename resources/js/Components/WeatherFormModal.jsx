// resources/js/components/WeatherFormModal.jsx

import { useForm } from "@inertiajs/react";
import { useEffect } from "react";

// --- SVG Icons (replaces lucide-react) ---
const SaveIcon = ({ className }) => (
    <svg
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
        <polyline points="17 21 17 13 7 13 7 21" />
        <polyline points="7 3 7 8 15 8" />
    </svg>
);

const LoaderIcon = ({ className }) => (
    <svg
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
);

export default function WeatherFormModal({ isOpen, onClose, report }) {
    const isEditing = !!report;

    const { data, setData, post, put, reset, processing, errors, clearErrors } =
        useForm({
            municipality: "",
            sky_condition: "",
            wind: "",
            precipitation: "",
            sea_condition: "",
        });

    useEffect(() => {
        if (isOpen) {
            clearErrors();
            if (isEditing) {
                setData({
                    municipality: report.municipality || "",
                    sky_condition: report.sky_condition || "",
                    wind: report.wind || "",
                    precipitation: report.precipitation || "",
                    sea_condition: report.sea_condition || "",
                });
            } else {
                reset();
            }
        }
    }, [isOpen, report]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const options = {
            onSuccess: () => {
                reset();
                onClose();
            },
            preserveState: true,
        };

        if (isEditing) {
            put(route("weather.update", report.id), options);
        } else {
            post(route("weather.store"), options);
        }
    };

    // Return null if the modal is not open
    if (!isOpen) {
        return null;
    }

    return (
        // Modal Overlay
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
            onClick={onClose} // Close modal on overlay click
        >
            {/* Modal Panel */}
            <div
                className="bg-black/20 backdrop-blur-lg border border-white/20 shadow-2xl text-white sm:max-w-md w-full rounded-lg p-6 relative"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the panel
            >
                {/* Header */}
                <div className="flex flex-col space-y-1.5 text-left mb-6">
                    <h2 className="text-2xl font-bold text-white">
                        {isEditing ? "Edit Report" : "Add New Report"}
                    </h2>
                    <p className="text-sm text-slate-400">
                        {isEditing
                            ? "Make changes to the weather report below."
                            : "Provide the details for the new report."}
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Municipality Field */}
                    <div className="space-y-2">
                        <label
                            htmlFor="municipality"
                            className="text-sm text-slate-300 font-medium"
                        >
                            Municipality
                        </label>
                        <input
                            id="municipality"
                            type="text"
                            value={data.municipality}
                            onChange={(e) =>
                                setData("municipality", e.target.value)
                            }
                            className="w-full h-10 px-3 py-2 bg-black/40 border border-slate-600 rounded-md placeholder:text-slate-400 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                            placeholder="Enter municipality..."
                        />
                        {errors.municipality && (
                            <p className="text-sm text-red-400 mt-1">
                                {errors.municipality}
                            </p>
                        )}
                    </div>

                    {/* Sky Condition Field */}
                    <div className="space-y-2">
                        <label
                            htmlFor="sky_condition"
                            className="text-sm text-slate-300 font-medium"
                        >
                            Sky Condition
                        </label>
                        <input
                            id="sky_condition"
                            type="text"
                            value={data.sky_condition}
                            onChange={(e) =>
                                setData("sky_condition", e.target.value)
                            }
                            className="w-full h-10 px-3 py-2 bg-black/40 border border-slate-600 rounded-md placeholder:text-slate-400 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                            placeholder="Enter sky condition..."
                        />
                        {errors.sky_condition && (
                            <p className="text-sm text-red-400 mt-1">
                                {errors.sky_condition}
                            </p>
                        )}
                    </div>

                    {/* ... other fields follow the same pattern ... */}
                    <div className="space-y-2">
                        <label
                            htmlFor="wind"
                            className="text-sm text-slate-300 font-medium"
                        >
                            Wind
                        </label>
                        <input
                            id="wind"
                            type="text"
                            value={data.wind}
                            onChange={(e) => setData("wind", e.target.value)}
                            className="w-full h-10 px-3 py-2 bg-black/40 border border-slate-600 rounded-md placeholder:text-slate-400 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                            placeholder="Enter wind..."
                        />
                        {errors.wind && (
                            <p className="text-sm text-red-400 mt-1">
                                {errors.wind}
                            </p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <label
                            htmlFor="precipitation"
                            className="text-sm text-slate-300 font-medium"
                        >
                            Precipitation
                        </label>
                        <input
                            id="precipitation"
                            type="text"
                            value={data.precipitation}
                            onChange={(e) =>
                                setData("precipitation", e.target.value)
                            }
                            className="w-full h-10 px-3 py-2 bg-black/40 border border-slate-600 rounded-md placeholder:text-slate-400 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                            placeholder="Enter precipitation..."
                        />
                        {errors.precipitation && (
                            <p className="text-sm text-red-400 mt-1">
                                {errors.precipitation}
                            </p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <label
                            htmlFor="sea_condition"
                            className="text-sm text-slate-300 font-medium"
                        >
                            Sea Condition
                        </label>
                        <input
                            id="sea_condition"
                            type="text"
                            value={data.sea_condition}
                            onChange={(e) =>
                                setData("sea_condition", e.target.value)
                            }
                            className="w-full h-10 px-3 py-2 bg-black/40 border border-slate-600 rounded-md placeholder:text-slate-400 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                            placeholder="Enter sea condition..."
                        />
                        {errors.sea_condition && (
                            <p className="text-sm text-red-400 mt-1">
                                {errors.sea_condition}
                            </p>
                        )}
                    </div>
                </form>

                {/* Footer with Buttons */}
                <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-6">
                    <button
                        type="button"
                        onClick={onClose}
                        className="inline-flex items-center justify-center h-10 px-4 py-2 text-sm font-medium rounded-md text-white bg-white/10 hover:bg-white/20 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="button" // Use type="button" and trigger submit via form's onSubmit
                        onClick={handleSubmit}
                        disabled={processing}
                        className="inline-flex items-center justify-center h-10 px-4 py-2 text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:pointer-events-none"
                    >
                        {processing ? (
                            <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            <SaveIcon className="mr-2 h-4 w-4" />
                        )}
                        <span>{processing ? "Saving..." : "Save Changes"}</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
