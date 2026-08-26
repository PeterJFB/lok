import type { DbCookieTokenWithUser } from '$lib/server/repositories/cookie-tokens';

// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
  namespace App {
    interface Locals {
      /**
       * Injected at hooks.server.ts if a valid cookie is provided with the request.
       */
      user?: {
        id: string;
        name: string;
      };
      /**
       * Injected at hooks.server.ts if a valid cookie is provided with the request.
       */
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
