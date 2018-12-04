export const nameFunction = <T extends Function>(name: string, fn: T) => {
    const f = fn.bind(null);
    f.displayName = name;
    return f as any as T;
}
