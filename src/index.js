import React from 'react';
import PropTypes from 'prop-types';
import Mousetrap from 'mousetrap';

/*
 * Compare two keymaps
 */
function areKeyMapsEqual(a, b) {
    const aKeys = Object.keys(a);
    const aSize = aKeys.length;
    const bSize = Object.keys(b).length;

    if (aSize != bSize) {
        return false;
    }

    for (let i = 0; i < aSize; i += 1) {
        const aKey = aKeys[i];
        const aValue = a[aKey];
        const bValue = b[aKey];

        if (aValue != bValue) {
            return false;
        }
    }

    return true;
}

/*
 * Bind a keymap using mousetrap.
 */
class ComboKeys extends React.Component {
    static propTypes = {
        children: PropTypes.node,
        keyMap: PropTypes.objectOf(PropTypes.func).isRequired,
        stopAt: PropTypes.func
    };

    static defaultProps = {
        children: null,
        stopAt: null
    };

    constructor(props) {
        super(props);

        // Is it server-side rendering ?
        if (typeof Mousetrap !== 'function') {
            return;
        }

        this.mousetrap = Mousetrap();

        const { stopAt } = props;
        if (stopAt) {
            // Plug the custom stopAt in
            const originalStopCallback = this.mousetrap.stopCallback;
            this.mousetrap.stopCallback = (e, element, combo) =>
                originalStopCallback(e, element, combo) &&
                stopAt(e, element, combo);
        }
    }

    componentDidMount() {
        this.bindKeyMap(this.props.keyMap);
    }

    componentDidUpdate(prevProps) {
        if (areKeyMapsEqual(prevProps.keyMap, this.props.keyMap)) {
            return;
        }

        this.unbindKeyMap(prevProps.keyMap);
        this.bindKeyMap(this.props.keyMap);
    }

    componentWillUnmount() {
        this.unbindKeyMap(this.props.keyMap);
    }

    unbindKeyMap(keyMap) {
        Object.keys(keyMap).forEach(combo => {
            this.mousetrap.unbind(combo);
        });
    }

    bindKeyMap(keyMap) {
        Object.keys(keyMap).forEach(combo => {
            const onTrigger = keyMap[combo];
            this.mousetrap.bind(combo, onTrigger);
        });
    }

    render() {
        const { children } = this.props;
        return children ? React.Children.only(children) : null;
    }
}

/*
 * Component to bind a single handler. This is a wrapper around ComboKeys.
 */
class ComboKey extends React.PureComponent {
    static propTypes = {
        children: PropTypes.node,
        combo: PropTypes.string.isRequired,
        onTrigger: PropTypes.func.isRequired,
        stopAt: PropTypes.func
    };

    static defaultProps = {
        children: null,
        stopAt: null
    };

    render() {
        const { children, combo, onTrigger, stopAt } = this.props;
        const keyMap = { [combo]: onTrigger };

        return (
            <ComboKeys keyMap={keyMap} stopAt={stopAt}>
                {children}
            </ComboKeys>
        );
    }
}

export { ComboKey, ComboKeys };
