import React from 'react';
import { render } from 'react-dom';
import Toggle from './src/react-bootstrap-toggle';
import { Bootstrap2Toggle } from './src/index';

class App extends React.Component {
  constructor() {
    super();
    this.onClick = this.onClick.bind(this);
    this.state = { active: false, yes: <h1>Yes</h1> };
  }

  onClick() {
    this.setState({ active: !this.state.active, yes: <h2>Yss</h2> });
  }

  render() {
    const style = {
      margin: '20px 20px',
    };

    return (
      <div style={style}>
        <Bootstrap2Toggle
          active={this.state.active}
          on={this.state.yes}
          off="qwerqrwe12341234"
          onClick={this.onClick}
          size="small"
        />
      </div>
    );
  }
}

render(<App />, document.getElementById('app'));
