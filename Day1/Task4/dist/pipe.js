export function pipe(...functions) {
    return (value) => {
        return functions.reduce((result, fn) => {
            return fn(result);
        }, value);
    };
}
