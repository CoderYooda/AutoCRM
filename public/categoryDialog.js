(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["categoryDialog"],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/template/Dialogs/CategoryDialog.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/template/Dialogs/CategoryDialog.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _mixins_validateMixin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../mixins/validateMixin */ "./resources/js/components/mixins/validateMixin.js");
/* harmony import */ var _service_FormInput__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../service/FormInput */ "./resources/js/components/service/FormInput.vue");
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
  name: "CategoryDialog",
  props: ['dialog'],
  mixins: [_mixins_validateMixin__WEBPACK_IMPORTED_MODULE_0__["default"]],
  data: function data() {
    return {
      category_id: 1,
      parent_name: null,
      id: null,
      image: '/images/no_image.png',
      image_id: null,
      image_file: null,
      name: null,
      loading: false,
      messages: {}
    };
  },
  // beforeMount(){
  //     this.dialog = this.$attrs.dialog;
  // },
  mounted: function mounted() {
    var _this = this;

    if (this.dialog.params && this.dialog.params.selected_category) {
      var category_id = this.dialog.params.selected_category;

      if (category_id && category_id !== 'all') {
        this.category_id = category_id;
      }
    }

    if (this.dialog.id === 0) {
      this.dialog.title = "Новая категория";
      this.getParentCategory();
    } else {
      this.loading = true;
      window.axios({
        method: 'get',
        url: '/categories/' + this.dialog.id
      }).then(function (resp) {
        _this.dialog.title = "Редактирование категории '" + resp.data.name + "'";
        _this.id = resp.data.id;
        _this.name = resp.data.name;
        _this.category_id = resp.data.category_id;
        _this.parent_name = resp.data.parent.name;
        _this.image = resp.data.image ? resp.data.image.url : '/images/no_image.png';
        _this.image_id = resp.data.image_id;
        _this.dialog.id = resp.data.id;
        _this.loading = false;
      });
    }
  },
  watch: {
    name: {
      handler: function handler(newVal, oldVal) {
        this.messages['name'] = null;
      }
    }
  },
  computed: {
    nameHasError: function nameHasError() {
      return this.messages.name && this.messages.name.length;
    }
  },
  methods: {
    getParentCategory: function getParentCategory() {
      var _this2 = this;

      this.loading = true;
      window.axios({
        method: 'get',
        url: '/categories/' + this.category_id
      }).then(function (resp) {
        _this2.category_id = resp.data.id;
        _this2.parent_name = resp.data.name;
        _this2.loading = false;
      });
    },
    sync: function sync(e) {
      e.preventDefault();
      this.image_file = e.target.files[0];
      this.syncImage();
    },
    uploadClick: function uploadClick() {
      this.$refs.cat_img_upload.click();
    },
    syncImage: function syncImage() {
      var _this3 = this;

      var data = new FormData();
      data.append('image', this.image_file);
      this.loading = true;
      window.axios({
        method: 'post',
        url: '/image/upload',
        data: data
      }).then(function (resp) {
        _this3.image = resp.data.images[0].url;
        _this3.image_id = resp.data.images[0].id;
        _this3.loading = false;
      });
    },
    openSelectCategoryDialog: function openSelectCategoryDialog() {
      this.$eventBus.$emit('openDialog', {
        tag: 'selectCategory',
        params: {
          root_category: this.dialog.params.root_category,
          ref: this // params: {ref: {
          //     name: this.dialog.name,
          //     id: this.dialog.id,
          //     }}

        }
      });
    },
    setCategory: function setCategory(category) {
      this.category_id = category.id;
      this.parent_name = category.name;
      this.$notify({
        group: 'main',
        type: 'success',
        text: 'Категория выбрана'
      });
    },
    save: function save() {
      var _this4 = this;

      var method = this.id ? 'patch' : 'post';
      var url = this.id ? '/' + this.id : '';
      this.loading = true;
      window.axios({
        method: method,
        url: '/categories' + url,
        data: {
          name: this.name,
          category_id: this.category_id,
          image_id: this.image_id
        }
      }).then(function (resp) {
        _this4.id = resp.data.id;

        _this4.$eventBus.$emit('CategoryUpdated', {
          id: _this4.id,
          category_id: _this4.category_id
        });

        _this4.$parent.closeDialog(_this4.dialog);

        _this4.loading = false;
      })["catch"](function (error) {
        _this4.loading = false;
        _this4.messages = error.response.data.messages;
      });
    }
  },
  components: {
    FormInput: _service_FormInput__WEBPACK_IMPORTED_MODULE_1__["default"]
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/template/Dialogs/CategoryDialog.vue?vue&type=template&id=59ee42c4&":
/*!**********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/template/Dialogs/CategoryDialog.vue?vue&type=template&id=59ee42c4& ***!
  \**********************************************************************************************************************************************************************************************************************************/
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
    _c("div", [
      _c("input", {
        ref: "cat_img_upload",
        staticClass: "d-none",
        attrs: { type: "file", accept: "image/jpeg,image/png,image/gif" },
        on: { change: _vm.sync }
      }),
      _vm._v(" "),
      _c("div", {}, [
        _c("div", { staticClass: "box-body" }, [
          _c("div", { staticClass: "d-flex" }, [
            _c(
              "div",
              { staticClass: "flex-1" },
              [
                _c("div", { staticClass: "form-group mb-0" }, [
                  _c("label", [_vm._v("В категории")]),
                  _vm._v(" "),
                  _vm.loading
                    ? _c(
                        "div",
                        {
                          staticClass: "list-placeholder mb-3",
                          staticStyle: { height: "30px" }
                        },
                        [_vm._m(0)]
                      )
                    : _vm._e(),
                  _vm._v(" "),
                  !_vm.loading
                    ? _c("div", { staticClass: "input-group mb-3" }, [
                        _c(
                          "button",
                          {
                            staticClass:
                              "category_select form-control text-left button_select",
                            attrs: { type: "button", name: "category_id" },
                            on: {
                              click: function($event) {
                                return _vm.openSelectCategoryDialog()
                              }
                            }
                          },
                          [
                            _vm._v(
                              "\n                                    " +
                                _vm._s(_vm.parent_name) +
                                "\n                                "
                            )
                          ]
                        )
                      ])
                    : _vm._e()
                ]),
                _vm._v(" "),
                _c("FormInput", {
                  attrs: {
                    inputData: {
                      type: "input",
                      label: "Название",
                      name: "name",
                      messages: _vm.messages
                    }
                  }
                })
              ],
              1
            ),
            _vm._v(" "),
            _c("div", { staticClass: "ml-15" }, [
              _c("div", { staticClass: "form-group mb-0" }, [
                _c("label", [_vm._v("Основное фото")]),
                _vm._v(" "),
                _c("div", { staticClass: "img_upload_cat_container" }, [
                  _vm.loading
                    ? _c(
                        "div",
                        {
                          staticClass: "list-placeholder mb-3",
                          staticStyle: { height: "100px" }
                        },
                        [_vm._m(1)]
                      )
                    : _vm._e(),
                  _vm._v(" "),
                  !_vm.loading
                    ? _c("img", {
                        staticClass: "h-100 w-100 image",
                        attrs: { src: _vm.image }
                      })
                    : _vm._e(),
                  _vm._v(" "),
                  !_vm.loading
                    ? _c(
                        "span",
                        {
                          staticClass: "upload_btn",
                          on: {
                            click: function($event) {
                              return _vm.uploadClick()
                            }
                          }
                        },
                        [_vm._v("Загрузить")]
                      )
                    : _vm._e()
                ])
              ])
            ])
          ])
        ])
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "modal-footer" }, [
        _c(
          "button",
          {
            staticClass: "button white",
            attrs: { type: "button" },
            on: {
              click: function($event) {
                return _vm.$parent.closeDialog(_vm.dialog)
              }
            }
          },
          [_vm._v("Закрыть")]
        ),
        _vm._v(" "),
        _c(
          "button",
          {
            staticClass: "button primary pull-right",
            attrs: { type: "button" },
            on: {
              click: function($event) {
                return _vm.save()
              }
            }
          },
          [_vm._v("Сохранить")]
        )
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "system_message" })
    ])
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
          staticClass: "list-placeholder_cell",
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
      {
        staticClass: "list-placeholder_item",
        staticStyle: { height: "100px" }
      },
      [
        _c("div", {
          staticClass: "list-placeholder_cell",
          staticStyle: { width: "100%" }
        })
      ]
    )
  }
]
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/mixins/validateMixin.js":
/*!*********************************************************!*\
  !*** ./resources/js/components/mixins/validateMixin.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var validateMixin = {
  methods: {
    getValidateMessage: function getValidateMessage(type) {
      return this.messages[type] ? this.messages[type][0] : null;
    },
    hasError: function hasError(type) {
      return this.messages[type] ? this.messages[type][0] : null;
    }
  }
};
/* harmony default export */ __webpack_exports__["default"] = (validateMixin);

