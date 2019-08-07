import * as React from 'react';

type BootstrapStyle = "default" | "primary" | "secondary" | "success" | "info" | "warning" | "danger";

type BootstrapSize = "lg" | "normal" | "sm" | "xs";

export interface BootstrapToggleProps {
    /**
     * Direct styling of the toggle component
     */
    style?: React.CSSProperties;
    /**
     * Bootstrap style of the ON state
     */
    onstyle?: BootstrapStyle;
    /**
     * Additional CSS class name of the ON state
     */
    onClassName?: string;
    /**
     * Bootstrap style of the OFF state
     */
    offstyle?: BootstrapStyle;
    /**
     * Additional CSS class name of the OFF state
     */
    offClassName?: string;
    /**
     * Bootstrap style of the toggle handle
     */
    handlestyle?: BootstrapStyle;
    /**
     * Additional CSS class name of the toggle handle
     */
    handleClassName?: string;
    height?: string | number;
    width?: string | number;
    /**
     * The ON element to display. Defaults to "On" text
     */
    on?: React.ReactNode;
    /**
     * The OFF element to display. Defaults to "Off" text
     */
    off?: React.ReactNode;
    /**
     * State of the toggle
     */
    active?: boolean;
    /**
     * Whether the toggle is disabled
     */
    disabled?: boolean;
    /**
     * Bootstrap size
     */
    size?: BootstrapSize;
    /**
     * Handler for the toggle.
     * @param active New state of the toggle
     * @param parent Parent node
     * @param evt The click event
     */
    onClick: (active: boolean, parent: React.ReactNode, evt: React.MouseEvent) => void;
    /**
     * CSS class name for the whole toggle
     */
    className?: string;
    /**
     * If the toggle should recalculate its dimensions when visibility or dimensions change
     */
    recalculateOnResize?: boolean;
}

export default class BootstrapToggle extends React.Component<BootstrapToggleProps & React.HTMLAttributes<HTMLDivElement>> {
}

export class Bootstrap2Toggle extends React.Component<BootstrapToggleProps & React.HTMLAttributes<HTMLDivElement>> {
}
