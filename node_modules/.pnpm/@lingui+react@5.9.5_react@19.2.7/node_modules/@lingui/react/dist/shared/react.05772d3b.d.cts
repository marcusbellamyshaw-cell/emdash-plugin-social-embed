import * as react_jsx_runtime from 'react/jsx-runtime';
import * as react from 'react';
import { MessageOptions, I18n } from '@lingui/core';

type TransRenderProps = {
    id: string;
    translation: React.ReactNode;
    children: React.ReactNode;
    message?: string | null;
};
type TransRenderCallbackOrComponent = {
    component?: never;
    render?: ((props: TransRenderProps) => React.ReactElement<any, any>) | null;
} | {
    component?: React.ComponentType<TransRenderProps> | null;
    render?: never;
};
type TransProps = {
    id: string;
    message?: string;
    values?: Record<string, unknown>;
    components?: {
        [key: string]: React.ElementType | any;
    };
    formats?: MessageOptions["formats"];
    comment?: string;
} & TransRenderCallbackOrComponent;
/**
 * Version of `<Trans>` component without using a Provider/Context React feature.
 * Primarily made for support React Server Components (RSC)
 *
 * @experimental the api of this component is not stabilized yet.
 */
declare function TransNoContext(props: TransProps & {
    lingui: {
        i18n: I18n;
        defaultComponent?: React.ComponentType<TransRenderProps>;
    };
}): React.ReactElement<any, any> | null;

type I18nContext = {
    i18n: I18n;
    _: I18n["_"];
    defaultComponent?: React.ComponentType<TransRenderProps>;
};
type I18nProviderProps = Omit<I18nContext, "_"> & {
    children?: React.ReactNode;
};
declare const LinguiContext: react.Context<I18nContext | null>;
declare function useLingui(): I18nContext;
declare const I18nProvider: ({ i18n, defaultComponent, children, }: I18nProviderProps) => react_jsx_runtime.JSX.Element | null;

export { I18nProvider as I, LinguiContext as L, type TransProps as T, type I18nProviderProps as a, type I18nContext as b, type TransRenderProps as c, type TransRenderCallbackOrComponent as d, TransNoContext as e, useLingui as u };
