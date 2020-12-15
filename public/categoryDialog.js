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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvdGVtcGxhdGUvRGlhbG9ncy9DYXRlZ29yeURpYWxvZy52dWUiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvdGVtcGxhdGUvRGlhbG9ncy9DYXRlZ29yeURpYWxvZy52dWU/OGJkMiIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvY29tcG9uZW50cy9taXhpbnMvdmFsaWRhdGVNaXhpbi5qcyIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvY29tcG9uZW50cy90ZW1wbGF0ZS9EaWFsb2dzL0NhdGVnb3J5RGlhbG9nLnZ1ZSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvY29tcG9uZW50cy90ZW1wbGF0ZS9EaWFsb2dzL0NhdGVnb3J5RGlhbG9nLnZ1ZT9mNjdmIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9qcy9jb21wb25lbnRzL3RlbXBsYXRlL0RpYWxvZ3MvQ2F0ZWdvcnlEaWFsb2cudnVlP2ZhYTUiXSwibmFtZXMiOlsidmFsaWRhdGVNaXhpbiIsIm1ldGhvZHMiLCJnZXRWYWxpZGF0ZU1lc3NhZ2UiLCJ0eXBlIiwibWVzc2FnZXMiLCJoYXNFcnJvciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9EQTtBQUNBO0FBQ0E7QUFDQSx3QkFEQTtBQUVBLG1CQUZBO0FBR0EseUVBSEE7QUFJQTtBQUNBO0FBQ0Esb0JBREE7QUFFQSx1QkFGQTtBQUdBLGNBSEE7QUFJQSxtQ0FKQTtBQUtBLG9CQUxBO0FBTUEsc0JBTkE7QUFPQSxnQkFQQTtBQVFBLG9CQVJBO0FBU0E7QUFUQTtBQVdBLEdBaEJBO0FBaUJBO0FBQ0E7QUFDQTtBQUNBLFNBcEJBLHFCQW9CQTtBQUFBOztBQUVBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FI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QUFBQTtBQUE2RjtBQUMzQjtBQUNMOzs7QUFHN0Q7QUFDbUc7QUFDbkcsZ0JBQWdCLDJHQUFVO0FBQzFCLEVBQUUsb0ZBQU07QUFDUixFQUFFLHlGQUFNO0FBQ1IsRUFBRSxrR0FBZTtBQUNqQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLElBQUksS0FBVSxFQUFFLFlBaUJmO0FBQ0Q7QUFDZSxnRjs7Ozs7Ozs7Ozs7O0FDdENmO0FBQUE7QUFBQSx3Q0FBME0sQ0FBZ0IsMFBBQUcsRUFBQyxDOzs7Ozs7Ozs7Ozs7QUNBOU47QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBIiwiZmlsZSI6ImNhdGVnb3J5RGlhbG9nLmpzIiwic291cmNlc0NvbnRlbnQiOlsiPHRlbXBsYXRlPlxuICAgIDxkaXY+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJkLW5vbmVcIiByZWY9XCJjYXRfaW1nX3VwbG9hZFwiIHR5cGU9XCJmaWxlXCIgQGNoYW5nZT1cInN5bmNcIiBhY2NlcHQ9XCJpbWFnZS9qcGVnLGltYWdlL3BuZyxpbWFnZS9naWZcIi8+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJveC1ib2R5XCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkLWZsZXhcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmbGV4LTFcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cCBtYi0wXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbD7QkiDQutCw0YLQtdCz0L7RgNC40Lg8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHYtaWY9XCJsb2FkaW5nXCIgY2xhc3M9XCJsaXN0LXBsYWNlaG9sZGVyIG1iLTNcIiBzdHlsZT1cImhlaWdodDogMzBweDtcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJsaXN0LXBsYWNlaG9sZGVyX2l0ZW1cIiBzdHlsZT1cImhlaWdodDogMzBweDtcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibGlzdC1wbGFjZWhvbGRlcl9jZWxsXCIgc3R5bGU9XCJ3aWR0aDogMTAwJVwiID48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiB2LWlmPVwiIWxvYWRpbmdcIiBjbGFzcz1cImlucHV0LWdyb3VwIG1iLTNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gdi1vbjpjbGljaz1cIm9wZW5TZWxlY3RDYXRlZ29yeURpYWxvZygpXCIgdHlwZT1cImJ1dHRvblwiIG5hbWU9XCJjYXRlZ29yeV9pZFwiIGNsYXNzPVwiY2F0ZWdvcnlfc2VsZWN0IGZvcm0tY29udHJvbCB0ZXh0LWxlZnQgYnV0dG9uX3NlbGVjdFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7IHBhcmVudF9uYW1lIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPEZvcm1JbnB1dCB2LWJpbmQ6aW5wdXREYXRhPVwie3R5cGU6J2lucHV0JyxsYWJlbDon0J3QsNC30LLQsNC90LjQtScsbmFtZTonbmFtZScsIG1lc3NhZ2VzOm1lc3NhZ2VzfVwiIC8+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1sLTE1XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXAgbWItMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWw+0J7RgdC90L7QstC90L7QtSDRhNC+0YLQvjwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbWdfdXBsb2FkX2NhdF9jb250YWluZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgdi1pZj1cImxvYWRpbmdcIiBjbGFzcz1cImxpc3QtcGxhY2Vob2xkZXIgbWItM1wiIHN0eWxlPVwiaGVpZ2h0OiAxMDBweDtcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibGlzdC1wbGFjZWhvbGRlcl9pdGVtXCIgc3R5bGU9XCJoZWlnaHQ6IDEwMHB4O1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibGlzdC1wbGFjZWhvbGRlcl9jZWxsXCIgc3R5bGU9XCJ3aWR0aDogMTAwJVwiID48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyB2LWlmPVwiIWxvYWRpbmdcIiBjbGFzcz1cImgtMTAwIHctMTAwIGltYWdlXCIgOnNyYz1cImltYWdlXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHYtaWY9XCIhbG9hZGluZ1wiIEBjbGljaz1cInVwbG9hZENsaWNrKClcIiBjbGFzcz1cInVwbG9hZF9idG5cIj7Ql9Cw0LPRgNGD0LfQuNGC0Yw8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9kYWwtZm9vdGVyXCI+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBAY2xpY2s9XCIkcGFyZW50LmNsb3NlRGlhbG9nKGRpYWxvZylcIiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidXR0b24gd2hpdGVcIiA+0JfQsNC60YDRi9GC0Yw8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIEBjbGljaz1cInNhdmUoKVwiIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ1dHRvbiBwcmltYXJ5IHB1bGwtcmlnaHRcIj7QodC+0YXRgNCw0L3QuNGC0Yw8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN5c3RlbV9tZXNzYWdlXCI+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuICAgIGltcG9ydCB2YWxpZGF0ZU1peGluIGZyb20gXCIuLy4uLy4uL21peGlucy92YWxpZGF0ZU1peGluXCJcbiAgICBpbXBvcnQgRm9ybUlucHV0IGZyb20gXCIuLy4uLy4uL3NlcnZpY2UvRm9ybUlucHV0XCJcbiAgICBleHBvcnQgZGVmYXVsdCB7XG4gICAgICAgIG5hbWU6IFwiQ2F0ZWdvcnlEaWFsb2dcIixcbiAgICAgICAgcHJvcHM6WydkaWFsb2cnXSxcbiAgICAgICAgbWl4aW5zOiBbdmFsaWRhdGVNaXhpbl0sXG4gICAgICAgIGRhdGE6ICgpPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBjYXRlZ29yeV9pZDogMSxcbiAgICAgICAgICAgICAgICBwYXJlbnRfbmFtZTogbnVsbCxcbiAgICAgICAgICAgICAgICBpZDogbnVsbCxcbiAgICAgICAgICAgICAgICBpbWFnZTogJy9pbWFnZXMvbm9faW1hZ2UucG5nJyxcbiAgICAgICAgICAgICAgICBpbWFnZV9pZDogbnVsbCxcbiAgICAgICAgICAgICAgICBpbWFnZV9maWxlOiBudWxsLFxuICAgICAgICAgICAgICAgIG5hbWU6IG51bGwsXG4gICAgICAgICAgICAgICAgbG9hZGluZzpmYWxzZSxcbiAgICAgICAgICAgICAgICBtZXNzYWdlczp7fSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgLy8gYmVmb3JlTW91bnQoKXtcbiAgICAgICAgLy8gICAgIHRoaXMuZGlhbG9nID0gdGhpcy4kYXR0cnMuZGlhbG9nO1xuICAgICAgICAvLyB9LFxuICAgICAgICBtb3VudGVkKCl7XG5cbiAgICAgICAgICAgIGlmKHRoaXMuZGlhbG9nLnBhcmFtcyAmJiB0aGlzLmRpYWxvZy5wYXJhbXMuc2VsZWN0ZWRfY2F0ZWdvcnkpe1xuICAgICAgICAgICAgICAgIGxldCBjYXRlZ29yeV9pZCA9IHRoaXMuZGlhbG9nLnBhcmFtcy5zZWxlY3RlZF9jYXRlZ29yeTtcbiAgICAgICAgICAgICAgICBpZihjYXRlZ29yeV9pZCAmJiBjYXRlZ29yeV9pZCAhPT0gJ2FsbCcpe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNhdGVnb3J5X2lkID0gY2F0ZWdvcnlfaWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZih0aGlzLmRpYWxvZy5pZCA9PT0gMCl7XG4gICAgICAgICAgICAgICAgdGhpcy5kaWFsb2cudGl0bGUgPSBcItCd0L7QstCw0Y8g0LrQsNGC0LXQs9C+0YDQuNGPXCI7XG4gICAgICAgICAgICAgICAgdGhpcy5nZXRQYXJlbnRDYXRlZ29yeSgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHdpbmRvdy5heGlvcyh7XG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZDogJ2dldCcsXG4gICAgICAgICAgICAgICAgICAgIHVybDogJy9jYXRlZ29yaWVzLycgKyB0aGlzLmRpYWxvZy5pZCxcbiAgICAgICAgICAgICAgICB9KS50aGVuKChyZXNwKSA9PiAge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRpYWxvZy50aXRsZSA9IFwi0KDQtdC00LDQutGC0LjRgNC+0LLQsNC90LjQtSDQutCw0YLQtdCz0L7RgNC40LggJ1wiICsgcmVzcC5kYXRhLm5hbWUgKyBcIidcIjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pZCA9IHJlc3AuZGF0YS5pZDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5uYW1lID0gcmVzcC5kYXRhLm5hbWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2F0ZWdvcnlfaWQgPSByZXNwLmRhdGEuY2F0ZWdvcnlfaWQ7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGFyZW50X25hbWUgPSByZXNwLmRhdGEucGFyZW50Lm5hbWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW1hZ2UgPSByZXNwLmRhdGEuaW1hZ2UgPyByZXNwLmRhdGEuaW1hZ2UudXJsIDogJy9pbWFnZXMvbm9faW1hZ2UucG5nJztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbWFnZV9pZCA9IHJlc3AuZGF0YS5pbWFnZV9pZDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kaWFsb2cuaWQgPSByZXNwLmRhdGEuaWQ7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB3YXRjaDoge1xuICAgICAgICAgICAgbmFtZToge1xuICAgICAgICAgICAgICAgIGhhbmRsZXIobmV3VmFsLCBvbGRWYWwpe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1lc3NhZ2VzWyduYW1lJ10gPSBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgY29tcHV0ZWQ6IHtcbiAgICAgICAgICAgIG5hbWVIYXNFcnJvcigpe1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm1lc3NhZ2VzLm5hbWUgJiYgdGhpcy5tZXNzYWdlcy5uYW1lLmxlbmd0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgbWV0aG9kczp7XG4gICAgICAgICAgICBnZXRQYXJlbnRDYXRlZ29yeSgpe1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgd2luZG93LmF4aW9zKHtcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiAnZ2V0JyxcbiAgICAgICAgICAgICAgICAgICAgdXJsOiAnL2NhdGVnb3JpZXMvJyArIHRoaXMuY2F0ZWdvcnlfaWQsXG4gICAgICAgICAgICAgICAgfSkudGhlbigocmVzcCkgPT4gIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jYXRlZ29yeV9pZCA9IHJlc3AuZGF0YS5pZDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXJlbnRfbmFtZSA9IHJlc3AuZGF0YS5uYW1lO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzeW5jKGUpe1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmltYWdlX2ZpbGUgPSBlLnRhcmdldC5maWxlc1swXTtcbiAgICAgICAgICAgICAgICB0aGlzLnN5bmNJbWFnZSgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHVwbG9hZENsaWNrKCl7XG4gICAgICAgICAgICAgICAgdGhpcy4kcmVmcy5jYXRfaW1nX3VwbG9hZC5jbGljaygpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHN5bmNJbWFnZSgpe1xuICAgICAgICAgICAgICAgIGxldCBkYXRhID0gbmV3IEZvcm1EYXRhKCk7XG4gICAgICAgICAgICAgICAgZGF0YS5hcHBlbmQoJ2ltYWdlJywgdGhpcy5pbWFnZV9maWxlKTtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHdpbmRvdy5heGlvcyh7XG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZDogJ3Bvc3QnLFxuICAgICAgICAgICAgICAgICAgICB1cmw6ICcvaW1hZ2UvdXBsb2FkJyxcbiAgICAgICAgICAgICAgICAgICAgZGF0YTpkYXRhXG4gICAgICAgICAgICAgICAgfSkudGhlbigocmVzcCkgPT4gIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbWFnZSA9IHJlc3AuZGF0YS5pbWFnZXNbMF0udXJsO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmltYWdlX2lkID0gcmVzcC5kYXRhLmltYWdlc1swXS5pZDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb3BlblNlbGVjdENhdGVnb3J5RGlhbG9nKCl7XG4gICAgICAgICAgICAgICAgdGhpcy4kZXZlbnRCdXMuJGVtaXQoJ29wZW5EaWFsb2cnLCB7XG4gICAgICAgICAgICAgICAgICAgIHRhZzogJ3NlbGVjdENhdGVnb3J5JyxcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1zOiB7cm9vdF9jYXRlZ29yeTp0aGlzLmRpYWxvZy5wYXJhbXMucm9vdF9jYXRlZ29yeSwgcmVmOiB0aGlzfVxuICAgICAgICAgICAgICAgICAgICAvLyBwYXJhbXM6IHtyZWY6IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIG5hbWU6IHRoaXMuZGlhbG9nLm5hbWUsXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICBpZDogdGhpcy5kaWFsb2cuaWQsXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICB9fVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldENhdGVnb3J5KGNhdGVnb3J5KXtcbiAgICAgICAgICAgICAgICB0aGlzLmNhdGVnb3J5X2lkID0gY2F0ZWdvcnkuaWQ7XG4gICAgICAgICAgICAgICAgdGhpcy5wYXJlbnRfbmFtZSA9IGNhdGVnb3J5Lm5hbWU7XG4gICAgICAgICAgICAgICAgdGhpcy4kbm90aWZ5KHtcbiAgICAgICAgICAgICAgICAgICAgZ3JvdXA6ICdtYWluJyxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3N1Y2Nlc3MnLFxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAn0JrQsNGC0LXQs9C+0YDQuNGPINCy0YvQsdGA0LDQvdCwJ1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNhdmUoKXtcbiAgICAgICAgICAgICAgICBsZXQgbWV0aG9kID0gdGhpcy5pZCA/ICdwYXRjaCcgOiAncG9zdCc7XG4gICAgICAgICAgICAgICAgbGV0IHVybCA9IHRoaXMuaWQgPyAnLycgKyB0aGlzLmlkIDogJyc7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB3aW5kb3cuYXhpb3Moe1xuICAgICAgICAgICAgICAgICAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICAgICAgICAgICAgICAgICAgdXJsOiAnL2NhdGVnb3JpZXMnICsgdXJsLFxuICAgICAgICAgICAgICAgICAgICBkYXRhOntcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6ICAgICAgICAgICB0aGlzLm5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXRlZ29yeV9pZDogICAgdGhpcy5jYXRlZ29yeV9pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGltYWdlX2lkOiAgICAgICB0aGlzLmltYWdlX2lkXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KS50aGVuKChyZXNwKSA9PiAge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmlkID0gcmVzcC5kYXRhLmlkO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLiRldmVudEJ1cy4kZW1pdCgnQ2F0ZWdvcnlVcGRhdGVkJywge2lkOiB0aGlzLmlkLCBjYXRlZ29yeV9pZDp0aGlzLmNhdGVnb3J5X2lkfSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJHBhcmVudC5jbG9zZURpYWxvZyh0aGlzLmRpYWxvZyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH0pLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tZXNzYWdlcyA9IGVycm9yLnJlc3BvbnNlLmRhdGEubWVzc2FnZXM7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGNvbXBvbmVudHM6e1xuICAgICAgICAgICAgRm9ybUlucHV0XG4gICAgICAgIH1cbiAgICB9XG48L3NjcmlwdD5cbiIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXCJkaXZcIiwgW1xuICAgIF9jKFwiZGl2XCIsIFtcbiAgICAgIF9jKFwiaW5wdXRcIiwge1xuICAgICAgICByZWY6IFwiY2F0X2ltZ191cGxvYWRcIixcbiAgICAgICAgc3RhdGljQ2xhc3M6IFwiZC1ub25lXCIsXG4gICAgICAgIGF0dHJzOiB7IHR5cGU6IFwiZmlsZVwiLCBhY2NlcHQ6IFwiaW1hZ2UvanBlZyxpbWFnZS9wbmcsaW1hZ2UvZ2lmXCIgfSxcbiAgICAgICAgb246IHsgY2hhbmdlOiBfdm0uc3luYyB9XG4gICAgICB9KSxcbiAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICBfYyhcImRpdlwiLCB7fSwgW1xuICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImJveC1ib2R5XCIgfSwgW1xuICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiZC1mbGV4XCIgfSwgW1xuICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwiZmxleC0xXCIgfSxcbiAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiZm9ybS1ncm91cCBtYi0wXCIgfSwgW1xuICAgICAgICAgICAgICAgICAgX2MoXCJsYWJlbFwiLCBbX3ZtLl92KFwi0JIg0LrQsNGC0LXQs9C+0YDQuNC4XCIpXSksXG4gICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgX3ZtLmxvYWRpbmdcbiAgICAgICAgICAgICAgICAgICAgPyBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImxpc3QtcGxhY2Vob2xkZXIgbWItM1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNTdHlsZTogeyBoZWlnaHQ6IFwiMzBweFwiIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBbX3ZtLl9tKDApXVxuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgOiBfdm0uX2UoKSxcbiAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAhX3ZtLmxvYWRpbmdcbiAgICAgICAgICAgICAgICAgICAgPyBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImlucHV0LWdyb3VwIG1iLTNcIiB9LCBbXG4gICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJidXR0b25cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjYXRlZ29yeV9zZWxlY3QgZm9ybS1jb250cm9sIHRleHQtbGVmdCBidXR0b25fc2VsZWN0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgdHlwZTogXCJidXR0b25cIiwgbmFtZTogXCJjYXRlZ29yeV9pZFwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF92bS5vcGVuU2VsZWN0Q2F0ZWdvcnlEaWFsb2coKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3MoX3ZtLnBhcmVudF9uYW1lKSArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICAgIDogX3ZtLl9lKClcbiAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgIF9jKFwiRm9ybUlucHV0XCIsIHtcbiAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgIGlucHV0RGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiaW5wdXRcIixcbiAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCLQndCw0LfQstCw0L3QuNC1XCIsXG4gICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJuYW1lXCIsXG4gICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZXM6IF92bS5tZXNzYWdlc1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcIm1sLTE1XCIgfSwgW1xuICAgICAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImZvcm0tZ3JvdXAgbWItMFwiIH0sIFtcbiAgICAgICAgICAgICAgICBfYyhcImxhYmVsXCIsIFtfdm0uX3YoXCLQntGB0L3QvtCy0L3QvtC1INGE0L7RgtC+XCIpXSksXG4gICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImltZ191cGxvYWRfY2F0X2NvbnRhaW5lclwiIH0sIFtcbiAgICAgICAgICAgICAgICAgIF92bS5sb2FkaW5nXG4gICAgICAgICAgICAgICAgICAgID8gX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJsaXN0LXBsYWNlaG9sZGVyIG1iLTNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljU3R5bGU6IHsgaGVpZ2h0OiBcIjEwMHB4XCIgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFtfdm0uX20oMSldXG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICA6IF92bS5fZSgpLFxuICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICFfdm0ubG9hZGluZ1xuICAgICAgICAgICAgICAgICAgICA/IF9jKFwiaW1nXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImgtMTAwIHctMTAwIGltYWdlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBhdHRyczogeyBzcmM6IF92bS5pbWFnZSB9XG4gICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgOiBfdm0uX2UoKSxcbiAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAhX3ZtLmxvYWRpbmdcbiAgICAgICAgICAgICAgICAgICAgPyBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgIFwic3BhblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJ1cGxvYWRfYnRuXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF92bS51cGxvYWRDbGljaygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgW192bS5fdihcItCX0LDQs9GA0YPQt9C40YLRjFwiKV1cbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIDogX3ZtLl9lKClcbiAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgXSlcbiAgICAgICAgICBdKVxuICAgICAgICBdKVxuICAgICAgXSksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJtb2RhbC1mb290ZXJcIiB9LCBbXG4gICAgICAgIF9jKFxuICAgICAgICAgIFwiYnV0dG9uXCIsXG4gICAgICAgICAge1xuICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiYnV0dG9uIHdoaXRlXCIsXG4gICAgICAgICAgICBhdHRyczogeyB0eXBlOiBcImJ1dHRvblwiIH0sXG4gICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF92bS4kcGFyZW50LmNsb3NlRGlhbG9nKF92bS5kaWFsb2cpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIFtfdm0uX3YoXCLQl9Cw0LrRgNGL0YLRjFwiKV1cbiAgICAgICAgKSxcbiAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgX2MoXG4gICAgICAgICAgXCJidXR0b25cIixcbiAgICAgICAgICB7XG4gICAgICAgICAgICBzdGF0aWNDbGFzczogXCJidXR0b24gcHJpbWFyeSBwdWxsLXJpZ2h0XCIsXG4gICAgICAgICAgICBhdHRyczogeyB0eXBlOiBcImJ1dHRvblwiIH0sXG4gICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF92bS5zYXZlKClcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgW192bS5fdihcItCh0L7RhdGA0LDQvdC40YLRjFwiKV1cbiAgICAgICAgKVxuICAgICAgXSksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJzeXN0ZW1fbWVzc2FnZVwiIH0pXG4gICAgXSlcbiAgXSlcbn1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXG4gIGZ1bmN0aW9uKCkge1xuICAgIHZhciBfdm0gPSB0aGlzXG4gICAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gICAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gICAgcmV0dXJuIF9jKFxuICAgICAgXCJkaXZcIixcbiAgICAgIHsgc3RhdGljQ2xhc3M6IFwibGlzdC1wbGFjZWhvbGRlcl9pdGVtXCIsIHN0YXRpY1N0eWxlOiB7IGhlaWdodDogXCIzMHB4XCIgfSB9LFxuICAgICAgW1xuICAgICAgICBfYyhcImRpdlwiLCB7XG4gICAgICAgICAgc3RhdGljQ2xhc3M6IFwibGlzdC1wbGFjZWhvbGRlcl9jZWxsXCIsXG4gICAgICAgICAgc3RhdGljU3R5bGU6IHsgd2lkdGg6IFwiMTAwJVwiIH1cbiAgICAgICAgfSlcbiAgICAgIF1cbiAgICApXG4gIH0sXG4gIGZ1bmN0aW9uKCkge1xuICAgIHZhciBfdm0gPSB0aGlzXG4gICAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gICAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gICAgcmV0dXJuIF9jKFxuICAgICAgXCJkaXZcIixcbiAgICAgIHtcbiAgICAgICAgc3RhdGljQ2xhc3M6IFwibGlzdC1wbGFjZWhvbGRlcl9pdGVtXCIsXG4gICAgICAgIHN0YXRpY1N0eWxlOiB7IGhlaWdodDogXCIxMDBweFwiIH1cbiAgICAgIH0sXG4gICAgICBbXG4gICAgICAgIF9jKFwiZGl2XCIsIHtcbiAgICAgICAgICBzdGF0aWNDbGFzczogXCJsaXN0LXBsYWNlaG9sZGVyX2NlbGxcIixcbiAgICAgICAgICBzdGF0aWNTdHlsZTogeyB3aWR0aDogXCIxMDAlXCIgfVxuICAgICAgICB9KVxuICAgICAgXVxuICAgIClcbiAgfVxuXVxucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5cbmV4cG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0iLCJsZXQgdmFsaWRhdGVNaXhpbiA9IHtcbiAgICBtZXRob2RzOiB7XG4gICAgICAgIGdldFZhbGlkYXRlTWVzc2FnZSh0eXBlKXtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1lc3NhZ2VzW3R5cGVdID8gdGhpcy5tZXNzYWdlc1t0eXBlXVswXSA6IG51bGw7XG4gICAgICAgIH0sXG4gICAgICAgIGhhc0Vycm9yKHR5cGUpe1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubWVzc2FnZXNbdHlwZV0gPyB0aGlzLm1lc3NhZ2VzW3R5cGVdWzBdIDogbnVsbDtcbiAgICAgICAgfSxcbiAgICB9XG59O1xuZXhwb3J0IGRlZmF1bHQgdmFsaWRhdGVNaXhpbjtcbiIsImltcG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0gZnJvbSBcIi4vQ2F0ZWdvcnlEaWFsb2cudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTU5ZWU0MmM0JlwiXG5pbXBvcnQgc2NyaXB0IGZyb20gXCIuL0NhdGVnb3J5RGlhbG9nLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuZXhwb3J0ICogZnJvbSBcIi4vQ2F0ZWdvcnlEaWFsb2cudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5cblxuLyogbm9ybWFsaXplIGNvbXBvbmVudCAqL1xuaW1wb3J0IG5vcm1hbGl6ZXIgZnJvbSBcIiEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvcnVudGltZS9jb21wb25lbnROb3JtYWxpemVyLmpzXCJcbnZhciBjb21wb25lbnQgPSBub3JtYWxpemVyKFxuICBzY3JpcHQsXG4gIHJlbmRlcixcbiAgc3RhdGljUmVuZGVyRm5zLFxuICBmYWxzZSxcbiAgbnVsbCxcbiAgbnVsbCxcbiAgbnVsbFxuICBcbilcblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHtcbiAgdmFyIGFwaSA9IHJlcXVpcmUoXCJDOlxcXFxPcGVuU2VydmVyXFxcXGRvbWFpbnNcXFxcQXV0b0NSTVxcXFxub2RlX21vZHVsZXNcXFxcdnVlLWhvdC1yZWxvYWQtYXBpXFxcXGRpc3RcXFxcaW5kZXguanNcIilcbiAgYXBpLmluc3RhbGwocmVxdWlyZSgndnVlJykpXG4gIGlmIChhcGkuY29tcGF0aWJsZSkge1xuICAgIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgICBpZiAoIWFwaS5pc1JlY29yZGVkKCc1OWVlNDJjNCcpKSB7XG4gICAgICBhcGkuY3JlYXRlUmVjb3JkKCc1OWVlNDJjNCcsIGNvbXBvbmVudC5vcHRpb25zKVxuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVsb2FkKCc1OWVlNDJjNCcsIGNvbXBvbmVudC5vcHRpb25zKVxuICAgIH1cbiAgICBtb2R1bGUuaG90LmFjY2VwdChcIi4vQ2F0ZWdvcnlEaWFsb2cudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTU5ZWU0MmM0JlwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICBhcGkucmVyZW5kZXIoJzU5ZWU0MmM0Jywge1xuICAgICAgICByZW5kZXI6IHJlbmRlcixcbiAgICAgICAgc3RhdGljUmVuZGVyRm5zOiBzdGF0aWNSZW5kZXJGbnNcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxufVxuY29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJyZXNvdXJjZXMvanMvY29tcG9uZW50cy90ZW1wbGF0ZS9EaWFsb2dzL0NhdGVnb3J5RGlhbG9nLnZ1ZVwiXG5leHBvcnQgZGVmYXVsdCBjb21wb25lbnQuZXhwb3J0cyIsImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tNC0wIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vQ2F0ZWdvcnlEaWFsb2cudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiOyBleHBvcnQgZGVmYXVsdCBtb2Q7IGV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTQtMCEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0NhdGVnb3J5RGlhbG9nLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIiIsImV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3RlbXBsYXRlTG9hZGVyLmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9DYXRlZ29yeURpYWxvZy52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9NTllZTQyYzQmXCIiXSwic291cmNlUm9vdCI6IiJ9