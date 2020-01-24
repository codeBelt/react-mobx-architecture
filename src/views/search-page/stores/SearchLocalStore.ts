import { initialResponseStatus } from '../../../models/IResponseStatus';
import { runInAction } from 'mobx';
import { requestAction } from '../../../utilities/mobxUtil';
import {toastResponseError, normalizeResponse} from '../../../utilities/apiUtil';
import http from '../../../utilities/http';
import {People} from './models/People';
import {PeopleSearchResponse} from './models/PeopleSearchResponse';

interface ISourceProps {
  endpoint: string;
}

export const SearchLocalStore = (source: ISourceProps) => ({
  endpoint: source.endpoint,
  currentSearchTerm: '',
  searchResults: initialResponseStatus<People[]>([]),

  get resultsText(): string {
    const { data, isRequesting } = this.searchResults;

    return isRequesting ? 'Searching...' : `Results: ${data.length}`;
  },

  search(searchTerm: string) {
    if (searchTerm !== this.currentSearchTerm) {
      runInAction(() => (this.currentSearchTerm = searchTerm));

      this._requestData();
    }
  },

  async _requestData() {
    const endpoint = this.endpoint.replace(':searchTerm', this.currentSearchTerm);

    await requestAction(
      (status) => {
        this.searchResults = {
          ...status,
          data: status.data ? status.data.results : [],
        };
      },
      http.get<PeopleSearchResponse>(endpoint),
      normalizeResponse<PeopleSearchResponse<People>>(),
      toastResponseError
    );
  },
});
