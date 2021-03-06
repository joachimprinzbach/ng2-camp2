import {Component, OnInit, OnDestroy} from '@angular/core';
import {Hotel} from '../../model/backend-typings';
import {HotelActions} from '../../actions/hotel.actions';
import {Country} from '../../model/country';
import {CountryService} from '../../shared/country.service';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {Store} from '@ngrx/store';
import {AppState} from '../../reducers/index';
import 'rxjs/add/operator/pluck';
import 'rxjs/add/observable/of';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'hotel-edit-page',
  template: `
    <hotel-edit 
      [hotel]="hotel | async"
      [countries]="countries | async"
      (saveHotel)="saveHotel($event)">
    </hotel-edit>
`
})
export class HotelEditPageComponent implements OnInit, OnDestroy {

  hotel: Observable<Hotel>;
  countries: Observable<Country[]>;
  hotelIdSubscription: Subscription;

  constructor(private countryService: CountryService,
              private store: Store<AppState>,
              private hotelActions: HotelActions,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.countries = this.countryService
      .getAllCountries();
    this.hotelIdSubscription = this.route.params.pluck<string>('hotelId')
      .map(id => parseInt(id))
      .subscribe(hotelId => {
        if (!isNaN(hotelId)) {
          this.hotel = this.store.select<Hotel[]>('hotels')
              .flatMap((hotels: Hotel[]) => Observable.from(hotels))
              .filter(hotel => hotel.id === hotelId);
        } else {
          this.hotel = Observable.of({} as Hotel);
        }
      });
  }

  ngOnDestroy() {
    this.hotelIdSubscription.unsubscribe();
  }

  saveHotel(hotel: Hotel) {
    this.store.dispatch(this.hotelActions.saveHotel(hotel));
  }

}
