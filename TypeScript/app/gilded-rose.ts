import { qualityHandlers } from "./utils/qualityHandlers";

export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    for (let item of this.items) {
      console.log(item.name);

      switch (item.name) {
        case "Aged Brie":
          item.sellIn -= 1;
          qualityHandlers.handleAgingItem(item);
          break;
        case "Backstage passes to a TAFKAL80ETC concert":
          item.sellIn -= 1;
          qualityHandlers.handleTimeSensitiveItem(item);
          break;
        case "Conjured Mana Cake":
          item.sellIn -= 1;
          qualityHandlers.deteriorateItem(item, 2);
          break;
        case "Sulfuras, Hand of Ragnaros":
          break;
        default:
          item.sellIn -= 1;
          qualityHandlers.deteriorateItem(item, 1);
          break;
      }
    }

    return this.items;
  }
}
