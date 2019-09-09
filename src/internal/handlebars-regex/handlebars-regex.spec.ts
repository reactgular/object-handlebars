import {HANDLEBARS_REGEX} from './handlebars-regex';

function match(str: string): string[] {
    let match, matches = [];
    while ((match = HANDLEBARS_REGEX.exec(str)) != null) {
        matches.push(match[0]);
    }
    return matches;
}

describe('handlebars', () => {
    it('should match handlebars', () => {
        expect(match('example {{first}} and {{last}} expression')).toEqual(['{{first}}', '{{last}}']);
    });

    it('should ignore extra closing bar', () => {
        expect(match('should {{first}} and not } but {{last}} is fine')).toEqual(['{{first}}', '{{last}}']);
        expect(match('should {{first}} and not }} but {{last}} is fine')).toEqual(['{{first}}', '{{last}}']);
    });

    it('should ignore single opening bar', () => {
        expect(match('should not match {{ with anything')).toEqual([]);
    });

    it('should ignore escaped handlebars', () => {
        expect(match('should \\{\\}ignore\\}\\} escaped')).toEqual([]);
    });

    it('should match inner handlebars', () => {
        expect(match('example {{{inner}}} expression')).toEqual(['{{inner}}']);
    });

    it('should ignore single handlebars', () => {
        expect(match('should {ignore} escaped')).toEqual([]);
    });
});
