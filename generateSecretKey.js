// Generate a secret key for JWT token
const crypto = require('crypto');
const secretKey = crypto.randomBytes(32).toString('hex');
console.log(secretKey);
