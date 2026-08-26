import { createFileRoute, Link } from "@tanstack/react-router";
import { BUSINESS_CONFIG } from "@/config/business";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: "BookYourService – Privacy Policy" },
      {
        name: "description",
        content:
          "The BookYourService privacy policy page. The official privacy policy document will be published here.",
      },
      { property: "og:title", content: "BookYourService – Privacy Policy" },
      {
        property: "og:description",
        content:
          "The BookYourService privacy policy page. The official privacy policy document will be published here.",
      },
      { property: "og:type", content: "article" },
      {
        property: "og:url",
        content: "https://bookmyservices.lovable.app/privacy-policy",
      },
      { name: "twitter:card", content: "summary" },
    ],
    links: [
      {
        rel: "canonical",
        href: "https://bookmyservices.lovable.app/privacy-policy",
      },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <main className="section-shell py-14">
      <article className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Privacy Policy
        </h1>
        <p className="my-4 text-[0.975rem] leading-7 text-foreground/90">
          The official BookYourService Privacy Policy document has not been published yet.
          This page is reserved for it and will display the policy in full once the
          document is supplied.
        </p>
        <p className="my-4 text-[0.975rem] leading-7 text-foreground/90">
          For privacy-related questions in the meantime, write to{" "}
          <a
            href="mailto:bookyourservicebys@gmail.com"
            className="text-primary underline underline-offset-4"
          >
            bookyourservicebys@gmail.com
          </a>
          {BUSINESS_CONFIG.whatsappNumber ? " or contact us on WhatsApp." : "."}
        </p>
        <p className="my-4 text-[0.975rem] leading-7 text-foreground/90">
          Read our{" "}
          <Link
            to="/terms-of-service"
            className="text-primary underline underline-offset-4"
          >
            Terms of Service
          </Link>
          .
        </p>
      </article>
    </main>
  );
}
