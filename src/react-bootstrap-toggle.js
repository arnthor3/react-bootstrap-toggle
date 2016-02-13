import React from 'react';


const PADDING = {
    RIGHT   : 'padding-right',
    LEFT    : 'padding-left',
    TOP     : 'padding-top',
    BOTTOM  : 'padding-bottom'
};

const MARGIN = {
    RIGHT   : 'margin-right',
    LEFT    : 'margin-left',
    TOP     : 'margin-top',
    BOTTOM  : 'margin-bottom'
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
            bottom  : getStyle(node, PADDING.BOTTOM)
        }
    
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
    //set the state to either the prop.active value or default it to true
    this.state = { active : (typeof props.active !== 'undefined')? props.active : true};
}

onClick() {
    if(this.props.disabled) return;
    this.props.onChange && this.props.onChange(!this.state.active);
    this.setState({active : !this.state.active});
}

setDimensions() {

    let onDim   = getDimension(this.refs.on);
    let offDim  = getDimension(this.refs.off);

    let width   = Math.max(onDim.width, offDim.width);
    let height  = Math.max(onDim.height, offDim.height); 
    
    this.setState({width : this.props.width || width, height : this.props.height || height});
}

componentDidMount() {
    this.setDimensions();
}

componentWillReceiveProps(p) {
    this.setDimensions();
}


getSizeClass() {
    switch(this.props.size) {
      case 'large':
      return 'btn-lg';
      break;
      case 'small':
      return 'btn-sm';
      break;
      case 'mini':
      return 'btn-xs';
      break;
      default:
      return '';
  }
}

render() {
    let onstyle = `btn-${this.props.onstyle}`; 
    let offstyle = 'btn-' + this.props.offstyle;
    let btn = 'btn';
    let toggleOn = 'toggle-on';
    let toggleOff = 'toggle-off';
    let sizeClass = this.getSizeClass();
    let activeClass = `${btn} toggle ${sizeClass} ${onstyle}`;
    let inactiveClass = `${btn} toggle ${sizeClass} ${offstyle} off`;
    
    let onStyleClass = `${btn} ${toggleOn} ${sizeClass} ${onstyle}`;
    let offStyleClass = `${btn} ${toggleOff} ${sizeClass} ${offstyle}`;

    let style = {
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
                <span  ref='toggle' className="toggle-handle btn btn-default"></span>
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
    width       : '',
    height      : '',
    on          : 'On',
    off         : 'Off',
    disabled    : false,
    size        : 'normal',
    active      : true
}
