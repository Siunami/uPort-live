import { Connect, SimpleSigner } from 'uport-connect'
import { Credentials } from 'uport'

const registryArtifact = require('uport-registry')

// TEMPORARY CLIENT SIDE SIGNER.
const signer = SimpleSigner('cee5a66435456e057bc58e9cf6a7a83a4d40f826744975a059ec6da8610f16df')

export const uport = new Connect('uPort Live', {
  clientId: '2p2BR9kv8xPPiNFL7bHUZXg4idyUYfaCwfg',
  network: 'rinkeby',
  signer: signer
})

export const web3 = uport.getWeb3()