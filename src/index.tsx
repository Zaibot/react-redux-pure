import * as React from 'react';
import { connect } from 'react-redux';

class PureComponentWrap extends React.PureComponent<any, any> {
    render() {
        const { _inner, ...others } = this.props;
        return _inner(others);
    }
}

export const Connect = function <TProps>(name: string) {
    return function <TState, TActions>(
        state: (state, props?: TProps) => TState,
        dispatch: (dispatch, props?: TProps) => TActions,
        render: (props: TProps & TState & TActions & { children?: React.ReactNode }) => React.ReactElement<TProps>
    ): React.StatelessComponent<TProps> {
        return connect(state, dispatch)(render) as any as React.StatelessComponent<TProps>;
    };
};

export const PureConnect = function <TProps>(name: string) {
    return function <TState, TActions>(
        state: (state, props?: TProps) => TState,
        dispatch: (dispatch, props?: TProps) => TActions,
        render: (props: TProps & TState & TActions & { children?: React.ReactNode }) => React.ReactElement<TProps>
    ): React.StatelessComponent<TProps> {
        const f = function PureFunction(props) {
            return <PureComponentWrap _inner={render} {...props} />
        } as any;

        if (state && !state.name) Object.defineProperty(state, "name", { get: () => `PureConnect.state(${name})` });
        if (dispatch && !dispatch.name) Object.defineProperty(dispatch, "name", { get: () => `PureConnect.dispatch(${name})` });
        if (render && !render.name) Object.defineProperty(render, "name", { get: () => `PureConnect.render(${name})` });
        Object.defineProperty(f, "name", { get: () => `PureConnect(${name})` });
        return connect(state, dispatch)(f) as any as React.StatelessComponent<TProps>;
    };
};
