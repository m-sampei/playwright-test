import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';
// import { parse } from 'csv-parse';

test('test', async ({ page }) => {
    await page.goto('https://keisan.casio.jp/exec/system/1233283157');
    const csvData = fs.readFileSync(path.join(__dirname, './player_birthday.csv')).toString();
    const lines = csvData.split('\n');
    for (const line of lines) {
        const arr = line.split(',');
        console.log(arr[0] + arr[1]);
        let birthdayStr: string = String(arr[2]).replace('"', '');
        let birthdayArr = birthdayStr.split('-');
        console.log(birthdayArr);
        var month = String(birthdayArr[1]).replace('"', '');
        if (month[0] == '0') {
            month = month.replace('0', '');
        }
        var day = String(birthdayArr[2]).replace('"', '');
        if (day[0] == '0') {
            day = day.replace('0', '');
        }
        await page.locator('#var_year').click();
        await page.locator('#var_year').fill(birthdayArr[0]);
        await page.locator('#var_m1').selectOption(month);
        await page.locator('#var_d1').selectOption(day);
        await page.locator('#var_year2').fill('2024');
        await page.locator('#var_m2').selectOption('3');
        await page.locator('#var_d2').selectOption('31');
        await page.getByRole('button', { name: '計 算' }).click();
        let age = await page.innerText("[id='ans0']");
        console.log('満年齢: ' + age + '歳');
        await page.getByRole('button', { name: 'クリア' }).click();
    }
});


