import * as React from "react";
import { usePage } from "@inertiajs/react";
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
import { MdOutlineHealthAndSafety } from "react-icons/md";

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
// The route function is now only used inside the component
import { route } from "ziggy-js";

// Data that is truly static can remain outside
const staticTeams = [
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
];

const staticProjects = [
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
];

export function AppSidebar({ ...props }) {
    const { auth } = usePage().props;

    // --- MODIFICATION: Define navigation data inside the component ---
    // This ensures `route()` is called only when the component renders.
    const navMain = [
        {
            title: "Situation Overview",
            url: "#",
            icon: MdOutlineHealthAndSafety,
            // This now dynamically checks if the current route starts with 'situational-reports'
            isActive: route().current("situational-reports.*"),
            items: [
                {
                    title: "Situation Reports",
                    // This is now safe to call here
                    url: route("situational-reports.index"),
                },
                {
                    title: "Add New Report",
                    url: "#", // Link to the same page
                },
                {
                    title: "Status of Lifeline",
                    url: "#", // Keep as placeholder
                },
            ],
        },
        {
            title: "Models",
            url: "#",
            icon: Bot,
            items: [
                { title: "Genesis", url: "#" },
                { title: "Explorer", url: "#" },
                { title: "Quantum", url: "#" },
            ],
        },
        {
            title: "Documentation",
            url: "#",
            icon: BookOpen,
            items: [
                { title: "Introduction", url: "#" },
                { title: "Get Started", url: "#" },
                { title: "Tutorials", url: "#" },
                { title: "Changelog", url: "#" },
            ],
        },
        {
            title: "Settings",
            url: "#",
            icon: Settings2,
            items: [
                { title: "General", url: "#" },
                { title: "Team", url: "#" },
                { title: "Billing", url: "#" },
                { title: "Limits", url: "#" },
            ],
        },
    ];

    const data = {
        teams: staticTeams,
        projects: staticProjects,
        navMain: navMain, // Use the navigation data defined above
        user: {
            name: auth.user.name,
            email: auth.user.email,
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
                <NavUser user={data.user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
