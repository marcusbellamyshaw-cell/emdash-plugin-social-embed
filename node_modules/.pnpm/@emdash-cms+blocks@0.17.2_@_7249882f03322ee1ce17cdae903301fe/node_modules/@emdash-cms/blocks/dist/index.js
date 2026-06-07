import { n as blocks, r as elements, t as validateBlocks } from "./validation-Dq-a7CXm.js";
import { Badge, Banner, Button, Checkbox, CodeBlock, Collapsible, Combobox, Dialog, DialogRoot, Empty, Input, InputArea, Meter, Radio, Select, SensitiveInput, Switch, Tabs } from "@cloudflare/kumo";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { ArrowDown, ArrowUp, Info, Minus, Package, Warning, WarningCircle } from "@phosphor-icons/react";
import { Chart, ChartPalette, TimeseriesChart } from "@cloudflare/kumo/components/chart";
import { BarChart, LineChart, PieChart } from "echarts/charts";
import { AriaComponent, AxisPointerComponent, GridComponent, TooltipComponent } from "echarts/components";
import * as echarts from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

//#region src/blocks/accordion.tsx
function AccordionBlockComponent({ block, onAction }) {
	const [open, setOpen] = useState(block.default_open ?? false);
	return /* @__PURE__ */ jsxs(Collapsible.Root, {
		open,
		onOpenChange: setOpen,
		"data-testid": "collapsible",
		"data-open": open,
		children: [/* @__PURE__ */ jsx(Collapsible.DefaultTrigger, { children: block.label }), /* @__PURE__ */ jsx(Collapsible.DefaultPanel, { children: /* @__PURE__ */ jsx(BlockRenderer, {
			blocks: block.blocks,
			onAction
		}) })]
	});
}

//#endregion
//#region src/elements/button.tsx
function ButtonElementComponent({ element, onAction }) {
	const [confirmOpen, setConfirmOpen] = useState(false);
	const fireAction = useCallback(() => {
		onAction({
			type: "block_action",
			action_id: element.action_id,
			value: element.value
		});
	}, [
		onAction,
		element.action_id,
		element.value
	]);
	const handleClick = useCallback(() => {
		if (element.confirm) setConfirmOpen(true);
		else fireAction();
	}, [element.confirm, fireAction]);
	const handleConfirm = useCallback(() => {
		setConfirmOpen(false);
		fireAction();
	}, [fireAction]);
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Button, {
		variant: element.style === "primary" ? "primary" : element.style === "danger" ? "destructive" : "secondary",
		onClick: handleClick,
		children: element.label
	}), element.confirm && /* @__PURE__ */ jsx(DialogRoot, {
		open: confirmOpen,
		onOpenChange: setConfirmOpen,
		children: /* @__PURE__ */ jsxs(Dialog, { children: [
			/* @__PURE__ */ jsx("h3", {
				className: "text-lg font-semibold text-kumo-default",
				children: element.confirm.title
			}),
			/* @__PURE__ */ jsx("p", {
				className: "mt-1 text-sm text-kumo-subtle",
				children: element.confirm.text
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "flex justify-end gap-2 pt-4",
				children: [/* @__PURE__ */ jsx(Button, {
					variant: "secondary",
					onClick: () => setConfirmOpen(false),
					children: element.confirm.deny
				}), /* @__PURE__ */ jsx(Button, {
					variant: element.confirm.style === "danger" ? "destructive" : "primary",
					onClick: handleConfirm,
					children: element.confirm.confirm
				})]
			})
		] })
	})] });
}

//#endregion
//#region src/elements/checkbox.tsx
function CheckboxElementComponent({ element, onAction, onChange }) {
	const [values, setValues] = useState(element.initial_value ?? []);
	useEffect(() => {
		setValues(element.initial_value ?? []);
	}, [element.initial_value]);
	const handleChange = useCallback((newValues) => {
		setValues(newValues);
		if (onChange) onChange(element.action_id, newValues);
		else onAction({
			type: "block_action",
			action_id: element.action_id,
			value: newValues
		});
	}, [
		onChange,
		onAction,
		element.action_id
	]);
	return /* @__PURE__ */ jsx(Checkbox.Group, {
		legend: element.label,
		value: values,
		onValueChange: handleChange,
		children: element.options.map((opt) => /* @__PURE__ */ jsx(Checkbox.Item, {
			value: opt.value,
			label: opt.label
		}, opt.value))
	});
}

