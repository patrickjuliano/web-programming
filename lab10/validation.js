function checkString(string, parameter) {
    if (!string || typeof string != 'string' || string.trim().length == 0) throw `${parameter} must be a non-empty string`;
    return string.trim();
}

function checkUsername(username) {
    username = checkString(username, 'username');
    if (!/^[a-zA-Z0-9]+$/g.test(username)) throw 'username must contain alphanumeric characters only';
    if (username.length < 4) throw 'username must be of length at least 4';
    return username;
}

function checkPassword(password) {
    password = checkString(password, 'password');
    if (/\s/g.test(password)) throw 'password must not contain spaces';
    if (password.length < 6) throw 'password must be of length at least 6';
    return password;
}

module.exports = {
    checkString,
    checkUsername,
    checkPassword
}