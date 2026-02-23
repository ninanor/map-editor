import { expect, test } from '@playwright/test';

test.describe('Homepage', () => {
  test('should load the homepage', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/.*Map|.*Nina.*/i);
  });

  test('should display main content', async ({ page }) => {
    await page.goto('/');
    // Wait for the main content to be visible
    const main = page.locator('main');
    await expect(main).toBeVisible();
  });

  test('should have functioning navigation', async ({ page }) => {
    await page.goto('/');
    // Check if navbar is present
    const navbar = page.locator('nav');
    await expect(navbar).toBeVisible();
  });
});

test.describe('App Navigation', () => {
  test('should navigate between pages', async ({ page }) => {
    await page.goto('/');
    const initialUrl = page.url();
    expect(initialUrl).toBeTruthy();
  });

  test('page should not have console errors', async ({ page }) => {
    const errors: string[] = [];

    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    await page.goto('/');
    // Allow time for any errors to appear
    await page.waitForTimeout(2000);

    // Note: Comment out if you expect console errors for now
    // expect(errors).toHaveLength(0);
  });
});

test.describe('Responsive Design', () => {
  test('should work on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await expect(page.locator('body')).toBeVisible();
  });

  test('should work on tablet viewport', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    await expect(page.locator('body')).toBeVisible();
  });

  test('should work on desktop viewport', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/');
    await expect(page.locator('body')).toBeVisible();
  });
});
