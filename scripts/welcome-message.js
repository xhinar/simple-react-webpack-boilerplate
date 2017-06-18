import React from 'react';
import PropTypes from 'prop-types';

import { Button } from 'antd';

class WelcomeMessage extends React.Component {
  constructor() {
    super();

    this.state = {
      clicks: 0
    };
  }

  render() {
    const { message } = this.props;
    const { clicks } = this.state;

    return (
      <div>
        <h1>{message}</h1>
        <Button
          type="primary"
          onClick={() => {
            this.setState({
              clicks: clicks + 1
            });
          }}>Click me</Button>
        <h2>{clicks} click{clicks == 1 ? '' : 's'}</h2>
      </div>
    );
  }
}

WelcomeMessage.propTypes = {
  message: PropTypes.string.isRequired
};


export default WelcomeMessage;
