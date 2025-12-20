/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import {
  Send,
  Mail,
  Phone,
  Globe,
  Plane,
  Mountain,
  Camera,
  Coffee,
  Building2,
} from "lucide-react";
import { countryCodes } from "./countryCodes";

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [validationError, setValidationError] = useState("");

  const onSubmit = async (data: any) => {
    console.log("FORM DATA 👉", data);

    setIsSubmitting(true);
    setValidationError("");

    const sendResponse = await fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (sendResponse.ok) {
      setIsSuccess(true);
    } else {
      alert("Error: Problem sending email.");
    }

    setIsSubmitting(false);
  };

  const interests = [
    {
      id: "adventure",
      label: "Adventure",
      icon: <Mountain className="w-4 h-4" />,
    },
    {
      id: "cultural",
      label: "Cultural",
      icon: <Globe className="w-4 h-4" />,
    },
    {
      id: "beach",
      label: "Beach",
      icon: <Plane className="w-4 h-4" />,
    },
    {
      id: "city",
      label: "City Tours",
      icon: <Building2 className="w-4 h-4" />,
    },
    {
      id: "food",
      label: "Food & Drink",
      icon: <Coffee className="w-4 h-4" />,
    },
    {
      id: "photo",
      label: "Photography",
      icon: <Camera className="w-4 h-4" />,
    },
  ];

  return (
    <div className="lg:col-span-1">
      <Card className="p-8 md:p-10">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Send us a message
          </h2>
          <p className="text-gray-600">
            Fill out the form below and we ll get back to you as soon as
            possible.
          </p>
        </div>
        {isSuccess ? (
          <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Send className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Message Sent!
            </h3>
            <p className="text-gray-600 mb-6">
              Thank you for reaching out. We ll be in touch shortly.
            </p>
            <Button variant="outline" onClick={() => setIsSuccess(false)}>
              Send another message
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First name
                </label>
                <Input
                  placeholder="Jane"
                  {...register("firstName", {
                    required: "First name required.",
                  })}
                />

                {errors.firstName && (
                  <p className="text-red-600">
                    {errors.firstName.message as string}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last name
                </label>
                <Input
                  placeholder="Doe"
                  {...register("lastName", { required: "Last name required." })}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="email"
                  placeholder="jane@example.com"
                  className="pl-10"
                  {...register("email", {
                    required: "Email required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Please enter a valid email.",
                    },
                  })}
                />

                {errors.email && (
                  <p className="text-red-600 text-sm">
                    {errors.email.message as string}
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Country Code
                </label>
                <select
                  className="block w-full rounded-lg border px-3 py-2.5"
                  {...register("countryCode", { required: true })}
                >
                  {countryCodes.map((c, index) => (
                    <option key={`${c.code}-${index}`} value={c.code}>
                      {c.name} ({c.code})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    type="tel"
                    placeholder="(555) 000-0000"
                    className="pl-10"
                    {...register("phone", { required: true })}
                  />
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Travel Interests
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {interests.map((interest) => (
                  <label
                    key={interest.id}
                    className="flex items-center space-x-2 p-2 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors"
                  >
                    <input
                      type="checkbox"
                      value={interest.id}
                      {...register("interests")}
                    />

                    <span className="text-sm text-gray-700 flex items-center gap-1.5">
                      {interest.icon}
                      {interest.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <Textarea
                rows={4}
                placeholder="Tell us about your travel plans..."
                {...register("message", { required: "Write a message" })}
              />
            </div>
            {validationError && (
              <p className="text-red-600">{validationError}</p>
            )}
            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Sending...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Send Message <Send className="w-4 h-4" />
                </span>
              )}
            </Button>
          </form>
        )}
      </Card>
    </div>
  );
}
