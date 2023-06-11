import React, { Component } from 'react';
import { Dropdown,Row,Col} from 'react-bootstrap'
import { church, MenuClose, MenuSearch, IconChurch, IconGrid, NotFound } from '../../../assets';
import GoogleMaps from '../../GoogleMaps';
import GoogleMaps2 from '../../GoogleMaps2';
import GoogleMaps3 from '../../GoogleMaps3';
import GoogleMaps4 from '../../GoogleMaps4';
import GoogleMaps5 from '../../GoogleMaps5';
import './ModalPetaMethod.scss'
import Select from 'react-select';

export default class ModalPetaMethod extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterSearchChurch: [],
            valueSearchChurch: '',
            selectedSearchChurch: null,
            menu: "MapChurchList",
            isSearch: 0,
            selectOptions: [],
            filter: 0,
            label: 'Semua',
            total: 0
        }
    }

    async getOptions() {
        const options =  [
            {label: 'Semua'},
            {label: 'Sangat siap'},
            {label: 'Siap'},
            {label: 'Sedikit siap'},
            {label: 'Tidak siap'}
        ]
        
        this.setState({
            selectOptions: options,
        })

    }

    componentDidMount(){
        let {dataChurch} = this.props
            
            this.getOptions()

            this.setState({
                filterSearchChurch: dataChurch,
            });
    }

    handleChange(e) {
        this.setState({
            label: e.label,
            filter: 1
        })
    }

    handleChangeSearch = () => {
        let { dataChurch } = this.props

        this.setState({
            filterSearchChurch: dataChurch,
        });
    };

    filterListSearch = (e) => {
        let { dataChurch } = this.props

        let updatedList = dataChurch.filter(item => {
            return (
                item.properties.name.toLowerCase().search(e.target.value.toLowerCase()) !== -1 ||
                item.properties.address.toLowerCase().search(e.target.value.toLowerCase()) !== -1 
            );
        });

        this.setState({
            filterSearchChurch: updatedList,
            valueSearchChurch: e.target.value,
            isSearch: 1,
        });
    };

    handleRemoveSearch = () => {
        let { dataChurch } = this.props

        this.setState({
            valueSearchChurch: '',
            filterSearchChurch: dataChurch,
            selectedSearchChurch: null,
        });
    };

    render() {
        const {filterSearchChurch, valueSearchChurch, menu, isSearch, filter, label, total} = this.state
        let {  dataChurch, dataSelectedMarker, googleMapZoom, currentLocation, dataChurchSelected, id} = this.props

        console.log("value search:", isSearch)
        console.log("value filter:", filterSearchChurch.length)
        console.log("id:", id)
        console.log("label:", label)
        console.log("total:", total)

        return (
          <div className='map-content'>

            <div className='body-section'>
                <div className='wrap-search-church'>
                    <form>
                        <Dropdown bsPrefix="dropdown-search-store">
                            <Dropdown.Toggle bsPrefix="wrap-input-dropdown" as={'div'}>
                                <input
                                    type='text'
                                    placeholder='Cari Gereja'
                                    name='searchGereja'
                                    value={valueSearchChurch}
                                    onChange={this.filterListSearch}
                                />

                                <span className='icon search'>
                                    <img src={MenuSearch} alt='search'/>
                                </span>

                                {valueSearchChurch !== '' ?
                                    <span className='icon clear' onClick={this.handleRemoveSearch}>
                                        <img src={MenuClose} alt='clear' />
                                    </span>
                                    :
                                    null
                                }
                            </Dropdown.Toggle>
                        </Dropdown>
                    </form>
                </div>
                
          
                <div className='method-tab'>
                    <span className={'list-item-method'+(menu === 'MapChurchList' ? ' active' : '')} onClick={() => this.setState({ menu: 'MapChurchList' })}>
                        <img className='icon' alt='icon' src={IconChurch}/>
                        Peta Gereja
                    </span>
                    <span className={'list-item-method'+(menu === 'GridChurchList' ? ' active' : '')} onClick={() => this.setState({ menu: 'GridChurchList' })}>
                        <img className='icon' alt='icon' src={IconGrid}/>
                        List Gereja
                    </span>    
                    <Select
                        className="dropdown"
                        options={this.state.selectOptions}
                        onChange={this.handleChange.bind(this)}
                        onClick={() => this.callAlert()}
                        placeholder="Semua"
                    />              
                </div>

                <div className='wrap-content'>
                    {menu !== 'MapChurchList' ?
                        <div className='wrap-church-grid'>
                            <div className='wrap-address-list scrollbar-xs'>
                                <Row xs={1} md={1} lg={4}>
                                    {this.state.label == "Sangat siap" && isSearch == 0?
                                        dataChurch.map((item, i) => {
                                            return (
                                                <Col>
                                                    {item.properties.disasterOccurs == "Sangat siap" ?
                                                        <div className={'address-item '} onClick={this.handleId}>
                                                            <div className='wrap-address'>
                                                                <img className='icon' alt='icon' src={IconChurch}/>
                                                                <p className='name'>{item.properties.name}</p>
                                                                <p className='address'>{item.properties.address}</p>
                                                            </div>
                                                        </div>
                                                    :
                                                        null
                                                    }
                                                </Col>
                                            )
                                        })
                                    :this.state.label == "Sangat siap" && isSearch == 1 && filterSearchChurch.length > 0? 
                                        filterSearchChurch.map((item, i) => {
                                            return (
                                                <Col>
                                                    {item.properties.disasterOccurs == "Sangat siap" ?
                                                        <div className={'address-item '} onClick={this.handleId}>
                                                            <div className='wrap-address'>
                                                                <img className='icon' alt='icon' src={IconChurch}/>
                                                                <p className='name'>{item.properties.name}</p>
                                                                <p className='address'>{item.properties.address}</p>
                                                            </div>
                                                        </div>
                                                    :
                                                        null
                                                    }
                                                </Col>
                                            )
                                        })
                                    :this.state.label == "Sangat siap" && isSearch == 1 && filterSearchChurch.length==0? 
                                        <div>
                                            <img className='notFoundGrid' src={NotFound} width="100%" height="500px"/>
                                        </div>
                                    :this.state.label == "Siap" && isSearch == 0?
                                        dataChurch.map((item, i) => {
                                            return (
                                                <Col>
                                                    {item.properties.disasterOccurs == "Siap" ?
                                                        <div className={'address-item '} onClick={this.handleId}>
                                                            <div className='wrap-address'>
                                                                <img className='icon' alt='icon' src={IconChurch}/>
                                                                <p className='name'>{item.properties.name}</p>
                                                                <p className='address'>{item.properties.address}</p>
                                                            </div>
                                                        </div>
                                                    :
                                                        null
                                                    }
                                                </Col>
                                            )
                                        })
                                    :this.state.label == "Siap" && isSearch == 1 && filterSearchChurch.length > 0?
                                        filterSearchChurch.map((item, i) => {
                                            return (
                                                <Col>
                                                    {item.properties.disasterOccurs == "Siap" ?
                                                        <div className={'address-item '} onClick={this.handleId}>
                                                            <div className='wrap-address'>
                                                                <img className='icon' alt='icon' src={IconChurch}/>
                                                                <p className='name'>{item.properties.name}</p>
                                                                <p className='address'>{item.properties.address}</p>
                                                            </div>
                                                        </div>
                                                    :
                                                        null
                                                    }
                                                </Col>
                                            )
                                        })
                                    :this.state.label == "Siap" && isSearch == 1 && filterSearchChurch.length == 0?
                                        <div>
                                            <img className='notFoundGrid' src={NotFound} width="100%" height="500px"/>
                                        </div>
                                    : this.state.label == "Sedikit siap" && isSearch==0? 
                                        dataChurch.map((item, i) => {
                                            return (
                                                <Col>
                                                    {item.properties.disasterOccurs == "Sedikit siap" ?
                                                        <div className={'address-item '} onClick={this.handleId}>
                                                            <div className='wrap-address'>
                                                                <img className='icon' alt='icon' src={IconChurch}/>
                                                                <p className='name'>{item.properties.name}</p>
                                                                <p className='address'>{item.properties.address}</p>
                                                            </div>
                                                        </div>
                                                    :
                                                        null
                                                    }
                                                </Col>
                                            )
                                        })
                                    :this.state.label == "Sedikit siap" && isSearch == 1 && filterSearchChurch.length > 0?
                                        filterSearchChurch.map((item, i) => {
                                            return (
                                                <Col>
                                                    {item.properties.disasterOccurs == "Sedikit siap" ?
                                                        <div className={'address-item '} onClick={this.handleId}>
                                                            <div className='wrap-address'>
                                                                <img className='icon' alt='icon' src={IconChurch}/>
                                                                <p className='name'>{item.properties.name}</p>
                                                                <p className='address'>{item.properties.address}</p>
                                                            </div>
                                                        </div>
                                                    :
                                                        null
                                                    }
                                                </Col>
                                            )
                                        })
                                    :this.state.label == "Sedikit siap" && isSearch == 1 && filterSearchChurch.length == 0?
                                        <div>
                                            <img className='notFoundGrid' src={NotFound} width="100%" height="500px"/>
                                        </div>
                                    :this.state.label == "Tidak siap" && isSearch == 0? 
                                        dataChurch.map((item, i) => {
                                            return (
                                                <Col>
                                                    {item.properties.disasterOccurs == "Tidak siap" ?
                                                        <div className={'address-item '} onClick={this.handleId}>
                                                            <div className='wrap-address'>
                                                                <img className='icon' alt='icon' src={IconChurch}/>
                                                                <p className='name'>{item.properties.name}</p>
                                                                <p className='address'>{item.properties.address}</p>
                                                            </div>
                                                        </div>
                                                    :
                                                        null
                                                    }
                                                </Col>
                                            )
                                        })
                                    :this.state.label == "Tidak siap" && isSearch == 1 && filterSearchChurch.length > 0?
                                        filterSearchChurch.map((item, i) => {
                                            return (
                                                <Col>
                                                    {item.properties.disasterOccurs == "Tidak siap" ?
                                                        <div className={'address-item '} onClick={this.handleId}>
                                                            <div className='wrap-address'>
                                                                <img className='icon' alt='icon' src={IconChurch}/>
                                                                <p className='name'>{item.properties.name}</p>
                                                                <p className='address'>{item.properties.address}</p>
                                                            </div>
                                                        </div>
                                                    :
                                                        null
                                                    }
                                                </Col>
                                            )
                                        })
                                    :this.state.label == "Tidak siap" && isSearch == 1 && filterSearchChurch.length == 0?
                                        <div>
                                            <img className='notFoundGrid' src={NotFound} width="100%" height="500px"/>
                                        </div>
                                    : this.state.label == "Semua" && isSearch == 0? 
                                        dataChurch.map((item, i) => {
                                            return (
                                                <Col>
                                                    <div className={'address-item '} onClick={this.handleId}>
                                                        <div className='wrap-address'>
                                                            <img className='icon' alt='icon' src={IconChurch}/>
                                                            <p className='name'>{item.properties.name}</p>
                                                            <p className='address'>{item.properties.address}</p>
                                                        </div>
                                                    </div>
                                                </Col>
                                            )
                                        })
                                    :this.state.label == "Semua" && isSearch == 1 && filterSearchChurch.length > 0?
                                        filterSearchChurch.map((item, i) => {
                                            return (
                                                <Col>
                                                    <div className={'address-item '} onClick={this.handleId}>
                                                        <div className='wrap-address'>
                                                            <img className='icon' alt='icon' src={IconChurch}/>
                                                            <p className='name'>{item.properties.name}</p>
                                                            <p className='address'>{item.properties.address}</p>
                                                        </div>
                                                    </div>
                                                </Col>
                                            )
                                        })
                                    :this.state.label == "Semua" && isSearch == 1 & filterSearchChurch.length == 0?
                                        <div>
                                            <img className='notFoundGrid' src={NotFound} width="100%" height="500px"/>
                                        </div>
                                    :
                                        null
                                    }
                                </Row>
                            </div>
                        </div>
                    :
                        <div className='wrap-map'>
                            <div className='content-side'>
                                <div className='left-side'>
                                    <div className='wrap-church-list custom-y-scrollbar-xs' >
                                        {this.state.filter == 0?
                                            <div>
                                                {filterSearchChurch.length == 0 && isSearch == 0?
                                                    dataChurch.map((item, i) => {
                                                        {this.total = filterSearchChurch.length}
                                                        return (
                                                            <div className={'item-list' +(dataChurchSelected === item._id ? ' active' : '')} onClick={() => this.props.onSelectMarker(item)}>
                                                                <div className='wrap-media'>
                                                                    <img className='logo' src={church} alt='gereja' />
                                                                </div>
                                                                <div className='wrap-content'>
                                                                    <p className='title'>{item.properties.name}</p>
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                : filterSearchChurch.length == 0 && isSearch == 1 ?
                                                    <div>
                                                        <img className='notFoundList' src={NotFound} width="20%" height="200px"/>
                                                    </div>
                                                : filterSearchChurch.length > 0 ? 
                                                    filterSearchChurch.map((item, i) => {
                                                        {this.total = filterSearchChurch.length}
                                                        return (
                                                            <div className={'item-list' +(dataChurchSelected === item._id ? ' active' : '')} onClick={() => this.props.onSelectMarker(item)}>
                                                                <div className='wrap-media'>
                                                                    <img className='logo' src={church} alt='gereja' />
                                                                </div>
                                                                <div className='wrap-content'>
                                                                    <p className='title'>{item.properties.name}</p>
                                                                </div>
                                                            </div>
                                                        )   
                                                    })  
                                                :
                                                null
                                                }
                                            </div>
                                        :
                                            <div>
                                                {this.state.label == "Sangat siap"?
                                                    <div>
                                                        {filterSearchChurch.length == 0 && isSearch == 0?
                                                            dataChurch.map((item, i) => {
                                                                {item.properties.disasterOccurs == 'Sangat siap'?
                                                                    this.total = filterSearchChurch.length
                                                                :
                                                                    null
                                                                }
                                                                return (
                                                                    <div>
                                                                        {item.properties.disasterOccurs == "Sangat siap" ?
                                                                            <div className='item-list' onClick={() => this.props.onSelectMarker(item)}>
                                                                                <div>
                                                                                    <div className='wrap-media'>
                                                                                        <img className='logo' src={church} alt='gereja' />
                                                                                    </div>
                                                                                    <div className='wrap-content'>
                                                                                        <p className='title'>{item.properties.name}</p>
                                                                                    </div>
                                                                                </div> 
                                                                            </div>
                                                                        :
                                                                            null
                                                                        } 
                                                                    </div> 
                                                                )
                                                            })
                                                        : filterSearchChurch.length == 0 && isSearch == 1 ?
                                                            <div>
                                                                <img className='notFoundList' src={NotFound} width="20%" height="200px"/>
                                                            </div>
                                                        : filterSearchChurch.length > 0 ? 
                                                            filterSearchChurch.map((item, i) => {
                                                                {item.properties.disasterOccurs == 'Sangat siap'?
                                                                    <p>this.total = filterSearchChurch.length</p>
                                                                :
                                                                    null
                                                                }
                                                                return (
                                                                    <div>
                                                                        {item.properties.disasterOccurs == "Sangat siap" ?
                                                                            <div className='item-list' onClick={() => this.props.onSelectMarker(item)}>
                                                                                <div>
                                                                                    <div className='wrap-media'>
                                                                                        <img className='logo' src={church} alt='gereja' />
                                                                                    </div>
                                                                                    <div className='wrap-content'>
                                                                                        <p className='title'>{item.properties.name}</p>
                                                                                    </div>
                                                                                </div> 
                                                                            </div>
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
                                                :this.state.label == "Siap"?
                                                    <div>
                                                        {filterSearchChurch.length == 0 && isSearch == 0?
                                                            dataChurch.map((item, i) => {
                                                                {item.properties.disasterOccurs == 'Siap'?
                                                                    this.total = filterSearchChurch.length
                                                                :
                                                                    null
                                                                }
                                                                return (
                                                                    <div>
                                                                        {item.properties.disasterOccurs == "Siap" ?
                                                                            <div className='item-list' onClick={() => this.props.onSelectMarker(item)}>
                                                                                <div>
                                                                                    <div className='wrap-media'>
                                                                                        <img className='logo' src={church} alt='gereja' />
                                                                                    </div>
                                                                                    <div className='wrap-content'>
                                                                                        <p className='title'>{item.properties.name}</p>
                                                                                    </div>
                                                                                </div> 
                                                                            </div>
                                                                        :
                                                                            null
                                                                        } 
                                                                    </div> 
                                                                )
                                                            })
                                                        : filterSearchChurch.length == 0 && isSearch == 1 ?
                                                            <div>
                                                                <img className='notFoundList' src={NotFound} width="20%" height="200px"/>
                                                            </div>
                                                        : filterSearchChurch.length > 0 ? 
                                                            filterSearchChurch.map((item, i) => {
                                                                {item.properties.disasterOccurs == 'Siap'?
                                                                    this.total = filterSearchChurch.length
                                                                :
                                                                    null
                                                                }
                                                                return (
                                                                    <div>
                                                                        {item.properties.disasterOccurs == "Siap" ?
                                                                            <div className='item-list' onClick={() => this.props.onSelectMarker(item)}>
                                                                                <div>
                                                                                    <div className='wrap-media'>
                                                                                        <img className='logo' src={church} alt='gereja' />
                                                                                    </div>
                                                                                    <div className='wrap-content'>
                                                                                        <p className='title'>{item.properties.name}</p>
                                                                                    </div>
                                                                                </div> 
                                                                            </div>
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
                                                :this.state.label == "Sedikit siap"?
                                                    <div>
                                                        {filterSearchChurch.length == 0 && isSearch == 0?
                                                            dataChurch.map((item, i) => {
                                                                {item.properties.disasterOccurs == 'Sedikit siap'?
                                                                    this.total = filterSearchChurch.length
                                                                :
                                                                    null
                                                                }
                                                                return (
                                                                    <div>
                                                                        {item.properties.disasterOccurs == "Sedikit siap" ?
                                                                            <div className='item-list' onClick={() => this.props.onSelectMarker(item)}>
                                                                                <div>
                                                                                    <div className='wrap-media'>
                                                                                        <img className='logo' src={church} alt='gereja' />
                                                                                    </div>
                                                                                    <div className='wrap-content'>
                                                                                        <p className='title'>{item.properties.name}</p>
                                                                                    </div>
                                                                                </div> 
                                                                            </div>
                                                                        :
                                                                            null
                                                                        } 
                                                                    </div> 
                                                                )
                                                            })
                                                        : filterSearchChurch.length == 0 && isSearch == 1 ?
                                                            <div>
                                                                <img className='notFoundList' src={NotFound} width="20%" height="200px"/>
                                                            </div>
                                                        : filterSearchChurch.length > 0 ? 
                                                            filterSearchChurch.map((item, i) => {
                                                                {item.properties.disasterOccurs == 'Sedikit siap'?
                                                                    this.total = filterSearchChurch.length
                                                                :
                                                                    null
                                                                }
                                                                return (
                                                                    <div>
                                                                        {item.properties.disasterOccurs == "Sedikit siap" ?
                                                                            <div className='item-list' onClick={() => this.props.onSelectMarker(item)}>
                                                                                <div>
                                                                                    <div className='wrap-media'>
                                                                                        <img className='logo' src={church} alt='gereja' />
                                                                                    </div>
                                                                                    <div className='wrap-content'>
                                                                                        <p className='title'>{item.properties.name}</p>
                                                                                    </div>
                                                                                </div> 
                                                                            </div>
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
                                                :this.state.label == "Tidak siap"?
                                                    <div>
                                                        {filterSearchChurch.length == 0 && isSearch == 0?
                                                            dataChurch.map((item, i) => {
                                                                {item.properties.disasterOccurs == 'Tidak siap'?
                                                                    this.total = filterSearchChurch.length
                                                                :
                                                                    null
                                                                }
                                                                return (
                                                                    <div>
                                                                        {item.properties.disasterOccurs == "Tidak siap" ?
                                                                            <div className='item-list' onClick={() => this.props.onSelectMarker(item)}>
                                                                                <div>
                                                                                    <div className='wrap-media'>
                                                                                        <img className='logo' src={church} alt='gereja' />
                                                                                    </div>
                                                                                    <div className='wrap-content'>
                                                                                        <p className='title'>{item.properties.name}</p>
                                                                                    </div>
                                                                                </div> 
                                                                            </div>
                                                                        :
                                                                            null
                                                                        } 
                                                                    </div> 
                                                                )
                                                            })
                                                        : filterSearchChurch.length == 0 && isSearch == 1 ?
                                                            <div>
                                                                <img className='notFoundList' src={NotFound} width="20%" height="200px"/>
                                                            </div>
                                                        : filterSearchChurch.length > 0 ? 
                                                            filterSearchChurch.map((item, i) => {
                                                                {item.properties.disasterOccurs == 'Tidak siap'?
                                                                    this.total = filterSearchChurch.length
                                                                :
                                                                    null
                                                                }
                                                                return (
                                                                    <div>
                                                                        {item.properties.disasterOccurs == "Tidak siap" ?
                                                                            <div className='item-list' onClick={() => this.props.onSelectMarker(item)}>
                                                                                <div>
                                                                                    <div className='wrap-media'>
                                                                                        <img className='logo' src={church} alt='gereja' />
                                                                                    </div>
                                                                                    <div className='wrap-content'>
                                                                                        <p className='title'>{item.properties.name}</p>
                                                                                    </div>
                                                                                </div> 
                                                                            </div>
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
                                                :this.state.label == "Semua"?
                                                    <div>
                                                        {filterSearchChurch.length == 0 && isSearch == 0?
                                                            dataChurch.map((item, i) => {
                                                                this.total = filterSearchChurch.length    
                                                                return (
                                                                    <div className={'item-list' +(dataChurchSelected === item._id ? ' active' : '')} onClick={() => this.props.onSelectMarker(item)}>
                                                                        <div className='wrap-media'>
                                                                            <img className='logo' src={church} alt='gereja' />
                                                                        </div>
                                                                        <div className='wrap-content'>
                                                                            <p className='title'>{item.properties.name}</p>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            })
                                                        : filterSearchChurch.length == 0 && isSearch == 1 ?
                                                            <div>
                                                                <img className='notFoundList' src={NotFound} width="20%" height="200px"/>
                                                            </div>
                                                        : filterSearchChurch.length > 0 ? 
                                                            filterSearchChurch.map((item, i) => {
                                                                this.total = filterSearchChurch.length   
                                                                return (
                                                                    <div className={'item-list' +(dataChurchSelected === item._id ? ' active' : '')} onClick={() => this.props.onSelectMarker(item)}>
                                                                        <div className='wrap-media'>
                                                                            <img className='logo' src={church} alt='gereja' />
                                                                        </div>
                                                                        <div className='wrap-content'>
                                                                            <p className='title'>{item.properties.name}</p>
                                                                        </div>
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
                                            </div>
                                        }
                                    </div>
                                </div>
                                <div className='right-side'>

                                    {this.state.label == "Semua"?
                                        <GoogleMaps
                                            zoom={googleMapZoom}
                                            defaultCenter={currentLocation}
                                            positionMarker={currentLocation}
                                            dataMarker={dataChurch}
                                            dataSelectedMarker={dataSelectedMarker}
                                            isMarkerShown
                                            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                                            loadingElement={<div style={{ height: `100%` }} />}
                                            containerElement={<div className='wrap-google-maps' />}
                                            mapElement={<div className='google-maps' />}
                                            onSelect={(value) => this.props.onSelectMarker(value)}
                                            onRedirect={() => this.props.onRedirect()}
                                            onChangeZoom={(value) => this.props.onChangeZoom(value)}
                                            onResetMyLocation={(value) => this.props.onResetMyLocation(value)}
                                            churchId = {id}
                                            filter = {filter}
                                            label = {label}
                                            total = {total}
                                            filterSearchChurch={filterSearchChurch}
                                        />
                                    :this.state.label == "Sangat siap"?
                                        <GoogleMaps2
                                            zoom={googleMapZoom}
                                            defaultCenter={currentLocation}
                                            positionMarker={currentLocation}
                                            dataMarker={dataChurch}
                                            dataSelectedMarker={dataSelectedMarker}
                                            isMarkerShown
                                            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                                            loadingElement={<div style={{ height: `100%` }} />}
                                            containerElement={<div className='wrap-google-maps' />}
                                            mapElement={<div className='google-maps' />}
                                            onSelect={(value) => this.props.onSelectMarker(value)}
                                            onRedirect={() => this.props.onRedirect()}
                                            onChangeZoom={(value) => this.props.onChangeZoom(value)}
                                            onResetMyLocation={(value) => this.props.onResetMyLocation(value)}
                                            churchId = {id}
                                            filter = {filter}
                                            label = {label}                                            
                                        />
                                    :this.state.label == "Siap"?
                                        <GoogleMaps3
                                            zoom={googleMapZoom}
                                            defaultCenter={currentLocation}
                                            positionMarker={currentLocation}
                                            dataMarker={dataChurch}
                                            dataSelectedMarker={dataSelectedMarker}
                                            isMarkerShown
                                            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                                            loadingElement={<div style={{ height: `100%` }} />}
                                            containerElement={<div className='wrap-google-maps' />}
                                            mapElement={<div className='google-maps' />}
                                            onSelect={(value) => this.props.onSelectMarker(value)}
                                            onRedirect={() => this.props.onRedirect()}
                                            onChangeZoom={(value) => this.props.onChangeZoom(value)}
                                            onResetMyLocation={(value) => this.props.onResetMyLocation(value)}
                                            churchId = {id}
                                            filter = {filter}
                                            label = {label}
                                        />
                                    :this.state.label == "Sedikit siap"?
                                        <GoogleMaps4
                                            zoom={googleMapZoom}
                                            defaultCenter={currentLocation}
                                            positionMarker={currentLocation}
                                            dataMarker={dataChurch}
                                            dataSelectedMarker={dataSelectedMarker}
                                            isMarkerShown
                                            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                                            loadingElement={<div style={{ height: `100%` }} />}
                                            containerElement={<div className='wrap-google-maps' />}
                                            mapElement={<div className='google-maps' />}
                                            onSelect={(value) => this.props.onSelectMarker(value)}
                                            onRedirect={() => this.props.onRedirect()}
                                            onChangeZoom={(value) => this.props.onChangeZoom(value)}
                                            onResetMyLocation={(value) => this.props.onResetMyLocation(value)}
                                            churchId = {id}
                                            filter = {filter}
                                            label = {label}
                                        />
                                    :this.state.label == "Tidak siap"?
                                        <GoogleMaps5
                                            zoom={googleMapZoom}
                                            defaultCenter={currentLocation}
                                            positionMarker={currentLocation}
                                            dataMarker={dataChurch}
                                            dataSelectedMarker={dataSelectedMarker}
                                            isMarkerShown
                                            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                                            loadingElement={<div style={{ height: `100%` }} />}
                                            containerElement={<div className='wrap-google-maps' />}
                                            mapElement={<div className='google-maps' />}
                                            onSelect={(value) => this.props.onSelectMarker(value)}
                                            onRedirect={() => this.props.onRedirect()}
                                            onChangeZoom={(value) => this.props.onChangeZoom(value)}
                                            onResetMyLocation={(value) => this.props.onResetMyLocation(value)}
                                            churchId = {id}
                                            filter = {filter}
                                            label = {label}
                                        />
                                    :
                                        null
                                    }
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
          </div>
        )
    }
}