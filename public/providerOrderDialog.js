(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["providerOrderDialog"],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/template/Dialogs/ProviderOrderDialog.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/template/Dialogs/ProviderOrderDialog.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _mixins_categoryMixin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../mixins/categoryMixin */ "./resources/js/components/mixins/categoryMixin.js");
/* harmony import */ var _mixins_supplierMixin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../mixins/supplierMixin */ "./resources/js/components/mixins/supplierMixin.js");
/* harmony import */ var _service_FormInput__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../../service/FormInput */ "./resources/js/components/service/FormInput.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  name: "ProviderOrderDialog",
  props: ['dialog'],
  mixins: [_mixins_categoryMixin__WEBPACK_IMPORTED_MODULE_0__["default"], _mixins_supplierMixin__WEBPACK_IMPORTED_MODULE_1__["default"]],
  data: function data() {
    return {
      get shop_activated() {
        var local_settings = JSON.parse(localStorage['settings']);

        var index = _.findIndex(local_settings, function (o) {
          return o.key === "shop_enabled";
        });

        return local_settings[index] ? Boolean(parseInt(local_settings[index].value)) : false;
      },

      tabs: [{
        slug: "base",
        name: "Основные",
        state: true
      }, {
        slug: "store",
        name: "Склад",
        state: false
      }, {
        slug: "shop",
        name: "Интернет магазин",
        state: false
      }, {
        slug: "barcode",
        name: "Штрихкод",
        state: false
      }, {
        slug: "entrance",
        name: "Поступления",
        state: false
      }],
      entity: {
        name: null,
        article: null,
        sp_main: false,
        sp_stock: false,
        sp_discount: 0,
        sp_discount_type: null,
        specifications: [],
        image: {
          id: null,
          path: '/images/no_image.png'
        },
        category: {
          id: 2,
          name: null
        },
        supplier: {
          id: null,
          name: 'Не выбран'
        }
      },
      messages: {},
      loading: false
    };
  },
  mounted: function mounted() {
    var _this = this;

    this.dialog.width = 600;

    if (this.dialog.id === 0) {
      this.dialog.title = "Новый продукт";
      this.getParentCategory();
    } else {
      this.loading = true;
      window.axios({
        method: 'get',
        url: '/products/' + this.dialog.id
      }).then(function (resp) {
        _this.dialog.title = "Редактирование товара '" + resp.data.name + "'";
        _this.id = resp.data.id;
        _this.entity = resp.data;
        _this.loading = false;
      })["catch"](function (error) {
        if (error.response.status === 404) {
          _this.$parent.closeDialog(_this.dialog);
        }

        _this.loading = false;
      });
    }
  },
  computed: {},
  methods: {
    selectTab: function selectTab(tab) {
      this.tabs.forEach(function (tab) {
        tab.state = false;
      });
      tab.state = true;
    },
    save: function save() {
      var _this2 = this;

      var method = this.entity.id ? 'patch' : 'post';
      var url = this.entity.id ? '/' + this.entity.id : '';
      this.loading = true;
      window.axios({
        method: method,
        url: '/products' + url,
        data: this.entity
      }).then(function (resp) {
        _this2.$eventBus.$emit('ProductUpdated', {
          id: _this2.id,
          category_id: _this2.category_id
        });

        _this2.$parent.closeDialog(_this2.dialog);

        _this2.loading = false;
      })["catch"](function (error) {
        _this2.loading = false;
        _this2.messages = error.response.data.messages;
      });
    }
  },
  components: {
    FormInput: _service_FormInput__WEBPACK_IMPORTED_MODULE_2__["default"]
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/template/Dialogs/ProviderOrderDialog.vue?vue&type=template&id=1d631fd2&":
/*!***************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/template/Dialogs/ProviderOrderDialog.vue?vue&type=template&id=1d631fd2& ***!
  \***************************************************************************************************************************************************************************************************************************************/
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
    _c("div", { staticClass: "modal-body" }, [
      _c("div", { staticClass: "row" }, [
        _c("div", { staticClass: "col-sm-4 no-pr d-flex" }, [
          _c(
            "ul",
            { staticClass: "nav" },
            _vm._l(_vm.tabs, function(tab) {
              return _c(
                "li",
                {
                  key: tab.slug,
                  staticClass: "nav-item",
                  class: { active: tab.state }
                },
                [
                  _c(
                    "a",
                    {
                      staticClass: "nav-link",
                      attrs: { href: "javascript:void(0)" },
                      on: {
                        click: function($event) {
                          return _vm.selectTab(tab)
                        }
                      }
                    },
                    [
                      _vm._v(
                        "\n                            " +
                          _vm._s(tab.name) +
                          "\n                            "
                      ),
                      _vm._m(0, true)
                    ]
                  )
                ]
              )
            }),
            0
          )
        ]),
        _vm._v(" "),
        _vm._m(1)
      ])
    ]),
    _vm._v(" "),
    _vm._m(2),
    _vm._v(" "),
    _c("div", { staticClass: "system_message" })
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("span", { staticClass: "float-right helper_danger d-none-f" }, [
      _c("i", {
        staticClass: "fa fa-exclamation-triangle text-md ml-2 text-danger"
      })
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "col-sm-8 no-pl" }, [
      _c("div", { staticClass: "tab-content no-pl" }, [
        _c(
          "div",
          { staticClass: "tab-pane active", attrs: { id: "tab_base" } },
          [
            _c("div", { staticClass: "form-group row row-sm" }, [
              _c(
                "label",
                {
                  staticClass: "col-sm-4 label-sm",
                  attrs: { for: "category_id" }
                },
                [_vm._v("Поставщик")]
              ),
              _vm._v(" "),
              _c("div", { staticClass: "input-group col-sm-8" }, [
                _c("button", {
                  staticClass:
                    "partner_select form-control text-left button_select",
                  attrs: { type: "button", name: "partner_id" }
                })
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "form-group row row-sm" }, [
              _c(
                "label",
                {
                  staticClass: "col-sm-4 label-sm",
                  attrs: { for: "category_id" }
                },
                [_vm._v("Склад")]
              ),
              _vm._v(" "),
              _c("div", { staticClass: "input-group col-sm-8" }, [
                _c("div", { staticClass: "w-100" }, [
                  _c("select", { staticClass: "form-control input-c" })
                ])
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "form-group row row-sm" }, [
              _c("div", { staticClass: "col-sm-12" }, [
                _c(
                  "textarea",
                  {
                    staticClass: "form-control",
                    staticStyle: { resize: "none", height: "70px" },
                    attrs: {
                      placeholder: "Комментарий",
                      name: "comment",
                      cols: "20",
                      rows: "6"
                    }
                  },
                  [_vm._v("23")]
                )
              ])
            ])
          ]
        ),
        _vm._v(" "),
        _c("div", { staticClass: "tab-pane", attrs: { id: "tab_items" } }, [
          _c("div", { attrs: { id: "po_list" } })
        ])
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "modal-footer" }, [
      _c("button", { staticClass: "button white uppercase-btn" }, [
        _vm._v("Закрыть")
      ]),
      _vm._v(" "),
      _c(
        "button",
        {
          staticClass: "button primary pull-right uppercase-btn",
          attrs: { type: "button" }
        },
        [_vm._v("Сохранить и закрыть")]
      ),
      _vm._v(" "),
      _c(
        "button",
        {
          staticClass: "button primary pull-right mr-15 uppercase-btn",
          attrs: { type: "button" }
        },
        [_vm._v("Сохранить")]
      )
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/mixins/categoryMixin.js":
/*!*********************************************************!*\
  !*** ./resources/js/components/mixins/categoryMixin.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var categoryMixin = {
  methods: {
    setCategory: function setCategory(category) {
      this.entity.category.id = category.id;
      this.entity.category.name = category.name;
      this.$notify({
        group: 'main',
        type: 'success',
        text: 'Категория выбрана'
      });
    },
    selectCategory: function selectCategory() {
      this.$eventBus.$emit('openDialog', {
        tag: 'selectCategory',
        params: {
          root_category: this.root_category,
          ref: this
        }
      });
    },
    getParentCategory: function getParentCategory() {
      var _this = this;

      this.loading = true;
      window.axios({
        method: 'get',
        url: '/categories/' + this.entity.category.id
      }).then(function (resp) {
        _this.entity.category.id = resp.data.id;
        _this.entity.category.name = resp.data.name;
        _this.loading = false;
      });
    }
  }
};
/* harmony default export */ __webpack_exports__["default"] = (categoryMixin);

/***/ }),

/***/ "./resources/js/components/mixins/supplierMixin.js":
/*!*********************************************************!*\
  !*** ./resources/js/components/mixins/supplierMixin.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var supplierMixin = {
  methods: {
    setSupplier: function setSupplier(supplier) {
      this.entity.supplier.id = supplier.id;
      this.entity.supplier.name = supplier.name;
      this.$notify({
        group: 'main',
        type: 'success',
        text: 'Производитель выбран'
      });
    },
    selectSupplier: function selectSupplier() {
      this.$eventBus.$emit('openDialog', {
        tag: 'selectSupplier',
        params: {
          ref: this
        }
      });
    }
  }
};
/* harmony default export */ __webpack_exports__["default"] = (supplierMixin);

/***/ }),

/***/ "./resources/js/components/template/Dialogs/ProviderOrderDialog.vue":
/*!**************************************************************************!*\
  !*** ./resources/js/components/template/Dialogs/ProviderOrderDialog.vue ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ProviderOrderDialog_vue_vue_type_template_id_1d631fd2___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ProviderOrderDialog.vue?vue&type=template&id=1d631fd2& */ "./resources/js/components/template/Dialogs/ProviderOrderDialog.vue?vue&type=template&id=1d631fd2&");
/* harmony import */ var _ProviderOrderDialog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ProviderOrderDialog.vue?vue&type=script&lang=js& */ "./resources/js/components/template/Dialogs/ProviderOrderDialog.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ProviderOrderDialog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ProviderOrderDialog_vue_vue_type_template_id_1d631fd2___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ProviderOrderDialog_vue_vue_type_template_id_1d631fd2___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/template/Dialogs/ProviderOrderDialog.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/template/Dialogs/ProviderOrderDialog.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************!*\
  !*** ./resources/js/components/template/Dialogs/ProviderOrderDialog.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ProviderOrderDialog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./ProviderOrderDialog.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/template/Dialogs/ProviderOrderDialog.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ProviderOrderDialog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/template/Dialogs/ProviderOrderDialog.vue?vue&type=template&id=1d631fd2&":
/*!*********************************************************************************************************!*\
  !*** ./resources/js/components/template/Dialogs/ProviderOrderDialog.vue?vue&type=template&id=1d631fd2& ***!
  \*********************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ProviderOrderDialog_vue_vue_type_template_id_1d631fd2___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./ProviderOrderDialog.vue?vue&type=template&id=1d631fd2& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/template/Dialogs/ProviderOrderDialog.vue?vue&type=template&id=1d631fd2&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ProviderOrderDialog_vue_vue_type_template_id_1d631fd2___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ProviderOrderDialog_vue_vue_type_template_id_1d631fd2___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvdGVtcGxhdGUvRGlhbG9ncy9Qcm92aWRlck9yZGVyRGlhbG9nLnZ1ZSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvY29tcG9uZW50cy90ZW1wbGF0ZS9EaWFsb2dzL1Byb3ZpZGVyT3JkZXJEaWFsb2cudnVlPzVkZWEiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvbWl4aW5zL2NhdGVnb3J5TWl4aW4uanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvbWl4aW5zL3N1cHBsaWVyTWl4aW4uanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvdGVtcGxhdGUvRGlhbG9ncy9Qcm92aWRlck9yZGVyRGlhbG9nLnZ1ZSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvY29tcG9uZW50cy90ZW1wbGF0ZS9EaWFsb2dzL1Byb3ZpZGVyT3JkZXJEaWFsb2cudnVlPzgxNjkiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvdGVtcGxhdGUvRGlhbG9ncy9Qcm92aWRlck9yZGVyRGlhbG9nLnZ1ZT9iOGZiIl0sIm5hbWVzIjpbImNhdGVnb3J5TWl4aW4iLCJtZXRob2RzIiwic2V0Q2F0ZWdvcnkiLCJjYXRlZ29yeSIsImVudGl0eSIsImlkIiwibmFtZSIsIiRub3RpZnkiLCJncm91cCIsInR5cGUiLCJ0ZXh0Iiwic2VsZWN0Q2F0ZWdvcnkiLCIkZXZlbnRCdXMiLCIkZW1pdCIsInRhZyIsInBhcmFtcyIsInJvb3RfY2F0ZWdvcnkiLCJyZWYiLCJnZXRQYXJlbnRDYXRlZ29yeSIsImxvYWRpbmciLCJ3aW5kb3ciLCJheGlvcyIsIm1ldGhvZCIsInVybCIsInRoZW4iLCJyZXNwIiwiZGF0YSIsInN1cHBsaWVyTWl4aW4iLCJzZXRTdXBwbGllciIsInN1cHBsaWVyIiwic2VsZWN0U3VwcGxpZXIiXSwibWFwcGlu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QUUsTUFERTtBQUVUQyxZQUFJLEVBQUUsU0FGRztBQUdUQyxZQUFJLEVBQUU7QUFIRyxPQUFiO0FBS0gsS0FUSTtBQVVMb0Isa0JBVkssNEJBVVc7QUFDWixXQUFLbEIsU0FBTCxDQUFlQyxLQUFmLENBQXFCLFlBQXJCLEVBQW1DO0FBQy9CQyxXQUFHLEVBQUUsZ0JBRDBCO0FBRS9CQyxjQUFNLEVBQUU7QUFBQ0UsYUFBRyxFQUFFO0FBQU47QUFGdUIsT0FBbkM7QUFJSDtBQWZJO0FBRE8sQ0FBcEI7QUFtQmVVLDRFQUFmLEU7Ozs7Ozs7Ozs7OztBQ25CQTtBQUFBO0FBQUE7QUFBQTtBQUFrRztBQUMzQjtBQUNMOzs7QUFHbEU7QUFDbUc7QUFDbkcsZ0JBQWdCLDJHQUFVO0FBQzFCLEVBQUUseUZBQU07QUFDUixFQUFFLDhGQUFNO0FBQ1IsRUFBRSx1R0FBZTtBQUNqQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLElBQUksS0FBVSxFQUFFLFlBaUJmO0FBQ0Q7QUFDZSxnRjs7Ozs7Ozs7Ozs7O0FDdENmO0FBQUE7QUFBQSx3Q0FBK00sQ0FBZ0IsK1BBQUcsRUFBQyxDOzs7Ozs7Ozs7Ozs7QUNBbk87QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBIiwiZmlsZSI6InByb3ZpZGVyT3JkZXJEaWFsb2cuanMiLCJzb3VyY2VzQ29udGVudCI6WyI8dGVtcGxhdGU+XG4gICAgPGRpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGFsLWJvZHlcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLXNtLTQgbm8tcHIgZC1mbGV4XCI+XG4gICAgICAgICAgICAgICAgICAgIDx1bCBjbGFzcz1cIm5hdlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGxpIHYtZm9yPVwidGFiIGluIHRhYnNcIiB2LWJpbmQ6a2V5PVwidGFiLnNsdWdcIiB2LWJpbmQ6Y2xhc3M9XCJ7J2FjdGl2ZScgOiB0YWIuc3RhdGV9XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cIm5hdi1pdGVtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGEgdi1vbjpjbGljaz1cInNlbGVjdFRhYih0YWIpXCIgY2xhc3M9XCJuYXYtbGlua1wiIGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoMClcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3sgdGFiLm5hbWUgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJmbG9hdC1yaWdodCBoZWxwZXJfZGFuZ2VyIGQtbm9uZS1mXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhIGZhLWV4Y2xhbWF0aW9uLXRyaWFuZ2xlIHRleHQtbWQgbWwtMiB0ZXh0LWRhbmdlclwiPjwvaT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1zbS04IG5vLXBsXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0YWItY29udGVudCBuby1wbFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRhYi1wYW5lIGFjdGl2ZVwiIGlkPVwidGFiX2Jhc2VcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cCByb3cgcm93LXNtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJjYXRlZ29yeV9pZFwiIGNsYXNzPVwiY29sLXNtLTQgbGFiZWwtc21cIj7Qn9C+0YHRgtCw0LLRidC40Lo8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXAgY29sLXNtLThcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIG5hbWU9XCJwYXJ0bmVyX2lkXCIgY2xhc3M9XCJwYXJ0bmVyX3NlbGVjdCBmb3JtLWNvbnRyb2wgdGV4dC1sZWZ0IGJ1dHRvbl9zZWxlY3RcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cCByb3cgcm93LXNtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJjYXRlZ29yeV9pZFwiIGNsYXNzPVwiY29sLXNtLTQgbGFiZWwtc21cIj7QodC60LvQsNC0PC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwIGNvbC1zbS04XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidy0xMDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c2VsZWN0IGNsYXNzPVwiZm9ybS1jb250cm9sIGlucHV0LWNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cCByb3cgcm93LXNtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtc20tMTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZXh0YXJlYSBwbGFjZWhvbGRlcj1cItCa0L7QvNC80LXQvdGC0LDRgNC40LlcIiBzdHlsZT1cInJlc2l6ZTogbm9uZTtoZWlnaHQ6IDcwcHg7XCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBuYW1lPVwiY29tbWVudFwiIGNvbHM9XCIyMFwiIHJvd3M9XCI2XCI+MjM8L3RleHRhcmVhPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGFiLXBhbmVcIiBpZD1cInRhYl9pdGVtc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgIGlkPVwicG9fbGlzdFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGFsLWZvb3RlclwiPlxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ1dHRvbiB3aGl0ZSB1cHBlcmNhc2UtYnRuXCI+0JfQsNC60YDRi9GC0Yw8L2J1dHRvbj5cbiAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnV0dG9uIHByaW1hcnkgcHVsbC1yaWdodCB1cHBlcmNhc2UtYnRuXCI+0KHQvtGF0YDQsNC90LjRgtGMINC4INC30LDQutGA0YvRgtGMPC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ1dHRvbiBwcmltYXJ5IHB1bGwtcmlnaHQgbXItMTUgdXBwZXJjYXNlLWJ0blwiPtCh0L7RhdGA0LDQvdC40YLRjDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzPVwic3lzdGVtX21lc3NhZ2VcIj5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuICAgIGltcG9ydCBjYXRlZ29yeU1peGluIGZyb20gXCIuLy4uLy4uL21peGlucy9jYXRlZ29yeU1peGluXCJcbiAgICBpbXBvcnQgc3VwcGxpZXJNaXhpbiBmcm9tIFwiLi8uLi8uLi9taXhpbnMvc3VwcGxpZXJNaXhpblwiXG4gICAgaW1wb3J0IEZvcm1JbnB1dCBmcm9tIFwiLi8uLi8uLi9zZXJ2aWNlL0Zvcm1JbnB1dFwiXG4gICAgZXhwb3J0IGRlZmF1bHQge1xuICAgICAgICBuYW1lOiBcIlByb3ZpZGVyT3JkZXJEaWFsb2dcIixcbiAgICAgICAgcHJvcHM6IFsnZGlhbG9nJ10sXG4gICAgICAgIG1peGluczogW2NhdGVnb3J5TWl4aW4sIHN1cHBsaWVyTWl4aW5dLFxuICAgICAgICBkYXRhOiAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGdldCBzaG9wX2FjdGl2YXRlZCgpe1xuICAgICAgICAgICAgICAgICAgICBsZXQgbG9jYWxfc2V0dGluZ3MgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZVsnc2V0dGluZ3MnXSk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBpbmRleCA9IF8uZmluZEluZGV4KGxvY2FsX3NldHRpbmdzLCBmdW5jdGlvbihvKSB7IHJldHVybiBvLmtleSA9PT0gXCJzaG9wX2VuYWJsZWRcIjsgfSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBsb2NhbF9zZXR0aW5nc1tpbmRleF0gPyBCb29sZWFuKHBhcnNlSW50KGxvY2FsX3NldHRpbmdzW2luZGV4XS52YWx1ZSkpIDogZmFsc2U7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB0YWJzOiBbXG4gICAgICAgICAgICAgICAgICAgIHtzbHVnOiBcImJhc2VcIiwgbmFtZTogXCLQntGB0L3QvtCy0L3Ri9C1XCIsIHN0YXRlOiB0cnVlfSxcbiAgICAgICAgICAgICAgICAgICAge3NsdWc6IFwic3RvcmVcIiwgbmFtZTogXCLQodC60LvQsNC0XCIsIHN0YXRlOiBmYWxzZX0sXG4gICAgICAgICAgICAgICAgICAgIHtzbHVnOiBcInNob3BcIiwgbmFtZTogXCLQmNC90YLQtdGA0L3QtdGCINC80LDQs9Cw0LfQuNC9XCIsIHN0YXRlOiBmYWxzZX0sXG4gICAgICAgICAgICAgICAgICAgIHtzbHVnOiBcImJhcmNvZGVcIiwgbmFtZTogXCLQqNGC0YDQuNGF0LrQvtC0XCIsIHN0YXRlOiBmYWxzZX0sXG4gICAgICAgICAgICAgICAgICAgIHtzbHVnOiBcImVudHJhbmNlXCIsIG5hbWU6IFwi0J/QvtGB0YLRg9C/0LvQtdC90LjRj1wiLCBzdGF0ZTogZmFsc2V9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgZW50aXR5OiB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6bnVsbCxcbiAgICAgICAgICAgICAgICAgICAgYXJ0aWNsZTpudWxsLFxuICAgICAgICAgICAgICAgICAgICBzcF9tYWluOmZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBzcF9zdG9jazpmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgc3BfZGlzY291bnQ6MCxcbiAgICAgICAgICAgICAgICAgICAgc3BfZGlzY291bnRfdHlwZTpudWxsLFxuICAgICAgICAgICAgICAgICAgICBzcGVjaWZpY2F0aW9uczpbXSxcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2U6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGF0aDogJy9pbWFnZXMvbm9faW1hZ2UucG5nJyxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgY2F0ZWdvcnk6e1xuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6MixcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6bnVsbCxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgc3VwcGxpZXI6e1xuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6bnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6J9Cd0LUg0LLRi9Cx0YDQsNC9JyxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG1lc3NhZ2VzOnt9LFxuICAgICAgICAgICAgICAgIGxvYWRpbmc6ZmFsc2UsXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIG1vdW50ZWQoKSB7XG4gICAgICAgICAgICB0aGlzLmRpYWxvZy53aWR0aCA9IDYwMDtcbiAgICAgICAgICAgIGlmICh0aGlzLmRpYWxvZy5pZCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZGlhbG9nLnRpdGxlID0gXCLQndC+0LLRi9C5INC/0YDQvtC00YPQutGCXCI7XG4gICAgICAgICAgICAgICAgdGhpcy5nZXRQYXJlbnRDYXRlZ29yeSgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHdpbmRvdy5heGlvcyh7XG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZDogJ2dldCcsXG4gICAgICAgICAgICAgICAgICAgIHVybDogJy9wcm9kdWN0cy8nICsgdGhpcy5kaWFsb2cuaWQsXG4gICAgICAgICAgICAgICAgfSkudGhlbigocmVzcCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRpYWxvZy50aXRsZSA9IFwi0KDQtdC00LDQutGC0LjRgNC+0LLQsNC90LjQtSDRgtC+0LLQsNGA0LAgJ1wiICsgcmVzcC5kYXRhLm5hbWUgKyBcIidcIjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pZCA9IHJlc3AuZGF0YS5pZDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbnRpdHkgPSByZXNwLmRhdGE7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH0pLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZihlcnJvci5yZXNwb25zZS5zdGF0dXMgPT09IDQwNCl7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRwYXJlbnQuY2xvc2VEaWFsb2codGhpcy5kaWFsb2cpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBjb21wdXRlZDoge1xuICAgICAgICB9LFxuICAgICAgICBtZXRob2RzOiB7XG4gICAgICAgICAgICBzZWxlY3RUYWIodGFiKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50YWJzLmZvckVhY2goKHRhYikgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0YWIuc3RhdGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB0YWIuc3RhdGUgPSB0cnVlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNhdmUoKXtcbiAgICAgICAgICAgICAgICBsZXQgbWV0aG9kID0gdGhpcy5lbnRpdHkuaWQgPyAncGF0Y2gnIDogJ3Bvc3QnO1xuICAgICAgICAgICAgICAgIGxldCB1cmwgPSB0aGlzLmVudGl0eS5pZCA/ICcvJyArIHRoaXMuZW50aXR5LmlkIDogJyc7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB3aW5kb3cuYXhpb3Moe1xuICAgICAgICAgICAgICAgICAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICAgICAgICAgICAgICAgICAgdXJsOiAnL3Byb2R1Y3RzJyArIHVybCxcbiAgICAgICAgICAgICAgICAgICAgZGF0YTp0aGlzLmVudGl0eSxcbiAgICAgICAgICAgICAgICB9KS50aGVuKChyZXNwKSA9PiAge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLiRldmVudEJ1cy4kZW1pdCgnUHJvZHVjdFVwZGF0ZWQnLCB7aWQ6IHRoaXMuaWQsIGNhdGVnb3J5X2lkOnRoaXMuY2F0ZWdvcnlfaWR9KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kcGFyZW50LmNsb3NlRGlhbG9nKHRoaXMuZGlhbG9nKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1lc3NhZ2VzID0gZXJyb3IucmVzcG9uc2UuZGF0YS5tZXNzYWdlcztcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgY29tcG9uZW50czp7XG4gICAgICAgICAgICBGb3JtSW5wdXRcbiAgICAgICAgfVxuICAgIH1cbjwvc2NyaXB0PlxuIiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgX3ZtID0gdGhpc1xuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gIHJldHVybiBfYyhcImRpdlwiLCBbXG4gICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJtb2RhbC1ib2R5XCIgfSwgW1xuICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJyb3dcIiB9LCBbXG4gICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiY29sLXNtLTQgbm8tcHIgZC1mbGV4XCIgfSwgW1xuICAgICAgICAgIF9jKFxuICAgICAgICAgICAgXCJ1bFwiLFxuICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJuYXZcIiB9LFxuICAgICAgICAgICAgX3ZtLl9sKF92bS50YWJzLCBmdW5jdGlvbih0YWIpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIF9jKFxuICAgICAgICAgICAgICAgIFwibGlcIixcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBrZXk6IHRhYi5zbHVnLFxuICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwibmF2LWl0ZW1cIixcbiAgICAgICAgICAgICAgICAgIGNsYXNzOiB7IGFjdGl2ZTogdGFiLnN0YXRlIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICBcImFcIixcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcIm5hdi1saW5rXCIsXG4gICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgaHJlZjogXCJqYXZhc2NyaXB0OnZvaWQoMClcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfdm0uc2VsZWN0VGFiKHRhYilcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXG4gICAgICAgICAgICAgICAgICAgICAgICBcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fcyh0YWIubmFtZSkgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICBcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlxuICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgX3ZtLl9tKDAsIHRydWUpXG4gICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgMFxuICAgICAgICAgIClcbiAgICAgICAgXSksXG4gICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgIF92bS5fbSgxKVxuICAgICAgXSlcbiAgICBdKSxcbiAgICBfdm0uX3YoXCIgXCIpLFxuICAgIF92bS5fbSgyKSxcbiAgICBfdm0uX3YoXCIgXCIpLFxuICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwic3lzdGVtX21lc3NhZ2VcIiB9KVxuICBdKVxufVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtcbiAgZnVuY3Rpb24oKSB7XG4gICAgdmFyIF92bSA9IHRoaXNcbiAgICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgICByZXR1cm4gX2MoXCJzcGFuXCIsIHsgc3RhdGljQ2xhc3M6IFwiZmxvYXQtcmlnaHQgaGVscGVyX2RhbmdlciBkLW5vbmUtZlwiIH0sIFtcbiAgICAgIF9jKFwiaVwiLCB7XG4gICAgICAgIHN0YXRpY0NsYXNzOiBcImZhIGZhLWV4Y2xhbWF0aW9uLXRyaWFuZ2xlIHRleHQtbWQgbWwtMiB0ZXh0LWRhbmdlclwiXG4gICAgICB9KVxuICAgIF0pXG4gIH0sXG4gIGZ1bmN0aW9uKCkge1xuICAgIHZhciBfdm0gPSB0aGlzXG4gICAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gICAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gICAgcmV0dXJuIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiY29sLXNtLTggbm8tcGxcIiB9LCBbXG4gICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcInRhYi1jb250ZW50IG5vLXBsXCIgfSwgW1xuICAgICAgICBfYyhcbiAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwidGFiLXBhbmUgYWN0aXZlXCIsIGF0dHJzOiB7IGlkOiBcInRhYl9iYXNlXCIgfSB9LFxuICAgICAgICAgIFtcbiAgICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiZm9ybS1ncm91cCByb3cgcm93LXNtXCIgfSwgW1xuICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICBcImxhYmVsXCIsXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiY29sLXNtLTQgbGFiZWwtc21cIixcbiAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IGZvcjogXCJjYXRlZ29yeV9pZFwiIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFtfdm0uX3YoXCLQn9C+0YHRgtCw0LLRidC40LpcIildXG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiaW5wdXQtZ3JvdXAgY29sLXNtLThcIiB9LCBbXG4gICAgICAgICAgICAgICAgX2MoXCJidXR0b25cIiwge1xuICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6XG4gICAgICAgICAgICAgICAgICAgIFwicGFydG5lcl9zZWxlY3QgZm9ybS1jb250cm9sIHRleHQtbGVmdCBidXR0b25fc2VsZWN0XCIsXG4gICAgICAgICAgICAgICAgICBhdHRyczogeyB0eXBlOiBcImJ1dHRvblwiLCBuYW1lOiBcInBhcnRuZXJfaWRcIiB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiZm9ybS1ncm91cCByb3cgcm93LXNtXCIgfSwgW1xuICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICBcImxhYmVsXCIsXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiY29sLXNtLTQgbGFiZWwtc21cIixcbiAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IGZvcjogXCJjYXRlZ29yeV9pZFwiIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFtfdm0uX3YoXCLQodC60LvQsNC0XCIpXVxuICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImlucHV0LWdyb3VwIGNvbC1zbS04XCIgfSwgW1xuICAgICAgICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwidy0xMDBcIiB9LCBbXG4gICAgICAgICAgICAgICAgICBfYyhcInNlbGVjdFwiLCB7IHN0YXRpY0NsYXNzOiBcImZvcm0tY29udHJvbCBpbnB1dC1jXCIgfSlcbiAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgXSksXG4gICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJmb3JtLWdyb3VwIHJvdyByb3ctc21cIiB9LCBbXG4gICAgICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiY29sLXNtLTEyXCIgfSwgW1xuICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgXCJ0ZXh0YXJlYVwiLFxuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJmb3JtLWNvbnRyb2xcIixcbiAgICAgICAgICAgICAgICAgICAgc3RhdGljU3R5bGU6IHsgcmVzaXplOiBcIm5vbmVcIiwgaGVpZ2h0OiBcIjcwcHhcIiB9LFxuICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBcItCa0L7QvNC80LXQvdGC0LDRgNC40LlcIixcbiAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNvbW1lbnRcIixcbiAgICAgICAgICAgICAgICAgICAgICBjb2xzOiBcIjIwXCIsXG4gICAgICAgICAgICAgICAgICAgICAgcm93czogXCI2XCJcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIFtfdm0uX3YoXCIyM1wiKV1cbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICBdKVxuICAgICAgICAgIF1cbiAgICAgICAgKSxcbiAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJ0YWItcGFuZVwiLCBhdHRyczogeyBpZDogXCJ0YWJfaXRlbXNcIiB9IH0sIFtcbiAgICAgICAgICBfYyhcImRpdlwiLCB7IGF0dHJzOiB7IGlkOiBcInBvX2xpc3RcIiB9IH0pXG4gICAgICAgIF0pXG4gICAgICBdKVxuICAgIF0pXG4gIH0sXG4gIGZ1bmN0aW9uKCkge1xuICAgIHZhciBfdm0gPSB0aGlzXG4gICAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gICAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gICAgcmV0dXJuIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwibW9kYWwtZm9vdGVyXCIgfSwgW1xuICAgICAgX2MoXCJidXR0b25cIiwgeyBzdGF0aWNDbGFzczogXCJidXR0b24gd2hpdGUgdXBwZXJjYXNlLWJ0blwiIH0sIFtcbiAgICAgICAgX3ZtLl92KFwi0JfQsNC60YDRi9GC0YxcIilcbiAgICAgIF0pLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF9jKFxuICAgICAgICBcImJ1dHRvblwiLFxuICAgICAgICB7XG4gICAgICAgICAgc3RhdGljQ2xhc3M6IFwiYnV0dG9uIHByaW1hcnkgcHVsbC1yaWdodCB1cHBlcmNhc2UtYnRuXCIsXG4gICAgICAgICAgYXR0cnM6IHsgdHlwZTogXCJidXR0b25cIiB9XG4gICAgICAgIH0sXG4gICAgICAgIFtfdm0uX3YoXCLQodC+0YXRgNCw0L3QuNGC0Ywg0Lgg0LfQsNC60YDRi9GC0YxcIildXG4gICAgICApLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF9jKFxuICAgICAgICBcImJ1dHRvblwiLFxuICAgICAgICB7XG4gICAgICAgICAgc3RhdGljQ2xhc3M6IFwiYnV0dG9uIHByaW1hcnkgcHVsbC1yaWdodCBtci0xNSB1cHBlcmNhc2UtYnRuXCIsXG4gICAgICAgICAgYXR0cnM6IHsgdHlwZTogXCJidXR0b25cIiB9XG4gICAgICAgIH0sXG4gICAgICAgIFtfdm0uX3YoXCLQodC+0YXRgNCw0L3QuNGC0YxcIildXG4gICAgICApXG4gICAgXSlcbiAgfVxuXVxucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5cbmV4cG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0iLCJsZXQgY2F0ZWdvcnlNaXhpbiA9IHtcbiAgICBtZXRob2RzOiB7XG4gICAgICAgIHNldENhdGVnb3J5KGNhdGVnb3J5KXtcbiAgICAgICAgICAgIHRoaXMuZW50aXR5LmNhdGVnb3J5LmlkID0gY2F0ZWdvcnkuaWQ7XG4gICAgICAgICAgICB0aGlzLmVudGl0eS5jYXRlZ29yeS5uYW1lID0gY2F0ZWdvcnkubmFtZTtcbiAgICAgICAgICAgIHRoaXMuJG5vdGlmeSh7XG4gICAgICAgICAgICAgICAgZ3JvdXA6ICdtYWluJyxcbiAgICAgICAgICAgICAgICB0eXBlOiAnc3VjY2VzcycsXG4gICAgICAgICAgICAgICAgdGV4dDogJ9Ca0LDRgtC10LPQvtGA0LjRjyDQstGL0LHRgNCw0L3QsCdcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBzZWxlY3RDYXRlZ29yeSgpe1xuICAgICAgICAgICAgdGhpcy4kZXZlbnRCdXMuJGVtaXQoJ29wZW5EaWFsb2cnLCB7XG4gICAgICAgICAgICAgICAgdGFnOiAnc2VsZWN0Q2F0ZWdvcnknLFxuICAgICAgICAgICAgICAgIHBhcmFtczoge3Jvb3RfY2F0ZWdvcnk6dGhpcy5yb290X2NhdGVnb3J5LCByZWY6IHRoaXN9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0UGFyZW50Q2F0ZWdvcnkoKXtcbiAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IHRydWU7XG4gICAgICAgICAgICB3aW5kb3cuYXhpb3Moe1xuICAgICAgICAgICAgICAgIG1ldGhvZDogJ2dldCcsXG4gICAgICAgICAgICAgICAgdXJsOiAnL2NhdGVnb3JpZXMvJyArIHRoaXMuZW50aXR5LmNhdGVnb3J5LmlkLFxuICAgICAgICAgICAgfSkudGhlbigocmVzcCkgPT4gIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVudGl0eS5jYXRlZ29yeS5pZCA9IHJlc3AuZGF0YS5pZDtcbiAgICAgICAgICAgICAgICB0aGlzLmVudGl0eS5jYXRlZ29yeS5uYW1lID0gcmVzcC5kYXRhLm5hbWU7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICB9XG59O1xuZXhwb3J0IGRlZmF1bHQgY2F0ZWdvcnlNaXhpbjtcbiIsImxldCBzdXBwbGllck1peGluID0ge1xuICAgIG1ldGhvZHM6IHtcbiAgICAgICAgc2V0U3VwcGxpZXIoc3VwcGxpZXIpe1xuICAgICAgICAgICAgdGhpcy5lbnRpdHkuc3VwcGxpZXIuaWQgPSBzdXBwbGllci5pZDtcbiAgICAgICAgICAgIHRoaXMuZW50aXR5LnN1cHBsaWVyLm5hbWUgPSBzdXBwbGllci5uYW1lO1xuICAgICAgICAgICAgdGhpcy4kbm90aWZ5KHtcbiAgICAgICAgICAgICAgICBncm91cDogJ21haW4nLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdzdWNjZXNzJyxcbiAgICAgICAgICAgICAgICB0ZXh0OiAn0J/RgNC+0LjQt9Cy0L7QtNC40YLQtdC70Ywg0LLRi9Cx0YDQsNC9J1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIHNlbGVjdFN1cHBsaWVyKCl7XG4gICAgICAgICAgICB0aGlzLiRldmVudEJ1cy4kZW1pdCgnb3BlbkRpYWxvZycsIHtcbiAgICAgICAgICAgICAgICB0YWc6ICdzZWxlY3RTdXBwbGllcicsXG4gICAgICAgICAgICAgICAgcGFyYW1zOiB7cmVmOiB0aGlzfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgfVxufTtcbmV4cG9ydCBkZWZhdWx0IHN1cHBsaWVyTWl4aW47XG4iLCJpbXBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IGZyb20gXCIuL1Byb3ZpZGVyT3JkZXJEaWFsb2cudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTFkNjMxZmQyJlwiXG5pbXBvcnQgc2NyaXB0IGZyb20gXCIuL1Byb3ZpZGVyT3JkZXJEaWFsb2cudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5leHBvcnQgKiBmcm9tIFwiLi9Qcm92aWRlck9yZGVyRGlhbG9nLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuXG5cbi8qIG5vcm1hbGl6ZSBjb21wb25lbnQgKi9cbmltcG9ydCBub3JtYWxpemVyIGZyb20gXCIhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3J1bnRpbWUvY29tcG9uZW50Tm9ybWFsaXplci5qc1wiXG52YXIgY29tcG9uZW50ID0gbm9ybWFsaXplcihcbiAgc2NyaXB0LFxuICByZW5kZXIsXG4gIHN0YXRpY1JlbmRlckZucyxcbiAgZmFsc2UsXG4gIG51bGwsXG4gIG51bGwsXG4gIG51bGxcbiAgXG4pXG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7XG4gIHZhciBhcGkgPSByZXF1aXJlKFwiQzpcXFxcT3BlblNlcnZlclxcXFxkb21haW5zXFxcXEF1dG9DUk1cXFxcbm9kZV9tb2R1bGVzXFxcXHZ1ZS1ob3QtcmVsb2FkLWFwaVxcXFxkaXN0XFxcXGluZGV4LmpzXCIpXG4gIGFwaS5pbnN0YWxsKHJlcXVpcmUoJ3Z1ZScpKVxuICBpZiAoYXBpLmNvbXBhdGlibGUpIHtcbiAgICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gICAgaWYgKCFhcGkuaXNSZWNvcmRlZCgnMWQ2MzFmZDInKSkge1xuICAgICAgYXBpLmNyZWF0ZVJlY29yZCgnMWQ2MzFmZDInLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbG9hZCgnMWQ2MzFmZDInLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIuL1Byb3ZpZGVyT3JkZXJEaWFsb2cudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTFkNjMxZmQyJlwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICBhcGkucmVyZW5kZXIoJzFkNjMxZmQyJywge1xuICAgICAgICByZW5kZXI6IHJlbmRlcixcbiAgICAgICAgc3RhdGljUmVuZGVyRm5zOiBzdGF0aWNSZW5kZXJGbnNcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxufVxuY29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJyZXNvdXJjZXMvanMvY29tcG9uZW50cy90ZW1wbGF0ZS9EaWFsb2dzL1Byb3ZpZGVyT3JkZXJEaWFsb2cudnVlXCJcbmV4cG9ydCBkZWZhdWx0IGNvbXBvbmVudC5leHBvcnRzIiwiaW1wb3J0IG1vZCBmcm9tIFwiLSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS00LTAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9Qcm92aWRlck9yZGVyRGlhbG9nLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIjsgZXhwb3J0IGRlZmF1bHQgbW9kOyBleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS00LTAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9Qcm92aWRlck9yZGVyRGlhbG9nLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIiIsImV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3RlbXBsYXRlTG9hZGVyLmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9Qcm92aWRlck9yZGVyRGlhbG9nLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD0xZDYzMWZkMiZcIiJdLCJzb3VyY2VSb290IjoiIn0=