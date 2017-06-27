import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as util from './utils';

const eitherStringOrInteger = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.number,
]);

export default class ReactBootstrapToggle extends Component {
  static propTypes = {
    // Holds the className for label one
    onstyle: PropTypes.string,
    // Holds the className for label two
    offstyle: PropTypes.string,
    // The className for the handle
    handlestyle: PropTypes.string,
    // Height prop
    height: eitherStringOrInteger,
    // Width prop
    width: eitherStringOrInteger,
    // The on and off elements defaults to 'On' and 'Off'
    on: PropTypes.node,
    off: PropTypes.node,
    // The initial state of the component
    active: PropTypes.bool,
    // Sets the button to disabled
    disabled: PropTypes.bool,
    // Set the size of the button defaults to normal
    size: PropTypes.string,
    // The onClick event, returns the state as the argument
    onClick: PropTypes.func,
    id: PropTypes.string,
    className: PropTypes.string,
  }

  static defaultProps = {
    onstyle: 'primary',
    offstyle: 'default',
    handlestyle: 'default',
    width: '',
    height: '',
    on: 'On',
    off: 'Off',
    disabled: false,
    size: 'normal',
    active: true,
  }

  constructor() {
    super();
    this.state = { width: null, height: null };
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    if (this.props.width && this.props.height) {
      return;
    }
    this.setDimensions();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.width && this.props.height) {
      return;
    }
    this.setDimensions();
  }


  onClick() {
    if (this.props.disabled) return;
    if (typeof this.props.onClick === 'function') {
      this.props.onClick(!this.props.active);
    }
  }

  setDimensions() {
    const onDim = util.getDimension(this.on);
    const offDim = util.getDimension(this.off);

    const width = Math.max(onDim.width, offDim.width);
    const height = Math.max(onDim.height, offDim.height);

    // Check if the sizes are the same with a margin of error of one pixel
    const areAlmostTheSame = (
      util.compareWithMarginOfError(this.state.width, width) &&
        util.compareWithMarginOfError(this.state.height, height)
    );

    // if they are the same then return
    if (areAlmostTheSame) {
      return;
    }

    this.setState({
      width,
      height,
    });
  }

  getSizeClass() {
    if (this.props.size === 'lg') return 'btn-lg';
    if (this.props.size === 'sm') return 'btn-sm';
    if (this.props.size === 'xs') return 'btn-xs';
    return 'btn-md';
  }

  render() {
    const onstyle = `btn-${this.props.onstyle}`;
    const offstyle = `btn-${this.props.offstyle}`;
    const sizeClass = this.getSizeClass();
    const activeClass = `btn toggle ${sizeClass} ${onstyle}`;
    const inactiveClass = `btn toggle ${sizeClass} ${offstyle} off`;
    const onStyleClass = `btn toggle-on ${sizeClass} ${onstyle}`;
    const offStyleClass = `btn toggle-off ${sizeClass} ${offstyle}`;

    let style = {};
    let className = this.props.active ? activeClass : inactiveClass;
    if (this.props.width && this.props.height) {
      style = {
        width: this.props.width,
        height: this.props.height,
      };
    } else {
      style = {
        width: this.state.width,
        height: this.state.height,
      };
    }

    if (this.props.className) {
      className += ` ${this.props.className}`;
    }

    return (
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div
        role="button"
        id={this.props.id}
        disabled={this.props.disabled}
        className={className}
        onClick={this.onClick}
        style={style}

      >
        <div className="toggle-group" >
          <span
            ref={(onLabel) => { this.on = onLabel; }}
            className={onStyleClass}
            disabled={this.props.disabled}
          >
            {this.props.on}
          </span>
          <span
            ref={(offLabel) => { this.off = offLabel; }}
            className={offStyleClass}
            disabled={this.props.disabled}
          >
            {this.props.off}
          </span>
          <span disabled={this.props.disabled} className={`toggle-handle btn btn-${this.props.handlestyle} ${sizeClass}`} />
        </div>
      </div>
    );
  }
}