//#endregion
//#region src/elements/combobox.tsx
function ComboboxElementComponent({ element, onAction, onChange }) {
	const initialOption = useMemo(() => element.options.find((o) => o.value === element.initial_value) ?? null, [element.options, element.initial_value]);
	const [selected, setSelected] = useState(initialOption);
	useEffect(() => {
		setSelected(initialOption);
	}, [initialOption]);
	const handleChange = useCallback((newValue) => {
		const opt = newValue;
		setSelected(opt);
		const val = opt?.value ?? null;
		if (onChange) onChange(element.action_id, val);
		else onAction({
			type: "block_action",
			action_id: element.action_id,
			value: val
		});
	}, [
		onChange,
		onAction,
		element.action_id
	]);
	return /* @__PURE__ */ jsxs(Combobox, {
		label: element.label,
		items: element.options,
		value: selected,
		onValueChange: handleChange,
		children: [/* @__PURE__ */ jsx(Combobox.TriggerInput, { placeholder: element.placeholder ?? "Search..." }), /* @__PURE__ */ jsxs(Combobox.Content, { children: [/* @__PURE__ */ jsx(Combobox.List, { children: (item) => /* @__PURE__ */ jsx(Combobox.Item, {
			value: item,
			children: item.label
		}) }), /* @__PURE__ */ jsx(Combobox.Empty, { children: "No results" })] })]
	});
}

//#endregion
//#region src/elements/date-input.tsx
function DateInputElementComponent({ element, onAction, onChange }) {
	const [value, setValue] = useState(element.initial_value ?? "");
	useEffect(() => {
		setValue(element.initial_value ?? "");
	}, [element.initial_value]);
	const handleChange = useCallback((e) => {
		const newValue = e.target.value;
		setValue(newValue);
		if (onChange) onChange(element.action_id, newValue);
	}, [onChange, element.action_id]);
	const handleBlur = useCallback((e) => {
		if (!onChange) onAction({
			type: "block_action",
			action_id: element.action_id,
			value: e.target.value
		});
	}, [
		onChange,
		onAction,
		element.action_id
	]);
	return /* @__PURE__ */ jsxs("div", {
		className: "flex flex-col gap-1",
		children: [/* @__PURE__ */ jsx("label", {
			className: "text-sm font-medium text-kumo-text",
			children: element.label
		}), /* @__PURE__ */ jsx("input", {
			type: "date",
			value,
			onChange: handleChange,
			onBlur: handleBlur,
			placeholder: element.placeholder,
			className: "h-9 rounded-lg border border-kumo-line bg-kumo-bg px-3 text-sm text-kumo-text outline-none focus:ring-2 focus:ring-kumo-ring"
		})]
	});
}

//#endregion
//#region src/elements/number-input.tsx
function NumberInputElementComponent({ element, onAction, onChange }) {
	const handleChange = useCallback((e) => {
		const val = e.target.value === "" ? void 0 : Number(e.target.value);
		if (onChange) onChange(element.action_id, val);
	}, [onChange, element.action_id]);
	const handleBlur = useCallback((e) => {
		if (!onChange) {
			const val = e.target.value === "" ? void 0 : Number(e.target.value);
			onAction({
				type: "block_action",
				action_id: element.action_id,
				value: val
			});
		}
	}, [
		onChange,
		onAction,
		element.action_id
	]);
	return /* @__PURE__ */ jsx(Input, {
		label: element.label,
		type: "number",
		min: element.min,
		max: element.max,
		defaultValue: element.initial_value,
		onChange: handleChange,
		onBlur: handleBlur
	});
}

//#endregion
//#region src/elements/radio.tsx
function RadioElementComponent({ element, onAction, onChange }) {
	const [value, setValue] = useState(element.initial_value ?? "");
	useEffect(() => {
		setValue(element.initial_value ?? "");
	}, [element.initial_value]);
	const handleChange = useCallback((newValue) => {
		setValue(newValue);
		if (onChange) onChange(element.action_id, newValue);
		else onAction({
			type: "block_action",
			action_id: element.action_id,
			value: newValue
		});
	}, [
		onChange,
		onAction,
		element.action_id
	]);
	return /* @__PURE__ */ jsx(Radio.Group, {
		legend: element.label,
		value,
		onValueChange: handleChange,
		children: element.options.map((opt) => /* @__PURE__ */ jsx(Radio.Item, {
			value: opt.value,
			label: opt.label
		}, opt.value))
	});
}

