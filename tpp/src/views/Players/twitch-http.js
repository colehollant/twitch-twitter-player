import axios from 'axios';

export const HTTP = axios.create({
  baseURL: `https://api.twitch.tv/`,
  headers: {
    'Client-ID': `${process.env.VUE_APP_TPPCID}`

  }
})