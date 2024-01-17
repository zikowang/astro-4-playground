import { test, expect } from "@playwright/test";

import { BASE_URL } from "./test-config";

test("has title", async ({ page }) => {
  await page.goto(BASE_URL);

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Astro/);
});

test("Pokemon list link", async ({ page }) => {
  await page.goto(BASE_URL);

  // Click the Pokemon link.
  await page.getByRole("link", { name: "Pokemon" }).click();

  // Expects page to have a heading with the name of List
  await expect(page.getByRole("heading", { name: "List" })).toBeVisible();
});

test("Pokemon link", async ({ page }) => {
  await page.goto(BASE_URL);

  // Click the Pokemon List link.
  await page.getByRole("link", { name: "Pokemon" }).click();

  // Expects page to have a heading with the name of List
  await expect(page.getByRole("heading", { name: "List" })).toBeVisible();

  // Click the Bulbasaur link.
  await page.getByRole("link", { name: "Bulbasaur" }).click();

  // Expects page to have a heading with the name of Bulbasaur
  await expect(page.getByRole("heading", { name: "Bulbasaur2" })).toBeVisible();
});
