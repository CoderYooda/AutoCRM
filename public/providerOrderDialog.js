(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["providerOrderDialog"],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/service/List.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/service/List.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************/
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
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  props: ['data'],
  name: "List",
  data: function data() {
    return {
      items: []
    };
  },
  methods: {
    getHeaderStyle: function getHeaderStyle(item) {
      var style = {};
      if (item.type === 'hidden') style.display = 'none';

      if (item.width === 'auto') {
        style.flex = 1;
      } else {
        style.width = item.width + 'px';
      }

      if (item.min_with) style.minWidth = item.min_with + 'px';
      return style;
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/template/Dialogs/ProviderOrderDialog.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/template/Dialogs/ProviderOrderDialog.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _mixins_storeMixin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../mixins/storeMixin */ "./resources/js/components/mixins/storeMixin.js");
/* harmony import */ var _mixins_categoryMixin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../mixins/categoryMixin */ "./resources/js/components/mixins/categoryMixin.js");
/* harmony import */ var _mixins_partnerMixin__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../../mixins/partnerMixin */ "./resources/js/components/mixins/partnerMixin.js");
/* harmony import */ var _mixins_supplierMixin__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../../mixins/supplierMixin */ "./resources/js/components/mixins/supplierMixin.js");
/* harmony import */ var _service_FormInput__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../../service/FormInput */ "./resources/js/components/service/FormInput.vue");
/* harmony import */ var _service_List__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./../../service/List */ "./resources/js/components/service/List.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  mixins: [_mixins_categoryMixin__WEBPACK_IMPORTED_MODULE_1__["default"], _mixins_supplierMixin__WEBPACK_IMPORTED_MODULE_3__["default"], _mixins_partnerMixin__WEBPACK_IMPORTED_MODULE_2__["default"], _mixins_storeMixin__WEBPACK_IMPORTED_MODULE_0__["default"]],
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
        slug: "items",
        name: "Позиции",
        state: false
      }],
      entity: {
        id: null,
        articles: [],
        store: {
          id: null,
          name: "Не выбран"
        },
        partner: {
          id: null,
          companyName: 'Не выбран',
          fio: 'Не выбран',
          type: 2
        }
      },
      list_data: {
        header: [{
          min_with: NaN,
          width: NaN,
          name: 'pivot_id',
          table_name: 'pivot_id',
          type: 'hidden'
        }, {
          min_with: NaN,
          width: NaN,
          name: 'product_id',
          table_name: 'product_id',
          type: 'hidden'
        }, {
          min_with: 100,
          width: 'auto',
          name: 'Наименование',
          table_name: 'name',
          type: 'text'
        }, {
          min_with: 100,
          width: 100,
          name: 'Артикул',
          table_name: 'article',
          type: 'text'
        }, {
          min_with: 65,
          width: 65,
          name: 'Кол-во',
          table_name: 'count',
          type: 'counter'
        }, {
          min_with: 80,
          width: 80,
          name: 'Цена',
          table_name: 'price',
          type: 'price'
        }, {
          min_with: 70,
          width: 70,
          name: 'НДС, %',
          table_name: 'nds_percent',
          type: 'passive'
        }, {
          min_with: 70,
          width: 70,
          name: 'НДС',
          table_name: 'nds',
          type: 'passive'
        }, {
          min_with: 100,
          width: 100,
          name: 'Итого',
          table_name: 'total',
          type: 'passive'
        }],
        prefs: {
          index: 'ordinal',
          use_nds: true,
          can_add_items: true,
          nds: true,
          nds_included: true
        },
        items: []
      },
      messages: {},
      loading: false
    };
  },
  mounted: function mounted() {
    var _this = this;

    this.dialog.width = 1000;

    if (this.dialog.id === 0) {
      this.dialog.title = "Новая заявка поставщику";
    } else {
      this.loading = true;
      window.axios({
        method: 'get',
        url: '/provider_orders/' + this.dialog.id
      }).then(function (resp) {
        _this.id = resp.data.id;
        _this.entity = resp.data;
        _this.list_data.items = resp.data.articles;
        _this.dialog.title = "Редактирование заказа поставщику №'" + _this.entity.id + "'";
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
    FormInput: _service_FormInput__WEBPACK_IMPORTED_MODULE_4__["default"],
    List: _service_List__WEBPACK_IMPORTED_MODULE_5__["default"]
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/service/List.vue?vue&type=template&id=d7a1c8ba&scoped=true&":
/*!***************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/service/List.vue?vue&type=template&id=d7a1c8ba&scoped=true& ***!
  \***************************************************************************************************************************************************************************************************************************/
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
  return _c("div", { attrs: { id: "po_list" } }, [
    _c("div", { staticClass: "list-container" }, [
      _vm._m(0),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "list-header" },
        _vm._l(_vm.data.header, function(item) {
          return _c(
            "div",
            { staticClass: "header-elem", style: _vm.getHeaderStyle(item) },
            [
              _c("span", { staticClass: "head-title" }, [
                _vm._v(_vm._s(item.name))
              ])
            ]
          )
        }),
        0
      ),
      _vm._v(" "),
      _vm._m(1),
      _vm._v(" "),
      _vm._m(2)
    ])
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "title_cont" }, [
      _c("div", { staticClass: "header_title" }, [
        _vm._v("Список номенклатур")
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "nds_container" }, [
        _c("label", { staticClass: "checkbox-title", attrs: { for: "nds" } }, [
          _vm._v("НДС:")
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "checkbox" }, [
          _c("input", { attrs: { name: "nds", id: "nds", type: "checkbox" } }),
          _c("label", { attrs: { for: "nds" } })
        ]),
        _vm._v(" "),
        _c(
          "label",
          { staticClass: "checkbox-title", attrs: { for: "nds_included" } },
          [_vm._v("включен в стоимость")]
        ),
        _vm._v(" "),
        _c("div", { staticClass: "checkbox" }, [
          _c("input", {
            attrs: {
              name: "nds_included",
              id: "nds_included",
              type: "checkbox"
            }
          }),
          _c("label", { attrs: { for: "nds_included" } })
        ])
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "list-body" }, [
      _c(
        "div",
        {
          staticClass: "body-elem",
          attrs: { id: "products_2", "data-id": "2" }
        },
        [
          _c("div", { staticClass: "list-actions" }, [
            _c("button", { staticClass: "button list-remove" }, [_vm._v("✖")])
          ]),
          _vm._v(" "),
          _c("input", {
            attrs: {
              type: "hidden",
              value: "101",
              name: "products[2][pivot_id]"
            }
          }),
          _c("input", {
            attrs: {
              type: "hidden",
              value: "16954",
              name: "products[2][product_id]"
            }
          }),
          _vm._v(" "),
          _c(
            "div",
            {
              staticClass: "cell",
              staticStyle: { flex: "1 1 0%", "min-width": "100px" }
            },
            [
              _c("div", { staticClass: "list-title title-text" }, [
                _vm._v("awdawd")
              ])
            ]
          ),
          _vm._v(" "),
          _c(
            "div",
            {
              staticClass: "cell",
              staticStyle: { width: "100px", "min-width": "100px" }
            },
            [
              _c("div", { staticClass: "list-title title-text" }, [
                _vm._v("145")
              ])
            ]
          ),
          _vm._v(" "),
          _c(
            "div",
            {
              staticClass: "cell",
              staticStyle: { width: "65px", "min-width": "65px" }
            },
            [
              _c("div", { staticClass: "list-title title-counter" }, [
                _c("input", {
                  attrs: {
                    type: "number",
                    min: "1",
                    name: "products[2][count]"
                  }
                })
              ])
            ]
          ),
          _vm._v(" "),
          _c(
            "div",
            {
              staticClass: "cell",
              staticStyle: { width: "80px", "min-width": "80px" }
            },
            [
              _c("div", { staticClass: "list-title title-price" }, [
                _c("input", {
                  attrs: {
                    type: "number",
                    min: "1",
                    step: "0.1",
                    name: "products[2][price]"
                  }
                })
              ])
            ]
          ),
          _vm._v(" "),
          _c(
            "div",
            {
              staticClass: "cell",
              staticStyle: { width: "70px", "min-width": "70px" }
            },
            [
              _c("div", { staticClass: "list-title title-passive" }, [
                _c("input", {
                  attrs: {
                    type: "number",
                    disabled: "",
                    name: "products[2][nds_percent]"
                  }
                })
              ])
            ]
          ),
          _vm._v(" "),
          _c(
            "div",
            {
              staticClass: "cell",
              staticStyle: { width: "70px", "min-width": "70px" }
            },
            [
              _c("div", { staticClass: "list-title title-passive" }, [
                _c("input", {
                  attrs: {
                    type: "number",
                    disabled: "",
                    name: "products[2][nds]"
                  }
                })
              ])
            ]
          ),
          _vm._v(" "),
          _c(
            "div",
            {
              staticClass: "cell",
              staticStyle: { width: "100px", "min-width": "100px" }
            },
            [
              _c("div", { staticClass: "list-title title-passive" }, [
                _c("input", {
                  attrs: {
                    type: "number",
                    disabled: "",
                    name: "products[2][total]"
                  }
                })
              ])
            ]
          )
        ]
      )
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "list-bottom" }, [
      _c(
        "button",
        {
          staticClass: "button list-add-button",
          attrs: { type: "button", name: "products" }
        },
        [_vm._v("Добавить позицию")]
      )
    ])
  }
]
render._withStripped = true



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
      _c("div", { staticClass: "d-flex" }, [
        _c("div", { staticClass: "link-tabs no-pr" }, [
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
        _c("div", { staticClass: "dialog_tab_holder" }, [
          _c("div", { staticClass: "tab-content no-pl" }, [
            _c(
              "div",
              { staticClass: "tab-pane", class: { active: _vm.tabs[0].state } },
              [
                _c("FormInput", {
                  attrs: {
                    inputData: {
                      type: "selector",
                      label: "Поставщик",
                      name: "partner_name",
                      onClick: "selectPartner"
                    }
                  }
                }),
                _vm._v(" "),
                _c("FormInput", {
                  attrs: {
                    inputData: {
                      type: "input",
                      label: "Склад",
                      name: "store.name",
                      onClick: "selectPartner",
                      disabled: true
                    }
                  }
                }),
                _vm._v(" "),
                _c("FormInput", {
                  attrs: {
                    inputData: {
                      type: "textarea",
                      label: "Комментарий",
                      name: "entity.comment",
                      onClick: "selectPartner",
                      height: 75
                    }
                  }
                })
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "div",
              { staticClass: "tab-pane", class: { active: _vm.tabs[1].state } },
              [_c("List", { attrs: { data: _vm.list_data } })],
              1
            )
          ])
        ])
      ])
    ]),
    _vm._v(" "),
    _vm._m(1),
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

/***/ "./resources/js/components/mixins/partnerMixin.js":
/*!********************************************************!*\
  !*** ./resources/js/components/mixins/partnerMixin.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var partnerMixin = {
  computed: {
    partner_name: function partner_name() {
      return this.entity.partner.type === 2 ? this.entity.partner.companyName : this.entity.partner.fio;
    }
  },
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
/* harmony default export */ __webpack_exports__["default"] = (partnerMixin);

/***/ }),

/***/ "./resources/js/components/mixins/storeMixin.js":
/*!******************************************************!*\
  !*** ./resources/js/components/mixins/storeMixin.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var storeMixin = {
  data: function data() {
    return {
      entity: {
        store_id: null
      }
    };
  },
  computed: {
    store: function store() {
      var stores = this.getFromLocalStorage('stores');
      this.entity.store_id = stores[0].id;
      return stores[0];
    }
  },
  methods: {}
};
/* harmony default export */ __webpack_exports__["default"] = (storeMixin);

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

/***/ "./resources/js/components/service/List.vue":
/*!**************************************************!*\
  !*** ./resources/js/components/service/List.vue ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _List_vue_vue_type_template_id_d7a1c8ba_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./List.vue?vue&type=template&id=d7a1c8ba&scoped=true& */ "./resources/js/components/service/List.vue?vue&type=template&id=d7a1c8ba&scoped=true&");
