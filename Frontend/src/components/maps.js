import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

const libraries = ["places"]

export default function Map() {

// Loads the map using API KEY
const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyDFa3IN8JpDa3fyM8b3vFwVdortIeH37iA',
    libraries
});

// This returns while map is being loaded
if (!isLoaded) return <div>Loading...</div>
return (
    <GoogleMap 
        zoom={12}
        center={{lat: 34.1844, lng: -118.3136}} 
        mapContainerClassName='map-container previewShadow3'
    >
        <Marker 
        position={{ lat: 34.1844, lng: -118.3136 }} />
        
    </GoogleMap>
    
    )
}



