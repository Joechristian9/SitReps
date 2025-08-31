// resources/js/components/WeatherFormModal.jsx
import { useForm } from "@inertiajs/react";
import { useEffect, useRef } from "react";

// --- SVG Icons ---
const SaveIcon = (props) => (
    <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
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
const LoaderIcon = (props) => (
    <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
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
const XIcon = (props) => (
    <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
);

// --- Input Component ---
const FormInput = ({ id, label, error, required, ...props }) => (
    <div className="space-y-1">
        <label
            htmlFor={id}
            className="block text-sm font-medium text-foreground/90"
        >
            {label} {required && <span className="text-destructive">*</span>}
        </label>
        <input
            id={id}
            className={`w-full rounded-xl border bg-background/70 px-3 py-2 text-sm shadow-sm 
        focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary 
        transition-all placeholder:text-muted-foreground
        ${
            error
                ? "border-destructive focus:ring-destructive"
                : "border-input/50"
        }`}
            required={required}
            {...props}
        />
        {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
);

export default function WeatherFormModal({ isOpen, onClose, report }) {
    const isEditing = !!report;
    const modalRef = useRef(null);
    const firstInputRef = useRef(null);
    const triggerElementRef = useRef(null);

    const { data, setData, post, put, reset, processing, errors, clearErrors } =
        useForm({
            municipality: "",
            sky_condition: "",
            wind: "",
            precipitation: "",
            sea_condition: "",
        });

    // Effect for handling modal open/close state and focus management
    useEffect(() => {
        if (isOpen) {
            triggerElementRef.current = document.activeElement; // Store focus
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
                reset(); // Reset form for new entries
            }
            // Set focus to the first input field
            setTimeout(() => firstInputRef.current?.focus(), 100);
        } else {
            // Return focus to the element that opened the modal
            triggerElementRef.current?.focus();
        }
    }, [isOpen, report]);

    // Effect for accessibility (Escape key)
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!isOpen) return;
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose]);

    // Handles form submission for both creating and updating
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

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
        >
            <div
                ref={modalRef}
                className="relative w-full max-w-lg rounded-2xl bg-card/80 p-6 shadow-xl ring-1 ring-border
                   animate-in zoom-in-95 slide-in-from-bottom-10 duration-200"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="mb-4 border-b border-border pb-3">
                    <h2 id="modal-title" className="text-lg font-semibold">
                        {isEditing
                            ? "Edit Weather Report"
                            : "Create Weather Report"}
                    </h2>
                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col" // Use flexbox to separate content and actions
                >
                    <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 mb-4">
                        <FormInput
                            id="municipality"
                            label="Municipality"
                            type="text"
                            value={data.municipality}
                            onChange={(e) =>
                                setData("municipality", e.target.value)
                            }
                            placeholder="e.g., San Francisco"
                            error={errors.municipality}
                            ref={firstInputRef}
                            required
                        />
                        <FormInput
                            id="sky_condition"
                            label="Sky Condition"
                            type="text"
                            value={data.sky_condition}
                            onChange={(e) =>
                                setData("sky_condition", e.target.value)
                            }
                            placeholder="e.g., Partly Cloudy"
                            error={errors.sky_condition}
                            required
                        />
                        <FormInput
                            id="wind"
                            label="Wind"
                            type="text"
                            value={data.wind}
                            onChange={(e) => setData("wind", e.target.value)}
                            placeholder="e.g., 15 mph NW"
                            error={errors.wind}
                            required
                        />
                        <FormInput
                            id="precipitation"
                            label="Precipitation"
                            type="text"
                            value={data.precipitation}
                            onChange={(e) =>
                                setData("precipitation", e.target.value)
                            }
                            placeholder="e.g., Light rain"
                            error={errors.precipitation}
                            required
                        />
                        <FormInput
                            id="sea_condition"
                            label="Sea Condition"
                            type="text"
                            value={data.sea_condition}
                            onChange={(e) =>
                                setData("sea_condition", e.target.value)
                            }
                            placeholder="e.g., Moderate waves"
                            error={errors.sea_condition}
                            required
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-2 border-t border-border pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-lg bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground hover:bg-secondary/80 transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition"
                        >
                            {processing ? (
                                <LoaderIcon className="h-4 w-4 animate-spin" />
                            ) : (
                                <SaveIcon className="h-4 w-4" />
                            )}
                            {processing
                                ? "Saving..."
                                : isEditing
                                ? "Save Changes"
                                : "Create Report"}
                        </button>
                    </div>
                </form>

                {/* Close button (top-right) */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition"
                >
                    <XIcon className="h-5 w-5" />
                    <span className="sr-only">Close</span>
                </button>
            </div>
        </div>
    );
}
