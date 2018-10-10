const userRoutes = require('./user_routes');
const eosRoutes = require('./eos_routes');
module.exports = function(app, eos, ecc /*keystore, Keygen*/) {
  eosRoutes(app, eos, ecc/*keystore, Keygen*/);
};
