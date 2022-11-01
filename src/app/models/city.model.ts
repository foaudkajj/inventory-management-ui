import { Country } from './country.model';

export class City {
  id: string;
  name: string;
  countryId: string;
  country: Country;
}
