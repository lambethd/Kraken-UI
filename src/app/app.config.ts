export interface IAppConfig {
    apiEndpoint: string;
    rsEndpoint: string;
}

export class AppConfig {    
    public static rsEndpoint = "http://localhost:8080";
    public static loginEndpoint = "http://localhost:8080";
    public static newsRssEndpoint = "https://secure.runescape.com/m=news/latest_news.rss";
};