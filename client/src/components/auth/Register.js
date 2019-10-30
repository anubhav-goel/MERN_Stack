import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../../store/actions/index';

const Register = props => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const { name, email, password, password2 } = formData;

    const onChange = e =>
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    const onSubmit = e => {
        e.preventDefault();
        if (password !== password2) {
            props.setAlert('Passwords do not match', 'danger');
        } else {
            props.register({ name, email, password });
        }
    };

    if (props.isAuthenticated) {
        return <Redirect to='/dashboard' />;
    }
    return (
        <Fragment>
            <section className='container'>
                <h1 className='large text-primary'>Sign Up</h1>
                <p className='lead'>
                    <i className='fas fa-user' /> Create Your Account
                </p>
                <form
                    className='form'
                    action='create-profile.html'
                    onSubmit={e => onSubmit(e)}
                >
                    <div className='form-group'>
                        <input
                            type='text'
                            placeholder='Name'
                            name='name'
                            value={name}
                            onChange={e => onChange(e)}
                            // required
                        />
                    </div>
                    <div className='form-group'>
                        <input
                            type='email'
                            placeholder='Email Address'
                            name='email'
                            value={email}
                            onChange={e => onChange(e)}
                            // required
                        />
                        <small className='form-text'>
                            This site uses Gravatar so if you want a profile
                            image, use a Gravatar email
                        </small>
                    </div>
                    <div className='form-group'>
                        <input
                            type='password'
                            placeholder='Password'
                            name='password'
                            // minLength='6'
                            value={password}
                            onChange={e => onChange(e)}
                        />
                    </div>
                    <div className='form-group'>
                        <input
                            type='password'
                            placeholder='Confirm Password'
                            name='password2'
                            // minLength='6'
                            value={password2}
                            onChange={e => onChange(e)}
                        />
                    </div>
                    <input
                        type='submit'
                        className='btn btn-primary'
                        value='Register'
                    />
                </form>
                <p className='my-1'>
                    Already have an account? <Link to='/login'>Sign In</Link>
                </p>
            </section>
        </Fragment>
    );
};

const mapDispatchToProps = dispatch => {
    return {
        setAlert: (msg, alertType, timeout) =>
            dispatch(actions.setAlert(msg, alertType, timeout)),
        register: userDetails => dispatch(actions.register(userDetails))
    };
};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated
    };
};

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Register);