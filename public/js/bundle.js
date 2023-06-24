/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./public/js/alert.js":
/*!****************************!*\
  !*** ./public/js/alert.js ***!
  \****************************/
/***/ ((module) => {

eval("const showAlert = (type, msg) => {\r\n    const markup = `<div class=\"alert alert--${type}\">${msg}</div>`;\r\n    document.querySelector('body').insertAdjacentHTML('afterbegin', markup);\r\n  \r\n    // Remove alert after 5 seconds\r\n    setTimeout(() => {\r\n      const alert = document.querySelector('.alert');\r\n      if (alert) alert.parentElement.removeChild(alert);\r\n    }, 5000);\r\n  };\r\nmodule.exports =showAlert;\n\n//# sourceURL=webpack://project-natours/./public/js/alert.js?");

/***/ }),

/***/ "./public/js/changePassword.js":
/*!*************************************!*\
  !*** ./public/js/changePassword.js ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const showAlert=__webpack_require__(/*! ./alert */ \"./public/js/alert.js\");\r\nconst changePassword = async (currenrPassword,password,passwordConfirm) => {\r\n   \r\n    try{\r\n        console.log(currenrPassword,password,passwordConfirm);\r\n        const res = await axios({\r\n            method: 'POST',\r\n            url: 'http://127.0.0.1:8000/api/User/updatePassword',\r\n            data: {\r\n                currentPassword: currenrPassword,\r\n                newPassword: password,\r\n                newPasswordConfirm: passwordConfirm,\r\n            },\r\n            withCredentials: true\r\n            \r\n        });\r\n        console.log(res);\r\n        if(res.data.status==='success')\r\n        {   console.log(\"haha\")\r\n            showAlert('success','Đổi mật khẩu thành công');\r\n            window.setTimeout(()=>{\r\n                location.assign('/');\r\n            },1500);\r\n        }\r\n        //  if(res.data.status='success') location.reload(true);\r\n      \r\n        \r\n        \r\n       \r\n    }\r\n    \r\n        //  if(res.data.status='success') location.reload(true);\r\n        \r\n        \r\n        \r\n       \r\n        catch(err) {\r\n            \r\n            showAlert(\"error\",err.response.data.message);\r\n         }\r\n         \r\n  };\r\nmodule.exports = changePassword\n\n//# sourceURL=webpack://project-natours/./public/js/changePassword.js?");

/***/ }),

/***/ "./public/js/index.js":
/*!****************************!*\
  !*** ./public/js/index.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const loginForm=document.querySelector('#form-login');\r\nconst logOutForm=document.querySelector('.logOut');\r\nconst changPasswordForm=document.querySelector('.form-user-settings')\r\nconst bookingTour=document.querySelector('#Booking');\r\nconst signUpForm=document.querySelector(\"#signUp\");\r\nconst formUpdateUser=document.querySelector(\"#updateUser\");\r\nconst tourBooking=__webpack_require__(/*! ./tourBooking */ \"./public/js/tourBooking.js\")\r\nconst signUp=__webpack_require__(/*! ./signUp */ \"./public/js/signUp.js\");\r\nconst login=__webpack_require__(/*! ./login */ \"./public/js/login.js\");\r\nconst logOut=__webpack_require__(/*! ./logout */ \"./public/js/logout.js\");\r\nconst updateUser=__webpack_require__(/*! ./updateUser */ \"./public/js/updateUser.js\");\r\nvar changePassword=__webpack_require__(/*! ./changePassword */ \"./public/js/changePassword.js\");\r\nconsole.log(logOutForm)\r\nconsole.log(formUpdateUser)\r\nconsole.log(signUpForm)\r\n\r\n\r\n\r\n\r\n\r\nif (loginForm){\r\n    loginForm.addEventListener('submit', e=>{\r\n        e.preventDefault();\r\n        \r\n        const email=document.getElementById('email').value;\r\n        const password=document.getElementById('password').value;\r\n    \r\n        login(email,password);\r\n    })\r\n}\r\nif (logOutForm){\r\n    logOutForm.addEventListener('click',logOut)  \r\n}\r\nif(changPasswordForm){\r\n    changPasswordForm.addEventListener('submit',e=>{\r\n        e.preventDefault();\r\n        const currentPassword=document.getElementById('password-current').value;\r\n        const password=document.getElementById('password').value;\r\n        const passwordConfirm=document.getElementById('password-confirm').value;\r\n        changePassword(currentPassword,password,passwordConfirm)\r\n    })\r\n}\r\nif(bookingTour){\r\n    bookingTour.addEventListener('submit',e=>{\r\n        e.preventDefault();\r\n        \r\n        tourBooking(slug);\r\n    })\r\n}\r\nif (signUpForm){\r\n    signUpForm.addEventListener('submit',e=>{\r\n        e.preventDefault();\r\n        const userName=document.getElementById('username').value;\r\n\r\n        const email=document.getElementById('email').value;\r\n        const password=document.getElementById('password').value;\r\n        const passwordConfirm=document.getElementById('password-confirm').value;\r\n        signUp(userName,email,password,passwordConfirm)\r\n    })\r\n\r\n}\r\nif(formUpdateUser){\r\n    formUpdateUser.addEventListener('submit',e=>{\r\n        e.preventDefault();\r\n        const form=new FormData();\r\n        form.append('username',document.getElementById('username').value)\r\n        form.append('photo',document.getElementById('photo').files[0])\r\n        // const data = Object.fromEntries(form.entries());\r\n        // console.log(data);\r\n        updateUser(form)\r\n    })\r\n}\r\n\r\n\n\n//# sourceURL=webpack://project-natours/./public/js/index.js?");

