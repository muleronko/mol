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
var $node = new Proxy({}, { get: function (target, field, wrapper) {
        return require(field);
    } });
//node.node.js.map
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
    $.$mol_test({
        'Make html:span': function () {
            var dom = $.$mol_dom_make('$mol_dom_make_test');
            $.$mol_assert_equal(dom.outerHTML, '<span id="$mol_dom_make_test"></span>');
        },
        'Make svg:svg': function () {
            var dom = $.$mol_dom_make('$mol_dom_make_test', 'svg', 'http://www.w3.org/2000/svg');
            $.$mol_assert_equal(dom.outerHTML, '<svg id="$mol_dom_make_test"></svg>');
        },
        'Make to exists element': function () {
            var body = $.$mol_dom_context.document.body;
            var dom = $.$mol_dom_make('$mol_dom_make_test');
            try {
                body.appendChild(dom);
                $.$mol_assert_equal(dom, $.$mol_dom_make('$mol_dom_make_test'));
            }
            finally {
                body.removeChild(dom);
            }
        },
    });
})($ || ($ = {}));
//make.test.js.map
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
var $;
(function ($) {
    $.$mol_test({
        'Make empty div': function () {
            $.$mol_assert_equal(($.$mol_dom_jsx("div", null)).outerHTML, '<div></div>');
        },
        'Make input with id and value': function () {
            var dom = $.$mol_dom_jsx("input", { id: "$mol_dom_make_test", value: 123 });
            $.$mol_assert_equal(dom.outerHTML, '<input id="$mol_dom_make_test">');
            $.$mol_assert_equal(dom.value, '123');
        },
        'Make content': function () {
            var id = '$mol_dom_make_test';
            var dom = $.$mol_dom_jsx("div", null,
                "hello",
                $.$mol_dom_jsx("strong", null, "world"),
                "!");
            $.$mol_assert_equal(dom.outerHTML, '<div>' +
                'hello' +
                '<strong>world</strong>' +
                '!' +
                '</div>');
        },
        'Make to exists element': function () {
            var dom1 = $.$mol_dom_jsx("div", { id: "$mol_dom_make_test" });
            $.$mol_dom_context.document.body.appendChild(dom1);
            var dom2 = $.$mol_dom_jsx("div", { id: "$mol_dom_make_test" }, "hello");
            $.$mol_dom_context.document.body.removeChild(dom1);
            $.$mol_assert_equal(dom1, dom2);
            $.$mol_assert_equal(dom1.outerHTML, '<div id="$mol_dom_make_test">hello</div>');
        },
    });
})($ || ($ = {}));
//jsx.test.js.map
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
//# sourceMappingURL=node.test.js.map