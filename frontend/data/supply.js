import axios from "axios";

const getSupply = async (id) => {
  const response = await axios.get(`${process.env.API_URL}/supply/search/${id}`)
  return response
}

module.exports = {
    getSupply
}