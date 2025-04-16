export interface Item {
  name: string;
  children?: string[];
  isFolder?: boolean;
}

export interface Tree {
  [key: string]: Item;
}

export interface Layer {
  id: string;
}

export type LayerMap = {
  [key: string]: Layer;
};
