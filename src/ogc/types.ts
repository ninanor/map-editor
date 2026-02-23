export interface OGCRecord {
  id: string;
  title?: string;
  description?: string;
  type?: string;
  links?: Array<{
    rel: string;
    href: string;
    type?: string;
    title?: string;
  }>;
  properties?: Record<string, any>;
  geometry?: any;
  bbox?: number[];
}

export interface OGCRecordsQuery {
  records: OGCRecord[];
  numberMatched?: number;
  numberReturned?: number;
}
