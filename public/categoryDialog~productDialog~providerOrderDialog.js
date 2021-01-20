(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["categoryDialog~productDialog~providerOrderDialog"],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/service/FormInput.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/service/FormInput.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  props: ['inputData'],
  name: "FormInput",
  data: function data() {
    return {
      error: null
    };
  },
  computed: {
    parentModel: {
      get: function get() {
        var name_arr = this.inputData.name.split('.');
        var target = this.$parent;
        name_arr.forEach(function (item, index) {
          if (!target[item] && name_arr[index + 1]) {
            target[item] = {};
          }

          target = target[item];
        });
        return target;
      },
      set: function set(val) {
        var name_arr = this.inputData.name.split('.');
        var target = this.$parent;
        name_arr.forEach(function (item, index) {
          if (name_arr[index + 1]) {
            target = target[item];
          } else {
            target[item] = val;
          }
        });
      }
    },
    errorMsg: function errorMsg() {
      return this.error ? this.error : false;
    },
    isInput: function isInput() {
      return this.inputData.type === 'input';
    },
    isTextArea: function isTextArea() {
      return this.inputData.type === 'textarea';
    },
    isSelector: function isSelector() {
      return this.inputData.type === 'selector';
    },
    isCheckbox: function isCheckbox() {
      return this.inputData.type === 'checkbox';
    }
  },
  mounted: function mounted() {
    var _this = this;

    this.$watch('$parent.' + this.inputData.name, function (val) {
      _this.error = null;
    }, {
      deep: true
    });
  },
  watch: {
    // '$parent.entity':{
    //     handler(entity){
    //         this.error = null;
    //     },
    //     deep: true
    // },
    '$parent.messages': function $parentMessages(messages) {
      var name = this.getTargetName();

      if (messages[name] || messages[name + '_id']) {
        var message = messages[name] || messages[name + '_id'];
        this.setError(message);
      }
    }
  },
  methods: {
    getTargetName: function getTargetName() {
      var name_arr = this.inputData.name.split('.');
      return name_arr.slice(-1);
    },
    setError: function setError(error) {
      this.error = error;
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/service/FormInput.vue?vue&type=template&id=a852ac9e&scoped=true&":
/*!********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/service/FormInput.vue?vue&type=template&id=a852ac9e&scoped=true& ***!
  \********************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "form-group" }, [
    _vm.isInput
      ? _c("div", [
          _c("label", [_vm._v(_vm._s(_vm.inputData.label))]),
          _vm._v(" "),
          _vm.$parent.loading
            ? _c(
                "div",
                {
                  staticClass: "list-placeholder",
                  staticStyle: { height: "30px" }
                },
                [_vm._m(0)]
              )
            : _vm._e(),
          _vm._v(" "),
          !_vm.$parent.loading
            ? _c("input", {
                directives: [
                  {
                    name: "tooltip",
                    rawName: "v-tooltip",
                    value: {
                      content: _vm.errorMsg,
                      placement: "left",
                      classes: ["error"]
                    },
                    expression:
                      "{\n                    content: errorMsg,\n                    placement: 'left',\n                    classes: ['error'],\n                }"
                  },
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.parentModel,
                    expression: "parentModel"
                  }
                ],
                staticClass: "form-control",
                class: { "is-invalid": _vm.errorMsg },
                attrs: {
                  placeholder: _vm.inputData.placeholder,
                  disabled: _vm.inputData.disabled,
                  type: "text"
                },
                domProps: { value: _vm.parentModel },
                on: {
                  keypress: function($event) {
                    if (
                      !$event.type.indexOf("key") &&
                      _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")
                    ) {
                      return null
                    }
                    return _vm.$parent.save()
                  },
                  input: function($event) {
                    if ($event.target.composing) {
                      return
                    }
                    _vm.parentModel = $event.target.value
                  }
                }
              })
            : _vm._e()
        ])
      : _vm._e(),
    _vm._v(" "),
    _vm.isTextArea
      ? _c("div", { staticClass: "form-group" }, [
          _c("label", [_vm._v(_vm._s(_vm.inputData.label))]),
          _vm._v(" "),
          _vm.$parent.loading
            ? _c(
                "div",
                {
                  staticClass: "list-placeholder",
                  style: { height: _vm.inputData.height + "px" }
                },
                [
                  _c(
                    "div",
                    {
                      staticClass: "list-placeholder_item",
                      style: { height: _vm.inputData.height + "px" }
                    },
                    [
                      _c("div", {
                        staticClass: "list-placeholder_cell w-100",
                        staticStyle: { width: "100%" }
                      })
                    ]
                  )
                ]
              )
            : _vm._e(),
          _vm._v(" "),
          !_vm.$parent.loading
            ? _c("textarea", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.parentModel,
                    expression: "parentModel"
                  }
                ],
                staticClass: "form-control",
                staticStyle: { resize: "none" },
                style: { height: _vm.inputData.height + "px" },
                attrs: { placeholder: "Комментарий", name: "comment" },
                domProps: { value: _vm.parentModel },
                on: {
                  input: function($event) {
                    if ($event.target.composing) {
                      return
                    }
                    _vm.parentModel = $event.target.value
                  }
                }
              })
            : _vm._e()
        ])
      : _vm._e(),
    _vm._v(" "),
    _vm.isSelector
      ? _c("div", [
          _c("label", [_vm._v(_vm._s(_vm.inputData.label))]),
          _vm._v(" "),
          _vm.$parent.loading
            ? _c(
                "div",
                {
                  staticClass: "list-placeholder",
                  staticStyle: { height: "30px" }
                },
                [_vm._m(1)]
              )
            : _vm._e(),
          _vm._v(" "),
          !_vm.$parent.loading
            ? _c("div", { staticClass: "input-group" }, [
                _c(
                  "button",
                  {
                    directives: [
                      {
                        name: "tooltip",
                        rawName: "v-tooltip",
                        value: {
                          content: _vm.errorMsg,
                          placement: "left",
                          classes: ["error"]
                        },
                        expression:
                          "{\n                    content: errorMsg,\n                    placement: 'left',\n                    classes: ['error'],\n                }"
                      }
                    ],
                    staticClass:
                      "category_select form-control text-left button_select",
                    class: { "is-invalid": _vm.errorMsg },
                    attrs: { type: "button" },
                    on: {
                      click: function($event) {
                        _vm.$parent[_vm.inputData.onClick]()
                      }
                    }
                  },
                  [_vm._v(_vm._s(_vm.parentModel))]
                )
              ])
            : _vm._e()
        ])
      : _vm._e(),
    _vm._v(" "),
    _vm.isCheckbox
      ? _c("div", { staticClass: "relative" }, [
          _c(
            "label",
            {
              staticClass: "w-100",
              class: { "mb-0": !_vm.inputData.mb },
              attrs: { for: _vm.inputData.name }
            },
            [_vm._v(_vm._s(_vm.inputData.label))]
          ),
          _vm._v(" "),
          _c(
            "label",
            {
              staticClass: "absolute custom_checkbox",
              staticStyle: { right: "0", top: "3px" }
            },
            [
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.parentModel,
                    expression: "parentModel"
                  }
                ],
                staticClass: "not_default",
                attrs: {
                  id: _vm.inputData.name,
                  name: _vm.inputData.name,
                  type: "checkbox"
                },
                domProps: {
                  checked: Array.isArray(_vm.parentModel)
                    ? _vm._i(_vm.parentModel, null) > -1
                    : _vm.parentModel
                },
                on: {
                  change: function($event) {
                    var $$a = _vm.parentModel,
                      $$el = $event.target,
                      $$c = $$el.checked ? true : false
                    if (Array.isArray($$a)) {
                      var $$v = null,
                        $$i = _vm._i($$a, $$v)
                      if ($$el.checked) {
                        $$i < 0 && (_vm.parentModel = $$a.concat([$$v]))
                      } else {
                        $$i > -1 &&
                          (_vm.parentModel = $$a
                            .slice(0, $$i)
                            .concat($$a.slice($$i + 1)))
                      }
                    } else {
                      _vm.parentModel = $$c
                    }
                  }
                }
              }),
              _vm._v(" "),
              _c("span")
            ]
          )
        ])
      : _vm._e()
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "div",
      { staticClass: "list-placeholder_item", staticStyle: { height: "30px" } },
      [
        _c("div", {
          staticClass: "list-placeholder_cell w-100",
          staticStyle: { width: "100%" }
        })
      ]
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "div",
      { staticClass: "list-placeholder_item", staticStyle: { height: "30px" } },
      [
        _c("div", {
          staticClass: "list-placeholder_cell w-100",
          staticStyle: { width: "100%" }
        })
      ]
    )
  }
]
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/service/FormInput.vue":
/*!*******************************************************!*\
  !*** ./resources/js/components/service/FormInput.vue ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _FormInput_vue_vue_type_template_id_a852ac9e_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FormInput.vue?vue&type=template&id=a852ac9e&scoped=true& */ "./resources/js/components/service/FormInput.vue?vue&type=template&id=a852ac9e&scoped=true&");
/* harmony import */ var _FormInput_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FormInput.vue?vue&type=script&lang=js& */ "./resources/js/components/service/FormInput.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _FormInput_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _FormInput_vue_vue_type_template_id_a852ac9e_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _FormInput_vue_vue_type_template_id_a852ac9e_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "a852ac9e",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/service/FormInput.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/service/FormInput.vue?vue&type=script&lang=js&":
/*!********************************************************************************!*\
  !*** ./resources/js/components/service/FormInput.vue?vue&type=script&lang=js& ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FormInput_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./FormInput.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/service/FormInput.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FormInput_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/service/FormInput.vue?vue&type=template&id=a852ac9e&scoped=true&":
/*!**************************************************************************************************!*\
  !*** ./resources/js/components/service/FormInput.vue?vue&type=template&id=a852ac9e&scoped=true& ***!
  \**************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_FormInput_vue_vue_type_template_id_a852ac9e_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./FormInput.vue?vue&type=template&id=a852ac9e&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/service/FormInput.vue?vue&type=template&id=a852ac9e&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_FormInput_vue_vue_type_template_id_a852ac9e_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_FormInput_vue_vue_type_template_id_a852ac9e_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvc2VydmljZS9Gb3JtSW5wdXQudnVlIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9qcy9jb21wb25lbnRzL3NlcnZpY2UvRm9ybUlucHV0LnZ1ZT9jZTk1Iiwid2VicGFjazovLy8uL3Jlc291cmNlcy9qcy9jb21wb25lbnRzL3NlcnZpY2UvRm9ybUlucHV0LnZ1ZSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvY29tcG9uZW50cy9zZXJ2aWNlL0Zvcm1JbnB1dC52dWU/MDFkNiIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvY29tcG9uZW50cy9zZXJ2aWNlL0Zvcm1JbnB1dC52dWU/MWJhNyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBK0RBO0FBQ0Esc0JBREE7QUFFQSxtQkFGQTtBQUdBO0FBQ0E7QUFDQTtBQURBO0FBR0EsR0FQQTtBQVFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBLFNBTEE7QUFNQTtBQUNBLE9BWEE7QUFZQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUZBLE1BRUE7QUFDQTtBQUNBO0FBQ0EsU0FOQTtBQU9BO0FBdEJBLEtBREE7QUF5QkEsWUF6QkEsc0JBeUJBO0FBQ0E7QUFDQSxLQTNCQTtBQTRCQSxXQTVCQSxxQkE0QkE7QUFDQTtBQUNBLEtBOUJBO0FBK0JBLGNBL0JBLHdCQStCQTtBQUNBO0FBQ0EsS0FqQ0E7QUFrQ0EsY0FsQ0Esd0JBa0NBO0FBQ0E7QUFDQSxLQXBDQTtBQXFDQSxjQXJDQSx3QkFxQ0E7QUFDQTtBQUNBO0FBdkNBLEdBUkE7QUFpREEsU0FqREEscUJBaURBO0FBQUE7O0FBQ0E7QUFDQTtBQUNBLEtBRkEsRUFFQTtBQUNBO0FBREEsS0FGQTtB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QjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPLHFEQUFxRCxpQkFBaUIsRUFBRTtBQUMvRTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0I7QUFDeEIsU0FBUztBQUNUO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTyxxREFBcUQsaUJBQWlCLEVBQUU7QUFDL0U7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCO0FBQ3hCLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQ3ZSQTtBQUFBO0FBQUE7QUFBQTtBQUFvRztBQUN2QztBQUNMOzs7QUFHeEQ7QUFDZ0c7QUFDaEcsZ0JBQWdCLDJHQUFVO0FBQzFCLEVBQUUsK0VBQU07QUFDUixFQUFFLGdHQUFNO0FBQ1IsRUFBRSx5R0FBZTtBQUNqQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLElBQUksS0FBVSxFQUFFLFlBaUJmO0FBQ0Q7QUFDZSxnRjs7Ozs7Ozs7Ozs7O0FDdENmO0FBQUE7QUFBQSx3Q0FBK0wsQ0FBZ0IscVBBQUcsRUFBQyxDOzs7Ozs7Ozs7Ozs7QUNBbk47QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBIiwiZmlsZSI6ImNhdGVnb3J5RGlhbG9nfnByb2R1Y3REaWFsb2d+cHJvdmlkZXJPcmRlckRpYWxvZy5qcyIsInNvdXJjZXNDb250ZW50IjpbIjx0ZW1wbGF0ZT5cclxuICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+XHJcbiAgICAgICAgPGRpdiB2LWlmPVwiaXNJbnB1dFwiPlxyXG4gICAgICAgICAgICA8bGFiZWw+e3sgaW5wdXREYXRhLmxhYmVsIH19PC9sYWJlbD5cclxuICAgICAgICAgICAgPGRpdiB2LWlmPVwiJHBhcmVudC5sb2FkaW5nXCIgY2xhc3M9XCJsaXN0LXBsYWNlaG9sZGVyXCIgc3R5bGU9XCJoZWlnaHQ6IDMwcHg7XCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibGlzdC1wbGFjZWhvbGRlcl9pdGVtXCIgc3R5bGU9XCJoZWlnaHQ6IDMwcHg7XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImxpc3QtcGxhY2Vob2xkZXJfY2VsbCB3LTEwMFwiIHN0eWxlPVwid2lkdGg6IDEwMCVcIiA+PC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxpbnB1dCB2LWlmPVwiISRwYXJlbnQubG9hZGluZ1wiIEBrZXlwcmVzcy5lbnRlcj1cIiRwYXJlbnQuc2F2ZSgpXCJcclxuICAgICAgICAgICAgICAgICAgICB2LWJpbmQ6Y2xhc3M9XCJ7J2lzLWludmFsaWQnOmVycm9yTXNnfVwiXHJcbiAgICAgICAgICAgICAgICAgICAgdi10b29sdGlwPVwie1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBlcnJvck1zZyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2VtZW50OiAnbGVmdCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzZXM6IFsnZXJyb3InXSxcclxuICAgICAgICAgICAgICAgICAgICB9XCJcclxuICAgICAgICAgICAgICAgICAgICB2LW1vZGVsPVwicGFyZW50TW9kZWxcIlxyXG4gICAgICAgICAgICAgICAgICAgIHYtYmluZDpwbGFjZWhvbGRlcj1cImlucHV0RGF0YS5wbGFjZWhvbGRlclwiXHJcbiAgICAgICAgICAgICAgICAgICAgdi1iaW5kOmRpc2FibGVkPVwiaW5wdXREYXRhLmRpc2FibGVkXCJcclxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCI+XHJcbiAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgIDxkaXYgdi1pZj1cImlzVGV4dEFyZWFcIiBjbGFzcz1cImZvcm0tZ3JvdXBcIj5cclxuICAgICAgICAgICAgPGxhYmVsPnt7IGlucHV0RGF0YS5sYWJlbCB9fTwvbGFiZWw+XHJcbiAgICAgICAgICAgIDxkaXYgdi1pZj1cIiRwYXJlbnQubG9hZGluZ1wiIGNsYXNzPVwibGlzdC1wbGFjZWhvbGRlclwiICB2LWJpbmQ6c3R5bGU9XCJ7IGhlaWdodDogaW5wdXREYXRhLmhlaWdodCArICdweCcgfVwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImxpc3QtcGxhY2Vob2xkZXJfaXRlbVwiIHYtYmluZDpzdHlsZT1cInsgaGVpZ2h0OiBpbnB1dERhdGEuaGVpZ2h0ICsgJ3B4JyB9XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImxpc3QtcGxhY2Vob2xkZXJfY2VsbCB3LTEwMFwiIHN0eWxlPVwid2lkdGg6IDEwMCVcIiA+PC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDx0ZXh0YXJlYSB2LWlmPVwiISRwYXJlbnQubG9hZGluZ1wiIHBsYWNlaG9sZGVyPVwi0JrQvtC80LzQtdC90YLQsNGA0LjQuVwiIHYtYmluZDpzdHlsZT1cInsgaGVpZ2h0OiBpbnB1dERhdGEuaGVpZ2h0ICsgJ3B4JyB9XCIgc3R5bGU9XCJyZXNpemU6IG5vbmU7XCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBuYW1lPVwiY29tbWVudFwiIHYtbW9kZWw9XCJwYXJlbnRNb2RlbFwiID48L3RleHRhcmVhPlxyXG4gICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICA8ZGl2IHYtaWY9XCJpc1NlbGVjdG9yXCIgPlxyXG4gICAgICAgICAgICA8bGFiZWw+e3sgaW5wdXREYXRhLmxhYmVsIH19PC9sYWJlbD5cclxuICAgICAgICAgICAgPGRpdiB2LWlmPVwiJHBhcmVudC5sb2FkaW5nXCIgY2xhc3M9XCJsaXN0LXBsYWNlaG9sZGVyXCIgc3R5bGU9XCJoZWlnaHQ6IDMwcHg7XCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibGlzdC1wbGFjZWhvbGRlcl9pdGVtXCIgc3R5bGU9XCJoZWlnaHQ6IDMwcHg7XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImxpc3QtcGxhY2Vob2xkZXJfY2VsbCB3LTEwMFwiIHN0eWxlPVwid2lkdGg6IDEwMCVcIiA+PC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgdi1pZj1cIiEkcGFyZW50LmxvYWRpbmdcIiBjbGFzcz1cImlucHV0LWdyb3VwXCI+XHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICAgICAgdi1iaW5kOmNsYXNzPVwieydpcy1pbnZhbGlkJzplcnJvck1zZ31cIlxyXG4gICAgICAgICAgICAgICAgICAgIHYtdG9vbHRpcD1cIntcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogZXJyb3JNc2csXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlbWVudDogJ2xlZnQnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc2VzOiBbJ2Vycm9yJ10sXHJcbiAgICAgICAgICAgICAgICAgICAgfVwiXHJcbiAgICAgICAgICAgICAgICAgICAgdi1vbjpjbGljaz1cIiRwYXJlbnRbaW5wdXREYXRhLm9uQ2xpY2tdKClcIlxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzPVwiY2F0ZWdvcnlfc2VsZWN0IGZvcm0tY29udHJvbCB0ZXh0LWxlZnQgYnV0dG9uX3NlbGVjdFwiPnt7IHBhcmVudE1vZGVsIH19PC9idXR0b24+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgdi1pZj1cImlzQ2hlY2tib3hcIiBjbGFzcz1cInJlbGF0aXZlXCI+XHJcbiAgICAgICAgICAgIDxsYWJlbCB2LWJpbmQ6Zm9yPVwiaW5wdXREYXRhLm5hbWVcIiBjbGFzcz1cInctMTAwXCIgdi1iaW5kOmNsYXNzPVwieydtYi0wJyA6ICFpbnB1dERhdGEubWJ9XCI+e3sgaW5wdXREYXRhLmxhYmVsIH19PC9sYWJlbD5cclxuICAgICAgICAgICAgPGxhYmVsIGNsYXNzPVwiYWJzb2x1dGUgY3VzdG9tX2NoZWNrYm94XCIgc3R5bGU9XCJyaWdodDogMDsgdG9wOiAzcHg7XCI+XHJcbiAgICAgICAgICAgICAgICA8aW5wdXQgdi1iaW5kOmlkPVwiaW5wdXREYXRhLm5hbWVcIiB2LW1vZGVsPVwicGFyZW50TW9kZWxcIiB2LWJpbmQ6bmFtZT1cImlucHV0RGF0YS5uYW1lXCIgdHlwZT1cImNoZWNrYm94XCIgY2xhc3M9XCJub3RfZGVmYXVsdFwiLz5cclxuICAgICAgICAgICAgICAgIDxzcGFuPjwvc3Bhbj5cclxuICAgICAgICAgICAgPC9sYWJlbD5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG48L3RlbXBsYXRlPlxyXG5cclxuPHNjcmlwdD5cclxuICAgIGV4cG9ydCBkZWZhdWx0IHtcclxuICAgICAgICBwcm9wczpbJ2lucHV0RGF0YSddLFxyXG4gICAgICAgIG5hbWU6IFwiRm9ybUlucHV0XCIsXHJcbiAgICAgICAgZGF0YTogKCk9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBlcnJvcjpudWxsLFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb21wdXRlZDp7XHJcbiAgICAgICAgICAgIHBhcmVudE1vZGVsOntcclxuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBuYW1lX2FyciA9IHRoaXMuaW5wdXREYXRhLm5hbWUuc3BsaXQoJy4nKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdGFyZ2V0ID0gdGhpcy4kcGFyZW50O1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWVfYXJyLmZvckVhY2goKGl0ZW0sIGluZGV4KT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZighdGFyZ2V0W2l0ZW1dICYmIG5hbWVfYXJyW2luZGV4ICsgMV0pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0W2l0ZW1dID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0ID0gdGFyZ2V0W2l0ZW1dO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0YXJnZXQ7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5hbWVfYXJyID0gdGhpcy5pbnB1dERhdGEubmFtZS5zcGxpdCgnLicpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0YXJnZXQgPSB0aGlzLiRwYXJlbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZV9hcnIuZm9yRWFjaCgoaXRlbSwgaW5kZXgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKG5hbWVfYXJyW2luZGV4ICsgMV0pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0ID0gdGFyZ2V0W2l0ZW1dXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRbaXRlbV0gPSB2YWw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyb3JNc2coKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmVycm9yID8gdGhpcy5lcnJvciA6IGZhbHNlO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBpc0lucHV0KCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5pbnB1dERhdGEudHlwZSA9PT0gJ2lucHV0JztcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgaXNUZXh0QXJlYSgpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaW5wdXREYXRhLnR5cGUgPT09ICd0ZXh0YXJlYSc7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGlzU2VsZWN0b3IoKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmlucHV0RGF0YS50eXBlID09PSAnc2VsZWN0b3InO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBpc0NoZWNrYm94KCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5pbnB1dERhdGEudHlwZSA9PT0gJ2NoZWNrYm94JztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbW91bnRlZCgpe1xyXG4gICAgICAgICAgICB0aGlzLiR3YXRjaCgnJHBhcmVudC4nICsgdGhpcy5pbnB1dERhdGEubmFtZSwgKHZhbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lcnJvciA9IG51bGw7XHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIGRlZXA6IHRydWVcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9LFxyXG4gICAgICAgIHdhdGNoOiB7XHJcbiAgICAgICAgICAgIC8vICckcGFyZW50LmVudGl0eSc6e1xyXG4gICAgICAgICAgICAvLyAgICAgaGFuZGxlcihlbnRpdHkpe1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIHRoaXMuZXJyb3IgPSBudWxsO1xyXG4gICAgICAgICAgICAvLyAgICAgfSxcclxuICAgICAgICAgICAgLy8gICAgIGRlZXA6IHRydWVcclxuICAgICAgICAgICAgLy8gfSxcclxuICAgICAgICAgICAgJyRwYXJlbnQubWVzc2FnZXMnOmZ1bmN0aW9uIChtZXNzYWdlcyl7XHJcbiAgICAgICAgICAgICAgICBsZXQgbmFtZSA9IHRoaXMuZ2V0VGFyZ2V0TmFtZSgpO1xyXG4gICAgICAgICAgICAgICAgaWYobWVzc2FnZXNbbmFtZV0gfHwgbWVzc2FnZXNbbmFtZSArICdfaWQnXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBtZXNzYWdlID0gbWVzc2FnZXNbbmFtZV0gfHwgbWVzc2FnZXNbbmFtZSArICdfaWQnXTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEVycm9yKG1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbWV0aG9kczp7XHJcbiAgICAgICAgICAgIGdldFRhcmdldE5hbWUoKXtcclxuICAgICAgICAgICAgICAgIGxldCBuYW1lX2FyciA9IHRoaXMuaW5wdXREYXRhLm5hbWUuc3BsaXQoJy4nKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuYW1lX2Fyci5zbGljZSgtMSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNldEVycm9yKGVycm9yKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuZXJyb3IgPSBlcnJvcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICB9XHJcbjwvc2NyaXB0PlxyXG5cclxuPHN0eWxlIHNjb3BlZD5cclxuXHJcbjwvc3R5bGU+XHJcbjwhLS12LXZhbGlkYXRlPVwie25hbWU6J25hbWUnfVwiIHYtYmluZDpjbGFzcz1cInsnaXMtaW52YWxpZCcgOiBoYXNFcnJvcignbmFtZScpfVwiLS0+XHJcbiIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJmb3JtLWdyb3VwXCIgfSwgW1xuICAgIF92bS5pc0lucHV0XG4gICAgICA/IF9jKFwiZGl2XCIsIFtcbiAgICAgICAgICBfYyhcImxhYmVsXCIsIFtfdm0uX3YoX3ZtLl9zKF92bS5pbnB1dERhdGEubGFiZWwpKV0pLFxuICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgX3ZtLiRwYXJlbnQubG9hZGluZ1xuICAgICAgICAgICAgPyBfYyhcbiAgICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImxpc3QtcGxhY2Vob2xkZXJcIixcbiAgICAgICAgICAgICAgICAgIHN0YXRpY1N0eWxlOiB7IGhlaWdodDogXCIzMHB4XCIgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgW192bS5fbSgwKV1cbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgOiBfdm0uX2UoKSxcbiAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICFfdm0uJHBhcmVudC5sb2FkaW5nXG4gICAgICAgICAgICA/IF9jKFwiaW5wdXRcIiwge1xuICAgICAgICAgICAgICAgIGRpcmVjdGl2ZXM6IFtcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ0b29sdGlwXCIsXG4gICAgICAgICAgICAgICAgICAgIHJhd05hbWU6IFwidi10b29sdGlwXCIsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgY29udGVudDogX3ZtLmVycm9yTXNnLFxuICAgICAgICAgICAgICAgICAgICAgIHBsYWNlbWVudDogXCJsZWZ0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NlczogW1wiZXJyb3JcIl1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjpcbiAgICAgICAgICAgICAgICAgICAgICBcIntcXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IGVycm9yTXNnLFxcbiAgICAgICAgICAgICAgICAgICAgcGxhY2VtZW50OiAnbGVmdCcsXFxuICAgICAgICAgICAgICAgICAgICBjbGFzc2VzOiBbJ2Vycm9yJ10sXFxuICAgICAgICAgICAgICAgIH1cIlxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJtb2RlbFwiLFxuICAgICAgICAgICAgICAgICAgICByYXdOYW1lOiBcInYtbW9kZWxcIixcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IF92bS5wYXJlbnRNb2RlbCxcbiAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCJwYXJlbnRNb2RlbFwiXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJmb3JtLWNvbnRyb2xcIixcbiAgICAgICAgICAgICAgICBjbGFzczogeyBcImlzLWludmFsaWRcIjogX3ZtLmVycm9yTXNnIH0sXG4gICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBfdm0uaW5wdXREYXRhLnBsYWNlaG9sZGVyLFxuICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IF92bS5pbnB1dERhdGEuZGlzYWJsZWQsXG4gICAgICAgICAgICAgICAgICB0eXBlOiBcInRleHRcIlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZG9tUHJvcHM6IHsgdmFsdWU6IF92bS5wYXJlbnRNb2RlbCB9LFxuICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICBrZXlwcmVzczogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICAgICAhJGV2ZW50LnR5cGUuaW5kZXhPZihcImtleVwiKSAmJlxuICAgICAgICAgICAgICAgICAgICAgIF92bS5faygkZXZlbnQua2V5Q29kZSwgXCJlbnRlclwiLCAxMywgJGV2ZW50LmtleSwgXCJFbnRlclwiKVxuICAgICAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfdm0uJHBhcmVudC5zYXZlKClcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBpbnB1dDogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICgkZXZlbnQudGFyZ2V0LmNvbXBvc2luZykge1xuICAgICAgICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIF92bS5wYXJlbnRNb2RlbCA9ICRldmVudC50YXJnZXQudmFsdWVcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICA6IF92bS5fZSgpXG4gICAgICAgIF0pXG4gICAgICA6IF92bS5fZSgpLFxuICAgIF92bS5fdihcIiBcIiksXG4gICAgX3ZtLmlzVGV4dEFyZWFcbiAgICAgID8gX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJmb3JtLWdyb3VwXCIgfSwgW1xuICAgICAgICAgIF9jKFwibGFiZWxcIiwgW192bS5fdihfdm0uX3MoX3ZtLmlucHV0RGF0YS5sYWJlbCkpXSksXG4gICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICBfdm0uJHBhcmVudC5sb2FkaW5nXG4gICAgICAgICAgICA/IF9jKFxuICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwibGlzdC1wbGFjZWhvbGRlclwiLFxuICAgICAgICAgICAgICAgICAgc3R5bGU6IHsgaGVpZ2h0OiBfdm0uaW5wdXREYXRhLmhlaWdodCArIFwicHhcIiB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImxpc3QtcGxhY2Vob2xkZXJfaXRlbVwiLFxuICAgICAgICAgICAgICAgICAgICAgIHN0eWxlOiB7IGhlaWdodDogX3ZtLmlucHV0RGF0YS5oZWlnaHQgKyBcInB4XCIgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgX2MoXCJkaXZcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwibGlzdC1wbGFjZWhvbGRlcl9jZWxsIHctMTAwXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNTdHlsZTogeyB3aWR0aDogXCIxMDAlXCIgfVxuICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIDogX3ZtLl9lKCksXG4gICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAhX3ZtLiRwYXJlbnQubG9hZGluZ1xuICAgICAgICAgICAgPyBfYyhcInRleHRhcmVhXCIsIHtcbiAgICAgICAgICAgICAgICBkaXJlY3RpdmVzOiBbXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibW9kZWxcIixcbiAgICAgICAgICAgICAgICAgICAgcmF3TmFtZTogXCJ2LW1vZGVsXCIsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBfdm0ucGFyZW50TW9kZWwsXG4gICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwicGFyZW50TW9kZWxcIlxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiZm9ybS1jb250cm9sXCIsXG4gICAgICAgICAgICAgICAgc3RhdGljU3R5bGU6IHsgcmVzaXplOiBcIm5vbmVcIiB9LFxuICAgICAgICAgICAgICAgIHN0eWxlOiB7IGhlaWdodDogX3ZtLmlucHV0RGF0YS5oZWlnaHQgKyBcInB4XCIgfSxcbiAgICAgICAgICAgICAgICBhdHRyczogeyBwbGFjZWhvbGRlcjogXCLQmtC+0LzQvNC10L3RgtCw0YDQuNC5XCIsIG5hbWU6IFwiY29tbWVudFwiIH0sXG4gICAgICAgICAgICAgICAgZG9tUHJvcHM6IHsgdmFsdWU6IF92bS5wYXJlbnRNb2RlbCB9LFxuICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICBpbnB1dDogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICgkZXZlbnQudGFyZ2V0LmNvbXBvc2luZykge1xuICAgICAgICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIF92bS5wYXJlbnRNb2RlbCA9ICRldmVudC50YXJnZXQudmFsdWVcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICA6IF92bS5fZSgpXG4gICAgICAgIF0pXG4gICAgICA6IF92bS5fZSgpLFxuICAgIF92bS5fdihcIiBcIiksXG4gICAgX3ZtLmlzU2VsZWN0b3JcbiAgICAgID8gX2MoXCJkaXZcIiwgW1xuICAgICAgICAgIF9jKFwibGFiZWxcIiwgW192bS5fdihfdm0uX3MoX3ZtLmlucHV0RGF0YS5sYWJlbCkpXSksXG4gICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICBfdm0uJHBhcmVudC5sb2FkaW5nXG4gICAgICAgICAgICA/IF9jKFxuICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwibGlzdC1wbGFjZWhvbGRlclwiLFxuICAgICAgICAgICAgICAgICAgc3RhdGljU3R5bGU6IHsgaGVpZ2h0OiBcIjMwcHhcIiB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBbX3ZtLl9tKDEpXVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICA6IF92bS5fZSgpLFxuICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgIV92bS4kcGFyZW50LmxvYWRpbmdcbiAgICAgICAgICAgID8gX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJpbnB1dC1ncm91cFwiIH0sIFtcbiAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgIFwiYnV0dG9uXCIsXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGRpcmVjdGl2ZXM6IFtcbiAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInRvb2x0aXBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhd05hbWU6IFwidi10b29sdGlwXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBfdm0uZXJyb3JNc2csXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlbWVudDogXCJsZWZ0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzZXM6IFtcImVycm9yXCJdXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ7XFxuICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBlcnJvck1zZyxcXG4gICAgICAgICAgICAgICAgICAgIHBsYWNlbWVudDogJ2xlZnQnLFxcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NlczogWydlcnJvciddLFxcbiAgICAgICAgICAgICAgICB9XCJcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOlxuICAgICAgICAgICAgICAgICAgICAgIFwiY2F0ZWdvcnlfc2VsZWN0IGZvcm0tY29udHJvbCB0ZXh0LWxlZnQgYnV0dG9uX3NlbGVjdFwiLFxuICAgICAgICAgICAgICAgICAgICBjbGFzczogeyBcImlzLWludmFsaWRcIjogX3ZtLmVycm9yTXNnIH0sXG4gICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IHR5cGU6IFwiYnV0dG9uXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfdm0uJHBhcmVudFtfdm0uaW5wdXREYXRhLm9uQ2xpY2tdKClcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBbX3ZtLl92KF92bS5fcyhfdm0ucGFyZW50TW9kZWwpKV1cbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICA6IF92bS5fZSgpXG4gICAgICAgIF0pXG4gICAgICA6IF92bS5fZSgpLFxuICAgIF92bS5fdihcIiBcIiksXG4gICAgX3ZtLmlzQ2hlY2tib3hcbiAgICAgID8gX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJyZWxhdGl2ZVwiIH0sIFtcbiAgICAgICAgICBfYyhcbiAgICAgICAgICAgIFwibGFiZWxcIixcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwidy0xMDBcIixcbiAgICAgICAgICAgICAgY2xhc3M6IHsgXCJtYi0wXCI6ICFfdm0uaW5wdXREYXRhLm1iIH0sXG4gICAgICAgICAgICAgIGF0dHJzOiB7IGZvcjogX3ZtLmlucHV0RGF0YS5uYW1lIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBbX3ZtLl92KF92bS5fcyhfdm0uaW5wdXREYXRhLmxhYmVsKSldXG4gICAgICAgICAgKSxcbiAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgIF9jKFxuICAgICAgICAgICAgXCJsYWJlbFwiLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJhYnNvbHV0ZSBjdXN0b21fY2hlY2tib3hcIixcbiAgICAgICAgICAgICAgc3RhdGljU3R5bGU6IHsgcmlnaHQ6IFwiMFwiLCB0b3A6IFwiM3B4XCIgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgX2MoXCJpbnB1dFwiLCB7XG4gICAgICAgICAgICAgICAgZGlyZWN0aXZlczogW1xuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm1vZGVsXCIsXG4gICAgICAgICAgICAgICAgICAgIHJhd05hbWU6IFwidi1tb2RlbFwiLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogX3ZtLnBhcmVudE1vZGVsLFxuICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcInBhcmVudE1vZGVsXCJcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcIm5vdF9kZWZhdWx0XCIsXG4gICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgIGlkOiBfdm0uaW5wdXREYXRhLm5hbWUsXG4gICAgICAgICAgICAgICAgICBuYW1lOiBfdm0uaW5wdXREYXRhLm5hbWUsXG4gICAgICAgICAgICAgICAgICB0eXBlOiBcImNoZWNrYm94XCJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGRvbVByb3BzOiB7XG4gICAgICAgICAgICAgICAgICBjaGVja2VkOiBBcnJheS5pc0FycmF5KF92bS5wYXJlbnRNb2RlbClcbiAgICAgICAgICAgICAgICAgICAgPyBfdm0uX2koX3ZtLnBhcmVudE1vZGVsLCBudWxsKSA+IC0xXG4gICAgICAgICAgICAgICAgICAgIDogX3ZtLnBhcmVudE1vZGVsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyICQkYSA9IF92bS5wYXJlbnRNb2RlbCxcbiAgICAgICAgICAgICAgICAgICAgICAkJGVsID0gJGV2ZW50LnRhcmdldCxcbiAgICAgICAgICAgICAgICAgICAgICAkJGMgPSAkJGVsLmNoZWNrZWQgPyB0cnVlIDogZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoJCRhKSkge1xuICAgICAgICAgICAgICAgICAgICAgIHZhciAkJHYgPSBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgJCRpID0gX3ZtLl9pKCQkYSwgJCR2KVxuICAgICAgICAgICAgICAgICAgICAgIGlmICgkJGVsLmNoZWNrZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICQkaSA8IDAgJiYgKF92bS5wYXJlbnRNb2RlbCA9ICQkYS5jb25jYXQoWyQkdl0pKVxuICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkJGkgPiAtMSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAoX3ZtLnBhcmVudE1vZGVsID0gJCRhXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnNsaWNlKDAsICQkaSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY29uY2F0KCQkYS5zbGljZSgkJGkgKyAxKSkpXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgIF92bS5wYXJlbnRNb2RlbCA9ICQkY1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgX2MoXCJzcGFuXCIpXG4gICAgICAgICAgICBdXG4gICAgICAgICAgKVxuICAgICAgICBdKVxuICAgICAgOiBfdm0uX2UoKVxuICBdKVxufVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtcbiAgZnVuY3Rpb24oKSB7XG4gICAgdmFyIF92bSA9IHRoaXNcbiAgICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgICByZXR1cm4gX2MoXG4gICAgICBcImRpdlwiLFxuICAgICAgeyBzdGF0aWNDbGFzczogXCJsaXN0LXBsYWNlaG9sZGVyX2l0ZW1cIiwgc3RhdGljU3R5bGU6IHsgaGVpZ2h0OiBcIjMwcHhcIiB9IH0sXG4gICAgICBbXG4gICAgICAgIF9jKFwiZGl2XCIsIHtcbiAgICAgICAgICBzdGF0aWNDbGFzczogXCJsaXN0LXBsYWNlaG9sZGVyX2NlbGwgdy0xMDBcIixcbiAgICAgICAgICBzdGF0aWNTdHlsZTogeyB3aWR0aDogXCIxMDAlXCIgfVxuICAgICAgICB9KVxuICAgICAgXVxuICAgIClcbiAgfSxcbiAgZnVuY3Rpb24oKSB7XG4gICAgdmFyIF92bSA9IHRoaXNcbiAgICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgICByZXR1cm4gX2MoXG4gICAgICBcImRpdlwiLFxuICAgICAgeyBzdGF0aWNDbGFzczogXCJsaXN0LXBsYWNlaG9sZGVyX2l0ZW1cIiwgc3RhdGljU3R5bGU6IHsgaGVpZ2h0OiBcIjMwcHhcIiB9IH0sXG4gICAgICBbXG4gICAgICAgIF9jKFwiZGl2XCIsIHtcbiAgICAgICAgICBzdGF0aWNDbGFzczogXCJsaXN0LXBsYWNlaG9sZGVyX2NlbGwgdy0xMDBcIixcbiAgICAgICAgICBzdGF0aWNTdHlsZTogeyB3aWR0aDogXCIxMDAlXCIgfVxuICAgICAgICB9KVxuICAgICAgXVxuICAgIClcbiAgfVxuXVxucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5cbmV4cG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0iLCJpbXBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IGZyb20gXCIuL0Zvcm1JbnB1dC52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9YTg1MmFjOWUmc2NvcGVkPXRydWUmXCJcbmltcG9ydCBzY3JpcHQgZnJvbSBcIi4vRm9ybUlucHV0LnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuZXhwb3J0ICogZnJvbSBcIi4vRm9ybUlucHV0LnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuXG5cbi8qIG5vcm1hbGl6ZSBjb21wb25lbnQgKi9cbmltcG9ydCBub3JtYWxpemVyIGZyb20gXCIhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3J1bnRpbWUvY29tcG9uZW50Tm9ybWFsaXplci5qc1wiXG52YXIgY29tcG9uZW50ID0gbm9ybWFsaXplcihcbiAgc2NyaXB0LFxuICByZW5kZXIsXG4gIHN0YXRpY1JlbmRlckZucyxcbiAgZmFsc2UsXG4gIG51bGwsXG4gIFwiYTg1MmFjOWVcIixcbiAgbnVsbFxuICBcbilcblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHtcbiAgdmFyIGFwaSA9IHJlcXVpcmUoXCJDOlxcXFxPcGVuU2VydmVyXFxcXGRvbWFpbnNcXFxcQXV0b0NSTVxcXFxub2RlX21vZHVsZXNcXFxcdnVlLWhvdC1yZWxvYWQtYXBpXFxcXGRpc3RcXFxcaW5kZXguanNcIilcbiAgYXBpLmluc3RhbGwocmVxdWlyZSgndnVlJykpXG4gIGlmIChhcGkuY29tcGF0aWJsZSkge1xuICAgIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgICBpZiAoIWFwaS5pc1JlY29yZGVkKCdhODUyYWM5ZScpKSB7XG4gICAgICBhcGkuY3JlYXRlUmVjb3JkKCdhODUyYWM5ZScsIGNvbXBvbmVudC5vcHRpb25zKVxuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVsb2FkKCdhODUyYWM5ZScsIGNvbXBvbmVudC5vcHRpb25zKVxuICAgIH1cbiAgICBtb2R1bGUuaG90LmFjY2VwdChcIi4vRm9ybUlucHV0LnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD1hODUyYWM5ZSZzY29wZWQ9dHJ1ZSZcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgYXBpLnJlcmVuZGVyKCdhODUyYWM5ZScsIHtcbiAgICAgICAgcmVuZGVyOiByZW5kZXIsXG4gICAgICAgIHN0YXRpY1JlbmRlckZuczogc3RhdGljUmVuZGVyRm5zXG4gICAgICB9KVxuICAgIH0pXG4gIH1cbn1cbmNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwicmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvc2VydmljZS9Gb3JtSW5wdXQudnVlXCJcbmV4cG9ydCBkZWZhdWx0IGNvbXBvbmVudC5leHBvcnRzIiwiaW1wb3J0IG1vZCBmcm9tIFwiLSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS00LTAhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9Gb3JtSW5wdXQudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiOyBleHBvcnQgZGVmYXVsdCBtb2Q7IGV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTQtMCEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0Zvcm1JbnB1dC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCIiLCJleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy90ZW1wbGF0ZUxvYWRlci5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vRm9ybUlucHV0LnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD1hODUyYWM5ZSZzY29wZWQ9dHJ1ZSZcIiJdLCJzb3VyY2VSb290IjoiIn0=