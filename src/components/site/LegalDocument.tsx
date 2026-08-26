import type { ReactNode } from "react";

/**
 * Minimal, faithful markdown renderer for legal documents.
 * It only changes presentation — never the wording, ordering or punctuation.
 */

function renderInline(text: string, keyBase: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const pattern =
    /(\*\*[^*]+\*\*)|(\[[^\]]+\]\([^)]+\))|(<sup>[^<]*<\/sup>)/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let i = 0;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > last) nodes.push(text.slice(last, match.index));
    const token = match[0];
    if (token.startsWith("**")) {
      nodes.push(
        <strong key={`${keyBase}-b${i}`} className="font-semibold">
          {token.slice(2, -2)}
        </strong>,
      );
    } else if (token.startsWith("<sup>")) {
      nodes.push(
        <sup key={`${keyBase}-s${i}`}>{token.replace(/<\/?sup>/g, "")}</sup>,
      );
    } else {
      const label = token.slice(1, token.indexOf("]"));
      const href = token.slice(token.indexOf("](") + 2, -1);
      nodes.push(
        <a
          key={`${keyBase}-a${i}`}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline underline-offset-4"
        >
          {label}
        </a>,
      );
    }
    last = match.index + token.length;
    i += 1;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

export function LegalDocument({ source }: { source: string }) {
  const lines = source.split("\n");
  const blocks: ReactNode[] = [];
  let bullets: string[] = [];

  const flushBullets = (key: string) => {
    if (bullets.length === 0) return;
    const items = bullets;
    bullets = [];
    blocks.push(
      <ul key={key} className="my-4 list-disc space-y-2 pl-6 text-[0.975rem] leading-7">
        {items.map((item, idx) => (
          <li key={`${key}-${idx}`}>{renderInline(item, `${key}-${idx}`)}</li>
        ))}
      </ul>,
    );
  };

  lines.forEach((rawLine, index) => {
    const line = rawLine.trim();
    const key = `l${index}`;

    if (line === "") {
      flushBullets(`${key}-ul`);
      return;
    }

    if (line.startsWith("* ") || line.startsWith("- ")) {
      bullets.push(line.slice(2).trim());
      return;
    }

    flushBullets(`${key}-ul`);

    if (line.startsWith("### ")) {
      blocks.push(
        <h3
          key={key}
          className="mt-8 text-lg font-semibold tracking-tight text-foreground"
        >
          {renderInline(line.slice(4), key)}
        </h3>,
      );
      return;
    }
    if (line.startsWith("## ")) {
      blocks.push(
        <h2
          key={key}
          className="mt-10 border-b border-border pb-2 text-xl font-semibold tracking-tight text-foreground"
        >
          {renderInline(line.slice(3), key)}
        </h2>,
      );
      return;
    }
    if (line.startsWith("# ")) {
      blocks.push(
        <h2
          key={key}
          className="mt-12 text-2xl font-bold tracking-tight text-foreground"
        >
          {renderInline(line.slice(2), key)}
        </h2>,
      );
      return;
    }

    blocks.push(
      <p key={key} className="my-4 text-[0.975rem] leading-7 text-foreground/90">
        {renderInline(line, key)}
      </p>,
    );
  });

  flushBullets("tail-ul");

  return <div className="max-w-none">{blocks}</div>;
}
