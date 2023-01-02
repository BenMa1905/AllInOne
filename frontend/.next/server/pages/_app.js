/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "./pages/_app.js":
/*!***********************!*\
  !*** ./pages/_app.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../styles/globals.css */ \"./styles/globals.css\");\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_css__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @chakra-ui/react */ \"@chakra-ui/react\");\n/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__);\nvar _jsxFileName = \"C:\\\\Archivos\\\\ingenieria de software\\\\ProyectoLavanderiaIngSoft\\\\frontend\\\\pages\\\\_app.js\";\n\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\n\n\nconst theme = (0,_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__.extendTheme)({\n  colors: {\n    brand: {\n      50: \"#44337A\",\n      100: \"#f09090\",\n      //#f06078  #f09090 #bb5877\n      500: '#60D3F4' //alternative #344fa6\n\n    }\n  }\n});\n\nfunction MyApp({\n  Component,\n  pageProps\n}) {\n  const {\n    0: viewportSize,\n    1: setViewportSize\n  } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)({\n    width: 0,\n    height: 0\n  });\n  (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(() => {\n    function handleResize() {\n      setViewportSize({\n        width: window.innerWidth,\n        height: window.innerHeight\n      });\n    }\n\n    handleResize();\n    window.addEventListener('resize', handleResize);\n    return () => {\n      window.removeEventListener('resize', handleResize);\n    };\n  }, []);\n  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__.ChakraProvider, {\n    children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__.ThemeProvider, {\n      theme: theme,\n      children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__.Box, {\n        w: \"full\",\n        h: \"full\",\n        css: {\n          backgroundImage: \"url(/background.jpg)\",\n          backgroundSize: \"cover\",\n          backgroundPosition: \"center\",\n          backgroundAttachment: 'initial',\n          position: \"fixed\",\n          zIndex: \"-1\"\n        }\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 43,\n        columnNumber: 9\n      }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(Component, _objectSpread(_objectSpread({}, pageProps), viewportSize), void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 56,\n        columnNumber: 10\n      }, this)]\n    }, void 0, true, {\n      fileName: _jsxFileName,\n      lineNumber: 42,\n      columnNumber: 7\n    }, this)\n  }, void 0, false, {\n    fileName: _jsxFileName,\n    lineNumber: 41,\n    columnNumber: 5\n  }, this);\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MyApp);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9fYXBwLmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBOztBQUVBLE1BQU1NLEtBQUssR0FBR0wsNkRBQVcsQ0FBQztFQUN4Qk0sTUFBTSxFQUFFO0lBQ05DLEtBQUssRUFBRTtNQUNMLElBQUksU0FEQztNQUVMLEtBQUssU0FGQTtNQUVXO01BQ2hCLEtBQUssU0FIQSxDQUdXOztJQUhYO0VBREQ7QUFEZ0IsQ0FBRCxDQUF6Qjs7QUFXQSxTQUFTQyxLQUFULENBQWU7RUFBRUMsU0FBRjtFQUFhQztBQUFiLENBQWYsRUFBeUM7RUFDdkMsTUFBTTtJQUFBLEdBQUNDLFlBQUQ7SUFBQSxHQUFlQztFQUFmLElBQWtDVCwrQ0FBUSxDQUFDO0lBQy9DVSxLQUFLLEVBQUUsQ0FEd0M7SUFFL0NDLE1BQU0sRUFBRTtFQUZ1QyxDQUFELENBQWhEO0VBTUFWLGdEQUFTLENBQUMsTUFBTTtJQUNkLFNBQVNXLFlBQVQsR0FBd0I7TUFDdEJILGVBQWUsQ0FBQztRQUNkQyxLQUFLLEVBQUVHLE1BQU0sQ0FBQ0MsVUFEQTtRQUVkSCxNQUFNLEVBQUVFLE1BQU0sQ0FBQ0U7TUFGRCxDQUFELENBQWY7SUFJRDs7SUFFREgsWUFBWTtJQUNaQyxNQUFNLENBQUNHLGdCQUFQLENBQXdCLFFBQXhCLEVBQWtDSixZQUFsQztJQUVBLE9BQU8sTUFBTTtNQUNYQyxNQUFNLENBQUNJLG1CQUFQLENBQTJCLFFBQTNCLEVBQXFDTCxZQUFyQztJQUNELENBRkQ7RUFHRCxDQWRRLEVBY04sRUFkTSxDQUFUO0VBaUJBLG9CQUNFLDhEQUFDLDREQUFEO0lBQUEsdUJBQ0UsOERBQUMsMkRBQUQ7TUFBZSxLQUFLLEVBQUVWLEtBQXRCO01BQUEsd0JBQ0UsOERBQUMsaURBQUQ7UUFDRSxDQUFDLEVBQUMsTUFESjtRQUNXLENBQUMsRUFBQyxNQURiO1FBRUUsR0FBRyxFQUFFO1VBQ0hnQixlQUFlLEVBQUUsc0JBRGQ7VUFFSEMsY0FBYyxFQUFFLE9BRmI7VUFHSEMsa0JBQWtCLEVBQUUsUUFIakI7VUFJSEMsb0JBQW9CLEVBQUUsU0FKbkI7VUFLSEMsUUFBUSxFQUFFLE9BTFA7VUFNSEMsTUFBTSxFQUFFO1FBTkw7TUFGUDtRQUFBO1FBQUE7UUFBQTtNQUFBLFFBREYsZUFjRyw4REFBQyxTQUFELGtDQUFlaEIsU0FBZixHQUE4QkMsWUFBOUI7UUFBQTtRQUFBO1FBQUE7TUFBQSxRQWRIO0lBQUE7TUFBQTtNQUFBO01BQUE7SUFBQTtFQURGO0lBQUE7SUFBQTtJQUFBO0VBQUEsUUFERjtBQW9CRDs7QUFFRCxpRUFBZUgsS0FBZiIsInNvdXJjZXMiOlsid2VicGFjazovL2Zyb250ZW5kLy4vcGFnZXMvX2FwcC5qcz9lMGFkIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnLi4vc3R5bGVzL2dsb2JhbHMuY3NzJ1xuaW1wb3J0IHsgQ2hha3JhUHJvdmlkZXIsIGV4dGVuZFRoZW1lLCBUaGVtZVByb3ZpZGVyLCBCb3ggfSBmcm9tICdAY2hha3JhLXVpL3JlYWN0J1xuaW1wb3J0IHsgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0J1xuXG5jb25zdCB0aGVtZSA9IGV4dGVuZFRoZW1lKHtcbiAgY29sb3JzOiB7XG4gICAgYnJhbmQ6IHtcbiAgICAgIDUwOiBcIiM0NDMzN0FcIixcbiAgICAgIDEwMDogXCIjZjA5MDkwXCIsIC8vI2YwNjA3OCAgI2YwOTA5MCAjYmI1ODc3XG4gICAgICA1MDA6ICcjNjBEM0Y0JywgLy9hbHRlcm5hdGl2ZSAjMzQ0ZmE2XG5cbiAgICB9XG4gIH1cbn0pO1xuXG5mdW5jdGlvbiBNeUFwcCh7IENvbXBvbmVudCwgcGFnZVByb3BzIH0pIHtcbiAgY29uc3QgW3ZpZXdwb3J0U2l6ZSwgc2V0Vmlld3BvcnRTaXplXSA9IHVzZVN0YXRlKHtcbiAgICB3aWR0aDogMCxcbiAgICBoZWlnaHQ6IDBcbiAgfSk7XG5cblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGZ1bmN0aW9uIGhhbmRsZVJlc2l6ZSgpIHtcbiAgICAgIHNldFZpZXdwb3J0U2l6ZSh7XG4gICAgICAgIHdpZHRoOiB3aW5kb3cuaW5uZXJXaWR0aCxcbiAgICAgICAgaGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHRcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGhhbmRsZVJlc2l6ZSgpXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGhhbmRsZVJlc2l6ZSk7XG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGhhbmRsZVJlc2l6ZSk7XG4gICAgfTtcbiAgfSwgW10pO1xuXG5cbiAgcmV0dXJuIChcbiAgICA8Q2hha3JhUHJvdmlkZXIgPlxuICAgICAgPFRoZW1lUHJvdmlkZXIgdGhlbWU9e3RoZW1lfT5cbiAgICAgICAgPEJveFxuICAgICAgICAgIHc9XCJmdWxsXCIgaD0nZnVsbCdcbiAgICAgICAgICBjc3M9e3tcbiAgICAgICAgICAgIGJhY2tncm91bmRJbWFnZTogXCJ1cmwoL2JhY2tncm91bmQuanBnKVwiLFxuICAgICAgICAgICAgYmFja2dyb3VuZFNpemU6IFwiY292ZXJcIixcbiAgICAgICAgICAgIGJhY2tncm91bmRQb3NpdGlvbjogXCJjZW50ZXJcIixcbiAgICAgICAgICAgIGJhY2tncm91bmRBdHRhY2htZW50OiAnaW5pdGlhbCcsXG4gICAgICAgICAgICBwb3NpdGlvbjogXCJmaXhlZFwiLFxuICAgICAgICAgICAgekluZGV4OiBcIi0xXCJcbiAgICAgICAgICB9fVxuICAgICAgICA+XG4gICAgICAgIDwvQm94PlxuXG4gICAgICAgIHs8Q29tcG9uZW50IHsuLi5wYWdlUHJvcHN9IHsuLi52aWV3cG9ydFNpemV9IC8+fVxuICAgICAgPC9UaGVtZVByb3ZpZGVyPlxuICAgIDwvQ2hha3JhUHJvdmlkZXI+XG4gIClcbn1cblxuZXhwb3J0IGRlZmF1bHQgTXlBcHBcbiJdLCJuYW1lcyI6WyJDaGFrcmFQcm92aWRlciIsImV4dGVuZFRoZW1lIiwiVGhlbWVQcm92aWRlciIsIkJveCIsInVzZVN0YXRlIiwidXNlRWZmZWN0IiwidGhlbWUiLCJjb2xvcnMiLCJicmFuZCIsIk15QXBwIiwiQ29tcG9uZW50IiwicGFnZVByb3BzIiwidmlld3BvcnRTaXplIiwic2V0Vmlld3BvcnRTaXplIiwid2lkdGgiLCJoZWlnaHQiLCJoYW5kbGVSZXNpemUiLCJ3aW5kb3ciLCJpbm5lcldpZHRoIiwiaW5uZXJIZWlnaHQiLCJhZGRFdmVudExpc3RlbmVyIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImJhY2tncm91bmRJbWFnZSIsImJhY2tncm91bmRTaXplIiwiYmFja2dyb3VuZFBvc2l0aW9uIiwiYmFja2dyb3VuZEF0dGFjaG1lbnQiLCJwb3NpdGlvbiIsInpJbmRleCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/_app.js\n");

/***/ }),

/***/ "./styles/globals.css":
/*!****************************!*\
  !*** ./styles/globals.css ***!
  \****************************/
/***/ (() => {



/***/ }),

/***/ "@chakra-ui/react":
/*!***********************************!*\
  !*** external "@chakra-ui/react" ***!
  \***********************************/
/***/ ((module) => {

"use strict";
module.exports = require("@chakra-ui/react");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./pages/_app.js"));
module.exports = __webpack_exports__;

})();