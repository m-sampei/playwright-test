import { test, expect } from '@playwright/test';

/**
 * 年齢を計算
 */
test('test', async ({ page }) => {
    await page.goto('https://keisan.casio.jp/exec/system/1233283157');

    console.log("秋山 幸二","1962-04-06");
    await page.locator('#var_year').fill("1962");
    await page.locator('#var_m1').selectOption("4");
    await page.locator('#var_d1').selectOption("6");
    await page.locator('#var_year2').fill('2024');
    await page.locator('#var_m2').selectOption('3');
    await page.locator('#var_d2').selectOption('31');
    await page.getByRole('button', { name: '計 算' }).click();
    let age = await page.innerText("[id='ans0']");
    expect(age).toBe('61');
    console.log('満年齢: ' + age + '歳');
});


