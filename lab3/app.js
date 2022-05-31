const people = require("./people");
const stocks = require("./stocks");

async function main() {
    try {
        const peopleData = await people.getPeople();
        console.log(peopleData);
    } catch(e) {
        console.log(e);
    }

    try {
        const peopleData = await people.getPersonById("7989fa5e-8f3f-458d-ad58-23c8d9ef5a10");
        console.log(peopleData);
    } catch(e) {
        console.log(e);
    }

    try {
        const peopleData = await people.sameEmail("harvard.edu");
        console.log(peopleData);
    } catch(e) {
        console.log(e);
    }

    try {
        const peopleData = await people.manipulateIp();
        console.log(peopleData);
    } catch(e) {
        console.log(e);
    }

    try {
        const peopleData = await people.sameBirthday(9, 25);
        console.log(peopleData);
    } catch(e) {
        console.log(e);
    }

    try {
        const peopleData = await stocks.getStocks();
        console.log(peopleData);
    } catch(e) {
        console.log(e);
    }

    try {
        const stocksData = await stocks.listShareholders("Aeglea BioTherapeutics, Inc.");
        console.log(stocksData);
    } catch(e) {
        console.log(e);
    }

    try {
        const stocksData = await stocks.totalShares();
        console.log(stocksData);
    } catch(e) {
        console.log(e);
    }

    try {
        const stocksData = await stocks.listStocks("Grenville", "Pawelke");
        console.log(stocksData);
    } catch(e) {
        console.log(e);
    }

    try {
        const stocksData = await stocks.getStockById("f652f797-7ca0-4382-befb-2ab8be914ff0");
        console.log(stocksData);
    } catch(e) {
        console.log(e);
    }
}

main();