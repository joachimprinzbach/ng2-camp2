import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Offer} from '../model/backend-typings';
import {CrudService} from './crud.service';

@Injectable()
export class OfferService {

  constructor(private crud: CrudService) {
  }

  saveOfferForHotelId(id: number, offer: Offer): Observable<Offer> {
    return this.crud.post<Offer>('/rest/offers/byhotel/' + id, offer);
  }

  getOffers(): Observable<Offer[]> {
    return this.crud.get<Offer[]>('/rest/offers');
  }

  getOffer(id: number): Observable<Offer> {
    return this.crud.get<Offer>('/rest/offers/' + id);
  }

  getByHotelId(id: number): Observable<Offer[]> {
    return this.crud.get<Offer[]>('/rest/offers/byhotel/' + id);
  }

  deleteOffer(id: number): Observable<Response> {
    return this.crud.doDelete('/rest/offers/' + id);
  }
}
