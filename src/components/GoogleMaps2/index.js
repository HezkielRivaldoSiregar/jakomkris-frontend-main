import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps'
import Buttons from '../Buttons';
import './googleMaps2.scss'
import {LogoJakomkris, MarkerIcon} from '../../assets';
import { Link } from 'react-router-dom';

const GoogleMaps2 = withScriptjs(withGoogleMap((props) => {
    function handleZoomChanged() {
        props.onChangeZoom(this.getZoom())
    }

    console.log("label GMaps: " ,props.label)
    console.log("filter GMaps: " ,props.filter)

    return (

        <GoogleMap
            zoom={props.zoom}
            defaultCenter={props.defaultCenter}
            center={
                props.dataSelectedMarker !== null ?
                    { lat: parseFloat(props.dataSelectedMarker.geometry.coordinates[0]), lng: parseFloat(props.dataSelectedMarker.geometry.coordinates[1]) }
                    :
                    { lat: parseFloat(props.defaultCenter.lat), lng: parseFloat(props.defaultCenter.lng) }
            }
            clickableIcons={false}
            onZoomChanged={handleZoomChanged}
        >

            {props.isMarkerShown?
                <div>
                    {props.label == "Sangat siap"?
                        props.dataMarker.map((item, i) => {
                            return (
                                <div>
                                {item.properties.disasterOccurs == "Sangat siap"?
                                        <Marker
                                            zoomOnClick={20}
                                            key={i}
                                            icon={props.dataSelectedMarker !== null && props.dataSelectedMarker._id === item._id ? MarkerIcon : MarkerIcon}
                                            position={{ lat: parseFloat(item.geometry.coordinates[0]), lng: parseFloat(item.geometry.coordinates[1]) }}
                                            onClick={() => props.onSelect(item)}

                                        />
                                    :
                                    null
                                    }
                                </div>
                            )
                        }) 
                    :
                        null
                    }
                </div>
            :
                null
            }
            
            {props.dataSelectedMarker !== null ?
                <div className='wrap-church-detail'>
                    <div className='top-content'>
                        <div className='wrap-media'>
                            <img className='logo' src={LogoJakomkris} alt='church' />
                        </div>
                    </div>
                    <div className='bottom-content'>
                        <p className='title'>{props.dataSelectedMarker.properties.name}</p>
                        <p className='desc'>{props.dataSelectedMarker.properties.address}</p>  
                        {props.dataSelectedMarker.properties != null ?
                            <div>
                                {props.dataSelectedMarker.properties.disasterOccurs == "Tidak siap"?
                                    <p className='preparation-level' style = {{background : "#CF3333"}}> 
                                        {props.dataSelectedMarker.properties.disasterOccurs}
                                    </p>  
                                :props.dataSelectedMarker.properties.disasterOccurs == "Sedikit siap"?
                                    <p className='preparation-level' style = {{background : "#F7EA00"}}> 
                                        {props.dataSelectedMarker.properties.disasterOccurs}
                                    </p>  
                                :props.dataSelectedMarker.properties.disasterOccurs == "Siap"?
                                    <p className='preparation-level' style = {{background : "#D0EA00"}}> 
                                        {props.dataSelectedMarker.properties.disasterOccurs}
                                    </p>  
                                :props.dataSelectedMarker.properties.disasterOccurs == "Sangat siap"?
                                    <p className='preparation-level' style = {{background : "#00FF00"}}> 
                                        {props.dataSelectedMarker.properties.disasterOccurs}
                                    </p>  
                                :
                                null
                                }   
                            </div>
                        :
                        null
                        }              
                    </div>
                    <div className='wrap-btn'>
                        <Link to={`/detail?id=${props.churchId}`}>
                            <Buttons title="Detail Gereja" block variant="general" size="xs"/>
                        </Link>
                    </div>
                </div>
                :
                null
            }
        </GoogleMap>
    )
}))


export default GoogleMaps2