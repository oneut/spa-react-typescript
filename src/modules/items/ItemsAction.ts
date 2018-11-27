import { Store } from "redux";
import actionCreatorFactory from "typescript-fsa";
import HackerNewsApi from "../../api/HackerNewsApi";
import { IItemAttributes } from "../../attributes/IItemAttributes";

const actionCreator = actionCreatorFactory();

export const actions = {
  sync: actionCreator<IItemAttributes[]>("topStoryItems/sync")
};

export class ItemsAction {
  private store: Store;

  constructor(store: Store) {
    this.store = store;
  }

  public sync(itemsAttributes: IItemAttributes[]) {
    this.store.dispatch(actions.sync(itemsAttributes))
  }

  public async fetch(params?: {page?: number}) {
    const page = params && params.page ? params.page : 1;
    const itemsAttributes = await HackerNewsApi.getTopStoryItems(page);
    this.sync(itemsAttributes);
  }
}

export function createItemsAction(store: Store) {
  return new ItemsAction(store);
}

