import { motion } from 'framer-motion';
import { ExternalLink, Github, RefreshCw } from 'lucide-react';
import { profile, projects } from '@/data/siteData';
import { useGitHubData } from '@/hooks/useGitHubData';

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
  const { topRepositories, activity, loading, error } = useGitHubData();

  return (
    <section id="github" className="section-shell">
      <div className="space-y-5">
        <div className="max-w-3xl space-y-2">
          <p className="font-mono text-xs uppercase tracking-[0.35em] text-cyanGlow/80">GitHub</p>
          <h2 className="font-display text-3xl font-semibold text-white md:text-4xl">Code, context, and activity.</h2>
        </div>

        <div className="space-y-3 rounded-xl border border-white/10 bg-white/5 p-3 shadow-softGlow">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.35em] text-cyanGlow/80">Relevant repositories</p>
              <p className="mt-2 text-sm text-slate-300">Public code, project context, and implementation details.</p>
            </div>
            <a href={profile.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-white transition hover:border-electric/40 hover:bg-electric/10">
              <Github className="h-4 w-4" aria-hidden="true" />
              Open Profile
            </a>
          </div>

          <div className="grid gap-3 lg:grid-cols-2 2xl:grid-cols-3">
            {loading && topRepositories.length === 0
              ? <div className="rounded-xl border border-white/8 bg-black/15 p-4 text-sm text-slate-300">Checking GitHub data…</div>
              : topRepositories.length > 0
                ? topRepositories.map((repository) => <RepositoryCard key={repository.id} repository={repository} />)
                : <div className="grid gap-3 md:grid-cols-[1fr_auto] rounded-xl border border-white/8 bg-black/15 p-4">
                    <div>
                      <p className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-cyanGlow/80">Verified project fallback</p>
                      <h3 className="mt-2 font-display text-lg font-semibold text-white">{projects[0].name}</h3>
                      <p className="mt-1 text-sm leading-5 text-slate-300">{projects[0].description}</p>
                    </div>
                    <a href={projects[0].github} target="_blank" rel="noreferrer" className="inline-flex h-fit items-center justify-center gap-2 rounded-full border border-electric/30 bg-electric px-3 py-2 text-sm font-semibold text-midnight-900">
                      Open repository <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>}
          </div>
        </div>

        <div className="grid gap-3 xl:grid-cols-2">
          <div className="rounded-xl border border-white/10 bg-white/5 p-3 shadow-softGlow">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.35em] text-cyanGlow/80">Latest activity</p>
                <p className="mt-2 text-sm text-slate-300">Recent public activity, when available.</p>
              </div>
              <RefreshCw aria-hidden="true" className={`h-4 w-4 text-cyanGlow ${loading ? 'animate-spin' : ''}`} />
            </div>
            <div className="mt-3 space-y-2">
              {activity.length > 0 ? activity.map((entry, index) => (
                <div key={`${entry.label}-${entry.occurredAt}-${index}`} className="rounded-xl border border-white/8 bg-black/15 p-3">
                  <p className="text-sm text-white">{entry.label}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.3em] text-slate-400">{entry.occurredAt}</p>
                </div>
              )) : <p className="rounded-xl border border-white/8 bg-black/15 p-3 text-sm text-slate-300">Recent activity is currently unavailable.</p>}
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-3 shadow-softGlow">
            <p className="font-mono text-xs uppercase tracking-[0.35em] text-cyanGlow/80">Live data status</p>
            <p className="mt-2 text-sm leading-5 text-slate-300">
              {error ?? (loading ? 'Checking GitHub activity…' : 'Repository and activity data loaded.')}
            </p>
            <p className="mt-3 text-xs leading-5 text-slate-500">Contribution activity is shown only when backed by a successful live response.</p>
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
