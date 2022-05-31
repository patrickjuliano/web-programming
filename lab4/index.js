const dbConnection = require('./config/mongoConnection');
const bands = require("./data/bands");

async function main() {
    const dbDrop = await dbConnection.connectToDb();
    await dbDrop.dropDatabase();

    let pinkFloyd = undefined;
    let theBeatles = undefined;
    let allBands = undefined;
    let linkinPark = undefined;
    let renamedPinkFloyd = undefined;
    let allBandsV2 = undefined;

    try {
        pinkFloyd = await bands.create("Pink Floyd", ["Progressive Rock", "Psychedelic Rock", "Classic Rock"], "http://www.pinkfloyd.com", "EMI", ["Roger Waters", "David Gilmour", "Nick Mason", "Richard Wright", "Sid Barrett"], 1965);
        console.log(pinkFloyd);
    } catch (e) {
        console.error('Test case failed');
    }

    try {
        theBeatles = await bands.create("The Beatles", ["Rock", "Pop", "Psychedelia"], "http://www.thebeatles.com", "Parlophone", ["John Lennon", "Paul McCartney", "George Harrison", "Ringo Starr"], 1960);
    } catch (e) {
        console.error('Test case failed');
    }

    try {
        allBands = await bands.getAll();
        console.log(allBands);
    } catch (e) {
        console.error('Test case failed');
    }
    
    try {
        linkinPark = await bands.create("Linkin Park", ["Alternative Rock", "Pop Rock", "Alternative Metal"], "http://www.linkinpark.com", "Warner", ["Chester Bennington", "Rob Bourdon", "Brad Delson", "Mike Shinoda", "Dave Farrell", "Joe Hahn"], 1996);
        console.log(linkinPark);
    } catch (e) {
        console.error('Test case failed');
    }
    
    try {
        renamedPinkFloyd = await bands.rename(pinkFloyd._id, "Pink Floyd 2: Electric Boogaloo");
        console.log(renamedPinkFloyd);
    } catch (e) {
        console.error('Test case failed');
    }
    
    try {
        await bands.remove(theBeatles._id);
    } catch (e) {
        console.error('Test case failed');
    }
    
    try {
        allBandsV2 = await bands.getAll();
        console.log(allBandsV2);
    } catch (e) {
        console.error('Test case failed');
    }
    
    try {
        const create = await bands.create(1, 2, 3, 4, 5, 6);
        console.error('create did not error');
    } catch (e) {
        console.log('create failed successfully');
    }

    try {
        const create = await bands.remove('FAKE_ID');
        console.error('remove did not error');
    } catch (e) {
        console.log('remove failed successfully');
    }

    try {
        const create = await bands.rename('FAKE_ID', 'Cool Band Name');
        console.error('rename did not error');
    } catch (e) {
        console.log('rename failed successfully');
    }

    try {
        const create = await bands.rename(linkinPark._id, 100);
        console.error('rename did not error');
    } catch (e) {
        console.log('rename failed successfully');
    }

    try {
        const create = await bands.get('FAKE_ID');
        console.error('get did not error');
    } catch (e) {
        console.log('get failed successfully');
    }

    await dbConnection.closeConnection();
}

main();