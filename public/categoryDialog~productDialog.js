(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["categoryDialog~productDialog"],{

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
    !_vm.$parent.loading && _vm.isInput
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
          _c("input", {
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
            attrs: { placeholder: _vm.inputData.placeholder, type: "text" },
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
        ])
      : _vm._e(),
    _vm._v(" "),
    !_vm.$parent.loading && _vm.isSelector
      ? _c("div", [
          _c("label", [_vm._v(_vm._s(_vm.inputData.label))]),
          _vm._v(" "),
          _c("div", { staticClass: "input-group" }, [
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
        ])
      : _vm._e(),
    _vm._v(" "),
    !_vm.$parent.loading && _vm.isCheckbox
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvc2VydmljZS9Gb3JtSW5wdXQudnVlIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9qcy9jb21wb25lbnRzL3NlcnZpY2UvRm9ybUlucHV0LnZ1ZT9jZTk1Iiwid2VicGFjazovLy8uL3Jlc291cmNlcy9qcy9jb21wb25lbnRzL3NlcnZpY2UvRm9ybUlucHV0LnZ1ZSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvY29tcG9uZW50cy9zZXJ2aWNlL0Zvcm1JbnB1dC52dWU/MDFkNiIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvY29tcG9uZW50cy9zZXJ2aWNlL0Zvcm1JbnB1dC52dWU/MWJhNyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBZ0RBO0FBQ0Esc0JBREE7QUFFQSxtQkFGQTtBQUdBO0FBQ0E7QUFDQTtBQURBO0FBR0EsR0FQQTtBQVFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBLFNBTEE7QUFNQTtBQUNBLE9BWEE7QUFZQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUZBLE1BRUE7QUFDQTtBQUNBO0FBQ0EsU0FOQTtBQU9BO0FBdEJBLEtBREE7QUF5QkEsWUF6QkEsc0JBeUJBO0FBQ0E7QUFDQSxLQTNCQTtBQTRCQSxXQTVCQSxxQkE0QkE7QUFDQTtBQUNBLEtBOUJBO0FBK0JBLGNBL0JBLHdCQStCQTtBQUNBO0FBQ0EsS0FqQ0E7QUFrQ0EsY0FsQ0Esd0JBa0NBO0FBQ0E7QUFDQTtBQXBDQSxHQVJBO0FBOENBLFNBOUNBLHFCQThDQTtBQUFBOztBQUNBO0FBQ0E7QUFDQSxLQUZBLEVBRUE7QUFDQTtBQURBLEtBRkE7QUFLQSxHQXBEQTtBQXFEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQWJBLEdBckRBO0FBb0VBO0FBQ0EsaUJBREEsMkJBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FKQTtBQUtBLFlBTEEsb0JBS0EsS0FMQSxFQUtBO0FBQ0E7QUFDQTtBQVBBO0FBcEVBLEc7Ozs7Ozs7Ozs7OztBQ2hEQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQiw0QkFBNEI7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDO0FBQ2hDLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLG9CQUFvQiw0SUFBNEk7QUFDaEssZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsNkJBQTZCO0FBQ2pELG9CQUFvQix1REFBdUQ7QUFDM0UsdUJBQXVCLHlCQUF5QjtBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsNkJBQTZCO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQSx3QkFBd0IsNElBQTRJO0FBQ3BLO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLDZCQUE2QjtBQUNyRCx3QkFBd0IsaUJBQWlCO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsMEJBQTBCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLDRCQUE0QjtBQUNsRCxzQkFBc0I7QUFDdEIsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCO0FBQzVCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUI7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPLHFEQUFxRCxpQkFBaUIsRUFBRTtBQUMvRTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0I7QUFDeEIsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDNUxBO0FBQUE7QUFBQTtBQUFBO0FBQW9HO0FBQ3ZDO0FBQ0w7OztBQUd4RDtBQUNnRztBQUNoRyxnQkFBZ0IsMkdBQVU7QUFDMUIsRUFBRSwrRUFBTTtBQUNSLEVBQUUsZ0dBQU07QUFDUixFQUFFLHlHQUFlO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsSUFBSSxLQUFVLEVBQUUsWUFpQmY7QUFDRDtBQUNlLGdGOzs7Ozs7Ozs7Ozs7QUN0Q2Y7QUFBQTtBQUFBLHdDQUErTCxDQUFnQixxUEFBRyxFQUFDLEM7Ozs7Ozs7Ozs7OztBQ0FuTjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEiLCJmaWxlIjoiY2F0ZWdvcnlEaWFsb2d+cHJvZHVjdERpYWxvZy5qcyIsInNvdXJjZXNDb250ZW50IjpbIjx0ZW1wbGF0ZT5cbiAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPlxuICAgICAgICA8ZGl2IHYtaWY9XCIhJHBhcmVudC5sb2FkaW5nICYmIGlzSW5wdXRcIj5cbiAgICAgICAgICAgIDxsYWJlbD57eyBpbnB1dERhdGEubGFiZWwgfX08L2xhYmVsPlxuICAgICAgICAgICAgPGRpdiB2LWlmPVwiJHBhcmVudC5sb2FkaW5nXCIgY2xhc3M9XCJsaXN0LXBsYWNlaG9sZGVyXCIgc3R5bGU9XCJoZWlnaHQ6IDMwcHg7XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImxpc3QtcGxhY2Vob2xkZXJfaXRlbVwiIHN0eWxlPVwiaGVpZ2h0OiAzMHB4O1wiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibGlzdC1wbGFjZWhvbGRlcl9jZWxsIHctMTAwXCIgc3R5bGU9XCJ3aWR0aDogMTAwJVwiID48L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGlucHV0ICBAa2V5cHJlc3MuZW50ZXI9XCIkcGFyZW50LnNhdmUoKVwiXG4gICAgICAgICAgICAgICAgICAgIHYtYmluZDpjbGFzcz1cInsnaXMtaW52YWxpZCc6ZXJyb3JNc2d9XCJcbiAgICAgICAgICAgICAgICAgICAgdi10b29sdGlwPVwie1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogZXJyb3JNc2csXG4gICAgICAgICAgICAgICAgICAgICAgICBwbGFjZW1lbnQ6ICdsZWZ0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzZXM6IFsnZXJyb3InXSxcbiAgICAgICAgICAgICAgICAgICAgfVwiXG4gICAgICAgICAgICAgICAgICAgIHYtbW9kZWw9XCJwYXJlbnRNb2RlbFwiXG4gICAgICAgICAgICAgICAgICAgIHYtYmluZDpwbGFjZWhvbGRlcj1cImlucHV0RGF0YS5wbGFjZWhvbGRlclwiXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIj5cbiAgICAgICAgPC9kaXY+XG5cblxuICAgICAgICA8ZGl2IHYtaWY9XCIhJHBhcmVudC5sb2FkaW5nICYmIGlzU2VsZWN0b3JcIiA+XG4gICAgICAgICAgICA8bGFiZWw+e3sgaW5wdXREYXRhLmxhYmVsIH19PC9sYWJlbD5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cFwiPlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgdi1iaW5kOmNsYXNzPVwieydpcy1pbnZhbGlkJzplcnJvck1zZ31cIlxuICAgICAgICAgICAgICAgICAgICB2LXRvb2x0aXA9XCJ7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBlcnJvck1zZyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlbWVudDogJ2xlZnQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NlczogWydlcnJvciddLFxuICAgICAgICAgICAgICAgICAgICB9XCJcbiAgICAgICAgICAgICAgICAgICAgdi1vbjpjbGljaz1cIiRwYXJlbnRbaW5wdXREYXRhLm9uQ2xpY2tdKClcIlxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJjYXRlZ29yeV9zZWxlY3QgZm9ybS1jb250cm9sIHRleHQtbGVmdCBidXR0b25fc2VsZWN0XCI+e3sgcGFyZW50TW9kZWwgfX08L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiB2LWlmPVwiISRwYXJlbnQubG9hZGluZyAmJiBpc0NoZWNrYm94XCIgY2xhc3M9XCJyZWxhdGl2ZVwiPlxuICAgICAgICAgICAgPGxhYmVsIHYtYmluZDpmb3I9XCJpbnB1dERhdGEubmFtZVwiIGNsYXNzPVwidy0xMDBcIiB2LWJpbmQ6Y2xhc3M9XCJ7J21iLTAnIDogIWlucHV0RGF0YS5tYn1cIj57eyBpbnB1dERhdGEubGFiZWwgfX08L2xhYmVsPlxuICAgICAgICAgICAgPGxhYmVsIGNsYXNzPVwiYWJzb2x1dGUgY3VzdG9tX2NoZWNrYm94XCIgc3R5bGU9XCJyaWdodDogMDsgdG9wOiAzcHg7XCI+XG4gICAgICAgICAgICAgICAgPGlucHV0IHYtYmluZDppZD1cImlucHV0RGF0YS5uYW1lXCIgdi1tb2RlbD1cInBhcmVudE1vZGVsXCIgdi1iaW5kOm5hbWU9XCJpbnB1dERhdGEubmFtZVwiIHR5cGU9XCJjaGVja2JveFwiIGNsYXNzPVwibm90X2RlZmF1bHRcIi8+XG4gICAgICAgICAgICAgICAgPHNwYW4+PC9zcGFuPlxuICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuICAgIGV4cG9ydCBkZWZhdWx0IHtcbiAgICAgICAgcHJvcHM6WydpbnB1dERhdGEnXSxcbiAgICAgICAgbmFtZTogXCJGb3JtSW5wdXRcIixcbiAgICAgICAgZGF0YTogKCk9PiB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGVycm9yOm51bGwsXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGNvbXB1dGVkOntcbiAgICAgICAgICAgIHBhcmVudE1vZGVsOntcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5hbWVfYXJyID0gdGhpcy5pbnB1dERhdGEubmFtZS5zcGxpdCgnLicpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgdGFyZ2V0ID0gdGhpcy4kcGFyZW50O1xuICAgICAgICAgICAgICAgICAgICBuYW1lX2Fyci5mb3JFYWNoKChpdGVtLCBpbmRleCk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKCF0YXJnZXRbaXRlbV0gJiYgbmFtZV9hcnJbaW5kZXggKyAxXSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0W2l0ZW1dID0ge307XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQgPSB0YXJnZXRbaXRlbV07XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGFyZ2V0O1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBuYW1lX2FyciA9IHRoaXMuaW5wdXREYXRhLm5hbWUuc3BsaXQoJy4nKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRhcmdldCA9IHRoaXMuJHBhcmVudDtcbiAgICAgICAgICAgICAgICAgICAgbmFtZV9hcnIuZm9yRWFjaCgoaXRlbSwgaW5kZXgpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihuYW1lX2FycltpbmRleCArIDFdKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQgPSB0YXJnZXRbaXRlbV1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0W2l0ZW1dID0gdmFsO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3JNc2coKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5lcnJvciA/IHRoaXMuZXJyb3IgOiBmYWxzZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpc0lucHV0KCl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaW5wdXREYXRhLnR5cGUgPT09ICdpbnB1dCc7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaXNTZWxlY3Rvcigpe1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmlucHV0RGF0YS50eXBlID09PSAnc2VsZWN0b3InO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGlzQ2hlY2tib3goKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5pbnB1dERhdGEudHlwZSA9PT0gJ2NoZWNrYm94JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgbW91bnRlZCgpe1xuICAgICAgICAgICAgdGhpcy4kd2F0Y2goJyRwYXJlbnQuJyArIHRoaXMuaW5wdXREYXRhLm5hbWUsICh2YWwpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmVycm9yID0gbnVsbDtcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBkZWVwOiB0cnVlXG4gICAgICAgICAgICB9KVxuICAgICAgICB9LFxuICAgICAgICB3YXRjaDoge1xuICAgICAgICAgICAgLy8gJyRwYXJlbnQuZW50aXR5Jzp7XG4gICAgICAgICAgICAvLyAgICAgaGFuZGxlcihlbnRpdHkpe1xuICAgICAgICAgICAgLy8gICAgICAgICB0aGlzLmVycm9yID0gbnVsbDtcbiAgICAgICAgICAgIC8vICAgICB9LFxuICAgICAgICAgICAgLy8gICAgIGRlZXA6IHRydWVcbiAgICAgICAgICAgIC8vIH0sXG4gICAgICAgICAgICAnJHBhcmVudC5tZXNzYWdlcyc6ZnVuY3Rpb24gKG1lc3NhZ2VzKXtcbiAgICAgICAgICAgICAgICBsZXQgbmFtZSA9IHRoaXMuZ2V0VGFyZ2V0TmFtZSgpO1xuICAgICAgICAgICAgICAgIGlmKG1lc3NhZ2VzW25hbWVdIHx8IG1lc3NhZ2VzW25hbWUgKyAnX2lkJ10pIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG1lc3NhZ2UgPSBtZXNzYWdlc1tuYW1lXSB8fCBtZXNzYWdlc1tuYW1lICsgJ19pZCddO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEVycm9yKG1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIG1ldGhvZHM6e1xuICAgICAgICAgICAgZ2V0VGFyZ2V0TmFtZSgpe1xuICAgICAgICAgICAgICAgIGxldCBuYW1lX2FyciA9IHRoaXMuaW5wdXREYXRhLm5hbWUuc3BsaXQoJy4nKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmFtZV9hcnIuc2xpY2UoLTEpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldEVycm9yKGVycm9yKXtcbiAgICAgICAgICAgICAgICB0aGlzLmVycm9yID0gZXJyb3I7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgfVxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG48IS0tdi12YWxpZGF0ZT1cIntuYW1lOiduYW1lJ31cIiB2LWJpbmQ6Y2xhc3M9XCJ7J2lzLWludmFsaWQnIDogaGFzRXJyb3IoJ25hbWUnKX1cIi0tPlxuIiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgX3ZtID0gdGhpc1xuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gIHJldHVybiBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImZvcm0tZ3JvdXBcIiB9LCBbXG4gICAgIV92bS4kcGFyZW50LmxvYWRpbmcgJiYgX3ZtLmlzSW5wdXRcbiAgICAgID8gX2MoXCJkaXZcIiwgW1xuICAgICAgICAgIF9jKFwibGFiZWxcIiwgW192bS5fdihfdm0uX3MoX3ZtLmlucHV0RGF0YS5sYWJlbCkpXSksXG4gICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICBfdm0uJHBhcmVudC5sb2FkaW5nXG4gICAgICAgICAgICA/IF9jKFxuICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwibGlzdC1wbGFjZWhvbGRlclwiLFxuICAgICAgICAgICAgICAgICAgc3RhdGljU3R5bGU6IHsgaGVpZ2h0OiBcIjMwcHhcIiB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBbX3ZtLl9tKDApXVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICA6IF92bS5fZSgpLFxuICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgX2MoXCJpbnB1dFwiLCB7XG4gICAgICAgICAgICBkaXJlY3RpdmVzOiBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBuYW1lOiBcInRvb2x0aXBcIixcbiAgICAgICAgICAgICAgICByYXdOYW1lOiBcInYtdG9vbHRpcFwiLFxuICAgICAgICAgICAgICAgIHZhbHVlOiB7XG4gICAgICAgICAgICAgICAgICBjb250ZW50OiBfdm0uZXJyb3JNc2csXG4gICAgICAgICAgICAgICAgICBwbGFjZW1lbnQ6IFwibGVmdFwiLFxuICAgICAgICAgICAgICAgICAgY2xhc3NlczogW1wiZXJyb3JcIl1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGV4cHJlc3Npb246XG4gICAgICAgICAgICAgICAgICBcIntcXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IGVycm9yTXNnLFxcbiAgICAgICAgICAgICAgICAgICAgcGxhY2VtZW50OiAnbGVmdCcsXFxuICAgICAgICAgICAgICAgICAgICBjbGFzc2VzOiBbJ2Vycm9yJ10sXFxuICAgICAgICAgICAgICAgIH1cIlxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbmFtZTogXCJtb2RlbFwiLFxuICAgICAgICAgICAgICAgIHJhd05hbWU6IFwidi1tb2RlbFwiLFxuICAgICAgICAgICAgICAgIHZhbHVlOiBfdm0ucGFyZW50TW9kZWwsXG4gICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCJwYXJlbnRNb2RlbFwiXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBzdGF0aWNDbGFzczogXCJmb3JtLWNvbnRyb2xcIixcbiAgICAgICAgICAgIGNsYXNzOiB7IFwiaXMtaW52YWxpZFwiOiBfdm0uZXJyb3JNc2cgfSxcbiAgICAgICAgICAgIGF0dHJzOiB7IHBsYWNlaG9sZGVyOiBfdm0uaW5wdXREYXRhLnBsYWNlaG9sZGVyLCB0eXBlOiBcInRleHRcIiB9LFxuICAgICAgICAgICAgZG9tUHJvcHM6IHsgdmFsdWU6IF92bS5wYXJlbnRNb2RlbCB9LFxuICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAga2V5cHJlc3M6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICEkZXZlbnQudHlwZS5pbmRleE9mKFwia2V5XCIpICYmXG4gICAgICAgICAgICAgICAgICBfdm0uX2soJGV2ZW50LmtleUNvZGUsIFwiZW50ZXJcIiwgMTMsICRldmVudC5rZXksIFwiRW50ZXJcIilcbiAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBfdm0uJHBhcmVudC5zYXZlKClcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgaW5wdXQ6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgIGlmICgkZXZlbnQudGFyZ2V0LmNvbXBvc2luZykge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF92bS5wYXJlbnRNb2RlbCA9ICRldmVudC50YXJnZXQudmFsdWVcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgIF0pXG4gICAgICA6IF92bS5fZSgpLFxuICAgIF92bS5fdihcIiBcIiksXG4gICAgIV92bS4kcGFyZW50LmxvYWRpbmcgJiYgX3ZtLmlzU2VsZWN0b3JcbiAgICAgID8gX2MoXCJkaXZcIiwgW1xuICAgICAgICAgIF9jKFwibGFiZWxcIiwgW192bS5fdihfdm0uX3MoX3ZtLmlucHV0RGF0YS5sYWJlbCkpXSksXG4gICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImlucHV0LWdyb3VwXCIgfSwgW1xuICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgIFwiYnV0dG9uXCIsXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBkaXJlY3RpdmVzOiBbXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidG9vbHRpcFwiLFxuICAgICAgICAgICAgICAgICAgICByYXdOYW1lOiBcInYtdG9vbHRpcFwiLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZToge1xuICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IF92bS5lcnJvck1zZyxcbiAgICAgICAgICAgICAgICAgICAgICBwbGFjZW1lbnQ6IFwibGVmdFwiLFxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzZXM6IFtcImVycm9yXCJdXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246XG4gICAgICAgICAgICAgICAgICAgICAgXCJ7XFxuICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBlcnJvck1zZyxcXG4gICAgICAgICAgICAgICAgICAgIHBsYWNlbWVudDogJ2xlZnQnLFxcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NlczogWydlcnJvciddLFxcbiAgICAgICAgICAgICAgICB9XCJcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOlxuICAgICAgICAgICAgICAgICAgXCJjYXRlZ29yeV9zZWxlY3QgZm9ybS1jb250cm9sIHRleHQtbGVmdCBidXR0b25fc2VsZWN0XCIsXG4gICAgICAgICAgICAgICAgY2xhc3M6IHsgXCJpcy1pbnZhbGlkXCI6IF92bS5lcnJvck1zZyB9LFxuICAgICAgICAgICAgICAgIGF0dHJzOiB7IHR5cGU6IFwiYnV0dG9uXCIgfSxcbiAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICBfdm0uJHBhcmVudFtfdm0uaW5wdXREYXRhLm9uQ2xpY2tdKClcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIFtfdm0uX3YoX3ZtLl9zKF92bS5wYXJlbnRNb2RlbCkpXVxuICAgICAgICAgICAgKVxuICAgICAgICAgIF0pXG4gICAgICAgIF0pXG4gICAgICA6IF92bS5fZSgpLFxuICAgIF92bS5fdihcIiBcIiksXG4gICAgIV92bS4kcGFyZW50LmxvYWRpbmcgJiYgX3ZtLmlzQ2hlY2tib3hcbiAgICAgID8gX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJyZWxhdGl2ZVwiIH0sIFtcbiAgICAgICAgICBfYyhcbiAgICAgICAgICAgIFwibGFiZWxcIixcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwidy0xMDBcIixcbiAgICAgICAgICAgICAgY2xhc3M6IHsgXCJtYi0wXCI6ICFfdm0uaW5wdXREYXRhLm1iIH0sXG4gICAgICAgICAgICAgIGF0dHJzOiB7IGZvcjogX3ZtLmlucHV0RGF0YS5uYW1lIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBbX3ZtLl92KF92bS5fcyhfdm0uaW5wdXREYXRhLmxhYmVsKSldXG4gICAgICAgICAgKSxcbiAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgIF9jKFxuICAgICAgICAgICAgXCJsYWJlbFwiLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJhYnNvbHV0ZSBjdXN0b21fY2hlY2tib3hcIixcbiAgICAgICAgICAgICAgc3RhdGljU3R5bGU6IHsgcmlnaHQ6IFwiMFwiLCB0b3A6IFwiM3B4XCIgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgX2MoXCJpbnB1dFwiLCB7XG4gICAgICAgICAgICAgICAgZGlyZWN0aXZlczogW1xuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm1vZGVsXCIsXG4gICAgICAgICAgICAgICAgICAgIHJhd05hbWU6IFwidi1tb2RlbFwiLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogX3ZtLnBhcmVudE1vZGVsLFxuICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcInBhcmVudE1vZGVsXCJcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcIm5vdF9kZWZhdWx0XCIsXG4gICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgIGlkOiBfdm0uaW5wdXREYXRhLm5hbWUsXG4gICAgICAgICAgICAgICAgICBuYW1lOiBfdm0uaW5wdXREYXRhLm5hbWUsXG4gICAgICAgICAgICAgICAgICB0eXBlOiBcImNoZWNrYm94XCJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGRvbVByb3BzOiB7XG4gICAgICAgICAgICAgICAgICBjaGVja2VkOiBBcnJheS5pc0FycmF5KF92bS5wYXJlbnRNb2RlbClcbiAgICAgICAgICAgICAgICAgICAgPyBfdm0uX2koX3ZtLnBhcmVudE1vZGVsLCBudWxsKSA+IC0xXG4gICAgICAgICAgICAgICAgICAgIDogX3ZtLnBhcmVudE1vZGVsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyICQkYSA9IF92bS5wYXJlbnRNb2RlbCxcbiAgICAgICAgICAgICAgICAgICAgICAkJGVsID0gJGV2ZW50LnRhcmdldCxcbiAgICAgICAgICAgICAgICAgICAgICAkJGMgPSAkJGVsLmNoZWNrZWQgPyB0cnVlIDogZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoJCRhKSkge1xuICAgICAgICAgICAgICAgICAgICAgIHZhciAkJHYgPSBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgJCRpID0gX3ZtLl9pKCQkYSwgJCR2KVxuICAgICAgICAgICAgICAgICAgICAgIGlmICgkJGVsLmNoZWNrZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICQkaSA8IDAgJiYgKF92bS5wYXJlbnRNb2RlbCA9ICQkYS5jb25jYXQoWyQkdl0pKVxuICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkJGkgPiAtMSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAoX3ZtLnBhcmVudE1vZGVsID0gJCRhXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnNsaWNlKDAsICQkaSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY29uY2F0KCQkYS5zbGljZSgkJGkgKyAxKSkpXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgIF92bS5wYXJlbnRNb2RlbCA9ICQkY1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgX2MoXCJzcGFuXCIpXG4gICAgICAgICAgICBdXG4gICAgICAgICAgKVxuICAgICAgICBdKVxuICAgICAgOiBfdm0uX2UoKVxuICBdKVxufVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtcbiAgZnVuY3Rpb24oKSB7XG4gICAgdmFyIF92bSA9IHRoaXNcbiAgICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgICByZXR1cm4gX2MoXG4gICAgICBcImRpdlwiLFxuICAgICAgeyBzdGF0aWNDbGFzczogXCJsaXN0LXBsYWNlaG9sZGVyX2l0ZW1cIiwgc3RhdGljU3R5bGU6IHsgaGVpZ2h0OiBcIjMwcHhcIiB9IH0sXG4gICAgICBbXG4gICAgICAgIF9jKFwiZGl2XCIsIHtcbiAgICAgICAgICBzdGF0aWNDbGFzczogXCJsaXN0LXBsYWNlaG9sZGVyX2NlbGwgdy0xMDBcIixcbiAgICAgICAgICBzdGF0aWNTdHlsZTogeyB3aWR0aDogXCIxMDAlXCIgfVxuICAgICAgICB9KVxuICAgICAgXVxuICAgIClcbiAgfVxuXVxucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5cbmV4cG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0iLCJpbXBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IGZyb20gXCIuL0Zvcm1JbnB1dC52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9YTg1MmFjOWUmc2NvcGVkPXRydWUmXCJcbmltcG9ydCBzY3JpcHQgZnJvbSBcIi4vRm9ybUlucHV0LnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuZXhwb3J0ICogZnJvbSBcIi4vRm9ybUlucHV0LnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuXG5cbi8qIG5vcm1hbGl6ZSBjb21wb25lbnQgKi9cbmltcG9ydCBub3JtYWxpemVyIGZyb20gXCIhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3J1bnRpbWUvY29tcG9uZW50Tm9ybWFsaXplci5qc1wiXG52YXIgY29tcG9uZW50ID0gbm9ybWFsaXplcihcbiAgc2NyaXB0LFxuICByZW5kZXIsXG4gIHN0YXRpY1JlbmRlckZucyxcbiAgZmFsc2UsXG4gIG51bGwsXG4gIFwiYTg1MmFjOWVcIixcbiAgbnVsbFxuICBcbilcblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHtcbiAgdmFyIGFwaSA9IHJlcXVpcmUoXCJDOlxcXFxPcGVuU2VydmVyXFxcXGRvbWFpbnNcXFxcQXV0b0NSTVxcXFxub2RlX21vZHVsZXNcXFxcdnVlLWhvdC1yZWxvYWQtYXBpXFxcXGRpc3RcXFxcaW5kZXguanNcIilcbiAgYXBpLmluc3RhbGwocmVxdWlyZSgndnVlJykpXG4gIGlmIChhcGkuY29tcGF0aWJsZSkge1xuICAgIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgICBpZiAoIWFwaS5pc1JlY29yZGVkKCdhODUyYWM5ZScpKSB7XG4gICAgICBhcGkuY3JlYXRlUmVjb3JkKCdhODUyYWM5ZScsIGNvbXBvbmVudC5vcHRpb25zKVxuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVsb2FkKCdhODUyYWM5ZScsIGNvbXBvbmVudC5vcHRpb25zKVxuICAgIH1cbiAgICBtb2R1bGUuaG90LmFjY2VwdChcIi4vRm9ybUlucHV0LnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD1hODUyYWM5ZSZzY29wZWQ9dHJ1ZSZcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgYXBpLnJlcmVuZGVyKCdhODUyYWM5ZScsIHtcbiAgICAgICAgcmVuZGVyOiByZW5kZXIsXG4gICAgICAgIHN0YXRpY1JlbmRlckZuczogc3RhdGljUmVuZGVyRm5zXG4gICAgICB9KVxuICAgIH0pXG4gIH1cbn1cbmNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwicmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvc2VydmljZS9Gb3JtSW5wdXQudnVlXCJcbmV4cG9ydCBkZWZhdWx0IGNvbXBvbmVudC5leHBvcnRzIiwiaW1wb3J0IG1vZCBmcm9tIFwiLSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS00LTAhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9Gb3JtSW5wdXQudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiOyBleHBvcnQgZGVmYXVsdCBtb2Q7IGV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTQtMCEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0Zvcm1JbnB1dC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCIiLCJleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy90ZW1wbGF0ZUxvYWRlci5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vRm9ybUlucHV0LnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD1hODUyYWM5ZSZzY29wZWQ9dHJ1ZSZcIiJdLCJzb3VyY2VSb290IjoiIn0=