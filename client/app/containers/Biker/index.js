import React from 'react';
import { connect } from 'react-redux';

class Biker extends React.Component {
    render() {
        return (
            <div>
                Biker
            </div>
        );
    }
}

const mapStateToProps = () => {
    return {
    };
};

const mapDispatchToProps = () => {
    return {
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Biker);
