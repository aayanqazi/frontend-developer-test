import React from 'react';
import { connect } from 'react-redux';
import BikerMiddleware from '../../middleware/biker';
import { listType5 } from '../../styles/manager.scss';
import Modal from 'react-responsive-modal';
import axios from 'axios';

class Biker extends React.Component {
    state = {
        open: false,
        biker: [],
        selectedData: [],
        biker_id: ''
    };
    componentDidMount() {
        const credentials = JSON.parse(localStorage.getItem('myData'));
        if (credentials) {
            this.props.getData(credentials.data);
        }
    }
    onOpenModal = (data) => {
        const arr = [data];
        this.setState({ open: true, selectedData: arr, biker_id: '' });
    };

    onCloseModal = () => {
        this.setState({ open: false });
    };
    onChangeStatus = (event) =>{
        const selected = this.state.selectedData;
        selected[0].status = event.target.value;
        this.setState({
            selectedData: selected
        });
    }
    changeStatus = () => {
        const obj = {...this.state.selectedData[0], timeStamp: new Date()};
        axios.put('http://localhost:3002/myData', obj)
            .then(() => {
                this.onCloseModal();
            })
            .catch(err => alert(err));
    }
    render() {
        const { open } = this.state;
        return (
            <div>
                <h1 style={{ textAlign: 'center' }}>Your Assigned Parcels</h1>
                <div style={{ textAlign: 'center' }}>
                    <button onClick={() => {localStorage.clear(); this.props.history.push('/');}}>
                        LogOut
                    </button>
                </div>
                <Modal open={open} onClose={this.onCloseModal} center>
                    <div>
                        <h2>Change Status of Order</h2>
                        <span style={{marginRight: '10px'}}>Status</span>
                        <select value={this.state.selectedData.length ? this.state.selectedData[0].status : ''} onChange={(event) => this.onChangeStatus(event)}>
                        <option disabled>
                                Select Status
                            </option>
                            <option value="PICKED_UP">
                                Picked Up
                            </option>
                            <option value="DELIVERED">
                                DELIVERED
                            </option>
                        </select>
                        <button onClick={() => this.changeStatus()} style={{ marginLeft: '10px' }}>
                                SAVE
                            </button>
                    </div>
                </Modal>
                <div className={listType5}>
                    <ol>
                        {this.props.bikerData.data && this.props.bikerData.data.map((data, index) => {
                            return (
                                <li key={index}>
                                    <a href="#" onClick={() => this.onOpenModal(data)}>
                                        <p>
                                            Order: {index + 1}
                                        </p>
                                        <p>
                                            Origin: {data.origin}
                                        </p>
                                        <p>
                                            Distination: {data.distination}
                                        </p>
                                        <p>
                                            Status: {data.status}
                                        </p>
                                    </a></li>
                            );
                        })}
                    </ol>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        bikerData: state.biker
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getData: (credentials) => dispatch(BikerMiddleware.getData(credentials))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Biker);
