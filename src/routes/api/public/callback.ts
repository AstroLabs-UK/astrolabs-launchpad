import { createFileRoute } from "@tanstack/react-router";

function postMessagePage(status: "success" | "error", payload: unknown) {
  const message = `authorization:github:${status}:${JSON.stringify(payload)}`;
  return new Response(
    `<!doctype html><html><body><script>
(function () {
  function send(e) {
    if (!window.opener) return;
    window.opener.postMessage(${JSON.stringify(message)}, e && e.origin ? e.origin : "*");
  }
  window.addEventListener("message", send, false);
  if (window.opener) window.opener.postMessage("authorizing:github", "*");
})();
</script><p>Completing sign in...</p></body></html>`,
    { status: 200, headers: { "content-type": "text/html; charset=utf-8" } },
  );
}

// Step 2 of the Decap CMS GitHub OAuth flow: exchange the code for a token.
export const Route = createFileRoute("/api/public/callback")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const clientId = process.env["GITHUB_OAUTH_CLIENT_ID"];
        const clientSecret = process.env["GITHUB_OAUTH_CLIENT_SECRET"];
        if (!clientId || !clientSecret) {
          return postMessagePage("error", { message: "GitHub OAuth is not configured" });
        }

        const code = new URL(request.url).searchParams.get("code");
        if (!code) {
          return postMessagePage("error", { message: "Missing authorization code" });
        }

        const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
          method: "POST",
          headers: { "content-type": "application/json", accept: "application/json" },
          body: JSON.stringify({ client_id: clientId, client_secret: clientSecret, code }),
        });

        if (!tokenRes.ok) {
          const detail = await tokenRes.text();
          console.error(`GitHub token exchange failed [${tokenRes.status}]: ${detail}`);
          return postMessagePage("error", { message: "GitHub token exchange failed" });
        }

        const data = (await tokenRes.json()) as { access_token?: string; error_description?: string };
        if (!data.access_token) {
          return postMessagePage("error", { message: data.error_description ?? "No access token returned" });
        }

        return postMessagePage("success", { token: data.access_token, provider: "github" });
      },
    },
  },
});
