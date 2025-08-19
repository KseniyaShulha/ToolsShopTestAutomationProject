import { request } from '@playwright/test';

export async function apiRequest(method: string, url: string, data?: any, token?: string) {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const response = await request.newContext().then(ctx => 
    ctx[method.toLowerCase()](url, { data, headers })
  );

  return response;
}