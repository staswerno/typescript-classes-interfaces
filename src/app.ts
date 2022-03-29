class Department {
	name: string;
	private employees: string[] = [];

	constructor(n: string) {
		this.name = n;
	}

	describe(this: Department) {
		console.log("Department: " + this.name);
	}

	addEmployee(employee: string) {
		this.employees.push(employee);
	}

	printEmployeeInformation() {
		console.log(this.employees.length);
		console.log(this.employees);
	}
}

const accounting = new Department("Accounting");

accounting.addEmployee("Jopo");
accounting.addEmployee("Jele");

accounting.employees[2] = "Annu";
// alternative method to add
// we want to avoid this, have just one way
// turn into private property/field (line 3)
// can only be accessed from inside class

console.log(accounting);

accounting.describe();
accounting.printEmployeeInformation();

// const accountingCopy = { describe: accounting.describe };

// accountingCopy.describe();
// undefined, because not excecuting function on line 19.
// passing function itself
// so 'this' in method refers not to accounting object
// rather, refers to thing responsible for calling method
// ie accountingCopy, as called on accountingCopy
// which is object has no name property, thus, undefined
// TLDR: accounting object has name, accountingCopy doesn't
// type safety added by  this: Department on line 8
