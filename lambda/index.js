const AWS = require('aws-sdk')
const { Credentials, SimpleSigner } = require('uport')
const { attestOwnership, attestAttendance } = require('./attest')

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
 * ---> ideal world, either ORGANIZER or EVENT ITSELF should sign the credential
 */

// Set up attestation signing capabilities for the uPort Live APP
const manager = new Credentials({
	signer: new SimpleSigner(process.ENV.signingKey),
	address: process.ENV.address
})

/**
 * Expore the functions themselves
 */
exports.handleCreate = handle(attestOwnership, manager)
exports.handleIssue = handle(attestAttendance, manager)

/**
 * Body parsing and error handling boilerplate
 */
function handle(handler, manager) {
	return function theHandler(event, context, callback) {
		console.log('handling')
		try {
			const body = JSON.parse(event.body || JSON.stringify(event))
			const result = handler(body, manager)
			callback(null, result)		
		} catch (err) {
			callback({code: 500, message: err.message})
		}
	}
}