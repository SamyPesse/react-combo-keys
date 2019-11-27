import * as React from 'react';

import { MousetrapContext } from './context';
import { KeyboardShortcuts } from './types';

/*
 * Bind keyboard shortcuts.
 */
export function useComboKeys(
    keyMap: KeyboardShortcuts
): void {
    const mousetrap = React.useContext(MousetrapContext);
    const keyMapRef = React.useRef(keyMap);
    keyMapRef.current = keyMap;

    // Sort keys to build a reliable dependency for the effect
    const keys = Object.keys(keyMap);
    keys.sort();
    const effectKey = keys.join(';');

    React.useEffect(() => {
        Object.keys(keyMap).forEach(combo => {
            mousetrap.bind(combo, (event) => {
                keyMapRef.current[combo](event);
            });
        });

        return () => {
            Object.keys(keyMap).forEach(combo => {
                mousetrap.unbind(combo);
            });
        };
    }, [effectKey]);
}
