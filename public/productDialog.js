(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["productDialog"],{

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
        image: '/images/no_image.png',
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
    sync: function sync(e) {
      e.preventDefault();
      this.image_file = e.target.files[0];
      this.syncImage();
    },
    uploadClick: function uploadClick() {
      this.$refs.product_img_upload.click();
    },
    syncImage: function syncImage() {
      var _this2 = this;

      var data = new FormData();
      data.append('image', this.image_file);
      this.loading = true;
      window.axios({
        method: 'post',
        url: '/image/upload',
        data: data
      }).then(function (resp) {
        _this2.entity.image = resp.data.images[0].url;
        _this2.entity.image_id = resp.data.images[0].id;
        _this2.loading = false;
      });
    },
    selectTab: function selectTab(tab) {
      this.tabs.forEach(function (tab) {
        tab.state = false;
      });
      tab.state = true;
    },
    save: function save() {
      var _this3 = this;

      var method = this.entity.id ? 'patch' : 'post';
      var url = this.entity.id ? '/' + this.entity.id : '';
      this.loading = true;
      window.axios({
        method: method,
        url: '/products' + url,
        data: this.entity
      }).then(function (resp) {
        _this3.$eventBus.$emit('ProductUpdated', {
          id: _this3.id,
          category_id: _this3.category_id
        });

        _this3.$parent.closeDialog(_this3.dialog);

        _this3.loading = false;
      })["catch"](function (error) {
        _this3.loading = false;
        _this3.messages = error.response.data.messages;
      });
    }
  },
  components: {
    FormInput: _service_FormInput__WEBPACK_IMPORTED_MODULE_2__["default"]
  }
});

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
          _c("input", {
            ref: "product_img_upload",
            staticClass: "d-none",
            attrs: { type: "file", accept: "image/jpeg,image/png,image/gif" },
            on: { change: _vm.sync }
          }),
          _vm._v(" "),
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
                          _c(
                            "div",
                            { staticClass: "contented mb-10" },
                            [
                              _c("FormInput", {
                                attrs: {
                                  inputData: {
                                    type: "checkbox",
                                    mb: false,
                                    label: "Показать на главной странице",
                                    name: "entity.sp_main"
                                  }
                                }
                              })
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c("div", { staticClass: "contented mb-10" }, [
                            _c("div", { staticClass: "relative" }, [
                              _c(
                                "label",
                                {
                                  staticClass: "w-100 mb-0 pointer",
                                  attrs: { for: "sp_stock" }
                                },
                                [_vm._v("Акционный товар")]
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
                                        value: _vm.entity.sp_stock,
                                        expression: "entity.sp_stock"
                                      }
                                    ],
                                    staticClass: "not_default",
                                    attrs: { id: "sp_stock", type: "checkbox" },
                                    domProps: {
                                      checked: Array.isArray(
                                        _vm.entity.sp_stock
                                      )
                                        ? _vm._i(_vm.entity.sp_stock, null) > -1
                                        : _vm.entity.sp_stock
                                    },
                                    on: {
                                      change: function($event) {
                                        var $$a = _vm.entity.sp_stock,
                                          $$el = $event.target,
                                          $$c = $$el.checked ? true : false
                                        if (Array.isArray($$a)) {
                                          var $$v = null,
                                            $$i = _vm._i($$a, $$v)
                                          if ($$el.checked) {
                                            $$i < 0 &&
                                              _vm.$set(
                                                _vm.entity,
                                                "sp_stock",
                                                $$a.concat([$$v])
                                              )
                                          } else {
                                            $$i > -1 &&
                                              _vm.$set(
                                                _vm.entity,
                                                "sp_stock",
                                                $$a
                                                  .slice(0, $$i)
                                                  .concat($$a.slice($$i + 1))
                                              )
                                          }
                                        } else {
                                          _vm.$set(_vm.entity, "sp_stock", $$c)
                                        }
                                      }
                                    }
                                  }),
                                  _vm._v(" "),
                                  _c("span")
                                ]
                              )
                            ]),
                            _vm._v(" "),
                            _c(
                              "div",
                              {
                                staticClass: "stocks mb-5 mt-10",
                                class: { "d-none": !_vm.entity.sp_stock }
                              },
                              [
                                _vm._m(3),
                                _vm._v(" "),
                                _c(
                                  "div",
                                  { staticClass: "form-group d-flex" },
                                  [
                                    _c(
                                      "label",
                                      { staticClass: "col-sm-4 no-pl" },
                                      [_vm._v("Скидка")]
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "div",
                                      {
                                        staticClass:
                                          "input-group col-sm-8 no-pr"
                                      },
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
                                                {
                                                  name: "в процентах",
                                                  value: 0
                                                }
                                              ]
                                            }
                                          }
                                        })
                                      ],
                                      1
                                    )
                                  ]
                                ),
                                _vm._v(" "),
                                _vm._m(4)
                              ]
                            )
                          ]),
                          _vm._v(" "),
                          _c("FormInput", {
                            attrs: {
                              inputData: {
                                type: "input",
                                label: "Наименование продукта",
                                name: "entity.article",
                                placeholder: "Наименование продукта"
                              }
                            }
                          }),
                          _vm._v(" "),
                          _c("div", { staticClass: "d-flex mt-10" }, [
                            _c("div", { staticClass: "form-group" }, [
                              _c("div", { staticClass: "form-group mb-0" }, [
                                _c("label", [_vm._v("Основное фото")]),
                                _vm._v(" "),
                                _c(
                                  "div",
                                  { staticClass: "img_upload_cat_container" },
                                  [
                                    _vm.loading
                                      ? _c(
                                          "div",
                                          {
                                            staticClass:
                                              "list-placeholder mb-3",
                                            staticStyle: { height: "100px" }
                                          },
                                          [_vm._m(5)]
                                        )
                                      : _vm._e(),
                                    _vm._v(" "),
                                    !_vm.loading
                                      ? _c("img", {
                                          staticClass: "h-100 w-100 image",
                                          attrs: { src: _vm.entity.image }
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
                                  ]
                                )
                              ])
                            ]),
                            _vm._v(" "),
                            _vm._m(6)
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
    return _c("div", { staticClass: "form-group d-flex" }, [
      _c("label", { staticClass: "col-sm-4 no-pl" }, [_vm._v("Цена")]),
      _vm._v(" "),
      _c("div", { staticClass: "input-group col-sm-8 no-pr" }, [
        _c("input", {
          staticClass: "form-control discount",
          attrs: { type: "number", disabled: "" }
        })
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "form-group d-flex" }, [
      _c("label", { staticClass: "col-sm-4 no-pl" }, [_vm._v("Итого")]),
      _vm._v(" "),
      _c("div", { staticClass: "input-group col-sm-8 no-pr" }, [
        _c("input", {
          staticClass: "form-control",
          attrs: { type: "number", disabled: "" }
        })
      ])
    ])
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
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "flex-3 ml-15" }, [
      _c("label", [_vm._v("Описание продукта")]),
      _vm._v(" "),
      _c("textarea", {
        staticClass: "form-control p-5 resize-none border-radius-none",
        staticStyle: { height: "94px" },
        attrs: { placeholder: "Введите описание" }
      })
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvdGVtcGxhdGUvRGlhbG9ncy9Qcm9kdWN0RGlhbG9nLnZ1ZSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvY29tcG9uZW50cy90ZW1wbGF0ZS9EaWFsb2dzL1Byb2R1Y3REaWFsb2cudnVlPzVkYWMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvbWl4aW5zL2NhdGVnb3J5TWl4aW4uanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvbWl4aW5zL3N1cHBsaWVyTWl4aW4uanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvdGVtcGxhdGUvRGlhbG9ncy9Qcm9kdWN0RGlhbG9nLnZ1ZSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvY29tcG9uZW50cy90ZW1wbGF0ZS9EaWFsb2dzL1Byb2R1Y3REaWFsb2cudnVlP2E0N2QiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvdGVtcGxhdGUvRGlhbG9ncy9Qcm9kdWN0RGlhbG9nLnZ1ZT9iM2IxIl0sIm5hbWVzIjpbImNhdGVnb3J5TWl4aW4iLCJtZXRob2RzIiwic2V0Q2F0ZWdvcnkiLCJjYXRlZ29yeSIsImVudGl0eSIsImlkIiwibmFtZSIsIiRub3RpZnkiLCJncm91cCIsInR5cGUiLCJ0ZXh0Iiwic2VsZWN0Q2F0ZWdvcnkiLCIkZXZlbnRCdXMiLCIkZW1pdCIsInRhZyIsInBhcmFtcyIsInJvb3RfY2F0ZWdvcnkiLCJyZWYiLCJnZXRQYXJlbnRDYXRlZ29yeSIsImxvYWRpbmciLCJ3aW5kb3ciLCJheGlvcyIsIm1ldGhvZCIsInVybCIsInRoZW4iLCJyZXNwIiwiZGF0YSIsInN1cHBsaWVyTWl4aW4iLCJzZXRTdXBwbGllciIsInN1cHBsaWVyIiwic2VsZWN0U3VwcGxpZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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cmNlc0NvbnRlbnQiOlsiPHRlbXBsYXRlPlxuICAgIDxkaXY+XG4gICAgICAgIDwhLS0gICAgICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1oZWFkZXIgZGFya1wiIHN0eWxlPVwianVzdGlmeS1jb250ZW50OiBub3JtYWw7XCI+LS0+XG4gICAgICAgIDwhLS0gICAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9kYWwtYWx0LWhlYWRlclwiPi0tPlxuICAgICAgICA8IS0tICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaXRlbS10aXRsZSBfNTAwXCI+0KDQvtC30L3QuNGH0L3QsNGPINGG0LXQvdCwPC9zcGFuPi0tPlxuICAgICAgICA8IS0tICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpdGVtLWV4Y2VwdCBmb250LXdlaWdodC1ib2xkZXIgaC0xeFwiPi0tPlxuICAgICAgICA8IS0tICAgICAgICAgICAgICAgIDxzcGFuIGlkPVwidG90YWxfcHJpY2VcIj4tLT5cbiAgICAgICAgPCEtLSAgICAgICAgICAgICAgICAgICB7eyAkcHJvZHVjdC0+c3RvcmVzLT5maW5kKEF1dGg6OnVzZXIoKS0+Y3VycmVudF9zdG9yZSktPnBpdm90LT5yZXRhaWxfcHJpY2UgPz8gJzAnIH19LS0+XG4gICAgICAgIDwhLS0gICAgICAgICAgICAgICAgPC9zcGFuPi0tPlxuICAgICAgICA8IS0tICAgICAgICAgICAgICAgIDwvZGl2Pi0tPlxuICAgICAgICA8IS0tICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpdGVtLXRhZyB0YWcgaGlkZVwiPi0tPlxuICAgICAgICA8IS0tICAgICAgICAgICAgICAgIDwvZGl2Pi0tPlxuICAgICAgICA8IS0tICAgICAgICAgICAgPC9kaXY+LS0+XG4gICAgICAgIDwhLS0gICAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9kYWwtYWx0LWhlYWRlclwiPi0tPlxuICAgICAgICA8IS0tICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaXRlbS10aXRsZSBfNTAwXCI+0J3QsCDRgdCy0L7QtdC8INGB0LrQu9Cw0LTQtSAvINC90LAg0LTRgNGD0LPQuNGFPC9zcGFuPi0tPlxuICAgICAgICA8IS0tICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpdGVtLWV4Y2VwdCBmb250LXdlaWdodC1ib2xkZXIgaC0xeFwiPi0tPlxuICAgICAgICA8IS0tICAgICAgICAgICAgICAgIDxzcGFuIGlkPVwidG90YWxfcHJpY2VcIj4tLT5cbiAgICAgICAgPCEtLSAgICAgICAgICAgICAgICAgICB7eyAkcHJvZHVjdC0+Z2V0Q291bnRTZWxmT3RoZXJzKCkgfX0tLT5cbiAgICAgICAgPCEtLSAgICAgICAgICAgICAgICA8L3NwYW4+LS0+XG4gICAgICAgIDwhLS0gICAgICAgICAgICAgICAgPC9kaXY+LS0+XG4gICAgICAgIDwhLS0gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIml0ZW0tdGFnIHRhZyBoaWRlXCI+LS0+XG4gICAgICAgIDwhLS0gICAgICAgICAgICAgICAgPC9kaXY+LS0+XG4gICAgICAgIDwhLS0gICAgICAgICAgICA8L2Rpdj4tLT5cbiAgICAgICAgPCEtLSAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1hbHQtaGVhZGVyXCI+LS0+XG4gICAgICAgIDwhLS0gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJpdGVtLXRpdGxlIF81MDBcIj7QpdGA0LDQvdC10L3QuNC1PC9zcGFuPi0tPlxuICAgICAgICA8IS0tICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpdGVtLWV4Y2VwdCBmb250LXdlaWdodC1ib2xkZXIgaC0xeFwiPi0tPlxuICAgICAgICA8IS0tICAgICAgICAgICAgICAgIDxzcGFuIGlkPVwidG90YWxfcHJpY2VcIj4tLT5cbiAgICAgICAgPCEtLSAgICAgICAgICAgICAgICAgICB7ISEgJHByb2R1Y3QtPmdldFN0b3JhZ2VDb2RlKCkgISF9LS0+XG4gICAgICAgIDwhLS0gICAgICAgICAgICAgICAgPC9zcGFuPi0tPlxuICAgICAgICA8IS0tICAgICAgICAgICAgICAgIDwvZGl2Pi0tPlxuICAgICAgICA8IS0tICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpdGVtLXRhZyB0YWcgaGlkZVwiPi0tPlxuICAgICAgICA8IS0tICAgICAgICAgICAgICAgIDwvZGl2Pi0tPlxuICAgICAgICA8IS0tICAgICAgICAgICAgPC9kaXY+LS0+XG4gICAgICAgIDwhLS0gICAgICAgIDwvZGl2Pi0tPlxuXG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9kYWwtYm9keVwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwiZC1ub25lXCIgcmVmPVwicHJvZHVjdF9pbWdfdXBsb2FkXCIgdHlwZT1cImZpbGVcIiBAY2hhbmdlPVwic3luY1wiIGFjY2VwdD1cImltYWdlL2pwZWcsaW1hZ2UvcG5nLGltYWdlL2dpZlwiLz5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1zbS00IG5vLXByIGQtZmxleFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHVsIGNsYXNzPVwibmF2XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpIHYtZm9yPVwidGFiIGluIHRhYnNcIiB2LWJpbmQ6a2V5PVwidGFiLnNsdWdcIiB2LWJpbmQ6Y2xhc3M9XCJ7J2FjdGl2ZScgOiB0YWIuc3RhdGV9XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJuYXYtaXRlbVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSB2LW9uOmNsaWNrPVwic2VsZWN0VGFiKHRhYilcIiBjbGFzcz1cIm5hdi1saW5rXCIgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3sgdGFiLm5hbWUgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZmxvYXQtcmlnaHQgaGVscGVyX2RhbmdlciBkLW5vbmUtZlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYSBmYS1leGNsYW1hdGlvbi10cmlhbmdsZSB0ZXh0LW1kIG1sLTIgdGV4dC1kYW5nZXJcIj48L2k+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1zbS04IG5vLXBsXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGFiLWNvbnRlbnQgbm8tcGxcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGFiLXBhbmUgcC0zXCIgdi1iaW5kOmNsYXNzPVwieydhY3RpdmUnIDogdGFic1swXS5zdGF0ZX1cIj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8IS0tICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGlkPVwicHJvdmlkZXJfc2VhcmNoX2NvbnRhaW5lclwiIGNsYXNzPVwicHJvdmlkZXJfc2VhcmNoX2NvbnRhaW5lciBmYWRlXCIgZGF0YS1zaW1wbGViYXIgc3R5bGU9XCJoZWlnaHQ6IDMwMHB4O1wiPi0tPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8IS0tICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRcIj48L2Rpdj4tLT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPCEtLSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJlbXB0eV9zZWFyY2hcIj4tLT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPCEtLSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwib3V0X29mX3NlYXJjaFwiPjwvZGl2Pi0tPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8IS0tICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWNlbnRlclwiPtCg0LXQt9GD0LvRjNGC0LDRgtC+0LIg0L3QtdGCPC9kaXY+LS0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwhLS0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj4tLT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPCEtLSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+LS0+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEZvcm1JbnB1dCB2LWJpbmQ6aW5wdXREYXRhPVwie3R5cGU6J2lucHV0JyxsYWJlbDon0JDRgNGC0LjQutGD0LsnLG5hbWU6J2VudGl0eS5hcnRpY2xlJywgcGxhY2Vob2xkZXI6J9CQ0YDRgtC40LrRg9C7INC00LXRgtCw0LvQuCAo0L3QtSDQsdC+0LvQtdC1IDY0INGB0LjQvNCy0L7Qu9C+0LIpJ31cIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybUlucHV0IHYtYmluZDppbnB1dERhdGE9XCJ7dHlwZTonaW5wdXQnLGxhYmVsOifQndCw0LjQvNC10L3QvtCy0LDQvdC40LUnLG5hbWU6J2VudGl0eS5uYW1lJywgcGxhY2Vob2xkZXI6J9Cd0LDQuNC80LXQvdC+0LLQsNC90LjQtSAo0L3QtSDQsdC+0LvQtdC1IDI1NSDRgdC40LzQstC+0LvQvtCyKSd9XCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEZvcm1JbnB1dCB2LWJpbmQ6aW5wdXREYXRhPVwie3R5cGU6J3NlbGVjdG9yJyxsYWJlbDon0JIg0LrQsNGC0LXQs9C+0YDQuNC4JyxuYW1lOidlbnRpdHkuY2F0ZWdvcnkubmFtZScsIG9uQ2xpY2s6J3NlbGVjdENhdGVnb3J5J31cIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybUlucHV0IHYtYmluZDppbnB1dERhdGE9XCJ7dHlwZTonc2VsZWN0b3InLGxhYmVsOifQn9GA0L7QuNC30LLQvtC00LjRgtC10LvRjCcsbmFtZTonZW50aXR5LnN1cHBsaWVyLm5hbWUnLCBvbkNsaWNrOidzZWxlY3RTdXBwbGllcid9XCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPCEtLSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj4tLT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPCEtLSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEBmb3JlYWNoKCRzdG9yZXMgYXMgJHN0b3JlKS0tPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8IS0tICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsPtCg0L7Qt9C90LjRh9C90LDRjyDRhtC10L3QsCDQtNC70Y8g0LzQsNCz0LDQt9C40L3QsCBcInt7ICRzdG9yZS0+bmFtZSB9fVwiPC9sYWJlbD4tLT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPCEtLSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cCBtYi0zXCI+LS0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwhLS0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJudW1iZXJcIiBtaW49XCIwXCIgbmFtZT1cInN0b3JhZ2Vbe3sgJHN0b3JlLT5pZCB9fV1bcmV0YWlsX3ByaWNlXVwiIGNsYXNzPVwiZm9ybS1jb250cm9sIG1sLTBcIiBwbGFjZWhvbGRlcj1cItCg0L7Qt9C90LjRh9C90LDRjyDRhtC10L3QsFwiIHZhbHVlPVwiQGlmKCRwcm9kdWN0KXt7ICRwcm9kdWN0LT5zdG9yZXMtPmZpbmQoJHN0b3JlLT5pZCktPnBpdm90LT5yZXRhaWxfcHJpY2UgPz8gJzAnIH19QGVuZGlmXCIgPi0tPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8IS0tICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+LS0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwhLS0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBAZW5kZm9yZWFjaC0tPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8IS0tICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj4tLT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGFiLXBhbmVcIiB2LWJpbmQ6Y2xhc3M9XCJ7J2FjdGl2ZScgOiB0YWJzWzFdLnN0YXRlfVwiID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRhYmxlIGNsYXNzPVwidGFibGUgdy0xMDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aGVhZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGg+0KHQutC70LDQtDwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoPtCa0L7Qu9C40YfQtdGB0YLQstC+PC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGg+0KXRgNCw0L3QtdC90LjQtTwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90aGVhZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0Ym9keT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgINCc0LDQs9Cw0LfQuNC9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN0b3JhZ2Vfc3RvcmVfY29udGFpbmVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdmFsdWU9XCIgXCIgY2xhc3M9XCJzdG9yYWdlX3N0b3JlIGJiXzFcIiB0eXBlPVwidGV4dFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHZhbHVlPVwiIFwiIGNsYXNzPVwic3RvcmFnZV9zdG9yZSBiYl8yXCIgdHlwZT1cInRleHRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB2YWx1ZT1cIiBcIiBjbGFzcz1cInN0b3JhZ2Vfc3RvcmUgYmJfM1wiIHR5cGU9XCJ0ZXh0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdmFsdWU9XCIgXCIgY2xhc3M9XCJzdG9yYWdlX3N0b3JlIGJiXzRcIiB0eXBlPVwidGV4dFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGFibGU+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJib3ggbXQtMTBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJiYl9mYXEgZmFxXzFcIj7Ql9C+0L3QsCDRhdGA0LDQvdC10L3QuNGPPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYmJfZmFxIGZhcV8yXCI+0J3QvtC80LXRgCDRgdGC0LXQu9C70LDQttCwPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYmJfZmFxIGZhcV8zXCI+0J3QvtC80LXRgCDQstC10YDRgtC40LrQsNC70YzQvdC+0Lkg0YHQtdC60YbQuNC4INGB0YLQtdC70LvQsNC20LA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJiYl9mYXEgZmFxXzRcIj7QndC+0LzQtdGAINC/0L7Qu9C60Lg8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRhYi1wYW5lIHAtM1wiIHYtYmluZDpjbGFzcz1cInsnYWN0aXZlJyA6IHRhYnNbMl0uc3RhdGV9XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgdi1pZj1cInNob3BfYWN0aXZhdGVkXCIgaWQ9XCJ0YWJfbWFpblwiIGRhdGEtc2ltcGxlYmFyIHN0eWxlPVwiaGVpZ2h0OiAzMTBweDtcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb250ZW50ZWQgbWItMTBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybUlucHV0IHYtYmluZDppbnB1dERhdGE9XCJ7dHlwZTonY2hlY2tib3gnLG1iOmZhbHNlLCBsYWJlbDon0J/QvtC60LDQt9Cw0YLRjCDQvdCwINCz0LvQsNCy0L3QvtC5INGB0YLRgNCw0L3QuNGG0LUnLG5hbWU6J2VudGl0eS5zcF9tYWluJ31cIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29udGVudGVkIG1iLTEwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJlbGF0aXZlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJzcF9zdG9ja1wiIGNsYXNzPVwidy0xMDAgbWItMCBwb2ludGVyXCI+0JDQutGG0LjQvtC90L3Ri9C5INGC0L7QstCw0YA8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJhYnNvbHV0ZSBjdXN0b21fY2hlY2tib3hcIiBzdHlsZT1cInJpZ2h0OiAwOyB0b3A6IDNweDtcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBpZD1cInNwX3N0b2NrXCIgdi1tb2RlbD1cImVudGl0eS5zcF9zdG9ja1wiIHR5cGU9XCJjaGVja2JveFwiIGNsYXNzPVwibm90X2RlZmF1bHRcIi8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHYtYmluZDpjbGFzcz1cInsnZC1ub25lJzohZW50aXR5LnNwX3N0b2NrfVwiIGNsYXNzPVwic3RvY2tzIG1iLTUgbXQtMTBcIiA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgIGNsYXNzPVwiZm9ybS1ncm91cCBkLWZsZXhcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzcz1cImNvbC1zbS00IG5vLXBsXCI+0KbQtdC90LA8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwIGNvbC1zbS04IG5vLXByXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJudW1iZXJcIiBjbGFzcz1cImZvcm0tY29udHJvbCBkaXNjb3VudFwiIGRpc2FibGVkIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwIGQtZmxleFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzPVwiY29sLXNtLTQgbm8tcGxcIj7QodC60LjQtNC60LA8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwIGNvbC1zbS04IG5vLXByXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJudW1iZXJcIiBjbGFzcz1cImZvcm0tY29udHJvbCBkaXNjb3VudCBtci0xMFwiIC8+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8U2VsZWN0b3Igdi1iaW5kOmRhdGE9XCJ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6J2VudGl0eS5zcF9kaXNjb3VudF90eXBlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0X3ZhbHVlOjEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudHM6W1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7bmFtZTon0LIg0YDRg9Cx0LvRj9GFJywgdmFsdWU6MX0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtuYW1lOifQsiDQv9GA0L7RhtC10L3RgtCw0YUnLCB2YWx1ZTowfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2ICBjbGFzcz1cImZvcm0tZ3JvdXAgZC1mbGV4XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJjb2wtc20tNCBuby1wbFwiPtCY0YLQvtCz0L48L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwIGNvbC1zbS04IG5vLXByXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJudW1iZXJcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiIGRpc2FibGVkIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybUlucHV0IHYtYmluZDppbnB1dERhdGE9XCJ7dHlwZTonaW5wdXQnLGxhYmVsOifQndCw0LjQvNC10L3QvtCy0LDQvdC40LUg0L/RgNC+0LTRg9C60YLQsCcsbmFtZTonZW50aXR5LmFydGljbGUnLCBwbGFjZWhvbGRlcjon0J3QsNC40LzQtdC90L7QstCw0L3QuNC1INC/0YDQvtC00YPQutGC0LAnfVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZC1mbGV4IG10LTEwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXAgbWItMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsPtCe0YHQvdC+0LLQvdC+0LUg0YTQvtGC0L48L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImltZ191cGxvYWRfY2F0X2NvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgdi1pZj1cImxvYWRpbmdcIiBjbGFzcz1cImxpc3QtcGxhY2Vob2xkZXIgbWItM1wiIHN0eWxlPVwiaGVpZ2h0OiAxMDBweDtcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImxpc3QtcGxhY2Vob2xkZXJfaXRlbVwiIHN0eWxlPVwiaGVpZ2h0OiAxMDBweDtcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJsaXN0LXBsYWNlaG9sZGVyX2NlbGxcIiBzdHlsZT1cIndpZHRoOiAxMDAlXCIgPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nIHYtaWY9XCIhbG9hZGluZ1wiIGNsYXNzPVwiaC0xMDAgdy0xMDAgaW1hZ2VcIiA6c3JjPVwiZW50aXR5LmltYWdlXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiB2LWlmPVwiIWxvYWRpbmdcIiBAY2xpY2s9XCJ1cGxvYWRDbGljaygpXCIgY2xhc3M9XCJ1cGxvYWRfYnRuXCI+0JfQsNCz0YDRg9C30LjRgtGMPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmbGV4LTMgbWwtMTVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsPtCe0L/QuNGB0LDQvdC40LUg0L/RgNC+0LTRg9C60YLQsDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZXh0YXJlYSBjbGFzcz1cImZvcm0tY29udHJvbCBwLTUgcmVzaXplLW5vbmUgYm9yZGVyLXJhZGl1cy1ub25lXCIgcGxhY2Vob2xkZXI9XCLQktCy0LXQtNC40YLQtSDQvtC/0LjRgdCw0L3QuNC1XCIgc3R5bGU9XCJoZWlnaHQ6IDk0cHg7XCI+PC90ZXh0YXJlYT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiB2LWlmPVwiIXNob3BfYWN0aXZhdGVkXCI+0JDQutGC0LjQstC40YDRg9C50YLQtSDQuNC90YLQtdGA0L3QtdGCLdC80LDQs9Cw0LfQuNC9INCyIDxhIGNsYXNzPVwiYWpheC1uYXZcIiBocmVmPVwiI1wiPtC90LDRgdGC0YDQvtC50LrQsNGFPC9hPi48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiB2LWlmPVwiIXNob3BfYWN0aXZhdGVkXCI+0K3RgtC+INCx0LXRgdC/0LvQsNGC0L3Qvi48L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0YWItcGFuZSBwLTNcIiB2LWJpbmQ6Y2xhc3M9XCJ7J2FjdGl2ZScgOiB0YWJzWzNdLnN0YXRlfVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybUlucHV0IHYtYmluZDppbnB1dERhdGE9XCJ7dHlwZTonaW5wdXQnLGxhYmVsOifQqNGC0YDQuNGFLdC60L7QtCDQv9GA0L7QuNC30LLQvtC00LjRgtC10LvRjyAoRUFOIDEzKScsbmFtZTonYmFyY29kZScsIG1lc3NhZ2VzOm1lc3NhZ2VzLCBwbGFjZWhvbGRlcjon0KjRgtGA0LjRhdC60L7QtCd9XCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEZvcm1JbnB1dCB2LWJpbmQ6aW5wdXREYXRhPVwie3R5cGU6J2lucHV0JyxsYWJlbDon0JLQvdGD0YLRgNC10L3QvdC40Lkg0YjRgtGA0LjRhS3QutC+0LQgKEVBTiAxMyknLG5hbWU6J2JhcmNvZGVfbG9jYWwnLCBtZXNzYWdlczptZXNzYWdlcywgcGxhY2Vob2xkZXI6J9Co0YLRgNC40YXQutC+0LQg0YHQutC70LDQtNCwJ31cIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPCEtLTxkaXYgY2xhc3M9XCJ0YWItcGFuZVwiIGlkPVwie3sgJGNsYXNzIH19X3RhYl9lbnRyYW5jZXNcIiBkYXRhLXNpbXBsZWJhclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9XCJtYXgtaGVpZ2h0OiA0MDBweDtcIj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBAaWYoaXNzZXQoJHByb2R1Y3QtPmVudHJhbmNlcykgJiYgY291bnQoJHByb2R1Y3QtPmVudHJhbmNlcykpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0YWJsZT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGg+SUQ8L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aD7Qn9C+0YHRgtCw0LLRidC40Lo8L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aD7QmtC+0LvQuNGH0LXRgdGC0LLQvjwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoPtCU0LDRgtCwPC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEBmb3JlYWNoKCRwcm9kdWN0LT5lbnRyYW5jZXMgYXMgJGVudHJhbmNlKVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPnt7ICRlbnRyYW5jZS0+aWQgfX08L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD57eyAkZW50cmFuY2UtPnBhcnRuZXItPm9mZmljaWFsX25hbWUgPz8gJycgfX08L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD57eyAkZW50cmFuY2UtPnBpdm90LT5jb3VudCB9fTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPnt7ICRlbnRyYW5jZS0+cGl2b3QtPmNyZWF0ZWRfYXQgfX08L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQGVuZGZvcmVhY2hcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBAZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICDQn9C+0YHRgtGD0L/Qu9C10L3QuNGPINC90LUg0L3QsNC50LTQtdC90YtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQGVuZGlmXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj4tLT5cblxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1mb290ZXJcIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIEBjbGljaz1cIiRwYXJlbnQuY2xvc2VEaWFsb2coZGlhbG9nKVwiIHR5cGU9XCJzdWJtaXRcIiBjbGFzcz1cImJ1dHRvbiB3aGl0ZVwiPtCX0LDQutGA0YvRgtGMPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBAY2xpY2s9XCJzYXZlKClcIiB0eXBlPVwic3VibWl0XCIgY2xhc3M9XCJidXR0b24gcHJpbWFyeSBwdWxsLXJpZ2h0XCI+0KHQvtGF0YDQsNC90LjRgtGMPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzeXN0ZW1fbWVzc2FnZVwiPlxuXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuICAgIGltcG9ydCBjYXRlZ29yeU1peGluIGZyb20gXCIuLy4uLy4uL21peGlucy9jYXRlZ29yeU1peGluXCJcbiAgICBpbXBvcnQgc3VwcGxpZXJNaXhpbiBmcm9tIFwiLi8uLi8uLi9taXhpbnMvc3VwcGxpZXJNaXhpblwiXG4gICAgaW1wb3J0IEZvcm1JbnB1dCBmcm9tIFwiLi8uLi8uLi9zZXJ2aWNlL0Zvcm1JbnB1dFwiXG4gICAgZXhwb3J0IGRlZmF1bHQge1xuICAgICAgICBuYW1lOiBcIlByb2R1Y3REaWFsb2dcIixcbiAgICAgICAgcHJvcHM6IFsnZGlhbG9nJ10sXG4gICAgICAgIG1peGluczogW2NhdGVnb3J5TWl4aW4sIHN1cHBsaWVyTWl4aW5dLFxuICAgICAgICBkYXRhOiAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGdldCBzaG9wX2FjdGl2YXRlZCgpe1xuICAgICAgICAgICAgICAgICAgICBsZXQgbG9jYWxfc2V0dGluZ3MgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZVsnc2V0dGluZ3MnXSk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBpbmRleCA9IF8uZmluZEluZGV4KGxvY2FsX3NldHRpbmdzLCBmdW5jdGlvbihvKSB7IHJldHVybiBvLmtleSA9PT0gXCJzaG9wX2VuYWJsZWRcIjsgfSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBsb2NhbF9zZXR0aW5nc1tpbmRleF0gPyBCb29sZWFuKHBhcnNlSW50KGxvY2FsX3NldHRpbmdzW2luZGV4XS52YWx1ZSkpIDogZmFsc2U7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB0YWJzOiBbXG4gICAgICAgICAgICAgICAgICAgIHtzbHVnOiBcImJhc2VcIiwgbmFtZTogXCLQntGB0L3QvtCy0L3Ri9C1XCIsIHN0YXRlOiB0cnVlfSxcbiAgICAgICAgICAgICAgICAgICAge3NsdWc6IFwic3RvcmVcIiwgbmFtZTogXCLQodC60LvQsNC0XCIsIHN0YXRlOiBmYWxzZX0sXG4gICAgICAgICAgICAgICAgICAgIHtzbHVnOiBcInNob3BcIiwgbmFtZTogXCLQmNC90YLQtdGA0L3QtdGCINC80LDQs9Cw0LfQuNC9XCIsIHN0YXRlOiBmYWxzZX0sXG4gICAgICAgICAgICAgICAgICAgIHtzbHVnOiBcImJhcmNvZGVcIiwgbmFtZTogXCLQqNGC0YDQuNGF0LrQvtC0XCIsIHN0YXRlOiBmYWxzZX0sXG4gICAgICAgICAgICAgICAgICAgIHtzbHVnOiBcImVudHJhbmNlXCIsIG5hbWU6IFwi0J/QvtGB0YLRg9C/0LvQtdC90LjRj1wiLCBzdGF0ZTogZmFsc2V9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgcm9vdF9jYXRlZ29yeTogMixcbiAgICAgICAgICAgICAgICBlbnRpdHk6IHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTpudWxsLFxuICAgICAgICAgICAgICAgICAgICBhcnRpY2xlOm51bGwsXG4gICAgICAgICAgICAgICAgICAgIHNwX2Rpc2NvdW50X3R5cGU6XCIxXCIsXG4gICAgICAgICAgICAgICAgICAgIHNwX21haW46ZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIHNwX3N0b2NrOmZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBpbWFnZTogJy9pbWFnZXMvbm9faW1hZ2UucG5nJyxcbiAgICAgICAgICAgICAgICAgICAgY2F0ZWdvcnk6e1xuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6MixcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6bnVsbCxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgc3VwcGxpZXI6e1xuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6bnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6J9Cd0LUg0LLRi9Cx0YDQsNC9JyxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG1lc3NhZ2VzOnt9LFxuICAgICAgICAgICAgICAgIGxvYWRpbmc6ZmFsc2UsXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIG1vdW50ZWQoKSB7XG4gICAgICAgICAgICB0aGlzLmRpYWxvZy53aWR0aCA9IDYwMDtcbiAgICAgICAgICAgIGlmICh0aGlzLmRpYWxvZy5pZCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZGlhbG9nLnRpdGxlID0gXCLQndC+0LLRi9C5INC/0YDQvtC00YPQutGCXCI7XG4gICAgICAgICAgICAgICAgdGhpcy5nZXRQYXJlbnRDYXRlZ29yeSgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHdpbmRvdy5heGlvcyh7XG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZDogJ2dldCcsXG4gICAgICAgICAgICAgICAgICAgIHVybDogJy9wcm9kdWN0cy8nICsgdGhpcy5kaWFsb2cuaWQsXG4gICAgICAgICAgICAgICAgfSkudGhlbigocmVzcCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRpYWxvZy50aXRsZSA9IFwi0KDQtdC00LDQutGC0LjRgNC+0LLQsNC90LjQtSDRgtC+0LLQsNGA0LAgJ1wiICsgcmVzcC5kYXRhLm5hbWUgKyBcIidcIjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pZCA9IHJlc3AuZGF0YS5pZDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbnRpdHkgPSByZXNwLmRhdGE7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH0pLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZihlcnJvci5yZXNwb25zZS5zdGF0dXMgPT09IDQwNCl7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRwYXJlbnQuY2xvc2VEaWFsb2codGhpcy5kaWFsb2cpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBjb21wdXRlZDoge30sXG4gICAgICAgIG1ldGhvZHM6IHtcbiAgICAgICAgICAgIHN5bmMoZSl7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuaW1hZ2VfZmlsZSA9IGUudGFyZ2V0LmZpbGVzWzBdO1xuICAgICAgICAgICAgICAgIHRoaXMuc3luY0ltYWdlKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdXBsb2FkQ2xpY2soKXtcbiAgICAgICAgICAgICAgICB0aGlzLiRyZWZzLnByb2R1Y3RfaW1nX3VwbG9hZC5jbGljaygpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHN5bmNJbWFnZSgpe1xuICAgICAgICAgICAgICAgIGxldCBkYXRhID0gbmV3IEZvcm1EYXRhKCk7XG4gICAgICAgICAgICAgICAgZGF0YS5hcHBlbmQoJ2ltYWdlJywgdGhpcy5pbWFnZV9maWxlKTtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHdpbmRvdy5heGlvcyh7XG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZDogJ3Bvc3QnLFxuICAgICAgICAgICAgICAgICAgICB1cmw6ICcvaW1hZ2UvdXBsb2FkJyxcbiAgICAgICAgICAgICAgICAgICAgZGF0YTpkYXRhXG4gICAgICAgICAgICAgICAgfSkudGhlbigocmVzcCkgPT4gIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbnRpdHkuaW1hZ2UgPSByZXNwLmRhdGEuaW1hZ2VzWzBdLnVybDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbnRpdHkuaW1hZ2VfaWQgPSByZXNwLmRhdGEuaW1hZ2VzWzBdLmlkO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZWxlY3RUYWIodGFiKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50YWJzLmZvckVhY2goKHRhYikgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0YWIuc3RhdGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB0YWIuc3RhdGUgPSB0cnVlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNhdmUoKXtcbiAgICAgICAgICAgICAgICBsZXQgbWV0aG9kID0gdGhpcy5lbnRpdHkuaWQgPyAncGF0Y2gnIDogJ3Bvc3QnO1xuICAgICAgICAgICAgICAgIGxldCB1cmwgPSB0aGlzLmVudGl0eS5pZCA/ICcvJyArIHRoaXMuZW50aXR5LmlkIDogJyc7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB3aW5kb3cuYXhpb3Moe1xuICAgICAgICAgICAgICAgICAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICAgICAgICAgICAgICAgICAgdXJsOiAnL3Byb2R1Y3RzJyArIHVybCxcbiAgICAgICAgICAgICAgICAgICAgZGF0YTp0aGlzLmVudGl0eSxcbiAgICAgICAgICAgICAgICB9KS50aGVuKChyZXNwKSA9PiAge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLiRldmVudEJ1cy4kZW1pdCgnUHJvZHVjdFVwZGF0ZWQnLCB7aWQ6IHRoaXMuaWQsIGNhdGVnb3J5X2lkOnRoaXMuY2F0ZWdvcnlfaWR9KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kcGFyZW50LmNsb3NlRGlhbG9nKHRoaXMuZGlhbG9nKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1lc3NhZ2VzID0gZXJyb3IucmVzcG9uc2UuZGF0YS5tZXNzYWdlcztcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgY29tcG9uZW50czp7XG4gICAgICAgICAgICBGb3JtSW5wdXRcbiAgICAgICAgfVxuICAgIH1cbjwvc2NyaXB0PlxuIiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgX3ZtID0gdGhpc1xuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gIHJldHVybiBfYyhcImRpdlwiLCBbXG4gICAgX2MoXCJkaXZcIiwgW1xuICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJtb2RhbC1ib2R5XCIgfSwgW1xuICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcInJvd1wiIH0sIFtcbiAgICAgICAgICBfYyhcImlucHV0XCIsIHtcbiAgICAgICAgICAgIHJlZjogXCJwcm9kdWN0X2ltZ191cGxvYWRcIixcbiAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImQtbm9uZVwiLFxuICAgICAgICAgICAgYXR0cnM6IHsgdHlwZTogXCJmaWxlXCIsIGFjY2VwdDogXCJpbWFnZS9qcGVnLGltYWdlL3BuZyxpbWFnZS9naWZcIiB9LFxuICAgICAgICAgICAgb246IHsgY2hhbmdlOiBfdm0uc3luYyB9XG4gICAgICAgICAgfSksXG4gICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImNvbC1zbS00IG5vLXByIGQtZmxleFwiIH0sIFtcbiAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICBcInVsXCIsXG4gICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwibmF2XCIgfSxcbiAgICAgICAgICAgICAgX3ZtLl9sKF92bS50YWJzLCBmdW5jdGlvbih0YWIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gX2MoXG4gICAgICAgICAgICAgICAgICBcImxpXCIsXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGtleTogdGFiLnNsdWcsXG4gICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcIm5hdi1pdGVtXCIsXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzOiB7IGFjdGl2ZTogdGFiLnN0YXRlIH1cbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgIFwiYVwiLFxuICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcIm5hdi1saW5rXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBhdHRyczogeyBocmVmOiBcImphdmFzY3JpcHQ6dm9pZCgwKVwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF92bS5zZWxlY3RUYWIodGFiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl9zKHRhYi5uYW1lKSArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl9tKDAsIHRydWUpXG4gICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgMFxuICAgICAgICAgICAgKVxuICAgICAgICAgIF0pLFxuICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJjb2wtc20tOCBuby1wbFwiIH0sIFtcbiAgICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwidGFiLWNvbnRlbnQgbm8tcGxcIiB9LCBbXG4gICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwidGFiLXBhbmUgcC0zXCIsXG4gICAgICAgICAgICAgICAgICBjbGFzczogeyBhY3RpdmU6IF92bS50YWJzWzBdLnN0YXRlIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgIF9jKFwiRm9ybUlucHV0XCIsIHtcbiAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICBpbnB1dERhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiaW5wdXRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcItCQ0YDRgtC40LrRg9C7XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImVudGl0eS5hcnRpY2xlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogXCLQkNGA0YLQuNC60YPQuyDQtNC10YLQsNC70LggKNC90LUg0LHQvtC70LXQtSA2NCDRgdC40LzQstC+0LvQvtCyKVwiXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICBfYyhcIkZvcm1JbnB1dFwiLCB7XG4gICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgaW5wdXREYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcImlucHV0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCLQndCw0LjQvNC10L3QvtCy0LDQvdC40LVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZW50aXR5Lm5hbWVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBcItCd0LDQuNC80LXQvdC+0LLQsNC90LjQtSAo0L3QtSDQsdC+0LvQtdC1IDI1NSDRgdC40LzQstC+0LvQvtCyKVwiXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICBfYyhcIkZvcm1JbnB1dFwiLCB7XG4gICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgaW5wdXREYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcInNlbGVjdG9yXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCLQkiDQutCw0YLQtdCz0L7RgNC40LhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZW50aXR5LmNhdGVnb3J5Lm5hbWVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s6IFwic2VsZWN0Q2F0ZWdvcnlcIlxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgX2MoXCJGb3JtSW5wdXRcIiwge1xuICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgIGlucHV0RGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJzZWxlY3RvclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwi0J/RgNC+0LjQt9Cy0L7QtNC40YLQtdC70YxcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZW50aXR5LnN1cHBsaWVyLm5hbWVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s6IFwic2VsZWN0U3VwcGxpZXJcIlxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJ0YWItcGFuZVwiLFxuICAgICAgICAgICAgICAgICAgY2xhc3M6IHsgYWN0aXZlOiBfdm0udGFic1sxXS5zdGF0ZSB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBbX3ZtLl9tKDEpLCBfdm0uX3YoXCIgXCIpLCBfdm0uX20oMildXG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwidGFiLXBhbmUgcC0zXCIsXG4gICAgICAgICAgICAgICAgICBjbGFzczogeyBhY3RpdmU6IF92bS50YWJzWzJdLnN0YXRlIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgIF92bS5zaG9wX2FjdGl2YXRlZFxuICAgICAgICAgICAgICAgICAgICA/IF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljU3R5bGU6IHsgaGVpZ2h0OiBcIjMxMHB4XCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgaWQ6IFwidGFiX21haW5cIiwgXCJkYXRhLXNpbXBsZWJhclwiOiBcIlwiIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJjb250ZW50ZWQgbWItMTBcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiRm9ybUlucHV0XCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnB1dERhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiY2hlY2tib3hcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1iOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcItCf0L7QutCw0LfQsNGC0Ywg0L3QsCDQs9C70LDQstC90L7QuSDRgdGC0YDQsNC90LjRhtC1XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImVudGl0eS5zcF9tYWluXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiY29udGVudGVkIG1iLTEwXCIgfSwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwicmVsYXRpdmVcIiB9LCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsYWJlbFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwidy0xMDAgbWItMCBwb2ludGVyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgZm9yOiBcInNwX3N0b2NrXCIgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbX3ZtLl92KFwi0JDQutGG0LjQvtC90L3Ri9C5INGC0L7QstCw0YBcIildXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxhYmVsXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJhYnNvbHV0ZSBjdXN0b21fY2hlY2tib3hcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNTdHlsZTogeyByaWdodDogXCIwXCIsIHRvcDogXCIzcHhcIiB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcImlucHV0XCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpcmVjdGl2ZXM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibW9kZWxcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByYXdOYW1lOiBcInYtbW9kZWxcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogX3ZtLmVudGl0eS5zcF9zdG9jayxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcImVudGl0eS5zcF9zdG9ja1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJub3RfZGVmYXVsdFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgaWQ6IFwic3Bfc3RvY2tcIiwgdHlwZTogXCJjaGVja2JveFwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb21Qcm9wczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVja2VkOiBBcnJheS5pc0FycmF5KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5lbnRpdHkuc3Bfc3RvY2tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gX3ZtLl9pKF92bS5lbnRpdHkuc3Bfc3RvY2ssIG51bGwpID4gLTFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IF92bS5lbnRpdHkuc3Bfc3RvY2tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciAkJGEgPSBfdm0uZW50aXR5LnNwX3N0b2NrLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCRlbCA9ICRldmVudC50YXJnZXQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkJGMgPSAkJGVsLmNoZWNrZWQgPyB0cnVlIDogZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSgkJGEpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgJCR2ID0gbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCRpID0gX3ZtLl9pKCQkYSwgJCR2KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCQkZWwuY2hlY2tlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkJGkgPCAwICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLiRzZXQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uZW50aXR5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzcF9zdG9ja1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCRhLmNvbmNhdChbJCR2XSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkJGkgPiAtMSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS4kc2V0KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLmVudGl0eSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic3Bfc3RvY2tcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQkYVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc2xpY2UoMCwgJCRpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY29uY2F0KCQkYS5zbGljZSgkJGkgKyAxKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS4kc2V0KF92bS5lbnRpdHksIFwic3Bfc3RvY2tcIiwgJCRjKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJzcGFuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwic3RvY2tzIG1iLTUgbXQtMTBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M6IHsgXCJkLW5vbmVcIjogIV92bS5lbnRpdHkuc3Bfc3RvY2sgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl9tKDMpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwiZm9ybS1ncm91cCBkLWZsZXhcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxhYmVsXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwiY29sLXNtLTQgbm8tcGxcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbX3ZtLl92KFwi0KHQutC40LTQutCwXCIpXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJpbnB1dC1ncm91cCBjb2wtc20tOCBuby1wclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcImlucHV0XCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImZvcm0tY29udHJvbCBkaXNjb3VudCBtci0xMFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgdHlwZTogXCJudW1iZXJcIiB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcIlNlbGVjdG9yXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJlbnRpdHkuc3BfZGlzY291bnRfdHlwZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRfdmFsdWU6IDEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudHM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgbmFtZTogXCLQsiDRgNGD0LHQu9GP0YVcIiwgdmFsdWU6IDEgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCLQsiDQv9GA0L7RhtC10L3RgtCw0YVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IDBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX20oNClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcIkZvcm1JbnB1dFwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0RGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcImlucHV0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcItCd0LDQuNC80LXQvdC+0LLQsNC90LjQtSDQv9GA0L7QtNGD0LrRgtCwXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZW50aXR5LmFydGljbGVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFwi0J3QsNC40LzQtdC90L7QstCw0L3QuNC1INC/0YDQvtC00YPQutGC0LBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiZC1mbGV4IG10LTEwXCIgfSwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiZm9ybS1ncm91cFwiIH0sIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiZm9ybS1ncm91cCBtYi0wXCIgfSwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcImxhYmVsXCIsIFtfdm0uX3YoXCLQntGB0L3QvtCy0L3QvtC1INGE0L7RgtC+XCIpXSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJpbWdfdXBsb2FkX2NhdF9jb250YWluZXJcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5sb2FkaW5nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxpc3QtcGxhY2Vob2xkZXIgbWItM1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNTdHlsZTogeyBoZWlnaHQ6IFwiMTAwcHhcIiB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW192bS5fbSg1KV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogX3ZtLl9lKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIV92bS5sb2FkaW5nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gX2MoXCJpbWdcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiaC0xMDAgdy0xMDAgaW1hZ2VcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IHNyYzogX3ZtLmVudGl0eS5pbWFnZSB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBfdm0uX2UoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAhX3ZtLmxvYWRpbmdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic3BhblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJ1cGxvYWRfYnRuXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF92bS51cGxvYWRDbGljaygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW192bS5fdihcItCX0LDQs9GA0YPQt9C40YLRjFwiKV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogX3ZtLl9lKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX20oNilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICA6IF92bS5fZSgpLFxuICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICFfdm0uc2hvcF9hY3RpdmF0ZWRcbiAgICAgICAgICAgICAgICAgICAgPyBfYyhcImRpdlwiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCLQkNC60YLQuNCy0LjRgNGD0LnRgtC1INC40L3RgtC10YDQvdC10YIt0LzQsNCz0LDQt9C40L0g0LIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiYVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcImFqYXgtbmF2XCIsIGF0dHJzOiB7IGhyZWY6IFwiI1wiIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW192bS5fdihcItC90LDRgdGC0YDQvtC50LrQsNGFXCIpXVxuICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIi5cIilcbiAgICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgICA6IF92bS5fZSgpLFxuICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICFfdm0uc2hvcF9hY3RpdmF0ZWRcbiAgICAgICAgICAgICAgICAgICAgPyBfYyhcImRpdlwiLCBbX3ZtLl92KFwi0K3RgtC+INCx0LXRgdC/0LvQsNGC0L3Qvi5cIildKVxuICAgICAgICAgICAgICAgICAgICA6IF92bS5fZSgpXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcInRhYi1wYW5lIHAtM1wiLFxuICAgICAgICAgICAgICAgICAgY2xhc3M6IHsgYWN0aXZlOiBfdm0udGFic1szXS5zdGF0ZSB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICBfYyhcIkZvcm1JbnB1dFwiLCB7XG4gICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgaW5wdXREYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcImlucHV0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCLQqNGC0YDQuNGFLdC60L7QtCDQv9GA0L7QuNC30LLQvtC00LjRgtC10LvRjyAoRUFOIDEzKVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJiYXJjb2RlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlczogX3ZtLm1lc3NhZ2VzLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFwi0KjRgtGA0LjRhdC60L7QtFwiXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICBfYyhcIkZvcm1JbnB1dFwiLCB7XG4gICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgaW5wdXREYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcImlucHV0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCLQktC90YPRgtGA0LXQvdC90LjQuSDRiNGC0YDQuNGFLdC60L7QtCAoRUFOIDEzKVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJiYXJjb2RlX2xvY2FsXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlczogX3ZtLm1lc3NhZ2VzLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFwi0KjRgtGA0LjRhdC60L7QtCDRgdC60LvQsNC00LBcIlxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgXSlcbiAgICAgICAgICBdKVxuICAgICAgICBdKVxuICAgICAgXSksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJtb2RhbC1mb290ZXJcIiB9LCBbXG4gICAgICAgIF9jKFxuICAgICAgICAgIFwiYnV0dG9uXCIsXG4gICAgICAgICAge1xuICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiYnV0dG9uIHdoaXRlXCIsXG4gICAgICAgICAgICBhdHRyczogeyB0eXBlOiBcInN1Ym1pdFwiIH0sXG4gICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF92bS4kcGFyZW50LmNsb3NlRGlhbG9nKF92bS5kaWFsb2cpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIFtfdm0uX3YoXCLQl9Cw0LrRgNGL0YLRjFwiKV1cbiAgICAgICAgKSxcbiAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgX2MoXG4gICAgICAgICAgXCJidXR0b25cIixcbiAgICAgICAgICB7XG4gICAgICAgICAgICBzdGF0aWNDbGFzczogXCJidXR0b24gcHJpbWFyeSBwdWxsLXJpZ2h0XCIsXG4gICAgICAgICAgICBhdHRyczogeyB0eXBlOiBcInN1Ym1pdFwiIH0sXG4gICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF92bS5zYXZlKClcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgW192bS5fdihcItCh0L7RhdGA0LDQvdC40YLRjFwiKV1cbiAgICAgICAgKVxuICAgICAgXSksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJzeXN0ZW1fbWVzc2FnZVwiIH0pXG4gICAgXSlcbiAgXSlcbn1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXG4gIGZ1bmN0aW9uKCkge1xuICAgIHZhciBfdm0gPSB0aGlzXG4gICAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gICAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gICAgcmV0dXJuIF9jKFwic3BhblwiLCB7IHN0YXRpY0NsYXNzOiBcImZsb2F0LXJpZ2h0IGhlbHBlcl9kYW5nZXIgZC1ub25lLWZcIiB9LCBbXG4gICAgICBfYyhcImlcIiwge1xuICAgICAgICBzdGF0aWNDbGFzczogXCJmYSBmYS1leGNsYW1hdGlvbi10cmlhbmdsZSB0ZXh0LW1kIG1sLTIgdGV4dC1kYW5nZXJcIlxuICAgICAgfSlcbiAgICBdKVxuICB9LFxuICBmdW5jdGlvbigpIHtcbiAgICB2YXIgX3ZtID0gdGhpc1xuICAgIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICAgIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICAgIHJldHVybiBfYyhcInRhYmxlXCIsIHsgc3RhdGljQ2xhc3M6IFwidGFibGUgdy0xMDBcIiB9LCBbXG4gICAgICBfYyhcInRoZWFkXCIsIFtcbiAgICAgICAgX2MoXCJ0clwiLCBbXG4gICAgICAgICAgX2MoXCJ0aFwiLCBbX3ZtLl92KFwi0KHQutC70LDQtFwiKV0pLFxuICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgX2MoXCJ0aFwiLCBbX3ZtLl92KFwi0JrQvtC70LjRh9C10YHRgtCy0L5cIildKSxcbiAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgIF9jKFwidGhcIiwgW192bS5fdihcItCl0YDQsNC90LXQvdC40LVcIildKVxuICAgICAgICBdKVxuICAgICAgXSksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX2MoXCJ0Ym9keVwiLCBbXG4gICAgICAgIF9jKFwidHJcIiwgW1xuICAgICAgICAgIF9jKFwidGRcIiwgW1xuICAgICAgICAgICAgX3ZtLl92KFxuICAgICAgICAgICAgICBcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICDQnNCw0LPQsNC30LjQvVxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICApXG4gICAgICAgICAgXSksXG4gICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICBfYyhcInRkXCIsIFtcbiAgICAgICAgICAgIF92bS5fdihcbiAgICAgICAgICAgICAgXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICApXG4gICAgICAgICAgXSksXG4gICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICBfYyhcInRkXCIsIFtcbiAgICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwic3RvcmFnZV9zdG9yZV9jb250YWluZXJcIiB9LCBbXG4gICAgICAgICAgICAgIF9jKFwiaW5wdXRcIiwge1xuICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcInN0b3JhZ2Vfc3RvcmUgYmJfMVwiLFxuICAgICAgICAgICAgICAgIGF0dHJzOiB7IHZhbHVlOiBcIiBcIiwgdHlwZTogXCJ0ZXh0XCIgfVxuICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgX2MoXCJpbnB1dFwiLCB7XG4gICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwic3RvcmFnZV9zdG9yZSBiYl8yXCIsXG4gICAgICAgICAgICAgICAgYXR0cnM6IHsgdmFsdWU6IFwiIFwiLCB0eXBlOiBcInRleHRcIiB9XG4gICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICBfYyhcImlucHV0XCIsIHtcbiAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJzdG9yYWdlX3N0b3JlIGJiXzNcIixcbiAgICAgICAgICAgICAgICBhdHRyczogeyB2YWx1ZTogXCIgXCIsIHR5cGU6IFwidGV4dFwiIH1cbiAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgIF9jKFwiaW5wdXRcIiwge1xuICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcInN0b3JhZ2Vfc3RvcmUgYmJfNFwiLFxuICAgICAgICAgICAgICAgIGF0dHJzOiB7IHZhbHVlOiBcIiBcIiwgdHlwZTogXCJ0ZXh0XCIgfVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgXSlcbiAgICAgICAgICBdKVxuICAgICAgICBdKVxuICAgICAgXSlcbiAgICBdKVxuICB9LFxuICBmdW5jdGlvbigpIHtcbiAgICB2YXIgX3ZtID0gdGhpc1xuICAgIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICAgIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICAgIHJldHVybiBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImJveCBtdC0xMFwiIH0sIFtcbiAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiYmJfZmFxIGZhcV8xXCIgfSwgW192bS5fdihcItCX0L7QvdCwINGF0YDQsNC90LXQvdC40Y9cIildKSxcbiAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImJiX2ZhcSBmYXFfMlwiIH0sIFtfdm0uX3YoXCLQndC+0LzQtdGAINGB0YLQtdC70LvQsNC20LBcIildKSxcbiAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImJiX2ZhcSBmYXFfM1wiIH0sIFtcbiAgICAgICAgX3ZtLl92KFwi0J3QvtC80LXRgCDQstC10YDRgtC40LrQsNC70YzQvdC+0Lkg0YHQtdC60YbQuNC4INGB0YLQtdC70LvQsNC20LBcIilcbiAgICAgIF0pLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiYmJfZmFxIGZhcV80XCIgfSwgW192bS5fdihcItCd0L7QvNC10YAg0L/QvtC70LrQuFwiKV0pXG4gICAgXSlcbiAgfSxcbiAgZnVuY3Rpb24oKSB7XG4gICAgdmFyIF92bSA9IHRoaXNcbiAgICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgICByZXR1cm4gX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJmb3JtLWdyb3VwIGQtZmxleFwiIH0sIFtcbiAgICAgIF9jKFwibGFiZWxcIiwgeyBzdGF0aWNDbGFzczogXCJjb2wtc20tNCBuby1wbFwiIH0sIFtfdm0uX3YoXCLQptC10L3QsFwiKV0pLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiaW5wdXQtZ3JvdXAgY29sLXNtLTggbm8tcHJcIiB9LCBbXG4gICAgICAgIF9jKFwiaW5wdXRcIiwge1xuICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImZvcm0tY29udHJvbCBkaXNjb3VudFwiLFxuICAgICAgICAgIGF0dHJzOiB7IHR5cGU6IFwibnVtYmVyXCIsIGRpc2FibGVkOiBcIlwiIH1cbiAgICAgICAgfSlcbiAgICAgIF0pXG4gICAgXSlcbiAgfSxcbiAgZnVuY3Rpb24oKSB7XG4gICAgdmFyIF92bSA9IHRoaXNcbiAgICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgICByZXR1cm4gX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJmb3JtLWdyb3VwIGQtZmxleFwiIH0sIFtcbiAgICAgIF9jKFwibGFiZWxcIiwgeyBzdGF0aWNDbGFzczogXCJjb2wtc20tNCBuby1wbFwiIH0sIFtfdm0uX3YoXCLQmNGC0L7Qs9C+XCIpXSksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJpbnB1dC1ncm91cCBjb2wtc20tOCBuby1wclwiIH0sIFtcbiAgICAgICAgX2MoXCJpbnB1dFwiLCB7XG4gICAgICAgICAgc3RhdGljQ2xhc3M6IFwiZm9ybS1jb250cm9sXCIsXG4gICAgICAgICAgYXR0cnM6IHsgdHlwZTogXCJudW1iZXJcIiwgZGlzYWJsZWQ6IFwiXCIgfVxuICAgICAgICB9KVxuICAgICAgXSlcbiAgICBdKVxuICB9LFxuICBmdW5jdGlvbigpIHtcbiAgICB2YXIgX3ZtID0gdGhpc1xuICAgIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICAgIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICAgIHJldHVybiBfYyhcbiAgICAgIFwiZGl2XCIsXG4gICAgICB7XG4gICAgICAgIHN0YXRpY0NsYXNzOiBcImxpc3QtcGxhY2Vob2xkZXJfaXRlbVwiLFxuICAgICAgICBzdGF0aWNTdHlsZTogeyBoZWlnaHQ6IFwiMTAwcHhcIiB9XG4gICAgICB9LFxuICAgICAgW1xuICAgICAgICBfYyhcImRpdlwiLCB7XG4gICAgICAgICAgc3RhdGljQ2xhc3M6IFwibGlzdC1wbGFjZWhvbGRlcl9jZWxsXCIsXG4gICAgICAgICAgc3RhdGljU3R5bGU6IHsgd2lkdGg6IFwiMTAwJVwiIH1cbiAgICAgICAgfSlcbiAgICAgIF1cbiAgICApXG4gIH0sXG4gIGZ1bmN0aW9uKCkge1xuICAgIHZhciBfdm0gPSB0aGlzXG4gICAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gICAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gICAgcmV0dXJuIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiZmxleC0zIG1sLTE1XCIgfSwgW1xuICAgICAgX2MoXCJsYWJlbFwiLCBbX3ZtLl92KFwi0J7Qv9C40YHQsNC90LjQtSDQv9GA0L7QtNGD0LrRgtCwXCIpXSksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX2MoXCJ0ZXh0YXJlYVwiLCB7XG4gICAgICAgIHN0YXRpY0NsYXNzOiBcImZvcm0tY29udHJvbCBwLTUgcmVzaXplLW5vbmUgYm9yZGVyLXJhZGl1cy1ub25lXCIsXG4gICAgICAgIHN0YXRpY1N0eWxlOiB7IGhlaWdodDogXCI5NHB4XCIgfSxcbiAgICAgICAgYXR0cnM6IHsgcGxhY2Vob2xkZXI6IFwi0JLQstC10LTQuNGC0LUg0L7Qv9C40YHQsNC90LjQtVwiIH1cbiAgICAgIH0pXG4gICAgXSlcbiAgfVxuXVxucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5cbmV4cG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0iLCJsZXQgY2F0ZWdvcnlNaXhpbiA9IHtcbiAgICBtZXRob2RzOiB7XG4gICAgICAgIHNldENhdGVnb3J5KGNhdGVnb3J5KXtcbiAgICAgICAgICAgIHRoaXMuZW50aXR5LmNhdGVnb3J5LmlkID0gY2F0ZWdvcnkuaWQ7XG4gICAgICAgICAgICB0aGlzLmVudGl0eS5jYXRlZ29yeS5uYW1lID0gY2F0ZWdvcnkubmFtZTtcbiAgICAgICAgICAgIHRoaXMuJG5vdGlmeSh7XG4gICAgICAgICAgICAgICAgZ3JvdXA6ICdtYWluJyxcbiAgICAgICAgICAgICAgICB0eXBlOiAnc3VjY2VzcycsXG4gICAgICAgICAgICAgICAgdGV4dDogJ9Ca0LDRgtC10LPQvtGA0LjRjyDQstGL0LHRgNCw0L3QsCdcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBzZWxlY3RDYXRlZ29yeSgpe1xuICAgICAgICAgICAgdGhpcy4kZXZlbnRCdXMuJGVtaXQoJ29wZW5EaWFsb2cnLCB7XG4gICAgICAgICAgICAgICAgdGFnOiAnc2VsZWN0Q2F0ZWdvcnknLFxuICAgICAgICAgICAgICAgIHBhcmFtczoge3Jvb3RfY2F0ZWdvcnk6dGhpcy5yb290X2NhdGVnb3J5LCByZWY6IHRoaXN9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0UGFyZW50Q2F0ZWdvcnkoKXtcbiAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IHRydWU7XG4gICAgICAgICAgICB3aW5kb3cuYXhpb3Moe1xuICAgICAgICAgICAgICAgIG1ldGhvZDogJ2dldCcsXG4gICAgICAgICAgICAgICAgdXJsOiAnL2NhdGVnb3JpZXMvJyArIHRoaXMuZW50aXR5LmNhdGVnb3J5LmlkLFxuICAgICAgICAgICAgfSkudGhlbigocmVzcCkgPT4gIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVudGl0eS5jYXRlZ29yeS5pZCA9IHJlc3AuZGF0YS5pZDtcbiAgICAgICAgICAgICAgICB0aGlzLmVudGl0eS5jYXRlZ29yeS5uYW1lID0gcmVzcC5kYXRhLm5hbWU7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICB9XG59O1xuZXhwb3J0IGRlZmF1bHQgY2F0ZWdvcnlNaXhpbjtcbiIsImxldCBzdXBwbGllck1peGluID0ge1xuICAgIG1ldGhvZHM6IHtcbiAgICAgICAgc2V0U3VwcGxpZXIoc3VwcGxpZXIpe1xuICAgICAgICAgICAgdGhpcy5lbnRpdHkuc3VwcGxpZXIuaWQgPSBzdXBwbGllci5pZDtcbiAgICAgICAgICAgIHRoaXMuZW50aXR5LnN1cHBsaWVyLm5hbWUgPSBzdXBwbGllci5uYW1lO1xuICAgICAgICAgICAgdGhpcy4kbm90aWZ5KHtcbiAgICAgICAgICAgICAgICBncm91cDogJ21haW4nLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdzdWNjZXNzJyxcbiAgICAgICAgICAgICAgICB0ZXh0OiAn0J/RgNC+0LjQt9Cy0L7QtNC40YLQtdC70Ywg0LLRi9Cx0YDQsNC9J1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIHNlbGVjdFN1cHBsaWVyKCl7XG4gICAgICAgICAgICB0aGlzLiRldmVudEJ1cy4kZW1pdCgnb3BlbkRpYWxvZycsIHtcbiAgICAgICAgICAgICAgICB0YWc6ICdzZWxlY3RTdXBwbGllcicsXG4gICAgICAgICAgICAgICAgcGFyYW1zOiB7cmVmOiB0aGlzfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgfVxufTtcbmV4cG9ydCBkZWZhdWx0IHN1cHBsaWVyTWl4aW47XG4iLCJpbXBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IGZyb20gXCIuL1Byb2R1Y3REaWFsb2cudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTE5MDk1MjI5JlwiXG5pbXBvcnQgc2NyaXB0IGZyb20gXCIuL1Byb2R1Y3REaWFsb2cudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5leHBvcnQgKiBmcm9tIFwiLi9Qcm9kdWN0RGlhbG9nLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuXG5cbi8qIG5vcm1hbGl6ZSBjb21wb25lbnQgKi9cbmltcG9ydCBub3JtYWxpemVyIGZyb20gXCIhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3J1bnRpbWUvY29tcG9uZW50Tm9ybWFsaXplci5qc1wiXG52YXIgY29tcG9uZW50ID0gbm9ybWFsaXplcihcbiAgc2NyaXB0LFxuICByZW5kZXIsXG4gIHN0YXRpY1JlbmRlckZucyxcbiAgZmFsc2UsXG4gIG51bGwsXG4gIG51bGwsXG4gIG51bGxcbiAgXG4pXG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7XG4gIHZhciBhcGkgPSByZXF1aXJlKFwiQzpcXFxcT3BlblNlcnZlclxcXFxkb21haW5zXFxcXEF1dG9DUk1cXFxcbm9kZV9tb2R1bGVzXFxcXHZ1ZS1ob3QtcmVsb2FkLWFwaVxcXFxkaXN0XFxcXGluZGV4LmpzXCIpXG4gIGFwaS5pbnN0YWxsKHJlcXVpcmUoJ3Z1ZScpKVxuICBpZiAoYXBpLmNvbXBhdGlibGUpIHtcbiAgICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gICAgaWYgKCFhcGkuaXNSZWNvcmRlZCgnMTkwOTUyMjknKSkge1xuICAgICAgYXBpLmNyZWF0ZVJlY29yZCgnMTkwOTUyMjknLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbG9hZCgnMTkwOTUyMjknLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIuL1Byb2R1Y3REaWFsb2cudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTE5MDk1MjI5JlwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICBhcGkucmVyZW5kZXIoJzE5MDk1MjI5Jywge1xuICAgICAgICByZW5kZXI6IHJlbmRlcixcbiAgICAgICAgc3RhdGljUmVuZGVyRm5zOiBzdGF0aWNSZW5kZXJGbnNcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxufVxuY29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJyZXNvdXJjZXMvanMvY29tcG9uZW50cy90ZW1wbGF0ZS9EaWFsb2dzL1Byb2R1Y3REaWFsb2cudnVlXCJcbmV4cG9ydCBkZWZhdWx0IGNvbXBvbmVudC5leHBvcnRzIiwiaW1wb3J0IG1vZCBmcm9tIFwiLSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS00LTAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9Qcm9kdWN0RGlhbG9nLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIjsgZXhwb3J0IGRlZmF1bHQgbW9kOyBleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS00LTAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9Qcm9kdWN0RGlhbG9nLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIiIsImV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3RlbXBsYXRlTG9hZGVyLmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9Qcm9kdWN0RGlhbG9nLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD0xOTA5NTIyOSZcIiJdLCJzb3VyY2VSb290IjoiIn0=