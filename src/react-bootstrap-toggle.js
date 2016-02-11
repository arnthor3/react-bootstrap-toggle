import React from 'react';

const getStyle = (el, str) => {
  return parseInt(getComputedStyle(el).getPropertyValue(str), 10);
}

const getWidth = (el) => {
  let width = 0
   var pLeft    = getStyle(el, 'padding-left');
   var pRight   = getStyle(el,'padding-right');
   if (el.childElementCount) {
      
      let child   = el.childNodes[0];
      let mLeft   = getStyle(child, 'margin-left');
      let mRight  = getStyle(child, 'margin-right');
      let cWidth  = child.scrollWidth;

      return cWidth + mLeft + mRight + pLeft + pRight; 
    } 
    return el.offsetWidth;
}

const getHeight = (el) => {
  let height = 0
   var pTop     = getStyle(el, 'padding-top');
   var pBottom  = getStyle(el, 'padding-top');
   let elHeight = 0;
   if (el.childElementCount) {
      
      let child   = el.childNodes[0];
      let mTop    = getStyle(child, 'margin-top');
      let mBottom = getStyle(child, 'margin-bottom');
      let cHeight  = child.offsetHeight;
      return cHeight + mBottom + mTop + pTop + pBottom; 
    } 
    return el.offsetHeight;
   
   
}

export default class ReactBootstrapSwitcher extends React.Component {
  
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
    let on = this.refs.on;
    let off = this.refs.off;
    let toggle = this.refs.toggle;
    let width = Math.max(getWidth(on), getWidth(off));
    let height = Math.max(getHeight(on), getHeight(off)); 
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
        <div ref='switcher' disabled={this.props.disabled} className={this.state.active ? activeClass : inactiveClass} 
            onClick={this.onClick.bind(this)} style={style}>
          <div className="toggle-group">
            <label ref='on'  className={onStyleClass}>{this.props.on}</label>
            <label ref='off'  className={offStyleClass}>{this.props.off}</label>
            <span  ref='toggle' className="toggle-handle btn btn-default"></span>
          </div>
        </div>
    );
  }
}

ReactBootstrapSwitcher.propTypes = {
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

ReactBootstrapSwitcher.defaultProps = {
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


