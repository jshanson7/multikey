'use strict';

const assert = require('assert');
const Multikey = require('./');

describe('Multikey', () => {
  describe('#set()', () => {
    it('sets value for keys', () => {
      const multi = new Multikey();

      assert(multi.set(['key1'], 'value') === multi);
      assert(multi.set(['key2', 'key3'], 'value') === multi);
      assert(multi.set([{'key4': 4}, ['key5'], ['key6']], 'value') === multi);
      assert(multi.size === 3);
    });
  });
  describe('#get()', () => {
    it('gets value for keys', () => {
      const multi = new Multikey();
      const key1 = { a: 'b' };
      const key2 = { c: 'd' };
      const value = { e: 'f' };

      multi.set([key1, key2], value);
      assert(multi.get([key1, key2]) === value);
      assert(multi.get([key1]) === undefined);
      assert(multi.get([key2]) === undefined);
      assert(multi.size === 1);
    });
  });
  describe('#has()', () => {
    it('has value for keys', () => {
      const multi = new Multikey();
      const key1 = { a: 'b' };
      const key2 = { c: 'd' };

      multi.set([key1, key2], 'value');
      assert(multi.has([key1, key2]));
      assert(!multi.has([key2, key1]));
    });
  });
  describe('#delete()', () => {
    it('deletes value for keys', () => {
      const multi = new Multikey();
      const key1 = { a: 'b' };
      const key2 = { c: 'd' };
      const value = { e: 'f' };

      multi.set([key1, key2], value);
      assert(multi.get([key1, key2]) === value);
      assert(multi.size === 1);
      assert(multi.delete([key1, key2]) === true);
      assert(multi.get([key1, key2]) === undefined);
      assert(multi.size === 0);
      assert(multi.delete([key1, key2]) === false);
    });
  });
  describe('#clear()', () => {
    it('clears values', () => {
      const multi = new Multikey();
      const key1 = { a: 'b' };
      const key2 = { c: 'd' };
      const value = { e: 'f' };

      multi.set([key1, key2], value);
      assert(multi.get([key1, key2]) === value);
      assert(multi.size === 1);
      multi.clear();
      assert(multi.get([key1, key2]) === undefined);
      assert(multi.has([key1, key2]) === false);
      assert(multi.size === 0);
    });
  });
  it('no args', () => {
    const multi = new Multikey();
    const value = { e: 'f' };

    multi.set([], value);
    assert(multi.get([]) === value);
    assert(multi.size === 1);
    multi.clear();
    assert(multi.get([]) === undefined);
    assert(multi.has([]) === false);
    assert(multi.size === 0);
  });
});
