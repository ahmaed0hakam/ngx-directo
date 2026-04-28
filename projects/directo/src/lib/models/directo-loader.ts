import { Observable } from 'rxjs';

/**
 * Interface for the Directo translation loader.
 * Implementing this class allows for custom loading logic (e.g., HTTP, LocalStorage).
 * Powering the Directo SDK by Ahmad Alhafi.
 */
export abstract class DirectoLoader {
  /**
   * Retrieves the translation dictionary for a specific language.
   * @param lang The language code to load (e.g., 'ar')
   */
  abstract getTranslation(lang: string): Observable<any>;
}