/***/ }),

/***/ "./resources/js/components/template/Dialogs/CategoryDialog.vue":
/*!*********************************************************************!*\
  !*** ./resources/js/components/template/Dialogs/CategoryDialog.vue ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CategoryDialog_vue_vue_type_template_id_59ee42c4___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CategoryDialog.vue?vue&type=template&id=59ee42c4& */ "./resources/js/components/template/Dialogs/CategoryDialog.vue?vue&type=template&id=59ee42c4&");
/* harmony import */ var _CategoryDialog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CategoryDialog.vue?vue&type=script&lang=js& */ "./resources/js/components/template/Dialogs/CategoryDialog.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _CategoryDialog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _CategoryDialog_vue_vue_type_template_id_59ee42c4___WEBPACK_IMPORTED_MODULE_0__["render"],
  _CategoryDialog_vue_vue_type_template_id_59ee42c4___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/template/Dialogs/CategoryDialog.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/template/Dialogs/CategoryDialog.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************!*\
  !*** ./resources/js/components/template/Dialogs/CategoryDialog.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CategoryDialog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./CategoryDialog.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/template/Dialogs/CategoryDialog.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CategoryDialog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/template/Dialogs/CategoryDialog.vue?vue&type=template&id=59ee42c4&":
/*!****************************************************************************************************!*\
  !*** ./resources/js/components/template/Dialogs/CategoryDialog.vue?vue&type=template&id=59ee42c4& ***!
  \****************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CategoryDialog_vue_vue_type_template_id_59ee42c4___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./CategoryDialog.vue?vue&type=template&id=59ee42c4& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/template/Dialogs/CategoryDialog.vue?vue&type=template&id=59ee42c4&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CategoryDialog_vue_vue_type_template_id_59ee42c4___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CategoryDialog_vue_vue_type_template_id_59ee42c4___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvdGVtcGxhdGUvRGlhbG9ncy9DYXRlZ29yeURpYWxvZy52dWUiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvdGVtcGxhdGUvRGlhbG9ncy9DYXRlZ29yeURpYWxvZy52dWU/OGJkMiIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvY29tcG9uZW50cy9taXhpbnMvdmFsaWRhdGVNaXhpbi5qcyIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvY29tcG9uZW50cy90ZW1wbGF0ZS9EaWFsb2dzL0NhdGVnb3J5RGlhbG9nLnZ1ZSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvY29tcG9uZW50cy90ZW1wbGF0ZS9EaWFsb2dzL0NhdGVnb3J5RGlhbG9nLnZ1ZT9mNjdmIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9qcy9jb21wb25lbnRzL3RlbXBsYXRlL0RpYWxvZ3MvQ2F0ZWdvcnlEaWFsb2cudnVlP2ZhYTUiXSwibmFtZXMiOlsidmFsaWRhdGVNaXhpbiIsIm1ldGhvZHMiLCJnZXRWYWxpZGF0ZU1lc3NhZ2UiLCJ0eXBlIiwibWVzc2FnZXMiLCJoYXNFcnJvciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9EQTtBQUNBO0FBQ0E7QUFDQSx3QkFEQTtBQUVBLG1CQUZBO0FBR0EseUVBSEE7QUFJQTtBQUNBO0FBQ0Esb0JBREE7QUFFQSx1QkFGQTtBQUdBLGNBSEE7QUFJQSxtQ0FKQTtBQUtBLG9CQUxBO0FBTUEsc0JBTkE7QUFPQSxnQkFQQTtBQVFBLG9CQVJBO0FBU0E7QUFUQTtBQVdBLEdBaEJBO0FBaUJBO0FBQ0E7QUFDQTtBQUNBLFNBcEJBLHFCQW9CQTtBQUFBOztBQUVBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FI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QUFBQTtBQUE2RjtBQUMzQjtBQUNMOzs7QUFHN0Q7QUFDbUc7QUFDbkcsZ0JBQWdCLDJHQUFVO0FBQzFCLEVBQUUsb0ZBQU07QUFDUixFQUFFLHlGQUFNO0FBQ1IsRUFBRSxrR0FBZTtBQUNqQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLElBQUksS0FBVSxFQUFFLFlBaUJmO0FBQ0Q7QUFDZSxnRjs7Ozs7Ozs7Ozs7O0FDdENmO0FBQUE7QUFBQSx3Q0FBME0sQ0FBZ0IsMFBBQUcsRUFBQyxDOzs7Ozs7Ozs7Ozs7QUNBOU47QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBIiwiZmlsZSI6ImNhdGVnb3J5RGlhbG9nLmpzIiwic291cmNlc0NvbnRlbnQiOlsiPHRlbXBsYXRlPlxyXG4gICAgPGRpdj5cclxuICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJkLW5vbmVcIiByZWY9XCJjYXRfaW1nX3VwbG9hZFwiIHR5cGU9XCJmaWxlXCIgQGNoYW5nZT1cInN5bmNcIiBhY2NlcHQ9XCJpbWFnZS9qcGVnLGltYWdlL3BuZyxpbWFnZS9naWZcIi8+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJib3gtYm9keVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkLWZsZXhcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZsZXgtMVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXAgbWItMFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbD7QkiDQutCw0YLQtdCz0L7RgNC40Lg8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgdi1pZj1cImxvYWRpbmdcIiBjbGFzcz1cImxpc3QtcGxhY2Vob2xkZXIgbWItM1wiIHN0eWxlPVwiaGVpZ2h0OiAzMHB4O1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibGlzdC1wbGFjZWhvbGRlcl9pdGVtXCIgc3R5bGU9XCJoZWlnaHQ6IDMwcHg7XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibGlzdC1wbGFjZWhvbGRlcl9jZWxsXCIgc3R5bGU9XCJ3aWR0aDogMTAwJVwiID48L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiB2LWlmPVwiIWxvYWRpbmdcIiBjbGFzcz1cImlucHV0LWdyb3VwIG1iLTNcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB2LW9uOmNsaWNrPVwib3BlblNlbGVjdENhdGVnb3J5RGlhbG9nKClcIiB0eXBlPVwiYnV0dG9uXCIgbmFtZT1cImNhdGVnb3J5X2lkXCIgY2xhc3M9XCJjYXRlZ29yeV9zZWxlY3QgZm9ybS1jb250cm9sIHRleHQtbGVmdCBidXR0b25fc2VsZWN0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7eyBwYXJlbnRfbmFtZSB9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPEZvcm1JbnB1dCB2LWJpbmQ6aW5wdXREYXRhPVwie3R5cGU6J2lucHV0JyxsYWJlbDon0J3QsNC30LLQsNC90LjQtScsbmFtZTonbmFtZScsIG1lc3NhZ2VzOm1lc3NhZ2VzfVwiIC8+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1sLTE1XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cCBtYi0wXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsPtCe0YHQvdC+0LLQvdC+0LUg0YTQvtGC0L48L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbWdfdXBsb2FkX2NhdF9jb250YWluZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiB2LWlmPVwibG9hZGluZ1wiIGNsYXNzPVwibGlzdC1wbGFjZWhvbGRlciBtYi0zXCIgc3R5bGU9XCJoZWlnaHQ6IDEwMHB4O1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImxpc3QtcGxhY2Vob2xkZXJfaXRlbVwiIHN0eWxlPVwiaGVpZ2h0OiAxMDBweDtcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibGlzdC1wbGFjZWhvbGRlcl9jZWxsXCIgc3R5bGU9XCJ3aWR0aDogMTAwJVwiID48L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyB2LWlmPVwiIWxvYWRpbmdcIiBjbGFzcz1cImgtMTAwIHctMTAwIGltYWdlXCIgOnNyYz1cImltYWdlXCIgLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gdi1pZj1cIiFsb2FkaW5nXCIgQGNsaWNrPVwidXBsb2FkQ2xpY2soKVwiIGNsYXNzPVwidXBsb2FkX2J0blwiPtCX0LDQs9GA0YPQt9C40YLRjDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGFsLWZvb3RlclwiPlxyXG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBAY2xpY2s9XCIkcGFyZW50LmNsb3NlRGlhbG9nKGRpYWxvZylcIiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidXR0b24gd2hpdGVcIiA+0JfQsNC60YDRi9GC0Yw8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDxidXR0b24gQGNsaWNrPVwic2F2ZSgpXCIgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnV0dG9uIHByaW1hcnkgcHVsbC1yaWdodFwiPtCh0L7RhdGA0LDQvdC40YLRjDwvYnV0dG9uPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN5c3RlbV9tZXNzYWdlXCI+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbjwvdGVtcGxhdGU+XHJcblxyXG48c2NyaXB0PlxyXG4gICAgaW1wb3J0IHZhbGlkYXRlTWl4aW4gZnJvbSBcIi4vLi4vLi4vbWl4aW5zL3ZhbGlkYXRlTWl4aW5cIlxyXG4gICAgaW1wb3J0IEZvcm1JbnB1dCBmcm9tIFwiLi8uLi8uLi9zZXJ2aWNlL0Zvcm1JbnB1dFwiXHJcbiAgICBleHBvcnQgZGVmYXVsdCB7XHJcbiAgICAgICAgbmFtZTogXCJDYXRlZ29yeURpYWxvZ1wiLFxyXG4gICAgICAgIHByb3BzOlsnZGlhbG9nJ10sXHJcbiAgICAgICAgbWl4aW5zOiBbdmFsaWRhdGVNaXhpbl0sXHJcbiAgICAgICAgZGF0YTogKCk9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBjYXRlZ29yeV9pZDogMSxcclxuICAgICAgICAgICAgICAgIHBhcmVudF9uYW1lOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgaWQ6IG51bGwsXHJcbiAgICAgICAgICAgICAgICBpbWFnZTogJy9pbWFnZXMvbm9faW1hZ2UucG5nJyxcclxuICAgICAgICAgICAgICAgIGltYWdlX2lkOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgaW1hZ2VfZmlsZTogbnVsbCxcclxuICAgICAgICAgICAgICAgIG5hbWU6IG51bGwsXHJcbiAgICAgICAgICAgICAgICBsb2FkaW5nOmZhbHNlLFxyXG4gICAgICAgICAgICAgICAgbWVzc2FnZXM6e30sXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIC8vIGJlZm9yZU1vdW50KCl7XHJcbiAgICAgICAgLy8gICAgIHRoaXMuZGlhbG9nID0gdGhpcy4kYXR0cnMuZGlhbG9nO1xyXG4gICAgICAgIC8vIH0sXHJcbiAgICAgICAgbW91bnRlZCgpe1xyXG5cclxuICAgICAgICAgICAgaWYodGhpcy5kaWFsb2cucGFyYW1zICYmIHRoaXMuZGlhbG9nLnBhcmFtcy5zZWxlY3RlZF9jYXRlZ29yeSl7XHJcbiAgICAgICAgICAgICAgICBsZXQgY2F0ZWdvcnlfaWQgPSB0aGlzLmRpYWxvZy5wYXJhbXMuc2VsZWN0ZWRfY2F0ZWdvcnk7XHJcbiAgICAgICAgICAgICAgICBpZihjYXRlZ29yeV9pZCAmJiBjYXRlZ29yeV9pZCAhPT0gJ2FsbCcpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2F0ZWdvcnlfaWQgPSBjYXRlZ29yeV9pZDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYodGhpcy5kaWFsb2cuaWQgPT09IDApe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kaWFsb2cudGl0bGUgPSBcItCd0L7QstCw0Y8g0LrQsNGC0LXQs9C+0YDQuNGPXCI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdldFBhcmVudENhdGVnb3J5KCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgd2luZG93LmF4aW9zKHtcclxuICAgICAgICAgICAgICAgICAgICBtZXRob2Q6ICdnZXQnLFxyXG4gICAgICAgICAgICAgICAgICAgIHVybDogJy9jYXRlZ29yaWVzLycgKyB0aGlzLmRpYWxvZy5pZCxcclxuICAgICAgICAgICAgICAgIH0pLnRoZW4oKHJlc3ApID0+ICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kaWFsb2cudGl0bGUgPSBcItCg0LXQtNCw0LrRgtC40YDQvtCy0LDQvdC40LUg0LrQsNGC0LXQs9C+0YDQuNC4ICdcIiArIHJlc3AuZGF0YS5uYW1lICsgXCInXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pZCA9IHJlc3AuZGF0YS5pZDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5hbWUgPSByZXNwLmRhdGEubmFtZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNhdGVnb3J5X2lkID0gcmVzcC5kYXRhLmNhdGVnb3J5X2lkO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGFyZW50X25hbWUgPSByZXNwLmRhdGEucGFyZW50Lm5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbWFnZSA9IHJlc3AuZGF0YS5pbWFnZSA/IHJlc3AuZGF0YS5pbWFnZS51cmwgOiAnL2ltYWdlcy9ub19pbWFnZS5wbmcnO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW1hZ2VfaWQgPSByZXNwLmRhdGEuaW1hZ2VfaWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kaWFsb2cuaWQgPSByZXNwLmRhdGEuaWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgd2F0Y2g6IHtcclxuICAgICAgICAgICAgbmFtZToge1xyXG4gICAgICAgICAgICAgICAgaGFuZGxlcihuZXdWYWwsIG9sZFZhbCl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tZXNzYWdlc1snbmFtZSddID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29tcHV0ZWQ6IHtcclxuICAgICAgICAgICAgbmFtZUhhc0Vycm9yKCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5tZXNzYWdlcy5uYW1lICYmIHRoaXMubWVzc2FnZXMubmFtZS5sZW5ndGg7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIG1ldGhvZHM6e1xyXG4gICAgICAgICAgICBnZXRQYXJlbnRDYXRlZ29yeSgpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5heGlvcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiAnZ2V0JyxcclxuICAgICAgICAgICAgICAgICAgICB1cmw6ICcvY2F0ZWdvcmllcy8nICsgdGhpcy5jYXRlZ29yeV9pZCxcclxuICAgICAgICAgICAgICAgIH0pLnRoZW4oKHJlc3ApID0+ICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jYXRlZ29yeV9pZCA9IHJlc3AuZGF0YS5pZDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhcmVudF9uYW1lID0gcmVzcC5kYXRhLm5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc3luYyhlKXtcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaW1hZ2VfZmlsZSA9IGUudGFyZ2V0LmZpbGVzWzBdO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zeW5jSW1hZ2UoKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdXBsb2FkQ2xpY2soKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuJHJlZnMuY2F0X2ltZ191cGxvYWQuY2xpY2soKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc3luY0ltYWdlKCl7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgZGF0YS5hcHBlbmQoJ2ltYWdlJywgdGhpcy5pbWFnZV9maWxlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cuYXhpb3Moe1xyXG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZDogJ3Bvc3QnLFxyXG4gICAgICAgICAgICAgICAgICAgIHVybDogJy9pbWFnZS91cGxvYWQnLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6ZGF0YVxyXG4gICAgICAgICAgICAgICAgfSkudGhlbigocmVzcCkgPT4gIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmltYWdlID0gcmVzcC5kYXRhLmltYWdlc1swXS51cmw7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbWFnZV9pZCA9IHJlc3AuZGF0YS5pbWFnZXNbMF0uaWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgb3BlblNlbGVjdENhdGVnb3J5RGlhbG9nKCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRldmVudEJ1cy4kZW1pdCgnb3BlbkRpYWxvZycsIHtcclxuICAgICAgICAgICAgICAgICAgICB0YWc6ICdzZWxlY3RDYXRlZ29yeScsXHJcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1zOiB7cm9vdF9jYXRlZ29yeTp0aGlzLmRpYWxvZy5wYXJhbXMucm9vdF9jYXRlZ29yeSwgcmVmOiB0aGlzfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHBhcmFtczoge3JlZjoge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICBuYW1lOiB0aGlzLmRpYWxvZy5uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICBpZDogdGhpcy5kaWFsb2cuaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIH19XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2V0Q2F0ZWdvcnkoY2F0ZWdvcnkpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYXRlZ29yeV9pZCA9IGNhdGVnb3J5LmlkO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wYXJlbnRfbmFtZSA9IGNhdGVnb3J5Lm5hbWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRub3RpZnkoe1xyXG4gICAgICAgICAgICAgICAgICAgIGdyb3VwOiAnbWFpbicsXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3N1Y2Nlc3MnLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICfQmtCw0YLQtdCz0L7RgNC40Y8g0LLRi9Cx0YDQsNC90LAnXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2F2ZSgpe1xyXG4gICAgICAgICAgICAgICAgbGV0IG1ldGhvZCA9IHRoaXMuaWQgPyAncGF0Y2gnIDogJ3Bvc3QnO1xyXG4gICAgICAgICAgICAgICAgbGV0IHVybCA9IHRoaXMuaWQgPyAnLycgKyB0aGlzLmlkIDogJyc7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgd2luZG93LmF4aW9zKHtcclxuICAgICAgICAgICAgICAgICAgICBtZXRob2Q6IG1ldGhvZCxcclxuICAgICAgICAgICAgICAgICAgICB1cmw6ICcvY2F0ZWdvcmllcycgKyB1cmwsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTp7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6ICAgICAgICAgICB0aGlzLm5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhdGVnb3J5X2lkOiAgICB0aGlzLmNhdGVnb3J5X2lkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbWFnZV9pZDogICAgICAgdGhpcy5pbWFnZV9pZFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pLnRoZW4oKHJlc3ApID0+ICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pZCA9IHJlc3AuZGF0YS5pZDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLiRldmVudEJ1cy4kZW1pdCgnQ2F0ZWdvcnlVcGRhdGVkJywge2lkOiB0aGlzLmlkLCBjYXRlZ29yeV9pZDp0aGlzLmNhdGVnb3J5X2lkfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kcGFyZW50LmNsb3NlRGlhbG9nKHRoaXMuZGlhbG9nKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH0pLmNhdGNoKChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWVzc2FnZXMgPSBlcnJvci5yZXNwb25zZS5kYXRhLm1lc3NhZ2VzO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvbXBvbmVudHM6e1xyXG4gICAgICAgICAgICBGb3JtSW5wdXRcclxuICAgICAgICB9XHJcbiAgICB9XHJcbjwvc2NyaXB0PlxyXG4iLCJ2YXIgcmVuZGVyID0gZnVuY3Rpb24oKSB7XG4gIHZhciBfdm0gPSB0aGlzXG4gIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgcmV0dXJuIF9jKFwiZGl2XCIsIFtcbiAgICBfYyhcImRpdlwiLCBbXG4gICAgICBfYyhcImlucHV0XCIsIHtcbiAgICAgICAgcmVmOiBcImNhdF9pbWdfdXBsb2FkXCIsXG4gICAgICAgIHN0YXRpY0NsYXNzOiBcImQtbm9uZVwiLFxuICAgICAgICBhdHRyczogeyB0eXBlOiBcImZpbGVcIiwgYWNjZXB0OiBcImltYWdlL2pwZWcsaW1hZ2UvcG5nLGltYWdlL2dpZlwiIH0sXG4gICAgICAgIG9uOiB7IGNoYW5nZTogX3ZtLnN5bmMgfVxuICAgICAgfSksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX2MoXCJkaXZcIiwge30sIFtcbiAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJib3gtYm9keVwiIH0sIFtcbiAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImQtZmxleFwiIH0sIFtcbiAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcImZsZXgtMVwiIH0sXG4gICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImZvcm0tZ3JvdXAgbWItMFwiIH0sIFtcbiAgICAgICAgICAgICAgICAgIF9jKFwibGFiZWxcIiwgW192bS5fdihcItCSINC60LDRgtC10LPQvtGA0LjQuFwiKV0pLFxuICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgIF92bS5sb2FkaW5nXG4gICAgICAgICAgICAgICAgICAgID8gX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJsaXN0LXBsYWNlaG9sZGVyIG1iLTNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljU3R5bGU6IHsgaGVpZ2h0OiBcIjMwcHhcIiB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgW192bS5fbSgwKV1cbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIDogX3ZtLl9lKCksXG4gICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgIV92bS5sb2FkaW5nXG4gICAgICAgICAgICAgICAgICAgID8gX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJpbnB1dC1ncm91cCBtYi0zXCIgfSwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiYnV0dG9uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2F0ZWdvcnlfc2VsZWN0IGZvcm0tY29udHJvbCB0ZXh0LWxlZnQgYnV0dG9uX3NlbGVjdFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IHR5cGU6IFwiYnV0dG9uXCIsIG5hbWU6IFwiY2F0ZWdvcnlfaWRcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfdm0ub3BlblNlbGVjdENhdGVnb3J5RGlhbG9nKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl9zKF92bS5wYXJlbnRfbmFtZSkgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgICA6IF92bS5fZSgpXG4gICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICBfYyhcIkZvcm1JbnB1dFwiLCB7XG4gICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICBpbnB1dERhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcImlucHV0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwi0J3QsNC30LLQsNC90LjQtVwiLFxuICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibmFtZVwiLFxuICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2VzOiBfdm0ubWVzc2FnZXNcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJtbC0xNVwiIH0sIFtcbiAgICAgICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJmb3JtLWdyb3VwIG1iLTBcIiB9LCBbXG4gICAgICAgICAgICAgICAgX2MoXCJsYWJlbFwiLCBbX3ZtLl92KFwi0J7RgdC90L7QstC90L7QtSDRhNC+0YLQvlwiKV0pLFxuICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJpbWdfdXBsb2FkX2NhdF9jb250YWluZXJcIiB9LCBbXG4gICAgICAgICAgICAgICAgICBfdm0ubG9hZGluZ1xuICAgICAgICAgICAgICAgICAgICA/IF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwibGlzdC1wbGFjZWhvbGRlciBtYi0zXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY1N0eWxlOiB7IGhlaWdodDogXCIxMDBweFwiIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBbX3ZtLl9tKDEpXVxuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgOiBfdm0uX2UoKSxcbiAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAhX3ZtLmxvYWRpbmdcbiAgICAgICAgICAgICAgICAgICAgPyBfYyhcImltZ1wiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJoLTEwMCB3LTEwMCBpbWFnZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgc3JjOiBfdm0uaW1hZ2UgfVxuICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIDogX3ZtLl9lKCksXG4gICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgIV92bS5sb2FkaW5nXG4gICAgICAgICAgICAgICAgICAgID8gX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICBcInNwYW5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwidXBsb2FkX2J0blwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfdm0udXBsb2FkQ2xpY2soKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFtfdm0uX3YoXCLQl9Cw0LPRgNGD0LfQuNGC0YxcIildXG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICA6IF92bS5fZSgpXG4gICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgIF0pXG4gICAgICAgICAgXSlcbiAgICAgICAgXSlcbiAgICAgIF0pLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwibW9kYWwtZm9vdGVyXCIgfSwgW1xuICAgICAgICBfYyhcbiAgICAgICAgICBcImJ1dHRvblwiLFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImJ1dHRvbiB3aGl0ZVwiLFxuICAgICAgICAgICAgYXR0cnM6IHsgdHlwZTogXCJidXR0b25cIiB9LFxuICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBfdm0uJHBhcmVudC5jbG9zZURpYWxvZyhfdm0uZGlhbG9nKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBbX3ZtLl92KFwi0JfQsNC60YDRi9GC0YxcIildXG4gICAgICAgICksXG4gICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgIF9jKFxuICAgICAgICAgIFwiYnV0dG9uXCIsXG4gICAgICAgICAge1xuICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiYnV0dG9uIHByaW1hcnkgcHVsbC1yaWdodFwiLFxuICAgICAgICAgICAgYXR0cnM6IHsgdHlwZTogXCJidXR0b25cIiB9LFxuICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBfdm0uc2F2ZSgpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIFtfdm0uX3YoXCLQodC+0YXRgNCw0L3QuNGC0YxcIildXG4gICAgICAgIClcbiAgICAgIF0pLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwic3lzdGVtX21lc3NhZ2VcIiB9KVxuICAgIF0pXG4gIF0pXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW1xuICBmdW5jdGlvbigpIHtcbiAgICB2YXIgX3ZtID0gdGhpc1xuICAgIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICAgIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICAgIHJldHVybiBfYyhcbiAgICAgIFwiZGl2XCIsXG4gICAgICB7IHN0YXRpY0NsYXNzOiBcImxpc3QtcGxhY2Vob2xkZXJfaXRlbVwiLCBzdGF0aWNTdHlsZTogeyBoZWlnaHQ6IFwiMzBweFwiIH0gfSxcbiAgICAgIFtcbiAgICAgICAgX2MoXCJkaXZcIiwge1xuICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImxpc3QtcGxhY2Vob2xkZXJfY2VsbFwiLFxuICAgICAgICAgIHN0YXRpY1N0eWxlOiB7IHdpZHRoOiBcIjEwMCVcIiB9XG4gICAgICAgIH0pXG4gICAgICBdXG4gICAgKVxuICB9LFxuICBmdW5jdGlvbigpIHtcbiAgICB2YXIgX3ZtID0gdGhpc1xuICAgIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICAgIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICAgIHJldHVybiBfYyhcbiAgICAgIFwiZGl2XCIsXG4gICAgICB7XG4gICAgICAgIHN0YXRpY0NsYXNzOiBcImxpc3QtcGxhY2Vob2xkZXJfaXRlbVwiLFxuICAgICAgICBzdGF0aWNTdHlsZTogeyBoZWlnaHQ6IFwiMTAwcHhcIiB9XG4gICAgICB9LFxuICAgICAgW1xuICAgICAgICBfYyhcImRpdlwiLCB7XG4gICAgICAgICAgc3RhdGljQ2xhc3M6IFwibGlzdC1wbGFjZWhvbGRlcl9jZWxsXCIsXG4gICAgICAgICAgc3RhdGljU3R5bGU6IHsgd2lkdGg6IFwiMTAwJVwiIH1cbiAgICAgICAgfSlcbiAgICAgIF1cbiAgICApXG4gIH1cbl1cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxuXG5leHBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IiwibGV0IHZhbGlkYXRlTWl4aW4gPSB7XHJcbiAgICBtZXRob2RzOiB7XHJcbiAgICAgICAgZ2V0VmFsaWRhdGVNZXNzYWdlKHR5cGUpe1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tZXNzYWdlc1t0eXBlXSA/IHRoaXMubWVzc2FnZXNbdHlwZV1bMF0gOiBudWxsO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaGFzRXJyb3IodHlwZSl7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1lc3NhZ2VzW3R5cGVdID8gdGhpcy5tZXNzYWdlc1t0eXBlXVswXSA6IG51bGw7XHJcbiAgICAgICAgfSxcclxuICAgIH1cclxufTtcclxuZXhwb3J0IGRlZmF1bHQgdmFsaWRhdGVNaXhpbjtcclxuIiwiaW1wb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSBmcm9tIFwiLi9DYXRlZ29yeURpYWxvZy52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9NTllZTQyYzQmXCJcbmltcG9ydCBzY3JpcHQgZnJvbSBcIi4vQ2F0ZWdvcnlEaWFsb2cudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5leHBvcnQgKiBmcm9tIFwiLi9DYXRlZ29yeURpYWxvZy52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcblxuXG4vKiBub3JtYWxpemUgY29tcG9uZW50ICovXG5pbXBvcnQgbm9ybWFsaXplciBmcm9tIFwiIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9ydW50aW1lL2NvbXBvbmVudE5vcm1hbGl6ZXIuanNcIlxudmFyIGNvbXBvbmVudCA9IG5vcm1hbGl6ZXIoXG4gIHNjcmlwdCxcbiAgcmVuZGVyLFxuICBzdGF0aWNSZW5kZXJGbnMsXG4gIGZhbHNlLFxuICBudWxsLFxuICBudWxsLFxuICBudWxsXG4gIFxuKVxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkge1xuICB2YXIgYXBpID0gcmVxdWlyZShcIkM6XFxcXE9wZW5TZXJ2ZXJcXFxcZG9tYWluc1xcXFxBdXRvQ1JNXFxcXG5vZGVfbW9kdWxlc1xcXFx2dWUtaG90LXJlbG9hZC1hcGlcXFxcZGlzdFxcXFxpbmRleC5qc1wiKVxuICBhcGkuaW5zdGFsbChyZXF1aXJlKCd2dWUnKSlcbiAgaWYgKGFwaS5jb21wYXRpYmxlKSB7XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICAgIGlmICghYXBpLmlzUmVjb3JkZWQoJzU5ZWU0MmM0JykpIHtcbiAgICAgIGFwaS5jcmVhdGVSZWNvcmQoJzU5ZWU0MmM0JywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZWxvYWQoJzU5ZWU0MmM0JywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfVxuICAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiLi9DYXRlZ29yeURpYWxvZy52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9NTllZTQyYzQmXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGFwaS5yZXJlbmRlcignNTllZTQyYzQnLCB7XG4gICAgICAgIHJlbmRlcjogcmVuZGVyLFxuICAgICAgICBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZuc1xuICAgICAgfSlcbiAgICB9KVxuICB9XG59XG5jb21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcInJlc291cmNlcy9qcy9jb21wb25lbnRzL3RlbXBsYXRlL0RpYWxvZ3MvQ2F0ZWdvcnlEaWFsb2cudnVlXCJcbmV4cG9ydCBkZWZhdWx0IGNvbXBvbmVudC5leHBvcnRzIiwiaW1wb3J0IG1vZCBmcm9tIFwiLSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS00LTAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9DYXRlZ29yeURpYWxvZy52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tNC0wIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vQ2F0ZWdvcnlEaWFsb2cudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiIiwiZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvdGVtcGxhdGVMb2FkZXIuanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0NhdGVnb3J5RGlhbG9nLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD01OWVlNDJjNCZcIiJdLCJzb3VyY2VSb290IjoiIn0=