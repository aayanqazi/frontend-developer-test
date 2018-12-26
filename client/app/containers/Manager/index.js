import React from 'react';
import { connect } from 'react-redux';
import { listType5 } from '../../styles/manager.scss';
import OrderMiddleware from '../../middleware/order';
import Modal from 'react-responsive-modal';

class Manager extends React.Component {
    state = {
        open: false,
        biker: [],
        selectedData: [],
        biker_id: ''
    };

    componentDidMount() {
        fetch('http://localhost:3002/bikers')
            .then(arr => arr.json())
            .then(data => {
                this.setState({
                    biker: data.biker
                });
            });
        this.props.getOrders();
    }
    onOpenModal = (data) => {
        const arr = [data];
        this.setState({ open: true, selectedData: arr, biker_id: '' });
    };

    onCloseModal = () => {
        this.setState({ open: false });
    };

    changeStatus = () => {
        const obj = {
            order_id: this.state.selectedData[0].order_id,
            biker_id: this.state.biker_id
        };
        if(this.state.selectedData[0].status === 'WAITING') {
            obj.status = 'ASSIGNED';
        }
        fetch('http://localhost:3002/parcels', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(obj)
        })
            .then(arr => arr.json())
            .then(() => {
                this.onCloseModal();
                this.props.getOrders();
            });
    }

    render() {
        const { open } = this.state;
        console.log(this.state);
        if (this.props.orders) {
            return (
                <div>
                    <h1 style={{ textAlign: 'center' }}>
                        Welcome Manager
                    </h1>
                    <h4 style={{ textAlign: 'center' }}>
                        Order List
                    </h4>
                    <Modal open={open} onClose={this.onCloseModal} center>
                        <h2>Please Assign Order of Biker</h2>
                        <div>
                            <span>ASSIGN: </span>
                            <select onChange={(event) => this.setState({
                                biker_id: event.target.value
                            })}>
                                {this.state.biker.map((val, ind) => {
                                    return (
                                        <option key={ind} value={val.bikerId} selected={this.state.selectedData.length > 0 ? (this.state.selectedData[0].assignee === val.bikerId) : false}>
                                            {val.username}
                                        </option>
                                    );
                                })}
                            </select>
                            <button onClick={() => this.changeStatus()} style={{ marginLeft: '10px' }}>
                                SAVE
                            </button>
                        </div>
                    </Modal>
                    <div className={listType5}>
                        <ol>
                            {this.props.orders.order && this.props.orders.order.map((data, index) => {
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
                                            {data.status !== 'WAITING' && <p> Biker ID: {data.assignee} </p>
                                            }
                                        </a></li>
                                );
                            })}
                        </ol>
                    </div>
                </div>
            );
        }
        return <h1>Something went wrong</h1>;
    }
}

const mapStateToProps = (state) => {
    return {
        orders: state.order
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getOrders: () => dispatch(OrderMiddleware.order())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Manager);
