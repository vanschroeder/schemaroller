  _global.wf = {
    wfUtils: {
      Fun: {},
      Obj: {},
      Str: {}
    }
  };

  _global.wf.wfUtils.Fun.getFunctionName = function(fun) {
    var n;
    if ((n = fun.toString().match(/function+\s{1,}([a-zA-Z_0-9\$]*)/)) != null) {
      return n[1];
    } else {
      return null;
    }
  };
  
  _global.wf.wfUtils.Fun.getConstructorName = function(fun) {
    var name, ref;
    if (fun.constructor.name === 'Function') {
      fun = (ref = fun()) != null ? ref : new fun;
    }
    if ((name = this.getFunctionName(fun.constructor)) != null) {
      return name;
    } else {
      return null;
    }
  };
  
  _global.wf.wfUtils.Fun.construct = function(constructor, args) {
    return new (constructor.bind.apply(constructor, [null].concat(args)));
  };
  
  _global.wf.wfUtils.Fun.factory = _global.wf.wfUtils.Fun.construct.bind(null, Function);
  
  _global.wf.wfUtils.Fun.fromString = function(string) {
    var m;
    if ((m = string.replace(/\n/g, '').replace(/[\s]{2,}/g, '').match(/^function+\s\(([a-zA-Z0-9_\s,]*)\)+\s?\{+(.*)\}+$/)) != null) {
      return _global.wf.wfUtils.Fun.factory([].concat(m[1], m[2]));
    } else {
      if ((m = string.match(new RegExp("^Native::(" + ((Object.keys(this.natives)).join('|')) + ")+$"))) != null) {
        return this.natives[m[1]];
      } else {
        return null;
      }
    }
  };
  
  _global.wf.wfUtils.Fun.toString = function(fun) {
    var s;
    if (typeof fun !== 'function') {
      return fun;
    }
    if (((s = fun.toString()).match(/.*\[native code\].*/)) != null) {
      return "Native::" + (this.getFunctionName(fun));
    } else {
      return s;
    }
  };
  
  _global.wf.wfUtils.Fun.natives = {
    Array: Array,
    ArrayBuffer: ArrayBuffer,
    Boolean: Boolean,
    Buffer: ArrayBuffer,
    Date: Date,
    Number: Number,
    Object: Object,
    String: String,
    Function: Function
  };
  
  _global.wf.wfUtils.Obj.getTypeOf = function(obj) {
    return Object.prototype.toString.call(obj).slice(8, -1);
  };
  
  _global.wf.wfUtils.Obj.isOfType = function(value, kind) {
    return (this.getTypeOf(value)) === (_global.wf.wfUtils.Fun.getFunctionName(kind)) || value instanceof kind;
  };
  
  _global.wf.wfUtils.Obj.objectToQuery = function(object) {
    var i, j, keys, pairs, ref;
    if (object == null) {
      object = {};
    }
    pairs = [];
    keys = Object.keys(object);
    for (i = j = 0, ref = keys.length - 1; 0 <= ref ? j <= ref : j >= ref; i = 0 <= ref ? ++j : --j) {
      pairs[i] = [keys[i], object[keys[i]]];
    }
    return (pairs.map((function(_this) {
      return function(v, k) {
        return v.join('=');
      };
    })(this))).join('&');
  };
  
  _global.wf.wfUtils.Obj.queryToObject = function(string) {
    var o;
    o = {};
    decodeURIComponent(string).replace('?', '').split('&').forEach((function(_this) {
      return function(v, k) {
        var p;
        if ((p = v.split('=')).length === 2) {
          return o[p[0]] = p[1];
        }
      };
    })(this));
    return o;
  };
  
  _global.wf.wfUtils.Str.capitalize = function(string) {
    if (string == null) {
      return '';
    }
	if (typeof string != 'string')
		string = string.toString();
    return "" + (string.charAt(0).toUpperCase()) + (string.slice(1));
  };
  
  _global.wf.wfUtils.Str.stripNull = function(string) {
    if (typeof string === 'undefined') {
      return '';
    }
    return string.replace(/\0/g, '');
  };
  
  _global.wf.wfUtils.Str.regsafe = function(string) {
    if (typeof string === 'undefined') {
      return '';
    }
    console.log( "string: "+string );
    return string.replace(/(\.|\!|\{|\}|\(|\)|\-|\$|\!|\*|\?\[|\])+/g, '\\$&');
  };