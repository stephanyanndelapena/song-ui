export function isYouTubeUrl(url) {
  try {
    const u = new URL(url);
    return u.hostname.includes("youtube.com") || u.hostname.includes("youtu.be");
  } catch {
    return false;
  }
}

export function getYouTubeId(url) {
  try {
    const u = new URL(url);

    if (u.hostname.includes("youtu.be")) return u.pathname.replace("/", "") || null;

    const v = u.searchParams.get("v");
    if (v) return v;

    const parts = u.pathname.split("/").filter(Boolean);

    const shortsIndex = parts.indexOf("shorts");
    if (shortsIndex !== -1 && parts[shortsIndex + 1]) return parts[shortsIndex + 1];

    const embedIndex = parts.indexOf("embed");
    if (embedIndex !== -1 && parts[embedIndex + 1]) return parts[embedIndex + 1];

    return null;
  } catch {
    return null;
  }
}

export function toYouTubeEmbedUrl(url) {
  const id = getYouTubeId(url);
  return id ? `https://www.youtube.com/embed/${id}?autoplay=1&rel=0` : null;
}

export function youTubeThumbnail(url) {
  const id = getYouTubeId(url);
  return id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : null;
}