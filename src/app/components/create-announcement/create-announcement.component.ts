import { Component, inject } from '@angular/core';
import Announcement from '../../models/announcement.interface';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AnnouncementService } from '../../services/announcement.service';
import { CommonModule } from '@angular/common';
import { FormControlErrorComponent } from "../parts/form-control-error/form-control-error.component";

@Component({
  selector: 'app-create-announcement',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormControlErrorComponent],
  templateUrl: './create-announcement.component.html',
  styleUrl: './create-announcement.component.css'
})
export class CreateAnnouncementComponent {
 private fb = inject(FormBuilder);
  private router = inject(Router);
  private announcementService = inject(AnnouncementService);

  announcementForm: FormGroup;
  isSubmitting = false;

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.announcementForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      address: ['', [Validators.required, Validators.maxLength(150)]],
      city: ['', [Validators.required, Validators.maxLength(150)]],
      zipcode: ['', [Validators.required, Validators.pattern(/^\d{5}$/)]],
      lattitude: ['', [Validators.required, Validators.min(-90), Validators.max(90)]],
      longitude: ['', [Validators.required, Validators.min(-180), Validators.max(180)]],
      maxClient: ['', [Validators.required, Validators.min(1), Validators.max(20)]],
      dailyPrice: ['', [Validators.required, Validators.min(0.01)]],
      imageCover: ['', [Validators.required, Validators.maxLength(500), Validators.pattern(/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i)]]
    });
  }

  getCurrentLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.announcementForm.patchValue({
            lattitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error) => {
          console.error('Erreur de géolocalisation:', error);
          alert('Impossible d\'obtenir votre position. Veuillez saisir manuellement les coordonnées.');
        }
      );
    } else {
      alert('La géolocalisation n\'est pas supportée par votre navigateur.');
    }
  }

  onSubmit(): void {
    if (this.announcementForm.valid) {
      this.isSubmitting = true;

      const announcementData: Partial<Announcement> = {
        title: this.announcementForm.get('title')?.value,
        description: this.announcementForm.get('description')?.value,
        address: this.announcementForm.get('address')?.value,
        city: this.announcementForm.get('city')?.value,
        zipcode: this.announcementForm.get('zipcode')?.value,
        lattitude: this.announcementForm.get('lattitude')?.value,
        longitude: this.announcementForm.get('longitude')?.value,
        maxClient: parseInt(this.announcementForm.get('maxClient')?.value),
        dailyPrice: parseFloat(this.announcementForm.get('dailyPrice')?.value),
        imageCover: this.announcementForm.get('imageCover')?.value
      };

      this.announcementService.post(announcementData).subscribe({
        next: (data: any) => {
          console.log('Annonce créée avec succès:', data);
          this.router.navigate(['/profile'], {
            queryParams: { tab: 'announcements', success: 'Annonce créée avec succès!' }
          });
        },
        error: (error) => {
          console.error('Erreur lors de la création:', error);
          alert('Une erreur est survenue lors de la création de l\'annonce. Veuillez réessayer.');
          this.isSubmitting = false;
        }
      });
    } else {
      // Marquer tous les champs comme touchés pour afficher les erreurs
      Object.keys(this.announcementForm.controls).forEach(key => {
        this.announcementForm.get(key)?.markAsTouched();
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/profile'], { queryParams: { tab: 'announcements' } });
  }
}
