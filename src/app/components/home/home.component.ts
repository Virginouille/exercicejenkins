import { Component, inject, OnInit } from '@angular/core';
import Announcement from '../../models/announcement.interface';

import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  private httpClient: HttpClient = inject(HttpClient);

  title: string = 'Mes annonces';

  announcements: Announcement[] = [];

  ngOnInit(): void {

    this.httpClient.get<Announcement[]>('http://51.254.112.67/api/announcements',
      { headers: { 'accept': 'application/json' } }
    ).subscribe({
      next: (data) => {
        this.announcements = data;
        console.log(this.announcements);
      }

    });

  }
}
