import React from 'react';

let outerHeight = (el) => {
  let height = el.scrollHeight;
  let style = getComputedStyle(el);
  if (el.childElementCount) {
    let child = el.childNodes[0];
    let childeStyle = getComputedStyle(child);
  }
  return height + parseInt(style.marginTop) + parseInt(style.marginBottom) 
  + parseInt(style.paddingTop) + parseInt(style.paddingBottom); 

}

let outerWidth = (el)=> {

  let width = el.scrollWidth;
  let style = getComputedStyle(el);
  if (el.childElementCount) {
    let child = el.childNodes[0];
    let childeStyle = getComputedStyle(child);
    width += parseInt(childeStyle.marginLeft) + parseInt(childeStyle.marginRight) 
      + child.scrollWidth;
  }
  return width + parseInt(style.marginLeft) + parseInt(style.marginRight);

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
    let width = Math.max(outerWidth(on), outerWidth(off)) + (outerWidth(toggle) / 1.25);
    let height = Math.max(outerHeight(on), outerHeight(off));
    
    this.setState({width : this.props.width || width, height : this.props.height || height});
  }

  componentDidMount() {
    this.setDimensions();
  }

  componentWillReceiveProps() {
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




