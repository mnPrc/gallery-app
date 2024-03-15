import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectGalleries } from '../store/gallery/selector';
import { userSelector } from '../store/auth/selectors';
import { getGalleries, setBuyerId } from '../store/gallery/slice';
import { BrowserRouter as Router,Link } from 'react-router-dom';
import { deposit } from '../store/auth/slice';

function Transactions() {
    const dispatch = useDispatch();
    const galleries = useSelector(selectGalleries);
    const activeUser = useSelector(userSelector);
    const [money, setMoney] = useState('');

    useEffect(() => {
        dispatch(setBuyerId(activeUser.id));
        dispatch(getGalleries())
    },[activeUser.id, dispatch])

    const handleDepositMoney = () => {
        const amount = parseFloat(money);
        dispatch(deposit(amount));
        setMoney('');
    }

    return(
        <div>
            <h2>Deposit Money</h2>
            <input
                type='number'
                value={money}
                min = '1'
                max = '10000'
                onChange={(e) => setMoney(e.target.value)}
                placeholder="Enter money to deposit"
            />
            <br/>
            <button onClick={handleDepositMoney}>Deposit Money</button>
            <br/>
            <h2>Buy History</h2>
            {galleries && galleries.data
            .filter(gallery => gallery.buyer_id === activeUser.id)
            .map((gallery) => (
                    <div key={gallery.id}>
                        <Link to={`/galleries/${gallery.id}`}>
                            <h3>{gallery.name}</h3>
                        </Link>
                        <p>Description: {gallery.description}</p>
                        <p>Bought for: {gallery.price}</p>
                        <img src={gallery.first_image_url} alt={gallery.name} width="300px" height="300px" />
                    </div>
                ))}
        </div>
    )
}

export default Transactions;