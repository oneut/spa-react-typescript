import * as React from "react";
import Item from 'src/models/Item';

interface IProps {
  item: Item
}

export default class ItemComponent extends React.Component<IProps> {
  public render() {
    return (
      <div className="news-item">
        <h3 className="title">
          <span>{this.props.item.title}</span>
        </h3>
        <div>
          <ul className="list-inline">
            <li className="score">{this.props.item.score} points</li>
            <li className="by">
              by{" "}
              <span>
                {this.props.item.by}
              </span>
            </li>
            <li className="time">{this.props.item.getTimeAgo()}</li>
            <li className="comments-link">
              <span>
                {this.props.item.descendants} comments
              </span>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
