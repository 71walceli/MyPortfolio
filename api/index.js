import express from "express"
import cors from "cors"
import BodyParser from "body-parser"


const app = express()
app.set('case sensitive routing', true);

app.use(cors({
  origin: process.env.CORS_ORIGIN,
}))
app.use(BodyParser.json())

app.post("/ContactForm", (req, res) => {
  const data = {
    name: req.body.name,
    email: req.body.email,
    subject: req.body.subject,
    message: req.body.message,
  }
  for (key in data) {
    if (!data[key]) {
      res.status(400).end()
      return
    }
  }
  // TODO Add recaptcha data
  // TODO Use CSRF token
  res.end()
})

app.listen(80)
