"use client";
import { useEffect, useState } from "react";
import Player from "../components/Player";

export default function Page(){
  const [list,setList] = useState<any[]>([]);
  const [current,setCurrent] = useState<any|null>(null);
  const [side,setSide] = useState<"jp"|"kr">("jp");

  useEffect(()=>{ (async()=>{
    const r = await fetch("/api/tracks?limit=200", { cache: "no-store" });
    const j = await r.json(); setList(j.items||[]);
  })(); }, []);

  const open = async (id:string) => {
    const r = await fetch(`/api/tracks/${id}`, { cache:"no-store" });
    const t = await r.json(); setCurrent(t);
  };

  const best = current?.best_links?.[side];
  const videoId = best?.href?.match(/[?&]v=([^&]+)/)?.[1];

  return (
    <main style={{maxWidth:880, margin:"24px auto", padding:"0 16px"}}>
      <h1>JK AB Player (Web Service)</h1>
      <div style={{display:"grid", gridTemplateColumns:"1fr 2fr", gap:16}}>
        <aside>
          <input placeholder="검색"
            onChange={async e=>{
              const q = e.target.value.trim();
              const r = await fetch(`/api/tracks?query=${encodeURIComponent(q)}`);
              const j = await r.json(); setList(j.items||[]);
            }}
            style={{width:"100%", padding:8, marginBottom:8}} />
          <ul style={{listStyle:"none", padding:0, margin:0}}>
            {list.map(t=>(
              <li key={t.id} style={{padding:"8px 6px", borderBottom:"1px solid #eee", cursor:"pointer"}}
                  onClick={()=>open(t.id)}>
                <b>{t.jp_title}</b> / {t.kr_title}
                <div style={{fontSize:12, color:"#666"}}>{t.jp_artist} ↔ {t.kr_artist}</div>
              </li>
            ))}
          </ul>
        </aside>
        <section>
          {current ? (
            <>
              <div style={{display:"flex", gap:8, marginBottom:8}}>
                <button onClick={()=>setSide("jp")} disabled={side==="jp"}>JP</button>
                <button onClick={()=>setSide("kr")} disabled={side==="kr"}>KR</button>
              </div>
              {videoId ? (
                <Player videoId={videoId} start={best?.start||0} end={best?.end||null} />
              ) : <div>재생 가능한 링크가 없습니다.</div>}
              <h3 style={{marginTop:12}}>{current.jp_title} / {current.kr_title}</h3>
              <div style={{fontSize:14, color:"#666"}}>{current.jp_artist} ↔ {current.kr_artist}</div>
            </>
          ) : <div>곡을 선택하세요.</div>}
        </section>
      </div>
    </main>
  );
}
