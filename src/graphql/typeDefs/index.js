const rootSchema = require('./root');
const adminSchema = require('./admin');

const typeDefs = [rootSchema, adminSchema];

module.exports = typeDefs;
