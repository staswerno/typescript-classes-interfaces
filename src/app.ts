class Department {
	// private id: string;
	// private name: string;
	private employees: string[] = [];

	// shortcut for double initialisation
	// private, public, readonly are TS not JS
	constructor(private readonly id: string, public name: string) {
		// this.id = id;
		// this.name = n;
	}

	describe(this: Department) {
		console.log(`Department ${this.id}:  ${this.name}`);
	}

	addEmployee(employee: string) {
		this.employees.push(employee);
	}

	printEmployeeInformation() {
		console.log(`Employee length is ${this.employees.length}`);
		console.log(this.employees);
	}
}

// inherit from class
class ITDepartment extends Department {
	admins: string[];
	constructor(id: string, admins: string[]) {
		super(id, "IT");
		// calls constructer of base class
		// must use super before this
		this.admins = admins;
	}
}

// special version of department
// with special methods/properties
class AccountingDepartment extends Department {
	constructor(id: string, private reports: string[]) {
		super(id, "Accounting");
	}

	addReport(text: string) {
		this.reports.push(text);
	}

	printReports() {
		console.log(this.reports);
	}
}

const accounting = new Department("d1", "Accounting");
const it = new ITDepartment("d1", ["Stasi"]);

accounting.addEmployee("Jopo");
accounting.addEmployee("Jele");

// accounting.employees[2] = "Annu";
// alternative method to add
// we want to avoid this, have just one way
// turn into private property/field (line 3)
// can only be accessed from inside class

accounting.describe();
accounting.printEmployeeInformation();

it.describe();
it.name = "NEW NAME";
it.printEmployeeInformation();

console.log(accounting);
console.log(it);

const accountingDept = new AccountingDepartment("d2", []);

accountingDept.addReport("Something messed up :/");

accountingDept.printReports();

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
