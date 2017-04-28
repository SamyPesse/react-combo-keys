import React from 'react';
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

    for (let i = 0; i < aSize; i++) {
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
    constructor(props) {
        super(props);

        // Is it server-side rendering ?
        if (typeof Mousetrap == 'undefined') {
            return;
        }

        const self = this;
        this.mousetrap = Mousetrap();

        const _stopCallback = this.mousetrap.stopCallback;
        this.mousetrap.stopCallback = (e, element, combo) => {
            let result = _stopCallback(e, element, combo);

            if (result) {
                result = self.props.stopAt(e, element, combo);
            }

            return result;
        };
    }

    componentDidMount() {
        this.bindKeyMap(
            this.props.keyMap
        );
    }

    componentDidUpdate(prevProps) {
        if (areKeyMapsEqual(prevProps.keyMap, this.props.keyMap)) {
            return;
        }

        this.unbindKeyMap(prevProps.keyMap);
        this.bindKeyMap(this.props.keyMap);
    }

    componentWillUnmount() {
        this.unbindKeyMap(
            this.props.keyMap
        );
    }

    unbindKeyMap(keyMap) {
        Object.keys(keyMap)
        .forEach((combo) => {
            this.mousetrap.unbind(combo);
        });
    }

    bindKeyMap(keyMap) {
        Object.keys(keyMap)
        .forEach((combo) => {
            const onTrigger = keyMap[combo];
            this.mousetrap.bind(combo, onTrigger);
        });
    }

    render() {
        const { children } = this.props;
        return children ? React.Children.only(children) : null;
    }
}

ComboKeys.propTypes = {
    children: React.PropTypes.node,
    keyMap: React.PropTypes.objectOf(
        React.PropTypes.func
    ).isRequired,
    stopAt: React.PropTypes.func
};

/*
 * Component to bind a single handler. This is a wrapper around ComboKeys.
 */
class ComboKey extends React.PureComponent {
    render() {
        const { children, combo, onTrigger } = this.props;
        const keyMap = { [combo]: onTrigger };

        return (
            <ComboKeys keyMap={keyMap}>
                {children}
            </ComboKeys>
        );
    }
}

ComboKey.propTypes = {
    children: React.PropTypes.node,
    combo: React.PropTypes.string.isRequired,
    onTrigger: React.PropTypes.func.isRequired
};

export {
    ComboKey,
    ComboKeys
};
