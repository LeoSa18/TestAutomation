// @ts-check
import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Espera que el título contenga "Playwright"
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Hace clic en el link "Get started"
  await page.getByRole('link', { name: 'Get started' }).click();

  // Verifica que el heading "Installation" sea visible
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test('get started link https', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Toma captura de pantalla
  await page.screenshot({ path: 'lavoz-screenshot.png' });
});

test('get title of La Voz', async ({ page }) => {
  await page.goto('https://www.lavoz.com.ar');

  // Valida el título exacto de la página
  await expect(page).toHaveTitle('La Voz | Noticias de Córdoba, Argentina y el Mundo');

  // También podés usar una expresión regular si el título cambia a veces:
  // await expect(page).toHaveTitle(/La Voz/);

  await page.screenshot({ path: 'lavoz-screenshot.png' });
});

test('get element text', async ({ page }) => {
  await page.goto('https://www.mercadolibre.com.ar');

  const titulo = page.locator("#content >.t1").textContent()
  await expect(titulo).toBe("Mercado Libre Argentina")
});