/***/ }),

/***/ "./public/js/login.js":
/*!****************************!*\
  !*** ./public/js/login.js ***!
  \****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const showAlert=__webpack_require__(/*! ./alert */ \"./public/js/alert.js\");\r\n const login = async (email,password) => {\r\n   \r\n    try{\r\n        console.log(email,password);\r\n        const res = await axios({\r\n            method: 'POST',\r\n            url: 'http://127.0.0.1:8000/api/User/login ',\r\n            data: {\r\n                email,\r\n                password\r\n            },\r\n            withCredentials: true\r\n            \r\n        });\r\n        console.log(res);\r\n        if(res.data.status==='success')\r\n        {\r\n            showAlert('success','login successful');\r\n            window.setTimeout(()=>{\r\n                location.assign('/');\r\n            },1500);\r\n        }\r\n        //  if(res.data.status='success') location.reload(true);\r\n        \r\n        consolog(res)\r\n        \r\n       \r\n    }\r\n    catch(err) {\r\n       \r\n        showAlert(\"error\",err.response.data.message);\r\n     }\r\n  };\r\nmodule.exports = login\n\n//# sourceURL=webpack://project-natours/./public/js/login.js?");

/***/ }),

/***/ "./public/js/logout.js":
/*!*****************************!*\
  !*** ./public/js/logout.js ***!
  \*****************************/
/***/ ((module) => {

eval("const logOut=async()=>{\r\n    try{\r\n        \r\n        const res = await axios({\r\n            method: 'POST',\r\n            url: 'http://127.0.0.1:8000/api/User/logOut ',\r\n           \r\n           \r\n            \r\n            \r\n        });\r\n        console.log(res);\r\n        if(res.data.status='success') location.assign('/');\r\n}\r\ncatch(err){\r\n    console.log(err);\r\n}\r\n}\r\nmodule.exports =logOut;\n\n//# sourceURL=webpack://project-natours/./public/js/logout.js?");

/***/ }),

/***/ "./public/js/signUp.js":
/*!*****************************!*\
  !*** ./public/js/signUp.js ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const showAlert = __webpack_require__(/*! ./alert */ \"./public/js/alert.js\");\r\nconst signUp = async (userName,email,password,passwordConfirm) => {\r\n   \r\n    try{\r\n        console.log(userName,email,password,passwordConfirm);\r\n        const res = await axios({\r\n            method: 'POST',\r\n            url: 'http://localhost:8000/api/User/signUp ',\r\n            data: {\r\n                username: userName,\r\n                email: email,\r\n                password: password,\r\n                passwordConfirm: passwordConfirm\r\n                \r\n            },\r\n            withCredentials: true\r\n            \r\n        });\r\n        console.log(res);\r\n        //  if(res.data.status='success') location.reload(true);\r\n        if(res.data.status==='success')\r\n        {\r\n            showAlert('success','sign up successfully');\r\n            window.setTimeout(()=>{\r\n                location.assign('/');\r\n            },1500);\r\n        }\r\n        \r\n        \r\n        \r\n       \r\n    }\r\n    catch(err) {\r\n       \r\n        showAlert(\"error\",err.response.data.message);\r\n    }\r\n     \r\n  };\r\nmodule.exports = signUp\n\n//# sourceURL=webpack://project-natours/./public/js/signUp.js?");

/***/ }),

/***/ "./public/js/tourBooking.js":
/*!**********************************!*\
  !*** ./public/js/tourBooking.js ***!
  \**********************************/
/***/ ((module) => {

eval("const tourBooking = async (slug) => {\r\n   \r\n    try{\r\n        \r\n        const res = await axios({\r\n            method: 'POST',\r\n            url: 'http://127.0.0.1:8000/api/Tours/tourBookings/:slug',\r\n           \r\n            withCredentials: true\r\n            \r\n        });\r\n        console.log(res);\r\n        //  if(res.data.status='success') location.reload(true);\r\n        \r\n        \r\n        \r\n       \r\n    }\r\n    catch(e) {\r\n       \r\n        console.log(e.response.data);\r\n     }\r\n  };\r\nmodule.exports = tourBooking;\n\n//# sourceURL=webpack://project-natours/./public/js/tourBooking.js?");

/***/ }),

/***/ "./public/js/updateUser.js":
/*!*********************************!*\
  !*** ./public/js/updateUser.js ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const showAlert = __webpack_require__(/*! ./alert */ \"./public/js/alert.js\");\r\nconst updateUser = async (data) => {\r\n   \r\n    try{\r\n        console.log(\"update\",data.photo);\r\n        const res = await axios({\r\n            method: 'PATCH',\r\n            url: 'http://127.0.0.1:8000/api/User/updateUser ',\r\n            // headers: {\r\n            //   'Content-Type': 'multipart/form-data',\r\n            // },\r\n            data,\r\n                \r\n        \r\n            withCredentials: true\r\n            \r\n        });\r\n        console.log(res);\r\n        //  if(res.data.status='success') location.reload(true);\r\n        if(res.data.status==='success')\r\n        {\r\n            showAlert('success','Sua thong tin thanh cong');\r\n            // window.setTimeout(()=>{\r\n            //     location.assign('/');\r\n            // },1500);\r\n        }\r\n        \r\n        \r\n        \r\n       \r\n    }\r\n    catch(err) {\r\n       \r\n       console.log(err);\r\n    }\r\n     \r\n  };\r\nmodule.exports = updateUser\n\n//# sourceURL=webpack://project-natours/./public/js/updateUser.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./public/js/index.js");
/******/ 	
/******/ })()
;