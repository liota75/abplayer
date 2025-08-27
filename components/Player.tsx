"use client";
import { useEffect, useRef } from "react";
declare global { interface Window { YT:any; onYouTubeIframeAPIReady:any; } }

export default function Player({ videoId, start=0, end=null }:{
  videoId?: string; start?: number; end?: number|null;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!videoId || !ref.current) return;
    const load = () => {
      new window.YT.Player(ref.current!, {
        videoId,
        playerVars: { start, end: end||undefined, rel:0, modestbranding:1 },
      });
    };
    if (window.YT && window.YT.Player) load();
    else {
      window.onYouTubeIframeAPIReady = load;
      const s = document.createElement("script");
      s.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(s);
    }
  }, [videoId, start, end]);
  return <div ref={ref} style={{aspectRatio:"16/9"}} />;
}
