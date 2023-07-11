try {
    myVariable++;
    // 1 - What type of error will be thrown on the line above: ReferenceError
} catch (e) {
    console.error(`${e.name}: ${e.message}`);
}

try {
    const myString = 42;
    myString.substring(0);
    // 2 - What type of error will be thrown on the line above: TypeError
} catch (e) {
    console.error(`${e.name}: ${e.message}`);
}

try {
    // const myRandomNumber; = Math.random();
    // 3 - What type of error will be thrown on the line above: SyntaxError
    // NOTE: SyntaxError code will NOT compile
} catch (e) {
    console.error(`${e.name}: ${e.message}`);
}
