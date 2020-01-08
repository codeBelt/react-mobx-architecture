import { initialResponseStatus } from '../../../models/IResponseStatus';
import { getToModel } from '../../../utilities/effectUtil';
import ShowsSearchResponseModel from './models/ShowsSearchResponseModel';
import RootStore from '../../../stores/RootStore';
import ShowModel from '../../../stores/shows/models/shows/ShowModel';
import { runInAction } from 'mobx';
import { requestAction } from '../../../utilities/mobxUtil';

interface ISourceProps {
  rootStore: RootStore;
  endpoint: string;
}

export const SearchStore = (source: ISourceProps) => ({
  endpoint: source.endpoint,
  currentSearchTerm: '',
  inputValue: '',
  searchResults: initialResponseStatus<ShowModel[]>([]),

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

    await requestAction(source.rootStore)((status) => {
      this.searchResults = {
        ...this.searchResults,
        ...status,
        data: status.data ? status.data.map((model) => model.show) : [],
      };
    }, getToModel<ShowsSearchResponseModel[]>(ShowsSearchResponseModel, endpoint));
  },
});
