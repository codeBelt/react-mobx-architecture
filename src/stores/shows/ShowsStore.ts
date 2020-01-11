import CastModel from './models/cast/CastModel';
import ShowModel from './models/shows/ShowModel';
import EpisodeModel from './models/episodes/EpisodeModel';
import environment from 'environment';
import { getToModel } from '../../utilities/http/httpResponseUtil';
import groupBy from 'lodash.groupby';
import IEpisodeTable from './computed/IEpisodeTable';
import IEpisodeTableRow from './computed/IEpisodeTableRow';
import dayjs from 'dayjs';
import { initialResponseStatus } from '../../models/IResponseStatus';
import { requestAction } from '../../utilities/mobxUtil';
import RootStore from '../RootStore';
import { observable, runInAction } from 'mobx';
import http from '../../utilities/http';

const ShowsStore = (rootStore: RootStore, initialState: {} = {}) =>
  observable({
    currentShowId: '',
    show: initialResponseStatus<ShowModel | null>(null),
    episodes: initialResponseStatus<EpisodeModel[]>([]),
    actors: initialResponseStatus<CastModel[]>([]),
    errorExample: initialResponseStatus<null>(null),

    ...initialState,

    setCurrentShowId(showId: string) {
      runInAction(() => {
        this.currentShowId = showId;
        // Clear out old data
        this.show = initialResponseStatus(null);
        this.episodes = initialResponseStatus([]);
        this.actors = initialResponseStatus([]);
      });
    },

    async requestShow() {
      const endpoint = environment.api.shows.replace(':showId', this.currentShowId);

      await requestAction(rootStore)((status) => {
        this.show = { ...this.show, ...status };
      }, getToModel<ShowModel>(ShowModel, endpoint));
    },

    async requestEpisodes() {
      const endpoint = environment.api.episodes.replace(':showId', this.currentShowId);

      await requestAction(rootStore)((status) => {
        this.episodes = { ...this.episodes, ...status };
      }, getToModel<EpisodeModel[]>(EpisodeModel, endpoint));
    },

    async requestCast() {
      const endpoint = environment.api.cast.replace(':showId', this.currentShowId);

      await requestAction(rootStore)((status) => {
        this.actors = { ...this.actors, ...status };
      }, getToModel<CastModel[]>(CastModel, endpoint));
    },

    /**
     * This is only to trigger an error api response so we can use it for an example in the AboutPage
     */
    async requestError() {
      const endpoint = environment.api.errorExample;

      await requestAction(rootStore)((status) => {
        this.errorExample = { ...this.errorExample, ...status, data: status?.data || null };
      }, http.get<null>(endpoint));
    },

    get isRequestingShowAndCast(): boolean {
      const { isRequesting: isRequestingCast } = this.actors;
      const { isRequesting: isRequestingShow } = this.show;

      return [isRequestingCast, isRequestingShow].some(Boolean);
    },

    get selectEpisodes() {
      const seasons: { [season: string]: EpisodeModel[] } = groupBy(this.episodes.data, 'season');

      return Object.entries(seasons).map(
        ([season, models]): IEpisodeTable => {
          return {
            title: `Season ${season}`,
            rows: this._createTableRows(models),
          };
        }
      );
    },

    _createTableRows(models: EpisodeModel[]) {
      return models.map(
        (model): IEpisodeTableRow => ({
          episode: model.number,
          name: model.name,
          date: dayjs(model.airdate).format('MMM D, YYYY'),
          image: model.image?.medium ?? '',
        })
      );
    },
  });

export default ShowsStore;
