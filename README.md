# INI Parser

Library for parsing ini files into an object.

## Usage

```js
import iniParser from '../src/index.js';

let iniString = `foo=bar
lorem=ipsum

;some=comment
#another=comment

[User]
name=foo bar
token=any token

[Section]
simple=complex`;

let parsed = iniParser(iniString);
```

## License

This project is licensed under the terms of the MIT license.

The full license text can be found in [LICENSE](./LICENSE).