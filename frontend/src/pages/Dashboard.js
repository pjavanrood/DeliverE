import React from 'react'
import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api'

const libraries = ['places']

const Dashboard = () => {
    const mapContainerStyle = {
        width: '50vw',
        height: '50vh',
    }
    const [mapref, setMapRef] = React.useState(null)
    const [pickupSelected, setPickupSelected] = React.useState(false)
    const [destSelected, setDestSelected] = React.useState(false)
    const [centerDest, setCenterDest] = React.useState(null)
    const [center, setCenter] = React.useState({
        lat: 49.28, // default latitude
        lng: -123.12, // default longitude
    })
    const [message, setMessage] = React.useState(null)

    const handleOnLoad = map => {
        setMapRef(map);
    };
    const handleCenterChanged = () => {
        if (mapref) {
            if (!pickupSelected)
                setCenter(mapref.getCenter())
            else if (!destSelected)
                setCenterDest(mapref.getCenter())
        }
    };

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY,
        libraries,
    })

    const handlePickupSet = (event) => {
        setPickupSelected(true)
        if (mapref)
            setCenterDest(mapref.getCenter())
    }

    const handleDestSet = (event) => {
        setDestSelected(true)
        setMessage(
            `From: ${center} To ${centerDest}`
        )
    }

    if (loadError) {
        return <div>Error loading maps</div>
    }

    if (!isLoaded) {
        return <div>Loading maps</div>
    }

    return (
        <div className='centered-container'>
            <h1>Send Package</h1>
            <button onClick={handlePickupSet}>Set Pick-up</button>
            <button onClick={handleDestSet}>Set Destination</button>
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={10}
                center={center}
                onLoad={handleOnLoad}
                onDragEnd={handleCenterChanged}
            >
                <MarkerF position={center} />
                <MarkerF position={centerDest}/>
            </GoogleMap>
            <p>{message}</p>
        </div>
    )
}

export default Dashboard