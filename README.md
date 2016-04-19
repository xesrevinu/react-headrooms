# [react-headrooms](https://github.com/xiaokekeT/react-headrooms)

The excellent [headroom.js](https://github.com/WickyNilliams/headroom.js) as a React.js component.

# Demo
Live demo: [xiaokekeT.github.io/react-headrooms](http://xiaokeket.github.io/react-headrooms)

# Installation

The easiest way to use headroom is to install it from NPM and include it in your own React build process (using Browserify, Webpack, etc).

# Usage

```js
import React from 'react'
import Headroom from 'react-headrooms'

class Root extends React.Component {
  render () {
    return (
      <Headroom tolerance={5} offset={200} classes={{
          initial: 'animated',
          pinned: 'slideInUp',
          unpinned: 'fadeOut'
        }}
      >
        Hello
      </Headroom>
    )
  }
}
```


Disable headroom in you page
```js
<Headroom disable={() => this.props.pathname in ['/login', '/test']}>
  ...
</Headroom>
```

# License
MIT
