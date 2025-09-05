import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { ProductPage } from '../pages/product.page';

test.describe('Carrito de compras', () => {

  test('Agregar un producto al carrito', async ({ page }) => {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);

    // Ir al home
    await homePage.goto();

    // Buscar producto
    await homePage.searchProduct('MacBook');

    // Seleccionar el primer resultado
    await page.click('a:has-text("MacBook")');

    // Agregar al carrito
    await productPage.addToCart();

    // Validar mensaje de éxito this is a test
    await expect(await productPage.successMessage()).toBeVisible();
  });

});
