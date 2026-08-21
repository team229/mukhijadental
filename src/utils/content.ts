import pageContent from "../data/page-content.json";

export function getPageContent(contentKey?: string): string[] {
  if (!contentKey) return [];
  const content = pageContent as Record<string, string[]>;
  return content[contentKey] ?? [];
}

export function contentToHtml(lines: string[]): { html: string; faqs: { question: string; answer: string }[] } {
  const faqs: { question: string; answer: string }[] = [];
  let html = "";
  let inFaq = false;
  let currentQuestion = "";
  let currentAnswer = "";
  let inList = false;

  const skipPatterns = [
    /^Target Page:/,
    /^Word Count:/,
    /^Meta Title:/,
    /^Meta Description:/,
    /^Mukhija Dental.*Content$/,
  ];

  for (const line of lines) {
    if (skipPatterns.some((p) => p.test(line))) continue;

    if (line === "Frequently Asked Questions") {
      if (inList) {
        html += "</ul>\n";
        inList = false;
      }
      inFaq = true;
      continue;
    }

    if (inFaq) {
      if (line.endsWith("?") && !currentQuestion) {
        currentQuestion = line;
      } else if (currentQuestion && line) {
        currentAnswer = line;
        faqs.push({ question: currentQuestion, answer: currentAnswer });
        currentQuestion = "";
        currentAnswer = "";
      }
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

    if (line.length < 80 && !line.includes(".") && line.length > 3) {
      const isLikelyHeading = /^[A-Z]/.test(line) && !line.endsWith(".");
      if (isLikelyHeading) {
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
