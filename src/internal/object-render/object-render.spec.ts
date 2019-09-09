import {objectRender} from './object-render';

describe('objectRender', () => {
    describe('error handling', () => {
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
