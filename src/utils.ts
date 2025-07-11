export interface Item {
  name: string;
  children?: string[];
  isFolder?: boolean;
}

export type Tree = Record<string, Item>;

export interface Layer {
  id: string;
}

export type LayerMap = Record<string, Layer>;
