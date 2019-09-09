export class MaxDepthError extends Error {
    public constructor() {
        super('ObjectHandlebars: Max depth reached rendering handlebars');
    }
}
