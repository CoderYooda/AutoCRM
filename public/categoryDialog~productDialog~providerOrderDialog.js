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
            : _vm._e()
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvc2VydmljZS9Gb3JtSW5wdXQudnVlIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9qcy9jb21wb25lbnRzL3NlcnZpY2UvRm9ybUlucHV0LnZ1ZT9jZTk1Iiwid2VicGFjazovLy8uL3Jlc291cmNlcy9qcy9jb21wb25lbnRzL3NlcnZpY2UvRm9ybUlucHV0LnZ1ZSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvY29tcG9uZW50cy9zZXJ2aWNlL0Zvcm1JbnB1dC52dWU/MDFkNiIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvY29tcG9uZW50cy9zZXJ2aWNlL0Zvcm1JbnB1dC52dWU/MWJhNyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBZ0RBO0FBQ0Esc0JBREE7QUFFQSxtQkFGQTtBQUdBO0FBQ0E7QUFDQTtBQURBO0FBR0EsR0FQQTtBQVFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBLFNBTEE7QUFNQTtBQUNBLE9BWEE7QUFZQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUZBLE1BRUE7QUFDQTtBQUNBO0FBQ0EsU0FOQTtBQU9BO0FBdEJBLEtBREE7QUF5QkEsWUF6QkEsc0JBeUJBO0FBQ0E7QUFDQSxLQTNCQTtBQTRCQSxXQTVCQSxxQkE0QkE7QUFDQTtBQUNBLEtBOUJBO0FBK0JBLGNBL0JBLHdCQStCQTtBQUNBO0FBQ0EsS0FqQ0E7QUFrQ0EsY0FsQ0Esd0JBa0NBO0FBQ0E7QUFDQTtBQXBDQSxHQVJBO0FBOENBLFNBOUNBLHFCQThDQTtBQUFBOztBQUNBO0FBQ0E7QUFDQSxLQUZBLEVBRUE7QUFDQTtBQURBLEtBRkE7QUFLQSxHQXBEQTtBQXFEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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cyIsInNvdXJjZXNDb250ZW50IjpbIjx0ZW1wbGF0ZT5cbiAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPlxuICAgICAgICA8ZGl2IHYtaWY9XCJpc0lucHV0XCI+XG4gICAgICAgICAgICA8bGFiZWw+e3sgaW5wdXREYXRhLmxhYmVsIH19PC9sYWJlbD5cbiAgICAgICAgICAgIDxkaXYgdi1pZj1cIiRwYXJlbnQubG9hZGluZ1wiIGNsYXNzPVwibGlzdC1wbGFjZWhvbGRlclwiIHN0eWxlPVwiaGVpZ2h0OiAzMHB4O1wiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJsaXN0LXBsYWNlaG9sZGVyX2l0ZW1cIiBzdHlsZT1cImhlaWdodDogMzBweDtcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImxpc3QtcGxhY2Vob2xkZXJfY2VsbCB3LTEwMFwiIHN0eWxlPVwid2lkdGg6IDEwMCVcIiA+PC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxpbnB1dCB2LWlmPVwiISRwYXJlbnQubG9hZGluZ1wiIEBrZXlwcmVzcy5lbnRlcj1cIiRwYXJlbnQuc2F2ZSgpXCJcbiAgICAgICAgICAgICAgICAgICAgdi1iaW5kOmNsYXNzPVwieydpcy1pbnZhbGlkJzplcnJvck1zZ31cIlxuICAgICAgICAgICAgICAgICAgICB2LXRvb2x0aXA9XCJ7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBlcnJvck1zZyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlbWVudDogJ2xlZnQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NlczogWydlcnJvciddLFxuICAgICAgICAgICAgICAgICAgICB9XCJcbiAgICAgICAgICAgICAgICAgICAgdi1tb2RlbD1cInBhcmVudE1vZGVsXCJcbiAgICAgICAgICAgICAgICAgICAgdi1iaW5kOnBsYWNlaG9sZGVyPVwiaW5wdXREYXRhLnBsYWNlaG9sZGVyXCJcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiPlxuICAgICAgICA8L2Rpdj5cblxuXG4gICAgICAgIDxkaXYgdi1pZj1cIiEkcGFyZW50LmxvYWRpbmcgJiYgaXNTZWxlY3RvclwiID5cbiAgICAgICAgICAgIDxsYWJlbD57eyBpbnB1dERhdGEubGFiZWwgfX08L2xhYmVsPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwXCI+XG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICB2LWJpbmQ6Y2xhc3M9XCJ7J2lzLWludmFsaWQnOmVycm9yTXNnfVwiXG4gICAgICAgICAgICAgICAgICAgIHYtdG9vbHRpcD1cIntcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IGVycm9yTXNnLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2VtZW50OiAnbGVmdCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc2VzOiBbJ2Vycm9yJ10sXG4gICAgICAgICAgICAgICAgICAgIH1cIlxuICAgICAgICAgICAgICAgICAgICB2LW9uOmNsaWNrPVwiJHBhcmVudFtpbnB1dERhdGEub25DbGlja10oKVwiXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICBjbGFzcz1cImNhdGVnb3J5X3NlbGVjdCBmb3JtLWNvbnRyb2wgdGV4dC1sZWZ0IGJ1dHRvbl9zZWxlY3RcIj57eyBwYXJlbnRNb2RlbCB9fTwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IHYtaWY9XCJpc0NoZWNrYm94XCIgY2xhc3M9XCJyZWxhdGl2ZVwiPlxuICAgICAgICAgICAgPGxhYmVsIHYtYmluZDpmb3I9XCJpbnB1dERhdGEubmFtZVwiIGNsYXNzPVwidy0xMDBcIiB2LWJpbmQ6Y2xhc3M9XCJ7J21iLTAnIDogIWlucHV0RGF0YS5tYn1cIj57eyBpbnB1dERhdGEubGFiZWwgfX08L2xhYmVsPlxuICAgICAgICAgICAgPGxhYmVsIGNsYXNzPVwiYWJzb2x1dGUgY3VzdG9tX2NoZWNrYm94XCIgc3R5bGU9XCJyaWdodDogMDsgdG9wOiAzcHg7XCI+XG4gICAgICAgICAgICAgICAgPGlucHV0IHYtYmluZDppZD1cImlucHV0RGF0YS5uYW1lXCIgdi1tb2RlbD1cInBhcmVudE1vZGVsXCIgdi1iaW5kOm5hbWU9XCJpbnB1dERhdGEubmFtZVwiIHR5cGU9XCJjaGVja2JveFwiIGNsYXNzPVwibm90X2RlZmF1bHRcIi8+XG4gICAgICAgICAgICAgICAgPHNwYW4+PC9zcGFuPlxuICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuICAgIGV4cG9ydCBkZWZhdWx0IHtcbiAgICAgICAgcHJvcHM6WydpbnB1dERhdGEnXSxcbiAgICAgICAgbmFtZTogXCJGb3JtSW5wdXRcIixcbiAgICAgICAgZGF0YTogKCk9PiB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGVycm9yOm51bGwsXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGNvbXB1dGVkOntcbiAgICAgICAgICAgIHBhcmVudE1vZGVsOntcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5hbWVfYXJyID0gdGhpcy5pbnB1dERhdGEubmFtZS5zcGxpdCgnLicpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgdGFyZ2V0ID0gdGhpcy4kcGFyZW50O1xuICAgICAgICAgICAgICAgICAgICBuYW1lX2Fyci5mb3JFYWNoKChpdGVtLCBpbmRleCk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKCF0YXJnZXRbaXRlbV0gJiYgbmFtZV9hcnJbaW5kZXggKyAxXSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0W2l0ZW1dID0ge307XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQgPSB0YXJnZXRbaXRlbV07XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGFyZ2V0O1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBuYW1lX2FyciA9IHRoaXMuaW5wdXREYXRhLm5hbWUuc3BsaXQoJy4nKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRhcmdldCA9IHRoaXMuJHBhcmVudDtcbiAgICAgICAgICAgICAgICAgICAgbmFtZV9hcnIuZm9yRWFjaCgoaXRlbSwgaW5kZXgpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihuYW1lX2FycltpbmRleCArIDFdKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQgPSB0YXJnZXRbaXRlbV1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0W2l0ZW1dID0gdmFsO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3JNc2coKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5lcnJvciA/IHRoaXMuZXJyb3IgOiBmYWxzZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpc0lucHV0KCl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaW5wdXREYXRhLnR5cGUgPT09ICdpbnB1dCc7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaXNTZWxlY3Rvcigpe1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmlucHV0RGF0YS50eXBlID09PSAnc2VsZWN0b3InO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGlzQ2hlY2tib3goKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5pbnB1dERhdGEudHlwZSA9PT0gJ2NoZWNrYm94JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgbW91bnRlZCgpe1xuICAgICAgICAgICAgdGhpcy4kd2F0Y2goJyRwYXJlbnQuJyArIHRoaXMuaW5wdXREYXRhLm5hbWUsICh2YWwpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmVycm9yID0gbnVsbDtcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBkZWVwOiB0cnVlXG4gICAgICAgICAgICB9KVxuICAgICAgICB9LFxuICAgICAgICB3YXRjaDoge1xuICAgICAgICAgICAgLy8gJyRwYXJlbnQuZW50aXR5Jzp7XG4gICAgICAgICAgICAvLyAgICAgaGFuZGxlcihlbnRpdHkpe1xuICAgICAgICAgICAgLy8gICAgICAgICB0aGlzLmVycm9yID0gbnVsbDtcbiAgICAgICAgICAgIC8vICAgICB9LFxuICAgICAgICAgICAgLy8gICAgIGRlZXA6IHRydWVcbiAgICAgICAgICAgIC8vIH0sXG4gICAgICAgICAgICAnJHBhcmVudC5tZXNzYWdlcyc6ZnVuY3Rpb24gKG1lc3NhZ2VzKXtcbiAgICAgICAgICAgICAgICBsZXQgbmFtZSA9IHRoaXMuZ2V0VGFyZ2V0TmFtZSgpO1xuICAgICAgICAgICAgICAgIGlmKG1lc3NhZ2VzW25hbWVdIHx8IG1lc3NhZ2VzW25hbWUgKyAnX2lkJ10pIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG1lc3NhZ2UgPSBtZXNzYWdlc1tuYW1lXSB8fCBtZXNzYWdlc1tuYW1lICsgJ19pZCddO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEVycm9yKG1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIG1ldGhvZHM6e1xuICAgICAgICAgICAgZ2V0VGFyZ2V0TmFtZSgpe1xuICAgICAgICAgICAgICAgIGxldCBuYW1lX2FyciA9IHRoaXMuaW5wdXREYXRhLm5hbWUuc3BsaXQoJy4nKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmFtZV9hcnIuc2xpY2UoLTEpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldEVycm9yKGVycm9yKXtcbiAgICAgICAgICAgICAgICB0aGlzLmVycm9yID0gZXJyb3I7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgfVxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG48IS0tdi12YWxpZGF0ZT1cIntuYW1lOiduYW1lJ31cIiB2LWJpbmQ6Y2xhc3M9XCJ7J2lzLWludmFsaWQnIDogaGFzRXJyb3IoJ25hbWUnKX1cIi0tPlxuIiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgX3ZtID0gdGhpc1xuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gIHJldHVybiBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImZvcm0tZ3JvdXBcIiB9LCBbXG4gICAgX3ZtLmlzSW5wdXRcbiAgICAgID8gX2MoXCJkaXZcIiwgW1xuICAgICAgICAgIF9jKFwibGFiZWxcIiwgW192bS5fdihfdm0uX3MoX3ZtLmlucHV0RGF0YS5sYWJlbCkpXSksXG4gICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICBfdm0uJHBhcmVudC5sb2FkaW5nXG4gICAgICAgICAgICA/IF9jKFxuICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwibGlzdC1wbGFjZWhvbGRlclwiLFxuICAgICAgICAgICAgICAgICAgc3RhdGljU3R5bGU6IHsgaGVpZ2h0OiBcIjMwcHhcIiB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBbX3ZtLl9tKDApXVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICA6IF92bS5fZSgpLFxuICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgIV92bS4kcGFyZW50LmxvYWRpbmdcbiAgICAgICAgICAgID8gX2MoXCJpbnB1dFwiLCB7XG4gICAgICAgICAgICAgICAgZGlyZWN0aXZlczogW1xuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInRvb2x0aXBcIixcbiAgICAgICAgICAgICAgICAgICAgcmF3TmFtZTogXCJ2LXRvb2x0aXBcIixcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHtcbiAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBfdm0uZXJyb3JNc2csXG4gICAgICAgICAgICAgICAgICAgICAgcGxhY2VtZW50OiBcImxlZnRcIixcbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc2VzOiBbXCJlcnJvclwiXVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uOlxuICAgICAgICAgICAgICAgICAgICAgIFwie1xcbiAgICAgICAgICAgICAgICAgICAgY29udGVudDogZXJyb3JNc2csXFxuICAgICAgICAgICAgICAgICAgICBwbGFjZW1lbnQ6ICdsZWZ0JyxcXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzZXM6IFsnZXJyb3InXSxcXG4gICAgICAgICAgICAgICAgfVwiXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm1vZGVsXCIsXG4gICAgICAgICAgICAgICAgICAgIHJhd05hbWU6IFwidi1tb2RlbFwiLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogX3ZtLnBhcmVudE1vZGVsLFxuICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcInBhcmVudE1vZGVsXCJcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImZvcm0tY29udHJvbFwiLFxuICAgICAgICAgICAgICAgIGNsYXNzOiB7IFwiaXMtaW52YWxpZFwiOiBfdm0uZXJyb3JNc2cgfSxcbiAgICAgICAgICAgICAgICBhdHRyczogeyBwbGFjZWhvbGRlcjogX3ZtLmlucHV0RGF0YS5wbGFjZWhvbGRlciwgdHlwZTogXCJ0ZXh0XCIgfSxcbiAgICAgICAgICAgICAgICBkb21Qcm9wczogeyB2YWx1ZTogX3ZtLnBhcmVudE1vZGVsIH0sXG4gICAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICAgIGtleXByZXNzOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgICAgICEkZXZlbnQudHlwZS5pbmRleE9mKFwia2V5XCIpICYmXG4gICAgICAgICAgICAgICAgICAgICAgX3ZtLl9rKCRldmVudC5rZXlDb2RlLCBcImVudGVyXCIsIDEzLCAkZXZlbnQua2V5LCBcIkVudGVyXCIpXG4gICAgICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF92bS4kcGFyZW50LnNhdmUoKVxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIGlucHV0OiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCRldmVudC50YXJnZXQuY29tcG9zaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgX3ZtLnBhcmVudE1vZGVsID0gJGV2ZW50LnRhcmdldC52YWx1ZVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIDogX3ZtLl9lKClcbiAgICAgICAgXSlcbiAgICAgIDogX3ZtLl9lKCksXG4gICAgX3ZtLl92KFwiIFwiKSxcbiAgICAhX3ZtLiRwYXJlbnQubG9hZGluZyAmJiBfdm0uaXNTZWxlY3RvclxuICAgICAgPyBfYyhcImRpdlwiLCBbXG4gICAgICAgICAgX2MoXCJsYWJlbFwiLCBbX3ZtLl92KF92bS5fcyhfdm0uaW5wdXREYXRhLmxhYmVsKSldKSxcbiAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiaW5wdXQtZ3JvdXBcIiB9LCBbXG4gICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgXCJidXR0b25cIixcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGRpcmVjdGl2ZXM6IFtcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ0b29sdGlwXCIsXG4gICAgICAgICAgICAgICAgICAgIHJhd05hbWU6IFwidi10b29sdGlwXCIsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgY29udGVudDogX3ZtLmVycm9yTXNnLFxuICAgICAgICAgICAgICAgICAgICAgIHBsYWNlbWVudDogXCJsZWZ0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NlczogW1wiZXJyb3JcIl1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjpcbiAgICAgICAgICAgICAgICAgICAgICBcIntcXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IGVycm9yTXNnLFxcbiAgICAgICAgICAgICAgICAgICAgcGxhY2VtZW50OiAnbGVmdCcsXFxuICAgICAgICAgICAgICAgICAgICBjbGFzc2VzOiBbJ2Vycm9yJ10sXFxuICAgICAgICAgICAgICAgIH1cIlxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6XG4gICAgICAgICAgICAgICAgICBcImNhdGVnb3J5X3NlbGVjdCBmb3JtLWNvbnRyb2wgdGV4dC1sZWZ0IGJ1dHRvbl9zZWxlY3RcIixcbiAgICAgICAgICAgICAgICBjbGFzczogeyBcImlzLWludmFsaWRcIjogX3ZtLmVycm9yTXNnIH0sXG4gICAgICAgICAgICAgICAgYXR0cnM6IHsgdHlwZTogXCJidXR0b25cIiB9LFxuICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIF92bS4kcGFyZW50W192bS5pbnB1dERhdGEub25DbGlja10oKVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgW192bS5fdihfdm0uX3MoX3ZtLnBhcmVudE1vZGVsKSldXG4gICAgICAgICAgICApXG4gICAgICAgICAgXSlcbiAgICAgICAgXSlcbiAgICAgIDogX3ZtLl9lKCksXG4gICAgX3ZtLl92KFwiIFwiKSxcbiAgICBfdm0uaXNDaGVja2JveFxuICAgICAgPyBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcInJlbGF0aXZlXCIgfSwgW1xuICAgICAgICAgIF9jKFxuICAgICAgICAgICAgXCJsYWJlbFwiLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJ3LTEwMFwiLFxuICAgICAgICAgICAgICBjbGFzczogeyBcIm1iLTBcIjogIV92bS5pbnB1dERhdGEubWIgfSxcbiAgICAgICAgICAgICAgYXR0cnM6IHsgZm9yOiBfdm0uaW5wdXREYXRhLm5hbWUgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFtfdm0uX3YoX3ZtLl9zKF92bS5pbnB1dERhdGEubGFiZWwpKV1cbiAgICAgICAgICApLFxuICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgX2MoXG4gICAgICAgICAgICBcImxhYmVsXCIsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImFic29sdXRlIGN1c3RvbV9jaGVja2JveFwiLFxuICAgICAgICAgICAgICBzdGF0aWNTdHlsZTogeyByaWdodDogXCIwXCIsIHRvcDogXCIzcHhcIiB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICBfYyhcImlucHV0XCIsIHtcbiAgICAgICAgICAgICAgICBkaXJlY3RpdmVzOiBbXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibW9kZWxcIixcbiAgICAgICAgICAgICAgICAgICAgcmF3TmFtZTogXCJ2LW1vZGVsXCIsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBfdm0ucGFyZW50TW9kZWwsXG4gICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwicGFyZW50TW9kZWxcIlxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwibm90X2RlZmF1bHRcIixcbiAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgaWQ6IF92bS5pbnB1dERhdGEubmFtZSxcbiAgICAgICAgICAgICAgICAgIG5hbWU6IF92bS5pbnB1dERhdGEubmFtZSxcbiAgICAgICAgICAgICAgICAgIHR5cGU6IFwiY2hlY2tib3hcIlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZG9tUHJvcHM6IHtcbiAgICAgICAgICAgICAgICAgIGNoZWNrZWQ6IEFycmF5LmlzQXJyYXkoX3ZtLnBhcmVudE1vZGVsKVxuICAgICAgICAgICAgICAgICAgICA/IF92bS5faShfdm0ucGFyZW50TW9kZWwsIG51bGwpID4gLTFcbiAgICAgICAgICAgICAgICAgICAgOiBfdm0ucGFyZW50TW9kZWxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgJCRhID0gX3ZtLnBhcmVudE1vZGVsLFxuICAgICAgICAgICAgICAgICAgICAgICQkZWwgPSAkZXZlbnQudGFyZ2V0LFxuICAgICAgICAgICAgICAgICAgICAgICQkYyA9ICQkZWwuY2hlY2tlZCA/IHRydWUgOiBmYWxzZVxuICAgICAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSgkJGEpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgdmFyICQkdiA9IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAkJGkgPSBfdm0uX2koJCRhLCAkJHYpXG4gICAgICAgICAgICAgICAgICAgICAgaWYgKCQkZWwuY2hlY2tlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJCRpIDwgMCAmJiAoX3ZtLnBhcmVudE1vZGVsID0gJCRhLmNvbmNhdChbJCR2XSkpXG4gICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICQkaSA+IC0xICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgIChfdm0ucGFyZW50TW9kZWwgPSAkJGFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc2xpY2UoMCwgJCRpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jb25jYXQoJCRhLnNsaWNlKCQkaSArIDEpKSlcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgX3ZtLnBhcmVudE1vZGVsID0gJCRjXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICBfYyhcInNwYW5cIilcbiAgICAgICAgICAgIF1cbiAgICAgICAgICApXG4gICAgICAgIF0pXG4gICAgICA6IF92bS5fZSgpXG4gIF0pXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW1xuICBmdW5jdGlvbigpIHtcbiAgICB2YXIgX3ZtID0gdGhpc1xuICAgIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICAgIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICAgIHJldHVybiBfYyhcbiAgICAgIFwiZGl2XCIsXG4gICAgICB7IHN0YXRpY0NsYXNzOiBcImxpc3QtcGxhY2Vob2xkZXJfaXRlbVwiLCBzdGF0aWNTdHlsZTogeyBoZWlnaHQ6IFwiMzBweFwiIH0gfSxcbiAgICAgIFtcbiAgICAgICAgX2MoXCJkaXZcIiwge1xuICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImxpc3QtcGxhY2Vob2xkZXJfY2VsbCB3LTEwMFwiLFxuICAgICAgICAgIHN0YXRpY1N0eWxlOiB7IHdpZHRoOiBcIjEwMCVcIiB9XG4gICAgICAgIH0pXG4gICAgICBdXG4gICAgKVxuICB9XG5dXG5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcblxuZXhwb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSIsImltcG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0gZnJvbSBcIi4vRm9ybUlucHV0LnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD1hODUyYWM5ZSZzY29wZWQ9dHJ1ZSZcIlxuaW1wb3J0IHNjcmlwdCBmcm9tIFwiLi9Gb3JtSW5wdXQudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5leHBvcnQgKiBmcm9tIFwiLi9Gb3JtSW5wdXQudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5cblxuLyogbm9ybWFsaXplIGNvbXBvbmVudCAqL1xuaW1wb3J0IG5vcm1hbGl6ZXIgZnJvbSBcIiEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvcnVudGltZS9jb21wb25lbnROb3JtYWxpemVyLmpzXCJcbnZhciBjb21wb25lbnQgPSBub3JtYWxpemVyKFxuICBzY3JpcHQsXG4gIHJlbmRlcixcbiAgc3RhdGljUmVuZGVyRm5zLFxuICBmYWxzZSxcbiAgbnVsbCxcbiAgXCJhODUyYWM5ZVwiLFxuICBudWxsXG4gIFxuKVxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkge1xuICB2YXIgYXBpID0gcmVxdWlyZShcIkM6XFxcXE9wZW5TZXJ2ZXJcXFxcZG9tYWluc1xcXFxBdXRvQ1JNXFxcXG5vZGVfbW9kdWxlc1xcXFx2dWUtaG90LXJlbG9hZC1hcGlcXFxcZGlzdFxcXFxpbmRleC5qc1wiKVxuICBhcGkuaW5zdGFsbChyZXF1aXJlKCd2dWUnKSlcbiAgaWYgKGFwaS5jb21wYXRpYmxlKSB7XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICAgIGlmICghYXBpLmlzUmVjb3JkZWQoJ2E4NTJhYzllJykpIHtcbiAgICAgIGFwaS5jcmVhdGVSZWNvcmQoJ2E4NTJhYzllJywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZWxvYWQoJ2E4NTJhYzllJywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfVxuICAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiLi9Gb3JtSW5wdXQudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPWE4NTJhYzllJnNjb3BlZD10cnVlJlwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICBhcGkucmVyZW5kZXIoJ2E4NTJhYzllJywge1xuICAgICAgICByZW5kZXI6IHJlbmRlcixcbiAgICAgICAgc3RhdGljUmVuZGVyRm5zOiBzdGF0aWNSZW5kZXJGbnNcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxufVxuY29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJyZXNvdXJjZXMvanMvY29tcG9uZW50cy9zZXJ2aWNlL0Zvcm1JbnB1dC52dWVcIlxuZXhwb3J0IGRlZmF1bHQgY29tcG9uZW50LmV4cG9ydHMiLCJpbXBvcnQgbW9kIGZyb20gXCItIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTQtMCEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0Zvcm1JbnB1dC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tNC0wIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vRm9ybUlucHV0LnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIiIsImV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3RlbXBsYXRlTG9hZGVyLmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9Gb3JtSW5wdXQudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPWE4NTJhYzllJnNjb3BlZD10cnVlJlwiIl0sInNvdXJjZVJvb3QiOiIifQ==