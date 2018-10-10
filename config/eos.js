module.exports = {
  chainId: 'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f', // 32 byte (64 char) hex string
  keyProvider: ['5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3',
                '5KB54qRajE6kcLeVKufZN9k9uhjWE8FFPQetK3EESpJvhwL3R64',
                '5JdEePkh97EEU5yrGpeKSVQwVQHebRigX817JiTrC7csepCvt7v',
                '5JMYHV6uWLQBft1EFVPV1mkGiQa3zEQBkoQmGLEgHvizAiTr6Nb'
                ], // eosio private key //keystore.keyProvider,
  httpEndpoint: 'http://127.0.0.1:8888',
  expireInSeconds: 60,
  broadcast: true,
  verbose: false, // API activity
  sign: true
}
