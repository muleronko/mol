/// Fake namespace for optional overrides
///
/// 	namespace $ { export var x = 1 , y = 1 } // defaults
/// 	namespace $.$$ { export var x = 2 } // overrides
/// 	namespace $.$$ { console.log( x , y ) } // usage
///
this.$ = this.$ || this
var $ = this.$
$.$$ = $

$.$mol = $  // deprecated
console.warn( 'namespace $.$mol is deprecated. Use namespace $.$$ instead.' )

;
//mol.js.map
;
var $;
(function ($) {
    $.$mol_func_name_dict = new WeakMap();
    function $mol_func_name(func) {
        if (func.name)
            return func.name;
        var name = $.$mol_func_name_dict.get(func);
        if (name != null)
            return name;
        name = Function.prototype.toString.call(func).match(/^function ([a-z0-9_$]*)/)[1];
        $.$mol_func_name_dict.set(func, name);
        return name;
    }
    $.$mol_func_name = $mol_func_name;
})($ || ($ = {}));
//func.js.map
;
var $;
(function ($) {
    function $mol_deprecated(message) {
        return function (host, field, descr) {
            var value = descr.value;
            descr.value = function $mol_deprecated_wrapper() {
                console.warn(host.constructor + "::" + field + " is deprecated. " + message);
                return value.apply(this, arguments);
            };
        };
    }
    $.$mol_deprecated = $mol_deprecated;
})($ || ($ = {}));
//deprecated.js.map
;
var $;
(function ($) {
    function $mol_log(path, values) {
        var filter = $mol_log.filter();
        if (filter == null)
            return;
        if (path.indexOf(filter) === -1)
            return;
        var time = new Date().toLocaleTimeString();
        console.log(time, path, values);
        var debug = $mol_log.debug();
        if (debug == null)
            return;
        if (path.indexOf(debug) === -1)
            return;
        debugger;
    }
    $.$mol_log = $mol_log;
    (function ($mol_log) {
        var _filter;
        function filter(next) {
            if (next !== void 0) {
                if (next == null) {
                    sessionStorage.removeItem('$mol_log.filter()');
                }
                else {
                    sessionStorage.setItem('$mol_log.filter()', next);
                }
                _filter = next;
            }
            if (_filter !== void 0)
                return _filter;
            return _filter = sessionStorage.getItem('$mol_log.filter()');
        }
        $mol_log.filter = filter;
        var _debug;
        function debug(next) {
            if (next === void 0) { next = _debug; }
            return _debug = next;
        }
        $mol_log.debug = debug;
    })($mol_log = $.$mol_log || ($.$mol_log = {}));
})($ || ($ = {}));
//log.web.js.map
;
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_object = (function () {
        function $mol_object() {
            this['destroyed()'] = false;
        }
        $mol_object.prototype.Class = function () {
            return this.constructor;
        };
        $mol_object.toString = function () {
            return $.$mol_func_name(this);
        };
        $mol_object.prototype.object_owner = function (next) {
            if (this['object_owner()'])
                return this['object_owner()'];
            return this['object_owner()'] = next;
        };
        $mol_object.prototype.object_field = function (next) {
            if (this['object_field()'])
                return this['object_field()'] || '';
            return this['object_field()'] = next;
        };
        $mol_object.prototype.toString = function () {
            var path = '';
            var owner = this.object_owner();
            if (owner)
                path = owner.toString();
            var field = this.object_field();
            if (field)
                path += '.' + field;
            return path;
        };
        $mol_object.prototype.toJSON = function () {
            return this.toString();
        };
        $mol_object.make = function (config) {
            var instance = new this;
            for (var key in config)
                instance[key] = config[key];
            return instance;
        };
        $mol_object.prototype.setup = function (script) {
            script(this);
            return this;
        };
        $mol_object.prototype.destroyed = function (next) {
            if (next === void 0)
                return this['destroyed()'];
            this['destroyed()'] = next;
            this.log(['.destroyed()', next]);
            return next;
        };
        $mol_object.prototype.log = function (values) {
            if ($.$mol_log.filter() == null)
                return;
            $.$mol_log(this.toString(), values);
        };
        __decorate([
            $.$mol_deprecated("Use $mol_object.make() instead.")
        ], $mol_object.prototype, "setup", null);
        return $mol_object;
    }());
    $.$mol_object = $mol_object;
})($ || ($ = {}));
//object.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var $;
(function ($) {
    var $mol_defer = (function (_super) {
        __extends($mol_defer, _super);
        function $mol_defer(run) {
            var _this = _super.call(this) || this;
            _this.run = run;
            $mol_defer.add(_this);
            return _this;
        }
        $mol_defer.prototype.destroyed = function (next) {
            if (next)
                $mol_defer.drop(this);
            return _super.prototype.destroyed.call(this, next);
        };
        $mol_defer.schedule = function () {
            var _this = this;
            if (this.timer)
                return;
            this.timer = this.scheduleNative(function () {
                _this.timer = 0;
                _this.run();
            });
        };
        $mol_defer.unschedule = function () {
            if (!this.timer)
                return;
            cancelAnimationFrame(this.timer);
            this.timer = 0;
        };
        $mol_defer.add = function (defer) {
            this.all.push(defer);
            this.schedule();
        };
        $mol_defer.drop = function (defer) {
            var index = this.all.indexOf(defer);
            if (index >= 0)
                this.all.splice(index, 1);
        };
        $mol_defer.run = function () {
            if (this.all.length === 0)
                return;
            this.schedule();
            for (var defer; defer = this.all.pop();)
                defer.run();
        };
        $mol_defer.all = [];
        $mol_defer.timer = 0;
        $mol_defer.scheduleNative = (typeof requestAnimationFrame == 'function')
            ? function (handler) { return requestAnimationFrame(handler); }
            : function (handler) { return setTimeout(handler, 16); };
        return $mol_defer;
    }($.$mol_object));
    $.$mol_defer = $mol_defer;
})($ || ($ = {}));
//defer.js.map
;
var $;
(function ($) {
    $.$mol_state_stack = new Map();
})($ || ($ = {}));
//stack.js.map
;
void function() {

	if( typeof alert === 'function' ) {
		var nativeAlert = alert
		window.alert = function alert( message ) {
			console.warn( 'Alerts causes atom synchronization problems in IE. Use custom notificator instead.' )
			return nativeAlert( message )
		}
	}

	if( typeof confirm === 'function' ) {
		var nativeConfirm = confirm
		window.confirm = function confirm( question ) {
			console.warn( 'Confirms causes atom synchronization problems in IE. Use custom dialog instead.' )
			return nativeConfirm( question )
		}
	}

	if( typeof confirm === 'function' ) {
		var nativePrompt = prompt
		window.prompt = function prompt( question , def ) {
			console.warn( 'Prompts causes atom synchronization problems in IE. Use custom dialog instead.' )
			return nativePrompt( question , def )
		}
	}

}()

