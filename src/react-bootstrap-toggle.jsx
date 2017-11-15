import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import * as util from './utils';

const eitherStringOrInteger = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.number,
]);

export default class ReactBootstrapToggle extends Component {
  static propTypes = {
    style: PropTypes.shape(),
    // Holds the className for label one
    onstyle: PropTypes.string,
    // additional className for the on component
    onClassName: PropTypes.string,
    // Holds the className for label two
    offstyle: PropTypes.string,
    // additional className for the off component
    offClassName: PropTypes.string,
    // The className for the handle
    handlestyle: PropTypes.string,
    // additional className for the handle component
    handleClassName: PropTypes.string,
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
    className: PropTypes.string,
  }

  static defaultProps = {
    onstyle: 'primary',
    onClassName: '',
    offstyle: 'default',
    offClassName: '',
    handlestyle: 'default',
    handleClassName: '',
    width: '',
    height: '',
    on: 'On',
    off: 'Off',
    disabled: false,
    size: 'normal',
    active: true,
    style: {},
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

  onClick(evt) {
    if (this.props.disabled) return;
    if (typeof this.props.onClick === 'function') {
      this.props.onClick(!this.props.active, this.parent, evt);
    }
  }

  setDimensions() {
    const onDim = util.getDimension(this.on);
    const offDim = util.getDimension(this.off);

    const width = Math.max(onDim.width, offDim.width);
    const height = Math.max(onDim.height, offDim.height);

    // Check if the sizes are the same with a margin of error of one pixel
    const areAlmostTheSame = (
      util.compareWithMarginOfError(this.state.width, width, this.props.width,) &&
        util.compareWithMarginOfError(this.state.height, height, this.props.height)
    );

    // if they are the same then return
    if (areAlmostTheSame) {
      return;
    }

    this.setState({
      width: this.props.width || width,
      height: this.props.height || height,
    });
  }

  getSizeClass() {
    if (this.props.size === 'lg') return 'btn-lg';
    if (this.props.size === 'sm') return 'btn-sm';
    if (this.props.size === 'xs') return 'btn-xs';
    return 'btn-md';
  }

  render() {
    const {
      active,
      onClick,
      onstyle,
      onClassName,
      offstyle,
      offClassName,
      handlestyle,
      handleClassName,
      style,
      on,
      off,
      className,
      disabled,
      width,
      height,
      ...props } = this.props;

    const sizeClass = this.getSizeClass();

    const s = {
      width: this.state.width || width,
      height: this.state.height || height,
    };

    return (
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div
        role="button"
        disabled={disabled}
        className={cn('btn', 'toggle', className, sizeClass, {
          [`off btn-${offstyle}`]: !this.props.active,
          [`btn-${onstyle}`]: this.props.active,
        })}
        onClick={this.onClick}
        style={Object.assign({}, s, style)}
        {...props}
        ref={(c) => { this.parent = c; }}
      >
        <div className="toggle-group" >
          <span
            ref={(onLabel) => { this.on = onLabel; }}
            className={cn(
              'btn toggle-on',
              sizeClass,
              onClassName, {
                [`btn-${onstyle}`]: onstyle,
              })}
            disabled={disabled}
          >
            {on}
          </span>
          <span
            ref={(offLabel) => { this.off = offLabel; }}
            className={cn(
              'btn toggle-off',
              sizeClass,
              offClassName, {
                [`btn-${offstyle}`]: offstyle,
              })}
            disabled={disabled}
          >
            {off}
          </span>
          <span
            disabled={disabled}
            className={cn(
              'toggle-handle btn',
              sizeClass,
              handleClassName, {
                [`btn-${handlestyle}`]: handlestyle,
              })}
          />
        </div>
      </div>
    );
  }
}
