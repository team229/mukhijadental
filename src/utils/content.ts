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

/**
 * A "Name — description" line, e.g.
 *   "Dental Implants — a permanent, durable solution for missing teeth"
 *   "Gum Care & Bleeding Gums Treatment — often overlooked until it becomes uncomfortable"
 *
 * The description half must start lowercase. That single signal separates a
 * list label from an editorial heading, because every heading in the content
 * files continues with a capitalised title-cased phrase:
 *   heading:  "Zirconia Crowns — Why They've Become So Popular"
 *   list item: "Ultrasonic Teeth Cleaning — a deeper clean than standard scaling"
 */
const NAME_DESCRIPTION_RE = /^([A-Z][^—\n]{2,60})\s—\s([a-z(].*)$/;

/** Same shape, without requiring a lowercase description. Used only to grow
 *  detection across a block; the lowercase check is re-applied before learning. */
const LOOSE_NAME_DESCRIPTION_RE = /^([A-Z][^—\n]{2,60})\s—\s(\S.*)$/;

/**
 * Learns which "Name — description" prefixes are list labels rather than
 * headings.
 *
 * Both shapes exist in the content files and are told apart by two signals:
 *   1. the description half starts lowercase (see NAME_DESCRIPTION_RE)
 *   2. the label appears in a run of 3+ consecutive matching lines, i.e. inside
 *      a real "What We Treat" / "What affects the price" block
 *
 * Learning runs across ALL content keys, not per page, so a label proven to be a
 * list label anywhere (say "Dental Implants") is treated consistently on every
 * page — including the odd page where its siblings broke the run and left it
 * isolated. Editorial headings ("Dental Veneers — A Closer Look") never form a
 * 3+ run and are left as headings.
 */
function learnListItemLabels(): Set<string> {
  const labels = new Set<string>();
  const allLines = pageContent as Record<string, string[]>;

  for (const lines of Object.values(allLines)) {
    if (!Array.isArray(lines)) continue;

    // Walk the page and split it into blocks separated by real headings and
    // prose. A block of 2+ consecutive Name — description lines is a list, even
    // when it is short: e.g. "Imaging required — X-rays for diagnosis" sits as
    // the final entry of a 5-item price-factors block that starts mid-list.
    let i = 0;
    while (i < lines.length) {
      if (!NAME_DESCRIPTION_RE.test(lines[i].trim())) {
        i++;
        continue;
      }
      let end = i;
      while (end + 1 < lines.length && NAME_DESCRIPTION_RE.test(lines[end + 1].trim())) end++;
      // Grow the run backwards while the previous line is also a list item of the
      // same shape, so a broken run still merges into one block.
      while (i - 1 >= 0 && NAME_DESCRIPTION_RE.test(lines[i - 1].trim())) i--;
      if (end - i + 1 >= 2) {
        for (let x = i; x <= end; x++) {
          const m = lines[x].trim().match(NAME_DESCRIPTION_RE);
          if (m) labels.add(m[1].trim());
        }
      }
      i = end + 1;
    }

    // Second pass with the looser pattern, which also matches a description that
    // happens to start with a capital ("Imaging required — X-rays for
    // diagnosis..."). Without this, the final entry of an otherwise-detected
    // block falls out of the label set and renders as a heading.
    i = 0;
    while (i < lines.length) {
      if (!LOOSE_NAME_DESCRIPTION_RE.test(lines[i].trim())) {
        i++;
        continue;
      }
      let end = i;
      while (end + 1 < lines.length && LOOSE_NAME_DESCRIPTION_RE.test(lines[end + 1].trim())) end++;
      while (i - 1 >= 0 && LOOSE_NAME_DESCRIPTION_RE.test(lines[i - 1].trim())) i--;
      if (end - i + 1 >= 2) {
        for (let x = i; x <= end; x++) {
          const m = lines[x].trim().match(LOOSE_NAME_DESCRIPTION_RE);
          // Never learn a label whose description is title-cased: those are
          // editorial headings ("Dental Crown & Bridge Cost — What Actually
          // Affects the Price"), not list entries. "X-ray" is the one acronym
          // that legitimately opens a description sentence in this corpus.
          if (m && /^[a-z(]/.test(m[2])) labels.add(m[1].trim());
          else if (m && /^X-?[Rr]ays?\b/.test(m[2])) labels.add(m[1].trim());
        }
      }
      i = end + 1;
    }

    // Third pass: a lone Name — description line wedged between short,
    // period-less tip lines is also a list entry. This catches home-care lists
    // where only one item uses an em dash ("Floss daily — most people brush
    // regularly but skip flossing"), whereas a real editorial heading is
    // surrounded by prose that carries sentence punctuation.
    for (let x = 1; x < lines.length - 1; x++) {
      const m = lines[x].trim().match(NAME_DESCRIPTION_RE);
      if (!m) continue;
      const isTip = (s: string) => {
        const t = s.trim();
        return t.length > 8 && t.length <= 130 && !t.endsWith(".") && !NAME_DESCRIPTION_RE.test(t) && !LOOSE_NAME_DESCRIPTION_RE.test(t);
      };
      if (isTip(lines[x - 1]) && isTip(lines[x + 1])) labels.add(m[1].trim());
    }
  }
  return labels;
}

const LIST_ITEM_LABELS = learnListItemLabels();

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

    // "Name — description" lines whose label was learned as a list label are
    // list items, never headings. Rendering them as <li> keeps a "What We
    // Treat" block visually and semantically consistent, and keeps treatment
    // names out of the document outline.
    const nameDesc = line.trim().match(LOOSE_NAME_DESCRIPTION_RE);
    if (nameDesc && LIST_ITEM_LABELS.has(nameDesc[1].trim())) {
      if (!inList) {
        html += "<ul>\n";
        inList = true;
      }
      html += `<li>${line.trim()}</li>\n`;
      continue;
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

    // Heading test. Length is deliberately NOT part of it: the old `length < 80`
    // cap silently demoted any heading or list line past 80 characters to body
    // copy, which is what made long list items render as small grey text while
    // their shorter siblings rendered as headings.
    const looksLikeHeading =
      line.length > 3 &&
      line.length <= 120 &&
      !line.includes(".") &&
      /^[A-Z]/.test(line) &&
      !line.endsWith(".");

    if (looksLikeHeading) {
      if (AREA_LIST_LINES.has(line)) {
        html += `<p><strong>${line}</strong></p>\n`;
        continue;
      }
      html += `<h2>${line}</h2>\n`;
      continue;
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
