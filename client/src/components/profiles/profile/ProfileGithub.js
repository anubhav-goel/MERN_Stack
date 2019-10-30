import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import Spinner from '../../layout/Spinner';

const ProfileGithub = props => {
    useEffect(() => {
        props.getGithubRepos(props.username);
    }, []);

    return (
        <div className='profile-github'>
            <h2 className='text-primary my-1'>Github Repos</h2>
            {props.repos === null ? (
                <Spinner />
            ) : (
                props.repos.map(repo => {
                    return (
                        <div key={repo._id} className='repo bg-white p-1 my-1'>
                            <div>
                                <h4>
                                    <a
                                        href={repo.html_url}
                                        target='_blank'
                                        rel='noopener noreferrer'
                                    >
                                        {repo.name}
                                    </a>
                                </h4>
                                <p>{repo.description}</p>
                            </div>
                            <div>
                                <ul>
                                    <li className='badge badge-primary'>
                                        Stars:{repo.stargazers_count}
                                    </li>
                                    <li className='badge badge-dark'>
                                        Watchers:{repo.watchers_count}
                                    </li>
                                    <li className='badge badge-white'>
                                        Forks:{repo.forks_count}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    );
                })
            )}
        </div>
    );
};

ProfileGithub.propTypes = {
    getGithubRepos: PropTypes.func.isRequired,
    repos: PropTypes.array.isRequired,
    username: PropTypes.string.isRequired
};

const mapStateToProps = state => {
    return {
        repos: state.profile.repos
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getGithubRepos: username => dispatch(actions.getGithubRepos(username))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfileGithub);