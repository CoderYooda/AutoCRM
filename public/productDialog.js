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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvdGVtcGxhdGUvRGlhbG9ncy9Qcm9kdWN0RGlhbG9nLnZ1ZSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvY29tcG9uZW50cy90ZW1wbGF0ZS9EaWFsb2dzL1Byb2R1Y3REaWFsb2cudnVlPzVkYWMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvbWl4aW5zL2NhdGVnb3J5TWl4aW4uanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvbWl4aW5zL3N1cHBsaWVyTWl4aW4uanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvdGVtcGxhdGUvRGlhbG9ncy9Qcm9kdWN0RGlhbG9nLnZ1ZSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvY29tcG9uZW50cy90ZW1wbGF0ZS9EaWFsb2dzL1Byb2R1Y3REaWFsb2cudnVlP2E0N2QiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvdGVtcGxhdGUvRGlhbG9ncy9Qcm9kdWN0RGlhbG9nLnZ1ZT9iM2IxIl0sIm5hbWVzIjpbImNhdGVnb3J5TWl4aW4iLCJtZXRob2RzIiwic2V0Q2F0ZWdvcnkiLCJjYXRlZ29yeSIsImVudGl0eSIsImlkIiwibmFtZSIsIiRub3RpZnkiLCJncm91cCIsInR5cGUiLCJ0ZXh0Iiwic2VsZWN0Q2F0ZWdvcnkiLCIkZXZlbnRCdXMiLCIkZW1pdCIsInRhZyIsInBhcmFtcyIsInJvb3RfY2F0ZWdvcnkiLCJyZWYiLCJnZXRQYXJlbnRDYXRlZ29yeSIsImxvYWRpbmciLCJ3aW5kb3ciLCJheGlvcyIsIm1ldGhvZCIsInVybCIsInRoZW4iLCJyZXNwIiwiZGF0YSIsInN1cHBsaWVyTWl4aW4iLCJzZXRTdXBwbGllciIsInN1cHBsaWVyIiwic2VsZWN0U3VwcGxpZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUE0UEE7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFEQTtBQUVBLG1CQUZBO0FBR0Esd0lBSEE7QUFJQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUFBO0FBQUE7O0FBQ0E7QUFDQSxPQUxBOztBQU1BLGFBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQSxPQURBLEVBRUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxPQUZBLEVBR0E7QUFBQTtBQUFBO0FBQUE7QUFBQSxPQUhBLEVBSUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxPQUpBLEVBS0E7QUFBQTtBQUFBO0FBQUE7QUFBQSxPQUxBLENBTkE7QUFhQSxzQkFiQTtBQWNBO0FBQ0Esa0JBREE7QUFFQSxxQkFGQTtBQUdBLHNCQUhBO0FBSUEsdUJBSkE7QUFLQSxzQkFMQTtBQU1BLDhCQU5BO0FBT0EsMEJBUEE7QUFRQTtBQUNBLGtCQURBO0FBRUE7QUFGQSxTQVJBO0FBWUE7QUFDQSxlQURBO0FBRUE7QUFGQSxTQVpBO0FBZ0JBO0FBQ0Esa0JBREE7QUFFQTtBQUZBO0FBaEJBLE9BZEE7QUFtQ0Esa0JBbkNBO0FBb0NBO0FBcENBO0FBc0NBLEdBM0NBO0FBNENBLFNBNUNBLHFCQTRDQTtBQUFBOztBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBSEEsTUFHQTtBQUNBO0FBQ0E7QUFDQSxxQkFEQTtBQUVBO0FBRkEsU0FHQSxJQUhBLENBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BUkEsV0FRQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtB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QUtDLE9BQUwsQ0FBYTtBQUNUQyxhQUFLLEVBQUUsTUFERTtBQUVUQyxZQUFJLEVBQUUsU0FGRztBQUdUQyxZQUFJLEVBQUU7QUFIRyxPQUFiO0FBS0gsS0FUSTtBQVVMb0Isa0JBVkssNEJBVVc7QUFDWixXQUFLbEIsU0FBTCxDQUFlQyxLQUFmLENBQXFCLFlBQXJCLEVBQW1DO0FBQy9CQyxXQUFHLEVBQUUsZ0JBRDBCO0FBRS9CQyxjQUFNLEVBQUU7QUFBQ0UsYUFBRyxFQUFFO0FBQU47QUFGdUIsT0FBbkM7QUFJSDtBQWZJO0FBRE8sQ0FBcEI7QUFtQmVVLDRFQUFmLEU7Ozs7Ozs7Ozs7OztBQ25CQTtBQUFBO0FBQUE7QUFBQTtBQUE0RjtBQUMzQjtBQUNMOzs7QUFHNUQ7QUFDbUc7QUFDbkcsZ0JBQWdCLDJHQUFVO0FBQzFCLEVBQUUsbUZBQU07QUFDUixFQUFFLHdGQUFNO0FBQ1IsRUFBRSxpR0FBZTtBQUNqQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLElBQUksS0FBVSxFQUFFLFlBaUJmO0FBQ0Q7QUFDZSxnRjs7Ozs7Ozs7Ozs7O0FDdENmO0FBQUE7QUFBQSx3Q0FBeU0sQ0FBZ0IseVBBQUcsRUFBQyxDOzs7Ozs7Ozs7Ozs7QUNBN047QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBIiwiZmlsZSI6InByb2R1Y3REaWFsb2cuanMiLCJzb3VyY2VzQ29udGVudCI6WyI8dGVtcGxhdGU+XHJcbiAgICA8ZGl2PlxyXG4gICAgICAgIDwhLS0gICAgICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1oZWFkZXIgZGFya1wiIHN0eWxlPVwianVzdGlmeS1jb250ZW50OiBub3JtYWw7XCI+LS0+XHJcbiAgICAgICAgPCEtLSAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1hbHQtaGVhZGVyXCI+LS0+XHJcbiAgICAgICAgPCEtLSAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cIml0ZW0tdGl0bGUgXzUwMFwiPtCg0L7Qt9C90LjRh9C90LDRjyDRhtC10L3QsDwvc3Bhbj4tLT5cclxuICAgICAgICA8IS0tICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpdGVtLWV4Y2VwdCBmb250LXdlaWdodC1ib2xkZXIgaC0xeFwiPi0tPlxyXG4gICAgICAgIDwhLS0gICAgICAgICAgICAgICAgPHNwYW4gaWQ9XCJ0b3RhbF9wcmljZVwiPi0tPlxyXG4gICAgICAgIDwhLS0gICAgICAgICAgICAgICAgICAge3sgJHByb2R1Y3QtPnN0b3Jlcy0+ZmluZChBdXRoOjp1c2VyKCktPmN1cnJlbnRfc3RvcmUpLT5waXZvdC0+cmV0YWlsX3ByaWNlID8/ICcwJyB9fS0tPlxyXG4gICAgICAgIDwhLS0gICAgICAgICAgICAgICAgPC9zcGFuPi0tPlxyXG4gICAgICAgIDwhLS0gICAgICAgICAgICAgICAgPC9kaXY+LS0+XHJcbiAgICAgICAgPCEtLSAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaXRlbS10YWcgdGFnIGhpZGVcIj4tLT5cclxuICAgICAgICA8IS0tICAgICAgICAgICAgICAgIDwvZGl2Pi0tPlxyXG4gICAgICAgIDwhLS0gICAgICAgICAgICA8L2Rpdj4tLT5cclxuICAgICAgICA8IS0tICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGFsLWFsdC1oZWFkZXJcIj4tLT5cclxuICAgICAgICA8IS0tICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaXRlbS10aXRsZSBfNTAwXCI+0J3QsCDRgdCy0L7QtdC8INGB0LrQu9Cw0LTQtSAvINC90LAg0LTRgNGD0LPQuNGFPC9zcGFuPi0tPlxyXG4gICAgICAgIDwhLS0gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIml0ZW0tZXhjZXB0IGZvbnQtd2VpZ2h0LWJvbGRlciBoLTF4XCI+LS0+XHJcbiAgICAgICAgPCEtLSAgICAgICAgICAgICAgICA8c3BhbiBpZD1cInRvdGFsX3ByaWNlXCI+LS0+XHJcbiAgICAgICAgPCEtLSAgICAgICAgICAgICAgICAgICB7eyAkcHJvZHVjdC0+Z2V0Q291bnRTZWxmT3RoZXJzKCkgfX0tLT5cclxuICAgICAgICA8IS0tICAgICAgICAgICAgICAgIDwvc3Bhbj4tLT5cclxuICAgICAgICA8IS0tICAgICAgICAgICAgICAgIDwvZGl2Pi0tPlxyXG4gICAgICAgIDwhLS0gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIml0ZW0tdGFnIHRhZyBoaWRlXCI+LS0+XHJcbiAgICAgICAgPCEtLSAgICAgICAgICAgICAgICA8L2Rpdj4tLT5cclxuICAgICAgICA8IS0tICAgICAgICAgICAgPC9kaXY+LS0+XHJcbiAgICAgICAgPCEtLSAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1hbHQtaGVhZGVyXCI+LS0+XHJcbiAgICAgICAgPCEtLSAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cIml0ZW0tdGl0bGUgXzUwMFwiPtCl0YDQsNC90LXQvdC40LU8L3NwYW4+LS0+XHJcbiAgICAgICAgPCEtLSAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaXRlbS1leGNlcHQgZm9udC13ZWlnaHQtYm9sZGVyIGgtMXhcIj4tLT5cclxuICAgICAgICA8IS0tICAgICAgICAgICAgICAgIDxzcGFuIGlkPVwidG90YWxfcHJpY2VcIj4tLT5cclxuICAgICAgICA8IS0tICAgICAgICAgICAgICAgICAgIHshISAkcHJvZHVjdC0+Z2V0U3RvcmFnZUNvZGUoKSAhIX0tLT5cclxuICAgICAgICA8IS0tICAgICAgICAgICAgICAgIDwvc3Bhbj4tLT5cclxuICAgICAgICA8IS0tICAgICAgICAgICAgICAgIDwvZGl2Pi0tPlxyXG4gICAgICAgIDwhLS0gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIml0ZW0tdGFnIHRhZyBoaWRlXCI+LS0+XHJcbiAgICAgICAgPCEtLSAgICAgICAgICAgICAgICA8L2Rpdj4tLT5cclxuICAgICAgICA8IS0tICAgICAgICAgICAgPC9kaXY+LS0+XHJcbiAgICAgICAgPCEtLSAgICAgICAgPC9kaXY+LS0+XHJcblxyXG4gICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1ib2R5XCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1zbS00IG5vLXByIGQtZmxleFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8dWwgY2xhc3M9XCJuYXZcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaSB2LWZvcj1cInRhYiBpbiB0YWJzXCIgdi1iaW5kOmtleT1cInRhYi5zbHVnXCIgdi1iaW5kOmNsYXNzPVwieydhY3RpdmUnIDogdGFiLnN0YXRlfVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJuYXYtaXRlbVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIHYtb246Y2xpY2s9XCJzZWxlY3RUYWIodGFiKVwiIGNsYXNzPVwibmF2LWxpbmtcIiBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7IHRhYi5uYW1lIH19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZmxvYXQtcmlnaHQgaGVscGVyX2RhbmdlciBkLW5vbmUtZlwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhIGZhLWV4Y2xhbWF0aW9uLXRyaWFuZ2xlIHRleHQtbWQgbWwtMiB0ZXh0LWRhbmdlclwiPjwvaT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC91bD5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLXNtLTggbm8tcGxcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRhYi1jb250ZW50IG5vLXBsXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGFiLXBhbmUgcC0zXCIgdi1iaW5kOmNsYXNzPVwieydhY3RpdmUnIDogdGFic1swXS5zdGF0ZX1cIj5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPCEtLSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBpZD1cInByb3ZpZGVyX3NlYXJjaF9jb250YWluZXJcIiBjbGFzcz1cInByb3ZpZGVyX3NlYXJjaF9jb250YWluZXIgZmFkZVwiIGRhdGEtc2ltcGxlYmFyIHN0eWxlPVwiaGVpZ2h0OiAzMDBweDtcIj4tLT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8IS0tICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRcIj48L2Rpdj4tLT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8IS0tICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImVtcHR5X3NlYXJjaFwiPi0tPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwhLS0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm91dF9vZl9zZWFyY2hcIj48L2Rpdj4tLT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8IS0tICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWNlbnRlclwiPtCg0LXQt9GD0LvRjNGC0LDRgtC+0LIg0L3QtdGCPC9kaXY+LS0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPCEtLSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2Pi0tPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwhLS0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2Pi0tPlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybUlucHV0IHYtYmluZDppbnB1dERhdGE9XCJ7dHlwZTonaW5wdXQnLGxhYmVsOifQkNGA0YLQuNC60YPQuycsbmFtZTonZW50aXR5LmFydGljbGUnLCBwbGFjZWhvbGRlcjon0JDRgNGC0LjQutGD0Lsg0LTQtdGC0LDQu9C4ICjQvdC1INCx0L7Qu9C10LUgNjQg0YHQuNC80LLQvtC70L7QsiknfVwiIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEZvcm1JbnB1dCB2LWJpbmQ6aW5wdXREYXRhPVwie3R5cGU6J2lucHV0JyxsYWJlbDon0J3QsNC40LzQtdC90L7QstCw0L3QuNC1JyxuYW1lOidlbnRpdHkubmFtZScsIHBsYWNlaG9sZGVyOifQndCw0LjQvNC10L3QvtCy0LDQvdC40LUgKNC90LUg0LHQvtC70LXQtSAyNTUg0YHQuNC80LLQvtC70L7QsiknfVwiIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEZvcm1JbnB1dCB2LWJpbmQ6aW5wdXREYXRhPVwie3R5cGU6J3NlbGVjdG9yJyxsYWJlbDon0JIg0LrQsNGC0LXQs9C+0YDQuNC4JyxuYW1lOidlbnRpdHkuY2F0ZWdvcnkubmFtZScsIG9uQ2xpY2s6J3NlbGVjdENhdGVnb3J5J31cIiAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtSW5wdXQgdi1iaW5kOmlucHV0RGF0YT1cInt0eXBlOidzZWxlY3RvcicsbGFiZWw6J9Cf0YDQvtC40LfQstC+0LTQuNGC0LXQu9GMJyxuYW1lOidlbnRpdHkuc3VwcGxpZXIubmFtZScsIG9uQ2xpY2s6J3NlbGVjdFN1cHBsaWVyJ31cIiAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwhLS0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+LS0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPCEtLSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEBmb3JlYWNoKCRzdG9yZXMgYXMgJHN0b3JlKS0tPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwhLS0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWw+0KDQvtC30L3QuNGH0L3QsNGPINGG0LXQvdCwINC00LvRjyDQvNCw0LPQsNC30LjQvdCwIFwie3sgJHN0b3JlLT5uYW1lIH19XCI8L2xhYmVsPi0tPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwhLS0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXAgbWItM1wiPi0tPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwhLS0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJudW1iZXJcIiBtaW49XCIwXCIgbmFtZT1cInN0b3JhZ2Vbe3sgJHN0b3JlLT5pZCB9fV1bcmV0YWlsX3ByaWNlXVwiIGNsYXNzPVwiZm9ybS1jb250cm9sIG1sLTBcIiBwbGFjZWhvbGRlcj1cItCg0L7Qt9C90LjRh9C90LDRjyDRhtC10L3QsFwiIHZhbHVlPVwiQGlmKCRwcm9kdWN0KXt7ICRwcm9kdWN0LT5zdG9yZXMtPmZpbmQoJHN0b3JlLT5pZCktPnBpdm90LT5yZXRhaWxfcHJpY2UgPz8gJzAnIH19QGVuZGlmXCIgPi0tPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwhLS0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj4tLT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8IS0tICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQGVuZGZvcmVhY2gtLT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8IS0tICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj4tLT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRhYi1wYW5lXCIgdi1iaW5kOmNsYXNzPVwieydhY3RpdmUnIDogdGFic1sxXS5zdGF0ZX1cIiA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRhYmxlIGNsYXNzPVwidGFibGUgdy0xMDBcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoZWFkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dHI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGg+0KHQutC70LDQtDwvdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGg+0JrQvtC70LjRh9C10YHRgtCy0L48L3RoPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoPtCl0YDQsNC90LXQvdC40LU8L3RoPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RoZWFkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGJvZHk+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0cj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICDQnNCw0LPQsNC30LjQvVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdG9yYWdlX3N0b3JlX2NvbnRhaW5lclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdmFsdWU9XCIgXCIgY2xhc3M9XCJzdG9yYWdlX3N0b3JlIGJiXzFcIiB0eXBlPVwidGV4dFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdmFsdWU9XCIgXCIgY2xhc3M9XCJzdG9yYWdlX3N0b3JlIGJiXzJcIiB0eXBlPVwidGV4dFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdmFsdWU9XCIgXCIgY2xhc3M9XCJzdG9yYWdlX3N0b3JlIGJiXzNcIiB0eXBlPVwidGV4dFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdmFsdWU9XCIgXCIgY2xhc3M9XCJzdG9yYWdlX3N0b3JlIGJiXzRcIiB0eXBlPVwidGV4dFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90Ym9keT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RhYmxlPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJib3ggbXQtMTBcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJiX2ZhcSBmYXFfMVwiPtCX0L7QvdCwINGF0YDQsNC90LXQvdC40Y88L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJiX2ZhcSBmYXFfMlwiPtCd0L7QvNC10YAg0YHRgtC10LvQu9Cw0LbQsDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYmJfZmFxIGZhcV8zXCI+0J3QvtC80LXRgCDQstC10YDRgtC40LrQsNC70YzQvdC+0Lkg0YHQtdC60YbQuNC4INGB0YLQtdC70LvQsNC20LA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJiX2ZhcSBmYXFfNFwiPtCd0L7QvNC10YAg0L/QvtC70LrQuDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGFiLXBhbmUgcC0zXCIgdi1iaW5kOmNsYXNzPVwieydhY3RpdmUnIDogdGFic1syXS5zdGF0ZX1cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHYtaWY9XCJzaG9wX2FjdGl2YXRlZFwiIHJlZj1cInRhYm1haW5cIiBpZD1cInRhYl9tYWluXCIgZGF0YS1zaW1wbGViYXIgc3R5bGU9XCJoZWlnaHQ6IDMxMHB4O1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29udGVudGVkIG1iLTEwXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybUlucHV0IHYtYmluZDppbnB1dERhdGE9XCJ7dHlwZTonY2hlY2tib3gnLG1iOmZhbHNlLCBsYWJlbDon0J/QvtC60LDQt9Cw0YLRjCDQvdCwINCz0LvQsNCy0L3QvtC5INGB0YLRgNCw0L3QuNGG0LUnLG5hbWU6J2VudGl0eS5zcF9tYWluJ31cIiAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRlbnRlZCBtYi0xMFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJlbGF0aXZlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cInNwX3N0b2NrXCIgY2xhc3M9XCJ3LTEwMCBtYi0wIHBvaW50ZXJcIj7QkNC60YbQuNC+0L3QvdGL0Lkg0YLQvtCy0LDRgDwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzPVwiYWJzb2x1dGUgY3VzdG9tX2NoZWNrYm94XCIgc3R5bGU9XCJyaWdodDogMDsgdG9wOiAzcHg7XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBpZD1cInNwX3N0b2NrXCIgdi1tb2RlbD1cImVudGl0eS5zcF9zdG9ja1wiIHR5cGU9XCJjaGVja2JveFwiIGNsYXNzPVwibm90X2RlZmF1bHRcIi8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPjwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiB2LWJpbmQ6Y2xhc3M9XCJ7J2Qtbm9uZSc6IWVudGl0eS5zcF9zdG9ja31cIiBjbGFzcz1cInN0b2NrcyBtYi01IG10LTEwXCIgPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgIGNsYXNzPVwiZm9ybS1ncm91cCBkLWZsZXhcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzPVwiY29sLXNtLTQgbm8tcGxcIj7QptC10L3QsDwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cCBjb2wtc20tOCBuby1wclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHYtbW9kZWw9XCJlbnRpdHkuc3BfZGlzY291bnRfcHJpY2VcIiB0eXBlPVwibnVtYmVyXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2wgZGlzY291bnRcIiBkaXNhYmxlZCAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cCBkLWZsZXhcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzPVwiY29sLXNtLTQgbm8tcGxcIj7QodC60LjQtNC60LA8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXAgY29sLXNtLTggbm8tcHJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB2LW1vZGVsPVwiZW50aXR5LnNwX2Rpc2NvdW50XCIgdHlwZT1cIm51bWJlclwiIHN0eWxlPVwiZmxleDogMC42O1wiIGNsYXNzPVwiZm9ybS1jb250cm9sIGRpc2NvdW50IG1yLTEwXCIgLz5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8U2VsZWN0b3Igdi1iaW5kOmRhdGE9XCJ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDonZW50aXR5LnNwX2Rpc2NvdW50X3R5cGUnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdF92YWx1ZToxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudHM6W1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtuYW1lOifQsiDRgNGD0LHQu9GP0YUnLCB2YWx1ZTowfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7bmFtZTon0LIg0L/RgNC+0YbQtdC90YLQsNGFJywgdmFsdWU6MX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVwiIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgIGNsYXNzPVwiZm9ybS1ncm91cCBkLWZsZXhcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzPVwiY29sLXNtLTQgbm8tcGxcIj7QmNGC0L7Qs9C+PC9sYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwIGNvbC1zbS04IG5vLXByXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdi1tb2RlbD1cImVudGl0eS5zcF9kaXNjb3VudF90b3RhbFwiIHR5cGU9XCJudW1iZXJcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiIGRpc2FibGVkIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtSW5wdXQgdi1iaW5kOmlucHV0RGF0YT1cInt0eXBlOidpbnB1dCcsbGFiZWw6J9Cd0LDQuNC80LXQvdC+0LLQsNC90LjQtSDQv9GA0L7QtNGD0LrRgtCwJyxuYW1lOidlbnRpdHkuc3BfbmFtZScsIHBsYWNlaG9sZGVyOifQndCw0LjQvNC10L3QvtCy0LDQvdC40LUg0L/RgNC+0LTRg9C60YLQsCd9XCIgLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImQtZmxleCBtdC0xMFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cCBtYi0wXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbD7QntGB0L3QvtCy0L3QvtC1INGE0L7RgtC+PC9sYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImltZ191cGxvYWRfY2F0X2NvbnRhaW5lclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiB2LWlmPVwibG9hZGluZ1wiIGNsYXNzPVwibGlzdC1wbGFjZWhvbGRlciBtYi0zXCIgc3R5bGU9XCJoZWlnaHQ6IDEwMHB4O1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJsaXN0LXBsYWNlaG9sZGVyX2l0ZW1cIiBzdHlsZT1cImhlaWdodDogMTAwcHg7XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJsaXN0LXBsYWNlaG9sZGVyX2NlbGxcIiBzdHlsZT1cIndpZHRoOiAxMDAlXCIgPjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nIHYtaWY9XCIhbG9hZGluZ1wiIGNsYXNzPVwiaC0xMDAgdy0xMDAgaW1hZ2VcIiA6c3JjPVwiaW1hZ2VcIiAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gdi1pZj1cIiFsb2FkaW5nXCIgQGNsaWNrPVwidXBsb2FkQ2xpY2soKVwiIGNsYXNzPVwidXBsb2FkX2J0blwiPtCX0LDQs9GA0YPQt9C40YLRjDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmbGV4LTMgbWwtMTVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWw+0J7Qv9C40YHQsNC90LjQtSDQv9GA0L7QtNGD0LrRgtCwPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGV4dGFyZWEgdi1tb2RlbD1cImVudGl0eS5zcF9kZXNjXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2wgcC01IHJlc2l6ZS1ub25lIGJvcmRlci1yYWRpdXMtbm9uZVwiIHBsYWNlaG9sZGVyPVwi0JLQstC10LTQuNGC0LUg0L7Qv9C40YHQsNC90LjQtVwiIHN0eWxlPVwiaGVpZ2h0OiA5NHB4O1wiPjwvdGV4dGFyZWE+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWw+0KXQsNGA0LDQutGC0LXRgNC40YHRgtC40LrQuDwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCIgQGNsaWNrPVwiYWRkU3BlY2lmaWNhdGlvbigpXCIgY2xhc3M9XCJmbG9hdC1yaWdodFwiPtCU0L7QsdCw0LLQuNGC0Yw8L2E+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHYtZm9yPVwic3BlY2lmaWNhdGlvbiBpbiBlbnRpdHkuc3BlY2lmaWNhdGlvbnNcIiBjbGFzcz1cInNwZWNpZmljYXRpb25zXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImVsZW1lbnQgY29weSBkLWZsZXggbWItMTBcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPtCd0LDQuNC80LXQvdC+0LLQsNC90LjQtTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibXQtNVwiPtCX0L3QsNGH0LXQvdC40LU8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibWwtMTUgZmxleC0xXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiB2LW1vZGVsPVwic3BlY2lmaWNhdGlvbi5sYWJlbFwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgcGxhY2Vob2xkZXI9XCLQktGP0LfQutC+0YHRgtGMXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiB2LW1vZGVsPVwic3BlY2lmaWNhdGlvbi52YWx1ZVwiIGNsYXNzPVwiZm9ybS1jb250cm9sIG10LTVcIiBwbGFjZWhvbGRlcj1cIjVXNDBcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyZW1vdmUgcG9pbnRlciBtbC0xMFwiPjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgdi1pZj1cIiFzaG9wX2FjdGl2YXRlZFwiPtCQ0LrRgtC40LLQuNGA0YPQudGC0LUg0LjQvdGC0LXRgNC90LXRgi3QvNCw0LPQsNC30LjQvSDQsiA8YSBjbGFzcz1cImFqYXgtbmF2XCIgaHJlZj1cIiNcIj7QvdCw0YHRgtGA0L7QudC60LDRhTwvYT4uPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiB2LWlmPVwiIXNob3BfYWN0aXZhdGVkXCI+0K3RgtC+INCx0LXRgdC/0LvQsNGC0L3Qvi48L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0YWItcGFuZSBwLTNcIiB2LWJpbmQ6Y2xhc3M9XCJ7J2FjdGl2ZScgOiB0YWJzWzNdLnN0YXRlfVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtSW5wdXQgdi1iaW5kOmlucHV0RGF0YT1cInt0eXBlOidpbnB1dCcsbGFiZWw6J9Co0YLRgNC40YUt0LrQvtC0INC/0YDQvtC40LfQstC+0LTQuNGC0LXQu9GPIChFQU4gMTMpJyxuYW1lOidlbnRpdHkuYmFyY29kZScsIG1lc3NhZ2VzOm1lc3NhZ2VzLCBwbGFjZWhvbGRlcjon0KjRgtGA0LjRhdC60L7QtCd9XCIgLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybUlucHV0IHYtYmluZDppbnB1dERhdGE9XCJ7dHlwZTonaW5wdXQnLGxhYmVsOifQktC90YPRgtGA0LXQvdC90LjQuSDRiNGC0YDQuNGFLdC60L7QtCAoRUFOIDEzKScsbmFtZTonZW50aXR5LmJhcmNvZGVfbG9jYWwnLCBtZXNzYWdlczptZXNzYWdlcywgcGxhY2Vob2xkZXI6J9Co0YLRgNC40YXQutC+0LQg0YHQutC70LDQtNCwJ31cIiAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPCEtLTxkaXYgY2xhc3M9XCJ0YWItcGFuZVwiIGlkPVwie3sgJGNsYXNzIH19X3RhYl9lbnRyYW5jZXNcIiBkYXRhLXNpbXBsZWJhclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT1cIm1heC1oZWlnaHQ6IDQwMHB4O1wiPlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBAaWYoaXNzZXQoJHByb2R1Y3QtPmVudHJhbmNlcykgJiYgY291bnQoJHByb2R1Y3QtPmVudHJhbmNlcykpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRhYmxlPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dHI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGg+SUQ8L3RoPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoPtCf0L7RgdGC0LDQstGJ0LjQujwvdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGg+0JrQvtC70LjRh9C10YHRgtCy0L48L3RoPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoPtCU0LDRgtCwPC90aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEBmb3JlYWNoKCRwcm9kdWN0LT5lbnRyYW5jZXMgYXMgJGVudHJhbmNlKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRyPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPnt7ICRlbnRyYW5jZS0+aWQgfX08L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPnt7ICRlbnRyYW5jZS0+cGFydG5lci0+b2ZmaWNpYWxfbmFtZSA/PyAnJyB9fTwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQ+e3sgJGVudHJhbmNlLT5waXZvdC0+Y291bnQgfX08L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPnt7ICRlbnRyYW5jZS0+cGl2b3QtPmNyZWF0ZWRfYXQgfX08L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQGVuZGZvcmVhY2hcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90YWJsZT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBAZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgINCf0L7RgdGC0YPQv9C70LXQvdC40Y8g0L3QtSDQvdCw0LnQtNC10L3Ri1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEBlbmRpZlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2Pi0tPlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9kYWwtZm9vdGVyXCI+XHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uIEBjbGljaz1cIiRwYXJlbnQuY2xvc2VEaWFsb2coZGlhbG9nKVwiIHR5cGU9XCJzdWJtaXRcIiBjbGFzcz1cImJ1dHRvbiB3aGl0ZVwiPtCX0LDQutGA0YvRgtGMPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uIEBjbGljaz1cInNhdmUoKVwiIHR5cGU9XCJzdWJtaXRcIiBjbGFzcz1cImJ1dHRvbiBwcmltYXJ5IHB1bGwtcmlnaHRcIj7QodC+0YXRgNCw0L3QuNGC0Yw8L2J1dHRvbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzeXN0ZW1fbWVzc2FnZVwiPlxyXG5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuPC90ZW1wbGF0ZT5cclxuXHJcbjxzY3JpcHQ+XHJcbiAgICBpbXBvcnQgY2F0ZWdvcnlNaXhpbiBmcm9tIFwiLi8uLi8uLi9taXhpbnMvY2F0ZWdvcnlNaXhpblwiXHJcbiAgICBpbXBvcnQgc3VwcGxpZXJNaXhpbiBmcm9tIFwiLi8uLi8uLi9taXhpbnMvc3VwcGxpZXJNaXhpblwiXHJcbiAgICBpbXBvcnQgRm9ybUlucHV0IGZyb20gXCIuLy4uLy4uL3NlcnZpY2UvRm9ybUlucHV0XCJcclxuICAgIGV4cG9ydCBkZWZhdWx0IHtcclxuICAgICAgICBuYW1lOiBcIlByb2R1Y3REaWFsb2dcIixcclxuICAgICAgICBwcm9wczogWydkaWFsb2cnXSxcclxuICAgICAgICBtaXhpbnM6IFtjYXRlZ29yeU1peGluLCBzdXBwbGllck1peGluXSxcclxuICAgICAgICBkYXRhOiAoKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBnZXQgc2hvcF9hY3RpdmF0ZWQoKXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbG9jYWxfc2V0dGluZ3MgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZVsnc2V0dGluZ3MnXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGluZGV4ID0gXy5maW5kSW5kZXgobG9jYWxfc2V0dGluZ3MsIGZ1bmN0aW9uKG8pIHsgcmV0dXJuIG8ua2V5ID09PSBcInNob3BfZW5hYmxlZFwiOyB9KTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbG9jYWxfc2V0dGluZ3NbaW5kZXhdID8gQm9vbGVhbihwYXJzZUludChsb2NhbF9zZXR0aW5nc1tpbmRleF0udmFsdWUpKSA6IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHRhYnM6IFtcclxuICAgICAgICAgICAgICAgICAgICB7c2x1ZzogXCJiYXNlXCIsIG5hbWU6IFwi0J7RgdC90L7QstC90YvQtVwiLCBzdGF0ZTogdHJ1ZX0sXHJcbiAgICAgICAgICAgICAgICAgICAge3NsdWc6IFwic3RvcmVcIiwgbmFtZTogXCLQodC60LvQsNC0XCIsIHN0YXRlOiBmYWxzZX0sXHJcbiAgICAgICAgICAgICAgICAgICAge3NsdWc6IFwic2hvcFwiLCBuYW1lOiBcItCY0L3RgtC10YDQvdC10YIg0LzQsNCz0LDQt9C40L1cIiwgc3RhdGU6IGZhbHNlfSxcclxuICAgICAgICAgICAgICAgICAgICB7c2x1ZzogXCJiYXJjb2RlXCIsIG5hbWU6IFwi0KjRgtGA0LjRhdC60L7QtFwiLCBzdGF0ZTogZmFsc2V9LFxyXG4gICAgICAgICAgICAgICAgICAgIHtzbHVnOiBcImVudHJhbmNlXCIsIG5hbWU6IFwi0J/QvtGB0YLRg9C/0LvQtdC90LjRj1wiLCBzdGF0ZTogZmFsc2V9LFxyXG4gICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgIHJvb3RfY2F0ZWdvcnk6IDIsXHJcbiAgICAgICAgICAgICAgICBlbnRpdHk6IHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOm51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgYXJ0aWNsZTpudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgIHNwX21haW46ZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgc3Bfc3RvY2s6ZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgc3BfZGlzY291bnQ6MCxcclxuICAgICAgICAgICAgICAgICAgICBzcF9kaXNjb3VudF90eXBlOm51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgc3BlY2lmaWNhdGlvbnM6W10sXHJcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2U6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhdGg6ICcvaW1hZ2VzL25vX2ltYWdlLnBuZycsXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBjYXRlZ29yeTp7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOjIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6bnVsbCxcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHN1cHBsaWVyOntcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6bnVsbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTon0J3QtSDQstGL0LHRgNCw0L0nLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgbWVzc2FnZXM6e30sXHJcbiAgICAgICAgICAgICAgICBsb2FkaW5nOmZhbHNlLFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBtb3VudGVkKCkge1xyXG4gICAgICAgICAgICB0aGlzLmRpYWxvZy53aWR0aCA9IDYwMDtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZGlhbG9nLmlkID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRpYWxvZy50aXRsZSA9IFwi0J3QvtCy0YvQuSDQv9GA0L7QtNGD0LrRglwiO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRQYXJlbnRDYXRlZ29yeSgpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5heGlvcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiAnZ2V0JyxcclxuICAgICAgICAgICAgICAgICAgICB1cmw6ICcvcHJvZHVjdHMvJyArIHRoaXMuZGlhbG9nLmlkLFxyXG4gICAgICAgICAgICAgICAgfSkudGhlbigocmVzcCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGlhbG9nLnRpdGxlID0gXCLQoNC10LTQsNC60YLQuNGA0L7QstCw0L3QuNC1INGC0L7QstCw0YDQsCAnXCIgKyByZXNwLmRhdGEubmFtZSArIFwiJ1wiO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaWQgPSByZXNwLmRhdGEuaWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbnRpdHkgPSByZXNwLmRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9KS5jYXRjaCgoZXJyb3IpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZihlcnJvci5yZXNwb25zZS5zdGF0dXMgPT09IDQwNCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJHBhcmVudC5jbG9zZURpYWxvZyh0aGlzLmRpYWxvZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvbXB1dGVkOiB7XHJcbiAgICAgICAgICAgIGltYWdlKCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5lbnRpdHkuaW1hZ2UgJiYgdGhpcy5lbnRpdHkuaW1hZ2UudXJsID8gdGhpcy5lbnRpdHkuaW1hZ2UudXJsIDogJy9pbWFnZXMvbm9faW1hZ2UucG5nJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbWV0aG9kczoge1xyXG4gICAgICAgICAgICBhZGRTcGVjaWZpY2F0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVudGl0eS5zcGVjaWZpY2F0aW9ucy51bnNoaWZ0KHtsYWJlbDpudWxsLCB2YWx1ZTpudWxsfSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHN5bmMoZSl7XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmltYWdlX2ZpbGUgPSBlLnRhcmdldC5maWxlc1swXTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3luY0ltYWdlKCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHVwbG9hZENsaWNrKCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRyZWZzLnByb2R1Y3RfaW1nX3VwbG9hZC5jbGljaygpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzeW5jSW1hZ2UoKXtcclxuICAgICAgICAgICAgICAgIGxldCBkYXRhID0gbmV3IEZvcm1EYXRhKCk7XHJcbiAgICAgICAgICAgICAgICBkYXRhLmFwcGVuZCgnaW1hZ2UnLCB0aGlzLmltYWdlX2ZpbGUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5heGlvcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiAncG9zdCcsXHJcbiAgICAgICAgICAgICAgICAgICAgdXJsOiAnL2ltYWdlL3VwbG9hZCcsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTpkYXRhXHJcbiAgICAgICAgICAgICAgICB9KS50aGVuKChyZXNwKSA9PiAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW50aXR5LmltYWdlID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbnRpdHkuaW1hZ2UudXJsID0gcmVzcC5kYXRhLmltYWdlc1swXS51cmw7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbnRpdHkuaW1hZ2UuaWQgPSByZXNwLmRhdGEuaW1hZ2VzWzBdLmlkO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNlbGVjdFRhYih0YWIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudGFicy5mb3JFYWNoKCh0YWIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0YWIuc3RhdGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgdGFiLnN0YXRlID0gdHJ1ZTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2F2ZSgpe1xyXG4gICAgICAgICAgICAgICAgbGV0IG1ldGhvZCA9IHRoaXMuZW50aXR5LmlkID8gJ3BhdGNoJyA6ICdwb3N0JztcclxuICAgICAgICAgICAgICAgIGxldCB1cmwgPSB0aGlzLmVudGl0eS5pZCA/ICcvJyArIHRoaXMuZW50aXR5LmlkIDogJyc7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgd2luZG93LmF4aW9zKHtcclxuICAgICAgICAgICAgICAgICAgICBtZXRob2Q6IG1ldGhvZCxcclxuICAgICAgICAgICAgICAgICAgICB1cmw6ICcvcHJvZHVjdHMnICsgdXJsLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6dGhpcy5lbnRpdHksXHJcbiAgICAgICAgICAgICAgICB9KS50aGVuKChyZXNwKSA9PiAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJGV2ZW50QnVzLiRlbWl0KCdQcm9kdWN0VXBkYXRlZCcsIHtpZDogdGhpcy5pZCwgY2F0ZWdvcnlfaWQ6dGhpcy5jYXRlZ29yeV9pZH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJHBhcmVudC5jbG9zZURpYWxvZyh0aGlzLmRpYWxvZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9KS5jYXRjaCgoZXJyb3IpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1lc3NhZ2VzID0gZXJyb3IucmVzcG9uc2UuZGF0YS5tZXNzYWdlcztcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb21wb25lbnRzOntcclxuICAgICAgICAgICAgRm9ybUlucHV0XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG48L3NjcmlwdD5cclxuIiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgX3ZtID0gdGhpc1xuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gIHJldHVybiBfYyhcImRpdlwiLCBbXG4gICAgX2MoXCJkaXZcIiwgW1xuICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJtb2RhbC1ib2R5XCIgfSwgW1xuICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcInJvd1wiIH0sIFtcbiAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImNvbC1zbS00IG5vLXByIGQtZmxleFwiIH0sIFtcbiAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICBcInVsXCIsXG4gICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwibmF2XCIgfSxcbiAgICAgICAgICAgICAgX3ZtLl9sKF92bS50YWJzLCBmdW5jdGlvbih0YWIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gX2MoXG4gICAgICAgICAgICAgICAgICBcImxpXCIsXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGtleTogdGFiLnNsdWcsXG4gICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcIm5hdi1pdGVtXCIsXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzOiB7IGFjdGl2ZTogdGFiLnN0YXRlIH1cbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgIFwiYVwiLFxuICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcIm5hdi1saW5rXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBhdHRyczogeyBocmVmOiBcImphdmFzY3JpcHQ6dm9pZCgwKVwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF92bS5zZWxlY3RUYWIodGFiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl9zKHRhYi5uYW1lKSArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl9tKDAsIHRydWUpXG4gICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgMFxuICAgICAgICAgICAgKVxuICAgICAgICAgIF0pLFxuICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJjb2wtc20tOCBuby1wbFwiIH0sIFtcbiAgICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwidGFiLWNvbnRlbnQgbm8tcGxcIiB9LCBbXG4gICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwidGFiLXBhbmUgcC0zXCIsXG4gICAgICAgICAgICAgICAgICBjbGFzczogeyBhY3RpdmU6IF92bS50YWJzWzBdLnN0YXRlIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgIF9jKFwiRm9ybUlucHV0XCIsIHtcbiAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICBpbnB1dERhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiaW5wdXRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcItCQ0YDRgtC40LrRg9C7XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImVudGl0eS5hcnRpY2xlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogXCLQkNGA0YLQuNC60YPQuyDQtNC10YLQsNC70LggKNC90LUg0LHQvtC70LXQtSA2NCDRgdC40LzQstC+0LvQvtCyKVwiXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICBfYyhcIkZvcm1JbnB1dFwiLCB7XG4gICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgaW5wdXREYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcImlucHV0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCLQndCw0LjQvNC10L3QvtCy0LDQvdC40LVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZW50aXR5Lm5hbWVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBcItCd0LDQuNC80LXQvdC+0LLQsNC90LjQtSAo0L3QtSDQsdC+0LvQtdC1IDI1NSDRgdC40LzQstC+0LvQvtCyKVwiXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICBfYyhcIkZvcm1JbnB1dFwiLCB7XG4gICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgaW5wdXREYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcInNlbGVjdG9yXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCLQkiDQutCw0YLQtdCz0L7RgNC40LhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZW50aXR5LmNhdGVnb3J5Lm5hbWVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s6IFwic2VsZWN0Q2F0ZWdvcnlcIlxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgX2MoXCJGb3JtSW5wdXRcIiwge1xuICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgIGlucHV0RGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJzZWxlY3RvclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwi0J/RgNC+0LjQt9Cy0L7QtNC40YLQtdC70YxcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZW50aXR5LnN1cHBsaWVyLm5hbWVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s6IFwic2VsZWN0U3VwcGxpZXJcIlxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJ0YWItcGFuZVwiLFxuICAgICAgICAgICAgICAgICAgY2xhc3M6IHsgYWN0aXZlOiBfdm0udGFic1sxXS5zdGF0ZSB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBbX3ZtLl9tKDEpLCBfdm0uX3YoXCIgXCIpLCBfdm0uX20oMildXG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwidGFiLXBhbmUgcC0zXCIsXG4gICAgICAgICAgICAgICAgICBjbGFzczogeyBhY3RpdmU6IF92bS50YWJzWzJdLnN0YXRlIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgIF92bS5zaG9wX2FjdGl2YXRlZFxuICAgICAgICAgICAgICAgICAgICA/IF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmOiBcInRhYm1haW5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljU3R5bGU6IHsgaGVpZ2h0OiBcIjMxMHB4XCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgaWQ6IFwidGFiX21haW5cIiwgXCJkYXRhLXNpbXBsZWJhclwiOiBcIlwiIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJjb250ZW50ZWQgbWItMTBcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiRm9ybUlucHV0XCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnB1dERhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiY2hlY2tib3hcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1iOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcItCf0L7QutCw0LfQsNGC0Ywg0L3QsCDQs9C70LDQstC90L7QuSDRgdGC0YDQsNC90LjRhtC1XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImVudGl0eS5zcF9tYWluXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiY29udGVudGVkIG1iLTEwXCIgfSwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwicmVsYXRpdmVcIiB9LCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsYWJlbFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwidy0xMDAgbWItMCBwb2ludGVyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgZm9yOiBcInNwX3N0b2NrXCIgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbX3ZtLl92KFwi0JDQutGG0LjQvtC90L3Ri9C5INGC0L7QstCw0YBcIildXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxhYmVsXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJhYnNvbHV0ZSBjdXN0b21fY2hlY2tib3hcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNTdHlsZTogeyByaWdodDogXCIwXCIsIHRvcDogXCIzcHhcIiB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcImlucHV0XCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpcmVjdGl2ZXM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibW9kZWxcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByYXdOYW1lOiBcInYtbW9kZWxcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogX3ZtLmVudGl0eS5zcF9zdG9jayxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcImVudGl0eS5zcF9zdG9ja1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJub3RfZGVmYXVsdFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgaWQ6IFwic3Bfc3RvY2tcIiwgdHlwZTogXCJjaGVja2JveFwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb21Qcm9wczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVja2VkOiBBcnJheS5pc0FycmF5KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5lbnRpdHkuc3Bfc3RvY2tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gX3ZtLl9pKF92bS5lbnRpdHkuc3Bfc3RvY2ssIG51bGwpID4gLTFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IF92bS5lbnRpdHkuc3Bfc3RvY2tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciAkJGEgPSBfdm0uZW50aXR5LnNwX3N0b2NrLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCRlbCA9ICRldmVudC50YXJnZXQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkJGMgPSAkJGVsLmNoZWNrZWQgPyB0cnVlIDogZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSgkJGEpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgJCR2ID0gbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCRpID0gX3ZtLl9pKCQkYSwgJCR2KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCQkZWwuY2hlY2tlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkJGkgPCAwICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLiRzZXQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uZW50aXR5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzcF9zdG9ja1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCRhLmNvbmNhdChbJCR2XSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkJGkgPiAtMSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS4kc2V0KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLmVudGl0eSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic3Bfc3RvY2tcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQkYVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc2xpY2UoMCwgJCRpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY29uY2F0KCQkYS5zbGljZSgkJGkgKyAxKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS4kc2V0KF92bS5lbnRpdHksIFwic3Bfc3RvY2tcIiwgJCRjKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJzcGFuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwic3RvY2tzIG1iLTUgbXQtMTBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M6IHsgXCJkLW5vbmVcIjogIV92bS5lbnRpdHkuc3Bfc3RvY2sgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcImZvcm0tZ3JvdXAgZC1mbGV4XCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsYWJlbFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcImNvbC1zbS00IG5vLXBsXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW192bS5fdihcItCm0LXQvdCwXCIpXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJpbnB1dC1ncm91cCBjb2wtc20tOCBuby1wclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcImlucHV0XCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpcmVjdGl2ZXM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibW9kZWxcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByYXdOYW1lOiBcInYtbW9kZWxcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5lbnRpdHkuc3BfZGlzY291bnRfcHJpY2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZW50aXR5LnNwX2Rpc2NvdW50X3ByaWNlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImZvcm0tY29udHJvbCBkaXNjb3VudFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJudW1iZXJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IFwiXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb21Qcm9wczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogX3ZtLmVudGl0eS5zcF9kaXNjb3VudF9wcmljZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0OiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoJGV2ZW50LnRhcmdldC5jb21wb3NpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uJHNldChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5lbnRpdHksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNwX2Rpc2NvdW50X3ByaWNlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkZXZlbnQudGFyZ2V0LnZhbHVlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcImZvcm0tZ3JvdXAgZC1mbGV4XCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsYWJlbFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcImNvbC1zbS00IG5vLXBsXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW192bS5fdihcItCh0LrQuNC00LrQsFwiKV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaW5wdXQtZ3JvdXAgY29sLXNtLTggbm8tcHJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJpbnB1dFwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXJlY3RpdmVzOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm1vZGVsXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmF3TmFtZTogXCJ2LW1vZGVsXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IF92bS5lbnRpdHkuc3BfZGlzY291bnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCJlbnRpdHkuc3BfZGlzY291bnRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZm9ybS1jb250cm9sIGRpc2NvdW50IG1yLTEwXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNTdHlsZTogeyBmbGV4OiBcIjAuNlwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczogeyB0eXBlOiBcIm51bWJlclwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb21Qcm9wczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogX3ZtLmVudGl0eS5zcF9kaXNjb3VudFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0OiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoJGV2ZW50LnRhcmdldC5jb21wb3NpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uJHNldChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5lbnRpdHksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNwX2Rpc2NvdW50XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkZXZlbnQudGFyZ2V0LnZhbHVlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcIlNlbGVjdG9yXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJlbnRpdHkuc3BfZGlzY291bnRfdHlwZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRfdmFsdWU6IDEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudHM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgbmFtZTogXCLQsiDRgNGD0LHQu9GP0YVcIiwgdmFsdWU6IDAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCLQsiDQv9GA0L7RhtC10L3RgtCw0YVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwiZm9ybS1ncm91cCBkLWZsZXhcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxhYmVsXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwiY29sLXNtLTQgbm8tcGxcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbX3ZtLl92KFwi0JjRgtC+0LPQvlwiKV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaW5wdXQtZ3JvdXAgY29sLXNtLTggbm8tcHJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJpbnB1dFwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXJlY3RpdmVzOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm1vZGVsXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmF3TmFtZTogXCJ2LW1vZGVsXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uZW50aXR5LnNwX2Rpc2NvdW50X3RvdGFsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImVudGl0eS5zcF9kaXNjb3VudF90b3RhbFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJmb3JtLWNvbnRyb2xcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwibnVtYmVyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiBcIlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9tUHJvcHM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IF92bS5lbnRpdHkuc3BfZGlzY291bnRfdG90YWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnB1dDogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCRldmVudC50YXJnZXQuY29tcG9zaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLiRzZXQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uZW50aXR5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzcF9kaXNjb3VudF90b3RhbFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJGV2ZW50LnRhcmdldC52YWx1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcIkZvcm1JbnB1dFwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0RGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcImlucHV0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcItCd0LDQuNC80LXQvdC+0LLQsNC90LjQtSDQv9GA0L7QtNGD0LrRgtCwXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZW50aXR5LnNwX25hbWVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFwi0J3QsNC40LzQtdC90L7QstCw0L3QuNC1INC/0YDQvtC00YPQutGC0LBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiZC1mbGV4IG10LTEwXCIgfSwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiZm9ybS1ncm91cFwiIH0sIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiZm9ybS1ncm91cCBtYi0wXCIgfSwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcImxhYmVsXCIsIFtfdm0uX3YoXCLQntGB0L3QvtCy0L3QvtC1INGE0L7RgtC+XCIpXSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJpbWdfdXBsb2FkX2NhdF9jb250YWluZXJcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5sb2FkaW5nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxpc3QtcGxhY2Vob2xkZXIgbWItM1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNTdHlsZTogeyBoZWlnaHQ6IFwiMTAwcHhcIiB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW192bS5fbSgzKV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogX3ZtLl9lKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIV92bS5sb2FkaW5nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gX2MoXCJpbWdcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiaC0xMDAgdy0xMDAgaW1hZ2VcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IHNyYzogX3ZtLmltYWdlIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IF92bS5fZSgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICFfdm0ubG9hZGluZ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzcGFuXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcInVwbG9hZF9idG5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3ZtLnVwbG9hZENsaWNrKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbX3ZtLl92KFwi0JfQsNCz0YDRg9C30LjRgtGMXCIpXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBfdm0uX2UoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiZmxleC0zIG1sLTE1XCIgfSwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJsYWJlbFwiLCBbX3ZtLl92KFwi0J7Qv9C40YHQsNC90LjQtSDQv9GA0L7QtNGD0LrRgtCwXCIpXSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJ0ZXh0YXJlYVwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpcmVjdGl2ZXM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm1vZGVsXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByYXdOYW1lOiBcInYtbW9kZWxcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBfdm0uZW50aXR5LnNwX2Rlc2MsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcImVudGl0eS5zcF9kZXNjXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZm9ybS1jb250cm9sIHAtNSByZXNpemUtbm9uZSBib3JkZXItcmFkaXVzLW5vbmVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljU3R5bGU6IHsgaGVpZ2h0OiBcIjk0cHhcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczogeyBwbGFjZWhvbGRlcjogXCLQktCy0LXQtNC40YLQtSDQvtC/0LjRgdCw0L3QuNC1XCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9tUHJvcHM6IHsgdmFsdWU6IF92bS5lbnRpdHkuc3BfZGVzYyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0OiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkZXZlbnQudGFyZ2V0LmNvbXBvc2luZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS4kc2V0KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uZW50aXR5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNwX2Rlc2NcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJGV2ZW50LnRhcmdldC52YWx1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcImZvcm0tZ3JvdXBcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwibGFiZWxcIiwgW192bS5fdihcItCl0LDRgNCw0LrRgtC10YDQuNGB0YLQuNC60LhcIildKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJmbG9hdC1yaWdodFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IGhyZWY6IFwiamF2YXNjcmlwdDp2b2lkKDApXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3ZtLmFkZFNwZWNpZmljYXRpb24oKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW192bS5fdihcItCU0L7QsdCw0LLQuNGC0YxcIildXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fbChfdm0uZW50aXR5LnNwZWNpZmljYXRpb25zLCBmdW5jdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BlY2lmaWNhdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwic3BlY2lmaWNhdGlvbnNcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiZWxlbWVudCBjb3B5IGQtZmxleCBtYi0xMFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX20oNCwgdHJ1ZSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcIm1sLTE1IGZsZXgtMVwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiaW5wdXRcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpcmVjdGl2ZXM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJtb2RlbFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByYXdOYW1lOiBcInYtbW9kZWxcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHNwZWNpZmljYXRpb24ubGFiZWwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzcGVjaWZpY2F0aW9uLmxhYmVsXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImZvcm0tY29udHJvbFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBcItCS0Y/Qt9C60L7RgdGC0YxcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9tUHJvcHM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBzcGVjaWZpY2F0aW9uLmxhYmVsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQ6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoJGV2ZW50LnRhcmdldC5jb21wb3NpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uJHNldChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcGVjaWZpY2F0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGFiZWxcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkZXZlbnQudGFyZ2V0LnZhbHVlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcImlucHV0XCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXJlY3RpdmVzOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibW9kZWxcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmF3TmFtZTogXCJ2LW1vZGVsXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBzcGVjaWZpY2F0aW9uLnZhbHVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic3BlY2lmaWNhdGlvbi52YWx1ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJmb3JtLWNvbnRyb2wgbXQtNVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBcIjVXNDBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9tUHJvcHM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBzcGVjaWZpY2F0aW9uLnZhbHVlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQ6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoJGV2ZW50LnRhcmdldC5jb21wb3NpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uJHNldChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcGVjaWZpY2F0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkZXZlbnQudGFyZ2V0LnZhbHVlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiZGl2XCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcInJlbW92ZSBwb2ludGVyIG1sLTEwXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgMlxuICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgOiBfdm0uX2UoKSxcbiAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAhX3ZtLnNob3BfYWN0aXZhdGVkXG4gICAgICAgICAgICAgICAgICAgID8gX2MoXCJkaXZcIiwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwi0JDQutGC0LjQstC40YDRg9C50YLQtSDQuNC90YLQtdGA0L3QtdGCLdC80LDQs9Cw0LfQuNC9INCyIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcImFcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJhamF4LW5hdlwiLCBhdHRyczogeyBocmVmOiBcIiNcIiB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFtfdm0uX3YoXCLQvdCw0YHRgtGA0L7QudC60LDRhVwiKV1cbiAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICAgOiBfdm0uX2UoKSxcbiAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAhX3ZtLnNob3BfYWN0aXZhdGVkXG4gICAgICAgICAgICAgICAgICAgID8gX2MoXCJkaXZcIiwgW192bS5fdihcItCt0YLQviDQsdC10YHQv9C70LDRgtC90L4uXCIpXSlcbiAgICAgICAgICAgICAgICAgICAgOiBfdm0uX2UoKVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJ0YWItcGFuZSBwLTNcIixcbiAgICAgICAgICAgICAgICAgIGNsYXNzOiB7IGFjdGl2ZTogX3ZtLnRhYnNbM10uc3RhdGUgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgX2MoXCJGb3JtSW5wdXRcIiwge1xuICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgIGlucHV0RGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJpbnB1dFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwi0KjRgtGA0LjRhS3QutC+0LQg0L/RgNC+0LjQt9Cy0L7QtNC40YLQtdC70Y8gKEVBTiAxMylcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZW50aXR5LmJhcmNvZGVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2VzOiBfdm0ubWVzc2FnZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogXCLQqNGC0YDQuNGF0LrQvtC0XCJcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgIF9jKFwiRm9ybUlucHV0XCIsIHtcbiAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICBpbnB1dERhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiaW5wdXRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcItCS0L3Rg9GC0YDQtdC90L3QuNC5INGI0YLRgNC40YUt0LrQvtC0IChFQU4gMTMpXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImVudGl0eS5iYXJjb2RlX2xvY2FsXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlczogX3ZtLm1lc3NhZ2VzLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFwi0KjRgtGA0LjRhdC60L7QtCDRgdC60LvQsNC00LBcIlxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgXSlcbiAgICAgICAgICBdKVxuICAgICAgICBdKVxuICAgICAgXSksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJtb2RhbC1mb290ZXJcIiB9LCBbXG4gICAgICAgIF9jKFxuICAgICAgICAgIFwiYnV0dG9uXCIsXG4gICAgICAgICAge1xuICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiYnV0dG9uIHdoaXRlXCIsXG4gICAgICAgICAgICBhdHRyczogeyB0eXBlOiBcInN1Ym1pdFwiIH0sXG4gICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF92bS4kcGFyZW50LmNsb3NlRGlhbG9nKF92bS5kaWFsb2cpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIFtfdm0uX3YoXCLQl9Cw0LrRgNGL0YLRjFwiKV1cbiAgICAgICAgKSxcbiAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgX2MoXG4gICAgICAgICAgXCJidXR0b25cIixcbiAgICAgICAgICB7XG4gICAgICAgICAgICBzdGF0aWNDbGFzczogXCJidXR0b24gcHJpbWFyeSBwdWxsLXJpZ2h0XCIsXG4gICAgICAgICAgICBhdHRyczogeyB0eXBlOiBcInN1Ym1pdFwiIH0sXG4gICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF92bS5zYXZlKClcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgW192bS5fdihcItCh0L7RhdGA0LDQvdC40YLRjFwiKV1cbiAgICAgICAgKVxuICAgICAgXSksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJzeXN0ZW1fbWVzc2FnZVwiIH0pXG4gICAgXSlcbiAgXSlcbn1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXG4gIGZ1bmN0aW9uKCkge1xuICAgIHZhciBfdm0gPSB0aGlzXG4gICAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gICAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gICAgcmV0dXJuIF9jKFwic3BhblwiLCB7IHN0YXRpY0NsYXNzOiBcImZsb2F0LXJpZ2h0IGhlbHBlcl9kYW5nZXIgZC1ub25lLWZcIiB9LCBbXG4gICAgICBfYyhcImlcIiwge1xuICAgICAgICBzdGF0aWNDbGFzczogXCJmYSBmYS1leGNsYW1hdGlvbi10cmlhbmdsZSB0ZXh0LW1kIG1sLTIgdGV4dC1kYW5nZXJcIlxuICAgICAgfSlcbiAgICBdKVxuICB9LFxuICBmdW5jdGlvbigpIHtcbiAgICB2YXIgX3ZtID0gdGhpc1xuICAgIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICAgIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICAgIHJldHVybiBfYyhcInRhYmxlXCIsIHsgc3RhdGljQ2xhc3M6IFwidGFibGUgdy0xMDBcIiB9LCBbXG4gICAgICBfYyhcInRoZWFkXCIsIFtcbiAgICAgICAgX2MoXCJ0clwiLCBbXG4gICAgICAgICAgX2MoXCJ0aFwiLCBbX3ZtLl92KFwi0KHQutC70LDQtFwiKV0pLFxuICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgX2MoXCJ0aFwiLCBbX3ZtLl92KFwi0JrQvtC70LjRh9C10YHRgtCy0L5cIildKSxcbiAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgIF9jKFwidGhcIiwgW192bS5fdihcItCl0YDQsNC90LXQvdC40LVcIildKVxuICAgICAgICBdKVxuICAgICAgXSksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX2MoXCJ0Ym9keVwiLCBbXG4gICAgICAgIF9jKFwidHJcIiwgW1xuICAgICAgICAgIF9jKFwidGRcIiwgW1xuICAgICAgICAgICAgX3ZtLl92KFxuICAgICAgICAgICAgICBcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICDQnNCw0LPQsNC30LjQvVxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICApXG4gICAgICAgICAgXSksXG4gICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICBfYyhcInRkXCIsIFtcbiAgICAgICAgICAgIF92bS5fdihcbiAgICAgICAgICAgICAgXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICApXG4gICAgICAgICAgXSksXG4gICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICBfYyhcInRkXCIsIFtcbiAgICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwic3RvcmFnZV9zdG9yZV9jb250YWluZXJcIiB9LCBbXG4gICAgICAgICAgICAgIF9jKFwiaW5wdXRcIiwge1xuICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcInN0b3JhZ2Vfc3RvcmUgYmJfMVwiLFxuICAgICAgICAgICAgICAgIGF0dHJzOiB7IHZhbHVlOiBcIiBcIiwgdHlwZTogXCJ0ZXh0XCIgfVxuICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgX2MoXCJpbnB1dFwiLCB7XG4gICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwic3RvcmFnZV9zdG9yZSBiYl8yXCIsXG4gICAgICAgICAgICAgICAgYXR0cnM6IHsgdmFsdWU6IFwiIFwiLCB0eXBlOiBcInRleHRcIiB9XG4gICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICBfYyhcImlucHV0XCIsIHtcbiAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJzdG9yYWdlX3N0b3JlIGJiXzNcIixcbiAgICAgICAgICAgICAgICBhdHRyczogeyB2YWx1ZTogXCIgXCIsIHR5cGU6IFwidGV4dFwiIH1cbiAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgIF9jKFwiaW5wdXRcIiwge1xuICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcInN0b3JhZ2Vfc3RvcmUgYmJfNFwiLFxuICAgICAgICAgICAgICAgIGF0dHJzOiB7IHZhbHVlOiBcIiBcIiwgdHlwZTogXCJ0ZXh0XCIgfVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgXSlcbiAgICAgICAgICBdKVxuICAgICAgICBdKVxuICAgICAgXSlcbiAgICBdKVxuICB9LFxuICBmdW5jdGlvbigpIHtcbiAgICB2YXIgX3ZtID0gdGhpc1xuICAgIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICAgIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICAgIHJldHVybiBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImJveCBtdC0xMFwiIH0sIFtcbiAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiYmJfZmFxIGZhcV8xXCIgfSwgW192bS5fdihcItCX0L7QvdCwINGF0YDQsNC90LXQvdC40Y9cIildKSxcbiAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImJiX2ZhcSBmYXFfMlwiIH0sIFtfdm0uX3YoXCLQndC+0LzQtdGAINGB0YLQtdC70LvQsNC20LBcIildKSxcbiAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImJiX2ZhcSBmYXFfM1wiIH0sIFtcbiAgICAgICAgX3ZtLl92KFwi0J3QvtC80LXRgCDQstC10YDRgtC40LrQsNC70YzQvdC+0Lkg0YHQtdC60YbQuNC4INGB0YLQtdC70LvQsNC20LBcIilcbiAgICAgIF0pLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiYmJfZmFxIGZhcV80XCIgfSwgW192bS5fdihcItCd0L7QvNC10YAg0L/QvtC70LrQuFwiKV0pXG4gICAgXSlcbiAgfSxcbiAgZnVuY3Rpb24oKSB7XG4gICAgdmFyIF92bSA9IHRoaXNcbiAgICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgICByZXR1cm4gX2MoXG4gICAgICBcImRpdlwiLFxuICAgICAge1xuICAgICAgICBzdGF0aWNDbGFzczogXCJsaXN0LXBsYWNlaG9sZGVyX2l0ZW1cIixcbiAgICAgICAgc3RhdGljU3R5bGU6IHsgaGVpZ2h0OiBcIjEwMHB4XCIgfVxuICAgICAgfSxcbiAgICAgIFtcbiAgICAgICAgX2MoXCJkaXZcIiwge1xuICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImxpc3QtcGxhY2Vob2xkZXJfY2VsbFwiLFxuICAgICAgICAgIHN0YXRpY1N0eWxlOiB7IHdpZHRoOiBcIjEwMCVcIiB9XG4gICAgICAgIH0pXG4gICAgICBdXG4gICAgKVxuICB9LFxuICBmdW5jdGlvbigpIHtcbiAgICB2YXIgX3ZtID0gdGhpc1xuICAgIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICAgIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICAgIHJldHVybiBfYyhcImRpdlwiLCBbXG4gICAgICBfYyhcInNwYW5cIiwgW192bS5fdihcItCd0LDQuNC80LXQvdC+0LLQsNC90LjQtVwiKV0pLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF9jKFwic3BhblwiLCB7IHN0YXRpY0NsYXNzOiBcIm10LTVcIiB9LCBbX3ZtLl92KFwi0JfQvdCw0YfQtdC90LjQtVwiKV0pXG4gICAgXSlcbiAgfVxuXVxucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5cbmV4cG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0iLCJsZXQgY2F0ZWdvcnlNaXhpbiA9IHtcclxuICAgIG1ldGhvZHM6IHtcclxuICAgICAgICBzZXRDYXRlZ29yeShjYXRlZ29yeSl7XHJcbiAgICAgICAgICAgIHRoaXMuZW50aXR5LmNhdGVnb3J5LmlkID0gY2F0ZWdvcnkuaWQ7XHJcbiAgICAgICAgICAgIHRoaXMuZW50aXR5LmNhdGVnb3J5Lm5hbWUgPSBjYXRlZ29yeS5uYW1lO1xyXG4gICAgICAgICAgICB0aGlzLiRub3RpZnkoe1xyXG4gICAgICAgICAgICAgICAgZ3JvdXA6ICdtYWluJyxcclxuICAgICAgICAgICAgICAgIHR5cGU6ICdzdWNjZXNzJyxcclxuICAgICAgICAgICAgICAgIHRleHQ6ICfQmtCw0YLQtdCz0L7RgNC40Y8g0LLRi9Cx0YDQsNC90LAnXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2VsZWN0Q2F0ZWdvcnkoKXtcclxuICAgICAgICAgICAgdGhpcy4kZXZlbnRCdXMuJGVtaXQoJ29wZW5EaWFsb2cnLCB7XHJcbiAgICAgICAgICAgICAgICB0YWc6ICdzZWxlY3RDYXRlZ29yeScsXHJcbiAgICAgICAgICAgICAgICBwYXJhbXM6IHtyb290X2NhdGVnb3J5OnRoaXMucm9vdF9jYXRlZ29yeSwgcmVmOiB0aGlzfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGdldFBhcmVudENhdGVnb3J5KCl7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IHRydWU7XHJcbiAgICAgICAgICAgIHdpbmRvdy5heGlvcyh7XHJcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdnZXQnLFxyXG4gICAgICAgICAgICAgICAgdXJsOiAnL2NhdGVnb3JpZXMvJyArIHRoaXMuZW50aXR5LmNhdGVnb3J5LmlkLFxyXG4gICAgICAgICAgICB9KS50aGVuKChyZXNwKSA9PiAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lbnRpdHkuY2F0ZWdvcnkuaWQgPSByZXNwLmRhdGEuaWQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVudGl0eS5jYXRlZ29yeS5uYW1lID0gcmVzcC5kYXRhLm5hbWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuICAgIH1cclxufTtcclxuZXhwb3J0IGRlZmF1bHQgY2F0ZWdvcnlNaXhpbjtcclxuIiwibGV0IHN1cHBsaWVyTWl4aW4gPSB7XHJcbiAgICBtZXRob2RzOiB7XHJcbiAgICAgICAgc2V0U3VwcGxpZXIoc3VwcGxpZXIpe1xyXG4gICAgICAgICAgICB0aGlzLmVudGl0eS5zdXBwbGllci5pZCA9IHN1cHBsaWVyLmlkO1xyXG4gICAgICAgICAgICB0aGlzLmVudGl0eS5zdXBwbGllci5uYW1lID0gc3VwcGxpZXIubmFtZTtcclxuICAgICAgICAgICAgdGhpcy4kbm90aWZ5KHtcclxuICAgICAgICAgICAgICAgIGdyb3VwOiAnbWFpbicsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiAnc3VjY2VzcycsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiAn0J/RgNC+0LjQt9Cy0L7QtNC40YLQtdC70Ywg0LLRi9Cx0YDQsNC9J1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNlbGVjdFN1cHBsaWVyKCl7XHJcbiAgICAgICAgICAgIHRoaXMuJGV2ZW50QnVzLiRlbWl0KCdvcGVuRGlhbG9nJywge1xyXG4gICAgICAgICAgICAgICAgdGFnOiAnc2VsZWN0U3VwcGxpZXInLFxyXG4gICAgICAgICAgICAgICAgcGFyYW1zOiB7cmVmOiB0aGlzfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG4gICAgfVxyXG59O1xyXG5leHBvcnQgZGVmYXVsdCBzdXBwbGllck1peGluO1xyXG4iLCJpbXBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IGZyb20gXCIuL1Byb2R1Y3REaWFsb2cudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTE5MDk1MjI5JlwiXG5pbXBvcnQgc2NyaXB0IGZyb20gXCIuL1Byb2R1Y3REaWFsb2cudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5leHBvcnQgKiBmcm9tIFwiLi9Qcm9kdWN0RGlhbG9nLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuXG5cbi8qIG5vcm1hbGl6ZSBjb21wb25lbnQgKi9cbmltcG9ydCBub3JtYWxpemVyIGZyb20gXCIhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3J1bnRpbWUvY29tcG9uZW50Tm9ybWFsaXplci5qc1wiXG52YXIgY29tcG9uZW50ID0gbm9ybWFsaXplcihcbiAgc2NyaXB0LFxuICByZW5kZXIsXG4gIHN0YXRpY1JlbmRlckZucyxcbiAgZmFsc2UsXG4gIG51bGwsXG4gIG51bGwsXG4gIG51bGxcbiAgXG4pXG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7XG4gIHZhciBhcGkgPSByZXF1aXJlKFwiQzpcXFxcT3BlblNlcnZlclxcXFxkb21haW5zXFxcXEF1dG9DUk1cXFxcbm9kZV9tb2R1bGVzXFxcXHZ1ZS1ob3QtcmVsb2FkLWFwaVxcXFxkaXN0XFxcXGluZGV4LmpzXCIpXG4gIGFwaS5pbnN0YWxsKHJlcXVpcmUoJ3Z1ZScpKVxuICBpZiAoYXBpLmNvbXBhdGlibGUpIHtcbiAgICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gICAgaWYgKCFhcGkuaXNSZWNvcmRlZCgnMTkwOTUyMjknKSkge1xuICAgICAgYXBpLmNyZWF0ZVJlY29yZCgnMTkwOTUyMjknLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbG9hZCgnMTkwOTUyMjknLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIuL1Byb2R1Y3REaWFsb2cudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTE5MDk1MjI5JlwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICBhcGkucmVyZW5kZXIoJzE5MDk1MjI5Jywge1xuICAgICAgICByZW5kZXI6IHJlbmRlcixcbiAgICAgICAgc3RhdGljUmVuZGVyRm5zOiBzdGF0aWNSZW5kZXJGbnNcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxufVxuY29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJyZXNvdXJjZXMvanMvY29tcG9uZW50cy90ZW1wbGF0ZS9EaWFsb2dzL1Byb2R1Y3REaWFsb2cudnVlXCJcbmV4cG9ydCBkZWZhdWx0IGNvbXBvbmVudC5leHBvcnRzIiwiaW1wb3J0IG1vZCBmcm9tIFwiLSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS00LTAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9Qcm9kdWN0RGlhbG9nLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIjsgZXhwb3J0IGRlZmF1bHQgbW9kOyBleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS00LTAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9Qcm9kdWN0RGlhbG9nLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIiIsImV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3RlbXBsYXRlTG9hZGVyLmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9Qcm9kdWN0RGlhbG9nLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD0xOTA5NTIyOSZcIiJdLCJzb3VyY2VSb290IjoiIn0=