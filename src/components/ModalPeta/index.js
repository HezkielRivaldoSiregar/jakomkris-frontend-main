import React, { Component } from 'react'
import ModalPetaMethod from './ModalPetaMethod';
import axios from 'axios';

export default class ModalPeta extends Component {

    constructor(props) {
        super(props);
        this.state = {
            menu: 'peta',
            churches: [],
            searchStoreText: '',
            dataChurchSelected: 0,
            dataSelectedMarker: null,
            googleMapZoom: 11,
            currentLocation: { lat: -0.90016, lng: 119.8708 },
            id : 1
        }
    }

    componentDidMount() {
        this.handleCurrentLocation()

        axios.get(process.env.PTB_BACKEND_ENDPOINT+`/api/churches`)
            .then(res => {
                const churches = res.data;
                this.setState({ churches });
            })
    }

    handleCurrentLocation() {
        navigator?.geolocation.getCurrentPosition(({ coords: { latitude: lat, longitude: lng } }) => {
            const pos = { lat, lng }

            this.setState({
                currentLocation: pos
            })
        })
    }

    handleChangeInput(name, value) {
        this.setState({ [name]: value });
    }

    handleSelectMarker(value) {
        this.setState({
            dataSelectedMarker: value,
            googleMapZoom: 20,
            id: value._id
        })
    }

    handleRedirect(value) {
        this.setState({
            dataSelectedMarker: value,
            googleMapZoom: 20,
            id: value._id
        })
        window.location.href = `/detail?id=${this.state.id}`;
    }


    render() {
        let { searchStoreText, isModalAddAddress, dataChurchSelected, dataSelectedMarker,
            googleMapZoom, currentLocation, churches, id } = this.state
        let { isShow} = this.props

        

        return (
            <ModalPetaMethod
                isShow={isShow}
                searchStoreText={searchStoreText}
                isModalAddAddress={isModalAddAddress}
                dataChurch={churches}
                dataChurchSelected={dataChurchSelected}
                dataSelectedMarker={dataSelectedMarker}
                googleMapZoom={googleMapZoom}
                currentLocation={currentLocation}
                onChangeInput={(name, value) => this.handleChangeInput(name, value)}
                onSelectMarker={(item) => this.handleSelectMarker(item)}
                onRedirect={(item) => this.handleRedirect(item)}
                onShow={(value) => this.props.onShow(value)}
                onChangeZoom={(value) => this.setState({ googleMapZoom: value })}
                onSelectedAddress={(value) => this.setState({ dataChurchSelected: value })}
                id = {id}
            />
        )
        
    }
}