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

## Where to use ObjectHandlebars?

ObjectHandlebars was created to make the reading of JSON configuration objects less *static* in nature. So that a developer can
reference properties dynamically and not have to update multiple locations in a JSON object.

For example;

```json
{
  "user": "reactgular",
  "repository": "object-handlebars",
  "url": "https://github.com/{{user}}/{{repository}}.git",
  "issues": "https://github.com/{{user}}/{{repository}}/issues"
}
```

The above is a *self-contained* object that can be rendered with ObjectHandlebars. It can be fetched from a server or stored on disk as `config.json`.

### Supports dot notation

ObjectHandlebars supports object path references using dot notation.

For example;

```json
{
  "person": {
    "first": "John",
    "last": "Smith"
  },
  "fullName": "{{person.first}} {{person.last}}"
}
```

### Support for filters

ObjectHandlebars supports filter functions that can be used inside handlebars with the `|` character to modify values.

For example;

```typescript
import {objectHandlebars} from '@reactgular/object-handlebars';

const data = {
  first: 'John',
  last: 'Smith',
  fullName: '{{first|upper}} {{last|upper}}'
};

const upper = (s) => s.toUppercase();

console.log(objectHandlebars(data, {upper})); // prints {first: "John", last: "Smith", fullName: "JOHN SMITH"}
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
