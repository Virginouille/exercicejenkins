import { CommonModule } from '@angular/common';
import { Component,Input } from '@angular/core';
import { MapComponent, MarkerComponent, } from '@maplibre/ngx-maplibre-gl';
import { NavigationControl } from 'maplibre-gl';
import Announcement from '../../../models/announcement.interface';

@Component({
  selector: 'app-map-search',
  standalone: true,
  imports: [MapComponent, MarkerComponent, CommonModule],
  templateUrl: './map-search.component.html',
  styleUrl: './map-search.component.css'
})
export class MapSearchComponent {

  @Input() results:Announcement[] = [];

  onMapLoad(map: maplibregl.Map): void {
    // Ajout du contrôle de navigation à la carte (zoom et boussole)
    console.log("LoadMap")
    map.addControl(new NavigationControl({ showCompass: true, showZoom: true }), 'top-right');
  }

}
