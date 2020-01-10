import { action, computed, observable } from 'mobx';
import BaseStore from '../../../stores/BaseStore';
import { initialResponseStatus } from '../../../models/IResponseStatus';
import { getToModel } from '../../../utilities/effectUtil';
import ShowModel from '../../../stores/shows/models/shows/ShowModel';
import ShowsSearchResponseModel from './models/ShowsSearchResponseModel';

export default class SearchStore extends BaseStore {
  @observable endpoint = '';
  @observable currentSearchTerm = '';
  @observable inputValue = '';
  @observable searchResults = initialResponseStatus<ShowModel[]>([]);

  @computed get resultsText(): string {
    const { data, isRequesting } = this.searchResults;

    return isRequesting ? 'Searching...' : `Results: ${data.length}`;
  }

  @action search(searchTerm: string): void {
    this.currentSearchTerm = searchTerm;

    this._requestData();
  }

  @action setInputValue(inputText: string): void {
    this.inputValue = inputText;
  }

  private async _requestData(): Promise<void> {
    const endpoint = this.endpoint.replace(':searchTerm', this.currentSearchTerm);

    await this.requestAction((status) => {
      this.searchResults = {
        ...status,
        data: status.data ? status.data.map((model) => model.show) : [],
      };
    }, getToModel<ShowsSearchResponseModel[]>(ShowsSearchResponseModel, endpoint));
  }
}
