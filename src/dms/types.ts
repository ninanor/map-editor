export interface Dataset {
  id: string;
  title: string;
}

export interface DatasetQuery {
  results: Dataset[];
}
