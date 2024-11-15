import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { Oval } from "react-loader-spinner";

// const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY)

const Payment = ({ productId, amount, product_title, variant_id }) => {

  const [stripePromise, setStripePromise] = useState(null);

  useEffect(() => {
        
        // Load the Stripe object with the publishable key
        fetch("https://destiny-server-nhyk.onrender.com/config").then(async (r) => {
          const { publishableKey } = await r.json();
          setStripePromise(loadStripe(publishableKey));
        });

  }, []);

  if (!stripePromise) {

    return (
    
        <div className="flex justify-center items-center">
            <Oval
                visible={true}
                height="30"
                width="30"
                color="#000000"
                ariaLabel="oval-loading"
                secondaryColor="lightgray"
            />
        </div>
    
    )

  }

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm productId={productId} amount={amount} product_title={product_title} variant_id={variant_id} />
    </Elements>
  );

};

export default Payment;
