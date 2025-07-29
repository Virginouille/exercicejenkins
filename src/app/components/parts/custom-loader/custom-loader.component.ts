import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-custom-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './custom-loader.component.html',
  styleUrl: './custom-loader.component.css'
})
export class CustomLoaderComponent {
  @Input() size:number = 4;
}
