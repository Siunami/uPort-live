import { Connect, SimpleSigner } from 'uport-connect'
import { Credentials } from 'uport'
const registryArtifact = require('uport-registry')

const signer = SimpleSigner('2000049c7b733cd95f8622f65614c06d52402b7962534b76da001c4e1c42af5c');

// export const credentials = new Credentials({  
//   appName: 'App Name',
//   address: '2ogMjGdGFH34nByWBi9AmdBze7AU1pETADo',
//   signer: signer,
//   networks: {  
//     id: '0x4',
//     registry: registryArtifact.networks['4'].address,
//     rpcUrl: 'https://rinkeby.infura.io' 
//   }
// });

export const credentials = new Credentials({
  appName: 'Credential Tutorial',
  address: '2ooQK27bB5CK51hQVjRScEMRoHvwM74Uj5a',
  signer: signer
})

console.log(credentials);

export const uport = new Connect('Test app', {
  clientId: '2ogMjGdGFH34nByWBi9AmdBze7AU1pETADo',
  network: 'rinkeby',
  signer: signer
})

export const web3 = uport.getWeb3()