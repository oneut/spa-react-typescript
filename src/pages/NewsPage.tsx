import * as NProgress from "nprogress";
import * as React from "react";
import { Provider } from "react-redux";
import { RouteComponentProps } from "react-router";
import { configureModule, IModule } from "../containers/news/configureModule";
import Container from "../containers/news/Container";
import { createPrepareRenderer } from "../Prepare";

interface IInitializeProps extends RouteComponentProps<{
  page?: string
}>{
}

interface IPrepare {
  module: IModule
}

class NewsPage extends React.Component<IInitializeProps & IPrepare> {
  public static initialPropsWillGet() {
    NProgress.start();
  }

  public static async getInitialProps(attributes: IInitializeProps) {
    const module = configureModule();

    if (
      !attributes.match.params.page ||
        isNaN(parseFloat(attributes.match.params.page)) ||
        !isFinite(parseFloat(attributes.match.params.page))
    ) {
      await module.actions.items.fetch({
        page: 1
      });
    } else {
      await module.actions.items.fetch({
        page: Number(attributes.match.params.page)
      });
    }

    return {
      module
    };
  }

  public static initialPropsDidGet() {
    NProgress.done();
  }

  public render() {
    const page = Number(this.props.match.params.page) || 1;

    return React.createElement(() => {
      return (
        <Provider store={this.props.module.store}>
          <Container actions={this.props.module.actions} page={page}/>
        </Provider>
      );
    });
  }
}

export default createPrepareRenderer<IInitializeProps, IPrepare>(NewsPage)
