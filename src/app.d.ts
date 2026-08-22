import type { DbCookieTokenWithUser } from '$lib/server/repositories/cookie-tokens';

// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
  namespace App {
    interface Locals {
      user?: {
        id: string;
        name: string;
      };
      session?: DbCookieTokenWithUser;
    }

    // interface Error {}
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }

  /* Install prompt */
  interface Window {
    /**
     * Set via `app.html`
     */
    installPrompt?: { prompt: () => Promise<{ outcome: unknown }> };
  }
}

export {};
