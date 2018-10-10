const funcs  = require('../functions');
module.exports = function(app, eos, ecc /*keystore, Keygen*/) {

  app.post('/create_account', (req, res) => {
    const user = req.body.username;
    const user_key = req.body.key;
    const key = 'EOS8QnKB5rtW842yFQwst44yT4M7z4dRVDY7pQ1uNS6UEpx3n8Ahy';
    const creator = 'eosio';
    const s_net   = 0.1,
          s_cpu   = 1;
    eos.transaction(tr => {
        tr.newaccount({
            creator: creator,
            name: user,
            owner: user_key,
            active: user_key
        })
        tr.buyrambytes({
            payer: creator,
            receiver: user,
            bytes: 4 * 1024
        })
        tr.delegatebw({
          from: creator,
          receiver: user,
          stake_net_quantity: s_net.toFixed(4) + ' EOS',
          stake_cpu_quantity: s_cpu.toFixed(4) + ' EOS',
          transfer: 0
        })
    },{ authorization: ['eosio'] }).then((result) =>{
        res.send(result);
    }).catch((err) => {
        res.send(err);
    });
  });

  app.post('/generate_keys', (req, res) => {
    ecc.randomKey().then(privateKey => {
        res.send( `Private Key: ${privateKey}\nPublic Key: ${ecc.privateToPublic(privateKey)}` );
    })
  });

  app.post('/transfer', (req, res) => {
    const from    = String(req.body.from),
          to      = String(req.body.to),
          count   = parseInt(req.body.amount).toFixed(4),
          token   = String(req.body.token),
          value   = `${count} ${token}`
          memo    = String(req.body.text);

    eos.contract('waytransf').then((contract) => {
      contract.transfer( from, to, value, memo, { authorization: [from] })
      .then((result) => {
        res.send(result);
      })
      .catch((error) => {
        res.send(error);
      })
    });

  });

  app.post('/balance', (req, res) => {
    eos.getTableRows(true, "waytransf", req.body.username, "accounts").then((result) => {
        res.send(result);
    }).catch((err) => {
        res.send(error);
    });
  });

  app.post('/account', (req, res) => {
    eos.getAccount(req.body.username).then((result) => {
        res.send(result);
    }).catch((err) => {
        res.send(error);
    });
  });

  app.post('/set_token', (req, res) => {
    const issuer          = String(req.body.issuer),
          value           = parseInt(req.body.value).toFixed(4),
          token           = req.body.token,
          maximum_supply  = `${value} ${token}`,
          repcent         = parseInt(req.body.percent);

    eos.contract('waytransf').then((contract) => {
      contract.create( issuer, maximum_supply, repcent, { authorization: ['waytransf'] })
      .then((result) => {
        res.send(result);
      })
      .catch((error) => {
        res.send(error);
      })
    });
  });

  app.post('/issue', (req, res) => {
    const issuer          = String(req.body.username),
          owner           = String(req.body.owner),
          count           = parseInt(req.body.value).toFixed(4),
          token           = req.body.token,
          value           = `${count} ${token}`,
          memo            = String(req.body.text);

    eos.contract('waytransf').then((contract) => {
      contract.issue( issuer, value, memo, {authorization: [owner]} )
      .then((result) => {
        res.send(result);
      })
      .catch((error) => {
        res.send(error);
      })
    });
  });

};
