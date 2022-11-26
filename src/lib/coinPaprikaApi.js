const baseUrl = "https://api.coinpaprika.com/v1"

export const getCoin = async id => {
  try {
    const res = await fetch(`${baseUrl}/coins/${id}`)

    const data = await res.json()

    return data
  } catch (error) {
    console.error(error)
  }
}

export const getCoinPrice = async id => {
  try {
    const res = await fetch(`${baseUrl}/coins/${id}/ohlcv/today`)

    const data = await res.json()

    return data
  } catch (error) {
    console.error(error)
  }
}

export const getCoinTwitter = async id => {
  try {
    const res = await fetch(`${baseUrl}/coins/${id}/twitter`)

    const data = await res.json()

    return data
  } catch (error) {
    console.error(error)
  }
}
