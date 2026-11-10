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
    // Batasi CSS inline (cegah overlay/clickjacking via position:fixed dsb.)
    allowedStyles: {
      "*": {
        "text-align": [/^(left|right|center|justify)$/],
        color: [/^#[0-9a-fA-F]{3,8}$/, /^rgba?\([\d\s.,%]+\)$/],
        "background-color": [/^#[0-9a-fA-F]{3,8}$/, /^rgba?\([\d\s.,%]+\)$/],
        "font-weight": [/^(normal|bold|[1-9]00)$/],
        "font-style": [/^(normal|italic)$/],
        "text-decoration": [/^(none|underline|line-through)$/],
      },
    },
    allowedSchemes: ["http", "https", "mailto", "tel"],
    allowedSchemesByTag: {
      img: ["http", "https"]
    },
    allowedIframeHostnames: [
      "www.youtube.com",
      "www.youtube-nocookie.com",
    ],
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
