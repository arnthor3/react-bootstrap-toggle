import React from 'react';

const PADDING = {
  RIGHT   : 'padding-right',
  LEFT    : 'padding-left',
  TOP     : 'padding-top',
  BOTTOM  : 'padding-bottom',
};

const MARGIN = {
  RIGHT   : 'margin-right',
  LEFT    : 'margin-left',
  TOP     : 'margin-top',
  BOTTOM  : 'margin-bottom',
};

const getStyle = (el, str) => {
  return parseInt(getComputedStyle(el).getPropertyValue(str), 10);
}

const getTextNodeBoundingClientRect = (node) => {
  node = node.length ? node[node.length - 1] : node;
  if (document.createRange) {
    let range = document.createRange();
    if (range.getBoundingClientRect) {
      range.selectNodeContents(node);
      return range.getBoundingClientRect();
    }
  }
  return 0;
}

const getDimension = (node) => {
  let margin = {},
      padding = {
        right   : getStyle(node, PADDING.RIGHT),
        left    : getStyle(node, PADDING.LEFT),
        top     : getStyle(node, PADDING.TOP),
        bottom  : getStyle(node, PADDING.BOTTOM),
      };

  if (node.childElementCount) {
    let child       = node.childNodes[0];
    margin.height   = getStyle(child, MARGIN.BOTTOM) +  getStyle(child, MARGIN.TOP);
    margin.width    = getStyle(child, MARGIN.LEFT) +  getStyle(child, MARGIN.RIGHT);

    return {
      width : (child.scrollWidth || child.offsetWidth) + margin.width + padding.left + padding.right,
      height : (child.scrollHeight || child.offsetHeight) + margin.height + padding.top + padding.bottom,
    }
  }

  let range = getTextNodeBoundingClientRect(node.childNodes);

  return {
    width : range.width + padding.right + padding.left,
    height : range.height + padding.bottom + padding.top
  }
}


export default class ReactBootstrapToggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {width: null, height: null};
  }

  onClick() {
    if (this.props.disabled) return;
    this.props.onChange && this.props.onChange(!this.state.active);
    this.setState({active : !this.state.active});
  }

  setDimensions(props) {
    const onDim   = getDimension(this.refs.on);
    const offDim  = getDimension(this.refs.off);

    const width   = Math.max(onDim.width, offDim.width);
    const height  = Math.max(onDim.height, offDim.height);
    const active = props.active !== undefined? props.active : this.state.active;
    this.setState({
      width: props.width || width,
      height: props.height || height,
      active,
    });
  }

  componentDidMount() {
    this.setDimensions(this.props);
  }

  componentWillReceiveProps(props) {
    this.setDimensions(props);
  }


  getSizeClass() {
    if (this.props.size === 'large') return 'btn-lg';
    if (this.props.size === 'small') return 'btn-sm';
    if (this.props.size === 'mini')  return 'btn-xs';
    return '';
  }

  render() {
    const onstyle = `btn-${this.props.onstyle}`;
    const offstyle = 'btn-' + this.props.offstyle;
    const toggleOn = 'toggle-on';
    const toggleOff = 'toggle-off';
    const sizeClass = this.getSizeClass();
    const activeClass = `btn toggle ${sizeClass} ${onstyle}`;
    const inactiveClass = `btn toggle ${sizeClass} ${offstyle} off`;
    const onStyleClass = `btn ${toggleOn} ${sizeClass} ${onstyle}`;
    const offStyleClass = `btn ${toggleOff} ${sizeClass} ${offstyle}`;

    const style = {
      width  : this.state.width,
      height : this.state.height
    };

    return (
      <div
        ref='switcher'
        disabled={this.props.disabled}
        className={this.state.active ? activeClass : inactiveClass}
        onClick={this.onClick.bind(this)}
        style={style}>
        <div className="toggle-group">
          <label ref='on'  className={onStyleClass}>{this.props.on}</label>
          <label ref='off'  className={offStyleClass}>{this.props.off}</label>
          <span  ref='toggle' className={`toggle-handle btn btn-${this.props.handlestyle}`}></span>
        </div>
      </div>
    );
  }
}

ReactBootstrapToggle.propTypes = {
  // Holds the className for label one
  onstyle     : React.PropTypes.string,
  // Holds the className for label two
  offstyle    : React.PropTypes.string,
  // Holds the className for the middle handle
  handlestyle : React.PropTypes.string,
  // Height prop
  height      : React.PropTypes.string,
  // Width prop
  width       : React.PropTypes.string,
  // The on and off elements defaults to 'On' and 'Off'
  on          : React.PropTypes.node,
  off         : React.PropTypes.node,
  // The initial state of the component
  active      : React.PropTypes.bool,
  // Sets the button to disabled
  disabled    : React.PropTypes.bool,
  // Set the size of the button defaults to normal
  size        : React.PropTypes.string,
  // The onChange event, returns the state as the argument
  onChange    : React.PropTypes.func
};

ReactBootstrapToggle.defaultProps = {
  onstyle     : 'primary',
  offstyle    : 'default',
  handlestyle : 'default',
  width       : '',
  height      : '',
  on          : 'On',
  off         : 'Off',
  disabled    : false,
  size        : 'normal',
  active      : true
};

