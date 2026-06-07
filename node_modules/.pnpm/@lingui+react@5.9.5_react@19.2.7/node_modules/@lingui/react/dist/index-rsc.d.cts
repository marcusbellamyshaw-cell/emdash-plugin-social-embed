import { T as TransProps, b as I18nContext } from './shared/react.05772d3b.cjs';
export { d as TransRenderCallbackOrComponent, c as TransRenderProps } from './shared/react.05772d3b.cjs';
import 'react/jsx-runtime';
import 'react';
import '@lingui/core';

declare function TransRsc(props: TransProps): React.ReactElement<any, any> | null;

declare function useLingui(): I18nContext;

export { TransRsc as Trans, TransProps, useLingui };
