const mongoCollections = require('../config/mongoCollections');
const bands = mongoCollections.bands;
const { ObjectId } = require('mongodb');

async function get(id) {
    if (!id) throw 'You must provide an id to search for';
    if (typeof id !== 'string') throw 'Id must be a string';
    if (id.trim().length === 0) throw 'Id cannot be an empty string or just spaces';
    id = id.trim();
    if (!ObjectId.isValid(id)) throw 'Invalid object ID';
    const bandCollection = await bands();
    const band = await bandCollection.findOne({ _id: ObjectId(id) });
    if (band === null) throw 'No band with that id';

    band._id = band._id.toString();
    return band;
}

async function getAll() {
    const bandCollection = await bands();
    const bandList = await bandCollection.find({}).toArray();
    if (!bandList) throw 'Could not get all bands';

    for (const [i, e] of bandList.entries()) {
        bandList[i]._id = bandList[i]._id.toString();
    }
    return bandList;
}

async function create(name, genre, website, recordLabel, bandMembers, yearFormed) {
    if (!name || !genre || !website || !recordLabel || !bandMembers || !yearFormed) throw 'Input not supplied or undefined';

    if (typeof name !== 'string' || typeof website !== 'string' || typeof recordLabel !== 'string') throw 'Input is not a string';
    name = name.trim();
    website = website.trim();
    recordLabel = recordLabel.trim();
    if (name.length === 0 || website.length === 0 || recordLabel.length === 0) throw 'Strings must not be empty';

    let websiteRaw = website;
    websiteRaw = websiteRaw.replace('http://www.', '');
    websiteRaw = websiteRaw.replace('.com', '');
    if (!website.startsWith('http://www.') || !website.endsWith('.com') || websiteRaw.length < 5) throw 'Invalid website provided';

    if (!Array.isArray(genre) || !Array.isArray(bandMembers)) throw 'Input is not an array';
    if (genre.find(element => typeof element !== 'string' || element.trim().length === 0) || genre.length === 0 || bandMembers.find(element => typeof element !== 'string' || element.trim().length === 0) || bandMembers.length === 0 ) throw 'Arrays must contain only valid, non-empty strings';
    for (const [i, e] of genre.entries()) {
        genre[i] = genre[i].trim();
    }
    for (const [i, e] of bandMembers.entries()) {
        bandMembers[i] = bandMembers[i].trim();
    }

    if (typeof yearFormed !== 'number' || yearFormed < 1900 || yearFormed > 2022) throw 'yearFormed must be a valid number between 1900 and 2022';

    const bandCollection = await bands();

    let newBand = {
        name: name,
        genre: genre,
        website: website,
        recordLabel: recordLabel,
        bandMembers: bandMembers,
        yearFormed: yearFormed
    };

    const insertInfo = await bandCollection.insertOne(newBand);
    if (!insertInfo.acknowledged || !insertInfo.insertedId)
      throw 'Could not add band';

    const newId = insertInfo.insertedId.toString();

    const band = await this.get(newId);
    band._id = band._id.toString();
    return band;
}

async function remove(id) {
    if (!id) throw 'You must provide an id to search for';
    if (typeof id !== 'string') throw 'Id must be a string';
    if (id.trim().length === 0) throw 'Id cannot be an empty string or just spaces';
    id = id.trim();
    if (!ObjectId.isValid(id)) throw 'Invalid object ID';

    const bandCollection = await bands();
    const band = await this.get(id);
    const name = band.name;
    const deletionInfo = await bandCollection.deleteOne({ _id: ObjectId(id) });

    if (deletionInfo.deletedCount === 0) {
      throw `Could not delete band with id of ${id}`;
    }
    return `${name} has been successfully deleted!`;
}

async function rename(id, newName) {
    if (!id) throw 'You must provide an id to search for';
    if (typeof id !== 'string') throw 'Id must be a string';
    if (id.trim().length === 0) throw 'Id cannot be an empty string or just spaces';
    id = id.trim();
    if (!ObjectId.isValid(id)) throw 'Invalid object ID';

    if (!newName) throw 'You must provide a name for your band';
    if (typeof newName !== 'string') throw 'newName must be a string';
    if (newName.trim().length === 0) throw 'newName cannot be an empty string or string with just spaces';
    newName = newName.trim();


    const bandCollection = await bands();
    const updatedBand = {
      name: newName
    };

    const updatedInfo = await bandCollection.updateOne(
        { _id: ObjectId(id) },
        { $set: updatedBand }
    );
    if (updatedInfo.modifiedCount === 0) throw 'Could not update band successfully';

    const band = await this.get(id);
    band._id = band._id.toString();
    return band;
}

module.exports = {
    get,
    getAll,
    create,
    remove,
    rename
}