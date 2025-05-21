const AVATAR_COLORS = [
  "#ff1e4b", "#e94f37", "#393e46", "#22223b", "#3a7ca5", "#f6bd60", "#f7ede2"
];

export function generateAvatar(name) {
  const color = AVATAR_COLORS[Math.abs(hashCode(name || "?")) % AVATAR_COLORS.length];
  const initial = (name && name[0] ? name[0] : "?").toUpperCase();
  return `data:image/svg+xml;utf8,<svg width='80' height='80' xmlns='http://www.w3.org/2000/svg'><rect width='100%' height='100%' rx='40' fill='${color}'/><text x='50%' y='54%' font-size='40' fill='white' font-family='Arial' font-weight='bold' text-anchor='middle' dominant-baseline='middle'>${initial}</text></svg>`;
}
function hashCode(str) {
  let hash = 0, i, chr;
  if (!str) return 0;
  for (i = 0; i < str.length; i++) hash = ((hash << 5) - hash) + str.charCodeAt(i), hash |= 0;
  return hash;
}