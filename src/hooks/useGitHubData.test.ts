import { afterEach, describe, expect, it, vi } from 'vitest';
import { fetchEndpoint, getEndpointError, getRetryAt } from './useGitHubData';

function response(body: unknown, status = 200, headers: Record<string, string> = {}) {
  return new Response(JSON.stringify(body), { status, headers });
}

describe('GitHub endpoint loading', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('keeps profile success independent from repository failure', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch')
      .mockResolvedValueOnce(response({ login: 'sowmiiiiyaa' }))
      .mockResolvedValueOnce(response({ message: 'rate limit exceeded' }, 403, {
        'X-RateLimit-Remaining': '0',
        'X-RateLimit-Reset': '1792263202',
      }));
    const controller = new AbortController();

    const [profile, repositories] = await Promise.all([
      fetchEndpoint<{ login: string }>('/profile', 'profile', controller.signal),
      fetchEndpoint<unknown[]>('/repositories', 'repositories', controller.signal),
    ]);

    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(profile).toEqual({ data: { login: 'sowmiiiiyaa' } });
    expect(repositories.error?.message).toContain('Repositories is rate-limited');
    expect(repositories.error?.retryAt).toBe(1792263202000);
  });

  it('returns an honest empty activity result on a successful empty response', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(response([]));

    await expect(fetchEndpoint<unknown[]>('/activity', 'activity', new AbortController().signal))
      .resolves.toEqual({ data: [] });
  });

  it('ignores missing or invalid rate-limit reset headers', () => {
    const missing = response({}, 403, { 'X-RateLimit-Remaining': '0' });
    const invalid = response({}, 403, {
      'X-RateLimit-Remaining': '0',
      'X-RateLimit-Reset': 'not-a-time',
    });

    expect(getRetryAt(missing)).toBeUndefined();
    expect(getRetryAt(invalid)).toBeUndefined();
    expect(getEndpointError(invalid, 'activity').message).toContain('Recent activity is rate-limited');
  });

  it('returns endpoint-specific errors for non-rate-limit failures', () => {
    const error = getEndpointError(response({}, 500), 'profile');

    expect(error.message).toBe('Profile could not be loaded (HTTP 500).');
    expect(error.retryAt).toBeUndefined();
  });
});
