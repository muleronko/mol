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
//# sourceMappingURL=web.js.map