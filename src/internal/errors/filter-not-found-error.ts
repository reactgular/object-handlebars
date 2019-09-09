export class FilterNotFoundError extends Error {
    public constructor(name: string) {
        super(`ObjectHandlerbars: Filter not found "${name}"`);
    }
}
