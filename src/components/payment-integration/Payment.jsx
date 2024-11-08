import { useEffect, useState } from "react";
import { Elements, PaymentRequestButtonElement } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutFormTest from "./CheckoutFromTest";

function Payment() {

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
      {/* <CheckoutForm /> */}
      <CheckoutFormTest />
    </Elements>
  );

};

export default Payment;
