import { from, Observable } from 'rxjs';
import { DirectoLoader } from '../models/directo-loader';

/**
 * A native Fetch-based loader for Directo.
 * Useful for projects that want to avoid HttpClient or are running in non-standard environments.
 * Powering the Directo SDK by Ahmad Alhafi.
 */
export class DirectoFetchLoader extends DirectoLoader {
  constructor(
    public pathOrPrefix: string = './assets/i18n/',
    public suffix: string = '.json'
  ) {
    super();
  }

  /**
   * Loads a language file using native fetch.
   * @param lang The language code to load.
   */
  public getTranslation(lang: string): Observable<any> {
    const url = this.pathOrPrefix.includes('{{lang}}')
      ? this.pathOrPrefix.replace('{{lang}}', lang)
      : `${this.pathOrPrefix}${lang}${this.suffix}`;
      
    return from(
      fetch(url).then(response => {
        if (!response.ok) {
          throw new Error(`Directo: Failed to fetch translation from ${url}`);
        }
        return response.json();
      })
    );
  }
}
