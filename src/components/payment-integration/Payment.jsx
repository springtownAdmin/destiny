import { useEffect, useState } from "react";
import { Elements, PaymentRequestButtonElement } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";

function Payment({ price = 20.00, product_title = 'Total' }) {

  const [stripePromise, setStripePromise] = useState(null);

  useEffect(() => {
        
        // Load the Stripe object with the publishable key
        fetch("https://destiny-server-nhyk.onrender.com/config").then(async (r) => {
          const { publishableKey } = await r.json();
          setStripePromise(loadStripe(publishableKey));
        });

  }, []);

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm price={price} product_title={product_title} />
    </Elements>
  );

};

export default Payment;
