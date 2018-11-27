import * as Immutable from "immutable";
import { reducerWithInitialState} from "typescript-fsa-reducers";
import Item from "../../../models/Item";
import { actions } from "../ItemsAction";

export const items = reducerWithInitialState(Immutable.List())
  .case(actions.sync, (_, itemsAttributes) => {
    return Immutable.List().withMutations((state) => {
      itemsAttributes.forEach((itemAttributes) =>
        state.push(Item.newInstance(itemAttributes))
      );
    });
  });
