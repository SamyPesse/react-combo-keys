import React from 'react';
import Mousetrap from 'mousetrap';

/*
 * Bind a keymap using mousetrap.
 */
const ComboKeys = React.createClass({
    propTypes: {
        children: React.PropTypes.node,
        keyMap: React.PropTypes.objectOf(
            React.PropTypes.func
        ).isRequired
    },

    componentDidMount() {
        this.bindKeyMap(
            this.props.keyMap
        );
    },

    componentDidUpdate(prevProps) {
        this.unbindKeyMap(prevProps.keyMap);
        this.bindKeyMap(this.props.keyMap);
    },

    componentWillUnmount() {
        this.unbindKeyMap(
            this.props.keyMap
        );
    },

    unbindKeyMap(keyMap) {
        Object.keys(keyMap)
        .forEach((combo) => {
            Mousetrap.unbind(combo);
        });
    },

    bindKeyMap(keyMap) {
        Object.keys(keyMap)
        .forEach((combo) => {
            const onTrigger = keyMap[combo];
            Mousetrap.bind(combo, onTrigger);
        });
    },

    render() {
        const { children } = this.props;
        return children ? React.Children.only(children) : null;
    }
});

/*
 * Component to bind a single handler. This is a wrapper around ComboKeys.
 */
const ComboKey = React.createClass({
    propTypes: {
        children: React.PropTypes.node,
        combo: React.PropTypes.string.isRequired,
        onTrigger: React.PropTypes.func.isRequired
    },

    render() {
        const { children, combo, onTrigger } = this.props;
        const keyMap = { [combo]: onTrigger };

        return (
            <ComboKeys keyMap={keyMap}>
                {children}
            </ComboKeys>
        );
    }
});

export {
    ComboKey,
    ComboKeys
};
