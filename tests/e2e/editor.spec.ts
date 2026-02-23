import { expect, test } from '@playwright/test';

test.describe('OGC Records Page', () => {
  test('should navigate to OGC Records page', async ({ page }) => {
    // Navigate directly to the OGC Records page
    await page.goto('/editor/edit/layers/ogc');

    // Wait for page to load
    await page.waitForLoadState('networkidle');

    // Check that page content is loaded (if redirected, would be on homepage)
    const url = page.url();
    expect(url).toContain('/editor/edit/layers/ogc');

    // Check that the page contains the search title
    const title = page.locator('h2');
    await expect(title).toContainText(/Search OGC Records/i);
  });
});
