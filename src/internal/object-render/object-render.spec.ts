import {objectRender} from './object-render';

describe('objectRender', () => {
    describe('rendering', () => {
        it('should render string properties', () => {
            expect(objectRender({
                first: 'John',
                last: 'Smith'
            }, '{{first}} {{last}}')).toEqual('John Smith');
        });

        it('should ignore functions', () => {
            const func = () => undefined;
            expect(objectRender({}, func)).toBe(func);
        });

        it('should ignore numbers', () => {
            expect(objectRender({}, 100)).toBe(100);
        });

        it('should render strings in an array', () => {
            expect(objectRender({
                first: 'John',
                last: 'Smith'
            }, ['{{first}}', '{{last}}'])).toEqual(['John', 'Smith']);
        });

        it('should render objects in an array', () => {
            expect(objectRender({
                first: 'John',
                last: 'Smith'
            }, [
                {firstName: '{{first}}'},
                {lastName: '{{last}}'}
            ])).toEqual([
                {firstName: 'John'},
                {lastName: 'Smith'}
            ]);
        });
    });

    describe('error handling', () => {
        it('should fail if depth is too deep', () => {
            const data = {
                a: '{{b}}',
                b: '{{c}}',
                c: '{{d}}',
                d: '{{e}}'
            };
            expect(() => objectRender(data, '{{a}}', {}, 2))
                .toThrow('ObjectHandlebars: Max depth reached rendering handlebars');
        });

        it('should fail on endless recursive handlebars', () => {
            const circular = {
                name: '{{title}}',
                title: '{{name}}'
            };
            expect(() => objectRender(circular, '{{name}}'))
                .toThrow('ObjectHandlebars: Max depth reached rendering handlebars');
        });

        it('should fail for unknown filters', () => {
            const data = {value: 'Hello World'};
            expect(() => objectRender(data, '{{value|unknown}}'))
                .toThrow('ObjectHandlerbars: Filter not found "unknown"');
        });
    });
});
