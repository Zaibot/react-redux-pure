import * as React from 'react';
import { connect } from 'react-redux';

const nameFunction = <T extends Function>(name: string, fn: T) => new Function(`fn`, `return function ${name}() { return fn.apply(this, arguments) };`)(fn) as T;

class PureComponentWrap<TProps> extends React.PureComponent<TProps> {
    render() {
        const { _inner, ...others } = this.props as any;
        return _inner(others);
    }
}

export const Connect = function <TProps>(name: string) {
    return <TState extends {}, TActions extends {}>(
        state: (state, props?: TProps) => TState,
        dispatch: (dispatch, props?: TProps) => TActions,
        render: (props: TProps & TState & TActions & { children?: React.ReactNode }) => React.ReactElement<TProps>
    ): React.StatelessComponent<TProps> => {
        const res = connect(state, dispatch)(render);
        return res;
    };
};

export const PureFunctional = function <TProps>(name: string) {
    return (
        render: (props: TProps & { children?: React.ReactNode }) => React.ReactElement<TProps>
    ): React.StatelessComponent<TProps> => {
        const component: React.StatelessComponent<TProps> = Object.assign(
            nameFunction(`PureFunctional_${name}`, function PureFunction(props: TProps) {
                return <PureComponentWrap _inner={render} {...props} />
            }), {
                displayName: `PureFunctional(${name})`,
            });
        return component;
    };
};

export const PureConnect = function <TProps>(name: string) {
    return <TState extends {}, TActions extends {}>(
        state: (state, props?: TProps) => TState,
        dispatch: (dispatch, props?: TProps) => TActions,
        render: (props: TProps & TState & TActions & { children?: React.ReactNode }) => React.ReactElement<TProps>
    ): React.StatelessComponent<TProps> => {
        const component: React.StatelessComponent<TProps> = Object.assign(
            nameFunction(`PureConnect_${name}`, function PureFunction(props: TProps) {
                return <PureComponentWrap _inner={render} {...props} />
            }), {
                displayName: `PureConnect(${name})`,
            });
        if (state) state = nameFunction(`PureConnect_${name}_state`, state);
        if (dispatch) dispatch = nameFunction(`PureConnect_${name}_dispatch`, dispatch);
        if (render) render = nameFunction(`PureConnect_${name}_render`, render);
        return connect(state, dispatch)(component);
    };
};