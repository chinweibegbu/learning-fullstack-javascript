const shopForBeans = () => {
    return new Promise((resolve, reject) => {
        const beanTypes = ['kidney', 'fava', 'pinto', 'black', 'garbanzo'];
        setTimeout(()=>{
            let randomIndex = Math.floor(Math.random() * 5);
            let beanType = beanTypes[randomIndex];
            console.log(`I bought ${beanType} beans because they were on sale.`);
            resolve(beanType);
        }, 1000)
    })
}

// This function is dependent on the shopForBeans()
let soakTheBeans = (beanType) => {
    return new Promise((resolve, reject) => {
        console.log('Time to soak the beans.');
        setTimeout(()=>{
        console.log(`... The ${beanType} beans are softened.`);
        resolve(true);
        }, 1000);
    });
}

// This function is dependent on the soakTheBeans()
let cookTheBeans = (isSoftened) => {
    return new Promise((resolve, reject) => {
        console.log('Time to cook the beans.');
        setTimeout(()=>{
        if (isSoftened) {
            console.log('... The beans are cooked!');
            resolve('\n\nDinner is served!');
        }
        }, 1000);
    });
}

// Asynchronous function to shop then soak then cook
async function makeBeans() {
    let type = await shopForBeans();
    let isSoft = await soakTheBeans(type);
    let dinner = await cookTheBeans(isSoft);
    console.log(dinner);
}

makeBeans();
