import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { Oval } from "react-loader-spinner";
import { STRIPE_PUBLISHABLE_KEY } from "../../helper/constants";

const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY)

const Payment = ({ productId, amount, product_title, variant_id, payment = false }) => {

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
      <CheckoutForm productId={productId} amount={amount} product_title={product_title} variant_id={variant_id} payment={payment} />
    </Elements>
  );

};

export default Payment;
