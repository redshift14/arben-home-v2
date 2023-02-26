import nodemailer from 'nodemailer'

const email = process.env.EMAIL
const pass = process.env.PASS

export const transporder = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: email,
    pass: pass
  }
})

export const mailOptions = {
  from: email,
  to: email 
}

export const getClientMailOptions = (data) => {
  return {
    from: email,
    to: data.client.email
  }
}