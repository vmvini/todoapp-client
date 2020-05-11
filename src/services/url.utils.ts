import { environment } from 'src/environments/environment';

export const getUrl = (paths: string[]) => [environment.api, ...paths].join('/');