//#endregion
//#region src/elements/secret-input.tsx
function SecretInputElementComponent({ element, onAction, onChange }) {
	const [value, setValue] = useState("");
	const [editing, setEditing] = useState(!element.has_value);
	const handleValueChange = useCallback((v) => {
		setValue(v);
		if (onChange) onChange(element.action_id, v);
	}, [onChange, element.action_id]);
	const handleFocus = useCallback(() => {
		if (!editing) {
			setEditing(true);
			setValue("");
		}
	}, [editing]);
	const handleBlur = useCallback(() => {
		if (!onChange && value) onAction({
			type: "block_action",
			action_id: element.action_id,
			value
		});
		if (!value && element.has_value) setEditing(false);
	}, [
		onChange,
		onAction,
		element.action_id,
		value,
		element.has_value
	]);
	if (!editing) return /* @__PURE__ */ jsx(SensitiveInput, {
		label: element.label,
		value: "••••••••",
		readOnly: true,
		onFocus: handleFocus,
		placeholder: element.placeholder
	});
	return /* @__PURE__ */ jsx(SensitiveInput, {
		label: element.label,
		value,
		onValueChange: handleValueChange,
		onFocus: handleFocus,
		onBlur: handleBlur,
		placeholder: element.placeholder
	});
}

//#endregion
//#region src/elements/select.tsx
function SelectElementComponent({ element, onAction, onChange }) {
	const handleValueChange = useCallback((value) => {
		if (onChange) onChange(element.action_id, value);
		else onAction({
			type: "block_action",
			action_id: element.action_id,
			value
		});
	}, [
		onChange,
		onAction,
		element.action_id
	]);
	return /* @__PURE__ */ jsx(Select, {
		label: element.label,
		defaultValue: element.initial_value,
		onValueChange: handleValueChange,
		children: element.options.map((opt) => /* @__PURE__ */ jsx(Select.Option, {
			value: opt.value,
			children: opt.label
		}, opt.value))
	});
}

//#endregion
//#region src/elements/text-input.tsx
function TextInputElementComponent({ element, onAction, onChange }) {
	const handleChange = useCallback((e) => {
		if (onChange) onChange(element.action_id, e.target.value);
	}, [onChange, element.action_id]);
	const handleBlur = useCallback((e) => {
		if (!onChange) onAction({
			type: "block_action",
			action_id: element.action_id,
			value: e.target.value
		});
	}, [
		onChange,
		onAction,
		element.action_id
	]);
	if (element.multiline) return /* @__PURE__ */ jsx(InputArea, {
		label: element.label,
		placeholder: element.placeholder,
		defaultValue: element.initial_value,
		onChange: handleChange,
		onBlur: handleBlur
	});
	return /* @__PURE__ */ jsx(Input, {
		label: element.label,
		placeholder: element.placeholder,
		defaultValue: element.initial_value,
		onChange: handleChange,
		onBlur: handleBlur
	});
}

//#endregion
//#region src/elements/toggle.tsx
function ToggleElementComponent({ element, onAction, onChange }) {
	const [checked, setChecked] = useState(element.initial_value ?? false);
	const handleChange = useCallback((value) => {
		setChecked(value);
		if (onChange) onChange(element.action_id, value);
		else onAction({
			type: "block_action",
			action_id: element.action_id,
			value
		});
	}, [
		onChange,
		onAction,
		element.action_id
	]);
	return /* @__PURE__ */ jsx(Switch, {
		label: element.label,
		checked,
		onCheckedChange: handleChange
	});
}

