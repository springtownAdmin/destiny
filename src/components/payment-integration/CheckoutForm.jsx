import React, { useEffect, useState } from 'react';
import { PaymentRequestButtonElement, useStripe, useElements } from '@stripe/react-stripe-js';

const CheckoutForm = () => {

  const stripe = useStripe();
  const elements = useElements();
  const [paymentRequest, setPaymentRequest] = useState(null);
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  // const clientSecret = import.meta.env.VITE_STRIPE_SECRET_KEY;

  useEffect(() => {

    if (!stripe || !elements) return;

    if (stripe) {
      
      const request = stripe.paymentRequest({
        country: 'US',
        currency: 'usd',
        total: {
          label: 'Total',
          amount: 100, // amount in cents
        },
        requestPayerName: true,
        requestPayerEmail: true,
        requestShipping: true, // Request shipping details
        shippingOptions: [
          // The first shipping option in this list appears as the default
          // option in the browser payment interface.
          {
            id: 'free-shipping',
            label: 'Free shipping',
            detail: 'Arrives in 5 to 7 days',
            amount: 0,
          },
        ],
      });

      // Check if the Payment Request is supported
      request.canMakePayment().then((result) => {

        if (result) {
          setPaymentRequest(request);
        } else {
          console.error('Payment Request not supported');
        }

      });

      request.on('token', async (event) => {
        const { token } = event; // Get shipping details

        try {
          // Send the token and shipping details to your server for processing
          const response = await fetch('https://destiny-server-nhyk.onrender.com/create-payment-intent', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: token.id }),
          });

          const data = await response.json();

          if (response.ok) {
            // Payment succeeded
            setMessage('Payment successful! Thank you for your purchase.');
            setSuccess(true);
          } else {
            // Payment failed
            setMessage(data.error || 'Payment failed. Please try again.');
            setSuccess(false);
          }
        } catch (error) {
          console.error(error);
          setMessage('An error occurred. Please try again later.');
          setSuccess(false);
        }

        // Complete the payment
        event.complete(success ? 'success' : 'fail');
      });

      // Handle shipping address updates
      request.on('shippingaddresschange', async (event) => {

        // Update total amount or handle shipping address change logic if necessary
        // event.updateWith({ status: 'success' }); // Always mark as success for this example

        if (event.shippingAddress.country !== 'US') {
          event.updateWith({status: 'invalid_shipping_address'});
        } else {

          // Perform server-side request to fetch shipping options
          const response = await fetch('/calculateShipping', {
            data: JSON.stringify({
              shippingAddress: event.shippingAddress
            })
          });
          const result = await response.json();
      
          event.updateWith({
            status: 'success',
            shippingOptions: result.supportedShippingOptions,
          });

        }

      });

      // request.on('paymentmethod', async (ev) => {
      //   // Confirm the PaymentIntent without handling potential next actions (yet).
      //   const {paymentIntent, error: confirmError} = await stripe.confirmCardPayment(
      //     clientSecret,
      //     {payment_method: ev.paymentMethod.id},
      //     {handleActions: false}
      //   );
      
      //   if (confirmError) {
      //     // Report to the browser that the payment failed, prompting it to
      //     // re-show the payment interface, or show an error message and close
      //     // the payment interface.
      //     ev.complete('fail');
      //   } else {
      //     // Report to the browser that the confirmation was successful, prompting
      //     // it to close the browser payment method collection interface.
      //     ev.complete('success');
      //     // Check if the PaymentIntent requires any actions and, if so, let Stripe.js
      //     // handle the flow. If using an API version older than "2019-02-11"
      //     // instead check for: `paymentIntent.status === "requires_source_action"`.
      //     if (paymentIntent.status === "requires_action") {
      //       // Let Stripe.js handle the rest of the payment flow.
      //       const {error} = await stripe.confirmCardPayment(clientSecret);
      //       if (error) {
      //         // The payment failed -- ask your customer for a new payment method.
      //       } else {
      //         // The payment has succeeded -- show a success message to your customer.
      //       }
      //     } else {
      //       // The payment has succeeded -- show a success message to your customer.
      //     }
      //   }
      // });

    }

  }, [stripe, elements]);

  return (
    <div>
      {paymentRequest ? <PaymentRequestButtonElement options={{ paymentRequest }} /> : <div className='h-full w-full flex justify-center items-center text-red-500'>This payment method is not allowed on your device</div>}
      {message && (
        <div style={{ marginTop: '20px', color: success ? 'green' : 'red' }}>
          {message}
        </div>
      )}
    </div>
  );
};

export default CheckoutForm;
