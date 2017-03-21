# `react-combo-keys`

[![Build Status](https://travis-ci.org/SamyPesse/react-combo-keys.svg?branch=master)](https://travis-ci.org/SamyPesse/react-combo-keys)
[![NPM version](https://badge.fury.io/js/react-combo-keys.svg)](http://badge.fury.io/js/react-combo-keys)


Declarative API with React to bind keyboard shortcuts using Mousetrap.

### Installation

```
$ npm install react-combo-keys --save
```

### Usage

```js
import React from 'react';
import { ComboKeys, ComboKey } from 'react-combo-keys';

const SearchBar = React.createClass({
    focus() {
        const { input } = this.refs;
        input.focus();
    },

    render() {
        const keyMap = {
            'Mod+F': this.focus
        };

        return (
            <ComboKeys keyMap={keyMap}>
                <input type="text" ref="input" />

                <ComboKey
                    combo="Mod+,"
                    onTrigger={e => alert('Settings !')}
                    />
            </ComboKeys>
        );
    }
});
```
