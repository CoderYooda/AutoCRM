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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvc2VydmljZS9MaXN0LnZ1ZSIsIndlYnBhY2s6Ly8vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvdGVtcGxhdGUvRGlhbG9ncy9Qcm92aWRlck9yZGVyRGlhbG9nLnZ1ZSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvY29tcG9uZW50cy9zZXJ2aWNlL0xpc3QudnVlP2NlNjYiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvdGVtcGxhdGUvRGlhbG9ncy9Qcm92aWRlck9yZGVyRGlhbG9nLnZ1ZT81ZGVhIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9qcy9jb21wb25lbnRzL21peGlucy9jYXRlZ29yeU1peGluLmpzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9qcy9jb21wb25lbnRzL21peGlucy9wYXJ0bmVyTWl4aW4uanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvbWl4aW5zL3N0b3JlTWl4aW4uanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvbWl4aW5zL3N1cHBsaWVyTWl4aW4uanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvc2VydmljZS9MaXN0LnZ1ZSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvY29tcG9uZW50cy9zZXJ2aWNlL0xpc3QudnVlPzViNDkiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvc2VydmljZS9MaXN0LnZ1ZT9lZTlkIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9qcy9jb21wb25lbnRzL3RlbXBsYXRlL0RpYWxvZ3MvUHJvdmlkZXJPcmRlckRpYWxvZy52dWUiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvdGVtcGxhdGUvRGlhbG9ncy9Qcm92aWRlck9yZGVyRGlhbG9nLnZ1ZT84MTY5Iiwid2VicGFjazovLy8uL3Jlc291cmNlcy9qcy9jb21wb25lbnRzL3RlbXBsYXRlL0RpYWxvZ3MvUHJvdmlkZXJPcmRlckRpYWxvZy52dWU/YjhmYiJdLCJuYW1lcyI6WyJjYXRlZ29yeU1peGluIiwibWV0aG9kcyIsInNldENhdGVnb3J5IiwiY2F0ZWdvcnkiLCJlbnRpdHkiLCJpZCIsIm5hbWUiLCIkbm90aWZ5IiwiZ3JvdXAiLCJ0eXBlIiwidGV4dCIsInNlbGVjdENhdGVnb3J5IiwiJGV2ZW50QnVzIiwiJGVtaXQiLCJ0YWciLCJwYXJhbXMiLCJyb290X2NhdGVnb3J5IiwicmVmIiwiZ2V0UGFyZW50Q2F0ZWdvcnkiLCJsb2FkaW5nIiwid2luZG93IiwiYXhpb3MiLCJtZXRob2QiLCJ1cmwiLCJ0aGVuIiwicmVzcCIsImRhdGEiLCJwYXJ0bmVyTWl4aW4iLCJjb21wdXRlZCIsInBhcnRuZXJfbmFtZSIsInBhcnRuZXIiLCJjb21wYW55TmFtZSIsImZpbyIsInN0b3JlTWl4aW4iLCJzdG9yZV9pZCIsInN0b3JlIiwic3RvcmVzIiwiZ2V0RnJvbUxvY2FsU3RvcmFnZSIsInN1cHBsaWVyTWl4aW4iLCJzZXRTdXBwbGllciIsInN1cHBsaWVyIiwic2VsZWN0U3VwcGxpZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBb0VBO0FBQ0EsaUJBREE7QUFFQSxjQUZBO0FBR0E7QUFDQTtBQUNBO0FBREE7QUFHQSxHQVBBO0FBUUE7QUFDQSxrQkFEQSwwQkFDQSxJQURBLEVBQ0E7QUFDQTtBQUNBLGtDQUNBOztBQUVBO0FBQ0E7QUFDQSxPQUZBLE1BRUE7QUFDQTtBQUNBOztBQUNBLHlCQUNBO0FBRUE7QUFDQTtBQWZBO0FBUkEsRzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBREE7QUFFQSxtQkFGQTtBQUdBLGtRQUhBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFBQTtBQUFBOztBQUNBO0FBQ0EsT0FMQTs7QUFNQSxhQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUEsT0FEQSxFQUVBO0FBQUE7QUFBQTtBQUFBO0FBQUEsT0FGQSxDQU5BO0FBVUE7QUFDQSxnQkFEQTtBQUVBLG9CQUZBO0FBR0E7QUFDQSxrQkFEQTtBQUVBO0FBRkEsU0FIQTtBQU9BO0FBQ0Esa0JBREE7QUFFQSxrQ0FGQTtBQUdBLDBCQUhBO0FBSUE7QUFKQTtBQVBBLE9BVkE7QUF3QkE7QUFDQSxpQkFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQURBLEVBRUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FGQSxFQUdBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBSEEsRUFJQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQUpBLEVBS0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FMQSxFQU1BO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBTkEsRUFPQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQVBBLEVBUUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FSQSxFQVNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBVEEsQ0FEQTtBQVlBO0FBQ0EsMEJBREE7QUFFQSx1QkFGQTtBQUdBLDZCQUhBO0FBSUEsbUJBSkE7QUFLQTtBQUxBLFNBWkE7QUFtQkE7QUFuQkEsT0F4QkE7QUE2Q0Esa0JBN0NBO0FBOENBO0FBOUNBO0FBZ0RBLEdBckRBO0FBc0RBLFNBdERBLHFCQXNEQTtBQUFBOztBQUNBOztBQUNBO0FBQ0E7QUFDQSxLQUZBLE1BRUE7QUFDQTtBQUNBO0FBQ0EscUJBREE7QUFFQTtBQUZBLFNBR0EsSUFIQSxDQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BVEEsV0FTQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBLE9BZEE7QUFlQTtBQUNBLEdBNUVBO0FBNkVBLGNBN0VBO0FBK0VBO0FBQ0EsYUFEQSxxQkFDQSxHQURBLEVBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FGQTtBQUdBO0FBQ0EsS0FOQTtBQU9BLFFBUEEsa0JBT0E7QUFBQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQURBO0FBRUEsOEJBRkE7QUFHQTtBQUhBLFNBSUEsSUFKQSxDQUlBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7O0FBQ0E7O0FBQ0E7QUFDQSxPQVJBLFdBUUE7QUFDQTtBQUNBO0FBQ0EsT0FYQTtBQVlBO0FBdkJBLEdBL0VBO0FBd0dBO0FBQ0EseUVBREE7QUFDQTtBQURBO0FBeEdBLEc7Ozs7Ozs7Ozs7OztBQ25EQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixTQUFTLGdCQUFnQixFQUFFO0FBQy9DLGVBQWUsZ0NBQWdDO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUyw2QkFBNkI7QUFDdEM7QUFDQTtBQUNBO0FBQ0EsYUFBYSw4REFBOEQ7QUFDM0U7QUFDQSwwQkFBMEIsNEJBQTRCO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsNEJBQTRCO0FBQ2xELGlCQUFpQiw4QkFBOEI7QUFDL0M7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLCtCQUErQjtBQUNoRCxxQkFBcUIsd0NBQXdDLGFBQWEsRUFBRTtBQUM1RTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsMEJBQTBCO0FBQzdDLHVCQUF1QixTQUFTLDJDQUEyQyxFQUFFO0FBQzdFLHVCQUF1QixTQUFTLGFBQWEsRUFBRTtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsd0NBQXdDLHNCQUFzQixFQUFFO0FBQzNFO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQiwwQkFBMEI7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYLHVCQUF1QixTQUFTLHNCQUFzQixFQUFFO0FBQ3hEO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQiwyQkFBMkI7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEIsU0FBUztBQUNUO0FBQ0EscUJBQXFCLDhCQUE4QjtBQUNuRCwwQkFBMEIsb0NBQW9DO0FBQzlEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEI7QUFDNUIsYUFBYTtBQUNiO0FBQ0EseUJBQXlCLHVDQUF1QztBQUNoRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEI7QUFDNUIsYUFBYTtBQUNiO0FBQ0EseUJBQXlCLHVDQUF1QztBQUNoRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEI7QUFDNUIsYUFBYTtBQUNiO0FBQ0EseUJBQXlCLDBDQUEwQztBQUNuRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QjtBQUM1QixhQUFhO0FBQ2I7QUFDQSx5QkFBeUIsd0NBQXdDO0FBQ2pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEI7QUFDNUIsYUFBYTtBQUNiO0FBQ0EseUJBQXlCLDBDQUEwQztBQUNuRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QjtBQUM1QixhQUFhO0FBQ2I7QUFDQSx5QkFBeUIsMENBQTBDO0FBQ25FO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCO0FBQzVCLGFBQWE7QUFDYjtBQUNBLHlCQUF5QiwwQ0FBMEM7QUFDbkU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQiw2QkFBNkI7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEIsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUNsUEE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsNEJBQTRCO0FBQzNDLGlCQUFpQix3QkFBd0I7QUFDekMsbUJBQW1CLGlDQUFpQztBQUNwRDtBQUNBO0FBQ0EsYUFBYSxxQkFBcUI7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCO0FBQzFCLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLDZCQUE2QjtBQUMzRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsbUNBQW1DO0FBQ3RELHFCQUFxQixtQ0FBbUM7QUFDeEQ7QUFDQTtBQUNBLGVBQWUsa0NBQWtDLDRCQUE0QixFQUFFO0FBQy9FO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLGtDQUFrQyw0QkFBNEIsRUFBRTtBQUMvRSwyQkFBMkIsU0FBUyxzQkFBc0IsRUFBRTtBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLGdDQUFnQztBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixvREFBb0Q7QUFDM0U7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQiw4QkFBOEI7QUFDcEQsb0JBQW9CLDRDQUE0QztBQUNoRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEIsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUNuSkE7QUFBQSxJQUFJQSxhQUFhLEdBQUc7QUFDaEJDLFNBQU8sRUFBRTtBQUNMQyxlQURLLHVCQUNPQyxRQURQLEVBQ2dCO0FBQ2pCLFdBQUtDLE1BQUwsQ0FBWUQsUUFBWixDQUFxQkUsRUFBckIsR0FBMEJGLFFBQVEsQ0FBQ0UsRUFBbkM7QUFDQSxXQUFLRCxNQUFMLENBQVlELFFBQVosQ0FBcUJHLElBQXJCLEdBQTRCSCxRQUFRLENBQUNHLElBQXJDO0FBQ0EsV0FBS0MsT0FBTCxDQUFhO0FBQ1RDLGFBQUssRUFBRSxNQURFO0FBRVRDLFlBQUksRUFBRSxTQUZHO0FBR1RDLFlBQUksRUFBRTtBQUhHLE9BQWI7QUFLSCxLQVRJO0FBVUxDLGtCQVZLLDRCQVVXO0FBQ1osV0FBS0MsU0FBTCxDQUFlQyxLQUFmLENBQXFCLFlBQXJCLEVBQW1DO0FBQy9CQyxXQUFHLEVBQUUsZ0JBRDBCO0FBRS9CQyxjQUFNLEVBQUU7QUFBQ0MsdUJBQWEsRUFBQyxLQUFLQSxhQUFwQjtBQUFtQ0MsYUFBRyxFQUFFO0FBQXhDO0FBRnVCLE9BQW5DO0FBSUgsS0FmSTtBQWdCTEMscUJBaEJLLCtCQWdCYztBQUFBOztBQUNmLFdBQUtDLE9BQUwsR0FBZSxJQUFmO0FBQ0FDLFlBQU0sQ0FBQ0MsS0FBUCxDQUFhO0FBQ1RDLGNBQU0sRUFBRSxLQURDO0FBRVRDLFdBQUcsRUFBRSxpQkFBaUIsS0FBS25CLE1BQUwsQ0FBWUQsUUFBWixDQUFxQkU7QUFGbEMsT0FBYixFQUdHbUIsSUFISCxDQUdRLFVBQUNDLElBQUQsRUFBVztBQUNmLGFBQUksQ0FBQ3JCLE1BQUwsQ0FBWUQsUUFBWixDQUFxQkUsRUFBckIsR0FBMEJvQixJQUFJLENBQUNDLElBQUwsQ0FBVXJCLEVBQXBDO0FBQ0EsYUFBSSxDQUFDRCxNQUFMLENBQVlELFFBQVosQ0FBcUJHLElBQXJCLEdBQTRCbUIsSUFBSSxDQUFDQyxJQUFMLENBQVVwQixJQUF0QztBQUNBLGFBQUksQ0FBQ2EsT0FBTCxHQUFlLEtBQWY7QUFDSCxPQVBEO0FBUUg7QUExQkk7QUFETyxDQUFwQjtBQThCZW5CLDRFQUFmLEU7Ozs7Ozs7Ozs7OztBQzlCQTtBQUFBLElBQUkyQixZQUFZLEdBQUc7QUFDZkMsVUFBUSxFQUFDO0FBQ0xDLGdCQURLLDBCQUNTO0FBQ1YsYUFBTyxLQUFLekIsTUFBTCxDQUFZMEIsT0FBWixDQUFvQnJCLElBQXBCLEtBQTZCLENBQTdCLEdBQWlDLEtBQUtMLE1BQUwsQ0FBWTBCLE9BQVosQ0FBb0JDLFdBQXJELEdBQW1FLEtBQUszQixNQUFMLENBQVkwQixPQUFaLENBQW9CRSxHQUE5RjtBQUNIO0FBSEksR0FETTtBQU1mL0IsU0FBTyxFQUFFO0FBQ0xDLGVBREssdUJBQ09DLFFBRFAsRUFDZ0I7QUFDakIsV0FBS0MsTUFBTCxDQUFZRCxRQUFaLENBQXFCRSxFQUFyQixHQUEwQkYsUUFBUSxDQUFDRSxFQUFuQztBQUNBLFdBQUtELE1BQUwsQ0FBWUQsUUFBWixDQUFxQkcsSUFBckIsR0FBNEJILFFBQVEsQ0FBQ0csSUFBckM7QUFDQSxXQUFLQyxPQUFMLENBQWE7QUFDVEMsYUFBSyxFQUFFLE1BREU7QUFFVEMsWUFBSSxFQUFFLFNBRkc7QUFHVEMsWUFBSSxFQUFFO0FBSEcsT0FBYjtBQUtILEtBVEk7QUFVTEMsa0JBVkssNEJBVVc7QUFDWixXQUFLQyxTQUFMLENBQWVDLEtBQWYsQ0FBcUIsWUFBckIsRUFBbUM7QUFDL0JDLFdBQUcsRUFBRSxnQkFEMEI7QUFFL0JDLGNBQU0sRUFBRTtBQUFDQyx1QkFBYSxFQUFDLEtBQUtBLGFBQXBCO0FBQW1DQyxhQUFHLEVBQUU7QUFBeEM7QUFGdUIsT0FBbkM7QUFJSCxLQWZJO0FBZ0JMQyxxQkFoQkssK0JBZ0JjO0FBQUE7O0FBQ2YsV0FBS0MsT0FBTCxHQUFlLElBQWY7QUFDQUMsWUFBTSxDQUFDQyxLQUFQLENBQWE7QUFDVEMsY0FBTSxFQUFFLEtBREM7QUFFVEMsV0FBRyxFQUFFLGlCQUFpQixLQUFLbkIsTUFBTCxDQUFZRCxRQUFaLENBQXFCRTtBQUZsQyxPQUFiLEVBR0dtQixJQUhILENBR1EsVUFBQ0MsSUFBRCxFQUFXO0FBQ2YsYUFBSSxDQUFDckIsTUFBTCxDQUFZRCxRQUFaLENBQXFCRSxFQUFyQixHQUEwQm9CLElBQUksQ0FBQ0MsSUFBTCxDQUFVckIsRUFBcEM7QUFDQSxhQUFJLENBQUNELE1BQUwsQ0FBWUQsUUFBWixDQUFxQkcsSUFBckIsR0FBNEJtQixJQUFJLENBQUNDLElBQUwsQ0FBVXBCLElBQXRDO0FBQ0EsYUFBSSxDQUFDYSxPQUFMLEdBQWUsS0FBZjtBQUNILE9BUEQ7QUFRSDtBQTFCSTtBQU5NLENBQW5CO0FBbUNlUSwyRUFBZixFOzs7Ozs7Ozs7Ozs7QUNuQ0E7QUFBQSxJQUFJTSxVQUFVLEdBQUc7QUFFYlAsTUFBSSxFQUFFLGdCQUFLO0FBQ1AsV0FBTTtBQUNGdEIsWUFBTSxFQUFDO0FBQ0g4QixnQkFBUSxFQUFDO0FBRE47QUFETCxLQUFOO0FBS0gsR0FSWTtBQVNiTixVQUFRLEVBQUM7QUFDTE8sU0FESyxtQkFDRTtBQUNILFVBQUlDLE1BQU0sR0FBRyxLQUFLQyxtQkFBTCxDQUF5QixRQUF6QixDQUFiO0FBQ0EsV0FBS2pDLE1BQUwsQ0FBWThCLFFBQVosR0FBdUJFLE1BQU0sQ0FBQyxDQUFELENBQU4sQ0FBVS9CLEVBQWpDO0FBQ0EsYUFBTytCLE1BQU0sQ0FBQyxDQUFELENBQWI7QUFDSDtBQUxJLEdBVEk7QUFnQmJuQyxTQUFPLEVBQUU7QUFoQkksQ0FBakI7QUFtQmVnQyx5RUFBZixFOzs7Ozs7Ozs7Ozs7QUNuQkE7QUFBQSxJQUFJSyxhQUFhLEdBQUc7QUFDaEJyQyxTQUFPLEVBQUU7QUFDTHNDLGVBREssdUJBQ09DLFFBRFAsRUFDZ0I7QUFDakIsV0FBS3BDLE1BQUwsQ0FBWW9DLFFBQVosQ0FBcUJuQyxFQUFyQixHQUEwQm1DLFFBQVEsQ0FBQ25DLEVBQW5DO0FBQ0EsV0FBS0QsTUFBTCxDQUFZb0MsUUFBWixDQUFxQmxDLElBQXJCLEdBQTRCa0MsUUFBUSxDQUFDbEMsSUFBckM7QUFDQSxXQUFLQyxPQUFMLENBQWE7QUFDVEMsYUFBSyxFQUFFLE1BREU7QUFFVEMsWUFBSSxFQUFFLFNBRkc7QUFHVEMsWUFBSSxFQUFFO0FBSEcsT0FBYjtBQUtILEtBVEk7QUFVTCtCLGtCQVZLLDRCQVVXO0FBQ1osV0FBSzdCLFNBQUwsQ0FBZUMsS0FBZixDQUFxQixZQUFyQixFQUFtQztBQUMvQkMsV0FBRyxFQUFFLGdCQUQwQjtBQUUvQkMsY0FBTSxFQUFFO0FBQUNFLGFBQUcsRUFBRTtBQUFOO0FBRnVCLE9BQW5DO0FBSUg7QUFmSTtBQURPLENBQXBCO0FBbUJlcUIsNEVBQWYsRTs7Ozs7Ozs7Ozs7O0FDbkJBO0FBQUE7QUFBQTtBQUFBO0FBQStGO0FBQ3ZDO0FBQ0w7OztBQUduRDtBQUNnRztBQUNoRyxnQkFBZ0IsMkdBQVU7QUFDMUIsRUFBRSwwRUFBTTtBQUNSLEVBQUUsMkZBQU07QUFDUixFQUFFLG9HQUFlO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsSUFBSSxLQUFVLEVBQUUsWUFpQmY7QUFDRDtBQUNlLGdGOzs7Ozs7Ozs7Ozs7QUN0Q2Y7QUFBQTtBQUFBLHdDQUEwTCxDQUFnQixnUEFBRyxFQUFDLEM7Ozs7Ozs7Ozs7OztBQ0E5TTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7Ozs7Ozs7Ozs7Ozs7QUNBQTtBQUFBO0FBQUE7QUFBQTtBQUFrRztBQUMzQjtBQUNMOzs7QUFHbEU7QUFDbUc7QUFDbkcsZ0JBQWdCLDJHQUFVO0FBQzFCLEVBQUUseUZBQU07QUFDUixFQUFFLDhGQUFNO0FBQ1IsRUFBRSx1R0FBZTtBQUNqQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLElBQUksS0FBVSxFQUFFLFlBaUJmO0FBQ0Q7QUFDZSxnRjs7Ozs7Ozs7Ozs7O0FDdENmO0FBQUE7QUFBQSx3Q0FBK00sQ0FBZ0IsK1BBQUcsRUFBQyxDOzs7Ozs7Ozs7Ozs7QUNBbk87QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBIiwiZmlsZSI6InByb3ZpZGVyT3JkZXJEaWFsb2cuanMiLCJzb3VyY2VzQ29udGVudCI6WyI8dGVtcGxhdGU+XG4gICAgPGRpdiBpZD1cInBvX2xpc3RcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImxpc3QtY29udGFpbmVyXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGl0bGVfY29udFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJoZWFkZXJfdGl0bGVcIj7QodC/0LjRgdC+0Log0L3QvtC80LXQvdC60LvQsNGC0YPRgDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJuZHNfY29udGFpbmVyXCI+PGxhYmVsIGNsYXNzPVwiY2hlY2tib3gtdGl0bGVcIiBmb3I9XCJuZHNcIj7QndCU0KE6PC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNoZWNrYm94XCI+PGlucHV0IG5hbWU9XCJuZHNcIiBpZD1cIm5kc1wiIHR5cGU9XCJjaGVja2JveFwiPjxsYWJlbCBmb3I9XCJuZHNcIj48L2xhYmVsPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwibmRzX2luY2x1ZGVkXCIgY2xhc3M9XCJjaGVja2JveC10aXRsZVwiPtCy0LrQu9GO0YfQtdC9INCyINGB0YLQvtC40LzQvtGB0YLRjDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjaGVja2JveFwiPjxpbnB1dCBuYW1lPVwibmRzX2luY2x1ZGVkXCIgaWQ9XCJuZHNfaW5jbHVkZWRcIiB0eXBlPVwiY2hlY2tib3hcIj48bGFiZWxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcj1cIm5kc19pbmNsdWRlZFwiPjwvbGFiZWw+PC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJsaXN0LWhlYWRlclwiPlxuICAgICAgICAgICAgICAgIDxkaXYgdi1mb3I9XCJpdGVtIGluIGRhdGEuaGVhZGVyXCIgY2xhc3M9XCJoZWFkZXItZWxlbVwiIHYtYmluZDpzdHlsZT1cImdldEhlYWRlclN0eWxlKGl0ZW0pXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaGVhZC10aXRsZVwiPnt7IGl0ZW0ubmFtZSB9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImxpc3QtYm9keVwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJib2R5LWVsZW1cIiBpZD1cInByb2R1Y3RzXzJcIiBkYXRhLWlkPVwiMlwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibGlzdC1hY3Rpb25zXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnV0dG9uIGxpc3QtcmVtb3ZlXCI+4pyWPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG5cblxuXG5cblxuXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiaGlkZGVuXCIgdmFsdWU9XCIxMDFcIiBuYW1lPVwicHJvZHVjdHNbMl1bcGl2b3RfaWRdXCI+PGlucHV0IHR5cGU9XCJoaWRkZW5cIiB2YWx1ZT1cIjE2OTU0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZT1cInByb2R1Y3RzWzJdW3Byb2R1Y3RfaWRdXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjZWxsXCIgc3R5bGU9XCJmbGV4OiAxIDEgMCU7IG1pbi13aWR0aDogMTAwcHg7XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibGlzdC10aXRsZSB0aXRsZS10ZXh0XCI+YXdkYXdkPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2VsbFwiIHN0eWxlPVwid2lkdGg6IDEwMHB4OyBtaW4td2lkdGg6IDEwMHB4O1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImxpc3QtdGl0bGUgdGl0bGUtdGV4dFwiPjE0NTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNlbGxcIiBzdHlsZT1cIndpZHRoOiA2NXB4OyBtaW4td2lkdGg6IDY1cHg7XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibGlzdC10aXRsZSB0aXRsZS1jb3VudGVyXCI+PGlucHV0IHR5cGU9XCJudW1iZXJcIiBtaW49XCIxXCIgbmFtZT1cInByb2R1Y3RzWzJdW2NvdW50XVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2VsbFwiIHN0eWxlPVwid2lkdGg6IDgwcHg7IG1pbi13aWR0aDogODBweDtcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJsaXN0LXRpdGxlIHRpdGxlLXByaWNlXCI+PGlucHV0IHR5cGU9XCJudW1iZXJcIiBtaW49XCIxXCIgc3RlcD1cIjAuMVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZT1cInByb2R1Y3RzWzJdW3ByaWNlXVwiPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNlbGxcIiBzdHlsZT1cIndpZHRoOiA3MHB4OyBtaW4td2lkdGg6IDcwcHg7XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibGlzdC10aXRsZSB0aXRsZS1wYXNzaXZlXCI+PGlucHV0IHR5cGU9XCJudW1iZXJcIiBkaXNhYmxlZD1cIlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lPVwicHJvZHVjdHNbMl1bbmRzX3BlcmNlbnRdXCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2VsbFwiIHN0eWxlPVwid2lkdGg6IDcwcHg7IG1pbi13aWR0aDogNzBweDtcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJsaXN0LXRpdGxlIHRpdGxlLXBhc3NpdmVcIj48aW5wdXQgdHlwZT1cIm51bWJlclwiIGRpc2FibGVkPVwiXCIgbmFtZT1cInByb2R1Y3RzWzJdW25kc11cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNlbGxcIiBzdHlsZT1cIndpZHRoOiAxMDBweDsgbWluLXdpZHRoOiAxMDBweDtcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJsaXN0LXRpdGxlIHRpdGxlLXBhc3NpdmVcIj48aW5wdXQgdHlwZT1cIm51bWJlclwiIGRpc2FibGVkPVwiXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU9XCJwcm9kdWN0c1syXVt0b3RhbF1cIj48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJsaXN0LWJvdHRvbVwiPlxuICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIG5hbWU9XCJwcm9kdWN0c1wiIGNsYXNzPVwiYnV0dG9uIGxpc3QtYWRkLWJ1dHRvblwiPtCU0L7QsdCw0LLQuNGC0Ywg0L/QvtC30LjRhtC40Y48L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5cbiAgICBleHBvcnQgZGVmYXVsdCB7XG4gICAgICAgIHByb3BzOlsnZGF0YSddLFxuICAgICAgICBuYW1lOiBcIkxpc3RcIixcbiAgICAgICAgZGF0YTogKCk9PiB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGl0ZW1zOiBbXSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgbWV0aG9kczp7XG4gICAgICAgICAgICBnZXRIZWFkZXJTdHlsZShpdGVtKXtcbiAgICAgICAgICAgICAgICBsZXQgc3R5bGUgPSB7fTtcbiAgICAgICAgICAgICAgICBpZihpdGVtLnR5cGUgPT09ICdoaWRkZW4nKVxuICAgICAgICAgICAgICAgICAgICBzdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuXG4gICAgICAgICAgICAgICAgaWYoaXRlbS53aWR0aCA9PT0gJ2F1dG8nKXtcbiAgICAgICAgICAgICAgICAgICAgc3R5bGUuZmxleCA9IDE7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc3R5bGUud2lkdGggPSBpdGVtLndpZHRoICsgJ3B4JztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYoaXRlbS5taW5fd2l0aClcbiAgICAgICAgICAgICAgICAgICAgc3R5bGUubWluV2lkdGggPSBpdGVtLm1pbl93aXRoICsgJ3B4JztcblxuICAgICAgICAgICAgICAgIHJldHVybiBzdHlsZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH1cbiAgICB9XG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsIjx0ZW1wbGF0ZT5cbiAgICA8ZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwibW9kYWwtYm9keVwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImQtZmxleFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJsaW5rLXRhYnMgbm8tcHJcIj5cbiAgICAgICAgICAgICAgICAgICAgPHVsIGNsYXNzPVwibmF2XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bGkgdi1mb3I9XCJ0YWIgaW4gdGFic1wiIHYtYmluZDprZXk9XCJ0YWIuc2x1Z1wiIHYtYmluZDpjbGFzcz1cInsnYWN0aXZlJyA6IHRhYi5zdGF0ZX1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwibmF2LWl0ZW1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSB2LW9uOmNsaWNrPVwic2VsZWN0VGFiKHRhYilcIiBjbGFzcz1cIm5hdi1saW5rXCIgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7eyB0YWIubmFtZSB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImZsb2F0LXJpZ2h0IGhlbHBlcl9kYW5nZXIgZC1ub25lLWZcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEgZmEtZXhjbGFtYXRpb24tdHJpYW5nbGUgdGV4dC1tZCBtbC0yIHRleHQtZGFuZ2VyXCI+PC9pPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGlhbG9nX3RhYl9ob2xkZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRhYi1jb250ZW50IG5vLXBsXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGFiLXBhbmVcIiB2LWJpbmQ6Y2xhc3M9XCJ7J2FjdGl2ZScgOiB0YWJzWzBdLnN0YXRlfVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtSW5wdXQgdi1iaW5kOmlucHV0RGF0YT1cInt0eXBlOidzZWxlY3RvcicsbGFiZWw6J9Cf0L7RgdGC0LDQstGJ0LjQuicsbmFtZToncGFydG5lcl9uYW1lJywgb25DbGljazonc2VsZWN0UGFydG5lcid9XCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybUlucHV0IHYtYmluZDppbnB1dERhdGE9XCJ7dHlwZTonaW5wdXQnLGxhYmVsOifQodC60LvQsNC0JyxuYW1lOidzdG9yZS5uYW1lJywgb25DbGljazonc2VsZWN0UGFydG5lcicsIGRpc2FibGVkOnRydWV9XCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybUlucHV0IHYtYmluZDppbnB1dERhdGE9XCJ7dHlwZTondGV4dGFyZWEnLGxhYmVsOifQmtC+0LzQvNC10L3RgtCw0YDQuNC5JyxuYW1lOidlbnRpdHkuY29tbWVudCcsIG9uQ2xpY2s6J3NlbGVjdFBhcnRuZXInLCBoZWlnaHQ6IDc1fVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0YWItcGFuZVwiICB2LWJpbmQ6Y2xhc3M9XCJ7J2FjdGl2ZScgOiB0YWJzWzFdLnN0YXRlfVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxMaXN0IHYtYmluZDpkYXRhPVwibGlzdF9kYXRhXCIvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGFsLWZvb3RlclwiPlxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ1dHRvbiB3aGl0ZSB1cHBlcmNhc2UtYnRuXCI+0JfQsNC60YDRi9GC0Yw8L2J1dHRvbj5cbiAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnV0dG9uIHByaW1hcnkgcHVsbC1yaWdodCB1cHBlcmNhc2UtYnRuXCI+0KHQvtGF0YDQsNC90LjRgtGMINC4INC30LDQutGA0YvRgtGMPC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ1dHRvbiBwcmltYXJ5IHB1bGwtcmlnaHQgbXItMTUgdXBwZXJjYXNlLWJ0blwiPtCh0L7RhdGA0LDQvdC40YLRjDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzPVwic3lzdGVtX21lc3NhZ2VcIj5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuICAgIGltcG9ydCBzdG9yZU1peGluIGZyb20gXCIuLy4uLy4uL21peGlucy9zdG9yZU1peGluXCJcbiAgICBpbXBvcnQgY2F0ZWdvcnlNaXhpbiBmcm9tIFwiLi8uLi8uLi9taXhpbnMvY2F0ZWdvcnlNaXhpblwiXG4gICAgaW1wb3J0IHBhcnRuZXJNaXhpbiBmcm9tIFwiLi8uLi8uLi9taXhpbnMvcGFydG5lck1peGluXCJcbiAgICBpbXBvcnQgc3VwcGxpZXJNaXhpbiBmcm9tIFwiLi8uLi8uLi9taXhpbnMvc3VwcGxpZXJNaXhpblwiXG4gICAgaW1wb3J0IEZvcm1JbnB1dCBmcm9tIFwiLi8uLi8uLi9zZXJ2aWNlL0Zvcm1JbnB1dFwiXG4gICAgaW1wb3J0IExpc3QgZnJvbSBcIi4vLi4vLi4vc2VydmljZS9MaXN0XCJcbiAgICBleHBvcnQgZGVmYXVsdCB7XG4gICAgICAgIG5hbWU6IFwiUHJvdmlkZXJPcmRlckRpYWxvZ1wiLFxuICAgICAgICBwcm9wczogWydkaWFsb2cnXSxcbiAgICAgICAgbWl4aW5zOiBbY2F0ZWdvcnlNaXhpbiwgc3VwcGxpZXJNaXhpbiwgcGFydG5lck1peGluLCBzdG9yZU1peGluXSxcbiAgICAgICAgZGF0YTogKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBnZXQgc2hvcF9hY3RpdmF0ZWQoKXtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGxvY2FsX3NldHRpbmdzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2VbJ3NldHRpbmdzJ10pO1xuICAgICAgICAgICAgICAgICAgICBsZXQgaW5kZXggPSBfLmZpbmRJbmRleChsb2NhbF9zZXR0aW5ncywgZnVuY3Rpb24obykgeyByZXR1cm4gby5rZXkgPT09IFwic2hvcF9lbmFibGVkXCI7IH0pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbG9jYWxfc2V0dGluZ3NbaW5kZXhdID8gQm9vbGVhbihwYXJzZUludChsb2NhbF9zZXR0aW5nc1tpbmRleF0udmFsdWUpKSA6IGZhbHNlO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdGFiczogW1xuICAgICAgICAgICAgICAgICAgICB7c2x1ZzogXCJiYXNlXCIsIG5hbWU6IFwi0J7RgdC90L7QstC90YvQtVwiLCBzdGF0ZTogdHJ1ZX0sXG4gICAgICAgICAgICAgICAgICAgIHtzbHVnOiBcIml0ZW1zXCIsIG5hbWU6IFwi0J/QvtC30LjRhtC40LhcIiwgc3RhdGU6IGZhbHNlfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIGVudGl0eToge1xuICAgICAgICAgICAgICAgICAgICBpZDpudWxsLFxuICAgICAgICAgICAgICAgICAgICBhcnRpY2xlczogW10sXG4gICAgICAgICAgICAgICAgICAgIHN0b3JlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwi0J3QtSDQstGL0LHRgNCw0L1cIixcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgcGFydG5lcjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb21wYW55TmFtZTon0J3QtSDQstGL0LHRgNCw0L0nLFxuICAgICAgICAgICAgICAgICAgICAgICAgZmlvOifQndC1INCy0YvQsdGA0LDQvScsXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAyXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGxpc3RfZGF0YTp7XG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjogW1xuICAgICAgICAgICAgICAgICAgICAgICAge21pbl93aXRoOiBOYU4sICB3aWR0aDogTmFOLCAgICBuYW1lOiAncGl2b3RfaWQnLCAgICAgIHRhYmxlX25hbWU6ICdwaXZvdF9pZCcsICAgIHR5cGU6ICdoaWRkZW4nfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHttaW5fd2l0aDogTmFOLCAgd2lkdGg6IE5hTiwgICAgbmFtZTogJ3Byb2R1Y3RfaWQnLCAgICB0YWJsZV9uYW1lOiAncHJvZHVjdF9pZCcsICB0eXBlOiAnaGlkZGVuJ30sXG4gICAgICAgICAgICAgICAgICAgICAgICB7bWluX3dpdGg6IDEwMCwgIHdpZHRoOiAnYXV0bycsIG5hbWU6ICfQndCw0LjQvNC10L3QvtCy0LDQvdC40LUnLCAgdGFibGVfbmFtZTogJ25hbWUnLCAgICAgICAgdHlwZTondGV4dCd9LFxuICAgICAgICAgICAgICAgICAgICAgICAge21pbl93aXRoOiAxMDAsICB3aWR0aDogMTAwLCAgICBuYW1lOiAn0JDRgNGC0LjQutGD0LsnLCAgICAgICB0YWJsZV9uYW1lOiAnYXJ0aWNsZScsICAgICB0eXBlOid0ZXh0J30sXG4gICAgICAgICAgICAgICAgICAgICAgICB7bWluX3dpdGg6IDY1LCAgIHdpZHRoOiA2NSwgICAgIG5hbWU6ICfQmtC+0Lst0LLQvicsICAgICAgICB0YWJsZV9uYW1lOiAnY291bnQnLCAgICAgICB0eXBlOiAnY291bnRlcicsfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHttaW5fd2l0aDogODAsICAgd2lkdGg6IDgwLCAgICAgbmFtZTogJ9Cm0LXQvdCwJywgICAgICAgICAgdGFibGVfbmFtZTogJ3ByaWNlJywgICAgICAgdHlwZTogJ3ByaWNlJyx9LFxuICAgICAgICAgICAgICAgICAgICAgICAge21pbl93aXRoOiA3MCwgICB3aWR0aDogNzAsICAgICBuYW1lOiAn0J3QlNChLCAlJywgICAgICAgIHRhYmxlX25hbWU6ICduZHNfcGVyY2VudCcsIHR5cGU6ICdwYXNzaXZlJyx9LFxuICAgICAgICAgICAgICAgICAgICAgICAge21pbl93aXRoOiA3MCwgICB3aWR0aDogNzAsICAgICBuYW1lOiAn0J3QlNChJywgICAgICAgICAgIHRhYmxlX25hbWU6ICduZHMnLCAgICAgICAgIHR5cGU6ICdwYXNzaXZlJyx9LFxuICAgICAgICAgICAgICAgICAgICAgICAge21pbl93aXRoOiAxMDAsICB3aWR0aDogMTAwLCAgICBuYW1lOiAn0JjRgtC+0LPQvicsICAgICAgICAgdGFibGVfbmFtZTogJ3RvdGFsJywgICAgICAgdHlwZTogJ3Bhc3NpdmUnLH0sXG4gICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgIHByZWZzOntcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4OidvcmRpbmFsJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZV9uZHM6dHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbl9hZGRfaXRlbXM6dHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5kczp0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmRzX2luY2x1ZGVkOnRydWVcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgaXRlbXM6W10sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBtZXNzYWdlczp7fSxcbiAgICAgICAgICAgICAgICBsb2FkaW5nOmZhbHNlLFxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBtb3VudGVkKCkge1xuICAgICAgICAgICAgdGhpcy5kaWFsb2cud2lkdGggPSAxMDAwO1xuICAgICAgICAgICAgaWYgKHRoaXMuZGlhbG9nLmlkID09PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kaWFsb2cudGl0bGUgPSBcItCd0L7QstCw0Y8g0LfQsNGP0LLQutCwINC/0L7RgdGC0LDQstGJ0LjQutGDXCI7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgd2luZG93LmF4aW9zKHtcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiAnZ2V0JyxcbiAgICAgICAgICAgICAgICAgICAgdXJsOiAnL3Byb3ZpZGVyX29yZGVycy8nICsgdGhpcy5kaWFsb2cuaWQsXG4gICAgICAgICAgICAgICAgfSkudGhlbigocmVzcCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmlkID0gcmVzcC5kYXRhLmlkO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVudGl0eSA9IHJlc3AuZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5saXN0X2RhdGEuaXRlbXMgPSByZXNwLmRhdGEuYXJ0aWNsZXM7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGlhbG9nLnRpdGxlID0gXCLQoNC10LTQsNC60YLQuNGA0L7QstCw0L3QuNC1INC30LDQutCw0LfQsCDQv9C+0YHRgtCw0LLRidC40LrRgyDihJYnXCIgKyB0aGlzLmVudGl0eS5pZCArIFwiJ1wiO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9KS5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYoZXJyb3IucmVzcG9uc2Uuc3RhdHVzID09PSA0MDQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kcGFyZW50LmNsb3NlRGlhbG9nKHRoaXMuZGlhbG9nKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgY29tcHV0ZWQ6IHtcbiAgICAgICAgfSxcbiAgICAgICAgbWV0aG9kczoge1xuICAgICAgICAgICAgc2VsZWN0VGFiKHRhYikge1xuICAgICAgICAgICAgICAgIHRoaXMudGFicy5mb3JFYWNoKCh0YWIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGFiLnN0YXRlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdGFiLnN0YXRlID0gdHJ1ZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzYXZlKCl7XG4gICAgICAgICAgICAgICAgbGV0IG1ldGhvZCA9IHRoaXMuZW50aXR5LmlkID8gJ3BhdGNoJyA6ICdwb3N0JztcbiAgICAgICAgICAgICAgICBsZXQgdXJsID0gdGhpcy5lbnRpdHkuaWQgPyAnLycgKyB0aGlzLmVudGl0eS5pZCA6ICcnO1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgd2luZG93LmF4aW9zKHtcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiBtZXRob2QsXG4gICAgICAgICAgICAgICAgICAgIHVybDogJy9wcm9kdWN0cycgKyB1cmwsXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6dGhpcy5lbnRpdHksXG4gICAgICAgICAgICAgICAgfSkudGhlbigocmVzcCkgPT4gIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kZXZlbnRCdXMuJGVtaXQoJ1Byb2R1Y3RVcGRhdGVkJywge2lkOiB0aGlzLmlkLCBjYXRlZ29yeV9pZDp0aGlzLmNhdGVnb3J5X2lkfSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJHBhcmVudC5jbG9zZURpYWxvZyh0aGlzLmRpYWxvZyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH0pLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tZXNzYWdlcyA9IGVycm9yLnJlc3BvbnNlLmRhdGEubWVzc2FnZXM7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGNvbXBvbmVudHM6e1xuICAgICAgICAgICAgRm9ybUlucHV0LCBMaXN0XG4gICAgICAgIH1cbiAgICB9XG48L3NjcmlwdD5cbiIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXCJkaXZcIiwgeyBhdHRyczogeyBpZDogXCJwb19saXN0XCIgfSB9LCBbXG4gICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJsaXN0LWNvbnRhaW5lclwiIH0sIFtcbiAgICAgIF92bS5fbSgwKSxcbiAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICBfYyhcbiAgICAgICAgXCJkaXZcIixcbiAgICAgICAgeyBzdGF0aWNDbGFzczogXCJsaXN0LWhlYWRlclwiIH0sXG4gICAgICAgIF92bS5fbChfdm0uZGF0YS5oZWFkZXIsIGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgICByZXR1cm4gX2MoXG4gICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJoZWFkZXItZWxlbVwiLCBzdHlsZTogX3ZtLmdldEhlYWRlclN0eWxlKGl0ZW0pIH0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIF9jKFwic3BhblwiLCB7IHN0YXRpY0NsYXNzOiBcImhlYWQtdGl0bGVcIiB9LCBbXG4gICAgICAgICAgICAgICAgX3ZtLl92KF92bS5fcyhpdGVtLm5hbWUpKVxuICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgXVxuICAgICAgICAgIClcbiAgICAgICAgfSksXG4gICAgICAgIDBcbiAgICAgICksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX3ZtLl9tKDEpLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF92bS5fbSgyKVxuICAgIF0pXG4gIF0pXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW1xuICBmdW5jdGlvbigpIHtcbiAgICB2YXIgX3ZtID0gdGhpc1xuICAgIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICAgIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICAgIHJldHVybiBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcInRpdGxlX2NvbnRcIiB9LCBbXG4gICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImhlYWRlcl90aXRsZVwiIH0sIFtcbiAgICAgICAgX3ZtLl92KFwi0KHQv9C40YHQvtC6INC90L7QvNC10L3QutC70LDRgtGD0YBcIilcbiAgICAgIF0pLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwibmRzX2NvbnRhaW5lclwiIH0sIFtcbiAgICAgICAgX2MoXCJsYWJlbFwiLCB7IHN0YXRpY0NsYXNzOiBcImNoZWNrYm94LXRpdGxlXCIsIGF0dHJzOiB7IGZvcjogXCJuZHNcIiB9IH0sIFtcbiAgICAgICAgICBfdm0uX3YoXCLQndCU0KE6XCIpXG4gICAgICAgIF0pLFxuICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImNoZWNrYm94XCIgfSwgW1xuICAgICAgICAgIF9jKFwiaW5wdXRcIiwgeyBhdHRyczogeyBuYW1lOiBcIm5kc1wiLCBpZDogXCJuZHNcIiwgdHlwZTogXCJjaGVja2JveFwiIH0gfSksXG4gICAgICAgICAgX2MoXCJsYWJlbFwiLCB7IGF0dHJzOiB7IGZvcjogXCJuZHNcIiB9IH0pXG4gICAgICAgIF0pLFxuICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICBfYyhcbiAgICAgICAgICBcImxhYmVsXCIsXG4gICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJjaGVja2JveC10aXRsZVwiLCBhdHRyczogeyBmb3I6IFwibmRzX2luY2x1ZGVkXCIgfSB9LFxuICAgICAgICAgIFtfdm0uX3YoXCLQstC60LvRjtGH0LXQvSDQsiDRgdGC0L7QuNC80L7RgdGC0YxcIildXG4gICAgICAgICksXG4gICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiY2hlY2tib3hcIiB9LCBbXG4gICAgICAgICAgX2MoXCJpbnB1dFwiLCB7XG4gICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICBuYW1lOiBcIm5kc19pbmNsdWRlZFwiLFxuICAgICAgICAgICAgICBpZDogXCJuZHNfaW5jbHVkZWRcIixcbiAgICAgICAgICAgICAgdHlwZTogXCJjaGVja2JveFwiXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSksXG4gICAgICAgICAgX2MoXCJsYWJlbFwiLCB7IGF0dHJzOiB7IGZvcjogXCJuZHNfaW5jbHVkZWRcIiB9IH0pXG4gICAgICAgIF0pXG4gICAgICBdKVxuICAgIF0pXG4gIH0sXG4gIGZ1bmN0aW9uKCkge1xuICAgIHZhciBfdm0gPSB0aGlzXG4gICAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gICAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gICAgcmV0dXJuIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwibGlzdC1ib2R5XCIgfSwgW1xuICAgICAgX2MoXG4gICAgICAgIFwiZGl2XCIsXG4gICAgICAgIHtcbiAgICAgICAgICBzdGF0aWNDbGFzczogXCJib2R5LWVsZW1cIixcbiAgICAgICAgICBhdHRyczogeyBpZDogXCJwcm9kdWN0c18yXCIsIFwiZGF0YS1pZFwiOiBcIjJcIiB9XG4gICAgICAgIH0sXG4gICAgICAgIFtcbiAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImxpc3QtYWN0aW9uc1wiIH0sIFtcbiAgICAgICAgICAgIF9jKFwiYnV0dG9uXCIsIHsgc3RhdGljQ2xhc3M6IFwiYnV0dG9uIGxpc3QtcmVtb3ZlXCIgfSwgW192bS5fdihcIuKcllwiKV0pXG4gICAgICAgICAgXSksXG4gICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICBfYyhcImlucHV0XCIsIHtcbiAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgIHR5cGU6IFwiaGlkZGVuXCIsXG4gICAgICAgICAgICAgIHZhbHVlOiBcIjEwMVwiLFxuICAgICAgICAgICAgICBuYW1lOiBcInByb2R1Y3RzWzJdW3Bpdm90X2lkXVwiXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSksXG4gICAgICAgICAgX2MoXCJpbnB1dFwiLCB7XG4gICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICB0eXBlOiBcImhpZGRlblwiLFxuICAgICAgICAgICAgICB2YWx1ZTogXCIxNjk1NFwiLFxuICAgICAgICAgICAgICBuYW1lOiBcInByb2R1Y3RzWzJdW3Byb2R1Y3RfaWRdXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KSxcbiAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgIF9jKFxuICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiY2VsbFwiLFxuICAgICAgICAgICAgICBzdGF0aWNTdHlsZTogeyBmbGV4OiBcIjEgMSAwJVwiLCBcIm1pbi13aWR0aFwiOiBcIjEwMHB4XCIgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJsaXN0LXRpdGxlIHRpdGxlLXRleHRcIiB9LCBbXG4gICAgICAgICAgICAgICAgX3ZtLl92KFwiYXdkYXdkXCIpXG4gICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICBdXG4gICAgICAgICAgKSxcbiAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgIF9jKFxuICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiY2VsbFwiLFxuICAgICAgICAgICAgICBzdGF0aWNTdHlsZTogeyB3aWR0aDogXCIxMDBweFwiLCBcIm1pbi13aWR0aFwiOiBcIjEwMHB4XCIgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJsaXN0LXRpdGxlIHRpdGxlLXRleHRcIiB9LCBbXG4gICAgICAgICAgICAgICAgX3ZtLl92KFwiMTQ1XCIpXG4gICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICBdXG4gICAgICAgICAgKSxcbiAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgIF9jKFxuICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiY2VsbFwiLFxuICAgICAgICAgICAgICBzdGF0aWNTdHlsZTogeyB3aWR0aDogXCI2NXB4XCIsIFwibWluLXdpZHRoXCI6IFwiNjVweFwiIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwibGlzdC10aXRsZSB0aXRsZS1jb3VudGVyXCIgfSwgW1xuICAgICAgICAgICAgICAgIF9jKFwiaW5wdXRcIiwge1xuICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJudW1iZXJcIixcbiAgICAgICAgICAgICAgICAgICAgbWluOiBcIjFcIixcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwcm9kdWN0c1syXVtjb3VudF1cIlxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICBdXG4gICAgICAgICAgKSxcbiAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgIF9jKFxuICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiY2VsbFwiLFxuICAgICAgICAgICAgICBzdGF0aWNTdHlsZTogeyB3aWR0aDogXCI4MHB4XCIsIFwibWluLXdpZHRoXCI6IFwiODBweFwiIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwibGlzdC10aXRsZSB0aXRsZS1wcmljZVwiIH0sIFtcbiAgICAgICAgICAgICAgICBfYyhcImlucHV0XCIsIHtcbiAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwibnVtYmVyXCIsXG4gICAgICAgICAgICAgICAgICAgIG1pbjogXCIxXCIsXG4gICAgICAgICAgICAgICAgICAgIHN0ZXA6IFwiMC4xXCIsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicHJvZHVjdHNbMl1bcHJpY2VdXCJcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgXVxuICAgICAgICAgICksXG4gICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICBfYyhcbiAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImNlbGxcIixcbiAgICAgICAgICAgICAgc3RhdGljU3R5bGU6IHsgd2lkdGg6IFwiNzBweFwiLCBcIm1pbi13aWR0aFwiOiBcIjcwcHhcIiB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImxpc3QtdGl0bGUgdGl0bGUtcGFzc2l2ZVwiIH0sIFtcbiAgICAgICAgICAgICAgICBfYyhcImlucHV0XCIsIHtcbiAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwibnVtYmVyXCIsXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInByb2R1Y3RzWzJdW25kc19wZXJjZW50XVwiXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgIF1cbiAgICAgICAgICApLFxuICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgX2MoXG4gICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJjZWxsXCIsXG4gICAgICAgICAgICAgIHN0YXRpY1N0eWxlOiB7IHdpZHRoOiBcIjcwcHhcIiwgXCJtaW4td2lkdGhcIjogXCI3MHB4XCIgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJsaXN0LXRpdGxlIHRpdGxlLXBhc3NpdmVcIiB9LCBbXG4gICAgICAgICAgICAgICAgX2MoXCJpbnB1dFwiLCB7XG4gICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIm51bWJlclwiLFxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwcm9kdWN0c1syXVtuZHNdXCJcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgXVxuICAgICAgICAgICksXG4gICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICBfYyhcbiAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImNlbGxcIixcbiAgICAgICAgICAgICAgc3RhdGljU3R5bGU6IHsgd2lkdGg6IFwiMTAwcHhcIiwgXCJtaW4td2lkdGhcIjogXCIxMDBweFwiIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwibGlzdC10aXRsZSB0aXRsZS1wYXNzaXZlXCIgfSwgW1xuICAgICAgICAgICAgICAgIF9jKFwiaW5wdXRcIiwge1xuICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJudW1iZXJcIixcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicHJvZHVjdHNbMl1bdG90YWxdXCJcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgXVxuICAgICAgICAgIClcbiAgICAgICAgXVxuICAgICAgKVxuICAgIF0pXG4gIH0sXG4gIGZ1bmN0aW9uKCkge1xuICAgIHZhciBfdm0gPSB0aGlzXG4gICAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gICAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gICAgcmV0dXJuIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwibGlzdC1ib3R0b21cIiB9LCBbXG4gICAgICBfYyhcbiAgICAgICAgXCJidXR0b25cIixcbiAgICAgICAge1xuICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImJ1dHRvbiBsaXN0LWFkZC1idXR0b25cIixcbiAgICAgICAgICBhdHRyczogeyB0eXBlOiBcImJ1dHRvblwiLCBuYW1lOiBcInByb2R1Y3RzXCIgfVxuICAgICAgICB9LFxuICAgICAgICBbX3ZtLl92KFwi0JTQvtCx0LDQstC40YLRjCDQv9C+0LfQuNGG0LjRjlwiKV1cbiAgICAgIClcbiAgICBdKVxuICB9XG5dXG5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcblxuZXhwb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXCJkaXZcIiwgW1xuICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwibW9kYWwtYm9keVwiIH0sIFtcbiAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiZC1mbGV4XCIgfSwgW1xuICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImxpbmstdGFicyBuby1wclwiIH0sIFtcbiAgICAgICAgICBfYyhcbiAgICAgICAgICAgIFwidWxcIixcbiAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwibmF2XCIgfSxcbiAgICAgICAgICAgIF92bS5fbChfdm0udGFicywgZnVuY3Rpb24odGFiKSB7XG4gICAgICAgICAgICAgIHJldHVybiBfYyhcbiAgICAgICAgICAgICAgICBcImxpXCIsXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAga2V5OiB0YWIuc2x1ZyxcbiAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcIm5hdi1pdGVtXCIsXG4gICAgICAgICAgICAgICAgICBjbGFzczogeyBhY3RpdmU6IHRhYi5zdGF0ZSB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgXCJhXCIsXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJuYXYtbGlua1wiLFxuICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IGhyZWY6IFwiamF2YXNjcmlwdDp2b2lkKDApXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3ZtLnNlbGVjdFRhYih0YWIpXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3ModGFiLm5hbWUpICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgIF92bS5fbSgwLCB0cnVlKVxuICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIDBcbiAgICAgICAgICApXG4gICAgICAgIF0pLFxuICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImRpYWxvZ190YWJfaG9sZGVyXCIgfSwgW1xuICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwidGFiLWNvbnRlbnQgbm8tcGxcIiB9LCBbXG4gICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJ0YWItcGFuZVwiLCBjbGFzczogeyBhY3RpdmU6IF92bS50YWJzWzBdLnN0YXRlIH0gfSxcbiAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIF9jKFwiRm9ybUlucHV0XCIsIHtcbiAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgIGlucHV0RGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwic2VsZWN0b3JcIixcbiAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCLQn9C+0YHRgtCw0LLRidC40LpcIixcbiAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInBhcnRuZXJfbmFtZVwiLFxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s6IFwic2VsZWN0UGFydG5lclwiXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgIF9jKFwiRm9ybUlucHV0XCIsIHtcbiAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgIGlucHV0RGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiaW5wdXRcIixcbiAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCLQodC60LvQsNC0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJzdG9yZS5uYW1lXCIsXG4gICAgICAgICAgICAgICAgICAgICAgb25DbGljazogXCJzZWxlY3RQYXJ0bmVyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWVcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgX2MoXCJGb3JtSW5wdXRcIiwge1xuICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgaW5wdXREYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJ0ZXh0YXJlYVwiLFxuICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcItCa0L7QvNC80LXQvdGC0LDRgNC40LlcIixcbiAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImVudGl0eS5jb21tZW50XCIsXG4gICAgICAgICAgICAgICAgICAgICAgb25DbGljazogXCJzZWxlY3RQYXJ0bmVyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiA3NVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJ0YWItcGFuZVwiLCBjbGFzczogeyBhY3RpdmU6IF92bS50YWJzWzFdLnN0YXRlIH0gfSxcbiAgICAgICAgICAgICAgW19jKFwiTGlzdFwiLCB7IGF0dHJzOiB7IGRhdGE6IF92bS5saXN0X2RhdGEgfSB9KV0sXG4gICAgICAgICAgICAgIDFcbiAgICAgICAgICAgIClcbiAgICAgICAgICBdKVxuICAgICAgICBdKVxuICAgICAgXSlcbiAgICBdKSxcbiAgICBfdm0uX3YoXCIgXCIpLFxuICAgIF92bS5fbSgxKSxcbiAgICBfdm0uX3YoXCIgXCIpLFxuICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwic3lzdGVtX21lc3NhZ2VcIiB9KVxuICBdKVxufVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtcbiAgZnVuY3Rpb24oKSB7XG4gICAgdmFyIF92bSA9IHRoaXNcbiAgICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgICByZXR1cm4gX2MoXCJzcGFuXCIsIHsgc3RhdGljQ2xhc3M6IFwiZmxvYXQtcmlnaHQgaGVscGVyX2RhbmdlciBkLW5vbmUtZlwiIH0sIFtcbiAgICAgIF9jKFwiaVwiLCB7XG4gICAgICAgIHN0YXRpY0NsYXNzOiBcImZhIGZhLWV4Y2xhbWF0aW9uLXRyaWFuZ2xlIHRleHQtbWQgbWwtMiB0ZXh0LWRhbmdlclwiXG4gICAgICB9KVxuICAgIF0pXG4gIH0sXG4gIGZ1bmN0aW9uKCkge1xuICAgIHZhciBfdm0gPSB0aGlzXG4gICAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gICAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gICAgcmV0dXJuIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwibW9kYWwtZm9vdGVyXCIgfSwgW1xuICAgICAgX2MoXCJidXR0b25cIiwgeyBzdGF0aWNDbGFzczogXCJidXR0b24gd2hpdGUgdXBwZXJjYXNlLWJ0blwiIH0sIFtcbiAgICAgICAgX3ZtLl92KFwi0JfQsNC60YDRi9GC0YxcIilcbiAgICAgIF0pLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF9jKFxuICAgICAgICBcImJ1dHRvblwiLFxuICAgICAgICB7XG4gICAgICAgICAgc3RhdGljQ2xhc3M6IFwiYnV0dG9uIHByaW1hcnkgcHVsbC1yaWdodCB1cHBlcmNhc2UtYnRuXCIsXG4gICAgICAgICAgYXR0cnM6IHsgdHlwZTogXCJidXR0b25cIiB9XG4gICAgICAgIH0sXG4gICAgICAgIFtfdm0uX3YoXCLQodC+0YXRgNCw0L3QuNGC0Ywg0Lgg0LfQsNC60YDRi9GC0YxcIildXG4gICAgICApLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF9jKFxuICAgICAgICBcImJ1dHRvblwiLFxuICAgICAgICB7XG4gICAgICAgICAgc3RhdGljQ2xhc3M6IFwiYnV0dG9uIHByaW1hcnkgcHVsbC1yaWdodCBtci0xNSB1cHBlcmNhc2UtYnRuXCIsXG4gICAgICAgICAgYXR0cnM6IHsgdHlwZTogXCJidXR0b25cIiB9XG4gICAgICAgIH0sXG4gICAgICAgIFtfdm0uX3YoXCLQodC+0YXRgNCw0L3QuNGC0YxcIildXG4gICAgICApXG4gICAgXSlcbiAgfVxuXVxucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5cbmV4cG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0iLCJsZXQgY2F0ZWdvcnlNaXhpbiA9IHtcbiAgICBtZXRob2RzOiB7XG4gICAgICAgIHNldENhdGVnb3J5KGNhdGVnb3J5KXtcbiAgICAgICAgICAgIHRoaXMuZW50aXR5LmNhdGVnb3J5LmlkID0gY2F0ZWdvcnkuaWQ7XG4gICAgICAgICAgICB0aGlzLmVudGl0eS5jYXRlZ29yeS5uYW1lID0gY2F0ZWdvcnkubmFtZTtcbiAgICAgICAgICAgIHRoaXMuJG5vdGlmeSh7XG4gICAgICAgICAgICAgICAgZ3JvdXA6ICdtYWluJyxcbiAgICAgICAgICAgICAgICB0eXBlOiAnc3VjY2VzcycsXG4gICAgICAgICAgICAgICAgdGV4dDogJ9Ca0LDRgtC10LPQvtGA0LjRjyDQstGL0LHRgNCw0L3QsCdcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBzZWxlY3RDYXRlZ29yeSgpe1xuICAgICAgICAgICAgdGhpcy4kZXZlbnRCdXMuJGVtaXQoJ29wZW5EaWFsb2cnLCB7XG4gICAgICAgICAgICAgICAgdGFnOiAnc2VsZWN0Q2F0ZWdvcnknLFxuICAgICAgICAgICAgICAgIHBhcmFtczoge3Jvb3RfY2F0ZWdvcnk6dGhpcy5yb290X2NhdGVnb3J5LCByZWY6IHRoaXN9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0UGFyZW50Q2F0ZWdvcnkoKXtcbiAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IHRydWU7XG4gICAgICAgICAgICB3aW5kb3cuYXhpb3Moe1xuICAgICAgICAgICAgICAgIG1ldGhvZDogJ2dldCcsXG4gICAgICAgICAgICAgICAgdXJsOiAnL2NhdGVnb3JpZXMvJyArIHRoaXMuZW50aXR5LmNhdGVnb3J5LmlkLFxuICAgICAgICAgICAgfSkudGhlbigocmVzcCkgPT4gIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVudGl0eS5jYXRlZ29yeS5pZCA9IHJlc3AuZGF0YS5pZDtcbiAgICAgICAgICAgICAgICB0aGlzLmVudGl0eS5jYXRlZ29yeS5uYW1lID0gcmVzcC5kYXRhLm5hbWU7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICB9XG59O1xuZXhwb3J0IGRlZmF1bHQgY2F0ZWdvcnlNaXhpbjtcbiIsImxldCBwYXJ0bmVyTWl4aW4gPSB7XG4gICAgY29tcHV0ZWQ6e1xuICAgICAgICBwYXJ0bmVyX25hbWUoKXtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmVudGl0eS5wYXJ0bmVyLnR5cGUgPT09IDIgPyB0aGlzLmVudGl0eS5wYXJ0bmVyLmNvbXBhbnlOYW1lIDogdGhpcy5lbnRpdHkucGFydG5lci5maW87XG4gICAgICAgIH1cbiAgICB9LFxuICAgIG1ldGhvZHM6IHtcbiAgICAgICAgc2V0Q2F0ZWdvcnkoY2F0ZWdvcnkpe1xuICAgICAgICAgICAgdGhpcy5lbnRpdHkuY2F0ZWdvcnkuaWQgPSBjYXRlZ29yeS5pZDtcbiAgICAgICAgICAgIHRoaXMuZW50aXR5LmNhdGVnb3J5Lm5hbWUgPSBjYXRlZ29yeS5uYW1lO1xuICAgICAgICAgICAgdGhpcy4kbm90aWZ5KHtcbiAgICAgICAgICAgICAgICBncm91cDogJ21haW4nLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdzdWNjZXNzJyxcbiAgICAgICAgICAgICAgICB0ZXh0OiAn0JrQsNGC0LXQs9C+0YDQuNGPINCy0YvQsdGA0LDQvdCwJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIHNlbGVjdENhdGVnb3J5KCl7XG4gICAgICAgICAgICB0aGlzLiRldmVudEJ1cy4kZW1pdCgnb3BlbkRpYWxvZycsIHtcbiAgICAgICAgICAgICAgICB0YWc6ICdzZWxlY3RDYXRlZ29yeScsXG4gICAgICAgICAgICAgICAgcGFyYW1zOiB7cm9vdF9jYXRlZ29yeTp0aGlzLnJvb3RfY2F0ZWdvcnksIHJlZjogdGhpc31cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBnZXRQYXJlbnRDYXRlZ29yeSgpe1xuICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIHdpbmRvdy5heGlvcyh7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnZ2V0JyxcbiAgICAgICAgICAgICAgICB1cmw6ICcvY2F0ZWdvcmllcy8nICsgdGhpcy5lbnRpdHkuY2F0ZWdvcnkuaWQsXG4gICAgICAgICAgICB9KS50aGVuKChyZXNwKSA9PiAge1xuICAgICAgICAgICAgICAgIHRoaXMuZW50aXR5LmNhdGVnb3J5LmlkID0gcmVzcC5kYXRhLmlkO1xuICAgICAgICAgICAgICAgIHRoaXMuZW50aXR5LmNhdGVnb3J5Lm5hbWUgPSByZXNwLmRhdGEubmFtZTtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgIH1cbn07XG5leHBvcnQgZGVmYXVsdCBwYXJ0bmVyTWl4aW47XG4iLCJsZXQgc3RvcmVNaXhpbiA9IHtcblxuICAgIGRhdGE6ICgpPT4ge1xuICAgICAgICByZXR1cm57XG4gICAgICAgICAgICBlbnRpdHk6e1xuICAgICAgICAgICAgICAgIHN0b3JlX2lkOm51bGxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG4gICAgY29tcHV0ZWQ6e1xuICAgICAgICBzdG9yZSgpe1xuICAgICAgICAgICAgbGV0IHN0b3JlcyA9IHRoaXMuZ2V0RnJvbUxvY2FsU3RvcmFnZSgnc3RvcmVzJyk7XG4gICAgICAgICAgICB0aGlzLmVudGl0eS5zdG9yZV9pZCA9IHN0b3Jlc1swXS5pZDtcbiAgICAgICAgICAgIHJldHVybiBzdG9yZXNbMF07XG4gICAgICAgIH1cbiAgICB9LFxuICAgIG1ldGhvZHM6IHtcbiAgICB9XG59O1xuZXhwb3J0IGRlZmF1bHQgc3RvcmVNaXhpbjtcbiIsImxldCBzdXBwbGllck1peGluID0ge1xuICAgIG1ldGhvZHM6IHtcbiAgICAgICAgc2V0U3VwcGxpZXIoc3VwcGxpZXIpe1xuICAgICAgICAgICAgdGhpcy5lbnRpdHkuc3VwcGxpZXIuaWQgPSBzdXBwbGllci5pZDtcbiAgICAgICAgICAgIHRoaXMuZW50aXR5LnN1cHBsaWVyLm5hbWUgPSBzdXBwbGllci5uYW1lO1xuICAgICAgICAgICAgdGhpcy4kbm90aWZ5KHtcbiAgICAgICAgICAgICAgICBncm91cDogJ21haW4nLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdzdWNjZXNzJyxcbiAgICAgICAgICAgICAgICB0ZXh0OiAn0J/RgNC+0LjQt9Cy0L7QtNC40YLQtdC70Ywg0LLRi9Cx0YDQsNC9J1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIHNlbGVjdFN1cHBsaWVyKCl7XG4gICAgICAgICAgICB0aGlzLiRldmVudEJ1cy4kZW1pdCgnb3BlbkRpYWxvZycsIHtcbiAgICAgICAgICAgICAgICB0YWc6ICdzZWxlY3RTdXBwbGllcicsXG4gICAgICAgICAgICAgICAgcGFyYW1zOiB7cmVmOiB0aGlzfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgfVxufTtcbmV4cG9ydCBkZWZhdWx0IHN1cHBsaWVyTWl4aW47XG4iLCJpbXBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IGZyb20gXCIuL0xpc3QudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPWQ3YTFjOGJhJnNjb3BlZD10cnVlJlwiXG5pbXBvcnQgc2NyaXB0IGZyb20gXCIuL0xpc3QudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5leHBvcnQgKiBmcm9tIFwiLi9MaXN0LnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuXG5cbi8qIG5vcm1hbGl6ZSBjb21wb25lbnQgKi9cbmltcG9ydCBub3JtYWxpemVyIGZyb20gXCIhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3J1bnRpbWUvY29tcG9uZW50Tm9ybWFsaXplci5qc1wiXG52YXIgY29tcG9uZW50ID0gbm9ybWFsaXplcihcbiAgc2NyaXB0LFxuICByZW5kZXIsXG4gIHN0YXRpY1JlbmRlckZucyxcbiAgZmFsc2UsXG4gIG51bGwsXG4gIFwiZDdhMWM4YmFcIixcbiAgbnVsbFxuICBcbilcblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHtcbiAgdmFyIGFwaSA9IHJlcXVpcmUoXCJDOlxcXFxPcGVuU2VydmVyXFxcXGRvbWFpbnNcXFxcQXV0b0NSTVxcXFxub2RlX21vZHVsZXNcXFxcdnVlLWhvdC1yZWxvYWQtYXBpXFxcXGRpc3RcXFxcaW5kZXguanNcIilcbiAgYXBpLmluc3RhbGwocmVxdWlyZSgndnVlJykpXG4gIGlmIChhcGkuY29tcGF0aWJsZSkge1xuICAgIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgICBpZiAoIWFwaS5pc1JlY29yZGVkKCdkN2ExYzhiYScpKSB7XG4gICAgICBhcGkuY3JlYXRlUmVjb3JkKCdkN2ExYzhiYScsIGNvbXBvbmVudC5vcHRpb25zKVxuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVsb2FkKCdkN2ExYzhiYScsIGNvbXBvbmVudC5vcHRpb25zKVxuICAgIH1cbiAgICBtb2R1bGUuaG90LmFjY2VwdChcIi4vTGlzdC52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9ZDdhMWM4YmEmc2NvcGVkPXRydWUmXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGFwaS5yZXJlbmRlcignZDdhMWM4YmEnLCB7XG4gICAgICAgIHJlbmRlcjogcmVuZGVyLFxuICAgICAgICBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZuc1xuICAgICAgfSlcbiAgICB9KVxuICB9XG59XG5jb21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcInJlc291cmNlcy9qcy9jb21wb25lbnRzL3NlcnZpY2UvTGlzdC52dWVcIlxuZXhwb3J0IGRlZmF1bHQgY29tcG9uZW50LmV4cG9ydHMiLCJpbXBvcnQgbW9kIGZyb20gXCItIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTQtMCEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0xpc3QudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiOyBleHBvcnQgZGVmYXVsdCBtb2Q7IGV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTQtMCEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0xpc3QudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiIiwiZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvdGVtcGxhdGVMb2FkZXIuanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0xpc3QudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPWQ3YTFjOGJhJnNjb3BlZD10cnVlJlwiIiwiaW1wb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSBmcm9tIFwiLi9Qcm92aWRlck9yZGVyRGlhbG9nLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD0xZDYzMWZkMiZcIlxuaW1wb3J0IHNjcmlwdCBmcm9tIFwiLi9Qcm92aWRlck9yZGVyRGlhbG9nLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuZXhwb3J0ICogZnJvbSBcIi4vUHJvdmlkZXJPcmRlckRpYWxvZy52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcblxuXG4vKiBub3JtYWxpemUgY29tcG9uZW50ICovXG5pbXBvcnQgbm9ybWFsaXplciBmcm9tIFwiIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9ydW50aW1lL2NvbXBvbmVudE5vcm1hbGl6ZXIuanNcIlxudmFyIGNvbXBvbmVudCA9IG5vcm1hbGl6ZXIoXG4gIHNjcmlwdCxcbiAgcmVuZGVyLFxuICBzdGF0aWNSZW5kZXJGbnMsXG4gIGZhbHNlLFxuICBudWxsLFxuICBudWxsLFxuICBudWxsXG4gIFxuKVxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkge1xuICB2YXIgYXBpID0gcmVxdWlyZShcIkM6XFxcXE9wZW5TZXJ2ZXJcXFxcZG9tYWluc1xcXFxBdXRvQ1JNXFxcXG5vZGVfbW9kdWxlc1xcXFx2dWUtaG90LXJlbG9hZC1hcGlcXFxcZGlzdFxcXFxpbmRleC5qc1wiKVxuICBhcGkuaW5zdGFsbChyZXF1aXJlKCd2dWUnKSlcbiAgaWYgKGFwaS5jb21wYXRpYmxlKSB7XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICAgIGlmICghYXBpLmlzUmVjb3JkZWQoJzFkNjMxZmQyJykpIHtcbiAgICAgIGFwaS5jcmVhdGVSZWNvcmQoJzFkNjMxZmQyJywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZWxvYWQoJzFkNjMxZmQyJywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfVxuICAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiLi9Qcm92aWRlck9yZGVyRGlhbG9nLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD0xZDYzMWZkMiZcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgYXBpLnJlcmVuZGVyKCcxZDYzMWZkMicsIHtcbiAgICAgICAgcmVuZGVyOiByZW5kZXIsXG4gICAgICAgIHN0YXRpY1JlbmRlckZuczogc3RhdGljUmVuZGVyRm5zXG4gICAgICB9KVxuICAgIH0pXG4gIH1cbn1cbmNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwicmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvdGVtcGxhdGUvRGlhbG9ncy9Qcm92aWRlck9yZGVyRGlhbG9nLnZ1ZVwiXG5leHBvcnQgZGVmYXVsdCBjb21wb25lbnQuZXhwb3J0cyIsImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tNC0wIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vUHJvdmlkZXJPcmRlckRpYWxvZy52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tNC0wIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vUHJvdmlkZXJPcmRlckRpYWxvZy52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCIiLCJleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy90ZW1wbGF0ZUxvYWRlci5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vUHJvdmlkZXJPcmRlckRpYWxvZy52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9MWQ2MzFmZDImXCIiXSwic291cmNlUm9vdCI6IiJ9