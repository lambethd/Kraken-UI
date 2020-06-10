import { Injectable } from '@angular/core';
import { NewsItem } from '@/_models/news-item';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '@/app.config';
import { map } from 'rxjs/operators';
import { NgxXml2jsonService } from 'ngx-xml2json';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(
    private httpClient: HttpClient,
    private ngxXml2jsonService: NgxXml2jsonService
  ) { }

  public getNews() {
    var rss = this.httpClient.get(AppConfig.newsRssEndpoint).subscribe(data => {
      const parser = new DOMParser();
      const xml = parser.parseFromString(data.toString(), 'text/xml');
      const obj = this.ngxXml2jsonService.xmlToJson(xml);
      console.log(obj);
    });
  }
}
