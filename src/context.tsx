import Mousetrap from 'mousetrap';
import * as React from 'react';

const IS_SSR = typeof Mousetrap !== 'function';

// During SSR, the value is null
export const MousetrapContext = React.createContext<Mousetrap | null>(
    IS_SSR ? null : Mousetrap()
);

/*
 * Provide the mousetrap context with extra options.
 */
export function ComboKeysProvider(props: {
    children: React.ReactNode;
    stopAt?: (e: Event, element: HTMLElement, combo: string) => boolean;
}): React.ReactElement {
    const { stopAt, children } = props;
    const mousetrapRef = React.useRef<Mousetrap | null>(null);

    if (!mousetrapRef.current && !IS_SSR) {
        mousetrapRef.current = Mousetrap();

        if (stopAt) {
            const originalStopCallback = mousetrapRef.current.stopCallback;
            mousetrapRef.current.stopCallback = (
                e: Event,
                element: HTMLElement,
                combo: string
            ): boolean =>
                originalStopCallback(e, element, combo) &&
                stopAt(e, element, combo);
        }
    }

    return (
        <MousetrapContext.Provider value={mousetrapRef.current}>
            {children}
        </MousetrapContext.Provider>
    );
}
