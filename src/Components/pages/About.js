import React, { Fragment } from 'react';

const About = () => {
  return (
    <Fragment>
      <h1>Hello World</h1>
      <p className="lead">
        This is my first React application with client side routing using
        create-react-app and react-router-dom.
        <br />I dont have much to say here...this page is mostly for showing how
        react-router-dom keeps the state updated rather than clearing state on
        page change.
      </p>
    </Fragment>
  );
};

export default About;
