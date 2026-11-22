"use client";

import { useEffect, useState } from "react";

/** Clinic sessions in decimal hours (IST). Monday–Saturday; Sunday closed (VERIFY). */
export const sessions = [
  { from: 10.5, to: 14.5, label: "Morning" },
  { from: 17, to: 21, label: "Evening" },
] as const;
export const openDays = [1, 2, 3, 4, 5, 6];
export const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export function fmt(h: number) {
  const hr = Math.floor(h);
  const min = Math.round((h - hr) * 60);
  const suffix = hr >= 12 ? "PM" : "AM";
  const h12 = hr % 12 === 0 ? 12 : hr % 12;
  return `${h12}${min ? `:${String(min).padStart(2, "0")}` : ""} ${suffix}`;
}

/** Current day (0 = Sunday) and decimal hour in India, whatever the visitor's own time zone. */
export function nowInIndia() {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Kolkata",
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h23",
  }).formatToParts(new Date());
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "0";
  const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
  return { day, hour: Number(get("hour")) + Number(get("minute")) / 60 };
}

export type Status = { open: boolean; label: string; day: number; hour: number };

export function statusAt(day: number, hour: number): Status {
  if (openDays.includes(day)) {
    const current = sessions.find((s) => hour >= s.from && hour < s.to);
    if (current) return { open: true, label: `Open now · until ${fmt(current.to)}`, day, hour };
    const later = sessions.find((s) => hour < s.from);
    if (later) return { open: false, label: `Closed · opens ${fmt(later.from)}`, day, hour };
  }
  for (let i = 1; i <= 7; i++) {
    const d = (day + i) % 7;
    if (openDays.includes(d)) {
      const when = i === 1 ? "tomorrow" : dayNames[d];
      return { open: false, label: `Closed · opens ${when} ${fmt(sessions[0].from)}`, day, hour };
    }
  }
  return { open: false, label: "Closed", day, hour };
}

/** Live clinic status. `null` until mounted so server and client markup match. */
export function useClinicStatus() {
  const [status, setStatus] = useState<Status | null>(null);
  useEffect(() => {
    const tick = () => {
      const { day, hour } = nowInIndia();
      setStatus(statusAt(day, hour));
    };
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);
  return status;
}