//#endregion
//#region src/render-element.tsx
function renderElement(element, onAction, onChange) {
	switch (element.type) {
		case "button": return /* @__PURE__ */ jsx(ButtonElementComponent, {
			element,
			onAction
		});
		case "text_input": return /* @__PURE__ */ jsx(TextInputElementComponent, {
			element,
			onAction,
			onChange
		});
		case "number_input": return /* @__PURE__ */ jsx(NumberInputElementComponent, {
			element,
			onAction,
			onChange
		});
		case "select": return /* @__PURE__ */ jsx(SelectElementComponent, {
			element,
			onAction,
			onChange
		});
		case "toggle": return /* @__PURE__ */ jsx(ToggleElementComponent, {
			element,
			onAction,
			onChange
		});
		case "secret_input": return /* @__PURE__ */ jsx(SecretInputElementComponent, {
			element,
			onAction,
			onChange
		});
		case "checkbox": return /* @__PURE__ */ jsx(CheckboxElementComponent, {
			element,
			onAction,
			onChange
		});
		case "radio": return /* @__PURE__ */ jsx(RadioElementComponent, {
			element,
			onAction,
			onChange
		});
		case "date_input": return /* @__PURE__ */ jsx(DateInputElementComponent, {
			element,
			onAction,
			onChange
		});
		case "combobox": return /* @__PURE__ */ jsx(ComboboxElementComponent, {
			element,
			onAction,
			onChange
		});
		case "repeater":
			if (import.meta.env?.DEV) console.warn("[blocks] renderElement: 'repeater' is an admin-authoring element and renders nothing at runtime");
			return null;
		case "media_picker": return null;
		default: return null;
	}
}

//#endregion
//#region src/blocks/actions.tsx
function ActionsBlockComponent({ block, onAction }) {
	return /* @__PURE__ */ jsx("div", {
		className: "flex flex-wrap gap-2",
		children: block.elements.map((el, i) => /* @__PURE__ */ jsx("div", { children: renderElement(el, onAction) }, el.action_id ?? i))
	});
}

//#endregion
//#region src/blocks/banner.tsx
function useVariantIcon(variant) {
	return useMemo(() => {
		switch (variant) {
			case "alert": return /* @__PURE__ */ jsx(Warning, {
				weight: "fill",
				size: 20
			});
			case "error": return /* @__PURE__ */ jsx(WarningCircle, {
				weight: "fill",
				size: 20
			});
			default: return /* @__PURE__ */ jsx(Info, {
				weight: "fill",
				size: 20
			});
		}
	}, [variant]);
}
function BannerBlockComponent({ block }) {
	const variant = block.variant ?? "default";
	return /* @__PURE__ */ jsx(Banner, {
		variant,
		icon: useVariantIcon(variant),
		title: block.title,
		description: block.description
	});
}

//#endregion
//#region src/utils.ts
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
/**
* Detects dark mode from `<html data-theme="dark">` or the system
* `prefers-color-scheme` media query and stays in sync reactively.
*/
function useIsDarkMode() {
	const [dark, setDark] = useState(() => {
		if (typeof document === "undefined") return false;
		const attr = document.documentElement.getAttribute("data-theme");
		if (attr === "dark") return true;
		if (attr === "light") return false;
		return window.matchMedia("(prefers-color-scheme: dark)").matches;
	});
	useEffect(() => {
		const observer = new MutationObserver(() => {
			const attr = document.documentElement.getAttribute("data-theme");
			if (attr === "dark") return setDark(true);
			if (attr === "light") return setDark(false);
			setDark(window.matchMedia("(prefers-color-scheme: dark)").matches);
		});
		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ["data-theme"]
		});
		const mq = window.matchMedia("(prefers-color-scheme: dark)");
		const handler = (e) => {
			if (!document.documentElement.hasAttribute("data-theme")) setDark(e.matches);
		};
		mq.addEventListener("change", handler);
		return () => {
			observer.disconnect();
			mq.removeEventListener("change", handler);
		};
	}, []);
	return dark;
}
const MINUTE = 60;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const WEEK = 7 * DAY;
const MONTH = 30 * DAY;
const YEAR = 365 * DAY;
function formatRelativeTime(iso) {
	const date = new Date(iso);
	const now = Date.now();
	const diff = Math.floor((now - date.getTime()) / 1e3);
	if (diff < 0) return "just now";
	if (diff < MINUTE) return "just now";
	if (diff < HOUR) {
		const mins = Math.floor(diff / MINUTE);
		return mins === 1 ? "1 minute ago" : `${mins} minutes ago`;
	}
	if (diff < DAY) {
		const hours = Math.floor(diff / HOUR);
		return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
	}
	if (diff < WEEK) {
		const days = Math.floor(diff / DAY);
		return days === 1 ? "1 day ago" : `${days} days ago`;
	}
	if (diff < MONTH) {
		const weeks = Math.floor(diff / WEEK);
		return weeks === 1 ? "1 week ago" : `${weeks} weeks ago`;
	}
	if (diff < YEAR) {
		const months = Math.floor(diff / MONTH);
		return months === 1 ? "1 month ago" : `${months} months ago`;
	}
	const years = Math.floor(diff / YEAR);
	return years === 1 ? "1 year ago" : `${years} years ago`;
}

