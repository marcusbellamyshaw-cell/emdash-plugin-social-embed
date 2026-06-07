//#region src/types.d.ts
interface ConfirmDialog {
  title: string;
  text: string;
  confirm: string;
  deny: string;
  style?: "danger";
}
interface ButtonElement {
  type: "button";
  action_id: string;
  label: string;
  style?: "primary" | "danger" | "secondary";
  value?: unknown;
  confirm?: ConfirmDialog;
}
interface TextInputElement {
  type: "text_input";
  action_id: string;
  label: string;
  placeholder?: string;
  initial_value?: string;
  multiline?: boolean;
}
interface NumberInputElement {
  type: "number_input";
  action_id: string;
  label: string;
  initial_value?: number;
  min?: number;
  max?: number;
}
interface SelectElement {
  type: "select";
  action_id: string;
  label: string;
  options: Array<{
    label: string;
    value: string;
  }>;
  initial_value?: string;
  /** Plugin route that returns `{ items: Array<{ id, name }> }` to populate options dynamically */
  optionsRoute?: string;
}
interface ToggleElement {
  type: "toggle";
  action_id: string;
  label: string;
  description?: string;
  initial_value?: boolean;
}
interface SecretInputElement {
  type: "secret_input";
  action_id: string;
  label: string;
  placeholder?: string;
  has_value?: boolean;
}
interface CheckboxElement {
  type: "checkbox";
  action_id: string;
  label: string;
  options: Array<{
    label: string;
    value: string;
  }>;
  initial_value?: string[];
}
interface DateInputElement {
  type: "date_input";
  action_id: string;
  label: string;
  initial_value?: string;
  placeholder?: string;
}
interface ComboboxElement {
  type: "combobox";
  action_id: string;
  label: string;
  options: Array<{
    label: string;
    value: string;
  }>;
  initial_value?: string;
  placeholder?: string;
}
interface RadioElement {
  type: "radio";
  action_id: string;
  label: string;
  options: Array<{
    label: string;
    value: string;
  }>;
  initial_value?: string;
}
/**
 * Sub-field types allowed inside a RepeaterElement. Limited to the scalar
 * inputs the admin widget currently renders inline.
 */
type RepeaterSubField = TextInputElement | NumberInputElement | SelectElement | ToggleElement;
/**
 * Array-of-objects field. Renders as a list of collapsible cards with inline
 * add/remove and drag-and-drop reordering. Sub-fields are scalar Block Kit
 * elements keyed by their `action_id`.
 *
 * Admin-authoring only: this element is rendered by the admin widget so plugin
 * blocks can capture repeating data. The runtime block renderer
 * (`renderElement`) deliberately returns `null` for `repeater` — repeater
 * values are persisted on the parent block and consumed by the plugin's own
 * runtime component, not re-rendered as a stand-alone block.
 */
interface RepeaterElement {
  type: "repeater";
  action_id: string;
  label: string;
  /** Singular label used in the UI (e.g. "FAQ" → "Add FAQ"). */
  item_label?: string;
  fields: RepeaterSubField[];
  min_items?: number;
  max_items?: number;
  /**
   * Default rows for the field. Note: the admin widget seeds new rows from
   * the sub-field types (empty string / `false`), not from `initial_value`;
   * plugins should populate persisted state via the form `values` payload
   * instead of relying on `initial_value` for pre-filled rows.
   */
  initial_value?: Array<Record<string, unknown>>;
}
/**
 * Picks an item from the media library (or uploads a new one). The stored value
 * is the selected asset's URL string, so this element is value-compatible with a
 * plain `text_input` — existing content continues to work after swapping.
 */
