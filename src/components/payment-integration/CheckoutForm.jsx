import React from 'react';
import { FaApple } from "react-icons/fa";

const CheckoutForm = ({ payment = false }) => {

  return (
    <div>

      {payment === false &&
        <button disabled className='p-3 text-white bg-gray-600 cursor-not-allowed w-full mt-3 rounded-md'>
          <div className='flex justify-center items-center gap-3'>
            <FaApple size={20}/> Apple Pay
          </div>
        </button>
      }

    </div>
  );

};

export default CheckoutForm;