//#endregion
//#region src/blocks/chart.tsx
echarts.use([
	BarChart,
	LineChart,
	PieChart,
	AriaComponent,
	AxisPointerComponent,
	GridComponent,
	TooltipComponent,
	CanvasRenderer
]);
const RE_AMP = /&/g;
const RE_LT = /</g;
const RE_GT = />/g;
const RE_QUOT = /"/g;
const RE_APOS = /'/g;
function escapeHtml(str) {
	return str.replace(RE_AMP, "&amp;").replace(RE_LT, "&lt;").replace(RE_GT, "&gt;").replace(RE_QUOT, "&quot;").replace(RE_APOS, "&#039;");
}
/** Keys that accept HTML strings or executable content in ECharts options */
const DANGEROUS_KEYS = new Set([
	"formatter",
	"rich",
	"graphic",
	"axisPointer"
]);
function isRecord(v) {
	return typeof v === "object" && v !== null && !Array.isArray(v);
}
const RE_HTML_TAG = /<[a-z/!]/i;
function containsHtml(v) {
	return typeof v === "string" && RE_HTML_TAG.test(v);
}
/**
* Deep-clone an ECharts options object, stripping properties that could
* inject HTML or executable content. Strings containing HTML tags are
* replaced with escaped versions.
*/
function sanitizeOptions(obj) {
	const result = {};
	for (const [key, value] of Object.entries(obj)) {
		if (DANGEROUS_KEYS.has(key)) continue;
		if (containsHtml(value)) result[key] = escapeHtml(value);
		else if (Array.isArray(value)) result[key] = value.map((item) => isRecord(item) ? sanitizeOptions(item) : containsHtml(item) ? escapeHtml(item) : item);
		else if (isRecord(value)) result[key] = sanitizeOptions(value);
		else result[key] = value;
	}
	return result;
}
function TimeseriesChartBlock({ block, isDarkMode }) {
	const config = block.config;
	if (config.chart_type !== "timeseries") return null;
	const data = useMemo(() => config.series.map((s, i) => ({
		name: escapeHtml(s.name),
		data: s.data,
		color: s.color ?? ChartPalette.categorical(i, isDarkMode)
	})), [config.series, isDarkMode]);
	return /* @__PURE__ */ jsx(TimeseriesChart, {
		echarts,
		isDarkMode,
		type: config.style,
		data,
		xAxisName: config.x_axis_name ? escapeHtml(config.x_axis_name) : void 0,
		yAxisName: config.y_axis_name ? escapeHtml(config.y_axis_name) : void 0,
		height: config.height,
		gradient: config.gradient
	});
}
function CustomChartBlock({ block, isDarkMode }) {
	const config = block.config;
	if (config.chart_type !== "custom") return null;
	return /* @__PURE__ */ jsx(Chart, {
		echarts,
		isDarkMode,
		options: useMemo(() => {
			const sanitized = sanitizeOptions(config.options);
			if (isRecord(sanitized.tooltip)) sanitized.tooltip.renderMode = "richText";
			else sanitized.tooltip = { renderMode: "richText" };
			return sanitized;
		}, [config.options]),
		height: config.height
	});
}
function ChartBlockComponent({ block }) {
	const isDarkMode = useIsDarkMode();
	return /* @__PURE__ */ jsx("div", {
		className: "rounded-lg border border-kumo-line p-4",
		children: block.config.chart_type === "timeseries" ? /* @__PURE__ */ jsx(TimeseriesChartBlock, {
			block,
			isDarkMode
		}) : /* @__PURE__ */ jsx(CustomChartBlock, {
			block,
			isDarkMode
		})
	});
}

//#endregion
//#region src/blocks/code.tsx
function CodeBlockComponent({ block }) {
	return /* @__PURE__ */ jsx(CodeBlock, {
		code: block.code,
		lang: block.language
	});
}

//#endregion
//#region src/blocks/columns.tsx
function ColumnsBlockComponent({ block, onAction }) {
	return /* @__PURE__ */ jsx("div", {
		className: Math.min(block.columns.length, 3) === 2 ? "grid grid-cols-2 gap-4" : "grid grid-cols-3 gap-4",
		children: block.columns.map((col, i) => /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(BlockRenderer, {
			blocks: col,
			onAction
		}) }, i))
	});
}

