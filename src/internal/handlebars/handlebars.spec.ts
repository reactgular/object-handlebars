import {handlebars} from './handlebars';

describe('handlebars', () => {
    const data = {value: 'Hello World'};

    describe('parsing handlebars', () => {
        it('should render undefined', () => {
            expect(handlebars('{{value}}', {})).toEqual('undefined');
        });

        it('should render handlebars', () => {
            expect(handlebars('{{value}}', data)).toEqual('Hello World');
        });

        it('should render dot notation', () => {
            expect(handlebars('{{data.value}}', {data})).toEqual('Hello World');
        });

        it('should multiple handlebars', () => {
            const context = {one: 'Hello', two: 'out', three: 'there!'};
            expect(handlebars('{{one}} {{two}} {{three}}', context)).toEqual('Hello out there!');
        });

        it('should ignore whitespace inside handlebars', () => {
            expect(handlebars('{{  value  }}', data)).toEqual('Hello World');
            expect(handlebars('{{  data.value  }}', {data})).toEqual('Hello World');
        });
    });

    describe('unhandled data types', () => {
        it('should render a function', () => {
            const x = {name: () => 'John Smith'};
            expect(handlebars('{{name}}', x)).toEqual('[function]');
        });

        it('should render undefined', () => {
            const x = {name: undefined};
            expect(handlebars('{{name}}', x)).toEqual('undefined');
            expect(handlebars('{{fooBar}}', x)).toEqual('undefined');
            expect(handlebars('{{a.b.c}}', x)).toEqual('undefined');
            expect(handlebars('{{name.missing}}', x)).toEqual('undefined');
        });

        it('should render null', () => {
            const x = {name: null};
            expect(handlebars('{{name}}', x)).toEqual('null');
        });

        it('should render an object', () => {
            const x = {name: {}};
            expect(handlebars('{{name}}', x)).toEqual('[object]');
        });

        it('should render an array', () => {
            const x = {name: []};
            expect(handlebars('{{name}}', x)).toEqual('[array]');
        });
    });

    describe('dot notation', () => {
        it('should read from object path', () => {
            const x = {a: {b: {c: 'Hello World'}}};
            expect(handlebars('{{a.b.c}}', x)).toEqual('Hello World');
        });

        it('should ignore invalid paths', () => {
            expect(handlebars('{{a.b.c}}', {})).toEqual('undefined');
            expect(handlebars('{{a.b.c}}', {a: null})).toEqual('undefined');
            expect(handlebars('{{a.b.c}}', {a: []})).toEqual('undefined');
            expect(handlebars('{{a.b.c}}', {a: 'test'})).toEqual('undefined');
            expect(handlebars('{{a.b.c}}', {a: {}})).toEqual('undefined');
        });

        it('should ignore array notation', () => {
            const x = {a: [1, 2, 3]};
            expect(handlebars('{{a[0]}}', x)).toEqual('undefined');
        });
    });

    describe('filtering', () => {
        it('should call filter function', () => {
            const upper = (s: string) => s.toUpperCase();
            expect(handlebars('{{value|upper}}', data, {upper})).toEqual('HELLO WORLD');
        });

        it('should chain filter functions', () => {
            const upper = (s: string) => s.toUpperCase();
            const reverse = (s: string) => s.split('').reverse().join('');
            const lower = (s: string) => s.toLowerCase();
            expect(handlebars('{{value|upper|reverse|lower}}', data, {upper, reverse, lower})).toEqual('dlrow olleh');
        });

        it('should ignore whitespace in filters', () => {
            const upper = (s: string) => s.toUpperCase();
            const reverse = (s: string) => s.split('').reverse().join('');
            const lower = (s: string) => s.toLowerCase();
            expect(handlebars('{{ data.value |  upper |reverse|  lower}}', {data}, {upper, reverse, lower})).toEqual('dlrow olleh');
        });
    });
});
