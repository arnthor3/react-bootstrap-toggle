## React-Bootstrap-Toggle
[![Build Status](https://travis-ci.org/arnthor3/react-bootstrap-toggle.svg?branch=master)](https://travis-ci.org/arnthor3/react-bootstrap-toggle)
[![Coverage Status](https://coveralls.io/repos/github/arnthor3/react-bootstrap-toggle/badge.svg?branch=master)](https://coveralls.io/github/arnthor3/react-bootstrap-toggle?branch=master)

This is a react component of the http://www.bootstraptoggle.com/ project.

### Usage

You need to include the bootstrap css file and also the bootstrap2-toggle css file in your app.

If you are using the npm version then you can include it from the module like this.

```html
<link rel="stylesheet" href="node_modules/lib/bootstrap2-toggle.css">
```

Or you could import it to your SASS or LESS build.

```css
@import "node_modules/lib/bootstrap2-toggle.css";
```

```js
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Toggle from 'react-bootstrap-toggle';

class Form extends Component {
  constructor() {
    super();
    this.state = { toggleActive: false };
    this.onToggle = this.onToggle.bind(this);
  }

  onToggle() {
    this.setState({ toggleActive: !this.state.toggleActive });
  }

  render() {
    return (
      <form>
        <SomeInput something={someProp} />
        .....
        <Toggle
          onClick={this.onToggle}
          on={<h2>ON</h2>}
          off={<h2>OFF</h2>}
          size="xs"
          offstyle="danger"
          active={this.state.toggleActive}
        />
      </form>
    )
  }

}


```

## Install via NPM

```sh
npm install react-bootstrap-toggle --save
```

### Props

Name|Type|Default|Description|
---|---|---|---
active|boolean|true| Sets the initial state of the toggle
on|string/html|"On"|Text of the on toggle
off|string/html|"Off"|Text of the off toggle
size|string|*null*|Size of the toggle. Possible values are `lg`, `sm`, `xs`.
onstyle|string|"primary"|Style of the on toggle. Possible values are `default`, `primary`, `success`, `info`, `warning`, `danger`
onClassName|string|*null*| additional classname to put on the on button
offstyle|string|"default"|Style of the off toggle. Possible values are `default`, `primary`, `success`, `info`, `warning`, `danger`
offClassName|string|*null*| additional classname to put on the off button
handlestyle|string|"default"|Style of the handle. Possible values are `default`, `primary`, `success`, `info`, `warning`, `danger`
handleClassName|string|*null*| additional classname to put on the handle button
width|integer|*null*|Sets the width of the toggle. if set to *null*, width will be responsive.
height|integer|*null*|Sets the height of the toggle. if set to *null*, height will be responsive.
disabled|bool|*false*|Render the toggle as disabled
style|object|*null*|If you want to add additional style to the root div
recalculateOnResize|bool|*false*| If the toggle should recalculate it's dimensions when visibility or dimensions change

### onClick
A callback function that returns the state, the parent node, and the event
```js
onClick(state, node, evt);
```
### Using Bootstrap2 class names

If you want to use bootstrap2 class names you can import the component like this
```js
import { Bootstrap2Toggle } from 'react-bootstrap-toggle';
```
Now the component will use large instead of lg and etc..

### Bootstrap2Toggle Props
Name|Type|Default|Description|
---|---|---|---
size|string|*null*|Size of the toggle. Possible values are `large`, `small`, `tiny`.



