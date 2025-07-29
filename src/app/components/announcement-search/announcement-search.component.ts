import { Component, inject, OnInit } from '@angular/core';
import { MapSearchComponent } from '../parts/map-search/map-search.component';
import Announcement from '../../models/announcement.interface';
import { AnnouncementService } from '../../services/announcement.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-announcement-search',
  standalone: true,
  imports: [MapSearchComponent, ReactiveFormsModule],
  templateUrl: './announcement-search.component.html',
  styleUrl: './announcement-search.component.css',
})
export class AnnouncementSearchComponent implements OnInit {
  private announcementService: AnnouncementService =
    inject(AnnouncementService);
  private formBuilder = inject(FormBuilder);

  searchForm: FormGroup;

  constructor() {
    this.searchForm = this.formBuilder.group({
      city: ['', []],
      'maxClient[lte]': ['', []],
      'dailyPrice[lte]': ['', []],
    });
  }

  results: Announcement[] = [];

  ngOnInit(): void {
    this.search();
  }

  submitSearch() {
    console.log(this.searchForm.value);
    if (this.searchForm.valid) {
      const query = new URLSearchParams({
        ...this.searchForm.value,
      }).toString();
      //Permet de créer un chaine sous forme de Parametre d'url pour la requete GET
      //  par exemple  city=test&maxClient=10&dailyPrice=3
      console.log(query);
      //Lancer la recherche avec les filtres
      this.search(query);
    }
  }

  search(filters: string | null = null) {
    this.announcementService.getAll(filters).subscribe({
      next: (data: Announcement[]) => {
        this.results = data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  resetForm() {
    // Reset les values du formGroup en précisant '' au lieu de null par défaut
    // pour éviter les erreurs lors de la création des filtres pour la requete
    this.searchForm.reset({
      city: '',
      'maxClient[lte]': '',
      'dailyPrice[lte]': '',
    });
  }
}
