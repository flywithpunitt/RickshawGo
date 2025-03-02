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
exports.id = "app/api/waitlist/route";
exports.ids = ["app/api/waitlist/route"];
exports.modules = {

/***/ "(rsc)/./app/api/waitlist/route.ts":
/*!***********************************!*\
  !*** ./app/api/waitlist/route.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mongodb */ \"mongodb\");\n/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(mongodb__WEBPACK_IMPORTED_MODULE_1__);\n\n\n// MongoDB connection string from environment variables\nconst uri = \"mongodb+srv://puneetpunia7982:Yzmn2I6G8N4rlnaY@cluster0.bq9b5.mongodb.net/\";\nconst dbName = \"RickshawGo\";\nasync function POST(request) {\n    let client;\n    try {\n        // Parse the request body\n        const body = await request.json();\n        const { email, name } = body;\n        // Validate email\n        if (!email || !email.includes('@')) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                message: 'Valid email is required'\n            }, {\n                status: 400\n            });\n        }\n        // Add more detailed logging\n        console.log('Attempting to connect to MongoDB...');\n        console.log('URI exists:', !!uri);\n        console.log('DB name exists:', !!dbName);\n        // Connect to MongoDB\n        client = new mongodb__WEBPACK_IMPORTED_MODULE_1__.MongoClient(uri);\n        await client.connect();\n        console.log('Connected to MongoDB successfully');\n        const db = client.db(dbName);\n        const collection = db.collection('waitlist');\n        // Check if email already exists\n        const existingUser = await collection.findOne({\n            email\n        });\n        if (existingUser) {\n            console.log('Email already exists:', email);\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                message: 'Email already registered'\n            }, {\n                status: 409\n            });\n        }\n        // Add timestamp\n        const timestamp = new Date();\n        // Insert into database\n        const result = await collection.insertOne({\n            email,\n            name: name || '',\n            timestamp\n        });\n        console.log('Document inserted with ID:', result.insertedId);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            message: 'Successfully added to waitlist'\n        }, {\n            status: 201\n        });\n    } catch (error) {\n        console.error('Database error details:', error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            message: 'Error saving to database'\n        }, {\n            status: 500\n        });\n    } finally{\n        if (client) {\n            await client.close();\n            console.log('MongoDB connection closed');\n        }\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL3dhaXRsaXN0L3JvdXRlLnRzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBMkM7QUFDTDtBQUV0Qyx1REFBdUQ7QUFDdkQsTUFBTUUsTUFBTUMsNEVBQXVCO0FBQ25DLE1BQU1HLFNBQVNILFlBQXNCO0FBRTlCLGVBQWVLLEtBQUtDLE9BQWdCO0lBQ3pDLElBQUlDO0lBQ0osSUFBSTtRQUNGLHlCQUF5QjtRQUN6QixNQUFNQyxPQUFPLE1BQU1GLFFBQVFHLElBQUk7UUFDL0IsTUFBTSxFQUFFQyxLQUFLLEVBQUVDLElBQUksRUFBRSxHQUFHSDtRQUV4QixpQkFBaUI7UUFDakIsSUFBSSxDQUFDRSxTQUFTLENBQUNBLE1BQU1FLFFBQVEsQ0FBQyxNQUFNO1lBQ2xDLE9BQU9mLHFEQUFZQSxDQUFDWSxJQUFJLENBQ3RCO2dCQUFFSSxTQUFTO1lBQTBCLEdBQ3JDO2dCQUFFQyxRQUFRO1lBQUk7UUFFbEI7UUFFQSw0QkFBNEI7UUFDNUJDLFFBQVFDLEdBQUcsQ0FBQztRQUNaRCxRQUFRQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUNqQjtRQUM3QmdCLFFBQVFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDYjtRQUVqQyxxQkFBcUI7UUFDckJJLFNBQVMsSUFBSVQsZ0RBQVdBLENBQUNDO1FBQ3pCLE1BQU1RLE9BQU9VLE9BQU87UUFDcEJGLFFBQVFDLEdBQUcsQ0FBQztRQUVaLE1BQU1FLEtBQUtYLE9BQU9XLEVBQUUsQ0FBQ2Y7UUFDckIsTUFBTWdCLGFBQWFELEdBQUdDLFVBQVUsQ0FBQztRQUVqQyxnQ0FBZ0M7UUFDaEMsTUFBTUMsZUFBZSxNQUFNRCxXQUFXRSxPQUFPLENBQUM7WUFBRVg7UUFBTTtRQUN0RCxJQUFJVSxjQUFjO1lBQ2hCTCxRQUFRQyxHQUFHLENBQUMseUJBQXlCTjtZQUNyQyxPQUFPYixxREFBWUEsQ0FBQ1ksSUFBSSxDQUN0QjtnQkFBRUksU0FBUztZQUEyQixHQUN0QztnQkFBRUMsUUFBUTtZQUFJO1FBRWxCO1FBRUEsZ0JBQWdCO1FBQ2hCLE1BQU1RLFlBQVksSUFBSUM7UUFFdEIsdUJBQXVCO1FBQ3ZCLE1BQU1DLFNBQVMsTUFBTUwsV0FBV00sU0FBUyxDQUFDO1lBQ3hDZjtZQUNBQyxNQUFNQSxRQUFRO1lBQ2RXO1FBQ0Y7UUFFQVAsUUFBUUMsR0FBRyxDQUFDLDhCQUE4QlEsT0FBT0UsVUFBVTtRQUUzRCxPQUFPN0IscURBQVlBLENBQUNZLElBQUksQ0FDdEI7WUFBRUksU0FBUztRQUFpQyxHQUM1QztZQUFFQyxRQUFRO1FBQUk7SUFFbEIsRUFBRSxPQUFPYSxPQUFPO1FBQ2RaLFFBQVFZLEtBQUssQ0FBQywyQkFBMkJBO1FBQ3pDLE9BQU85QixxREFBWUEsQ0FBQ1ksSUFBSSxDQUN0QjtZQUFFSSxTQUFTO1FBQTJCLEdBQ3RDO1lBQUVDLFFBQVE7UUFBSTtJQUVsQixTQUFVO1FBQ1IsSUFBSVAsUUFBUTtZQUNWLE1BQU1BLE9BQU9xQixLQUFLO1lBQ2xCYixRQUFRQyxHQUFHLENBQUM7UUFDZDtJQUNGO0FBQ0YiLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcSFBcXGF1dG9vXFxuZXdpZGVhXFxhcHBcXGFwaVxcd2FpdGxpc3RcXHJvdXRlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRSZXNwb25zZSB9IGZyb20gJ25leHQvc2VydmVyJztcclxuaW1wb3J0IHsgTW9uZ29DbGllbnQgfSBmcm9tICdtb25nb2RiJztcclxuXHJcbi8vIE1vbmdvREIgY29ubmVjdGlvbiBzdHJpbmcgZnJvbSBlbnZpcm9ubWVudCB2YXJpYWJsZXNcclxuY29uc3QgdXJpID0gcHJvY2Vzcy5lbnYuTU9OR09EQl9VUkk7XHJcbmNvbnN0IGRiTmFtZSA9IHByb2Nlc3MuZW52Lk1PTkdPREJfREI7XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gUE9TVChyZXF1ZXN0OiBSZXF1ZXN0KSB7XHJcbiAgbGV0IGNsaWVudDtcclxuICB0cnkge1xyXG4gICAgLy8gUGFyc2UgdGhlIHJlcXVlc3QgYm9keVxyXG4gICAgY29uc3QgYm9keSA9IGF3YWl0IHJlcXVlc3QuanNvbigpO1xyXG4gICAgY29uc3QgeyBlbWFpbCwgbmFtZSB9ID0gYm9keTtcclxuXHJcbiAgICAvLyBWYWxpZGF0ZSBlbWFpbFxyXG4gICAgaWYgKCFlbWFpbCB8fCAhZW1haWwuaW5jbHVkZXMoJ0AnKSkge1xyXG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXHJcbiAgICAgICAgeyBtZXNzYWdlOiAnVmFsaWQgZW1haWwgaXMgcmVxdWlyZWQnIH0sXHJcbiAgICAgICAgeyBzdGF0dXM6IDQwMCB9XHJcbiAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQWRkIG1vcmUgZGV0YWlsZWQgbG9nZ2luZ1xyXG4gICAgY29uc29sZS5sb2coJ0F0dGVtcHRpbmcgdG8gY29ubmVjdCB0byBNb25nb0RCLi4uJyk7XHJcbiAgICBjb25zb2xlLmxvZygnVVJJIGV4aXN0czonLCAhIXVyaSk7XHJcbiAgICBjb25zb2xlLmxvZygnREIgbmFtZSBleGlzdHM6JywgISFkYk5hbWUpO1xyXG5cclxuICAgIC8vIENvbm5lY3QgdG8gTW9uZ29EQlxyXG4gICAgY2xpZW50ID0gbmV3IE1vbmdvQ2xpZW50KHVyaSBhcyBzdHJpbmcpO1xyXG4gICAgYXdhaXQgY2xpZW50LmNvbm5lY3QoKTtcclxuICAgIGNvbnNvbGUubG9nKCdDb25uZWN0ZWQgdG8gTW9uZ29EQiBzdWNjZXNzZnVsbHknKTtcclxuICAgIFxyXG4gICAgY29uc3QgZGIgPSBjbGllbnQuZGIoZGJOYW1lKTtcclxuICAgIGNvbnN0IGNvbGxlY3Rpb24gPSBkYi5jb2xsZWN0aW9uKCd3YWl0bGlzdCcpO1xyXG5cclxuICAgIC8vIENoZWNrIGlmIGVtYWlsIGFscmVhZHkgZXhpc3RzXHJcbiAgICBjb25zdCBleGlzdGluZ1VzZXIgPSBhd2FpdCBjb2xsZWN0aW9uLmZpbmRPbmUoeyBlbWFpbCB9KTtcclxuICAgIGlmIChleGlzdGluZ1VzZXIpIHtcclxuICAgICAgY29uc29sZS5sb2coJ0VtYWlsIGFscmVhZHkgZXhpc3RzOicsIGVtYWlsKTtcclxuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxyXG4gICAgICAgIHsgbWVzc2FnZTogJ0VtYWlsIGFscmVhZHkgcmVnaXN0ZXJlZCcgfSxcclxuICAgICAgICB7IHN0YXR1czogNDA5IH1cclxuICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBBZGQgdGltZXN0YW1wXHJcbiAgICBjb25zdCB0aW1lc3RhbXAgPSBuZXcgRGF0ZSgpO1xyXG5cclxuICAgIC8vIEluc2VydCBpbnRvIGRhdGFiYXNlXHJcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBjb2xsZWN0aW9uLmluc2VydE9uZSh7XHJcbiAgICAgIGVtYWlsLFxyXG4gICAgICBuYW1lOiBuYW1lIHx8ICcnLFxyXG4gICAgICB0aW1lc3RhbXAsXHJcbiAgICB9KTtcclxuICAgIFxyXG4gICAgY29uc29sZS5sb2coJ0RvY3VtZW50IGluc2VydGVkIHdpdGggSUQ6JywgcmVzdWx0Lmluc2VydGVkSWQpO1xyXG4gICAgXHJcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXHJcbiAgICAgIHsgbWVzc2FnZTogJ1N1Y2Nlc3NmdWxseSBhZGRlZCB0byB3YWl0bGlzdCcgfSxcclxuICAgICAgeyBzdGF0dXM6IDIwMSB9XHJcbiAgICApO1xyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKCdEYXRhYmFzZSBlcnJvciBkZXRhaWxzOicsIGVycm9yKTtcclxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcclxuICAgICAgeyBtZXNzYWdlOiAnRXJyb3Igc2F2aW5nIHRvIGRhdGFiYXNlJyB9LFxyXG4gICAgICB7IHN0YXR1czogNTAwIH1cclxuICAgICk7XHJcbiAgfSBmaW5hbGx5IHtcclxuICAgIGlmIChjbGllbnQpIHtcclxuICAgICAgYXdhaXQgY2xpZW50LmNsb3NlKCk7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdNb25nb0RCIGNvbm5lY3Rpb24gY2xvc2VkJyk7XHJcbiAgICB9XHJcbiAgfVxyXG59Il0sIm5hbWVzIjpbIk5leHRSZXNwb25zZSIsIk1vbmdvQ2xpZW50IiwidXJpIiwicHJvY2VzcyIsImVudiIsIk1PTkdPREJfVVJJIiwiZGJOYW1lIiwiTU9OR09EQl9EQiIsIlBPU1QiLCJyZXF1ZXN0IiwiY2xpZW50IiwiYm9keSIsImpzb24iLCJlbWFpbCIsIm5hbWUiLCJpbmNsdWRlcyIsIm1lc3NhZ2UiLCJzdGF0dXMiLCJjb25zb2xlIiwibG9nIiwiY29ubmVjdCIsImRiIiwiY29sbGVjdGlvbiIsImV4aXN0aW5nVXNlciIsImZpbmRPbmUiLCJ0aW1lc3RhbXAiLCJEYXRlIiwicmVzdWx0IiwiaW5zZXJ0T25lIiwiaW5zZXJ0ZWRJZCIsImVycm9yIiwiY2xvc2UiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/waitlist/route.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fwaitlist%2Froute&page=%2Fapi%2Fwaitlist%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fwaitlist%2Froute.ts&appDir=C%3A%5CUsers%5CHP%5Cautoo%5Cnewidea%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CHP%5Cautoo%5Cnewidea&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fwaitlist%2Froute&page=%2Fapi%2Fwaitlist%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fwaitlist%2Froute.ts&appDir=C%3A%5CUsers%5CHP%5Cautoo%5Cnewidea%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CHP%5Cautoo%5Cnewidea&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_HP_autoo_newidea_app_api_waitlist_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/waitlist/route.ts */ \"(rsc)/./app/api/waitlist/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/waitlist/route\",\n        pathname: \"/api/waitlist\",\n        filename: \"route\",\n        bundlePath: \"app/api/waitlist/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\HP\\\\autoo\\\\newidea\\\\app\\\\api\\\\waitlist\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_HP_autoo_newidea_app_api_waitlist_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZ3YWl0bGlzdCUyRnJvdXRlJnBhZ2U9JTJGYXBpJTJGd2FpdGxpc3QlMkZyb3V0ZSZhcHBQYXRocz0mcGFnZVBhdGg9cHJpdmF0ZS1uZXh0LWFwcC1kaXIlMkZhcGklMkZ3YWl0bGlzdCUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNIUCU1Q2F1dG9vJTVDbmV3aWRlYSU1Q2FwcCZwYWdlRXh0ZW5zaW9ucz10c3gmcGFnZUV4dGVuc2lvbnM9dHMmcGFnZUV4dGVuc2lvbnM9anN4JnBhZ2VFeHRlbnNpb25zPWpzJnJvb3REaXI9QyUzQSU1Q1VzZXJzJTVDSFAlNUNhdXRvbyU1Q25ld2lkZWEmaXNEZXY9dHJ1ZSZ0c2NvbmZpZ1BhdGg9dHNjb25maWcuanNvbiZiYXNlUGF0aD0mYXNzZXRQcmVmaXg9Jm5leHRDb25maWdPdXRwdXQ9JnByZWZlcnJlZFJlZ2lvbj0mbWlkZGxld2FyZUNvbmZpZz1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQStGO0FBQ3ZDO0FBQ3FCO0FBQ1c7QUFDeEY7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHlHQUFtQjtBQUMzQztBQUNBLGNBQWMsa0VBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxzREFBc0Q7QUFDOUQ7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDMEY7O0FBRTFGIiwic291cmNlcyI6WyIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIkM6XFxcXFVzZXJzXFxcXEhQXFxcXGF1dG9vXFxcXG5ld2lkZWFcXFxcYXBwXFxcXGFwaVxcXFx3YWl0bGlzdFxcXFxyb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvd2FpdGxpc3Qvcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS93YWl0bGlzdFwiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvd2FpdGxpc3Qvcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCJDOlxcXFxVc2Vyc1xcXFxIUFxcXFxhdXRvb1xcXFxuZXdpZGVhXFxcXGFwcFxcXFxhcGlcXFxcd2FpdGxpc3RcXFxccm91dGUudHNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICB3b3JrQXN5bmNTdG9yYWdlLFxuICAgICAgICB3b3JrVW5pdEFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fwaitlist%2Froute&page=%2Fapi%2Fwaitlist%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fwaitlist%2Froute.ts&appDir=C%3A%5CUsers%5CHP%5Cautoo%5Cnewidea%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CHP%5Cautoo%5Cnewidea&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "mongodb":
/*!**************************!*\
  !*** external "mongodb" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("mongodb");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fwaitlist%2Froute&page=%2Fapi%2Fwaitlist%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fwaitlist%2Froute.ts&appDir=C%3A%5CUsers%5CHP%5Cautoo%5Cnewidea%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CHP%5Cautoo%5Cnewidea&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();