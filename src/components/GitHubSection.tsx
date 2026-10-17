import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, RefreshCw } from 'lucide-react';
import { profile } from '@/data/siteData';
import { useGitHubData } from '@/hooks/useGitHubData';

function ExternalImage({ src, alt, className, fallback }: { src: string; alt: string; className: string; fallback: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div role="img" aria-label={alt} className={`${className} flex min-h-28 items-center justify-center text-center text-sm text-slate-400`}>
        {fallback}
      </div>
    );
  }

  return <img src={src} alt={alt} className={className} loading="lazy" decoding="async" onError={() => setFailed(true)} />;
}

function RepositoryCard({ repository }: { repository: ReturnType<typeof useGitHubData>['topRepositories'][number] }) {
  return (
    <motion.a
      href={repository.html_url}
      target="_blank"
      rel="noreferrer"
      className="rounded-[1.25rem] border border-white/10 bg-black/15 p-4 transition hover:-translate-y-1 hover:border-electric/40 hover:bg-electric/10"
      whileHover={{ scale: 1.01 }}
    >
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-display text-xl font-semibold text-white">{repository.name}</h3>
        <Github className="h-4 w-4 text-cyanGlow" aria-hidden="true" />
      </div>
      <p className="mt-3 text-sm leading-6 text-slate-300">{repository.description ?? 'Description not available.'}</p>
      <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-200">
        {repository.language ? <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">{repository.language}</span> : null}
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Stars {repository.stargazers_count}</span>
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Forks {repository.forks_count}</span>
      </div>
    </motion.a>
  );
}

export function GitHubSection() {
  const { topRepositories, activity, loading, error, username } = useGitHubData();

  return (
    <section id="github" className="section-shell">
      <div className="space-y-5">
        <div className="max-w-3xl space-y-2">
          <p className="font-mono text-xs uppercase tracking-[0.35em] text-cyanGlow/80">GitHub</p>
          <h2 className="font-display text-3xl font-semibold text-white md:text-4xl">A quick view of my public repositories and technical work.</h2>
          <p className="text-sm leading-6 text-slate-300 md:text-base">Repository details and links are shown first so recruiters can review the work directly.</p>
        </div>

        {error ? <div className="rounded-2xl border border-amber-400/30 bg-amber-400/10 p-4 text-sm text-amber-100">GitHub data is unavailable right now. The public GitHub links remain active.</div> : null}

        <div className="space-y-4 rounded-[1.5rem] border border-white/10 bg-white/5 p-4 shadow-softGlow">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.35em] text-cyanGlow/80">Relevant repositories</p>
              <p className="mt-2 text-sm text-slate-300">Open a repository to review the code, README, and implementation details.</p>
            </div>
            <a href={profile.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-white transition hover:border-electric/40 hover:bg-electric/10">
              <Github className="h-4 w-4" aria-hidden="true" />
              Open Profile
            </a>
          </div>

          <div className="grid gap-3 lg:grid-cols-2 2xl:grid-cols-3">
            {loading && topRepositories.length === 0
              ? Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="animate-pulse rounded-[1.75rem] border border-white/8 bg-black/15 p-5">
                    <div className="h-5 w-2/3 rounded bg-white/10" />
                    <div className="mt-4 h-4 w-full rounded bg-white/10" />
                    <div className="mt-2 h-4 w-5/6 rounded bg-white/10" />
                    <div className="mt-6 h-24 rounded-2xl bg-white/10" />
                  </div>
                ))
              : topRepositories.length > 0
                ? topRepositories.map((repository) => <RepositoryCard key={repository.id} repository={repository} />)
                : <div className="rounded-[1.75rem] border border-white/8 bg-black/15 p-5 text-sm text-slate-300">Repository data is currently unavailable. <a href={profile.github} target="_blank" rel="noreferrer" className="text-cyanGlow underline underline-offset-4">Open GitHub profile</a></div>}
          </div>
        </div>

        <div className="grid gap-4 xl:grid-cols-2">
          <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4 shadow-softGlow">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.35em] text-cyanGlow/80">Latest activity</p>
                <p className="mt-2 text-sm text-slate-300">Recent public activity from GitHub.</p>
              </div>
              <RefreshCw aria-hidden="true" className={`h-4 w-4 text-cyanGlow ${loading ? 'animate-spin' : ''}`} />
            </div>
            <div className="mt-4 space-y-2">
              {activity.length > 0 ? activity.map((entry) => (
                <div key={`${entry.label}-${entry.occurredAt}`} className="rounded-xl border border-white/8 bg-black/15 p-3">
                  <p className="text-sm text-white">{entry.label}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.3em] text-slate-400">{entry.occurredAt}</p>
                </div>
              )) : <p className="rounded-xl border border-white/8 bg-black/15 p-3 text-sm text-slate-300">Recent activity is currently unavailable.</p>}
            </div>
          </div>

          <div className="space-y-2.5 rounded-[1.25rem] border border-white/10 bg-white/5 p-3 pb-2 shadow-softGlow">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.35em] text-cyanGlow/80">Contribution activity</p>
              <p className="mt-1.5 text-sm text-slate-300">One optional activity view, kept secondary to the repositories.</p>
            </div>
            <ExternalImage
              src={`https://ghchart.rshah.org/1f7afe/${username}`}
              alt="GitHub contribution graph for Sowmiya S"
              className="block w-full rounded-[0.95rem] border border-white/10 bg-midnight-900/80 p-1.5 object-contain max-h-[170px]"
              fallback="Contribution activity is currently unavailable."
            />
          </div>
        </div>

        <a href={profile.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm text-cyanGlow transition hover:text-white">
          View all repositories on GitHub
          <ExternalLink className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
