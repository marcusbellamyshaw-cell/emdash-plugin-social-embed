import type { PortableTextBlock } from "../fields/index.js";

export type WidgetType = "content" | "menu" | "component";

export interface Widget {
	id: string;
	type: WidgetType;
	title?: string;
	// Type-specific fields
	content?: PortableTextBlock[]; // For content type
	menuName?: string; // For menu type
	componentId?: string; // For component type
	componentProps?: Record<string, unknown>;
}

export interface WidgetArea {
	id: string;
	name: string;
	label: string;
	description?: string;
	widgets: Widget[];
}

// For DB layer
export interface WidgetRow {
	id: string;
	area_id: string;
	sort_order: number;
	type: WidgetType;
	title: string | null;
	content: string | null; // JSON string
	menu_name: string | null;
	component_id: string | null;
	component_props: string | null; // JSON string
	created_at: string;
}

export interface WidgetAreaRow {
	id: string;
	name: string;
	label: string;
	description: string | null;
	created_at: string;
}

// Component registration
export interface WidgetComponentDef {
	id: string; // 'core:recent-posts'
	label: string; // 'Recent Posts'
	description?: string;
	props: Record<string, PropDef>;
}

export interface PropDef {
	type: "string" | "number" | "boolean" | "select";
	label: string;
	default?: unknown;
	options?: Array<{ value: string; label: string }>; // For select
}

// Admin API types
export interface CreateWidgetAreaInput {
	name: string;
	label: string;
	description?: string;
}

export interface CreateWidgetInput {
	type: WidgetType;
	title?: string;
	content?: PortableTextBlock[];
	menuName?: string;
	componentId?: string;
	componentProps?: Record<string, unknown>;
}

export interface UpdateWidgetInput extends Partial<CreateWidgetInput> {}

export interface ReorderWidgetsInput {
	widgetIds: string[];
}
