import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';





test.describe('Login tests', () => {
  
  test('Login con credenciales válidas', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Ir a la página de login
    await loginPage.goto();

    // Hacer login
    await loginPage.login('karina.cortina@superdot.io', 'Nala151124');

    // Validar login exitoso
    await expect(page).toHaveURL(/route=account\/account/);
    await expect(page.getByRole('link', { name: /Logout/i })).toBeVisible();
  });

});
