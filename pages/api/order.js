import { transporder, mailOptions, getClientMailOptions } from '../../config/nodemailer'
import { generateNotificationEmailContent, generateClientEmailContent } from '../../lib/helpers/apiEmailGenerators'

const handler = async (req, res) => {

  if (req.method == "POST") {
    
    const data = req.body

    try {
      // Client email
      await transporder.sendMail({
        ...getClientMailOptions(data),
        ...generateClientEmailContent(data),
        subject: 'Order confirmed'
      })      
      // Notification email to us
      await transporder.sendMail({
        ...mailOptions,
        ...generateNotificationEmailContent(data),
        subject: 'New order notification'
      })
      res.status(200).json({ success: true })
    }
    catch(err) {
      console.log(err.message)
      return res.status(400).json({ message: err.message })  
    }
  }
}

export default handler