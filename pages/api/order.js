import { transporder, mailOptions, getClientMailOptions } from '../../config/nodemailer'
import { generateNotificationEmailContent, generateClientEmailContent } from '../../lib/helpers'

const handler = async (req, res) => {

  if (req.method == "POST") {
    
    const data = req.body

    try {
      // Notification email to us
      await transporder.sendMail({
        ...mailOptions,
        ...generateNotificationEmailContent(data),
        subject: 'New order notification'
      })

      // Client email
      await transporder.sendMail({
        ...getClientMailOptions(data),
        ...generateClientEmailContent(data),
        subject: 'Order confirmed'
      })
    }
    catch(err) {
      console.log(err.message)
      return res.status(400).json({ message: err.message })  
    }
    return res.status(200).json({ success: true })
  }

}

export default handler