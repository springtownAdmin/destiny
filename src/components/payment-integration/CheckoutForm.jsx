import React from 'react';
import { FaApple } from "react-icons/fa";

const CheckoutForm = ({ payment = false }) => {

  return (
    <div className='w-1/2 md:w-full'>

      {payment === false &&
        <button disabled className='p-3 text-white bg-gray-600 cursor-not-allowed w-full md:mt-3 rounded-md'>
          <div className='flex justify-center items-center gap-3'>
            <FaApple size={20}/> Pay
          </div>
        </button>
      }

    </div>
  );

};

export default CheckoutForm;