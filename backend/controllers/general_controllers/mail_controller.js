const formData = require('form-data');
const Mailgun = require('mailgun.js');
const mailgun = new Mailgun(formData);
const mg = mailgun.client({username: 'api', key: process.env.MAILGUN_API_KEY});

const sendMail = async (req, res) => {

	try {

		const formData = {
			from: `${req.body.name} ${req.body.email}`,
			to: "info@hayaltepe.com",
			subject: req.body.subject,
			text: req.body.message
		}

		console.log(req.body.name);
		console.log(req.body.email);
		console.log(formData.from);

		mg.messages.create(process.env.MAILGUN_DOMAIN, formData)
	} catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
	sendMail
};