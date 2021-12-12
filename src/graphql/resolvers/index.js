const Mutation = require('./mutation');
const Query = require('./query');

// const relations = require('./relations');

const resolvers = {
	Query,
	Mutation,
	// ...relations
};

module.exports = resolvers;
