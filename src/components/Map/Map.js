import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

const Map = withGoogleMap(props) =>
    <GoogleMap
        defaultZoom={8}
        defaultCenter={{ lat: 58.987, lng: 6.342 }}
    >
        {props.isMarkerShown && <Marker position={{ lat: 58.987, lng: 6.342 }} />}
    </GoogleMap>

<Map  isMarkerShown />
