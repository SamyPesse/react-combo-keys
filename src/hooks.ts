import * as React from 'react';

import { MousetrapContext } from './context';
import { KeyboardShortcuts } from './types';

/*
 * Bind keyboard shortcuts.
 */
export function useComboKeys(
    keyMap: KeyboardShortcuts,
    criterias: any[] = [keyMap]
): void {
    const mousetrap = React.useContext(MousetrapContext);

    React.useEffect(() => {
        Object.keys(keyMap).forEach(combo => {
            mousetrap.bind(combo, keyMap[combo]);
        });

        return () => {
            Object.keys(keyMap).forEach(combo => {
                mousetrap.unbind(combo);
            });
        };
    }, criterias);
}
