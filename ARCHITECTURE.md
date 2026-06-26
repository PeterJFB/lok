# Lok Architecture

- SvelteKit Application
  - Node Adapter
  - Compile/encourage to run as PWA
- Drizzle Database

## UX

- [ ] Download PWA prompt
  - https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable#installation_from_the_web
- [ ] Create User info screen
- [ ] Profile Details Screen
- [ ] Calendar view
- [ ] See/Add Lok Details

## Features

- [x] Install as PWA
- [x] Detect if PWA or not
- [x] Open link in PWA? Only supported on Android
- [ ] Create Invite Code
- [ ] Create token
- [ ] Register Device with token/code
- [ ] Get/Set User information
- [ ] Get Calendar info given a timespan
- [ ] Set Calendar info
- [ ] Deploy

## Identity Ceremonies

### Registration

- User installs application as PWA?
- Administrator creates invite url to group
- User clicks url
- Browser check if in PWA, if not, asks to install/copy code.
- If in PWA, tries to get user info (determines if signed in)
- User enters information
- Registration successful
