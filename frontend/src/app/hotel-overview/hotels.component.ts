import {Component} from 'angular2/core';
import {HotelService} from './../services/hotel.service.ts';
import {Observable} from 'rxjs/Observable';
import {Hotel} from './../model/hotel.model.ts';

@Component({
  selector: 'hotels',
  moduleId: module.id,
  directives: [],
  providers: [HotelService],
  template: require('./hotels.template.html')
})
export class HotelsComponent {
  hotels: Observable<Hotel[]>;

  constructor(private hotelService: HotelService) {
    this.hotels = this.hotelService.getHotels();
  }
}