/* harmony import */ var _List_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./List.vue?vue&type=script&lang=js& */ "./resources/js/components/service/List.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _List_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _List_vue_vue_type_template_id_d7a1c8ba_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _List_vue_vue_type_template_id_d7a1c8ba_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "d7a1c8ba",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/service/List.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/service/List.vue?vue&type=script&lang=js&":
/*!***************************************************************************!*\
  !*** ./resources/js/components/service/List.vue?vue&type=script&lang=js& ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_List_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./List.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/service/List.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_List_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/service/List.vue?vue&type=template&id=d7a1c8ba&scoped=true&":
/*!*********************************************************************************************!*\
  !*** ./resources/js/components/service/List.vue?vue&type=template&id=d7a1c8ba&scoped=true& ***!
  \*********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_List_vue_vue_type_template_id_d7a1c8ba_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./List.vue?vue&type=template&id=d7a1c8ba&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/service/List.vue?vue&type=template&id=d7a1c8ba&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_List_vue_vue_type_template_id_d7a1c8ba_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_List_vue_vue_type_template_id_d7a1c8ba_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvc2VydmljZS9MaXN0LnZ1ZSIsIndlYnBhY2s6Ly8vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvdGVtcGxhdGUvRGlhbG9ncy9Qcm92aWRlck9yZGVyRGlhbG9nLnZ1ZSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvY29tcG9uZW50cy9zZXJ2aWNlL0xpc3QudnVlP2NlNjYiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvdGVtcGxhdGUvRGlhbG9ncy9Qcm92aWRlck9yZGVyRGlhbG9nLnZ1ZT81ZGVhIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9qcy9jb21wb25lbnRzL21peGlucy9jYXRlZ29yeU1peGluLmpzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9qcy9jb21wb25lbnRzL21peGlucy9wYXJ0bmVyTWl4aW4uanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvbWl4aW5zL3N0b3JlTWl4aW4uanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvbWl4aW5zL3N1cHBsaWVyTWl4aW4uanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvc2VydmljZS9MaXN0LnZ1ZSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvY29tcG9uZW50cy9zZXJ2aWNlL0xpc3QudnVlPzViNDkiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvc2VydmljZS9MaXN0LnZ1ZT9lZTlkIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9qcy9jb21wb25lbnRzL3RlbXBsYXRlL0RpYWxvZ3MvUHJvdmlkZXJPcmRlckRpYWxvZy52dWUiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvdGVtcGxhdGUvRGlhbG9ncy9Qcm92aWRlck9yZGVyRGlhbG9nLnZ1ZT84MTY5Iiwid2VicGFjazovLy8uL3Jlc291cmNlcy9qcy9jb21wb25lbnRzL3RlbXBsYXRlL0RpYWxvZ3MvUHJvdmlkZXJPcmRlckRpYWxvZy52dWU/YjhmYiJdLCJuYW1lcyI6WyJjYXRlZ29yeU1peGluIiwibWV0aG9kcyIsInNldENhdGVnb3J5IiwiY2F0ZWdvcnkiLCJlbnRpdHkiLCJpZCIsIm5hbWUiLCIkbm90aWZ5IiwiZ3JvdXAiLCJ0eXBlIiwidGV4dCIsInNlbGVjdENhdGVnb3J5IiwiJGV2ZW50QnVzIiwiJGVtaXQiLCJ0YWciLCJwYXJhbXMiLCJyb290X2NhdGVnb3J5IiwicmVmIiwiZ2V0UGFyZW50Q2F0ZWdvcnkiLCJsb2FkaW5nIiwid2luZG93IiwiYXhpb3MiLCJtZXRob2QiLCJ1cmwiLCJ0aGVuIiwicmVzcCIsImRhdGEiLCJwYXJ0bmVyTWl4aW4iLCJjb21wdXRlZCIsInBhcnRuZXJfbmFtZSIsInBhcnRuZXIiLCJjb21wYW55TmFtZSIsImZpbyIsInN0b3JlTWl4aW4iLCJzdG9yZV9pZCIsInN0b3JlIiwic3RvcmVzIiwiZ2V0RnJvbUxvY2FsU3RvcmFnZSIsInN1cHBsaWVyTWl4aW4iLCJzZXRTdXBwbGllciIsInN1cHBsaWVyIiwic2VsZWN0U3VwcGxpZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBb0VBO0FBQ0EsaUJBREE7QUFFQSxjQUZBO0FBR0E7QUFDQTtBQUNBO0FBREE7QUFHQSxHQVBBO0FBUUE7QUFDQSxrQkFEQSwwQkFDQSxJQURBLEVBQ0E7QUFDQTtBQUNBLGtDQUNBOztBQUVBO0FBQ0E7QUFDQSxPQUZBLE1BRUE7QUFDQTtBQUNBOztBQUNBLHlCQUNBO0FBRUE7QUFDQTtBQWZBO0FBUkEsRzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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RDtBQUNnRztBQUNoRyxnQkFBZ0IsMkdBQVU7QUFDMUIsRUFBRSwwRUFBTTtBQUNSLEVBQUUsMkZBQU07QUFDUixFQUFFLG9HQUFlO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsSUFBSSxLQUFVLEVBQUUsWUFpQmY7QUFDRDtBQUNlLGdGOzs7Ozs7Ozs7Ozs7QUN0Q2Y7QUFBQTtBQUFBLHdDQUEwTCxDQUFnQixnUEFBRyxFQUFDLEM7Ozs7Ozs7Ozs7OztBQ0E5TTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7Ozs7Ozs7Ozs7Ozs7QUNBQTtBQUFBO0FBQUE7QUFBQTtBQUFrRztBQUMzQjtBQUNMOzs7QUFHbEU7QUFDbUc7QUFDbkcsZ0JBQWdCLDJHQUFVO0FBQzFCLEVBQUUseUZBQU07QUFDUixFQUFFLDhGQUFNO0FBQ1IsRUFBRSx1R0FBZTtBQUNqQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLElBQUksS0FBVSxFQUFFLFlBaUJmO0FBQ0Q7QUFDZSxnRjs7Ozs7Ozs7Ozs7O0FDdENmO0FBQUE7QUFBQSx3Q0FBK00sQ0FBZ0IsK1BBQUcsRUFBQyxDOzs7Ozs7Ozs7Ozs7QUNBbk87QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBIiwiZmlsZSI6InByb3ZpZGVyT3JkZXJEaWFsb2cuanMiLCJzb3VyY2VzQ29udGVudCI6WyI8dGVtcGxhdGU+XHJcbiAgICA8ZGl2IGlkPVwicG9fbGlzdFwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJsaXN0LWNvbnRhaW5lclwiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGl0bGVfY29udFwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImhlYWRlcl90aXRsZVwiPtCh0L/QuNGB0L7QuiDQvdC+0LzQtdC90LrQu9Cw0YLRg9GAPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibmRzX2NvbnRhaW5lclwiPjxsYWJlbCBjbGFzcz1cImNoZWNrYm94LXRpdGxlXCIgZm9yPVwibmRzXCI+0J3QlNChOjwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNoZWNrYm94XCI+PGlucHV0IG5hbWU9XCJuZHNcIiBpZD1cIm5kc1wiIHR5cGU9XCJjaGVja2JveFwiPjxsYWJlbCBmb3I9XCJuZHNcIj48L2xhYmVsPjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJuZHNfaW5jbHVkZWRcIiBjbGFzcz1cImNoZWNrYm94LXRpdGxlXCI+0LLQutC70Y7Rh9C10L0g0LIg0YHRgtC+0LjQvNC+0YHRgtGMPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2hlY2tib3hcIj48aW5wdXQgbmFtZT1cIm5kc19pbmNsdWRlZFwiIGlkPVwibmRzX2luY2x1ZGVkXCIgdHlwZT1cImNoZWNrYm94XCI+PGxhYmVsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcj1cIm5kc19pbmNsdWRlZFwiPjwvbGFiZWw+PC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJsaXN0LWhlYWRlclwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiB2LWZvcj1cIml0ZW0gaW4gZGF0YS5oZWFkZXJcIiBjbGFzcz1cImhlYWRlci1lbGVtXCIgdi1iaW5kOnN0eWxlPVwiZ2V0SGVhZGVyU3R5bGUoaXRlbSlcIj5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImhlYWQtdGl0bGVcIj57eyBpdGVtLm5hbWUgfX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJsaXN0LWJvZHlcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJib2R5LWVsZW1cIiBpZD1cInByb2R1Y3RzXzJcIiBkYXRhLWlkPVwiMlwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJsaXN0LWFjdGlvbnNcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ1dHRvbiBsaXN0LXJlbW92ZVwiPuKcljwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImhpZGRlblwiIHZhbHVlPVwiMTAxXCIgbmFtZT1cInByb2R1Y3RzWzJdW3Bpdm90X2lkXVwiPjxpbnB1dCB0eXBlPVwiaGlkZGVuXCIgdmFsdWU9XCIxNjk1NFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZT1cInByb2R1Y3RzWzJdW3Byb2R1Y3RfaWRdXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNlbGxcIiBzdHlsZT1cImZsZXg6IDEgMSAwJTsgbWluLXdpZHRoOiAxMDBweDtcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImxpc3QtdGl0bGUgdGl0bGUtdGV4dFwiPmF3ZGF3ZDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjZWxsXCIgc3R5bGU9XCJ3aWR0aDogMTAwcHg7IG1pbi13aWR0aDogMTAwcHg7XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJsaXN0LXRpdGxlIHRpdGxlLXRleHRcIj4xNDU8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2VsbFwiIHN0eWxlPVwid2lkdGg6IDY1cHg7IG1pbi13aWR0aDogNjVweDtcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImxpc3QtdGl0bGUgdGl0bGUtY291bnRlclwiPjxpbnB1dCB0eXBlPVwibnVtYmVyXCIgbWluPVwiMVwiIG5hbWU9XCJwcm9kdWN0c1syXVtjb3VudF1cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNlbGxcIiBzdHlsZT1cIndpZHRoOiA4MHB4OyBtaW4td2lkdGg6IDgwcHg7XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJsaXN0LXRpdGxlIHRpdGxlLXByaWNlXCI+PGlucHV0IHR5cGU9XCJudW1iZXJcIiBtaW49XCIxXCIgc3RlcD1cIjAuMVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lPVwicHJvZHVjdHNbMl1bcHJpY2VdXCI+PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNlbGxcIiBzdHlsZT1cIndpZHRoOiA3MHB4OyBtaW4td2lkdGg6IDcwcHg7XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJsaXN0LXRpdGxlIHRpdGxlLXBhc3NpdmVcIj48aW5wdXQgdHlwZT1cIm51bWJlclwiIGRpc2FibGVkPVwiXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZT1cInByb2R1Y3RzWzJdW25kc19wZXJjZW50XVwiPjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjZWxsXCIgc3R5bGU9XCJ3aWR0aDogNzBweDsgbWluLXdpZHRoOiA3MHB4O1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibGlzdC10aXRsZSB0aXRsZS1wYXNzaXZlXCI+PGlucHV0IHR5cGU9XCJudW1iZXJcIiBkaXNhYmxlZD1cIlwiIG5hbWU9XCJwcm9kdWN0c1syXVtuZHNdXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjZWxsXCIgc3R5bGU9XCJ3aWR0aDogMTAwcHg7IG1pbi13aWR0aDogMTAwcHg7XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJsaXN0LXRpdGxlIHRpdGxlLXBhc3NpdmVcIj48aW5wdXQgdHlwZT1cIm51bWJlclwiIGRpc2FibGVkPVwiXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZT1cInByb2R1Y3RzWzJdW3RvdGFsXVwiPjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwibGlzdC1ib3R0b21cIj5cclxuICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIG5hbWU9XCJwcm9kdWN0c1wiIGNsYXNzPVwiYnV0dG9uIGxpc3QtYWRkLWJ1dHRvblwiPtCU0L7QsdCw0LLQuNGC0Ywg0L/QvtC30LjRhtC40Y48L2J1dHRvbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuPC90ZW1wbGF0ZT5cclxuXHJcbjxzY3JpcHQ+XHJcblxyXG4gICAgZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgICAgIHByb3BzOlsnZGF0YSddLFxyXG4gICAgICAgIG5hbWU6IFwiTGlzdFwiLFxyXG4gICAgICAgIGRhdGE6ICgpPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgaXRlbXM6IFtdLFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBtZXRob2RzOntcclxuICAgICAgICAgICAgZ2V0SGVhZGVyU3R5bGUoaXRlbSl7XHJcbiAgICAgICAgICAgICAgICBsZXQgc3R5bGUgPSB7fTtcclxuICAgICAgICAgICAgICAgIGlmKGl0ZW0udHlwZSA9PT0gJ2hpZGRlbicpXHJcbiAgICAgICAgICAgICAgICAgICAgc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuXHJcbiAgICAgICAgICAgICAgICBpZihpdGVtLndpZHRoID09PSAnYXV0bycpe1xyXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlLmZsZXggPSAxO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBzdHlsZS53aWR0aCA9IGl0ZW0ud2lkdGggKyAncHgnO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYoaXRlbS5taW5fd2l0aClcclxuICAgICAgICAgICAgICAgICAgICBzdHlsZS5taW5XaWR0aCA9IGl0ZW0ubWluX3dpdGggKyAncHgnO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBzdHlsZTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9XHJcbiAgICB9XHJcbjwvc2NyaXB0PlxyXG5cclxuPHN0eWxlIHNjb3BlZD5cclxuXHJcbjwvc3R5bGU+XHJcbiIsIjx0ZW1wbGF0ZT5cclxuICAgIDxkaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGFsLWJvZHlcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImQtZmxleFwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImxpbmstdGFicyBuby1wclwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDx1bCBjbGFzcz1cIm5hdlwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8bGkgdi1mb3I9XCJ0YWIgaW4gdGFic1wiIHYtYmluZDprZXk9XCJ0YWIuc2x1Z1wiIHYtYmluZDpjbGFzcz1cInsnYWN0aXZlJyA6IHRhYi5zdGF0ZX1cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJuYXYtaXRlbVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGEgdi1vbjpjbGljaz1cInNlbGVjdFRhYih0YWIpXCIgY2xhc3M9XCJuYXYtbGlua1wiIGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoMClcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7eyB0YWIubmFtZSB9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZmxvYXQtcmlnaHQgaGVscGVyX2RhbmdlciBkLW5vbmUtZlwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhIGZhLWV4Y2xhbWF0aW9uLXRyaWFuZ2xlIHRleHQtbWQgbWwtMiB0ZXh0LWRhbmdlclwiPjwvaT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICAgICAgICAgICAgPC91bD5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImRpYWxvZ190YWJfaG9sZGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRhYi1jb250ZW50IG5vLXBsXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0YWItcGFuZVwiIHYtYmluZDpjbGFzcz1cInsnYWN0aXZlJyA6IHRhYnNbMF0uc3RhdGV9XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybUlucHV0IHYtYmluZDppbnB1dERhdGE9XCJ7dHlwZTonc2VsZWN0b3InLGxhYmVsOifQn9C+0YHRgtCw0LLRidC40LonLG5hbWU6J3BhcnRuZXJfbmFtZScsIG9uQ2xpY2s6J3NlbGVjdFBhcnRuZXInfVwiIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybUlucHV0IHYtYmluZDppbnB1dERhdGE9XCJ7dHlwZTonaW5wdXQnLGxhYmVsOifQodC60LvQsNC0JyxuYW1lOidzdG9yZS5uYW1lJywgb25DbGljazonc2VsZWN0UGFydG5lcicsIGRpc2FibGVkOnRydWV9XCIgLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtSW5wdXQgdi1iaW5kOmlucHV0RGF0YT1cInt0eXBlOid0ZXh0YXJlYScsbGFiZWw6J9Ca0L7QvNC80LXQvdGC0LDRgNC40LknLG5hbWU6J2VudGl0eS5jb21tZW50Jywgb25DbGljazonc2VsZWN0UGFydG5lcicsIGhlaWdodDogNzV9XCIgLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0YWItcGFuZVwiICB2LWJpbmQ6Y2xhc3M9XCJ7J2FjdGl2ZScgOiB0YWJzWzFdLnN0YXRlfVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPExpc3Qgdi1iaW5kOmRhdGE9XCJsaXN0X2RhdGFcIi8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGFsLWZvb3RlclwiPlxyXG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnV0dG9uIHdoaXRlIHVwcGVyY2FzZS1idG5cIj7Ql9Cw0LrRgNGL0YLRjDwvYnV0dG9uPlxyXG4gICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ1dHRvbiBwcmltYXJ5IHB1bGwtcmlnaHQgdXBwZXJjYXNlLWJ0blwiPtCh0L7RhdGA0LDQvdC40YLRjCDQuCDQt9Cw0LrRgNGL0YLRjDwvYnV0dG9uPlxyXG4gICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ1dHRvbiBwcmltYXJ5IHB1bGwtcmlnaHQgbXItMTUgdXBwZXJjYXNlLWJ0blwiPtCh0L7RhdGA0LDQvdC40YLRjDwvYnV0dG9uPlxyXG4gICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwic3lzdGVtX21lc3NhZ2VcIj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG48L3RlbXBsYXRlPlxyXG5cclxuPHNjcmlwdD5cclxuICAgIGltcG9ydCBzdG9yZU1peGluIGZyb20gXCIuLy4uLy4uL21peGlucy9zdG9yZU1peGluXCJcclxuICAgIGltcG9ydCBjYXRlZ29yeU1peGluIGZyb20gXCIuLy4uLy4uL21peGlucy9jYXRlZ29yeU1peGluXCJcclxuICAgIGltcG9ydCBwYXJ0bmVyTWl4aW4gZnJvbSBcIi4vLi4vLi4vbWl4aW5zL3BhcnRuZXJNaXhpblwiXHJcbiAgICBpbXBvcnQgc3VwcGxpZXJNaXhpbiBmcm9tIFwiLi8uLi8uLi9taXhpbnMvc3VwcGxpZXJNaXhpblwiXHJcbiAgICBpbXBvcnQgRm9ybUlucHV0IGZyb20gXCIuLy4uLy4uL3NlcnZpY2UvRm9ybUlucHV0XCJcclxuICAgIGltcG9ydCBMaXN0IGZyb20gXCIuLy4uLy4uL3NlcnZpY2UvTGlzdFwiXHJcbiAgICBleHBvcnQgZGVmYXVsdCB7XHJcbiAgICAgICAgbmFtZTogXCJQcm92aWRlck9yZGVyRGlhbG9nXCIsXHJcbiAgICAgICAgcHJvcHM6IFsnZGlhbG9nJ10sXHJcbiAgICAgICAgbWl4aW5zOiBbY2F0ZWdvcnlNaXhpbiwgc3VwcGxpZXJNaXhpbiwgcGFydG5lck1peGluLCBzdG9yZU1peGluXSxcclxuICAgICAgICBkYXRhOiAoKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBnZXQgc2hvcF9hY3RpdmF0ZWQoKXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbG9jYWxfc2V0dGluZ3MgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZVsnc2V0dGluZ3MnXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGluZGV4ID0gXy5maW5kSW5kZXgobG9jYWxfc2V0dGluZ3MsIGZ1bmN0aW9uKG8pIHsgcmV0dXJuIG8ua2V5ID09PSBcInNob3BfZW5hYmxlZFwiOyB9KTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbG9jYWxfc2V0dGluZ3NbaW5kZXhdID8gQm9vbGVhbihwYXJzZUludChsb2NhbF9zZXR0aW5nc1tpbmRleF0udmFsdWUpKSA6IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHRhYnM6IFtcclxuICAgICAgICAgICAgICAgICAgICB7c2x1ZzogXCJiYXNlXCIsIG5hbWU6IFwi0J7RgdC90L7QstC90YvQtVwiLCBzdGF0ZTogdHJ1ZX0sXHJcbiAgICAgICAgICAgICAgICAgICAge3NsdWc6IFwiaXRlbXNcIiwgbmFtZTogXCLQn9C+0LfQuNGG0LjQuFwiLCBzdGF0ZTogZmFsc2V9LFxyXG4gICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgIGVudGl0eToge1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOm51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgYXJ0aWNsZXM6IFtdLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0b3JlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcItCd0LUg0LLRi9Cx0YDQsNC9XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBwYXJ0bmVyOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb21wYW55TmFtZTon0J3QtSDQstGL0LHRgNCw0L0nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaW86J9Cd0LUg0LLRi9Cx0YDQsNC9JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogMlxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBsaXN0X2RhdGE6e1xyXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7bWluX3dpdGg6IE5hTiwgIHdpZHRoOiBOYU4sICAgIG5hbWU6ICdwaXZvdF9pZCcsICAgICAgdGFibGVfbmFtZTogJ3Bpdm90X2lkJywgICAgdHlwZTogJ2hpZGRlbid9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7bWluX3dpdGg6IE5hTiwgIHdpZHRoOiBOYU4sICAgIG5hbWU6ICdwcm9kdWN0X2lkJywgICAgdGFibGVfbmFtZTogJ3Byb2R1Y3RfaWQnLCAgdHlwZTogJ2hpZGRlbid9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7bWluX3dpdGg6IDEwMCwgIHdpZHRoOiAnYXV0bycsIG5hbWU6ICfQndCw0LjQvNC10L3QvtCy0LDQvdC40LUnLCAgdGFibGVfbmFtZTogJ25hbWUnLCAgICAgICAgdHlwZTondGV4dCd9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7bWluX3dpdGg6IDEwMCwgIHdpZHRoOiAxMDAsICAgIG5hbWU6ICfQkNGA0YLQuNC60YPQuycsICAgICAgIHRhYmxlX25hbWU6ICdhcnRpY2xlJywgICAgIHR5cGU6J3RleHQnfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAge21pbl93aXRoOiA2NSwgICB3aWR0aDogNjUsICAgICBuYW1lOiAn0JrQvtC7LdCy0L4nLCAgICAgICAgdGFibGVfbmFtZTogJ2NvdW50JywgICAgICAgdHlwZTogJ2NvdW50ZXInLH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHttaW5fd2l0aDogODAsICAgd2lkdGg6IDgwLCAgICAgbmFtZTogJ9Cm0LXQvdCwJywgICAgICAgICAgdGFibGVfbmFtZTogJ3ByaWNlJywgICAgICAgdHlwZTogJ3ByaWNlJyx9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7bWluX3dpdGg6IDcwLCAgIHdpZHRoOiA3MCwgICAgIG5hbWU6ICfQndCU0KEsICUnLCAgICAgICAgdGFibGVfbmFtZTogJ25kc19wZXJjZW50JywgdHlwZTogJ3Bhc3NpdmUnLH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHttaW5fd2l0aDogNzAsICAgd2lkdGg6IDcwLCAgICAgbmFtZTogJ9Cd0JTQoScsICAgICAgICAgICB0YWJsZV9uYW1lOiAnbmRzJywgICAgICAgICB0eXBlOiAncGFzc2l2ZScsfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAge21pbl93aXRoOiAxMDAsICB3aWR0aDogMTAwLCAgICBuYW1lOiAn0JjRgtC+0LPQvicsICAgICAgICAgdGFibGVfbmFtZTogJ3RvdGFsJywgICAgICAgdHlwZTogJ3Bhc3NpdmUnLH0sXHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBwcmVmczp7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4OidvcmRpbmFsJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXNlX25kczp0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYW5fYWRkX2l0ZW1zOnRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5kczp0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZHNfaW5jbHVkZWQ6dHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbXM6W10sXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgbWVzc2FnZXM6e30sXHJcbiAgICAgICAgICAgICAgICBsb2FkaW5nOmZhbHNlLFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBtb3VudGVkKCkge1xyXG4gICAgICAgICAgICB0aGlzLmRpYWxvZy53aWR0aCA9IDEwMDA7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmRpYWxvZy5pZCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kaWFsb2cudGl0bGUgPSBcItCd0L7QstCw0Y8g0LfQsNGP0LLQutCwINC/0L7RgdGC0LDQstGJ0LjQutGDXCI7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgd2luZG93LmF4aW9zKHtcclxuICAgICAgICAgICAgICAgICAgICBtZXRob2Q6ICdnZXQnLFxyXG4gICAgICAgICAgICAgICAgICAgIHVybDogJy9wcm92aWRlcl9vcmRlcnMvJyArIHRoaXMuZGlhbG9nLmlkLFxyXG4gICAgICAgICAgICAgICAgfSkudGhlbigocmVzcCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaWQgPSByZXNwLmRhdGEuaWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbnRpdHkgPSByZXNwLmRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5saXN0X2RhdGEuaXRlbXMgPSByZXNwLmRhdGEuYXJ0aWNsZXM7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kaWFsb2cudGl0bGUgPSBcItCg0LXQtNCw0LrRgtC40YDQvtCy0LDQvdC40LUg0LfQsNC60LDQt9CwINC/0L7RgdGC0LDQstGJ0LjQutGDIOKElidcIiArIHRoaXMuZW50aXR5LmlkICsgXCInXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9KS5jYXRjaCgoZXJyb3IpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZihlcnJvci5yZXNwb25zZS5zdGF0dXMgPT09IDQwNCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJHBhcmVudC5jbG9zZURpYWxvZyh0aGlzLmRpYWxvZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvbXB1dGVkOiB7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBtZXRob2RzOiB7XHJcbiAgICAgICAgICAgIHNlbGVjdFRhYih0YWIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudGFicy5mb3JFYWNoKCh0YWIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0YWIuc3RhdGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgdGFiLnN0YXRlID0gdHJ1ZTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2F2ZSgpe1xyXG4gICAgICAgICAgICAgICAgbGV0IG1ldGhvZCA9IHRoaXMuZW50aXR5LmlkID8gJ3BhdGNoJyA6ICdwb3N0JztcclxuICAgICAgICAgICAgICAgIGxldCB1cmwgPSB0aGlzLmVudGl0eS5pZCA/ICcvJyArIHRoaXMuZW50aXR5LmlkIDogJyc7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgd2luZG93LmF4aW9zKHtcclxuICAgICAgICAgICAgICAgICAgICBtZXRob2Q6IG1ldGhvZCxcclxuICAgICAgICAgICAgICAgICAgICB1cmw6ICcvcHJvZHVjdHMnICsgdXJsLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6dGhpcy5lbnRpdHksXHJcbiAgICAgICAgICAgICAgICB9KS50aGVuKChyZXNwKSA9PiAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJGV2ZW50QnVzLiRlbWl0KCdQcm9kdWN0VXBkYXRlZCcsIHtpZDogdGhpcy5pZCwgY2F0ZWdvcnlfaWQ6dGhpcy5jYXRlZ29yeV9pZH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJHBhcmVudC5jbG9zZURpYWxvZyh0aGlzLmRpYWxvZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9KS5jYXRjaCgoZXJyb3IpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1lc3NhZ2VzID0gZXJyb3IucmVzcG9uc2UuZGF0YS5tZXNzYWdlcztcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb21wb25lbnRzOntcclxuICAgICAgICAgICAgRm9ybUlucHV0LCBMaXN0XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG48L3NjcmlwdD5cclxuIiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgX3ZtID0gdGhpc1xuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gIHJldHVybiBfYyhcImRpdlwiLCB7IGF0dHJzOiB7IGlkOiBcInBvX2xpc3RcIiB9IH0sIFtcbiAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImxpc3QtY29udGFpbmVyXCIgfSwgW1xuICAgICAgX3ZtLl9tKDApLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF9jKFxuICAgICAgICBcImRpdlwiLFxuICAgICAgICB7IHN0YXRpY0NsYXNzOiBcImxpc3QtaGVhZGVyXCIgfSxcbiAgICAgICAgX3ZtLl9sKF92bS5kYXRhLmhlYWRlciwgZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICAgIHJldHVybiBfYyhcbiAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcImhlYWRlci1lbGVtXCIsIHN0eWxlOiBfdm0uZ2V0SGVhZGVyU3R5bGUoaXRlbSkgfSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgX2MoXCJzcGFuXCIsIHsgc3RhdGljQ2xhc3M6IFwiaGVhZC10aXRsZVwiIH0sIFtcbiAgICAgICAgICAgICAgICBfdm0uX3YoX3ZtLl9zKGl0ZW0ubmFtZSkpXG4gICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICBdXG4gICAgICAgICAgKVxuICAgICAgICB9KSxcbiAgICAgICAgMFxuICAgICAgKSxcbiAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICBfdm0uX20oMSksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX3ZtLl9tKDIpXG4gICAgXSlcbiAgXSlcbn1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXG4gIGZ1bmN0aW9uKCkge1xuICAgIHZhciBfdm0gPSB0aGlzXG4gICAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gICAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gICAgcmV0dXJuIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwidGl0bGVfY29udFwiIH0sIFtcbiAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiaGVhZGVyX3RpdGxlXCIgfSwgW1xuICAgICAgICBfdm0uX3YoXCLQodC/0LjRgdC+0Log0L3QvtC80LXQvdC60LvQsNGC0YPRgFwiKVxuICAgICAgXSksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJuZHNfY29udGFpbmVyXCIgfSwgW1xuICAgICAgICBfYyhcImxhYmVsXCIsIHsgc3RhdGljQ2xhc3M6IFwiY2hlY2tib3gtdGl0bGVcIiwgYXR0cnM6IHsgZm9yOiBcIm5kc1wiIH0gfSwgW1xuICAgICAgICAgIF92bS5fdihcItCd0JTQoTpcIilcbiAgICAgICAgXSksXG4gICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiY2hlY2tib3hcIiB9LCBbXG4gICAgICAgICAgX2MoXCJpbnB1dFwiLCB7IGF0dHJzOiB7IG5hbWU6IFwibmRzXCIsIGlkOiBcIm5kc1wiLCB0eXBlOiBcImNoZWNrYm94XCIgfSB9KSxcbiAgICAgICAgICBfYyhcImxhYmVsXCIsIHsgYXR0cnM6IHsgZm9yOiBcIm5kc1wiIH0gfSlcbiAgICAgICAgXSksXG4gICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgIF9jKFxuICAgICAgICAgIFwibGFiZWxcIixcbiAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcImNoZWNrYm94LXRpdGxlXCIsIGF0dHJzOiB7IGZvcjogXCJuZHNfaW5jbHVkZWRcIiB9IH0sXG4gICAgICAgICAgW192bS5fdihcItCy0LrQu9GO0YfQtdC9INCyINGB0YLQvtC40LzQvtGB0YLRjFwiKV1cbiAgICAgICAgKSxcbiAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJjaGVja2JveFwiIH0sIFtcbiAgICAgICAgICBfYyhcImlucHV0XCIsIHtcbiAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgIG5hbWU6IFwibmRzX2luY2x1ZGVkXCIsXG4gICAgICAgICAgICAgIGlkOiBcIm5kc19pbmNsdWRlZFwiLFxuICAgICAgICAgICAgICB0eXBlOiBcImNoZWNrYm94XCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KSxcbiAgICAgICAgICBfYyhcImxhYmVsXCIsIHsgYXR0cnM6IHsgZm9yOiBcIm5kc19pbmNsdWRlZFwiIH0gfSlcbiAgICAgICAgXSlcbiAgICAgIF0pXG4gICAgXSlcbiAgfSxcbiAgZnVuY3Rpb24oKSB7XG4gICAgdmFyIF92bSA9IHRoaXNcbiAgICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgICByZXR1cm4gX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJsaXN0LWJvZHlcIiB9LCBbXG4gICAgICBfYyhcbiAgICAgICAgXCJkaXZcIixcbiAgICAgICAge1xuICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImJvZHktZWxlbVwiLFxuICAgICAgICAgIGF0dHJzOiB7IGlkOiBcInByb2R1Y3RzXzJcIiwgXCJkYXRhLWlkXCI6IFwiMlwiIH1cbiAgICAgICAgfSxcbiAgICAgICAgW1xuICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwibGlzdC1hY3Rpb25zXCIgfSwgW1xuICAgICAgICAgICAgX2MoXCJidXR0b25cIiwgeyBzdGF0aWNDbGFzczogXCJidXR0b24gbGlzdC1yZW1vdmVcIiB9LCBbX3ZtLl92KFwi4pyWXCIpXSlcbiAgICAgICAgICBdKSxcbiAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgIF9jKFwiaW5wdXRcIiwge1xuICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgdHlwZTogXCJoaWRkZW5cIixcbiAgICAgICAgICAgICAgdmFsdWU6IFwiMTAxXCIsXG4gICAgICAgICAgICAgIG5hbWU6IFwicHJvZHVjdHNbMl1bcGl2b3RfaWRdXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KSxcbiAgICAgICAgICBfYyhcImlucHV0XCIsIHtcbiAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgIHR5cGU6IFwiaGlkZGVuXCIsXG4gICAgICAgICAgICAgIHZhbHVlOiBcIjE2OTU0XCIsXG4gICAgICAgICAgICAgIG5hbWU6IFwicHJvZHVjdHNbMl1bcHJvZHVjdF9pZF1cIlxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pLFxuICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgX2MoXG4gICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJjZWxsXCIsXG4gICAgICAgICAgICAgIHN0YXRpY1N0eWxlOiB7IGZsZXg6IFwiMSAxIDAlXCIsIFwibWluLXdpZHRoXCI6IFwiMTAwcHhcIiB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImxpc3QtdGl0bGUgdGl0bGUtdGV4dFwiIH0sIFtcbiAgICAgICAgICAgICAgICBfdm0uX3YoXCJhd2Rhd2RcIilcbiAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgIF1cbiAgICAgICAgICApLFxuICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgX2MoXG4gICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJjZWxsXCIsXG4gICAgICAgICAgICAgIHN0YXRpY1N0eWxlOiB7IHdpZHRoOiBcIjEwMHB4XCIsIFwibWluLXdpZHRoXCI6IFwiMTAwcHhcIiB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImxpc3QtdGl0bGUgdGl0bGUtdGV4dFwiIH0sIFtcbiAgICAgICAgICAgICAgICBfdm0uX3YoXCIxNDVcIilcbiAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgIF1cbiAgICAgICAgICApLFxuICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgX2MoXG4gICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJjZWxsXCIsXG4gICAgICAgICAgICAgIHN0YXRpY1N0eWxlOiB7IHdpZHRoOiBcIjY1cHhcIiwgXCJtaW4td2lkdGhcIjogXCI2NXB4XCIgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJsaXN0LXRpdGxlIHRpdGxlLWNvdW50ZXJcIiB9LCBbXG4gICAgICAgICAgICAgICAgX2MoXCJpbnB1dFwiLCB7XG4gICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIm51bWJlclwiLFxuICAgICAgICAgICAgICAgICAgICBtaW46IFwiMVwiLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInByb2R1Y3RzWzJdW2NvdW50XVwiXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgIF1cbiAgICAgICAgICApLFxuICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgX2MoXG4gICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJjZWxsXCIsXG4gICAgICAgICAgICAgIHN0YXRpY1N0eWxlOiB7IHdpZHRoOiBcIjgwcHhcIiwgXCJtaW4td2lkdGhcIjogXCI4MHB4XCIgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJsaXN0LXRpdGxlIHRpdGxlLXByaWNlXCIgfSwgW1xuICAgICAgICAgICAgICAgIF9jKFwiaW5wdXRcIiwge1xuICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJudW1iZXJcIixcbiAgICAgICAgICAgICAgICAgICAgbWluOiBcIjFcIixcbiAgICAgICAgICAgICAgICAgICAgc3RlcDogXCIwLjFcIixcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwcm9kdWN0c1syXVtwcmljZV1cIlxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICBdXG4gICAgICAgICAgKSxcbiAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgIF9jKFxuICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiY2VsbFwiLFxuICAgICAgICAgICAgICBzdGF0aWNTdHlsZTogeyB3aWR0aDogXCI3MHB4XCIsIFwibWluLXdpZHRoXCI6IFwiNzBweFwiIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwibGlzdC10aXRsZSB0aXRsZS1wYXNzaXZlXCIgfSwgW1xuICAgICAgICAgICAgICAgIF9jKFwiaW5wdXRcIiwge1xuICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJudW1iZXJcIixcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicHJvZHVjdHNbMl1bbmRzX3BlcmNlbnRdXCJcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgXVxuICAgICAgICAgICksXG4gICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICBfYyhcbiAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImNlbGxcIixcbiAgICAgICAgICAgICAgc3RhdGljU3R5bGU6IHsgd2lkdGg6IFwiNzBweFwiLCBcIm1pbi13aWR0aFwiOiBcIjcwcHhcIiB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImxpc3QtdGl0bGUgdGl0bGUtcGFzc2l2ZVwiIH0sIFtcbiAgICAgICAgICAgICAgICBfYyhcImlucHV0XCIsIHtcbiAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwibnVtYmVyXCIsXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInByb2R1Y3RzWzJdW25kc11cIlxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICBdXG4gICAgICAgICAgKSxcbiAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgIF9jKFxuICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiY2VsbFwiLFxuICAgICAgICAgICAgICBzdGF0aWNTdHlsZTogeyB3aWR0aDogXCIxMDBweFwiLCBcIm1pbi13aWR0aFwiOiBcIjEwMHB4XCIgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJsaXN0LXRpdGxlIHRpdGxlLXBhc3NpdmVcIiB9LCBbXG4gICAgICAgICAgICAgICAgX2MoXCJpbnB1dFwiLCB7XG4gICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIm51bWJlclwiLFxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwcm9kdWN0c1syXVt0b3RhbF1cIlxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICBdXG4gICAgICAgICAgKVxuICAgICAgICBdXG4gICAgICApXG4gICAgXSlcbiAgfSxcbiAgZnVuY3Rpb24oKSB7XG4gICAgdmFyIF92bSA9IHRoaXNcbiAgICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgICByZXR1cm4gX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJsaXN0LWJvdHRvbVwiIH0sIFtcbiAgICAgIF9jKFxuICAgICAgICBcImJ1dHRvblwiLFxuICAgICAgICB7XG4gICAgICAgICAgc3RhdGljQ2xhc3M6IFwiYnV0dG9uIGxpc3QtYWRkLWJ1dHRvblwiLFxuICAgICAgICAgIGF0dHJzOiB7IHR5cGU6IFwiYnV0dG9uXCIsIG5hbWU6IFwicHJvZHVjdHNcIiB9XG4gICAgICAgIH0sXG4gICAgICAgIFtfdm0uX3YoXCLQlNC+0LHQsNCy0LjRgtGMINC/0L7Qt9C40YbQuNGOXCIpXVxuICAgICAgKVxuICAgIF0pXG4gIH1cbl1cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxuXG5leHBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgX3ZtID0gdGhpc1xuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gIHJldHVybiBfYyhcImRpdlwiLCBbXG4gICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJtb2RhbC1ib2R5XCIgfSwgW1xuICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJkLWZsZXhcIiB9LCBbXG4gICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwibGluay10YWJzIG5vLXByXCIgfSwgW1xuICAgICAgICAgIF9jKFxuICAgICAgICAgICAgXCJ1bFwiLFxuICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJuYXZcIiB9LFxuICAgICAgICAgICAgX3ZtLl9sKF92bS50YWJzLCBmdW5jdGlvbih0YWIpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIF9jKFxuICAgICAgICAgICAgICAgIFwibGlcIixcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBrZXk6IHRhYi5zbHVnLFxuICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwibmF2LWl0ZW1cIixcbiAgICAgICAgICAgICAgICAgIGNsYXNzOiB7IGFjdGl2ZTogdGFiLnN0YXRlIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICBcImFcIixcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcIm5hdi1saW5rXCIsXG4gICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgaHJlZjogXCJqYXZhc2NyaXB0OnZvaWQoMClcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfdm0uc2VsZWN0VGFiKHRhYilcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXG4gICAgICAgICAgICAgICAgICAgICAgICBcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fcyh0YWIubmFtZSkgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICBcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlxuICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgX3ZtLl9tKDAsIHRydWUpXG4gICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgMFxuICAgICAgICAgIClcbiAgICAgICAgXSksXG4gICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiZGlhbG9nX3RhYl9ob2xkZXJcIiB9LCBbXG4gICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJ0YWItY29udGVudCBuby1wbFwiIH0sIFtcbiAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcInRhYi1wYW5lXCIsIGNsYXNzOiB7IGFjdGl2ZTogX3ZtLnRhYnNbMF0uc3RhdGUgfSB9LFxuICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgX2MoXCJGb3JtSW5wdXRcIiwge1xuICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgaW5wdXREYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJzZWxlY3RvclwiLFxuICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcItCf0L7RgdGC0LDQstGJ0LjQulwiLFxuICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicGFydG5lcl9uYW1lXCIsXG4gICAgICAgICAgICAgICAgICAgICAgb25DbGljazogXCJzZWxlY3RQYXJ0bmVyXCJcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgX2MoXCJGb3JtSW5wdXRcIiwge1xuICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgaW5wdXREYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJpbnB1dFwiLFxuICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcItCh0LrQu9Cw0LRcIixcbiAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInN0b3JlLm5hbWVcIixcbiAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrOiBcInNlbGVjdFBhcnRuZXJcIixcbiAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICBfYyhcIkZvcm1JbnB1dFwiLCB7XG4gICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICBpbnB1dERhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcInRleHRhcmVhXCIsXG4gICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwi0JrQvtC80LzQtdC90YLQsNGA0LjQuVwiLFxuICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZW50aXR5LmNvbW1lbnRcIixcbiAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrOiBcInNlbGVjdFBhcnRuZXJcIixcbiAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IDc1XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAxXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcInRhYi1wYW5lXCIsIGNsYXNzOiB7IGFjdGl2ZTogX3ZtLnRhYnNbMV0uc3RhdGUgfSB9LFxuICAgICAgICAgICAgICBbX2MoXCJMaXN0XCIsIHsgYXR0cnM6IHsgZGF0YTogX3ZtLmxpc3RfZGF0YSB9IH0pXSxcbiAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgKVxuICAgICAgICAgIF0pXG4gICAgICAgIF0pXG4gICAgICBdKVxuICAgIF0pLFxuICAgIF92bS5fdihcIiBcIiksXG4gICAgX3ZtLl9tKDEpLFxuICAgIF92bS5fdihcIiBcIiksXG4gICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJzeXN0ZW1fbWVzc2FnZVwiIH0pXG4gIF0pXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW1xuICBmdW5jdGlvbigpIHtcbiAgICB2YXIgX3ZtID0gdGhpc1xuICAgIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICAgIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICAgIHJldHVybiBfYyhcInNwYW5cIiwgeyBzdGF0aWNDbGFzczogXCJmbG9hdC1yaWdodCBoZWxwZXJfZGFuZ2VyIGQtbm9uZS1mXCIgfSwgW1xuICAgICAgX2MoXCJpXCIsIHtcbiAgICAgICAgc3RhdGljQ2xhc3M6IFwiZmEgZmEtZXhjbGFtYXRpb24tdHJpYW5nbGUgdGV4dC1tZCBtbC0yIHRleHQtZGFuZ2VyXCJcbiAgICAgIH0pXG4gICAgXSlcbiAgfSxcbiAgZnVuY3Rpb24oKSB7XG4gICAgdmFyIF92bSA9IHRoaXNcbiAgICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgICByZXR1cm4gX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJtb2RhbC1mb290ZXJcIiB9LCBbXG4gICAgICBfYyhcImJ1dHRvblwiLCB7IHN0YXRpY0NsYXNzOiBcImJ1dHRvbiB3aGl0ZSB1cHBlcmNhc2UtYnRuXCIgfSwgW1xuICAgICAgICBfdm0uX3YoXCLQl9Cw0LrRgNGL0YLRjFwiKVxuICAgICAgXSksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX2MoXG4gICAgICAgIFwiYnV0dG9uXCIsXG4gICAgICAgIHtcbiAgICAgICAgICBzdGF0aWNDbGFzczogXCJidXR0b24gcHJpbWFyeSBwdWxsLXJpZ2h0IHVwcGVyY2FzZS1idG5cIixcbiAgICAgICAgICBhdHRyczogeyB0eXBlOiBcImJ1dHRvblwiIH1cbiAgICAgICAgfSxcbiAgICAgICAgW192bS5fdihcItCh0L7RhdGA0LDQvdC40YLRjCDQuCDQt9Cw0LrRgNGL0YLRjFwiKV1cbiAgICAgICksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX2MoXG4gICAgICAgIFwiYnV0dG9uXCIsXG4gICAgICAgIHtcbiAgICAgICAgICBzdGF0aWNDbGFzczogXCJidXR0b24gcHJpbWFyeSBwdWxsLXJpZ2h0IG1yLTE1IHVwcGVyY2FzZS1idG5cIixcbiAgICAgICAgICBhdHRyczogeyB0eXBlOiBcImJ1dHRvblwiIH1cbiAgICAgICAgfSxcbiAgICAgICAgW192bS5fdihcItCh0L7RhdGA0LDQvdC40YLRjFwiKV1cbiAgICAgIClcbiAgICBdKVxuICB9XG5dXG5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcblxuZXhwb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSIsImxldCBjYXRlZ29yeU1peGluID0ge1xyXG4gICAgbWV0aG9kczoge1xyXG4gICAgICAgIHNldENhdGVnb3J5KGNhdGVnb3J5KXtcclxuICAgICAgICAgICAgdGhpcy5lbnRpdHkuY2F0ZWdvcnkuaWQgPSBjYXRlZ29yeS5pZDtcclxuICAgICAgICAgICAgdGhpcy5lbnRpdHkuY2F0ZWdvcnkubmFtZSA9IGNhdGVnb3J5Lm5hbWU7XHJcbiAgICAgICAgICAgIHRoaXMuJG5vdGlmeSh7XHJcbiAgICAgICAgICAgICAgICBncm91cDogJ21haW4nLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogJ3N1Y2Nlc3MnLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogJ9Ca0LDRgtC10LPQvtGA0LjRjyDQstGL0LHRgNCw0L3QsCdcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZWxlY3RDYXRlZ29yeSgpe1xyXG4gICAgICAgICAgICB0aGlzLiRldmVudEJ1cy4kZW1pdCgnb3BlbkRpYWxvZycsIHtcclxuICAgICAgICAgICAgICAgIHRhZzogJ3NlbGVjdENhdGVnb3J5JyxcclxuICAgICAgICAgICAgICAgIHBhcmFtczoge3Jvb3RfY2F0ZWdvcnk6dGhpcy5yb290X2NhdGVnb3J5LCByZWY6IHRoaXN9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZ2V0UGFyZW50Q2F0ZWdvcnkoKXtcclxuICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgd2luZG93LmF4aW9zKHtcclxuICAgICAgICAgICAgICAgIG1ldGhvZDogJ2dldCcsXHJcbiAgICAgICAgICAgICAgICB1cmw6ICcvY2F0ZWdvcmllcy8nICsgdGhpcy5lbnRpdHkuY2F0ZWdvcnkuaWQsXHJcbiAgICAgICAgICAgIH0pLnRoZW4oKHJlc3ApID0+ICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVudGl0eS5jYXRlZ29yeS5pZCA9IHJlc3AuZGF0YS5pZDtcclxuICAgICAgICAgICAgICAgIHRoaXMuZW50aXR5LmNhdGVnb3J5Lm5hbWUgPSByZXNwLmRhdGEubmFtZTtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG4gICAgfVxyXG59O1xyXG5leHBvcnQgZGVmYXVsdCBjYXRlZ29yeU1peGluO1xyXG4iLCJsZXQgcGFydG5lck1peGluID0ge1xyXG4gICAgY29tcHV0ZWQ6e1xyXG4gICAgICAgIHBhcnRuZXJfbmFtZSgpe1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5lbnRpdHkucGFydG5lci50eXBlID09PSAyID8gdGhpcy5lbnRpdHkucGFydG5lci5jb21wYW55TmFtZSA6IHRoaXMuZW50aXR5LnBhcnRuZXIuZmlvO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBtZXRob2RzOiB7XHJcbiAgICAgICAgc2V0Q2F0ZWdvcnkoY2F0ZWdvcnkpe1xyXG4gICAgICAgICAgICB0aGlzLmVudGl0eS5jYXRlZ29yeS5pZCA9IGNhdGVnb3J5LmlkO1xyXG4gICAgICAgICAgICB0aGlzLmVudGl0eS5jYXRlZ29yeS5uYW1lID0gY2F0ZWdvcnkubmFtZTtcclxuICAgICAgICAgICAgdGhpcy4kbm90aWZ5KHtcclxuICAgICAgICAgICAgICAgIGdyb3VwOiAnbWFpbicsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiAnc3VjY2VzcycsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiAn0JrQsNGC0LXQs9C+0YDQuNGPINCy0YvQsdGA0LDQvdCwJ1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNlbGVjdENhdGVnb3J5KCl7XHJcbiAgICAgICAgICAgIHRoaXMuJGV2ZW50QnVzLiRlbWl0KCdvcGVuRGlhbG9nJywge1xyXG4gICAgICAgICAgICAgICAgdGFnOiAnc2VsZWN0Q2F0ZWdvcnknLFxyXG4gICAgICAgICAgICAgICAgcGFyYW1zOiB7cm9vdF9jYXRlZ29yeTp0aGlzLnJvb3RfY2F0ZWdvcnksIHJlZjogdGhpc31cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBnZXRQYXJlbnRDYXRlZ29yeSgpe1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICB3aW5kb3cuYXhpb3Moe1xyXG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnZ2V0JyxcclxuICAgICAgICAgICAgICAgIHVybDogJy9jYXRlZ29yaWVzLycgKyB0aGlzLmVudGl0eS5jYXRlZ29yeS5pZCxcclxuICAgICAgICAgICAgfSkudGhlbigocmVzcCkgPT4gIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZW50aXR5LmNhdGVnb3J5LmlkID0gcmVzcC5kYXRhLmlkO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lbnRpdHkuY2F0ZWdvcnkubmFtZSA9IHJlc3AuZGF0YS5uYW1lO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICB9XHJcbn07XHJcbmV4cG9ydCBkZWZhdWx0IHBhcnRuZXJNaXhpbjtcclxuIiwibGV0IHN0b3JlTWl4aW4gPSB7XHJcblxyXG4gICAgZGF0YTogKCk9PiB7XHJcbiAgICAgICAgcmV0dXJue1xyXG4gICAgICAgICAgICBlbnRpdHk6e1xyXG4gICAgICAgICAgICAgICAgc3RvcmVfaWQ6bnVsbFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGNvbXB1dGVkOntcclxuICAgICAgICBzdG9yZSgpe1xyXG4gICAgICAgICAgICBsZXQgc3RvcmVzID0gdGhpcy5nZXRGcm9tTG9jYWxTdG9yYWdlKCdzdG9yZXMnKTtcclxuICAgICAgICAgICAgdGhpcy5lbnRpdHkuc3RvcmVfaWQgPSBzdG9yZXNbMF0uaWQ7XHJcbiAgICAgICAgICAgIHJldHVybiBzdG9yZXNbMF07XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIG1ldGhvZHM6IHtcclxuICAgIH1cclxufTtcclxuZXhwb3J0IGRlZmF1bHQgc3RvcmVNaXhpbjtcclxuIiwibGV0IHN1cHBsaWVyTWl4aW4gPSB7XHJcbiAgICBtZXRob2RzOiB7XHJcbiAgICAgICAgc2V0U3VwcGxpZXIoc3VwcGxpZXIpe1xyXG4gICAgICAgICAgICB0aGlzLmVudGl0eS5zdXBwbGllci5pZCA9IHN1cHBsaWVyLmlkO1xyXG4gICAgICAgICAgICB0aGlzLmVudGl0eS5zdXBwbGllci5uYW1lID0gc3VwcGxpZXIubmFtZTtcclxuICAgICAgICAgICAgdGhpcy4kbm90aWZ5KHtcclxuICAgICAgICAgICAgICAgIGdyb3VwOiAnbWFpbicsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiAnc3VjY2VzcycsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiAn0J/RgNC+0LjQt9Cy0L7QtNC40YLQtdC70Ywg0LLRi9Cx0YDQsNC9J1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNlbGVjdFN1cHBsaWVyKCl7XHJcbiAgICAgICAgICAgIHRoaXMuJGV2ZW50QnVzLiRlbWl0KCdvcGVuRGlhbG9nJywge1xyXG4gICAgICAgICAgICAgICAgdGFnOiAnc2VsZWN0U3VwcGxpZXInLFxyXG4gICAgICAgICAgICAgICAgcGFyYW1zOiB7cmVmOiB0aGlzfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG4gICAgfVxyXG59O1xyXG5leHBvcnQgZGVmYXVsdCBzdXBwbGllck1peGluO1xyXG4iLCJpbXBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IGZyb20gXCIuL0xpc3QudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPWQ3YTFjOGJhJnNjb3BlZD10cnVlJlwiXG5pbXBvcnQgc2NyaXB0IGZyb20gXCIuL0xpc3QudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5leHBvcnQgKiBmcm9tIFwiLi9MaXN0LnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuXG5cbi8qIG5vcm1hbGl6ZSBjb21wb25lbnQgKi9cbmltcG9ydCBub3JtYWxpemVyIGZyb20gXCIhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3J1bnRpbWUvY29tcG9uZW50Tm9ybWFsaXplci5qc1wiXG52YXIgY29tcG9uZW50ID0gbm9ybWFsaXplcihcbiAgc2NyaXB0LFxuICByZW5kZXIsXG4gIHN0YXRpY1JlbmRlckZucyxcbiAgZmFsc2UsXG4gIG51bGwsXG4gIFwiZDdhMWM4YmFcIixcbiAgbnVsbFxuICBcbilcblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHtcbiAgdmFyIGFwaSA9IHJlcXVpcmUoXCJDOlxcXFxPcGVuU2VydmVyXFxcXGRvbWFpbnNcXFxcQXV0b0NSTVxcXFxub2RlX21vZHVsZXNcXFxcdnVlLWhvdC1yZWxvYWQtYXBpXFxcXGRpc3RcXFxcaW5kZXguanNcIilcbiAgYXBpLmluc3RhbGwocmVxdWlyZSgndnVlJykpXG4gIGlmIChhcGkuY29tcGF0aWJsZSkge1xuICAgIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgICBpZiAoIWFwaS5pc1JlY29yZGVkKCdkN2ExYzhiYScpKSB7XG4gICAgICBhcGkuY3JlYXRlUmVjb3JkKCdkN2ExYzhiYScsIGNvbXBvbmVudC5vcHRpb25zKVxuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVsb2FkKCdkN2ExYzhiYScsIGNvbXBvbmVudC5vcHRpb25zKVxuICAgIH1cbiAgICBtb2R1bGUuaG90LmFjY2VwdChcIi4vTGlzdC52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9ZDdhMWM4YmEmc2NvcGVkPXRydWUmXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGFwaS5yZXJlbmRlcignZDdhMWM4YmEnLCB7XG4gICAgICAgIHJlbmRlcjogcmVuZGVyLFxuICAgICAgICBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZuc1xuICAgICAgfSlcbiAgICB9KVxuICB9XG59XG5jb21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcInJlc291cmNlcy9qcy9jb21wb25lbnRzL3NlcnZpY2UvTGlzdC52dWVcIlxuZXhwb3J0IGRlZmF1bHQgY29tcG9uZW50LmV4cG9ydHMiLCJpbXBvcnQgbW9kIGZyb20gXCItIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTQtMCEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0xpc3QudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiOyBleHBvcnQgZGVmYXVsdCBtb2Q7IGV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTQtMCEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0xpc3QudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiIiwiZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvdGVtcGxhdGVMb2FkZXIuanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0xpc3QudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPWQ3YTFjOGJhJnNjb3BlZD10cnVlJlwiIiwiaW1wb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSBmcm9tIFwiLi9Qcm92aWRlck9yZGVyRGlhbG9nLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD0xZDYzMWZkMiZcIlxuaW1wb3J0IHNjcmlwdCBmcm9tIFwiLi9Qcm92aWRlck9yZGVyRGlhbG9nLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuZXhwb3J0ICogZnJvbSBcIi4vUHJvdmlkZXJPcmRlckRpYWxvZy52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcblxuXG4vKiBub3JtYWxpemUgY29tcG9uZW50ICovXG5pbXBvcnQgbm9ybWFsaXplciBmcm9tIFwiIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9ydW50aW1lL2NvbXBvbmVudE5vcm1hbGl6ZXIuanNcIlxudmFyIGNvbXBvbmVudCA9IG5vcm1hbGl6ZXIoXG4gIHNjcmlwdCxcbiAgcmVuZGVyLFxuICBzdGF0aWNSZW5kZXJGbnMsXG4gIGZhbHNlLFxuICBudWxsLFxuICBudWxsLFxuICBudWxsXG4gIFxuKVxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkge1xuICB2YXIgYXBpID0gcmVxdWlyZShcIkM6XFxcXE9wZW5TZXJ2ZXJcXFxcZG9tYWluc1xcXFxBdXRvQ1JNXFxcXG5vZGVfbW9kdWxlc1xcXFx2dWUtaG90LXJlbG9hZC1hcGlcXFxcZGlzdFxcXFxpbmRleC5qc1wiKVxuICBhcGkuaW5zdGFsbChyZXF1aXJlKCd2dWUnKSlcbiAgaWYgKGFwaS5jb21wYXRpYmxlKSB7XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICAgIGlmICghYXBpLmlzUmVjb3JkZWQoJzFkNjMxZmQyJykpIHtcbiAgICAgIGFwaS5jcmVhdGVSZWNvcmQoJzFkNjMxZmQyJywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZWxvYWQoJzFkNjMxZmQyJywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfVxuICAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiLi9Qcm92aWRlck9yZGVyRGlhbG9nLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD0xZDYzMWZkMiZcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgYXBpLnJlcmVuZGVyKCcxZDYzMWZkMicsIHtcbiAgICAgICAgcmVuZGVyOiByZW5kZXIsXG4gICAgICAgIHN0YXRpY1JlbmRlckZuczogc3RhdGljUmVuZGVyRm5zXG4gICAgICB9KVxuICAgIH0pXG4gIH1cbn1cbmNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwicmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvdGVtcGxhdGUvRGlhbG9ncy9Qcm92aWRlck9yZGVyRGlhbG9nLnZ1ZVwiXG5leHBvcnQgZGVmYXVsdCBjb21wb25lbnQuZXhwb3J0cyIsImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tNC0wIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vUHJvdmlkZXJPcmRlckRpYWxvZy52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tNC0wIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vUHJvdmlkZXJPcmRlckRpYWxvZy52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCIiLCJleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy90ZW1wbGF0ZUxvYWRlci5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vUHJvdmlkZXJPcmRlckRpYWxvZy52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9MWQ2MzFmZDImXCIiXSwic291cmNlUm9vdCI6IiJ9