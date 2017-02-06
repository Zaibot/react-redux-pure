import * as React from 'react';
import { connect }from 'react-redux';

class PureComponentWrap extends React.PureComponent<any, any> {
    render() {
        const { _inner, ...others } = this.props;
        return _inner(others);
    }
}

export const PureConnect = function <TProps>(name: string) {
    return function <TState, TActions>(
        state: (state) => TState,
        actions: (dispatch) => TActions, cb: (props: TProps & TState & TActions) => React.ReactElement<TProps>
    ): React.StatelessComponent<TProps> {
        const f = function PureFunction(props) {
            return <PureComponentWrap _inner={cb} {...props} />
        } as any;
        f.displayName = `Connecting(${name})`;
        return connect(state, actions)(f) as any as React.StatelessComponent<TProps>;
    };
};
