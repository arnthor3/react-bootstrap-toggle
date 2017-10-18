import React from 'react';
import { render } from 'react-dom';
import Toggle from './src/react-bootstrap-toggle';
import { Bootstrap2Toggle } from './src/index';

class App extends React.Component {
  constructor() {
    super();
    this.onClick = this.onClick.bind(this);
    this.state = { active: false, yes: <span>Yes</span> };
  }

  onClick(state, evt, node) {
    this.setState({ active: !this.state.active, yes: <span>Yss</span> });
  }

  render() {
    const style = {
      margin: '20px 20px',
    };

    return (
      <div style={style}>
        <Toggle
          data-attr-best="Take That"
          active={this.state.active}
          on={this.state.yes}
          off="qwerqrwe12341234"
          handlestyle="warning"
          onClick={this.onClick}
          size="xs"
        />
      </div>
    );
  }
}

render(<App />, document.getElementById('app'));
