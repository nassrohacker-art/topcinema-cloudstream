// topcinema.js
// CloudStream-style source extension (template).
const BASE = "https://topcinema.example"; // غير هذا إلى رابط الموقع الحقيقي

async function fetchText(url, opts = {}) {
  const res = await fetch(url, opts);
  if (!res.ok) throw new Error(`HTTP ${res.status} ${url}`);
  return await res.text();
}

async function search(query) {
  const url = `${BASE}/search?q=${encodeURIComponent(query)}`;
  const html = await fetchText(url);
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const items = [];
  doc.querySelectorAll(".movie-item").forEach(el => {
    const titleEl = el.querySelector(".title");
    const linkEl = el.querySelector("a");
    const imgEl = el.querySelector("img");
    if (!linkEl) return;
    const id = linkEl.getAttribute("href");
    items.push({
      id: id,
      title: titleEl ? titleEl.textContent.trim() : "No title",
      poster: imgEl ? imgEl.src : null,
      url: new URL(id, BASE).href
    });
  });
  return items;
}

async function getDetails(id) {
  const url = id.startsWith("http") ? id : (new URL(id, BASE)).href;
  const html = await fetchText(url);
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  const title = (doc.querySelector("h1") || {}).textContent || "No title";
  const poster = (doc.querySelector(".poster img") || {}).src || null;
  const synopsis = (doc.querySelector(".description") || {}).textContent || "";
  const episodes = [];

  doc.querySelectorAll(".episodes li a").forEach((a, i) => {
    const epUrl = new URL(a.getAttribute("href"), BASE).href;
    episodes.push({
      id: epUrl,
      name: a.textContent.trim() || `Episode ${i+1}`,
      url: epUrl
    });
  });

  return {
    id: url,
    title: title.trim(),
    poster,
    synopsis: synopsis.trim(),
    episodes
  };
}

async function load(streamPageUrl) {
  const html = await fetchText(streamPageUrl);
  const m3u8match = html.match(/https?:\/\/[^"' ]+\.m3u8[^"' ]*/);
  if (m3u8match) {
    return [{ url: m3u8match[0], quality: "auto", isM3U8: true }];
  }

  const iframeMatch = html.match(/<iframe[^>]+src=["']([^"']+)["']/i);
  if (iframeMatch) {
    const iframeUrl = iframeMatch[1];
    return [{ url: iframeUrl, quality: "auto", isIframe: true }];
  }

  const mp4match = html.match(/https?:\/\/[^"' ]+\.mp4[^"' ]*/);
  if (mp4match) {
    return [{ url: mp4match[0], quality: "auto", isMP4: true }];
  }

  throw new Error("No playable link found");
}

module.exports = {
  name: "Top Cinema",
  id: "topcinema",
  version: "1.0.0",
  type: "source",
  search,
  getDetails,
  load
};