//#endregion
//#region src/blocks/context.tsx
function ContextBlockComponent({ block }) {
	return /* @__PURE__ */ jsx("p", {
		className: "text-sm text-kumo-subtle",
		children: block.text
	});
}

//#endregion
//#region src/blocks/divider.tsx
function DividerBlockComponent() {
	return /* @__PURE__ */ jsx("hr", { className: "my-4 border-kumo-line" });
}

//#endregion
//#region src/blocks/empty.tsx
function EmptyBlockComponent({ block, onAction }) {
	const contents = block.actions && block.actions.length > 0 ? /* @__PURE__ */ jsx("div", {
		className: "flex flex-wrap justify-center gap-2",
		children: block.actions.map((el, i) => /* @__PURE__ */ jsx("div", { children: renderElement(el, onAction) }, el.action_id ?? i))
	}) : void 0;
	return /* @__PURE__ */ jsx(Empty, {
		icon: /* @__PURE__ */ jsx(Package, {
			size: 48,
			weight: "duotone"
		}),
		title: block.title,
		description: block.description,
		commandLine: block.command_line,
		size: block.size,
		contents
	});
}

//#endregion
//#region src/blocks/fields.tsx
function FieldsBlockComponent({ block }) {
	return /* @__PURE__ */ jsx("div", {
		className: "grid grid-cols-2 gap-x-6 gap-y-3",
		children: block.fields.map((field, i) => /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
			className: "text-sm text-kumo-subtle",
			children: field.label
		}), /* @__PURE__ */ jsx("div", {
			className: "text-kumo-default truncate",
			title: field.value,
			children: field.value
		})] }, i))
	});
}

//#endregion
//#region src/blocks/form.tsx
function deepEqual(a, b) {
	if (a === b) return true;
	if (Array.isArray(a) && Array.isArray(b)) {
		if (a.length !== b.length) return false;
		return a.every((v, i) => deepEqual(v, b[i]));
	}
	return false;
}
function evaluateCondition(condition, values) {
	const fieldValue = values[condition.field];
	if ("eq" in condition && condition.eq !== void 0) return deepEqual(fieldValue, condition.eq);
	if ("neq" in condition && condition.neq !== void 0) return !deepEqual(fieldValue, condition.neq);
	return true;
}
function getInitialValues(fields) {
	const values = {};
	for (const field of fields) if ("initial_value" in field && field.initial_value !== void 0) values[field.action_id] = field.initial_value;
	return values;
}
function FormBlockComponent({ block, onAction }) {
	const [values, setValues] = useState(() => getInitialValues(block.fields));
	const handleChange = useCallback((actionId, value) => {
		setValues((prev) => ({
			...prev,
			[actionId]: value
		}));
	}, []);
	function handleSubmit(e) {
		e.preventDefault();
		onAction({
			type: "form_submit",
			action_id: block.submit.action_id,
			block_id: block.block_id,
			values
		});
	}
	return /* @__PURE__ */ jsxs("form", {
		onSubmit: handleSubmit,
		className: "flex flex-col gap-4",
		children: [block.fields.map((field) => {
			if (field.condition && !evaluateCondition(field.condition, values)) return null;
			return /* @__PURE__ */ jsx("div", { children: renderElement(field, onAction, handleChange) }, field.action_id);
		}), /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(Button, {
			type: "submit",
			children: block.submit.label
		}) })]
	});
}

//#endregion
//#region src/blocks/header.tsx
function HeaderBlockComponent({ block }) {
	return /* @__PURE__ */ jsx("h2", {
		className: "text-xl font-bold text-kumo-default",
		children: block.text
	});
}

//#endregion
//#region src/blocks/image.tsx
function ImageBlockComponent({ block }) {
	return /* @__PURE__ */ jsxs("figure", { children: [/* @__PURE__ */ jsx("img", {
		src: block.url,
		alt: block.alt,
		className: "max-w-full rounded"
	}), block.title && /* @__PURE__ */ jsx("figcaption", {
		className: "mt-1 text-sm text-kumo-subtle",
		children: block.title
	})] });
}

