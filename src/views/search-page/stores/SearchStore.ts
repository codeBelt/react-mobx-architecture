import { initialResponseStatus } from '../../../models/IResponseStatus';
import { getToModel } from '../../../utilities/effectUtil';
import ShowsSearchResponseModel from './models/ShowsSearchResponseModel';
import RootStore from '../../../stores/RootStore';
import ShowModel from '../../../stores/shows/models/shows/ShowModel';
import { runInAction } from 'mobx';
import { requestAction } from '../../../utilities/mobxUtil';

export const SearchStore = (rootStore: RootStore, initialState: {} = {}) => ({
  endpoint: '',
  currentSearchTerm: '',
  inputValue: '',
  searchResults: initialResponseStatus<ShowModel[]>([]),

  ...initialState,

  search(searchTerm: string) {
    runInAction(() => (this.currentSearchTerm = searchTerm));

    this._requestData();
  },

  setInputValue(inputText: string) {
    runInAction(() => (this.inputValue = inputText));
  },

  get resultsText(): string {
    const { data, isRequesting } = this.searchResults;

    return isRequesting ? 'Searching...' : `Results: ${data.length}`;
  },

  async _requestData() {
    const endpoint = this.endpoint.replace(':searchTerm', this.currentSearchTerm);

    await requestAction(rootStore)((status) => {
      this.searchResults = {
        ...this.searchResults,
        ...status,
        data: status.data ? status.data.map((model) => model.show) : [],
      };
    }, getToModel<ShowsSearchResponseModel[]>(ShowsSearchResponseModel, endpoint));
  },
});
