console.log("### echo");

const a = { foo: { bar: [42] } };
const b = set(a, ["foo", "bar", 0], 38);

console.log({ a, b });

function set(object: Record<string | number, unknown> | Array<unknown>, paths: (string | number)[], value: unknown): unknown {
    if (!paths.length) {
        return value;
    }

    const [top, ...restPaths] = paths;
    let result;

    if (Array.isArray(object)) {
        // オブジェクトが配列の場合、新しい配列のコピーを作成
        result = [...object];
        if (typeof top === 'number' && top >= 0) {
            if (top >= object.length || restPaths.length === 0 || (typeof result[top] !== 'object' && typeof result[top] !== 'undefined')) {
                // インデックスが配列の長さ以上、または最後のキー、または値がオブジェクトでない場合は、新しい値を設定
                result[top] = restPaths.length === 0 ? value : (typeof result[top] === 'undefined' ? {} : result[top]);
            }
            if (restPaths.length > 0 && (typeof result[top] === 'object' || typeof result[top] === 'undefined')) {
                // 再帰的に set 関数を呼び出す
                result[top] = set(result[top], restPaths, value);
            }
        }
    } else if (typeof object === 'object' && object !== null) {
        // オブジェクトがオブジェクトの場合、新しいオブジェクトのコピーを作成
        result = { ...object };
        if ((typeof top === 'string' || typeof top === 'number') && (top in object || restPaths.length === 0 || typeof result[top] !== 'object')) {
            result[top] = restPaths.length === 0 ? value : (typeof result[top] !== 'object' ? {} : result[top]);
            if (restPaths.length > 0 && typeof result[top] === 'object') {
                result[top] = set(result[top], restPaths, value);
            }
        }
    }

    return result;
}
