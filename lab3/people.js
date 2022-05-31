const axios = require('axios');

async function getPeople(){
    const {data} = await axios.get('https://gist.githubusercontent.com/graffixnyc/a1196cbf008e85a8e808dc60d4db7261/raw/9fd0d1a4d7846b19e52ab3551339c5b0b37cac71/people.json')
    return data;
}

async function getPersonById(id) {
    if (!id) throw 'Input not supplied or undefined';
    if (typeof id !== 'string') throw 'Input is not a string';
    id = id.trim();
    if (id.length === 0) throw 'id must not be empty spaces';

    const peopleData = await getPeople();
    const person = peopleData.find(p => p.id === id);
    if (person) {
        return person;
    } else {
        throw 'person not found';
    }
}

async function sameEmail(emailDomain) {
    if (!emailDomain) throw 'Input not supplied or undefined';
    if (typeof emailDomain !== 'string') throw 'Input is not a string';
    emailDomain = emailDomain.trim();
    if (emailDomain.length === 0) throw 'emailDomain must not be empty spaces';
    if (!emailDomain.includes('.')) throw 'emailDomain must contain a dot';
    const emailDomainArray = emailDomain.split('.');
    if (emailDomainArray[emailDomainArray.length - 1].length < 2) throw 'emailDomain must contain at least 2 letters after its last dot';

    const peopleData = await getPeople();
    let people = [];
    for (const p of peopleData) {
        const emailDomainArray = p.email.split('@');
        const currentDomain = emailDomainArray[emailDomainArray.length - 1];
        if (currentDomain.toLowerCase() === emailDomain.toLowerCase()) people.push(p);
    }

    if (people.length >= 2) {
        return people;
    } else {
        throw 'There are no two people with the provided email address domain';
    }
}

function manipulateIpSort(a, b) {
    return a.ip_address - b.ip_address;
}

async function manipulateIp() {
    const peopleData = await getPeople();
    let avg = 0;
    for (const p of peopleData) {
        p.ip_address = p.ip_address.split('.').join('');
        p.ip_address = Number(Array.from(String(p.ip_address)).sort().join(''));
        avg += p.ip_address;
    }
    avg = Math.floor(avg / peopleData.length);
    peopleData.sort(manipulateIpSort);
    
    return {
        highest: {firstName: peopleData[peopleData.length - 1].first_name, lastName: peopleData[peopleData.length - 1].last_name},
        lowest: {firstName: peopleData[0].first_name, lastName: peopleData[0].last_name},
        average: avg
    }
}

async function sameBirthday(month, day) {
    if ((!month) || (!day)) throw 'Input not supplied or undefined';
    if (isNaN(parseInt(month)) || isNaN(parseInt(day))) throw 'Input is not a number';
    month = Number(month);
    day = Number(day);
    if ((month < 1) || (month > 12)) throw 'month must be 1-12';
    if (((day < 1) || (day > 31)) || ((month === 2) && (day >= 29)) || (((month === 4) || (month === 6) || (month === 9) || (month === 11)) && (day >= 31))) throw 'day must be valid in accordance with month';

    const peopleData = await getPeople();
    let names = [];
    for (const p of peopleData) {
        const dateArray = p.date_of_birth.split('/');
        if ((dateArray[0] == month) && (dateArray[1] == day)) names.push(`${p.first_name} ${p.last_name}`);
    }

    if (names.length > 0) {
        return names;
    } else {
        throw 'No people with the provided birthday';
    }
}

module.exports = {
    getPeople,
    getPersonById,
    sameEmail,
    manipulateIp,
    sameBirthday
}