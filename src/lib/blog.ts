import { marked } from "marked";

export type BlogPost = {
  title: string;
  slug: string;
  date: string;
  author: string;
  category: string;
  tags: string[];
  description: string;
  image?: string;
  imageAlt?: string;
  draft: boolean;
  body: string;
};

const files = import.meta.glob("/content/blog/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

function stripQuotes(value: string): string {
  const v = value.trim();
  if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
    return v.slice(1, -1);
  }
  return v;
}

/** Minimal front matter parser: scalars, inline arrays and `- item` lists. */
function parseFrontMatter(raw: string): { data: Record<string, unknown>; body: string } {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(raw);
  if (!match) return { data: {}, body: raw };

  const data: Record<string, unknown> = {};
  const lines = match[1].split(/\r?\n/);
  let currentKey: string | null = null;

  for (const line of lines) {
    if (!line.trim()) continue;

    const listItem = /^\s*-\s+(.*)$/.exec(line);
    if (listItem && currentKey) {
      const list = (data[currentKey] as string[] | undefined) ?? [];
      list.push(stripQuotes(listItem[1]));
      data[currentKey] = list;
      continue;
    }

    const pair = /^([A-Za-z0-9_-]+):\s*(.*)$/.exec(line);
    if (!pair) continue;
    const [, key, rest] = pair;
    currentKey = key;

    if (rest === "") {
      data[key] = [];
    } else if (rest.startsWith("[") && rest.endsWith("]")) {
      data[key] = rest
        .slice(1, -1)
        .split(",")
        .map((part) => stripQuotes(part))
        .filter(Boolean);
    } else if (rest === "true" || rest === "false") {
      data[key] = rest === "true";
    } else {
      data[key] = stripQuotes(rest);
    }
  }

  return { data, body: match[2] };
}

function toPost(path: string, raw: string): BlogPost {
  const { data, body } = parseFrontMatter(raw);
  const fallbackSlug = path.split("/").pop()!.replace(/\.md$/, "");
  return {
    title: (data.title as string) ?? fallbackSlug,
    slug: (data.slug as string) ?? fallbackSlug,
    date: String(data.date ?? ""),
    author: (data.author as string) ?? "AstroLabs & Co.",
    category: (data.category as string) ?? "Web Design",
    tags: Array.isArray(data.tags) ? (data.tags as string[]) : [],
    description: (data.description as string) ?? "",
    image: (data.image as string) || undefined,
    imageAlt: (data.imageAlt as string) || undefined,
    draft: data.draft === true,
    body,
  };
}

const allPosts: BlogPost[] = Object.entries(files)
  .map(([path, raw]) => toPost(path, raw))
  .sort((a, b) => (a.date < b.date ? 1 : -1));

export function getPosts(): BlogPost[] {
  return allPosts.filter((p) => !p.draft);
}

export function getPost(slug: string): BlogPost | undefined {
  return getPosts().find((p) => p.slug === slug);
}

export function renderMarkdown(body: string): string {
  return marked.parse(body, { async: false }) as string;
}

export function formatDate(date: string): string {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return date;
  return parsed.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}
