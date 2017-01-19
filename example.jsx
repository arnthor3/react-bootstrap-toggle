import React from 'react';
import { render } from 'react-dom';
import Toggle from './src/react-bootstrap-toggle.jsx';

class App extends React.Component {
  constructor() {
    super();
    this.onClick = this.onClick.bind(this);
    this.state = { active: false, yes : <h1>Yes</h1> };
  }

  onClick() {
    this.setState({ active: !this.state.active, yes: <h2>Yss</h2> });
  }

  render() {
    const style = {
      margin: '20px 20px',
    }
    return (
      <div style={style}>
        <Toggle
          active={this.state.active}
          on={this.state.yes}
          off="qwerqrwe12341234"
          onClick={this.onClick}
        />
      </div>
    );
  }
}

render(<App />, document.getElementById('app'));
