import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Announcement from '../../models/announcement.interface';
import { AnnouncementService } from '../../services/announcement.service';
import { CommonModule } from '@angular/common';
import { ServiceIconPipe } from '../../pipes/service-icon.pipe';
import { EquipmentIconPipe } from '../../pipes/equipment-icon.pipe';

@Component({
  selector: 'app-announcement-detail',
  standalone: true,
  imports: [CommonModule,ServiceIconPipe,EquipmentIconPipe],
  templateUrl: './announcement-detail.component.html',
  styleUrl: './announcement-detail.component.css'
})
export class AnnouncementDetailComponent implements OnInit{

  private route : ActivatedRoute = inject(ActivatedRoute); // Récuperer la toute actuelle
  private router : Router = inject(Router); // Pour la redirection

  private announcementService = inject(AnnouncementService);
		//Propriété représentant le parmaètre id
  announcement : Announcement|null = null;

	ngOnInit() {
	    // Récupération directe (snapshot)
	    const id: string|null = this.route.snapshot.paramMap.get('id'); // ✅

      if(id && !isNaN(parseInt(id))){
        // TODO  GET /api/announcement/:id
        this.announcementService.getById(parseInt(id)).subscribe(
          {next:(data: Announcement)=>{
            this.announcement = data;
          },error(error){
            console.log(error);
            //
          }}
        )

      }else{
        // redirection
        this.router.navigate(['home']);
      }
	}





}
