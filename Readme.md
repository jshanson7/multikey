# Multikey [![NPM version][npm-image]][npm-url]

Map with multiple keys per value.

```javascript
import Multikey from 'multikey';

const multi = new Multikey();

multi.set(['key1', 'key2'], 'value');
multi.get(['key1', 'key2']); // => "value"
multi.get(['key1']); // => "undefined"
multi.size; // => "1"

const key3 = { a: 'b' };
const key4 = { c: 'd' };
const value2 = { e: 'f' };

multi.set([key3, key4], value2);
multi.get([key3, key4]); // => "{ e: 'f' }"
multi.get([key4]); // => "undefined"
multi.size; // => "2"

multi.delete([key3, key4]);
multi.get([key3, key4]); // => "undefined"
multi.size; // => "1"
```

## Installation

```
npm i multikey --save
```

## License

MIT

[npm-image]: https://badge.fury.io/js/multikey.svg
[npm-url]: https://npmjs.org/package/multikey
