import { action, computed, observable } from 'mobx';
import CastModel from './models/cast/CastModel';
import ShowModel from './models/shows/ShowModel';
import EpisodeModel from './models/episodes/EpisodeModel';
import environment from 'environment';
import { getToModel } from '../../utilities/effectUtil';
import HttpUtil from '../../utilities/HttpUtil';
import groupBy from 'lodash.groupby';
import IEpisodeTable from './computed/IEpisodeTable';
import IEpisodeTableRow from './computed/IEpisodeTableRow';
import dayjs from 'dayjs';
import BaseStore from '../BaseStore';
import { initialResponseStatus, IResponseStatus } from '../../models/IResponseStatus';

export default class ShowsStore extends BaseStore {
  @observable currentShowId: string = '';
  @observable show: IResponseStatus<ShowModel | null> = initialResponseStatus(null);
  @observable episodes: IResponseStatus<EpisodeModel[]> = initialResponseStatus([]);
  @observable actors: IResponseStatus<CastModel[]> = initialResponseStatus([]);
  @observable errorExample: IResponseStatus<null> = initialResponseStatus(null);

  @action
  setCurrentShowId(showId: string) {
    this.currentShowId = showId;
  }

  @action
  async requestShow() {
    const endpoint = environment.api.shows.replace(':showId', this.currentShowId);

    await this.requestAction((status) => {
      this.show = { ...this.show, ...status };
    }, getToModel<ShowModel>(ShowModel, endpoint));
  }

  @action
  async requestEpisodes() {
    const endpoint = environment.api.episodes.replace(':showId', this.currentShowId);

    await this.requestAction((status) => {
      this.episodes = { ...this.episodes, ...status };
    }, getToModel<EpisodeModel[]>(EpisodeModel, endpoint));
  }

  @action
  async requestCast() {
    const endpoint = environment.api.cast.replace(':showId', this.currentShowId);

    await this.requestAction((status) => {
      this.actors = { ...this.actors, ...status };
    }, getToModel<CastModel[]>(CastModel, endpoint));
  }

  /**
   * This is only to trigger an error api response so we can use it for an example in the AboutPage
   */
  @action
  async requestError() {
    const endpoint = environment.api.errorExample;

    await this.requestAction<any>((status) => {
      this.errorExample = { ...this.errorExample, ...status };
    }, HttpUtil.get(endpoint));
  }

  @computed
  get isRequestingShowAndCast(): boolean {
    const { isRequesting: isRequestingCast } = this.actors;
    const { isRequesting: isRequestingShow } = this.show;

    return [isRequestingCast, isRequestingShow].some(Boolean);
  }

  @computed
  get selectEpisodes(): IEpisodeTable[] {
    const seasons: { [season: string]: EpisodeModel[] } = groupBy(this.episodes.data, 'season');

    return Object.entries(seasons).map(
      ([season, models]: [string, EpisodeModel[]]): IEpisodeTable => {
        return {
          title: `Season ${season}`,
          rows: this._createTableRows(models),
        };
      }
    );
  }

  private _createTableRows(models: EpisodeModel[]): IEpisodeTableRow[] {
    return models.map(
      (model: EpisodeModel): IEpisodeTableRow => ({
        episode: model.number,
        name: model.name,
        date: dayjs(model.airdate).format('MMM D, YYYY'),
        image: model.image?.medium ?? '',
      })
    );
  }
}
