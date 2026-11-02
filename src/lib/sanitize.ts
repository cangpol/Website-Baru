import sanitizeHtml from "sanitize-html";

export function sanitizeRichText(dirtyHtml: string): string {
  if (!dirtyHtml || typeof dirtyHtml !== "string") {
    return "";
  }

  return sanitizeHtml(dirtyHtml, {
    allowedTags: [
      "h1", "h2", "h3", "h4", "h5", "h6", "blockquote", "p", "a", "ul", "ol",
      "nl", "li", "b", "i", "strong", "em", "strike", "code", "hr", "br", "div",
      "table", "thead", "caption", "tbody", "tr", "th", "td", "pre", "iframe",
      "img", "span", "u", "s"
    ],
    allowedAttributes: {
      a: ["href", "name", "target", "rel", "class"],
      img: ["src", "srcset", "alt", "title", "width", "height", "loading", "class"],
      iframe: ["src", "width", "height", "frameborder", "allow", "allowfullscreen", "class"],
      "*": ["class", "style", "id"]
    },
    allowedSchemes: ["http", "https", "mailto", "tel"],
    allowedSchemesByTag: {
      img: ["http", "https", "data"]
    },
    // Force rel="noopener noreferrer" on external links
    transformTags: {
      a: (tagName, attribs) => {
        if (attribs.href && (attribs.href.startsWith("http://") || attribs.href.startsWith("https://"))) {
          attribs.rel = "noopener noreferrer";
        }
        return {
          tagName,
          attribs
        };
      }
    }
  });
}

