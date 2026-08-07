/**
 * Workerd-safe credential lookup for DropInBlog.
 *
 * On Cloudflare's workerd runtime there is no real `process.env` at module
 * scope: env is injected per request. Depending on how the worker is built the
 * values can live on `process.env` (nodejs_compat), on the `cloudflare:workers`
 * env binding, or on `globalThis`. We check all of them, at call time only.
 */
export type DropInBlogCredentials = {
  blogId: string;
  apiKey: string;
};

async function readEnvVar(key: string): Promise<string | undefined> {
  const fromProcess =
    typeof process !== "undefined" && process.env ? process.env[key] : undefined;
  if (fromProcess) return fromProcess;

  try {
    const specifier = "cloudflare:workers";
    const mod = (await import(/* @vite-ignore */ specifier)) as unknown as {
      env?: Record<string, string | undefined>;
    };
    const fromBinding = mod?.env?.[key];
    if (fromBinding) return fromBinding;
  } catch {
    // Not running on workerd - ignore.
  }

  const fromGlobal = (globalThis as unknown as Record<string, unknown>)[key];
  return typeof fromGlobal === "string" && fromGlobal ? fromGlobal : undefined;
}

export async function getDropInBlogCredentials(): Promise<DropInBlogCredentials> {
  const blogId = await readEnvVar("DROPINBLOG_BLOG_ID");
  const apiKey =
    (await readEnvVar("DROPINBLOG_API_KEY")) ??
    (await readEnvVar("DROPINBLOG_API_TOKEN"));

  if (!blogId || !apiKey) {
    throw new Error(
      `DropInBlog is not configured on this deployment (blogId: ${
        blogId ? "set" : "missing"
      }, apiKey: ${apiKey ? "set" : "missing"}). Publish the app after adding the secrets.`,
    );
  }

  return { blogId, apiKey };
}