//#endregion
//#region src/blocks/meter.tsx
function MeterBlockComponent({ block }) {
	return /* @__PURE__ */ jsx(Meter, {
		label: block.label,
		value: block.value,
		max: block.max,
		min: block.min,
		customValue: block.custom_value
	});
}

//#endregion
//#region src/blocks/section.tsx
function SectionBlockComponent({ block, onAction }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "flex items-start justify-between gap-4",
		children: [/* @__PURE__ */ jsx("div", {
			className: "flex-1 text-kumo-default",
			children: block.text
		}), block.accessory && /* @__PURE__ */ jsx("div", {
			className: "flex-shrink-0",
			children: renderElement(block.accessory, onAction)
		})]
	});
}

//#endregion
//#region src/blocks/stats.tsx
const trendConfig = {
	up: {
		icon: ArrowUp,
		color: "text-green-600"
	},
	down: {
		icon: ArrowDown,
		color: "text-red-600"
	},
	neutral: {
		icon: Minus,
		color: "text-kumo-subtle"
	}
};
function StatCard({ item }) {
	const trend = item.trend ? trendConfig[item.trend] : null;
	const TrendIcon = trend?.icon;
	return /* @__PURE__ */ jsxs("div", {
		className: "flex-1 rounded-lg border border-kumo-line p-4",
		children: [
			/* @__PURE__ */ jsx("div", {
				className: "text-sm text-kumo-subtle",
				children: item.label
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "mt-1 flex items-baseline gap-2",
				children: [/* @__PURE__ */ jsx("span", {
					className: "text-2xl font-bold text-kumo-default",
					children: item.value
				}), TrendIcon && /* @__PURE__ */ jsx("span", {
					className: cn("flex items-center", trend.color),
					children: /* @__PURE__ */ jsx(TrendIcon, { size: 16 })
				})]
			}),
			item.description && /* @__PURE__ */ jsx("div", {
				className: "mt-1 text-sm text-kumo-subtle",
				children: item.description
			})
		]
	});
}
function StatsBlockComponent({ block }) {
	return /* @__PURE__ */ jsx("div", {
		className: "flex gap-4",
		children: block.items.map((item, i) => /* @__PURE__ */ jsx(StatCard, { item }, i))
	});
}

//#endregion
//#region src/blocks/tab.tsx
function TabBlockComponent({ block, onAction }) {
	const [activeTab, setActiveTab] = useState(block.default_tab ?? 0);
	const tabs = block.panels.map((panel, i) => ({
		value: String(i),
		label: panel.label
	}));
	return /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx(Tabs, {
		variant: "underline",
		value: String(activeTab),
		onValueChange: (value) => setActiveTab(Number(value)),
		tabs
	}), /* @__PURE__ */ jsx("div", {
		className: "pt-4",
		children: /* @__PURE__ */ jsx(BlockRenderer, {
			blocks: block.panels[activeTab]?.blocks ?? [],
			onAction
		})
	})] });
}

