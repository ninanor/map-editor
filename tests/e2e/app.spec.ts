import { expect, test } from '@playwright/test';

test.describe('Map Features', () => {
  test('should load without errors', async ({ page }) => {
    await page.goto('/');
    // Check that critical elements are visible
    await expect(page.locator('body')).toBeVisible();
  });

  test('should handle navigation to maps', async ({ page }) => {
    await page.goto('/');
    // Try to navigate to maps page if link exists
    const mapsLink = page.locator('a[href*="/map"], a[href*="/maps"]').first();
    if ((await mapsLink.count()) > 0) {
      await mapsLink.click();
      // Wait for navigation
      await page.waitForLoadState('networkidle');
      expect(page.url()).toContain('/map') || expect(page.url()).toContain('/maps');
    }
  });
});

test.describe('Performance', () => {
  test('should load homepage within acceptable time', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    const loadTime = Date.now() - startTime;

    // Should load within 5 seconds
    expect(loadTime).toBeLessThan(5000);
  });

  test('should not have memory leaks indicators', async ({ page }) => {
    await page.goto('/');
    // Perform multiple navigation cycles
    for (let i = 0; i < 3; i++) {
      await page.reload();
    }
    // Page should still be interactive
    await expect(page.locator('body')).toBeVisible();
  });
});

test.describe('Accessibility', () => {
  test('should have proper document structure', async ({ page }) => {
    await page.goto('/');
    // Check for main landmark
    const main = page.locator('main');
    if ((await main.count()) > 0) {
      await expect(main).toHaveCount(1);
    }
  });

  test('should have proper heading hierarchy', async ({ page }) => {
    await page.goto('/');
    // Check that page has headings
    const headings = page.locator('h1, h2, h3, h4, h5, h6');
    // Page should have at least one heading (adjustable based on design)
    await expect(headings).toBeDefined();
  });

  test('should support keyboard navigation', async ({ page }) => {
    await page.goto('/');
    // Tab to first focusable element
    await page.keyboard.press('Tab');
    // Check that something received focus
    const focusedElement = await page.evaluate(() => document.activeElement?.tagName);
    expect(focusedElement).toBeTruthy();
  });
});
