import { initialResponseStatus } from '../../../models/IResponseStatus';
import { getToModel, requestAction } from '../../../utilities/effectUtil';
import ShowsSearchResponseModel from './models/ShowsSearchResponseModel';
import RootStore from '../../../stores/RootStore';
import ShowModel from '../../../stores/shows/models/shows/ShowModel';

export const SearchStore = (rootStore: RootStore, initialState: {} = {}) => ({
  endpoint: '',
  currentSearchTerm: '',
  inputValue: '',
  searchResults: initialResponseStatus<ShowModel[]>([]),

  ...initialState,

  search(searchTerm: string) {
    this.currentSearchTerm = searchTerm;

    this._requestData();
  },

  setInputValue(inputText: string) {
    this.inputValue = inputText;
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
