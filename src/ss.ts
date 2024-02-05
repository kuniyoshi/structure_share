console.log("### echo");

const a = {foo: {bar: 42}};
const b = set(a, ["foo", "bar"], 38);

console.log({a, b});

function set(object: Record<string | number, any>, paths: (string | number)[], value: unknown): unknown {
    if (!paths.length) {
        return value;
    }
    const top = paths.shift();
    const result = {...object};
    if (top != undefined && (top in result)) {
        result[top] = set(result[top], paths, value);
    }
    return result;
}
