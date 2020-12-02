(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["Base"],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/template/Categories.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/template/Categories.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************/
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
  name: "Categories",
  props: ['category', 'root_category'],
  data: function data() {
    return {
      name: null,
      id: null,
      parent_id: null,
      only_name: true,
      categories: {},
      context_opened: false,
      context_style: {},
      contexted_category: null
    };
  },
  watch: {
    $route: function $route(to, from) {
      this.setRootCategory();
      this.getCategories();
    }
  },
  mounted: function mounted() {
    var _this = this;

    this.$eventBus.$on('CategoryUpdated', function (data) {
      _this.$notify({
        group: 'main',
        title: 'Система',
        text: 'Категория обновлена'
      });

      _this.setRootCategory(true);

      _this.getCategories(true);
    });
    this.$eventBus.$on('CategoryDeleted', function () {
      _this.$notify({
        group: 'main',
        title: 'Система',
        text: 'Категория удалена'
      });

      _this.setRootCategory(true);

      _this.getCategories(true);
    });
    this.setRootCategory();
    this.getCategories();
    document.addEventListener('click', this.closeContext);
  },
  computed: {
    // parent_id(){
    //     return this.parent_id ? this.parent_id : this.root_category;
    // },
    loading: function loading() {
      return this.$parent.loading;
    },
    category_id: function category_id() {
      return this.$route.params.category_id === 'all' || parseInt(this.$route.params.category_id) <= parseInt(this.root_category) ? this.root_category : this.$route.params.category_id;
    }
  },
  methods: {
    isSelected: function isSelected(id) {
      return id === this.contexted_category && this.context_opened;
    },
    isOnlyName: function isOnlyName() {
      this.only_name = parseInt(this.category_id) <= parseInt(this.root_category);
    },
    setRootCategory: function setRootCategory() {
      var _this2 = this;

      var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      if (!force) this.$parent.category_loading = true;
      window.axios({
        method: 'get',
        url: '/categories/' + this.category_id
      }).then(function (resp) {
        _this2.name = resp.data.name;
        _this2.parent_id = resp.data.category_id;

        _this2.isOnlyName();

        _this2.$parent.category_loading = false;
      });
    },
    getCategories: function getCategories() {
      var _this3 = this;

      var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      if (!force) this.$parent.categories_loading = true;
      window.axios({
        method: 'get',
        url: '/categories/' + this.category_id + '/children'
      }).then(function (resp) {
        _this3.categories = resp.data;
        _this3.$parent.categories_loading = false;
      });
    },
    openContext: function openContext(event, id) {
      event.preventDefault();
      this.contexted_category = id;
      this.context_opened = true;
      var ofsetter = this.$refs.ofsetter_cat;

      if (ofsetter) {
        var contextY = event.clientY - ofsetter.getBoundingClientRect().top + window.scrollY;

        if (event.clientY + this.$refs.contextt.offsetHeight + 100 >= window.innerHeight) {
          contextY -= this.$refs.contextt.offsetHeight;
        }

        this.context_style = {
          top: contextY + 'px',
          left: event.clientX - ofsetter.getBoundingClientRect().left + window.scrollX + 'px'
        };
      }
    },
    closeContext: function closeContext(e) {
      this.context_opened = false;
      this.context_style = {
        top: '-1200px',
        left: '-1200px'
      };
    },
    editCategory: function editCategory() {
      this.$eventBus.$emit('openDialog', {
        tag: 'category',
        params: {
          root_category: this.root_category,
          id: this.contexted_category
        }
      });
    },
    removeCategory: function removeCategory() {
      var _this4 = this;

      this.$confirm({
        title: 'Внимание!',
        message: 'Действие необратимо. Все вложенные товары переместятся в категорию "Несортированные".',
        button: {
          no: 'Закрыть',
          yes: 'Удалить'
        },
        callback: function callback(confirm) {
          if (confirm) {
            window.axios({
              method: 'delete',
              url: '/categories/' + _this4.contexted_category
            }).then(function (resp) {
              _this4.$eventBus.$emit('CategoryDeleted');
            });
          }
        }
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/Store/Base.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/views/Store/Base.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _template_Categories__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../template/Categories */ "./resources/js/components/template/Categories.vue");
/* harmony import */ var _service_Table__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../service/Table */ "./resources/js/components/service/Table.vue");
/* harmony import */ var _debounce__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../../../debounce */ "./resources/js/debounce.js");
/* harmony import */ var _debounce__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_debounce__WEBPACK_IMPORTED_MODULE_2__);
//
//
//
//
//
//
//
//
//
//
//
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
  name: "Base",
  components: {
    Table: _service_Table__WEBPACK_IMPORTED_MODULE_1__["default"],
    Categories: _template_Categories__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  data: function data() {
    return {
      table_data: {},
      root_category: 2,
      category: null,
      search: '',
      categories: null,
      table_loading: false,
      category_loading: false,
      categories_loading: false
    };
  },
  beforeMount: function beforeMount() {
    var _this = this;

    this.table_data.header = [{
      min_width: 90,
      width: 90,
      name: 'ID',
      table_name: 'id'
    }, {
      min_width: 100,
      width: 'auto',
      name: 'Наименование',
      table_name: 'name'
    }, {
      min_width: 150,
      width: 200,
      name: 'Артикул',
      table_name: 'article'
    }, {
      min_width: 150,
      width: 200,
      name: 'Производитель',
      table_name: 'supplier'
    }];
    this.table_data.context_menu = [{
      name: 'Редактировать',
      action: function action(data) {
        alert(12);
      }
    }, {
      name: 'Открыть',
      action: function action(data) {
        openDialog('productDialog', '&product_id=' + data.contexted.id);
      }
    }, {
      name: 'Создать заявку поставщику',
      action: function action(data) {
        openDialog('providerOrderDialog', '&products=' + _this.table.getSelectedIDs());
      }
    }, {
      name: 'Печать ценников',
      action: function action(data) {
        window.openDialog('chequeDialog', '&products=' + _this.table.getSelectedIDs());
      }
    }, {
      name: 'Показать аналоги в наличии',
      action: function action(data) {
        _this.showAnalogues(data);
      }
    }];

    this.table_data.dbl_click = function (id) {
      console.log(id);
    };

    this.table_data.url = '/store/base/table_data';
  },
  computed: {
    loading: function loading() {
      return this.table_loading || this.category_loading || this.categories_loading;
    },
    category_id: function category_id() {
      this.category = this.$route.params.category_id === 'all' ? this.root_category : this.$route.params.category_id;
      return this.category;
    }
  },
  methods: {
    getCategories: function getCategories() {
      var _this2 = this;

      window.axios({
        method: 'get',
        url: '/data/categories/get',
        params: {
          category_id: this.category
        }
      }).then(function (resp) {
        _this2.categories = resp.data;
      });
    },
    newDialog: function newDialog(tag) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      this.$eventBus.$emit('openDialog', {
        tag: tag,
        params: params
      });
    }
  },
  directives: {
    debounce: _debounce__WEBPACK_IMPORTED_MODULE_2___default.a
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/template/Categories.vue?vue&type=template&id=3de91c76&scoped=true&":
/*!**********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/template/Categories.vue?vue&type=template&id=3de91c76&scoped=true& ***!
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
  return _c(
    "div",
    {
      ref: "ofsetter_cat",
      staticClass: "content-menu box w-250",
      attrs: { id: "category-nav" }
    },
    [
      _vm.loading
        ? _c(
            "div",
            {
              staticClass: "list-placeholder",
              staticStyle: { height: "53px" }
            },
            [_vm._m(0)]
          )
        : _vm._e(),
      _vm._v(" "),
      _vm.loading
        ? _c(
            "div",
            { staticClass: "list-placeholder" },
            _vm._l(12, function(elem) {
              return _c(
                "div",
                {
                  key: elem,
                  staticClass: "list-placeholder_item",
                  staticStyle: { height: "31px" }
                },
                [
                  _c("div", {
                    staticClass: "list-placeholder_cell",
                    staticStyle: { width: "100%" }
                  })
                ]
              )
            }),
            0
          )
        : _vm._e(),
      _vm._v(" "),
      !_vm.loading
        ? _c(
            "div",
            {
              ref: "contextt",
              staticClass: "context",
              style: _vm.context_style,
              attrs: { id: "context" }
            },
            [
              _c(
                "div",
                {
                  staticClass: "context_item",
                  on: {
                    click: function($event) {
                      return _vm.editCategory()
                    }
                  }
                },
                [_c("div", { staticClass: "title" }, [_vm._v("Редактировать")])]
              ),
              _vm._v(" "),
              _c(
                "div",
                {
                  staticClass: "context_item",
                  on: {
                    click: function($event) {
                      return _vm.removeCategory()
                    }
                  }
                },
                [_c("div", { staticClass: "title" }, [_vm._v("Удалить")])]
              )
            ]
          )
        : _vm._e(),
      _vm._v(" "),
      !_vm.loading
        ? _c(
            "div",
            { staticClass: "box-header store" },
            [
              _vm.only_name ? _c("div", [_vm._v(_vm._s(_vm.name))]) : _vm._e(),
              _vm._v(" "),
              !_vm.only_name
                ? _c(
                    "router-link",
                    {
                      staticClass: "category-back-button",
                      attrs: {
                        tag: "a",
                        to: {
                          name: "base",
                          params: { category_id: _vm.parent_id }
                        }
                      }
                    },
                    [
                      _c("i", {
                        staticClass: "fa fa-chevron-left",
                        attrs: { "aria-hidden": "true" }
                      }),
                      _vm._v(" "),
                      _c("span", { attrs: { title: "Автокрепеж" } }, [
                        _vm._v(_vm._s(_vm.name))
                      ])
                    ]
                  )
                : _vm._e()
            ],
            1
          )
        : _vm._e(),
      _vm._v(" "),
      _c(
        "div",
        {
          staticClass: "box-content",
          class: { "d-none": _vm.loading },
          staticStyle: { "max-height": "calc(100% - 54px)" },
          attrs: { "data-simplebar": "" }
        },
        [
          _c(
            "ul",
            { staticClass: "nav", attrs: { id: "category-block" } },
            _vm._l(_vm.categories, function(category) {
              return _c(
                "router-link",
                {
                  key: category.id,
                  attrs: {
                    tag: "li",
                    to: { name: "base", params: { category_id: category.id } }
                  }
                },
                [
                  _c(
                    "a",
                    {
                      class: { active: _vm.isSelected(category.id) },
                      attrs: { href: "#" },
                      on: {
                        contextmenu: function($event) {
                          return _vm.openContext($event, category.id)
                        }
                      }
                    },
                    [_vm._v(_vm._s(category.name))]
                  )
                ]
              )
            }),
            1
          )
        ]
      )
    ]
  )
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "div",
      { staticClass: "list-placeholder_item", staticStyle: { height: "53px" } },
      [
        _c("div", {
          staticClass: "list-placeholder_cell",
          staticStyle: { width: "100%" }
        })
      ]
    )
  }
]
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/Store/Base.vue?vue&type=template&id=5e0c180b&scoped=true&":
/*!*******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/views/Store/Base.vue?vue&type=template&id=5e0c180b&scoped=true& ***!
  \*******************************************************************************************************************************************************************************************************************************/
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
  return _c(
    "div",
    { staticClass: "bottom-container" },
    [
      _c("Categories", { attrs: { root_category: _vm.root_category } }),
      _vm._v(" "),
      _c("div", { staticClass: "box-lister" }, [
        _c("div", { staticClass: "d-flex mb-15" }, [
          _c("div", { staticClass: "search-field-container w-100" }, [
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model.lazy",
                  value: _vm.search,
                  expression: "search",
                  modifiers: { lazy: true }
                },
                {
                  name: "debounce",
                  rawName: "v-debounce",
                  value: 450,
                  expression: "450"
                }
              ],
              staticClass: "input w-100",
              attrs: {
                id: "search",
                name: "search",
                placeholder: "Поиск по складу",
                value: "",
                type: "text"
              },
              domProps: { value: _vm.search },
              on: {
                change: function($event) {
                  _vm.search = $event.target.value
                }
              }
            })
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "actions" }, [
            _c(
              "button",
              {
                staticClass: "button primary ml-15",
                attrs: { type: "button" },
                on: {
                  click: function($event) {
                    return _vm.newDialog("category", {
                      root_category: _vm.root_category,
                      selected_category: _vm.category_id
                    })
                  }
                }
              },
              [_vm._v("Новая категория")]
            ),
            _vm._v(" "),
            _c(
              "button",
              {
                staticClass: "button primary ml-15",
                attrs: { type: "button" },
                on: {
                  click: function($event) {
                    return _vm.newDialog("product")
                  }
                }
              },
              [_vm._v("Новый товар")]
            )
          ])
        ]),
        _vm._v(" "),
        _c(
          "div",
          {
            staticClass: "box d-flex",
            staticStyle: { height: "calc(100% - 45px)" }
          },
          [
            _c("Table", {
              attrs: {
                table_data: _vm.table_data,
                search: _vm.search,
                root_id: _vm.root_category
              }
            })
          ],
          1
        )
      ])
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/template/Categories.vue":
/*!*********************************************************!*\
  !*** ./resources/js/components/template/Categories.vue ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Categories_vue_vue_type_template_id_3de91c76_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Categories.vue?vue&type=template&id=3de91c76&scoped=true& */ "./resources/js/components/template/Categories.vue?vue&type=template&id=3de91c76&scoped=true&");
