import { Item, GildedRose } from "@/gilded-rose";

describe("Gilded Rose", () => {
  it("Should decrease the quality and selIn by the normal rate", () => {
    const gildedRose = new GildedRose([new Item("foo", 2, 2)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(1);
    expect(items[0].sellIn).toBe(1);
  });

  it("Should decrease the quality twice as fast if the sellIn is lower than 0", () => {
    const gildedRose = new GildedRose([new Item("foo", 0, 2)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
    expect(items[0].sellIn).toBe(-1);
  });

  it("Should never have a negative quality", () => {
    const gildedRose = new GildedRose([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
  });
});

describe("Aged Brie", () => {
  it("Should increase the quality", () => {
    const gildedRose = new GildedRose([new Item("Aged Brie", 1, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(1);
  });

  it("Should never have a quality above 50", () => {
    const gildedRose = new GildedRose([new Item("Aged Brie", 0, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(50);
  });
});

describe("Sulfuras", () => {
  it("Should never be sold", () => {
    const gildedRose = new GildedRose([new Item("Sulfuras", 1, 0)]);
    let items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(0);
    items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(0);
  });

  it("Should never decrease in quality and stay at 80", () => {
    const gildedRose = new GildedRose([new Item("Sulfuras", 1, 80)]);
    let items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(80);
  });
});

describe("Backstage passes", () => {
  it("Should increase in quality with 1 above 10 days", () => {
    const gildedRose = new GildedRose([new Item("Backstage passes", 11, 1)]);
    let items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(2);
  });

  it("Should increase in quality with 2 under 10 days and above 5 days", () => {
    const gildedRose = new GildedRose([new Item("Backstage passes", 9, 1)]);
    let items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(3);
  });

  it("Should increase in quality with 3 under 5 days and above or 0 days", () => {
    const gildedRose = new GildedRose([new Item("Backstage passes", 9, 3)]);
    let items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(6);
  });

  it("Should drop the value to 0 after the event", () => {
    const gildedRose = new GildedRose([new Item("Backstage passes", 0, 3)]);
    let items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(0);
  });

  it("Should never have a quality above 50", () => {
    const gildedRose = new GildedRose([new Item("Backstage passes", 5, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(50);
  });
});

describe("Conjured", () => {
  it("Should decrease the quality and selIn by double the normal rate", () => {
    const gildedRose = new GildedRose([new Item("Conjured", 2, 2)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
    expect(items[0].sellIn).toBe(1);
  });

  it("Should decrease the quality four times as fast if the sellIn is lower than 0", () => {
    const gildedRose = new GildedRose([new Item("foo", 0, 2)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(-2);
    expect(items[0].sellIn).toBe(-1);
  });

  it("Should never have a negative quality", () => {
    const gildedRose = new GildedRose([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
  });
});
