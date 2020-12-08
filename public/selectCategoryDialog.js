(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["selectCategoryDialog"],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/service/RecursiveCategory.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/service/RecursiveCategory.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  props: ['category'],
  name: "RecursiveCategory",
  data: function data() {
    return {
      category_name: null,
      new_focused: false,
      name_invalid: false,
      childs: []
    };
  },
  watch: {// categories: {
    //     handler(newVal, oldVal){
    //         console.log(123);
    //         this.categories = newVal
    //     },
    //     deep: true
    // }
  },
  mounted: function mounted() {
    var _this = this;

    this.$eventBus.$on('CategoryUpdated', function (data) {
      if (data.category_id === _this.category.id) {
        _this.getChilds(_this.category, true);
      }
    });
  },
  computed: {// lastChilds(){
    //     return Boolean(this.childs.length);
    // }
  },
  methods: {
    getChilds: function getChilds(category) {
      var _this2 = this;

      var force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (force || !category.childs) {
        category.loading = true;
        this.$forceUpdate();
        window.axios({
          method: 'get',
          url: '/categories/' + category.id + '/children'
        }).then(function (resp) {
          category.childs = resp.data;
          category.shown = true;
          _this2.childs = category.childs.length;
          category.loading = false;

          _this2.$forceUpdate();
        });
      } else {
        category.shown = !category.shown;
        this.$forceUpdate();
      }
    },
    isShown: function isShown(category) {
      return Boolean(category.shown);
    },
    pick: function pick(category) {
      var wm = this.getUnrecursiveComponent('SelectCategoryDialog');
      wm.pickCategory(category);
    },
    getUnrecursiveComponent: function getUnrecursiveComponent(componentName) {
      var component = null;
      var parent = this.$parent;

      while (parent && !component) {
        if (parent.$options.name === componentName) {
          component = parent;
        }

        parent = parent.$parent;
      }

      return component;
    },
    saveCategory: function saveCategory() {
      var _this3 = this;

      window.axios({
        method: 'post',
        url: '/categories',
        data: {
          name: this.category_name,
          category_id: this.category.id
        }
      }).then(function (resp) {
        _this3.category_name = null;
        _this3.new_focused = false;

        _this3.$eventBus.$emit('CategoryUpdated', {
          id: resp.data.id,
          category_id: resp.data.category_id
        });
      })["catch"](function (error) {
        if (error.response.data.messages.name) _this3.name_invalid = true;
      });
    }
  },
  components: {
    'RecursiveCategory': function RecursiveCategory() {
      return Promise.resolve(/*! import() */).then(__webpack_require__.bind(null, /*! ./RecursiveCategory */ "./resources/js/components/service/RecursiveCategory.vue"));
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/template/Dialogs/SelectCategoryDialog.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/template/Dialogs/SelectCategoryDialog.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _service_RecursiveCategory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../service/RecursiveCategory */ "./resources/js/components/service/RecursiveCategory.vue");
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
  name: "SelectCategoryDialog",
  props: ['dialog'],
  data: function data() {
    return {
      category: 1,
      category_id: 1,
      parent_name: null,
      categories: []
    };
  },
  // beforeMount(){
  //     this.dialog = this.$attrs.dialog;
  // },
  beforeMount: function beforeMount() {
    this.dialog.title = "Выбор категории";
    this.dialog.width = 400;
    this.root_category = this.dialog.params.root_category ? this.dialog.params.root_category : this.root_category;
  },
  mounted: function mounted() {
    var _this = this;

    window.axios({
      method: 'get',
      url: '/categories/' + this.root_category + '/children'
    }).then(function (resp) {
      _this.categories = resp.data;
    });
  },
  computed: {},
  methods: {
    pickCategory: function pickCategory(category) {
      this.dialog.params.ref.setCategory(category);
      this.$parent.closeDialog(this.dialog);
    }
  },
  components: {
    RecursiveCategory: _service_RecursiveCategory__WEBPACK_IMPORTED_MODULE_0__["default"]
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/service/RecursiveCategory.vue?vue&type=template&id=eb5680ca&scoped=true&":
/*!****************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/service/RecursiveCategory.vue?vue&type=template&id=eb5680ca&scoped=true& ***!
  \****************************************************************************************************************************************************************************************************************************************/
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
  return _c(
    "ul",
    [
      _vm._l(_vm.category.childs, function(cat) {
        return _c(
          "li",
          { class: { loading: cat.loading } },
          [
            _c("div", {
              staticClass: "ic",
              class: { open: _vm.isShown(cat) },
              on: {
                click: function($event) {
                  return _vm.getChilds(cat)
                }
              }
            }),
            _vm._v(" "),
            _c(
              "div",
              {
                staticClass: "category pointer",
                class: { opened: _vm.isShown(cat) },
                on: {
                  click: function($event) {
                    return _vm.pick(cat)
                  }
                }
              },
              [_vm._v("\n            " + _vm._s(cat.name) + "\n        ")]
            ),
            _vm._v(" "),
            cat.childs
              ? _c("RecursiveCategory", {
                  class: { show: _vm.isShown(cat) },
                  attrs: { category: cat }
                })
              : _vm._e()
          ],
          1
        )
      }),
      _vm._v(" "),
      _c("li", [
        _c("div", { staticClass: "ic new" }),
        _vm._v(" "),
        _c("div", { staticClass: "category pointer new" }, [
          _c("input", {
            directives: [
              {
                name: "model",
                rawName: "v-model",
                value: _vm.category_name,
                expression: "category_name"
              }
            ],
            staticClass: "new_cat",
            class: { "is-invalid": _vm.name_invalid },
            attrs: { placeholder: "Новая категория", type: "text" },
            domProps: { value: _vm.category_name },
            on: {
              keydown: [
                function($event) {
                  if (
                    !$event.type.indexOf("key") &&
                    _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")
                  ) {
                    return null
                  }
                  return _vm.saveCategory()
                },
                function($event) {
                  if (
                    !$event.type.indexOf("key") &&
                    _vm._k($event.keyCode, "esc", 27, $event.key, [
                      "Esc",
                      "Escape"
                    ])
                  ) {
                    return null
                  }
                  _vm.new_focused = false
                }
              ],
              focus: function($event) {
                _vm.new_focused = true
              },
              input: function($event) {
                if ($event.target.composing) {
                  return
                }
                _vm.category_name = $event.target.value
              }
            }
          }),
          _vm._v(" "),
          _vm.new_focused
            ? _c(
                "button",
                {
                  on: {
                    click: function($event) {
                      return _vm.saveCategory()
                    }
                  }
                },
                [_vm._v("Создать")]
              )
            : _vm._e()
        ])
      ])
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/template/Dialogs/SelectCategoryDialog.vue?vue&type=template&id=174a6060&":
/*!****************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/template/Dialogs/SelectCategoryDialog.vue?vue&type=template&id=174a6060& ***!
  \****************************************************************************************************************************************************************************************************************************************/
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
  return _c("div", [
    _c("div", { staticClass: "box-body inscroll" }, [
      _c(
        "div",
        {
          staticClass: "recurse_categories",
          staticStyle: { "max-height": "400px" },
          attrs: { "data-simplebar": "" }
        },
        [
          _c("div", { staticClass: "base_cat" }),
          _vm._v(" "),
          _c("RecursiveCategory", {
            attrs: {
              category: { id: _vm.root_category, childs: _vm.categories }
            }
          })
        ],
        1
      )
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "modal-footer" }, [
      _c(
        "button",
        {
          staticClass: "button white",
          on: {
            click: function($event) {
              return _vm.$parent.closeDialog(_vm.dialog)
            }
          }
        },
        [_vm._v("Закрыть")]
      )
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "system_message" })
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/service/RecursiveCategory.vue":
/*!***************************************************************!*\
  !*** ./resources/js/components/service/RecursiveCategory.vue ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _RecursiveCategory_vue_vue_type_template_id_eb5680ca_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RecursiveCategory.vue?vue&type=template&id=eb5680ca&scoped=true& */ "./resources/js/components/service/RecursiveCategory.vue?vue&type=template&id=eb5680ca&scoped=true&");
/* harmony import */ var _RecursiveCategory_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./RecursiveCategory.vue?vue&type=script&lang=js& */ "./resources/js/components/service/RecursiveCategory.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _RecursiveCategory_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _RecursiveCategory_vue_vue_type_template_id_eb5680ca_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _RecursiveCategory_vue_vue_type_template_id_eb5680ca_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "eb5680ca",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/service/RecursiveCategory.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/service/RecursiveCategory.vue?vue&type=script&lang=js&":
/*!****************************************************************************************!*\
  !*** ./resources/js/components/service/RecursiveCategory.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RecursiveCategory_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./RecursiveCategory.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/service/RecursiveCategory.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RecursiveCategory_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/service/RecursiveCategory.vue?vue&type=template&id=eb5680ca&scoped=true&":
/*!**********************************************************************************************************!*\
  !*** ./resources/js/components/service/RecursiveCategory.vue?vue&type=template&id=eb5680ca&scoped=true& ***!
  \**********************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_RecursiveCategory_vue_vue_type_template_id_eb5680ca_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./RecursiveCategory.vue?vue&type=template&id=eb5680ca&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/service/RecursiveCategory.vue?vue&type=template&id=eb5680ca&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_RecursiveCategory_vue_vue_type_template_id_eb5680ca_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_RecursiveCategory_vue_vue_type_template_id_eb5680ca_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/template/Dialogs/SelectCategoryDialog.vue":
/*!***************************************************************************!*\
  !*** ./resources/js/components/template/Dialogs/SelectCategoryDialog.vue ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _SelectCategoryDialog_vue_vue_type_template_id_174a6060___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SelectCategoryDialog.vue?vue&type=template&id=174a6060& */ "./resources/js/components/template/Dialogs/SelectCategoryDialog.vue?vue&type=template&id=174a6060&");
/* harmony import */ var _SelectCategoryDialog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SelectCategoryDialog.vue?vue&type=script&lang=js& */ "./resources/js/components/template/Dialogs/SelectCategoryDialog.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _SelectCategoryDialog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _SelectCategoryDialog_vue_vue_type_template_id_174a6060___WEBPACK_IMPORTED_MODULE_0__["render"],
  _SelectCategoryDialog_vue_vue_type_template_id_174a6060___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/template/Dialogs/SelectCategoryDialog.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/template/Dialogs/SelectCategoryDialog.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************!*\
  !*** ./resources/js/components/template/Dialogs/SelectCategoryDialog.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SelectCategoryDialog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./SelectCategoryDialog.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/template/Dialogs/SelectCategoryDialog.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SelectCategoryDialog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/template/Dialogs/SelectCategoryDialog.vue?vue&type=template&id=174a6060&":
/*!**********************************************************************************************************!*\
  !*** ./resources/js/components/template/Dialogs/SelectCategoryDialog.vue?vue&type=template&id=174a6060& ***!
  \**********************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SelectCategoryDialog_vue_vue_type_template_id_174a6060___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./SelectCategoryDialog.vue?vue&type=template&id=174a6060& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/template/Dialogs/SelectCategoryDialog.vue?vue&type=template&id=174a6060&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SelectCategoryDialog_vue_vue_type_template_id_174a6060___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SelectCategoryDialog_vue_vue_type_template_id_174a6060___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvc2VydmljZS9SZWN1cnNpdmVDYXRlZ29yeS52dWUiLCJ3ZWJwYWNrOi8vL3Jlc291cmNlcy9qcy9jb21wb25lbnRzL3RlbXBsYXRlL0RpYWxvZ3MvU2VsZWN0Q2F0ZWdvcnlEaWFsb2cudnVlIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9qcy9jb21wb25lbnRzL3NlcnZpY2UvUmVjdXJzaXZlQ2F0ZWdvcnkudnVlP2UwMDMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvdGVtcGxhdGUvRGlhbG9ncy9TZWxlY3RDYXRlZ29yeURpYWxvZy52dWU/MmRjMSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvY29tcG9uZW50cy9zZXJ2aWNlL1JlY3Vyc2l2ZUNhdGVnb3J5LnZ1ZSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvY29tcG9uZW50cy9zZXJ2aWNlL1JlY3Vyc2l2ZUNhdGVnb3J5LnZ1ZT8zZGUxIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9qcy9jb21wb25lbnRzL3NlcnZpY2UvUmVjdXJzaXZlQ2F0ZWdvcnkudnVlP2Y4MjgiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvdGVtcGxhdGUvRGlhbG9ncy9TZWxlY3RDYXRlZ29yeURpYWxvZy52dWUiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvdGVtcGxhdGUvRGlhbG9ncy9TZWxlY3RDYXRlZ29yeURpYWxvZy52dWU/NjVmMCIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvY29tcG9uZW50cy90ZW1wbGF0ZS9EaWFsb2dzL1NlbGVjdENhdGVnb3J5RGlhbG9nLnZ1ZT8zODMwIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9CQTtBQUNBLHFCQURBO0FBRUEsMkJBRkE7QUFHQTtBQUNBO0FBQ0EseUJB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QUNtRztBQUNuRyxnQkFBZ0IsMkdBQVU7QUFDMUIsRUFBRSwwRkFBTTtBQUNSLEVBQUUsK0ZBQU07QUFDUixFQUFFLHdHQUFlO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsSUFBSSxLQUFVLEVBQUUsWUFpQmY7QUFDRDtBQUNlLGdGOzs7Ozs7Ozs7Ozs7QUN0Q2Y7QUFBQTtBQUFBLHdDQUFnTixDQUFnQixnUUFBRyxFQUFDLEM7Ozs7Ozs7Ozs7OztBQ0FwTztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEiLCJmaWxlIjoic2VsZWN0Q2F0ZWdvcnlEaWFsb2cuanMiLCJzb3VyY2VzQ29udGVudCI6WyI8dGVtcGxhdGU+XG4gICAgPHVsPlxuICAgICAgICA8bGkgdi1iaW5kOmNsYXNzPVwieydsb2FkaW5nJyA6IGNhdC5sb2FkaW5nfVwiIHYtZm9yPVwiY2F0IGluIGNhdGVnb3J5LmNoaWxkc1wiPlxuICAgICAgICAgICAgPGRpdiB2LW9uOmNsaWNrPVwiZ2V0Q2hpbGRzKGNhdClcIiBjbGFzcz1cImljXCIgdi1iaW5kOmNsYXNzPVwieydvcGVuJyA6IGlzU2hvd24oY2F0KX1cIj48L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgdi1vbjpjbGljaz1cInBpY2soY2F0KVwiIGNsYXNzPVwiY2F0ZWdvcnkgcG9pbnRlclwiIHYtYmluZDpjbGFzcz1cInsnb3BlbmVkJyA6IGlzU2hvd24oY2F0KX1cIj5cbiAgICAgICAgICAgICAgICB7eyBjYXQubmFtZSB9fVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8UmVjdXJzaXZlQ2F0ZWdvcnkgdi1pZj1cImNhdC5jaGlsZHNcIiB2LWJpbmQ6Y2xhc3M9XCJ7J3Nob3cnIDogaXNTaG93bihjYXQpfVwiIHYtYmluZDpjYXRlZ29yeT1cImNhdFwiIC8+XG4gICAgICAgIDwvbGk+XG4gICAgICAgIDxsaT5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpYyBuZXdcIj48L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXRlZ29yeSBwb2ludGVyIG5ld1wiPlxuICAgICAgICAgICAgICAgIDxpbnB1dCBwbGFjZWhvbGRlcj1cItCd0L7QstCw0Y8g0LrQsNGC0LXQs9C+0YDQuNGPXCIgdi1iaW5kOmNsYXNzPVwieydpcy1pbnZhbGlkJyA6IG5hbWVfaW52YWxpZH1cIiBAa2V5ZG93bi5lbnRlcj1cInNhdmVDYXRlZ29yeSgpXCIgdi1tb2RlbD1cImNhdGVnb3J5X25hbWVcIiBAa2V5ZG93bi5lc2M9XCJuZXdfZm9jdXNlZCA9IGZhbHNlXCIgdi1vbjpmb2N1cz1cIm5ld19mb2N1c2VkID0gdHJ1ZVwiIGNsYXNzPVwibmV3X2NhdFwiIHR5cGU9XCJ0ZXh0XCI+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiB2LW9uOmNsaWNrPVwic2F2ZUNhdGVnb3J5KClcIiB2LWlmPVwibmV3X2ZvY3VzZWRcIj7QodC+0LfQtNCw0YLRjDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvbGk+XG4gICAgPC91bD5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG4gICAgZXhwb3J0IGRlZmF1bHQge1xuICAgICAgICBwcm9wczpbJ2NhdGVnb3J5J10sXG4gICAgICAgIG5hbWU6IFwiUmVjdXJzaXZlQ2F0ZWdvcnlcIixcbiAgICAgICAgZGF0YTogKCk9PiB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGNhdGVnb3J5X25hbWU6IG51bGwsXG4gICAgICAgICAgICAgICAgbmV3X2ZvY3VzZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIG5hbWVfaW52YWxpZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgY2hpbGRzOiBbXSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgd2F0Y2g6IHtcbiAgICAgICAgICAgIC8vIGNhdGVnb3JpZXM6IHtcbiAgICAgICAgICAgIC8vICAgICBoYW5kbGVyKG5ld1ZhbCwgb2xkVmFsKXtcbiAgICAgICAgICAgIC8vICAgICAgICAgY29uc29sZS5sb2coMTIzKTtcbiAgICAgICAgICAgIC8vICAgICAgICAgdGhpcy5jYXRlZ29yaWVzID0gbmV3VmFsXG4gICAgICAgICAgICAvLyAgICAgfSxcbiAgICAgICAgICAgIC8vICAgICBkZWVwOiB0cnVlXG4gICAgICAgICAgICAvLyB9XG4gICAgICAgIH0sXG4gICAgICAgIG1vdW50ZWQoKXtcbiAgICAgICAgICAgIHRoaXMuJGV2ZW50QnVzLiRvbignQ2F0ZWdvcnlVcGRhdGVkJywgKGRhdGEpPT57XG4gICAgICAgICAgICAgICAgaWYoZGF0YS5jYXRlZ29yeV9pZCA9PT0gdGhpcy5jYXRlZ29yeS5pZCl7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0Q2hpbGRzKHRoaXMuY2F0ZWdvcnksIHRydWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBjb21wdXRlZDp7XG4gICAgICAgICAgICAvLyBsYXN0Q2hpbGRzKCl7XG4gICAgICAgICAgICAvLyAgICAgcmV0dXJuIEJvb2xlYW4odGhpcy5jaGlsZHMubGVuZ3RoKTtcbiAgICAgICAgICAgIC8vIH1cbiAgICAgICAgfSxcbiAgICAgICAgbWV0aG9kczp7XG4gICAgICAgICAgICBnZXRDaGlsZHMoY2F0ZWdvcnksIGZvcmNlID0gZmFsc2Upe1xuICAgICAgICAgICAgICAgIGlmKGZvcmNlIHx8ICFjYXRlZ29yeS5jaGlsZHMpe1xuICAgICAgICAgICAgICAgICAgICBjYXRlZ29yeS5sb2FkaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kZm9yY2VVcGRhdGUoKTtcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmF4aW9zKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1ldGhvZDogJ2dldCcsXG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6ICcvY2F0ZWdvcmllcy8nICsgY2F0ZWdvcnkuaWQgKyAnL2NoaWxkcmVuJyxcbiAgICAgICAgICAgICAgICAgICAgfSkudGhlbigocmVzcCkgPT4gIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhdGVnb3J5LmNoaWxkcyA9IHJlc3AuZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhdGVnb3J5LnNob3duID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2hpbGRzID0gY2F0ZWdvcnkuY2hpbGRzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhdGVnb3J5LmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJGZvcmNlVXBkYXRlKCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNhdGVnb3J5LnNob3duID0gIWNhdGVnb3J5LnNob3duO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLiRmb3JjZVVwZGF0ZSgpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGlzU2hvd24oY2F0ZWdvcnkpe1xuICAgICAgICAgICAgICAgIHJldHVybiBCb29sZWFuKGNhdGVnb3J5LnNob3duKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwaWNrKGNhdGVnb3J5KXtcbiAgICAgICAgICAgICAgICBsZXQgd20gPSB0aGlzLmdldFVucmVjdXJzaXZlQ29tcG9uZW50KCdTZWxlY3RDYXRlZ29yeURpYWxvZycpO1xuICAgICAgICAgICAgICAgIHdtLnBpY2tDYXRlZ29yeShjYXRlZ29yeSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0VW5yZWN1cnNpdmVDb21wb25lbnQoY29tcG9uZW50TmFtZSkge1xuICAgICAgICAgICAgICAgIGxldCBjb21wb25lbnQgPSBudWxsO1xuICAgICAgICAgICAgICAgIGxldCBwYXJlbnQgPSB0aGlzLiRwYXJlbnQ7XG4gICAgICAgICAgICAgICAgd2hpbGUgKHBhcmVudCAmJiAhY29tcG9uZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXJlbnQuJG9wdGlvbnMubmFtZSA9PT0gY29tcG9uZW50TmFtZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50ID0gcGFyZW50XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcGFyZW50ID0gcGFyZW50LiRwYXJlbnQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBjb21wb25lbnRcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzYXZlQ2F0ZWdvcnkoKXtcbiAgICAgICAgICAgICAgICB3aW5kb3cuYXhpb3Moe1xuICAgICAgICAgICAgICAgICAgICBtZXRob2Q6ICdwb3N0JyxcbiAgICAgICAgICAgICAgICAgICAgdXJsOiAnL2NhdGVnb3JpZXMnLFxuICAgICAgICAgICAgICAgICAgICBkYXRhOntcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6ICAgICAgICAgICB0aGlzLmNhdGVnb3J5X25hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXRlZ29yeV9pZDogICAgdGhpcy5jYXRlZ29yeS5pZCxcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pLnRoZW4oKHJlc3ApID0+ICB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2F0ZWdvcnlfbmFtZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubmV3X2ZvY3VzZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kZXZlbnRCdXMuJGVtaXQoJ0NhdGVnb3J5VXBkYXRlZCcsIHtpZDogcmVzcC5kYXRhLmlkLCBjYXRlZ29yeV9pZDpyZXNwLmRhdGEuY2F0ZWdvcnlfaWR9KTtcbiAgICAgICAgICAgICAgICB9KS5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYoZXJyb3IucmVzcG9uc2UuZGF0YS5tZXNzYWdlcy5uYW1lKVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5uYW1lX2ludmFsaWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBjb21wb25lbnRzOntcbiAgICAgICAgICAgICdSZWN1cnNpdmVDYXRlZ29yeSc6ICAgICAgICAoKSA9PiBpbXBvcnQoLyogd2VicGFja0NodW5rTmFtZTogXCJSZWN1cnNpdmVDYXRlZ29yeVwiICovICAgICAgICAnLi9SZWN1cnNpdmVDYXRlZ29yeScpLFxuICAgICAgICB9XG4gICAgfVxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCI8dGVtcGxhdGU+XG4gICAgPGRpdj5cbiAgICAgICAgPCEtLTxkaXYgY2xhc3M9XCJtb2RhbC1oZWFkZXJcIj4tLT5cbiAgICAgICAgICAgIDwhLS08Zm9ybSBjbGFzcz1cImZsZXggZC1mbGV4IHctMTAwXCI+LS0+XG4gICAgICAgICAgICAgICAgPCEtLTxpbnB1dCB0eXBlPVwidGV4dFwiICBuYW1lPVwiY2F0ZWdvcnlfc2VhcmNoXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2wgc2VhcmNoIG1yLTE1XCIgcGxhY2Vob2xkZXI9XCLQn9C+0LjRgdC6INC60LDRgtC10LPQvtGA0LjQuFwiIHJlcXVpcmVkPVwiXCI+LS0+XG4gICAgICAgICAgICA8IS0tPC9mb3JtPi0tPlxuICAgICAgICA8IS0tPC9kaXY+LS0+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJib3gtYm9keSBpbnNjcm9sbFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJlY3Vyc2VfY2F0ZWdvcmllc1wiIGRhdGEtc2ltcGxlYmFyIHN0eWxlPVwibWF4LWhlaWdodDogNDAwcHg7XCIgPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJiYXNlX2NhdFwiPjwvZGl2PlxuICAgICAgICAgICAgICAgIDxSZWN1cnNpdmVDYXRlZ29yeSB2LWJpbmQ6Y2F0ZWdvcnk9XCJ7aWQ6cm9vdF9jYXRlZ29yeSwgY2hpbGRzOmNhdGVnb3JpZXN9XCIvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwibW9kYWwtZm9vdGVyXCI+XG4gICAgICAgICAgICA8YnV0dG9uIEBjbGljaz1cIiRwYXJlbnQuY2xvc2VEaWFsb2coZGlhbG9nKVwiIGNsYXNzPVwiYnV0dG9uIHdoaXRlXCI+0JfQsNC60YDRi9GC0Yw8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJzeXN0ZW1fbWVzc2FnZVwiPlxuXG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbiAgICBpbXBvcnQgUmVjdXJzaXZlQ2F0ZWdvcnkgZnJvbSBcIi4uLy4uL3NlcnZpY2UvUmVjdXJzaXZlQ2F0ZWdvcnlcIlxuICAgIGV4cG9ydCBkZWZhdWx0IHtcbiAgICAgICAgbmFtZTogXCJTZWxlY3RDYXRlZ29yeURpYWxvZ1wiLFxuICAgICAgICBwcm9wczpbJ2RpYWxvZyddLFxuICAgICAgICBkYXRhOiAoKT0+IHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgY2F0ZWdvcnk6IDEsXG4gICAgICAgICAgICAgICAgY2F0ZWdvcnlfaWQ6IDEsXG4gICAgICAgICAgICAgICAgcGFyZW50X25hbWU6IG51bGwsXG4gICAgICAgICAgICAgICAgY2F0ZWdvcmllczpbXSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgLy8gYmVmb3JlTW91bnQoKXtcbiAgICAgICAgLy8gICAgIHRoaXMuZGlhbG9nID0gdGhpcy4kYXR0cnMuZGlhbG9nO1xuICAgICAgICAvLyB9LFxuICAgICAgICBiZWZvcmVNb3VudCgpe1xuICAgICAgICAgICAgdGhpcy5kaWFsb2cudGl0bGUgPSBcItCS0YvQsdC+0YAg0LrQsNGC0LXQs9C+0YDQuNC4XCI7XG4gICAgICAgICAgICB0aGlzLmRpYWxvZy53aWR0aCA9IDQwMDtcbiAgICAgICAgICAgIHRoaXMucm9vdF9jYXRlZ29yeSA9IHRoaXMuZGlhbG9nLnBhcmFtcy5yb290X2NhdGVnb3J5ID8gdGhpcy5kaWFsb2cucGFyYW1zLnJvb3RfY2F0ZWdvcnkgOiB0aGlzLnJvb3RfY2F0ZWdvcnk7XG4gICAgICAgIH0sXG4gICAgICAgIG1vdW50ZWQoKXtcblxuICAgICAgICAgICAgd2luZG93LmF4aW9zKHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdnZXQnLFxuICAgICAgICAgICAgICAgIHVybDogJy9jYXRlZ29yaWVzLycgKyB0aGlzLnJvb3RfY2F0ZWdvcnkgKyAnL2NoaWxkcmVuJyxcbiAgICAgICAgICAgIH0pLnRoZW4oKHJlc3ApID0+ICB7XG4gICAgICAgICAgICAgICAgdGhpcy5jYXRlZ29yaWVzID0gcmVzcC5kYXRhO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIGNvbXB1dGVkOiB7XG4gICAgICAgIH0sXG4gICAgICAgIG1ldGhvZHM6e1xuICAgICAgICAgICAgcGlja0NhdGVnb3J5KGNhdGVnb3J5KXtcbiAgICAgICAgICAgICAgICB0aGlzLmRpYWxvZy5wYXJhbXMucmVmLnNldENhdGVnb3J5KGNhdGVnb3J5KTtcbiAgICAgICAgICAgICAgICB0aGlzLiRwYXJlbnQuY2xvc2VEaWFsb2codGhpcy5kaWFsb2cpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBjb21wb25lbnRzOntcbiAgICAgICAgICAgIFJlY3Vyc2l2ZUNhdGVnb3J5XG4gICAgICAgIH1cbiAgICB9XG48L3NjcmlwdD5cbiIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXG4gICAgXCJ1bFwiLFxuICAgIFtcbiAgICAgIF92bS5fbChfdm0uY2F0ZWdvcnkuY2hpbGRzLCBmdW5jdGlvbihjYXQpIHtcbiAgICAgICAgcmV0dXJuIF9jKFxuICAgICAgICAgIFwibGlcIixcbiAgICAgICAgICB7IGNsYXNzOiB7IGxvYWRpbmc6IGNhdC5sb2FkaW5nIH0gfSxcbiAgICAgICAgICBbXG4gICAgICAgICAgICBfYyhcImRpdlwiLCB7XG4gICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImljXCIsXG4gICAgICAgICAgICAgIGNsYXNzOiB7IG9wZW46IF92bS5pc1Nob3duKGNhdCkgfSxcbiAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gX3ZtLmdldENoaWxkcyhjYXQpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImNhdGVnb3J5IHBvaW50ZXJcIixcbiAgICAgICAgICAgICAgICBjbGFzczogeyBvcGVuZWQ6IF92bS5pc1Nob3duKGNhdCkgfSxcbiAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3ZtLnBpY2soY2F0KVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgW192bS5fdihcIlxcbiAgICAgICAgICAgIFwiICsgX3ZtLl9zKGNhdC5uYW1lKSArIFwiXFxuICAgICAgICBcIildXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgIGNhdC5jaGlsZHNcbiAgICAgICAgICAgICAgPyBfYyhcIlJlY3Vyc2l2ZUNhdGVnb3J5XCIsIHtcbiAgICAgICAgICAgICAgICAgIGNsYXNzOiB7IHNob3c6IF92bS5pc1Nob3duKGNhdCkgfSxcbiAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IGNhdGVnb3J5OiBjYXQgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIDogX3ZtLl9lKClcbiAgICAgICAgICBdLFxuICAgICAgICAgIDFcbiAgICAgICAgKVxuICAgICAgfSksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX2MoXCJsaVwiLCBbXG4gICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiaWMgbmV3XCIgfSksXG4gICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiY2F0ZWdvcnkgcG9pbnRlciBuZXdcIiB9LCBbXG4gICAgICAgICAgX2MoXCJpbnB1dFwiLCB7XG4gICAgICAgICAgICBkaXJlY3RpdmVzOiBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBuYW1lOiBcIm1vZGVsXCIsXG4gICAgICAgICAgICAgICAgcmF3TmFtZTogXCJ2LW1vZGVsXCIsXG4gICAgICAgICAgICAgICAgdmFsdWU6IF92bS5jYXRlZ29yeV9uYW1lLFxuICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwiY2F0ZWdvcnlfbmFtZVwiXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBzdGF0aWNDbGFzczogXCJuZXdfY2F0XCIsXG4gICAgICAgICAgICBjbGFzczogeyBcImlzLWludmFsaWRcIjogX3ZtLm5hbWVfaW52YWxpZCB9LFxuICAgICAgICAgICAgYXR0cnM6IHsgcGxhY2Vob2xkZXI6IFwi0J3QvtCy0LDRjyDQutCw0YLQtdCz0L7RgNC40Y9cIiwgdHlwZTogXCJ0ZXh0XCIgfSxcbiAgICAgICAgICAgIGRvbVByb3BzOiB7IHZhbHVlOiBfdm0uY2F0ZWdvcnlfbmFtZSB9LFxuICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAga2V5ZG93bjogW1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgICAhJGV2ZW50LnR5cGUuaW5kZXhPZihcImtleVwiKSAmJlxuICAgICAgICAgICAgICAgICAgICBfdm0uX2soJGV2ZW50LmtleUNvZGUsIFwiZW50ZXJcIiwgMTMsICRldmVudC5rZXksIFwiRW50ZXJcIilcbiAgICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgcmV0dXJuIF92bS5zYXZlQ2F0ZWdvcnkoKVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgICEkZXZlbnQudHlwZS5pbmRleE9mKFwia2V5XCIpICYmXG4gICAgICAgICAgICAgICAgICAgIF92bS5faygkZXZlbnQua2V5Q29kZSwgXCJlc2NcIiwgMjcsICRldmVudC5rZXksIFtcbiAgICAgICAgICAgICAgICAgICAgICBcIkVzY1wiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiRXNjYXBlXCJcbiAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgX3ZtLm5ld19mb2N1c2VkID0gZmFsc2VcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIGZvY3VzOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICBfdm0ubmV3X2ZvY3VzZWQgPSB0cnVlXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIGlucHV0OiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICBpZiAoJGV2ZW50LnRhcmdldC5jb21wb3NpbmcpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBfdm0uY2F0ZWdvcnlfbmFtZSA9ICRldmVudC50YXJnZXQudmFsdWVcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pLFxuICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgX3ZtLm5ld19mb2N1c2VkXG4gICAgICAgICAgICA/IF9jKFxuICAgICAgICAgICAgICAgIFwiYnV0dG9uXCIsXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfdm0uc2F2ZUNhdGVnb3J5KClcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgW192bS5fdihcItCh0L7Qt9C00LDRgtGMXCIpXVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICA6IF92bS5fZSgpXG4gICAgICAgIF0pXG4gICAgICBdKVxuICAgIF0sXG4gICAgMlxuICApXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxuXG5leHBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgX3ZtID0gdGhpc1xuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gIHJldHVybiBfYyhcImRpdlwiLCBbXG4gICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJib3gtYm9keSBpbnNjcm9sbFwiIH0sIFtcbiAgICAgIF9jKFxuICAgICAgICBcImRpdlwiLFxuICAgICAgICB7XG4gICAgICAgICAgc3RhdGljQ2xhc3M6IFwicmVjdXJzZV9jYXRlZ29yaWVzXCIsXG4gICAgICAgICAgc3RhdGljU3R5bGU6IHsgXCJtYXgtaGVpZ2h0XCI6IFwiNDAwcHhcIiB9LFxuICAgICAgICAgIGF0dHJzOiB7IFwiZGF0YS1zaW1wbGViYXJcIjogXCJcIiB9XG4gICAgICAgIH0sXG4gICAgICAgIFtcbiAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImJhc2VfY2F0XCIgfSksXG4gICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICBfYyhcIlJlY3Vyc2l2ZUNhdGVnb3J5XCIsIHtcbiAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgIGNhdGVnb3J5OiB7IGlkOiBfdm0ucm9vdF9jYXRlZ29yeSwgY2hpbGRzOiBfdm0uY2F0ZWdvcmllcyB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgXSxcbiAgICAgICAgMVxuICAgICAgKVxuICAgIF0pLFxuICAgIF92bS5fdihcIiBcIiksXG4gICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJtb2RhbC1mb290ZXJcIiB9LCBbXG4gICAgICBfYyhcbiAgICAgICAgXCJidXR0b25cIixcbiAgICAgICAge1xuICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImJ1dHRvbiB3aGl0ZVwiLFxuICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgIHJldHVybiBfdm0uJHBhcmVudC5jbG9zZURpYWxvZyhfdm0uZGlhbG9nKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgW192bS5fdihcItCX0LDQutGA0YvRgtGMXCIpXVxuICAgICAgKVxuICAgIF0pLFxuICAgIF92bS5fdihcIiBcIiksXG4gICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJzeXN0ZW1fbWVzc2FnZVwiIH0pXG4gIF0pXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxuXG5leHBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IiwiaW1wb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSBmcm9tIFwiLi9SZWN1cnNpdmVDYXRlZ29yeS52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9ZWI1NjgwY2Emc2NvcGVkPXRydWUmXCJcbmltcG9ydCBzY3JpcHQgZnJvbSBcIi4vUmVjdXJzaXZlQ2F0ZWdvcnkudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5leHBvcnQgKiBmcm9tIFwiLi9SZWN1cnNpdmVDYXRlZ29yeS52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcblxuXG4vKiBub3JtYWxpemUgY29tcG9uZW50ICovXG5pbXBvcnQgbm9ybWFsaXplciBmcm9tIFwiIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9ydW50aW1lL2NvbXBvbmVudE5vcm1hbGl6ZXIuanNcIlxudmFyIGNvbXBvbmVudCA9IG5vcm1hbGl6ZXIoXG4gIHNjcmlwdCxcbiAgcmVuZGVyLFxuICBzdGF0aWNSZW5kZXJGbnMsXG4gIGZhbHNlLFxuICBudWxsLFxuICBcImViNTY4MGNhXCIsXG4gIG51bGxcbiAgXG4pXG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7XG4gIHZhciBhcGkgPSByZXF1aXJlKFwiQzpcXFxcT3BlblNlcnZlclxcXFxkb21haW5zXFxcXEF1dG9DUk1cXFxcbm9kZV9tb2R1bGVzXFxcXHZ1ZS1ob3QtcmVsb2FkLWFwaVxcXFxkaXN0XFxcXGluZGV4LmpzXCIpXG4gIGFwaS5pbnN0YWxsKHJlcXVpcmUoJ3Z1ZScpKVxuICBpZiAoYXBpLmNvbXBhdGlibGUpIHtcbiAgICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gICAgaWYgKCFhcGkuaXNSZWNvcmRlZCgnZWI1NjgwY2EnKSkge1xuICAgICAgYXBpLmNyZWF0ZVJlY29yZCgnZWI1NjgwY2EnLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbG9hZCgnZWI1NjgwY2EnLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIuL1JlY3Vyc2l2ZUNhdGVnb3J5LnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD1lYjU2ODBjYSZzY29wZWQ9dHJ1ZSZcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgYXBpLnJlcmVuZGVyKCdlYjU2ODBjYScsIHtcbiAgICAgICAgcmVuZGVyOiByZW5kZXIsXG4gICAgICAgIHN0YXRpY1JlbmRlckZuczogc3RhdGljUmVuZGVyRm5zXG4gICAgICB9KVxuICAgIH0pXG4gIH1cbn1cbmNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwicmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvc2VydmljZS9SZWN1cnNpdmVDYXRlZ29yeS52dWVcIlxuZXhwb3J0IGRlZmF1bHQgY29tcG9uZW50LmV4cG9ydHMiLCJpbXBvcnQgbW9kIGZyb20gXCItIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTQtMCEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL1JlY3Vyc2l2ZUNhdGVnb3J5LnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIjsgZXhwb3J0IGRlZmF1bHQgbW9kOyBleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS00LTAhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9SZWN1cnNpdmVDYXRlZ29yeS52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCIiLCJleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy90ZW1wbGF0ZUxvYWRlci5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vUmVjdXJzaXZlQ2F0ZWdvcnkudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPWViNTY4MGNhJnNjb3BlZD10cnVlJlwiIiwiaW1wb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSBmcm9tIFwiLi9TZWxlY3RDYXRlZ29yeURpYWxvZy52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9MTc0YTYwNjAmXCJcbmltcG9ydCBzY3JpcHQgZnJvbSBcIi4vU2VsZWN0Q2F0ZWdvcnlEaWFsb2cudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5leHBvcnQgKiBmcm9tIFwiLi9TZWxlY3RDYXRlZ29yeURpYWxvZy52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcblxuXG4vKiBub3JtYWxpemUgY29tcG9uZW50ICovXG5pbXBvcnQgbm9ybWFsaXplciBmcm9tIFwiIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9ydW50aW1lL2NvbXBvbmVudE5vcm1hbGl6ZXIuanNcIlxudmFyIGNvbXBvbmVudCA9IG5vcm1hbGl6ZXIoXG4gIHNjcmlwdCxcbiAgcmVuZGVyLFxuICBzdGF0aWNSZW5kZXJGbnMsXG4gIGZhbHNlLFxuICBudWxsLFxuICBudWxsLFxuICBudWxsXG4gIFxuKVxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkge1xuICB2YXIgYXBpID0gcmVxdWlyZShcIkM6XFxcXE9wZW5TZXJ2ZXJcXFxcZG9tYWluc1xcXFxBdXRvQ1JNXFxcXG5vZGVfbW9kdWxlc1xcXFx2dWUtaG90LXJlbG9hZC1hcGlcXFxcZGlzdFxcXFxpbmRleC5qc1wiKVxuICBhcGkuaW5zdGFsbChyZXF1aXJlKCd2dWUnKSlcbiAgaWYgKGFwaS5jb21wYXRpYmxlKSB7XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICAgIGlmICghYXBpLmlzUmVjb3JkZWQoJzE3NGE2MDYwJykpIHtcbiAgICAgIGFwaS5jcmVhdGVSZWNvcmQoJzE3NGE2MDYwJywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZWxvYWQoJzE3NGE2MDYwJywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfVxuICAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiLi9TZWxlY3RDYXRlZ29yeURpYWxvZy52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9MTc0YTYwNjAmXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGFwaS5yZXJlbmRlcignMTc0YTYwNjAnLCB7XG4gICAgICAgIHJlbmRlcjogcmVuZGVyLFxuICAgICAgICBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZuc1xuICAgICAgfSlcbiAgICB9KVxuICB9XG59XG5jb21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcInJlc291cmNlcy9qcy9jb21wb25lbnRzL3RlbXBsYXRlL0RpYWxvZ3MvU2VsZWN0Q2F0ZWdvcnlEaWFsb2cudnVlXCJcbmV4cG9ydCBkZWZhdWx0IGNvbXBvbmVudC5leHBvcnRzIiwiaW1wb3J0IG1vZCBmcm9tIFwiLSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS00LTAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9TZWxlY3RDYXRlZ29yeURpYWxvZy52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tNC0wIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vU2VsZWN0Q2F0ZWdvcnlEaWFsb2cudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiIiwiZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvdGVtcGxhdGVMb2FkZXIuanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL1NlbGVjdENhdGVnb3J5RGlhbG9nLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD0xNzRhNjA2MCZcIiJdLCJzb3VyY2VSb290IjoiIn0=