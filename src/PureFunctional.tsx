import { nameFunction } from "./nameFunction";
import * as React from "react";

class PureComponentWrap<TProps> extends React.PureComponent<TProps> {
    render() {
        const { _inner, ...others } = this.props as any;
        return _inner(others);
    }
}

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
