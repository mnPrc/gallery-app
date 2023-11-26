import React from 'react';
import { isAuthenticated } from '../store/auth/selectors';
import { useSelector } from 'react-redux';
import DisplayGalleries from '../components/gallery/DisplayGalleries';


function HomePage() {

    const isLoggedIn = useSelector(isAuthenticated)

    return (
    <div>
        <h1>Gallery application</h1>
        {isLoggedIn && (
            <DisplayGalleries/>
        )}
    </div>
  );
}

export default HomePage;
