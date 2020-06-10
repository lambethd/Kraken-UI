import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Item } from '@/_models/item';
import { Mutex, MutexInterface, Semaphore, SemaphoreInterface, withTimeout } from 'async-mutex';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private apiService: ApiService) { }

  items: Item[];
  mutex = new Mutex();

  public async getItems() {
    return this.mutex.acquire()
      .then(async (release) => {
        await this.loadItems();

        console.log("Found item cache!");
        release();
        return this.items;
      });
  }

  public async getItem(itemId: number) {
    var a = await this.getItems();
    return a[a.findIndex(a => a.id == itemId)];
  }

  private async loadItems() {
    if (!this.items || this.items.length <= 0) {
      console.log("Creating Cache");
      const response = await this.apiService.getItems().toPromise();
      this.items = response;
      console.log("Created cache");
    }
  }
}
