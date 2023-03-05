import { transporder, mailOptions } from '../../config/nodemailer'
import { generateContactFormEmailContent } from '../../lib/helpers/apiEmailGenerators'

const handler = async (req, res) => {

  if (req.method === "POST") {
    const data = req.body
    if (!data.name || !data.subject || !data.email || !data.message) {
      return res.status(400).json({ message: 'Bad request' })      
    }
    try {
      await transporder.sendMail({
        ...mailOptions,
        ...generateContactFormEmailContent(data),
        subject: data.subject,
      })
      return res.status(200).json({ success: true })
    }
    catch (err) {
      console.log(err)
      return res.status(400).json({ message: err.message })
    }
  }
  return res.status(400).json({ message: 'Bad request' })
}

export default handler