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
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  props: ['list_data'],
  name: "List",
  data: function data() {
    return {
      items: []
    };
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
      messages: {},
      loading: false
    };
  },
  mounted: function mounted() {
    var _this = this;

    this.dialog.width = 600;

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
  return _vm._m(0)
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { attrs: { id: "po_list" } }, [
      _c("div", { staticClass: "list-container" }, [
        _c("div", { staticClass: "title_cont" }, [
          _c("div", { staticClass: "header_title" }, [
            _vm._v("Список номенклатур")
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "nds_container" }, [
            _c(
              "label",
              { staticClass: "checkbox-title", attrs: { for: "nds" } },
              [_vm._v("НДС:")]
            ),
            _vm._v(" "),
            _c("div", { staticClass: "checkbox" }, [
              _c("input", {
                attrs: { name: "nds", id: "nds", type: "checkbox" }
              }),
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
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "list-header" }, [
          _c(
            "div",
            {
              staticClass: "header-elem",
              staticStyle: { flex: "1 1 0%", "min-width": "100px" }
            },
            [
              _c("span", { staticClass: "head-title" }, [
                _vm._v("Наименование")
              ])
            ]
          ),
          _vm._v(" "),
          _c(
            "div",
            {
              staticClass: "header-elem",
              staticStyle: { width: "100px", "min-width": "100px" }
            },
            [_c("span", { staticClass: "head-title" }, [_vm._v("Артикул")])]
          ),
          _vm._v(" "),
          _c(
            "div",
            {
              staticClass: "header-elem",
              staticStyle: { width: "65px", "min-width": "65px" }
            },
            [_c("span", { staticClass: "head-title" }, [_vm._v("Кол-во")])]
          ),
          _vm._v(" "),
          _c(
            "div",
            {
              staticClass: "header-elem",
              staticStyle: { width: "80px", "min-width": "80px" }
            },
            [_c("span", { staticClass: "head-title" }, [_vm._v("Цена")])]
          ),
          _vm._v(" "),
          _c(
            "div",
            {
              staticClass: "header-elem",
              staticStyle: { width: "70px", "min-width": "70px" }
            },
            [_c("span", { staticClass: "head-title" }, [_vm._v("НДС, %")])]
          ),
          _vm._v(" "),
          _c(
            "div",
            {
              staticClass: "header-elem",
              staticStyle: { width: "70px", "min-width": "70px" }
            },
            [_c("span", { staticClass: "head-title" }, [_vm._v("НДС")])]
          ),
          _vm._v(" "),
          _c(
            "div",
            {
              staticClass: "header-elem",
              staticStyle: { width: "100px", "min-width": "100px" }
            },
            [_c("span", { staticClass: "head-title" }, [_vm._v("Итого")])]
          )
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "list-body" }, [
          _c(
            "div",
            {
              staticClass: "body-elem",
              attrs: { id: "products_2", "data-id": "2" }
            },
            [
              _c("div", { staticClass: "list-actions" }, [
                _c("button", { staticClass: "button list-remove" }, [
                  _vm._v("✖")
                ])
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
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "list-bottom" }, [
          _c(
            "button",
            {
              staticClass: "button list-add-button",
              attrs: { type: "button", name: "products" }
            },
            [_vm._v("Добавить позицию")]
          )
        ])
      ])
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
        _c("div", { staticClass: "col-sm-8 no-pl" }, [
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
              [
                _c("div", { attrs: { id: "po_list" } }, [
                  _vm._v(
                    "\n                            в\n                        "
                  )
                ])
              ]
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvc2VydmljZS9MaXN0LnZ1ZSIsIndlYnBhY2s6Ly8vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvdGVtcGxhdGUvRGlhbG9ncy9Qcm92aWRlck9yZGVyRGlhbG9nLnZ1ZSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvY29tcG9uZW50cy9zZXJ2aWNlL0xpc3QudnVlP2NlNjYiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvdGVtcGxhdGUvRGlhbG9ncy9Qcm92aWRlck9yZGVyRGlhbG9nLnZ1ZT81ZGVhIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9qcy9jb21wb25lbnRzL21peGlucy9jYXRlZ29yeU1peGluLmpzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9qcy9jb21wb25lbnRzL21peGlucy9wYXJ0bmVyTWl4aW4uanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvbWl4aW5zL3N0b3JlTWl4aW4uanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvbWl4aW5zL3N1cHBsaWVyTWl4aW4uanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvc2VydmljZS9MaXN0LnZ1ZSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvY29tcG9uZW50cy9zZXJ2aWNlL0xpc3QudnVlPzViNDkiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvc2VydmljZS9MaXN0LnZ1ZT9lZTlkIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9qcy9jb21wb25lbnRzL3RlbXBsYXRlL0RpYWxvZ3MvUHJvdmlkZXJPcmRlckRpYWxvZy52dWUiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvdGVtcGxhdGUvRGlhbG9ncy9Qcm92aWRlck9yZGVyRGlhbG9nLnZ1ZT84MTY5Iiwid2VicGFjazovLy8uL3Jlc291cmNlcy9qcy9jb21wb25lbnRzL3RlbXBsYXRlL0RpYWxvZ3MvUHJvdmlkZXJPcmRlckRpYWxvZy52dWU/YjhmYiJdLCJuYW1lcyI6WyJjYXRlZ29yeU1peGluIiwibWV0aG9kcyIsInNldENhdGVnb3J5IiwiY2F0ZWdvcnkiLCJlbnRpdHkiLCJpZCIsIm5hbWUiLCIkbm90aWZ5IiwiZ3JvdXAiLCJ0eXBlIiwidGV4dCIsInNlbGVjdENhdGVnb3J5IiwiJGV2ZW50QnVzIiwiJGVtaXQiLCJ0YWciLCJwYXJhbXMiLCJyb290X2NhdGVnb3J5IiwicmVmIiwiZ2V0UGFyZW50Q2F0ZWdvcnkiLCJsb2FkaW5nIiwid2luZG93IiwiYXhpb3MiLCJtZXRob2QiLCJ1cmwiLCJ0aGVuIiwicmVzcCIsImRhdGEiLCJwYXJ0bmVyTWl4aW4iLCJjb21wdXRlZCIsInBhcnRuZXJfbmFtZSIsInBhcnRuZXIiLCJjb21wYW55TmFtZSIsImZpbyIsInN0b3JlTWl4aW4iLCJzdG9yZV9pZCIsInN0b3JlIiwic3RvcmVzIiwiZ2V0RnJvbUxvY2FsU3RvcmFnZSIsInN1cHBsaWVyTWl4aW4iLCJzZXRTdXBwbGllciIsInN1cHBsaWVyIiwic2VsZWN0U3VwcGxpZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBdUVBO0FBQ0Esc0JBREE7QUFFQSxjQUZBO0FBR0E7QUFDQTtBQUNBO0FBREE7QUFHQTtBQVBBLEc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBREE7QUFFQSxtQkFGQTtBQUdBLGtRQUhBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFBQTtBQUFBOztBQUNBO0FBQ0EsT0FMQTs7QUFNQSxhQUNBO0FBQUE7QUFBQTtB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WUFBSSxFQUFFLFNBRkc7QUFHVEMsWUFBSSxFQUFFO0FBSEcsT0FBYjtBQUtILEtBVEk7QUFVTCtCLGtCQVZLLDRCQVVXO0FBQ1osV0FBSzdCLFNBQUwsQ0FBZUMsS0FBZixDQUFxQixZQUFyQixFQUFtQztBQUMvQkMsV0FBRyxFQUFFLGdCQUQwQjtBQUUvQkMsY0FBTSxFQUFFO0FBQUNFLGFBQUcsRUFBRTtBQUFOO0FBRnVCLE9BQW5DO0FBSUg7QUFmSTtBQURPLENBQXBCO0FBbUJlcUIsNEVBQWYsRTs7Ozs7Ozs7Ozs7O0FDbkJBO0FBQUE7QUFBQTtBQUFBO0FBQStGO0FBQ3ZDO0FBQ0w7OztBQUduRDtBQUNnRztBQUNoRyxnQkFBZ0IsMkdBQVU7QUFDMUIsRUFBRSwwRUFBTTtBQUNSLEVBQUUsMkZBQU07QUFDUixFQUFFLG9HQUFlO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsSUFBSSxLQUFVLEVBQUUsWUFpQmY7QUFDRDtBQUNlLGdGOzs7Ozs7Ozs7Ozs7QUN0Q2Y7QUFBQTtBQUFBLHdDQUEwTCxDQUFnQixnUEFBRyxFQUFDLEM7Ozs7Ozs7Ozs7OztBQ0E5TTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7Ozs7Ozs7Ozs7Ozs7QUNBQTtBQUFBO0FBQUE7QUFBQTtBQUFrRztBQUMzQjtBQUNMOzs7QUFHbEU7QUFDbUc7QUFDbkcsZ0JBQWdCLDJHQUFVO0FBQzFCLEVBQUUseUZBQU07QUFDUixFQUFFLDhGQUFNO0FBQ1IsRUFBRSx1R0FBZTtBQUNqQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLElBQUksS0FBVSxFQUFFLFlBaUJmO0FBQ0Q7QUFDZSxnRjs7Ozs7Ozs7Ozs7O0FDdENmO0FBQUE7QUFBQSx3Q0FBK00sQ0FBZ0IsK1BBQUcsRUFBQyxDOzs7Ozs7Ozs7Ozs7QUNBbk87QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBIiwiZmlsZSI6InByb3ZpZGVyT3JkZXJEaWFsb2cuanMiLCJzb3VyY2VzQ29udGVudCI6WyI8dGVtcGxhdGU+XG4gICAgPGRpdiBpZD1cInBvX2xpc3RcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImxpc3QtY29udGFpbmVyXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGl0bGVfY29udFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJoZWFkZXJfdGl0bGVcIj7QodC/0LjRgdC+0Log0L3QvtC80LXQvdC60LvQsNGC0YPRgDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJuZHNfY29udGFpbmVyXCI+PGxhYmVsIGNsYXNzPVwiY2hlY2tib3gtdGl0bGVcIiBmb3I9XCJuZHNcIj7QndCU0KE6PC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNoZWNrYm94XCI+PGlucHV0IG5hbWU9XCJuZHNcIiBpZD1cIm5kc1wiIHR5cGU9XCJjaGVja2JveFwiPjxsYWJlbCBmb3I9XCJuZHNcIj48L2xhYmVsPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwibmRzX2luY2x1ZGVkXCIgY2xhc3M9XCJjaGVja2JveC10aXRsZVwiPtCy0LrQu9GO0YfQtdC9INCyINGB0YLQvtC40LzQvtGB0YLRjDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjaGVja2JveFwiPjxpbnB1dCBuYW1lPVwibmRzX2luY2x1ZGVkXCIgaWQ9XCJuZHNfaW5jbHVkZWRcIiB0eXBlPVwiY2hlY2tib3hcIj48bGFiZWxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcj1cIm5kc19pbmNsdWRlZFwiPjwvbGFiZWw+PC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJsaXN0LWhlYWRlclwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJoZWFkZXItZWxlbVwiIHN0eWxlPVwiZmxleDogMSAxIDAlOyBtaW4td2lkdGg6IDEwMHB4O1wiPjxzcGFuXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzPVwiaGVhZC10aXRsZVwiPtCd0LDQuNC80LXQvdC+0LLQsNC90LjQtTwvc3Bhbj48L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaGVhZGVyLWVsZW1cIiBzdHlsZT1cIndpZHRoOiAxMDBweDsgbWluLXdpZHRoOiAxMDBweDtcIj48c3BhbiBjbGFzcz1cImhlYWQtdGl0bGVcIj7QkNGA0YLQuNC60YPQuzwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaGVhZGVyLWVsZW1cIiBzdHlsZT1cIndpZHRoOiA2NXB4OyBtaW4td2lkdGg6IDY1cHg7XCI+PHNwYW4gY2xhc3M9XCJoZWFkLXRpdGxlXCI+0JrQvtC7LdCy0L48L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImhlYWRlci1lbGVtXCIgc3R5bGU9XCJ3aWR0aDogODBweDsgbWluLXdpZHRoOiA4MHB4O1wiPjxzcGFuIGNsYXNzPVwiaGVhZC10aXRsZVwiPtCm0LXQvdCwPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJoZWFkZXItZWxlbVwiIHN0eWxlPVwid2lkdGg6IDcwcHg7IG1pbi13aWR0aDogNzBweDtcIj48c3BhbiBjbGFzcz1cImhlYWQtdGl0bGVcIj7QndCU0KEsICU8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImhlYWRlci1lbGVtXCIgc3R5bGU9XCJ3aWR0aDogNzBweDsgbWluLXdpZHRoOiA3MHB4O1wiPjxzcGFuIGNsYXNzPVwiaGVhZC10aXRsZVwiPtCd0JTQoTwvc3Bhbj48L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaGVhZGVyLWVsZW1cIiBzdHlsZT1cIndpZHRoOiAxMDBweDsgbWluLXdpZHRoOiAxMDBweDtcIj48c3BhbiBjbGFzcz1cImhlYWQtdGl0bGVcIj7QmNGC0L7Qs9C+PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwibGlzdC1ib2R5XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJvZHktZWxlbVwiIGlkPVwicHJvZHVjdHNfMlwiIGRhdGEtaWQ9XCIyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJsaXN0LWFjdGlvbnNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidXR0b24gbGlzdC1yZW1vdmVcIj7inJY8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiaGlkZGVuXCIgdmFsdWU9XCIxMDFcIiBuYW1lPVwicHJvZHVjdHNbMl1bcGl2b3RfaWRdXCI+PGlucHV0IHR5cGU9XCJoaWRkZW5cIiB2YWx1ZT1cIjE2OTU0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZT1cInByb2R1Y3RzWzJdW3Byb2R1Y3RfaWRdXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjZWxsXCIgc3R5bGU9XCJmbGV4OiAxIDEgMCU7IG1pbi13aWR0aDogMTAwcHg7XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibGlzdC10aXRsZSB0aXRsZS10ZXh0XCI+YXdkYXdkPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2VsbFwiIHN0eWxlPVwid2lkdGg6IDEwMHB4OyBtaW4td2lkdGg6IDEwMHB4O1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImxpc3QtdGl0bGUgdGl0bGUtdGV4dFwiPjE0NTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNlbGxcIiBzdHlsZT1cIndpZHRoOiA2NXB4OyBtaW4td2lkdGg6IDY1cHg7XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibGlzdC10aXRsZSB0aXRsZS1jb3VudGVyXCI+PGlucHV0IHR5cGU9XCJudW1iZXJcIiBtaW49XCIxXCIgbmFtZT1cInByb2R1Y3RzWzJdW2NvdW50XVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2VsbFwiIHN0eWxlPVwid2lkdGg6IDgwcHg7IG1pbi13aWR0aDogODBweDtcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJsaXN0LXRpdGxlIHRpdGxlLXByaWNlXCI+PGlucHV0IHR5cGU9XCJudW1iZXJcIiBtaW49XCIxXCIgc3RlcD1cIjAuMVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZT1cInByb2R1Y3RzWzJdW3ByaWNlXVwiPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNlbGxcIiBzdHlsZT1cIndpZHRoOiA3MHB4OyBtaW4td2lkdGg6IDcwcHg7XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibGlzdC10aXRsZSB0aXRsZS1wYXNzaXZlXCI+PGlucHV0IHR5cGU9XCJudW1iZXJcIiBkaXNhYmxlZD1cIlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lPVwicHJvZHVjdHNbMl1bbmRzX3BlcmNlbnRdXCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2VsbFwiIHN0eWxlPVwid2lkdGg6IDcwcHg7IG1pbi13aWR0aDogNzBweDtcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJsaXN0LXRpdGxlIHRpdGxlLXBhc3NpdmVcIj48aW5wdXQgdHlwZT1cIm51bWJlclwiIGRpc2FibGVkPVwiXCIgbmFtZT1cInByb2R1Y3RzWzJdW25kc11cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNlbGxcIiBzdHlsZT1cIndpZHRoOiAxMDBweDsgbWluLXdpZHRoOiAxMDBweDtcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJsaXN0LXRpdGxlIHRpdGxlLXBhc3NpdmVcIj48aW5wdXQgdHlwZT1cIm51bWJlclwiIGRpc2FibGVkPVwiXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU9XCJwcm9kdWN0c1syXVt0b3RhbF1cIj48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJsaXN0LWJvdHRvbVwiPlxuICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIG5hbWU9XCJwcm9kdWN0c1wiIGNsYXNzPVwiYnV0dG9uIGxpc3QtYWRkLWJ1dHRvblwiPtCU0L7QsdCw0LLQuNGC0Ywg0L/QvtC30LjRhtC40Y48L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5cbiAgICBleHBvcnQgZGVmYXVsdCB7XG4gICAgICAgIHByb3BzOlsnbGlzdF9kYXRhJ10sXG4gICAgICAgIG5hbWU6IFwiTGlzdFwiLFxuICAgICAgICBkYXRhOiAoKT0+IHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgaXRlbXM6IFtdLFxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgIH1cbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiPHRlbXBsYXRlPlxuICAgIDxkaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1ib2R5XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1zbS00IG5vLXByIGQtZmxleFwiPlxuICAgICAgICAgICAgICAgICAgICA8dWwgY2xhc3M9XCJuYXZcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxsaSB2LWZvcj1cInRhYiBpbiB0YWJzXCIgdi1iaW5kOmtleT1cInRhYi5zbHVnXCIgdi1iaW5kOmNsYXNzPVwieydhY3RpdmUnIDogdGFiLnN0YXRlfVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJuYXYtaXRlbVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIHYtb246Y2xpY2s9XCJzZWxlY3RUYWIodGFiKVwiIGNsYXNzPVwibmF2LWxpbmtcIiBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7IHRhYi5uYW1lIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZmxvYXQtcmlnaHQgaGVscGVyX2RhbmdlciBkLW5vbmUtZlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYSBmYS1leGNsYW1hdGlvbi10cmlhbmdsZSB0ZXh0LW1kIG1sLTIgdGV4dC1kYW5nZXJcIj48L2k+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtc20tOCBuby1wbFwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGFiLWNvbnRlbnQgbm8tcGxcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0YWItcGFuZVwiIHYtYmluZDpjbGFzcz1cInsnYWN0aXZlJyA6IHRhYnNbMF0uc3RhdGV9XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPEZvcm1JbnB1dCB2LWJpbmQ6aW5wdXREYXRhPVwie3R5cGU6J3NlbGVjdG9yJyxsYWJlbDon0J/QvtGB0YLQsNCy0YnQuNC6JyxuYW1lOidwYXJ0bmVyX25hbWUnLCBvbkNsaWNrOidzZWxlY3RQYXJ0bmVyJ31cIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtSW5wdXQgdi1iaW5kOmlucHV0RGF0YT1cInt0eXBlOidpbnB1dCcsbGFiZWw6J9Ch0LrQu9Cw0LQnLG5hbWU6J3N0b3JlLm5hbWUnLCBvbkNsaWNrOidzZWxlY3RQYXJ0bmVyJywgZGlzYWJsZWQ6dHJ1ZX1cIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtSW5wdXQgdi1iaW5kOmlucHV0RGF0YT1cInt0eXBlOid0ZXh0YXJlYScsbGFiZWw6J9Ca0L7QvNC80LXQvdGC0LDRgNC40LknLG5hbWU6J2VudGl0eS5jb21tZW50Jywgb25DbGljazonc2VsZWN0UGFydG5lcicsIGhlaWdodDogNzV9XCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRhYi1wYW5lXCIgIHYtYmluZDpjbGFzcz1cInsnYWN0aXZlJyA6IHRhYnNbMV0uc3RhdGV9XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiAgaWQ9XCJwb19saXN0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgINCyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzPVwibW9kYWwtZm9vdGVyXCI+XG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnV0dG9uIHdoaXRlIHVwcGVyY2FzZS1idG5cIj7Ql9Cw0LrRgNGL0YLRjDwvYnV0dG9uPlxuICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidXR0b24gcHJpbWFyeSBwdWxsLXJpZ2h0IHVwcGVyY2FzZS1idG5cIj7QodC+0YXRgNCw0L3QuNGC0Ywg0Lgg0LfQsNC60YDRi9GC0Yw8L2J1dHRvbj5cbiAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnV0dG9uIHByaW1hcnkgcHVsbC1yaWdodCBtci0xNSB1cHBlcmNhc2UtYnRuXCI+0KHQvtGF0YDQsNC90LjRgtGMPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3M9XCJzeXN0ZW1fbWVzc2FnZVwiPlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG4gICAgaW1wb3J0IHN0b3JlTWl4aW4gZnJvbSBcIi4vLi4vLi4vbWl4aW5zL3N0b3JlTWl4aW5cIlxuICAgIGltcG9ydCBjYXRlZ29yeU1peGluIGZyb20gXCIuLy4uLy4uL21peGlucy9jYXRlZ29yeU1peGluXCJcbiAgICBpbXBvcnQgcGFydG5lck1peGluIGZyb20gXCIuLy4uLy4uL21peGlucy9wYXJ0bmVyTWl4aW5cIlxuICAgIGltcG9ydCBzdXBwbGllck1peGluIGZyb20gXCIuLy4uLy4uL21peGlucy9zdXBwbGllck1peGluXCJcbiAgICBpbXBvcnQgRm9ybUlucHV0IGZyb20gXCIuLy4uLy4uL3NlcnZpY2UvRm9ybUlucHV0XCJcbiAgICBpbXBvcnQgTGlzdCBmcm9tIFwiLi8uLi8uLi9zZXJ2aWNlL0xpc3RcIlxuICAgIGV4cG9ydCBkZWZhdWx0IHtcbiAgICAgICAgbmFtZTogXCJQcm92aWRlck9yZGVyRGlhbG9nXCIsXG4gICAgICAgIHByb3BzOiBbJ2RpYWxvZyddLFxuICAgICAgICBtaXhpbnM6IFtjYXRlZ29yeU1peGluLCBzdXBwbGllck1peGluLCBwYXJ0bmVyTWl4aW4sIHN0b3JlTWl4aW5dLFxuICAgICAgICBkYXRhOiAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGdldCBzaG9wX2FjdGl2YXRlZCgpe1xuICAgICAgICAgICAgICAgICAgICBsZXQgbG9jYWxfc2V0dGluZ3MgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZVsnc2V0dGluZ3MnXSk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBpbmRleCA9IF8uZmluZEluZGV4KGxvY2FsX3NldHRpbmdzLCBmdW5jdGlvbihvKSB7IHJldHVybiBvLmtleSA9PT0gXCJzaG9wX2VuYWJsZWRcIjsgfSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBsb2NhbF9zZXR0aW5nc1tpbmRleF0gPyBCb29sZWFuKHBhcnNlSW50KGxvY2FsX3NldHRpbmdzW2luZGV4XS52YWx1ZSkpIDogZmFsc2U7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB0YWJzOiBbXG4gICAgICAgICAgICAgICAgICAgIHtzbHVnOiBcImJhc2VcIiwgbmFtZTogXCLQntGB0L3QvtCy0L3Ri9C1XCIsIHN0YXRlOiB0cnVlfSxcbiAgICAgICAgICAgICAgICAgICAge3NsdWc6IFwiaXRlbXNcIiwgbmFtZTogXCLQn9C+0LfQuNGG0LjQuFwiLCBzdGF0ZTogZmFsc2V9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgZW50aXR5OiB7XG4gICAgICAgICAgICAgICAgICAgIGlkOm51bGwsXG4gICAgICAgICAgICAgICAgICAgIGFydGljbGVzOiBbXSxcbiAgICAgICAgICAgICAgICAgICAgc3RvcmU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCLQndC1INCy0YvQsdGA0LDQvVwiLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBwYXJ0bmVyOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBhbnlOYW1lOifQndC1INCy0YvQsdGA0LDQvScsXG4gICAgICAgICAgICAgICAgICAgICAgICBmaW86J9Cd0LUg0LLRi9Cx0YDQsNC9JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IDJcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgaGVhZGVyOiBbXG4gICAgICAgICAgICAgICAgICAgIHttaW5fd2l0aDogTmFOLCAgd2lkdGg6IE5hTiwgICAgbmFtZTogJ3Bpdm90X2lkJywgICAgICB0YWJsZV9uYW1lOiAncGl2b3RfaWQnLCAgICB0eXBlOiAnaGlkZGVuJ30sXG4gICAgICAgICAgICAgICAgICAgIHttaW5fd2l0aDogTmFOLCAgd2lkdGg6IE5hTiwgICAgbmFtZTogJ3Byb2R1Y3RfaWQnLCAgICB0YWJsZV9uYW1lOiAncHJvZHVjdF9pZCcsICB0eXBlOiAnaGlkZGVuJ30sXG4gICAgICAgICAgICAgICAgICAgIHttaW5fd2l0aDogMTAwLCAgd2lkdGg6ICdhdXRvJywgbmFtZTogJ9Cd0LDQuNC80LXQvdC+0LLQsNC90LjQtScsICB0YWJsZV9uYW1lOiAnbmFtZScsICAgICAgICB0eXBlOid0ZXh0J30sXG4gICAgICAgICAgICAgICAgICAgIHttaW5fd2l0aDogMTAwLCAgd2lkdGg6IDEwMCwgICAgbmFtZTogJ9CQ0YDRgtC40LrRg9C7JywgICAgICAgdGFibGVfbmFtZTogJ2FydGljbGUnLCAgICAgdHlwZTondGV4dCd9LFxuICAgICAgICAgICAgICAgICAgICB7bWluX3dpdGg6IDY1LCAgIHdpZHRoOiA2NSwgICAgIG5hbWU6ICfQmtC+0Lst0LLQvicsICAgICAgICB0YWJsZV9uYW1lOiAnY291bnQnLCAgICAgICB0eXBlOiAnY291bnRlcicsfSxcbiAgICAgICAgICAgICAgICAgICAge21pbl93aXRoOiA4MCwgICB3aWR0aDogODAsICAgICBuYW1lOiAn0KbQtdC90LAnLCAgICAgICAgICB0YWJsZV9uYW1lOiAncHJpY2UnLCAgICAgICB0eXBlOiAncHJpY2UnLH0sXG4gICAgICAgICAgICAgICAgICAgIHttaW5fd2l0aDogNzAsICAgd2lkdGg6IDcwLCAgICAgbmFtZTogJ9Cd0JTQoSwgJScsICAgICAgICB0YWJsZV9uYW1lOiAnbmRzX3BlcmNlbnQnLCB0eXBlOiAncGFzc2l2ZScsfSxcbiAgICAgICAgICAgICAgICAgICAge21pbl93aXRoOiA3MCwgICB3aWR0aDogNzAsICAgICBuYW1lOiAn0J3QlNChJywgICAgICAgICAgIHRhYmxlX25hbWU6ICduZHMnLCAgICAgICAgIHR5cGU6ICdwYXNzaXZlJyx9LFxuICAgICAgICAgICAgICAgICAgICB7bWluX3dpdGg6IDEwMCwgIHdpZHRoOiAxMDAsICAgIG5hbWU6ICfQmNGC0L7Qs9C+JywgICAgICAgICB0YWJsZV9uYW1lOiAndG90YWwnLCAgICAgICB0eXBlOiAncGFzc2l2ZScsfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIHByZWZzOntcbiAgICAgICAgICAgICAgICAgICAgaW5kZXg6J29yZGluYWwnLFxuICAgICAgICAgICAgICAgICAgICB1c2VfbmRzOnRydWUsXG4gICAgICAgICAgICAgICAgICAgIGNhbl9hZGRfaXRlbXM6dHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgbmRzOnRydWUsXG4gICAgICAgICAgICAgICAgICAgIG5kc19pbmNsdWRlZDp0cnVlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBtZXNzYWdlczp7fSxcbiAgICAgICAgICAgICAgICBsb2FkaW5nOmZhbHNlLFxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBtb3VudGVkKCkge1xuICAgICAgICAgICAgdGhpcy5kaWFsb2cud2lkdGggPSA2MDA7XG4gICAgICAgICAgICBpZiAodGhpcy5kaWFsb2cuaWQgPT09IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRpYWxvZy50aXRsZSA9IFwi0J3QvtCy0LDRjyDQt9Cw0Y/QstC60LAg0L/QvtGB0YLQsNCy0YnQuNC60YNcIjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB3aW5kb3cuYXhpb3Moe1xuICAgICAgICAgICAgICAgICAgICBtZXRob2Q6ICdnZXQnLFxuICAgICAgICAgICAgICAgICAgICB1cmw6ICcvcHJvdmlkZXJfb3JkZXJzLycgKyB0aGlzLmRpYWxvZy5pZCxcbiAgICAgICAgICAgICAgICB9KS50aGVuKChyZXNwKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaWQgPSByZXNwLmRhdGEuaWQ7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW50aXR5ID0gcmVzcC5kYXRhO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRpYWxvZy50aXRsZSA9IFwi0KDQtdC00LDQutGC0LjRgNC+0LLQsNC90LjQtSDQt9Cw0LrQsNC30LAg0L/QvtGB0YLQsNCy0YnQuNC60YMg4oSWJ1wiICsgdGhpcy5lbnRpdHkuaWQgKyBcIidcIjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmKGVycm9yLnJlc3BvbnNlLnN0YXR1cyA9PT0gNDA0KXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJHBhcmVudC5jbG9zZURpYWxvZyh0aGlzLmRpYWxvZyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGNvbXB1dGVkOiB7XG4gICAgICAgIH0sXG4gICAgICAgIG1ldGhvZHM6IHtcbiAgICAgICAgICAgIHNlbGVjdFRhYih0YWIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRhYnMuZm9yRWFjaCgodGFiKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRhYi5zdGF0ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHRhYi5zdGF0ZSA9IHRydWU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2F2ZSgpe1xuICAgICAgICAgICAgICAgIGxldCBtZXRob2QgPSB0aGlzLmVudGl0eS5pZCA/ICdwYXRjaCcgOiAncG9zdCc7XG4gICAgICAgICAgICAgICAgbGV0IHVybCA9IHRoaXMuZW50aXR5LmlkID8gJy8nICsgdGhpcy5lbnRpdHkuaWQgOiAnJztcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHdpbmRvdy5heGlvcyh7XG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZDogbWV0aG9kLFxuICAgICAgICAgICAgICAgICAgICB1cmw6ICcvcHJvZHVjdHMnICsgdXJsLFxuICAgICAgICAgICAgICAgICAgICBkYXRhOnRoaXMuZW50aXR5LFxuICAgICAgICAgICAgICAgIH0pLnRoZW4oKHJlc3ApID0+ICB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJGV2ZW50QnVzLiRlbWl0KCdQcm9kdWN0VXBkYXRlZCcsIHtpZDogdGhpcy5pZCwgY2F0ZWdvcnlfaWQ6dGhpcy5jYXRlZ29yeV9pZH0pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLiRwYXJlbnQuY2xvc2VEaWFsb2codGhpcy5kaWFsb2cpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9KS5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWVzc2FnZXMgPSBlcnJvci5yZXNwb25zZS5kYXRhLm1lc3NhZ2VzO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBjb21wb25lbnRzOntcbiAgICAgICAgICAgIEZvcm1JbnB1dCwgTGlzdFxuICAgICAgICB9XG4gICAgfVxuPC9zY3JpcHQ+XG4iLCJ2YXIgcmVuZGVyID0gZnVuY3Rpb24oKSB7XG4gIHZhciBfdm0gPSB0aGlzXG4gIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgcmV0dXJuIF92bS5fbSgwKVxufVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtcbiAgZnVuY3Rpb24oKSB7XG4gICAgdmFyIF92bSA9IHRoaXNcbiAgICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgICByZXR1cm4gX2MoXCJkaXZcIiwgeyBhdHRyczogeyBpZDogXCJwb19saXN0XCIgfSB9LCBbXG4gICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImxpc3QtY29udGFpbmVyXCIgfSwgW1xuICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcInRpdGxlX2NvbnRcIiB9LCBbXG4gICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJoZWFkZXJfdGl0bGVcIiB9LCBbXG4gICAgICAgICAgICBfdm0uX3YoXCLQodC/0LjRgdC+0Log0L3QvtC80LXQvdC60LvQsNGC0YPRgFwiKVxuICAgICAgICAgIF0pLFxuICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJuZHNfY29udGFpbmVyXCIgfSwgW1xuICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgIFwibGFiZWxcIixcbiAgICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJjaGVja2JveC10aXRsZVwiLCBhdHRyczogeyBmb3I6IFwibmRzXCIgfSB9LFxuICAgICAgICAgICAgICBbX3ZtLl92KFwi0J3QlNChOlwiKV1cbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJjaGVja2JveFwiIH0sIFtcbiAgICAgICAgICAgICAgX2MoXCJpbnB1dFwiLCB7XG4gICAgICAgICAgICAgICAgYXR0cnM6IHsgbmFtZTogXCJuZHNcIiwgaWQ6IFwibmRzXCIsIHR5cGU6IFwiY2hlY2tib3hcIiB9XG4gICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICBfYyhcImxhYmVsXCIsIHsgYXR0cnM6IHsgZm9yOiBcIm5kc1wiIH0gfSlcbiAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICBcImxhYmVsXCIsXG4gICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwiY2hlY2tib3gtdGl0bGVcIiwgYXR0cnM6IHsgZm9yOiBcIm5kc19pbmNsdWRlZFwiIH0gfSxcbiAgICAgICAgICAgICAgW192bS5fdihcItCy0LrQu9GO0YfQtdC9INCyINGB0YLQvtC40LzQvtGB0YLRjFwiKV1cbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJjaGVja2JveFwiIH0sIFtcbiAgICAgICAgICAgICAgX2MoXCJpbnB1dFwiLCB7XG4gICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgIG5hbWU6IFwibmRzX2luY2x1ZGVkXCIsXG4gICAgICAgICAgICAgICAgICBpZDogXCJuZHNfaW5jbHVkZWRcIixcbiAgICAgICAgICAgICAgICAgIHR5cGU6IFwiY2hlY2tib3hcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgIF9jKFwibGFiZWxcIiwgeyBhdHRyczogeyBmb3I6IFwibmRzX2luY2x1ZGVkXCIgfSB9KVxuICAgICAgICAgICAgXSlcbiAgICAgICAgICBdKVxuICAgICAgICBdKSxcbiAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJsaXN0LWhlYWRlclwiIH0sIFtcbiAgICAgICAgICBfYyhcbiAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImhlYWRlci1lbGVtXCIsXG4gICAgICAgICAgICAgIHN0YXRpY1N0eWxlOiB7IGZsZXg6IFwiMSAxIDAlXCIsIFwibWluLXdpZHRoXCI6IFwiMTAwcHhcIiB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICBfYyhcInNwYW5cIiwgeyBzdGF0aWNDbGFzczogXCJoZWFkLXRpdGxlXCIgfSwgW1xuICAgICAgICAgICAgICAgIF92bS5fdihcItCd0LDQuNC80LXQvdC+0LLQsNC90LjQtVwiKVxuICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgXVxuICAgICAgICAgICksXG4gICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICBfYyhcbiAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImhlYWRlci1lbGVtXCIsXG4gICAgICAgICAgICAgIHN0YXRpY1N0eWxlOiB7IHdpZHRoOiBcIjEwMHB4XCIsIFwibWluLXdpZHRoXCI6IFwiMTAwcHhcIiB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgW19jKFwic3BhblwiLCB7IHN0YXRpY0NsYXNzOiBcImhlYWQtdGl0bGVcIiB9LCBbX3ZtLl92KFwi0JDRgNGC0LjQutGD0LtcIildKV1cbiAgICAgICAgICApLFxuICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgX2MoXG4gICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJoZWFkZXItZWxlbVwiLFxuICAgICAgICAgICAgICBzdGF0aWNTdHlsZTogeyB3aWR0aDogXCI2NXB4XCIsIFwibWluLXdpZHRoXCI6IFwiNjVweFwiIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBbX2MoXCJzcGFuXCIsIHsgc3RhdGljQ2xhc3M6IFwiaGVhZC10aXRsZVwiIH0sIFtfdm0uX3YoXCLQmtC+0Lst0LLQvlwiKV0pXVxuICAgICAgICAgICksXG4gICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICBfYyhcbiAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImhlYWRlci1lbGVtXCIsXG4gICAgICAgICAgICAgIHN0YXRpY1N0eWxlOiB7IHdpZHRoOiBcIjgwcHhcIiwgXCJtaW4td2lkdGhcIjogXCI4MHB4XCIgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFtfYyhcInNwYW5cIiwgeyBzdGF0aWNDbGFzczogXCJoZWFkLXRpdGxlXCIgfSwgW192bS5fdihcItCm0LXQvdCwXCIpXSldXG4gICAgICAgICAgKSxcbiAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgIF9jKFxuICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiaGVhZGVyLWVsZW1cIixcbiAgICAgICAgICAgICAgc3RhdGljU3R5bGU6IHsgd2lkdGg6IFwiNzBweFwiLCBcIm1pbi13aWR0aFwiOiBcIjcwcHhcIiB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgW19jKFwic3BhblwiLCB7IHN0YXRpY0NsYXNzOiBcImhlYWQtdGl0bGVcIiB9LCBbX3ZtLl92KFwi0J3QlNChLCAlXCIpXSldXG4gICAgICAgICAgKSxcbiAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgIF9jKFxuICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiaGVhZGVyLWVsZW1cIixcbiAgICAgICAgICAgICAgc3RhdGljU3R5bGU6IHsgd2lkdGg6IFwiNzBweFwiLCBcIm1pbi13aWR0aFwiOiBcIjcwcHhcIiB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgW19jKFwic3BhblwiLCB7IHN0YXRpY0NsYXNzOiBcImhlYWQtdGl0bGVcIiB9LCBbX3ZtLl92KFwi0J3QlNChXCIpXSldXG4gICAgICAgICAgKSxcbiAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgIF9jKFxuICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiaGVhZGVyLWVsZW1cIixcbiAgICAgICAgICAgICAgc3RhdGljU3R5bGU6IHsgd2lkdGg6IFwiMTAwcHhcIiwgXCJtaW4td2lkdGhcIjogXCIxMDBweFwiIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBbX2MoXCJzcGFuXCIsIHsgc3RhdGljQ2xhc3M6IFwiaGVhZC10aXRsZVwiIH0sIFtfdm0uX3YoXCLQmNGC0L7Qs9C+XCIpXSldXG4gICAgICAgICAgKVxuICAgICAgICBdKSxcbiAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJsaXN0LWJvZHlcIiB9LCBbXG4gICAgICAgICAgX2MoXG4gICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJib2R5LWVsZW1cIixcbiAgICAgICAgICAgICAgYXR0cnM6IHsgaWQ6IFwicHJvZHVjdHNfMlwiLCBcImRhdGEtaWRcIjogXCIyXCIgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJsaXN0LWFjdGlvbnNcIiB9LCBbXG4gICAgICAgICAgICAgICAgX2MoXCJidXR0b25cIiwgeyBzdGF0aWNDbGFzczogXCJidXR0b24gbGlzdC1yZW1vdmVcIiB9LCBbXG4gICAgICAgICAgICAgICAgICBfdm0uX3YoXCLinJZcIilcbiAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgX2MoXCJpbnB1dFwiLCB7XG4gICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgIHR5cGU6IFwiaGlkZGVuXCIsXG4gICAgICAgICAgICAgICAgICB2YWx1ZTogXCIxMDFcIixcbiAgICAgICAgICAgICAgICAgIG5hbWU6IFwicHJvZHVjdHNbMl1bcGl2b3RfaWRdXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICBfYyhcImlucHV0XCIsIHtcbiAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgdHlwZTogXCJoaWRkZW5cIixcbiAgICAgICAgICAgICAgICAgIHZhbHVlOiBcIjE2OTU0XCIsXG4gICAgICAgICAgICAgICAgICBuYW1lOiBcInByb2R1Y3RzWzJdW3Byb2R1Y3RfaWRdXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImNlbGxcIixcbiAgICAgICAgICAgICAgICAgIHN0YXRpY1N0eWxlOiB7IGZsZXg6IFwiMSAxIDAlXCIsIFwibWluLXdpZHRoXCI6IFwiMTAwcHhcIiB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImxpc3QtdGl0bGUgdGl0bGUtdGV4dFwiIH0sIFtcbiAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiYXdkYXdkXCIpXG4gICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJjZWxsXCIsXG4gICAgICAgICAgICAgICAgICBzdGF0aWNTdHlsZTogeyB3aWR0aDogXCIxMDBweFwiLCBcIm1pbi13aWR0aFwiOiBcIjEwMHB4XCIgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJsaXN0LXRpdGxlIHRpdGxlLXRleHRcIiB9LCBbXG4gICAgICAgICAgICAgICAgICAgIF92bS5fdihcIjE0NVwiKVxuICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiY2VsbFwiLFxuICAgICAgICAgICAgICAgICAgc3RhdGljU3R5bGU6IHsgd2lkdGg6IFwiNjVweFwiLCBcIm1pbi13aWR0aFwiOiBcIjY1cHhcIiB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImxpc3QtdGl0bGUgdGl0bGUtY291bnRlclwiIH0sIFtcbiAgICAgICAgICAgICAgICAgICAgX2MoXCJpbnB1dFwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwibnVtYmVyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBtaW46IFwiMVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwcm9kdWN0c1syXVtjb3VudF1cIlxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImNlbGxcIixcbiAgICAgICAgICAgICAgICAgIHN0YXRpY1N0eWxlOiB7IHdpZHRoOiBcIjgwcHhcIiwgXCJtaW4td2lkdGhcIjogXCI4MHB4XCIgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJsaXN0LXRpdGxlIHRpdGxlLXByaWNlXCIgfSwgW1xuICAgICAgICAgICAgICAgICAgICBfYyhcImlucHV0XCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJudW1iZXJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIG1pbjogXCIxXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGVwOiBcIjAuMVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwcm9kdWN0c1syXVtwcmljZV1cIlxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImNlbGxcIixcbiAgICAgICAgICAgICAgICAgIHN0YXRpY1N0eWxlOiB7IHdpZHRoOiBcIjcwcHhcIiwgXCJtaW4td2lkdGhcIjogXCI3MHB4XCIgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJsaXN0LXRpdGxlIHRpdGxlLXBhc3NpdmVcIiB9LCBbXG4gICAgICAgICAgICAgICAgICAgIF9jKFwiaW5wdXRcIiwge1xuICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIm51bWJlclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInByb2R1Y3RzWzJdW25kc19wZXJjZW50XVwiXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiY2VsbFwiLFxuICAgICAgICAgICAgICAgICAgc3RhdGljU3R5bGU6IHsgd2lkdGg6IFwiNzBweFwiLCBcIm1pbi13aWR0aFwiOiBcIjcwcHhcIiB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImxpc3QtdGl0bGUgdGl0bGUtcGFzc2l2ZVwiIH0sIFtcbiAgICAgICAgICAgICAgICAgICAgX2MoXCJpbnB1dFwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwibnVtYmVyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicHJvZHVjdHNbMl1bbmRzXVwiXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiY2VsbFwiLFxuICAgICAgICAgICAgICAgICAgc3RhdGljU3R5bGU6IHsgd2lkdGg6IFwiMTAwcHhcIiwgXCJtaW4td2lkdGhcIjogXCIxMDBweFwiIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwibGlzdC10aXRsZSB0aXRsZS1wYXNzaXZlXCIgfSwgW1xuICAgICAgICAgICAgICAgICAgICBfYyhcImlucHV0XCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJudW1iZXJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwcm9kdWN0c1syXVt0b3RhbF1cIlxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICBdXG4gICAgICAgICAgKVxuICAgICAgICBdKSxcbiAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJsaXN0LWJvdHRvbVwiIH0sIFtcbiAgICAgICAgICBfYyhcbiAgICAgICAgICAgIFwiYnV0dG9uXCIsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImJ1dHRvbiBsaXN0LWFkZC1idXR0b25cIixcbiAgICAgICAgICAgICAgYXR0cnM6IHsgdHlwZTogXCJidXR0b25cIiwgbmFtZTogXCJwcm9kdWN0c1wiIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBbX3ZtLl92KFwi0JTQvtCx0LDQstC40YLRjCDQv9C+0LfQuNGG0LjRjlwiKV1cbiAgICAgICAgICApXG4gICAgICAgIF0pXG4gICAgICBdKVxuICAgIF0pXG4gIH1cbl1cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxuXG5leHBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgX3ZtID0gdGhpc1xuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gIHJldHVybiBfYyhcImRpdlwiLCBbXG4gICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJtb2RhbC1ib2R5XCIgfSwgW1xuICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJyb3dcIiB9LCBbXG4gICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiY29sLXNtLTQgbm8tcHIgZC1mbGV4XCIgfSwgW1xuICAgICAgICAgIF9jKFxuICAgICAgICAgICAgXCJ1bFwiLFxuICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJuYXZcIiB9LFxuICAgICAgICAgICAgX3ZtLl9sKF92bS50YWJzLCBmdW5jdGlvbih0YWIpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIF9jKFxuICAgICAgICAgICAgICAgIFwibGlcIixcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBrZXk6IHRhYi5zbHVnLFxuICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwibmF2LWl0ZW1cIixcbiAgICAgICAgICAgICAgICAgIGNsYXNzOiB7IGFjdGl2ZTogdGFiLnN0YXRlIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICBcImFcIixcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcIm5hdi1saW5rXCIsXG4gICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgaHJlZjogXCJqYXZhc2NyaXB0OnZvaWQoMClcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfdm0uc2VsZWN0VGFiKHRhYilcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXG4gICAgICAgICAgICAgICAgICAgICAgICBcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fcyh0YWIubmFtZSkgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICBcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlxuICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgX3ZtLl9tKDAsIHRydWUpXG4gICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgMFxuICAgICAgICAgIClcbiAgICAgICAgXSksXG4gICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiY29sLXNtLTggbm8tcGxcIiB9LCBbXG4gICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJ0YWItY29udGVudCBuby1wbFwiIH0sIFtcbiAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcInRhYi1wYW5lXCIsIGNsYXNzOiB7IGFjdGl2ZTogX3ZtLnRhYnNbMF0uc3RhdGUgfSB9LFxuICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgX2MoXCJGb3JtSW5wdXRcIiwge1xuICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgaW5wdXREYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJzZWxlY3RvclwiLFxuICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcItCf0L7RgdGC0LDQstGJ0LjQulwiLFxuICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicGFydG5lcl9uYW1lXCIsXG4gICAgICAgICAgICAgICAgICAgICAgb25DbGljazogXCJzZWxlY3RQYXJ0bmVyXCJcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgX2MoXCJGb3JtSW5wdXRcIiwge1xuICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgaW5wdXREYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJpbnB1dFwiLFxuICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcItCh0LrQu9Cw0LRcIixcbiAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInN0b3JlLm5hbWVcIixcbiAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrOiBcInNlbGVjdFBhcnRuZXJcIixcbiAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICBfYyhcIkZvcm1JbnB1dFwiLCB7XG4gICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICBpbnB1dERhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcInRleHRhcmVhXCIsXG4gICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwi0JrQvtC80LzQtdC90YLQsNGA0LjQuVwiLFxuICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZW50aXR5LmNvbW1lbnRcIixcbiAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrOiBcInNlbGVjdFBhcnRuZXJcIixcbiAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IDc1XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAxXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcInRhYi1wYW5lXCIsIGNsYXNzOiB7IGFjdGl2ZTogX3ZtLnRhYnNbMV0uc3RhdGUgfSB9LFxuICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgX2MoXCJkaXZcIiwgeyBhdHRyczogeyBpZDogXCJwb19saXN0XCIgfSB9LCBbXG4gICAgICAgICAgICAgICAgICBfdm0uX3YoXG4gICAgICAgICAgICAgICAgICAgIFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgINCyXFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICBdXG4gICAgICAgICAgICApXG4gICAgICAgICAgXSlcbiAgICAgICAgXSlcbiAgICAgIF0pXG4gICAgXSksXG4gICAgX3ZtLl92KFwiIFwiKSxcbiAgICBfdm0uX20oMSksXG4gICAgX3ZtLl92KFwiIFwiKSxcbiAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcInN5c3RlbV9tZXNzYWdlXCIgfSlcbiAgXSlcbn1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXG4gIGZ1bmN0aW9uKCkge1xuICAgIHZhciBfdm0gPSB0aGlzXG4gICAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gICAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gICAgcmV0dXJuIF9jKFwic3BhblwiLCB7IHN0YXRpY0NsYXNzOiBcImZsb2F0LXJpZ2h0IGhlbHBlcl9kYW5nZXIgZC1ub25lLWZcIiB9LCBbXG4gICAgICBfYyhcImlcIiwge1xuICAgICAgICBzdGF0aWNDbGFzczogXCJmYSBmYS1leGNsYW1hdGlvbi10cmlhbmdsZSB0ZXh0LW1kIG1sLTIgdGV4dC1kYW5nZXJcIlxuICAgICAgfSlcbiAgICBdKVxuICB9LFxuICBmdW5jdGlvbigpIHtcbiAgICB2YXIgX3ZtID0gdGhpc1xuICAgIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICAgIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICAgIHJldHVybiBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcIm1vZGFsLWZvb3RlclwiIH0sIFtcbiAgICAgIF9jKFwiYnV0dG9uXCIsIHsgc3RhdGljQ2xhc3M6IFwiYnV0dG9uIHdoaXRlIHVwcGVyY2FzZS1idG5cIiB9LCBbXG4gICAgICAgIF92bS5fdihcItCX0LDQutGA0YvRgtGMXCIpXG4gICAgICBdKSxcbiAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICBfYyhcbiAgICAgICAgXCJidXR0b25cIixcbiAgICAgICAge1xuICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImJ1dHRvbiBwcmltYXJ5IHB1bGwtcmlnaHQgdXBwZXJjYXNlLWJ0blwiLFxuICAgICAgICAgIGF0dHJzOiB7IHR5cGU6IFwiYnV0dG9uXCIgfVxuICAgICAgICB9LFxuICAgICAgICBbX3ZtLl92KFwi0KHQvtGF0YDQsNC90LjRgtGMINC4INC30LDQutGA0YvRgtGMXCIpXVxuICAgICAgKSxcbiAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICBfYyhcbiAgICAgICAgXCJidXR0b25cIixcbiAgICAgICAge1xuICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImJ1dHRvbiBwcmltYXJ5IHB1bGwtcmlnaHQgbXItMTUgdXBwZXJjYXNlLWJ0blwiLFxuICAgICAgICAgIGF0dHJzOiB7IHR5cGU6IFwiYnV0dG9uXCIgfVxuICAgICAgICB9LFxuICAgICAgICBbX3ZtLl92KFwi0KHQvtGF0YDQsNC90LjRgtGMXCIpXVxuICAgICAgKVxuICAgIF0pXG4gIH1cbl1cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxuXG5leHBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IiwibGV0IGNhdGVnb3J5TWl4aW4gPSB7XG4gICAgbWV0aG9kczoge1xuICAgICAgICBzZXRDYXRlZ29yeShjYXRlZ29yeSl7XG4gICAgICAgICAgICB0aGlzLmVudGl0eS5jYXRlZ29yeS5pZCA9IGNhdGVnb3J5LmlkO1xuICAgICAgICAgICAgdGhpcy5lbnRpdHkuY2F0ZWdvcnkubmFtZSA9IGNhdGVnb3J5Lm5hbWU7XG4gICAgICAgICAgICB0aGlzLiRub3RpZnkoe1xuICAgICAgICAgICAgICAgIGdyb3VwOiAnbWFpbicsXG4gICAgICAgICAgICAgICAgdHlwZTogJ3N1Y2Nlc3MnLFxuICAgICAgICAgICAgICAgIHRleHQ6ICfQmtCw0YLQtdCz0L7RgNC40Y8g0LLRi9Cx0YDQsNC90LAnXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgc2VsZWN0Q2F0ZWdvcnkoKXtcbiAgICAgICAgICAgIHRoaXMuJGV2ZW50QnVzLiRlbWl0KCdvcGVuRGlhbG9nJywge1xuICAgICAgICAgICAgICAgIHRhZzogJ3NlbGVjdENhdGVnb3J5JyxcbiAgICAgICAgICAgICAgICBwYXJhbXM6IHtyb290X2NhdGVnb3J5OnRoaXMucm9vdF9jYXRlZ29yeSwgcmVmOiB0aGlzfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIGdldFBhcmVudENhdGVnb3J5KCl7XG4gICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSB0cnVlO1xuICAgICAgICAgICAgd2luZG93LmF4aW9zKHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdnZXQnLFxuICAgICAgICAgICAgICAgIHVybDogJy9jYXRlZ29yaWVzLycgKyB0aGlzLmVudGl0eS5jYXRlZ29yeS5pZCxcbiAgICAgICAgICAgIH0pLnRoZW4oKHJlc3ApID0+ICB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbnRpdHkuY2F0ZWdvcnkuaWQgPSByZXNwLmRhdGEuaWQ7XG4gICAgICAgICAgICAgICAgdGhpcy5lbnRpdHkuY2F0ZWdvcnkubmFtZSA9IHJlc3AuZGF0YS5uYW1lO1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgfVxufTtcbmV4cG9ydCBkZWZhdWx0IGNhdGVnb3J5TWl4aW47XG4iLCJsZXQgcGFydG5lck1peGluID0ge1xuICAgIGNvbXB1dGVkOntcbiAgICAgICAgcGFydG5lcl9uYW1lKCl7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5lbnRpdHkucGFydG5lci50eXBlID09PSAyID8gdGhpcy5lbnRpdHkucGFydG5lci5jb21wYW55TmFtZSA6IHRoaXMuZW50aXR5LnBhcnRuZXIuZmlvO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBtZXRob2RzOiB7XG4gICAgICAgIHNldENhdGVnb3J5KGNhdGVnb3J5KXtcbiAgICAgICAgICAgIHRoaXMuZW50aXR5LmNhdGVnb3J5LmlkID0gY2F0ZWdvcnkuaWQ7XG4gICAgICAgICAgICB0aGlzLmVudGl0eS5jYXRlZ29yeS5uYW1lID0gY2F0ZWdvcnkubmFtZTtcbiAgICAgICAgICAgIHRoaXMuJG5vdGlmeSh7XG4gICAgICAgICAgICAgICAgZ3JvdXA6ICdtYWluJyxcbiAgICAgICAgICAgICAgICB0eXBlOiAnc3VjY2VzcycsXG4gICAgICAgICAgICAgICAgdGV4dDogJ9Ca0LDRgtC10LPQvtGA0LjRjyDQstGL0LHRgNCw0L3QsCdcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBzZWxlY3RDYXRlZ29yeSgpe1xuICAgICAgICAgICAgdGhpcy4kZXZlbnRCdXMuJGVtaXQoJ29wZW5EaWFsb2cnLCB7XG4gICAgICAgICAgICAgICAgdGFnOiAnc2VsZWN0Q2F0ZWdvcnknLFxuICAgICAgICAgICAgICAgIHBhcmFtczoge3Jvb3RfY2F0ZWdvcnk6dGhpcy5yb290X2NhdGVnb3J5LCByZWY6IHRoaXN9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0UGFyZW50Q2F0ZWdvcnkoKXtcbiAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IHRydWU7XG4gICAgICAgICAgICB3aW5kb3cuYXhpb3Moe1xuICAgICAgICAgICAgICAgIG1ldGhvZDogJ2dldCcsXG4gICAgICAgICAgICAgICAgdXJsOiAnL2NhdGVnb3JpZXMvJyArIHRoaXMuZW50aXR5LmNhdGVnb3J5LmlkLFxuICAgICAgICAgICAgfSkudGhlbigocmVzcCkgPT4gIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVudGl0eS5jYXRlZ29yeS5pZCA9IHJlc3AuZGF0YS5pZDtcbiAgICAgICAgICAgICAgICB0aGlzLmVudGl0eS5jYXRlZ29yeS5uYW1lID0gcmVzcC5kYXRhLm5hbWU7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICB9XG59O1xuZXhwb3J0IGRlZmF1bHQgcGFydG5lck1peGluO1xuIiwibGV0IHN0b3JlTWl4aW4gPSB7XG5cbiAgICBkYXRhOiAoKT0+IHtcbiAgICAgICAgcmV0dXJue1xuICAgICAgICAgICAgZW50aXR5OntcbiAgICAgICAgICAgICAgICBzdG9yZV9pZDpudWxsXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuICAgIGNvbXB1dGVkOntcbiAgICAgICAgc3RvcmUoKXtcbiAgICAgICAgICAgIGxldCBzdG9yZXMgPSB0aGlzLmdldEZyb21Mb2NhbFN0b3JhZ2UoJ3N0b3JlcycpO1xuICAgICAgICAgICAgdGhpcy5lbnRpdHkuc3RvcmVfaWQgPSBzdG9yZXNbMF0uaWQ7XG4gICAgICAgICAgICByZXR1cm4gc3RvcmVzWzBdO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBtZXRob2RzOiB7XG4gICAgfVxufTtcbmV4cG9ydCBkZWZhdWx0IHN0b3JlTWl4aW47XG4iLCJsZXQgc3VwcGxpZXJNaXhpbiA9IHtcbiAgICBtZXRob2RzOiB7XG4gICAgICAgIHNldFN1cHBsaWVyKHN1cHBsaWVyKXtcbiAgICAgICAgICAgIHRoaXMuZW50aXR5LnN1cHBsaWVyLmlkID0gc3VwcGxpZXIuaWQ7XG4gICAgICAgICAgICB0aGlzLmVudGl0eS5zdXBwbGllci5uYW1lID0gc3VwcGxpZXIubmFtZTtcbiAgICAgICAgICAgIHRoaXMuJG5vdGlmeSh7XG4gICAgICAgICAgICAgICAgZ3JvdXA6ICdtYWluJyxcbiAgICAgICAgICAgICAgICB0eXBlOiAnc3VjY2VzcycsXG4gICAgICAgICAgICAgICAgdGV4dDogJ9Cf0YDQvtC40LfQstC+0LTQuNGC0LXQu9GMINCy0YvQsdGA0LDQvSdcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBzZWxlY3RTdXBwbGllcigpe1xuICAgICAgICAgICAgdGhpcy4kZXZlbnRCdXMuJGVtaXQoJ29wZW5EaWFsb2cnLCB7XG4gICAgICAgICAgICAgICAgdGFnOiAnc2VsZWN0U3VwcGxpZXInLFxuICAgICAgICAgICAgICAgIHBhcmFtczoge3JlZjogdGhpc31cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgIH1cbn07XG5leHBvcnQgZGVmYXVsdCBzdXBwbGllck1peGluO1xuIiwiaW1wb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSBmcm9tIFwiLi9MaXN0LnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD1kN2ExYzhiYSZzY29wZWQ9dHJ1ZSZcIlxuaW1wb3J0IHNjcmlwdCBmcm9tIFwiLi9MaXN0LnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuZXhwb3J0ICogZnJvbSBcIi4vTGlzdC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcblxuXG4vKiBub3JtYWxpemUgY29tcG9uZW50ICovXG5pbXBvcnQgbm9ybWFsaXplciBmcm9tIFwiIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9ydW50aW1lL2NvbXBvbmVudE5vcm1hbGl6ZXIuanNcIlxudmFyIGNvbXBvbmVudCA9IG5vcm1hbGl6ZXIoXG4gIHNjcmlwdCxcbiAgcmVuZGVyLFxuICBzdGF0aWNSZW5kZXJGbnMsXG4gIGZhbHNlLFxuICBudWxsLFxuICBcImQ3YTFjOGJhXCIsXG4gIG51bGxcbiAgXG4pXG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7XG4gIHZhciBhcGkgPSByZXF1aXJlKFwiQzpcXFxcT3BlblNlcnZlclxcXFxkb21haW5zXFxcXEF1dG9DUk1cXFxcbm9kZV9tb2R1bGVzXFxcXHZ1ZS1ob3QtcmVsb2FkLWFwaVxcXFxkaXN0XFxcXGluZGV4LmpzXCIpXG4gIGFwaS5pbnN0YWxsKHJlcXVpcmUoJ3Z1ZScpKVxuICBpZiAoYXBpLmNvbXBhdGlibGUpIHtcbiAgICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gICAgaWYgKCFhcGkuaXNSZWNvcmRlZCgnZDdhMWM4YmEnKSkge1xuICAgICAgYXBpLmNyZWF0ZVJlY29yZCgnZDdhMWM4YmEnLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbG9hZCgnZDdhMWM4YmEnLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIuL0xpc3QudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPWQ3YTFjOGJhJnNjb3BlZD10cnVlJlwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICBhcGkucmVyZW5kZXIoJ2Q3YTFjOGJhJywge1xuICAgICAgICByZW5kZXI6IHJlbmRlcixcbiAgICAgICAgc3RhdGljUmVuZGVyRm5zOiBzdGF0aWNSZW5kZXJGbnNcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxufVxuY29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJyZXNvdXJjZXMvanMvY29tcG9uZW50cy9zZXJ2aWNlL0xpc3QudnVlXCJcbmV4cG9ydCBkZWZhdWx0IGNvbXBvbmVudC5leHBvcnRzIiwiaW1wb3J0IG1vZCBmcm9tIFwiLSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS00LTAhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9MaXN0LnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIjsgZXhwb3J0IGRlZmF1bHQgbW9kOyBleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS00LTAhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9MaXN0LnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIiIsImV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3RlbXBsYXRlTG9hZGVyLmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9MaXN0LnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD1kN2ExYzhiYSZzY29wZWQ9dHJ1ZSZcIiIsImltcG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0gZnJvbSBcIi4vUHJvdmlkZXJPcmRlckRpYWxvZy52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9MWQ2MzFmZDImXCJcbmltcG9ydCBzY3JpcHQgZnJvbSBcIi4vUHJvdmlkZXJPcmRlckRpYWxvZy52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcbmV4cG9ydCAqIGZyb20gXCIuL1Byb3ZpZGVyT3JkZXJEaWFsb2cudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5cblxuLyogbm9ybWFsaXplIGNvbXBvbmVudCAqL1xuaW1wb3J0IG5vcm1hbGl6ZXIgZnJvbSBcIiEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvcnVudGltZS9jb21wb25lbnROb3JtYWxpemVyLmpzXCJcbnZhciBjb21wb25lbnQgPSBub3JtYWxpemVyKFxuICBzY3JpcHQsXG4gIHJlbmRlcixcbiAgc3RhdGljUmVuZGVyRm5zLFxuICBmYWxzZSxcbiAgbnVsbCxcbiAgbnVsbCxcbiAgbnVsbFxuICBcbilcblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHtcbiAgdmFyIGFwaSA9IHJlcXVpcmUoXCJDOlxcXFxPcGVuU2VydmVyXFxcXGRvbWFpbnNcXFxcQXV0b0NSTVxcXFxub2RlX21vZHVsZXNcXFxcdnVlLWhvdC1yZWxvYWQtYXBpXFxcXGRpc3RcXFxcaW5kZXguanNcIilcbiAgYXBpLmluc3RhbGwocmVxdWlyZSgndnVlJykpXG4gIGlmIChhcGkuY29tcGF0aWJsZSkge1xuICAgIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgICBpZiAoIWFwaS5pc1JlY29yZGVkKCcxZDYzMWZkMicpKSB7XG4gICAgICBhcGkuY3JlYXRlUmVjb3JkKCcxZDYzMWZkMicsIGNvbXBvbmVudC5vcHRpb25zKVxuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVsb2FkKCcxZDYzMWZkMicsIGNvbXBvbmVudC5vcHRpb25zKVxuICAgIH1cbiAgICBtb2R1bGUuaG90LmFjY2VwdChcIi4vUHJvdmlkZXJPcmRlckRpYWxvZy52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9MWQ2MzFmZDImXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGFwaS5yZXJlbmRlcignMWQ2MzFmZDInLCB7XG4gICAgICAgIHJlbmRlcjogcmVuZGVyLFxuICAgICAgICBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZuc1xuICAgICAgfSlcbiAgICB9KVxuICB9XG59XG5jb21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcInJlc291cmNlcy9qcy9jb21wb25lbnRzL3RlbXBsYXRlL0RpYWxvZ3MvUHJvdmlkZXJPcmRlckRpYWxvZy52dWVcIlxuZXhwb3J0IGRlZmF1bHQgY29tcG9uZW50LmV4cG9ydHMiLCJpbXBvcnQgbW9kIGZyb20gXCItIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTQtMCEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL1Byb3ZpZGVyT3JkZXJEaWFsb2cudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiOyBleHBvcnQgZGVmYXVsdCBtb2Q7IGV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTQtMCEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL1Byb3ZpZGVyT3JkZXJEaWFsb2cudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiIiwiZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvdGVtcGxhdGVMb2FkZXIuanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL1Byb3ZpZGVyT3JkZXJEaWFsb2cudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTFkNjMxZmQyJlwiIl0sInNvdXJjZVJvb3QiOiIifQ==