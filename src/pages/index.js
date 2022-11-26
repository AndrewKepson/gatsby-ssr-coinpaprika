import * as React from "react"
import { Link, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"
import * as styles from "../components/index.module.css"

const IndexPage = ({ data }) => {
  const coins = data.allCryptoCoin.edges.map(coin => coin.node)

  return (
    <Layout>
      <div className={styles.textCenter}>
        <h1>SSR Crypto Data with Gatsby</h1>
      </div>
      <ul className={styles.list}>
        {coins.map(coin => (
          <li key={coin.id} className={styles.listItem}>
            <Link to={`/coins/${coin.slug}`}>{coin.name}</Link>
          </li>
        ))}
      </ul>
      <section id="disclaimer">
        <p>
          <strong>Disclaimer:</strong>
          This website is a demonstration website for using Gatsby SSR to
          generate websites from API data. This website and all of the web pages
          of which it consists are not intended to be used for any other
          purpose, including cryptocurrency trading or any other financial
          purpose. The author of this website is not responsible for any losses
          incurred by using this website, including information found on any of
          its pages.
        </p>
      </section>
    </Layout>
  )
}

export const Head = () => <Seo title="Home" />

export default IndexPage

export const query = graphql`
  query {
    allCryptoCoin {
      edges {
        node {
          id
          name
          slug
        }
      }
    }
  }
`
