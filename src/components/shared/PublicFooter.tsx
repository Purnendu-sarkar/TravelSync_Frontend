"use client";

import Link from "next/link";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  MapPin,
} from "lucide-react";
import { Button } from "../ui/button";

export default function PublicFooter() {
  return (
    <footer className="bg-background border-t mt-20">
      <div className="container mx-auto px-4 py-12 grid gap-10 md:grid-cols-4">
        {/* ✅ Brand Info */}
        <div>
          <Link href="/" className="text-2xl font-bold text-primary">
            Travel<span className="text-foreground">Sync</span>
          </Link>
          <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
            Travel Sync & Meetup is a social-travel platform that helps you find
            travel partners, create plans, and explore the world together.
          </p>

          <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin size={16} />
            <span>Dhaka, Bangladesh</span>
          </div>

          <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
            <Mail size={16} />
            <span>support@travelbuddy.com</span>
          </div>
        </div>

        {/* ✅ Quick Links */}
        <div>
          <h4 className="text-base font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link href="/" className="hover:text-primary">
                Home
              </Link>
            </li>
            <li>
              <Link href="/explore" className="hover:text-primary">
                Explore
              </Link>
            </li>
            <li>
              <Link href="/travel-plans" className="hover:text-primary">
                Travel Plans
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-primary">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-primary">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* ✅ User Area */}
        <div>
          <h4 className="text-base font-semibold mb-4">User Area</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link href="/login" className="hover:text-primary">
                Login
              </Link>
            </li>
            <li>
              <Link href="/register" className="hover:text-primary">
                Register
              </Link>
            </li>
            <li>
              <Link href="/dashboard" className="hover:text-primary">
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/profile/me" className="hover:text-primary">
                My Profile
              </Link>
            </li>
            <li>
              <Link href="/travel-plans/add" className="hover:text-primary">
                Add Travel Plan
              </Link>
            </li>
          </ul>
        </div>

        {/* ✅ Social & Subscription */}
        <div>
          <h4 className="text-base font-semibold mb-4">Connect With Us</h4>

          <div className="flex items-center gap-4 mb-6">
            <a href="#" className="hover:text-primary">
              <Facebook size={20} />
            </a>
            <a href="#" className="hover:text-primary">
              <Instagram size={20} />
            </a>
            <a href="#" className="hover:text-primary">
              <Twitter size={20} />
            </a>
            <a href="#" className="hover:text-primary">
              <Youtube size={20} />
            </a>
          </div>

          <p className="text-sm text-muted-foreground mb-2">
            Subscribe for travel updates
          </p>

          <form className="flex items-center border rounded-lg overflow-hidden">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-3 py-2 text-sm outline-none bg-transparent"
            />
            <Button
              type="submit"
              className="px-4 py-2 text-sm bg-primary hover:bg-primary/90 rounded-none"
            >
              Subscribe
            </Button>
          </form>
        </div>
      </div>

      {/* ✅ Bottom Bar */}
      <div className="border-t py-4 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Travel Sync. All Rights Reserved.
      </div>
    </footer>
  );
}
