import React, { useEffect, useState } from "react";

// Demo: client-side OpenGraph preview using a public API (for production, do this server-side)
export default function LinkPreview({ url }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!url) return;
    fetch(`https://jsonlink.io/api/extract?url=${encodeURIComponent(url)}`)
      .then(res => res.json()).then(setData)
      .catch(() => setData(null));
  }, [url]);

  if (!data) return null;
  return (
    <a href={url} target="_blank" rel="noopener noreferrer"
      className="block bg-glasslight rounded-xl p-3 my-2 shadow hover:bg-primary/20 transition">
      {data.images && data.images[0] &&
        <img src={data.images[0]} alt="" className="h-28 object-cover mb-2 rounded" />}
      <div className="font-bold text-white">{data.title}</div>
      <div className="text-sm text-zinc-300">{data.description}</div>
      <div className="text-xs text-zinc-400 mt-1">{url}</div>
    </a>
  );
}