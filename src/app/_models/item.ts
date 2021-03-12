import { ItemMovement } from './item-movement';

export class Item {
    id: number;
    name: string;
    type: string;
    iconLink: string;
    largeIconLink: string;
    description: string;
    members:boolean;
    current: ItemMovement;
    today: ItemMovement;
    buyingLimit: number;
  }