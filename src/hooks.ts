import Mousetrap from 'mousetrap';
import * as React from 'react';
import { KeyboardShortcuts, Options } from './types';

/*
 * Bind keyboard shortcuts.
 */
export function useComboKeys(
    keyMap: KeyboardShortcuts,
    options: Options,
    criterias: any[] = [keyMap]
): void {
    React.useEffect(() => {
        const mousetrap = Mousetrap();

        // Plug the custom stopAt in
        if (options.stopAt) {
            const originalStopCallback = mousetrap.stopCallback;
            mousetrap.stopCallback = (
                e: Event,
                element: HTMLElement,
                combo: string
            ): boolean =>
                originalStopCallback(e, element, combo) &&
                options.stopAt(e, element, combo);
        }

        Object.keys(keyMap).forEach(combo => {
            mousetrap.bind(combo, keyMap[combo]);
        });

        return () => {
            mousetrap.destroy();
        };
    }, criterias);
}
