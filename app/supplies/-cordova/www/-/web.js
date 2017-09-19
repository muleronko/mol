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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_card = (function (_super) {
        __extends($mol_card, _super);
        function $mol_card() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_card.prototype.attr = function () {
            return (__assign({}, _super.prototype.attr.call(this), { "mol_card_status_type": this.status() }));
        };
        $mol_card.prototype.status = function () {
            return "";
        };
        $mol_card.prototype.rows = function () {
            return [].concat(this.Content(), this.Status());
        };
        $mol_card.prototype.Content = function () {
            var _this = this;
            return (function (obj) {
                obj.sub = function () { return _this.content(); };
                return obj;
            })(new this.$.$mol_view);
        };
        $mol_card.prototype.content = function () {
            return [];
        };
        $mol_card.prototype.Status = function () {
            var _this = this;
            return (function (obj) {
                obj.minimal_height = function () { return 30; };
                obj.sub = function () { return [].concat(_this.status_text()); };
                return obj;
            })(new this.$.$mol_view);
        };
        $mol_card.prototype.status_text = function () {
            return this.status();
        };
        __decorate([
            $.$mol_mem
        ], $mol_card.prototype, "Content", null);
        __decorate([
            $.$mol_mem
        ], $mol_card.prototype, "Status", null);
        return $mol_card;
    }($.$mol_list));
    $.$mol_card = $mol_card;
})($ || ($ = {}));
//card.view.tree.js.map
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
        var $mol_card = (function (_super) {
            __extends($mol_card, _super);
            function $mol_card() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            $mol_card.prototype.rows = function () {
                return [
                    this.Content()
                ].concat(this.status_text() ? [this.Status()] : []);
            };
            return $mol_card;
        }($.$mol_card));
        $$.$mol_card = $mol_card;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//card.view.js.map
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
    var $mol_unit = (function (_super) {
        __extends($mol_unit, _super);
        function $mol_unit(value) {
            var _this = _super.call(this) || this;
            _this['valueOf()'] = value;
            return _this;
        }
        $mol_unit.prototype.prefix = function () {
            return '';
        };
        $mol_unit.prototype.postfix = function () {
            return '';
        };
        $mol_unit.prototype.valueOf = function () {
            return this['valueOf()'];
        };
        $mol_unit.prototype.delimiter = function () {
            return ' ';
        };
        $mol_unit.prototype.value_view = function () {
            return this.valueOf().toLocaleString();
        };
        $mol_unit.prototype.toString = function () {
            return this.prefix() + this.value_view() + this.postfix();
        };
        $mol_unit.summ = function (a, b) {
            var Class = a.Class();
            if (Class !== b.Class())
                throw new Error("Not same measure: " + Class + " , " + b.Class());
            return new Class(a.valueOf() + b.valueOf());
        };
        $mol_unit.prototype.mult = function (m) {
            var Class = this.Class();
            return new Class(this.valueOf() * m);
        };
        return $mol_unit;
    }($.$mol_object));
    $.$mol_unit = $mol_unit;
})($ || ($ = {}));
//unit.js.map
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
    var $mol_unit_money = (function (_super) {
        __extends($mol_unit_money, _super);
        function $mol_unit_money() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return $mol_unit_money;
    }($.$mol_unit));
    $.$mol_unit_money = $mol_unit_money;
    var $mol_unit_money_usd = (function (_super) {
        __extends($mol_unit_money_usd, _super);
        function $mol_unit_money_usd() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_unit_money_usd.prototype.prefix = function () {
            return '$';
        };
        return $mol_unit_money_usd;
    }($mol_unit_money));
    $.$mol_unit_money_usd = $mol_unit_money_usd;
    var $mol_unit_money_rur = (function (_super) {
        __extends($mol_unit_money_rur, _super);
        function $mol_unit_money_rur() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_unit_money_rur.prototype.postfix = function () {
            return ' ₽';
        };
        return $mol_unit_money_rur;
    }($mol_unit_money));
    $.$mol_unit_money_rur = $mol_unit_money_rur;
})($ || ($ = {}));
//money.js.map
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
    var $mol_cost = (function (_super) {
        __extends($mol_cost, _super);
        function $mol_cost() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_cost.prototype.value = function () {
            return null;
        };
        $mol_cost.prototype.sub = function () {
            return [].concat(this.Prefix(), this.Value(), this.Postfix());
        };
        $mol_cost.prototype.Prefix = function () {
            var _this = this;
            return (function (obj) {
                obj.sub = function () { return [].concat(_this.prefix()); };
                return obj;
            })(new this.$.$mol_view);
        };
        $mol_cost.prototype.prefix = function () {
            return "";
        };
        $mol_cost.prototype.Value = function () {
            var _this = this;
            return (function (obj) {
                obj.sub = function () { return [].concat(_this.value_view()); };
                return obj;
            })(new this.$.$mol_view);
        };
        $mol_cost.prototype.value_view = function () {
            return "";
        };
        $mol_cost.prototype.Postfix = function () {
            var _this = this;
            return (function (obj) {
                obj.sub = function () { return [].concat(_this.postfix()); };
                return obj;
            })(new this.$.$mol_view);
        };
        $mol_cost.prototype.postfix = function () {
            return "";
        };
        __decorate([
            $.$mol_mem
        ], $mol_cost.prototype, "Prefix", null);
        __decorate([
            $.$mol_mem
        ], $mol_cost.prototype, "Value", null);
        __decorate([
            $.$mol_mem
        ], $mol_cost.prototype, "Postfix", null);
        return $mol_cost;
    }($.$mol_view));
    $.$mol_cost = $mol_cost;
})($ || ($ = {}));
//cost.view.tree.js.map
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
        var $mol_cost = (function (_super) {
            __extends($mol_cost, _super);
            function $mol_cost() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            $mol_cost.prototype.value = function () {
                return null;
            };
            $mol_cost.prototype.prefix = function () {
                return this.value().prefix();
            };
            $mol_cost.prototype.value_view = function () {
                return this.value().value_view();
            };
            $mol_cost.prototype.postfix = function () {
                return this.value().postfix();
            };
            return $mol_cost;
        }($.$mol_cost));
        $$.$mol_cost = $mol_cost;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//cost.view.js.map
