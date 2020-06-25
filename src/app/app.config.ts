export interface IAppConfig {
    apiEndpoint: string;
    rsEndpoint: string;
}

export class AppConfig {    
    public static rsEndpoint = "https://krakenscove.co.uk:8443";
    public static loginEndpoint = "https://krakenscove.co.uk:8443";
    public static newsRssEndpoint = "https://secure.runescape.com/m=news/latest_news.rss";
};