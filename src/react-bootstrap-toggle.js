import React, { Component, PropTypes } from 'react';

const PADDING = {
  RIGHT: 'padding-right',
  LEFT: 'padding-left',
  TOP: 'padding-top',
  BOTTOM: 'padding-bottom',
};

const MARGIN = {
  RIGHT: 'margin-right',
  LEFT: 'margin-left',
  TOP: 'margin-top',
  BOTTOM: 'margin-bottom',
};

const getStyle = (el, str) =>
  parseInt(getComputedStyle(el).getPropertyValue(str), 10);

const getTextNodeBoundingClientRect = (node) => {
  const newNode = node.length ? node[node.length - 1] : node;
  if (document.createRange) {
    const range = document.createRange();
    if (range.getBoundingClientRect) {
      range.selectNodeContents(newNode);
      return range.getBoundingClientRect();
    }
  }
  return 0;
};

const getDimension = (node) => {
  const margin = {};
  const padding = {
    right: getStyle(node, PADDING.RIGHT),
    left: getStyle(node, PADDING.LEFT),
    top: getStyle(node, PADDING.TOP),
    bottom: getStyle(node, PADDING.BOTTOM),
  };

  if (node.childElementCount) {
    const child = node.childNodes[0];
    margin.height = getStyle(child, MARGIN.BOTTOM) + getStyle(child, MARGIN.TOP);
    margin.width = getStyle(child, MARGIN.LEFT) + getStyle(child, MARGIN.RIGHT);

    return {
      width: (child.scrollWidth || child.offsetWidth) +
      margin.width + padding.left + padding.right,
      height: (child.scrollHeight || child.offsetHeight) +
      margin.height + padding.top + padding.bottom,
    };
  }

  const range = getTextNodeBoundingClientRect(node.childNodes);

  return {
    width: range.width + padding.right + padding.left,
    height: range.height + padding.bottom + padding.top,
  };
};


export default class ReactBootstrapToggle extends Component {
  constructor(props) {
    super(props);
    this.state = { width: null, height: null };
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    this.setDimensions(this.props);
  }

  onClick() {
    if (this.props.disabled) return;
    if (this.props.onChange) {
      this.props.onChange(!this.state.active);
    }
  }

  setDimensions(props) {
    const onDim = getDimension(this.on);
    const offDim = getDimension(this.off);

    const width = Math.max(onDim.width, offDim.width);
    const height = Math.max(onDim.height, offDim.height);
    this.setState({
      width: props.width || width,
      height: props.height || height,
    });
  }

  getSizeClass() {
    if (this.props.size === 'large') return 'btn-lg';
    if (this.props.size === 'small') return 'btn-sm';
    if (this.props.size === 'mini') return 'btn-xs';
    return '';
  }

  componentDidReceiveProps(props) {
    this.setDimensions(props);
  }

  render() {
    const onstyle = `btn-${this.props.onstyle}`;
    const offstyle = `btn-${this.props.offstyle}`;
    const sizeClass = this.getSizeClass();
    const activeClass = `btn toggle ${sizeClass} ${onstyle}`;
    const inactiveClass = `btn toggle ${sizeClass} ${offstyle} off`;
    const onStyleClass = `btn toggle-on ${sizeClass} ${onstyle}`;
    const offStyleClass = `btn toggle-off ${sizeClass} ${offstyle}`;

    const style = {
      width: this.state.width,
      height: this.state.height,
    };

    return (
      <div
        disabled={this.props.disabled}
        className={this.props.active ? activeClass : inactiveClass}
        onClick={this.onClick}
        style={style}
      >
        <div className="toggle-group">
          <label
            ref={(onLabel) => { this.on = onLabel;}}
            className={onStyleClass}>
            {this.props.on}
          </label>
          <label
            ref={(offLabel) => { this.off = offLabel; }}
            className={offStyleClass}>
            {this.props.off}
          </label>
          <span className="toggle-handle btn btn-default" />
        </div>
      </div>
    );
  }
}

ReactBootstrapToggle.propTypes = {
  // Holds the className for label one
  onstyle: PropTypes.string,
  // Holds the className for label two
  offstyle: PropTypes.string,
  // Height prop
  height: PropTypes.string,
  // Width prop
  width: PropTypes.string,
  // The on and off elements defaults to 'On' and 'Off'
  on: PropTypes.node,
  off: PropTypes.node,
  // The initial state of the component
  active: PropTypes.bool,
  // Sets the button to disabled
  disabled: PropTypes.bool,
  // Set the size of the button defaults to normal
  size: PropTypes.string,
  // The onChange event, returns the state as the argument
  onChange: PropTypes.func,
};

ReactBootstrapToggle.defaultProps = {
  onstyle: 'primary',
  offstyle: 'default',
  width: '',
  height: '',
  on: 'On',
  off: 'Off',
  disabled: false,
  size: 'normal',
  active: true,
};

