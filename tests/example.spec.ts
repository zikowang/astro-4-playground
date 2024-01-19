import { expect, test } from "@playwright/test";

import { BASE_URL } from "./test-config";

test("has title", async ({ page }) => {
    await page.goto(BASE_URL);

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/ElectionsLive/);
});

test("Election list link", async ({ page }) => {
    await page.goto(BASE_URL);

    // Click the Pokemon link.
    await page.getByRole("link", { name: "DE Bundetagswahl 2021" }).click();

    // Expects page to have a heading with the name of List
    await expect(page.getByRole("heading", { name: "Bars" })).toBeVisible();
});
