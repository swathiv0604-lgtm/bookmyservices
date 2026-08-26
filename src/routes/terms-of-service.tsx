import { createFileRoute } from "@tanstack/react-router";
import termsSource from "@/content/terms.md?raw";
import { LegalDocument } from "@/components/site/LegalDocument";

const [titleLine, ...rest] = termsSource.split("\n");
const documentTitle = titleLine.replace(/^#\s*/, "");
const documentBody = rest.join("\n");

export const Route = createFileRoute("/terms-of-service")({
  head: () => ({
    meta: [
      { title: "BookYourService – Terms of Service" },
      {
        name: "description",
        content:
          "Read the master terms and conditions governing the use of the BookYourService platform.",
      },
      { property: "og:title", content: "BookYourService – Terms of Service" },
      {
        property: "og:description",
        content:
          "Read the master terms and conditions governing the use of the BookYourService platform.",
      },
      { property: "og:type", content: "article" },
      {
        property: "og:url",
        content: "https://bookmyservices.lovable.app/terms-of-service",
      },
      { name: "twitter:card", content: "summary" },
    ],
    links: [
      {
        rel: "canonical",
        href: "https://bookmyservices.lovable.app/terms-of-service",
      },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <main className="section-shell py-14">
      <article className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {documentTitle}
        </h1>
        <LegalDocument source={documentBody} />
      </article>
    </main>
  );
}
