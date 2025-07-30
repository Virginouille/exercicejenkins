import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import Announcement from '../models/announcement.interface';
import { Observable } from 'rxjs';
import { enableAuthContext } from '../interceptors/auth.interceptor';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {

  private apiUrl: string = 'https://atelier-de-toril.fr/api/announcements';

  private httpClient: HttpClient = inject(HttpClient);

  getAll(filters: { [param: string]: string } | null = null): Observable<Announcement[]> {
    return this.httpClient.get<Announcement[]>(this.apiUrl, {
      params: filters
    });
  }

  getById(id: number): Observable<Announcement> {
    return this.httpClient.get<Announcement>(this.apiUrl + "/" + id);
  }

  post(announcement: Partial<Announcement>): Observable<Announcement> {

    return this.httpClient.post<Announcement>(this.apiUrl, announcement, {
      context: enableAuthContext(),
    });
  }

  edit(announcement: Partial<Announcement>): Observable<Announcement> {

    return this.httpClient.patch<Announcement>(this.apiUrl, announcement, {
      context: enableAuthContext()
    });
  }
}
