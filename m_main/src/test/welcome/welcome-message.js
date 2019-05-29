import React from 'react';
import PropTypes from 'prop-types';

import { Button, Icon } from 'antd';
import styles from './welcome-message.less';

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
        <h1 className={styles.font_red_30px}>{message}</h1>
        <Button
          type="primary"
          icon="check"
          onClick={() => {
            this.setState({
              clicks: clicks + 1
            });
          }}>
            Click me
        </Button>
        <Icon type="paycircle" />
        <h2>{clicks} click{clicks == 1 ? '' : 's'}</h2>
      </div>
    );
  }
}

WelcomeMessage.propTypes = {
  message: PropTypes.string.isRequired
};


export default WelcomeMessage;
