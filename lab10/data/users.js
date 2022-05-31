const bcrypt = require('bcrypt');
const saltRounds = 16;
const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.users;
const validation = require('../validation');

async function createUser(username, password) {
    username = validation.checkUsername(username);
    password = validation.checkPassword(password);
    
    const userCollection = await users();
    const user = await userCollection.findOne({username: {$regex: new RegExp(username, 'i')}});
    if (user) throw 'User with this username already exists';

    const hash = await bcrypt.hash(password, saltRounds);
    let newUser = {
        username: username,
        password: hash
    }
    const insertInfo = await userCollection.insertOne(newUser);
    if (!insertInfo.acknowledged || !insertInfo.insertedId) throw 'Could not add user';
    return {userInserted: true};
}

async function checkUser(username, password) {
    username = validation.checkUsername(username);
    password = validation.checkPassword(password);
    
    const userCollection = await users();
    const user = await userCollection.findOne({username: {$regex: new RegExp(username, 'i')}});
    if (!user) throw 'Either the username or password is invalid';

    const compare = await bcrypt.compare(password, user.password);
    if (!compare) throw 'Either the username or password is invalid';
    return {authenticated: true};
}

module.exports = {
    createUser,
    checkUser
}