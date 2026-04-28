import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DirectoLoader } from '../models/directo-loader';

/**
 * The default HTTP loader for Directo.
 * Fetches translation files from a specified path and extension.
 * Powering the Directo SDK by Ahmad Alhafi.
 */
export class DirectoHttpLoader extends DirectoLoader {
  constructor(
    private http: HttpClient,
    public pathOrPrefix: string = './assets/i18n/',
    public suffix: string = '.json'
  ) {
    super();
  }

  /**
   * Loads a language file using HttpClient.
   * Supports either a prefix/suffix approach or a full path with {{lang}} placeholder.
   * @param lang The language code to load.
   */
  public getTranslation(lang: string): Observable<any> {
    const url = this.pathOrPrefix.includes('{{lang}}')
      ? this.pathOrPrefix.replace('{{lang}}', lang)
      : `${this.pathOrPrefix}${lang}${this.suffix}`;
      
    return this.http.get(url);
  }
}