;
var $;
(function ($) {
    var $mol_time_base = (function () {
        function $mol_time_base() {
        }
        $mol_time_base.formatter = function (pattern) {
            var _this = this;
            if (this.patterns[pattern])
                return this.patterns[pattern];
            var tokens = Object.keys(this.patterns)
                .sort()
                .reverse()
                .map(function (token) { return token.replace(/([-+*.\[\]()\^])/g, '\\$1'); });
            var lexer = RegExp('(.*?)(' + tokens.join('|') + '|$)', 'g');
            var funcs = [];
            pattern.replace(lexer, function (str, text, token) {
                if (text)
                    funcs.push(function () { return text; });
                if (token)
                    funcs.push(_this.patterns[token]);
                return str;
            });
            return this.patterns[pattern] = function (arg) {
                return funcs.reduce(function (res, func) { return res + func(arg); }, '');
            };
        };
        $mol_time_base.prototype.toString = function (pattern) {
            var Base = this.constructor;
            var formatter = Base.formatter(pattern);
            return formatter.call(Base, this);
        };
        $mol_time_base.patterns = {};
        return $mol_time_base;
    }());
    $.$mol_time_base = $mol_time_base;
})($ || ($ = {}));
//base.js.map
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
    var $mol_time_duration = (function (_super) {
        __extends($mol_time_duration, _super);
        function $mol_time_duration(config) {
            if (config === void 0) { config = 0; }
            var _this = _super.call(this) || this;
            if (typeof config === 'number') {
                _this.second = config / 1000;
                return _this;
            }
            if (typeof config === 'string') {
                if (config === 'Z') {
                    _this.hour = 0;
                    _this.minute = 0;
                    return _this;
                }
                duration: {
                    var parser_1 = /^P(?:([+-]?\d+(?:\.\d+)?)Y)?(?:([+-]?\d+(?:\.\d+)?)M)?(?:([+-]?\d+(?:\.\d+)?)D)?(?:T(?:([+-]?\d+(?:\.\d+)?)h)?(?:([+-]?\d+(?:\.\d+)?)m)?(?:([+-]?\d+(?:\.\d+)?)s)?)?$/i;
                    var found_1 = parser_1.exec(config);
                    if (!found_1)
                        break duration;
                    if (found_1[1])
                        _this.year = Number(found_1[1]);
                    if (found_1[2])
                        _this.month = Number(found_1[2]);
                    if (found_1[3])
                        _this.day = Number(found_1[3]);
                    if (found_1[4])
                        _this.hour = Number(found_1[4]);
                    if (found_1[5])
                        _this.minute = Number(found_1[5]);
                    if (found_1[6])
                        _this.second = Number(found_1[6]);
                    return _this;
                }
                offset: {
                    var parser = /^[+-](\d\d)(?::?(\d\d))?$/i;
                    var found = parser.exec(config);
                    if (!found)
                        break offset;
                    if (found[1])
                        _this.hour = Number(found[1]);
                    if (found[2])
                        _this.minute = Number(found[2]);
                    return _this;
                }
                throw new Error("Can not parse time duration (" + config + ")");
            }
            _this.year = config.year;
            _this.month = config.month;
            _this.day = config.day;
            _this.hour = config.hour;
            _this.minute = config.minute;
            _this.second = config.second;
            return _this;
        }
        $mol_time_duration.prototype.summ = function (config) {
            var duration = new $mol_time_duration(config);
            return new $mol_time_duration({
                year: this.year + duration.year,
                month: this.month + duration.month,
                day: this.day + duration.day,
                hour: this.hour + duration.hour,
                minute: this.minute + duration.minute,
                second: this.second + duration.second,
            });
        };
        $mol_time_duration.prototype.mult = function (numb) {
            return new $mol_time_duration({
                year: this.year && this.year * numb,
                month: this.month && this.month * numb,
                day: this.day && this.day * numb,
                hour: this.hour && this.hour * numb,
                minute: this.minute && this.minute * numb,
                second: this.second && this.second * numb,
            });
        };
        $mol_time_duration.prototype.valueOf = function () {
            var day = this.year * 365 + this.month * 30.4 + this.day;
            var second = ((day * 24 + this.hour) * 60 + this.minute) * 60 + this.second;
            return second * 1000;
        };
        $mol_time_duration.prototype.toJSON = function () { return this.toString(); };
        $mol_time_duration.prototype.toString = function (pattern) {
            if (pattern === void 0) { pattern = 'P#Y#M#DT#h#m#s'; }
            return _super.prototype.toString.call(this, pattern);
        };
        $mol_time_duration.patterns = {
            '#Y': function (duration) {
                if (!duration.year)
                    return '';
                return duration.year + 'Y';
            },
            '#M': function (duration) {
                if (!duration.month)
                    return '';
                return duration.month + 'M';
            },
            '#D': function (duration) {
                if (!duration.day)
                    return '';
                return duration.day + 'D';
            },
            '#h': function (duration) {
                if (!duration.hour)
                    return '';
                return duration.hour + 'H';
            },
            '#m': function (duration) {
                if (!duration.minute)
                    return '';
                return duration.minute + 'M';
            },
            '#s': function (duration) {
                if (!duration.second)
                    return '';
                return duration.second + 'S';
            },
            '+hh': function (duration) {
                var hour = duration.hour;
                var sign = '+';
                if (hour < 0) {
                    sign = '-';
                    hour = -hour;
                }
                return (hour < 10)
                    ? (sign + '0' + hour)
                    : (sign + hour);
            },
            'mm': function (duration) {
                return (duration.minute < 10)
                    ? ('0' + duration.minute)
                    : String(duration.minute);
            },
        };
        return $mol_time_duration;
    }($.$mol_time_base));
    $.$mol_time_duration = $mol_time_duration;
})($ || ($ = {}));
//duration.js.map
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
    var $mol_time_moment = (function (_super) {
        __extends($mol_time_moment, _super);
        function $mol_time_moment(config) {
            if (config === void 0) { config = new Date; }
            var _this = _super.call(this) || this;
            if (typeof config === 'number')
                config = new Date(config);
            if (typeof config === 'string') {
                var parsed = /^(?:(\d\d\d\d)(?:-?(\d\d)(?:-?(\d\d))?)?)?(?:[T ](\d\d)(?::?(\d\d)(?::?(\d\d(?:\.\d\d\d)?))?)?(Z|[\+\-]\d\d(?::?(?:\d\d)?)?)?)?$/.exec(config);
                if (!parsed)
                    throw new Error("Can not parse time moment (" + config + ")");
                if (parsed[1])
                    _this.year = Number(parsed[1]);
                if (parsed[2])
                    _this.month = Number(parsed[2]) - 1;
                if (parsed[3])
                    _this.day = Number(parsed[3]) - 1;
                if (parsed[4])
                    _this.hour = Number(parsed[4]);
                if (parsed[5])
                    _this.minute = Number(parsed[5]);
                if (parsed[6])
                    _this.second = Number(parsed[6]);
                if (parsed[7])
                    _this.offset = new $.$mol_time_duration(parsed[7]);
                return _this;
            }
            if (config instanceof Date) {
                _this.year = config.getFullYear();
                _this.month = config.getMonth();
                _this.day = config.getDate() - 1;
                _this.hour = config.getHours();
                _this.minute = config.getMinutes();
                _this.second = config.getSeconds() + config.getMilliseconds() / 1000;
                var offset = -config.getTimezoneOffset();
                _this.offset = new $.$mol_time_duration({
                    hour: (offset < 0) ? Math.ceil(offset / 60) : Math.floor(offset / 60),
                    minute: offset % 60
                });
                return _this;
            }
            _this.year = config.year;
            _this.month = config.month;
            _this.day = config.day;
            _this.hour = config.hour;
            _this.minute = config.minute;
            _this.second = config.second;
            if (config.offset !== undefined)
                _this.offset = new $.$mol_time_duration(config.offset);
            return _this;
        }
        Object.defineProperty($mol_time_moment.prototype, "weekday", {
            get: function () {
                return this.native.getDay();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty($mol_time_moment.prototype, "native", {
            get: function () {
                if (this._native)
                    return this._native;
                var utc = this.toOffset('Z');
                return this._native = new Date(Date.UTC((utc.year || 0), (utc.month || 0), (utc.day || 0) + 1, (utc.hour || 0), (utc.minute || 0), (utc.second && Math.floor(utc.second) || 0), (utc.second && Math.floor((utc.second - Math.floor(utc.second)) * 1000) || 0)));
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty($mol_time_moment.prototype, "normal", {
            get: function () {
                if (this._normal)
                    return this._normal;
                var moment = new $mol_time_moment(this.native);
                return this._normal = new $mol_time_moment({
                    year: (this.year === undefined) ? undefined : moment.year,
                    month: (this.month === undefined) ? undefined : moment.month,
                    day: (this.day === undefined) ? undefined : moment.day,
                    hour: (this.hour === undefined) ? undefined : moment.hour,
                    minute: (this.minute === undefined) ? undefined : moment.minute,
                    second: (this.second === undefined) ? undefined : moment.second,
                    offset: (this.offset === undefined) ? undefined : moment.offset,
                });
            },
            enumerable: true,
            configurable: true
        });
        $mol_time_moment.prototype.merge = function (config) {
            var moment = new $mol_time_moment(config);
            return new $mol_time_moment({
                year: (moment.year === undefined) ? this.year : moment.year,
                month: (moment.month === undefined) ? this.month : moment.month,
                day: (moment.day === undefined) ? this.day : moment.day,
                hour: (moment.hour === undefined) ? this.hour : moment.hour,
                minute: (moment.minute === undefined) ? this.minute : moment.minute,
                second: (moment.second === undefined) ? this.second : moment.second,
                offset: (moment.offset === undefined) ? this.offset : moment.offset,
            });
        };
        $mol_time_moment.prototype.shift = function (config) {
            var duration = new $.$mol_time_duration(config);
            var moment = new $mol_time_moment().merge(this);
            var second = (moment.second + (duration.second || 0));
            var native = new Date(moment.year + (duration.year || 0), moment.month + (duration.month || 0), moment.day + 1 + (duration.day || 0), moment.hour + (duration.hour || 0), moment.minute + (duration.minute || 0), Math.floor(second), (second - Math.floor(second)) * 1000);
            if (isNaN(native.valueOf()))
                throw new Error('Wrong time');
            return new $mol_time_moment({
                year: (this.year === undefined) ? undefined : native.getFullYear(),
                month: (this.month === undefined) ? undefined : native.getMonth(),
                day: (this.day === undefined) ? undefined : native.getDate() - 1,
                hour: (this.hour === undefined) ? undefined : native.getHours(),
                minute: (this.minute === undefined) ? undefined : native.getMinutes(),
                second: (this.second === undefined) ? undefined : native.getSeconds() + native.getMilliseconds() / 1000,
                offset: this.offset,
            });
        };
        $mol_time_moment.prototype.toOffset = function (config) {
            var duration = new $.$mol_time_duration(config);
            var offset = this.offset || new $mol_time_moment().offset;
            var moment = this.shift(duration.summ(offset.mult(-1)));
            return moment.merge({ offset: duration });
        };
        $mol_time_moment.prototype.valueOf = function () { return this.native.getTime(); };
        $mol_time_moment.prototype.toJSON = function () { return this.toString(); };
        $mol_time_moment.prototype.toString = function (pattern) {
            if (pattern === void 0) { pattern = 'YYYY-MM-DDThh:mm:ss.sssZ'; }
            return _super.prototype.toString.call(this, pattern);
        };
        $mol_time_moment.patterns = {
            'YYYY': function (moment) {
                if (moment.year == null)
                    return '';
                return String(moment.year);
            },
            'AD': function (moment) {
                if (moment.year == null)
                    return '';
                return String(Math.floor(moment.year / 100) + 1);
            },
            'YY': function (moment) {
                if (moment.year == null)
                    return '';
                return String(moment.year % 100);
            },
            'Month': function (moment) {
                if (moment.month == null)
                    return '';
                return moment.native.toLocaleString(undefined, { month: 'long' });
            },
            'DD Month': function (moment) {
                return moment.native.toLocaleString(undefined, { day: '2-digit', month: 'long' });
            },
            'D Month': function (moment) {
                return moment.native.toLocaleString(undefined, { day: 'numeric', month: 'long' });
            },
            'Mon': function (moment) {
                if (moment.month == null)
                    return '';
                return moment.native.toLocaleString(undefined, { month: 'short' });
            },
            'DD Mon': function (moment) {
                return moment.native.toLocaleString(undefined, { day: '2-digit', month: 'short' });
            },
            'D Mon': function (moment) {
                return moment.native.toLocaleString(undefined, { day: 'numeric', month: 'short' });
            },
            '-MM': function (moment) {
                if (moment.month == null)
                    return '';
                return '-' + $mol_time_moment.patterns['MM'](moment);
            },
            'MM': function (moment) {
                if (moment.month == null)
                    return '';
                var month = moment.month + 1;
                return (month < 10)
                    ? ('0' + month)
                    : ('' + month);
            },
            'M': function (moment) {
                if (moment.month == null)
                    return '';
                return String(moment.month + 1);
            },
            'WeekDay': function (moment) {
                if (moment.weekday == null)
                    return '';
                return moment.native.toLocaleString(undefined, { weekday: 'long' });
            },
            'WD': function (moment) {
                if (moment.weekday == null)
                    return '';
                return moment.native.toLocaleString(undefined, { weekday: 'short' });
            },
            '-DD': function (moment) {
                if (moment.day == null)
                    return '';
                return '-' + $mol_time_moment.patterns['DD'](moment);
            },
            'DD': function (moment) {
                if (moment.day == null)
                    return '';
                var day = moment.day + 1;
                return (day < 10)
                    ? ('0' + day)
                    : String(day);
            },
            'D': function (moment) {
                if (moment.day == null)
                    return '';
                return String(moment.day + 1);
            },
            'Thh': function (moment) {
                if (moment.hour == null)
                    return '';
                return 'T' + $mol_time_moment.patterns['hh'](moment);
            },
            'hh': function (moment) {
                if (moment.hour == null)
                    return '';
                return (moment.hour < 10)
                    ? ('0' + moment.hour)
                    : String(moment.hour);
            },
            'h': function (moment) {
                if (moment.hour == null)
                    return '';
                return String(moment.hour);
            },
            ':mm': function (moment) {
                if (moment.minute == null)
                    return '';
                return ':' + $mol_time_moment.patterns['mm'](moment);
            },
            'mm': function (moment) {
                if (moment.minute == null)
                    return '';
                return (moment.minute < 10)
                    ? ('0' + moment.minute)
                    : String(moment.minute);
            },
            'm': function (moment) {
                if (moment.minute == null)
                    return '';
                return String(moment.minute);
            },
            ':ss': function (moment) {
                if (moment.second == null)
                    return '';
                return ':' + $mol_time_moment.patterns['ss'](moment);
            },
            'ss': function (moment) {
                if (moment.second == null)
                    return '';
                var second = Math.floor(moment.second);
                return (second < 10)
                    ? ('0' + second)
                    : String(second);
            },
            's': function (moment) {
                if (moment.second == null)
                    return '';
                return String(Math.floor(moment.second));
            },
            '.sss': function (moment) {
                if (moment.second == null)
                    return '';
                if (moment.second - Math.floor(moment.second) === 0)
                    return '';
                return '.' + $mol_time_moment.patterns['sss'](moment);
            },
            'sss': function (moment) {
                if (moment.second == null)
                    return '';
                var millisecond = Math.floor((moment.second - Math.floor(moment.second)) * 1000);
                return (millisecond < 10)
                    ? ('00' + millisecond)
                    : (millisecond < 100)
                        ? ('0' + millisecond)
                        : String(millisecond);
            },
            'Z': function (moment) {
                var offset = moment.offset;
                if (!offset)
                    return '';
                return offset.toString('+hh:mm');
            }
        };
        return $mol_time_moment;
    }($.$mol_time_base));
    $.$mol_time_moment = $mol_time_moment;
})($ || ($ = {}));
//moment.js.map
;
var $;
(function ($) {
    function $mol_stub_select_random(list) {
        return list[Math.floor(Math.random() * list.length)];
    }
    $.$mol_stub_select_random = $mol_stub_select_random;
    function $mol_stub_strings(prefix, count, length) {
        if (prefix === void 0) { prefix = ''; }
        if (count === void 0) { count = 10; }
        if (length === void 0) { length = 10; }
        if (prefix.length >= length)
            return [];
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split('');
        var strings = [];
        for (var i = 0; i < count; i++) {
            var text = prefix;
            for (var j = prefix.length; j < length; j++) {
                text += $mol_stub_select_random(possible);
            }
            strings.push(text);
        }
        return strings;
    }
    $.$mol_stub_strings = $mol_stub_strings;
    function $mol_stub_code(length) {
        if (length === void 0) { length = 8; }
        var max = Math.pow(16, length);
        var min = Math.pow(16, length - 1);
        var value = min + Math.floor(Math.random() * (max - min));
        return value.toString(16).toUpperCase();
    }
    $.$mol_stub_code = $mol_stub_code;
    function $mol_stub_price(max) {
        if (max === void 0) { max = 1000; }
        var min = Math.floor(max / 16 / 16);
        var value = min + Math.floor(Math.random() * (max - min));
        return new $.$mol_unit_money_usd(value);
    }
    $.$mol_stub_price = $mol_stub_price;
    function $mol_stub_product_name() {
        var name = $mol_stub_select_random([
            'Monitor 15"',
            'Monitor 17"',
            'Monitor 19"',
            'Graphics card',
            'Frame grabber card'
        ]);
        var port = $mol_stub_select_random(['D-SUB', 'DVI', 'HDMI']);
        var resolution = $mol_stub_select_random(['VGA', 'Full HD', '4K']);
        return [name, port, resolution].join(', ');
    }
    $.$mol_stub_product_name = $mol_stub_product_name;
    function $mol_stub_company_name_big() {
        var product = $mol_stub_select_random(['Everything', 'Something', 'Anything', 'Nothing']);
        var type = $mol_stub_select_random(['Company', 'Corporation', 'Holding']);
        return "A " + type + " that makes " + product;
    }
    $.$mol_stub_company_name_big = $mol_stub_company_name_big;
    function $mol_stub_company_name_small() {
        return $mol_stub_select_random(['ACME inc.', 'Dream Company', 'Just Company']);
    }
    $.$mol_stub_company_name_small = $mol_stub_company_name_small;
    function $mol_stub_company_name() {
        return $mol_stub_select_random([$mol_stub_company_name_small, $mol_stub_company_name_big])();
    }
    $.$mol_stub_company_name = $mol_stub_company_name;
    function $mol_stub_person_name() {
        var first = $mol_stub_select_random(['Ivan', 'Petr', 'Sidor']);
        var last = $mol_stub_select_random(['Ivanov', 'Petrov', 'Sidorov']);
        return first + " " + last;
    }
    $.$mol_stub_person_name = $mol_stub_person_name;
    function $mol_stub_city() {
        return $mol_stub_select_random(['Moscow', 'London', 'Washington', 'Buenos Aires']);
    }
    $.$mol_stub_city = $mol_stub_city;
    function $mol_stub_time(maxShift) {
        if (maxShift === void 0) { maxShift = 60 * 24 * 365; }
        return new $.$mol_time_moment().shift({ minute: Math.round(Math.random() * maxShift) });
    }
    $.$mol_stub_time = $mol_stub_time;
})($ || ($ = {}));
//stub.js.map
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
    var $mol_app_supplies_domain_provider = (function (_super) {
        __extends($mol_app_supplies_domain_provider, _super);
        function $mol_app_supplies_domain_provider() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_app_supplies_domain_provider.prototype.id = function () { return void 0; };
        $mol_app_supplies_domain_provider.prototype.name = function () { return void 0; };
        return $mol_app_supplies_domain_provider;
    }($.$mol_object));
    $.$mol_app_supplies_domain_provider = $mol_app_supplies_domain_provider;
    var $mol_app_supplies_domain_supply_group = (function (_super) {
        __extends($mol_app_supplies_domain_supply_group, _super);
        function $mol_app_supplies_domain_supply_group() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_app_supplies_domain_supply_group.prototype.id = function () { return void 0; };
        $mol_app_supplies_domain_supply_group.prototype.name = function () { return void 0; };
        $mol_app_supplies_domain_supply_group.prototype.manager = function () { return void 0; };
        return $mol_app_supplies_domain_supply_group;
    }($.$mol_object));
    $.$mol_app_supplies_domain_supply_group = $mol_app_supplies_domain_supply_group;
    var $mol_app_supplies_domain_supply_division = (function (_super) {
        __extends($mol_app_supplies_domain_supply_division, _super);
        function $mol_app_supplies_domain_supply_division() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_app_supplies_domain_supply_division.prototype.id = function () { return void 0; };
        $mol_app_supplies_domain_supply_division.prototype.name = function () { return void 0; };
        return $mol_app_supplies_domain_supply_division;
    }($.$mol_object));
    $.$mol_app_supplies_domain_supply_division = $mol_app_supplies_domain_supply_division;
    var $mol_app_supplies_domain_pay_method = (function (_super) {
        __extends($mol_app_supplies_domain_pay_method, _super);
        function $mol_app_supplies_domain_pay_method() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_app_supplies_domain_pay_method.prototype.id = function () { return void 0; };
        $mol_app_supplies_domain_pay_method.prototype.name = function () { return void 0; };
        return $mol_app_supplies_domain_pay_method;
    }($.$mol_object));
    $.$mol_app_supplies_domain_pay_method = $mol_app_supplies_domain_pay_method;
    var $mol_app_supplies_domain_debitor = (function (_super) {
        __extends($mol_app_supplies_domain_debitor, _super);
        function $mol_app_supplies_domain_debitor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_app_supplies_domain_debitor.prototype.id = function () { return void 0; };
        $mol_app_supplies_domain_debitor.prototype.name = function () { return void 0; };
        return $mol_app_supplies_domain_debitor;
    }($.$mol_object));
    $.$mol_app_supplies_domain_debitor = $mol_app_supplies_domain_debitor;
    var $mol_app_supplies_domain_supply_position = (function (_super) {
        __extends($mol_app_supplies_domain_supply_position, _super);
        function $mol_app_supplies_domain_supply_position() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_app_supplies_domain_supply_position.prototype.name = function () { return void 0; };
        $mol_app_supplies_domain_supply_position.prototype.supply_moment = function () { return void 0; };
        $mol_app_supplies_domain_supply_position.prototype.division = function () { return void 0; };
        $mol_app_supplies_domain_supply_position.prototype.store = function () { return void 0; };
        $mol_app_supplies_domain_supply_position.prototype.price = function () { return void 0; };
        $mol_app_supplies_domain_supply_position.prototype.quantity = function () { return void 0; };
        $mol_app_supplies_domain_supply_position.prototype.cost = function () {
            return this.price().mult(this.quantity());
        };
        return $mol_app_supplies_domain_supply_position;
    }($.$mol_object));
    $.$mol_app_supplies_domain_supply_position = $mol_app_supplies_domain_supply_position;
    var $mol_app_supplies_domain_attachment = (function (_super) {
        __extends($mol_app_supplies_domain_attachment, _super);
        function $mol_app_supplies_domain_attachment() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_app_supplies_domain_attachment.prototype.url_thumb = function () { return void 0; };
        $mol_app_supplies_domain_attachment.prototype.url_load = function () { return void 0; };
        return $mol_app_supplies_domain_attachment;
    }($.$mol_object));
    $.$mol_app_supplies_domain_attachment = $mol_app_supplies_domain_attachment;
    var $mol_app_supplies_domain_person = (function (_super) {
        __extends($mol_app_supplies_domain_person, _super);
        function $mol_app_supplies_domain_person() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_app_supplies_domain_person.prototype.id = function () { return void 0; };
        $mol_app_supplies_domain_person.prototype.name = function () { return void 0; };
        return $mol_app_supplies_domain_person;
    }($.$mol_object));
    $.$mol_app_supplies_domain_person = $mol_app_supplies_domain_person;
    var $mol_app_supplies_domain_contract = (function (_super) {
        __extends($mol_app_supplies_domain_contract, _super);
        function $mol_app_supplies_domain_contract() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_app_supplies_domain_contract.prototype.id = function () { return void 0; };
        return $mol_app_supplies_domain_contract;
    }($.$mol_object));
    $.$mol_app_supplies_domain_contract = $mol_app_supplies_domain_contract;
    var $mol_app_supplies_domain_ballance_unit = (function (_super) {
        __extends($mol_app_supplies_domain_ballance_unit, _super);
        function $mol_app_supplies_domain_ballance_unit() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_app_supplies_domain_ballance_unit.prototype.id = function () { return void 0; };
        $mol_app_supplies_domain_ballance_unit.prototype.name = function () { return void 0; };
        return $mol_app_supplies_domain_ballance_unit;
    }($.$mol_object));
    $.$mol_app_supplies_domain_ballance_unit = $mol_app_supplies_domain_ballance_unit;
    var $mol_app_supplies_domain_consumer = (function (_super) {
        __extends($mol_app_supplies_domain_consumer, _super);
        function $mol_app_supplies_domain_consumer() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_app_supplies_domain_consumer.prototype.id = function () { return void 0; };
        $mol_app_supplies_domain_consumer.prototype.name = function () { return void 0; };
        return $mol_app_supplies_domain_consumer;
    }($.$mol_object));
    $.$mol_app_supplies_domain_consumer = $mol_app_supplies_domain_consumer;
    var $mol_app_supplies_domain_store = (function (_super) {
        __extends($mol_app_supplies_domain_store, _super);
        function $mol_app_supplies_domain_store() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_app_supplies_domain_store.prototype.id = function () { return void 0; };
        $mol_app_supplies_domain_store.prototype.name = function () { return void 0; };
        return $mol_app_supplies_domain_store;
    }($.$mol_object));
    $.$mol_app_supplies_domain_store = $mol_app_supplies_domain_store;
    var $mol_app_supplies_domain_supply = (function (_super) {
        __extends($mol_app_supplies_domain_supply, _super);
        function $mol_app_supplies_domain_supply() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_app_supplies_domain_supply.prototype.id = function () { return void 0; };
        $mol_app_supplies_domain_supply.prototype.provider = function () { return void 0; };
        $mol_app_supplies_domain_supply.prototype.consumer = function () { return void 0; };
        $mol_app_supplies_domain_supply.prototype.group = function () { return void 0; };
        $mol_app_supplies_domain_supply.prototype.status = function (next) { return next; };
        $mol_app_supplies_domain_supply.prototype.ballance_unit = function () { return void 0; };
        $mol_app_supplies_domain_supply.prototype.manager = function () { return void 0; };
        $mol_app_supplies_domain_supply.prototype.contract = function () { return void 0; };
        $mol_app_supplies_domain_supply.prototype.pay_method = function () { return void 0; };
        $mol_app_supplies_domain_supply.prototype.debitor = function () { return void 0; };
        $mol_app_supplies_domain_supply.prototype.positions = function () { return void 0; };
        $mol_app_supplies_domain_supply.prototype.attachments = function (next) { return next || []; };
        $mol_app_supplies_domain_supply.prototype.cost = function () { return void 0; };
        __decorate([
            $.$mol_mem
        ], $mol_app_supplies_domain_supply.prototype, "status", null);
        __decorate([
            $.$mol_mem
        ], $mol_app_supplies_domain_supply.prototype, "attachments", null);
        return $mol_app_supplies_domain_supply;
    }($.$mol_object));
    $.$mol_app_supplies_domain_supply = $mol_app_supplies_domain_supply;
    var $mol_app_supplies_domain_supply_status;
    (function ($mol_app_supplies_domain_supply_status) {
        $mol_app_supplies_domain_supply_status[$mol_app_supplies_domain_supply_status["pending"] = 'pending'] = "pending";
        $mol_app_supplies_domain_supply_status[$mol_app_supplies_domain_supply_status["approved"] = 'approved'] = "approved";
    })($mol_app_supplies_domain_supply_status = $.$mol_app_supplies_domain_supply_status || ($.$mol_app_supplies_domain_supply_status = {}));
    var $mol_app_supplies_domain_mock = (function (_super) {
        __extends($mol_app_supplies_domain_mock, _super);
        function $mol_app_supplies_domain_mock() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_app_supplies_domain_mock.prototype.supplies = function () {
            var next = [];
            for (var i = 1; i <= 100; ++i) {
                next.push(this.supply((i * 123456789 % 987654321).toString(16).toUpperCase()));
            }
            return next;
        };
        $mol_app_supplies_domain_mock.prototype.positions = function (supply) {
            var next = [];
            var count = 10 + Math.floor(Math.random() * 30);
            for (var i = 1; i <= count; ++i) {
                next.push(this.position({
                    supply: supply,
                    position: (i * 123456789 % 987654321).toString(16).toUpperCase()
                }));
            }
            return next;
        };
        $mol_app_supplies_domain_mock.prototype.supply_status = function (id, next) {
            return next || $.$mol_stub_select_random([
                $mol_app_supplies_domain_supply_status.pending,
                $mol_app_supplies_domain_supply_status.approved
            ]);
        };
        $mol_app_supplies_domain_mock.prototype.supply = function (id) {
            var _this = this;
            return $mol_app_supplies_domain_supply.make({
                id: $.$mol_const(id),
                cost: function () { return new $.$mol_unit_money_usd(_this.positions(id).reduce(function (sum, pos) { return sum + pos.cost().valueOf(); }, 0)); },
                status: function (next) { return _this.supply_status(id, next); },
                provider: $.$mol_const(this.provider($.$mol_stub_code(2))),
                consumer: $.$mol_const(this.consumer($.$mol_stub_code(2))),
                group: $.$mol_const(this.supply_group($.$mol_stub_code(2))),
                contract: $.$mol_const(this.contract($.$mol_stub_code(8))),
                manager: $.$mol_const(this.person($.$mol_stub_code(2))),
                ballance_unit: $.$mol_const(this.ballance_unit($.$mol_stub_code(2))),
                pay_method: $.$mol_const(this.pay_method($.$mol_stub_code(1))),
                debitor: $.$mol_const(this.debitor($.$mol_stub_code(2))),
                positions: function () { return _this.positions(id); },
                attachments: function (next) { return _this.attachments(id, next); },
            });
        };
        $mol_app_supplies_domain_mock.prototype.provider = function (id) {
            return $mol_app_supplies_domain_provider.make({
                id: $.$mol_const(id),
                name: $.$mol_const($.$mol_stub_company_name()),
            });
        };
        $mol_app_supplies_domain_mock.prototype.consumer = function (id) {
            return $mol_app_supplies_domain_consumer.make({
                id: $.$mol_const(id),
                name: $.$mol_const($.$mol_stub_company_name()),
            });
        };
        $mol_app_supplies_domain_mock.prototype.ballance_unit = function (id) {
            return $mol_app_supplies_domain_ballance_unit.make({
                id: $.$mol_const(id),
                name: $.$mol_const($.$mol_stub_select_random([
                    'ACME Enterprise',
                    'ACME Customer',
                    'ACME Inside'
                ])),
            });
        };
        $mol_app_supplies_domain_mock.prototype.division = function (id) {
            return $mol_app_supplies_domain_supply_division.make({
                id: $.$mol_const(id),
                name: $.$mol_const($.$mol_stub_code(4)),
            });
        };
        $mol_app_supplies_domain_mock.prototype.supply_group = function (id) {
            return $mol_app_supplies_domain_supply_group.make({
                id: $.$mol_const(id),
                name: $.$mol_const($.$mol_stub_person_name() + ' Group'),
            });
        };
        $mol_app_supplies_domain_mock.prototype.store = function (id) {
            return $mol_app_supplies_domain_store.make({
                id: $.$mol_const(id),
                name: $.$mol_const($.$mol_stub_city() + ' #' + $.$mol_stub_code(2)),
            });
        };
        $mol_app_supplies_domain_mock.prototype.person = function (id) {
            return $mol_app_supplies_domain_person.make({
                id: $.$mol_const(id),
                name: $.$mol_const($.$mol_stub_person_name()),
            });
        };
        $mol_app_supplies_domain_mock.prototype.contract = function (id) {
            return $mol_app_supplies_domain_person.make({
                id: $.$mol_const(id),
            });
        };
        $mol_app_supplies_domain_mock.prototype.pay_method = function (id) {
            return $mol_app_supplies_domain_pay_method.make({
                id: $.$mol_const(id),
                name: $.$mol_const($.$mol_stub_select_random(['Accounting', 'Cash'])),
            });
        };
        $mol_app_supplies_domain_mock.prototype.debitor = function (id) {
            return $mol_app_supplies_domain_pay_method.make({
                id: $.$mol_const(id),
                name: $.$mol_const($.$mol_stub_company_name()),
            });
        };
        $mol_app_supplies_domain_mock.prototype.position = function (id) {
            return $mol_app_supplies_domain_supply_position.make({
                name: $.$mol_const($.$mol_stub_product_name()),
                supply_moment: $.$mol_const($.$mol_stub_time(60 * 24 * 365)),
                store: $.$mol_const(this.store($.$mol_stub_code(2))),
                division: $.$mol_const(this.division($.$mol_stub_code(2))),
                price: $.$mol_const($.$mol_stub_price(1000)),
                quantity: $.$mol_const(Math.round(Math.random() * 30)),
            });
        };
        $mol_app_supplies_domain_mock.prototype.attachments = function (id, next) {
            return next || [];
        };
        $mol_app_supplies_domain_mock.prototype.attachment = function (id) {
            var image = $.$mol_const('data:image/svg+xml;base64,PHN2ZyBpZD0i0KHQu9C+0LlfMSIgZGF0YS1uYW1lPSLQodC70L7QuSAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MjUuNyA2NDUuNDQiPgoJPGRlZnM+CgkJPHN0eWxlPi5jbHMtMXtmaWxsOiM0YzdjNGQ7fS5jbHMtMntmaWxsOiM2ZmMwNTg7fTwvc3R5bGU+Cgk8L2RlZnM+Cgk8dGl0bGU+JG1vbF9zeW1ib2w8L3RpdGxlPgoJPHBvbHlnb24gY2xhc3M9ImNscy0xIgoJCQkgcG9pbnRzPSI4MC43OCAyMTcuNTYgMjE0LjAzIDExNC42MSAzNTEuMTIgMjIwLjUzIDQyNS43IDE2Mi45MSAyMTQuODQgMCAzLjk4IDE2Mi45MSA0LjM1IDE2My4xOSAzLjM1IDE2My45NiAzNDQuOTMgNDI3Ljg3IDIxMS42NyA1MzAuODMgNzQuNTggNDI0LjkxIDAgNDgyLjUzIDIxMC44NiA2NDUuNDQgNDIxLjcyIDQ4Mi41MyA0MjEuMDIgNDgxLjk5IDQyMi4wMyA0ODEuMjEgODAuNzggMjE3LjU2Ii8+Cgk8cG9seWdvbiBjbGFzcz0iY2xzLTIiIHBvaW50cz0iMjA5LjU0IDQ0MC44MyA1OC4zNiAzMjIuNzIgMjA5LjU0IDIwNC42MSAzNjcuMzQgMzIyLjcyIDIwOS41NCA0NDAuODMiLz4KPC9zdmc+Cg==');
            return $mol_app_supplies_domain_attachment.make({
                url_thumb: image,
                url_load: image,
            });
        };
        __decorate([
            $.$mol_mem
        ], $mol_app_supplies_domain_mock.prototype, "supplies", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_app_supplies_domain_mock.prototype, "positions", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_app_supplies_domain_mock.prototype, "supply_status", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_app_supplies_domain_mock.prototype, "supply", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_app_supplies_domain_mock.prototype, "provider", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_app_supplies_domain_mock.prototype, "consumer", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_app_supplies_domain_mock.prototype, "ballance_unit", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_app_supplies_domain_mock.prototype, "division", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_app_supplies_domain_mock.prototype, "supply_group", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_app_supplies_domain_mock.prototype, "store", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_app_supplies_domain_mock.prototype, "person", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_app_supplies_domain_mock.prototype, "contract", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_app_supplies_domain_mock.prototype, "pay_method", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_app_supplies_domain_mock.prototype, "debitor", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_app_supplies_domain_mock.prototype, "position", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_app_supplies_domain_mock.prototype, "attachments", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_app_supplies_domain_mock.prototype, "attachment", null);
        return $mol_app_supplies_domain_mock;
    }($.$mol_object));
    $.$mol_app_supplies_domain_mock = $mol_app_supplies_domain_mock;
})($ || ($ = {}));
//domain.js.map
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
    var $mol_app_supplies_card = (function (_super) {
        __extends($mol_app_supplies_card, _super);
        function $mol_app_supplies_card() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_app_supplies_card.prototype.supply = function () {
            return null;
        };
        $mol_app_supplies_card.prototype.sub = function () {
            return [].concat(this.Card());
        };
        $mol_app_supplies_card.prototype.Card = function () {
            var _this = this;
            return (function (obj) {
                obj.status = function () { return _this.status(); };
                obj.Content = function () { return _this.Group(); };
                return obj;
            })(new this.$.$mol_card);
        };
        $mol_app_supplies_card.prototype.status = function () {
            return "";
        };
        $mol_app_supplies_card.prototype.Group = function () {
            var _this = this;
            return (function (obj) {
                obj.sub = function () { return [].concat(_this.items()); };
                return obj;
            })(new this.$.$mol_row);
        };
        $mol_app_supplies_card.prototype.items = function () {
            return [].concat(this.Code_item(), this.Cost_item(), this.Provider_item());
        };
        $mol_app_supplies_card.prototype.Code_item = function () {
            var _this = this;
            return (function (obj) {
                obj.title = function () { return _this.code_title(); };
                obj.content = function () { return _this.code(); };
                return obj;
            })(new this.$.$mol_labeler);
        };
        $mol_app_supplies_card.prototype.code_title = function () {
            return $.$mol_locale.text(this.locale_contexts(), "code_title");
        };
        $mol_app_supplies_card.prototype.code = function () {
            return "";
        };
        $mol_app_supplies_card.prototype.Cost_item = function () {
            var _this = this;
            return (function (obj) {
                obj.title = function () { return _this.cost_title(); };
                obj.content = function () { return _this.Cost(); };
                return obj;
            })(new this.$.$mol_labeler);
        };
        $mol_app_supplies_card.prototype.cost_title = function () {
            return $.$mol_locale.text(this.locale_contexts(), "cost_title");
        };
        $mol_app_supplies_card.prototype.Cost = function () {
            var _this = this;
            return (function (obj) {
                obj.value = function () { return _this.cost(); };
                return obj;
            })(new this.$.$mol_cost);
        };
        $mol_app_supplies_card.prototype.cost = function () {
            return (function (obj) {
                obj.valueOf = function () { return 0; };
                return obj;
            })(new this.$.$mol_unit_money);
        };
        $mol_app_supplies_card.prototype.Provider_item = function () {
            var _this = this;
            return (function (obj) {
                obj.title = function () { return _this.provider_title(); };
                obj.content = function () { return _this.provider_name(); };
                return obj;
            })(new this.$.$mol_labeler);
        };
        $mol_app_supplies_card.prototype.provider_title = function () {
            return $.$mol_locale.text(this.locale_contexts(), "provider_title");
        };
        $mol_app_supplies_card.prototype.provider_name = function () {
            return "";
        };
        __decorate([
            $.$mol_mem
        ], $mol_app_supplies_card.prototype, "Card", null);
        __decorate([
            $.$mol_mem
        ], $mol_app_supplies_card.prototype, "Group", null);
        __decorate([
            $.$mol_mem
        ], $mol_app_supplies_card.prototype, "Code_item", null);
        __decorate([
            $.$mol_mem
        ], $mol_app_supplies_card.prototype, "Cost_item", null);
        __decorate([
            $.$mol_mem
        ], $mol_app_supplies_card.prototype, "Cost", null);
        __decorate([
            $.$mol_mem
        ], $mol_app_supplies_card.prototype, "cost", null);
        __decorate([
            $.$mol_mem
        ], $mol_app_supplies_card.prototype, "Provider_item", null);
        return $mol_app_supplies_card;
    }($.$mol_link));
    $.$mol_app_supplies_card = $mol_app_supplies_card;
})($ || ($ = {}));
//card.view.tree.js.map
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
        var $mol_app_supplies_card = (function (_super) {
            __extends($mol_app_supplies_card, _super);
            function $mol_app_supplies_card() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            $mol_app_supplies_card.prototype.supply = function () {
                return null;
            };
            $mol_app_supplies_card.prototype.code = function () {
                return this.supply().id();
            };
            $mol_app_supplies_card.prototype.provider_name = function () {
                return this.supply().provider().name();
            };
            $mol_app_supplies_card.prototype.cost = function () {
                return this.supply().cost();
            };
            $mol_app_supplies_card.prototype.status = function () {
                return String(this.supply().status());
            };
            return $mol_app_supplies_card;
        }($.$mol_app_supplies_card));
        $$.$mol_app_supplies_card = $mol_app_supplies_card;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//card.view.js.map
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
    var $mol_form = (function (_super) {
        __extends($mol_form, _super);
        function $mol_form() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_form.prototype.submit_blocked = function () {
            return false;
        };
        $mol_form.prototype.sub = function () {
            return [].concat(this.Bar_fields(), this.Bar_buttons());
        };
        $mol_form.prototype.Bar_fields = function () {
            var _this = this;
            return (function (obj) {
                obj.sub = function () { return _this.form_fields(); };
                return obj;
            })(new this.$.$mol_view);
        };
        $mol_form.prototype.form_fields = function () {
            return [];
        };
        $mol_form.prototype.Bar_buttons = function () {
            var _this = this;
            return (function (obj) {
                obj.sub = function () { return _this.buttons(); };
                return obj;
            })(new this.$.$mol_row);
        };
        $mol_form.prototype.buttons = function () {
            return [];
        };
        __decorate([
            $.$mol_mem
        ], $mol_form.prototype, "Bar_fields", null);
        __decorate([
            $.$mol_mem
        ], $mol_form.prototype, "Bar_buttons", null);
        return $mol_form;
    }($.$mol_view));
    $.$mol_form = $mol_form;
})($ || ($ = {}));
//form.view.tree.js.map
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
        var $mol_form = (function (_super) {
            __extends($mol_form, _super);
            function $mol_form() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            $mol_form.prototype.submit_blocked = function () {
                return this.form_fields().some(function (field) { return field.errors().length !== 0; });
            };
            __decorate([
                $.$mol_mem
            ], $mol_form.prototype, "submit_blocked", null);
            return $mol_form;
        }($.$mol_form));
        $$.$mol_form = $mol_form;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//form.view.js.map
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
    var $mol_form_field = (function (_super) {
        __extends($mol_form_field, _super);
        function $mol_form_field() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_form_field.prototype.label = function () {
            return [].concat(this.name(), this.Bid());
        };
        $mol_form_field.prototype.name = function () {
            return "";
        };
        $mol_form_field.prototype.Bid = function () {
            var _this = this;
            return (function (obj) {
                obj.sub = function () { return _this.errors(); };
                return obj;
            })(new this.$.$mol_view);
        };
        $mol_form_field.prototype.errors = function () {
            return [];
        };
        $mol_form_field.prototype.Content = function () {
            return this.control();
        };
        $mol_form_field.prototype.control = function () {
            return null;
        };
        __decorate([
            $.$mol_mem
        ], $mol_form_field.prototype, "Bid", null);
        return $mol_form_field;
    }($.$mol_labeler));
    $.$mol_form_field = $mol_form_field;
})($ || ($ = {}));
//field.view.tree.js.map
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
    var $mol_app_supplies_enter = (function (_super) {
        __extends($mol_app_supplies_enter, _super);
        function $mol_app_supplies_enter() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_app_supplies_enter.prototype.entered = function (val, force) {
            return (val !== void 0) ? val : false;
        };
        $mol_app_supplies_enter.prototype.sub = function () {
            return [].concat(this.form());
        };
        $mol_app_supplies_enter.prototype.form = function () {
            var _this = this;
            return (function (obj) {
                obj.form_fields = function () { return [].concat(_this.loginField(), _this.passwordField()); };
                obj.buttons = function () { return [].concat(_this.submit()); };
                return obj;
            })(new this.$.$mol_form);
        };
        $mol_app_supplies_enter.prototype.loginField = function () {
            var _this = this;
            return (function (obj) {
                obj.name = function () { return _this.loginLabel(); };
                obj.errors = function () { return _this.loginErrors(); };
                obj.control = function () { return _this.loginControl(); };
                return obj;
            })(new this.$.$mol_form_field);
        };
        $mol_app_supplies_enter.prototype.loginLabel = function () {
            return $.$mol_locale.text(this.locale_contexts(), "loginLabel");
        };
        $mol_app_supplies_enter.prototype.loginErrors = function () {
            return [];
        };
        $mol_app_supplies_enter.prototype.loginControl = function () {
            var _this = this;
            return (function (obj) {
                obj.value = function (val) { return _this.login(val); };
                return obj;
            })(new this.$.$mol_string);
        };
        $mol_app_supplies_enter.prototype.login = function (val, force) {
            return (val !== void 0) ? val : "";
        };
        $mol_app_supplies_enter.prototype.passwordField = function () {
            var _this = this;
            return (function (obj) {
                obj.name = function () { return _this.passwordLabel(); };
                obj.errors = function () { return _this.passwordErrors(); };
                obj.control = function () { return _this.passControl(); };
                return obj;
            })(new this.$.$mol_form_field);
        };
        $mol_app_supplies_enter.prototype.passwordLabel = function () {
            return $.$mol_locale.text(this.locale_contexts(), "passwordLabel");
        };
        $mol_app_supplies_enter.prototype.passwordErrors = function () {
            return [];
        };
        $mol_app_supplies_enter.prototype.passControl = function () {
            var _this = this;
            return (function (obj) {
                obj.value = function (val) { return _this.password(val); };
                obj.type = function () { return "password"; };
                return obj;
            })(new this.$.$mol_string);
        };
        $mol_app_supplies_enter.prototype.password = function (val, force) {
            return (val !== void 0) ? val : "";
        };
        $mol_app_supplies_enter.prototype.submit = function () {
            var _this = this;
            return (function (obj) {
                obj.sub = function () { return [].concat(_this.submitLabel()); };
                obj.event_click = function (val) { return _this.event_submit(val); };
                obj.disabled = function () { return _this.submit_blocked(); };
                return obj;
            })(new this.$.$mol_button_major);
        };
        $mol_app_supplies_enter.prototype.submitLabel = function () {
            return $.$mol_locale.text(this.locale_contexts(), "submitLabel");
        };
        $mol_app_supplies_enter.prototype.event_submit = function (val, force) {
            return (val !== void 0) ? val : null;
        };
        $mol_app_supplies_enter.prototype.submit_blocked = function () {
            return false;
        };
        __decorate([
            $.$mol_mem
        ], $mol_app_supplies_enter.prototype, "entered", null);
        __decorate([
            $.$mol_mem
        ], $mol_app_supplies_enter.prototype, "form", null);
        __decorate([
            $.$mol_mem
        ], $mol_app_supplies_enter.prototype, "loginField", null);
        __decorate([
            $.$mol_mem
        ], $mol_app_supplies_enter.prototype, "loginControl", null);
        __decorate([
            $.$mol_mem
        ], $mol_app_supplies_enter.prototype, "login", null);
        __decorate([
            $.$mol_mem
        ], $mol_app_supplies_enter.prototype, "passwordField", null);
        __decorate([
            $.$mol_mem
        ], $mol_app_supplies_enter.prototype, "passControl", null);
        __decorate([
            $.$mol_mem
        ], $mol_app_supplies_enter.prototype, "password", null);
        __decorate([
            $.$mol_mem
        ], $mol_app_supplies_enter.prototype, "submit", null);
        __decorate([
            $.$mol_mem
        ], $mol_app_supplies_enter.prototype, "event_submit", null);
        return $mol_app_supplies_enter;
    }($.$mol_view));
    $.$mol_app_supplies_enter = $mol_app_supplies_enter;
})($ || ($ = {}));
//enter.view.tree.js.map
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
        var $mol_app_supplies_enter = (function (_super) {
            __extends($mol_app_supplies_enter, _super);
            function $mol_app_supplies_enter() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            $mol_app_supplies_enter.prototype.event_submit = function () {
                this.entered(true);
            };
            return $mol_app_supplies_enter;
        }($.$mol_app_supplies_enter));
        $$.$mol_app_supplies_enter = $mol_app_supplies_enter;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//enter.view.js.map
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
var cordova;
var $;
(function ($) {
    $.$mol_cordova = cordova || {
        plugins: {
            barcodeScanner: null
        }
    };
    function $mol_cordova_camera() {
        return navigator['camera'];
    }
    $.$mol_cordova_camera = $mol_cordova_camera;
})($ || ($ = {}));
//cordova.js.map
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
    var $mol_code = (function (_super) {
        __extends($mol_code, _super);
        function $mol_code() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_code.prototype.sub = function () {
            return [].concat(this.Manual(), this.Scan());
        };
        $mol_code.prototype.Manual = function () {
            var _this = this;
            return (function (obj) {
                obj.query = function (val) { return _this.value(val); };
                obj.hint = function () { return _this.hint(); };
                obj.debounce = function () { return _this.debounce(); };
                return obj;
            })(new this.$.$mol_search);
        };
        $mol_code.prototype.value = function (val, force) {
            return (val !== void 0) ? val : "";
        };
        $mol_code.prototype.hint = function () {
            return this.format();
        };
        $mol_code.prototype.format = function () {
            return "";
        };
        $mol_code.prototype.debounce = function () {
            return 200;
        };
        $mol_code.prototype.Scan = function () {
            var _this = this;
            return (function (obj) {
                obj.event_click = function (val) { return _this.event_scan(val); };
                obj.sub = function () { return [].concat(_this.scan_label()); };
                return obj;
            })(new this.$.$mol_button);
        };
        $mol_code.prototype.event_scan = function (val, force) {
            return (val !== void 0) ? val : null;
        };
        $mol_code.prototype.scan_label = function () {
            return $.$mol_locale.text(this.locale_contexts(), "scan_label");
        };
        __decorate([
            $.$mol_mem
        ], $mol_code.prototype, "Manual", null);
        __decorate([
            $.$mol_mem
        ], $mol_code.prototype, "value", null);
        __decorate([
            $.$mol_mem
        ], $mol_code.prototype, "Scan", null);
        __decorate([
            $.$mol_mem
        ], $mol_code.prototype, "event_scan", null);
        return $mol_code;
    }($.$mol_view));
    $.$mol_code = $mol_code;
})($ || ($ = {}));
//code.view.tree.js.map
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
        var $mol_code = (function (_super) {
            __extends($mol_code, _super);
            function $mol_code() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            $mol_code.prototype.scan_support = function () {
                return Boolean($.$mol_cordova.plugins.barcodeScanner);
            };
            $mol_code.prototype.Scan = function () {
                return this.scan_support() ? _super.prototype.Scan.call(this) : null;
            };
            $mol_code.prototype.event_scan = function () {
                var _this = this;
                $.$mol_cordova.plugins.barcodeScanner.scan(function (result) {
                    if (result.cancelled)
                        return;
                    _this.value(result.text);
                }, function (error) {
                    alert("Scanning failed: " + error);
                });
            };
            return $mol_code;
        }($.$mol_code));
        $$.$mol_code = $mol_code;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//code.view.js.map
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
    var $mol_app_supplies_list = (function (_super) {
        __extends($mol_app_supplies_list, _super);
        function $mol_app_supplies_list() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_app_supplies_list.prototype.supplies = function () {
            return [];
        };
        $mol_app_supplies_list.prototype.title = function () {
            return $.$mol_locale.text(this.locale_contexts(), "title");
        };
        $mol_app_supplies_list.prototype.head = function () {
            return [].concat(this.Search());
        };
        $mol_app_supplies_list.prototype.Search = function () {
            var _this = this;
            return (function (obj) {
                obj.hint = function () { return _this.search_hint(); };
                obj.value = function (val) { return _this.search_query(val); };
                return obj;
            })(new this.$.$mol_code);
        };
        $mol_app_supplies_list.prototype.search_hint = function () {
            return $.$mol_locale.text(this.locale_contexts(), "search_hint");
        };
        $mol_app_supplies_list.prototype.search_query = function (val, force) {
            return (val !== void 0) ? val : "";
        };
        $mol_app_supplies_list.prototype.body = function () {
            return [].concat(this.Supply_rows());
        };
        $mol_app_supplies_list.prototype.Supply_rows = function () {
            var _this = this;
            return (function (obj) {
                obj.rows = function () { return _this.supply_rows(); };
                return obj;
            })(new this.$.$mol_list);
        };
        $mol_app_supplies_list.prototype.supply_rows = function () {
            return [];
        };
        $mol_app_supplies_list.prototype.Supply_row = function (index) {
            var _this = this;
            return (function (obj) {
                obj.supply = function () { return _this.supply(index); };
                obj.arg = function () { return _this.supply_arg(index); };
                return obj;
            })(new this.$.$mol_app_supplies_card);
        };
        $mol_app_supplies_list.prototype.supply = function (index) {
            return null;
        };
        $mol_app_supplies_list.prototype.supply_arg = function (index) {
            return ({
                "supply": this.supply_id(index),
            });
        };
        $mol_app_supplies_list.prototype.supply_id = function (index) {
            return "";
        };
        __decorate([
            $.$mol_mem
        ], $mol_app_supplies_list.prototype, "Search", null);
        __decorate([
            $.$mol_mem
        ], $mol_app_supplies_list.prototype, "search_query", null);
        __decorate([
            $.$mol_mem
        ], $mol_app_supplies_list.prototype, "Supply_rows", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_app_supplies_list.prototype, "Supply_row", null);
        return $mol_app_supplies_list;
    }($.$mol_page));
    $.$mol_app_supplies_list = $mol_app_supplies_list;
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
        var $mol_app_supplies_list = (function (_super) {
            __extends($mol_app_supplies_list, _super);
            function $mol_app_supplies_list() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            $mol_app_supplies_list.prototype.supply_rows = function () {
                var _this = this;
                return this.supplies().map(function (supply, index) { return _this.Supply_row(index); });
            };
            $mol_app_supplies_list.prototype.supply = function (index) {
                return this.supplies()[index];
            };
            $mol_app_supplies_list.prototype.supply_id = function (index) {
                return this.supplies()[index].id();
            };
            __decorate([
                $.$mol_mem
            ], $mol_app_supplies_list.prototype, "supply_rows", null);
            return $mol_app_supplies_list;
        }($.$mol_app_supplies_list));
        $$.$mol_app_supplies_list = $mol_app_supplies_list;
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_switch = (function (_super) {
        __extends($mol_switch, _super);
        function $mol_switch() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_switch.prototype.minimal_height = function () {
            return 40;
        };
        $mol_switch.prototype.Option = function (id) {
            var _this = this;
            return (function (obj) {
                obj.checked = function (val) { return _this.option_checked(id, val); };
                obj.title = function () { return _this.option_title(id); };
                obj.enabled = function () { return _this.option_enabled(id); };
                return obj;
            })(new this.$.$mol_check);
        };
        $mol_switch.prototype.option_checked = function (id, val, force) {
            return (val !== void 0) ? val : false;
        };
        $mol_switch.prototype.option_title = function (id) {
            return "";
        };
        $mol_switch.prototype.option_enabled = function (id) {
            return this.enabled();
        };
        $mol_switch.prototype.enabled = function () {
            return true;
        };
        $mol_switch.prototype.value = function (val, force) {
            return (val !== void 0) ? val : null;
        };
        $mol_switch.prototype.options = function () {
            return ({});
        };
        $mol_switch.prototype.sub = function () {
            return this.items();
        };
        $mol_switch.prototype.items = function () {
            return [];
        };
        __decorate([
            $.$mol_mem_key
        ], $mol_switch.prototype, "Option", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_switch.prototype, "option_checked", null);
        __decorate([
            $.$mol_mem
        ], $mol_switch.prototype, "value", null);
        return $mol_switch;
    }($.$mol_view));
    $.$mol_switch = $mol_switch;
})($ || ($ = {}));
//switch.view.tree.js.map
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
        var $mol_switch = (function (_super) {
            __extends($mol_switch, _super);
            function $mol_switch() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            $mol_switch.prototype.value = function (next) {
                return $.$mol_state_session.value(this + ".value()", next);
            };
            $mol_switch.prototype.options = function () {
                return {};
            };
            $mol_switch.prototype.items = function () {
                var _this = this;
                return Object.keys(this.options()).map(function (key) { return _this.Option(key); });
            };
            $mol_switch.prototype.option_title = function (key) {
                return this.options()[key];
            };
            $mol_switch.prototype.option_checked = function (key, next) {
                if (next === void 0)
                    return this.value() === key;
                this.value(next ? key : null);
            };
            __decorate([
                $.$mol_mem
            ], $mol_switch.prototype, "items", null);
            return $mol_switch;
        }($.$mol_switch));
        $$.$mol_switch = $mol_switch;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//switch.view.js.map
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
    var $mol_deck = (function (_super) {
        __extends($mol_deck, _super);
        function $mol_deck() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_deck.prototype.items = function () {
            return [].concat(({
                "title": "",
                "Content": (function (obj) {
                    return obj;
                })(new this.$.$mol_view),
            }));
        };
        $mol_deck.prototype.rows = function () {
            return [].concat(this.Switch(), this.Content());
        };
        $mol_deck.prototype.Switch = function () {
            var _this = this;
            return (function (obj) {
                obj.value = function (val) { return _this.current(val); };
                obj.options = function () { return _this.switch_options(); };
                return obj;
            })(new this.$.$mol_switch);
        };
        $mol_deck.prototype.current = function (val, force) {
            return (val !== void 0) ? val : "0";
        };
        $mol_deck.prototype.switch_options = function () {
            return ({});
        };
        $mol_deck.prototype.Content = function () {
            return null;
        };
        __decorate([
            $.$mol_mem
        ], $mol_deck.prototype, "items", null);
        __decorate([
            $.$mol_mem
        ], $mol_deck.prototype, "Switch", null);
        __decorate([
            $.$mol_mem
        ], $mol_deck.prototype, "current", null);
        return $mol_deck;
    }($.$mol_list));
    $.$mol_deck = $mol_deck;
})($ || ($ = {}));
//deck.view.tree.js.map
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
        var $mol_deck = (function (_super) {
            __extends($mol_deck, _super);
            function $mol_deck() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            $mol_deck.prototype.current = function (next) {
                return $.$mol_state_session.value(this + ".current()", next) || '0';
            };
            $mol_deck.prototype.switch_options = function () {
                var options = {};
                this.items().forEach(function (item, index) {
                    options[String(index)] = item.title;
                });
                return options;
            };
            $mol_deck.prototype.Content = function () {
                return this.items()[this.current()].Content;
            };
            __decorate([
                $.$mol_mem
            ], $mol_deck.prototype, "Content", null);
            return $mol_deck;
        }($.$mol_deck));
        $$.$mol_deck = $mol_deck;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//deck.view.js.map
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
    var $mol_section = (function (_super) {
        __extends($mol_section, _super);
        function $mol_section() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_section.prototype.rows = function () {
            return [].concat(this.Head(), this.Content());
        };
        $mol_section.prototype.Head = function () {
            var _this = this;
            return (function (obj) {
                obj.sub = function () { return [].concat(_this.head()); };
                return obj;
            })(new this.$.$mol_view);
        };
        $mol_section.prototype.head = function () {
            return null;
        };
        $mol_section.prototype.Content = function () {
            return null;
        };
        __decorate([
            $.$mol_mem
        ], $mol_section.prototype, "Head", null);
        return $mol_section;
    }($.$mol_list));
    $.$mol_section = $mol_section;
})($ || ($ = {}));
//section.view.tree.js.map
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
    var $mol_tiler = (function (_super) {
        __extends($mol_tiler, _super);
        function $mol_tiler() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_tiler.prototype.sub = function () {
            return [].concat(this.items());
        };
        $mol_tiler.prototype.items = function () {
            return [];
        };
        return $mol_tiler;
    }($.$mol_view));
    $.$mol_tiler = $mol_tiler;
})($ || ($ = {}));
//tiler.view.tree.js.map
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
        var $mol_tiler = (function (_super) {
            __extends($mol_tiler, _super);
            function $mol_tiler() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            $mol_tiler.prototype.sub = function () {
                return this.groupChilds([]);
            };
            $mol_tiler.prototype.groupItems = function (path) {
                var items = (path.length === 0)
                    ? this.items()
                    : this.groupItems(path.slice(0, path.length - 1));
                if (items.length < 2)
                    return items;
                if (path.length != 0) {
                    var cut = Math.floor(items.length / 2);
                    items = path[path.length - 1]
                        ? items.slice(cut)
                        : items.slice(0, cut);
                }
                return items;
            };
            $mol_tiler.prototype.groupChilds = function (path) {
                var _this = this;
                var items = this.groupItems(path);
                if (items.length <= 2)
                    return items.map(function (_, index) { return _this.item(path.concat(index)); });
                return [
                    this.child(path.concat(0)),
                    this.child(path.concat(1)),
                ];
            };
            $mol_tiler.prototype.child = function (path) {
                return (this.groupItems(path).length > 1)
                    ? this.group(path)
                    : this.item(path);
            };
            $mol_tiler.prototype.group = function (path) {
                var _this = this;
                return $.$mol_view.make({
                    sub: function () { return _this.groupChilds(path); }
                });
            };
            $mol_tiler.prototype.item = function (path) {
                var _this = this;
                return $.$mol_view.make({
                    sub: function () { return _this.groupItems(path); }
                });
            };
            __decorate([
                $.$mol_mem
            ], $mol_tiler.prototype, "sub", null);
            __decorate([
                $.$mol_mem_key
            ], $mol_tiler.prototype, "groupItems", null);
            __decorate([
                $.$mol_mem_key
            ], $mol_tiler.prototype, "groupChilds", null);
            __decorate([
                $.$mol_mem_key
            ], $mol_tiler.prototype, "child", null);
            __decorate([
                $.$mol_mem_key
            ], $mol_tiler.prototype, "group", null);
            __decorate([
                $.$mol_mem_key
            ], $mol_tiler.prototype, "item", null);
            return $mol_tiler;
        }($.$mol_tiler));
        $$.$mol_tiler = $mol_tiler;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//tiler.view.js.map
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
    var $mol_icon_attach = (function (_super) {
        __extends($mol_icon_attach, _super);
        function $mol_icon_attach() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_icon_attach.prototype.path = function () {
            return "M16.5 6v11.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5v10.5c0 .55-.45 1-1 1s-1-.45-1-1V6H10v9.5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V5c0-2.21-1.79-4-4-4S7 2.79 7 5v12.5c0 3.04 2.46 5.5 5.5 5.5s5.5-2.46 5.5-5.5V6h-1.5z";
        };
        return $mol_icon_attach;
    }($.$mol_icon));
    $.$mol_icon_attach = $mol_icon_attach;
})($ || ($ = {}));
//attach.view.tree.js.map
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
    var $mol_attach = (function (_super) {
        __extends($mol_attach, _super);
        function $mol_attach() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_attach.prototype.Content = function () {
            var _this = this;
            return (function (obj) {
                obj.items = function () { return _this.content(); };
                return obj;
            })(new this.$.$mol_tiler);
        };
        $mol_attach.prototype.content = function () {
            return [].concat(this.items(), this.Add());
        };
        $mol_attach.prototype.items = function (val, force) {
            return (val !== void 0) ? val : [];
        };
        $mol_attach.prototype.Add = function () {
            var _this = this;
            return (function (obj) {
                obj.file_new = function (val) { return _this.attach_new(val); };
                return obj;
            })(new this.$.$mol_attach_add);
        };
        $mol_attach.prototype.attach_new = function (val, force) {
            return (val !== void 0) ? val : "";
        };
        $mol_attach.prototype.Item = function (id) {
            var _this = this;
            return (function (obj) {
                obj.title = function () { return _this.attach_title(); };
                return obj;
            })(new this.$.$mol_attach_item);
        };
        $mol_attach.prototype.attach_title = function () {
            return "";
        };
        __decorate([
            $.$mol_mem
        ], $mol_attach.prototype, "Content", null);
        __decorate([
            $.$mol_mem
        ], $mol_attach.prototype, "items", null);
        __decorate([
            $.$mol_mem
        ], $mol_attach.prototype, "Add", null);
        __decorate([
            $.$mol_mem
        ], $mol_attach.prototype, "attach_new", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_attach.prototype, "Item", null);
        return $mol_attach;
    }($.$mol_card));
    $.$mol_attach = $mol_attach;
})($ || ($ = {}));
(function ($) {
    var $mol_attach_item = (function (_super) {
        __extends($mol_attach_item, _super);
        function $mol_attach_item() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_attach_item.prototype.url_thumb = function (val, force) {
            return (val !== void 0) ? val : "";
        };
        $mol_attach_item.prototype.uri = function (val, force) {
            return this.url_load(val);
        };
        $mol_attach_item.prototype.url_load = function (val, force) {
            return (val !== void 0) ? val : "";
        };
        $mol_attach_item.prototype.style = function () {
            return (__assign({}, _super.prototype.style.call(this), { "backgroundImage": this.style_bg() }));
        };
        $mol_attach_item.prototype.style_bg = function () {
            return "";
        };
        $mol_attach_item.prototype.attr = function () {
            return (__assign({}, _super.prototype.attr.call(this), { "download": this.title() }));
        };
        $mol_attach_item.prototype.title = function () {
            return "";
        };
        __decorate([
            $.$mol_mem
        ], $mol_attach_item.prototype, "url_thumb", null);
        __decorate([
            $.$mol_mem
        ], $mol_attach_item.prototype, "uri", null);
        __decorate([
            $.$mol_mem
        ], $mol_attach_item.prototype, "url_load", null);
        return $mol_attach_item;
    }($.$mol_link));
    $.$mol_attach_item = $mol_attach_item;
})($ || ($ = {}));
(function ($) {
    var $mol_attach_add = (function (_super) {
        __extends($mol_attach_add, _super);
        function $mol_attach_add() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_attach_add.prototype.minimal_height = function () {
            return 60;
        };
        $mol_attach_add.prototype.file_new = function (val, force) {
            return (val !== void 0) ? val : "";
        };
        $mol_attach_add.prototype.sub = function () {
            return [].concat(this.Icon(), this.Input());
        };
        $mol_attach_add.prototype.Icon = function () {
            return (function (obj) {
                return obj;
            })(new this.$.$mol_icon_attach);
        };
        $mol_attach_add.prototype.Input = function () {
            var _this = this;
            return (function (obj) {
                obj.event_capture = function (val) { return _this.event_capture(val); };
                obj.event_picked = function (val) { return _this.event_picked(val); };
                return obj;
            })(new this.$.$mol_attach_add_input);
        };
        $mol_attach_add.prototype.event_capture = function (val, force) {
            return (val !== void 0) ? val : null;
        };
        $mol_attach_add.prototype.event_picked = function (val, force) {
            return (val !== void 0) ? val : null;
        };
        __decorate([
            $.$mol_mem
        ], $mol_attach_add.prototype, "file_new", null);
        __decorate([
            $.$mol_mem
        ], $mol_attach_add.prototype, "Icon", null);
        __decorate([
            $.$mol_mem
        ], $mol_attach_add.prototype, "Input", null);
        __decorate([
            $.$mol_mem
        ], $mol_attach_add.prototype, "event_capture", null);
        __decorate([
            $.$mol_mem
        ], $mol_attach_add.prototype, "event_picked", null);
        return $mol_attach_add;
    }($.$mol_button_minor));
    $.$mol_attach_add = $mol_attach_add;
})($ || ($ = {}));
(function ($) {
    var $mol_attach_add_input = (function (_super) {
        __extends($mol_attach_add_input, _super);
        function $mol_attach_add_input() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_attach_add_input.prototype.dom_name = function () {
            return "input";
        };
        $mol_attach_add_input.prototype.attr = function () {
            return (__assign({}, _super.prototype.attr.call(this), { "type": this.type(), "accept": this.accept(), "multiple": this.multiple() }));
        };
        $mol_attach_add_input.prototype.type = function () {
            return "file";
        };
        $mol_attach_add_input.prototype.accept = function () {
            return "image/*;capture=camera";
        };
        $mol_attach_add_input.prototype.multiple = function () {
            return true;
        };
        $mol_attach_add_input.prototype.event_click = function (val, force) {
            return this.event_capture(val);
        };
        $mol_attach_add_input.prototype.event_capture = function (val, force) {
            return (val !== void 0) ? val : null;
        };
        $mol_attach_add_input.prototype.event = function () {
            var _this = this;
            return (__assign({}, _super.prototype.event.call(this), { "change": function (val) { return _this.event_picked(val); } }));
        };
        $mol_attach_add_input.prototype.event_picked = function (val, force) {
            return (val !== void 0) ? val : null;
        };
        __decorate([
            $.$mol_mem
        ], $mol_attach_add_input.prototype, "event_click", null);
        __decorate([
            $.$mol_mem
        ], $mol_attach_add_input.prototype, "event_capture", null);
        __decorate([
            $.$mol_mem
        ], $mol_attach_add_input.prototype, "event_picked", null);
        return $mol_attach_add_input;
    }($.$mol_view));
    $.$mol_attach_add_input = $mol_attach_add_input;
})($ || ($ = {}));
//attach.view.tree.js.map
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
        var $mol_attach = (function (_super) {
            __extends($mol_attach, _super);
            function $mol_attach() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            $mol_attach.prototype.attach_new = function (next) {
                var items = this.items();
                var item = this.Item(items.length);
                item.url_thumb(next);
                item.url_load(next);
                this.items(items.concat(item));
                return void 0;
            };
            return $mol_attach;
        }($.$mol_attach));
        $$.$mol_attach = $mol_attach;
        var $mol_attach_item = (function (_super) {
            __extends($mol_attach_item, _super);
            function $mol_attach_item() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            $mol_attach_item.prototype.style_bg = function () {
                return "url(\"" + this.url_thumb() + "\")";
            };
            return $mol_attach_item;
        }($.$mol_attach_item));
        $$.$mol_attach_item = $mol_attach_item;
        var $mol_attach_add = (function (_super) {
            __extends($mol_attach_add, _super);
            function $mol_attach_add() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            $mol_attach_add.prototype.file_new = function (next) {
                return next;
            };
            $mol_attach_add.prototype.event_capture = function (next) {
                var _this = this;
                if (!$.$mol_cordova_camera())
                    return;
                next.preventDefault();
                $.$mol_cordova_camera().getPicture(function (url) {
                    _this.file_new(url);
                }, function (error) {
                    _this.file_new(error);
                }, {
                    quality: 50
                });
            };
            $mol_attach_add.prototype.event_picked = function (next) {
                var files = [].slice.call(next.target.files);
                for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
                    var file = files_1[_i];
                    this.file_new(URL.createObjectURL(file));
                }
            };
            return $mol_attach_add;
        }($.$mol_attach_add));
        $$.$mol_attach_add = $mol_attach_add;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//attach.view.js.map
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_app_supplies_position = (function (_super) {
        __extends($mol_app_supplies_position, _super);
        function $mol_app_supplies_position() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_app_supplies_position.prototype.minimal_height = function () {
            return 70;
        };
        $mol_app_supplies_position.prototype.position = function () {
            return (function (obj) {
                return obj;
            })(new this.$.$mol_app_supplies_domain_supply_position);
        };
        $mol_app_supplies_position.prototype.Content = function () {
            return this.Row();
        };
        $mol_app_supplies_position.prototype.Row = function () {
            var _this = this;
            return (function (obj) {
                obj.sub = function () { return [].concat(_this.Main_group(), _this.Addon_group(), _this.Supply_group()); };
                return obj;
            })(new this.$.$mol_view);
        };
        $mol_app_supplies_position.prototype.Main_group = function () {
            var _this = this;
            return (function (obj) {
                obj.sub = function () { return [].concat(_this.Product_item(), _this.Cost_item()); };
                return obj;
            })(new this.$.$mol_row);
        };
        $mol_app_supplies_position.prototype.Product_item = function () {
            var _this = this;
            return (function (obj) {
                obj.title = function () { return _this.product_title(); };
                obj.content = function () { return _this.product_name(); };
                return obj;
            })(new this.$.$mol_labeler);
        };
        $mol_app_supplies_position.prototype.product_title = function () {
            return $.$mol_locale.text(this.locale_contexts(), "product_title");
        };
        $mol_app_supplies_position.prototype.product_name = function () {
            return "";
        };
        $mol_app_supplies_position.prototype.Cost_item = function () {
            var _this = this;
            return (function (obj) {
                obj.title = function () { return _this.cost_title(); };
                obj.content = function () { return _this.Cost(); };
                return obj;
            })(new this.$.$mol_labeler);
        };
        $mol_app_supplies_position.prototype.cost_title = function () {
            return $.$mol_locale.text(this.locale_contexts(), "cost_title");
        };
        $mol_app_supplies_position.prototype.Cost = function () {
            var _this = this;
            return (function (obj) {
                obj.value = function () { return _this.cost(); };
                return obj;
            })(new this.$.$mol_cost);
        };
        $mol_app_supplies_position.prototype.cost = function () {
            return (function (obj) {
                obj.valueOf = function () { return 0; };
                return obj;
            })(new this.$.$mol_unit_money);
        };
        $mol_app_supplies_position.prototype.Addon_group = function () {
            var _this = this;
            return (function (obj) {
                obj.sub = function () { return [].concat(_this.Division_item(), _this.Price_item()); };
                return obj;
            })(new this.$.$mol_row);
        };
        $mol_app_supplies_position.prototype.Division_item = function () {
            var _this = this;
            return (function (obj) {
                obj.title = function () { return _this.division_title(); };
                obj.content = function () { return _this.division_name(); };
                return obj;
            })(new this.$.$mol_labeler);
        };
        $mol_app_supplies_position.prototype.division_title = function () {
            return $.$mol_locale.text(this.locale_contexts(), "division_title");
        };
        $mol_app_supplies_position.prototype.division_name = function () {
            return "";
        };
        $mol_app_supplies_position.prototype.Price_item = function () {
            var _this = this;
            return (function (obj) {
                obj.title = function () { return _this.price_label(); };
                obj.content = function () { return _this.Price(); };
                return obj;
            })(new this.$.$mol_labeler);
        };
        $mol_app_supplies_position.prototype.price_label = function () {
            return $.$mol_locale.text(this.locale_contexts(), "price_label");
        };
        $mol_app_supplies_position.prototype.Price = function () {
            var _this = this;
            return (function (obj) {
                obj.value = function () { return _this.price(); };
                return obj;
            })(new this.$.$mol_cost);
        };
        $mol_app_supplies_position.prototype.price = function () {
            return (function (obj) {
                obj.valueOf = function () { return 0; };
                return obj;
            })(new this.$.$mol_unit_money);
        };
        $mol_app_supplies_position.prototype.Supply_group = function () {
            var _this = this;
            return (function (obj) {
                obj.sub = function () { return [].concat(_this.Quantity_item(), _this.Supply_date_item(), _this.Store_item()); };
                return obj;
            })(new this.$.$mol_row);
        };
        $mol_app_supplies_position.prototype.Quantity_item = function () {
            var _this = this;
            return (function (obj) {
                obj.title = function () { return _this.quantity_title(); };
                obj.content = function () { return _this.quantity(); };
                return obj;
            })(new this.$.$mol_labeler);
        };
        $mol_app_supplies_position.prototype.quantity_title = function () {
            return $.$mol_locale.text(this.locale_contexts(), "quantity_title");
        };
        $mol_app_supplies_position.prototype.quantity = function () {
            return "";
        };
        $mol_app_supplies_position.prototype.Supply_date_item = function () {
            var _this = this;
            return (function (obj) {
                obj.title = function () { return _this.supply_date_title(); };
                obj.content = function () { return _this.supply_date(); };
                return obj;
            })(new this.$.$mol_labeler);
        };
        $mol_app_supplies_position.prototype.supply_date_title = function () {
            return $.$mol_locale.text(this.locale_contexts(), "supply_date_title");
        };
        $mol_app_supplies_position.prototype.supply_date = function () {
            return "";
        };
        $mol_app_supplies_position.prototype.Store_item = function () {
            var _this = this;
            return (function (obj) {
                obj.title = function () { return _this.store_title(); };
                obj.content = function () { return _this.store_name(); };
                return obj;
            })(new this.$.$mol_labeler);
        };
        $mol_app_supplies_position.prototype.store_title = function () {
            return $.$mol_locale.text(this.locale_contexts(), "store_title");
        };
        $mol_app_supplies_position.prototype.store_name = function () {
            return "";
        };
        __decorate([
            $.$mol_mem
        ], $mol_app_supplies_position.prototype, "position", null);
        __decorate([
            $.$mol_mem
        ], $mol_app_supplies_position.prototype, "Row", null);
        __decorate([
            $.$mol_mem
        ], $mol_app_supplies_position.prototype, "Main_group", null);
        __decorate([
            $.$mol_mem
        ], $mol_app_supplies_position.prototype, "Product_item", null);
        __decorate([
            $.$mol_mem
        ], $mol_app_supplies_position.prototype, "Cost_item", null);
        __decorate([
            $.$mol_mem
        ], $mol_app_supplies_position.prototype, "Cost", null);
        __decorate([
            $.$mol_mem
        ], $mol_app_supplies_position.prototype, "cost", null);
        __decorate([
            $.$mol_mem
        ], $mol_app_supplies_position.prototype, "Addon_group", null);
        __decorate([
            $.$mol_mem
        ], $mol_app_supplies_position.prototype, "Division_item", null);
        __decorate([
            $.$mol_mem
        ], $mol_app_supplies_position.prototype, "Price_item", null);
        __decorate([
            $.$mol_mem
        ], $mol_app_supplies_position.prototype, "Price", null);
        __decorate([
            $.$mol_mem
        ], $mol_app_supplies_position.prototype, "price", null);
        __decorate([
            $.$mol_mem
        ], $mol_app_supplies_position.prototype, "Supply_group", null);
        __decorate([
            $.$mol_mem
        ], $mol_app_supplies_position.prototype, "Quantity_item", null);
        __decorate([
            $.$mol_mem
        ], $mol_app_supplies_position.prototype, "Supply_date_item", null);
        __decorate([
            $.$mol_mem
        ], $mol_app_supplies_position.prototype, "Store_item", null);
        return $mol_app_supplies_position;
    }($.$mol_card));
    $.$mol_app_supplies_position = $mol_app_supplies_position;
})($ || ($ = {}));
//position.view.tree.js.map
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
        var $mol_app_supplies_position = (function (_super) {
            __extends($mol_app_supplies_position, _super);
            function $mol_app_supplies_position() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            $mol_app_supplies_position.prototype.product_name = function () {
                return this.position().name();
            };
            $mol_app_supplies_position.prototype.price = function () {
                return this.position().price();
            };
            $mol_app_supplies_position.prototype.quantity = function () {
                return this.position().quantity().toString();
            };
            $mol_app_supplies_position.prototype.cost = function () {
                return this.position().cost();
            };
            $mol_app_supplies_position.prototype.supply_date = function () {
                return this.position().supply_moment().toString('YYYY-MM-DD');
            };
            $mol_app_supplies_position.prototype.division_name = function () {
                return this.position().division().name();
            };
            $mol_app_supplies_position.prototype.store_name = function () {
                return this.position().store().name();
            };
            return $mol_app_supplies_position;
        }($.$mol_app_supplies_position));
        $$.$mol_app_supplies_position = $mol_app_supplies_position;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//position.view.js.map
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
    var $mol_app_supplies_detail = (function (_super) {
        __extends($mol_app_supplies_detail, _super);
        function $mol_app_supplies_detail() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_app_supplies_detail.prototype.supply = function () {
            return null;
        };
        $mol_app_supplies_detail.prototype.title = function () {
            return $.$mol_locale.text(this.locale_contexts(), "title");
        };
        $mol_app_supplies_detail.prototype.tools = function () {
            return [].concat(this.Close());
        };
        $mol_app_supplies_detail.prototype.Close = function () {
            var _this = this;
            return (function (obj) {
                obj.sub = function () { return [].concat(_this.Close_icon()); };
                obj.arg = function () { return _this.close_arg(); };
                return obj;
            })(new this.$.$mol_link);
        };
        $mol_app_supplies_detail.prototype.Close_icon = function () {
            return (function (obj) {
                return obj;
            })(new this.$.$mol_icon_cross);
        };
        $mol_app_supplies_detail.prototype.close_arg = function () {
            return ({
                "supply": null,
            });
        };
        $mol_app_supplies_detail.prototype.body = function () {
            return [].concat(this.Content());
        };
        $mol_app_supplies_detail.prototype.Content = function () {
            var _this = this;
            return (function (obj) {
                obj.rows = function () { return [].concat(_this.Descr_card(), _this.Attach_section(), _this.Positions_section()); };
                return obj;
            })(new this.$.$mol_list);
        };
        $mol_app_supplies_detail.prototype.Descr_card = function () {
            var _this = this;
            return (function (obj) {
                obj.Content = function () { return _this.Descr_deck(); };
                return obj;
            })(new this.$.$mol_card);
        };
        $mol_app_supplies_detail.prototype.Descr_deck = function () {
            var _this = this;
            return (function (obj) {
                obj.items = function () { return [].concat(_this.Org(), _this.Cons()); };
                return obj;
            })(new this.$.$mol_deck);
        };
        $mol_app_supplies_detail.prototype.Org = function () {
            return ({
                "title": this.org_title(),
                "Content": this.Org_content(),
            });
        };
        $mol_app_supplies_detail.prototype.org_title = function () {
            return $.$mol_locale.text(this.locale_contexts(), "org_title");
        };
        $mol_app_supplies_detail.prototype.Org_content = function () {
            var _this = this;
            return (function (obj) {
                obj.sub = function () { return _this.org_items(); };
                return obj;
            })(new this.$.$mol_row);
        };
        $mol_app_supplies_detail.prototype.org_items = function () {
            return [].concat(this.Provider(), this.Consumer(), this.Supply_group(), this.Ballance_unit_item());
        };
        $mol_app_supplies_detail.prototype.Provider = function () {
            var _this = this;
            return (function (obj) {
                obj.title = function () { return _this.provider_title(); };
                obj.content = function () { return _this.provider_name(); };
                return obj;
            })(new this.$.$mol_labeler);
        };
        $mol_app_supplies_detail.prototype.provider_title = function () {
            return $.$mol_locale.text(this.locale_contexts(), "provider_title");
        };
        $mol_app_supplies_detail.prototype.provider_name = function () {
            return "";
        };
        $mol_app_supplies_detail.prototype.Consumer = function () {
            var _this = this;
            return (function (obj) {
                obj.title = function () { return _this.customer_label(); };
                obj.content = function () { return _this.consumer_name(); };
                return obj;
            })(new this.$.$mol_labeler);
        };
        $mol_app_supplies_detail.prototype.customer_label = function () {
            return $.$mol_locale.text(this.locale_contexts(), "customer_label");
        };
        $mol_app_supplies_detail.prototype.consumer_name = function () {
            return "";
        };
        $mol_app_supplies_detail.prototype.Supply_group = function () {
            var _this = this;
            return (function (obj) {
                obj.title = function () { return _this.supply_group_title(); };
                obj.content = function () { return _this.supply_group_name(); };
                return obj;
            })(new this.$.$mol_labeler);
        };
        $mol_app_supplies_detail.prototype.supply_group_title = function () {
            return $.$mol_locale.text(this.locale_contexts(), "supply_group_title");
        };
        $mol_app_supplies_detail.prototype.supply_group_name = function () {
            return "";
        };
        $mol_app_supplies_detail.prototype.Ballance_unit_item = function () {
            var _this = this;
            return (function (obj) {
                obj.title = function () { return _this.ballance_unit_title(); };
                obj.content = function () { return _this.ballance_unit_name(); };
                return obj;
            })(new this.$.$mol_labeler);
        };
        $mol_app_supplies_detail.prototype.ballance_unit_title = function () {
            return $.$mol_locale.text(this.locale_contexts(), "ballance_unit_title");
        };
        $mol_app_supplies_detail.prototype.ballance_unit_name = function () {
            return "";
        };
        $mol_app_supplies_detail.prototype.Cons = function () {
            return ({
                "title": this.cons_title(),
                "Content": this.Cons_content(),
            });
        };
        $mol_app_supplies_detail.prototype.cons_title = function () {
            return $.$mol_locale.text(this.locale_contexts(), "cons_title");
        };
        $mol_app_supplies_detail.prototype.Cons_content = function () {
            var _this = this;
            return (function (obj) {
                obj.sub = function () { return _this.cons_items(); };
                return obj;
            })(new this.$.$mol_row);
        };
        $mol_app_supplies_detail.prototype.cons_items = function () {
            return [].concat(this.Contract(), this.Pay_method(), this.Manager(), this.Debitor());
        };
        $mol_app_supplies_detail.prototype.Contract = function () {
            var _this = this;
            return (function (obj) {
                obj.title = function () { return _this.contract_title(); };
                obj.content = function () { return _this.contract_id(); };
                return obj;
            })(new this.$.$mol_labeler);
        };
        $mol_app_supplies_detail.prototype.contract_title = function () {
            return $.$mol_locale.text(this.locale_contexts(), "contract_title");
        };
        $mol_app_supplies_detail.prototype.contract_id = function () {
            return "";
        };
        $mol_app_supplies_detail.prototype.Pay_method = function () {
            var _this = this;
            return (function (obj) {
                obj.title = function () { return _this.pay_method_title(); };
                obj.content = function () { return _this.pay_method_name(); };
                return obj;
            })(new this.$.$mol_labeler);
        };
        $mol_app_supplies_detail.prototype.pay_method_title = function () {
            return $.$mol_locale.text(this.locale_contexts(), "pay_method_title");
        };
        $mol_app_supplies_detail.prototype.pay_method_name = function () {
            return "";
        };
        $mol_app_supplies_detail.prototype.Manager = function () {
            var _this = this;
            return (function (obj) {
                obj.title = function () { return _this.manager_title(); };
                obj.content = function () { return _this.manager_name(); };
                return obj;
            })(new this.$.$mol_labeler);
        };
        $mol_app_supplies_detail.prototype.manager_title = function () {
            return $.$mol_locale.text(this.locale_contexts(), "manager_title");
        };
        $mol_app_supplies_detail.prototype.manager_name = function () {
            return "";
        };
        $mol_app_supplies_detail.prototype.Debitor = function () {
            var _this = this;
            return (function (obj) {
                obj.title = function () { return _this.debitod_title(); };
                obj.content = function () { return _this.debitor_name(); };
                return obj;
            })(new this.$.$mol_labeler);
        };
        $mol_app_supplies_detail.prototype.debitod_title = function () {
            return $.$mol_locale.text(this.locale_contexts(), "debitod_title");
        };
        $mol_app_supplies_detail.prototype.debitor_name = function () {
            return "";
        };
        $mol_app_supplies_detail.prototype.Attach_section = function () {
            var _this = this;
            return (function (obj) {
                obj.head = function () { return _this.attach_title(); };
                obj.Content = function () { return _this.Attach(); };
                return obj;
            })(new this.$.$mol_section);
        };
        $mol_app_supplies_detail.prototype.attach_title = function () {
            return $.$mol_locale.text(this.locale_contexts(), "attach_title");
        };
        $mol_app_supplies_detail.prototype.Attach = function () {
            var _this = this;
            return (function (obj) {
                obj.items = function () { return _this.attachments(); };
                obj.attach_new = function (val) { return _this.attach_new(val); };
                return obj;
            })(new this.$.$mol_attach);
        };
        $mol_app_supplies_detail.prototype.attachments = function () {
            return [];
        };
        $mol_app_supplies_detail.prototype.attach_new = function (val, force) {
            return (val !== void 0) ? val : null;
        };
        $mol_app_supplies_detail.prototype.Positions_section = function () {
            var _this = this;
            return (function (obj) {
                obj.head = function () { return _this.positions_head(); };
                obj.Content = function () { return _this.Positions(); };
                return obj;
            })(new this.$.$mol_section);
        };
        $mol_app_supplies_detail.prototype.positions_head = function () {
            return [].concat(this.positions_title(), this.Cost());
        };
        $mol_app_supplies_detail.prototype.positions_title = function () {
            return $.$mol_locale.text(this.locale_contexts(), "positions_title");
        };
        $mol_app_supplies_detail.prototype.Cost = function () {
            var _this = this;
            return (function (obj) {
                obj.title = function () { return _this.cost_title(); };
                obj.content = function () { return _this.Cost_value(); };
                return obj;
            })(new this.$.$mol_labeler);
        };
        $mol_app_supplies_detail.prototype.cost_title = function () {
            return $.$mol_locale.text(this.locale_contexts(), "cost_title");
        };
        $mol_app_supplies_detail.prototype.Cost_value = function () {
            var _this = this;
            return (function (obj) {
                obj.value = function () { return _this.cost(); };
                return obj;
            })(new this.$.$mol_cost);
        };
        $mol_app_supplies_detail.prototype.cost = function () {
            return (function (obj) {
                obj.valueOf = function () { return 0; };
                return obj;
            })(new this.$.$mol_unit_money);
        };
        $mol_app_supplies_detail.prototype.Positions = function () {
            var _this = this;
            return (function (obj) {
                obj.rows = function () { return _this.positions(); };
                return obj;
            })(new this.$.$mol_list);
        };
        $mol_app_supplies_detail.prototype.positions = function () {
            return [];
        };
        $mol_app_supplies_detail.prototype.foot = function () {
            return [].concat(this.Actions());
        };
        $mol_app_supplies_detail.prototype.Actions = function () {
            var _this = this;
            return (function (obj) {
                obj.sub = function () { return _this.actions(); };
                return obj;
            })(new this.$.$mol_row);
        };
        $mol_app_supplies_detail.prototype.actions = function () {
            return [].concat(this.Approve());
        };
        $mol_app_supplies_detail.prototype.Approve = function () {
            var _this = this;
            return (function (obj) {
                obj.checked = function (val) { return _this.approved(val); };
                obj.title = function () { return _this.approved_title(); };
                return obj;
            })(new this.$.$mol_check_box);
        };
        $mol_app_supplies_detail.prototype.approved = function (val, force) {
            return (val !== void 0) ? val : false;
        };
        $mol_app_supplies_detail.prototype.approved_title = function () {
            return $.$mol_locale.text(this.locale_contexts(), "approved_title");
        };
        $mol_app_supplies_detail.prototype.Position = function (index) {
            var _this = this;
            return (function (obj) {
                obj.position = function () { return _this.position(index); };
                return obj;
            })(new this.$.$mol_app_supplies_position);
        };
        $mol_app_supplies_detail.prototype.position = function (index) {
            return null;
        };
        $mol_app_supplies_detail.prototype.Attachment = function (index) {
            var _this = this;
            return (function (obj) {
                obj.url_thumb = function () { return _this.attachment_thumb(index); };
                obj.url_load = function () { return _this.attachment_load(index); };
                return obj;
            })(new this.$.$mol_attach_item);
        };
        $mol_app_supplies_detail.prototype.attachment_thumb = function (index) {
            return "";
        };
        $mol_app_supplies_detail.prototype.attachment_load = function (index) {
            return "";
        };
        __decorate([
            $.$mol_mem
        ], $mol_app_supplies_detail.prototype, "Close", null);
        __decorate([
            $.$mol_mem
        ], $mol_app_supplies_detail.prototype, "Close_icon", null);
        __decorate([
            $.$mol_mem
        ], $mol_app_supplies_detail.prototype, "Content", null);
        __decorate([
            $.$mol_mem
        ], $mol_app_supplies_detail.prototype, "Descr_card", null);
        __decorate([
            $.$mol_mem
        ], $mol_app_supplies_detail.prototype, "Descr_deck", null);
        __decorate([
            $.$mol_mem
        ], $mol_app_supplies_detail.prototype, "Org_content", null);
        __decorate([
            $.$mol_mem
        ], $mol_app_supplies_detail.prototype, "Provider", null);
        __decorate([
            $.$mol_mem
        ], $mol_app_supplies_detail.prototype, "Consumer", null);
        __decorate([
            $.$mol_mem
        ], $mol_app_supplies_detail.prototype, "Supply_group", null);
        __decorate([
            $.$mol_mem
        ], $mol_app_supplies_detail.prototype, "Ballance_unit_item", null);
        __decorate([
            $.$mol_mem
        ], $mol_app_supplies_detail.prototype, "Cons_content", null);
        __decorate([
            $.$mol_mem
        ], $mol_app_supplies_detail.prototype, "Contract", null);
        __decorate([
            $.$mol_mem
        ], $mol_app_supplies_detail.prototype, "Pay_method", null);
        __decorate([
            $.$mol_mem
        ], $mol_app_supplies_detail.prototype, "Manager", null);
        __decorate([
            $.$mol_mem
        ], $mol_app_supplies_detail.prototype, "Debitor", null);
        __decorate([
            $.$mol_mem
        ], $mol_app_supplies_detail.prototype, "Attach_section", null);
        __decorate([
            $.$mol_mem
        ], $mol_app_supplies_detail.prototype, "Attach", null);
        __decorate([
            $.$mol_mem
        ], $mol_app_supplies_detail.prototype, "attach_new", null);
        __decorate([
            $.$mol_mem
        ], $mol_app_supplies_detail.prototype, "Positions_section", null);
        __decorate([
            $.$mol_mem
        ], $mol_app_supplies_detail.prototype, "Cost", null);
        __decorate([
            $.$mol_mem
        ], $mol_app_supplies_detail.prototype, "Cost_value", null);
        __decorate([
            $.$mol_mem
        ], $mol_app_supplies_detail.prototype, "cost", null);
        __decorate([
            $.$mol_mem
        ], $mol_app_supplies_detail.prototype, "Positions", null);
        __decorate([
            $.$mol_mem
        ], $mol_app_supplies_detail.prototype, "Actions", null);
        __decorate([
            $.$mol_mem
        ], $mol_app_supplies_detail.prototype, "Approve", null);
        __decorate([
            $.$mol_mem
        ], $mol_app_supplies_detail.prototype, "approved", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_app_supplies_detail.prototype, "Position", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_app_supplies_detail.prototype, "Attachment", null);
        return $mol_app_supplies_detail;
    }($.$mol_page));
    $.$mol_app_supplies_detail = $mol_app_supplies_detail;
})($ || ($ = {}));
//detail.view.tree.js.map
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
        var $mol_app_supplies_detail = (function (_super) {
            __extends($mol_app_supplies_detail, _super);
            function $mol_app_supplies_detail() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            $mol_app_supplies_detail.prototype.supply = function () {
                return null;
            };
            $mol_app_supplies_detail.prototype.title = function () {
                return _super.prototype.title.call(this) + " " + this.supply().id();
            };
            $mol_app_supplies_detail.prototype.approved = function (next) {
                if (next === void 0) {
                    return this.supply().status() === $.$mol_app_supplies_domain_supply_status.approved;
                }
                this.supply().status(next
                    ? $.$mol_app_supplies_domain_supply_status.approved
                    : $.$mol_app_supplies_domain_supply_status.pending);
                return next;
            };
            $mol_app_supplies_detail.prototype.provider_name = function () {
                return this.supply().provider().name();
            };
            $mol_app_supplies_detail.prototype.consumer_name = function () {
                return this.supply().consumer().name();
            };
            $mol_app_supplies_detail.prototype.ballance_unit_name = function () {
                return this.supply().ballance_unit().name();
            };
            $mol_app_supplies_detail.prototype.supply_group_name = function () {
                return this.supply().group().name();
            };
            $mol_app_supplies_detail.prototype.manager_name = function () {
                return this.supply().manager().name();
            };
            $mol_app_supplies_detail.prototype.pay_method_name = function () {
                return this.supply().pay_method().name();
            };
            $mol_app_supplies_detail.prototype.debitor_name = function () {
                return this.supply().debitor().name();
            };
            $mol_app_supplies_detail.prototype.contract_id = function () {
                return this.supply().contract().id();
            };
            $mol_app_supplies_detail.prototype.cost = function () {
                return this.supply().cost();
            };
            $mol_app_supplies_detail.prototype.status = function () {
                return String(this.supply().status());
            };
            $mol_app_supplies_detail.prototype.positions = function () {
                var _this = this;
                return this.supply().positions().map(function (pos, index) { return _this.Position(index); });
            };
            $mol_app_supplies_detail.prototype.position = function (index) {
                return this.supply().positions()[index];
            };
            $mol_app_supplies_detail.prototype.attachments = function () {
                var _this = this;
                return this.supply().attachments().map(function (pos, index) { return _this.Attachment(index); });
            };
            $mol_app_supplies_detail.prototype.attachment_thumb = function (index) {
                return this.supply().attachments()[index].url_thumb();
            };
            $mol_app_supplies_detail.prototype.attachment_load = function (index) {
                return this.supply().attachments()[index].url_load();
            };
            $mol_app_supplies_detail.prototype.attach_new = function (next) {
                var supply = this.supply();
                var list = supply.attachments();
                var url = $.$mol_const(next);
                list = list.concat($.$mol_app_supplies_domain_attachment.make({
                    url_thumb: url,
                    url_load: url,
                }));
                supply.attachments(list);
            };
            $mol_app_supplies_detail.prototype.body_scroll_top = function (next) {
                var supplyId = this.supply() && this.supply().id();
                return $.$mol_state_session.value(this + ".scroll_top(" + supplyId + ")", next);
            };
            return $mol_app_supplies_detail;
        }($.$mol_app_supplies_detail));
        $$.$mol_app_supplies_detail = $mol_app_supplies_detail;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//detail.view.js.map
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
    var $mol_app_supplies_root = (function (_super) {
        __extends($mol_app_supplies_root, _super);
        function $mol_app_supplies_root() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_app_supplies_root.prototype.enter = function () {
            var _this = this;
            return (function (obj) {
                obj.entered = function (val) { return _this.entered(val); };
                return obj;
            })(new this.$.$mol_app_supplies_enter);
        };
        $mol_app_supplies_root.prototype.entered = function (val, force) {
            return (val !== void 0) ? val : false;
        };
        $mol_app_supplies_root.prototype.lister = function () {
            var _this = this;
            return (function (obj) {
                obj.minimal_width = function () { return 400; };
                obj.supplies = function () { return _this.supplies(); };
                obj.search_query = function (val) { return _this.supply_id(val); };
                return obj;
            })(new this.$.$mol_app_supplies_list);
        };
        $mol_app_supplies_root.prototype.supplies = function () {
            return [];
        };
        $mol_app_supplies_root.prototype.supply_id = function (val, force) {
            return (val !== void 0) ? val : "";
        };
        $mol_app_supplies_root.prototype.detailer = function () {
            var _this = this;
            return (function (obj) {
                obj.minimal_width = function () { return 400; };
                obj.supply = function () { return _this.supply(); };
                obj.event_top = function (val) { return _this.event_front_up(val); };
                return obj;
            })(new this.$.$mol_app_supplies_detail);
        };
        $mol_app_supplies_root.prototype.supply = function () {
            return null;
        };
        $mol_app_supplies_root.prototype.placeholder = function () {
            var _this = this;
            return (function (obj) {
                obj.title = function () { return _this.title(); };
                return obj;
            })(new this.$.$mol_book_placeholder);
        };
        __decorate([
            $.$mol_mem
        ], $mol_app_supplies_root.prototype, "enter", null);
        __decorate([
            $.$mol_mem
        ], $mol_app_supplies_root.prototype, "entered", null);
        __decorate([
            $.$mol_mem
        ], $mol_app_supplies_root.prototype, "lister", null);
        __decorate([
            $.$mol_mem
        ], $mol_app_supplies_root.prototype, "supply_id", null);
        __decorate([
            $.$mol_mem
        ], $mol_app_supplies_root.prototype, "detailer", null);
        __decorate([
            $.$mol_mem
        ], $mol_app_supplies_root.prototype, "placeholder", null);
        return $mol_app_supplies_root;
    }($.$mol_book));
    $.$mol_app_supplies_root = $mol_app_supplies_root;
})($ || ($ = {}));
//root.view.tree.js.map
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
        var $mol_app_supplies_root = (function (_super) {
            __extends($mol_app_supplies_root, _super);
            function $mol_app_supplies_root() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            $mol_app_supplies_root.prototype.entered = function (next) {
                return $.$mol_state_session.value(this + ".entered()", next) || false;
            };
            $mol_app_supplies_root.prototype.pages = function () {
                if (!this.entered())
                    return [this.enter()];
                var sub = [this.lister()];
                if (this.supply())
                    sub.push(this.detailer());
                return sub;
            };
            $mol_app_supplies_root.prototype.Placeholder = function () {
                if (!this.entered())
                    return null;
                return this.supply() ? null : _super.prototype.Placeholder.call(this);
            };
            $mol_app_supplies_root.prototype.domain = function () {
                return new $.$mol_app_supplies_domain_mock();
            };
            $mol_app_supplies_root.prototype.supplies = function () {
                return this.domain().supplies();
            };
            $mol_app_supplies_root.prototype.supply_id = function (next) {
                return $.$mol_state_arg.value(this.state_key('supply'), next) || '';
            };
            $mol_app_supplies_root.prototype.supply = function () {
                if (!this.entered())
                    return null;
                var id = this.supply_id();
                if (id.length < 7)
                    return null;
                return this.domain().supply(id);
            };
            __decorate([
                $.$mol_mem
            ], $mol_app_supplies_root.prototype, "domain", null);
            return $mol_app_supplies_root;
        }($.$mol_app_supplies_root));
        $$.$mol_app_supplies_root = $mol_app_supplies_root;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//root.view.js.map
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
    var $mol_app_supplies_demo = (function (_super) {
        __extends($mol_app_supplies_demo, _super);
        function $mol_app_supplies_demo() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_app_supplies_demo.prototype.title = function () {
            return $.$mol_locale.text(this.locale_contexts(), "title");
        };
        $mol_app_supplies_demo.prototype.sub = function () {
            return [].concat(this.App());
        };
        $mol_app_supplies_demo.prototype.App = function () {
            return (function (obj) {
                obj.entered = function () { return true; };
                return obj;
            })(new this.$.$mol_app_supplies_root);
        };
        __decorate([
            $.$mol_mem
        ], $mol_app_supplies_demo.prototype, "App", null);
        return $mol_app_supplies_demo;
    }($.$mol_demo_large));
    $.$mol_app_supplies_demo = $mol_app_supplies_demo;
})($ || ($ = {}));
//demo.view.tree.js.map
//# sourceMappingURL=web.js.map