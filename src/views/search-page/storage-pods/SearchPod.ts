import { action, computed, observable } from 'mobx';
import BaseStore from '../../../stores/BaseStore';

export default class SearchPod extends BaseStore {
  @observable endpoint: string = '';
  @observable currentSearchTerm: string = '';
  @observable inputValue: string = '';

  @action search(searchTerm: string): void {
    this.currentSearchTerm = searchTerm;
  }

  @action setInputValue(inputText: string): void {
    this.inputValue = inputText;
  }

  // @computed get searchList(): string {
  //   return `${this.endpoint}${this.results.join('|')}`;
  // }
}
