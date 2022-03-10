const express = require('express')
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const app = express()
const port = 3005;
const db = require("./models");


const { ApolloClient, HttpLink, InMemoryCache, gql } = require('@apollo/client')
const fetch = require('cross-fetch');



/* db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");    
}); */

db.sequelize.sync();

app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));
app.use(cookieParser());

app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/credit/sign', require('./routes/sign.js').signTransaction);

app.listen(port, async () => {
  console.log(`Example app listening on port ${port}`)

  /* 
  const APIURL = 'https://api.thegraph.com/subgraphs/name/c4devart/downbelow';

  const Query = `
  {
    depositItems(first: 5) {
      id
      from
      amount
      timestamp
    }
    withdrawItems(first: 5) {
      id
      to
      amount
      timestamp
    }
  }  
  `
  const client = createClient({url: APIURL});

  const ret = await client.query(Query).toPromise();

  console.log("resulet ==>", ret.data); */
})

async function main() {
    const Query = `
      {
        depositItems(first: 10) {
          id
          from
          amount
          timestamp
        }
        withdrawItems(first: 10) {
          id
          to
          amount
          timestamp
        }
      }  
    `
    const APIURL = 'https://api.thegraph.com/subgraphs/name/c4devart/downbelow';

    const client = new ApolloClient({
      link: new HttpLink({ uri: APIURL, fetch }),
      cache: new InMemoryCache(),
    })

    client
    .query({
      query: gql(Query),
    })
    .then(async (res) => {
      console.log("new--->", res.data);
    })
    .catch((err) => {
      console.log('Error fetching data: ', err)
    })
}

main();