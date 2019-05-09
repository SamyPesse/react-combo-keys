# `react-combo-keys`

[![Build Status](https://travis-ci.org/SamyPesse/react-combo-keys.svg?branch=master)](https://travis-ci.org/SamyPesse/react-combo-keys)
[![NPM version](https://badge.fury.io/js/react-combo-keys.svg)](http://badge.fury.io/js/react-combo-keys)


Declarative API with React to bind keyboard shortcuts using Mousetrap.

### Installation

```
$ yarn add react-combo-keys
```

### Usage

```ts
import * as React from 'react';
import { useComboKeys } from 'react-combo-keys';

function SearchBar(props: {}) {
    const input = Rwact.useRef();

    useComboKeys({
        'Mod+F': () => {
            input.current.focus();
        },
        'Mod+': () => {
            alert('Settings !')
        }
    }, {}, []);

    return <input type="text" ref={input} />;
}
```
