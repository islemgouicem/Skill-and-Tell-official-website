// gurl.js
export default function gurl(path) {
    if (!path) return "";
    // already absolute (CDN, data URI, etc.)
    if (/^(https?:|data:|blob:)/i.test(path)) return path;

    // normalize: windows -> posix, strip leading slashes & "public/"
    let clean = String(path).replace(/\\/g, "/").replace(/^\/+/, "").replace(/^public\//, "");

    return `../../public/${clean}`;
}
