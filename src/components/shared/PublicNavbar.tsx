"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X, User, LogIn, Bell, Search, ShieldCheck } from "lucide-react";

type UserRole = "TRAVELER" | "ADMIN";

type CurrentUser = {
  id: string;
  name: string;
  email?: string;
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

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/explore", label: "Explore" },
    { href: "/travel-plans", label: "Travel Plans" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  // try to fetch current user from a simple endpoint if initialUser not provided
  useEffect(() => {
    if (initialUser !== undefined) return;

    let mounted = true;

    (async () => {
      try {
        const res = await fetch("/api/auth/me");

        if (!mounted) return;

        if (!res.ok) {
          setUser(null);
          return;
        }

        const data = await res.json();

        if (!mounted) return;

        setUser({
          id: data.id,
          name: data.name || data.email || "Traveler",
          email: data.email,
          profilePhoto: data.profilePhoto,
          role: data.role || "TRAVELER",
        });
      } catch (error) {
        console.log(error);
        if (mounted) setUser(null);
      } finally {
        if (mounted) setLoadingUser(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [initialUser]);

  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    const q = query.trim();
    if (onSearch) onSearch(q);
    if (q) router.push(`/explore?search=${encodeURIComponent(q)}`);
  };

  const isActive = (href: string) => pathname === href;

  return (
    <header className="sticky top-0 z-50 border-b bg-background/70 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-2xl font-bold text-primary">
            Travel<span className="text-foreground">Buddy</span>
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

            {/* role-aware extra link */}
            {user?.role === "ADMIN" && (
              <Link
                href="/admin"
                className={`text-sm font-medium transition-colors ${
                  isActive("/admin")
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Admin
              </Link>
            )}
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

          {/* Auth buttons / profile */}
          {loadingUser ? (
            <div className="h-8 w-24 animate-pulse rounded-lg bg-muted/30" />
          ) : user ? (
            <div className="flex items-center gap-2">
              <Link href="/dashboard" className="text-sm font-medium">
                Dashboard
              </Link>

              <Link
                href="/profile/${user?.id}"
                className="rounded-full bg-muted px-3 py-1 text-sm"
              >
                <div className="flex items-center gap-2">
                  <User size={16} />
                  <span className="hidden sm:inline">{user.name}</span>
                </div>
              </Link>
            </div>
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

            {user?.role === "ADMIN" && (
              <Link href="/admin" onClick={() => setIsOpen(false)}>
                Admin Dashboard
              </Link>
            )}

            <div className="pt-2">
              {user ? (
                <div className="flex items-center gap-2">
                  <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                    Dashboard
                  </Link>
                  <Link
                    href="/profile/${user?.id}"
                    onClick={() => setIsOpen(false)}
                  >
                    Profile
                  </Link>
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
