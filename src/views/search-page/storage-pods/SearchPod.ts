import { action, observable } from 'mobx';
import BaseStore from '../../../stores/BaseStore';
import { initialResponseStatus, IResponseStatus } from '../../../models/IResponseStatus';
import { getToModel } from '../../../utilities/effectUtil';
import ShowModel from '../../../stores/shows/models/shows/ShowModel';
import ShowsSearchResponseModel from './models/ShowsSearchResponseModel';

export default class SearchPod extends BaseStore {
  @observable endpoint: string = '';
  @observable currentSearchTerm: string = '';
  @observable inputValue: string = '';
  @observable searchResults: IResponseStatus<ShowModel[]> = initialResponseStatus([]);

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
        ...this.searchResults,
        ...status,
        data: status.data ? status.data.map((model) => model.show) : [],
      };
    }, getToModel<ShowsSearchResponseModel[]>(ShowsSearchResponseModel, endpoint));
    // }, HttpUtil.get(endpoint));
  }
}
