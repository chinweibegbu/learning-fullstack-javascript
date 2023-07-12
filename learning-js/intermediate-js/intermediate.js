function createSpace(sectionNumber, sectionName) {
    (sectionNumber === 1) ? console.log('-------------------------------------------------------------------------') : console.log('\n\n-------------------------------------------------------------------------');
    console.log(`Section #${sectionNumber}: ${sectionName}`);
    console.log('-------------------------------------------------------------------------');
}

// -------------------------------------------------------------------------
// 1. CLASSES
createSpace(1, 'CLASSES');

class HospitalEmployee {
    constructor(name) {
        this._name = name;
        this._remainingVacationDays = 20;
    }

    get name() {
        return this._name;
    }

    get remainingVacationDays() {
        return this._remainingVacationDays;
    }

    takeVacationDays(daysOff) {
        this._remainingVacationDays -= daysOff;
    }

    static generatePassword() {
        return Math.floor(Math.random() * 10000);
    }
}

/*
    NOTE: When you use the extends keyword to declare a subclass, you automatically inherit the getters, setters, and methods.
            However, you must call super() from within the constructor() to set a parent’s properties
*/
class Nurse extends HospitalEmployee {
    constructor(name, certifications) {
        // NOTE: super() MUST be used before setting any new properties
        super(name);
        this._certifications = certifications;
    } 

    get certifications() {
        return this._certifications;
    }

    addCertification(newCertification) {
        this.certifications.push(newCertification);
    }
}
  
const employeeJackson = new HospitalEmployee('Rosa Jackson');
// NOTE: Getters and setters are not called like regular functions
console.log(employeeJackson.remainingVacationDays);
const nurseOlynyk = new Nurse('Olynyk', ['Trauma','Pediatrics']);
nurseOlynyk.takeVacationDays(5);
console.log(nurseOlynyk.remainingVacationDays);
nurseOlynyk.addCertification('Genetics');
console.log(nurseOlynyk.certifications);

// -------------------------------------------------------------------------
// 2. MODULES
createSpace(2, 'MODULES');

console.log('See the `modules-and-exports` folder for a clear example');

// -------------------------------------------------------------------------
// 3. PROMISES
createSpace(3, 'PROMISES');

console.log('See the `promises` folder for more clear examples\n');

const inventory = {
    sunglasses: 1900,
    pants: 1088,
    bags: 1344
};

function myExecutor(resolve, reject) {
    if (inventory.sunglasses > 0) {
        resolve('Sunglasses order processed.');
    } else {
        reject('That item is sold out.');
    }
}

function orderSunglasses() {
    return new Promise(myExecutor);
}

let orderPromise = orderSunglasses();
console.log(orderPromise);

// Using the setTimeout() function to run a function after a given delay
const usingSTO = () => {
  console.log('Using setTimeout()');
};

setTimeout(usingSTO, 3000);

// Using the setTime() function with Promises
const returnPromiseFunction = () => {
  return new Promise((resolve, reject) => {
    setTimeout(( ) => {resolve('I resolved!')}, 1000);
  });
};
 
const prom = returnPromiseFunction();

// -------------------------------------------------------------------------
// 4. ASYNC-AWAIT
createSpace(4, 'ASYNC-AWAIT');

console.log('See the `async-await` folder for details\n');

// -------------------------------------------------------------------------
// 5. REQUESTS
createSpace(5, 'REQUESTS');

console.log('See the `requests` folder for details\n');

// -------------------------------------------------------------------------
// 6. ERRORS
createSpace(6, 'ERRORS');

console.log('See the `errors` folder for details\n');