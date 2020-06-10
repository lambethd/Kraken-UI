import { Component, OnInit } from '@angular/core';
import { NewsItem } from '@/_models/news-item';
import { NewsService } from '@/_services/news.service';

@Component({
  selector: 'app-news-feed',
  templateUrl: './news-feed.component.html',
  styleUrls: ['./news-feed.component.css']
})
export class NewsFeedComponent implements OnInit {
  items: NewsItem[];

  constructor(private newsService: NewsService) { }

  ngOnInit(): void {
    this.loadNewsItems();
  }

  private loadNewsItems() {
    this.newsService.getNews();
  }
}
