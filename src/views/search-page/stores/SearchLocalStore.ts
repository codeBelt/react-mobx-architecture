import { initialResponseStatus } from '../../../models/IResponseStatus';
import ShowsSearchResponseModel from './models/ShowsSearchResponseModel';
import ShowModel from '../../../stores/shows/models/shows/ShowModel';
import { runInAction } from 'mobx';
import { requestAction } from '../../../utilities/mobxUtil';
import { toastResponseError, responseToModels} from '../../../utilities/apiUtil';
import http from '../../../utilities/http';

interface ISourceProps {
  endpoint: string;
}

export const SearchLocalStore = (source: ISourceProps) => ({
  endpoint: source.endpoint,
  currentSearchTerm: '',
  searchResults: initialResponseStatus<ShowModel[]>([]),

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
          data: status.data ? status.data.map((model) => model.show) : [],
        };
      },
      http.get<ShowsSearchResponseModel[]>(endpoint),
      responseToModels(ShowsSearchResponseModel),
      toastResponseError
    );
  },
});
