(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["Register"],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/auth/Auth.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/auth/Auth.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************/
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
  name: "Auth",
  data: function data() {
    return {
      phoneMask: ['+7', '(', /\d/, /\d/, /\d/, ') ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
      loginData: {
        phone: '',
        password: ''
      },
      needSmsConfirm: false,
      registerData: {
        referal: '',
        surname: '',
        name: '',
        patronymic: '',
        phone: '',
        password: '',
        password_confirmation: '',
        sms_code: ''
      },
      formErrors: {}
    };
  },
  watch: {
    registerData: {
      handler: function handler() {
        this.formErrors = {};
      },
      deep: true
    }
  },
  beforeMount: function beforeMount() {},
  mounted: function mounted() {// this.$eventBus.$on('NoAuthEvent', ()=>{
    //     this.showLogin = true;
    // });
  },
  methods: {
    login: function login() {
      var _this = this;

      var data = this.loginData;
      this.$store.dispatch('login', data).then(function () {
        return _this.$router.push('/');
      })["catch"](function (err) {
        return console.log(err);
      });
    },
    register: function register() {
      var _this2 = this;

      this.$store.dispatch('register', this.registerData).then(function () {
        return _this2.$router.push('/');
      })["catch"](function (err) {
        _this2.formErrors = err.response.data.messages;
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/auth/Auth.vue?vue&type=style&index=0&id=29320894&scoped=true&lang=css&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--10-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--10-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/auth/Auth.vue?vue&type=style&index=0&id=29320894&scoped=true&lang=css& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n#auth_form[data-v-29320894]{\n    position: absolute;\n    top: 0;\n    z-index: 10169;\n    width: 100vw;\n    height: 100vh;\n    left: 0;\n    background: #2D76A8;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n}\n#auth_form form[data-v-29320894]{\n    margin: 0 auto;\n}\n.logo[data-v-29320894]{\n    background: url(/images/logo_bb.svg) center no-repeat;\n    height: 50px;\n}\n.action[data-v-29320894]{\n    text-align: center;\n    font-size: 18px;\n    margin-bottom: 15px;\n}\n.auth_butt[data-v-29320894]{\n    background-color: #2d76a8;\n    color: #fff;\n    border: 1px solid #4993c5;\n    border-radius: 3px;\n    margin: 0 auto;\n    display: block;\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/auth/Auth.vue?vue&type=style&index=0&id=29320894&scoped=true&lang=css&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader??ref--10-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--10-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/auth/Auth.vue?vue&type=style&index=0&id=29320894&scoped=true&lang=css& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../node_modules/css-loader??ref--10-1!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--10-2!../../../../node_modules/vue-loader/lib??vue-loader-options!./Auth.vue?vue&type=style&index=0&id=29320894&scoped=true&lang=css& */ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/auth/Auth.vue?vue&type=style&index=0&id=29320894&scoped=true&lang=css&");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/auth/Auth.vue?vue&type=template&id=29320894&scoped=true&":
/*!************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/auth/Auth.vue?vue&type=template&id=29320894&scoped=true& ***!
  \************************************************************************************************************************************************************************************************************************/
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
  return _c("div", { attrs: { id: "auth_form" } }, [
    _c("form", { attrs: { method: "post", action: "/" } }, [
      _c("div", { staticClass: "logo" }),
      _vm._v(" "),
      _c("div", { staticClass: "action text-white" }, [_vm._v("Регистрация")]),
      _vm._v(" "),
      _c("div", { staticClass: "l-r-sided" }, [
        _c("div", { staticClass: "form-group relative" }, [
          _c("div", { staticClass: "d-flex" }, [
            _c("label", { attrs: { for: "" } }, [_vm._v("Фамилия")]),
            _vm._v(" "),
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.registerData.surname,
                  expression: "registerData.surname"
                }
              ],
              staticClass: "form-control",
              class: { "is-invalid": _vm.formErrors.surname },
              attrs: { placeholder: "" },
              domProps: { value: _vm.registerData.surname },
              on: {
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.$set(_vm.registerData, "surname", $event.target.value)
                }
              }
            })
          ]),
          _vm._v(" "),
          _vm.formErrors.surname
            ? _c("div", { staticClass: "invalid-text" }, [
                _c("div", { staticClass: "left arrow" }),
                _vm._v(_vm._s(_vm.formErrors.surname[0]))
              ])
            : _vm._e()
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "form-group relative" }, [
          _c("div", { staticClass: "d-flex" }, [
            _c("label", { attrs: { for: "" } }, [_vm._v("Имя")]),
            _vm._v(" "),
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.registerData.name,
                  expression: "registerData.name"
                }
              ],
              staticClass: "form-control",
              class: { "is-invalid": _vm.formErrors.name },
              attrs: { placeholder: "" },
              domProps: { value: _vm.registerData.name },
              on: {
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.$set(_vm.registerData, "name", $event.target.value)
                }
              }
            })
          ]),
          _vm._v(" "),
          _vm.formErrors.name
            ? _c("div", { staticClass: "invalid-text" }, [
                _c("div", { staticClass: "left arrow" }),
                _vm._v(_vm._s(_vm.formErrors.name[0]))
              ])
            : _vm._e()
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "form-group relative" }, [
          _c("div", { staticClass: "d-flex" }, [
            _c("label", { attrs: { for: "" } }, [_vm._v("Отчество")]),
            _vm._v(" "),
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.registerData.patronymic,
                  expression: "registerData.patronymic"
                }
              ],
              staticClass: "form-control",
              class: { "is-invalid": _vm.formErrors.patronymic },
              attrs: { placeholder: "" },
              domProps: { value: _vm.registerData.patronymic },
              on: {
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.$set(_vm.registerData, "patronymic", $event.target.value)
                }
              }
            })
          ]),
          _vm._v(" "),
          _vm.formErrors.patronymic
            ? _c("div", { staticClass: "invalid-text" }, [
                _c("div", { staticClass: "left arrow" }),
                _vm._v(_vm._s(_vm.formErrors.patronymic[0]))
              ])
            : _vm._e()
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "form-group relative" }, [
          _c("div", { staticClass: "d-flex" }, [
            _c("label", { attrs: { for: "" } }, [_vm._v("Номер телефона")]),
            _vm._v(" "),
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.registerData.phone,
                  expression: "registerData.phone"
                },
                {
                  name: "mask",
                  rawName: "v-mask",
                  value: _vm.phoneMask,
                  expression: "phoneMask"
                }
              ],
              staticClass: "form-control",
              class: { "is-invalid": _vm.formErrors.phone },
              attrs: { placeholder: "" },
              domProps: { value: _vm.registerData.phone },
              on: {
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.$set(_vm.registerData, "phone", $event.target.value)
                }
              }
            })
          ]),
          _vm._v(" "),
          _vm.formErrors.phone
            ? _c("div", { staticClass: "invalid-text" }, [
                _c("div", { staticClass: "left arrow" }),
                _vm._v(_vm._s(_vm.formErrors.phone[0]))
              ])
            : _vm._e()
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "form-group relative" }, [
          _c("div", { staticClass: "d-flex" }, [
            _c("label", { attrs: { for: "" } }, [_vm._v("Реферальный код")]),
            _vm._v(" "),
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.registerData.referal,
                  expression: "registerData.referal"
                }
              ],
              staticClass: "form-control",
              class: { "is-invalid": _vm.formErrors.referal },
              attrs: { placeholder: "" },
              domProps: { value: _vm.registerData.referal },
              on: {
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.$set(_vm.registerData, "referal", $event.target.value)
                }
              }
            })
          ]),
          _vm._v(" "),
          _vm.formErrors.referal
            ? _c("div", { staticClass: "invalid-text" }, [
                _c("div", { staticClass: "left arrow" }),
                _vm._v(_vm._s(_vm.formErrors.referal[0]))
              ])
            : _vm._e()
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "form-group relative" }, [
          _c("div", { staticClass: "d-flex" }, [
            _c("label", { attrs: { for: "" } }, [_vm._v("Пароль")]),
            _vm._v(" "),
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.registerData.password,
                  expression: "registerData.password"
                }
              ],
              staticClass: "form-control",
              class: { "is-invalid": _vm.formErrors.password },
              attrs: { type: "password", placeholder: "" },
              domProps: { value: _vm.registerData.password },
              on: {
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.$set(_vm.registerData, "password", $event.target.value)
                }
              }
            })
          ]),
          _vm._v(" "),
          _vm.formErrors.password
            ? _c("div", { staticClass: "invalid-text" }, [
                _c("div", { staticClass: "left arrow" }),
                _vm._v(_vm._s(_vm.formErrors.password[0]))
              ])
            : _vm._e()
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "form-group relative" }, [
          _c("div", { staticClass: "d-flex" }, [
            _c("label", { attrs: { for: "" } }, [_vm._v("Подтверждение")]),
            _vm._v(" "),
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.registerData.password_confirmation,
                  expression: "registerData.password_confirmation"
                }
              ],
              staticClass: "form-control",
              class: { "is-invalid": _vm.formErrors.password_confirmation },
              attrs: { type: "password", placeholder: "" },
              domProps: { value: _vm.registerData.password_confirmation },
              on: {
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.$set(
                    _vm.registerData,
                    "password_confirmation",
                    $event.target.value
                  )
                }
              }
            })
          ]),
          _vm._v(" "),
          _vm.formErrors.password_confirmation
            ? _c("div", { staticClass: "invalid-text" }, [
                _c("div", { staticClass: "left arrow" }),
                _vm._v(_vm._s(_vm.formErrors.password_confirmation[0]))
              ])
            : _vm._e()
        ]),
        _vm._v(" "),
        _vm.$store.getters.needSmsConfirm
          ? _c("div", { staticClass: "form-group relative" }, [
              _c("div", { staticClass: "d-flex" }, [
                _c("label", {}, [_vm._v("SMS код")]),
                _vm._v(" "),
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.registerData.sms_code,
                      expression: "registerData.sms_code"
                    }
                  ],
                  staticClass: "form-control",
                  attrs: { placeholder: "" },
                  domProps: { value: _vm.registerData.sms_code },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.$set(
                        _vm.registerData,
                        "sms_code",
                        $event.target.value
                      )
                    }
                  }
                })
              ])
            ])
          : _vm._e(),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "form-group", staticStyle: { "margin-top": "30px" } },
          [
            _c(
              "button",
              {
                staticClass: "button auth_butt",
                attrs: { type: "button" },
                on: { click: _vm.register }
              },
              [_vm._v("Войти")]
            )
          ]
        )
      ])
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/auth/Auth.vue":
/*!***********************************************!*\
  !*** ./resources/js/components/auth/Auth.vue ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Auth_vue_vue_type_template_id_29320894_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Auth.vue?vue&type=template&id=29320894&scoped=true& */ "./resources/js/components/auth/Auth.vue?vue&type=template&id=29320894&scoped=true&");
