const manager = require('./Attestationmanager')

/**
 * This is the lambda function to issue an ownership credential to a user,
 * signing the JWT on firebase to avoid exposing the application secret
 * 
 * @param {Object} 	body 	 		the body of the request after it has been parsed by the requestparser
 * 
 * @param {String} 	body.mnid		the uport address of the recipient-to-be (the event creator)
 * @param {String}  body.pubEncKey	the public encryption key of the user receiving the credential
 * @param {Object} 	body.claim		the claim body, comprised of the event details and the creator's mnid
 * @param {Integer}	body.exp 		the experation date of the claim in seconds past unix epoch
 * @param {String} 	body.pushToken	A token to allow sending of push notifications, requested by the client side
 */
function attestOwnership(body, manager) {
	console.log(body)
	const {mnid, pubEncKey, pushToken, claim, exp} = body

	// Create and sign the attestation
	const attestation = await manager.attest({
		sub: mnid, exp, claim
	})

	// Generate a push notification payload from the attestation
	const payload = {
		url: `me.uport:add?attestations=${attestation}`, 
		message: 'This credential asserts that you are the organizer of the event described within'
	}

	manager.push(pushToken, payload, pubEncKey)

	return {
		code: 200,
		message: 'Success!'
	}
}

/**
 * This is the lambda function to issue an attendance credential to a user,
 * after receiving a signed JWT from the event owner, it will issue a new
 * JWT to the address indicated by the first JWT
 * 
 * @param {Object} body
 */
function attestAttendance(body, manager) {
	console.log(body)
	// Receive ownership credential
	const {mnid, pubEncKey, pushToken, data} = body

	const {name, exp} = data

	// Validate that mnid in credential signed the credential
	// TODO !! 

	// Create the claim from the data
	// TODO: do more with the structure of this??
	const claim = {
		UPORT_LIVE_ATTENDANCE: data
	}

	const attestation = await manager.attest({
		sub: mnid, exp, claim
	})

	// Generate the push notification payload
	const payload = {
		url: `me.uport:add?attestations=${attestation}`,
		message: `Accept your attendance verification for ${name}`
	}

	manager.push(pushToken, payload, pubEncKey)

	return {
		code: 200,
		message: 'Success!'
	}
}

module.exports = { attestAttendance, attestOwnership }