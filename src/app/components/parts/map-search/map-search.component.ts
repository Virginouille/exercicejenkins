import { CommonModule } from '@angular/common';
import { Component,EventEmitter,Input, Output } from '@angular/core';
import { ControlComponent, GeolocateControlDirective, MapComponent, MarkerComponent, PopupComponent, } from '@maplibre/ngx-maplibre-gl';
import { NavigationControl } from 'maplibre-gl';
import Announcement from '../../../models/announcement.interface';
import { CustomLoaderComponent } from "../custom-loader/custom-loader.component";

@Component({
  selector: 'app-map-search',
  standalone: true,
  imports: [MapComponent, MarkerComponent, GeolocateControlDirective, ControlComponent, CommonModule, CustomLoaderComponent],
  templateUrl: './map-search.component.html',
  styleUrl: './map-search.component.css'
})
export class MapSearchComponent {

  @Input() results:Announcement[] = [];
  @Input() loading:boolean = true;

  @Output() selectedAnnouncement:EventEmitter<Announcement> = new EventEmitter<Announcement>();

  selectAnnouncement(announcement: Announcement) {
    // Émettre l'annonce sélectionnée vers le composant parent
    this.selectedAnnouncement.emit(announcement);
  }

  onMapLoad(map: maplibregl.Map): void {
    // Ajout du contrôle de navigation à la carte (zoom et boussole)
    console.log("LoadMap")
    map.addControl(new NavigationControl({ showCompass: true, showZoom: true }), 'top-right');
  }



}
