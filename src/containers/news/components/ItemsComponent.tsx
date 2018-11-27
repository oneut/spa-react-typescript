import * as React from "react";
import { Link } from "react-router-dom";
import Item from "../../../models/Item";
import ItemComponent from "./ItemComponent";

interface IProps {
  items: Item[]
  page: number
}

export default class ItemsComponent extends React.Component<IProps> {
  public render() {
    const itemComponents = this.props.items.map((item) => (
      <ItemComponent key={item.id} item={item} />
    ));
    return (
      <div className="container">
        {itemComponents}
        <h3>
          <Link
            to={`/news/${this.props.page + 1}`}
          >
            more
          </Link>
        </h3>
      </div>
    );
  }
}