/* harmony import */ var _Categories_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Categories.vue?vue&type=script&lang=js& */ "./resources/js/components/template/Categories.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Categories_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Categories_vue_vue_type_template_id_3de91c76_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Categories_vue_vue_type_template_id_3de91c76_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "3de91c76",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/template/Categories.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/template/Categories.vue?vue&type=script&lang=js&":
/*!**********************************************************************************!*\
  !*** ./resources/js/components/template/Categories.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Categories_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Categories.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/template/Categories.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Categories_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/template/Categories.vue?vue&type=template&id=3de91c76&scoped=true&":
/*!****************************************************************************************************!*\
  !*** ./resources/js/components/template/Categories.vue?vue&type=template&id=3de91c76&scoped=true& ***!
  \****************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Categories_vue_vue_type_template_id_3de91c76_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./Categories.vue?vue&type=template&id=3de91c76&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/template/Categories.vue?vue&type=template&id=3de91c76&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Categories_vue_vue_type_template_id_3de91c76_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Categories_vue_vue_type_template_id_3de91c76_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/views/Store/Base.vue":
/*!******************************************************!*\
  !*** ./resources/js/components/views/Store/Base.vue ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Base_vue_vue_type_template_id_5e0c180b_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Base.vue?vue&type=template&id=5e0c180b&scoped=true& */ "./resources/js/components/views/Store/Base.vue?vue&type=template&id=5e0c180b&scoped=true&");
