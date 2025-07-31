import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Announcement from '../../models/announcement.interface';
import { AnnouncementService } from '../../services/announcement.service';
import { CommonModule } from '@angular/common';
import { ServiceIconPipe } from '../../pipes/service-icon.pipe';
import { EquipmentIconPipe } from '../../pipes/equipment-icon.pipe';
import { CustomLoaderComponent } from "../parts/custom-loader/custom-loader.component";
import { delay } from 'rxjs';
import { ErrorComponent } from '../parts/error/error.component';

@Component({
  selector: 'app-announcement-detail',
  standalone: true,
  imports: [CommonModule, ServiceIconPipe, EquipmentIconPipe, ErrorComponent, CustomLoaderComponent],
  templateUrl: './announcement-detail.component.html',
  styleUrl: './announcement-detail.component.css'
})
export class AnnouncementDetailComponent implements OnInit {

  private route: ActivatedRoute = inject(ActivatedRoute); // Récuperer la toute actuelle
  private router: Router = inject(Router); // Pour la redirection

  private announcementService = inject(AnnouncementService);
  //Propriété représentant le parmaètre id
  announcement: Announcement | null = null;
  loading: boolean = true;
  errorTextParent: string = "Aucune annonce retrouvée";
  errorStatusParent: number = 404;

  ngOnInit() {
    // Récupération directe (snapshot)
    const id: string | null = this.route.snapshot.paramMap.get('id'); // ✅
    console.log("id url:",id);
    console.log("id parse:",parseInt(id));
    console.log("!isNan:",!isNaN(parseInt(id)));
    if (id && !isNaN(parseInt(id))) {

      this.announcementService.getById(parseInt(id)).pipe(delay(1000)).subscribe(
        {
          next: (data: Announcement) => {
            this.loading = false;
            this.announcement = data;
          }, error:(error)=>{
            this.errorStatusParent = error.error.status;
            this.errorTextParent = error.error.detail;
            this.loading = false;
          }
        }
      );

    } else {
      this.loading = false;
    }
  }





}
