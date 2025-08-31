import React, { useState, useEffect } from "react";
import { format, formatDistanceToNow } from "date-fns";

/**
 * A component that displays a formatted date and a self-updating relative time.
 * It takes a single `date` prop (a string or Date object).
 */
export default function DynamicTimestamp({ date }) {
    // 1. Initialize the state with the calculated relative time.
    const [timeAgo, setTimeAgo] = useState(() =>
        formatDistanceToNow(new Date(date), { addSuffix: true })
    );

    // 2. Use an effect that re-runs whenever the `date` prop changes.
    useEffect(() => {
        // Immediately update the time when a prop changes (e.g., after an edit).
        setTimeAgo(formatDistanceToNow(new Date(date), { addSuffix: true }));

        // Set up an interval to refresh the relative time every 30 seconds.
        const intervalId = setInterval(() => {
            setTimeAgo(
                formatDistanceToNow(new Date(date), { addSuffix: true })
            );
        }, 30000); // Refresh every 30 seconds

        // 3. Cleanup: clear the interval when the component is removed or the date changes.
        return () => clearInterval(intervalId);
    }, [date]); // This effect depends on the `date` prop.

    return (
        <div className="grid gap-0.5">
            <p className="font-medium text-foreground">
                {/* Always format the date from the `updated_at` timestamp */}
                {format(new Date(date), "MMM d, yyyy")}
            </p>
            <p className="text-xs text-muted-foreground">{timeAgo}</p>
        </div>
    );
}
