/*
This is the shopForBeans function. It uses a setTimeout() function to simulate a time-consuming asynchronous action. The function returns a promise with a resolved value of a string representing a type of bean. It settles on a random beanType from the beanTypes array using Math.random().
*/

const shopForBeans = () => {
  return new Promise((resolve, reject) => {
	const beanTypes = ['kidney', 'fava', 'pinto', 'black', 'garbanzo'];
  setTimeout(()=>{
    let randomIndex = Math.floor(Math.random() * beanTypes.length);
    let beanType = beanTypes[randomIndex];
    console.log(`2. I bought ${beanType} beans because they were on sale.`);
   resolve(beanType);
  }, 1000);
});
}

/* 
    NOTE: The function below will not run in the right order.
          Because promises do not hault function until something else is run
          - the whole point is to run asynchronously -, step 3 will be printed
          before step 2 as a function of the setTimeout()
*/
// function getBeansWrong() {
//   console.log(`1. Heading to the store to buy beans...`);
//   let value = shopForBeans();
//   console.log(`3. Great! I'm making ${value} beans for dinner tonight!`);
// }

async function getBeansRight() {
  console.log(`1. Heading to the store to buy beans...`);
  let value = await shopForBeans();
  console.log(`3. Great! I'm making ${value} beans for dinner tonight!`);
}

// getBeansWrong();       >>> Wrong function call
getBeansRight();
