import { LOK_DEVICE_IDENTIFIER_KEY } from '$lib/std/auth';
import test, { expect } from '@playwright/test';

test('has nothing when missing join code', async ({ page }) => {
  await page.goto('/join');
  await expect(page).not.toHaveURL('/join');
});

test('has nothing when join code invalid', async ({ page }) => {
  await page.goto('/join?code=not_lighthouse');
  await expect(page.getByText('not valid')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Jump In' })).not.toBeVisible();
});

test('has nothing when join code expired', async ({ page }) => {
  await page.goto('/join?code=expired_lighthouse');
  await expect(page.getByText('not valid')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Jump In' })).not.toBeVisible();
});

test('redirects when user already is in group', async ({ page }) => {
  await page.goto('/join?code=join_lighthouse', { waitUntil: 'commit' });
  await page.localStorage.setItem(LOK_DEVICE_IDENTIFIER_KEY, 'smiths_device');
  await expect(page).toHaveURL('/join?code=join_lighthouse');
  await page.reload();
  await expect(page).toHaveURL('/?g=lighthouse');
});

test('has filled name if user already exists', async ({ page }) => {
  await page.goto('/join?code=join_lighthouse', { waitUntil: 'commit' });
  await page.localStorage.setItem(LOK_DEVICE_IDENTIFIER_KEY, 'alices_device');
  await page.reload();
  const nameField = page.getByLabel('Name');
  await expect(nameField).toHaveAttribute('readonly');
  await expect(nameField).toHaveValue('alice');
  await page.getByRole('button').click();
  await expect(page).toHaveURL('/?g=lighthouse');
});

test('registers if user does not exist', async ({ page }) => {
  await page.goto('/join?code=join_lighthouse');
  const nameField = page.getByLabel('Name');
  await expect(nameField).toBeEmpty();
  await nameField.fill('john');
  await page.getByRole('button').click();
  await expect(page).toHaveURL('/');
});
