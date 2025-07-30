import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-control-error',
  standalone: true,
  imports: [],
  templateUrl: './form-control-error.component.html',
  styleUrl: './form-control-error.component.css',
})
export class FormControlErrorComponent {
  @Input() field: AbstractControl | null = null;

  isFieldInvalid(): boolean {
    // Retourne true si TOUTES ces conditions sont vraies :
    //    champ existe ET champ invalide ET (champ dirty OU touched OU formulaire est soumis)
    return Boolean(
      this.field && this.field.invalid && this.field.touched
    );
    // Boolean() créer un booléen d'après une donnée falsy ou truthy
  }

  getFieldError(): string {

    // Vérifier si le champ existe et a des erreurs
    if (this.field && this.field.errors) {
      // field.errors est un objet avec les types d'erreurs comme clés
      // Ex: { required: true, email: true, minlength: { requiredLength: 6, actualLength: 3 } }
      if (this.field.errors['required']) {
        return `Le champ est obligatoire`;
      }
      if (this.field.errors['email']) {
        return 'Format email invalide';
      }
      if (this.field.errors['minlength']) {
        // L'erreur minlength contient des infos détaillées
        return `Minimum de ${this.field.errors['minlength'].requiredLength} caractères`;
      }
            if (this.field.errors['min']) {
        // L'erreur minlength contient des infos détaillées
        return `Valeur minimale  ${this.field.errors['min'].required}`;
      }
             if (this.field.errors['max']) {
        // L'erreur minlength contient des infos détaillées
        return `Valeur maximale ${this.field.errors['max'].required}`;
      }
            if (this.field.errors['maxlength']) {
        // L'erreur minlength contient des infos détaillées
        return `Maximum de ${this.field.errors['minlength'].requiredLength} caractères`;
      }
            if (this.field.errors['pattern']) {
        // L'erreur minlength contient des infos détaillées
        return `Format de données invalide`;
      }
    }
    return '';
  }
}
