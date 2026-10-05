import pageContent from "../data/page-content.json";

const AREA_LIST_LINES = new Set([
  "Sonepat city and Model Town",
  "Murthal",
  "Kundli",
  "Sector 12, Sector 14, and Sector 15",
  "Sector 35",
  "Omaxe City",
]);

/**
 * Every FAQ heading variant used across page-content.json. They all collapse
 * into ONE "Frequently Asked Questions" accordion block per page.
 */
const FAQ_HEADING_RE =
  /^(?:frequently\s+asked\s+questions|service\s+faqs?|location\s+faqs?|faqs?)$/i;

/** Optional "Q1:" / "Q12." / "Q1)" numbering prefix on an FAQ line. */
const FAQ_NUMBER_PREFIX_RE = /^Q\d*\s*[:.)]\s*/;

/** Leading "A:" left on the answer half of an inline "Qn: ... A: ..." line. */
const FAQ_ANSWER_PREFIX_RE = /^A:\s*/;

export interface Faq {
  question: string;
  answer: string;
}

/**
 * Parses one FAQ line into a question/answer pair.
 *
 * The content files store an FAQ as a SINGLE line in either of these shapes:
 *   "How long do implants last? With proper care they can last decades."
 *   "Q1: How far is the clinic? A: It is in Model Town, a short drive away."
 *
 * Returns null when the line is not an FAQ (e.g. a trailing disclaimer), which
 * lets the caller close the FAQ section instead of swallowing the line.
 */
function parseFaqLine(raw: string): Faq | null {
  const line = raw.trim().replace(FAQ_NUMBER_PREFIX_RE, "");
  if (!line) return null;

  const terminator = line.search(/[?!]/);
  if (terminator === -1) return null;

  let question = line.slice(0, terminator + 1).trim();
  let answer = line.slice(terminator + 1).trim().replace(FAQ_ANSWER_PREFIX_RE, "");

  // "Q1: question without punctuation? A: answer" - marker can precede the
  // question's own terminator, so re-check for a trailing "A:" on the answer.
  if (!answer) return null;

  // Some lines put the answer first: "Question? A: answer" already handled
  // above; this catches "Question?answer" and stray double spaces.
  question = question.replace(/\s+/g, " ").trim();
  answer = answer.replace(/\s+/g, " ").trim();

  if (!question || !answer) return null;
  return { question, answer };
}

export function getPageContent(contentKey?: string): string[] {
  if (!contentKey) return [];
  const content = pageContent as Record<string, string[]>;
  return content[contentKey] ?? [];
}

export function contentToHtml(lines: string[]): { html: string; faqs: Faq[] } {
  const faqs: Faq[] = [];
  let html = "";
  let inFaq = false;
  let inList = false;

  const skipPatterns = [
    /^Target Page:/,
    /^Word Count:/,
    /^Meta Title:/,
    /^Meta Description:/,
    /^Mukhija Dental.*Content$/,
    /\[Insert/i,
  ];

  for (const line of lines) {
    if (skipPatterns.some((p) => p.test(line))) continue;

    // Any FAQ heading ("Service FAQs", "Location FAQs", "FAQs",
    // "Frequently Asked Questions") enters FAQ mode. Headings themselves are
    // never emitted - the page renders ONE "Frequently Asked Questions"
    // heading from the FAQ block, so all groups merge into a single list.
    if (FAQ_HEADING_RE.test(line.trim())) {
      if (inList) {
        html += "</ul>\n";
        inList = false;
      }
      inFaq = true;
      continue;
    }

    if (inFaq) {
      const faq = parseFaqLine(line);
      if (faq) {
        faqs.push(faq);
        continue;
      }
      // Not an FAQ line (blank or trailing content such as a medical
      // disclaimer): close the FAQ section and fall through so the line is
      // rendered normally instead of being swallowed.
      inFaq = false;
    }

    const isListItem = line.startsWith("•") || line.startsWith("-");

    if (isListItem) {
      if (!inList) {
        html += "<ul>\n";
        inList = true;
      }
      html += `<li>${line.replace(/^[•-]\s*/, "")}</li>\n`;
      continue;
    } else {
      if (inList) {
        html += "</ul>\n";
        inList = false;
      }
    }

    if (line.length < 80 && !line.includes(".") && line.length > 3) {
      const isLikelyHeading = /^[A-Z]/.test(line) && !line.endsWith(".");
      if (isLikelyHeading) {
        if (AREA_LIST_LINES.has(line)) {
          html += `<p><strong>${line}</strong></p>\n`;
          continue;
        }
        html += `<h2>${line}</h2>\n`;
        continue;
      }
    }

    if (line.match(/^[A-Z][a-z].*\.$/) && line.length < 120) {
      html += `<p><strong>${line}</strong></p>\n`;
    } else if (line.trim()) {
      html += `<p>${line}</p>\n`;
    }
  }

  if (inList) {
    html += "</ul>\n";
  }

  return { html, faqs };
}
