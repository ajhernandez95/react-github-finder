import React, { Fragment, Component } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../Spinner';
import Repo from '../Repo';

export class User extends Component {
  componentDidMount() {
    this.props.getUser(this.props.match.params.name);
  }
  render() {
    const {
      login,
      name,
      avatar_url,
      html_url,
      blog,
      company,
      location,
      bio,
      public_repos,
      public_gists,
      hireable,
      followers,
      following
    } = this.props.user;
    const { loading, repos } = this.props;
    return (
      <Fragment>
        {' '}
        {loading ? (
          <Spinner />
        ) : (
          <Fragment>
            <Link to='/' className='btn btn-info btn-sm'>
              Back To Search
            </Link>{' '}
            Hireable:{' '}
            {hireable ? (
              <i className='fas fa-check text-success' />
            ) : (
              <i className='fas fa-times-circle text-danger' />
            )}
            <div className='card'>
              <div className='grid-2'>
                <div className='all-center'>
                  <img
                    src={avatar_url}
                    alt='profile'
                    className='round-img'
                    style={{ width: '150px' }}
                  />
                  <h4>{name}</h4>
                  <p>Location: {location}</p>
                </div>
                <div>
                  {bio && (
                    <Fragment>
                      <h3>Bio</h3>
                      <p>{bio}</p>
                    </Fragment>
                  )}
                  <a href={html_url} className='btn btn-dark my-2'>
                    Visit Github Page
                  </a>
                  <ul>
                    <li>Username: {login}</li>
                    <li>
                      {company && <Fragment>Company: {company}</Fragment>}
                    </li>
                    <li>{blog && <Fragment>Website: {blog}</Fragment>}</li>
                  </ul>
                </div>
              </div>
            </div>
            <div
              className='card all-center'
              style={{ display: 'flex', flexDirection: 'row' }}
            >
              <span className='badge badge-success'>
                Public Repos: {public_repos}
              </span>
              <span className='badge badge-danger'>
                Public Gist: {public_gists}
              </span>
              <span className='badge badge-success'>
                Followers: {followers}
              </span>
              <span className='badge badge-primary'>
                Following: {following}
              </span>
            </div>
            {repos.map(repo => (
              <Repo
                forks={repo.forks_count}
                watchers={repo.watchers_count}
                name={repo.name}
                url={repo.html_url}
                key={repo.id}
              />
            ))}
          </Fragment>
        )}
      </Fragment>
    );
  }
}

export default User;
