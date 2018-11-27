import * as React from "react";
import { connect } from "react-redux";
import Item from "../../models/Item";
import ItemsComponent from "./components/ItemsComponent";
import { IActions } from "./configureModule";

interface IProps {
  items: Item[]
  page: number
}

class NewsContainer extends React.Component<IProps> {
  public render() {
    return (
      <div>
        <ItemsComponent items={this.props.items} page={this.props.page} />
      </div>
    );
  }
}

interface IConnectState {
  items: Item[]
}

interface IConnectProps {
  actions: IActions
  page: number
}

export default connect((state: IConnectState, props: IConnectProps) => ({
  actions: props.actions,
  items: state.items,
  page: props.page,
}))(NewsContainer);
