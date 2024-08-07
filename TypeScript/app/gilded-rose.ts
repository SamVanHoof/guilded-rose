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

  private MAX_QUALITY = 50;
  private MIN_QUALITY = 0;
  private MAX_QUALITY_LEGENDARY = 80;

  private improveItem = (item: Item, amount: number, isLegendary?: boolean) => {
    const maxQuality = isLegendary
      ? this.MAX_QUALITY_LEGENDARY
      : this.MAX_QUALITY;

    if (item.quality + amount >= maxQuality) item.quality = maxQuality;
    else item.quality += amount;
  };

  private deteriorateItem = (item: Item, amount: number) => {
    if (item.sellIn < 0) amount = amount * 2;
    if (item.quality - amount < this.MIN_QUALITY)
      item.quality = this.MIN_QUALITY;
    else item.quality -= amount;
  };

  private handleAgingItem = (item: Item) => {
    this.improveItem(item, 1);
  };

  private handleTimeSensitiveItem = (item: Item) => {
    if (item.sellIn <= 0) item.quality = 0;
    else if (item.sellIn < 5) this.improveItem(item, 3);
    else if (item.sellIn < 10) this.improveItem(item, 2);
    else this.improveItem(item, 1);
  };

  updateQuality() {
    for (let item of this.items) {
      console.log(item.name);

      switch (item.name) {
        case "Aged Brie":
          item.sellIn -= 1;
          this.handleAgingItem(item);
          break;
        case "Backstage passes to a TAFKAL80ETC concert":
          item.sellIn -= 1;
          this.handleTimeSensitiveItem(item);
          break;
        case "Conjured Mana Cake":
          item.sellIn -= 1;
          this.deteriorateItem(item, 2);
          break;
        case "Sulfuras, Hand of Ragnaros":
          break;
        default:
          item.sellIn -= 1;
          this.deteriorateItem(item, 1);
          break;
      }
    }

    return this.items;
  }
}
