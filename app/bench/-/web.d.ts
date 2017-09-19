declare class WeakMap<Key, Value> {
    delete(key: Key): boolean;
    get(key: Key): Value;
    has(key: Key): boolean;
    set(key: Key, value: Value): Map<Key, Value>;
}
declare class Map<Key, Value> {
    clear(): void;
    delete(key: Key): boolean;
    forEach<Context = any>(handler: (this: Context, value: Value, key: Key, map: Map<Key, Value>) => void, context?: Context): void;
    get(key: Key): Value;
    has(key: Key): boolean;
    set(key: Key, value: Value): Map<Key, Value>;
    size: number;
}
declare class Set<Value> {
    add(value: Value): Set<Value>;
    clear(): void;
    delete(value: Value): boolean;
    forEach<Context = any>(handler: (this: Context, value: Value, key: Value, map: Set<Value>) => void, context?: Context): void;
    has(value: Value): boolean;
    size: number;
}
interface Function {
    name: string;
}
declare namespace $ {
    var $mol_func_name_dict: WeakMap<Function, string>;
    function $mol_func_name(func: Function): string;
}
declare namespace $ {
    function $mol_deprecated<Host, Method extends Function>(message: string): (host: Host, field: string, descr: TypedPropertyDescriptor<Method>) => void;
}
declare namespace $ {
    function $mol_log(path: string, values: any[]): void;
    namespace $mol_log {
        function filter(next?: string): string;
        function debug(next?: string): string;
    }
}
declare namespace $ {
    class $mol_object {
        Class(): any;
        static toString(): string;
        private 'object_owner()';
        object_owner(next?: Object): Object;
        private 'object_field()';
        object_field(next?: string): string;
        toString(): string;
        toJSON(): string;
        static make<Instance>(this: {
            new (): Instance;
        }, config: Partial<Instance>): Instance;
        setup(script: (obj: this) => void): this;
        'destroyed()': boolean;
        destroyed(next?: boolean): boolean;
        log(values: any[]): void;
    }
}
declare namespace $ {
    class $mol_defer extends $mol_object {
        run: () => void;
        constructor(run: () => void);
        destroyed(next?: boolean): boolean;
        static all: $mol_defer[];
        static timer: number;
        static scheduleNative: (handler: () => void) => number;
        static schedule(): void;
        static unschedule(): void;
        static add(defer: $mol_defer): void;
        static drop(defer: $mol_defer): void;
        static run(): void;
    }
}
declare namespace $ {
    var $mol_state_stack: Map<string, any>;
}
declare var Proxy: any;
declare namespace $ {
    enum $mol_atom_status {
        obsolete = "obsolete",
        checking = "checking",
        pulling = "pulling",
        actual = "actual",
    }
    class $mol_atom<Value = null> extends $mol_object {
        masters: Set<$mol_atom<any>> | null;
        slaves: Set<$mol_atom<any>> | null;
        status: $mol_atom_status;
        autoFresh: boolean;
        handler: (next?: Value | Error, force?: $mol_atom_force) => Value | void;
        host: {
            [key: string]: any;
        };
        field: string;
        'value()': Value | Error;
        constructor(host: any, handler?: (next?: Value, force?: $mol_atom_force) => Value | void, field?: string);
        destroyed(next?: boolean): boolean;
        unlink(): void;
        toString(): string;
        get(force?: $mol_atom_force): Value;
        actualize(force?: $mol_atom_force): void;
        pull(force?: $mol_atom_force): any;
        _next?: Value | Error;
        set(next: Value): Value;
        normalize(next: Value, prev?: Value | Error): Value;
        push(next_raw?: Value | Error): Value;
        obsolete_slaves(): void;
        check_slaves(): void;
        check(): void;
        obsolete(): void;
        lead(slave: $mol_atom<any>): void;
        dislead(slave: $mol_atom<any>): void;
        obey(master: $mol_atom<any>): void;
        disobey(master: $mol_atom<any>): void;
        disobey_all(): void;
        value(next?: Value, force?: $mol_atom_force): Value;
        static stack: $mol_atom<any>[];
        static updating: $mol_atom<any>[];
        static reaping: Set<$mol_atom<any>>;
        static scheduled: boolean;
        static actualize(atom: $mol_atom<any>): void;
        static reap(atom: $mol_atom<any>): void;
        static unreap(atom: $mol_atom<any>): void;
        static schedule(): void;
        static sync(): void;
        then<Next>(done: (prev?: Value) => Next, fail?: (error: Error) => Next): $mol_atom<any>;
        catch(fail: (error: Error) => Value): $mol_atom<any>;
    }
    class $mol_atom_wait extends Error {
        name: string;
        constructor(message?: string);
    }
    class $mol_atom_force extends Object {
        $mol_atom_force: boolean;
        static $mol_atom_force: boolean;
    }
}
declare namespace $ {
    function $mol_mem<Host, Value>(obj?: Host, name?: string, descr?: TypedPropertyDescriptor<(next?: Value, force?: $mol_atom_force) => Value>): TypedPropertyDescriptor<(next?: Value, force?: $mol_atom_force) => Value>;
    function $mol_mem_key<Host, Key, Value>(obj: Host, name: string, descr: TypedPropertyDescriptor<(key: Key, next?: Value, force?: $mol_atom_force) => Value>): TypedPropertyDescriptor<(key: Key, next?: Value, force?: $mol_atom_force) => Value>;
}
declare namespace $ {
    class $mol_window extends $mol_object {
        static size(next?: {
            width: number;
            height: number;
        }): {
            width: number;
            height: number;
        };
    }
}
declare namespace $ {
    var $mol_dom_context: Window & {
        Node: typeof Node;
        Element: typeof Element;
        HTMLElement: typeof HTMLElement;
        XMLHttpRequest: typeof XMLHttpRequest;
    };
}
declare namespace $ {
}
declare namespace $ {
    function $mol_dom_render_fields(el: Element, fields: {
        [key: string]: any;
    }): void;
    function $mol_dom_render_children(el: Element, childNodes: NodeList | Array<Node | string | number | boolean | {
        dom_tree: () => Node;
    }>): void;
    function $mol_dom_render_attributes(el: Element, attrs: {
        [key: string]: string | number | boolean;
    }): void;
    function $mol_dom_render_styles(el: Element, styles: {
        [key: string]: string | number;
    }): void;
    function $mol_dom_render_events(el: Element, events: {
        [key: string]: (event: Event) => any;
    }): void;
    function $mol_dom_render_events_async(el: Element, events: {
        [key: string]: (event: Event) => any;
    }): void;
    function $mol_dom_render_events_detach(el: Element, events: {
        [key: string]: (event: Event) => any;
    }): void;
}
declare namespace $ {
    namespace $$ {
    }
    namespace $mol {
    }
    type $mol_view_context = (Window) & (typeof $.$$) & (typeof $);
    function $mol_view_visible_width(): number;
    function $mol_view_visible_height(): number;
    function $mol_view_state_key(suffix: string): string;
    class $mol_view extends $mol_object {
        static Root(id: number): $mol_view;
        title(): string;
        focused(next?: boolean): boolean;
        context(next?: $mol_view_context): any;
        $: $mol_view_context;
        context_sub(): any;
        state_key(suffix?: string): string;
        dom_name(): string;
        dom_name_space(): string;
        sub(): (string | number | boolean | Node | $mol_view)[];
        sub_visible(): (string | number | boolean | Node | $mol_view)[];
        minimal_width(): number;
        minimal_height(): number;
        content_height(): number;
        dom_node(next?: Element): Element;
        dom_tree(): Element;
        render(): void;
        static view_classes(): (typeof $mol_view)[];
        view_names_owned(): string[];
        view_names(): string[];
        attr_static(): {
            [key: string]: string | number | boolean;
        };
        attr(): {
            [key: string]: string | number | boolean;
        };
        style(): {
            [key: string]: string | number;
        };
        field(): {
            [key: string]: any;
        };
        event(): {
            [key: string]: (event: Event) => void;
        };
        event_async(): {
            [key: string]: (event: Event) => void;
        };
        'locale_contexts()': string[];
        locale_contexts(): string[];
        plugins(): $mol_view[];
    }
}
interface Window {
    cordova: any;
}
declare namespace $ {
}
declare namespace $ {
    class $mol_view_selection extends $mol_object {
        static focused(next?: Element[], force?: $mol_atom_force): Element[];
        static position(...diff: any[]): any;
        static onFocus(event: FocusEvent): void;
        static onBlur(event: FocusEvent): void;
    }
}
declare namespace $ {
}
declare namespace $ {
    enum $mol_keyboard_code {
        backspace = 8,
        tab = 9,
        enter = 13,
        shift = 16,
        ctrl = 17,
        alt = 18,
        pause = 19,
        capsLock = 20,
        escape = 27,
        space = 32,
        pageUp = 33,
        pageDown = 34,
        end = 35,
        home = 36,
        left = 37,
        up = 38,
        right = 39,
        down = 40,
        insert = 45,
        delete = 46,
        key0 = 48,
        key1 = 49,
        key2 = 50,
        key3 = 51,
        key4 = 52,
        key5 = 53,
        key6 = 54,
        key7 = 55,
        key8 = 56,
        key9 = 57,
        A = 65,
        B = 66,
        C = 67,
        D = 68,
        E = 69,
        F = 70,
        G = 71,
        H = 72,
        I = 73,
        J = 74,
        K = 75,
        L = 76,
        M = 77,
        N = 78,
        O = 79,
        P = 80,
        Q = 81,
        R = 82,
        S = 83,
        T = 84,
        U = 85,
        V = 86,
        W = 87,
        X = 88,
        Y = 89,
        Z = 90,
        metaLeft = 91,
        metaRight = 92,
        select = 93,
        numpad0 = 96,
        numpad1 = 97,
        numpad2 = 98,
        numpad3 = 99,
        numpad4 = 100,
        numpad5 = 101,
        numpad6 = 102,
        numpad7 = 103,
        numpad8 = 104,
        numpad9 = 105,
        multiply = 106,
        add = 107,
        subtract = 109,
        decimal = 110,
        divide = 111,
        F1 = 112,
        F2 = 113,
        F3 = 114,
        F4 = 115,
        F5 = 116,
        F6 = 117,
        F7 = 118,
        F8 = 119,
        F9 = 120,
        F10 = 121,
        F11 = 122,
        F12 = 123,
        numLock = 144,
        scrollLock = 145,
        semicolon = 186,
        equals = 187,
        comma = 188,
        dash = 189,
        period = 190,
        forwardSlash = 191,
        graveAccent = 192,
        bracketOpen = 219,
        slashBack = 220,
        bracketClose = 221,
        quoteSingle = 222,
    }
}
declare namespace $ {
    class $mol_button extends $mol_view {
        enabled(): boolean;
        minimal_height(): number;
        event(): {
            "click": (event?: any) => any;
            "keypress": (event?: any) => any;
        };
        event_activate(event?: any, force?: $mol_atom_force): any;
        event_click(event?: any, force?: $mol_atom_force): any;
        event_key_press(event?: any, force?: $mol_atom_force): any;
        attr(): {
            "disabled": boolean;
            "role": string;
            "tabindex": number;
            "title": string;
        };
        disabled(): boolean;
        tab_index(): number;
        hint(): string;
        sub(): any[];
    }
}
declare namespace $.$$ {
    class $mol_button extends $.$mol_button {
        disabled(): boolean;
        event_activate(next: Event): void;
        event_key_press(event: KeyboardEvent): void;
        tab_index(): number;
    }
}
declare namespace $ {
    class $mol_button_typed extends $mol_button {
    }
}
declare namespace $ {
    class $mol_button_major extends $mol_button_typed {
    }
}
declare namespace $ {
    class $mol_button_minor extends $mol_button_typed {
    }
}
declare namespace $ {
    class $mol_button_danger extends $mol_button_typed {
    }
}
declare namespace $ {
    class $mol_scroll extends $mol_view {
        minimal_height(): number;
        field(): {
            "scrollTop": any;
            "scrollLeft": any;
            "scrollBottom": any;
            "scrollRight": any;
        };
        scroll_top(val?: any, force?: $mol_atom_force): any;
        scroll_left(val?: any, force?: $mol_atom_force): any;
        scroll_bottom(val?: any, force?: $mol_atom_force): any;
        scroll_right(val?: any, force?: $mol_atom_force): any;
        event_async(): {
            "scroll": (event?: any) => any;
        };
        event_scroll(event?: any, force?: $mol_atom_force): any;
        Strut(): $mol_view;
        strut_transform(): string;
    }
}
declare namespace $.$$ {
    function $mol_scroll_top(): number;
    function $mol_scroll_left(): number;
    function $mol_scroll_moving(): boolean;
    class $mol_scroll extends $.$mol_scroll {
        scroll_bottom(next?: number): number;
        scroll_right(next?: number): number;
        event_scroll(next?: Event): void;
        event_repos(next?: Event): void;
        _moving_task_timer: number;
        moving_task_stop(): void;
        moving(next?: boolean): boolean;
        context_sub(): $mol_view_context;
        strut_transform(): string;
        sub_visible(): (string | number | boolean | Node | $mol_view)[];
    }
}
declare namespace $ {
    class $mol_state_session<Value> extends $mol_object {
        static 'native()': Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>;
        static native(): {
            getItem(key: string): any;
            setItem(key: string, value: string): void;
            removeItem(key: string): void;
        };
        static value<Value>(key: string, next?: Value): Value;
        prefix(): string;
        value(key: string, next?: Value): Value;
    }
}
declare namespace $ {
    class $mol_page extends $mol_view {
        sub(): any[];
        Head(): $mol_view;
        head(): any[];
        Title(): $mol_button;
        event_top(val?: any, force?: $mol_atom_force): any;
        Tools(): $mol_view;
        tools(): any[];
        Body(): $mol_scroll;
        body_scroll_top(val?: any, force?: $mol_atom_force): any;
        body(): any[];
        Foot(): $mol_view;
        foot(): any[];
    }
}
declare namespace $.$$ {
    class $mol_page extends $.$mol_page {
        body_scroll_top(next?: number): number;
        head(): ($mol_view | $.$mol_button)[];
    }
}
declare namespace $ {
    class $mol_state_local<Value> extends $mol_object {
        static 'native()': Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>;
        static native(): {
            getItem(key: string): any;
            setItem(key: string, value: string): void;
            removeItem(key: string): void;
        };
        static value<Value>(key: string, next?: Value, force?: $mol_atom_force): Value;
        prefix(): string;
        value(key: string, next?: Value): Value;
    }
}
declare namespace $ {
}
declare namespace $ {
    function $mol_const<Value>(value: Value): {
        (): Value;
        '()': Value;
    };
}
declare namespace $ {
    class $mol_http extends $mol_object {
        static resource(uri: string): $mol_http;
        static resource_absolute(uri: string): $mol_http;
        uri(): string;
        method_get(): string;
        method_put(): string;
        credentials(): {
            login?: string;
            password?: string;
        };
        headers(): {};
        'request()': XMLHttpRequest;
        request(): XMLHttpRequest;
        destroyed(next?: boolean): boolean;
        response(next?: any, force?: $mol_atom_force): XMLHttpRequest;
        text(next?: string, force?: $mol_atom_force): string;
        json<Content>(next?: Content, force?: $mol_atom_force): Content;
    }
}
declare namespace $ {
    class $mol_http_resource extends $mol_http {
        static item(uri: string): $mol_http;
    }
    class $mol_http_resource_json {
        static item(uri: string): $mol_http;
    }
}
declare namespace $ {
    class $mol_file extends $mol_object {
        static absolute(path: string): $mol_file;
        static relative(path: string): $mol_file;
        path(): string;
        parent(): $mol_file;
        name(): string;
        ext(): string;
        content(next?: string, force?: $mol_atom_force): string;
        resolve(path: string): $mol_file;
        relate(base?: any): void;
    }
}
declare namespace $ {
    interface $mol_locale_dict {
        [key: string]: string;
    }
    class $mol_locale extends $mol_object {
        static lang_default(): string;
        static lang(next?: string): string;
        static source(lang: string): any;
        static texts(next?: $mol_locale_dict): $mol_locale_dict;
        static text(contexts: string[], key: string): string;
    }
}
declare namespace $ {
    class $mol_bar extends $mol_view {
    }
}
declare namespace $ {
    class $mol_state_time extends $mol_object {
        static now(precision?: number, next?: number, force?: $mol_atom_force): number;
    }
}
declare namespace $ {
    class $mol_meter extends $mol_view {
        width(val?: any, force?: $mol_atom_force): any;
        height(val?: any, force?: $mol_atom_force): any;
        left(val?: any, force?: $mol_atom_force): any;
        right(val?: any, force?: $mol_atom_force): any;
        bottom(val?: any, force?: $mol_atom_force): any;
        top(val?: any, force?: $mol_atom_force): any;
    }
}
declare namespace $.$$ {
    class $mol_meter extends $.$mol_meter {
        dom_node(): Element;
        rect(): ClientRect;
        top(): number;
        bottom(): number;
        left(): number;
        right(): number;
        width(): number;
        height(): number;
    }
}
declare namespace $ {
    class $mol_pop extends $mol_view {
        showed(val?: any, force?: $mol_atom_force): any;
        plugins(): any[];
        top(): any;
        bottom(): any;
        left(): any;
        right(): any;
        Meter(): $mol_meter;
        sub(): any[];
        Anchor(): any;
        Bubble(): $mol_pop_bubble;
        align(): string;
        bubble_content(): any[];
        height_max(): number;
    }
}
declare namespace $ {
    class $mol_pop_bubble extends $mol_scroll {
        sub(): any[];
        content(): any[];
        style(): {
            "maxHeight": number;
        };
        height_max(): number;
        attr(): {
            "mol_pop_align": string;
            "tabindex": number;
        };
        align(): string;
    }
}
declare namespace $.$$ {
    class $mol_pop extends $.$mol_pop {
        sub(): any[];
        height_max(): number;
        align(): string;
    }
}
declare namespace $ {
    class $mol_dimmer extends $mol_view {
        haystack(): string;
        needle(): string;
        sub(): any[];
        parts(): any[];
        Low(id: any): $mol_view;
        string(id: any): string;
    }
}
declare namespace $.$$ {
    class $mol_dimmer extends $.$mol_dimmer {
        parts(): any[];
        strings(): string[];
        string(index: number): string;
    }
}
declare namespace $ {
    class $mol_plugin extends $mol_view {
    }
}
declare namespace $.$$ {
    class $mol_plugin extends $.$mol_plugin {
        'dom_node()': Element;
        dom_node(): Element;
    }
}
declare namespace $ {
    class $mol_nav extends $mol_plugin {
        cycle(val?: any, force?: $mol_atom_force): any;
        keys_x(val?: any, force?: $mol_atom_force): any;
        keys_y(val?: any, force?: $mol_atom_force): any;
        current_x(val?: any, force?: $mol_atom_force): any;
        current_y(val?: any, force?: $mol_atom_force): any;
        event_up(event?: any, force?: $mol_atom_force): any;
        event_down(event?: any, force?: $mol_atom_force): any;
        event_left(event?: any, force?: $mol_atom_force): any;
        event_right(event?: any, force?: $mol_atom_force): any;
        event(): {
            "keydown": (event?: any) => any;
        };
        event_key(event?: any, force?: $mol_atom_force): any;
    }
}
declare namespace $.$$ {
    class $mol_nav extends $.$mol_nav {
        event_key(event?: KeyboardEvent): void;
        event_up(event?: KeyboardEvent): void;
        event_down(event?: KeyboardEvent): void;
        event_left(event?: KeyboardEvent): void;
        event_right(event?: KeyboardEvent): void;
        index_y(): any;
        index_x(): any;
    }
}
declare namespace $ {
    class $mol_string extends $mol_view {
        dom_name(): string;
        enabled(): boolean;
        debounce(): number;
        minimal_height(): number;
        field(): {
            "disabled": boolean;
            "value": any;
            "placeholder": string;
            "type": any;
        };
        disabled(): boolean;
        value_changed(val?: any, force?: $mol_atom_force): any;
        value(val?: any, force?: $mol_atom_force): any;
        hint(): string;
        type(val?: any, force?: $mol_atom_force): any;
        event(): {
            "input": (event?: any) => any;
            "keypress": (event?: any) => any;
        };
        event_change(event?: any, force?: $mol_atom_force): any;
        event_key_press(event?: any, force?: $mol_atom_force): any;
    }
}
declare namespace $.$$ {
    class $mol_string extends $.$mol_string {
        _timer: number;
        event_change(next?: Event): void;
        event_key_press(next?: KeyboardEvent): void;
        disabled(): boolean;
    }
}
declare namespace $ {
    class $mol_svg extends $mol_view {
        dom_name(): string;
        dom_name_space(): string;
    }
}
declare namespace $ {
    class $mol_svg_root extends $mol_svg {
        dom_name(): string;
        attr(): {
            "viewBox": string;
            "preserveAspectRatio": string;
        };
        view_box(): string;
        aspect(): string;
    }
}
declare namespace $ {
    class $mol_svg_group extends $mol_svg {
        dom_name(): string;
    }
}
declare namespace $ {
    class $mol_svg_line extends $mol_svg {
        dom_name(): string;
        pos(): any[];
        from(): any[];
        to(): any[];
        attr(): {
            "x1": string;
            "y1": string;
            "x2": string;
            "y2": string;
        };
        from_x(): string;
        from_y(): string;
        to_x(): string;
        to_y(): string;
    }
}
declare namespace $ {
    class $mol_svg_path extends $mol_svg {
        dom_name(): string;
        attr(): {
            "d": string;
        };
        geometry(): string;
    }
}
declare namespace $ {
    class $mol_svg_circle extends $mol_svg {
        dom_name(): string;
        pos(): any[];
        attr(): {
            "r": string;
            "cx": string;
            "cy": string;
        };
        radius(): string;
        pos_x(): string;
        pos_y(): string;
    }
}
declare namespace $ {
    class $mol_svg_text extends $mol_svg {
        dom_name(): string;
        pos(): any[];
        attr(): {
            "x": string;
            "y": string;
            "text-anchor": string;
        };
        pos_x(): string;
        pos_y(): string;
        align(): string;
        sub(): any[];
        text(): string;
    }
}
declare namespace $.$$ {
    class $mol_svg_line extends $.$mol_svg_line {
        from(): any;
        from_x(): any;
        from_y(): any;
        to(): any;
        to_x(): any;
        to_y(): any;
    }
    class $mol_svg_circle extends $.$mol_svg_circle {
        pos_x(): any;
        pos_y(): any;
    }
    class $mol_svg_text extends $.$mol_svg_text {
        pos_x(): any;
        pos_y(): any;
    }
}
declare namespace $ {
    class $mol_icon extends $mol_svg_root {
        view_box(): string;
        sub(): any[];
        Path(): $mol_svg_path;
        path(): string;
    }
}
declare namespace $ {
    class $mol_icon_chevron extends $mol_icon {
        path(): string;
    }
}
declare namespace $ {
    class $mol_list extends $mol_view {
        sub(): any[];
        rows(): any[];
        Empty(): any;
    }
}
declare namespace $.$$ {
    class $mol_list extends $.$mol_list {
        sub(): any[];
        row_offsets(): number[];
        row_context(index: number): any;
        sub_visible(): any[];
        minimal_height(): number;
    }
}
declare namespace $ {
    function $mol_match_text<Variant>(query: string, values: (variant: Variant) => string[]): (variant: Variant) => boolean;
}
declare namespace $ {
    class $mol_select extends $mol_pop {
        dictionary(): {};
        options(): any[];
        value(val?: any, force?: $mol_atom_force): any;
        minimal_height(): number;
        Option_row(id: any): $mol_button_minor;
        event_select(id: any, event?: any, force?: $mol_atom_force): any;
        option_content(id: any): any[];
        Option_label(id: any): $mol_dimmer;
        option_label(id: any): string;
        filter_pattern(val?: any, force?: $mol_atom_force): any;
        No_options(): $mol_view;
        no_options_message(): string;
        plugins(): any[];
        Nav(): $mol_nav;
        nav_components(): any[];
        option_focused(component?: any, force?: $mol_atom_force): any;
        nav_cycle(val?: any, force?: $mol_atom_force): any;
        showed(): boolean;
        options_showed(): boolean;
        Anchor(): $mol_button_typed;
        Trigger(): $mol_button_typed;
        trigger_content(): any[];
        option_content_current(): any[];
        Filter(): $mol_string;
        filter_hint(): string;
        hint(): string;
        debounce(): number;
        Trigger_icon(): $mol_icon_chevron;
        bubble_content(): any[];
        Bubble_content(): $mol_list;
        option_rows(): any[];
    }
}
declare namespace $.$$ {
    class $mol_select extends $.$mol_select {
        filter_pattern(next?: string): string;
        options_showed(): boolean;
        options(): string[];
        options_filtered(): string[];
        option_label(id: string): any;
        option_rows(): $mol_view[] | $mol_button_minor[];
        option_focused(component?: $mol_view): $mol_view | $mol_button_minor;
        event_select(id: string, event?: MouseEvent): void;
        nav_components(): ($mol_view | $mol_button_minor)[];
        option_content_current(): any[];
        trigger_content(): any[];
    }
}
declare namespace $ {
    class $mol_icon_cross extends $mol_icon {
        path(): string;
    }
}
declare namespace $ {
    class $mol_search extends $mol_bar {
        query(val?: any, force?: $mol_atom_force): any;
        sub(): any[];
        Suggest(): $mol_select;
        suggest_selected(val?: any, force?: $mol_atom_force): any;
        hint(): string;
        suggests_showed(): boolean;
        suggests(): any[];
        debounce(): number;
        Clear(): $mol_button_minor;
        Clear_icon(): $mol_icon_cross;
        event_clear(val?: any, force?: $mol_atom_force): any;
    }
}
declare namespace $.$$ {
    class $mol_search extends $.$mol_search {
        suggests_showed(): boolean;
        suggest_selected(next?: string): void;
        sub(): ($mol_button_minor | $.$mol_select)[];
        event_clear(event?: Event): void;
    }
}
declare namespace $ {
    class $mol_float extends $mol_view {
        style(): {
            "transform": string;
        };
        shiftStyle(): string;
        attr(): {
            "mol_float_scrolling": boolean;
        };
        scrolling(): boolean;
    }
}
declare namespace $.$$ {
    class $mol_float extends $.$mol_float {
        shiftStyle(): string;
        scrolling(): boolean;
    }
}
declare namespace $ {
    class $mol_check extends $mol_button_typed {
        attr(): {
            "mol_check_checked": any;
            "aria-checked": any;
            "role": string;
            "disabled": boolean;
            "tabindex": number;
            "title": string;
        };
        checked(val?: any, force?: $mol_atom_force): any;
        sub(): any[];
        Icon(): any;
        label(): any[];
        Title(): $mol_view;
        title(): string;
    }
}
declare namespace $.$$ {
    class $mol_check extends $.$mol_check {
        event_click(next?: Event): void;
    }
}
declare namespace $ {
    class $mol_icon_tick extends $mol_icon {
        path(): string;
    }
}
declare namespace $ {
    class $mol_check_box extends $mol_check {
        Icon(): $mol_icon_tick;
    }
}
declare namespace $ {
    class $mol_check_expand extends $mol_check {
        minimal_height(): number;
        Icon(): $mol_icon_chevron;
        level(): number;
        style(): {
            "paddingLeft": string;
        };
        level_style(): string;
        checked(val?: any, force?: $mol_atom_force): any;
        expanded(val?: any, force?: $mol_atom_force): any;
        enabled(): boolean;
        expandable(): boolean;
    }
}
declare namespace $.$$ {
    class $mol_check_expand extends $.$mol_check_expand {
        level_style(): string;
        expandable(): boolean;
    }
}
declare namespace $ {
    class $mol_grid extends $mol_scroll {
        row_ids(): any[];
        row_id(index: any): any;
        col_ids(): any[];
        records(): {};
        record(id: any): any;
        hierarchy(): any;
        hierarchy_col(): string;
        sub(): any[];
        Table(): $mol_grid_table;
        gap_top(): number;
        rows_visible(): any[];
        rows(): any[];
        Head(): $mol_grid_row;
        row_height(): number;
        head_cells(): any[];
        Row(id: any): $mol_grid_row;
        cells(id: any): any[];
        cell(id: any): any;
        Cell_text(id: any): $mol_grid_cell;
        cell_content_text(id: any): any[];
        cell_content(id: any): any[];
        Cell_number(id: any): $mol_grid_number;
        cell_content_number(id: any): any[];
        Col_head(id: any): $mol_float;
        col_head_content(id: any): any[];
        Cell_branch(id: any): $mol_check_expand;
        cell_level(id: any): number;
        cell_expanded(id: any, val?: any, force?: $mol_atom_force): any;
        Cell_content(id: any): any[];
        Cell_dimmer(id: any): $mol_dimmer;
        needle(): string;
        cell_value(id: any): string;
    }
}
declare namespace $ {
    class $mol_grid_table extends $mol_view {
        dom_name(): string;
        style(): {
            "top": number;
        };
        offset(): number;
    }
}
declare namespace $ {
    class $mol_grid_gap extends $mol_view {
        style(): {
            "top": number;
        };
        offset(): number;
    }
}
declare namespace $ {
    class $mol_grid_row extends $mol_view {
        dom_name(): string;
        style(): {
            "height": number;
        };
        height(): number;
        sub(): any[];
        cells(): any[];
    }
}
declare namespace $ {
    class $mol_grid_cell extends $mol_view {
        dom_name(): string;
    }
}
declare namespace $ {
    class $mol_grid_number extends $mol_grid_cell {
    }
}
declare namespace $.$$ {
    interface $mol_grid_node {
        id: string;
        parent: $mol_grid_node;
        sub: $mol_grid_node[];
    }
    class $mol_grid extends $.$mol_grid {
        rows_visible(): any[];
        rows_visible_max(): number;
        view_window(): {
            top: number;
            bottom: number;
            count: number;
        };
        gap_top(): number;
        height(): number;
        content_height(): number;
        head_cells(): $.$mol_float[];
        col_head_content(colId: string): string[];
        rows(): $mol_grid_row[];
        cells(row_id: string[]): $mol_view[];
        col_type(col_id: string): "text" | "number" | "branch";
        Cell(id: {
            row: string[];
            col: string;
        }): $mol_view;
        cell_content(id: {
            row: string[];
            col: string;
        }): any[];
        records(): any;
        record(id: string): any;
        record_ids(): string[];
        row_id(index: number): string;
        col_ids(): string[];
        hierarchy(): {
            [id: string]: $mol_grid_node;
        };
        row_sub_ids(row: string[]): string[][];
        row_root_id(): string[];
        cell_level(id: {
            row: string[];
        }): number;
        row_ids(): string[][];
        row_expanded(row_id: string[], next?: boolean): boolean;
        row_expanded_default(row_id: string[]): boolean;
        cell_expanded(id: {
            row: string[];
        }, next?: boolean): boolean;
    }
    class $mol_grid_table extends $.$mol_grid_table {
        context_sub(): $mol_view_context;
    }
}
declare namespace $ {
    interface $mol_syntax_token {
        name: string;
        found: string;
        chunks: string[];
    }
    class $mol_syntax {
        constructor(lexems: {
            [name: string]: RegExp;
        });
        'lexems()': {
            [name: string]: RegExp;
        };
        lexems(): {
            [name: string]: RegExp;
        };
        'rules()': {
            regExp: RegExp;
            name: string;
            size: number;
        }[];
        rules(): {
            regExp: RegExp;
            name: string;
            size: number;
        }[];
        'regExp()': RegExp;
        regExp(): RegExp;
        tokenize(text: string): $mol_syntax_token[];
    }
}
declare namespace $ {
    var $mol_syntax_md_flow: $mol_syntax;
    var $mol_syntax_md_line: $mol_syntax;
    const $mol_syntax_md_code: $mol_syntax;
}
declare namespace $ {
    class $mol_text extends $mol_list {
        uri_base(): string;
        text(): string;
        Row(id: any): $mol_text_row;
        block_content(id: any): any[];
        block_type(id: any): string;
        Span(id: any): $mol_text_span;
        Link(id: any): $mol_text_link;
        Image(id: any): $mol_text_image;
        Header(id: any): $mol_text_header;
        header_level(id: any): number;
        header_content(id: any): any[];
        Table(id: any): $mol_grid;
        table_head_cells(id: any): any[];
        table_rows(id: any): any[];
        Table_row(id: any): $mol_grid_row;
        table_cells(id: any): any[];
        Table_cell(id: any): $mol_grid_cell;
        table_cell_content(id: any): any[];
        Table_cell_head(id: any): $mol_float;
    }
}
declare namespace $ {
    class $mol_text_row extends $mol_view {
        minimal_height(): number;
        attr(): {
            "mol_text_type": string;
        };
        type(): string;
    }
}
declare namespace $ {
    class $mol_text_header extends $mol_view {
        dom_name(): string;
        minimal_height(): number;
        attr(): {
            "mol_text_header_level": any;
        };
        level(val?: any, force?: $mol_atom_force): any;
        sub(): any[];
        content(): any[];
    }
}
declare namespace $ {
    class $mol_text_span extends $mol_view {
        dom_name(): string;
        attr(): {
            "mol_text_type": any;
        };
        type(val?: any, force?: $mol_atom_force): any;
        sub(): any;
        content(val?: any, force?: $mol_atom_force): any;
    }
}
declare namespace $ {
    class $mol_text_link extends $mol_view {
        dom_name(): string;
        attr(): {
            "mol_text_type": any;
            "href": any;
        };
        type(val?: any, force?: $mol_atom_force): any;
        link(val?: any, force?: $mol_atom_force): any;
        sub(): any;
        content(val?: any, force?: $mol_atom_force): any;
    }
}
declare namespace $ {
    class $mol_text_image extends $mol_view {
        dom_name(): string;
        attr(): {
            "mol_text_type": any;
            "data": any;
        };
        type(val?: any, force?: $mol_atom_force): any;
        link(val?: any, force?: $mol_atom_force): any;
        sub(): any[];
        title(val?: any, force?: $mol_atom_force): any;
    }
}
declare namespace $.$$ {
    class $mol_text extends $.$mol_text {
        tokens_flow(): $mol_syntax_token[];
        rows(): ($.$mol_grid | $mol_text_row | $mol_text_header)[];
        header_level(index: number): number;
        header_content(index: number): ($mol_text_span | $mol_text_image)[];
        block_type(index: number): string;
        cell_contents(indexBlock: number): string[][];
        table_rows(blockId: number): $mol_grid_row[];
        table_head_cells(blockId: number): $.$mol_float[];
        table_cells(id: {
            block: number;
            row: number;
        }): $mol_grid_cell[];
        table_cell_content(id: {
            block: number;
            row: number;
            cell: number;
        }): ($mol_text_span | $mol_text_image)[];
        uri_base(): string;
        uri_resolve(uri: string): string;
        text2spans(prefix: string, text: string): ($mol_text_span | $mol_text_image)[];
        code2spans(prefix: string, text: string): $mol_text_span[];
        block_content(indexBlock: number): ($mol_view | string)[];
    }
}
declare namespace $ {
    class $mol_row extends $mol_view {
    }
}
declare namespace $ {
    class $mol_row_sub extends $mol_view {
    }
}
declare namespace $.$$ {
    class $mol_row extends $.$mol_row {
        item_offsets_top(): number[];
        sub_visible(): (string | number | boolean | Node | $mol_view)[];
        minimal_height(): number;
    }
}
declare namespace $ {
    class $mol_portion_indicator extends $mol_view {
        style(): {
            "width": string;
        };
        width_style(): string;
    }
}
declare namespace $ {
    class $mol_portion extends $mol_view {
        portion(): number;
        sub(): any[];
        indicator(): $mol_portion_indicator;
        indicator_width_style(): string;
    }
}
declare namespace $.$$ {
    class $mol_portion extends $.$mol_portion {
        indicator_width_style(): string;
    }
}
declare namespace $ {
    class $mol_icon_sort_asc extends $mol_icon {
        path(): string;
    }
}
declare namespace $ {
    function $mol_merge_dict<Target, Source>(target: Target, source: Source): Target & Source;
}
declare namespace $ {
    class $mol_state_arg<Value> extends $mol_object {
        prefix: string;
        static href(next?: string, force?: $mol_atom_force): string;
        static dict(next?: {
            [key: string]: string;
        }): {
            [key: string]: string;
        };
        static value(key: string, next?: string): string;
        static link(next: {
            [key: string]: string;
        }): string;
        static make_link(next: {
            [key: string]: string;
        }): string;
        constructor(prefix?: string);
        value(key: string, next?: string): string;
        sub(postfix: string): $mol_state_arg<{}>;
        link(next: {
            [key: string]: string;
        }): string;
    }
}
declare namespace $ {
    class $mol_bench extends $mol_grid {
        result(): {};
        records(): any;
        result_sorted(): any;
        col_sort(val?: any, force?: $mol_atom_force): any;
        Col_head(id: any): $mol_bench_head;
        event_sort_toggle(id: any, val?: any, force?: $mol_atom_force): any;
        col_head_content(id: any): any[];
        col_head_label(id: any): any[];
        Col_head_sort(id: any): $mol_icon_sort_asc;
        cell_content_number(id: any): any[];
        result_value(id: any): string;
        Result_portion(id: any): $mol_portion;
        result_portion(id: any): number;
    }
}
declare namespace $ {
    class $mol_bench_head extends $mol_float {
        event(): {
            "click": (val?: any) => any;
        };
        event_click(val?: any, force?: $mol_atom_force): any;
        attr(): {
            "title": string;
            "mol_float_scrolling": boolean;
        };
        hint(): string;
    }
}
declare namespace $.$$ {
    class $mol_bench extends $.$mol_bench {
        col_sort(next?: string): any;
        result_sorted(): {};
        result_value(id: {
            row: string[];
            col: string;
        }): any;
        result_number(id: {
            row: string[];
            col: string;
        }): number;
        result_value_max(col: string): number;
        result_portion(id: {
            row: string[];
            col: string;
        }): number;
        col_head_label(col: string): string[];
        event_sort_toggle(col: string, next?: Event): void;
        col_type(col: string): "text" | "number" | "branch";
        cell_content_number(id: {
            row: string[];
            col: string;
        }): any[];
        col_head_content(col: string): (string[] | $mol_icon_sort_asc)[];
    }
}
declare namespace $ {
    class $mol_labeler extends $mol_view {
        sub(): any[];
        Title(): $mol_view;
        label(): any[];
        Content(): $mol_view;
        content(): any;
    }
}
declare namespace $ {
    class $mol_icon_minus extends $mol_icon {
        path(): string;
    }
}
declare namespace $ {
    class $mol_icon_plus extends $mol_icon {
        path(): string;
    }
}
declare namespace $ {
    class $mol_number extends $mol_view {
        precision_view(): number;
        precision(): number;
        precision_change(): number;
        value(val?: any, force?: $mol_atom_force): any;
        sub(): any[];
        Dec(): $mol_button_minor;
        event_dec(val?: any, force?: $mol_atom_force): any;
        dec_enabled(): boolean;
        enabled(): boolean;
        dec_icon(): $mol_icon_minus;
        String(): $mol_string;
        value_string(val?: any, force?: $mol_atom_force): any;
        hint(): string;
        string_enabled(): boolean;
        debounce(): number;
        Inc(): $mol_button_minor;
        event_inc(val?: any, force?: $mol_atom_force): any;
        inc_enabled(): boolean;
        inc_icon(): $mol_icon_plus;
    }
}
declare namespace $.$$ {
    class $mol_number extends $.$mol_number {
        event_dec(next?: Event): void;
        event_inc(next?: Event): void;
        value_string(next?: string): any;
    }
}
declare namespace $ {
    class $mol_app_bench extends $mol_view {
        sub(): any[];
        Addon_page(): $mol_page;
        addon_title(): string;
        Filter(): $mol_search;
        filter(val?: any, force?: $mol_atom_force): any;
        Menu(): $mol_list;
        menu_options(): any[];
        Main_page(): $mol_page;
        Inform(): $mol_view;
        Descr_scroll(): $mol_scroll;
        Descr(): $mol_text;
        description(): string;
        Param_fields(): $mol_row;
        param_fields(): any[];
        Result(): $mol_bench;
        result(): any;
        result_col_title(id: any): any[];
        result_col_sort(val?: any, force?: $mol_atom_force): any;
        Sandbox_page(): $mol_page;
        sandbox_title(): string;
        Sandbox(): $mol_scroll;
        Menu_option(id: any): $mol_check_box;
        menu_option_checked(id: any, val?: any, force?: $mol_atom_force): any;
        sample_title(id: any): string;
        Param(id: any): $mol_labeler;
        param_title(id: any): string;
        Param_value(id: any): $mol_number;
        param_value(id: any, val?: any, force?: $mol_atom_force): any;
        param_precision(id: any): number;
        result_col_title_sample(): string;
    }
}
declare namespace $.$$ {
    class $mol_app_bench extends $.$mol_app_bench {
        bench(next?: string): any;
        sandbox(next?: HTMLIFrameElement, force?: $mol_atom_force): HTMLIFrameElement;
        'command_current()': any[];
        command_current(next?: any[], force?: $mol_atom_force): any[];
        command_result<Result>(command: any[], next?: Result): Result;
        meta(): {
            title: {
                [lang: string]: string;
            };
            descr: {
                [lang: string]: string;
            };
            samples: {
                [sample: string]: {
                    title: {
                        [lang: string]: string;
                    };
                };
            };
            steps: {
                [step: string]: {
                    title: {
                        [lang: string]: string;
                    };
                };
            };
            params: {
                [param: string]: {
                    title: {
                        [lang: string]: string;
                    };
                    default: number;
                    type: string;
                    precision: number;
                };
            };
        };
        samples_all(next?: string[]): string[];
        samples(next?: string[]): string[];
        steps(next?: string[]): string[];
        title(): string;
        description(): string;
        result_sample(sampleId: string): {
            [key: string]: any;
        };
        result(): {
            [sample: string]: {
                [step: string]: any;
            };
        };
        sandbox_title(): string;
        result_col_title(col_id: string): string[];
        step_title(step: string): string[];
        result_col_sort(next?: string): any;
        menu_options(): $mol_check_box[];
        sample_title(sample: string): string;
        menu_option_checked(sample: string, next?: boolean): boolean;
        params(): string[];
        param_fields(): $mol_labeler[];
        param_title(id: string): string;
        param_value(id: string, next?: any): any;
        param_precision(id: string): number;
        param_dict(): {};
    }
}
declare namespace $ {
    class $mol_plot_pane extends $mol_svg_root {
        aspect(): string;
        hue_base(val?: any, force?: $mol_atom_force): any;
        hue_shift(val?: any, force?: $mol_atom_force): any;
        gap(): number;
        gap_hor(): number;
        gap_vert(): number;
        gap_left(): number;
        gap_right(): number;
        gap_top(): number;
        gap_bottom(): number;
        shift(): any[];
        scale(): any[];
        sub(): any[];
        graphs_sorted(): any[];
        graphs_colored(): any[];
        graphs_positioned(): any[];
        graphs(): any[];
        plugins(): any[];
        width(): any;
        height(): any;
        Meter(): $mol_meter;
    }
}
declare namespace $.$$ {
    class $mol_plot_pane extends $.$mol_plot_pane {
        dimensions(): number[][];
        size(): number[];
        dimensions_expanded(): number[][];
        size_expaned(): number[];
        graph_hue(index: number): number;
        graphs_colored(): any[];
        size_real(): any[];
        view_box(): string;
        scale(): number[];
        shift(): number[];
        graphs_positioned(): any[];
        graphs_sorted(): $mol_view[];
    }
}
declare namespace $ {
    class $mol_chart extends $mol_view {
        sub(): any[];
        Plot(): $mol_plot_pane;
        graphs(): any[];
        hue_base(): number;
        hue_shift(): number;
        Legend(): $mol_chart_legend;
    }
}
declare namespace $ {
    class $mol_chart_legend extends $mol_scroll {
        graphs(): any[];
        sub(): any[];
        graph_legends(): any[];
        Graph_legend(id: any): $mol_view;
        Graph_sample_box(id: any): $mol_view;
        Graph_sample(id: any): any;
        Graph_title(id: any): $mol_view;
        graph_title(id: any): string;
    }
}
declare namespace $.$$ {
    class $mol_chart_legend extends $.$mol_chart_legend {
        graphs_front(): any[];
        graph_legends(): $mol_view[];
        graph_title(index: number): any;
        Graph_sample(index: number): any;
    }
}
declare namespace $ {
    class $mol_plot_graph extends $mol_svg_group {
        series(): {};
        points(): any[];
        points_scaled(): any[];
        points_raw(): any[];
        threshold(): number;
        shift(): any[];
        scale(): any[];
        dimensions_expanded(): any[];
        dimensions(): any[];
        hue(): number;
        attr(): {
            "mol_plot_graph_type": string;
        };
        type(): string;
        style(): {
            "color": string;
        };
        color(): string;
        Sample(): any;
        front(): any[];
        back(): any[];
    }
}
declare namespace $ {
    class $mol_plot_graph_sample extends $mol_view {
        attr(): {
            "mol_plot_graph_type": string;
        };
        type(): string;
        style(): {
            "color": string;
        };
        color(): string;
    }
}
declare namespace $.$$ {
    class $mol_plot_graph extends $.$mol_plot_graph {
        points_raw(): any[][];
        points_scaled(): number[][];
        points(): number[][];
        dimensions(): number[][];
        color(): string;
        front(): this[];
    }
}
declare namespace $ {
    function $mol_math_round_expand(val: number, gap?: number): number;
}
declare namespace $ {
    class $mol_plot_ruler_vert extends $mol_plot_graph {
        front(): any[];
        color(): any;
        sub(): any[];
        Curve(): $mol_svg_path;
        curve(): string;
        labels(): any[];
        Title(): $mol_svg_text;
        title_pos(): any[];
        title_pos_x(): string;
        title_pos_y(): string;
        Label(index: any): $mol_svg_text;
        label_pos(index: any): any[];
        label_pos_x(index: any): string;
        label_pos_y(index: any): string;
        label_text(index: any): string;
    }
}
declare namespace $.$$ {
    class $mol_plot_ruler_vert extends $.$mol_plot_ruler_vert {
        dimensions(): number[][];
        step(): number;
        points_raw(): number[][];
        curve(): string;
        labels(): $.$mol_svg_text[];
        label_pos_y(index: number): string;
        label_text(index: number): string;
        back(): this[];
    }
}
declare namespace $ {
    class $mol_plot_ruler_hor extends $mol_plot_graph {
        front(): any[];
        color(): any;
        sub(): any[];
        Curve(): $mol_svg_path;
        curve(): string;
        labels(): any[];
        Title(): $mol_svg_text;
        title_pos(): any[];
        title_pos_x(): string;
        title_pos_y(): string;
        Label(index: any): $mol_svg_text;
        label_pos(index: any): any[];
        label_pos_x(index: any): string;
        label_pos_y(index: any): string;
        label_text(index: any): string;
    }
}
declare namespace $.$$ {
    class $mol_plot_ruler_hor extends $.$mol_plot_ruler_hor {
        count(): number;
        step(): number;
        keys_visible(): string[];
        points(): any[];
        curve(): string;
        labels(): $.$mol_svg_text[];
        label_pos_x(key: string): string;
        label_text(key: string): string;
        back(): this[];
    }
}
declare namespace $ {
    class $mol_plot_bar extends $mol_plot_graph {
        style(): {
            "stroke-width": string;
            "color": string;
        };
        stroke_width(): string;
        sub(): any[];
        Curve(): $mol_svg_path;
        curve(): string;
        Sample(): $mol_plot_graph_sample;
    }
}
declare namespace $.$$ {
    class $mol_plot_bar extends $.$mol_plot_bar {
        curve(): string;
        stroke_width(): string;
        color(): string;
        dimensions(): number[][];
    }
}
declare namespace $ {
    class $mol_app_bench_chart_bar_mol extends $mol_view {
        sub(): any[];
        Chart(): $mol_chart;
        Vert(): $mol_plot_ruler_vert;
        Hor(): $mol_plot_ruler_hor;
        hor_series(): any[];
        graphs(): any[];
        Graph(id: any): $mol_plot_bar;
        graph_title(id: any): string;
        series(id: any): any[];
    }
}
declare namespace $.$$ {
    interface $mol_app_bench_chart_bar_mol_data {
        sample: string;
        graphs: number[][];
    }
    class $mol_app_bench_chart_bar_mol extends $.$mol_app_bench_chart_bar_mol {
        static data(next?: $mol_app_bench_chart_bar_mol_data, force?: $mol_atom_force): $mol_app_bench_chart_bar_mol_data;
        graphs(): $.$mol_plot_bar[];
        graph_title(id: number): string;
        series(id: number): number[];
        hor_series(): number[];
    }
}
declare namespace $ {
    class $mol_plot_group extends $mol_plot_graph {
        sub(): any[];
        graphs_enriched(): any[];
        graphs(): any[];
        Sample(): $mol_plot_graph_sample;
        graph_samples(): any[];
    }
}
declare namespace $.$$ {
    class $mol_plot_group extends $.$mol_plot_group {
        graphs_enriched(): any[];
        graph_samples(): any[];
        back(): $mol_view[];
        front(): $mol_view[];
    }
}
declare namespace $ {
    class $mol_plot_line extends $mol_plot_graph {
        color_fill(): string;
        sub(): any[];
        Curve(): $mol_svg_path;
        curve(): string;
        Sample(): $mol_plot_graph_sample;
    }
}
declare namespace $.$$ {
    class $mol_plot_line extends $.$mol_plot_line {
        curve(): string;
    }
}
declare namespace $ {
    class $mol_plot_dot extends $mol_plot_graph {
        sub(): any[];
        Curve(): $mol_svg_path;
        curve(): string;
        Sample(): $mol_plot_graph_sample;
    }
}
declare namespace $.$$ {
    class $mol_plot_dot extends $.$mol_plot_dot {
        curve(): string;
    }
}
declare namespace $ {
    class $mol_app_bench_chart_rope_mol extends $mol_view {
        sub(): any[];
        Chart(): $mol_chart;
        Vert(): $mol_plot_ruler_vert;
        Hor(): $mol_plot_ruler_hor;
        hor_series(): any[];
        graphs(): any[];
        Graph(id: any): $mol_plot_group;
        graph_title(id: any): string;
        series(id: any): any[];
        Line(id: any): $mol_plot_line;
        Dots(id: any): $mol_plot_dot;
    }
}
declare namespace $.$$ {
    interface $mol_app_bench_chart_rope_mol_data {
        sample: string;
        graphs: number[][];
    }
    class $mol_app_bench_chart_rope_mol extends $.$mol_app_bench_chart_rope_mol {
        static data(next?: $mol_app_bench_chart_rope_mol_data, force?: $mol_atom_force): $mol_app_bench_chart_rope_mol_data;
        graphs(): $.$mol_plot_group[];
        graph_title(id: number): string;
        series(id: number): number[];
        hor_series(): number[];
    }
}
declare namespace $ {
    class $mol_app_bench_list_mol extends $mol_scroll {
        sub(): any[];
        List(): $mol_list;
        rows(): any[];
        Row(id: any): $mol_app_bench_list_mol_row;
        row_selected(id: any, val?: any, force?: $mol_atom_force): any;
        row_title(id: any): string;
        row_content(id: any): string;
    }
}
declare namespace $ {
    class $mol_app_bench_list_mol_row extends $mol_check {
        selected(val?: any, force?: $mol_atom_force): any;
        minimal_height(): number;
        sub(): any[];
        Title(): $mol_view;
        title(): string;
        Content(): $mol_view;
        content(): string;
    }
}
declare namespace $.$$ {
    interface $mol_app_bench_list_mol_data {
        sample: string;
        items: {
            id: number;
            title: string;
            content: string;
        }[];
    }
    class $mol_app_bench_list_mol extends $.$mol_app_bench_list_mol {
        static data(next?: $mol_app_bench_list_mol_data, force?: $mol_atom_force): $mol_app_bench_list_mol_data;
        items(): {
            id: number;
            title: string;
            content: string;
        }[];
        rows(): $mol_app_bench_list_mol_row[];
        row_title(id: number): string;
        row_content(id: number): string;
        row_selected(id: number, next?: boolean): boolean;
        selected_id(next?: number): number;
    }
}
declare namespace $ {
    function $mol_dom_make(id?: string, localName?: string, namespaceURI?: string): Element;
}
declare namespace JSX {
    interface Element extends HTMLElement {
    }
    interface ElementClass extends HTMLElement {
    }
    interface IntrinsicElements {
        a: any;
        abbr: any;
        address: any;
        area: any;
        article: any;
        aside: any;
        audio: any;
        b: any;
        base: any;
        bdi: any;
        bdo: any;
        big: any;
        blockquote: any;
        body: any;
        br: any;
        button: any;
        canvas: any;
        caption: any;
        cite: any;
        code: any;
        col: any;
        colgroup: any;
        data: any;
        datalist: any;
        dd: any;
        del: any;
        details: any;
        dfn: any;
        dialog: any;
        div: any;
        dl: any;
        dt: any;
        em: any;
        embed: any;
        fieldset: any;
        figcaption: any;
        figure: any;
        footer: any;
        form: any;
        h1: any;
        h2: any;
        h3: any;
        h4: any;
        h5: any;
        h6: any;
        head: any;
        header: any;
        hgroup: any;
        hr: any;
        html: any;
        i: any;
        iframe: any;
        img: any;
        input: any;
        ins: any;
        kbd: any;
        keygen: any;
        label: any;
        legend: any;
        li: any;
        link: any;
        main: any;
        map: any;
        mark: any;
        menu: any;
        menuitem: any;
        meta: any;
        meter: any;
        nav: any;
        noindex: any;
        noscript: any;
        object: any;
        ol: any;
        optgroup: any;
        option: any;
        output: any;
        p: any;
        param: any;
        picture: any;
        pre: any;
        progress: any;
        q: any;
        rp: any;
        rt: any;
        ruby: any;
        s: any;
        samp: any;
        script: any;
        section: any;
        select: any;
        small: any;
        source: any;
        span: any;
        strong: any;
        style: any;
        sub: any;
        summary: any;
        sup: any;
        table: any;
        tbody: any;
        td: any;
        textarea: any;
        tfoot: any;
        th: any;
        thead: any;
        time: any;
        title: any;
        tr: any;
        track: any;
        u: any;
        ul: any;
        var: any;
        video: any;
        wbr: any;
    }
}
declare namespace $ {
    function $mol_dom_jsx(localName: string, props: {
        [key: string]: any;
    }, ...children: Array<Node | string>): Element;
}
declare namespace $ {
    class $mol_app_bench_list_tsx {
        static data: {
            sample: string;
            items: {
                id: number;
                title: string;
                content: string;
            }[];
        };
        static selected: number;
        static onClick(item: {
            id: number;
        }, event: MouseEvent): void;
        static render(): JSX.Element;
    }
}
