const accountSID = 'AC11d7b7ab9f72df9663d32f2e11c0101d'
const authToken = '517f5389c5994eaa45870c6dd6f403cd'
const client = require('twilio')(accountSID, authToken)

client.messages.create({
  from: 'whatsapp:+14155238886',
  to: 'whatsapp:+5492901489892',
  body: ''
})
  .then(message => console.log(message))
  .catch(e => console.log(e))