;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var $;
(function ($) {
    var $mol_atom_status;
    (function ($mol_atom_status) {
        $mol_atom_status["obsolete"] = "obsolete";
        $mol_atom_status["checking"] = "checking";
        $mol_atom_status["pulling"] = "pulling";
        $mol_atom_status["actual"] = "actual";
    })($mol_atom_status = $.$mol_atom_status || ($.$mol_atom_status = {}));
    var $mol_atom = (function (_super) {
        __extends($mol_atom, _super);
        function $mol_atom(host, handler, field) {
            if (handler === void 0) { handler = function () { return undefined; }; }
            if (field === void 0) { field = ''; }
            var _this = _super.call(this) || this;
            _this.masters = null;
            _this.slaves = null;
            _this.status = $mol_atom_status.obsolete;
            _this.autoFresh = true;
            _this.handler = handler;
            _this.host = Object(host);
            _this.field = field;
            return _this;
        }
        $mol_atom.prototype.destroyed = function (next) {
            if (next) {
                this.unlink();
                var host = this.host;
                var value = this['value()'];
                if (value instanceof $.$mol_object) {
                    if ((value.object_owner() === host) && (value.object_field() === this.field)) {
                        value.destroyed(true);
                    }
                }
                this.status = $mol_atom_status.obsolete;
            }
            return _super.prototype.destroyed.call(this, next);
        };
        $mol_atom.prototype.unlink = function () {
            this.disobey_all();
            this.check_slaves();
        };
        $mol_atom.prototype.toString = function () {
            return this.host + "." + this.field + "@";
        };
        $mol_atom.prototype.get = function (force) {
            if (this.status === $mol_atom_status.pulling) {
                throw new Error("Cyclic atom dependency of " + this);
            }
            this.actualize(force);
            var slave = $mol_atom.stack[0];
            if (slave) {
                this.lead(slave);
                slave.obey(this);
            }
            var value = this['value()'];
            if (typeof Proxy !== 'function' && value instanceof Error) {
                throw value;
            }
            return value;
        };
        $mol_atom.prototype.actualize = function (force) {
            var _this = this;
            if (!force && this.status === $mol_atom_status.actual)
                return;
            var slave = $mol_atom.stack[0];
            $mol_atom.stack[0] = this;
            if (!force && this.status === $mol_atom_status.checking) {
                this.masters.forEach(function (master) {
                    if (_this.status !== $mol_atom_status.checking)
                        return;
                    master.actualize();
                });
                if (this.status === $mol_atom_status.checking) {
                    this.status = $mol_atom_status.actual;
                }
            }
            if (force || this.status !== $mol_atom_status.actual) {
                var oldMasters = this.masters;
                this.masters = null;
                if (oldMasters)
                    oldMasters.forEach(function (master) {
                        master.dislead(_this);
                    });
                this.status = $mol_atom_status.pulling;
                var next = this.pull(force);
                this.push(next);
            }
            $mol_atom.stack[0] = slave;
        };
        $mol_atom.prototype.pull = function (force) {
            try {
                return this.handler(this._next, force);
            }
            catch (error) {
                if (error['$mol_atom_catched'])
                    return error;
                if (error instanceof $mol_atom_wait)
                    return error;
                console.error(error.stack || error);
                if (!(error instanceof Error)) {
                    error = new Error(error.stack || error);
                }
                error['$mol_atom_catched'] = true;
                return error;
            }
        };
        $mol_atom.prototype.set = function (next) {
            var next_normal = this.normalize(next, this._next);
            if (next_normal === this._next)
                return this.get();
            if (next_normal === this['value()'])
                return this.get();
            this._next = next_normal;
            this.obsolete();
            return this.get();
        };
        $mol_atom.prototype.normalize = function (next, prev) {
            if (next === prev)
                return next;
            if ((next instanceof Array) && (prev instanceof Array) && (next.length === prev.length)) {
                for (var i = 0; i < next.length; ++i) {
                    if (next[i] !== prev[i])
                        return next;
                }
                return prev;
            }
            return next;
        };
        $mol_atom.prototype.push = function (next_raw) {
            this._next = undefined;
            this.status = $mol_atom_status.actual;
            var host = this.host;
            var prev = this['value()'];
            if (next_raw === undefined)
                return prev;
            var next = (next_raw instanceof Error) ? next_raw : this.normalize(next_raw, prev);
            if (next === prev)
                return prev;
            if (next instanceof $.$mol_object) {
                next.object_field(this.field);
                next.object_owner(host);
            }
            if ((typeof Proxy === 'function') && (next instanceof Error)) {
                next = new Proxy(next, {
                    get: function (target) {
                        throw target.valueOf();
                    },
                    ownKeys: function (target) {
                        throw target.valueOf();
                    },
                });
            }
            this['value()'] = next;
            this.log(['push', next, prev]);
            this.obsolete_slaves();
            return next;
        };
        $mol_atom.prototype.obsolete_slaves = function () {
            if (!this.slaves)
                return;
            this.slaves.forEach(function (slave) { return slave.obsolete(); });
        };
        $mol_atom.prototype.check_slaves = function () {
            if (this.slaves) {
                this.slaves.forEach(function (slave) { return slave.check(); });
            }
            else {
                if (this.autoFresh)
                    $mol_atom.actualize(this);
            }
        };
        $mol_atom.prototype.check = function () {
            if (this.status === $mol_atom_status.actual) {
                this.status = $mol_atom_status.checking;
                this.check_slaves();
            }
        };
        $mol_atom.prototype.obsolete = function () {
            if (this.status === $mol_atom_status.obsolete)
                return;
            this.status = $mol_atom_status.obsolete;
            this.check_slaves();
            return;
        };
        $mol_atom.prototype.lead = function (slave) {
            if (!this.slaves) {
                this.slaves = new Set();
                $mol_atom.unreap(this);
            }
            this.slaves.add(slave);
        };
        $mol_atom.prototype.dislead = function (slave) {
            if (!this.slaves)
                return;
            if (this.slaves.size === 1) {
                this.slaves = null;
                $mol_atom.reap(this);
            }
            else {
                this.slaves.delete(slave);
            }
        };
        $mol_atom.prototype.obey = function (master) {
            if (!this.masters)
                this.masters = new Set();
            this.masters.add(master);
        };
        $mol_atom.prototype.disobey = function (master) {
            if (!this.masters)
                return;
            this.masters.delete(master);
        };
        $mol_atom.prototype.disobey_all = function () {
            var _this = this;
            if (!this.masters)
                return;
            this.masters.forEach(function (master) { return master.dislead(_this); });
            this.masters = null;
        };
        $mol_atom.prototype.value = function (next, force) {
            if (next === undefined) {
                return this.get(force);
            }
            else {
                if (force) {
                    return this.push(next);
                }
                else {
                    return this.set(next);
                }
            }
        };
        $mol_atom.actualize = function (atom) {
            $mol_atom.updating.push(atom);
            $mol_atom.schedule();
        };
        $mol_atom.reap = function (atom) {
            $mol_atom.reaping.add(atom);
            $mol_atom.schedule();
        };
        $mol_atom.unreap = function (atom) {
            $mol_atom.reaping.delete(atom);
        };
        $mol_atom.schedule = function () {
            var _this = this;
            if (this.scheduled)
                return;
            new $.$mol_defer(function () {
                if (!_this.scheduled)
                    return;
                _this.scheduled = false;
                _this.sync();
            });
            this.scheduled = true;
        };
        $mol_atom.sync = function () {
            var _this = this;
            $.$mol_log('$mol_atom.sync', []);
            this.schedule();
            while (true) {
                var atom = this.updating.shift();
                if (!atom)
                    break;
                if (this.reaping.has(atom))
                    continue;
                if (!atom.destroyed())
                    atom.get();
            }
            while (this.reaping.size) {
                this.reaping.forEach(function (atom) {
                    _this.reaping.delete(atom);
                    if (!atom.slaves)
                        atom.destroyed(true);
                });
            }
            this.scheduled = false;
        };
        $mol_atom.prototype.then = function (done, fail) {
            var _this = this;
            var prev;
            var next;
            var atom = new $mol_atom(this, function () {
                try {
                    if (prev == undefined) {
                        var val = _this.get();
                        if (val instanceof $mol_atom_wait)
                            return val;
                        if (val)
                            val.valueOf();
                        prev = val;
                    }
                    if (next == undefined) {
                        var val = done(prev);
                        if (val instanceof $mol_atom_wait)
                            return val;
                        if (val)
                            val.valueOf();
                        next = val;
                    }
                    return next;
                }
                catch (error) {
                    if (error instanceof $mol_atom_wait)
                        return error;
                    if (fail)
                        return fail(error);
                    return error;
                }
            });
            $mol_atom.actualize(atom);
            return atom;
        };
        $mol_atom.prototype.catch = function (fail) {
            return this.then(function (next) { return next; }, fail);
        };
        $mol_atom.stack = [];
        $mol_atom.updating = [];
        $mol_atom.reaping = new Set();
        $mol_atom.scheduled = false;
        return $mol_atom;
    }($.$mol_object));
    $.$mol_atom = $mol_atom;
    $.$mol_state_stack.set('$mol_atom.stack', $mol_atom.stack);
    var $mol_atom_wait = (function (_super) {
        __extends($mol_atom_wait, _super);
        function $mol_atom_wait(message) {
            var _newTarget = this.constructor;
            if (message === void 0) { message = 'Wait...'; }
            var _this = _super.call(this, message) || this;
            _this.name = '$mol_atom_wait';
            _this['__proto__'] = _newTarget.prototype;
            return _this;
        }
        return $mol_atom_wait;
    }(Error));
    $.$mol_atom_wait = $mol_atom_wait;
    var $mol_atom_force = (function (_super) {
        __extends($mol_atom_force, _super);
        function $mol_atom_force() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return $mol_atom_force;
    }(Object));
    $.$mol_atom_force = $mol_atom_force;
})($ || ($ = {}));
//atom.js.map
;
var $;
(function ($) {
    function $mol_mem(obj, name, descr) {
        var value = descr.value;
        var store = new WeakMap();
        descr.value = function (next, force) {
            var host = this;
            var atom = store.get(host);
            if (!atom) {
                if (force && (next === undefined))
                    return next;
                store.set(host, atom = new $.$mol_atom(host, value.bind(host), name + '()'));
            }
            return atom.value(next, force);
        };
        Object.defineProperty(obj, name + "()", { get: function () { return store.get(this); } });
        descr.value['value'] = value;
        return descr;
    }
    $.$mol_mem = $mol_mem;
    function $mol_mem_key(obj, name, descr) {
        var value = descr.value;
        var store = new WeakMap();
        descr.value = function (key, next, force) {
            var host = this;
            var key_str = JSON.stringify(key);
            var dict = store.get(host);
            if (!dict)
                store.set(host, dict = {});
            var atom = dict[key_str];
            if (!atom) {
                if (force && (next === undefined))
                    return next;
                dict[key_str] = atom = new $.$mol_atom(host, value.bind(host, key), name + "(" + key_str + ")");
            }
            return atom.value(next, force);
        };
        Object.defineProperty(obj, name + "()", { get: function () { return store.get(this); } });
        void (descr.value['value'] = value);
        return descr;
    }
    $.$mol_mem_key = $mol_mem_key;
})($ || ($ = {}));
//mem.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_window = (function (_super) {
        __extends($mol_window, _super);
        function $mol_window() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_window.size = function (next) {
            return next || {
                width: window.innerWidth,
                height: window.innerHeight,
            };
        };
        __decorate([
            $.$mol_mem
        ], $mol_window, "size", null);
        return $mol_window;
    }($.$mol_object));
    $.$mol_window = $mol_window;
    window.addEventListener('resize', function () {
        $mol_window.size(null);
    });
})($ || ($ = {}));
//window.web.js.map
;
var $;
(function ($) {
})($ || ($ = {}));
//context.js.map
;
var $;
(function ($) {
    $.$mol_dom_context = window;
})($ || ($ = {}));
//context.web.js.map
;
var $;
(function ($) {
    function $mol_dom_render_fields(el, fields) {
        var _loop_1 = function (key) {
            var val = fields[key];
            if (val === undefined)
                return "continue";
            if (el[key] === val)
                return "continue";
            el[key] = val;
            if (el[key] === val)
                return "continue";
            var setter = function () {
                el.removeEventListener('DOMNodeInsertedIntoDocument', setter, { passive: true });
                new $.$mol_defer(function () {
                    el[key] = val;
                });
            };
            el.addEventListener('DOMNodeInsertedIntoDocument', setter, { passive: true });
        };
        for (var key in fields) {
            _loop_1(key);
        }
    }
    $.$mol_dom_render_fields = $mol_dom_render_fields;
    function $mol_dom_render_children(el, childNodes) {
        var nodes = [];
        for (var i = 0; i < childNodes.length; ++i) {
            var node = childNodes[i];
            if (node == null)
                continue;
            if (Object(node) === node) {
                if (node['dom_tree'])
                    node = node['dom_tree']();
                nodes.push(node);
            }
            else {
                nodes.push(String(node));
            }
        }
        var nextNode = el.firstChild;
        for (var _i = 0, nodes_1 = nodes; _i < nodes_1.length; _i++) {
            var view_ = nodes_1[_i];
            var view = view_.valueOf();
            if (view instanceof $.$mol_dom_context.Node) {
                while (true) {
                    if (!nextNode) {
                        el.appendChild(view);
                        break;
                    }
                    if (nextNode == view) {
                        nextNode = nextNode.nextSibling;
                        break;
                    }
                    else {
                        if (nodes.indexOf(nextNode) === -1) {
                            var nn = nextNode.nextSibling;
                            el.removeChild(nextNode);
                            nextNode = nn;
                        }
                        else {
                            el.insertBefore(view, nextNode);
                            break;
                        }
                    }
                }
            }
            else {
                if (nextNode && nextNode.nodeName === '#text') {
                    nextNode.nodeValue = String(view);
                    nextNode = nextNode.nextSibling;
                }
                else {
                    var textNode = $.$mol_dom_context.document.createTextNode(String(view));
                    el.insertBefore(textNode, nextNode);
                }
            }
        }
        while (nextNode) {
            var currNode = nextNode;
            nextNode = currNode.nextSibling;
            el.removeChild(currNode);
        }
    }
    $.$mol_dom_render_children = $mol_dom_render_children;
    function $mol_dom_render_attributes(el, attrs) {
        for (var name_1 in attrs) {
            var val = attrs[name_1];
            if (el.getAttribute(name_1) === val)
                continue;
            if (val === null || val === false)
                el.removeAttribute(name_1);
            else
                el.setAttribute(name_1, String(val));
        }
    }
    $.$mol_dom_render_attributes = $mol_dom_render_attributes;
    function $mol_dom_render_styles(el, styles) {
        for (var name_2 in styles) {
            var val = styles[name_2];
            var style = el.style;
            var cur = style[name_2];
            if (typeof val === 'number') {
                if (parseFloat(cur) == val)
                    continue;
                style[name_2] = val + "px";
            }
            if (cur !== val)
                style[name_2] = val;
        }
    }
    $.$mol_dom_render_styles = $mol_dom_render_styles;
    function $mol_dom_render_events(el, events) {
        for (var name_3 in events) {
            el.addEventListener(name_3, events[name_3], { passive: false });
        }
    }
    $.$mol_dom_render_events = $mol_dom_render_events;
    function $mol_dom_render_events_async(el, events) {
        for (var name_4 in events) {
            el.addEventListener(name_4, events[name_4], { passive: true });
        }
    }
    $.$mol_dom_render_events_async = $mol_dom_render_events_async;
    function $mol_dom_render_events_detach(el, events) {
        for (var name_5 in events) {
            el.removeEventListener(name_5, events[name_5], { passive: false });
        }
    }
    $.$mol_dom_render_events_detach = $mol_dom_render_events_detach;
})($ || ($ = {}));
//render.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $$;
    (function ($$_1) {
        var $$;
    })($$ = $.$$ || ($.$$ = {}));
    var $mol;
    (function ($mol_1) {
        var $mol;
    })($mol = $.$mol || ($.$mol = {}));
    function $mol_view_visible_width() {
        return $.$mol_window.size().width;
    }
    $.$mol_view_visible_width = $mol_view_visible_width;
    function $mol_view_visible_height() {
        return $.$mol_window.size().height;
    }
    $.$mol_view_visible_height = $mol_view_visible_height;
    function $mol_view_state_key(suffix) {
        return suffix;
    }
    $.$mol_view_state_key = $mol_view_state_key;
    var $mol_view = (function (_super) {
        __extends($mol_view, _super);
        function $mol_view() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_view.Root = function (id) {
            return new this;
        };
        $mol_view.prototype.title = function () {
            return this.Class().toString();
        };
        $mol_view.prototype.focused = function (next) {
            var node = this.dom_node();
            var value = $.$mol_view_selection.focused(next === undefined ? undefined : next ? [node] : []);
            return value.indexOf(node) !== -1;
        };
        $mol_view.prototype.context = function (next) {
            return next || $;
        };
        Object.defineProperty($mol_view.prototype, "$", {
            get: function () {
                return this.context();
            },
            set: function (next) {
                this.context(next);
            },
            enumerable: true,
            configurable: true
        });
        $mol_view.prototype.context_sub = function () {
            return this.context();
        };
        $mol_view.prototype.state_key = function (suffix) {
            if (suffix === void 0) { suffix = ''; }
            return this.$.$mol_view_state_key(suffix);
        };
        $mol_view.prototype.dom_name = function () {
            return this.constructor.toString().replace('$', '');
        };
        $mol_view.prototype.dom_name_space = function () { return 'http://www.w3.org/1999/xhtml'; };
        $mol_view.prototype.sub = function () {
            return null;
        };
        $mol_view.prototype.sub_visible = function () {
            var sub = this.sub();
            if (!sub)
                return sub;
            var context = this.context_sub();
            sub.forEach(function (child) {
                if (child instanceof $mol_view) {
                    child.context(context);
                }
            });
            return sub;
        };
        $mol_view.prototype.minimal_width = function () {
            var sub = this.sub();
            if (!sub)
                return 0;
            var min = 0;
            sub.forEach(function (view) {
                if (view instanceof $mol_view) {
                    min = Math.max(min, view.minimal_width());
                }
            });
            return min;
        };
        $mol_view.prototype.minimal_height = function () {
            return this.content_height();
        };
        $mol_view.prototype.content_height = function () {
            var sub = this.sub();
            if (!sub)
                return 0;
            var min = 0;
            sub.forEach(function (view) {
                if (view instanceof $mol_view) {
                    min = Math.max(min, view.minimal_height());
                }
            });
            return min;
        };
        $mol_view.prototype.dom_node = function (next) {
            var node = next || this.$.$mol_dom_context.document.createElementNS(this.dom_name_space(), this.dom_name());
            $.$mol_dom_render_attributes(node, this.attr_static());
            $.$mol_dom_render_events(node, this.event());
            $.$mol_dom_render_events_async(node, this.event_async());
            return node;
        };
        $mol_view.prototype.dom_tree = function () {
            var node = this.dom_node();
            try {
                for (var _i = 0, _a = this.plugins(); _i < _a.length; _i++) {
                    var plugin = _a[_i];
                    plugin.render();
                }
                this.render();
            }
            catch (error) {
                $.$mol_dom_render_attributes(node, { mol_view_error: error.name });
                if (error instanceof $.$mol_atom_wait)
                    return node;
                try {
                    void (node.innerText = error.message);
                }
                catch (e) { }
                if (error['$mol_atom_catched'])
                    return node;
                console.error(error);
                error['$mol_atom_catched'] = true;
            }
            return node;
        };
        $mol_view.prototype.render = function () {
            var node = this.dom_node();
            var sub = this.sub_visible();
            if (sub)
                $.$mol_dom_render_children(node, sub);
            $.$mol_dom_render_attributes(node, this.attr());
            $.$mol_dom_render_styles(node, this.style());
            $.$mol_dom_render_fields(node, this.field());
        };
        $mol_view.view_classes = function () {
            var proto = this.prototype;
            var current = proto;
            var classes = [];
            while (current) {
                classes.push(current.constructor);
                if (!(current instanceof $mol_view))
                    break;
                current = Object.getPrototypeOf(current);
            }
            return classes;
        };
        $mol_view.prototype.view_names_owned = function () {
            var names = [];
            var owner = this.object_owner();
            if (owner instanceof $mol_view) {
                var suffix = this.object_field().replace(/\(.*/, '');
                var suffix2 = '_' + suffix[0].toLowerCase() + suffix.substring(1);
                for (var _i = 0, _a = owner.constructor.view_classes(); _i < _a.length; _i++) {
                    var Class = _a[_i];
                    if (suffix in Class.prototype)
                        names.push($.$mol_func_name(Class) + suffix2);
                    else
                        break;
                }
                for (var _b = 0, _c = owner.view_names_owned(); _b < _c.length; _b++) {
                    var prefix = _c[_b];
                    names.push(prefix + suffix2);
                }
            }
            return names;
        };
        $mol_view.prototype.view_names = function () {
            var names = [];
            for (var _i = 0, _a = this.view_names_owned(); _i < _a.length; _i++) {
                var name_1 = _a[_i];
                names.push(name_1);
            }
            for (var _b = 0, _c = this.constructor.view_classes(); _b < _c.length; _b++) {
                var Class = _c[_b];
                names.push($.$mol_func_name(Class));
            }
            return names;
        };
        $mol_view.prototype.attr_static = function () {
            var attrs = {
                'mol_view_error': false,
                'id': this.toString(),
            };
            for (var _i = 0, _a = this.view_names(); _i < _a.length; _i++) {
                var name_2 = _a[_i];
                attrs[name_2.replace(/\$/g, '').toLowerCase()] = '';
            }
            return attrs;
        };
        $mol_view.prototype.attr = function () {
            return {
                'mol_view_error': false,
            };
        };
        $mol_view.prototype.style = function () {
            return {};
        };
        $mol_view.prototype.field = function () {
            return {};
        };
        $mol_view.prototype.event = function () {
            return {};
        };
        $mol_view.prototype.event_async = function () {
            return {};
        };
        $mol_view.prototype.locale_contexts = function () {
            return this['locale_contexts()'] || (this['locale_contexts()'] = this.view_names());
        };
        $mol_view.prototype.plugins = function () {
            return [];
        };
        __decorate([
            $.$mol_mem
        ], $mol_view.prototype, "focused", null);
        __decorate([
            $.$mol_mem
        ], $mol_view.prototype, "context", null);
        __decorate([
            $.$mol_mem
        ], $mol_view.prototype, "minimal_width", null);
        __decorate([
            $.$mol_mem
        ], $mol_view.prototype, "content_height", null);
        __decorate([
            $.$mol_mem
        ], $mol_view.prototype, "dom_node", null);
        __decorate([
            $.$mol_mem
        ], $mol_view.prototype, "dom_tree", null);
        __decorate([
            $.$mol_mem
        ], $mol_view.prototype, "view_names", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_view, "Root", null);
        __decorate([
            $.$mol_mem
        ], $mol_view, "view_classes", null);
        return $mol_view;
    }($.$mol_object));
    $.$mol_view = $mol_view;
})($ || ($ = {}));
//view.js.map
;
var $;
(function ($) {
    $.$mol_dom_context.document.addEventListener(window.cordova ? 'deviceready' : 'DOMContentLoaded', function (event) {
        var nodes = $.$mol_dom_context.document.querySelectorAll('[mol_view_root]');
        var _loop_1 = function (i) {
            var name_1 = nodes.item(i).getAttribute('mol_view_root');
            var View = $[name_1];
            if (!View) {
                console.error("Can not attach view. Class not found: " + name_1);
                return "continue";
            }
            var view = View.Root(i);
            view.dom_node(nodes.item(i));
            var win = new $.$mol_atom("$mol_view.Root(" + i + ")", function () {
                view.dom_tree();
                $.$mol_dom_context.document.title = view.title();
                return null;
            });
            new $.$mol_defer(function () { return win.get(); });
        };
        for (var i = nodes.length - 1; i >= 0; --i) {
            _loop_1(i);
        }
        $.$mol_defer.run();
    });
})($ || ($ = {}));
//view.web.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_view_selection = (function (_super) {
        __extends($mol_view_selection, _super);
        function $mol_view_selection() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_view_selection.focused = function (next, force) {
            var _this = this;
            if (next === undefined)
                return [];
            var node = next[0];
            new $.$mol_defer(function () {
                if (node)
                    node.focus();
                else if (_this['focused()']['value()'][0])
                    _this['focused()']['value()'][0].blur();
            });
            return undefined;
        };
        $mol_view_selection.position = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i] = arguments[_i];
            }
            if (diff.length) {
                if (!diff[0])
                    return diff[0];
                var start = diff[0].start;
                var end = diff[0].end;
                if (!(start <= end))
                    throw new Error("Wrong offsets (" + start + "," + end + ")");
                var root = $.$mol_dom_context.document.getElementById(diff[0].id);
                root.focus();
                var range = new Range;
                var cur = root.firstChild;
                while (cur !== root) {
                    while (cur.firstChild)
                        cur = cur.firstChild;
                    if (cur.nodeValue) {
                        var length = cur.nodeValue.length;
                        if (length >= start)
                            break;
                        start -= length;
                    }
                    while (!cur.nextSibling) {
                        cur = cur.parentNode;
                        if (cur === root) {
                            start = root.childNodes.length;
                            break;
                        }
                    }
                }
                range.setStart(cur, start);
                var cur = root.firstChild;
                while (cur !== root) {
                    while (cur.firstChild)
                        cur = cur.firstChild;
                    if (cur.nodeValue) {
                        var length = cur.nodeValue.length;
                        if (length >= end)
                            break;
                        end -= length;
                    }
                    while (!cur.nextSibling) {
                        cur = cur.parentNode;
                        if (cur === root) {
                            end = root.childNodes.length;
                            break;
                        }
                    }
                }
                range.setEnd(cur, end);
                var sel = $.$mol_dom_context.document.getSelection();
                sel.removeAllRanges();
                sel.addRange(range);
                return diff[0];
            }
            else {
                var sel = $.$mol_dom_context.document.getSelection();
                if (sel.rangeCount === 0)
                    return null;
                var range = sel.getRangeAt(0);
                var el = range.commonAncestorContainer;
                while (el && !el.id)
                    el = el.parentElement;
                if (!el)
                    return { id: null, start: 0, end: 0 };
                var meter = new Range;
                meter.selectNodeContents(el);
                meter.setEnd(range.startContainer, range.startOffset);
                var startOffset = meter.toString().length;
                meter.setEnd(range.endContainer, range.endOffset);
                var endOffset = meter.toString().length;
                return { id: el.id, start: startOffset, end: endOffset };
            }
        };
        $mol_view_selection.onFocus = function (event) {
            var parents = [];
            var element = event.target;
            while (element) {
                parents.push(element);
                element = element.parentNode;
            }
            this.focused(parents, $.$mol_atom_force);
        };
        $mol_view_selection.onBlur = function (event) {
            var _this = this;
            var focused = this.focused();
            setTimeout(function () {
                if (focused !== _this.focused())
                    return;
                _this.focused([], $.$mol_atom_force);
            });
        };
        __decorate([
            $.$mol_mem
        ], $mol_view_selection, "focused", null);
        __decorate([
            $.$mol_mem
        ], $mol_view_selection, "position", null);
        return $mol_view_selection;
    }($.$mol_object));
    $.$mol_view_selection = $mol_view_selection;
})($ || ($ = {}));
//selection.js.map
;
var $;
(function ($) {
    $.$mol_dom_context.document.addEventListener('selectionchange', function (event) {
        $.$mol_view_selection.position(undefined, $.$mol_atom_force);
    });
    $.$mol_dom_context.document.addEventListener('focus', function (event) { return $.$mol_view_selection.onFocus(event); }, true);
    $.$mol_dom_context.document.addEventListener('blur', function (event) { return $.$mol_view_selection.onBlur(event); }, true);
})($ || ($ = {}));
//selection.web.js.map
;
var $;
(function ($) {
    var $mol_keyboard_code;
    (function ($mol_keyboard_code) {
        $mol_keyboard_code[$mol_keyboard_code["backspace"] = 8] = "backspace";
        $mol_keyboard_code[$mol_keyboard_code["tab"] = 9] = "tab";
        $mol_keyboard_code[$mol_keyboard_code["enter"] = 13] = "enter";
        $mol_keyboard_code[$mol_keyboard_code["shift"] = 16] = "shift";
        $mol_keyboard_code[$mol_keyboard_code["ctrl"] = 17] = "ctrl";
        $mol_keyboard_code[$mol_keyboard_code["alt"] = 18] = "alt";
        $mol_keyboard_code[$mol_keyboard_code["pause"] = 19] = "pause";
        $mol_keyboard_code[$mol_keyboard_code["capsLock"] = 20] = "capsLock";
        $mol_keyboard_code[$mol_keyboard_code["escape"] = 27] = "escape";
        $mol_keyboard_code[$mol_keyboard_code["space"] = 32] = "space";
        $mol_keyboard_code[$mol_keyboard_code["pageUp"] = 33] = "pageUp";
        $mol_keyboard_code[$mol_keyboard_code["pageDown"] = 34] = "pageDown";
        $mol_keyboard_code[$mol_keyboard_code["end"] = 35] = "end";
        $mol_keyboard_code[$mol_keyboard_code["home"] = 36] = "home";
        $mol_keyboard_code[$mol_keyboard_code["left"] = 37] = "left";
        $mol_keyboard_code[$mol_keyboard_code["up"] = 38] = "up";
        $mol_keyboard_code[$mol_keyboard_code["right"] = 39] = "right";
        $mol_keyboard_code[$mol_keyboard_code["down"] = 40] = "down";
        $mol_keyboard_code[$mol_keyboard_code["insert"] = 45] = "insert";
        $mol_keyboard_code[$mol_keyboard_code["delete"] = 46] = "delete";
        $mol_keyboard_code[$mol_keyboard_code["key0"] = 48] = "key0";
        $mol_keyboard_code[$mol_keyboard_code["key1"] = 49] = "key1";
        $mol_keyboard_code[$mol_keyboard_code["key2"] = 50] = "key2";
        $mol_keyboard_code[$mol_keyboard_code["key3"] = 51] = "key3";
        $mol_keyboard_code[$mol_keyboard_code["key4"] = 52] = "key4";
        $mol_keyboard_code[$mol_keyboard_code["key5"] = 53] = "key5";
        $mol_keyboard_code[$mol_keyboard_code["key6"] = 54] = "key6";
        $mol_keyboard_code[$mol_keyboard_code["key7"] = 55] = "key7";
        $mol_keyboard_code[$mol_keyboard_code["key8"] = 56] = "key8";
        $mol_keyboard_code[$mol_keyboard_code["key9"] = 57] = "key9";
        $mol_keyboard_code[$mol_keyboard_code["A"] = 65] = "A";
        $mol_keyboard_code[$mol_keyboard_code["B"] = 66] = "B";
        $mol_keyboard_code[$mol_keyboard_code["C"] = 67] = "C";
        $mol_keyboard_code[$mol_keyboard_code["D"] = 68] = "D";
        $mol_keyboard_code[$mol_keyboard_code["E"] = 69] = "E";
        $mol_keyboard_code[$mol_keyboard_code["F"] = 70] = "F";
        $mol_keyboard_code[$mol_keyboard_code["G"] = 71] = "G";
        $mol_keyboard_code[$mol_keyboard_code["H"] = 72] = "H";
        $mol_keyboard_code[$mol_keyboard_code["I"] = 73] = "I";
        $mol_keyboard_code[$mol_keyboard_code["J"] = 74] = "J";
        $mol_keyboard_code[$mol_keyboard_code["K"] = 75] = "K";
        $mol_keyboard_code[$mol_keyboard_code["L"] = 76] = "L";
        $mol_keyboard_code[$mol_keyboard_code["M"] = 77] = "M";
        $mol_keyboard_code[$mol_keyboard_code["N"] = 78] = "N";
        $mol_keyboard_code[$mol_keyboard_code["O"] = 79] = "O";
        $mol_keyboard_code[$mol_keyboard_code["P"] = 80] = "P";
        $mol_keyboard_code[$mol_keyboard_code["Q"] = 81] = "Q";
        $mol_keyboard_code[$mol_keyboard_code["R"] = 82] = "R";
        $mol_keyboard_code[$mol_keyboard_code["S"] = 83] = "S";
        $mol_keyboard_code[$mol_keyboard_code["T"] = 84] = "T";
        $mol_keyboard_code[$mol_keyboard_code["U"] = 85] = "U";
        $mol_keyboard_code[$mol_keyboard_code["V"] = 86] = "V";
        $mol_keyboard_code[$mol_keyboard_code["W"] = 87] = "W";
        $mol_keyboard_code[$mol_keyboard_code["X"] = 88] = "X";
        $mol_keyboard_code[$mol_keyboard_code["Y"] = 89] = "Y";
        $mol_keyboard_code[$mol_keyboard_code["Z"] = 90] = "Z";
        $mol_keyboard_code[$mol_keyboard_code["metaLeft"] = 91] = "metaLeft";
        $mol_keyboard_code[$mol_keyboard_code["metaRight"] = 92] = "metaRight";
        $mol_keyboard_code[$mol_keyboard_code["select"] = 93] = "select";
        $mol_keyboard_code[$mol_keyboard_code["numpad0"] = 96] = "numpad0";
        $mol_keyboard_code[$mol_keyboard_code["numpad1"] = 97] = "numpad1";
        $mol_keyboard_code[$mol_keyboard_code["numpad2"] = 98] = "numpad2";
        $mol_keyboard_code[$mol_keyboard_code["numpad3"] = 99] = "numpad3";
        $mol_keyboard_code[$mol_keyboard_code["numpad4"] = 100] = "numpad4";
        $mol_keyboard_code[$mol_keyboard_code["numpad5"] = 101] = "numpad5";
        $mol_keyboard_code[$mol_keyboard_code["numpad6"] = 102] = "numpad6";
        $mol_keyboard_code[$mol_keyboard_code["numpad7"] = 103] = "numpad7";
        $mol_keyboard_code[$mol_keyboard_code["numpad8"] = 104] = "numpad8";
        $mol_keyboard_code[$mol_keyboard_code["numpad9"] = 105] = "numpad9";
        $mol_keyboard_code[$mol_keyboard_code["multiply"] = 106] = "multiply";
        $mol_keyboard_code[$mol_keyboard_code["add"] = 107] = "add";
        $mol_keyboard_code[$mol_keyboard_code["subtract"] = 109] = "subtract";
        $mol_keyboard_code[$mol_keyboard_code["decimal"] = 110] = "decimal";
        $mol_keyboard_code[$mol_keyboard_code["divide"] = 111] = "divide";
        $mol_keyboard_code[$mol_keyboard_code["F1"] = 112] = "F1";
        $mol_keyboard_code[$mol_keyboard_code["F2"] = 113] = "F2";
        $mol_keyboard_code[$mol_keyboard_code["F3"] = 114] = "F3";
        $mol_keyboard_code[$mol_keyboard_code["F4"] = 115] = "F4";
        $mol_keyboard_code[$mol_keyboard_code["F5"] = 116] = "F5";
        $mol_keyboard_code[$mol_keyboard_code["F6"] = 117] = "F6";
        $mol_keyboard_code[$mol_keyboard_code["F7"] = 118] = "F7";
        $mol_keyboard_code[$mol_keyboard_code["F8"] = 119] = "F8";
        $mol_keyboard_code[$mol_keyboard_code["F9"] = 120] = "F9";
        $mol_keyboard_code[$mol_keyboard_code["F10"] = 121] = "F10";
        $mol_keyboard_code[$mol_keyboard_code["F11"] = 122] = "F11";
        $mol_keyboard_code[$mol_keyboard_code["F12"] = 123] = "F12";
        $mol_keyboard_code[$mol_keyboard_code["numLock"] = 144] = "numLock";
        $mol_keyboard_code[$mol_keyboard_code["scrollLock"] = 145] = "scrollLock";
        $mol_keyboard_code[$mol_keyboard_code["semicolon"] = 186] = "semicolon";
        $mol_keyboard_code[$mol_keyboard_code["equals"] = 187] = "equals";
        $mol_keyboard_code[$mol_keyboard_code["comma"] = 188] = "comma";
        $mol_keyboard_code[$mol_keyboard_code["dash"] = 189] = "dash";
        $mol_keyboard_code[$mol_keyboard_code["period"] = 190] = "period";
        $mol_keyboard_code[$mol_keyboard_code["forwardSlash"] = 191] = "forwardSlash";
        $mol_keyboard_code[$mol_keyboard_code["graveAccent"] = 192] = "graveAccent";
        $mol_keyboard_code[$mol_keyboard_code["bracketOpen"] = 219] = "bracketOpen";
        $mol_keyboard_code[$mol_keyboard_code["slashBack"] = 220] = "slashBack";
        $mol_keyboard_code[$mol_keyboard_code["bracketClose"] = 221] = "bracketClose";
        $mol_keyboard_code[$mol_keyboard_code["quoteSingle"] = 222] = "quoteSingle";
    })($mol_keyboard_code = $.$mol_keyboard_code || ($.$mol_keyboard_code = {}));
})($ || ($ = {}));
//code.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_button = (function (_super) {
        __extends($mol_button, _super);
        function $mol_button() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_button.prototype.enabled = function () {
            return true;
        };
        $mol_button.prototype.minimal_height = function () {
            return 40;
        };
        $mol_button.prototype.event = function () {
            var _this = this;
            return (__assign({}, _super.prototype.event.call(this), { "click": function (event) { return _this.event_activate(event); }, "keypress": function (event) { return _this.event_key_press(event); } }));
        };
        $mol_button.prototype.event_activate = function (event, force) {
            return this.event_click(event);
        };
        $mol_button.prototype.event_click = function (event, force) {
            return (event !== void 0) ? event : null;
        };
        $mol_button.prototype.event_key_press = function (event, force) {
            return (event !== void 0) ? event : null;
        };
        $mol_button.prototype.attr = function () {
            return (__assign({}, _super.prototype.attr.call(this), { "disabled": this.disabled(), "role": "button", "tabindex": this.tab_index(), "title": this.hint() }));
        };
        $mol_button.prototype.disabled = function () {
            return false;
        };
        $mol_button.prototype.tab_index = function () {
            return 0;
        };
        $mol_button.prototype.hint = function () {
            return "";
        };
        $mol_button.prototype.sub = function () {
            return [].concat(this.title());
        };
        __decorate([
            $.$mol_mem
        ], $mol_button.prototype, "event_activate", null);
        __decorate([
            $.$mol_mem
        ], $mol_button.prototype, "event_click", null);
        __decorate([
            $.$mol_mem
        ], $mol_button.prototype, "event_key_press", null);
        return $mol_button;
    }($.$mol_view));
    $.$mol_button = $mol_button;
})($ || ($ = {}));
//button.view.tree.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var $;
(function ($) {
    var $$;
    (function ($$) {
        var $mol_button = (function (_super) {
            __extends($mol_button, _super);
            function $mol_button() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            $mol_button.prototype.disabled = function () {
                return !this.enabled();
            };
            $mol_button.prototype.event_activate = function (next) {
                if (!next)
                    return;
                if (!this.enabled())
                    return;
                this.event_click(next);
            };
            $mol_button.prototype.event_key_press = function (event) {
                if (event.keyCode === $.$mol_keyboard_code.enter) {
                    return this.event_activate(event);
                }
            };
            $mol_button.prototype.tab_index = function () {
                return this.enabled() ? _super.prototype.tab_index.call(this) : null;
            };
            return $mol_button;
        }($.$mol_button));
        $$.$mol_button = $mol_button;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//button.view.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var $;
(function ($) {
    var $mol_button_typed = (function (_super) {
        __extends($mol_button_typed, _super);
        function $mol_button_typed() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return $mol_button_typed;
    }($.$mol_button));
    $.$mol_button_typed = $mol_button_typed;
})($ || ($ = {}));
(function ($) {
    var $mol_button_major = (function (_super) {
        __extends($mol_button_major, _super);
        function $mol_button_major() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return $mol_button_major;
    }($.$mol_button_typed));
    $.$mol_button_major = $mol_button_major;
})($ || ($ = {}));
(function ($) {
    var $mol_button_minor = (function (_super) {
        __extends($mol_button_minor, _super);
        function $mol_button_minor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return $mol_button_minor;
    }($.$mol_button_typed));
    $.$mol_button_minor = $mol_button_minor;
})($ || ($ = {}));
(function ($) {
    var $mol_button_danger = (function (_super) {
        __extends($mol_button_danger, _super);
        function $mol_button_danger() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return $mol_button_danger;
    }($.$mol_button_typed));
    $.$mol_button_danger = $mol_button_danger;
})($ || ($ = {}));
//button_types.view.tree.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_scroll = (function (_super) {
        __extends($mol_scroll, _super);
        function $mol_scroll() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_scroll.prototype.minimal_height = function () {
            return 0;
        };
        $mol_scroll.prototype.field = function () {
            return (__assign({}, _super.prototype.field.call(this), { "scrollTop": this.scroll_top(), "scrollLeft": this.scroll_left(), "scrollBottom": this.scroll_bottom(), "scrollRight": this.scroll_right() }));
        };
        $mol_scroll.prototype.scroll_top = function (val, force) {
            return (val !== void 0) ? val : 0;
        };
        $mol_scroll.prototype.scroll_left = function (val, force) {
            return (val !== void 0) ? val : 0;
        };
        $mol_scroll.prototype.scroll_bottom = function (val, force) {
            return (val !== void 0) ? val : 0;
        };
        $mol_scroll.prototype.scroll_right = function (val, force) {
            return (val !== void 0) ? val : 0;
        };
        $mol_scroll.prototype.event_async = function () {
            var _this = this;
            return (__assign({}, _super.prototype.event_async.call(this), { "scroll": function (event) { return _this.event_scroll(event); } }));
        };
        $mol_scroll.prototype.event_scroll = function (event, force) {
            return (event !== void 0) ? event : null;
        };
        $mol_scroll.prototype.Strut = function () {
            var _this = this;
            return (function (obj) {
                obj.style = function () { return ({
                    "transform": _this.strut_transform(),
                }); };
                return obj;
            })(new this.$.$mol_view);
        };
        $mol_scroll.prototype.strut_transform = function () {
            return "";
        };
        __decorate([
            $.$mol_mem
        ], $mol_scroll.prototype, "scroll_top", null);
        __decorate([
            $.$mol_mem
        ], $mol_scroll.prototype, "scroll_left", null);
        __decorate([
            $.$mol_mem
        ], $mol_scroll.prototype, "scroll_bottom", null);
        __decorate([
            $.$mol_mem
        ], $mol_scroll.prototype, "scroll_right", null);
        __decorate([
            $.$mol_mem
        ], $mol_scroll.prototype, "event_scroll", null);
        __decorate([
            $.$mol_mem
        ], $mol_scroll.prototype, "Strut", null);
        return $mol_scroll;
    }($.$mol_view));
    $.$mol_scroll = $mol_scroll;
})($ || ($ = {}));
//scroll.view.tree.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $$;
    (function ($$) {
        function $mol_scroll_top() {
            return 0;
        }
        $$.$mol_scroll_top = $mol_scroll_top;
        function $mol_scroll_left() {
            return 0;
        }
        $$.$mol_scroll_left = $mol_scroll_left;
        function $mol_scroll_moving() {
            return false;
        }
        $$.$mol_scroll_moving = $mol_scroll_moving;
        var $mol_scroll = (function (_super) {
            __extends($mol_scroll, _super);
            function $mol_scroll() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._moving_task_timer = 0;
                return _this;
            }
            $mol_scroll.prototype.scroll_bottom = function (next) {
                return next || 0;
            };
            $mol_scroll.prototype.scroll_right = function (next) {
                return next || 0;
            };
            $mol_scroll.prototype.event_scroll = function (next) {
                var _this = this;
                this.moving(true);
                this.moving_task_stop();
                new $.$mol_defer(function () {
                    var el = _this.dom_node();
                    var top = Math.max(0, el.scrollTop);
                    var left = Math.max(0, el.scrollLeft);
                    _this.scroll_top(top);
                    _this.scroll_left(left);
                    _this.scroll_bottom(Math.max(0, el.scrollHeight - top - el.offsetHeight));
                    _this.scroll_right(Math.max(0, el.scrollWidth - left - el.offsetWidth));
                });
            };
            $mol_scroll.prototype.event_repos = function (next) {
                var _this = this;
                new $.$mol_defer(function () {
                    var el = _this.dom_node();
                    _this.scroll_bottom(Math.max(0, el.scrollHeight - _this.scroll_top() - el.offsetHeight));
                    _this.scroll_right(Math.max(0, el.scrollWidth - _this.scroll_left() - el.offsetWidth));
                });
            };
            $mol_scroll.prototype.moving_task_stop = function () {
                var _this = this;
                clearTimeout(this._moving_task_timer);
                this._moving_task_timer = setTimeout(function () { return _this.moving(false); }, 50);
            };
            $mol_scroll.prototype.moving = function (next) {
                return next || false;
            };
            $mol_scroll.prototype.context_sub = function () {
                var _this = this;
                var context = this.context();
                var subContext = Object.create(context);
                subContext.$mol_view_visible_height = function () {
                    var sizeWin = $.$mol_window.size();
                    var limit = context.$mol_view_visible_height();
                    return _this.scroll_top() + Math.min(sizeWin.height, limit);
                };
                subContext.$mol_view_visible_width = function () {
                    var sizeWin = $.$mol_window.size();
                    var limit = context.$mol_view_visible_width();
                    return _this.scroll_left() + Math.min(sizeWin.width, limit);
                };
                subContext.$mol_scroll_top = function () { return _this.scroll_top(); };
                subContext.$mol_scroll_left = function () { return _this.scroll_left(); };
                subContext.$mol_scroll_moving = function () { return _this.moving(); };
                return subContext;
            };
            $mol_scroll.prototype.strut_transform = function () {
                return "translate3d( 0 , " + this.content_height() + "px , 0 )";
            };
            $mol_scroll.prototype.sub_visible = function () {
                var sub = [
                    this.Strut()
                ].concat(this.sub());
                var context = this.context_sub();
                sub.forEach(function (child) {
                    if (child instanceof $.$mol_view) {
                        child.context(context);
                    }
                });
                return sub;
            };
            __decorate([
                $.$mol_mem
            ], $mol_scroll.prototype, "scroll_bottom", null);
            __decorate([
                $.$mol_mem
            ], $mol_scroll.prototype, "scroll_right", null);
            __decorate([
                $.$mol_mem
            ], $mol_scroll.prototype, "moving", null);
            __decorate([
                $.$mol_mem
            ], $mol_scroll.prototype, "context_sub", null);
            return $mol_scroll;
        }($.$mol_scroll));
        $$.$mol_scroll = $mol_scroll;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//scroll.view.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_state_session = (function (_super) {
        __extends($mol_state_session, _super);
        function $mol_state_session() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_state_session.native = function () {
            if (this['native()'])
                return this['native()'];
            check: try {
                var native = $.$mol_dom_context.sessionStorage;
                if (!native)
                    break check;
                native.setItem('', '');
                native.removeItem('');
                return this['native()'] = native;
            }
            catch (error) {
                console.warn(error);
            }
            return this['native()'] = {
                getItem: function (key) {
                    return this[':' + key];
                },
                setItem: function (key, value) {
                    this[':' + key] = value;
                },
                removeItem: function (key) {
                    this[':' + key] = void 0;
                }
            };
        };
        $mol_state_session.value = function (key, next) {
            if (next === void 0)
                return JSON.parse(this.native().getItem(key) || 'null');
            if (next === null)
                this.native().removeItem(key);
            else
                this.native().setItem(key, JSON.stringify(next));
            return next;
        };
        $mol_state_session.prototype.prefix = function () { return ''; };
        $mol_state_session.prototype.value = function (key, next) {
            return $mol_state_session.value(this.prefix() + '.' + key, next);
        };
        __decorate([
            $.$mol_mem_key
        ], $mol_state_session, "value", null);
        return $mol_state_session;
    }($.$mol_object));
    $.$mol_state_session = $mol_state_session;
})($ || ($ = {}));
//session.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_page = (function (_super) {
        __extends($mol_page, _super);
        function $mol_page() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_page.prototype.sub = function () {
            return [].concat(this.Head(), this.Body(), this.Foot());
        };
        $mol_page.prototype.Head = function () {
            var _this = this;
            return (function (obj) {
                obj.sub = function () { return _this.head(); };
                return obj;
            })(new this.$.$mol_view);
        };
        $mol_page.prototype.head = function () {
            return [].concat(this.Title(), this.Tools());
        };
        $mol_page.prototype.Title = function () {
            var _this = this;
            return (function (obj) {
                obj.sub = function () { return [].concat(_this.title()); };
                obj.event_click = function (val) { return _this.event_top(val); };
                return obj;
            })(new this.$.$mol_button);
        };
        $mol_page.prototype.event_top = function (val, force) {
            return (val !== void 0) ? val : null;
        };
        $mol_page.prototype.Tools = function () {
            var _this = this;
            return (function (obj) {
                obj.sub = function () { return _this.tools(); };
                return obj;
            })(new this.$.$mol_view);
        };
        $mol_page.prototype.tools = function () {
            return [];
        };
        $mol_page.prototype.Body = function () {
            var _this = this;
            return (function (obj) {
                obj.scroll_top = function (val) { return _this.body_scroll_top(val); };
                obj.sub = function () { return _this.body(); };
                return obj;
            })(new this.$.$mol_scroll);
        };
        $mol_page.prototype.body_scroll_top = function (val, force) {
            return (val !== void 0) ? val : 0;
        };
        $mol_page.prototype.body = function () {
            return [];
        };
        $mol_page.prototype.Foot = function () {
            var _this = this;
            return (function (obj) {
                obj.sub = function () { return _this.foot(); };
                return obj;
            })(new this.$.$mol_view);
        };
        $mol_page.prototype.foot = function () {
            return [];
        };
        __decorate([
            $.$mol_mem
        ], $mol_page.prototype, "Head", null);
        __decorate([
            $.$mol_mem
        ], $mol_page.prototype, "Title", null);
        __decorate([
            $.$mol_mem
        ], $mol_page.prototype, "event_top", null);
        __decorate([
            $.$mol_mem
        ], $mol_page.prototype, "Tools", null);
        __decorate([
            $.$mol_mem
        ], $mol_page.prototype, "Body", null);
        __decorate([
            $.$mol_mem
        ], $mol_page.prototype, "body_scroll_top", null);
        __decorate([
            $.$mol_mem
        ], $mol_page.prototype, "Foot", null);
        return $mol_page;
    }($.$mol_view));
    $.$mol_page = $mol_page;
})($ || ($ = {}));
//page.view.tree.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var $;
(function ($) {
    var $$;
    (function ($$) {
        var $mol_page = (function (_super) {
            __extends($mol_page, _super);
            function $mol_page() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            $mol_page.prototype.body_scroll_top = function (next) {
                return $.$mol_state_session.value(this + ".body_scroll_top()", next) || 0;
            };
            $mol_page.prototype.head = function () {
                return (this.title() ? [this.Title()] : []).concat(this.tools().length > 0 ? [this.Tools()] : []);
            };
            return $mol_page;
        }($.$mol_page));
        $$.$mol_page = $mol_page;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//page.view.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_state_local = (function (_super) {
        __extends($mol_state_local, _super);
        function $mol_state_local() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_state_local.native = function () {
            if (this['native()'])
                return this['native()'];
            check: try {
                var native = $.$mol_dom_context.localStorage;
                if (!native)
                    break check;
                native.setItem('', '');
                native.removeItem('');
                return this['native()'] = native;
            }
            catch (error) {
                console.warn(error);
            }
            return this['native()'] = {
                getItem: function (key) {
                    return this[':' + key];
                },
                setItem: function (key, value) {
                    this[':' + key] = value;
                },
                removeItem: function (key) {
                    this[':' + key] = void 0;
                }
            };
        };
        $mol_state_local.value = function (key, next, force) {
            if (next === void 0)
                return JSON.parse(this.native().getItem(key) || 'null');
            if (next === null)
                this.native().removeItem(key);
            else
                this.native().setItem(key, JSON.stringify(next));
            return next;
        };
        $mol_state_local.prototype.prefix = function () { return ''; };
        $mol_state_local.prototype.value = function (key, next) {
            return $mol_state_local.value(this.prefix() + '.' + key, next);
        };
        __decorate([
            $.$mol_mem_key
        ], $mol_state_local, "value", null);
        return $mol_state_local;
    }($.$mol_object));
    $.$mol_state_local = $mol_state_local;
})($ || ($ = {}));
//local.js.map
;
var $;
(function ($) {
    window.addEventListener('storage', function (event) {
        $.$mol_state_local.value(event.key, void 0, $.$mol_atom_force);
    });
})($ || ($ = {}));
//local.web.js.map
;
var $;
(function ($) {
    function $mol_const(value) {
        var getter = (function () { return value; });
        getter['()'] = value;
        return getter;
    }
    $.$mol_const = $mol_const;
})($ || ($ = {}));
//const.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_http = (function (_super) {
        __extends($mol_http, _super);
        function $mol_http() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_http.resource = function (uri) {
            var resolver = $.$mol_dom_context.document.createElement('a');
            resolver.href = uri;
            return this.resource_absolute(resolver.href);
        };
        $mol_http.resource_absolute = function (uri) {
            return $mol_http.make({
                uri: $.$mol_const(uri)
            });
        };
        $mol_http.prototype.uri = function () { return ''; };
        $mol_http.prototype.method_get = function () { return 'Get'; };
        $mol_http.prototype.method_put = function () { return 'Put'; };
        $mol_http.prototype.credentials = function () {
            return null;
        };
        $mol_http.prototype.headers = function () {
            return {};
        };
        $mol_http.prototype.request = function () {
            var _this = this;
            if (this['request()'])
                return this['request()'];
            var next = this['request()'] = new $.$mol_dom_context.XMLHttpRequest;
            next.withCredentials = Boolean(this.credentials());
            next.onload = function (event) {
                if ((next.status === 0) || (Math.floor(next.status / 100) === 2)) {
                    _this.response(next, $.$mol_atom_force);
                }
                else {
                    _this.response(new Error(next.statusText || next.responseText), $.$mol_atom_force);
                }
            };
            next.onerror = function (event) {
                _this.response(event.error || new Error('Unknown HTTP error'), $.$mol_atom_force);
            };
            return next;
        };
        $mol_http.prototype.destroyed = function (next) {
            if (next) {
                var native = this['request()'];
                if (native)
                    native.abort();
            }
            return _super.prototype.destroyed.call(this, next);
        };
        $mol_http.prototype.response = function (next, force) {
            var creds = this.credentials();
            var native = this.request();
            var method = (next === void 0) ? this.method_get() : this.method_put();
            var uri = this.uri();
            native.open(method, uri, true, creds && creds.login, creds && creds.password);
            var headers = this.headers();
            for (var name_1 in headers)
                native.setRequestHeader(name_1, headers[name_1]);
            native.send.apply(native, next || []);
            throw new $.$mol_atom_wait(method + " " + uri);
        };
        $mol_http.prototype.text = function (next, force) {
            return this.response(next, force).responseText;
        };
        $mol_http.prototype.json = function (next, force) {
            var next2 = next && JSON.stringify(next, null, '\t');
            return JSON.parse(this.text(next2, force));
        };
        __decorate([
            $.$mol_mem
        ], $mol_http.prototype, "response", null);
        __decorate([
            $.$mol_mem
        ], $mol_http.prototype, "json", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_http, "resource_absolute", null);
        return $mol_http;
    }($.$mol_object));
    $.$mol_http = $mol_http;
})($ || ($ = {}));
//http.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_http_resource = (function (_super) {
        __extends($mol_http_resource, _super);
        function $mol_http_resource() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_http_resource.item = function (uri) {
            return $.$mol_http.resource(uri);
        };
        __decorate([
            $.$mol_deprecated('Use $mol_http.resource insted.')
        ], $mol_http_resource, "item", null);
        return $mol_http_resource;
    }($.$mol_http));
    $.$mol_http_resource = $mol_http_resource;
    var $mol_http_resource_json = (function () {
        function $mol_http_resource_json() {
        }
        $mol_http_resource_json.item = function (uri) {
            return $.$mol_http.resource(uri);
        };
        __decorate([
            $.$mol_deprecated('Use $mol_http.resource insted.')
        ], $mol_http_resource_json, "item", null);
        return $mol_http_resource_json;
    }());
    $.$mol_http_resource_json = $mol_http_resource_json;
})($ || ($ = {}));
//resource.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_file = (function (_super) {
        __extends($mol_file, _super);
        function $mol_file() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_file.absolute = function (path) {
            return $mol_file.make({
                path: $.$mol_const(path)
            });
        };
        $mol_file.relative = function (path) {
            var resolver = $.$mol_dom_context.document.createElement('a');
            resolver.href = path;
            return this.absolute(resolver.href);
        };
        $mol_file.prototype.path = function () {
            return '.';
        };
        $mol_file.prototype.parent = function () {
            return this.resolve('..');
        };
        $mol_file.prototype.name = function () {
            return this.path().replace(/^.*\//, '');
        };
        $mol_file.prototype.ext = function () {
            var match = /((?:\.\w+)+)$/.exec(this.path());
            return match && match[1].substring(1);
        };
        $mol_file.prototype.content = function (next, force) {
            return $.$mol_http.resource(this.path()).text(next);
        };
        $mol_file.prototype.resolve = function (path) {
            var res = this.path() + '/' + path;
            while (true) {
                var prev = res;
                res = res.replace(/\/[^\/.]+\/\.\.\//, '/');
                if (prev === res)
                    break;
            }
            return this.Class().absolute(res);
        };
        $mol_file.prototype.relate = function (base) {
            if (base === void 0) { base = this.Class().relative('.'); }
            throw new Error('Not implemented yet');
        };
        __decorate([
            $.$mol_mem
        ], $mol_file.prototype, "content", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_file, "absolute", null);
        return $mol_file;
    }($.$mol_object));
    $.$mol_file = $mol_file;
})($ || ($ = {}));
//file.web.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_locale = (function (_super) {
        __extends($mol_locale, _super);
        function $mol_locale() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_locale.lang_default = function () {
            return 'en';
        };
        $mol_locale.lang = function (next) {
            return $.$mol_state_local.value('locale', next) || $.$mol_dom_context.navigator.language.replace(/-.*/, '') || this.lang_default();
        };
        $mol_locale.source = function (lang) {
            return JSON.parse($.$mol_file.relative("-/web.locale=" + lang + ".json").content());
        };
        $mol_locale.texts = function (next) {
            if (next)
                return next;
            var lang = this.lang();
            try {
                return this.source(lang).valueOf();
            }
            catch (error) {
                var def = this.lang_default();
                if (lang === def)
                    throw error;
                return this.source(def);
            }
        };
        $mol_locale.text = function (contexts, key) {
            var texts = this.texts();
            for (var i = 0; i < contexts.length; ++i) {
                var text = texts[contexts[i] + "_" + key];
                if (text)
                    return text;
            }
            console.warn('Locale text not found: ', "(" + contexts.join('|') + ")_" + key);
            return "<" + key + ">";
        };
        __decorate([
            $.$mol_mem
        ], $mol_locale, "lang_default", null);
        __decorate([
            $.$mol_mem
        ], $mol_locale, "lang", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_locale, "source", null);
        __decorate([
            $.$mol_mem
        ], $mol_locale, "texts", null);
        return $mol_locale;
    }($.$mol_object));
    $.$mol_locale = $mol_locale;
})($ || ($ = {}));
//locale.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var $;
(function ($) {
    var $mol_bar = (function (_super) {
        __extends($mol_bar, _super);
        function $mol_bar() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return $mol_bar;
    }($.$mol_view));
    $.$mol_bar = $mol_bar;
})($ || ($ = {}));
//bar.view.tree.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_state_time = (function (_super) {
        __extends($mol_state_time, _super);
        function $mol_state_time() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_state_time.now = function (precision, next, force) {
            var _this = this;
            if (precision > 0) {
                setTimeout(function () { return _this.now(precision, undefined, $.$mol_atom_force); }, precision);
            }
            else {
                requestAnimationFrame(function () { return _this.now(precision, undefined, $.$mol_atom_force); });
            }
            return Date.now();
        };
        __decorate([
            $.$mol_mem_key
        ], $mol_state_time, "now", null);
        return $mol_state_time;
    }($.$mol_object));
    $.$mol_state_time = $mol_state_time;
})($ || ($ = {}));
//time.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_meter = (function (_super) {
        __extends($mol_meter, _super);
        function $mol_meter() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_meter.prototype.width = function (val, force) {
            return (val !== void 0) ? val : 0;
        };
        $mol_meter.prototype.height = function (val, force) {
            return (val !== void 0) ? val : 0;
        };
        $mol_meter.prototype.left = function (val, force) {
            return (val !== void 0) ? val : 0;
        };
        $mol_meter.prototype.right = function (val, force) {
            return (val !== void 0) ? val : 0;
        };
        $mol_meter.prototype.bottom = function (val, force) {
            return (val !== void 0) ? val : 0;
        };
        $mol_meter.prototype.top = function (val, force) {
            return (val !== void 0) ? val : 0;
        };
        __decorate([
            $.$mol_mem
        ], $mol_meter.prototype, "width", null);
        __decorate([
            $.$mol_mem
        ], $mol_meter.prototype, "height", null);
        __decorate([
            $.$mol_mem
        ], $mol_meter.prototype, "left", null);
        __decorate([
            $.$mol_mem
        ], $mol_meter.prototype, "right", null);
        __decorate([
            $.$mol_mem
        ], $mol_meter.prototype, "bottom", null);
        __decorate([
            $.$mol_mem
        ], $mol_meter.prototype, "top", null);
        return $mol_meter;
    }($.$mol_view));
    $.$mol_meter = $mol_meter;
})($ || ($ = {}));
//meter.view.tree.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $$;
    (function ($$) {
        var $mol_meter = (function (_super) {
            __extends($mol_meter, _super);
            function $mol_meter() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            $mol_meter.prototype.dom_node = function () {
                return this.object_owner().dom_node();
            };
            $mol_meter.prototype.rect = function () {
                if (this.dom_node() !== $.$mol_dom_context.document.body) {
                    $.$mol_state_time.now();
                    var node = this.dom_node();
                    try {
                        return node.getBoundingClientRect();
                    }
                    catch (error) {
                    }
                }
                var size = $.$mol_window.size();
                return {
                    left: 0,
                    top: 0,
                    right: size.width,
                    bottom: size.height,
                    width: size.width,
                    height: size.height,
                };
            };
            $mol_meter.prototype.top = function () {
                return this.rect().top;
            };
            $mol_meter.prototype.bottom = function () {
                return this.rect().bottom;
            };
            $mol_meter.prototype.left = function () {
                return this.rect().left;
            };
            $mol_meter.prototype.right = function () {
                return this.rect().right;
            };
            $mol_meter.prototype.width = function () {
                return this.rect().width;
            };
            $mol_meter.prototype.height = function () {
                return this.rect().height;
            };
            __decorate([
                $.$mol_mem
            ], $mol_meter.prototype, "rect", null);
            __decorate([
                $.$mol_mem
            ], $mol_meter.prototype, "top", null);
            __decorate([
                $.$mol_mem
            ], $mol_meter.prototype, "bottom", null);
            __decorate([
                $.$mol_mem
            ], $mol_meter.prototype, "left", null);
            __decorate([
                $.$mol_mem
            ], $mol_meter.prototype, "right", null);
            __decorate([
                $.$mol_mem
            ], $mol_meter.prototype, "width", null);
            __decorate([
                $.$mol_mem
            ], $mol_meter.prototype, "height", null);
            return $mol_meter;
        }($.$mol_meter));
        $$.$mol_meter = $mol_meter;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//meter.view.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_pop = (function (_super) {
        __extends($mol_pop, _super);
        function $mol_pop() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_pop.prototype.showed = function (val, force) {
            return (val !== void 0) ? val : false;
        };
        $mol_pop.prototype.plugins = function () {
            return [].concat(this.Meter());
        };
        $mol_pop.prototype.top = function () {
            return this.Meter().top();
        };
        $mol_pop.prototype.bottom = function () {
            return this.Meter().bottom();
        };
        $mol_pop.prototype.left = function () {
            return this.Meter().left();
        };
        $mol_pop.prototype.right = function () {
            return this.Meter().right();
        };
        $mol_pop.prototype.Meter = function () {
            return (function (obj) {
                return obj;
            })(new this.$.$mol_meter);
        };
        $mol_pop.prototype.sub = function () {
            return [].concat(this.Anchor(), this.Bubble());
        };
        $mol_pop.prototype.Anchor = function () {
            return null;
        };
        $mol_pop.prototype.Bubble = function () {
            var _this = this;
            return (function (obj) {
                obj.align = function () { return _this.align(); };
                obj.content = function () { return _this.bubble_content(); };
                obj.height_max = function () { return _this.height_max(); };
                return obj;
            })(new this.$.$mol_pop_bubble);
        };
        $mol_pop.prototype.align = function () {
            return "bottom_center";
        };
        $mol_pop.prototype.bubble_content = function () {
            return [];
        };
        $mol_pop.prototype.height_max = function () {
            return 9999;
        };
        __decorate([
            $.$mol_mem
        ], $mol_pop.prototype, "showed", null);
        __decorate([
            $.$mol_mem
        ], $mol_pop.prototype, "Meter", null);
        __decorate([
            $.$mol_mem
        ], $mol_pop.prototype, "Bubble", null);
        return $mol_pop;
    }($.$mol_view));
    $.$mol_pop = $mol_pop;
})($ || ($ = {}));
(function ($) {
    var $mol_pop_bubble = (function (_super) {
        __extends($mol_pop_bubble, _super);
        function $mol_pop_bubble() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_pop_bubble.prototype.sub = function () {
            return this.content();
        };
        $mol_pop_bubble.prototype.content = function () {
            return [];
        };
        $mol_pop_bubble.prototype.style = function () {
            return (__assign({}, _super.prototype.style.call(this), { "maxHeight": this.height_max() }));
        };
        $mol_pop_bubble.prototype.height_max = function () {
            return 9999;
        };
        $mol_pop_bubble.prototype.attr = function () {
            return (__assign({}, _super.prototype.attr.call(this), { "mol_pop_align": this.align(), "tabindex": 0 }));
        };
        $mol_pop_bubble.prototype.align = function () {
            return "";
        };
        return $mol_pop_bubble;
    }($.$mol_scroll));
    $.$mol_pop_bubble = $mol_pop_bubble;
})($ || ($ = {}));
//pop.view.tree.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var $;
(function ($) {
    var $$;
    (function ($$) {
        var $mol_pop = (function (_super) {
            __extends($mol_pop, _super);
            function $mol_pop() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            $mol_pop.prototype.sub = function () {
                return [
                    this.Anchor()
                ].concat(this.showed() ? [this.Bubble()] : []);
            };
            $mol_pop.prototype.height_max = function () {
                return this.$.$mol_window.size().height * 0.33;
            };
            $mol_pop.prototype.align = function () {
                var viewport = this.$.$mol_window.size();
                var vert = this.top() > (viewport.height - this.bottom()) ? 'top' : 'bottom';
                var hor = this.left() > (viewport.width - this.right()) ? 'left' : 'right';
                return vert + "_" + hor;
            };
            return $mol_pop;
        }($.$mol_pop));
        $$.$mol_pop = $mol_pop;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//pop.view.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_dimmer = (function (_super) {
        __extends($mol_dimmer, _super);
        function $mol_dimmer() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_dimmer.prototype.haystack = function () {
            return "";
        };
        $mol_dimmer.prototype.needle = function () {
            return "";
        };
        $mol_dimmer.prototype.sub = function () {
            return this.parts();
        };
        $mol_dimmer.prototype.parts = function () {
            return [];
        };
        $mol_dimmer.prototype.Low = function (id) {
            var _this = this;
            return (function (obj) {
                obj.sub = function () { return [].concat(_this.string(id)); };
                return obj;
            })(new this.$.$mol_view);
        };
        $mol_dimmer.prototype.string = function (id) {
            return "";
        };
        __decorate([
            $.$mol_mem_key
        ], $mol_dimmer.prototype, "Low", null);
        return $mol_dimmer;
    }($.$mol_view));
    $.$mol_dimmer = $mol_dimmer;
})($ || ($ = {}));
//dimmer.view.tree.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $$;
    (function ($$) {
        var $mol_dimmer = (function (_super) {
            __extends($mol_dimmer, _super);
            function $mol_dimmer() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            $mol_dimmer.prototype.parts = function () {
                var needle = this.needle();
                if (!needle)
                    return [this.haystack()];
                var chunks = [];
                var strings = this.strings();
                for (var index = 0; index < strings.length; index++) {
                    if (strings[index] === '')
                        continue;
                    chunks.push((index % 2) ? strings[index] : this.Low(index));
                }
                return chunks;
            };
            $mol_dimmer.prototype.strings = function () {
                return this.haystack().split(new RegExp("(" + this.needle() + ")", 'gi'));
            };
            $mol_dimmer.prototype.string = function (index) {
                return this.strings()[index];
            };
            __decorate([
                $.$mol_mem
            ], $mol_dimmer.prototype, "strings", null);
            return $mol_dimmer;
        }($.$mol_dimmer));
        $$.$mol_dimmer = $mol_dimmer;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//dimmer.view.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var $;
(function ($) {
    var $mol_plugin = (function (_super) {
        __extends($mol_plugin, _super);
        function $mol_plugin() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return $mol_plugin;
    }($.$mol_view));
    $.$mol_plugin = $mol_plugin;
})($ || ($ = {}));
//plugin.view.tree.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var $;
(function ($) {
    var $$;
    (function ($$) {
        var $mol_plugin = (function (_super) {
            __extends($mol_plugin, _super);
            function $mol_plugin() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            $mol_plugin.prototype.dom_node = function () {
                if (this['dom_node()'])
                    return this['dom_node()'];
                var node = this.object_owner().dom_node();
                $.$mol_dom_render_attributes(node, this.attr_static());
                $.$mol_dom_render_events(node, this.event());
                $.$mol_dom_render_events_async(node, this.event_async());
                return this['dom_node()'] = node;
            };
            return $mol_plugin;
        }($.$mol_plugin));
        $$.$mol_plugin = $mol_plugin;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//plugin.view.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_nav = (function (_super) {
        __extends($mol_nav, _super);
        function $mol_nav() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_nav.prototype.cycle = function (val, force) {
            return (val !== void 0) ? val : false;
        };
        $mol_nav.prototype.keys_x = function (val, force) {
            return (val !== void 0) ? val : [];
        };
        $mol_nav.prototype.keys_y = function (val, force) {
            return (val !== void 0) ? val : [];
        };
        $mol_nav.prototype.current_x = function (val, force) {
            return (val !== void 0) ? val : "";
        };
        $mol_nav.prototype.current_y = function (val, force) {
            return (val !== void 0) ? val : "";
        };
        $mol_nav.prototype.event_up = function (event, force) {
            return (event !== void 0) ? event : null;
        };
        $mol_nav.prototype.event_down = function (event, force) {
            return (event !== void 0) ? event : null;
        };
        $mol_nav.prototype.event_left = function (event, force) {
            return (event !== void 0) ? event : null;
        };
        $mol_nav.prototype.event_right = function (event, force) {
            return (event !== void 0) ? event : null;
        };
        $mol_nav.prototype.event = function () {
            var _this = this;
            return (__assign({}, _super.prototype.event.call(this), { "keydown": function (event) { return _this.event_key(event); } }));
        };
        $mol_nav.prototype.event_key = function (event, force) {
            return (event !== void 0) ? event : null;
        };
        __decorate([
            $.$mol_mem
        ], $mol_nav.prototype, "cycle", null);
        __decorate([
            $.$mol_mem
        ], $mol_nav.prototype, "keys_x", null);
        __decorate([
            $.$mol_mem
        ], $mol_nav.prototype, "keys_y", null);
        __decorate([
            $.$mol_mem
        ], $mol_nav.prototype, "current_x", null);
        __decorate([
            $.$mol_mem
        ], $mol_nav.prototype, "current_y", null);
        __decorate([
            $.$mol_mem
        ], $mol_nav.prototype, "event_up", null);
        __decorate([
            $.$mol_mem
        ], $mol_nav.prototype, "event_down", null);
        __decorate([
            $.$mol_mem
        ], $mol_nav.prototype, "event_left", null);
        __decorate([
            $.$mol_mem
        ], $mol_nav.prototype, "event_right", null);
        __decorate([
            $.$mol_mem
        ], $mol_nav.prototype, "event_key", null);
        return $mol_nav;
    }($.$mol_plugin));
    $.$mol_nav = $mol_nav;
})($ || ($ = {}));
//nav.view.tree.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var $;
(function ($) {
    var $$;
    (function ($$) {
        var $mol_nav = (function (_super) {
            __extends($mol_nav, _super);
            function $mol_nav() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            $mol_nav.prototype.event_key = function (event) {
                if (event.defaultPrevented)
                    return;
                switch (event.keyCode) {
                    case $.$mol_keyboard_code.up: return this.event_up(event);
                    case $.$mol_keyboard_code.down: return this.event_down(event);
                    case $.$mol_keyboard_code.left: return this.event_left(event);
                    case $.$mol_keyboard_code.right: return this.event_right(event);
                }
            };
            $mol_nav.prototype.event_up = function (event) {
                var keys = this.keys_y();
                if (keys.length < 2)
                    return;
                var index_y = this.index_y();
                var index_old = index_y === null ? 0 : index_y;
                var index_new = (index_old + keys.length - 1) % keys.length;
                if (index_old === 0 && !this.cycle())
                    return;
                event.preventDefault();
                this.current_y(this.keys_y()[index_new]);
            };
            $mol_nav.prototype.event_down = function (event) {
                var keys = this.keys_y();
                if (keys.length < 2)
                    return;
                var index_y = this.index_y();
                var index_old = index_y === null ? keys.length - 1 : index_y;
                var index_new = (index_old + 1) % keys.length;
                if (index_new === (keys.length - 1) && !this.cycle())
                    return;
                event.preventDefault();
                this.current_y(this.keys_y()[index_new]);
            };
            $mol_nav.prototype.event_left = function (event) {
                var keys = this.keys_x();
                if (keys.length < 2)
                    return;
                var index_x = this.index_x();
                var index_old = index_x === null ? 0 : index_x;
                var index_new = (index_old + keys.length - 1) % keys.length;
                if (index_old === 0 && !this.cycle())
                    return;
                event.preventDefault();
                this.current_x(this.keys_x()[index_new]);
            };
            $mol_nav.prototype.event_right = function (event) {
                var keys = this.keys_x();
                if (keys.length < 2)
                    return;
                var index_x = this.index_x();
                var index_old = index_x === null ? keys.length - 1 : index_x;
                var index_new = (index_old + 1) % keys.length;
                if (index_new === keys.length && !this.cycle())
                    return;
                event.preventDefault();
                this.current_x(this.keys_x()[index_new]);
            };
            $mol_nav.prototype.index_y = function () {
                var index = this.keys_y().indexOf(this.current_y());
                if (index < 0)
                    return null;
                return index;
            };
            $mol_nav.prototype.index_x = function () {
                var index = this.keys_x().indexOf(this.current_x());
                if (index < 0)
                    return null;
                return index;
            };
            return $mol_nav;
        }($.$mol_nav));
        $$.$mol_nav = $mol_nav;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//nav.view.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_string = (function (_super) {
        __extends($mol_string, _super);
        function $mol_string() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_string.prototype.dom_name = function () {
            return "input";
        };
        $mol_string.prototype.enabled = function () {
            return true;
        };
        $mol_string.prototype.debounce = function () {
            return 200;
        };
        $mol_string.prototype.minimal_height = function () {
            return 40;
        };
        $mol_string.prototype.field = function () {
            return (__assign({}, _super.prototype.field.call(this), { "disabled": this.disabled(), "value": this.value_changed(), "placeholder": this.hint(), "type": this.type() }));
        };
        $mol_string.prototype.disabled = function () {
            return false;
        };
        $mol_string.prototype.value_changed = function (val, force) {
            return this.value(val);
        };
        $mol_string.prototype.value = function (val, force) {
            return (val !== void 0) ? val : "";
        };
        $mol_string.prototype.hint = function () {
            return "";
        };
        $mol_string.prototype.type = function (val, force) {
            return (val !== void 0) ? val : "text";
        };
        $mol_string.prototype.event = function () {
            var _this = this;
            return (__assign({}, _super.prototype.event.call(this), { "input": function (event) { return _this.event_change(event); }, "keypress": function (event) { return _this.event_key_press(event); } }));
        };
        $mol_string.prototype.event_change = function (event, force) {
            return (event !== void 0) ? event : null;
        };
        $mol_string.prototype.event_key_press = function (event, force) {
            return (event !== void 0) ? event : null;
        };
        __decorate([
            $.$mol_mem
        ], $mol_string.prototype, "value_changed", null);
        __decorate([
            $.$mol_mem
        ], $mol_string.prototype, "value", null);
        __decorate([
            $.$mol_mem
        ], $mol_string.prototype, "type", null);
        __decorate([
            $.$mol_mem
        ], $mol_string.prototype, "event_change", null);
        __decorate([
            $.$mol_mem
        ], $mol_string.prototype, "event_key_press", null);
        return $mol_string;
    }($.$mol_view));
    $.$mol_string = $mol_string;
})($ || ($ = {}));
//string.view.tree.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var $;
(function ($) {
    var $$;
    (function ($$) {
        var $mol_string = (function (_super) {
            __extends($mol_string, _super);
            function $mol_string() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._timer = 0;
                return _this;
            }
            $mol_string.prototype.event_change = function (next) {
                var _this = this;
                if (!next)
                    return;
                var val = next.target.value.trim();
                clearTimeout(this._timer);
                this._timer = setTimeout(function () { return _this.value(val); }, this.debounce());
            };
            $mol_string.prototype.event_key_press = function (next) {
                if (!next)
                    return;
                if (next.keyCode === $.$mol_keyboard_code.enter) {
                    this.value(next.target.value.trim());
                }
            };
            $mol_string.prototype.disabled = function () {
                return !this.enabled();
            };
            return $mol_string;
        }($.$mol_string));
        $$.$mol_string = $mol_string;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//string.view.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var $;
(function ($) {
    var $mol_svg = (function (_super) {
        __extends($mol_svg, _super);
        function $mol_svg() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_svg.prototype.dom_name = function () {
            return "svg";
        };
        $mol_svg.prototype.dom_name_space = function () {
            return "http://www.w3.org/2000/svg";
        };
        return $mol_svg;
    }($.$mol_view));
    $.$mol_svg = $mol_svg;
})($ || ($ = {}));
(function ($) {
    var $mol_svg_root = (function (_super) {
        __extends($mol_svg_root, _super);
        function $mol_svg_root() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_svg_root.prototype.dom_name = function () {
            return "svg";
        };
        $mol_svg_root.prototype.attr = function () {
            return (__assign({}, _super.prototype.attr.call(this), { "viewBox": this.view_box(), "preserveAspectRatio": this.aspect() }));
        };
        $mol_svg_root.prototype.view_box = function () {
            return "0 0 100 100";
        };
        $mol_svg_root.prototype.aspect = function () {
            return "xMidYMid";
        };
        return $mol_svg_root;
    }($.$mol_svg));
    $.$mol_svg_root = $mol_svg_root;
})($ || ($ = {}));
(function ($) {
    var $mol_svg_group = (function (_super) {
        __extends($mol_svg_group, _super);
        function $mol_svg_group() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_svg_group.prototype.dom_name = function () {
            return "g";
        };
        return $mol_svg_group;
    }($.$mol_svg));
    $.$mol_svg_group = $mol_svg_group;
})($ || ($ = {}));
(function ($) {
    var $mol_svg_line = (function (_super) {
        __extends($mol_svg_line, _super);
        function $mol_svg_line() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_svg_line.prototype.dom_name = function () {
            return "line";
        };
        $mol_svg_line.prototype.pos = function () {
            return [].concat(this.from(), this.to());
        };
        $mol_svg_line.prototype.from = function () {
            return [];
        };
        $mol_svg_line.prototype.to = function () {
            return [];
        };
        $mol_svg_line.prototype.attr = function () {
            return (__assign({}, _super.prototype.attr.call(this), { "x1": this.from_x(), "y1": this.from_y(), "x2": this.to_x(), "y2": this.to_y() }));
        };
        $mol_svg_line.prototype.from_x = function () {
            return "";
        };
        $mol_svg_line.prototype.from_y = function () {
            return "";
        };
        $mol_svg_line.prototype.to_x = function () {
            return "";
        };
        $mol_svg_line.prototype.to_y = function () {
            return "";
        };
        return $mol_svg_line;
    }($.$mol_svg));
    $.$mol_svg_line = $mol_svg_line;
})($ || ($ = {}));
(function ($) {
    var $mol_svg_path = (function (_super) {
        __extends($mol_svg_path, _super);
        function $mol_svg_path() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_svg_path.prototype.dom_name = function () {
            return "path";
        };
        $mol_svg_path.prototype.attr = function () {
            return (__assign({}, _super.prototype.attr.call(this), { "d": this.geometry() }));
        };
        $mol_svg_path.prototype.geometry = function () {
            return "";
        };
        return $mol_svg_path;
    }($.$mol_svg));
    $.$mol_svg_path = $mol_svg_path;
})($ || ($ = {}));
(function ($) {
    var $mol_svg_circle = (function (_super) {
        __extends($mol_svg_circle, _super);
        function $mol_svg_circle() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_svg_circle.prototype.dom_name = function () {
            return "circle";
        };
        $mol_svg_circle.prototype.pos = function () {
            return [];
        };
        $mol_svg_circle.prototype.attr = function () {
            return (__assign({}, _super.prototype.attr.call(this), { "r": this.radius(), "cx": this.pos_x(), "cy": this.pos_y() }));
        };
        $mol_svg_circle.prototype.radius = function () {
            return ".5%";
        };
        $mol_svg_circle.prototype.pos_x = function () {
            return "";
        };
        $mol_svg_circle.prototype.pos_y = function () {
            return "";
        };
        return $mol_svg_circle;
    }($.$mol_svg));
    $.$mol_svg_circle = $mol_svg_circle;
})($ || ($ = {}));
(function ($) {
    var $mol_svg_text = (function (_super) {
        __extends($mol_svg_text, _super);
        function $mol_svg_text() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_svg_text.prototype.dom_name = function () {
            return "text";
        };
        $mol_svg_text.prototype.pos = function () {
            return [];
        };
        $mol_svg_text.prototype.attr = function () {
            return (__assign({}, _super.prototype.attr.call(this), { "x": this.pos_x(), "y": this.pos_y(), "text-anchor": this.align() }));
        };
        $mol_svg_text.prototype.pos_x = function () {
            return "";
        };
        $mol_svg_text.prototype.pos_y = function () {
            return "";
        };
        $mol_svg_text.prototype.align = function () {
            return "middle";
        };
        $mol_svg_text.prototype.sub = function () {
            return [].concat(this.text());
        };
        $mol_svg_text.prototype.text = function () {
            return "";
        };
        return $mol_svg_text;
    }($.$mol_svg));
    $.$mol_svg_text = $mol_svg_text;
})($ || ($ = {}));
//svg.view.tree.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var $;
(function ($) {
    var $$;
    (function ($$) {
        var $mol_svg_line = (function (_super) {
            __extends($mol_svg_line, _super);
            function $mol_svg_line() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            $mol_svg_line.prototype.from = function () {
                return this.pos()[0];
            };
            $mol_svg_line.prototype.from_x = function () {
                return this.from()[0];
            };
            $mol_svg_line.prototype.from_y = function () {
                return this.from()[1];
            };
            $mol_svg_line.prototype.to = function () {
                return this.pos()[1];
            };
            $mol_svg_line.prototype.to_x = function () {
                return this.to()[0];
            };
            $mol_svg_line.prototype.to_y = function () {
                return this.to()[1];
            };
            return $mol_svg_line;
        }($.$mol_svg_line));
        $$.$mol_svg_line = $mol_svg_line;
        var $mol_svg_circle = (function (_super) {
            __extends($mol_svg_circle, _super);
            function $mol_svg_circle() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            $mol_svg_circle.prototype.pos_x = function () {
                return this.pos()[0];
            };
            $mol_svg_circle.prototype.pos_y = function () {
                return this.pos()[1];
            };
            return $mol_svg_circle;
        }($.$mol_svg_circle));
        $$.$mol_svg_circle = $mol_svg_circle;
        var $mol_svg_text = (function (_super) {
            __extends($mol_svg_text, _super);
            function $mol_svg_text() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            $mol_svg_text.prototype.pos_x = function () {
                return this.pos()[0];
            };
            $mol_svg_text.prototype.pos_y = function () {
                return this.pos()[1];
            };
            return $mol_svg_text;
        }($.$mol_svg_text));
        $$.$mol_svg_text = $mol_svg_text;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//svg.view.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_icon = (function (_super) {
        __extends($mol_icon, _super);
        function $mol_icon() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_icon.prototype.view_box = function () {
            return "0 0 24 24";
        };
        $mol_icon.prototype.sub = function () {
            return [].concat(this.Path());
        };
        $mol_icon.prototype.Path = function () {
            var _this = this;
            return (function (obj) {
                obj.geometry = function () { return _this.path(); };
                return obj;
            })(new this.$.$mol_svg_path);
        };
        $mol_icon.prototype.path = function () {
            return "";
        };
        __decorate([
            $.$mol_mem
        ], $mol_icon.prototype, "Path", null);
        return $mol_icon;
    }($.$mol_svg_root));
    $.$mol_icon = $mol_icon;
})($ || ($ = {}));
//icon.view.tree.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var $;
(function ($) {
    var $mol_icon_chevron = (function (_super) {
        __extends($mol_icon_chevron, _super);
        function $mol_icon_chevron() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_icon_chevron.prototype.path = function () {
            return "M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z";
        };
        return $mol_icon_chevron;
    }($.$mol_icon));
    $.$mol_icon_chevron = $mol_icon_chevron;
})($ || ($ = {}));
//chevron.view.tree.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var $;
(function ($) {
    var $mol_list = (function (_super) {
        __extends($mol_list, _super);
        function $mol_list() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_list.prototype.sub = function () {
            return this.rows();
        };
        $mol_list.prototype.rows = function () {
            return [];
        };
        $mol_list.prototype.Empty = function () {
            return null;
        };
        return $mol_list;
    }($.$mol_view));
    $.$mol_list = $mol_list;
})($ || ($ = {}));
//list.view.tree.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $$;
    (function ($$) {
        var $mol_list = (function (_super) {
            __extends($mol_list, _super);
            function $mol_list() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            $mol_list.prototype.sub = function () {
                var rows = this.rows();
                return (rows.length === 0) ? [this.Empty()] : rows;
            };
            $mol_list.prototype.row_offsets = function () {
                var sub = this.sub();
                if (!sub)
                    return null;
                var heightLimit = this.$.$mol_view_visible_height();
                var offset = 0;
                var next = [];
                for (var _i = 0, sub_1 = sub; _i < sub_1.length; _i++) {
                    var child = sub_1[_i];
                    next.push(offset);
                    if (child instanceof $.$mol_view) {
                        offset += child.minimal_height();
                    }
                    if (offset > heightLimit)
                        break;
                }
                return next;
            };
            $mol_list.prototype.row_context = function (index) {
                var _this = this;
                var context = this.context();
                var next = Object.create(context);
                next.$mol_view_visible_height = function () {
                    var limit = context.$mol_view_visible_height();
                    return limit - _this.row_offsets()[index];
                };
                return next;
            };
            $mol_list.prototype.sub_visible = function () {
                var sub = this.sub();
                if (!sub)
                    return sub;
                var limit = this.row_offsets().length;
                var next = [];
                for (var i = 0; i < limit; ++i) {
                    var child = sub[i];
                    if (child == null)
                        continue;
                    if (child instanceof $.$mol_view) {
                        child.context(this.row_context(i));
                    }
                    next.push(child);
                }
                return next;
            };
            $mol_list.prototype.minimal_height = function () {
                var height = 0;
                var sub = this.sub();
                if (sub)
                    sub.forEach(function (child) {
                        if (child instanceof $.$mol_view) {
                            height += child.minimal_height();
                        }
                    });
                return height;
            };
            __decorate([
                $.$mol_mem
            ], $mol_list.prototype, "row_offsets", null);
            __decorate([
                $.$mol_mem_key
            ], $mol_list.prototype, "row_context", null);
            __decorate([
                $.$mol_mem
            ], $mol_list.prototype, "sub_visible", null);
            __decorate([
                $.$mol_mem
            ], $mol_list.prototype, "minimal_height", null);
            return $mol_list;
        }($.$mol_list));
        $$.$mol_list = $mol_list;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//list.view.js.map
;
var $;
(function ($) {
    function $mol_match_text(query, values) {
        var tags = query.toLowerCase().trim().split(/\s+/).filter(function (tag) { return tag; });
        if (tags.length === 0)
            return function () { return true; };
        return function (variant) {
            var vals = values(variant);
            return tags.every(function (tag) { return vals.some(function (val) { return val.toLowerCase().indexOf(tag) >= 0; }); });
        };
    }
    $.$mol_match_text = $mol_match_text;
})($ || ($ = {}));
//text.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_select = (function (_super) {
        __extends($mol_select, _super);
        function $mol_select() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_select.prototype.dictionary = function () {
            return ({});
        };
        $mol_select.prototype.options = function () {
            return [];
        };
        $mol_select.prototype.value = function (val, force) {
            return (val !== void 0) ? val : "";
        };
        $mol_select.prototype.minimal_height = function () {
            return 40;
        };
        $mol_select.prototype.Option_row = function (id) {
            var _this = this;
            return (function (obj) {
                obj.event_click = function (event) { return _this.event_select(id, event); };
                obj.sub = function () { return _this.option_content(id); };
                return obj;
            })(new this.$.$mol_button_minor);
        };
        $mol_select.prototype.event_select = function (id, event, force) {
            return (event !== void 0) ? event : null;
        };
        $mol_select.prototype.option_content = function (id) {
            return [].concat(this.Option_label(id));
        };
        $mol_select.prototype.Option_label = function (id) {
            var _this = this;
            return (function (obj) {
                obj.minimal_height = function () { return 40; };
                obj.haystack = function () { return _this.option_label(id); };
                obj.needle = function () { return _this.filter_pattern(); };
                return obj;
            })(new this.$.$mol_dimmer);
        };
        $mol_select.prototype.option_label = function (id) {
            return "";
        };
        $mol_select.prototype.filter_pattern = function (val, force) {
            return (val !== void 0) ? val : "";
        };
        $mol_select.prototype.No_options = function () {
            var _this = this;
            return (function (obj) {
                obj.sub = function () { return [].concat(_this.no_options_message()); };
                return obj;
            })(new this.$.$mol_view);
        };
        $mol_select.prototype.no_options_message = function () {
            return $.$mol_locale.text(this.locale_contexts(), "no_options_message");
        };
        $mol_select.prototype.plugins = function () {
            return [].concat(this.Nav());
        };
        $mol_select.prototype.Nav = function () {
            var _this = this;
            return (function (obj) {
                obj.keys_y = function () { return _this.nav_components(); };
                obj.current_y = function (component) { return _this.option_focused(component); };
                obj.cycle = function (val) { return _this.nav_cycle(val); };
                return obj;
            })(new this.$.$mol_nav);
        };
        $mol_select.prototype.nav_components = function () {
            return [].concat(this.Filter(), this.option_rows());
        };
        $mol_select.prototype.option_focused = function (component, force) {
            return (component !== void 0) ? component : null;
        };
        $mol_select.prototype.nav_cycle = function (val, force) {
            return (val !== void 0) ? val : true;
        };
        $mol_select.prototype.showed = function () {
            return this.options_showed();
        };
        $mol_select.prototype.options_showed = function () {
            return false;
        };
        $mol_select.prototype.Anchor = function () {
            return this.Trigger();
        };
        $mol_select.prototype.Trigger = function () {
            var _this = this;
            return (function (obj) {
                obj.sub = function () { return _this.trigger_content(); };
                return obj;
            })(new this.$.$mol_button_typed);
        };
        $mol_select.prototype.trigger_content = function () {
            return [].concat(this.option_content_current(), this.Filter(), this.Trigger_icon());
        };
        $mol_select.prototype.option_content_current = function () {
            return [];
        };
        $mol_select.prototype.Filter = function () {
            var _this = this;
            return (function (obj) {
                obj.value = function (val) { return _this.filter_pattern(val); };
                obj.hint = function () { return _this.filter_hint(); };
                obj.debounce = function () { return _this.debounce(); };
                return obj;
            })(new this.$.$mol_string);
        };
        $mol_select.prototype.filter_hint = function () {
            return this.hint();
        };
        $mol_select.prototype.hint = function () {
            return $.$mol_locale.text(this.locale_contexts(), "hint");
        };
        $mol_select.prototype.debounce = function () {
            return 200;
        };
        $mol_select.prototype.Trigger_icon = function () {
            return (function (obj) {
                return obj;
            })(new this.$.$mol_icon_chevron);
        };
        $mol_select.prototype.bubble_content = function () {
            return [].concat(this.Bubble_content());
        };
        $mol_select.prototype.Bubble_content = function () {
            var _this = this;
            return (function (obj) {
                obj.rows = function () { return _this.option_rows(); };
                return obj;
            })(new this.$.$mol_list);
        };
        $mol_select.prototype.option_rows = function () {
            return [];
        };
        __decorate([
            $.$mol_mem
        ], $mol_select.prototype, "value", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_select.prototype, "Option_row", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_select.prototype, "event_select", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_select.prototype, "Option_label", null);
        __decorate([
            $.$mol_mem
        ], $mol_select.prototype, "filter_pattern", null);
        __decorate([
            $.$mol_mem
        ], $mol_select.prototype, "No_options", null);
        __decorate([
            $.$mol_mem
        ], $mol_select.prototype, "Nav", null);
        __decorate([
            $.$mol_mem
        ], $mol_select.prototype, "option_focused", null);
        __decorate([
            $.$mol_mem
        ], $mol_select.prototype, "nav_cycle", null);
        __decorate([
            $.$mol_mem
        ], $mol_select.prototype, "Trigger", null);
        __decorate([
            $.$mol_mem
        ], $mol_select.prototype, "Filter", null);
        __decorate([
            $.$mol_mem
        ], $mol_select.prototype, "Trigger_icon", null);
        __decorate([
            $.$mol_mem
        ], $mol_select.prototype, "Bubble_content", null);
        return $mol_select;
    }($.$mol_pop));
    $.$mol_select = $mol_select;
})($ || ($ = {}));
//select.view.tree.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $$;
    (function ($$) {
        var $mol_select = (function (_super) {
            __extends($mol_select, _super);
            function $mol_select() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            $mol_select.prototype.filter_pattern = function (next) {
                if (!this.focused())
                    return '';
                return next || '';
            };
            $mol_select.prototype.options_showed = function () {
                var _this = this;
                var showed = this.focused() || this.filter_pattern().length > 0;
                if (showed)
                    new $.$mol_defer(function () { return _this.Filter().focused(true); });
                return showed;
            };
            $mol_select.prototype.options = function () {
                return Object.keys(this.dictionary());
            };
            $mol_select.prototype.options_filtered = function () {
                var _this = this;
                return this.options().filter($.$mol_match_text(this.filter_pattern(), function (id) { return [_this.option_label(id)]; }));
            };
            $mol_select.prototype.option_label = function (id) {
                var value = this.dictionary()[id];
                return value == null ? id : value;
            };
            $mol_select.prototype.option_rows = function () {
                var _this = this;
                if (this.options_filtered().length === 0)
                    return [this.No_options()];
                var options = this.options_filtered().map(function (option) { return _this.Option_row(option); });
                return options;
            };
            $mol_select.prototype.option_focused = function (component) {
                if (component === undefined) {
                    for (var _i = 0, _a = this.nav_components(); _i < _a.length; _i++) {
                        var comp = _a[_i];
                        if (comp.focused())
                            return comp;
                    }
                    return this.Filter();
                }
                if (this.options_showed()) {
                    component.focused(true);
                }
                return component;
            };
            $mol_select.prototype.event_select = function (id, event) {
                this.value(id);
                this.focused(false);
            };
            $mol_select.prototype.nav_components = function () {
                return [this.Filter()].concat(this.option_rows());
            };
            $mol_select.prototype.option_content_current = function () {
                return this.option_content(this.value());
            };
            $mol_select.prototype.trigger_content = function () {
                return (this.options_showed() || !this.value())
                    ? [this.Filter()]
                    : this.option_content_current().concat([this.Trigger_icon()]);
            };
            __decorate([
                $.$mol_mem
            ], $mol_select.prototype, "filter_pattern", null);
            __decorate([
                $.$mol_mem
            ], $mol_select.prototype, "options_showed", null);
            __decorate([
                $.$mol_mem
            ], $mol_select.prototype, "options", null);
            __decorate([
                $.$mol_mem
            ], $mol_select.prototype, "option_focused", null);
            return $mol_select;
        }($.$mol_select));
        $$.$mol_select = $mol_select;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//select.view.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var $;
(function ($) {
    var $mol_icon_cross = (function (_super) {
        __extends($mol_icon_cross, _super);
        function $mol_icon_cross() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_icon_cross.prototype.path = function () {
            return "M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z";
        };
        return $mol_icon_cross;
    }($.$mol_icon));
    $.$mol_icon_cross = $mol_icon_cross;
})($ || ($ = {}));
//cross.view.tree.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_search = (function (_super) {
        __extends($mol_search, _super);
        function $mol_search() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_search.prototype.query = function (val, force) {
            return (val !== void 0) ? val : "";
        };
        $mol_search.prototype.sub = function () {
            return [].concat(this.Suggest(), this.Clear());
        };
        $mol_search.prototype.Suggest = function () {
            var _this = this;
            return (function (obj) {
                obj.value = function (val) { return _this.suggest_selected(val); };
                obj.filter_pattern = function (val) { return _this.suggest_selected(val); };
                obj.hint = function () { return _this.hint(); };
                obj.filter_pattern = function (val) { return _this.query(val); };
                obj.options_showed = function () { return _this.suggests_showed(); };
                obj.options = function () { return _this.suggests(); };
                obj.Trigger_icon = function () { return null; };
                obj.debounce = function () { return _this.debounce(); };
                return obj;
            })(new this.$.$mol_select);
        };
        $mol_search.prototype.suggest_selected = function (val, force) {
            return (val !== void 0) ? val : "";
        };
        $mol_search.prototype.hint = function () {
            return $.$mol_locale.text(this.locale_contexts(), "hint");
        };
        $mol_search.prototype.suggests_showed = function () {
            return false;
        };
        $mol_search.prototype.suggests = function () {
            return [];
        };
        $mol_search.prototype.debounce = function () {
            return 200;
        };
        $mol_search.prototype.Clear = function () {
            var _this = this;
            return (function (obj) {
                obj.sub = function () { return [].concat(_this.Clear_icon()); };
                obj.event_click = function (val) { return _this.event_clear(val); };
                return obj;
            })(new this.$.$mol_button_minor);
        };
        $mol_search.prototype.Clear_icon = function () {
            return (function (obj) {
                return obj;
            })(new this.$.$mol_icon_cross);
        };
        $mol_search.prototype.event_clear = function (val, force) {
            return (val !== void 0) ? val : null;
        };
        __decorate([
            $.$mol_mem
        ], $mol_search.prototype, "query", null);
        __decorate([
            $.$mol_mem
        ], $mol_search.prototype, "Suggest", null);
        __decorate([
            $.$mol_mem
        ], $mol_search.prototype, "suggest_selected", null);
        __decorate([
            $.$mol_mem
        ], $mol_search.prototype, "Clear", null);
        __decorate([
            $.$mol_mem
        ], $mol_search.prototype, "Clear_icon", null);
        __decorate([
            $.$mol_mem
        ], $mol_search.prototype, "event_clear", null);
        return $mol_search;
    }($.$mol_bar));
    $.$mol_search = $mol_search;
})($ || ($ = {}));
//search.view.tree.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var $;
(function ($) {
    var $$;
    (function ($$) {
        var $mol_search = (function (_super) {
            __extends($mol_search, _super);
            function $mol_search() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            $mol_search.prototype.suggests_showed = function () {
                if (!this.focused())
                    return false;
                return this.suggests().length > 1;
            };
            $mol_search.prototype.suggest_selected = function (next) {
                if (next === undefined)
                    return;
                this.Suggest().Filter().focused(true);
                this.query(next);
            };
            $mol_search.prototype.sub = function () {
                return [
                    this.Suggest()
                ].concat((this.query().length > 0) ? [this.Clear()] : []);
            };
            $mol_search.prototype.event_clear = function (event) {
                this.query('');
            };
            return $mol_search;
        }($.$mol_search));
        $$.$mol_search = $mol_search;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//search.view.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var $;
(function ($) {
    var $mol_float = (function (_super) {
        __extends($mol_float, _super);
        function $mol_float() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_float.prototype.style = function () {
            return (__assign({}, _super.prototype.style.call(this), { "transform": this.shiftStyle() }));
        };
        $mol_float.prototype.shiftStyle = function () {
            return "";
        };
        $mol_float.prototype.attr = function () {
            return (__assign({}, _super.prototype.attr.call(this), { "mol_float_scrolling": this.scrolling() }));
        };
        $mol_float.prototype.scrolling = function () {
            return false;
        };
        return $mol_float;
    }($.$mol_view));
    $.$mol_float = $mol_float;
})($ || ($ = {}));
//float.view.tree.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var $;
(function ($) {
    var $$;
    (function ($$) {
        var $mol_float = (function (_super) {
            __extends($mol_float, _super);
            function $mol_float() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            $mol_float.prototype.shiftStyle = function () {
                var offset = this.$.$mol_scroll_top();
                return "translateY(" + offset + "px)";
            };
            $mol_float.prototype.scrolling = function () {
                return this.$.$mol_scroll_moving();
            };
            return $mol_float;
        }($.$mol_float));
        $$.$mol_float = $mol_float;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//float.view.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_check = (function (_super) {
        __extends($mol_check, _super);
        function $mol_check() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_check.prototype.attr = function () {
            return (__assign({}, _super.prototype.attr.call(this), { "mol_check_checked": this.checked(), "aria-checked": this.checked(), "role": "checkbox" }));
        };
        $mol_check.prototype.checked = function (val, force) {
            return (val !== void 0) ? val : false;
        };
        $mol_check.prototype.sub = function () {
            return [].concat(this.Icon(), this.label());
        };
        $mol_check.prototype.Icon = function () {
            return null;
        };
        $mol_check.prototype.label = function () {
            return [].concat(this.Title());
        };
        $mol_check.prototype.Title = function () {
            var _this = this;
            return (function (obj) {
                obj.sub = function () { return [].concat(_this.title()); };
                return obj;
            })(new this.$.$mol_view);
        };
        $mol_check.prototype.title = function () {
            return "";
        };
        __decorate([
            $.$mol_mem
        ], $mol_check.prototype, "checked", null);
        __decorate([
            $.$mol_mem
        ], $mol_check.prototype, "Title", null);
        return $mol_check;
    }($.$mol_button_typed));
    $.$mol_check = $mol_check;
})($ || ($ = {}));
//check.view.tree.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var $;
(function ($) {
    var $$;
    (function ($$) {
        var $mol_check = (function (_super) {
            __extends($mol_check, _super);
            function $mol_check() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            $mol_check.prototype.event_click = function (next) {
                this.checked(!this.checked());
                if (next)
                    next.preventDefault();
            };
            return $mol_check;
        }($.$mol_check));
        $$.$mol_check = $mol_check;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//check.view.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var $;
(function ($) {
    var $mol_icon_tick = (function (_super) {
        __extends($mol_icon_tick, _super);
        function $mol_icon_tick() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_icon_tick.prototype.path = function () {
            return "M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z";
        };
        return $mol_icon_tick;
    }($.$mol_icon));
    $.$mol_icon_tick = $mol_icon_tick;
})($ || ($ = {}));
//tick.view.tree.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_check_box = (function (_super) {
        __extends($mol_check_box, _super);
        function $mol_check_box() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_check_box.prototype.Icon = function () {
            return (function (obj) {
                return obj;
            })(new this.$.$mol_icon_tick);
        };
        __decorate([
            $.$mol_mem
        ], $mol_check_box.prototype, "Icon", null);
        return $mol_check_box;
    }($.$mol_check));
    $.$mol_check_box = $mol_check_box;
})($ || ($ = {}));
//box.view.tree.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_check_expand = (function (_super) {
        __extends($mol_check_expand, _super);
        function $mol_check_expand() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_check_expand.prototype.minimal_height = function () {
            return 32;
        };
        $mol_check_expand.prototype.Icon = function () {
            return (function (obj) {
                return obj;
            })(new this.$.$mol_icon_chevron);
        };
        $mol_check_expand.prototype.level = function () {
            return 0;
        };
        $mol_check_expand.prototype.style = function () {
            return (__assign({}, _super.prototype.style.call(this), { "paddingLeft": this.level_style() }));
        };
        $mol_check_expand.prototype.level_style = function () {
            return "0px";
        };
        $mol_check_expand.prototype.checked = function (val, force) {
            return this.expanded(val);
        };
        $mol_check_expand.prototype.expanded = function (val, force) {
            return (val !== void 0) ? val : false;
        };
        $mol_check_expand.prototype.enabled = function () {
            return this.expandable();
        };
        $mol_check_expand.prototype.expandable = function () {
            return false;
        };
        __decorate([
            $.$mol_mem
        ], $mol_check_expand.prototype, "Icon", null);
        __decorate([
            $.$mol_mem
        ], $mol_check_expand.prototype, "checked", null);
        __decorate([
            $.$mol_mem
        ], $mol_check_expand.prototype, "expanded", null);
        return $mol_check_expand;
    }($.$mol_check));
    $.$mol_check_expand = $mol_check_expand;
})($ || ($ = {}));
//expand.view.tree.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var $;
(function ($) {
    var $$;
    (function ($$) {
        var $mol_check_expand = (function (_super) {
            __extends($mol_check_expand, _super);
            function $mol_check_expand() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            $mol_check_expand.prototype.level_style = function () {
                return this.level() * 1.25 - .5 + "rem";
            };
            $mol_check_expand.prototype.expandable = function () {
                return this.expanded() !== null;
            };
            return $mol_check_expand;
        }($.$mol_check_expand));
        $$.$mol_check_expand = $mol_check_expand;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//expand.view.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_grid = (function (_super) {
        __extends($mol_grid, _super);
        function $mol_grid() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_grid.prototype.row_ids = function () {
            return [];
        };
        $mol_grid.prototype.row_id = function (index) {
            return null;
        };
        $mol_grid.prototype.col_ids = function () {
            return [];
        };
        $mol_grid.prototype.records = function () {
            return ({});
        };
        $mol_grid.prototype.record = function (id) {
            return null;
        };
        $mol_grid.prototype.hierarchy = function () {
            return null;
        };
        $mol_grid.prototype.hierarchy_col = function () {
            return "";
        };
        $mol_grid.prototype.sub = function () {
            return [].concat(this.Table());
        };
        $mol_grid.prototype.Table = function () {
            var _this = this;
            return (function (obj) {
                obj.offset = function () { return _this.gap_top(); };
                obj.sub = function () { return [].concat(_this.rows_visible()); };
                return obj;
            })(new this.$.$mol_grid_table);
        };
        $mol_grid.prototype.gap_top = function () {
            return 0;
        };
        $mol_grid.prototype.rows_visible = function () {
            return [];
        };
        $mol_grid.prototype.rows = function () {
            return [];
        };
        $mol_grid.prototype.Head = function () {
            var _this = this;
            return (function (obj) {
                obj.height = function () { return _this.row_height(); };
                obj.cells = function () { return _this.head_cells(); };
                return obj;
            })(new this.$.$mol_grid_row);
        };
        $mol_grid.prototype.row_height = function () {
            return 40;
        };
        $mol_grid.prototype.head_cells = function () {
            return [];
        };
        $mol_grid.prototype.Row = function (id) {
            var _this = this;
            return (function (obj) {
                obj.height = function () { return _this.row_height(); };
                obj.cells = function () { return _this.cells(id); };
                return obj;
            })(new this.$.$mol_grid_row);
        };
        $mol_grid.prototype.cells = function (id) {
            return [];
        };
        $mol_grid.prototype.cell = function (id) {
            return null;
        };
        $mol_grid.prototype.Cell_text = function (id) {
            var _this = this;
            return (function (obj) {
                obj.sub = function () { return [].concat(_this.cell_content_text(id)); };
                return obj;
            })(new this.$.$mol_grid_cell);
        };
        $mol_grid.prototype.cell_content_text = function (id) {
            return this.cell_content(id);
        };
        $mol_grid.prototype.cell_content = function (id) {
            return [];
        };
        $mol_grid.prototype.Cell_number = function (id) {
            var _this = this;
            return (function (obj) {
                obj.sub = function () { return [].concat(_this.cell_content_number(id)); };
                return obj;
            })(new this.$.$mol_grid_number);
        };
        $mol_grid.prototype.cell_content_number = function (id) {
            return this.cell_content(id);
        };
        $mol_grid.prototype.Col_head = function (id) {
            var _this = this;
            return (function (obj) {
                obj.dom_name = function () { return "th"; };
                obj.sub = function () { return [].concat(_this.col_head_content(id)); };
                return obj;
            })(new this.$.$mol_float);
        };
        $mol_grid.prototype.col_head_content = function (id) {
            return [];
        };
        $mol_grid.prototype.Cell_branch = function (id) {
            var _this = this;
            return (function (obj) {
                obj.level = function () { return _this.cell_level(id); };
                obj.label = function () { return _this.cell_content(id); };
                obj.expanded = function (val) { return _this.cell_expanded(id, val); };
                return obj;
            })(new this.$.$mol_check_expand);
        };
        $mol_grid.prototype.cell_level = function (id) {
            return 0;
        };
        $mol_grid.prototype.cell_expanded = function (id, val, force) {
            return (val !== void 0) ? val : false;
        };
        $mol_grid.prototype.Cell_content = function (id) {
            return [].concat(this.Cell_dimmer(id));
        };
        $mol_grid.prototype.Cell_dimmer = function (id) {
            var _this = this;
            return (function (obj) {
                obj.needle = function () { return _this.needle(); };
                obj.haystack = function () { return _this.cell_value(id); };
                return obj;
            })(new this.$.$mol_dimmer);
        };
        $mol_grid.prototype.needle = function () {
            return "";
        };
        $mol_grid.prototype.cell_value = function (id) {
            return "";
        };
        __decorate([
            $.$mol_mem
        ], $mol_grid.prototype, "Table", null);
        __decorate([
            $.$mol_mem
        ], $mol_grid.prototype, "Head", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_grid.prototype, "Row", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_grid.prototype, "Cell_text", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_grid.prototype, "Cell_number", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_grid.prototype, "Col_head", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_grid.prototype, "Cell_branch", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_grid.prototype, "cell_expanded", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_grid.prototype, "Cell_dimmer", null);
        return $mol_grid;
    }($.$mol_scroll));
    $.$mol_grid = $mol_grid;
})($ || ($ = {}));
(function ($) {
    var $mol_grid_table = (function (_super) {
        __extends($mol_grid_table, _super);
        function $mol_grid_table() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_grid_table.prototype.dom_name = function () {
            return "table";
        };
        $mol_grid_table.prototype.style = function () {
            return (__assign({}, _super.prototype.style.call(this), { "top": this.offset() }));
        };
        $mol_grid_table.prototype.offset = function () {
            return 0;
        };
        return $mol_grid_table;
    }($.$mol_view));
    $.$mol_grid_table = $mol_grid_table;
})($ || ($ = {}));
(function ($) {
    var $mol_grid_gap = (function (_super) {
        __extends($mol_grid_gap, _super);
        function $mol_grid_gap() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_grid_gap.prototype.style = function () {
            return (__assign({}, _super.prototype.style.call(this), { "top": this.offset() }));
        };
        $mol_grid_gap.prototype.offset = function () {
            return 0;
        };
        return $mol_grid_gap;
    }($.$mol_view));
    $.$mol_grid_gap = $mol_grid_gap;
})($ || ($ = {}));
(function ($) {
    var $mol_grid_row = (function (_super) {
        __extends($mol_grid_row, _super);
        function $mol_grid_row() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_grid_row.prototype.dom_name = function () {
            return "tr";
        };
        $mol_grid_row.prototype.style = function () {
            return (__assign({}, _super.prototype.style.call(this), { "height": this.height() }));
        };
        $mol_grid_row.prototype.height = function () {
            return 40;
        };
        $mol_grid_row.prototype.sub = function () {
            return this.cells();
        };
        $mol_grid_row.prototype.cells = function () {
            return [];
        };
        return $mol_grid_row;
    }($.$mol_view));
    $.$mol_grid_row = $mol_grid_row;
})($ || ($ = {}));
(function ($) {
    var $mol_grid_cell = (function (_super) {
        __extends($mol_grid_cell, _super);
        function $mol_grid_cell() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_grid_cell.prototype.dom_name = function () {
            return "td";
        };
        return $mol_grid_cell;
    }($.$mol_view));
    $.$mol_grid_cell = $mol_grid_cell;
})($ || ($ = {}));
(function ($) {
    var $mol_grid_number = (function (_super) {
        __extends($mol_grid_number, _super);
        function $mol_grid_number() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return $mol_grid_number;
    }($.$mol_grid_cell));
    $.$mol_grid_number = $mol_grid_number;
})($ || ($ = {}));
//grid.view.tree.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $$;
    (function ($$) {
        var $mol_grid = (function (_super) {
            __extends($mol_grid, _super);
            function $mol_grid() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            $mol_grid.prototype.rows_visible = function () {
                var rows = this.rows();
                if (!rows)
                    return null;
                var view_window = this.view_window();
                return [].concat(this.Head(), rows.slice(view_window.top, view_window.bottom).valueOf());
            };
            $mol_grid.prototype.rows_visible_max = function () {
                return Math.ceil(this.$.$mol_view_visible_height() / this.row_height());
            };
            $mol_grid.prototype.view_window = function () {
                var rows = this.rows();
                if (!rows)
                    return null;
                var count = rows.length;
                var context = this.context_sub();
                var scrollTop = context.$mol_scroll_top();
                var top = Math.max(0, Math.floor(scrollTop / this.row_height()));
                var bottom = Math.min(count, top + this.rows_visible_max());
                return { top: top, bottom: bottom, count: count };
            };
            $mol_grid.prototype.gap_top = function () {
                var view_window = this.view_window();
                return view_window.top * this.row_height();
            };
            $mol_grid.prototype.height = function () {
                var view_window = this.view_window();
                return view_window.count * this.row_height();
            };
            $mol_grid.prototype.content_height = function () {
                return this.rows().length * this.row_height();
            };
            $mol_grid.prototype.head_cells = function () {
                var _this = this;
                return this.col_ids().map(function (colId) { return _this.Col_head(colId); });
            };
            $mol_grid.prototype.col_head_content = function (colId) {
                return [colId];
            };
            $mol_grid.prototype.rows = function () {
                var _this = this;
                return this.row_ids().map(function (id) { return _this.Row(id); });
            };
            $mol_grid.prototype.cells = function (row_id) {
                var _this = this;
                return this.col_ids().map(function (col_id) { return _this.Cell({ row: row_id, col: col_id }); });
            };
            $mol_grid.prototype.col_type = function (col_id) {
                if (col_id === this.hierarchy_col())
                    return 'branch';
                var rowFirst = this.row_id(0);
                var val = this.record(rowFirst[rowFirst.length - 1])[col_id];
                if (typeof val === 'number')
                    return 'number';
                return 'text';
            };
            $mol_grid.prototype.Cell = function (id) {
                switch (this.col_type(id.col).valueOf()) {
                    case 'branch': return this.Cell_branch(id);
                    case 'number': return this.Cell_number(id);
                }
                return this.Cell_text(id);
            };
            $mol_grid.prototype.cell_content = function (id) {
                return [this.record(id.row[id.row.length - 1])[id.col]];
            };
            $mol_grid.prototype.records = function () {
                return [];
            };
            $mol_grid.prototype.record = function (id) {
                return this.records()[id];
            };
            $mol_grid.prototype.record_ids = function () {
                return Object.keys(this.records());
            };
            $mol_grid.prototype.row_id = function (index) {
                return this.row_ids().slice(index, index + 1).valueOf()[0];
            };
            $mol_grid.prototype.col_ids = function () {
                var rowFirst = this.row_id(0);
                if (rowFirst === void 0)
                    return [];
                var record = this.record(rowFirst[rowFirst.length - 1]);
                if (!record)
                    return [];
                return Object.keys(record);
            };
            $mol_grid.prototype.hierarchy = function () {
                var hierarchy = {};
                var root = hierarchy[''] = {
                    id: '',
                    parent: null,
                    sub: [],
                };
                this.record_ids().map(function (id) {
                    root.sub.push(hierarchy[id] = {
                        id: id,
                        parent: root,
                        sub: [],
                    });
                });
                return hierarchy;
            };
            $mol_grid.prototype.row_sub_ids = function (row) {
                return this.hierarchy()[row[row.length - 1]].sub.map(function (child) { return row.concat(child.id); });
            };
            $mol_grid.prototype.row_root_id = function () {
                return [''];
            };
            $mol_grid.prototype.cell_level = function (id) {
                return id.row.length - 1;
            };
            $mol_grid.prototype.row_ids = function () {
                var _this = this;
                var next = [];
                var add = function (row) {
                    next.push(row);
                    if (_this.row_expanded(row)) {
                        _this.row_sub_ids(row).forEach(function (child) { return add(child); });
                    }
                };
                this.row_sub_ids(this.row_root_id()).forEach(function (child) { return add(child); });
                return next;
            };
            $mol_grid.prototype.row_expanded = function (row_id, next) {
                if (!this.row_sub_ids(row_id).length)
                    return null;
                var key = "row_expanded(" + JSON.stringify(row_id) + ")";
                var next2 = $.$mol_state_session.value(key, next);
                return (next2 == null) ? this.row_expanded_default(row_id) : next2;
            };
            $mol_grid.prototype.row_expanded_default = function (row_id) {
                return row_id.length < 3;
            };
            $mol_grid.prototype.cell_expanded = function (id, next) {
                return this.row_expanded(id.row, next);
            };
            __decorate([
                $.$mol_mem
            ], $mol_grid.prototype, "rows_visible", null);
            __decorate([
                $.$mol_mem
            ], $mol_grid.prototype, "rows_visible_max", null);
            __decorate([
                $.$mol_mem
            ], $mol_grid.prototype, "view_window", null);
            __decorate([
                $.$mol_mem
            ], $mol_grid.prototype, "head_cells", null);
            __decorate([
                $.$mol_mem
            ], $mol_grid.prototype, "rows", null);
            __decorate([
                $.$mol_mem_key
            ], $mol_grid.prototype, "col_type", null);
            __decorate([
                $.$mol_mem
            ], $mol_grid.prototype, "record_ids", null);
            __decorate([
                $.$mol_mem
            ], $mol_grid.prototype, "hierarchy", null);
            __decorate([
                $.$mol_mem
            ], $mol_grid.prototype, "row_ids", null);
            return $mol_grid;
        }($.$mol_grid));
        $$.$mol_grid = $mol_grid;
        var $mol_grid_table = (function (_super) {
            __extends($mol_grid_table, _super);
            function $mol_grid_table() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            $mol_grid_table.prototype.context_sub = function () {
                var _this = this;
                var context = this.context();
                var subContext = Object.create(context);
                subContext.$mol_scroll_top = function () { return context.$mol_scroll_top() - _this.offset(); };
                return subContext;
            };
            __decorate([
                $.$mol_mem
            ], $mol_grid_table.prototype, "context_sub", null);
            return $mol_grid_table;
        }($.$mol_grid_table));
        $$.$mol_grid_table = $mol_grid_table;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//grid.view.js.map
;
var $;
(function ($) {
    var $mol_syntax = (function () {
        function $mol_syntax(lexems) {
            this['lexems()'] = lexems;
        }
        $mol_syntax.prototype.lexems = function () {
            return this['lexems()'];
        };
        $mol_syntax.prototype.rules = function () {
            var rules = this['rules()'];
            if (rules)
                return rules;
            rules = [];
            var lexems = this.lexems();
            for (var name_1 in lexems) {
                rules.push({
                    name: name_1,
                    regExp: lexems[name_1],
                    size: RegExp('^$|' + lexems[name_1].source).exec('').length - 1,
                });
            }
            return this['rules()'] = rules;
        };
        $mol_syntax.prototype.regExp = function () {
            var regExp = this['regExp()'];
            if (regExp)
                return regExp;
            var parts = '(' + this.rules().map(function (rule) { return rule.regExp.source; }).join(')|(') + ')';
            regExp = RegExp("([^]*?)(?:(" + parts + ")|$(?![^]))", 'gm');
            return this['regExp()'] = regExp;
        };
        $mol_syntax.prototype.tokenize = function (text) {
            var tokens = [];
            var rules = this.rules();
            var regExp = this.regExp();
            var regExpSize = RegExp('^$|' + regExp.source).exec('').length - 1;
            var position = 0;
            parsing: while (position < text.length) {
                regExp.lastIndex = position;
                var found = regExp.exec(text);
                if (position === regExp.lastIndex)
                    throw new Error('Empty token');
                position = regExp.lastIndex;
                var prefix = found[1];
                if (prefix) {
                    tokens.push({
                        name: '',
                        found: prefix,
                        chunks: [],
                    });
                }
                var suffix = found[2];
                if (suffix) {
                    var offset = 4;
                    for (var _i = 0, rules_1 = rules; _i < rules_1.length; _i++) {
                        var rule = rules_1[_i];
                        if (found[offset - 1]) {
                            tokens.push({
                                name: rule.name,
                                found: suffix,
                                chunks: found.slice(offset, offset + rule.size)
                            });
                            continue parsing;
                        }
                        offset += rule.size + 1;
                    }
                    throw new Error('Something wrong');
                }
            }
            return tokens;
        };
        return $mol_syntax;
    }());
    $.$mol_syntax = $mol_syntax;
})($ || ($ = {}));
//syntax.js.map
;
var $;
(function ($) {
    $.$mol_syntax_md_flow = new $.$mol_syntax({
        'quote': /^(?:>\s+)(.*?)$([\n\r]*)/,
        'header': /^(#+)(\s*)(.*?)$([\n\r]*)/,
        'list': /^((?:[*+-]\s+(?:[^]*?)$(?:[\n\r]*))+)/,
        'code': /^(```\s*)(\w*)[\r\n]+([^]*?)^(```)$([\n\r]*)/,
        'code-indent': /^((?:(?:  |\t)(?:[^]*?)$([\n\r]*))+)/,
        'table': /((?:^\|.+?$\r?\n)+)([\n\r]*)/,
        'block': /^(.*?(?:\r?\n.+?)*)$((?:\r?\n)*)/,
    });
    $.$mol_syntax_md_line = new $.$mol_syntax({
        'strong': /\*\*(.+?)\*\*/,
        'emphasis': /\*(?!\s)(.+?)\*/,
        'code3': /```(.+?)```/,
        'code': /`(.+?)`/,
        'strike': /~~(.+?)~~/,
        'text-link': /\[(.*?(?:\[.*?\].*?)*)\]\((.*?)\)/,
        'image-link': /!\[([^\[\]]*?)\]\((.*?)\)/,
    });
    $.$mol_syntax_md_code = new $.$mol_syntax({
        'code-docs': /\/\/\/.*?$/,
        'code-comment-block': /(?:\/\*[^]*?\*\/|\/\+[^]*?\+\/)/,
        'code-string': /(?:".*?"|'.*?'|`.*?`|\/.+?\/[gmi]*)/,
        'code-comment-inline': /\/\/.*?$/,
        'code-number': /[+-]?(?:\d*\.)?\d+\w*/,
        'code-keyword': /\b(class|function|extends|implements|module|namespace|import|export|include|require|var|let|const|for|do|while|until|in|new|if|then|else|switch|case|this|return|async|await|try|catch|break|continue|get|set|public|private|protected|string|boolean|number|null|undefined|true|false|void)\b/,
        'code-call': /\.?\w+(?=\()/,
        'code-field': /(?:\.\w+|[\w-]+\s*:)/,
        'code-global': /[$]\w*/,
        'code-decorator': /@.*?$/,
        'code-tag': /<\/?[\w-]+\/?>?/,
        'code-punctuation': /[\-\[\]\{\}\(\)<=>`~!\?@#\$%&\*_\+\\\/\|'";:\.,\^]/,
    });
})($ || ($ = {}));
//md.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_text = (function (_super) {
        __extends($mol_text, _super);
        function $mol_text() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_text.prototype.uri_base = function () {
            return "";
        };
        $mol_text.prototype.text = function () {
            return "";
        };
        $mol_text.prototype.Row = function (id) {
            var _this = this;
            return (function (obj) {
                obj.sub = function () { return _this.block_content(id); };
                obj.type = function () { return _this.block_type(id); };
                return obj;
            })(new this.$.$mol_text_row);
        };
        $mol_text.prototype.block_content = function (id) {
            return [];
        };
        $mol_text.prototype.block_type = function (id) {
            return "";
        };
        $mol_text.prototype.Span = function (id) {
            return (function (obj) {
                return obj;
            })(new this.$.$mol_text_span);
        };
        $mol_text.prototype.Link = function (id) {
            return (function (obj) {
                return obj;
            })(new this.$.$mol_text_link);
        };
        $mol_text.prototype.Image = function (id) {
            return (function (obj) {
                return obj;
            })(new this.$.$mol_text_image);
        };
        $mol_text.prototype.Header = function (id) {
            var _this = this;
            return (function (obj) {
                obj.level = function () { return _this.header_level(id); };
                obj.content = function () { return _this.header_content(id); };
                return obj;
            })(new this.$.$mol_text_header);
        };
        $mol_text.prototype.header_level = function (id) {
            return 0;
        };
        $mol_text.prototype.header_content = function (id) {
            return [];
        };
        $mol_text.prototype.Table = function (id) {
            var _this = this;
            return (function (obj) {
                obj.head_cells = function () { return _this.table_head_cells(id); };
                obj.rows = function () { return _this.table_rows(id); };
                return obj;
            })(new this.$.$mol_grid);
        };
        $mol_text.prototype.table_head_cells = function (id) {
            return [];
        };
        $mol_text.prototype.table_rows = function (id) {
            return [];
        };
        $mol_text.prototype.Table_row = function (id) {
            var _this = this;
            return (function (obj) {
                obj.cells = function () { return _this.table_cells(id); };
                return obj;
            })(new this.$.$mol_grid_row);
        };
        $mol_text.prototype.table_cells = function (id) {
            return [];
        };
        $mol_text.prototype.Table_cell = function (id) {
            var _this = this;
            return (function (obj) {
                obj.sub = function () { return _this.table_cell_content(id); };
                return obj;
            })(new this.$.$mol_grid_cell);
        };
        $mol_text.prototype.table_cell_content = function (id) {
            return [];
        };
        $mol_text.prototype.Table_cell_head = function (id) {
            var _this = this;
            return (function (obj) {
                obj.sub = function () { return _this.table_cell_content(id); };
                return obj;
            })(new this.$.$mol_float);
        };
        __decorate([
            $.$mol_mem_key
        ], $mol_text.prototype, "Row", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_text.prototype, "Span", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_text.prototype, "Link", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_text.prototype, "Image", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_text.prototype, "Header", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_text.prototype, "Table", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_text.prototype, "Table_row", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_text.prototype, "Table_cell", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_text.prototype, "Table_cell_head", null);
        return $mol_text;
    }($.$mol_list));
    $.$mol_text = $mol_text;
})($ || ($ = {}));
(function ($) {
    var $mol_text_row = (function (_super) {
        __extends($mol_text_row, _super);
        function $mol_text_row() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_text_row.prototype.minimal_height = function () {
            return 40;
        };
        $mol_text_row.prototype.attr = function () {
            return (__assign({}, _super.prototype.attr.call(this), { "mol_text_type": this.type() }));
        };
        $mol_text_row.prototype.type = function () {
            return "";
        };
        return $mol_text_row;
    }($.$mol_view));
    $.$mol_text_row = $mol_text_row;
})($ || ($ = {}));
(function ($) {
    var $mol_text_header = (function (_super) {
        __extends($mol_text_header, _super);
        function $mol_text_header() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_text_header.prototype.dom_name = function () {
            return "h";
        };
        $mol_text_header.prototype.minimal_height = function () {
            return 50;
        };
        $mol_text_header.prototype.attr = function () {
            return (__assign({}, _super.prototype.attr.call(this), { "mol_text_header_level": this.level() }));
        };
        $mol_text_header.prototype.level = function (val, force) {
            return (val !== void 0) ? val : 0;
        };
        $mol_text_header.prototype.sub = function () {
            return this.content();
        };
        $mol_text_header.prototype.content = function () {
            return [];
        };
        __decorate([
            $.$mol_mem
        ], $mol_text_header.prototype, "level", null);
        return $mol_text_header;
    }($.$mol_view));
    $.$mol_text_header = $mol_text_header;
})($ || ($ = {}));
(function ($) {
    var $mol_text_span = (function (_super) {
        __extends($mol_text_span, _super);
        function $mol_text_span() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_text_span.prototype.dom_name = function () {
            return "span";
        };
        $mol_text_span.prototype.attr = function () {
            return (__assign({}, _super.prototype.attr.call(this), { "mol_text_type": this.type() }));
        };
        $mol_text_span.prototype.type = function (val, force) {
            return (val !== void 0) ? val : "";
        };
        $mol_text_span.prototype.sub = function () {
            return this.content();
        };
        $mol_text_span.prototype.content = function (val, force) {
            return (val !== void 0) ? val : [];
        };
        __decorate([
            $.$mol_mem
        ], $mol_text_span.prototype, "type", null);
        __decorate([
            $.$mol_mem
        ], $mol_text_span.prototype, "content", null);
        return $mol_text_span;
    }($.$mol_view));
    $.$mol_text_span = $mol_text_span;
})($ || ($ = {}));
(function ($) {
    var $mol_text_link = (function (_super) {
        __extends($mol_text_link, _super);
        function $mol_text_link() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_text_link.prototype.dom_name = function () {
            return "a";
        };
        $mol_text_link.prototype.attr = function () {
            return (__assign({}, _super.prototype.attr.call(this), { "mol_text_type": this.type(), "href": this.link() }));
        };
        $mol_text_link.prototype.type = function (val, force) {
            return (val !== void 0) ? val : "";
        };
        $mol_text_link.prototype.link = function (val, force) {
            return (val !== void 0) ? val : "";
        };
        $mol_text_link.prototype.sub = function () {
            return this.content();
        };
        $mol_text_link.prototype.content = function (val, force) {
            return (val !== void 0) ? val : [];
        };
        __decorate([
            $.$mol_mem
        ], $mol_text_link.prototype, "type", null);
        __decorate([
            $.$mol_mem
        ], $mol_text_link.prototype, "link", null);
        __decorate([
            $.$mol_mem
        ], $mol_text_link.prototype, "content", null);
        return $mol_text_link;
    }($.$mol_view));
    $.$mol_text_link = $mol_text_link;
})($ || ($ = {}));
(function ($) {
    var $mol_text_image = (function (_super) {
        __extends($mol_text_image, _super);
        function $mol_text_image() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_text_image.prototype.dom_name = function () {
            return "object";
        };
        $mol_text_image.prototype.attr = function () {
            return (__assign({}, _super.prototype.attr.call(this), { "mol_text_type": this.type(), "data": this.link() }));
        };
        $mol_text_image.prototype.type = function (val, force) {
            return (val !== void 0) ? val : "";
        };
        $mol_text_image.prototype.link = function (val, force) {
            return (val !== void 0) ? val : "";
        };
        $mol_text_image.prototype.sub = function () {
            return [].concat(this.title());
        };
        $mol_text_image.prototype.title = function (val, force) {
            return (val !== void 0) ? val : "";
        };
        __decorate([
            $.$mol_mem
        ], $mol_text_image.prototype, "type", null);
        __decorate([
            $.$mol_mem
        ], $mol_text_image.prototype, "link", null);
        __decorate([
            $.$mol_mem
        ], $mol_text_image.prototype, "title", null);
        return $mol_text_image;
    }($.$mol_view));
    $.$mol_text_image = $mol_text_image;
})($ || ($ = {}));
//text.view.tree.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $$;
    (function ($$) {
        var $mol_text = (function (_super) {
            __extends($mol_text, _super);
            function $mol_text() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            $mol_text.prototype.tokens_flow = function () {
                return $.$mol_syntax_md_flow.tokenize(this.text());
            };
            $mol_text.prototype.rows = function () {
                var _this = this;
                return this.tokens_flow().map(function (token, index) {
                    switch (token.name) {
                        case 'table': return _this.Table(index);
                        case 'header': return _this.Header(index);
                    }
                    return _this.Row(index);
                });
            };
            $mol_text.prototype.header_level = function (index) {
                return this.tokens_flow()[index].chunks[0].length;
            };
            $mol_text.prototype.header_content = function (index) {
                return this.text2spans("" + index, this.tokens_flow()[index].chunks[2]);
            };
            $mol_text.prototype.block_type = function (index) {
                return this.tokens_flow()[index].name;
            };
            $mol_text.prototype.cell_contents = function (indexBlock) {
                return this.tokens_flow()[indexBlock].chunks[0]
                    .split(/\r?\n/g)
                    .filter(function (row) { return row && !/\|--/.test(row); })
                    .map(function (row, rowId) {
                    return row.split(/\|/g)
                        .filter(function (cell) { return cell; })
                        .map(function (cell, cellId) { return cell.trim(); });
                });
            };
            $mol_text.prototype.table_rows = function (blockId) {
                var _this = this;
                return this.cell_contents(blockId)
                    .slice(1)
                    .map(function (row, rowId) { return _this.Table_row({ block: blockId, row: rowId + 1 }); });
            };
            $mol_text.prototype.table_head_cells = function (blockId) {
                var _this = this;
                return this.cell_contents(blockId)[0]
                    .map(function (cell, cellId) { return _this.Table_cell_head({ block: blockId, row: 0, cell: cellId }); });
            };
            $mol_text.prototype.table_cells = function (id) {
                var _this = this;
                return this.cell_contents(id.block)[id.row]
                    .map(function (cell, cellId) { return _this.Table_cell({ block: id.block, row: id.row, cell: cellId }); });
            };
            $mol_text.prototype.table_cell_content = function (id) {
                return this.text2spans(id.block + "/" + id.row + "/" + id.cell, this.cell_contents(id.block)[id.row][id.cell]);
            };
            $mol_text.prototype.uri_base = function () {
                return $.$mol_dom_context.document.location.href;
            };
            $mol_text.prototype.uri_resolve = function (uri) {
                var url = new URL(uri, this.uri_base());
                return url.toString();
            };
            $mol_text.prototype.text2spans = function (prefix, text) {
                var _this = this;
                return $.$mol_syntax_md_line.tokenize(text).map(function (token, index) {
                    var id = prefix + "/" + index;
                    switch (token.name) {
                        case 'text-link': {
                            if (/^#|(\w+script+:)+/.test(token.chunks[1])) {
                                var span_1 = _this.Span(id);
                                span_1.content(_this.text2spans(id, token.chunks[0]));
                                return span_1;
                            }
                            else {
                                var span_2 = _this.Link(id);
                                span_2.type(token.name);
                                span_2.link(_this.uri_resolve(token.chunks[1]));
                                span_2.content(_this.text2spans(id, token.chunks[0]));
                                return span_2;
                            }
                        }
                        case 'image-link': {
                            var span_3 = _this.Image(token.chunks[1]);
                            span_3.type(token.name);
                            span_3.link(_this.uri_resolve(token.chunks[1]));
                            span_3.title(token.chunks[0]);
                            return span_3;
                        }
                        case 'code3':
                        case 'code': {
                            var span_4 = _this.Span(id);
                            span_4.type('code');
                            span_4.content(_this.code2spans(id, token.chunks[0]));
                            return span_4;
                        }
                    }
                    var span = _this.Span(id);
                    span.type(token.name);
                    span.content(token.name
                        ? [].concat.apply([], token.chunks.map(function (text, index) { return _this.text2spans(id + "/" + index, text); }))
                        : [token.found]);
                    return span;
                });
            };
            $mol_text.prototype.code2spans = function (prefix, text) {
                var _this = this;
                return $.$mol_syntax_md_code.tokenize(text).map(function (token, index) {
                    var id = prefix + "/" + index;
                    var span = _this.Span(id);
                    span.type(token.name);
                    switch (token.name) {
                        case 'code-docs': {
                            span.content(_this.text2spans(id + "/" + index, token.found));
                            return span;
                        }
                        case 'code-string': {
                            span.content([token.found[0]].concat(_this.code2spans(id + "/" + index, token.found.slice(1, token.found.length - 1)), [token.found[token.found.length - 1]]));
                            return span;
                        }
                        default: {
                            span.content([token.found]);
                            return span;
                        }
                    }
                });
            };
            $mol_text.prototype.block_content = function (indexBlock) {
                var token = this.tokens_flow()[indexBlock];
                switch (token.name) {
                    case 'header': return this.text2spans("" + indexBlock, token.chunks[2]);
                    case 'list': return this.text2spans("" + indexBlock, token.chunks[0]);
                    case 'code': return this.code2spans("" + indexBlock, token.chunks[2].replace(/\t/g, '    '));
                    case 'code-indent': return this.code2spans("" + indexBlock, token.chunks[0].replace(/[\n\r]*$/, '').replace(/\t/g, '    '));
                }
                return this.text2spans("" + indexBlock, token.chunks[0]);
            };
            __decorate([
                $.$mol_mem
            ], $mol_text.prototype, "tokens_flow", null);
            __decorate([
                $.$mol_mem_key
            ], $mol_text.prototype, "cell_contents", null);
            return $mol_text;
        }($.$mol_text));
        $$.$mol_text = $mol_text;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//text.view.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var $;
(function ($) {
    var $mol_row = (function (_super) {
        __extends($mol_row, _super);
        function $mol_row() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return $mol_row;
    }($.$mol_view));
    $.$mol_row = $mol_row;
})($ || ($ = {}));
(function ($) {
    var $mol_row_sub = (function (_super) {
        __extends($mol_row_sub, _super);
        function $mol_row_sub() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return $mol_row_sub;
    }($.$mol_view));
    $.$mol_row_sub = $mol_row_sub;
})($ || ($ = {}));
//row.view.tree.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $$;
    (function ($$) {
        var $mol_row = (function (_super) {
            __extends($mol_row, _super);
            function $mol_row() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            $mol_row.prototype.item_offsets_top = function () {
                var next = [];
                var sub = this.sub();
                if (!sub)
                    return next;
                var context = this.context_sub();
                var widthLimit = context.$mol_view_visible_width();
                var allHeight = 0;
                var rowWidth = 0;
                var row_height = 0;
                for (var _i = 0, sub_1 = sub; _i < sub_1.length; _i++) {
                    var child = sub_1[_i];
                    next.push(allHeight);
                    if (!(child instanceof $.$mol_view))
                        continue;
                    var width = child.minimal_width();
                    var height = child.minimal_height();
                    rowWidth += width;
                    if (rowWidth > widthLimit) {
                        allHeight += row_height;
                        rowWidth = width;
                        row_height = height;
                    }
                    else {
                        row_height = Math.max(row_height, height);
                    }
                }
                next.push(allHeight + row_height);
                return next;
            };
            $mol_row.prototype.sub_visible = function () {
                var sub = this.sub();
                var visible = [];
                var context = this.context_sub();
                var heightLimit = context.$mol_view_visible_height();
                var offsets = this.item_offsets_top();
                var height = 0;
                for (var i = 0; i < offsets.length - 1; ++i) {
                    if (offsets[i] > heightLimit)
                        break;
                    var child = sub[i];
                    if (child instanceof $.$mol_view) {
                        child.context(context);
                    }
                    visible.push(child);
                }
                return visible;
            };
            $mol_row.prototype.minimal_height = function () {
                var offsets = this.item_offsets_top();
                return offsets[offsets.length - 1];
            };
            __decorate([
                $.$mol_mem
            ], $mol_row.prototype, "item_offsets_top", null);
            return $mol_row;
        }($.$mol_row));
        $$.$mol_row = $mol_row;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//row.view.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_portion_indicator = (function (_super) {
        __extends($mol_portion_indicator, _super);
        function $mol_portion_indicator() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_portion_indicator.prototype.style = function () {
            return (__assign({}, _super.prototype.style.call(this), { "width": this.width_style() }));
        };
        $mol_portion_indicator.prototype.width_style = function () {
            return "0";
        };
        return $mol_portion_indicator;
    }($.$mol_view));
    $.$mol_portion_indicator = $mol_portion_indicator;
})($ || ($ = {}));
(function ($) {
    var $mol_portion = (function (_super) {
        __extends($mol_portion, _super);
        function $mol_portion() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_portion.prototype.portion = function () {
            return 0;
        };
        $mol_portion.prototype.sub = function () {
            return [].concat(this.indicator());
        };
        $mol_portion.prototype.indicator = function () {
            var _this = this;
            return (function (obj) {
                obj.width_style = function () { return _this.indicator_width_style(); };
                return obj;
            })(new this.$.$mol_portion_indicator);
        };
        $mol_portion.prototype.indicator_width_style = function () {
            return "0";
        };
        __decorate([
            $.$mol_mem
        ], $mol_portion.prototype, "indicator", null);
        return $mol_portion;
    }($.$mol_view));
    $.$mol_portion = $mol_portion;
})($ || ($ = {}));
//portion.view.tree.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var $;
(function ($) {
    var $$;
    (function ($$) {
        var $mol_portion = (function (_super) {
            __extends($mol_portion, _super);
            function $mol_portion() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            $mol_portion.prototype.indicator_width_style = function () {
                return this.portion() * 100 + '%';
            };
            return $mol_portion;
        }($.$mol_portion));
        $$.$mol_portion = $mol_portion;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//portion.view.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var $;
(function ($) {
    var $mol_icon_sort_asc = (function (_super) {
        __extends($mol_icon_sort_asc, _super);
        function $mol_icon_sort_asc() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_icon_sort_asc.prototype.path = function () {
            return "M10,11V13H18V11H10M10,5V7H14V5H10M10,17V19H22V17H10M6,7H8.5L5,3.5L1.5,7H4V20H6V7Z";
        };
        return $mol_icon_sort_asc;
    }($.$mol_icon));
    $.$mol_icon_sort_asc = $mol_icon_sort_asc;
})($ || ($ = {}));
//asc.view.tree.js.map
;
var $;
(function ($) {
    function $mol_merge_dict(target, source) {
        var result = {};
        for (var key in target)
            result[key] = target[key];
        for (var key in source)
            result[key] = source[key];
        return result;
    }
    $.$mol_merge_dict = $mol_merge_dict;
})($ || ($ = {}));
//dict.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_state_arg = (function (_super) {
        __extends($mol_state_arg, _super);
        function $mol_state_arg(prefix) {
            if (prefix === void 0) { prefix = ''; }
            var _this = _super.call(this) || this;
            _this.prefix = prefix;
            return _this;
        }
        $mol_state_arg.href = function (next, force) {
            if (next)
                history.replaceState(history.state, $.$mol_dom_context.document.title, "" + next);
            return window.location.search + window.location.hash;
        };
        $mol_state_arg.dict = function (next) {
            var href = this.href(next && this.make_link(next));
            var chunks = href.split(/[\/\?#&;]/g);
            var params = {};
            chunks.forEach(function (chunk) {
                if (!chunk)
                    return;
                var vals = chunk.split('=').map(decodeURIComponent);
                params[vals.shift()] = vals.join('=');
            });
            return params;
        };
        $mol_state_arg.value = function (key, next) {
            var nextDict = (next === void 0) ? void 0 : $.$mol_merge_dict(this.dict(), (_a = {}, _a[key] = next, _a));
            var next2 = this.dict(nextDict)[key];
            return (next2 == null) ? null : next2;
            var _a;
        };
        $mol_state_arg.link = function (next) {
            return this.make_link($.$mol_merge_dict(this.dict(), next));
        };
        $mol_state_arg.make_link = function (next) {
            var chunks = [];
            for (var key in next) {
                if (null == next[key])
                    continue;
                chunks.push([key].concat(next[key] ? next[key] : []).map(encodeURIComponent).join('='));
            }
            return '#' + chunks.join('/');
        };
        $mol_state_arg.prototype.value = function (key, next) {
            return $mol_state_arg.value(this.prefix + key, next);
        };
        $mol_state_arg.prototype.sub = function (postfix) {
            return new $mol_state_arg(this.prefix + postfix + '.');
        };
        $mol_state_arg.prototype.link = function (next) {
            var prefix = this.prefix;
            var dict = {};
            for (var key in next) {
                dict[prefix + key] = next[key];
            }
            return $mol_state_arg.link(dict);
        };
        __decorate([
            $.$mol_mem
        ], $mol_state_arg, "href", null);
        __decorate([
            $.$mol_mem
        ], $mol_state_arg, "dict", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_state_arg, "value", null);
        return $mol_state_arg;
    }($.$mol_object));
    $.$mol_state_arg = $mol_state_arg;
    window.addEventListener('hashchange', function (event) { return $mol_state_arg.href(undefined, $.$mol_atom_force); });
})($ || ($ = {}));
//arg.web.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_bench = (function (_super) {
        __extends($mol_bench, _super);
        function $mol_bench() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_bench.prototype.result = function () {
            return ({});
        };
        $mol_bench.prototype.records = function () {
            return this.result_sorted();
        };
        $mol_bench.prototype.result_sorted = function () {
            return null;
        };
        $mol_bench.prototype.col_sort = function (val, force) {
            return (val !== void 0) ? val : "";
        };
        $mol_bench.prototype.Col_head = function (id) {
            var _this = this;
            return (function (obj) {
                obj.event_click = function (val) { return _this.event_sort_toggle(id, val); };
                obj.sub = function () { return _this.col_head_content(id); };
                return obj;
            })(new this.$.$mol_bench_head);
        };
        $mol_bench.prototype.event_sort_toggle = function (id, val, force) {
            return (val !== void 0) ? val : null;
        };
        $mol_bench.prototype.col_head_content = function (id) {
            return [].concat(this.col_head_label(id), this.Col_head_sort(id));
        };
        $mol_bench.prototype.col_head_label = function (id) {
            return [];
        };
        $mol_bench.prototype.Col_head_sort = function (id) {
            return (function (obj) {
                return obj;
            })(new this.$.$mol_icon_sort_asc);
        };
        $mol_bench.prototype.cell_content_number = function (id) {
            return [].concat(this.result_value(id), this.Result_portion(id));
        };
        $mol_bench.prototype.result_value = function (id) {
            return "";
        };
        $mol_bench.prototype.Result_portion = function (id) {
            var _this = this;
            return (function (obj) {
                obj.portion = function () { return _this.result_portion(id); };
                return obj;
            })(new this.$.$mol_portion);
        };
        $mol_bench.prototype.result_portion = function (id) {
            return 0;
        };
        __decorate([
            $.$mol_mem
        ], $mol_bench.prototype, "col_sort", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_bench.prototype, "Col_head", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_bench.prototype, "event_sort_toggle", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_bench.prototype, "Col_head_sort", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_bench.prototype, "Result_portion", null);
        return $mol_bench;
    }($.$mol_grid));
    $.$mol_bench = $mol_bench;
})($ || ($ = {}));
(function ($) {
    var $mol_bench_head = (function (_super) {
        __extends($mol_bench_head, _super);
        function $mol_bench_head() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_bench_head.prototype.event = function () {
            var _this = this;
            return (__assign({}, _super.prototype.event.call(this), { "click": function (val) { return _this.event_click(val); } }));
        };
        $mol_bench_head.prototype.event_click = function (val, force) {
            return (val !== void 0) ? val : null;
        };
        $mol_bench_head.prototype.attr = function () {
            return (__assign({}, _super.prototype.attr.call(this), { "title": this.hint() }));
        };
        $mol_bench_head.prototype.hint = function () {
            return $.$mol_locale.text(this.locale_contexts(), "hint");
        };
        __decorate([
            $.$mol_mem
        ], $mol_bench_head.prototype, "event_click", null);
        return $mol_bench_head;
    }($.$mol_float));
    $.$mol_bench_head = $mol_bench_head;
})($ || ($ = {}));
//bench.view.tree.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $$;
    (function ($$) {
        var $mol_bench = (function (_super) {
            __extends($mol_bench, _super);
            function $mol_bench() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            $mol_bench.prototype.col_sort = function (next) {
                return $.$mol_state_arg.value(this.state_key('sort'), next);
            };
            $mol_bench.prototype.result_sorted = function () {
                var _this = this;
                var prev = this.result();
                var col = this.col_sort();
                if (!col)
                    return prev;
                var next = {};
                var keys = Object.keys(prev);
                keys.sort(function (a, b) { return _this.result_number({ row: ['', a], col: col }) - _this.result_number({ row: ['', b], col: col }); });
                keys.forEach(function (row) { return next[row] = prev[row]; });
                return next;
            };
            $mol_bench.prototype.result_value = function (id) {
                return this.result()[id.row[id.row.length - 1]][id.col];
            };
            $mol_bench.prototype.result_number = function (id) {
                return parseInt(this.result_value(id), 10);
            };
            $mol_bench.prototype.result_value_max = function (col) {
                var _this = this;
                var max = 0;
                var rows = this.row_ids();
                rows.forEach(function (row) {
                    var numb = _this.result_number({ row: row, col: col });
                    if (numb > max)
                        max = numb;
                });
                return max;
            };
            $mol_bench.prototype.result_portion = function (id) {
                return this.result_number(id) / this.result_value_max(id.col);
            };
            $mol_bench.prototype.col_head_label = function (col) {
                return [col];
            };
            $mol_bench.prototype.event_sort_toggle = function (col, next) {
                this.col_sort(col);
            };
            $mol_bench.prototype.col_type = function (col) {
                if (col === this.hierarchy_col())
                    return 'branch';
                var rowFirst = this.row_id(0);
                var val = this.record(rowFirst[rowFirst.length - 1])[col];
                if (!isNaN(parseFloat(val)))
                    return 'number';
                return 'text';
            };
            $mol_bench.prototype.cell_content_number = function (id) {
                return [
                    this.result_value(id)
                ].concat((this.col_sort() === id.col) ? [this.Result_portion(id)] : []);
            };
            $mol_bench.prototype.col_head_content = function (col) {
                return [
                    this.col_head_label(col)
                ].concat((this.col_sort() === col) ? [this.Col_head_sort(col)] : []);
            };
            __decorate([
                $.$mol_mem
            ], $mol_bench.prototype, "col_sort", null);
            __decorate([
                $.$mol_mem
            ], $mol_bench.prototype, "result_sorted", null);
            __decorate([
                $.$mol_mem_key
            ], $mol_bench.prototype, "result_value_max", null);
            __decorate([
                $.$mol_mem_key
            ], $mol_bench.prototype, "col_type", null);
            return $mol_bench;
        }($.$mol_bench));
        $$.$mol_bench = $mol_bench;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//bench.view.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_labeler = (function (_super) {
        __extends($mol_labeler, _super);
        function $mol_labeler() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_labeler.prototype.sub = function () {
            return [].concat(this.Title(), this.Content());
        };
        $mol_labeler.prototype.Title = function () {
            var _this = this;
            return (function (obj) {
                obj.sub = function () { return _this.label(); };
                return obj;
            })(new this.$.$mol_view);
        };
        $mol_labeler.prototype.label = function () {
            return [].concat(this.title());
        };
        $mol_labeler.prototype.Content = function () {
            var _this = this;
            return (function (obj) {
                obj.sub = function () { return [].concat(_this.content()); };
                return obj;
            })(new this.$.$mol_view);
        };
        $mol_labeler.prototype.content = function () {
            return null;
        };
        __decorate([
            $.$mol_mem
        ], $mol_labeler.prototype, "Title", null);
        __decorate([
            $.$mol_mem
        ], $mol_labeler.prototype, "Content", null);
        return $mol_labeler;
    }($.$mol_view));
    $.$mol_labeler = $mol_labeler;
})($ || ($ = {}));
//labeler.view.tree.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var $;
(function ($) {
    var $mol_icon_minus = (function (_super) {
        __extends($mol_icon_minus, _super);
        function $mol_icon_minus() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_icon_minus.prototype.path = function () {
            return "M19 13H5v-2h14v2z";
        };
        return $mol_icon_minus;
    }($.$mol_icon));
    $.$mol_icon_minus = $mol_icon_minus;
})($ || ($ = {}));
//minus.view.tree.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var $;
(function ($) {
    var $mol_icon_plus = (function (_super) {
        __extends($mol_icon_plus, _super);
        function $mol_icon_plus() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_icon_plus.prototype.path = function () {
            return "M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z";
        };
        return $mol_icon_plus;
    }($.$mol_icon));
    $.$mol_icon_plus = $mol_icon_plus;
})($ || ($ = {}));
//plus.view.tree.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_number = (function (_super) {
        __extends($mol_number, _super);
        function $mol_number() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_number.prototype.precision_view = function () {
            return this.precision();
        };
        $mol_number.prototype.precision = function () {
            return 1;
        };
        $mol_number.prototype.precision_change = function () {
            return this.precision();
        };
        $mol_number.prototype.value = function (val, force) {
            return (val !== void 0) ? val : NaN;
        };
        $mol_number.prototype.sub = function () {
            return [].concat(this.Dec(), this.String(), this.Inc());
        };
        $mol_number.prototype.Dec = function () {
            var _this = this;
            return (function (obj) {
                obj.event_click = function (val) { return _this.event_dec(val); };
                obj.enabled = function () { return _this.dec_enabled(); };
                obj.sub = function () { return [].concat(_this.dec_icon()); };
                return obj;
            })(new this.$.$mol_button_minor);
        };
        $mol_number.prototype.event_dec = function (val, force) {
            return (val !== void 0) ? val : null;
        };
        $mol_number.prototype.dec_enabled = function () {
            return this.enabled();
        };
        $mol_number.prototype.enabled = function () {
            return true;
        };
        $mol_number.prototype.dec_icon = function () {
            return (function (obj) {
                return obj;
            })(new this.$.$mol_icon_minus);
        };
        $mol_number.prototype.String = function () {
            var _this = this;
            return (function (obj) {
                obj.type = function () { return "number"; };
                obj.value = function (val) { return _this.value_string(val); };
                obj.hint = function () { return _this.hint(); };
                obj.enabled = function () { return _this.string_enabled(); };
                obj.debounce = function () { return _this.debounce(); };
                return obj;
            })(new this.$.$mol_string);
        };
        $mol_number.prototype.value_string = function (val, force) {
            return (val !== void 0) ? val : "";
        };
        $mol_number.prototype.hint = function () {
            return "";
        };
        $mol_number.prototype.string_enabled = function () {
            return this.enabled();
        };
        $mol_number.prototype.debounce = function () {
            return 200;
        };
        $mol_number.prototype.Inc = function () {
            var _this = this;
            return (function (obj) {
                obj.event_click = function (val) { return _this.event_inc(val); };
                obj.enabled = function () { return _this.inc_enabled(); };
                obj.sub = function () { return [].concat(_this.inc_icon()); };
                return obj;
            })(new this.$.$mol_button_minor);
        };
        $mol_number.prototype.event_inc = function (val, force) {
            return (val !== void 0) ? val : null;
        };
        $mol_number.prototype.inc_enabled = function () {
            return this.enabled();
        };
        $mol_number.prototype.inc_icon = function () {
            return (function (obj) {
                return obj;
            })(new this.$.$mol_icon_plus);
        };
        __decorate([
            $.$mol_mem
        ], $mol_number.prototype, "value", null);
        __decorate([
            $.$mol_mem
        ], $mol_number.prototype, "Dec", null);
        __decorate([
            $.$mol_mem
        ], $mol_number.prototype, "event_dec", null);
        __decorate([
            $.$mol_mem
        ], $mol_number.prototype, "dec_icon", null);
        __decorate([
            $.$mol_mem
        ], $mol_number.prototype, "String", null);
        __decorate([
            $.$mol_mem
        ], $mol_number.prototype, "value_string", null);
        __decorate([
            $.$mol_mem
        ], $mol_number.prototype, "Inc", null);
        __decorate([
            $.$mol_mem
        ], $mol_number.prototype, "event_inc", null);
        __decorate([
            $.$mol_mem
        ], $mol_number.prototype, "inc_icon", null);
        return $mol_number;
    }($.$mol_view));
    $.$mol_number = $mol_number;
})($ || ($ = {}));
//number.view.tree.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var $;
(function ($) {
    var $$;
    (function ($$) {
        var $mol_number = (function (_super) {
            __extends($mol_number, _super);
            function $mol_number() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            $mol_number.prototype.event_dec = function (next) {
                this.value((this.value() || 0) - this.precision_change());
            };
            $mol_number.prototype.event_inc = function (next) {
                this.value((Number(this.value()) || 0) + this.precision_change());
            };
            $mol_number.prototype.value_string = function (next) {
                if (next !== void 0) {
                    this.value(next === '' ? null : Number(next));
                }
                var precisionView = this.precision_view();
                var value = next ? Number(next) : this.value();
                if (value === null)
                    return '';
                if (precisionView >= 1) {
                    return (value / precisionView).toFixed();
                }
                else {
                    var fixedNumber = Math.log(1 / precisionView) / Math.log(10);
                    return value.toFixed(fixedNumber);
                }
            };
            return $mol_number;
        }($.$mol_number));
        $$.$mol_number = $mol_number;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//number.view.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_app_bench = (function (_super) {
        __extends($mol_app_bench, _super);
        function $mol_app_bench() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_app_bench.prototype.sub = function () {
            return [].concat(this.Addon_page(), this.Main_page(), this.Sandbox_page());
        };
        $mol_app_bench.prototype.Addon_page = function () {
            var _this = this;
            return (function (obj) {
                obj.title = function () { return _this.addon_title(); };
                obj.body = function () { return [].concat(_this.Filter(), _this.Menu()); };
                return obj;
            })(new this.$.$mol_page);
        };
        $mol_app_bench.prototype.addon_title = function () {
            return $.$mol_locale.text(this.locale_contexts(), "addon_title");
        };
        $mol_app_bench.prototype.Filter = function () {
            var _this = this;
            return (function (obj) {
                obj.query = function (val) { return _this.filter(val); };
                return obj;
            })(new this.$.$mol_search);
        };
        $mol_app_bench.prototype.filter = function (val, force) {
            return (val !== void 0) ? val : "";
        };
        $mol_app_bench.prototype.Menu = function () {
            var _this = this;
            return (function (obj) {
                obj.rows = function () { return _this.menu_options(); };
                return obj;
            })(new this.$.$mol_list);
        };
        $mol_app_bench.prototype.menu_options = function () {
            return [];
        };
        $mol_app_bench.prototype.Main_page = function () {
            var _this = this;
            return (function (obj) {
                obj.title = function () { return _this.title(); };
                obj.body = function () { return [].concat(_this.Inform()); };
                return obj;
            })(new this.$.$mol_page);
        };
        $mol_app_bench.prototype.Inform = function () {
            var _this = this;
            return (function (obj) {
                obj.sub = function () { return [].concat(_this.Descr_scroll(), _this.Param_fields(), _this.Result()); };
                return obj;
            })(new this.$.$mol_view);
        };
        $mol_app_bench.prototype.Descr_scroll = function () {
            var _this = this;
            return (function (obj) {
                obj.sub = function () { return [].concat(_this.Descr()); };
                return obj;
            })(new this.$.$mol_scroll);
        };
        $mol_app_bench.prototype.Descr = function () {
            var _this = this;
            return (function (obj) {
                obj.text = function () { return _this.description(); };
                return obj;
            })(new this.$.$mol_text);
        };
        $mol_app_bench.prototype.description = function () {
            return "";
        };
        $mol_app_bench.prototype.Param_fields = function () {
            var _this = this;
            return (function (obj) {
                obj.sub = function () { return [].concat(_this.param_fields()); };
                return obj;
            })(new this.$.$mol_row);
        };
        $mol_app_bench.prototype.param_fields = function () {
            return [];
        };
        $mol_app_bench.prototype.Result = function () {
            var _this = this;
            return (function (obj) {
                obj.result = function () { return _this.result(); };
                obj.col_head_label = function (id) { return [].concat(_this.result_col_title(id)); };
                obj.col_sort = function (val) { return _this.result_col_sort(val); };
                return obj;
            })(new this.$.$mol_bench);
        };
        $mol_app_bench.prototype.result = function () {
            return null;
        };
        $mol_app_bench.prototype.result_col_title = function (id) {
            return [];
        };
        $mol_app_bench.prototype.result_col_sort = function (val, force) {
            return (val !== void 0) ? val : "";
        };
        $mol_app_bench.prototype.Sandbox_page = function () {
            var _this = this;
            return (function (obj) {
                obj.title = function () { return _this.sandbox_title(); };
                obj.Body = function () { return _this.Sandbox(); };
                return obj;
            })(new this.$.$mol_page);
        };
        $mol_app_bench.prototype.sandbox_title = function () {
            return "";
        };
        $mol_app_bench.prototype.Sandbox = function () {
            return (function (obj) {
                obj.dom_name = function () { return "iframe"; };
                return obj;
            })(new this.$.$mol_scroll);
        };
        $mol_app_bench.prototype.Menu_option = function (id) {
            var _this = this;
            return (function (obj) {
                obj.minimal_height = function () { return 36; };
                obj.checked = function (val) { return _this.menu_option_checked(id, val); };
                obj.title = function () { return _this.sample_title(id); };
                return obj;
            })(new this.$.$mol_check_box);
        };
        $mol_app_bench.prototype.menu_option_checked = function (id, val, force) {
            return (val !== void 0) ? val : false;
        };
        $mol_app_bench.prototype.sample_title = function (id) {
            return "";
        };
        $mol_app_bench.prototype.Param = function (id) {
            var _this = this;
            return (function (obj) {
                obj.title = function () { return _this.param_title(id); };
                obj.content = function () { return [].concat(_this.Param_value(id)); };
                return obj;
            })(new this.$.$mol_labeler);
        };
        $mol_app_bench.prototype.param_title = function (id) {
            return "";
        };
        $mol_app_bench.prototype.Param_value = function (id) {
            var _this = this;
            return (function (obj) {
                obj.value = function (val) { return _this.param_value(id, val); };
                obj.precision_change = function () { return _this.param_precision(id); };
                obj.debounce = function () { return 1000; };
                return obj;
            })(new this.$.$mol_number);
        };
        $mol_app_bench.prototype.param_value = function (id, val, force) {
            return (val !== void 0) ? val : "";
        };
        $mol_app_bench.prototype.param_precision = function (id) {
            return 0;
        };
        $mol_app_bench.prototype.result_col_title_sample = function () {
            return $.$mol_locale.text(this.locale_contexts(), "result_col_title_sample");
        };
        __decorate([
            $.$mol_mem
        ], $mol_app_bench.prototype, "Addon_page", null);
        __decorate([
            $.$mol_mem
        ], $mol_app_bench.prototype, "Filter", null);
        __decorate([
            $.$mol_mem
        ], $mol_app_bench.prototype, "filter", null);
        __decorate([
            $.$mol_mem
        ], $mol_app_bench.prototype, "Menu", null);
        __decorate([
            $.$mol_mem
        ], $mol_app_bench.prototype, "Main_page", null);
        __decorate([
            $.$mol_mem
        ], $mol_app_bench.prototype, "Inform", null);
        __decorate([
            $.$mol_mem
        ], $mol_app_bench.prototype, "Descr_scroll", null);
        __decorate([
            $.$mol_mem
        ], $mol_app_bench.prototype, "Descr", null);
        __decorate([
            $.$mol_mem
        ], $mol_app_bench.prototype, "Param_fields", null);
        __decorate([
            $.$mol_mem
        ], $mol_app_bench.prototype, "Result", null);
        __decorate([
            $.$mol_mem
        ], $mol_app_bench.prototype, "result_col_sort", null);
        __decorate([
            $.$mol_mem
        ], $mol_app_bench.prototype, "Sandbox_page", null);
        __decorate([
            $.$mol_mem
        ], $mol_app_bench.prototype, "Sandbox", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_app_bench.prototype, "Menu_option", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_app_bench.prototype, "menu_option_checked", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_app_bench.prototype, "Param", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_app_bench.prototype, "Param_value", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_app_bench.prototype, "param_value", null);
        return $mol_app_bench;
    }($.$mol_view));
    $.$mol_app_bench = $mol_app_bench;
})($ || ($ = {}));
//bench.view.tree.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $$;
    (function ($$) {
        var $mol_app_bench = (function (_super) {
            __extends($mol_app_bench, _super);
            function $mol_app_bench() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            $mol_app_bench.prototype.bench = function (next) {
                return $.$mol_state_arg.value(this.state_key('bench'), next) || 'list/';
            };
            $mol_app_bench.prototype.sandbox = function (next, force) {
                var _this = this;
                var next2 = this.Sandbox().dom_node();
                next2.src = this.bench();
                next2.onload = function (event) {
                    next2.onload = null;
                    _this.sandbox(next2, $.$mol_atom_force);
                };
                throw new $.$mol_atom_wait("Loading sandbox...");
            };
            $mol_app_bench.prototype.command_current = function (next, force) {
                if (this['command_current()']['value()'])
                    return;
                return next;
            };
            $mol_app_bench.prototype.command_result = function (command, next) {
                var _this = this;
                var sandbox = this.sandbox();
                sandbox.valueOf();
                if (next !== void 0)
                    return next;
                var current = this.command_current(command);
                if (current !== command)
                    throw new $.$mol_atom_wait("Waiting for " + JSON.stringify(current) + "...");
                requestAnimationFrame(function () {
                    sandbox.contentWindow.postMessage(command, '*');
                    window.onmessage = function (event) {
                        if (event.data[0] !== 'done')
                            return;
                        window.onmessage = null;
                        _this.command_current(null, $.$mol_atom_force);
                        _this.command_result(command, event.data[1]);
                    };
                });
                throw new $.$mol_atom_wait("Running " + command + "...");
            };
            $mol_app_bench.prototype.meta = function () {
                return this.command_result(['meta']);
            };
            $mol_app_bench.prototype.samples_all = function (next) {
                var _this = this;
                return Object.keys(this.meta().samples).sort(function (a, b) {
                    var titleA = _this.sample_title(a).toLowerCase();
                    var titleB = _this.sample_title(a).toLowerCase();
                    return titleA > titleB ? 1 : titleA < titleB ? -1 : 0;
                });
            };
            $mol_app_bench.prototype.samples = function (next) {
                var arg = $.$mol_state_arg.value(this.state_key('sample'), next && next.join('~'));
                return arg ? arg.split('~').sort() : [];
            };
            $mol_app_bench.prototype.steps = function (next) {
                return Object.keys(this.meta().steps);
            };
            $mol_app_bench.prototype.title = function () {
                var title = this.meta().title;
                return title[$.$mol_locale.lang()] || title['en'] || _super.prototype.title.call(this);
            };
            $mol_app_bench.prototype.description = function () {
                var descr = this.meta().descr;
                return descr[$.$mol_locale.lang()] || descr['en'] || '';
            };
            $mol_app_bench.prototype.result_sample = function (sampleId) {
                var _this = this;
                var result = {
                    sample: this.sample_title(sampleId),
                };
                this.steps().forEach(function (step) {
                    result[step] = _this.command_result([step, sampleId, _this.param_dict()]);
                });
                return result;
            };
            $mol_app_bench.prototype.result = function () {
                var _this = this;
                var result = {};
                this.samples().forEach(function (sample) {
                    result[sample] = _this.result_sample(sample);
                });
                return result;
            };
            $mol_app_bench.prototype.sandbox_title = function () {
                var command = this.command_current();
                if (!command)
                    return;
                return this.sample_title(command[1]) + ": " + this.step_title(command[0]);
            };
            $mol_app_bench.prototype.result_col_title = function (col_id) {
                if (col_id === 'sample')
                    return [this.result_col_title_sample()];
                return this.step_title(col_id);
            };
            $mol_app_bench.prototype.step_title = function (step) {
                var title = this.meta().steps[step].title;
                return [title[$.$mol_locale.lang()] || title['en']];
            };
            $mol_app_bench.prototype.result_col_sort = function (next) {
                return $.$mol_state_arg.value(this.state_key('sort'), next);
            };
            $mol_app_bench.prototype.menu_options = function () {
                var _this = this;
                var filter = this.filter().toLowerCase();
                return this.samples_all()
                    .filter(function (sample) { return _this.sample_title(sample).toLowerCase().match(filter); })
                    .map(function (sample) { return _this.Menu_option(sample); });
            };
            $mol_app_bench.prototype.sample_title = function (sample) {
                var title = this.meta().samples[sample].title;
                return title[$.$mol_locale.lang()] || title['en'];
            };
            $mol_app_bench.prototype.menu_option_checked = function (sample, next) {
                if (next === void 0)
                    return this.samples().indexOf(sample) !== -1;
                if (next)
                    this.samples(this.samples().concat(sample));
                else
                    this.samples(this.samples().filter(function (s) { return s !== sample; }));
                return next;
            };
            $mol_app_bench.prototype.params = function () {
                return Object.keys(this.meta().params || {});
            };
            $mol_app_bench.prototype.param_fields = function () {
                var _this = this;
                return this.params().map(function (param) { return _this.Param(param); });
            };
            $mol_app_bench.prototype.param_title = function (id) {
                var title = this.meta().params[id].title;
                return title[$.$mol_locale.lang()] || title['en'];
            };
            $mol_app_bench.prototype.param_value = function (id, next) {
                var next_2 = $.$mol_state_arg.value(this.state_key(id), next);
                return next_2 || this.meta().params[id].default;
            };
            $mol_app_bench.prototype.param_precision = function (id) {
                return this.meta().params[id].precision;
            };
            $mol_app_bench.prototype.param_dict = function () {
                var param_dict = {};
                var params = this.params();
                for (var _i = 0, params_1 = params; _i < params_1.length; _i++) {
                    var param = params_1[_i];
                    param_dict[param] = this.param_value(param);
                }
                return param_dict;
            };
            __decorate([
                $.$mol_mem
            ], $mol_app_bench.prototype, "bench", null);
            __decorate([
                $.$mol_mem
            ], $mol_app_bench.prototype, "sandbox", null);
            __decorate([
                $.$mol_mem
            ], $mol_app_bench.prototype, "command_current", null);
            __decorate([
                $.$mol_mem_key
            ], $mol_app_bench.prototype, "command_result", null);
            __decorate([
                $.$mol_mem
            ], $mol_app_bench.prototype, "samples_all", null);
            __decorate([
                $.$mol_mem
            ], $mol_app_bench.prototype, "samples", null);
            __decorate([
                $.$mol_mem
            ], $mol_app_bench.prototype, "steps", null);
            __decorate([
                $.$mol_mem
            ], $mol_app_bench.prototype, "title", null);
            __decorate([
                $.$mol_mem
            ], $mol_app_bench.prototype, "description", null);
            __decorate([
                $.$mol_mem_key
            ], $mol_app_bench.prototype, "result_sample", null);
            __decorate([
                $.$mol_mem
            ], $mol_app_bench.prototype, "result", null);
            __decorate([
                $.$mol_mem
            ], $mol_app_bench.prototype, "sandbox_title", null);
            __decorate([
                $.$mol_mem
            ], $mol_app_bench.prototype, "result_col_sort", null);
            __decorate([
                $.$mol_mem
            ], $mol_app_bench.prototype, "menu_options", null);
            __decorate([
                $.$mol_mem_key
            ], $mol_app_bench.prototype, "menu_option_checked", null);
            __decorate([
                $.$mol_mem_key
            ], $mol_app_bench.prototype, "param_value", null);
            __decorate([
                $.$mol_mem
            ], $mol_app_bench.prototype, "param_dict", null);
            return $mol_app_bench;
        }($.$mol_app_bench));
        $$.$mol_app_bench = $mol_app_bench;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//bench.view.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_plot_pane = (function (_super) {
        __extends($mol_plot_pane, _super);
        function $mol_plot_pane() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_plot_pane.prototype.aspect = function () {
            return "none";
        };
        $mol_plot_pane.prototype.hue_base = function (val, force) {
            return (val !== void 0) ? val : 140;
        };
        $mol_plot_pane.prototype.hue_shift = function (val, force) {
            return (val !== void 0) ? val : 111;
        };
        $mol_plot_pane.prototype.gap = function () {
            return 24;
        };
        $mol_plot_pane.prototype.gap_hor = function () {
            return this.gap();
        };
        $mol_plot_pane.prototype.gap_vert = function () {
            return this.gap();
        };
        $mol_plot_pane.prototype.gap_left = function () {
            return this.gap_hor();
        };
        $mol_plot_pane.prototype.gap_right = function () {
            return this.gap_hor();
        };
        $mol_plot_pane.prototype.gap_top = function () {
            return this.gap_vert();
        };
        $mol_plot_pane.prototype.gap_bottom = function () {
            return this.gap_vert();
        };
        $mol_plot_pane.prototype.shift = function () {
            return [].concat(0, 0);
        };
        $mol_plot_pane.prototype.scale = function () {
            return [].concat(1, 1);
        };
        $mol_plot_pane.prototype.sub = function () {
            return this.graphs_sorted();
        };
        $mol_plot_pane.prototype.graphs_sorted = function () {
            return this.graphs_colored();
        };
        $mol_plot_pane.prototype.graphs_colored = function () {
            return this.graphs_positioned();
        };
        $mol_plot_pane.prototype.graphs_positioned = function () {
            return this.graphs();
        };
        $mol_plot_pane.prototype.graphs = function () {
            return [];
        };
        $mol_plot_pane.prototype.plugins = function () {
            return [].concat(this.Meter());
        };
        $mol_plot_pane.prototype.width = function () {
            return this.Meter().width();
        };
        $mol_plot_pane.prototype.height = function () {
            return this.Meter().height();
        };
        $mol_plot_pane.prototype.Meter = function () {
            return (function (obj) {
                return obj;
            })(new this.$.$mol_meter);
        };
        __decorate([
            $.$mol_mem
        ], $mol_plot_pane.prototype, "hue_base", null);
        __decorate([
            $.$mol_mem
        ], $mol_plot_pane.prototype, "hue_shift", null);
        __decorate([
            $.$mol_mem
        ], $mol_plot_pane.prototype, "Meter", null);
        return $mol_plot_pane;
    }($.$mol_svg_root));
    $.$mol_plot_pane = $mol_plot_pane;
})($ || ($ = {}));
//pane.view.tree.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $$;
    (function ($$) {
        var $mol_plot_pane = (function (_super) {
            __extends($mol_plot_pane, _super);
            function $mol_plot_pane() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            $mol_plot_pane.prototype.dimensions = function () {
                var graphs = this.graphs();
                var next = [
                    [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY],
                    [Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY],
                ];
                for (var _i = 0, graphs_1 = graphs; _i < graphs_1.length; _i++) {
                    var graph = graphs_1[_i];
                    var dims = graph.dimensions();
                    if (dims[0][0] < next[0][0])
                        next[0][0] = dims[0][0];
                    if (dims[0][1] < next[0][1])
                        next[0][1] = dims[0][1];
                    if (dims[1][0] > next[1][0])
                        next[1][0] = dims[1][0];
                    if (dims[1][1] > next[1][1])
                        next[1][1] = dims[1][1];
                }
                return next;
            };
            $mol_plot_pane.prototype.size = function () {
                var dims = this.dimensions();
                return [
                    (dims[1][0] - dims[0][0]) || 1,
                    (dims[1][1] - dims[0][1]) || 1,
                ];
            };
            $mol_plot_pane.prototype.dimensions_expanded = function () {
                var dims = this.dimensions();
                var size = this.size();
                var gap = [0, 0];
                return [
                    [dims[0][0] - size[0] * gap[0], dims[0][1] - size[1] * gap[1]],
                    [dims[1][0] + size[0] * gap[0], dims[1][1] + size[1] * gap[1]],
                ];
            };
            $mol_plot_pane.prototype.size_expaned = function () {
                var dims = this.dimensions_expanded();
                return [
                    (dims[1][0] - dims[0][0]) || 1,
                    (dims[1][1] - dims[0][1]) || 1,
                ];
            };
            $mol_plot_pane.prototype.graph_hue = function (index) {
                return (360 + (this.hue_base() + this.hue_shift() * index) % 360) % 360;
            };
            $mol_plot_pane.prototype.graphs_colored = function () {
                var _this = this;
                var graphs = this.graphs_positioned();
                graphs.forEach(function (graph, index) {
                    graph.hue = function () { return _this.graph_hue(index); };
                });
                return graphs;
            };
            $mol_plot_pane.prototype.size_real = function () {
                return [this.width(), this.height()];
            };
            $mol_plot_pane.prototype.view_box = function () {
                var size = this.size_real();
                return "0 0 " + size[0] + " " + size[1];
            };
            $mol_plot_pane.prototype.scale = function () {
                var size = this.size_expaned();
                var real = this.size_real();
                return [
                    +(real[0] - this.gap_left() - this.gap_right()) / size[0],
                    -(real[1] - this.gap_top() - this.gap_bottom()) / size[1],
                ];
            };
            $mol_plot_pane.prototype.shift = function () {
                var dims = this.dimensions_expanded();
                var scale = this.scale();
                return [
                    Math.round(this.gap_left() - dims[0][0] * scale[0]),
                    Math.round(this.gap_top() - dims[1][1] * scale[1]),
                ];
            };
            $mol_plot_pane.prototype.graphs_positioned = function () {
                var _this = this;
                var graphs = this.graphs();
                graphs.forEach(function (graph, index) {
                    graph.shift = function () { return _this.shift(); };
                    graph.scale = function () { return _this.scale(); };
                    graph.dimensions_expanded = function () { return _this.dimensions_expanded(); };
                });
                return graphs;
            };
            $mol_plot_pane.prototype.graphs_sorted = function () {
                var graphs = this.graphs_colored();
                var sorted = [];
                for (var _i = 0, graphs_2 = graphs; _i < graphs_2.length; _i++) {
                    var graph = graphs_2[_i];
                    sorted.push.apply(sorted, graph.back());
                }
                for (var _a = 0, graphs_3 = graphs; _a < graphs_3.length; _a++) {
                    var graph = graphs_3[_a];
                    sorted.push.apply(sorted, graph.front());
                }
                return sorted;
            };
            __decorate([
                $.$mol_mem
            ], $mol_plot_pane.prototype, "dimensions", null);
            __decorate([
                $.$mol_mem
            ], $mol_plot_pane.prototype, "size", null);
            __decorate([
                $.$mol_mem
            ], $mol_plot_pane.prototype, "dimensions_expanded", null);
            __decorate([
                $.$mol_mem
            ], $mol_plot_pane.prototype, "size_expaned", null);
            __decorate([
                $.$mol_mem
            ], $mol_plot_pane.prototype, "graphs_colored", null);
            __decorate([
                $.$mol_mem
            ], $mol_plot_pane.prototype, "scale", null);
            __decorate([
                $.$mol_mem
            ], $mol_plot_pane.prototype, "shift", null);
            __decorate([
                $.$mol_mem
            ], $mol_plot_pane.prototype, "graphs_positioned", null);
            __decorate([
                $.$mol_mem
            ], $mol_plot_pane.prototype, "graphs_sorted", null);
            return $mol_plot_pane;
        }($.$mol_plot_pane));
        $$.$mol_plot_pane = $mol_plot_pane;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//pane.view.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_chart = (function (_super) {
        __extends($mol_chart, _super);
        function $mol_chart() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_chart.prototype.sub = function () {
            return [].concat(this.Plot(), this.Legend());
        };
        $mol_chart.prototype.Plot = function () {
            var _this = this;
            return (function (obj) {
                obj.graphs = function () { return _this.graphs(); };
                obj.gap_hor = function () { return 48; };
                obj.gap_vert = function () { return 24; };
                obj.hue_base = function (val) { return _this.hue_base(); };
                obj.hue_shift = function (val) { return _this.hue_shift(); };
                return obj;
            })(new this.$.$mol_plot_pane);
        };
        $mol_chart.prototype.graphs = function () {
            return [];
        };
        $mol_chart.prototype.hue_base = function () {
            return 140;
        };
        $mol_chart.prototype.hue_shift = function () {
            return 111;
        };
        $mol_chart.prototype.Legend = function () {
            var _this = this;
            return (function (obj) {
                obj.graphs = function () { return _this.graphs(); };
                return obj;
            })(new this.$.$mol_chart_legend);
        };
        __decorate([
            $.$mol_mem
        ], $mol_chart.prototype, "Plot", null);
        __decorate([
            $.$mol_mem
        ], $mol_chart.prototype, "Legend", null);
        return $mol_chart;
    }($.$mol_view));
    $.$mol_chart = $mol_chart;
})($ || ($ = {}));
//chart.view.tree.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_chart_legend = (function (_super) {
        __extends($mol_chart_legend, _super);
        function $mol_chart_legend() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_chart_legend.prototype.graphs = function () {
            return [];
        };
        $mol_chart_legend.prototype.sub = function () {
            return this.graph_legends();
        };
        $mol_chart_legend.prototype.graph_legends = function () {
            return [];
        };
        $mol_chart_legend.prototype.Graph_legend = function (id) {
            var _this = this;
            return (function (obj) {
                obj.sub = function () { return [].concat(_this.Graph_sample_box(id), _this.Graph_title(id)); };
                return obj;
            })(new this.$.$mol_view);
        };
        $mol_chart_legend.prototype.Graph_sample_box = function (id) {
            var _this = this;
            return (function (obj) {
                obj.sub = function () { return [].concat(_this.Graph_sample(id)); };
                return obj;
            })(new this.$.$mol_view);
        };
        $mol_chart_legend.prototype.Graph_sample = function (id) {
            return null;
        };
        $mol_chart_legend.prototype.Graph_title = function (id) {
            var _this = this;
            return (function (obj) {
                obj.sub = function () { return [].concat(_this.graph_title(id)); };
                return obj;
            })(new this.$.$mol_view);
        };
        $mol_chart_legend.prototype.graph_title = function (id) {
            return "";
        };
        __decorate([
            $.$mol_mem_key
        ], $mol_chart_legend.prototype, "Graph_legend", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_chart_legend.prototype, "Graph_sample_box", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_chart_legend.prototype, "Graph_title", null);
        return $mol_chart_legend;
    }($.$mol_scroll));
    $.$mol_chart_legend = $mol_chart_legend;
})($ || ($ = {}));
//legend.view.tree.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $$;
    (function ($$) {
        var $mol_chart_legend = (function (_super) {
            __extends($mol_chart_legend, _super);
            function $mol_chart_legend() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            $mol_chart_legend.prototype.graphs_front = function () {
                return this.graphs().filter(function (graph) { return graph.Sample(); });
            };
            $mol_chart_legend.prototype.graph_legends = function () {
                var _this = this;
                return this.graphs_front().map(function (graph, index) { return _this.Graph_legend(index); });
            };
            $mol_chart_legend.prototype.graph_title = function (index) {
                return this.graphs_front()[index].title();
            };
            $mol_chart_legend.prototype.Graph_sample = function (index) {
                return this.graphs_front()[index].Sample();
            };
            __decorate([
                $.$mol_mem
            ], $mol_chart_legend.prototype, "graphs_front", null);
            return $mol_chart_legend;
        }($.$mol_chart_legend));
        $$.$mol_chart_legend = $mol_chart_legend;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//legend.view.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var $;
(function ($) {
    var $mol_plot_graph = (function (_super) {
        __extends($mol_plot_graph, _super);
        function $mol_plot_graph() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_plot_graph.prototype.series = function () {
            return ({});
        };
        $mol_plot_graph.prototype.points = function () {
            return this.points_scaled();
        };
        $mol_plot_graph.prototype.points_scaled = function () {
            return this.points_raw();
        };
        $mol_plot_graph.prototype.points_raw = function () {
            return [];
        };
        $mol_plot_graph.prototype.threshold = function () {
            return 4;
        };
        $mol_plot_graph.prototype.shift = function () {
            return [].concat(0, 0);
        };
        $mol_plot_graph.prototype.scale = function () {
            return [].concat(1, 1);
        };
        $mol_plot_graph.prototype.dimensions_expanded = function () {
            return this.dimensions();
        };
        $mol_plot_graph.prototype.dimensions = function () {
            return [].concat([], []);
        };
        $mol_plot_graph.prototype.hue = function () {
            return 0;
        };
        $mol_plot_graph.prototype.attr = function () {
            return (__assign({}, _super.prototype.attr.call(this), { "mol_plot_graph_type": this.type() }));
        };
        $mol_plot_graph.prototype.type = function () {
            return "solid";
        };
        $mol_plot_graph.prototype.style = function () {
            return (__assign({}, _super.prototype.style.call(this), { "color": this.color() }));
        };
        $mol_plot_graph.prototype.color = function () {
            return "black";
        };
        $mol_plot_graph.prototype.Sample = function () {
            return null;
        };
        $mol_plot_graph.prototype.front = function () {
            return [];
        };
        $mol_plot_graph.prototype.back = function () {
            return [];
        };
        return $mol_plot_graph;
    }($.$mol_svg_group));
    $.$mol_plot_graph = $mol_plot_graph;
})($ || ($ = {}));
(function ($) {
    var $mol_plot_graph_sample = (function (_super) {
        __extends($mol_plot_graph_sample, _super);
        function $mol_plot_graph_sample() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_plot_graph_sample.prototype.attr = function () {
            return (__assign({}, _super.prototype.attr.call(this), { "mol_plot_graph_type": this.type() }));
        };
        $mol_plot_graph_sample.prototype.type = function () {
            return "solid";
        };
        $mol_plot_graph_sample.prototype.style = function () {
            return (__assign({}, _super.prototype.style.call(this), { "color": this.color() }));
        };
        $mol_plot_graph_sample.prototype.color = function () {
            return "black";
        };
        return $mol_plot_graph_sample;
    }($.$mol_view));
    $.$mol_plot_graph_sample = $mol_plot_graph_sample;
})($ || ($ = {}));
//graph.view.tree.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $$;
    (function ($$) {
        var $mol_plot_graph = (function (_super) {
            __extends($mol_plot_graph, _super);
            function $mol_plot_graph() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            $mol_plot_graph.prototype.points_raw = function () {
                var series = this.series();
                return Object.keys(series).map(function (key, index) { return [
                    isNaN(Number(key)) ? index : Number(key),
                    series[key],
                ]; });
            };
            $mol_plot_graph.prototype.points_scaled = function () {
                var shift = this.shift();
                var scale = this.scale();
                return this.points_raw().map(function (point) { return [
                    Math.round(shift[0] + point[0] * scale[0]),
                    Math.round(shift[1] + point[1] * scale[1]),
                ]; });
            };
            $mol_plot_graph.prototype.points = function () {
                var threshold = this.threshold();
                var res = [];
                var last = [Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY];
                this.points_scaled().forEach(function (point) {
                    check: {
                        if (Math.abs(point[0] - last[0]) >= threshold)
                            break check;
                        if (Math.abs(point[1] - last[1]) >= threshold)
                            break check;
                        return;
                    }
                    res.push(last = point);
                });
                return res;
            };
            $mol_plot_graph.prototype.dimensions = function () {
                var points = this.points_raw();
                var next = [
                    [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY],
                    [Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY],
                ];
                for (var _i = 0, points_1 = points; _i < points_1.length; _i++) {
                    var point = points_1[_i];
                    if (point[0] < next[0][0])
                        next[0][0] = point[0];
                    if (point[1] < next[0][1])
                        next[0][1] = point[1];
                    if (point[0] > next[1][0])
                        next[1][0] = point[0];
                    if (point[1] > next[1][1])
                        next[1][1] = point[1];
                }
                return next;
            };
            $mol_plot_graph.prototype.color = function () {
                return "hsl( " + this.hue() + " , 100% , 35% )";
            };
            $mol_plot_graph.prototype.front = function () {
                return [this];
            };
            __decorate([
                $.$mol_mem
            ], $mol_plot_graph.prototype, "points_scaled", null);
            __decorate([
                $.$mol_mem
            ], $mol_plot_graph.prototype, "points", null);
            __decorate([
                $.$mol_mem
            ], $mol_plot_graph.prototype, "dimensions", null);
            return $mol_plot_graph;
        }($.$mol_plot_graph));
        $$.$mol_plot_graph = $mol_plot_graph;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//graph.view.js.map
;
var $;
(function ($) {
    function $mol_math_round_expand(val, gap) {
        if (gap === void 0) { gap = 1; }
        if (val === 0)
            return 0;
        var val_abs = Math.abs(val);
        var val_sign = val ? Math.round(val / val_abs) : 0;
        var digits = Math.floor(Math.log(val_abs) / Math.log(10));
        var precission = Math.pow(10, digits - gap);
        var val_expanded = precission * Math.ceil(val_abs / precission);
        return val_sign * val_expanded;
    }
    $.$mol_math_round_expand = $mol_math_round_expand;
})($ || ($ = {}));
//expand.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_plot_ruler_vert = (function (_super) {
        __extends($mol_plot_ruler_vert, _super);
        function $mol_plot_ruler_vert() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_plot_ruler_vert.prototype.front = function () {
            return [];
        };
        $mol_plot_ruler_vert.prototype.color = function () {
            return null;
        };
        $mol_plot_ruler_vert.prototype.sub = function () {
            return [].concat(this.Curve(), this.labels(), this.Title());
        };
        $mol_plot_ruler_vert.prototype.Curve = function () {
            var _this = this;
            return (function (obj) {
                obj.geometry = function () { return _this.curve(); };
                return obj;
            })(new this.$.$mol_svg_path);
        };
        $mol_plot_ruler_vert.prototype.curve = function () {
            return "";
        };
        $mol_plot_ruler_vert.prototype.labels = function () {
            return [];
        };
        $mol_plot_ruler_vert.prototype.Title = function () {
            var _this = this;
            return (function (obj) {
                obj.pos = function () { return _this.title_pos(); };
                obj.align = function () { return "end"; };
                obj.sub = function () { return [].concat(_this.title()); };
                return obj;
            })(new this.$.$mol_svg_text);
        };
        $mol_plot_ruler_vert.prototype.title_pos = function () {
            return [].concat(this.title_pos_x(), this.title_pos_y());
        };
        $mol_plot_ruler_vert.prototype.title_pos_x = function () {
            return "36px";
        };
        $mol_plot_ruler_vert.prototype.title_pos_y = function () {
            return "14px";
        };
        $mol_plot_ruler_vert.prototype.Label = function (index) {
            var _this = this;
            return (function (obj) {
                obj.pos = function () { return _this.label_pos(index); };
                obj.align = function () { return "end"; };
                obj.text = function () { return _this.label_text(index); };
                return obj;
            })(new this.$.$mol_svg_text);
        };
        $mol_plot_ruler_vert.prototype.label_pos = function (index) {
            return [].concat(this.label_pos_x(index), this.label_pos_y(index));
        };
        $mol_plot_ruler_vert.prototype.label_pos_x = function (index) {
            return this.title_pos_x();
        };
        $mol_plot_ruler_vert.prototype.label_pos_y = function (index) {
            return "";
        };
        $mol_plot_ruler_vert.prototype.label_text = function (index) {
            return "";
        };
        __decorate([
            $.$mol_mem
        ], $mol_plot_ruler_vert.prototype, "Curve", null);
        __decorate([
            $.$mol_mem
        ], $mol_plot_ruler_vert.prototype, "Title", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_plot_ruler_vert.prototype, "Label", null);
        return $mol_plot_ruler_vert;
    }($.$mol_plot_graph));
    $.$mol_plot_ruler_vert = $mol_plot_ruler_vert;
})($ || ($ = {}));
//vert.view.tree.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $$;
    (function ($$) {
        var $mol_plot_ruler_vert = (function (_super) {
            __extends($mol_plot_ruler_vert, _super);
            function $mol_plot_ruler_vert() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            $mol_plot_ruler_vert.prototype.dimensions = function () {
                var series = this.series();
                var next = [
                    [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY],
                    [Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY],
                ];
                for (var _i = 0, _a = Object.keys(series); _i < _a.length; _i++) {
                    var key = _a[_i];
                    if (series[key] < next[0][1])
                        next[0][1] = series[key];
                    if (series[key] > next[1][1])
                        next[1][1] = series[key];
                }
                return next;
            };
            $mol_plot_ruler_vert.prototype.step = function () {
                var dims = this.dimensions_expanded();
                var size = $.$mol_math_round_expand((dims[1][1] - dims[0][1]), -1);
                var count = Math.max(1, Math.pow(10, Math.floor(Math.log(-size * this.scale()[1] / 24) / Math.log(10))));
                var step = size / count;
                return step;
            };
            $mol_plot_ruler_vert.prototype.points_raw = function () {
                var dims = this.dimensions_expanded();
                var step = this.step();
                var next = [];
                var start = Math.round(dims[0][1] / step) * step;
                var end = Math.round(dims[1][1] / step) * step;
                for (var val = start; val <= end; val += step) {
                    next.push([0, Number(val.toFixed(10))]);
                }
                return next;
            };
            $mol_plot_ruler_vert.prototype.curve = function () {
                var shift = this.shift();
                var points = this.points();
                if (points.length < 1)
                    return '';
                var last = points[points.length - 1];
                return points.map(function (point) { return "M 0 " + point[1] + " H 2000 "; }).join(' ');
            };
            $mol_plot_ruler_vert.prototype.labels = function () {
                var _this = this;
                return this.points().map(function (point, index) { return _this.Label(index); });
            };
            $mol_plot_ruler_vert.prototype.label_pos_y = function (index) {
                return this.points()[index][1] + 'px';
            };
            $mol_plot_ruler_vert.prototype.label_text = function (index) {
                var step = this.step();
                var precision = Math.max(0, Math.min(15, (step - Math.floor(step)).toString().length - 2));
                return this.points_raw()[index][1].toFixed(precision);
            };
            $mol_plot_ruler_vert.prototype.back = function () {
                return [this];
            };
            __decorate([
                $.$mol_mem
            ], $mol_plot_ruler_vert.prototype, "step", null);
            return $mol_plot_ruler_vert;
        }($.$mol_plot_ruler_vert));
        $$.$mol_plot_ruler_vert = $mol_plot_ruler_vert;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//vert.view.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_plot_ruler_hor = (function (_super) {
        __extends($mol_plot_ruler_hor, _super);
        function $mol_plot_ruler_hor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_plot_ruler_hor.prototype.front = function () {
            return [];
        };
        $mol_plot_ruler_hor.prototype.color = function () {
            return null;
        };
        $mol_plot_ruler_hor.prototype.sub = function () {
            return [].concat(this.Curve(), this.labels(), this.Title());
        };
        $mol_plot_ruler_hor.prototype.Curve = function () {
            var _this = this;
            return (function (obj) {
                obj.geometry = function () { return _this.curve(); };
                return obj;
            })(new this.$.$mol_svg_path);
        };
        $mol_plot_ruler_hor.prototype.curve = function () {
            return "";
        };
        $mol_plot_ruler_hor.prototype.labels = function () {
            return [];
        };
        $mol_plot_ruler_hor.prototype.Title = function () {
            var _this = this;
            return (function (obj) {
                obj.pos = function () { return _this.title_pos(); };
                obj.align = function () { return "start"; };
                obj.sub = function () { return [].concat(_this.title()); };
                return obj;
            })(new this.$.$mol_svg_text);
        };
        $mol_plot_ruler_hor.prototype.title_pos = function () {
            return [].concat(this.title_pos_x(), this.title_pos_y());
        };
        $mol_plot_ruler_hor.prototype.title_pos_x = function () {
            return "0";
        };
        $mol_plot_ruler_hor.prototype.title_pos_y = function () {
            return "100%";
        };
        $mol_plot_ruler_hor.prototype.Label = function (index) {
            var _this = this;
            return (function (obj) {
                obj.pos = function () { return _this.label_pos(index); };
                obj.text = function () { return _this.label_text(index); };
                return obj;
            })(new this.$.$mol_svg_text);
        };
        $mol_plot_ruler_hor.prototype.label_pos = function (index) {
            return [].concat(this.label_pos_x(index), this.label_pos_y(index));
        };
        $mol_plot_ruler_hor.prototype.label_pos_x = function (index) {
            return "";
        };
        $mol_plot_ruler_hor.prototype.label_pos_y = function (index) {
            return this.title_pos_y();
        };
        $mol_plot_ruler_hor.prototype.label_text = function (index) {
            return "";
        };
        __decorate([
            $.$mol_mem
        ], $mol_plot_ruler_hor.prototype, "Curve", null);
        __decorate([
            $.$mol_mem
        ], $mol_plot_ruler_hor.prototype, "Title", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_plot_ruler_hor.prototype, "Label", null);
        return $mol_plot_ruler_hor;
    }($.$mol_plot_graph));
    $.$mol_plot_ruler_hor = $mol_plot_ruler_hor;
})($ || ($ = {}));
//hor.view.tree.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $$;
    (function ($$) {
        var $mol_plot_ruler_hor = (function (_super) {
            __extends($mol_plot_ruler_hor, _super);
            function $mol_plot_ruler_hor() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            $mol_plot_ruler_hor.prototype.count = function () {
                return this.points_raw().length * this.scale()[0] / 100;
            };
            $mol_plot_ruler_hor.prototype.step = function () {
                var count = this.count();
                var points = this.points_scaled();
                var step = Math.max(1, Math.ceil(points.length / count));
                return step;
            };
            $mol_plot_ruler_hor.prototype.keys_visible = function () {
                var res = [];
                var keys = Object.keys(this.series());
                if (keys.length === 0)
                    return [];
                var step = this.step();
                var limit = Math.floor(keys.length - step / 2);
                for (var i = 0; i < limit; i += step) {
                    res.push(keys[i]);
                }
                res.push(keys[keys.length - 1]);
                return res;
            };
            $mol_plot_ruler_hor.prototype.points = function () {
                var points = this.points_scaled();
                var keys = Object.keys(this.series());
                return this.keys_visible().map(function (key) { return points[keys.indexOf(key)]; });
            };
            $mol_plot_ruler_hor.prototype.curve = function () {
                var shift = this.shift();
                var points = this.points();
                if (points.length < 1)
                    return '';
                var last = points[points.length - 1];
                return points.map(function (point) { return "M " + point[0] + " 1000 V 0"; }).join(' ');
            };
            $mol_plot_ruler_hor.prototype.labels = function () {
                var _this = this;
                return this.keys_visible().map(function (key) { return _this.Label(key); });
            };
            $mol_plot_ruler_hor.prototype.label_pos_x = function (key) {
                return String(this.points()[this.keys_visible().indexOf(key)][0]);
            };
            $mol_plot_ruler_hor.prototype.label_text = function (key) {
                return key;
            };
            $mol_plot_ruler_hor.prototype.back = function () {
                return [this];
            };
            __decorate([
                $.$mol_mem
            ], $mol_plot_ruler_hor.prototype, "step", null);
            __decorate([
                $.$mol_mem
            ], $mol_plot_ruler_hor.prototype, "keys_visible", null);
            return $mol_plot_ruler_hor;
        }($.$mol_plot_ruler_hor));
        $$.$mol_plot_ruler_hor = $mol_plot_ruler_hor;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//hor.view.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_plot_bar = (function (_super) {
        __extends($mol_plot_bar, _super);
        function $mol_plot_bar() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_plot_bar.prototype.style = function () {
            return (__assign({}, _super.prototype.style.call(this), { "stroke-width": this.stroke_width() }));
        };
        $mol_plot_bar.prototype.stroke_width = function () {
            return "1rem";
        };
        $mol_plot_bar.prototype.sub = function () {
            return [].concat(this.Curve());
        };
        $mol_plot_bar.prototype.Curve = function () {
            var _this = this;
            return (function (obj) {
                obj.geometry = function () { return _this.curve(); };
                return obj;
            })(new this.$.$mol_svg_path);
        };
        $mol_plot_bar.prototype.curve = function () {
            return "";
        };
        $mol_plot_bar.prototype.Sample = function () {
            var _this = this;
            return (function (obj) {
                obj.color = function () { return _this.color(); };
                return obj;
            })(new this.$.$mol_plot_graph_sample);
        };
        __decorate([
            $.$mol_mem
        ], $mol_plot_bar.prototype, "Curve", null);
        __decorate([
            $.$mol_mem
        ], $mol_plot_bar.prototype, "Sample", null);
        return $mol_plot_bar;
    }($.$mol_plot_graph));
    $.$mol_plot_bar = $mol_plot_bar;
})($ || ($ = {}));
//bar.view.tree.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $$;
    (function ($$) {
        var $mol_plot_bar = (function (_super) {
            __extends($mol_plot_bar, _super);
            function $mol_plot_bar() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            $mol_plot_bar.prototype.curve = function () {
                var shift = this.shift();
                var points = this.points();
                if (points.length < 1)
                    return '';
                return points.map(function (point) { return "M " + point[0] + " " + shift[1] + " V " + point[1]; }).join(' ');
            };
            $mol_plot_bar.prototype.stroke_width = function () {
                return (8 / Math.sqrt(this.points().length)).toPrecision(2) + '%';
            };
            $mol_plot_bar.prototype.color = function () {
                return "hsl( " + this.hue() + " , 70% , 85% )";
            };
            $mol_plot_bar.prototype.dimensions = function () {
                var points = this.points_raw();
                var next = [
                    [Number.POSITIVE_INFINITY, 0],
                    [Number.NEGATIVE_INFINITY, 0],
                ];
                for (var _i = 0, points_1 = points; _i < points_1.length; _i++) {
                    var point = points_1[_i];
                    if (point[0] < next[0][0])
                        next[0][0] = point[0];
                    if (point[1] < next[0][1])
                        next[0][1] = point[1];
                    if (point[0] > next[1][0])
                        next[1][0] = point[0];
                    if (point[1] > next[1][1])
                        next[1][1] = point[1];
                }
                var gap = (next[1][0] - next[0][0]) / points.length || 0.00000001;
                next[0][0] -= gap;
                next[1][0] += gap;
                return next;
            };
            __decorate([
                $.$mol_mem
            ], $mol_plot_bar.prototype, "dimensions", null);
            return $mol_plot_bar;
        }($.$mol_plot_bar));
        $$.$mol_plot_bar = $mol_plot_bar;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//bar.view.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_app_bench_chart_bar_mol = (function (_super) {
        __extends($mol_app_bench_chart_bar_mol, _super);
        function $mol_app_bench_chart_bar_mol() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_app_bench_chart_bar_mol.prototype.sub = function () {
            return [].concat(this.Chart());
        };
        $mol_app_bench_chart_bar_mol.prototype.Chart = function () {
            var _this = this;
            return (function (obj) {
                obj.graphs = function () { return [].concat(_this.Vert(), _this.Hor(), _this.graphs()); };
                return obj;
            })(new this.$.$mol_chart);
        };
        $mol_app_bench_chart_bar_mol.prototype.Vert = function () {
            return (function (obj) {
                obj.title = function () { return "Val"; };
                return obj;
            })(new this.$.$mol_plot_ruler_vert);
        };
        $mol_app_bench_chart_bar_mol.prototype.Hor = function () {
            var _this = this;
            return (function (obj) {
                obj.title = function () { return "Iter"; };
                obj.series = function () { return _this.hor_series(); };
                return obj;
            })(new this.$.$mol_plot_ruler_hor);
        };
        $mol_app_bench_chart_bar_mol.prototype.hor_series = function () {
            return [];
        };
        $mol_app_bench_chart_bar_mol.prototype.graphs = function () {
            return [];
        };
        $mol_app_bench_chart_bar_mol.prototype.Graph = function (id) {
            var _this = this;
            return (function (obj) {
                obj.title = function () { return _this.graph_title(id); };
                obj.series = function () { return _this.series(id); };
                return obj;
            })(new this.$.$mol_plot_bar);
        };
        $mol_app_bench_chart_bar_mol.prototype.graph_title = function (id) {
            return "";
        };
        $mol_app_bench_chart_bar_mol.prototype.series = function (id) {
            return [];
        };
        __decorate([
            $.$mol_mem
        ], $mol_app_bench_chart_bar_mol.prototype, "Chart", null);
        __decorate([
            $.$mol_mem
        ], $mol_app_bench_chart_bar_mol.prototype, "Vert", null);
        __decorate([
            $.$mol_mem
        ], $mol_app_bench_chart_bar_mol.prototype, "Hor", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_app_bench_chart_bar_mol.prototype, "Graph", null);
        return $mol_app_bench_chart_bar_mol;
    }($.$mol_view));
    $.$mol_app_bench_chart_bar_mol = $mol_app_bench_chart_bar_mol;
})($ || ($ = {}));
//mol.view.tree.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $$;
    (function ($$) {
        var $mol_app_bench_chart_bar_mol = (function (_super) {
            __extends($mol_app_bench_chart_bar_mol, _super);
            function $mol_app_bench_chart_bar_mol() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            $mol_app_bench_chart_bar_mol.data = function (next, force) {
                var _this = this;
                window.addEventListener('message', function (event) {
                    switch (event.data[0]) {
                        case 'fill':
                        case 'update':
                            _this.data(event.data[1], $.$mol_atom_force);
                            break;
                    }
                });
                return { sample: '', graphs: [] };
            };
            $mol_app_bench_chart_bar_mol.prototype.graphs = function () {
                var _this = this;
                return $mol_app_bench_chart_bar_mol.data().graphs.map(function (g, i) { return _this.Graph(i); });
            };
            $mol_app_bench_chart_bar_mol.prototype.graph_title = function (id) {
                return "Graph #" + id;
            };
            $mol_app_bench_chart_bar_mol.prototype.series = function (id) {
                return $mol_app_bench_chart_bar_mol.data().graphs[id];
            };
            $mol_app_bench_chart_bar_mol.prototype.hor_series = function () {
                return this.series(0) || [];
            };
            __decorate([
                $.$mol_mem
            ], $mol_app_bench_chart_bar_mol, "data", null);
            return $mol_app_bench_chart_bar_mol;
        }($.$mol_app_bench_chart_bar_mol));
        $$.$mol_app_bench_chart_bar_mol = $mol_app_bench_chart_bar_mol;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//mol.view.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_plot_group = (function (_super) {
        __extends($mol_plot_group, _super);
        function $mol_plot_group() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_plot_group.prototype.sub = function () {
            return this.graphs_enriched();
        };
        $mol_plot_group.prototype.graphs_enriched = function () {
            return this.graphs();
        };
        $mol_plot_group.prototype.graphs = function () {
            return [];
        };
        $mol_plot_group.prototype.Sample = function () {
            var _this = this;
            return (function (obj) {
                obj.sub = function () { return _this.graph_samples(); };
                return obj;
            })(new this.$.$mol_plot_graph_sample);
        };
        $mol_plot_group.prototype.graph_samples = function () {
            return [];
        };
        __decorate([
            $.$mol_mem
        ], $mol_plot_group.prototype, "Sample", null);
        return $mol_plot_group;
    }($.$mol_plot_graph));
    $.$mol_plot_group = $mol_plot_group;
})($ || ($ = {}));
//group.view.tree.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $$;
    (function ($$) {
        var $mol_plot_group = (function (_super) {
            __extends($mol_plot_group, _super);
            function $mol_plot_group() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            $mol_plot_group.prototype.graphs_enriched = function () {
                var _this = this;
                var graphs = this.graphs();
                for (var _i = 0, graphs_1 = graphs; _i < graphs_1.length; _i++) {
                    var graph = graphs_1[_i];
                    graph.hue = function () { return _this.hue(); };
                    graph.points = function () { return _this.points(); };
                    graph.shift = function () { return _this.shift(); };
                    graph.scale = function () { return _this.scale(); };
                    graph.dimensions_expanded = function () { return _this.dimensions_expanded(); };
                }
                return graphs;
            };
            $mol_plot_group.prototype.graph_samples = function () {
                return this.graphs().map(function (graph) { return graph.Sample(); });
            };
            $mol_plot_group.prototype.back = function () {
                var graphs = this.graphs_enriched();
                var next = [];
                for (var _i = 0, graphs_2 = graphs; _i < graphs_2.length; _i++) {
                    var graph = graphs_2[_i];
                    next.push.apply(next, graph.back());
                }
                return next;
            };
            $mol_plot_group.prototype.front = function () {
                var graphs = this.graphs_enriched();
                var next = [];
                for (var _i = 0, graphs_3 = graphs; _i < graphs_3.length; _i++) {
                    var graph = graphs_3[_i];
                    next.push.apply(next, graph.front());
                }
                return next;
            };
            __decorate([
                $.$mol_mem
            ], $mol_plot_group.prototype, "graphs_enriched", null);
            __decorate([
                $.$mol_mem
            ], $mol_plot_group.prototype, "graph_samples", null);
            return $mol_plot_group;
        }($.$mol_plot_group));
        $$.$mol_plot_group = $mol_plot_group;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//group.view.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_plot_line = (function (_super) {
        __extends($mol_plot_line, _super);
        function $mol_plot_line() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_plot_line.prototype.color_fill = function () {
            return "none";
        };
        $mol_plot_line.prototype.sub = function () {
            return [].concat(this.Curve());
        };
        $mol_plot_line.prototype.Curve = function () {
            var _this = this;
            return (function (obj) {
                obj.geometry = function () { return _this.curve(); };
                return obj;
            })(new this.$.$mol_svg_path);
        };
        $mol_plot_line.prototype.curve = function () {
            return "";
        };
        $mol_plot_line.prototype.Sample = function () {
            var _this = this;
            return (function (obj) {
                obj.color = function () { return _this.color(); };
                obj.type = function () { return _this.type(); };
                return obj;
            })(new this.$.$mol_plot_graph_sample);
        };
        __decorate([
            $.$mol_mem
        ], $mol_plot_line.prototype, "Curve", null);
        __decorate([
            $.$mol_mem
        ], $mol_plot_line.prototype, "Sample", null);
        return $mol_plot_line;
    }($.$mol_plot_graph));
    $.$mol_plot_line = $mol_plot_line;
})($ || ($ = {}));
//line.view.tree.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var $;
(function ($) {
    var $$;
    (function ($$) {
        var $mol_plot_line = (function (_super) {
            __extends($mol_plot_line, _super);
            function $mol_plot_line() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            $mol_plot_line.prototype.curve = function () {
                var points = this.points();
                if (points.length < 1)
                    return '';
                return 'M ' + points[0].join(' ') + ' ' + points.map(function (point) { return 'L ' + point.join(' '); }).join(' ');
            };
            return $mol_plot_line;
        }($.$mol_plot_line));
        $$.$mol_plot_line = $mol_plot_line;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//line.view.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_plot_dot = (function (_super) {
        __extends($mol_plot_dot, _super);
        function $mol_plot_dot() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_plot_dot.prototype.sub = function () {
            return [].concat(this.Curve());
        };
        $mol_plot_dot.prototype.Curve = function () {
            var _this = this;
            return (function (obj) {
                obj.geometry = function () { return _this.curve(); };
                return obj;
            })(new this.$.$mol_svg_path);
        };
        $mol_plot_dot.prototype.curve = function () {
            return "";
        };
        $mol_plot_dot.prototype.Sample = function () {
            var _this = this;
            return (function (obj) {
                obj.color = function () { return _this.color(); };
                return obj;
            })(new this.$.$mol_plot_graph_sample);
        };
        __decorate([
            $.$mol_mem
        ], $mol_plot_dot.prototype, "Curve", null);
        __decorate([
            $.$mol_mem
        ], $mol_plot_dot.prototype, "Sample", null);
        return $mol_plot_dot;
    }($.$mol_plot_graph));
    $.$mol_plot_dot = $mol_plot_dot;
})($ || ($ = {}));
//dot.view.tree.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var $;
(function ($) {
    var $$;
    (function ($$) {
        var $mol_plot_dot = (function (_super) {
            __extends($mol_plot_dot, _super);
            function $mol_plot_dot() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            $mol_plot_dot.prototype.curve = function () {
                var points = this.points();
                if (points.length < 1)
                    return '';
                return points.map(function (point) { return 'M ' + point.join(' ') + ' v 0'; }).join(' ');
            };
            return $mol_plot_dot;
        }($.$mol_plot_dot));
        $$.$mol_plot_dot = $mol_plot_dot;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//dot.view.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_app_bench_chart_rope_mol = (function (_super) {
        __extends($mol_app_bench_chart_rope_mol, _super);
        function $mol_app_bench_chart_rope_mol() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_app_bench_chart_rope_mol.prototype.sub = function () {
            return [].concat(this.Chart());
        };
        $mol_app_bench_chart_rope_mol.prototype.Chart = function () {
            var _this = this;
            return (function (obj) {
                obj.graphs = function () { return [].concat(_this.Vert(), _this.Hor(), _this.graphs()); };
                return obj;
            })(new this.$.$mol_chart);
        };
        $mol_app_bench_chart_rope_mol.prototype.Vert = function () {
            return (function (obj) {
                obj.title = function () { return "Val"; };
                return obj;
            })(new this.$.$mol_plot_ruler_vert);
        };
        $mol_app_bench_chart_rope_mol.prototype.Hor = function () {
            var _this = this;
            return (function (obj) {
                obj.title = function () { return "Iter"; };
                obj.series = function () { return _this.hor_series(); };
                return obj;
            })(new this.$.$mol_plot_ruler_hor);
        };
        $mol_app_bench_chart_rope_mol.prototype.hor_series = function () {
            return [];
        };
        $mol_app_bench_chart_rope_mol.prototype.graphs = function () {
            return [];
        };
        $mol_app_bench_chart_rope_mol.prototype.Graph = function (id) {
            var _this = this;
            return (function (obj) {
                obj.title = function () { return _this.graph_title(id); };
                obj.series = function () { return _this.series(id); };
                obj.graphs = function () { return [].concat(_this.Line(id), _this.Dots(id)); };
                return obj;
            })(new this.$.$mol_plot_group);
        };
        $mol_app_bench_chart_rope_mol.prototype.graph_title = function (id) {
            return "";
        };
        $mol_app_bench_chart_rope_mol.prototype.series = function (id) {
            return [];
        };
        $mol_app_bench_chart_rope_mol.prototype.Line = function (id) {
            return (function (obj) {
                return obj;
            })(new this.$.$mol_plot_line);
        };
        $mol_app_bench_chart_rope_mol.prototype.Dots = function (id) {
            return (function (obj) {
                return obj;
            })(new this.$.$mol_plot_dot);
        };
        __decorate([
            $.$mol_mem
        ], $mol_app_bench_chart_rope_mol.prototype, "Chart", null);
        __decorate([
            $.$mol_mem
        ], $mol_app_bench_chart_rope_mol.prototype, "Vert", null);
        __decorate([
            $.$mol_mem
        ], $mol_app_bench_chart_rope_mol.prototype, "Hor", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_app_bench_chart_rope_mol.prototype, "Graph", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_app_bench_chart_rope_mol.prototype, "Line", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_app_bench_chart_rope_mol.prototype, "Dots", null);
        return $mol_app_bench_chart_rope_mol;
    }($.$mol_view));
    $.$mol_app_bench_chart_rope_mol = $mol_app_bench_chart_rope_mol;
})($ || ($ = {}));
//mol.view.tree.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $$;
    (function ($$) {
        var $mol_app_bench_chart_rope_mol = (function (_super) {
            __extends($mol_app_bench_chart_rope_mol, _super);
            function $mol_app_bench_chart_rope_mol() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            $mol_app_bench_chart_rope_mol.data = function (next, force) {
                var _this = this;
                window.addEventListener('message', function (event) {
                    switch (event.data[0]) {
                        case 'fill':
                        case 'update':
                            _this.data(event.data[1], $.$mol_atom_force);
                            break;
                    }
                });
                return { sample: '', graphs: [] };
            };
            $mol_app_bench_chart_rope_mol.prototype.graphs = function () {
                var _this = this;
                return $mol_app_bench_chart_rope_mol.data().graphs.map(function (g, i) { return _this.Graph(i); });
            };
            $mol_app_bench_chart_rope_mol.prototype.graph_title = function (id) {
                return "Graph #" + id;
            };
            $mol_app_bench_chart_rope_mol.prototype.series = function (id) {
                return $mol_app_bench_chart_rope_mol.data().graphs[id];
            };
            $mol_app_bench_chart_rope_mol.prototype.hor_series = function () {
                return this.series(0) || [];
            };
            __decorate([
                $.$mol_mem
            ], $mol_app_bench_chart_rope_mol, "data", null);
            return $mol_app_bench_chart_rope_mol;
        }($.$mol_app_bench_chart_rope_mol));
        $$.$mol_app_bench_chart_rope_mol = $mol_app_bench_chart_rope_mol;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//mol.view.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_app_bench_list_mol = (function (_super) {
        __extends($mol_app_bench_list_mol, _super);
        function $mol_app_bench_list_mol() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_app_bench_list_mol.prototype.sub = function () {
            return [].concat(this.List());
        };
        $mol_app_bench_list_mol.prototype.List = function () {
            var _this = this;
            return (function (obj) {
                obj.rows = function () { return [].concat(_this.rows()); };
                return obj;
            })(new this.$.$mol_list);
        };
        $mol_app_bench_list_mol.prototype.rows = function () {
            return [];
        };
        $mol_app_bench_list_mol.prototype.Row = function (id) {
            var _this = this;
            return (function (obj) {
                obj.checked = function (val) { return _this.row_selected(id, val); };
                obj.title = function () { return _this.row_title(id); };
                obj.content = function () { return _this.row_content(id); };
                return obj;
            })(new this.$.$mol_app_bench_list_mol_row);
        };
        $mol_app_bench_list_mol.prototype.row_selected = function (id, val, force) {
            return (val !== void 0) ? val : false;
        };
        $mol_app_bench_list_mol.prototype.row_title = function (id) {
            return "";
        };
        $mol_app_bench_list_mol.prototype.row_content = function (id) {
            return "";
        };
        __decorate([
            $.$mol_mem
        ], $mol_app_bench_list_mol.prototype, "List", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_app_bench_list_mol.prototype, "Row", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_app_bench_list_mol.prototype, "row_selected", null);
        return $mol_app_bench_list_mol;
    }($.$mol_scroll));
    $.$mol_app_bench_list_mol = $mol_app_bench_list_mol;
})($ || ($ = {}));
(function ($) {
    var $mol_app_bench_list_mol_row = (function (_super) {
        __extends($mol_app_bench_list_mol_row, _super);
        function $mol_app_bench_list_mol_row() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_app_bench_list_mol_row.prototype.selected = function (val, force) {
            return (val !== void 0) ? val : false;
        };
        $mol_app_bench_list_mol_row.prototype.minimal_height = function () {
            return 56;
        };
        $mol_app_bench_list_mol_row.prototype.sub = function () {
            return [].concat(this.Title(), this.Content());
        };
        $mol_app_bench_list_mol_row.prototype.Title = function () {
            var _this = this;
            return (function (obj) {
                obj.sub = function () { return [].concat(_this.title()); };
                return obj;
            })(new this.$.$mol_view);
        };
        $mol_app_bench_list_mol_row.prototype.title = function () {
            return "";
        };
        $mol_app_bench_list_mol_row.prototype.Content = function () {
            var _this = this;
            return (function (obj) {
                obj.sub = function () { return [].concat(_this.content()); };
                return obj;
            })(new this.$.$mol_view);
        };
        $mol_app_bench_list_mol_row.prototype.content = function () {
            return "";
        };
        __decorate([
            $.$mol_mem
        ], $mol_app_bench_list_mol_row.prototype, "selected", null);
        __decorate([
            $.$mol_mem
        ], $mol_app_bench_list_mol_row.prototype, "Title", null);
        __decorate([
            $.$mol_mem
        ], $mol_app_bench_list_mol_row.prototype, "Content", null);
        return $mol_app_bench_list_mol_row;
    }($.$mol_check));
    $.$mol_app_bench_list_mol_row = $mol_app_bench_list_mol_row;
})($ || ($ = {}));
//mol.view.tree.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $$;
    (function ($$) {
        var $mol_app_bench_list_mol = (function (_super) {
            __extends($mol_app_bench_list_mol, _super);
            function $mol_app_bench_list_mol() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            $mol_app_bench_list_mol.data = function (next, force) {
                var _this = this;
                window.addEventListener('message', function (event) {
                    if (event.data[0] !== 'set data')
                        return;
                    _this.data(event.data[1], $.$mol_atom_force);
                });
                return { sample: '', items: [] };
            };
            $mol_app_bench_list_mol.prototype.items = function () {
                return $mol_app_bench_list_mol.data().items;
            };
            $mol_app_bench_list_mol.prototype.rows = function () {
                var _this = this;
                return this.items().map(function (row, id) { return _this.Row(id); });
            };
            $mol_app_bench_list_mol.prototype.row_title = function (id) {
                return this.items()[id].title;
            };
            $mol_app_bench_list_mol.prototype.row_content = function (id) {
                return this.items()[id].content;
            };
            $mol_app_bench_list_mol.prototype.row_selected = function (id, next) {
                if (next !== void 0)
                    this.selected_id(next ? id : null);
                return this.selected_id() === id;
            };
            $mol_app_bench_list_mol.prototype.selected_id = function (next) {
                this.items();
                if (next === void 0)
                    return null;
                return next;
            };
            __decorate([
                $.$mol_mem
            ], $mol_app_bench_list_mol.prototype, "rows", null);
            __decorate([
                $.$mol_mem_key
            ], $mol_app_bench_list_mol.prototype, "row_title", null);
            __decorate([
                $.$mol_mem_key
            ], $mol_app_bench_list_mol.prototype, "row_content", null);
            __decorate([
                $.$mol_mem
            ], $mol_app_bench_list_mol.prototype, "selected_id", null);
            __decorate([
                $.$mol_mem
            ], $mol_app_bench_list_mol, "data", null);
            return $mol_app_bench_list_mol;
        }($.$mol_app_bench_list_mol));
        $$.$mol_app_bench_list_mol = $mol_app_bench_list_mol;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//mol.view.js.map
;
var $;
(function ($) {
    function $mol_dom_make(id, localName, namespaceURI) {
        if (localName === void 0) { localName = 'span'; }
        if (namespaceURI === void 0) { namespaceURI = 'http://www.w3.org/1999/xhtml'; }
        var document = $.$mol_dom_context.document;
        var node = id && document.getElementById(id);
        if (!node) {
            node = document.createElementNS(namespaceURI, localName);
            if (id)
                node.id = id;
        }
        return node;
    }
    $.$mol_dom_make = $mol_dom_make;
})($ || ($ = {}));
//make.js.map
;
var $;
(function ($) {
    function $mol_dom_jsx(localName, props) {
        var children = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            children[_i - 2] = arguments[_i];
        }
        var node = $.$mol_dom_make(props && props.id, localName);
        $.$mol_dom_render_children(node, [].concat.apply([], children));
        $.$mol_dom_render_fields(node, props);
        return node;
    }
    $.$mol_dom_jsx = $mol_dom_jsx;
})($ || ($ = {}));
//jsx.js.map
;
var $;
(function ($) {
    var $mol_app_bench_list_tsx = (function () {
        function $mol_app_bench_list_tsx() {
        }
        $mol_app_bench_list_tsx.onClick = function (item, event) {
            this.selected = item.id;
            this.render();
        };
        $mol_app_bench_list_tsx.render = function () {
            var _this = this;
            return ($.$mol_dom_jsx("div", { id: "list", className: "list" }, this.data.items.map(function (item) { return ($.$mol_dom_jsx("div", { id: 'list-item#' + item.id, className: "list-item list-item-selected-" + (_this.selected === item.id), onclick: _this.onClick.bind(_this, item) },
                $.$mol_dom_jsx("div", { id: 'list-item#' + item.id + '-title', className: "list-item-title" }, item.title),
                $.$mol_dom_jsx("div", { id: 'list-item#' + item.id + '-content', className: "list-item-content", childNodes: [item.content] }, item.content))); })));
        };
        $mol_app_bench_list_tsx.data = {
            sample: '',
            items: []
        };
        $mol_app_bench_list_tsx.selected = null;
        return $mol_app_bench_list_tsx;
    }());
    $.$mol_app_bench_list_tsx = $mol_app_bench_list_tsx;
})($ || ($ = {}));
//index.js.map
//# sourceMappingURL=web.js.map