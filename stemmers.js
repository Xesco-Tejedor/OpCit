var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define('snowballFactory', ['exports'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports);
        global.snowballFactory = mod.exports;
    }
})(this, function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.newStemmer = newStemmer;
    exports.algorithms = algorithms;

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && ((typeof call === 'undefined' ? 'undefined' : _typeof(call)) === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof(superClass)));
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    var _get = function get(object, property, receiver) {
        if (object === null) object = Function.prototype;
        var desc = Object.getOwnPropertyDescriptor(object, property);

        if (desc === undefined) {
            var parent = Object.getPrototypeOf(object);

            if (parent === null) {
                return undefined;
            } else {
                return get(parent, property, receiver);
            }
        } else if ("value" in desc) {
            return desc.value;
        } else {
            var getter = desc.get;

            if (getter === undefined) {
                return undefined;
            }

            return getter.call(receiver);
        }
    };

    var StringBuffer = function () {
        function StringBuffer() {
            _classCallCheck(this, StringBuffer);
        }

        _createClass(StringBuffer, [{
            key: 'length$esjava$0',
            value: function length$esjava$0() {
                return this.b.length;
            }
        }, {
            key: 'replace$esjava$3',
            value: function replace$esjava$3(start, end, str) {
                if (start === 0 && end === this.b.length) {
                    this.b = str;
                } else {
                    var left = this.b.substring(0, start),
                        right = this.b.substring(end);
                    this.b = left + str + right;
                }
            }
        }, {
            key: 'substring$esjava$2',
            value: function substring$esjava$2(start, end) {
                return this.b.substring(start, end);
            }
        }, {
            key: 'charAt$esjava$1',
            value: function charAt$esjava$1(index) {
                return this.b.charCodeAt(index);
            }
        }, {
            key: 'subSequence$esjava$2',
            value: function subSequence$esjava$2(start, end) {
                throw new Error("NotImpl: CharSequence::subSequence");
            }
        }, {
            key: 'toString$esjava$0',
            value: function toString$esjava$0() {
                return this.b;
            }
        }, {
            key: 'length',
            value: function length() {
                var _get2;

                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                    args[_key] = arguments[_key];
                }

                switch (args.length) {
                    case 0:
                        return this.length$esjava$0.apply(this, args);
                }

                return (_get2 = _get(Object.getPrototypeOf(StringBuffer.prototype), 'length', this)).call.apply(_get2, [this].concat(args));
            }
        }, {
            key: 'replace',
            value: function replace() {
                var _get3;

                for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                    args[_key2] = arguments[_key2];
                }

                switch (args.length) {
                    case 3:
                        return this.replace$esjava$3.apply(this, args);
                }

                return (_get3 = _get(Object.getPrototypeOf(StringBuffer.prototype), 'replace', this)).call.apply(_get3, [this].concat(args));
            }
        }, {
            key: 'substring',
            value: function substring() {
                var _get4;

                for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                    args[_key3] = arguments[_key3];
                }

                switch (args.length) {
                    case 2:
                        return this.substring$esjava$2.apply(this, args);
                }

                return (_get4 = _get(Object.getPrototypeOf(StringBuffer.prototype), 'substring', this)).call.apply(_get4, [this].concat(args));
            }
        }, {
            key: 'charAt',
            value: function charAt() {
                var _get5;

                for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
                    args[_key4] = arguments[_key4];
                }

                switch (args.length) {
                    case 1:
                        return this.charAt$esjava$1.apply(this, args);
                }

                return (_get5 = _get(Object.getPrototypeOf(StringBuffer.prototype), 'charAt', this)).call.apply(_get5, [this].concat(args));
            }
        }, {
            key: 'subSequence',
            value: function subSequence() {
                var _get6;

                for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
                    args[_key5] = arguments[_key5];
                }

                switch (args.length) {
                    case 2:
                        return this.subSequence$esjava$2.apply(this, args);
                }

                return (_get6 = _get(Object.getPrototypeOf(StringBuffer.prototype), 'subSequence', this)).call.apply(_get6, [this].concat(args));
            }
        }, {
            key: 'toString',
            value: function toString() {
                var _get7;

                for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
                    args[_key6] = arguments[_key6];
                }

                switch (args.length) {
                    case 0:
                        return this.toString$esjava$0.apply(this, args);
                }

                return (_get7 = _get(Object.getPrototypeOf(StringBuffer.prototype), 'toString', this)).call.apply(_get7, [this].concat(args));
            }
        }, {
            key: 'b',
            get: function get() {
                return Object.prototype.hasOwnProperty.call(this, '_$esjava$b') ? this._$esjava$b : this._$esjava$b = "";
            },
            set: function set(v) {
                this._$esjava$b = v;
            }
        }]);

        return StringBuffer;
    }();

    var StringBuilder = function (_StringBuffer) {
        _inherits(StringBuilder, _StringBuffer);

        function StringBuilder() {
            _classCallCheck(this, StringBuilder);

            return _possibleConstructorReturn(this, Object.getPrototypeOf(StringBuilder).apply(this, arguments));
        }

        return StringBuilder;
    }(StringBuffer);

    var Among = function () {
        _createClass(Among, null, [{
            key: 'toCharArray$esjava$1',
            value: function toCharArray$esjava$1(s) {
                var sLength = s.length;
                var charArr = new Array(sLength);

                for (var i = 0; i < sLength; i++) {
                    charArr[i] = s.charCodeAt(i);
                }

                return charArr;
            }
        }]);

        function Among(s, substring_i, result, methodname, obj) {
            _classCallCheck(this, Among);

            this.s = Among.toCharArray$esjava$1(s);
            this.substring_i = substring_i;
            this.result = result;
            this.method = methodname ? obj[methodname] : null;
            this.methodobject = obj;
        }

        _createClass(Among, [{
            key: 's',
            get: function get() {
                return Object.prototype.hasOwnProperty.call(this, '_$esjava$s') ? this._$esjava$s : this._$esjava$s = null;
            },
            set: function set(v) {
                this._$esjava$s = v;
            }
        }, {
            key: 'substring_i',
            get: function get() {
                return Object.prototype.hasOwnProperty.call(this, '_$esjava$substring_i') ? this._$esjava$substring_i : this._$esjava$substring_i = 0;
            },
            set: function set(v) {
                this._$esjava$substring_i = v;
            }
        }, {
            key: 'result',
            get: function get() {
                return Object.prototype.hasOwnProperty.call(this, '_$esjava$result') ? this._$esjava$result : this._$esjava$result = 0;
            },
            set: function set(v) {
                this._$esjava$result = v;
            }
        }, {
            key: 'method',
            get: function get() {
                return Object.prototype.hasOwnProperty.call(this, '_$esjava$method') ? this._$esjava$method : this._$esjava$method = null;
            },
            set: function set(v) {
                this._$esjava$method = v;
            }
        }, {
            key: 'methodobject',
            get: function get() {
                return Object.prototype.hasOwnProperty.call(this, '_$esjava$methodobject') ? this._$esjava$methodobject : this._$esjava$methodobject = null;
            },
            set: function set(v) {
                this._$esjava$methodobject = v;
            }
        }]);

        return Among;
    }();

    var SnowballProgram = function () {
        function SnowballProgram() {
            _classCallCheck(this, SnowballProgram);

            this.current = new StringBuffer();
            this.setCurrent$esjava$1("");
        }

        _createClass(SnowballProgram, [{
            key: 'setCurrent$esjava$1',
            value: function setCurrent$esjava$1(value) {
                this.current.replace(0, this.current.length(), value);
                this.cursor = 0;
                this.limit = this.current.length();
                this.limit_backward = 0;
                this.bra = this.cursor;
                this.ket = this.limit;
            }
        }, {
            key: 'getCurrent$esjava$0',
            value: function getCurrent$esjava$0() {
                var result = this.current.toString();
                this.current = new StringBuffer();
                return result;
            }
        }, {
            key: 'in_grouping$esjava$3',
            value: function in_grouping$esjava$3(s, min, max) {
                if (this.cursor >= this.limit) return false;
                var ch = this.current.charAt(this.cursor);
                if (ch > max || ch < min) return false;
                ch -= min;
                if ((s[ch >> 3] & 0X1 << (ch & 0X7)) === 0) return false;
                this.cursor++;
                return true;
            }
        }, {
            key: 'in_grouping_b$esjava$3',
            value: function in_grouping_b$esjava$3(s, min, max) {
                if (this.cursor <= this.limit_backward) return false;
                var ch = this.current.charAt(this.cursor - 1);
                if (ch > max || ch < min) return false;
                ch -= min;
                if ((s[ch >> 3] & 0X1 << (ch & 0X7)) === 0) return false;
                this.cursor--;
                return true;
            }
        }, {
            key: 'out_grouping$esjava$3',
            value: function out_grouping$esjava$3(s, min, max) {
                if (this.cursor >= this.limit) return false;
                var ch = this.current.charAt(this.cursor);

                if (ch > max || ch < min) {
                    this.cursor++;
                    return true;
                }

                ch -= min;

                if ((s[ch >> 3] & 0X1 << (ch & 0X7)) === 0) {
                    this.cursor++;
                    return true;
                }

                return false;
            }
        }, {
            key: 'out_grouping_b$esjava$3',
            value: function out_grouping_b$esjava$3(s, min, max) {
                if (this.cursor <= this.limit_backward) return false;
                var ch = this.current.charAt(this.cursor - 1);

                if (ch > max || ch < min) {
                    this.cursor--;
                    return true;
                }

                ch -= min;

                if ((s[ch >> 3] & 0X1 << (ch & 0X7)) === 0) {
                    this.cursor--;
                    return true;
                }

                return false;
            }
        }, {
            key: 'eq_s$esjava$1',
            value: function eq_s$esjava$1(s) {
                if (this.limit - this.cursor < s.length) return false;
                var i = undefined;

                for (i = 0; i !== s.length; i++) {
                    if (this.current.charAt(this.cursor + i) !== s.charCodeAt(i)) return false;
                }

                this.cursor += s.length;
                return true;
            }
        }, {
            key: 'eq_s_b$esjava$1',
            value: function eq_s_b$esjava$1(s) {
                if (this.cursor - this.limit_backward < s.length) return false;
                var i = undefined;

                for (i = 0; i !== s.length; i++) {
                    if (this.current.charAt(this.cursor - s.length + i) !== s.charCodeAt(i)) return false;
                }

                this.cursor -= s.length;
                return true;
            }
        }, {
            key: 'find_among$esjava$1',
            value: function find_among$esjava$1(v) {
                var i = 0;
                var j = v.length;
                var c = this.cursor;
                var l = this.limit;
                var common_i = 0;
                var common_j = 0;
                var first_key_inspected = false;

                while (true) {
                    var k = i + (j - i >> 1);
                    var diff = 0;
                    var common = common_i < common_j ? common_i : common_j;
                    var w = v[k];
                    var i2 = undefined;

                    for (i2 = common; i2 < w.s.length; i2++) {
                        if (c + common === l) {
                            diff = -1;
                            break;
                        }

                        diff = this.current.charAt(c + common) - w.s[i2];
                        if (diff !== 0) break;
                        common++;
                    }

                    if (diff < 0) {
                        j = k;
                        common_j = common;
                    } else {
                        i = k;
                        common_i = common;
                    }

                    if (j - i <= 1) {
                        if (i > 0) break;
                        if (j === i) break;
                        if (first_key_inspected) break;
                        first_key_inspected = true;
                    }
                }

                while (true) {
                    var w = v[i];

                    if (common_i >= w.s.length) {
                        this.cursor = c + w.s.length;
                        if (w.method === null) return w.result;
                        var res = undefined;
                        res = w.method.call(w.methodobject);
                        this.cursor = c + w.s.length;
                        if (res) return w.result;
                    }

                    i = w.substring_i;
                    if (i < 0) return 0;
                }
            }
        }, {
            key: 'find_among_b$esjava$1',
            value: function find_among_b$esjava$1(v) {
                var i = 0;
                var j = v.length;
                var c = this.cursor;
                var lb = this.limit_backward;
                var common_i = 0;
                var common_j = 0;
                var first_key_inspected = false;

                while (true) {
                    var k = i + (j - i >> 1);
                    var diff = 0;
                    var common = common_i < common_j ? common_i : common_j;
                    var w = v[k];
                    var i2 = undefined;

                    for (i2 = w.s.length - 1 - common; i2 >= 0; i2--) {
                        if (c - common === lb) {
                            diff = -1;
                            break;
                        }

                        diff = this.current.charAt(c - 1 - common) - w.s[i2];
                        if (diff !== 0) break;
                        common++;
                    }

                    if (diff < 0) {
                        j = k;
                        common_j = common;
                    } else {
                        i = k;
                        common_i = common;
                    }

                    if (j - i <= 1) {
                        if (i > 0) break;
                        if (j === i) break;
                        if (first_key_inspected) break;
                        first_key_inspected = true;
                    }
                }

                while (true) {
                    var w = v[i];

                    if (common_i >= w.s.length) {
                        this.cursor = c - w.s.length;
                        if (w.method === null) return w.result;
                        var res = undefined;
                        res = w.method.call(w.methodobject);
                        this.cursor = c - w.s.length;
                        if (res) return w.result;
                    }

                    i = w.substring_i;
                    if (i < 0) return 0;
                }
            }
        }, {
            key: 'replace_s$esjava$3',
            value: function replace_s$esjava$3(c_bra, c_ket, s) {
                var adjustment = s.length - (c_ket - c_bra);
                this.current.replace(c_bra, c_ket, s);
                this.limit += adjustment;
                if (this.cursor >= c_ket) this.cursor += adjustment;else if (this.cursor > c_bra) this.cursor = c_bra;
                return adjustment;
            }
        }, {
            key: 'slice_check$esjava$0',
            value: function slice_check$esjava$0() {
                if (this.bra < 0 || this.bra > this.ket || this.ket > this.limit || this.limit > this.current.length()) {
                    throw new Error("Snowball: faulty slice operation");
                }
            }
        }, {
            key: 'slice_from$esjava$1',
            value: function slice_from$esjava$1(s) {
                this.slice_check$esjava$0();
                this.replace_s$esjava$3(this.bra, this.ket, s);
            }
        }, {
            key: 'slice_del$esjava$0',
            value: function slice_del$esjava$0() {
                this.slice_from$esjava$1("");
            }
        }, {
            key: 'insert$esjava$3',
            value: function insert$esjava$3(c_bra, c_ket, s) {
                var adjustment = this.replace_s$esjava$3(c_bra, c_ket, s);
                if (c_bra <= this.bra) this.bra += adjustment;
                if (c_bra <= this.ket) this.ket += adjustment;
            }
        }, {
            key: 'slice_to$esjava$1',
            value: function slice_to$esjava$1(s) {
                this.slice_check$esjava$0();
                s.replace(0, s.length(), this.current.substring(this.bra, this.ket));
                return s;
            }
        }, {
            key: 'setCurrent',
            value: function setCurrent() {
                var _get8;

                for (var _len7 = arguments.length, args = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
                    args[_key7] = arguments[_key7];
                }

                switch (args.length) {
                    case 1:
                        return this.setCurrent$esjava$1.apply(this, args);
                }

                return (_get8 = _get(Object.getPrototypeOf(SnowballProgram.prototype), 'setCurrent', this)).call.apply(_get8, [this].concat(args));
            }
        }, {
            key: 'getCurrent',
            value: function getCurrent() {
                var _get9;

                for (var _len8 = arguments.length, args = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
                    args[_key8] = arguments[_key8];
                }

                switch (args.length) {
                    case 0:
                        return this.getCurrent$esjava$0.apply(this, args);
                }

                return (_get9 = _get(Object.getPrototypeOf(SnowballProgram.prototype), 'getCurrent', this)).call.apply(_get9, [this].concat(args));
            }
        }, {
            key: 'in_grouping',
            value: function in_grouping() {
                var _get10;

                for (var _len9 = arguments.length, args = Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
                    args[_key9] = arguments[_key9];
                }

                switch (args.length) {
                    case 3:
                        return this.in_grouping$esjava$3.apply(this, args);
                }

                return (_get10 = _get(Object.getPrototypeOf(SnowballProgram.prototype), 'in_grouping', this)).call.apply(_get10, [this].concat(args));
            }
        }, {
            key: 'in_grouping_b',
            value: function in_grouping_b() {
                var _get11;

                for (var _len10 = arguments.length, args = Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
                    args[_key10] = arguments[_key10];
                }

                switch (args.length) {
                    case 3:
                        return this.in_grouping_b$esjava$3.apply(this, args);
                }

                return (_get11 = _get(Object.getPrototypeOf(SnowballProgram.prototype), 'in_grouping_b', this)).call.apply(_get11, [this].concat(args));
            }
        }, {
            key: 'out_grouping',
            value: function out_grouping() {
                var _get12;

                for (var _len11 = arguments.length, args = Array(_len11), _key11 = 0; _key11 < _len11; _key11++) {
                    args[_key11] = arguments[_key11];
                }

                switch (args.length) {
                    case 3:
                        return this.out_grouping$esjava$3.apply(this, args);
                }

                return (_get12 = _get(Object.getPrototypeOf(SnowballProgram.prototype), 'out_grouping', this)).call.apply(_get12, [this].concat(args));
            }
        }, {
            key: 'out_grouping_b',
            value: function out_grouping_b() {
                var _get13;

                for (var _len12 = arguments.length, args = Array(_len12), _key12 = 0; _key12 < _len12; _key12++) {
                    args[_key12] = arguments[_key12];
                }

                switch (args.length) {
                    case 3:
                        return this.out_grouping_b$esjava$3.apply(this, args);
                }

                return (_get13 = _get(Object.getPrototypeOf(SnowballProgram.prototype), 'out_grouping_b', this)).call.apply(_get13, [this].concat(args));
            }
        }, {
            key: 'eq_s',
            value: function eq_s() {
                var _get14;

                for (var _len13 = arguments.length, args = Array(_len13), _key13 = 0; _key13 < _len13; _key13++) {
                    args[_key13] = arguments[_key13];
                }

                switch (args.length) {
                    case 1:
                        return this.eq_s$esjava$1.apply(this, args);
                }

                return (_get14 = _get(Object.getPrototypeOf(SnowballProgram.prototype), 'eq_s', this)).call.apply(_get14, [this].concat(args));
            }
        }, {
            key: 'eq_s_b',
            value: function eq_s_b() {
                var _get15;

                for (var _len14 = arguments.length, args = Array(_len14), _key14 = 0; _key14 < _len14; _key14++) {
                    args[_key14] = arguments[_key14];
                }

                switch (args.length) {
                    case 1:
                        return this.eq_s_b$esjava$1.apply(this, args);
                }

                return (_get15 = _get(Object.getPrototypeOf(SnowballProgram.prototype), 'eq_s_b', this)).call.apply(_get15, [this].concat(args));
            }
        }, {
            key: 'find_among',
            value: function find_among() {
                var _get16;

                for (var _len15 = arguments.length, args = Array(_len15), _key15 = 0; _key15 < _len15; _key15++) {
                    args[_key15] = arguments[_key15];
                }

                switch (args.length) {
                    case 1:
                        return this.find_among$esjava$1.apply(this, args);
                }

                return (_get16 = _get(Object.getPrototypeOf(SnowballProgram.prototype), 'find_among', this)).call.apply(_get16, [this].concat(args));
            }
        }, {
            key: 'find_among_b',
            value: function find_among_b() {
                var _get17;

                for (var _len16 = arguments.length, args = Array(_len16), _key16 = 0; _key16 < _len16; _key16++) {
                    args[_key16] = arguments[_key16];
                }

                switch (args.length) {
                    case 1:
                        return this.find_among_b$esjava$1.apply(this, args);
                }

                return (_get17 = _get(Object.getPrototypeOf(SnowballProgram.prototype), 'find_among_b', this)).call.apply(_get17, [this].concat(args));
            }
        }, {
            key: 'replace_s',
            value: function replace_s() {
                var _get18;

                for (var _len17 = arguments.length, args = Array(_len17), _key17 = 0; _key17 < _len17; _key17++) {
                    args[_key17] = arguments[_key17];
                }

                switch (args.length) {
                    case 3:
                        return this.replace_s$esjava$3.apply(this, args);
                }

                return (_get18 = _get(Object.getPrototypeOf(SnowballProgram.prototype), 'replace_s', this)).call.apply(_get18, [this].concat(args));
            }
        }, {
            key: 'slice_check',
            value: function slice_check() {
                var _get19;

                for (var _len18 = arguments.length, args = Array(_len18), _key18 = 0; _key18 < _len18; _key18++) {
                    args[_key18] = arguments[_key18];
                }

                switch (args.length) {
                    case 0:
                        return this.slice_check$esjava$0.apply(this, args);
                }

                return (_get19 = _get(Object.getPrototypeOf(SnowballProgram.prototype), 'slice_check', this)).call.apply(_get19, [this].concat(args));
            }
        }, {
            key: 'slice_from',
            value: function slice_from() {
                var _get20;

                for (var _len19 = arguments.length, args = Array(_len19), _key19 = 0; _key19 < _len19; _key19++) {
                    args[_key19] = arguments[_key19];
                }

                switch (args.length) {
                    case 1:
                        return this.slice_from$esjava$1.apply(this, args);
                }

                return (_get20 = _get(Object.getPrototypeOf(SnowballProgram.prototype), 'slice_from', this)).call.apply(_get20, [this].concat(args));
            }
        }, {
            key: 'slice_del',
            value: function slice_del() {
                var _get21;

                for (var _len20 = arguments.length, args = Array(_len20), _key20 = 0; _key20 < _len20; _key20++) {
                    args[_key20] = arguments[_key20];
                }

                switch (args.length) {
                    case 0:
                        return this.slice_del$esjava$0.apply(this, args);
                }

                return (_get21 = _get(Object.getPrototypeOf(SnowballProgram.prototype), 'slice_del', this)).call.apply(_get21, [this].concat(args));
            }
        }, {
            key: 'insert',
            value: function insert() {
                var _get22;

                for (var _len21 = arguments.length, args = Array(_len21), _key21 = 0; _key21 < _len21; _key21++) {
                    args[_key21] = arguments[_key21];
                }

                switch (args.length) {
                    case 3:
                        return this.insert$esjava$3.apply(this, args);
                }

                return (_get22 = _get(Object.getPrototypeOf(SnowballProgram.prototype), 'insert', this)).call.apply(_get22, [this].concat(args));
            }
        }, {
            key: 'slice_to',
            value: function slice_to() {
                var _get23;

                for (var _len22 = arguments.length, args = Array(_len22), _key22 = 0; _key22 < _len22; _key22++) {
                    args[_key22] = arguments[_key22];
                }

                switch (args.length) {
                    case 1:
                        return this.slice_to$esjava$1.apply(this, args);
                }

                return (_get23 = _get(Object.getPrototypeOf(SnowballProgram.prototype), 'slice_to', this)).call.apply(_get23, [this].concat(args));
            }
        }, {
            key: 'current',
            get: function get() {
                return Object.prototype.hasOwnProperty.call(this, '_$esjava$current') ? this._$esjava$current : this._$esjava$current = null;
            },
            set: function set(v) {
                this._$esjava$current = v;
            }
        }, {
            key: 'cursor',
            get: function get() {
                return Object.prototype.hasOwnProperty.call(this, '_$esjava$cursor') ? this._$esjava$cursor : this._$esjava$cursor = 0;
            },
            set: function set(v) {
                this._$esjava$cursor = v;
            }
        }, {
            key: 'limit',
            get: function get() {
                return Object.prototype.hasOwnProperty.call(this, '_$esjava$limit') ? this._$esjava$limit : this._$esjava$limit = 0;
            },
            set: function set(v) {
                this._$esjava$limit = v;
            }
        }, {
            key: 'limit_backward',
            get: function get() {
                return Object.prototype.hasOwnProperty.call(this, '_$esjava$limit_backward') ? this._$esjava$limit_backward : this._$esjava$limit_backward = 0;
            },
            set: function set(v) {
                this._$esjava$limit_backward = v;
            }
        }, {
            key: 'bra',
            get: function get() {
                return Object.prototype.hasOwnProperty.call(this, '_$esjava$bra') ? this._$esjava$bra : this._$esjava$bra = 0;
            },
            set: function set(v) {
                this._$esjava$bra = v;
            }
        }, {
            key: 'ket',
            get: function get() {
                return Object.prototype.hasOwnProperty.call(this, '_$esjava$ket') ? this._$esjava$ket : this._$esjava$ket = 0;
            },
            set: function set(v) {
                this._$esjava$ket = v;
            }
        }]);

        return SnowballProgram;
    }();

    var SnowballStemmer = function (_SnowballProgram) {
        _inherits(SnowballStemmer, _SnowballProgram);

        function SnowballStemmer() {
            _classCallCheck(this, SnowballStemmer);

            return _possibleConstructorReturn(this, Object.getPrototypeOf(SnowballStemmer).apply(this, arguments));
        }

        _createClass(SnowballStemmer, [{
            key: 'stem$esjava$0',
            value: function stem$esjava$0() {
                throw 'NotImpl < stem$esjava$0 >';
            }
        }, {
            key: 'stem',
            value: function stem() {
                var _get24;

                for (var _len23 = arguments.length, args = Array(_len23), _key23 = 0; _key23 < _len23; _key23++) {
                    args[_key23] = arguments[_key23];
                }

                switch (args.length) {
                    case 0:
                        return this.stem$esjava$0.apply(this, args);
                }

                return (_get24 = _get(Object.getPrototypeOf(SnowballStemmer.prototype), 'stem', this)).call.apply(_get24, [this].concat(args));
            }
        }]);

        return SnowballStemmer;
    }(SnowballProgram);

    var englishStemmer = function (_SnowballStemmer8) {
        _inherits(englishStemmer, _SnowballStemmer8);

        function englishStemmer() {
            _classCallCheck(this, englishStemmer);

            return _possibleConstructorReturn(this, Object.getPrototypeOf(englishStemmer).apply(this, arguments));
        }

        _createClass(englishStemmer, [{
            key: 'r_prelude$esjava$0',
            value: function r_prelude$esjava$0() {
                var v_1 = undefined;
                var v_2 = undefined;
                var v_3 = undefined;
                var v_4 = undefined;
                var v_5 = undefined;
                this.B_Y_found = false;
                v_1 = this.cursor;

                lab0: do {
                    this.bra = this.cursor;

                    if (!this.eq_s$esjava$1("'")) {
                        break lab0;
                    }

                    this.ket = this.cursor;
                    this.slice_del$esjava$0();
                } while (false);

                this.cursor = v_1;
                v_2 = this.cursor;

                lab1: do {
                    this.bra = this.cursor;

                    if (!this.eq_s$esjava$1("y")) {
                        break lab1;
                    }

                    this.ket = this.cursor;
                    this.slice_from$esjava$1("Y");
                    this.B_Y_found = true;
                } while (false);

                this.cursor = v_2;
                v_3 = this.cursor;

                lab2: do {
                    replab3: while (true) {
                        v_4 = this.cursor;

                        lab4: do {
                            golab5: while (true) {
                                v_5 = this.cursor;

                                lab6: do {
                                    if (!this.in_grouping$esjava$3(englishStemmer.g_v, 97, 121)) {
                                        break lab6;
                                    }

                                    this.bra = this.cursor;

                                    if (!this.eq_s$esjava$1("y")) {
                                        break lab6;
                                    }

                                    this.ket = this.cursor;
                                    this.cursor = v_5;
                                    break golab5;
                                } while (false);

                                this.cursor = v_5;

                                if (this.cursor >= this.limit) {
                                    break lab4;
                                }

                                this.cursor++;
                            }

                            this.slice_from$esjava$1("Y");
                            this.B_Y_found = true;
                            continue replab3;
                        } while (false);

                        this.cursor = v_4;
                        break replab3;
                    }
                } while (false);

                this.cursor = v_3;
                return true;
            }
        }, {
            key: 'r_mark_regions$esjava$0',
            value: function r_mark_regions$esjava$0() {
                var v_1 = undefined;
                var v_2 = undefined;
                this.I_p1 = this.limit;
                this.I_p2 = this.limit;
                v_1 = this.cursor;

                lab0: do {
                    lab1: do {
                        v_2 = this.cursor;

                        lab2: do {
                            if (this.find_among$esjava$1(englishStemmer.a_0) === 0) {
                                break lab2;
                            }

                            break lab1;
                        } while (false);

                        this.cursor = v_2;

                        golab3: while (true) {
                            lab4: do {
                                if (!this.in_grouping$esjava$3(englishStemmer.g_v, 97, 121)) {
                                    break lab4;
                                }

                                break golab3;
                            } while (false);

                            if (this.cursor >= this.limit) {
                                break lab0;
                            }

                            this.cursor++;
                        }

                        golab5: while (true) {
                            lab6: do {
                                if (!this.out_grouping$esjava$3(englishStemmer.g_v, 97, 121)) {
                                    break lab6;
                                }

                                break golab5;
                            } while (false);

                            if (this.cursor >= this.limit) {
                                break lab0;
                            }

                            this.cursor++;
                        }
                    } while (false);

                    this.I_p1 = this.cursor;

                    golab7: while (true) {
                        lab8: do {
                            if (!this.in_grouping$esjava$3(englishStemmer.g_v, 97, 121)) {
                                break lab8;
                            }

                            break golab7;
                        } while (false);

                        if (this.cursor >= this.limit) {
                            break lab0;
                        }

                        this.cursor++;
                    }

                    golab9: while (true) {
                        lab10: do {
                            if (!this.out_grouping$esjava$3(englishStemmer.g_v, 97, 121)) {
                                break lab10;
                            }

                            break golab9;
                        } while (false);

                        if (this.cursor >= this.limit) {
                            break lab0;
                        }

                        this.cursor++;
                    }

                    this.I_p2 = this.cursor;
                } while (false);

                this.cursor = v_1;
                return true;
            }
        }, {
            key: 'r_shortv$esjava$0',
            value: function r_shortv$esjava$0() {
                var v_1 = undefined;

                lab0: do {
                    v_1 = this.limit - this.cursor;

                    lab1: do {
                        if (!this.out_grouping_b$esjava$3(englishStemmer.g_v_WXY, 89, 121)) {
                            break lab1;
                        }

                        if (!this.in_grouping_b$esjava$3(englishStemmer.g_v, 97, 121)) {
                            break lab1;
                        }

                        if (!this.out_grouping_b$esjava$3(englishStemmer.g_v, 97, 121)) {
                            break lab1;
                        }

                        break lab0;
                    } while (false);

                    this.cursor = this.limit - v_1;

                    if (!this.out_grouping_b$esjava$3(englishStemmer.g_v, 97, 121)) {
                        return false;
                    }

                    if (!this.in_grouping_b$esjava$3(englishStemmer.g_v, 97, 121)) {
                        return false;
                    }

                    if (this.cursor > this.limit_backward) {
                        return false;
                    }
                } while (false);

                return true;
            }
        }, {
            key: 'r_R1$esjava$0',
            value: function r_R1$esjava$0() {
                if (!(this.I_p1 <= this.cursor)) {
                    return false;
                }

                return true;
            }
        }, {
            key: 'r_R2$esjava$0',
            value: function r_R2$esjava$0() {
                if (!(this.I_p2 <= this.cursor)) {
                    return false;
                }

                return true;
            }
        }, {
            key: 'r_Step_1a$esjava$0',
            value: function r_Step_1a$esjava$0() {
                var among_var = undefined;
                var v_1 = undefined;
                var v_2 = undefined;
                v_1 = this.limit - this.cursor;

                lab0: do {
                    this.ket = this.cursor;
                    among_var = this.find_among_b$esjava$1(englishStemmer.a_1);

                    if (among_var === 0) {
                        this.cursor = this.limit - v_1;
                        break lab0;
                    }

                    this.bra = this.cursor;

                    switch (among_var) {
                        case 0:
                            this.cursor = this.limit - v_1;
                            break lab0;

                        case 1:
                            this.slice_del$esjava$0();
                            break;
                    }
                } while (false);

                this.ket = this.cursor;
                among_var = this.find_among_b$esjava$1(englishStemmer.a_2);

                if (among_var === 0) {
                    return false;
                }

                this.bra = this.cursor;

                switch (among_var) {
                    case 0:
                        return false;

                    case 1:
                        this.slice_from$esjava$1("ss");
                        break;

                    case 2:
                        lab1: do {
                            v_2 = this.limit - this.cursor;

                            lab2: do {
                                {
                                    var c = this.cursor - 2;

                                    if (this.limit_backward > c || c > this.limit) {
                                        break lab2;
                                    }

                                    this.cursor = c;
                                }
                                this.slice_from$esjava$1("i");
                                break lab1;
                            } while (false);

                            this.cursor = this.limit - v_2;
                            this.slice_from$esjava$1("ie");
                        } while (false);

                        break;

                    case 3:
                        if (this.cursor <= this.limit_backward) {
                            return false;
                        }

                        this.cursor--;

                        golab3: while (true) {
                            lab4: do {
                                if (!this.in_grouping_b$esjava$3(englishStemmer.g_v, 97, 121)) {
                                    break lab4;
                                }

                                break golab3;
                            } while (false);

                            if (this.cursor <= this.limit_backward) {
                                return false;
                            }

                            this.cursor--;
                        }

                        this.slice_del$esjava$0();
                        break;
                }

                return true;
            }
        }, {
            key: 'r_Step_1b$esjava$0',
            value: function r_Step_1b$esjava$0() {
                var among_var = undefined;
                var v_1 = undefined;
                var v_3 = undefined;
                var v_4 = undefined;
                this.ket = this.cursor;
                among_var = this.find_among_b$esjava$1(englishStemmer.a_4);

                if (among_var === 0) {
                    return false;
                }

                this.bra = this.cursor;

                switch (among_var) {
                    case 0:
                        return false;

                    case 1:
                        if (!this.r_R1$esjava$0()) {
                            return false;
                        }

                        this.slice_from$esjava$1("ee");
                        break;

                    case 2:
                        v_1 = this.limit - this.cursor;

                        golab0: while (true) {
                            lab1: do {
                                if (!this.in_grouping_b$esjava$3(englishStemmer.g_v, 97, 121)) {
                                    break lab1;
                                }

                                break golab0;
                            } while (false);

                            if (this.cursor <= this.limit_backward) {
                                return false;
                            }

                            this.cursor--;
                        }

                        this.cursor = this.limit - v_1;
                        this.slice_del$esjava$0();
                        v_3 = this.limit - this.cursor;
                        among_var = this.find_among_b$esjava$1(englishStemmer.a_3);

                        if (among_var === 0) {
                            return false;
                        }

                        this.cursor = this.limit - v_3;

                        switch (among_var) {
                            case 0:
                                return false;

                            case 1:
                                {
                                    var c = this.cursor;
                                    this.insert$esjava$3(this.cursor, this.cursor, "e");
                                    this.cursor = c;
                                }
                                break;

                            case 2:
                                this.ket = this.cursor;

                                if (this.cursor <= this.limit_backward) {
                                    return false;
                                }

                                this.cursor--;
                                this.bra = this.cursor;
                                this.slice_del$esjava$0();
                                break;

                            case 3:
                                if (this.cursor !== this.I_p1) {
                                    return false;
                                }

                                v_4 = this.limit - this.cursor;

                                if (!this.r_shortv$esjava$0()) {
                                    return false;
                                }

                                this.cursor = this.limit - v_4;
                                {
                                    var c = this.cursor;
                                    this.insert$esjava$3(this.cursor, this.cursor, "e");
                                    this.cursor = c;
                                }
                                break;
                        }

                        break;
                }

                return true;
            }
        }, {
            key: 'r_Step_1c$esjava$0',
            value: function r_Step_1c$esjava$0() {
                var v_1 = undefined;
                var v_2 = undefined;
                this.ket = this.cursor;

                lab0: do {
                    v_1 = this.limit - this.cursor;

                    lab1: do {
                        if (!this.eq_s_b$esjava$1("y")) {
                            break lab1;
                        }

                        break lab0;
                    } while (false);

                    this.cursor = this.limit - v_1;

                    if (!this.eq_s_b$esjava$1("Y")) {
                        return false;
                    }
                } while (false);

                this.bra = this.cursor;

                if (!this.out_grouping_b$esjava$3(englishStemmer.g_v, 97, 121)) {
                    return false;
                }

                {
                    v_2 = this.limit - this.cursor;

                    lab2: do {
                        if (this.cursor > this.limit_backward) {
                            break lab2;
                        }

                        return false;
                    } while (false);

                    this.cursor = this.limit - v_2;
                }
                this.slice_from$esjava$1("i");
                return true;
            }
        }, {
            key: 'r_Step_2$esjava$0',
            value: function r_Step_2$esjava$0() {
                var among_var = undefined;
                this.ket = this.cursor;
                among_var = this.find_among_b$esjava$1(englishStemmer.a_5);

                if (among_var === 0) {
                    return false;
                }

                this.bra = this.cursor;

                if (!this.r_R1$esjava$0()) {
                    return false;
                }

                switch (among_var) {
                    case 0:
                        return false;

                    case 1:
                        this.slice_from$esjava$1("tion");
                        break;

                    case 2:
                        this.slice_from$esjava$1("ence");
                        break;

                    case 3:
                        this.slice_from$esjava$1("ance");
                        break;

                    case 4:
                        this.slice_from$esjava$1("able");
                        break;

                    case 5:
                        this.slice_from$esjava$1("ent");
                        break;

                    case 6:
                        this.slice_from$esjava$1("ize");
                        break;

                    case 7:
                        this.slice_from$esjava$1("ate");
                        break;

                    case 8:
                        this.slice_from$esjava$1("al");
                        break;

                    case 9:
                        this.slice_from$esjava$1("ful");
                        break;

                    case 10:
                        this.slice_from$esjava$1("ous");
                        break;

                    case 11:
                        this.slice_from$esjava$1("ive");
                        break;

                    case 12:
                        this.slice_from$esjava$1("ble");
                        break;

                    case 13:
                        if (!this.eq_s_b$esjava$1("l")) {
                            return false;
                        }

                        this.slice_from$esjava$1("og");
                        break;

                    case 14:
                        this.slice_from$esjava$1("ful");
                        break;

                    case 15:
                        this.slice_from$esjava$1("less");
                        break;

                    case 16:
                        if (!this.in_grouping_b$esjava$3(englishStemmer.g_valid_LI, 99, 116)) {
                            return false;
                        }

                        this.slice_del$esjava$0();
                        break;
                }

                return true;
            }
        }, {
            key: 'r_Step_3$esjava$0',
            value: function r_Step_3$esjava$0() {
                var among_var = undefined;
                this.ket = this.cursor;
                among_var = this.find_among_b$esjava$1(englishStemmer.a_6);

                if (among_var === 0) {
                    return false;
                }

                this.bra = this.cursor;

                if (!this.r_R1$esjava$0()) {
                    return false;
                }

                switch (among_var) {
                    case 0:
                        return false;

                    case 1:
                        this.slice_from$esjava$1("tion");
                        break;

                    case 2:
                        this.slice_from$esjava$1("ate");
                        break;

                    case 3:
                        this.slice_from$esjava$1("al");
                        break;

                    case 4:
                        this.slice_from$esjava$1("ic");
                        break;

                    case 5:
                        this.slice_del$esjava$0();
                        break;

                    case 6:
                        if (!this.r_R2$esjava$0()) {
                            return false;
                        }

                        this.slice_del$esjava$0();
                        break;
                }

                return true;
            }
        }, {
            key: 'r_Step_4$esjava$0',
            value: function r_Step_4$esjava$0() {
                var among_var = undefined;
                var v_1 = undefined;
                this.ket = this.cursor;
                among_var = this.find_among_b$esjava$1(englishStemmer.a_7);

                if (among_var === 0) {
                    return false;
                }

                this.bra = this.cursor;

                if (!this.r_R2$esjava$0()) {
                    return false;
                }

                switch (among_var) {
                    case 0:
                        return false;

                    case 1:
                        this.slice_del$esjava$0();
                        break;

                    case 2:
                        lab0: do {
                            v_1 = this.limit - this.cursor;

                            lab1: do {
                                if (!this.eq_s_b$esjava$1("s")) {
                                    break lab1;
                                }

                                break lab0;
                            } while (false);

                            this.cursor = this.limit - v_1;

                            if (!this.eq_s_b$esjava$1("t")) {
                                return false;
                            }
                        } while (false);

                        this.slice_del$esjava$0();
                        break;
                }

                return true;
            }
        }, {
            key: 'r_Step_5$esjava$0',
            value: function r_Step_5$esjava$0() {
                var among_var = undefined;
                var v_1 = undefined;
                var v_2 = undefined;
                this.ket = this.cursor;
                among_var = this.find_among_b$esjava$1(englishStemmer.a_8);

                if (among_var === 0) {
                    return false;
                }

                this.bra = this.cursor;

                switch (among_var) {
                    case 0:
                        return false;

                    case 1:
                        lab0: do {
                            v_1 = this.limit - this.cursor;

                            lab1: do {
                                if (!this.r_R2$esjava$0()) {
                                    break lab1;
                                }

                                break lab0;
                            } while (false);

                            this.cursor = this.limit - v_1;

                            if (!this.r_R1$esjava$0()) {
                                return false;
                            }

                            {
                                v_2 = this.limit - this.cursor;

                                lab2: do {
                                    if (!this.r_shortv$esjava$0()) {
                                        break lab2;
                                    }

                                    return false;
                                } while (false);

                                this.cursor = this.limit - v_2;
                            }
                        } while (false);

                        this.slice_del$esjava$0();
                        break;

                    case 2:
                        if (!this.r_R2$esjava$0()) {
                            return false;
                        }

                        if (!this.eq_s_b$esjava$1("l")) {
                            return false;
                        }

                        this.slice_del$esjava$0();
                        break;
                }

                return true;
            }
        }, {
            key: 'r_exception2$esjava$0',
            value: function r_exception2$esjava$0() {
                this.ket = this.cursor;

                if (this.find_among_b$esjava$1(englishStemmer.a_9) === 0) {
                    return false;
                }

                this.bra = this.cursor;

                if (this.cursor > this.limit_backward) {
                    return false;
                }

                return true;
            }
        }, {
            key: 'r_exception1$esjava$0',
            value: function r_exception1$esjava$0() {
                var among_var = undefined;
                this.bra = this.cursor;
                among_var = this.find_among$esjava$1(englishStemmer.a_10);

                if (among_var === 0) {
                    return false;
                }

                this.ket = this.cursor;

                if (this.cursor < this.limit) {
                    return false;
                }

                switch (among_var) {
                    case 0:
                        return false;

                    case 1:
                        this.slice_from$esjava$1("ski");
                        break;

                    case 2:
                        this.slice_from$esjava$1("sky");
                        break;

                    case 3:
                        this.slice_from$esjava$1("die");
                        break;

                    case 4:
                        this.slice_from$esjava$1("lie");
                        break;

                    case 5:
                        this.slice_from$esjava$1("tie");
                        break;

                    case 6:
                        this.slice_from$esjava$1("idl");
                        break;

                    case 7:
                        this.slice_from$esjava$1("gentl");
                        break;

                    case 8:
                        this.slice_from$esjava$1("ugli");
                        break;

                    case 9:
                        this.slice_from$esjava$1("earli");
                        break;

                    case 10:
                        this.slice_from$esjava$1("onli");
                        break;

                    case 11:
                        this.slice_from$esjava$1("singl");
                        break;
                }

                return true;
            }
        }, {
            key: 'r_postlude$esjava$0',
            value: function r_postlude$esjava$0() {
                var v_1 = undefined;
                var v_2 = undefined;

                if (!this.B_Y_found) {
                    return false;
                }

                replab0: while (true) {
                    v_1 = this.cursor;

                    lab1: do {
                        golab2: while (true) {
                            v_2 = this.cursor;

                            lab3: do {
                                this.bra = this.cursor;

                                if (!this.eq_s$esjava$1("Y")) {
                                    break lab3;
                                }

                                this.ket = this.cursor;
                                this.cursor = v_2;
                                break golab2;
                            } while (false);

                            this.cursor = v_2;

                            if (this.cursor >= this.limit) {
                                break lab1;
                            }

                            this.cursor++;
                        }

                        this.slice_from$esjava$1("y");
                        continue replab0;
                    } while (false);

                    this.cursor = v_1;
                    break replab0;
                }

                return true;
            }
        }, {
            key: 'stem$esjava$0',
            value: function stem$esjava$0() {
                var v_1 = undefined;
                var v_2 = undefined;
                var v_3 = undefined;
                var v_4 = undefined;
                var v_5 = undefined;
                var v_6 = undefined;
                var v_7 = undefined;
                var v_8 = undefined;
                var v_9 = undefined;
                var v_10 = undefined;
                var v_11 = undefined;
                var v_12 = undefined;
                var v_13 = undefined;

                lab0: do {
                    v_1 = this.cursor;

                    lab1: do {
                        if (!this.r_exception1$esjava$0()) {
                            break lab1;
                        }

                        break lab0;
                    } while (false);

                    this.cursor = v_1;

                    lab2: do {
                        {
                            v_2 = this.cursor;

                            lab3: do {
                                {
                                    var c = this.cursor + 3;

                                    if (0 > c || c > this.limit) {
                                        break lab3;
                                    }

                                    this.cursor = c;
                                }
                                break lab2;
                            } while (false);

                            this.cursor = v_2;
                        }
                        break lab0;
                    } while (false);

                    this.cursor = v_1;
                    v_3 = this.cursor;

                    lab4: do {
                        if (!this.r_prelude$esjava$0()) {
                            break lab4;
                        }
                    } while (false);

                    this.cursor = v_3;
                    v_4 = this.cursor;

                    lab5: do {
                        if (!this.r_mark_regions$esjava$0()) {
                            break lab5;
                        }
                    } while (false);

                    this.cursor = v_4;
                    this.limit_backward = this.cursor;
                    this.cursor = this.limit;
                    v_5 = this.limit - this.cursor;

                    lab6: do {
                        if (!this.r_Step_1a$esjava$0()) {
                            break lab6;
                        }
                    } while (false);

                    this.cursor = this.limit - v_5;

                    lab7: do {
                        v_6 = this.limit - this.cursor;

                        lab8: do {
                            if (!this.r_exception2$esjava$0()) {
                                break lab8;
                            }

                            break lab7;
                        } while (false);

                        this.cursor = this.limit - v_6;
                        v_7 = this.limit - this.cursor;

                        lab9: do {
                            if (!this.r_Step_1b$esjava$0()) {
                                break lab9;
                            }
                        } while (false);

                        this.cursor = this.limit - v_7;
                        v_8 = this.limit - this.cursor;

                        lab10: do {
                            if (!this.r_Step_1c$esjava$0()) {
                                break lab10;
                            }
                        } while (false);

                        this.cursor = this.limit - v_8;
                        v_9 = this.limit - this.cursor;

                        lab11: do {
                            if (!this.r_Step_2$esjava$0()) {
                                break lab11;
                            }
                        } while (false);

                        this.cursor = this.limit - v_9;
                        v_10 = this.limit - this.cursor;

                        lab12: do {
                            if (!this.r_Step_3$esjava$0()) {
                                break lab12;
                            }
                        } while (false);

                        this.cursor = this.limit - v_10;
                        v_11 = this.limit - this.cursor;

                        lab13: do {
                            if (!this.r_Step_4$esjava$0()) {
                                break lab13;
                            }
                        } while (false);

                        this.cursor = this.limit - v_11;
                        v_12 = this.limit - this.cursor;

                        lab14: do {
                            if (!this.r_Step_5$esjava$0()) {
                                break lab14;
                            }
                        } while (false);

                        this.cursor = this.limit - v_12;
                    } while (false);

                    this.cursor = this.limit_backward;
                    v_13 = this.cursor;

                    lab15: do {
                        if (!this.r_postlude$esjava$0()) {
                            break lab15;
                        }
                    } while (false);

                    this.cursor = v_13;
                } while (false);

                return true;
            }
        }, {
            key: 'stem',
            value: function stem() {
                var _get32;

                for (var _len31 = arguments.length, args = Array(_len31), _key31 = 0; _key31 < _len31; _key31++) {
                    args[_key31] = arguments[_key31];
                }

                switch (args.length) {
                    case 0:
                        return this.stem$esjava$0.apply(this, args);
                }

                return (_get32 = _get(Object.getPrototypeOf(englishStemmer.prototype), 'stem', this)).call.apply(_get32, [this].concat(args));
            }
        }, {
            key: 'B_Y_found',
            get: function get() {
                return Object.prototype.hasOwnProperty.call(this, '_$esjava$B_Y_found') ? this._$esjava$B_Y_found : this._$esjava$B_Y_found = false;
            },
            set: function set(v) {
                this._$esjava$B_Y_found = v;
            }
        }, {
            key: 'I_p2',
            get: function get() {
                return Object.prototype.hasOwnProperty.call(this, '_$esjava$I_p2') ? this._$esjava$I_p2 : this._$esjava$I_p2 = 0;
            },
            set: function set(v) {
                this._$esjava$I_p2 = v;
            }
        }, {
            key: 'I_p1',
            get: function get() {
                return Object.prototype.hasOwnProperty.call(this, '_$esjava$I_p1') ? this._$esjava$I_p1 : this._$esjava$I_p1 = 0;
            },
            set: function set(v) {
                this._$esjava$I_p1 = v;
            }
        }], [{
            key: 'a_0',
            get: function get() {
                delete englishStemmer.a_0;
                return englishStemmer.a_0 = [new Among("arsen", -1, -1), new Among("commun", -1, -1), new Among("gener", -1, -1)];
            }
        }, {
            key: 'a_1',
            get: function get() {
                delete englishStemmer.a_1;
                return englishStemmer.a_1 = [new Among("'", -1, 1), new Among("'s'", 0, 1), new Among("'s", -1, 1)];
            }
        }, {
            key: 'a_2',
            get: function get() {
                delete englishStemmer.a_2;
                return englishStemmer.a_2 = [new Among("ied", -1, 2), new Among("s", -1, 3), new Among("ies", 1, 2), new Among("sses", 1, 1), new Among("ss", 1, -1), new Among("us", 1, -1)];
            }
        }, {
            key: 'a_3',
            get: function get() {
                delete englishStemmer.a_3;
                return englishStemmer.a_3 = [new Among("", -1, 3), new Among("bb", 0, 2), new Among("dd", 0, 2), new Among("ff", 0, 2), new Among("gg", 0, 2), new Among("bl", 0, 1), new Among("mm", 0, 2), new Among("nn", 0, 2), new Among("pp", 0, 2), new Among("rr", 0, 2), new Among("at", 0, 1), new Among("tt", 0, 2), new Among("iz", 0, 1)];
            }
        }, {
            key: 'a_4',
            get: function get() {
                delete englishStemmer.a_4;
                return englishStemmer.a_4 = [new Among("ed", -1, 2), new Among("eed", 0, 1), new Among("ing", -1, 2), new Among("edly", -1, 2), new Among("eedly", 3, 1), new Among("ingly", -1, 2)];
            }
        }, {
            key: 'a_5',
            get: function get() {
                delete englishStemmer.a_5;
                return englishStemmer.a_5 = [new Among("anci", -1, 3), new Among("enci", -1, 2), new Among("ogi", -1, 13), new Among("li", -1, 16), new Among("bli", 3, 12), new Among("abli", 4, 4), new Among("alli", 3, 8), new Among("fulli", 3, 14), new Among("lessli", 3, 15), new Among("ousli", 3, 10), new Among("entli", 3, 5), new Among("aliti", -1, 8), new Among("biliti", -1, 12), new Among("iviti", -1, 11), new Among("tional", -1, 1), new Among("ational", 14, 7), new Among("alism", -1, 8), new Among("ation", -1, 7), new Among("ization", 17, 6), new Among("izer", -1, 6), new Among("ator", -1, 7), new Among("iveness", -1, 11), new Among("fulness", -1, 9), new Among("ousness", -1, 10)];
            }
        }, {
            key: 'a_6',
            get: function get() {
                delete englishStemmer.a_6;
                return englishStemmer.a_6 = [new Among("icate", -1, 4), new Among("ative", -1, 6), new Among("alize", -1, 3), new Among("iciti", -1, 4), new Among("ical", -1, 4), new Among("tional", -1, 1), new Among("ational", 5, 2), new Among("ful", -1, 5), new Among("ness", -1, 5)];
            }
        }, {
            key: 'a_7',
            get: function get() {
                delete englishStemmer.a_7;
                return englishStemmer.a_7 = [new Among("ic", -1, 1), new Among("ance", -1, 1), new Among("ence", -1, 1), new Among("able", -1, 1), new Among("ible", -1, 1), new Among("ate", -1, 1), new Among("ive", -1, 1), new Among("ize", -1, 1), new Among("iti", -1, 1), new Among("al", -1, 1), new Among("ism", -1, 1), new Among("ion", -1, 2), new Among("er", -1, 1), new Among("ous", -1, 1), new Among("ant", -1, 1), new Among("ent", -1, 1), new Among("ment", 15, 1), new Among("ement", 16, 1)];
            }
        }, {
            key: 'a_8',
            get: function get() {
                delete englishStemmer.a_8;
                return englishStemmer.a_8 = [new Among("e", -1, 1), new Among("l", -1, 2)];
            }
        }, {
            key: 'a_9',
            get: function get() {
                delete englishStemmer.a_9;
                return englishStemmer.a_9 = [new Among("succeed", -1, -1), new Among("proceed", -1, -1), new Among("exceed", -1, -1), new Among("canning", -1, -1), new Among("inning", -1, -1), new Among("earring", -1, -1), new Among("herring", -1, -1), new Among("outing", -1, -1)];
            }
        }, {
            key: 'a_10',
            get: function get() {
                delete englishStemmer.a_10;
                return englishStemmer.a_10 = [new Among("andes", -1, -1), new Among("atlas", -1, -1), new Among("bias", -1, -1), new Among("cosmos", -1, -1), new Among("dying", -1, 3), new Among("early", -1, 9), new Among("gently", -1, 7), new Among("howe", -1, -1), new Among("idly", -1, 6), new Among("lying", -1, 4), new Among("news", -1, -1), new Among("only", -1, 10), new Among("singly", -1, 11), new Among("skies", -1, 2), new Among("skis", -1, 1), new Among("sky", -1, -1), new Among("tying", -1, 5), new Among("ugly", -1, 8)];
            }
        }, {
            key: 'g_v',
            get: function get() {
                delete englishStemmer.g_v;
                return englishStemmer.g_v = [17, 65, 16, 1];
            }
        }, {
            key: 'g_v_WXY',
            get: function get() {
                delete englishStemmer.g_v_WXY;
                return englishStemmer.g_v_WXY = [1, 17, 65, 208, 1];
            }
        }, {
            key: 'g_valid_LI',
            get: function get() {
                delete englishStemmer.g_valid_LI;
                return englishStemmer.g_valid_LI = [55, 141, 2];
            }
        }]);

        return englishStemmer;
    }(SnowballStemmer);
    var spanishStemmer = function (_SnowballStemmer21) {
        _inherits(spanishStemmer, _SnowballStemmer21);

        function spanishStemmer() {
            _classCallCheck(this, spanishStemmer);

            return _possibleConstructorReturn(this, Object.getPrototypeOf(spanishStemmer).apply(this, arguments));
        }

        _createClass(spanishStemmer, [{
            key: 'r_mark_regions$esjava$0',
            value: function r_mark_regions$esjava$0() {
                var v_1 = undefined;
                var v_2 = undefined;
                var v_3 = undefined;
                var v_6 = undefined;
                var v_8 = undefined;
                this.I_pV = this.limit;
                this.I_p1 = this.limit;
                this.I_p2 = this.limit;
                v_1 = this.cursor;

                lab0: do {
                    lab1: do {
                        v_2 = this.cursor;

                        lab2: do {
                            if (!this.in_grouping$esjava$3(spanishStemmer.g_v, 97, 252)) {
                                break lab2;
                            }

                            lab3: do {
                                v_3 = this.cursor;

                                lab4: do {
                                    if (!this.out_grouping$esjava$3(spanishStemmer.g_v, 97, 252)) {
                                        break lab4;
                                    }

                                    golab5: while (true) {
                                        lab6: do {
                                            if (!this.in_grouping$esjava$3(spanishStemmer.g_v, 97, 252)) {
                                                break lab6;
                                            }

                                            break golab5;
                                        } while (false);

                                        if (this.cursor >= this.limit) {
                                            break lab4;
                                        }

                                        this.cursor++;
                                    }

                                    break lab3;
                                } while (false);

                                this.cursor = v_3;

                                if (!this.in_grouping$esjava$3(spanishStemmer.g_v, 97, 252)) {
                                    break lab2;
                                }

                                golab7: while (true) {
                                    lab8: do {
                                        if (!this.out_grouping$esjava$3(spanishStemmer.g_v, 97, 252)) {
                                            break lab8;
                                        }

                                        break golab7;
                                    } while (false);

                                    if (this.cursor >= this.limit) {
                                        break lab2;
                                    }

                                    this.cursor++;
                                }
                            } while (false);

                            break lab1;
                        } while (false);

                        this.cursor = v_2;

                        if (!this.out_grouping$esjava$3(spanishStemmer.g_v, 97, 252)) {
                            break lab0;
                        }

                        lab9: do {
                            v_6 = this.cursor;

                            lab10: do {
                                if (!this.out_grouping$esjava$3(spanishStemmer.g_v, 97, 252)) {
                                    break lab10;
                                }

                                golab11: while (true) {
                                    lab12: do {
                                        if (!this.in_grouping$esjava$3(spanishStemmer.g_v, 97, 252)) {
                                            break lab12;
                                        }

                                        break golab11;
                                    } while (false);

                                    if (this.cursor >= this.limit) {
                                        break lab10;
                                    }

                                    this.cursor++;
                                }

                                break lab9;
                            } while (false);

                            this.cursor = v_6;

                            if (!this.in_grouping$esjava$3(spanishStemmer.g_v, 97, 252)) {
                                break lab0;
                            }

                            if (this.cursor >= this.limit) {
                                break lab0;
                            }

                            this.cursor++;
                        } while (false);
                    } while (false);

                    this.I_pV = this.cursor;
                } while (false);

                this.cursor = v_1;
                v_8 = this.cursor;

                lab13: do {
                    golab14: while (true) {
                        lab15: do {
                            if (!this.in_grouping$esjava$3(spanishStemmer.g_v, 97, 252)) {
                                break lab15;
                            }

                            break golab14;
                        } while (false);

                        if (this.cursor >= this.limit) {
                            break lab13;
                        }

                        this.cursor++;
                    }

                    golab16: while (true) {
                        lab17: do {
                            if (!this.out_grouping$esjava$3(spanishStemmer.g_v, 97, 252)) {
                                break lab17;
                            }

                            break golab16;
                        } while (false);

                        if (this.cursor >= this.limit) {
                            break lab13;
                        }

                        this.cursor++;
                    }

                    this.I_p1 = this.cursor;

                    golab18: while (true) {
                        lab19: do {
                            if (!this.in_grouping$esjava$3(spanishStemmer.g_v, 97, 252)) {
                                break lab19;
                            }

                            break golab18;
                        } while (false);

                        if (this.cursor >= this.limit) {
                            break lab13;
                        }

                        this.cursor++;
                    }

                    golab20: while (true) {
                        lab21: do {
                            if (!this.out_grouping$esjava$3(spanishStemmer.g_v, 97, 252)) {
                                break lab21;
                            }

                            break golab20;
                        } while (false);

                        if (this.cursor >= this.limit) {
                            break lab13;
                        }

                        this.cursor++;
                    }

                    this.I_p2 = this.cursor;
                } while (false);

                this.cursor = v_8;
                return true;
            }
        }, {
            key: 'r_postlude$esjava$0',
            value: function r_postlude$esjava$0() {
                var among_var = undefined;
                var v_1 = undefined;

                replab0: while (true) {
                    v_1 = this.cursor;

                    lab1: do {
                        this.bra = this.cursor;
                        among_var = this.find_among$esjava$1(spanishStemmer.a_0);

                        if (among_var === 0) {
                            break lab1;
                        }

                        this.ket = this.cursor;

                        switch (among_var) {
                            case 0:
                                break lab1;

                            case 1:
                                this.slice_from$esjava$1("a");
                                break;

                            case 2:
                                this.slice_from$esjava$1("e");
                                break;

                            case 3:
                                this.slice_from$esjava$1("i");
                                break;

                            case 4:
                                this.slice_from$esjava$1("o");
                                break;

                            case 5:
                                this.slice_from$esjava$1("u");
                                break;

                            case 6:
                                if (this.cursor >= this.limit) {
                                    break lab1;
                                }

                                this.cursor++;
                                break;
                        }

                        continue replab0;
                    } while (false);

                    this.cursor = v_1;
                    break replab0;
                }

                return true;
            }
        }, {
            key: 'r_RV$esjava$0',
            value: function r_RV$esjava$0() {
                if (!(this.I_pV <= this.cursor)) {
                    return false;
                }

                return true;
            }
        }, {
            key: 'r_R1$esjava$0',
            value: function r_R1$esjava$0() {
                if (!(this.I_p1 <= this.cursor)) {
                    return false;
                }

                return true;
            }
        }, {
            key: 'r_R2$esjava$0',
            value: function r_R2$esjava$0() {
                if (!(this.I_p2 <= this.cursor)) {
                    return false;
                }

                return true;
            }
        }, {
            key: 'r_attached_pronoun$esjava$0',
            value: function r_attached_pronoun$esjava$0() {
                var among_var = undefined;
                this.ket = this.cursor;

                if (this.find_among_b$esjava$1(spanishStemmer.a_1) === 0) {
                    return false;
                }

                this.bra = this.cursor;
                among_var = this.find_among_b$esjava$1(spanishStemmer.a_2);

                if (among_var === 0) {
                    return false;
                }

                if (!this.r_RV$esjava$0()) {
                    return false;
                }

                switch (among_var) {
                    case 0:
                        return false;

                    case 1:
                        this.bra = this.cursor;
                        this.slice_from$esjava$1("iendo");
                        break;

                    case 2:
                        this.bra = this.cursor;
                        this.slice_from$esjava$1("ando");
                        break;

                    case 3:
                        this.bra = this.cursor;
                        this.slice_from$esjava$1("ar");
                        break;

                    case 4:
                        this.bra = this.cursor;
                        this.slice_from$esjava$1("er");
                        break;

                    case 5:
                        this.bra = this.cursor;
                        this.slice_from$esjava$1("ir");
                        break;

                    case 6:
                        this.slice_del$esjava$0();
                        break;

                    case 7:
                        if (!this.eq_s_b$esjava$1("u")) {
                            return false;
                        }

                        this.slice_del$esjava$0();
                        break;
                }

                return true;
            }
        }, {
            key: 'r_standard_suffix$esjava$0',
            value: function r_standard_suffix$esjava$0() {
                var among_var = undefined;
                var v_1 = undefined;
                var v_2 = undefined;
                var v_3 = undefined;
                var v_4 = undefined;
                var v_5 = undefined;
                this.ket = this.cursor;
                among_var = this.find_among_b$esjava$1(spanishStemmer.a_6);

                if (among_var === 0) {
                    return false;
                }

                this.bra = this.cursor;

                switch (among_var) {
                    case 0:
                        return false;

                    case 1:
                        if (!this.r_R2$esjava$0()) {
                            return false;
                        }

                        this.slice_del$esjava$0();
                        break;

                    case 2:
                        if (!this.r_R2$esjava$0()) {
                            return false;
                        }

                        this.slice_del$esjava$0();
                        v_1 = this.limit - this.cursor;

                        lab0: do {
                            this.ket = this.cursor;

                            if (!this.eq_s_b$esjava$1("ic")) {
                                this.cursor = this.limit - v_1;
                                break lab0;
                            }

                            this.bra = this.cursor;

                            if (!this.r_R2$esjava$0()) {
                                this.cursor = this.limit - v_1;
                                break lab0;
                            }

                            this.slice_del$esjava$0();
                        } while (false);

                        break;

                    case 3:
                        if (!this.r_R2$esjava$0()) {
                            return false;
                        }

                        this.slice_from$esjava$1("log");
                        break;

                    case 4:
                        if (!this.r_R2$esjava$0()) {
                            return false;
                        }

                        this.slice_from$esjava$1("u");
                        break;

                    case 5:
                        if (!this.r_R2$esjava$0()) {
                            return false;
                        }

                        this.slice_from$esjava$1("ente");
                        break;

                    case 6:
                        if (!this.r_R1$esjava$0()) {
                            return false;
                        }

                        this.slice_del$esjava$0();
                        v_2 = this.limit - this.cursor;

                        lab1: do {
                            this.ket = this.cursor;
                            among_var = this.find_among_b$esjava$1(spanishStemmer.a_3);

                            if (among_var === 0) {
                                this.cursor = this.limit - v_2;
                                break lab1;
                            }

                            this.bra = this.cursor;

                            if (!this.r_R2$esjava$0()) {
                                this.cursor = this.limit - v_2;
                                break lab1;
                            }

                            this.slice_del$esjava$0();

                            switch (among_var) {
                                case 0:
                                    this.cursor = this.limit - v_2;
                                    break lab1;

                                case 1:
                                    this.ket = this.cursor;

                                    if (!this.eq_s_b$esjava$1("at")) {
                                        this.cursor = this.limit - v_2;
                                        break lab1;
                                    }

                                    this.bra = this.cursor;

                                    if (!this.r_R2$esjava$0()) {
                                        this.cursor = this.limit - v_2;
                                        break lab1;
                                    }

                                    this.slice_del$esjava$0();
                                    break;
                            }
                        } while (false);

                        break;

                    case 7:
                        if (!this.r_R2$esjava$0()) {
                            return false;
                        }

                        this.slice_del$esjava$0();
                        v_3 = this.limit - this.cursor;

                        lab2: do {
                            this.ket = this.cursor;
                            among_var = this.find_among_b$esjava$1(spanishStemmer.a_4);

                            if (among_var === 0) {
                                this.cursor = this.limit - v_3;
                                break lab2;
                            }

                            this.bra = this.cursor;

                            switch (among_var) {
                                case 0:
                                    this.cursor = this.limit - v_3;
                                    break lab2;

                                case 1:
                                    if (!this.r_R2$esjava$0()) {
                                        this.cursor = this.limit - v_3;
                                        break lab2;
                                    }

                                    this.slice_del$esjava$0();
                                    break;
                            }
                        } while (false);

                        break;

                    case 8:
                        if (!this.r_R2$esjava$0()) {
                            return false;
                        }

                        this.slice_del$esjava$0();
                        v_4 = this.limit - this.cursor;

                        lab3: do {
                            this.ket = this.cursor;
                            among_var = this.find_among_b$esjava$1(spanishStemmer.a_5);

                            if (among_var === 0) {
                                this.cursor = this.limit - v_4;
                                break lab3;
                            }

                            this.bra = this.cursor;

                            switch (among_var) {
                                case 0:
                                    this.cursor = this.limit - v_4;
                                    break lab3;

                                case 1:
                                    if (!this.r_R2$esjava$0()) {
                                        this.cursor = this.limit - v_4;
                                        break lab3;
                                    }

                                    this.slice_del$esjava$0();
                                    break;
                            }
                        } while (false);

                        break;

                    case 9:
                        if (!this.r_R2$esjava$0()) {
                            return false;
                        }

                        this.slice_del$esjava$0();
                        v_5 = this.limit - this.cursor;

                        lab4: do {
                            this.ket = this.cursor;

                            if (!this.eq_s_b$esjava$1("at")) {
                                this.cursor = this.limit - v_5;
                                break lab4;
                            }

                            this.bra = this.cursor;

                            if (!this.r_R2$esjava$0()) {
                                this.cursor = this.limit - v_5;
                                break lab4;
                            }

                            this.slice_del$esjava$0();
                        } while (false);

                        break;
                }

                return true;
            }
        }, {
            key: 'r_y_verb_suffix$esjava$0',
            value: function r_y_verb_suffix$esjava$0() {
                var among_var = undefined;
                var v_1 = undefined;
                var v_2 = undefined;
                v_1 = this.limit - this.cursor;

                if (this.cursor < this.I_pV) {
                    return false;
                }

                this.cursor = this.I_pV;
                v_2 = this.limit_backward;
                this.limit_backward = this.cursor;
                this.cursor = this.limit - v_1;
                this.ket = this.cursor;
                among_var = this.find_among_b$esjava$1(spanishStemmer.a_7);

                if (among_var === 0) {
                    this.limit_backward = v_2;
                    return false;
                }

                this.bra = this.cursor;
                this.limit_backward = v_2;

                switch (among_var) {
                    case 0:
                        return false;

                    case 1:
                        if (!this.eq_s_b$esjava$1("u")) {
                            return false;
                        }

                        this.slice_del$esjava$0();
                        break;
                }

                return true;
            }
        }, {
            key: 'r_verb_suffix$esjava$0',
            value: function r_verb_suffix$esjava$0() {
                var among_var = undefined;
                var v_1 = undefined;
                var v_2 = undefined;
                var v_3 = undefined;
                var v_4 = undefined;
                v_1 = this.limit - this.cursor;

                if (this.cursor < this.I_pV) {
                    return false;
                }

                this.cursor = this.I_pV;
                v_2 = this.limit_backward;
                this.limit_backward = this.cursor;
                this.cursor = this.limit - v_1;
                this.ket = this.cursor;
                among_var = this.find_among_b$esjava$1(spanishStemmer.a_8);

                if (among_var === 0) {
                    this.limit_backward = v_2;
                    return false;
                }

                this.bra = this.cursor;
                this.limit_backward = v_2;

                switch (among_var) {
                    case 0:
                        return false;

                    case 1:
                        v_3 = this.limit - this.cursor;

                        lab0: do {
                            if (!this.eq_s_b$esjava$1("u")) {
                                this.cursor = this.limit - v_3;
                                break lab0;
                            }

                            v_4 = this.limit - this.cursor;

                            if (!this.eq_s_b$esjava$1("g")) {
                                this.cursor = this.limit - v_3;
                                break lab0;
                            }

                            this.cursor = this.limit - v_4;
                        } while (false);

                        this.bra = this.cursor;
                        this.slice_del$esjava$0();
                        break;

                    case 2:
                        this.slice_del$esjava$0();
                        break;
                }

                return true;
            }
        }, {
            key: 'r_residual_suffix$esjava$0',
            value: function r_residual_suffix$esjava$0() {
                var among_var = undefined;
                var v_1 = undefined;
                var v_2 = undefined;
                this.ket = this.cursor;
                among_var = this.find_among_b$esjava$1(spanishStemmer.a_9);

                if (among_var === 0) {
                    return false;
                }

                this.bra = this.cursor;

                switch (among_var) {
                    case 0:
                        return false;

                    case 1:
                        if (!this.r_RV$esjava$0()) {
                            return false;
                        }

                        this.slice_del$esjava$0();
                        break;

                    case 2:
                        if (!this.r_RV$esjava$0()) {
                            return false;
                        }

                        this.slice_del$esjava$0();
                        v_1 = this.limit - this.cursor;

                        lab0: do {
                            this.ket = this.cursor;

                            if (!this.eq_s_b$esjava$1("u")) {
                                this.cursor = this.limit - v_1;
                                break lab0;
                            }

                            this.bra = this.cursor;
                            v_2 = this.limit - this.cursor;

                            if (!this.eq_s_b$esjava$1("g")) {
                                this.cursor = this.limit - v_1;
                                break lab0;
                            }

                            this.cursor = this.limit - v_2;

                            if (!this.r_RV$esjava$0()) {
                                this.cursor = this.limit - v_1;
                                break lab0;
                            }

                            this.slice_del$esjava$0();
                        } while (false);

                        break;
                }

                return true;
            }
        }, {
            key: 'stem$esjava$0',
            value: function stem$esjava$0() {
                var v_1 = undefined;
                var v_2 = undefined;
                var v_3 = undefined;
                var v_4 = undefined;
                var v_5 = undefined;
                var v_6 = undefined;
                v_1 = this.cursor;

                lab0: do {
                    if (!this.r_mark_regions$esjava$0()) {
                        break lab0;
                    }
                } while (false);

                this.cursor = v_1;
                this.limit_backward = this.cursor;
                this.cursor = this.limit;
                v_2 = this.limit - this.cursor;

                lab1: do {
                    if (!this.r_attached_pronoun$esjava$0()) {
                        break lab1;
                    }
                } while (false);

                this.cursor = this.limit - v_2;
                v_3 = this.limit - this.cursor;

                lab2: do {
                    lab3: do {
                        v_4 = this.limit - this.cursor;

                        lab4: do {
                            if (!this.r_standard_suffix$esjava$0()) {
                                break lab4;
                            }

                            break lab3;
                        } while (false);

                        this.cursor = this.limit - v_4;

                        lab5: do {
                            if (!this.r_y_verb_suffix$esjava$0()) {
                                break lab5;
                            }

                            break lab3;
                        } while (false);

                        this.cursor = this.limit - v_4;

                        if (!this.r_verb_suffix$esjava$0()) {
                            break lab2;
                        }
                    } while (false);
                } while (false);

                this.cursor = this.limit - v_3;
                v_5 = this.limit - this.cursor;

                lab6: do {
                    if (!this.r_residual_suffix$esjava$0()) {
                        break lab6;
                    }
                } while (false);

                this.cursor = this.limit - v_5;
                this.cursor = this.limit_backward;
                v_6 = this.cursor;

                lab7: do {
                    if (!this.r_postlude$esjava$0()) {
                        break lab7;
                    }
                } while (false);

                this.cursor = v_6;
                return true;
            }
        }, {
            key: 'stem',
            value: function stem() {
                var _get47;

                for (var _len46 = arguments.length, args = Array(_len46), _key46 = 0; _key46 < _len46; _key46++) {
                    args[_key46] = arguments[_key46];
                }

                switch (args.length) {
                    case 0:
                        return this.stem$esjava$0.apply(this, args);
                }

                return (_get47 = _get(Object.getPrototypeOf(spanishStemmer.prototype), 'stem', this)).call.apply(_get47, [this].concat(args));
            }
        }, {
            key: 'I_p2',
            get: function get() {
                return Object.prototype.hasOwnProperty.call(this, '_$esjava$I_p2') ? this._$esjava$I_p2 : this._$esjava$I_p2 = 0;
            },
            set: function set(v) {
                this._$esjava$I_p2 = v;
            }
        }, {
            key: 'I_p1',
            get: function get() {
                return Object.prototype.hasOwnProperty.call(this, '_$esjava$I_p1') ? this._$esjava$I_p1 : this._$esjava$I_p1 = 0;
            },
            set: function set(v) {
                this._$esjava$I_p1 = v;
            }
        }, {
            key: 'I_pV',
            get: function get() {
                return Object.prototype.hasOwnProperty.call(this, '_$esjava$I_pV') ? this._$esjava$I_pV : this._$esjava$I_pV = 0;
            },
            set: function set(v) {
                this._$esjava$I_pV = v;
            }
        }], [{
            key: 'a_0',
            get: function get() {
                delete spanishStemmer.a_0;
                return spanishStemmer.a_0 = [new Among("", -1, 6), new Among('\u00E1', 0, 1), new Among('\u00E9', 0, 2), new Among('\u00ED', 0, 3), new Among('\u00F3', 0, 4), new Among('\u00FA', 0, 5)];
            }
        }, {
            key: 'a_1',
            get: function get() {
                delete spanishStemmer.a_1;
                return spanishStemmer.a_1 = [new Among("la", -1, -1), new Among("sela", 0, -1), new Among("le", -1, -1), new Among("me", -1, -1), new Among("se", -1, -1), new Among("lo", -1, -1), new Among("selo", 5, -1), new Among("las", -1, -1), new Among("selas", 7, -1), new Among("les", -1, -1), new Among("los", -1, -1), new Among("selos", 10, -1), new Among("nos", -1, -1)];
            }
        }, {
            key: 'a_2',
            get: function get() {
                delete spanishStemmer.a_2;
                return spanishStemmer.a_2 = [new Among("ando", -1, 6), new Among("iendo", -1, 6), new Among("yendo", -1, 7), new Among('\u00E1ndo', -1, 2), new Among('i\u00E9ndo', -1, 1), new Among("ar", -1, 6), new Among("er", -1, 6), new Among("ir", -1, 6), new Among('\u00E1r', -1, 3), new Among('\u00E9r', -1, 4), new Among('\u00EDr', -1, 5)];
            }
        }, {
            key: 'a_3',
            get: function get() {
                delete spanishStemmer.a_3;
                return spanishStemmer.a_3 = [new Among("ic", -1, -1), new Among("ad", -1, -1), new Among("os", -1, -1), new Among("iv", -1, 1)];
            }
        }, {
            key: 'a_4',
            get: function get() {
                delete spanishStemmer.a_4;
                return spanishStemmer.a_4 = [new Among("able", -1, 1), new Among("ible", -1, 1), new Among("ante", -1, 1)];
            }
        }, {
            key: 'a_5',
            get: function get() {
                delete spanishStemmer.a_5;
                return spanishStemmer.a_5 = [new Among("ic", -1, 1), new Among("abil", -1, 1), new Among("iv", -1, 1)];
            }
        }, {
            key: 'a_6',
            get: function get() {
                delete spanishStemmer.a_6;
                return spanishStemmer.a_6 = [new Among("ica", -1, 1), new Among("ancia", -1, 2), new Among("encia", -1, 5), new Among("adora", -1, 2), new Among("osa", -1, 1), new Among("ista", -1, 1), new Among("iva", -1, 9), new Among("anza", -1, 1), new Among('log\u00EDa', -1, 3), new Among("idad", -1, 8), new Among("able", -1, 1), new Among("ible", -1, 1), new Among("ante", -1, 2), new Among("mente", -1, 7), new Among("amente", 13, 6), new Among('aci\u00F3n', -1, 2), new Among('uci\u00F3n', -1, 4), new Among("ico", -1, 1), new Among("ismo", -1, 1), new Among("oso", -1, 1), new Among("amiento", -1, 1), new Among("imiento", -1, 1), new Among("ivo", -1, 9), new Among("ador", -1, 2), new Among("icas", -1, 1), new Among("ancias", -1, 2), new Among("encias", -1, 5), new Among("adoras", -1, 2), new Among("osas", -1, 1), new Among("istas", -1, 1), new Among("ivas", -1, 9), new Among("anzas", -1, 1), new Among('log\u00EDas', -1, 3), new Among("idades", -1, 8), new Among("ables", -1, 1), new Among("ibles", -1, 1), new Among("aciones", -1, 2), new Among("uciones", -1, 4), new Among("adores", -1, 2), new Among("antes", -1, 2), new Among("icos", -1, 1), new Among("ismos", -1, 1), new Among("osos", -1, 1), new Among("amientos", -1, 1), new Among("imientos", -1, 1), new Among("ivos", -1, 9)];
            }
        }, {
            key: 'a_7',
            get: function get() {
                delete spanishStemmer.a_7;
                return spanishStemmer.a_7 = [new Among("ya", -1, 1), new Among("ye", -1, 1), new Among("yan", -1, 1), new Among("yen", -1, 1), new Among("yeron", -1, 1), new Among("yendo", -1, 1), new Among("yo", -1, 1), new Among("yas", -1, 1), new Among("yes", -1, 1), new Among("yais", -1, 1), new Among("yamos", -1, 1), new Among('y\u00F3', -1, 1)];
            }
        }, {
            key: 'a_8',
            get: function get() {
                delete spanishStemmer.a_8;
                return spanishStemmer.a_8 = [new Among("aba", -1, 2), new Among("ada", -1, 2), new Among("ida", -1, 2), new Among("ara", -1, 2), new Among("iera", -1, 2), new Among('\u00EDa', -1, 2), new Among('ar\u00EDa', 5, 2), new Among('er\u00EDa', 5, 2), new Among('ir\u00EDa', 5, 2), new Among("ad", -1, 2), new Among("ed", -1, 2), new Among("id", -1, 2), new Among("ase", -1, 2), new Among("iese", -1, 2), new Among("aste", -1, 2), new Among("iste", -1, 2), new Among("an", -1, 2), new Among("aban", 16, 2), new Among("aran", 16, 2), new Among("ieran", 16, 2), new Among('\u00EDan', 16, 2), new Among('ar\u00EDan', 20, 2), new Among('er\u00EDan', 20, 2), new Among('ir\u00EDan', 20, 2), new Among("en", -1, 1), new Among("asen", 24, 2), new Among("iesen", 24, 2), new Among("aron", -1, 2), new Among("ieron", -1, 2), new Among('ar\u00E1n', -1, 2), new Among('er\u00E1n', -1, 2), new Among('ir\u00E1n', -1, 2), new Among("ado", -1, 2), new Among("ido", -1, 2), new Among("ando", -1, 2), new Among("iendo", -1, 2), new Among("ar", -1, 2), new Among("er", -1, 2), new Among("ir", -1, 2), new Among("as", -1, 2), new Among("abas", 39, 2), new Among("adas", 39, 2), new Among("idas", 39, 2), new Among("aras", 39, 2), new Among("ieras", 39, 2), new Among('\u00EDas', 39, 2), new Among('ar\u00EDas', 45, 2), new Among('er\u00EDas', 45, 2), new Among('ir\u00EDas', 45, 2), new Among("es", -1, 1), new Among("ases", 49, 2), new Among("ieses", 49, 2), new Among("abais", -1, 2), new Among("arais", -1, 2), new Among("ierais", -1, 2), new Among('\u00EDais', -1, 2), new Among('ar\u00EDais', 55, 2), new Among('er\u00EDais', 55, 2), new Among('ir\u00EDais', 55, 2), new Among("aseis", -1, 2), new Among("ieseis", -1, 2), new Among("asteis", -1, 2), new Among("isteis", -1, 2), new Among('\u00E1is', -1, 2), new Among('\u00E9is', -1, 1), new Among('ar\u00E9is', 64, 2), new Among('er\u00E9is', 64, 2), new Among('ir\u00E9is', 64, 2), new Among("ados", -1, 2), new Among("idos", -1, 2), new Among("amos", -1, 2), new Among('\u00E1bamos', 70, 2), new Among('\u00E1ramos', 70, 2), new Among('i\u00E9ramos', 70, 2), new Among('\u00EDamos', 70, 2), new Among('ar\u00EDamos', 74, 2), new Among('er\u00EDamos', 74, 2), new Among('ir\u00EDamos', 74, 2), new Among("emos", -1, 1), new Among("aremos", 78, 2), new Among("eremos", 78, 2), new Among("iremos", 78, 2), new Among('\u00E1semos', 78, 2), new Among('i\u00E9semos', 78, 2), new Among("imos", -1, 2), new Among('ar\u00E1s', -1, 2), new Among('er\u00E1s', -1, 2), new Among('ir\u00E1s', -1, 2), new Among('\u00EDs', -1, 2), new Among('ar\u00E1', -1, 2), new Among('er\u00E1', -1, 2), new Among('ir\u00E1', -1, 2), new Among('ar\u00E9', -1, 2), new Among('er\u00E9', -1, 2), new Among('ir\u00E9', -1, 2), new Among('i\u00F3', -1, 2)];
            }
        }, {
            key: 'a_9',
            get: function get() {
                delete spanishStemmer.a_9;
                return spanishStemmer.a_9 = [new Among("a", -1, 1), new Among("e", -1, 2), new Among("o", -1, 1), new Among("os", -1, 1), new Among('\u00E1', -1, 1), new Among('\u00E9', -1, 2), new Among('\u00ED', -1, 1), new Among('\u00F3', -1, 1)];
            }
        }, {
            key: 'g_v',
            get: function get() {
                delete spanishStemmer.g_v;
                return spanishStemmer.g_v = [17, 65, 16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 17, 4, 10];
            }
        }]);

        return spanishStemmer;
    }(SnowballStemmer);

    function newStemmer(lng) {
        var stemMap = { english: englishStemmer, spanish: spanishStemmer };
        var stemmer = new stemMap[String(lng).toLowerCase()]();
        return {
            stem: function stem(word) {
                stemmer.setCurrent(word);
                stemmer.stem();
                return stemmer.getCurrent();
            }
        };
    }

    function algorithms() {
        return ['english', 'spanish'];
    }
});
