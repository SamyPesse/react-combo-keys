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

    useComboKeys(keyMap);

    return children ? React.Children.only(children) : null;
}

export function ComboKey(props: {
    combo: string;
    onTrigger: KeyboardShortcutTrigger;
    children: React.ReactNode;
}): React.ReactElement {
    const { children, combo, onTrigger } = props;

    useComboKeys({
        [combo]: onTrigger
    });

    return children ? React.Children.only(children) : null;
}
