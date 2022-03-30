abstract class Department {
	// static property
	static fiscalYear = 2020;
	// private id: string;
	// private name: string;
	protected employees: string[] = [];
	// protected allows access from extended classes

	// shortcut for double initialisation
	// private, public, readonly are TS not JS
	constructor(protected readonly id: string, public name: string) {
		// this.id = id;
		// this.name = n;
	}
	// make static to access without needing new keyword
	static createEmployee(name: string) {
		return { name: name };
	}

	// force developers to use but make their own method
	abstract describe(this: Department): void;

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

	describe() {
		console.log("IT Department - ID: " + this.id);
	}
}

// special version of department
// with special methods/properties
class AccountingDepartment extends Department {
	private lastReport: string;
	private static instance: AccountingDepartment;

	// getter. must return something.
	get mostRecentReport() {
		if (this.lastReport) {
			return this.lastReport;
		}
		throw new Error("No report found.");
	}

	// setter. needs a value
	set mostRecentReport(value: string) {
		if (!value) {
			throw new Error("Please pass in a valid value!");
		}
		this.addReport(value);
	}

	// create private constructor to ensure
	// only one accounting dept is created
	private constructor(id: string, private reports: string[]) {
		super(id, "Accounting");
		this.lastReport = reports[0];
	}

	static getInstance() {
		if (this.instance) {
			return this.instance;
		}
		this.instance = new AccountingDepartment("d2", []);
		return this.instance;
	}

	// override Department describe method
	describe() {
		console.log("Accounting Department - ID:" + this.id);
	}

	addEmployee(name: string) {
		if (name === "Max") {
			return;
		}
		this.employees.push(name);
	}

	addReport(text: string) {
		this.reports.push(text);
		this.lastReport = text;
	}

	printReports() {
		console.log(this.reports);
	}
}

// use static method and property
const employee1 = Department.createEmployee("Max");
console.log("Employee 1: ", employee1, Department.fiscalYear);

// const accounting = new Department("d1", "Accounting");
const it = new ITDepartment("d1", ["Stasi"]);

// const accounting = new AccountingDepartment("d2", []);
const accounting = AccountingDepartment.getInstance();

// console.log(accounting.mostRecentReport);
// getter accessed like property not method

accounting.mostRecentReport = "Year End Report";
accounting.addReport("Something messed up :/");
accounting.printReports();
accounting.describe();

accounting.addEmployee("Max");
accounting.addEmployee("Mira");

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
