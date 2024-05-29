import React from 'react'

function TransactionErrors({ error }) {
    return (
    <div className='text-danger'>
        <p>{error && `${error}`}</p>
    </div>
);
}

export default TransactionErrors