"use client";

import { useState, useEffect } from "react";
import { API_BASE_URL } from "@/lib/constants";

const VAPID_PUBLIC_KEY =
  "BKjm-ZsvUUWOqKmFsu7xBrutyrm0JRK7FEBfQvU48u_yum5AjZ2USjcLAK8_zWOmUmixXEDH5XblFC33VXqVCjs";

function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; i++) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

type PushState = "idle" | "subscribing" | "subscribed" | "denied" | "unsupported";

interface PushAlertBannerProps {
  compact?: boolean;
}

export function PushAlertBanner({ compact = false }: PushAlertBannerProps) {
  const [state, setState] = useState<PushState>("idle");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Check if push is supported
    if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
      setState("unsupported");
      return;
    }

    // Check if already subscribed
    const stored = localStorage.getItem("dramaradar-push");
    if (stored === "subscribed") {
      // Verify the subscription still exists
      navigator.serviceWorker.ready.then((reg) => {
        reg.pushManager.getSubscription().then((sub) => {
          setState(sub ? "subscribed" : "idle");
          if (!sub) localStorage.removeItem("dramaradar-push");
        });
      });
      return;
    }

    // Check if permission was denied
    if (Notification.permission === "denied") {
      setState("denied");
    }
  }, []);

  async function subscribe() {
    setState("subscribing");

    try {
      // Register service worker
      const registration = await navigator.serviceWorker.register("/sw.js");
      await navigator.serviceWorker.ready;

      // Request push subscription
      const applicationServerKey = urlBase64ToUint8Array(VAPID_PUBLIC_KEY);
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: applicationServerKey.buffer as ArrayBuffer,
      });

      // Send subscription to server
      const res = await fetch(`${API_BASE_URL}/push/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(subscription.toJSON()),
      });

      if (res.ok) {
        setState("subscribed");
        localStorage.setItem("dramaradar-push", "subscribed");
      } else {
        setState("idle");
      }
    } catch (err) {
      console.error("Push subscription failed:", err);
      if (Notification.permission === "denied") {
        setState("denied");
      } else {
        setState("idle");
      }
    }
  }

  if (!mounted || state === "unsupported") return null;

  if (state === "subscribed") {
    return (
      <div className={`rounded-xl border border-dr-pink/30 bg-dr-surface ${compact ? "p-3" : "p-4"}`}>
        <div className="flex items-center gap-2 text-sm font-semibold text-dr-pink">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          Alerts are on
        </div>
        <p className="mt-1 text-[11px] text-dr-text-muted">
          You will get a notification when major drama breaks.
        </p>
      </div>
    );
  }

  if (state === "denied") {
    return (
      <div className={`rounded-xl border border-dr-border bg-dr-surface ${compact ? "p-3" : "p-4"}`}>
        <p className="text-xs text-dr-text-dim">
          Notifications blocked. Enable them in your browser settings to get breaking drama alerts.
        </p>
      </div>
    );
  }

  return (
    <div className={`rounded-xl border border-dr-border bg-dr-surface ${compact ? "p-3" : "p-4"}`}>
      <h3 className={`font-bold text-dr-text ${compact ? "mb-1 text-sm" : "mb-2 text-base"}`}>
        Never Miss the Tea
      </h3>
      <p className={`text-dr-text-muted ${compact ? "mb-2 text-[11px]" : "mb-3 text-xs"}`}>
        Get breaking drama alerts on your phone. Free. Instant. No spam.
      </p>
      <button
        type="button"
        onClick={subscribe}
        disabled={state === "subscribing"}
        className="w-full rounded-lg bg-gradient-to-r from-dr-pink to-dr-purple px-4 py-2.5 text-xs font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {state === "subscribing" ? "Setting up..." : "Turn On Alerts"}
      </button>
    </div>
  );
}
