import {
  MAX_QUALITY,
  MAX_QUALITY_LEGENDARY,
  MIN_QUALITY,
} from "../constants/qualityValues";
import { Item } from "../gilded-rose";

export class qualityHandlers {
  static improveItem = (item: Item, amount: number, isLegendary?: boolean) => {
    const maxQuality = isLegendary ? MAX_QUALITY_LEGENDARY : MAX_QUALITY;

    if (item.quality + amount >= maxQuality) item.quality = maxQuality;
    else item.quality += amount;
  };

  static deteriorateItem = (item: Item, amount: number) => {
    if (item.quality - amount < MIN_QUALITY) item.quality = MIN_QUALITY;
    else item.quality -= amount;
  };

  static handleAgingItem = (item: Item) => {
    if (item.sellIn < 0) qualityHandlers.improveItem(item, 2);
    else qualityHandlers.improveItem(item, 1);
  };

  static handleConjuredItem = (item: Item) => {
    if (item.sellIn < 0) qualityHandlers.deteriorateItem(item, 4);
    else qualityHandlers.deteriorateItem(item, 2);
  };

  static handleNormalItem = (item: Item) => {
    if (item.sellIn < 0) qualityHandlers.deteriorateItem(item, 2);
    else qualityHandlers.deteriorateItem(item, 1);
  };

  static handleTimeSensitiveItem = (item: Item) => {
    if (item.sellIn < 0) item.quality = 0;
    else if (item.sellIn < 5) qualityHandlers.improveItem(item, 3);
    else if (item.sellIn < 10) qualityHandlers.improveItem(item, 2);
    else qualityHandlers.improveItem(item, 1);
  };
}
