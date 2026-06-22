"use client";

// TEMPORARY: Sentry verification page. Delete after confirming events land
// in the golden-life-wellness-inc / javascript-nextjs Sentry project.
import * as Sentry from "@sentry/nextjs";
import { useState } from "react";

export default function SentryTestPage() {
  const [sent, setSent] = useState(false);

  return (
    <main style={{ padding: 48, fontFamily: "system-ui" }}>
      <h1>Sentry test</h1>
      <p>
        Click to send a captured exception. It tunnels through <code>/monitoring</code> (watch the
        Network tab).
      </p>
      <button
        style={{ padding: "12px 20px", fontSize: 16, cursor: "pointer" }}
        onClick={() => {
          const err = new Error("Conscious Pregnancy Sentry verification " + Date.now());
          Sentry.captureException(err);
          setSent(true);
        }}
      >
        Send captured exception
      </button>
      <button
        style={{ padding: "12px 20px", fontSize: 16, cursor: "pointer", marginLeft: 12 }}
        onClick={() => {
          throw new Error("Conscious Pregnancy uncaught throw " + Date.now());
        }}
      >
        Throw uncaught error
      </button>
      {sent && <p>Sent. Check Sentry Issues.</p>}
    </main>
  );
}
