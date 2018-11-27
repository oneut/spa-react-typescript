import * as Immutable from "immutable";
import { IItemAttributes } from 'src/attributes/IItemAttributes';
import timeago from "timeago.js";

interface IItem {
  by: string,
  descendants: number,
  id: number,
  score: number,
  time: number,
  title: string,
  type: string,
  url: string,
  kids: any
}

const ItemRecord = Immutable.Record({
  by: "",
  descendants: 0,
  id: 0,
  kids: null,
  score: 0,
  time: 0,
  title: "",
  type: "",
  url: "",
});

export default class Item extends ItemRecord implements IItem {
  public static newInstance(itemAttributes?: IItemAttributes) {
    if (!itemAttributes) {
      return new Item();
    }

    return new Item(itemAttributes)
  }

  // getUrl() {
  //   if (this.url) {
  //     return this.url;
  //   }
  //
  //   return URL.name("ItemPage", { itemId: this.id });
  // }

  public getTimeAgo() {
    return timeago().format(new Date(this.time * 1000));
  }
}
