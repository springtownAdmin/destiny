import { useEffect, useState } from "react";
import { Elements, PaymentRequestButtonElement } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";

const Payment = ({ amount }) => {

  const [stripePromise, setStripePromise] = useState(null);

  useEffect(() => {
        
    console.log(amount)
        // Load the Stripe object with the publishable key
        fetch("http://54.162.201.2:8000/config").then(async (r) => {
          const { publishableKey } = await r.json();
          setStripePromise(loadStripe(publishableKey));
        });

  }, []);

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm amount={amount} />
    </Elements>
  );

};

export default Payment;
