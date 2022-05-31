const axios = require('axios');
const people = require("./people");

async function getStocks(){
    const {data} = await axios.get('https://gist.githubusercontent.com/graffixnyc/8c363d85e61863ac044097c0d199dbcc/raw/7d79752a9342ac97e4953bce23db0388a39642bf/stocks.json')
    return data;
}

async function listShareholders(stockName) {
    if (!stockName) throw 'Input not supplied or undefined';
    if (typeof stockName !== 'string') throw 'Input is not a string';
    stockName = stockName.trim();
    if (stockName.length === 0) throw 'stockName must not be empty spaces';

    const stocksData = await getStocks();
    const stock = stocksData.find(s => s.stock_name === stockName);
    if (!stock) throw 'Stock with provided name cannot be found';

    for (const [i, e] of stock.shareholders.entries()) {
        const person = await people.getPersonById(e.userId);
        delete stock.shareholders[i].userId;
        stock.shareholders[i].first_name = person.first_name;
        stock.shareholders[i].last_name = person.last_name;
    }
    return stock;
}

async function totalShares(stockName) {
    if (!stockName) throw 'Input not supplied or undefined';
    if (typeof stockName !== 'string') throw 'Input is not a string';
    stockName = stockName.trim();
    if (stockName.length === 0) throw 'stockName must not be empty spaces';

    const stocksData = await getStocks();
    const stock = stocksData.find(s => s.stock_name === stockName);
    if (!stock) throw 'Stock with provided name cannot be found';

    let shareholders = 0;
    let shares = 0;
    for (const s of stock.shareholders) {
        shareholders++;
        shares += s.number_of_shares;
    }
    const shareholdersPlurality = shareholders === 1 ? '' : 's';
    const possessivePlurality = shareholders === 1 ? 's' : '';
    const sharesPlurality = shares === 1 ? '' : 's';
    if (shareholders > 0) {
        return `${stock.stock_name}, has ${shareholders} shareholder${shareholdersPlurality} that own${possessivePlurality} a total of ${shares} share${sharesPlurality}.`;
    } else {
        return `${stock.stock_name} currently has no shareholders.`;
    }
}

async function listStocks(firstName, lastName) {
    if ((!firstName) || (!lastName)) throw 'Input not supplied or undefined';
    if ((typeof firstName !== 'string') || (typeof lastName !== 'string')) throw 'Input is not a string';
    firstName = firstName.trim();
    lastName = lastName.trim();
    if ((firstName.length === 0) || (lastName.length === 0)) throw 'Input must not be empty spaces';

    const peopleData = await people.getPeople();
    const person = peopleData.find(p => p.first_name === firstName && p.last_name === lastName);
    if (!person) throw 'person not found';
    
    const stocksData = await getStocks();
    let stocks = [];
    for (const s of stocksData) {
        const sh = s.shareholders.find(e => e.userId === person.id);
        if (sh) {
            stocks.push({
                stock_name: s.stock_name,
                number_of_shares: sh.number_of_shares
            });
        }
    }
    
    if (stocks.length > 0) {
        return stocks;
    } else {
        throw 'Person must own shares in at least one company';
    }
}

async function getStockById(id) {
    if (!id) throw 'Input not supplied or undefined';
    if (typeof id !== 'string') throw 'Input is not a string';
    id = id.trim();
    if (id.length === 0) throw 'id must not be empty spaces';

    const stocksData = await getStocks();
    const stock = stocksData.find(s => s.id === id);
    if (!stock) throw 'Stock with provided id cannot be found';

    return stock;
}

module.exports = {
    getStocks,
    listShareholders,
    totalShares,
    listStocks,
    getStockById
}