import {objectRender} from './internal/object-render/object-render';

export type HandlebarFilter = (s: string) => string;

export interface HandlebarFilters {
    [key: string]: HandlebarFilter;
}

export function objectHandlebars<TType>(obj: TType, filters: HandlebarFilters = {}, maxDepth: number = 100): TType {
    return objectRender(obj, obj, filters, maxDepth);
}
