import express from "express"
import cors from "cors"
import BodyParser from "body-parser"
import Airtable from "airtable"
import axios from "axios"
import querystring from "querystring"


const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })

const app = express()
app.set('case sensitive routing', true);

app.use(cors({
  origin: process.env.CORS_ORIGIN,
}))
app.use(BodyParser.json())

app.post("/ContactForm", (req, res) => {
  const data = {
    Name: req.body.name,
    Email: req.body.email,
    Issue: req.body.subject,
    Message: req.body.message,
    googleRecaptchaToken: req.body.googleRecaptchaToken,
  }
  for (let key in data) {
    if (!data[key]) {
      res.status(400).end()
      return
    }
  }
  axios.get("https://www.google.com/recaptcha/api/siteverify?"
    +querystring.stringify({
      secret: process.env.GOOGLE_RECAPTCHA_SECRET_KEY,
      response: data.googleRecaptchaToken,
    })
  )
    .then(response => {
      console.log({ recaptcha: response.data })
      if (!response.data.success) {
        throw new Error("Recaptcha failed. Reason: "+response.data["error-codes"])
      }
      delete data.googleRecaptchaToken
      return airtable.base("appgB0qECN1EgaGmz").table("tblQweyBiY4nL5BGU").create(data)
    })
    .then(data => {
      console.log({airtableRecord: {...data.fields, ...data._rawJson}})
      res.end()
    })
    .catch(e => {
      console.error(e)
      res.status(500).end()
      // TODO Respond more appropriately with proper error code
    })
})

app.listen(80)
