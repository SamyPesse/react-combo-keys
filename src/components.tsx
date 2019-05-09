import * as React from 'react';
import { useComboKeys } from './hooks';
import { KeyboardShortcuts, KeyboardShortcutTrigger, Options } from './types';

/*
 * Deprecated components.
 */

export function ComboKeys(
    props: Options & {
        keyMap: KeyboardShortcuts;
        children: React.ReactNode;
    }
): React.ReactElement {
    const { children, keyMap, ...options } = props;

    useComboKeys(keyMap, options);

    return children ? React.Children.only(children) : null;
}

export function ComboKey(props: {
    combo: string;
    onTrigger: KeyboardShortcutTrigger;
    children: React.ReactNode;
}): React.ReactElement {
    const { children, combo, onTrigger, ...options } = props;

    const keyMap = React.useMemo(
        () => ({
            [combo]: onTrigger
        }),
        [combo, onTrigger]
    );

    useComboKeys(keyMap, options);

    return children ? React.Children.only(children) : null;
}
