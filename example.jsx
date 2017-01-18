import React from 'react';
import { render } from 'react-dom';
import Toggle from './src/react-bootstrap-toggle.js';

class App extends React.Component {
  constructor() {
    super();
    this.onClick = this.onClick.bind(this);
    this.state = { active: false };
  }

  onClick() {
    this.setState({ active: !this.state.active });
  }

  render() {
    return (
      <div>
        <Toggle
          active={this.state.active}
          on={<p>Yes</p>}
          off={<p>No</p>}
          onChange={() => {
            this.onClick();
          }}
        />
      </div>
    );
  }
}

render(<App />, document.getElementById('app'));
