import { authStore } from './authStore';

export function isAuthenticated<T extends (...args: any[]) => Promise<any>>(fn: T): T {
  return (async (...args: any[]) => {
    const { isAuthenticated } = authStore.getState();
    if (!isAuthenticated) {
      throw new Error('Unauthorized: Please login.');
    }
    return await fn(...args);
  }) as T;
}
