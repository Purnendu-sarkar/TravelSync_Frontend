import { NavSection } from "@/types/dashboard.interface";
import { getDefaultDashboardRoute, UserRole } from "./auth-utils";

export const getCommonNavItems = (role: UserRole): NavSection[] => {
    const defaultDashboard = getDefaultDashboardRoute(role);

    return [
        {
            items: [
                {
                    title: "Dashboard",
                    href: defaultDashboard,
                    icon: "LayoutDashboard",
                    roles: ["TRAVELER", "ADMIN"],
                },
                {
                    title: "My Profile",
                    href: `/profile`,
                    icon: "User",
                    roles: ["TRAVELER", "ADMIN"],
                },
            ]
        },
        {
            title: "Settings",
            items: [
                {
                    title: "Change Password",
                    href: "/change-password",
                    icon: "Settings",
                    roles: ["TRAVELER"],
                },
            ],
        },
    ]
}

export const userNavItems: NavSection[] = [
    {
        title: "Travel Plans",
        items: [
            {
                title: "My Travel Plans",
                href: "/dashboard/my-travel-plans",
                icon: "MapPin",
                roles: ["TRAVELER"],
            },
            {
                title: "Add Travel Plan",
                href: "/travel-plans/add",
                icon: "Plus",
                roles: ["TRAVELER"],
            },
        ],
    },
    {
        title: "Explore & Match",
        items: [
            {
                title: "Explore Destinations",
                href: "/explore",
                icon: "Search",
                roles: ["TRAVELER"],
            },
            {
                title: "My Matches",
                href: "/dashboard/my-matches",
                icon: "Heart",
                roles: ["TRAVELER"],
            },
        ],
    },
    {
        title: "Reviews",
        items: [
            {
                title: "My Reviews",
                href: "/dashboard/my-reviews",
                icon: "Star",
                roles: ["TRAVELER"],
            },
        ],
    },
]

export const adminNavItems: NavSection[] = [
    {
        title: "User Management",
        items: [
            {
                title: "All Users",
                href: "/admin/dashboard/users-management",
                icon: "Users",
                roles: ["ADMIN"],
            },
        ],
    },
    {
        title: "Travel Plans Management",
        items: [
            {
                title: "All Travel Plans",
                href: "/admin/dashboard/travel-plans-management",
                icon: "Map",
                roles: ["ADMIN"],
            },
            {
                title: "Pending Matches",
                href: "/admin/dashboard/matches-management",
                icon: "Link",
                roles: ["ADMIN"],
            },
        ],
    },
    {
        title: "Reviews Management",
        items: [
            {
                title: "All Reviews",
                href: "/admin/dashboard/reviews-management",
                icon: "MessageCircle",
                roles: ["ADMIN"],
            },
        ],
    },
    {
        title: "Payments & Subscriptions",
        items: [
            {
                title: "Subscription Management",
                href: "/admin/dashboard/subscriptions-management",
                icon: "CreditCard",
                roles: ["ADMIN"],
            },
        ],
    }
]

export const getNavItemsByRole = (role: UserRole): NavSection[] => {
    const commonNavItems = getCommonNavItems(role);

    switch (role) {
        case "ADMIN":
            return [...commonNavItems, ...adminNavItems];
        case "TRAVELER":
            return [...commonNavItems, ...userNavItems];
        default:
            return [];
    }
}