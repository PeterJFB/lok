# Lok

# sv

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```sh
# create a new project
npx sv create my-app
```

To recreate this project with the same configuration:

```sh
# recreate this project
pnpm dlx sv@0.16.1 create --template minimal --types ts --add prettier eslint vitest="usages:unit,component" playwright sveltekit-adapter="adapter:node" drizzle="database:sqlite+sqlite:libsql" better-auth="demo:password" --install pnpm lok
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```sh
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```sh
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.

## Installation message:

│ playwright: │
│ - Run npx playwright install to download browsers │
│ - Visit /demo/playwright to see the demo page │
│ - Run npm run test:e2e to execute the example tests │
│ drizzle: │
│ - Check DATABASE_URL in .env and adjust it to your needs │
│ - Run pnpm run db:push to update your database schema │
│ better-auth: │
│ - Run pnpm run auth:schema to generate the auth schema │
│ - Run pnpm run db:push to update your database │
│ - Check ORIGIN & BETTER_AUTH_SECRET in .env and adjust it to your needs │
│ - Visit /demo/better-auth route to view the demo

## Passkeys

- https://passkeys.dev/docs/tools-libraries/libraries/
- https://simplewebauthn.dev/docs/packages/browser
- https://github.com/w3c/webauthn/blob/main/explainers/conditional-ui.md
