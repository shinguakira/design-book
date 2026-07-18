import { useMemo, useState } from "react";
import { Search, Filter, BookOpen, Bookmark, Quote } from "lucide-react";
import { PaperModal, pickRandomAnim, type DrawerAnim } from "../_shared/PaperModal";

type Article = {
  pmid: string;
  title: string;
  authors: string[];
  journal: string;
  year: number;
  doi: string;
  abstract: string;
  type: "研究論文" | "レビュー" | "プレプリント" | "臨床試験";
  references: string[];
};

const ARTICLES: Article[] = [
  {
    pmid: "38712345",
    title:
      "Large language models accelerate <b>protein structure</b> prediction with sparse attention",
    authors: ["Sato H", "Yamada T", "Kim S", "Patel R", "Wang L", "Chen X", "Garcia M"],
    journal: "Nature Machine Intelligence",
    year: 2025,
    doi: "10.1038/s42256-025-00942-x",
    type: "レビュー",
    abstract:
      "Recent advances in transformer architectures have shown that sparse attention mechanisms can dramatically reduce the computational cost of protein structure prediction without significant loss of accuracy. We benchmark four state-of-the-art systems against the CASP15 dataset and find that block-sparse implementations achieve 4.2× speedup while maintaining within-2-Å RMSD on 87% of targets. We discuss implications for high-throughput structural genomics and large-scale screening workflows.",
    references: [
      "Jumper J et al. Highly accurate protein structure prediction with AlphaFold. Nature (2021)",
      "Lin Z et al. Evolutionary-scale prediction of atomic-level protein structure. Science (2023)",
      "Vaswani A et al. Attention is all you need. NeurIPS (2017)",
    ],
  },
  {
    pmid: "38598211",
    title: "CRISPR-Cas13 editing of <b>mitochondrial RNA</b> in human iPSC-derived cardiomyocytes",
    authors: ["Tanaka M", "Brown K", "Liu J"],
    journal: "Cell Reports",
    year: 2025,
    doi: "10.1016/j.celrep.2025.114088",
    type: "研究論文",
    abstract:
      "Mitochondrial dysfunction is implicated in a wide range of cardiac disorders. Here we demonstrate efficient RNA editing of mt-tRNA<sup>Leu(UUR)</sup> using a refactored Cas13 system delivered via AAV in patient-derived iPSC-cardiomyocytes. Restoration of mature tRNA levels reverses MELAS-associated metabolic deficits within 72 hours, suggesting a therapeutic avenue.",
    references: [
      "Cox DBT et al. RNA editing with CRISPR-Cas13. Science (2017)",
      "Wang J et al. AAV delivery of Cas13. Nature Biotechnology (2024)",
    ],
  },
  {
    pmid: "38476902",
    title:
      "Single-cell transcriptomics reveals lineage commitment in <b>human thymus</b> development",
    authors: ["Park J", "Müller A", "Singh P", "Owens R"],
    journal: "Immunity",
    year: 2024,
    doi: "10.1016/j.immuni.2024.07.012",
    type: "研究論文",
    abstract:
      "We profiled 142,000 cells from fetal and pediatric thymic tissues across nine developmental stages. A novel CD8αα-biased progenitor population emerges around gestational week 14 and contributes to ~12% of mature single-positive thymocytes by birth. Pseudotime trajectories reveal three previously unrecognized branch points and identify ZBTB17 as a key gatekeeper of TCR repertoire diversity.",
    references: [
      "Park JE et al. Cell atlas of the human thymus. Science (2020)",
      "Lavaert M et al. Integrated scRNA-seq identifies novel thymic populations. Immunity (2020)",
    ],
  },
  {
    pmid: "38392174",
    title:
      "Long-term efficacy of <b>tirzepatide</b> in adults with type 2 diabetes: 5-year follow-up",
    authors: ["Roberts S", "Suzuki Y", "Nakamura K", "Davis M", "Allen P"],
    journal: "The Lancet",
    year: 2024,
    doi: "10.1016/S0140-6736(24)00521-3",
    type: "臨床試験",
    abstract:
      "In this multicenter randomized controlled trial, we report 5-year outcomes for 2,612 adults with type 2 diabetes treated with weekly tirzepatide vs semaglutide. The tirzepatide arm maintained HbA1c reductions of 1.8% vs 1.3% (p<0.001), with sustained weight loss (-9.2 kg vs -6.4 kg) and no new cardiovascular safety signals.",
    references: [
      "Frías JP et al. Tirzepatide vs semaglutide. NEJM (2021)",
      "Jastreboff AM et al. Tirzepatide for obesity. NEJM (2022)",
    ],
  },
  {
    pmid: "38281099",
    title:
      "A causal role for <b>gut microbiota</b> in age-related cognitive decline: a fecal transplant study in C57BL/6 mice",
    authors: ["O'Connell D", "Watanabe S", "Tan H"],
    journal: "Nature Aging",
    year: 2024,
    doi: "10.1038/s43587-024-00611-w",
    type: "プレプリント",
    abstract:
      "Transfer of cecal microbiota from 24-month-old donor mice into 4-month-old recipients induced age-like deficits in spatial memory within 8 weeks. Conversely, young-to-old transfers partially restored hippocampal neurogenesis. Bacteroides uniformis emerges as a candidate mediator.",
    references: [
      "Boehme M et al. Microbiota from young mice. Nature Aging (2021)",
      "Parker A et al. Fecal microbiota transplantation in aging. Microbiome (2022)",
    ],
  },
  {
    pmid: "38187662",
    title:
      "Photoswitchable enzymes enable optical control of <b>metabolic flux</b> in living E. coli",
    authors: ["Zhao L", "Fischer H", "Khan A"],
    journal: "Nature Chemical Biology",
    year: 2024,
    doi: "10.1038/s41589-023-01521-0",
    type: "研究論文",
    abstract:
      "By engineering azobenzene-conjugated lid domains into central metabolic enzymes, we achieve light-gated control of glycolytic flux. Blue light increases lactate production 3.4-fold within 90 seconds, with full reversal under green light. This platform opens new avenues for dynamic metabolic engineering.",
    references: ["Bose S et al. Optogenetic control of cellular metabolism. Cell Metab (2020)"],
  },
  {
    pmid: "38051204",
    title:
      "Sleep-stage classification with <b>self-supervised representations</b> from consumer wearables",
    authors: ["Müller F", "Ito R", "Hassan A", "Pereira V"],
    journal: "npj Digital Medicine",
    year: 2024,
    doi: "10.1038/s41746-023-00972-z",
    type: "研究論文",
    abstract:
      "We pretrain a 220M-parameter transformer on 2.4 million nights of unlabeled actigraphy data from 38,000 individuals. Fine-tuning on PSG-labeled data yields N3 stage classification with 0.89 F1, surpassing prior wrist-only methods. The model is deployable on-device within 28 MB and 19 ms per epoch.",
    references: ["Walch O et al. Sleep stage prediction with consumer wearables. Sleep (2019)"],
  },
  {
    pmid: "37944551",
    title: "Spatiotemporal mapping of <b>SARS-CoV-2</b> evolution in immunocompromised hosts",
    authors: ["Yamamoto E", "Chen W", "Lopez D"],
    journal: "Science",
    year: 2023,
    doi: "10.1126/science.adh8201",
    type: "研究論文",
    abstract:
      "Longitudinal sequencing of 184 immunocompromised patients reveals accelerated mutational dynamics, particularly within Spike RBD. We identify 12 high-frequency convergent substitutions and provide evidence that prolonged infections seed novel variants of interest.",
    references: ["Chaguza C et al. Within-host SARS-CoV-2 evolution. Cell (2023)"],
  },
];

