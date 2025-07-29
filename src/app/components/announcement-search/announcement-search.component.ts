import { Component, inject, OnInit } from '@angular/core';
import { MapSearchComponent } from '../parts/map-search/map-search.component';
import Announcement from '../../models/announcement.interface';
import { AnnouncementService } from '../../services/announcement.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { delay } from 'rxjs';
import { CustomLoaderComponent } from "../parts/custom-loader/custom-loader.component";

@Component({
  selector: 'app-announcement-search',
  standalone: true,
  imports: [MapSearchComponent, ReactiveFormsModule, CustomLoaderComponent],
  templateUrl: './announcement-search.component.html',
  styleUrl: './announcement-search.component.css',
})
export class AnnouncementSearchComponent implements OnInit {
  private announcementService: AnnouncementService =
    inject(AnnouncementService);
  private formBuilder = inject(FormBuilder);

  searchForm: FormGroup;
  loadingResults: boolean = true;

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
    this.loadingResults = true;

    if (this.searchForm.valid) {
      
      const query = new URLSearchParams({
        ...this.searchForm.value,
      }).toString();
      //Permet de créer un chaine sous forme de Parametre d'url pour la requete GET avec les data du Form
      //  par exemple  city=test&maxClient=10&dailyPrice=3
      console.log(query);
      //Lancer la recherche avec les filtres
      this.search(query);
    }
  }

  search(filters: string | null = null) {
    this.announcementService.getAll(filters).pipe(delay(2000)).subscribe({
      next: (data: Announcement[]) => {
        this.results = data;
      },
      error: (error) => {
        console.log(error);
      },
      complete: ()=>{
        this.loadingResults = false;
      }
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