/* harmony import */ var _Auth_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Auth.vue?vue&type=script&lang=js& */ "./resources/js/components/auth/Auth.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _Auth_vue_vue_type_style_index_0_id_29320894_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Auth.vue?vue&type=style&index=0&id=29320894&scoped=true&lang=css& */ "./resources/js/components/auth/Auth.vue?vue&type=style&index=0&id=29320894&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Auth_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Auth_vue_vue_type_template_id_29320894_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Auth_vue_vue_type_template_id_29320894_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "29320894",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/auth/Auth.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/auth/Auth.vue?vue&type=script&lang=js&":
/*!************************************************************************!*\
  !*** ./resources/js/components/auth/Auth.vue?vue&type=script&lang=js& ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Auth_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Auth.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/auth/Auth.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Auth_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/auth/Auth.vue?vue&type=style&index=0&id=29320894&scoped=true&lang=css&":
/*!********************************************************************************************************!*\
  !*** ./resources/js/components/auth/Auth.vue?vue&type=style&index=0&id=29320894&scoped=true&lang=css& ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_10_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Auth_vue_vue_type_style_index_0_id_29320894_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader!../../../../node_modules/css-loader??ref--10-1!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--10-2!../../../../node_modules/vue-loader/lib??vue-loader-options!./Auth.vue?vue&type=style&index=0&id=29320894&scoped=true&lang=css& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/auth/Auth.vue?vue&type=style&index=0&id=29320894&scoped=true&lang=css&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_10_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Auth_vue_vue_type_style_index_0_id_29320894_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_10_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Auth_vue_vue_type_style_index_0_id_29320894_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_10_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Auth_vue_vue_type_style_index_0_id_29320894_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_10_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Auth_vue_vue_type_style_index_0_id_29320894_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_10_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Auth_vue_vue_type_style_index_0_id_29320894_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./resources/js/components/auth/Auth.vue?vue&type=template&id=29320894&scoped=true&":
/*!******************************************************************************************!*\
  !*** ./resources/js/components/auth/Auth.vue?vue&type=template&id=29320894&scoped=true& ***!
  \******************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Auth_vue_vue_type_template_id_29320894_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./Auth.vue?vue&type=template&id=29320894&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/auth/Auth.vue?vue&type=template&id=29320894&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Auth_vue_vue_type_template_id_29320894_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Auth_vue_vue_type_template_id_29320894_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvYXV0aC9BdXRoLnZ1ZSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvY29tcG9uZW50cy9hdXRoL0F1dGgudnVlPzhhYmIiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvYXV0aC9BdXRoLnZ1ZT8zZWMzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9qcy9jb21wb25lbnRzL2F1dGgvQXV0aC52dWU/OTk4OCIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvY29tcG9uZW50cy9hdXRoL0F1dGgudnVlIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9qcy9jb21wb25lbnRzL2F1dGgvQXV0aC52dWU/ZGEyOSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvY29tcG9uZW50cy9hdXRoL0F1dGgudnVlPzQyMWYiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvYXV0aC9BdXRoLnZ1ZT9lYWI3Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBc0VBO0FBQ0EsY0FEQTtBQUVBO0FBQ0E7QUFDQSxtR0FEQTtBQUVBO0FBQ0EsaUJBREE7QUFFQTtBQUZBLE9BRkE7QUFNQSwyQkFOQTtBQU9BO0FBQ0EsbUJBREE7QUFFQSxtQkFGQTtBQUdBLGdCQUhBO0FBSUEsc0JBSkE7QUFLQSxpQkFMQTtBQU1BLG9CQU5BO0FBT0EsaUNBUEE7QUFRQTtBQVJBLE9BUEE7QUFpQkE7QUFqQkE7QUFxQkEsR0F4QkE7QUF5QkE7QUFDQTtBQUNBLGFBREEscUJBQ0E7QUFDQTtBQUNBLE9BSEE7QUFJQTtBQUpBO0FBREEsR0F6QkE7QUFpQ0EsYUFqQ0EseUJBaUNBLENBQ0EsQ0FsQ0E7QUFtQ0EsU0FuQ0EscUJBbUNBLENBQ0E7QUFDQTtBQUNBO0FBQ0EsR0F2Q0E7QUF3Q0E7QUFDQTtBQUFBOztBQUNBO0FBQ0EsMENBQ0EsSUFEQSxDQUNBO0FBQUE7QUFBQSxPQURBLFdBRUE7QUFBQTtBQUFBLE9BRkE7QUFHQSxLQU5BO0FBT0E7QUFBQTs7QUFDQSwwREFDQSxJQURBLENBQ0E7QUFBQTtBQUFBLE9BREEsV0FFQTtBQUNBO0FBQ0EsT0FKQTtBQUtBO0FBYkE7QUF4Q0EsRzs7Ozs7Ozs7Ozs7QUN0RUEsMkJBQTJCLG1CQUFPLENBQUMsc0dBQXFEO0FBQ3hGOzs7QUFHQTtBQUNBLGNBQWMsUUFBUyxpQ0FBaUMseUJBQXlCLGFBQWEscUJBQXFCLG1CQUFtQixvQkFBb0IsY0FBYywwQkFBMEIsb0JBQW9CLDBCQUEwQiw4QkFBOEIsR0FBRyxtQ0FBbUMscUJBQXFCLEdBQUcseUJBQXlCLDREQUE0RCxtQkFBbUIsR0FBRywyQkFBMkIseUJBQXlCLHNCQUFzQiwwQkFBMEIsR0FBRyw4QkFBOEIsZ0NBQWdDLGtCQUFrQixnQ0FBZ0MseUJBQXlCLHFCQUFxQixxQkFBcUIsR0FBRzs7QUFFcHRCOzs7Ozs7Ozs7Ozs7O0FDTkEsY0FBYyxtQkFBTyxDQUFDLG9rQkFBdVU7O0FBRTdWLDRDQUE0QyxRQUFTOztBQUVyRDtBQUNBOzs7O0FBSUEsZUFBZTs7QUFFZjtBQUNBOztBQUVBLGFBQWEsbUJBQU8sQ0FBQyw0R0FBeUQ7O0FBRTlFOztBQUVBLEdBQUcsS0FBVSxFQUFFLEU7Ozs7Ozs7Ozs7OztBQ25CZjtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixTQUFTLGtCQUFrQixFQUFFO0FBQ2pELGdCQUFnQixTQUFTLDhCQUE4QixFQUFFO0FBQ3pELGlCQUFpQixzQkFBc0I7QUFDdkM7QUFDQSxpQkFBaUIsbUNBQW1DO0FBQ3BEO0FBQ0EsaUJBQWlCLDJCQUEyQjtBQUM1QyxtQkFBbUIscUNBQXFDO0FBQ3hELHFCQUFxQix3QkFBd0I7QUFDN0MseUJBQXlCLFNBQVMsVUFBVSxFQUFFO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsdUNBQXVDO0FBQzdELHNCQUFzQixrQkFBa0I7QUFDeEMseUJBQXlCLGtDQUFrQztBQUMzRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLHlCQUF5Qiw4QkFBOEI7QUFDdkQsMkJBQTJCLDRCQUE0QjtBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHFDQUFxQztBQUN4RCxxQkFBcUIsd0JBQXdCO0FBQzdDLHlCQUF5QixTQUFTLFVBQVUsRUFBRTtBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLG9DQUFvQztBQUMxRCxzQkFBc0Isa0JBQWtCO0FBQ3hDLHlCQUF5QiwrQkFBK0I7QUFDeEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsOEJBQThCO0FBQ3ZELDJCQUEyQiw0QkFBNEI7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixxQ0FBcUM7QUFDeEQscUJBQXFCLHdCQUF3QjtBQUM3Qyx5QkFBeUIsU0FBUyxVQUFVLEVBQUU7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQiwwQ0FBMEM7QUFDaEUsc0JBQXNCLGtCQUFrQjtBQUN4Qyx5QkFBeUIscUNBQXFDO0FBQzlEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLDhCQUE4QjtBQUN2RCwyQkFBMkIsNEJBQTRCO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIscUNBQXFDO0FBQ3hELHFCQUFxQix3QkFBd0I7QUFDN0MseUJBQXlCLFNBQVMsVUFBVSxFQUFFO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixxQ0FBcUM7QUFDM0Qsc0JBQXNCLGtCQUFrQjtBQUN4Qyx5QkFBeUIsZ0NBQWdDO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLDhCQUE4QjtBQUN2RCwyQkFBMkIsNEJBQTRCO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIscUNBQXFDO0FBQ3hELHFCQUFxQix3QkFBd0I7QUFDN0MseUJBQXlCLFNBQVMsVUFBVSxFQUFFO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsdUNBQXVDO0FBQzdELHNCQUFzQixrQkFBa0I7QUFDeEMseUJBQXlCLGtDQUFrQztBQUMzRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLHlCQUF5Qiw4QkFBOEI7QUFDdkQsMkJBQTJCLDRCQUE0QjtBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHFDQUFxQztBQUN4RCxxQkFBcUIsd0JBQXdCO0FBQzdDLHlCQUF5QixTQUFTLFVBQVUsRUFBRTtBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLHdDQUF3QztBQUM5RCxzQkFBc0Isb0NBQW9DO0FBQzFELHlCQUF5QixtQ0FBbUM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsOEJBQThCO0FBQ3ZELDJCQUEyQiw0QkFBNEI7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixxQ0FBcUM7QUFDeEQscUJBQXFCLHdCQUF3QjtBQUM3Qyx5QkFBeUIsU0FBUyxVQUFVLEVBQUU7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixxREFBcUQ7QUFDM0Usc0JBQXNCLG9DQUFvQztBQUMxRCx5QkFBeUIsZ0RBQWdEO0FBQ3pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsOEJBQThCO0FBQ3ZELDJCQUEyQiw0QkFBNEI7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLHFDQUFxQztBQUM1RCx5QkFBeUIsd0JBQXdCO0FBQ2pELDhCQUE4QjtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLGtCQUFrQjtBQUM1Qyw2QkFBNkIsbUNBQW1DO0FBQ2hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLDBDQUEwQyx1QkFBdUIsRUFBRTtBQUM5RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGlCQUFpQjtBQUN6QyxxQkFBcUI7QUFDckIsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQ3ZVQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQStGO0FBQ3ZDO0FBQ0w7QUFDcUM7OztBQUd4RjtBQUNnRztBQUNoRyxnQkFBZ0IsMkdBQVU7QUFDMUIsRUFBRSwwRUFBTTtBQUNSLEVBQUUsMkZBQU07QUFDUixFQUFFLG9HQUFlO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsSUFBSSxLQUFVLEVBQUUsWUFpQmY7QUFDRDtBQUNlLGdGOzs7Ozs7Ozs7Ozs7QUN2Q2Y7QUFBQTtBQUFBLHdDQUEwTCxDQUFnQixnUEFBRyxFQUFDLEM7Ozs7Ozs7Ozs7OztBQ0E5TTtBQUFBO0FBQUE7QUFBQTtBQUF1WSxDQUFnQixzWkFBRyxFQUFDLEM7Ozs7Ozs7Ozs7OztBQ0EzWjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEiLCJmaWxlIjoiUmVnaXN0ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyI8dGVtcGxhdGU+XG4gICAgPGRpdiBpZD1cImF1dGhfZm9ybVwiPlxuICAgICAgICA8Zm9ybSAgbWV0aG9kPVwicG9zdFwiIGFjdGlvbj1cIi9cIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJsb2dvXCI+PC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWN0aW9uIHRleHQtd2hpdGVcIj7QoNC10LPQuNGB0YLRgNCw0YbQuNGPPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwibC1yLXNpZGVkXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXAgcmVsYXRpdmVcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImQtZmxleFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzPVwiXCIgZm9yPVwiXCI+0KTQsNC80LjQu9C40Y88L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHYtbW9kZWw9XCJyZWdpc3RlckRhdGEuc3VybmFtZVwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgdi1iaW5kOmNsYXNzPVwieyAnaXMtaW52YWxpZCc6IGZvcm1FcnJvcnMuc3VybmFtZSB9XCIgcGxhY2Vob2xkZXI9XCJcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiB2LWlmPVwiZm9ybUVycm9ycy5zdXJuYW1lXCIgY2xhc3M9XCJpbnZhbGlkLXRleHRcIj48ZGl2IGNsYXNzPVwibGVmdCBhcnJvd1wiPjwvZGl2Pnt7IGZvcm1FcnJvcnMuc3VybmFtZVswXSB9fTwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwIHJlbGF0aXZlXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkLWZsZXhcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzcz1cIlwiIGZvcj1cIlwiPtCY0LzRjzwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdi1tb2RlbD1cInJlZ2lzdGVyRGF0YS5uYW1lXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiB2LWJpbmQ6Y2xhc3M9XCJ7ICdpcy1pbnZhbGlkJzogZm9ybUVycm9ycy5uYW1lIH1cIiBwbGFjZWhvbGRlcj1cIlwiIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHYtaWY9XCJmb3JtRXJyb3JzLm5hbWVcIiBjbGFzcz1cImludmFsaWQtdGV4dFwiPjxkaXYgY2xhc3M9XCJsZWZ0IGFycm93XCI+PC9kaXY+e3sgZm9ybUVycm9ycy5uYW1lWzBdIH19PC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXAgcmVsYXRpdmVcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImQtZmxleFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzPVwiXCIgZm9yPVwiXCI+0J7RgtGH0LXRgdGC0LLQvjwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdi1tb2RlbD1cInJlZ2lzdGVyRGF0YS5wYXRyb255bWljXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiB2LWJpbmQ6Y2xhc3M9XCJ7ICdpcy1pbnZhbGlkJzogZm9ybUVycm9ycy5wYXRyb255bWljIH1cIiBwbGFjZWhvbGRlcj1cIlwiIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHYtaWY9XCJmb3JtRXJyb3JzLnBhdHJvbnltaWNcIiBjbGFzcz1cImludmFsaWQtdGV4dFwiPjxkaXYgY2xhc3M9XCJsZWZ0IGFycm93XCI+PC9kaXY+e3sgZm9ybUVycm9ycy5wYXRyb255bWljWzBdIH19PC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXAgcmVsYXRpdmVcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImQtZmxleFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzPVwiXCIgZm9yPVwiXCI+0J3QvtC80LXRgCDRgtC10LvQtdGE0L7QvdCwPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB2LW1vZGVsPVwicmVnaXN0ZXJEYXRhLnBob25lXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiB2LW1hc2s9XCJwaG9uZU1hc2tcIiB2LWJpbmQ6Y2xhc3M9XCJ7ICdpcy1pbnZhbGlkJzogZm9ybUVycm9ycy5waG9uZSB9XCIgcGxhY2Vob2xkZXI9XCJcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiB2LWlmPVwiZm9ybUVycm9ycy5waG9uZVwiIGNsYXNzPVwiaW52YWxpZC10ZXh0XCI+PGRpdiBjbGFzcz1cImxlZnQgYXJyb3dcIj48L2Rpdj57eyBmb3JtRXJyb3JzLnBob25lWzBdIH19PC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXAgcmVsYXRpdmVcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImQtZmxleFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzPVwiXCIgZm9yPVwiXCI+0KDQtdGE0LXRgNCw0LvRjNC90YvQuSDQutC+0LQ8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHYtbW9kZWw9XCJyZWdpc3RlckRhdGEucmVmZXJhbFwiIHYtYmluZDpjbGFzcz1cInsgJ2lzLWludmFsaWQnOiBmb3JtRXJyb3JzLnJlZmVyYWwgfVwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgcGxhY2Vob2xkZXI9XCJcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiB2LWlmPVwiZm9ybUVycm9ycy5yZWZlcmFsXCIgY2xhc3M9XCJpbnZhbGlkLXRleHRcIj48ZGl2IGNsYXNzPVwibGVmdCBhcnJvd1wiPjwvZGl2Pnt7IGZvcm1FcnJvcnMucmVmZXJhbFswXSB9fTwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwIHJlbGF0aXZlXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkLWZsZXhcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzcz1cIlwiIGZvcj1cIlwiPtCf0LDRgNC+0LvRjDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdi1tb2RlbD1cInJlZ2lzdGVyRGF0YS5wYXNzd29yZFwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgdHlwZT1cInBhc3N3b3JkXCIgdi1iaW5kOmNsYXNzPVwieyAnaXMtaW52YWxpZCc6IGZvcm1FcnJvcnMucGFzc3dvcmQgfVwiIHBsYWNlaG9sZGVyPVwiXCI+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHYtaWY9XCJmb3JtRXJyb3JzLnBhc3N3b3JkXCIgY2xhc3M9XCJpbnZhbGlkLXRleHRcIj48ZGl2IGNsYXNzPVwibGVmdCBhcnJvd1wiPjwvZGl2Pnt7IGZvcm1FcnJvcnMucGFzc3dvcmRbMF0gfX08L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cCByZWxhdGl2ZVwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZC1mbGV4XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJcIiBmb3I9XCJcIj7Qn9C+0LTRgtCy0LXRgNC20LTQtdC90LjQtTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdi1tb2RlbD1cInJlZ2lzdGVyRGF0YS5wYXNzd29yZF9jb25maXJtYXRpb25cIiBjbGFzcz1cImZvcm0tY29udHJvbFwiIHR5cGU9XCJwYXNzd29yZFwiIHYtYmluZDpjbGFzcz1cInsgJ2lzLWludmFsaWQnOiBmb3JtRXJyb3JzLnBhc3N3b3JkX2NvbmZpcm1hdGlvbiB9XCJwbGFjZWhvbGRlcj1cIlwiPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiB2LWlmPVwiZm9ybUVycm9ycy5wYXNzd29yZF9jb25maXJtYXRpb25cIiBjbGFzcz1cImludmFsaWQtdGV4dFwiPjxkaXYgY2xhc3M9XCJsZWZ0IGFycm93XCI+PC9kaXY+e3sgZm9ybUVycm9ycy5wYXNzd29yZF9jb25maXJtYXRpb25bMF0gfX08L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IHYtaWY9XCIkc3RvcmUuZ2V0dGVycy5uZWVkU21zQ29uZmlybVwiIGNsYXNzPVwiZm9ybS1ncm91cCByZWxhdGl2ZVwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZC1mbGV4XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJcIiA+U01TINC60L7QtDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdi1tb2RlbD1cInJlZ2lzdGVyRGF0YS5zbXNfY29kZVwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgcGxhY2Vob2xkZXI9XCJcIj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIiBzdHlsZT1cIm1hcmdpbi10b3A6IDMwcHhcIj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidXR0b24gYXV0aF9idXR0XCIgdi1vbjpjbGljaz1cInJlZ2lzdGVyXCI+0JLQvtC50YLQuDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZm9ybT5cbiAgICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG4gICAgZXhwb3J0IGRlZmF1bHQge1xuICAgICAgICBuYW1lOiBcIkF1dGhcIixcbiAgICAgICAgZGF0YTogKCk9PiB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHBob25lTWFzazogWycrNycsICcoJywgL1xcZC8sIC9cXGQvLCAvXFxkLywgJykgJywgL1xcZC8sIC9cXGQvLCAvXFxkLywgJy0nLCAvXFxkLywgL1xcZC8sIC9cXGQvLCAvXFxkL10sXG4gICAgICAgICAgICAgICAgbG9naW5EYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIHBob25lOicnLFxuICAgICAgICAgICAgICAgICAgICBwYXNzd29yZDonJyxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG5lZWRTbXNDb25maXJtOmZhbHNlLFxuICAgICAgICAgICAgICAgIHJlZ2lzdGVyRGF0YToge1xuICAgICAgICAgICAgICAgICAgICByZWZlcmFsOiAnJyxcbiAgICAgICAgICAgICAgICAgICAgc3VybmFtZTogJycsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICcnLFxuICAgICAgICAgICAgICAgICAgICBwYXRyb255bWljOiAnJyxcbiAgICAgICAgICAgICAgICAgICAgcGhvbmU6JycsXG4gICAgICAgICAgICAgICAgICAgIHBhc3N3b3JkOicnLFxuICAgICAgICAgICAgICAgICAgICBwYXNzd29yZF9jb25maXJtYXRpb246JycsXG4gICAgICAgICAgICAgICAgICAgIHNtc19jb2RlOicnLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZm9ybUVycm9yczp7XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHdhdGNoOiB7XG4gICAgICAgICAgICByZWdpc3RlckRhdGEgOntcbiAgICAgICAgICAgICAgICBoYW5kbGVyKCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZvcm1FcnJvcnMgPSB7fTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGRlZXA6IHRydWUsXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGJlZm9yZU1vdW50KCl7XG4gICAgICAgIH0sXG4gICAgICAgIG1vdW50ZWQoKSB7XG4gICAgICAgICAgICAvLyB0aGlzLiRldmVudEJ1cy4kb24oJ05vQXV0aEV2ZW50JywgKCk9PntcbiAgICAgICAgICAgIC8vICAgICB0aGlzLnNob3dMb2dpbiA9IHRydWU7XG4gICAgICAgICAgICAvLyB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgbWV0aG9kczp7XG4gICAgICAgICAgICBsb2dpbjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGxldCBkYXRhID0gdGhpcy5sb2dpbkRhdGE7XG4gICAgICAgICAgICAgICAgdGhpcy4kc3RvcmUuZGlzcGF0Y2goJ2xvZ2luJywgZGF0YSlcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4gdGhpcy4kcm91dGVyLnB1c2goJy8nKSlcbiAgICAgICAgICAgICAgICAgICAgLmNhdGNoKGVyciA9PiBjb25zb2xlLmxvZyhlcnIpKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJlZ2lzdGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kc3RvcmUuZGlzcGF0Y2goJ3JlZ2lzdGVyJywgdGhpcy5yZWdpc3RlckRhdGEpXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHRoaXMuJHJvdXRlci5wdXNoKCcvJykpXG4gICAgICAgICAgICAgICAgICAgIC5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5mb3JtRXJyb3JzID0gZXJyLnJlc3BvbnNlLmRhdGEubWVzc2FnZXM7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfVxuICAgIH1cbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuICAgICNhdXRoX2Zvcm17XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgdG9wOiAwO1xuICAgICAgICB6LWluZGV4OiAxMDE2OTtcbiAgICAgICAgd2lkdGg6IDEwMHZ3O1xuICAgICAgICBoZWlnaHQ6IDEwMHZoO1xuICAgICAgICBsZWZ0OiAwO1xuICAgICAgICBiYWNrZ3JvdW5kOiAjMkQ3NkE4O1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICB9XG4gICAgI2F1dGhfZm9ybSBmb3Jte1xuICAgICAgICBtYXJnaW46IDAgYXV0bztcbiAgICB9XG4gICAgLmxvZ297XG4gICAgICAgIGJhY2tncm91bmQ6IHVybCgvaW1hZ2VzL2xvZ29fYmIuc3ZnKSBjZW50ZXIgbm8tcmVwZWF0O1xuICAgICAgICBoZWlnaHQ6IDUwcHg7XG4gICAgfVxuICAgIC5hY3Rpb257XG4gICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgICAgZm9udC1zaXplOiAxOHB4O1xuICAgICAgICBtYXJnaW4tYm90dG9tOiAxNXB4O1xuICAgIH1cbiAgICAuYXV0aF9idXR0e1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMmQ3NmE4O1xuICAgICAgICBjb2xvcjogI2ZmZjtcbiAgICAgICAgYm9yZGVyOiAxcHggc29saWQgIzQ5OTNjNTtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogM3B4O1xuICAgICAgICBtYXJnaW46IDAgYXV0bztcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgfVxuPC9zdHlsZT5cbiIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoZmFsc2UpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiXFxuI2F1dGhfZm9ybVtkYXRhLXYtMjkzMjA4OTRde1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHRvcDogMDtcXG4gICAgei1pbmRleDogMTAxNjk7XFxuICAgIHdpZHRoOiAxMDB2dztcXG4gICAgaGVpZ2h0OiAxMDB2aDtcXG4gICAgbGVmdDogMDtcXG4gICAgYmFja2dyb3VuZDogIzJENzZBODtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxufVxcbiNhdXRoX2Zvcm0gZm9ybVtkYXRhLXYtMjkzMjA4OTRde1xcbiAgICBtYXJnaW46IDAgYXV0bztcXG59XFxuLmxvZ29bZGF0YS12LTI5MzIwODk0XXtcXG4gICAgYmFja2dyb3VuZDogdXJsKC9pbWFnZXMvbG9nb19iYi5zdmcpIGNlbnRlciBuby1yZXBlYXQ7XFxuICAgIGhlaWdodDogNTBweDtcXG59XFxuLmFjdGlvbltkYXRhLXYtMjkzMjA4OTRde1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgIGZvbnQtc2l6ZTogMThweDtcXG4gICAgbWFyZ2luLWJvdHRvbTogMTVweDtcXG59XFxuLmF1dGhfYnV0dFtkYXRhLXYtMjkzMjA4OTRde1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMmQ3NmE4O1xcbiAgICBjb2xvcjogI2ZmZjtcXG4gICAgYm9yZGVyOiAxcHggc29saWQgIzQ5OTNjNTtcXG4gICAgYm9yZGVyLXJhZGl1czogM3B4O1xcbiAgICBtYXJnaW46IDAgYXV0bztcXG4gICAgZGlzcGxheTogYmxvY2s7XFxufVxcblwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcbiIsIlxudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0xMC0xIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3N0eWxlUG9zdExvYWRlci5qcyEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvc3JjL2luZGV4LmpzPz9yZWYtLTEwLTIhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9BdXRoLnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmlkPTI5MzIwODk0JnNjb3BlZD10cnVlJmxhbmc9Y3NzJlwiKTtcblxuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5cbnZhciB0cmFuc2Zvcm07XG52YXIgaW5zZXJ0SW50bztcblxuXG5cbnZhciBvcHRpb25zID0ge1wiaG1yXCI6dHJ1ZX1cblxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbm9wdGlvbnMuaW5zZXJ0SW50byA9IHVuZGVmaW5lZDtcblxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscztcblxuaWYobW9kdWxlLmhvdCkge1xuXHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tMTAtMSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy9zdHlsZVBvc3RMb2FkZXIuanMhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL3NyYy9pbmRleC5qcz8/cmVmLS0xMC0yIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vQXV0aC52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZpZD0yOTMyMDg5NCZzY29wZWQ9dHJ1ZSZsYW5nPWNzcyZcIiwgZnVuY3Rpb24oKSB7XG5cdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0xMC0xIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3N0eWxlUG9zdExvYWRlci5qcyEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvc3JjL2luZGV4LmpzPz9yZWYtLTEwLTIhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9BdXRoLnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmlkPTI5MzIwODk0JnNjb3BlZD10cnVlJmxhbmc9Y3NzJlwiKTtcblxuXHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXG5cdFx0dmFyIGxvY2FscyA9IChmdW5jdGlvbihhLCBiKSB7XG5cdFx0XHR2YXIga2V5LCBpZHggPSAwO1xuXG5cdFx0XHRmb3Ioa2V5IGluIGEpIHtcblx0XHRcdFx0aWYoIWIgfHwgYVtrZXldICE9PSBiW2tleV0pIHJldHVybiBmYWxzZTtcblx0XHRcdFx0aWR4Kys7XG5cdFx0XHR9XG5cblx0XHRcdGZvcihrZXkgaW4gYikgaWR4LS07XG5cblx0XHRcdHJldHVybiBpZHggPT09IDA7XG5cdFx0fShjb250ZW50LmxvY2FscywgbmV3Q29udGVudC5sb2NhbHMpKTtcblxuXHRcdGlmKCFsb2NhbHMpIHRocm93IG5ldyBFcnJvcignQWJvcnRpbmcgQ1NTIEhNUiBkdWUgdG8gY2hhbmdlZCBjc3MtbW9kdWxlcyBsb2NhbHMuJyk7XG5cblx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdH0pO1xuXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufSIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXCJkaXZcIiwgeyBhdHRyczogeyBpZDogXCJhdXRoX2Zvcm1cIiB9IH0sIFtcbiAgICBfYyhcImZvcm1cIiwgeyBhdHRyczogeyBtZXRob2Q6IFwicG9zdFwiLCBhY3Rpb246IFwiL1wiIH0gfSwgW1xuICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJsb2dvXCIgfSksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJhY3Rpb24gdGV4dC13aGl0ZVwiIH0sIFtfdm0uX3YoXCLQoNC10LPQuNGB0YLRgNCw0YbQuNGPXCIpXSksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJsLXItc2lkZWRcIiB9LCBbXG4gICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiZm9ybS1ncm91cCByZWxhdGl2ZVwiIH0sIFtcbiAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImQtZmxleFwiIH0sIFtcbiAgICAgICAgICAgIF9jKFwibGFiZWxcIiwgeyBhdHRyczogeyBmb3I6IFwiXCIgfSB9LCBbX3ZtLl92KFwi0KTQsNC80LjQu9C40Y9cIildKSxcbiAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICBfYyhcImlucHV0XCIsIHtcbiAgICAgICAgICAgICAgZGlyZWN0aXZlczogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIG5hbWU6IFwibW9kZWxcIixcbiAgICAgICAgICAgICAgICAgIHJhd05hbWU6IFwidi1tb2RlbFwiLFxuICAgICAgICAgICAgICAgICAgdmFsdWU6IF92bS5yZWdpc3RlckRhdGEuc3VybmFtZSxcbiAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwicmVnaXN0ZXJEYXRhLnN1cm5hbWVcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiZm9ybS1jb250cm9sXCIsXG4gICAgICAgICAgICAgIGNsYXNzOiB7IFwiaXMtaW52YWxpZFwiOiBfdm0uZm9ybUVycm9ycy5zdXJuYW1lIH0sXG4gICAgICAgICAgICAgIGF0dHJzOiB7IHBsYWNlaG9sZGVyOiBcIlwiIH0sXG4gICAgICAgICAgICAgIGRvbVByb3BzOiB7IHZhbHVlOiBfdm0ucmVnaXN0ZXJEYXRhLnN1cm5hbWUgfSxcbiAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICBpbnB1dDogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICBpZiAoJGV2ZW50LnRhcmdldC5jb21wb3NpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBfdm0uJHNldChfdm0ucmVnaXN0ZXJEYXRhLCBcInN1cm5hbWVcIiwgJGV2ZW50LnRhcmdldC52YWx1ZSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgXSksXG4gICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICBfdm0uZm9ybUVycm9ycy5zdXJuYW1lXG4gICAgICAgICAgICA/IF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiaW52YWxpZC10ZXh0XCIgfSwgW1xuICAgICAgICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwibGVmdCBhcnJvd1wiIH0pLFxuICAgICAgICAgICAgICAgIF92bS5fdihfdm0uX3MoX3ZtLmZvcm1FcnJvcnMuc3VybmFtZVswXSkpXG4gICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICA6IF92bS5fZSgpXG4gICAgICAgIF0pLFxuICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImZvcm0tZ3JvdXAgcmVsYXRpdmVcIiB9LCBbXG4gICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJkLWZsZXhcIiB9LCBbXG4gICAgICAgICAgICBfYyhcImxhYmVsXCIsIHsgYXR0cnM6IHsgZm9yOiBcIlwiIH0gfSwgW192bS5fdihcItCY0LzRj1wiKV0pLFxuICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgIF9jKFwiaW5wdXRcIiwge1xuICAgICAgICAgICAgICBkaXJlY3RpdmVzOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgbmFtZTogXCJtb2RlbFwiLFxuICAgICAgICAgICAgICAgICAgcmF3TmFtZTogXCJ2LW1vZGVsXCIsXG4gICAgICAgICAgICAgICAgICB2YWx1ZTogX3ZtLnJlZ2lzdGVyRGF0YS5uYW1lLFxuICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCJyZWdpc3RlckRhdGEubmFtZVwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJmb3JtLWNvbnRyb2xcIixcbiAgICAgICAgICAgICAgY2xhc3M6IHsgXCJpcy1pbnZhbGlkXCI6IF92bS5mb3JtRXJyb3JzLm5hbWUgfSxcbiAgICAgICAgICAgICAgYXR0cnM6IHsgcGxhY2Vob2xkZXI6IFwiXCIgfSxcbiAgICAgICAgICAgICAgZG9tUHJvcHM6IHsgdmFsdWU6IF92bS5yZWdpc3RlckRhdGEubmFtZSB9LFxuICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgIGlucHV0OiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgIGlmICgkZXZlbnQudGFyZ2V0LmNvbXBvc2luZykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIF92bS4kc2V0KF92bS5yZWdpc3RlckRhdGEsIFwibmFtZVwiLCAkZXZlbnQudGFyZ2V0LnZhbHVlKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICBdKSxcbiAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgIF92bS5mb3JtRXJyb3JzLm5hbWVcbiAgICAgICAgICAgID8gX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJpbnZhbGlkLXRleHRcIiB9LCBbXG4gICAgICAgICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJsZWZ0IGFycm93XCIgfSksXG4gICAgICAgICAgICAgICAgX3ZtLl92KF92bS5fcyhfdm0uZm9ybUVycm9ycy5uYW1lWzBdKSlcbiAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgIDogX3ZtLl9lKClcbiAgICAgICAgXSksXG4gICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiZm9ybS1ncm91cCByZWxhdGl2ZVwiIH0sIFtcbiAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImQtZmxleFwiIH0sIFtcbiAgICAgICAgICAgIF9jKFwibGFiZWxcIiwgeyBhdHRyczogeyBmb3I6IFwiXCIgfSB9LCBbX3ZtLl92KFwi0J7RgtGH0LXRgdGC0LLQvlwiKV0pLFxuICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgIF9jKFwiaW5wdXRcIiwge1xuICAgICAgICAgICAgICBkaXJlY3RpdmVzOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgbmFtZTogXCJtb2RlbFwiLFxuICAgICAgICAgICAgICAgICAgcmF3TmFtZTogXCJ2LW1vZGVsXCIsXG4gICAgICAgICAgICAgICAgICB2YWx1ZTogX3ZtLnJlZ2lzdGVyRGF0YS5wYXRyb255bWljLFxuICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCJyZWdpc3RlckRhdGEucGF0cm9ueW1pY1wiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJmb3JtLWNvbnRyb2xcIixcbiAgICAgICAgICAgICAgY2xhc3M6IHsgXCJpcy1pbnZhbGlkXCI6IF92bS5mb3JtRXJyb3JzLnBhdHJvbnltaWMgfSxcbiAgICAgICAgICAgICAgYXR0cnM6IHsgcGxhY2Vob2xkZXI6IFwiXCIgfSxcbiAgICAgICAgICAgICAgZG9tUHJvcHM6IHsgdmFsdWU6IF92bS5yZWdpc3RlckRhdGEucGF0cm9ueW1pYyB9LFxuICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgIGlucHV0OiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgIGlmICgkZXZlbnQudGFyZ2V0LmNvbXBvc2luZykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIF92bS4kc2V0KF92bS5yZWdpc3RlckRhdGEsIFwicGF0cm9ueW1pY1wiLCAkZXZlbnQudGFyZ2V0LnZhbHVlKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICBdKSxcbiAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgIF92bS5mb3JtRXJyb3JzLnBhdHJvbnltaWNcbiAgICAgICAgICAgID8gX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJpbnZhbGlkLXRleHRcIiB9LCBbXG4gICAgICAgICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJsZWZ0IGFycm93XCIgfSksXG4gICAgICAgICAgICAgICAgX3ZtLl92KF92bS5fcyhfdm0uZm9ybUVycm9ycy5wYXRyb255bWljWzBdKSlcbiAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgIDogX3ZtLl9lKClcbiAgICAgICAgXSksXG4gICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiZm9ybS1ncm91cCByZWxhdGl2ZVwiIH0sIFtcbiAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImQtZmxleFwiIH0sIFtcbiAgICAgICAgICAgIF9jKFwibGFiZWxcIiwgeyBhdHRyczogeyBmb3I6IFwiXCIgfSB9LCBbX3ZtLl92KFwi0J3QvtC80LXRgCDRgtC10LvQtdGE0L7QvdCwXCIpXSksXG4gICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgX2MoXCJpbnB1dFwiLCB7XG4gICAgICAgICAgICAgIGRpcmVjdGl2ZXM6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBuYW1lOiBcIm1vZGVsXCIsXG4gICAgICAgICAgICAgICAgICByYXdOYW1lOiBcInYtbW9kZWxcIixcbiAgICAgICAgICAgICAgICAgIHZhbHVlOiBfdm0ucmVnaXN0ZXJEYXRhLnBob25lLFxuICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCJyZWdpc3RlckRhdGEucGhvbmVcIlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgbmFtZTogXCJtYXNrXCIsXG4gICAgICAgICAgICAgICAgICByYXdOYW1lOiBcInYtbWFza1wiLFxuICAgICAgICAgICAgICAgICAgdmFsdWU6IF92bS5waG9uZU1hc2ssXG4gICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcInBob25lTWFza1wiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJmb3JtLWNvbnRyb2xcIixcbiAgICAgICAgICAgICAgY2xhc3M6IHsgXCJpcy1pbnZhbGlkXCI6IF92bS5mb3JtRXJyb3JzLnBob25lIH0sXG4gICAgICAgICAgICAgIGF0dHJzOiB7IHBsYWNlaG9sZGVyOiBcIlwiIH0sXG4gICAgICAgICAgICAgIGRvbVByb3BzOiB7IHZhbHVlOiBfdm0ucmVnaXN0ZXJEYXRhLnBob25lIH0sXG4gICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgaW5wdXQ6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgaWYgKCRldmVudC50YXJnZXQuY29tcG9zaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgX3ZtLiRzZXQoX3ZtLnJlZ2lzdGVyRGF0YSwgXCJwaG9uZVwiLCAkZXZlbnQudGFyZ2V0LnZhbHVlKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICBdKSxcbiAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgIF92bS5mb3JtRXJyb3JzLnBob25lXG4gICAgICAgICAgICA/IF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiaW52YWxpZC10ZXh0XCIgfSwgW1xuICAgICAgICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwibGVmdCBhcnJvd1wiIH0pLFxuICAgICAgICAgICAgICAgIF92bS5fdihfdm0uX3MoX3ZtLmZvcm1FcnJvcnMucGhvbmVbMF0pKVxuICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgOiBfdm0uX2UoKVxuICAgICAgICBdKSxcbiAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJmb3JtLWdyb3VwIHJlbGF0aXZlXCIgfSwgW1xuICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiZC1mbGV4XCIgfSwgW1xuICAgICAgICAgICAgX2MoXCJsYWJlbFwiLCB7IGF0dHJzOiB7IGZvcjogXCJcIiB9IH0sIFtfdm0uX3YoXCLQoNC10YTQtdGA0LDQu9GM0L3Ri9C5INC60L7QtFwiKV0pLFxuICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgIF9jKFwiaW5wdXRcIiwge1xuICAgICAgICAgICAgICBkaXJlY3RpdmVzOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgbmFtZTogXCJtb2RlbFwiLFxuICAgICAgICAgICAgICAgICAgcmF3TmFtZTogXCJ2LW1vZGVsXCIsXG4gICAgICAgICAgICAgICAgICB2YWx1ZTogX3ZtLnJlZ2lzdGVyRGF0YS5yZWZlcmFsLFxuICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCJyZWdpc3RlckRhdGEucmVmZXJhbFwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJmb3JtLWNvbnRyb2xcIixcbiAgICAgICAgICAgICAgY2xhc3M6IHsgXCJpcy1pbnZhbGlkXCI6IF92bS5mb3JtRXJyb3JzLnJlZmVyYWwgfSxcbiAgICAgICAgICAgICAgYXR0cnM6IHsgcGxhY2Vob2xkZXI6IFwiXCIgfSxcbiAgICAgICAgICAgICAgZG9tUHJvcHM6IHsgdmFsdWU6IF92bS5yZWdpc3RlckRhdGEucmVmZXJhbCB9LFxuICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgIGlucHV0OiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgIGlmICgkZXZlbnQudGFyZ2V0LmNvbXBvc2luZykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIF92bS4kc2V0KF92bS5yZWdpc3RlckRhdGEsIFwicmVmZXJhbFwiLCAkZXZlbnQudGFyZ2V0LnZhbHVlKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICBdKSxcbiAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgIF92bS5mb3JtRXJyb3JzLnJlZmVyYWxcbiAgICAgICAgICAgID8gX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJpbnZhbGlkLXRleHRcIiB9LCBbXG4gICAgICAgICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJsZWZ0IGFycm93XCIgfSksXG4gICAgICAgICAgICAgICAgX3ZtLl92KF92bS5fcyhfdm0uZm9ybUVycm9ycy5yZWZlcmFsWzBdKSlcbiAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgIDogX3ZtLl9lKClcbiAgICAgICAgXSksXG4gICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiZm9ybS1ncm91cCByZWxhdGl2ZVwiIH0sIFtcbiAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImQtZmxleFwiIH0sIFtcbiAgICAgICAgICAgIF9jKFwibGFiZWxcIiwgeyBhdHRyczogeyBmb3I6IFwiXCIgfSB9LCBbX3ZtLl92KFwi0J/QsNGA0L7Qu9GMXCIpXSksXG4gICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgX2MoXCJpbnB1dFwiLCB7XG4gICAgICAgICAgICAgIGRpcmVjdGl2ZXM6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBuYW1lOiBcIm1vZGVsXCIsXG4gICAgICAgICAgICAgICAgICByYXdOYW1lOiBcInYtbW9kZWxcIixcbiAgICAgICAgICAgICAgICAgIHZhbHVlOiBfdm0ucmVnaXN0ZXJEYXRhLnBhc3N3b3JkLFxuICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCJyZWdpc3RlckRhdGEucGFzc3dvcmRcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiZm9ybS1jb250cm9sXCIsXG4gICAgICAgICAgICAgIGNsYXNzOiB7IFwiaXMtaW52YWxpZFwiOiBfdm0uZm9ybUVycm9ycy5wYXNzd29yZCB9LFxuICAgICAgICAgICAgICBhdHRyczogeyB0eXBlOiBcInBhc3N3b3JkXCIsIHBsYWNlaG9sZGVyOiBcIlwiIH0sXG4gICAgICAgICAgICAgIGRvbVByb3BzOiB7IHZhbHVlOiBfdm0ucmVnaXN0ZXJEYXRhLnBhc3N3b3JkIH0sXG4gICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgaW5wdXQ6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgaWYgKCRldmVudC50YXJnZXQuY29tcG9zaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgX3ZtLiRzZXQoX3ZtLnJlZ2lzdGVyRGF0YSwgXCJwYXNzd29yZFwiLCAkZXZlbnQudGFyZ2V0LnZhbHVlKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICBdKSxcbiAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgIF92bS5mb3JtRXJyb3JzLnBhc3N3b3JkXG4gICAgICAgICAgICA/IF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiaW52YWxpZC10ZXh0XCIgfSwgW1xuICAgICAgICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwibGVmdCBhcnJvd1wiIH0pLFxuICAgICAgICAgICAgICAgIF92bS5fdihfdm0uX3MoX3ZtLmZvcm1FcnJvcnMucGFzc3dvcmRbMF0pKVxuICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgOiBfdm0uX2UoKVxuICAgICAgICBdKSxcbiAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJmb3JtLWdyb3VwIHJlbGF0aXZlXCIgfSwgW1xuICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiZC1mbGV4XCIgfSwgW1xuICAgICAgICAgICAgX2MoXCJsYWJlbFwiLCB7IGF0dHJzOiB7IGZvcjogXCJcIiB9IH0sIFtfdm0uX3YoXCLQn9C+0LTRgtCy0LXRgNC20LTQtdC90LjQtVwiKV0pLFxuICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgIF9jKFwiaW5wdXRcIiwge1xuICAgICAgICAgICAgICBkaXJlY3RpdmVzOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgbmFtZTogXCJtb2RlbFwiLFxuICAgICAgICAgICAgICAgICAgcmF3TmFtZTogXCJ2LW1vZGVsXCIsXG4gICAgICAgICAgICAgICAgICB2YWx1ZTogX3ZtLnJlZ2lzdGVyRGF0YS5wYXNzd29yZF9jb25maXJtYXRpb24sXG4gICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcInJlZ2lzdGVyRGF0YS5wYXNzd29yZF9jb25maXJtYXRpb25cIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiZm9ybS1jb250cm9sXCIsXG4gICAgICAgICAgICAgIGNsYXNzOiB7IFwiaXMtaW52YWxpZFwiOiBfdm0uZm9ybUVycm9ycy5wYXNzd29yZF9jb25maXJtYXRpb24gfSxcbiAgICAgICAgICAgICAgYXR0cnM6IHsgdHlwZTogXCJwYXNzd29yZFwiLCBwbGFjZWhvbGRlcjogXCJcIiB9LFxuICAgICAgICAgICAgICBkb21Qcm9wczogeyB2YWx1ZTogX3ZtLnJlZ2lzdGVyRGF0YS5wYXNzd29yZF9jb25maXJtYXRpb24gfSxcbiAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICBpbnB1dDogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICBpZiAoJGV2ZW50LnRhcmdldC5jb21wb3NpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBfdm0uJHNldChcbiAgICAgICAgICAgICAgICAgICAgX3ZtLnJlZ2lzdGVyRGF0YSxcbiAgICAgICAgICAgICAgICAgICAgXCJwYXNzd29yZF9jb25maXJtYXRpb25cIixcbiAgICAgICAgICAgICAgICAgICAgJGV2ZW50LnRhcmdldC52YWx1ZVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICBdKSxcbiAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgIF92bS5mb3JtRXJyb3JzLnBhc3N3b3JkX2NvbmZpcm1hdGlvblxuICAgICAgICAgICAgPyBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImludmFsaWQtdGV4dFwiIH0sIFtcbiAgICAgICAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImxlZnQgYXJyb3dcIiB9KSxcbiAgICAgICAgICAgICAgICBfdm0uX3YoX3ZtLl9zKF92bS5mb3JtRXJyb3JzLnBhc3N3b3JkX2NvbmZpcm1hdGlvblswXSkpXG4gICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICA6IF92bS5fZSgpXG4gICAgICAgIF0pLFxuICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICBfdm0uJHN0b3JlLmdldHRlcnMubmVlZFNtc0NvbmZpcm1cbiAgICAgICAgICA/IF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiZm9ybS1ncm91cCByZWxhdGl2ZVwiIH0sIFtcbiAgICAgICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJkLWZsZXhcIiB9LCBbXG4gICAgICAgICAgICAgICAgX2MoXCJsYWJlbFwiLCB7fSwgW192bS5fdihcIlNNUyDQutC+0LRcIildKSxcbiAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgIF9jKFwiaW5wdXRcIiwge1xuICAgICAgICAgICAgICAgICAgZGlyZWN0aXZlczogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJtb2RlbFwiLFxuICAgICAgICAgICAgICAgICAgICAgIHJhd05hbWU6IFwidi1tb2RlbFwiLFxuICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBfdm0ucmVnaXN0ZXJEYXRhLnNtc19jb2RlLFxuICAgICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwicmVnaXN0ZXJEYXRhLnNtc19jb2RlXCJcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImZvcm0tY29udHJvbFwiLFxuICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgcGxhY2Vob2xkZXI6IFwiXCIgfSxcbiAgICAgICAgICAgICAgICAgIGRvbVByb3BzOiB7IHZhbHVlOiBfdm0ucmVnaXN0ZXJEYXRhLnNtc19jb2RlIH0sXG4gICAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgICBpbnB1dDogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgaWYgKCRldmVudC50YXJnZXQuY29tcG9zaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgX3ZtLiRzZXQoXG4gICAgICAgICAgICAgICAgICAgICAgICBfdm0ucmVnaXN0ZXJEYXRhLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJzbXNfY29kZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgJGV2ZW50LnRhcmdldC52YWx1ZVxuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICBdKVxuICAgICAgICAgIDogX3ZtLl9lKCksXG4gICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgIF9jKFxuICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJmb3JtLWdyb3VwXCIsIHN0YXRpY1N0eWxlOiB7IFwibWFyZ2luLXRvcFwiOiBcIjMwcHhcIiB9IH0sXG4gICAgICAgICAgW1xuICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgIFwiYnV0dG9uXCIsXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJidXR0b24gYXV0aF9idXR0XCIsXG4gICAgICAgICAgICAgICAgYXR0cnM6IHsgdHlwZTogXCJidXR0b25cIiB9LFxuICAgICAgICAgICAgICAgIG9uOiB7IGNsaWNrOiBfdm0ucmVnaXN0ZXIgfVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBbX3ZtLl92KFwi0JLQvtC50YLQuFwiKV1cbiAgICAgICAgICAgIClcbiAgICAgICAgICBdXG4gICAgICAgIClcbiAgICAgIF0pXG4gICAgXSlcbiAgXSlcbn1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXVxucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5cbmV4cG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0iLCJpbXBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IGZyb20gXCIuL0F1dGgudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTI5MzIwODk0JnNjb3BlZD10cnVlJlwiXG5pbXBvcnQgc2NyaXB0IGZyb20gXCIuL0F1dGgudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5leHBvcnQgKiBmcm9tIFwiLi9BdXRoLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuaW1wb3J0IHN0eWxlMCBmcm9tIFwiLi9BdXRoLnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmlkPTI5MzIwODk0JnNjb3BlZD10cnVlJmxhbmc9Y3NzJlwiXG5cblxuLyogbm9ybWFsaXplIGNvbXBvbmVudCAqL1xuaW1wb3J0IG5vcm1hbGl6ZXIgZnJvbSBcIiEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvcnVudGltZS9jb21wb25lbnROb3JtYWxpemVyLmpzXCJcbnZhciBjb21wb25lbnQgPSBub3JtYWxpemVyKFxuICBzY3JpcHQsXG4gIHJlbmRlcixcbiAgc3RhdGljUmVuZGVyRm5zLFxuICBmYWxzZSxcbiAgbnVsbCxcbiAgXCIyOTMyMDg5NFwiLFxuICBudWxsXG4gIFxuKVxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkge1xuICB2YXIgYXBpID0gcmVxdWlyZShcIkM6XFxcXE9wZW5TZXJ2ZXJcXFxcZG9tYWluc1xcXFxBdXRvQ1JNXFxcXG5vZGVfbW9kdWxlc1xcXFx2dWUtaG90LXJlbG9hZC1hcGlcXFxcZGlzdFxcXFxpbmRleC5qc1wiKVxuICBhcGkuaW5zdGFsbChyZXF1aXJlKCd2dWUnKSlcbiAgaWYgKGFwaS5jb21wYXRpYmxlKSB7XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICAgIGlmICghYXBpLmlzUmVjb3JkZWQoJzI5MzIwODk0JykpIHtcbiAgICAgIGFwaS5jcmVhdGVSZWNvcmQoJzI5MzIwODk0JywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZWxvYWQoJzI5MzIwODk0JywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfVxuICAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiLi9BdXRoLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD0yOTMyMDg5NCZzY29wZWQ9dHJ1ZSZcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgYXBpLnJlcmVuZGVyKCcyOTMyMDg5NCcsIHtcbiAgICAgICAgcmVuZGVyOiByZW5kZXIsXG4gICAgICAgIHN0YXRpY1JlbmRlckZuczogc3RhdGljUmVuZGVyRm5zXG4gICAgICB9KVxuICAgIH0pXG4gIH1cbn1cbmNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwicmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvYXV0aC9BdXRoLnZ1ZVwiXG5leHBvcnQgZGVmYXVsdCBjb21wb25lbnQuZXhwb3J0cyIsImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tNC0wIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vQXV0aC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tNC0wIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vQXV0aC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCIiLCJpbXBvcnQgbW9kIGZyb20gXCItIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvaW5kZXguanMhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tMTAtMSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy9zdHlsZVBvc3RMb2FkZXIuanMhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL3NyYy9pbmRleC5qcz8/cmVmLS0xMC0yIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vQXV0aC52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZpZD0yOTMyMDg5NCZzY29wZWQ9dHJ1ZSZsYW5nPWNzcyZcIjsgZXhwb3J0IGRlZmF1bHQgbW9kOyBleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTEwLTEhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvc3R5bGVQb3N0TG9hZGVyLmpzIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9zcmMvaW5kZXguanM/P3JlZi0tMTAtMiEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0F1dGgudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmaWQ9MjkzMjA4OTQmc2NvcGVkPXRydWUmbGFuZz1jc3MmXCIiLCJleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy90ZW1wbGF0ZUxvYWRlci5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vQXV0aC52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9MjkzMjA4OTQmc2NvcGVkPXRydWUmXCIiXSwic291cmNlUm9vdCI6IiJ9