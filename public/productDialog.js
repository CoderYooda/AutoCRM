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
//
//
//
//
//
//
//
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
  computed: {
    image: function image() {
      return this.entity.image && this.entity.image.url ? this.entity.image.url : '/images/no_image.png';
    }
  },
  methods: {
    addSpecification: function addSpecification() {
      this.entity.specifications.unshift({
        label: null,
        value: null
      });
    },
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
        _this2.entity.image = {};
        _this2.entity.image.url = resp.data.images[0].url;
        _this2.entity.image.id = resp.data.images[0].id;
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
                          ref: "tabmain",
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
                                _c(
                                  "div",
                                  { staticClass: "form-group d-flex" },
                                  [
                                    _c(
                                      "label",
                                      { staticClass: "col-sm-4 no-pl" },
                                      [_vm._v("Цена")]
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
                                          directives: [
                                            {
                                              name: "model",
                                              rawName: "v-model",
                                              value:
                                                _vm.entity.sp_discount_price,
                                              expression:
                                                "entity.sp_discount_price"
                                            }
                                          ],
                                          staticClass: "form-control discount",
                                          attrs: {
                                            type: "number",
                                            disabled: ""
                                          },
                                          domProps: {
                                            value: _vm.entity.sp_discount_price
                                          },
                                          on: {
                                            input: function($event) {
                                              if ($event.target.composing) {
                                                return
                                              }
                                              _vm.$set(
                                                _vm.entity,
                                                "sp_discount_price",
                                                $event.target.value
                                              )
                                            }
                                          }
                                        })
                                      ]
                                    )
                                  ]
                                ),
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
                                          directives: [
                                            {
                                              name: "model",
                                              rawName: "v-model",
                                              value: _vm.entity.sp_discount,
                                              expression: "entity.sp_discount"
                                            }
                                          ],
                                          staticClass:
                                            "form-control discount mr-10",
                                          staticStyle: { flex: "0.6" },
                                          attrs: { type: "number" },
                                          domProps: {
                                            value: _vm.entity.sp_discount
                                          },
                                          on: {
                                            input: function($event) {
                                              if ($event.target.composing) {
                                                return
                                              }
                                              _vm.$set(
                                                _vm.entity,
                                                "sp_discount",
                                                $event.target.value
                                              )
                                            }
                                          }
                                        }),
                                        _vm._v(" "),
                                        _c("Selector", {
                                          attrs: {
                                            data: {
                                              model: "entity.sp_discount_type",
                                              default_value: 1,
                                              elements: [
                                                { name: "в рублях", value: 0 },
                                                {
                                                  name: "в процентах",
                                                  value: 1
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
                                _c(
                                  "div",
                                  { staticClass: "form-group d-flex" },
                                  [
                                    _c(
                                      "label",
                                      { staticClass: "col-sm-4 no-pl" },
                                      [_vm._v("Итого")]
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
                                          directives: [
                                            {
                                              name: "model",
                                              rawName: "v-model",
                                              value:
                                                _vm.entity.sp_discount_total,
                                              expression:
                                                "entity.sp_discount_total"
                                            }
                                          ],
                                          staticClass: "form-control",
                                          attrs: {
                                            type: "number",
                                            disabled: ""
                                          },
                                          domProps: {
                                            value: _vm.entity.sp_discount_total
                                          },
                                          on: {
                                            input: function($event) {
                                              if ($event.target.composing) {
                                                return
                                              }
                                              _vm.$set(
                                                _vm.entity,
                                                "sp_discount_total",
                                                $event.target.value
                                              )
                                            }
                                          }
                                        })
                                      ]
                                    )
                                  ]
                                )
                              ]
                            )
                          ]),
                          _vm._v(" "),
                          _c("FormInput", {
                            attrs: {
                              inputData: {
                                type: "input",
                                label: "Наименование продукта",
                                name: "entity.sp_name",
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
                                          [_vm._m(3)]
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
                                  ]
                                )
                              ])
                            ]),
                            _vm._v(" "),
                            _c("div", { staticClass: "flex-3 ml-15" }, [
                              _c("label", [_vm._v("Описание продукта")]),
                              _vm._v(" "),
                              _c("textarea", {
                                directives: [
                                  {
                                    name: "model",
                                    rawName: "v-model",
                                    value: _vm.entity.sp_desc,
                                    expression: "entity.sp_desc"
                                  }
                                ],
                                staticClass:
                                  "form-control p-5 resize-none border-radius-none",
                                staticStyle: { height: "94px" },
                                attrs: { placeholder: "Введите описание" },
                                domProps: { value: _vm.entity.sp_desc },
                                on: {
                                  input: function($event) {
                                    if ($event.target.composing) {
                                      return
                                    }
                                    _vm.$set(
                                      _vm.entity,
                                      "sp_desc",
                                      $event.target.value
                                    )
                                  }
                                }
                              })
                            ])
                          ]),
                          _vm._v(" "),
                          _c(
                            "div",
                            { staticClass: "form-group" },
                            [
                              _c("label", [_vm._v("Характеристики")]),
                              _vm._v(" "),
                              _c(
                                "a",
                                {
                                  staticClass: "float-right",
                                  attrs: { href: "javascript:void(0)" },
                                  on: {
                                    click: function($event) {
                                      return _vm.addSpecification()
                                    }
                                  }
                                },
                                [_vm._v("Добавить")]
                              ),
                              _vm._v(" "),
                              _vm._l(_vm.entity.specifications, function(
                                specification
                              ) {
                                return _c(
                                  "div",
                                  { staticClass: "specifications" },
                                  [
                                    _c(
                                      "div",
                                      {
                                        staticClass: "element copy d-flex mb-10"
                                      },
                                      [
                                        _vm._m(4, true),
                                        _vm._v(" "),
                                        _c(
                                          "div",
                                          { staticClass: "ml-15 flex-1" },
                                          [
                                            _c("input", {
                                              directives: [
                                                {
                                                  name: "model",
                                                  rawName: "v-model",
                                                  value: specification.label,
                                                  expression:
                                                    "specification.label"
                                                }
                                              ],
                                              staticClass: "form-control",
                                              attrs: {
                                                type: "text",
                                                placeholder: "Вязкость"
                                              },
                                              domProps: {
                                                value: specification.label
                                              },
                                              on: {
                                                input: function($event) {
                                                  if ($event.target.composing) {
                                                    return
                                                  }
                                                  _vm.$set(
                                                    specification,
                                                    "label",
                                                    $event.target.value
                                                  )
                                                }
                                              }
                                            }),
                                            _vm._v(" "),
                                            _c("input", {
                                              directives: [
                                                {
                                                  name: "model",
                                                  rawName: "v-model",
                                                  value: specification.value,
                                                  expression:
                                                    "specification.value"
                                                }
                                              ],
                                              staticClass: "form-control mt-5",
                                              attrs: {
                                                type: "text",
                                                placeholder: "5W40"
                                              },
                                              domProps: {
                                                value: specification.value
                                              },
                                              on: {
                                                input: function($event) {
                                                  if ($event.target.composing) {
                                                    return
                                                  }
                                                  _vm.$set(
                                                    specification,
                                                    "value",
                                                    $event.target.value
                                                  )
                                                }
                                              }
                                            })
                                          ]
                                        ),
                                        _vm._v(" "),
                                        _c("div", {
                                          staticClass: "remove pointer ml-10"
                                        })
                                      ]
                                    )
                                  ]
                                )
                              })
                            ],
                            2
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
                        name: "entity.barcode",
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
                        name: "entity.barcode_local",
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
    return _c("div", [
      _c("span", [_vm._v("Наименование")]),
      _vm._v(" "),
      _c("span", { staticClass: "mt-5" }, [_vm._v("Значение")])
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvdGVtcGxhdGUvRGlhbG9ncy9Qcm9kdWN0RGlhbG9nLnZ1ZSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvY29tcG9uZW50cy90ZW1wbGF0ZS9EaWFsb2dzL1Byb2R1Y3REaWFsb2cudnVlPzVkYWMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvbWl4aW5zL2NhdGVnb3J5TWl4aW4uanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvbWl4aW5zL3N1cHBsaWVyTWl4aW4uanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvdGVtcGxhdGUvRGlhbG9ncy9Qcm9kdWN0RGlhbG9nLnZ1ZSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvY29tcG9uZW50cy90ZW1wbGF0ZS9EaWFsb2dzL1Byb2R1Y3REaWFsb2cudnVlP2E0N2QiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvdGVtcGxhdGUvRGlhbG9ncy9Qcm9kdWN0RGlhbG9nLnZ1ZT9iM2IxIl0sIm5hbWVzIjpbImNhdGVnb3J5TWl4aW4iLCJtZXRob2RzIiwic2V0Q2F0ZWdvcnkiLCJjYXRlZ29yeSIsImVudGl0eSIsImlkIiwibmFtZSIsIiRub3RpZnkiLCJncm91cCIsInR5cGUiLCJ0ZXh0Iiwic2VsZWN0Q2F0ZWdvcnkiLCIkZXZlbnRCdXMiLCIkZW1pdCIsInRhZyIsInBhcmFtcyIsInJvb3RfY2F0ZWdvcnkiLCJyZWYiLCJnZXRQYXJlbnRDYXRlZ29yeSIsImxvYWRpbmciLCJ3aW5kb3ciLCJheGlvcyIsIm1ldGhvZCIsInVybCIsInRoZW4iLCJyZXNwIiwiZGF0YSIsInN1cHBsaWVyTWl4aW4iLCJzZXRTdXBwbGllciIsInN1cHBsaWVyIiwic2VsZWN0U3VwcGxpZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUE0UEE7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFEQTtBQUVBLG1CQUZBO0FBR0Esd0lBSEE7QUFJQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUFBO0FBQUE7O0FBQ0E7QUFDQSxPQUxBOztBQU1BLGFBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQSxPQURBLEVBRUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxPQUZBLEVBR0E7QUFBQTtBQUFBO0FBQUE7QUFBQSxPQUhBLEVBSUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxPQUpBLEVBS0E7QUFBQTtBQUFBO0FBQUE7QUFBQSxPQUxBLENBTkE7QUFhQSxzQkFiQTtBQWNBO0FBQ0Esa0JBREE7QUFFQSxxQkFGQTtBQUdBLHNCQUhBO0FBSUEsdUJBSkE7QUFLQSxzQkFMQTtBQU1BLDhCQU5BO0FBT0EsMEJBUEE7QUFRQTtBQUNBLGtCQURBO0FBRUE7QUFGQSxTQVJBO0FBWUE7QUFDQSxlQURBO0FBRUE7QUFGQSxTQVpBO0FBZ0JBO0FBQ0Esa0JBREE7QUFFQTtBQUZBO0FBaEJBLE9BZEE7QUFtQ0Esa0JBbkNBO0FBb0NBO0FBcENBO0FBc0NBLEdBM0NBO0FBNENBLFNBNUNBLHFCQTRDQTtBQUFBOztBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBSEEsTUFHQTtBQUNBO0FBQ0E7QUFDQSxxQkFEQTtBQUVBO0FBRkEsU0FHQSxJQUhBLENBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BUkEsV0FRQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtB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QUtDLE9BQUwsQ0FBYTtBQUNUQyxhQUFLLEVBQUUsTUFERTtBQUVUQyxZQUFJLEVBQUUsU0FGRztBQUdUQyxZQUFJLEVBQUU7QUFIRyxPQUFiO0FBS0gsS0FUSTtBQVVMb0Isa0JBVkssNEJBVVc7QUFDWixXQUFLbEIsU0FBTCxDQUFlQyxLQUFmLENBQXFCLFlBQXJCLEVBQW1DO0FBQy9CQyxXQUFHLEVBQUUsZ0JBRDBCO0FBRS9CQyxjQUFNLEVBQUU7QUFBQ0UsYUFBRyxFQUFFO0FBQU47QUFGdUIsT0FBbkM7QUFJSDtBQWZJO0FBRE8sQ0FBcEI7QUFtQmVVLDRFQUFmLEU7Ozs7Ozs7Ozs7OztBQ25CQTtBQUFBO0FBQUE7QUFBQTtBQUE0RjtBQUMzQjtBQUNMOzs7QUFHNUQ7QUFDbUc7QUFDbkcsZ0JBQWdCLDJHQUFVO0FBQzFCLEVBQUUsbUZBQU07QUFDUixFQUFFLHdGQUFNO0FBQ1IsRUFBRSxpR0FBZTtBQUNqQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLElBQUksS0FBVSxFQUFFLFlBaUJmO0FBQ0Q7QUFDZSxnRjs7Ozs7Ozs7Ozs7O0FDdENmO0FBQUE7QUFBQSx3Q0FBeU0sQ0FBZ0IseVBBQUcsRUFBQyxDOzs7Ozs7Ozs7Ozs7QUNBN047QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBIiwiZmlsZSI6InByb2R1Y3REaWFsb2cuanMiLCJzb3VyY2VzQ29udGVudCI6WyI8dGVtcGxhdGU+XG4gICAgPGRpdj5cbiAgICAgICAgPCEtLSAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGFsLWhlYWRlciBkYXJrXCIgc3R5bGU9XCJqdXN0aWZ5LWNvbnRlbnQ6IG5vcm1hbDtcIj4tLT5cbiAgICAgICAgPCEtLSAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1hbHQtaGVhZGVyXCI+LS0+XG4gICAgICAgIDwhLS0gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJpdGVtLXRpdGxlIF81MDBcIj7QoNC+0LfQvdC40YfQvdCw0Y8g0YbQtdC90LA8L3NwYW4+LS0+XG4gICAgICAgIDwhLS0gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIml0ZW0tZXhjZXB0IGZvbnQtd2VpZ2h0LWJvbGRlciBoLTF4XCI+LS0+XG4gICAgICAgIDwhLS0gICAgICAgICAgICAgICAgPHNwYW4gaWQ9XCJ0b3RhbF9wcmljZVwiPi0tPlxuICAgICAgICA8IS0tICAgICAgICAgICAgICAgICAgIHt7ICRwcm9kdWN0LT5zdG9yZXMtPmZpbmQoQXV0aDo6dXNlcigpLT5jdXJyZW50X3N0b3JlKS0+cGl2b3QtPnJldGFpbF9wcmljZSA/PyAnMCcgfX0tLT5cbiAgICAgICAgPCEtLSAgICAgICAgICAgICAgICA8L3NwYW4+LS0+XG4gICAgICAgIDwhLS0gICAgICAgICAgICAgICAgPC9kaXY+LS0+XG4gICAgICAgIDwhLS0gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIml0ZW0tdGFnIHRhZyBoaWRlXCI+LS0+XG4gICAgICAgIDwhLS0gICAgICAgICAgICAgICAgPC9kaXY+LS0+XG4gICAgICAgIDwhLS0gICAgICAgICAgICA8L2Rpdj4tLT5cbiAgICAgICAgPCEtLSAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1hbHQtaGVhZGVyXCI+LS0+XG4gICAgICAgIDwhLS0gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJpdGVtLXRpdGxlIF81MDBcIj7QndCwINGB0LLQvtC10Lwg0YHQutC70LDQtNC1IC8g0L3QsCDQtNGA0YPQs9C40YU8L3NwYW4+LS0+XG4gICAgICAgIDwhLS0gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIml0ZW0tZXhjZXB0IGZvbnQtd2VpZ2h0LWJvbGRlciBoLTF4XCI+LS0+XG4gICAgICAgIDwhLS0gICAgICAgICAgICAgICAgPHNwYW4gaWQ9XCJ0b3RhbF9wcmljZVwiPi0tPlxuICAgICAgICA8IS0tICAgICAgICAgICAgICAgICAgIHt7ICRwcm9kdWN0LT5nZXRDb3VudFNlbGZPdGhlcnMoKSB9fS0tPlxuICAgICAgICA8IS0tICAgICAgICAgICAgICAgIDwvc3Bhbj4tLT5cbiAgICAgICAgPCEtLSAgICAgICAgICAgICAgICA8L2Rpdj4tLT5cbiAgICAgICAgPCEtLSAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaXRlbS10YWcgdGFnIGhpZGVcIj4tLT5cbiAgICAgICAgPCEtLSAgICAgICAgICAgICAgICA8L2Rpdj4tLT5cbiAgICAgICAgPCEtLSAgICAgICAgICAgIDwvZGl2Pi0tPlxuICAgICAgICA8IS0tICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGFsLWFsdC1oZWFkZXJcIj4tLT5cbiAgICAgICAgPCEtLSAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cIml0ZW0tdGl0bGUgXzUwMFwiPtCl0YDQsNC90LXQvdC40LU8L3NwYW4+LS0+XG4gICAgICAgIDwhLS0gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIml0ZW0tZXhjZXB0IGZvbnQtd2VpZ2h0LWJvbGRlciBoLTF4XCI+LS0+XG4gICAgICAgIDwhLS0gICAgICAgICAgICAgICAgPHNwYW4gaWQ9XCJ0b3RhbF9wcmljZVwiPi0tPlxuICAgICAgICA8IS0tICAgICAgICAgICAgICAgICAgIHshISAkcHJvZHVjdC0+Z2V0U3RvcmFnZUNvZGUoKSAhIX0tLT5cbiAgICAgICAgPCEtLSAgICAgICAgICAgICAgICA8L3NwYW4+LS0+XG4gICAgICAgIDwhLS0gICAgICAgICAgICAgICAgPC9kaXY+LS0+XG4gICAgICAgIDwhLS0gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIml0ZW0tdGFnIHRhZyBoaWRlXCI+LS0+XG4gICAgICAgIDwhLS0gICAgICAgICAgICAgICAgPC9kaXY+LS0+XG4gICAgICAgIDwhLS0gICAgICAgICAgICA8L2Rpdj4tLT5cbiAgICAgICAgPCEtLSAgICAgICAgPC9kaXY+LS0+XG5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1ib2R5XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJvd1wiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLXNtLTQgbm8tcHIgZC1mbGV4XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dWwgY2xhc3M9XCJuYXZcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGkgdi1mb3I9XCJ0YWIgaW4gdGFic1wiIHYtYmluZDprZXk9XCJ0YWIuc2x1Z1wiIHYtYmluZDpjbGFzcz1cInsnYWN0aXZlJyA6IHRhYi5zdGF0ZX1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cIm5hdi1pdGVtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIHYtb246Y2xpY2s9XCJzZWxlY3RUYWIodGFiKVwiIGNsYXNzPVwibmF2LWxpbmtcIiBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7eyB0YWIubmFtZSB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJmbG9hdC1yaWdodCBoZWxwZXJfZGFuZ2VyIGQtbm9uZS1mXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhIGZhLWV4Y2xhbWF0aW9uLXRyaWFuZ2xlIHRleHQtbWQgbWwtMiB0ZXh0LWRhbmdlclwiPjwvaT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLXNtLTggbm8tcGxcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0YWItY29udGVudCBuby1wbFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0YWItcGFuZSBwLTNcIiB2LWJpbmQ6Y2xhc3M9XCJ7J2FjdGl2ZScgOiB0YWJzWzBdLnN0YXRlfVwiPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwhLS0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgaWQ9XCJwcm92aWRlcl9zZWFyY2hfY29udGFpbmVyXCIgY2xhc3M9XCJwcm92aWRlcl9zZWFyY2hfY29udGFpbmVyIGZhZGVcIiBkYXRhLXNpbXBsZWJhciBzdHlsZT1cImhlaWdodDogMzAwcHg7XCI+LS0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwhLS0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29udFwiPjwvZGl2Pi0tPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8IS0tICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImVtcHR5X3NlYXJjaFwiPi0tPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8IS0tICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJvdXRfb2Zfc2VhcmNoXCI+PC9kaXY+LS0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwhLS0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtY2VudGVyXCI+0KDQtdC30YPQu9GM0YLQsNGC0L7QsiDQvdC10YI8L2Rpdj4tLT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPCEtLSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2Pi0tPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8IS0tICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj4tLT5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybUlucHV0IHYtYmluZDppbnB1dERhdGE9XCJ7dHlwZTonaW5wdXQnLGxhYmVsOifQkNGA0YLQuNC60YPQuycsbmFtZTonZW50aXR5LmFydGljbGUnLCBwbGFjZWhvbGRlcjon0JDRgNGC0LjQutGD0Lsg0LTQtdGC0LDQu9C4ICjQvdC1INCx0L7Qu9C10LUgNjQg0YHQuNC80LLQvtC70L7QsiknfVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtSW5wdXQgdi1iaW5kOmlucHV0RGF0YT1cInt0eXBlOidpbnB1dCcsbGFiZWw6J9Cd0LDQuNC80LXQvdC+0LLQsNC90LjQtScsbmFtZTonZW50aXR5Lm5hbWUnLCBwbGFjZWhvbGRlcjon0J3QsNC40LzQtdC90L7QstCw0L3QuNC1ICjQvdC1INCx0L7Qu9C10LUgMjU1INGB0LjQvNCy0L7Qu9C+0LIpJ31cIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybUlucHV0IHYtYmluZDppbnB1dERhdGE9XCJ7dHlwZTonc2VsZWN0b3InLGxhYmVsOifQkiDQutCw0YLQtdCz0L7RgNC40LgnLG5hbWU6J2VudGl0eS5jYXRlZ29yeS5uYW1lJywgb25DbGljazonc2VsZWN0Q2F0ZWdvcnknfVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtSW5wdXQgdi1iaW5kOmlucHV0RGF0YT1cInt0eXBlOidzZWxlY3RvcicsbGFiZWw6J9Cf0YDQvtC40LfQstC+0LTQuNGC0LXQu9GMJyxuYW1lOidlbnRpdHkuc3VwcGxpZXIubmFtZScsIG9uQ2xpY2s6J3NlbGVjdFN1cHBsaWVyJ31cIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8IS0tICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPi0tPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8IS0tICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQGZvcmVhY2goJHN0b3JlcyBhcyAkc3RvcmUpLS0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwhLS0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWw+0KDQvtC30L3QuNGH0L3QsNGPINGG0LXQvdCwINC00LvRjyDQvNCw0LPQsNC30LjQvdCwIFwie3sgJHN0b3JlLT5uYW1lIH19XCI8L2xhYmVsPi0tPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8IS0tICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwIG1iLTNcIj4tLT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPCEtLSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cIm51bWJlclwiIG1pbj1cIjBcIiBuYW1lPVwic3RvcmFnZVt7eyAkc3RvcmUtPmlkIH19XVtyZXRhaWxfcHJpY2VdXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2wgbWwtMFwiIHBsYWNlaG9sZGVyPVwi0KDQvtC30L3QuNGH0L3QsNGPINGG0LXQvdCwXCIgdmFsdWU9XCJAaWYoJHByb2R1Y3Qpe3sgJHByb2R1Y3QtPnN0b3Jlcy0+ZmluZCgkc3RvcmUtPmlkKS0+cGl2b3QtPnJldGFpbF9wcmljZSA/PyAnMCcgfX1AZW5kaWZcIiA+LS0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwhLS0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj4tLT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPCEtLSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEBlbmRmb3JlYWNoLS0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwhLS0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2Pi0tPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0YWItcGFuZVwiIHYtYmluZDpjbGFzcz1cInsnYWN0aXZlJyA6IHRhYnNbMV0uc3RhdGV9XCIgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGFibGUgY2xhc3M9XCJ0YWJsZSB3LTEwMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoZWFkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aD7QodC60LvQsNC0PC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGg+0JrQvtC70LjRh9C10YHRgtCy0L48L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aD7QpdGA0LDQvdC10L3QuNC1PC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RoZWFkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRib2R5PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg0JzQsNCz0LDQt9C40L1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RvcmFnZV9zdG9yZV9jb250YWluZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB2YWx1ZT1cIiBcIiBjbGFzcz1cInN0b3JhZ2Vfc3RvcmUgYmJfMVwiIHR5cGU9XCJ0ZXh0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdmFsdWU9XCIgXCIgY2xhc3M9XCJzdG9yYWdlX3N0b3JlIGJiXzJcIiB0eXBlPVwidGV4dFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHZhbHVlPVwiIFwiIGNsYXNzPVwic3RvcmFnZV9zdG9yZSBiYl8zXCIgdHlwZT1cInRleHRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB2YWx1ZT1cIiBcIiBjbGFzcz1cInN0b3JhZ2Vfc3RvcmUgYmJfNFwiIHR5cGU9XCJ0ZXh0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90YWJsZT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJveCBtdC0xMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJiX2ZhcSBmYXFfMVwiPtCX0L7QvdCwINGF0YDQsNC90LXQvdC40Y88L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJiYl9mYXEgZmFxXzJcIj7QndC+0LzQtdGAINGB0YLQtdC70LvQsNC20LA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJiYl9mYXEgZmFxXzNcIj7QndC+0LzQtdGAINCy0LXRgNGC0LjQutCw0LvRjNC90L7QuSDRgdC10LrRhtC40Lgg0YHRgtC10LvQu9Cw0LbQsDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJiX2ZhcSBmYXFfNFwiPtCd0L7QvNC10YAg0L/QvtC70LrQuDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGFiLXBhbmUgcC0zXCIgdi1iaW5kOmNsYXNzPVwieydhY3RpdmUnIDogdGFic1syXS5zdGF0ZX1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiB2LWlmPVwic2hvcF9hY3RpdmF0ZWRcIiByZWY9XCJ0YWJtYWluXCIgaWQ9XCJ0YWJfbWFpblwiIGRhdGEtc2ltcGxlYmFyIHN0eWxlPVwiaGVpZ2h0OiAzMTBweDtcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb250ZW50ZWQgbWItMTBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybUlucHV0IHYtYmluZDppbnB1dERhdGE9XCJ7dHlwZTonY2hlY2tib3gnLG1iOmZhbHNlLCBsYWJlbDon0J/QvtC60LDQt9Cw0YLRjCDQvdCwINCz0LvQsNCy0L3QvtC5INGB0YLRgNCw0L3QuNGG0LUnLG5hbWU6J2VudGl0eS5zcF9tYWluJ31cIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29udGVudGVkIG1iLTEwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJlbGF0aXZlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJzcF9zdG9ja1wiIGNsYXNzPVwidy0xMDAgbWItMCBwb2ludGVyXCI+0JDQutGG0LjQvtC90L3Ri9C5INGC0L7QstCw0YA8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJhYnNvbHV0ZSBjdXN0b21fY2hlY2tib3hcIiBzdHlsZT1cInJpZ2h0OiAwOyB0b3A6IDNweDtcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBpZD1cInNwX3N0b2NrXCIgdi1tb2RlbD1cImVudGl0eS5zcF9zdG9ja1wiIHR5cGU9XCJjaGVja2JveFwiIGNsYXNzPVwibm90X2RlZmF1bHRcIi8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHYtYmluZDpjbGFzcz1cInsnZC1ub25lJzohZW50aXR5LnNwX3N0b2NrfVwiIGNsYXNzPVwic3RvY2tzIG1iLTUgbXQtMTBcIiA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgIGNsYXNzPVwiZm9ybS1ncm91cCBkLWZsZXhcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzcz1cImNvbC1zbS00IG5vLXBsXCI+0KbQtdC90LA8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwIGNvbC1zbS04IG5vLXByXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHYtbW9kZWw9XCJlbnRpdHkuc3BfZGlzY291bnRfcHJpY2VcIiB0eXBlPVwibnVtYmVyXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2wgZGlzY291bnRcIiBkaXNhYmxlZCAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cCBkLWZsZXhcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzcz1cImNvbC1zbS00IG5vLXBsXCI+0KHQutC40LTQutCwPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cCBjb2wtc20tOCBuby1wclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB2LW1vZGVsPVwiZW50aXR5LnNwX2Rpc2NvdW50XCIgdHlwZT1cIm51bWJlclwiIHN0eWxlPVwiZmxleDogMC42O1wiIGNsYXNzPVwiZm9ybS1jb250cm9sIGRpc2NvdW50IG1yLTEwXCIgLz5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxTZWxlY3RvciB2LWJpbmQ6ZGF0YT1cIntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDonZW50aXR5LnNwX2Rpc2NvdW50X3R5cGUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRfdmFsdWU6MSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50czpbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtuYW1lOifQsiDRgNGD0LHQu9GP0YUnLCB2YWx1ZTowfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge25hbWU6J9CyINC/0YDQvtGG0LXQvdGC0LDRhScsIHZhbHVlOjF9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgIGNsYXNzPVwiZm9ybS1ncm91cCBkLWZsZXhcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzcz1cImNvbC1zbS00IG5vLXBsXCI+0JjRgtC+0LPQvjwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXAgY29sLXNtLTggbm8tcHJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdi1tb2RlbD1cImVudGl0eS5zcF9kaXNjb3VudF90b3RhbFwiIHR5cGU9XCJudW1iZXJcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiIGRpc2FibGVkIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybUlucHV0IHYtYmluZDppbnB1dERhdGE9XCJ7dHlwZTonaW5wdXQnLGxhYmVsOifQndCw0LjQvNC10L3QvtCy0LDQvdC40LUg0L/RgNC+0LTRg9C60YLQsCcsbmFtZTonZW50aXR5LnNwX25hbWUnLCBwbGFjZWhvbGRlcjon0J3QsNC40LzQtdC90L7QstCw0L3QuNC1INC/0YDQvtC00YPQutGC0LAnfVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZC1mbGV4IG10LTEwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXAgbWItMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsPtCe0YHQvdC+0LLQvdC+0LUg0YTQvtGC0L48L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImltZ191cGxvYWRfY2F0X2NvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgdi1pZj1cImxvYWRpbmdcIiBjbGFzcz1cImxpc3QtcGxhY2Vob2xkZXIgbWItM1wiIHN0eWxlPVwiaGVpZ2h0OiAxMDBweDtcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImxpc3QtcGxhY2Vob2xkZXJfaXRlbVwiIHN0eWxlPVwiaGVpZ2h0OiAxMDBweDtcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJsaXN0LXBsYWNlaG9sZGVyX2NlbGxcIiBzdHlsZT1cIndpZHRoOiAxMDAlXCIgPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nIHYtaWY9XCIhbG9hZGluZ1wiIGNsYXNzPVwiaC0xMDAgdy0xMDAgaW1hZ2VcIiA6c3JjPVwiaW1hZ2VcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHYtaWY9XCIhbG9hZGluZ1wiIEBjbGljaz1cInVwbG9hZENsaWNrKClcIiBjbGFzcz1cInVwbG9hZF9idG5cIj7Ql9Cw0LPRgNGD0LfQuNGC0Yw8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZsZXgtMyBtbC0xNVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWw+0J7Qv9C40YHQsNC90LjQtSDQv9GA0L7QtNGD0LrRgtCwPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRleHRhcmVhIHYtbW9kZWw9XCJlbnRpdHkuc3BfZGVzY1wiIGNsYXNzPVwiZm9ybS1jb250cm9sIHAtNSByZXNpemUtbm9uZSBib3JkZXItcmFkaXVzLW5vbmVcIiBwbGFjZWhvbGRlcj1cItCS0LLQtdC00LjRgtC1INC+0L/QuNGB0LDQvdC40LVcIiBzdHlsZT1cImhlaWdodDogOTRweDtcIj48L3RleHRhcmVhPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbD7QpdCw0YDQsNC60YLQtdGA0LjRgdGC0LjQutC4PC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCIgQGNsaWNrPVwiYWRkU3BlY2lmaWNhdGlvbigpXCIgY2xhc3M9XCJmbG9hdC1yaWdodFwiPtCU0L7QsdCw0LLQuNGC0Yw8L2E+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiB2LWZvcj1cInNwZWNpZmljYXRpb24gaW4gZW50aXR5LnNwZWNpZmljYXRpb25zXCIgY2xhc3M9XCJzcGVjaWZpY2F0aW9uc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZWxlbWVudCBjb3B5IGQtZmxleCBtYi0xMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj7QndCw0LjQvNC10L3QvtCy0LDQvdC40LU8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJtdC01XCI+0JfQvdCw0YfQtdC90LjQtTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1sLTE1IGZsZXgtMVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHYtbW9kZWw9XCJzcGVjaWZpY2F0aW9uLmxhYmVsXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBwbGFjZWhvbGRlcj1cItCS0Y/Qt9C60L7RgdGC0YxcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiB2LW1vZGVsPVwic3BlY2lmaWNhdGlvbi52YWx1ZVwiIGNsYXNzPVwiZm9ybS1jb250cm9sIG10LTVcIiBwbGFjZWhvbGRlcj1cIjVXNDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJlbW92ZSBwb2ludGVyIG1sLTEwXCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHYtaWY9XCIhc2hvcF9hY3RpdmF0ZWRcIj7QkNC60YLQuNCy0LjRgNGD0LnRgtC1INC40L3RgtC10YDQvdC10YIt0LzQsNCz0LDQt9C40L0g0LIgPGEgY2xhc3M9XCJhamF4LW5hdlwiIGhyZWY9XCIjXCI+0L3QsNGB0YLRgNC+0LnQutCw0YU8L2E+LjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHYtaWY9XCIhc2hvcF9hY3RpdmF0ZWRcIj7QrdGC0L4g0LHQtdGB0L/Qu9Cw0YLQvdC+LjwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRhYi1wYW5lIHAtM1wiIHYtYmluZDpjbGFzcz1cInsnYWN0aXZlJyA6IHRhYnNbM10uc3RhdGV9XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtSW5wdXQgdi1iaW5kOmlucHV0RGF0YT1cInt0eXBlOidpbnB1dCcsbGFiZWw6J9Co0YLRgNC40YUt0LrQvtC0INC/0YDQvtC40LfQstC+0LTQuNGC0LXQu9GPIChFQU4gMTMpJyxuYW1lOidlbnRpdHkuYmFyY29kZScsIG1lc3NhZ2VzOm1lc3NhZ2VzLCBwbGFjZWhvbGRlcjon0KjRgtGA0LjRhdC60L7QtCd9XCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEZvcm1JbnB1dCB2LWJpbmQ6aW5wdXREYXRhPVwie3R5cGU6J2lucHV0JyxsYWJlbDon0JLQvdGD0YLRgNC10L3QvdC40Lkg0YjRgtGA0LjRhS3QutC+0LQgKEVBTiAxMyknLG5hbWU6J2VudGl0eS5iYXJjb2RlX2xvY2FsJywgbWVzc2FnZXM6bWVzc2FnZXMsIHBsYWNlaG9sZGVyOifQqNGC0YDQuNGF0LrQvtC0INGB0LrQu9Cw0LTQsCd9XCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwhLS08ZGl2IGNsYXNzPVwidGFiLXBhbmVcIiBpZD1cInt7ICRjbGFzcyB9fV90YWJfZW50cmFuY2VzXCIgZGF0YS1zaW1wbGViYXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPVwibWF4LWhlaWdodDogNDAwcHg7XCI+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQGlmKGlzc2V0KCRwcm9kdWN0LT5lbnRyYW5jZXMpICYmIGNvdW50KCRwcm9kdWN0LT5lbnRyYW5jZXMpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGFibGU+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoPklEPC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGg+0J/QvtGB0YLQsNCy0YnQuNC6PC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGg+0JrQvtC70LjRh9C10YHRgtCy0L48L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aD7QlNCw0YLQsDwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBAZm9yZWFjaCgkcHJvZHVjdC0+ZW50cmFuY2VzIGFzICRlbnRyYW5jZSlcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD57eyAkZW50cmFuY2UtPmlkIH19PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQ+e3sgJGVudHJhbmNlLT5wYXJ0bmVyLT5vZmZpY2lhbF9uYW1lID8/ICcnIH19PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQ+e3sgJGVudHJhbmNlLT5waXZvdC0+Y291bnQgfX08L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD57eyAkZW50cmFuY2UtPnBpdm90LT5jcmVhdGVkX2F0IH19PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEBlbmRmb3JlYWNoXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90YWJsZT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg0J/QvtGB0YLRg9C/0LvQtdC90LjRjyDQvdC1INC90LDQudC00LXQvdGLXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEBlbmRpZlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+LS0+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9kYWwtZm9vdGVyXCI+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBAY2xpY2s9XCIkcGFyZW50LmNsb3NlRGlhbG9nKGRpYWxvZylcIiB0eXBlPVwic3VibWl0XCIgY2xhc3M9XCJidXR0b24gd2hpdGVcIj7Ql9Cw0LrRgNGL0YLRjDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxidXR0b24gQGNsaWNrPVwic2F2ZSgpXCIgdHlwZT1cInN1Ym1pdFwiIGNsYXNzPVwiYnV0dG9uIHByaW1hcnkgcHVsbC1yaWdodFwiPtCh0L7RhdGA0LDQvdC40YLRjDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3lzdGVtX21lc3NhZ2VcIj5cblxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbiAgICBpbXBvcnQgY2F0ZWdvcnlNaXhpbiBmcm9tIFwiLi8uLi8uLi9taXhpbnMvY2F0ZWdvcnlNaXhpblwiXG4gICAgaW1wb3J0IHN1cHBsaWVyTWl4aW4gZnJvbSBcIi4vLi4vLi4vbWl4aW5zL3N1cHBsaWVyTWl4aW5cIlxuICAgIGltcG9ydCBGb3JtSW5wdXQgZnJvbSBcIi4vLi4vLi4vc2VydmljZS9Gb3JtSW5wdXRcIlxuICAgIGV4cG9ydCBkZWZhdWx0IHtcbiAgICAgICAgbmFtZTogXCJQcm9kdWN0RGlhbG9nXCIsXG4gICAgICAgIHByb3BzOiBbJ2RpYWxvZyddLFxuICAgICAgICBtaXhpbnM6IFtjYXRlZ29yeU1peGluLCBzdXBwbGllck1peGluXSxcbiAgICAgICAgZGF0YTogKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBnZXQgc2hvcF9hY3RpdmF0ZWQoKXtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGxvY2FsX3NldHRpbmdzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2VbJ3NldHRpbmdzJ10pO1xuICAgICAgICAgICAgICAgICAgICBsZXQgaW5kZXggPSBfLmZpbmRJbmRleChsb2NhbF9zZXR0aW5ncywgZnVuY3Rpb24obykgeyByZXR1cm4gby5rZXkgPT09IFwic2hvcF9lbmFibGVkXCI7IH0pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbG9jYWxfc2V0dGluZ3NbaW5kZXhdID8gQm9vbGVhbihwYXJzZUludChsb2NhbF9zZXR0aW5nc1tpbmRleF0udmFsdWUpKSA6IGZhbHNlO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdGFiczogW1xuICAgICAgICAgICAgICAgICAgICB7c2x1ZzogXCJiYXNlXCIsIG5hbWU6IFwi0J7RgdC90L7QstC90YvQtVwiLCBzdGF0ZTogdHJ1ZX0sXG4gICAgICAgICAgICAgICAgICAgIHtzbHVnOiBcInN0b3JlXCIsIG5hbWU6IFwi0KHQutC70LDQtFwiLCBzdGF0ZTogZmFsc2V9LFxuICAgICAgICAgICAgICAgICAgICB7c2x1ZzogXCJzaG9wXCIsIG5hbWU6IFwi0JjQvdGC0LXRgNC90LXRgiDQvNCw0LPQsNC30LjQvVwiLCBzdGF0ZTogZmFsc2V9LFxuICAgICAgICAgICAgICAgICAgICB7c2x1ZzogXCJiYXJjb2RlXCIsIG5hbWU6IFwi0KjRgtGA0LjRhdC60L7QtFwiLCBzdGF0ZTogZmFsc2V9LFxuICAgICAgICAgICAgICAgICAgICB7c2x1ZzogXCJlbnRyYW5jZVwiLCBuYW1lOiBcItCf0L7RgdGC0YPQv9C70LXQvdC40Y9cIiwgc3RhdGU6IGZhbHNlfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIHJvb3RfY2F0ZWdvcnk6IDIsXG4gICAgICAgICAgICAgICAgZW50aXR5OiB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6bnVsbCxcbiAgICAgICAgICAgICAgICAgICAgYXJ0aWNsZTpudWxsLFxuICAgICAgICAgICAgICAgICAgICBzcF9tYWluOmZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBzcF9zdG9jazpmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgc3BfZGlzY291bnQ6MCxcbiAgICAgICAgICAgICAgICAgICAgc3BfZGlzY291bnRfdHlwZTpudWxsLFxuICAgICAgICAgICAgICAgICAgICBzcGVjaWZpY2F0aW9uczpbXSxcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2U6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGF0aDogJy9pbWFnZXMvbm9faW1hZ2UucG5nJyxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgY2F0ZWdvcnk6e1xuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6MixcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6bnVsbCxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgc3VwcGxpZXI6e1xuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6bnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6J9Cd0LUg0LLRi9Cx0YDQsNC9JyxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG1lc3NhZ2VzOnt9LFxuICAgICAgICAgICAgICAgIGxvYWRpbmc6ZmFsc2UsXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIG1vdW50ZWQoKSB7XG4gICAgICAgICAgICB0aGlzLmRpYWxvZy53aWR0aCA9IDYwMDtcbiAgICAgICAgICAgIGlmICh0aGlzLmRpYWxvZy5pZCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZGlhbG9nLnRpdGxlID0gXCLQndC+0LLRi9C5INC/0YDQvtC00YPQutGCXCI7XG4gICAgICAgICAgICAgICAgdGhpcy5nZXRQYXJlbnRDYXRlZ29yeSgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHdpbmRvdy5heGlvcyh7XG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZDogJ2dldCcsXG4gICAgICAgICAgICAgICAgICAgIHVybDogJy9wcm9kdWN0cy8nICsgdGhpcy5kaWFsb2cuaWQsXG4gICAgICAgICAgICAgICAgfSkudGhlbigocmVzcCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRpYWxvZy50aXRsZSA9IFwi0KDQtdC00LDQutGC0LjRgNC+0LLQsNC90LjQtSDRgtC+0LLQsNGA0LAgJ1wiICsgcmVzcC5kYXRhLm5hbWUgKyBcIidcIjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pZCA9IHJlc3AuZGF0YS5pZDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbnRpdHkgPSByZXNwLmRhdGE7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH0pLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZihlcnJvci5yZXNwb25zZS5zdGF0dXMgPT09IDQwNCl7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRwYXJlbnQuY2xvc2VEaWFsb2codGhpcy5kaWFsb2cpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBjb21wdXRlZDoge1xuICAgICAgICAgICAgaW1hZ2UoKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5lbnRpdHkuaW1hZ2UgJiYgdGhpcy5lbnRpdHkuaW1hZ2UudXJsID8gdGhpcy5lbnRpdHkuaW1hZ2UudXJsIDogJy9pbWFnZXMvbm9faW1hZ2UucG5nJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgbWV0aG9kczoge1xuICAgICAgICAgICAgYWRkU3BlY2lmaWNhdGlvbigpe1xuICAgICAgICAgICAgICAgIHRoaXMuZW50aXR5LnNwZWNpZmljYXRpb25zLnVuc2hpZnQoe2xhYmVsOm51bGwsIHZhbHVlOm51bGx9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzeW5jKGUpe1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmltYWdlX2ZpbGUgPSBlLnRhcmdldC5maWxlc1swXTtcbiAgICAgICAgICAgICAgICB0aGlzLnN5bmNJbWFnZSgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHVwbG9hZENsaWNrKCl7XG4gICAgICAgICAgICAgICAgdGhpcy4kcmVmcy5wcm9kdWN0X2ltZ191cGxvYWQuY2xpY2soKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzeW5jSW1hZ2UoKXtcbiAgICAgICAgICAgICAgICBsZXQgZGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xuICAgICAgICAgICAgICAgIGRhdGEuYXBwZW5kKCdpbWFnZScsIHRoaXMuaW1hZ2VfZmlsZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB3aW5kb3cuYXhpb3Moe1xuICAgICAgICAgICAgICAgICAgICBtZXRob2Q6ICdwb3N0JyxcbiAgICAgICAgICAgICAgICAgICAgdXJsOiAnL2ltYWdlL3VwbG9hZCcsXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6ZGF0YVxuICAgICAgICAgICAgICAgIH0pLnRoZW4oKHJlc3ApID0+ICB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW50aXR5LmltYWdlID0ge307XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW50aXR5LmltYWdlLnVybCA9IHJlc3AuZGF0YS5pbWFnZXNbMF0udXJsO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVudGl0eS5pbWFnZS5pZCA9IHJlc3AuZGF0YS5pbWFnZXNbMF0uaWQ7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNlbGVjdFRhYih0YWIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRhYnMuZm9yRWFjaCgodGFiKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRhYi5zdGF0ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHRhYi5zdGF0ZSA9IHRydWU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2F2ZSgpe1xuICAgICAgICAgICAgICAgIGxldCBtZXRob2QgPSB0aGlzLmVudGl0eS5pZCA/ICdwYXRjaCcgOiAncG9zdCc7XG4gICAgICAgICAgICAgICAgbGV0IHVybCA9IHRoaXMuZW50aXR5LmlkID8gJy8nICsgdGhpcy5lbnRpdHkuaWQgOiAnJztcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHdpbmRvdy5heGlvcyh7XG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZDogbWV0aG9kLFxuICAgICAgICAgICAgICAgICAgICB1cmw6ICcvcHJvZHVjdHMnICsgdXJsLFxuICAgICAgICAgICAgICAgICAgICBkYXRhOnRoaXMuZW50aXR5LFxuICAgICAgICAgICAgICAgIH0pLnRoZW4oKHJlc3ApID0+ICB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJGV2ZW50QnVzLiRlbWl0KCdQcm9kdWN0VXBkYXRlZCcsIHtpZDogdGhpcy5pZCwgY2F0ZWdvcnlfaWQ6dGhpcy5jYXRlZ29yeV9pZH0pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLiRwYXJlbnQuY2xvc2VEaWFsb2codGhpcy5kaWFsb2cpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9KS5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWVzc2FnZXMgPSBlcnJvci5yZXNwb25zZS5kYXRhLm1lc3NhZ2VzO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBjb21wb25lbnRzOntcbiAgICAgICAgICAgIEZvcm1JbnB1dFxuICAgICAgICB9XG4gICAgfVxuPC9zY3JpcHQ+XG4iLCJ2YXIgcmVuZGVyID0gZnVuY3Rpb24oKSB7XG4gIHZhciBfdm0gPSB0aGlzXG4gIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgcmV0dXJuIF9jKFwiZGl2XCIsIFtcbiAgICBfYyhcImRpdlwiLCBbXG4gICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcIm1vZGFsLWJvZHlcIiB9LCBbXG4gICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwicm93XCIgfSwgW1xuICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiY29sLXNtLTQgbm8tcHIgZC1mbGV4XCIgfSwgW1xuICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgIFwidWxcIixcbiAgICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJuYXZcIiB9LFxuICAgICAgICAgICAgICBfdm0uX2woX3ZtLnRhYnMsIGZ1bmN0aW9uKHRhYikge1xuICAgICAgICAgICAgICAgIHJldHVybiBfYyhcbiAgICAgICAgICAgICAgICAgIFwibGlcIixcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAga2V5OiB0YWIuc2x1ZyxcbiAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwibmF2LWl0ZW1cIixcbiAgICAgICAgICAgICAgICAgICAgY2xhc3M6IHsgYWN0aXZlOiB0YWIuc3RhdGUgfVxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgXCJhXCIsXG4gICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwibmF2LWxpbmtcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IGhyZWY6IFwiamF2YXNjcmlwdDp2b2lkKDApXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3ZtLnNlbGVjdFRhYih0YWIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3ModGFiLm5hbWUpICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICBfdm0uX20oMCwgdHJ1ZSlcbiAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAwXG4gICAgICAgICAgICApXG4gICAgICAgICAgXSksXG4gICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImNvbC1zbS04IG5vLXBsXCIgfSwgW1xuICAgICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJ0YWItY29udGVudCBuby1wbFwiIH0sIFtcbiAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJ0YWItcGFuZSBwLTNcIixcbiAgICAgICAgICAgICAgICAgIGNsYXNzOiB7IGFjdGl2ZTogX3ZtLnRhYnNbMF0uc3RhdGUgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgX2MoXCJGb3JtSW5wdXRcIiwge1xuICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgIGlucHV0RGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJpbnB1dFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwi0JDRgNGC0LjQutGD0LtcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZW50aXR5LmFydGljbGVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBcItCQ0YDRgtC40LrRg9C7INC00LXRgtCw0LvQuCAo0L3QtSDQsdC+0LvQtdC1IDY0INGB0LjQvNCy0L7Qu9C+0LIpXCJcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgIF9jKFwiRm9ybUlucHV0XCIsIHtcbiAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICBpbnB1dERhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiaW5wdXRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcItCd0LDQuNC80LXQvdC+0LLQsNC90LjQtVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJlbnRpdHkubmFtZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFwi0J3QsNC40LzQtdC90L7QstCw0L3QuNC1ICjQvdC1INCx0L7Qu9C10LUgMjU1INGB0LjQvNCy0L7Qu9C+0LIpXCJcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgIF9jKFwiRm9ybUlucHV0XCIsIHtcbiAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICBpbnB1dERhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwic2VsZWN0b3JcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcItCSINC60LDRgtC10LPQvtGA0LjQuFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJlbnRpdHkuY2F0ZWdvcnkubmFtZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljazogXCJzZWxlY3RDYXRlZ29yeVwiXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICBfYyhcIkZvcm1JbnB1dFwiLCB7XG4gICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgaW5wdXREYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcInNlbGVjdG9yXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCLQn9GA0L7QuNC30LLQvtC00LjRgtC10LvRjFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJlbnRpdHkuc3VwcGxpZXIubmFtZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljazogXCJzZWxlY3RTdXBwbGllclwiXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcInRhYi1wYW5lXCIsXG4gICAgICAgICAgICAgICAgICBjbGFzczogeyBhY3RpdmU6IF92bS50YWJzWzFdLnN0YXRlIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFtfdm0uX20oMSksIF92bS5fdihcIiBcIiksIF92bS5fbSgyKV1cbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJ0YWItcGFuZSBwLTNcIixcbiAgICAgICAgICAgICAgICAgIGNsYXNzOiB7IGFjdGl2ZTogX3ZtLnRhYnNbMl0uc3RhdGUgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgX3ZtLnNob3BfYWN0aXZhdGVkXG4gICAgICAgICAgICAgICAgICAgID8gX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICByZWY6IFwidGFibWFpblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNTdHlsZTogeyBoZWlnaHQ6IFwiMzEwcHhcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczogeyBpZDogXCJ0YWJfbWFpblwiLCBcImRhdGEtc2ltcGxlYmFyXCI6IFwiXCIgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcImNvbnRlbnRlZCBtYi0xMFwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJGb3JtSW5wdXRcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0RGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJjaGVja2JveFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWI6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwi0J/QvtC60LDQt9Cw0YLRjCDQvdCwINCz0LvQsNCy0L3QvtC5INGB0YLRgNCw0L3QuNGG0LVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZW50aXR5LnNwX21haW5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJjb250ZW50ZWQgbWItMTBcIiB9LCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJyZWxhdGl2ZVwiIH0sIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxhYmVsXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJ3LTEwMCBtYi0wIHBvaW50ZXJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczogeyBmb3I6IFwic3Bfc3RvY2tcIiB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtfdm0uX3YoXCLQkNC60YbQuNC+0L3QvdGL0Lkg0YLQvtCy0LDRgFwiKV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGFiZWxcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImFic29sdXRlIGN1c3RvbV9jaGVja2JveFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY1N0eWxlOiB7IHJpZ2h0OiBcIjBcIiwgdG9wOiBcIjNweFwiIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiaW5wdXRcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlyZWN0aXZlczogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJtb2RlbFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhd05hbWU6IFwidi1tb2RlbFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBfdm0uZW50aXR5LnNwX3N0b2NrLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwiZW50aXR5LnNwX3N0b2NrXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcIm5vdF9kZWZhdWx0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczogeyBpZDogXCJzcF9zdG9ja1wiLCB0eXBlOiBcImNoZWNrYm94XCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvbVByb3BzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ6IEFycmF5LmlzQXJyYXkoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLmVudGl0eS5zcF9zdG9ja1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBfdm0uX2koX3ZtLmVudGl0eS5zcF9zdG9jaywgbnVsbCkgPiAtMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogX3ZtLmVudGl0eS5zcF9zdG9ja1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyICQkYSA9IF92bS5lbnRpdHkuc3Bfc3RvY2ssXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkJGVsID0gJGV2ZW50LnRhcmdldCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQkYyA9ICQkZWwuY2hlY2tlZCA/IHRydWUgOiBmYWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KCQkYSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciAkJHYgPSBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkJGkgPSBfdm0uX2koJCRhLCAkJHYpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoJCRlbC5jaGVja2VkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQkaSA8IDAgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uJHNldChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5lbnRpdHksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNwX3N0b2NrXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkJGEuY29uY2F0KFskJHZdKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQkaSA+IC0xICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLiRzZXQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uZW50aXR5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzcF9zdG9ja1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCRhXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zbGljZSgwLCAkJGkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jb25jYXQoJCRhLnNsaWNlKCQkaSArIDEpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLiRzZXQoX3ZtLmVudGl0eSwgXCJzcF9zdG9ja1wiLCAkJGMpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcInNwYW5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJzdG9ja3MgbWItNSBtdC0xMFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzczogeyBcImQtbm9uZVwiOiAhX3ZtLmVudGl0eS5zcF9zdG9jayB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwiZm9ybS1ncm91cCBkLWZsZXhcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxhYmVsXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwiY29sLXNtLTQgbm8tcGxcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbX3ZtLl92KFwi0KbQtdC90LBcIildXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImlucHV0LWdyb3VwIGNvbC1zbS04IG5vLXByXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiaW5wdXRcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlyZWN0aXZlczogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJtb2RlbFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhd05hbWU6IFwidi1tb2RlbFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLmVudGl0eS5zcF9kaXNjb3VudF9wcmljZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJlbnRpdHkuc3BfZGlzY291bnRfcHJpY2VcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiZm9ybS1jb250cm9sIGRpc2NvdW50XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIm51bWJlclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogXCJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvbVByb3BzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBfdm0uZW50aXR5LnNwX2Rpc2NvdW50X3ByaWNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQ6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkZXZlbnQudGFyZ2V0LmNvbXBvc2luZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS4kc2V0KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLmVudGl0eSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic3BfZGlzY291bnRfcHJpY2VcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRldmVudC50YXJnZXQudmFsdWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwiZm9ybS1ncm91cCBkLWZsZXhcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxhYmVsXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwiY29sLXNtLTQgbm8tcGxcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbX3ZtLl92KFwi0KHQutC40LTQutCwXCIpXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJpbnB1dC1ncm91cCBjb2wtc20tOCBuby1wclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcImlucHV0XCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpcmVjdGl2ZXM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibW9kZWxcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByYXdOYW1lOiBcInYtbW9kZWxcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogX3ZtLmVudGl0eS5zcF9kaXNjb3VudCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcImVudGl0eS5zcF9kaXNjb3VudFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJmb3JtLWNvbnRyb2wgZGlzY291bnQgbXItMTBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY1N0eWxlOiB7IGZsZXg6IFwiMC42XCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IHR5cGU6IFwibnVtYmVyXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvbVByb3BzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBfdm0uZW50aXR5LnNwX2Rpc2NvdW50XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQ6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkZXZlbnQudGFyZ2V0LmNvbXBvc2luZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS4kc2V0KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLmVudGl0eSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic3BfZGlzY291bnRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRldmVudC50YXJnZXQudmFsdWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiU2VsZWN0b3JcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcImVudGl0eS5zcF9kaXNjb3VudF90eXBlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdF92YWx1ZTogMSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50czogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBuYW1lOiBcItCyINGA0YPQsdC70Y/RhVwiLCB2YWx1ZTogMCB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcItCyINC/0YDQvtGG0LXQvdGC0LDRhVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJmb3JtLWdyb3VwIGQtZmxleFwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGFiZWxcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJjb2wtc20tNCBuby1wbFwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtfdm0uX3YoXCLQmNGC0L7Qs9C+XCIpXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJpbnB1dC1ncm91cCBjb2wtc20tOCBuby1wclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcImlucHV0XCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpcmVjdGl2ZXM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibW9kZWxcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByYXdOYW1lOiBcInYtbW9kZWxcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5lbnRpdHkuc3BfZGlzY291bnRfdG90YWwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZW50aXR5LnNwX2Rpc2NvdW50X3RvdGFsXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImZvcm0tY29udHJvbFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJudW1iZXJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IFwiXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb21Qcm9wczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogX3ZtLmVudGl0eS5zcF9kaXNjb3VudF90b3RhbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0OiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoJGV2ZW50LnRhcmdldC5jb21wb3NpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uJHNldChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5lbnRpdHksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNwX2Rpc2NvdW50X3RvdGFsXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkZXZlbnQudGFyZ2V0LnZhbHVlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiRm9ybUlucHV0XCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXREYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiaW5wdXRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwi0J3QsNC40LzQtdC90L7QstCw0L3QuNC1INC/0YDQvtC00YPQutGC0LBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJlbnRpdHkuc3BfbmFtZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogXCLQndCw0LjQvNC10L3QvtCy0LDQvdC40LUg0L/RgNC+0LTRg9C60YLQsFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJkLWZsZXggbXQtMTBcIiB9LCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJmb3JtLWdyb3VwXCIgfSwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJmb3JtLWdyb3VwIG1iLTBcIiB9LCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwibGFiZWxcIiwgW192bS5fdihcItCe0YHQvdC+0LLQvdC+0LUg0YTQvtGC0L5cIildKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcImltZ191cGxvYWRfY2F0X2NvbnRhaW5lclwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLmxvYWRpbmdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGlzdC1wbGFjZWhvbGRlciBtYi0zXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY1N0eWxlOiB7IGhlaWdodDogXCIxMDBweFwiIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbX3ZtLl9tKDMpXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBfdm0uX2UoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAhX3ZtLmxvYWRpbmdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBfYyhcImltZ1wiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJoLTEwMCB3LTEwMCBpbWFnZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgc3JjOiBfdm0uaW1hZ2UgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogX3ZtLl9lKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIV92bS5sb2FkaW5nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNwYW5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwidXBsb2FkX2J0blwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfdm0udXBsb2FkQ2xpY2soKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtfdm0uX3YoXCLQl9Cw0LPRgNGD0LfQuNGC0YxcIildXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IF92bS5fZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJmbGV4LTMgbWwtMTVcIiB9LCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcImxhYmVsXCIsIFtfdm0uX3YoXCLQntC/0LjRgdCw0L3QuNC1INC/0YDQvtC00YPQutGC0LBcIildKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcInRleHRhcmVhXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlyZWN0aXZlczogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibW9kZWxcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhd05hbWU6IFwidi1tb2RlbFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IF92bS5lbnRpdHkuc3BfZGVzYyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwiZW50aXR5LnNwX2Rlc2NcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJmb3JtLWNvbnRyb2wgcC01IHJlc2l6ZS1ub25lIGJvcmRlci1yYWRpdXMtbm9uZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNTdHlsZTogeyBoZWlnaHQ6IFwiOTRweFwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IHBsYWNlaG9sZGVyOiBcItCS0LLQtdC00LjRgtC1INC+0L/QuNGB0LDQvdC40LVcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb21Qcm9wczogeyB2YWx1ZTogX3ZtLmVudGl0eS5zcF9kZXNjIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQ6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCRldmVudC50YXJnZXQuY29tcG9zaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLiRzZXQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5lbnRpdHksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic3BfZGVzY1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkZXZlbnQudGFyZ2V0LnZhbHVlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwiZm9ybS1ncm91cFwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJsYWJlbFwiLCBbX3ZtLl92KFwi0KXQsNGA0LDQutGC0LXRgNC40YHRgtC40LrQuFwiKV0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImFcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImZsb2F0LXJpZ2h0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgaHJlZjogXCJqYXZhc2NyaXB0OnZvaWQoMClcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfdm0uYWRkU3BlY2lmaWNhdGlvbigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbX3ZtLl92KFwi0JTQvtCx0LDQstC40YLRjFwiKV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl9sKF92bS5lbnRpdHkuc3BlY2lmaWNhdGlvbnMsIGZ1bmN0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcGVjaWZpY2F0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJzcGVjaWZpY2F0aW9uc1wiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJlbGVtZW50IGNvcHkgZC1mbGV4IG1iLTEwXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fbSg0LCB0cnVlKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwibWwtMTUgZmxleC0xXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJpbnB1dFwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlyZWN0aXZlczogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm1vZGVsXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhd05hbWU6IFwidi1tb2RlbFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogc3BlY2lmaWNhdGlvbi5sYWJlbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNwZWNpZmljYXRpb24ubGFiZWxcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiZm9ybS1jb250cm9sXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFwi0JLRj9C30LrQvtGB0YLRjFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb21Qcm9wczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHNwZWNpZmljYXRpb24ubGFiZWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnB1dDogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkZXZlbnQudGFyZ2V0LmNvbXBvc2luZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS4kc2V0KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwZWNpZmljYXRpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsYWJlbFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRldmVudC50YXJnZXQudmFsdWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiaW5wdXRcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpcmVjdGl2ZXM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJtb2RlbFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByYXdOYW1lOiBcInYtbW9kZWxcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHNwZWNpZmljYXRpb24udmFsdWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzcGVjaWZpY2F0aW9uLnZhbHVlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImZvcm0tY29udHJvbCBtdC01XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFwiNVc0MFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb21Qcm9wczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHNwZWNpZmljYXRpb24udmFsdWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnB1dDogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkZXZlbnQudGFyZ2V0LmNvbXBvc2luZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS4kc2V0KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwZWNpZmljYXRpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRldmVudC50YXJnZXQudmFsdWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJkaXZcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwicmVtb3ZlIHBvaW50ZXIgbWwtMTBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICA6IF92bS5fZSgpLFxuICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICFfdm0uc2hvcF9hY3RpdmF0ZWRcbiAgICAgICAgICAgICAgICAgICAgPyBfYyhcImRpdlwiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCLQkNC60YLQuNCy0LjRgNGD0LnRgtC1INC40L3RgtC10YDQvdC10YIt0LzQsNCz0LDQt9C40L0g0LIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiYVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcImFqYXgtbmF2XCIsIGF0dHJzOiB7IGhyZWY6IFwiI1wiIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW192bS5fdihcItC90LDRgdGC0YDQvtC50LrQsNGFXCIpXVxuICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIi5cIilcbiAgICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgICA6IF92bS5fZSgpLFxuICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICFfdm0uc2hvcF9hY3RpdmF0ZWRcbiAgICAgICAgICAgICAgICAgICAgPyBfYyhcImRpdlwiLCBbX3ZtLl92KFwi0K3RgtC+INCx0LXRgdC/0LvQsNGC0L3Qvi5cIildKVxuICAgICAgICAgICAgICAgICAgICA6IF92bS5fZSgpXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcInRhYi1wYW5lIHAtM1wiLFxuICAgICAgICAgICAgICAgICAgY2xhc3M6IHsgYWN0aXZlOiBfdm0udGFic1szXS5zdGF0ZSB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICBfYyhcIkZvcm1JbnB1dFwiLCB7XG4gICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgaW5wdXREYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcImlucHV0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCLQqNGC0YDQuNGFLdC60L7QtCDQv9GA0L7QuNC30LLQvtC00LjRgtC10LvRjyAoRUFOIDEzKVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJlbnRpdHkuYmFyY29kZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZXM6IF92bS5tZXNzYWdlcyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBcItCo0YLRgNC40YXQutC+0LRcIlxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgX2MoXCJGb3JtSW5wdXRcIiwge1xuICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgIGlucHV0RGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJpbnB1dFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwi0JLQvdGD0YLRgNC10L3QvdC40Lkg0YjRgtGA0LjRhS3QutC+0LQgKEVBTiAxMylcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZW50aXR5LmJhcmNvZGVfbG9jYWxcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2VzOiBfdm0ubWVzc2FnZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogXCLQqNGC0YDQuNGF0LrQvtC0INGB0LrQu9Cw0LTQsFwiXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICBdKVxuICAgICAgICAgIF0pXG4gICAgICAgIF0pXG4gICAgICBdKSxcbiAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcIm1vZGFsLWZvb3RlclwiIH0sIFtcbiAgICAgICAgX2MoXG4gICAgICAgICAgXCJidXR0b25cIixcbiAgICAgICAgICB7XG4gICAgICAgICAgICBzdGF0aWNDbGFzczogXCJidXR0b24gd2hpdGVcIixcbiAgICAgICAgICAgIGF0dHJzOiB7IHR5cGU6IFwic3VibWl0XCIgfSxcbiAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gX3ZtLiRwYXJlbnQuY2xvc2VEaWFsb2coX3ZtLmRpYWxvZylcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgW192bS5fdihcItCX0LDQutGA0YvRgtGMXCIpXVxuICAgICAgICApLFxuICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICBfYyhcbiAgICAgICAgICBcImJ1dHRvblwiLFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImJ1dHRvbiBwcmltYXJ5IHB1bGwtcmlnaHRcIixcbiAgICAgICAgICAgIGF0dHJzOiB7IHR5cGU6IFwic3VibWl0XCIgfSxcbiAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gX3ZtLnNhdmUoKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBbX3ZtLl92KFwi0KHQvtGF0YDQsNC90LjRgtGMXCIpXVxuICAgICAgICApXG4gICAgICBdKSxcbiAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcInN5c3RlbV9tZXNzYWdlXCIgfSlcbiAgICBdKVxuICBdKVxufVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtcbiAgZnVuY3Rpb24oKSB7XG4gICAgdmFyIF92bSA9IHRoaXNcbiAgICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgICByZXR1cm4gX2MoXCJzcGFuXCIsIHsgc3RhdGljQ2xhc3M6IFwiZmxvYXQtcmlnaHQgaGVscGVyX2RhbmdlciBkLW5vbmUtZlwiIH0sIFtcbiAgICAgIF9jKFwiaVwiLCB7XG4gICAgICAgIHN0YXRpY0NsYXNzOiBcImZhIGZhLWV4Y2xhbWF0aW9uLXRyaWFuZ2xlIHRleHQtbWQgbWwtMiB0ZXh0LWRhbmdlclwiXG4gICAgICB9KVxuICAgIF0pXG4gIH0sXG4gIGZ1bmN0aW9uKCkge1xuICAgIHZhciBfdm0gPSB0aGlzXG4gICAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gICAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gICAgcmV0dXJuIF9jKFwidGFibGVcIiwgeyBzdGF0aWNDbGFzczogXCJ0YWJsZSB3LTEwMFwiIH0sIFtcbiAgICAgIF9jKFwidGhlYWRcIiwgW1xuICAgICAgICBfYyhcInRyXCIsIFtcbiAgICAgICAgICBfYyhcInRoXCIsIFtfdm0uX3YoXCLQodC60LvQsNC0XCIpXSksXG4gICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICBfYyhcInRoXCIsIFtfdm0uX3YoXCLQmtC+0LvQuNGH0LXRgdGC0LLQvlwiKV0pLFxuICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgX2MoXCJ0aFwiLCBbX3ZtLl92KFwi0KXRgNCw0L3QtdC90LjQtVwiKV0pXG4gICAgICAgIF0pXG4gICAgICBdKSxcbiAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICBfYyhcInRib2R5XCIsIFtcbiAgICAgICAgX2MoXCJ0clwiLCBbXG4gICAgICAgICAgX2MoXCJ0ZFwiLCBbXG4gICAgICAgICAgICBfdm0uX3YoXG4gICAgICAgICAgICAgIFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgINCc0LDQs9Cw0LfQuNC9XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgIClcbiAgICAgICAgICBdKSxcbiAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgIF9jKFwidGRcIiwgW1xuICAgICAgICAgICAgX3ZtLl92KFxuICAgICAgICAgICAgICBcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAwXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgIClcbiAgICAgICAgICBdKSxcbiAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgIF9jKFwidGRcIiwgW1xuICAgICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJzdG9yYWdlX3N0b3JlX2NvbnRhaW5lclwiIH0sIFtcbiAgICAgICAgICAgICAgX2MoXCJpbnB1dFwiLCB7XG4gICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwic3RvcmFnZV9zdG9yZSBiYl8xXCIsXG4gICAgICAgICAgICAgICAgYXR0cnM6IHsgdmFsdWU6IFwiIFwiLCB0eXBlOiBcInRleHRcIiB9XG4gICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICBfYyhcImlucHV0XCIsIHtcbiAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJzdG9yYWdlX3N0b3JlIGJiXzJcIixcbiAgICAgICAgICAgICAgICBhdHRyczogeyB2YWx1ZTogXCIgXCIsIHR5cGU6IFwidGV4dFwiIH1cbiAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgIF9jKFwiaW5wdXRcIiwge1xuICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcInN0b3JhZ2Vfc3RvcmUgYmJfM1wiLFxuICAgICAgICAgICAgICAgIGF0dHJzOiB7IHZhbHVlOiBcIiBcIiwgdHlwZTogXCJ0ZXh0XCIgfVxuICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgX2MoXCJpbnB1dFwiLCB7XG4gICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwic3RvcmFnZV9zdG9yZSBiYl80XCIsXG4gICAgICAgICAgICAgICAgYXR0cnM6IHsgdmFsdWU6IFwiIFwiLCB0eXBlOiBcInRleHRcIiB9XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBdKVxuICAgICAgICAgIF0pXG4gICAgICAgIF0pXG4gICAgICBdKVxuICAgIF0pXG4gIH0sXG4gIGZ1bmN0aW9uKCkge1xuICAgIHZhciBfdm0gPSB0aGlzXG4gICAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gICAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gICAgcmV0dXJuIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiYm94IG10LTEwXCIgfSwgW1xuICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJiYl9mYXEgZmFxXzFcIiB9LCBbX3ZtLl92KFwi0JfQvtC90LAg0YXRgNCw0L3QtdC90LjRj1wiKV0pLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiYmJfZmFxIGZhcV8yXCIgfSwgW192bS5fdihcItCd0L7QvNC10YAg0YHRgtC10LvQu9Cw0LbQsFwiKV0pLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiYmJfZmFxIGZhcV8zXCIgfSwgW1xuICAgICAgICBfdm0uX3YoXCLQndC+0LzQtdGAINCy0LXRgNGC0LjQutCw0LvRjNC90L7QuSDRgdC10LrRhtC40Lgg0YHRgtC10LvQu9Cw0LbQsFwiKVxuICAgICAgXSksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJiYl9mYXEgZmFxXzRcIiB9LCBbX3ZtLl92KFwi0J3QvtC80LXRgCDQv9C+0LvQutC4XCIpXSlcbiAgICBdKVxuICB9LFxuICBmdW5jdGlvbigpIHtcbiAgICB2YXIgX3ZtID0gdGhpc1xuICAgIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICAgIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICAgIHJldHVybiBfYyhcbiAgICAgIFwiZGl2XCIsXG4gICAgICB7XG4gICAgICAgIHN0YXRpY0NsYXNzOiBcImxpc3QtcGxhY2Vob2xkZXJfaXRlbVwiLFxuICAgICAgICBzdGF0aWNTdHlsZTogeyBoZWlnaHQ6IFwiMTAwcHhcIiB9XG4gICAgICB9LFxuICAgICAgW1xuICAgICAgICBfYyhcImRpdlwiLCB7XG4gICAgICAgICAgc3RhdGljQ2xhc3M6IFwibGlzdC1wbGFjZWhvbGRlcl9jZWxsXCIsXG4gICAgICAgICAgc3RhdGljU3R5bGU6IHsgd2lkdGg6IFwiMTAwJVwiIH1cbiAgICAgICAgfSlcbiAgICAgIF1cbiAgICApXG4gIH0sXG4gIGZ1bmN0aW9uKCkge1xuICAgIHZhciBfdm0gPSB0aGlzXG4gICAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gICAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gICAgcmV0dXJuIF9jKFwiZGl2XCIsIFtcbiAgICAgIF9jKFwic3BhblwiLCBbX3ZtLl92KFwi0J3QsNC40LzQtdC90L7QstCw0L3QuNC1XCIpXSksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX2MoXCJzcGFuXCIsIHsgc3RhdGljQ2xhc3M6IFwibXQtNVwiIH0sIFtfdm0uX3YoXCLQl9C90LDRh9C10L3QuNC1XCIpXSlcbiAgICBdKVxuICB9XG5dXG5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcblxuZXhwb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSIsImxldCBjYXRlZ29yeU1peGluID0ge1xuICAgIG1ldGhvZHM6IHtcbiAgICAgICAgc2V0Q2F0ZWdvcnkoY2F0ZWdvcnkpe1xuICAgICAgICAgICAgdGhpcy5lbnRpdHkuY2F0ZWdvcnkuaWQgPSBjYXRlZ29yeS5pZDtcbiAgICAgICAgICAgIHRoaXMuZW50aXR5LmNhdGVnb3J5Lm5hbWUgPSBjYXRlZ29yeS5uYW1lO1xuICAgICAgICAgICAgdGhpcy4kbm90aWZ5KHtcbiAgICAgICAgICAgICAgICBncm91cDogJ21haW4nLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdzdWNjZXNzJyxcbiAgICAgICAgICAgICAgICB0ZXh0OiAn0JrQsNGC0LXQs9C+0YDQuNGPINCy0YvQsdGA0LDQvdCwJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIHNlbGVjdENhdGVnb3J5KCl7XG4gICAgICAgICAgICB0aGlzLiRldmVudEJ1cy4kZW1pdCgnb3BlbkRpYWxvZycsIHtcbiAgICAgICAgICAgICAgICB0YWc6ICdzZWxlY3RDYXRlZ29yeScsXG4gICAgICAgICAgICAgICAgcGFyYW1zOiB7cm9vdF9jYXRlZ29yeTp0aGlzLnJvb3RfY2F0ZWdvcnksIHJlZjogdGhpc31cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBnZXRQYXJlbnRDYXRlZ29yeSgpe1xuICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIHdpbmRvdy5heGlvcyh7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnZ2V0JyxcbiAgICAgICAgICAgICAgICB1cmw6ICcvY2F0ZWdvcmllcy8nICsgdGhpcy5lbnRpdHkuY2F0ZWdvcnkuaWQsXG4gICAgICAgICAgICB9KS50aGVuKChyZXNwKSA9PiAge1xuICAgICAgICAgICAgICAgIHRoaXMuZW50aXR5LmNhdGVnb3J5LmlkID0gcmVzcC5kYXRhLmlkO1xuICAgICAgICAgICAgICAgIHRoaXMuZW50aXR5LmNhdGVnb3J5Lm5hbWUgPSByZXNwLmRhdGEubmFtZTtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgIH1cbn07XG5leHBvcnQgZGVmYXVsdCBjYXRlZ29yeU1peGluO1xuIiwibGV0IHN1cHBsaWVyTWl4aW4gPSB7XG4gICAgbWV0aG9kczoge1xuICAgICAgICBzZXRTdXBwbGllcihzdXBwbGllcil7XG4gICAgICAgICAgICB0aGlzLmVudGl0eS5zdXBwbGllci5pZCA9IHN1cHBsaWVyLmlkO1xuICAgICAgICAgICAgdGhpcy5lbnRpdHkuc3VwcGxpZXIubmFtZSA9IHN1cHBsaWVyLm5hbWU7XG4gICAgICAgICAgICB0aGlzLiRub3RpZnkoe1xuICAgICAgICAgICAgICAgIGdyb3VwOiAnbWFpbicsXG4gICAgICAgICAgICAgICAgdHlwZTogJ3N1Y2Nlc3MnLFxuICAgICAgICAgICAgICAgIHRleHQ6ICfQn9GA0L7QuNC30LLQvtC00LjRgtC10LvRjCDQstGL0LHRgNCw0L0nXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgc2VsZWN0U3VwcGxpZXIoKXtcbiAgICAgICAgICAgIHRoaXMuJGV2ZW50QnVzLiRlbWl0KCdvcGVuRGlhbG9nJywge1xuICAgICAgICAgICAgICAgIHRhZzogJ3NlbGVjdFN1cHBsaWVyJyxcbiAgICAgICAgICAgICAgICBwYXJhbXM6IHtyZWY6IHRoaXN9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICB9XG59O1xuZXhwb3J0IGRlZmF1bHQgc3VwcGxpZXJNaXhpbjtcbiIsImltcG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0gZnJvbSBcIi4vUHJvZHVjdERpYWxvZy52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9MTkwOTUyMjkmXCJcbmltcG9ydCBzY3JpcHQgZnJvbSBcIi4vUHJvZHVjdERpYWxvZy52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcbmV4cG9ydCAqIGZyb20gXCIuL1Byb2R1Y3REaWFsb2cudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5cblxuLyogbm9ybWFsaXplIGNvbXBvbmVudCAqL1xuaW1wb3J0IG5vcm1hbGl6ZXIgZnJvbSBcIiEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvcnVudGltZS9jb21wb25lbnROb3JtYWxpemVyLmpzXCJcbnZhciBjb21wb25lbnQgPSBub3JtYWxpemVyKFxuICBzY3JpcHQsXG4gIHJlbmRlcixcbiAgc3RhdGljUmVuZGVyRm5zLFxuICBmYWxzZSxcbiAgbnVsbCxcbiAgbnVsbCxcbiAgbnVsbFxuICBcbilcblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHtcbiAgdmFyIGFwaSA9IHJlcXVpcmUoXCJDOlxcXFxPcGVuU2VydmVyXFxcXGRvbWFpbnNcXFxcQXV0b0NSTVxcXFxub2RlX21vZHVsZXNcXFxcdnVlLWhvdC1yZWxvYWQtYXBpXFxcXGRpc3RcXFxcaW5kZXguanNcIilcbiAgYXBpLmluc3RhbGwocmVxdWlyZSgndnVlJykpXG4gIGlmIChhcGkuY29tcGF0aWJsZSkge1xuICAgIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgICBpZiAoIWFwaS5pc1JlY29yZGVkKCcxOTA5NTIyOScpKSB7XG4gICAgICBhcGkuY3JlYXRlUmVjb3JkKCcxOTA5NTIyOScsIGNvbXBvbmVudC5vcHRpb25zKVxuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVsb2FkKCcxOTA5NTIyOScsIGNvbXBvbmVudC5vcHRpb25zKVxuICAgIH1cbiAgICBtb2R1bGUuaG90LmFjY2VwdChcIi4vUHJvZHVjdERpYWxvZy52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9MTkwOTUyMjkmXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGFwaS5yZXJlbmRlcignMTkwOTUyMjknLCB7XG4gICAgICAgIHJlbmRlcjogcmVuZGVyLFxuICAgICAgICBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZuc1xuICAgICAgfSlcbiAgICB9KVxuICB9XG59XG5jb21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcInJlc291cmNlcy9qcy9jb21wb25lbnRzL3RlbXBsYXRlL0RpYWxvZ3MvUHJvZHVjdERpYWxvZy52dWVcIlxuZXhwb3J0IGRlZmF1bHQgY29tcG9uZW50LmV4cG9ydHMiLCJpbXBvcnQgbW9kIGZyb20gXCItIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTQtMCEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL1Byb2R1Y3REaWFsb2cudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiOyBleHBvcnQgZGVmYXVsdCBtb2Q7IGV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTQtMCEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL1Byb2R1Y3REaWFsb2cudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiIiwiZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvdGVtcGxhdGVMb2FkZXIuanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL1Byb2R1Y3REaWFsb2cudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTE5MDk1MjI5JlwiIl0sInNvdXJjZVJvb3QiOiIifQ==