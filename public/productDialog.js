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
        sp_discount_type: "1",
        sp_main: false,
        sp_stock: false,
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
                          "\n                                " +
                            _vm._s(tab.name) +
                            "\n                                "
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
                        name: "entity.category.name",
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
                        name: "entity.supplier.name",
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
                                name: "entity.sp_main"
                              }
                            }
                          }),
                          _vm._v(" "),
                          _c("FormInput", {
                            attrs: {
                              inputData: {
                                type: "checkbox",
                                label: "Акционный товар",
                                name: "entity.sp_stock"
                              }
                            }
                          }),
                          _vm._v(" "),
                          _c(
                            "div",
                            {
                              staticClass: "stocks",
                              class: { "d-none": !_vm.entity.sp_stock }
                            },
                            [
                              _vm._m(3),
                              _vm._v(" "),
                              _c("div", { staticClass: "form-group row" }, [
                                _c("label", { staticClass: "col-sm-4" }, [
                                  _vm._v("Скидка")
                                ]),
                                _vm._v(" "),
                                _c(
                                  "div",
                                  { staticClass: "input-group col-sm-8" },
                                  [
                                    _c("input", {
                                      staticClass:
                                        "form-control discount mr-10",
                                      attrs: { type: "number" }
                                    }),
                                    _vm._v(" "),
                                    _c("Selector", {
                                      attrs: {
                                        data: {
                                          model: "entity.sp_discount_type",
                                          default_value: 1,
                                          elements: [
                                            { name: "в рублях", value: 1 },
                                            { name: "в процентах", value: 0 }
                                          ]
                                        }
                                      }
                                    })
                                  ],
                                  1
                                )
                              ]),
                              _vm._v(" "),
                              _vm._m(4),
                              _vm._v(" "),
                              _vm._m(5)
                            ]
                          )
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
              "\n                                        Магазин\n                                    "
            )
          ]),
          _vm._v(" "),
          _c("td", [
            _vm._v(
              "\n                                        0\n                                    "
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
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "form-group row" }, [
      _c("label", { staticClass: "col-sm-4" }, [_vm._v("Цена")]),
      _vm._v(" "),
      _c("div", { staticClass: "input-group col-sm-8" }, [
        _c("input", {
          staticClass: "form-control discount",
          attrs: { type: "number" }
        })
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "flex-1" }, [
      _c("div", { staticClass: "form-group" }, [
        _c("label", [_vm._v("Цена")]),
        _vm._v(" "),
        _c("input", {
          staticClass: "form-control discount",
          attrs: { type: "number" }
        })
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "flex-3" }, [
      _c("div", { staticClass: "form-group" }, [
        _c("input", {
          staticClass: "form-control price",
          attrs: { type: "number", disabled: "" }
        })
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "form-group d-flex" }, [
        _c("div", { staticClass: "flex-1" }),
        _vm._v(" "),
        _c("div", { staticClass: "ml-5 flex-1" }, [
          _c("select", { staticClass: "type" }, [_c("option", [_vm._v("345")])])
        ])
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "form-group" }, [
        _c("input", {
          staticClass: "form-control total",
          attrs: { type: "number", disabled: "" }
        })
      ])
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvc2VydmljZS9Gb3JtSW5wdXQudnVlIiwid2VicGFjazovLy9yZXNvdXJjZXMvanMvY29tcG9uZW50cy90ZW1wbGF0ZS9EaWFsb2dzL1Byb2R1Y3REaWFsb2cudnVlIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9qcy9jb21wb25lbnRzL3NlcnZpY2UvRm9ybUlucHV0LnZ1ZT9jZTk1Iiwid2VicGFjazovLy8uL3Jlc291cmNlcy9qcy9jb21wb25lbnRzL3RlbXBsYXRlL0RpYWxvZ3MvUHJvZHVjdERpYWxvZy52dWU/NWRhYyIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvY29tcG9uZW50cy9taXhpbnMvY2F0ZWdvcnlNaXhpbi5qcyIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvY29tcG9uZW50cy9taXhpbnMvc3VwcGxpZXJNaXhpbi5qcyIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvY29tcG9uZW50cy9zZXJ2aWNlL0Zvcm1JbnB1dC52dWUiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvc2VydmljZS9Gb3JtSW5wdXQudnVlPzAxZDYiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvc2VydmljZS9Gb3JtSW5wdXQudnVlPzFiYTciLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvdGVtcGxhdGUvRGlhbG9ncy9Qcm9kdWN0RGlhbG9nLnZ1ZSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvY29tcG9uZW50cy90ZW1wbGF0ZS9EaWFsb2dzL1Byb2R1Y3REaWFsb2cudnVlP2E0N2QiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvdGVtcGxhdGUvRGlhbG9ncy9Qcm9kdWN0RGlhbG9nLnZ1ZT9iM2IxIl0sIm5hbWVzIjpbImNhdGVnb3J5TWl4aW4iLCJtZXRob2RzIiwic2V0Q2F0ZWdvcnkiLCJjYXRlZ29yeSIsImVudGl0eSIsImlkIiwibmFtZSIsIiRub3RpZnkiLCJncm91cCIsInR5cGUiLCJ0ZXh0Iiwic2VsZWN0Q2F0ZWdvcnkiLCIkZXZlbnRCdXMiLCIkZW1pdCIsInRhZyIsInBhcmFtcyIsInJvb3RfY2F0ZWdvcnkiLCJyZWYiLCJnZXRQYXJlbnRDYXRlZ29yeSIsImxvYWRpbmciLCJ3aW5kb3ciLCJheGlvcyIsIm1ldGhvZCIsInVybCIsInRoZW4iLCJyZXNwIiwiZGF0YSIsInN1cHBsaWVyTWl4aW4iLCJzZXRTdXBwbGllciIsInN1cHBsaWVyIiwic2VsZWN0U3VwcGxpZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWtEQTtBQUNBLHNCQURBO0FBRUEsbUJBRkE7QUFHQTtBQUNBO0FBQ0E7QUFEQTtBQUdBLEdBUEE7QUFRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQSxTQUxBO0FBTUE7QUFDQSxPQVhBO0FBWUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FGQSxNQUVBO0FBQ0E7QUFDQTtBQUNBLFNBTkE7QUFPQTtBQXRCQSxLQURBO0FBeUJBLFlBekJBLHNCQXlCQTtBQUNBO0FBQ0EsS0EzQkE7QUE0QkEsV0E1QkEscUJBNEJBO0FBQ0E7QUFDQSxLQTlCQTtBQStCQSxjQS9CQSx3QkErQkE7QUFDQTtBQUNBLEtBakNBO0FBa0NBLGNBbENBLHdCQWtDQTtBQUNBO0FBQ0E7QUFwQ0EsR0FSQTtBQThDQSxTQTlDQSxxQkE4Q0E7QUFBQTs7QUFDQTtBQUNBO0FBQ0EsS0FGQSxFQUVBO0FBQ0E7QUFEQSxLQUZBO0FBS0EsR0FwREE7QUFxREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFiQSxHQXJEQTtBQW9FQTtBQUNBLGlCQURBLDJCQUNBO0FBQ0E7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QUFVLEVBQUUsWUFpQmY7QUFDRDtBQUNlLGdGOzs7Ozs7Ozs7Ozs7QUN0Q2Y7QUFBQTtBQUFBLHdDQUErTCxDQUFnQixxUEFBRyxFQUFDLEM7Ozs7Ozs7Ozs7OztBQ0FuTjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7Ozs7Ozs7Ozs7Ozs7QUNBQTtBQUFBO0FBQUE7QUFBQTtBQUE0RjtBQUMzQjtBQUNMOzs7QUFHNUQ7QUFDbUc7QUFDbkcsZ0JBQWdCLDJHQUFVO0FBQzFCLEVBQUUsbUZBQU07QUFDUixFQUFFLHdGQUFNO0FBQ1IsRUFBRSxpR0FBZTtBQUNqQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLElBQUksS0FBVSxFQUFFLFlBaUJmO0FBQ0Q7QUFDZSxnRjs7Ozs7Ozs7Ozs7O0FDdENmO0FBQUE7QUFBQSx3Q0FBeU0sQ0FBZ0IseVBBQUcsRUFBQyxDOzs7Ozs7Ozs7Ozs7QUNBN047QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBIiwiZmlsZSI6InByb2R1Y3REaWFsb2cuanMiLCJzb3VyY2VzQ29udGVudCI6WyI8dGVtcGxhdGU+XG4gICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj5cbiAgICAgICAgPGRpdiB2LWlmPVwiISRwYXJlbnQubG9hZGluZyAmJiBpc0lucHV0XCI+XG4gICAgICAgICAgICA8bGFiZWw+e3sgaW5wdXREYXRhLmxhYmVsIH19PC9sYWJlbD5cbiAgICAgICAgICAgIDxkaXYgdi1pZj1cIiRwYXJlbnQubG9hZGluZ1wiIGNsYXNzPVwibGlzdC1wbGFjZWhvbGRlclwiIHN0eWxlPVwiaGVpZ2h0OiAzMHB4O1wiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJsaXN0LXBsYWNlaG9sZGVyX2l0ZW1cIiBzdHlsZT1cImhlaWdodDogMzBweDtcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImxpc3QtcGxhY2Vob2xkZXJfY2VsbCB3LTEwMFwiIHN0eWxlPVwid2lkdGg6IDEwMCVcIiA+PC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxpbnB1dCAgQGtleXByZXNzLmVudGVyPVwiJHBhcmVudC5zYXZlKClcIlxuICAgICAgICAgICAgICAgICAgICB2LWJpbmQ6Y2xhc3M9XCJ7J2lzLWludmFsaWQnOmVycm9yTXNnfVwiXG4gICAgICAgICAgICAgICAgICAgIHYtdG9vbHRpcD1cIntcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IGVycm9yTXNnLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2VtZW50OiAnbGVmdCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc2VzOiBbJ2Vycm9yJ10sXG4gICAgICAgICAgICAgICAgICAgIH1cIlxuICAgICAgICAgICAgICAgICAgICB2LW1vZGVsPVwicGFyZW50TW9kZWxcIlxuICAgICAgICAgICAgICAgICAgICB2LWJpbmQ6cGxhY2Vob2xkZXI9XCJpbnB1dERhdGEucGxhY2Vob2xkZXJcIlxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCI+XG4gICAgICAgIDwvZGl2PlxuXG5cbiAgICAgICAgPGRpdiB2LWlmPVwiISRwYXJlbnQubG9hZGluZyAmJiBpc1NlbGVjdG9yXCIgPlxuICAgICAgICAgICAgPGxhYmVsPnt7IGlucHV0RGF0YS5sYWJlbCB9fTwvbGFiZWw+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXBcIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIHYtYmluZDpjbGFzcz1cInsnaXMtaW52YWxpZCc6ZXJyb3JNc2d9XCJcbiAgICAgICAgICAgICAgICAgICAgdi10b29sdGlwPVwie1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogZXJyb3JNc2csXG4gICAgICAgICAgICAgICAgICAgICAgICBwbGFjZW1lbnQ6ICdsZWZ0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzZXM6IFsnZXJyb3InXSxcbiAgICAgICAgICAgICAgICAgICAgfVwiXG4gICAgICAgICAgICAgICAgICAgIHYtb246Y2xpY2s9XCIkcGFyZW50W2lucHV0RGF0YS5vbkNsaWNrXSgpXCJcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzPVwiY2F0ZWdvcnlfc2VsZWN0IGZvcm0tY29udHJvbCB0ZXh0LWxlZnQgYnV0dG9uX3NlbGVjdFwiPnt7IHBhcmVudE1vZGVsIH19PC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cblxuICAgICAgICA8ZGl2IHYtaWY9XCIhJHBhcmVudC5sb2FkaW5nICYmIGlzQ2hlY2tib3hcIiBjbGFzcz1cInJlbGF0aXZlXCI+XG4gICAgICAgICAgICA8bGFiZWwgdi1iaW5kOmZvcj1cImlucHV0RGF0YS5uYW1lXCIgY2xhc3M9XCJ3LTEwMFwiPnt7IGlucHV0RGF0YS5sYWJlbCB9fTwvbGFiZWw+XG4gICAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJhYnNvbHV0ZSBjdXN0b21fY2hlY2tib3hcIiBzdHlsZT1cInJpZ2h0OiAwOyB0b3A6IDNweDtcIj5cbiAgICAgICAgICAgICAgICA8aW5wdXQgdi1iaW5kOmlkPVwiaW5wdXREYXRhLm5hbWVcIiB2LW1vZGVsPVwicGFyZW50TW9kZWxcIiB2LWJpbmQ6bmFtZT1cImlucHV0RGF0YS5uYW1lXCIgdHlwZT1cImNoZWNrYm94XCIgY2xhc3M9XCJub3RfZGVmYXVsdFwiLz5cbiAgICAgICAgICAgICAgICA8c3Bhbj48L3NwYW4+XG4gICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG4gICAgZXhwb3J0IGRlZmF1bHQge1xuICAgICAgICBwcm9wczpbJ2lucHV0RGF0YSddLFxuICAgICAgICBuYW1lOiBcIkZvcm1JbnB1dFwiLFxuICAgICAgICBkYXRhOiAoKT0+IHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgZXJyb3I6bnVsbCxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgY29tcHV0ZWQ6e1xuICAgICAgICAgICAgcGFyZW50TW9kZWw6e1xuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgbmFtZV9hcnIgPSB0aGlzLmlucHV0RGF0YS5uYW1lLnNwbGl0KCcuJyk7XG4gICAgICAgICAgICAgICAgICAgIGxldCB0YXJnZXQgPSB0aGlzLiRwYXJlbnQ7XG4gICAgICAgICAgICAgICAgICAgIG5hbWVfYXJyLmZvckVhY2goKGl0ZW0sIGluZGV4KT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoIXRhcmdldFtpdGVtXSAmJiBuYW1lX2FycltpbmRleCArIDFdKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRbaXRlbV0gPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldCA9IHRhcmdldFtpdGVtXTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0YXJnZXQ7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5hbWVfYXJyID0gdGhpcy5pbnB1dERhdGEubmFtZS5zcGxpdCgnLicpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgdGFyZ2V0ID0gdGhpcy4kcGFyZW50O1xuICAgICAgICAgICAgICAgICAgICBuYW1lX2Fyci5mb3JFYWNoKChpdGVtLCBpbmRleCk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKG5hbWVfYXJyW2luZGV4ICsgMV0pe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldCA9IHRhcmdldFtpdGVtXVxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRbaXRlbV0gPSB2YWw7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvck1zZygpe1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmVycm9yID8gdGhpcy5lcnJvciA6IGZhbHNlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGlzSW5wdXQoKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5pbnB1dERhdGEudHlwZSA9PT0gJ2lucHV0JztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpc1NlbGVjdG9yKCl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaW5wdXREYXRhLnR5cGUgPT09ICdzZWxlY3Rvcic7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaXNDaGVja2JveCgpe1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmlucHV0RGF0YS50eXBlID09PSAnY2hlY2tib3gnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBtb3VudGVkKCl7XG4gICAgICAgICAgICB0aGlzLiR3YXRjaCgnJHBhcmVudC4nICsgdGhpcy5pbnB1dERhdGEubmFtZSwgKHZhbCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZXJyb3IgPSBudWxsO1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGRlZXA6IHRydWVcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0sXG4gICAgICAgIHdhdGNoOiB7XG4gICAgICAgICAgICAvLyAnJHBhcmVudC5lbnRpdHknOntcbiAgICAgICAgICAgIC8vICAgICBoYW5kbGVyKGVudGl0eSl7XG4gICAgICAgICAgICAvLyAgICAgICAgIHRoaXMuZXJyb3IgPSBudWxsO1xuICAgICAgICAgICAgLy8gICAgIH0sXG4gICAgICAgICAgICAvLyAgICAgZGVlcDogdHJ1ZVxuICAgICAgICAgICAgLy8gfSxcbiAgICAgICAgICAgICckcGFyZW50Lm1lc3NhZ2VzJzpmdW5jdGlvbiAobWVzc2FnZXMpe1xuICAgICAgICAgICAgICAgIGxldCBuYW1lID0gdGhpcy5nZXRUYXJnZXROYW1lKCk7XG4gICAgICAgICAgICAgICAgaWYobWVzc2FnZXNbbmFtZV0gfHwgbWVzc2FnZXNbbmFtZSArICdfaWQnXSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgbWVzc2FnZSA9IG1lc3NhZ2VzW25hbWVdIHx8IG1lc3NhZ2VzW25hbWUgKyAnX2lkJ107XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0RXJyb3IobWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgbWV0aG9kczp7XG4gICAgICAgICAgICBnZXRUYXJnZXROYW1lKCl7XG4gICAgICAgICAgICAgICAgbGV0IG5hbWVfYXJyID0gdGhpcy5pbnB1dERhdGEubmFtZS5zcGxpdCgnLicpO1xuICAgICAgICAgICAgICAgIHJldHVybiBuYW1lX2Fyci5zbGljZSgtMSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0RXJyb3IoZXJyb3Ipe1xuICAgICAgICAgICAgICAgIHRoaXMuZXJyb3IgPSBlcnJvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICB9XG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbjwhLS12LXZhbGlkYXRlPVwie25hbWU6J25hbWUnfVwiIHYtYmluZDpjbGFzcz1cInsnaXMtaW52YWxpZCcgOiBoYXNFcnJvcignbmFtZScpfVwiLS0+XG4iLCI8dGVtcGxhdGU+XG4gICAgPGRpdj5cbiAgICAgICAgPCEtLSAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGFsLWhlYWRlciBkYXJrXCIgc3R5bGU9XCJqdXN0aWZ5LWNvbnRlbnQ6IG5vcm1hbDtcIj4tLT5cbiAgICAgICAgPCEtLSAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1hbHQtaGVhZGVyXCI+LS0+XG4gICAgICAgIDwhLS0gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJpdGVtLXRpdGxlIF81MDBcIj7QoNC+0LfQvdC40YfQvdCw0Y8g0YbQtdC90LA8L3NwYW4+LS0+XG4gICAgICAgIDwhLS0gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIml0ZW0tZXhjZXB0IGZvbnQtd2VpZ2h0LWJvbGRlciBoLTF4XCI+LS0+XG4gICAgICAgIDwhLS0gICAgICAgICAgICAgICAgPHNwYW4gaWQ9XCJ0b3RhbF9wcmljZVwiPi0tPlxuICAgICAgICA8IS0tICAgICAgICAgICAgICAgICAgIHt7ICRwcm9kdWN0LT5zdG9yZXMtPmZpbmQoQXV0aDo6dXNlcigpLT5jdXJyZW50X3N0b3JlKS0+cGl2b3QtPnJldGFpbF9wcmljZSA/PyAnMCcgfX0tLT5cbiAgICAgICAgPCEtLSAgICAgICAgICAgICAgICA8L3NwYW4+LS0+XG4gICAgICAgIDwhLS0gICAgICAgICAgICAgICAgPC9kaXY+LS0+XG4gICAgICAgIDwhLS0gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIml0ZW0tdGFnIHRhZyBoaWRlXCI+LS0+XG4gICAgICAgIDwhLS0gICAgICAgICAgICAgICAgPC9kaXY+LS0+XG4gICAgICAgIDwhLS0gICAgICAgICAgICA8L2Rpdj4tLT5cbiAgICAgICAgPCEtLSAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1hbHQtaGVhZGVyXCI+LS0+XG4gICAgICAgIDwhLS0gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJpdGVtLXRpdGxlIF81MDBcIj7QndCwINGB0LLQvtC10Lwg0YHQutC70LDQtNC1IC8g0L3QsCDQtNGA0YPQs9C40YU8L3NwYW4+LS0+XG4gICAgICAgIDwhLS0gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIml0ZW0tZXhjZXB0IGZvbnQtd2VpZ2h0LWJvbGRlciBoLTF4XCI+LS0+XG4gICAgICAgIDwhLS0gICAgICAgICAgICAgICAgPHNwYW4gaWQ9XCJ0b3RhbF9wcmljZVwiPi0tPlxuICAgICAgICA8IS0tICAgICAgICAgICAgICAgICAgIHt7ICRwcm9kdWN0LT5nZXRDb3VudFNlbGZPdGhlcnMoKSB9fS0tPlxuICAgICAgICA8IS0tICAgICAgICAgICAgICAgIDwvc3Bhbj4tLT5cbiAgICAgICAgPCEtLSAgICAgICAgICAgICAgICA8L2Rpdj4tLT5cbiAgICAgICAgPCEtLSAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaXRlbS10YWcgdGFnIGhpZGVcIj4tLT5cbiAgICAgICAgPCEtLSAgICAgICAgICAgICAgICA8L2Rpdj4tLT5cbiAgICAgICAgPCEtLSAgICAgICAgICAgIDwvZGl2Pi0tPlxuICAgICAgICA8IS0tICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGFsLWFsdC1oZWFkZXJcIj4tLT5cbiAgICAgICAgPCEtLSAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cIml0ZW0tdGl0bGUgXzUwMFwiPtCl0YDQsNC90LXQvdC40LU8L3NwYW4+LS0+XG4gICAgICAgIDwhLS0gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIml0ZW0tZXhjZXB0IGZvbnQtd2VpZ2h0LWJvbGRlciBoLTF4XCI+LS0+XG4gICAgICAgIDwhLS0gICAgICAgICAgICAgICAgPHNwYW4gaWQ9XCJ0b3RhbF9wcmljZVwiPi0tPlxuICAgICAgICA8IS0tICAgICAgICAgICAgICAgICAgIHshISAkcHJvZHVjdC0+Z2V0U3RvcmFnZUNvZGUoKSAhIX0tLT5cbiAgICAgICAgPCEtLSAgICAgICAgICAgICAgICA8L3NwYW4+LS0+XG4gICAgICAgIDwhLS0gICAgICAgICAgICAgICAgPC9kaXY+LS0+XG4gICAgICAgIDwhLS0gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIml0ZW0tdGFnIHRhZyBoaWRlXCI+LS0+XG4gICAgICAgIDwhLS0gICAgICAgICAgICAgICAgPC9kaXY+LS0+XG4gICAgICAgIDwhLS0gICAgICAgICAgICA8L2Rpdj4tLT5cbiAgICAgICAgPCEtLSAgICAgICAgPC9kaXY+LS0+XG5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1ib2R5XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJvd1wiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLXNtLTQgbm8tcHIgZC1mbGV4XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dWwgY2xhc3M9XCJuYXZcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGkgdi1mb3I9XCJ0YWIgaW4gdGFic1wiIHYtYmluZDprZXk9XCJ0YWIuc2x1Z1wiIHYtYmluZDpjbGFzcz1cInsnYWN0aXZlJyA6IHRhYi5zdGF0ZX1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cIm5hdi1pdGVtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIHYtb246Y2xpY2s9XCJzZWxlY3RUYWIodGFiKVwiIGNsYXNzPVwibmF2LWxpbmtcIiBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7eyB0YWIubmFtZSB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJmbG9hdC1yaWdodCBoZWxwZXJfZGFuZ2VyIGQtbm9uZS1mXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhIGZhLWV4Y2xhbWF0aW9uLXRyaWFuZ2xlIHRleHQtbWQgbWwtMiB0ZXh0LWRhbmdlclwiPjwvaT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLXNtLTggbm8tcGxcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0YWItY29udGVudCBuby1wbFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0YWItcGFuZSBwLTNcIiB2LWJpbmQ6Y2xhc3M9XCJ7J2FjdGl2ZScgOiB0YWJzWzBdLnN0YXRlfVwiPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwhLS0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgaWQ9XCJwcm92aWRlcl9zZWFyY2hfY29udGFpbmVyXCIgY2xhc3M9XCJwcm92aWRlcl9zZWFyY2hfY29udGFpbmVyIGZhZGVcIiBkYXRhLXNpbXBsZWJhciBzdHlsZT1cImhlaWdodDogMzAwcHg7XCI+LS0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwhLS0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29udFwiPjwvZGl2Pi0tPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8IS0tICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImVtcHR5X3NlYXJjaFwiPi0tPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8IS0tICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJvdXRfb2Zfc2VhcmNoXCI+PC9kaXY+LS0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwhLS0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtY2VudGVyXCI+0KDQtdC30YPQu9GM0YLQsNGC0L7QsiDQvdC10YI8L2Rpdj4tLT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPCEtLSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2Pi0tPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8IS0tICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj4tLT5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybUlucHV0IHYtYmluZDppbnB1dERhdGE9XCJ7dHlwZTonaW5wdXQnLGxhYmVsOifQkNGA0YLQuNC60YPQuycsbmFtZTonZW50aXR5LmFydGljbGUnLCBwbGFjZWhvbGRlcjon0JDRgNGC0LjQutGD0Lsg0LTQtdGC0LDQu9C4ICjQvdC1INCx0L7Qu9C10LUgNjQg0YHQuNC80LLQvtC70L7QsiknfVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtSW5wdXQgdi1iaW5kOmlucHV0RGF0YT1cInt0eXBlOidpbnB1dCcsbGFiZWw6J9Cd0LDQuNC80LXQvdC+0LLQsNC90LjQtScsbmFtZTonZW50aXR5Lm5hbWUnLCBwbGFjZWhvbGRlcjon0J3QsNC40LzQtdC90L7QstCw0L3QuNC1ICjQvdC1INCx0L7Qu9C10LUgMjU1INGB0LjQvNCy0L7Qu9C+0LIpJ31cIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybUlucHV0IHYtYmluZDppbnB1dERhdGE9XCJ7dHlwZTonc2VsZWN0b3InLGxhYmVsOifQkiDQutCw0YLQtdCz0L7RgNC40LgnLG5hbWU6J2VudGl0eS5jYXRlZ29yeS5uYW1lJywgb25DbGljazonc2VsZWN0Q2F0ZWdvcnknfVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtSW5wdXQgdi1iaW5kOmlucHV0RGF0YT1cInt0eXBlOidzZWxlY3RvcicsbGFiZWw6J9Cf0YDQvtC40LfQstC+0LTQuNGC0LXQu9GMJyxuYW1lOidlbnRpdHkuc3VwcGxpZXIubmFtZScsIG9uQ2xpY2s6J3NlbGVjdFN1cHBsaWVyJ31cIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8IS0tICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPi0tPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8IS0tICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQGZvcmVhY2goJHN0b3JlcyBhcyAkc3RvcmUpLS0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwhLS0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWw+0KDQvtC30L3QuNGH0L3QsNGPINGG0LXQvdCwINC00LvRjyDQvNCw0LPQsNC30LjQvdCwIFwie3sgJHN0b3JlLT5uYW1lIH19XCI8L2xhYmVsPi0tPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8IS0tICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwIG1iLTNcIj4tLT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPCEtLSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cIm51bWJlclwiIG1pbj1cIjBcIiBuYW1lPVwic3RvcmFnZVt7eyAkc3RvcmUtPmlkIH19XVtyZXRhaWxfcHJpY2VdXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2wgbWwtMFwiIHBsYWNlaG9sZGVyPVwi0KDQvtC30L3QuNGH0L3QsNGPINGG0LXQvdCwXCIgdmFsdWU9XCJAaWYoJHByb2R1Y3Qpe3sgJHByb2R1Y3QtPnN0b3Jlcy0+ZmluZCgkc3RvcmUtPmlkKS0+cGl2b3QtPnJldGFpbF9wcmljZSA/PyAnMCcgfX1AZW5kaWZcIiA+LS0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwhLS0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj4tLT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPCEtLSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEBlbmRmb3JlYWNoLS0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwhLS0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2Pi0tPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0YWItcGFuZVwiIHYtYmluZDpjbGFzcz1cInsnYWN0aXZlJyA6IHRhYnNbMV0uc3RhdGV9XCIgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGFibGUgY2xhc3M9XCJ0YWJsZSB3LTEwMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoZWFkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aD7QodC60LvQsNC0PC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGg+0JrQvtC70LjRh9C10YHRgtCy0L48L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aD7QpdGA0LDQvdC10L3QuNC1PC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RoZWFkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRib2R5PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg0JzQsNCz0LDQt9C40L1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RvcmFnZV9zdG9yZV9jb250YWluZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB2YWx1ZT1cIiBcIiBjbGFzcz1cInN0b3JhZ2Vfc3RvcmUgYmJfMVwiIHR5cGU9XCJ0ZXh0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdmFsdWU9XCIgXCIgY2xhc3M9XCJzdG9yYWdlX3N0b3JlIGJiXzJcIiB0eXBlPVwidGV4dFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHZhbHVlPVwiIFwiIGNsYXNzPVwic3RvcmFnZV9zdG9yZSBiYl8zXCIgdHlwZT1cInRleHRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB2YWx1ZT1cIiBcIiBjbGFzcz1cInN0b3JhZ2Vfc3RvcmUgYmJfNFwiIHR5cGU9XCJ0ZXh0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90YWJsZT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJveCBtdC0xMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJiX2ZhcSBmYXFfMVwiPtCX0L7QvdCwINGF0YDQsNC90LXQvdC40Y88L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJiYl9mYXEgZmFxXzJcIj7QndC+0LzQtdGAINGB0YLQtdC70LvQsNC20LA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJiYl9mYXEgZmFxXzNcIj7QndC+0LzQtdGAINCy0LXRgNGC0LjQutCw0LvRjNC90L7QuSDRgdC10LrRhtC40Lgg0YHRgtC10LvQu9Cw0LbQsDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJiX2ZhcSBmYXFfNFwiPtCd0L7QvNC10YAg0L/QvtC70LrQuDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGFiLXBhbmUgcC0zXCIgdi1iaW5kOmNsYXNzPVwieydhY3RpdmUnIDogdGFic1syXS5zdGF0ZX1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiB2LWlmPVwic2hvcF9hY3RpdmF0ZWRcIiBpZD1cInRhYl9tYWluXCIgZGF0YS1zaW1wbGViYXIgc3R5bGU9XCJoZWlnaHQ6IDMxMHB4O1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEZvcm1JbnB1dCB2LWJpbmQ6aW5wdXREYXRhPVwie3R5cGU6J2NoZWNrYm94JyxsYWJlbDon0J/QvtC60LDQt9Cw0YLRjCDQvdCwINCz0LvQsNCy0L3QvtC5INGB0YLRgNCw0L3QuNGG0LUnLG5hbWU6J2VudGl0eS5zcF9tYWluJ31cIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEZvcm1JbnB1dCB2LWJpbmQ6aW5wdXREYXRhPVwie3R5cGU6J2NoZWNrYm94JyxsYWJlbDon0JDQutGG0LjQvtC90L3Ri9C5INGC0L7QstCw0YAnLG5hbWU6J2VudGl0eS5zcF9zdG9jayd9XCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgdi1iaW5kOmNsYXNzPVwieydkLW5vbmUnOiFlbnRpdHkuc3Bfc3RvY2t9XCIgY2xhc3M9XCJzdG9ja3NcIiA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXAgcm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzcz1cImNvbC1zbS00XCI+0KbQtdC90LA8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXAgY29sLXNtLThcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwibnVtYmVyXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2wgZGlzY291bnRcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cCByb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzPVwiY29sLXNtLTRcIj7QodC60LjQtNC60LA8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXAgY29sLXNtLThcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwibnVtYmVyXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2wgZGlzY291bnQgbXItMTBcIiAvPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8U2VsZWN0b3Igdi1iaW5kOmRhdGE9XCJ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6J2VudGl0eS5zcF9kaXNjb3VudF90eXBlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0X3ZhbHVlOjEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudHM6W1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7bmFtZTon0LIg0YDRg9Cx0LvRj9GFJywgdmFsdWU6MX0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtuYW1lOifQsiDQv9GA0L7RhtC10L3RgtCw0YUnLCB2YWx1ZTowfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmbGV4LTFcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbD7QptC10L3QsDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cIm51bWJlclwiIGNsYXNzPVwiZm9ybS1jb250cm9sIGRpc2NvdW50XCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZmxleC0zXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cIm51bWJlclwiIGNsYXNzPVwiZm9ybS1jb250cm9sIHByaWNlXCIgZGlzYWJsZWQgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXAgZC1mbGV4XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZmxleC0xXCI+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibWwtNSBmbGV4LTFcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c2VsZWN0IGNsYXNzPVwidHlwZVwiID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbj4zNDU8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJudW1iZXJcIiBjbGFzcz1cImZvcm0tY29udHJvbCB0b3RhbFwiIGRpc2FibGVkIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHYtaWY9XCIhc2hvcF9hY3RpdmF0ZWRcIj7QkNC60YLQuNCy0LjRgNGD0LnRgtC1INC40L3RgtC10YDQvdC10YIt0LzQsNCz0LDQt9C40L0g0LIgPGEgY2xhc3M9XCJhamF4LW5hdlwiIGhyZWY9XCIjXCI+0L3QsNGB0YLRgNC+0LnQutCw0YU8L2E+LjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHYtaWY9XCIhc2hvcF9hY3RpdmF0ZWRcIj7QrdGC0L4g0LHQtdGB0L/Qu9Cw0YLQvdC+LjwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRhYi1wYW5lIHAtM1wiIHYtYmluZDpjbGFzcz1cInsnYWN0aXZlJyA6IHRhYnNbM10uc3RhdGV9XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtSW5wdXQgdi1iaW5kOmlucHV0RGF0YT1cInt0eXBlOidpbnB1dCcsbGFiZWw6J9Co0YLRgNC40YUt0LrQvtC0INC/0YDQvtC40LfQstC+0LTQuNGC0LXQu9GPIChFQU4gMTMpJyxuYW1lOidiYXJjb2RlJywgbWVzc2FnZXM6bWVzc2FnZXMsIHBsYWNlaG9sZGVyOifQqNGC0YDQuNGF0LrQvtC0J31cIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybUlucHV0IHYtYmluZDppbnB1dERhdGE9XCJ7dHlwZTonaW5wdXQnLGxhYmVsOifQktC90YPRgtGA0LXQvdC90LjQuSDRiNGC0YDQuNGFLdC60L7QtCAoRUFOIDEzKScsbmFtZTonYmFyY29kZV9sb2NhbCcsIG1lc3NhZ2VzOm1lc3NhZ2VzLCBwbGFjZWhvbGRlcjon0KjRgtGA0LjRhdC60L7QtCDRgdC60LvQsNC00LAnfVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8IS0tPGRpdiBjbGFzcz1cInRhYi1wYW5lXCIgaWQ9XCJ7eyAkY2xhc3MgfX1fdGFiX2VudHJhbmNlc1wiIGRhdGEtc2ltcGxlYmFyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT1cIm1heC1oZWlnaHQ6IDQwMHB4O1wiPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEBpZihpc3NldCgkcHJvZHVjdC0+ZW50cmFuY2VzKSAmJiBjb3VudCgkcHJvZHVjdC0+ZW50cmFuY2VzKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRhYmxlPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aD5JRDwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoPtCf0L7RgdGC0LDQstGJ0LjQujwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoPtCa0L7Qu9C40YfQtdGB0YLQstC+PC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGg+0JTQsNGC0LA8L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQGZvcmVhY2goJHByb2R1Y3QtPmVudHJhbmNlcyBhcyAkZW50cmFuY2UpXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQ+e3sgJGVudHJhbmNlLT5pZCB9fTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPnt7ICRlbnRyYW5jZS0+cGFydG5lci0+b2ZmaWNpYWxfbmFtZSA/PyAnJyB9fTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPnt7ICRlbnRyYW5jZS0+cGl2b3QtPmNvdW50IH19PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQ+e3sgJGVudHJhbmNlLT5waXZvdC0+Y3JlYXRlZF9hdCB9fTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBAZW5kZm9yZWFjaFxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGFibGU+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgINCf0L7RgdGC0YPQv9C70LXQvdC40Y8g0L3QtSDQvdCw0LnQtNC10L3Ri1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBAZW5kaWZcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2Pi0tPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGFsLWZvb3RlclwiPlxuICAgICAgICAgICAgICAgIDxidXR0b24gQGNsaWNrPVwiJHBhcmVudC5jbG9zZURpYWxvZyhkaWFsb2cpXCIgdHlwZT1cInN1Ym1pdFwiIGNsYXNzPVwiYnV0dG9uIHdoaXRlXCI+0JfQsNC60YDRi9GC0Yw8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIEBjbGljaz1cInNhdmUoKVwiIHR5cGU9XCJzdWJtaXRcIiBjbGFzcz1cImJ1dHRvbiBwcmltYXJ5IHB1bGwtcmlnaHRcIj7QodC+0YXRgNCw0L3QuNGC0Yw8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN5c3RlbV9tZXNzYWdlXCI+XG5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG4gICAgaW1wb3J0IGNhdGVnb3J5TWl4aW4gZnJvbSBcIi4vLi4vLi4vbWl4aW5zL2NhdGVnb3J5TWl4aW5cIlxuICAgIGltcG9ydCBzdXBwbGllck1peGluIGZyb20gXCIuLy4uLy4uL21peGlucy9zdXBwbGllck1peGluXCJcbiAgICBpbXBvcnQgRm9ybUlucHV0IGZyb20gXCIuLy4uLy4uL3NlcnZpY2UvRm9ybUlucHV0XCJcbiAgICBleHBvcnQgZGVmYXVsdCB7XG4gICAgICAgIG5hbWU6IFwiUHJvZHVjdERpYWxvZ1wiLFxuICAgICAgICBwcm9wczogWydkaWFsb2cnXSxcbiAgICAgICAgbWl4aW5zOiBbY2F0ZWdvcnlNaXhpbiwgc3VwcGxpZXJNaXhpbl0sXG4gICAgICAgIGRhdGE6ICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgZ2V0IHNob3BfYWN0aXZhdGVkKCl7XG4gICAgICAgICAgICAgICAgICAgIGxldCBsb2NhbF9zZXR0aW5ncyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlWydzZXR0aW5ncyddKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGluZGV4ID0gXy5maW5kSW5kZXgobG9jYWxfc2V0dGluZ3MsIGZ1bmN0aW9uKG8pIHsgcmV0dXJuIG8ua2V5ID09PSBcInNob3BfZW5hYmxlZFwiOyB9KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGxvY2FsX3NldHRpbmdzW2luZGV4XSA/IEJvb2xlYW4ocGFyc2VJbnQobG9jYWxfc2V0dGluZ3NbaW5kZXhdLnZhbHVlKSkgOiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHRhYnM6IFtcbiAgICAgICAgICAgICAgICAgICAge3NsdWc6IFwiYmFzZVwiLCBuYW1lOiBcItCe0YHQvdC+0LLQvdGL0LVcIiwgc3RhdGU6IHRydWV9LFxuICAgICAgICAgICAgICAgICAgICB7c2x1ZzogXCJzdG9yZVwiLCBuYW1lOiBcItCh0LrQu9Cw0LRcIiwgc3RhdGU6IGZhbHNlfSxcbiAgICAgICAgICAgICAgICAgICAge3NsdWc6IFwic2hvcFwiLCBuYW1lOiBcItCY0L3RgtC10YDQvdC10YIg0LzQsNCz0LDQt9C40L1cIiwgc3RhdGU6IGZhbHNlfSxcbiAgICAgICAgICAgICAgICAgICAge3NsdWc6IFwiYmFyY29kZVwiLCBuYW1lOiBcItCo0YLRgNC40YXQutC+0LRcIiwgc3RhdGU6IGZhbHNlfSxcbiAgICAgICAgICAgICAgICAgICAge3NsdWc6IFwiZW50cmFuY2VcIiwgbmFtZTogXCLQn9C+0YHRgtGD0L/Qu9C10L3QuNGPXCIsIHN0YXRlOiBmYWxzZX0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICByb290X2NhdGVnb3J5OiAyLFxuICAgICAgICAgICAgICAgIGVudGl0eToge1xuICAgICAgICAgICAgICAgICAgICBuYW1lOm51bGwsXG4gICAgICAgICAgICAgICAgICAgIGFydGljbGU6bnVsbCxcbiAgICAgICAgICAgICAgICAgICAgc3BfZGlzY291bnRfdHlwZTpcIjFcIixcbiAgICAgICAgICAgICAgICAgICAgc3BfbWFpbjpmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgc3Bfc3RvY2s6ZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIGNhdGVnb3J5OntcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOjIsXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOm51bGwsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHN1cHBsaWVyOntcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOm51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOifQndC1INCy0YvQsdGA0LDQvScsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBtZXNzYWdlczp7fSxcbiAgICAgICAgICAgICAgICBsb2FkaW5nOmZhbHNlLFxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBtb3VudGVkKCkge1xuICAgICAgICAgICAgdGhpcy5kaWFsb2cud2lkdGggPSA2MDA7XG4gICAgICAgICAgICBpZiAodGhpcy5kaWFsb2cuaWQgPT09IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRpYWxvZy50aXRsZSA9IFwi0J3QvtCy0YvQuSDQv9GA0L7QtNGD0LrRglwiO1xuICAgICAgICAgICAgICAgIHRoaXMuZ2V0UGFyZW50Q2F0ZWdvcnkoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB3aW5kb3cuYXhpb3Moe1xuICAgICAgICAgICAgICAgICAgICBtZXRob2Q6ICdnZXQnLFxuICAgICAgICAgICAgICAgICAgICB1cmw6ICcvcHJvZHVjdHMvJyArIHRoaXMuZGlhbG9nLmlkLFxuICAgICAgICAgICAgICAgIH0pLnRoZW4oKHJlc3ApID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kaWFsb2cudGl0bGUgPSBcItCg0LXQtNCw0LrRgtC40YDQvtCy0LDQvdC40LUg0YLQvtCy0LDRgNCwICdcIiArIHJlc3AuZGF0YS5uYW1lICsgXCInXCI7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaWQgPSByZXNwLmRhdGEuaWQ7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW50aXR5ID0gcmVzcC5kYXRhO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9KS5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYoZXJyb3IucmVzcG9uc2Uuc3RhdHVzID09PSA0MDQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kcGFyZW50LmNsb3NlRGlhbG9nKHRoaXMuZGlhbG9nKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgY29tcHV0ZWQ6IHt9LFxuICAgICAgICBtZXRob2RzOiB7XG4gICAgICAgICAgICBzZWxlY3RUYWIodGFiKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50YWJzLmZvckVhY2goKHRhYikgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0YWIuc3RhdGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB0YWIuc3RhdGUgPSB0cnVlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNhdmUoKXtcbiAgICAgICAgICAgICAgICBsZXQgbWV0aG9kID0gdGhpcy5lbnRpdHkuaWQgPyAncGF0Y2gnIDogJ3Bvc3QnO1xuICAgICAgICAgICAgICAgIGxldCB1cmwgPSB0aGlzLmVudGl0eS5pZCA/ICcvJyArIHRoaXMuZW50aXR5LmlkIDogJyc7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB3aW5kb3cuYXhpb3Moe1xuICAgICAgICAgICAgICAgICAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICAgICAgICAgICAgICAgICAgdXJsOiAnL3Byb2R1Y3RzJyArIHVybCxcbiAgICAgICAgICAgICAgICAgICAgZGF0YTp0aGlzLmVudGl0eSxcbiAgICAgICAgICAgICAgICB9KS50aGVuKChyZXNwKSA9PiAge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLiRldmVudEJ1cy4kZW1pdCgnUHJvZHVjdFVwZGF0ZWQnLCB7aWQ6IHRoaXMuaWQsIGNhdGVnb3J5X2lkOnRoaXMuY2F0ZWdvcnlfaWR9KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kcGFyZW50LmNsb3NlRGlhbG9nKHRoaXMuZGlhbG9nKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1lc3NhZ2VzID0gZXJyb3IucmVzcG9uc2UuZGF0YS5tZXNzYWdlcztcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgY29tcG9uZW50czp7XG4gICAgICAgICAgICBGb3JtSW5wdXRcbiAgICAgICAgfVxuICAgIH1cbjwvc2NyaXB0PlxuIiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgX3ZtID0gdGhpc1xuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gIHJldHVybiBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImZvcm0tZ3JvdXBcIiB9LCBbXG4gICAgIV92bS4kcGFyZW50LmxvYWRpbmcgJiYgX3ZtLmlzSW5wdXRcbiAgICAgID8gX2MoXCJkaXZcIiwgW1xuICAgICAgICAgIF9jKFwibGFiZWxcIiwgW192bS5fdihfdm0uX3MoX3ZtLmlucHV0RGF0YS5sYWJlbCkpXSksXG4gICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICBfdm0uJHBhcmVudC5sb2FkaW5nXG4gICAgICAgICAgICA/IF9jKFxuICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwibGlzdC1wbGFjZWhvbGRlclwiLFxuICAgICAgICAgICAgICAgICAgc3RhdGljU3R5bGU6IHsgaGVpZ2h0OiBcIjMwcHhcIiB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBbX3ZtLl9tKDApXVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICA6IF92bS5fZSgpLFxuICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgX2MoXCJpbnB1dFwiLCB7XG4gICAgICAgICAgICBkaXJlY3RpdmVzOiBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBuYW1lOiBcInRvb2x0aXBcIixcbiAgICAgICAgICAgICAgICByYXdOYW1lOiBcInYtdG9vbHRpcFwiLFxuICAgICAgICAgICAgICAgIHZhbHVlOiB7XG4gICAgICAgICAgICAgICAgICBjb250ZW50OiBfdm0uZXJyb3JNc2csXG4gICAgICAgICAgICAgICAgICBwbGFjZW1lbnQ6IFwibGVmdFwiLFxuICAgICAgICAgICAgICAgICAgY2xhc3NlczogW1wiZXJyb3JcIl1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGV4cHJlc3Npb246XG4gICAgICAgICAgICAgICAgICBcIntcXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IGVycm9yTXNnLFxcbiAgICAgICAgICAgICAgICAgICAgcGxhY2VtZW50OiAnbGVmdCcsXFxuICAgICAgICAgICAgICAgICAgICBjbGFzc2VzOiBbJ2Vycm9yJ10sXFxuICAgICAgICAgICAgICAgIH1cIlxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbmFtZTogXCJtb2RlbFwiLFxuICAgICAgICAgICAgICAgIHJhd05hbWU6IFwidi1tb2RlbFwiLFxuICAgICAgICAgICAgICAgIHZhbHVlOiBfdm0ucGFyZW50TW9kZWwsXG4gICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCJwYXJlbnRNb2RlbFwiXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBzdGF0aWNDbGFzczogXCJmb3JtLWNvbnRyb2xcIixcbiAgICAgICAgICAgIGNsYXNzOiB7IFwiaXMtaW52YWxpZFwiOiBfdm0uZXJyb3JNc2cgfSxcbiAgICAgICAgICAgIGF0dHJzOiB7IHBsYWNlaG9sZGVyOiBfdm0uaW5wdXREYXRhLnBsYWNlaG9sZGVyLCB0eXBlOiBcInRleHRcIiB9LFxuICAgICAgICAgICAgZG9tUHJvcHM6IHsgdmFsdWU6IF92bS5wYXJlbnRNb2RlbCB9LFxuICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAga2V5cHJlc3M6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICEkZXZlbnQudHlwZS5pbmRleE9mKFwia2V5XCIpICYmXG4gICAgICAgICAgICAgICAgICBfdm0uX2soJGV2ZW50LmtleUNvZGUsIFwiZW50ZXJcIiwgMTMsICRldmVudC5rZXksIFwiRW50ZXJcIilcbiAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBfdm0uJHBhcmVudC5zYXZlKClcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgaW5wdXQ6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgIGlmICgkZXZlbnQudGFyZ2V0LmNvbXBvc2luZykge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF92bS5wYXJlbnRNb2RlbCA9ICRldmVudC50YXJnZXQudmFsdWVcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgIF0pXG4gICAgICA6IF92bS5fZSgpLFxuICAgIF92bS5fdihcIiBcIiksXG4gICAgIV92bS4kcGFyZW50LmxvYWRpbmcgJiYgX3ZtLmlzU2VsZWN0b3JcbiAgICAgID8gX2MoXCJkaXZcIiwgW1xuICAgICAgICAgIF9jKFwibGFiZWxcIiwgW192bS5fdihfdm0uX3MoX3ZtLmlucHV0RGF0YS5sYWJlbCkpXSksXG4gICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImlucHV0LWdyb3VwXCIgfSwgW1xuICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgIFwiYnV0dG9uXCIsXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBkaXJlY3RpdmVzOiBbXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidG9vbHRpcFwiLFxuICAgICAgICAgICAgICAgICAgICByYXdOYW1lOiBcInYtdG9vbHRpcFwiLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZToge1xuICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IF92bS5lcnJvck1zZyxcbiAgICAgICAgICAgICAgICAgICAgICBwbGFjZW1lbnQ6IFwibGVmdFwiLFxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzZXM6IFtcImVycm9yXCJdXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246XG4gICAgICAgICAgICAgICAgICAgICAgXCJ7XFxuICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBlcnJvck1zZyxcXG4gICAgICAgICAgICAgICAgICAgIHBsYWNlbWVudDogJ2xlZnQnLFxcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NlczogWydlcnJvciddLFxcbiAgICAgICAgICAgICAgICB9XCJcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOlxuICAgICAgICAgICAgICAgICAgXCJjYXRlZ29yeV9zZWxlY3QgZm9ybS1jb250cm9sIHRleHQtbGVmdCBidXR0b25fc2VsZWN0XCIsXG4gICAgICAgICAgICAgICAgY2xhc3M6IHsgXCJpcy1pbnZhbGlkXCI6IF92bS5lcnJvck1zZyB9LFxuICAgICAgICAgICAgICAgIGF0dHJzOiB7IHR5cGU6IFwiYnV0dG9uXCIgfSxcbiAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICBfdm0uJHBhcmVudFtfdm0uaW5wdXREYXRhLm9uQ2xpY2tdKClcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIFtfdm0uX3YoX3ZtLl9zKF92bS5wYXJlbnRNb2RlbCkpXVxuICAgICAgICAgICAgKVxuICAgICAgICAgIF0pXG4gICAgICAgIF0pXG4gICAgICA6IF92bS5fZSgpLFxuICAgIF92bS5fdihcIiBcIiksXG4gICAgIV92bS4kcGFyZW50LmxvYWRpbmcgJiYgX3ZtLmlzQ2hlY2tib3hcbiAgICAgID8gX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJyZWxhdGl2ZVwiIH0sIFtcbiAgICAgICAgICBfYyhcbiAgICAgICAgICAgIFwibGFiZWxcIixcbiAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwidy0xMDBcIiwgYXR0cnM6IHsgZm9yOiBfdm0uaW5wdXREYXRhLm5hbWUgfSB9LFxuICAgICAgICAgICAgW192bS5fdihfdm0uX3MoX3ZtLmlucHV0RGF0YS5sYWJlbCkpXVxuICAgICAgICAgICksXG4gICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICBfYyhcbiAgICAgICAgICAgIFwibGFiZWxcIixcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiYWJzb2x1dGUgY3VzdG9tX2NoZWNrYm94XCIsXG4gICAgICAgICAgICAgIHN0YXRpY1N0eWxlOiB7IHJpZ2h0OiBcIjBcIiwgdG9wOiBcIjNweFwiIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIF9jKFwiaW5wdXRcIiwge1xuICAgICAgICAgICAgICAgIGRpcmVjdGl2ZXM6IFtcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJtb2RlbFwiLFxuICAgICAgICAgICAgICAgICAgICByYXdOYW1lOiBcInYtbW9kZWxcIixcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IF92bS5wYXJlbnRNb2RlbCxcbiAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCJwYXJlbnRNb2RlbFwiXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJub3RfZGVmYXVsdFwiLFxuICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICBpZDogX3ZtLmlucHV0RGF0YS5uYW1lLFxuICAgICAgICAgICAgICAgICAgbmFtZTogX3ZtLmlucHV0RGF0YS5uYW1lLFxuICAgICAgICAgICAgICAgICAgdHlwZTogXCJjaGVja2JveFwiXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBkb21Qcm9wczoge1xuICAgICAgICAgICAgICAgICAgY2hlY2tlZDogQXJyYXkuaXNBcnJheShfdm0ucGFyZW50TW9kZWwpXG4gICAgICAgICAgICAgICAgICAgID8gX3ZtLl9pKF92bS5wYXJlbnRNb2RlbCwgbnVsbCkgPiAtMVxuICAgICAgICAgICAgICAgICAgICA6IF92bS5wYXJlbnRNb2RlbFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciAkJGEgPSBfdm0ucGFyZW50TW9kZWwsXG4gICAgICAgICAgICAgICAgICAgICAgJCRlbCA9ICRldmVudC50YXJnZXQsXG4gICAgICAgICAgICAgICAgICAgICAgJCRjID0gJCRlbC5jaGVja2VkID8gdHJ1ZSA6IGZhbHNlXG4gICAgICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KCQkYSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICB2YXIgJCR2ID0gbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICQkaSA9IF92bS5faSgkJGEsICQkdilcbiAgICAgICAgICAgICAgICAgICAgICBpZiAoJCRlbC5jaGVja2VkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkJGkgPCAwICYmIChfdm0ucGFyZW50TW9kZWwgPSAkJGEuY29uY2F0KFskJHZdKSlcbiAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgJCRpID4gLTEgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKF92bS5wYXJlbnRNb2RlbCA9ICQkYVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zbGljZSgwLCAkJGkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNvbmNhdCgkJGEuc2xpY2UoJCRpICsgMSkpKVxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICBfdm0ucGFyZW50TW9kZWwgPSAkJGNcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgIF9jKFwic3BhblwiKVxuICAgICAgICAgICAgXVxuICAgICAgICAgIClcbiAgICAgICAgXSlcbiAgICAgIDogX3ZtLl9lKClcbiAgXSlcbn1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXG4gIGZ1bmN0aW9uKCkge1xuICAgIHZhciBfdm0gPSB0aGlzXG4gICAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gICAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gICAgcmV0dXJuIF9jKFxuICAgICAgXCJkaXZcIixcbiAgICAgIHsgc3RhdGljQ2xhc3M6IFwibGlzdC1wbGFjZWhvbGRlcl9pdGVtXCIsIHN0YXRpY1N0eWxlOiB7IGhlaWdodDogXCIzMHB4XCIgfSB9LFxuICAgICAgW1xuICAgICAgICBfYyhcImRpdlwiLCB7XG4gICAgICAgICAgc3RhdGljQ2xhc3M6IFwibGlzdC1wbGFjZWhvbGRlcl9jZWxsIHctMTAwXCIsXG4gICAgICAgICAgc3RhdGljU3R5bGU6IHsgd2lkdGg6IFwiMTAwJVwiIH1cbiAgICAgICAgfSlcbiAgICAgIF1cbiAgICApXG4gIH1cbl1cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxuXG5leHBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgX3ZtID0gdGhpc1xuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gIHJldHVybiBfYyhcImRpdlwiLCBbXG4gICAgX2MoXCJkaXZcIiwgW1xuICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJtb2RhbC1ib2R5XCIgfSwgW1xuICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcInJvd1wiIH0sIFtcbiAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImNvbC1zbS00IG5vLXByIGQtZmxleFwiIH0sIFtcbiAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICBcInVsXCIsXG4gICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwibmF2XCIgfSxcbiAgICAgICAgICAgICAgX3ZtLl9sKF92bS50YWJzLCBmdW5jdGlvbih0YWIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gX2MoXG4gICAgICAgICAgICAgICAgICBcImxpXCIsXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGtleTogdGFiLnNsdWcsXG4gICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcIm5hdi1pdGVtXCIsXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzOiB7IGFjdGl2ZTogdGFiLnN0YXRlIH1cbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgIFwiYVwiLFxuICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcIm5hdi1saW5rXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBhdHRyczogeyBocmVmOiBcImphdmFzY3JpcHQ6dm9pZCgwKVwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF92bS5zZWxlY3RUYWIodGFiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl9zKHRhYi5uYW1lKSArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl9tKDAsIHRydWUpXG4gICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgMFxuICAgICAgICAgICAgKVxuICAgICAgICAgIF0pLFxuICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJjb2wtc20tOCBuby1wbFwiIH0sIFtcbiAgICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwidGFiLWNvbnRlbnQgbm8tcGxcIiB9LCBbXG4gICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwidGFiLXBhbmUgcC0zXCIsXG4gICAgICAgICAgICAgICAgICBjbGFzczogeyBhY3RpdmU6IF92bS50YWJzWzBdLnN0YXRlIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgIF9jKFwiRm9ybUlucHV0XCIsIHtcbiAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICBpbnB1dERhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiaW5wdXRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcItCQ0YDRgtC40LrRg9C7XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImVudGl0eS5hcnRpY2xlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogXCLQkNGA0YLQuNC60YPQuyDQtNC10YLQsNC70LggKNC90LUg0LHQvtC70LXQtSA2NCDRgdC40LzQstC+0LvQvtCyKVwiXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICBfYyhcIkZvcm1JbnB1dFwiLCB7XG4gICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgaW5wdXREYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcImlucHV0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCLQndCw0LjQvNC10L3QvtCy0LDQvdC40LVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZW50aXR5Lm5hbWVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBcItCd0LDQuNC80LXQvdC+0LLQsNC90LjQtSAo0L3QtSDQsdC+0LvQtdC1IDI1NSDRgdC40LzQstC+0LvQvtCyKVwiXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICBfYyhcIkZvcm1JbnB1dFwiLCB7XG4gICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgaW5wdXREYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcInNlbGVjdG9yXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCLQkiDQutCw0YLQtdCz0L7RgNC40LhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZW50aXR5LmNhdGVnb3J5Lm5hbWVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s6IFwic2VsZWN0Q2F0ZWdvcnlcIlxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgX2MoXCJGb3JtSW5wdXRcIiwge1xuICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgIGlucHV0RGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJzZWxlY3RvclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwi0J/RgNC+0LjQt9Cy0L7QtNC40YLQtdC70YxcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZW50aXR5LnN1cHBsaWVyLm5hbWVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s6IFwic2VsZWN0U3VwcGxpZXJcIlxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJ0YWItcGFuZVwiLFxuICAgICAgICAgICAgICAgICAgY2xhc3M6IHsgYWN0aXZlOiBfdm0udGFic1sxXS5zdGF0ZSB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBbX3ZtLl9tKDEpLCBfdm0uX3YoXCIgXCIpLCBfdm0uX20oMildXG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwidGFiLXBhbmUgcC0zXCIsXG4gICAgICAgICAgICAgICAgICBjbGFzczogeyBhY3RpdmU6IF92bS50YWJzWzJdLnN0YXRlIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgIF92bS5zaG9wX2FjdGl2YXRlZFxuICAgICAgICAgICAgICAgICAgICA/IF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljU3R5bGU6IHsgaGVpZ2h0OiBcIjMxMHB4XCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgaWQ6IFwidGFiX21haW5cIiwgXCJkYXRhLXNpbXBsZWJhclwiOiBcIlwiIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiRm9ybUlucHV0XCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXREYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiY2hlY2tib3hcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwi0J/QvtC60LDQt9Cw0YLRjCDQvdCwINCz0LvQsNCy0L3QvtC5INGB0YLRgNCw0L3QuNGG0LVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJlbnRpdHkuc3BfbWFpblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJGb3JtSW5wdXRcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnB1dERhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJjaGVja2JveFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCLQkNC60YbQuNC+0L3QvdGL0Lkg0YLQvtCy0LDRgFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImVudGl0eS5zcF9zdG9ja1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJzdG9ja3NcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzOiB7IFwiZC1ub25lXCI6ICFfdm0uZW50aXR5LnNwX3N0b2NrIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fbSgzKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImZvcm0tZ3JvdXAgcm93XCIgfSwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcImxhYmVsXCIsIHsgc3RhdGljQ2xhc3M6IFwiY29sLXNtLTRcIiB9LCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwi0KHQutC40LTQutCwXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwiaW5wdXQtZ3JvdXAgY29sLXNtLThcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiaW5wdXRcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImZvcm0tY29udHJvbCBkaXNjb3VudCBtci0xMFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczogeyB0eXBlOiBcIm51bWJlclwiIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiU2VsZWN0b3JcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcImVudGl0eS5zcF9kaXNjb3VudF90eXBlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0X3ZhbHVlOiAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudHM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBuYW1lOiBcItCyINGA0YPQsdC70Y/RhVwiLCB2YWx1ZTogMSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IG5hbWU6IFwi0LIg0L/RgNC+0YbQtdC90YLQsNGFXCIsIHZhbHVlOiAwIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fbSg0KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX20oNSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICA6IF92bS5fZSgpLFxuICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICFfdm0uc2hvcF9hY3RpdmF0ZWRcbiAgICAgICAgICAgICAgICAgICAgPyBfYyhcImRpdlwiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCLQkNC60YLQuNCy0LjRgNGD0LnRgtC1INC40L3RgtC10YDQvdC10YIt0LzQsNCz0LDQt9C40L0g0LIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiYVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcImFqYXgtbmF2XCIsIGF0dHJzOiB7IGhyZWY6IFwiI1wiIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW192bS5fdihcItC90LDRgdGC0YDQvtC50LrQsNGFXCIpXVxuICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIi5cIilcbiAgICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgICA6IF92bS5fZSgpLFxuICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICFfdm0uc2hvcF9hY3RpdmF0ZWRcbiAgICAgICAgICAgICAgICAgICAgPyBfYyhcImRpdlwiLCBbX3ZtLl92KFwi0K3RgtC+INCx0LXRgdC/0LvQsNGC0L3Qvi5cIildKVxuICAgICAgICAgICAgICAgICAgICA6IF92bS5fZSgpXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcInRhYi1wYW5lIHAtM1wiLFxuICAgICAgICAgICAgICAgICAgY2xhc3M6IHsgYWN0aXZlOiBfdm0udGFic1szXS5zdGF0ZSB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICBfYyhcIkZvcm1JbnB1dFwiLCB7XG4gICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgaW5wdXREYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcImlucHV0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCLQqNGC0YDQuNGFLdC60L7QtCDQv9GA0L7QuNC30LLQvtC00LjRgtC10LvRjyAoRUFOIDEzKVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJiYXJjb2RlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlczogX3ZtLm1lc3NhZ2VzLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFwi0KjRgtGA0LjRhdC60L7QtFwiXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICBfYyhcIkZvcm1JbnB1dFwiLCB7XG4gICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgaW5wdXREYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcImlucHV0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCLQktC90YPRgtGA0LXQvdC90LjQuSDRiNGC0YDQuNGFLdC60L7QtCAoRUFOIDEzKVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJiYXJjb2RlX2xvY2FsXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlczogX3ZtLm1lc3NhZ2VzLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFwi0KjRgtGA0LjRhdC60L7QtCDRgdC60LvQsNC00LBcIlxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgXSlcbiAgICAgICAgICBdKVxuICAgICAgICBdKVxuICAgICAgXSksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJtb2RhbC1mb290ZXJcIiB9LCBbXG4gICAgICAgIF9jKFxuICAgICAgICAgIFwiYnV0dG9uXCIsXG4gICAgICAgICAge1xuICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiYnV0dG9uIHdoaXRlXCIsXG4gICAgICAgICAgICBhdHRyczogeyB0eXBlOiBcInN1Ym1pdFwiIH0sXG4gICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF92bS4kcGFyZW50LmNsb3NlRGlhbG9nKF92bS5kaWFsb2cpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIFtfdm0uX3YoXCLQl9Cw0LrRgNGL0YLRjFwiKV1cbiAgICAgICAgKSxcbiAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgX2MoXG4gICAgICAgICAgXCJidXR0b25cIixcbiAgICAgICAgICB7XG4gICAgICAgICAgICBzdGF0aWNDbGFzczogXCJidXR0b24gcHJpbWFyeSBwdWxsLXJpZ2h0XCIsXG4gICAgICAgICAgICBhdHRyczogeyB0eXBlOiBcInN1Ym1pdFwiIH0sXG4gICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF92bS5zYXZlKClcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgW192bS5fdihcItCh0L7RhdGA0LDQvdC40YLRjFwiKV1cbiAgICAgICAgKVxuICAgICAgXSksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJzeXN0ZW1fbWVzc2FnZVwiIH0pXG4gICAgXSlcbiAgXSlcbn1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXG4gIGZ1bmN0aW9uKCkge1xuICAgIHZhciBfdm0gPSB0aGlzXG4gICAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gICAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gICAgcmV0dXJuIF9jKFwic3BhblwiLCB7IHN0YXRpY0NsYXNzOiBcImZsb2F0LXJpZ2h0IGhlbHBlcl9kYW5nZXIgZC1ub25lLWZcIiB9LCBbXG4gICAgICBfYyhcImlcIiwge1xuICAgICAgICBzdGF0aWNDbGFzczogXCJmYSBmYS1leGNsYW1hdGlvbi10cmlhbmdsZSB0ZXh0LW1kIG1sLTIgdGV4dC1kYW5nZXJcIlxuICAgICAgfSlcbiAgICBdKVxuICB9LFxuICBmdW5jdGlvbigpIHtcbiAgICB2YXIgX3ZtID0gdGhpc1xuICAgIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICAgIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICAgIHJldHVybiBfYyhcInRhYmxlXCIsIHsgc3RhdGljQ2xhc3M6IFwidGFibGUgdy0xMDBcIiB9LCBbXG4gICAgICBfYyhcInRoZWFkXCIsIFtcbiAgICAgICAgX2MoXCJ0clwiLCBbXG4gICAgICAgICAgX2MoXCJ0aFwiLCBbX3ZtLl92KFwi0KHQutC70LDQtFwiKV0pLFxuICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgX2MoXCJ0aFwiLCBbX3ZtLl92KFwi0JrQvtC70LjRh9C10YHRgtCy0L5cIildKSxcbiAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgIF9jKFwidGhcIiwgW192bS5fdihcItCl0YDQsNC90LXQvdC40LVcIildKVxuICAgICAgICBdKVxuICAgICAgXSksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX2MoXCJ0Ym9keVwiLCBbXG4gICAgICAgIF9jKFwidHJcIiwgW1xuICAgICAgICAgIF9jKFwidGRcIiwgW1xuICAgICAgICAgICAgX3ZtLl92KFxuICAgICAgICAgICAgICBcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICDQnNCw0LPQsNC30LjQvVxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICApXG4gICAgICAgICAgXSksXG4gICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICBfYyhcInRkXCIsIFtcbiAgICAgICAgICAgIF92bS5fdihcbiAgICAgICAgICAgICAgXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICApXG4gICAgICAgICAgXSksXG4gICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICBfYyhcInRkXCIsIFtcbiAgICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwic3RvcmFnZV9zdG9yZV9jb250YWluZXJcIiB9LCBbXG4gICAgICAgICAgICAgIF9jKFwiaW5wdXRcIiwge1xuICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcInN0b3JhZ2Vfc3RvcmUgYmJfMVwiLFxuICAgICAgICAgICAgICAgIGF0dHJzOiB7IHZhbHVlOiBcIiBcIiwgdHlwZTogXCJ0ZXh0XCIgfVxuICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgX2MoXCJpbnB1dFwiLCB7XG4gICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwic3RvcmFnZV9zdG9yZSBiYl8yXCIsXG4gICAgICAgICAgICAgICAgYXR0cnM6IHsgdmFsdWU6IFwiIFwiLCB0eXBlOiBcInRleHRcIiB9XG4gICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICBfYyhcImlucHV0XCIsIHtcbiAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJzdG9yYWdlX3N0b3JlIGJiXzNcIixcbiAgICAgICAgICAgICAgICBhdHRyczogeyB2YWx1ZTogXCIgXCIsIHR5cGU6IFwidGV4dFwiIH1cbiAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgIF9jKFwiaW5wdXRcIiwge1xuICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcInN0b3JhZ2Vfc3RvcmUgYmJfNFwiLFxuICAgICAgICAgICAgICAgIGF0dHJzOiB7IHZhbHVlOiBcIiBcIiwgdHlwZTogXCJ0ZXh0XCIgfVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgXSlcbiAgICAgICAgICBdKVxuICAgICAgICBdKVxuICAgICAgXSlcbiAgICBdKVxuICB9LFxuICBmdW5jdGlvbigpIHtcbiAgICB2YXIgX3ZtID0gdGhpc1xuICAgIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICAgIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICAgIHJldHVybiBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImJveCBtdC0xMFwiIH0sIFtcbiAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiYmJfZmFxIGZhcV8xXCIgfSwgW192bS5fdihcItCX0L7QvdCwINGF0YDQsNC90LXQvdC40Y9cIildKSxcbiAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImJiX2ZhcSBmYXFfMlwiIH0sIFtfdm0uX3YoXCLQndC+0LzQtdGAINGB0YLQtdC70LvQsNC20LBcIildKSxcbiAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImJiX2ZhcSBmYXFfM1wiIH0sIFtcbiAgICAgICAgX3ZtLl92KFwi0J3QvtC80LXRgCDQstC10YDRgtC40LrQsNC70YzQvdC+0Lkg0YHQtdC60YbQuNC4INGB0YLQtdC70LvQsNC20LBcIilcbiAgICAgIF0pLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiYmJfZmFxIGZhcV80XCIgfSwgW192bS5fdihcItCd0L7QvNC10YAg0L/QvtC70LrQuFwiKV0pXG4gICAgXSlcbiAgfSxcbiAgZnVuY3Rpb24oKSB7XG4gICAgdmFyIF92bSA9IHRoaXNcbiAgICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgICByZXR1cm4gX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJmb3JtLWdyb3VwIHJvd1wiIH0sIFtcbiAgICAgIF9jKFwibGFiZWxcIiwgeyBzdGF0aWNDbGFzczogXCJjb2wtc20tNFwiIH0sIFtfdm0uX3YoXCLQptC10L3QsFwiKV0pLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiaW5wdXQtZ3JvdXAgY29sLXNtLThcIiB9LCBbXG4gICAgICAgIF9jKFwiaW5wdXRcIiwge1xuICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImZvcm0tY29udHJvbCBkaXNjb3VudFwiLFxuICAgICAgICAgIGF0dHJzOiB7IHR5cGU6IFwibnVtYmVyXCIgfVxuICAgICAgICB9KVxuICAgICAgXSlcbiAgICBdKVxuICB9LFxuICBmdW5jdGlvbigpIHtcbiAgICB2YXIgX3ZtID0gdGhpc1xuICAgIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICAgIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICAgIHJldHVybiBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImZsZXgtMVwiIH0sIFtcbiAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiZm9ybS1ncm91cFwiIH0sIFtcbiAgICAgICAgX2MoXCJsYWJlbFwiLCBbX3ZtLl92KFwi0KbQtdC90LBcIildKSxcbiAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgX2MoXCJpbnB1dFwiLCB7XG4gICAgICAgICAgc3RhdGljQ2xhc3M6IFwiZm9ybS1jb250cm9sIGRpc2NvdW50XCIsXG4gICAgICAgICAgYXR0cnM6IHsgdHlwZTogXCJudW1iZXJcIiB9XG4gICAgICAgIH0pXG4gICAgICBdKVxuICAgIF0pXG4gIH0sXG4gIGZ1bmN0aW9uKCkge1xuICAgIHZhciBfdm0gPSB0aGlzXG4gICAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gICAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gICAgcmV0dXJuIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiZmxleC0zXCIgfSwgW1xuICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJmb3JtLWdyb3VwXCIgfSwgW1xuICAgICAgICBfYyhcImlucHV0XCIsIHtcbiAgICAgICAgICBzdGF0aWNDbGFzczogXCJmb3JtLWNvbnRyb2wgcHJpY2VcIixcbiAgICAgICAgICBhdHRyczogeyB0eXBlOiBcIm51bWJlclwiLCBkaXNhYmxlZDogXCJcIiB9XG4gICAgICAgIH0pXG4gICAgICBdKSxcbiAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImZvcm0tZ3JvdXAgZC1mbGV4XCIgfSwgW1xuICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImZsZXgtMVwiIH0pLFxuICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcIm1sLTUgZmxleC0xXCIgfSwgW1xuICAgICAgICAgIF9jKFwic2VsZWN0XCIsIHsgc3RhdGljQ2xhc3M6IFwidHlwZVwiIH0sIFtfYyhcIm9wdGlvblwiLCBbX3ZtLl92KFwiMzQ1XCIpXSldKVxuICAgICAgICBdKVxuICAgICAgXSksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJmb3JtLWdyb3VwXCIgfSwgW1xuICAgICAgICBfYyhcImlucHV0XCIsIHtcbiAgICAgICAgICBzdGF0aWNDbGFzczogXCJmb3JtLWNvbnRyb2wgdG90YWxcIixcbiAgICAgICAgICBhdHRyczogeyB0eXBlOiBcIm51bWJlclwiLCBkaXNhYmxlZDogXCJcIiB9XG4gICAgICAgIH0pXG4gICAgICBdKVxuICAgIF0pXG4gIH1cbl1cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxuXG5leHBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IiwibGV0IGNhdGVnb3J5TWl4aW4gPSB7XG4gICAgbWV0aG9kczoge1xuICAgICAgICBzZXRDYXRlZ29yeShjYXRlZ29yeSl7XG4gICAgICAgICAgICB0aGlzLmVudGl0eS5jYXRlZ29yeS5pZCA9IGNhdGVnb3J5LmlkO1xuICAgICAgICAgICAgdGhpcy5lbnRpdHkuY2F0ZWdvcnkubmFtZSA9IGNhdGVnb3J5Lm5hbWU7XG4gICAgICAgICAgICB0aGlzLiRub3RpZnkoe1xuICAgICAgICAgICAgICAgIGdyb3VwOiAnbWFpbicsXG4gICAgICAgICAgICAgICAgdHlwZTogJ3N1Y2Nlc3MnLFxuICAgICAgICAgICAgICAgIHRleHQ6ICfQmtCw0YLQtdCz0L7RgNC40Y8g0LLRi9Cx0YDQsNC90LAnXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgc2VsZWN0Q2F0ZWdvcnkoKXtcbiAgICAgICAgICAgIHRoaXMuJGV2ZW50QnVzLiRlbWl0KCdvcGVuRGlhbG9nJywge1xuICAgICAgICAgICAgICAgIHRhZzogJ3NlbGVjdENhdGVnb3J5JyxcbiAgICAgICAgICAgICAgICBwYXJhbXM6IHtyb290X2NhdGVnb3J5OnRoaXMucm9vdF9jYXRlZ29yeSwgcmVmOiB0aGlzfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIGdldFBhcmVudENhdGVnb3J5KCl7XG4gICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSB0cnVlO1xuICAgICAgICAgICAgd2luZG93LmF4aW9zKHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdnZXQnLFxuICAgICAgICAgICAgICAgIHVybDogJy9jYXRlZ29yaWVzLycgKyB0aGlzLmVudGl0eS5jYXRlZ29yeS5pZCxcbiAgICAgICAgICAgIH0pLnRoZW4oKHJlc3ApID0+ICB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbnRpdHkuY2F0ZWdvcnkuaWQgPSByZXNwLmRhdGEuaWQ7XG4gICAgICAgICAgICAgICAgdGhpcy5lbnRpdHkuY2F0ZWdvcnkubmFtZSA9IHJlc3AuZGF0YS5uYW1lO1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgfVxufTtcbmV4cG9ydCBkZWZhdWx0IGNhdGVnb3J5TWl4aW47XG4iLCJsZXQgc3VwcGxpZXJNaXhpbiA9IHtcbiAgICBtZXRob2RzOiB7XG4gICAgICAgIHNldFN1cHBsaWVyKHN1cHBsaWVyKXtcbiAgICAgICAgICAgIHRoaXMuZW50aXR5LnN1cHBsaWVyLmlkID0gc3VwcGxpZXIuaWQ7XG4gICAgICAgICAgICB0aGlzLmVudGl0eS5zdXBwbGllci5uYW1lID0gc3VwcGxpZXIubmFtZTtcbiAgICAgICAgICAgIHRoaXMuJG5vdGlmeSh7XG4gICAgICAgICAgICAgICAgZ3JvdXA6ICdtYWluJyxcbiAgICAgICAgICAgICAgICB0eXBlOiAnc3VjY2VzcycsXG4gICAgICAgICAgICAgICAgdGV4dDogJ9Cf0YDQvtC40LfQstC+0LTQuNGC0LXQu9GMINCy0YvQsdGA0LDQvSdcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBzZWxlY3RTdXBwbGllcigpe1xuICAgICAgICAgICAgdGhpcy4kZXZlbnRCdXMuJGVtaXQoJ29wZW5EaWFsb2cnLCB7XG4gICAgICAgICAgICAgICAgdGFnOiAnc2VsZWN0U3VwcGxpZXInLFxuICAgICAgICAgICAgICAgIHBhcmFtczoge3JlZjogdGhpc31cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgIH1cbn07XG5leHBvcnQgZGVmYXVsdCBzdXBwbGllck1peGluO1xuIiwiaW1wb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSBmcm9tIFwiLi9Gb3JtSW5wdXQudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPWE4NTJhYzllJnNjb3BlZD10cnVlJlwiXG5pbXBvcnQgc2NyaXB0IGZyb20gXCIuL0Zvcm1JbnB1dC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcbmV4cG9ydCAqIGZyb20gXCIuL0Zvcm1JbnB1dC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcblxuXG4vKiBub3JtYWxpemUgY29tcG9uZW50ICovXG5pbXBvcnQgbm9ybWFsaXplciBmcm9tIFwiIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9ydW50aW1lL2NvbXBvbmVudE5vcm1hbGl6ZXIuanNcIlxudmFyIGNvbXBvbmVudCA9IG5vcm1hbGl6ZXIoXG4gIHNjcmlwdCxcbiAgcmVuZGVyLFxuICBzdGF0aWNSZW5kZXJGbnMsXG4gIGZhbHNlLFxuICBudWxsLFxuICBcImE4NTJhYzllXCIsXG4gIG51bGxcbiAgXG4pXG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7XG4gIHZhciBhcGkgPSByZXF1aXJlKFwiQzpcXFxcT3BlblNlcnZlclxcXFxkb21haW5zXFxcXEF1dG9DUk1cXFxcbm9kZV9tb2R1bGVzXFxcXHZ1ZS1ob3QtcmVsb2FkLWFwaVxcXFxkaXN0XFxcXGluZGV4LmpzXCIpXG4gIGFwaS5pbnN0YWxsKHJlcXVpcmUoJ3Z1ZScpKVxuICBpZiAoYXBpLmNvbXBhdGlibGUpIHtcbiAgICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gICAgaWYgKCFhcGkuaXNSZWNvcmRlZCgnYTg1MmFjOWUnKSkge1xuICAgICAgYXBpLmNyZWF0ZVJlY29yZCgnYTg1MmFjOWUnLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbG9hZCgnYTg1MmFjOWUnLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIuL0Zvcm1JbnB1dC52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9YTg1MmFjOWUmc2NvcGVkPXRydWUmXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGFwaS5yZXJlbmRlcignYTg1MmFjOWUnLCB7XG4gICAgICAgIHJlbmRlcjogcmVuZGVyLFxuICAgICAgICBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZuc1xuICAgICAgfSlcbiAgICB9KVxuICB9XG59XG5jb21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcInJlc291cmNlcy9qcy9jb21wb25lbnRzL3NlcnZpY2UvRm9ybUlucHV0LnZ1ZVwiXG5leHBvcnQgZGVmYXVsdCBjb21wb25lbnQuZXhwb3J0cyIsImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tNC0wIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vRm9ybUlucHV0LnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIjsgZXhwb3J0IGRlZmF1bHQgbW9kOyBleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS00LTAhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9Gb3JtSW5wdXQudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiIiwiZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvdGVtcGxhdGVMb2FkZXIuanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0Zvcm1JbnB1dC52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9YTg1MmFjOWUmc2NvcGVkPXRydWUmXCIiLCJpbXBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IGZyb20gXCIuL1Byb2R1Y3REaWFsb2cudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTE5MDk1MjI5JlwiXG5pbXBvcnQgc2NyaXB0IGZyb20gXCIuL1Byb2R1Y3REaWFsb2cudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5leHBvcnQgKiBmcm9tIFwiLi9Qcm9kdWN0RGlhbG9nLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuXG5cbi8qIG5vcm1hbGl6ZSBjb21wb25lbnQgKi9cbmltcG9ydCBub3JtYWxpemVyIGZyb20gXCIhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3J1bnRpbWUvY29tcG9uZW50Tm9ybWFsaXplci5qc1wiXG52YXIgY29tcG9uZW50ID0gbm9ybWFsaXplcihcbiAgc2NyaXB0LFxuICByZW5kZXIsXG4gIHN0YXRpY1JlbmRlckZucyxcbiAgZmFsc2UsXG4gIG51bGwsXG4gIG51bGwsXG4gIG51bGxcbiAgXG4pXG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7XG4gIHZhciBhcGkgPSByZXF1aXJlKFwiQzpcXFxcT3BlblNlcnZlclxcXFxkb21haW5zXFxcXEF1dG9DUk1cXFxcbm9kZV9tb2R1bGVzXFxcXHZ1ZS1ob3QtcmVsb2FkLWFwaVxcXFxkaXN0XFxcXGluZGV4LmpzXCIpXG4gIGFwaS5pbnN0YWxsKHJlcXVpcmUoJ3Z1ZScpKVxuICBpZiAoYXBpLmNvbXBhdGlibGUpIHtcbiAgICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gICAgaWYgKCFhcGkuaXNSZWNvcmRlZCgnMTkwOTUyMjknKSkge1xuICAgICAgYXBpLmNyZWF0ZVJlY29yZCgnMTkwOTUyMjknLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbG9hZCgnMTkwOTUyMjknLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIuL1Byb2R1Y3REaWFsb2cudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTE5MDk1MjI5JlwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICBhcGkucmVyZW5kZXIoJzE5MDk1MjI5Jywge1xuICAgICAgICByZW5kZXI6IHJlbmRlcixcbiAgICAgICAgc3RhdGljUmVuZGVyRm5zOiBzdGF0aWNSZW5kZXJGbnNcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxufVxuY29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJyZXNvdXJjZXMvanMvY29tcG9uZW50cy90ZW1wbGF0ZS9EaWFsb2dzL1Byb2R1Y3REaWFsb2cudnVlXCJcbmV4cG9ydCBkZWZhdWx0IGNvbXBvbmVudC5leHBvcnRzIiwiaW1wb3J0IG1vZCBmcm9tIFwiLSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS00LTAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9Qcm9kdWN0RGlhbG9nLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIjsgZXhwb3J0IGRlZmF1bHQgbW9kOyBleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS00LTAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9Qcm9kdWN0RGlhbG9nLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIiIsImV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3RlbXBsYXRlTG9hZGVyLmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9Qcm9kdWN0RGlhbG9nLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD0xOTA5NTIyOSZcIiJdLCJzb3VyY2VSb290IjoiIn0=