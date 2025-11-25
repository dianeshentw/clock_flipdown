"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var FlipDown = function () {
  function FlipDown(uts) {
    var el = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "flipdown";
    var opt = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    _classCallCheck(this, FlipDown);
    if (typeof uts !== "number") {
      throw new Error("FlipDown: Constructor expected unix timestamp, got ".concat(_typeof(uts), " instead."));
    }
    if (_typeof(el) === "object") {
      opt = el;
      el = "flipdown";
    }
    this.version = "0.3.2";
    this.initialised = false;
    this.now = this._getTime();
    this.epoch = uts;
    this.countdownEnded = false;
    this.hasEndedCallback = null;
    this.element = document.getElementById(el);
    this.rotors = [];
    this.rotorLeafFront = [];
    this.rotorLeafRear = [];
    this.rotorTops = [];
    this.rotorBottoms = [];
    this.countdown = null;
    this.clockValues = {};
    this.clockStrings = {};
    this.clockValuesAsString = [];
    this.prevClockValuesAsString = [];
    this.opts = this._parseOptions(opt);
    this._setOptions();
    console.log("FlipDown ".concat(this.version, " (Theme: ").concat(this.opts.theme, ")"));
  }
  return _createClass(FlipDown, [{
    key: "start",
    value: function start() {
      if (!this.initialised) this._init();
      this.countdown = setInterval(this._tick.bind(this), 1000);
      return this;
    }
  }, {
    key: "ifEnded",
    value: function ifEnded(cb) {
      this.hasEndedCallback = function () {
        cb();
        this.hasEndedCallback = null;
      };
      return this;
    }
  }, {
    key: "_getTime",
    value: function _getTime() {
      return new Date().getTime() / 1000;
    }
  }, {
    key: "_hasCountdownEnded",
    value: function _hasCountdownEnded() {
      if (this.epoch - this.now < 0) {
        this.countdownEnded = true;
        if (this.hasEndedCallback != null) {
          this.hasEndedCallback();
          this.hasEndedCallback = null;
        }
        return true;
      } else {
        this.countdownEnded = false;
        return false;
      }
    }
  }, {
    key: "_parseOptions",
    value: function _parseOptions(opt) {
      var headings = ["Hours", "Minutes", "Seconds"];
      if (opt.headings && opt.headings.length === 3) {
        headings = opt.headings;
      }
      return {
        theme: "dark",
        headings: headings
      };
    }
  }, {
    key: "_setOptions",
    value: function _setOptions() {
      this.element.classList.add("flipdown__theme-".concat(this.opts.theme));
    }
  }, {
    key: "_init",
    value: function _init() {
      this.initialised = true;
      for (var i = 0; i < 6; i++) {
        this.rotors.push(this._createRotor(0));
      }
      var count = 0;
      for (var i = 0; i < 3; i++) {
        var rotors = [];
        for (var j = 0; j < 2; j++) {
          rotors.push(this.rotors[count]);
          count++;
        }
        this.element.appendChild(this._createRotorGroup(rotors, i));
      }
      this.rotorLeafFront = Array.prototype.slice.call(this.element.getElementsByClassName("rotor-leaf-front"));
      this.rotorLeafRear = Array.prototype.slice.call(this.element.getElementsByClassName("rotor-leaf-rear"));
      this.rotorTop = Array.prototype.slice.call(this.element.getElementsByClassName("rotor-top"));
      this.rotorBottom = Array.prototype.slice.call(this.element.getElementsByClassName("rotor-bottom"));
      this._tick();
      this._updateClockValues(true);
      return this;
    }
  }, {
    key: "_createRotorGroup",
    value: function _createRotorGroup(rotors, rotorIndex) {
      var rotorGroup = document.createElement("div");
      rotorGroup.className = "rotor-group";
      var dayRotorGroupHeading = document.createElement("div");
      dayRotorGroupHeading.className = "rotor-group-heading";
      dayRotorGroupHeading.setAttribute("data-before", this.opts.headings[rotorIndex]);
      rotorGroup.appendChild(dayRotorGroupHeading);
      appendChildren(rotorGroup, rotors);
      return rotorGroup;
    }
  }, {
    key: "_createRotor",
    value: function _createRotor() {
      var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var rotor = document.createElement("div");
      var rotorLeaf = document.createElement("div");
      var rotorLeafRear = document.createElement("figure");
      var rotorLeafFront = document.createElement("figure");
      var rotorTop = document.createElement("div");
      var rotorBottom = document.createElement("div");
      rotor.className = "rotor";
      rotorLeaf.className = "rotor-leaf";
      rotorLeafRear.className = "rotor-leaf-rear";
      rotorLeafFront.className = "rotor-leaf-front";
      rotorTop.className = "rotor-top";
      rotorBottom.className = "rotor-bottom";
      rotorLeafRear.textContent = v;
      rotorTop.textContent = v;
      rotorBottom.textContent = v;
      appendChildren(rotor, [rotorLeaf, rotorTop, rotorBottom]);
      appendChildren(rotorLeaf, [rotorLeafRear, rotorLeafFront]);
      return rotor;
    }
  }, {
    key: "_tick",
    value: function _tick() {
      this.now = this._getTime();
      var diff = this.epoch - this.now <= 0 ? 0 : this.epoch - this.now;
      this.clockValues.h = Math.floor(diff / 3600);
      diff -= this.clockValues.h * 3600;
      this.clockValues.m = Math.floor(diff / 60);
      diff -= this.clockValues.m * 60;
      this.clockValues.s = Math.floor(diff);
      this._updateClockValues();
      this._hasCountdownEnded();
    }
  }, {
    key: "_updateClockValues",
    value: function _updateClockValues() {
      var _this = this;
      var init = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      if (this.prevClockValuesAsString.length === 0) {
        this.prevClockValuesAsString = ["0", "0", "0", "0", "0", "0"];
      }
      this.clockStrings.h = pad(this.clockValues.h, 2);
      this.clockStrings.m = pad(this.clockValues.m, 2);
      this.clockStrings.s = pad(this.clockValues.s, 2);
      this.clockValuesAsString = (this.clockStrings.h + this.clockStrings.m + this.clockStrings.s).split("");
      this.rotorLeafFront.forEach(function (el, i) {
        el.textContent = _this.prevClockValuesAsString[i];
      });
      this.rotorBottom.forEach(function (el, i) {
        el.textContent = _this.prevClockValuesAsString[i];
      });
      function rotorTopFlip() {
        var _this2 = this;
        this.rotorTop.forEach(function (el, i) {
          if (el.textContent != _this2.clockValuesAsString[i]) {
            el.textContent = _this2.clockValuesAsString[i];
          }
        });
      }
      function rotorLeafRearFlip() {
        var _this3 = this;
        this.rotorLeafRear.forEach(function (el, i) {
          if (el.textContent != _this3.clockValuesAsString[i]) {
            el.textContent = _this3.clockValuesAsString[i];
            el.parentElement.classList.add("flipped");
            var flip = setInterval(function () {
              el.parentElement.classList.remove("flipped");
              clearInterval(flip);
            }.bind(_this3), 500);
          }
        });
      }
      if (!init) {
        setTimeout(rotorTopFlip.bind(this), 500);
        setTimeout(rotorLeafRearFlip.bind(this), 500);
      } else {
        rotorTopFlip.call(this);
        rotorLeafRearFlip.call(this);
      }
      this.prevClockValuesAsString = this.clockValuesAsString;
    }
  }]);
}();
function pad(n, len) {
  n = n.toString();
  return n.length < len ? pad("0" + n, len) : n;
}
function appendChildren(parent, children) {
  children.forEach(function (el) {
    parent.appendChild(el);
  });
}
