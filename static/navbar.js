function collapse_ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly &&
      (symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })),
      keys.push.apply(keys, symbols);
  }
  return keys;
}

function collapse_objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2
      ? collapse_ownKeys(Object(source), !0).forEach(function (key) {
          collapse_defineProperty(target, key, source[key]);
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(
          target,
          Object.getOwnPropertyDescriptors(source)
        )
      : collapse_ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(
            target,
            key,
            Object.getOwnPropertyDescriptor(source, key)
          );
        });
  }
  return target;
}

function collapse_defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

function collapse_classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function collapse_defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function collapse_createClass(Constructor, protoProps, staticProps) {
  if (protoProps) collapse_defineProperties(Constructor.prototype, protoProps);
  if (staticProps) collapse_defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", { writable: false });
  return Constructor;
}

var collapse_Default = {
  triggerEl: null,
  onCollapse: function onCollapse() {},
  onExpand: function onExpand() {},
  onToggle: function onToggle() {},
};

var Collapse = (function () {
  function Collapse() {
    var targetEl =
      arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var options = arguments.length > 1 ? arguments[1] : undefined;

    collapse_classCallCheck(this, Collapse);

    this._targetEl = targetEl;
    this._triggerEl = options ? options.triggerEl : collapse_Default.triggerEl;
    this._options = collapse_objectSpread(
      collapse_objectSpread({}, collapse_Default),
      options
    );
    this._visible = false;

    this._init();
  }

  collapse_createClass(Collapse, [
    {
      key: "_init",
      value: function _init() {
        var _this = this;

        if (this._triggerEl) {
          if (this._triggerEl.hasAttribute("aria-expanded")) {
            this._visible =
              this._triggerEl.getAttribute("aria-expanded") === "true"
                ? true
                : false;
          } else {
            // fix until v2 not to break previous single collapses which became dismiss
            this._visible = this._targetEl.classList.contains("hidden")
              ? false
              : true;
          }

          this._triggerEl.addEventListener("click", function () {
            _this._visible ? _this.collapse() : _this.expand();
          });
        }
      },
    },
    {
      key: "collapse",
      value: function collapse() {
        this._targetEl.classList.add("hidden");

        if (this._triggerEl) {
          this._triggerEl.setAttribute("aria-expanded", "false");
        }

        this._visible = false; // callback function

        this._options.onCollapse(this);
      },
    },
    {
      key: "expand",
      value: function expand() {
        this._targetEl.classList.remove("hidden");

        if (this._triggerEl) {
          this._triggerEl.setAttribute("aria-expanded", "true");
        }

        this._visible = true; // callback function

        this._options.onExpand(this);
      },
    },
    {
      key: "toggle",
      value: function toggle() {
        if (this._visible) {
          this.collapse();
        } else {
          this.expand();
        }
      },
    },
  ]);

  return Collapse;
})();

document.addEventListener("DOMContentLoaded", function () {
  document
    .querySelectorAll("[data-collapse-toggle]")
    .forEach(function (triggerEl) {
      var targetEl = document.getElementById(
        triggerEl.getAttribute("data-collapse-toggle")
      );
      new Collapse(targetEl, {
        triggerEl: triggerEl,
      });
    });
});
