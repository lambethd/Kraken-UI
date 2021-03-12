export class Trade {
    id: string;
    itemId: number;
    requestQuantity: number;
    requestPrice: number;
    username: string;
    requestTime: Date;
    tradeStatus: string;
    currentQuantity: number;
    currentTotalPrice: number;
    lastUpdated: Date;
    icon: string;
    itemName: string;
    buySell: string;
    currentPercentage: number;
    location: number;
}