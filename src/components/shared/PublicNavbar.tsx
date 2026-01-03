"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X, LogIn, Bell, Search, ShieldCheck, User } from "lucide-react";

import { getUserInfo } from "@/services/auth/getUserInfo";
import { logoutUser } from "@/services/auth/logoutUser";
import UserDropdown from "../modules/Dashboard/UserDropdown";

type UserRole = "TRAVELER" | "ADMIN";

type CurrentUser = {
  id: string;
  name: string;
  email: string;
  profilePhoto?: string;
  role: UserRole;
};

export default function PublicNavbar({
  initialUser,
  onSearch,
}: {
  /** optional pre-fetched user (server) to avoid client fetch */
  initialUser?: CurrentUser | null;
  /** called when the search form is submitted */
  onSearch?: (q: string) => void;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [user, setUser] = useState<CurrentUser | null | undefined>(
    initialUser ?? undefined
  );
  const [loadingUser, setLoadingUser] = useState<boolean>(!initialUser);

  const getNavItems = () => {
    if (loadingUser) return [];
    if (!user) {
      return [
        { href: "/", label: "Home" },
        { href: "/explore", label: "Explore Travel" },
        { href: "/subscription", label: "Subscription" },
        { href: "/contact", label: "Contact" },
      ];
    } else if (user.role === "ADMIN") {
      return [
        { href: "/", label: "Home" },
        { href: "/explore", label: "Explore Travel" },
        { href: "/admin/dashboard", label: "Admin Dashboard" },
        {
          href: "/admin/dashboard/travelers-management",
          label: "Manage Users",
        },
        {
          href: "/admin/dashboard/travel-plans-management",
          label: "Manage Travel Plans",
        },
        { href: "/subscription", label: "Subscription" },
        { href: "/contact", label: "Contact" },
      ];
    } else {
      return [
        { href: "/", label: "Home" },
        { href: "/explore", label: "Explore Travel" },
        { href: "/subscription", label: "Subscription" },
        { href: "/dashboard", label: "Dashboard" },
        { href: "/contact", label: "Contact" },
      ];
    }
  };

  const navItems = getNavItems();

  // Fetch current user using getUserInfo if initialUser not provided
  useEffect(() => {
    if (initialUser !== undefined) return;

    const fetchUser = async () => {
      setLoadingUser(true);
      try {
        const data = await getUserInfo();
        if (data.id === "") {
          setUser(null);
        } else {
          setUser({
            id: data.id,
            name: data.name || data.email || "Traveler",
            email: data.email,
            profilePhoto: data.profilePhoto,
            role: data.role || "TRAVELER",
          });
        }
      } catch (error) {
        console.log(error);
        setUser(null);
      } finally {
        setLoadingUser(false);
      }
    };

    fetchUser();
  }, [initialUser]);

  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    const q = query.trim();
    if (onSearch) onSearch(q);
    if (q) router.push(`/explore?search=${encodeURIComponent(q)}`);
  };

  const handleLogout = async () => {
    await logoutUser();
    setUser(null);
    router.push("/login");
    router.refresh();
  };

  const isActive = (href: string) => pathname === href;

  return (
    <header className="sticky top-0 z-50 border-b bg-background/70 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-2xl font-bold text-primary">
            Travel<span className="text-foreground">Sync</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`text-sm font-medium transition-colors ${
                  isActive(href)
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        {/* center: search (desktop) */}
        <form
          onSubmit={handleSearch}
          className="hidden md:flex items-center gap-2 flex-1 max-w-lg px-4"
        >
          <label htmlFor="nav-search" className="sr-only">
            Search destinations
          </label>
          <div className="relative flex w-full items-center rounded-lg border px-3 py-2">
            <Search size={16} />
            <input
              id="nav-search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search destination, interest..."
              className="ml-2 w-full bg-transparent outline-none text-sm"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="ml-2 text-sm opacity-70"
              >
                ×
              </button>
            )}
          </div>
        </form>

        {/* right : auth / profile */}
        <div className="hidden md:flex items-center gap-3">
          {loadingUser ? (
            <div className="h-8 w-24 animate-pulse rounded-lg bg-muted/30" />
          ) : user ? (
            <>
              {/* notification */}
              <button
                aria-label="Notifications"
                className="rounded-full p-2 hover:bg-muted/30 focus:outline-none"
              >
                <Bell size={18} />
              </button>

              {/* Verified badge for subscribers (example) */}
              {user?.role === "TRAVELER" && (
                <div
                  title="Verified subscriber"
                  className="hidden sm:flex items-center gap-1 rounded-full px-2 py-1 text-xs border"
                >
                  <ShieldCheck size={14} />
                  <span>Pro</span>
                </div>
              )}

              {/* <Link href="/dashboard" className="text-sm font-medium">
                Dashboard
              </Link> */}

              <UserDropdown userInfo={user} />
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Button asChild variant="ghost" size="sm">
                <Link href="/login" className="flex items-center gap-2">
                  <LogIn size={16} />
                  <span>Login</span>
                </Link>
              </Button>
              <Button asChild size="sm" className="rounded-full">
                <Link href="/register" className="flex items-center gap-2">
                  <User size={16} />
                  <span>Sign Up</span>
                </Link>
              </Button>
            </div>
          )}
        </div>

        {/* mobile menu button */}
        <button
          onClick={() => setIsOpen((s) => !s)}
          className="md:hidden text-foreground focus:outline-none"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* mobile drawer */}
      {isOpen && (
        <div className="md:hidden border-t bg-background">
          <nav className="flex flex-col space-y-3 px-4 py-4 text-sm">
            <form onSubmit={handleSearch} className="flex items-center gap-2">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search destinations"
                className="flex-1 rounded border px-3 py-2 text-sm outline-none"
              />
              <Button type="submit" size="sm">
                Search
              </Button>
            </form>

            {navItems.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setIsOpen(false)}
                className={`transition-colors ${
                  isActive(href)
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {label}
              </Link>
            ))}

            <div className="pt-4 border-t">
              {user ? (
                <div className="flex flex-col space-y-2">
                  <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                    Dashboard
                  </Link>
                  <Link
                    href={`/profile/${user.id}`}
                    onClick={() => setIsOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={async () => {
                      await handleLogout();
                      setIsOpen(false);
                    }}
                    className="text-left text-sm text-red-600 hover:text-red-800"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Button asChild variant="outline" className="flex-1">
                    <Link href="/login" onClick={() => setIsOpen(false)}>
                      Login
                    </Link>
                  </Button>
                  <Button asChild className="flex-1 rounded-full">
                    <Link href="/register" onClick={() => setIsOpen(false)}>
                      Sign Up
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
