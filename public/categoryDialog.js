(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["categoryDialog"],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/template/Dialogs/CategoryDialog.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/template/Dialogs/CategoryDialog.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  name: "CategoryDialog",
  props: ['dialog'],
  data: function data() {
    return {
      root_category: 2,
      parent_id: null,
      parent_name: null,
      id: null,
      name: null
    };
  },
  // beforeMount(){
  //     this.dialog = this.$attrs.dialog;
  // },
  mounted: function mounted() {
    var _this = this;

    console.log(this.dialog.id);
    var route_category = this.$route.params.category_id;

    if (route_category && route_category !== 'all') {
      this.root_category = route_category;
    }

    if (this.dialog.id === 0) {
      this.dialog.title = "Новая категория";
    }

    window.axios({
      method: 'get',
      url: '/data/categories/show',
      params: {
        category_id: this.root_category
      }
    }).then(function (resp) {
      _this.id = resp.data.id;
      _this.name = resp.data.name;
      _this.parent_id = resp.data.parent_id;
      _this.parent_name = resp.data.parent_name;
      _this.dialog.id = resp.data.id;
    });
  },
  computed: {},
  methods: {}
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
    _c("form", [
      _c("div", {}, [
        _c("div", { staticClass: "box-body" }, [
          _c("div", { staticClass: "form-group" }, [
            _c("label", [_vm._v("В категории")]),
            _vm._v(" "),
            _c("div", { staticClass: "input-group mb-3" }, [
              _c(
                "button",
                {
                  staticClass:
                    "category_select form-control text-left button_select",
                  attrs: { type: "button", name: "category_id" }
                },
                [
                  _vm._v(
                    "\n                            " +
                      _vm._s(_vm.parent_name) +
                      "\n                        "
                  )
                ]
              )
            ])
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "form-group" }, [
            _c("label", [_vm._v("Наименование")]),
            _vm._v(" "),
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.name,
                  expression: "name"
                }
              ],
              staticClass: "form-control",
              attrs: {
                type: "text",
                placeholder: "Наименование (не более 255 символов)"
              },
              domProps: { value: _vm.name },
              on: {
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.name = $event.target.value
                }
              }
            })
          ]),
          _vm._v(" "),
          _vm._m(0)
        ])
      ]),
      _vm._v(" "),
      _vm._m(1),
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
    return _c("div", { staticClass: "form-group mb-0" }, [
      _c("label", { staticClass: "mb-5" }, [_vm._v("Основное фото")]),
      _vm._v(" "),
      _c("div", { staticStyle: { width: "110px", height: "110px" } }, [
        _c("img", { staticClass: "h-100 w-100 image", attrs: { src: "#" } })
      ]),
      _vm._v(" "),
      _c(
        "label",
        { staticClass: "upload_file pointer", attrs: { for: "shop[image]" } },
        [_vm._v("Выберите файл"), _c("div")]
      ),
      _vm._v(" "),
      _c("input", {
        attrs: {
          type: "file",
          id: "shop[image]",
          accept: "image/jpeg,image/png,image/gif",
          hidden: ""
        }
      }),
      _vm._v(" "),
      _c("input", { attrs: { type: "hidden", name: "image_id" } })
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "modal-footer" }, [
      _c("button", { staticClass: "button white" }, [_vm._v("Закрыть")]),
      _vm._v(" "),
      _c("button", { staticClass: "button primary pull-right" }, [
        _vm._v("Сохранить")
      ])
    ])
  }
]
render._withStripped = true



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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvdGVtcGxhdGUvRGlhbG9ncy9DYXRlZ29yeURpYWxvZy52dWUiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvdGVtcGxhdGUvRGlhbG9ncy9DYXRlZ29yeURpYWxvZy52dWU/OGJkMiIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvY29tcG9uZW50cy90ZW1wbGF0ZS9EaWFsb2dzL0NhdGVnb3J5RGlhbG9nLnZ1ZSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvY29tcG9uZW50cy90ZW1wbGF0ZS9EaWFsb2dzL0NhdGVnb3J5RGlhbG9nLnZ1ZT9mNjdmIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9qcy9jb21wb25lbnRzL3RlbXBsYXRlL0RpYWxvZ3MvQ2F0ZWdvcnlEaWFsb2cudnVlP2ZhYTUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXVDQTtBQUNBLHdCQURBO0FBRUEsbUJBRkE7QUFHQTtBQUNBO0FBQ0Esc0JBREE7QUFFQSxxQkFGQTtBQUdBLHVCQUhBO0FBSUEsY0FKQTtBQUtBO0FBTEE7QUFPQSxHQVhBO0FBWUE7QUFDQTtBQUNBO0FBQ0EsU0FmQSxxQkFlQTtBQUFBOztBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBLG1CQURBO0FBRUEsa0NBRkE7QUFHQTtBQUNBO0FBREE7QUFIQSxPQU1BLElBTkEsQ0FNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQVpBO0FBYUEsR0F0Q0E7QUF1Q0EsY0F2Q0E7QUEwQ0E7QUExQ0EsRzs7Ozs7Ozs7Ozs7O0FDdkNBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQixtQkFBbUIsMEJBQTBCO0FBQzdDLHFCQUFxQiw0QkFBNEI7QUFDakQ7QUFDQTtBQUNBLHVCQUF1QixrQ0FBa0M7QUFDekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQjtBQUMxQixpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQiw0QkFBNEI7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmLHlCQUF5QixrQkFBa0I7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLGdDQUFnQztBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLGlDQUFpQztBQUN2RCxtQkFBbUIsc0JBQXNCO0FBQ3pDO0FBQ0EsaUJBQWlCLGVBQWUsa0NBQWtDLEVBQUU7QUFDcEUsbUJBQW1CLDJDQUEyQyxXQUFXLEVBQUU7QUFDM0U7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTLDZDQUE2QyxxQkFBcUIsRUFBRTtBQUM3RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLG1CQUFtQixTQUFTLG1DQUFtQyxFQUFFO0FBQ2pFO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLDhCQUE4QjtBQUNwRCxvQkFBb0IsOEJBQThCO0FBQ2xEO0FBQ0Esb0JBQW9CLDJDQUEyQztBQUMvRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDaEhBO0FBQUE7QUFBQTtBQUFBO0FBQTZGO0FBQzNCO0FBQ0w7OztBQUc3RDtBQUNtRztBQUNuRyxnQkFBZ0IsMkdBQVU7QUFDMUIsRUFBRSxvRkFBTTtBQUNSLEVBQUUseUZBQU07QUFDUixFQUFFLGtHQUFlO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsSUFBSSxLQUFVLEVBQUUsWUFpQmY7QUFDRDtBQUNlLGdGOzs7Ozs7Ozs7Ozs7QUN0Q2Y7QUFBQTtBQUFBLHdDQUEwTSxDQUFnQiwwUEFBRyxFQUFDLEM7Ozs7Ozs7Ozs7OztBQ0E5TjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEiLCJmaWxlIjoiY2F0ZWdvcnlEaWFsb2cuanMiLCJzb3VyY2VzQ29udGVudCI6WyI8dGVtcGxhdGU+XHJcbiAgICA8ZGl2PlxyXG4gICAgICAgIDxmb3JtID5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIlwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJveC1ib2R5XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsID7QkiDQutCw0YLQtdCz0L7RgNC40Lg8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXAgbWItM1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgbmFtZT1cImNhdGVnb3J5X2lkXCIgY2xhc3M9XCJjYXRlZ29yeV9zZWxlY3QgZm9ybS1jb250cm9sIHRleHQtbGVmdCBidXR0b25fc2VsZWN0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3sgcGFyZW50X25hbWUgfX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgPtCd0LDQuNC80LXQvdC+0LLQsNC90LjQtTwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHYtbW9kZWw9XCJuYW1lXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBwbGFjZWhvbGRlcj1cItCd0LDQuNC80LXQvdC+0LLQsNC90LjQtSAo0L3QtSDQsdC+0LvQtdC1IDI1NSDRgdC40LzQstC+0LvQvtCyKVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwIG1iLTBcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzPVwibWItNVwiPtCe0YHQvdC+0LLQvdC+0LUg0YTQvtGC0L48L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPVwid2lkdGg6IDExMHB4OyBoZWlnaHQ6IDExMHB4O1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBjbGFzcz1cImgtMTAwIHctMTAwIGltYWdlXCIgc3JjPVwiI1wiIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJ1cGxvYWRfZmlsZSBwb2ludGVyXCIgZm9yPVwic2hvcFtpbWFnZV1cIj7QktGL0LHQtdGA0LjRgtC1INGE0LDQudC7PGRpdj48L2Rpdj48L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImZpbGVcIiBpZD1cInNob3BbaW1hZ2VdXCIgIGFjY2VwdD1cImltYWdlL2pwZWcsaW1hZ2UvcG5nLGltYWdlL2dpZlwiIGhpZGRlbi8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiaGlkZGVuXCIgbmFtZT1cImltYWdlX2lkXCIgIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1mb290ZXJcIj5cclxuICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidXR0b24gd2hpdGVcIiA+0JfQsNC60YDRi9GC0Yw8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidXR0b24gcHJpbWFyeSBwdWxsLXJpZ2h0XCI+0KHQvtGF0YDQsNC90LjRgtGMPC9idXR0b24+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3lzdGVtX21lc3NhZ2VcIj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9mb3JtPlxyXG4gICAgPC9kaXY+XHJcbjwvdGVtcGxhdGU+XHJcblxyXG48c2NyaXB0PlxyXG4gICAgZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgICAgIG5hbWU6IFwiQ2F0ZWdvcnlEaWFsb2dcIixcclxuICAgICAgICBwcm9wczpbJ2RpYWxvZyddLFxyXG4gICAgICAgIGRhdGE6ICgpPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgcm9vdF9jYXRlZ29yeTogMixcclxuICAgICAgICAgICAgICAgIHBhcmVudF9pZDogbnVsbCxcclxuICAgICAgICAgICAgICAgIHBhcmVudF9uYW1lOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgaWQ6IG51bGwsXHJcbiAgICAgICAgICAgICAgICBuYW1lOiBudWxsLFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICAvLyBiZWZvcmVNb3VudCgpe1xyXG4gICAgICAgIC8vICAgICB0aGlzLmRpYWxvZyA9IHRoaXMuJGF0dHJzLmRpYWxvZztcclxuICAgICAgICAvLyB9LFxyXG4gICAgICAgIG1vdW50ZWQoKXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5kaWFsb2cuaWQpO1xyXG4gICAgICAgICAgICBsZXQgcm91dGVfY2F0ZWdvcnkgPSB0aGlzLiRyb3V0ZS5wYXJhbXMuY2F0ZWdvcnlfaWQ7XHJcbiAgICAgICAgICAgIGlmKHJvdXRlX2NhdGVnb3J5ICYmIHJvdXRlX2NhdGVnb3J5ICE9PSAnYWxsJyl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJvb3RfY2F0ZWdvcnkgPSByb3V0ZV9jYXRlZ29yeTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYodGhpcy5kaWFsb2cuaWQgPT09IDApe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kaWFsb2cudGl0bGUgPSBcItCd0L7QstCw0Y8g0LrQsNGC0LXQs9C+0YDQuNGPXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgd2luZG93LmF4aW9zKHtcclxuICAgICAgICAgICAgICAgIG1ldGhvZDogJ2dldCcsXHJcbiAgICAgICAgICAgICAgICB1cmw6ICcvZGF0YS9jYXRlZ29yaWVzL3Nob3cnLFxyXG4gICAgICAgICAgICAgICAgcGFyYW1zOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2F0ZWdvcnlfaWQ6IHRoaXMucm9vdF9jYXRlZ29yeVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KS50aGVuKChyZXNwKSA9PiAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pZCA9IHJlc3AuZGF0YS5pZDtcclxuICAgICAgICAgICAgICAgIHRoaXMubmFtZSA9IHJlc3AuZGF0YS5uYW1lO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wYXJlbnRfaWQgPSByZXNwLmRhdGEucGFyZW50X2lkO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wYXJlbnRfbmFtZSA9IHJlc3AuZGF0YS5wYXJlbnRfbmFtZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGlhbG9nLmlkID0gcmVzcC5kYXRhLmlkO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvbXB1dGVkOiB7XHJcblxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbWV0aG9kczp7XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxuPC9zY3JpcHQ+XHJcbiIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXCJkaXZcIiwgW1xuICAgIF9jKFwiZm9ybVwiLCBbXG4gICAgICBfYyhcImRpdlwiLCB7fSwgW1xuICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImJveC1ib2R5XCIgfSwgW1xuICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiZm9ybS1ncm91cFwiIH0sIFtcbiAgICAgICAgICAgIF9jKFwibGFiZWxcIiwgW192bS5fdihcItCSINC60LDRgtC10LPQvtGA0LjQuFwiKV0pLFxuICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiaW5wdXQtZ3JvdXAgbWItM1wiIH0sIFtcbiAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgXCJidXR0b25cIixcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczpcbiAgICAgICAgICAgICAgICAgICAgXCJjYXRlZ29yeV9zZWxlY3QgZm9ybS1jb250cm9sIHRleHQtbGVmdCBidXR0b25fc2VsZWN0XCIsXG4gICAgICAgICAgICAgICAgICBhdHRyczogeyB0eXBlOiBcImJ1dHRvblwiLCBuYW1lOiBcImNhdGVnb3J5X2lkXCIgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgX3ZtLl92KFxuICAgICAgICAgICAgICAgICAgICBcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgX3ZtLl9zKF92bS5wYXJlbnRfbmFtZSkgK1xuICAgICAgICAgICAgICAgICAgICAgIFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIF0pXG4gICAgICAgICAgXSksXG4gICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImZvcm0tZ3JvdXBcIiB9LCBbXG4gICAgICAgICAgICBfYyhcImxhYmVsXCIsIFtfdm0uX3YoXCLQndCw0LjQvNC10L3QvtCy0LDQvdC40LVcIildKSxcbiAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICBfYyhcImlucHV0XCIsIHtcbiAgICAgICAgICAgICAgZGlyZWN0aXZlczogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIG5hbWU6IFwibW9kZWxcIixcbiAgICAgICAgICAgICAgICAgIHJhd05hbWU6IFwidi1tb2RlbFwiLFxuICAgICAgICAgICAgICAgICAgdmFsdWU6IF92bS5uYW1lLFxuICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCJuYW1lXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImZvcm0tY29udHJvbFwiLFxuICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgIHR5cGU6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBcItCd0LDQuNC80LXQvdC+0LLQsNC90LjQtSAo0L3QtSDQsdC+0LvQtdC1IDI1NSDRgdC40LzQstC+0LvQvtCyKVwiXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIGRvbVByb3BzOiB7IHZhbHVlOiBfdm0ubmFtZSB9LFxuICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgIGlucHV0OiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgIGlmICgkZXZlbnQudGFyZ2V0LmNvbXBvc2luZykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIF92bS5uYW1lID0gJGV2ZW50LnRhcmdldC52YWx1ZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICBdKSxcbiAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgIF92bS5fbSgwKVxuICAgICAgICBdKVxuICAgICAgXSksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX3ZtLl9tKDEpLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwic3lzdGVtX21lc3NhZ2VcIiB9KVxuICAgIF0pXG4gIF0pXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW1xuICBmdW5jdGlvbigpIHtcbiAgICB2YXIgX3ZtID0gdGhpc1xuICAgIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICAgIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICAgIHJldHVybiBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImZvcm0tZ3JvdXAgbWItMFwiIH0sIFtcbiAgICAgIF9jKFwibGFiZWxcIiwgeyBzdGF0aWNDbGFzczogXCJtYi01XCIgfSwgW192bS5fdihcItCe0YHQvdC+0LLQvdC+0LUg0YTQvtGC0L5cIildKSxcbiAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY1N0eWxlOiB7IHdpZHRoOiBcIjExMHB4XCIsIGhlaWdodDogXCIxMTBweFwiIH0gfSwgW1xuICAgICAgICBfYyhcImltZ1wiLCB7IHN0YXRpY0NsYXNzOiBcImgtMTAwIHctMTAwIGltYWdlXCIsIGF0dHJzOiB7IHNyYzogXCIjXCIgfSB9KVxuICAgICAgXSksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX2MoXG4gICAgICAgIFwibGFiZWxcIixcbiAgICAgICAgeyBzdGF0aWNDbGFzczogXCJ1cGxvYWRfZmlsZSBwb2ludGVyXCIsIGF0dHJzOiB7IGZvcjogXCJzaG9wW2ltYWdlXVwiIH0gfSxcbiAgICAgICAgW192bS5fdihcItCS0YvQsdC10YDQuNGC0LUg0YTQsNC50LtcIiksIF9jKFwiZGl2XCIpXVxuICAgICAgKSxcbiAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICBfYyhcImlucHV0XCIsIHtcbiAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICB0eXBlOiBcImZpbGVcIixcbiAgICAgICAgICBpZDogXCJzaG9wW2ltYWdlXVwiLFxuICAgICAgICAgIGFjY2VwdDogXCJpbWFnZS9qcGVnLGltYWdlL3BuZyxpbWFnZS9naWZcIixcbiAgICAgICAgICBoaWRkZW46IFwiXCJcbiAgICAgICAgfVxuICAgICAgfSksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX2MoXCJpbnB1dFwiLCB7IGF0dHJzOiB7IHR5cGU6IFwiaGlkZGVuXCIsIG5hbWU6IFwiaW1hZ2VfaWRcIiB9IH0pXG4gICAgXSlcbiAgfSxcbiAgZnVuY3Rpb24oKSB7XG4gICAgdmFyIF92bSA9IHRoaXNcbiAgICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgICByZXR1cm4gX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJtb2RhbC1mb290ZXJcIiB9LCBbXG4gICAgICBfYyhcImJ1dHRvblwiLCB7IHN0YXRpY0NsYXNzOiBcImJ1dHRvbiB3aGl0ZVwiIH0sIFtfdm0uX3YoXCLQl9Cw0LrRgNGL0YLRjFwiKV0pLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF9jKFwiYnV0dG9uXCIsIHsgc3RhdGljQ2xhc3M6IFwiYnV0dG9uIHByaW1hcnkgcHVsbC1yaWdodFwiIH0sIFtcbiAgICAgICAgX3ZtLl92KFwi0KHQvtGF0YDQsNC90LjRgtGMXCIpXG4gICAgICBdKVxuICAgIF0pXG4gIH1cbl1cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxuXG5leHBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IiwiaW1wb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSBmcm9tIFwiLi9DYXRlZ29yeURpYWxvZy52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9NTllZTQyYzQmXCJcbmltcG9ydCBzY3JpcHQgZnJvbSBcIi4vQ2F0ZWdvcnlEaWFsb2cudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5leHBvcnQgKiBmcm9tIFwiLi9DYXRlZ29yeURpYWxvZy52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcblxuXG4vKiBub3JtYWxpemUgY29tcG9uZW50ICovXG5pbXBvcnQgbm9ybWFsaXplciBmcm9tIFwiIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9ydW50aW1lL2NvbXBvbmVudE5vcm1hbGl6ZXIuanNcIlxudmFyIGNvbXBvbmVudCA9IG5vcm1hbGl6ZXIoXG4gIHNjcmlwdCxcbiAgcmVuZGVyLFxuICBzdGF0aWNSZW5kZXJGbnMsXG4gIGZhbHNlLFxuICBudWxsLFxuICBudWxsLFxuICBudWxsXG4gIFxuKVxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkge1xuICB2YXIgYXBpID0gcmVxdWlyZShcIkM6XFxcXE9wZW5TZXJ2ZXJcXFxcZG9tYWluc1xcXFxBdXRvQ1JNXFxcXG5vZGVfbW9kdWxlc1xcXFx2dWUtaG90LXJlbG9hZC1hcGlcXFxcZGlzdFxcXFxpbmRleC5qc1wiKVxuICBhcGkuaW5zdGFsbChyZXF1aXJlKCd2dWUnKSlcbiAgaWYgKGFwaS5jb21wYXRpYmxlKSB7XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICAgIGlmICghYXBpLmlzUmVjb3JkZWQoJzU5ZWU0MmM0JykpIHtcbiAgICAgIGFwaS5jcmVhdGVSZWNvcmQoJzU5ZWU0MmM0JywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZWxvYWQoJzU5ZWU0MmM0JywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfVxuICAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiLi9DYXRlZ29yeURpYWxvZy52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9NTllZTQyYzQmXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGFwaS5yZXJlbmRlcignNTllZTQyYzQnLCB7XG4gICAgICAgIHJlbmRlcjogcmVuZGVyLFxuICAgICAgICBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZuc1xuICAgICAgfSlcbiAgICB9KVxuICB9XG59XG5jb21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcInJlc291cmNlcy9qcy9jb21wb25lbnRzL3RlbXBsYXRlL0RpYWxvZ3MvQ2F0ZWdvcnlEaWFsb2cudnVlXCJcbmV4cG9ydCBkZWZhdWx0IGNvbXBvbmVudC5leHBvcnRzIiwiaW1wb3J0IG1vZCBmcm9tIFwiLSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS00LTAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9DYXRlZ29yeURpYWxvZy52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tNC0wIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vQ2F0ZWdvcnlEaWFsb2cudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiIiwiZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvdGVtcGxhdGVMb2FkZXIuanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0NhdGVnb3J5RGlhbG9nLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD01OWVlNDJjNCZcIiJdLCJzb3VyY2VSb290IjoiIn0=