import React, { Fragment } from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

const Education = props => {
    const educations = props.education.map(edu => (
        <tr key={edu._id}>
            <td>{edu.school}</td>
            <td className='hide-sm'>{edu.degree}</td>
            <td>
                <Moment format='YYYY/MM/DD'>{edu.from}</Moment> -{' '}
                {edu.to === null ? (
                    'Now'
                ) : (
                    <Moment format='YYYY/MM/DD'>{edu.to}</Moment>
                )}
            </td>
            <td>
                <button
                    onClick={() => props.deleteEducation(edu._id)}
                    className='btn btn-danger'
                >
                    Delete
                </button>
            </td>
        </tr>
    ));

    return (
        <Fragment>
            <h2 className='my-2'>Education</h2>
            <table className='table'>
                <thead>
                    <tr>
                        <th>School</th>
                        <th className='hide-sm'>Degree</th>
                        <th className='hide-sm'>Years</th>
                        <th />
                    </tr>
                </thead>
                <tbody>{educations}</tbody>
            </table>
        </Fragment>
    );
};

Education.propTypes = {
    education: PropTypes.array.isRequired,
    deleteEducation: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => {
    return {
        deleteEducation: id => dispatch(actions.deleteEducation(id))
    };
};

export default connect(
    null,
    mapDispatchToProps
)(Education);
