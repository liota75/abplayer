export function rankLinks(links: any[]) {
  const POS = [/\bofficial\b/i, /\bmv\b/i, /\bofficial video\b/i];
  const NEG = [/shorts/i, /reaction/i, /cover/i, /fancam/i];
  return [...links].map(l => {
    let s = 0;
    if (l.pinned) s += 100;
    if (l.is_embeddable) s += 10;
    const href = l.href || "";
    POS.forEach(re => { if (re.test(href)) s += 3; });
    NEG.forEach(re => { if (re.test(href)) s -= 2; });
    return { ...l, rank_score: s };
  }).sort((a,b)=> (b.rank_score||0) - (a.rank_score||0));
}
