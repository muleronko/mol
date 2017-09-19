require( "source-map-support" ).install()

;
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
setImmediate(function () {
    $.$mol_test_run();
});
//test.node.js.map
;
var $;
(function ($) {
    function $mol_test(set) {
        for (var name_1 in set)
            $.$mol_test_all.push(new $mol_test_case(set[name_1]));
    }
    $.$mol_test = $mol_test;
    $.$mol_test_all = [];
    $.$mol_test_run = function () {
        for (var _i = 0, $mol_test_all_1 = $.$mol_test_all; _i < $mol_test_all_1.length; _i++) {
            var test = $mol_test_all_1[_i];
            test.run();
        }
    };
    var $mol_test_case = (function () {
        function $mol_test_case(code) {
            if (typeof code === 'string') {
                this.code = new Function(code);
            }
            else {
                this.code = code;
            }
        }
        $mol_test_case.prototype.run = function () {
            this.code();
        };
        return $mol_test_case;
    }());
    $.$mol_test_case = $mol_test_case;
})($ || ($ = {}));
//test.js.map
;
var $;
(function ($) {
    $.$mol_test({
        'must be false': function () {
            $.$mol_assert_not(0);
        },
        'must be true': function () {
            $.$mol_assert_ok(1);
        },
        'must be equal': function () {
            $.$mol_assert_equal(2, 2);
        },
        'must be unique': function () {
            $.$mol_assert_unique([3], [3]);
        },
    });
})($ || ($ = {}));
//assert.test.js.map
;
var $;
(function ($) {
    function $mol_assert_ok(value) {
        if (value)
            return;
        throw new Error("Not true (" + value + ")");
    }
    $.$mol_assert_ok = $mol_assert_ok;
    function $mol_assert_not(value) {
        if (!value)
            return;
        throw new Error("Not false (" + value + ")");
    }
    $.$mol_assert_not = $mol_assert_not;
    function $mol_assert_fail(handler, ErrorRight) {
        try {
            handler();
        }
        catch (error) {
            if (ErrorRight)
                $mol_assert_ok(error instanceof ErrorRight);
            return error;
        }
        throw new Error('Not failed');
    }
    $.$mol_assert_fail = $mol_assert_fail;
    function $mol_assert_equal(a, b) {
        if (a === b)
            return;
        throw new Error("Not equal (" + a + "," + b + ")");
    }
    $.$mol_assert_equal = $mol_assert_equal;
    function $mol_assert_unique(a, b) {
        if (a !== b)
            return;
        throw new Error("Not unique (" + a + "," + b + ")");
    }
    $.$mol_assert_unique = $mol_assert_unique;
})($ || ($ = {}));
//assert.js.map
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
    }
    $.$mol_log = $mol_log;
    (function ($mol_log) {
        var _filter;
        function filter(next) {
            if (next !== void 0) {
                _filter = next;
            }
            if (_filter !== void 0)
                return _filter;
            return _filter = null;
        }
        $mol_log.filter = filter;
    })($mol_log = $.$mol_log || ($.$mol_log = {}));
})($ || ($ = {}));
//log.node.js.map
;
var __extends = (this && this.__extends) || (function () {
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
    $.$mol_test({
        'init with overload': function () {
            var X = (function (_super) {
                __extends(X, _super);
                function X() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                X.prototype.foo = function () {
                    return 1;
                };
                return X;
            }($.$mol_object));
            var x = X.make({
                foo: function () { return 2; },
            });
            $.$mol_assert_equal(x.foo(), 2);
        },
        'object path generation': function () {
            var x = new $.$mol_object;
            $.$mol_assert_equal("" + x, '');
            x.object_field('foo()');
            $.$mol_assert_equal("" + x, '.foo()');
            x.object_field('bar()');
            $.$mol_assert_equal("" + x, '.foo()');
        },
    });
})($ || ($ = {}));
//object.test.js.map
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
var $;
(function ($) {
    $.$mol_test({
        'caching': function () {
            var random = new $.$mol_atom('random', function () { return Math.random(); });
            $.$mol_assert_equal(random.get(), random.get());
        },
        'lazyness': function () {
            var value = 0;
            var prop = new $.$mol_atom('prop', function () { return value = 1; });
            $.$mol_defer.run();
            $.$mol_assert_equal(value, 0);
        },
        'instant actualization': function () {
            var source = new $.$mol_atom('source', function (next) { return next || 1; });
            var middle = new $.$mol_atom('middle', function () { return source.get() + 1; });
            var target = new $.$mol_atom('target', function () { return middle.get() + 1; });
            $.$mol_assert_equal(target.get(), 3);
            source.set(2);
            $.$mol_assert_equal(target.get(), 4);
        },
        'do not actualize when masters not changed': function () {
            var target_updates = 0;
            var source = new $.$mol_atom('source', function (next) { return next || 1; });
            var middle = new $.$mol_atom('middle', function () { return Math.abs(source.get()); });
            var target = new $.$mol_atom('target', function () {
                ++target_updates;
                return middle.get();
            });
            target.get();
            $.$mol_assert_equal(target_updates, 1);
            source.set(-1);
            target.get();
            $.$mol_assert_equal(target_updates, 1);
        },
        'obsolete atoms actualized in initial order': function () {
            var actualizations = '';
            var source = new $.$mol_atom('source', function (next) { return next || 1; });
            var middle = new $.$mol_atom('middle', function () {
                actualizations += 'M';
                return source.get();
            });
            var target = new $.$mol_atom('target', function () {
                actualizations += 'T';
                source.get();
                return middle.get();
            });
            target.get();
            $.$mol_assert_equal(actualizations, 'TM');
            source.set(2);
            $.$mol_defer.run();
            $.$mol_assert_equal(actualizations, 'TMTM');
        },
        'automatic deferred restart': function () {
            var targetValue;
            var source = new $.$mol_atom('source', function (next) { return next || 1; });
            var middle = new $.$mol_atom('middle', function () { return source.get() + 1; });
            var target = new $.$mol_atom('target', function () { return targetValue = middle.get() + 1; });
            target.get();
            $.$mol_assert_equal(targetValue, 3);
            source.set(2);
            $.$mol_assert_equal(targetValue, 3);
            $.$mol_defer.run();
            $.$mol_assert_equal(targetValue, 4);
        },
        'Right reactive change of source': function () {
            var targetValue;
            var test_counter = new $.$mol_atom('test_counter', function (next) {
                new $.$mol_defer(function () {
                    test_counter.push(next || 1);
                });
                throw new $.$mol_atom_wait;
            });
            var slave = new $.$mol_atom('slave', function (next) { return test_counter.get(); });
            slave.actualize();
            var res = [];
            var error = new Error('test error');
            var test_task = new $.$mol_atom('test_task')
                .then(function () { return test_counter.get() + 1; })
                .then(function (next) { return test_counter.set(next); })
                .then(function (next) {
                test_counter.set(next + 1);
                throw error;
            })
                .catch(function (error) { return [error]; })
                .then(function (next) { return res = next; });
            $.$mol_defer.run();
            $.$mol_assert_equal(test_counter.get(), 3);
            $.$mol_assert_equal(res[0], error);
            slave.destroyed(true);
        },
        'error handling': function () {
            var source = new $.$mol_atom('source', function (next) {
                var error = new Error('Test error');
                error['$mol_atom_catched'] = true;
                throw error;
            });
            var middle = new $.$mol_atom('middle', function () { return source.get() + 1; });
            var target = new $.$mol_atom('target', function () { return middle.get() + 1; });
            $.$mol_assert_fail(function () { return target.get().valueOf(); });
        },
    });
})($ || ($ = {}));
//atom.test.js.map
;
var __extends = (this && this.__extends) || (function () {
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
var __extends = (this && this.__extends) || (function () {
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
    $.$mol_test({
        'cached property with simple key': function () {
            var X = (function (_super) {
                __extends(X, _super);
                function X() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                X.prototype.foo = function (id, next) {
                    if (next == null)
                        return new Number(123);
                    return new Number(next);
                };
                __decorate([
                    $.$mol_mem_key
                ], X.prototype, "foo", null);
                return X;
            }($.$mol_object));
            var x = new X;
            $.$mol_assert_equal(x.foo(0).valueOf(), 123);
            $.$mol_assert_equal(x.foo(0), x.foo(0));
            $.$mol_assert_unique(x.foo(0), x.foo(1));
            x.foo(0, 321);
            $.$mol_assert_equal(x.foo(0).valueOf(), 321);
            x.foo(0, null);
            $.$mol_assert_equal(x.foo(0).valueOf(), 123);
        },
        'cached property with complex key': function () {
            var X = (function (_super) {
                __extends(X, _super);
                function X() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                X.prototype.foo = function (ids) {
                    return Math.random();
                };
                __decorate([
                    $.$mol_mem_key
                ], X.prototype, "foo", null);
                return X;
            }($.$mol_object));
            var x = new X;
            $.$mol_assert_equal(x.foo([0, 1]), x.foo([0, 1]));
            $.$mol_assert_unique(x.foo([0, 1]), x.foo([0, 2]));
        },
        'auto sync of properties': function () {
            var X = (function (_super) {
                __extends(X, _super);
                function X() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                X.prototype.foo = function (next) {
                    return next || 1;
                };
                X.prototype.bar = function () {
                    return this.foo() + 1;
                };
                X.prototype.xxx = function () {
                    return this.bar() + 1;
                };
                __decorate([
                    $.$mol_mem
                ], X.prototype, "foo", null);
                __decorate([
                    $.$mol_mem
                ], X.prototype, "bar", null);
                __decorate([
                    $.$mol_mem
                ], X.prototype, "xxx", null);
                return X;
            }($.$mol_object));
            var x = new X;
            $.$mol_assert_equal(x.bar(), 2);
            $.$mol_assert_equal(x.xxx(), 3);
            x.foo(5);
            $.$mol_assert_equal(x.xxx(), 7);
        },
        'must be deferred destroyed when no longer referenced': function () {
            var foo;
            var B = (function (_super) {
                __extends(B, _super);
                function B() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                B.prototype.showing = function (next) {
                    if (next === void 0)
                        return true;
                    return next;
                };
                B.prototype.foo = function () {
                    return foo = new $.$mol_object;
                };
                B.prototype.bar = function () {
                    return this.showing() ? this.foo() : null;
                };
                __decorate([
                    $.$mol_mem
                ], B.prototype, "showing", null);
                __decorate([
                    $.$mol_mem
                ], B.prototype, "foo", null);
                __decorate([
                    $.$mol_mem
                ], B.prototype, "bar", null);
                return B;
            }($.$mol_object));
            var b = new B;
            var bar = b.bar();
            $.$mol_assert_ok(bar);
            b.showing(false);
            b.bar();
            $.$mol_defer.run();
            $.$mol_assert_ok(foo.destroyed());
            $.$mol_assert_ok(bar.destroyed());
            $.$mol_assert_not(b.bar());
            b.showing(true);
            $.$mol_defer.run();
            $.$mol_assert_unique(b.bar(), bar);
        },
        'wait for data': function () {
            var Test = (function (_super) {
                __extends(Test, _super);
                function Test() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                Test.prototype.source = function (next, force) {
                    var _this = this;
                    new $.$mol_defer(function () {
                        _this.source('Jin', $.$mol_atom_force);
                    });
                    throw new $.$mol_atom_wait('Wait for data!');
                };
                Test.prototype.middle = function () {
                    return this.source();
                };
                Test.prototype.target = function () {
                    return this.middle();
                };
                __decorate([
                    $.$mol_mem
                ], Test.prototype, "source", null);
                __decorate([
                    $.$mol_mem
                ], Test.prototype, "middle", null);
                __decorate([
                    $.$mol_mem
                ], Test.prototype, "target", null);
                return Test;
            }($.$mol_object));
            var t = new Test;
            $.$mol_assert_fail(function () { return t.target().valueOf(); }, $.$mol_atom_wait);
            $.$mol_defer.run();
            $.$mol_assert_equal(t.target(), 'Jin');
        },
    });
})($ || ($ = {}));
//mem.test.js.map
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
var $;
(function ($) {
    $.$mol_test({
        'const returns stored value': function () {
            var foo = { bar: $.$mol_const(Math.random()) };
            $.$mol_assert_equal(foo.bar(), foo.bar());
            $.$mol_assert_equal(foo.bar(), foo.bar['()']);
        },
    });
})($ || ($ = {}));
//const.test.js.map
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
var $node = new Proxy({}, { get: function (target, field, wrapper) {
        return require(field);
    } });
//node.node.js.map
;
var __extends = (this && this.__extends) || (function () {
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
            return $mol_file.absolute($node.path.resolve(path).replace(/\\/g, '/'));
        };
        $mol_file.prototype.path = function () {
            return '.';
        };
        $mol_file.prototype.watcher = function () {
            var _this = this;
            var watcher = $node.fs.watch(this.path(), { persistent: false }, function (type, name) {
                if (!name)
                    _this.stat(undefined, $.$mol_atom_force);
                else if (!/(^\.|___$)/.test(name)) {
                    var file = _this.resolve(name);
                    file.stat(undefined, $.$mol_atom_force);
                }
            });
            watcher.on('error', function (error) {
                _this.stat(error, $.$mol_atom_force);
            });
            return watcher;
        };
        $mol_file.prototype.stat = function (next, force) {
            var path = this.path();
            try {
                var stat = next || $node.fs.statSync(path);
            }
            catch (error) {
                if (error.code === 'ENOENT')
                    return null;
                return error;
            }
            this.parent().watcher();
            return stat;
        };
        $mol_file.prototype.version = function () {
            return this.stat().mtime.getTime().toString(36).toUpperCase();
        };
        $mol_file.prototype.exists = function (next) {
            var exists = !!this.stat();
            if (next === void 0) {
                return exists;
            }
            else {
                if (next == exists)
                    return exists;
                if (next) {
                    this.parent().exists(true);
                    $node.fs.mkdirSync(this.path());
                }
                else {
                    $node.fs.unlinkSync(this.path());
                }
                this.stat(undefined, $.$mol_atom_force);
                return next;
            }
        };
        $mol_file.prototype.parent = function () {
            return this.resolve('..');
        };
        $mol_file.prototype.type = function () {
            var stat = this.stat();
            if (stat) {
                if (stat.isFile())
                    return 'file';
                if (stat.isDirectory())
                    return 'dir';
                if (stat.isBlockDevice())
                    return 'blocks';
                if (stat.isCharacterDevice())
                    return 'chars';
                if (stat.isSymbolicLink())
                    return 'link';
                if (stat.isFIFO())
                    return 'fifo';
                if (stat.isSocket())
                    return 'socket';
            }
            else {
                return null;
            }
            throw new Error("Unknown file type " + this.path());
        };
        $mol_file.prototype.name = function () {
            return $node.path.basename(this.path());
        };
        $mol_file.prototype.ext = function () {
            var match = /((?:\.\w+)+)$/.exec(this.path());
            return match ? match[1].substring(1) : '';
        };
        $mol_file.prototype.content = function (next, force) {
            if (next === void 0) {
                return this.stat() && $node.fs.readFileSync(this.path());
            }
            this.parent().exists(true);
            $node.fs.writeFileSync(this.path(), next);
            return next;
        };
        $mol_file.prototype.reader = function () {
            return $node.fs.createReadStream(this.path());
        };
        $mol_file.prototype.writer = function () {
            return $node.fs.createWriteStream(this.path());
        };
        $mol_file.prototype.sub = function () {
            var _this = this;
            this.stat();
            switch (this.type()) {
                case 'dir':
                    return $node.fs.readdirSync(this.path())
                        .filter(function (name) { return !/^\.+$/.test(name); })
                        .map(function (name) { return _this.resolve(name); });
            }
            return [];
        };
        $mol_file.prototype.resolve = function (path) {
            return this.Class().relative($node.path.join(this.path(), path));
        };
        $mol_file.prototype.relate = function (base) {
            if (base === void 0) { base = this.Class().relative('.'); }
            return $node.path.relative(base.path(), this.path()).replace(/\\/g, '/');
        };
        $mol_file.prototype.append = function (next) {
            $node.fs.appendFileSync(this.path(), next);
        };
        $mol_file.prototype.find = function (include, exclude) {
            var found = [];
            this.sub().forEach(function (child) {
                if (exclude && child.path().match(exclude))
                    return;
                if (!include || child.path().match(include))
                    found.push(child);
                if (child.type() === 'dir')
                    found = found.concat(child.find(include, exclude));
            });
            return found;
        };
        __decorate([
            $.$mol_mem
        ], $mol_file.prototype, "watcher", null);
        __decorate([
            $.$mol_mem
        ], $mol_file.prototype, "stat", null);
        __decorate([
            $.$mol_mem
        ], $mol_file.prototype, "version", null);
        __decorate([
            $.$mol_mem
        ], $mol_file.prototype, "type", null);
        __decorate([
            $.$mol_mem
        ], $mol_file.prototype, "content", null);
        __decorate([
            $.$mol_mem
        ], $mol_file.prototype, "sub", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_file, "absolute", null);
        return $mol_file;
    }($.$mol_object));
    $.$mol_file = $mol_file;
})($ || ($ = {}));
//file.node.js.map
;
var $;
(function ($) {
    $.$mol_test({
        'scalars': function () {
            $.$mol_assert_equal($.$mol_typeof(void 0), 'Undefined');
            $.$mol_assert_equal($.$mol_typeof(null), 'Null');
            $.$mol_assert_equal($.$mol_typeof(0), 'Number');
            $.$mol_assert_equal($.$mol_typeof(''), 'String');
            $.$mol_assert_equal($.$mol_typeof(false), 'Boolean');
        },
        'common objects': function () {
            $.$mol_assert_equal($.$mol_typeof({}), 'Object');
            $.$mol_assert_equal($.$mol_typeof([]), 'Array');
            $.$mol_assert_equal($.$mol_typeof(arguments), 'Arguments');
        },
        'special classes': function () {
            $.$mol_assert_equal($.$mol_typeof(new Date), 'Date');
            $.$mol_assert_equal($.$mol_typeof(new RegExp('')), 'RegExp');
        },
    });
})($ || ($ = {}));
//typeof.test.js.map
;
var $;
(function ($) {
    function $mol_typeof(value) {
        var str = {}.toString.apply(value);
        var type = str.substring(8, str.length - 1);
        return type;
    }
    $.$mol_typeof = $mol_typeof;
})($ || ($ = {}));
//typeof.js.map
;
var $;
(function ($) {
    $.$mol_test({
        'tree parsing': function () {
            $.$mol_assert_equal($.$mol_tree.fromString("foo\nbar\n").sub.length, 2);
            $.$mol_assert_equal($.$mol_tree.fromString("foo\nbar\n").sub[1].type, "bar");
            $.$mol_assert_equal($.$mol_tree.fromString("foo\n\n\n").sub.length, 1);
            $.$mol_assert_equal($.$mol_tree.fromString("=foo\n\\bar\n").sub.length, 2);
            $.$mol_assert_equal($.$mol_tree.fromString("=foo\n\\bar\n").sub[1].data, "bar");
            $.$mol_assert_equal($.$mol_tree.fromString("foo bar \\pol").sub[0].sub[0].sub[0].data, "pol");
            $.$mol_assert_equal($.$mol_tree.fromString("foo bar\n\t\\pol\n\t\\men").sub[0].sub[0].sub[1].data, "men");
            $.$mol_assert_equal($.$mol_tree.fromString('foo bar \\text\n').toString(), 'foo bar \\text\n');
        },
        'inserting': function () {
            $.$mol_assert_equal($.$mol_tree.fromString('a b c d').insert(new $.$mol_tree, 'a', 'b', 'c').toString(), 'a b \\\n');
            $.$mol_assert_equal($.$mol_tree.fromString('a b').insert(new $.$mol_tree, 'a', 'b', 'c', 'd').toString(), 'a b c \\\n');
            $.$mol_assert_equal($.$mol_tree.fromString('a b c d').insert(new $.$mol_tree, 0, 0, 0).toString(), 'a b \\\n');
            $.$mol_assert_equal($.$mol_tree.fromString('a b').insert(new $.$mol_tree, 0, 0, 0, 0).toString(), 'a b \\\n\t\\\n');
            $.$mol_assert_equal($.$mol_tree.fromString('a b c d').insert(new $.$mol_tree, null, null, null).toString(), 'a b \\\n');
            $.$mol_assert_equal($.$mol_tree.fromString('a b').insert(new $.$mol_tree, null, null, null, null).toString(), 'a b \\\n\t\\\n');
        }
    });
})($ || ($ = {}));
//tree.test.js.map
;
var $;
(function ($) {
    var $mol_tree = (function () {
        function $mol_tree(config) {
            if (config === void 0) { config = {}; }
            this.type = config.type || '';
            if (config.value) {
                var sub = $mol_tree.values(config.value);
                if (config.type || sub.length > 1) {
                    this.sub = sub.concat(config.sub || []);
                    this.data = config.data || '';
                }
                else {
                    this.data = sub[0].data;
                    this.sub = config.sub || [];
                }
            }
            else {
                this.data = config.data || '';
                this.sub = config.sub || [];
            }
            this.baseUri = config.baseUri || '';
            this.row = config.row || 0;
            this.col = config.col || 0;
        }
        $mol_tree.values = function (str, baseUri) {
            return str.split('\n').map(function (data, index) { return new $mol_tree({
                data: data,
                baseUri: baseUri,
                row: index + 1
            }); });
        };
        $mol_tree.prototype.clone = function (config) {
            return new $mol_tree({
                type: ('type' in config) ? config.type : this.type,
                data: ('data' in config) ? config.data : this.data,
                sub: ('sub' in config) ? config.sub : this.sub,
                baseUri: ('baseUri' in config) ? config.baseUri : this.baseUri,
                row: ('row' in config) ? config.row : this.row,
                col: ('col' in config) ? config.col : this.col,
                value: config.value
            });
        };
        $mol_tree.fromString = function (str, baseUri) {
            var root = new $mol_tree({ baseUri: baseUri });
            var stack = [root];
            var row = 0;
            var lines = String(str).split(/\n/);
            lines.forEach(function (line) {
                ++row;
                var chunks = /^(\t*)((?:[^\n\t\\ ]+ *)*)(\\[^\n]*)?(.*?)(?:$|\n)/m.exec(line);
                if (!chunks || chunks[4])
                    throw new Error("Syntax error at " + baseUri + ":" + row + "\n" + line);
                var indent = chunks[1];
                var path = chunks[2];
                var data = chunks[3];
                var deep = indent.length;
                var types = path ? path.replace(/ $/, '').split(/ +/) : [];
                if (stack.length <= deep)
                    throw new Error("Too many tabs at " + baseUri + ":" + row + "\n" + line);
                stack.length = deep + 1;
                var parent = stack[deep];
                types.forEach(function (type) {
                    if (!type)
                        throw new Error("Unexpected space symbol " + baseUri + ":" + row + "\n" + line);
                    var next = new $mol_tree({
                        type: type,
                        baseUri: baseUri,
                        row: row
                    });
                    parent.sub.push(next);
                    parent = next;
                });
                if (data) {
                    var next = new $mol_tree({
                        data: data.substring(1),
                        baseUri: baseUri,
                        row: row
                    });
                    parent.sub.push(next);
                    parent = next;
                }
                stack.push(parent);
            });
            return root;
        };
        $mol_tree.fromJSON = function (json, baseUri) {
            if (baseUri === void 0) { baseUri = ''; }
            var type = $.$mol_typeof(json);
            switch (type) {
                case 'Boolean':
                case 'Null':
                case 'Number':
                    return new $mol_tree({
                        type: String(json),
                        baseUri: baseUri
                    });
                case 'String':
                    return new $mol_tree({
                        value: json,
                        baseUri: baseUri
                    });
                case 'Array':
                    return new $mol_tree({
                        type: "/",
                        sub: json.map(function (json) { return $mol_tree.fromJSON(json, baseUri); })
                    });
                case 'Date':
                    return new $mol_tree({
                        type: "",
                        value: json.toISOString(),
                        baseUri: baseUri
                    });
                case 'Object':
                    var sub = [];
                    for (var key in json) {
                        if (json[key] === undefined)
                            continue;
                        if (/^[^\n\t\\ ]+$/.test(key)) {
                            var child = new $mol_tree({
                                type: key,
                                baseUri: baseUri
                            });
                        }
                        else {
                            var child = new $mol_tree({
                                value: key,
                                baseUri: baseUri
                            });
                        }
                        child.sub.push($mol_tree.fromJSON(json[key], baseUri));
                        sub.push(child);
                    }
                    return new $mol_tree({
                        type: "*",
                        sub: sub,
                        baseUri: baseUri
                    });
            }
            throw new Error("Unsupported type (" + type + ") at " + baseUri);
        };
        Object.defineProperty($mol_tree.prototype, "uri", {
            get: function () {
                return this.baseUri + '#' + this.row + ':' + this.col;
            },
            enumerable: true,
            configurable: true
        });
        $mol_tree.prototype.toString = function (prefix) {
            if (prefix === void 0) { prefix = ''; }
            var output = '';
            if (this.type.length) {
                if (!prefix.length) {
                    prefix = "\t";
                }
                output += this.type + " ";
                if (this.sub.length == 1) {
                    return output + this.sub[0].toString(prefix);
                }
                output += "\n";
            }
            else if (this.data.length || prefix.length) {
                output += "\\" + this.data + "\n";
            }
            for (var _i = 0, _a = this.sub; _i < _a.length; _i++) {
                var child = _a[_i];
                output += prefix;
                output += child.toString(prefix + "\t");
            }
            return output;
        };
        $mol_tree.prototype.toJSON = function () {
            if (!this.type)
                return this.value;
            if (this.type === '//')
                return undefined;
            if (this.type === 'true')
                return true;
            if (this.type === 'false')
                return false;
            if (this.type === 'null')
                return null;
            if (this.type === 'dict') {
                var obj = {};
                for (var _i = 0, _a = this.sub; _i < _a.length; _i++) {
                    var child = _a[_i];
                    var key = child.type || child.value;
                    if (key === '//')
                        continue;
                    var colon = child.select(':').sub[0];
                    if (!colon)
                        throw new Error("Required colon after key at " + child.uri);
                    var val = colon.sub[0].toJSON();
                    if (val !== undefined)
                        obj[key] = val;
                }
                return obj;
            }
            if (this.type === 'list') {
                var res = [];
                this.sub.forEach(function (child) {
                    var val = child.toJSON();
                    if (val !== undefined)
                        res.push(val);
                });
                return res;
            }
            if (this.type === 'time') {
                return new Date(this.value);
            }
            if (String(Number(this.type)) == this.type.trim())
                return Number(this.type);
            throw new Error("Unknown type (" + this.type + ") at " + this.uri);
        };
        Object.defineProperty($mol_tree.prototype, "value", {
            get: function () {
                var values = [];
                for (var _i = 0, _a = this.sub; _i < _a.length; _i++) {
                    var child = _a[_i];
                    if (child.type)
                        continue;
                    values.push(child.value);
                }
                return this.data + values.join("\n");
            },
            enumerable: true,
            configurable: true
        });
        $mol_tree.prototype.insert = function (value) {
            var path = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                path[_i - 1] = arguments[_i];
            }
            if (path.length === 0)
                return value;
            var type = path[0];
            if (typeof type === 'string') {
                var replaced_1 = false;
                var sub = this.sub.map(function (item, index) {
                    if (item.type !== type)
                        return item;
                    replaced_1 = true;
                    return item.insert.apply(item, [value].concat(path.slice(1)));
                });
                if (!replaced_1)
                    sub.push((_a = new $mol_tree({ type: type })).insert.apply(_a, [value].concat(path.slice(1))));
                return this.clone({ sub: sub });
            }
            else if (typeof type === 'number') {
                var sub = this.sub.slice();
                sub[type] = (_b = (sub[type] || new $mol_tree)).insert.apply(_b, [value].concat(path.slice(1)));
                return this.clone({ sub: sub });
            }
            else {
                return this.clone({ sub: ((this.sub.length === 0) ? [new $mol_tree()] : this.sub).map(function (item) { return item.insert.apply(item, [value].concat(path.slice(1))); }) });
            }
            var _a, _b;
        };
        $mol_tree.prototype.select = function () {
            var path = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                path[_i] = arguments[_i];
            }
            var next = [this];
            for (var _a = 0, path_1 = path; _a < path_1.length; _a++) {
                var type = path_1[_a];
                if (!next.length)
                    break;
                var prev = next;
                next = [];
                for (var _b = 0, prev_1 = prev; _b < prev_1.length; _b++) {
                    var item = prev_1[_b];
                    switch (typeof (type)) {
                        case 'string':
                            for (var _c = 0, _d = item.sub; _c < _d.length; _c++) {
                                var child = _d[_c];
                                if (!type || (child.type == type)) {
                                    next.push(child);
                                }
                            }
                            break;
                        case 'number':
                            if (type < item.sub.length)
                                next.push(item.sub[type]);
                            break;
                        default: next.push.apply(next, item.sub);
                    }
                }
            }
            return new $mol_tree({ sub: next });
        };
        $mol_tree.prototype.filter = function (path, value) {
            var sub = this.sub.filter(function (item) {
                var found = item.select.apply(item, path);
                if (value == null) {
                    return Boolean(found.sub.length);
                }
                else {
                    return found.sub.some(function (child) { return child.value == value; });
                }
            });
            return new $mol_tree({ sub: sub });
        };
        $mol_tree.prototype.transform = function (visit, stack) {
            var _this = this;
            if (stack === void 0) { stack = []; }
            var sub_stack = [this].concat(stack);
            return visit(sub_stack, function () { return _this.sub.map(function (node) { return node.transform(visit, sub_stack); }).filter(function (n) { return n; }); });
        };
        $mol_tree.prototype.error = function (message) {
            return new Error(message + ":\n" + this + " " + this.baseUri + ":" + this.row + ":" + this.col);
        };
        return $mol_tree;
    }());
    $.$mol_tree = $mol_tree;
})($ || ($ = {}));
//tree.js.map
;
var __extends = (this && this.__extends) || (function () {
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
    var $mol_window = (function (_super) {
        __extends($mol_window, _super);
        function $mol_window() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_window.size = function (next) {
            return next || {
                width: 1024,
                height: 768,
            };
        };
        return $mol_window;
    }($.$mol_object));
    $.$mol_window = $mol_window;
})($ || ($ = {}));
//window.node.js.map
;
var $;
(function ($) {
    $.$mol_dom_context = $node['jsdom'].jsdom().defaultView;
})($ || ($ = {}));
//context.node.js.map
;
var $;
(function ($) {
})($ || ($ = {}));
//context.js.map
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
    $.$mol_test({
        'id auto generation': function () {
            var $mol_view_test_item = (function (_super) {
                __extends($mol_view_test_item, _super);
                function $mol_view_test_item() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return $mol_view_test_item;
            }($.$mol_view));
            var $mol_view_test_block = (function (_super) {
                __extends($mol_view_test_block, _super);
                function $mol_view_test_block() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                $mol_view_test_block.prototype.element = function (id) {
                    return new $mol_view_test_item();
                };
                __decorate([
                    $.$mol_mem_key
                ], $mol_view_test_block.prototype, "element", null);
                return $mol_view_test_block;
            }($.$mol_view));
            var x = new $mol_view_test_block();
            $.$mol_assert_equal(x.dom_node().id, '');
            $.$mol_assert_equal(x.element(0).dom_node().id, '.element(0)');
        },
        'caching ref to dom node': function () {
            var $mol_view_test = (function (_super) {
                __extends($mol_view_test, _super);
                function $mol_view_test() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return $mol_view_test;
            }($.$mol_view));
            var x = new $mol_view_test();
            $.$mol_assert_equal(x.dom_node(), x.dom_node());
        },
        'content render': function () {
            var $mol_view_test = (function (_super) {
                __extends($mol_view_test, _super);
                function $mol_view_test() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                $mol_view_test.prototype.sub = function () {
                    return ['lol', 5];
                };
                return $mol_view_test;
            }($.$mol_view));
            var x = new $mol_view_test();
            var node = x.dom_tree();
            $.$mol_assert_equal(node.innerHTML, 'lol5');
        },
        'bem attributes generation': function () {
            var $mol_view_test_item = (function (_super) {
                __extends($mol_view_test_item, _super);
                function $mol_view_test_item() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return $mol_view_test_item;
            }($.$mol_view));
            var $mol_view_test_block = (function (_super) {
                __extends($mol_view_test_block, _super);
                function $mol_view_test_block() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                $mol_view_test_block.prototype.Element = function (id) {
                    return new $mol_view_test_item();
                };
                __decorate([
                    $.$mol_mem_key
                ], $mol_view_test_block.prototype, "Element", null);
                return $mol_view_test_block;
            }($.$mol_view));
            var x = new $mol_view_test_block();
            $.$mol_assert_equal(x.dom_node().getAttribute('mol_view_test_block'), '');
            $.$mol_assert_equal(x.dom_node().getAttribute('mol_view'), '');
            $.$mol_assert_equal(x.Element(0).dom_node().getAttribute('mol_view_test_block_element'), '');
            $.$mol_assert_equal(x.Element(0).dom_node().getAttribute('mol_view_test_item'), '');
            $.$mol_assert_equal(x.Element(0).dom_node().getAttribute('mol_view'), '');
        },
        'render custom attributes': function () {
            var $mol_view_test = (function (_super) {
                __extends($mol_view_test, _super);
                function $mol_view_test() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                $mol_view_test.prototype.attr = function () {
                    return {
                        'href': '#haha',
                        'required': true,
                        'hidden': false,
                    };
                };
                return $mol_view_test;
            }($.$mol_view));
            var x = new $mol_view_test();
            var node = x.dom_tree();
            $.$mol_assert_equal(node.getAttribute('href'), '#haha');
            $.$mol_assert_equal(node.getAttribute('required'), 'true');
            $.$mol_assert_equal(node.getAttribute('hidden'), null);
        },
        'render custom fields': function () {
            var $mol_view_test = (function (_super) {
                __extends($mol_view_test, _super);
                function $mol_view_test() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                $mol_view_test.prototype.field = function () {
                    return {
                        'hidden': true
                    };
                };
                return $mol_view_test;
            }($.$mol_view));
            var x = new $mol_view_test();
            var node = x.dom_tree();
            $.$mol_assert_equal(node.hidden, true);
        },
        'attach event handlers': function () {
            var clicked = false;
            var $mol_view_test = (function (_super) {
                __extends($mol_view_test, _super);
                function $mol_view_test() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                $mol_view_test.prototype.event = function () {
                    var _this = this;
                    return {
                        'click': function (next) { return _this.event_click(next); }
                    };
                };
                $mol_view_test.prototype.event_click = function (next) {
                    clicked = true;
                };
                return $mol_view_test;
            }($.$mol_view));
            var x = new $mol_view_test();
            var node = x.dom_node();
            node.click();
            $.$mol_assert_ok(clicked);
        },
    });
})($ || ($ = {}));
//view.test.js.map
;
var __extends = (this && this.__extends) || (function () {
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
var __extends = (this && this.__extends) || (function () {
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
    $.$mol_test({
        'local get set delete': function () {
            var key = '$mol_state_local_test:' + Math.random();
            $.$mol_assert_equal($.$mol_state_local.value(key), null);
            $.$mol_state_local.value(key, 123);
            $.$mol_assert_equal($.$mol_state_local.value(key), 123);
            $.$mol_state_local.value(key, null);
            $.$mol_assert_equal($.$mol_state_local.value(key), null);
        },
    });
})($ || ($ = {}));
//local.test.js.map
;
var __extends = (this && this.__extends) || (function () {
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
var __extends = (this && this.__extends) || (function () {
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
var $;
(function ($) {
    function $mol_view_tree_trim_remarks(def) {
        return def.transform(function (_a, sub) {
            var node = _a[0];
            return (node.type === '-') ? null : node.clone({ sub: sub() });
        });
    }
    $.$mol_view_tree_trim_remarks = $mol_view_tree_trim_remarks;
    function $mol_view_tree_classes(defs) {
        return $mol_view_tree_trim_remarks(defs);
    }
    $.$mol_view_tree_classes = $mol_view_tree_classes;
    function $mol_view_tree_class_name(val) {
        return val.type;
    }
    $.$mol_view_tree_class_name = $mol_view_tree_class_name;
    function $mol_view_tree_super_name(val) {
        if (val.sub.length != 1)
            throw val.error('Wrong sub count');
        return val.sub[0].type;
    }
    $.$mol_view_tree_super_name = $mol_view_tree_super_name;
    function $mol_view_tree_class_props(def) {
        var props = {};
        var catch_prop = function (prop) {
            if (prop.sub.length === 0)
                return;
            if (prop.sub[0].type === '-')
                return;
            props[prop.type] = props[prop.type];
            var def = prop.clone({
                sub: [prop.sub[0].transform(function (_a, sub) {
                        var node = _a[0], stack = _a.slice(1);
                        if (['<=', '<=>', '=>'].indexOf(node.type) === -1)
                            return node.clone({ sub: sub() });
                        catch_prop(node.sub[0]);
                        return node.clone({
                            sub: [node.sub[0].clone({
                                    sub: [
                                        node.sub[0].clone({
                                            type: '-',
                                            sub: [],
                                        })
                                    ]
                                })]
                        });
                    })]
            });
            if (props[prop.type]) {
                if (props[prop.type].toString() !== def.toString()) {
                    throw def.error('Property already defined with another default value');
                }
            }
            else {
                props[prop.type] = def;
            }
        };
        def.sub[0].sub.map(catch_prop);
        return def.clone({
            type: '',
            sub: Object.keys(props).map(function (name) { return props[name]; }),
        });
    }
    $.$mol_view_tree_class_props = $mol_view_tree_class_props;
    function $mol_view_tree_prop_name(prop) {
        return (prop.type.match(/^\w+/) || [])[0] || '';
    }
    $.$mol_view_tree_prop_name = $mol_view_tree_prop_name;
    function $mol_view_tree_prop_key(prop) {
        return (prop.type.match(/!(\w+)$/) || [])[1] || '';
    }
    $.$mol_view_tree_prop_key = $mol_view_tree_prop_key;
    function $mol_view_tree_prop_next(prop) {
        return (prop.type.match(/\?(\w+)$/) || [])[1] || '';
    }
    $.$mol_view_tree_prop_next = $mol_view_tree_prop_next;
    function $mol_view_tree_prop_value(prop) {
        if (prop.sub.length != 1)
            throw prop.error("Wrong sub count (" + prop.sub.length + ")");
        return prop.sub[0];
    }
    $.$mol_view_tree_prop_value = $mol_view_tree_prop_value;
    function $mol_view_tree_value_type(val) {
        switch (val.type) {
            case 'true': return 'bool';
            case 'false': return 'bool';
            case 'null': return 'null';
            case '*': return 'dict';
            case '/': return 'list';
            case '@': return 'locale';
            case '': return 'string';
            case '<=': return 'get';
            case '<=>': return 'bind';
            case '=>': return 'put';
        }
        if (val.type[0] === '$')
            return 'object';
        if (Number(val.type).toString() == val.type)
            return 'number';
        throw val.error('Wrong value');
    }
    $.$mol_view_tree_value_type = $mol_view_tree_value_type;
    function $mol_view_tree_compile(tree) {
        var content = '';
        var locales = {};
        var _loop_1 = function (def) {
            if (!/^\$\w+$/.test(def.type))
                throw def.error('Wrong component name');
            parent = def.sub[0];
            propDefs = {};
            members = {};
            var _loop_2 = function (param) {
                try {
                    needSet = false;
                    needReturn = true;
                    needCache = false;
                    keys = [];
                    if (param.type === '<=>') {
                        param = param.sub[0];
                    }
                    if (param.type === '<=') {
                        param = param.sub[0];
                    }
                    propName = /(.*?)(?:\!(\w+))?(?:\?(\w+))?$/.exec(param.type);
                    if (propName[3]) {
                        needSet = true;
                        needCache = true;
                    }
                    function getValue(value) {
                        try {
                            switch (true) {
                                case (value.type === ''):
                                    return JSON.stringify(value.value);
                                case (value.type === '@'):
                                    locales[def.type + "_" + param.type] = value.value;
                                    return "$mol_locale.text( this.locale_contexts() , " + JSON.stringify(param.type) + " )";
                                case (value.type === '-'):
                                    return null;
                                case (value.type === '/'):
                                    var items = [];
                                    value.sub.forEach(function (item) {
                                        if (item.type === '-')
                                            return;
                                        if (item.type === '^') {
                                            items.push("...super." + param.type + "()");
                                            return;
                                        }
                                        var val = getValue(item);
                                        if (val)
                                            items.push(val);
                                    });
                                    return '[]' + (items.length ? '.concat( ' + items.join(' , ') + ' )' : ' as any[]');
                                case (value.type[0] === '$'):
                                    needCache = true;
                                    var overs = [];
                                    value.sub.forEach(function (over) {
                                        if (/^-?$/.test(over.type))
                                            return '';
                                        var overName = /(.*?)(?:\!(\w+))?(?:\?(\w+))?$/.exec(over.type);
                                        var ns = needSet;
                                        if (over.sub[0].type === '=>') {
                                            if (over.sub[0].sub.length === 1) {
                                                var method_name = over.sub[0].sub[0].type;
                                                members[method_name] = "\t" + method_name + "(){\n\t\treturn this." + param.type + "()." + over.type + "()\n\t}\n\n";
                                                return;
                                            }
                                        }
                                        var v = getValue(over.sub[0]);
                                        var args = [];
                                        if (overName[2])
                                            args.push(" " + overName[2] + " : any ");
                                        if (overName[3])
                                            args.push(" " + overName[3] + "? : any ");
                                        overs.push('\t\t\tobj.' + overName[1] + ' = (' + args.join(',') + ') => ' + v + '\n');
                                        needSet = ns;
                                    });
                                    return '(( obj )=>{\n' + overs.join('') + '\t\t\treturn obj\n\t\t})( new this.$.' + value.type + ' )';
                                case (value.type === '*'):
                                    var opts = [];
                                    value.sub.forEach(function (opt) {
                                        if (opt.type === '-')
                                            return '';
                                        if (opt.type === '^') {
                                            opts.push("\t\t\t...super." + param.type + "() ,\n");
                                            return;
                                        }
                                        var key = /(.*?)(?:\?(\w+))?$/.exec(opt.type);
                                        keys.push(key[1]);
                                        var ns = needSet;
                                        var v = getValue(opt.sub[0]);
                                        var arg = key[2] ? " ( " + key[2] + "? : any )=> " : '';
                                        opts.push('\t\t\t"' + key[1] + '" : ' + arg + ' ' + v + ' ,\n');
                                        needSet = ns;
                                    });
                                    return '({\n' + opts.join('') + '\t\t})';
                                case (value.type === '>'):
                                    throw new Error('Deprecated syntax `>`. Use `<=>` instead.');
                                case (value.type === '<=>'):
                                    needSet = true;
                                    if (value.sub.length === 1) {
                                        var type = /(.*?)(?:\!(\w+))?(?:\?(\w+))$/.exec(value.sub[0].type);
                                        return 'this.' + type[1] + '(' + (type[2] ? type[2] + ' ,' : '') + ' ' + type[3] + ' )';
                                    }
                                    break;
                                case (value.type === '<'):
                                    throw new Error('Deprecated syntax `<`. Use `<=` instead.');
                                case (value.type === '<='):
                                    if (value.sub.length === 1) {
                                        var type = /(.*?)(?:\!(\w+))?(?:\?(\w+))?$/.exec(value.sub[0].type);
                                        return 'this.' + type[1] + '(' + (type[2] ? type[2] : '') + ')';
                                    }
                                    break;
                            }
                            switch (value.type) {
                                case 'true':
                                case 'false':
                                    return value.type;
                                case 'null':
                                    return 'null as any';
                            }
                            if (Number(value.type).toString() == value.type)
                                return value.type;
                            throw value.error('Wrong value');
                        }
                        catch (err) {
                            err.message += "\n" + value.baseUri + ":" + value.row + ":" + value.col + "\n" + value;
                            throw err;
                        }
                    }
                    if (param.sub.length > 1)
                        throw new Error('Too more sub');
                    if (param.sub.length < 1)
                        throw new Error('Need default value (use "-" for inherit)');
                    param.sub.forEach(function (child) {
                        var val = getValue(child);
                        if (!val)
                            return;
                        propDefs[propName[1]] = param;
                        var args = [];
                        if (propName[2])
                            args.push(" " + propName[2] + " : any ");
                        if (propName[3])
                            args.push(" " + propName[3] + "? : any , force? : $" + '' + "mol_atom_force ");
                        if (needSet && param.sub[0].type !== '<=>')
                            val = (needReturn ? "( " + propName[3] + " !== void 0 ) ? " + propName[3] + " : " : "if( " + propName[3] + " !== void 0 ) return " + propName[3] + "\n\t\t") + val;
                        if (needReturn)
                            val = 'return ' + val;
                        var decl = '\t' + propName[1] + '(' + args.join(',') + ') {\n\t\t' + val + '\n\t}\n\n';
                        if (needCache) {
                            if (propName[2])
                                decl = '\t@ $' + 'mol_mem_key\n' + decl;
                            else
                                decl = '\t@ $' + 'mol_mem\n' + decl;
                        }
                        decl = param.toString().trim().replace(/^/gm, '\t/// ') + '\n' + decl;
                        members[propName[1]] = decl;
                    });
                }
                catch (err) {
                    err.message += "\n" + param.baseUri + ":" + param.row + ":" + param.col + "\n" + param;
                    throw err;
                }
            };
            for (var _i = 0, _a = $mol_view_tree_class_props(def).sub; _i < _a.length; _i++) {
                var param = _a[_i];
                _loop_2(param);
            }
            body = Object.keys(members).map(function (name) {
                return members[name] || '\t' + name + '() { return null as any }\n\t}\n';
            }).join('');
            classes = 'namespace $ { export class ' + def.type + ' extends ' + parent.type + ' {\n\n' + body + '} }\n';
            content += classes + '\n';
        };
        var parent, propDefs, members, needSet, needReturn, needCache, keys, propName, body, classes;
        for (var _i = 0, _a = $mol_view_tree_classes(tree).sub; _i < _a.length; _i++) {
            var def = _a[_i];
            _loop_1(def);
        }
        return { script: content, locales: locales };
    }
    $.$mol_view_tree_compile = $mol_view_tree_compile;
})($ || ($ = {}));
//tree.js.map
;
var $;
(function ($) {
    $.$mol_test({
        'sorting must cut cycles at low priority edges': function () {
            var graph = new $.$mol_graph();
            graph.link('A', 'B', { priority: 0 });
            graph.link('B', 'C', { priority: -2 });
            graph.link('C', 'D', { priority: 0 });
            graph.link('D', 'A', { priority: -1 });
            $.$mol_assert_equal(graph.sorted(function (edge) { return edge.priority; }).join(''), 'BADC');
        }
    });
})($ || ($ = {}));
//graph.test.js.map
;
var $;
(function ($) {
    var $mol_graph = (function () {
        function $mol_graph() {
            this.nodes = {};
            this.edgesOut = {};
            this.edgesIn = {};
        }
        $mol_graph.prototype.nodeEnsure = function (id) {
            if (this.nodes.hasOwnProperty(id))
                return;
            this.nodes[id] = null;
        };
        $mol_graph.prototype.linkOut = function (from, to, edge) {
            if (!this.edgesOut[from]) {
                this.edgesOut[from] = {};
                this.nodeEnsure(from);
            }
            this.edgesOut[from][to] = edge;
            this.nodeEnsure(to);
        };
        $mol_graph.prototype.linkIn = function (to, from, edge) {
            if (!this.edgesIn[to]) {
                this.edgesIn[to] = {};
                this.nodeEnsure(to);
            }
            this.edgesIn[to][from] = edge;
            this.nodeEnsure(from);
        };
        $mol_graph.prototype.edgeOut = function (from, to) {
            return this.edgesOut[from] && this.edgesOut[from][to];
        };
        $mol_graph.prototype.edgeIn = function (to, from) {
            return this.edgesIn[to] && this.edgesIn[to][from];
        };
        $mol_graph.prototype.link = function (one, two, edge) {
            this.linkOut(one, two, edge);
            this.linkIn(two, one, edge);
        };
        $mol_graph.prototype.sorted = function (getWeight) {
            var _this = this;
            var pending = Object.keys(this.nodes);
            var visited = [];
            var weights = [];
            var sorted = [];
            var visit = function (id, weight) {
                var index = visited.lastIndexOf(id);
                if (index >= 0) {
                    if (index === visited.length - 1)
                        return false;
                    if (weight <= weights[index + 1])
                        return false;
                }
                if (weight != null) {
                    visited.push(id);
                    weights.push(weight);
                }
                var deps = _this.edgesOut[id];
                for (var dep in deps) {
                    if (dep === id)
                        continue;
                    visit(dep, getWeight(deps[dep]));
                }
                if (sorted.indexOf(id) !== -1)
                    return false;
                sorted.push(id);
                return true;
            };
            pending.forEach(function (id) { return visit(id, null); });
            return sorted;
        };
        return $mol_graph;
    }());
    $.$mol_graph = $mol_graph;
})($ || ($ = {}));
//graph.js.map
;
var $;
(function ($) {
    function $mol_exec(dir, command) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        console.log(dir + "> " + command + " " + args.join(' '));
        var res = $node.child_process.spawnSync(command, args, { cwd: dir, stdio: ['pipe', process.stdout, 'pipe'] });
        if (res.status)
            throw new Error(res.stderr.toString());
        return res;
    }
    $.$mol_exec = $mol_exec;
})($ || ($ = {}));
//exec.node.js.map
;
var __extends = (this && this.__extends) || (function () {
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
    var $mol_build = (function (_super) {
        __extends($mol_build, _super);
        function $mol_build() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_build.root = function (path) {
            return this.make({
                root: $.$mol_const($.$mol_file.absolute(path)),
            });
        };
        $mol_build.relative = function (path) {
            return $mol_build.root($.$mol_file.relative(path).path());
        };
        $mol_build.prototype.server = function () {
            return $.$mol_build_server.make({
                build: $.$mol_const(this),
            });
        };
        $mol_build.prototype.root = function () {
            return $.$mol_file.relative('.');
        };
        $mol_build.prototype.mods = function (_a) {
            var path = _a.path, exclude = _a.exclude;
            var mods = [];
            $.$mol_file.absolute(path).sub()
                .forEach(function (child) {
                var name = child.name();
                if (!/^[a-z]/i.test(name))
                    return false;
                if (exclude && RegExp('[.=](' + exclude.join('|') + ')[.]', 'i').test(name))
                    return false;
                if (/(view\.tree)$/.test(name)) {
                    var script = child.parent().resolve("-view.tree/" + child.name() + ".ts");
                    var locale = child.parent().resolve("-view.tree/" + child.name() + ".locale.json");
                    var tree = $.$mol_tree.fromString(String(child.content()), child.path());
                    var res = $.$mol_view_tree_compile(tree);
                    script.content(res.script);
                    locale.content(JSON.stringify(res.locales, null, '\t'));
                    mods.push(script, locale, child);
                }
                else {
                    mods.push(child);
                }
                return true;
            });
            return mods;
        };
        $mol_build.prototype.modsRecursive = function (_a) {
            var path = _a.path, exclude = _a.exclude;
            var mod = $.$mol_file.absolute(path);
            switch (mod.type()) {
                case 'file':
                    return [mod];
                case 'dir':
                    var mods = [mod];
                    for (var _i = 0, _b = this.mods({ path: path, exclude: exclude }); _i < _b.length; _i++) {
                        var m = _b[_i];
                        if (m.type() !== 'dir')
                            continue;
                        for (var _c = 0, _d = this.modsRecursive({ path: m.path(), exclude: exclude }); _c < _d.length; _c++) {
                            var dep = _d[_c];
                            if (mods.indexOf(dep) !== -1)
                                continue;
                            mods.push(dep);
                        }
                    }
                    return mods;
                case null:
                    throw new Error("Module not found: \"" + mod.relate() + "\"");
            }
            throw new Error("Unsopported type \"" + mod.type() + "\" of \"" + mod.relate() + "\"");
        };
        $mol_build.prototype.sources = function (_a) {
            var path = _a.path, exclude = _a.exclude;
            var mod = $.$mol_file.absolute(path);
            switch (mod.type()) {
                case 'file':
                    return [mod];
                case 'dir':
                    return this.mods({ path: path, exclude: exclude }).filter(function (mod) { return mod.type() === 'file'; });
                default:
                    return [];
            }
        };
        $mol_build.prototype.sourcesSorted = function (_a) {
            var _this = this;
            var path = _a.path, exclude = _a.exclude;
            var mod = $.$mol_file.absolute(path);
            var graph = new $.$mol_graph();
            var sources = this.sources({ path: path, exclude: exclude });
            for (var _i = 0, sources_1 = sources; _i < sources_1.length; _i++) {
                var src = sources_1[_i];
                graph.nodeEnsure(src.relate(this.root()));
            }
            for (var _b = 0, sources_2 = sources; _b < sources_2.length; _b++) {
                var src = sources_2[_b];
                var deps = this.srcDeps(src.path());
                for (var p in deps) {
                    var names;
                    if (p[0] === '/')
                        names = p.substring(1).split('/');
                    else
                        names = mod.resolve(p).relate(this.root()).split('/');
                    var files = [this.root()];
                    for (var _c = 0, names_1 = names; _c < names_1.length; _c++) {
                        var name_1 = names_1[_c];
                        var nextFiles = [];
                        for (var _d = 0, files_1 = files; _d < files_1.length; _d++) {
                            var file = files_1[_d];
                            var validName = new RegExp("^(" + file.name() + ")?" + name_1 + "(?![a-z0-9])", 'i');
                            for (var _e = 0, _f = this.mods({ path: file.path(), exclude: exclude }); _e < _f.length; _e++) {
                                var child = _f[_e];
                                if (!child.name().match(validName))
                                    continue;
                                nextFiles.push(child);
                            }
                        }
                        if (nextFiles.length === 0)
                            break;
                        files = nextFiles;
                    }
                    for (var _g = 0, files_2 = files; _g < files_2.length; _g++) {
                        var file = files_2[_g];
                        if (file === this.root())
                            continue;
                        if (file.relate(this.root()) in graph.nodes) {
                            graph.link(src.relate(this.root()), file.relate(this.root()), { priority: deps[p] });
                        }
                    }
                }
            }
            var next = graph.sorted(function (edge) { return edge.priority; }).map(function (name) { return _this.root().resolve(name); });
            return next;
        };
        $mol_build.prototype.sourcesAll = function (_a) {
            var _this = this;
            var path = _a.path, exclude = _a.exclude;
            var sortedPaths = this.graph({ path: path, exclude: exclude }).sorted(function (edge) { return edge.priority; });
            var sources = [];
            sortedPaths.forEach(function (path) {
                _this.sourcesSorted({ path: _this.root().resolve(path).path(), exclude: exclude }).forEach(function (src) {
                    if (sources.indexOf(src) === -1)
                        sources.push(src);
                });
            });
            return sources;
        };
        $mol_build.prototype.tsOptions = function () {
            var rawOptions = JSON.parse(this.root().resolve('tsconfig.json').content()).compilerOptions;
            var res = $node['typescript'].convertCompilerOptionsFromJson(rawOptions, ".", 'tsconfig.json');
            if (res.errors.length)
                throw res.errors;
            return res.options;
        };
        $mol_build.prototype.tsSource = function (_a) {
            var path = _a.path, target = _a.target;
            var content = $.$mol_file.absolute(path).content().toString();
            return $node['typescript'].createSourceFile(path, content, target);
        };
        $mol_build.prototype.tsHost = function () {
            var _this = this;
            var host = {
                getScriptVersion: function (path) { return $.$mol_file.absolute(path).version(); },
                getScriptSnapshot: function (path) { return $.$mol_file.absolute(path).content().toString(); },
                getCurrentDirectory: function () { return _this.root().path(); },
                getCompilationSettings: function () { return _this.tsOptions(); },
                useCaseSensitiveFileNames: function () { return false; },
                getCanonicalFileName: function (path) { return path.toLowerCase(); },
                getDefaultLibFileName: function (options) { return $node['typescript'].getDefaultLibFilePath(options); },
                getCommonSourceDirectory: function () { return _this.root().path(); },
                getNewLine: function () { return '\n'; },
                getSourceFile: function (path, target, fail) {
                    return _this.tsSource({ path: path, target: target });
                },
                fileExists: function (path) {
                    return $.$mol_file.absolute(path).exists();
                },
                writeFile: function (path, content) {
                    $.$mol_file.absolute(path).content(content, $.$mol_atom_force);
                },
            };
            return host;
        };
        $mol_build.prototype.tsProgram = function (_a) {
            var path = _a.path, exclude = _a.exclude;
            var host = this.tsHost();
            var options = host.getCompilationSettings();
            var paths = this.sourcesAll({ path: path, exclude: exclude }).filter(function (src) { return /tsx?$/.test(src.ext()); }).map(function (src) { return src.path(); });
            var program = $node['typescript'].createProgram(paths, options, host);
            return program;
        };
        $mol_build.prototype.sourcesJS = function (_a) {
            var path = _a.path, exclude = _a.exclude;
            var sources = this.sourcesAll({ path: path, exclude: exclude })
                .filter(function (src) { return /(js|tsx?)$/.test(src.ext()); });
            if (!sources.length)
                return [];
            var sourcesTS = [];
            sources = sources.map(function (src) {
                if (!/tsx?$/.test(src.ext()))
                    return src;
                sourcesTS.push(src);
                return src.parent().resolve(src.name().replace(/\.tsx?$/, '.js'));
            });
            if (sourcesTS.length) {
                var host = this.tsHost();
                var options = host.getCompilationSettings();
                var program = this.tsProgram({ path: path, exclude: exclude });
                var result = program.emit();
                var errors = $node['typescript'].getPreEmitDiagnostics(program).concat(result.diagnostics);
                var logs = errors.map(function (error) {
                    var message = $node['typescript'].flattenDiagnosticMessageText(error.messageText, '\n');
                    if (!error.file)
                        return message;
                    var pos = error.file.getLineAndCharacterOfPosition(error.start);
                    return error.file.fileName + ':' + (pos.line + 1) + ':' + pos.character + '\n ' + message;
                });
                if (logs.length)
                    throw new Error('\n' + logs.join('\n'));
            }
            return sources;
        };
        $mol_build.prototype.sourcesDTS = function (_a) {
            var path = _a.path, exclude = _a.exclude;
            var sources = this.sourcesAll({ path: path, exclude: exclude });
            sources = sources.filter(function (src) { return /(tsx?)$/.test(src.ext()); });
            sources = sources.map(function (src) { return src.parent().resolve(src.name().replace(/(\.d)?\.tsx?$/, '.d.ts')); });
            return sources;
        };
        $mol_build.prototype.sourcesCSS = function (_a) {
            var path = _a.path, exclude = _a.exclude;
            return this.sourcesAll({ path: path, exclude: exclude }).filter(function (src) { return /(css)$/.test(src.ext()); });
        };
        $mol_build.prototype.srcDeps = function (path) {
            var src = $.$mol_file.absolute(path);
            var ext = src.ext();
            if (!ext)
                return {};
            var dependencies;
            while (!dependencies) {
                dependencies = $mol_build.dependors[ext];
                if (dependencies)
                    break;
                var extShort = ext.replace(/^[^.]*\./, '');
                if (ext === extShort)
                    break;
                ext = extShort;
            }
            return dependencies ? dependencies(src) : {};
        };
        $mol_build.prototype.modDeps = function (_a) {
            var path = _a.path, exclude = _a.exclude;
            var mod = $.$mol_file.absolute(path);
            var depends = { '..': 0 };
            for (var _i = 0, _b = this.sources({ path: path, exclude: exclude }); _i < _b.length; _i++) {
                var src = _b[_i];
                $mol_build_depsMerge(depends, this.srcDeps(src.path()));
            }
            return depends;
        };
        $mol_build.prototype.dependencies = function (_a) {
            var path = _a.path, exclude = _a.exclude;
            var mod = $.$mol_file.absolute(path);
            switch (mod.type()) {
                case 'file':
                    return this.srcDeps(path);
                case 'dir':
                    return this.modDeps({ path: path, exclude: exclude });
                default:
                    return {};
            }
        };
        $mol_build.prototype.packEnsure = function (name) {
            var mapping = this.packMapping();
            var pack = this.root().resolve(name);
            if (pack.exists()) {
                if (pack.resolve('.git').exists()) {
                    try {
                        $.$mol_exec(pack.path(), 'git', '--no-pager', 'log', '--oneline', 'HEAD..origin/master');
                    }
                    catch (error) {
                        console.error(error.message);
                    }
                }
                return false;
            }
            for (var _i = 0, _a = mapping.select('pack', name, 'git').sub; _i < _a.length; _i++) {
                var repo = _a[_i];
                $.$mol_exec(this.root().path(), 'git', 'clone', repo.value, name);
                pack.stat(undefined, $.$mol_atom_force);
                return true;
            }
            throw new Error("Package \"" + name + "\" not found");
        };
        $mol_build.prototype.modEnsure = function (path) {
            var file = $.$mol_file.absolute(path);
            var sub = file.relate(this.root());
            var name = sub.replace(/\/.*$/, '');
            return this.packEnsure(name).valueOf();
        };
        $mol_build.prototype.packMapping = function () {
            var file = $.$mol_file.relative('.pms.tree');
            return $.$mol_tree.fromString(file.content(), file.path());
        };
        $mol_build.prototype.graph = function (_a) {
            var _this = this;
            var path = _a.path, exclude = _a.exclude;
            var graph = new $.$mol_graph();
            var added = {};
            var addMod = function (mod) {
                if (added[mod.path()])
                    return;
                added[mod.path()] = true;
                graph.nodes[mod.relate(_this.root())] = null;
                var checkDep = function (p) {
                    var dep = (p[0] === '/') ? _this.root().resolve(p) : mod.resolve(p);
                    try {
                        _this.modEnsure(dep.path());
                    }
                    catch (error) {
                        throw new Error(error.message + "\nDependency \"" + dep.relate(_this.root()) + "\" from \"" + mod.relate(_this.root()) + "\" ");
                    }
                    while (!dep.exists())
                        dep = dep.parent();
                    if (dep.type() === 'dir') {
                        var index = dep.resolve('index.js');
                        if (index.exists())
                            dep = index;
                    }
                    if (mod === dep)
                        return;
                    if (dep === _this.root())
                        return;
                    graph.link(mod.relate(_this.root()), dep.relate(_this.root()), { priority: deps[p] });
                    addMod(dep);
                };
                var deps = _this.dependencies({ path: mod.path(), exclude: exclude });
                for (var p in deps) {
                    checkDep(p);
                    var p2 = p.replace(/^\/node\//, '/node_modules/');
                    if (p2 !== p)
                        checkDep(p2);
                }
            };
            this.modEnsure(path);
            this.modsRecursive({ path: path, exclude: exclude }).forEach(function (mod) { return addMod(mod); });
            return graph;
        };
        $mol_build.prototype.bundle = function (_a) {
            var _this = this;
            var path = _a.path, bundle = _a.bundle;
            bundle = bundle && bundle.replace(/\.map$/, '');
            var envsDef = ['web', 'node'];
            var envs = bundle ? [] : envsDef.slice();
            var stages = ['test', 'dev'];
            if (bundle) {
                var _b = /^(.*?)(?:\.(test\.js|js|css|deps\.json|locale(?:=(.*))?\.json))?$/.exec(bundle), bundle = _b[0], tags = _b[1], type = _b[2], locale = _b[3];
                tags.split('.').forEach(function (tag) {
                    if (envsDef.indexOf(tag) !== -1)
                        envs = [tag];
                });
            }
            var res = [];
            envs.forEach(function (env) {
                var exclude = envsDef.filter(function (e) { return e !== env; }).concat(stages);
                if (!type || type === 'deps.json') {
                    res = res.concat(_this.bundleDepsJSON({ path: path, exclude: exclude, bundle: env }));
                }
                if (!type || type === 'css') {
                    res = res.concat(_this.bundleCSS({ path: path, exclude: exclude, bundle: env }));
                }
                if (!type || type === 'js') {
                    res = res.concat(_this.bundleJS({ path: path, exclude: exclude, bundle: env }));
                }
                if (!type || type === 'test.js') {
                    res = res.concat(_this.bundleTestJS({ path: path, exclude: exclude, bundle: env }));
                }
                if (!type || type === 'd.ts') {
                    res = res.concat(_this.bundleDTS({ path: path, exclude: exclude, bundle: env }));
                }
                if (!type || type === 'view.tree') {
                    res = res.concat(_this.bundleViewTree({ path: path, exclude: exclude, bundle: env }));
                }
                if (!type || /^locale(?:=\w+)?.json$/.test(type)) {
                    res = res.concat(_this.bundleLocale({
                        path: path,
                        exclude: exclude,
                        bundle: env
                    }));
                }
            });
            if (!bundle || bundle === 'package.json') {
                res = res.concat(this.bundlePackageJSON({ path: path, exclude: ['web'] }));
            }
            res = res.concat(this.bundleFiles({ path: path, exclude: ['node'] }));
            res = res.concat(this.bundleCordova({ path: path, exclude: ['node'] }));
            return res.map(function (r) { return r.valueOf(); });
        };
        $mol_build.prototype.logBundle = function (target) {
            var time = new Date().toLocaleTimeString();
            var path = target.relate(this.root());
            console.log(time + " Built " + path);
        };
        $mol_build.prototype.bundleJS = function (_a) {
            var _this = this;
            var path = _a.path, exclude = _a.exclude, bundle = _a.bundle;
            var pack = $.$mol_file.absolute(path);
            var target = pack.resolve("-/" + bundle + ".js");
            var targetMap = pack.resolve("-/" + bundle + ".js.map");
            var sources = this.sourcesJS({ path: path, exclude: exclude });
            if (sources.length === 0)
                return [];
            var concater = new $node['concat-with-sourcemaps'](true, target.name(), '\n;\n');
            if (bundle === 'node') {
                concater.add('', 'require( "source-map-support" ).install(); var exports = void 0;\n');
            }
            sources.forEach(function (src) {
                if (bundle === 'node') {
                    if (/node_modules\//.test(src.relate(_this.root()))) {
                        return;
                    }
                }
                var content = src.content() ? src.content().toString().replace(/^\/\/#\ssourceMappingURL=/mg, '//') : '';
                var srcMap = src.parent().resolve(src.name() + '.map').content();
                if (srcMap) {
                    var map = JSON.parse(srcMap);
                    map.sourceRoot = src.parent().relate(target.parent());
                }
                var isCommonJs = /module\.exports/.test(content);
                if (isCommonJs) {
                    concater.add('-', '\nvar $node = $node || {}\nvoid function( module ) { var exports = module' + '.exports; function require( id ) { return $node[ id ] }; \n');
                }
                concater.add(src.relate(target.parent()), content, map && JSON.stringify(map));
                if (isCommonJs) {
                    var idFull = src.relate(_this.root().resolve('node_modules'));
                    var idShort = idFull.replace(/\/index\.js$/, '');
                    concater.add('-', "\n$" + '' + "node[ \"" + idShort + "\" ] = $" + '' + "node[ \"" + idFull + "\" ] = module." + '' + "exports }( { exports : {} } )\n");
                }
            });
            target.content(concater.content + '\n//# sourceMappingURL=' + targetMap.relate(target.parent()));
            targetMap.content(concater.sourceMap);
            this.logBundle(target);
            return [target, targetMap];
        };
        $mol_build.prototype.bundleTestJS = function (_a) {
            var path = _a.path, exclude = _a.exclude, bundle = _a.bundle;
            var pack = $.$mol_file.absolute(path);
            var root = this.root();
            var target = pack.resolve("-/" + bundle + ".test.js");
            var targetMap = pack.resolve("-/" + bundle + ".test.js.map");
            var concater = new $node['concat-with-sourcemaps'](true, target.name(), '\n;\n');
            var sources = this.sourcesJS({ path: path, exclude: exclude.filter(function (ex) { return ex !== 'test' && ex !== 'dev'; }) });
            if (bundle === 'node') {
                concater.add('', 'require( "source-map-support" ).install()\n');
            }
            else {
                var sourcesNoTest = this.sourcesJS({ path: path, exclude: exclude });
                sources = sources.filter(function (src) { return sourcesNoTest.indexOf(src) === -1; });
            }
            if (sources.length === 0)
                return [];
            sources.forEach(function (src) {
                if (bundle === 'node') {
                    if (/node_modules\//.test(src.relate(root))) {
                        return;
                    }
                }
                var content = src.content().toString().replace(/^\/\/#\ssourceMappingURL=/mg, '//');
                var srcMap = src.parent().resolve(src.name() + '.map').content();
                if (srcMap) {
                    var map = JSON.parse(srcMap);
                    map.sourceRoot = src.parent().relate(target.parent());
                }
                concater.add(src.relate(target.parent()), content, map && JSON.stringify(map));
            });
            target.content(concater.content + '\n//# sourceMappingURL=' + targetMap.relate(target.parent()));
            targetMap.content(concater.sourceMap);
            this.logBundle(target);
            return [target, targetMap];
        };
        $mol_build.prototype.bundleDTS = function (_a) {
            var path = _a.path, exclude = _a.exclude, bundle = _a.bundle;
            var pack = $.$mol_file.absolute(path);
            var target = pack.resolve("-/" + bundle + ".d.ts");
            var sources = this.sourcesDTS({ path: path, exclude: exclude });
            if (sources.length === 0)
                return [];
            var concater = new $node['concat-with-sourcemaps'](true, target.name());
            sources.forEach(function (src) {
                var content = src.content().toString();
                concater.add(src.relate(target.parent()), content);
            });
            target.content(concater.content);
            this.logBundle(target);
            return [target];
        };
        $mol_build.prototype.bundleViewTree = function (_a) {
            var path = _a.path, exclude = _a.exclude, bundle = _a.bundle;
            var pack = $.$mol_file.absolute(path);
            var target = pack.resolve("-/" + bundle + ".view.tree");
            var sources = this.sourcesAll({ path: path, exclude: exclude })
                .filter(function (src) { return /view.tree$/.test(src.ext()); });
            if (sources.length === 0)
                return [];
            target.content(sources.map(function (src) { return src.content().toString(); }).join('\n'));
            this.logBundle(target);
            return [target];
        };
        $mol_build.prototype.bundlePackageJSON = function (_a) {
            var path = _a.path, exclude = _a.exclude;
            var pack = $.$mol_file.absolute(path);
            var target = pack.resolve("-/package.json");
            var targetMap = pack.resolve("-/package.json");
            var sources = this.sourcesAll({ path: path, exclude: exclude.filter(function (ex) { return ex !== 'test' && ex !== 'dev'; }) });
            var json = {
                name: pack.relate(this.root()).replace(/\//g, '_'),
                version: '0.0.0',
                main: 'node.js',
                dependencies: {}
            };
            for (var _i = 0, sources_3 = sources; _i < sources_3.length; _i++) {
                var src = sources_3[_i];
                var deps = this.srcDeps(src.path());
                for (var dep in deps) {
                    if (!/^\/node(?:_modules)?\//.test(dep))
                        continue;
                    var mod = dep.replace(/^\/node(?:_modules)?\//, '').replace(/\/.*/g, '');
                    json.dependencies[mod] = "*";
                }
            }
            target.content(JSON.stringify(json, null, '  '));
            this.logBundle(target);
            return [target];
        };
        $mol_build.prototype.bundleFiles = function (_a) {
            var _this = this;
            var path = _a.path, exclude = _a.exclude;
            var root = this.root();
            var pack = $.$mol_file.absolute(path);
            var sources = this.sourcesAll({ path: path, exclude: exclude })
                .filter(function (src) { return /meta.tree$/.test(src.ext()); });
            if (sources.length === 0)
                return [];
            var targets = [];
            sources.forEach(function (source) {
                var tree = $.$mol_tree.fromString(source.content(), source.path());
                tree.select('deploy').sub.forEach(function (deploy) {
                    var file = root.resolve(deploy.value.replace(/^\//, ''));
                    var target = pack.resolve("-/" + file.relate(root));
                    target.content(file.content());
                    targets.push(target);
                    _this.logBundle(target);
                });
            });
            return targets;
        };
        $mol_build.prototype.bundleCordova = function (_a) {
            var path = _a.path, exclude = _a.exclude;
            var pack = $.$mol_file.absolute(path);
            var cordova = pack.resolve('-cordova');
            var config = pack.resolve('config.xml');
            if (!config.exists())
                return [];
            var config_target = cordova.resolve('config.xml');
            config_target.content(config.content());
            var html = pack.resolve('index.html');
            var html_target = cordova.resolve('www/index.html');
            html_target.content(html.content());
            var sources = pack.resolve('-').find().filter(function (src) { return src.type() === 'file'; });
            var targets = [config_target, html_target]
                .concat(sources.map(function (source) {
                var target = cordova.resolve("www/" + source.relate(pack));
                target.content(source.content());
                return target;
            }));
            this.logBundle(cordova);
            return targets;
        };
        $mol_build.prototype.bundleCSS = function (_a) {
            var path = _a.path, exclude = _a.exclude, bundle = _a.bundle;
            if (bundle === 'node')
                return [];
            var pack = $.$mol_file.absolute(path);
            var sources = this.sourcesCSS({ path: path, exclude: exclude });
            if (!sources.length)
                return [];
            var target = pack.resolve("-/" + bundle + ".css");
            var targetMap = pack.resolve("-/" + bundle + ".css.map");
            var root = null;
            sources.forEach(function (src) {
                var root2 = $node['postcss'].parse(src.content(), { from: src.path() });
                root = root ? root.append(root2) : root2;
            });
            var cssnext = $node['postcss-cssnext'];
            var processor = $node['postcss'](cssnext(null, {
                features: {
                    customProperties: {
                        preserve: true
                    }
                }
            }).plugins);
            var result = processor.process(root, { to: target.relate(), map: { inline: false } });
            target.content(result.css);
            targetMap.content(JSON.stringify(result.map, null, '\t'));
            this.logBundle(target);
            return [target, targetMap];
        };
        $mol_build.prototype.bundleLocale = function (_a) {
            var _this = this;
            var path = _a.path, exclude = _a.exclude, bundle = _a.bundle;
            var pack = $.$mol_file.absolute(path);
            var sources = this.sourcesAll({ path: path, exclude: exclude }).filter(function (src) { return /(locale(?:=\w+)?\.json)$/.test(src.name()); });
            if (!sources.length)
                return [];
            var locales = { 'en': {} };
            sources.forEach(function (src) {
                var _a = /locale(?:=(\w+))?\.json$/.exec(src.name()), ext = _a[0], _b = _a[1], lang = _b === void 0 ? '' : _b;
                if (!locales[lang])
                    locales[lang] = {};
                var loc = JSON.parse(src.content());
                for (var key in loc) {
                    locales[lang][key] = loc[key];
                }
            });
            var targets = Object.keys(locales).map(function (lang) {
                var ext = lang ? "locale=" + lang + ".json" : "locale.json";
                var target = pack.resolve("-/" + bundle + "." + ext);
                var locale = locales[lang];
                if (locales['']) {
                    for (var key in locales['']) {
                        if (locale[key])
                            continue;
                        locale[key] = locales[''][key];
                    }
                }
                target.content(JSON.stringify(locales[lang], null, '\t'));
                _this.logBundle(target);
                return target;
            });
            return targets;
        };
        $mol_build.prototype.bundleDepsJSON = function (_a) {
            var _this = this;
            var path = _a.path, exclude = _a.exclude, bundle = _a.bundle;
            var pack = $.$mol_file.absolute(path);
            var list = this.sourcesAll({ path: path, exclude: exclude });
            if (!list.length)
                return [];
            var graph = this.graph({ path: path, exclude: exclude });
            var deps = {};
            for (var dep in graph.nodes) {
                deps[dep] = this.dependencies({ path: this.root().resolve(dep).path(), exclude: exclude });
            }
            var data = {
                files: list.map(function (src) { return src.relate(_this.root()); }),
                edgesIn: graph.edgesIn,
                edgesOut: graph.edgesOut,
                deps: deps
            };
            var target = pack.resolve("-/" + bundle + ".deps.json");
            target.content(JSON.stringify(data));
            this.logBundle(target);
            return [target];
        };
        $mol_build.dependors = {};
        __decorate([
            $.$mol_mem
        ], $mol_build.prototype, "server", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_build.prototype, "mods", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_build.prototype, "modsRecursive", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_build.prototype, "sources", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_build.prototype, "sourcesSorted", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_build.prototype, "sourcesAll", null);
        __decorate([
            $.$mol_mem
        ], $mol_build.prototype, "tsOptions", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_build.prototype, "tsSource", null);
        __decorate([
            $.$mol_mem
        ], $mol_build.prototype, "tsHost", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_build.prototype, "sourcesJS", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_build.prototype, "sourcesDTS", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_build.prototype, "sourcesCSS", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_build.prototype, "srcDeps", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_build.prototype, "modDeps", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_build.prototype, "dependencies", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_build.prototype, "packEnsure", null);
        __decorate([
            $.$mol_mem
        ], $mol_build.prototype, "packMapping", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_build.prototype, "graph", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_build.prototype, "bundle", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_build.prototype, "bundleJS", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_build.prototype, "bundleTestJS", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_build.prototype, "bundleDTS", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_build.prototype, "bundleViewTree", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_build.prototype, "bundlePackageJSON", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_build.prototype, "bundleFiles", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_build.prototype, "bundleCordova", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_build.prototype, "bundleCSS", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_build.prototype, "bundleLocale", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_build.prototype, "bundleDepsJSON", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_build, "root", null);
        return $mol_build;
    }($.$mol_object));
    $.$mol_build = $mol_build;
    function $mol_build_depsMerge(target, source) {
        for (var path in source) {
            if (target[path] >= source[path])
                continue;
            target[path] = source[path];
        }
        return target;
    }
    $mol_build.dependors['ts'] = $mol_build.dependors['tsx'] = $mol_build.dependors['jam.js'] = function (source) {
        var depends = {};
        if (/[jt]sx$/.test(source.ext())) {
            depends['/mol/dom/jsx'] = 0;
        }
        var lines = String(source.content())
            .replace(/\/\*[^]*?\*\//g, '')
            .replace(/\/\/.*$/gm, '')
            .split('\n');
        lines.forEach(function (line) {
            var indent = /^([\s\t]*)/.exec(line);
            var priority = -indent[0].replace(/\t/g, '    ').length / 4;
            line.replace(/\$\.?(([a-z][a-z0-9]+)(?:[._][a-z0-9]+|\[\s*['"](?:[^\/]*?)['"]\s*\])*)/ig, function (str, name, pack) {
                if (pack === 'node')
                    return str;
                $mol_build_depsMerge(depends, (_a = {}, _a['/' + name.replace(/[_.\[\]'"]+/g, '/')] = priority, _a));
                return str;
                var _a;
            });
            line.replace(/\$node\[\s*['"](.*?)['"]\s*\]/ig, function (str, path) {
                $mol_build_depsMerge(depends, (_a = {}, _a['/node/' + path] = priority, _a));
                return str;
                var _a;
            });
            line.replace(/require\(\s*['"](.*?)['"]\s*\)/ig, function (str, path) {
                $mol_build_depsMerge(depends, (_a = {}, _a[path] = priority, _a));
                return str;
                var _a;
            });
        });
        return depends;
    };
    $mol_build.dependors['view.ts'] = function (source) {
        var treeName = source.name().replace(/ts$/, 'tree');
        var depends = (_a = {}, _a[treeName] = 0, _a);
        $mol_build_depsMerge(depends, $mol_build.dependors['ts'](source));
        return depends;
        var _a;
    };
    $mol_build.dependors['css'] = $mol_build.dependors['view.css'] = function (source) {
        var depends = {};
        var lines = String(source.content())
            .replace(/\/\*[^]*?\*\//g, '')
            .replace(/\/\/.*$/gm, '')
            .split('\n');
        lines.forEach(function (line) {
            var indent = /^([\s\t]*)/.exec(line);
            var priority = -indent[0].replace(/\t/g, '    ').length / 4;
            line.replace(/(?:--|[\[\.#])([a-z][a-z0-9]+(?:[-_][a-z0-9]+)+)/ig, function (str, name) {
                $mol_build_depsMerge(depends, (_a = {}, _a['/' + name.replace(/[._-]/g, '/')] = priority, _a));
                return str;
                var _a;
            });
        });
        return depends;
    };
    $mol_build.dependors['meta.tree'] = function (source) {
        var depends = {};
        var tree = $.$mol_tree.fromString(source.content(), source.path());
        tree.select('require').sub.forEach(function (leaf) {
            depends[leaf.value] = 0;
        });
        tree.select('include').sub.forEach(function (leaf) {
            depends[leaf.value] = Number.NEGATIVE_INFINITY;
        });
        return depends;
    };
})($ || ($ = {}));
//build.node.js.map
;
var __extends = (this && this.__extends) || (function () {
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
    var $mol_server = (function (_super) {
        __extends($mol_server, _super);
        function $mol_server() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_server.prototype.express = function () {
            var _this = this;
            var express = $node['express']();
            this.expressHandlers().forEach(function (plugin) { return express.use(plugin); });
            $node['portastic'].find({
                min: this.port(),
                max: this.port() + 1000,
                retrieve: 1
            }).then(function (ports) {
                express.listen(ports[0]);
                console.log(_this.messageStart(ports[0]));
            });
            return express;
        };
        $mol_server.prototype.messageStart = function (port) {
            return this + " started at http://127.0.0.1:" + port + "/";
        };
        $mol_server.prototype.expressHandlers = function () {
            return [].concat.apply([], [
                this.expressCompressor(),
                this.expressBodier(),
                this.expressGenerator(),
                this.expressFiler(),
                this.expressDirector(),
            ]);
        };
        $mol_server.prototype.expressCompressor = function () {
            return $node['compression']();
        };
        $mol_server.prototype.expressBodier = function () {
            return $node['body-parser'].json({
                limit: this.bodyLimit()
            });
        };
        $mol_server.prototype.expressFiler = function () {
            return $node['express'].static($node.path.resolve(this.rootPublic()), {
                maxAge: this.cacheTime()
            });
        };
        $mol_server.prototype.expressDirector = function () {
            return $node['serve-index'](this.rootPublic(), { icons: true });
        };
        $mol_server.prototype.expressGenerator = function () {
            return function (req, res, next) { return next(); };
        };
        $mol_server.prototype.bodyLimit = function () {
            return '1mb';
        };
        $mol_server.prototype.cacheTime = function () {
            return 1000 * 60 * 60 * 24 * 365 * 1000;
        };
        $mol_server.prototype.port = function () {
            return 80;
        };
        $mol_server.prototype.rootPublic = function () {
            return '.';
        };
        __decorate([
            $.$mol_mem
        ], $mol_server.prototype, "express", null);
        return $mol_server;
    }($.$mol_object));
    $.$mol_server = $mol_server;
})($ || ($ = {}));
//server.node.js.map
;
var __extends = (this && this.__extends) || (function () {
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
    var $mol_build_server = (function (_super) {
        __extends($mol_build_server, _super);
        function $mol_build_server() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_build_server.prototype.expressGenerator = function () {
            var _this = this;
            return function (req, res, next) {
                try {
                    return _this.generator(req.url).valueOf() && next();
                }
                catch (error) {
                    if (req.url.match(/\.js$/)) {
                        res.send("console.error( " + JSON.stringify(error.message) + " )").end();
                    }
                    else if (req.url.match(/\.css$/)) {
                        var message = JSON.stringify(error.message.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, ''))
                            .replace(/\\n/g, '\\a')
                            .replace(/\\t/g, '\\9');
                        res.setHeader('content-type', 'text/css');
                        res.send("body:before{ display: block; font: 1em monospace; white-space: pre-wrap; color: red; content : " + message + " }").end();
                    }
                    else {
                        throw error;
                    }
                }
            };
        };
        $mol_build_server.prototype.build = function () {
            return null;
        };
        $mol_build_server.prototype.generator = function (path) {
            var matched = path.match(/^((?:\/\w+)+)\/-\/(\w+(?:.\w+)+)$/);
            if (!matched)
                return [];
            var build = this.build();
            var path = matched[0], path = matched[1], bundle = matched[2];
            path = build.root().resolve(path).path();
            return build.bundle({ path: path, bundle: bundle });
        };
        $mol_build_server.prototype.port = function () {
            return 8080;
        };
        __decorate([
            $.$mol_mem_key
        ], $mol_build_server.prototype, "generator", null);
        return $mol_build_server;
    }($.$mol_server));
    $.$mol_build_server = $mol_build_server;
})($ || ($ = {}));
//server.node.js.map
;
var $;
(function ($) {
    function $mol_build_start(paths) {
        var build = $.$mol_build.relative('.');
        if (paths.length > 0) {
            process.argv.slice(2).forEach(function (path) {
                path = build.root().resolve(path).path();
                build.bundle({ path: path }).valueOf();
            });
        }
        else {
            build.server().express();
        }
    }
    $.$mol_build_start = $mol_build_start;
    setImmediate(function () {
        $mol_build_start(process.argv.slice(2));
    });
})($ || ($ = {}));
//start.node.js.map
//# sourceMappingURL=node.test.js.map