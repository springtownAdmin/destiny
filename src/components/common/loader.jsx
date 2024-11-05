import React from 'react'
import { ThreeDots } from 'react-loader-spinner';

const Loader = ({  color='#000000' }) => {

  return (
    <div className='flex justify-center items-center'>
        <ThreeDots
            visible={true}
            height="25"
            width="25"
            color={color}
            radius="9"
            ariaLabel="three-dots-loading"
        />
    </div>
  );

}

export default Loader