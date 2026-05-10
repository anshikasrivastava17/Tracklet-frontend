import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

describe('API URL Configuration', () => {

  beforeEach(() => {
    vi.resetModules();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('should return localhost URL when running in development mode', async () => {
    vi.stubEnv('VITE_API_BASE_URL', '');
    const { api } = await import('./api');
    const url = api('/auth/login');
    expect(url).toBe('/auth/login'); // Proxied by Vite, so base is empty
  });

  it('should return the VITE_API_BASE_URL in production mode', async () => {
    vi.stubEnv('VITE_API_BASE_URL', 'https://my-prod-api.amazonaws.com');
    const { api } = await import('./api');
    
    const url = api('/products/track');
    expect(url).toBe('https://my-prod-api.amazonaws.com/products/track');
  });
});
