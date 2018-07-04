import { MNID } from 'uport-connect'
import MuPort from 'muport-core'

/**********************************************************************
 * WIP: none of this does anything yet!!
 *********************************************************************/

const IPFS_CONF = {
  host: 'ipfs.infura.io', 
  port: '5001', 
  protocol: 'https'
}

// Initialize IPFS
const ipfs = IpfsAPI(IPFS_CONF)

/** 
 * Generate a set of muport options.  The only thing that could
 * change is the externalMgmtKey, which is the address of the
 * registry contract on the appropriate network.  Since the 
 * rpcProviderUrl is fixed at rinkeby, seems like this doesn't make sense
 */
const muportOpts = ({networkAddress}) => ({
  ipfsConf: IPFS_CONF,
  externalMgmtKey: MNID.decode(networkAddress).address,
  rpcProviderUrl: 'https://rinkeby.infura.io/',
})


function createEventIdentity(credentials, eventData) {
  const eventProfile = {
    '@context': 'http://schema.org',
    '@type': 'Event',
    name: eventData.name,
    description: eventData.description,
    image: {
      '@type': 'ImageObject',
      name: 'avatar',
      contentUrl: 
    }
  }

  const muportId = MuPort.newIdentity(eventProfile, null, muportOpts(credentials))
}


