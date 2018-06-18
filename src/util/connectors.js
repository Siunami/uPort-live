import { Connect, SimpleSigner } from 'uport-connect'
import { Credentials } from 'uport'

const registryArtifact = require('uport-registry')

// TEMPORARY CLIENT SIDE SIGNER.
// TODO: REPLACE WITH FIREBASE LAMBDA FUNCTION
const signer = SimpleSigner('cee5a66435456e057bc58e9cf6a7a83a4d40f826744975a059ec6da8610f16df')

// Unsure what this is exaclty for ? 
export const credentials = new Credentials({
  appName: 'Credential Tutorial',
  address: '2ooQK27bB5CK51hQVjRScEMRoHvwM74Uj5a',
  signer: signer
})

export const uport = new Connect('uPort Live', {
  clientId: '2p2BR9kv8xPPiNFL7bHUZXg4idyUYfaCwfg',
  network: 'rinkeby',
  signer: signer
})

export const web3 = uport.getWeb3()