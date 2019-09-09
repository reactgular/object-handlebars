import {objectHandlebars} from './index';

describe('objectHandlebars', () => {
    it('should replace handlebars with property values', () => {
        const data = {first: 'John', last: 'Doe', name: '{{first}} {{last}}'};
        expect(objectHandlebars(data)).toEqual({first: 'John', last: 'Doe', name: 'John Doe'});
    });

    it('should replace handlebars with dot notation', () => {
        const data = {values: {first: 'John', last: 'Doe'}, name: '{{values.first}} {{values.last}}'};
        expect(objectHandlebars(data)).toEqual({values: {first: 'John', last: 'Doe'}, name: 'John Doe'});
    });

    it('should resolve nested handlebars', () => {
        const data = {first: 'John', last: 'Doe', name: '{{first}} {{last}}', title: 'Mr. {{name}}'};
        expect(objectHandlebars(data)).toEqual({first: 'John', last: 'Doe', name: 'John Doe', title: 'Mr. John Doe'});
    });
});
