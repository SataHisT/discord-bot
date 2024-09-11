const { google } = require('googleapis')

const documentId = process.env.BOT_DOC_RULES_ID

async function fetchRulesFromGoogleDocs() {
	const auth = new google.auth.GoogleAuth({
		keyFile: 'credentials.json',
		scopes: ['https://www.googleapis.com/auth/documents.readonly']
	})

	const docs = google.docs({ version: 'v1', auth })
	const response = await docs.documents.get({ documentId })
	const content = response.data.body.content

	let rulesText = ''
	content.forEach((element) => {
		if (element.paragraph && element.paragraph.elements) {
			element.paragraph.elements.forEach((textRun) => {
				if (textRun.textRun && textRun.textRun.content) {
					rulesText += textRun.textRun.content
				}
			})
		}
	})

	return rulesText
}

module.exports = { fetchRulesFromGoogleDocs }
