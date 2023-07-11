let cookBeans = () => {
    return new Promise ((resolve, reject) => {
        setTimeout(()=>{
        resolve('beans');
        }, 1000);
    });
}
  
let steamBroccoli = () => {
    return new Promise ((resolve, reject) => {
        setTimeout(()=>{
        resolve('broccoli');
        }, 1000);
    });
}
  
let cookRice = () => {
    return new Promise ((resolve, reject) => {
        setTimeout(()=>{
        resolve('rice');
        }, 1000);
    });
}
  
let bakeChicken = () => {
    return new Promise ((resolve, reject) => {
        setTimeout(()=>{
        resolve('chicken');
        }, 1000);
    });
}

async function serveDinner() {
    let vegetablePromise = steamBroccoli();
    let starchPromise = cookRice();
    let proteinPromise = bakeChicken();
    let sidePromise = cookBeans();

    console.log(`#1 Dinner is served. We're having ${await vegetablePromise}, ${await starchPromise}, ${await proteinPromise}, and ${await sidePromise}.`);
}

async function serveDinnerAgain() {
    const foodArray = await Promise.all([steamBroccoli(), cookRice(), bakeChicken(), cookBeans()]);
    let vegetable = foodArray[0];
    let starch =  foodArray[1];
    let protein =  foodArray[2];
    let side =  foodArray[3];
    console.log(`#2 Dinner is served. We're having ${vegetable}, ${starch}, ${protein}, and ${side}.`);
}

serveDinner();
serveDinnerAgain();
