import { A as FormSubmit, B as SecretInputElement, C as DividerBlock, D as FieldsBlock, E as FieldCondition, F as NumberInputElement, G as TabBlock, H as SelectElement, I as PageLoad, J as TableColumn, K as TabPanel, L as RadioElement, M as ImageBlock, N as MediaPickerElement, O as FormBlock, P as MeterBlock, R as RepeaterElement, S as DateInputElement, T as EmptyBlock, U as StatItem, V as SectionBlock, W as StatsBlock, X as TimeseriesChartConfig, Y as TextInputElement, Z as ToggleElement, _ as ColumnsBlock, a as ActionsBlock, b as ContextBlock, c as BlockAction, d as ButtonElement, f as ChartBlock, g as CodeBlock, h as CheckboxElement, i as AccordionBlock, j as HeaderBlock, k as FormField, l as BlockInteraction, m as ChartSeries, n as blocks$1, o as BannerBlock, p as ChartConfig, q as TableBlock, r as elements, s as Block, t as validateBlocks, u as BlockResponse, v as ComboboxElement, w as Element, x as CustomChartConfig, y as ConfirmDialog, z as RepeaterSubField } from "./validation-5vL6669b.js";
import * as react_jsx_runtime0 from "react/jsx-runtime";
import { clsx } from "clsx";

//#region src/renderer.d.ts
interface BlockRendererProps {
  blocks: Block[];
  onAction: (interaction: BlockInteraction) => void;
}
declare function BlockRenderer({
  blocks,
  onAction
}: BlockRendererProps): react_jsx_runtime0.JSX.Element;
//#endregion
//#region src/render-element.d.ts
declare function renderElement(element: Element, onAction: (interaction: BlockInteraction) => void, onChange?: (actionId: string, value: unknown) => void): React.ReactNode;
//#endregion
//#region src/utils.d.ts
declare function cn(...inputs: Parameters<typeof clsx>): string;
declare function formatRelativeTime(iso: string): string;
//#endregion
export { type AccordionBlock, type ActionsBlock, type BannerBlock, type Block, type BlockAction, type BlockInteraction, BlockRenderer, type BlockRendererProps, type BlockResponse, type ButtonElement, type ChartBlock, type ChartConfig, type ChartSeries, type CheckboxElement, type CodeBlock, type ColumnsBlock, type ComboboxElement, type ConfirmDialog, type ContextBlock, type CustomChartConfig, type DateInputElement, type DividerBlock, type Element, type EmptyBlock, type FieldCondition, type FieldsBlock, type FormBlock, type FormField, type FormSubmit, type HeaderBlock, type ImageBlock, type MediaPickerElement, type MeterBlock, type NumberInputElement, type PageLoad, type RadioElement, type RepeaterElement, type RepeaterSubField, type SecretInputElement, type SectionBlock, type SelectElement, type StatItem, type StatsBlock, type TabBlock, type TabPanel, type TableBlock, type TableColumn, type TextInputElement, type TimeseriesChartConfig, type ToggleElement, blocks$1 as blocks, cn, elements, formatRelativeTime, renderElement, validateBlocks };
//# sourceMappingURL=index.d.ts.map