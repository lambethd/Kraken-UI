import { environment } from 'environments/environment';

export interface IAppConfig {
    apiEndpoint: string;
    rsEndpoint: string;
}

export class AppConfig {
    public static rsEndpoint = environment.rsEndpoint;
    public static loginEndpoint = environment.loginEndpoint;
    public static newsRssEndpoint = environment.newsRssEndpoint;
};