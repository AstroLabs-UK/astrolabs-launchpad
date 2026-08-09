import { createFileRoute } from "@tanstack/react-router";

// Step 1 of the Decap CMS GitHub OAuth flow: send the editor to GitHub.
export const Route = createFileRoute("/api/public/auth")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const clientId = process.env["GITHUB_OAUTH_CLIENT_ID"];
        if (!clientId) {
          return new Response("GITHUB_OAUTH_CLIENT_ID is not configured", { status: 500 });
        }

        const origin = new URL(request.url).origin;
        const authorizeUrl = new URL("https://github.com/login/oauth/authorize");
        authorizeUrl.searchParams.set("client_id", clientId);
        authorizeUrl.searchParams.set("scope", "repo,user");
        authorizeUrl.searchParams.set("redirect_uri", `${origin}/api/public/callback`);

        return Response.redirect(authorizeUrl.toString(), 302);
      },
    },
  },
});
