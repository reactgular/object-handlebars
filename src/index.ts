import {objectRender} from './internal/object-render/object-render';

export type Filter = (s: string) => string;

export interface Filters {
    [key: string]: Filter;
}

export function render<TType>(obj: TType, filters: Filters = {}, maxDepth: number = 100): TType {
    return objectRender(obj, obj, filters, maxDepth);
}
