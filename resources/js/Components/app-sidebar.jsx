import * as React from "react";
import { usePage } from "@inertiajs/react"; // <-- 1. Import the usePage hook
import {
    AudioWaveform,
    BookOpen,
    Bot,
    Command,
    Frame,
    Map,
    PieChart,
    Settings2,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar";
import { route } from "ziggy-js";

import { MdOutlineHealthAndSafety } from "react-icons/md";

const staticData = {
    teams: [
        {
            name: "SitReps",
            logo: MdOutlineHealthAndSafety,
        },
        {
            name: "Acme Corp.",
            logo: AudioWaveform,
            plan: "Startup",
        },
        {
            name: "Evil Corp.",
            logo: Command,
            plan: "Free",
        },
    ],
    navMain: [
        {
            title: "Situation Overview",
            url: "#",
            icon: MdOutlineHealthAndSafety,
            isActive: true,
            items: [
                {
                    title: "Present weather",
                    url: route("weather.index"),
                },
                {
                    title: "Water Level Station",
                    url: "#",
                },
                {
                    title: "Status of Lifeline",
                    url: "#",
                },
            ],
        },
        {
            title: "Models",
            url: "#",
            icon: Bot,
            items: [
                {
                    title: "Genesis",
                    url: "#",
                },
                {
                    title: "Explorer",
                    url: "#",
                },
                {
                    title: "Quantum",
                    url: "#",
                },
            ],
        },
        {
            title: "Documentation",
            url: "#",
            icon: BookOpen,
            items: [
                {
                    title: "Introduction",
                    url: "#",
                },
                {
                    title: "Get Started",
                    url: "#",
                },
                {
                    title: "Tutorials",
                    url: "#",
                },
                {
                    title: "Changelog",
                    url: "#",
                },
            ],
        },
        {
            title: "Settings",
            url: "#",
            icon: Settings2,
            items: [
                {
                    title: "General",
                    url: "#",
                },
                {
                    title: "Team",
                    url: "#",
                },
                {
                    title: "Billing",
                    url: "#",
                },
                {
                    title: "Limits",
                    url: "#",
                },
            ],
        },
    ],
    projects: [
        {
            name: "Design Engineering",
            url: "#",
            icon: Frame,
        },
        {
            name: "Sales & Marketing",
            url: "#",
            icon: PieChart,
        },
        {
            name: "Travel",
            url: "#",
            icon: Map,
        },
    ],
};

export function AppSidebar({ ...props }) {
    // --- 3. Get authenticated user data from Inertia's props ---
    const { auth } = usePage().props;

    // --- 4. Construct the final data object, merging static and dynamic data ---
    const data = {
        ...staticData, // Use all the static data defined above
        user: {
            name: auth.user.name, // Get name dynamically
            email: auth.user.email, // Get email dynamically
            // Generate a dynamic avatar URL based on the user's name
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(
                auth.user.name
            )}&background=random&color=fff`,
        },
    };

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <TeamSwitcher teams={data.teams} />
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
                <NavProjects projects={data.projects} />
            </SidebarContent>
            <SidebarFooter>
                {/* The NavUser component now receives the dynamic user object */}
                <NavUser user={data.user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
