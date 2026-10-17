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
      className="group block rounded-xl border border-white/10 bg-black/15 p-3 transition hover:-translate-y-0.5 hover:border-electric/40 hover:bg-electric/10"
      whileHover={{ scale: 1.01 }}
    >
      <div className="flex items-center justify-between gap-3">
        <h3 className="truncate font-display text-base font-semibold text-white">{repository.name}</h3>
        <Github className="h-4 w-4 shrink-0 text-cyanGlow" aria-hidden="true" />
      </div>
      <p className="mt-1.5 line-clamp-2 text-sm leading-5 text-slate-300">
        {repository.description ?? 'Description not available.'}
      </p>
      <div className="mt-2 flex flex-wrap gap-1.5 text-[0.68rem] text-slate-200">
        {repository.language ? <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1">{repository.language}</span> : null}
        <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1">Stars {repository.stargazers_count}</span>
        <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1">Forks {repository.forks_count}</span>
      </div>
    </motion.a>
  );
}

export function GitHubSection() {
  const { topRepositories, activity, loading, errors, retryAt, retry, retryDisabled } = useGitHubData();
  const retryMessage = retryAt
    ? `Try again after ${new Date(retryAt).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}.`
    : null;

  return (
    <section id="github" className="section-shell">
      <div className="space-y-4">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div className="space-y-1.5">
            <p className="font-mono text-xs uppercase tracking-[0.35em] text-cyanGlow/80">GitHub</p>
            <h2 className="font-display text-3xl font-semibold text-white md:text-4xl">Code in the open.</h2>
            <p className="text-sm text-slate-300">Public repositories and recent activity.</p>
          </div>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-white transition hover:border-electric/40 hover:bg-electric/10"
          >
            <Github className="h-4 w-4" aria-hidden="true" />
            Open Profile
          </a>
        </div>

        <div className="grid items-start gap-3 lg:grid-cols-2">
          <div className="rounded-xl border border-white/10 bg-white/5 p-3 shadow-softGlow">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-cyanGlow/80">Repositories</p>
                <p className="mt-1 text-sm text-slate-300">Public code and project context.</p>
              </div>
              <a href={profile.github} target="_blank" rel="noreferrer" className="text-xs text-cyanGlow transition hover:text-white">
                View all
              </a>
            </div>

            <div className="mt-3 grid gap-2">
              {loading && topRepositories.length === 0 ? (
                <p className="rounded-lg border border-white/8 bg-black/15 p-3 text-sm text-slate-300">Checking repositories…</p>
              ) : topRepositories.length > 0 ? (
                topRepositories.map((repository) => <RepositoryCard key={repository.id} repository={repository} />)
              ) : (
                <div className="rounded-lg border border-white/8 bg-black/15 p-3">
                  <p className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-cyanGlow/80">Verified project fallback</p>
                  <h3 className="mt-1.5 font-display text-base font-semibold text-white">{projects[0].name}</h3>
                  <p className="mt-1 text-sm leading-5 text-slate-300">{projects[0].description}</p>
                  <a
                    href={projects[0].github}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-cyanGlow transition hover:text-white"
                  >
                    Open repository <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              )}
            </div>
            {errors.repositories ? <p className="mt-2 text-xs text-amber-200">{errors.repositories.message}</p> : null}
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-3 shadow-softGlow">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-cyanGlow/80">Recent Activity</p>
                <p className="mt-1 text-sm text-slate-300">Public events, when available.</p>
              </div>
              <RefreshCw aria-hidden="true" className={`h-4 w-4 text-cyanGlow ${loading ? 'animate-spin' : ''}`} />
            </div>

            <div className="mt-3 space-y-2">
              {loading && activity.length === 0 ? (
                <p className="rounded-lg border border-white/8 bg-black/15 p-3 text-sm text-slate-300">Checking recent activity…</p>
              ) : activity.length > 0 ? (
                activity.map((entry, index) => (
                  <div key={`${entry.label}-${entry.occurredAt}-${index}`} className="rounded-lg border border-white/8 bg-black/15 p-2.5">
                    <p className="text-sm text-white">{entry.label}</p>
                    <p className="mt-1 text-[0.68rem] uppercase tracking-[0.25em] text-slate-400">{entry.occurredAt}</p>
                  </div>
                ))
              ) : (
                <p className="rounded-lg border border-white/8 bg-black/15 p-3 text-sm text-slate-300">
                  {errors.activity?.message ?? 'No recent public activity was returned.'}
                </p>
              )}
            </div>

            <div className="mt-3 border-t border-white/10 pt-3">
              <p className="text-xs text-slate-400">{loading ? 'Checking GitHub data…' : errors.profile?.message ?? 'Profile data loaded.'}</p>
              {retryMessage ? <p className="mt-1 text-xs text-amber-200">{retryMessage}</p> : null}
              <button
                type="button"
                onClick={retry}
                disabled={retryDisabled}
                className="focus-ring mt-2 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white transition hover:border-electric/40 hover:bg-electric/10 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <RefreshCw aria-hidden="true" className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} />
                {loading ? 'Loading…' : 'Retry'}
              </button>
            </div>
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
