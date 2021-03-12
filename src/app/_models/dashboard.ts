import { Index } from '.';
import { DashboardItem } from './dashboardItem';

export class Dashboard{
    indexes : Index[];

    topIncreasesByDailyValue : DashboardItem[];
    topIncreasesByDailyPercentage : DashboardItem[];
    topDecreasesByDailyValue : DashboardItem[];
    topDecreasesByDailyPercentage : DashboardItem[];

    topIncreasesByMonthlyValue : DashboardItem[];
    topIncreasesByMonthlyPercentage : DashboardItem[];
    topDecreasesByMonthlyValue : DashboardItem[];
    topDecreasesByMonthlyPercentage : DashboardItem[];

    itemsToWatch : Number[];
    created: Date;
}