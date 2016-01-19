function Multikey() {
  this.__root__ = new Map();
  this.size = 0;
}

Multikey.prototype.has = function (keys) {
  var nodeForKeys = traverseNodes(this.__root__, keys);

  return nodeForKeys !== undefined && nodeForKeys.get('valueSet') === true;
};

Multikey.prototype.get = function (keys) {
  var nodeForKeys = traverseNodes(this.__root__, keys);

  return nodeForKeys !== undefined && nodeForKeys.get('valueSet') === true ?
    nodeForKeys.get('value') :
    undefined;
};

Multikey.prototype.set = function (keys, value) {
  var node = this.__root__;
  var nextKey;
  var nextNode;
  var nextNodes;
  
  while (keys.length) {
    nextKey = first(keys);
    keys = rest(keys);
    nextNodes = node.get('nextNodes') ||
      node.set('nextNodes', new Map().set(nextKey, new Map())).get('nextNodes');

    nextNode = nextNodes.get(nextKey) || nextNodes.set(nextKey, new Map()).get(nextKey);
    node = nextNode;
  }

  node.set('value', value);

  if (!node.get('valueSet')) {
    node.set('valueSet', true);
    this.size++;
  }
  
  return this;
};

Multikey.prototype.delete = function (keys) {
  var nodeForKeys = traverseNodes(this.__root__, keys);

  if (nodeForKeys !== undefined && nodeForKeys.get('valueSet') === true) {
    nodeForKeys.set('valueSet', false);
    nodeForKeys.delete('value');
    this.size--;
    return true;
  }
  
  return false;
};

Multikey.prototype.clear = function () {
  this.__root__ = new Map();
  this.size = 0;
};

function traverseNodes(node, keys) {
  var nextKey;
  var nextNodes;
  var nextNode;
  
  while (keys.length) {
    nextKey = first(keys);
    keys = rest(keys);
    nextNodes = node.get('nextNodes');
    if (!nextNodes) { return undefined; }
    nextNode = nextNodes.get(nextKey);
    if (!nextNode) { return undefined; }
    node = nextNode;
  }

  return node;
}

function first(arr) { return arr[0]; }
function rest(arr) { return arr.slice(1); }

module.exports = Multikey;
