import * as React from "react";
import { connect } from "react-redux";
import Item from "../../models/Item";
import ItemsComponent from "./components/ItemsComponent";
import { IActions } from "./configureModule";

interface IProps {
  items: Item[]
}

class IndexContainer extends React.Component<IProps> {
  public render() {
    return (
        <ItemsComponent items={this.props.items} />
    );
  }
}

interface IConnectProps {
  actions: IActions
}

interface IConnectState {
  items: Item[]
}

export default connect((state: IConnectState, props: IConnectProps) => ({
  actions: props.actions,
  items: state.items,
}))(IndexContainer);
