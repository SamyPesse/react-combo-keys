export type KeyboardShortcutTrigger = () => void;

export interface KeyboardShortcuts {
    [key: string]: KeyboardShortcutTrigger;
}

export interface Options {
    stopAt?: (e: Event, element: HTMLElement, combo: string) => boolean;
}
