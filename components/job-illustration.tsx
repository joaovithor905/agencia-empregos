import type { JobCategory } from "@/data/jobs";

const accent: Record<JobCategory, string> = { administrativo: "#ff8a48", comercial: "#ffb26b", logistica: "#ffc49e", industria: "#f0783c", servicos: "#ff9d66", tecnologia: "#ffcfaa" };

export function JobIllustration({ category, title }: { category: JobCategory; title: string }) {
  const color = accent[category] ?? accent.administrativo;
  return (
    <svg viewBox="0 0 420 250" role="img" aria-label={`Ilustração da vaga ${title}`}>
      <path d="M48 208h322" stroke="#171717" strokeWidth="5" strokeLinecap="round" opacity=".14"/><circle cx="312" cy="70" r="42" fill={color} opacity=".8"/><rect x="80" y="52" width="204" height="145" rx="18" fill="#fff" stroke="#171717" strokeWidth="5"/><path d="M110 89h100M110 113h140M110 137h116" stroke="#f05a1a" strokeWidth="9" strokeLinecap="round" opacity=".86"/>
      {category === "logistica" || category === "industria" ? <g><path d="M248 153h85l26 35h-111Z" fill={color} stroke="#171717" strokeWidth="5" strokeLinejoin="round"/><circle cx="272" cy="195" r="14" fill="#171717"/><circle cx="337" cy="195" r="14" fill="#171717"/><path d="M306 154v34" stroke="#171717" strokeWidth="5"/></g> : category === "tecnologia" ? <g><rect x="245" y="140" width="115" height="70" rx="9" fill="#171717"/><rect x="257" y="151" width="91" height="45" rx="4" fill={color}/><path d="M286 220h33M302 207v13" stroke="#171717" strokeWidth="6" strokeLinecap="round"/></g> : category === "comercial" ? <g><path d="M281 139h63l-8 57h-47Z" fill={color} stroke="#171717" strokeWidth="5"/><path d="M273 139h77" stroke="#171717" strokeWidth="6" strokeLinecap="round"/><circle cx="298" cy="204" r="8" fill="#171717"/><circle cx="329" cy="204" r="8" fill="#171717"/></g> : <g><circle cx="306" cy="148" r="25" fill={color} stroke="#171717" strokeWidth="5"/><path d="M265 208c2-31 17-47 41-47s39 16 42 47" fill={color} stroke="#171717" strokeWidth="5" strokeLinecap="round"/></g>}
      <circle cx="88" cy="54" r="13" fill={color} stroke="#171717" strokeWidth="4"/>
    </svg>
  );
}
