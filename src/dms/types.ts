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
