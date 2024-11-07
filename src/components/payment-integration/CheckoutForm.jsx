import React, { useEffect, useState } from 'react';
import { PaymentRequestButtonElement, useStripe, useElements } from '@stripe/react-stripe-js';

const CheckoutForm = ({ price = 20.00, product_title = 'Total' }) => {

  const stripe = useStripe();
  const elements = useElements();
  const [paymentRequest, setPaymentRequest] = useState(null);
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {

    if (!stripe || !elements) return;

    if (stripe) {
      
      const request = stripe.paymentRequest({
        country: 'US',
        currency: 'usd',
        total: {
          // label: product_title,
          label: 'Total',
          // amount: Math.round(parseFloat(price) * 100), // amount in cents
          amount: 2000, // amount in cents
        },
        requestPayerName: true,
        requestPayerEmail: true,
        requestShipping: true, // Request shipping details
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
        const { token, shippingAddress } = event; // Get shipping details

        try {
          // Send the token and shipping details to your server for processing
          const response = await fetch('https://destiny-server-nhyk.onrender.com/create-payment-intent', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: token.id, shippingAddress }),
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
      request.on('shippingaddresschange', (event) => {
        // Update total amount or handle shipping address change logic if necessary
        event.updateWith({ status: 'success' }); // Always mark as success for this example
      });
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
