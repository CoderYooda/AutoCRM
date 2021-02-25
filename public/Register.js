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
  beforeMount: function beforeMount() {},
  mounted: function mounted() {// this.$eventBus.$on('NoAuthEvent', ()=>{
    //     this.showLogin = true;
    // });
  },
  methods: {
    login: function login() {
      var _this = this;

      this.$store.dispatch('login', this.loginData).then(function () {
        _this.$router.push('/');
      });
    },
    register: function register() {
      var _this2 = this;

      this.$store.dispatch('register', this.registerData).then(function () {
        return _this2.$router.push('/');
      })["catch"](function (err) {
        console.log(_this2.$store.getters.need_sms_confirmation);
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
exports.push([module.i, "\n.sys_mess[data-v-29320894]{\n    background: #ea6a6a;\n    color: #fff;\n    border-radius: 3px;\n    padding: 6px 10px;\n}\n#auth_form[data-v-29320894]{\n    position: absolute;\n    top: 0;\n    z-index: 10169;\n    width: 100vw;\n    height: 100vh;\n    left: 0;\n    background: #2D76A8;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n}\n#auth_form form[data-v-29320894]{\n    margin: 0 auto;\n}\n.logo[data-v-29320894]{\n    background: url(/images/logo_bb.svg) center no-repeat;\n    height: 50px;\n}\n.action[data-v-29320894]{\n    text-align: center;\n    font-size: 18px;\n    margin-bottom: 15px;\n}\n.auth_butt[data-v-29320894]{\n    background-color: #2d76a8;\n    color: #fff;\n    border: 1px solid #4993c5;\n    border-radius: 3px;\n    margin: 0 auto;\n    display: block;\n}\n", ""]);

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
              class: {
                "is-invalid": !!_vm.$store.getters.register_errors.surname
              },
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
          !!_vm.$store.getters.register_errors.surname
            ? _c("div", { staticClass: "invalid-text" }, [
                _c("div", { staticClass: "left arrow" }),
                _vm._v(_vm._s(this.$store.getters.register_surname_error))
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
              class: {
                "is-invalid": !!_vm.$store.getters.register_errors.name
              },
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
          !!_vm.$store.getters.register_errors.name
            ? _c("div", { staticClass: "invalid-text" }, [
                _c("div", { staticClass: "left arrow" }),
                _vm._v(_vm._s(this.$store.getters.register_errors.name[0]))
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
              class: {
                "is-invalid": !!_vm.$store.getters.register_errors.patronymic
              },
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
          !!_vm.$store.getters.register_errors.patronymic
            ? _c("div", { staticClass: "invalid-text" }, [
                _c("div", { staticClass: "left arrow" }),
                _vm._v(
                  _vm._s(this.$store.getters.register_errors.patronymic[0])
                )
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
              class: {
                "is-invalid": !!_vm.$store.getters.register_errors.phone
              },
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
          !!_vm.$store.getters.register_errors.phone
            ? _c("div", { staticClass: "invalid-text" }, [
                _c("div", { staticClass: "left arrow" }),
                _vm._v(_vm._s(this.$store.getters.register_errors.phone[0]))
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
              class: {
                "is-invalid": !!_vm.$store.getters.register_errors.referal
              },
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
          !!_vm.$store.getters.register_errors.referal
            ? _c("div", { staticClass: "invalid-text" }, [
                _c("div", { staticClass: "left arrow" }),
                _vm._v(_vm._s(this.$store.getters.register_errors.referal[0]))
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
              class: {
                "is-invalid": !!_vm.$store.getters.register_errors.password
              },
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
          !!_vm.$store.getters.register_errors.password
            ? _c("div", { staticClass: "invalid-text" }, [
                _c("div", { staticClass: "left arrow" }),
                _vm._v(_vm._s(this.$store.getters.register_errors.password[0]))
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
              class: {
                "is-invalid": !!_vm.$store.getters.register_errors
                  .password_confirmation
              },
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
          !!_vm.$store.getters.register_errors.password_confirmation
            ? _c("div", { staticClass: "invalid-text" }, [
                _c("div", { staticClass: "left arrow" }),
                _vm._v(
                  _vm._s(
                    this.$store.getters.register_errors.password_confirmation[0]
                  )
                )
              ])
            : _vm._e()
        ]),
        _vm._v(" "),
        _vm.$store.getters.need_sms_confirmation
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
        !!_vm.$store.getters.auth_service_message
          ? _c("div", { staticClass: "form-group" }, [
              _c("div", { staticClass: "card sys_mess" }, [
                _vm._v(_vm._s(this.$store.getters.auth_service_message))
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvYXV0aC9BdXRoLnZ1ZSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvY29tcG9uZW50cy9hdXRoL0F1dGgudnVlPzhhYmIiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvYXV0aC9BdXRoLnZ1ZT8zZWMzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9qcy9jb21wb25lbnRzL2F1dGgvQXV0aC52dWU/OTk4OCIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvY29tcG9uZW50cy9hdXRoL0F1dGgudnVlIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9qcy9jb21wb25lbnRzL2F1dGgvQXV0aC52dWU/ZGEyOSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvY29tcG9uZW50cy9hdXRoL0F1dGgudnVlPzQyMWYiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvYXV0aC9BdXRoLnZ1ZT9lYWI3Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBeUVBO0FBQ0EsY0FEQTtBQUVBO0FBQ0E7QUFDQSxtR0FEQTtBQUVBO0FBQ0EsaUJBREE7QUFFQTtBQUZBLE9BRkE7QUFNQSwyQkFOQTtBQU9BO0FBQ0EsbUJBREE7QUFFQSxtQkFGQTtBQUdBLGdCQUhBO0FBSUEsc0JBSkE7QUFLQSxpQkFMQTtBQU1BLG9CQU5BO0FBT0EsaUNBUEE7QUFRQTtBQVJBLE9BUEE7QUFpQkE7QUFqQkE7QUFxQkEsR0F4QkE7QUF5QkEsYUF6QkEseUJBeUJBLENBQ0EsQ0ExQkE7QUEyQkEsU0EzQkEscUJBMkJBLENBQ0E7QUFDQTtBQUNBO0FBQ0EsR0EvQkE7QUFnQ0E7QUFDQTtBQUFBOztBQUNBLG9EQUNBLElBREEsQ0FDQTtBQUNB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QUNoRyxnQkFBZ0IsMkdBQVU7QUFDMUIsRUFBRSwwRUFBTTtBQUNSLEVBQUUsMkZBQU07QUFDUixFQUFFLG9HQUFlO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsSUFBSSxLQUFVLEVBQUUsWUFpQmY7QUFDRDtBQUNlLGdGOzs7Ozs7Ozs7Ozs7QUN2Q2Y7QUFBQTtBQUFBLHdDQUEwTCxDQUFnQixnUEFBRyxFQUFDLEM7Ozs7Ozs7Ozs7OztBQ0E5TTtBQUFBO0FBQUE7QUFBQTtBQUF1WSxDQUFnQixzWkFBRyxFQUFDLEM7Ozs7Ozs7Ozs7OztBQ0EzWjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEiLCJmaWxlIjoiUmVnaXN0ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyI8dGVtcGxhdGU+XG4gICAgPGRpdiBpZD1cImF1dGhfZm9ybVwiPlxuICAgICAgICA8Zm9ybSAgbWV0aG9kPVwicG9zdFwiIGFjdGlvbj1cIi9cIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJsb2dvXCI+PC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWN0aW9uIHRleHQtd2hpdGVcIj7QoNC10LPQuNGB0YLRgNCw0YbQuNGPPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwibC1yLXNpZGVkXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXAgcmVsYXRpdmVcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImQtZmxleFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzPVwiXCIgZm9yPVwiXCI+0KTQsNC80LjQu9C40Y88L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHYtbW9kZWw9XCJyZWdpc3RlckRhdGEuc3VybmFtZVwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgdi1iaW5kOmNsYXNzPVwieydpcy1pbnZhbGlkJyA6ICEhJHN0b3JlLmdldHRlcnMucmVnaXN0ZXJfZXJyb3JzLnN1cm5hbWV9XCIgcGxhY2Vob2xkZXI9XCJcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiB2LWlmPVwiISEkc3RvcmUuZ2V0dGVycy5yZWdpc3Rlcl9lcnJvcnMuc3VybmFtZVwiIGNsYXNzPVwiaW52YWxpZC10ZXh0XCI+PGRpdiBjbGFzcz1cImxlZnQgYXJyb3dcIj48L2Rpdj57eyB0aGlzLiRzdG9yZS5nZXR0ZXJzLnJlZ2lzdGVyX3N1cm5hbWVfZXJyb3IgfX08L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cCByZWxhdGl2ZVwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZC1mbGV4XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJcIiBmb3I9XCJcIj7QmNC80Y88L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHYtbW9kZWw9XCJyZWdpc3RlckRhdGEubmFtZVwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgdi1iaW5kOmNsYXNzPVwieyAnaXMtaW52YWxpZCc6ICEhJHN0b3JlLmdldHRlcnMucmVnaXN0ZXJfZXJyb3JzLm5hbWUgfVwiIHBsYWNlaG9sZGVyPVwiXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgdi1pZj1cIiEhJHN0b3JlLmdldHRlcnMucmVnaXN0ZXJfZXJyb3JzLm5hbWVcIiBjbGFzcz1cImludmFsaWQtdGV4dFwiPjxkaXYgY2xhc3M9XCJsZWZ0IGFycm93XCI+PC9kaXY+e3sgdGhpcy4kc3RvcmUuZ2V0dGVycy5yZWdpc3Rlcl9lcnJvcnMubmFtZVswXSB9fTwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwIHJlbGF0aXZlXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkLWZsZXhcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzcz1cIlwiIGZvcj1cIlwiPtCe0YLRh9C10YHRgtCy0L48L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHYtbW9kZWw9XCJyZWdpc3RlckRhdGEucGF0cm9ueW1pY1wiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgdi1iaW5kOmNsYXNzPVwieyAnaXMtaW52YWxpZCc6ICEhJHN0b3JlLmdldHRlcnMucmVnaXN0ZXJfZXJyb3JzLnBhdHJvbnltaWMgfVwiIHBsYWNlaG9sZGVyPVwiXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgdi1pZj1cIiEhJHN0b3JlLmdldHRlcnMucmVnaXN0ZXJfZXJyb3JzLnBhdHJvbnltaWNcIiBjbGFzcz1cImludmFsaWQtdGV4dFwiPjxkaXYgY2xhc3M9XCJsZWZ0IGFycm93XCI+PC9kaXY+e3sgdGhpcy4kc3RvcmUuZ2V0dGVycy5yZWdpc3Rlcl9lcnJvcnMucGF0cm9ueW1pY1swXSB9fTwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwIHJlbGF0aXZlXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkLWZsZXhcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzcz1cIlwiIGZvcj1cIlwiPtCd0L7QvNC10YAg0YLQtdC70LXRhNC+0L3QsDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdi1tb2RlbD1cInJlZ2lzdGVyRGF0YS5waG9uZVwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgdi1tYXNrPVwicGhvbmVNYXNrXCIgdi1iaW5kOmNsYXNzPVwieyAnaXMtaW52YWxpZCc6ICEhJHN0b3JlLmdldHRlcnMucmVnaXN0ZXJfZXJyb3JzLnBob25lIH1cIiBwbGFjZWhvbGRlcj1cIlwiIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHYtaWY9XCIhISRzdG9yZS5nZXR0ZXJzLnJlZ2lzdGVyX2Vycm9ycy5waG9uZVwiIGNsYXNzPVwiaW52YWxpZC10ZXh0XCI+PGRpdiBjbGFzcz1cImxlZnQgYXJyb3dcIj48L2Rpdj57eyB0aGlzLiRzdG9yZS5nZXR0ZXJzLnJlZ2lzdGVyX2Vycm9ycy5waG9uZVswXSB9fTwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwIHJlbGF0aXZlXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkLWZsZXhcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzcz1cIlwiIGZvcj1cIlwiPtCg0LXRhNC10YDQsNC70YzQvdGL0Lkg0LrQvtC0PC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB2LW1vZGVsPVwicmVnaXN0ZXJEYXRhLnJlZmVyYWxcIiB2LWJpbmQ6Y2xhc3M9XCJ7ICdpcy1pbnZhbGlkJzogISEkc3RvcmUuZ2V0dGVycy5yZWdpc3Rlcl9lcnJvcnMucmVmZXJhbCB9XCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBwbGFjZWhvbGRlcj1cIlwiIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHYtaWY9XCIhISRzdG9yZS5nZXR0ZXJzLnJlZ2lzdGVyX2Vycm9ycy5yZWZlcmFsXCIgY2xhc3M9XCJpbnZhbGlkLXRleHRcIj48ZGl2IGNsYXNzPVwibGVmdCBhcnJvd1wiPjwvZGl2Pnt7IHRoaXMuJHN0b3JlLmdldHRlcnMucmVnaXN0ZXJfZXJyb3JzLnJlZmVyYWxbMF0gfX08L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cCByZWxhdGl2ZVwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZC1mbGV4XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJcIiBmb3I9XCJcIj7Qn9Cw0YDQvtC70Yw8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHYtbW9kZWw9XCJyZWdpc3RlckRhdGEucGFzc3dvcmRcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiIHR5cGU9XCJwYXNzd29yZFwiIHYtYmluZDpjbGFzcz1cInsgJ2lzLWludmFsaWQnOiAhISRzdG9yZS5nZXR0ZXJzLnJlZ2lzdGVyX2Vycm9ycy5wYXNzd29yZCB9XCIgcGxhY2Vob2xkZXI9XCJcIj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgdi1pZj1cIiEhJHN0b3JlLmdldHRlcnMucmVnaXN0ZXJfZXJyb3JzLnBhc3N3b3JkXCIgY2xhc3M9XCJpbnZhbGlkLXRleHRcIj48ZGl2IGNsYXNzPVwibGVmdCBhcnJvd1wiPjwvZGl2Pnt7IHRoaXMuJHN0b3JlLmdldHRlcnMucmVnaXN0ZXJfZXJyb3JzLnBhc3N3b3JkWzBdIH19PC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXAgcmVsYXRpdmVcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImQtZmxleFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzPVwiXCIgZm9yPVwiXCI+0J/QvtC00YLQstC10YDQttC00LXQvdC40LU8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHYtbW9kZWw9XCJyZWdpc3RlckRhdGEucGFzc3dvcmRfY29uZmlybWF0aW9uXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiB0eXBlPVwicGFzc3dvcmRcIiB2LWJpbmQ6Y2xhc3M9XCJ7ICdpcy1pbnZhbGlkJzogISEkc3RvcmUuZ2V0dGVycy5yZWdpc3Rlcl9lcnJvcnMucGFzc3dvcmRfY29uZmlybWF0aW9uIH1cInBsYWNlaG9sZGVyPVwiXCI+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHYtaWY9XCIhISRzdG9yZS5nZXR0ZXJzLnJlZ2lzdGVyX2Vycm9ycy5wYXNzd29yZF9jb25maXJtYXRpb25cIiBjbGFzcz1cImludmFsaWQtdGV4dFwiPjxkaXYgY2xhc3M9XCJsZWZ0IGFycm93XCI+PC9kaXY+e3sgdGhpcy4kc3RvcmUuZ2V0dGVycy5yZWdpc3Rlcl9lcnJvcnMucGFzc3dvcmRfY29uZmlybWF0aW9uWzBdIH19PC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiB2LWlmPVwiJHN0b3JlLmdldHRlcnMubmVlZF9zbXNfY29uZmlybWF0aW9uXCIgY2xhc3M9XCJmb3JtLWdyb3VwIHJlbGF0aXZlXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkLWZsZXhcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzcz1cIlwiID5TTVMg0LrQvtC0PC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB2LW1vZGVsPVwicmVnaXN0ZXJEYXRhLnNtc19jb2RlXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBwbGFjZWhvbGRlcj1cIlwiPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IHYtaWY9XCIhISRzdG9yZS5nZXR0ZXJzLmF1dGhfc2VydmljZV9tZXNzYWdlXCIgY2xhc3M9XCJmb3JtLWdyb3VwXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkIHN5c19tZXNzXCI+e3sgdGhpcy4kc3RvcmUuZ2V0dGVycy5hdXRoX3NlcnZpY2VfbWVzc2FnZSB9fTwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCIgc3R5bGU9XCJtYXJnaW4tdG9wOiAzMHB4XCI+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnV0dG9uIGF1dGhfYnV0dFwiIHYtb246Y2xpY2s9XCJyZWdpc3RlclwiPtCS0L7QudGC0Lg8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Zvcm0+XG4gICAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuICAgIGV4cG9ydCBkZWZhdWx0IHtcbiAgICAgICAgbmFtZTogXCJBdXRoXCIsXG4gICAgICAgIGRhdGE6ICgpPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBwaG9uZU1hc2s6IFsnKzcnLCAnKCcsIC9cXGQvLCAvXFxkLywgL1xcZC8sICcpICcsIC9cXGQvLCAvXFxkLywgL1xcZC8sICctJywgL1xcZC8sIC9cXGQvLCAvXFxkLywgL1xcZC9dLFxuICAgICAgICAgICAgICAgIGxvZ2luRGF0YToge1xuICAgICAgICAgICAgICAgICAgICBwaG9uZTonJyxcbiAgICAgICAgICAgICAgICAgICAgcGFzc3dvcmQ6JycsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBuZWVkU21zQ29uZmlybTpmYWxzZSxcbiAgICAgICAgICAgICAgICByZWdpc3RlckRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgcmVmZXJhbDogJycsXG4gICAgICAgICAgICAgICAgICAgIHN1cm5hbWU6ICcnLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiAnJyxcbiAgICAgICAgICAgICAgICAgICAgcGF0cm9ueW1pYzogJycsXG4gICAgICAgICAgICAgICAgICAgIHBob25lOicnLFxuICAgICAgICAgICAgICAgICAgICBwYXNzd29yZDonJyxcbiAgICAgICAgICAgICAgICAgICAgcGFzc3dvcmRfY29uZmlybWF0aW9uOicnLFxuICAgICAgICAgICAgICAgICAgICBzbXNfY29kZTonJyxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGZvcm1FcnJvcnM6e1xuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBiZWZvcmVNb3VudCgpe1xuICAgICAgICB9LFxuICAgICAgICBtb3VudGVkKCkge1xuICAgICAgICAgICAgLy8gdGhpcy4kZXZlbnRCdXMuJG9uKCdOb0F1dGhFdmVudCcsICgpPT57XG4gICAgICAgICAgICAvLyAgICAgdGhpcy5zaG93TG9naW4gPSB0cnVlO1xuICAgICAgICAgICAgLy8gfSk7XG4gICAgICAgIH0sXG4gICAgICAgIG1ldGhvZHM6e1xuICAgICAgICAgICAgbG9naW46IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRzdG9yZS5kaXNwYXRjaCgnbG9naW4nLCB0aGlzLmxvZ2luRGF0YSlcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kcm91dGVyLnB1c2goJy8nKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmVnaXN0ZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRzdG9yZS5kaXNwYXRjaCgncmVnaXN0ZXInLCB0aGlzLnJlZ2lzdGVyRGF0YSlcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4gdGhpcy4kcm91dGVyLnB1c2goJy8nKSkuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy4kc3RvcmUuZ2V0dGVycy5uZWVkX3Ntc19jb25maXJtYXRpb24pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfVxuICAgIH1cbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuICAgIC5zeXNfbWVzc3tcbiAgICAgICAgYmFja2dyb3VuZDogI2VhNmE2YTtcbiAgICAgICAgY29sb3I6ICNmZmY7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDNweDtcbiAgICAgICAgcGFkZGluZzogNnB4IDEwcHg7XG4gICAgfVxuICAgICNhdXRoX2Zvcm17XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgdG9wOiAwO1xuICAgICAgICB6LWluZGV4OiAxMDE2OTtcbiAgICAgICAgd2lkdGg6IDEwMHZ3O1xuICAgICAgICBoZWlnaHQ6IDEwMHZoO1xuICAgICAgICBsZWZ0OiAwO1xuICAgICAgICBiYWNrZ3JvdW5kOiAjMkQ3NkE4O1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICB9XG4gICAgI2F1dGhfZm9ybSBmb3Jte1xuICAgICAgICBtYXJnaW46IDAgYXV0bztcbiAgICB9XG4gICAgLmxvZ297XG4gICAgICAgIGJhY2tncm91bmQ6IHVybCgvaW1hZ2VzL2xvZ29fYmIuc3ZnKSBjZW50ZXIgbm8tcmVwZWF0O1xuICAgICAgICBoZWlnaHQ6IDUwcHg7XG4gICAgfVxuICAgIC5hY3Rpb257XG4gICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgICAgZm9udC1zaXplOiAxOHB4O1xuICAgICAgICBtYXJnaW4tYm90dG9tOiAxNXB4O1xuICAgIH1cbiAgICAuYXV0aF9idXR0e1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMmQ3NmE4O1xuICAgICAgICBjb2xvcjogI2ZmZjtcbiAgICAgICAgYm9yZGVyOiAxcHggc29saWQgIzQ5OTNjNTtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogM3B4O1xuICAgICAgICBtYXJnaW46IDAgYXV0bztcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgfVxuPC9zdHlsZT5cbiIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoZmFsc2UpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiXFxuLnN5c19tZXNzW2RhdGEtdi0yOTMyMDg5NF17XFxuICAgIGJhY2tncm91bmQ6ICNlYTZhNmE7XFxuICAgIGNvbG9yOiAjZmZmO1xcbiAgICBib3JkZXItcmFkaXVzOiAzcHg7XFxuICAgIHBhZGRpbmc6IDZweCAxMHB4O1xcbn1cXG4jYXV0aF9mb3JtW2RhdGEtdi0yOTMyMDg5NF17XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdG9wOiAwO1xcbiAgICB6LWluZGV4OiAxMDE2OTtcXG4gICAgd2lkdGg6IDEwMHZ3O1xcbiAgICBoZWlnaHQ6IDEwMHZoO1xcbiAgICBsZWZ0OiAwO1xcbiAgICBiYWNrZ3JvdW5kOiAjMkQ3NkE4O1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG59XFxuI2F1dGhfZm9ybSBmb3JtW2RhdGEtdi0yOTMyMDg5NF17XFxuICAgIG1hcmdpbjogMCBhdXRvO1xcbn1cXG4ubG9nb1tkYXRhLXYtMjkzMjA4OTRde1xcbiAgICBiYWNrZ3JvdW5kOiB1cmwoL2ltYWdlcy9sb2dvX2JiLnN2ZykgY2VudGVyIG5vLXJlcGVhdDtcXG4gICAgaGVpZ2h0OiA1MHB4O1xcbn1cXG4uYWN0aW9uW2RhdGEtdi0yOTMyMDg5NF17XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICAgZm9udC1zaXplOiAxOHB4O1xcbiAgICBtYXJnaW4tYm90dG9tOiAxNXB4O1xcbn1cXG4uYXV0aF9idXR0W2RhdGEtdi0yOTMyMDg5NF17XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICMyZDc2YTg7XFxuICAgIGNvbG9yOiAjZmZmO1xcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjNDk5M2M1O1xcbiAgICBib3JkZXItcmFkaXVzOiAzcHg7XFxuICAgIG1hcmdpbjogMCBhdXRvO1xcbiAgICBkaXNwbGF5OiBibG9jaztcXG59XFxuXCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuIiwiXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTEwLTEhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvc3R5bGVQb3N0TG9hZGVyLmpzIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9zcmMvaW5kZXguanM/P3JlZi0tMTAtMiEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0F1dGgudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmaWQ9MjkzMjA4OTQmc2NvcGVkPXRydWUmbGFuZz1jc3MmXCIpO1xuXG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcblxudmFyIHRyYW5zZm9ybTtcbnZhciBpbnNlcnRJbnRvO1xuXG5cblxudmFyIG9wdGlvbnMgPSB7XCJobXJcIjp0cnVlfVxuXG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxub3B0aW9ucy5pbnNlcnRJbnRvID0gdW5kZWZpbmVkO1xuXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcIikoY29udGVudCwgb3B0aW9ucyk7XG5cbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuXG5pZihtb2R1bGUuaG90KSB7XG5cdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0xMC0xIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3N0eWxlUG9zdExvYWRlci5qcyEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvc3JjL2luZGV4LmpzPz9yZWYtLTEwLTIhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9BdXRoLnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmlkPTI5MzIwODk0JnNjb3BlZD10cnVlJmxhbmc9Y3NzJlwiLCBmdW5jdGlvbigpIHtcblx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTEwLTEhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvc3R5bGVQb3N0TG9hZGVyLmpzIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9zcmMvaW5kZXguanM/P3JlZi0tMTAtMiEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0F1dGgudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmaWQ9MjkzMjA4OTQmc2NvcGVkPXRydWUmbGFuZz1jc3MmXCIpO1xuXG5cdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cblx0XHR2YXIgbG9jYWxzID0gKGZ1bmN0aW9uKGEsIGIpIHtcblx0XHRcdHZhciBrZXksIGlkeCA9IDA7XG5cblx0XHRcdGZvcihrZXkgaW4gYSkge1xuXHRcdFx0XHRpZighYiB8fCBhW2tleV0gIT09IGJba2V5XSkgcmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRpZHgrKztcblx0XHRcdH1cblxuXHRcdFx0Zm9yKGtleSBpbiBiKSBpZHgtLTtcblxuXHRcdFx0cmV0dXJuIGlkeCA9PT0gMDtcblx0XHR9KGNvbnRlbnQubG9jYWxzLCBuZXdDb250ZW50LmxvY2FscykpO1xuXG5cdFx0aWYoIWxvY2FscykgdGhyb3cgbmV3IEVycm9yKCdBYm9ydGluZyBDU1MgSE1SIGR1ZSB0byBjaGFuZ2VkIGNzcy1tb2R1bGVzIGxvY2Fscy4nKTtcblxuXHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0fSk7XG5cblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59IiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgX3ZtID0gdGhpc1xuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gIHJldHVybiBfYyhcImRpdlwiLCB7IGF0dHJzOiB7IGlkOiBcImF1dGhfZm9ybVwiIH0gfSwgW1xuICAgIF9jKFwiZm9ybVwiLCB7IGF0dHJzOiB7IG1ldGhvZDogXCJwb3N0XCIsIGFjdGlvbjogXCIvXCIgfSB9LCBbXG4gICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImxvZ29cIiB9KSxcbiAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImFjdGlvbiB0ZXh0LXdoaXRlXCIgfSwgW192bS5fdihcItCg0LXQs9C40YHRgtGA0LDRhtC40Y9cIildKSxcbiAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImwtci1zaWRlZFwiIH0sIFtcbiAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJmb3JtLWdyb3VwIHJlbGF0aXZlXCIgfSwgW1xuICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiZC1mbGV4XCIgfSwgW1xuICAgICAgICAgICAgX2MoXCJsYWJlbFwiLCB7IGF0dHJzOiB7IGZvcjogXCJcIiB9IH0sIFtfdm0uX3YoXCLQpNCw0LzQuNC70LjRj1wiKV0pLFxuICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgIF9jKFwiaW5wdXRcIiwge1xuICAgICAgICAgICAgICBkaXJlY3RpdmVzOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgbmFtZTogXCJtb2RlbFwiLFxuICAgICAgICAgICAgICAgICAgcmF3TmFtZTogXCJ2LW1vZGVsXCIsXG4gICAgICAgICAgICAgICAgICB2YWx1ZTogX3ZtLnJlZ2lzdGVyRGF0YS5zdXJuYW1lLFxuICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCJyZWdpc3RlckRhdGEuc3VybmFtZVwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJmb3JtLWNvbnRyb2xcIixcbiAgICAgICAgICAgICAgY2xhc3M6IHtcbiAgICAgICAgICAgICAgICBcImlzLWludmFsaWRcIjogISFfdm0uJHN0b3JlLmdldHRlcnMucmVnaXN0ZXJfZXJyb3JzLnN1cm5hbWVcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgYXR0cnM6IHsgcGxhY2Vob2xkZXI6IFwiXCIgfSxcbiAgICAgICAgICAgICAgZG9tUHJvcHM6IHsgdmFsdWU6IF92bS5yZWdpc3RlckRhdGEuc3VybmFtZSB9LFxuICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgIGlucHV0OiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgIGlmICgkZXZlbnQudGFyZ2V0LmNvbXBvc2luZykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIF92bS4kc2V0KF92bS5yZWdpc3RlckRhdGEsIFwic3VybmFtZVwiLCAkZXZlbnQudGFyZ2V0LnZhbHVlKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICBdKSxcbiAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICEhX3ZtLiRzdG9yZS5nZXR0ZXJzLnJlZ2lzdGVyX2Vycm9ycy5zdXJuYW1lXG4gICAgICAgICAgICA/IF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiaW52YWxpZC10ZXh0XCIgfSwgW1xuICAgICAgICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwibGVmdCBhcnJvd1wiIH0pLFxuICAgICAgICAgICAgICAgIF92bS5fdihfdm0uX3ModGhpcy4kc3RvcmUuZ2V0dGVycy5yZWdpc3Rlcl9zdXJuYW1lX2Vycm9yKSlcbiAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgIDogX3ZtLl9lKClcbiAgICAgICAgXSksXG4gICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiZm9ybS1ncm91cCByZWxhdGl2ZVwiIH0sIFtcbiAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImQtZmxleFwiIH0sIFtcbiAgICAgICAgICAgIF9jKFwibGFiZWxcIiwgeyBhdHRyczogeyBmb3I6IFwiXCIgfSB9LCBbX3ZtLl92KFwi0JjQvNGPXCIpXSksXG4gICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgX2MoXCJpbnB1dFwiLCB7XG4gICAgICAgICAgICAgIGRpcmVjdGl2ZXM6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBuYW1lOiBcIm1vZGVsXCIsXG4gICAgICAgICAgICAgICAgICByYXdOYW1lOiBcInYtbW9kZWxcIixcbiAgICAgICAgICAgICAgICAgIHZhbHVlOiBfdm0ucmVnaXN0ZXJEYXRhLm5hbWUsXG4gICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcInJlZ2lzdGVyRGF0YS5uYW1lXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImZvcm0tY29udHJvbFwiLFxuICAgICAgICAgICAgICBjbGFzczoge1xuICAgICAgICAgICAgICAgIFwiaXMtaW52YWxpZFwiOiAhIV92bS4kc3RvcmUuZ2V0dGVycy5yZWdpc3Rlcl9lcnJvcnMubmFtZVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBhdHRyczogeyBwbGFjZWhvbGRlcjogXCJcIiB9LFxuICAgICAgICAgICAgICBkb21Qcm9wczogeyB2YWx1ZTogX3ZtLnJlZ2lzdGVyRGF0YS5uYW1lIH0sXG4gICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgaW5wdXQ6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgaWYgKCRldmVudC50YXJnZXQuY29tcG9zaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgX3ZtLiRzZXQoX3ZtLnJlZ2lzdGVyRGF0YSwgXCJuYW1lXCIsICRldmVudC50YXJnZXQudmFsdWUpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIF0pLFxuICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgISFfdm0uJHN0b3JlLmdldHRlcnMucmVnaXN0ZXJfZXJyb3JzLm5hbWVcbiAgICAgICAgICAgID8gX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJpbnZhbGlkLXRleHRcIiB9LCBbXG4gICAgICAgICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJsZWZ0IGFycm93XCIgfSksXG4gICAgICAgICAgICAgICAgX3ZtLl92KF92bS5fcyh0aGlzLiRzdG9yZS5nZXR0ZXJzLnJlZ2lzdGVyX2Vycm9ycy5uYW1lWzBdKSlcbiAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgIDogX3ZtLl9lKClcbiAgICAgICAgXSksXG4gICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiZm9ybS1ncm91cCByZWxhdGl2ZVwiIH0sIFtcbiAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImQtZmxleFwiIH0sIFtcbiAgICAgICAgICAgIF9jKFwibGFiZWxcIiwgeyBhdHRyczogeyBmb3I6IFwiXCIgfSB9LCBbX3ZtLl92KFwi0J7RgtGH0LXRgdGC0LLQvlwiKV0pLFxuICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgIF9jKFwiaW5wdXRcIiwge1xuICAgICAgICAgICAgICBkaXJlY3RpdmVzOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgbmFtZTogXCJtb2RlbFwiLFxuICAgICAgICAgICAgICAgICAgcmF3TmFtZTogXCJ2LW1vZGVsXCIsXG4gICAgICAgICAgICAgICAgICB2YWx1ZTogX3ZtLnJlZ2lzdGVyRGF0YS5wYXRyb255bWljLFxuICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCJyZWdpc3RlckRhdGEucGF0cm9ueW1pY1wiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJmb3JtLWNvbnRyb2xcIixcbiAgICAgICAgICAgICAgY2xhc3M6IHtcbiAgICAgICAgICAgICAgICBcImlzLWludmFsaWRcIjogISFfdm0uJHN0b3JlLmdldHRlcnMucmVnaXN0ZXJfZXJyb3JzLnBhdHJvbnltaWNcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgYXR0cnM6IHsgcGxhY2Vob2xkZXI6IFwiXCIgfSxcbiAgICAgICAgICAgICAgZG9tUHJvcHM6IHsgdmFsdWU6IF92bS5yZWdpc3RlckRhdGEucGF0cm9ueW1pYyB9LFxuICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgIGlucHV0OiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgIGlmICgkZXZlbnQudGFyZ2V0LmNvbXBvc2luZykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIF92bS4kc2V0KF92bS5yZWdpc3RlckRhdGEsIFwicGF0cm9ueW1pY1wiLCAkZXZlbnQudGFyZ2V0LnZhbHVlKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICBdKSxcbiAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICEhX3ZtLiRzdG9yZS5nZXR0ZXJzLnJlZ2lzdGVyX2Vycm9ycy5wYXRyb255bWljXG4gICAgICAgICAgICA/IF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiaW52YWxpZC10ZXh0XCIgfSwgW1xuICAgICAgICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwibGVmdCBhcnJvd1wiIH0pLFxuICAgICAgICAgICAgICAgIF92bS5fdihcbiAgICAgICAgICAgICAgICAgIF92bS5fcyh0aGlzLiRzdG9yZS5nZXR0ZXJzLnJlZ2lzdGVyX2Vycm9ycy5wYXRyb255bWljWzBdKVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgIDogX3ZtLl9lKClcbiAgICAgICAgXSksXG4gICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiZm9ybS1ncm91cCByZWxhdGl2ZVwiIH0sIFtcbiAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImQtZmxleFwiIH0sIFtcbiAgICAgICAgICAgIF9jKFwibGFiZWxcIiwgeyBhdHRyczogeyBmb3I6IFwiXCIgfSB9LCBbX3ZtLl92KFwi0J3QvtC80LXRgCDRgtC10LvQtdGE0L7QvdCwXCIpXSksXG4gICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgX2MoXCJpbnB1dFwiLCB7XG4gICAgICAgICAgICAgIGRpcmVjdGl2ZXM6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBuYW1lOiBcIm1vZGVsXCIsXG4gICAgICAgICAgICAgICAgICByYXdOYW1lOiBcInYtbW9kZWxcIixcbiAgICAgICAgICAgICAgICAgIHZhbHVlOiBfdm0ucmVnaXN0ZXJEYXRhLnBob25lLFxuICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCJyZWdpc3RlckRhdGEucGhvbmVcIlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgbmFtZTogXCJtYXNrXCIsXG4gICAgICAgICAgICAgICAgICByYXdOYW1lOiBcInYtbWFza1wiLFxuICAgICAgICAgICAgICAgICAgdmFsdWU6IF92bS5waG9uZU1hc2ssXG4gICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcInBob25lTWFza1wiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJmb3JtLWNvbnRyb2xcIixcbiAgICAgICAgICAgICAgY2xhc3M6IHtcbiAgICAgICAgICAgICAgICBcImlzLWludmFsaWRcIjogISFfdm0uJHN0b3JlLmdldHRlcnMucmVnaXN0ZXJfZXJyb3JzLnBob25lXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIGF0dHJzOiB7IHBsYWNlaG9sZGVyOiBcIlwiIH0sXG4gICAgICAgICAgICAgIGRvbVByb3BzOiB7IHZhbHVlOiBfdm0ucmVnaXN0ZXJEYXRhLnBob25lIH0sXG4gICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgaW5wdXQ6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgaWYgKCRldmVudC50YXJnZXQuY29tcG9zaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgX3ZtLiRzZXQoX3ZtLnJlZ2lzdGVyRGF0YSwgXCJwaG9uZVwiLCAkZXZlbnQudGFyZ2V0LnZhbHVlKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICBdKSxcbiAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICEhX3ZtLiRzdG9yZS5nZXR0ZXJzLnJlZ2lzdGVyX2Vycm9ycy5waG9uZVxuICAgICAgICAgICAgPyBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImludmFsaWQtdGV4dFwiIH0sIFtcbiAgICAgICAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImxlZnQgYXJyb3dcIiB9KSxcbiAgICAgICAgICAgICAgICBfdm0uX3YoX3ZtLl9zKHRoaXMuJHN0b3JlLmdldHRlcnMucmVnaXN0ZXJfZXJyb3JzLnBob25lWzBdKSlcbiAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgIDogX3ZtLl9lKClcbiAgICAgICAgXSksXG4gICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiZm9ybS1ncm91cCByZWxhdGl2ZVwiIH0sIFtcbiAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImQtZmxleFwiIH0sIFtcbiAgICAgICAgICAgIF9jKFwibGFiZWxcIiwgeyBhdHRyczogeyBmb3I6IFwiXCIgfSB9LCBbX3ZtLl92KFwi0KDQtdGE0LXRgNCw0LvRjNC90YvQuSDQutC+0LRcIildKSxcbiAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICBfYyhcImlucHV0XCIsIHtcbiAgICAgICAgICAgICAgZGlyZWN0aXZlczogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIG5hbWU6IFwibW9kZWxcIixcbiAgICAgICAgICAgICAgICAgIHJhd05hbWU6IFwidi1tb2RlbFwiLFxuICAgICAgICAgICAgICAgICAgdmFsdWU6IF92bS5yZWdpc3RlckRhdGEucmVmZXJhbCxcbiAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwicmVnaXN0ZXJEYXRhLnJlZmVyYWxcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiZm9ybS1jb250cm9sXCIsXG4gICAgICAgICAgICAgIGNsYXNzOiB7XG4gICAgICAgICAgICAgICAgXCJpcy1pbnZhbGlkXCI6ICEhX3ZtLiRzdG9yZS5nZXR0ZXJzLnJlZ2lzdGVyX2Vycm9ycy5yZWZlcmFsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIGF0dHJzOiB7IHBsYWNlaG9sZGVyOiBcIlwiIH0sXG4gICAgICAgICAgICAgIGRvbVByb3BzOiB7IHZhbHVlOiBfdm0ucmVnaXN0ZXJEYXRhLnJlZmVyYWwgfSxcbiAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICBpbnB1dDogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICBpZiAoJGV2ZW50LnRhcmdldC5jb21wb3NpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBfdm0uJHNldChfdm0ucmVnaXN0ZXJEYXRhLCBcInJlZmVyYWxcIiwgJGV2ZW50LnRhcmdldC52YWx1ZSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgXSksXG4gICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAhIV92bS4kc3RvcmUuZ2V0dGVycy5yZWdpc3Rlcl9lcnJvcnMucmVmZXJhbFxuICAgICAgICAgICAgPyBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImludmFsaWQtdGV4dFwiIH0sIFtcbiAgICAgICAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImxlZnQgYXJyb3dcIiB9KSxcbiAgICAgICAgICAgICAgICBfdm0uX3YoX3ZtLl9zKHRoaXMuJHN0b3JlLmdldHRlcnMucmVnaXN0ZXJfZXJyb3JzLnJlZmVyYWxbMF0pKVxuICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgOiBfdm0uX2UoKVxuICAgICAgICBdKSxcbiAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJmb3JtLWdyb3VwIHJlbGF0aXZlXCIgfSwgW1xuICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiZC1mbGV4XCIgfSwgW1xuICAgICAgICAgICAgX2MoXCJsYWJlbFwiLCB7IGF0dHJzOiB7IGZvcjogXCJcIiB9IH0sIFtfdm0uX3YoXCLQn9Cw0YDQvtC70YxcIildKSxcbiAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICBfYyhcImlucHV0XCIsIHtcbiAgICAgICAgICAgICAgZGlyZWN0aXZlczogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIG5hbWU6IFwibW9kZWxcIixcbiAgICAgICAgICAgICAgICAgIHJhd05hbWU6IFwidi1tb2RlbFwiLFxuICAgICAgICAgICAgICAgICAgdmFsdWU6IF92bS5yZWdpc3RlckRhdGEucGFzc3dvcmQsXG4gICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcInJlZ2lzdGVyRGF0YS5wYXNzd29yZFwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJmb3JtLWNvbnRyb2xcIixcbiAgICAgICAgICAgICAgY2xhc3M6IHtcbiAgICAgICAgICAgICAgICBcImlzLWludmFsaWRcIjogISFfdm0uJHN0b3JlLmdldHRlcnMucmVnaXN0ZXJfZXJyb3JzLnBhc3N3b3JkXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIGF0dHJzOiB7IHR5cGU6IFwicGFzc3dvcmRcIiwgcGxhY2Vob2xkZXI6IFwiXCIgfSxcbiAgICAgICAgICAgICAgZG9tUHJvcHM6IHsgdmFsdWU6IF92bS5yZWdpc3RlckRhdGEucGFzc3dvcmQgfSxcbiAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICBpbnB1dDogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICBpZiAoJGV2ZW50LnRhcmdldC5jb21wb3NpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBfdm0uJHNldChfdm0ucmVnaXN0ZXJEYXRhLCBcInBhc3N3b3JkXCIsICRldmVudC50YXJnZXQudmFsdWUpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIF0pLFxuICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgISFfdm0uJHN0b3JlLmdldHRlcnMucmVnaXN0ZXJfZXJyb3JzLnBhc3N3b3JkXG4gICAgICAgICAgICA/IF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiaW52YWxpZC10ZXh0XCIgfSwgW1xuICAgICAgICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwibGVmdCBhcnJvd1wiIH0pLFxuICAgICAgICAgICAgICAgIF92bS5fdihfdm0uX3ModGhpcy4kc3RvcmUuZ2V0dGVycy5yZWdpc3Rlcl9lcnJvcnMucGFzc3dvcmRbMF0pKVxuICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgOiBfdm0uX2UoKVxuICAgICAgICBdKSxcbiAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJmb3JtLWdyb3VwIHJlbGF0aXZlXCIgfSwgW1xuICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiZC1mbGV4XCIgfSwgW1xuICAgICAgICAgICAgX2MoXCJsYWJlbFwiLCB7IGF0dHJzOiB7IGZvcjogXCJcIiB9IH0sIFtfdm0uX3YoXCLQn9C+0LTRgtCy0LXRgNC20LTQtdC90LjQtVwiKV0pLFxuICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgIF9jKFwiaW5wdXRcIiwge1xuICAgICAgICAgICAgICBkaXJlY3RpdmVzOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgbmFtZTogXCJtb2RlbFwiLFxuICAgICAgICAgICAgICAgICAgcmF3TmFtZTogXCJ2LW1vZGVsXCIsXG4gICAgICAgICAgICAgICAgICB2YWx1ZTogX3ZtLnJlZ2lzdGVyRGF0YS5wYXNzd29yZF9jb25maXJtYXRpb24sXG4gICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcInJlZ2lzdGVyRGF0YS5wYXNzd29yZF9jb25maXJtYXRpb25cIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiZm9ybS1jb250cm9sXCIsXG4gICAgICAgICAgICAgIGNsYXNzOiB7XG4gICAgICAgICAgICAgICAgXCJpcy1pbnZhbGlkXCI6ICEhX3ZtLiRzdG9yZS5nZXR0ZXJzLnJlZ2lzdGVyX2Vycm9yc1xuICAgICAgICAgICAgICAgICAgLnBhc3N3b3JkX2NvbmZpcm1hdGlvblxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBhdHRyczogeyB0eXBlOiBcInBhc3N3b3JkXCIsIHBsYWNlaG9sZGVyOiBcIlwiIH0sXG4gICAgICAgICAgICAgIGRvbVByb3BzOiB7IHZhbHVlOiBfdm0ucmVnaXN0ZXJEYXRhLnBhc3N3b3JkX2NvbmZpcm1hdGlvbiB9LFxuICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgIGlucHV0OiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgIGlmICgkZXZlbnQudGFyZ2V0LmNvbXBvc2luZykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIF92bS4kc2V0KFxuICAgICAgICAgICAgICAgICAgICBfdm0ucmVnaXN0ZXJEYXRhLFxuICAgICAgICAgICAgICAgICAgICBcInBhc3N3b3JkX2NvbmZpcm1hdGlvblwiLFxuICAgICAgICAgICAgICAgICAgICAkZXZlbnQudGFyZ2V0LnZhbHVlXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIF0pLFxuICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgISFfdm0uJHN0b3JlLmdldHRlcnMucmVnaXN0ZXJfZXJyb3JzLnBhc3N3b3JkX2NvbmZpcm1hdGlvblxuICAgICAgICAgICAgPyBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImludmFsaWQtdGV4dFwiIH0sIFtcbiAgICAgICAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImxlZnQgYXJyb3dcIiB9KSxcbiAgICAgICAgICAgICAgICBfdm0uX3YoXG4gICAgICAgICAgICAgICAgICBfdm0uX3MoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJHN0b3JlLmdldHRlcnMucmVnaXN0ZXJfZXJyb3JzLnBhc3N3b3JkX2NvbmZpcm1hdGlvblswXVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgIDogX3ZtLl9lKClcbiAgICAgICAgXSksXG4gICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgIF92bS4kc3RvcmUuZ2V0dGVycy5uZWVkX3Ntc19jb25maXJtYXRpb25cbiAgICAgICAgICA/IF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiZm9ybS1ncm91cCByZWxhdGl2ZVwiIH0sIFtcbiAgICAgICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJkLWZsZXhcIiB9LCBbXG4gICAgICAgICAgICAgICAgX2MoXCJsYWJlbFwiLCB7fSwgW192bS5fdihcIlNNUyDQutC+0LRcIildKSxcbiAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgIF9jKFwiaW5wdXRcIiwge1xuICAgICAgICAgICAgICAgICAgZGlyZWN0aXZlczogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJtb2RlbFwiLFxuICAgICAgICAgICAgICAgICAgICAgIHJhd05hbWU6IFwidi1tb2RlbFwiLFxuICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBfdm0ucmVnaXN0ZXJEYXRhLnNtc19jb2RlLFxuICAgICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwicmVnaXN0ZXJEYXRhLnNtc19jb2RlXCJcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImZvcm0tY29udHJvbFwiLFxuICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgcGxhY2Vob2xkZXI6IFwiXCIgfSxcbiAgICAgICAgICAgICAgICAgIGRvbVByb3BzOiB7IHZhbHVlOiBfdm0ucmVnaXN0ZXJEYXRhLnNtc19jb2RlIH0sXG4gICAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgICBpbnB1dDogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgaWYgKCRldmVudC50YXJnZXQuY29tcG9zaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgX3ZtLiRzZXQoXG4gICAgICAgICAgICAgICAgICAgICAgICBfdm0ucmVnaXN0ZXJEYXRhLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJzbXNfY29kZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgJGV2ZW50LnRhcmdldC52YWx1ZVxuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICBdKVxuICAgICAgICAgIDogX3ZtLl9lKCksXG4gICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICEhX3ZtLiRzdG9yZS5nZXR0ZXJzLmF1dGhfc2VydmljZV9tZXNzYWdlXG4gICAgICAgICAgPyBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImZvcm0tZ3JvdXBcIiB9LCBbXG4gICAgICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiY2FyZCBzeXNfbWVzc1wiIH0sIFtcbiAgICAgICAgICAgICAgICBfdm0uX3YoX3ZtLl9zKHRoaXMuJHN0b3JlLmdldHRlcnMuYXV0aF9zZXJ2aWNlX21lc3NhZ2UpKVxuICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgXSlcbiAgICAgICAgICA6IF92bS5fZSgpLFxuICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICBfYyhcbiAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwiZm9ybS1ncm91cFwiLCBzdGF0aWNTdHlsZTogeyBcIm1hcmdpbi10b3BcIjogXCIzMHB4XCIgfSB9LFxuICAgICAgICAgIFtcbiAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICBcImJ1dHRvblwiLFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiYnV0dG9uIGF1dGhfYnV0dFwiLFxuICAgICAgICAgICAgICAgIGF0dHJzOiB7IHR5cGU6IFwiYnV0dG9uXCIgfSxcbiAgICAgICAgICAgICAgICBvbjogeyBjbGljazogX3ZtLnJlZ2lzdGVyIH1cbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgW192bS5fdihcItCS0L7QudGC0LhcIildXG4gICAgICAgICAgICApXG4gICAgICAgICAgXVxuICAgICAgICApXG4gICAgICBdKVxuICAgIF0pXG4gIF0pXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxuXG5leHBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IiwiaW1wb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSBmcm9tIFwiLi9BdXRoLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD0yOTMyMDg5NCZzY29wZWQ9dHJ1ZSZcIlxuaW1wb3J0IHNjcmlwdCBmcm9tIFwiLi9BdXRoLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuZXhwb3J0ICogZnJvbSBcIi4vQXV0aC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcbmltcG9ydCBzdHlsZTAgZnJvbSBcIi4vQXV0aC52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZpZD0yOTMyMDg5NCZzY29wZWQ9dHJ1ZSZsYW5nPWNzcyZcIlxuXG5cbi8qIG5vcm1hbGl6ZSBjb21wb25lbnQgKi9cbmltcG9ydCBub3JtYWxpemVyIGZyb20gXCIhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3J1bnRpbWUvY29tcG9uZW50Tm9ybWFsaXplci5qc1wiXG52YXIgY29tcG9uZW50ID0gbm9ybWFsaXplcihcbiAgc2NyaXB0LFxuICByZW5kZXIsXG4gIHN0YXRpY1JlbmRlckZucyxcbiAgZmFsc2UsXG4gIG51bGwsXG4gIFwiMjkzMjA4OTRcIixcbiAgbnVsbFxuICBcbilcblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHtcbiAgdmFyIGFwaSA9IHJlcXVpcmUoXCJDOlxcXFxPcGVuU2VydmVyXFxcXGRvbWFpbnNcXFxcQXV0b0NSTVxcXFxub2RlX21vZHVsZXNcXFxcdnVlLWhvdC1yZWxvYWQtYXBpXFxcXGRpc3RcXFxcaW5kZXguanNcIilcbiAgYXBpLmluc3RhbGwocmVxdWlyZSgndnVlJykpXG4gIGlmIChhcGkuY29tcGF0aWJsZSkge1xuICAgIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgICBpZiAoIWFwaS5pc1JlY29yZGVkKCcyOTMyMDg5NCcpKSB7XG4gICAgICBhcGkuY3JlYXRlUmVjb3JkKCcyOTMyMDg5NCcsIGNvbXBvbmVudC5vcHRpb25zKVxuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVsb2FkKCcyOTMyMDg5NCcsIGNvbXBvbmVudC5vcHRpb25zKVxuICAgIH1cbiAgICBtb2R1bGUuaG90LmFjY2VwdChcIi4vQXV0aC52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9MjkzMjA4OTQmc2NvcGVkPXRydWUmXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGFwaS5yZXJlbmRlcignMjkzMjA4OTQnLCB7XG4gICAgICAgIHJlbmRlcjogcmVuZGVyLFxuICAgICAgICBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZuc1xuICAgICAgfSlcbiAgICB9KVxuICB9XG59XG5jb21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcInJlc291cmNlcy9qcy9jb21wb25lbnRzL2F1dGgvQXV0aC52dWVcIlxuZXhwb3J0IGRlZmF1bHQgY29tcG9uZW50LmV4cG9ydHMiLCJpbXBvcnQgbW9kIGZyb20gXCItIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTQtMCEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0F1dGgudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiOyBleHBvcnQgZGVmYXVsdCBtb2Q7IGV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTQtMCEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0F1dGgudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiIiwiaW1wb3J0IG1vZCBmcm9tIFwiLSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2luZGV4LmpzIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTEwLTEhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvc3R5bGVQb3N0TG9hZGVyLmpzIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9zcmMvaW5kZXguanM/P3JlZi0tMTAtMiEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0F1dGgudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmaWQ9MjkzMjA4OTQmc2NvcGVkPXRydWUmbGFuZz1jc3MmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9pbmRleC5qcyEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0xMC0xIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3N0eWxlUG9zdExvYWRlci5qcyEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvc3JjL2luZGV4LmpzPz9yZWYtLTEwLTIhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9BdXRoLnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmlkPTI5MzIwODk0JnNjb3BlZD10cnVlJmxhbmc9Y3NzJlwiIiwiZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvdGVtcGxhdGVMb2FkZXIuanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0F1dGgudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTI5MzIwODk0JnNjb3BlZD10cnVlJlwiIl0sInNvdXJjZVJvb3QiOiIifQ==