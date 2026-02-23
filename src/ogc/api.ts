import axios from 'axios';
import type { OGCRecordsQuery } from './types';

export async function queryOGCRecords(catalogUrl: string, search?: string): Promise<OGCRecordsQuery> {
  try {
    const url = new URL(catalogUrl);
    if (search) {
      url.searchParams.set('q', search);
    }
    const response = await axios.get<any>(url.toString());
    const data = response.data;

    let records = [];
    let numberMatched: number | undefined;
    let numberReturned: number | undefined;

    // Handle different OGC Records response formats
    if (data.features && Array.isArray(data.features)) {
      // GeoJSON FeatureCollection format
      records = data.features.map((feature: any) => ({
        id: feature.id || feature.properties?.id || `record-${Math.random()}`,
        title: feature.properties?.title || feature.title,
        description: feature.properties?.description || feature.description,
        type: feature.properties?.type,
        links: feature.links || feature.properties?.links || [],
        properties: feature.properties,
        geometry: feature.geometry,
        bbox: feature.bbox,
      }));
      numberMatched = data.numberMatched;
      numberReturned = data.numberReturned;
    } else if (data.records && Array.isArray(data.records)) {
      // Direct records array format
      records = data.records;
      numberMatched = data.numberMatched;
      numberReturned = data.numberReturned;
    } else if (Array.isArray(data)) {
      // Direct array of records
      records = data;
    }

    return {
      records,
      numberMatched,
      numberReturned,
    };
  } catch (error) {
    throw error;
  }
}
