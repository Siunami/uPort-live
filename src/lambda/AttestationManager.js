import { Credentials, SimpleSigner } from 'uport-js'

/** 
 * Here we manage the actual signing of attestations via
 * the uPort Live application identity and a handy-dandy manager.  
 * In both ownership
 * and attendance credentials, we rely on the app to sign things
 *
 * @rambling
 * This currently signs all claims with the same identity, which
 * is that of the uPort Live application itself.  Adding support
 * for multiple individual identities as signers would be complicated
 * and I'm not entirely sure the use case.  At the same time, it would
 * not be as hard to add signatures to a credential, so that the issuer
 * may add their signature to the app's own
 */

// Set up attestation signing capabilities for the uPort Live APP
const signer = new SimpleSigner('APP_SECRET')
const address = 'some address'
const Manager = new Credentials({signer, address})

export default Manager