interface MediaPickerElement {
  type: "media_picker";
  action_id: string;
  label: string;
  /** Mime-type prefix filter (e.g. "image/"). Defaults to "image/". */
  mime_type_filter?: string;
  initial_value?: string;
  placeholder?: string;
}
type Element = ButtonElement | TextInputElement | NumberInputElement | SelectElement | ToggleElement | SecretInputElement | CheckboxElement | DateInputElement | ComboboxElement | RadioElement | RepeaterElement | MediaPickerElement;
type FieldCondition = {
  field: string;
  eq?: unknown;
  neq?: never;
} | {
  field: string;
  neq?: unknown;
  eq?: never;
};
type FormField = (ButtonElement | TextInputElement | NumberInputElement | SelectElement | ToggleElement | SecretInputElement | CheckboxElement | DateInputElement | ComboboxElement | RadioElement) & {
  condition?: FieldCondition;
};
interface TableColumn {
  key: string;
  label: string;
  format?: "text" | "badge" | "relative_time" | "number" | "code";
  sortable?: boolean;
}
interface StatItem {
  label: string;
  value: string | number;
  description?: string;
  trend?: "up" | "down" | "neutral";
}
/** A single data series for a timeseries chart. */
interface ChartSeries {
  /** Display name shown in tooltips and legends */
  name: string;
  /** Array of `[timestamp_ms, value]` tuples ordered by time */
  data: [number, number][];
  /**
   * Hex color for this series. If omitted, an automatic categorical color
   * from the Kumo palette is assigned based on the series index.
   */
  color?: string;
}
/** Timeseries-specific chart configuration */
interface TimeseriesChartConfig {
  chart_type: "timeseries";
  /** Visual style of each series. Defaults to `"line"`. */
  style?: "line" | "bar";
  /** Array of time series to display */
  series: ChartSeries[];
  /** Label for the x-axis */
  x_axis_name?: string;
  /** Label for the y-axis */
  y_axis_name?: string;
  /** Height of the chart in pixels. Defaults to 350. */
  height?: number;
  /** Render a gradient fill beneath line series */
  gradient?: boolean;
}
/** Custom chart configuration using raw ECharts options (pie, etc.) */
interface CustomChartConfig {
  chart_type: "custom";
  /** Raw ECharts option object — passed through to `chart.setOption()` */
  options: Record<string, unknown>;
  /** Height of the chart in pixels. Defaults to 350. */
  height?: number;
}
type ChartConfig = TimeseriesChartConfig | CustomChartConfig;
interface BlockBase {
  block_id?: string;
}
interface HeaderBlock extends BlockBase {
  type: "header";
  text: string;
}
interface SectionBlock extends BlockBase {
  type: "section";
  text: string;
  accessory?: Element;
}
interface DividerBlock extends BlockBase {
  type: "divider";
}
interface FieldsBlock extends BlockBase {
  type: "fields";
  fields: Array<{
    label: string;
    value: string;
  }>;
}
interface TableBlock extends BlockBase {
  type: "table";
  columns: TableColumn[];
  rows: Array<Record<string, unknown>>;
  next_cursor?: string;
  page_action_id: string;
  empty_text?: string;
}
interface ActionsBlock extends BlockBase {
  type: "actions";
  elements: Element[];
}
interface StatsBlock extends BlockBase {
  type: "stats";
  items: StatItem[];
}
interface FormBlock extends BlockBase {
  type: "form";
  fields: FormField[];
  submit: {
    label: string;
    action_id: string;
  };
}
interface ImageBlock extends BlockBase {
  type: "image";
  url: string;
  alt: string;
  title?: string;
}
interface ContextBlock extends BlockBase {
  type: "context";
  text: string;
}
interface ColumnsBlock extends BlockBase {
  type: "columns";
  columns: Block[][];
}
interface ChartBlock extends BlockBase {
  type: "chart";
  config: ChartConfig;
}
interface BannerBlock extends BlockBase {
  type: "banner";
  title?: string;
  description?: string;
  variant?: "default" | "alert" | "error";
}
interface MeterBlock extends BlockBase {
  type: "meter";
  label: string;
  value: number;
  max?: number;
  min?: number;
  custom_value?: string;
}
interface CodeBlock extends BlockBase {
  type: "code";
  code: string;
  language?: "ts" | "tsx" | "jsonc" | "bash" | "css";
}
interface TabPanel {
  label: string;
  blocks: Block[];
}
interface TabBlock extends BlockBase {
  type: "tab";
  panels: TabPanel[];
  default_tab?: number;
}
interface EmptyBlock extends BlockBase {
  type: "empty";
  title: string;
  description?: string;
  command_line?: string;
  size?: "sm" | "base" | "lg";
  actions?: Element[];
}
interface AccordionBlock extends BlockBase {
  type: "accordion";
  label: string;
  blocks: Block[];
  default_open?: boolean;
}
type Block = HeaderBlock | SectionBlock | DividerBlock | FieldsBlock | TableBlock | ActionsBlock | StatsBlock | FormBlock | ImageBlock | ContextBlock | ColumnsBlock | ChartBlock | BannerBlock | MeterBlock | CodeBlock | TabBlock | EmptyBlock | AccordionBlock;
interface BlockAction {
  type: "block_action";
  action_id: string;
  block_id?: string;
  value?: unknown;
}
interface FormSubmit {
  type: "form_submit";
  action_id: string;
  block_id?: string;
  values: Record<string, unknown>;
}
interface PageLoad {
  type: "page_load";
  page: string;
}
type BlockInteraction = BlockAction | FormSubmit | PageLoad;
interface BlockResponse {
  blocks: Block[];
  toast?: {
    message: string;
    type: "success" | "error" | "info";
  };
}
//#endregion
//#region src/builders.d.ts
declare function header(text: string, opts?: {
  blockId?: string;
}): HeaderBlock;
declare function section(text: string, opts?: {
  accessory?: Element;
  blockId?: string;
}): SectionBlock;
declare function divider(opts?: {
  blockId?: string;
}): DividerBlock;
declare function fieldsBlock(fields: Array<{
  label: string;
  value: string;
}>, opts?: {
  blockId?: string;
}): FieldsBlock;
declare function table(opts: {
  blockId?: string;
  columns: TableColumn[];
  rows: Array<Record<string, unknown>>;
  nextCursor?: string;
  pageActionId: string;
  emptyText?: string;
}): TableBlock;
declare function actionsBlock(elements: Element[], opts?: {
  blockId?: string;
}): ActionsBlock;
declare function stats(items: StatItem[], opts?: {
  blockId?: string;
}): StatsBlock;
declare function form(opts: {
  blockId?: string;
  fields: FormField[];
  submit: {
    label: string;
    actionId: string;
  };
}): FormBlock;
declare function image(opts: {
  url: string;
  alt: string;
  title?: string;
  blockId?: string;
}): ImageBlock;
declare function context(text: string, opts?: {
  blockId?: string;
}): ContextBlock;
declare function columnsBlock(columns: Block[][], opts?: {
  blockId?: string;
}): ColumnsBlock;
declare function bannerBlock(opts: {
  blockId?: string;
  variant?: "default" | "alert" | "error";
} & ({
  title: string;
  description?: string;
} | {
  title?: string;
  description: string;
})): BannerBlock;
declare function textInput(actionId: string, label: string, opts?: {
  placeholder?: string;
  initialValue?: string;
  multiline?: boolean;
}): TextInputElement;
declare function numberInput(actionId: string, label: string, opts?: {
  initialValue?: number;
  min?: number;
  max?: number;
}): NumberInputElement;
declare function select(actionId: string, label: string, options: Array<{
  label: string;
  value: string;
}>, opts?: {
  initialValue?: string;
}): SelectElement;
declare function toggle(actionId: string, label: string, opts?: {
  description?: string;
  initialValue?: boolean;
}): ToggleElement;
declare function button(actionId: string, label: string, opts?: {
  style?: "primary" | "danger" | "secondary";
  value?: unknown;
  confirm?: ConfirmDialog;
}): ButtonElement;
declare function secretInput(actionId: string, label: string, opts?: {
  placeholder?: string;
  hasValue?: boolean;
}): SecretInputElement;
declare function checkbox(actionId: string, label: string, options: Array<{
  label: string;
  value: string;
}>, opts?: {
  initialValue?: string[];
}): CheckboxElement;
declare function dateInput(actionId: string, label: string, opts?: {
  initialValue?: string;
  placeholder?: string;
}): DateInputElement;
declare function combobox(actionId: string, label: string, options: Array<{
  label: string;
  value: string;
}>, opts?: {
  initialValue?: string;
  placeholder?: string;
}): ComboboxElement;
declare function radio(actionId: string, label: string, options: Array<{
  label: string;
  value: string;
}>, opts?: {
  initialValue?: string;
}): RadioElement;
declare function repeater(actionId: string, label: string, fields: RepeaterSubField[], opts?: {
  itemLabel?: string;
  minItems?: number;
  maxItems?: number;
  initialValue?: Array<Record<string, unknown>>;
}): RepeaterElement;
declare function mediaPicker(actionId: string, label: string, opts?: {
  mimeTypeFilter?: string;
  initialValue?: string;
  placeholder?: string;
}): MediaPickerElement;
declare function timeseriesChart(opts: {
  blockId?: string;
  series: ChartSeries[];
  style?: "line" | "bar";
  xAxisName?: string;
  yAxisName?: string;
  height?: number;
  gradient?: boolean;
}): ChartBlock;
declare function customChart(opts: {
  blockId?: string;
  options: Record<string, unknown>;
  height?: number;
}): ChartBlock;
declare function meter(opts: {
  blockId?: string;
  label: string;
  value: number;
  max?: number;
  min?: number;
  customValue?: string;
}): MeterBlock;
declare function codeBlock(opts: {
  blockId?: string;
  code: string;
  language?: "ts" | "tsx" | "jsonc" | "bash" | "css";
}): CodeBlock;
declare function tabBlock(panels: TabPanel[], opts?: {
  defaultTab?: number;
  blockId?: string;
}): TabBlock;
declare function empty(opts: {
  blockId?: string;
  title: string;
  description?: string;
  commandLine?: string;
  size?: "sm" | "base" | "lg";
  actions?: Element[];
}): EmptyBlock;
declare function accordion(opts: {
  blockId?: string;
  label: string;
  blocks: Block[];
  defaultOpen?: boolean;
}): AccordionBlock;
declare const blocks: {
  header: typeof header;
  section: typeof section;
  divider: typeof divider;
  fields: typeof fieldsBlock;
  table: typeof table;
  actions: typeof actionsBlock;
  stats: typeof stats;
  form: typeof form;
  image: typeof image;
  context: typeof context;
  columns: typeof columnsBlock;
  timeseriesChart: typeof timeseriesChart;
  customChart: typeof customChart;
  banner: typeof bannerBlock;
  meter: typeof meter;
  code: typeof codeBlock;
  tab: typeof tabBlock;
  empty: typeof empty;
  accordion: typeof accordion;
};
declare const elements: {
  textInput: typeof textInput;
  numberInput: typeof numberInput;
  select: typeof select;
  toggle: typeof toggle;
  button: typeof button;
  secretInput: typeof secretInput;
  checkbox: typeof checkbox;
  combobox: typeof combobox;
  dateInput: typeof dateInput;
  radio: typeof radio;
  repeater: typeof repeater;
  mediaPicker: typeof mediaPicker;
};
//#endregion
//#region src/validation.d.ts
interface ValidationError {
  path: string;
  message: string;
}
declare function validateBlocks(blocks: unknown): {
  valid: boolean;
  errors: ValidationError[];
};
//#endregion
export { FormSubmit as A, SecretInputElement as B, DividerBlock as C, FieldsBlock as D, FieldCondition as E, NumberInputElement as F, TabBlock as G, SelectElement as H, PageLoad as I, TableColumn as J, TabPanel as K, RadioElement as L, ImageBlock as M, MediaPickerElement as N, FormBlock as O, MeterBlock as P, RepeaterElement as R, DateInputElement as S, EmptyBlock as T, StatItem as U, SectionBlock as V, StatsBlock as W, TimeseriesChartConfig as X, TextInputElement as Y, ToggleElement as Z, ColumnsBlock as _, ActionsBlock as a, ContextBlock as b, BlockAction as c, ButtonElement as d, ChartBlock as f, CodeBlock as g, CheckboxElement as h, AccordionBlock as i, HeaderBlock as j, FormField as k, BlockInteraction as l, ChartSeries as m, blocks as n, BannerBlock as o, ChartConfig as p, TableBlock as q, elements as r, Block as s, validateBlocks as t, BlockResponse as u, ComboboxElement as v, Element as w, CustomChartConfig as x, ConfirmDialog as y, RepeaterSubField as z };
//# sourceMappingURL=validation-5vL6669b.d.ts.map