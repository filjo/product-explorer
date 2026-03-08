import { expect } from "detox";

describe("Favorites flow", () => {
  beforeAll(async () => {
    await device.launchApp({ newInstance: true, delete: true });
  });

  it("launches app, opens product, favorites it, and verifies state", async () => {
    await waitFor(element(by.id("products-product-card")).atIndex(0))
      .toBeVisible()
      .withTimeout(20000);

    await element(by.id("products-product-card")).atIndex(0).tap();

    await waitFor(element(by.id("favorite-button-navigation")))
      .toBeVisible()
      .withTimeout(10000);
    await element(by.id("favorite-button-navigation")).tap();

    await device.terminateApp();
    await device.launchApp({ newInstance: true });

    await waitFor(element(by.id("tab-favorites")))
      .toBeVisible()
      .withTimeout(10000);
    await element(by.id("tab-favorites")).tap();

    await waitFor(element(by.id("favorites-product-card")).atIndex(0))
      .toBeVisible()
      .withTimeout(10000);
    await expect(element(by.text("No favorites yet"))).not.toExist();
  });
});
