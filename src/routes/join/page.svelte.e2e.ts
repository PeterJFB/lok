import { LOK_AUTH_COOKIE_NAME, LOK_DEVICE_IDENTIFIER_KEY } from '$lib/client/auth';
import test, { expect } from '@playwright/test';

test('has expected h1', async ({ page }) => {
  await page.goto('/join');
  await expect(page.locator('h1')).toBeVisible();
});

// test('has nothing when missing join code', async ({ page }) => {});

test('redirects when user already is in group', async ({ page }) => {
  await page.goto('/join?code=join_lighthouse', { waitUntil: 'commit' });
  await page.localStorage.setItem(LOK_AUTH_COOKIE_NAME, 'smiths_device');
  await page.reload();
});

test('has filled name if user already exists', async ({ page }) => {
  await page.goto('/join?code=join_lighthouse', { waitUntil: 'commit' });
  await page.localStorage.setItem(LOK_DEVICE_IDENTIFIER_KEY, 'alices_device');
  await page.reload();
  await expect(page.getByLabel('Name')).toBeDisabled();
});

test('registers if user does not exist', async ({ page }) => {
  await page.goto('/join?code=join_lighthouse');
  await expect(page.getByLabel('Name')).toBeEmpty();
});
