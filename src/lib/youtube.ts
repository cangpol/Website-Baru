const ID = /^[A-Za-z0-9_-]{11}$/;

/** Mengambil ID video dari tautan YouTube (watch, youtu.be, embed, shorts) atau ID polos. Null bila bukan YouTube. */
export function youtubeId(value: string): string | null {
  const text = value.trim();
  if (ID.test(text)) return text;
  try {
    const url = new URL(text);
    const host = url.hostname.replace(/^(www|m)\./, "");
    if (!["youtube.com", "youtu.be", "youtube-nocookie.com"].includes(host)) return null;
    const [first, second] = url.pathname.split("/").filter(Boolean);
    const id = host === "youtu.be" ? first : first === "watch" ? url.searchParams.get("v") : ["embed", "shorts", "live"].includes(first) ? second : null;
    return id && ID.test(id) ? id : null;
  } catch {
    return null;
  }
}
