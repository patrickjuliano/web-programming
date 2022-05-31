const axios = require('axios');

async function getPeople() {
    const {data} = await axios.get('https://gist.githubusercontent.com/graffixnyc/31e9ef8b7d7caa742f56dc5f5649a57f/raw/43356c676c2cdc81f81ca77b2b7f7c5105b53d7f/people.json');
    return data;
}

async function getPersonById(id) {
    const data = await getPeople();
    const person = data.find(p => p.id === id);
    if (person) {
        return person;
    } else {
        throw 'Error: Person not found';
    }
}

async function getWork() {
    const {data} = await axios.get('https://gist.githubusercontent.com/graffixnyc/febcdd2ca91ddc685c163158ee126b4f/raw/c9494f59261f655a24019d3b94dab4db9346da6e/work.json');
    return data;
}

async function getWorkById(id) {
    const data = await getWork();
    const work = data.find(w => w.id === id);
    if (work) {
        return work;
    } else {
        throw 'Error: Company not found';
    }
}

module.exports = {
    getPeople,
    getPersonById,
    getWork,
    getWorkById
}