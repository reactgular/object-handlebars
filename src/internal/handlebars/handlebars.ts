import * as dotProp from 'dot-prop';
import {FilterNotFoundError} from '../errors/filter-not-found-error';
import {HANDLEBARS_REGEX} from '../handlebars-regex/handlebars-regex';
import {HandlebarFilters} from '../../index';

export function handlebars(str: string, context: any, handlebarFilters: HandlebarFilters = {}): string {
    return str.replace(HANDLEBARS_REGEX, (bars: string, exp: string): string => {
        const [dot, ...filters] = exp.split('|');
        const value = dotProp.get(context, dot.trim(), undefined) + '';
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
