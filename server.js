const express             = require('express');
const session             = require('express-session');
const cors                = require('cors');
const chalk               = require('chalk');
const bodyParser          = require('body-parser');
const cookieParser        = require('cookie-parser');
const Eos                 = require('eosjs');
//const {Keystore, Keygen}  = require('eosjs-keygen');
const ecc                 = require('eosjs-ecc')
//const {PrivateKey, PublicKey, Signature, Aes, key_utils, config} = require(‘eosjs-ecc’)
const app                 = express();

const port                = 8080;

app.disable('x-powered-by');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors(
              {
                origin: ["http://localhost:9876"],
                //don't forget to use withCredentials in Angular
                credentials: true
              }
));


//keystore init
/*const sessionConfig       = require('./config/session');
keystore = Keystore('eosio', sessionConfig);*/

//eosjs init
const eosConfig = require('./config/eos');
eos = Eos(eosConfig);
eos.getInfo((err, result) => {
  if (err)
    console.log(`An error was occurred: ${error}`);
  if(result)
    console.log(`Connection to EOS successful!\nEOS info: ${JSON.stringify(result)}`);
});

//routes
require('./app/routes')(app, eos, ecc /*keystore, Keygen*/);

//server init
let server = app.listen(port, () => {
  console.log(chalk.yellow(`Server alive on port: ${port}\nServer PID: ${process.pid}\nUse "kill [pid]" to terminate server!`));
});

//exit code
process.on('SIGTERM', function () {
  server.close(() => {
    console.log(chalk.red('Server gracefully stopped!'));
  });
  setTimeout( function () {
    console.error("Could not close connections in time, forcefully shutting down");
    process.exit(1);
   }, 30*1000);
});
