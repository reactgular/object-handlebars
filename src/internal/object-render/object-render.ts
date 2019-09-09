import {MaxDepthError} from '../errors/max-depth-error';
import {handlebars} from '../handlebars/handlebars';
import {HandlebarFilters} from '../../index';

function render(context: any, str: string, maxDepth: number, depth: number): string {
    const next = handlebars(str, context, {});
    if (next !== str && depth < maxDepth) {
        return render(context, next, maxDepth, depth + 1);
    }
    if (depth === maxDepth) {
        throw new MaxDepthError();
    }
    return next;
}

export function objectRender(context: any, value: any, filters: HandlebarFilters = {}, maxDepth: number = 100): any {
    if (typeof value === 'string') {
        return render(context, value, maxDepth, 0);
    } else if (value instanceof Array) {
        return value.map(v => objectRender(context, v, filters, maxDepth));
    } else if (typeof value === 'object') {
        return Object.entries(value)
            .map(([key, v]) => [key, objectRender(context, v, filters, maxDepth)])
            .reduce((acc, [key, v]) => (acc[key] = v, acc), {});
    }
    return value;
}
