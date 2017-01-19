import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import Toggle from '../src/react-bootstrap-toggle';
import * as util from '../src/utils';

describe('<Toggle />', () => {


  it('should know margin of error is one', () => {
    expect(util.compareWithMarginOfError(99, 100)).toBe(true);
    expect(util.compareWithMarginOfError(100, 101)).toBe(true);
    expect(util.compareWithMarginOfError(96, 100)).toBe(false);
  });

  it('should render without errors', () => {
    let spy = sinon.stub(util, 'compareWithMarginOfError').returns(true);
    const wrapper = mount(
      <Toggle
        on={<p>Yes</p>}
        off={<p>No</p>}
        size="small"
      />
    );
    util.compareWithMarginOfError.restore();
  });
  it('should render plain text', () => {
    let spy = sinon.stub(util, 'compareWithMarginOfError').returns(true);
    document.createRange = () => {
      return {
        getBoundingClientRect() {
          return {
            width: 40,
            height: 40,
          }
        },
        selectNodeContents() {

        }
      }
    }
    const wrapper = mount(
      <Toggle
        on="This is a really long text"
        off={<p>No</p>}
        size="mini"
      />
    );
    wrapper.setProps({ active: false, off: 'yes'});
    util.compareWithMarginOfError.restore();
  });
  it('should resize click events', () => {
    let spy = sinon.stub(util, 'getDimension').returns({ width: 50, height: 50});
    let resize = sinon.spy(Toggle.prototype, 'setDimensions')
    const wrapper = mount(
      <Toggle
        on={`no no no <br/> no <h1>NOOO!!!</h1> NOOOOOOO!!!!`}
        off={<p>No</p>}
        size="large"
      />
    );
    util.getDimension.restore();

    expect(wrapper.find(Toggle).length).toBe(1);
    expect(resize.called).toBe(true);
  });
  it('should handle click events', () => {
    let active = true;
    const wrapper = mount(
      <Toggle
        on="Tesst wer ertert"
        off="qwerqwerewrwerqwerqwer"
        active={active}
        width={100}
        height={100}
        onClick={(a) => {
          active = !a;
        }}
      />
    );

    wrapper.simulate('click');

    expect(active).toBe(false);

    wrapper.setProps({ disabled: true });

    wrapper.simulate('click');

    expect(active).toBe(false);
  });

  it('should render text nodes', () => {

    let spy = sinon.stub(util, 'getDimension').returns({ width: 50, height: 50});
    // let stub = sinon.stub(global.document, 'createRange' ).returns(true);
    document.createRange = () => {
      return {
        selectNodeContents() {

        },
        getBoundingClientRect() {

        }
      }
    }
    const wrapper = mount(
      <Toggle
        on={`no no no <br/> no <h1>NOOO!!!</h1> NOOOOOOO!!!!`}
        off="nono"
        size="large"
      />
    );
    expect(document.createRange).toBeDefined();
    util.getDimension.restore();

  });

});