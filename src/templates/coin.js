import React from "react"

import { getCoin, getCoinPrice, getCoinTwitter } from "../lib/coinPaprikaApi"

import Layout from "../components/layout"

import * as classes from "./coin.module.css"

const Coin = ({ serverData }) => {
  const { coin, price, twitter } = serverData

  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  })

  return (
    <Layout>
      <section className={classes.container}>
        <div className={classes.card}>
          <img src={coin.logo} alt={coin?.name} />
          <h1 className={classes.h1}>{coin?.name}</h1>
          <div className={classes.priceContainer}>
            <p className={classes.price}>
              {currencyFormatter.format(price[0]?.low)} -
              {currencyFormatter.format(price[0]?.high)}
            </p>
          </div>
          <p className={classes.description}>{coin.description}</p>
        </div>
        <div className={classes.twitterContainer}>
          <h3>Latest Tweets About {coin?.name}</h3>
          <ul className={classes.tweetList}>
            {twitter?.map(tweet => (
              <li key={tweet.status_id} className={classes.tweet}>
                <div className={classes.tweetContainer}>
                  <img src={tweet.user_image_link} alt={tweet.user_name} />
                  <blockquote className="twitter-tweet">
                    <p lang="en" dir="ltr">
                      {tweet.status}
                    </p>
                    &mdash; {tweet.user_name}{" "}
                    <a href={tweet.status_link}>{tweet.date}</a>
                  </blockquote>{" "}
                </div>

                <script
                  async
                  src="https://platform.twitter.com/widgets.js"
                  charSet="utf-8"
                ></script>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </Layout>
  )
}

export default Coin

export const getServerData = async context => {
  const {
    pageContext: { id },
  } = context

  try {
    const [coin, price, twitter] = await Promise.all([
      getCoin(id),
      getCoinPrice(id),
      getCoinTwitter(id),
    ])

    return {
      props: {
        coin,
        price,
        twitter,
      },
    }
  } catch (error) {
    console.error(error)
  }
}
