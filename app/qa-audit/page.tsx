import Link from "next/link";

const pages = [
  "hero",
  "stats",
  "features",
  "about",
  "steps",
  "gallery",
  "testimonials",
  "team",
  "faq",
  "pricing",
  "cta",
  "contact",
  "header",
  "footer",
];

export default function QaIndexPage() {
  return (
    <main style={{ padding: 32, fontFamily: "monospace" }}>
      <h1>QA harness — временный стенд адаптивности</h1>
      <ul>
        {pages.map((p) => (
          <li key={p}>
            <Link href={`/_qa/${p}`}>{p}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
