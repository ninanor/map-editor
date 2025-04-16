export interface Item {
  name: string;
  children?: string[];
  isFolder?: boolean;
}

export interface Tree {
  [key: string]: Item;
}
