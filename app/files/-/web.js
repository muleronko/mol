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
    var $mol_link = (function (_super) {
        __extends($mol_link, _super);
        function $mol_link() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_link.prototype.minimal_height = function () {
            return 40;
        };
        $mol_link.prototype.dom_name = function () {
            return "a";
        };
        $mol_link.prototype.attr = function () {
            return (__assign({}, _super.prototype.attr.call(this), { "href": this.uri(), "title": this.hint(), "target": this.target(), "mol_link_current": this.current() }));
        };
        $mol_link.prototype.uri = function () {
            return "";
        };
        $mol_link.prototype.hint = function () {
            return "";
        };
        $mol_link.prototype.target = function () {
            return "_self";
        };
        $mol_link.prototype.current = function () {
            return false;
        };
        $mol_link.prototype.sub = function () {
            return [].concat(this.title());
        };
        $mol_link.prototype.arg = function () {
            return ({});
        };
        $mol_link.prototype.event = function () {
            var _this = this;
            return (__assign({}, _super.prototype.event.call(this), { "click": function (val) { return _this.event_click(val); } }));
        };
        $mol_link.prototype.event_click = function (val, force) {
            return (val !== void 0) ? val : null;
        };
        __decorate([
            $.$mol_mem
        ], $mol_link.prototype, "event_click", null);
        return $mol_link;
    }($.$mol_view));
    $.$mol_link = $mol_link;
})($ || ($ = {}));
//link.view.tree.js.map
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
        var $mol_link = (function (_super) {
            __extends($mol_link, _super);
            function $mol_link() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            $mol_link.prototype.uri = function () {
                return new $.$mol_state_arg(this.state_key()).link(this.arg());
            };
            $mol_link.prototype.current = function () {
                return this.uri() === $.$mol_state_arg.link({});
            };
            $mol_link.prototype.event_click = function (event) {
                var _this = this;
                setTimeout(function () { return _this.focused(false); }, 200);
            };
            __decorate([
                $.$mol_mem
            ], $mol_link.prototype, "uri", null);
            return $mol_link;
        }($.$mol_link));
        $$.$mol_link = $mol_link;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//link.view.js.map
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
    var $mol_touch = (function (_super) {
        __extends($mol_touch, _super);
        function $mol_touch() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_touch.prototype.start_zoom = function (val, force) {
            return (val !== void 0) ? val : 0;
        };
        $mol_touch.prototype.start_distance = function (val, force) {
            return (val !== void 0) ? val : 0;
        };
        $mol_touch.prototype.zoom = function (val, force) {
            return (val !== void 0) ? val : 1;
        };
        $mol_touch.prototype.start_pos = function (val, force) {
            return (val !== void 0) ? val : null;
        };
        $mol_touch.prototype.swipe_precision = function () {
            return 16;
        };
        $mol_touch.prototype.swipe_right = function (val, force) {
            return (val !== void 0) ? val : null;
        };
        $mol_touch.prototype.swipe_bottom = function (val, force) {
            return (val !== void 0) ? val : null;
        };
        $mol_touch.prototype.swipe_left = function (val, force) {
            return (val !== void 0) ? val : null;
        };
        $mol_touch.prototype.swipe_top = function (val, force) {
            return (val !== void 0) ? val : null;
        };
        $mol_touch.prototype.swipe_from_right = function (val, force) {
            return (val !== void 0) ? val : null;
        };
        $mol_touch.prototype.swipe_from_bottom = function (val, force) {
            return (val !== void 0) ? val : null;
        };
        $mol_touch.prototype.swipe_from_left = function (val, force) {
            return (val !== void 0) ? val : null;
        };
        $mol_touch.prototype.swipe_from_top = function (val, force) {
            return (val !== void 0) ? val : null;
        };
        $mol_touch.prototype.swipe_to_right = function (val, force) {
            return (val !== void 0) ? val : null;
        };
        $mol_touch.prototype.swipe_to_bottom = function (val, force) {
            return (val !== void 0) ? val : null;
        };
        $mol_touch.prototype.swipe_to_left = function (val, force) {
            return (val !== void 0) ? val : null;
        };
        $mol_touch.prototype.swipe_to_top = function (val, force) {
            return (val !== void 0) ? val : null;
        };
        $mol_touch.prototype.event = function () {
            var _this = this;
            return (__assign({}, _super.prototype.event.call(this), { "touchstart": function (event) { return _this.event_start(event); }, "touchmove": function (event) { return _this.event_move(event); }, "touchend": function (event) { return _this.event_end(event); } }));
        };
        $mol_touch.prototype.event_start = function (event, force) {
            return (event !== void 0) ? event : null;
        };
        $mol_touch.prototype.event_move = function (event, force) {
            return (event !== void 0) ? event : null;
        };
        $mol_touch.prototype.event_end = function (event, force) {
            return (event !== void 0) ? event : null;
        };
        __decorate([
            $.$mol_mem
        ], $mol_touch.prototype, "start_zoom", null);
        __decorate([
            $.$mol_mem
        ], $mol_touch.prototype, "start_distance", null);
        __decorate([
            $.$mol_mem
        ], $mol_touch.prototype, "zoom", null);
        __decorate([
            $.$mol_mem
        ], $mol_touch.prototype, "start_pos", null);
        __decorate([
            $.$mol_mem
        ], $mol_touch.prototype, "swipe_right", null);
        __decorate([
            $.$mol_mem
        ], $mol_touch.prototype, "swipe_bottom", null);
        __decorate([
            $.$mol_mem
        ], $mol_touch.prototype, "swipe_left", null);
        __decorate([
            $.$mol_mem
        ], $mol_touch.prototype, "swipe_top", null);
        __decorate([
            $.$mol_mem
        ], $mol_touch.prototype, "swipe_from_right", null);
        __decorate([
            $.$mol_mem
        ], $mol_touch.prototype, "swipe_from_bottom", null);
        __decorate([
            $.$mol_mem
        ], $mol_touch.prototype, "swipe_from_left", null);
        __decorate([
            $.$mol_mem
        ], $mol_touch.prototype, "swipe_from_top", null);
        __decorate([
            $.$mol_mem
        ], $mol_touch.prototype, "swipe_to_right", null);
        __decorate([
            $.$mol_mem
        ], $mol_touch.prototype, "swipe_to_bottom", null);
        __decorate([
            $.$mol_mem
        ], $mol_touch.prototype, "swipe_to_left", null);
        __decorate([
            $.$mol_mem
        ], $mol_touch.prototype, "swipe_to_top", null);
        __decorate([
            $.$mol_mem
        ], $mol_touch.prototype, "event_start", null);
        __decorate([
            $.$mol_mem
        ], $mol_touch.prototype, "event_move", null);
        __decorate([
            $.$mol_mem
        ], $mol_touch.prototype, "event_end", null);
        return $mol_touch;
    }($.$mol_plugin));
    $.$mol_touch = $mol_touch;
})($ || ($ = {}));
//touch.view.tree.js.map
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
        var $mol_touch = (function (_super) {
            __extends($mol_touch, _super);
            function $mol_touch() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            $mol_touch.prototype.event_start = function (event) {
                if (event.defaultPrevented)
                    return;
                if (event.touches.length === 1) {
                    var pos = [event.touches[0].pageX, event.touches[0].pageY];
                    this.start_pos(pos);
                }
                if (event.touches.length === 2) {
                    event.preventDefault();
                    var distance = Math.pow((Math.pow((event.touches[1].pageX - event.touches[0].pageX), 2) + Math.pow((event.touches[1].pageY - event.touches[0].pageY), 2)), .5);
                    this.start_distance(distance);
                    this.start_zoom(this.zoom());
                }
            };
            $mol_touch.prototype.event_move = function (event) {
                if (event.touches.length === 1) {
                    var start = this.start_pos();
                    if (!start)
                        return;
                    var pos = [event.touches[0].pageX, event.touches[0].pageY];
                    var precision = this.swipe_precision();
                    if (pos[0] - start[0] > precision * 2 && Math.abs(pos[1] - start[1]) < precision)
                        this.swipe_right(event);
                    else if (start[0] - pos[0] > precision * 2 && Math.abs(pos[1] - start[1]) < precision)
                        this.swipe_left(event);
                    else if (pos[1] - start[1] > precision * 2 && Math.abs(pos[0] - start[0]) < precision)
                        this.swipe_bottom(event);
                    else if (start[1] - pos[1] > precision * 2 && Math.abs(pos[0] - start[0]) < precision)
                        this.swipe_top(event);
                    else
                        return;
                    this.start_pos(null);
                }
                if (event.touches.length === 2) {
                    var distance = Math.pow((Math.pow((event.touches[1].pageX - event.touches[0].pageX), 2) + Math.pow((event.touches[1].pageY - event.touches[0].pageY), 2)), .5);
                    this.zoom(this.start_zoom() * distance / this.start_distance());
                }
            };
            $mol_touch.prototype.swipe_left = function (event) {
                if (this.dom_node().getBoundingClientRect().right - this.start_pos()[0] < this.swipe_precision() * 2)
                    this.swipe_from_right(event);
                else
                    this.swipe_to_left(event);
            };
            $mol_touch.prototype.swipe_right = function (event) {
                if (this.start_pos()[0] - this.dom_node().getBoundingClientRect().left < this.swipe_precision() * 2)
                    this.swipe_from_left(event);
                else
                    this.swipe_to_right(event);
            };
            $mol_touch.prototype.swipe_top = function (event) {
                if (this.dom_node().getBoundingClientRect().bottom - this.start_pos()[1] < this.swipe_precision() * 2)
                    this.swipe_from_bottom(event);
                else
                    this.swipe_to_top(event);
            };
            $mol_touch.prototype.swipe_bottom = function (event) {
                if (this.start_pos()[1] - this.dom_node().getBoundingClientRect().top < this.swipe_precision() * 2)
                    this.swipe_from_top(event);
                else
                    this.swipe_to_bottom(event);
            };
            $mol_touch.prototype.event_end = function (event) {
            };
            return $mol_touch;
        }($.$mol_touch));
        $$.$mol_touch = $mol_touch;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//touch.view.js.map
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
    var $mol_ghost = (function (_super) {
        __extends($mol_ghost, _super);
        function $mol_ghost() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_ghost.prototype.Sub = function () {
            return (function (obj) {
                return obj;
            })(new this.$.$mol_view);
        };
        __decorate([
            $.$mol_mem
        ], $mol_ghost.prototype, "Sub", null);
        return $mol_ghost;
    }($.$mol_view));
    $.$mol_ghost = $mol_ghost;
})($ || ($ = {}));
//ghost.view.tree.js.map
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
        var $mol_ghost = (function (_super) {
            __extends($mol_ghost, _super);
            function $mol_ghost() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            $mol_ghost.prototype.dom_node = function () {
                var node = this.Sub().dom_node();
                $.$mol_dom_render_attributes(node, this.attr_static());
                $.$mol_dom_render_events(node, this.event());
                $.$mol_dom_render_events_async(node, this.event_async());
                return node;
            };
            $mol_ghost.prototype.dom_tree = function () {
                var node = this.Sub().dom_tree();
                _super.prototype.render.call(this);
                return node;
            };
            __decorate([
                $.$mol_mem
            ], $mol_ghost.prototype, "dom_node", null);
            return $mol_ghost;
        }($.$mol_ghost));
        $$.$mol_ghost = $mol_ghost;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//ghost.view.js.map
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
    var $mol_book = (function (_super) {
        __extends($mol_book, _super);
        function $mol_book() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_book.prototype.sub = function () {
            return this.pages_wrapped();
        };
        $mol_book.prototype.pages_wrapped = function () {
            return [];
        };
        $mol_book.prototype.pages = function () {
            return [];
        };
        $mol_book.prototype.plugins = function () {
            return [].concat(this.Meter(), this.Touch());
        };
        $mol_book.prototype.width = function () {
            return this.Meter().width();
        };
        $mol_book.prototype.Meter = function () {
            return (function (obj) {
                return obj;
            })(new this.$.$mol_meter);
        };
        $mol_book.prototype.Touch = function () {
            var _this = this;
            return (function (obj) {
                obj.swipe_from_left = function (val) { return _this.event_front_up(val); };
                obj.swipe_to_left = function (val) { return _this.event_front_down(val); };
                return obj;
            })(new this.$.$mol_touch);
        };
        $mol_book.prototype.event_front_up = function (val, force) {
            return (val !== void 0) ? val : null;
        };
        $mol_book.prototype.event_front_down = function (val, force) {
            return (val !== void 0) ? val : null;
        };
        $mol_book.prototype.Page = function (index) {
            var _this = this;
            return (function (obj) {
                obj.Sub = function () { return _this.page(index); };
                obj.visible = function () { return _this.page_visible(index); };
                return obj;
            })(new this.$.$mol_book_page);
        };
        $mol_book.prototype.page = function (index) {
            return null;
        };
        $mol_book.prototype.page_visible = function (index) {
            return true;
        };
        $mol_book.prototype.Placeholder = function () {
            var _this = this;
            return (function (obj) {
                obj.title = function () { return _this.title(); };
                return obj;
            })(new this.$.$mol_book_placeholder);
        };
        __decorate([
            $.$mol_mem
        ], $mol_book.prototype, "Meter", null);
        __decorate([
            $.$mol_mem
        ], $mol_book.prototype, "Touch", null);
        __decorate([
            $.$mol_mem
        ], $mol_book.prototype, "event_front_up", null);
        __decorate([
            $.$mol_mem
        ], $mol_book.prototype, "event_front_down", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_book.prototype, "Page", null);
        __decorate([
            $.$mol_mem
        ], $mol_book.prototype, "Placeholder", null);
        return $mol_book;
    }($.$mol_view));
    $.$mol_book = $mol_book;
})($ || ($ = {}));
(function ($) {
    var $mol_book_placeholder = (function (_super) {
        __extends($mol_book_placeholder, _super);
        function $mol_book_placeholder() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_book_placeholder.prototype.minimal_width = function () {
            return 400;
        };
        $mol_book_placeholder.prototype.attr = function () {
            return (__assign({}, _super.prototype.attr.call(this), { "tabindex": null }));
        };
        $mol_book_placeholder.prototype.sub = function () {
            return [].concat(this.title());
        };
        return $mol_book_placeholder;
    }($.$mol_scroll));
    $.$mol_book_placeholder = $mol_book_placeholder;
})($ || ($ = {}));
(function ($) {
    var $mol_book_page = (function (_super) {
        __extends($mol_book_page, _super);
        function $mol_book_page() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_book_page.prototype.attr = function () {
            return (__assign({}, _super.prototype.attr.call(this), { "tabindex": 0, "mol_book_page_focused": this.focused(), "mol_book_page_visible": this.visible() }));
        };
        $mol_book_page.prototype.visible = function () {
            return true;
        };
        return $mol_book_page;
    }($.$mol_ghost));
    $.$mol_book_page = $mol_book_page;
})($ || ($ = {}));
//book.view.tree.js.map
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
        var $mol_book = (function (_super) {
            __extends($mol_book, _super);
            function $mol_book() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            $mol_book.prototype.pages_extended = function () {
                return [this.Placeholder()].concat(this.pages());
            };
            $mol_book.prototype.break_point = function () {
                var pages = this.pages_extended();
                var limit = this.width();
                var width = 0;
                for (var break_point = pages.length; break_point > 0; --break_point) {
                    var page = pages[break_point - 1];
                    if (!page)
                        continue;
                    var page_width = page.minimal_width();
                    if (width + page_width > limit)
                        break;
                    width += page_width;
                }
                if (width === 0)
                    --break_point;
                return break_point;
            };
            $mol_book.prototype.page = function (index) {
                return this.pages_extended()[index];
            };
            $mol_book.prototype.page_visible = function (index) {
                return index >= this.break_point();
            };
            $mol_book.prototype.pages_wrapped = function () {
                var pages = this.pages_extended();
                var extended = [];
                for (var i = 1; i < pages.length; ++i) {
                    if (pages[i])
                        extended.push(this.Page(i));
                }
                if (pages[0])
                    extended.push(this.Page(0));
                return extended;
            };
            $mol_book.prototype.title = function () {
                var pages = this.pages_wrapped();
                return pages[pages.length - 1].title();
            };
            $mol_book.prototype.event_front_up = function (event) {
                if (!event)
                    return;
                if (event.defaultPrevented)
                    return;
                this.page(1).focused(true);
            };
            $mol_book.prototype.event_front_down = function (event) {
                if (!event)
                    return;
                if (event.defaultPrevented)
                    return;
                this.page(1).focused(false);
            };
            __decorate([
                $.$mol_mem
            ], $mol_book.prototype, "pages_extended", null);
            __decorate([
                $.$mol_mem
            ], $mol_book.prototype, "break_point", null);
            __decorate([
                $.$mol_mem
            ], $mol_book.prototype, "pages_wrapped", null);
            return $mol_book;
        }($.$mol_book));
        $$.$mol_book = $mol_book;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//book.view.js.map
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
    var $mol_icon_folder = (function (_super) {
        __extends($mol_icon_folder, _super);
        function $mol_icon_folder() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_icon_folder.prototype.path = function () {
            return "M10,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V8C22,6.89 21.1,6 20,6H12L10,4Z";
        };
        return $mol_icon_folder;
    }($.$mol_icon));
    $.$mol_icon_folder = $mol_icon_folder;
})($ || ($ = {}));
//folder.view.tree.js.map
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
    var $mol_icon_file2 = (function (_super) {
        __extends($mol_icon_file2, _super);
        function $mol_icon_file2() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_icon_file2.prototype.path = function () {
            return "M19.9166667,5.8344 L22,7.8344 L22,24 L4.08333333,24 L4.08333333,22 L2,22 L2,0 L19.9166667,0 L19.9166667,5.8344 Z M16.1666667,3.3656 L16.1666667,7.6 L20.5775,7.6 L19.9166667,6.9656 L16.1666667,3.3656 Z M2.83333333,21.2 L4.08333333,21.2 L4.08333333,2 L15.9225,2 L19.0833333,5.0344 L19.0833333,0.8 L2.83333333,0.8 L2.83333333,21.2 Z M4.91666667,23.2 L21.1666667,23.2 L21.1666667,8.4 L15.3333333,8.4 L15.3333333,2.8 L4.91666667,2.8 L4.91666667,22 L4.91666667,23.2 Z M18.25,10 C18.48,10 18.6666667,10.1788 18.6666667,10.4 C18.6666667,10.6212 18.48,10.8 18.25,10.8 L7.83333333,10.8 C7.60333333,10.8 7.41666667,10.6212 7.41666667,10.4 C7.41666667,10.1788 7.60333333,10 7.83333333,10 L18.25,10 Z M7.83333333,7.6 C7.60333333,7.6 7.41666667,7.4212 7.41666667,7.2 C7.41666667,6.9788 7.60333333,6.8 7.83333333,6.8 L12,6.8 C12.23,6.8 12.4166667,6.9788 12.4166667,7.2 C12.4166667,7.4212 12.23,7.6 12,7.6 L7.83333333,7.6 Z M18.25,13.2 C18.48,13.2 18.6666667,13.3788 18.6666667,13.6 C18.6666667,13.8212 18.48,14 18.25,14 L7.83333333,14 C7.60333333,14 7.41666667,13.8212 7.41666667,13.6 C7.41666667,13.3788 7.60333333,13.2 7.83333333,13.2 L18.25,13.2 Z M18.25,16.4 C18.48,16.4 18.6666667,16.5788 18.6666667,16.8 C18.6666667,17.0212 18.48,17.2 18.25,17.2 L7.83333333,17.2 C7.60333333,17.2 7.41666667,17.0212 7.41666667,16.8 C7.41666667,16.5788 7.60333333,16.4 7.83333333,16.4 L18.25,16.4 Z M18.25,19.6 C18.48,19.6 18.6666667,19.7788 18.6666667,20 C18.6666667,20.2212 18.48,20.4 18.25,20.4 L7.83333333,20.4 C7.60333333,20.4 7.41666667,20.2212 7.41666667,20 C7.41666667,19.7788 7.60333333,19.6 7.83333333,19.6 L18.25,19.6 Z";
        };
        return $mol_icon_file2;
    }($.$mol_icon));
    $.$mol_icon_file2 = $mol_icon_file2;
})($ || ($ = {}));
//file2.view.tree.js.map
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_embed = (function (_super) {
        __extends($mol_embed, _super);
        function $mol_embed() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_embed.prototype.Pdf = function () {
            var _this = this;
            return (function (obj) {
                obj.uri = function () { return _this.uri(); };
                return obj;
            })(new this.$.$mol_embed_pdf);
        };
        $mol_embed.prototype.uri = function () {
            return "";
        };
        $mol_embed.prototype.Native = function () {
            var _this = this;
            return (function (obj) {
                obj.uri = function () { return _this.uri(); };
                obj.mime = function () { return _this.mime(); };
                return obj;
            })(new this.$.$mol_embed_native);
        };
        $mol_embed.prototype.mime = function () {
            return "";
        };
        __decorate([
            $.$mol_mem
        ], $mol_embed.prototype, "Pdf", null);
        __decorate([
            $.$mol_mem
        ], $mol_embed.prototype, "Native", null);
        return $mol_embed;
    }($.$mol_ghost));
    $.$mol_embed = $mol_embed;
})($ || ($ = {}));
//embed.view.tree.js.map
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
        var $mol_embed = (function (_super) {
            __extends($mol_embed, _super);
            function $mol_embed() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            $mol_embed.prototype.Sub = function () {
                if (this.mime() === 'application/pdf') {
                    return this.Pdf();
                }
                return this.Native();
            };
            return $mol_embed;
        }($.$mol_embed));
        $$.$mol_embed = $mol_embed;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//embed.view.js.map
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
    var $mol_embed_native = (function (_super) {
        __extends($mol_embed_native, _super);
        function $mol_embed_native() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_embed_native.prototype.dom_name = function () {
            return "object";
        };
        $mol_embed_native.prototype.attr = function () {
            return (__assign({}, _super.prototype.attr.call(this), { "data": this.uri(), "type": this.mime() }));
        };
        $mol_embed_native.prototype.uri = function () {
            return "";
        };
        $mol_embed_native.prototype.mime = function () {
            return "";
        };
        $mol_embed_native.prototype.sub = function () {
            return [].concat(this.Open());
        };
        $mol_embed_native.prototype.Open = function () {
            var _this = this;
            return (function (obj) {
                obj.uri = function () { return _this.uri(); };
                obj.sub = function () { return [].concat(_this.Open_button()); };
                return obj;
            })(new this.$.$mol_link);
        };
        $mol_embed_native.prototype.Open_button = function () {
            var _this = this;
            return (function (obj) {
                obj.title = function () { return _this.open_label(); };
                return obj;
            })(new this.$.$mol_button_major);
        };
        $mol_embed_native.prototype.open_label = function () {
            return $.$mol_locale.text(this.locale_contexts(), "open_label");
        };
        __decorate([
            $.$mol_mem
        ], $mol_embed_native.prototype, "Open", null);
        __decorate([
            $.$mol_mem
        ], $mol_embed_native.prototype, "Open_button", null);
        return $mol_embed_native;
    }($.$mol_view));
    $.$mol_embed_native = $mol_embed_native;
})($ || ($ = {}));
//native.view.tree.js.map
;
var $node = {};
//node.web.js.map
;

var $node = $node || {}
void function( module ) { var exports = module.exports; function require( id ) { return $node[ id ] }; 

;
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("pdfjs-dist/build/pdf",[],t):"object"==typeof exports?exports["pdfjs-dist/build/pdf"]=t():e["pdfjs-dist/build/pdf"]=e.pdfjsDistBuildPdf=t()}(this,function(){return function(e){function t(n){if(r[n])return r[n].exports;var i=r[n]={i:n,l:!1,exports:{}};return e[n].call(i.exports,i,i.exports,t),i.l=!0,i.exports}var r={};return t.m=e,t.c=r,t.d=function(e,r,n){t.o(e,r)||Object.defineProperty(e,r,{configurable:!1,enumerable:!0,get:n})},t.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(r,"a",r),r},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=54)}([function(e,t,r){"use strict";function n(e){O>=x.warnings&&console.log("Warning: "+e)}function i(e){throw new Error(e)}function a(e,t){e||i(t)}function o(e){if(!e)return!1;switch(e.protocol){case"http:":case"https:":case"ftp:":case"mailto:":case"tel:":return!0;default:return!1}}function s(e){a("string"==typeof e,"Invalid argument for stringToBytes");for(var t=e.length,r=new Uint8Array(t),n=0;n<t;++n)r[n]=255&e.charCodeAt(n);return r}function l(e){return void 0!==e.length?e.length:(a(void 0!==e.byteLength),e.byteLength)}function u(){var e={};return e.promise=new Promise(function(t,r){e.resolve=t,e.reject=r}),e}function c(e,t){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;return e?new Promise(function(n,i){n(e.apply(r,t))}):Promise.resolve(void 0)}function h(e){if("object"!==(void 0===e?"undefined":g(e)))return e;switch(e.name){case"AbortException":return new z(e.message);case"MissingPDFException":return new M(e.message);case"UnexpectedResponseException":return new N(e.message,e.status);default:return new D(e.message,e.details)}}function d(e){return!(e instanceof Error)||e instanceof z||e instanceof M||e instanceof N||e instanceof D?e:new D(e.message,e.toString())}function f(e,t,r){t?e.resolve():e.reject(r)}function p(e){return Promise.resolve(e).catch(function(){})}function m(e,t,r){var n=this;this.sourceName=e,this.targetName=t,this.comObj=r,this.callbackId=1,this.streamId=1,this.postMessageTransfers=!0,this.streamSinks=Object.create(null),this.streamControllers=Object.create(null);var i=this.callbacksCapabilities=Object.create(null),a=this.actionHandler=Object.create(null);this._onComObjOnMessage=function(e){var t=e.data;if(t.targetName===n.sourceName)if(t.stream)n._processStreamMessage(t);else if(t.isReply){var o=t.callbackId;if(!(t.callbackId in i))throw new Error("Cannot resolve callback "+o);var s=i[o];delete i[o],"error"in t?s.reject(h(t.error)):s.resolve(t.data)}else{if(!(t.action in a))throw new Error("Unknown action from worker: "+t.action);var l=a[t.action];if(t.callbackId){var u=n.sourceName,c=t.sourceName;Promise.resolve().then(function(){return l[0].call(l[1],t.data)}).then(function(e){r.postMessage({sourceName:u,targetName:c,isReply:!0,callbackId:t.callbackId,data:e})},function(e){r.postMessage({sourceName:u,targetName:c,isReply:!0,callbackId:t.callbackId,error:d(e)})})}else t.streamId?n._createStreamSink(t):l[0].call(l[1],t.data)}},r.addEventListener("message",this._onComObjOnMessage)}Object.defineProperty(t,"__esModule",{value:!0}),t.unreachable=t.warn=t.utf8StringToString=t.stringToUTF8String=t.stringToPDFString=t.stringToBytes=t.string32=t.shadow=t.setVerbosityLevel=t.ReadableStream=t.removeNullCharacters=t.readUint32=t.readUint16=t.readInt8=t.log2=t.loadJpegStream=t.isEvalSupported=t.isLittleEndian=t.createValidAbsoluteUrl=t.isSameOrigin=t.isNodeJS=t.isSpace=t.isString=t.isNum=t.isEmptyObj=t.isBool=t.isArrayBuffer=t.info=t.getVerbosityLevel=t.getLookupTableFactory=t.deprecated=t.createObjectURL=t.createPromiseCapability=t.createBlob=t.bytesToString=t.assert=t.arraysToBytes=t.arrayByteLength=t.FormatError=t.XRefParseException=t.Util=t.UnknownErrorException=t.UnexpectedResponseException=t.TextRenderingMode=t.StreamType=t.StatTimer=t.PasswordResponses=t.PasswordException=t.PageViewport=t.NotImplementedException=t.NativeImageDecoding=t.MissingPDFException=t.MissingDataException=t.MessageHandler=t.InvalidPDFException=t.AbortException=t.CMapCompressionType=t.ImageKind=t.FontType=t.AnnotationType=t.AnnotationFlag=t.AnnotationFieldFlag=t.AnnotationBorderStyleType=t.UNSUPPORTED_FEATURES=t.VERBOSITY_LEVELS=t.OPS=t.IDENTITY_MATRIX=t.FONT_IDENTITY_MATRIX=void 0;var g="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};r(55);var v=r(80),b=[.001,0,0,.001,0,0],_={NONE:"none",DECODE:"decode",DISPLAY:"display"},y={FILL:0,STROKE:1,FILL_STROKE:2,INVISIBLE:3,FILL_ADD_TO_PATH:4,STROKE_ADD_TO_PATH:5,FILL_STROKE_ADD_TO_PATH:6,ADD_TO_PATH:7,FILL_STROKE_MASK:3,ADD_TO_PATH_FLAG:4},A={GRAYSCALE_1BPP:1,RGB_24BPP:2,RGBA_32BPP:3},S={TEXT:1,LINK:2,FREETEXT:3,LINE:4,SQUARE:5,CIRCLE:6,POLYGON:7,POLYLINE:8,HIGHLIGHT:9,UNDERLINE:10,SQUIGGLY:11,STRIKEOUT:12,STAMP:13,CARET:14,INK:15,POPUP:16,FILEATTACHMENT:17,SOUND:18,MOVIE:19,WIDGET:20,SCREEN:21,PRINTERMARK:22,TRAPNET:23,WATERMARK:24,THREED:25,REDACT:26},w={INVISIBLE:1,HIDDEN:2,PRINT:4,NOZOOM:8,NOROTATE:16,NOVIEW:32,READONLY:64,LOCKED:128,TOGGLENOVIEW:256,LOCKEDCONTENTS:512},P={READONLY:1,REQUIRED:2,NOEXPORT:4,MULTILINE:4096,PASSWORD:8192,NOTOGGLETOOFF:16384,RADIO:32768,PUSHBUTTON:65536,COMBO:131072,EDIT:262144,SORT:524288,FILESELECT:1048576,MULTISELECT:2097152,DONOTSPELLCHECK:4194304,DONOTSCROLL:8388608,COMB:16777216,RICHTEXT:33554432,RADIOSINUNISON:33554432,COMMITONSELCHANGE:67108864},R={SOLID:1,DASHED:2,BEVELED:3,INSET:4,UNDERLINE:5},C={UNKNOWN:0,FLATE:1,LZW:2,DCT:3,JPX:4,JBIG:5,A85:6,AHX:7,CCF:8,RL:9},k={UNKNOWN:0,TYPE1:1,TYPE1C:2,CIDFONTTYPE0:3,CIDFONTTYPE0C:4,TRUETYPE:5,CIDFONTTYPE2:6,TYPE3:7,OPENTYPE:8,TYPE0:9,MMTYPE1:10},x={errors:0,warnings:1,infos:5},T={NONE:0,BINARY:1,STREAM:2},E={dependency:1,setLineWidth:2,setLineCap:3,setLineJoin:4,setMiterLimit:5,setDash:6,setRenderingIntent:7,setFlatness:8,setGState:9,save:10,restore:11,transform:12,moveTo:13,lineTo:14,curveTo:15,curveTo2:16,curveTo3:17,closePath:18,rectangle:19,stroke:20,closeStroke:21,fill:22,eoFill:23,fillStroke:24,eoFillStroke:25,closeFillStroke:26,closeEOFillStroke:27,endPath:28,clip:29,eoClip:30,beginText:31,endText:32,setCharSpacing:33,setWordSpacing:34,setHScale:35,setLeading:36,setFont:37,setTextRenderingMode:38,setTextRise:39,moveText:40,setLeadingMoveText:41,setTextMatrix:42,nextLine:43,showText:44,showSpacedText:45,nextLineShowText:46,nextLineSetSpacingShowText:47,setCharWidth:48,setCharWidthAndBounds:49,setStrokeColorSpace:50,setFillColorSpace:51,setStrokeColor:52,setStrokeColorN:53,setFillColor:54,setFillColorN:55,setStrokeGray:56,setFillGray:57,setStrokeRGBColor:58,setFillRGBColor:59,setStrokeCMYKColor:60,setFillCMYKColor:61,shadingFill:62,beginInlineImage:63,beginImageData:64,endInlineImage:65,paintXObject:66,markPoint:67,markPointProps:68,beginMarkedContent:69,beginMarkedContentProps:70,endMarkedContent:71,beginCompat:72,endCompat:73,paintFormXObjectBegin:74,paintFormXObjectEnd:75,beginGroup:76,endGroup:77,beginAnnotations:78,endAnnotations:79,beginAnnotation:80,endAnnotation:81,paintJpegXObject:82,paintImageMaskXObject:83,paintImageMaskXObjectGroup:84,paintImageXObject:85,paintInlineImageXObject:86,paintInlineImageXObjectGroup:87,paintImageXObjectRepeat:88,paintImageMaskXObjectRepeat:89,paintSolidColorImageMask:90,constructPath:91},O=x.warnings,I={unknown:"unknown",forms:"forms",javaScript:"javaScript",smask:"smask",shadingPattern:"shadingPattern",font:"font"},L={NEED_PASSWORD:1,INCORRECT_PASSWORD:2},F=function(){function e(e,t){this.name="PasswordException",this.message=e,this.code=t}return e.prototype=new Error,e.constructor=e,e}(),D=function(){function e(e,t){this.name="UnknownErrorException",this.message=e,this.details=t}return e.prototype=new Error,e.constructor=e,e}(),j=function(){function e(e){this.name="InvalidPDFException",this.message=e}return e.prototype=new Error,e.constructor=e,e}(),M=function(){function e(e){this.name="MissingPDFException",this.message=e}return e.prototype=new Error,e.constructor=e,e}(),N=function(){function e(e,t){this.name="UnexpectedResponseException",this.message=e,this.status=t}return e.prototype=new Error,e.constructor=e,e}(),q=function(){function e(e){this.message=e}return e.prototype=new Error,e.prototype.name="NotImplementedException",e.constructor=e,e}(),W=function(){function e(e,t){this.begin=e,this.end=t,this.message="Missing data ["+e+", "+t+")"}return e.prototype=new Error,e.prototype.name="MissingDataException",e.constructor=e,e}(),U=function(){function e(e){this.message=e}return e.prototype=new Error,e.prototype.name="XRefParseException",e.constructor=e,e}(),B=function(){function e(e){this.message=e}return e.prototype=new Error,e.prototype.name="FormatError",e.constructor=e,e}(),z=function(){function e(e){this.name="AbortException",this.message=e}return e.prototype=new Error,e.constructor=e,e}(),G=/\x00/g,H=[1,0,0,1,0,0],X=function(){function e(){}var t=["rgb(",0,",",0,",",0,")"];e.makeCssRgb=function(e,r,n){return t[1]=e,t[3]=r,t[5]=n,t.join("")},e.transform=function(e,t){return[e[0]*t[0]+e[2]*t[1],e[1]*t[0]+e[3]*t[1],e[0]*t[2]+e[2]*t[3],e[1]*t[2]+e[3]*t[3],e[0]*t[4]+e[2]*t[5]+e[4],e[1]*t[4]+e[3]*t[5]+e[5]]},e.applyTransform=function(e,t){return[e[0]*t[0]+e[1]*t[2]+t[4],e[0]*t[1]+e[1]*t[3]+t[5]]},e.applyInverseTransform=function(e,t){var r=t[0]*t[3]-t[1]*t[2];return[(e[0]*t[3]-e[1]*t[2]+t[2]*t[5]-t[4]*t[3])/r,(-e[0]*t[1]+e[1]*t[0]+t[4]*t[1]-t[5]*t[0])/r]},e.getAxialAlignedBoundingBox=function(t,r){var n=e.applyTransform(t,r),i=e.applyTransform(t.slice(2,4),r),a=e.applyTransform([t[0],t[3]],r),o=e.applyTransform([t[2],t[1]],r);return[Math.min(n[0],i[0],a[0],o[0]),Math.min(n[1],i[1],a[1],o[1]),Math.max(n[0],i[0],a[0],o[0]),Math.max(n[1],i[1],a[1],o[1])]},e.inverseTransform=function(e){var t=e[0]*e[3]-e[1]*e[2];return[e[3]/t,-e[1]/t,-e[2]/t,e[0]/t,(e[2]*e[5]-e[4]*e[3])/t,(e[4]*e[1]-e[5]*e[0])/t]},e.apply3dTransform=function(e,t){return[e[0]*t[0]+e[1]*t[1]+e[2]*t[2],e[3]*t[0]+e[4]*t[1]+e[5]*t[2],e[6]*t[0]+e[7]*t[1]+e[8]*t[2]]},e.singularValueDecompose2dScale=function(e){var t=[e[0],e[2],e[1],e[3]],r=e[0]*t[0]+e[1]*t[2],n=e[0]*t[1]+e[1]*t[3],i=e[2]*t[0]+e[3]*t[2],a=e[2]*t[1]+e[3]*t[3],o=(r+a)/2,s=Math.sqrt((r+a)*(r+a)-4*(r*a-i*n))/2,l=o+s||1,u=o-s||1;return[Math.sqrt(l),Math.sqrt(u)]},e.normalizeRect=function(e){var t=e.slice(0);return e[0]>e[2]&&(t[0]=e[2],t[2]=e[0]),e[1]>e[3]&&(t[1]=e[3],t[3]=e[1]),t},e.intersect=function(t,r){function n(e,t){return e-t}var i=[t[0],t[2],r[0],r[2]].sort(n),a=[t[1],t[3],r[1],r[3]].sort(n),o=[];return t=e.normalizeRect(t),r=e.normalizeRect(r),(i[0]===t[0]&&i[1]===r[0]||i[0]===r[0]&&i[1]===t[0])&&(o[0]=i[1],o[2]=i[2],(a[0]===t[1]&&a[1]===r[1]||a[0]===r[1]&&a[1]===t[1])&&(o[1]=a[1],o[3]=a[2],o))},e.sign=function(e){return e<0?-1:1};var r=["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM","","X","XX","XXX","XL","L","LX","LXX","LXXX","XC","","I","II","III","IV","V","VI","VII","VIII","IX"];return e.toRoman=function(e,t){a(Number.isInteger(e)&&e>0,"The number should be a positive integer.");for(var n,i=[];e>=1e3;)e-=1e3,i.push("M");n=e/100|0,e%=100,i.push(r[n]),n=e/10|0,e%=10,i.push(r[10+n]),i.push(r[20+e]);var o=i.join("");return t?o.toLowerCase():o},e.appendToArray=function(e,t){Array.prototype.push.apply(e,t)},e.prependToArray=function(e,t){Array.prototype.unshift.apply(e,t)},e.extendObj=function(e,t){for(var r in t)e[r]=t[r]},e.getInheritableProperty=function(e,t,r){for(;e&&!e.has(t);)e=e.get("Parent");return e?r?e.getArray(t):e.get(t):null},e.inherit=function(e,t,r){e.prototype=Object.create(t.prototype),e.prototype.constructor=e;for(var n in r)e.prototype[n]=r[n]},e.loadScript=function(e,t){var r=document.createElement("script"),n=!1;r.setAttribute("src",e),t&&(r.onload=function(){n||t(),n=!0}),document.getElementsByTagName("head")[0].appendChild(r)},e}(),V=function(){function e(e,t,r,n,i,a){this.viewBox=e,this.scale=t,this.rotation=r,this.offsetX=n,this.offsetY=i;var o,s,l,u,c=(e[2]+e[0])/2,h=(e[3]+e[1])/2;switch(r%=360,r=r<0?r+360:r){case 180:o=-1,s=0,l=0,u=1;break;case 90:o=0,s=1,l=1,u=0;break;case 270:o=0,s=-1,l=-1,u=0;break;default:o=1,s=0,l=0,u=-1}a&&(l=-l,u=-u);var d,f,p,m;0===o?(d=Math.abs(h-e[1])*t+n,f=Math.abs(c-e[0])*t+i,p=Math.abs(e[3]-e[1])*t,m=Math.abs(e[2]-e[0])*t):(d=Math.abs(c-e[0])*t+n,f=Math.abs(h-e[1])*t+i,p=Math.abs(e[2]-e[0])*t,m=Math.abs(e[3]-e[1])*t),this.transform=[o*t,s*t,l*t,u*t,d-o*t*c-l*t*h,f-s*t*c-u*t*h],this.width=p,this.height=m,this.fontScale=t}return e.prototype={clone:function(t){var r="scale"in(t=t||{})?t.scale:this.scale,n="rotation"in t?t.rotation:this.rotation;return new e(this.viewBox.slice(),r,n,this.offsetX,this.offsetY,t.dontFlip)},convertToViewportPoint:function(e,t){return X.applyTransform([e,t],this.transform)},convertToViewportRectangle:function(e){var t=X.applyTransform([e[0],e[1]],this.transform),r=X.applyTransform([e[2],e[3]],this.transform);return[t[0],t[1],r[0],r[1]]},convertToPdfPoint:function(e,t){return X.applyInverseTransform([e,t],this.transform)}},e}(),Y=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,728,711,710,729,733,731,730,732,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,8226,8224,8225,8230,8212,8211,402,8260,8249,8250,8722,8240,8222,8220,8221,8216,8217,8218,8482,64257,64258,321,338,352,376,381,305,322,339,353,382,0,8364],J=function(){function e(e,t,r){for(;e.length<r;)e+=t;return e}function t(){this.started=Object.create(null),this.times=[],this.enabled=!0}return t.prototype={time:function(e){this.enabled&&(e in this.started&&n("Timer is already running for "+e),this.started[e]=Date.now())},timeEnd:function(e){this.enabled&&(e in this.started||n("Timer has not been started for "+e),this.times.push({name:e,start:this.started[e],end:Date.now()}),delete this.started[e])},toString:function(){var t,r,n=this.times,i="",a=0;for(t=0,r=n.length;t<r;++t){var o=n[t].name;o.length>a&&(a=o.length)}for(t=0,r=n.length;t<r;++t){var s=n[t],l=s.end-s.start;i+=e(s.name," ",a)+" "+l+"ms\n"}return i}},t}(),Q=function(e,t){if("undefined"!=typeof Blob)return new Blob([e],{type:t});throw new Error('The "Blob" constructor is not supported.')},K=function(){var e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";return function(t,r){if(!(arguments.length>2&&void 0!==arguments[2]&&arguments[2])&&URL.createObjectURL){var n=Q(t,r);return URL.createObjectURL(n)}for(var i="data:"+r+";base64,",a=0,o=t.length;a<o;a+=3){var s=255&t[a],l=255&t[a+1],u=255&t[a+2],c=s>>2,h=(3&s)<<4|l>>4,d=a+1<o?(15&l)<<2|u>>6:64,f=a+2<o?63&u:64;i+=e[c]+e[h]+e[d]+e[f]}return i}}();m.prototype={on:function(e,t,r){var n=this.actionHandler;if(n[e])throw new Error('There is already an actionName called "'+e+'"');n[e]=[t,r]},send:function(e,t,r){var n={sourceName:this.sourceName,targetName:this.targetName,action:e,data:t};this.postMessage(n,r)},sendWithPromise:function(e,t,r){var n=this.callbackId++,i={sourceName:this.sourceName,targetName:this.targetName,action:e,data:t,callbackId:n},a=u();this.callbacksCapabilities[n]=a;try{this.postMessage(i,r)}catch(e){a.reject(e)}return a.promise},sendWithStream:function(e,t,r,n){var i=this,a=this.streamId++,o=this.sourceName,s=this.targetName;return new v.ReadableStream({start:function(r){var n=u();return i.streamControllers[a]={controller:r,startCall:n,isClosed:!1},i.postMessage({sourceName:o,targetName:s,action:e,streamId:a,data:t,desiredSize:r.desiredSize}),n.promise},pull:function(e){var t=u();return i.streamControllers[a].pullCall=t,i.postMessage({sourceName:o,targetName:s,stream:"pull",streamId:a,desiredSize:e.desiredSize}),t.promise},cancel:function(e){var t=u();return i.streamControllers[a].cancelCall=t,i.streamControllers[a].isClosed=!0,i.postMessage({sourceName:o,targetName:s,stream:"cancel",reason:e,streamId:a}),t.promise}},r)},_createStreamSink:function(e){var t=this,r=this,n=this.actionHandler[e.action],i=e.streamId,a=e.desiredSize,o=this.sourceName,s=e.sourceName,l=function(e){var r=e.stream,n=e.chunk,a=e.transfers,l=e.success,u=e.reason;t.postMessage({sourceName:o,targetName:s,stream:r,streamId:i,chunk:n,success:l,reason:u},a)},h={enqueue:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,r=arguments[2];if(!this.isCancelled){var n=this.desiredSize;this.desiredSize-=t,n>0&&this.desiredSize<=0&&(this.sinkCapability=u(),this.ready=this.sinkCapability.promise),l({stream:"enqueue",chunk:e,transfers:r})}},close:function(){this.isCancelled||(this.isCancelled=!0,l({stream:"close"}),delete r.streamSinks[i])},error:function(e){this.isCancelled||(this.isCancelled=!0,l({stream:"error",reason:e}))},sinkCapability:u(),onPull:null,onCancel:null,isCancelled:!1,desiredSize:a,ready:null};h.sinkCapability.resolve(),h.ready=h.sinkCapability.promise,this.streamSinks[i]=h,c(n[0],[e.data,h],n[1]).then(function(){l({stream:"start_complete",success:!0})},function(e){l({stream:"start_complete",success:!1,reason:e})})},_processStreamMessage:function(e){var t=this,r=this.sourceName,n=e.sourceName,i=e.streamId,o=function(e){var a=e.stream,o=e.success,s=e.reason;t.comObj.postMessage({sourceName:r,targetName:n,stream:a,success:o,streamId:i,reason:s})},s=function(){Promise.all([t.streamControllers[e.streamId].startCall,t.streamControllers[e.streamId].pullCall,t.streamControllers[e.streamId].cancelCall].map(function(e){return e&&p(e.promise)})).then(function(){delete t.streamControllers[e.streamId]})};switch(e.stream){case"start_complete":f(this.streamControllers[e.streamId].startCall,e.success,h(e.reason));break;case"pull_complete":f(this.streamControllers[e.streamId].pullCall,e.success,h(e.reason));break;case"pull":if(!this.streamSinks[e.streamId]){o({stream:"pull_complete",success:!0});break}this.streamSinks[e.streamId].desiredSize<=0&&e.desiredSize>0&&this.streamSinks[e.streamId].sinkCapability.resolve(),this.streamSinks[e.streamId].desiredSize=e.desiredSize,c(this.streamSinks[e.streamId].onPull).then(function(){o({stream:"pull_complete",success:!0})},function(e){o({stream:"pull_complete",success:!1,reason:e})});break;case"enqueue":a(this.streamControllers[e.streamId],"enqueue should have stream controller"),this.streamControllers[e.streamId].isClosed||this.streamControllers[e.streamId].controller.enqueue(e.chunk);break;case"close":if(a(this.streamControllers[e.streamId],"close should have stream controller"),this.streamControllers[e.streamId].isClosed)break;this.streamControllers[e.streamId].isClosed=!0,this.streamControllers[e.streamId].controller.close(),s();break;case"error":a(this.streamControllers[e.streamId],"error should have stream controller"),this.streamControllers[e.streamId].controller.error(h(e.reason)),s();break;case"cancel_complete":f(this.streamControllers[e.streamId].cancelCall,e.success,h(e.reason)),s();break;case"cancel":if(!this.streamSinks[e.streamId])break;c(this.streamSinks[e.streamId].onCancel,[h(e.reason)]).then(function(){o({stream:"cancel_complete",success:!0})},function(e){o({stream:"cancel_complete",success:!1,reason:e})}),this.streamSinks[e.streamId].sinkCapability.reject(h(e.reason)),this.streamSinks[e.streamId].isCancelled=!0,delete this.streamSinks[e.streamId];break;default:throw new Error("Unexpected stream case")}},postMessage:function(e,t){t&&this.postMessageTransfers?this.comObj.postMessage(e,t):this.comObj.postMessage(e)},destroy:function(){this.comObj.removeEventListener("message",this._onComObjOnMessage)}},t.FONT_IDENTITY_MATRIX=b,t.IDENTITY_MATRIX=H,t.OPS=E,t.VERBOSITY_LEVELS=x,t.UNSUPPORTED_FEATURES=I,t.AnnotationBorderStyleType=R,t.AnnotationFieldFlag=P,t.AnnotationFlag=w,t.AnnotationType=S,t.FontType=k,t.ImageKind=A,t.CMapCompressionType=T,t.AbortException=z,t.InvalidPDFException=j,t.MessageHandler=m,t.MissingDataException=W,t.MissingPDFException=M,t.NativeImageDecoding=_,t.NotImplementedException=q,t.PageViewport=V,t.PasswordException=F,t.PasswordResponses=L,t.StatTimer=J,t.StreamType=C,t.TextRenderingMode=y,t.UnexpectedResponseException=N,t.UnknownErrorException=D,t.Util=X,t.XRefParseException=U,t.FormatError=B,t.arrayByteLength=l,t.arraysToBytes=function(e){if(1===e.length&&e[0]instanceof Uint8Array)return e[0];var t,r,n,i=0,a=e.length;for(t=0;t<a;t++)i+=n=l(r=e[t]);var o=0,u=new Uint8Array(i);for(t=0;t<a;t++)(r=e[t])instanceof Uint8Array||(r="string"==typeof r?s(r):new Uint8Array(r)),n=r.byteLength,u.set(r,o),o+=n;return u},t.assert=a,t.bytesToString=function(e){a(null!==e&&"object"===(void 0===e?"undefined":g(e))&&void 0!==e.length,"Invalid argument for bytesToString");var t=e.length;if(t<8192)return String.fromCharCode.apply(null,e);for(var r=[],n=0;n<t;n+=8192){var i=Math.min(n+8192,t),o=e.subarray(n,i);r.push(String.fromCharCode.apply(null,o))}return r.join("")},t.createBlob=Q,t.createPromiseCapability=u,t.createObjectURL=K,t.deprecated=function(e){console.log("Deprecated API usage: "+e)},t.getLookupTableFactory=function(e){var t;return function(){return e&&(t=Object.create(null),e(t),e=null),t}},t.getVerbosityLevel=function(){return O},t.info=function(e){O>=x.infos&&console.log("Info: "+e)},t.isArrayBuffer=function(e){return"object"===(void 0===e?"undefined":g(e))&&null!==e&&void 0!==e.byteLength},t.isBool=function(e){return"boolean"==typeof e},t.isEmptyObj=function(e){for(var t in e)return!1;return!0},t.isNum=function(e){return"number"==typeof e},t.isString=function(e){return"string"==typeof e},t.isSpace=function(e){return 32===e||9===e||13===e||10===e},t.isNodeJS=function(){return"object"===("undefined"==typeof process?"undefined":g(process))&&process+""=="[object process]"},t.isSameOrigin=function(e,t){try{var r=new URL(e);if(!r.origin||"null"===r.origin)return!1}catch(e){return!1}var n=new URL(t,r);return r.origin===n.origin},t.createValidAbsoluteUrl=function(e,t){if(!e)return null;try{var r=t?new URL(e,t):new URL(e);if(o(r))return r}catch(e){}return null},t.isLittleEndian=function(){var e=new Uint8Array(4);return e[0]=1,1===new Uint32Array(e.buffer,0,1)[0]},t.isEvalSupported=function(){try{return new Function(""),!0}catch(e){return!1}},t.loadJpegStream=function(e,t,r){var i=new Image;i.onload=function(){r.resolve(e,i)},i.onerror=function(){r.resolve(e,null),n("Error during JPEG image loading")},i.src=t},t.log2=function(e){for(var t=1,r=0;e>t;)t<<=1,r++;return r},t.readInt8=function(e,t){return e[t]<<24>>24},t.readUint16=function(e,t){return e[t]<<8|e[t+1]},t.readUint32=function(e,t){return(e[t]<<24|e[t+1]<<16|e[t+2]<<8|e[t+3])>>>0},t.removeNullCharacters=function(e){return"string"!=typeof e?(n("The argument for removeNullCharacters must be a string."),e):e.replace(G,"")},t.ReadableStream=v.ReadableStream,t.setVerbosityLevel=function(e){O=e},t.shadow=function(e,t,r){return Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!1}),r},t.string32=function(e){return String.fromCharCode(e>>24&255,e>>16&255,e>>8&255,255&e)},t.stringToBytes=s,t.stringToPDFString=function(e){var t,r=e.length,n=[];if("þ"===e[0]&&"ÿ"===e[1])for(t=2;t<r;t+=2)n.push(String.fromCharCode(e.charCodeAt(t)<<8|e.charCodeAt(t+1)));else for(t=0;t<r;++t){var i=Y[e.charCodeAt(t)];n.push(i?String.fromCharCode(i):e.charAt(t))}return n.join("")},t.stringToUTF8String=function(e){return decodeURIComponent(escape(e))},t.utf8StringToString=function(e){return unescape(encodeURIComponent(e))},t.warn=n,t.unreachable=i},function(e,t,r){"use strict";var n=r(43)("wks"),i=r(11),a=r(2).Symbol,o="function"==typeof a;(e.exports=function(e){return n[e]||(n[e]=o&&a[e]||(o?a:i)("Symbol."+e))}).store=n},function(e,t,r){"use strict";var n=e.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=n)},function(e,t,r){"use strict";e.exports=!r(15)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},function(e,t,r){"use strict";var n=r(8),i=r(18);e.exports=r(3)?function(e,t,r){return n.f(e,t,i(1,r))}:function(e,t,r){return e[t]=r,e}},function(e,t,r){"use strict";var n={}.hasOwnProperty;e.exports=function(e,t){return n.call(e,t)}},function(e,t,r){"use strict";var n=r(12),i=Math.min;e.exports=function(e){return e>0?i(n(e),9007199254740991):0}},function(e,t,r){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e){var t=s.default.PDFJS;switch(e){case"pdfBug":return!!t&&t.pdfBug;case"disableAutoFetch":return!!t&&t.disableAutoFetch;case"disableStream":return!!t&&t.disableStream;case"disableRange":return!!t&&t.disableRange;case"disableFontFace":return!!t&&t.disableFontFace;case"disableCreateObjectURL":return!!t&&t.disableCreateObjectURL;case"disableWebGL":return!t||t.disableWebGL;case"cMapUrl":return t?t.cMapUrl:null;case"cMapPacked":return!!t&&t.cMapPacked;case"postMessageTransfers":return!t||t.postMessageTransfers;case"workerPort":return t?t.workerPort:null;case"workerSrc":return t?t.workerSrc:null;case"disableWorker":return!!t&&t.disableWorker;case"maxImageSize":return t?t.maxImageSize:-1;case"imageResourcesPath":return t?t.imageResourcesPath:"";case"isEvalSupported":return!t||t.isEvalSupported;case"externalLinkTarget":if(!t)return m.NONE;switch(t.externalLinkTarget){case m.NONE:case m.SELF:case m.BLANK:case m.PARENT:case m.TOP:return t.externalLinkTarget}return(0,o.warn)("PDFJS.externalLinkTarget is invalid: "+t.externalLinkTarget),t.externalLinkTarget=m.NONE,m.NONE;case"externalLinkRel":return t?t.externalLinkRel:l;case"enableStats":return!(!t||!t.enableStats);case"pdfjsNext":return!(!t||!t.pdfjsNext);default:throw new Error("Unknown default setting: "+e)}}Object.defineProperty(t,"__esModule",{value:!0}),t.DOMSVGFactory=t.DOMCMapReaderFactory=t.DOMCanvasFactory=t.DEFAULT_LINK_REL=t.getDefaultSetting=t.LinkTarget=t.getFilenameFromUrl=t.isValidUrl=t.isExternalLinkTargetSet=t.addLinkAttributes=t.RenderingCancelledException=t.CustomStyle=void 0;var a=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),o=r(0),s=function(e){return e&&e.__esModule?e:{default:e}}(r(9)),l="noopener noreferrer nofollow",u="http://www.w3.org/2000/svg",c=function(){function e(){n(this,e)}return a(e,[{key:"create",value:function(e,t){if(e<=0||t<=0)throw new Error("invalid canvas size");var r=document.createElement("canvas"),n=r.getContext("2d");return r.width=e,r.height=t,{canvas:r,context:n}}},{key:"reset",value:function(e,t,r){if(!e.canvas)throw new Error("canvas is not specified");if(t<=0||r<=0)throw new Error("invalid canvas size");e.canvas.width=t,e.canvas.height=r}},{key:"destroy",value:function(e){if(!e.canvas)throw new Error("canvas is not specified");e.canvas.width=0,e.canvas.height=0,e.canvas=null,e.context=null}}]),e}(),h=function(){function e(t){var r=t.baseUrl,i=void 0===r?null:r,a=t.isCompressed,o=void 0!==a&&a;n(this,e),this.baseUrl=i,this.isCompressed=o}return a(e,[{key:"fetch",value:function(e){var t=this,r=e.name;return r?new Promise(function(e,n){var i=t.baseUrl+r+(t.isCompressed?".bcmap":""),a=new XMLHttpRequest;a.open("GET",i,!0),t.isCompressed&&(a.responseType="arraybuffer"),a.onreadystatechange=function(){if(a.readyState===XMLHttpRequest.DONE){if(200===a.status||0===a.status){var r=void 0;if(t.isCompressed&&a.response?r=new Uint8Array(a.response):!t.isCompressed&&a.responseText&&(r=(0,o.stringToBytes)(a.responseText)),r)return void e({cMapData:r,compressionType:t.isCompressed?o.CMapCompressionType.BINARY:o.CMapCompressionType.NONE})}n(new Error("Unable to load "+(t.isCompressed?"binary ":"")+"CMap at: "+i))}},a.send(null)}):Promise.reject(new Error("CMap name must be specified."))}}]),e}(),d=function(){function e(){n(this,e)}return a(e,[{key:"create",value:function(e,t){(0,o.assert)(e>0&&t>0,"Invalid SVG dimensions");var r=document.createElementNS(u,"svg:svg");return r.setAttribute("version","1.1"),r.setAttribute("width",e+"px"),r.setAttribute("height",t+"px"),r.setAttribute("preserveAspectRatio","none"),r.setAttribute("viewBox","0 0 "+e+" "+t),r}},{key:"createElement",value:function(e){return(0,o.assert)("string"==typeof e,"Invalid SVG element type"),document.createElementNS(u,e)}}]),e}(),f=function(){function e(){}var t=["ms","Moz","Webkit","O"],r=Object.create(null);return e.getProp=function(e,n){if(1===arguments.length&&"string"==typeof r[e])return r[e];var i,a,o=(n=n||document.documentElement).style;if("string"==typeof o[e])return r[e]=e;a=e.charAt(0).toUpperCase()+e.slice(1);for(var s=0,l=t.length;s<l;s++)if(i=t[s]+a,"string"==typeof o[i])return r[e]=i;return r[e]="undefined"},e.setProp=function(e,t,r){var n=this.getProp(e);"undefined"!==n&&(t.style[n]=r)},e}(),p=function(){function e(e,t){this.message=e,this.type=t}return e.prototype=new Error,e.prototype.name="RenderingCancelledException",e.constructor=e,e}(),m={NONE:0,SELF:1,BLANK:2,PARENT:3,TOP:4},g=["","_self","_blank","_parent","_top"];t.CustomStyle=f,t.RenderingCancelledException=p,t.addLinkAttributes=function(e,t){var r=t&&t.url;if(e.href=e.title=r?(0,o.removeNullCharacters)(r):"",r){var n=t.target;void 0===n&&(n=i("externalLinkTarget")),e.target=g[n];var a=t.rel;void 0===a&&(a=i("externalLinkRel")),e.rel=a}},t.isExternalLinkTargetSet=function(){switch(i("externalLinkTarget")){case m.NONE:return!1;case m.SELF:case m.BLANK:case m.PARENT:case m.TOP:return!0}},t.isValidUrl=function(e,t){(0,o.deprecated)("isValidUrl(), please use createValidAbsoluteUrl() instead.");var r=t?"http://example.com":null;return null!==(0,o.createValidAbsoluteUrl)(e,r)},t.getFilenameFromUrl=function(e){var t=e.indexOf("#"),r=e.indexOf("?"),n=Math.min(t>0?t:e.length,r>0?r:e.length);return e.substring(e.lastIndexOf("/",n)+1,n)},t.LinkTarget=m,t.getDefaultSetting=i,t.DEFAULT_LINK_REL=l,t.DOMCanvasFactory=c,t.DOMCMapReaderFactory=h,t.DOMSVGFactory=d},function(e,t,r){"use strict";var n=r(17),i=r(31),a=r(22),o=Object.defineProperty;t.f=r(3)?Object.defineProperty:function(e,t,r){if(n(e),t=a(t,!0),n(r),i)try{return o(e,t,r)}catch(e){}if("get"in r||"set"in r)throw TypeError("Accessors not supported!");return"value"in r&&(e[t]=r.value),e}},function(e,t,r){"use strict";e.exports="undefined"!=typeof window&&window.Math===Math?window:"undefined"!=typeof global&&global.Math===Math?global:"undefined"!=typeof self&&self.Math===Math?self:{}},function(e,t,r){"use strict";var n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};e.exports=function(e){return"object"===(void 0===e?"undefined":n(e))?null!==e:"function"==typeof e}},function(e,t,r){"use strict";var n=0,i=Math.random();e.exports=function(e){return"Symbol(".concat(void 0===e?"":e,")_",(++n+i).toString(36))}},function(e,t,r){"use strict";var n=Math.ceil,i=Math.floor;e.exports=function(e){return isNaN(e=+e)?0:(e>0?i:n)(e)}},function(e,t,r){"use strict";var n=r(41);e.exports=function(e){return Object(n(e))}},function(e,t,r){"use strict";e.exports={}},function(e,t,r){"use strict";e.exports=function(e){try{return!!e()}catch(e){return!0}}},function(e,t,r){"use strict";var n=e.exports={version:"2.5.1"};"number"==typeof __e&&(__e=n)},function(e,t,r){"use strict";var n=r(10);e.exports=function(e){if(!n(e))throw TypeError(e+" is not an object!");return e}},function(e,t,r){"use strict";e.exports=function(e,t){return{enumerable:!(1&e),configurable:!(2&e),writable:!(4&e),value:t}}},function(e,t,r){"use strict";var n=r(40),i=r(41);e.exports=function(e){return n(i(e))}},function(e,t,r){"use strict";var n=r(12),i=Math.max,a=Math.min;e.exports=function(e,t){return(e=n(e))<0?i(e+t,0):a(e,t)}},function(e,t,r){"use strict";e.exports=!1},function(e,t,r){"use strict";var n=r(10);e.exports=function(e,t){if(!n(e))return e;var r,i;if(t&&"function"==typeof(r=e.toString)&&!n(i=r.call(e)))return i;if("function"==typeof(r=e.valueOf)&&!n(i=r.call(e)))return i;if(!t&&"function"==typeof(r=e.toString)&&!n(i=r.call(e)))return i;throw TypeError("Can't convert object to primitive value")}},function(e,t,r){"use strict";var n=r(2),i=r(4),a=r(5),o=r(11)("src"),s=Function.toString,l=(""+s).split("toString");r(16).inspectSource=function(e){return s.call(e)},(e.exports=function(e,t,r,s){var u="function"==typeof r;u&&(a(r,"name")||i(r,"name",t)),e[t]!==r&&(u&&(a(r,o)||i(r,o,e[t]?""+e[t]:l.join(String(t)))),e===n?e[t]=r:s?e[t]?e[t]=r:i(e,t,r):(delete e[t],i(e,t,r)))})(Function.prototype,"toString",function(){return"function"==typeof this&&this[o]||s.call(this)})},function(e,t,r){"use strict";var n=r(33);e.exports=function(e,t,r){if(n(e),void 0===t)return e;switch(r){case 1:return function(r){return e.call(t,r)};case 2:return function(r,n){return e.call(t,r,n)};case 3:return function(r,n,i){return e.call(t,r,n,i)}}return function(){return e.apply(t,arguments)}}},function(e,t,r){"use strict";var n={}.toString;e.exports=function(e){return n.call(e).slice(8,-1)}},function(e,t,r){"use strict";var n=r(43)("keys"),i=r(11);e.exports=function(e){return n[e]||(n[e]=i(e))}},function(e,t,r){"use strict";e.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},function(e,t,r){"use strict";var n=r(8).f,i=r(5),a=r(1)("toStringTag");e.exports=function(e,t,r){e&&!i(e=r?e:e.prototype,a)&&n(e,a,{configurable:!0,value:t})}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.validateResponseStatus=t.validateRangeRequestCapabilities=t.createResponseStatusError=void 0;var n=r(0);t.createResponseStatusError=function(e,t){return 404===e||0===e&&/^file:/.test(t)?new n.MissingPDFException('Missing PDF "'+t+'".'):new n.UnexpectedResponseException("Unexpected server response ("+e+') while retrieving PDF "'+t+'".',e)},t.validateRangeRequestCapabilities=function(e){var t=e.getResponseHeader,r=e.isHttp,i=e.rangeChunkSize,a=e.disableRange;(0,n.assert)(i>0);var o={allowRangeRequests:!1,suggestedLength:void 0};if(a||!r)return o;if("bytes"!==t("Accept-Ranges"))return o;if("identity"!==(t("Content-Encoding")||"identity"))return o;var s=parseInt(t("Content-Length"),10);return Number.isInteger(s)?(o.suggestedLength=s,s<=2*i?o:(o.allowRangeRequests=!0,o)):o},t.validateResponseStatus=function(e){return 200===e||206===e}},function(e,t,r){"use strict";var n=r(2),i=r(16),a=r(4),o=r(23),s=r(24),l=function e(t,r,l){var u,c,h,d,f=t&e.F,p=t&e.G,m=t&e.S,g=t&e.P,v=t&e.B,b=p?n:m?n[r]||(n[r]={}):(n[r]||{}).prototype,_=p?i:i[r]||(i[r]={}),y=_.prototype||(_.prototype={});p&&(l=r);for(u in l)h=((c=!f&&b&&void 0!==b[u])?b:l)[u],d=v&&c?s(h,n):g&&"function"==typeof h?s(Function.call,h):h,b&&o(b,u,h,t&e.U),_[u]!=h&&a(_,u,d),g&&y[u]!=h&&(y[u]=h)};n.core=i,l.F=1,l.G=2,l.S=4,l.P=8,l.B=16,l.W=32,l.U=64,l.R=128,e.exports=l},function(e,t,r){"use strict";e.exports=!r(3)&&!r(15)(function(){return 7!=Object.defineProperty(r(32)("div"),"a",{get:function(){return 7}}).a})},function(e,t,r){"use strict";var n=r(10),i=r(2).document,a=n(i)&&n(i.createElement);e.exports=function(e){return a?i.createElement(e):{}}},function(e,t,r){"use strict";e.exports=function(e){if("function"!=typeof e)throw TypeError(e+" is not a function!");return e}},function(e,t,r){"use strict";for(var n,i=r(2),a=r(4),o=r(11),s=o("typed_array"),l=o("view"),u=!(!i.ArrayBuffer||!i.DataView),c=u,h=0,d="Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array".split(",");h<9;)(n=i[d[h++]])?(a(n.prototype,s,!0),a(n.prototype,l,!0)):c=!1;e.exports={ABV:u,CONSTR:c,TYPED:s,VIEW:l}},function(e,t,r){"use strict";var n=r(23);e.exports=function(e,t,r){for(var i in t)n(e,i,t[i],r);return e}},function(e,t,r){"use strict";e.exports=function(e,t,r,n){if(!(e instanceof t)||void 0!==n&&n in e)throw TypeError(r+": incorrect invocation!");return e}},function(e,t,r){"use strict";var n=r(12),i=r(6);e.exports=function(e){if(void 0===e)return 0;var t=n(e),r=i(t);if(t!==r)throw RangeError("Wrong length!");return r}},function(e,t,r){"use strict";var n=r(39),i=r(27).concat("length","prototype");t.f=Object.getOwnPropertyNames||function(e){return n(e,i)}},function(e,t,r){"use strict";var n=r(5),i=r(19),a=r(42)(!1),o=r(26)("IE_PROTO");e.exports=function(e,t){var r,s=i(e),l=0,u=[];for(r in s)r!=o&&n(s,r)&&u.push(r);for(;t.length>l;)n(s,r=t[l++])&&(~a(u,r)||u.push(r));return u}},function(e,t,r){"use strict";var n=r(25);e.exports=Object("z").propertyIsEnumerable(0)?Object:function(e){return"String"==n(e)?e.split(""):Object(e)}},function(e,t,r){"use strict";e.exports=function(e){if(void 0==e)throw TypeError("Can't call method on  "+e);return e}},function(e,t,r){"use strict";var n=r(19),i=r(6),a=r(20);e.exports=function(e){return function(t,r,o){var s,l=n(t),u=i(l.length),c=a(o,u);if(e&&r!=r){for(;u>c;)if((s=l[c++])!=s)return!0}else for(;u>c;c++)if((e||c in l)&&l[c]===r)return e||c||0;return!e&&-1}}},function(e,t,r){"use strict";var n=r(2),i=n["__core-js_shared__"]||(n["__core-js_shared__"]={});e.exports=function(e){return i[e]||(i[e]={})}},function(e,t,r){"use strict";var n=r(13),i=r(20),a=r(6);e.exports=function(e){for(var t=n(this),r=a(t.length),o=arguments.length,s=i(o>1?arguments[1]:void 0,r),l=o>2?arguments[2]:void 0,u=void 0===l?r:i(l,r);u>s;)t[s++]=e;return t}},function(e,t,r){"use strict";var n=r(25),i=r(1)("toStringTag"),a="Arguments"==n(function(){return arguments}()),o=function(e,t){try{return e[t]}catch(e){}};e.exports=function(e){var t,r,s;return void 0===e?"Undefined":null===e?"Null":"string"==typeof(r=o(t=Object(e),i))?r:a?n(t):"Object"==(s=n(t))&&"function"==typeof t.callee?"Arguments":s}},function(e,t,r){"use strict";var n=r(17),i=r(61),a=r(27),o=r(26)("IE_PROTO"),s=function(){},l=function(){var e,t=r(32)("iframe"),n=a.length;for(t.style.display="none",r(63).appendChild(t),t.src="javascript:",(e=t.contentWindow.document).open(),e.write("<script>document.F=Object<\/script>"),e.close(),l=e.F;n--;)delete l.prototype[a[n]];return l()};e.exports=Object.create||function(e,t){var r;return null!==e?(s.prototype=n(e),r=new s,s.prototype=null,r[o]=e):r=l(),void 0===t?r:i(r,t)}},function(e,t,r){"use strict";var n=r(5),i=r(13),a=r(26)("IE_PROTO"),o=Object.prototype;e.exports=Object.getPrototypeOf||function(e){return e=i(e),n(e,a)?e[a]:"function"==typeof e.constructor&&e instanceof e.constructor?e.constructor.prototype:e instanceof Object?o:null}},function(e,t,r){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t,r,n){return e.destroyed?Promise.reject(new Error("Worker was destroyed")):(t.disableAutoFetch=(0,u.getDefaultSetting)("disableAutoFetch"),t.disableStream=(0,u.getDefaultSetting)("disableStream"),t.chunkedViewerLoading=!!r,r&&(t.length=r.length,t.initialData=r.initialData),e.messageHandler.sendWithPromise("GetDocRequest",{docId:n,source:{data:t.data,url:t.url,password:t.password,disableAutoFetch:t.disableAutoFetch,rangeChunkSize:t.rangeChunkSize,length:t.length},maxImageSize:(0,u.getDefaultSetting)("maxImageSize"),disableFontFace:(0,u.getDefaultSetting)("disableFontFace"),disableCreateObjectURL:(0,u.getDefaultSetting)("disableCreateObjectURL"),postMessageTransfers:(0,u.getDefaultSetting)("postMessageTransfers")&&!v,docBaseUrl:t.docBaseUrl,nativeImageDecoderSupport:t.nativeImageDecoderSupport,ignoreErrors:t.ignoreErrors,isEvalSupported:(0,u.getDefaultSetting)("isEvalSupported")}).then(function(t){if(e.destroyed)throw new Error("Worker was destroyed");return t}))}Object.defineProperty(t,"__esModule",{value:!0}),t.build=t.version=t._UnsupportedManager=t.setPDFNetworkStreamClass=t.PDFPageProxy=t.PDFDocumentProxy=t.PDFWorker=t.PDFDataRangeTransport=t.LoopbackPort=t.getDocument=void 0;var a,o=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},l=r(0),u=r(7),c=r(83),h=r(84),d=function(e){return e&&e.__esModule?e:{default:e}}(r(9)),f=r(50),p=r(86),m=65536,g=!1,v=!1,b="undefined"!=typeof document&&document.currentScript?document.currentScript.src:null,_=null,y=!1;"undefined"==typeof window?(g=!0,void 0===require.ensure&&(require.ensure=require("node-ensure")),y=!0):"undefined"!=typeof require&&"function"==typeof require.ensure&&(y=!0),"undefined"!=typeof requirejs&&requirejs.toUrl&&(a=requirejs.toUrl("pdfjs-dist/build/pdf.worker.js"));var A="undefined"!=typeof requirejs&&requirejs.load;_=y?function(e){require.ensure([],function(){var t;t=require("./pdf.worker.js"),e(t.WorkerMessageHandler)})}:A?function(e){requirejs(["pdfjs-dist/build/pdf.worker"],function(t){e(t.WorkerMessageHandler)})}:null;var S,w=function(){function e(){this._capability=(0,l.createPromiseCapability)(),this._transport=null,this._worker=null,this.docId="d"+t++,this.destroyed=!1,this.onPassword=null,this.onProgress=null,this.onUnsupportedFeature=null}var t=0;return e.prototype={get promise(){return this._capability.promise},destroy:function(){var e=this;return this.destroyed=!0,(this._transport?this._transport.destroy():Promise.resolve()).then(function(){e._transport=null,e._worker&&(e._worker.destroy(),e._worker=null)})},then:function(e,t){return this.promise.then.apply(this.promise,arguments)}},e}(),P=function(){function e(e,t){this.length=e,this.initialData=t,this._rangeListeners=[],this._progressListeners=[],this._progressiveReadListeners=[],this._readyCapability=(0,l.createPromiseCapability)()}return e.prototype={addRangeListener:function(e){this._rangeListeners.push(e)},addProgressListener:function(e){this._progressListeners.push(e)},addProgressiveReadListener:function(e){this._progressiveReadListeners.push(e)},onDataRange:function(e,t){for(var r=this._rangeListeners,n=0,i=r.length;n<i;++n)r[n](e,t)},onDataProgress:function(e){var t=this;this._readyCapability.promise.then(function(){for(var r=t._progressListeners,n=0,i=r.length;n<i;++n)r[n](e)})},onDataProgressiveRead:function(e){var t=this;this._readyCapability.promise.then(function(){for(var r=t._progressiveReadListeners,n=0,i=r.length;n<i;++n)r[n](e)})},transportReady:function(){this._readyCapability.resolve()},requestDataRange:function(e,t){throw new Error("Abstract method PDFDataRangeTransport.requestDataRange")},abort:function(){}},e}(),R=function(){function e(e,t,r){this.pdfInfo=e,this.transport=t,this.loadingTask=r}return e.prototype={get numPages(){return this.pdfInfo.numPages},get fingerprint(){return this.pdfInfo.fingerprint},getPage:function(e){return this.transport.getPage(e)},getPageIndex:function(e){return this.transport.getPageIndex(e)},getDestinations:function(){return this.transport.getDestinations()},getDestination:function(e){return this.transport.getDestination(e)},getPageLabels:function(){return this.transport.getPageLabels()},getPageMode:function(){return this.transport.getPageMode()},getAttachments:function(){return this.transport.getAttachments()},getJavaScript:function(){return this.transport.getJavaScript()},getOutline:function(){return this.transport.getOutline()},getMetadata:function(){return this.transport.getMetadata()},getData:function(){return this.transport.getData()},getDownloadInfo:function(){return this.transport.downloadInfoCapability.promise},getStats:function(){return this.transport.getStats()},cleanup:function(){this.transport.startCleanup()},destroy:function(){return this.loadingTask.destroy()}},e}(),C=function(){function e(e,t,r){this.pageIndex=e,this.pageInfo=t,this.transport=r,this.stats=new l.StatTimer,this.stats.enabled=(0,u.getDefaultSetting)("enableStats"),this.commonObjs=r.commonObjs,this.objs=new E,this.cleanupAfterRender=!1,this.pendingCleanup=!1,this.intentStates=Object.create(null),this.destroyed=!1}return e.prototype={get pageNumber(){return this.pageIndex+1},get rotate(){return this.pageInfo.rotate},get ref(){return this.pageInfo.ref},get userUnit(){return this.pageInfo.userUnit},get view(){return this.pageInfo.view},getViewport:function(e,t){return arguments.length<2&&(t=this.rotate),new l.PageViewport(this.view,e,t,0,0)},getAnnotations:function(e){var t=e&&e.intent||null;return this.annotationsPromise&&this.annotationsIntent===t||(this.annotationsPromise=this.transport.getAnnotations(this.pageIndex,t),this.annotationsIntent=t),this.annotationsPromise},render:function(e){var t=this,r=this.stats;r.time("Overall"),this.pendingCleanup=!1;var n="print"===e.intent?"print":"display",i=e.canvasFactory||new u.DOMCanvasFactory;this.intentStates[n]||(this.intentStates[n]=Object.create(null));var a=this.intentStates[n];a.displayReadyCapability||(a.receivingOperatorList=!0,a.displayReadyCapability=(0,l.createPromiseCapability)(),a.operatorList={fnArray:[],argsArray:[],lastChunk:!1},this.stats.time("Page Request"),this.transport.messageHandler.send("RenderPageRequest",{pageIndex:this.pageNumber-1,intent:n,renderInteractiveForms:!0===e.renderInteractiveForms}));var o=function(e){var n=a.renderTasks.indexOf(s);n>=0&&a.renderTasks.splice(n,1),t.cleanupAfterRender&&(t.pendingCleanup=!0),t._tryCleanup(),e?s.capability.reject(e):s.capability.resolve(),r.timeEnd("Rendering"),r.timeEnd("Overall")},s=new I(o,e,this.objs,this.commonObjs,a.operatorList,this.pageNumber,i);s.useRequestAnimationFrame="print"!==n,a.renderTasks||(a.renderTasks=[]),a.renderTasks.push(s);var c=s.task;return e.continueCallback&&((0,l.deprecated)("render is used with continueCallback parameter"),c.onContinue=e.continueCallback),a.displayReadyCapability.promise.then(function(e){t.pendingCleanup?o():(r.time("Rendering"),s.initializeGraphics(e),s.operatorListChanged())}).catch(o),c},getOperatorList:function(){this.intentStates.oplist||(this.intentStates.oplist=Object.create(null));var e,t=this.intentStates.oplist;return t.opListReadCapability||((e={}).operatorListChanged=function(){if(t.operatorList.lastChunk){t.opListReadCapability.resolve(t.operatorList);var r=t.renderTasks.indexOf(e);r>=0&&t.renderTasks.splice(r,1)}},t.receivingOperatorList=!0,t.opListReadCapability=(0,l.createPromiseCapability)(),t.renderTasks=[],t.renderTasks.push(e),t.operatorList={fnArray:[],argsArray:[],lastChunk:!1},this.transport.messageHandler.send("RenderPageRequest",{pageIndex:this.pageIndex,intent:"oplist"})),t.opListReadCapability.promise},streamTextContent:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return this.transport.messageHandler.sendWithStream("GetTextContent",{pageIndex:this.pageNumber-1,normalizeWhitespace:!0===e.normalizeWhitespace,combineTextItems:!0!==e.disableCombineTextItems},{highWaterMark:100,size:function(e){return e.items.length}})},getTextContent:function(e){e=e||{};var t=this.streamTextContent(e);return new Promise(function(e,r){function n(){i.read().then(function(t){var r=t.value;t.done?e(a):(l.Util.extendObj(a.styles,r.styles),l.Util.appendToArray(a.items,r.items),n())},r)}var i=t.getReader(),a={items:[],styles:Object.create(null)};n()})},_destroy:function(){this.destroyed=!0,this.transport.pageCache[this.pageIndex]=null;var e=[];return Object.keys(this.intentStates).forEach(function(t){"oplist"!==t&&this.intentStates[t].renderTasks.forEach(function(t){var r=t.capability.promise.catch(function(){});e.push(r),t.cancel()})},this),this.objs.clear(),this.annotationsPromise=null,this.pendingCleanup=!1,Promise.all(e)},destroy:function(){(0,l.deprecated)("page destroy method, use cleanup() instead"),this.cleanup()},cleanup:function(){this.pendingCleanup=!0,this._tryCleanup()},_tryCleanup:function(){this.pendingCleanup&&!Object.keys(this.intentStates).some(function(e){var t=this.intentStates[e];return 0!==t.renderTasks.length||t.receivingOperatorList},this)&&(Object.keys(this.intentStates).forEach(function(e){delete this.intentStates[e]},this),this.objs.clear(),this.annotationsPromise=null,this.pendingCleanup=!1)},_startRenderPage:function(e,t){var r=this.intentStates[t];r.displayReadyCapability&&r.displayReadyCapability.resolve(e)},_renderPageChunk:function(e,t){var r,n,i=this.intentStates[t];for(r=0,n=e.length;r<n;r++)i.operatorList.fnArray.push(e.fnArray[r]),i.operatorList.argsArray.push(e.argsArray[r]);for(i.operatorList.lastChunk=e.lastChunk,r=0;r<i.renderTasks.length;r++)i.renderTasks[r].operatorListChanged();e.lastChunk&&(i.receivingOperatorList=!1,this._tryCleanup())}},e}(),k=function(){function e(t){n(this,e),this._listeners=[],this._defer=t,this._deferred=Promise.resolve(void 0)}return o(e,[{key:"postMessage",value:function(e,t){function r(e){if("object"!==(void 0===e?"undefined":s(e))||null===e)return e;if(i.has(e))return i.get(e);var n,a;if((a=e.buffer)&&(0,l.isArrayBuffer)(a)){var o=t&&t.indexOf(a)>=0;return n=e===a?e:o?new e.constructor(a,e.byteOffset,e.byteLength):new e.constructor(e),i.set(e,n),n}n=Array.isArray(e)?[]:{},i.set(e,n);for(var u in e){for(var c,h=e;!(c=Object.getOwnPropertyDescriptor(h,u));)h=Object.getPrototypeOf(h);void 0!==c.value&&"function"!=typeof c.value&&(n[u]=r(c.value))}return n}var n=this;if(this._defer){var i=new WeakMap,a={data:r(e)};this._deferred.then(function(){n._listeners.forEach(function(e){e.call(this,a)},n)})}else this._listeners.forEach(function(t){t.call(this,{data:e})},this)}},{key:"addEventListener",value:function(e,t){this._listeners.push(t)}},{key:"removeEventListener",value:function(e,t){var r=this._listeners.indexOf(t);this._listeners.splice(r,1)}},{key:"terminate",value:function(){this._listeners=[]}}]),e}(),x=function(){function e(){if(void 0!==a)return a;if((0,u.getDefaultSetting)("workerSrc"))return(0,u.getDefaultSetting)("workerSrc");if(b)return b.replace(/(\.(?:min\.)?js)(\?.*)?$/i,".worker$1$2");throw new Error("No PDFJS.workerSrc specified")}function t(){return o?o.promise:(o=(0,l.createPromiseCapability)(),(_||function(t){l.Util.loadScript(e(),function(){t(window.pdfjsDistBuildPdfWorker.WorkerMessageHandler)})})(o.resolve),o.promise)}function r(e){var t="importScripts('"+e+"');";return URL.createObjectURL(new Blob([t]))}function n(e,t){if(t&&s.has(t))throw new Error("Cannot use more than one PDFWorker per port");if(this.name=e,this.destroyed=!1,this.postMessageTransfers=!0,this._readyCapability=(0,l.createPromiseCapability)(),this._port=null,this._webWorker=null,this._messageHandler=null,t)return s.set(t,this),void this._initializeFromPort(t);this._initialize()}var i=0,o=void 0,s=new WeakMap;return n.prototype={get promise(){return this._readyCapability.promise},get port(){return this._port},get messageHandler(){return this._messageHandler},_initializeFromPort:function(e){this._port=e,this._messageHandler=new l.MessageHandler("main","worker",e),this._messageHandler.on("ready",function(){}),this._readyCapability.resolve()},_initialize:function(){var t=this;if(!g&&!(0,u.getDefaultSetting)("disableWorker")&&"undefined"!=typeof Worker){var n=e();try{(0,l.isSameOrigin)(window.location.href,n)||(n=r(new URL(n,window.location).href));var i=new Worker(n),a=new l.MessageHandler("main","worker",i),o=function(){i.removeEventListener("error",s),a.destroy(),i.terminate(),t.destroyed?t._readyCapability.reject(new Error("Worker was destroyed")):t._setupFakeWorker()},s=function(){t._webWorker||o()};i.addEventListener("error",s),a.on("test",function(e){i.removeEventListener("error",s),t.destroyed?o():e&&e.supportTypedArray?(t._messageHandler=a,t._port=i,t._webWorker=i,e.supportTransfers||(t.postMessageTransfers=!1,v=!0),t._readyCapability.resolve(),a.send("configure",{verbosity:(0,l.getVerbosityLevel)()})):(t._setupFakeWorker(),a.destroy(),i.terminate())}),a.on("console_log",function(e){console.log.apply(console,e)}),a.on("console_error",function(e){console.error.apply(console,e)}),a.on("ready",function(e){if(i.removeEventListener("error",s),t.destroyed)o();else try{c()}catch(e){t._setupFakeWorker()}});var c=function(){var e=(0,u.getDefaultSetting)("postMessageTransfers")&&!v,t=new Uint8Array([e?255:0]);try{a.send("test",t,[t.buffer])}catch(e){(0,l.info)("Cannot use postMessage transfers"),t[0]=0,a.send("test",t)}};return void c()}catch(e){(0,l.info)("The worker has been disabled.")}}this._setupFakeWorker()},_setupFakeWorker:function(){var e=this;g||(0,u.getDefaultSetting)("disableWorker")||((0,l.warn)("Setting up fake worker."),g=!0),t().then(function(t){if(e.destroyed)e._readyCapability.reject(new Error("Worker was destroyed"));else{var r=Uint8Array!==Float32Array,n=new k(r);e._port=n;var a="fake"+i++,o=new l.MessageHandler(a+"_worker",a,n);t.setup(o,n);var s=new l.MessageHandler(a,a+"_worker",n);e._messageHandler=s,e._readyCapability.resolve()}})},destroy:function(){this.destroyed=!0,this._webWorker&&(this._webWorker.terminate(),this._webWorker=null),s.delete(this._port),this._port=null,this._messageHandler&&(this._messageHandler.destroy(),this._messageHandler=null)}},n.fromPort=function(e){return s.has(e)?s.get(e):new n(null,e)},n}(),T=function(){function e(e,t,r,n){this.messageHandler=e,this.loadingTask=t,this.commonObjs=new E,this.fontLoader=new c.FontLoader(t.docId),this.CMapReaderFactory=new n({baseUrl:(0,u.getDefaultSetting)("cMapUrl"),isCompressed:(0,u.getDefaultSetting)("cMapPacked")}),this.destroyed=!1,this.destroyCapability=null,this._passwordCapability=null,this._networkStream=r,this._fullReader=null,this._lastProgress=null,this.pageCache=[],this.pagePromises=[],this.downloadInfoCapability=(0,l.createPromiseCapability)(),this.setupMessageHandler()}return e.prototype={destroy:function(){var e=this;if(this.destroyCapability)return this.destroyCapability.promise;this.destroyed=!0,this.destroyCapability=(0,l.createPromiseCapability)(),this._passwordCapability&&this._passwordCapability.reject(new Error("Worker was destroyed during onPassword callback"));var t=[];this.pageCache.forEach(function(e){e&&t.push(e._destroy())}),this.pageCache=[],this.pagePromises=[];var r=this.messageHandler.sendWithPromise("Terminate",null);return t.push(r),Promise.all(t).then(function(){e.fontLoader.clear(),e._networkStream&&e._networkStream.cancelAllRequests(),e.messageHandler&&(e.messageHandler.destroy(),e.messageHandler=null),e.destroyCapability.resolve()},this.destroyCapability.reject),this.destroyCapability.promise},setupMessageHandler:function(){var e=this.messageHandler,t=this.loadingTask;e.on("GetReader",function(e,t){var r=this;(0,l.assert)(this._networkStream),this._fullReader=this._networkStream.getFullReader(),this._fullReader.onProgress=function(e){r._lastProgress={loaded:e.loaded,total:e.total}},t.onPull=function(){r._fullReader.read().then(function(e){var r=e.value;e.done?t.close():((0,l.assert)((0,l.isArrayBuffer)(r)),t.enqueue(new Uint8Array(r),1,[r]))}).catch(function(e){t.error(e)})},t.onCancel=function(e){r._fullReader.cancel(e)}},this),e.on("ReaderHeadersReady",function(e){var t=this,r=(0,l.createPromiseCapability)(),n=this._fullReader;return n.headersReady.then(function(){if(!n.isStreamingSupported||!n.isRangeSupported){if(t._lastProgress){var e=t.loadingTask;e.onProgress&&e.onProgress(t._lastProgress)}n.onProgress=function(e){var r=t.loadingTask;r.onProgress&&r.onProgress({loaded:e.loaded,total:e.total})}}r.resolve({isStreamingSupported:n.isStreamingSupported,isRangeSupported:n.isRangeSupported,contentLength:n.contentLength})},r.reject),r.promise},this),e.on("GetRangeReader",function(e,t){(0,l.assert)(this._networkStream);var r=this._networkStream.getRangeReader(e.begin,e.end);t.onPull=function(){r.read().then(function(e){var r=e.value;e.done?t.close():((0,l.assert)((0,l.isArrayBuffer)(r)),t.enqueue(new Uint8Array(r),1,[r]))}).catch(function(e){t.error(e)})},t.onCancel=function(e){r.cancel(e)}},this),e.on("GetDoc",function(e){var t=e.pdfInfo;this.numPages=e.pdfInfo.numPages;var r=this.loadingTask,n=new R(t,this,r);this.pdfDocument=n,r._capability.resolve(n)},this),e.on("PasswordRequest",function(e){var r=this;if(this._passwordCapability=(0,l.createPromiseCapability)(),t.onPassword){var n=function(e){r._passwordCapability.resolve({password:e})};t.onPassword(n,e.code)}else this._passwordCapability.reject(new l.PasswordException(e.message,e.code));return this._passwordCapability.promise},this),e.on("PasswordException",function(e){t._capability.reject(new l.PasswordException(e.message,e.code))},this),e.on("InvalidPDF",function(e){this.loadingTask._capability.reject(new l.InvalidPDFException(e.message))},this),e.on("MissingPDF",function(e){this.loadingTask._capability.reject(new l.MissingPDFException(e.message))},this),e.on("UnexpectedResponse",function(e){this.loadingTask._capability.reject(new l.UnexpectedResponseException(e.message,e.status))},this),e.on("UnknownError",function(e){this.loadingTask._capability.reject(new l.UnknownErrorException(e.message,e.details))},this),e.on("DataLoaded",function(e){this.downloadInfoCapability.resolve(e)},this),e.on("PDFManagerReady",function(e){},this),e.on("StartRenderPage",function(e){if(!this.destroyed){var t=this.pageCache[e.pageIndex];t.stats.timeEnd("Page Request"),t._startRenderPage(e.transparency,e.intent)}},this),e.on("RenderPageChunk",function(e){this.destroyed||this.pageCache[e.pageIndex]._renderPageChunk(e.operatorList,e.intent)},this),e.on("commonobj",function(e){var t=this;if(!this.destroyed){var r=e[0],n=e[1];if(!this.commonObjs.hasData(r))switch(n){case"Font":var i=e[2];if("error"in i){var a=i.error;(0,l.warn)("Error during font loading: "+a),this.commonObjs.resolve(r,a);break}var o=null;(0,u.getDefaultSetting)("pdfBug")&&d.default.FontInspector&&d.default.FontInspector.enabled&&(o={registerFont:function(e,t){d.default.FontInspector.fontAdded(e,t)}});var s=new c.FontFaceObject(i,{isEvalSuported:(0,u.getDefaultSetting)("isEvalSupported"),disableFontFace:(0,u.getDefaultSetting)("disableFontFace"),fontRegistry:o}),h=function(e){t.commonObjs.resolve(r,s)};this.fontLoader.bind([s],h);break;case"FontPath":this.commonObjs.resolve(r,e[2]);break;default:throw new Error("Got unknown common object type "+n)}}},this),e.on("obj",function(e){if(!this.destroyed){var t,r=e[0],n=e[1],i=e[2],a=this.pageCache[n];if(!a.objs.hasData(r))switch(i){case"JpegStream":t=e[3],(0,l.loadJpegStream)(r,t,a.objs);break;case"Image":t=e[3],a.objs.resolve(r,t);t&&"data"in t&&t.data.length>8e6&&(a.cleanupAfterRender=!0);break;default:throw new Error("Got unknown object type "+i)}}},this),e.on("DocProgress",function(e){if(!this.destroyed){var t=this.loadingTask;t.onProgress&&t.onProgress({loaded:e.loaded,total:e.total})}},this),e.on("PageError",function(e){if(!this.destroyed){var t=this.pageCache[e.pageNum-1].intentStates[e.intent];if(!t.displayReadyCapability)throw new Error(e.error);if(t.displayReadyCapability.reject(e.error),t.operatorList){t.operatorList.lastChunk=!0;for(var r=0;r<t.renderTasks.length;r++)t.renderTasks[r].operatorListChanged()}}},this),e.on("UnsupportedFeature",function(e){if(!this.destroyed){var t=e.featureId,r=this.loadingTask;r.onUnsupportedFeature&&r.onUnsupportedFeature(t),L.notify(t)}},this),e.on("JpegDecode",function(e){if(this.destroyed)return Promise.reject(new Error("Worker was destroyed"));if("undefined"==typeof document)return Promise.reject(new Error('"document" is not defined.'));var t=e[0],r=e[1];return 3!==r&&1!==r?Promise.reject(new Error("Only 3 components or 1 component can be returned")):new Promise(function(e,n){var i=new Image;i.onload=function(){var t=i.width,n=i.height,a=t*n,o=4*a,s=new Uint8Array(a*r),l=document.createElement("canvas");l.width=t,l.height=n;var u=l.getContext("2d");u.drawImage(i,0,0);var c,h,d=u.getImageData(0,0,t,n).data;if(3===r)for(c=0,h=0;c<o;c+=4,h+=3)s[h]=d[c],s[h+1]=d[c+1],s[h+2]=d[c+2];else if(1===r)for(c=0,h=0;c<o;c+=4,h++)s[h]=d[c];e({data:s,width:t,height:n})},i.onerror=function(){n(new Error("JpegDecode failed to load image"))},i.src=t})},this),e.on("FetchBuiltInCMap",function(e){return this.destroyed?Promise.reject(new Error("Worker was destroyed")):this.CMapReaderFactory.fetch({name:e.name})},this)},getData:function(){return this.messageHandler.sendWithPromise("GetData",null)},getPage:function(e,t){var r=this;if(!Number.isInteger(e)||e<=0||e>this.numPages)return Promise.reject(new Error("Invalid page request"));var n=e-1;if(n in this.pagePromises)return this.pagePromises[n];var i=this.messageHandler.sendWithPromise("GetPage",{pageIndex:n}).then(function(e){if(r.destroyed)throw new Error("Transport destroyed");var t=new C(n,e,r);return r.pageCache[n]=t,t});return this.pagePromises[n]=i,i},getPageIndex:function(e){return this.messageHandler.sendWithPromise("GetPageIndex",{ref:e}).catch(function(e){return Promise.reject(new Error(e))})},getAnnotations:function(e,t){return this.messageHandler.sendWithPromise("GetAnnotations",{pageIndex:e,intent:t})},getDestinations:function(){return this.messageHandler.sendWithPromise("GetDestinations",null)},getDestination:function(e){return this.messageHandler.sendWithPromise("GetDestination",{id:e})},getPageLabels:function(){return this.messageHandler.sendWithPromise("GetPageLabels",null)},getPageMode:function(){return this.messageHandler.sendWithPromise("GetPageMode",null)},getAttachments:function(){return this.messageHandler.sendWithPromise("GetAttachments",null)},getJavaScript:function(){return this.messageHandler.sendWithPromise("GetJavaScript",null)},getOutline:function(){return this.messageHandler.sendWithPromise("GetOutline",null)},getMetadata:function(){return this.messageHandler.sendWithPromise("GetMetadata",null).then(function(e){return{info:e[0],metadata:e[1]?new f.Metadata(e[1]):null}})},getStats:function(){return this.messageHandler.sendWithPromise("GetStats",null)},startCleanup:function(){var e=this;this.messageHandler.sendWithPromise("Cleanup",null).then(function(){for(var t=0,r=e.pageCache.length;t<r;t++){var n=e.pageCache[t];n&&n.cleanup()}e.commonObjs.clear(),e.fontLoader.clear()})}},e}(),E=function(){function e(){this.objs=Object.create(null)}return e.prototype={ensureObj:function(e){if(this.objs[e])return this.objs[e];var t={capability:(0,l.createPromiseCapability)(),data:null,resolved:!1};return this.objs[e]=t,t},get:function(e,t){if(t)return this.ensureObj(e).capability.promise.then(t),null;var r=this.objs[e];if(!r||!r.resolved)throw new Error("Requesting object that isn't resolved yet "+e);return r.data},resolve:function(e,t){var r=this.ensureObj(e);r.resolved=!0,r.data=t,r.capability.resolve(t)},isResolved:function(e){var t=this.objs;return!!t[e]&&t[e].resolved},hasData:function(e){return this.isResolved(e)},getData:function(e){var t=this.objs;return t[e]&&t[e].resolved?t[e].data:null},clear:function(){this.objs=Object.create(null)}},e}(),O=function(){function e(e){this._internalRenderTask=e,this.onContinue=null}return e.prototype={get promise(){return this._internalRenderTask.capability.promise},cancel:function(){this._internalRenderTask.cancel()},then:function(e,t){return this.promise.then.apply(this.promise,arguments)}},e}(),I=function(){function e(e,t,r,n,i,a,o){this.callback=e,this.params=t,this.objs=r,this.commonObjs=n,this.operatorListIdx=null,this.operatorList=i,this.pageNumber=a,this.canvasFactory=o,this.running=!1,this.graphicsReadyCallback=null,this.graphicsReady=!1,this.useRequestAnimationFrame=!1,this.cancelled=!1,this.capability=(0,l.createPromiseCapability)(),this.task=new O(this),this._continueBound=this._continue.bind(this),this._scheduleNextBound=this._scheduleNext.bind(this),this._nextBound=this._next.bind(this),this._canvas=t.canvasContext.canvas}var t=new WeakMap;return e.prototype={initializeGraphics:function(e){if(this._canvas){if(t.has(this._canvas))throw new Error("Cannot use the same canvas during multiple render() operations. Use different canvas or ensure previous operations were cancelled or completed.");t.set(this._canvas,this)}if(!this.cancelled){(0,u.getDefaultSetting)("pdfBug")&&d.default.StepperManager&&d.default.StepperManager.enabled&&(this.stepper=d.default.StepperManager.create(this.pageNumber-1),this.stepper.init(this.operatorList),this.stepper.nextBreakPoint=this.stepper.getNextBreakPoint());var r=this.params;this.gfx=new h.CanvasGraphics(r.canvasContext,this.commonObjs,this.objs,this.canvasFactory,r.imageLayer),this.gfx.beginDrawing({transform:r.transform,viewport:r.viewport,transparency:e,background:r.background}),this.operatorListIdx=0,this.graphicsReady=!0,this.graphicsReadyCallback&&this.graphicsReadyCallback()}},cancel:function(){this.running=!1,this.cancelled=!0,this._canvas&&t.delete(this._canvas),(0,u.getDefaultSetting)("pdfjsNext")?this.callback(new u.RenderingCancelledException("Rendering cancelled, page "+this.pageNumber,"canvas")):this.callback("cancelled")},operatorListChanged:function(){this.graphicsReady?(this.stepper&&this.stepper.updateOperatorList(this.operatorList),this.running||this._continue()):this.graphicsReadyCallback||(this.graphicsReadyCallback=this._continueBound)},_continue:function(){this.running=!0,this.cancelled||(this.task.onContinue?this.task.onContinue(this._scheduleNextBound):this._scheduleNext())},_scheduleNext:function(){this.useRequestAnimationFrame&&"undefined"!=typeof window?window.requestAnimationFrame(this._nextBound):Promise.resolve(void 0).then(this._nextBound)},_next:function(){this.cancelled||(this.operatorListIdx=this.gfx.executeOperatorList(this.operatorList,this.operatorListIdx,this._continueBound,this.stepper),this.operatorListIdx===this.operatorList.argsArray.length&&(this.running=!1,this.operatorList.lastChunk&&(this.gfx.endDrawing(),this._canvas&&t.delete(this._canvas),this.callback())))}},e}(),L=function(){var e=[];return{listen:function(t){(0,l.deprecated)("Global UnsupportedManager.listen is used:  use PDFDocumentLoadingTask.onUnsupportedFeature instead"),e.push(t)},notify:function(t){for(var r=0,n=e.length;r<n;r++)e[r](t)}}}();t.version="1.9.575",t.build="9c2e9dae",t.getDocument=function(e,t,r,n){var a=new w;arguments.length>1&&(0,l.deprecated)("getDocument is called with pdfDataRangeTransport, passwordCallback or progressCallback argument"),t&&(t instanceof P||((t=Object.create(t)).length=e.length,t.initialData=e.initialData,t.abort||(t.abort=function(){})),(e=Object.create(e)).range=t),a.onPassword=r||null,a.onProgress=n||null;var o;if("string"==typeof e)o={url:e};else if((0,l.isArrayBuffer)(e))o={data:e};else if(e instanceof P)o={range:e};else{if("object"!==(void 0===e?"undefined":s(e)))throw new Error("Invalid parameter in getDocument, need either Uint8Array, string or a parameter object");if(!e.url&&!e.data&&!e.range)throw new Error("Invalid parameter object: need either .data, .range or .url");o=e}var c={},h=null,d=null,f=u.DOMCMapReaderFactory;for(var g in o)if("url"!==g||"undefined"==typeof window)if("range"!==g)if("worker"!==g)if("data"!==g||o[g]instanceof Uint8Array)"CMapReaderFactory"!==g?c[g]=o[g]:f=o[g];else{var v=o[g];if("string"==typeof v)c[g]=(0,l.stringToBytes)(v);else if("object"!==(void 0===v?"undefined":s(v))||null===v||isNaN(v.length)){if(!(0,l.isArrayBuffer)(v))throw new Error("Invalid PDF binary data: either typed array, string or array-like object is expected in the data property.");c[g]=new Uint8Array(v)}else c[g]=new Uint8Array(v)}else d=o[g];else h=o[g];else c[g]=new URL(o[g],window.location).href;if(c.rangeChunkSize=c.rangeChunkSize||m,c.ignoreErrors=!0!==c.stopAtErrors,void 0!==c.disableNativeImageDecoder&&(0,l.deprecated)("parameter disableNativeImageDecoder, use nativeImageDecoderSupport instead"),c.nativeImageDecoderSupport=c.nativeImageDecoderSupport||(!0===c.disableNativeImageDecoder?l.NativeImageDecoding.NONE:l.NativeImageDecoding.DECODE),c.nativeImageDecoderSupport!==l.NativeImageDecoding.DECODE&&c.nativeImageDecoderSupport!==l.NativeImageDecoding.NONE&&c.nativeImageDecoderSupport!==l.NativeImageDecoding.DISPLAY&&((0,l.warn)("Invalid parameter nativeImageDecoderSupport: need a state of enum {NativeImageDecoding}"),c.nativeImageDecoderSupport=l.NativeImageDecoding.DECODE),!d){var b=(0,u.getDefaultSetting)("workerPort");d=b?x.fromPort(b):new x,a._worker=d}var _=a.docId;return d.promise.then(function(){if(a.destroyed)throw new Error("Loading aborted");return i(d,c,h,_).then(function(e){if(a.destroyed)throw new Error("Loading aborted");var t=void 0;h?t=new p.PDFDataTransportStream(c,h):c.data||(t=new S({source:c,disableRange:(0,u.getDefaultSetting)("disableRange")}));var r=new l.MessageHandler(_,e,d.port);r.postMessageTransfers=d.postMessageTransfers;var n=new T(r,a,t,f);a._transport=n,r.send("Ready",null)})}).catch(a._capability.reject),a},t.LoopbackPort=k,t.PDFDataRangeTransport=P,t.PDFWorker=x,t.PDFDocumentProxy=R,t.PDFPageProxy=C,t.setPDFNetworkStreamClass=function(e){S=e},t._UnsupportedManager=L,t.version="1.9.575",t.build="9c2e9dae"},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.WebGLUtils=void 0;var n=r(7),i=r(0),a=function(){function e(e,t,r){var n=e.createShader(r);if(e.shaderSource(n,t),e.compileShader(n),!e.getShaderParameter(n,e.COMPILE_STATUS)){var i=e.getShaderInfoLog(n);throw new Error("Error during shader compilation: "+i)}return n}function t(t,r){return e(t,r,t.VERTEX_SHADER)}function r(t,r){return e(t,r,t.FRAGMENT_SHADER)}function a(e,t){for(var r=e.createProgram(),n=0,i=t.length;n<i;++n)e.attachShader(r,t[n]);if(e.linkProgram(r),!e.getProgramParameter(r,e.LINK_STATUS)){var a=e.getProgramInfoLog(r);throw new Error("Error during program linking: "+a)}return r}function o(e,t,r){e.activeTexture(r);var n=e.createTexture();return e.bindTexture(e.TEXTURE_2D,n),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,t),n}function s(){c||(h=document.createElement("canvas"),c=h.getContext("webgl",{premultipliedalpha:!1}))}function l(){var e,n;s(),e=h,h=null,n=c,c=null;var i=a(n,[t(n,d),r(n,f)]);n.useProgram(i);var o={};o.gl=n,o.canvas=e,o.resolutionLocation=n.getUniformLocation(i,"u_resolution"),o.positionLocation=n.getAttribLocation(i,"a_position"),o.backdropLocation=n.getUniformLocation(i,"u_backdrop"),o.subtypeLocation=n.getUniformLocation(i,"u_subtype");var l=n.getAttribLocation(i,"a_texCoord"),u=n.getUniformLocation(i,"u_image"),m=n.getUniformLocation(i,"u_mask"),g=n.createBuffer();n.bindBuffer(n.ARRAY_BUFFER,g),n.bufferData(n.ARRAY_BUFFER,new Float32Array([0,0,1,0,0,1,0,1,1,0,1,1]),n.STATIC_DRAW),n.enableVertexAttribArray(l),n.vertexAttribPointer(l,2,n.FLOAT,!1,0,0),n.uniform1i(u,0),n.uniform1i(m,1),p=o}function u(){var e,n;s(),e=h,h=null,n=c,c=null;var i=a(n,[t(n,m),r(n,g)]);n.useProgram(i);var o={};o.gl=n,o.canvas=e,o.resolutionLocation=n.getUniformLocation(i,"u_resolution"),o.scaleLocation=n.getUniformLocation(i,"u_scale"),o.offsetLocation=n.getUniformLocation(i,"u_offset"),o.positionLocation=n.getAttribLocation(i,"a_position"),o.colorLocation=n.getAttribLocation(i,"a_color"),v=o}var c,h,d="  attribute vec2 a_position;                                      attribute vec2 a_texCoord;                                                                                                      uniform vec2 u_resolution;                                                                                                      varying vec2 v_texCoord;                                                                                                        void main() {                                                     vec2 clipSpace = (a_position / u_resolution) * 2.0 - 1.0;       gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);                                                                              v_texCoord = a_texCoord;                                      }                                                             ",f="  precision mediump float;                                                                                                        uniform vec4 u_backdrop;                                        uniform int u_subtype;                                          uniform sampler2D u_image;                                      uniform sampler2D u_mask;                                                                                                       varying vec2 v_texCoord;                                                                                                        void main() {                                                     vec4 imageColor = texture2D(u_image, v_texCoord);               vec4 maskColor = texture2D(u_mask, v_texCoord);                 if (u_backdrop.a > 0.0) {                                         maskColor.rgb = maskColor.rgb * maskColor.a +                                   u_backdrop.rgb * (1.0 - maskColor.a);         }                                                               float lum;                                                      if (u_subtype == 0) {                                             lum = maskColor.a;                                            } else {                                                          lum = maskColor.r * 0.3 + maskColor.g * 0.59 +                        maskColor.b * 0.11;                                     }                                                               imageColor.a *= lum;                                            imageColor.rgb *= imageColor.a;                                 gl_FragColor = imageColor;                                    }                                                             ",p=null,m="  attribute vec2 a_position;                                      attribute vec3 a_color;                                                                                                         uniform vec2 u_resolution;                                      uniform vec2 u_scale;                                           uniform vec2 u_offset;                                                                                                          varying vec4 v_color;                                                                                                           void main() {                                                     vec2 position = (a_position + u_offset) * u_scale;              vec2 clipSpace = (position / u_resolution) * 2.0 - 1.0;         gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);                                                                              v_color = vec4(a_color / 255.0, 1.0);                         }                                                             ",g="  precision mediump float;                                                                                                        varying vec4 v_color;                                                                                                           void main() {                                                     gl_FragColor = v_color;                                       }                                                             ",v=null;return{get isEnabled(){if((0,n.getDefaultSetting)("disableWebGL"))return!1;var e=!1;try{s(),e=!!c}catch(e){}return(0,i.shadow)(this,"isEnabled",e)},composeSMask:function(e,t,r){var n=e.width,i=e.height;p||l();var a=p,s=a.canvas,u=a.gl;s.width=n,s.height=i,u.viewport(0,0,u.drawingBufferWidth,u.drawingBufferHeight),u.uniform2f(a.resolutionLocation,n,i),r.backdrop?u.uniform4f(a.resolutionLocation,r.backdrop[0],r.backdrop[1],r.backdrop[2],1):u.uniform4f(a.resolutionLocation,0,0,0,0),u.uniform1i(a.subtypeLocation,"Luminosity"===r.subtype?1:0);var c=o(u,e,u.TEXTURE0),h=o(u,t,u.TEXTURE1),d=u.createBuffer();return u.bindBuffer(u.ARRAY_BUFFER,d),u.bufferData(u.ARRAY_BUFFER,new Float32Array([0,0,n,0,0,i,0,i,n,0,n,i]),u.STATIC_DRAW),u.enableVertexAttribArray(a.positionLocation),u.vertexAttribPointer(a.positionLocation,2,u.FLOAT,!1,0,0),u.clearColor(0,0,0,0),u.enable(u.BLEND),u.blendFunc(u.ONE,u.ONE_MINUS_SRC_ALPHA),u.clear(u.COLOR_BUFFER_BIT),u.drawArrays(u.TRIANGLES,0,6),u.flush(),u.deleteTexture(c),u.deleteTexture(h),u.deleteBuffer(d),s},drawFigures:function(e,t,r,n,i){v||u();var a=v,o=a.canvas,s=a.gl;o.width=e,o.height=t,s.viewport(0,0,s.drawingBufferWidth,s.drawingBufferHeight),s.uniform2f(a.resolutionLocation,e,t);var l,c,h,d=0;for(l=0,c=n.length;l<c;l++)switch(n[l].type){case"lattice":d+=((h=n[l].coords.length/n[l].verticesPerRow|0)-1)*(n[l].verticesPerRow-1)*6;break;case"triangles":d+=n[l].coords.length}var f=new Float32Array(2*d),p=new Uint8Array(3*d),m=i.coords,g=i.colors,b=0,_=0;for(l=0,c=n.length;l<c;l++){var y=n[l],A=y.coords,S=y.colors;switch(y.type){case"lattice":var w=y.verticesPerRow;h=A.length/w|0;for(var P=1;P<h;P++)for(var R=P*w+1,C=1;C<w;C++,R++)f[b]=m[A[R-w-1]],f[b+1]=m[A[R-w-1]+1],f[b+2]=m[A[R-w]],f[b+3]=m[A[R-w]+1],f[b+4]=m[A[R-1]],f[b+5]=m[A[R-1]+1],p[_]=g[S[R-w-1]],p[_+1]=g[S[R-w-1]+1],p[_+2]=g[S[R-w-1]+2],p[_+3]=g[S[R-w]],p[_+4]=g[S[R-w]+1],p[_+5]=g[S[R-w]+2],p[_+6]=g[S[R-1]],p[_+7]=g[S[R-1]+1],p[_+8]=g[S[R-1]+2],f[b+6]=f[b+2],f[b+7]=f[b+3],f[b+8]=f[b+4],f[b+9]=f[b+5],f[b+10]=m[A[R]],f[b+11]=m[A[R]+1],p[_+9]=p[_+3],p[_+10]=p[_+4],p[_+11]=p[_+5],p[_+12]=p[_+6],p[_+13]=p[_+7],p[_+14]=p[_+8],p[_+15]=g[S[R]],p[_+16]=g[S[R]+1],p[_+17]=g[S[R]+2],b+=12,_+=18;break;case"triangles":for(var k=0,x=A.length;k<x;k++)f[b]=m[A[k]],f[b+1]=m[A[k]+1],p[_]=g[S[k]],p[_+1]=g[S[k]+1],p[_+2]=g[S[k]+2],b+=2,_+=3}}r?s.clearColor(r[0]/255,r[1]/255,r[2]/255,1):s.clearColor(0,0,0,0),s.clear(s.COLOR_BUFFER_BIT);var T=s.createBuffer();s.bindBuffer(s.ARRAY_BUFFER,T),s.bufferData(s.ARRAY_BUFFER,f,s.STATIC_DRAW),s.enableVertexAttribArray(a.positionLocation),s.vertexAttribPointer(a.positionLocation,2,s.FLOAT,!1,0,0);var E=s.createBuffer();return s.bindBuffer(s.ARRAY_BUFFER,E),s.bufferData(s.ARRAY_BUFFER,p,s.STATIC_DRAW),s.enableVertexAttribArray(a.colorLocation),s.vertexAttribPointer(a.colorLocation,3,s.UNSIGNED_BYTE,!1,0,0),s.uniform2f(a.scaleLocation,i.scaleX,i.scaleY),s.uniform2f(a.offsetLocation,i.offsetX,i.offsetY),s.drawArrays(s.TRIANGLES,0,d),s.flush(),s.deleteBuffer(T),s.deleteBuffer(E),o},clear:function(){p&&p.canvas&&(p.canvas.width=0,p.canvas.height=0),v&&v.canvas&&(v.canvas.width=0,v.canvas.height=0),p=null,v=null}}}();t.WebGLUtils=a},function(e,t,r){"use strict";function n(e){return e.replace(/>\\376\\377([^<]+)/g,function(e,t){for(var r=t.replace(/\\([0-3])([0-7])([0-7])/g,function(e,t,r,n){return String.fromCharCode(64*t+8*r+1*n)}),n="",i=0;i<r.length;i+=2){var a=256*r.charCodeAt(i)+r.charCodeAt(i+1);n+=a>=32&&a<127&&60!==a&&62!==a&&38!==a?String.fromCharCode(a):"&#x"+(65536+a).toString(16).substring(1)+";"}return">"+n})}function i(e){if("string"==typeof e)e=n(e),e=(new DOMParser).parseFromString(e,"application/xml");else if(!(e instanceof Document))throw new Error("Metadata: Invalid metadata object");this.metaDocument=e,this.metadata=Object.create(null),this.parse()}Object.defineProperty(t,"__esModule",{value:!0}),i.prototype={parse:function(){var e=this.metaDocument.documentElement;if("rdf:rdf"!==e.nodeName.toLowerCase())for(e=e.firstChild;e&&"rdf:rdf"!==e.nodeName.toLowerCase();)e=e.nextSibling;var t=e?e.nodeName.toLowerCase():null;if(e&&"rdf:rdf"===t&&e.hasChildNodes()){var r,n,i,a,o,s,l,u=e.childNodes;for(a=0,s=u.length;a<s;a++)if("rdf:description"===(r=u[a]).nodeName.toLowerCase())for(o=0,l=r.childNodes.length;o<l;o++)"#text"!==r.childNodes[o].nodeName.toLowerCase()&&(i=(n=r.childNodes[o]).nodeName.toLowerCase(),this.metadata[i]=n.textContent.trim())}},get:function(e){return this.metadata[e]||null},has:function(e){return void 0!==this.metadata[e]}},t.Metadata=i},function(e,t,r){"use strict";function n(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0}),t.AnnotationLayer=void 0;var o=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),s=r(7),l=r(0),u=function(){function e(){a(this,e)}return o(e,null,[{key:"create",value:function(e){switch(e.data.annotationType){case l.AnnotationType.LINK:return new h(e);case l.AnnotationType.TEXT:return new d(e);case l.AnnotationType.WIDGET:switch(e.data.fieldType){case"Tx":return new p(e);case"Btn":if(e.data.radioButton)return new g(e);if(e.data.checkBox)return new m(e);(0,l.warn)("Unimplemented button widget annotation: pushbutton");break;case"Ch":return new v(e)}return new f(e);case l.AnnotationType.POPUP:return new b(e);case l.AnnotationType.LINE:return new y(e);case l.AnnotationType.SQUARE:return new A(e);case l.AnnotationType.CIRCLE:return new S(e);case l.AnnotationType.HIGHLIGHT:return new w(e);case l.AnnotationType.UNDERLINE:return new P(e);case l.AnnotationType.SQUIGGLY:return new R(e);case l.AnnotationType.STRIKEOUT:return new C(e);case l.AnnotationType.STAMP:return new k(e);case l.AnnotationType.FILEATTACHMENT:return new x(e);default:return new c(e)}}}]),e}(),c=function(){function e(t){var r=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];a(this,e),this.isRenderable=r,this.data=t.data,this.layer=t.layer,this.page=t.page,this.viewport=t.viewport,this.linkService=t.linkService,this.downloadManager=t.downloadManager,this.imageResourcesPath=t.imageResourcesPath,this.renderInteractiveForms=t.renderInteractiveForms,this.svgFactory=t.svgFactory,r&&(this.container=this._createContainer(n))}return o(e,[{key:"_createContainer",value:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=this.data,r=this.page,n=this.viewport,i=document.createElement("section"),a=t.rect[2]-t.rect[0],o=t.rect[3]-t.rect[1];i.setAttribute("data-annotation-id",t.id);var u=l.Util.normalizeRect([t.rect[0],r.view[3]-t.rect[1]+r.view[1],t.rect[2],r.view[3]-t.rect[3]+r.view[1]]);if(s.CustomStyle.setProp("transform",i,"matrix("+n.transform.join(",")+")"),s.CustomStyle.setProp("transformOrigin",i,-u[0]+"px "+-u[1]+"px"),!e&&t.borderStyle.width>0){i.style.borderWidth=t.borderStyle.width+"px",t.borderStyle.style!==l.AnnotationBorderStyleType.UNDERLINE&&(a-=2*t.borderStyle.width,o-=2*t.borderStyle.width);var c=t.borderStyle.horizontalCornerRadius,h=t.borderStyle.verticalCornerRadius;if(c>0||h>0){var d=c+"px / "+h+"px";s.CustomStyle.setProp("borderRadius",i,d)}switch(t.borderStyle.style){case l.AnnotationBorderStyleType.SOLID:i.style.borderStyle="solid";break;case l.AnnotationBorderStyleType.DASHED:i.style.borderStyle="dashed";break;case l.AnnotationBorderStyleType.BEVELED:(0,l.warn)("Unimplemented border style: beveled");break;case l.AnnotationBorderStyleType.INSET:(0,l.warn)("Unimplemented border style: inset");break;case l.AnnotationBorderStyleType.UNDERLINE:i.style.borderBottomStyle="solid"}t.color?i.style.borderColor=l.Util.makeCssRgb(0|t.color[0],0|t.color[1],0|t.color[2]):i.style.borderWidth=0}return i.style.left=u[0]+"px",i.style.top=u[1]+"px",i.style.width=a+"px",i.style.height=o+"px",i}},{key:"_createPopup",value:function(e,t,r){t||((t=document.createElement("div")).style.height=e.style.height,t.style.width=e.style.width,e.appendChild(t));var n=new _({container:e,trigger:t,color:r.color,title:r.title,contents:r.contents,hideWrapper:!0}).render();n.style.left=e.style.width,e.appendChild(n)}},{key:"render",value:function(){throw new Error("Abstract method `AnnotationElement.render` called")}}]),e}(),h=function(e){function t(e){a(this,t);var r=!!(e.data.url||e.data.dest||e.data.action);return n(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,r))}return i(t,c),o(t,[{key:"render",value:function(){this.container.className="linkAnnotation";var e=document.createElement("a");return(0,s.addLinkAttributes)(e,{url:this.data.url,target:this.data.newWindow?s.LinkTarget.BLANK:void 0}),this.data.url||(this.data.action?this._bindNamedAction(e,this.data.action):this._bindLink(e,this.data.dest)),this.container.appendChild(e),this.container}},{key:"_bindLink",value:function(e,t){var r=this;e.href=this.linkService.getDestinationHash(t),e.onclick=function(){return t&&r.linkService.navigateTo(t),!1},t&&(e.className="internalLink")}},{key:"_bindNamedAction",value:function(e,t){var r=this;e.href=this.linkService.getAnchorUrl(""),e.onclick=function(){return r.linkService.executeNamedAction(t),!1},e.className="internalLink"}}]),t}(),d=function(e){function t(e){a(this,t);var r=!!(e.data.hasPopup||e.data.title||e.data.contents);return n(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,r))}return i(t,c),o(t,[{key:"render",value:function(){this.container.className="textAnnotation";var e=document.createElement("img");return e.style.height=this.container.style.height,e.style.width=this.container.style.width,e.src=this.imageResourcesPath+"annotation-"+this.data.name.toLowerCase()+".svg",e.alt="[{{type}} Annotation]",e.dataset.l10nId="text_annotation_type",e.dataset.l10nArgs=JSON.stringify({type:this.data.name}),this.data.hasPopup||this._createPopup(this.container,e,this.data),this.container.appendChild(e),this.container}}]),t}(),f=function(e){function t(){return a(this,t),n(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return i(t,c),o(t,[{key:"render",value:function(){return this.container}}]),t}(),p=function(e){function t(e){a(this,t);var r=e.renderInteractiveForms||!e.data.hasAppearance&&!!e.data.fieldValue;return n(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,r))}return i(t,f),o(t,[{key:"render",value:function(){var e=["left","center","right"];this.container.className="textWidgetAnnotation";var t=null;if(this.renderInteractiveForms){if(this.data.multiLine?(t=document.createElement("textarea")).textContent=this.data.fieldValue:((t=document.createElement("input")).type="text",t.setAttribute("value",this.data.fieldValue)),t.disabled=this.data.readOnly,null!==this.data.maxLen&&(t.maxLength=this.data.maxLen),this.data.comb){var r=(this.data.rect[2]-this.data.rect[0])/this.data.maxLen;t.classList.add("comb"),t.style.letterSpacing="calc("+r+"px - 1ch)"}}else{(t=document.createElement("div")).textContent=this.data.fieldValue,t.style.verticalAlign="middle",t.style.display="table-cell";var n=null;this.data.fontRefName&&(n=this.page.commonObjs.getData(this.data.fontRefName)),this._setTextStyle(t,n)}return null!==this.data.textAlignment&&(t.style.textAlign=e[this.data.textAlignment]),this.container.appendChild(t),this.container}},{key:"_setTextStyle",value:function(e,t){var r=e.style;if(r.fontSize=this.data.fontSize+"px",r.direction=this.data.fontDirection<0?"rtl":"ltr",t){r.fontWeight=t.black?t.bold?"900":"bold":t.bold?"bold":"normal",r.fontStyle=t.italic?"italic":"normal";var n=t.loadedName?'"'+t.loadedName+'", ':"",i=t.fallbackName||"Helvetica, sans-serif";r.fontFamily=n+i}}}]),t}(),m=function(e){function t(e){return a(this,t),n(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,e.renderInteractiveForms))}return i(t,f),o(t,[{key:"render",value:function(){this.container.className="buttonWidgetAnnotation checkBox";var e=document.createElement("input");return e.disabled=this.data.readOnly,e.type="checkbox",this.data.fieldValue&&"Off"!==this.data.fieldValue&&e.setAttribute("checked",!0),this.container.appendChild(e),this.container}}]),t}(),g=function(e){function t(e){return a(this,t),n(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,e.renderInteractiveForms))}return i(t,f),o(t,[{key:"render",value:function(){this.container.className="buttonWidgetAnnotation radioButton";var e=document.createElement("input");return e.disabled=this.data.readOnly,e.type="radio",e.name=this.data.fieldName,this.data.fieldValue===this.data.buttonValue&&e.setAttribute("checked",!0),this.container.appendChild(e),this.container}}]),t}(),v=function(e){function t(e){return a(this,t),n(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,e.renderInteractiveForms))}return i(t,f),o(t,[{key:"render",value:function(){this.container.className="choiceWidgetAnnotation";var e=document.createElement("select");e.disabled=this.data.readOnly,this.data.combo||(e.size=this.data.options.length,this.data.multiSelect&&(e.multiple=!0));for(var t=0,r=this.data.options.length;t<r;t++){var n=this.data.options[t],i=document.createElement("option");i.textContent=n.displayValue,i.value=n.exportValue,this.data.fieldValue.indexOf(n.displayValue)>=0&&i.setAttribute("selected",!0),e.appendChild(i)}return this.container.appendChild(e),this.container}}]),t}(),b=function(e){function t(e){a(this,t);var r=!(!e.data.title&&!e.data.contents);return n(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,r))}return i(t,c),o(t,[{key:"render",value:function(){var e=["Line","Square","Circle"];if(this.container.className="popupAnnotation",e.indexOf(this.data.parentType)>=0)return this.container;var t='[data-annotation-id="'+this.data.parentId+'"]',r=this.layer.querySelector(t);if(!r)return this.container;var n=new _({container:this.container,trigger:r,color:this.data.color,title:this.data.title,contents:this.data.contents}),i=parseFloat(r.style.left),a=parseFloat(r.style.width);return s.CustomStyle.setProp("transformOrigin",this.container,-(i+a)+"px -"+r.style.top),this.container.style.left=i+a+"px",this.container.appendChild(n.render()),this.container}}]),t}(),_=function(){function e(t){a(this,e),this.container=t.container,this.trigger=t.trigger,this.color=t.color,this.title=t.title,this.contents=t.contents,this.hideWrapper=t.hideWrapper||!1,this.pinned=!1}return o(e,[{key:"render",value:function(){var e=document.createElement("div");e.className="popupWrapper",this.hideElement=this.hideWrapper?e:this.container,this.hideElement.setAttribute("hidden",!0);var t=document.createElement("div");t.className="popup";var r=this.color;if(r){var n=.7*(255-r[0])+r[0],i=.7*(255-r[1])+r[1],a=.7*(255-r[2])+r[2];t.style.backgroundColor=l.Util.makeCssRgb(0|n,0|i,0|a)}var o=this._formatContents(this.contents),s=document.createElement("h1");return s.textContent=this.title,this.trigger.addEventListener("click",this._toggle.bind(this)),this.trigger.addEventListener("mouseover",this._show.bind(this,!1)),this.trigger.addEventListener("mouseout",this._hide.bind(this,!1)),t.addEventListener("click",this._hide.bind(this,!0)),t.appendChild(s),t.appendChild(o),e.appendChild(t),e}},{key:"_formatContents",value:function(e){for(var t=document.createElement("p"),r=e.split(/(?:\r\n?|\n)/),n=0,i=r.length;n<i;++n){var a=r[n];t.appendChild(document.createTextNode(a)),n<i-1&&t.appendChild(document.createElement("br"))}return t}},{key:"_toggle",value:function(){this.pinned?this._hide(!0):this._show(!0)}},{key:"_show",value:function(){arguments.length>0&&void 0!==arguments[0]&&arguments[0]&&(this.pinned=!0),this.hideElement.hasAttribute("hidden")&&(this.hideElement.removeAttribute("hidden"),this.container.style.zIndex+=1)}},{key:"_hide",value:function(){(!(arguments.length>0&&void 0!==arguments[0])||arguments[0])&&(this.pinned=!1),this.hideElement.hasAttribute("hidden")||this.pinned||(this.hideElement.setAttribute("hidden",!0),this.container.style.zIndex-=1)}}]),e}(),y=function(e){function t(e){a(this,t);var r=!!(e.data.hasPopup||e.data.title||e.data.contents);return n(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,r,!0))}return i(t,c),o(t,[{key:"render",value:function(){this.container.className="lineAnnotation";var e=this.data,t=e.rect[2]-e.rect[0],r=e.rect[3]-e.rect[1],n=this.svgFactory.create(t,r),i=this.svgFactory.createElement("svg:line");return i.setAttribute("x1",e.rect[2]-e.lineCoordinates[0]),i.setAttribute("y1",e.rect[3]-e.lineCoordinates[1]),i.setAttribute("x2",e.rect[2]-e.lineCoordinates[2]),i.setAttribute("y2",e.rect[3]-e.lineCoordinates[3]),i.setAttribute("stroke-width",e.borderStyle.width),i.setAttribute("stroke","transparent"),n.appendChild(i),this.container.append(n),this._createPopup(this.container,i,e),this.container}}]),t}(),A=function(e){function t(e){a(this,t);var r=!!(e.data.hasPopup||e.data.title||e.data.contents);return n(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,r,!0))}return i(t,c),o(t,[{key:"render",value:function(){this.container.className="squareAnnotation";var e=this.data,t=e.rect[2]-e.rect[0],r=e.rect[3]-e.rect[1],n=this.svgFactory.create(t,r),i=e.borderStyle.width,a=this.svgFactory.createElement("svg:rect");return a.setAttribute("x",i/2),a.setAttribute("y",i/2),a.setAttribute("width",t-i),a.setAttribute("height",r-i),a.setAttribute("stroke-width",i),a.setAttribute("stroke","transparent"),a.setAttribute("fill","none"),n.appendChild(a),this.container.append(n),this._createPopup(this.container,a,e),this.container}}]),t}(),S=function(e){function t(e){a(this,t);var r=!!(e.data.hasPopup||e.data.title||e.data.contents);return n(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,r,!0))}return i(t,c),o(t,[{key:"render",value:function(){this.container.className="circleAnnotation";var e=this.data,t=e.rect[2]-e.rect[0],r=e.rect[3]-e.rect[1],n=this.svgFactory.create(t,r),i=e.borderStyle.width,a=this.svgFactory.createElement("svg:ellipse");return a.setAttribute("cx",t/2),a.setAttribute("cy",r/2),a.setAttribute("rx",t/2-i/2),a.setAttribute("ry",r/2-i/2),a.setAttribute("stroke-width",i),a.setAttribute("stroke","transparent"),a.setAttribute("fill","none"),n.appendChild(a),this.container.append(n),this._createPopup(this.container,a,e),this.container}}]),t}(),w=function(e){function t(e){a(this,t);var r=!!(e.data.hasPopup||e.data.title||e.data.contents);return n(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,r,!0))}return i(t,c),o(t,[{key:"render",value:function(){return this.container.className="highlightAnnotation",this.data.hasPopup||this._createPopup(this.container,null,this.data),this.container}}]),t}(),P=function(e){function t(e){a(this,t);var r=!!(e.data.hasPopup||e.data.title||e.data.contents);return n(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,r,!0))}return i(t,c),o(t,[{key:"render",value:function(){return this.container.className="underlineAnnotation",this.data.hasPopup||this._createPopup(this.container,null,this.data),this.container}}]),t}(),R=function(e){function t(e){a(this,t);var r=!!(e.data.hasPopup||e.data.title||e.data.contents);return n(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,r,!0))}return i(t,c),o(t,[{key:"render",value:function(){return this.container.className="squigglyAnnotation",this.data.hasPopup||this._createPopup(this.container,null,this.data),this.container}}]),t}(),C=function(e){function t(e){a(this,t);var r=!!(e.data.hasPopup||e.data.title||e.data.contents);return n(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,r,!0))}return i(t,c),o(t,[{key:"render",value:function(){return this.container.className="strikeoutAnnotation",this.data.hasPopup||this._createPopup(this.container,null,this.data),this.container}}]),t}(),k=function(e){function t(e){a(this,t);var r=!!(e.data.hasPopup||e.data.title||e.data.contents);return n(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,r,!0))}return i(t,c),o(t,[{key:"render",value:function(){return this.container.className="stampAnnotation",this.data.hasPopup||this._createPopup(this.container,null,this.data),this.container}}]),t}(),x=function(e){function t(e){a(this,t);var r=n(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,!0)),i=r.data.file;return r.filename=(0,s.getFilenameFromUrl)(i.filename),r.content=i.content,r.linkService.onFileAttachmentAnnotation({id:(0,l.stringToPDFString)(i.filename),filename:i.filename,content:i.content}),r}return i(t,c),o(t,[{key:"render",value:function(){this.container.className="fileAttachmentAnnotation";var e=document.createElement("div");return e.style.height=this.container.style.height,e.style.width=this.container.style.width,e.addEventListener("dblclick",this._download.bind(this)),this.data.hasPopup||!this.data.title&&!this.data.contents||this._createPopup(this.container,e,this.data),this.container.appendChild(e),this.container}},{key:"_download",value:function(){this.downloadManager?this.downloadManager.downloadData(this.content,this.filename,""):(0,l.warn)("Download cannot be started due to unavailable download manager")}}]),t}(),T=function(){function e(){a(this,e)}return o(e,null,[{key:"render",value:function(e){for(var t=0,r=e.annotations.length;t<r;t++){var n=e.annotations[t];if(n){var i=u.create({data:n,layer:e.div,page:e.page,viewport:e.viewport,linkService:e.linkService,downloadManager:e.downloadManager,imageResourcesPath:e.imageResourcesPath||(0,s.getDefaultSetting)("imageResourcesPath"),renderInteractiveForms:e.renderInteractiveForms||!1,svgFactory:new s.DOMSVGFactory});i.isRenderable&&e.div.appendChild(i.render())}}}},{key:"update",value:function(e){for(var t=0,r=e.annotations.length;t<r;t++){var n=e.annotations[t],i=e.div.querySelector('[data-annotation-id="'+n.id+'"]');i&&s.CustomStyle.setProp("transform",i,"matrix("+e.viewport.transform.join(",")+")")}e.div.removeAttribute("hidden")}}]),e}();t.AnnotationLayer=T},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.renderTextLayer=void 0;var n=r(0),i=r(7),a=function(){function e(e){return!c.test(e)}function t(t,r,a){var o=document.createElement("div"),s={style:null,angle:0,canvasWidth:0,isWhitespace:!1,originalTransform:null,paddingBottom:0,paddingLeft:0,paddingRight:0,paddingTop:0,scale:1};if(t._textDivs.push(o),e(r.str))return s.isWhitespace=!0,void t._textDivProperties.set(o,s);var l=n.Util.transform(t._viewport.transform,r.transform),u=Math.atan2(l[1],l[0]),c=a[r.fontName];c.vertical&&(u+=Math.PI/2);var d=Math.sqrt(l[2]*l[2]+l[3]*l[3]),f=d;c.ascent?f=c.ascent*f:c.descent&&(f=(1+c.descent)*f);var p,m;if(0===u?(p=l[4],m=l[5]-f):(p=l[4]+f*Math.sin(u),m=l[5]-f*Math.cos(u)),h[1]=p,h[3]=m,h[5]=d,h[7]=c.fontFamily,s.style=h.join(""),o.setAttribute("style",s.style),o.textContent=r.str,(0,i.getDefaultSetting)("pdfBug")&&(o.dataset.fontName=r.fontName),0!==u&&(s.angle=u*(180/Math.PI)),r.str.length>1&&(c.vertical?s.canvasWidth=r.height*t._viewport.scale:s.canvasWidth=r.width*t._viewport.scale),t._textDivProperties.set(o,s),t._textContentStream&&t._layoutText(o),t._enhanceTextSelection){var g=1,v=0;0!==u&&(g=Math.cos(u),v=Math.sin(u));var b,_,y=(c.vertical?r.height:r.width)*t._viewport.scale,A=d;0!==u?(b=[g,v,-v,g,p,m],_=n.Util.getAxialAlignedBoundingBox([0,0,y,A],b)):_=[p,m,p+y,m+A],t._bounds.push({left:_[0],top:_[1],right:_[2],bottom:_[3],div:o,size:[y,A],m:b})}}function r(e){if(!e._canceled){var t=e._textDivs,r=e._capability,n=t.length;if(n>u)return e._renderingDone=!0,void r.resolve();if(!e._textContentStream)for(var i=0;i<n;i++)e._layoutText(t[i]);e._renderingDone=!0,r.resolve()}}function a(e){for(var t=e._bounds,r=e._viewport,i=o(r.width,r.height,t),a=0;a<i.length;a++){var s=t[a].div,l=e._textDivProperties.get(s);if(0!==l.angle){var u=i[a],c=t[a],h=c.m,d=h[0],f=h[1],p=[[0,0],[0,c.size[1]],[c.size[0],0],c.size],m=new Float64Array(64);p.forEach(function(e,t){var r=n.Util.applyTransform(e,h);m[t+0]=d&&(u.left-r[0])/d,m[t+4]=f&&(u.top-r[1])/f,m[t+8]=d&&(u.right-r[0])/d,m[t+12]=f&&(u.bottom-r[1])/f,m[t+16]=f&&(u.left-r[0])/-f,m[t+20]=d&&(u.top-r[1])/d,m[t+24]=f&&(u.right-r[0])/-f,m[t+28]=d&&(u.bottom-r[1])/d,m[t+32]=d&&(u.left-r[0])/-d,m[t+36]=f&&(u.top-r[1])/-f,m[t+40]=d&&(u.right-r[0])/-d,m[t+44]=f&&(u.bottom-r[1])/-f,m[t+48]=f&&(u.left-r[0])/f,m[t+52]=d&&(u.top-r[1])/-d,m[t+56]=f&&(u.right-r[0])/f,m[t+60]=d&&(u.bottom-r[1])/-d});var g=function(e,t,r){for(var n=0,i=0;i<r;i++){var a=e[t++];a>0&&(n=n?Math.min(a,n):a)}return n},v=1+Math.min(Math.abs(d),Math.abs(f));l.paddingLeft=g(m,32,16)/v,l.paddingTop=g(m,48,16)/v,l.paddingRight=g(m,0,16)/v,l.paddingBottom=g(m,16,16)/v,e._textDivProperties.set(s,l)}else l.paddingLeft=t[a].left-i[a].left,l.paddingTop=t[a].top-i[a].top,l.paddingRight=i[a].right-t[a].right,l.paddingBottom=i[a].bottom-t[a].bottom,e._textDivProperties.set(s,l)}}function o(e,t,r){var n=r.map(function(e,t){return{x1:e.left,y1:e.top,x2:e.right,y2:e.bottom,index:t,x1New:void 0,x2New:void 0}});s(e,n);var i=new Array(r.length);return n.forEach(function(e){var t=e.index;i[t]={left:e.x1New,top:0,right:e.x2New,bottom:0}}),r.map(function(t,r){var a=i[r],o=n[r];o.x1=t.top,o.y1=e-a.right,o.x2=t.bottom,o.y2=e-a.left,o.index=r,o.x1New=void 0,o.x2New=void 0}),s(t,n),n.forEach(function(e){var t=e.index;i[t].top=e.x1New,i[t].bottom=e.x2New}),i}function s(e,t){t.sort(function(e,t){return e.x1-t.x1||e.index-t.index});var r=[{start:-1/0,end:1/0,boundary:{x1:-1/0,y1:-1/0,x2:0,y2:1/0,index:-1,x1New:0,x2New:0}}];t.forEach(function(e){for(var t=0;t<r.length&&r[t].end<=e.y1;)t++;for(var n=r.length-1;n>=0&&r[n].start>=e.y2;)n--;var i,a,o,s,l=-1/0;for(o=t;o<=n;o++){var u;(u=(a=(i=r[o]).boundary).x2>e.x1?a.index>e.index?a.x1New:e.x1:void 0===a.x2New?(a.x2+e.x1)/2:a.x2New)>l&&(l=u)}for(e.x1New=l,o=t;o<=n;o++)void 0===(a=(i=r[o]).boundary).x2New?a.x2>e.x1?a.index>e.index&&(a.x2New=a.x2):a.x2New=l:a.x2New>l&&(a.x2New=Math.max(l,a.x2));var c=[],h=null;for(o=t;o<=n;o++){var d=(a=(i=r[o]).boundary).x2>e.x2?a:e;h===d?c[c.length-1].end=i.end:(c.push({start:i.start,end:i.end,boundary:d}),h=d)}for(r[t].start<e.y1&&(c[0].start=e.y1,c.unshift({start:r[t].start,end:e.y1,boundary:r[t].boundary})),e.y2<r[n].end&&(c[c.length-1].end=e.y2,c.push({start:e.y2,end:r[n].end,boundary:r[n].boundary})),o=t;o<=n;o++)if(i=r[o],void 0===(a=i.boundary).x2New){var f=!1;for(s=t-1;!f&&s>=0&&r[s].start>=a.y1;s--)f=r[s].boundary===a;for(s=n+1;!f&&s<r.length&&r[s].end<=a.y2;s++)f=r[s].boundary===a;for(s=0;!f&&s<c.length;s++)f=c[s].boundary===a;f||(a.x2New=l)}Array.prototype.splice.apply(r,[t,n-t+1].concat(c))}),r.forEach(function(t){var r=t.boundary;void 0===r.x2New&&(r.x2New=Math.max(e,r.x2))})}function l(e){var t=e.textContent,r=e.textContentStream,i=e.container,a=e.viewport,o=e.textDivs,s=e.textContentItemsStr,l=e.enhanceTextSelection;this._textContent=t,this._textContentStream=r,this._container=i,this._viewport=a,this._textDivs=o||[],this._textContentItemsStr=s||[],this._enhanceTextSelection=!!l,this._reader=null,this._layoutTextLastFontSize=null,this._layoutTextLastFontFamily=null,this._layoutTextCtx=null,this._textDivProperties=new WeakMap,this._renderingDone=!1,this._canceled=!1,this._capability=(0,n.createPromiseCapability)(),this._renderTimer=null,this._bounds=[]}var u=1e5,c=/\S/,h=["left: ",0,"px; top: ",0,"px; font-size: ",0,"px; font-family: ","",";"];return l.prototype={get promise(){return this._capability.promise},cancel:function(){this._reader&&(this._reader.cancel(new n.AbortException("text layer task cancelled")),this._reader=null),this._canceled=!0,null!==this._renderTimer&&(clearTimeout(this._renderTimer),this._renderTimer=null),this._capability.reject("canceled")},_processItems:function(e,r){for(var n=0,i=e.length;n<i;n++)this._textContentItemsStr.push(e[n].str),t(this,e[n],r)},_layoutText:function(e){var t=this._container,r=this._textDivProperties.get(e);if(!r.isWhitespace){var n=e.style.fontSize,a=e.style.fontFamily;n===this._layoutTextLastFontSize&&a===this._layoutTextLastFontFamily||(this._layoutTextCtx.font=n+" "+a,this._lastFontSize=n,this._lastFontFamily=a);var o=this._layoutTextCtx.measureText(e.textContent).width,s="";0!==r.canvasWidth&&o>0&&(r.scale=r.canvasWidth/o,s="scaleX("+r.scale+")"),0!==r.angle&&(s="rotate("+r.angle+"deg) "+s),""!==s&&(r.originalTransform=s,i.CustomStyle.setProp("transform",e,s)),this._textDivProperties.set(e,r),t.appendChild(e)}},_render:function(e){var t=this,i=(0,n.createPromiseCapability)(),a=Object.create(null),o=document.createElement("canvas");if(o.mozOpaque=!0,this._layoutTextCtx=o.getContext("2d",{alpha:!1}),this._textContent){var s=this._textContent.items,l=this._textContent.styles;this._processItems(s,l),i.resolve()}else{if(!this._textContentStream)throw new Error('Neither "textContent" nor "textContentStream" parameters specified.');var u=function e(){t._reader.read().then(function(r){var o=r.value;r.done?i.resolve():(n.Util.extendObj(a,o.styles),t._processItems(o.items,a),e())},i.reject)};this._reader=this._textContentStream.getReader(),u()}i.promise.then(function(){a=null,e?t._renderTimer=setTimeout(function(){r(t),t._renderTimer=null},e):r(t)},this._capability.reject)},expandTextDivs:function(e){if(this._enhanceTextSelection&&this._renderingDone){null!==this._bounds&&(a(this),this._bounds=null);for(var t=0,r=this._textDivs.length;t<r;t++){var n=this._textDivs[t],o=this._textDivProperties.get(n);if(!o.isWhitespace)if(e){var s="",l="";1!==o.scale&&(s="scaleX("+o.scale+")"),0!==o.angle&&(s="rotate("+o.angle+"deg) "+s),0!==o.paddingLeft&&(l+=" padding-left: "+o.paddingLeft/o.scale+"px;",s+=" translateX("+-o.paddingLeft/o.scale+"px)"),0!==o.paddingTop&&(l+=" padding-top: "+o.paddingTop+"px;",s+=" translateY("+-o.paddingTop+"px)"),0!==o.paddingRight&&(l+=" padding-right: "+o.paddingRight/o.scale+"px;"),0!==o.paddingBottom&&(l+=" padding-bottom: "+o.paddingBottom+"px;"),""!==l&&n.setAttribute("style",o.style+l),""!==s&&i.CustomStyle.setProp("transform",n,s)}else n.style.padding=0,i.CustomStyle.setProp("transform",n,o.originalTransform||"")}}}},function(e){var t=new l({textContent:e.textContent,textContentStream:e.textContentStream,container:e.container,viewport:e.viewport,textDivs:e.textDivs,textContentItemsStr:e.textContentItemsStr,enhanceTextSelection:e.enhanceTextSelection});return t._render(e.timeout),t}}();t.renderTextLayer=a},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.SVGGraphics=void 0;var n=r(0),i=r(7),a=function(){throw new Error("Not implemented: SVGGraphics")},o={fontStyle:"normal",fontWeight:"normal",fillColor:"#000000"},s=function(){function e(e,t,r){for(var n=-1,i=t;i<r;i++){var a=255&(n^e[i]);n=n>>>8^u[a]}return-1^n}function t(t,r,n,i){var a=i,o=r.length;n[a]=o>>24&255,n[a+1]=o>>16&255,n[a+2]=o>>8&255,n[a+3]=255&o,n[a+=4]=255&t.charCodeAt(0),n[a+1]=255&t.charCodeAt(1),n[a+2]=255&t.charCodeAt(2),n[a+3]=255&t.charCodeAt(3),a+=4,n.set(r,a);var s=e(n,i+4,a+=r.length);n[a]=s>>24&255,n[a+1]=s>>16&255,n[a+2]=s>>8&255,n[a+3]=255&s}function r(e,t,r){for(var n=1,i=0,a=t;a<r;++a)i=(i+(n=(n+(255&e[a]))%65521))%65521;return i<<16|n}function i(e){if(!(0,n.isNodeJS)())return a(e);try{var t;t=parseInt(process.versions.node)>=8?e:new Buffer(e);var r=require("zlib").deflateSync(t,{level:9});return r instanceof Uint8Array?r:new Uint8Array(r)}catch(e){(0,n.warn)("Not compressing PNG because zlib.deflateSync is unavailable: "+e)}return a(e)}function a(e){var t=e.length,n=Math.ceil(t/65535),i=new Uint8Array(2+t+5*n+4),a=0;i[a++]=120,i[a++]=156;for(var o=0;t>65535;)i[a++]=0,i[a++]=255,i[a++]=255,i[a++]=0,i[a++]=0,i.set(e.subarray(o,o+65535),a),a+=65535,o+=65535,t-=65535;i[a++]=1,i[a++]=255&t,i[a++]=t>>8&255,i[a++]=255&~t,i[a++]=(65535&~t)>>8&255,i.set(e.subarray(o),a),a+=e.length-o;var s=r(e,0,e.length);return i[a++]=s>>24&255,i[a++]=s>>16&255,i[a++]=s>>8&255,i[a++]=255&s,i}function o(e,r,a){var o,u,c,h=e.width,d=e.height,f=e.data;switch(r){case n.ImageKind.GRAYSCALE_1BPP:u=0,o=1,c=h+7>>3;break;case n.ImageKind.RGB_24BPP:u=2,o=8,c=3*h;break;case n.ImageKind.RGBA_32BPP:u=6,o=8,c=4*h;break;default:throw new Error("invalid format")}var p,m,g=new Uint8Array((1+c)*d),v=0,b=0;for(p=0;p<d;++p)g[v++]=0,g.set(f.subarray(b,b+c),v),b+=c,v+=c;if(r===n.ImageKind.GRAYSCALE_1BPP)for(v=0,p=0;p<d;p++)for(v++,m=0;m<c;m++)g[v++]^=255;var _=new Uint8Array([h>>24&255,h>>16&255,h>>8&255,255&h,d>>24&255,d>>16&255,d>>8&255,255&d,o,u,0,0,0]),y=i(g),A=s.length+3*l+_.length+y.length,S=new Uint8Array(A),w=0;return S.set(s,w),w+=s.length,t("IHDR",_,S,w),w+=l+_.length,t("IDATA",y,S,w),w+=l+y.length,t("IEND",new Uint8Array(0),S,w),(0,n.createObjectURL)(S,"image/png",a)}for(var s=new Uint8Array([137,80,78,71,13,10,26,10]),l=12,u=new Int32Array(256),c=0;c<256;c++){for(var h=c,d=0;d<8;d++)h=1&h?3988292384^h>>1&2147483647:h>>1&2147483647;u[c]=h}return function(e,t){return o(e,void 0===e.kind?n.ImageKind.GRAYSCALE_1BPP:e.kind,t)}}(),l=function(){function e(){this.fontSizeScale=1,this.fontWeight=o.fontWeight,this.fontSize=0,this.textMatrix=n.IDENTITY_MATRIX,this.fontMatrix=n.FONT_IDENTITY_MATRIX,this.leading=0,this.x=0,this.y=0,this.lineX=0,this.lineY=0,this.charSpacing=0,this.wordSpacing=0,this.textHScale=1,this.textRise=0,this.fillColor=o.fillColor,this.strokeColor="#000000",this.fillAlpha=1,this.strokeAlpha=1,this.lineWidth=1,this.lineJoin="",this.lineCap="",this.miterLimit=0,this.dashArray=[],this.dashPhase=0,this.dependencies=[],this.activeClipUrl=null,this.clipGroup=null,this.maskId=""}return e.prototype={clone:function(){return Object.create(this)},setCurrentPoint:function(e,t){this.x=e,this.y=t}},e}();t.SVGGraphics=a=function(){function e(e){for(var t=[],r=[],n=e.length,i=0;i<n;i++)"save"!==e[i].fn?"restore"===e[i].fn?t=r.pop():t.push(e[i]):(t.push({fnId:92,fn:"group",items:[]}),r.push(t),t=t[t.length-1].items);return t}function t(e){if(Number.isInteger(e))return e.toString();var t=e.toFixed(10),r=t.length-1;if("0"!==t[r])return t;do{r--}while("0"===t[r]);return t.substr(0,"."===t[r]?r:r+1)}function r(e){if(0===e[4]&&0===e[5]){if(0===e[1]&&0===e[2])return 1===e[0]&&1===e[3]?"":"scale("+t(e[0])+" "+t(e[3])+")";if(e[0]===e[3]&&e[1]===-e[2])return"rotate("+t(180*Math.acos(e[0])/Math.PI)+")"}else if(1===e[0]&&0===e[1]&&0===e[2]&&1===e[3])return"translate("+t(e[4])+" "+t(e[5])+")";return"matrix("+t(e[0])+" "+t(e[1])+" "+t(e[2])+" "+t(e[3])+" "+t(e[4])+" "+t(e[5])+")"}function a(e,t,r){this.svgFactory=new i.DOMSVGFactory,this.current=new l,this.transformMatrix=n.IDENTITY_MATRIX,this.transformStack=[],this.extraStack=[],this.commonObjs=e,this.objs=t,this.pendingClip=null,this.pendingEOFill=!1,this.embedFonts=!1,this.embeddedFonts=Object.create(null),this.cssStyle=null,this.forceDataSchema=!!r}var u="http://www.w3.org/1999/xlink",c=["butt","round","square"],h=["miter","round","bevel"],d=0,f=0;return a.prototype={save:function(){this.transformStack.push(this.transformMatrix);var e=this.current;this.extraStack.push(e),this.current=e.clone()},restore:function(){this.transformMatrix=this.transformStack.pop(),this.current=this.extraStack.pop(),this.pendingClip=null,this.tgrp=null},group:function(e){this.save(),this.executeOpTree(e),this.restore()},loadDependencies:function(e){for(var t=this,r=e.fnArray,i=r.length,a=e.argsArray,o=0;o<i;o++)if(n.OPS.dependency===r[o])for(var s=a[o],l=0,u=s.length;l<u;l++){var c,h=s[l];c="g_"===h.substring(0,2)?new Promise(function(e){t.commonObjs.get(h,e)}):new Promise(function(e){t.objs.get(h,e)}),this.current.dependencies.push(c)}return Promise.all(this.current.dependencies)},transform:function(e,t,r,i,a,o){var s=[e,t,r,i,a,o];this.transformMatrix=n.Util.transform(this.transformMatrix,s),this.tgrp=null},getSVG:function(e,t){var r=this;this.viewport=t;var i=this._initialize(t);return this.loadDependencies(e).then(function(){r.transformMatrix=n.IDENTITY_MATRIX;var t=r.convertOpList(e);return r.executeOpTree(t),i})},convertOpList:function(t){var r=t.argsArray,i=t.fnArray,a=i.length,o=[],s=[];for(var l in n.OPS)o[n.OPS[l]]=l;for(var u=0;u<a;u++){var c=i[u];s.push({fnId:c,fn:o[c],args:r[u]})}return e(s)},executeOpTree:function(e){for(var t=e.length,r=0;r<t;r++){var i=e[r].fn,a=e[r].fnId,o=e[r].args;switch(0|a){case n.OPS.beginText:this.beginText();break;case n.OPS.setLeading:this.setLeading(o);break;case n.OPS.setLeadingMoveText:this.setLeadingMoveText(o[0],o[1]);break;case n.OPS.setFont:this.setFont(o);break;case n.OPS.showText:case n.OPS.showSpacedText:this.showText(o[0]);break;case n.OPS.endText:this.endText();break;case n.OPS.moveText:this.moveText(o[0],o[1]);break;case n.OPS.setCharSpacing:this.setCharSpacing(o[0]);break;case n.OPS.setWordSpacing:this.setWordSpacing(o[0]);break;case n.OPS.setHScale:this.setHScale(o[0]);break;case n.OPS.setTextMatrix:this.setTextMatrix(o[0],o[1],o[2],o[3],o[4],o[5]);break;case n.OPS.setTextRise:this.setTextRise(o[0]);break;case n.OPS.setLineWidth:this.setLineWidth(o[0]);break;case n.OPS.setLineJoin:this.setLineJoin(o[0]);break;case n.OPS.setLineCap:this.setLineCap(o[0]);break;case n.OPS.setMiterLimit:this.setMiterLimit(o[0]);break;case n.OPS.setFillRGBColor:this.setFillRGBColor(o[0],o[1],o[2]);break;case n.OPS.setStrokeRGBColor:this.setStrokeRGBColor(o[0],o[1],o[2]);break;case n.OPS.setDash:this.setDash(o[0],o[1]);break;case n.OPS.setGState:this.setGState(o[0]);break;case n.OPS.fill:this.fill();break;case n.OPS.eoFill:this.eoFill();break;case n.OPS.stroke:this.stroke();break;case n.OPS.fillStroke:this.fillStroke();break;case n.OPS.eoFillStroke:this.eoFillStroke();break;case n.OPS.clip:this.clip("nonzero");break;case n.OPS.eoClip:this.clip("evenodd");break;case n.OPS.paintSolidColorImageMask:this.paintSolidColorImageMask();break;case n.OPS.paintJpegXObject:this.paintJpegXObject(o[0],o[1],o[2]);break;case n.OPS.paintImageXObject:this.paintImageXObject(o[0]);break;case n.OPS.paintInlineImageXObject:this.paintInlineImageXObject(o[0]);break;case n.OPS.paintImageMaskXObject:this.paintImageMaskXObject(o[0]);break;case n.OPS.paintFormXObjectBegin:this.paintFormXObjectBegin(o[0],o[1]);break;case n.OPS.paintFormXObjectEnd:this.paintFormXObjectEnd();break;case n.OPS.closePath:this.closePath();break;case n.OPS.closeStroke:this.closeStroke();break;case n.OPS.closeFillStroke:this.closeFillStroke();break;case n.OPS.nextLine:this.nextLine();break;case n.OPS.transform:this.transform(o[0],o[1],o[2],o[3],o[4],o[5]);break;case n.OPS.constructPath:this.constructPath(o[0],o[1]);break;case n.OPS.endPath:this.endPath();break;case 92:this.group(e[r].items);break;default:(0,n.warn)("Unimplemented operator "+i)}}},setWordSpacing:function(e){this.current.wordSpacing=e},setCharSpacing:function(e){this.current.charSpacing=e},nextLine:function(){this.moveText(0,this.current.leading)},setTextMatrix:function(e,r,n,i,a,o){var s=this.current;this.current.textMatrix=this.current.lineMatrix=[e,r,n,i,a,o],this.current.x=this.current.lineX=0,this.current.y=this.current.lineY=0,s.xcoords=[],s.tspan=this.svgFactory.createElement("svg:tspan"),s.tspan.setAttributeNS(null,"font-family",s.fontFamily),s.tspan.setAttributeNS(null,"font-size",t(s.fontSize)+"px"),s.tspan.setAttributeNS(null,"y",t(-s.y)),s.txtElement=this.svgFactory.createElement("svg:text"),s.txtElement.appendChild(s.tspan)},beginText:function(){this.current.x=this.current.lineX=0,this.current.y=this.current.lineY=0,this.current.textMatrix=n.IDENTITY_MATRIX,this.current.lineMatrix=n.IDENTITY_MATRIX,this.current.tspan=this.svgFactory.createElement("svg:tspan"),this.current.txtElement=this.svgFactory.createElement("svg:text"),this.current.txtgrp=this.svgFactory.createElement("svg:g"),this.current.xcoords=[]},moveText:function(e,r){var n=this.current;this.current.x=this.current.lineX+=e,this.current.y=this.current.lineY+=r,n.xcoords=[],n.tspan=this.svgFactory.createElement("svg:tspan"),n.tspan.setAttributeNS(null,"font-family",n.fontFamily),n.tspan.setAttributeNS(null,"font-size",t(n.fontSize)+"px"),n.tspan.setAttributeNS(null,"y",t(-n.y))},showText:function(e){var i=this.current,a=i.font,s=i.fontSize;if(0!==s){var l,u=i.charSpacing,c=i.wordSpacing,h=i.fontDirection,d=i.textHScale*h,f=e.length,p=a.vertical,m=s*i.fontMatrix[0],g=0;for(l=0;l<f;++l){var v=e[l];if(null!==v)if((0,n.isNum)(v))g+=-v*s*.001;else{var b=v.width,_=v.fontChar,y=b*m+((v.isSpace?c:0)+u)*h;v.isInFont||a.missingFile?(i.xcoords.push(i.x+g*d),i.tspan.textContent+=_,g+=y):g+=y}else g+=h*c}p?i.y-=g*d:i.x+=g*d,i.tspan.setAttributeNS(null,"x",i.xcoords.map(t).join(" ")),i.tspan.setAttributeNS(null,"y",t(-i.y)),i.tspan.setAttributeNS(null,"font-family",i.fontFamily),i.tspan.setAttributeNS(null,"font-size",t(i.fontSize)+"px"),i.fontStyle!==o.fontStyle&&i.tspan.setAttributeNS(null,"font-style",i.fontStyle),i.fontWeight!==o.fontWeight&&i.tspan.setAttributeNS(null,"font-weight",i.fontWeight),i.fillColor!==o.fillColor&&i.tspan.setAttributeNS(null,"fill",i.fillColor);var A=i.textMatrix;0!==i.textRise&&((A=A.slice())[5]+=i.textRise),i.txtElement.setAttributeNS(null,"transform",r(A)+" scale(1, -1)"),i.txtElement.setAttributeNS("http://www.w3.org/XML/1998/namespace","xml:space","preserve"),i.txtElement.appendChild(i.tspan),i.txtgrp.appendChild(i.txtElement),this._ensureTransformGroup().appendChild(i.txtElement)}},setLeadingMoveText:function(e,t){this.setLeading(-t),this.moveText(e,t)},addFontStyle:function(e){this.cssStyle||(this.cssStyle=this.svgFactory.createElement("svg:style"),this.cssStyle.setAttributeNS(null,"type","text/css"),this.defs.appendChild(this.cssStyle));var t=(0,n.createObjectURL)(e.data,e.mimetype,this.forceDataSchema);this.cssStyle.textContent+='@font-face { font-family: "'+e.loadedName+'"; src: url('+t+"); }\n"},setFont:function(e){var r=this.current,i=this.commonObjs.get(e[0]),a=e[1];this.current.font=i,this.embedFonts&&i.data&&!this.embeddedFonts[i.loadedName]&&(this.addFontStyle(i),this.embeddedFonts[i.loadedName]=i),r.fontMatrix=i.fontMatrix?i.fontMatrix:n.FONT_IDENTITY_MATRIX;var o=i.black?i.bold?"bolder":"bold":i.bold?"bold":"normal",s=i.italic?"italic":"normal";a<0?(a=-a,r.fontDirection=-1):r.fontDirection=1,r.fontSize=a,r.fontFamily=i.loadedName,r.fontWeight=o,r.fontStyle=s,r.tspan=this.svgFactory.createElement("svg:tspan"),r.tspan.setAttributeNS(null,"y",t(-r.y)),r.xcoords=[]},endText:function(){},setLineWidth:function(e){this.current.lineWidth=e},setLineCap:function(e){this.current.lineCap=c[e]},setLineJoin:function(e){this.current.lineJoin=h[e]},setMiterLimit:function(e){this.current.miterLimit=e},setStrokeAlpha:function(e){this.current.strokeAlpha=e},setStrokeRGBColor:function(e,t,r){var i=n.Util.makeCssRgb(e,t,r);this.current.strokeColor=i},setFillAlpha:function(e){this.current.fillAlpha=e},setFillRGBColor:function(e,t,r){var i=n.Util.makeCssRgb(e,t,r);this.current.fillColor=i,this.current.tspan=this.svgFactory.createElement("svg:tspan"),this.current.xcoords=[]},setDash:function(e,t){this.current.dashArray=e,this.current.dashPhase=t},constructPath:function(e,r){var i=this.current,a=i.x,o=i.y;i.path=this.svgFactory.createElement("svg:path");for(var s=[],l=e.length,u=0,c=0;u<l;u++)switch(0|e[u]){case n.OPS.rectangle:a=r[c++],o=r[c++];var h=a+r[c++],d=o+r[c++];s.push("M",t(a),t(o),"L",t(h),t(o),"L",t(h),t(d),"L",t(a),t(d),"Z");break;case n.OPS.moveTo:a=r[c++],o=r[c++],s.push("M",t(a),t(o));break;case n.OPS.lineTo:a=r[c++],o=r[c++],s.push("L",t(a),t(o));break;case n.OPS.curveTo:a=r[c+4],o=r[c+5],s.push("C",t(r[c]),t(r[c+1]),t(r[c+2]),t(r[c+3]),t(a),t(o)),c+=6;break;case n.OPS.curveTo2:a=r[c+2],o=r[c+3],s.push("C",t(a),t(o),t(r[c]),t(r[c+1]),t(r[c+2]),t(r[c+3])),c+=4;break;case n.OPS.curveTo3:a=r[c+2],o=r[c+3],s.push("C",t(r[c]),t(r[c+1]),t(a),t(o),t(a),t(o)),c+=4;break;case n.OPS.closePath:s.push("Z")}i.path.setAttributeNS(null,"d",s.join(" ")),i.path.setAttributeNS(null,"fill","none"),this._ensureTransformGroup().appendChild(i.path),i.element=i.path,i.setCurrentPoint(a,o)},endPath:function(){if(this.pendingClip){var e=this.current,t="clippath"+d;d++;var n=this.svgFactory.createElement("svg:clipPath");n.setAttributeNS(null,"id",t),n.setAttributeNS(null,"transform",r(this.transformMatrix));var i=e.element.cloneNode();"evenodd"===this.pendingClip?i.setAttributeNS(null,"clip-rule","evenodd"):i.setAttributeNS(null,"clip-rule","nonzero"),this.pendingClip=null,n.appendChild(i),this.defs.appendChild(n),e.activeClipUrl&&(e.clipGroup=null,this.extraStack.forEach(function(e){e.clipGroup=null})),e.activeClipUrl="url(#"+t+")",this.tgrp=null}},clip:function(e){this.pendingClip=e},closePath:function(){var e=this.current,t=e.path.getAttributeNS(null,"d");t+="Z",e.path.setAttributeNS(null,"d",t)},setLeading:function(e){this.current.leading=-e},setTextRise:function(e){this.current.textRise=e},setHScale:function(e){this.current.textHScale=e/100},setGState:function(e){for(var t=0,r=e.length;t<r;t++){var i=e[t],a=i[0],o=i[1];switch(a){case"LW":this.setLineWidth(o);break;case"LC":this.setLineCap(o);break;case"LJ":this.setLineJoin(o);break;case"ML":this.setMiterLimit(o);break;case"D":this.setDash(o[0],o[1]);break;case"Font":this.setFont(o);break;case"CA":this.setStrokeAlpha(o);break;case"ca":this.setFillAlpha(o);break;default:(0,n.warn)("Unimplemented graphic state "+a)}}},fill:function(){var e=this.current;e.element.setAttributeNS(null,"fill",e.fillColor),e.element.setAttributeNS(null,"fill-opacity",e.fillAlpha)},stroke:function(){var e=this.current;e.element.setAttributeNS(null,"stroke",e.strokeColor),e.element.setAttributeNS(null,"stroke-opacity",e.strokeAlpha),e.element.setAttributeNS(null,"stroke-miterlimit",t(e.miterLimit)),e.element.setAttributeNS(null,"stroke-linecap",e.lineCap),e.element.setAttributeNS(null,"stroke-linejoin",e.lineJoin),e.element.setAttributeNS(null,"stroke-width",t(e.lineWidth)+"px"),e.element.setAttributeNS(null,"stroke-dasharray",e.dashArray.map(t).join(" ")),e.element.setAttributeNS(null,"stroke-dashoffset",t(e.dashPhase)+"px"),e.element.setAttributeNS(null,"fill","none")},eoFill:function(){this.current.element.setAttributeNS(null,"fill-rule","evenodd"),this.fill()},fillStroke:function(){this.stroke(),this.fill()},eoFillStroke:function(){this.current.element.setAttributeNS(null,"fill-rule","evenodd"),this.fillStroke()},closeStroke:function(){this.closePath(),this.stroke()},closeFillStroke:function(){this.closePath(),this.fillStroke()},paintSolidColorImageMask:function(){var e=this.current,t=this.svgFactory.createElement("svg:rect");t.setAttributeNS(null,"x","0"),t.setAttributeNS(null,"y","0"),t.setAttributeNS(null,"width","1px"),t.setAttributeNS(null,"height","1px"),t.setAttributeNS(null,"fill",e.fillColor),this._ensureTransformGroup().appendChild(t)},paintJpegXObject:function(e,r,n){var i=this.objs.get(e),a=this.svgFactory.createElement("svg:image");a.setAttributeNS(u,"xlink:href",i.src),a.setAttributeNS(null,"width",t(r)),a.setAttributeNS(null,"height",t(n)),a.setAttributeNS(null,"x","0"),a.setAttributeNS(null,"y",t(-n)),a.setAttributeNS(null,"transform","scale("+t(1/r)+" "+t(-1/n)+")"),this._ensureTransformGroup().appendChild(a)},paintImageXObject:function(e){var t=this.objs.get(e);t?this.paintInlineImageXObject(t):(0,n.warn)("Dependent image isn't ready yet")},paintInlineImageXObject:function(e,r){var n=e.width,i=e.height,a=s(e,this.forceDataSchema),o=this.svgFactory.createElement("svg:rect");o.setAttributeNS(null,"x","0"),o.setAttributeNS(null,"y","0"),o.setAttributeNS(null,"width",t(n)),o.setAttributeNS(null,"height",t(i)),this.current.element=o,this.clip("nonzero");var l=this.svgFactory.createElement("svg:image");l.setAttributeNS(u,"xlink:href",a),l.setAttributeNS(null,"x","0"),l.setAttributeNS(null,"y",t(-i)),l.setAttributeNS(null,"width",t(n)+"px"),l.setAttributeNS(null,"height",t(i)+"px"),l.setAttributeNS(null,"transform","scale("+t(1/n)+" "+t(-1/i)+")"),r?r.appendChild(l):this._ensureTransformGroup().appendChild(l)},paintImageMaskXObject:function(e){var r=this.current,n=e.width,i=e.height,a=r.fillColor;r.maskId="mask"+f++;var o=this.svgFactory.createElement("svg:mask");o.setAttributeNS(null,"id",r.maskId);var s=this.svgFactory.createElement("svg:rect");s.setAttributeNS(null,"x","0"),s.setAttributeNS(null,"y","0"),s.setAttributeNS(null,"width",t(n)),s.setAttributeNS(null,"height",t(i)),s.setAttributeNS(null,"fill",a),s.setAttributeNS(null,"mask","url(#"+r.maskId+")"),this.defs.appendChild(o),this._ensureTransformGroup().appendChild(s),this.paintInlineImageXObject(e,o)},paintFormXObjectBegin:function(e,r){if(Array.isArray(e)&&6===e.length&&this.transform(e[0],e[1],e[2],e[3],e[4],e[5]),Array.isArray(r)&&4===r.length){var n=r[2]-r[0],i=r[3]-r[1],a=this.svgFactory.createElement("svg:rect");a.setAttributeNS(null,"x",r[0]),a.setAttributeNS(null,"y",r[1]),a.setAttributeNS(null,"width",t(n)),a.setAttributeNS(null,"height",t(i)),this.current.element=a,this.clip("nonzero"),this.endPath()}},paintFormXObjectEnd:function(){},_initialize:function(e){var t=this.svgFactory.create(e.width,e.height),n=this.svgFactory.createElement("svg:defs");t.appendChild(n),this.defs=n;var i=this.svgFactory.createElement("svg:g");return i.setAttributeNS(null,"transform",r(e.transform)),t.appendChild(i),this.svg=i,t},_ensureClipGroup:function(){if(!this.current.clipGroup){var e=this.svgFactory.createElement("svg:g");e.setAttributeNS(null,"clip-path",this.current.activeClipUrl),this.svg.appendChild(e),this.current.clipGroup=e}return this.current.clipGroup},_ensureTransformGroup:function(){return this.tgrp||(this.tgrp=this.svgFactory.createElement("svg:g"),this.tgrp.setAttributeNS(null,"transform",r(this.transformMatrix)),this.current.activeClipUrl?this._ensureClipGroup().appendChild(this.tgrp):this.svg.appendChild(this.tgrp)),this.tgrp}},a}(),t.SVGGraphics=a},function(e,t,r){"use strict";var n=r(0),i=r(82),a=r(48),o=r(52),s=r(51),l=r(7),u=r(53);if(n.isNodeJS()){var c=r(87).PDFNodeStream;a.setPDFNetworkStreamClass(c)}else if("undefined"!=typeof Response&&"body"in Response.prototype&&"undefined"!=typeof ReadableStream){var h=r(88).PDFFetchStream;a.setPDFNetworkStreamClass(h)}else{var d=r(89).PDFNetworkStream;a.setPDFNetworkStreamClass(d)}t.PDFJS=i.PDFJS,t.build=a.build,t.version=a.version,t.getDocument=a.getDocument,t.LoopbackPort=a.LoopbackPort,t.PDFDataRangeTransport=a.PDFDataRangeTransport,t.PDFWorker=a.PDFWorker,t.renderTextLayer=o.renderTextLayer,t.AnnotationLayer=s.AnnotationLayer,t.CustomStyle=l.CustomStyle,t.createPromiseCapability=n.createPromiseCapability,t.PasswordResponses=n.PasswordResponses,t.InvalidPDFException=n.InvalidPDFException,t.MissingPDFException=n.MissingPDFException,t.SVGGraphics=u.SVGGraphics,t.NativeImageDecoding=n.NativeImageDecoding,t.UnexpectedResponseException=n.UnexpectedResponseException,t.OPS=n.OPS,t.UNSUPPORTED_FEATURES=n.UNSUPPORTED_FEATURES,t.isValidUrl=l.isValidUrl,t.createValidAbsoluteUrl=n.createValidAbsoluteUrl,t.createObjectURL=n.createObjectURL,t.removeNullCharacters=n.removeNullCharacters,t.shadow=n.shadow,t.createBlob=n.createBlob,t.RenderingCancelledException=l.RenderingCancelledException,t.getFilenameFromUrl=l.getFilenameFromUrl,t.addLinkAttributes=l.addLinkAttributes,t.StatTimer=n.StatTimer},function(e,t,r){"use strict";var n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};if("undefined"==typeof PDFJS||!PDFJS.compatibilityChecked){var i=r(9),a="undefined"!=typeof navigator&&navigator.userAgent||"",o=/Android/.test(a),s=/Android\s[0-2][^\d]/.test(a),l=/Android\s[0-4][^\d]/.test(a),u=a.indexOf("Chrom")>=0,c=/Chrome\/(39|40)\./.test(a),h=a.indexOf("CriOS")>=0,d=a.indexOf("Trident")>=0,f=/\b(iPad|iPhone|iPod)(?=;)/.test(a),p=a.indexOf("Opera")>=0,m=/Safari\//.test(a)&&!/(Chrome\/|Android\s)/.test(a),g="object"===("undefined"==typeof window?"undefined":n(window))&&"object"===("undefined"==typeof document?"undefined":n(document));"undefined"==typeof PDFJS&&(i.PDFJS={}),PDFJS.compatibilityChecked=!0,function(){function e(e,t){return new l(this.slice(e,t))}function t(e,t){arguments.length<2&&(t=0);for(var r=0,n=e.length;r<n;++r,++t)this[t]=255&e[r]}function a(e,t){this.buffer=e,this.byteLength=e.length,this.length=t,s(this.length)}function o(e){return{get:function(){var t=this.buffer,r=e<<2;return(t[r]|t[r+1]<<8|t[r+2]<<16|t[r+3]<<24)>>>0},set:function(t){var r=this.buffer,n=e<<2;r[n]=255&t,r[n+1]=t>>8&255,r[n+2]=t>>16&255,r[n+3]=t>>>24&255}}}function s(e){for(;u<e;)Object.defineProperty(a.prototype,u,o(u)),u++}function l(r){var i,a,o;if("number"==typeof r)for(i=[],a=0;a<r;++a)i[a]=0;else if("slice"in r)i=r.slice(0);else for(i=[],a=0,o=r.length;a<o;++a)i[a]=r[a];return i.subarray=e,i.buffer=i,i.byteLength=i.length,i.set=t,"object"===(void 0===r?"undefined":n(r))&&r.buffer&&(i.buffer=r.buffer),i}if("undefined"==typeof Uint8ClampedArray&&(i.Uint8ClampedArray=r(56)),"undefined"!=typeof Uint8Array)return void 0===Uint8Array.prototype.subarray&&(Uint8Array.prototype.subarray=function(e,t){return new Uint8Array(this.slice(e,t))},Float32Array.prototype.subarray=function(e,t){return new Float32Array(this.slice(e,t))}),void("undefined"==typeof Float64Array&&(i.Float64Array=Float32Array));a.prototype=Object.create(null);var u=0;i.Uint8Array=l,i.Int8Array=l,i.Int32Array=l,i.Uint16Array=l,i.Float32Array=l,i.Float64Array=l,i.Uint32Array=function(){if(3===arguments.length){if(0!==arguments[1])throw new Error("offset !== 0 is not supported");return new a(arguments[0],arguments[2])}return l.apply(this,arguments)}}(),function(){if(g&&window.CanvasPixelArray){var e=window.CanvasPixelArray.prototype;"buffer"in e||(Object.defineProperty(e,"buffer",{get:function(){return this},enumerable:!1,configurable:!0}),Object.defineProperty(e,"byteLength",{get:function(){return this.length},enumerable:!1,configurable:!0}))}}(),i.URL||(i.URL=i.webkitURL),function(){if(void 0!==Object.defineProperty){var e=!0;try{g&&Object.defineProperty(new Image,"id",{value:"test"});var t=function(){};t.prototype={get id(){}},Object.defineProperty(new t,"id",{value:"",configurable:!0,enumerable:!0,writable:!1})}catch(t){e=!1}if(e)return}Object.defineProperty=function(e,t,r){delete e[t],"get"in r&&e.__defineGetter__(t,r.get),"set"in r&&e.__defineSetter__(t,r.set),"value"in r&&(e.__defineSetter__(t,function(e){return this.__defineGetter__(t,function(){return e}),e}),e[t]=r.value)}}(),function(){if("undefined"!=typeof XMLHttpRequest){var e=XMLHttpRequest.prototype,t=new XMLHttpRequest;"overrideMimeType"in t||Object.defineProperty(e,"overrideMimeType",{value:function(e){}}),"responseType"in t||(Object.defineProperty(e,"responseType",{get:function(){return this._responseType||"text"},set:function(e){"text"!==e&&"arraybuffer"!==e||(this._responseType=e,"arraybuffer"===e&&"function"==typeof this.overrideMimeType&&this.overrideMimeType("text/plain; charset=x-user-defined"))}}),"undefined"==typeof VBArray?Object.defineProperty(e,"response",{get:function(){if("arraybuffer"!==this.responseType)return this.responseText;var e,t=this.responseText,r=t.length,n=new Uint8Array(r);for(e=0;e<r;++e)n[e]=255&t.charCodeAt(e);return n.buffer}}):Object.defineProperty(e,"response",{get:function(){return"arraybuffer"===this.responseType?new Uint8Array(new VBArray(this.responseBody).toArray()):this.responseText}}))}}(),function(){if(!("btoa"in i)){var e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";i.btoa=function(t){var r,n,i="";for(r=0,n=t.length;r<n;r+=3){var a=255&t.charCodeAt(r),o=255&t.charCodeAt(r+1),s=255&t.charCodeAt(r+2),l=a>>2,u=(3&a)<<4|o>>4,c=r+1<n?(15&o)<<2|s>>6:64,h=r+2<n?63&s:64;i+=e.charAt(l)+e.charAt(u)+e.charAt(c)+e.charAt(h)}return i}}}(),function(){if(!("atob"in i)){i.atob=function(e){if((e=e.replace(/=+$/,"")).length%4==1)throw new Error("bad atob input");for(var t,r,n=0,i=0,a="";r=e.charAt(i++);~r&&(t=n%4?64*t+r:r,n++%4)?a+=String.fromCharCode(255&t>>(-2*n&6)):0)r="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(r);return a}}}(),void 0===Function.prototype.bind&&(Function.prototype.bind=function(e){var t=this,r=Array.prototype.slice.call(arguments,1);return function(){var n=r.concat(Array.prototype.slice.call(arguments));return t.apply(e,n)}}),g&&("dataset"in document.createElement("div")||Object.defineProperty(HTMLElement.prototype,"dataset",{get:function(){if(this._dataset)return this._dataset;for(var e={},t=0,r=this.attributes.length;t<r;t++){var n=this.attributes[t];"data-"===n.name.substring(0,5)&&(e[n.name.substring(5).replace(/\-([a-z])/g,function(e,t){return t.toUpperCase()})]=n.value)}return Object.defineProperty(this,"_dataset",{value:e,writable:!1,enumerable:!1}),e},enumerable:!0})),function(){function e(e,t,r,n){var i=(e.className||"").split(/\s+/g);""===i[0]&&i.shift();var a=i.indexOf(t);return a<0&&r&&i.push(t),a>=0&&n&&i.splice(a,1),e.className=i.join(" "),a>=0}if(g&&!("classList"in document.createElement("div"))){var t={add:function(t){e(this.element,t,!0,!1)},contains:function(t){return e(this.element,t,!1,!1)},remove:function(t){e(this.element,t,!1,!0)},toggle:function(t){e(this.element,t,!0,!0)}};Object.defineProperty(HTMLElement.prototype,"classList",{get:function(){if(this._classList)return this._classList;var e=Object.create(t,{element:{value:this,writable:!1,enumerable:!0}});return Object.defineProperty(this,"_classList",{value:e,writable:!1,enumerable:!1}),e},enumerable:!0})}}(),function(){if(!("undefined"==typeof importScripts||"console"in i)){var e={},t={log:function(){var e=Array.prototype.slice.call(arguments);i.postMessage({targetName:"main",action:"console_log",data:e})},error:function(){var e=Array.prototype.slice.call(arguments);i.postMessage({targetName:"main",action:"console_error",data:e})},time:function(t){e[t]=Date.now()},timeEnd:function(t){var r=e[t];if(!r)throw new Error("Unknown timer name "+t);this.log("Timer:",t,Date.now()-r)}};i.console=t}}(),function(){if(g){if("console"in window)return"bind"in console.log?void 0:(console.log=function(e){return function(t){return e(t)}}(console.log),console.error=function(e){return function(t){return e(t)}}(console.error),void(console.warn=function(e){return function(t){return e(t)}}(console.warn)));window.console={log:function(){},error:function(){},warn:function(){}}}}(),function(){function e(t){return t.disabled||t.parentNode&&e(t.parentNode)}p&&document.addEventListener("click",function(t){e(t.target)&&t.stopPropagation()},!0)}(),(d||h)&&(PDFJS.disableCreateObjectURL=!0),"undefined"!=typeof navigator&&("language"in navigator||(PDFJS.locale=navigator.userLanguage||"en-US")),(m||s||c||f)&&(PDFJS.disableRange=!0,PDFJS.disableStream=!0),g&&(history.pushState&&!s||(PDFJS.disableHistory=!0)),function(){if(g)if(window.CanvasPixelArray)"function"!=typeof window.CanvasPixelArray.prototype.set&&(window.CanvasPixelArray.prototype.set=function(e){for(var t=0,r=this.length;t<r;t++)this[t]=e[t]});else{var e,t=!1;if(u?t=(e=a.match(/Chrom(e|ium)\/([0-9]+)\./))&&parseInt(e[2])<21:o?t=l:m&&(t=(e=a.match(/Version\/([0-9]+)\.([0-9]+)\.([0-9]+) Safari\//))&&parseInt(e[1])<6),t){var r=window.CanvasRenderingContext2D.prototype,n=r.createImageData;r.createImageData=function(e,t){var r=n.call(this,e,t);return r.data.set=function(e){for(var t=0,r=this.length;t<r;t++)this[t]=e[t]},r},r=null}}}(),function(){function e(){window.requestAnimationFrame=function(e){return window.setTimeout(e,20)},window.cancelAnimationFrame=function(e){window.clearTimeout(e)}}g&&(f?e():"requestAnimationFrame"in window||(window.requestAnimationFrame=window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame,window.requestAnimationFrame||e()))}(),(f||o)&&(PDFJS.maxCanvasPixels=5242880),g&&d&&window.parent!==window&&(PDFJS.disableFullscreen=!0),g&&("currentScript"in document||Object.defineProperty(document,"currentScript",{get:function(){var e=document.getElementsByTagName("script");return e[e.length-1]},enumerable:!0,configurable:!0})),function(){if(g){var e=document.createElement("input");try{e.type="number"}catch(n){var t=e.constructor.prototype,r=Object.getOwnPropertyDescriptor(t,"type");Object.defineProperty(t,"type",{get:function(){return r.get.call(this)},set:function(e){r.set.call(this,"number"===e?"text":e)},enumerable:!0,configurable:!0})}}}(),function(){if(g&&document.attachEvent){var e=document.constructor.prototype,t=Object.getOwnPropertyDescriptor(e,"readyState");Object.defineProperty(e,"readyState",{get:function(){var e=t.get.call(this);return"interactive"===e?"loading":e},set:function(e){t.set.call(this,e)},enumerable:!0,configurable:!0})}}(),g&&void 0===Element.prototype.remove&&(Element.prototype.remove=function(){this.parentNode&&this.parentNode.removeChild(this)}),Number.isNaN||(Number.isNaN=function(e){return"number"==typeof e&&isNaN(e)}),Number.isInteger||(Number.isInteger=function(e){return"number"==typeof e&&isFinite(e)&&Math.floor(e)===e}),function(){if(i.Promise)return"function"!=typeof i.Promise.all&&(i.Promise.all=function(e){var t,r,n=0,a=[],o=new i.Promise(function(e,n){t=e,r=n});return e.forEach(function(e,i){n++,e.then(function(e){a[i]=e,0===--n&&t(a)},r)}),0===n&&t(a),o}),"function"!=typeof i.Promise.resolve&&(i.Promise.resolve=function(e){return new i.Promise(function(t){t(e)})}),"function"!=typeof i.Promise.reject&&(i.Promise.reject=function(e){return new i.Promise(function(t,r){r(e)})}),void("function"!=typeof i.Promise.prototype.catch&&(i.Promise.prototype.catch=function(e){return i.Promise.prototype.then(void 0,e)}));var e=2,t={handlers:[],running:!1,unhandledRejections:[],pendingRejectionCheck:!1,scheduleHandlers:function(e){0!==e._status&&(this.handlers=this.handlers.concat(e._handlers),e._handlers=[],this.running||(this.running=!0,setTimeout(this.runHandlers.bind(this),0)))},runHandlers:function(){for(var t=Date.now()+1;this.handlers.length>0;){var r=this.handlers.shift(),n=r.thisPromise._status,i=r.thisPromise._value;try{1===n?"function"==typeof r.onResolve&&(i=r.onResolve(i)):"function"==typeof r.onReject&&(i=r.onReject(i),n=1,r.thisPromise._unhandledRejection&&this.removeUnhandeledRejection(r.thisPromise))}catch(t){n=e,i=t}if(r.nextPromise._updateStatus(n,i),Date.now()>=t)break}this.handlers.length>0?setTimeout(this.runHandlers.bind(this),0):this.running=!1},addUnhandledRejection:function(e){this.unhandledRejections.push({promise:e,time:Date.now()}),this.scheduleRejectionCheck()},removeUnhandeledRejection:function(e){e._unhandledRejection=!1;for(var t=0;t<this.unhandledRejections.length;t++)this.unhandledRejections[t].promise===e&&(this.unhandledRejections.splice(t),t--)},scheduleRejectionCheck:function(){var e=this;this.pendingRejectionCheck||(this.pendingRejectionCheck=!0,setTimeout(function(){e.pendingRejectionCheck=!1;for(var t=Date.now(),r=0;r<e.unhandledRejections.length;r++)if(t-e.unhandledRejections[r].time>500){var n=e.unhandledRejections[r].promise._value,i="Unhandled rejection: "+n;n.stack&&(i+="\n"+n.stack);try{throw new Error(i)}catch(e){console.warn(i)}e.unhandledRejections.splice(r),r--}e.unhandledRejections.length&&e.scheduleRejectionCheck()},500))}},r=function(e){this._status=0,this._handlers=[];try{e.call(this,this._resolve.bind(this),this._reject.bind(this))}catch(e){this._reject(e)}};r.all=function(t){var n,i,a=new r(function(e,t){n=e,i=t}),o=t.length,s=[];if(0===o)return n(s),a;for(var l=0,u=t.length;l<u;++l){var c=t[l],h=function(t){return function(r){a._status!==e&&(s[t]=r,0===--o&&n(s))}}(l);r.isPromise(c)?c.then(h,function(t){a._status!==e&&(s=[],i(t))}):h(c)}return a},r.isPromise=function(e){return e&&"function"==typeof e.then},r.resolve=function(e){return new r(function(t){t(e)})},r.reject=function(e){return new r(function(t,r){r(e)})},r.prototype={_status:null,_value:null,_handlers:null,_unhandledRejection:null,_updateStatus:function(n,i){1!==this._status&&this._status!==e&&(1===n&&r.isPromise(i)?i.then(this._updateStatus.bind(this,1),this._updateStatus.bind(this,e)):(this._status=n,this._value=i,n===e&&0===this._handlers.length&&(this._unhandledRejection=!0,t.addUnhandledRejection(this)),t.scheduleHandlers(this)))},_resolve:function(e){this._updateStatus(1,e)},_reject:function(t){this._updateStatus(e,t)},then:function(e,n){var i=new r(function(e,t){this.resolve=e,this.reject=t});return this._handlers.push({thisPromise:this,onResolve:e,onReject:n,nextPromise:i}),t.scheduleHandlers(this),i},catch:function(e){return this.then(void 0,e)}},i.Promise=r}(),function(){function e(){this.id="$weakmap"+t++}if(!i.WeakMap){var t=0;e.prototype={has:function(e){return("object"===(void 0===e?"undefined":n(e))||"function"==typeof e)&&null!==e&&!!Object.getOwnPropertyDescriptor(e,this.id)},get:function(e){return this.has(e)?e[this.id]:void 0},set:function(e,t){Object.defineProperty(e,this.id,{value:t,enumerable:!1,configurable:!0})},delete:function(e){delete e[this.id]}},i.WeakMap=e}}(),function(){function e(e){return void 0!==d[e]}function t(){l.call(this),this._isInvalid=!0}function r(e){return""===e&&t.call(this),e.toLowerCase()}function a(e){var t=e.charCodeAt(0);return t>32&&t<127&&-1===[34,35,60,62,63,96].indexOf(t)?e:encodeURIComponent(e)}function o(e){var t=e.charCodeAt(0);return t>32&&t<127&&-1===[34,35,60,62,96].indexOf(t)?e:encodeURIComponent(e)}function s(n,i,s){function l(e){_.push(e)}var u=i||"scheme start",c=0,h="",v=!1,b=!1,_=[];e:for(;(n[c-1]!==p||0===c)&&!this._isInvalid;){var y=n[c];switch(u){case"scheme start":if(!y||!m.test(y)){if(i){l("Invalid scheme.");break e}h="",u="no scheme";continue}h+=y.toLowerCase(),u="scheme";break;case"scheme":if(y&&g.test(y))h+=y.toLowerCase();else{if(":"!==y){if(i){if(y===p)break e;l("Code point not allowed in scheme: "+y);break e}h="",c=0,u="no scheme";continue}if(this._scheme=h,h="",i)break e;e(this._scheme)&&(this._isRelative=!0),u="file"===this._scheme?"relative":this._isRelative&&s&&s._scheme===this._scheme?"relative or authority":this._isRelative?"authority first slash":"scheme data"}break;case"scheme data":"?"===y?(this._query="?",u="query"):"#"===y?(this._fragment="#",u="fragment"):y!==p&&"\t"!==y&&"\n"!==y&&"\r"!==y&&(this._schemeData+=a(y));break;case"no scheme":if(s&&e(s._scheme)){u="relative";continue}l("Missing scheme."),t.call(this);break;case"relative or authority":if("/"!==y||"/"!==n[c+1]){l("Expected /, got: "+y),u="relative";continue}u="authority ignore slashes";break;case"relative":if(this._isRelative=!0,"file"!==this._scheme&&(this._scheme=s._scheme),y===p){this._host=s._host,this._port=s._port,this._path=s._path.slice(),this._query=s._query,this._username=s._username,this._password=s._password;break e}if("/"===y||"\\"===y)"\\"===y&&l("\\ is an invalid code point."),u="relative slash";else if("?"===y)this._host=s._host,this._port=s._port,this._path=s._path.slice(),this._query="?",this._username=s._username,this._password=s._password,u="query";else{if("#"!==y){var A=n[c+1],S=n[c+2];("file"!==this._scheme||!m.test(y)||":"!==A&&"|"!==A||S!==p&&"/"!==S&&"\\"!==S&&"?"!==S&&"#"!==S)&&(this._host=s._host,this._port=s._port,this._username=s._username,this._password=s._password,this._path=s._path.slice(),this._path.pop()),u="relative path";continue}this._host=s._host,this._port=s._port,this._path=s._path.slice(),this._query=s._query,this._fragment="#",this._username=s._username,this._password=s._password,u="fragment"}break;case"relative slash":if("/"!==y&&"\\"!==y){"file"!==this._scheme&&(this._host=s._host,this._port=s._port,this._username=s._username,this._password=s._password),u="relative path";continue}"\\"===y&&l("\\ is an invalid code point."),u="file"===this._scheme?"file host":"authority ignore slashes";break;case"authority first slash":if("/"!==y){l("Expected '/', got: "+y),u="authority ignore slashes";continue}u="authority second slash";break;case"authority second slash":if(u="authority ignore slashes","/"!==y){l("Expected '/', got: "+y);continue}break;case"authority ignore slashes":if("/"!==y&&"\\"!==y){u="authority";continue}l("Expected authority, got: "+y);break;case"authority":if("@"===y){v&&(l("@ already seen."),h+="%40"),v=!0;for(var w=0;w<h.length;w++){var P=h[w];if("\t"!==P&&"\n"!==P&&"\r"!==P)if(":"!==P||null!==this._password){var R=a(P);null!==this._password?this._password+=R:this._username+=R}else this._password="";else l("Invalid whitespace in authority.")}h=""}else{if(y===p||"/"===y||"\\"===y||"?"===y||"#"===y){c-=h.length,h="",u="host";continue}h+=y}break;case"file host":if(y===p||"/"===y||"\\"===y||"?"===y||"#"===y){2!==h.length||!m.test(h[0])||":"!==h[1]&&"|"!==h[1]?0===h.length?u="relative path start":(this._host=r.call(this,h),h="",u="relative path start"):u="relative path";continue}"\t"===y||"\n"===y||"\r"===y?l("Invalid whitespace in file host."):h+=y;break;case"host":case"hostname":if(":"!==y||b){if(y===p||"/"===y||"\\"===y||"?"===y||"#"===y){if(this._host=r.call(this,h),h="",u="relative path start",i)break e;continue}"\t"!==y&&"\n"!==y&&"\r"!==y?("["===y?b=!0:"]"===y&&(b=!1),h+=y):l("Invalid code point in host/hostname: "+y)}else if(this._host=r.call(this,h),h="",u="port","hostname"===i)break e;break;case"port":if(/[0-9]/.test(y))h+=y;else{if(y===p||"/"===y||"\\"===y||"?"===y||"#"===y||i){if(""!==h){var C=parseInt(h,10);C!==d[this._scheme]&&(this._port=C+""),h=""}if(i)break e;u="relative path start";continue}"\t"===y||"\n"===y||"\r"===y?l("Invalid code point in port: "+y):t.call(this)}break;case"relative path start":if("\\"===y&&l("'\\' not allowed in path."),u="relative path","/"!==y&&"\\"!==y)continue;break;case"relative path":if(y!==p&&"/"!==y&&"\\"!==y&&(i||"?"!==y&&"#"!==y))"\t"!==y&&"\n"!==y&&"\r"!==y&&(h+=a(y));else{"\\"===y&&l("\\ not allowed in relative path.");var k;(k=f[h.toLowerCase()])&&(h=k),".."===h?(this._path.pop(),"/"!==y&&"\\"!==y&&this._path.push("")):"."===h&&"/"!==y&&"\\"!==y?this._path.push(""):"."!==h&&("file"===this._scheme&&0===this._path.length&&2===h.length&&m.test(h[0])&&"|"===h[1]&&(h=h[0]+":"),this._path.push(h)),h="","?"===y?(this._query="?",u="query"):"#"===y&&(this._fragment="#",u="fragment")}break;case"query":i||"#"!==y?y!==p&&"\t"!==y&&"\n"!==y&&"\r"!==y&&(this._query+=o(y)):(this._fragment="#",u="fragment");break;case"fragment":y!==p&&"\t"!==y&&"\n"!==y&&"\r"!==y&&(this._fragment+=y)}c++}}function l(){this._scheme="",this._schemeData="",this._username="",this._password=null,this._host="",this._port="",this._path=[],this._query="",this._fragment="",this._isInvalid=!1,this._isRelative=!1}function u(e,t){void 0===t||t instanceof u||(t=new u(String(t))),this._url=e,l.call(this);var r=e.replace(/^[ \t\r\n\f]+|[ \t\r\n\f]+$/g,"");s.call(this,r,null,t)}var c=!1;try{if("function"==typeof URL&&"object"===n(URL.prototype)&&"origin"in URL.prototype){var h=new URL("b","http://a");h.pathname="c%20d",c="http://a/c%20d"===h.href}}catch(e){}if(!c){var d=Object.create(null);d.ftp=21,d.file=0,d.gopher=70,d.http=80,d.https=443,d.ws=80,d.wss=443;var f=Object.create(null);f["%2e"]=".",f[".%2e"]="..",f["%2e."]="..",f["%2e%2e"]="..";var p,m=/[a-zA-Z]/,g=/[a-zA-Z0-9\+\-\.]/;u.prototype={toString:function(){return this.href},get href(){if(this._isInvalid)return this._url;var e="";return""===this._username&&null===this._password||(e=this._username+(null!==this._password?":"+this._password:"")+"@"),this.protocol+(this._isRelative?"//"+e+this.host:"")+this.pathname+this._query+this._fragment},set href(e){l.call(this),s.call(this,e)},get protocol(){return this._scheme+":"},set protocol(e){this._isInvalid||s.call(this,e+":","scheme start")},get host(){return this._isInvalid?"":this._port?this._host+":"+this._port:this._host},set host(e){!this._isInvalid&&this._isRelative&&s.call(this,e,"host")},get hostname(){return this._host},set hostname(e){!this._isInvalid&&this._isRelative&&s.call(this,e,"hostname")},get port(){return this._port},set port(e){!this._isInvalid&&this._isRelative&&s.call(this,e,"port")},get pathname(){return this._isInvalid?"":this._isRelative?"/"+this._path.join("/"):this._schemeData},set pathname(e){!this._isInvalid&&this._isRelative&&(this._path=[],s.call(this,e,"relative path start"))},get search(){return this._isInvalid||!this._query||"?"===this._query?"":this._query},set search(e){!this._isInvalid&&this._isRelative&&(this._query="?","?"===e[0]&&(e=e.slice(1)),s.call(this,e,"query"))},get hash(){return this._isInvalid||!this._fragment||"#"===this._fragment?"":this._fragment},set hash(e){this._isInvalid||(this._fragment="#","#"===e[0]&&(e=e.slice(1)),s.call(this,e,"fragment"))},get origin(){var e;if(this._isInvalid||!this._scheme)return"";switch(this._scheme){case"data":case"file":case"javascript":case"mailto":return"null";case"blob":try{return new u(this._schemeData).origin||"null"}catch(e){}return"null"}return(e=this.host)?this._scheme+"://"+e:""}};var v=i.URL;v&&(u.createObjectURL=function(e){return v.createObjectURL.apply(v,arguments)},u.revokeObjectURL=function(e){v.revokeObjectURL(e)}),i.URL=u}}()}},function(e,t,r){"use strict";r(57),e.exports=r(16).Uint8ClampedArray},function(e,t,r){"use strict";r(58)("Uint8",1,function(e){return function(t,r,n){return e(this,t,r,n)}},!0)},function(e,t,r){"use strict";var n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};if(r(3)){var i=r(21),a=r(2),o=r(15),s=r(30),l=r(34),u=r(59),c=r(24),h=r(36),d=r(18),f=r(4),p=r(35),m=r(12),g=r(6),v=r(37),b=r(20),_=r(22),y=r(5),A=r(45),S=r(10),w=r(13),P=r(60),R=r(46),C=r(47),k=r(38).f,x=r(64),T=r(11),E=r(1),O=r(65),I=r(42),L=r(69),F=r(70),D=r(14),j=r(75),M=r(76),N=r(44),q=r(77),W=r(8),U=r(78),B=W.f,z=U.f,G=a.RangeError,H=a.TypeError,X=a.Uint8Array,V=Array.prototype,Y=u.ArrayBuffer,J=u.DataView,Q=O(0),K=O(2),Z=O(3),$=O(4),ee=O(5),te=O(6),re=I(!0),ne=I(!1),ie=F.values,ae=F.keys,oe=F.entries,se=V.lastIndexOf,le=V.reduce,ue=V.reduceRight,ce=V.join,he=V.sort,de=V.slice,fe=V.toString,pe=V.toLocaleString,me=E("iterator"),ge=E("toStringTag"),ve=T("typed_constructor"),be=T("def_constructor"),_e=l.CONSTR,ye=l.TYPED,Ae=l.VIEW,Se=O(1,function(e,t){return ke(L(e,e[be]),t)}),we=o(function(){return 1===new X(new Uint16Array([1]).buffer)[0]}),Pe=!!X&&!!X.prototype.set&&o(function(){new X(1).set({})}),Re=function(e,t){var r=m(e);if(r<0||r%t)throw G("Wrong offset!");return r},Ce=function(e){if(S(e)&&ye in e)return e;throw H(e+" is not a typed array!")},ke=function(e,t){if(!(S(e)&&ve in e))throw H("It is not a typed array constructor!");return new e(t)},xe=function(e,t){return Te(L(e,e[be]),t)},Te=function(e,t){for(var r=0,n=t.length,i=ke(e,n);n>r;)i[r]=t[r++];return i},Ee=function(e,t,r){B(e,t,{get:function(){return this._d[r]}})},Oe=function(e){var t,r,n,i,a,o,s=w(e),l=arguments.length,u=l>1?arguments[1]:void 0,h=void 0!==u,d=x(s);if(void 0!=d&&!P(d)){for(o=d.call(s),n=[],t=0;!(a=o.next()).done;t++)n.push(a.value);s=n}for(h&&l>2&&(u=c(u,arguments[2],2)),t=0,r=g(s.length),i=ke(this,r);r>t;t++)i[t]=h?u(s[t],t):s[t];return i},Ie=function(){for(var e=0,t=arguments.length,r=ke(this,t);t>e;)r[e]=arguments[e++];return r},Le=!!X&&o(function(){pe.call(new X(1))}),Fe=function(){return pe.apply(Le?de.call(Ce(this)):Ce(this),arguments)},De={copyWithin:function(e,t){return q.call(Ce(this),e,t,arguments.length>2?arguments[2]:void 0)},every:function(e){return $(Ce(this),e,arguments.length>1?arguments[1]:void 0)},fill:function(e){return N.apply(Ce(this),arguments)},filter:function(e){return xe(this,K(Ce(this),e,arguments.length>1?arguments[1]:void 0))},find:function(e){return ee(Ce(this),e,arguments.length>1?arguments[1]:void 0)},findIndex:function(e){return te(Ce(this),e,arguments.length>1?arguments[1]:void 0)},forEach:function(e){Q(Ce(this),e,arguments.length>1?arguments[1]:void 0)},indexOf:function(e){return ne(Ce(this),e,arguments.length>1?arguments[1]:void 0)},includes:function(e){return re(Ce(this),e,arguments.length>1?arguments[1]:void 0)},join:function(e){return ce.apply(Ce(this),arguments)},lastIndexOf:function(e){return se.apply(Ce(this),arguments)},map:function(e){return Se(Ce(this),e,arguments.length>1?arguments[1]:void 0)},reduce:function(e){return le.apply(Ce(this),arguments)},reduceRight:function(e){return ue.apply(Ce(this),arguments)},reverse:function(){for(var e,t=this,r=Ce(t).length,n=Math.floor(r/2),i=0;i<n;)e=t[i],t[i++]=t[--r],t[r]=e;return t},some:function(e){return Z(Ce(this),e,arguments.length>1?arguments[1]:void 0)},sort:function(e){return he.call(Ce(this),e)},subarray:function(e,t){var r=Ce(this),n=r.length,i=b(e,n);return new(L(r,r[be]))(r.buffer,r.byteOffset+i*r.BYTES_PER_ELEMENT,g((void 0===t?n:b(t,n))-i))}},je=function(e,t){return xe(this,de.call(Ce(this),e,t))},Me=function(e){Ce(this);var t=Re(arguments[1],1),r=this.length,n=w(e),i=g(n.length),a=0;if(i+t>r)throw G("Wrong length!");for(;a<i;)this[t+a]=n[a++]},Ne={entries:function(){return oe.call(Ce(this))},keys:function(){return ae.call(Ce(this))},values:function(){return ie.call(Ce(this))}},qe=function(e,t){return S(e)&&e[ye]&&"symbol"!=(void 0===t?"undefined":n(t))&&t in e&&String(+t)==String(t)},We=function(e,t){return qe(e,t=_(t,!0))?d(2,e[t]):z(e,t)},Ue=function(e,t,r){return!(qe(e,t=_(t,!0))&&S(r)&&y(r,"value"))||y(r,"get")||y(r,"set")||r.configurable||y(r,"writable")&&!r.writable||y(r,"enumerable")&&!r.enumerable?B(e,t,r):(e[t]=r.value,e)};_e||(U.f=We,W.f=Ue),s(s.S+s.F*!_e,"Object",{getOwnPropertyDescriptor:We,defineProperty:Ue}),o(function(){fe.call({})})&&(fe=pe=function(){return ce.call(this)});var Be=p({},De);p(Be,Ne),f(Be,me,Ne.values),p(Be,{slice:je,set:Me,constructor:function(){},toString:fe,toLocaleString:Fe}),Ee(Be,"buffer","b"),Ee(Be,"byteOffset","o"),Ee(Be,"byteLength","l"),Ee(Be,"length","e"),B(Be,ge,{get:function(){return this[ye]}}),e.exports=function(e,t,r,n){var u=e+((n=!!n)?"Clamped":"")+"Array",c="get"+e,d="set"+e,p=a[u],m=p||{},b=p&&C(p),_=!p||!l.ABV,y={},w=p&&p.prototype,P=function(e,r){var n=e._d;return n.v[c](r*t+n.o,we)},x=function(e,r,i){var a=e._d;n&&(i=(i=Math.round(i))<0?0:i>255?255:255&i),a.v[d](r*t+a.o,i,we)},T=function(e,t){B(e,t,{get:function(){return P(this,t)},set:function(e){return x(this,t,e)},enumerable:!0})};_?(p=r(function(e,r,n,i){h(e,p,u,"_d");var a,o,s,l,c=0,d=0;if(S(r)){if(!(r instanceof Y||"ArrayBuffer"==(l=A(r))||"SharedArrayBuffer"==l))return ye in r?Te(p,r):Oe.call(p,r);a=r,d=Re(n,t);var m=r.byteLength;if(void 0===i){if(m%t)throw G("Wrong length!");if((o=m-d)<0)throw G("Wrong length!")}else if((o=g(i)*t)+d>m)throw G("Wrong length!");s=o/t}else s=v(r),a=new Y(o=s*t);for(f(e,"_d",{b:a,o:d,l:o,e:s,v:new J(a)});c<s;)T(e,c++)}),w=p.prototype=R(Be),f(w,"constructor",p)):o(function(){p(1)})&&o(function(){new p(-1)})&&j(function(e){new p,new p(null),new p(1.5),new p(e)},!0)||(p=r(function(e,r,n,i){h(e,p,u);var a;return S(r)?r instanceof Y||"ArrayBuffer"==(a=A(r))||"SharedArrayBuffer"==a?void 0!==i?new m(r,Re(n,t),i):void 0!==n?new m(r,Re(n,t)):new m(r):ye in r?Te(p,r):Oe.call(p,r):new m(v(r))}),Q(b!==Function.prototype?k(m).concat(k(b)):k(m),function(e){e in p||f(p,e,m[e])}),p.prototype=w,i||(w.constructor=p));var E=w[me],O=!!E&&("values"==E.name||void 0==E.name),I=Ne.values;f(p,ve,!0),f(w,ye,u),f(w,Ae,!0),f(w,be,p),(n?new p(1)[ge]==u:ge in w)||B(w,ge,{get:function(){return u}}),y[u]=p,s(s.G+s.W+s.F*(p!=m),y),s(s.S,u,{BYTES_PER_ELEMENT:t}),s(s.S+s.F*o(function(){m.of.call(p,1)}),u,{from:Oe,of:Ie}),"BYTES_PER_ELEMENT"in w||f(w,"BYTES_PER_ELEMENT",t),s(s.P,u,De),M(u),s(s.P+s.F*Pe,u,{set:Me}),s(s.P+s.F*!O,u,Ne),i||w.toString==fe||(w.toString=fe),s(s.P+s.F*o(function(){new p(1).slice()}),u,{slice:je}),s(s.P+s.F*(o(function(){return[1,2].toLocaleString()!=new p([1,2]).toLocaleString()})||!o(function(){w.toLocaleString.call([1,2])})),u,{toLocaleString:Fe}),D[u]=O?E:I,i||O||f(w,me,I)}}else e.exports=function(){}},function(e,t,r){"use strict";function n(e,t,r){var n,i,a,o=Array(r),s=8*r-t-1,l=(1<<s)-1,u=l>>1,c=23===t?N(2,-24)-N(2,-77):0,h=0,d=e<0||0===e&&1/e<0?1:0;for((e=M(e))!=e||e===D?(i=e!=e?1:0,n=l):(n=q(W(e)/U),e*(a=N(2,-n))<1&&(n--,a*=2),(e+=n+u>=1?c/a:c*N(2,1-u))*a>=2&&(n++,a/=2),n+u>=l?(i=0,n=l):n+u>=1?(i=(e*a-1)*N(2,t),n+=u):(i=e*N(2,u-1)*N(2,t),n=0));t>=8;o[h++]=255&i,i/=256,t-=8);for(n=n<<t|i,s+=t;s>0;o[h++]=255&n,n/=256,s-=8);return o[--h]|=128*d,o}function i(e,t,r){var n,i=8*r-t-1,a=(1<<i)-1,o=a>>1,s=i-7,l=r-1,u=e[l--],c=127&u;for(u>>=7;s>0;c=256*c+e[l],l--,s-=8);for(n=c&(1<<-s)-1,c>>=-s,s+=t;s>0;n=256*n+e[l],l--,s-=8);if(0===c)c=1-o;else{if(c===a)return n?NaN:u?-D:D;n+=N(2,t),c-=o}return(u?-1:1)*n*N(2,c-t)}function a(e){return e[3]<<24|e[2]<<16|e[1]<<8|e[0]}function o(e){return[255&e]}function s(e){return[255&e,e>>8&255]}function l(e){return[255&e,e>>8&255,e>>16&255,e>>24&255]}function u(e){return n(e,52,8)}function c(e){return n(e,23,4)}function h(e,t,r){C(e[T],t,{get:function(){return this[r]}})}function d(e,t,r,n){var i=P(+r);if(i+t>e[z])throw F(E);var a=e[B]._b,o=i+e[G],s=a.slice(o,o+t);return n?s:s.reverse()}function f(e,t,r,n,i,a){var o=P(+r);if(o+t>e[z])throw F(E);for(var s=e[B]._b,l=o+e[G],u=n(+i),c=0;c<t;c++)s[l+c]=u[a?c:t-c-1]}var p=r(2),m=r(3),g=r(21),v=r(34),b=r(4),_=r(35),y=r(15),A=r(36),S=r(12),w=r(6),P=r(37),R=r(38).f,C=r(8).f,k=r(44),x=r(28),T="prototype",E="Wrong index!",O=p.ArrayBuffer,I=p.DataView,L=p.Math,F=p.RangeError,D=p.Infinity,j=O,M=L.abs,N=L.pow,q=L.floor,W=L.log,U=L.LN2,B=m?"_b":"buffer",z=m?"_l":"byteLength",G=m?"_o":"byteOffset";if(v.ABV){if(!y(function(){O(1)})||!y(function(){new O(-1)})||y(function(){return new O,new O(1.5),new O(NaN),"ArrayBuffer"!=O.name})){for(var H,X=(O=function(e){return A(this,O),new j(P(e))})[T]=j[T],V=R(j),Y=0;V.length>Y;)(H=V[Y++])in O||b(O,H,j[H]);g||(X.constructor=O)}var J=new I(new O(2)),Q=I[T].setInt8;J.setInt8(0,2147483648),J.setInt8(1,2147483649),!J.getInt8(0)&&J.getInt8(1)||_(I[T],{setInt8:function(e,t){Q.call(this,e,t<<24>>24)},setUint8:function(e,t){Q.call(this,e,t<<24>>24)}},!0)}else O=function(e){A(this,O,"ArrayBuffer");var t=P(e);this._b=k.call(Array(t),0),this[z]=t},I=function(e,t,r){A(this,I,"DataView"),A(e,O,"DataView");var n=e[z],i=S(t);if(i<0||i>n)throw F("Wrong offset!");if(r=void 0===r?n-i:w(r),i+r>n)throw F("Wrong length!");this[B]=e,this[G]=i,this[z]=r},m&&(h(O,"byteLength","_l"),h(I,"buffer","_b"),h(I,"byteLength","_l"),h(I,"byteOffset","_o")),_(I[T],{getInt8:function(e){return d(this,1,e)[0]<<24>>24},getUint8:function(e){return d(this,1,e)[0]},getInt16:function(e){var t=d(this,2,e,arguments[1]);return(t[1]<<8|t[0])<<16>>16},getUint16:function(e){var t=d(this,2,e,arguments[1]);return t[1]<<8|t[0]},getInt32:function(e){return a(d(this,4,e,arguments[1]))},getUint32:function(e){return a(d(this,4,e,arguments[1]))>>>0},getFloat32:function(e){return i(d(this,4,e,arguments[1]),23,4)},getFloat64:function(e){return i(d(this,8,e,arguments[1]),52,8)},setInt8:function(e,t){f(this,1,e,o,t)},setUint8:function(e,t){f(this,1,e,o,t)},setInt16:function(e,t){f(this,2,e,s,t,arguments[2])},setUint16:function(e,t){f(this,2,e,s,t,arguments[2])},setInt32:function(e,t){f(this,4,e,l,t,arguments[2])},setUint32:function(e,t){f(this,4,e,l,t,arguments[2])},setFloat32:function(e,t){f(this,4,e,c,t,arguments[2])},setFloat64:function(e,t){f(this,8,e,u,t,arguments[2])}});x(O,"ArrayBuffer"),x(I,"DataView"),b(I[T],v.VIEW,!0),t.ArrayBuffer=O,t.DataView=I},function(e,t,r){"use strict";var n=r(14),i=r(1)("iterator"),a=Array.prototype;e.exports=function(e){return void 0!==e&&(n.Array===e||a[i]===e)}},function(e,t,r){"use strict";var n=r(8),i=r(17),a=r(62);e.exports=r(3)?Object.defineProperties:function(e,t){i(e);for(var r,o=a(t),s=o.length,l=0;s>l;)n.f(e,r=o[l++],t[r]);return e}},function(e,t,r){"use strict";var n=r(39),i=r(27);e.exports=Object.keys||function(e){return n(e,i)}},function(e,t,r){"use strict";var n=r(2).document;e.exports=n&&n.documentElement},function(e,t,r){"use strict";var n=r(45),i=r(1)("iterator"),a=r(14);e.exports=r(16).getIteratorMethod=function(e){if(void 0!=e)return e[i]||e["@@iterator"]||a[n(e)]}},function(e,t,r){"use strict";var n=r(24),i=r(40),a=r(13),o=r(6),s=r(66);e.exports=function(e,t){var r=1==e,l=2==e,u=3==e,c=4==e,h=6==e,d=5==e||h,f=t||s;return function(t,s,p){for(var m,g,v=a(t),b=i(v),_=n(s,p,3),y=o(b.length),A=0,S=r?f(t,y):l?f(t,0):void 0;y>A;A++)if((d||A in b)&&(m=b[A],g=_(m,A,v),e))if(r)S[A]=g;else if(g)switch(e){case 3:return!0;case 5:return m;case 6:return A;case 2:S.push(m)}else if(c)return!1;return h?-1:u||c?c:S}}},function(e,t,r){"use strict";var n=r(67);e.exports=function(e,t){return new(n(e))(t)}},function(e,t,r){"use strict";var n=r(10),i=r(68),a=r(1)("species");e.exports=function(e){var t;return i(e)&&("function"!=typeof(t=e.constructor)||t!==Array&&!i(t.prototype)||(t=void 0),n(t)&&null===(t=t[a])&&(t=void 0)),void 0===t?Array:t}},function(e,t,r){"use strict";var n=r(25);e.exports=Array.isArray||function(e){return"Array"==n(e)}},function(e,t,r){"use strict";var n=r(17),i=r(33),a=r(1)("species");e.exports=function(e,t){var r,o=n(e).constructor;return void 0===o||void 0==(r=n(o)[a])?t:i(r)}},function(e,t,r){"use strict";var n=r(71),i=r(72),a=r(14),o=r(19);e.exports=r(73)(Array,"Array",function(e,t){this._t=o(e),this._i=0,this._k=t},function(){var e=this._t,t=this._k,r=this._i++;return!e||r>=e.length?(this._t=void 0,i(1)):"keys"==t?i(0,r):"values"==t?i(0,e[r]):i(0,[r,e[r]])},"values"),a.Arguments=a.Array,n("keys"),n("values"),n("entries")},function(e,t,r){"use strict";var n=r(1)("unscopables"),i=Array.prototype;void 0==i[n]&&r(4)(i,n,{}),e.exports=function(e){i[n][e]=!0}},function(e,t,r){"use strict";e.exports=function(e,t){return{value:t,done:!!e}}},function(e,t,r){"use strict";var n=r(21),i=r(30),a=r(23),o=r(4),s=r(5),l=r(14),u=r(74),c=r(28),h=r(47),d=r(1)("iterator"),f=!([].keys&&"next"in[].keys()),p=function(){return this};e.exports=function(e,t,r,m,g,v,b){u(r,t,m);var _,y,A,S=function(e){if(!f&&e in C)return C[e];switch(e){case"keys":case"values":return function(){return new r(this,e)}}return function(){return new r(this,e)}},w=t+" Iterator",P="values"==g,R=!1,C=e.prototype,k=C[d]||C["@@iterator"]||g&&C[g],x=k||S(g),T=g?P?S("entries"):x:void 0,E="Array"==t?C.entries||k:k;if(E&&(A=h(E.call(new e)))!==Object.prototype&&A.next&&(c(A,w,!0),n||s(A,d)||o(A,d,p)),P&&k&&"values"!==k.name&&(R=!0,x=function(){return k.call(this)}),n&&!b||!f&&!R&&C[d]||o(C,d,x),l[t]=x,l[w]=p,g)if(_={values:P?x:S("values"),keys:v?x:S("keys"),entries:T},b)for(y in _)y in C||a(C,y,_[y]);else i(i.P+i.F*(f||R),t,_);return _}},function(e,t,r){"use strict";var n=r(46),i=r(18),a=r(28),o={};r(4)(o,r(1)("iterator"),function(){return this}),e.exports=function(e,t,r){e.prototype=n(o,{next:i(1,r)}),a(e,t+" Iterator")}},function(e,t,r){"use strict";var n=r(1)("iterator"),i=!1;try{var a=[7][n]();a.return=function(){i=!0},Array.from(a,function(){throw 2})}catch(e){}e.exports=function(e,t){if(!t&&!i)return!1;var r=!1;try{var a=[7],o=a[n]();o.next=function(){return{done:r=!0}},a[n]=function(){return o},e(a)}catch(e){}return r}},function(e,t,r){"use strict";var n=r(2),i=r(8),a=r(3),o=r(1)("species");e.exports=function(e){var t=n[e];a&&t&&!t[o]&&i.f(t,o,{configurable:!0,get:function(){return this}})}},function(e,t,r){"use strict";var n=r(13),i=r(20),a=r(6);e.exports=[].copyWithin||function(e,t){var r=n(this),o=a(r.length),s=i(e,o),l=i(t,o),u=arguments.length>2?arguments[2]:void 0,c=Math.min((void 0===u?o:i(u,o))-l,o-s),h=1;for(l<s&&s<l+c&&(h=-1,l+=c-1,s+=c-1);c-- >0;)l in r?r[s]=r[l]:delete r[s],s+=h,l+=h;return r}},function(e,t,r){"use strict";var n=r(79),i=r(18),a=r(19),o=r(22),s=r(5),l=r(31),u=Object.getOwnPropertyDescriptor;t.f=r(3)?u:function(e,t){if(e=a(e),t=o(t,!0),l)try{return u(e,t)}catch(e){}if(s(e,t))return i(!n.f.call(e,t),e[t])}},function(e,t,r){"use strict";t.f={}.propertyIsEnumerable},function(e,t,r){"use strict";var n=!1;if("undefined"!=typeof ReadableStream)try{new ReadableStream({start:function(e){e.close()}}),n=!0}catch(e){}t.ReadableStream=n?ReadableStream:r(81).ReadableStream},function(e,t,r){"use strict";var n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};!function(e,t){for(var r in t)e[r]=t[r]}(t,function(e){function t(n){if(r[n])return r[n].exports;var i=r[n]={i:n,l:!1,exports:{}};return e[n].call(i.exports,i,i.exports,t),i.l=!0,i.exports}var r={};return t.m=e,t.c=r,t.i=function(e){return e},t.d=function(e,r,n){t.o(e,r)||Object.defineProperty(e,r,{configurable:!1,enumerable:!0,get:n})},t.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(r,"a",r),r},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=7)}([function(e,t,r){function i(e){return"string"==typeof e||"symbol"===(void 0===e?"undefined":o(e))}function a(e,t,r){if("function"!=typeof e)throw new TypeError("Argument is not a function");return Function.prototype.apply.call(e,t,r)}var o="function"==typeof Symbol&&"symbol"===n(Symbol.iterator)?function(e){return void 0===e?"undefined":n(e)}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":void 0===e?"undefined":n(e)},s=r(1).assert;t.typeIsObject=function(e){return"object"===(void 0===e?"undefined":o(e))&&null!==e||"function"==typeof e},t.createDataProperty=function(e,r,n){s(t.typeIsObject(e)),Object.defineProperty(e,r,{value:n,writable:!0,enumerable:!0,configurable:!0})},t.createArrayFromList=function(e){return e.slice()},t.ArrayBufferCopy=function(e,t,r,n,i){new Uint8Array(e).set(new Uint8Array(r,n,i),t)},t.CreateIterResultObject=function(e,t){s("boolean"==typeof t);var r={};return Object.defineProperty(r,"value",{value:e,enumerable:!0,writable:!0,configurable:!0}),Object.defineProperty(r,"done",{value:t,enumerable:!0,writable:!0,configurable:!0}),r},t.IsFiniteNonNegativeNumber=function(e){return!Number.isNaN(e)&&(e!==1/0&&!(e<0))},t.InvokeOrNoop=function(e,t,r){s(void 0!==e),s(i(t)),s(Array.isArray(r));var n=e[t];if(void 0!==n)return a(n,e,r)},t.PromiseInvokeOrNoop=function(e,r,n){s(void 0!==e),s(i(r)),s(Array.isArray(n));try{return Promise.resolve(t.InvokeOrNoop(e,r,n))}catch(e){return Promise.reject(e)}},t.PromiseInvokeOrPerformFallback=function(e,t,r,n,o){s(void 0!==e),s(i(t)),s(Array.isArray(r)),s(Array.isArray(o));var l=void 0;try{l=e[t]}catch(e){return Promise.reject(e)}if(void 0===l)return n.apply(null,o);try{return Promise.resolve(a(l,e,r))}catch(e){return Promise.reject(e)}},t.TransferArrayBuffer=function(e){return e.slice()},t.ValidateAndNormalizeHighWaterMark=function(e){if(e=Number(e),Number.isNaN(e)||e<0)throw new RangeError("highWaterMark property of a queuing strategy must be non-negative and non-NaN");return e},t.ValidateAndNormalizeQueuingStrategy=function(e,r){if(void 0!==e&&"function"!=typeof e)throw new TypeError("size property of a queuing strategy must be a function");return r=t.ValidateAndNormalizeHighWaterMark(r),{size:e,highWaterMark:r}}},function(e,t,r){function n(e){this.name="AssertionError",this.message=e||"",this.stack=(new Error).stack}n.prototype=Object.create(Error.prototype),n.prototype.constructor=n,e.exports={rethrowAssertionErrorRejection:function(e){e&&e.constructor===n&&setTimeout(function(){throw e},0)},AssertionError:n,assert:function(e,t){if(!e)throw new n(t)}}},function(e,t,r){function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e){return new be(e)}function a(e){return!!le(e)&&!!Object.prototype.hasOwnProperty.call(e,"_writableStreamController")}function o(e){return ce(!0===a(e),"IsWritableStreamLocked should only be used on known writable streams"),void 0!==e._writer}function s(e,t){var r=e._state;if("closed"===r)return Promise.resolve(void 0);if("errored"===r)return Promise.reject(e._storedError);var n=new TypeError("Requested to abort");if(void 0!==e._pendingAbortRequest)return Promise.reject(n);ce("writable"===r||"erroring"===r,"state must be writable or erroring");var i=!1;"erroring"===r&&(i=!0,t=void 0);var a=new Promise(function(r,n){e._pendingAbortRequest={_resolve:r,_reject:n,_reason:t,_wasAlreadyErroring:i}});return!1===i&&c(e,n),a}function l(e){return ce(!0===o(e)),ce("writable"===e._state),new Promise(function(t,r){var n={_resolve:t,_reject:r};e._writeRequests.push(n)})}function u(e,t){var r=e._state;"writable"!==r?(ce("erroring"===r),h(e)):c(e,t)}function c(e,t){ce(void 0===e._storedError,"stream._storedError === undefined"),ce("writable"===e._state,"state must be writable");var r=e._writableStreamController;ce(void 0!==r,"controller must not be undefined"),e._state="erroring",e._storedError=t;var n=e._writer;void 0!==n&&C(n,t),!1===v(e)&&!0===r._started&&h(e)}function h(e){ce("erroring"===e._state,"stream._state === erroring"),ce(!1===v(e),"WritableStreamHasOperationMarkedInFlight(stream) === false"),e._state="errored",e._writableStreamController.__errorSteps();for(var t=e._storedError,r=0;r<e._writeRequests.length;r++)e._writeRequests[r]._reject(t);if(e._writeRequests=[],void 0!==e._pendingAbortRequest){var n=e._pendingAbortRequest;if(e._pendingAbortRequest=void 0,!0===n._wasAlreadyErroring)return n._reject(t),void y(e);e._writableStreamController.__abortSteps(n._reason).then(function(){n._resolve(),y(e)},function(t){n._reject(t),y(e)})}else y(e)}function d(e){ce(void 0!==e._inFlightWriteRequest),e._inFlightWriteRequest._resolve(void 0),e._inFlightWriteRequest=void 0}function f(e,t){ce(void 0!==e._inFlightWriteRequest),e._inFlightWriteRequest._reject(t),e._inFlightWriteRequest=void 0,ce("writable"===e._state||"erroring"===e._state),u(e,t)}function p(e){ce(void 0!==e._inFlightCloseRequest),e._inFlightCloseRequest._resolve(void 0),e._inFlightCloseRequest=void 0;var t=e._state;ce("writable"===t||"erroring"===t),"erroring"===t&&(e._storedError=void 0,void 0!==e._pendingAbortRequest&&(e._pendingAbortRequest._resolve(),e._pendingAbortRequest=void 0)),e._state="closed";var r=e._writer;void 0!==r&&J(r),ce(void 0===e._pendingAbortRequest,"stream._pendingAbortRequest === undefined"),ce(void 0===e._storedError,"stream._storedError === undefined")}function m(e,t){ce(void 0!==e._inFlightCloseRequest),e._inFlightCloseRequest._reject(t),e._inFlightCloseRequest=void 0,ce("writable"===e._state||"erroring"===e._state),void 0!==e._pendingAbortRequest&&(e._pendingAbortRequest._reject(t),e._pendingAbortRequest=void 0),u(e,t)}function g(e){return void 0!==e._closeRequest||void 0!==e._inFlightCloseRequest}function v(e){return void 0!==e._inFlightWriteRequest||void 0!==e._inFlightCloseRequest}function b(e){ce(void 0===e._inFlightCloseRequest),ce(void 0!==e._closeRequest),e._inFlightCloseRequest=e._closeRequest,e._closeRequest=void 0}function _(e){ce(void 0===e._inFlightWriteRequest,"there must be no pending write request"),ce(0!==e._writeRequests.length,"writeRequests must not be empty"),e._inFlightWriteRequest=e._writeRequests.shift()}function y(e){ce("errored"===e._state,'_stream_.[[state]] is `"errored"`'),void 0!==e._closeRequest&&(ce(void 0===e._inFlightCloseRequest),e._closeRequest._reject(e._storedError),e._closeRequest=void 0);var t=e._writer;void 0!==t&&(V(t,e._storedError),t._closedPromise.catch(function(){}))}function A(e,t){ce("writable"===e._state),ce(!1===g(e));var r=e._writer;void 0!==r&&t!==e._backpressure&&(!0===t?ee(r):(ce(!1===t),re(r))),e._backpressure=t}function S(e){return!!le(e)&&!!Object.prototype.hasOwnProperty.call(e,"_ownerWritableStream")}function w(e,t){var r=e._ownerWritableStream;return ce(void 0!==r),s(r,t)}function P(e){var t=e._ownerWritableStream;ce(void 0!==t);var r=t._state;if("closed"===r||"errored"===r)return Promise.reject(new TypeError("The stream (in "+r+" state) is not in the writable state and cannot be closed"));ce("writable"===r||"erroring"===r),ce(!1===g(t));var n=new Promise(function(e,r){var n={_resolve:e,_reject:r};t._closeRequest=n});return!0===t._backpressure&&"writable"===r&&re(e),E(t._writableStreamController),n}function R(e,t){"pending"===e._closedPromiseState?V(e,t):Y(e,t),e._closedPromise.catch(function(){})}function C(e,t){"pending"===e._readyPromiseState?$(e,t):te(e,t),e._readyPromise.catch(function(){})}function k(e){var t=e._ownerWritableStream,r=t._state;return"errored"===r||"erroring"===r?null:"closed"===r?0:I(t._writableStreamController)}function x(e){var t=e._ownerWritableStream;ce(void 0!==t),ce(t._writer===e);var r=new TypeError("Writer was released and can no longer be used to monitor the stream's closedness");C(e,r),R(e,r),t._writer=void 0,e._ownerWritableStream=void 0}function T(e,t){var r=e._ownerWritableStream;ce(void 0!==r);var n=r._writableStreamController,i=O(n,t);if(r!==e._ownerWritableStream)return Promise.reject(z("write to"));var a=r._state;if("errored"===a)return Promise.reject(r._storedError);if(!0===g(r)||"closed"===a)return Promise.reject(new TypeError("The stream is closing or closed and cannot be written to"));if("erroring"===a)return Promise.reject(r._storedError);ce("writable"===a);var o=l(r);return L(n,t,i),o}function E(e){pe(e,"close",0),D(e)}function O(e,t){var r=e._strategySize;if(void 0===r)return 1;try{return r(t)}catch(t){return j(e,t),1}}function I(e){return e._strategyHWM-e._queueTotalSize}function L(e,t,r){var n={chunk:t};try{pe(e,n,r)}catch(t){return void j(e,t)}var i=e._controlledWritableStream;!1===g(i)&&"writable"===i._state&&A(i,q(e)),D(e)}function F(e){return!!le(e)&&!!Object.prototype.hasOwnProperty.call(e,"_underlyingSink")}function D(e){var t=e._controlledWritableStream;if(!1!==e._started&&void 0===t._inFlightWriteRequest){var r=t._state;if("closed"!==r&&"errored"!==r)if("erroring"!==r){if(0!==e._queue.length){var n=me(e);"close"===n?M(e):N(e,n.chunk)}}else h(t)}}function j(e,t){"writable"===e._controlledWritableStream._state&&W(e,t)}function M(e){var t=e._controlledWritableStream;b(t),fe(e),ce(0===e._queue.length,"queue must be empty once the final write record is dequeued"),oe(e._underlyingSink,"close",[]).then(function(){p(t)},function(e){m(t,e)}).catch(he)}function N(e,t){var r=e._controlledWritableStream;_(r),oe(e._underlyingSink,"write",[t,e]).then(function(){d(r);var t=r._state;if(ce("writable"===t||"erroring"===t),fe(e),!1===g(r)&&"writable"===t){var n=q(e);A(r,n)}D(e)},function(e){f(r,e)}).catch(he)}function q(e){return I(e)<=0}function W(e,t){var r=e._controlledWritableStream;ce("writable"===r._state),c(r,t)}function U(e){return new TypeError("WritableStream.prototype."+e+" can only be used on a WritableStream")}function B(e){return new TypeError("WritableStreamDefaultWriter.prototype."+e+" can only be used on a WritableStreamDefaultWriter")}function z(e){return new TypeError("Cannot "+e+" a stream using a released writer")}function G(e){e._closedPromise=new Promise(function(t,r){e._closedPromise_resolve=t,e._closedPromise_reject=r,e._closedPromiseState="pending"})}function H(e,t){e._closedPromise=Promise.reject(t),e._closedPromise_resolve=void 0,e._closedPromise_reject=void 0,e._closedPromiseState="rejected"}function X(e){e._closedPromise=Promise.resolve(void 0),e._closedPromise_resolve=void 0,e._closedPromise_reject=void 0,e._closedPromiseState="resolved"}function V(e,t){ce(void 0!==e._closedPromise_resolve,"writer._closedPromise_resolve !== undefined"),ce(void 0!==e._closedPromise_reject,"writer._closedPromise_reject !== undefined"),ce("pending"===e._closedPromiseState,"writer._closedPromiseState is pending"),e._closedPromise_reject(t),e._closedPromise_resolve=void 0,e._closedPromise_reject=void 0,e._closedPromiseState="rejected"}function Y(e,t){ce(void 0===e._closedPromise_resolve,"writer._closedPromise_resolve === undefined"),ce(void 0===e._closedPromise_reject,"writer._closedPromise_reject === undefined"),ce("pending"!==e._closedPromiseState,"writer._closedPromiseState is not pending"),e._closedPromise=Promise.reject(t),e._closedPromiseState="rejected"}function J(e){ce(void 0!==e._closedPromise_resolve,"writer._closedPromise_resolve !== undefined"),ce(void 0!==e._closedPromise_reject,"writer._closedPromise_reject !== undefined"),ce("pending"===e._closedPromiseState,"writer._closedPromiseState is pending"),e._closedPromise_resolve(void 0),e._closedPromise_resolve=void 0,e._closedPromise_reject=void 0,e._closedPromiseState="resolved"}function Q(e){e._readyPromise=new Promise(function(t,r){e._readyPromise_resolve=t,e._readyPromise_reject=r}),e._readyPromiseState="pending"}function K(e,t){e._readyPromise=Promise.reject(t),e._readyPromise_resolve=void 0,e._readyPromise_reject=void 0,e._readyPromiseState="rejected"}function Z(e){e._readyPromise=Promise.resolve(void 0),e._readyPromise_resolve=void 0,e._readyPromise_reject=void 0,e._readyPromiseState="fulfilled"}function $(e,t){ce(void 0!==e._readyPromise_resolve,"writer._readyPromise_resolve !== undefined"),ce(void 0!==e._readyPromise_reject,"writer._readyPromise_reject !== undefined"),e._readyPromise_reject(t),e._readyPromise_resolve=void 0,e._readyPromise_reject=void 0,e._readyPromiseState="rejected"}function ee(e){ce(void 0===e._readyPromise_resolve,"writer._readyPromise_resolve === undefined"),ce(void 0===e._readyPromise_reject,"writer._readyPromise_reject === undefined"),e._readyPromise=new Promise(function(t,r){e._readyPromise_resolve=t,e._readyPromise_reject=r}),e._readyPromiseState="pending"}function te(e,t){ce(void 0===e._readyPromise_resolve,"writer._readyPromise_resolve === undefined"),ce(void 0===e._readyPromise_reject,"writer._readyPromise_reject === undefined"),e._readyPromise=Promise.reject(t),e._readyPromiseState="rejected"}function re(e){ce(void 0!==e._readyPromise_resolve,"writer._readyPromise_resolve !== undefined"),ce(void 0!==e._readyPromise_reject,"writer._readyPromise_reject !== undefined"),e._readyPromise_resolve(void 0),e._readyPromise_resolve=void 0,e._readyPromise_reject=void 0,e._readyPromiseState="fulfilled"}var ne=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),ie=r(0),ae=ie.InvokeOrNoop,oe=ie.PromiseInvokeOrNoop,se=ie.ValidateAndNormalizeQueuingStrategy,le=ie.typeIsObject,ue=r(1),ce=ue.assert,he=ue.rethrowAssertionErrorRejection,de=r(3),fe=de.DequeueValue,pe=de.EnqueueValueWithSize,me=de.PeekQueueValue,ge=de.ResetQueue,ve=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},i=r.size,a=r.highWaterMark,o=void 0===a?1:a;if(n(this,e),this._state="writable",this._storedError=void 0,this._writer=void 0,this._writableStreamController=void 0,this._writeRequests=[],this._inFlightWriteRequest=void 0,this._closeRequest=void 0,this._inFlightCloseRequest=void 0,this._pendingAbortRequest=void 0,this._backpressure=!1,void 0!==t.type)throw new RangeError("Invalid type is specified");this._writableStreamController=new _e(this,t,i,o),this._writableStreamController.__startSteps()}return ne(e,[{key:"abort",value:function(e){return!1===a(this)?Promise.reject(U("abort")):!0===o(this)?Promise.reject(new TypeError("Cannot abort a stream that already has a writer")):s(this,e)}},{key:"getWriter",value:function(){if(!1===a(this))throw U("getWriter");return i(this)}},{key:"locked",get:function(){if(!1===a(this))throw U("locked");return o(this)}}]),e}();e.exports={AcquireWritableStreamDefaultWriter:i,IsWritableStream:a,IsWritableStreamLocked:o,WritableStream:ve,WritableStreamAbort:s,WritableStreamDefaultControllerError:W,WritableStreamDefaultWriterCloseWithErrorPropagation:function(e){var t=e._ownerWritableStream;ce(void 0!==t);var r=t._state;return!0===g(t)||"closed"===r?Promise.resolve():"errored"===r?Promise.reject(t._storedError):(ce("writable"===r||"erroring"===r),P(e))},WritableStreamDefaultWriterRelease:x,WritableStreamDefaultWriterWrite:T,WritableStreamCloseQueuedOrInFlight:g};var be=function(){function e(t){if(n(this,e),!1===a(t))throw new TypeError("WritableStreamDefaultWriter can only be constructed with a WritableStream instance");if(!0===o(t))throw new TypeError("This stream has already been locked for exclusive writing by another writer");this._ownerWritableStream=t,t._writer=this;var r=t._state;if("writable"===r)!1===g(t)&&!0===t._backpressure?Q(this):Z(this),G(this);else if("erroring"===r)K(this,t._storedError),this._readyPromise.catch(function(){}),G(this);else if("closed"===r)Z(this),X(this);else{ce("errored"===r,"state must be errored");var i=t._storedError;K(this,i),this._readyPromise.catch(function(){}),H(this,i),this._closedPromise.catch(function(){})}}return ne(e,[{key:"abort",value:function(e){return!1===S(this)?Promise.reject(B("abort")):void 0===this._ownerWritableStream?Promise.reject(z("abort")):w(this,e)}},{key:"close",value:function(){if(!1===S(this))return Promise.reject(B("close"));var e=this._ownerWritableStream;return void 0===e?Promise.reject(z("close")):!0===g(e)?Promise.reject(new TypeError("cannot close an already-closing stream")):P(this)}},{key:"releaseLock",value:function(){if(!1===S(this))throw B("releaseLock");var e=this._ownerWritableStream;void 0!==e&&(ce(void 0!==e._writer),x(this))}},{key:"write",value:function(e){return!1===S(this)?Promise.reject(B("write")):void 0===this._ownerWritableStream?Promise.reject(z("write to")):T(this,e)}},{key:"closed",get:function(){return!1===S(this)?Promise.reject(B("closed")):this._closedPromise}},{key:"desiredSize",get:function(){if(!1===S(this))throw B("desiredSize");if(void 0===this._ownerWritableStream)throw z("desiredSize");return k(this)}},{key:"ready",get:function(){return!1===S(this)?Promise.reject(B("ready")):this._readyPromise}}]),e}(),_e=function(){function e(t,r,i,o){if(n(this,e),!1===a(t))throw new TypeError("WritableStreamDefaultController can only be constructed with a WritableStream instance");if(void 0!==t._writableStreamController)throw new TypeError("WritableStreamDefaultController instances can only be created by the WritableStream constructor");this._controlledWritableStream=t,this._underlyingSink=r,this._queue=void 0,this._queueTotalSize=void 0,ge(this),this._started=!1;var s=se(i,o);this._strategySize=s.size,this._strategyHWM=s.highWaterMark,A(t,q(this))}return ne(e,[{key:"error",value:function(e){if(!1===F(this))throw new TypeError("WritableStreamDefaultController.prototype.error can only be used on a WritableStreamDefaultController");"writable"===this._controlledWritableStream._state&&W(this,e)}},{key:"__abortSteps",value:function(e){return oe(this._underlyingSink,"abort",[e])}},{key:"__errorSteps",value:function(){ge(this)}},{key:"__startSteps",value:function(){var e=this,t=ae(this._underlyingSink,"start",[this]),r=this._controlledWritableStream;Promise.resolve(t).then(function(){ce("writable"===r._state||"erroring"===r._state),e._started=!0,D(e)},function(t){ce("writable"===r._state||"erroring"===r._state),e._started=!0,u(r,t)}).catch(he)}}]),e}()},function(e,t,r){var n=r(0).IsFiniteNonNegativeNumber,i=r(1).assert;t.DequeueValue=function(e){i("_queue"in e&&"_queueTotalSize"in e,"Spec-level failure: DequeueValue should only be used on containers with [[queue]] and [[queueTotalSize]]."),i(e._queue.length>0,"Spec-level failure: should never dequeue from an empty queue.");var t=e._queue.shift();return e._queueTotalSize-=t.size,e._queueTotalSize<0&&(e._queueTotalSize=0),t.value},t.EnqueueValueWithSize=function(e,t,r){if(i("_queue"in e&&"_queueTotalSize"in e,"Spec-level failure: EnqueueValueWithSize should only be used on containers with [[queue]] and [[queueTotalSize]]."),r=Number(r),!n(r))throw new RangeError("Size must be a finite, non-NaN, non-negative number.");e._queue.push({value:t,size:r}),e._queueTotalSize+=r},t.PeekQueueValue=function(e){return i("_queue"in e&&"_queueTotalSize"in e,"Spec-level failure: PeekQueueValue should only be used on containers with [[queue]] and [[queueTotalSize]]."),i(e._queue.length>0,"Spec-level failure: should never peek at an empty queue."),e._queue[0].value},t.ResetQueue=function(e){i("_queue"in e&&"_queueTotalSize"in e,"Spec-level failure: ResetQueue should only be used on containers with [[queue]] and [[queueTotalSize]]."),e._queue=[],e._queueTotalSize=0}},function(e,t,r){function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e){return new et(e)}function a(e){return new $e(e)}function o(e){return!!De(e)&&!!Object.prototype.hasOwnProperty.call(e,"_readableStreamController")}function s(e){return Me(!0===o(e),"IsReadableStreamLocked should only be used on known readable streams"),void 0!==e._reader}function l(e,t){Me(!0===o(e)),Me("boolean"==typeof t);var r=a(e),n={closedOrErrored:!1,canceled1:!1,canceled2:!1,reason1:void 0,reason2:void 0};n.promise=new Promise(function(e){n._resolve=e});var i=u();i._reader=r,i._teeState=n,i._cloneForBranch2=t;var s=c();s._stream=e,s._teeState=n;var l=h();l._stream=e,l._teeState=n;var d=Object.create(Object.prototype);Fe(d,"pull",i),Fe(d,"cancel",s);var f=new Ze(d),p=Object.create(Object.prototype);Fe(p,"pull",i),Fe(p,"cancel",l);var m=new Ze(p);return i._branch1=f._readableStreamController,i._branch2=m._readableStreamController,r._closedPromise.catch(function(e){!0!==n.closedOrErrored&&(D(i._branch1,e),D(i._branch2,e),n.closedOrErrored=!0)}),[f,m]}function u(){function e(){var t=e._reader,r=e._branch1,n=e._branch2,i=e._teeState;return T(t).then(function(e){Me(De(e));var t=e.value,a=e.done;if(Me("boolean"==typeof a),!0===a&&!1===i.closedOrErrored&&(!1===i.canceled1&&L(r),!1===i.canceled2&&L(n),i.closedOrErrored=!0),!0!==i.closedOrErrored){var o=t,s=t;!1===i.canceled1&&F(r,o),!1===i.canceled2&&F(n,s)}})}return e}function c(){function e(t){var r=e._stream,n=e._teeState;if(n.canceled1=!0,n.reason1=t,!0===n.canceled2){var i=p(r,Le([n.reason1,n.reason2]));n._resolve(i)}return n.promise}return e}function h(){function e(t){var r=e._stream,n=e._teeState;if(n.canceled2=!0,n.reason2=t,!0===n.canceled1){var i=p(r,Le([n.reason1,n.reason2]));n._resolve(i)}return n.promise}return e}function d(e){return Me(!0===w(e._reader)),Me("readable"===e._state||"closed"===e._state),new Promise(function(t,r){var n={_resolve:t,_reject:r};e._reader._readIntoRequests.push(n)})}function f(e){return Me(!0===P(e._reader)),Me("readable"===e._state),new Promise(function(t,r){var n={_resolve:t,_reject:r};e._reader._readRequests.push(n)})}function p(e,t){return e._disturbed=!0,"closed"===e._state?Promise.resolve(void 0):"errored"===e._state?Promise.reject(e._storedError):(m(e),e._readableStreamController.__cancelSteps(t).then(function(){}))}function m(e){Me("readable"===e._state),e._state="closed";var t=e._reader;if(void 0!==t){if(!0===P(t)){for(var r=0;r<t._readRequests.length;r++)(0,t._readRequests[r]._resolve)(Re(void 0,!0));t._readRequests=[]}ge(t)}}function g(e,t){Me(!0===o(e),"stream must be ReadableStream"),Me("readable"===e._state,"state must be readable"),e._state="errored",e._storedError=t;var r=e._reader;if(void 0!==r){if(!0===P(r)){for(var n=0;n<r._readRequests.length;n++)r._readRequests[n]._reject(t);r._readRequests=[]}else{Me(w(r),"reader must be ReadableStreamBYOBReader");for(var i=0;i<r._readIntoRequests.length;i++)r._readIntoRequests[i]._reject(t);r._readIntoRequests=[]}pe(r,t),r._closedPromise.catch(function(){})}}function v(e,t,r){var n=e._reader;Me(n._readIntoRequests.length>0),n._readIntoRequests.shift()._resolve(Re(t,r))}function b(e,t,r){var n=e._reader;Me(n._readRequests.length>0),n._readRequests.shift()._resolve(Re(t,r))}function _(e){return e._reader._readIntoRequests.length}function y(e){return e._reader._readRequests.length}function A(e){var t=e._reader;return void 0!==t&&!1!==w(t)}function S(e){var t=e._reader;return void 0!==t&&!1!==P(t)}function w(e){return!!De(e)&&!!Object.prototype.hasOwnProperty.call(e,"_readIntoRequests")}function P(e){return!!De(e)&&!!Object.prototype.hasOwnProperty.call(e,"_readRequests")}function R(e,t){e._ownerReadableStream=t,t._reader=e,"readable"===t._state?he(e):"closed"===t._state?fe(e):(Me("errored"===t._state,"state must be errored"),de(e,t._storedError),e._closedPromise.catch(function(){}))}function C(e,t){var r=e._ownerReadableStream;return Me(void 0!==r),p(r,t)}function k(e){Me(void 0!==e._ownerReadableStream),Me(e._ownerReadableStream._reader===e),"readable"===e._ownerReadableStream._state?pe(e,new TypeError("Reader was released and can no longer be used to monitor the stream's closedness")):me(e,new TypeError("Reader was released and can no longer be used to monitor the stream's closedness")),e._closedPromise.catch(function(){}),e._ownerReadableStream._reader=void 0,e._ownerReadableStream=void 0}function x(e,t){var r=e._ownerReadableStream;return Me(void 0!==r),r._disturbed=!0,"errored"===r._state?Promise.reject(r._storedError):Q(r._readableStreamController,t)}function T(e){var t=e._ownerReadableStream;return Me(void 0!==t),t._disturbed=!0,"closed"===t._state?Promise.resolve(Re(void 0,!0)):"errored"===t._state?Promise.reject(t._storedError):(Me("readable"===t._state),t._readableStreamController.__pullSteps())}function E(e){return!!De(e)&&!!Object.prototype.hasOwnProperty.call(e,"_underlyingSource")}function O(e){!1!==I(e)&&(!0!==e._pulling?(Me(!1===e._pullAgain),e._pulling=!0,xe(e._underlyingSource,"pull",[e]).then(function(){if(e._pulling=!1,!0===e._pullAgain)return e._pullAgain=!1,O(e)},function(t){j(e,t)}).catch(Ne)):e._pullAgain=!0)}function I(e){var t=e._controlledReadableStream;return"closed"!==t._state&&"errored"!==t._state&&(!0!==e._closeRequested&&(!1!==e._started&&(!0===s(t)&&y(t)>0||M(e)>0)))}function L(e){var t=e._controlledReadableStream;Me(!1===e._closeRequested),Me("readable"===t._state),e._closeRequested=!0,0===e._queue.length&&m(t)}function F(e,t){var r=e._controlledReadableStream;if(Me(!1===e._closeRequested),Me("readable"===r._state),!0===s(r)&&y(r)>0)b(r,t,!1);else{var n=1;if(void 0!==e._strategySize){var i=e._strategySize;try{n=i(t)}catch(t){throw j(e,t),t}}try{Ue(e,t,n)}catch(t){throw j(e,t),t}}O(e)}function D(e,t){var r=e._controlledReadableStream;Me("readable"===r._state),Be(e),g(r,t)}function j(e,t){"readable"===e._controlledReadableStream._state&&D(e,t)}function M(e){var t=e._controlledReadableStream._state;return"errored"===t?null:"closed"===t?0:e._strategyHWM-e._queueTotalSize}function N(e){return!!De(e)&&!!Object.prototype.hasOwnProperty.call(e,"_underlyingByteSource")}function q(e){return!!De(e)&&!!Object.prototype.hasOwnProperty.call(e,"_associatedReadableByteStreamController")}function W(e){!1!==te(e)&&(!0!==e._pulling?(Me(!1===e._pullAgain),e._pulling=!0,xe(e._underlyingByteSource,"pull",[e]).then(function(){e._pulling=!1,!0===e._pullAgain&&(e._pullAgain=!1,W(e))},function(t){"readable"===e._controlledReadableStream._state&&ie(e,t)}).catch(Ne)):e._pullAgain=!0)}function U(e){Y(e),e._pendingPullIntos=[]}function B(e,t){Me("errored"!==e._state,"state must not be errored");var r=!1;"closed"===e._state&&(Me(0===t.bytesFilled),r=!0);var n=z(t);"default"===t.readerType?b(e,n,r):(Me("byob"===t.readerType),v(e,n,r))}function z(e){var t=e.bytesFilled,r=e.elementSize;return Me(t<=e.byteLength),Me(t%r==0),new e.ctor(e.buffer,e.byteOffset,t/r)}function G(e,t,r,n){e._queue.push({buffer:t,byteOffset:r,byteLength:n}),e._queueTotalSize+=n}function H(e,t){var r=t.elementSize,n=t.bytesFilled-t.bytesFilled%r,i=Math.min(e._queueTotalSize,t.byteLength-t.bytesFilled),a=t.bytesFilled+i,o=a-a%r,s=i,l=!1;o>n&&(s=o-t.bytesFilled,l=!0);for(var u=e._queue;s>0;){var c=u[0],h=Math.min(s,c.byteLength),d=t.byteOffset+t.bytesFilled;Pe(t.buffer,d,c.buffer,c.byteOffset,h),c.byteLength===h?u.shift():(c.byteOffset+=h,c.byteLength-=h),e._queueTotalSize-=h,X(e,h,t),s-=h}return!1===l&&(Me(0===e._queueTotalSize,"queue must be empty"),Me(t.bytesFilled>0),Me(t.bytesFilled<t.elementSize)),l}function X(e,t,r){Me(0===e._pendingPullIntos.length||e._pendingPullIntos[0]===r),Y(e),r.bytesFilled+=t}function V(e){Me("readable"===e._controlledReadableStream._state),0===e._queueTotalSize&&!0===e._closeRequested?m(e._controlledReadableStream):W(e)}function Y(e){void 0!==e._byobRequest&&(e._byobRequest._associatedReadableByteStreamController=void 0,e._byobRequest._view=void 0,e._byobRequest=void 0)}function J(e){for(Me(!1===e._closeRequested);e._pendingPullIntos.length>0;){if(0===e._queueTotalSize)return;var t=e._pendingPullIntos[0];!0===H(e,t)&&(ee(e),B(e._controlledReadableStream,t))}}function Q(e,t){var r=e._controlledReadableStream,n=1;t.constructor!==DataView&&(n=t.constructor.BYTES_PER_ELEMENT);var i=t.constructor,a={buffer:t.buffer,byteOffset:t.byteOffset,byteLength:t.byteLength,bytesFilled:0,elementSize:n,ctor:i,readerType:"byob"};if(e._pendingPullIntos.length>0)return a.buffer=Te(a.buffer),e._pendingPullIntos.push(a),d(r);if("closed"===r._state){var o=new t.constructor(a.buffer,a.byteOffset,0);return Promise.resolve(Re(o,!0))}if(e._queueTotalSize>0){if(!0===H(e,a)){var s=z(a);return V(e),Promise.resolve(Re(s,!1))}if(!0===e._closeRequested){var l=new TypeError("Insufficient bytes to fill elements in the given buffer");return ie(e,l),Promise.reject(l)}}a.buffer=Te(a.buffer),e._pendingPullIntos.push(a);var u=d(r);return W(e),u}function K(e,t){t.buffer=Te(t.buffer),Me(0===t.bytesFilled,"bytesFilled must be 0");var r=e._controlledReadableStream;if(!0===A(r))for(;_(r)>0;)B(r,ee(e))}function Z(e,t,r){if(r.bytesFilled+t>r.byteLength)throw new RangeError("bytesWritten out of range");if(X(e,t,r),!(r.bytesFilled<r.elementSize)){ee(e);var n=r.bytesFilled%r.elementSize;if(n>0){var i=r.byteOffset+r.bytesFilled,a=r.buffer.slice(i-n,i);G(e,a,0,a.byteLength)}r.buffer=Te(r.buffer),r.bytesFilled-=n,B(e._controlledReadableStream,r),J(e)}}function $(e,t){var r=e._pendingPullIntos[0],n=e._controlledReadableStream;if("closed"===n._state){if(0!==t)throw new TypeError("bytesWritten must be 0 when calling respond() on a closed stream");K(e,r)}else Me("readable"===n._state),Z(e,t,r)}function ee(e){var t=e._pendingPullIntos.shift();return Y(e),t}function te(e){var t=e._controlledReadableStream;return"readable"===t._state&&(!0!==e._closeRequested&&(!1!==e._started&&(!0===S(t)&&y(t)>0||(!0===A(t)&&_(t)>0||ae(e)>0))))}function re(e){var t=e._controlledReadableStream;if(Me(!1===e._closeRequested),Me("readable"===t._state),e._queueTotalSize>0)e._closeRequested=!0;else{if(e._pendingPullIntos.length>0&&e._pendingPullIntos[0].bytesFilled>0){var r=new TypeError("Insufficient bytes to fill elements in the given buffer");throw ie(e,r),r}m(t)}}function ne(e,t){var r=e._controlledReadableStream;Me(!1===e._closeRequested),Me("readable"===r._state);var n=t.buffer,i=t.byteOffset,a=t.byteLength,o=Te(n);!0===S(r)?0===y(r)?G(e,o,i,a):(Me(0===e._queue.length),b(r,new Uint8Array(o,i,a),!1)):!0===A(r)?(G(e,o,i,a),J(e)):(Me(!1===s(r),"stream must not be locked"),G(e,o,i,a))}function ie(e,t){var r=e._controlledReadableStream;Me("readable"===r._state),U(e),Be(e),g(r,t)}function ae(e){var t=e._controlledReadableStream._state;return"errored"===t?null:"closed"===t?0:e._strategyHWM-e._queueTotalSize}function oe(e,t){if(t=Number(t),!1===Ce(t))throw new RangeError("bytesWritten must be a finite");Me(e._pendingPullIntos.length>0),$(e,t)}function se(e,t){Me(e._pendingPullIntos.length>0);var r=e._pendingPullIntos[0];if(r.byteOffset+r.bytesFilled!==t.byteOffset)throw new RangeError("The region specified by view does not match byobRequest");if(r.byteLength!==t.byteLength)throw new RangeError("The buffer of view has different capacity than byobRequest");r.buffer=t.buffer,$(e,t.byteLength)}function le(e){return new TypeError("ReadableStream.prototype."+e+" can only be used on a ReadableStream")}function ue(e){return new TypeError("Cannot "+e+" a stream using a released reader")}function ce(e){return new TypeError("ReadableStreamDefaultReader.prototype."+e+" can only be used on a ReadableStreamDefaultReader")}function he(e){e._closedPromise=new Promise(function(t,r){e._closedPromise_resolve=t,e._closedPromise_reject=r})}function de(e,t){e._closedPromise=Promise.reject(t),e._closedPromise_resolve=void 0,e._closedPromise_reject=void 0}function fe(e){e._closedPromise=Promise.resolve(void 0),e._closedPromise_resolve=void 0,e._closedPromise_reject=void 0}function pe(e,t){Me(void 0!==e._closedPromise_resolve),Me(void 0!==e._closedPromise_reject),e._closedPromise_reject(t),e._closedPromise_resolve=void 0,e._closedPromise_reject=void 0}function me(e,t){Me(void 0===e._closedPromise_resolve),Me(void 0===e._closedPromise_reject),e._closedPromise=Promise.reject(t)}function ge(e){Me(void 0!==e._closedPromise_resolve),Me(void 0!==e._closedPromise_reject),e._closedPromise_resolve(void 0),e._closedPromise_resolve=void 0,e._closedPromise_reject=void 0}function ve(e){return new TypeError("ReadableStreamBYOBReader.prototype."+e+" can only be used on a ReadableStreamBYOBReader")}function be(e){return new TypeError("ReadableStreamDefaultController.prototype."+e+" can only be used on a ReadableStreamDefaultController")}function _e(e){return new TypeError("ReadableStreamBYOBRequest.prototype."+e+" can only be used on a ReadableStreamBYOBRequest")}function ye(e){return new TypeError("ReadableByteStreamController.prototype."+e+" can only be used on a ReadableByteStreamController")}function Ae(e){try{Promise.prototype.then.call(e,void 0,function(){})}catch(e){}}var Se=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),we=r(0),Pe=we.ArrayBufferCopy,Re=we.CreateIterResultObject,Ce=we.IsFiniteNonNegativeNumber,ke=we.InvokeOrNoop,xe=we.PromiseInvokeOrNoop,Te=we.TransferArrayBuffer,Ee=we.ValidateAndNormalizeQueuingStrategy,Oe=we.ValidateAndNormalizeHighWaterMark,Ie=r(0),Le=Ie.createArrayFromList,Fe=Ie.createDataProperty,De=Ie.typeIsObject,je=r(1),Me=je.assert,Ne=je.rethrowAssertionErrorRejection,qe=r(3),We=qe.DequeueValue,Ue=qe.EnqueueValueWithSize,Be=qe.ResetQueue,ze=r(2),Ge=ze.AcquireWritableStreamDefaultWriter,He=ze.IsWritableStream,Xe=ze.IsWritableStreamLocked,Ve=ze.WritableStreamAbort,Ye=ze.WritableStreamDefaultWriterCloseWithErrorPropagation,Je=ze.WritableStreamDefaultWriterRelease,Qe=ze.WritableStreamDefaultWriterWrite,Ke=ze.WritableStreamCloseQueuedOrInFlight,Ze=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},i=r.size,a=r.highWaterMark;n(this,e),this._state="readable",this._reader=void 0,this._storedError=void 0,this._disturbed=!1,this._readableStreamController=void 0;var o=t.type;if("bytes"===String(o))void 0===a&&(a=0),this._readableStreamController=new nt(this,t,a);else{if(void 0!==o)throw new RangeError("Invalid type is specified");void 0===a&&(a=1),this._readableStreamController=new tt(this,t,i,a)}}return Se(e,[{key:"cancel",value:function(e){return!1===o(this)?Promise.reject(le("cancel")):!0===s(this)?Promise.reject(new TypeError("Cannot cancel a stream that already has a reader")):p(this,e)}},{key:"getReader",value:function(){var e=(arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}).mode;if(!1===o(this))throw le("getReader");if(void 0===e)return a(this);if("byob"===(e=String(e)))return i(this);throw new RangeError("Invalid mode is specified")}},{key:"pipeThrough",value:function(e,t){var r=e.writable,n=e.readable;return Ae(this.pipeTo(r,t)),n}},{key:"pipeTo",value:function(e){var t=this,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=r.preventClose,i=r.preventAbort,l=r.preventCancel;if(!1===o(this))return Promise.reject(le("pipeTo"));if(!1===He(e))return Promise.reject(new TypeError("ReadableStream.prototype.pipeTo's first argument must be a WritableStream"));if(n=Boolean(n),i=Boolean(i),l=Boolean(l),!0===s(this))return Promise.reject(new TypeError("ReadableStream.prototype.pipeTo cannot be used on a locked ReadableStream"));if(!0===Xe(e))return Promise.reject(new TypeError("ReadableStream.prototype.pipeTo cannot be used on a locked WritableStream"));var u=a(this),c=Ge(e),h=!1,d=Promise.resolve();return new Promise(function(r,a){function o(){return d=Promise.resolve(),!0===h?Promise.resolve():c._readyPromise.then(function(){return T(u).then(function(e){var t=e.value;!0!==e.done&&(d=Qe(c,t).catch(function(){}))})}).then(o)}function s(){var e=d;return d.then(function(){return e!==d?s():void 0})}function f(e,t,r){"errored"===e._state?r(e._storedError):t.catch(r).catch(Ne)}function m(t,r,n){function i(){t().then(function(){return v(r,n)},function(e){return v(!0,e)}).catch(Ne)}!0!==h&&(h=!0,"writable"===e._state&&!1===Ke(e)?s().then(i):i())}function g(t,r){!0!==h&&(h=!0,"writable"===e._state&&!1===Ke(e)?s().then(function(){return v(t,r)}).catch(Ne):v(t,r))}function v(e,t){Je(c),k(u),e?a(t):r(void 0)}if(f(t,u._closedPromise,function(t){!1===i?m(function(){return Ve(e,t)},!0,t):g(!0,t)}),f(e,c._closedPromise,function(e){!1===l?m(function(){return p(t,e)},!0,e):g(!0,e)}),function(e,t,r){"closed"===e._state?r():t.then(r).catch(Ne)}(t,u._closedPromise,function(){!1===n?m(function(){return Ye(c)}):g()}),!0===Ke(e)||"closed"===e._state){var b=new TypeError("the destination writable stream closed before all data could be piped to it");!1===l?m(function(){return p(t,b)},!0,b):g(!0,b)}o().catch(function(e){d=Promise.resolve(),Ne(e)})})}},{key:"tee",value:function(){if(!1===o(this))throw le("tee");var e=l(this,!1);return Le(e)}},{key:"locked",get:function(){if(!1===o(this))throw le("locked");return s(this)}}]),e}();e.exports={ReadableStream:Ze,IsReadableStreamDisturbed:function(e){return Me(!0===o(e),"IsReadableStreamDisturbed should only be used on known readable streams"),e._disturbed},ReadableStreamDefaultControllerClose:L,ReadableStreamDefaultControllerEnqueue:F,ReadableStreamDefaultControllerError:D,ReadableStreamDefaultControllerGetDesiredSize:M};var $e=function(){function e(t){if(n(this,e),!1===o(t))throw new TypeError("ReadableStreamDefaultReader can only be constructed with a ReadableStream instance");if(!0===s(t))throw new TypeError("This stream has already been locked for exclusive reading by another reader");R(this,t),this._readRequests=[]}return Se(e,[{key:"cancel",value:function(e){return!1===P(this)?Promise.reject(ce("cancel")):void 0===this._ownerReadableStream?Promise.reject(ue("cancel")):C(this,e)}},{key:"read",value:function(){return!1===P(this)?Promise.reject(ce("read")):void 0===this._ownerReadableStream?Promise.reject(ue("read from")):T(this)}},{key:"releaseLock",value:function(){if(!1===P(this))throw ce("releaseLock");if(void 0!==this._ownerReadableStream){if(this._readRequests.length>0)throw new TypeError("Tried to release a reader lock when that reader has pending read() calls un-settled");k(this)}}},{key:"closed",get:function(){return!1===P(this)?Promise.reject(ce("closed")):this._closedPromise}}]),e}(),et=function(){function e(t){if(n(this,e),!o(t))throw new TypeError("ReadableStreamBYOBReader can only be constructed with a ReadableStream instance given a byte source");if(!1===N(t._readableStreamController))throw new TypeError("Cannot construct a ReadableStreamBYOBReader for a stream not constructed with a byte source");if(s(t))throw new TypeError("This stream has already been locked for exclusive reading by another reader");R(this,t),this._readIntoRequests=[]}return Se(e,[{key:"cancel",value:function(e){return w(this)?void 0===this._ownerReadableStream?Promise.reject(ue("cancel")):C(this,e):Promise.reject(ve("cancel"))}},{key:"read",value:function(e){return w(this)?void 0===this._ownerReadableStream?Promise.reject(ue("read from")):ArrayBuffer.isView(e)?0===e.byteLength?Promise.reject(new TypeError("view must have non-zero byteLength")):x(this,e):Promise.reject(new TypeError("view must be an array buffer view")):Promise.reject(ve("read"))}},{key:"releaseLock",value:function(){if(!w(this))throw ve("releaseLock");if(void 0!==this._ownerReadableStream){if(this._readIntoRequests.length>0)throw new TypeError("Tried to release a reader lock when that reader has pending read() calls un-settled");k(this)}}},{key:"closed",get:function(){return w(this)?this._closedPromise:Promise.reject(ve("closed"))}}]),e}(),tt=function(){function e(t,r,i,a){if(n(this,e),!1===o(t))throw new TypeError("ReadableStreamDefaultController can only be constructed with a ReadableStream instance");if(void 0!==t._readableStreamController)throw new TypeError("ReadableStreamDefaultController instances can only be created by the ReadableStream constructor");this._controlledReadableStream=t,this._underlyingSource=r,this._queue=void 0,this._queueTotalSize=void 0,Be(this),this._started=!1,this._closeRequested=!1,this._pullAgain=!1,this._pulling=!1;var s=Ee(i,a);this._strategySize=s.size,this._strategyHWM=s.highWaterMark;var l=this,u=ke(r,"start",[this]);Promise.resolve(u).then(function(){l._started=!0,Me(!1===l._pulling),Me(!1===l._pullAgain),O(l)},function(e){j(l,e)}).catch(Ne)}return Se(e,[{key:"close",value:function(){if(!1===E(this))throw be("close");if(!0===this._closeRequested)throw new TypeError("The stream has already been closed; do not close it again!");var e=this._controlledReadableStream._state;if("readable"!==e)throw new TypeError("The stream (in "+e+" state) is not in the readable state and cannot be closed");L(this)}},{key:"enqueue",value:function(e){if(!1===E(this))throw be("enqueue");if(!0===this._closeRequested)throw new TypeError("stream is closed or draining");var t=this._controlledReadableStream._state;if("readable"!==t)throw new TypeError("The stream (in "+t+" state) is not in the readable state and cannot be enqueued to");return F(this,e)}},{key:"error",value:function(e){if(!1===E(this))throw be("error");var t=this._controlledReadableStream;if("readable"!==t._state)throw new TypeError("The stream is "+t._state+" and so cannot be errored");D(this,e)}},{key:"__cancelSteps",value:function(e){return Be(this),xe(this._underlyingSource,"cancel",[e])}},{key:"__pullSteps",value:function(){var e=this._controlledReadableStream;if(this._queue.length>0){var t=We(this);return!0===this._closeRequested&&0===this._queue.length?m(e):O(this),Promise.resolve(Re(t,!1))}var r=f(e);return O(this),r}},{key:"desiredSize",get:function(){if(!1===E(this))throw be("desiredSize");return M(this)}}]),e}(),rt=function(){function e(t,r){n(this,e),this._associatedReadableByteStreamController=t,this._view=r}return Se(e,[{key:"respond",value:function(e){if(!1===q(this))throw _e("respond");if(void 0===this._associatedReadableByteStreamController)throw new TypeError("This BYOB request has been invalidated");oe(this._associatedReadableByteStreamController,e)}},{key:"respondWithNewView",value:function(e){if(!1===q(this))throw _e("respond");if(void 0===this._associatedReadableByteStreamController)throw new TypeError("This BYOB request has been invalidated");if(!ArrayBuffer.isView(e))throw new TypeError("You can only respond with array buffer views");se(this._associatedReadableByteStreamController,e)}},{key:"view",get:function(){return this._view}}]),e}(),nt=function(){function e(t,r,i){if(n(this,e),!1===o(t))throw new TypeError("ReadableByteStreamController can only be constructed with a ReadableStream instance given a byte source");if(void 0!==t._readableStreamController)throw new TypeError("ReadableByteStreamController instances can only be created by the ReadableStream constructor given a byte source");this._controlledReadableStream=t,this._underlyingByteSource=r,this._pullAgain=!1,this._pulling=!1,U(this),this._queue=this._queueTotalSize=void 0,Be(this),this._closeRequested=!1,this._started=!1,this._strategyHWM=Oe(i);var a=r.autoAllocateChunkSize;if(void 0!==a&&(!1===Number.isInteger(a)||a<=0))throw new RangeError("autoAllocateChunkSize must be a positive integer");this._autoAllocateChunkSize=a,this._pendingPullIntos=[];var s=this,l=ke(r,"start",[this]);Promise.resolve(l).then(function(){s._started=!0,Me(!1===s._pulling),Me(!1===s._pullAgain),W(s)},function(e){"readable"===t._state&&ie(s,e)}).catch(Ne)}return Se(e,[{key:"close",value:function(){if(!1===N(this))throw ye("close");if(!0===this._closeRequested)throw new TypeError("The stream has already been closed; do not close it again!");var e=this._controlledReadableStream._state;if("readable"!==e)throw new TypeError("The stream (in "+e+" state) is not in the readable state and cannot be closed");re(this)}},{key:"enqueue",value:function(e){if(!1===N(this))throw ye("enqueue");if(!0===this._closeRequested)throw new TypeError("stream is closed or draining");var t=this._controlledReadableStream._state;if("readable"!==t)throw new TypeError("The stream (in "+t+" state) is not in the readable state and cannot be enqueued to");if(!ArrayBuffer.isView(e))throw new TypeError("You can only enqueue array buffer views when using a ReadableByteStreamController");ne(this,e)}},{key:"error",value:function(e){if(!1===N(this))throw ye("error");var t=this._controlledReadableStream;if("readable"!==t._state)throw new TypeError("The stream is "+t._state+" and so cannot be errored");ie(this,e)}},{key:"__cancelSteps",value:function(e){return this._pendingPullIntos.length>0&&(this._pendingPullIntos[0].bytesFilled=0),Be(this),xe(this._underlyingByteSource,"cancel",[e])}},{key:"__pullSteps",value:function(){var e=this._controlledReadableStream;if(Me(!0===S(e)),this._queueTotalSize>0){Me(0===y(e));var t=this._queue.shift();this._queueTotalSize-=t.byteLength,V(this);var r=void 0;try{r=new Uint8Array(t.buffer,t.byteOffset,t.byteLength)}catch(e){return Promise.reject(e)}return Promise.resolve(Re(r,!1))}var n=this._autoAllocateChunkSize;if(void 0!==n){var i=void 0;try{i=new ArrayBuffer(n)}catch(e){return Promise.reject(e)}var a={buffer:i,byteOffset:0,byteLength:n,bytesFilled:0,elementSize:1,ctor:Uint8Array,readerType:"default"};this._pendingPullIntos.push(a)}var o=f(e);return W(this),o}},{key:"byobRequest",get:function(){if(!1===N(this))throw ye("byobRequest");if(void 0===this._byobRequest&&this._pendingPullIntos.length>0){var e=this._pendingPullIntos[0],t=new Uint8Array(e.buffer,e.byteOffset+e.bytesFilled,e.byteLength-e.bytesFilled);this._byobRequest=new rt(this,t)}return this._byobRequest}},{key:"desiredSize",get:function(){if(!1===N(this))throw ye("desiredSize");return ae(this)}}]),e}()},function(e,t,r){var n=r(6),i=r(4),a=r(2);t.TransformStream=n.TransformStream,t.ReadableStream=i.ReadableStream,t.IsReadableStreamDisturbed=i.IsReadableStreamDisturbed,t.ReadableStreamDefaultControllerClose=i.ReadableStreamDefaultControllerClose,t.ReadableStreamDefaultControllerEnqueue=i.ReadableStreamDefaultControllerEnqueue,t.ReadableStreamDefaultControllerError=i.ReadableStreamDefaultControllerError,t.ReadableStreamDefaultControllerGetDesiredSize=i.ReadableStreamDefaultControllerGetDesiredSize,t.AcquireWritableStreamDefaultWriter=a.AcquireWritableStreamDefaultWriter,t.IsWritableStream=a.IsWritableStream,t.IsWritableStreamLocked=a.IsWritableStreamLocked,t.WritableStream=a.WritableStream,t.WritableStreamAbort=a.WritableStreamAbort,t.WritableStreamDefaultControllerError=a.WritableStreamDefaultControllerError,t.WritableStreamDefaultWriterCloseWithErrorPropagation=a.WritableStreamDefaultWriterCloseWithErrorPropagation,t.WritableStreamDefaultWriterRelease=a.WritableStreamDefaultWriterRelease,t.WritableStreamDefaultWriterWrite=a.WritableStreamDefaultWriterWrite},function(e,t,r){function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e){if(!0===e._errored)throw new TypeError("TransformStream is already errored");if(!0===e._readableClosed)throw new TypeError("Readable side is already closed");s(e)}function a(e,t){if(!0===e._errored)throw new TypeError("TransformStream is already errored");if(!0===e._readableClosed)throw new TypeError("Readable side is already closed");var r=e._readableController;try{x(r,t)}catch(t){throw e._readableClosed=!0,l(e,t),e._storedError}!0===E(r)<=0&&!1===e._backpressure&&h(e,!0)}function o(e,t){if(!0===e._errored)throw new TypeError("TransformStream is already errored");u(e,t)}function s(e){_(!1===e._errored),_(!1===e._readableClosed);try{k(e._readableController)}catch(e){_(!1)}e._readableClosed=!0}function l(e,t){!1===e._errored&&u(e,t)}function u(e,t){_(!1===e._errored),e._errored=!0,e._storedError=t,!1===e._writableDone&&L(e._writableController,t),!1===e._readableClosed&&T(e._readableController,t)}function c(e){return _(void 0!==e._backpressureChangePromise,"_backpressureChangePromise should have been initialized"),!1===e._backpressure?Promise.resolve():(_(!0===e._backpressure,"_backpressure should have been initialized"),e._backpressureChangePromise)}function h(e,t){_(e._backpressure!==t,"TransformStreamSetBackpressure() should be called only when backpressure is changed"),void 0!==e._backpressureChangePromise&&e._backpressureChangePromise_resolve(t),e._backpressureChangePromise=new Promise(function(t){e._backpressureChangePromise_resolve=t}),e._backpressureChangePromise.then(function(e){_(e!==t,"_backpressureChangePromise should be fulfilled only when backpressure is changed")}),e._backpressure=t}function d(e,t){return a(t._controlledTransformStream,e),Promise.resolve()}function f(e,t){_(!1===e._errored),_(!1===e._transforming),_(!1===e._backpressure),e._transforming=!0;var r=e._transformer,n=e._transformStreamController;return S(r,"transform",[t,n],d,[t,n]).then(function(){return e._transforming=!1,c(e)},function(t){return l(e,t),Promise.reject(t)})}function p(e){return!!P(e)&&!!Object.prototype.hasOwnProperty.call(e,"_controlledTransformStream")}function m(e){return!!P(e)&&!!Object.prototype.hasOwnProperty.call(e,"_transformStreamController")}function g(e){return new TypeError("TransformStreamDefaultController.prototype."+e+" can only be used on a TransformStreamDefaultController")}function v(e){return new TypeError("TransformStream.prototype."+e+" can only be used on a TransformStream")}var b=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),_=r(1).assert,y=r(0),A=y.InvokeOrNoop,S=y.PromiseInvokeOrPerformFallback,w=y.PromiseInvokeOrNoop,P=y.typeIsObject,R=r(4),C=R.ReadableStream,k=R.ReadableStreamDefaultControllerClose,x=R.ReadableStreamDefaultControllerEnqueue,T=R.ReadableStreamDefaultControllerError,E=R.ReadableStreamDefaultControllerGetDesiredSize,O=r(2),I=O.WritableStream,L=O.WritableStreamDefaultControllerError,F=function(){function e(t,r){n(this,e),this._transformStream=t,this._startPromise=r}return b(e,[{key:"start",value:function(e){var t=this._transformStream;return t._writableController=e,this._startPromise.then(function(){return c(t)})}},{key:"write",value:function(e){return f(this._transformStream,e)}},{key:"abort",value:function(){var e=this._transformStream;e._writableDone=!0,u(e,new TypeError("Writable side aborted"))}},{key:"close",value:function(){var e=this._transformStream;return _(!1===e._transforming),e._writableDone=!0,w(e._transformer,"flush",[e._transformStreamController]).then(function(){return!0===e._errored?Promise.reject(e._storedError):(!1===e._readableClosed&&s(e),Promise.resolve())}).catch(function(t){return l(e,t),Promise.reject(e._storedError)})}}]),e}(),D=function(){function e(t,r){n(this,e),this._transformStream=t,this._startPromise=r}return b(e,[{key:"start",value:function(e){var t=this._transformStream;return t._readableController=e,this._startPromise.then(function(){return _(void 0!==t._backpressureChangePromise,"_backpressureChangePromise should have been initialized"),!0===t._backpressure?Promise.resolve():(_(!1===t._backpressure,"_backpressure should have been initialized"),t._backpressureChangePromise)})}},{key:"pull",value:function(){var e=this._transformStream;return _(!0===e._backpressure,"pull() should be never called while _backpressure is false"),_(void 0!==e._backpressureChangePromise,"_backpressureChangePromise should have been initialized"),h(e,!1),e._backpressureChangePromise}},{key:"cancel",value:function(){var e=this._transformStream;e._readableClosed=!0,u(e,new TypeError("Readable side canceled"))}}]),e}(),j=function(){function e(t){if(n(this,e),!1===m(t))throw new TypeError("TransformStreamDefaultController can only be constructed with a TransformStream instance");if(void 0!==t._transformStreamController)throw new TypeError("TransformStreamDefaultController instances can only be created by the TransformStream constructor");this._controlledTransformStream=t}return b(e,[{key:"enqueue",value:function(e){if(!1===p(this))throw g("enqueue");a(this._controlledTransformStream,e)}},{key:"close",value:function(){if(!1===p(this))throw g("close");i(this._controlledTransformStream)}},{key:"error",value:function(e){if(!1===p(this))throw g("error");o(this._controlledTransformStream,e)}},{key:"desiredSize",get:function(){if(!1===p(this))throw g("desiredSize");var e=this._controlledTransformStream._readableController;return E(e)}}]),e}(),M=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};n(this,e),this._transformer=t;var r=t.readableStrategy,i=t.writableStrategy;this._transforming=!1,this._errored=!1,this._storedError=void 0,this._writableController=void 0,this._readableController=void 0,this._transformStreamController=void 0,this._writableDone=!1,this._readableClosed=!1,this._backpressure=void 0,this._backpressureChangePromise=void 0,this._backpressureChangePromise_resolve=void 0,this._transformStreamController=new j(this);var a=void 0,o=new Promise(function(e){a=e}),s=new D(this,o);this._readable=new C(s,r);var l=new F(this,o);this._writable=new I(l,i),_(void 0!==this._writableController),_(void 0!==this._readableController),h(this,E(this._readableController)<=0);var u=this,c=A(t,"start",[u._transformStreamController]);a(c),o.catch(function(e){!1===u._errored&&(u._errored=!0,u._storedError=e)})}return b(e,[{key:"readable",get:function(){if(!1===m(this))throw v("readable");return this._readable}},{key:"writable",get:function(){if(!1===m(this))throw v("writable");return this._writable}}]),e}();e.exports={TransformStream:M}},function(e,t,r){e.exports=r(5)}]))},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.PDFJS=t.isWorker=t.globalScope=void 0;var n=r(48),i=r(7),a=r(0),o=r(51),s=function(e){return e&&e.__esModule?e:{default:e}}(r(9)),l=r(50),u=r(52),c=r(53),h="undefined"==typeof window;s.default.PDFJS||(s.default.PDFJS={});var d=s.default.PDFJS;d.version="1.9.575",d.build="9c2e9dae",d.pdfBug=!1,void 0!==d.verbosity&&(0,a.setVerbosityLevel)(d.verbosity),delete d.verbosity,Object.defineProperty(d,"verbosity",{get:function(){return(0,a.getVerbosityLevel)()},set:function(e){(0,a.setVerbosityLevel)(e)},enumerable:!0,configurable:!0}),d.VERBOSITY_LEVELS=a.VERBOSITY_LEVELS,d.OPS=a.OPS,d.UNSUPPORTED_FEATURES=a.UNSUPPORTED_FEATURES,d.isValidUrl=i.isValidUrl,d.shadow=a.shadow,d.createBlob=a.createBlob,d.createObjectURL=function(e,t){return(0,a.createObjectURL)(e,t,d.disableCreateObjectURL)},Object.defineProperty(d,"isLittleEndian",{configurable:!0,get:function(){return(0,a.shadow)(d,"isLittleEndian",(0,a.isLittleEndian)())}}),d.removeNullCharacters=a.removeNullCharacters,d.PasswordResponses=a.PasswordResponses,d.PasswordException=a.PasswordException,d.UnknownErrorException=a.UnknownErrorException,d.InvalidPDFException=a.InvalidPDFException,d.MissingPDFException=a.MissingPDFException,d.UnexpectedResponseException=a.UnexpectedResponseException,d.Util=a.Util,d.PageViewport=a.PageViewport,d.createPromiseCapability=a.createPromiseCapability,d.maxImageSize=void 0===d.maxImageSize?-1:d.maxImageSize,d.cMapUrl=void 0===d.cMapUrl?null:d.cMapUrl,d.cMapPacked=void 0!==d.cMapPacked&&d.cMapPacked,d.disableFontFace=void 0!==d.disableFontFace&&d.disableFontFace,d.imageResourcesPath=void 0===d.imageResourcesPath?"":d.imageResourcesPath,d.disableWorker=void 0!==d.disableWorker&&d.disableWorker,d.workerSrc=void 0===d.workerSrc?null:d.workerSrc,d.workerPort=void 0===d.workerPort?null:d.workerPort,d.disableRange=void 0!==d.disableRange&&d.disableRange,d.disableStream=void 0!==d.disableStream&&d.disableStream,d.disableAutoFetch=void 0!==d.disableAutoFetch&&d.disableAutoFetch,d.pdfBug=void 0!==d.pdfBug&&d.pdfBug,d.postMessageTransfers=void 0===d.postMessageTransfers||d.postMessageTransfers,d.disableCreateObjectURL=void 0!==d.disableCreateObjectURL&&d.disableCreateObjectURL,d.disableWebGL=void 0===d.disableWebGL||d.disableWebGL,d.externalLinkTarget=void 0===d.externalLinkTarget?i.LinkTarget.NONE:d.externalLinkTarget,d.externalLinkRel=void 0===d.externalLinkRel?i.DEFAULT_LINK_REL:d.externalLinkRel,d.isEvalSupported=void 0===d.isEvalSupported||d.isEvalSupported,d.pdfjsNext=void 0!==d.pdfjsNext&&d.pdfjsNext;var f=d.openExternalLinksInNewWindow;delete d.openExternalLinksInNewWindow,Object.defineProperty(d,"openExternalLinksInNewWindow",{get:function(){return d.externalLinkTarget===i.LinkTarget.BLANK},set:function(e){e&&(0,a.deprecated)('PDFJS.openExternalLinksInNewWindow, please use "PDFJS.externalLinkTarget = PDFJS.LinkTarget.BLANK" instead.'),d.externalLinkTarget===i.LinkTarget.NONE?d.externalLinkTarget=e?i.LinkTarget.BLANK:i.LinkTarget.NONE:(0,a.warn)("PDFJS.externalLinkTarget is already initialized")},enumerable:!0,configurable:!0}),f&&(d.openExternalLinksInNewWindow=f),d.getDocument=n.getDocument,d.LoopbackPort=n.LoopbackPort,d.PDFDataRangeTransport=n.PDFDataRangeTransport,d.PDFWorker=n.PDFWorker,d.hasCanvasTypedArrays=!0,d.CustomStyle=i.CustomStyle,d.LinkTarget=i.LinkTarget,d.addLinkAttributes=i.addLinkAttributes,d.getFilenameFromUrl=i.getFilenameFromUrl,d.isExternalLinkTargetSet=i.isExternalLinkTargetSet,d.AnnotationLayer=o.AnnotationLayer,d.renderTextLayer=u.renderTextLayer,d.Metadata=l.Metadata,d.SVGGraphics=c.SVGGraphics,d.UnsupportedManager=n._UnsupportedManager,t.globalScope=s.default,t.isWorker=h,t.PDFJS=d},function(e,t,r){"use strict";function n(e){this.docId=e,this.styleElement=null,this.nativeFontFaces=[],this.loadTestFontId=0,this.loadingContext={requests:[],nextRequestId:0}}Object.defineProperty(t,"__esModule",{value:!0}),t.FontLoader=t.FontFaceObject=void 0;var i=r(0);n.prototype={insertRule:function(e){var t=this.styleElement;t||((t=this.styleElement=document.createElement("style")).id="PDFJS_FONT_STYLE_TAG_"+this.docId,document.documentElement.getElementsByTagName("head")[0].appendChild(t));var r=t.sheet;r.insertRule(e,r.cssRules.length)},clear:function(){this.styleElement&&(this.styleElement.remove(),this.styleElement=null),this.nativeFontFaces.forEach(function(e){document.fonts.delete(e)}),this.nativeFontFaces.length=0}};var a=function(){return atob("T1RUTwALAIAAAwAwQ0ZGIDHtZg4AAAOYAAAAgUZGVE1lkzZwAAAEHAAAABxHREVGABQAFQAABDgAAAAeT1MvMlYNYwkAAAEgAAAAYGNtYXABDQLUAAACNAAAAUJoZWFk/xVFDQAAALwAAAA2aGhlYQdkA+oAAAD0AAAAJGhtdHgD6AAAAAAEWAAAAAZtYXhwAAJQAAAAARgAAAAGbmFtZVjmdH4AAAGAAAAAsXBvc3T/hgAzAAADeAAAACAAAQAAAAEAALZRFsRfDzz1AAsD6AAAAADOBOTLAAAAAM4KHDwAAAAAA+gDIQAAAAgAAgAAAAAAAAABAAADIQAAAFoD6AAAAAAD6AABAAAAAAAAAAAAAAAAAAAAAQAAUAAAAgAAAAQD6AH0AAUAAAKKArwAAACMAooCvAAAAeAAMQECAAACAAYJAAAAAAAAAAAAAQAAAAAAAAAAAAAAAFBmRWQAwAAuAC4DIP84AFoDIQAAAAAAAQAAAAAAAAAAACAAIAABAAAADgCuAAEAAAAAAAAAAQAAAAEAAAAAAAEAAQAAAAEAAAAAAAIAAQAAAAEAAAAAAAMAAQAAAAEAAAAAAAQAAQAAAAEAAAAAAAUAAQAAAAEAAAAAAAYAAQAAAAMAAQQJAAAAAgABAAMAAQQJAAEAAgABAAMAAQQJAAIAAgABAAMAAQQJAAMAAgABAAMAAQQJAAQAAgABAAMAAQQJAAUAAgABAAMAAQQJAAYAAgABWABYAAAAAAAAAwAAAAMAAAAcAAEAAAAAADwAAwABAAAAHAAEACAAAAAEAAQAAQAAAC7//wAAAC7////TAAEAAAAAAAABBgAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAAAAAD/gwAyAAAAAQAAAAAAAAAAAAAAAAAAAAABAAQEAAEBAQJYAAEBASH4DwD4GwHEAvgcA/gXBIwMAYuL+nz5tQXkD5j3CBLnEQACAQEBIVhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYAAABAQAADwACAQEEE/t3Dov6fAH6fAT+fPp8+nwHDosMCvm1Cvm1DAz6fBQAAAAAAAABAAAAAMmJbzEAAAAAzgTjFQAAAADOBOQpAAEAAAAAAAAADAAUAAQAAAABAAAAAgABAAAAAAAAAAAD6AAAAAAAAA==")};Object.defineProperty(n.prototype,"loadTestFont",{get:function(){return(0,i.shadow)(this,"loadTestFont",a())},configurable:!0}),n.prototype.addNativeFontFace=function(e){this.nativeFontFaces.push(e),document.fonts.add(e)},n.prototype.bind=function(e,t){for(var r=[],a=[],o=[],s=n.isFontLoadingAPISupported&&!n.isSyncFontLoadingSupported,l=0,u=e.length;l<u;l++){var c=e[l];if(!c.attached&&!1!==c.loading)if(c.attached=!0,s){var h=c.createNativeFontFace();h&&(this.addNativeFontFace(h),o.push(function(e){return e.loaded.catch(function(t){(0,i.warn)('Failed to load font "'+e.family+'": '+t)})}(h)))}else{var d=c.createFontFaceRule();d&&(this.insertRule(d),r.push(d),a.push(c))}}var f=this.queueLoadingCallback(t);s?Promise.all(o).then(function(){f.complete()}):r.length>0&&!n.isSyncFontLoadingSupported?this.prepareFontLoadEvent(r,a,f):f.complete()},n.prototype.queueLoadingCallback=function(e){var t=this.loadingContext,r={id:"pdfjs-font-loading-"+t.nextRequestId++,complete:function(){for((0,i.assert)(!r.end,"completeRequest() cannot be called twice"),r.end=Date.now();t.requests.length>0&&t.requests[0].end;){var e=t.requests.shift();setTimeout(e.callback,0)}},callback:e,started:Date.now()};return t.requests.push(r),r},n.prototype.prepareFontLoadEvent=function(e,t,r){function n(e,t){return e.charCodeAt(t)<<24|e.charCodeAt(t+1)<<16|e.charCodeAt(t+2)<<8|255&e.charCodeAt(t+3)}function a(e,t,r,n){return e.substr(0,t)+n+e.substr(t+r)}function o(e,t){if(++h>30)return(0,i.warn)("Load test font never loaded."),void t();c.font="30px "+e,c.fillText(".",0,20),c.getImageData(0,0,1,1).data[3]>0?t():setTimeout(o.bind(null,e,t))}var s,l,u=document.createElement("canvas");u.width=1,u.height=1;var c=u.getContext("2d"),h=0,d="lt"+Date.now()+this.loadTestFontId++,f=this.loadTestFont,p=n(f=a(f,976,d.length,d),16);for(s=0,l=d.length-3;s<l;s+=4)p=p-1482184792+n(d,s)|0;s<d.length&&(p=p-1482184792+n(d+"XXX",s)|0),f=a(f,16,4,(0,i.string32)(p));var m='@font-face { font-family:"'+d+'";src:'+("url(data:font/opentype;base64,"+btoa(f)+");")+"}";this.insertRule(m);var g=[];for(s=0,l=t.length;s<l;s++)g.push(t[s].loadedName);g.push(d);var v=document.createElement("div");for(v.setAttribute("style","visibility: hidden;width: 10px; height: 10px;position: absolute; top: 0px; left: 0px;"),s=0,l=g.length;s<l;++s){var b=document.createElement("span");b.textContent="Hi",b.style.fontFamily=g[s],v.appendChild(b)}document.body.appendChild(v),o(d,function(){document.body.removeChild(v),r.complete()})},n.isFontLoadingAPISupported="undefined"!=typeof document&&!!document.fonts;var o=function(){if("undefined"==typeof navigator)return!0;var e=!1,t=/Mozilla\/5.0.*?rv:(\d+).*? Gecko/.exec(navigator.userAgent);return t&&t[1]>=14&&(e=!0),e};Object.defineProperty(n,"isSyncFontLoadingSupported",{get:function(){return(0,i.shadow)(n,"isSyncFontLoadingSupported",o())},enumerable:!0,configurable:!0});var s={get value(){return(0,i.shadow)(this,"value",(0,i.isEvalSupported)())}},l=function(){function e(e,t){this.compiledGlyphs=Object.create(null);for(var r in e)this[r]=e[r];this.options=t}return e.prototype={createNativeFontFace:function(){if(!this.data)return null;if(this.options.disableFontFace)return this.disableFontFace=!0,null;var e=new FontFace(this.loadedName,this.data,{});return this.options.fontRegistry&&this.options.fontRegistry.registerFont(this),e},createFontFaceRule:function(){if(!this.data)return null;if(this.options.disableFontFace)return this.disableFontFace=!0,null;var e=(0,i.bytesToString)(new Uint8Array(this.data)),t=this.loadedName,r="url(data:"+this.mimetype+";base64,"+btoa(e)+");",n='@font-face { font-family:"'+t+'";src:'+r+"}";return this.options.fontRegistry&&this.options.fontRegistry.registerFont(this,r),n},getPathGenerator:function(e,t){if(!(t in this.compiledGlyphs)){var r,n,i,a=e.get(this.loadedName+"_path_"+t);if(this.options.isEvalSupported&&s.value){var o,l="";for(n=0,i=a.length;n<i;n++)o=void 0!==(r=a[n]).args?r.args.join(","):"",l+="c."+r.cmd+"("+o+");\n";this.compiledGlyphs[t]=new Function("c","size",l)}else this.compiledGlyphs[t]=function(e,t){for(n=0,i=a.length;n<i;n++)"scale"===(r=a[n]).cmd&&(r.args=[t,-t]),e[r.cmd].apply(e,r.args)}}return this.compiledGlyphs[t]}},e}();t.FontFaceObject=l,t.FontLoader=n},function(e,t,r){"use strict";function n(e){e.mozCurrentTransform||(e._originalSave=e.save,e._originalRestore=e.restore,e._originalRotate=e.rotate,e._originalScale=e.scale,e._originalTranslate=e.translate,e._originalTransform=e.transform,e._originalSetTransform=e.setTransform,e._transformMatrix=e._transformMatrix||[1,0,0,1,0,0],e._transformStack=[],Object.defineProperty(e,"mozCurrentTransform",{get:function(){return this._transformMatrix}}),Object.defineProperty(e,"mozCurrentTransformInverse",{get:function(){var e=this._transformMatrix,t=e[0],r=e[1],n=e[2],i=e[3],a=e[4],o=e[5],s=t*i-r*n,l=r*n-t*i;return[i/s,r/l,n/l,t/s,(i*a-n*o)/l,(r*a-t*o)/s]}}),e.save=function(){var e=this._transformMatrix;this._transformStack.push(e),this._transformMatrix=e.slice(0,6),this._originalSave()},e.restore=function(){var e=this._transformStack.pop();e&&(this._transformMatrix=e,this._originalRestore())},e.translate=function(e,t){var r=this._transformMatrix;r[4]=r[0]*e+r[2]*t+r[4],r[5]=r[1]*e+r[3]*t+r[5],this._originalTranslate(e,t)},e.scale=function(e,t){var r=this._transformMatrix;r[0]=r[0]*e,r[1]=r[1]*e,r[2]=r[2]*t,r[3]=r[3]*t,this._originalScale(e,t)},e.transform=function(t,r,n,i,a,o){var s=this._transformMatrix;this._transformMatrix=[s[0]*t+s[2]*r,s[1]*t+s[3]*r,s[0]*n+s[2]*i,s[1]*n+s[3]*i,s[0]*a+s[2]*o+s[4],s[1]*a+s[3]*o+s[5]],e._originalTransform(t,r,n,i,a,o)},e.setTransform=function(t,r,n,i,a,o){this._transformMatrix=[t,r,n,i,a,o],e._originalSetTransform(t,r,n,i,a,o)},e.rotate=function(e){var t=Math.cos(e),r=Math.sin(e),n=this._transformMatrix;this._transformMatrix=[n[0]*t+n[2]*r,n[1]*t+n[3]*r,n[0]*-r+n[2]*t,n[1]*-r+n[3]*t,n[4],n[5]],this._originalRotate(e)})}function i(e){var t,r,n,i,a=e.width,o=e.height,s=a+1,l=new Uint8Array(s*(o+1)),u=new Uint8Array([0,2,4,0,1,0,5,4,8,10,0,8,0,2,1,0]),c=a+7&-8,h=e.data,d=new Uint8Array(c*o),f=0;for(t=0,i=h.length;t<i;t++)for(var p=128,m=h[t];p>0;)d[f++]=m&p?0:255,p>>=1;var g=0;for(0!==d[f=0]&&(l[0]=1,++g),r=1;r<a;r++)d[f]!==d[f+1]&&(l[r]=d[f]?2:1,++g),f++;for(0!==d[f]&&(l[r]=2,++g),t=1;t<o;t++){n=t*s,d[(f=t*c)-c]!==d[f]&&(l[n]=d[f]?1:8,++g);var v=(d[f]?4:0)+(d[f-c]?8:0);for(r=1;r<a;r++)u[v=(v>>2)+(d[f+1]?4:0)+(d[f-c+1]?8:0)]&&(l[n+r]=u[v],++g),f++;if(d[f-c]!==d[f]&&(l[n+r]=d[f]?2:4,++g),g>1e3)return null}for(n=t*s,0!==d[f=c*(o-1)]&&(l[n]=8,++g),r=1;r<a;r++)d[f]!==d[f+1]&&(l[n+r]=d[f]?4:8,++g),f++;if(0!==d[f]&&(l[n+r]=4,++g),g>1e3)return null;var b=new Int32Array([0,s,-1,0,-s,0,0,0,1]),_=[];for(t=0;g&&t<=o;t++){for(var y=t*s,A=y+a;y<A&&!l[y];)y++;if(y!==A){var S,w=[y%s,t],P=l[y],R=y;do{var C=b[P];do{y+=C}while(!l[y]);5!==(S=l[y])&&10!==S?(P=S,l[y]=0):(P=S&51*P>>4,l[y]&=P>>2|P<<2),w.push(y%s),w.push(y/s|0),--g}while(R!==y);_.push(w),--t}}return function(e){e.save(),e.scale(1/a,-1/o),e.translate(0,-o),e.beginPath();for(var t=0,r=_.length;t<r;t++){var n=_[t];e.moveTo(n[0],n[1]);for(var i=2,s=n.length;i<s;i+=2)e.lineTo(n[i],n[i+1])}e.fill(),e.beginPath(),e.restore()}}Object.defineProperty(t,"__esModule",{value:!0}),t.CanvasGraphics=void 0;var a=r(0),o=r(85),s=r(49),l=16,u={get value(){return(0,a.shadow)(u,"value",(0,a.isLittleEndian)())}},c=function(){function e(e){this.canvasFactory=e,this.cache=Object.create(null)}return e.prototype={getCanvas:function(e,t,r,i){var a;return void 0!==this.cache[e]?(a=this.cache[e],this.canvasFactory.reset(a,t,r),a.context.setTransform(1,0,0,1,0,0)):(a=this.canvasFactory.create(t,r),this.cache[e]=a),i&&n(a.context),a},clear:function(){for(var e in this.cache){var t=this.cache[e];this.canvasFactory.destroy(t),delete this.cache[e]}}},e}(),h=function(){function e(){this.alphaIsShape=!1,this.fontSize=0,this.fontSizeScale=1,this.textMatrix=a.IDENTITY_MATRIX,this.textMatrixScale=1,this.fontMatrix=a.FONT_IDENTITY_MATRIX,this.leading=0,this.x=0,this.y=0,this.lineX=0,this.lineY=0,this.charSpacing=0,this.wordSpacing=0,this.textHScale=1,this.textRenderingMode=a.TextRenderingMode.FILL,this.textRise=0,this.fillColor="#000000",this.strokeColor="#000000",this.patternFill=!1,this.fillAlpha=1,this.strokeAlpha=1,this.lineWidth=1,this.activeSMask=null,this.resumeSMaskCtx=null}return e.prototype={clone:function(){return Object.create(this)},setCurrentPoint:function(e,t){this.x=e,this.y=t}},e}(),d=function(){function e(e,t,r,i,a){this.ctx=e,this.current=new h,this.stateStack=[],this.pendingClip=null,this.pendingEOFill=!1,this.res=null,this.xobjs=null,this.commonObjs=t,this.objs=r,this.canvasFactory=i,this.imageLayer=a,this.groupStack=[],this.processingType3=null,this.baseTransform=null,this.baseTransformStack=[],this.groupLevel=0,this.smaskStack=[],this.smaskCounter=0,this.tempSMask=null,this.cachedCanvases=new c(this.canvasFactory),e&&n(e),this.cachedGetSinglePixelWidth=null}function t(e,t){if("undefined"!=typeof ImageData&&t instanceof ImageData)e.putImageData(t,0,0);else{var r,n,i,o,s,c=t.height,h=t.width,d=c%l,f=(c-d)/l,p=0===d?f:f+1,m=e.createImageData(h,l),g=0,v=t.data,b=m.data;if(t.kind===a.ImageKind.GRAYSCALE_1BPP){var _=v.byteLength,y=new Uint32Array(b.buffer,0,b.byteLength>>2),A=y.length,S=h+7>>3,w=4294967295,P=u.value?4278190080:255;for(n=0;n<p;n++){for(o=n<f?l:d,r=0,i=0;i<o;i++){for(var R=_-g,C=0,k=R>S?h:8*R-7,x=-8&k,T=0,E=0;C<x;C+=8)E=v[g++],y[r++]=128&E?w:P,y[r++]=64&E?w:P,y[r++]=32&E?w:P,y[r++]=16&E?w:P,y[r++]=8&E?w:P,y[r++]=4&E?w:P,y[r++]=2&E?w:P,y[r++]=1&E?w:P;for(;C<k;C++)0===T&&(E=v[g++],T=128),y[r++]=E&T?w:P,T>>=1}for(;r<A;)y[r++]=0;e.putImageData(m,0,n*l)}}else if(t.kind===a.ImageKind.RGBA_32BPP){for(i=0,s=h*l*4,n=0;n<f;n++)b.set(v.subarray(g,g+s)),g+=s,e.putImageData(m,0,i),i+=l;n<p&&(s=h*d*4,b.set(v.subarray(g,g+s)),e.putImageData(m,0,i))}else{if(t.kind!==a.ImageKind.RGB_24BPP)throw new Error("bad image kind: "+t.kind);for(s=h*(o=l),n=0;n<p;n++){for(n>=f&&(s=h*(o=d)),r=0,i=s;i--;)b[r++]=v[g++],b[r++]=v[g++],b[r++]=v[g++],b[r++]=255;e.putImageData(m,0,n*l)}}}}function r(e,t){for(var r=t.height,n=t.width,i=r%l,a=(r-i)/l,o=0===i?a:a+1,s=e.createImageData(n,l),u=0,c=t.data,h=s.data,d=0;d<o;d++){for(var f=d<a?l:i,p=3,m=0;m<f;m++)for(var g=0,v=0;v<n;v++){if(!g){var b=c[u++];g=128}h[p]=b&g?0:255,p+=4,g>>=1}e.putImageData(s,0,d*l)}}function d(e,t){for(var r=["strokeStyle","fillStyle","fillRule","globalAlpha","lineWidth","lineCap","lineJoin","miterLimit","globalCompositeOperation","font"],n=0,i=r.length;n<i;n++){var a=r[n];void 0!==e[a]&&(t[a]=e[a])}void 0!==e.setLineDash&&(t.setLineDash(e.getLineDash()),t.lineDashOffset=e.lineDashOffset)}function f(e){e.strokeStyle="#000000",e.fillStyle="#000000",e.fillRule="nonzero",e.globalAlpha=1,e.lineWidth=1,e.lineCap="butt",e.lineJoin="miter",e.miterLimit=10,e.globalCompositeOperation="source-over",e.font="10px sans-serif",void 0!==e.setLineDash&&(e.setLineDash([]),e.lineDashOffset=0)}function p(e,t,r,n){for(var i=e.length,a=3;a<i;a+=4){var o=e[a];if(0===o)e[a-3]=t,e[a-2]=r,e[a-1]=n;else if(o<255){var s=255-o;e[a-3]=e[a-3]*o+t*s>>8,e[a-2]=e[a-2]*o+r*s>>8,e[a-1]=e[a-1]*o+n*s>>8}}}function m(e,t,r){for(var n=e.length,i=3;i<n;i+=4){var a=r?r[e[i]]:e[i];t[i]=t[i]*a*(1/255)|0}}function g(e,t,r){for(var n=e.length,i=3;i<n;i+=4){var a=77*e[i-3]+152*e[i-2]+28*e[i-1];t[i]=r?t[i]*r[a>>8]>>8:t[i]*a>>16}}function v(e,t,r,n,i,a,o){var s,l=!!a,u=l?a[0]:0,c=l?a[1]:0,h=l?a[2]:0;s="Luminosity"===i?g:m;for(var d=Math.min(n,Math.ceil(1048576/r)),f=0;f<n;f+=d){var v=Math.min(d,n-f),b=e.getImageData(0,f,r,v),_=t.getImageData(0,f,r,v);l&&p(b.data,u,c,h),s(b.data,_.data,o),e.putImageData(_,0,f)}}function b(e,t,r){var n=t.canvas,i=t.context;e.setTransform(t.scaleX,0,0,t.scaleY,t.offsetX,t.offsetY);var a=t.backdrop||null;if(!t.transferMap&&s.WebGLUtils.isEnabled){var o=s.WebGLUtils.composeSMask(r.canvas,n,{subtype:t.subtype,backdrop:a});return e.setTransform(1,0,0,1,0,0),void e.drawImage(o,t.offsetX,t.offsetY)}v(i,r,n.width,n.height,t.subtype,a,t.transferMap),e.drawImage(n,0,0)}var _=["butt","round","square"],y=["miter","round","bevel"],A={},S={};e.prototype={beginDrawing:function(e){var t=e.transform,r=e.viewport,n=e.transparency,i=e.background,a=void 0===i?null:i,o=this.ctx.canvas.width,s=this.ctx.canvas.height;if(this.ctx.save(),this.ctx.fillStyle=a||"rgb(255, 255, 255)",this.ctx.fillRect(0,0,o,s),this.ctx.restore(),n){var l=this.cachedCanvases.getCanvas("transparent",o,s,!0);this.compositeCtx=this.ctx,this.transparentCanvas=l.canvas,this.ctx=l.context,this.ctx.save(),this.ctx.transform.apply(this.ctx,this.compositeCtx.mozCurrentTransform)}this.ctx.save(),f(this.ctx),t&&this.ctx.transform.apply(this.ctx,t),this.ctx.transform.apply(this.ctx,r.transform),this.baseTransform=this.ctx.mozCurrentTransform.slice(),this.imageLayer&&this.imageLayer.beginLayout()},executeOperatorList:function(e,t,r,n){var i=e.argsArray,o=e.fnArray,s=t||0,l=i.length;if(l===s)return s;for(var u,c=l-s>10&&"function"==typeof r,h=c?Date.now()+15:0,d=0,f=this.commonObjs,p=this.objs;;){if(void 0!==n&&s===n.nextBreakPoint)return n.breakIt(s,r),s;if((u=o[s])!==a.OPS.dependency)this[u].apply(this,i[s]);else for(var m=i[s],g=0,v=m.length;g<v;g++){var b=m[g],_="g"===b[0]&&"_"===b[1]?f:p;if(!_.isResolved(b))return _.get(b,r),s}if(++s===l)return s;if(c&&++d>10){if(Date.now()>h)return r(),s;d=0}}},endDrawing:function(){null!==this.current.activeSMask&&this.endSMaskGroup(),this.ctx.restore(),this.transparentCanvas&&(this.ctx=this.compositeCtx,this.ctx.save(),this.ctx.setTransform(1,0,0,1,0,0),this.ctx.drawImage(this.transparentCanvas,0,0),this.ctx.restore(),this.transparentCanvas=null),this.cachedCanvases.clear(),s.WebGLUtils.clear(),this.imageLayer&&this.imageLayer.endLayout()},setLineWidth:function(e){this.current.lineWidth=e,this.ctx.lineWidth=e},setLineCap:function(e){this.ctx.lineCap=_[e]},setLineJoin:function(e){this.ctx.lineJoin=y[e]},setMiterLimit:function(e){this.ctx.miterLimit=e},setDash:function(e,t){var r=this.ctx;void 0!==r.setLineDash&&(r.setLineDash(e),r.lineDashOffset=t)},setRenderingIntent:function(e){},setFlatness:function(e){},setGState:function(e){for(var t=0,r=e.length;t<r;t++){var n=e[t],i=n[0],a=n[1];switch(i){case"LW":this.setLineWidth(a);break;case"LC":this.setLineCap(a);break;case"LJ":this.setLineJoin(a);break;case"ML":this.setMiterLimit(a);break;case"D":this.setDash(a[0],a[1]);break;case"RI":this.setRenderingIntent(a);break;case"FL":this.setFlatness(a);break;case"Font":this.setFont(a[0],a[1]);break;case"CA":this.current.strokeAlpha=n[1];break;case"ca":this.current.fillAlpha=n[1],this.ctx.globalAlpha=n[1];break;case"BM":this.ctx.globalCompositeOperation=a;break;case"SMask":this.current.activeSMask&&(this.stateStack.length>0&&this.stateStack[this.stateStack.length-1].activeSMask===this.current.activeSMask?this.suspendSMaskGroup():this.endSMaskGroup()),this.current.activeSMask=a?this.tempSMask:null,this.current.activeSMask&&this.beginSMaskGroup(),this.tempSMask=null}}},beginSMaskGroup:function(){var e=this.current.activeSMask,t=e.canvas.width,r=e.canvas.height,n="smaskGroupAt"+this.groupLevel,i=this.cachedCanvases.getCanvas(n,t,r,!0),a=this.ctx,o=a.mozCurrentTransform;this.ctx.save();var s=i.context;s.scale(1/e.scaleX,1/e.scaleY),s.translate(-e.offsetX,-e.offsetY),s.transform.apply(s,o),e.startTransformInverse=s.mozCurrentTransformInverse,d(a,s),this.ctx=s,this.setGState([["BM","source-over"],["ca",1],["CA",1]]),this.groupStack.push(a),this.groupLevel++},suspendSMaskGroup:function(){var e=this.ctx;this.groupLevel--,this.ctx=this.groupStack.pop(),b(this.ctx,this.current.activeSMask,e),this.ctx.restore(),this.ctx.save(),d(e,this.ctx),this.current.resumeSMaskCtx=e;var t=a.Util.transform(this.current.activeSMask.startTransformInverse,e.mozCurrentTransform);this.ctx.transform.apply(this.ctx,t),e.save(),e.setTransform(1,0,0,1,0,0),e.clearRect(0,0,e.canvas.width,e.canvas.height),e.restore()},resumeSMaskGroup:function(){var e=this.current.resumeSMaskCtx,t=this.ctx;this.ctx=e,this.groupStack.push(t),this.groupLevel++},endSMaskGroup:function(){var e=this.ctx;this.groupLevel--,this.ctx=this.groupStack.pop(),b(this.ctx,this.current.activeSMask,e),this.ctx.restore(),d(e,this.ctx);var t=a.Util.transform(this.current.activeSMask.startTransformInverse,e.mozCurrentTransform);this.ctx.transform.apply(this.ctx,t)},save:function(){this.ctx.save();var e=this.current;this.stateStack.push(e),this.current=e.clone(),this.current.resumeSMaskCtx=null},restore:function(){this.current.resumeSMaskCtx&&this.resumeSMaskGroup(),null===this.current.activeSMask||0!==this.stateStack.length&&this.stateStack[this.stateStack.length-1].activeSMask===this.current.activeSMask||this.endSMaskGroup(),0!==this.stateStack.length&&(this.current=this.stateStack.pop(),this.ctx.restore(),this.pendingClip=null,this.cachedGetSinglePixelWidth=null)},transform:function(e,t,r,n,i,a){this.ctx.transform(e,t,r,n,i,a),this.cachedGetSinglePixelWidth=null},constructPath:function(e,t){for(var r=this.ctx,n=this.current,i=n.x,o=n.y,s=0,l=0,u=e.length;s<u;s++)switch(0|e[s]){case a.OPS.rectangle:i=t[l++],o=t[l++];var c=t[l++],h=t[l++];0===c&&(c=this.getSinglePixelWidth()),0===h&&(h=this.getSinglePixelWidth());var d=i+c,f=o+h;this.ctx.moveTo(i,o),this.ctx.lineTo(d,o),this.ctx.lineTo(d,f),this.ctx.lineTo(i,f),this.ctx.lineTo(i,o),this.ctx.closePath();break;case a.OPS.moveTo:i=t[l++],o=t[l++],r.moveTo(i,o);break;case a.OPS.lineTo:i=t[l++],o=t[l++],r.lineTo(i,o);break;case a.OPS.curveTo:i=t[l+4],o=t[l+5],r.bezierCurveTo(t[l],t[l+1],t[l+2],t[l+3],i,o),l+=6;break;case a.OPS.curveTo2:r.bezierCurveTo(i,o,t[l],t[l+1],t[l+2],t[l+3]),i=t[l+2],o=t[l+3],l+=4;break;case a.OPS.curveTo3:i=t[l+2],o=t[l+3],r.bezierCurveTo(t[l],t[l+1],i,o,i,o),l+=4;break;case a.OPS.closePath:r.closePath()}n.setCurrentPoint(i,o)},closePath:function(){this.ctx.closePath()},stroke:function(e){e=void 0===e||e;var t=this.ctx,r=this.current.strokeColor;t.lineWidth=Math.max(.65*this.getSinglePixelWidth(),this.current.lineWidth),t.globalAlpha=this.current.strokeAlpha,r&&r.hasOwnProperty("type")&&"Pattern"===r.type?(t.save(),t.strokeStyle=r.getPattern(t,this),t.stroke(),t.restore()):t.stroke(),e&&this.consumePath(),t.globalAlpha=this.current.fillAlpha},closeStroke:function(){this.closePath(),this.stroke()},fill:function(e){e=void 0===e||e;var t=this.ctx,r=this.current.fillColor,n=!1;this.current.patternFill&&(t.save(),this.baseTransform&&t.setTransform.apply(t,this.baseTransform),t.fillStyle=r.getPattern(t,this),n=!0),this.pendingEOFill?(t.fill("evenodd"),this.pendingEOFill=!1):t.fill(),n&&t.restore(),e&&this.consumePath()},eoFill:function(){this.pendingEOFill=!0,this.fill()},fillStroke:function(){this.fill(!1),this.stroke(!1),this.consumePath()},eoFillStroke:function(){this.pendingEOFill=!0,this.fillStroke()},closeFillStroke:function(){this.closePath(),this.fillStroke()},closeEOFillStroke:function(){this.pendingEOFill=!0,this.closePath(),this.fillStroke()},endPath:function(){this.consumePath()},clip:function(){this.pendingClip=A},eoClip:function(){this.pendingClip=S},beginText:function(){this.current.textMatrix=a.IDENTITY_MATRIX,this.current.textMatrixScale=1,this.current.x=this.current.lineX=0,this.current.y=this.current.lineY=0},endText:function(){var e=this.pendingTextPaths,t=this.ctx;if(void 0!==e){t.save(),t.beginPath();for(var r=0;r<e.length;r++){var n=e[r];t.setTransform.apply(t,n.transform),t.translate(n.x,n.y),n.addToPath(t,n.fontSize)}t.restore(),t.clip(),t.beginPath(),delete this.pendingTextPaths}else t.beginPath()},setCharSpacing:function(e){this.current.charSpacing=e},setWordSpacing:function(e){this.current.wordSpacing=e},setHScale:function(e){this.current.textHScale=e/100},setLeading:function(e){this.current.leading=-e},setFont:function(e,t){var r=this.commonObjs.get(e),n=this.current;if(!r)throw new Error("Can't find font for "+e);if(n.fontMatrix=r.fontMatrix?r.fontMatrix:a.FONT_IDENTITY_MATRIX,0!==n.fontMatrix[0]&&0!==n.fontMatrix[3]||(0,a.warn)("Invalid font matrix for font "+e),t<0?(t=-t,n.fontDirection=-1):n.fontDirection=1,this.current.font=r,this.current.fontSize=t,!r.isType3Font){var i=r.loadedName||"sans-serif",o=r.black?"900":r.bold?"bold":"normal",s=r.italic?"italic":"normal",l='"'+i+'", '+r.fallbackName,u=t<16?16:t>100?100:t;this.current.fontSizeScale=t/u;var c=s+" "+o+" "+u+"px "+l;this.ctx.font=c}},setTextRenderingMode:function(e){this.current.textRenderingMode=e},setTextRise:function(e){this.current.textRise=e},moveText:function(e,t){this.current.x=this.current.lineX+=e,this.current.y=this.current.lineY+=t},setLeadingMoveText:function(e,t){this.setLeading(-t),this.moveText(e,t)},setTextMatrix:function(e,t,r,n,i,a){this.current.textMatrix=[e,t,r,n,i,a],this.current.textMatrixScale=Math.sqrt(e*e+t*t),this.current.x=this.current.lineX=0,this.current.y=this.current.lineY=0},nextLine:function(){this.moveText(0,this.current.leading)},paintChar:function(e,t,r){var n,i=this.ctx,o=this.current,s=o.font,l=o.textRenderingMode,u=o.fontSize/o.fontSizeScale,c=l&a.TextRenderingMode.FILL_STROKE_MASK,h=!!(l&a.TextRenderingMode.ADD_TO_PATH_FLAG);(s.disableFontFace||h)&&(n=s.getPathGenerator(this.commonObjs,e)),s.disableFontFace?(i.save(),i.translate(t,r),i.beginPath(),n(i,u),c!==a.TextRenderingMode.FILL&&c!==a.TextRenderingMode.FILL_STROKE||i.fill(),c!==a.TextRenderingMode.STROKE&&c!==a.TextRenderingMode.FILL_STROKE||i.stroke(),i.restore()):(c!==a.TextRenderingMode.FILL&&c!==a.TextRenderingMode.FILL_STROKE||i.fillText(e,t,r),c!==a.TextRenderingMode.STROKE&&c!==a.TextRenderingMode.FILL_STROKE||i.strokeText(e,t,r)),h&&(this.pendingTextPaths||(this.pendingTextPaths=[])).push({transform:i.mozCurrentTransform,x:t,y:r,fontSize:u,addToPath:n})},get isFontSubpixelAAEnabled(){var e=this.canvasFactory.create(10,10).context;e.scale(1.5,1),e.fillText("I",0,10);for(var t=e.getImageData(0,0,10,10).data,r=!1,n=3;n<t.length;n+=4)if(t[n]>0&&t[n]<255){r=!0;break}return(0,a.shadow)(this,"isFontSubpixelAAEnabled",r)},showText:function(e){var t=this.current,r=t.font;if(r.isType3Font)return this.showType3Text(e);var n=t.fontSize;if(0!==n){var i=this.ctx,o=t.fontSizeScale,s=t.charSpacing,l=t.wordSpacing,u=t.fontDirection,c=t.textHScale*u,h=e.length,d=r.vertical,f=d?1:-1,p=r.defaultVMetrics,m=n*t.fontMatrix[0],g=t.textRenderingMode===a.TextRenderingMode.FILL&&!r.disableFontFace;i.save(),i.transform.apply(i,t.textMatrix),i.translate(t.x,t.y+t.textRise),t.patternFill&&(i.fillStyle=t.fillColor.getPattern(i,this)),u>0?i.scale(c,-1):i.scale(c,1);var v=t.lineWidth,b=t.textMatrixScale;if(0===b||0===v){var _=t.textRenderingMode&a.TextRenderingMode.FILL_STROKE_MASK;_!==a.TextRenderingMode.STROKE&&_!==a.TextRenderingMode.FILL_STROKE||(this.cachedGetSinglePixelWidth=null,v=.65*this.getSinglePixelWidth())}else v/=b;1!==o&&(i.scale(o,o),v/=o),i.lineWidth=v;var y,A=0;for(y=0;y<h;++y){var S=e[y];if((0,a.isNum)(S))A+=f*S*n/1e3;else{var w,P,R,C,k=!1,x=(S.isSpace?l:0)+s,T=S.fontChar,E=S.accent,O=S.width;if(d){var I,L,F;I=S.vmetric||p,L=-(L=S.vmetric?I[1]:.5*O)*m,F=I[2]*m,O=I?-I[0]:O,w=L/o,P=(A+F)/o}else w=A/o,P=0;if(r.remeasure&&O>0){var D=1e3*i.measureText(T).width/n*o;if(O<D&&this.isFontSubpixelAAEnabled){var j=O/D;k=!0,i.save(),i.scale(j,1),w/=j}else O!==D&&(w+=(O-D)/2e3*n/o)}(S.isInFont||r.missingFile)&&(g&&!E?i.fillText(T,w,P):(this.paintChar(T,w,P),E&&(R=w+E.offset.x/o,C=P-E.offset.y/o,this.paintChar(E.fontChar,R,C)))),A+=O*m+x*u,k&&i.restore()}}d?t.y-=A*c:t.x+=A*c,i.restore()}},showType3Text:function(e){var t,r,n,i,o=this.ctx,s=this.current,l=s.font,u=s.fontSize,c=s.fontDirection,h=l.vertical?1:-1,d=s.charSpacing,f=s.wordSpacing,p=s.textHScale*c,m=s.fontMatrix||a.FONT_IDENTITY_MATRIX,g=e.length;if(!(s.textRenderingMode===a.TextRenderingMode.INVISIBLE)&&0!==u){for(this.cachedGetSinglePixelWidth=null,o.save(),o.transform.apply(o,s.textMatrix),o.translate(s.x,s.y),o.scale(p,c),t=0;t<g;++t)if(r=e[t],(0,a.isNum)(r))i=h*r*u/1e3,this.ctx.translate(i,0),s.x+=i*p;else{var v=(r.isSpace?f:0)+d,b=l.charProcOperatorList[r.operatorListId];b?(this.processingType3=r,this.save(),o.scale(u,u),o.transform.apply(o,m),this.executeOperatorList(b),this.restore(),n=a.Util.applyTransform([r.width,0],m)[0]*u+v,o.translate(n,0),s.x+=n*p):(0,a.warn)('Type3 character "'+r.operatorListId+'" is not available.')}o.restore(),this.processingType3=null}},setCharWidth:function(e,t){},setCharWidthAndBounds:function(e,t,r,n,i,a){this.ctx.rect(r,n,i-r,a-n),this.clip(),this.endPath()},getColorN_Pattern:function(t){var r,n=this;if("TilingPattern"===t[0]){var i=t[1],a=this.baseTransform||this.ctx.mozCurrentTransform.slice(),s={createCanvasGraphics:function(t){return new e(t,n.commonObjs,n.objs,n.canvasFactory)}};r=new o.TilingPattern(t,i,this.ctx,s,a)}else r=(0,o.getShadingPatternFromIR)(t);return r},setStrokeColorN:function(){this.current.strokeColor=this.getColorN_Pattern(arguments)},setFillColorN:function(){this.current.fillColor=this.getColorN_Pattern(arguments),this.current.patternFill=!0},setStrokeRGBColor:function(e,t,r){var n=a.Util.makeCssRgb(e,t,r);this.ctx.strokeStyle=n,this.current.strokeColor=n},setFillRGBColor:function(e,t,r){var n=a.Util.makeCssRgb(e,t,r);this.ctx.fillStyle=n,this.current.fillColor=n,this.current.patternFill=!1},shadingFill:function(e){var t=this.ctx;this.save();var r=(0,o.getShadingPatternFromIR)(e);t.fillStyle=r.getPattern(t,this,!0);var n=t.mozCurrentTransformInverse;if(n){var i=t.canvas,s=i.width,l=i.height,u=a.Util.applyTransform([0,0],n),c=a.Util.applyTransform([0,l],n),h=a.Util.applyTransform([s,0],n),d=a.Util.applyTransform([s,l],n),f=Math.min(u[0],c[0],h[0],d[0]),p=Math.min(u[1],c[1],h[1],d[1]),m=Math.max(u[0],c[0],h[0],d[0]),g=Math.max(u[1],c[1],h[1],d[1]);this.ctx.fillRect(f,p,m-f,g-p)}else this.ctx.fillRect(-1e10,-1e10,2e10,2e10);this.restore()},beginInlineImage:function(){throw new Error("Should not call beginInlineImage")},beginImageData:function(){throw new Error("Should not call beginImageData")},paintFormXObjectBegin:function(e,t){if(this.save(),this.baseTransformStack.push(this.baseTransform),Array.isArray(e)&&6===e.length&&this.transform.apply(this,e),this.baseTransform=this.ctx.mozCurrentTransform,Array.isArray(t)&&4===t.length){var r=t[2]-t[0],n=t[3]-t[1];this.ctx.rect(t[0],t[1],r,n),this.clip(),this.endPath()}},paintFormXObjectEnd:function(){this.restore(),this.baseTransform=this.baseTransformStack.pop()},beginGroup:function(e){this.save();var t=this.ctx;e.isolated||(0,a.info)("TODO: Support non-isolated groups."),e.knockout&&(0,a.warn)("Knockout groups not supported.");var r=t.mozCurrentTransform;if(e.matrix&&t.transform.apply(t,e.matrix),!e.bbox)throw new Error("Bounding box is required.");var n=a.Util.getAxialAlignedBoundingBox(e.bbox,t.mozCurrentTransform),i=[0,0,t.canvas.width,t.canvas.height];n=a.Util.intersect(n,i)||[0,0,0,0];var o=Math.floor(n[0]),s=Math.floor(n[1]),l=Math.max(Math.ceil(n[2])-o,1),u=Math.max(Math.ceil(n[3])-s,1),c=1,h=1;l>4096&&(c=l/4096,l=4096),u>4096&&(h=u/4096,u=4096);var f="groupAt"+this.groupLevel;e.smask&&(f+="_smask_"+this.smaskCounter++%2);var p=this.cachedCanvases.getCanvas(f,l,u,!0),m=p.context;m.scale(1/c,1/h),m.translate(-o,-s),m.transform.apply(m,r),e.smask?this.smaskStack.push({canvas:p.canvas,context:m,offsetX:o,offsetY:s,scaleX:c,scaleY:h,subtype:e.smask.subtype,backdrop:e.smask.backdrop,transferMap:e.smask.transferMap||null,startTransformInverse:null}):(t.setTransform(1,0,0,1,0,0),t.translate(o,s),t.scale(c,h)),d(t,m),this.ctx=m,this.setGState([["BM","source-over"],["ca",1],["CA",1]]),this.groupStack.push(t),this.groupLevel++,this.current.activeSMask=null},endGroup:function(e){this.groupLevel--;var t=this.ctx;this.ctx=this.groupStack.pop(),void 0!==this.ctx.imageSmoothingEnabled?this.ctx.imageSmoothingEnabled=!1:this.ctx.mozImageSmoothingEnabled=!1,e.smask?this.tempSMask=this.smaskStack.pop():this.ctx.drawImage(t.canvas,0,0),this.restore()},beginAnnotations:function(){this.save(),this.baseTransform&&this.ctx.setTransform.apply(this.ctx,this.baseTransform)},endAnnotations:function(){this.restore()},beginAnnotation:function(e,t,r){if(this.save(),f(this.ctx),this.current=new h,Array.isArray(e)&&4===e.length){var n=e[2]-e[0],i=e[3]-e[1];this.ctx.rect(e[0],e[1],n,i),this.clip(),this.endPath()}this.transform.apply(this,t),this.transform.apply(this,r)},endAnnotation:function(){this.restore()},paintJpegXObject:function(e,t,r){var n=this.objs.get(e);if(n){this.save();var i=this.ctx;if(i.scale(1/t,-1/r),i.drawImage(n,0,0,n.width,n.height,0,-r,t,r),this.imageLayer){var o=i.mozCurrentTransformInverse,s=this.getCanvasPosition(0,0);this.imageLayer.appendImage({objId:e,left:s[0],top:s[1],width:t/o[0],height:r/o[3]})}this.restore()}else(0,a.warn)("Dependent image isn't ready yet")},paintImageMaskXObject:function(e){var t=this.ctx,n=e.width,a=e.height,o=this.current.fillColor,s=this.current.patternFill,l=this.processingType3;if(l&&void 0===l.compiled&&(l.compiled=n<=1e3&&a<=1e3?i({data:e.data,width:n,height:a}):null),l&&l.compiled)l.compiled(t);else{var u=this.cachedCanvases.getCanvas("maskCanvas",n,a),c=u.context;c.save(),r(c,e),c.globalCompositeOperation="source-in",c.fillStyle=s?o.getPattern(c,this):o,c.fillRect(0,0,n,a),c.restore(),this.paintInlineImageXObject(u.canvas)}},paintImageMaskXObjectRepeat:function(e,t,n,i){var a=e.width,o=e.height,s=this.current.fillColor,l=this.current.patternFill,u=this.cachedCanvases.getCanvas("maskCanvas",a,o),c=u.context;c.save(),r(c,e),c.globalCompositeOperation="source-in",c.fillStyle=l?s.getPattern(c,this):s,c.fillRect(0,0,a,o),c.restore();for(var h=this.ctx,d=0,f=i.length;d<f;d+=2)h.save(),h.transform(t,0,0,n,i[d],i[d+1]),h.scale(1,-1),h.drawImage(u.canvas,0,0,a,o,0,-1,1,1),h.restore()},paintImageMaskXObjectGroup:function(e){for(var t=this.ctx,n=this.current.fillColor,i=this.current.patternFill,a=0,o=e.length;a<o;a++){var s=e[a],l=s.width,u=s.height,c=this.cachedCanvases.getCanvas("maskCanvas",l,u),h=c.context;h.save(),r(h,s),h.globalCompositeOperation="source-in",h.fillStyle=i?n.getPattern(h,this):n,h.fillRect(0,0,l,u),h.restore(),t.save(),t.transform.apply(t,s.transform),t.scale(1,-1),t.drawImage(c.canvas,0,0,l,u,0,-1,1,1),t.restore()}},paintImageXObject:function(e){var t=this.objs.get(e);t?this.paintInlineImageXObject(t):(0,a.warn)("Dependent image isn't ready yet")},paintImageXObjectRepeat:function(e,t,r,n){var i=this.objs.get(e);if(i){for(var o=i.width,s=i.height,l=[],u=0,c=n.length;u<c;u+=2)l.push({transform:[t,0,0,r,n[u],n[u+1]],x:0,y:0,w:o,h:s});this.paintInlineImageXObjectGroup(i,l)}else(0,a.warn)("Dependent image isn't ready yet")},paintInlineImageXObject:function(e){var r=e.width,n=e.height,i=this.ctx;this.save(),i.scale(1/r,-1/n);var a,o,s=i.mozCurrentTransformInverse,l=s[0],u=s[1],c=Math.max(Math.sqrt(l*l+u*u),1),h=s[2],d=s[3],f=Math.max(Math.sqrt(h*h+d*d),1);if(e instanceof HTMLElement||!e.data)a=e;else{var p=(o=this.cachedCanvases.getCanvas("inlineImage",r,n)).context;t(p,e),a=o.canvas}for(var m=r,g=n,v="prescale1";c>2&&m>1||f>2&&g>1;){var b=m,_=g;c>2&&m>1&&(c/=m/(b=Math.ceil(m/2))),f>2&&g>1&&(f/=g/(_=Math.ceil(g/2))),(p=(o=this.cachedCanvases.getCanvas(v,b,_)).context).clearRect(0,0,b,_),p.drawImage(a,0,0,m,g,0,0,b,_),a=o.canvas,m=b,g=_,v="prescale1"===v?"prescale2":"prescale1"}if(i.drawImage(a,0,0,m,g,0,-n,r,n),this.imageLayer){var y=this.getCanvasPosition(0,-n);this.imageLayer.appendImage({imgData:e,left:y[0],top:y[1],width:r/s[0],height:n/s[3]})}this.restore()},paintInlineImageXObjectGroup:function(e,r){var n=this.ctx,i=e.width,a=e.height,o=this.cachedCanvases.getCanvas("inlineImage",i,a);t(o.context,e);for(var s=0,l=r.length;s<l;s++){var u=r[s];if(n.save(),n.transform.apply(n,u.transform),n.scale(1,-1),n.drawImage(o.canvas,u.x,u.y,u.w,u.h,0,-1,1,1),this.imageLayer){var c=this.getCanvasPosition(u.x,u.y);this.imageLayer.appendImage({imgData:e,left:c[0],top:c[1],width:i,height:a})}n.restore()}},paintSolidColorImageMask:function(){this.ctx.fillRect(0,0,1,1)},paintXObject:function(){(0,a.warn)("Unsupported 'paintXObject' command.")},markPoint:function(e){},markPointProps:function(e,t){},beginMarkedContent:function(e){},beginMarkedContentProps:function(e,t){},endMarkedContent:function(){},beginCompat:function(){},endCompat:function(){},consumePath:function(){var e=this.ctx;this.pendingClip&&(this.pendingClip===S?e.clip("evenodd"):e.clip(),this.pendingClip=null),e.beginPath()},getSinglePixelWidth:function(e){if(null===this.cachedGetSinglePixelWidth){this.ctx.save();var t=this.ctx.mozCurrentTransformInverse;this.ctx.restore(),this.cachedGetSinglePixelWidth=Math.sqrt(Math.max(t[0]*t[0]+t[1]*t[1],t[2]*t[2]+t[3]*t[3]))}return this.cachedGetSinglePixelWidth},getCanvasPosition:function(e,t){var r=this.ctx.mozCurrentTransform;return[r[0]*e+r[2]*t+r[4],r[1]*e+r[3]*t+r[5]]}};for(var w in a.OPS)e.prototype[a.OPS[w]]=e.prototype[w];return e}();t.CanvasGraphics=d},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.TilingPattern=t.getShadingPatternFromIR=void 0;var n=r(0),i=r(49),a={};a.RadialAxial={fromIR:function(e){var t=e[1],r=e[2],n=e[3],i=e[4],a=e[5],o=e[6];return{type:"Pattern",getPattern:function(e){var s;"axial"===t?s=e.createLinearGradient(n[0],n[1],i[0],i[1]):"radial"===t&&(s=e.createRadialGradient(n[0],n[1],a,i[0],i[1],o));for(var l=0,u=r.length;l<u;++l){var c=r[l];s.addColorStop(c[0],c[1])}return s}}}};var o=function(){function e(e,t,r,n,i,a,o,s){var l,u=t.coords,c=t.colors,h=e.data,d=4*e.width;u[r+1]>u[n+1]&&(l=r,r=n,n=l,l=a,a=o,o=l),u[n+1]>u[i+1]&&(l=n,n=i,i=l,l=o,o=s,s=l),u[r+1]>u[n+1]&&(l=r,r=n,n=l,l=a,a=o,o=l);var f=(u[r]+t.offsetX)*t.scaleX,p=(u[r+1]+t.offsetY)*t.scaleY,m=(u[n]+t.offsetX)*t.scaleX,g=(u[n+1]+t.offsetY)*t.scaleY,v=(u[i]+t.offsetX)*t.scaleX,b=(u[i+1]+t.offsetY)*t.scaleY;if(!(p>=b))for(var _,y,A,S,w,P,R,C,k,x=c[a],T=c[a+1],E=c[a+2],O=c[o],I=c[o+1],L=c[o+2],F=c[s],D=c[s+1],j=c[s+2],M=Math.round(p),N=Math.round(b),q=M;q<=N;q++){q<g?(_=f-(f-m)*(k=q<p?0:p===g?1:(p-q)/(p-g)),y=x-(x-O)*k,A=T-(T-I)*k,S=E-(E-L)*k):(_=m-(m-v)*(k=q>b?1:g===b?0:(g-q)/(g-b)),y=O-(O-F)*k,A=I-(I-D)*k,S=L-(L-j)*k),w=f-(f-v)*(k=q<p?0:q>b?1:(p-q)/(p-b)),P=x-(x-F)*k,R=T-(T-D)*k,C=E-(E-j)*k;for(var W=Math.round(Math.min(_,w)),U=Math.round(Math.max(_,w)),B=d*q+4*W,z=W;z<=U;z++)k=(k=(_-z)/(_-w))<0?0:k>1?1:k,h[B++]=y-(y-P)*k|0,h[B++]=A-(A-R)*k|0,h[B++]=S-(S-C)*k|0,h[B++]=255}}function t(t,r,n){var i,a,o=r.coords,s=r.colors;switch(r.type){case"lattice":var l=r.verticesPerRow,u=Math.floor(o.length/l)-1,c=l-1;for(i=0;i<u;i++)for(var h=i*l,d=0;d<c;d++,h++)e(t,n,o[h],o[h+1],o[h+l],s[h],s[h+1],s[h+l]),e(t,n,o[h+l+1],o[h+1],o[h+l],s[h+l+1],s[h+1],s[h+l]);break;case"triangles":for(i=0,a=o.length;i<a;i+=3)e(t,n,o[i],o[i+1],o[i+2],s[i],s[i+1],s[i+2]);break;default:throw new Error("illegal figure")}}return function(e,r,n,a,o,s,l){var u,c,h,d,f=Math.floor(e[0]),p=Math.floor(e[1]),m=Math.ceil(e[2])-f,g=Math.ceil(e[3])-p,v=Math.min(Math.ceil(Math.abs(m*r[0]*1.1)),3e3),b=Math.min(Math.ceil(Math.abs(g*r[1]*1.1)),3e3),_=m/v,y=g/b,A={coords:n,colors:a,offsetX:-f,offsetY:-p,scaleX:1/_,scaleY:1/y},S=v+4,w=b+4;if(i.WebGLUtils.isEnabled)u=i.WebGLUtils.drawFigures(v,b,s,o,A),(c=l.getCanvas("mesh",S,w,!1)).context.drawImage(u,2,2),u=c.canvas;else{var P=(c=l.getCanvas("mesh",S,w,!1)).context,R=P.createImageData(v,b);if(s){var C=R.data;for(h=0,d=C.length;h<d;h+=4)C[h]=s[0],C[h+1]=s[1],C[h+2]=s[2],C[h+3]=255}for(h=0;h<o.length;h++)t(R,o[h],A);P.putImageData(R,2,2),u=c.canvas}return{canvas:u,offsetX:f-2*_,offsetY:p-2*y,scaleX:_,scaleY:y}}}();a.Mesh={fromIR:function(e){var t=e[2],r=e[3],i=e[4],a=e[5],s=e[6],l=e[8];return{type:"Pattern",getPattern:function(e,u,c){var h;if(c)h=n.Util.singularValueDecompose2dScale(e.mozCurrentTransform);else if(h=n.Util.singularValueDecompose2dScale(u.baseTransform),s){var d=n.Util.singularValueDecompose2dScale(s);h=[h[0]*d[0],h[1]*d[1]]}var f=o(a,h,t,r,i,c?null:l,u.cachedCanvases);return c||(e.setTransform.apply(e,u.baseTransform),s&&e.transform.apply(e,s)),e.translate(f.offsetX,f.offsetY),e.scale(f.scaleX,f.scaleY),e.createPattern(f.canvas,"no-repeat")}}}},a.Dummy={fromIR:function(){return{type:"Pattern",getPattern:function(){return"hotpink"}}}};var s=function(){function e(e,t,r,n,i){this.operatorList=e[2],this.matrix=e[3]||[1,0,0,1,0,0],this.bbox=e[4],this.xstep=e[5],this.ystep=e[6],this.paintType=e[7],this.tilingType=e[8],this.color=t,this.canvasGraphicsFactory=n,this.baseTransform=i,this.type="Pattern",this.ctx=r}var t={COLORED:1,UNCOLORED:2};return e.prototype={createPatternCanvas:function(e){var t=this.operatorList,r=this.bbox,i=this.xstep,a=this.ystep,o=this.paintType,s=this.tilingType,l=this.color,u=this.canvasGraphicsFactory;(0,n.info)("TilingType: "+s);var c=r[0],h=r[1],d=r[2],f=r[3],p=[c,h],m=[c+i,h+a],g=m[0]-p[0],v=m[1]-p[1],b=n.Util.singularValueDecompose2dScale(this.matrix),_=n.Util.singularValueDecompose2dScale(this.baseTransform),y=[b[0]*_[0],b[1]*_[1]];g=Math.min(Math.ceil(Math.abs(g*y[0])),3e3),v=Math.min(Math.ceil(Math.abs(v*y[1])),3e3);var A=e.cachedCanvases.getCanvas("pattern",g,v,!0),S=A.context,w=u.createCanvasGraphics(S);w.groupLevel=e.groupLevel,this.setFillAndStrokeStyleToContext(w,o,l),this.setScale(g,v,i,a),this.transformToScale(w);var P=[1,0,0,1,-p[0],-p[1]];return w.transform.apply(w,P),this.clipBbox(w,r,c,h,d,f),w.executeOperatorList(t),A.canvas},setScale:function(e,t,r,n){this.scale=[e/r,t/n]},transformToScale:function(e){var t=this.scale,r=[t[0],0,0,t[1],0,0];e.transform.apply(e,r)},scaleToContext:function(){var e=this.scale;this.ctx.scale(1/e[0],1/e[1])},clipBbox:function(e,t,r,n,i,a){if(Array.isArray(t)&&4===t.length){var o=i-r,s=a-n;e.ctx.rect(r,n,o,s),e.clip(),e.endPath()}},setFillAndStrokeStyleToContext:function(e,r,i){var a=e.ctx,o=e.current;switch(r){case t.COLORED:var s=this.ctx;a.fillStyle=s.fillStyle,a.strokeStyle=s.strokeStyle,o.fillColor=s.fillStyle,o.strokeColor=s.strokeStyle;break;case t.UNCOLORED:var l=n.Util.makeCssRgb(i[0],i[1],i[2]);a.fillStyle=l,a.strokeStyle=l,o.fillColor=l,o.strokeColor=l;break;default:throw new n.FormatError("Unsupported paint type: "+r)}},getPattern:function(e,t){var r=this.createPatternCanvas(t);return(e=this.ctx).setTransform.apply(e,this.baseTransform),e.transform.apply(e,this.matrix),this.scaleToContext(),e.createPattern(r,"repeat")}},e}();t.getShadingPatternFromIR=function(e){var t=a[e[0]];if(!t)throw new Error("Unknown IR type: "+e[0]);return t.fromIR(e)},t.TilingPattern=s},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.PDFDataTransportStream=void 0;var n=r(0),i=function(){function e(e,t){var r=this;(0,n.assert)(t),this._queuedChunks=[];var i=e.initialData;if(i&&i.length>0){var a=new Uint8Array(i).buffer;this._queuedChunks.push(a)}this._pdfDataRangeTransport=t,this._isRangeSupported=!e.disableRange,this._isStreamingSupported=!e.disableStream,this._contentLength=e.length,this._fullRequestReader=null,this._rangeReaders=[],this._pdfDataRangeTransport.addRangeListener(function(e,t){r._onReceiveData({begin:e,chunk:t})}),this._pdfDataRangeTransport.addProgressListener(function(e){r._onProgress({loaded:e})}),this._pdfDataRangeTransport.addProgressiveReadListener(function(e){r._onReceiveData({chunk:e})}),this._pdfDataRangeTransport.transportReady()}function t(e,t){this._stream=e,this._done=!1,this._queuedChunks=t||[],this._requests=[],this._headersReady=Promise.resolve(),e._fullRequestReader=this,this.onProgress=null}function r(e,t,r){this._stream=e,this._begin=t,this._end=r,this._queuedChunk=null,this._requests=[],this._done=!1,this.onProgress=null}return e.prototype={_onReceiveData:function(e){var t=new Uint8Array(e.chunk).buffer;if(void 0===e.begin)this._fullRequestReader?this._fullRequestReader._enqueue(t):this._queuedChunks.push(t);else{var r=this._rangeReaders.some(function(r){return r._begin===e.begin&&(r._enqueue(t),!0)});(0,n.assert)(r)}},_onProgress:function(e){if(this._rangeReaders.length>0){var t=this._rangeReaders[0];t.onProgress&&t.onProgress({loaded:e.loaded})}},_removeRangeReader:function(e){var t=this._rangeReaders.indexOf(e);t>=0&&this._rangeReaders.splice(t,1)},getFullReader:function(){(0,n.assert)(!this._fullRequestReader);var e=this._queuedChunks;return this._queuedChunks=null,new t(this,e)},getRangeReader:function(e,t){var n=new r(this,e,t);return this._pdfDataRangeTransport.requestDataRange(e,t),this._rangeReaders.push(n),n},cancelAllRequests:function(e){this._fullRequestReader&&this._fullRequestReader.cancel(e),this._rangeReaders.slice(0).forEach(function(t){t.cancel(e)}),this._pdfDataRangeTransport.abort()}},t.prototype={_enqueue:function(e){this._done||(this._requests.length>0?this._requests.shift().resolve({value:e,done:!1}):this._queuedChunks.push(e))},get headersReady(){return this._headersReady},get isRangeSupported(){return this._stream._isRangeSupported},get isStreamingSupported(){return this._stream._isStreamingSupported},get contentLength(){return this._stream._contentLength},read:function(){if(this._queuedChunks.length>0){var e=this._queuedChunks.shift();return Promise.resolve({value:e,done:!1})}if(this._done)return Promise.resolve({value:void 0,done:!0});var t=(0,n.createPromiseCapability)();return this._requests.push(t),t.promise},cancel:function(e){this._done=!0,this._requests.forEach(function(e){e.resolve({value:void 0,done:!0})}),this._requests=[]}},r.prototype={_enqueue:function(e){this._done||(0===this._requests.length?this._queuedChunk=e:(this._requests.shift().resolve({value:e,done:!1}),this._requests.forEach(function(e){e.resolve({value:void 0,done:!0})}),this._requests=[]),this._done=!0,this._stream._removeRangeReader(this))},get isStreamingSupported(){return!1},read:function(){if(this._queuedChunk){var e=this._queuedChunk;return this._queuedChunk=null,Promise.resolve({value:e,done:!1})}if(this._done)return Promise.resolve({value:void 0,done:!0});var t=(0,n.createPromiseCapability)();return this._requests.push(t),t.promise},cancel:function(e){this._done=!0,this._requests.forEach(function(e){e.resolve({value:void 0,done:!0})}),this._requests=[],this._stream._removeRangeReader(this)}},e}();t.PDFDataTransportStream=i},function(e,t,r){"use strict";function n(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){return{protocol:e.protocol,auth:e.auth,host:e.hostname,port:e.port,path:e.path,method:"GET",headers:t}}Object.defineProperty(t,"__esModule",{value:!0}),t.PDFNodeStream=void 0;var s=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),l=r(0),u=r(29),c=require("fs"),h=require("http"),d=require("https"),f=require("url"),p=function(){function e(t){a(this,e),this.options=t,this.source=t.source,this.url=f.parse(this.source.url),this.isHttp="http:"===this.url.protocol||"https:"===this.url.protocol,this.isFsUrl="file:"===this.url.protocol||!this.url.host,this.httpHeaders=this.isHttp&&this.source.httpHeaders||{},this._fullRequest=null,this._rangeRequestReaders=[]}return s(e,[{key:"getFullReader",value:function(){return(0,l.assert)(!this._fullRequest),this._fullRequest=this.isFsUrl?new _(this):new v(this),this._fullRequest}},{key:"getRangeReader",value:function(e,t){var r=this.isFsUrl?new y(this,e,t):new b(this,e,t);return this._rangeRequestReaders.push(r),r}},{key:"cancelAllRequests",value:function(e){this._fullRequest&&this._fullRequest.cancel(e),this._rangeRequestReaders.slice(0).forEach(function(t){t.cancel(e)})}}]),e}(),m=function(){function e(t){a(this,e),this._url=t.url,this._done=!1,this._errored=!1,this._reason=null,this.onProgress=null,this._contentLength=t.source.length,this._loaded=0,this._disableRange=t.options.disableRange||!1,this._rangeChunkSize=t.source.rangeChunkSize,this._rangeChunkSize||this._disableRange||(this._disableRange=!0),this._isStreamingSupported=!t.source.disableStream,this._isRangeSupported=!t.options.disableRange,this._readableStream=null,this._readCapability=(0,l.createPromiseCapability)(),this._headersCapability=(0,l.createPromiseCapability)()}return s(e,[{key:"read",value:function(){var e=this;return this._readCapability.promise.then(function(){if(e._done)return Promise.resolve({value:void 0,done:!0});if(e._errored)return Promise.reject(e._reason);var t=e._readableStream.read();if(null===t)return e._readCapability=(0,l.createPromiseCapability)(),e.read();e._loaded+=t.length,e.onProgress&&e.onProgress({loaded:e._loaded,total:e._contentLength});var r=new Uint8Array(t).buffer;return Promise.resolve({value:r,done:!1})})}},{key:"cancel",value:function(e){this._readableStream?this._readableStream.destroy(e):this._error(e)}},{key:"_error",value:function(e){this._errored=!0,this._reason=e,this._readCapability.resolve()}},{key:"_setReadableStream",value:function(e){var t=this;this._readableStream=e,e.on("readable",function(){t._readCapability.resolve()}),e.on("end",function(){e.destroy(),t._done=!0,t._readCapability.resolve()}),e.on("error",function(e){t._error(e)}),!this._isStreamingSupported&&this._isRangeSupported&&this._error(new l.AbortException("streaming is disabled")),this._errored&&this._readableStream.destroy(this._reason)}},{key:"headersReady",get:function(){return this._headersCapability.promise}},{key:"contentLength",get:function(){return this._contentLength}},{key:"isRangeSupported",get:function(){return this._isRangeSupported}},{key:"isStreamingSupported",get:function(){return this._isStreamingSupported}}]),e}(),g=function(){function e(t){a(this,e),this._url=t.url,this._done=!1,this._errored=!1,this._reason=null,this.onProgress=null,this._loaded=0,this._readableStream=null,this._readCapability=(0,l.createPromiseCapability)(),this._isStreamingSupported=!t.source.disableStream}return s(e,[{key:"read",value:function(){var e=this;return this._readCapability.promise.then(function(){if(e._done)return Promise.resolve({value:void 0,done:!0});if(e._errored)return Promise.reject(e._reason);var t=e._readableStream.read();if(null===t)return e._readCapability=(0,l.createPromiseCapability)(),e.read();e._loaded+=t.length,e.onProgress&&e.onProgress({loaded:e._loaded});var r=new Uint8Array(t).buffer;return Promise.resolve({value:r,done:!1})})}},{key:"cancel",value:function(e){this._readableStream?this._readableStream.destroy(e):this._error(e)}},{key:"_error",value:function(e){this._errored=!0,this._reason=e,this._readCapability.resolve()}},{key:"_setReadableStream",value:function(e){var t=this;this._readableStream=e,e.on("readable",function(){t._readCapability.resolve()}),e.on("end",function(){e.destroy(),t._done=!0,t._readCapability.resolve()}),e.on("error",function(e){t._error(e)}),this._errored&&this._readableStream.destroy(this._reason)}},{key:"isStreamingSupported",get:function(){return this._isStreamingSupported}}]),e}(),v=function(e){function t(e){a(this,t);var r=n(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e)),i=function(t){r._headersCapability.resolve(),r._setReadableStream(t);var n=(0,u.validateRangeRequestCapabilities)({getResponseHeader:function(e){return r._readableStream.headers[e.toLowerCase()]},isHttp:e.isHttp,rangeChunkSize:r._rangeChunkSize,disableRange:r._disableRange}),i=n.allowRangeRequests,a=n.suggestedLength;i&&(r._isRangeSupported=!0),r._contentLength=a};return r._request=null,"http:"===r._url.protocol?r._request=h.request(o(r._url,e.httpHeaders),i):r._request=d.request(o(r._url,e.httpHeaders),i),r._request.on("error",function(e){r._errored=!0,r._reason=e,r._headersCapability.reject(e)}),r._request.end(),r}return i(t,m),t}(),b=function(e){function t(e,r,i){a(this,t);var s=n(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));s._httpHeaders={};for(var l in e.httpHeaders){var u=e.httpHeaders[l];void 0!==u&&(s._httpHeaders[l]=u)}return s._httpHeaders.Range="bytes="+r+"-"+(i-1),s._request=null,"http:"===s._url.protocol?s._request=h.request(o(s._url,s._httpHeaders),function(e){s._setReadableStream(e)}):s._request=d.request(o(s._url,s._httpHeaders),function(e){s._setReadableStream(e)}),s._request.on("error",function(e){s._errored=!0,s._reason=e}),s._request.end(),s}return i(t,g),t}(),_=function(e){function t(e){a(this,t);var r=n(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return c.lstat(r._url.path,function(e,t){if(e)return r._errored=!0,r._reason=e,void r._headersCapability.reject(e);r._contentLength=t.size,r._setReadableStream(c.createReadStream(r._url.path)),r._headersCapability.resolve()}),r}return i(t,m),t}(),y=function(e){function t(e,r,i){a(this,t);var o=n(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return o._setReadableStream(c.createReadStream(o._url.path,{start:r,end:i-1})),o}return i(t,g),t}();t.PDFNodeStream=p},function(e,t,r){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){return{method:"GET",headers:e,mode:"cors",credentials:t?"include":"same-origin",redirect:"follow"}}Object.defineProperty(t,"__esModule",{value:!0}),t.PDFFetchStream=void 0;var a=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),o=r(0),s=r(29),l=function(){function e(t){n(this,e),this.options=t,this.source=t.source,this.isHttp=/^https?:/i.test(this.source.url),this.httpHeaders=this.isHttp&&this.source.httpHeaders||{},this._fullRequestReader=null,this._rangeRequestReaders=[]}return a(e,[{key:"getFullReader",value:function(){return(0,o.assert)(!this._fullRequestReader),this._fullRequestReader=new u(this),this._fullRequestReader}},{key:"getRangeReader",value:function(e,t){var r=new c(this,e,t);return this._rangeRequestReaders.push(r),r}},{key:"cancelAllRequests",value:function(e){this._fullRequestReader&&this._fullRequestReader.cancel(e),this._rangeRequestReaders.slice(0).forEach(function(t){t.cancel(e)})}}]),e}(),u=function(){function e(t){var r=this;n(this,e),this._stream=t,this._reader=null,this._loaded=0,this._withCredentials=t.source.withCredentials,this._contentLength=this._stream.source.length,this._headersCapability=(0,o.createPromiseCapability)(),this._disableRange=this._stream.options.disableRange,this._rangeChunkSize=this._stream.source.rangeChunkSize,this._rangeChunkSize||this._disableRange||(this._disableRange=!0),this._isRangeSupported=!this._stream.options.disableRange,this._isStreamingSupported=!this._stream.source.disableStream,this._headers=new Headers;for(var a in this._stream.httpHeaders){var l=this._stream.httpHeaders[a];void 0!==l&&this._headers.append(a,l)}var u=this._stream.source.url;fetch(u,i(this._headers,this._withCredentials)).then(function(e){if(!(0,s.validateResponseStatus)(e.status))throw(0,s.createResponseStatusError)(e.status,u);r._reader=e.body.getReader(),r._headersCapability.resolve();var t=(0,s.validateRangeRequestCapabilities)({getResponseHeader:function(t){return e.headers.get(t)},isHttp:r._stream.isHttp,rangeChunkSize:r._rangeChunkSize,disableRange:r._disableRange}),n=t.allowRangeRequests,i=t.suggestedLength;r._contentLength=i,r._isRangeSupported=n,!r._isStreamingSupported&&r._isRangeSupported&&r.cancel(new o.AbortException("streaming is disabled"))}).catch(this._headersCapability.reject),this.onProgress=null}return a(e,[{key:"read",value:function(){var e=this;return this._headersCapability.promise.then(function(){return e._reader.read().then(function(t){var r=t.value,n=t.done;if(n)return Promise.resolve({value:r,done:n});e._loaded+=r.byteLength,e.onProgress&&e.onProgress({loaded:e._loaded,total:e._contentLength});var i=new Uint8Array(r).buffer;return Promise.resolve({value:i,done:!1})})})}},{key:"cancel",value:function(e){this._reader&&this._reader.cancel(e)}},{key:"headersReady",get:function(){return this._headersCapability.promise}},{key:"contentLength",get:function(){return this._contentLength}},{key:"isRangeSupported",get:function(){return this._isRangeSupported}},{key:"isStreamingSupported",get:function(){return this._isStreamingSupported}}]),e}(),c=function(){function e(t,r,a){var l=this;n(this,e),this._stream=t,this._reader=null,this._loaded=0,this._withCredentials=t.source.withCredentials,this._readCapability=(0,o.createPromiseCapability)(),this._isStreamingSupported=!t.source.disableStream,this._headers=new Headers;for(var u in this._stream.httpHeaders){var c=this._stream.httpHeaders[u];void 0!==c&&this._headers.append(u,c)}var h=r+"-"+(a-1);this._headers.append("Range","bytes="+h);var d=this._stream.source.url;fetch(d,i(this._headers,this._withCredentials)).then(function(e){if(!(0,s.validateResponseStatus)(e.status))throw(0,s.createResponseStatusError)(e.status,d);l._readCapability.resolve(),l._reader=e.body.getReader()}),this.onProgress=null}return a(e,[{key:"read",value:function(){var e=this;return this._readCapability.promise.then(function(){return e._reader.read().then(function(t){var r=t.value,n=t.done;if(n)return Promise.resolve({value:r,done:n});e._loaded+=r.byteLength,e.onProgress&&e.onProgress({loaded:e._loaded});var i=new Uint8Array(r).buffer;return Promise.resolve({value:i,done:!1})})})}},{key:"cancel",value:function(e){this._reader&&this._reader.cancel(e)}},{key:"isStreamingSupported",get:function(){return this._isStreamingSupported}}]),e}();t.PDFFetchStream=l},function(e,t,r){"use strict";function n(e,t){this.url=e,t=t||{},this.isHttp=/^https?:/i.test(e),this.httpHeaders=this.isHttp&&t.httpHeaders||{},this.withCredentials=t.withCredentials||!1,this.getXhr=t.getXhr||function(){return new XMLHttpRequest},this.currXhrId=0,this.pendingRequests=Object.create(null),this.loadedRequests=Object.create(null)}function i(e){var t=e.response;if("string"!=typeof t)return t;for(var r=t.length,n=new Uint8Array(r),i=0;i<r;i++)n[i]=255&t.charCodeAt(i);return n.buffer}function a(e){this._options=e;var t=e.source;this._manager=new n(t.url,{httpHeaders:t.httpHeaders,withCredentials:t.withCredentials}),this._rangeChunkSize=t.rangeChunkSize,this._fullRequestReader=null,this._rangeRequestReaders=[]}function o(e,t){this._manager=e;var r=t.source,n={onHeadersReceived:this._onHeadersReceived.bind(this),onProgressiveData:r.disableStream?null:this._onProgressiveData.bind(this),onDone:this._onDone.bind(this),onError:this._onError.bind(this),onProgress:this._onProgress.bind(this)};this._url=r.url,this._fullRequestId=e.requestFull(n),this._headersReceivedCapability=(0,l.createPromiseCapability)(),this._disableRange=t.disableRange||!1,this._contentLength=r.length,this._rangeChunkSize=r.rangeChunkSize,this._rangeChunkSize||this._disableRange||(this._disableRange=!0),this._isStreamingSupported=!1,this._isRangeSupported=!1,this._cachedChunks=[],this._requests=[],this._done=!1,this._storedError=void 0,this.onProgress=null}function s(e,t,r){this._manager=e;var n={onDone:this._onDone.bind(this),onProgress:this._onProgress.bind(this)};this._requestId=e.requestRange(t,r,n),this._requests=[],this._queuedChunk=null,this._done=!1,this.onProgress=null,this.onClosed=null}Object.defineProperty(t,"__esModule",{value:!0}),t.NetworkManager=t.PDFNetworkStream=void 0;var l=r(0),u=r(29),c=function(e){return e&&e.__esModule?e:{default:e}}(r(9)),h=function(){try{var e=new XMLHttpRequest;return e.open("GET",c.default.location.href),e.responseType="moz-chunked-arraybuffer","moz-chunked-arraybuffer"===e.responseType}catch(e){return!1}}();n.prototype={requestRange:function(e,t,r){var n={begin:e,end:t};for(var i in r)n[i]=r[i];return this.request(n)},requestFull:function(e){return this.request(e)},request:function(e){var t=this.getXhr(),r=this.currXhrId++,n=this.pendingRequests[r]={xhr:t};t.open("GET",this.url),t.withCredentials=this.withCredentials;for(var i in this.httpHeaders){var a=this.httpHeaders[i];void 0!==a&&t.setRequestHeader(i,a)}if(this.isHttp&&"begin"in e&&"end"in e){var o=e.begin+"-"+(e.end-1);t.setRequestHeader("Range","bytes="+o),n.expectedStatus=206}else n.expectedStatus=200;return h&&!!e.onProgressiveData?(t.responseType="moz-chunked-arraybuffer",n.onProgressiveData=e.onProgressiveData,n.mozChunked=!0):t.responseType="arraybuffer",e.onError&&(t.onerror=function(r){e.onError(t.status)}),t.onreadystatechange=this.onStateChange.bind(this,r),t.onprogress=this.onProgress.bind(this,r),n.onHeadersReceived=e.onHeadersReceived,n.onDone=e.onDone,n.onError=e.onError,n.onProgress=e.onProgress,t.send(null),r},onProgress:function(e,t){var r=this.pendingRequests[e];if(r){if(r.mozChunked){var n=i(r.xhr);r.onProgressiveData(n)}var a=r.onProgress;a&&a(t)}},onStateChange:function(e,t){var r=this.pendingRequests[e];if(r){var n=r.xhr;if(n.readyState>=2&&r.onHeadersReceived&&(r.onHeadersReceived(),delete r.onHeadersReceived),4===n.readyState&&e in this.pendingRequests)if(delete this.pendingRequests[e],0===n.status&&this.isHttp)r.onError&&r.onError(n.status);else{var a=n.status||200;if(200===a&&206===r.expectedStatus||a===r.expectedStatus){this.loadedRequests[e]=!0;var o=i(n);if(206===a){var s=n.getResponseHeader("Content-Range"),l=/bytes (\d+)-(\d+)\/(\d+)/.exec(s),u=parseInt(l[1],10);r.onDone({begin:u,chunk:o})}else r.onProgressiveData?r.onDone(null):o?r.onDone({begin:0,chunk:o}):r.onError&&r.onError(n.status)}else r.onError&&r.onError(n.status)}}},hasPendingRequests:function(){for(var e in this.pendingRequests)return!0;return!1},getRequestXhr:function(e){return this.pendingRequests[e].xhr},isStreamingRequest:function(e){return!!this.pendingRequests[e].onProgressiveData},isPendingRequest:function(e){return e in this.pendingRequests},isLoadedRequest:function(e){return e in this.loadedRequests},abortAllRequests:function(){for(var e in this.pendingRequests)this.abortRequest(0|e)},abortRequest:function(e){var t=this.pendingRequests[e].xhr;delete this.pendingRequests[e],t.abort()}},a.prototype={_onRangeRequestReaderClosed:function(e){var t=this._rangeRequestReaders.indexOf(e);t>=0&&this._rangeRequestReaders.splice(t,1)},getFullReader:function(){return(0,l.assert)(!this._fullRequestReader),this._fullRequestReader=new o(this._manager,this._options),this._fullRequestReader},getRangeReader:function(e,t){var r=new s(this._manager,e,t);return r.onClosed=this._onRangeRequestReaderClosed.bind(this),this._rangeRequestReaders.push(r),r},cancelAllRequests:function(e){this._fullRequestReader&&this._fullRequestReader.cancel(e),this._rangeRequestReaders.slice(0).forEach(function(t){t.cancel(e)})}},o.prototype={_onHeadersReceived:function(){var e=this._fullRequestId,t=this._manager.getRequestXhr(e),r=(0,u.validateRangeRequestCapabilities)({getResponseHeader:function(e){return t.getResponseHeader(e)},isHttp:this._manager.isHttp,rangeChunkSize:this._rangeChunkSize,disableRange:this._disableRange}),n=r.allowRangeRequests,i=r.suggestedLength;this._contentLength=i||this._contentLength,n&&(this._isRangeSupported=!0);var a=this._manager;a.isStreamingRequest(e)?this._isStreamingSupported=!0:this._isRangeSupported&&a.abortRequest(e),this._headersReceivedCapability.resolve()},_onProgressiveData:function(e){this._requests.length>0?this._requests.shift().resolve({value:e,done:!1}):this._cachedChunks.push(e)},_onDone:function(e){e&&this._onProgressiveData(e.chunk),this._done=!0,this._cachedChunks.length>0||(this._requests.forEach(function(e){e.resolve({value:void 0,done:!0})}),this._requests=[])},_onError:function(e){var t=this._url,r=(0,u.createResponseStatusError)(e,t);this._storedError=r,this._headersReceivedCapability.reject(r),this._requests.forEach(function(e){e.reject(r)}),this._requests=[],this._cachedChunks=[]},_onProgress:function(e){this.onProgress&&this.onProgress({loaded:e.loaded,total:e.lengthComputable?e.total:this._contentLength})},get isRangeSupported(){return this._isRangeSupported},get isStreamingSupported(){return this._isStreamingSupported},get contentLength(){return this._contentLength},get headersReady(){return this._headersReceivedCapability.promise},read:function(){if(this._storedError)return Promise.reject(this._storedError);if(this._cachedChunks.length>0){var e=this._cachedChunks.shift();return Promise.resolve({value:e,done:!1})}if(this._done)return Promise.resolve({value:void 0,done:!0});var t=(0,l.createPromiseCapability)();return this._requests.push(t),t.promise},cancel:function(e){this._done=!0,this._headersReceivedCapability.reject(e),this._requests.forEach(function(e){e.resolve({value:void 0,done:!0})}),this._requests=[],this._manager.isPendingRequest(this._fullRequestId)&&this._manager.abortRequest(this._fullRequestId),this._fullRequestReader=null}},s.prototype={_close:function(){this.onClosed&&this.onClosed(this)},_onDone:function(e){var t=e.chunk;this._requests.length>0?this._requests.shift().resolve({value:t,done:!1}):this._queuedChunk=t,this._done=!0,this._requests.forEach(function(e){e.resolve({value:void 0,done:!0})}),this._requests=[],this._close()},_onProgress:function(e){!this.isStreamingSupported&&this.onProgress&&this.onProgress({loaded:e.loaded})},get isStreamingSupported(){return!1},read:function(){if(null!==this._queuedChunk){var e=this._queuedChunk;return this._queuedChunk=null,Promise.resolve({value:e,done:!1})}if(this._done)return Promise.resolve({value:void 0,done:!0});var t=(0,l.createPromiseCapability)();return this._requests.push(t),t.promise},cancel:function(e){this._done=!0,this._requests.forEach(function(e){e.resolve({value:void 0,done:!0})}),this._requests=[],this._manager.isPendingRequest(this._requestId)&&this._manager.abortRequest(this._requestId),this._close()}},t.PDFNetworkStream=a,t.NetworkManager=n}])});
;

$node[ "pdfjs-dist/build/pdf.min.js" ] = $node[ "pdfjs-dist/build/pdf.min.js" ] = module.exports }( { exports : {} } )

;
var $;
(function ($) {
    $.$lib_pdfjs = $node['pdfjs-dist/build/pdf.min.js'].PDFJS;
    $.$lib_pdfjs.disableRange = true;
    $.$lib_pdfjs.workerSrc = '-/node_modules/pdfjs-dist/build/pdf.worker.min.js';
})($ || ($ = {}));
//pdfjs.js.map
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
    function $mol_range_in(source) {
        return new $mol_range_lazy(source);
    }
    $.$mol_range_in = $mol_range_in;
    var $mol_range_common = (function () {
        function $mol_range_common() {
            this.length = 0;
        }
        $mol_range_common.prototype.item = function (id) {
            return;
        };
        Object.defineProperty($mol_range_common.prototype, '0', {
            get: function () {
                throw new Error('Direct access to items not supported. Use item( id : number ) method instead.');
            },
            enumerable: true,
            configurable: true
        });
        $mol_range_common.prototype.forEach = function (handle) {
            var length = this.length;
            for (var i = 0; i < length; ++i) {
                handle(this.item(i), i);
            }
        };
        $mol_range_common.prototype.valueOf = function () {
            var list = [];
            this.forEach(function (val) { return list.push(val); });
            return list;
        };
        $mol_range_common.prototype.concat = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var ranges = args.map(function (range) { return range.valueOf(); });
            return (_a = this.valueOf()).concat.apply(_a, ranges);
            var _a;
        };
        $mol_range_common.prototype.slice = function (start, end) {
            if (start === void 0) { start = 0; }
            var source = this;
            return new $mol_range_lazy({
                item: function (id) {
                    return source.item(id + start);
                },
                get length() {
                    return Math.min(end, source.length) - start;
                }
            });
        };
        $mol_range_common.prototype.map = function (proceed) {
            var source = this;
            return new $mol_range_lazy({
                item: function (id) {
                    return proceed(source.item(id), id);
                },
                get length() {
                    return source.length;
                }
            });
        };
        $mol_range_common.prototype.join = function (delim) {
            if (delim === void 0) { delim = ','; }
            var list = [];
            this.forEach(function (val) { return list.push(val); });
            return list.join(delim);
        };
        $mol_range_common.prototype.every = function (check) {
            var res = true;
            this.forEach(function (val, id) {
                if (!res)
                    return;
                res = check(val, id);
            });
            return res;
        };
        $mol_range_common.prototype.some = function (check) {
            var res = false;
            this.forEach(function (val, id) {
                if (res)
                    return;
                res = check(val, id);
            });
            return res;
        };
        return $mol_range_common;
    }());
    $.$mol_range_common = $mol_range_common;
    var $mol_range_lazy = (function (_super) {
        __extends($mol_range_lazy, _super);
        function $mol_range_lazy(source) {
            if (source === void 0) { source = {
                item: function (id) { return undefined; },
                length: 0
            }; }
            var _this = _super.call(this) || this;
            _this.source = source;
            return _this;
        }
        $mol_range_lazy.prototype.item = function (id) {
            return this.source.item(id);
        };
        Object.defineProperty($mol_range_lazy.prototype, "length", {
            get: function () {
                return this.source.length;
            },
            enumerable: true,
            configurable: true
        });
        return $mol_range_lazy;
    }($mol_range_common));
    $.$mol_range_lazy = $mol_range_lazy;
})($ || ($ = {}));
//range.js.map
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
    var $mol_embed_pdf = (function (_super) {
        __extends($mol_embed_pdf, _super);
        function $mol_embed_pdf() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_embed_pdf.prototype.uri = function () {
            return "";
        };
        $mol_embed_pdf.prototype.sub = function () {
            return [].concat(this.Pages());
        };
        $mol_embed_pdf.prototype.Pages = function () {
            var _this = this;
            return (function (obj) {
                obj.rows = function () { return _this.pages(); };
                return obj;
            })(new this.$.$mol_list);
        };
        $mol_embed_pdf.prototype.pages = function () {
            return [];
        };
        $mol_embed_pdf.prototype.Page = function (index) {
            var _this = this;
            return (function (obj) {
                obj.page = function () { return _this.page(index); };
                return obj;
            })(new this.$.$mol_embed_pdf_page);
        };
        $mol_embed_pdf.prototype.page = function (index) {
            return null;
        };
        __decorate([
            $.$mol_mem
        ], $mol_embed_pdf.prototype, "Pages", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_embed_pdf.prototype, "Page", null);
        return $mol_embed_pdf;
    }($.$mol_scroll));
    $.$mol_embed_pdf = $mol_embed_pdf;
})($ || ($ = {}));
(function ($) {
    var $mol_embed_pdf_page = (function (_super) {
        __extends($mol_embed_pdf_page, _super);
        function $mol_embed_pdf_page() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_embed_pdf_page.prototype.dom_name = function () {
            return "canvas";
        };
        $mol_embed_pdf_page.prototype.page = function () {
            return null;
        };
        $mol_embed_pdf_page.prototype.max_width = function () {
            return 640;
        };
        $mol_embed_pdf_page.prototype.scale_over = function () {
            return 1.25;
        };
        $mol_embed_pdf_page.prototype.plugins = function () {
            return [].concat(this.Touch());
        };
        $mol_embed_pdf_page.prototype.Touch = function () {
            var _this = this;
            return (function (obj) {
                obj.zoom = function (val) { return _this.scale(val); };
                return obj;
            })(new this.$.$mol_touch);
        };
        $mol_embed_pdf_page.prototype.scale = function (val, force) {
            return (val !== void 0) ? val : 1;
        };
        $mol_embed_pdf_page.prototype.style = function () {
            return ({
                "zoom": this.zoom(),
            });
        };
        $mol_embed_pdf_page.prototype.zoom = function () {
            return 0.8;
        };
        $mol_embed_pdf_page.prototype.field = function () {
            return ({
                "width": this.width(),
                "height": this.height(),
            });
        };
        $mol_embed_pdf_page.prototype.width = function () {
            return 0;
        };
        $mol_embed_pdf_page.prototype.height = function () {
            return 0;
        };
        __decorate([
            $.$mol_mem
        ], $mol_embed_pdf_page.prototype, "Touch", null);
        __decorate([
            $.$mol_mem
        ], $mol_embed_pdf_page.prototype, "scale", null);
        return $mol_embed_pdf_page;
    }($.$mol_view));
    $.$mol_embed_pdf_page = $mol_embed_pdf_page;
})($ || ($ = {}));
//pdf.view.tree.js.map
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
        var $mol_embed_pdf = (function (_super) {
            __extends($mol_embed_pdf, _super);
            function $mol_embed_pdf() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            $mol_embed_pdf.prototype.document = function (doc, force) {
                var _this = this;
                var loadingTask = $.$lib_pdfjs.getDocument(this.uri()).promise
                    .then(function (doc) { return _this.document(doc, $.$mol_atom_force); })
                    .catch(function (error) { return _this.document(error, $.$mol_atom_force); });
                throw new $.$mol_atom_wait("Loading PDF document: " + this.uri());
            };
            $mol_embed_pdf.prototype.page = function (index, page, force) {
                var _this = this;
                this.document().getPage(index + 1)
                    .then(function (page) { return _this.page(index, page, $.$mol_atom_force); })
                    .catch(function (error) { return _this.page(index, error, $.$mol_atom_force); });
                throw new $.$mol_atom_wait("Rendering PDF page=" + index);
            };
            $mol_embed_pdf.prototype.pages = function () {
                var _this = this;
                return $.$mol_range_in({
                    item: function (index) { return _this.Page(index); },
                    length: this.document().numPages,
                }).valueOf();
            };
            __decorate([
                $.$mol_mem
            ], $mol_embed_pdf.prototype, "document", null);
            __decorate([
                $.$mol_mem_key
            ], $mol_embed_pdf.prototype, "page", null);
            return $mol_embed_pdf;
        }($.$mol_embed_pdf));
        $$.$mol_embed_pdf = $mol_embed_pdf;
        var $mol_embed_pdf_page = (function (_super) {
            __extends($mol_embed_pdf_page, _super);
            function $mol_embed_pdf_page() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            $mol_embed_pdf_page.prototype.viewport = function () {
                return this.page().getViewport(this.scale_over());
            };
            $mol_embed_pdf_page.prototype.zoom = function () {
                return this.scale() / this.scale_over();
            };
            $mol_embed_pdf_page.prototype.width = function () {
                return Math.floor(this.viewport().width);
            };
            $mol_embed_pdf_page.prototype.height = function () {
                return Math.floor(this.viewport().height);
            };
            $mol_embed_pdf_page.prototype.minimal_width = function () {
                return this.width() * this.zoom();
            };
            $mol_embed_pdf_page.prototype.minimal_height = function () {
                return this.height() * this.zoom();
            };
            $mol_embed_pdf_page.prototype.paint = function (next, force) {
                var _this = this;
                this.page().render({
                    canvasContext: this.dom_node().getContext('2d'),
                    viewport: this.viewport(),
                })
                    .then(function () { return _this.paint(null, $.$mol_atom_force); })
                    .catch(function (error) { return _this.paint(error, $.$mol_atom_force); });
                throw new $.$mol_atom_wait('Painting...');
            };
            $mol_embed_pdf_page.prototype.render = function () {
                _super.prototype.render.call(this);
                this.paint();
            };
            __decorate([
                $.$mol_mem
            ], $mol_embed_pdf_page.prototype, "paint", null);
            return $mol_embed_pdf_page;
        }($.$mol_embed_pdf_page));
        $$.$mol_embed_pdf_page = $mol_embed_pdf_page;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//pdf.view.js.map
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
    var $mol_webdav = (function (_super) {
        __extends($mol_webdav, _super);
        function $mol_webdav() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_webdav.item = function (uri) {
            return this.make({
                uri: $.$mol_const(uri),
            });
        };
        $mol_webdav.prototype.data_tree = function () {
            var dom = this.response().responseXML;
            var responses = dom.querySelectorAll('response');
            var data = {};
            for (var _i = 0, responses_1 = responses; _i < responses_1.length; _i++) {
                var response = responses_1[_i];
                var uri = this.resolve(response.querySelector('href').textContent).uri();
                data[uri] = response;
            }
            return data;
        };
        $mol_webdav.prototype.data_self = function () {
            return this.parent().data_tree();
        };
        $mol_webdav.prototype.parent = function () {
            return $mol_webdav.item(this.uri().replace(/\/[^\/]*\/?$/, '/'));
        };
        $mol_webdav.prototype.sub = function () {
            var next = [];
            for (var _i = 0, _a = Object.keys(this.data_tree()); _i < _a.length; _i++) {
                var uri = _a[_i];
                if (uri == this.uri())
                    continue;
                next.push($mol_webdav.item(uri));
            }
            return next;
        };
        $mol_webdav.prototype.depth = function () {
            return 1;
        };
        $mol_webdav.prototype.headers = function () {
            return {
                'Depth': String(this.depth())
            };
        };
        $mol_webdav.prototype.method_get = function () {
            return 'PROPFIND';
        };
        $mol_webdav.prototype.resolve = function (uri) {
            if (!uri)
                return this;
            if (/^[-\w]+:/.test(uri)) {
                return $mol_webdav.item(uri);
            }
            if (uri[0] === '/') {
                return $mol_webdav.item(this.uri().replace(/^([^\/]+\/\/[^\/]+).*/, '$1') + uri);
            }
            var res = this.uri() + '/' + uri;
            while (true) {
                var prev = res;
                res = res.replace(/\/[^\/]+\/\.\.\//, '/');
                if (prev === res)
                    break;
            }
            while (true) {
                var prev = res;
                res = res.replace(/\/\.\.\/[^\/]+\//, '/');
                if (prev === res)
                    break;
            }
            return this.Class().item(res);
        };
        $mol_webdav.prototype.prop = function (prop) {
            return this.data_self()[this.uri()].querySelector(prop).textContent;
        };
        $mol_webdav.prototype.type = function () {
            return this.data_self()[this.uri()].querySelector('collection') ? 'dir' : 'file';
        };
        __decorate([
            $.$mol_mem
        ], $mol_webdav.prototype, "data_tree", null);
        __decorate([
            $.$mol_mem
        ], $mol_webdav.prototype, "sub", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_webdav, "item", null);
        return $mol_webdav;
    }($.$mol_http));
    $.$mol_webdav = $mol_webdav;
})($ || ($ = {}));
//webdav.js.map
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
    var $mol_app_files = (function (_super) {
        __extends($mol_app_files, _super);
        function $mol_app_files() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_app_files.prototype.uri_current = function () {
            return this.uri_root();
        };
        $mol_app_files.prototype.uri_root = function () {
            return this.uri_root_default();
        };
        $mol_app_files.prototype.uri_root_default = function () {
            return "";
        };
        $mol_app_files.prototype.credentials = function () {
            return ({
                "login": "",
                "password": "",
            });
        };
        $mol_app_files.prototype.title = function () {
            return this.title_root();
        };
        $mol_app_files.prototype.title_root = function () {
            return $.$mol_locale.text(this.locale_contexts(), "title_root");
        };
        $mol_app_files.prototype.Folder = function (folder) {
            var _this = this;
            return (function (obj) {
                obj.title = function () { return _this.webdav_title(folder); };
                obj.description = function () { return _this.webdav_description(folder); };
                obj.tools = function () { return _this.page_tools(folder); };
                obj.rows = function () { return _this.folder_rows(folder); };
                obj.event_top = function (val) { return _this.event_front_up(val); };
                return obj;
            })(new this.$.$mol_app_files_folder);
        };
        $mol_app_files.prototype.webdav_title = function (folder) {
            return "";
        };
        $mol_app_files.prototype.webdav_description = function (folder) {
            return "";
        };
        $mol_app_files.prototype.folder_rows = function (folder) {
            return [];
        };
        $mol_app_files.prototype.Folder_row = function (uri) {
            var _this = this;
            return (function (obj) {
                obj.minimal_height = function () { return 40; };
                obj.arg = function () { return _this.folder_row_arg(uri); };
                obj.current = function () { return _this.folder_row_current(uri); };
                obj.sub = function () { return [].concat(_this.folder_row_icon(uri), _this.Folder_row_info(uri)); };
                return obj;
            })(new this.$.$mol_link);
        };
        $mol_app_files.prototype.folder_row_arg = function (uri) {
            return ({});
        };
        $mol_app_files.prototype.folder_row_current = function (uri) {
            return false;
        };
        $mol_app_files.prototype.folder_row_icon = function (uri) {
            return null;
        };
        $mol_app_files.prototype.Folder_row_info = function (uri) {
            var _this = this;
            return (function (obj) {
                obj.sub = function () { return [].concat(_this.Folder_row_descr(uri), _this.Folder_row_title(uri)); };
                return obj;
            })(new this.$.$mol_view);
        };
        $mol_app_files.prototype.Folder_row_descr = function (uri) {
            var _this = this;
            return (function (obj) {
                obj.sub = function () { return [].concat(_this.folder_row_descr(uri)); };
                return obj;
            })(new this.$.$mol_view);
        };
        $mol_app_files.prototype.folder_row_descr = function (uri) {
            return "";
        };
        $mol_app_files.prototype.Folder_row_title = function (uri) {
            var _this = this;
            return (function (obj) {
                obj.sub = function () { return [].concat(_this.folder_row_title(uri)); };
                return obj;
            })(new this.$.$mol_view);
        };
        $mol_app_files.prototype.folder_row_title = function (uri) {
            return "";
        };
        $mol_app_files.prototype.File = function (file) {
            var _this = this;
            return (function (obj) {
                obj.title = function () { return _this.webdav_title(file); };
                obj.tools = function () { return _this.page_tools(file); };
                obj.src = function () { return _this.file_uri(file); };
                obj.mime = function () { return _this.file_mime(file); };
                obj.event_top = function (val) { return _this.event_front_up(val); };
                return obj;
            })(new this.$.$mol_app_files_file);
        };
        $mol_app_files.prototype.file_uri = function (file) {
            return "";
        };
        $mol_app_files.prototype.file_mime = function (file) {
            return "";
        };
        $mol_app_files.prototype.Icon_folder = function (uri) {
            return (function (obj) {
                return obj;
            })(new this.$.$mol_icon_folder);
        };
        $mol_app_files.prototype.Icon_file = function (uri) {
            return (function (obj) {
                return obj;
            })(new this.$.$mol_icon_file2);
        };
        $mol_app_files.prototype.Placeholder = function () {
            var _this = this;
            return (function (obj) {
                obj.title = function () { return _this.title(); };
                return obj;
            })(new this.$.$mol_book_placeholder);
        };
        $mol_app_files.prototype.tools_root = function () {
            return [];
        };
        $mol_app_files.prototype.page_tools = function (uri) {
            return [].concat(this.Close(uri));
        };
        $mol_app_files.prototype.Close = function (uri) {
            var _this = this;
            return (function (obj) {
                obj.sub = function () { return [].concat(_this.Close_icon(uri)); };
                obj.arg = function () { return _this.close_arg(uri); };
                return obj;
            })(new this.$.$mol_link);
        };
        $mol_app_files.prototype.Close_icon = function (uri) {
            return (function (obj) {
                return obj;
            })(new this.$.$mol_icon_cross);
        };
        $mol_app_files.prototype.close_arg = function (uri) {
            return ({});
        };
        __decorate([
            $.$mol_mem_key
        ], $mol_app_files.prototype, "Folder", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_app_files.prototype, "Folder_row", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_app_files.prototype, "Folder_row_info", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_app_files.prototype, "Folder_row_descr", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_app_files.prototype, "Folder_row_title", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_app_files.prototype, "File", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_app_files.prototype, "Icon_folder", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_app_files.prototype, "Icon_file", null);
        __decorate([
            $.$mol_mem
        ], $mol_app_files.prototype, "Placeholder", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_app_files.prototype, "Close", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_app_files.prototype, "Close_icon", null);
        return $mol_app_files;
    }($.$mol_book));
    $.$mol_app_files = $mol_app_files;
})($ || ($ = {}));
(function ($) {
    var $mol_app_files_folder = (function (_super) {
        __extends($mol_app_files_folder, _super);
        function $mol_app_files_folder() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_app_files_folder.prototype.minimal_width = function () {
            return 400;
        };
        $mol_app_files_folder.prototype.body = function () {
            return [].concat(this.Description(), this.Folder_rows());
        };
        $mol_app_files_folder.prototype.Description = function () {
            var _this = this;
            return (function (obj) {
                obj.text = function () { return _this.description(); };
                return obj;
            })(new this.$.$mol_text);
        };
        $mol_app_files_folder.prototype.description = function () {
            return "";
        };
        $mol_app_files_folder.prototype.Folder_rows = function () {
            var _this = this;
            return (function (obj) {
                obj.rows = function () { return _this.rows(); };
                return obj;
            })(new this.$.$mol_list);
        };
        $mol_app_files_folder.prototype.rows = function () {
            return [];
        };
        __decorate([
            $.$mol_mem
        ], $mol_app_files_folder.prototype, "Description", null);
        __decorate([
            $.$mol_mem
        ], $mol_app_files_folder.prototype, "Folder_rows", null);
        return $mol_app_files_folder;
    }($.$mol_page));
    $.$mol_app_files_folder = $mol_app_files_folder;
})($ || ($ = {}));
(function ($) {
    var $mol_app_files_file = (function (_super) {
        __extends($mol_app_files_file, _super);
        function $mol_app_files_file() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_app_files_file.prototype.minimal_width = function () {
            return 800;
        };
        $mol_app_files_file.prototype.body = function () {
            return [].concat(this.Embed());
        };
        $mol_app_files_file.prototype.Embed = function () {
            var _this = this;
            return (function (obj) {
                obj.uri = function () { return _this.src(); };
                obj.mime = function () { return _this.mime(); };
                return obj;
            })(new this.$.$mol_embed);
        };
        $mol_app_files_file.prototype.src = function () {
            return "";
        };
        $mol_app_files_file.prototype.mime = function () {
            return "";
        };
        __decorate([
            $.$mol_mem
        ], $mol_app_files_file.prototype, "Embed", null);
        return $mol_app_files_file;
    }($.$mol_page));
    $.$mol_app_files_file = $mol_app_files_file;
})($ || ($ = {}));
//files.view.tree.js.map
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
        var $mol_app_files = (function (_super) {
            __extends($mol_app_files, _super);
            function $mol_app_files() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            $mol_app_files.prototype.pages = function () {
                var _this = this;
                return this.webdavs().map(function (webdav) { return (_this.webdav_type(webdav.uri()) === 'dir')
                    ? _this.Folder(webdav.uri())
                    : _this.File(webdav.uri()); }).slice();
            };
            $mol_app_files.prototype.uri_root = function (next) {
                return $.$mol_state_arg.value(this.state_key('root'), next) || this.uri_root_default();
            };
            $mol_app_files.prototype.uri_current = function (next) {
                return $.$mol_state_arg.value(this.state_key('current'), next) || _super.prototype.uri_current.call(this);
            };
            $mol_app_files.prototype.root = function () {
                return $.$mol_webdav.item(this.uri_root());
            };
            $mol_app_files.prototype.current = function () {
                var root = this.uri_root();
                var current = this.uri_current();
                if (current.substring(0, root.length) !== root)
                    return this.root();
                return $.$mol_webdav.item(current);
            };
            $mol_app_files.prototype.webdav = function (uri) {
                var _this = this;
                var webdav = $.$mol_webdav.item(uri);
                webdav.credentials = function () { return _this.credentials(); };
                return webdav;
            };
            $mol_app_files.prototype.folder_row_current = function (uri) {
                return this.webdavs().indexOf(this.webdav(uri)) !== -1;
            };
            $mol_app_files.prototype.webdavs = function () {
                var root = this.root();
                var current = this.current();
                var webdavs = [current];
                var webdav = current;
                while (webdav !== root) {
                    webdav = webdav.parent();
                    webdavs.unshift(webdav);
                }
                return webdavs;
            };
            $mol_app_files.prototype.webdav_type = function (uri) {
                var webdav = this.webdav(uri);
                if (webdav === this.root() || webdav.type() === 'dir')
                    return 'dir';
                return 'file';
            };
            $mol_app_files.prototype.webdav_title = function (uri) {
                var webdav = this.webdav(uri);
                if (webdav === this.root())
                    return this.title_root();
                return webdav.prop('displayname') || '';
            };
            $mol_app_files.prototype.folder_rows = function (uri) {
                var _this = this;
                return this.webdav(uri).sub().map(function (webdav) { return _this.Folder_row(webdav.uri()); });
            };
            $mol_app_files.prototype.folder_row_arg = function (uri) {
                return { 'current': uri };
            };
            $mol_app_files.prototype.folder_row_icon = function (uri) {
                return this.webdav_type(uri) === 'dir'
                    ? this.Icon_folder(uri)
                    : this.Icon_file(uri);
            };
            $mol_app_files.prototype.folder_row_title = function (uri) {
                return this.webdav(uri).prop('displayname');
            };
            $mol_app_files.prototype.folder_row_descr = function (uri) {
                if (this.webdav_type(uri) !== 'file')
                    return '';
                var size = this.file_size(uri);
                return size.toLocaleString() + " B";
            };
            $mol_app_files.prototype.file_uri = function (uri) {
                return uri;
            };
            $mol_app_files.prototype.file_mime = function (uri) {
                return this.webdav(uri).prop('getcontenttype');
            };
            $mol_app_files.prototype.file_size = function (uri) {
                return Number(this.webdav(uri).prop('getcontentlength'));
            };
            $mol_app_files.prototype.title = function () {
                return this.webdav_title(this.uri_current());
            };
            $mol_app_files.prototype.page_tools = function (uri) {
                return uri === this.uri_root()
                    ? this.tools_root()
                    : [this.Close(uri)];
            };
            $mol_app_files.prototype.close_arg = function (uri) {
                return { 'current': this.webdav(uri).parent().uri() };
            };
            return $mol_app_files;
        }($.$mol_app_files));
        $$.$mol_app_files = $mol_app_files;
        var $mol_app_files_folder = (function (_super) {
            __extends($mol_app_files_folder, _super);
            function $mol_app_files_folder() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            $mol_app_files_folder.prototype.body = function () {
                return (this.description() ? [this.Description()] : []).concat([
                    this.Folder_rows(),
                ]);
            };
            return $mol_app_files_folder;
        }($.$mol_app_files_folder));
        $$.$mol_app_files_folder = $mol_app_files_folder;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//files.view.js.map
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
    var $mol_demo_large = (function (_super) {
        __extends($mol_demo_large, _super);
        function $mol_demo_large() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return $mol_demo_large;
    }($.$mol_view));
    $.$mol_demo_large = $mol_demo_large;
})($ || ($ = {}));
//large.view.tree.js.map
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
        var $mol_demo_large = (function (_super) {
            __extends($mol_demo_large, _super);
            function $mol_demo_large() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            $mol_demo_large.prototype.context_sub = function () {
                var _this = this;
                var context = this.context();
                var subContext = Object.create(context);
                subContext.$mol_view_visible_height = function () { return _this.minimal_height(); };
                subContext.$mol_view_visible_width = function () { return _this.minimal_width(); };
                return subContext;
            };
            $mol_demo_large.prototype.minimal_height = function () {
                return $.$mol_window.size().height * .75;
            };
            $mol_demo_large.prototype.minimal_width = function () {
                return this.$.$mol_window.size().width;
            };
            __decorate([
                $.$mol_mem
            ], $mol_demo_large.prototype, "context_sub", null);
            return $mol_demo_large;
        }($.$mol_demo_large));
        $$.$mol_demo_large = $mol_demo_large;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//large.view.js.map
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
    var $mol_app_files_demo = (function (_super) {
        __extends($mol_app_files_demo, _super);
        function $mol_app_files_demo() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_app_files_demo.prototype.sub = function () {
            return [].concat(this.App());
        };
        $mol_app_files_demo.prototype.App = function () {
            var _this = this;
            return (function (obj) {
                obj.title_root = function () { return _this.title(); };
                obj.uri_root_default = function () { return _this.uri_root(); };
                return obj;
            })(new this.$.$mol_app_files);
        };
        $mol_app_files_demo.prototype.title = function () {
            return $.$mol_locale.text(this.locale_contexts(), "title");
        };
        $mol_app_files_demo.prototype.uri_root = function () {
            return "http://ajaxexplorer.com/User5df12c6/";
        };
        __decorate([
            $.$mol_mem
        ], $mol_app_files_demo.prototype, "App", null);
        return $mol_app_files_demo;
    }($.$mol_demo_large));
    $.$mol_app_files_demo = $mol_app_files_demo;
})($ || ($ = {}));
//demo.view.tree.js.map
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
        var $mol_app_files_demo = (function (_super) {
            __extends($mol_app_files_demo, _super);
            function $mol_app_files_demo() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            $mol_app_files_demo.prototype.render = function () {
                $.$mol_http.resource(this.uri_root()).text();
                return _super.prototype.render.call(this);
            };
            return $mol_app_files_demo;
        }($.$mol_app_files_demo));
        $$.$mol_app_files_demo = $mol_app_files_demo;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//demo.view.js.map
//# sourceMappingURL=web.js.map