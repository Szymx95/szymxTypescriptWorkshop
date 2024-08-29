export type ObjectEndpoints<T> = {
	[K in keyof Required<T>]: T[K] extends object
		? T[K] extends Array<any>
			? never
			: [K, ...ObjectEndpoints<Required<T[K]>>]
		: [K];
}[keyof T];

export type WalkObject<T extends object, Keys> = Keys extends [infer Key, ...infer Rest]
	? Key extends keyof T
		? Rest extends []
			? T[Key]
			: Rest extends string[]
				? T[Key] extends object
					? WalkObject<T[Key], Rest>
					: never
				: never
		: never
	: never;

/**
 * @dev Get primitive values from provider VaultData object based on provided keys. If value is undefined, return default value.
 *      Examples:
 *      - ['apy'] -> a.apy
 *      - ['asset', 'symbol'] -> a.asset.symbol
 */
function getPrimitiveValue<T extends object, Keys extends ObjectEndpoints<T>>(a: T, keys: Keys): WalkObject<T, Keys> {
	let valueA: any = a;

	for (const key of keys) {
		valueA = valueA?.[key];
	}

	return valueA;
}

const testObject = {
	a: {
		b: {
			c: {
				d: "hello",
			},
		},
		b2: {
			c: {
				d: "world",
			},
		},
		b3: "test",
	},
	a2: {
		b: {
			c: {
				d: "!",
			},
		},
	},
} as const;

getPrimitiveValue(testObject, ["a", "b3"] as const); // test
getPrimitiveValue(testObject, ["a2", "b3"] as const); // should error
getPrimitiveValue(testObject, ["a", "b", "c", "d"] as const); // hello
getPrimitiveValue(testObject, ["a", "b", "c"] as const); //should error
