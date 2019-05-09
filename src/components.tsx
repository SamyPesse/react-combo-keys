import * as React from 'react';
import { useComboKeys } from './hooks';
import { KeyboardShortcuts, KeyboardShortcutTrigger, Options } from './types';

/*
 * Deprecated components.
 */

export function ComboKeys(props: {
    keyMap: KeyboardShortcuts;
    children: React.ReactNode;
}): React.ReactElement {
    const { children, keyMap } = props;

    useComboKeys(keyMap, [keyMap]);

    return children ? React.Children.only(children) : null;
}

export function ComboKey(props: {
    combo: string;
    onTrigger: KeyboardShortcutTrigger;
    children: React.ReactNode;
}): React.ReactElement {
    const { children, combo, onTrigger } = props;

    const keyMap = React.useMemo(
        () => ({
            [combo]: onTrigger
        }),
        [combo, onTrigger]
    );

    useComboKeys(keyMap, [keyMap]);

    return children ? React.Children.only(children) : null;
}
