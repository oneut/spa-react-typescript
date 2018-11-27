import * as NProgress from "nprogress";
import * as React from "react";
import { Provider } from "react-redux";
import { configureModule, IModule } from 'src/containers/index/configureModule';
import Container from "../containers/index/Container";
import { createPrepareRenderer } from "../Prepare";

interface IProps {
  module: IModule
}

interface IPrepare {
  module: IModule
}

class IndexPage extends React.Component<IProps> {
  public static initialPropsWillGet() {
    NProgress.start();
  }

  public static async getInitialProps() {
    const module = configureModule();
    await module.actions.items.fetch();
    return {
      module
    };
  }

  public static initialPropsDidGet() {
    NProgress.done();
  }

  public render() {
    return React.createElement(() => {
      return (
        <Provider store={this.props.module.store}>
          <Container actions={this.props.module.actions}/>
        </Provider>
      )
    });
  }
}

export default createPrepareRenderer<{}, IPrepare>(IndexPage);
