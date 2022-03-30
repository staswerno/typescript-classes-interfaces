// interfact describes how an object should look
// interface only works in TS
// not a blueprint, more a custom type

interface Person {
	name: string;
	age: number;

	greet(phrase: string): void;
}
