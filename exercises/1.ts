function selectArrIndex<T extends unknown[], K extends number>(arr: T, index: K): T[K] {
	return arr[index];
}

selectArrIndex([1, 2, 3] as const, 1); // 2

function tryTextToNumber<T extends string>(text: T): T extends `${number}` ? number : string;
function tryTextToNumber(text: string): number | string {
	if (isNaN(Number(text))) {
		return text;
	}
	return Number(text);
}

tryTextToNumber("123"); // number
tryTextToNumber("123abc"); // string

type ResolveType<T> = T extends `${infer N extends number}` ? N : T extends `${infer N extends boolean}` ? N : T;

function tryTextToLiteral<T extends string>(text: T): ResolveType<T>;
function tryTextToLiteral(text: string): number | string | boolean {
	if (isNaN(Number(text))) {
		return text;
	}
	if (text === "true" || text === "false") {
		return text === "true";
	}
	return Number(text);
}

tryTextToLiteral("123"); // 123
tryTextToLiteral("true"); // true
tryTextToLiteral("false"); // false
tryTextToLiteral("123abc"); // '123abc'

type RecurentResult<T extends string> = T extends `${infer First} ${infer Rest}`
	? [ResolveType<First>, ...RecurentResult<Rest>]
	: T extends `${infer Last}`
		? [ResolveType<Last>]
		: [];

function tryTextToNumberLiteralArray<T extends string>(text: T): RecurentResult<T>;
function tryTextToNumberLiteralArray(text: string): (number | string)[] {
	return text.split(" ").map((text) => tryTextToLiteral(text));
}

tryTextToNumberLiteralArray("123 qwd 213 wfe fd true false"); // number
tryTextToNumberLiteralArray("123abc"); // string

const countries = {
	europe: [
		{
			name: "poland",
			short: "pl",
		},
		{
			name: "united kingdom",
			short: "uk",
		},
		{
			name: "france",
			short: "fr",
		},
	],
	america: [
		{
			name: "canada",
			short: "ca",
		},
		{
			name: "united states",
			short: "us",
		},
	],
} as const;

/*
type Shorts = {
    readonly europe: "pl" | "uk" | "fr";
    readonly america: "ca" | "us";
}
*/

type Shorts = {
	[C in keyof typeof countries]: (typeof countries)[C][number]["short"];
};

type Countries = typeof countries;

type SuperCountries = {
	[K in keyof Countries]: Countries[K][number] & { continent: K };
}[keyof Countries];

function getCountryFromShort<T extends string>(
	short: T,
): SuperCountries extends infer country ? (country extends { short: T } ? country : never) : never;
function getCountryFromShort(short: string): SuperCountries {
	return Object.values(countries).find((continent) =>
		continent.find((country) => country.short === short),
	) as unknown as SuperCountries;
}

/*
const a: {
    readonly name: "united states";
    readonly short: "us";
} & {
    continent: "america";
}
*/
const us = getCountryFromShort("us");
