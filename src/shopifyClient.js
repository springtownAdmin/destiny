// shopifyClient.js
import Client from 'shopify-buy';

const client = Client.buildClient({
  domain: import.meta.env.VITE_DOMAIN,
  storefrontAccessToken: import.meta.env.VITE_ACCESS_TOKEN,
});

export default client;
