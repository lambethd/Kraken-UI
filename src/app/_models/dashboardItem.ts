import { Item } from "./item";

export class DashboardItem{
    itemId: number;
    dailyPercentageChange: number;
    dailyValueChange: number;
    monthlyPercentageChange: number;
    monthlyValueChange: number;
    item: Item;
}