import {render} from './index';

describe('render', () => {
    it('should render string properties', () => {
        expect(render({
            first: 'John',
            last: 'Smith',
            fullName: '{{first}} {{last}}'
        })).toEqual({
            first: 'John',
            last: 'Smith',
            fullName: 'John Smith'
        });
    });

    it('should ignore functions', () => {
        const data = {
            name: () => 'something'
        };
    });

    it('should ignore numbers', () => {

    });

    it('should render nested objects', () => {

    });

    it('should render strings in an array', () => {

    });

    it('should render objects in an array', () => {

    });

    it('should replace handlebars with dot notation', () => {
        const data = {values: {first: 'John', last: 'Doe'}, name: '{{values.first}} {{values.last}}'};
        expect(render(data)).toEqual({values: {first: 'John', last: 'Doe'}, name: 'John Doe'});
    });

    it('should resolve nested handlebars', () => {
        const data = {first: 'John', last: 'Doe', name: '{{first}} {{last}}', title: 'Mr. {{name}}'};
        expect(render(data)).toEqual({first: 'John', last: 'Doe', name: 'John Doe', title: 'Mr. John Doe'});
    });
});
