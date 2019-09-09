[![Build Status](https://travis-ci.org/reactgular/object-handlebars.svg?branch=master)](https://travis-ci.org/reactgular/object-handlebars)
[![Coverage Status](https://coveralls.io/repos/github/reactgular/object-handlebars/badge.svg?branch=master)](https://coveralls.io/github/reactgular/object-handlebars?branch=master)
[![npm version](https://badge.fury.io/js/%40reactgular%2Fobject-handlebars.svg)](https://badge.fury.io/js/%40reactgular%2Fobject-handlebars)

## What is ObjectHandlebars?

ObjectHandlebars is a handlebars templating library for use on object properties. It is a *single* function that resolves handlebar
expressions relative to the current object.

For example;

```typescript
import {objectHandlebars} from '@reactgular/object-handlebars';

const data = {
  first: 'John',
  last: 'Smith',
  fullName: '{{first}} {{last}}'
};

console.log(objectHandlebars(data)); // prints {first: "John", last: "Smith", fullName: "John Smith"}
```

## Usage

ObjectHandlerbars is a function that takes the *context object*, *filters* and *recursion depth* as parameters. It does not
directly modify the *context object*, but instead returns a *deep clone*.

You can install the library with `npm install @reactgular/object-handlebars` and import the main function.

```
// using TypeScript
import {objectHandlebars} from '@reactgular/object-handlebars';

// using NodeJS
const objectHandlebars = require('@reactgular/object-handlebars');
```

## Function Signature

You can call the ObjectHandlebars function with a single object parameter, and it returns a deep clone of that object with all string
properties rendered with handlebars.

```typescript
// function definition for ObjectHandlebars
export type objectHandlebars = <TType>(obj: TType, filters: HandlebarFilters = {}, maxDepth: number = 100) => TType;

// filter functions
export type HandlebarFilter = (s: string) => string;
export interface HandlebarFilters { [key: string]: HandlebarFilter;}
```

### Basic Usage

Object properties that are *strings* will be rendered as basic handlebar templates.

```typescript
import {objectHandlebars} from '@reactgular/object-handlebars';

console.log(objectHandlebars({a: "one", b: "{{a}}"})); // prints {a: "one", b: "one"}
```

### Filters

You can pass a map of filter functions. A filter function takes a single argument of a string and returns a string. Filters
can be chained together in a handlebars expression like this `{{property|filterA|filterB|filterC}}`.

```typescript
import {objectHandlebars} from '@reactgular/object-handlebars';

const upper = (s) => s.toUppercase();
console.log(objectHandlebars({a: "one", b: "{{a|upper}}"}, {upper})); // prints {a: "one", b: "ONE"}
```

### Dot notation

Handlebar expressions can use dot notation to reference nested values, but the path is always from the top of the context object.

```typescript
import {objectHandlebars} from '@reactgular/object-handlebars';

const data = {
    person: {
        first: "John",
        last: "Smith"
    },
    fullName: "{{person.first}} {{person.last}}"
};

console.log(objectHandlebars(data)); // prints {person: {first: "John", last: "Smith"}, fullName: "John Smith"}
```

### Array of objects

ObjectHandlebars will render any nested objects found in arrays.

```typescript
import {objectHandlebars} from '@reactgular/object-handlebars';

const data = {
    person: {first: "John", last: "Smith"},
    values: ["{{person.first}}", "{{person.last}}"],
    objects: [
        {fullName: "{{person.first}} {{person.last}}"}
    ]
};

console.log(objectHandlebars(data)); 
// prints 
// {
//    person: {first: "John", last: "Smith"}
//    values: ["John", "Smith"],
//    objects: [{fullName: "John Smith"}]
// }
```

## Installation

To get started, install the package from npm

```bash
npm install --save @reactgular/object-handlebars
```

## Install dependencies

This library uses the [dot-prop](https://www.npmjs.com/package/dot-prop) library to resolve dot expressions.

```bash
npm install --save dot-prop
```
