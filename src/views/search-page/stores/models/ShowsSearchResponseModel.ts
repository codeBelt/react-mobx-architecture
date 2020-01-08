import { BaseModel } from 'sjs-base-model';
import ShowModel from '../../../../stores/shows/models/shows/ShowModel';

/*
    // Returned Api Data Sample
    {
      "score": 14.956818,
      "show": {},
    }
 */
export default class ShowsSearchResponseModel extends BaseModel {
  public readonly score: number = 0;
  public readonly show: ShowModel = ShowModel as any;

  constructor(data: RecursivePartial<ShowsSearchResponseModel>) {
    super();

    this.update(data);
  }
}
