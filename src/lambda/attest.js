import Manager from './AttestationManager'

/**
 * This is the lambda function to issue an ownership credential to a user,
 * signing the JWT on firebase to avoid exposing the application secret
 * 
 * @param {Object} 	body 	 		the body of the request after it has been parsed by the requestparser
 * 
 * @param {String} 	body.mnid		the uport address of the recipient-to-be
 * @param {String}  body.pubEncKey	the public encryption key of the user receiving the credential
 * @param {Object} 	body.claim		the claim body, comprised of the event details and the creator's mnid
 * @param {Integer}	body.exp 		the experation date of the claim in seconds past unix epoch
 * @param {String} 	body.pushToken	A token to allow sending of push notifications, requested by the client side
 */
export default function attestOwnership(body) {
	const {mnid, pubEncKey, pushToken, claim, exp} = body

	// Create and sign the attestation
	const attestation = await Manager.attest({
		sub: mnid, exp, claim
	})

	// Generate a push notification payload from the attestation
	const payload = {
		url: `me.uport:add?attestations=${attestation}`, 
		message: 'This credential asserts that you are the organizer of the event described within'
	}

	Manager.push(pushToken, payload, pubEncKey)
}

/**
 * This is the lambda function to issue an attendance credential to a user,
 * after receiving a signed JWT from the event owner, it will issue a new
 * JWT to the address indicated by the first JWT
 */
export function attestAttendance(body) {
	// Receive ownership credential
	
	// Validate that mnid in credential signed the credential
	const attestation = await Manager.attest({

	})
}