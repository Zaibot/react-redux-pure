# react-redux-pure

## Installation

```sh
yarn add react-redux-pure
```

## Example

```jsx
import * as React from 'react';
import { PureConnect } from 'react-redux-pure';

import { LOGOUT } from './actions';
import { username } from './selectors';

const HelloUser = PureConnect<{ page: string }>(`HelloUser` /* used for React's displayName */)(
    (state) => ({
        username: username(state)
    }),
    (dispatch) => ({
        logout: () => dispatch(LOGOUT())
    }),
    ({ page, username, logout}) => (
        <div>
            <p>Hello {username}, welcome to the {page}!</p>
            <button type="button" onClick={logout}>Logout</button>
        </div>
    )
);

const Home = () => (
  <div>
    <HelloUser page="homepage" />
  </div>
);
```
