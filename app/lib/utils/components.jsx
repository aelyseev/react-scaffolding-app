/* eslint-disable react/jsx-no-bind */
import React from 'react';

export function getDisplayName(component) {
    return component.displayName || component.name || 'Component';
}

// mapStateToProps sample
// const mapStateToProps = (state, setState) => ({increment: v => setState({counter: state.counter + 1})})
export function wrapWithState(initialState = {}, mapStateToProps) {
    return function r(Component) {
        class Wrapper extends React.Component {
            static displayName = `WrapWithState(${getDisplayName(Component)})`;

            constructor(props) {
                super(props);
                this.state = initialState;
            }

            render() {
                const mappedToStateProps = (typeof mapStateToProps === 'function') ?
                    mapStateToProps(this.state, this.setState.bind(this)) :
                    {setState: this.setState.bind(this)};
                const mergedProps = {...this.state, ...mappedToStateProps, ...this.props};
                return <Component {...mergedProps} />;
            }
        }

        return props => <Wrapper {...props} />;
    };
}
