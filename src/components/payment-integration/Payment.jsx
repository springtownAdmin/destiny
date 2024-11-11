import { useEffect, useState } from "react";
import { Elements, PaymentRequestButtonElement } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { Oval } from "react-loader-spinner";

// const stripePromise = loadStripe(import.env.VITE_STRIPE_KEY)

const Payment = ({ productId, amount, product_title }) => {

  const [stripePromise, setStripePromise] = useState(null);

  useEffect(() => {

        const fetchStripeKey = async () => {

            try {

                const response = await fetch('https://destiny-server-nhyk.onrender.com/config');
                const data = await response.json();
                const { publishableKey } = data;
                const stripe = await loadStripe(publishableKey);
                setStripePromise(stripe);

            } catch (e) {

                console.log(e);

            }

        }

        fetchStripeKey();
        
        // Load the Stripe object with the publishable key
        // fetch("https://destiny-server-nhyk.onrender.com/config").then(async (r) => {
        //   const { publishableKey } = await r.json();
        //   setStripePromise(loadStripe(publishableKey));
        // });

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
      <CheckoutForm productId={productId} amount={amount} product_title={product_title} />
    </Elements>
  );

};

export default Payment;
