import { combineReducers, createStore, Store } from "redux";
import { createItemsAction, ItemsAction } from "../../modules/items/ItemsAction";
import { items } from "../../modules/items/reducer/items";

const reducer = combineReducers({
  items
});

export interface IModule {
  store: Store
  actions: IActions
}

export interface IActions {
  items: ItemsAction
}

export function configureModule() {
  const store = createStore(reducer);
  return {
    actions: {
      items: createItemsAction(store)
    },
    store,
  };
}
