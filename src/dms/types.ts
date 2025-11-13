export interface Dataset {
  id: string;
  title: string;
}

export interface DatasetQuery {
  results: Dataset[];
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  uri: string;
}

export interface ResourceQuery {
  results: Resource[];
}

export interface DataTable {
  resource: string;
  resource_id: string;
  name: string;
  id: string;
  uri: string;
  title: string;
}

export interface DataTableQuery {
  results: DataTable[];
}