//#endregion
//#region src/blocks/table.tsx
function formatCell(value, format) {
	let str;
	if (value == null) str = "";
	else if (typeof value === "string") str = value;
	else if (typeof value === "number" || typeof value === "boolean") str = String(value);
	else if (typeof value === "object") str = JSON.stringify(value);
	else str = "";
	switch (format) {
		case "badge": return /* @__PURE__ */ jsx(Badge, { children: str });
		case "relative_time": return str ? formatRelativeTime(str) : "";
		case "number": {
			const num = Number(value);
			return Number.isNaN(num) ? str : num.toLocaleString();
		}
		case "code": return /* @__PURE__ */ jsx("code", {
			className: "rounded bg-kumo-tint px-1.5 py-0.5 font-mono text-sm",
			children: str
		});
		default: return str;
	}
}
function TableBlockComponent({ block, onAction }) {
	const [sort, setSort] = useState(null);
	function handleSort(key) {
		const next = sort?.key === key && sort.dir === "asc" ? {
			key,
			dir: "desc"
		} : {
			key,
			dir: "asc"
		};
		setSort(next);
		onAction({
			type: "block_action",
			action_id: block.page_action_id,
			block_id: block.block_id,
			value: { sort: next }
		});
	}
	function handleLoadMore() {
		onAction({
			type: "block_action",
			action_id: block.page_action_id,
			block_id: block.block_id,
			value: {
				cursor: block.next_cursor,
				sort
			}
		});
	}
	if (block.rows.length === 0 && block.empty_text) return /* @__PURE__ */ jsx("p", {
		className: "py-4 text-center text-sm text-kumo-subtle",
		children: block.empty_text
	});
	return /* @__PURE__ */ jsxs("div", {
		className: "overflow-x-auto",
		children: [/* @__PURE__ */ jsxs("table", {
			className: "w-full text-start text-sm",
			children: [/* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsx("tr", {
				className: "border-b border-kumo-line",
				children: block.columns.map((col) => /* @__PURE__ */ jsx("th", {
					className: cn("px-3 py-2 text-sm font-medium text-kumo-subtle", col.sortable && "cursor-pointer select-none"),
					onClick: col.sortable ? () => handleSort(col.key) : void 0,
					children: /* @__PURE__ */ jsxs("span", {
						className: "inline-flex items-center gap-1",
						children: [col.label, col.sortable && sort?.key === col.key && (sort.dir === "asc" ? /* @__PURE__ */ jsx(ArrowUp, { size: 14 }) : /* @__PURE__ */ jsx(ArrowDown, { size: 14 }))]
					})
				}, col.key))
			}) }), /* @__PURE__ */ jsx("tbody", { children: block.rows.map((row, i) => /* @__PURE__ */ jsx("tr", {
				className: "border-b border-kumo-line last:border-0",
				children: block.columns.map((col) => /* @__PURE__ */ jsx("td", {
					className: "px-3 py-2 text-kumo-default",
					children: formatCell(row[col.key], col.format)
				}, col.key))
			}, i)) })]
		}), block.next_cursor && /* @__PURE__ */ jsx("div", {
			className: "mt-2 flex justify-center",
			children: /* @__PURE__ */ jsx("button", {
				type: "button",
				onClick: handleLoadMore,
				className: "text-sm text-kumo-link hover:underline",
				children: "Load more"
			})
		})]
	});
}

//#endregion
//#region src/renderer.tsx
function renderBlock(block, onAction) {
	switch (block.type) {
		case "header": return /* @__PURE__ */ jsx(HeaderBlockComponent, { block });
		case "section": return /* @__PURE__ */ jsx(SectionBlockComponent, {
			block,
			onAction
		});
		case "divider": return /* @__PURE__ */ jsx(DividerBlockComponent, {});
		case "fields": return /* @__PURE__ */ jsx(FieldsBlockComponent, { block });
		case "table": return /* @__PURE__ */ jsx(TableBlockComponent, {
			block,
			onAction
		});
		case "actions": return /* @__PURE__ */ jsx(ActionsBlockComponent, {
			block,
			onAction
		});
		case "stats": return /* @__PURE__ */ jsx(StatsBlockComponent, { block });
		case "form": return /* @__PURE__ */ jsx(FormBlockComponent, {
			block,
			onAction
		});
		case "image": return /* @__PURE__ */ jsx(ImageBlockComponent, { block });
		case "context": return /* @__PURE__ */ jsx(ContextBlockComponent, { block });
		case "columns": return /* @__PURE__ */ jsx(ColumnsBlockComponent, {
			block,
			onAction
		});
		case "chart": return /* @__PURE__ */ jsx(ChartBlockComponent, { block });
		case "meter": return /* @__PURE__ */ jsx(MeterBlockComponent, { block });
		case "banner": return /* @__PURE__ */ jsx(BannerBlockComponent, { block });
		case "code": return /* @__PURE__ */ jsx(CodeBlockComponent, { block });
		case "tab": return /* @__PURE__ */ jsx(TabBlockComponent, {
			block,
			onAction
		});
		case "empty": return /* @__PURE__ */ jsx(EmptyBlockComponent, {
			block,
			onAction
		});
		case "accordion": return /* @__PURE__ */ jsx(AccordionBlockComponent, {
			block,
			onAction
		});
		default: return null;
	}
}
function BlockRenderer({ blocks, onAction }) {
	return /* @__PURE__ */ jsx("div", {
		className: "flex flex-col gap-4",
		children: blocks.map((block, i) => /* @__PURE__ */ jsx("div", { children: renderBlock(block, onAction) }, block.block_id ?? i))
	});
}

//#endregion
export { BlockRenderer, blocks, cn, elements, formatRelativeTime, renderElement, validateBlocks };
//# sourceMappingURL=index.js.map