import { Component, inject, OnInit } from '@angular/core';
import { MapSearchComponent } from '../parts/map-search/map-search.component';
import Announcement from '../../models/announcement.interface';
import { AnnouncementService } from '../../services/announcement.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { delay } from 'rxjs';
import { CustomLoaderComponent } from "../parts/custom-loader/custom-loader.component";
import { CommonModule } from '@angular/common';
import { ServiceIconPipe } from '../../pipes/service-icon.pipe';
import { EquipmentIconPipe } from '../../pipes/equipment-icon.pipe';

@Component({
  selector: 'app-announcement-search',
  standalone: true,
  imports: [MapSearchComponent, ReactiveFormsModule, CustomLoaderComponent, CommonModule, ServiceIconPipe,EquipmentIconPipe],
  templateUrl: './announcement-search.component.html',
  styleUrl: './announcement-search.component.css',
})

export class AnnouncementSearchComponent implements OnInit {
  private announcementService: AnnouncementService =
    inject(AnnouncementService);
  private formBuilder = inject(FormBuilder);

  searchForm: FormGroup;
  loadingResults: boolean = true;
  results: Announcement[] = [];

  selectedAnnouncement: Announcement| null = null;
  constructor() {
    this.searchForm = this.formBuilder.group({
      city: ['', []],
      'maxClient[lte]': ['', []],
      'dailyPrice[lte]': ['', []],
    });
  }

  ngOnInit(): void {
    this.search();
  }

  detailAnnouncement(announcement: Announcement) {
    this.selectedAnnouncement = announcement;
  }

  returnToSearch() {
    this.selectedAnnouncement = null;
  }

  submitSearch() {
    console.log(this.searchForm.value);
    this.loadingResults = true;

    if (this.searchForm.valid) {
      //Lancer la recherche avec les filtres
      this.search(this.searchForm.value);
    }
  }

  search(filters: {[param: string]: string} | null = null) {
    //Rest l'affichage du détail de l'annonce selectionnée
    this.returnToSearch();

    this.announcementService.getAll(filters).subscribe({
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
    this.returnToSearch();
    // Reset les values du formGroup en précisant '' au lieu de null par défaut
    // pour éviter les erreurs lors de la création des filtres pour la requete
    this.searchForm.reset({
      city: '',
      'maxClient[lte]': '',
      'dailyPrice[lte]': '',
    });


  }
}
