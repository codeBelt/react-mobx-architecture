import { action, computed, observable } from 'mobx';

export default class __store__Store extends BaseStore {
  @observable __model__(camelCase): IResponseStatus<unknown | null> = initialResponseStatus(null);

  @action
  async request__model__(): Promise<void> {
    const endpoint = environment.api.__model__(camelCase);

    await this.requestAction((status) => {
      this.__model__(camelCase) = { ...this.__model__(camelCase), ...status };
    }, HttpUtility.get(endpoint));
  }

  /*
  @computed
  get selectSomething(): unknown {
    return null;
  }
  */
}
