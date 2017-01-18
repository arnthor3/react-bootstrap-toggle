import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import sinon from 'sinon';
import Toggle from '../src/react-bootstrap-toggle';

describe('<Toggle />', () => {
  it('should render without errors', () => {
    const wrapper = mount(
      <Toggle
        on={<p>Yes</p>}
        off={<p>No</p>}
        size="small"
      />
    );
  });
  it('should render plain text', () => {
    const wrapper = mount(
      <Toggle
        on="This is a really long text"
        off={<p>No</p>}
        size="mini"
      />
    );
    wrapper.setProps({ active: false, off: 'yes'});
  });
  it('should handle click events', () => {
    const wrapper = mount(
      <Toggle
        on={`no no no <br/> no <h1>NOOO!!!</h1>`}
        off={<p>No</p>}
        size="large"
      />
    );
  });
  it('should handle click events', () => {
    const wrapper = mount(
      <Toggle
        on={`no no no <br/> no <h1>NOOO!!!</h1>`}
        off={<p>No</p>}
        size="large"
        active={false}
      />
    );
  });
});