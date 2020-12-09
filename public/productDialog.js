(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["productDialog"],{

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

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/template/Dialogs/ProductDialog.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/template/Dialogs/ProductDialog.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************************/
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  name: "ProductDialog",
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
      root_category: 2,
      entity: {
        name: null,
        article: null,
        category_id: 2,
        category: null,
        supplier_id: null,
        supplier: 'Не выбран',
        shop: {
          settings: {
            sp_main: false,
            sp_stock: false
          }
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
    !_vm.$parent.loading && _vm.isInput
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
          _c("input", {
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
    !_vm.$parent.loading && _vm.isCheckbox
      ? _c("div", { staticClass: "relative" }, [
          _c(
            "label",
            { staticClass: "w-100", attrs: { for: _vm.inputData.name } },
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/template/Dialogs/ProductDialog.vue?vue&type=template&id=19095229&":
/*!*********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/template/Dialogs/ProductDialog.vue?vue&type=template&id=19095229& ***!
  \*********************************************************************************************************************************************************************************************************************************/
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
                          "\n                                    " +
                            _vm._s(tab.name) +
                            "\n                                    "
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
                {
                  staticClass: "tab-pane p-3",
                  class: { active: _vm.tabs[0].state }
                },
                [
                  _c("FormInput", {
                    attrs: {
                      inputData: {
                        type: "input",
                        label: "Артикул",
                        name: "entity.article",
                        placeholder: "Артикул детали (не более 64 символов)"
                      }
                    }
                  }),
                  _vm._v(" "),
                  _c("FormInput", {
                    attrs: {
                      inputData: {
                        type: "input",
                        label: "Наименование",
                        name: "entity.name",
                        placeholder: "Наименование (не более 255 символов)"
                      }
                    }
                  }),
                  _vm._v(" "),
                  _c("FormInput", {
                    attrs: {
                      inputData: {
                        type: "selector",
                        label: "В категории",
                        name: "entity.category",
                        onClick: "selectCategory"
                      }
                    }
                  }),
                  _vm._v(" "),
                  _c("FormInput", {
                    attrs: {
                      inputData: {
                        type: "selector",
                        label: "Производитель",
                        name: "entity.supplier",
                        onClick: "selectSupplier"
                      }
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "div",
                {
                  staticClass: "tab-pane",
                  class: { active: _vm.tabs[1].state }
                },
                [_vm._m(1), _vm._v(" "), _vm._m(2)]
              ),
              _vm._v(" "),
              _c(
                "div",
                {
                  staticClass: "tab-pane p-3",
                  class: { active: _vm.tabs[2].state }
                },
                [
                  _vm.shop_activated
                    ? _c(
                        "div",
                        {
                          staticStyle: { height: "310px" },
                          attrs: { id: "tab_main", "data-simplebar": "" }
                        },
                        [
                          _c("FormInput", {
                            attrs: {
                              inputData: {
                                type: "checkbox",
                                label: "Показать на главной странице",
                                name: "entity.shop.settings.sp_main"
                              }
                            }
                          }),
                          _vm._v(" "),
                          _c("FormInput", {
                            attrs: {
                              inputData: {
                                type: "checkbox",
                                label: "Акционный товар",
                                name: "entity.shop.settings.sp_stock"
                              }
                            }
                          }),
                          _vm._v(" "),
                          _c("div", [
                            _vm._v(
                              "\n                                        awd" +
                                _vm._s(_vm.entity.shop.settings) +
                                "\n                                    "
                            )
                          ])
                        ],
                        1
                      )
                    : _vm._e(),
                  _vm._v(" "),
                  !_vm.shop_activated
                    ? _c("div", [
                        _vm._v("Активируйте интернет-магазин в "),
                        _c(
                          "a",
                          { staticClass: "ajax-nav", attrs: { href: "#" } },
                          [_vm._v("настройках")]
                        ),
                        _vm._v(".")
                      ])
                    : _vm._e(),
                  _vm._v(" "),
                  !_vm.shop_activated
                    ? _c("div", [_vm._v("Это бесплатно.")])
                    : _vm._e()
                ]
              ),
              _vm._v(" "),
              _c(
                "div",
                {
                  staticClass: "tab-pane p-3",
                  class: { active: _vm.tabs[3].state }
                },
                [
                  _c("FormInput", {
                    attrs: {
                      inputData: {
                        type: "input",
                        label: "Штрих-код производителя (EAN 13)",
                        name: "barcode",
                        messages: _vm.messages,
                        placeholder: "Штрихкод"
                      }
                    }
                  }),
                  _vm._v(" "),
                  _c("FormInput", {
                    attrs: {
                      inputData: {
                        type: "input",
                        label: "Внутренний штрих-код (EAN 13)",
                        name: "barcode_local",
                        messages: _vm.messages,
                        placeholder: "Штрихкод склада"
                      }
                    }
                  })
                ],
                1
              )
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
            attrs: { type: "submit" },
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
            attrs: { type: "submit" },
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
    return _c("table", { staticClass: "table w-100" }, [
      _c("thead", [
        _c("tr", [
          _c("th", [_vm._v("Склад")]),
          _vm._v(" "),
          _c("th", [_vm._v("Количество")]),
          _vm._v(" "),
          _c("th", [_vm._v("Хранение")])
        ])
      ]),
      _vm._v(" "),
      _c("tbody", [
        _c("tr", [
          _c("td", [
            _vm._v(
              "\n                                            Магазин\n                                        "
            )
          ]),
          _vm._v(" "),
          _c("td", [
            _vm._v(
              "\n                                            0\n                                        "
            )
          ]),
          _vm._v(" "),
          _c("td", [
            _c("div", { staticClass: "storage_store_container" }, [
              _c("input", {
                staticClass: "storage_store bb_1",
                attrs: { value: " ", type: "text" }
              }),
              _vm._v(" "),
              _c("input", {
                staticClass: "storage_store bb_2",
                attrs: { value: " ", type: "text" }
              }),
              _vm._v(" "),
              _c("input", {
                staticClass: "storage_store bb_3",
                attrs: { value: " ", type: "text" }
              }),
              _vm._v(" "),
              _c("input", {
                staticClass: "storage_store bb_4",
                attrs: { value: " ", type: "text" }
              })
            ])
          ])
        ])
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "box mt-10" }, [
      _c("div", { staticClass: "bb_faq faq_1" }, [_vm._v("Зона хранения")]),
      _vm._v(" "),
      _c("div", { staticClass: "bb_faq faq_2" }, [_vm._v("Номер стеллажа")]),
      _vm._v(" "),
      _c("div", { staticClass: "bb_faq faq_3" }, [
        _vm._v("Номер вертикальной секции стеллажа")
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "bb_faq faq_4" }, [_vm._v("Номер полки")])
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
      this.entity.category_id = category.id;
      this.entity.category = category.name;
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
        url: '/categories/' + this.entity.category_id
      }).then(function (resp) {
        _this.entity.category_id = resp.data.id;
        _this.entity.category = resp.data.name;
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
      this.entity.supplier_id = supplier.id;
      this.entity.supplier = supplier.name;
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



/***/ }),

/***/ "./resources/js/components/template/Dialogs/ProductDialog.vue":
/*!********************************************************************!*\
  !*** ./resources/js/components/template/Dialogs/ProductDialog.vue ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ProductDialog_vue_vue_type_template_id_19095229___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ProductDialog.vue?vue&type=template&id=19095229& */ "./resources/js/components/template/Dialogs/ProductDialog.vue?vue&type=template&id=19095229&");
/* harmony import */ var _ProductDialog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ProductDialog.vue?vue&type=script&lang=js& */ "./resources/js/components/template/Dialogs/ProductDialog.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ProductDialog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ProductDialog_vue_vue_type_template_id_19095229___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ProductDialog_vue_vue_type_template_id_19095229___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/template/Dialogs/ProductDialog.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/template/Dialogs/ProductDialog.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************!*\
  !*** ./resources/js/components/template/Dialogs/ProductDialog.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ProductDialog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./ProductDialog.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/template/Dialogs/ProductDialog.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ProductDialog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/template/Dialogs/ProductDialog.vue?vue&type=template&id=19095229&":
/*!***************************************************************************************************!*\
  !*** ./resources/js/components/template/Dialogs/ProductDialog.vue?vue&type=template&id=19095229& ***!
  \***************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ProductDialog_vue_vue_type_template_id_19095229___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./ProductDialog.vue?vue&type=template&id=19095229& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/template/Dialogs/ProductDialog.vue?vue&type=template&id=19095229&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ProductDialog_vue_vue_type_template_id_19095229___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ProductDialog_vue_vue_type_template_id_19095229___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvc2VydmljZS9Gb3JtSW5wdXQudnVlIiwid2VicGFjazovLy9yZXNvdXJjZXMvanMvY29tcG9uZW50cy90ZW1wbGF0ZS9EaWFsb2dzL1Byb2R1Y3REaWFsb2cudnVlIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9qcy9jb21wb25lbnRzL3NlcnZpY2UvRm9ybUlucHV0LnZ1ZT9jZTk1Iiwid2VicGFjazovLy8uL3Jlc291cmNlcy9qcy9jb21wb25lbnRzL3RlbXBsYXRlL0RpYWxvZ3MvUHJvZHVjdERpYWxvZy52dWU/NWRhYyIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvY29tcG9uZW50cy9taXhpbnMvY2F0ZWdvcnlNaXhpbi5qcyIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvY29tcG9uZW50cy9taXhpbnMvc3VwcGxpZXJNaXhpbi5qcyIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvY29tcG9uZW50cy9zZXJ2aWNlL0Zvcm1JbnB1dC52dWUiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvc2VydmljZS9Gb3JtSW5wdXQudnVlPzAxZDYiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvc2VydmljZS9Gb3JtSW5wdXQudnVlPzFiYTciLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvdGVtcGxhdGUvRGlhbG9ncy9Qcm9kdWN0RGlhbG9nLnZ1ZSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvY29tcG9uZW50cy90ZW1wbGF0ZS9EaWFsb2dzL1Byb2R1Y3REaWFsb2cudnVlP2E0N2QiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvdGVtcGxhdGUvRGlhbG9ncy9Qcm9kdWN0RGlhbG9nLnZ1ZT9iM2IxIl0sIm5hbWVzIjpbImNhdGVnb3J5TWl4aW4iLCJtZXRob2RzIiwic2V0Q2F0ZWdvcnkiLCJjYXRlZ29yeSIsImVudGl0eSIsImNhdGVnb3J5X2lkIiwiaWQiLCJuYW1lIiwiJG5vdGlmeSIsImdyb3VwIiwidHlwZSIsInRleHQiLCJzZWxlY3RDYXRlZ29yeSIsIiRldmVudEJ1cyIsIiRlbWl0IiwidGFnIiwicGFyYW1zIiwicm9vdF9jYXRlZ29yeSIsInJlZiIsImdldFBhcmVudENhdGVnb3J5IiwibG9hZGluZyIsIndpbmRvdyIsImF4aW9zIiwibWV0aG9kIiwidXJsIiwidGhlbiIsInJlc3AiLCJkYXRhIiwic3VwcGxpZXJNaXhpbiIsInNldFN1cHBsaWVyIiwic3VwcGxpZXIiLCJzdXBwbGllcl9pZCIsInNlbGVjdFN1cHBsaWVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFrREE7QUFDQSxzQkFEQTtBQUVBLG1CQUZBO0FBR0E7QUFDQTtBQUNBO0FBREE7QUFHQSxHQVBBO0FBUUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0EsU0FMQTtBQU1BO0FBQ0EsT0FYQTtBQVlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBRkEsTUFFQTtBQUNBO0FBQ0E7QUFDQSxTQU5BO0FBT0E7QUF0QkEsS0FEQTtBQXlCQSxZQXpCQSxzQkF5QkE7QUFDQTtBQUNBLEtBM0JBO0FBNEJBLFdBNUJBLHFCQTRCQTtBQUNBO0FBQ0EsS0E5QkE7QUErQkEsY0EvQkEsd0JBK0JBO0FBQ0E7QUFDQSxLQWpDQTtBQWtDQSxjQWxDQSx3QkFrQ0E7QUFDQTtBQUNBO0FBcENBLEdBUkE7QUE4Q0EsU0E5Q0EscUJBOENBO0FBQUE7O0FBQ0E7QUFDQTtBQUNBLEtBRkEsRUFFQTtBQUNBO0FBREEsS0FGQTtBQUtBLEdBcERBO0FBcURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBYkEsR0FyREE7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QVU7QUFDMUIsRUFBRSwrRUFBTTtBQUNSLEVBQUUsZ0dBQU07QUFDUixFQUFFLHlHQUFlO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsSUFBSSxLQUFVLEVBQUUsWUFpQmY7QUFDRDtBQUNlLGdGOzs7Ozs7Ozs7Ozs7QUN0Q2Y7QUFBQTtBQUFBLHdDQUErTCxDQUFnQixxUEFBRyxFQUFDLEM7Ozs7Ozs7Ozs7OztBQ0FuTjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7Ozs7Ozs7Ozs7Ozs7QUNBQTtBQUFBO0FBQUE7QUFBQTtBQUE0RjtBQUMzQjtBQUNMOzs7QUFHNUQ7QUFDbUc7QUFDbkcsZ0JBQWdCLDJHQUFVO0FBQzFCLEVBQUUsbUZBQU07QUFDUixFQUFFLHdGQUFNO0FBQ1IsRUFBRSxpR0FBZTtBQUNqQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLElBQUksS0FBVSxFQUFFLFlBaUJmO0FBQ0Q7QUFDZSxnRjs7Ozs7Ozs7Ozs7O0FDdENmO0FBQUE7QUFBQSx3Q0FBeU0sQ0FBZ0IseVBBQUcsRUFBQyxDOzs7Ozs7Ozs7Ozs7QUNBN047QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBIiwiZmlsZSI6InByb2R1Y3REaWFsb2cuanMiLCJzb3VyY2VzQ29udGVudCI6WyI8dGVtcGxhdGU+XG4gICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj5cbiAgICAgICAgPGRpdiB2LWlmPVwiISRwYXJlbnQubG9hZGluZyAmJiBpc0lucHV0XCI+XG4gICAgICAgICAgICA8bGFiZWw+e3sgaW5wdXREYXRhLmxhYmVsIH19PC9sYWJlbD5cbiAgICAgICAgICAgIDxkaXYgdi1pZj1cIiRwYXJlbnQubG9hZGluZ1wiIGNsYXNzPVwibGlzdC1wbGFjZWhvbGRlclwiIHN0eWxlPVwiaGVpZ2h0OiAzMHB4O1wiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJsaXN0LXBsYWNlaG9sZGVyX2l0ZW1cIiBzdHlsZT1cImhlaWdodDogMzBweDtcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImxpc3QtcGxhY2Vob2xkZXJfY2VsbCB3LTEwMFwiIHN0eWxlPVwid2lkdGg6IDEwMCVcIiA+PC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxpbnB1dCAgQGtleXByZXNzLmVudGVyPVwiJHBhcmVudC5zYXZlKClcIlxuICAgICAgICAgICAgICAgICAgICB2LWJpbmQ6Y2xhc3M9XCJ7J2lzLWludmFsaWQnOmVycm9yTXNnfVwiXG4gICAgICAgICAgICAgICAgICAgIHYtdG9vbHRpcD1cIntcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IGVycm9yTXNnLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2VtZW50OiAnbGVmdCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc2VzOiBbJ2Vycm9yJ10sXG4gICAgICAgICAgICAgICAgICAgIH1cIlxuICAgICAgICAgICAgICAgICAgICB2LW1vZGVsPVwicGFyZW50TW9kZWxcIlxuICAgICAgICAgICAgICAgICAgICB2LWJpbmQ6cGxhY2Vob2xkZXI9XCJpbnB1dERhdGEucGxhY2Vob2xkZXJcIlxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCI+XG4gICAgICAgIDwvZGl2PlxuXG5cbiAgICAgICAgPGRpdiB2LWlmPVwiISRwYXJlbnQubG9hZGluZyAmJiBpc1NlbGVjdG9yXCIgPlxuICAgICAgICAgICAgPGxhYmVsPnt7IGlucHV0RGF0YS5sYWJlbCB9fTwvbGFiZWw+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXBcIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIHYtYmluZDpjbGFzcz1cInsnaXMtaW52YWxpZCc6ZXJyb3JNc2d9XCJcbiAgICAgICAgICAgICAgICAgICAgdi10b29sdGlwPVwie1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogZXJyb3JNc2csXG4gICAgICAgICAgICAgICAgICAgICAgICBwbGFjZW1lbnQ6ICdsZWZ0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzZXM6IFsnZXJyb3InXSxcbiAgICAgICAgICAgICAgICAgICAgfVwiXG4gICAgICAgICAgICAgICAgICAgIHYtb246Y2xpY2s9XCIkcGFyZW50W2lucHV0RGF0YS5vbkNsaWNrXSgpXCJcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzPVwiY2F0ZWdvcnlfc2VsZWN0IGZvcm0tY29udHJvbCB0ZXh0LWxlZnQgYnV0dG9uX3NlbGVjdFwiPnt7IHBhcmVudE1vZGVsIH19PC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cblxuICAgICAgICA8ZGl2IHYtaWY9XCIhJHBhcmVudC5sb2FkaW5nICYmIGlzQ2hlY2tib3hcIiBjbGFzcz1cInJlbGF0aXZlXCI+XG4gICAgICAgICAgICA8bGFiZWwgdi1iaW5kOmZvcj1cImlucHV0RGF0YS5uYW1lXCIgY2xhc3M9XCJ3LTEwMFwiPnt7IGlucHV0RGF0YS5sYWJlbCB9fTwvbGFiZWw+XG4gICAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJhYnNvbHV0ZSBjdXN0b21fY2hlY2tib3hcIiBzdHlsZT1cInJpZ2h0OiAwOyB0b3A6IDNweDtcIj5cbiAgICAgICAgICAgICAgICA8aW5wdXQgdi1iaW5kOmlkPVwiaW5wdXREYXRhLm5hbWVcIiB2LW1vZGVsPVwicGFyZW50TW9kZWxcIiB2LWJpbmQ6bmFtZT1cImlucHV0RGF0YS5uYW1lXCIgdHlwZT1cImNoZWNrYm94XCIgY2xhc3M9XCJub3RfZGVmYXVsdFwiLz5cbiAgICAgICAgICAgICAgICA8c3Bhbj48L3NwYW4+XG4gICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG4gICAgZXhwb3J0IGRlZmF1bHQge1xuICAgICAgICBwcm9wczpbJ2lucHV0RGF0YSddLFxuICAgICAgICBuYW1lOiBcIkZvcm1JbnB1dFwiLFxuICAgICAgICBkYXRhOiAoKT0+IHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgZXJyb3I6bnVsbCxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgY29tcHV0ZWQ6e1xuICAgICAgICAgICAgcGFyZW50TW9kZWw6e1xuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgbmFtZV9hcnIgPSB0aGlzLmlucHV0RGF0YS5uYW1lLnNwbGl0KCcuJyk7XG4gICAgICAgICAgICAgICAgICAgIGxldCB0YXJnZXQgPSB0aGlzLiRwYXJlbnQ7XG4gICAgICAgICAgICAgICAgICAgIG5hbWVfYXJyLmZvckVhY2goKGl0ZW0sIGluZGV4KT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoIXRhcmdldFtpdGVtXSAmJiBuYW1lX2FycltpbmRleCArIDFdKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRbaXRlbV0gPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldCA9IHRhcmdldFtpdGVtXTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0YXJnZXQ7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5hbWVfYXJyID0gdGhpcy5pbnB1dERhdGEubmFtZS5zcGxpdCgnLicpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgdGFyZ2V0ID0gdGhpcy4kcGFyZW50O1xuICAgICAgICAgICAgICAgICAgICBuYW1lX2Fyci5mb3JFYWNoKChpdGVtLCBpbmRleCk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKG5hbWVfYXJyW2luZGV4ICsgMV0pe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldCA9IHRhcmdldFtpdGVtXVxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRbaXRlbV0gPSB2YWw7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvck1zZygpe1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmVycm9yID8gdGhpcy5lcnJvciA6IGZhbHNlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGlzSW5wdXQoKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5pbnB1dERhdGEudHlwZSA9PT0gJ2lucHV0JztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpc1NlbGVjdG9yKCl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaW5wdXREYXRhLnR5cGUgPT09ICdzZWxlY3Rvcic7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaXNDaGVja2JveCgpe1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmlucHV0RGF0YS50eXBlID09PSAnY2hlY2tib3gnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBtb3VudGVkKCl7XG4gICAgICAgICAgICB0aGlzLiR3YXRjaCgnJHBhcmVudC4nICsgdGhpcy5pbnB1dERhdGEubmFtZSwgKHZhbCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZXJyb3IgPSBudWxsO1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGRlZXA6IHRydWVcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0sXG4gICAgICAgIHdhdGNoOiB7XG4gICAgICAgICAgICAvLyAnJHBhcmVudC5lbnRpdHknOntcbiAgICAgICAgICAgIC8vICAgICBoYW5kbGVyKGVudGl0eSl7XG4gICAgICAgICAgICAvLyAgICAgICAgIHRoaXMuZXJyb3IgPSBudWxsO1xuICAgICAgICAgICAgLy8gICAgIH0sXG4gICAgICAgICAgICAvLyAgICAgZGVlcDogdHJ1ZVxuICAgICAgICAgICAgLy8gfSxcbiAgICAgICAgICAgICckcGFyZW50Lm1lc3NhZ2VzJzpmdW5jdGlvbiAobWVzc2FnZXMpe1xuICAgICAgICAgICAgICAgIGxldCBuYW1lID0gdGhpcy5nZXRUYXJnZXROYW1lKCk7XG4gICAgICAgICAgICAgICAgaWYobWVzc2FnZXNbbmFtZV0gfHwgbWVzc2FnZXNbbmFtZSArICdfaWQnXSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgbWVzc2FnZSA9IG1lc3NhZ2VzW25hbWVdIHx8IG1lc3NhZ2VzW25hbWUgKyAnX2lkJ107XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0RXJyb3IobWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgbWV0aG9kczp7XG4gICAgICAgICAgICBnZXRUYXJnZXROYW1lKCl7XG4gICAgICAgICAgICAgICAgbGV0IG5hbWVfYXJyID0gdGhpcy5pbnB1dERhdGEubmFtZS5zcGxpdCgnLicpO1xuICAgICAgICAgICAgICAgIHJldHVybiBuYW1lX2Fyci5zbGljZSgtMSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0RXJyb3IoZXJyb3Ipe1xuICAgICAgICAgICAgICAgIHRoaXMuZXJyb3IgPSBlcnJvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICB9XG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbjwhLS12LXZhbGlkYXRlPVwie25hbWU6J25hbWUnfVwiIHYtYmluZDpjbGFzcz1cInsnaXMtaW52YWxpZCcgOiBoYXNFcnJvcignbmFtZScpfVwiLS0+XG4iLCI8dGVtcGxhdGU+XG4gICAgPGRpdj5cbiAgICAgICAgPCEtLSAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGFsLWhlYWRlciBkYXJrXCIgc3R5bGU9XCJqdXN0aWZ5LWNvbnRlbnQ6IG5vcm1hbDtcIj4tLT5cbiAgICAgICAgPCEtLSAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1hbHQtaGVhZGVyXCI+LS0+XG4gICAgICAgIDwhLS0gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJpdGVtLXRpdGxlIF81MDBcIj7QoNC+0LfQvdC40YfQvdCw0Y8g0YbQtdC90LA8L3NwYW4+LS0+XG4gICAgICAgIDwhLS0gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIml0ZW0tZXhjZXB0IGZvbnQtd2VpZ2h0LWJvbGRlciBoLTF4XCI+LS0+XG4gICAgICAgIDwhLS0gICAgICAgICAgICAgICAgPHNwYW4gaWQ9XCJ0b3RhbF9wcmljZVwiPi0tPlxuICAgICAgICA8IS0tICAgICAgICAgICAgICAgICAgIHt7ICRwcm9kdWN0LT5zdG9yZXMtPmZpbmQoQXV0aDo6dXNlcigpLT5jdXJyZW50X3N0b3JlKS0+cGl2b3QtPnJldGFpbF9wcmljZSA/PyAnMCcgfX0tLT5cbiAgICAgICAgPCEtLSAgICAgICAgICAgICAgICA8L3NwYW4+LS0+XG4gICAgICAgIDwhLS0gICAgICAgICAgICAgICAgPC9kaXY+LS0+XG4gICAgICAgIDwhLS0gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIml0ZW0tdGFnIHRhZyBoaWRlXCI+LS0+XG4gICAgICAgIDwhLS0gICAgICAgICAgICAgICAgPC9kaXY+LS0+XG4gICAgICAgIDwhLS0gICAgICAgICAgICA8L2Rpdj4tLT5cbiAgICAgICAgPCEtLSAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1hbHQtaGVhZGVyXCI+LS0+XG4gICAgICAgIDwhLS0gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJpdGVtLXRpdGxlIF81MDBcIj7QndCwINGB0LLQvtC10Lwg0YHQutC70LDQtNC1IC8g0L3QsCDQtNGA0YPQs9C40YU8L3NwYW4+LS0+XG4gICAgICAgIDwhLS0gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIml0ZW0tZXhjZXB0IGZvbnQtd2VpZ2h0LWJvbGRlciBoLTF4XCI+LS0+XG4gICAgICAgIDwhLS0gICAgICAgICAgICAgICAgPHNwYW4gaWQ9XCJ0b3RhbF9wcmljZVwiPi0tPlxuICAgICAgICA8IS0tICAgICAgICAgICAgICAgICAgIHt7ICRwcm9kdWN0LT5nZXRDb3VudFNlbGZPdGhlcnMoKSB9fS0tPlxuICAgICAgICA8IS0tICAgICAgICAgICAgICAgIDwvc3Bhbj4tLT5cbiAgICAgICAgPCEtLSAgICAgICAgICAgICAgICA8L2Rpdj4tLT5cbiAgICAgICAgPCEtLSAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaXRlbS10YWcgdGFnIGhpZGVcIj4tLT5cbiAgICAgICAgPCEtLSAgICAgICAgICAgICAgICA8L2Rpdj4tLT5cbiAgICAgICAgPCEtLSAgICAgICAgICAgIDwvZGl2Pi0tPlxuICAgICAgICA8IS0tICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGFsLWFsdC1oZWFkZXJcIj4tLT5cbiAgICAgICAgPCEtLSAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cIml0ZW0tdGl0bGUgXzUwMFwiPtCl0YDQsNC90LXQvdC40LU8L3NwYW4+LS0+XG4gICAgICAgIDwhLS0gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIml0ZW0tZXhjZXB0IGZvbnQtd2VpZ2h0LWJvbGRlciBoLTF4XCI+LS0+XG4gICAgICAgIDwhLS0gICAgICAgICAgICAgICAgPHNwYW4gaWQ9XCJ0b3RhbF9wcmljZVwiPi0tPlxuICAgICAgICA8IS0tICAgICAgICAgICAgICAgICAgIHshISAkcHJvZHVjdC0+Z2V0U3RvcmFnZUNvZGUoKSAhIX0tLT5cbiAgICAgICAgPCEtLSAgICAgICAgICAgICAgICA8L3NwYW4+LS0+XG4gICAgICAgIDwhLS0gICAgICAgICAgICAgICAgPC9kaXY+LS0+XG4gICAgICAgIDwhLS0gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIml0ZW0tdGFnIHRhZyBoaWRlXCI+LS0+XG4gICAgICAgIDwhLS0gICAgICAgICAgICAgICAgPC9kaXY+LS0+XG4gICAgICAgIDwhLS0gICAgICAgICAgICA8L2Rpdj4tLT5cbiAgICAgICAgPCEtLSAgICAgICAgPC9kaXY+LS0+XG5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1ib2R5XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJvd1wiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLXNtLTQgbm8tcHIgZC1mbGV4XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dWwgY2xhc3M9XCJuYXZcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGkgdi1mb3I9XCJ0YWIgaW4gdGFic1wiIHYtYmluZDprZXk9XCJ0YWIuc2x1Z1wiIHYtYmluZDpjbGFzcz1cInsnYWN0aXZlJyA6IHRhYi5zdGF0ZX1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cIm5hdi1pdGVtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIHYtb246Y2xpY2s9XCJzZWxlY3RUYWIodGFiKVwiIGNsYXNzPVwibmF2LWxpbmtcIiBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7eyB0YWIubmFtZSB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJmbG9hdC1yaWdodCBoZWxwZXJfZGFuZ2VyIGQtbm9uZS1mXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhIGZhLWV4Y2xhbWF0aW9uLXRyaWFuZ2xlIHRleHQtbWQgbWwtMiB0ZXh0LWRhbmdlclwiPjwvaT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLXNtLTggbm8tcGxcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0YWItY29udGVudCBuby1wbFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0YWItcGFuZSBwLTNcIiB2LWJpbmQ6Y2xhc3M9XCJ7J2FjdGl2ZScgOiB0YWJzWzBdLnN0YXRlfVwiPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwhLS0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgaWQ9XCJwcm92aWRlcl9zZWFyY2hfY29udGFpbmVyXCIgY2xhc3M9XCJwcm92aWRlcl9zZWFyY2hfY29udGFpbmVyIGZhZGVcIiBkYXRhLXNpbXBsZWJhciBzdHlsZT1cImhlaWdodDogMzAwcHg7XCI+LS0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwhLS0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29udFwiPjwvZGl2Pi0tPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8IS0tICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImVtcHR5X3NlYXJjaFwiPi0tPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8IS0tICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJvdXRfb2Zfc2VhcmNoXCI+PC9kaXY+LS0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwhLS0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtY2VudGVyXCI+0KDQtdC30YPQu9GM0YLQsNGC0L7QsiDQvdC10YI8L2Rpdj4tLT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPCEtLSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2Pi0tPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8IS0tICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj4tLT5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybUlucHV0IHYtYmluZDppbnB1dERhdGE9XCJ7dHlwZTonaW5wdXQnLGxhYmVsOifQkNGA0YLQuNC60YPQuycsbmFtZTonZW50aXR5LmFydGljbGUnLCBwbGFjZWhvbGRlcjon0JDRgNGC0LjQutGD0Lsg0LTQtdGC0LDQu9C4ICjQvdC1INCx0L7Qu9C10LUgNjQg0YHQuNC80LLQvtC70L7QsiknfVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtSW5wdXQgdi1iaW5kOmlucHV0RGF0YT1cInt0eXBlOidpbnB1dCcsbGFiZWw6J9Cd0LDQuNC80LXQvdC+0LLQsNC90LjQtScsbmFtZTonZW50aXR5Lm5hbWUnLCBwbGFjZWhvbGRlcjon0J3QsNC40LzQtdC90L7QstCw0L3QuNC1ICjQvdC1INCx0L7Qu9C10LUgMjU1INGB0LjQvNCy0L7Qu9C+0LIpJ31cIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybUlucHV0IHYtYmluZDppbnB1dERhdGE9XCJ7dHlwZTonc2VsZWN0b3InLGxhYmVsOifQkiDQutCw0YLQtdCz0L7RgNC40LgnLG5hbWU6J2VudGl0eS5jYXRlZ29yeScsIG9uQ2xpY2s6J3NlbGVjdENhdGVnb3J5J31cIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybUlucHV0IHYtYmluZDppbnB1dERhdGE9XCJ7dHlwZTonc2VsZWN0b3InLGxhYmVsOifQn9GA0L7QuNC30LLQvtC00LjRgtC10LvRjCcsbmFtZTonZW50aXR5LnN1cHBsaWVyJywgb25DbGljazonc2VsZWN0U3VwcGxpZXInfVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwhLS0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+LS0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwhLS0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBAZm9yZWFjaCgkc3RvcmVzIGFzICRzdG9yZSktLT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPCEtLSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbD7QoNC+0LfQvdC40YfQvdCw0Y8g0YbQtdC90LAg0LTQu9GPINC80LDQs9Cw0LfQuNC90LAgXCJ7eyAkc3RvcmUtPm5hbWUgfX1cIjwvbGFiZWw+LS0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwhLS0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXAgbWItM1wiPi0tPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8IS0tICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwibnVtYmVyXCIgbWluPVwiMFwiIG5hbWU9XCJzdG9yYWdlW3t7ICRzdG9yZS0+aWQgfX1dW3JldGFpbF9wcmljZV1cIiBjbGFzcz1cImZvcm0tY29udHJvbCBtbC0wXCIgcGxhY2Vob2xkZXI9XCLQoNC+0LfQvdC40YfQvdCw0Y8g0YbQtdC90LBcIiB2YWx1ZT1cIkBpZigkcHJvZHVjdCl7eyAkcHJvZHVjdC0+c3RvcmVzLT5maW5kKCRzdG9yZS0+aWQpLT5waXZvdC0+cmV0YWlsX3ByaWNlID8/ICcwJyB9fUBlbmRpZlwiID4tLT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPCEtLSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2Pi0tPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8IS0tICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQGVuZGZvcmVhY2gtLT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPCEtLSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+LS0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRhYi1wYW5lXCIgdi1iaW5kOmNsYXNzPVwieydhY3RpdmUnIDogdGFic1sxXS5zdGF0ZX1cIiA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0YWJsZSBjbGFzcz1cInRhYmxlIHctMTAwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGhlYWQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoPtCh0LrQu9Cw0LQ8L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aD7QmtC+0LvQuNGH0LXRgdGC0LLQvjwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoPtCl0YDQsNC90LXQvdC40LU8L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGhlYWQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICDQnNCw0LPQsNC30LjQvVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdG9yYWdlX3N0b3JlX2NvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHZhbHVlPVwiIFwiIGNsYXNzPVwic3RvcmFnZV9zdG9yZSBiYl8xXCIgdHlwZT1cInRleHRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB2YWx1ZT1cIiBcIiBjbGFzcz1cInN0b3JhZ2Vfc3RvcmUgYmJfMlwiIHR5cGU9XCJ0ZXh0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdmFsdWU9XCIgXCIgY2xhc3M9XCJzdG9yYWdlX3N0b3JlIGJiXzNcIiB0eXBlPVwidGV4dFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHZhbHVlPVwiIFwiIGNsYXNzPVwic3RvcmFnZV9zdG9yZSBiYl80XCIgdHlwZT1cInRleHRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYm94IG10LTEwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYmJfZmFxIGZhcV8xXCI+0JfQvtC90LAg0YXRgNCw0L3QtdC90LjRjzwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJiX2ZhcSBmYXFfMlwiPtCd0L7QvNC10YAg0YHRgtC10LvQu9Cw0LbQsDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJiX2ZhcSBmYXFfM1wiPtCd0L7QvNC10YAg0LLQtdGA0YLQuNC60LDQu9GM0L3QvtC5INGB0LXQutGG0LjQuCDRgdGC0LXQu9C70LDQttCwPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYmJfZmFxIGZhcV80XCI+0J3QvtC80LXRgCDQv9C+0LvQutC4PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0YWItcGFuZSBwLTNcIiB2LWJpbmQ6Y2xhc3M9XCJ7J2FjdGl2ZScgOiB0YWJzWzJdLnN0YXRlfVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHYtaWY9XCJzaG9wX2FjdGl2YXRlZFwiIGlkPVwidGFiX21haW5cIiBkYXRhLXNpbXBsZWJhciBzdHlsZT1cImhlaWdodDogMzEwcHg7XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybUlucHV0IHYtYmluZDppbnB1dERhdGE9XCJ7dHlwZTonY2hlY2tib3gnLGxhYmVsOifQn9C+0LrQsNC30LDRgtGMINC90LAg0LPQu9Cw0LLQvdC+0Lkg0YHRgtGA0LDQvdC40YbQtScsbmFtZTonZW50aXR5LnNob3Auc2V0dGluZ3Muc3BfbWFpbid9XCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtSW5wdXQgdi1iaW5kOmlucHV0RGF0YT1cInt0eXBlOidjaGVja2JveCcsbGFiZWw6J9CQ0LrRhtC40L7QvdC90YvQuSDRgtC+0LLQsNGAJyxuYW1lOidlbnRpdHkuc2hvcC5zZXR0aW5ncy5zcF9zdG9jayd9XCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXdke3sgZW50aXR5LnNob3Auc2V0dGluZ3MgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPCEtLTxsYWJlbD7QndCw0YHRgtGA0L7QudC60Lgg0L/RgNC+0LTRg9C60YLQsDwvbGFiZWw+LS0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8IS0tPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXAgcmVsYXRpdmVcIj4tLT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8IS0tPGxhYmVsIGNsYXNzPVwidy0xMDBcIj7Qn9C+0LrQsNC30LDRgtGMINC90LAg0LPQu9Cw0LLQvdC+0Lkg0YHRgtGA0LDQvdC40YbQtTwvbGFiZWw+LS0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPCEtLTxsYWJlbCBjbGFzcz1cImFic29sdXRlIGN1c3RvbV9jaGVja2JveFwiIHN0eWxlPVwicmlnaHQ6IDA7IHRvcDogM3B4O1wiPi0tPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8IS0tPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGNsYXNzPVwibm90X2RlZmF1bHRcIi8+LS0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwhLS08c3Bhbj48L3NwYW4+LS0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPCEtLTwvbGFiZWw+LS0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8IS0tPC9kaXY+LS0+XG48IS0tICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNob3BfcGFyYW1zXCI+LS0+XG5cbjwhLS0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQGZvcmVhY2goJHNob3BGaWVsZHMgYXMgJGZpZWxkID0+ICRwYXJhbXMpLS0+XG5cblxuXG48IS0tICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEBlbmRmb3JlYWNoLS0+XG5cbjwhLS0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN0b2NrcyBAaWYoISRwcm9kdWN0IHx8ICEkcHJvZHVjdC0+c3Bfc3RvY2spIGQtbm9uZSBAZW5kaWZcIj4tLT5cbjwhLS0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmbGV4LTFcIj4tLT5cbjwhLS0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPi0tPlxuPCEtLSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWw+0KbQtdC90LA8L2xhYmVsPi0tPlxuPCEtLSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2Pi0tPlxuXG48IS0tICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj4tLT5cbjwhLS0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsPtCh0LrQuNC00LrQsDwvbGFiZWw+LS0+XG48IS0tICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+LS0+XG5cbjwhLS0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPi0tPlxuPCEtLSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWw+0JjRgtC+0LPQvjwvbGFiZWw+LS0+XG48IS0tICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+LS0+XG48IS0tICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj4tLT5cblxuPCEtLSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZsZXgtM1wiPi0tPlxuPCEtLSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+LS0+XG48IS0tICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwibnVtYmVyXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2wgcHJpY2VcIi0tPlxuPCEtLSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZT1cInNob3BbZGlzY291bnRzXVtwcmljZV1cIi0tPlxuPCEtLSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9XCJ7eyAkcHJvZHVjdCA/ICRwcm9kdWN0LT5nZXRQcmljZSgpIDogMCB9fVwiIGRpc2FibGVkLz4tLT5cbjwhLS0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj4tLT5cblxuPCEtLSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwIGQtZmxleFwiPi0tPlxuPCEtLSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZmxleC0xXCI+LS0+XG48IS0tICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cIm51bWJlclwiIGNsYXNzPVwiZm9ybS1jb250cm9sIGRpc2NvdW50XCItLT5cbjwhLS0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lPVwic2hvcFtkaXNjb3VudHNdW2Rpc2NvdW50XVwiLS0+XG48IS0tICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9XCJ7eyAkcHJvZHVjdC0+c3BfZGlzY291bnQgPz8gMCB9fVwiLz4tLT5cbjwhLS0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+LS0+XG5cbjwhLS0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1sLTUgZmxleC0xXCI+LS0+XG48IS0tICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c2VsZWN0IGNsYXNzPVwidHlwZVwiIGN1c3RvbV9zZWxlY3QtLT5cbjwhLS0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25jaGFuZ2U9XCJ7eyAkY2xhc3MgfX0ucmVjYWxjdWxhdGVTaG9wRGlzY291bnREZWJvdW5jZSgpO1wiLS0+XG48IS0tICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU9XCJzaG9wW2Rpc2NvdW50c11bdHlwZV1cIj4tLT5cbjwhLS0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBAZm9yZWFjaChbJ9CSINGA0YPQsdC70Y/RhScsICfQkiDQv9GA0L7RhtC10L3RgtCw0YUnXSBhcyAkaW5kZXggPT4gJG5hbWUpLS0+XG48IS0tICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiBAaWYoJHByb2R1Y3QgJiYgJHByb2R1Y3QtPmdldFN0b3JlRGlzY291bnRUeXBlKCkgPT0tLT5cbjwhLS0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJGluZGV4KSBzZWxlY3RlZCBAZW5kaWYgdmFsdWU9XCJ7eyAkaW5kZXggfX1cIj57eyAkbmFtZSB9fS0tPlxuPCEtLSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvb3B0aW9uPi0tPlxuPCEtLSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEBlbmRmb3JlYWNoLS0+XG48IS0tICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NlbGVjdD4tLT5cbjwhLS0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+LS0+XG48IS0tICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+LS0+XG5cbjwhLS0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPi0tPlxuPCEtLSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cIm51bWJlclwiIGNsYXNzPVwiZm9ybS1jb250cm9sIHRvdGFsXCItLT5cbjwhLS0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU9XCJzaG9wW2Rpc2NvdW50c11bdG90YWxdXCItLT5cbjwhLS0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPVwie3sgJHByb2R1Y3QgPyAkcHJvZHVjdC0+Z2V0UHJpY2VXaXRoRGlzY291bnQoKSA6IDAgfX1cIi0tPlxuPCEtLSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQvPi0tPlxuPCEtLSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2Pi0tPlxuPCEtLSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+LS0+XG48IS0tICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2Pi0tPlxuXG48IS0tICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+LS0+XG5cbjwhLS0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJtdC04XCI+0J3QsNC40LzQtdC90L7QstCw0L3QuNC1INC/0YDQvtC00YPQutGC0LA8L2xhYmVsPi0tPlxuPCEtLSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9XCJoZWlnaHQ6IDM2cHg7XCI+LS0+XG48IS0tICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZXh0YXJlYSB0eXBlPVwidGV4dFwiIG5hbWU9XCJzaG9wW25hbWVdXCIgY29scz1cIjJcIi0tPlxuPCEtLSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJmb3JtLWNvbnRyb2wgcmVzaXplLW5vbmUgYm9yZGVyLXJhZGl1cy1ub25lIHNob3BfbmFtZVwiLS0+XG48IS0tICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cItCd0LDQuNC80LXQvdC+0LLQsNC90LjQtSDQv9GA0L7QtNGD0LrRgtCwXCI+e3sgJHByb2R1Y3QtPnNwX25hbWUgPz8gJHByb2R1Y3QtPm5hbWUgPz8gJycgfX08L3RleHRhcmVhPi0tPlxuPCEtLSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2Pi0tPlxuXG48IS0tICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImQtZmxleCBtdC0xMFwiPi0tPlxuPCEtLSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZmxleC0xXCI+LS0+XG48IS0tICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJtYi01XCI+0J7RgdC90L7QstC90L7QtSDRhNC+0YLQvjwvbGFiZWw+LS0+XG48IS0tICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPVwid2lkdGg6IDExMHB4OyBoZWlnaHQ6IDExMHB4O1wiPi0tPlxuPCEtLSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgY2xhc3M9XCJoLTEwMCB3LTEwMCBpbWFnZVwiLS0+XG48IS0tICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcmM9XCJ7eyAkcHJvZHVjdC0+aW1hZ2VfcGF0aCA/PyBhc3NldCgnL2ltYWdlcy9wbGFjZWhvbGRlcl9wcm9kdWN0LnN2ZycpIH19XCIvPi0tPlxuPCEtLSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+LS0+XG48IS0tICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJ1cGxvYWRfZmlsZSBwb2ludGVyXCIgZm9yPVwic2hvcFtpbWFnZV1cIj7QktGL0LHQtdGA0LjRgtC1INGE0LDQudC7LS0+XG48IS0tICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj48L2Rpdj4tLT5cbjwhLS0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbGFiZWw+LS0+XG48IS0tICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImZpbGVcIiBpZD1cInNob3BbaW1hZ2VdXCItLT5cbjwhLS0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbmNoYW5nZT1cInt7ICRjbGFzcyB9fS5jaGFuZ2VGaWxlKHRoaXMpO1wiLS0+XG48IS0tICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWNjZXB0PVwiaW1hZ2UvanBlZyxpbWFnZS9wbmcsaW1hZ2UvZ2lmXCIgaGlkZGVuLz4tLT5cbjwhLS0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiaGlkZGVuXCIgbmFtZT1cImltYWdlX2lkXCItLT5cbjwhLS0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT1cInt7ICRwcm9kdWN0LT5pbWFnZS0+aWQgPz8gbnVsbCB9fVwiLz4tLT5cbjwhLS0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+LS0+XG48IS0tICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmbGV4LTMgbWwtMTBcIj4tLT5cbjwhLS0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzcz1cIm1iLTVcIj7QntC/0LjRgdCw0L3QuNC1INC/0YDQvtC00YPQutGC0LA8L2xhYmVsPi0tPlxuPCEtLSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRleHRhcmVhIGNsYXNzPVwiZm9ybS1jb250cm9sIHAtNSByZXNpemUtbm9uZSBib3JkZXItcmFkaXVzLW5vbmVcIi0tPlxuPCEtLSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU9XCJzaG9wW2Rlc2NdXCIgcGxhY2Vob2xkZXI9XCLQktCy0LXQtNC40YLQtSDQvtC/0LjRgdCw0L3QuNC1XCItLT5cbjwhLS0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT1cImhlaWdodDogMTMwcHg7XCI+e3sgJHByb2R1Y3QtPnNwX2Rlc2MgPz8gJycgfX08L3RleHRhcmVhPi0tPlxuPCEtLSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj4tLT5cbjwhLS0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj4tLT5cblxuPCEtLSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+LS0+XG48IS0tICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbD7QpdCw0YDQsNC60YLQtdGA0LjRgdGC0LjQutC4PC9sYWJlbD4tLT5cblxuPCEtLSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBocmVmPVwiI1wiIG9uY2xpY2s9XCJ7eyAkY2xhc3MgfX0uYWRkU3BlY2lmaWNhdGlvbkZpZWxkKHRoaXMpO1wiLS0+XG48IS0tICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwiZmxvYXQtcmlnaHRcIj7QlNC+0LHQsNCy0LjRgtGMPC9hPi0tPlxuXG48IS0tICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzcGVjaWZpY2F0aW9uc1wiPi0tPlxuXG48IS0tICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZWxlbWVudCBjb3B5IGQtZmxleCBkLW5vbmVcIj4tLT5cblxuPCEtLSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+LS0+XG48IS0tICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPtCd0LDQuNC80LXQvdC+0LLQsNC90LjQtTwvc3Bhbj4tLT5cbjwhLS0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJtdC01XCI+0JfQvdCw0YfQtdC90LjQtTwvc3Bhbj4tLT5cbjwhLS0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj4tLT5cblxuPCEtLSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtbC0xNVwiPi0tPlxuPCEtLSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwiXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIi0tPlxuPCEtLSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCLQktGP0LfQutC+0YHRgtGMXCIgZGlzYWJsZWQ+LS0+XG48IS0tICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJcIiBjbGFzcz1cImZvcm0tY29udHJvbCBtdC01XCItLT5cbjwhLS0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiNVc0MFwiIGRpc2FibGVkPi0tPlxuPCEtLSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2Pi0tPlxuXG48IS0tICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJlbW92ZSBwb2ludGVyIG1sLTEwXCItLT5cbjwhLS0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uY2xpY2s9XCJ7eyAkY2xhc3MgfX0ucmVtb3ZlU3BlY2lmaWNhdGlvbih0aGlzKTtcIj48L2Rpdj4tLT5cblxuPCEtLSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+LS0+XG5cbjwhLS0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEBpc3NldCgkcHJvZHVjdC0+c3BlY2lmaWNhdGlvbnMpLS0+XG48IS0tICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBAZm9yZWFjaCgkcHJvZHVjdC0+c3BlY2lmaWNhdGlvbnMgYXMgJHNwZWNpZmljYXRpb24pLS0+XG5cbjwhLS0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJlbGVtZW50IGQtZmxleFwiPi0tPlxuXG48IS0tICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj4tLT5cbjwhLS0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+0J3QsNC40LzQtdC90L7QstCw0L3QuNC1PC9zcGFuPi0tPlxuPCEtLSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cIm10LTVcIj7Ql9C90LDRh9C10L3QuNC1PC9zcGFuPi0tPlxuPCEtLSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2Pi0tPlxuXG48IS0tICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1sLTE1XCI+LS0+XG48IS0tICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiLS0+XG48IS0tICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lPVwic2hvcFtzcGVjaWZpY2F0aW9uc11be3sgJGxvb3AtPmluZGV4IH19XVtsYWJlbF1cIi0tPlxuPCEtLSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBwbGFjZWhvbGRlcj1cItCS0Y/Qt9C60L7RgdGC0YxcIi0tPlxuPCEtLSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9XCJ7eyAkc3BlY2lmaWNhdGlvbi0+bGFiZWwgfX1cIj4tLT5cbjwhLS0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCItLT5cbjwhLS0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU9XCJzaG9wW3NwZWNpZmljYXRpb25zXVt7eyAkbG9vcC0+aW5kZXggfX1dW3ZhbHVlXVwiLS0+XG48IS0tICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cImZvcm0tY29udHJvbCBtdC01XCIgcGxhY2Vob2xkZXI9XCI1VzQwXCItLT5cbjwhLS0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPVwie3sgJHNwZWNpZmljYXRpb24tPnZhbHVlIH19XCI+LS0+XG48IS0tICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+LS0+XG5cbjwhLS0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicmVtb3ZlIHBvaW50ZXIgbWwtMTBcIi0tPlxuPCEtLSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25jbGljaz1cInt7ICRjbGFzcyB9fS5yZW1vdmVTcGVjaWZpY2F0aW9uKHRoaXMpO1wiPjwvZGl2Pi0tPlxuXG48IS0tICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj4tLT5cblxuPCEtLSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQGVuZGZvcmVhY2gtLT5cbjwhLS0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEBlbmRpc3NldC0tPlxuXG48IS0tICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2Pi0tPlxuXG48IS0tICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+LS0+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgdi1pZj1cIiFzaG9wX2FjdGl2YXRlZFwiPtCQ0LrRgtC40LLQuNGA0YPQudGC0LUg0LjQvdGC0LXRgNC90LXRgi3QvNCw0LPQsNC30LjQvSDQsiA8YSBjbGFzcz1cImFqYXgtbmF2XCIgaHJlZj1cIiNcIj7QvdCw0YHRgtGA0L7QudC60LDRhTwvYT4uPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgdi1pZj1cIiFzaG9wX2FjdGl2YXRlZFwiPtCt0YLQviDQsdC10YHQv9C70LDRgtC90L4uPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGFiLXBhbmUgcC0zXCIgdi1iaW5kOmNsYXNzPVwieydhY3RpdmUnIDogdGFic1szXS5zdGF0ZX1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEZvcm1JbnB1dCB2LWJpbmQ6aW5wdXREYXRhPVwie3R5cGU6J2lucHV0JyxsYWJlbDon0KjRgtGA0LjRhS3QutC+0LQg0L/RgNC+0LjQt9Cy0L7QtNC40YLQtdC70Y8gKEVBTiAxMyknLG5hbWU6J2JhcmNvZGUnLCBtZXNzYWdlczptZXNzYWdlcywgcGxhY2Vob2xkZXI6J9Co0YLRgNC40YXQutC+0LQnfVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtSW5wdXQgdi1iaW5kOmlucHV0RGF0YT1cInt0eXBlOidpbnB1dCcsbGFiZWw6J9CS0L3Rg9GC0YDQtdC90L3QuNC5INGI0YLRgNC40YUt0LrQvtC0IChFQU4gMTMpJyxuYW1lOidiYXJjb2RlX2xvY2FsJywgbWVzc2FnZXM6bWVzc2FnZXMsIHBsYWNlaG9sZGVyOifQqNGC0YDQuNGF0LrQvtC0INGB0LrQu9Cw0LTQsCd9XCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwhLS08ZGl2IGNsYXNzPVwidGFiLXBhbmVcIiBpZD1cInt7ICRjbGFzcyB9fV90YWJfZW50cmFuY2VzXCIgZGF0YS1zaW1wbGViYXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPVwibWF4LWhlaWdodDogNDAwcHg7XCI+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQGlmKGlzc2V0KCRwcm9kdWN0LT5lbnRyYW5jZXMpICYmIGNvdW50KCRwcm9kdWN0LT5lbnRyYW5jZXMpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGFibGU+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoPklEPC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGg+0J/QvtGB0YLQsNCy0YnQuNC6PC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGg+0JrQvtC70LjRh9C10YHRgtCy0L48L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aD7QlNCw0YLQsDwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBAZm9yZWFjaCgkcHJvZHVjdC0+ZW50cmFuY2VzIGFzICRlbnRyYW5jZSlcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD57eyAkZW50cmFuY2UtPmlkIH19PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQ+e3sgJGVudHJhbmNlLT5wYXJ0bmVyLT5vZmZpY2lhbF9uYW1lID8/ICcnIH19PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQ+e3sgJGVudHJhbmNlLT5waXZvdC0+Y291bnQgfX08L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD57eyAkZW50cmFuY2UtPnBpdm90LT5jcmVhdGVkX2F0IH19PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEBlbmRmb3JlYWNoXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90YWJsZT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg0J/QvtGB0YLRg9C/0LvQtdC90LjRjyDQvdC1INC90LDQudC00LXQvdGLXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEBlbmRpZlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+LS0+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9kYWwtZm9vdGVyXCI+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBAY2xpY2s9XCIkcGFyZW50LmNsb3NlRGlhbG9nKGRpYWxvZylcIiB0eXBlPVwic3VibWl0XCIgY2xhc3M9XCJidXR0b24gd2hpdGVcIj7Ql9Cw0LrRgNGL0YLRjDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxidXR0b24gQGNsaWNrPVwic2F2ZSgpXCIgdHlwZT1cInN1Ym1pdFwiIGNsYXNzPVwiYnV0dG9uIHByaW1hcnkgcHVsbC1yaWdodFwiPtCh0L7RhdGA0LDQvdC40YLRjDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3lzdGVtX21lc3NhZ2VcIj5cblxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbiAgICBpbXBvcnQgY2F0ZWdvcnlNaXhpbiBmcm9tIFwiLi8uLi8uLi9taXhpbnMvY2F0ZWdvcnlNaXhpblwiXG4gICAgaW1wb3J0IHN1cHBsaWVyTWl4aW4gZnJvbSBcIi4vLi4vLi4vbWl4aW5zL3N1cHBsaWVyTWl4aW5cIlxuICAgIGltcG9ydCBGb3JtSW5wdXQgZnJvbSBcIi4vLi4vLi4vc2VydmljZS9Gb3JtSW5wdXRcIlxuICAgIGV4cG9ydCBkZWZhdWx0IHtcbiAgICAgICAgbmFtZTogXCJQcm9kdWN0RGlhbG9nXCIsXG4gICAgICAgIHByb3BzOiBbJ2RpYWxvZyddLFxuICAgICAgICBtaXhpbnM6IFtjYXRlZ29yeU1peGluLCBzdXBwbGllck1peGluXSxcbiAgICAgICAgZGF0YTogKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBnZXQgc2hvcF9hY3RpdmF0ZWQoKXtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGxvY2FsX3NldHRpbmdzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2VbJ3NldHRpbmdzJ10pO1xuICAgICAgICAgICAgICAgICAgICBsZXQgaW5kZXggPSBfLmZpbmRJbmRleChsb2NhbF9zZXR0aW5ncywgZnVuY3Rpb24obykgeyByZXR1cm4gby5rZXkgPT09IFwic2hvcF9lbmFibGVkXCI7IH0pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbG9jYWxfc2V0dGluZ3NbaW5kZXhdID8gQm9vbGVhbihwYXJzZUludChsb2NhbF9zZXR0aW5nc1tpbmRleF0udmFsdWUpKSA6IGZhbHNlO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdGFiczogW1xuICAgICAgICAgICAgICAgICAgICB7c2x1ZzogXCJiYXNlXCIsIG5hbWU6IFwi0J7RgdC90L7QstC90YvQtVwiLCBzdGF0ZTogdHJ1ZX0sXG4gICAgICAgICAgICAgICAgICAgIHtzbHVnOiBcInN0b3JlXCIsIG5hbWU6IFwi0KHQutC70LDQtFwiLCBzdGF0ZTogZmFsc2V9LFxuICAgICAgICAgICAgICAgICAgICB7c2x1ZzogXCJzaG9wXCIsIG5hbWU6IFwi0JjQvdGC0LXRgNC90LXRgiDQvNCw0LPQsNC30LjQvVwiLCBzdGF0ZTogZmFsc2V9LFxuICAgICAgICAgICAgICAgICAgICB7c2x1ZzogXCJiYXJjb2RlXCIsIG5hbWU6IFwi0KjRgtGA0LjRhdC60L7QtFwiLCBzdGF0ZTogZmFsc2V9LFxuICAgICAgICAgICAgICAgICAgICB7c2x1ZzogXCJlbnRyYW5jZVwiLCBuYW1lOiBcItCf0L7RgdGC0YPQv9C70LXQvdC40Y9cIiwgc3RhdGU6IGZhbHNlfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIHJvb3RfY2F0ZWdvcnk6IDIsXG4gICAgICAgICAgICAgICAgZW50aXR5OiB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6bnVsbCxcbiAgICAgICAgICAgICAgICAgICAgYXJ0aWNsZTpudWxsLFxuICAgICAgICAgICAgICAgICAgICBjYXRlZ29yeV9pZDoyLFxuICAgICAgICAgICAgICAgICAgICBjYXRlZ29yeTpudWxsLFxuICAgICAgICAgICAgICAgICAgICBzdXBwbGllcl9pZDpudWxsLFxuICAgICAgICAgICAgICAgICAgICBzdXBwbGllcjon0J3QtSDQstGL0LHRgNCw0L0nLFxuICAgICAgICAgICAgICAgICAgICBzaG9wOntcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcF9tYWluOmZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwX3N0b2NrOmZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBtZXNzYWdlczp7fSxcbiAgICAgICAgICAgICAgICBsb2FkaW5nOmZhbHNlLFxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBtb3VudGVkKCkge1xuICAgICAgICAgICAgdGhpcy5kaWFsb2cud2lkdGggPSA2MDA7XG4gICAgICAgICAgICBpZiAodGhpcy5kaWFsb2cuaWQgPT09IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRpYWxvZy50aXRsZSA9IFwi0J3QvtCy0YvQuSDQv9GA0L7QtNGD0LrRglwiO1xuICAgICAgICAgICAgICAgIHRoaXMuZ2V0UGFyZW50Q2F0ZWdvcnkoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB3aW5kb3cuYXhpb3Moe1xuICAgICAgICAgICAgICAgICAgICBtZXRob2Q6ICdnZXQnLFxuICAgICAgICAgICAgICAgICAgICB1cmw6ICcvcHJvZHVjdHMvJyArIHRoaXMuZGlhbG9nLmlkLFxuICAgICAgICAgICAgICAgIH0pLnRoZW4oKHJlc3ApID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kaWFsb2cudGl0bGUgPSBcItCg0LXQtNCw0LrRgtC40YDQvtCy0LDQvdC40LUg0YLQvtCy0LDRgNCwICdcIiArIHJlc3AuZGF0YS5uYW1lICsgXCInXCI7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaWQgPSByZXNwLmRhdGEuaWQ7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW50aXR5ID0gcmVzcC5kYXRhO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9KS5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYoZXJyb3IucmVzcG9uc2Uuc3RhdHVzID09PSA0MDQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kcGFyZW50LmNsb3NlRGlhbG9nKHRoaXMuZGlhbG9nKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgY29tcHV0ZWQ6IHt9LFxuICAgICAgICBtZXRob2RzOiB7XG4gICAgICAgICAgICBzZWxlY3RUYWIodGFiKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50YWJzLmZvckVhY2goKHRhYikgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0YWIuc3RhdGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB0YWIuc3RhdGUgPSB0cnVlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNhdmUoKXtcbiAgICAgICAgICAgICAgICBsZXQgbWV0aG9kID0gdGhpcy5lbnRpdHkuaWQgPyAncGF0Y2gnIDogJ3Bvc3QnO1xuICAgICAgICAgICAgICAgIGxldCB1cmwgPSB0aGlzLmVudGl0eS5pZCA/ICcvJyArIHRoaXMuZW50aXR5LmlkIDogJyc7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB3aW5kb3cuYXhpb3Moe1xuICAgICAgICAgICAgICAgICAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICAgICAgICAgICAgICAgICAgdXJsOiAnL3Byb2R1Y3RzJyArIHVybCxcbiAgICAgICAgICAgICAgICAgICAgZGF0YTp0aGlzLmVudGl0eSxcbiAgICAgICAgICAgICAgICB9KS50aGVuKChyZXNwKSA9PiAge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLiRldmVudEJ1cy4kZW1pdCgnUHJvZHVjdFVwZGF0ZWQnLCB7aWQ6IHRoaXMuaWQsIGNhdGVnb3J5X2lkOnRoaXMuY2F0ZWdvcnlfaWR9KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kcGFyZW50LmNsb3NlRGlhbG9nKHRoaXMuZGlhbG9nKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1lc3NhZ2VzID0gZXJyb3IucmVzcG9uc2UuZGF0YS5tZXNzYWdlcztcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgY29tcG9uZW50czp7XG4gICAgICAgICAgICBGb3JtSW5wdXRcbiAgICAgICAgfVxuICAgIH1cbjwvc2NyaXB0PlxuIiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgX3ZtID0gdGhpc1xuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gIHJldHVybiBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImZvcm0tZ3JvdXBcIiB9LCBbXG4gICAgIV92bS4kcGFyZW50LmxvYWRpbmcgJiYgX3ZtLmlzSW5wdXRcbiAgICAgID8gX2MoXCJkaXZcIiwgW1xuICAgICAgICAgIF9jKFwibGFiZWxcIiwgW192bS5fdihfdm0uX3MoX3ZtLmlucHV0RGF0YS5sYWJlbCkpXSksXG4gICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICBfdm0uJHBhcmVudC5sb2FkaW5nXG4gICAgICAgICAgICA/IF9jKFxuICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwibGlzdC1wbGFjZWhvbGRlclwiLFxuICAgICAgICAgICAgICAgICAgc3RhdGljU3R5bGU6IHsgaGVpZ2h0OiBcIjMwcHhcIiB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBbX3ZtLl9tKDApXVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICA6IF92bS5fZSgpLFxuICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgX2MoXCJpbnB1dFwiLCB7XG4gICAgICAgICAgICBkaXJlY3RpdmVzOiBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBuYW1lOiBcInRvb2x0aXBcIixcbiAgICAgICAgICAgICAgICByYXdOYW1lOiBcInYtdG9vbHRpcFwiLFxuICAgICAgICAgICAgICAgIHZhbHVlOiB7XG4gICAgICAgICAgICAgICAgICBjb250ZW50OiBfdm0uZXJyb3JNc2csXG4gICAgICAgICAgICAgICAgICBwbGFjZW1lbnQ6IFwibGVmdFwiLFxuICAgICAgICAgICAgICAgICAgY2xhc3NlczogW1wiZXJyb3JcIl1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGV4cHJlc3Npb246XG4gICAgICAgICAgICAgICAgICBcIntcXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IGVycm9yTXNnLFxcbiAgICAgICAgICAgICAgICAgICAgcGxhY2VtZW50OiAnbGVmdCcsXFxuICAgICAgICAgICAgICAgICAgICBjbGFzc2VzOiBbJ2Vycm9yJ10sXFxuICAgICAgICAgICAgICAgIH1cIlxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbmFtZTogXCJtb2RlbFwiLFxuICAgICAgICAgICAgICAgIHJhd05hbWU6IFwidi1tb2RlbFwiLFxuICAgICAgICAgICAgICAgIHZhbHVlOiBfdm0ucGFyZW50TW9kZWwsXG4gICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCJwYXJlbnRNb2RlbFwiXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBzdGF0aWNDbGFzczogXCJmb3JtLWNvbnRyb2xcIixcbiAgICAgICAgICAgIGNsYXNzOiB7IFwiaXMtaW52YWxpZFwiOiBfdm0uZXJyb3JNc2cgfSxcbiAgICAgICAgICAgIGF0dHJzOiB7IHBsYWNlaG9sZGVyOiBfdm0uaW5wdXREYXRhLnBsYWNlaG9sZGVyLCB0eXBlOiBcInRleHRcIiB9LFxuICAgICAgICAgICAgZG9tUHJvcHM6IHsgdmFsdWU6IF92bS5wYXJlbnRNb2RlbCB9LFxuICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAga2V5cHJlc3M6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICEkZXZlbnQudHlwZS5pbmRleE9mKFwia2V5XCIpICYmXG4gICAgICAgICAgICAgICAgICBfdm0uX2soJGV2ZW50LmtleUNvZGUsIFwiZW50ZXJcIiwgMTMsICRldmVudC5rZXksIFwiRW50ZXJcIilcbiAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBfdm0uJHBhcmVudC5zYXZlKClcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgaW5wdXQ6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgIGlmICgkZXZlbnQudGFyZ2V0LmNvbXBvc2luZykge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF92bS5wYXJlbnRNb2RlbCA9ICRldmVudC50YXJnZXQudmFsdWVcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgIF0pXG4gICAgICA6IF92bS5fZSgpLFxuICAgIF92bS5fdihcIiBcIiksXG4gICAgIV92bS4kcGFyZW50LmxvYWRpbmcgJiYgX3ZtLmlzU2VsZWN0b3JcbiAgICAgID8gX2MoXCJkaXZcIiwgW1xuICAgICAgICAgIF9jKFwibGFiZWxcIiwgW192bS5fdihfdm0uX3MoX3ZtLmlucHV0RGF0YS5sYWJlbCkpXSksXG4gICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImlucHV0LWdyb3VwXCIgfSwgW1xuICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgIFwiYnV0dG9uXCIsXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBkaXJlY3RpdmVzOiBbXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidG9vbHRpcFwiLFxuICAgICAgICAgICAgICAgICAgICByYXdOYW1lOiBcInYtdG9vbHRpcFwiLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZToge1xuICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IF92bS5lcnJvck1zZyxcbiAgICAgICAgICAgICAgICAgICAgICBwbGFjZW1lbnQ6IFwibGVmdFwiLFxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzZXM6IFtcImVycm9yXCJdXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246XG4gICAgICAgICAgICAgICAgICAgICAgXCJ7XFxuICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBlcnJvck1zZyxcXG4gICAgICAgICAgICAgICAgICAgIHBsYWNlbWVudDogJ2xlZnQnLFxcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NlczogWydlcnJvciddLFxcbiAgICAgICAgICAgICAgICB9XCJcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOlxuICAgICAgICAgICAgICAgICAgXCJjYXRlZ29yeV9zZWxlY3QgZm9ybS1jb250cm9sIHRleHQtbGVmdCBidXR0b25fc2VsZWN0XCIsXG4gICAgICAgICAgICAgICAgY2xhc3M6IHsgXCJpcy1pbnZhbGlkXCI6IF92bS5lcnJvck1zZyB9LFxuICAgICAgICAgICAgICAgIGF0dHJzOiB7IHR5cGU6IFwiYnV0dG9uXCIgfSxcbiAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICBfdm0uJHBhcmVudFtfdm0uaW5wdXREYXRhLm9uQ2xpY2tdKClcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIFtfdm0uX3YoX3ZtLl9zKF92bS5wYXJlbnRNb2RlbCkpXVxuICAgICAgICAgICAgKVxuICAgICAgICAgIF0pXG4gICAgICAgIF0pXG4gICAgICA6IF92bS5fZSgpLFxuICAgIF92bS5fdihcIiBcIiksXG4gICAgIV92bS4kcGFyZW50LmxvYWRpbmcgJiYgX3ZtLmlzQ2hlY2tib3hcbiAgICAgID8gX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJyZWxhdGl2ZVwiIH0sIFtcbiAgICAgICAgICBfYyhcbiAgICAgICAgICAgIFwibGFiZWxcIixcbiAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwidy0xMDBcIiwgYXR0cnM6IHsgZm9yOiBfdm0uaW5wdXREYXRhLm5hbWUgfSB9LFxuICAgICAgICAgICAgW192bS5fdihfdm0uX3MoX3ZtLmlucHV0RGF0YS5sYWJlbCkpXVxuICAgICAgICAgICksXG4gICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICBfYyhcbiAgICAgICAgICAgIFwibGFiZWxcIixcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiYWJzb2x1dGUgY3VzdG9tX2NoZWNrYm94XCIsXG4gICAgICAgICAgICAgIHN0YXRpY1N0eWxlOiB7IHJpZ2h0OiBcIjBcIiwgdG9wOiBcIjNweFwiIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIF9jKFwiaW5wdXRcIiwge1xuICAgICAgICAgICAgICAgIGRpcmVjdGl2ZXM6IFtcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJtb2RlbFwiLFxuICAgICAgICAgICAgICAgICAgICByYXdOYW1lOiBcInYtbW9kZWxcIixcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IF92bS5wYXJlbnRNb2RlbCxcbiAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCJwYXJlbnRNb2RlbFwiXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJub3RfZGVmYXVsdFwiLFxuICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICBpZDogX3ZtLmlucHV0RGF0YS5uYW1lLFxuICAgICAgICAgICAgICAgICAgbmFtZTogX3ZtLmlucHV0RGF0YS5uYW1lLFxuICAgICAgICAgICAgICAgICAgdHlwZTogXCJjaGVja2JveFwiXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBkb21Qcm9wczoge1xuICAgICAgICAgICAgICAgICAgY2hlY2tlZDogQXJyYXkuaXNBcnJheShfdm0ucGFyZW50TW9kZWwpXG4gICAgICAgICAgICAgICAgICAgID8gX3ZtLl9pKF92bS5wYXJlbnRNb2RlbCwgbnVsbCkgPiAtMVxuICAgICAgICAgICAgICAgICAgICA6IF92bS5wYXJlbnRNb2RlbFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciAkJGEgPSBfdm0ucGFyZW50TW9kZWwsXG4gICAgICAgICAgICAgICAgICAgICAgJCRlbCA9ICRldmVudC50YXJnZXQsXG4gICAgICAgICAgICAgICAgICAgICAgJCRjID0gJCRlbC5jaGVja2VkID8gdHJ1ZSA6IGZhbHNlXG4gICAgICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KCQkYSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICB2YXIgJCR2ID0gbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICQkaSA9IF92bS5faSgkJGEsICQkdilcbiAgICAgICAgICAgICAgICAgICAgICBpZiAoJCRlbC5jaGVja2VkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkJGkgPCAwICYmIChfdm0ucGFyZW50TW9kZWwgPSAkJGEuY29uY2F0KFskJHZdKSlcbiAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgJCRpID4gLTEgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKF92bS5wYXJlbnRNb2RlbCA9ICQkYVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zbGljZSgwLCAkJGkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNvbmNhdCgkJGEuc2xpY2UoJCRpICsgMSkpKVxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICBfdm0ucGFyZW50TW9kZWwgPSAkJGNcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgIF9jKFwic3BhblwiKVxuICAgICAgICAgICAgXVxuICAgICAgICAgIClcbiAgICAgICAgXSlcbiAgICAgIDogX3ZtLl9lKClcbiAgXSlcbn1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXG4gIGZ1bmN0aW9uKCkge1xuICAgIHZhciBfdm0gPSB0aGlzXG4gICAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gICAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gICAgcmV0dXJuIF9jKFxuICAgICAgXCJkaXZcIixcbiAgICAgIHsgc3RhdGljQ2xhc3M6IFwibGlzdC1wbGFjZWhvbGRlcl9pdGVtXCIsIHN0YXRpY1N0eWxlOiB7IGhlaWdodDogXCIzMHB4XCIgfSB9LFxuICAgICAgW1xuICAgICAgICBfYyhcImRpdlwiLCB7XG4gICAgICAgICAgc3RhdGljQ2xhc3M6IFwibGlzdC1wbGFjZWhvbGRlcl9jZWxsIHctMTAwXCIsXG4gICAgICAgICAgc3RhdGljU3R5bGU6IHsgd2lkdGg6IFwiMTAwJVwiIH1cbiAgICAgICAgfSlcbiAgICAgIF1cbiAgICApXG4gIH1cbl1cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxuXG5leHBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgX3ZtID0gdGhpc1xuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gIHJldHVybiBfYyhcImRpdlwiLCBbXG4gICAgX2MoXCJkaXZcIiwgW1xuICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJtb2RhbC1ib2R5XCIgfSwgW1xuICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcInJvd1wiIH0sIFtcbiAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImNvbC1zbS00IG5vLXByIGQtZmxleFwiIH0sIFtcbiAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICBcInVsXCIsXG4gICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwibmF2XCIgfSxcbiAgICAgICAgICAgICAgX3ZtLl9sKF92bS50YWJzLCBmdW5jdGlvbih0YWIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gX2MoXG4gICAgICAgICAgICAgICAgICBcImxpXCIsXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGtleTogdGFiLnNsdWcsXG4gICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcIm5hdi1pdGVtXCIsXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzOiB7IGFjdGl2ZTogdGFiLnN0YXRlIH1cbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgIFwiYVwiLFxuICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcIm5hdi1saW5rXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBhdHRyczogeyBocmVmOiBcImphdmFzY3JpcHQ6dm9pZCgwKVwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF92bS5zZWxlY3RUYWIodGFiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fcyh0YWIubmFtZSkgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICBfdm0uX20oMCwgdHJ1ZSlcbiAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAwXG4gICAgICAgICAgICApXG4gICAgICAgICAgXSksXG4gICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImNvbC1zbS04IG5vLXBsXCIgfSwgW1xuICAgICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJ0YWItY29udGVudCBuby1wbFwiIH0sIFtcbiAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJ0YWItcGFuZSBwLTNcIixcbiAgICAgICAgICAgICAgICAgIGNsYXNzOiB7IGFjdGl2ZTogX3ZtLnRhYnNbMF0uc3RhdGUgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgX2MoXCJGb3JtSW5wdXRcIiwge1xuICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgIGlucHV0RGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJpbnB1dFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwi0JDRgNGC0LjQutGD0LtcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZW50aXR5LmFydGljbGVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBcItCQ0YDRgtC40LrRg9C7INC00LXRgtCw0LvQuCAo0L3QtSDQsdC+0LvQtdC1IDY0INGB0LjQvNCy0L7Qu9C+0LIpXCJcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgIF9jKFwiRm9ybUlucHV0XCIsIHtcbiAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICBpbnB1dERhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiaW5wdXRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcItCd0LDQuNC80LXQvdC+0LLQsNC90LjQtVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJlbnRpdHkubmFtZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFwi0J3QsNC40LzQtdC90L7QstCw0L3QuNC1ICjQvdC1INCx0L7Qu9C10LUgMjU1INGB0LjQvNCy0L7Qu9C+0LIpXCJcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgIF9jKFwiRm9ybUlucHV0XCIsIHtcbiAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICBpbnB1dERhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwic2VsZWN0b3JcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcItCSINC60LDRgtC10LPQvtGA0LjQuFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJlbnRpdHkuY2F0ZWdvcnlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s6IFwic2VsZWN0Q2F0ZWdvcnlcIlxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgX2MoXCJGb3JtSW5wdXRcIiwge1xuICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgIGlucHV0RGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJzZWxlY3RvclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwi0J/RgNC+0LjQt9Cy0L7QtNC40YLQtdC70YxcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZW50aXR5LnN1cHBsaWVyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrOiBcInNlbGVjdFN1cHBsaWVyXCJcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwidGFiLXBhbmVcIixcbiAgICAgICAgICAgICAgICAgIGNsYXNzOiB7IGFjdGl2ZTogX3ZtLnRhYnNbMV0uc3RhdGUgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgW192bS5fbSgxKSwgX3ZtLl92KFwiIFwiKSwgX3ZtLl9tKDIpXVxuICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcInRhYi1wYW5lIHAtM1wiLFxuICAgICAgICAgICAgICAgICAgY2xhc3M6IHsgYWN0aXZlOiBfdm0udGFic1syXS5zdGF0ZSB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICBfdm0uc2hvcF9hY3RpdmF0ZWRcbiAgICAgICAgICAgICAgICAgICAgPyBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY1N0eWxlOiB7IGhlaWdodDogXCIzMTBweFwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IGlkOiBcInRhYl9tYWluXCIsIFwiZGF0YS1zaW1wbGViYXJcIjogXCJcIiB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcIkZvcm1JbnB1dFwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0RGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcImNoZWNrYm94XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcItCf0L7QutCw0LfQsNGC0Ywg0L3QsCDQs9C70LDQstC90L7QuSDRgdGC0YDQsNC90LjRhtC1XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZW50aXR5LnNob3Auc2V0dGluZ3Muc3BfbWFpblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJGb3JtSW5wdXRcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnB1dERhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJjaGVja2JveFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCLQkNC60YbQuNC+0L3QvdGL0Lkg0YLQvtCy0LDRgFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImVudGl0eS5zaG9wLnNldHRpbmdzLnNwX3N0b2NrXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcImRpdlwiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXdkXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3MoX3ZtLmVudGl0eS5zaG9wLnNldHRpbmdzKSArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgOiBfdm0uX2UoKSxcbiAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAhX3ZtLnNob3BfYWN0aXZhdGVkXG4gICAgICAgICAgICAgICAgICAgID8gX2MoXCJkaXZcIiwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwi0JDQutGC0LjQstC40YDRg9C50YLQtSDQuNC90YLQtdGA0L3QtdGCLdC80LDQs9Cw0LfQuNC9INCyIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcImFcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJhamF4LW5hdlwiLCBhdHRyczogeyBocmVmOiBcIiNcIiB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFtfdm0uX3YoXCLQvdCw0YHRgtGA0L7QudC60LDRhVwiKV1cbiAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICAgOiBfdm0uX2UoKSxcbiAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAhX3ZtLnNob3BfYWN0aXZhdGVkXG4gICAgICAgICAgICAgICAgICAgID8gX2MoXCJkaXZcIiwgW192bS5fdihcItCt0YLQviDQsdC10YHQv9C70LDRgtC90L4uXCIpXSlcbiAgICAgICAgICAgICAgICAgICAgOiBfdm0uX2UoKVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJ0YWItcGFuZSBwLTNcIixcbiAgICAgICAgICAgICAgICAgIGNsYXNzOiB7IGFjdGl2ZTogX3ZtLnRhYnNbM10uc3RhdGUgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgX2MoXCJGb3JtSW5wdXRcIiwge1xuICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgIGlucHV0RGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJpbnB1dFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwi0KjRgtGA0LjRhS3QutC+0LQg0L/RgNC+0LjQt9Cy0L7QtNC40YLQtdC70Y8gKEVBTiAxMylcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYmFyY29kZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZXM6IF92bS5tZXNzYWdlcyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBcItCo0YLRgNC40YXQutC+0LRcIlxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgX2MoXCJGb3JtSW5wdXRcIiwge1xuICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgIGlucHV0RGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJpbnB1dFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwi0JLQvdGD0YLRgNC10L3QvdC40Lkg0YjRgtGA0LjRhS3QutC+0LQgKEVBTiAxMylcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYmFyY29kZV9sb2NhbFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZXM6IF92bS5tZXNzYWdlcyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBcItCo0YLRgNC40YXQutC+0LQg0YHQutC70LDQtNCwXCJcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIF0pXG4gICAgICAgICAgXSlcbiAgICAgICAgXSlcbiAgICAgIF0pLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwibW9kYWwtZm9vdGVyXCIgfSwgW1xuICAgICAgICBfYyhcbiAgICAgICAgICBcImJ1dHRvblwiLFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImJ1dHRvbiB3aGl0ZVwiLFxuICAgICAgICAgICAgYXR0cnM6IHsgdHlwZTogXCJzdWJtaXRcIiB9LFxuICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBfdm0uJHBhcmVudC5jbG9zZURpYWxvZyhfdm0uZGlhbG9nKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBbX3ZtLl92KFwi0JfQsNC60YDRi9GC0YxcIildXG4gICAgICAgICksXG4gICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgIF9jKFxuICAgICAgICAgIFwiYnV0dG9uXCIsXG4gICAgICAgICAge1xuICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiYnV0dG9uIHByaW1hcnkgcHVsbC1yaWdodFwiLFxuICAgICAgICAgICAgYXR0cnM6IHsgdHlwZTogXCJzdWJtaXRcIiB9LFxuICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBfdm0uc2F2ZSgpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIFtfdm0uX3YoXCLQodC+0YXRgNCw0L3QuNGC0YxcIildXG4gICAgICAgIClcbiAgICAgIF0pLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwic3lzdGVtX21lc3NhZ2VcIiB9KVxuICAgIF0pXG4gIF0pXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW1xuICBmdW5jdGlvbigpIHtcbiAgICB2YXIgX3ZtID0gdGhpc1xuICAgIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICAgIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICAgIHJldHVybiBfYyhcInNwYW5cIiwgeyBzdGF0aWNDbGFzczogXCJmbG9hdC1yaWdodCBoZWxwZXJfZGFuZ2VyIGQtbm9uZS1mXCIgfSwgW1xuICAgICAgX2MoXCJpXCIsIHtcbiAgICAgICAgc3RhdGljQ2xhc3M6IFwiZmEgZmEtZXhjbGFtYXRpb24tdHJpYW5nbGUgdGV4dC1tZCBtbC0yIHRleHQtZGFuZ2VyXCJcbiAgICAgIH0pXG4gICAgXSlcbiAgfSxcbiAgZnVuY3Rpb24oKSB7XG4gICAgdmFyIF92bSA9IHRoaXNcbiAgICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgICByZXR1cm4gX2MoXCJ0YWJsZVwiLCB7IHN0YXRpY0NsYXNzOiBcInRhYmxlIHctMTAwXCIgfSwgW1xuICAgICAgX2MoXCJ0aGVhZFwiLCBbXG4gICAgICAgIF9jKFwidHJcIiwgW1xuICAgICAgICAgIF9jKFwidGhcIiwgW192bS5fdihcItCh0LrQu9Cw0LRcIildKSxcbiAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgIF9jKFwidGhcIiwgW192bS5fdihcItCa0L7Qu9C40YfQtdGB0YLQstC+XCIpXSksXG4gICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICBfYyhcInRoXCIsIFtfdm0uX3YoXCLQpdGA0LDQvdC10L3QuNC1XCIpXSlcbiAgICAgICAgXSlcbiAgICAgIF0pLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF9jKFwidGJvZHlcIiwgW1xuICAgICAgICBfYyhcInRyXCIsIFtcbiAgICAgICAgICBfYyhcInRkXCIsIFtcbiAgICAgICAgICAgIF92bS5fdihcbiAgICAgICAgICAgICAgXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgINCc0LDQs9Cw0LfQuNC9XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICApXG4gICAgICAgICAgXSksXG4gICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICBfYyhcInRkXCIsIFtcbiAgICAgICAgICAgIF92bS5fdihcbiAgICAgICAgICAgICAgXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDBcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgIClcbiAgICAgICAgICBdKSxcbiAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgIF9jKFwidGRcIiwgW1xuICAgICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJzdG9yYWdlX3N0b3JlX2NvbnRhaW5lclwiIH0sIFtcbiAgICAgICAgICAgICAgX2MoXCJpbnB1dFwiLCB7XG4gICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwic3RvcmFnZV9zdG9yZSBiYl8xXCIsXG4gICAgICAgICAgICAgICAgYXR0cnM6IHsgdmFsdWU6IFwiIFwiLCB0eXBlOiBcInRleHRcIiB9XG4gICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICBfYyhcImlucHV0XCIsIHtcbiAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJzdG9yYWdlX3N0b3JlIGJiXzJcIixcbiAgICAgICAgICAgICAgICBhdHRyczogeyB2YWx1ZTogXCIgXCIsIHR5cGU6IFwidGV4dFwiIH1cbiAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgIF9jKFwiaW5wdXRcIiwge1xuICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcInN0b3JhZ2Vfc3RvcmUgYmJfM1wiLFxuICAgICAgICAgICAgICAgIGF0dHJzOiB7IHZhbHVlOiBcIiBcIiwgdHlwZTogXCJ0ZXh0XCIgfVxuICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgX2MoXCJpbnB1dFwiLCB7XG4gICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwic3RvcmFnZV9zdG9yZSBiYl80XCIsXG4gICAgICAgICAgICAgICAgYXR0cnM6IHsgdmFsdWU6IFwiIFwiLCB0eXBlOiBcInRleHRcIiB9XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBdKVxuICAgICAgICAgIF0pXG4gICAgICAgIF0pXG4gICAgICBdKVxuICAgIF0pXG4gIH0sXG4gIGZ1bmN0aW9uKCkge1xuICAgIHZhciBfdm0gPSB0aGlzXG4gICAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gICAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gICAgcmV0dXJuIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiYm94IG10LTEwXCIgfSwgW1xuICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJiYl9mYXEgZmFxXzFcIiB9LCBbX3ZtLl92KFwi0JfQvtC90LAg0YXRgNCw0L3QtdC90LjRj1wiKV0pLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiYmJfZmFxIGZhcV8yXCIgfSwgW192bS5fdihcItCd0L7QvNC10YAg0YHRgtC10LvQu9Cw0LbQsFwiKV0pLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiYmJfZmFxIGZhcV8zXCIgfSwgW1xuICAgICAgICBfdm0uX3YoXCLQndC+0LzQtdGAINCy0LXRgNGC0LjQutCw0LvRjNC90L7QuSDRgdC10LrRhtC40Lgg0YHRgtC10LvQu9Cw0LbQsFwiKVxuICAgICAgXSksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJiYl9mYXEgZmFxXzRcIiB9LCBbX3ZtLl92KFwi0J3QvtC80LXRgCDQv9C+0LvQutC4XCIpXSlcbiAgICBdKVxuICB9XG5dXG5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcblxuZXhwb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSIsImxldCBjYXRlZ29yeU1peGluID0ge1xuICAgIG1ldGhvZHM6IHtcbiAgICAgICAgc2V0Q2F0ZWdvcnkoY2F0ZWdvcnkpe1xuICAgICAgICAgICAgdGhpcy5lbnRpdHkuY2F0ZWdvcnlfaWQgPSBjYXRlZ29yeS5pZDtcbiAgICAgICAgICAgIHRoaXMuZW50aXR5LmNhdGVnb3J5ID0gY2F0ZWdvcnkubmFtZTtcbiAgICAgICAgICAgIHRoaXMuJG5vdGlmeSh7XG4gICAgICAgICAgICAgICAgZ3JvdXA6ICdtYWluJyxcbiAgICAgICAgICAgICAgICB0eXBlOiAnc3VjY2VzcycsXG4gICAgICAgICAgICAgICAgdGV4dDogJ9Ca0LDRgtC10LPQvtGA0LjRjyDQstGL0LHRgNCw0L3QsCdcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBzZWxlY3RDYXRlZ29yeSgpe1xuICAgICAgICAgICAgdGhpcy4kZXZlbnRCdXMuJGVtaXQoJ29wZW5EaWFsb2cnLCB7XG4gICAgICAgICAgICAgICAgdGFnOiAnc2VsZWN0Q2F0ZWdvcnknLFxuICAgICAgICAgICAgICAgIHBhcmFtczoge3Jvb3RfY2F0ZWdvcnk6dGhpcy5yb290X2NhdGVnb3J5LCByZWY6IHRoaXN9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0UGFyZW50Q2F0ZWdvcnkoKXtcbiAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IHRydWU7XG4gICAgICAgICAgICB3aW5kb3cuYXhpb3Moe1xuICAgICAgICAgICAgICAgIG1ldGhvZDogJ2dldCcsXG4gICAgICAgICAgICAgICAgdXJsOiAnL2NhdGVnb3JpZXMvJyArIHRoaXMuZW50aXR5LmNhdGVnb3J5X2lkLFxuICAgICAgICAgICAgfSkudGhlbigocmVzcCkgPT4gIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVudGl0eS5jYXRlZ29yeV9pZCA9IHJlc3AuZGF0YS5pZDtcbiAgICAgICAgICAgICAgICB0aGlzLmVudGl0eS5jYXRlZ29yeSA9IHJlc3AuZGF0YS5uYW1lO1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgfVxufTtcbmV4cG9ydCBkZWZhdWx0IGNhdGVnb3J5TWl4aW47XG4iLCJsZXQgc3VwcGxpZXJNaXhpbiA9IHtcclxuICAgIG1ldGhvZHM6IHtcclxuICAgICAgICBzZXRTdXBwbGllcihzdXBwbGllcil7XHJcbiAgICAgICAgICAgIHRoaXMuZW50aXR5LnN1cHBsaWVyX2lkID0gc3VwcGxpZXIuaWQ7XHJcbiAgICAgICAgICAgIHRoaXMuZW50aXR5LnN1cHBsaWVyID0gc3VwcGxpZXIubmFtZTtcclxuICAgICAgICAgICAgdGhpcy4kbm90aWZ5KHtcclxuICAgICAgICAgICAgICAgIGdyb3VwOiAnbWFpbicsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiAnc3VjY2VzcycsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiAn0J/RgNC+0LjQt9Cy0L7QtNC40YLQtdC70Ywg0LLRi9Cx0YDQsNC9J1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNlbGVjdFN1cHBsaWVyKCl7XHJcbiAgICAgICAgICAgIHRoaXMuJGV2ZW50QnVzLiRlbWl0KCdvcGVuRGlhbG9nJywge1xyXG4gICAgICAgICAgICAgICAgdGFnOiAnc2VsZWN0U3VwcGxpZXInLFxyXG4gICAgICAgICAgICAgICAgcGFyYW1zOiB7cmVmOiB0aGlzfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG4gICAgfVxyXG59O1xyXG5leHBvcnQgZGVmYXVsdCBzdXBwbGllck1peGluO1xyXG4iLCJpbXBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IGZyb20gXCIuL0Zvcm1JbnB1dC52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9YTg1MmFjOWUmc2NvcGVkPXRydWUmXCJcbmltcG9ydCBzY3JpcHQgZnJvbSBcIi4vRm9ybUlucHV0LnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuZXhwb3J0ICogZnJvbSBcIi4vRm9ybUlucHV0LnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuXG5cbi8qIG5vcm1hbGl6ZSBjb21wb25lbnQgKi9cbmltcG9ydCBub3JtYWxpemVyIGZyb20gXCIhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3J1bnRpbWUvY29tcG9uZW50Tm9ybWFsaXplci5qc1wiXG52YXIgY29tcG9uZW50ID0gbm9ybWFsaXplcihcbiAgc2NyaXB0LFxuICByZW5kZXIsXG4gIHN0YXRpY1JlbmRlckZucyxcbiAgZmFsc2UsXG4gIG51bGwsXG4gIFwiYTg1MmFjOWVcIixcbiAgbnVsbFxuICBcbilcblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHtcbiAgdmFyIGFwaSA9IHJlcXVpcmUoXCJDOlxcXFxPcGVuU2VydmVyXFxcXGRvbWFpbnNcXFxcQXV0b0NSTVxcXFxub2RlX21vZHVsZXNcXFxcdnVlLWhvdC1yZWxvYWQtYXBpXFxcXGRpc3RcXFxcaW5kZXguanNcIilcbiAgYXBpLmluc3RhbGwocmVxdWlyZSgndnVlJykpXG4gIGlmIChhcGkuY29tcGF0aWJsZSkge1xuICAgIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgICBpZiAoIWFwaS5pc1JlY29yZGVkKCdhODUyYWM5ZScpKSB7XG4gICAgICBhcGkuY3JlYXRlUmVjb3JkKCdhODUyYWM5ZScsIGNvbXBvbmVudC5vcHRpb25zKVxuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVsb2FkKCdhODUyYWM5ZScsIGNvbXBvbmVudC5vcHRpb25zKVxuICAgIH1cbiAgICBtb2R1bGUuaG90LmFjY2VwdChcIi4vRm9ybUlucHV0LnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD1hODUyYWM5ZSZzY29wZWQ9dHJ1ZSZcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgYXBpLnJlcmVuZGVyKCdhODUyYWM5ZScsIHtcbiAgICAgICAgcmVuZGVyOiByZW5kZXIsXG4gICAgICAgIHN0YXRpY1JlbmRlckZuczogc3RhdGljUmVuZGVyRm5zXG4gICAgICB9KVxuICAgIH0pXG4gIH1cbn1cbmNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwicmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvc2VydmljZS9Gb3JtSW5wdXQudnVlXCJcbmV4cG9ydCBkZWZhdWx0IGNvbXBvbmVudC5leHBvcnRzIiwiaW1wb3J0IG1vZCBmcm9tIFwiLSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS00LTAhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9Gb3JtSW5wdXQudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiOyBleHBvcnQgZGVmYXVsdCBtb2Q7IGV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTQtMCEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0Zvcm1JbnB1dC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCIiLCJleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy90ZW1wbGF0ZUxvYWRlci5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vRm9ybUlucHV0LnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD1hODUyYWM5ZSZzY29wZWQ9dHJ1ZSZcIiIsImltcG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0gZnJvbSBcIi4vUHJvZHVjdERpYWxvZy52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9MTkwOTUyMjkmXCJcbmltcG9ydCBzY3JpcHQgZnJvbSBcIi4vUHJvZHVjdERpYWxvZy52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcbmV4cG9ydCAqIGZyb20gXCIuL1Byb2R1Y3REaWFsb2cudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5cblxuLyogbm9ybWFsaXplIGNvbXBvbmVudCAqL1xuaW1wb3J0IG5vcm1hbGl6ZXIgZnJvbSBcIiEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvcnVudGltZS9jb21wb25lbnROb3JtYWxpemVyLmpzXCJcbnZhciBjb21wb25lbnQgPSBub3JtYWxpemVyKFxuICBzY3JpcHQsXG4gIHJlbmRlcixcbiAgc3RhdGljUmVuZGVyRm5zLFxuICBmYWxzZSxcbiAgbnVsbCxcbiAgbnVsbCxcbiAgbnVsbFxuICBcbilcblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHtcbiAgdmFyIGFwaSA9IHJlcXVpcmUoXCJDOlxcXFxPcGVuU2VydmVyXFxcXGRvbWFpbnNcXFxcQXV0b0NSTVxcXFxub2RlX21vZHVsZXNcXFxcdnVlLWhvdC1yZWxvYWQtYXBpXFxcXGRpc3RcXFxcaW5kZXguanNcIilcbiAgYXBpLmluc3RhbGwocmVxdWlyZSgndnVlJykpXG4gIGlmIChhcGkuY29tcGF0aWJsZSkge1xuICAgIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgICBpZiAoIWFwaS5pc1JlY29yZGVkKCcxOTA5NTIyOScpKSB7XG4gICAgICBhcGkuY3JlYXRlUmVjb3JkKCcxOTA5NTIyOScsIGNvbXBvbmVudC5vcHRpb25zKVxuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVsb2FkKCcxOTA5NTIyOScsIGNvbXBvbmVudC5vcHRpb25zKVxuICAgIH1cbiAgICBtb2R1bGUuaG90LmFjY2VwdChcIi4vUHJvZHVjdERpYWxvZy52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9MTkwOTUyMjkmXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGFwaS5yZXJlbmRlcignMTkwOTUyMjknLCB7XG4gICAgICAgIHJlbmRlcjogcmVuZGVyLFxuICAgICAgICBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZuc1xuICAgICAgfSlcbiAgICB9KVxuICB9XG59XG5jb21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcInJlc291cmNlcy9qcy9jb21wb25lbnRzL3RlbXBsYXRlL0RpYWxvZ3MvUHJvZHVjdERpYWxvZy52dWVcIlxuZXhwb3J0IGRlZmF1bHQgY29tcG9uZW50LmV4cG9ydHMiLCJpbXBvcnQgbW9kIGZyb20gXCItIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTQtMCEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL1Byb2R1Y3REaWFsb2cudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiOyBleHBvcnQgZGVmYXVsdCBtb2Q7IGV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTQtMCEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL1Byb2R1Y3REaWFsb2cudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiIiwiZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvdGVtcGxhdGVMb2FkZXIuanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL1Byb2R1Y3REaWFsb2cudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTE5MDk1MjI5JlwiIl0sInNvdXJjZVJvb3QiOiIifQ==