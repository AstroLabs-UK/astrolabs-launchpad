import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const ContactSchema = z.object({
  name: z.string().trim().min(1).max(200),
  business: z.string().trim().min(1).max(200),
  email: z.string().trim().email().max(320),
  message: z.string().trim().min(1).max(5000),
  plan: z.string().trim().max(50).optional().transform((v) => (!v || v.length === 0 ? "N/A" : v)),
});

export const Route = createFileRoute("/api/public/contact")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let payload: unknown;
        const contentType = request.headers.get("content-type") ?? "";
        try {
          if (contentType.includes("application/json")) {
            payload = await request.json();
          } else {
            const form = await request.formData();
            payload = Object.fromEntries(form.entries());
          }
        } catch {
          return new Response(JSON.stringify({ error: "Invalid body" }), {
            status: 400,
            headers: { "content-type": "application/json" },
          });
        }

        const parsed = ContactSchema.safeParse(payload);
        if (!parsed.success) {
          return new Response(
            JSON.stringify({ error: "Validation failed", issues: parsed.error.flatten() }),
            { status: 400, headers: { "content-type": "application/json" } },
          );
        }

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const { error } = await supabaseAdmin.from("contact_submissions").insert({
          ...parsed.data,
          user_agent: request.headers.get("user-agent")?.slice(0, 500) ?? null,
        });

        if (error) {
          console.error("[contact] insert failed", error);
          return new Response(JSON.stringify({ error: "Could not save submission" }), {
            status: 500,
            headers: { "content-type": "application/json" },
          });
        }

        return new Response(JSON.stringify({ ok: true }), {
          status: 200,
          headers: { "content-type": "application/json" },
        });
      },
    },
  },
});
