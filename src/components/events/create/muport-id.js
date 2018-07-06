import MuPort from 'muport-core'

const IPFS_CONF = {
  host: 'ipfs.infura.io', 
  port: '5001', 
  protocol: 'https'
}

const muportOpts = {
  ipfsConf: IPFS_CONF,
  externalMgmtKey: '0x2cc31912b2b0f3075a87b3640923d45a26cef3ee',
  rpcProviderUrl: `https://rinkeby.infura.io/`,
}

export function createEventIdentity(credentials, eventData) {
  const {image, name, description} = eventData

  // Fully conformant schema.org spec for Event
  const eventProfile = {
    '@context': `http://schema.org`,
    '@type': 'Event',
    name, description,
    image: {
      '@type': 'ImageObjesct',
      name: 'avatar',
      contentUrl: eventData.image
    }
  }

  const muportId = MuPort.newIdentity(eventProfile, null, muportOpts)
}