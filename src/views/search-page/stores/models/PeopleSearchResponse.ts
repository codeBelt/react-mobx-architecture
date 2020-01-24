import {PeopleResponse} from './PeopleResponse';

export interface PeopleSearchResponse<T = PeopleResponse> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
