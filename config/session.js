module.exports = {
  timeoutInMin: 30,
  uriRules: {
    'owner' : '/account',
    'active': '/(transfer|contracts)',
    'active/**': '/producers'
  },
  timeoutKeyPaths: [
    'owner',
    'owner/**'
  ],
  keepPublicKeys: true
}
