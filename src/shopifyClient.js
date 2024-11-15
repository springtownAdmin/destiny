// shopifyClient.js
import Client from 'shopify-buy';
import { VITE_ACCESS_TOKEN, VITE_DOMAIN } from './helper/constants';

const client = Client.buildClient({
  domain: VITE_DOMAIN,
  storefrontAccessToken: VITE_ACCESS_TOKEN,
});

export default client;
