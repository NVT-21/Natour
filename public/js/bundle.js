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

/***/ "./public/js/index.js":
/*!****************************!*\
  !*** ./public/js/index.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const loginForm=document.querySelector('.form');\r\nconst login=__webpack_require__(/*! ./login */ \"./public/js/login.js\");\r\n\r\nconsole.log(loginForm);\r\n\r\nif (loginForm){\r\n    loginForm.addEventListener('submit', e=>{\r\n        e.preventDefault();\r\n        \r\n        const email=document.getElementById('email').value;\r\n        const password=document.getElementById('password').value;\r\n    \r\n        login(email,password);\r\n    })\r\n}\r\n\n\n//# sourceURL=webpack://project-natours/./public/js/index.js?");

/***/ }),

/***/ "./public/js/login.js":
/*!****************************!*\
  !*** ./public/js/login.js ***!
  \****************************/
/***/ ((module) => {

eval("\r\n// Login =async(email,passWord)=>{\r\n//     try{\r\n//         console.log({email: email, passWord: passWord});\r\n//         // const res=await axios({\r\n\r\n//         //     method:'POST',\r\n//         //     data:{\r\n//         //         email,\r\n//         //         passWord\r\n//         //     },\r\n//         //     url:'http://localhost:8000/api/User/login',\r\n           \r\n//         // })\r\n//         const res=await axios.post('http://localhost:8000/api/User/login',{\r\n//         email: email,passWord: passWord\r\n//         })\r\n//         console.log(res)\r\n\r\n\r\n//     }\r\n//     catch(e){\r\n//         console.log(e.response.data);\r\n//     }\r\n\r\n const login = async (email,password) => {\r\n    console.log(email,password);\r\n    try{\r\n        const res = await axios({\r\n            method: 'POST',\r\n            url: 'http://localhost:8000/api/User/login',\r\n            data: {\r\n                email,\r\n                password\r\n            }\r\n        });\r\n        console.log(res);\r\n       \r\n    }\r\n    catch(e) {\r\n       \r\n        console.log(e.response.data);\r\n     }\r\n  };\r\nmodule.exports = login\n\n//# sourceURL=webpack://project-natours/./public/js/login.js?");

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