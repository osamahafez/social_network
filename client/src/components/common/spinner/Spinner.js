import React from 'react'
import spinner from './spinner_green.gif';

const Spinner = (props) => {
    return (
        <div className='text-center'>
            <img src={spinner} alt="loading" style={{width:'100px'}} />
        </div>
    );
}

export default Spinner;