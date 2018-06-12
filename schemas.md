# Formatting and Schemas

This is where we can standardize the data format for information contained by an event ownership attestation and event attendance attestations.  Specifically we draw from [schema.org](schema.org/Event), and use a subset of the fields provided there.

## Event Ownership/Creation

An event ownership attestation asserts that someone has created an event with uPort live and is the organizer of that event.  Their uPort ID will have the ability to issue attendance credentials for their event via the uPort live app.  The claim field for all uPort live ownership credentials contains a single key, with several child key-value pairs as follows:

```javascript
claim: {
	UPORT_LIVE_EVENT: {
		identifier: uuid, 	// unique identifier for the event
		organizer: uport-id,// who is the organizer, for integrity purposes
		name: string,		// name for the event
		about: string,		// description of the event
		location: string,	// where is the event happening
		startDate: string,	// (ISO datetime) what date is the event happening
	}
}
```

## Event Attendance

Event attendance is a similar claim, given the same information as the event ownership credential but nested under a different key, namely `UPORT_LIVE_ATTENDANCE`.  Valid attendance credentials will be created by the owner of the event, and be signed by the key listed as organizer in the credential itself, and possessed by the attendee listed in the credential.  This prevents forging of credentials in two ways: the sharing of attendence QRs to other users (which will be detected by a mismatched attendee field), and the creation of forged events, which will not be signed by the specified organizer.

```javascript
claim: {
	UPORT_LIVE_ATTENDANCE: {
		// integrity fields:
		organizer: uport-id,
		attendee: uport-id,
		// rest is same as above
		identifier: uuid,
		name: string,
		about: string,
		location: string,
		startDate: string,
	}
}
```