/* harmony import */ var _Base_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Base.vue?vue&type=script&lang=js& */ "./resources/js/components/views/Store/Base.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Base_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Base_vue_vue_type_template_id_5e0c180b_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Base_vue_vue_type_template_id_5e0c180b_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "5e0c180b",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/views/Store/Base.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/views/Store/Base.vue?vue&type=script&lang=js&":
/*!*******************************************************************************!*\
  !*** ./resources/js/components/views/Store/Base.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Base_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Base.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/Store/Base.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Base_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/views/Store/Base.vue?vue&type=template&id=5e0c180b&scoped=true&":
/*!*************************************************************************************************!*\
  !*** ./resources/js/components/views/Store/Base.vue?vue&type=template&id=5e0c180b&scoped=true& ***!
  \*************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Base_vue_vue_type_template_id_5e0c180b_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Base.vue?vue&type=template&id=5e0c180b&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/views/Store/Base.vue?vue&type=template&id=5e0c180b&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Base_vue_vue_type_template_id_5e0c180b_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Base_vue_vue_type_template_id_5e0c180b_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvdGVtcGxhdGUvQ2F0ZWdvcmllcy52dWUiLCJ3ZWJwYWNrOi8vL3Jlc291cmNlcy9qcy9jb21wb25lbnRzL3ZpZXdzL1N0b3JlL0Jhc2UudnVlIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9qcy9jb21wb25lbnRzL3RlbXBsYXRlL0NhdGVnb3JpZXMudnVlP2M4ZmEiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvdmlld3MvU3RvcmUvQmFzZS52dWU/OTMyMSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvY29tcG9uZW50cy90ZW1wbGF0ZS9DYXRlZ29yaWVzLnZ1ZSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvY29tcG9uZW50cy90ZW1wbGF0ZS9DYXRlZ29yaWVzLnZ1ZT8xZmM1Iiwid2VicGFjazovLy8uL3Jlc291cmNlcy9qcy9jb21wb25lbnRzL3RlbXBsYXRlL0NhdGVnb3JpZXMudnVlPzRkNTMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvdmlld3MvU3RvcmUvQmFzZS52dWUiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvdmlld3MvU3RvcmUvQmFzZS52dWU/Y2I3ZSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvY29tcG9uZW50cy92aWV3cy9TdG9yZS9CYXNlLnZ1ZT80MjM1Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF1Q0E7QUFDQSxvQkFEQTtBQUVBLHNDQUZBO0FBR0E7QUFDQTtBQUNBLGdCQURBO0FBRUEsY0FGQTtBQUdBLHFCQUhBO0FBSUEscUJBSkE7QUFLQSxvQkFMQTtBQU1BLDJCQU5BO0FBT0EsdUJBUEE7QUFRQTtBQVJBO0FBVUEsR0FkQTtBQWVBO0FBQ0EsVUFEQSxrQkFDQSxFQURBLEVB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b0dBQWU7QUFDakI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxJQUFJLEtBQVUsRUFBRSxZQWlCZjtBQUNEO0FBQ2UsZ0Y7Ozs7Ozs7Ozs7OztBQ3RDZjtBQUFBO0FBQUEsd0NBQWdNLENBQWdCLGdQQUFHLEVBQUMsQzs7Ozs7Ozs7Ozs7O0FDQXBOO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSIsImZpbGUiOiJCYXNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiPHRlbXBsYXRlPlxuICAgIDxkaXYgIHJlZj1cIm9mc2V0dGVyX2NhdFwiIGNsYXNzPVwiY29udGVudC1tZW51IGJveCB3LTI1MFwiIGlkPVwiY2F0ZWdvcnktbmF2XCI+XG4gICAgICAgIDxkaXYgdi1pZj1cImxvYWRpbmdcIiBjbGFzcz1cImxpc3QtcGxhY2Vob2xkZXJcIiBzdHlsZT1cImhlaWdodDogNTNweDtcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJsaXN0LXBsYWNlaG9sZGVyX2l0ZW1cIiBzdHlsZT1cImhlaWdodDogNTNweDtcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibGlzdC1wbGFjZWhvbGRlcl9jZWxsXCIgc3R5bGU9XCJ3aWR0aDogMTAwJVwiID48L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiB2LWlmPVwibG9hZGluZ1wiIGNsYXNzPVwibGlzdC1wbGFjZWhvbGRlclwiPlxuICAgICAgICAgICAgPGRpdiB2LWZvcj1cImVsZW0gaW4gMTJcIiB2LWJpbmQ6a2V5PVwiZWxlbVwiIGNsYXNzPVwibGlzdC1wbGFjZWhvbGRlcl9pdGVtXCIgc3R5bGU9XCJoZWlnaHQ6IDMxcHg7XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImxpc3QtcGxhY2Vob2xkZXJfY2VsbFwiIHN0eWxlPVwid2lkdGg6IDEwMCVcIiA+PC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgdi1pZj1cIiFsb2FkaW5nXCIgcmVmPVwiY29udGV4dHRcIiBjbGFzcz1cImNvbnRleHRcIiBpZD1cImNvbnRleHRcIiB2LWJpbmQ6c3R5bGU9XCJjb250ZXh0X3N0eWxlXCI+XG4gICAgICAgICAgICA8ZGl2IHYtb246Y2xpY2s9XCJlZGl0Q2F0ZWdvcnkoKVwiIGNsYXNzPVwiY29udGV4dF9pdGVtXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRpdGxlXCI+0KDQtdC00LDQutGC0LjRgNC+0LLQsNGC0Yw8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiB2LW9uOmNsaWNrPVwicmVtb3ZlQ2F0ZWdvcnkoKVwiIGNsYXNzPVwiY29udGV4dF9pdGVtXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRpdGxlXCI+0KPQtNCw0LvQuNGC0Yw8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiB2LWlmPVwiIWxvYWRpbmdcIiBjbGFzcz1cImJveC1oZWFkZXIgc3RvcmVcIj5cbiAgICAgICAgICAgIDxkaXYgdi1pZj1cIm9ubHlfbmFtZVwiPnt7IG5hbWUgfX08L2Rpdj5cbiAgICAgICAgICAgIDxyb3V0ZXItbGluayBjbGFzcz1cImNhdGVnb3J5LWJhY2stYnV0dG9uXCIgdi1pZj1cIiFvbmx5X25hbWVcIiB0YWc9XCJhXCIgOnRvPVwieyBuYW1lOiAnYmFzZScsIHBhcmFtczogeyBjYXRlZ29yeV9pZDogcGFyZW50X2lkIH19XCI+XG4gICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYSBmYS1jaGV2cm9uLWxlZnRcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+XG4gICAgICAgICAgICAgICAgPHNwYW4gdGl0bGU9XCLQkNCy0YLQvtC60YDQtdC/0LXQtlwiPnt7IG5hbWUgfX08L3NwYW4+XG4gICAgICAgICAgICA8L3JvdXRlci1saW5rPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImJveC1jb250ZW50XCIgdi1iaW5kOmNsYXNzPVwieydkLW5vbmUnIDogbG9hZGluZ31cIiBkYXRhLXNpbXBsZWJhciBzdHlsZT1cIm1heC1oZWlnaHQ6IGNhbGMoMTAwJSAtIDU0cHgpO1wiPlxuICAgICAgICAgICAgPHVsIGNsYXNzPVwibmF2XCIgaWQ9XCJjYXRlZ29yeS1ibG9ja1wiPlxuICAgICAgICAgICAgICAgIDxyb3V0ZXItbGluayB2LWZvcj1cImNhdGVnb3J5IGluIGNhdGVnb3JpZXNcIiB2LWJpbmQ6a2V5PVwiY2F0ZWdvcnkuaWRcIiB0YWc9XCJsaVwiIDp0bz1cInsgbmFtZTogJ2Jhc2UnLCBwYXJhbXM6IHsgY2F0ZWdvcnlfaWQ6IGNhdGVnb3J5LmlkIH19XCI+XG4gICAgICAgICAgICAgICAgICAgIDxhIHYtYmluZDpjbGFzcz1cInsnYWN0aXZlJyA6IGlzU2VsZWN0ZWQoY2F0ZWdvcnkuaWQpfVwiIHYtb246Y29udGV4dG1lbnU9XCJvcGVuQ29udGV4dCgkZXZlbnQsIGNhdGVnb3J5LmlkIClcIiBocmVmPVwiI1wiPnt7IGNhdGVnb3J5Lm5hbWUgfX08L2E+XG4gICAgICAgICAgICAgICAgPC9yb3V0ZXItbGluaz5cbiAgICAgICAgICAgIDwvdWw+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuICAgIGV4cG9ydCBkZWZhdWx0IHtcbiAgICAgICAgbmFtZTogXCJDYXRlZ29yaWVzXCIsXG4gICAgICAgIHByb3BzOlsnY2F0ZWdvcnknLCAncm9vdF9jYXRlZ29yeSddLFxuICAgICAgICBkYXRhOiAoKT0+IHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgbmFtZTogbnVsbCxcbiAgICAgICAgICAgICAgICBpZDogbnVsbCxcbiAgICAgICAgICAgICAgICBwYXJlbnRfaWQ6IG51bGwsXG4gICAgICAgICAgICAgICAgb25seV9uYW1lOiB0cnVlLFxuICAgICAgICAgICAgICAgIGNhdGVnb3JpZXM6e30sXG4gICAgICAgICAgICAgICAgY29udGV4dF9vcGVuZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGNvbnRleHRfc3R5bGU6e30sXG4gICAgICAgICAgICAgICAgY29udGV4dGVkX2NhdGVnb3J5OiBudWxsLFxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB3YXRjaDoge1xuICAgICAgICAgICAgJHJvdXRlKHRvLCBmcm9tKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRSb290Q2F0ZWdvcnkoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmdldENhdGVnb3JpZXMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgbW91bnRlZCgpe1xuICAgICAgICAgICAgdGhpcy4kZXZlbnRCdXMuJG9uKCdDYXRlZ29yeVVwZGF0ZWQnLCAoZGF0YSk9PntcbiAgICAgICAgICAgICAgICB0aGlzLiRub3RpZnkoe1xuICAgICAgICAgICAgICAgICAgICBncm91cDogJ21haW4nLFxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ9Ch0LjRgdGC0LXQvNCwJyxcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ9Ca0LDRgtC10LPQvtGA0LjRjyDQvtCx0L3QvtCy0LvQtdC90LAnXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRSb290Q2F0ZWdvcnkodHJ1ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5nZXRDYXRlZ29yaWVzKHRydWUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLiRldmVudEJ1cy4kb24oJ0NhdGVnb3J5RGVsZXRlZCcsICgpPT57XG4gICAgICAgICAgICAgICAgdGhpcy4kbm90aWZ5KHtcbiAgICAgICAgICAgICAgICAgICAgZ3JvdXA6ICdtYWluJyxcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICfQodC40YHRgtC10LzQsCcsXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICfQmtCw0YLQtdCz0L7RgNC40Y8g0YPQtNCw0LvQtdC90LAnXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRSb290Q2F0ZWdvcnkodHJ1ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5nZXRDYXRlZ29yaWVzKHRydWUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLnNldFJvb3RDYXRlZ29yeSgpO1xuICAgICAgICAgICAgdGhpcy5nZXRDYXRlZ29yaWVzKCk7XG4gICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuY2xvc2VDb250ZXh0KTtcbiAgICAgICAgfSxcbiAgICAgICAgY29tcHV0ZWQ6IHtcbiAgICAgICAgICAgIC8vIHBhcmVudF9pZCgpe1xuICAgICAgICAgICAgLy8gICAgIHJldHVybiB0aGlzLnBhcmVudF9pZCA/IHRoaXMucGFyZW50X2lkIDogdGhpcy5yb290X2NhdGVnb3J5O1xuICAgICAgICAgICAgLy8gfSxcbiAgICAgICAgICAgIGxvYWRpbmcoKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy4kcGFyZW50LmxvYWRpbmc7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY2F0ZWdvcnlfaWQoKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gKHRoaXMuJHJvdXRlLnBhcmFtcy5jYXRlZ29yeV9pZCA9PT0gJ2FsbCcgfHwgcGFyc2VJbnQodGhpcy4kcm91dGUucGFyYW1zLmNhdGVnb3J5X2lkKSA8PSBwYXJzZUludCh0aGlzLnJvb3RfY2F0ZWdvcnkpKSA/IHRoaXMucm9vdF9jYXRlZ29yeSA6IHRoaXMuJHJvdXRlLnBhcmFtcy5jYXRlZ29yeV9pZDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIG1ldGhvZHM6e1xuICAgICAgICAgICAgaXNTZWxlY3RlZChpZCl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChpZCA9PT0gdGhpcy5jb250ZXh0ZWRfY2F0ZWdvcnkpICYmIHRoaXMuY29udGV4dF9vcGVuZWQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaXNPbmx5TmFtZSgpe1xuICAgICAgICAgICAgICAgIHRoaXMub25seV9uYW1lID0gcGFyc2VJbnQodGhpcy5jYXRlZ29yeV9pZCkgPD0gcGFyc2VJbnQodGhpcy5yb290X2NhdGVnb3J5KTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHNldFJvb3RDYXRlZ29yeShmb3JjZSA9IG51bGwpe1xuICAgICAgICAgICAgICAgIGlmKCFmb3JjZSlcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kcGFyZW50LmNhdGVnb3J5X2xvYWRpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHdpbmRvdy5heGlvcyh7XG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZDogJ2dldCcsXG4gICAgICAgICAgICAgICAgICAgIHVybDogJy9jYXRlZ29yaWVzLycgKyB0aGlzLmNhdGVnb3J5X2lkLFxuICAgICAgICAgICAgICAgIH0pLnRoZW4oKHJlc3ApID0+ICB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubmFtZSA9IHJlc3AuZGF0YS5uYW1lO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhcmVudF9pZCA9IHJlc3AuZGF0YS5jYXRlZ29yeV9pZDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc09ubHlOYW1lKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJHBhcmVudC5jYXRlZ29yeV9sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0Q2F0ZWdvcmllcyhmb3JjZSA9IG51bGwpe1xuICAgICAgICAgICAgICAgIGlmKCFmb3JjZSlcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kcGFyZW50LmNhdGVnb3JpZXNfbG9hZGluZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgd2luZG93LmF4aW9zKHtcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiAnZ2V0JyxcbiAgICAgICAgICAgICAgICAgICAgdXJsOiAnL2NhdGVnb3JpZXMvJyArIHRoaXMuY2F0ZWdvcnlfaWQgKyAnL2NoaWxkcmVuJyxcbiAgICAgICAgICAgICAgICB9KS50aGVuKChyZXNwKSA9PiAge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNhdGVnb3JpZXMgPSByZXNwLmRhdGE7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJHBhcmVudC5jYXRlZ29yaWVzX2xvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvcGVuQ29udGV4dChldmVudCwgaWQpe1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0ZWRfY2F0ZWdvcnkgPSBpZDtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHRfb3BlbmVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBsZXQgb2ZzZXR0ZXIgPSB0aGlzLiRyZWZzLm9mc2V0dGVyX2NhdDtcbiAgICAgICAgICAgICAgICBpZihvZnNldHRlcil7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjb250ZXh0WSA9IGV2ZW50LmNsaWVudFkgLSBvZnNldHRlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgKyB3aW5kb3cuc2Nyb2xsWTtcbiAgICAgICAgICAgICAgICAgICAgaWYoZXZlbnQuY2xpZW50WSArIHRoaXMuJHJlZnMuY29udGV4dHQub2Zmc2V0SGVpZ2h0ICsgMTAwID49IHdpbmRvdy5pbm5lckhlaWdodCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0WSAtPSB0aGlzLiRyZWZzLmNvbnRleHR0Lm9mZnNldEhlaWdodDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHRfc3R5bGUgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b3A6IGNvbnRleHRZICsgJ3B4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQ6IGV2ZW50LmNsaWVudFggLSBvZnNldHRlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0ICsgd2luZG93LnNjcm9sbFggKyAncHgnXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNsb3NlQ29udGV4dChlKXtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHRfb3BlbmVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0X3N0eWxlID0ge1xuICAgICAgICAgICAgICAgICAgICB0b3A6ICctMTIwMHB4JyxcbiAgICAgICAgICAgICAgICAgICAgbGVmdDogJy0xMjAwcHgnLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZWRpdENhdGVnb3J5KCl7XG4gICAgICAgICAgICAgICAgdGhpcy4kZXZlbnRCdXMuJGVtaXQoJ29wZW5EaWFsb2cnLCB7XG4gICAgICAgICAgICAgICAgICAgIHRhZzogJ2NhdGVnb3J5JyxcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1zOiB7cm9vdF9jYXRlZ29yeTp0aGlzLnJvb3RfY2F0ZWdvcnksIGlkOiB0aGlzLmNvbnRleHRlZF9jYXRlZ29yeX1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICByZW1vdmVDYXRlZ29yeSgpe1xuXG4gICAgICAgICAgICAgICAgdGhpcy4kY29uZmlybShcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICfQktC90LjQvNCw0L3QuNC1IScsXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiAn0JTQtdC50YHRgtCy0LjQtSDQvdC10L7QsdGA0LDRgtC40LzQvi4g0JLRgdC1INCy0LvQvtC20LXQvdC90YvQtSDRgtC+0LLQsNGA0Ysg0L/QtdGA0LXQvNC10YHRgtGP0YLRgdGPINCyINC60LDRgtC10LPQvtGA0LjRjiBcItCd0LXRgdC+0YDRgtC40YDQvtCy0LDQvdC90YvQtVwiLicsXG4gICAgICAgICAgICAgICAgICAgICAgICBidXR0b246IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBubzogJ9CX0LDQutGA0YvRgtGMJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB5ZXM6ICfQo9C00LDQu9C40YLRjCdcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjazogY29uZmlybSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbmZpcm0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LmF4aW9zKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1ldGhvZDogJ2RlbGV0ZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmw6ICcvY2F0ZWdvcmllcy8nICsgdGhpcy5jb250ZXh0ZWRfY2F0ZWdvcnksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLnRoZW4oKHJlc3ApID0+ICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRldmVudEJ1cy4kZW1pdCgnQ2F0ZWdvcnlEZWxldGVkJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICk7XG5cblxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCI8dGVtcGxhdGU+XG4gICAgPGRpdiBjbGFzcz1cImJvdHRvbS1jb250YWluZXJcIj5cbiAgICAgICAgPENhdGVnb3JpZXMgdi1iaW5kOnJvb3RfY2F0ZWdvcnk9XCJyb290X2NhdGVnb3J5XCIgLz5cbiAgICAgICAgPGRpdiBjbGFzcz1cImJveC1saXN0ZXJcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkLWZsZXggbWItMTVcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic2VhcmNoLWZpZWxkLWNvbnRhaW5lciB3LTEwMFwiPlxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdi1tb2RlbC5sYXp5PVwic2VhcmNoXCIgdi1kZWJvdW5jZT1cIjQ1MFwiIGlkPVwic2VhcmNoXCIgbmFtZT1cInNlYXJjaFwiIHBsYWNlaG9sZGVyPVwi0J/QvtC40YHQuiDQv9C+INGB0LrQu9Cw0LTRg1wiIGNsYXNzPVwiaW5wdXQgdy0xMDBcIiB2YWx1ZT1cIlwiIHR5cGU9XCJ0ZXh0XCI+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFjdGlvbnNcIj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidXR0b24gcHJpbWFyeSBtbC0xNVwiIHYtb246Y2xpY2s9XCJuZXdEaWFsb2coJ2NhdGVnb3J5JywgIHtyb290X2NhdGVnb3J5OnJvb3RfY2F0ZWdvcnksIHNlbGVjdGVkX2NhdGVnb3J5OiBjYXRlZ29yeV9pZCwgfSlcIj7QndC+0LLQsNGPINC60LDRgtC10LPQvtGA0LjRjzwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ1dHRvbiBwcmltYXJ5IG1sLTE1XCIgdi1vbjpjbGljaz1cIm5ld0RpYWxvZygncHJvZHVjdCcpXCI+0J3QvtCy0YvQuSDRgtC+0LLQsNGAPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJib3ggZC1mbGV4XCIgc3R5bGU9XCJoZWlnaHQ6IGNhbGMoMTAwJSAtIDQ1cHgpO1wiPlxuICAgICAgICAgICAgICAgIDxUYWJsZSB2LWJpbmQ6dGFibGVfZGF0YT1cInRhYmxlX2RhdGFcIiB2LWJpbmQ6c2VhcmNoPVwic2VhcmNoXCIgdi1iaW5kOnJvb3RfaWQ9XCJyb290X2NhdGVnb3J5XCIvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbiAgICBpbXBvcnQgQ2F0ZWdvcmllcyBmcm9tIFwiLi8uLi8uLi90ZW1wbGF0ZS9DYXRlZ29yaWVzXCJcbiAgICBpbXBvcnQgVGFibGUgZnJvbSBcIi4uLy4uL3NlcnZpY2UvVGFibGVcIjtcbiAgICBpbXBvcnQgZGVib3VuY2UgZnJvbSAnLi8uLi8uLi8uLi9kZWJvdW5jZSdcbiAgICBleHBvcnQgZGVmYXVsdCB7XG4gICAgICAgIG5hbWU6IFwiQmFzZVwiLFxuICAgICAgICBjb21wb25lbnRzOntcbiAgICAgICAgICAgIFRhYmxlLFxuICAgICAgICAgICAgQ2F0ZWdvcmllc1xuICAgICAgICB9LFxuICAgICAgICBkYXRhOiAoKT0+IHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgdGFibGVfZGF0YTp7fSxcbiAgICAgICAgICAgICAgICByb290X2NhdGVnb3J5OiAyLFxuICAgICAgICAgICAgICAgIGNhdGVnb3J5OiBudWxsLFxuICAgICAgICAgICAgICAgIHNlYXJjaDogJycsXG4gICAgICAgICAgICAgICAgY2F0ZWdvcmllczpudWxsLFxuICAgICAgICAgICAgICAgIHRhYmxlX2xvYWRpbmc6ZmFsc2UsXG4gICAgICAgICAgICAgICAgY2F0ZWdvcnlfbG9hZGluZzpmYWxzZSxcbiAgICAgICAgICAgICAgICBjYXRlZ29yaWVzX2xvYWRpbmc6ZmFsc2UsXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGJlZm9yZU1vdW50KCl7XG4gICAgICAgICAgICB0aGlzLnRhYmxlX2RhdGEuaGVhZGVyID0gW1xuICAgICAgICAgICAgICAgIHttaW5fd2lkdGg6IDkwLCB3aWR0aDogOTAsIG5hbWU6ICdJRCcsdGFibGVfbmFtZTogJ2lkJ30sXG4gICAgICAgICAgICAgICAge21pbl93aWR0aDogMTAwLCB3aWR0aDogJ2F1dG8nLCBuYW1lOiAn0J3QsNC40LzQtdC90L7QstCw0L3QuNC1JywgdGFibGVfbmFtZTogJ25hbWUnfSxcbiAgICAgICAgICAgICAgICB7bWluX3dpZHRoOiAxNTAsIHdpZHRoOiAyMDAsIG5hbWU6ICfQkNGA0YLQuNC60YPQuycsIHRhYmxlX25hbWU6ICdhcnRpY2xlJ30sXG4gICAgICAgICAgICAgICAge21pbl93aWR0aDogMTUwLCB3aWR0aDogMjAwLCBuYW1lOiAn0J/RgNC+0LjQt9Cy0L7QtNC40YLQtdC70YwnLCB0YWJsZV9uYW1lOiAnc3VwcGxpZXInfSxcbiAgICAgICAgICAgIF07XG4gICAgICAgICAgICB0aGlzLnRhYmxlX2RhdGEuY29udGV4dF9tZW51ID0gW1xuICAgICAgICAgICAgICAgIHtuYW1lOifQoNC10LTQsNC60YLQuNGA0L7QstCw0YLRjCcsIGFjdGlvbjogZnVuY3Rpb24oZGF0YSl7YWxlcnQoMTIpfX0sXG4gICAgICAgICAgICAgICAge25hbWU6J9Ce0YLQutGA0YvRgtGMJywgYWN0aW9uOiBmdW5jdGlvbihkYXRhKXtvcGVuRGlhbG9nKCdwcm9kdWN0RGlhbG9nJywgJyZwcm9kdWN0X2lkPScgKyBkYXRhLmNvbnRleHRlZC5pZCl9fSxcbiAgICAgICAgICAgICAgICB7bmFtZTon0KHQvtC30LTQsNGC0Ywg0LfQsNGP0LLQutGDINC/0L7RgdGC0LDQstGJ0LjQutGDJywgYWN0aW9uOiAoZGF0YSkgPT4ge29wZW5EaWFsb2coJ3Byb3ZpZGVyT3JkZXJEaWFsb2cnLCAnJnByb2R1Y3RzPScgKyB0aGlzLnRhYmxlLmdldFNlbGVjdGVkSURzKCkpfX0sXG4gICAgICAgICAgICAgICAge25hbWU6J9Cf0LXRh9Cw0YLRjCDRhtC10L3QvdC40LrQvtCyJywgYWN0aW9uOiAoZGF0YSkgPT4ge3dpbmRvdy5vcGVuRGlhbG9nKCdjaGVxdWVEaWFsb2cnLCAnJnByb2R1Y3RzPScgKyB0aGlzLnRhYmxlLmdldFNlbGVjdGVkSURzKCkpfX0sXG4gICAgICAgICAgICAgICAge25hbWU6J9Cf0L7QutCw0LfQsNGC0Ywg0LDQvdCw0LvQvtCz0Lgg0LIg0L3QsNC70LjRh9C40LgnLCBhY3Rpb246IChkYXRhKSA9PiB7dGhpcy5zaG93QW5hbG9ndWVzKGRhdGEpO319LFxuICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIHRoaXMudGFibGVfZGF0YS5kYmxfY2xpY2sgPSBmdW5jdGlvbihpZCl7Y29uc29sZS5sb2coaWQpfTtcbiAgICAgICAgICAgIHRoaXMudGFibGVfZGF0YS51cmwgPSAnL3N0b3JlL2Jhc2UvdGFibGVfZGF0YSc7XG4gICAgICAgIH0sXG4gICAgICAgIGNvbXB1dGVkOntcbiAgICAgICAgICAgIGxvYWRpbmcoKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy50YWJsZV9sb2FkaW5nIHx8IHRoaXMuY2F0ZWdvcnlfbG9hZGluZyB8fCB0aGlzLmNhdGVnb3JpZXNfbG9hZGluZztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjYXRlZ29yeV9pZCgpe1xuICAgICAgICAgICAgICAgIHRoaXMuY2F0ZWdvcnkgPSAodGhpcy4kcm91dGUucGFyYW1zLmNhdGVnb3J5X2lkID09PSAnYWxsJykgPyB0aGlzLnJvb3RfY2F0ZWdvcnkgOiB0aGlzLiRyb3V0ZS5wYXJhbXMuY2F0ZWdvcnlfaWQ7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2F0ZWdvcnk7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICBtZXRob2RzOntcbiAgICAgICAgICAgIGdldENhdGVnb3JpZXMoKXtcbiAgICAgICAgICAgICAgICB3aW5kb3cuYXhpb3Moe1xuICAgICAgICAgICAgICAgICAgICBtZXRob2Q6ICdnZXQnLFxuICAgICAgICAgICAgICAgICAgICB1cmw6ICcvZGF0YS9jYXRlZ29yaWVzL2dldCcsXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtczoge2NhdGVnb3J5X2lkOiB0aGlzLmNhdGVnb3J5fVxuICAgICAgICAgICAgICAgIH0pLnRoZW4oKHJlc3ApID0+ICB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2F0ZWdvcmllcyA9IHJlc3AuZGF0YTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBuZXdEaWFsb2codGFnLCBwYXJhbXMgPSBudWxsKXtcbiAgICAgICAgICAgICAgICB0aGlzLiRldmVudEJ1cy4kZW1pdCgnb3BlbkRpYWxvZycsIHtcbiAgICAgICAgICAgICAgICAgICAgdGFnOiB0YWcsXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtczogcGFyYW1zXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGRpcmVjdGl2ZXM6IHtkZWJvdW5jZX1cbiAgICB9XG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXG4gICAgXCJkaXZcIixcbiAgICB7XG4gICAgICByZWY6IFwib2ZzZXR0ZXJfY2F0XCIsXG4gICAgICBzdGF0aWNDbGFzczogXCJjb250ZW50LW1lbnUgYm94IHctMjUwXCIsXG4gICAgICBhdHRyczogeyBpZDogXCJjYXRlZ29yeS1uYXZcIiB9XG4gICAgfSxcbiAgICBbXG4gICAgICBfdm0ubG9hZGluZ1xuICAgICAgICA/IF9jKFxuICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwibGlzdC1wbGFjZWhvbGRlclwiLFxuICAgICAgICAgICAgICBzdGF0aWNTdHlsZTogeyBoZWlnaHQ6IFwiNTNweFwiIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBbX3ZtLl9tKDApXVxuICAgICAgICAgIClcbiAgICAgICAgOiBfdm0uX2UoKSxcbiAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICBfdm0ubG9hZGluZ1xuICAgICAgICA/IF9jKFxuICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwibGlzdC1wbGFjZWhvbGRlclwiIH0sXG4gICAgICAgICAgICBfdm0uX2woMTIsIGZ1bmN0aW9uKGVsZW0pIHtcbiAgICAgICAgICAgICAgcmV0dXJuIF9jKFxuICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAga2V5OiBlbGVtLFxuICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwibGlzdC1wbGFjZWhvbGRlcl9pdGVtXCIsXG4gICAgICAgICAgICAgICAgICBzdGF0aWNTdHlsZTogeyBoZWlnaHQ6IFwiMzFweFwiIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgIF9jKFwiZGl2XCIsIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwibGlzdC1wbGFjZWhvbGRlcl9jZWxsXCIsXG4gICAgICAgICAgICAgICAgICAgIHN0YXRpY1N0eWxlOiB7IHdpZHRoOiBcIjEwMCVcIiB9XG4gICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAwXG4gICAgICAgICAgKVxuICAgICAgICA6IF92bS5fZSgpLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICFfdm0ubG9hZGluZ1xuICAgICAgICA/IF9jKFxuICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgcmVmOiBcImNvbnRleHR0XCIsXG4gICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImNvbnRleHRcIixcbiAgICAgICAgICAgICAgc3R5bGU6IF92bS5jb250ZXh0X3N0eWxlLFxuICAgICAgICAgICAgICBhdHRyczogeyBpZDogXCJjb250ZXh0XCIgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJjb250ZXh0X2l0ZW1cIixcbiAgICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3ZtLmVkaXRDYXRlZ29yeSgpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFtfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcInRpdGxlXCIgfSwgW192bS5fdihcItCg0LXQtNCw0LrRgtC40YDQvtCy0LDRgtGMXCIpXSldXG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiY29udGV4dF9pdGVtXCIsXG4gICAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF92bS5yZW1vdmVDYXRlZ29yeSgpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFtfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcInRpdGxlXCIgfSwgW192bS5fdihcItCj0LTQsNC70LjRgtGMXCIpXSldXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIF1cbiAgICAgICAgICApXG4gICAgICAgIDogX3ZtLl9lKCksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgIV92bS5sb2FkaW5nXG4gICAgICAgID8gX2MoXG4gICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJib3gtaGVhZGVyIHN0b3JlXCIgfSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgX3ZtLm9ubHlfbmFtZSA/IF9jKFwiZGl2XCIsIFtfdm0uX3YoX3ZtLl9zKF92bS5uYW1lKSldKSA6IF92bS5fZSgpLFxuICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAhX3ZtLm9ubHlfbmFtZVxuICAgICAgICAgICAgICAgID8gX2MoXG4gICAgICAgICAgICAgICAgICAgIFwicm91dGVyLWxpbmtcIixcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImNhdGVnb3J5LWJhY2stYnV0dG9uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhZzogXCJhXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB0bzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImJhc2VcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1zOiB7IGNhdGVnb3J5X2lkOiBfdm0ucGFyZW50X2lkIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICBfYyhcImlcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiZmEgZmEtY2hldnJvbi1sZWZ0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBhdHRyczogeyBcImFyaWEtaGlkZGVuXCI6IFwidHJ1ZVwiIH1cbiAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgIF9jKFwic3BhblwiLCB7IGF0dHJzOiB7IHRpdGxlOiBcItCQ0LLRgtC+0LrRgNC10L/QtdC2XCIgfSB9LCBbXG4gICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoX3ZtLl9zKF92bS5uYW1lKSlcbiAgICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgOiBfdm0uX2UoKVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIDFcbiAgICAgICAgICApXG4gICAgICAgIDogX3ZtLl9lKCksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX2MoXG4gICAgICAgIFwiZGl2XCIsXG4gICAgICAgIHtcbiAgICAgICAgICBzdGF0aWNDbGFzczogXCJib3gtY29udGVudFwiLFxuICAgICAgICAgIGNsYXNzOiB7IFwiZC1ub25lXCI6IF92bS5sb2FkaW5nIH0sXG4gICAgICAgICAgc3RhdGljU3R5bGU6IHsgXCJtYXgtaGVpZ2h0XCI6IFwiY2FsYygxMDAlIC0gNTRweClcIiB9LFxuICAgICAgICAgIGF0dHJzOiB7IFwiZGF0YS1zaW1wbGViYXJcIjogXCJcIiB9XG4gICAgICAgIH0sXG4gICAgICAgIFtcbiAgICAgICAgICBfYyhcbiAgICAgICAgICAgIFwidWxcIixcbiAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwibmF2XCIsIGF0dHJzOiB7IGlkOiBcImNhdGVnb3J5LWJsb2NrXCIgfSB9LFxuICAgICAgICAgICAgX3ZtLl9sKF92bS5jYXRlZ29yaWVzLCBmdW5jdGlvbihjYXRlZ29yeSkge1xuICAgICAgICAgICAgICByZXR1cm4gX2MoXG4gICAgICAgICAgICAgICAgXCJyb3V0ZXItbGlua1wiLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIGtleTogY2F0ZWdvcnkuaWQsXG4gICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICB0YWc6IFwibGlcIixcbiAgICAgICAgICAgICAgICAgICAgdG86IHsgbmFtZTogXCJiYXNlXCIsIHBhcmFtczogeyBjYXRlZ29yeV9pZDogY2F0ZWdvcnkuaWQgfSB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgXCJhXCIsXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBjbGFzczogeyBhY3RpdmU6IF92bS5pc1NlbGVjdGVkKGNhdGVnb3J5LmlkKSB9LFxuICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IGhyZWY6IFwiI1wiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHRtZW51OiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF92bS5vcGVuQ29udGV4dCgkZXZlbnQsIGNhdGVnb3J5LmlkKVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgW192bS5fdihfdm0uX3MoY2F0ZWdvcnkubmFtZSkpXVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAxXG4gICAgICAgICAgKVxuICAgICAgICBdXG4gICAgICApXG4gICAgXVxuICApXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW1xuICBmdW5jdGlvbigpIHtcbiAgICB2YXIgX3ZtID0gdGhpc1xuICAgIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICAgIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICAgIHJldHVybiBfYyhcbiAgICAgIFwiZGl2XCIsXG4gICAgICB7IHN0YXRpY0NsYXNzOiBcImxpc3QtcGxhY2Vob2xkZXJfaXRlbVwiLCBzdGF0aWNTdHlsZTogeyBoZWlnaHQ6IFwiNTNweFwiIH0gfSxcbiAgICAgIFtcbiAgICAgICAgX2MoXCJkaXZcIiwge1xuICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImxpc3QtcGxhY2Vob2xkZXJfY2VsbFwiLFxuICAgICAgICAgIHN0YXRpY1N0eWxlOiB7IHdpZHRoOiBcIjEwMCVcIiB9XG4gICAgICAgIH0pXG4gICAgICBdXG4gICAgKVxuICB9XG5dXG5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcblxuZXhwb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXG4gICAgXCJkaXZcIixcbiAgICB7IHN0YXRpY0NsYXNzOiBcImJvdHRvbS1jb250YWluZXJcIiB9LFxuICAgIFtcbiAgICAgIF9jKFwiQ2F0ZWdvcmllc1wiLCB7IGF0dHJzOiB7IHJvb3RfY2F0ZWdvcnk6IF92bS5yb290X2NhdGVnb3J5IH0gfSksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJib3gtbGlzdGVyXCIgfSwgW1xuICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImQtZmxleCBtYi0xNVwiIH0sIFtcbiAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcInNlYXJjaC1maWVsZC1jb250YWluZXIgdy0xMDBcIiB9LCBbXG4gICAgICAgICAgICBfYyhcImlucHV0XCIsIHtcbiAgICAgICAgICAgICAgZGlyZWN0aXZlczogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIG5hbWU6IFwibW9kZWxcIixcbiAgICAgICAgICAgICAgICAgIHJhd05hbWU6IFwidi1tb2RlbC5sYXp5XCIsXG4gICAgICAgICAgICAgICAgICB2YWx1ZTogX3ZtLnNlYXJjaCxcbiAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwic2VhcmNoXCIsXG4gICAgICAgICAgICAgICAgICBtb2RpZmllcnM6IHsgbGF6eTogdHJ1ZSB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBuYW1lOiBcImRlYm91bmNlXCIsXG4gICAgICAgICAgICAgICAgICByYXdOYW1lOiBcInYtZGVib3VuY2VcIixcbiAgICAgICAgICAgICAgICAgIHZhbHVlOiA0NTAsXG4gICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcIjQ1MFwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJpbnB1dCB3LTEwMFwiLFxuICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgIGlkOiBcInNlYXJjaFwiLFxuICAgICAgICAgICAgICAgIG5hbWU6IFwic2VhcmNoXCIsXG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFwi0J/QvtC40YHQuiDQv9C+INGB0LrQu9Cw0LTRg1wiLFxuICAgICAgICAgICAgICAgIHZhbHVlOiBcIlwiLFxuICAgICAgICAgICAgICAgIHR5cGU6IFwidGV4dFwiXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIGRvbVByb3BzOiB7IHZhbHVlOiBfdm0uc2VhcmNoIH0sXG4gICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgIF92bS5zZWFyY2ggPSAkZXZlbnQudGFyZ2V0LnZhbHVlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIF0pLFxuICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJhY3Rpb25zXCIgfSwgW1xuICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgIFwiYnV0dG9uXCIsXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJidXR0b24gcHJpbWFyeSBtbC0xNVwiLFxuICAgICAgICAgICAgICAgIGF0dHJzOiB7IHR5cGU6IFwiYnV0dG9uXCIgfSxcbiAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3ZtLm5ld0RpYWxvZyhcImNhdGVnb3J5XCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICByb290X2NhdGVnb3J5OiBfdm0ucm9vdF9jYXRlZ29yeSxcbiAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZF9jYXRlZ29yeTogX3ZtLmNhdGVnb3J5X2lkXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBbX3ZtLl92KFwi0J3QvtCy0LDRjyDQutCw0YLQtdCz0L7RgNC40Y9cIildXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICBcImJ1dHRvblwiLFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiYnV0dG9uIHByaW1hcnkgbWwtMTVcIixcbiAgICAgICAgICAgICAgICBhdHRyczogeyB0eXBlOiBcImJ1dHRvblwiIH0sXG4gICAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF92bS5uZXdEaWFsb2coXCJwcm9kdWN0XCIpXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBbX3ZtLl92KFwi0J3QvtCy0YvQuSDRgtC+0LLQsNGAXCIpXVxuICAgICAgICAgICAgKVxuICAgICAgICAgIF0pXG4gICAgICAgIF0pLFxuICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICBfYyhcbiAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImJveCBkLWZsZXhcIixcbiAgICAgICAgICAgIHN0YXRpY1N0eWxlOiB7IGhlaWdodDogXCJjYWxjKDEwMCUgLSA0NXB4KVwiIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIFtcbiAgICAgICAgICAgIF9jKFwiVGFibGVcIiwge1xuICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgIHRhYmxlX2RhdGE6IF92bS50YWJsZV9kYXRhLFxuICAgICAgICAgICAgICAgIHNlYXJjaDogX3ZtLnNlYXJjaCxcbiAgICAgICAgICAgICAgICByb290X2lkOiBfdm0ucm9vdF9jYXRlZ29yeVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIF0sXG4gICAgICAgICAgMVxuICAgICAgICApXG4gICAgICBdKVxuICAgIF0sXG4gICAgMVxuICApXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxuXG5leHBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IiwiaW1wb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSBmcm9tIFwiLi9DYXRlZ29yaWVzLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD0zZGU5MWM3NiZzY29wZWQ9dHJ1ZSZcIlxuaW1wb3J0IHNjcmlwdCBmcm9tIFwiLi9DYXRlZ29yaWVzLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuZXhwb3J0ICogZnJvbSBcIi4vQ2F0ZWdvcmllcy52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcblxuXG4vKiBub3JtYWxpemUgY29tcG9uZW50ICovXG5pbXBvcnQgbm9ybWFsaXplciBmcm9tIFwiIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9ydW50aW1lL2NvbXBvbmVudE5vcm1hbGl6ZXIuanNcIlxudmFyIGNvbXBvbmVudCA9IG5vcm1hbGl6ZXIoXG4gIHNjcmlwdCxcbiAgcmVuZGVyLFxuICBzdGF0aWNSZW5kZXJGbnMsXG4gIGZhbHNlLFxuICBudWxsLFxuICBcIjNkZTkxYzc2XCIsXG4gIG51bGxcbiAgXG4pXG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7XG4gIHZhciBhcGkgPSByZXF1aXJlKFwiQzpcXFxcT3BlblNlcnZlclxcXFxkb21haW5zXFxcXEF1dG9DUk1cXFxcbm9kZV9tb2R1bGVzXFxcXHZ1ZS1ob3QtcmVsb2FkLWFwaVxcXFxkaXN0XFxcXGluZGV4LmpzXCIpXG4gIGFwaS5pbnN0YWxsKHJlcXVpcmUoJ3Z1ZScpKVxuICBpZiAoYXBpLmNvbXBhdGlibGUpIHtcbiAgICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gICAgaWYgKCFhcGkuaXNSZWNvcmRlZCgnM2RlOTFjNzYnKSkge1xuICAgICAgYXBpLmNyZWF0ZVJlY29yZCgnM2RlOTFjNzYnLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbG9hZCgnM2RlOTFjNzYnLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIuL0NhdGVnb3JpZXMudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTNkZTkxYzc2JnNjb3BlZD10cnVlJlwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICBhcGkucmVyZW5kZXIoJzNkZTkxYzc2Jywge1xuICAgICAgICByZW5kZXI6IHJlbmRlcixcbiAgICAgICAgc3RhdGljUmVuZGVyRm5zOiBzdGF0aWNSZW5kZXJGbnNcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxufVxuY29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJyZXNvdXJjZXMvanMvY29tcG9uZW50cy90ZW1wbGF0ZS9DYXRlZ29yaWVzLnZ1ZVwiXG5leHBvcnQgZGVmYXVsdCBjb21wb25lbnQuZXhwb3J0cyIsImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tNC0wIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vQ2F0ZWdvcmllcy52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tNC0wIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vQ2F0ZWdvcmllcy52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCIiLCJleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy90ZW1wbGF0ZUxvYWRlci5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vQ2F0ZWdvcmllcy52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9M2RlOTFjNzYmc2NvcGVkPXRydWUmXCIiLCJpbXBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IGZyb20gXCIuL0Jhc2UudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTVlMGMxODBiJnNjb3BlZD10cnVlJlwiXG5pbXBvcnQgc2NyaXB0IGZyb20gXCIuL0Jhc2UudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5leHBvcnQgKiBmcm9tIFwiLi9CYXNlLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuXG5cbi8qIG5vcm1hbGl6ZSBjb21wb25lbnQgKi9cbmltcG9ydCBub3JtYWxpemVyIGZyb20gXCIhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3J1bnRpbWUvY29tcG9uZW50Tm9ybWFsaXplci5qc1wiXG52YXIgY29tcG9uZW50ID0gbm9ybWFsaXplcihcbiAgc2NyaXB0LFxuICByZW5kZXIsXG4gIHN0YXRpY1JlbmRlckZucyxcbiAgZmFsc2UsXG4gIG51bGwsXG4gIFwiNWUwYzE4MGJcIixcbiAgbnVsbFxuICBcbilcblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHtcbiAgdmFyIGFwaSA9IHJlcXVpcmUoXCJDOlxcXFxPcGVuU2VydmVyXFxcXGRvbWFpbnNcXFxcQXV0b0NSTVxcXFxub2RlX21vZHVsZXNcXFxcdnVlLWhvdC1yZWxvYWQtYXBpXFxcXGRpc3RcXFxcaW5kZXguanNcIilcbiAgYXBpLmluc3RhbGwocmVxdWlyZSgndnVlJykpXG4gIGlmIChhcGkuY29tcGF0aWJsZSkge1xuICAgIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgICBpZiAoIWFwaS5pc1JlY29yZGVkKCc1ZTBjMTgwYicpKSB7XG4gICAgICBhcGkuY3JlYXRlUmVjb3JkKCc1ZTBjMTgwYicsIGNvbXBvbmVudC5vcHRpb25zKVxuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVsb2FkKCc1ZTBjMTgwYicsIGNvbXBvbmVudC5vcHRpb25zKVxuICAgIH1cbiAgICBtb2R1bGUuaG90LmFjY2VwdChcIi4vQmFzZS52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9NWUwYzE4MGImc2NvcGVkPXRydWUmXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGFwaS5yZXJlbmRlcignNWUwYzE4MGInLCB7XG4gICAgICAgIHJlbmRlcjogcmVuZGVyLFxuICAgICAgICBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZuc1xuICAgICAgfSlcbiAgICB9KVxuICB9XG59XG5jb21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcInJlc291cmNlcy9qcy9jb21wb25lbnRzL3ZpZXdzL1N0b3JlL0Jhc2UudnVlXCJcbmV4cG9ydCBkZWZhdWx0IGNvbXBvbmVudC5leHBvcnRzIiwiaW1wb3J0IG1vZCBmcm9tIFwiLSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS00LTAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9CYXNlLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIjsgZXhwb3J0IGRlZmF1bHQgbW9kOyBleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS00LTAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9CYXNlLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIiIsImV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3RlbXBsYXRlTG9hZGVyLmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9CYXNlLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD01ZTBjMTgwYiZzY29wZWQ9dHJ1ZSZcIiJdLCJzb3VyY2VSb290IjoiIn0=