const slugger = require("slugger")

const selectedCoins = ["Ethereum", "The Graph", "Chainlink"]

const filteredCoins = coins => {
  return coins.filter(coin => selectedCoins.includes(coin.name))
}

exports.sourceNodes = async ({ actions, createContentDigest }) => {
  const { createNode } = actions

  const getCoins = await fetch(`https://api.coinpaprika.com/v1/coins`)
  const coins = await getCoins.json()
  const coinNodes = filteredCoins(coins)

  coinNodes.forEach(coin => {
    createNode({
      ...coin,
      id: coin.id,
      name: coin.name,
      slug: slugger(coin.name),
      internal: {
        type: "cryptoCoin",
        contentDigest: createContentDigest(coin),
      },
    })
  })
}

exports.createPages = async ({ actions }) => {
  const { createPage } = actions

  const getCoins = await fetch(`https://api.coinpaprika.com/v1/coins`)
  const coins = await getCoins.json()

  filteredCoins(coins)
    .map(coin => ({
      name: coin.name,
      id: coin.id,
    }))
    .forEach(coin => {
      createPage({
        path: `/coins/${slugger(coin.name)}`,
        component: require.resolve("./src/templates/coin.js"),
        context: {
          id: coin.id,
        },
      })
    })
}
