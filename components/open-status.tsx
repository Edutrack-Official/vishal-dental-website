"use client";

import { useClinicStatus } from "@/lib/hours";
import { cn } from "@/lib/utils";

/** "Open now · until 9 PM" pill, computed live in India time. */
export function OpenStatus({ className }: { className?: string }) {
  const status = useClinicStatus();
  return (
    <span className={cn("inline-flex items-center gap-2 text-sm font-semibold", className)}>
      <span className="relative flex h-2.5 w-2.5">
        {status?.open && <span className="absolute inset-0 animate-ping rounded-full bg-accent-2 opacity-70" />}
        <span className={cn("relative h-2.5 w-2.5 rounded-full", status ? (status.open ? "bg-accent-2" : "bg-coral") : "bg-fg/25")} />
      </span>
      <span className="min-w-[11ch]">{status ? status.label : "Mon–Sat clinic"}</span>
    </span>
  );
}
