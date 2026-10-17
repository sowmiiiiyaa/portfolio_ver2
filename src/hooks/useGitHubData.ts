import { useEffect, useMemo, useState } from 'react';
import type {
  GitHubActivitySummary,
  GitHubLanguageSummary,
  GitHubProfileSummary,
  GitHubRepositorySummary,
} from '@/types';

type GitHubEndpoint = 'profile' | 'repositories' | 'activity';

type GitHubEndpointError = {
  message: string;
  retryAt?: number;
};

type GitHubState = {
  profile: GitHubProfileSummary | null;
  repositories: GitHubRepositorySummary[];
  languages: GitHubLanguageSummary[];
  activity: GitHubActivitySummary[];
  loading: boolean;
  errors: Partial<Record<GitHubEndpoint, GitHubEndpointError>>;
  retryAt: number | null;
};

type GitHubEvent = {
  type: string;
  repo?: { name?: string };
  created_at: string;
};

type EndpointResult<T> =
  | { data: T; error?: never }
  | { data?: never; error: GitHubEndpointError };

const username = 'sowmiiiiyaa';
const retryCooldownMs = 5000;

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

export function getRetryAt(response: Response) {
  const reset = Number(response.headers.get('X-RateLimit-Reset'));
  return Number.isFinite(reset) && reset > 0 ? reset * 1000 : undefined;
}

export function getEndpointError(response: Response, endpoint: GitHubEndpoint): GitHubEndpointError {
  const retryAt = response.status === 403 ? getRetryAt(response) : undefined;
  if (response.status === 403 && response.headers.get('X-RateLimit-Remaining') === '0') {
    return {
      message: `${endpoint === 'activity' ? 'Recent activity' : endpoint === 'repositories' ? 'Repositories' : 'Profile'} is rate-limited by GitHub.`,
      retryAt,
    };
  }

  return {
    message: `${endpoint === 'activity' ? 'Recent activity' : endpoint === 'repositories' ? 'Repositories' : 'Profile'} could not be loaded (HTTP ${response.status}).`,
    retryAt,
  };
}

export async function fetchEndpoint<T>(url: string, endpoint: GitHubEndpoint, signal: AbortSignal): Promise<EndpointResult<T>> {
  try {
    const response = await fetch(url, {
      signal,
      headers: { Accept: 'application/vnd.github+json' },
    });

    if (!response.ok) {
      return { error: getEndpointError(response, endpoint) };
    }

    return { data: (await response.json()) as T };
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') throw error;
    return {
      error: {
        message: `${endpoint === 'activity' ? 'Recent activity' : endpoint === 'repositories' ? 'Repositories' : 'Profile'} could not be loaded. Check your connection and try again.`,
      },
    };
  }
}

export function useGitHubData() {
  const [retryKey, setRetryKey] = useState(0);
  const [cooldownUntil, setCooldownUntil] = useState(0);
  const [state, setState] = useState<GitHubState>({
    profile: null,
    repositories: [],
    languages: [],
    activity: [],
    loading: true,
    errors: {},
    retryAt: null,
  });

  useEffect(() => {
    const controller = new AbortController();

    const load = async () => {
      setState((current) => ({ ...current, loading: true, errors: {}, retryAt: null }));

      const [profileResult, repositoriesResult, activityResult] = await Promise.all([
        fetchEndpoint<GitHubProfileSummary>(`https://api.github.com/users/${username}`, 'profile', controller.signal),
        fetchEndpoint<GitHubRepositorySummary[]>(`https://api.github.com/users/${username}/repos?per_page=100&sort=pushed`, 'repositories', controller.signal),
        fetchEndpoint<GitHubEvent[]>(`https://api.github.com/users/${username}/events/public?per_page=10`, 'activity', controller.signal),
      ]);

      if (controller.signal.aborted) return;

      const errors: GitHubState['errors'] = {};
      const retryTimes = [profileResult, repositoriesResult, activityResult]
        .map((result) => result.error?.retryAt)
        .filter((value): value is number => typeof value === 'number');

      if (profileResult.error) errors.profile = profileResult.error;
      if (repositoriesResult.error) errors.repositories = repositoriesResult.error;
      if (activityResult.error) errors.activity = activityResult.error;

      const repositories = repositoriesResult.data ?? [];
      const activity = (activityResult.data ?? []).slice(0, 6).map((event) => ({
        label: `${activityLabels[event.type] ?? 'Updated activity in'} ${event.repo?.name ?? 'a repository'}`,
        repo: event.repo?.name,
        occurredAt: timeAgo(event.created_at),
      }));

      setState({
        profile: profileResult.data ?? null,
        repositories,
        languages: sortLanguages(repositories),
        activity,
        loading: false,
        errors,
        retryAt: retryTimes.length > 0 ? Math.min(...retryTimes) : null,
      });
    };

    void load();
    return () => controller.abort();
  }, [retryKey]);

  const topRepositories = useMemo(
    () =>
      [...state.repositories]
        .sort((left, right) => new Date(right.pushed_at).getTime() - new Date(left.pushed_at).getTime())
        .slice(0, 6),
    [state.repositories],
  );

  const retry = () => {
    if (state.loading || Date.now() < cooldownUntil) return;
    const nextCooldown = Date.now() + retryCooldownMs;
    setCooldownUntil(nextCooldown);
    setRetryKey((current) => current + 1);
  };

  return {
    ...state,
    topRepositories,
    username,
    retry,
    retryDisabled: state.loading || Date.now() < cooldownUntil,
  };
}
