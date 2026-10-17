import { useEffect, useMemo, useState } from 'react';
import type {
  GitHubActivitySummary,
  GitHubLanguageSummary,
  GitHubProfileSummary,
  GitHubRepositorySummary,
} from '@/types';

type GitHubState = {
  profile: GitHubProfileSummary | null;
  repositories: GitHubRepositorySummary[];
  languages: GitHubLanguageSummary[];
  activity: GitHubActivitySummary[];
  loading: boolean;
  error: string | null;
};

const username = 'sowmiiiiyaa';

const activityLabels: Record<string, string> = {
  PushEvent: 'Pushed code to',
  CreateEvent: 'Created a branch or repository in',
  PullRequestEvent: 'Opened a pull request in',
  IssuesEvent: 'Updated an issue in',
  WatchEvent: 'Starred a repository in',
  ForkEvent: 'Forked a repository in',
};

function timeAgo(value: string) {
  const diff = Date.now() - new Date(value).getTime();
  const minutes = Math.max(1, Math.floor(diff / 60000));
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

function sortLanguages(repositories: GitHubRepositorySummary[]) {
  const counts = new Map<string, number>();

  repositories.forEach((repo) => {
    if (!repo.language) return;
    counts.set(repo.language, (counts.get(repo.language) ?? 0) + 1);
  });

  return Array.from(counts.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((left, right) => right.count - left.count || left.name.localeCompare(right.name))
    .slice(0, 6);
}

export function useGitHubData() {
  const [state, setState] = useState<GitHubState>({
    profile: null,
    repositories: [],
    languages: [],
    activity: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    const controller = new AbortController();

    const load = async () => {
      try {
        const [profileResponse, repoResponse, activityResponse] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`, {
            signal: controller.signal,
            headers: { Accept: 'application/vnd.github+json' },
          }),
          fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=pushed`, {
            signal: controller.signal,
            headers: { Accept: 'application/vnd.github+json' },
          }),
          fetch(`https://api.github.com/users/${username}/events/public?per_page=10`, {
            signal: controller.signal,
            headers: { Accept: 'application/vnd.github+json' },
          }),
        ]);

        if (!profileResponse.ok || !repoResponse.ok || !activityResponse.ok) {
          throw new Error('GitHub profile data could not be loaded right now.');
        }

        const profileJson = (await profileResponse.json()) as GitHubProfileSummary;
        const reposJson = (await repoResponse.json()) as GitHubRepositorySummary[];
        const activityJson = (await activityResponse.json()) as Array<{
          type: string;
          repo?: { name?: string };
          created_at: string;
        }>;

        const activity = activityJson.slice(0, 6).map((event) => ({
          label: `${activityLabels[event.type] ?? 'Updated activity in'} ${event.repo?.name ?? 'a repository'}`,
          repo: event.repo?.name,
          occurredAt: timeAgo(event.created_at),
        }));

        setState({
          profile: profileJson,
          repositories: reposJson,
          languages: sortLanguages(reposJson),
          activity,
          loading: false,
          error: null,
        });
      } catch (error) {
        if (controller.signal.aborted) return;
        setState((current) => ({
          ...current,
          loading: false,
          error: error instanceof Error ? error.message : 'Failed to load GitHub data.',
        }));
      }
    };

    load();

    return () => controller.abort();
  }, []);

  const topRepositories = useMemo(
    () =>
      [...state.repositories]
        .sort((left, right) => new Date(right.pushed_at).getTime() - new Date(left.pushed_at).getTime())
        .slice(0, 6),
    [state.repositories],
  );

  return {
    ...state,
    topRepositories,
    username,
  };
}