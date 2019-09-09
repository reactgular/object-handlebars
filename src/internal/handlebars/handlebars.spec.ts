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
