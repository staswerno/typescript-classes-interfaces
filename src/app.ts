// interface describes how an object should look
// interface only works in TS
// not a blueprint, more a custom type
// not same as type. int can only define object(/functions).
// more common to use interfaces to define structure of objects

// function example
// type AddFn = (a: number, b: number) => number;
interface AddFn {
	(a: number, b: number): number;
}

let add: AddFn;

add = (n1: number, n2: number) => {
	return n1 + n2;
};

interface Named {
	readonly name?: string;
	// can't add private/public though
	outputName?: string;
	// ? marks as optional
}

interface Greetable extends Named {
	greet(phrase: string): void;
}

// Can implement multiple with comma - can't do with classes!
// forces existence of method, create/maintain structure
class Person implements Greetable {
	name?: string;
	age = 21;

	constructor(n?: string) {
		if (n) {
			this.name = n;
		}
	}
	greet(phrase: string) {
		if (this.name) {
			console.log(phrase + " " + this.name + "!");
		} else {
			console.log("Hi!");
		}
	}
}

let user1: Greetable;

user1 = new Person("Stasi");
// user1.name = 'Geofforeoy'
// errors because read only
user1 = new Person();
// optional parameter/property makes this ok

user1.greet("Hi there, my name iiiiiss...");

console.groupCollapsed(user1);
