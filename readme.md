## React-Bootstrap-Toggle

This is a react component of the http://www.bootstraptoggle.com/ project.

You need to include the bootstrap css file and also the bootstrap2-toggle css file in your app.

If you are using the npm version then you can include it from the module like this.

```sh
<link rel="stylesheet" href="node_modules/lib/bootstrap2-toggle.css">
```

Or you could import it to your SASS or LESS build.

```sh
@import "node_modules/lib/bootstrap2-toggle.css";
```

## NPM

```sh
npm install react-bootstrap-toggle --save
```

## Props

### width
Defaults to a 100 px width

### height
Default to 35 px width

### on
Defaults to 'On', takes in any renderable node

### off
Defaults to 'Off', takes in any renderable node

### onstyle
Defaults to btn-primary, pass in any class name to change the style

### offstyle
Defaults to btn-default...

### active
Defaults to true

### disabled
Defaults to false

### size
Defaults to the standard size, changes the btn class to btn-lg etc..

### onChange
Invoked when the component state changes.


