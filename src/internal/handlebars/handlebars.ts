import * as dotProp from 'dot-prop';
import {HandlebarFilters} from '../../index';
import {FilterNotFoundError} from '../errors/filter-not-found-error';
import {HANDLEBARS_REGEX} from '../handlebars-regex/handlebars-regex';

export function handlebars(str: string, context: any, handlebarFilters: HandlebarFilters = {}): string {
    return str.replace(HANDLEBARS_REGEX, (bars: string, exp: string): string => {
        const [dot, ...filters] = exp.split('|');
        let value = dotProp.get(context, dot.trim(), undefined);
        if (value === null) {
            value = 'null';
        } else if (value === undefined) {
            value = 'undefined';
        } else if (value instanceof Array) {
            value = '[array]';
        } else if (typeof value === 'object') {
            value = '[object]';
        } else if (typeof value === 'function') {
            value = '[function]';
        } else {
            value = value + '';
        }
        return filters
            .map(filter => filter.trim())
            .reduce((acc, filter) => {
                const func = handlebarFilters[filter];
                if (typeof func !== 'function') {
                    throw new FilterNotFoundError(filter);
                }
                return func(acc) + '';
            }, value);
    });
}
