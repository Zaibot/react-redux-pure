import * as React from 'react';
import { connect } from 'react-redux';

const nameFunction = (name, fn) => new Function(`fn`, `return function ${name}() { return fn.apply(this, arguments) };`)(fn);

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
        var f = function PureFunction(props) {
            return <PureComponentWrap _inner={render} {...props} />
        } as any;

        if (state) state = nameFunction(`PureConnect_${name}_state`, state)
        if (dispatch) dispatch = nameFunction(`PureConnect_${name}_dispatch`, dispatch)
        if (render) render = nameFunction(`PureConnect_${name}_render`, render)
        if (f) f = nameFunction(`PureConnect_${name}`, f)

        return connect(state, dispatch)(f) as any as React.StatelessComponent<TProps>;
    };
};