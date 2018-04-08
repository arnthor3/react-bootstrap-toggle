import React, { Component } from 'react';
import { render } from 'react-dom';
import Toggle from '../src/react-bootstrap-toggle';
import './onClick.css';

// The on prop takes in either a string or a react element
// so we can put whatever in here..
const AwesomeOnNodeWithCoolPetMDIcon = () => (
  <span><i className="material-icons">pets</i>Pets</span>
);

const OffNodeWithNoCoolMDIcons = () => (
  <span>No pets</span>
);

class OnClickToggleComponent extends Component {
  constructor() {
    super();
    this.state = { active: true };
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    // Toggle the state active
    this.setState({ active: !this.state.active });
  }

  render() {
    return (
      <div className="container">
        <div className="row" style={{ marginTop: '5em' }}>
          <div className="col-lg-3" style={{ display: 'none' }}>
            <Toggle
              width="100%"
              recalculateOnResize
              onClick={this.onClick}
              active={this.state.active}
              size="lg"
              on={<AwesomeOnNodeWithCoolPetMDIcon />}
              off={<OffNodeWithNoCoolMDIcons />}
              onClassName="success"
              offClassName="my_custom_off"
              handlestyle="default"
            />
          </div>
          <div className="col-lg-9">
            <p>The State of the button is {this.state.active ? 'active' : 'not active'}</p>
          </div>
        </div>
      </div>
    );
  }
}

render(
  <OnClickToggleComponent />,
  document.getElementById('app'),
);
