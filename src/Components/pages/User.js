import React, { Fragment, useEffect, useContext } from 'react';
import GithubContext from '../../context/github/githubContext';
import { Link } from 'react-router-dom';
import Repo from '../Repo';
import Spinner from '../Spinner';

const User = ({ loading, match }) => {
  const githubContext = useContext(GithubContext);
  useEffect(() => {
    githubContext.getUser(match.params.name);
    githubContext.getRepos(match.params.name);
    // eslint-disable-next-line
  }, []);

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
  } = githubContext.user;

  return githubContext.loading ? (
    <Spinner />
  ) : (
    <div>
      <Link to="/" className="btn btn-info btn-sm">
        Back To Search
      </Link>{' '}
      Hireable:{' '}
      {hireable ? (
        <i className="fas fa-check text-success" />
      ) : (
        <i className="fas fa-times-circle text-danger" />
      )}
      <div className="card">
        <div className="grid-2">
          <div className="all-center">
            <img
              src={avatar_url}
              alt="profile"
              className="round-img"
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
            <a href={html_url} className="btn btn-dark my-2">
              Visit Github Page
            </a>
            <ul>
              <li>Username: {login}</li>
              <li>{company && <Fragment>Company: {company}</Fragment>}</li>
              <li>{blog && <Fragment>Website: {blog}</Fragment>}</li>
            </ul>
          </div>
        </div>
      </div>
      <div
        className="card all-center"
        style={{ display: 'flex', flexDirection: 'row' }}
      >
        <span className="badge badge-success">
          Public Repos: {public_repos}
        </span>
        <span className="badge badge-danger">Public Gist: {public_gists}</span>
        <span className="badge badge-success">Followers: {followers}</span>
        <span className="badge badge-primary">Following: {following}</span>
      </div>
      {githubContext.userRepos.map(repo => (
        <Repo
          forks={repo.forks_count}
          watchers={repo.watchers_count}
          name={repo.name}
          url={repo.html_url}
        />
      ))}
    </div>
  );
};

export default User;
