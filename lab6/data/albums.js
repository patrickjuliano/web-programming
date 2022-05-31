const mongoCollections = require('../config/mongoCollections');
const bandsFunctions = require('./bands');
const bands = mongoCollections.bands;
const albums = mongoCollections.albums;
const { ObjectId } = require('mongodb');

async function getAll(bandId) {
    const band = await bandsFunctions.get(bandId);
    for (const [i, e] of band.albums.entries()) {
        band.albums[i]._id = band.albums[i]._id.toString();
    }
    return band.albums;
}

async function get(albumId) {
    if (!albumId) throw 'You must provide an id to search for';
    if (typeof albumId !== 'string') throw 'Id must be a string';
    if (albumId.trim().length === 0) throw 'Id cannot be an empty string or just spaces';
    albumId = albumId.trim();
    if (!ObjectId.isValid(albumId)) throw 'Invalid object ID';
    const bandCollection = await bands();
    const band = await bandCollection.findOne({ 'albums._id': ObjectId(albumId) });

    if (band === null) throw 'No album with that id';

    const album = band.albums.find(element => element._id.toString() == albumId);
    album._id = album._id.toString();
    return album;
}

async function create(bandId, title, releaseDate, tracks, rating) {
    if (!bandId || !title || !releaseDate || !tracks || !rating) throw 'Input not supplied or undefined';

    if (typeof bandId !== 'string' || typeof title !== 'string' || typeof releaseDate !== 'string') throw 'Input is not a string';
    bandId = bandId.trim();
    title = title.trim();
    releaseDate = releaseDate.trim();
    if (bandId.length === 0 || title.length === 0 || releaseDate.length === 0) throw 'Strings must not be empty';

    if (!ObjectId.isValid(bandId)) throw 'Invalid object ID';
    const band = await bandsFunctions.get(bandId);

    if (!Array.isArray(tracks)) throw 'Input is not an array';
    if (tracks.find(element => typeof element !== 'string' || element.trim().length === 0) || tracks.length < 3) throw 'Arrays must contain only valid, non-empty strings and be of length at least 3';
    for (const [i, e] of tracks.entries()) {
        tracks[i] = tracks[i].trim();
    }

    let releaseDateRaw = releaseDate;
    let fields = releaseDateRaw.split('/');
    if (fields.length != 3 || fields[0].length != 2 || fields[1].length != 2 || fields[2].length != 4) throw 'Invalid releaseDate provided';
    for (const [i, e] of fields.entries()) {
        fields[i] = Number(fields[i]);
        if (isNaN(fields[i])) throw 'Invalid releaseDate provided';
    }
    if ((fields[0] < 1 || fields[0] > 12) || (fields[2] < 1900 || fields[2] > 2023)) throw 'Invalid releaseDate provided';
    if (((fields[1] < 1) || (fields[1] > 31)) || ((fields[0] === 2) && (fields[1] > 28)) || (((fields[0] === 4) || (fields[0] === 6) || (fields[0] === 9) || (fields[0] === 11)) && (fields[1] > 30))) throw 'Invalid releaseDate provided';
    
    if (typeof rating !== 'number' || rating < 1 || rating > 5) throw 'rating must be a valid number between 1 and 5';

    const bandCollection = await bands();
    const albumId = new ObjectId();
    let newAlbum = {
        _id: albumId,
        title: title,
        releaseDate: releaseDate,
        tracks: tracks,
        rating: rating
    };

    let newRating = rating;
    const albumList = await getAll(band._id.toString());
    for (const a of albumList) {
        newRating += a.rating;
    }
    newRating /= (albumList.length + 1);

    return bandCollection
        .updateOne({_id: ObjectId(bandId)}, {$addToSet: {albums: newAlbum}, $set: {overallRating: newRating}})
        .then(async function () {
            const album = await get(albumId.toString());
            album._id = album._id.toString();
            return album;
        });
}

async function remove(albumId) {
    if (!albumId) throw 'You must provide an id to search for';
    if (typeof albumId !== 'string') throw 'Id must be a string';
    if (albumId.trim().length === 0) throw 'Id cannot be an empty string or just spaces';
    albumId = albumId.trim();
    if (!ObjectId.isValid(albumId)) throw 'Invalid object ID';
    const bandCollection = await bands();
    const band = await bandCollection.findOne({ 'albums._id': ObjectId(albumId) });
    if (band === null) throw 'No album with that id';

    let newRating = 0;
    const albumList = await getAll(band._id.toString());
    for (const a of albumList) {
        if (a._id.toString() != albumId) newRating += a.rating;
    }
    if (albumList.length == 1) {
        newRating = 0;
    } else {
        newRating /= (albumList.length - 1);
    }

    return bandCollection
    .updateOne({_id: band._id}, {$pull: {albums: {_id: ObjectId(albumId)}}, $set: {overallRating: newRating}})
    .then(async function () {
        const newBand = await bandsFunctions.get(band._id.toString());
        newBand._id = newBand._id.toString();
        return newBand;
    });
}

module.exports = {
    get,
    getAll,
    create,
    remove
}