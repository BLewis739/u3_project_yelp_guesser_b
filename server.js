const express = require('express')
const axios = require('axios')
const cors = require('cors')
const logger = require('morgan')
const bodyParser = require('body-parser')
const AuthRouter = require('./routes/AuthRouter')
const ScoreRouter = require('./routes/ScoreRouter')
const LeaderboardRouter = require('./routes/LeaderboardRouter')
const ScoreListRouter = require('./routes/ScoreListRouter')
const app = express()

const PORT = process.env.PORT || 3001

app.use(cors())
app.use(logger('dev'))
app.use(bodyParser.json())

app.get('/', (req, res) => res.json({ message: 'Server Works' }))
app.use('/auth', AuthRouter)
app.use('/score', ScoreRouter)
app.use('/leaderboard', LeaderboardRouter)
app.use('/scorelist', ScoreListRouter)

/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
////////////////////////////// YELP SERVER //////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

let API_KEY =
  'aIgcPCstsSguvhNOM9KNSDbiwoqJK5Kv3TiEyjikYYBquOInYN4nA05Sb6S1akz3AUB23FVsevExkFxcgCZezklG2ECx6RhK0VBWH-htAy6SdHBziL_SQGZLiHdYYnYx'
axios.defaults.headers.common = {
  Authorization: `Bearer ${API_KEY}`
}

const getBusiness = async (zipCode) => {
  let result = await axios.get(
    `https://api.yelp.com/v3/businesses/search?location=${zipCode}&limit=50&offset=200&sort_by=rating`
  )
  return result.data.businesses
}
const getBusinessByReviews = async (id) => {
  let result = await axios.get(
    `https://api.yelp.com/v3/businesses/${id}/reviews`
  )
  return result.data
}

app.get('/businesses:zipcode', async (req, res) => {
  const { zipcode } = req.params
  let businesses = await getBusiness(zipcode)

  return res.status(200).json({ businesses })
})
app.get('/businessreviews/:id', async (req, res) => {
  const { id } = req.params
  const reviews = await getBusinessByReviews(id)
  return res.status(200).json({ reviews })
})

app.listen(PORT, () => console.log(`Server Running On Port: ${PORT}`))