const TYPES: Article["type"][] = ["研究論文", "レビュー", "プレプリント", "臨床試験"];

type YearBucket = {
  id: string;
  label: string;
  min?: number;
  max?: number;
};

const YEAR_BUCKETS: YearBucket[] = [
  { id: "2025", label: "2025年", min: 2025 },
  { id: "2024", label: "2024年", min: 2024, max: 2024 },
  { id: "2023", label: "2023年以前", max: 2023 },
];

const PAGE_SIZE = 5;

export default function PubmedSearch() {
  const [query, setQuery] = useState("");
  const [activeTypes, setActiveTypes] = useState<Set<Article["type"]>>(new Set());
  const [activeYearBuckets, setActiveYearBuckets] = useState<Set<string>>(new Set());
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState<{
    article: Article;
    variant: DrawerAnim;
    key: number;
  } | null>(null);
  const [saved, setSaved] = useState<Set<string>>(new Set());

  const toggle = <T,>(set: Set<T>, v: T): Set<T> => {
    const next = new Set(set);
    if (next.has(v)) next.delete(v);
    else next.add(v);
    return next;
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ARTICLES.filter((a) => {
      if (q) {
        const blob = (a.title + a.abstract + a.journal + a.authors.join(" ")).toLowerCase();
        if (!blob.includes(q)) return false;
      }
      if (activeTypes.size && !activeTypes.has(a.type)) return false;
      if (activeYearBuckets.size) {
        const matched = [...activeYearBuckets].some((id) => {
          const bucket = YEAR_BUCKETS.find((b) => b.id === id);
          if (!bucket) return false;
          const minOk = bucket.min === undefined || a.year >= bucket.min;
          const maxOk = bucket.max === undefined || a.year <= bucket.max;
          return minOk && maxOk;
        });
        if (!matched) return false;
      }
      return true;
    });
  }, [query, activeTypes, activeYearBuckets]);

  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));

  const openArticle = (article: Article) => {
    setOpen({ article, variant: pickRandomAnim(), key: Date.now() });
  };

  return (
    <div className="-m-8">
      <div
        className="px-8 py-8 font-sans"
        style={{
          background: "radial-gradient(ellipse at top, #faf3df 0%, #f4ead4 60%, #e8dcbd 100%)",
          minHeight: "calc(100vh - 8rem)",
          fontFamily: '"Source Serif 4", Georgia, serif',
        }}
      >
        <div className="mx-auto max-w-6xl">
          <header className="border-b-2 border-[#b89e6b]/60 pb-3 mb-6">
            <div className="flex items-baseline gap-3">
              <div className="font-serif text-3xl font-bold tracking-tight text-[#2a1d10]">
                The PubMed Times
              </div>
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#7a5a30]">
                Vol. CXVII · 国立医学図書館
              </div>
            </div>
            <div className="text-[11px] italic text-[#7a5a30] mt-0.5">
              論文検索シーン — sepia/serif/numbered list と PubMed UI を借りた紙面風モック。
              タイトルをクリックすると封筒モーダルがランダムに飛んできます。
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-[220px_minmax(0,1fr)] gap-6">
            <aside className="space-y-5 text-[#2a1d10]">
              <section>
                <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#7a5a30] mb-2">
                  <Filter className="w-3.5 h-3.5" />
                  Article Type
                </div>
                <div className="space-y-1.5">
                  {TYPES.map((t) => (
                    <label
                      key={t}
                      className="flex items-center gap-2 text-sm cursor-pointer hover:text-[#8b3a1c]"
                    >
                      <input
                        type="checkbox"
                        checked={activeTypes.has(t)}
                        onChange={() => {
                          setActiveTypes((s) => toggle(s, t));
                          setPage(1);
                        }}
                        className="accent-[#8b3a1c]"
                      />
                      {t}
                    </label>
                  ))}
                </div>
              </section>
              <section>
                <div className="text-[11px] font-semibold uppercase tracking-wider text-[#7a5a30] mb-2">
                  Publication Year
                </div>
                <div className="space-y-1.5">
                  {YEAR_BUCKETS.map((y) => (
                    <label
                      key={y.id}
                      className="flex items-center gap-2 text-sm cursor-pointer hover:text-[#8b3a1c]"
                    >
                      <input
                        type="checkbox"
                        checked={activeYearBuckets.has(y.id)}
                        onChange={() => {
                          setActiveYearBuckets((s) => toggle(s, y.id));
                          setPage(1);
                        }}
                        className="accent-[#8b3a1c]"
                      />
                      {y.label}
                    </label>
                  ))}
                </div>
              </section>
              <section className="pt-3 border-t border-[#b89e6b]/50">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-[#7a5a30] mb-2 flex items-center gap-1.5">
                  <Bookmark className="w-3.5 h-3.5" />
                  Saved ({saved.size})
                </div>
                {saved.size === 0 ? (
                  <div className="text-[11px] italic text-[#7a5a30]">タイトル横の星で保存</div>
                ) : (
                  <ul className="text-xs space-y-1">
                    {[...saved].slice(0, 4).map((pmid) => {
                      const a = ARTICLES.find((x) => x.pmid === pmid);
                      return (
                        <li
                          key={pmid}
                          className="line-clamp-2 leading-snug"
                          dangerouslySetInnerHTML={{
                            __html: a?.title ?? "",
                          }}
                        />
                      );
                    })}
                  </ul>
                )}
              </section>
            </aside>

            <main>
              <div className="flex gap-2 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7a5a30]" />
                  <input
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value);
                      setPage(1);
                    }}
                    placeholder="protein structure, CRISPR, microbiota…"
                    className="w-full h-10 rounded-md border-2 border-[#b89e6b]/60 bg-[#faf3df] pl-9 pr-3 text-sm text-[#2a1d10] placeholder:text-[#9b8458] focus:outline-none focus:border-[#8b3a1c]"
                  />
                </div>
                <button
                  className="h-10 px-5 rounded-md bg-[#8b3a1c] text-[#faf3df] text-sm font-semibold hover:bg-[#7a3216]"
                  onClick={() => setPage(1)}
                >
                  Search
                </button>
              </div>

              <div className="text-[11px] text-[#7a5a30] mb-2 flex items-baseline gap-3">
                <span>
                  <b className="font-serif text-base text-[#2a1d10]">{filtered.length}</b> results
                </span>
                {(activeTypes.size > 0 || activeYearBuckets.size > 0 || query) && (
                  <button
                    onClick={() => {
                      setActiveTypes(new Set());
                      setActiveYearBuckets(new Set());
                      setQuery("");
                      setPage(1);
                    }}
                    className="text-[#8b3a1c] hover:underline"
                  >
                    フィルタをクリア
                  </button>
                )}
              </div>

              {pageItems.length === 0 ? (
                <div className="border border-dashed border-[#b89e6b]/60 rounded-md py-12 text-center text-sm text-[#7a5a30] italic">
                  No matching articles. Try different terms or relax the filters.
                </div>
              ) : (
                <ol className="border-t border-[#b89e6b]/60">
                  {pageItems.map((a, i) => {
                    const idx = (page - 1) * PAGE_SIZE + i + 1;
                    const isSaved = saved.has(a.pmid);
                    return (
                      <li
                        key={a.pmid}
                        className="grid grid-cols-[40px_minmax(0,1fr)_auto] gap-3 border-b border-[#b89e6b]/40 py-3 last:border-b-0 hover:bg-[#e8dcbd]/30"
                      >
                        <div className="select-none pt-0.5 text-right font-serif text-xl font-bold leading-none text-[#b89e6b]">
                          {idx}
                        </div>
                        <div className="min-w-0">
                          <button onClick={() => openArticle(a)} className="text-left">
                            <h3
                              className="font-serif text-[17px] font-semibold leading-snug text-[#2a1d10] hover:underline"
                              dangerouslySetInnerHTML={{ __html: a.title }}
                            />
                          </button>
                          <p className="mt-0.5 text-[13px] text-[#5a3a18]">
                            {a.authors.slice(0, 6).join(", ")}
                            {a.authors.length > 6 && ", et al."}
                          </p>
                          <p className="text-[11px] text-[#7a5a30]">
                            <span className="italic">{a.journal}</span>
                            {" · "}
                            {a.year}
                            {" · "}
                            doi:{a.doi}
                            <span className="ml-2 inline-block rounded-full bg-[#e8dcbd] px-1.5 py-0.5 text-[10px] uppercase tracking-wider not-italic">
                              {a.type}
                            </span>
                          </p>
                          <p className="mt-1.5 line-clamp-2 text-[13px] leading-snug text-[#2a1d10]/80">
                            {a.abstract}
                          </p>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <button
                            onClick={() => setSaved((s) => toggle(s, a.pmid))}
                            title={isSaved ? "保存済" : "保存"}
                            className={`p-1.5 rounded ${
                              isSaved ? "text-[#8b3a1c]" : "text-[#9b8458] hover:text-[#5a3a18]"
                            }`}
                          >
                            <Bookmark className={`w-4 h-4 ${isSaved ? "fill-[#8b3a1c]" : ""}`} />
                          </button>
                          <button
                            onClick={() => openArticle(a)}
                            title="開く"
                            className="p-1.5 rounded text-[#9b8458] hover:text-[#5a3a18]"
                          >
                            <BookOpen className="w-4 h-4" />
                          </button>
                        </div>
                      </li>
                    );
                  })}
                </ol>
              )}

              {totalPages > 1 && (
                <div className="mt-4 flex items-center justify-between text-sm">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="text-[#5a3a18] hover:text-[#8b3a1c] disabled:opacity-30"
                  >
                    ← Prev
                  </button>
                  <div className="text-[11px] text-[#7a5a30]">
                    Page {page} / {totalPages}
                  </div>
                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="text-[#5a3a18] hover:text-[#8b3a1c] disabled:opacity-30"
                  >
                    Next →
                  </button>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>

      <PaperModal
        variant={open?.variant ?? "envelope"}
        open={!!open}
        onClose={() => setOpen(null)}
        title={open?.article.title ?? ""}
        bodyKey={open?.key}
        meta={open ? `PMID ${open.article.pmid}` : ""}
      >
        {open && (
          <article className="space-y-5 text-[#2a1d10]">
            <header className="pm-section space-y-2 border-b border-[#b89e6b]/60 pb-3">
              <h1
                className="font-serif text-2xl font-semibold leading-tight tracking-tight"
                dangerouslySetInnerHTML={{ __html: open.article.title }}
              />
              <p className="text-xs italic text-[#7a5a30]">
                {open.article.journal} · {open.article.year} · doi:{open.article.doi}
              </p>
              <p className="text-xs text-[#2a1d10]/85">{open.article.authors.join(", ")}</p>
            </header>

            <section className="pm-section space-y-2">
              <h2 className="text-[11px] font-semibold uppercase tracking-wider text-[#7a5a30]">
                Abstract
              </h2>
              <p
                className="font-serif text-[14px] leading-relaxed text-[#2a1d10]/90"
                dangerouslySetInnerHTML={{ __html: open.article.abstract }}
              />
            </section>

            <section className="pm-section space-y-2">
              <h2 className="text-[11px] font-semibold uppercase tracking-wider text-[#7a5a30]">
                References ({open.article.references.length})
              </h2>
              <ol className="list-decimal space-y-1.5 pl-5 text-[11px] text-[#2a1d10]/80">
                {open.article.references.map((r, i) => (
                  <li key={i} className="leading-snug">
                    {r}
                  </li>
                ))}
              </ol>
            </section>

            <div className="pm-section flex gap-2 pt-2 border-t border-[#b89e6b]/40">
              <button className="inline-flex items-center gap-1.5 px-3 h-8 rounded-md bg-[#8b3a1c] text-[#faf3df] text-xs font-semibold">
                <Quote className="w-3 h-3" />
                Cite
              </button>
              <button
                onClick={() => setSaved((s) => toggle(s, open.article.pmid))}
                className="inline-flex items-center gap-1.5 px-3 h-8 rounded-md border border-[#b89e6b] text-[#5a3a18] text-xs font-semibold hover:bg-[#e8dcbd]/50"
              >
                <Bookmark
                  className={`w-3 h-3 ${saved.has(open.article.pmid) ? "fill-[#8b3a1c] text-[#8b3a1c]" : ""}`}
                />
                {saved.has(open.article.pmid) ? "保存済" : "保存"}
              </button>
            </div>
          </article>
        )}
      </PaperModal>
    </div>
  );
}
