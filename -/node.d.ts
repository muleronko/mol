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
declare var Proxy: any;
declare var require: (path: string) => any;
declare var $node: any;
declare namespace $ {
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
declare namespace $ {
    class $mol_view_selection extends $mol_object {
        static focused(next?: Element[], force?: $mol_atom_force): Element[];
        static position(...diff: any[]): any;
        static onFocus(event: FocusEvent): void;
        static onBlur(event: FocusEvent): void;
    }
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
    function $mol_const<Value>(value: Value): {
        (): Value;
        '()': Value;
    };
}
declare namespace $ {
    class $mol_file extends $mol_object {
        static absolute(path: string): $mol_file;
        static relative(path: string): $mol_file;
        path(): string;
        watcher(): any;
        stat(next?: any, force?: $mol_atom_force): any;
        version(): any;
        exists(next?: boolean): boolean;
        parent(): $mol_file;
        type(): "file" | "dir" | "blocks" | "chars" | "link" | "fifo" | "socket";
        name(): any;
        ext(): string;
        content(next?: string, force?: $mol_atom_force): any;
        reader(): any;
        writer(): any;
        sub(): $mol_file[];
        resolve(path: string): $mol_file;
        relate(base?: any): any;
        append(next: string): void;
        find(include?: RegExp, exclude?: RegExp): $mol_file[];
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
declare var process: any;
declare namespace $ {
    class $mol_state_arg<Value> extends $mol_object {
        prefix: string;
        static href(next?: string): string;
        static dict(next?: {
            [key: string]: string;
        }): {
            [key: string]: any;
        };
        static value(key: string, next?: string): any;
        static link(next: any): string;
        static make_link(next: {
            [key: string]: any;
        }): string;
        constructor(prefix?: string);
        value(key: string, next?: string): any;
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
declare namespace $ {
    class $mol_touch extends $mol_plugin {
        start_zoom(val?: any, force?: $mol_atom_force): any;
        start_distance(val?: any, force?: $mol_atom_force): any;
        zoom(val?: any, force?: $mol_atom_force): any;
        start_pos(val?: any, force?: $mol_atom_force): any;
        swipe_precision(): number;
        swipe_right(val?: any, force?: $mol_atom_force): any;
        swipe_bottom(val?: any, force?: $mol_atom_force): any;
        swipe_left(val?: any, force?: $mol_atom_force): any;
        swipe_top(val?: any, force?: $mol_atom_force): any;
        swipe_from_right(val?: any, force?: $mol_atom_force): any;
        swipe_from_bottom(val?: any, force?: $mol_atom_force): any;
        swipe_from_left(val?: any, force?: $mol_atom_force): any;
        swipe_from_top(val?: any, force?: $mol_atom_force): any;
        swipe_to_right(val?: any, force?: $mol_atom_force): any;
        swipe_to_bottom(val?: any, force?: $mol_atom_force): any;
        swipe_to_left(val?: any, force?: $mol_atom_force): any;
        swipe_to_top(val?: any, force?: $mol_atom_force): any;
        event(): {
            "touchstart": (event?: any) => any;
            "touchmove": (event?: any) => any;
            "touchend": (event?: any) => any;
        };
        event_start(event?: any, force?: $mol_atom_force): any;
        event_move(event?: any, force?: $mol_atom_force): any;
        event_end(event?: any, force?: $mol_atom_force): any;
    }
}
declare namespace $.$$ {
    class $mol_touch extends $.$mol_touch {
        event_start(event?: TouchEvent): void;
        event_move(event?: TouchEvent): void;
        swipe_left(event?: TouchEvent): void;
        swipe_right(event?: TouchEvent): void;
        swipe_top(event?: TouchEvent): void;
        swipe_bottom(event?: TouchEvent): void;
        event_end(event?: TouchEvent): void;
    }
}
declare namespace $ {
    class $mol_ghost extends $mol_view {
        Sub(): $mol_view;
    }
}
declare namespace $.$$ {
    class $mol_ghost extends $.$mol_ghost {
        dom_node(): Element;
        dom_tree(): Element;
    }
}
declare namespace $ {
    class $mol_book extends $mol_view {
        sub(): any[];
        pages_wrapped(): any[];
        pages(): any[];
        plugins(): any[];
        width(): any;
        Meter(): $mol_meter;
        Touch(): $mol_touch;
        event_front_up(val?: any, force?: $mol_atom_force): any;
        event_front_down(val?: any, force?: $mol_atom_force): any;
        Page(index: any): $mol_book_page;
        page(index: any): any;
        page_visible(index: any): boolean;
        Placeholder(): $mol_book_placeholder;
    }
}
declare namespace $ {
    class $mol_book_placeholder extends $mol_scroll {
        minimal_width(): number;
        attr(): {
            "tabindex": any;
        };
        sub(): any[];
    }
}
declare namespace $ {
    class $mol_book_page extends $mol_ghost {
        attr(): {
            "tabindex": number;
            "mol_book_page_focused": boolean;
            "mol_book_page_visible": boolean;
        };
        visible(): boolean;
    }
}
declare namespace $.$$ {
    class $mol_book extends $.$mol_book {
        pages_extended(): $mol_view[];
        break_point(): number;
        page(index: number): $mol_view;
        page_visible(index: number): boolean;
        pages_wrapped(): $mol_view[];
        title(): string;
        event_front_up(event?: Event): void;
        event_front_down(event?: Event): void;
    }
}
declare namespace $ {
    class $mol_link extends $mol_view {
        minimal_height(): number;
        dom_name(): string;
        attr(): {
            "href": string;
            "title": string;
            "target": string;
            "mol_link_current": boolean;
        };
        uri(): string;
        hint(): string;
        target(): string;
        current(): boolean;
        sub(): any[];
        arg(): {};
        event(): {
            "click": (val?: any) => any;
        };
        event_click(val?: any, force?: $mol_atom_force): any;
    }
}
declare namespace $.$$ {
    class $mol_link extends $.$mol_link {
        uri(): string;
        current(): boolean;
        event_click(event?: Event): void;
    }
}
declare namespace $ {
    class $mol_icon_source extends $mol_icon {
        path(): string;
    }
}
declare namespace $ {
    class $mol_icon_settings extends $mol_icon {
        path(): string;
    }
}
declare namespace $ {
    class $mol_speech extends $mol_plugin {
        static api(): any;
        static listening(next?: boolean): boolean;
        static event_result(event?: Event & {
            results: {
                transcript: string;
            }[][];
        }): void;
        static text(next?: string): string;
        render(): null;
        event_catch(found?: string[]): void;
        patterns(): string[];
        matchers(): RegExp[];
        prefix(): string;
        suffix(): string;
    }
}
declare namespace $ {
    function $mol_typeof(value: any): any;
}
declare namespace $ {
    type $mol_tree_path = Array<string | number | null>;
    class $mol_tree {
        type: string;
        data: string;
        sub: $mol_tree[];
        baseUri: string;
        row: number;
        col: number;
        constructor(config?: {
            type?: string;
            value?: string;
            data?: string;
            sub?: $mol_tree[];
            baseUri?: string;
            row?: number;
            col?: number;
        });
        static values(str: string, baseUri?: string): $mol_tree[];
        clone(config: {
            type?: string;
            value?: string;
            data?: string;
            sub?: $mol_tree[];
            baseUri?: string;
            row?: number;
            col?: number;
        }): $mol_tree;
        static fromString(str: string, baseUri?: string): $mol_tree;
        static fromJSON(json: any, baseUri?: string): $mol_tree;
        readonly uri: string;
        toString(prefix?: string): string;
        toJSON(): any;
        readonly value: string;
        insert(value: $mol_tree, ...path: $mol_tree_path): $mol_tree;
        select(...path: $mol_tree_path): $mol_tree;
        filter(path: string[], value?: string): $mol_tree;
        transform(visit: (stack: $mol_tree[], sub: () => $mol_tree[]) => $mol_tree, stack?: $mol_tree[]): $mol_tree;
        error(message: string): Error;
    }
}
declare namespace $ {
    class $mol_demo_large extends $mol_view {
    }
}
declare namespace $.$$ {
    class $mol_demo_large extends $.$mol_demo_large {
        context_sub(): $mol_view_context;
        minimal_height(): number;
        minimal_width(): number;
    }
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
    function $mol_view_tree_trim_remarks(def: $mol_tree): $mol_tree;
    function $mol_view_tree_classes(defs: $mol_tree): $mol_tree;
    function $mol_view_tree_class_name(val: $mol_tree): string;
    function $mol_view_tree_super_name(val: $mol_tree): string;
    function $mol_view_tree_class_props(def: $mol_tree): $mol_tree;
    function $mol_view_tree_prop_name(prop: $mol_tree): string;
    function $mol_view_tree_prop_key(prop: $mol_tree): string;
    function $mol_view_tree_prop_next(prop: $mol_tree): string;
    function $mol_view_tree_prop_value(prop: $mol_tree): $mol_tree;
    function $mol_view_tree_value_type(val: $mol_tree): "string" | "number" | "null" | "locale" | "object" | "list" | "dict" | "bool" | "get" | "bind" | "put";
    function $mol_view_tree_compile(tree: $mol_tree): {
        script: string;
        locales: {
            [key: string]: string;
        };
    };
}
declare namespace $ {
    class $mol_app_studio extends $mol_book {
        value_overrided(id: any, val?: any, force?: $mol_atom_force): any;
        pages(): any[];
        Preview_page(): $mol_page;
        preview_title(): string;
        Source_link(): $mol_link;
        Source_icon(): $mol_icon_source;
        source_arg(): {
            "source": string;
        };
        Edit(): $mol_link;
        Edit_icon(): $mol_icon_settings;
        tools_main(): any[];
        Selector(): $mol_app_studio_selector;
        Block(): $mol_view;
        path(val?: any, force?: $mol_atom_force): any;
        Editor_tools(): $mol_view;
        Editor_page(): $mol_page;
        Speech_filter(): $mol_speech;
        speech_filter(val?: any, force?: $mol_atom_force): any;
        speech_filter_patterns(): any[];
        editor_title(): string;
        Crumbs(): $mol_row;
        crumbs(): any[];
        Editor_close(): $mol_link;
        Editor_close_icon(): $mol_icon_cross;
        editor_close_arg(): {
            "path": any;
        };
        Filter(): $mol_search;
        filter_hint(): string;
        prop_filter(val?: any, force?: $mol_atom_force): any;
        Fields(): $mol_list;
        fields(): any[];
        Prop_add(): $mol_button_major;
        event_add(val?: any, force?: $mol_atom_force): any;
        prop_add_label(): string;
        Source_page(): $mol_page;
        source_title(): string;
        Source_close(): $mol_link;
        Source_close_icon(): $mol_icon_cross;
        source_close_arg(): {
            "source": any;
        };
        Source(): $mol_text;
        source(): string;
        Placeholder(): any;
        Crumb(index: any): $mol_link;
        crumb_title(index: any): string;
        crumb_path(index: any): string;
        Prop(id: any): $mol_app_studio_field;
        prop_path(id: any): any[];
        prop_default(path: any, val?: any, force?: $mol_atom_force): any;
        props_all(name: any, val?: any, force?: $mol_atom_force): any;
        prop_arg(id: any): {};
        prop_value_base(id: any): any;
        prop_options(): any[];
        view_options(): any[];
        prop_add(val?: any, force?: $mol_atom_force): any;
        class_name_self(val?: any, force?: $mol_atom_force): any;
        class_name_base(val?: any, force?: $mol_atom_force): any;
        class_self(val?: any, force?: $mol_atom_force): any;
        classes(): $mol_tree;
    }
}
declare namespace $ {
    class $mol_app_studio_selector extends $mol_demo_large {
        event(): {
            "contextmenu": (event?: any) => any;
            "dblclick": (event?: any) => any;
        };
        select(event?: any, force?: $mol_atom_force): any;
        path(val?: any, force?: $mol_atom_force): any;
    }
}
declare namespace $.$$ {
    class $mol_app_studio extends $.$mol_app_studio {
        pages(): $.$mol_page[];
        classes_static(): $mol_tree;
        classes(next?: $mol_tree): $mol_tree;
        class(name: string, next?: $mol_tree): $mol_tree;
        class_self(next?: $mol_tree): $mol_tree;
        props_self(name: string): $mol_tree;
        props_all(name: string, next?: $mol_tree, force?: $mol_atom_force): $mol_tree;
        view_class(name: string): any;
        fields(): $.$mol_app_studio_field[];
        prop_overs(path: $mol_tree_path): string[];
        prop_path(path: $mol_tree_path): (string | number)[];
        prop_title(path: $mol_tree_path): string | number;
        prop_arg(path: $mol_tree_path): {
            path: string;
        };
        prop(path: $mol_tree_path, next?: $mol_tree): $mol_tree;
        prop_self(path: $mol_tree_path): $mol_tree;
        prop_type(path: $mol_tree_path): "string" | "number" | "null" | "locale" | "object" | "list" | "dict" | "bool" | "get" | "bind" | "put";
        prop_key(path: $mol_tree_path, next?: string): string;
        prop_next(path: $mol_tree_path, next?: string): string;
        prop_default(path: $mol_tree_path, next?: $mol_tree): $mol_tree;
        path(next?: $mol_tree_path): $mol_tree_path;
        view_options(): string[];
        prop_options(): string[];
        overrided_all(next?: {
            [key: string]: any;
        }): {
            [key: string]: any;
        };
        overrided(key: string, next?: any): any;
        prop_value_base(path: $mol_tree_path, next?: any): any;
        prop_class(path: $mol_tree_path, next?: string): string;
        prop_value_view(path: $mol_tree_path, next?: string): any;
        Element(path: $mol_tree_path): $mol_view;
        Block(): $mol_view;
        preview_title(): string;
        crumbs(): $.$mol_link[];
        crumb_title(index: number): any;
        crumb_path(index: number): string;
        event_add(event?: Event): void;
        prop_add(name: string): void;
        speech_enabled(next?: boolean): boolean;
        speech_filter([filter]: string[]): void;
        source_show(): boolean;
        source(): string;
    }
    class $mol_app_studio_selector extends $.$mol_app_studio_selector {
        select(event?: Event): void;
    }
}
declare namespace $ {
    class $mol_expander extends $mol_list {
        rows(): any[];
        Label(): $mol_view;
        Trigger(): $mol_check_expand;
        expanded(val?: any, force?: $mol_atom_force): any;
        label(): any[];
        tools(): any[];
        Content(): $mol_view;
        content(): any[];
    }
}
declare namespace $.$$ {
    class $mol_expander extends $.$mol_expander {
        rows(): $mol_view[];
    }
}
declare namespace $ {
    class $mol_switch extends $mol_view {
        minimal_height(): number;
        Option(id: any): $mol_check;
        option_checked(id: any, val?: any, force?: $mol_atom_force): any;
        option_title(id: any): string;
        option_enabled(id: any): boolean;
        enabled(): boolean;
        value(val?: any, force?: $mol_atom_force): any;
        options(): {};
        sub(): any[];
        items(): any[];
    }
}
declare namespace $.$$ {
    class $mol_switch extends $.$mol_switch {
        value(next?: any): any;
        options(): {
            [key: string]: string;
        };
        items(): $.$mol_check[];
        option_title(key: string): string;
        option_checked(key: string, next?: boolean): boolean;
    }
}
declare namespace $ {
    class $mol_app_studio_field extends $mol_expander {
        path(): any[];
        Trigger(): $mol_app_studio_field_title;
        expanded(val?: any, force?: $mol_atom_force): any;
        tools(): any[];
        Type(): $mol_select;
        type(val?: any, force?: $mol_atom_force): any;
        type_hint(): string;
        types(): {
            "get": string;
            "bind": string;
            "object": string;
            "string": string;
            "locale": string;
            "number": string;
            "bool": string;
            "list": string;
            "dict": string;
            "null": string;
        };
        Object(): $mol_select;
        class(val?: any, force?: $mol_atom_force): any;
        object_options(): any[];
        object_hint(): string;
        content(): any[];
        Bool(): $mol_switch;
        value_bool(val?: any, force?: $mol_atom_force): any;
        Number(): $mol_number;
        value_number(val?: any, force?: $mol_atom_force): any;
        hint(): string;
        String(): $mol_string;
        value_string(val?: any, force?: $mol_atom_force): any;
        Bind(): $mol_select;
        bind(val?: any, force?: $mol_atom_force): any;
        bind_options(): any[];
        bind_hint(): string;
        Prop_add(): $mol_button_minor;
        prop_add_label(): string;
        event_prop_add(val?: any, force?: $mol_atom_force): any;
        List(): $mol_list;
        list_rows(): any[];
        Add(): $mol_select;
        add_hint(): string;
        add_item(val?: any, force?: $mol_atom_force): any;
        item_types(): {
            "get": string;
            "string": string;
            "number": string;
            "bool": string;
            "list": string;
            "dict": string;
            "null": string;
        };
        List_trigger_icon(): $mol_icon_plus;
        Dict(): $mol_list;
        pairs(): any[];
        Add_pair(): $mol_bar;
        Add_pair_key(): $mol_search;
        add_pair_hint(): string;
        add_pair_key(val?: any, force?: $mol_atom_force): any;
        key_suggests(): any[];
        Add_pair_submit(): $mol_button_minor;
        add_pair(val?: any, force?: $mol_atom_force): any;
        Add_pair_submit_icon(): $mol_icon_plus;
        Overs(): $mol_list;
        overs(): any[];
        Add_over(): $mol_select;
        add_over_hint(): string;
        add_over(val?: any, force?: $mol_atom_force): any;
        Overs_trigger_icon(): $mol_icon_plus;
        over_options(): any[];
        Prop(id: any): $mol_app_studio_field;
        prop_path(id: any): any[];
        prop_arg(id: any): {};
        prop(path: any, val?: any, force?: $mol_atom_force): any;
        props(name: any, val?: any, force?: $mol_atom_force): any;
        prop_value(id: any): any;
        prop_add(val?: any, force?: $mol_atom_force): any;
    }
}
declare namespace $ {
    class $mol_app_studio_field_title extends $mol_check_expand {
        attr(): {
            "mol_app_studio_field_title_type": string;
            "mol_check_checked": any;
            "aria-checked": any;
            "role": string;
            "disabled": boolean;
            "tabindex": number;
            "title": string;
        };
        type(): string;
    }
}
declare namespace $.$$ {
    class $mol_app_studio_field extends $.$mol_app_studio_field {
        prop_current(next?: $mol_tree): $mol_tree;
        title(): string;
        title_arg(): {};
        value(next?: $mol_tree): $mol_tree;
        type(next?: string): "string" | "number" | "null" | "locale" | "object" | "list" | "dict" | "bool" | "get" | "bind" | "put";
        expanded(next?: boolean): boolean;
        class(next?: string): string;
        bind(next?: string): string;
        value_bool(next?: string): string;
        value_number(next?: string): string;
        value_string(next?: string): string;
        pairs(): $.$mol_app_studio_field[];
        overs(): $.$mol_app_studio_field[];
        hint(): any;
        tools(): $.$mol_select[];
        content(): ($.$mol_string | $.$mol_list | $.$mol_number | $.$mol_switch)[];
        item_value(index: number, next?: string): string;
        item_class(index: number, next?: string): string;
        list_rows(): $.$mol_app_studio_field[];
        prop_path(path: $mol_tree_path): (string | number)[];
        add_item(type?: string): string;
        over_options(): string[];
        add_over(name?: string): string;
        add_pair(event?: Event): string;
        event_prop_add(event?: Event): void;
    }
}
declare namespace $ {
    class $mol_status extends $mol_view {
        status(): any;
        minimal_height(): number;
        minimal_width(): number;
        sub(): any[];
        message(): string;
    }
}
declare namespace $.$$ {
    class $mol_status extends $.$mol_status {
        message(): any;
    }
}
declare namespace $ {
    class $mol_speck extends $mol_view {
        sub(): any[];
        value(): any;
    }
}
declare namespace $ {
    class $mol_app_demo extends $mol_book {
        title(): string;
        source_prefix(): string;
        Placeholder(): $mol_app_demo_placeholder;
        pages(): any[];
        blocks(): any[];
        Menu(): $mol_app_demo_menu;
        nav_hierarchy(): any;
        nav_option(id: any): any;
        filter_string(val?: any, force?: $mol_atom_force): any;
        Detail(): $mol_app_demo_detail;
        source_link(): string;
        Detail_list(): $mol_list;
        main_content(): any[];
        Editor(id: any): $mol_app_studio;
        selected_class_name(): string;
        Close(): $mol_link;
        Close_icon(): $mol_icon_cross;
        close_arg(): {
            "edit": any;
        };
        Welcome(): $mol_scroll;
        Welcome_text(): $mol_text;
        welcome_text(): string;
        Detail_empty_message(): $mol_status;
        detail_empty_prefix(): string;
        selected(): string;
        detail_empty_postfix(): string;
    }
}
declare namespace $ {
    class $mol_app_demo_menu extends $mol_page {
        minimal_width(): number;
        title(): string;
        tools(): any[];
        Filter(): $mol_search;
        filter(val?: any, force?: $mol_atom_force): any;
        Body(): $mol_app_demo_nav;
        Nav(): $mol_app_demo_nav;
        hierarchy(): any;
        option(id: any): any;
    }
}
declare namespace $ {
    class $mol_app_demo_detail extends $mol_page {
        tools(): any[];
        Source_link(): $mol_link;
        Source_icon(): $mol_icon_source;
        source_link(): string;
        Edit(): $mol_link;
        Edit_speck(): $mol_speck;
        Edit_icon(): $mol_icon_settings;
        Close(): $mol_link;
        Close_icon(): $mol_icon_cross;
        close_arg(): {
            "demo": any;
        };
    }
}
declare namespace $ {
    class $mol_app_demo_nav extends $mol_grid {
        row_height(): number;
        hierarchy_col(): string;
        Head(): any;
        Option(id: any): $mol_link;
        arg(id: any): {};
        Expand(id: any): $mol_check_expand;
        Content(id: any): $mol_view;
        Chevron(id: any): $mol_icon_chevron;
    }
}
declare namespace $.$$ {
    class $mol_app_demo extends $.$mol_app_demo {
        title(): string;
        names_demo_all(): string[];
        names_demo_filtered(): string[];
        nav_hierarchy(): {
            [prefix: string]: $mol_grid_node;
        };
        nav_option(id: string): {
            title: string;
        };
        selected(): any;
        selected_class_name(): string;
        editing(): boolean;
        Widget(name: string): $mol_view;
        names_demo(): string[];
        blocks(): $mol_view[];
        Placeholder(): $mol_app_demo_placeholder;
        main_content(): $mol_view[] | $.$mol_status[];
        logo_uri(): string;
        source_link(): string;
    }
    class $mol_app_demo_nav extends $.$mol_app_demo_nav {
        Cell(id: {
            row: string[];
            col: string;
        }): $mol_view;
        arg(id: {
            row: string[];
            col: string;
        }): {
            'demo': string;
        };
    }
}
declare namespace $ {
    class $mol_card extends $mol_list {
        attr(): {
            "mol_card_status_type": string;
        };
        status(): string;
        rows(): any[];
        Content(): $mol_view;
        content(): any[];
        Status(): $mol_view;
        status_text(): string;
    }
}
declare namespace $.$$ {
    class $mol_card extends $.$mol_card {
        rows(): $mol_view[];
    }
}
declare namespace $ {
    class $mol_image extends $mol_view {
        dom_name(): string;
        field(): {
            "src": string;
            "alt": string;
        };
        uri(): string;
    }
}
declare namespace $ {
    class $mol_link_iconed extends $mol_link {
        sub(): any[];
        Icon(): $mol_image;
        icon(): string;
        content(): any[];
        title(): string;
        host(): string;
    }
}
declare namespace $.$$ {
    class $mol_link_iconed extends $.$mol_link_iconed {
        icon(): string;
        host(): string;
        title(): string;
    }
}
declare namespace $ {
    class $mol_app_demo_placeholder extends $mol_book_placeholder {
        sub(): any[];
        Content(): $mol_card;
        Title(): $mol_view;
        title(): string;
        Description(): $mol_view;
        description(): string;
        Advantages(): $mol_view;
        Technology(): $mol_app_placeholder_advantage;
        technology(): string;
        Code(): $mol_app_placeholder_advantage;
        code_rate(): string;
        Programming(): $mol_app_placeholder_advantage;
        programming(): string;
        Github_link(): $mol_link_iconed;
    }
}
declare namespace $ {
    class $mol_app_placeholder_advantage extends $mol_view {
        sub(): any[];
        Image(): $mol_image;
        image(): string;
        title(): string;
    }
}
declare namespace $ {
    class $mol_icon_folder extends $mol_icon {
        path(): string;
    }
}
declare namespace $ {
    class $mol_icon_file2 extends $mol_icon {
        path(): string;
    }
}
declare namespace $ {
    class $mol_embed extends $mol_ghost {
        Pdf(): $mol_embed_pdf;
        uri(): string;
        Native(): $mol_embed_native;
        mime(): string;
    }
}
declare namespace $.$$ {
    class $mol_embed extends $.$mol_embed {
        Sub(): $.$mol_embed_pdf | $mol_embed_native;
    }
}
declare namespace $ {
    class $mol_embed_native extends $mol_view {
        dom_name(): string;
        attr(): {
            "data": string;
            "type": string;
        };
        uri(): string;
        mime(): string;
        sub(): any[];
        Open(): $mol_link;
        Open_button(): $mol_button_major;
        open_label(): string;
    }
}
declare namespace $ {
    let $lib_pdfjs: any;
}
declare namespace $ {
    function $mol_range_in<Item>(source: {
        item: (id: number) => Item;
        length: number;
    }): Item[];
    class $mol_range_common<Value> {
        item(id: number): Value;
        length: number;
        readonly '0': Value;
        forEach(handle: (value?: Value, id?: number) => void): void;
        valueOf(): Value[];
        concat(...args: any[]): Value[];
        slice(start?: number, end?: number): $mol_range_lazy<Value>;
        map<ResValue>(proceed: (val: Value, id?: number) => ResValue): $mol_range_lazy<ResValue>;
        join(delim?: string): string;
        every(check: (value: Value, id: number) => boolean): boolean;
        some(check: (value: Value, id: number) => boolean): boolean;
    }
    class $mol_range_lazy<Value> extends $mol_range_common<Value> {
        private source;
        constructor(source?: {
            item(id: number): Value;
            length: number;
        });
        item(id: number): Value;
        readonly length: number;
    }
}
declare namespace $ {
    class $mol_embed_pdf extends $mol_scroll {
        uri(): string;
        sub(): any[];
        Pages(): $mol_list;
        pages(): any[];
        Page(index: any): $mol_embed_pdf_page;
        page(index: any): any;
    }
}
declare namespace $ {
    class $mol_embed_pdf_page extends $mol_view {
        dom_name(): string;
        page(): any;
        max_width(): number;
        scale_over(): number;
        plugins(): any[];
        Touch(): $mol_touch;
        scale(val?: any, force?: $mol_atom_force): any;
        style(): {
            "zoom": number;
        };
        zoom(): number;
        field(): {
            "width": number;
            "height": number;
        };
        width(): number;
        height(): number;
    }
}
declare namespace $.$$ {
    class $mol_embed_pdf extends $.$mol_embed_pdf {
        document(doc?: any, force?: $mol_atom_force): any;
        page(index: number, page?: any, force?: $mol_atom_force): any;
        pages(): any[];
    }
    class $mol_embed_pdf_page extends $.$mol_embed_pdf_page {
        viewport(): any;
        zoom(): number;
        width(): number;
        height(): number;
        minimal_width(): number;
        minimal_height(): number;
        paint(next?: any, force?: $mol_atom_force): any;
        render(): void;
    }
}
declare namespace $ {
    class $mol_webdav extends $mol_http {
        static item(uri: string): $mol_webdav;
        data_tree(): {
            [uri: string]: Element;
        };
        data_self(): {
            [uri: string]: Element;
        };
        parent(): $mol_webdav;
        sub(): $mol_webdav[];
        depth(): number;
        headers(): {
            'Depth': string;
        };
        method_get(): string;
        resolve(uri: string): $mol_webdav;
        prop(prop: string): string;
        type(): "file" | "dir";
    }
}
declare namespace $ {
    class $mol_app_files extends $mol_book {
        uri_current(): string;
        uri_root(): string;
        uri_root_default(): string;
        credentials(): {
            "login": string;
            "password": string;
        };
        title(): string;
        title_root(): string;
        Folder(folder: any): $mol_app_files_folder;
        webdav_title(folder: any): string;
        webdav_description(folder: any): string;
        folder_rows(folder: any): any[];
        Folder_row(uri: any): $mol_link;
        folder_row_arg(uri: any): {};
        folder_row_current(uri: any): boolean;
        folder_row_icon(uri: any): any;
        Folder_row_info(uri: any): $mol_view;
        Folder_row_descr(uri: any): $mol_view;
        folder_row_descr(uri: any): string;
        Folder_row_title(uri: any): $mol_view;
        folder_row_title(uri: any): string;
        File(file: any): $mol_app_files_file;
        file_uri(file: any): string;
        file_mime(file: any): string;
        Icon_folder(uri: any): $mol_icon_folder;
        Icon_file(uri: any): $mol_icon_file2;
        Placeholder(): $mol_book_placeholder;
        tools_root(): any[];
        page_tools(uri: any): any[];
        Close(uri: any): $mol_link;
        Close_icon(uri: any): $mol_icon_cross;
        close_arg(uri: any): {};
    }
}
declare namespace $ {
    class $mol_app_files_folder extends $mol_page {
        minimal_width(): number;
        body(): any[];
        Description(): $mol_text;
        description(): string;
        Folder_rows(): $mol_list;
        rows(): any[];
    }
}
declare namespace $ {
    class $mol_app_files_file extends $mol_page {
        minimal_width(): number;
        body(): any[];
        Embed(): $mol_embed;
        src(): string;
        mime(): string;
    }
}
declare namespace $.$$ {
    class $mol_app_files extends $.$mol_app_files {
        pages(): ($.$mol_app_files_folder | $mol_app_files_file)[];
        uri_root(next?: string): any;
        uri_current(next?: string): any;
        root(): $mol_webdav;
        current(): $mol_webdav;
        webdav(uri: string): $mol_webdav;
        folder_row_current(uri: string): boolean;
        webdavs(): $mol_webdav[];
        webdav_type(uri: string): "file" | "dir";
        webdav_title(uri: string): string;
        folder_rows(uri: string): $.$mol_link[];
        folder_row_arg(uri: string): {
            'current': string;
        };
        folder_row_icon(uri: string): $mol_icon_folder;
        folder_row_title(uri: string): string;
        folder_row_descr(uri: string): string;
        file_uri(uri: string): string;
        file_mime(uri: string): string;
        file_size(uri: string): number;
        title(): string;
        page_tools(uri: string): any[];
        close_arg(uri: string): {
            'current': string;
        };
    }
    class $mol_app_files_folder extends $.$mol_app_files_folder {
        body(): $.$mol_list[];
    }
}
declare namespace $ {
    class $mol_app_files_demo extends $mol_demo_large {
        sub(): any[];
        App(): $mol_app_files;
        title(): string;
        uri_root(): string;
    }
}
declare namespace $.$$ {
    class $mol_app_files_demo extends $.$mol_app_files_demo {
        render(): void;
    }
}
declare namespace $ {
    class $mol_app_habhub extends $mol_book {
        pages(): any[];
        Placeholder(): $mol_book_placeholder;
        Menu_page(): $mol_page;
        title_default(): string;
        Menu(): $mol_list;
        menu_rows(): any[];
        Details(): $mol_page;
        gist_current_title(): string;
        Close(): $mol_link;
        close_arg(): {
            "gist": any;
        };
        Close_icon(): $mol_icon_cross;
        details_scroll_top(val?: any, force?: $mol_atom_force): any;
        Datails_text(): $mol_text;
        gist_current_content(): string;
        Menu_row(id: any): $mol_link;
        gist_title(id: any): string;
        gist_arg(id: any): {};
    }
}
declare namespace $.$$ {
    interface $mol_app_habhub_gist {
        id: number;
        title: string;
        body: string;
    }
    class $mol_app_habhub extends $.$mol_app_habhub {
        uriSource(): string;
        gists(): $mol_app_habhub_gist[];
        gists_dict(): {
            [key: string]: $mol_app_habhub_gist;
        };
        gist(id: number): $mol_app_habhub_gist;
        gist_current_id(): number;
        pages(): $.$mol_page[];
        Placeholder(): $mol_book_placeholder;
        menu_rows(): $mol_view[];
        gist_title(id: number): string;
        gist_arg(id: number): {
            gist: number;
        };
        gist_current_title(): string;
        gist_current_content(): string;
        details_scroll_top(next?: number): number;
    }
}
declare namespace $ {
    class $mol_app_habhub_demo extends $mol_demo_large {
        title(): string;
        sub(): any[];
        App(): $mol_app_habhub;
    }
}
declare namespace $ {
    class $mol_app_hello extends $mol_view {
        sub(): any[];
        Name(): $mol_string;
        name_hint(): string;
        name(val?: any, force?: $mol_atom_force): any;
        Greeting(): $mol_view;
        greeting(): string;
    }
}
declare namespace $.$$ {
    class $mol_app_hello extends $.$mol_app_hello {
        greeting(): string;
    }
}
declare namespace $ {
    class $mol_app_hello_demo extends $mol_demo_large {
        title(): string;
        sub(): any[];
        App(): $mol_app_hello;
    }
}
declare namespace $ {
    class $mol_app_inventory extends $mol_view {
        domain(): $$.$mol_app_inventory_domain;
        sub(): any[];
        Page(): any;
        Head(): $mol_app_inventory_head;
        can_write_off(): boolean;
        can_approve(): boolean;
        Enter(): $mol_app_inventory_enter;
        Controller(): $mol_app_inventory_controller;
        Keeper(): $mol_app_inventory_keeper;
        Stats(): $mol_app_inventory_stats;
    }
}
declare namespace $ {
    class $mol_app_inventory_head extends $mol_row {
        keeper_show(): boolean;
        control_show(): boolean;
        sub(): any[];
        Keeper_link(): $mol_link;
        keeper_label(): string;
        Control_link(): $mol_link;
        control_label(): string;
        Stats_link(): $mol_link;
        stats_label(): string;
    }
}
declare namespace $.$$ {
    class $mol_app_inventory extends $.$mol_app_inventory {
        Page(): $mol_view;
        page_name(next?: string): any;
        can_write_off(): boolean;
        can_approve(): boolean;
    }
    class $mol_app_inventory_head extends $.$mol_app_inventory_head {
        sub(): $.$mol_link[];
    }
}
declare namespace $ {
    class $mol_app_inventory_stats extends $mol_page {
        domain(): $$.$mol_app_inventory_domain;
    }
}
declare namespace $ {
    class $mol_app_inventory_position extends $mol_row {
        position(): any;
        sub(): any[];
        Product(): $mol_view;
        Title(): $mol_view;
        title(): string;
        Description(): $mol_view;
        description(): string;
        Count(): $mol_number;
        count_editable(): boolean;
        count(val?: any, force?: $mol_atom_force): any;
        Status(): $mol_switch;
        status(val?: any, force?: $mol_atom_force): any;
        status_label_pending(): string;
        status_label_approved(): string;
        status_label_rejected(): string;
    }
}
declare namespace $.$$ {
    class $mol_app_inventory_position extends $.$mol_app_inventory_position {
        position(): $mol_app_inventory_domain_position;
        title(): string;
        description(): string;
        count(next?: number): number;
        status(next?: keyof typeof $mol_app_inventory_domain_position_status): "pending" | "completed" | "draft" | "approved" | "rejected";
    }
}
declare var cordova: any;
declare namespace $ {
    var $mol_cordova: any;
    function $mol_cordova_camera(): any;
}
declare namespace $ {
    class $mol_code extends $mol_view {
        sub(): any[];
        Manual(): $mol_search;
        value(val?: any, force?: $mol_atom_force): any;
        hint(): string;
        format(): string;
        debounce(): number;
        Scan(): $mol_button;
        event_scan(val?: any, force?: $mol_atom_force): any;
        scan_label(): string;
    }
}
declare namespace $.$$ {
    class $mol_code extends $.$mol_code {
        scan_support(): boolean;
        Scan(): $.$mol_button;
        event_scan(): void;
    }
}
declare namespace $ {
    class $mol_app_inventory_keeper extends $mol_page {
        domain(): $$.$mol_app_inventory_domain;
        body(): any[];
        position_rows(): any[];
        Position_row(id: any): $mol_app_inventory_position;
        position(id: any): any;
        foot(): any[];
        Action_row(): $mol_row;
        Code(): $mol_code;
        code_new(val?: any, force?: $mol_atom_force): any;
        code_new_hint(): string;
        Submit(): $mol_button_major;
        event_submit(event?: any, force?: $mol_atom_force): any;
        submit_label(): string;
    }
}
declare namespace $.$$ {
    class $mol_app_inventory_keeper extends $.$mol_app_inventory_keeper {
        position(id: string): $mol_app_inventory_domain_position;
        code_new(next?: string): string;
        position_rows(): $.$mol_app_inventory_position[];
        positions(): $mol_app_inventory_domain_position[];
        event_submit(next?: Event): void;
    }
}
declare namespace $ {
    class $mol_app_inventory_controller extends $mol_page {
        domain(): $$.$mol_app_inventory_domain;
        body(): any[];
        position_rows(): any[];
        Position_row(id: any): $mol_app_inventory_position;
        position(id: any): any;
        foot(): any[];
        Controls_row(): $mol_row;
        Sweep(): $mol_button_major;
        event_sweep(event?: any, force?: $mol_atom_force): any;
        submit_label(): string;
    }
}
declare namespace $.$$ {
    class $mol_app_inventory_controller extends $.$mol_app_inventory_controller {
        position(id: string): $mol_app_inventory_domain_position;
        position_rows(): $.$mol_app_inventory_position[];
        positions(): $mol_app_inventory_domain_position[];
        event_sweep(next?: Event): void;
    }
}
declare namespace $ {
    class $mol_form extends $mol_view {
        submit_blocked(): boolean;
        sub(): any[];
        Bar_fields(): $mol_view;
        form_fields(): any[];
        Bar_buttons(): $mol_row;
        buttons(): any[];
    }
}
declare namespace $.$$ {
    class $mol_form extends $.$mol_form {
        submit_blocked(): boolean;
    }
}
declare namespace $ {
    class $mol_form_field extends $mol_labeler {
        label(): any[];
        name(): string;
        Bid(): $mol_view;
        errors(): any[];
        Content(): any;
        control(): any;
    }
}
declare namespace $ {
    class $mol_app_inventory_enter extends $mol_view {
        domain(): $$.$mol_app_inventory_domain;
        entered(val?: any, force?: $mol_atom_force): any;
        sub(): any[];
        form(): $mol_form;
        loginField(): $mol_form_field;
        loginLabel(): string;
        loginErrors(): any[];
        loginControl(): $mol_string;
        login(val?: any, force?: $mol_atom_force): any;
        passwordField(): $mol_form_field;
        passwordLabel(): string;
        passwordErrors(): any[];
        passControl(): $mol_string;
        password(val?: any, force?: $mol_atom_force): any;
        submit(): $mol_button_major;
        submitLabel(): string;
        event_submit(event?: any, force?: $mol_atom_force): any;
        submit_blocked(): boolean;
        message(): string;
        messageNoAccess(): string;
    }
}
declare var cpprun: any;
declare namespace $.$$ {
    class $mol_app_inventory_enter extends $.$mol_app_inventory_enter {
        event_submit(): void;
        message(): string;
    }
}
declare namespace $ {
    class $mol_hyperhive extends $mol_object {
        host(): string;
        version(): string;
        environment(): string;
        project(): string;
        application(): string;
        device(): string;
        login(val?: any, force?: $mol_atom_force): any;
        password(val?: any, force?: $mol_atom_force): any;
        initialized(): boolean;
        authentificated(): boolean;
        data(table: any): any[];
    }
}
declare var hhfw: any;
declare var sqlitePlugin: any;
declare namespace $.$$ {
    class $mol_hyperhive extends $.$mol_hyperhive {
        device(): string;
        static item(config: {
            host: string;
            version: string;
            environment: string;
            project: string;
            application: string;
        }): $mol_hyperhive;
        initialized(): boolean;
        authentificated(next?: boolean, force?: $mol_atom_force): boolean;
        resources(next?: any, force?: $mol_atom_force): boolean;
        data<Value>(table: string, next?: any, force?: $mol_atom_force): Value;
    }
}
declare namespace $.$$ {
    const $mol_app_inventory_domain_position_status: {
        draft: string;
        approved: string;
        completed: string;
        pending: string;
        rejected: string;
    };
    interface $mol_app_inventory_domain_product_raw {
        R_MATERIAL_ID: string;
        R_BARCODE: string;
        R_NAME: string;
    }
    interface $mol_app_inventory_domain_position_raw {
        R_MOVEMENT_ID: string;
        R_MATERIAL_ID: string;
        R_QUANTITY: number;
        R_COMMENT: string;
        R_STATUS: typeof $mol_app_inventory_domain_position_status[keyof typeof $mol_app_inventory_domain_position_status];
    }
    class $mol_app_inventory_domain extends $mol_object {
        hyperhive(): $mol_hyperhive;
        products_table(): $mol_app_inventory_domain_product_raw[];
        positions_table(next?: $mol_app_inventory_domain_position_raw[]): $mol_app_inventory_domain_position_raw[];
        product_rows_by_id(): {
            [code: string]: $mol_app_inventory_domain_product_raw;
        };
        product_by_code(code: string): $mol_app_inventory_domain_product;
        product_rows_by_code(): {
            [code: string]: $mol_app_inventory_domain_product_raw;
        };
        position_rows_by_id(): {
            [code: string]: $mol_app_inventory_domain_position_raw;
        };
        products(): $mol_app_inventory_domain_product[];
        product(id: string): $mol_app_inventory_domain_product;
        product_code(id: string): string;
        product_title(id: string): string;
        positions(next?: $mol_app_inventory_domain_position[]): $mol_app_inventory_domain_position[];
        positions_by_product_id(): {
            [code: string]: $mol_app_inventory_domain_position;
        };
        position_by_product_id(product_id: string): $mol_app_inventory_domain_position;
        position(id: string): $mol_app_inventory_domain_position;
        position_product(id: string, next?: $mol_app_inventory_domain_product): $mol_app_inventory_domain_product;
        position_count(id: string, next?: number): number;
        position_status(id: string, next?: keyof typeof $mol_app_inventory_domain_position_status): any;
        credentials(next?: {
            login: string;
            password: string;
        }): {
            login: string;
            password: string;
        };
        authentificated(): boolean;
        can_write_off(): boolean;
        can_approve(): boolean;
        message(): string;
    }
    class $mol_app_inventory_domain_product extends $mol_object {
        id(): string;
        code(): string;
        title(): string;
        description(): string;
    }
    class $mol_app_inventory_domain_position extends $mol_object {
        id(): string;
        product(): $mol_app_inventory_domain_product;
        count(next?: number): number;
        status(next?: keyof typeof $mol_app_inventory_domain_position_status): "pending" | "completed" | "draft" | "approved" | "rejected";
        remark(next?: string): string;
    }
}
declare namespace $ {
    class $mol_unit extends $mol_object {
        'valueOf()': number;
        constructor(value?: number);
        prefix(): string;
        postfix(): string;
        valueOf(): number;
        delimiter(): string;
        value_view(): string;
        toString(): string;
        static summ(a: $mol_unit, b: $mol_unit): any;
        mult(m: number): this;
    }
}
declare namespace $ {
    class $mol_unit_money extends $mol_unit {
    }
    class $mol_unit_money_usd extends $mol_unit_money {
        prefix(): string;
    }
    class $mol_unit_money_rur extends $mol_unit_money {
        postfix(): string;
    }
}
declare namespace $ {
    class $mol_time_base {
        static patterns: any;
        static formatter(pattern: string): any;
        toString(pattern: string): string;
    }
}
declare namespace $ {
    type $mol_time_duration_config = number | string | {
        year?: number;
        month?: number;
        day?: number;
        hour?: number;
        minute?: number;
        second?: number;
    };
    class $mol_time_duration extends $mol_time_base {
        constructor(config?: $mol_time_duration_config);
        readonly year: number;
        readonly month: number;
        readonly day: number;
        readonly hour: number;
        readonly minute: number;
        readonly second: number;
        summ(config: $mol_time_duration_config): $mol_time_duration;
        mult(numb: number): $mol_time_duration;
        valueOf(): number;
        toJSON(): string;
        toString(pattern?: string): string;
        static patterns: {
            '#Y': (duration: $mol_time_duration) => string;
            '#M': (duration: $mol_time_duration) => string;
            '#D': (duration: $mol_time_duration) => string;
            '#h': (duration: $mol_time_duration) => string;
            '#m': (duration: $mol_time_duration) => string;
            '#s': (duration: $mol_time_duration) => string;
            '+hh': (duration: $mol_time_duration) => string;
            'mm': (duration: $mol_time_duration) => string;
        };
    }
}
declare namespace $ {
    type $mol_time_moment_config = number | Date | string | {
        year?: number;
        month?: number;
        day?: number;
        hour?: number;
        minute?: number;
        second?: number;
        offset?: $mol_time_duration_config;
    };
    class $mol_time_moment extends $mol_time_base {
        constructor(config?: $mol_time_moment_config);
        readonly year: number;
        readonly month: number;
        readonly day: number;
        readonly hour: number;
        readonly minute: number;
        readonly second: number;
        readonly offset: $mol_time_duration;
        readonly weekday: number;
        private _native;
        readonly native: Date;
        private _normal;
        readonly normal: $mol_time_moment;
        merge(config: $mol_time_moment_config): $mol_time_moment;
        shift(config: $mol_time_duration_config): $mol_time_moment;
        toOffset(config: $mol_time_duration_config): $mol_time_moment;
        valueOf(): number;
        toJSON(): string;
        toString(pattern?: string): string;
        static patterns: {
            'YYYY': (moment: $mol_time_moment) => string;
            'AD': (moment: $mol_time_moment) => string;
            'YY': (moment: $mol_time_moment) => string;
            'Month': (moment: $mol_time_moment) => string;
            'DD Month': (moment: $mol_time_moment) => string;
            'D Month': (moment: $mol_time_moment) => string;
            'Mon': (moment: $mol_time_moment) => string;
            'DD Mon': (moment: $mol_time_moment) => string;
            'D Mon': (moment: $mol_time_moment) => string;
            '-MM': (moment: $mol_time_moment) => string;
            'MM': (moment: $mol_time_moment) => string;
            'M': (moment: $mol_time_moment) => string;
            'WeekDay': (moment: $mol_time_moment) => string;
            'WD': (moment: $mol_time_moment) => string;
            '-DD': (moment: $mol_time_moment) => string;
            'DD': (moment: $mol_time_moment) => string;
            'D': (moment: $mol_time_moment) => string;
            'Thh': (moment: $mol_time_moment) => string;
            'hh': (moment: $mol_time_moment) => string;
            'h': (moment: $mol_time_moment) => string;
            ':mm': (moment: $mol_time_moment) => string;
            'mm': (moment: $mol_time_moment) => string;
            'm': (moment: $mol_time_moment) => string;
            ':ss': (moment: $mol_time_moment) => string;
            'ss': (moment: $mol_time_moment) => string;
            's': (moment: $mol_time_moment) => string;
            '.sss': (moment: $mol_time_moment) => string;
            'sss': (moment: $mol_time_moment) => string;
            'Z': (moment: $mol_time_moment) => string;
        };
    }
}
declare namespace $ {
    function $mol_stub_select_random<Value>(list: Value[]): Value;
    function $mol_stub_strings(prefix?: string, count?: number, length?: number): any[];
    function $mol_stub_code(length?: number): string;
    function $mol_stub_price(max?: number): $mol_unit_money_usd;
    function $mol_stub_product_name(): string;
    function $mol_stub_company_name_big(): string;
    function $mol_stub_company_name_small(): string;
    function $mol_stub_company_name(): string;
    function $mol_stub_person_name(): string;
    function $mol_stub_city(): string;
    function $mol_stub_time(maxShift?: number): $mol_time_moment;
}
declare namespace $.$$ {
    class $mol_app_inventory_domain_mock extends $mol_app_inventory_domain {
        products_table(): {
            R_MATERIAL_ID: string;
            R_NAME: string;
            R_BARCODE: string;
        }[];
        positions_table(next?: $mol_app_inventory_domain_position_raw[]): $mol_app_inventory_domain_position_raw[];
        authentificated(): boolean;
        message(): string;
    }
}
declare namespace $ {
    class $mol_app_inventory_test extends $mol_app_inventory {
        title(): string;
        domain(): $$.$mol_app_inventory_domain_mock;
    }
}
declare namespace $ {
    function $mol_csv_parse(text: string, delimiter?: string): {
        [key: string]: any;
    }[];
}
declare namespace $ {
    class $mol_app_lamps extends $mol_book {
        lamp_current_id(val?: any, force?: $mol_atom_force): any;
        pages(): any[];
        Addon_page(): $mol_page;
        Filter(): $mol_code;
        filter_hint(): string;
        filter(val?: any, force?: $mol_atom_force): any;
        menu_scroll_top(val?: any, force?: $mol_atom_force): any;
        Menu(): $mol_list;
        lamp_rows(): any[];
        Main_page(): $mol_page;
        title(): string;
        Close(): $mol_link;
        Close_icon(): $mol_icon_cross;
        Info(): $mol_row;
        Stat(): $mol_row;
        Rating(): $mol_labeler;
        rating_title(): string;
        rating(): number;
        Body(): $mol_row;
        Type(): $mol_labeler;
        type_title(): string;
        type(): string;
        Shape(): $mol_labeler;
        shape_title(): string;
        shape(): string;
        Base(): $mol_labeler;
        base_title(): string;
        base(): string;
        Light(): $mol_row;
        Temp(): $mol_labeler;
        Temp_title(): string;
        temp(): string;
        Cri(): $mol_labeler;
        cri_title(): string;
        cri(): string;
        Ripple(): $mol_labeler;
        ripple_title(): string;
        ripple(): string;
        Angle(): $mol_labeler;
        angle_title(): string;
        angle(): string;
        Gallery(): $mol_row;
        Photo(): $mol_image;
        photo(): string;
        Lamp_row(id: any): $mol_lamps_lamp_row;
        lamp_title(id: any): string;
        lamp_arg(id: any): {};
    }
}
declare namespace $ {
    class $mol_lamps_lamp_row extends $mol_link {
        minimal_height(): number;
        sub(): any[];
    }
}
declare namespace $.$$ {
    class $mol_app_lamps extends $.$mol_app_lamps {
        lamps_all(): {
            [key: string]: any;
        }[];
        lamps(): {
            [key: string]: any;
        }[];
        lamps_dict(): {
            [key: string]: any;
        };
        lamp_rows(): $mol_lamps_lamp_row[];
        lamp_title(id: string): any;
        _filter_timer: number;
        filter(next?: string, force?: $mol_atom_force): string;
        lamp_arg(id: string): {
            'lamp': string;
        };
        id(next?: string): any;
        lamp(): any;
        pages(): $mol_view[];
        Placeholder(): $mol_book_placeholder;
        menu_scroll_top(next?: number): number;
        title(): any;
        cri(): string;
        angle(): string;
        shape(): string;
        base(): string;
        type(): string;
        temp(): string;
        matt(): boolean;
        ripple(): string;
        rating_cri(): 1 | 2 | 3 | 4 | 5 | 4.5 | 3.5;
        rating(): number;
        slug(id: string): any;
        photo(): string;
        thumb(id: string): string;
    }
}
declare namespace $ {
    class $mol_app_lamps_demo extends $mol_demo_large {
        title(): string;
        sub(): any[];
        App(): $mol_app_lamps;
    }
}
declare namespace $ {
    class $mol_icon_external extends $mol_icon {
        path(): string;
    }
}
declare namespace $ {
    function $mol_html_decode(text: string): string;
}
declare namespace $ {
    class $mol_app_questions extends $mol_book {
        Placeholder(): $mol_book_placeholder;
        placeholder(): string;
        Menu(): $mol_page;
        title_default(): string;
        Menu_links(): $mol_list;
        menu_rows(): any[];
        Details(id: any): $mol_page;
        question_title(id: any): string;
        Details_permalink(id: any): $mol_link;
        question_permalink(id: any): string;
        Details_permalink_icon(id: any): $mol_icon_external;
        Details_close(id: any): $mol_link;
        Details_close_icon(id: any): $mol_icon_cross;
        Details_descr(id: any): $mol_text;
        question_descr(id: any): string;
        Answers(id: any): $mol_list;
        answers(id: any): any[];
        Answer(id: any): $mol_text;
        question_answer(id: any): string;
        Question_link(index: any): $mol_link;
        question_arg_by_index(index: any): {};
        Question_row(index: any): $mol_row;
        Question_title(index: any): $mol_view;
        question_title_by_index(index: any): string;
        Question_tags(index: any): $mol_view;
        question_tags_by_index(index: any): any[];
        Tag(id: any): $mol_view;
        tag_name(id: any): string;
    }
}
declare namespace $.$$ {
    class $mol_app_questions extends $.$mol_app_questions {
        pages(): $.$mol_page[];
        Placeholder(): $mol_book_placeholder;
        menu_rows(): any;
        question_cur_id(): number;
        question_tags_by_index(index: number): $mol_view[];
        tag_name(id: {
            row: number;
            tag: string;
        }): any;
        question_title_by_index(index: number): string;
        question_arg_by_index(index: number): {
            question: number;
        };
        question_title(id: number): string;
        question_descr(id: number): string;
        question_permalink(id: number): string;
        question_short(index: number): {
            title: string;
            creation_date: number;
            question_id: number;
            tags: string[];
            owner: {
                display_name: string;
            };
        };
        questions_count(): number;
        questions_data(page: number): {
            items: {
                title: string;
                creation_date: number;
                question_id: number;
                tags: string[];
                owner: {
                    display_name: string;
                };
            }[];
        };
        data_page_size(): number;
        question_full(id: number): {
            title: string;
            body_markdown: string;
            link: string;
        };
        question_answers(id: number): {
            score: number;
            body_markdown: string;
            share_link: string;
        }[];
        answers(id: number): $.$mol_text[];
        question_answer(id: {
            question: number;
            answer: number;
        }): string;
    }
}
declare namespace $ {
    class $mol_app_questions_demo extends $mol_demo_large {
        title(): string;
        sub(): any[];
        App(): $mol_app_questions;
    }
}
declare namespace $ {
    class $mol_app_quine extends $mol_page {
        title(): string;
        body(): any[];
        Content(): $mol_row;
        Text(): $mol_text;
        content(): string;
        paths(): any[];
    }
}
declare namespace $.$$ {
    class $mol_app_quine extends $.$mol_app_quine {
        content(): string;
    }
}
declare namespace $ {
    class $mol_app_quine_demo extends $mol_demo_large {
        sub(): any[];
        App(): $mol_app_quine;
    }
}
declare namespace $ {
    class $mol_app_report extends $mol_page {
        title(): string;
        body(): any[];
        descriptor(): $mol_view;
        description(): string;
        tabler(): $mol_app_report_tabler;
        headRower(): $mol_app_report_rower;
        headCells(): any[];
        rows(): any[];
        rower(id: any): $mol_app_report_rower;
        rowerCells(id: any): any[];
        cell(id: any): $mol_app_report_cell;
        cell_content(id: any): any;
        cellrows(id: any): number;
        cellCols(id: any): number;
        texter(id: any): $mol_view;
        cell_value(id: any, val?: any, force?: $mol_atom_force): any;
        select(id: any): $mol_select;
        cell_options(id: any): {};
        number(id: any): $mol_number;
    }
}
declare namespace $ {
    class $mol_app_report_tabler extends $mol_view {
        dom_name(): string;
        sub(): any[];
        rows(): any[];
    }
}
declare namespace $ {
    class $mol_app_report_rower extends $mol_view {
        dom_name(): string;
        sub(): any[];
        cells(): any[];
    }
}
declare namespace $ {
    class $mol_app_report_cell extends $mol_view {
        dom_name(): string;
        attr(): {
            "colspan": number;
            "rowspan": number;
        };
        cols(): number;
        rows(): number;
        sub(): any[];
        content(): any;
    }
}
declare namespace $.$$ {
    interface $mol_app_report_formatCol {
        title: string;
        field?: string;
        sub?: $mol_app_report_formatCol[];
    }
    interface $mol_app_report_formatRow {
        title: string;
        field?: string;
        sub?: $mol_app_report_formatRow[];
    }
    interface $mol_app_report_scheme {
        type: string;
        mask?: string;
        unit?: string;
        options?: {
            [name: string]: string;
        };
    }
    class $mol_app_report extends $.$mol_app_report {
        formatCols(): $mol_app_report_formatCol[];
        format_rows(): $mol_app_report_formatRow[];
        scheme(): {
            [field: string]: $mol_app_report_scheme;
        };
        data(): {
            [field: string]: string;
        };
        description(): string;
        headCells(): $mol_app_report_cell[];
        rows(): $mol_app_report_rower[];
        formatRow(pos: number[]): $mol_app_report_formatRow;
        rowerCells(pos: number[]): $mol_app_report_cell[];
        cellCols(pos: number[]): 0 | 1 | 2;
        cell_content(pos: number[]): $mol_view;
        cell_options(pos: number[]): {
            [name: string]: string;
        };
        cell_value(pos: number[], next: any): any;
        cell_contentName(pos: number[]): string;
        cell_contentValue(pos: number[]): string;
    }
}
declare namespace $ {
    class $mol_app_report_demo extends $mol_demo_large {
        sub(): any[];
        App(): $mol_app_report;
    }
}
declare namespace $ {
    class $mol_app_signup extends $mol_scroll {
        title(): string;
        message_required(): string;
        message_no_spaces(): string;
        message_need_more_letters(): string;
        sub(): any[];
        Form(): $mol_form;
        Name_first_field(): $mol_form_field;
        name_first_label(): string;
        name_first_errors(): any[];
        Name_first_control(): $mol_string;
        name_first_hint(): string;
        name_first(val?: any, force?: $mol_atom_force): any;
        Name_nick_field(): $mol_form_field;
        name_nick_label(): string;
        name_nick_errors(): any[];
        Name_nick_control(): $mol_string;
        name_nick_hint(): string;
        name_nick(val?: any, force?: $mol_atom_force): any;
        Name_second_field(): $mol_form_field;
        name_second_label(): string;
        name_second_errors(): any[];
        Name_second_control(): $mol_string;
        name_second_hint(): string;
        name_second(val?: any, force?: $mol_atom_force): any;
        Sex_field(): $mol_form_field;
        sex_label(): string;
        sex_errors(): any[];
        Sex_control(): $mol_switch;
        sex(val?: any, force?: $mol_atom_force): any;
        sex_options(): {
            "male": string;
            "intersex": string;
            "female": string;
        };
        sex_option_male(): string;
        sex_option_intersex(): string;
        sex_option_female(): string;
        Submit(): $mol_button_major;
        submit_text(): string;
        event_submit(val?: any, force?: $mol_atom_force): any;
        submit_blocked(): boolean;
    }
}
declare namespace $.$$ {
    class $mol_app_signup extends $.$mol_app_signup {
        name_first(next?: string): string;
        name_first_errors(): string[];
        name_nick(next?: string): string;
        name_second(next?: string): string;
        name_second_errors(): string[];
        sex(next?: string): string;
        sex_errors(): string[];
        event_submit(next?: Event): void;
        submit_blocked(): boolean;
    }
}
declare namespace $ {
    class $mol_app_signup_demo extends $mol_demo_large {
        sub(): any[];
        App(): $mol_app_signup;
    }
}
declare namespace $ {
    class $mol_check_icon extends $mol_check {
    }
}
declare namespace $ {
    class $mol_icon_microphone extends $mol_icon {
        path(): string;
    }
}
declare namespace $ {
    class $mol_app_slides extends $mol_view {
        attr(): {
            "mol_app_slides_role": string;
        };
        role(): string;
        contents(val?: any, force?: $mol_atom_force): any;
        plugins(): any[];
        Speech_next(): $mol_speech;
        event_next(val?: any, force?: $mol_atom_force): any;
        speech_next(): any[];
        Speech_slide(): $mol_speech;
        event_slide(val?: any, force?: $mol_atom_force): any;
        speech_slide(): any[];
        Speech_prev(): $mol_speech;
        event_prev(val?: any, force?: $mol_atom_force): any;
        speech_prev(): any[];
        Speech_start(): $mol_speech;
        event_start(val?: any, force?: $mol_atom_force): any;
        speech_start(): any[];
        Speech_end(): $mol_speech;
        event_end(val?: any, force?: $mol_atom_force): any;
        speech_end(): any[];
        Speech_about(): $mol_speech;
        event_about(val?: any, force?: $mol_atom_force): any;
        speech_about(): any[];
        sub(): any[];
        Listener(): $mol_page;
        Slide_number(): $mol_view;
        slide(val?: any, force?: $mol_atom_force): any;
        Listener_content(): $mol_text;
        uri_base(): string;
        listener_content(): string;
        Progress(): $mol_portion;
        progress(): number;
        Speaker(): $mol_page;
        Open_listener(): $mol_link;
        open_listener_hint(): string;
        Open_listener_icon(): $mol_icon_external;
        Speech_toggle(): $mol_check_icon;
        Speech_toggle_icon(): $mol_icon_microphone;
        speech_enabled(val?: any, force?: $mol_atom_force): any;
        speech_toggle_hint(): string;
        Slide_switcher(): $mol_number;
        Speaker_content(): $mol_text;
        speaker_content(): string;
        Loader(): $mol_view;
        uri_slides(): string;
        uri_slides_default(): string;
        event_load(val?: any, force?: $mol_atom_force): any;
    }
}
declare namespace $.$$ {
    class $mol_app_slides extends $.$mol_app_slides {
        sub(): $mol_view[] | $.$mol_page[];
        uri_base(): any;
        event_load(): void;
        content_pages(): {
            title: string;
            speaker: string;
            listener: string;
        }[];
        title(): string;
        speaker_content(): string;
        listener_content(): string;
        slide_local(uri: string, next: number): number;
        slide(next?: number): number;
        role(next?: 'speaker' | 'listener'): any;
        uri_slides(): any;
        event_next(next?: Event): void;
        event_prev(next?: Event): void;
        event_start(next?: Event): void;
        event_end(next?: Event): void;
        event_slide([numb]: [string]): void;
        event_about([topic]: [string]): void;
        speech_enabled(next?: boolean): boolean;
        timings(): number[];
        timing_total(): number;
        progress(): number;
    }
}
declare namespace $ {
    class $mol_cost extends $mol_view {
        value(): any;
        sub(): any[];
        Prefix(): $mol_view;
        prefix(): string;
        Value(): $mol_view;
        value_view(): string;
        Postfix(): $mol_view;
        postfix(): string;
    }
}
declare namespace $.$$ {
    class $mol_cost extends $.$mol_cost {
        value(): $mol_unit_money;
        prefix(): string;
        value_view(): string;
        postfix(): string;
    }
}
declare namespace $ {
    class $mol_app_supplies_domain_provider extends $mol_object {
        id(): string;
        name(): string;
    }
    class $mol_app_supplies_domain_supply_group extends $mol_object {
        id(): string;
        name(): string;
        manager(): $mol_app_supplies_domain_person;
    }
    class $mol_app_supplies_domain_supply_division extends $mol_object {
        id(): string;
        name(): string;
    }
    class $mol_app_supplies_domain_pay_method extends $mol_object {
        id(): string;
        name(): string;
    }
    class $mol_app_supplies_domain_debitor extends $mol_object {
        id(): string;
        name(): string;
    }
    class $mol_app_supplies_domain_supply_position extends $mol_object {
        name(): string;
        supply_moment(): $mol_time_moment;
        division(): $mol_app_supplies_domain_supply_division;
        store(): $mol_app_supplies_domain_store;
        price(): $mol_unit_money;
        quantity(): number;
        cost(): $mol_unit_money;
    }
    class $mol_app_supplies_domain_attachment extends $mol_object {
        url_thumb(): string;
        url_load(): string;
    }
    class $mol_app_supplies_domain_person extends $mol_object {
        id(): string;
        name(): string;
    }
    class $mol_app_supplies_domain_contract extends $mol_object {
        id(): string;
    }
    class $mol_app_supplies_domain_ballance_unit extends $mol_object {
        id(): string;
        name(): string;
    }
    class $mol_app_supplies_domain_consumer extends $mol_object {
        id(): string;
        name(): string;
    }
    class $mol_app_supplies_domain_store extends $mol_object {
        id(): string;
        name(): string;
    }
    class $mol_app_supplies_domain_supply extends $mol_object {
        id(): string;
        provider(): $mol_app_supplies_domain_provider;
        consumer(): $mol_app_supplies_domain_consumer;
        group(): $mol_app_supplies_domain_supply_group;
        status(next?: $mol_app_supplies_domain_supply_status): $mol_app_supplies_domain_supply_status;
        ballance_unit(): $mol_app_supplies_domain_ballance_unit;
        manager(): $mol_app_supplies_domain_person;
        contract(): $mol_app_supplies_domain_contract;
        pay_method(): $mol_app_supplies_domain_pay_method;
        debitor(): $mol_app_supplies_domain_debitor;
        positions(): $mol_app_supplies_domain_supply_position[];
        attachments(next?: $mol_app_supplies_domain_attachment[]): $mol_app_supplies_domain_attachment[];
        cost(): $mol_unit_money;
    }
    enum $mol_app_supplies_domain_supply_status {
        pending,
        approved,
    }
    class $mol_app_supplies_domain_mock extends $mol_object {
        supplies(): $mol_app_supplies_domain_supply[];
        positions(supply: string): $mol_app_supplies_domain_supply_position[];
        supply_status(id: string, next?: $mol_app_supplies_domain_supply_status): $mol_app_supplies_domain_supply_status;
        supply(id: string): $mol_app_supplies_domain_supply;
        provider(id: string): $mol_app_supplies_domain_provider;
        consumer(id: string): $mol_app_supplies_domain_consumer;
        ballance_unit(id: string): $mol_app_supplies_domain_ballance_unit;
        division(id: string): $mol_app_supplies_domain_supply_division;
        supply_group(id: string): $mol_app_supplies_domain_supply_group;
        store(id: string): $mol_app_supplies_domain_store;
        person(id: string): $mol_app_supplies_domain_person;
        contract(id: string): $mol_app_supplies_domain_person;
        pay_method(id: string): $mol_app_supplies_domain_pay_method;
        debitor(id: string): $mol_app_supplies_domain_pay_method;
        position(id: {
            supply: string;
            position: string;
        }): $mol_app_supplies_domain_supply_position;
        attachments(id: string, next?: $mol_app_supplies_domain_attachment[]): $mol_app_supplies_domain_attachment[];
        attachment(id: {
            supply: string;
            attachment: string;
        }): $mol_app_supplies_domain_attachment;
    }
}
declare namespace $ {
    class $mol_app_supplies_card extends $mol_link {
        supply(): any;
        sub(): any[];
        Card(): $mol_card;
        status(): string;
        Group(): $mol_row;
        items(): any[];
        Code_item(): $mol_labeler;
        code_title(): string;
        code(): string;
        Cost_item(): $mol_labeler;
        cost_title(): string;
        Cost(): $mol_cost;
        cost(): $mol_unit_money;
        Provider_item(): $mol_labeler;
        provider_title(): string;
        provider_name(): string;
    }
}
declare namespace $.$$ {
    class $mol_app_supplies_card extends $.$mol_app_supplies_card {
        supply(): $mol_app_supplies_domain_supply;
        code(): string;
        provider_name(): string;
        cost(): $mol_unit_money;
        status(): string;
    }
}
declare namespace $ {
    class $mol_app_supplies_enter extends $mol_view {
        entered(val?: any, force?: $mol_atom_force): any;
        sub(): any[];
        form(): $mol_form;
        loginField(): $mol_form_field;
        loginLabel(): string;
        loginErrors(): any[];
        loginControl(): $mol_string;
        login(val?: any, force?: $mol_atom_force): any;
        passwordField(): $mol_form_field;
        passwordLabel(): string;
        passwordErrors(): any[];
        passControl(): $mol_string;
        password(val?: any, force?: $mol_atom_force): any;
        submit(): $mol_button_major;
        submitLabel(): string;
        event_submit(val?: any, force?: $mol_atom_force): any;
        submit_blocked(): boolean;
    }
}
declare namespace $.$$ {
    class $mol_app_supplies_enter extends $.$mol_app_supplies_enter {
        event_submit(): void;
    }
}
declare namespace $ {
    class $mol_app_supplies_list extends $mol_page {
        supplies(): any[];
        title(): string;
        head(): any[];
        Search(): $mol_code;
        search_hint(): string;
        search_query(val?: any, force?: $mol_atom_force): any;
        body(): any[];
        Supply_rows(): $mol_list;
        supply_rows(): any[];
        Supply_row(index: any): $mol_app_supplies_card;
        supply(index: any): any;
        supply_arg(index: any): {
            "supply": string;
        };
        supply_id(index: any): string;
    }
}
declare namespace $.$$ {
    class $mol_app_supplies_list extends $.$mol_app_supplies_list {
        supply_rows(): $.$mol_app_supplies_card[];
        supply(index: number): any;
        supply_id(index: number): any;
    }
}
declare namespace $ {
    class $mol_deck extends $mol_list {
        items(): any[];
        rows(): any[];
        Switch(): $mol_switch;
        current(val?: any, force?: $mol_atom_force): any;
        switch_options(): {};
        Content(): any;
    }
}
declare namespace $.$$ {
    class $mol_deck extends $.$mol_deck {
        current(next?: string): string;
        switch_options(): {
            [key: string]: () => string;
        };
        Content(): any;
    }
}
declare namespace $ {
    class $mol_section extends $mol_list {
        rows(): any[];
        Head(): $mol_view;
        head(): any;
        Content(): any;
    }
}
declare namespace $ {
    class $mol_tiler extends $mol_view {
        sub(): any[];
        items(): any[];
    }
}
declare namespace $.$$ {
    class $mol_tiler extends $.$mol_tiler {
        sub(): $mol_view[];
        groupItems(path: number[]): $mol_view[];
        groupChilds(path: number[]): $mol_view[];
        child(path: number[]): $mol_view;
        group(path: number[]): $mol_view;
        item(path: number[]): $mol_view;
    }
}
declare namespace $ {
    class $mol_icon_attach extends $mol_icon {
        path(): string;
    }
}
declare namespace $ {
    class $mol_attach extends $mol_card {
        Content(): $mol_tiler;
        content(): any[];
        items(val?: any, force?: $mol_atom_force): any;
        Add(): $mol_attach_add;
        attach_new(val?: any, force?: $mol_atom_force): any;
        Item(id: any): $mol_attach_item;
        attach_title(): string;
    }
}
declare namespace $ {
    class $mol_attach_item extends $mol_link {
        url_thumb(val?: any, force?: $mol_atom_force): any;
        uri(val?: any, force?: $mol_atom_force): any;
        url_load(val?: any, force?: $mol_atom_force): any;
        style(): {
            "backgroundImage": string;
        };
        style_bg(): string;
        attr(): {
            "download": string;
            "href": string;
            "title": string;
            "target": string;
            "mol_link_current": boolean;
        };
        title(): string;
    }
}
declare namespace $ {
    class $mol_attach_add extends $mol_button_minor {
        minimal_height(): number;
        file_new(val?: any, force?: $mol_atom_force): any;
        sub(): any[];
        Icon(): $mol_icon_attach;
        Input(): $mol_attach_add_input;
        event_capture(val?: any, force?: $mol_atom_force): any;
        event_picked(val?: any, force?: $mol_atom_force): any;
    }
}
declare namespace $ {
    class $mol_attach_add_input extends $mol_view {
        dom_name(): string;
        attr(): {
            "type": string;
            "accept": string;
            "multiple": boolean;
        };
        type(): string;
        accept(): string;
        multiple(): boolean;
        event_click(val?: any, force?: $mol_atom_force): any;
        event_capture(val?: any, force?: $mol_atom_force): any;
        event(): {
            "change": (val?: any) => any;
        };
        event_picked(val?: any, force?: $mol_atom_force): any;
    }
}
declare namespace $.$$ {
    class $mol_attach extends $.$mol_attach {
        attach_new(next?: string): string;
    }
    class $mol_attach_item extends $.$mol_attach_item {
        style_bg(): string;
    }
    class $mol_attach_add extends $.$mol_attach_add {
        file_new(next?: string): string;
        event_capture(next?: Event): void;
        event_picked(next?: Event): void;
    }
}
declare namespace $ {
    class $mol_app_supplies_position extends $mol_card {
        minimal_height(): number;
        position(): $mol_app_supplies_domain_supply_position;
        Content(): $mol_view;
        Row(): $mol_view;
        Main_group(): $mol_row;
        Product_item(): $mol_labeler;
        product_title(): string;
        product_name(): string;
        Cost_item(): $mol_labeler;
        cost_title(): string;
        Cost(): $mol_cost;
        cost(): $mol_unit_money;
        Addon_group(): $mol_row;
        Division_item(): $mol_labeler;
        division_title(): string;
        division_name(): string;
        Price_item(): $mol_labeler;
        price_label(): string;
        Price(): $mol_cost;
        price(): $mol_unit_money;
        Supply_group(): $mol_row;
        Quantity_item(): $mol_labeler;
        quantity_title(): string;
        quantity(): string;
        Supply_date_item(): $mol_labeler;
        supply_date_title(): string;
        supply_date(): string;
        Store_item(): $mol_labeler;
        store_title(): string;
        store_name(): string;
    }
}
declare namespace $.$$ {
    class $mol_app_supplies_position extends $.$mol_app_supplies_position {
        product_name(): string;
        price(): $mol_unit_money;
        quantity(): string;
        cost(): $mol_unit_money;
        supply_date(): string;
        division_name(): string;
        store_name(): string;
    }
}
declare namespace $ {
    class $mol_app_supplies_detail extends $mol_page {
        supply(): any;
        title(): string;
        tools(): any[];
        Close(): $mol_link;
        Close_icon(): $mol_icon_cross;
        close_arg(): {
            "supply": any;
        };
        body(): any[];
        Content(): $mol_list;
        Descr_card(): $mol_card;
        Descr_deck(): $mol_deck;
        Org(): {
            "title": string;
            "Content": $mol_row;
        };
        org_title(): string;
        Org_content(): $mol_row;
        org_items(): any[];
        Provider(): $mol_labeler;
        provider_title(): string;
        provider_name(): string;
        Consumer(): $mol_labeler;
        customer_label(): string;
        consumer_name(): string;
        Supply_group(): $mol_labeler;
        supply_group_title(): string;
        supply_group_name(): string;
        Ballance_unit_item(): $mol_labeler;
        ballance_unit_title(): string;
        ballance_unit_name(): string;
        Cons(): {
            "title": string;
            "Content": $mol_row;
        };
        cons_title(): string;
        Cons_content(): $mol_row;
        cons_items(): any[];
        Contract(): $mol_labeler;
        contract_title(): string;
        contract_id(): string;
        Pay_method(): $mol_labeler;
        pay_method_title(): string;
        pay_method_name(): string;
        Manager(): $mol_labeler;
        manager_title(): string;
        manager_name(): string;
        Debitor(): $mol_labeler;
        debitod_title(): string;
        debitor_name(): string;
        Attach_section(): $mol_section;
        attach_title(): string;
        Attach(): $mol_attach;
        attachments(): any[];
        attach_new(val?: any, force?: $mol_atom_force): any;
        Positions_section(): $mol_section;
        positions_head(): any[];
        positions_title(): string;
        Cost(): $mol_labeler;
        cost_title(): string;
        Cost_value(): $mol_cost;
        cost(): $mol_unit_money;
        Positions(): $mol_list;
        positions(): any[];
        foot(): any[];
        Actions(): $mol_row;
        actions(): any[];
        Approve(): $mol_check_box;
        approved(val?: any, force?: $mol_atom_force): any;
        approved_title(): string;
        Position(index: any): $mol_app_supplies_position;
        position(index: any): any;
        Attachment(index: any): $mol_attach_item;
        attachment_thumb(index: any): string;
        attachment_load(index: any): string;
    }
}
declare namespace $.$$ {
    class $mol_app_supplies_detail extends $.$mol_app_supplies_detail {
        supply(): $mol_app_supplies_domain_supply;
        title(): string;
        approved(next?: boolean): boolean;
        provider_name(): string;
        consumer_name(): string;
        ballance_unit_name(): string;
        supply_group_name(): string;
        manager_name(): string;
        pay_method_name(): string;
        debitor_name(): string;
        contract_id(): string;
        cost(): $mol_unit_money;
        status(): string;
        positions(): $.$mol_app_supplies_position[];
        position(index: number): $mol_app_supplies_domain_supply_position;
        attachments(): $.$mol_attach_item[];
        attachment_thumb(index: number): string;
        attachment_load(index: number): string;
        attach_new(next?: string): void;
        body_scroll_top(next?: number): number;
    }
}
declare namespace $ {
    class $mol_app_supplies_root extends $mol_book {
        enter(): $mol_app_supplies_enter;
        entered(val?: any, force?: $mol_atom_force): any;
        lister(): $mol_app_supplies_list;
        supplies(): any[];
        supply_id(val?: any, force?: $mol_atom_force): any;
        detailer(): $mol_app_supplies_detail;
        supply(): any;
        placeholder(): $mol_book_placeholder;
    }
}
declare namespace $.$$ {
    class $mol_app_supplies_root extends $.$mol_app_supplies_root {
        entered(next?: boolean): boolean;
        pages(): $mol_view[] | $.$mol_app_supplies_enter[];
        Placeholder(): $mol_book_placeholder;
        domain(): $mol_app_supplies_domain_mock;
        supplies(): $mol_app_supplies_domain_supply[];
        supply_id(next?: string): any;
        supply(): $mol_app_supplies_domain_supply;
    }
}
declare namespace $ {
    class $mol_app_supplies_demo extends $mol_demo_large {
        title(): string;
        sub(): any[];
        App(): $mol_app_supplies_root;
    }
}
declare namespace $ {
    class $mol_app_taxon extends $mol_page {
        title(): string;
        Body(): $mol_grid;
        Grid(): $mol_grid;
        hierarchy(): any;
        hierarchy_field(): string;
        record(id: any): any;
    }
}
declare namespace $.$$ {
    interface $mol_app_taxon_data_row {
        KeyId: number;
    }
    class $mol_app_taxon extends $.$mol_app_taxon {
        hierarchy_uri(): string;
        hierarchy(): {
            [key: string]: $mol_grid_node;
        };
        data_uri(): string;
        data_resource(id: string): $mol_http;
        data_table(): {
            [id: string]: $mol_app_taxon_data_row;
        };
        record(id: string): $mol_app_taxon_data_row;
    }
}
declare namespace $ {
    class $mol_app_taxon_demo extends $mol_demo_large {
        sub(): any[];
        App(): $mol_app_taxon;
        hierarchy(): {};
        record(path: any): {};
    }
}
declare namespace $.$$ {
    class $mol_app_taxon_demo extends $.$mol_app_taxon_demo {
        hierarchy(): {
            [key: string]: $mol_grid_node;
        };
        record(path: number[]): {
            name: string;
            age: number;
            sex: string;
            sexPrefer: string;
            birthDay: string;
            birthCity: string;
            deathDay: string;
            deathCity: string;
            cityWork: string;
            company: string;
            phoneOS: string;
            fingersCount: number;
        };
    }
}
declare namespace $ {
    function $mol_merge_dict<Target, Source>(target: Target, source: Source): Target & Source;
}
declare namespace $ {
    class $mol_app_todomvc extends $mol_scroll {
        title(): string;
        sub(): any[];
        Page(): $mol_list;
        Title(): $mol_view;
        Panel(): $mol_list;
        panels(): any[];
        Head(): $mol_view;
        Head_content(): any[];
        Head_complete(): $mol_check;
        head_complete_enabled(): boolean;
        completed_all(val?: any, force?: $mol_atom_force): any;
        Add(): $mol_app_todomvc_add;
        task_title_new(val?: any, force?: $mol_atom_force): any;
        event_add(event?: any, force?: $mol_atom_force): any;
        List(): $mol_list;
        task_rows(): any[];
        Foot(): $mol_view;
        foot_content(): any[];
        Pending(): $mol_view;
        pending_message(): string;
        Filter(): $mol_bar;
        filterOptions(): any[];
        Filter_all(): $mol_link;
        filter_all_label(): string;
        Filter_active(): $mol_link;
        filter_active_label(): string;
        Filter_completed(): $mol_link;
        filter_completed_label(): string;
        Sweep(): $mol_button_minor;
        sweep_enabled(): boolean;
        event_sweep(event?: any, force?: $mol_atom_force): any;
        sweep_label(): string;
        Task_row(id: any): $mol_app_todomvc_task_row;
        task_completed(id: any, val?: any, force?: $mol_atom_force): any;
        task_title(id: any, val?: any, force?: $mol_atom_force): any;
        event_task_drop(id: any, event?: any, force?: $mol_atom_force): any;
    }
}
declare namespace $ {
    class $mol_app_todomvc_add extends $mol_string {
        hint(): string;
        event(): {
            "keyup": (event?: any) => any;
            "input": (event?: any) => any;
            "keypress": (event?: any) => any;
        };
        event_press(event?: any, force?: $mol_atom_force): any;
        event_done(event?: any, force?: $mol_atom_force): any;
    }
}
declare namespace $ {
    class $mol_app_todomvc_task_row extends $mol_view {
        minimal_height(): number;
        sub(): any[];
        Complete(): $mol_check;
        completed(val?: any, force?: $mol_atom_force): any;
        Title(): $mol_string;
        title_hint(): string;
        title(val?: any, force?: $mol_atom_force): any;
        Drop(): $mol_button_typed;
        event_drop(event?: any, force?: $mol_atom_force): any;
        attr(): {
            "mol_app_todomvc_task_row_completed": any;
        };
    }
}
interface $mol_app_todomvc_task {
    completed?: boolean;
    title?: string;
}
declare namespace $.$$ {
    class $mol_app_todomvc_add extends $.$mol_app_todomvc_add {
        event_press(next?: KeyboardEvent): any;
    }
    class $mol_app_todomvc extends $.$mol_app_todomvc {
        task_ids(next?: number[]): number[];
        arg_completed(): any;
        groups_completed(): {
            [index: string]: number[];
        };
        tasks_filtered(): number[];
        completed_all(next?: boolean): boolean;
        head_complete_enabled(): boolean;
        pending_message(): string;
        new_id(): number;
        event_add(next: Event): void;
        task_rows(): $mol_app_todomvc_task_row[];
        task(id: number, next?: $mol_app_todomvc_task): $mol_app_todomvc_task;
        task_completed(index: number, next?: boolean): boolean;
        task_title(index: number, next?: string): string;
        event_task_drop(index: number, next?: Event): void;
        event_sweep(): void;
        panels(): ($mol_view | $.$mol_list)[];
        foot_visible(): boolean;
        sweep_enabled(): boolean;
    }
}
declare namespace $ {
    class $mol_app_todomvc_demo extends $mol_demo_large {
        sub(): any[];
        App(): $mol_app_todomvc;
    }
}
declare namespace $ {
    class $mol_app_users extends $mol_page {
        head(): any[];
        Head_row(): $mol_row;
        Filter(): $mol_string;
        filter_hint(): string;
        query(val?: any, force?: $mol_atom_force): any;
        body(): any[];
        List(): $mol_list;
        user_rows(): any[];
        Empty(): $mol_view;
        empty_message(): string;
        Foot(): $mol_row;
        Reload(): $mol_button_minor;
        reload_label(): string;
        event_reload(val?: any, force?: $mol_atom_force): any;
        Add(): $mol_button_minor;
        loaded(): boolean;
        add_label(): string;
        event_add(val?: any, force?: $mol_atom_force): any;
        Save(): $mol_button_major;
        changed(): boolean;
        save_label(): string;
        event_save(val?: any, force?: $mol_atom_force): any;
        Message(): $mol_status;
        users_master(): any;
        plugins(): any[];
        Touch(): $mol_touch;
        User_row(id: any): $mol_app_users_row;
        user_name(id: any, val?: any, force?: $mol_atom_force): any;
        event_user_drop(id: any, val?: any, force?: $mol_atom_force): any;
    }
}
declare namespace $ {
    class $mol_app_users_row extends $mol_row {
        minimal_height(): number;
        sub(): any[];
        Title(): $mol_string;
        title(val?: any, force?: $mol_atom_force): any;
        Drop(): $mol_button_minor;
        drop_label(): string;
        event_drop(val?: any, force?: $mol_atom_force): any;
    }
}
declare namespace $.$$ {
    class $mol_app_users extends $.$mol_app_users {
        query(next?: string, force?: $mol_atom_force): string;
        master(): $mol_http;
        sub(): $mol_view[];
        users(next?: string[], force?: $mol_atom_force): string[];
        users_master(next?: string[], force?: $mol_atom_force): string[];
        event_reload(next?: Event): void;
        event_add(next?: Event): void;
        event_user_drop(id: number, next?: Event): void;
        changed(): boolean;
        loaded(): boolean;
        event_save(next?: Event): void;
        user_rows(): $mol_app_users_row[];
        user_name(index: number, next?: string): string;
    }
}
declare namespace $ {
    function $mol_assert_ok(value: any): void;
    function $mol_assert_not(value: any): void;
    function $mol_assert_fail(handler: () => any, ErrorRight?: any): any;
    function $mol_assert_equal<Value>(a: Value, b: Value): void;
    function $mol_assert_unique<Value>(a: Value, b: Value): void;
}
declare namespace $ {
    function $mol_atom_task<Value>(host: any, handler: () => Value): $mol_atom<Value>;
}
declare namespace $ {
    class $mol_demo_small extends $mol_view {
    }
}
declare namespace $ {
    class $mol_attach_demo extends $mol_demo_small {
        title(): string;
        sub(): any[];
        Empty(): $mol_attach;
        empty_items(val?: any, force?: $mol_atom_force): any;
        Filled(): $mol_attach;
        filled_items(val?: any, force?: $mol_atom_force): any;
        Item1(): $mol_attach_item;
        Item2(): $mol_attach_item;
        Item3(): $mol_attach_item;
    }
}
declare namespace $ {
    class $mol_bar_demo extends $mol_demo_small {
        title(): string;
        sub(): any[];
        Two(): $mol_bar;
        Two_mail(): $mol_string;
        mail_hint(): string;
        mail(val?: any, force?: $mol_atom_force): any;
        Two_submit(): $mol_button_minor;
        submit_title(): string;
        Three(): $mol_bar;
        Three_mail(): $mol_string;
        Three_confirm(): $mol_check_box;
        confirm_title(): string;
        confirmed(val?: any, force?: $mol_atom_force): any;
        Three_submit(): $mol_button_minor;
    }
}
declare namespace $ {
    class $mol_bench_demo extends $mol_demo_small {
        title(): string;
        sub(): any[];
        View(): $mol_bench;
        col_sort(val?: any, force?: $mol_atom_force): any;
        result(): {};
    }
}
declare namespace $.$$ {
    class $mol_bench_demo extends $.$mol_bench_demo {
        result(): {
            'bubble': {
                'algorithm': string;
                'min': string;
                'mid': string;
                'max': string;
            };
            'qsort': {
                'algorithm': string;
                'min': string;
                'mid': string;
                'max': string;
            };
        };
    }
}
declare namespace $ {
    class $mol_book_demo extends $mol_demo_large {
        title(): string;
        sub(): any[];
        View(): $mol_book;
        Placeholder(): $mol_book_placeholder;
        Addon(): $mol_view;
        Main(): $mol_view;
    }
}
declare namespace $ {
    class $mol_graph<Node, Edge> {
        nodes: {
            [id: string]: Node;
        };
        edgesOut: {
            [from: string]: {
                [to: string]: Edge;
            };
        };
        edgesIn: {
            [to: string]: {
                [from: string]: Edge;
            };
        };
        nodeEnsure(id: string): void;
        linkOut(from: string, to: string, edge: Edge): void;
        linkIn(to: string, from: string, edge: Edge): void;
        edgeOut(from: string, to: string): Edge;
        edgeIn(to: string, from: string): Edge;
        link(one: string, two: string, edge: Edge): void;
        sorted(getWeight: (edge: Edge) => number): string[];
    }
}
declare namespace $ {
    function $mol_exec(dir: string, command: string, ...args: string[]): any;
}
declare namespace $ {
    class $mol_build extends $mol_object {
        static root(path: string): $mol_build;
        static relative(path: string): $mol_build;
        server(): $mol_build_server;
        root(): $mol_file;
        mods({path, exclude}: {
            path: string;
            exclude?: string[];
        }): $mol_file[];
        modsRecursive({path, exclude}: {
            path: string;
            exclude?: string[];
        }): $mol_file[];
        sources({path, exclude}: {
            path: string;
            exclude?: string[];
        }): $mol_file[];
        sourcesSorted({path, exclude}: {
            path: string;
            exclude?: string[];
        }): $mol_file[];
        sourcesAll({path, exclude}: {
            path: string;
            exclude?: string[];
        }): $mol_file[];
        tsOptions(): any;
        tsSource({path, target}: {
            path: string;
            target: number;
        }): any;
        tsHost(): {
            getScriptVersion: (path: string) => any;
            getScriptSnapshot: (path: string) => any;
            getCurrentDirectory: () => string;
            getCompilationSettings: () => any;
            useCaseSensitiveFileNames: () => boolean;
            getCanonicalFileName: (path: string) => string;
            getDefaultLibFileName: (options: any) => any;
            getCommonSourceDirectory: () => string;
            getNewLine: () => string;
            getSourceFile: (path: string, target: any, fail: any) => any;
            fileExists: (path: string) => boolean;
            writeFile: (path: string, content: string) => void;
        };
        tsProgram({path, exclude}: {
            path: string;
            exclude?: string[];
        }): any;
        sourcesJS({path, exclude}: {
            path: string;
            exclude?: string[];
        }): $mol_file[];
        sourcesDTS({path, exclude}: {
            path: string;
            exclude?: string[];
        }): $mol_file[];
        sourcesCSS({path, exclude}: {
            path: string;
            exclude?: string[];
        }): $mol_file[];
        static dependors: {
            [index: string]: (source: $mol_file) => {
                [index: string]: number;
            };
        };
        srcDeps(path: string): {};
        modDeps({path, exclude}: {
            path: string;
            exclude?: string[];
        }): {
            [index: string]: number;
        };
        dependencies({path, exclude}: {
            path: string;
            exclude?: string[];
        }): {};
        packEnsure(name: string): boolean;
        modEnsure(path: string): boolean;
        packMapping(): $mol_tree;
        graph({path, exclude}: {
            path: string;
            exclude?: string[];
        }): $mol_graph<null, {
            priority: number;
        }>;
        bundle({path, bundle}: {
            path: string;
            bundle?: string;
        }): Object[];
        logBundle(target: $mol_file): void;
        bundleJS({path, exclude, bundle}: {
            path: string;
            exclude?: string[];
            bundle: string;
        }): $mol_file[];
        bundleTestJS({path, exclude, bundle}: {
            path: string;
            exclude?: string[];
            bundle: string;
        }): $mol_file[];
        bundleDTS({path, exclude, bundle}: {
            path: string;
            exclude?: string[];
            bundle: string;
        }): $mol_file[];
        bundleViewTree({path, exclude, bundle}: {
            path: string;
            exclude?: string[];
            bundle: string;
        }): $mol_file[];
        bundlePackageJSON({path, exclude}: {
            path: string;
            exclude?: string[];
        }): $mol_file[];
        bundleFiles({path, exclude}: {
            path: string;
            exclude?: string[];
        }): $mol_file[];
        bundleCordova({path, exclude}: {
            path: string;
            exclude?: string[];
        }): $mol_file[];
        bundleCSS({path, exclude, bundle}: {
            path: string;
            exclude?: string[];
            bundle: string;
        }): $mol_file[];
        bundleLocale({path, exclude, bundle}: {
            path: string;
            exclude?: string[];
            bundle: string;
        }): $mol_file[];
        bundleDepsJSON({path, exclude, bundle}: {
            path: string;
            exclude?: string[];
            bundle: string;
        }): $mol_file[];
    }
}
declare namespace $ {
    class $mol_server extends $mol_object {
        express(): any;
        messageStart(port: number): string;
        expressHandlers(): any[];
        expressCompressor(): any;
        expressBodier(): any;
        expressFiler(): any;
        expressDirector(): any;
        expressGenerator(): (req: any, res: any, next: () => void) => void;
        bodyLimit(): string;
        cacheTime(): number;
        port(): number;
        rootPublic(): string;
    }
}
declare namespace $ {
    class $mol_build_server extends $mol_server {
        expressGenerator(): (req: any, res: any, next: () => void) => void;
        build(): $mol_build;
        generator(path: string): Object[];
        port(): number;
    }
}
declare var process: any;
declare namespace $ {
    function $mol_build_start(paths: string[]): void;
}
declare namespace $ {
    class $mol_button_demo extends $mol_demo_small {
        title(): string;
        sub(): any[];
        Major_enabled(): $mol_button_major;
        major_label(): string;
        Major_disabled(): $mol_button_major;
        Minor_enabled(): $mol_button_minor;
        minor_label(): string;
        Minor_disabled(): $mol_button_minor;
        Danger_enabled(): $mol_button_danger;
        danger_label(): string;
        Danger_disabled(): $mol_button_danger;
    }
}
declare namespace $ {
    class $mol_card_demo extends $mol_demo_small {
        title(): string;
        sub(): any[];
        Simple(): $mol_card;
        Pending(): $mol_card;
    }
}
declare namespace $ {
    class $mol_chart_demo_simple extends $mol_demo_large {
        title(): string;
        sub(): any[];
        Chart(): $mol_chart;
        Vert_ruler(): $mol_plot_ruler_vert;
        vert_title(): string;
        Hor_ruler(): $mol_plot_ruler_hor;
        hor_title(): string;
        hor_label_text(key: any): string;
        Plan(): $mol_plot_bar;
        plan_title(): string;
        plan(): {
            "january": number;
            "february": number;
            "march": number;
            "april": number;
        };
        Fact(): $mol_plot_group;
        fact_title(): string;
        fact(): {
            "january": number;
            "february": number;
            "march": number;
        };
        Fact_line(): $mol_plot_line;
        Fact_dots(): $mol_plot_dot;
    }
}
declare namespace $.$$ {
    class $mol_chart_demo_simple extends $.$mol_chart_demo_simple {
        hor_label_text(key: string): string;
    }
}
declare namespace $ {
    class $mol_plot_fill extends $mol_plot_graph {
        front(): any[];
        sub(): any[];
        Curve(): $mol_svg_path;
        curve(): string;
        Sample(): $mol_plot_graph_sample;
    }
}
declare namespace $.$$ {
    class $mol_plot_fill extends $.$mol_plot_fill {
        curve(): string;
        back(): this[];
    }
}
declare namespace $ {
    class $mol_chart_demo_styles extends $mol_demo_large {
        title(): string;
        samples_count(): number;
        sub(): any[];
        Chart(): $mol_chart;
        Energy(): $mol_plot_ruler_vert;
        energy_title(): string;
        Day(): $mol_plot_ruler_hor;
        day_title(): string;
        series_1(): any[];
        Receipts(): $mol_plot_bar;
        receipts_title(): string;
        series_2(): any[];
        Receipts_confirmed(): $mol_plot_bar;
        receipts_confirmed_title(): string;
        series_3(): any[];
        Maximum(): $mol_plot_dot;
        maximum_title(): string;
        Waste(): $mol_plot_line;
        waste_title(): string;
        series_4(): any[];
        Purchases(): $mol_plot_group;
        purchases_title(): string;
        series_5(): any[];
        Purchases_fill(): $mol_plot_fill;
        Purchases_line(): $mol_plot_line;
        Purchases_dots(): $mol_plot_dot;
        Taxes(): $mol_plot_group;
        taxes_title(): string;
        series_6(): any[];
        Taxes_fill(): $mol_plot_fill;
        Taxes_line(): $mol_plot_line;
        Taxes_dots(): $mol_plot_dot;
    }
}
declare namespace $.$$ {
    class $mol_chart_demo_styles extends $.$mol_chart_demo_styles {
        series(): number[];
        series_1(): number[];
        series_2(): number[];
        series_3(): number[];
        series_4(): number[];
        series_5(): number[];
        series_6(): number[];
    }
}
declare namespace $ {
    class $mol_check_box_demo extends $mol_demo_small {
        title(): string;
        sub(): any[];
        Labeled_base(): $mol_check_box;
        base_checked(val?: any, force?: $mol_atom_force): any;
        c1Label(): string;
        Labeled_checked(): $mol_check_box;
        c2Label(): string;
        checked_checked(val?: any, force?: $mol_atom_force): any;
        Labeled_disabled(): $mol_check_box;
        c6Label(): string;
        Alone_base(): $mol_check_box;
        Alone_checked(): $mol_check_box;
        Alone_disabled(): $mol_check_box;
    }
}
declare namespace $ {
    class $mol_check_expand_demo extends $mol_demo_small {
        title(): string;
        sub(): any[];
        Labeled_base(): $mol_check_expand;
        base_expanded(val?: any, force?: $mol_atom_force): any;
        c1Label(): string;
        Labeled_expanded(): $mol_check_expand;
        c2Label(): string;
        expanded_expanded(val?: any, force?: $mol_atom_force): any;
        Empty_base(): $mol_check_expand;
        Empty_expanded(): $mol_check_expand;
        Disabled(): $mol_check_expand;
        c5Label(): string;
    }
}
declare namespace $ {
    class $mol_check_icon_demo extends $mol_demo_small {
        title(): string;
        sub(): any[];
        Base(): $mol_check_icon;
        Base_icon(): $mol_icon_microphone;
        base_checked(val?: any, force?: $mol_atom_force): any;
        Checked(): $mol_check_icon;
        Checked_icon(): $mol_icon_microphone;
        checked_checked(val?: any, force?: $mol_atom_force): any;
        Disabled(): $mol_check_box;
        Disabled_icon(): $mol_icon_microphone;
    }
}
declare namespace $ {
    class $mol_code_demo extends $mol_demo_small {
        title(): string;
        sub(): any[];
        Qr(): $mol_code;
        Matrix(): $mol_code;
        Upc_e(): $mol_code;
        Upc_a(): $mol_code;
        Ean_8(): $mol_code;
        Ean_13(): $mol_code;
        Code_128(): $mol_code;
        Code_39(): $mol_code;
        Itf(): $mol_code;
    }
}
declare namespace $ {
    const $mol_colors: {
        aliceblue: string;
        antiquewhite: string;
        aqua: string;
        aquamarine: string;
        azure: string;
        beige: string;
        bisque: string;
        black: string;
        blanchedalmond: string;
        blue: string;
        blueviolet: string;
        brown: string;
        burlywood: string;
        cadetblue: string;
        chartreuse: string;
        chocolate: string;
        coral: string;
        cornflowerblue: string;
        cornsilk: string;
        crimson: string;
        cyan: string;
        darkblue: string;
        darkcyan: string;
        darkgoldenrod: string;
        darkgray: string;
        darkgreen: string;
        darkgrey: string;
        darkkhaki: string;
        darkmagenta: string;
        darkolivegreen: string;
        darkorange: string;
        darkorchid: string;
        darkred: string;
        darksalmon: string;
        darkseagreen: string;
        darkslateblue: string;
        darkslategrey: string;
        darkturquoise: string;
        darkviolet: string;
        deeppink: string;
        deepskyblue: string;
        dimgray: string;
        dimgrey: string;
        dodgerblue: string;
        firebrick: string;
        floralwhite: string;
        forestgreen: string;
        fuchsia: string;
        gainsboro: string;
        ghostwhite: string;
        gold: string;
        goldenrod: string;
        gray: string;
        green: string;
        greenyellow: string;
        grey: string;
        honeydew: string;
        hotpink: string;
        indianred: string;
        indigo: string;
        ivory: string;
        khaki: string;
        lavender: string;
        lavenderblush: string;
        lawngreen: string;
        lemonchiffon: string;
        lightblue: string;
        lightcoral: string;
        lightcyan: string;
        lightgoldenrodyellow: string;
        lightgray: string;
        lightgreen: string;
        lightgrey: string;
        lightpink: string;
        lightsalmon: string;
        lightseagreen: string;
        lightskyblue: string;
        lightslategray: string;
        lightslategrey: string;
        lightsteelblue: string;
        lightyellow: string;
        lime: string;
        limegreen: string;
        linen: string;
        magenta: string;
        maroon: string;
        mediumaquamarine: string;
        mediumblue: string;
        mediumorchid: string;
        mediumpurple: string;
        mediumseagreen: string;
        mediumslateblue: string;
        mediumspringgreen: string;
        mediumturquoise: string;
        mediumvioletred: string;
        midnightblue: string;
        mintcream: string;
        mistyrose: string;
        moccasin: string;
        navajowhite: string;
        navy: string;
        oldlace: string;
        olive: string;
        olivedrab: string;
        orange: string;
        orangered: string;
        orchid: string;
        palegoldenrod: string;
        palegreen: string;
        paleturquoise: string;
        palevioletred: string;
        papayawhip: string;
        peachpuff: string;
        peru: string;
        pink: string;
        plum: string;
        powderblue: string;
        purple: string;
        rebeccapurple: string;
        red: string;
        rosybrown: string;
        royalblue: string;
        saddlebrown: string;
        salmon: string;
        sandybrown: string;
        seagreen: string;
        seashell: string;
        sienna: string;
        silver: string;
        skyblue: string;
        slateblue: string;
        slategray: string;
        slategrey: string;
        snow: string;
        springgreen: string;
        steelblue: string;
        tan: string;
        teal: string;
        thistle: string;
        tomato: string;
        turquoise: string;
        violet: string;
        wheat: string;
        white: string;
        whitesmoke: string;
        yellow: string;
        yellowgreen: string;
    };
}
declare namespace $ {
    class $mol_date extends $mol_string {
        type(): string;
        value_number(val?: any, force?: $mol_atom_force): any;
        value_moment(val?: any, force?: $mol_atom_force): any;
    }
}
declare namespace $.$$ {
    class $mol_date extends $.$mol_date {
        value(val?: string): string;
        value_moment(val?: $mol_time_moment): $mol_time_moment;
    }
}
declare namespace $ {
    class $mol_date_demo_moment extends $mol_demo_small {
        sub(): any[];
        Date_label(): $mol_labeler;
        date_label(): string;
        Date(): $mol_date;
        date(val?: any, force?: $mol_atom_force): any;
        Formatted_label(): $mol_labeler;
        formatted_label(): string;
        Formatted(): $mol_view;
        formatted(): string;
    }
}
declare namespace $.$$ {
    class $mol_date_demo_moment extends $.$mol_date_demo_moment {
        formatted(): any;
    }
}
declare namespace $ {
    class $mol_date_demo_string extends $mol_demo_small {
        sub(): any[];
        Date_label(): $mol_labeler;
        date_label(): string;
        Date(): $mol_date;
        String_label(): $mol_labeler;
        string_label(): string;
        String(): $mol_string;
        date(val?: any, force?: $mol_atom_force): any;
    }
}
declare namespace $ {
    class $mol_date_demo_timestamp extends $mol_demo_small {
        sub(): any[];
        Date_label(): $mol_labeler;
        date_label(): string;
        Date(): $mol_date;
        msec(val?: any, force?: $mol_atom_force): any;
        Timestamp_label(): $mol_labeler;
        timestamp_label(): string;
        Msec(): $mol_number;
    }
}
declare namespace $ {
    class $mol_deck_demo extends $mol_demo_small {
        title(): string;
        sub(): any[];
        Deck(): $mol_deck;
        greeterItem(): {
            "title": string;
            "Content": $mol_row;
        };
        greeterLabel(): string;
        greeterContent(): $mol_row;
        greeterMessager(): $mol_view;
        greeterMessage(): string;
        questerItem(): {
            "title": string;
            "Content": $mol_row;
        };
        questerLabel(): string;
        questerContent(): $mol_row;
        questerMessager(): $mol_view;
        questerMessage(): string;
        commanderItem(): {
            "title": string;
            "Content": $mol_row;
        };
        commanderLabel(): string;
        commanderContent(): $mol_row;
        commanderMessager(): $mol_view;
        commanderMessage(): string;
    }
}
declare namespace $ {
    let $mol_dict: typeof Map;
}
declare namespace $ {
    class $mol_dimmer_demo extends $mol_demo_small {
        title(): string;
        sub(): any[];
        one(): $mol_dimmer;
        two(): $mol_dimmer;
        three(): $mol_dimmer;
        four(): $mol_dimmer;
        five(): $mol_dimmer;
        six(): $mol_dimmer;
    }
}
declare namespace $ {
    class $mol_filler extends $mol_view {
        minimal_height(): number;
        sub(): any[];
    }
}
declare namespace $ {
    class $mol_expander_demo extends $mol_demo_small {
        title(): string;
        sub(): any[];
        Expander(): $mol_expander;
    }
}
declare namespace $ {
    class $mol_float_demo extends $mol_demo_large {
        title(): string;
        sub(): any[];
        Scroll(): $mol_scroll;
        Head(): $mol_float;
        Head_card(): $mol_card;
        Head_row(): $mol_row;
        Head_content(): $mol_view;
        content(): any[];
        Content(): $mol_row;
        Filler1(): $mol_filler;
        Filler2(): $mol_filler;
    }
}
declare namespace $ {
    class $mol_form_demo extends $mol_demo_small {
        sub(): any[];
        submit_blocked(): boolean;
        Form(): $mol_form;
        loginField(): $mol_form_field;
        loginLabel(): string;
        loginErrors(): any[];
        loginControl(): $mol_string;
        login(val?: any, force?: $mol_atom_force): any;
        passwordField(): $mol_form_field;
        passwordLabel(): string;
        passwordErrors(): any[];
        passControl(): $mol_string;
        password(val?: any, force?: $mol_atom_force): any;
        submit(): $mol_button_major;
        submit_text(): string;
        event_submit(val?: any, force?: $mol_atom_force): any;
    }
}
declare let $mol_global: any;
declare namespace $ {
    class $mol_grid_demo extends $mol_demo_large {
        title(): string;
        sub(): any[];
        Grid(): $mol_grid;
        records(): {};
        col_head_content(col: any): any[];
    }
}
declare namespace $.$$ {
    class $mol_grid_demo extends $.$mol_grid_demo {
        records(): string[][];
        col_head_content(id: string): string[];
    }
}
declare namespace $ {
    class $mol_pop_over extends $mol_pop {
        showed(): any;
        hovered(val?: any, force?: $mol_atom_force): any;
        attr(): {
            "tabindex": number;
        };
        event(): {
            "mouseover": (event?: any) => any;
            "mouseout": (event?: any) => any;
        };
        event_show(event?: any, force?: $mol_atom_force): any;
        event_hide(event?: any, force?: $mol_atom_force): any;
    }
}
declare namespace $.$$ {
    class $mol_pop_over extends $.$mol_pop_over {
        event_show(event?: MouseEvent): void;
        event_hide(event?: MouseEvent): void;
        showed(): any;
    }
}
declare namespace $ {
    class $mol_hint extends $mol_pop_over {
        bubble_content(): any[];
    }
}
declare namespace $ {
    class $mol_icon_chat extends $mol_icon {
        path(): string;
    }
}
declare namespace $ {
    class $mol_icon_demo extends $mol_demo_small {
        title(): string;
        sub(): any[];
        icons(): any[];
    }
}
declare namespace $.$$ {
    class $mol_icon_demo extends $.$mol_icon_demo {
        names(): string[];
        icons(): $mol_view[];
        Icon(name: string): $mol_view;
    }
}
declare namespace $ {
    class $mol_icon_file extends $mol_icon {
        path(): string;
    }
}
declare namespace $ {
    class $mol_icon_menu extends $mol_icon {
        path(): string;
    }
}
declare namespace $ {
    class $mol_icon_phones extends $mol_icon {
        path(): string;
    }
}
declare namespace $ {
    class $mol_icon_profile extends $mol_icon {
        path(): string;
    }
}
declare namespace $ {
    class $mol_import {
        static script(uri: string, next?: any, force?: $mol_atom_force): any;
    }
}
declare namespace $ {
    class $mol_labeler_demo extends $mol_demo_small {
        title(): string;
        sub(): any[];
        Provider(): $mol_labeler;
        Name(): $mol_labeler;
        Name_control(): $mol_string;
        user_name(val?: any, force?: $mol_atom_force): any;
    }
}
declare namespace $ {
    class $mol_link_demo extends $mol_demo_small {
        title(): string;
        sub(): any[];
        This(): $mol_link;
        This_label(): string;
        Red(): $mol_link;
        Red_label(): string;
        Green(): $mol_link;
        Green_label(): string;
        Blue(): $mol_link;
        Blue_label(): string;
        External(): $mol_link;
        External_hint(): string;
    }
}
declare namespace $ {
    class $mol_link_iconed_demo extends $mol_demo_small {
        title(): string;
        sub(): any[];
        Input(): $mol_string;
        name(val?: any, force?: $mol_atom_force): any;
        Output(): $mol_link_iconed;
    }
}
declare namespace $ {
    class $mol_list_demo extends $mol_demo_large {
        title(): string;
        sub(): any[];
        Scroll(): $mol_scroll;
        List(): $mol_list;
        rows(): any[];
        Row(id: any): $mol_expander;
        row_text(id: any): string;
        Content(id: any): $mol_filler;
    }
}
declare namespace $.$$ {
    class $mol_list_demo extends $.$mol_list_demo {
        rows(): $mol_view[];
        row_text(id: number): string;
    }
}
declare namespace $ {
    class $mol_map_yandex extends $mol_view {
        zoom(val?: any, force?: $mol_atom_force): any;
        center(val?: any, force?: $mol_atom_force): any;
        objects(): any[];
    }
}
declare var ymaps: any;
declare namespace $.$$ {
    class $mol_map_yandex extends $.$mol_map_yandex {
        static api(): any;
        api(next?: any, force?: $mol_atom_force): any;
        update(event?: any): void;
        render(): void;
    }
}
declare namespace $ {
    class $mol_map_yandex_mark extends $mol_object {
        pos(): any[];
        hint(): string;
        title(): string;
        content(): string;
    }
}
declare namespace $.$$ {
    class $mol_map_yandex_mark extends $.$mol_map_yandex_mark {
        object(): any;
    }
}
declare namespace $ {
    class $mol_map_yandex_demo extends $mol_demo_large {
        title(): string;
        sub(): any[];
        Map(): $mol_map_yandex;
        center(val?: any, force?: $mol_atom_force): any;
        zoom(val?: any, force?: $mol_atom_force): any;
        Place(): $mol_map_yandex_mark;
        place_pos(): any[];
        place_title(): string;
        place_content(): string;
    }
}
declare namespace $ {
    function $mol_maybe<Value>(value: Value): Value[];
}
declare namespace $ {
    class $mol_meter_demo extends $mol_demo_small {
        title(): string;
        plugins(): any[];
        top(): any;
        height(): any;
        Meter(): $mol_meter;
        sub(): any[];
        Top(): $mol_view;
        Height(): $mol_view;
    }
}
declare namespace $ {
    class $mol_nav_demo extends $mol_demo_small {
        title(): string;
        sub(): any[];
        Labeler(): $mol_labeler;
        Button(): $mol_button_minor;
        selected_item(val?: any, force?: $mol_atom_force): any;
        Nav(): $mol_nav;
        items(): any[];
    }
}
declare namespace $ {
    class $mol_number_demo extends $mol_demo_small {
        title(): string;
        sub(): any[];
        zero(): $mol_number;
        one(): $mol_number;
        year(val?: any, force?: $mol_atom_force): any;
        two(): $mol_number;
        three(): $mol_number;
        age(val?: any, force?: $mol_atom_force): any;
        four(): $mol_number;
        five(): $mol_number;
        six(): $mol_number;
        seven(): $mol_number;
        eight(): $mol_number;
        nine(): $mol_number;
    }
}
declare namespace $ {
    class $mol_page_demo extends $mol_demo_large {
        title(): string;
        sub(): any[];
        Page(): $mol_page;
        Button(): $mol_button_minor;
        Content(): $mol_row;
        Text(): $mol_filler;
        Foot_content(): $mol_row;
        Foot_text(): $mol_view;
    }
}
declare namespace $ {
    class $mol_perf_render extends $mol_view {
        sub(): any[];
        Head(): $mol_view;
        head(): any[];
        Title(): $mol_view;
        title(): string;
        Run(): $mol_button_major;
        run_label(): string;
        event_run(val?: any, force?: $mol_atom_force): any;
        Content(): $mol_scroll;
        List(): $mol_list;
        rows(): any[];
    }
}
declare namespace $ {
    class $mol_perf_render_row extends $mol_view {
        minimal_height(): number;
        attr(): {
            "mol_perf_render_row_selected": any;
        };
        selected(val?: any, force?: $mol_atom_force): any;
        event(): {
            "click": (val?: any) => any;
        };
        event_toggle(val?: any, force?: $mol_atom_force): any;
        sub(): any[];
        Bar(): $mol_view;
        label(): string;
    }
}
declare namespace $.$$ {
    interface $mol_perf_render_item {
        id: number;
        label: string;
    }
    class $mol_perf_render extends $.$mol_perf_render {
        run_label(next?: string): string;
        event_run(next?: Event): void;
        rows(): $mol_perf_render_row[];
        Row(id: number): $mol_perf_render_row;
        data(next?: $mol_perf_render_item[]): $mol_perf_render_item[];
        selected_item(next?: number): number;
    }
    class $mol_perf_render_row extends $.$mol_perf_render_row {
        data(): {
            id: number;
            label: string;
        };
        label(): string;
        event_toggle(next?: Event): void;
    }
}
declare namespace $ {
    class $mol_perf_sierp extends $mol_view {
        size_target(): number;
        elapsed(val?: any, force?: $mol_atom_force): any;
        style(): {
            "transform": string;
        };
        transform(): string;
        Dot(id: any): $mol_perf_sierp_dot;
        left(id: any): number;
        top(id: any): number;
        size(id: any): number;
        text(): string;
    }
}
declare namespace $ {
    class $mol_perf_sierp_dot extends $mol_view {
        size(): number;
        size_px(): string;
        hover(val?: any, force?: $mol_atom_force): any;
        sub(): any[];
        text(): string;
        style(): {
            "width": number;
            "height": number;
            "left": number;
            "top": number;
            "borderRadius": number;
            "lineHeight": string;
            "background": string;
        };
        width(): number;
        height(): number;
        left(): number;
        top(): number;
        radius(): number;
        color(): string;
        event_async(): {
            "mouseenter": (val?: any) => any;
            "mouseleave": (val?: any) => any;
        };
        enter(val?: any, force?: $mol_atom_force): any;
        leave(val?: any, force?: $mol_atom_force): any;
    }
}
declare namespace $.$$ {
    class $mol_perf_sierp extends $.$mol_perf_sierp {
        sub(): $.$mol_perf_sierp_dot[];
        data(): {
            left: number;
            top: number;
            size: number;
        }[];
        SierpinskiTriangle(id: {
            left: number;
            top: number;
            size: number;
        }): {
            left: number;
            top: number;
            size: number;
        }[];
        left(index: number): number;
        top(index: number): number;
        size(index: number): number;
        text(): string;
        transform(): string;
    }
    class $mol_perf_sierp_dot extends $.$mol_perf_sierp_dot {
        sub(): string[];
        size_px(): string;
        radius(): number;
        color(): "" | "#ff0";
        enter(next: Event): void;
        leave(next: Event): void;
    }
}
declare namespace $ {
    class $mol_perf_uibench extends $mol_scroll {
        sub(): any[];
        page(): any;
        table(): $mol_perf_uibench_table;
        stateTable(): any;
        anim(): $mol_perf_uibench_anim;
        stateAnim(): any;
        tree(): $mol_perf_uibench_tree;
        stateTree(): any;
    }
}
declare namespace $ {
    class $mol_perf_uibench_table extends $mol_list {
        state(): any;
        dom_name(): string;
        attr(): {
            "class": string;
        };
    }
}
declare namespace $ {
    class $mol_perf_uibench_table_row extends $mol_view {
        state(): any;
        minimal_height(): number;
        dom_name(): string;
        attr(): {
            "class": string;
            "data-id": number;
        };
        className(): string;
        id(): number;
        sub(): any[];
        header(): $mol_perf_uibench_table_cell;
        headerText(): string;
        cells(): any[];
    }
}
declare namespace $ {
    class $mol_perf_uibench_table_cell extends $mol_view {
        dom_name(): string;
        attr(): {
            "class": string;
            "data-text": string;
        };
        text(): string;
        event(): {
            "click": (val?: any) => any;
        };
        event_click(val?: any, force?: $mol_atom_force): any;
        sub(): any[];
    }
}
declare namespace $ {
    class $mol_perf_uibench_anim extends $mol_view {
        state(): any;
        attr(): {
            "class": string;
        };
        sub(): any[];
        items(): any[];
    }
}
declare namespace $ {
    class $mol_perf_uibench_anim_box extends $mol_view {
        attr(): {
            "class": string;
            "data-id": string;
        };
        id(): string;
        style(): {
            "borderRadius": string;
            "background": string;
        };
        styleRadius(): string;
        styleColor(): string;
        sub(): any[];
        items(): any[];
    }
}
declare namespace $ {
    class $mol_perf_uibench_tree extends $mol_view {
        state(): any;
        attr(): {
            "class": string;
        };
        sub(): any[];
        root(): $mol_perf_uibench_tree_branch;
        stateRoot(): any;
    }
}
declare namespace $ {
    class $mol_perf_uibench_tree_branch extends $mol_list {
        state(): any;
        dom_name(): string;
        attr(): {
            "class": string;
        };
    }
}
declare namespace $ {
    class $mol_perf_uibench_tree_leaf extends $mol_view {
        minimal_height(): number;
        dom_name(): string;
        attr(): {
            "class": string;
        };
        sub(): any[];
        text(): string;
    }
}
declare namespace $.$$ {
    class $mol_perf_uibench extends $.$mol_perf_uibench {
        state(next?: any): any;
        stateTable(): any;
        stateAnim(): any;
        stateTree(): any;
        page(): $mol_view;
    }
    class $mol_perf_uibench_table extends $.$mol_perf_uibench_table {
        state(): {
            items: any[];
        };
        rows(): $mol_perf_uibench_table_row[];
        rower(id: number): $mol_perf_uibench_table_row;
    }
    class $mol_perf_uibench_table_row extends $.$mol_perf_uibench_table_row {
        state(): {
            props: any[];
            active: boolean;
            id: number;
        };
        headerText(): string;
        id(): number;
        className(): string;
        cells(): $mol_perf_uibench_table_cell[];
        cell(id: number): $mol_perf_uibench_table_cell;
    }
    class $mol_perf_uibench_table_cell extends $.$mol_perf_uibench_table_cell {
        event_click(next?: Event): void;
    }
    class $mol_perf_uibench_anim extends $.$mol_perf_uibench_anim {
        state(): {
            items: any[];
        };
        items(): $mol_perf_uibench_anim_box[];
        item(i: number): $mol_perf_uibench_anim_box;
    }
    class $mol_perf_uibench_anim_box extends $.$mol_perf_uibench_anim_box {
        state(): {
            id: string;
            time: number;
        };
        id(): string;
        time(): number;
        styleRadius(): string;
        styleColor(): string;
    }
    class $mol_perf_uibench_tree extends $.$mol_perf_uibench_tree {
        state(): {
            root: any;
        };
        stateRoot(): any;
    }
    class $mol_perf_uibench_tree_branch extends $.$mol_perf_uibench_tree_branch {
        state(): {
            children: any[];
        };
        sub(): $mol_view[];
        branch(i: number): $mol_perf_uibench_tree_branch;
        leaf(i: number): $mol_perf_uibench_tree_leaf;
    }
}
declare namespace $ {
    class $mol_plot_demo extends $mol_demo_large {
        title(): string;
        count(val?: any, force?: $mol_atom_force): any;
        sub(): any[];
        Plot(): $mol_plot_pane;
        Saturation(): $mol_plot_group;
        saturation_series(): any[];
        Saturation_fill(): $mol_plot_fill;
        Saturation_line(): $mol_plot_line;
        Input(): $mol_plot_group;
        input_series(): any[];
        Input_line(): $mol_plot_line;
        Input_dots(): $mol_plot_dot;
        Output(): $mol_plot_bar;
        output_series(): any[];
        Voltage(): $mol_plot_ruler_vert;
        Voltage_title(): string;
        Time(): $mol_plot_ruler_hor;
        Time_title(): string;
    }
}
declare namespace $.$$ {
    class $mol_plot_demo extends $.$mol_plot_demo {
        input_series(): number[];
        output_series(): number[];
        saturation_series(): number[];
    }
}
declare namespace $ {
    class $mol_pop_demo extends $mol_demo_small {
        title(): string;
        sub(): any[];
        Pop(): $mol_pop;
        Show(): $mol_button_minor;
        show_text(): string;
        showed(): boolean;
        Content(): $mol_row;
        bubble_hint(): string;
    }
}
declare namespace $ {
    class $mol_pop_over_demo extends $mol_demo_small {
        title(): string;
        sub(): any[];
        Menu(): $mol_row;
        File(): $mol_pop_over;
        file_title(): string;
        File_menu(): $mol_list;
        Open(): $mol_button_minor;
        open_title(): string;
        Export(): $mol_button_minor;
        export_title(): string;
        Save(): $mol_button_minor;
        save_title(): string;
        Help(): $mol_pop_over;
        help_title(): string;
        Help_menu(): $mol_list;
        Updates(): $mol_button_minor;
        updates_title(): string;
        About(): $mol_button_minor;
        about_title(): string;
    }
}
declare namespace $ {
    class $mol_portion_demo extends $mol_demo_small {
        title(): string;
        sub(): any[];
        Empty(): $mol_portion;
        fist(): number;
        Partial(): $mol_portion;
        second(): number;
        Full(): $mol_portion;
        third(): number;
    }
}
declare namespace $ {
    class $mol_row_demo extends $mol_demo_small {
        title(): string;
        sub(): any[];
        Row(): $mol_row;
        Name(): $mol_search;
        name_hint(): string;
        name(val?: any, force?: $mol_atom_force): any;
        suggest1(): string;
        suggest2(): string;
        Count(): $mol_number;
        count_hint(): string;
        count(val?: any, force?: $mol_atom_force): any;
        Progress(): $mol_portion;
        progress(): number;
        Publish(): $mol_check_box;
        publish_label(): string;
        publish(val?: any, force?: $mol_atom_force): any;
        Drop(): $mol_button_minor;
        drop_title(): string;
    }
}
declare namespace $ {
    class $mol_scroll_demo extends $mol_demo_large {
        title(): string;
        sub(): any[];
        Scroll(): $mol_scroll;
        One(): $mol_filler;
        Two(): $mol_filler;
        Tree(): $mol_filler;
    }
}
declare namespace $ {
    class $mol_search_demo extends $mol_demo_small {
        title(): string;
        sub(): any[];
        query(): any;
        Search(): $mol_search;
        suggests(): any[];
    }
}
declare namespace $.$$ {
    class $mol_search_demo extends $.$mol_search_demo {
        suggests(): any[];
    }
}
declare namespace $ {
    class $mol_section_demo extends $mol_demo_large {
        title(): string;
        sub(): any[];
        Section(): $mol_section;
    }
}
declare namespace $ {
    class $mol_select_demo_colors extends $mol_demo_small {
        title(): string;
        sub(): any[];
        Color(): $mol_select;
        color(val?: any, force?: $mol_atom_force): any;
        colors(): {};
        color_name(id: any): string;
        option_content(id: any): any[];
        Color_option(id: any): $mol_row;
        Color_preview(id: any): $mol_select_colors_color_preview;
        option_color(id: any): string;
    }
}
declare namespace $ {
    class $mol_select_colors_color_preview extends $mol_view {
        style(): {
            "background": string;
        };
        color(): string;
    }
}
declare namespace $.$$ {
    class $mol_select_demo_colors extends $.$mol_select_demo_colors {
        color_name(id: string): string;
        option_color(id: string): any;
        colors(): {
            aliceblue: string;
            antiquewhite: string;
            aqua: string;
            aquamarine: string;
            azure: string;
            beige: string;
            bisque: string;
            black: string;
            blanchedalmond: string;
            blue: string;
            blueviolet: string;
            brown: string;
            burlywood: string;
            cadetblue: string;
            chartreuse: string;
            chocolate: string;
            coral: string;
            cornflowerblue: string;
            cornsilk: string;
            crimson: string;
            cyan: string;
            darkblue: string;
            darkcyan: string;
            darkgoldenrod: string;
            darkgray: string;
            darkgreen: string;
            darkgrey: string;
            darkkhaki: string;
            darkmagenta: string;
            darkolivegreen: string;
            darkorange: string;
            darkorchid: string;
            darkred: string;
            darksalmon: string;
            darkseagreen: string;
            darkslateblue: string;
            darkslategrey: string;
            darkturquoise: string;
            darkviolet: string;
            deeppink: string;
            deepskyblue: string;
            dimgray: string;
            dimgrey: string;
            dodgerblue: string;
            firebrick: string;
            floralwhite: string;
            forestgreen: string;
            fuchsia: string;
            gainsboro: string;
            ghostwhite: string;
            gold: string;
            goldenrod: string;
            gray: string;
            green: string;
            greenyellow: string;
            grey: string;
            honeydew: string;
            hotpink: string;
            indianred: string;
            indigo: string;
            ivory: string;
            khaki: string;
            lavender: string;
            lavenderblush: string;
            lawngreen: string;
            lemonchiffon: string;
            lightblue: string;
            lightcoral: string;
            lightcyan: string;
            lightgoldenrodyellow: string;
            lightgray: string;
            lightgreen: string;
            lightgrey: string;
            lightpink: string;
            lightsalmon: string;
            lightseagreen: string;
            lightskyblue: string;
            lightslategray: string;
            lightslategrey: string;
            lightsteelblue: string;
            lightyellow: string;
            lime: string;
            limegreen: string;
            linen: string;
            magenta: string;
            maroon: string;
            mediumaquamarine: string;
            mediumblue: string;
            mediumorchid: string;
            mediumpurple: string;
            mediumseagreen: string;
            mediumslateblue: string;
            mediumspringgreen: string;
            mediumturquoise: string;
            mediumvioletred: string;
            midnightblue: string;
            mintcream: string;
            mistyrose: string;
            moccasin: string;
            navajowhite: string;
            navy: string;
            oldlace: string;
            olive: string;
            olivedrab: string;
            orange: string;
            orangered: string;
            orchid: string;
            palegoldenrod: string;
            palegreen: string;
            paleturquoise: string;
            palevioletred: string;
            papayawhip: string;
            peachpuff: string;
            peru: string;
            pink: string;
            plum: string;
            powderblue: string;
            purple: string;
            rebeccapurple: string;
            red: string;
            rosybrown: string;
            royalblue: string;
            saddlebrown: string;
            salmon: string;
            sandybrown: string;
            seagreen: string;
            seashell: string;
            sienna: string;
            silver: string;
            skyblue: string;
            slateblue: string;
            slategray: string;
            slategrey: string;
            snow: string;
            springgreen: string;
            steelblue: string;
            tan: string;
            teal: string;
            thistle: string;
            tomato: string;
            turquoise: string;
            violet: string;
            wheat: string;
            white: string;
            whitesmoke: string;
            yellow: string;
            yellowgreen: string;
            '': string;
        };
    }
}
declare namespace $ {
    class $mol_select_demo_month extends $mol_demo_small {
        title(): string;
        sub(): any[];
        Month(): $mol_select;
        month(val?: any, force?: $mol_atom_force): any;
        months(): {
            "": string;
            "jan": string;
            "feb": string;
            "mar": string;
            "apr": string;
            "may": string;
            "jun": string;
            "jul": string;
            "aug": string;
            "sep": string;
            "oct": string;
            "nov": string;
            "dec": string;
        };
    }
}
declare namespace $ {
    class $mol_select_demo_priority extends $mol_demo_small {
        title(): string;
        sub(): any[];
        Priority(): $mol_select;
        priority(val?: any, force?: $mol_atom_force): any;
    }
}
declare namespace $ {
    let $mol_set: typeof Set;
}
declare namespace $ {
    class $mol_speck_demo extends $mol_demo_small {
        sub(): any[];
        Link(): $mol_link;
        Link_speck(): $mol_speck;
        Link_icon(): $mol_icon_settings;
        String(): $mol_view;
        String_speck(): $mol_speck;
        string_speck(): string;
        String_field(): $mol_string;
        Button(): $mol_button_minor;
        Button_speck(): $mol_speck;
        notification_count(): number;
        Button_icon(): $mol_icon_menu;
        Card(): $mol_card;
        Card_speck(): $mol_speck;
        card_status(): string;
    }
}
declare namespace $ {
    class $mol_speech_demo extends $mol_demo_small {
        sub(): any[];
        Toggle(): $mol_check_icon;
        Toggle_icon(): $mol_icon_microphone;
        listening(val?: any, force?: $mol_atom_force): any;
        Message(): $mol_view;
        message(): string;
    }
}
declare namespace $.$$ {
    class $mol_speech_demo extends $.$mol_speech_demo {
        listening(next?: boolean): boolean;
        message(): string;
    }
}
declare namespace $ {
    class $mol_stack extends $mol_book {
        pages(): any[];
        Main(): $mol_view;
        main(): any[];
        Addon(): $mol_view;
        addon(): any[];
    }
}
declare namespace $ {
    class $mol_state_history<Value> extends $mol_object {
        static value<Value>(key: string, next?: Value): Value;
        prefix(): string;
        value(key: string, next?: Value): Value;
        static id(next?: string): string;
    }
}
declare namespace $ {
    class $mol_string_demo extends $mol_demo_small {
        title(): string;
        sub(): any[];
        Simple(): $mol_string;
        name(val?: any, force?: $mol_atom_force): any;
        Hint(): $mol_string;
        Filled(): $mol_string;
        name2(val?: any, force?: $mol_atom_force): any;
        Disabled(): $mol_string;
    }
}
declare namespace $ {
    class $mol_suggest extends $mol_search {
        query(val?: any, force?: $mol_atom_force): any;
        value(val?: any, force?: $mol_atom_force): any;
    }
}
declare namespace $ {
    class $mol_switch_demo extends $mol_demo_small {
        title(): string;
        sub(): any[];
        Enabled(): $mol_switch;
        color(val?: any, force?: $mol_atom_force): any;
        option_red(): string;
        option_green(): string;
        option_blue(): string;
        Disabled(): $mol_switch;
    }
}
declare namespace $ {
    function $mol_test(set: {
        [name: string]: string | (() => void);
    }): void;
    var $mol_test_all: $mol_test_case[];
    var $mol_test_run: () => void;
    class $mol_test_case {
        code: () => void;
        constructor(code: string | (() => void));
        run(): void;
    }
}
declare namespace $ {
    class $mol_text_demo extends $mol_demo_large {
        title(): string;
        sub(): any[];
        Scroll(): $mol_scroll;
        Text(): $mol_text;
    }
}
declare namespace $ {
    type $mol_time_interval_config = string | {
        start?: $mol_time_moment_config;
        end?: $mol_time_moment_config;
        duration?: $mol_time_duration_config;
    };
    class $mol_time_interval extends $mol_time_base {
        constructor(config: $mol_time_interval_config);
        private _start;
        readonly start: $mol_time_moment;
        private _end;
        readonly end: $mol_time_moment;
        private _duration;
        readonly duration: $mol_time_duration;
        toJSON(): string;
        toString(): string;
    }
}
declare namespace $ {
    function $mol_try<Result>(handler: () => Result): Result | Error;
}
