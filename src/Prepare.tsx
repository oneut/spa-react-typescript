import * as React from "react";

interface IProps<I, P> {
  component: IComponent<I, P>;
}

interface IState<P> {
  initialProps: P
  isSyncing: boolean
}

interface IComponent<I, P> extends React.ComponentClass<I & P> {
  initialPropsWillGet(props: I): void
  getInitialProps(props: I): Promise<P>
  initialPropsDidGet(props: I & P): void
}

export default class Prepare<I extends object, P extends object> extends React.Component<IProps<I, P> & I, IState<P>> {
  public state: IState<P>;
  public props: IProps<I, P> & I;

  constructor(props: IProps<I, P> & I) {
    super(props);
    this.state = {
      initialProps: {} as P,
      isSyncing: true,
    };
  }

  public componentWillMount() {
    this.sync();
  }

  public componentWillReceiveProps() {
    this.sync();
  }

  public componentWillUpdate() {
    window.scrollTo(0, 0);
  }

  public shouldComponentUpdate(nextProps: IProps<I, P> & I, nextState: IState<P>) {
    return !(nextState.isSyncing);
  }

  public fireInitialPropsWillGet() {
    if (this.isFunction(this.props.component.initialPropsWillGet)) {
      this.props.component.initialPropsWillGet(this.props);
    }
  }

  public fireInitialPropsDidGet(initialProps: P) {
    if (this.isFunction(this.props.component.initialPropsDidGet)) {
      const props = {...this.props, ...initialProps};
      this.props.component.initialPropsDidGet(props);
    }
  }

  public sync() {
    this.setState({isSyncing: true}, () => {
      this.fire();
    });
  }

  public async fire() {
    const initialProps = await this.load();
    this.setInitialProps(initialProps);
  }

  public async load() {
    this.fireInitialPropsWillGet();
    if (!(this.isFunction(this.props.component.getInitialProps))) {
      return {} as P;
    }

    return await this.props.component.getInitialProps(this.props);
  }

  public setInitialProps(initialProps: P) {
    this.fireInitialPropsDidGet(initialProps);
    this.setState({
      initialProps,
      isSyncing: false
    });
  }

  public isFunction(func: any) {
    return !!(!!func && typeof func === 'function');
  }

  public render() {
    if (this.state.isSyncing) {
      return null
    }

    const props = {...this.props, ...this.state.initialProps};
    return <this.props.component {...props}/>;
  }
}

export function createPrepareRenderer<I extends object, P extends object>(component: IComponent<I, P>) {
  return (props: I) => {
    return <Prepare<I, P> component={component} {...props}/>
  }
}
