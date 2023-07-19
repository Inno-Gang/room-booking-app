import { expect, test } from "@playwright/test";

test("has links", async ({ page }) => {
  await page.goto("/");

  await expect(page.locator("text=New booking")).toBeVisible();
  await expect(page.locator("text=My bookings")).toBeVisible();
});

test("booking creation", async ({ page }) => {
  await page.goto("/");

  // Fill and submit the form
  // FIXME: .fill("...") fails sometimes for some reason, but with .type("...") everything is OK
  await page.locator("input[name=title]").type("This is my test booking!");
  await page.getByRole("button", { name: "book the room" }).click();

  // Check it is not on the current view
  await expect(page.locator("text=This is my test")).not.toBeVisible();

  // Check that booking has been added in the "My bookings" tab
  await page.locator("text=My bookings").click();
  await expect(page.locator("text=This is my test")).toBeVisible();
});
