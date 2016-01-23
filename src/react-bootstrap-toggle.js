import React from 'react';

export default class ReactBootstrapSwitcher extends React.Component {
  
  constructor(props) {
    super(props);
    //set the state to either the prop.active value or default it to true
    this.state = { active : (typeof props.active !== 'undefined')? props.active : true };
  }

  onClick() {
    if(this.props.disabled) return;
    this.props.onChange && this.props.onChange(!this.state.active);
    this.setState({active : !this.state.active});
  }

  getSizeClass() {
    switch(this.props.size) {
      case 'large':
        return 'btn-lg';
        break;
      case 'small':
        return 'btn-sm';
        break;
      case 'tiny':
        return 'btn-xs';
        break;
      default:
        return '';

    }
  }

  render() {
    let btn = 'btn';
    let toggleOn = 'toggle-on';
    let toggleOff = 'toggle-off';
    let sizeClass = this.getSizeClass();
    let activeClass = 'toggle btn ' + sizeClass;
    let inactiveClass = activeClass + ' off';
    
    let onStyleClass = `${btn} ${toggleOn} ${sizeClass} ${this.props.onstyle}`;
    let offStyleClass = `${btn} ${toggleOff} ${sizeClass} ${this.props.offstyle}`;

    let style = {
      width  : this.props.width,
      height : this.props.height
    };

    return (
        <div ref='switcher' className={this.state.active ? activeClass : inactiveClass} 
            onClick={this.onClick.bind(this)} style={style}>
          <div className="toggle-group">
            <label disabled={this.props.disabled} className={onStyleClass}>{this.props.on}</label>
            <label disabled={this.props.disabled} className={offStyleClass}>{this.props.off}</label>
            <span  disabled={this.props.disabled} className="toggle-handle btn btn-default"></span>
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
    onstyle     : 'btn-primary',
    offstyle    : 'btn-default',
    width       : '100',
    height      : '35',
    on          : 'On',
    off         : 'Off',
    disabled    : false,
    size        : 'normal',
    active      : true
}

