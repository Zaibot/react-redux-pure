import * as React from 'react';
import { connect } from 'react-redux';

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
