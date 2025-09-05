import { test, expect } from '@playwright/test';

test.describe('My first tests', () => {
    test('Home → Add iPhone to cart (OpenCart)', async ({ page }) => {
      await page.goto('https://opencart.abstracta.us/');
      await page.screenshot({ path: "Capturas/" + Date.now() + "_screenshot.jpg" });

      // Locate the iPhone product card in the Featured list on Home
      const iphoneCard = page
        .locator('.product-layout')
        .filter({ has: page.getByRole('link', { name: /^iPhone$/ }) });

      await expect(iphoneCard).toBeVisible();

      // Click its "Add to Cart" button.
      // Option A (scoped to card, robust):
      await iphoneCard.locator('button[onclick^="cart.add"]').click();

      // --- If you prefer targeting the specific product_id (40), use this instead: ---
      // await iphoneCard.locator('button[onclick*="cart.add(\'40\')"]').click();

      // Validate success alert mentions iPhone
      const success = page.locator('.alert-success');
      await expect(success).toBeVisible();
      await expect(success).toContainText(/success:.*added.*iphone/i);

      // Validate cart counter shows 1 item
      await expect(page.locator('#cart-total')).toContainText(/1 item\(s\)/i);

      // (Optional) Open mini-cart and verify iPhone appears
      await page.locator('#cart > button').click();
      await expect(page.locator('#cart .dropdown-menu')).toContainText(/iPhone/i);

      // Mantén el navegador abierto
      await page.waitForTimeout(5000);
    });
    
    test('Navigate to Tablets category from menu', async ({ page }) => {
      // 1) Ir a home
      await page.goto('https://opencart.abstracta.us/');

      // 2) Clic en el link "Tablets"
      await page.getByRole('link', { name: /^Tablets$/ }).click();

      // 3) Verificar que la URL es la de Tablets
      await expect(page).toHaveURL(/route=product\/category&path=57/);

      // 4) Verificar que aparece el título "Tablets"
      await expect(page.getByRole('heading', { name: 'Tablets' })).toBeVisible();

      // Mostrar que hay productos listados
      const products = page.locator('.product-layout');
      await expect(products).toHaveCount(1); // en OpenCart demo solo hay un tablet
      await expect(products).toContainText(/Samsung Galaxy Tab 10\.1/);

      // Pausa para inspeccionar en navegador
      await page.waitForTimeout(5000);
    });

    test('Login with valid credentials', async ({ page }) => {
      // Ir a la página de login
      await page.goto('https://opencart.abstracta.us/index.php?route=account/login');

      // Llenar email y password
      await page.locator('#input-email').fill('karina.cortina@superdot.io');      
      await page.locator('#input-password').fill('Nala151124'); 

      // Hacer click en Login
      await page.locator('input[type="submit"][value="Login"]').click();

      // Validar que el login fue exitoso (URL + botón de Logout visible)
      await expect(page).toHaveURL(/route=account\/account/);
      await expect(page.getByRole('link', { name: /Logout/i })).toBeVisible();

      // pausa
      await page.waitForTimeout(5000);
    });
});    