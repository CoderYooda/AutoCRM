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
      wm.pick(category);
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
    pick: function pick(category) {
      this.dialog.params.ref.setParent(category);
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
    _vm._m(0),
    _vm._v(" "),
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
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "modal-header" }, [
      _c("form", { staticClass: "flex d-flex w-100" }, [
        _c("input", {
          staticClass: "form-control search mr-15",
          attrs: {
            type: "text",
            name: "category_search",
            placeholder: "Поиск категории",
            required: ""
          }
        })
      ])
    ])
  }
]
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvc2VydmljZS9SZWN1cnNpdmVDYXRlZ29yeS52dWUiLCJ3ZWJwYWNrOi8vL3Jlc291cmNlcy9qcy9jb21wb25lbnRzL3RlbXBsYXRlL0RpYWxvZ3MvU2VsZWN0Q2F0ZWdvcnlEaWFsb2cudnVlIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9qcy9jb21wb25lbnRzL3NlcnZpY2UvUmVjdXJzaXZlQ2F0ZWdvcnkudnVlP2UwMDMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvdGVtcGxhdGUvRGlhbG9ncy9TZWxlY3RDYXRlZ29yeURpYWxvZy52dWU/MmRjMSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvY29tcG9uZW50cy9zZXJ2aWNlL1JlY3Vyc2l2ZUNhdGVnb3J5LnZ1ZSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvY29tcG9uZW50cy9zZXJ2aWNlL1JlY3Vyc2l2ZUNhdGVnb3J5LnZ1ZT8zZGUxIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9qcy9jb21wb25lbnRzL3NlcnZpY2UvUmVjdXJzaXZlQ2F0ZWdvcnkudnVlP2Y4MjgiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvdGVtcGxhdGUvRGlhbG9ncy9TZWxlY3RDYXRlZ29yeURpYWxvZy52dWUiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvdGVtcGxhdGUvRGlhbG9ncy9TZWxlY3RDYXRlZ29yeURpYWxvZy52dWU/NjVmMCIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvY29tcG9uZW50cy90ZW1wbGF0ZS9EaWFsb2dzL1NlbGVjdENhdGVnb3J5RGlhbG9nLnZ1ZT8zODMwIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9CQTtBQUNBLHFCQURBO0FBRUEsMkJBRkE7QUFHQTtBQUNBO0FBQ0EseUJB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QUE7QUFBQSx3Q0FBdU0sQ0FBZ0IsNlBBQUcsRUFBQyxDOzs7Ozs7Ozs7Ozs7QUNBM047QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7Ozs7Ozs7Ozs7O0FDQUE7QUFBQTtBQUFBO0FBQUE7QUFBbUc7QUFDM0I7QUFDTDs7O0FBR25FO0FBQ21HO0FBQ25HLGdCQUFnQiwyR0FBVTtBQUMxQixFQUFFLDBGQUFNO0FBQ1IsRUFBRSwrRkFBTTtBQUNSLEVBQUUsd0dBQWU7QUFDakI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxJQUFJLEtBQVUsRUFBRSxZQWlCZjtBQUNEO0FBQ2UsZ0Y7Ozs7Ozs7Ozs7OztBQ3RDZjtBQUFBO0FBQUEsd0NBQWdOLENBQWdCLGdRQUFHLEVBQUMsQzs7Ozs7Ozs7Ozs7O0FDQXBPO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSIsImZpbGUiOiJzZWxlY3RDYXRlZ29yeURpYWxvZy5qcyIsInNvdXJjZXNDb250ZW50IjpbIjx0ZW1wbGF0ZT5cbiAgICA8dWw+XG4gICAgICAgIDxsaSB2LWJpbmQ6Y2xhc3M9XCJ7J2xvYWRpbmcnIDogY2F0LmxvYWRpbmd9XCIgdi1mb3I9XCJjYXQgaW4gY2F0ZWdvcnkuY2hpbGRzXCI+XG4gICAgICAgICAgICA8ZGl2IHYtb246Y2xpY2s9XCJnZXRDaGlsZHMoY2F0KVwiIGNsYXNzPVwiaWNcIiB2LWJpbmQ6Y2xhc3M9XCJ7J29wZW4nIDogaXNTaG93bihjYXQpfVwiPjwvZGl2PlxuICAgICAgICAgICAgPGRpdiB2LW9uOmNsaWNrPVwicGljayhjYXQpXCIgY2xhc3M9XCJjYXRlZ29yeSBwb2ludGVyXCIgdi1iaW5kOmNsYXNzPVwieydvcGVuZWQnIDogaXNTaG93bihjYXQpfVwiPlxuICAgICAgICAgICAgICAgIHt7IGNhdC5uYW1lIH19XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxSZWN1cnNpdmVDYXRlZ29yeSB2LWlmPVwiY2F0LmNoaWxkc1wiIHYtYmluZDpjbGFzcz1cInsnc2hvdycgOiBpc1Nob3duKGNhdCl9XCIgdi1iaW5kOmNhdGVnb3J5PVwiY2F0XCIgLz5cbiAgICAgICAgPC9saT5cbiAgICAgICAgPGxpPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImljIG5ld1wiPjwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhdGVnb3J5IHBvaW50ZXIgbmV3XCI+XG4gICAgICAgICAgICAgICAgPGlucHV0IHBsYWNlaG9sZGVyPVwi0J3QvtCy0LDRjyDQutCw0YLQtdCz0L7RgNC40Y9cIiB2LWJpbmQ6Y2xhc3M9XCJ7J2lzLWludmFsaWQnIDogbmFtZV9pbnZhbGlkfVwiIEBrZXlkb3duLmVudGVyPVwic2F2ZUNhdGVnb3J5KClcIiB2LW1vZGVsPVwiY2F0ZWdvcnlfbmFtZVwiIEBrZXlkb3duLmVzYz1cIm5ld19mb2N1c2VkID0gZmFsc2VcIiB2LW9uOmZvY3VzPVwibmV3X2ZvY3VzZWQgPSB0cnVlXCIgY2xhc3M9XCJuZXdfY2F0XCIgdHlwZT1cInRleHRcIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIHYtb246Y2xpY2s9XCJzYXZlQ2F0ZWdvcnkoKVwiIHYtaWY9XCJuZXdfZm9jdXNlZFwiPtCh0L7Qt9C00LDRgtGMPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9saT5cbiAgICA8L3VsPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbiAgICBleHBvcnQgZGVmYXVsdCB7XG4gICAgICAgIHByb3BzOlsnY2F0ZWdvcnknXSxcbiAgICAgICAgbmFtZTogXCJSZWN1cnNpdmVDYXRlZ29yeVwiLFxuICAgICAgICBkYXRhOiAoKT0+IHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgY2F0ZWdvcnlfbmFtZTogbnVsbCxcbiAgICAgICAgICAgICAgICBuZXdfZm9jdXNlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgbmFtZV9pbnZhbGlkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBjaGlsZHM6IFtdLFxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB3YXRjaDoge1xuICAgICAgICAgICAgLy8gY2F0ZWdvcmllczoge1xuICAgICAgICAgICAgLy8gICAgIGhhbmRsZXIobmV3VmFsLCBvbGRWYWwpe1xuICAgICAgICAgICAgLy8gICAgICAgICBjb25zb2xlLmxvZygxMjMpO1xuICAgICAgICAgICAgLy8gICAgICAgICB0aGlzLmNhdGVnb3JpZXMgPSBuZXdWYWxcbiAgICAgICAgICAgIC8vICAgICB9LFxuICAgICAgICAgICAgLy8gICAgIGRlZXA6IHRydWVcbiAgICAgICAgICAgIC8vIH1cbiAgICAgICAgfSxcbiAgICAgICAgbW91bnRlZCgpe1xuICAgICAgICAgICAgdGhpcy4kZXZlbnRCdXMuJG9uKCdDYXRlZ29yeVVwZGF0ZWQnLCAoZGF0YSk9PntcbiAgICAgICAgICAgICAgICBpZihkYXRhLmNhdGVnb3J5X2lkID09PSB0aGlzLmNhdGVnb3J5LmlkKXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRDaGlsZHModGhpcy5jYXRlZ29yeSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIGNvbXB1dGVkOntcbiAgICAgICAgICAgIC8vIGxhc3RDaGlsZHMoKXtcbiAgICAgICAgICAgIC8vICAgICByZXR1cm4gQm9vbGVhbih0aGlzLmNoaWxkcy5sZW5ndGgpO1xuICAgICAgICAgICAgLy8gfVxuICAgICAgICB9LFxuICAgICAgICBtZXRob2RzOntcbiAgICAgICAgICAgIGdldENoaWxkcyhjYXRlZ29yeSwgZm9yY2UgPSBmYWxzZSl7XG4gICAgICAgICAgICAgICAgaWYoZm9yY2UgfHwgIWNhdGVnb3J5LmNoaWxkcyl7XG4gICAgICAgICAgICAgICAgICAgIGNhdGVnb3J5LmxvYWRpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLiRmb3JjZVVwZGF0ZSgpO1xuICAgICAgICAgICAgICAgICAgICB3aW5kb3cuYXhpb3Moe1xuICAgICAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiAnZ2V0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDogJy9jYXRlZ29yaWVzLycgKyBjYXRlZ29yeS5pZCArICcvY2hpbGRyZW4nLFxuICAgICAgICAgICAgICAgICAgICB9KS50aGVuKChyZXNwKSA9PiAge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2F0ZWdvcnkuY2hpbGRzID0gcmVzcC5kYXRhO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2F0ZWdvcnkuc2hvd24gPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGlsZHMgPSBjYXRlZ29yeS5jaGlsZHMubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2F0ZWdvcnkubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kZm9yY2VVcGRhdGUoKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY2F0ZWdvcnkuc2hvd24gPSAhY2F0ZWdvcnkuc2hvd247XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJGZvcmNlVXBkYXRlKCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaXNTaG93bihjYXRlZ29yeSl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIEJvb2xlYW4oY2F0ZWdvcnkuc2hvd24pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHBpY2soY2F0ZWdvcnkpe1xuICAgICAgICAgICAgICAgIGxldCB3bSA9IHRoaXMuZ2V0VW5yZWN1cnNpdmVDb21wb25lbnQoJ1NlbGVjdENhdGVnb3J5RGlhbG9nJyk7XG4gICAgICAgICAgICAgICAgd20ucGljayhjYXRlZ29yeSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0VW5yZWN1cnNpdmVDb21wb25lbnQoY29tcG9uZW50TmFtZSkge1xuICAgICAgICAgICAgICAgIGxldCBjb21wb25lbnQgPSBudWxsO1xuICAgICAgICAgICAgICAgIGxldCBwYXJlbnQgPSB0aGlzLiRwYXJlbnQ7XG4gICAgICAgICAgICAgICAgd2hpbGUgKHBhcmVudCAmJiAhY29tcG9uZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXJlbnQuJG9wdGlvbnMubmFtZSA9PT0gY29tcG9uZW50TmFtZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50ID0gcGFyZW50XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcGFyZW50ID0gcGFyZW50LiRwYXJlbnQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBjb21wb25lbnRcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzYXZlQ2F0ZWdvcnkoKXtcbiAgICAgICAgICAgICAgICB3aW5kb3cuYXhpb3Moe1xuICAgICAgICAgICAgICAgICAgICBtZXRob2Q6ICdwb3N0JyxcbiAgICAgICAgICAgICAgICAgICAgdXJsOiAnL2NhdGVnb3JpZXMnLFxuICAgICAgICAgICAgICAgICAgICBkYXRhOntcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6ICAgICAgICAgICB0aGlzLmNhdGVnb3J5X25hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXRlZ29yeV9pZDogICAgdGhpcy5jYXRlZ29yeS5pZCxcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pLnRoZW4oKHJlc3ApID0+ICB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2F0ZWdvcnlfbmFtZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubmV3X2ZvY3VzZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kZXZlbnRCdXMuJGVtaXQoJ0NhdGVnb3J5VXBkYXRlZCcsIHtpZDogcmVzcC5kYXRhLmlkLCBjYXRlZ29yeV9pZDpyZXNwLmRhdGEuY2F0ZWdvcnlfaWR9KTtcbiAgICAgICAgICAgICAgICB9KS5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYoZXJyb3IucmVzcG9uc2UuZGF0YS5tZXNzYWdlcy5uYW1lKVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5uYW1lX2ludmFsaWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBjb21wb25lbnRzOntcbiAgICAgICAgICAgICdSZWN1cnNpdmVDYXRlZ29yeSc6ICAgICAgICAoKSA9PiBpbXBvcnQoLyogd2VicGFja0NodW5rTmFtZTogXCJSZWN1cnNpdmVDYXRlZ29yeVwiICovICAgICAgICAnLi9SZWN1cnNpdmVDYXRlZ29yeScpLFxuICAgICAgICB9XG4gICAgfVxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCI8dGVtcGxhdGU+XG4gICAgPGRpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGFsLWhlYWRlclwiPlxuICAgICAgICAgICAgPGZvcm0gY2xhc3M9XCJmbGV4IGQtZmxleCB3LTEwMFwiPlxuICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiICBuYW1lPVwiY2F0ZWdvcnlfc2VhcmNoXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2wgc2VhcmNoIG1yLTE1XCIgcGxhY2Vob2xkZXI9XCLQn9C+0LjRgdC6INC60LDRgtC10LPQvtGA0LjQuFwiIHJlcXVpcmVkPVwiXCI+XG4gICAgICAgICAgICA8L2Zvcm0+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYm94LWJvZHkgaW5zY3JvbGxcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyZWN1cnNlX2NhdGVnb3JpZXNcIiBkYXRhLXNpbXBsZWJhciBzdHlsZT1cIm1heC1oZWlnaHQ6IDQwMHB4O1wiID5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYmFzZV9jYXRcIj48L2Rpdj5cbiAgICAgICAgICAgICAgICA8UmVjdXJzaXZlQ2F0ZWdvcnkgdi1iaW5kOmNhdGVnb3J5PVwie2lkOnJvb3RfY2F0ZWdvcnksIGNoaWxkczpjYXRlZ29yaWVzfVwiLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGFsLWZvb3RlclwiPlxuICAgICAgICAgICAgPGJ1dHRvbiBAY2xpY2s9XCIkcGFyZW50LmNsb3NlRGlhbG9nKGRpYWxvZylcIiBjbGFzcz1cImJ1dHRvbiB3aGl0ZVwiPtCX0LDQutGA0YvRgtGMPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwic3lzdGVtX21lc3NhZ2VcIj5cblxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG4gICAgaW1wb3J0IFJlY3Vyc2l2ZUNhdGVnb3J5IGZyb20gXCIuLi8uLi9zZXJ2aWNlL1JlY3Vyc2l2ZUNhdGVnb3J5XCJcbiAgICBleHBvcnQgZGVmYXVsdCB7XG4gICAgICAgIG5hbWU6IFwiU2VsZWN0Q2F0ZWdvcnlEaWFsb2dcIixcbiAgICAgICAgcHJvcHM6WydkaWFsb2cnXSxcbiAgICAgICAgZGF0YTogKCk9PiB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGNhdGVnb3J5OiAxLFxuICAgICAgICAgICAgICAgIGNhdGVnb3J5X2lkOiAxLFxuICAgICAgICAgICAgICAgIHBhcmVudF9uYW1lOiBudWxsLFxuICAgICAgICAgICAgICAgIGNhdGVnb3JpZXM6W10sXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIC8vIGJlZm9yZU1vdW50KCl7XG4gICAgICAgIC8vICAgICB0aGlzLmRpYWxvZyA9IHRoaXMuJGF0dHJzLmRpYWxvZztcbiAgICAgICAgLy8gfSxcbiAgICAgICAgYmVmb3JlTW91bnQoKXtcbiAgICAgICAgICAgIHRoaXMuZGlhbG9nLnRpdGxlID0gXCLQktGL0LHQvtGAINC60LDRgtC10LPQvtGA0LjQuFwiO1xuICAgICAgICAgICAgdGhpcy5yb290X2NhdGVnb3J5ID0gdGhpcy5kaWFsb2cucGFyYW1zLnJvb3RfY2F0ZWdvcnkgPyB0aGlzLmRpYWxvZy5wYXJhbXMucm9vdF9jYXRlZ29yeSA6IHRoaXMucm9vdF9jYXRlZ29yeTtcbiAgICAgICAgfSxcbiAgICAgICAgbW91bnRlZCgpe1xuXG4gICAgICAgICAgICB3aW5kb3cuYXhpb3Moe1xuICAgICAgICAgICAgICAgIG1ldGhvZDogJ2dldCcsXG4gICAgICAgICAgICAgICAgdXJsOiAnL2NhdGVnb3JpZXMvJyArIHRoaXMucm9vdF9jYXRlZ29yeSArICcvY2hpbGRyZW4nLFxuICAgICAgICAgICAgfSkudGhlbigocmVzcCkgPT4gIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNhdGVnb3JpZXMgPSByZXNwLmRhdGE7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgY29tcHV0ZWQ6IHtcbiAgICAgICAgfSxcbiAgICAgICAgbWV0aG9kczp7XG4gICAgICAgICAgICBwaWNrKGNhdGVnb3J5KXtcbiAgICAgICAgICAgICAgICB0aGlzLmRpYWxvZy5wYXJhbXMucmVmLnNldFBhcmVudChjYXRlZ29yeSk7XG4gICAgICAgICAgICAgICAgdGhpcy4kcGFyZW50LmNsb3NlRGlhbG9nKHRoaXMuZGlhbG9nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgY29tcG9uZW50czp7XG4gICAgICAgICAgICBSZWN1cnNpdmVDYXRlZ29yeVxuICAgICAgICB9XG4gICAgfVxuPC9zY3JpcHQ+XG4iLCJ2YXIgcmVuZGVyID0gZnVuY3Rpb24oKSB7XG4gIHZhciBfdm0gPSB0aGlzXG4gIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgcmV0dXJuIF9jKFxuICAgIFwidWxcIixcbiAgICBbXG4gICAgICBfdm0uX2woX3ZtLmNhdGVnb3J5LmNoaWxkcywgZnVuY3Rpb24oY2F0KSB7XG4gICAgICAgIHJldHVybiBfYyhcbiAgICAgICAgICBcImxpXCIsXG4gICAgICAgICAgeyBjbGFzczogeyBsb2FkaW5nOiBjYXQubG9hZGluZyB9IH0sXG4gICAgICAgICAgW1xuICAgICAgICAgICAgX2MoXCJkaXZcIiwge1xuICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJpY1wiLFxuICAgICAgICAgICAgICBjbGFzczogeyBvcGVuOiBfdm0uaXNTaG93bihjYXQpIH0sXG4gICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIF92bS5nZXRDaGlsZHMoY2F0KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJjYXRlZ29yeSBwb2ludGVyXCIsXG4gICAgICAgICAgICAgICAgY2xhc3M6IHsgb3BlbmVkOiBfdm0uaXNTaG93bihjYXQpIH0sXG4gICAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF92bS5waWNrKGNhdClcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIFtfdm0uX3YoXCJcXG4gICAgICAgICAgICBcIiArIF92bS5fcyhjYXQubmFtZSkgKyBcIlxcbiAgICAgICAgXCIpXVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICBjYXQuY2hpbGRzXG4gICAgICAgICAgICAgID8gX2MoXCJSZWN1cnNpdmVDYXRlZ29yeVwiLCB7XG4gICAgICAgICAgICAgICAgICBjbGFzczogeyBzaG93OiBfdm0uaXNTaG93bihjYXQpIH0sXG4gICAgICAgICAgICAgICAgICBhdHRyczogeyBjYXRlZ29yeTogY2F0IH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICA6IF92bS5fZSgpXG4gICAgICAgICAgXSxcbiAgICAgICAgICAxXG4gICAgICAgIClcbiAgICAgIH0pLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF9jKFwibGlcIiwgW1xuICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImljIG5ld1wiIH0pLFxuICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImNhdGVnb3J5IHBvaW50ZXIgbmV3XCIgfSwgW1xuICAgICAgICAgIF9jKFwiaW5wdXRcIiwge1xuICAgICAgICAgICAgZGlyZWN0aXZlczogW1xuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbmFtZTogXCJtb2RlbFwiLFxuICAgICAgICAgICAgICAgIHJhd05hbWU6IFwidi1tb2RlbFwiLFxuICAgICAgICAgICAgICAgIHZhbHVlOiBfdm0uY2F0ZWdvcnlfbmFtZSxcbiAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcImNhdGVnb3J5X25hbWVcIlxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwibmV3X2NhdFwiLFxuICAgICAgICAgICAgY2xhc3M6IHsgXCJpcy1pbnZhbGlkXCI6IF92bS5uYW1lX2ludmFsaWQgfSxcbiAgICAgICAgICAgIGF0dHJzOiB7IHBsYWNlaG9sZGVyOiBcItCd0L7QstCw0Y8g0LrQsNGC0LXQs9C+0YDQuNGPXCIsIHR5cGU6IFwidGV4dFwiIH0sXG4gICAgICAgICAgICBkb21Qcm9wczogeyB2YWx1ZTogX3ZtLmNhdGVnb3J5X25hbWUgfSxcbiAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgIGtleWRvd246IFtcbiAgICAgICAgICAgICAgICBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICAgISRldmVudC50eXBlLmluZGV4T2YoXCJrZXlcIikgJiZcbiAgICAgICAgICAgICAgICAgICAgX3ZtLl9rKCRldmVudC5rZXlDb2RlLCBcImVudGVyXCIsIDEzLCAkZXZlbnQua2V5LCBcIkVudGVyXCIpXG4gICAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIHJldHVybiBfdm0uc2F2ZUNhdGVnb3J5KClcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgICAhJGV2ZW50LnR5cGUuaW5kZXhPZihcImtleVwiKSAmJlxuICAgICAgICAgICAgICAgICAgICBfdm0uX2soJGV2ZW50LmtleUNvZGUsIFwiZXNjXCIsIDI3LCAkZXZlbnQua2V5LCBbXG4gICAgICAgICAgICAgICAgICAgICAgXCJFc2NcIixcbiAgICAgICAgICAgICAgICAgICAgICBcIkVzY2FwZVwiXG4gICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIF92bS5uZXdfZm9jdXNlZCA9IGZhbHNlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICBmb2N1czogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgX3ZtLm5ld19mb2N1c2VkID0gdHJ1ZVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBpbnB1dDogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgaWYgKCRldmVudC50YXJnZXQuY29tcG9zaW5nKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgX3ZtLmNhdGVnb3J5X25hbWUgPSAkZXZlbnQudGFyZ2V0LnZhbHVlXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KSxcbiAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgIF92bS5uZXdfZm9jdXNlZFxuICAgICAgICAgICAgPyBfYyhcbiAgICAgICAgICAgICAgICBcImJ1dHRvblwiLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3ZtLnNhdmVDYXRlZ29yeSgpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFtfdm0uX3YoXCLQodC+0LfQtNCw0YLRjFwiKV1cbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgOiBfdm0uX2UoKVxuICAgICAgICBdKVxuICAgICAgXSlcbiAgICBdLFxuICAgIDJcbiAgKVxufVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtdXG5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcblxuZXhwb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXCJkaXZcIiwgW1xuICAgIF92bS5fbSgwKSxcbiAgICBfdm0uX3YoXCIgXCIpLFxuICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiYm94LWJvZHkgaW5zY3JvbGxcIiB9LCBbXG4gICAgICBfYyhcbiAgICAgICAgXCJkaXZcIixcbiAgICAgICAge1xuICAgICAgICAgIHN0YXRpY0NsYXNzOiBcInJlY3Vyc2VfY2F0ZWdvcmllc1wiLFxuICAgICAgICAgIHN0YXRpY1N0eWxlOiB7IFwibWF4LWhlaWdodFwiOiBcIjQwMHB4XCIgfSxcbiAgICAgICAgICBhdHRyczogeyBcImRhdGEtc2ltcGxlYmFyXCI6IFwiXCIgfVxuICAgICAgICB9LFxuICAgICAgICBbXG4gICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJiYXNlX2NhdFwiIH0pLFxuICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgX2MoXCJSZWN1cnNpdmVDYXRlZ29yeVwiLCB7XG4gICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICBjYXRlZ29yeTogeyBpZDogX3ZtLnJvb3RfY2F0ZWdvcnksIGNoaWxkczogX3ZtLmNhdGVnb3JpZXMgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgIF0sXG4gICAgICAgIDFcbiAgICAgIClcbiAgICBdKSxcbiAgICBfdm0uX3YoXCIgXCIpLFxuICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwibW9kYWwtZm9vdGVyXCIgfSwgW1xuICAgICAgX2MoXG4gICAgICAgIFwiYnV0dG9uXCIsXG4gICAgICAgIHtcbiAgICAgICAgICBzdGF0aWNDbGFzczogXCJidXR0b24gd2hpdGVcIixcbiAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICByZXR1cm4gX3ZtLiRwYXJlbnQuY2xvc2VEaWFsb2coX3ZtLmRpYWxvZylcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFtfdm0uX3YoXCLQl9Cw0LrRgNGL0YLRjFwiKV1cbiAgICAgIClcbiAgICBdKSxcbiAgICBfdm0uX3YoXCIgXCIpLFxuICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwic3lzdGVtX21lc3NhZ2VcIiB9KVxuICBdKVxufVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtcbiAgZnVuY3Rpb24oKSB7XG4gICAgdmFyIF92bSA9IHRoaXNcbiAgICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgICByZXR1cm4gX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJtb2RhbC1oZWFkZXJcIiB9LCBbXG4gICAgICBfYyhcImZvcm1cIiwgeyBzdGF0aWNDbGFzczogXCJmbGV4IGQtZmxleCB3LTEwMFwiIH0sIFtcbiAgICAgICAgX2MoXCJpbnB1dFwiLCB7XG4gICAgICAgICAgc3RhdGljQ2xhc3M6IFwiZm9ybS1jb250cm9sIHNlYXJjaCBtci0xNVwiLFxuICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICB0eXBlOiBcInRleHRcIixcbiAgICAgICAgICAgIG5hbWU6IFwiY2F0ZWdvcnlfc2VhcmNoXCIsXG4gICAgICAgICAgICBwbGFjZWhvbGRlcjogXCLQn9C+0LjRgdC6INC60LDRgtC10LPQvtGA0LjQuFwiLFxuICAgICAgICAgICAgcmVxdWlyZWQ6IFwiXCJcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICBdKVxuICAgIF0pXG4gIH1cbl1cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxuXG5leHBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IiwiaW1wb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSBmcm9tIFwiLi9SZWN1cnNpdmVDYXRlZ29yeS52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9ZWI1NjgwY2Emc2NvcGVkPXRydWUmXCJcbmltcG9ydCBzY3JpcHQgZnJvbSBcIi4vUmVjdXJzaXZlQ2F0ZWdvcnkudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5leHBvcnQgKiBmcm9tIFwiLi9SZWN1cnNpdmVDYXRlZ29yeS52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcblxuXG4vKiBub3JtYWxpemUgY29tcG9uZW50ICovXG5pbXBvcnQgbm9ybWFsaXplciBmcm9tIFwiIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9ydW50aW1lL2NvbXBvbmVudE5vcm1hbGl6ZXIuanNcIlxudmFyIGNvbXBvbmVudCA9IG5vcm1hbGl6ZXIoXG4gIHNjcmlwdCxcbiAgcmVuZGVyLFxuICBzdGF0aWNSZW5kZXJGbnMsXG4gIGZhbHNlLFxuICBudWxsLFxuICBcImViNTY4MGNhXCIsXG4gIG51bGxcbiAgXG4pXG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7XG4gIHZhciBhcGkgPSByZXF1aXJlKFwiQzpcXFxcT3BlblNlcnZlclxcXFxkb21haW5zXFxcXEF1dG9DUk1cXFxcbm9kZV9tb2R1bGVzXFxcXHZ1ZS1ob3QtcmVsb2FkLWFwaVxcXFxkaXN0XFxcXGluZGV4LmpzXCIpXG4gIGFwaS5pbnN0YWxsKHJlcXVpcmUoJ3Z1ZScpKVxuICBpZiAoYXBpLmNvbXBhdGlibGUpIHtcbiAgICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gICAgaWYgKCFhcGkuaXNSZWNvcmRlZCgnZWI1NjgwY2EnKSkge1xuICAgICAgYXBpLmNyZWF0ZVJlY29yZCgnZWI1NjgwY2EnLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbG9hZCgnZWI1NjgwY2EnLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIuL1JlY3Vyc2l2ZUNhdGVnb3J5LnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD1lYjU2ODBjYSZzY29wZWQ9dHJ1ZSZcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgYXBpLnJlcmVuZGVyKCdlYjU2ODBjYScsIHtcbiAgICAgICAgcmVuZGVyOiByZW5kZXIsXG4gICAgICAgIHN0YXRpY1JlbmRlckZuczogc3RhdGljUmVuZGVyRm5zXG4gICAgICB9KVxuICAgIH0pXG4gIH1cbn1cbmNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwicmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvc2VydmljZS9SZWN1cnNpdmVDYXRlZ29yeS52dWVcIlxuZXhwb3J0IGRlZmF1bHQgY29tcG9uZW50LmV4cG9ydHMiLCJpbXBvcnQgbW9kIGZyb20gXCItIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTQtMCEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL1JlY3Vyc2l2ZUNhdGVnb3J5LnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIjsgZXhwb3J0IGRlZmF1bHQgbW9kOyBleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS00LTAhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9SZWN1cnNpdmVDYXRlZ29yeS52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCIiLCJleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy90ZW1wbGF0ZUxvYWRlci5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vUmVjdXJzaXZlQ2F0ZWdvcnkudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPWViNTY4MGNhJnNjb3BlZD10cnVlJlwiIiwiaW1wb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSBmcm9tIFwiLi9TZWxlY3RDYXRlZ29yeURpYWxvZy52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9MTc0YTYwNjAmXCJcbmltcG9ydCBzY3JpcHQgZnJvbSBcIi4vU2VsZWN0Q2F0ZWdvcnlEaWFsb2cudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5leHBvcnQgKiBmcm9tIFwiLi9TZWxlY3RDYXRlZ29yeURpYWxvZy52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcblxuXG4vKiBub3JtYWxpemUgY29tcG9uZW50ICovXG5pbXBvcnQgbm9ybWFsaXplciBmcm9tIFwiIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9ydW50aW1lL2NvbXBvbmVudE5vcm1hbGl6ZXIuanNcIlxudmFyIGNvbXBvbmVudCA9IG5vcm1hbGl6ZXIoXG4gIHNjcmlwdCxcbiAgcmVuZGVyLFxuICBzdGF0aWNSZW5kZXJGbnMsXG4gIGZhbHNlLFxuICBudWxsLFxuICBudWxsLFxuICBudWxsXG4gIFxuKVxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkge1xuICB2YXIgYXBpID0gcmVxdWlyZShcIkM6XFxcXE9wZW5TZXJ2ZXJcXFxcZG9tYWluc1xcXFxBdXRvQ1JNXFxcXG5vZGVfbW9kdWxlc1xcXFx2dWUtaG90LXJlbG9hZC1hcGlcXFxcZGlzdFxcXFxpbmRleC5qc1wiKVxuICBhcGkuaW5zdGFsbChyZXF1aXJlKCd2dWUnKSlcbiAgaWYgKGFwaS5jb21wYXRpYmxlKSB7XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICAgIGlmICghYXBpLmlzUmVjb3JkZWQoJzE3NGE2MDYwJykpIHtcbiAgICAgIGFwaS5jcmVhdGVSZWNvcmQoJzE3NGE2MDYwJywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZWxvYWQoJzE3NGE2MDYwJywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfVxuICAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiLi9TZWxlY3RDYXRlZ29yeURpYWxvZy52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9MTc0YTYwNjAmXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGFwaS5yZXJlbmRlcignMTc0YTYwNjAnLCB7XG4gICAgICAgIHJlbmRlcjogcmVuZGVyLFxuICAgICAgICBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZuc1xuICAgICAgfSlcbiAgICB9KVxuICB9XG59XG5jb21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcInJlc291cmNlcy9qcy9jb21wb25lbnRzL3RlbXBsYXRlL0RpYWxvZ3MvU2VsZWN0Q2F0ZWdvcnlEaWFsb2cudnVlXCJcbmV4cG9ydCBkZWZhdWx0IGNvbXBvbmVudC5leHBvcnRzIiwiaW1wb3J0IG1vZCBmcm9tIFwiLSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS00LTAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9TZWxlY3RDYXRlZ29yeURpYWxvZy52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tNC0wIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vU2VsZWN0Q2F0ZWdvcnlEaWFsb2cudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiIiwiZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvdGVtcGxhdGVMb2FkZXIuanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL1NlbGVjdENhdGVnb3J5RGlhbG9nLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD0xNzRhNjA2MCZcIiJdLCJzb3VyY2VSb290IjoiIn0=