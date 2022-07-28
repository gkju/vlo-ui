import React, { MouseEventHandler, ReactElement } from 'react';
import { Handler } from 'react-use/lib/useKey';

export interface textInputProps {
    size?: InputSize,
    password?: boolean,
    error?: boolean,
    errors?: string,
    id?: string,
    name: string,
    placeholder: string
}

export interface RippleAbleProps {
    style?: any,
    className?: string,
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    size?: InputSize,
    primaryColor?: string,
    secondaryColor?: string
    squared?: boolean,
    radius?: number,
    style?: any,
    className?: string,
    wrapperStyle?: object
}

export interface EditButtonProps {
    style?: any,
    text?: string,
}

export interface inputWrapperProps {
    size?: InputSize,
}

export enum InputSize {
    Big, Medium, Small
}

export interface ModalProps {
    open: Boolean,
    close: MouseEventHandler<HTMLDivElement>,
}

export interface MinimalModalProps {
    open: Boolean,
    close: Function,
    handler: (input: string) => void,
    placeholder: string,
    validator: (input: string) => boolean,
}

export interface Item {
    route: string,
    icon: ReactElement
}

export interface MenuProps {
    items?: Array<Item>
}
