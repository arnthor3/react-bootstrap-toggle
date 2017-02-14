import React from 'react';
import Toggle from './react-bootstrap-toggle';
/**
 * Exports the component with bootstrap 2 style names
 */
export default class ReactBootstrap2Toggle extends Toggle {
  getSizeClass() {
    if (this.props.size === 'large') return 'btn-large';
    if (this.props.size === 'small') return 'btn-small';
    if (this.props.size === 'mini') return 'btn-mini';
    return '';
  }
}
