(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("cloudboost", [], factory);
	else if(typeof exports === 'object')
		exports["cloudboost"] = factory();
	else
		root["cloudboost"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _CB = __webpack_require__(1);

	var _CB2 = _interopRequireDefault(_CB);

	var _PrivateMethods = __webpack_require__(3);

	var _PrivateMethods2 = _interopRequireDefault(_PrivateMethods);

	var _CloudApp = __webpack_require__(43);

	var _CloudApp2 = _interopRequireDefault(_CloudApp);

	var _Column = __webpack_require__(44);

	var _Column2 = _interopRequireDefault(_Column);

	var _CloudTable = __webpack_require__(45);

	var _CloudTable2 = _interopRequireDefault(_CloudTable);

	var _ACL = __webpack_require__(46);

	var _ACL2 = _interopRequireDefault(_ACL);

	var _CloudGeoPoint = __webpack_require__(47);

	var _CloudGeoPoint2 = _interopRequireDefault(_CloudGeoPoint);

	var _CloudObject = __webpack_require__(48);

	var _CloudObject2 = _interopRequireDefault(_CloudObject);

	var _CloudFile = __webpack_require__(49);

	var _CloudFile2 = _interopRequireDefault(_CloudFile);

	var _CloudQueue = __webpack_require__(50);

	var _CloudQueue2 = _interopRequireDefault(_CloudQueue);

	var _CloudRole = __webpack_require__(51);

	var _CloudRole2 = _interopRequireDefault(_CloudRole);

	var _CloudUser = __webpack_require__(52);

	var _CloudUser2 = _interopRequireDefault(_CloudUser);

	var _CloudCache = __webpack_require__(53);

	var _CloudCache2 = _interopRequireDefault(_CloudCache);

	var _CloudNotification = __webpack_require__(54);

	var _CloudNotification2 = _interopRequireDefault(_CloudNotification);

	var _CloudPush = __webpack_require__(55);

	var _CloudPush2 = _interopRequireDefault(_CloudPush);

	var _CloudQuery = __webpack_require__(56);

	var _CloudQuery2 = _interopRequireDefault(_CloudQuery);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	console.log(_CB2.default);

	window.CB = _CB2.default;
	exports.default = _CB2.default;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var require;/* WEBPACK VAR INJECTION */(function(process) {"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var CloudBoost = function CloudBoost() {
	    _classCallCheck(this, CloudBoost);

	    this._isNode = false;
	    this.Socket = null;
	    this.io = null; //socket.io library is saved here.
	    this.apiUrl = 'https://api.cloudboost.io';
	    if (typeof process !== "undefined" && process.versions && process.versions.node) {
	        this._isNode = true;
	    } else {
	        this._isNode = false;
	    }
	};

	var CB = new CloudBoost();
	/*
	 Parse codes:
	 */
	CB._ajaxIE8 = function (method, url, data) {
	    var promise = new CB.Promise();
	    var xdr = new XDomainRequest();
	    xdr.onload = function () {
	        var response;
	        try {
	            response = JSON.parse(xdr.responseText);
	        } catch (e) {
	            promise.reject(e);
	        }
	        if (response) {
	            promise.resolve(response);
	        }
	    };
	    xdr.onerror = xdr.ontimeout = function () {
	        // Let's fake a real error message.
	        var fakeResponse = {
	            responseText: JSON.stringify({
	                code: 500,
	                error: "IE's XDomainRequest does not supply error info."
	            })
	        };
	        promise.reject(fakeResponse);
	    };
	    xdr.onprogress = function () {};
	    xdr.open(method, url);
	    xdr.send(data);
	    return promise;
	};
	CB._loadXml = function () {
	    var xmlhttp;
	    var req = typeof require === 'function' ? require : null;
	    // Load references to other dependencies
	    if (typeof XMLHttpRequest !== 'undefined') {
	        xmlhttp = XMLHttpRequest;
	    } else if (false) {
	        xmlhttp = req('xmlhttprequest').XMLHttpRequest;
	    }
	    xmlhttp = new xmlhttp();
	    return xmlhttp;
	};
	CB.Promise = function () {
	    this._resolved = false;
	    this._rejected = false;
	    this._resolvedCallbacks = [];
	    this._rejectedCallbacks = [];

	    this._isPromisesAPlusCompliant = false;
	    this.is = function (promise) {
	        return promise && promise.then && Object.prototype.toString.call(promise.then) === "[object Function]";
	    };
	    this.as = function () {
	        var promise = new CB.Promise();
	        promise.resolve.apply(promise, arguments);
	        return promise;
	    };
	    this.error = function () {
	        var promise = new CB.Promise();
	        promise.reject.apply(promise, arguments);
	        return promise;
	    };
	    this.when = function (promises) {
	        // Allow passing in Promises as separate arguments instead of an Array.
	        var objects;
	        if (promises && (typeof promises.length === "undefined" || promises.length === null)) {
	            objects = arguments;
	        } else {
	            objects = promises;
	        }

	        var total = objects.length;
	        var hadError = false;
	        var results = [];
	        var errors = [];
	        results.length = objects.length;
	        errors.length = objects.length;

	        if (total === 0) {
	            return CB.Promise.as.apply(this, results);
	        }

	        var promise = new CB.Promise();

	        var resolveOne = function resolveOne() {
	            total = total - 1;
	            if (total === 0) {
	                if (hadError) {
	                    promise.reject(errors);
	                } else {
	                    promise.resolve.apply(promise, results);
	                }
	            }
	        };

	        objects.forEach(function (object, i) {
	            if (CB.Promise.is(object)) {
	                object.then(function (result) {
	                    results[i] = result;
	                    resolveOne();
	                }, function (error) {
	                    errors[i] = error;
	                    hadError = true;
	                    resolveOne();
	                });
	            } else {
	                results[i] = object;
	                resolveOne();
	            }
	        });

	        return promise;
	    };
	    this._continueWhile = function (predicate, asyncFunction) {
	        if (predicate()) {
	            return asyncFunction().then(function () {
	                return CB.Promise._continueWhile(predicate, asyncFunction);
	            });
	        }
	        return CB.Promise.as();
	    };
	};

	CB.Promise.is = function (promise) {
	    return promise && promise.then && Object.prototype.toString.call(promise.then) === "[object Function]";
	};
	/**
	 * Marks this promise as fulfilled, firing any callbacks waiting on it.
	 * @param {Object} result the result to pass to the callbacks.
	 */
	CB.Promise.prototype["resolve"] = function (result) {
	    if (this._resolved || this._rejected) {
	        throw "A promise was resolved even though it had already been " + (this._resolved ? "resolved" : "rejected") + ".";
	    }
	    this._resolved = true;
	    this._result = arguments;
	    var results = arguments;
	    this._resolvedCallbacks.forEach(function (resolvedCallback) {
	        resolvedCallback.apply(this, results);
	    });
	    this._resolvedCallbacks = [];
	    this._rejectedCallbacks = [];
	};

	/**
	 * Marks this promise as fulfilled, firing any callbacks waiting on it.
	 * @param {Object} error the error to pass to the callbacks.
	 */
	CB.Promise.prototype["reject"] = function (error) {
	    if (this._resolved || this._rejected) {
	        throw "A promise was rejected even though it had already been " + (this._resolved ? "resolved" : "rejected") + ".";
	    }
	    this._rejected = true;
	    this._error = error;
	    this._rejectedCallbacks.forEach(function (rejectedCallback) {
	        rejectedCallback(error);
	    });
	    this._resolvedCallbacks = [];
	    this._rejectedCallbacks = [];
	};

	/**
	 * Adds callbacks to be called when this promise is fulfilled. Returns a new
	 * Promise that will be fulfilled when the callback is complete. It allows
	 * chaining. If the callback itself returns a Promise, then the one returned
	 * by "then" will not be fulfilled until that one returned by the callback
	 * is fulfilled.
	 * @param {Function} resolvedCallback Function that is called when this
	 * Promise is resolved. Once the callback is complete, then the Promise
	 * returned by "then" will also be fulfilled.
	 * @param {Function} rejectedCallback Function that is called when this
	 * Promise is rejected with an error. Once the callback is complete, then
	 * the promise returned by "then" with be resolved successfully. If
	 * rejectedCallback is null, or it returns a rejected Promise, then the
	 * Promise returned by "then" will be rejected with that error.
	 * @return {CB.Promise} A new Promise that will be fulfilled after this
	 * Promise is fulfilled and either callback has completed. If the callback
	 * returned a Promise, then this Promise will not be fulfilled until that
	 * one is.
	 */
	CB.Promise.prototype["then"] = function (resolvedCallback, rejectedCallback) {
	    var promise = new CB.Promise();

	    var wrappedResolvedCallback = function wrappedResolvedCallback() {
	        var result = arguments;
	        if (resolvedCallback) {
	            if (CB.Promise._isPromisesAPlusCompliant) {
	                try {
	                    result = [resolvedCallback.apply(this, result)];
	                } catch (e) {
	                    result = [CB.Promise.error(e)];
	                }
	            } else {
	                result = [resolvedCallback.apply(this, result)];
	            }
	        }
	        if (result.length === 1 && CB.Promise.is(result[0])) {
	            result[0].then(function () {
	                promise.resolve.apply(promise, arguments);
	            }, function (error) {
	                promise.reject(error);
	            });
	        } else {
	            promise.resolve.apply(promise, result);
	        }
	    };

	    var wrappedRejectedCallback = function wrappedRejectedCallback(error) {
	        var result = [];
	        if (rejectedCallback) {
	            if (CB.Promise._isPromisesAPlusCompliant) {
	                try {
	                    result = [rejectedCallback(error)];
	                } catch (e) {
	                    result = [CB.Promise.error(e)];
	                }
	            } else {
	                result = [rejectedCallback(error)];
	            }
	            if (result.length === 1 && CB.Promise.is(result[0])) {
	                result[0].then(function () {
	                    promise.resolve.apply(promise, arguments);
	                }, function (error) {
	                    promise.reject(error);
	                });
	            } else {
	                if (CB.Promise._isPromisesAPlusCompliant) {
	                    promise.resolve.apply(promise, result);
	                } else {
	                    promise.reject(result[0]);
	                }
	            }
	        } else {
	            promise.reject(error);
	        }
	    };

	    var runLater = function runLater(func) {
	        func.call();
	    };
	    if (CB.Promise._isPromisesAPlusCompliant) {
	        if (typeof window !== 'undefined' && window.setTimeout) {
	            runLater = function runLater(func) {
	                window.setTimeout(func, 0);
	            };
	        } else if (typeof process !== 'undefined' && process.nextTick) {
	            runLater = function runLater(func) {
	                process.nextTick(func);
	            };
	        }
	    }

	    var self = this;
	    if (this._resolved) {
	        runLater(function () {
	            wrappedResolvedCallback.apply(self, self._result);
	        });
	    } else if (this._rejected) {
	        runLater(function () {
	            wrappedRejectedCallback(self._error);
	        });
	    } else {
	        this._resolvedCallbacks.push(wrappedResolvedCallback);
	        this._rejectedCallbacks.push(wrappedRejectedCallback);
	    }

	    return promise;
	};

	/**
	 * Add handlers to be called when the promise
	 * is either resolved or rejected
	 */
	CB.Promise.prototype["always"] = function (callback) {
	    return this.then(callback, callback);
	};

	/**
	 * Add handlers to be called when the Promise object is resolved
	 */
	CB.Promise.prototype["done"] = function (callback) {
	    return this.then(callback);
	};

	/**
	 * Add handlers to be called when the Promise object is rejected
	 */
	CB.Promise.prototype["fail"] = function (callback) {
	    return this.then(null, callback);
	};

	/**
	 * Run the given callbacks after this promise is fulfilled.
	 * @param optionsOrCallback {} A Backbone-style options callback, or a
	 * callback function. If this is an options object and contains a "model"
	 * attributes, that will be passed to error callbacks as the first argument.
	 * @param model {} If truthy, this will be passed as the first result of
	 * error callbacks. This is for Backbone-compatability.
	 * @return {CB.Promise} A promise that will be resolved after the
	 * callbacks are run, with the same result as this.
	 */
	CB.clone = function (obj) {
	    if (!Object.prototype.toString.call(obj) === "[object Object]") return obj;
	    return Object.prototype.toString.call(obj) === "[object Array]" ? obj.slice() : new Object(obj);
	};

	CB.Promise.prototype["_thenRunCallbacks"] = function (optionsOrCallback, model) {
	    var options;
	    if (Object.prototype.toString.call(optionsOrCallback) === "[object Function]") {
	        var callback = optionsOrCallback;
	        options = {
	            success: function success(result) {
	                callback(result, null);
	            },
	            error: function error(_error) {
	                callback(null, _error);
	            }
	        };
	    } else {
	        options = CB.clone(optionsOrCallback);
	    }
	    options = options || {};

	    return this.then(function (result) {
	        if (options.success) {
	            options.success.apply(this, arguments);
	        } else if (model) {
	            // When there's no callback, a sync event should be triggered.
	            model.trigger('sync', model, result, options);
	        }
	        return CB.Promise.as.apply(CB.Promise, arguments);
	    }, function (error) {
	        if (options.error) {
	            if (!(typeof model === "undefined" ? "undefined" : _typeof(model)) === "undefined") {
	                options.error(model, error);
	            } else {
	                options.error(error);
	            }
	        } else if (model) {
	            // When there's no error callback, an error event should be triggered.
	            model.trigger('error', model, error, options);
	        }
	        // By explicitly returning a rejected Promise, this will work with
	        // either jQuery or Promises/A semantics.
	        return CB.Promise.error(error);
	    });
	};

	/**
	 * Returns a new promise that is fulfilled when all of the input promises
	 * are resolved. If any promise in the list fails, then the returned promise
	 * will fail with the last error. If they all succeed, then the returned
	 * promise will succeed, with the results being the results of all the input
	 * promises. For example: <pre>
	 *   var p1 = Parse.Promise.as(1);
	 *   var p2 = Parse.Promise.as(2);
	 *   var p3 = Parse.Promise.as(3);
	 *
	 *   Parse.Promise.when(p1, p2, p3).then(function(r1, r2, r3) {
	     *     console.log(r1);  // prints 1
	     *     console.log(r2);  // prints 2
	     *     console.log(r3);  // prints 3
	     *   });</pre>
	 *
	 * The input promises can also be specified as an array: <pre>
	 *   var promises = [p1, p2, p3];
	 *   Parse.Promise.when(promises).then(function(r1, r2, r3) {
	     *     console.log(r1);  // prints 1
	     *     console.log(r2);  // prints 2
	     *     console.log(r3);  // prints 3
	     *   });
	 * </pre>
	 * @method when
	 * @param {Array} promises a list of promises to wait for.
	 * @static
	 * @return {Parse.Promise} the new promise.
	 */
	CB.Promise["all"] = function (promises) {
	    var objects;
	    if (Array.isArray(promises)) {
	        objects = promises;
	    } else {
	        objects = arguments;
	    }

	    var total = objects.length;
	    var hadError = false;
	    var results = [];
	    var errors = [];
	    results.length = objects.length;
	    errors.length = objects.length;

	    if (total === 0) {
	        return CB.Promise.as.apply(this, results);
	    }

	    var promise = new CB.Promise();

	    var resolveOne = function resolveOne() {
	        total--;
	        if (total <= 0) {
	            if (hadError) {
	                promise.reject(errors);
	            } else {
	                promise.resolve(results);
	            }
	        }
	    };

	    var chain = function chain(object, index) {
	        if (CB.Promise.is(object)) {
	            object.then(function (result) {
	                results[index] = result;
	                resolveOne();
	            }, function (error) {
	                errors[index] = error;
	                hadError = true;
	                resolveOne();
	            });
	        } else {
	            results[i] = object;
	            resolveOne();
	        }
	    };
	    for (var i = 0; i < objects.length; i++) {
	        chain(objects[i], i);
	    }

	    return promise;
	};

	CB.Events = {
	    trigger: function trigger(events) {
	        var event, node, calls, tail, args, all, rest;
	        if (!(calls = this._callbacks)) {
	            return this;
	        }
	        all = calls.all;
	        events = events.split(eventSplitter);
	        rest = slice.call(arguments, 1);

	        // For each event, walk through the linked list of callbacks twice,
	        // first to trigger the event, then to trigger any `"all"` callbacks.
	        event = events.shift();
	        while (event) {
	            node = calls[event];
	            if (node) {
	                tail = node.tail;
	                while ((node = node.next) !== tail) {
	                    node.callback.apply(node.context || this, rest);
	                }
	            }
	            node = all;
	            if (node) {
	                tail = node.tail;
	                args = [event].concat(rest);
	                while ((node = node.next) !== tail) {
	                    node.callback.apply(node.context || this, args);
	                }
	            }
	            event = events.shift();
	        }

	        return this;
	    }
	};
	/**
	 * Adds a callback function that should be called regardless of whether
	 * this promise failed or succeeded. The callback will be given either the
	 * array of results for its first argument, or the error as its second,
	 * depending on whether this Promise was rejected or resolved. Returns a
	 * new Promise, like "then" would.
	 * @param {Function} continuation the callback.
	 */
	CB.Promise.prototype["_continueWith"] = function (continuation) {
	    return this.then(function () {
	        return continuation(arguments, null);
	    }, function (error) {
	        return continuation(null, error);
	    });
	};

	exports.default = CB;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 2 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }



	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _CB = __webpack_require__(1);

	var _CB2 = _interopRequireDefault(_CB);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/* PRIVATE METHODS */
	_CB2.default.toJSON = function (thisObj) {

	    if (thisObj.constructor === Array) {
	        for (var i = 0; i < thisObj.length; i++) {
	            thisObj[i] = _CB2.default.toJSON(thisObj[i]);
	        }
	        return thisObj;
	    }

	    var id = null;
	    var columnName = null;
	    var tableName = null;
	    var latitude = null;
	    var longitude = null;

	    if (thisObj instanceof _CB2.default.CloudGeoPoint) {
	        latitude = thisObj.document.latitude;
	        longitude = thisObj.document.longitude;
	    }

	    if (thisObj instanceof _CB2.default.CloudFile) id = thisObj.document._id;

	    if (thisObj instanceof _CB2.default.Column) columnName = thisObj.document.name;

	    if (thisObj instanceof _CB2.default.CloudQueue) tableName = thisObj.document.name;

	    if (thisObj instanceof _CB2.default.CloudTable) tableName = thisObj.document.name;

	    if (thisObj instanceof _CB2.default.CloudCache) tableName = thisObj.document.name;

	    var obj = _CB2.default._clone(thisObj, id, longitude, latitude, tableName, columnName);

	    if (!obj instanceof _CB2.default.CloudObject || !obj instanceof _CB2.default.CloudFile || !obj instanceof _CB2.default.CloudGeoPoint || !obj instanceof _CB2.default.CloudTable || !obj instanceof _CB2.default.Column || !obj instanceof _CB2.default.QueueMessage || !obj instanceof _CB2.default.CloudQueue || !obj instanceof _CB2.default.CloudCache) {
	        throw "Data passed is not an instance of CloudObject or CloudFile or CloudGeoPoint";
	    }

	    if (obj instanceof _CB2.default.Column) return obj.document;

	    if (obj instanceof _CB2.default.CloudGeoPoint) return obj.document;

	    var doc = obj.document;

	    for (var key in doc) {
	        if (doc[key] instanceof _CB2.default.CloudObject || doc[key] instanceof _CB2.default.CloudFile || doc[key] instanceof _CB2.default.CloudGeoPoint || doc[key] instanceof _CB2.default.Column || doc[key] instanceof _CB2.default.QueueMessage || doc[key] instanceof _CB2.default.CloudQueue || doc[key] instanceof _CB2.default.CloudCache) {
	            //if something is a relation.
	            doc[key] = _CB2.default.toJSON(doc[key]); //serialize this object.
	        } else if (key === 'ACL') {
	            //if this is an ACL, then. Convert this from CB.ACL object to JSON - to strip all the ACL Methods.
	            var acl = doc[key].document;
	            doc[key] = acl;
	        } else if (doc[key] instanceof Array) {
	            //if this is an array.
	            //then check if this is an array of CloudObjects, if yes, then serialize every CloudObject.
	            if (doc[key][0] && (doc[key][0] instanceof _CB2.default.CloudObject || doc[key][0] instanceof _CB2.default.CloudFile || doc[key][0] instanceof _CB2.default.CloudGeoPoint || doc[key][0] instanceof _CB2.default.Column || doc[key][0] instanceof _CB2.default.QueueMessage || doc[key][0] instanceof _CB2.default.CloudQueue || doc[key][0] instanceof _CB2.default.CloudCache)) {
	                var arr = [];
	                for (var i = 0; i < doc[key].length; i++) {
	                    arr.push(_CB2.default.toJSON(doc[key][i]));
	                }
	                doc[key] = arr;
	            }
	        }
	    }

	    return doc;
	};

	_CB2.default.fromJSON = function (data, thisObj) {

	    //prevObj : is a copy of object before update.
	    //this is to deserialize JSON to a document which can be shoved into CloudObject. :)
	    //if data is a list it will return a list of Cl oudObjects.
	    if (!data || data === "") return null;

	    if (data instanceof Array) {

	        if (data[0] && data[0] instanceof Object) {

	            var arr = [];

	            for (var i = 0; i < data.length; i++) {
	                obj = _CB2.default.fromJSON(data[i]);
	                arr.push(obj);
	            }

	            return arr;
	        } else {
	            //this is just a normal array, not an array of CloudObjects.
	            return data;
	        }
	    } else if (data instanceof Object && data._type) {

	        //if this is a CloudObject.
	        var document = {};
	        //different types of classes.

	        for (var key in data) {
	            if (data[key] instanceof Array) {
	                document[key] = _CB2.default.fromJSON(data[key]);
	            } else if (data[key] instanceof Object) {
	                if (key === 'ACL') {
	                    //this is an ACL.
	                    document[key] = new _CB2.default.ACL();
	                    document[key].document = data[key];
	                } else if (data[key]._type) {
	                    if (thisObj) document[key] = _CB2.default.fromJSON(data[key], thisObj.get(key));else document[key] = _CB2.default.fromJSON(data[key]);
	                } else {
	                    document[key] = data[key];
	                }
	            } else {
	                document[key] = data[key];
	            }
	        }

	        if (!thisObj) {
	            var id = null;
	            var latitude = null;
	            var longitude = null;
	            var name = null;
	            if (document._type === "file") id = document._id;
	            if (document._type === "point") {
	                latitude = document.latitude;
	                longitude = document.longitude;
	            }
	            if (document._type === "table") {
	                name = document.name;
	            }
	            if (document._type === "column") {
	                name = document.name;
	            }
	            if (document._type === "queue") {
	                name = document.name;
	            }
	            if (document._type === "cache") {
	                name = document.name;
	            }
	            var obj = _CB2.default._getObjectByType(document._type, id, longitude, latitude, name);
	            obj.document = document;

	            thisObj = obj;
	        } else {
	            thisObj.document = document;
	        }

	        if (thisObj instanceof _CB2.default.CloudObject || thisObj instanceof _CB2.default.CloudUser || thisObj instanceof _CB2.default.CloudRole || thisObj instanceof _CB2.default.CloudQueue || thisObj instanceof _CB2.default.QueueMessage || thisObj instanceof _CB2.default.CloudFile || thisObj instanceof _CB2.default.CloudCache) {
	            //activate ACL.
	            if (thisObj.document["ACL"]) thisObj.document["ACL"].parent = thisObj;
	        }

	        return thisObj;
	    } else {
	        //if this is plain json.
	        return data;
	    }
	};

	_CB2.default._getObjectByType = function (type, id, longitude, latitude, name) {

	    var obj = null;

	    if (type === 'custom') {
	        obj = new _CB2.default.CloudObject();
	    }

	    if (type === 'queue') {
	        //tablename is queue name in this instance.
	        obj = new _CB2.default.CloudQueue(name);
	    }

	    if (type === 'queue-message') {
	        obj = new _CB2.default.QueueMessage();
	    }

	    if (type === 'cache') {
	        obj = new _CB2.default.CloudCache(name);
	    }

	    if (type === 'role') {
	        obj = new _CB2.default.CloudRole();
	    }

	    if (type === 'user') {
	        obj = new _CB2.default.CloudUser();
	    }

	    if (type === 'file') {
	        obj = new _CB2.default.CloudFile(id);
	    }

	    if (type === 'point') {
	        obj = new _CB2.default.CloudGeoPoint(0, 0);
	        obj.document.latitude = Number(latitude);
	        obj.document.longitude = Number(longitude);
	    }

	    if (type === 'table') {
	        obj = new _CB2.default.CloudTable(name);
	    }

	    if (type === 'column') {
	        obj = new _CB2.default.Column(name);
	    }

	    return obj;
	};

	_CB2.default._validate = function () {
	    if (!_CB2.default.appId) {
	        throw "AppID is null. Please use CB.CloudApp.init to initialize your app.";
	    }

	    if (!_CB2.default.appKey) {
	        throw "AppKey is null. Please use CB.CloudApp.init to initialize your app.";
	    }
	};

	function _all(arrayOfPromises) {
	    //this is simplilar to Q.all for jQuery promises.
	    return jQuery.when.apply(jQuery, arrayOfPromises).then(function () {
	        return Array.prototype.slice.call(arguments, 0);
	    });
	};

	if (_CB2.default._isNode) {
	    module.exports = {};
	    module.exports = _CB2.default;
	}

	_CB2.default._clone = function (obj, id, longitude, latitude, tableName, columnName) {
	    var n_obj = {};
	    if (obj.document._type && obj.document._type != 'point') {
	        n_obj = _CB2.default._getObjectByType(obj.document._type, id, longitude, latitude, tableName, columnName);
	        var doc = obj.document;
	        var doc2 = {};
	        for (var key in doc) {
	            if (doc[key] instanceof _CB2.default.CloudFile) doc2[key] = _CB2.default._clone(doc[key], doc[key].document._id);else if (doc[key] instanceof _CB2.default.CloudObject) {
	                doc2[key] = _CB2.default._clone(doc[key], null);
	            } else if (doc[key] instanceof _CB2.default.CloudQueue) {
	                doc2[key] = _CB2.default._clone(doc[key], null);
	            } else if (doc[key] instanceof _CB2.default.QueueMessage) {
	                doc2[key] = _CB2.default._clone(doc[key], null);
	            } else if (doc[key] instanceof _CB2.default.CloudGeoPoint) {
	                doc2[key] = _CB2.default._clone(doc[key], null);
	            } else if (doc[key] instanceof _CB2.default.CloudCache) {
	                doc2[key] = _CB2.default._clone(doc[key], null);
	            } else doc2[key] = doc[key];
	        }
	    } else if (obj instanceof _CB2.default.CloudGeoPoint) {
	        n_obj = new _CB2.default.CloudGeoPoint(obj.get('longitude'), obj.get('latitude'));
	        return n_obj;
	    }

	    n_obj.document = doc2;

	    return n_obj;
	};

	_CB2.default._request = function (method, url, params, isServiceUrl, isFile, progressCallback) {

	    _CB2.default._validate();

	    if (!params) params = {};

	    // params.sdk = "JavaScript";

	    if (!_CB2.default.CloudApp._isConnected) throw "Your CloudApp is disconnected. Please use CB.CloudApp.connect() and try again.";

	    var def = new _CB2.default.Promise();
	    var xmlhttp = _CB2.default._loadXml();
	    if (_CB2.default._isNode) {
	        var LocalStorage = __webpack_require__(4).LocalStorage;
	        localStorage = new LocalStorage('./scratch');
	    }
	    xmlhttp.open(method, url, true);
	    if (!isFile) {
	        xmlhttp.setRequestHeader('Content-Type', 'text/plain');
	    }

	    if (progressCallback) {
	        if (typeof xmlhttp.upload !== "undefined") {
	            xmlhttp.upload.addEventListener("progress", function (evt) {
	                if (evt.lengthComputable) {
	                    var percentComplete = evt.loaded / evt.total;
	                    progressCallback(percentComplete);
	                }
	            }, false);
	        }
	    }

	    if (!isServiceUrl) {
	        var ssid = _CB2.default._getSessionId();
	        if (ssid != null) xmlhttp.setRequestHeader('sessionID', ssid);
	    }
	    if (_CB2.default._isNode) {
	        xmlhttp.setRequestHeader("User-Agent", "CB/" + _CB2.default.version + " (NodeJS " + process.versions.node + ")");

	        if (params && (typeof params === 'undefined' ? 'undefined' : _typeof(params)) === "object") {
	            params = JSON.stringify(params);
	        }
	    }
	    if (params) xmlhttp.send(params);else xmlhttp.send();
	    xmlhttp.onreadystatechange = function () {
	        if (xmlhttp.readyState == xmlhttp.DONE) {
	            if (xmlhttp.status == 200) {
	                if (!isServiceUrl) {
	                    var sessionID = xmlhttp.getResponseHeader('sessionID');
	                    if (sessionID) localStorage.setItem('sessionID', sessionID);else localStorage.removeItem('sessionID');
	                }
	                def.resolve(xmlhttp.responseText);
	            } else {
	                def.reject(xmlhttp.responseText);
	            }
	        }
	    };
	    return def;
	};

	_CB2.default._getSessionId = function () {
	    return localStorage.getItem('sessionID');
	};

	_CB2.default._columnValidation = function (column, cloudtable) {
	    var defaultColumn = ['id', 'createdAt', 'updatedAt', 'ACL'];
	    if (cloudtable.document.type == 'user') {
	        defaultColumn.concat(['username', 'email', 'password', 'roles']);
	    } else if (cloudtable.document.type == 'role') {
	        defaultColumn.push('name');
	    }

	    var index = defaultColumn.indexOf(column.name.toLowerCase());
	    if (index === -1) return true;else return false;
	};

	_CB2.default._tableValidation = function (tableName) {

	    if (!tableName) //if table name is empty
	        throw "table name cannot be empty";

	    if (!isNaN(tableName[0])) throw "table name should not start with a number";

	    if (!tableName.match(/^\S+$/)) throw "table name should not contain spaces";

	    var pattern = new RegExp(/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/);
	    if (pattern.test(tableName)) throw "table not shoul not contain special characters";
	};

	_CB2.default._modified = function (thisObj, columnName) {
	    thisObj.document._isModified = true;
	    if (thisObj.document._modifiedColumns) {
	        if (thisObj.document._modifiedColumns.indexOf(columnName) === -1) {
	            thisObj.document._modifiedColumns.push(columnName);
	        }
	    } else {
	        thisObj.document._modifiedColumns = [];
	        thisObj.document._modifiedColumns.push(columnName);
	    }
	};

	function trimStart(character, string) {
	    var startIndex = 0;

	    while (string[startIndex] === character) {
	        startIndex++;
	    }

	    return string.substr(startIndex);
	}

	_CB2.default._columnNameValidation = function (columnName) {
	    if (!columnName) //if table name is empty
	        throw "table name cannot be empty";

	    if (!isNaN(columnName[0])) throw "column name should not start with a number";

	    if (!columnName.match(/^\S+$/)) throw "column name should not contain spaces";

	    var pattern = new RegExp(/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/);
	    if (pattern.test(columnName)) throw "column name not should not contain special characters";
	};

	_CB2.default._columnDataTypeValidation = function (dataType) {

	    if (!dataType) throw "data type cannot be empty";

	    var dataTypeList = ['Text', 'Email', 'URL', 'Number', 'Boolean', 'DateTime', 'GeoPoint', 'File', 'List', 'Relation', 'Object', 'EncryptedText'];
	    var index = dataTypeList.indexOf(dataType);
	    if (index < 0) throw "invalid data type";
	};

	_CB2.default._defaultColumns = function (type) {
	    var id = new _CB2.default.Column('id');
	    id.dataType = 'Id';
	    id.required = true;
	    id.unique = true;
	    id.document.isDeletable = false;
	    id.document.isEditable = false;

	    var expires = new _CB2.default.Column('expires');
	    expires.dataType = 'DateTime';
	    expires.document.isDeletable = false;
	    expires.document.isEditable = false;

	    var createdAt = new _CB2.default.Column('createdAt');
	    createdAt.dataType = 'DateTime';
	    createdAt.required = true;
	    createdAt.document.isDeletable = false;
	    createdAt.document.isEditable = false;

	    var updatedAt = new _CB2.default.Column('updatedAt');
	    updatedAt.dataType = 'DateTime';
	    updatedAt.required = true;
	    updatedAt.document.isDeletable = false;
	    updatedAt.document.isEditable = false;

	    var ACL = new _CB2.default.Column('ACL');
	    ACL.dataType = 'ACL';
	    ACL.required = true;
	    ACL.document.isDeletable = false;
	    ACL.document.isEditable = false;

	    var col = [id, expires, updatedAt, createdAt, ACL];
	    if (type === "custom") {
	        return col;
	    } else if (type === "user") {
	        var username = new _CB2.default.Column('username');
	        username.dataType = 'Text';
	        username.required = false;
	        username.unique = true;
	        username.document.isDeletable = false;
	        username.document.isEditable = false;

	        var email = new _CB2.default.Column('email');
	        email.dataType = 'Email';
	        email.unique = true;
	        email.document.isDeletable = false;
	        email.document.isEditable = false;

	        var password = new _CB2.default.Column('password');
	        password.dataType = 'EncryptedText';
	        password.required = false;
	        password.document.isDeletable = false;
	        password.document.isEditable = false;

	        var roles = new _CB2.default.Column('roles');
	        roles.dataType = 'List';
	        roles.relatedTo = 'Role';
	        roles.relatedToType = 'role';
	        roles.document.relationType = 'table';
	        roles.document.isDeletable = false;
	        roles.document.isEditable = false;

	        var socialAuth = new _CB2.default.Column('socialAuth');
	        socialAuth.dataType = 'List';
	        socialAuth.relatedTo = 'Object';
	        socialAuth.required = false;
	        socialAuth.document.isDeletable = false;
	        socialAuth.document.isEditable = false;

	        var verified = new _CB2.default.Column('verified');
	        verified.dataType = 'Boolean';
	        verified.required = false;
	        verified.document.isDeletable = false;
	        verified.document.isEditable = false;

	        col.push(username);
	        col.push(roles);
	        col.push(password);
	        col.push(email);
	        col.push(socialAuth);
	        col.push(verified);
	        return col;
	    } else if (type === "role") {
	        var name = new _CB2.default.Column('name');
	        name.dataType = 'Text';
	        name.unique = true;
	        name.required = true;
	        name.document.isDeletable = false;
	        name.document.isEditable = false;
	        col.push(name);
	        return col;
	    } else if (type === "device") {
	        var channels = new _CB2.default.Column('channels');
	        channels.dataType = 'List';
	        channels.relatedTo = 'Text';
	        channels.document.isDeletable = false;
	        channels.document.isEditable = false;

	        var deviceToken = new _CB2.default.Column('deviceToken');
	        deviceToken.dataType = 'Text';
	        deviceToken.unique = true;
	        deviceToken.document.isDeletable = false;
	        deviceToken.document.isEditable = false;

	        var deviceOS = new _CB2.default.Column('deviceOS');
	        deviceOS.dataType = 'Text';
	        deviceOS.document.isDeletable = false;
	        deviceOS.document.isEditable = false;

	        var timezone = new _CB2.default.Column('timezone');
	        timezone.dataType = 'Text';
	        timezone.document.isDeletable = false;
	        timezone.document.isEditable = false;

	        var metadata = new _CB2.default.Column('metadata');
	        metadata.dataType = 'Object';
	        metadata.document.isDeletable = false;
	        metadata.document.isEditable = false;

	        col.push(channels);
	        col.push(deviceToken);
	        col.push(deviceOS);
	        col.push(timezone);
	        col.push(metadata);
	        return col;
	    }
	};

	_CB2.default._fileCheck = function (obj) {

	    //obj is an instance of CloudObject.
	    var deferred = new _CB2.default.Promise();
	    var promises = [];
	    for (var key in obj.document) {
	        if (obj.document[key] instanceof Array && obj.document[key][0] instanceof _CB2.default.CloudFile) {
	            for (var i = 0; i < obj.document[key].length; i++) {
	                if (!obj.document[key][i].id) promises.push(obj.document[key][i].save());
	            }
	        } else if (obj.document[key] instanceof Object && obj.document[key] instanceof _CB2.default.CloudFile) {
	            if (!obj.document[key].id) promises.push(obj.document[key].save());
	        }
	    }
	    if (promises.length > 0) {
	        _CB2.default.Promise.all(promises).then(function () {
	            var res = arguments;
	            var j = 0;
	            for (var key in obj.document) {
	                if (obj.document[key] instanceof Array && obj.document[key][0] instanceof _CB2.default.CloudFile) {
	                    for (var i = 0; i < obj.document[key].length; i++) {
	                        if (!obj.document[key][i].id) {
	                            obj.document[key][i] = res[j];
	                            j = j + 1;
	                        }
	                    }
	                } else if (obj.document[key] instanceof Object && obj.document[key] instanceof _CB2.default.CloudFile) {
	                    if (!obj.document[key].id) {
	                        obj.document[key] = res[j];
	                        j = j + 1;
	                    }
	                }
	            }
	            deferred.resolve(obj);
	        }, function (err) {
	            deferred.reject(err);
	        });
	    } else {
	        deferred.resolve(obj);
	    }
	    return deferred;
	};

	_CB2.default._bulkObjFileCheck = function (array) {
	    var deferred = new _CB2.default.Promise();
	    var promises = [];
	    for (var i = 0; i < array.length; i++) {
	        promises.push(_CB2.default._fileCheck(array[i]));
	    }
	    _CB2.default.Promise.all(promises).then(function () {
	        deferred.resolve(arguments);
	    }, function (err) {
	        deferred.reject(err);
	    });
	    return deferred;
	};

	_CB2.default._generateHash = function () {
	    var hash = "";
	    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	    for (var i = 0; i < 8; i++) {
	        hash = hash + possible.charAt(Math.floor(Math.random() * possible.length));
	    }
	    return hash;
	};

	_CB2.default._isJsonString = function (str) {
	    try {
	        JSON.parse(str);
	    } catch (e) {
	        return false;
	    }
	    return true;
	};

	_CB2.default._isJsonObject = function (obj) {
	    try {
	        JSON.stringify(obj);
	    } catch (e) {
	        return false;
	    }
	    return true;
	};

	//Description : This fucntion get the content of the cookie .
	//Params : @name : Name of the cookie.
	//Returns : content as string.  
	_CB2.default._getCookie = function (name) {
	    if (typeof Storage !== "undefined") {
	        // Code for localStorage/sessionStorage.
	        if (new Date(localStorage.getItem(name + "_expires")) > new Date()) {
	            return localStorage.getItem(name);
	        } else {
	            _CB2.default._deleteCookie(name);
	        }
	    } else {
	        // Sorry! No Web Storage support..       
	        if (typeof document !== 'undefined') {
	            var name = name + "=";
	            var ca = document.cookie.split(';');
	            for (var i = 0; i < ca.length; i++) {
	                var c = ca[i];
	                while (c.charAt(0) == ' ') {
	                    c = c.substring(1);
	                }if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
	            }
	            return "";
	        }
	    }
	};

	//Description : Deletes the cookie
	//Params : @name : Name of the cookie.
	//Returns : void
	_CB2.default._deleteCookie = function (name) {
	    //save the user to the cookie. 
	    if (typeof Storage !== "undefined") {
	        // Code for localStorage/sessionStorage.
	        localStorage.removeItem(name);
	        localStorage.removeItem(name + "_expires");
	    } else {
	        if (typeof document !== 'undefined') {
	            var d = new Date();
	            d.setTime(d.getTime() + 0 * 0 * 0 * 0 * 0);
	            var expires = "expires=" + d.toUTCString();
	            document.cookie = name + "=" + +"; " + expires;
	        }
	    }
	};

	//Description : Creates cookie. 
	//Params : @name : Name of the cookie.
	//         @content : Content as string / JSON / int / etc. 
	//         @expires : Expiration time in millisecinds.
	//Returns : content as string.  
	_CB2.default._createCookie = function (name, content, expires) {
	    var d = new Date();
	    d.setTime(d.getTime() + expires);
	    if (typeof Storage !== "undefined") {
	        // Code for localStorage/sessionStorage.
	        localStorage.setItem(name, content.toString());
	        localStorage.setItem(name + "_expires", d);
	    } else {
	        if (typeof document !== 'undefined') {

	            var expires = "expires=" + d.toUTCString();
	            document.cookie = +name + "=" + content.toString() + "; " + expires;
	        }
	    }
	};

	//Description : returns query string. 
	//Params : @key : key         
	//Returns : query string.  
	_CB2.default._getQuerystringByKey = function (key) {
	    key = key.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	    var regex = new RegExp("[\\?&]" + key + "=([^&#]*)"),
	        results = regex.exec(location.search);
	    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
	};

	//Set sessionId if cbtoken is found in url
	if (typeof location !== 'undefined' && location.search) {
	    var cbtoken = _CB2.default._getQuerystringByKey("cbtoken");
	    if (cbtoken && cbtoken !== "") {
	        localStorage.setItem('sessionID', cbtoken);
	    }
	}

	//Description : returns browser name 
	//Params : null       
	//Returns : browser name. 
	_CB2.default._getThisBrowserName = function () {

	    // check if library is used as a Node.js module
	    if (typeof window !== 'undefined') {

	        // store navigator properties to use later
	        var userAgent = 'navigator' in window && 'userAgent' in navigator && navigator.userAgent.toLowerCase() || '';
	        var vendor = 'navigator' in window && 'vendor' in navigator && navigator.vendor.toLowerCase() || '';
	        var appVersion = 'navigator' in window && 'appVersion' in navigator && navigator.appVersion.toLowerCase() || '';

	        var is = {};

	        // is current browser chrome?
	        is.chrome = function () {
	            return (/chrome|chromium/i.test(userAgent) && /google inc/.test(vendor)
	            );
	        };

	        // is current browser firefox?
	        is.firefox = function () {
	            return (/firefox/i.test(userAgent)
	            );
	        };

	        // is current browser edge?
	        is.edge = function () {
	            return (/edge/i.test(userAgent)
	            );
	        };

	        // is current browser internet explorer?
	        // parameter is optional
	        is.ie = function (version) {
	            if (!version) {
	                return (/msie/i.test(userAgent) || "ActiveXObject" in window
	                );
	            }
	            if (version >= 11) {
	                return "ActiveXObject" in window;
	            }
	            return new RegExp('msie ' + version).test(userAgent);
	        };

	        // is current browser opera?
	        is.opera = function () {
	            return (/^Opera\//.test(userAgent) || // Opera 12 and older versions
	                /\x20OPR\//.test(userAgent)
	            ); // Opera 15+
	        };

	        // is current browser safari?
	        is.safari = function () {
	            return (/safari/i.test(userAgent) && /apple computer/i.test(vendor)
	            );
	        };

	        if (is.chrome()) {
	            return "chrome";
	        }

	        if (is.firefox()) {
	            return "firefox";
	        }

	        if (is.edge()) {
	            return "edge";
	        }

	        if (is.ie()) {
	            return "ie";
	        }

	        if (is.opera()) {
	            return "opera";
	        }

	        if (is.safari()) {
	            return "safari";
	        }

	        return "unidentified";
	    }
	};

	exports.default = true;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {// Generated by CoffeeScript 1.10.0
	(function() {
	  var JSONStorage, KEY_FOR_EMPTY_STRING, LocalStorage, MetaKey, QUOTA_EXCEEDED_ERR, StorageEvent, _emptyDirectory, _escapeKey, _rm, createMap, events, fs, path, writeSync,
	    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	    hasProp = {}.hasOwnProperty;

	  path = __webpack_require__(5);

	  fs = __webpack_require__(6);

	  events = __webpack_require__(7);

	  writeSync = __webpack_require__(8).sync;

	  KEY_FOR_EMPTY_STRING = '---.EMPTY_STRING.---';

	  _emptyDirectory = function(target) {
	    var i, len, p, ref, results;
	    ref = fs.readdirSync(target);
	    results = [];
	    for (i = 0, len = ref.length; i < len; i++) {
	      p = ref[i];
	      results.push(_rm(path.join(target, p)));
	    }
	    return results;
	  };

	  _rm = function(target) {
	    if (fs.statSync(target).isDirectory()) {
	      _emptyDirectory(target);
	      return fs.rmdirSync(target);
	    } else {
	      return fs.unlinkSync(target);
	    }
	  };

	  _escapeKey = function(key) {
	    var newKey;
	    if (key === '') {
	      newKey = KEY_FOR_EMPTY_STRING;
	    } else {
	      newKey = key.toString();
	    }
	    return newKey;
	  };

	  QUOTA_EXCEEDED_ERR = (function(superClass) {
	    extend(QUOTA_EXCEEDED_ERR, superClass);

	    function QUOTA_EXCEEDED_ERR(message) {
	      this.message = message != null ? message : 'Unknown error.';
	      if (Error.captureStackTrace != null) {
	        Error.captureStackTrace(this, this.constructor);
	      }
	      this.name = this.constructor.name;
	    }

	    QUOTA_EXCEEDED_ERR.prototype.toString = function() {
	      return this.name + ": " + this.message;
	    };

	    return QUOTA_EXCEEDED_ERR;

	  })(Error);

	  StorageEvent = (function() {
	    function StorageEvent(key1, oldValue1, newValue1, url, storageArea) {
	      this.key = key1;
	      this.oldValue = oldValue1;
	      this.newValue = newValue1;
	      this.url = url;
	      this.storageArea = storageArea != null ? storageArea : 'localStorage';
	    }

	    return StorageEvent;

	  })();

	  MetaKey = (function() {
	    function MetaKey(key1, index1) {
	      this.key = key1;
	      this.index = index1;
	      if (!(this instanceof MetaKey)) {
	        return new MetaKey(this.key, this.index);
	      }
	    }

	    return MetaKey;

	  })();

	  createMap = function() {
	    var Map;
	    Map = function() {};
	    Map.prototype = Object.create(null);
	    return new Map();
	  };

	  LocalStorage = (function(superClass) {
	    var instanceMap;

	    extend(LocalStorage, superClass);

	    instanceMap = {};

	    function LocalStorage(_location, quota) {
	      this._location = _location;
	      this.quota = quota != null ? quota : 5 * 1024 * 1024;
	      if (!(this instanceof LocalStorage)) {
	        return new LocalStorage(this._location, this.quota);
	      }
	      this._location = path.resolve(this._location);
	      if (instanceMap[this._location] != null) {
	        return instanceMap[this._location];
	      }
	      this.length = 0;
	      this._bytesInUse = 0;
	      this._keys = [];
	      this._metaKeyMap = createMap();
	      this._eventUrl = "pid:" + process.pid;
	      this._init();
	      this._QUOTA_EXCEEDED_ERR = QUOTA_EXCEEDED_ERR;
	      instanceMap[this._location] = this;
	      return instanceMap[this._location];
	    }

	    LocalStorage.prototype._init = function() {
	      var _MetaKey, _decodedKey, _keys, error, i, index, k, len, stat;
	      try {
	        stat = fs.statSync(this._location);
	        if ((stat != null) && !stat.isDirectory()) {
	          throw new Error("A file exists at the location '" + this._location + "' when trying to create/open localStorage");
	        }
	        this._bytesInUse = 0;
	        this.length = 0;
	        _keys = fs.readdirSync(this._location);
	        for (index = i = 0, len = _keys.length; i < len; index = ++i) {
	          k = _keys[index];
	          _decodedKey = decodeURIComponent(k);
	          this._keys.push(_decodedKey);
	          _MetaKey = new MetaKey(k, index);
	          this._metaKeyMap[_decodedKey] = _MetaKey;
	          stat = this._getStat(k);
	          if ((stat != null ? stat.size : void 0) != null) {
	            _MetaKey.size = stat.size;
	            this._bytesInUse += stat.size;
	          }
	        }
	        this.length = _keys.length;
	      } catch (error) {
	        fs.mkdirSync(this._location);
	      }
	    };

	    LocalStorage.prototype.setItem = function(key, value) {
	      var encodedKey, evnt, existsBeforeSet, filename, hasListeners, metaKey, oldLength, oldValue, valueString, valueStringLength;
	      hasListeners = events.EventEmitter.listenerCount(this, 'storage');
	      oldValue = null;
	      if (hasListeners) {
	        oldValue = this.getItem(key);
	      }
	      key = _escapeKey(key);
	      encodedKey = encodeURIComponent(key);
	      filename = path.join(this._location, encodedKey);
	      valueString = value.toString();
	      valueStringLength = valueString.length;
	      metaKey = this._metaKeyMap[key];
	      existsBeforeSet = !!metaKey;
	      if (existsBeforeSet) {
	        oldLength = metaKey.size;
	      } else {
	        oldLength = 0;
	      }
	      if (this._bytesInUse - oldLength + valueStringLength > this.quota) {
	        throw new QUOTA_EXCEEDED_ERR();
	      }
	      writeSync(filename, valueString, 'utf8');
	      if (!existsBeforeSet) {
	        metaKey = new MetaKey(encodedKey, (this._keys.push(key)) - 1);
	        metaKey.size = valueStringLength;
	        this._metaKeyMap[key] = metaKey;
	        this.length += 1;
	        this._bytesInUse += valueStringLength;
	      }
	      if (hasListeners) {
	        evnt = new StorageEvent(key, oldValue, value, this._eventUrl);
	        return this.emit('storage', evnt);
	      }
	    };

	    LocalStorage.prototype.getItem = function(key) {
	      var filename, metaKey;
	      key = _escapeKey(key);
	      metaKey = this._metaKeyMap[key];
	      if (!!metaKey) {
	        filename = path.join(this._location, metaKey.key);
	        return fs.readFileSync(filename, 'utf8');
	      } else {
	        return null;
	      }
	    };

	    LocalStorage.prototype._getStat = function(key) {
	      var error, filename;
	      key = _escapeKey(key);
	      filename = path.join(this._location, encodeURIComponent(key));
	      try {
	        return fs.statSync(filename);
	      } catch (error) {
	        return null;
	      }
	    };

	    LocalStorage.prototype.removeItem = function(key) {
	      var evnt, filename, hasListeners, k, meta, metaKey, oldValue, ref, v;
	      key = _escapeKey(key);
	      metaKey = this._metaKeyMap[key];
	      if (!!metaKey) {
	        hasListeners = events.EventEmitter.listenerCount(this, 'storage');
	        oldValue = null;
	        if (hasListeners) {
	          oldValue = this.getItem(key);
	        }
	        delete this._metaKeyMap[key];
	        this.length -= 1;
	        this._bytesInUse -= metaKey.size;
	        filename = path.join(this._location, metaKey.key);
	        this._keys.splice(metaKey.index, 1);
	        ref = this._metaKeyMap;
	        for (k in ref) {
	          v = ref[k];
	          meta = this._metaKeyMap[k];
	          if (meta.index > metaKey.index) {
	            meta.index -= 1;
	          }
	        }
	        _rm(filename);
	        if (hasListeners) {
	          evnt = new StorageEvent(key, oldValue, null, this._eventUrl);
	          return this.emit('storage', evnt);
	        }
	      }
	    };

	    LocalStorage.prototype.key = function(n) {
	      return this._keys[n];
	    };

	    LocalStorage.prototype.clear = function() {
	      var evnt;
	      _emptyDirectory(this._location);
	      this._metaKeyMap = createMap();
	      this._keys = [];
	      this.length = 0;
	      this._bytesInUse = 0;
	      if (events.EventEmitter.listenerCount(this, 'storage')) {
	        evnt = new StorageEvent(null, null, null, this._eventUrl);
	        return this.emit('storage', evnt);
	      }
	    };

	    LocalStorage.prototype._getBytesInUse = function() {
	      return this._bytesInUse;
	    };

	    LocalStorage.prototype._deleteLocation = function() {
	      delete instanceMap[this._location];
	      _rm(this._location);
	      this._metaKeyMap = {};
	      this._keys = [];
	      this.length = 0;
	      return this._bytesInUse = 0;
	    };

	    return LocalStorage;

	  })(events.EventEmitter);

	  JSONStorage = (function(superClass) {
	    extend(JSONStorage, superClass);

	    function JSONStorage() {
	      return JSONStorage.__super__.constructor.apply(this, arguments);
	    }

	    JSONStorage.prototype.setItem = function(key, value) {
	      var newValue;
	      newValue = JSON.stringify(value);
	      return JSONStorage.__super__.setItem.call(this, key, newValue);
	    };

	    JSONStorage.prototype.getItem = function(key) {
	      return JSON.parse(JSONStorage.__super__.getItem.call(this, key));
	    };

	    return JSONStorage;

	  })(LocalStorage);

	  exports.LocalStorage = LocalStorage;

	  exports.JSONStorage = JSONStorage;

	  exports.QUOTA_EXCEEDED_ERR = QUOTA_EXCEEDED_ERR;

	}).call(this);

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	// resolves . and .. elements in a path array with directory names there
	// must be no slashes, empty elements, or device names (c:\) in the array
	// (so also no leading and trailing slashes - it does not distinguish
	// relative and absolute paths)
	function normalizeArray(parts, allowAboveRoot) {
	  // if the path tries to go above the root, `up` ends up > 0
	  var up = 0;
	  for (var i = parts.length - 1; i >= 0; i--) {
	    var last = parts[i];
	    if (last === '.') {
	      parts.splice(i, 1);
	    } else if (last === '..') {
	      parts.splice(i, 1);
	      up++;
	    } else if (up) {
	      parts.splice(i, 1);
	      up--;
	    }
	  }

	  // if the path is allowed to go above the root, restore leading ..s
	  if (allowAboveRoot) {
	    for (; up--; up) {
	      parts.unshift('..');
	    }
	  }

	  return parts;
	}

	// Split a filename into [root, dir, basename, ext], unix version
	// 'root' is just a slash, or nothing.
	var splitPathRe =
	    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
	var splitPath = function(filename) {
	  return splitPathRe.exec(filename).slice(1);
	};

	// path.resolve([from ...], to)
	// posix version
	exports.resolve = function() {
	  var resolvedPath = '',
	      resolvedAbsolute = false;

	  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
	    var path = (i >= 0) ? arguments[i] : process.cwd();

	    // Skip empty and invalid entries
	    if (typeof path !== 'string') {
	      throw new TypeError('Arguments to path.resolve must be strings');
	    } else if (!path) {
	      continue;
	    }

	    resolvedPath = path + '/' + resolvedPath;
	    resolvedAbsolute = path.charAt(0) === '/';
	  }

	  // At this point the path should be resolved to a full absolute path, but
	  // handle relative paths to be safe (might happen when process.cwd() fails)

	  // Normalize the path
	  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
	    return !!p;
	  }), !resolvedAbsolute).join('/');

	  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
	};

	// path.normalize(path)
	// posix version
	exports.normalize = function(path) {
	  var isAbsolute = exports.isAbsolute(path),
	      trailingSlash = substr(path, -1) === '/';

	  // Normalize the path
	  path = normalizeArray(filter(path.split('/'), function(p) {
	    return !!p;
	  }), !isAbsolute).join('/');

	  if (!path && !isAbsolute) {
	    path = '.';
	  }
	  if (path && trailingSlash) {
	    path += '/';
	  }

	  return (isAbsolute ? '/' : '') + path;
	};

	// posix version
	exports.isAbsolute = function(path) {
	  return path.charAt(0) === '/';
	};

	// posix version
	exports.join = function() {
	  var paths = Array.prototype.slice.call(arguments, 0);
	  return exports.normalize(filter(paths, function(p, index) {
	    if (typeof p !== 'string') {
	      throw new TypeError('Arguments to path.join must be strings');
	    }
	    return p;
	  }).join('/'));
	};


	// path.relative(from, to)
	// posix version
	exports.relative = function(from, to) {
	  from = exports.resolve(from).substr(1);
	  to = exports.resolve(to).substr(1);

	  function trim(arr) {
	    var start = 0;
	    for (; start < arr.length; start++) {
	      if (arr[start] !== '') break;
	    }

	    var end = arr.length - 1;
	    for (; end >= 0; end--) {
	      if (arr[end] !== '') break;
	    }

	    if (start > end) return [];
	    return arr.slice(start, end - start + 1);
	  }

	  var fromParts = trim(from.split('/'));
	  var toParts = trim(to.split('/'));

	  var length = Math.min(fromParts.length, toParts.length);
	  var samePartsLength = length;
	  for (var i = 0; i < length; i++) {
	    if (fromParts[i] !== toParts[i]) {
	      samePartsLength = i;
	      break;
	    }
	  }

	  var outputParts = [];
	  for (var i = samePartsLength; i < fromParts.length; i++) {
	    outputParts.push('..');
	  }

	  outputParts = outputParts.concat(toParts.slice(samePartsLength));

	  return outputParts.join('/');
	};

	exports.sep = '/';
	exports.delimiter = ':';

	exports.dirname = function(path) {
	  var result = splitPath(path),
	      root = result[0],
	      dir = result[1];

	  if (!root && !dir) {
	    // No dirname whatsoever
	    return '.';
	  }

	  if (dir) {
	    // It has a dirname, strip trailing slash
	    dir = dir.substr(0, dir.length - 1);
	  }

	  return root + dir;
	};


	exports.basename = function(path, ext) {
	  var f = splitPath(path)[2];
	  // TODO: make this comparison case-insensitive on windows?
	  if (ext && f.substr(-1 * ext.length) === ext) {
	    f = f.substr(0, f.length - ext.length);
	  }
	  return f;
	};


	exports.extname = function(path) {
	  return splitPath(path)[3];
	};

	function filter (xs, f) {
	    if (xs.filter) return xs.filter(f);
	    var res = [];
	    for (var i = 0; i < xs.length; i++) {
	        if (f(xs[i], i, xs)) res.push(xs[i]);
	    }
	    return res;
	}

	// String.prototype.substr - negative index don't work in IE8
	var substr = 'ab'.substr(-1) === 'b'
	    ? function (str, start, len) { return str.substr(start, len) }
	    : function (str, start, len) {
	        if (start < 0) start = str.length + start;
	        return str.substr(start, len);
	    }
	;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 6 */
/***/ function(module, exports) {

	

/***/ },
/* 7 */
/***/ function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	function EventEmitter() {
	  this._events = this._events || {};
	  this._maxListeners = this._maxListeners || undefined;
	}
	module.exports = EventEmitter;

	// Backwards-compat with node 0.10.x
	EventEmitter.EventEmitter = EventEmitter;

	EventEmitter.prototype._events = undefined;
	EventEmitter.prototype._maxListeners = undefined;

	// By default EventEmitters will print a warning if more than 10 listeners are
	// added to it. This is a useful default which helps finding memory leaks.
	EventEmitter.defaultMaxListeners = 10;

	// Obviously not all Emitters should be limited to 10. This function allows
	// that to be increased. Set to zero for unlimited.
	EventEmitter.prototype.setMaxListeners = function(n) {
	  if (!isNumber(n) || n < 0 || isNaN(n))
	    throw TypeError('n must be a positive number');
	  this._maxListeners = n;
	  return this;
	};

	EventEmitter.prototype.emit = function(type) {
	  var er, handler, len, args, i, listeners;

	  if (!this._events)
	    this._events = {};

	  // If there is no 'error' event listener then throw.
	  if (type === 'error') {
	    if (!this._events.error ||
	        (isObject(this._events.error) && !this._events.error.length)) {
	      er = arguments[1];
	      if (er instanceof Error) {
	        throw er; // Unhandled 'error' event
	      } else {
	        // At least give some kind of context to the user
	        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
	        err.context = er;
	        throw err;
	      }
	    }
	  }

	  handler = this._events[type];

	  if (isUndefined(handler))
	    return false;

	  if (isFunction(handler)) {
	    switch (arguments.length) {
	      // fast cases
	      case 1:
	        handler.call(this);
	        break;
	      case 2:
	        handler.call(this, arguments[1]);
	        break;
	      case 3:
	        handler.call(this, arguments[1], arguments[2]);
	        break;
	      // slower
	      default:
	        args = Array.prototype.slice.call(arguments, 1);
	        handler.apply(this, args);
	    }
	  } else if (isObject(handler)) {
	    args = Array.prototype.slice.call(arguments, 1);
	    listeners = handler.slice();
	    len = listeners.length;
	    for (i = 0; i < len; i++)
	      listeners[i].apply(this, args);
	  }

	  return true;
	};

	EventEmitter.prototype.addListener = function(type, listener) {
	  var m;

	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  if (!this._events)
	    this._events = {};

	  // To avoid recursion in the case that type === "newListener"! Before
	  // adding it to the listeners, first emit "newListener".
	  if (this._events.newListener)
	    this.emit('newListener', type,
	              isFunction(listener.listener) ?
	              listener.listener : listener);

	  if (!this._events[type])
	    // Optimize the case of one listener. Don't need the extra array object.
	    this._events[type] = listener;
	  else if (isObject(this._events[type]))
	    // If we've already got an array, just append.
	    this._events[type].push(listener);
	  else
	    // Adding the second element, need to change to array.
	    this._events[type] = [this._events[type], listener];

	  // Check for listener leak
	  if (isObject(this._events[type]) && !this._events[type].warned) {
	    if (!isUndefined(this._maxListeners)) {
	      m = this._maxListeners;
	    } else {
	      m = EventEmitter.defaultMaxListeners;
	    }

	    if (m && m > 0 && this._events[type].length > m) {
	      this._events[type].warned = true;
	      console.error('(node) warning: possible EventEmitter memory ' +
	                    'leak detected. %d listeners added. ' +
	                    'Use emitter.setMaxListeners() to increase limit.',
	                    this._events[type].length);
	      if (typeof console.trace === 'function') {
	        // not supported in IE 10
	        console.trace();
	      }
	    }
	  }

	  return this;
	};

	EventEmitter.prototype.on = EventEmitter.prototype.addListener;

	EventEmitter.prototype.once = function(type, listener) {
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  var fired = false;

	  function g() {
	    this.removeListener(type, g);

	    if (!fired) {
	      fired = true;
	      listener.apply(this, arguments);
	    }
	  }

	  g.listener = listener;
	  this.on(type, g);

	  return this;
	};

	// emits a 'removeListener' event iff the listener was removed
	EventEmitter.prototype.removeListener = function(type, listener) {
	  var list, position, length, i;

	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  if (!this._events || !this._events[type])
	    return this;

	  list = this._events[type];
	  length = list.length;
	  position = -1;

	  if (list === listener ||
	      (isFunction(list.listener) && list.listener === listener)) {
	    delete this._events[type];
	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);

	  } else if (isObject(list)) {
	    for (i = length; i-- > 0;) {
	      if (list[i] === listener ||
	          (list[i].listener && list[i].listener === listener)) {
	        position = i;
	        break;
	      }
	    }

	    if (position < 0)
	      return this;

	    if (list.length === 1) {
	      list.length = 0;
	      delete this._events[type];
	    } else {
	      list.splice(position, 1);
	    }

	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);
	  }

	  return this;
	};

	EventEmitter.prototype.removeAllListeners = function(type) {
	  var key, listeners;

	  if (!this._events)
	    return this;

	  // not listening for removeListener, no need to emit
	  if (!this._events.removeListener) {
	    if (arguments.length === 0)
	      this._events = {};
	    else if (this._events[type])
	      delete this._events[type];
	    return this;
	  }

	  // emit removeListener for all listeners on all events
	  if (arguments.length === 0) {
	    for (key in this._events) {
	      if (key === 'removeListener') continue;
	      this.removeAllListeners(key);
	    }
	    this.removeAllListeners('removeListener');
	    this._events = {};
	    return this;
	  }

	  listeners = this._events[type];

	  if (isFunction(listeners)) {
	    this.removeListener(type, listeners);
	  } else if (listeners) {
	    // LIFO order
	    while (listeners.length)
	      this.removeListener(type, listeners[listeners.length - 1]);
	  }
	  delete this._events[type];

	  return this;
	};

	EventEmitter.prototype.listeners = function(type) {
	  var ret;
	  if (!this._events || !this._events[type])
	    ret = [];
	  else if (isFunction(this._events[type]))
	    ret = [this._events[type]];
	  else
	    ret = this._events[type].slice();
	  return ret;
	};

	EventEmitter.prototype.listenerCount = function(type) {
	  if (this._events) {
	    var evlistener = this._events[type];

	    if (isFunction(evlistener))
	      return 1;
	    else if (evlistener)
	      return evlistener.length;
	  }
	  return 0;
	};

	EventEmitter.listenerCount = function(emitter, type) {
	  return emitter.listenerCount(type);
	};

	function isFunction(arg) {
	  return typeof arg === 'function';
	}

	function isNumber(arg) {
	  return typeof arg === 'number';
	}

	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}

	function isUndefined(arg) {
	  return arg === void 0;
	}


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__filename, process) {'use strict'
	var fs = __webpack_require__(9)
	var chain = __webpack_require__(38).chain
	var MurmurHash3 = __webpack_require__(42)
	var extend = Object.assign || __webpack_require__(34)._extend

	function murmurhex () {
	  var hash = new MurmurHash3()
	  for (var ii = 0; ii < arguments.length; ++ii) hash.hash('' + arguments[ii])
	  return hash.result()
	}
	var invocations = 0
	var getTmpname = function (filename) {
	  return filename + '.' + murmurhex(__filename, process.pid, ++invocations)
	}

	module.exports = function writeFile (filename, data, options, callback) {
	  if (options instanceof Function) {
	    callback = options
	    options = null
	  }
	  if (!options) options = {}
	  var tmpfile = getTmpname(filename)

	  if (options.mode && options.chmod) {
	    return thenWriteFile()
	  } else {
	    // Either mode or chown is not explicitly set
	    // Default behavior is to copy it from original file
	    return fs.stat(filename, function (err, stats) {
	      options = extend({}, options)
	      if (!err && stats && !options.mode) {
	        options.mode = stats.mode
	      }
	      if (!err && stats && !options.chown && process.getuid) {
	        options.chown = { uid: stats.uid, gid: stats.gid }
	      }
	      return thenWriteFile()
	    })
	  }

	  function thenWriteFile () {
	    chain([
	      [fs, fs.writeFile, tmpfile, data, options.encoding || 'utf8'],
	      options.mode && [fs, fs.chmod, tmpfile, options.mode],
	      options.chown && [fs, fs.chown, tmpfile, options.chown.uid, options.chown.gid],
	      [fs, fs.rename, tmpfile, filename]
	    ], function (err) {
	      err ? fs.unlink(tmpfile, function () { callback(err) })
	        : callback()
	    })
	  }
	}

	module.exports.sync = function writeFileSync (filename, data, options) {
	  if (!options) options = {}
	  var tmpfile = getTmpname(filename)

	  try {
	    if (!options.mode || !options.chmod) {
	      // Either mode or chown is not explicitly set
	      // Default behavior is to copy it from original file
	      try {
	        var stats = fs.statSync(filename)

	        options = extend({}, options)
	        if (!options.mode) {
	          options.mode = stats.mode
	        }
	        if (!options.chown && process.getuid) {
	          options.chown = { uid: stats.uid, gid: stats.gid }
	        }
	      } catch (ex) {
	        // ignore stat errors
	      }
	    }

	    fs.writeFileSync(tmpfile, data, options.encoding || 'utf8')
	    if (options.chown) fs.chownSync(tmpfile, options.chown.uid, options.chown.gid)
	    if (options.mode) fs.chmodSync(tmpfile, options.mode)
	    fs.renameSync(tmpfile, filename)
	  } catch (err) {
	    try { fs.unlinkSync(tmpfile) } catch (e) {}
	    throw err
	  }
	}

	/* WEBPACK VAR INJECTION */}.call(exports, "/index.js", __webpack_require__(2)))

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var fs = __webpack_require__(6)
	var polyfills = __webpack_require__(10)
	var legacy = __webpack_require__(13)
	var queue = []

	var util = __webpack_require__(34)

	function noop () {}

	var debug = noop
	if (util.debuglog)
	  debug = util.debuglog('gfs4')
	else if (/\bgfs4\b/i.test(process.env.NODE_DEBUG || ''))
	  debug = function() {
	    var m = util.format.apply(util, arguments)
	    m = 'GFS4: ' + m.split(/\n/).join('\nGFS4: ')
	    console.error(m)
	  }

	if (/\bgfs4\b/i.test(process.env.NODE_DEBUG || '')) {
	  process.on('exit', function() {
	    debug(queue)
	    __webpack_require__(37).equal(queue.length, 0)
	  })
	}

	module.exports = patch(__webpack_require__(11))
	if (process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH) {
	  module.exports = patch(fs)
	}

	// Always patch fs.close/closeSync, because we want to
	// retry() whenever a close happens *anywhere* in the program.
	// This is essential when multiple graceful-fs instances are
	// in play at the same time.
	module.exports.close =
	fs.close = (function (fs$close) { return function (fd, cb) {
	  return fs$close.call(fs, fd, function (err) {
	    if (!err)
	      retry()

	    if (typeof cb === 'function')
	      cb.apply(this, arguments)
	  })
	}})(fs.close)

	module.exports.closeSync =
	fs.closeSync = (function (fs$closeSync) { return function (fd) {
	  // Note that graceful-fs also retries when fs.closeSync() fails.
	  // Looks like a bug to me, although it's probably a harmless one.
	  var rval = fs$closeSync.apply(fs, arguments)
	  retry()
	  return rval
	}})(fs.closeSync)

	function patch (fs) {
	  // Everything that references the open() function needs to be in here
	  polyfills(fs)
	  fs.gracefulify = patch
	  fs.FileReadStream = ReadStream;  // Legacy name.
	  fs.FileWriteStream = WriteStream;  // Legacy name.
	  fs.createReadStream = createReadStream
	  fs.createWriteStream = createWriteStream
	  var fs$readFile = fs.readFile
	  fs.readFile = readFile
	  function readFile (path, options, cb) {
	    if (typeof options === 'function')
	      cb = options, options = null

	    return go$readFile(path, options, cb)

	    function go$readFile (path, options, cb) {
	      return fs$readFile(path, options, function (err) {
	        if (err && (err.code === 'EMFILE' || err.code === 'ENFILE'))
	          enqueue([go$readFile, [path, options, cb]])
	        else {
	          if (typeof cb === 'function')
	            cb.apply(this, arguments)
	          retry()
	        }
	      })
	    }
	  }

	  var fs$writeFile = fs.writeFile
	  fs.writeFile = writeFile
	  function writeFile (path, data, options, cb) {
	    if (typeof options === 'function')
	      cb = options, options = null

	    return go$writeFile(path, data, options, cb)

	    function go$writeFile (path, data, options, cb) {
	      return fs$writeFile(path, data, options, function (err) {
	        if (err && (err.code === 'EMFILE' || err.code === 'ENFILE'))
	          enqueue([go$writeFile, [path, data, options, cb]])
	        else {
	          if (typeof cb === 'function')
	            cb.apply(this, arguments)
	          retry()
	        }
	      })
	    }
	  }

	  var fs$appendFile = fs.appendFile
	  if (fs$appendFile)
	    fs.appendFile = appendFile
	  function appendFile (path, data, options, cb) {
	    if (typeof options === 'function')
	      cb = options, options = null

	    return go$appendFile(path, data, options, cb)

	    function go$appendFile (path, data, options, cb) {
	      return fs$appendFile(path, data, options, function (err) {
	        if (err && (err.code === 'EMFILE' || err.code === 'ENFILE'))
	          enqueue([go$appendFile, [path, data, options, cb]])
	        else {
	          if (typeof cb === 'function')
	            cb.apply(this, arguments)
	          retry()
	        }
	      })
	    }
	  }

	  var fs$readdir = fs.readdir
	  fs.readdir = readdir
	  function readdir (path, options, cb) {
	    var args = [path]
	    if (typeof options !== 'function') {
	      args.push(options)
	    } else {
	      cb = options
	    }
	    args.push(go$readdir$cb)

	    return go$readdir(args)

	    function go$readdir$cb (err, files) {
	      if (files && files.sort)
	        files.sort()

	      if (err && (err.code === 'EMFILE' || err.code === 'ENFILE'))
	        enqueue([go$readdir, [args]])
	      else {
	        if (typeof cb === 'function')
	          cb.apply(this, arguments)
	        retry()
	      }
	    }
	  }

	  function go$readdir (args) {
	    return fs$readdir.apply(fs, args)
	  }

	  if (process.version.substr(0, 4) === 'v0.8') {
	    var legStreams = legacy(fs)
	    ReadStream = legStreams.ReadStream
	    WriteStream = legStreams.WriteStream
	  }

	  var fs$ReadStream = fs.ReadStream
	  ReadStream.prototype = Object.create(fs$ReadStream.prototype)
	  ReadStream.prototype.open = ReadStream$open

	  var fs$WriteStream = fs.WriteStream
	  WriteStream.prototype = Object.create(fs$WriteStream.prototype)
	  WriteStream.prototype.open = WriteStream$open

	  fs.ReadStream = ReadStream
	  fs.WriteStream = WriteStream

	  function ReadStream (path, options) {
	    if (this instanceof ReadStream)
	      return fs$ReadStream.apply(this, arguments), this
	    else
	      return ReadStream.apply(Object.create(ReadStream.prototype), arguments)
	  }

	  function ReadStream$open () {
	    var that = this
	    open(that.path, that.flags, that.mode, function (err, fd) {
	      if (err) {
	        if (that.autoClose)
	          that.destroy()

	        that.emit('error', err)
	      } else {
	        that.fd = fd
	        that.emit('open', fd)
	        that.read()
	      }
	    })
	  }

	  function WriteStream (path, options) {
	    if (this instanceof WriteStream)
	      return fs$WriteStream.apply(this, arguments), this
	    else
	      return WriteStream.apply(Object.create(WriteStream.prototype), arguments)
	  }

	  function WriteStream$open () {
	    var that = this
	    open(that.path, that.flags, that.mode, function (err, fd) {
	      if (err) {
	        that.destroy()
	        that.emit('error', err)
	      } else {
	        that.fd = fd
	        that.emit('open', fd)
	      }
	    })
	  }

	  function createReadStream (path, options) {
	    return new ReadStream(path, options)
	  }

	  function createWriteStream (path, options) {
	    return new WriteStream(path, options)
	  }

	  var fs$open = fs.open
	  fs.open = open
	  function open (path, flags, mode, cb) {
	    if (typeof mode === 'function')
	      cb = mode, mode = null

	    return go$open(path, flags, mode, cb)

	    function go$open (path, flags, mode, cb) {
	      return fs$open(path, flags, mode, function (err, fd) {
	        if (err && (err.code === 'EMFILE' || err.code === 'ENFILE'))
	          enqueue([go$open, [path, flags, mode, cb]])
	        else {
	          if (typeof cb === 'function')
	            cb.apply(this, arguments)
	          retry()
	        }
	      })
	    }
	  }

	  return fs
	}

	function enqueue (elem) {
	  debug('ENQUEUE', elem[0].name, elem[1])
	  queue.push(elem)
	}

	function retry () {
	  var elem = queue.shift()
	  if (elem) {
	    debug('RETRY', elem[0].name, elem[1])
	    elem[0].apply(null, elem[1])
	  }
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var fs = __webpack_require__(11)
	var constants = __webpack_require__(12)

	var origCwd = process.cwd
	var cwd = null

	var platform = process.env.GRACEFUL_FS_PLATFORM || process.platform

	process.cwd = function() {
	  if (!cwd)
	    cwd = origCwd.call(process)
	  return cwd
	}
	try {
	  process.cwd()
	} catch (er) {}

	var chdir = process.chdir
	process.chdir = function(d) {
	  cwd = null
	  chdir.call(process, d)
	}

	module.exports = patch

	function patch (fs) {
	  // (re-)implement some things that are known busted or missing.

	  // lchmod, broken prior to 0.6.2
	  // back-port the fix here.
	  if (constants.hasOwnProperty('O_SYMLINK') &&
	      process.version.match(/^v0\.6\.[0-2]|^v0\.5\./)) {
	    patchLchmod(fs)
	  }

	  // lutimes implementation, or no-op
	  if (!fs.lutimes) {
	    patchLutimes(fs)
	  }

	  // https://github.com/isaacs/node-graceful-fs/issues/4
	  // Chown should not fail on einval or eperm if non-root.
	  // It should not fail on enosys ever, as this just indicates
	  // that a fs doesn't support the intended operation.

	  fs.chown = chownFix(fs.chown)
	  fs.fchown = chownFix(fs.fchown)
	  fs.lchown = chownFix(fs.lchown)

	  fs.chmod = chmodFix(fs.chmod)
	  fs.fchmod = chmodFix(fs.fchmod)
	  fs.lchmod = chmodFix(fs.lchmod)

	  fs.chownSync = chownFixSync(fs.chownSync)
	  fs.fchownSync = chownFixSync(fs.fchownSync)
	  fs.lchownSync = chownFixSync(fs.lchownSync)

	  fs.chmodSync = chmodFixSync(fs.chmodSync)
	  fs.fchmodSync = chmodFixSync(fs.fchmodSync)
	  fs.lchmodSync = chmodFixSync(fs.lchmodSync)

	  fs.stat = statFix(fs.stat)
	  fs.fstat = statFix(fs.fstat)
	  fs.lstat = statFix(fs.lstat)

	  fs.statSync = statFixSync(fs.statSync)
	  fs.fstatSync = statFixSync(fs.fstatSync)
	  fs.lstatSync = statFixSync(fs.lstatSync)

	  // if lchmod/lchown do not exist, then make them no-ops
	  if (!fs.lchmod) {
	    fs.lchmod = function (path, mode, cb) {
	      if (cb) process.nextTick(cb)
	    }
	    fs.lchmodSync = function () {}
	  }
	  if (!fs.lchown) {
	    fs.lchown = function (path, uid, gid, cb) {
	      if (cb) process.nextTick(cb)
	    }
	    fs.lchownSync = function () {}
	  }

	  // on Windows, A/V software can lock the directory, causing this
	  // to fail with an EACCES or EPERM if the directory contains newly
	  // created files.  Try again on failure, for up to 60 seconds.

	  // Set the timeout this long because some Windows Anti-Virus, such as Parity
	  // bit9, may lock files for up to a minute, causing npm package install
	  // failures. Also, take care to yield the scheduler. Windows scheduling gives
	  // CPU to a busy looping process, which can cause the program causing the lock
	  // contention to be starved of CPU by node, so the contention doesn't resolve.
	  if (platform === "win32") {
	    fs.rename = (function (fs$rename) { return function (from, to, cb) {
	      var start = Date.now()
	      var backoff = 0;
	      fs$rename(from, to, function CB (er) {
	        if (er
	            && (er.code === "EACCES" || er.code === "EPERM")
	            && Date.now() - start < 60000) {
	          setTimeout(function() {
	            fs.stat(to, function (stater, st) {
	              if (stater && stater.code === "ENOENT")
	                fs$rename(from, to, CB);
	              else
	                cb(er)
	            })
	          }, backoff)
	          if (backoff < 100)
	            backoff += 10;
	          return;
	        }
	        if (cb) cb(er)
	      })
	    }})(fs.rename)
	  }

	  // if read() returns EAGAIN, then just try it again.
	  fs.read = (function (fs$read) { return function (fd, buffer, offset, length, position, callback_) {
	    var callback
	    if (callback_ && typeof callback_ === 'function') {
	      var eagCounter = 0
	      callback = function (er, _, __) {
	        if (er && er.code === 'EAGAIN' && eagCounter < 10) {
	          eagCounter ++
	          return fs$read.call(fs, fd, buffer, offset, length, position, callback)
	        }
	        callback_.apply(this, arguments)
	      }
	    }
	    return fs$read.call(fs, fd, buffer, offset, length, position, callback)
	  }})(fs.read)

	  fs.readSync = (function (fs$readSync) { return function (fd, buffer, offset, length, position) {
	    var eagCounter = 0
	    while (true) {
	      try {
	        return fs$readSync.call(fs, fd, buffer, offset, length, position)
	      } catch (er) {
	        if (er.code === 'EAGAIN' && eagCounter < 10) {
	          eagCounter ++
	          continue
	        }
	        throw er
	      }
	    }
	  }})(fs.readSync)
	}

	function patchLchmod (fs) {
	  fs.lchmod = function (path, mode, callback) {
	    fs.open( path
	           , constants.O_WRONLY | constants.O_SYMLINK
	           , mode
	           , function (err, fd) {
	      if (err) {
	        if (callback) callback(err)
	        return
	      }
	      // prefer to return the chmod error, if one occurs,
	      // but still try to close, and report closing errors if they occur.
	      fs.fchmod(fd, mode, function (err) {
	        fs.close(fd, function(err2) {
	          if (callback) callback(err || err2)
	        })
	      })
	    })
	  }

	  fs.lchmodSync = function (path, mode) {
	    var fd = fs.openSync(path, constants.O_WRONLY | constants.O_SYMLINK, mode)

	    // prefer to return the chmod error, if one occurs,
	    // but still try to close, and report closing errors if they occur.
	    var threw = true
	    var ret
	    try {
	      ret = fs.fchmodSync(fd, mode)
	      threw = false
	    } finally {
	      if (threw) {
	        try {
	          fs.closeSync(fd)
	        } catch (er) {}
	      } else {
	        fs.closeSync(fd)
	      }
	    }
	    return ret
	  }
	}

	function patchLutimes (fs) {
	  if (constants.hasOwnProperty("O_SYMLINK")) {
	    fs.lutimes = function (path, at, mt, cb) {
	      fs.open(path, constants.O_SYMLINK, function (er, fd) {
	        if (er) {
	          if (cb) cb(er)
	          return
	        }
	        fs.futimes(fd, at, mt, function (er) {
	          fs.close(fd, function (er2) {
	            if (cb) cb(er || er2)
	          })
	        })
	      })
	    }

	    fs.lutimesSync = function (path, at, mt) {
	      var fd = fs.openSync(path, constants.O_SYMLINK)
	      var ret
	      var threw = true
	      try {
	        ret = fs.futimesSync(fd, at, mt)
	        threw = false
	      } finally {
	        if (threw) {
	          try {
	            fs.closeSync(fd)
	          } catch (er) {}
	        } else {
	          fs.closeSync(fd)
	        }
	      }
	      return ret
	    }

	  } else {
	    fs.lutimes = function (_a, _b, _c, cb) { if (cb) process.nextTick(cb) }
	    fs.lutimesSync = function () {}
	  }
	}

	function chmodFix (orig) {
	  if (!orig) return orig
	  return function (target, mode, cb) {
	    return orig.call(fs, target, mode, function (er) {
	      if (chownErOk(er)) er = null
	      if (cb) cb.apply(this, arguments)
	    })
	  }
	}

	function chmodFixSync (orig) {
	  if (!orig) return orig
	  return function (target, mode) {
	    try {
	      return orig.call(fs, target, mode)
	    } catch (er) {
	      if (!chownErOk(er)) throw er
	    }
	  }
	}


	function chownFix (orig) {
	  if (!orig) return orig
	  return function (target, uid, gid, cb) {
	    return orig.call(fs, target, uid, gid, function (er) {
	      if (chownErOk(er)) er = null
	      if (cb) cb.apply(this, arguments)
	    })
	  }
	}

	function chownFixSync (orig) {
	  if (!orig) return orig
	  return function (target, uid, gid) {
	    try {
	      return orig.call(fs, target, uid, gid)
	    } catch (er) {
	      if (!chownErOk(er)) throw er
	    }
	  }
	}


	function statFix (orig) {
	  if (!orig) return orig
	  // Older versions of Node erroneously returned signed integers for
	  // uid + gid.
	  return function (target, cb) {
	    return orig.call(fs, target, function (er, stats) {
	      if (!stats) return cb.apply(this, arguments)
	      if (stats.uid < 0) stats.uid += 0x100000000
	      if (stats.gid < 0) stats.gid += 0x100000000
	      if (cb) cb.apply(this, arguments)
	    })
	  }
	}

	function statFixSync (orig) {
	  if (!orig) return orig
	  // Older versions of Node erroneously returned signed integers for
	  // uid + gid.
	  return function (target) {
	    var stats = orig.call(fs, target)
	    if (stats.uid < 0) stats.uid += 0x100000000
	    if (stats.gid < 0) stats.gid += 0x100000000
	    return stats;
	  }
	}

	// ENOSYS means that the fs doesn't support the op. Just ignore
	// that, because it doesn't matter.
	//
	// if there's no getuid, or if getuid() is something other
	// than 0, and the error is EINVAL or EPERM, then just ignore
	// it.
	//
	// This specific case is a silent failure in cp, install, tar,
	// and most other unix tools that manage permissions.
	//
	// When running as root, or if other types of errors are
	// encountered, then it's strict.
	function chownErOk (er) {
	  if (!er)
	    return true

	  if (er.code === "ENOSYS")
	    return true

	  var nonroot = !process.getuid || process.getuid() !== 0
	  if (nonroot) {
	    if (er.code === "EINVAL" || er.code === "EPERM")
	      return true
	  }

	  return false
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'

	var fs = __webpack_require__(6)

	module.exports = clone(fs)

	function clone (obj) {
	  if (obj === null || typeof obj !== 'object')
	    return obj

	  if (obj instanceof Object)
	    var copy = { __proto__: obj.__proto__ }
	  else
	    var copy = Object.create(null)

	  Object.getOwnPropertyNames(obj).forEach(function (key) {
	    Object.defineProperty(copy, key, Object.getOwnPropertyDescriptor(obj, key))
	  })

	  return copy
	}


/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = {
		"O_RDONLY": 0,
		"O_WRONLY": 1,
		"O_RDWR": 2,
		"S_IFMT": 61440,
		"S_IFREG": 32768,
		"S_IFDIR": 16384,
		"S_IFCHR": 8192,
		"S_IFBLK": 24576,
		"S_IFIFO": 4096,
		"S_IFLNK": 40960,
		"S_IFSOCK": 49152,
		"O_CREAT": 512,
		"O_EXCL": 2048,
		"O_NOCTTY": 131072,
		"O_TRUNC": 1024,
		"O_APPEND": 8,
		"O_DIRECTORY": 1048576,
		"O_NOFOLLOW": 256,
		"O_SYNC": 128,
		"O_SYMLINK": 2097152,
		"S_IRWXU": 448,
		"S_IRUSR": 256,
		"S_IWUSR": 128,
		"S_IXUSR": 64,
		"S_IRWXG": 56,
		"S_IRGRP": 32,
		"S_IWGRP": 16,
		"S_IXGRP": 8,
		"S_IRWXO": 7,
		"S_IROTH": 4,
		"S_IWOTH": 2,
		"S_IXOTH": 1,
		"E2BIG": 7,
		"EACCES": 13,
		"EADDRINUSE": 48,
		"EADDRNOTAVAIL": 49,
		"EAFNOSUPPORT": 47,
		"EAGAIN": 35,
		"EALREADY": 37,
		"EBADF": 9,
		"EBADMSG": 94,
		"EBUSY": 16,
		"ECANCELED": 89,
		"ECHILD": 10,
		"ECONNABORTED": 53,
		"ECONNREFUSED": 61,
		"ECONNRESET": 54,
		"EDEADLK": 11,
		"EDESTADDRREQ": 39,
		"EDOM": 33,
		"EDQUOT": 69,
		"EEXIST": 17,
		"EFAULT": 14,
		"EFBIG": 27,
		"EHOSTUNREACH": 65,
		"EIDRM": 90,
		"EILSEQ": 92,
		"EINPROGRESS": 36,
		"EINTR": 4,
		"EINVAL": 22,
		"EIO": 5,
		"EISCONN": 56,
		"EISDIR": 21,
		"ELOOP": 62,
		"EMFILE": 24,
		"EMLINK": 31,
		"EMSGSIZE": 40,
		"EMULTIHOP": 95,
		"ENAMETOOLONG": 63,
		"ENETDOWN": 50,
		"ENETRESET": 52,
		"ENETUNREACH": 51,
		"ENFILE": 23,
		"ENOBUFS": 55,
		"ENODATA": 96,
		"ENODEV": 19,
		"ENOENT": 2,
		"ENOEXEC": 8,
		"ENOLCK": 77,
		"ENOLINK": 97,
		"ENOMEM": 12,
		"ENOMSG": 91,
		"ENOPROTOOPT": 42,
		"ENOSPC": 28,
		"ENOSR": 98,
		"ENOSTR": 99,
		"ENOSYS": 78,
		"ENOTCONN": 57,
		"ENOTDIR": 20,
		"ENOTEMPTY": 66,
		"ENOTSOCK": 38,
		"ENOTSUP": 45,
		"ENOTTY": 25,
		"ENXIO": 6,
		"EOPNOTSUPP": 102,
		"EOVERFLOW": 84,
		"EPERM": 1,
		"EPIPE": 32,
		"EPROTO": 100,
		"EPROTONOSUPPORT": 43,
		"EPROTOTYPE": 41,
		"ERANGE": 34,
		"EROFS": 30,
		"ESPIPE": 29,
		"ESRCH": 3,
		"ESTALE": 70,
		"ETIME": 101,
		"ETIMEDOUT": 60,
		"ETXTBSY": 26,
		"EWOULDBLOCK": 35,
		"EXDEV": 18,
		"SIGHUP": 1,
		"SIGINT": 2,
		"SIGQUIT": 3,
		"SIGILL": 4,
		"SIGTRAP": 5,
		"SIGABRT": 6,
		"SIGIOT": 6,
		"SIGBUS": 10,
		"SIGFPE": 8,
		"SIGKILL": 9,
		"SIGUSR1": 30,
		"SIGSEGV": 11,
		"SIGUSR2": 31,
		"SIGPIPE": 13,
		"SIGALRM": 14,
		"SIGTERM": 15,
		"SIGCHLD": 20,
		"SIGCONT": 19,
		"SIGSTOP": 17,
		"SIGTSTP": 18,
		"SIGTTIN": 21,
		"SIGTTOU": 22,
		"SIGURG": 16,
		"SIGXCPU": 24,
		"SIGXFSZ": 25,
		"SIGVTALRM": 26,
		"SIGPROF": 27,
		"SIGWINCH": 28,
		"SIGIO": 23,
		"SIGSYS": 12,
		"SSL_OP_ALL": 2147486719,
		"SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION": 262144,
		"SSL_OP_CIPHER_SERVER_PREFERENCE": 4194304,
		"SSL_OP_CISCO_ANYCONNECT": 32768,
		"SSL_OP_COOKIE_EXCHANGE": 8192,
		"SSL_OP_CRYPTOPRO_TLSEXT_BUG": 2147483648,
		"SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS": 2048,
		"SSL_OP_EPHEMERAL_RSA": 2097152,
		"SSL_OP_LEGACY_SERVER_CONNECT": 4,
		"SSL_OP_MICROSOFT_BIG_SSLV3_BUFFER": 32,
		"SSL_OP_MICROSOFT_SESS_ID_BUG": 1,
		"SSL_OP_MSIE_SSLV2_RSA_PADDING": 64,
		"SSL_OP_NETSCAPE_CA_DN_BUG": 536870912,
		"SSL_OP_NETSCAPE_CHALLENGE_BUG": 2,
		"SSL_OP_NETSCAPE_DEMO_CIPHER_CHANGE_BUG": 1073741824,
		"SSL_OP_NETSCAPE_REUSE_CIPHER_CHANGE_BUG": 8,
		"SSL_OP_NO_COMPRESSION": 131072,
		"SSL_OP_NO_QUERY_MTU": 4096,
		"SSL_OP_NO_SESSION_RESUMPTION_ON_RENEGOTIATION": 65536,
		"SSL_OP_NO_SSLv2": 16777216,
		"SSL_OP_NO_SSLv3": 33554432,
		"SSL_OP_NO_TICKET": 16384,
		"SSL_OP_NO_TLSv1": 67108864,
		"SSL_OP_NO_TLSv1_1": 268435456,
		"SSL_OP_NO_TLSv1_2": 134217728,
		"SSL_OP_PKCS1_CHECK_1": 0,
		"SSL_OP_PKCS1_CHECK_2": 0,
		"SSL_OP_SINGLE_DH_USE": 1048576,
		"SSL_OP_SINGLE_ECDH_USE": 524288,
		"SSL_OP_SSLEAY_080_CLIENT_DH_BUG": 128,
		"SSL_OP_SSLREF2_REUSE_CERT_TYPE_BUG": 16,
		"SSL_OP_TLS_BLOCK_PADDING_BUG": 512,
		"SSL_OP_TLS_D5_BUG": 256,
		"SSL_OP_TLS_ROLLBACK_BUG": 8388608,
		"NPN_ENABLED": 1
	};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var Stream = __webpack_require__(14).Stream

	module.exports = legacy

	function legacy (fs) {
	  return {
	    ReadStream: ReadStream,
	    WriteStream: WriteStream
	  }

	  function ReadStream (path, options) {
	    if (!(this instanceof ReadStream)) return new ReadStream(path, options);

	    Stream.call(this);

	    var self = this;

	    this.path = path;
	    this.fd = null;
	    this.readable = true;
	    this.paused = false;

	    this.flags = 'r';
	    this.mode = 438; /*=0666*/
	    this.bufferSize = 64 * 1024;

	    options = options || {};

	    // Mixin options into this
	    var keys = Object.keys(options);
	    for (var index = 0, length = keys.length; index < length; index++) {
	      var key = keys[index];
	      this[key] = options[key];
	    }

	    if (this.encoding) this.setEncoding(this.encoding);

	    if (this.start !== undefined) {
	      if ('number' !== typeof this.start) {
	        throw TypeError('start must be a Number');
	      }
	      if (this.end === undefined) {
	        this.end = Infinity;
	      } else if ('number' !== typeof this.end) {
	        throw TypeError('end must be a Number');
	      }

	      if (this.start > this.end) {
	        throw new Error('start must be <= end');
	      }

	      this.pos = this.start;
	    }

	    if (this.fd !== null) {
	      process.nextTick(function() {
	        self._read();
	      });
	      return;
	    }

	    fs.open(this.path, this.flags, this.mode, function (err, fd) {
	      if (err) {
	        self.emit('error', err);
	        self.readable = false;
	        return;
	      }

	      self.fd = fd;
	      self.emit('open', fd);
	      self._read();
	    })
	  }

	  function WriteStream (path, options) {
	    if (!(this instanceof WriteStream)) return new WriteStream(path, options);

	    Stream.call(this);

	    this.path = path;
	    this.fd = null;
	    this.writable = true;

	    this.flags = 'w';
	    this.encoding = 'binary';
	    this.mode = 438; /*=0666*/
	    this.bytesWritten = 0;

	    options = options || {};

	    // Mixin options into this
	    var keys = Object.keys(options);
	    for (var index = 0, length = keys.length; index < length; index++) {
	      var key = keys[index];
	      this[key] = options[key];
	    }

	    if (this.start !== undefined) {
	      if ('number' !== typeof this.start) {
	        throw TypeError('start must be a Number');
	      }
	      if (this.start < 0) {
	        throw new Error('start must be >= zero');
	      }

	      this.pos = this.start;
	    }

	    this.busy = false;
	    this._queue = [];

	    if (this.fd === null) {
	      this._open = fs.open;
	      this._queue.push([this._open, this.path, this.flags, this.mode, undefined]);
	      this.flush();
	    }
	  }
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	module.exports = Stream;

	var EE = __webpack_require__(7).EventEmitter;
	var inherits = __webpack_require__(15);

	inherits(Stream, EE);
	Stream.Readable = __webpack_require__(16);
	Stream.Writable = __webpack_require__(30);
	Stream.Duplex = __webpack_require__(31);
	Stream.Transform = __webpack_require__(32);
	Stream.PassThrough = __webpack_require__(33);

	// Backwards-compat with node 0.4.x
	Stream.Stream = Stream;



	// old-style streams.  Note that the pipe method (the only relevant
	// part of this class) is overridden in the Readable class.

	function Stream() {
	  EE.call(this);
	}

	Stream.prototype.pipe = function(dest, options) {
	  var source = this;

	  function ondata(chunk) {
	    if (dest.writable) {
	      if (false === dest.write(chunk) && source.pause) {
	        source.pause();
	      }
	    }
	  }

	  source.on('data', ondata);

	  function ondrain() {
	    if (source.readable && source.resume) {
	      source.resume();
	    }
	  }

	  dest.on('drain', ondrain);

	  // If the 'end' option is not supplied, dest.end() will be called when
	  // source gets the 'end' or 'close' events.  Only dest.end() once.
	  if (!dest._isStdio && (!options || options.end !== false)) {
	    source.on('end', onend);
	    source.on('close', onclose);
	  }

	  var didOnEnd = false;
	  function onend() {
	    if (didOnEnd) return;
	    didOnEnd = true;

	    dest.end();
	  }


	  function onclose() {
	    if (didOnEnd) return;
	    didOnEnd = true;

	    if (typeof dest.destroy === 'function') dest.destroy();
	  }

	  // don't leave dangling pipes when there are errors.
	  function onerror(er) {
	    cleanup();
	    if (EE.listenerCount(this, 'error') === 0) {
	      throw er; // Unhandled stream error in pipe.
	    }
	  }

	  source.on('error', onerror);
	  dest.on('error', onerror);

	  // remove all the event listeners that were added.
	  function cleanup() {
	    source.removeListener('data', ondata);
	    dest.removeListener('drain', ondrain);

	    source.removeListener('end', onend);
	    source.removeListener('close', onclose);

	    source.removeListener('error', onerror);
	    dest.removeListener('error', onerror);

	    source.removeListener('end', cleanup);
	    source.removeListener('close', cleanup);

	    dest.removeListener('close', cleanup);
	  }

	  source.on('end', cleanup);
	  source.on('close', cleanup);

	  dest.on('close', cleanup);

	  dest.emit('pipe', source);

	  // Allow for unix-like usage: A.pipe(B).pipe(C)
	  return dest;
	};


/***/ },
/* 15 */
/***/ function(module, exports) {

	if (typeof Object.create === 'function') {
	  // implementation from standard node.js 'util' module
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    ctor.prototype = Object.create(superCtor.prototype, {
	      constructor: {
	        value: ctor,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	  };
	} else {
	  // old school shim for old browsers
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    var TempCtor = function () {}
	    TempCtor.prototype = superCtor.prototype
	    ctor.prototype = new TempCtor()
	    ctor.prototype.constructor = ctor
	  }
	}


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {exports = module.exports = __webpack_require__(17);
	exports.Stream = __webpack_require__(14);
	exports.Readable = exports;
	exports.Writable = __webpack_require__(26);
	exports.Duplex = __webpack_require__(25);
	exports.Transform = __webpack_require__(28);
	exports.PassThrough = __webpack_require__(29);
	if (!process.browser && process.env.READABLE_STREAM === 'disable') {
	  module.exports = __webpack_require__(14);
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	module.exports = Readable;

	/*<replacement>*/
	var isArray = __webpack_require__(18);
	/*</replacement>*/


	/*<replacement>*/
	var Buffer = __webpack_require__(19).Buffer;
	/*</replacement>*/

	Readable.ReadableState = ReadableState;

	var EE = __webpack_require__(7).EventEmitter;

	/*<replacement>*/
	if (!EE.listenerCount) EE.listenerCount = function(emitter, type) {
	  return emitter.listeners(type).length;
	};
	/*</replacement>*/

	var Stream = __webpack_require__(14);

	/*<replacement>*/
	var util = __webpack_require__(23);
	util.inherits = __webpack_require__(15);
	/*</replacement>*/

	var StringDecoder;


	/*<replacement>*/
	var debug = __webpack_require__(24);
	if (debug && debug.debuglog) {
	  debug = debug.debuglog('stream');
	} else {
	  debug = function () {};
	}
	/*</replacement>*/


	util.inherits(Readable, Stream);

	function ReadableState(options, stream) {
	  var Duplex = __webpack_require__(25);

	  options = options || {};

	  // the point at which it stops calling _read() to fill the buffer
	  // Note: 0 is a valid value, means "don't call _read preemptively ever"
	  var hwm = options.highWaterMark;
	  var defaultHwm = options.objectMode ? 16 : 16 * 1024;
	  this.highWaterMark = (hwm || hwm === 0) ? hwm : defaultHwm;

	  // cast to ints.
	  this.highWaterMark = ~~this.highWaterMark;

	  this.buffer = [];
	  this.length = 0;
	  this.pipes = null;
	  this.pipesCount = 0;
	  this.flowing = null;
	  this.ended = false;
	  this.endEmitted = false;
	  this.reading = false;

	  // a flag to be able to tell if the onwrite cb is called immediately,
	  // or on a later tick.  We set this to true at first, because any
	  // actions that shouldn't happen until "later" should generally also
	  // not happen before the first write call.
	  this.sync = true;

	  // whenever we return null, then we set a flag to say
	  // that we're awaiting a 'readable' event emission.
	  this.needReadable = false;
	  this.emittedReadable = false;
	  this.readableListening = false;


	  // object stream flag. Used to make read(n) ignore n and to
	  // make all the buffer merging and length checks go away
	  this.objectMode = !!options.objectMode;

	  if (stream instanceof Duplex)
	    this.objectMode = this.objectMode || !!options.readableObjectMode;

	  // Crypto is kind of old and crusty.  Historically, its default string
	  // encoding is 'binary' so we have to make this configurable.
	  // Everything else in the universe uses 'utf8', though.
	  this.defaultEncoding = options.defaultEncoding || 'utf8';

	  // when piping, we only care about 'readable' events that happen
	  // after read()ing all the bytes and not getting any pushback.
	  this.ranOut = false;

	  // the number of writers that are awaiting a drain event in .pipe()s
	  this.awaitDrain = 0;

	  // if true, a maybeReadMore has been scheduled
	  this.readingMore = false;

	  this.decoder = null;
	  this.encoding = null;
	  if (options.encoding) {
	    if (!StringDecoder)
	      StringDecoder = __webpack_require__(27).StringDecoder;
	    this.decoder = new StringDecoder(options.encoding);
	    this.encoding = options.encoding;
	  }
	}

	function Readable(options) {
	  var Duplex = __webpack_require__(25);

	  if (!(this instanceof Readable))
	    return new Readable(options);

	  this._readableState = new ReadableState(options, this);

	  // legacy
	  this.readable = true;

	  Stream.call(this);
	}

	// Manually shove something into the read() buffer.
	// This returns true if the highWaterMark has not been hit yet,
	// similar to how Writable.write() returns true if you should
	// write() some more.
	Readable.prototype.push = function(chunk, encoding) {
	  var state = this._readableState;

	  if (util.isString(chunk) && !state.objectMode) {
	    encoding = encoding || state.defaultEncoding;
	    if (encoding !== state.encoding) {
	      chunk = new Buffer(chunk, encoding);
	      encoding = '';
	    }
	  }

	  return readableAddChunk(this, state, chunk, encoding, false);
	};

	// Unshift should *always* be something directly out of read()
	Readable.prototype.unshift = function(chunk) {
	  var state = this._readableState;
	  return readableAddChunk(this, state, chunk, '', true);
	};

	function readableAddChunk(stream, state, chunk, encoding, addToFront) {
	  var er = chunkInvalid(state, chunk);
	  if (er) {
	    stream.emit('error', er);
	  } else if (util.isNullOrUndefined(chunk)) {
	    state.reading = false;
	    if (!state.ended)
	      onEofChunk(stream, state);
	  } else if (state.objectMode || chunk && chunk.length > 0) {
	    if (state.ended && !addToFront) {
	      var e = new Error('stream.push() after EOF');
	      stream.emit('error', e);
	    } else if (state.endEmitted && addToFront) {
	      var e = new Error('stream.unshift() after end event');
	      stream.emit('error', e);
	    } else {
	      if (state.decoder && !addToFront && !encoding)
	        chunk = state.decoder.write(chunk);

	      if (!addToFront)
	        state.reading = false;

	      // if we want the data now, just emit it.
	      if (state.flowing && state.length === 0 && !state.sync) {
	        stream.emit('data', chunk);
	        stream.read(0);
	      } else {
	        // update the buffer info.
	        state.length += state.objectMode ? 1 : chunk.length;
	        if (addToFront)
	          state.buffer.unshift(chunk);
	        else
	          state.buffer.push(chunk);

	        if (state.needReadable)
	          emitReadable(stream);
	      }

	      maybeReadMore(stream, state);
	    }
	  } else if (!addToFront) {
	    state.reading = false;
	  }

	  return needMoreData(state);
	}



	// if it's past the high water mark, we can push in some more.
	// Also, if we have no data yet, we can stand some
	// more bytes.  This is to work around cases where hwm=0,
	// such as the repl.  Also, if the push() triggered a
	// readable event, and the user called read(largeNumber) such that
	// needReadable was set, then we ought to push more, so that another
	// 'readable' event will be triggered.
	function needMoreData(state) {
	  return !state.ended &&
	         (state.needReadable ||
	          state.length < state.highWaterMark ||
	          state.length === 0);
	}

	// backwards compatibility.
	Readable.prototype.setEncoding = function(enc) {
	  if (!StringDecoder)
	    StringDecoder = __webpack_require__(27).StringDecoder;
	  this._readableState.decoder = new StringDecoder(enc);
	  this._readableState.encoding = enc;
	  return this;
	};

	// Don't raise the hwm > 128MB
	var MAX_HWM = 0x800000;
	function roundUpToNextPowerOf2(n) {
	  if (n >= MAX_HWM) {
	    n = MAX_HWM;
	  } else {
	    // Get the next highest power of 2
	    n--;
	    for (var p = 1; p < 32; p <<= 1) n |= n >> p;
	    n++;
	  }
	  return n;
	}

	function howMuchToRead(n, state) {
	  if (state.length === 0 && state.ended)
	    return 0;

	  if (state.objectMode)
	    return n === 0 ? 0 : 1;

	  if (isNaN(n) || util.isNull(n)) {
	    // only flow one buffer at a time
	    if (state.flowing && state.buffer.length)
	      return state.buffer[0].length;
	    else
	      return state.length;
	  }

	  if (n <= 0)
	    return 0;

	  // If we're asking for more than the target buffer level,
	  // then raise the water mark.  Bump up to the next highest
	  // power of 2, to prevent increasing it excessively in tiny
	  // amounts.
	  if (n > state.highWaterMark)
	    state.highWaterMark = roundUpToNextPowerOf2(n);

	  // don't have that much.  return null, unless we've ended.
	  if (n > state.length) {
	    if (!state.ended) {
	      state.needReadable = true;
	      return 0;
	    } else
	      return state.length;
	  }

	  return n;
	}

	// you can override either this method, or the async _read(n) below.
	Readable.prototype.read = function(n) {
	  debug('read', n);
	  var state = this._readableState;
	  var nOrig = n;

	  if (!util.isNumber(n) || n > 0)
	    state.emittedReadable = false;

	  // if we're doing read(0) to trigger a readable event, but we
	  // already have a bunch of data in the buffer, then just trigger
	  // the 'readable' event and move on.
	  if (n === 0 &&
	      state.needReadable &&
	      (state.length >= state.highWaterMark || state.ended)) {
	    debug('read: emitReadable', state.length, state.ended);
	    if (state.length === 0 && state.ended)
	      endReadable(this);
	    else
	      emitReadable(this);
	    return null;
	  }

	  n = howMuchToRead(n, state);

	  // if we've ended, and we're now clear, then finish it up.
	  if (n === 0 && state.ended) {
	    if (state.length === 0)
	      endReadable(this);
	    return null;
	  }

	  // All the actual chunk generation logic needs to be
	  // *below* the call to _read.  The reason is that in certain
	  // synthetic stream cases, such as passthrough streams, _read
	  // may be a completely synchronous operation which may change
	  // the state of the read buffer, providing enough data when
	  // before there was *not* enough.
	  //
	  // So, the steps are:
	  // 1. Figure out what the state of things will be after we do
	  // a read from the buffer.
	  //
	  // 2. If that resulting state will trigger a _read, then call _read.
	  // Note that this may be asynchronous, or synchronous.  Yes, it is
	  // deeply ugly to write APIs this way, but that still doesn't mean
	  // that the Readable class should behave improperly, as streams are
	  // designed to be sync/async agnostic.
	  // Take note if the _read call is sync or async (ie, if the read call
	  // has returned yet), so that we know whether or not it's safe to emit
	  // 'readable' etc.
	  //
	  // 3. Actually pull the requested chunks out of the buffer and return.

	  // if we need a readable event, then we need to do some reading.
	  var doRead = state.needReadable;
	  debug('need readable', doRead);

	  // if we currently have less than the highWaterMark, then also read some
	  if (state.length === 0 || state.length - n < state.highWaterMark) {
	    doRead = true;
	    debug('length less than watermark', doRead);
	  }

	  // however, if we've ended, then there's no point, and if we're already
	  // reading, then it's unnecessary.
	  if (state.ended || state.reading) {
	    doRead = false;
	    debug('reading or ended', doRead);
	  }

	  if (doRead) {
	    debug('do read');
	    state.reading = true;
	    state.sync = true;
	    // if the length is currently zero, then we *need* a readable event.
	    if (state.length === 0)
	      state.needReadable = true;
	    // call internal read method
	    this._read(state.highWaterMark);
	    state.sync = false;
	  }

	  // If _read pushed data synchronously, then `reading` will be false,
	  // and we need to re-evaluate how much data we can return to the user.
	  if (doRead && !state.reading)
	    n = howMuchToRead(nOrig, state);

	  var ret;
	  if (n > 0)
	    ret = fromList(n, state);
	  else
	    ret = null;

	  if (util.isNull(ret)) {
	    state.needReadable = true;
	    n = 0;
	  }

	  state.length -= n;

	  // If we have nothing in the buffer, then we want to know
	  // as soon as we *do* get something into the buffer.
	  if (state.length === 0 && !state.ended)
	    state.needReadable = true;

	  // If we tried to read() past the EOF, then emit end on the next tick.
	  if (nOrig !== n && state.ended && state.length === 0)
	    endReadable(this);

	  if (!util.isNull(ret))
	    this.emit('data', ret);

	  return ret;
	};

	function chunkInvalid(state, chunk) {
	  var er = null;
	  if (!util.isBuffer(chunk) &&
	      !util.isString(chunk) &&
	      !util.isNullOrUndefined(chunk) &&
	      !state.objectMode) {
	    er = new TypeError('Invalid non-string/buffer chunk');
	  }
	  return er;
	}


	function onEofChunk(stream, state) {
	  if (state.decoder && !state.ended) {
	    var chunk = state.decoder.end();
	    if (chunk && chunk.length) {
	      state.buffer.push(chunk);
	      state.length += state.objectMode ? 1 : chunk.length;
	    }
	  }
	  state.ended = true;

	  // emit 'readable' now to make sure it gets picked up.
	  emitReadable(stream);
	}

	// Don't emit readable right away in sync mode, because this can trigger
	// another read() call => stack overflow.  This way, it might trigger
	// a nextTick recursion warning, but that's not so bad.
	function emitReadable(stream) {
	  var state = stream._readableState;
	  state.needReadable = false;
	  if (!state.emittedReadable) {
	    debug('emitReadable', state.flowing);
	    state.emittedReadable = true;
	    if (state.sync)
	      process.nextTick(function() {
	        emitReadable_(stream);
	      });
	    else
	      emitReadable_(stream);
	  }
	}

	function emitReadable_(stream) {
	  debug('emit readable');
	  stream.emit('readable');
	  flow(stream);
	}


	// at this point, the user has presumably seen the 'readable' event,
	// and called read() to consume some data.  that may have triggered
	// in turn another _read(n) call, in which case reading = true if
	// it's in progress.
	// However, if we're not ended, or reading, and the length < hwm,
	// then go ahead and try to read some more preemptively.
	function maybeReadMore(stream, state) {
	  if (!state.readingMore) {
	    state.readingMore = true;
	    process.nextTick(function() {
	      maybeReadMore_(stream, state);
	    });
	  }
	}

	function maybeReadMore_(stream, state) {
	  var len = state.length;
	  while (!state.reading && !state.flowing && !state.ended &&
	         state.length < state.highWaterMark) {
	    debug('maybeReadMore read 0');
	    stream.read(0);
	    if (len === state.length)
	      // didn't get any data, stop spinning.
	      break;
	    else
	      len = state.length;
	  }
	  state.readingMore = false;
	}

	// abstract method.  to be overridden in specific implementation classes.
	// call cb(er, data) where data is <= n in length.
	// for virtual (non-string, non-buffer) streams, "length" is somewhat
	// arbitrary, and perhaps not very meaningful.
	Readable.prototype._read = function(n) {
	  this.emit('error', new Error('not implemented'));
	};

	Readable.prototype.pipe = function(dest, pipeOpts) {
	  var src = this;
	  var state = this._readableState;

	  switch (state.pipesCount) {
	    case 0:
	      state.pipes = dest;
	      break;
	    case 1:
	      state.pipes = [state.pipes, dest];
	      break;
	    default:
	      state.pipes.push(dest);
	      break;
	  }
	  state.pipesCount += 1;
	  debug('pipe count=%d opts=%j', state.pipesCount, pipeOpts);

	  var doEnd = (!pipeOpts || pipeOpts.end !== false) &&
	              dest !== process.stdout &&
	              dest !== process.stderr;

	  var endFn = doEnd ? onend : cleanup;
	  if (state.endEmitted)
	    process.nextTick(endFn);
	  else
	    src.once('end', endFn);

	  dest.on('unpipe', onunpipe);
	  function onunpipe(readable) {
	    debug('onunpipe');
	    if (readable === src) {
	      cleanup();
	    }
	  }

	  function onend() {
	    debug('onend');
	    dest.end();
	  }

	  // when the dest drains, it reduces the awaitDrain counter
	  // on the source.  This would be more elegant with a .once()
	  // handler in flow(), but adding and removing repeatedly is
	  // too slow.
	  var ondrain = pipeOnDrain(src);
	  dest.on('drain', ondrain);

	  function cleanup() {
	    debug('cleanup');
	    // cleanup event handlers once the pipe is broken
	    dest.removeListener('close', onclose);
	    dest.removeListener('finish', onfinish);
	    dest.removeListener('drain', ondrain);
	    dest.removeListener('error', onerror);
	    dest.removeListener('unpipe', onunpipe);
	    src.removeListener('end', onend);
	    src.removeListener('end', cleanup);
	    src.removeListener('data', ondata);

	    // if the reader is waiting for a drain event from this
	    // specific writer, then it would cause it to never start
	    // flowing again.
	    // So, if this is awaiting a drain, then we just call it now.
	    // If we don't know, then assume that we are waiting for one.
	    if (state.awaitDrain &&
	        (!dest._writableState || dest._writableState.needDrain))
	      ondrain();
	  }

	  src.on('data', ondata);
	  function ondata(chunk) {
	    debug('ondata');
	    var ret = dest.write(chunk);
	    if (false === ret) {
	      debug('false write response, pause',
	            src._readableState.awaitDrain);
	      src._readableState.awaitDrain++;
	      src.pause();
	    }
	  }

	  // if the dest has an error, then stop piping into it.
	  // however, don't suppress the throwing behavior for this.
	  function onerror(er) {
	    debug('onerror', er);
	    unpipe();
	    dest.removeListener('error', onerror);
	    if (EE.listenerCount(dest, 'error') === 0)
	      dest.emit('error', er);
	  }
	  // This is a brutally ugly hack to make sure that our error handler
	  // is attached before any userland ones.  NEVER DO THIS.
	  if (!dest._events || !dest._events.error)
	    dest.on('error', onerror);
	  else if (isArray(dest._events.error))
	    dest._events.error.unshift(onerror);
	  else
	    dest._events.error = [onerror, dest._events.error];



	  // Both close and finish should trigger unpipe, but only once.
	  function onclose() {
	    dest.removeListener('finish', onfinish);
	    unpipe();
	  }
	  dest.once('close', onclose);
	  function onfinish() {
	    debug('onfinish');
	    dest.removeListener('close', onclose);
	    unpipe();
	  }
	  dest.once('finish', onfinish);

	  function unpipe() {
	    debug('unpipe');
	    src.unpipe(dest);
	  }

	  // tell the dest that it's being piped to
	  dest.emit('pipe', src);

	  // start the flow if it hasn't been started already.
	  if (!state.flowing) {
	    debug('pipe resume');
	    src.resume();
	  }

	  return dest;
	};

	function pipeOnDrain(src) {
	  return function() {
	    var state = src._readableState;
	    debug('pipeOnDrain', state.awaitDrain);
	    if (state.awaitDrain)
	      state.awaitDrain--;
	    if (state.awaitDrain === 0 && EE.listenerCount(src, 'data')) {
	      state.flowing = true;
	      flow(src);
	    }
	  };
	}


	Readable.prototype.unpipe = function(dest) {
	  var state = this._readableState;

	  // if we're not piping anywhere, then do nothing.
	  if (state.pipesCount === 0)
	    return this;

	  // just one destination.  most common case.
	  if (state.pipesCount === 1) {
	    // passed in one, but it's not the right one.
	    if (dest && dest !== state.pipes)
	      return this;

	    if (!dest)
	      dest = state.pipes;

	    // got a match.
	    state.pipes = null;
	    state.pipesCount = 0;
	    state.flowing = false;
	    if (dest)
	      dest.emit('unpipe', this);
	    return this;
	  }

	  // slow case. multiple pipe destinations.

	  if (!dest) {
	    // remove all.
	    var dests = state.pipes;
	    var len = state.pipesCount;
	    state.pipes = null;
	    state.pipesCount = 0;
	    state.flowing = false;

	    for (var i = 0; i < len; i++)
	      dests[i].emit('unpipe', this);
	    return this;
	  }

	  // try to find the right one.
	  var i = indexOf(state.pipes, dest);
	  if (i === -1)
	    return this;

	  state.pipes.splice(i, 1);
	  state.pipesCount -= 1;
	  if (state.pipesCount === 1)
	    state.pipes = state.pipes[0];

	  dest.emit('unpipe', this);

	  return this;
	};

	// set up data events if they are asked for
	// Ensure readable listeners eventually get something
	Readable.prototype.on = function(ev, fn) {
	  var res = Stream.prototype.on.call(this, ev, fn);

	  // If listening to data, and it has not explicitly been paused,
	  // then call resume to start the flow of data on the next tick.
	  if (ev === 'data' && false !== this._readableState.flowing) {
	    this.resume();
	  }

	  if (ev === 'readable' && this.readable) {
	    var state = this._readableState;
	    if (!state.readableListening) {
	      state.readableListening = true;
	      state.emittedReadable = false;
	      state.needReadable = true;
	      if (!state.reading) {
	        var self = this;
	        process.nextTick(function() {
	          debug('readable nexttick read 0');
	          self.read(0);
	        });
	      } else if (state.length) {
	        emitReadable(this, state);
	      }
	    }
	  }

	  return res;
	};
	Readable.prototype.addListener = Readable.prototype.on;

	// pause() and resume() are remnants of the legacy readable stream API
	// If the user uses them, then switch into old mode.
	Readable.prototype.resume = function() {
	  var state = this._readableState;
	  if (!state.flowing) {
	    debug('resume');
	    state.flowing = true;
	    if (!state.reading) {
	      debug('resume read 0');
	      this.read(0);
	    }
	    resume(this, state);
	  }
	  return this;
	};

	function resume(stream, state) {
	  if (!state.resumeScheduled) {
	    state.resumeScheduled = true;
	    process.nextTick(function() {
	      resume_(stream, state);
	    });
	  }
	}

	function resume_(stream, state) {
	  state.resumeScheduled = false;
	  stream.emit('resume');
	  flow(stream);
	  if (state.flowing && !state.reading)
	    stream.read(0);
	}

	Readable.prototype.pause = function() {
	  debug('call pause flowing=%j', this._readableState.flowing);
	  if (false !== this._readableState.flowing) {
	    debug('pause');
	    this._readableState.flowing = false;
	    this.emit('pause');
	  }
	  return this;
	};

	function flow(stream) {
	  var state = stream._readableState;
	  debug('flow', state.flowing);
	  if (state.flowing) {
	    do {
	      var chunk = stream.read();
	    } while (null !== chunk && state.flowing);
	  }
	}

	// wrap an old-style stream as the async data source.
	// This is *not* part of the readable stream interface.
	// It is an ugly unfortunate mess of history.
	Readable.prototype.wrap = function(stream) {
	  var state = this._readableState;
	  var paused = false;

	  var self = this;
	  stream.on('end', function() {
	    debug('wrapped end');
	    if (state.decoder && !state.ended) {
	      var chunk = state.decoder.end();
	      if (chunk && chunk.length)
	        self.push(chunk);
	    }

	    self.push(null);
	  });

	  stream.on('data', function(chunk) {
	    debug('wrapped data');
	    if (state.decoder)
	      chunk = state.decoder.write(chunk);
	    if (!chunk || !state.objectMode && !chunk.length)
	      return;

	    var ret = self.push(chunk);
	    if (!ret) {
	      paused = true;
	      stream.pause();
	    }
	  });

	  // proxy all the other methods.
	  // important when wrapping filters and duplexes.
	  for (var i in stream) {
	    if (util.isFunction(stream[i]) && util.isUndefined(this[i])) {
	      this[i] = function(method) { return function() {
	        return stream[method].apply(stream, arguments);
	      }}(i);
	    }
	  }

	  // proxy certain important events.
	  var events = ['error', 'close', 'destroy', 'pause', 'resume'];
	  forEach(events, function(ev) {
	    stream.on(ev, self.emit.bind(self, ev));
	  });

	  // when we try to consume some more bytes, simply unpause the
	  // underlying stream.
	  self._read = function(n) {
	    debug('wrapped _read', n);
	    if (paused) {
	      paused = false;
	      stream.resume();
	    }
	  };

	  return self;
	};



	// exposed for testing purposes only.
	Readable._fromList = fromList;

	// Pluck off n bytes from an array of buffers.
	// Length is the combined lengths of all the buffers in the list.
	function fromList(n, state) {
	  var list = state.buffer;
	  var length = state.length;
	  var stringMode = !!state.decoder;
	  var objectMode = !!state.objectMode;
	  var ret;

	  // nothing in the list, definitely empty.
	  if (list.length === 0)
	    return null;

	  if (length === 0)
	    ret = null;
	  else if (objectMode)
	    ret = list.shift();
	  else if (!n || n >= length) {
	    // read it all, truncate the array.
	    if (stringMode)
	      ret = list.join('');
	    else
	      ret = Buffer.concat(list, length);
	    list.length = 0;
	  } else {
	    // read just some of it.
	    if (n < list[0].length) {
	      // just take a part of the first list item.
	      // slice is the same for buffers and strings.
	      var buf = list[0];
	      ret = buf.slice(0, n);
	      list[0] = buf.slice(n);
	    } else if (n === list[0].length) {
	      // first list is a perfect match
	      ret = list.shift();
	    } else {
	      // complex case.
	      // we have enough to cover it, but it spans past the first buffer.
	      if (stringMode)
	        ret = '';
	      else
	        ret = new Buffer(n);

	      var c = 0;
	      for (var i = 0, l = list.length; i < l && c < n; i++) {
	        var buf = list[0];
	        var cpy = Math.min(n - c, buf.length);

	        if (stringMode)
	          ret += buf.slice(0, cpy);
	        else
	          buf.copy(ret, c, 0, cpy);

	        if (cpy < buf.length)
	          list[0] = buf.slice(cpy);
	        else
	          list.shift();

	        c += cpy;
	      }
	    }
	  }

	  return ret;
	}

	function endReadable(stream) {
	  var state = stream._readableState;

	  // If we get here before consuming all the bytes, then that is a
	  // bug in node.  Should never happen.
	  if (state.length > 0)
	    throw new Error('endReadable called on non-empty stream');

	  if (!state.endEmitted) {
	    state.ended = true;
	    process.nextTick(function() {
	      // Check that we didn't get one last unshift.
	      if (!state.endEmitted && state.length === 0) {
	        state.endEmitted = true;
	        stream.readable = false;
	        stream.emit('end');
	      }
	    });
	  }
	}

	function forEach (xs, f) {
	  for (var i = 0, l = xs.length; i < l; i++) {
	    f(xs[i], i);
	  }
	}

	function indexOf (xs, x) {
	  for (var i = 0, l = xs.length; i < l; i++) {
	    if (xs[i] === x) return i;
	  }
	  return -1;
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = Array.isArray || function (arr) {
	  return Object.prototype.toString.call(arr) == '[object Array]';
	};


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer, global) {/*!
	 * The buffer module from node.js, for the browser.
	 *
	 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
	 * @license  MIT
	 */
	/* eslint-disable no-proto */

	'use strict'

	var base64 = __webpack_require__(20)
	var ieee754 = __webpack_require__(21)
	var isArray = __webpack_require__(22)

	exports.Buffer = Buffer
	exports.SlowBuffer = SlowBuffer
	exports.INSPECT_MAX_BYTES = 50

	/**
	 * If `Buffer.TYPED_ARRAY_SUPPORT`:
	 *   === true    Use Uint8Array implementation (fastest)
	 *   === false   Use Object implementation (most compatible, even IE6)
	 *
	 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
	 * Opera 11.6+, iOS 4.2+.
	 *
	 * Due to various browser bugs, sometimes the Object implementation will be used even
	 * when the browser supports typed arrays.
	 *
	 * Note:
	 *
	 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
	 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
	 *
	 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
	 *
	 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
	 *     incorrect length in some situations.

	 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
	 * get the Object implementation, which is slower but behaves correctly.
	 */
	Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
	  ? global.TYPED_ARRAY_SUPPORT
	  : typedArraySupport()

	/*
	 * Export kMaxLength after typed array support is determined.
	 */
	exports.kMaxLength = kMaxLength()

	function typedArraySupport () {
	  try {
	    var arr = new Uint8Array(1)
	    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
	    return arr.foo() === 42 && // typed array instances can be augmented
	        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
	        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
	  } catch (e) {
	    return false
	  }
	}

	function kMaxLength () {
	  return Buffer.TYPED_ARRAY_SUPPORT
	    ? 0x7fffffff
	    : 0x3fffffff
	}

	function createBuffer (that, length) {
	  if (kMaxLength() < length) {
	    throw new RangeError('Invalid typed array length')
	  }
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    that = new Uint8Array(length)
	    that.__proto__ = Buffer.prototype
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    if (that === null) {
	      that = new Buffer(length)
	    }
	    that.length = length
	  }

	  return that
	}

	/**
	 * The Buffer constructor returns instances of `Uint8Array` that have their
	 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
	 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
	 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
	 * returns a single octet.
	 *
	 * The `Uint8Array` prototype remains unmodified.
	 */

	function Buffer (arg, encodingOrOffset, length) {
	  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
	    return new Buffer(arg, encodingOrOffset, length)
	  }

	  // Common case.
	  if (typeof arg === 'number') {
	    if (typeof encodingOrOffset === 'string') {
	      throw new Error(
	        'If encoding is specified then the first argument must be a string'
	      )
	    }
	    return allocUnsafe(this, arg)
	  }
	  return from(this, arg, encodingOrOffset, length)
	}

	Buffer.poolSize = 8192 // not used by this implementation

	// TODO: Legacy, not needed anymore. Remove in next major version.
	Buffer._augment = function (arr) {
	  arr.__proto__ = Buffer.prototype
	  return arr
	}

	function from (that, value, encodingOrOffset, length) {
	  if (typeof value === 'number') {
	    throw new TypeError('"value" argument must not be a number')
	  }

	  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
	    return fromArrayBuffer(that, value, encodingOrOffset, length)
	  }

	  if (typeof value === 'string') {
	    return fromString(that, value, encodingOrOffset)
	  }

	  return fromObject(that, value)
	}

	/**
	 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
	 * if value is a number.
	 * Buffer.from(str[, encoding])
	 * Buffer.from(array)
	 * Buffer.from(buffer)
	 * Buffer.from(arrayBuffer[, byteOffset[, length]])
	 **/
	Buffer.from = function (value, encodingOrOffset, length) {
	  return from(null, value, encodingOrOffset, length)
	}

	if (Buffer.TYPED_ARRAY_SUPPORT) {
	  Buffer.prototype.__proto__ = Uint8Array.prototype
	  Buffer.__proto__ = Uint8Array
	  if (typeof Symbol !== 'undefined' && Symbol.species &&
	      Buffer[Symbol.species] === Buffer) {
	    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
	    Object.defineProperty(Buffer, Symbol.species, {
	      value: null,
	      configurable: true
	    })
	  }
	}

	function assertSize (size) {
	  if (typeof size !== 'number') {
	    throw new TypeError('"size" argument must be a number')
	  } else if (size < 0) {
	    throw new RangeError('"size" argument must not be negative')
	  }
	}

	function alloc (that, size, fill, encoding) {
	  assertSize(size)
	  if (size <= 0) {
	    return createBuffer(that, size)
	  }
	  if (fill !== undefined) {
	    // Only pay attention to encoding if it's a string. This
	    // prevents accidentally sending in a number that would
	    // be interpretted as a start offset.
	    return typeof encoding === 'string'
	      ? createBuffer(that, size).fill(fill, encoding)
	      : createBuffer(that, size).fill(fill)
	  }
	  return createBuffer(that, size)
	}

	/**
	 * Creates a new filled Buffer instance.
	 * alloc(size[, fill[, encoding]])
	 **/
	Buffer.alloc = function (size, fill, encoding) {
	  return alloc(null, size, fill, encoding)
	}

	function allocUnsafe (that, size) {
	  assertSize(size)
	  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) {
	    for (var i = 0; i < size; ++i) {
	      that[i] = 0
	    }
	  }
	  return that
	}

	/**
	 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
	 * */
	Buffer.allocUnsafe = function (size) {
	  return allocUnsafe(null, size)
	}
	/**
	 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
	 */
	Buffer.allocUnsafeSlow = function (size) {
	  return allocUnsafe(null, size)
	}

	function fromString (that, string, encoding) {
	  if (typeof encoding !== 'string' || encoding === '') {
	    encoding = 'utf8'
	  }

	  if (!Buffer.isEncoding(encoding)) {
	    throw new TypeError('"encoding" must be a valid string encoding')
	  }

	  var length = byteLength(string, encoding) | 0
	  that = createBuffer(that, length)

	  var actual = that.write(string, encoding)

	  if (actual !== length) {
	    // Writing a hex string, for example, that contains invalid characters will
	    // cause everything after the first invalid character to be ignored. (e.g.
	    // 'abxxcd' will be treated as 'ab')
	    that = that.slice(0, actual)
	  }

	  return that
	}

	function fromArrayLike (that, array) {
	  var length = array.length < 0 ? 0 : checked(array.length) | 0
	  that = createBuffer(that, length)
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}

	function fromArrayBuffer (that, array, byteOffset, length) {
	  array.byteLength // this throws if `array` is not a valid ArrayBuffer

	  if (byteOffset < 0 || array.byteLength < byteOffset) {
	    throw new RangeError('\'offset\' is out of bounds')
	  }

	  if (array.byteLength < byteOffset + (length || 0)) {
	    throw new RangeError('\'length\' is out of bounds')
	  }

	  if (byteOffset === undefined && length === undefined) {
	    array = new Uint8Array(array)
	  } else if (length === undefined) {
	    array = new Uint8Array(array, byteOffset)
	  } else {
	    array = new Uint8Array(array, byteOffset, length)
	  }

	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    that = array
	    that.__proto__ = Buffer.prototype
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    that = fromArrayLike(that, array)
	  }
	  return that
	}

	function fromObject (that, obj) {
	  if (Buffer.isBuffer(obj)) {
	    var len = checked(obj.length) | 0
	    that = createBuffer(that, len)

	    if (that.length === 0) {
	      return that
	    }

	    obj.copy(that, 0, 0, len)
	    return that
	  }

	  if (obj) {
	    if ((typeof ArrayBuffer !== 'undefined' &&
	        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
	      if (typeof obj.length !== 'number' || isnan(obj.length)) {
	        return createBuffer(that, 0)
	      }
	      return fromArrayLike(that, obj)
	    }

	    if (obj.type === 'Buffer' && isArray(obj.data)) {
	      return fromArrayLike(that, obj.data)
	    }
	  }

	  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
	}

	function checked (length) {
	  // Note: cannot use `length < kMaxLength()` here because that fails when
	  // length is NaN (which is otherwise coerced to zero.)
	  if (length >= kMaxLength()) {
	    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
	                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
	  }
	  return length | 0
	}

	function SlowBuffer (length) {
	  if (+length != length) { // eslint-disable-line eqeqeq
	    length = 0
	  }
	  return Buffer.alloc(+length)
	}

	Buffer.isBuffer = function isBuffer (b) {
	  return !!(b != null && b._isBuffer)
	}

	Buffer.compare = function compare (a, b) {
	  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
	    throw new TypeError('Arguments must be Buffers')
	  }

	  if (a === b) return 0

	  var x = a.length
	  var y = b.length

	  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
	    if (a[i] !== b[i]) {
	      x = a[i]
	      y = b[i]
	      break
	    }
	  }

	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	}

	Buffer.isEncoding = function isEncoding (encoding) {
	  switch (String(encoding).toLowerCase()) {
	    case 'hex':
	    case 'utf8':
	    case 'utf-8':
	    case 'ascii':
	    case 'latin1':
	    case 'binary':
	    case 'base64':
	    case 'ucs2':
	    case 'ucs-2':
	    case 'utf16le':
	    case 'utf-16le':
	      return true
	    default:
	      return false
	  }
	}

	Buffer.concat = function concat (list, length) {
	  if (!isArray(list)) {
	    throw new TypeError('"list" argument must be an Array of Buffers')
	  }

	  if (list.length === 0) {
	    return Buffer.alloc(0)
	  }

	  var i
	  if (length === undefined) {
	    length = 0
	    for (i = 0; i < list.length; ++i) {
	      length += list[i].length
	    }
	  }

	  var buffer = Buffer.allocUnsafe(length)
	  var pos = 0
	  for (i = 0; i < list.length; ++i) {
	    var buf = list[i]
	    if (!Buffer.isBuffer(buf)) {
	      throw new TypeError('"list" argument must be an Array of Buffers')
	    }
	    buf.copy(buffer, pos)
	    pos += buf.length
	  }
	  return buffer
	}

	function byteLength (string, encoding) {
	  if (Buffer.isBuffer(string)) {
	    return string.length
	  }
	  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
	      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
	    return string.byteLength
	  }
	  if (typeof string !== 'string') {
	    string = '' + string
	  }

	  var len = string.length
	  if (len === 0) return 0

	  // Use a for loop to avoid recursion
	  var loweredCase = false
	  for (;;) {
	    switch (encoding) {
	      case 'ascii':
	      case 'latin1':
	      case 'binary':
	        return len
	      case 'utf8':
	      case 'utf-8':
	      case undefined:
	        return utf8ToBytes(string).length
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return len * 2
	      case 'hex':
	        return len >>> 1
	      case 'base64':
	        return base64ToBytes(string).length
	      default:
	        if (loweredCase) return utf8ToBytes(string).length // assume utf8
	        encoding = ('' + encoding).toLowerCase()
	        loweredCase = true
	    }
	  }
	}
	Buffer.byteLength = byteLength

	function slowToString (encoding, start, end) {
	  var loweredCase = false

	  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
	  // property of a typed array.

	  // This behaves neither like String nor Uint8Array in that we set start/end
	  // to their upper/lower bounds if the value passed is out of range.
	  // undefined is handled specially as per ECMA-262 6th Edition,
	  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
	  if (start === undefined || start < 0) {
	    start = 0
	  }
	  // Return early if start > this.length. Done here to prevent potential uint32
	  // coercion fail below.
	  if (start > this.length) {
	    return ''
	  }

	  if (end === undefined || end > this.length) {
	    end = this.length
	  }

	  if (end <= 0) {
	    return ''
	  }

	  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
	  end >>>= 0
	  start >>>= 0

	  if (end <= start) {
	    return ''
	  }

	  if (!encoding) encoding = 'utf8'

	  while (true) {
	    switch (encoding) {
	      case 'hex':
	        return hexSlice(this, start, end)

	      case 'utf8':
	      case 'utf-8':
	        return utf8Slice(this, start, end)

	      case 'ascii':
	        return asciiSlice(this, start, end)

	      case 'latin1':
	      case 'binary':
	        return latin1Slice(this, start, end)

	      case 'base64':
	        return base64Slice(this, start, end)

	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return utf16leSlice(this, start, end)

	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = (encoding + '').toLowerCase()
	        loweredCase = true
	    }
	  }
	}

	// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
	// Buffer instances.
	Buffer.prototype._isBuffer = true

	function swap (b, n, m) {
	  var i = b[n]
	  b[n] = b[m]
	  b[m] = i
	}

	Buffer.prototype.swap16 = function swap16 () {
	  var len = this.length
	  if (len % 2 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 16-bits')
	  }
	  for (var i = 0; i < len; i += 2) {
	    swap(this, i, i + 1)
	  }
	  return this
	}

	Buffer.prototype.swap32 = function swap32 () {
	  var len = this.length
	  if (len % 4 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 32-bits')
	  }
	  for (var i = 0; i < len; i += 4) {
	    swap(this, i, i + 3)
	    swap(this, i + 1, i + 2)
	  }
	  return this
	}

	Buffer.prototype.swap64 = function swap64 () {
	  var len = this.length
	  if (len % 8 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 64-bits')
	  }
	  for (var i = 0; i < len; i += 8) {
	    swap(this, i, i + 7)
	    swap(this, i + 1, i + 6)
	    swap(this, i + 2, i + 5)
	    swap(this, i + 3, i + 4)
	  }
	  return this
	}

	Buffer.prototype.toString = function toString () {
	  var length = this.length | 0
	  if (length === 0) return ''
	  if (arguments.length === 0) return utf8Slice(this, 0, length)
	  return slowToString.apply(this, arguments)
	}

	Buffer.prototype.equals = function equals (b) {
	  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
	  if (this === b) return true
	  return Buffer.compare(this, b) === 0
	}

	Buffer.prototype.inspect = function inspect () {
	  var str = ''
	  var max = exports.INSPECT_MAX_BYTES
	  if (this.length > 0) {
	    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
	    if (this.length > max) str += ' ... '
	  }
	  return '<Buffer ' + str + '>'
	}

	Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
	  if (!Buffer.isBuffer(target)) {
	    throw new TypeError('Argument must be a Buffer')
	  }

	  if (start === undefined) {
	    start = 0
	  }
	  if (end === undefined) {
	    end = target ? target.length : 0
	  }
	  if (thisStart === undefined) {
	    thisStart = 0
	  }
	  if (thisEnd === undefined) {
	    thisEnd = this.length
	  }

	  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
	    throw new RangeError('out of range index')
	  }

	  if (thisStart >= thisEnd && start >= end) {
	    return 0
	  }
	  if (thisStart >= thisEnd) {
	    return -1
	  }
	  if (start >= end) {
	    return 1
	  }

	  start >>>= 0
	  end >>>= 0
	  thisStart >>>= 0
	  thisEnd >>>= 0

	  if (this === target) return 0

	  var x = thisEnd - thisStart
	  var y = end - start
	  var len = Math.min(x, y)

	  var thisCopy = this.slice(thisStart, thisEnd)
	  var targetCopy = target.slice(start, end)

	  for (var i = 0; i < len; ++i) {
	    if (thisCopy[i] !== targetCopy[i]) {
	      x = thisCopy[i]
	      y = targetCopy[i]
	      break
	    }
	  }

	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	}

	// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
	// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
	//
	// Arguments:
	// - buffer - a Buffer to search
	// - val - a string, Buffer, or number
	// - byteOffset - an index into `buffer`; will be clamped to an int32
	// - encoding - an optional encoding, relevant is val is a string
	// - dir - true for indexOf, false for lastIndexOf
	function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
	  // Empty buffer means no match
	  if (buffer.length === 0) return -1

	  // Normalize byteOffset
	  if (typeof byteOffset === 'string') {
	    encoding = byteOffset
	    byteOffset = 0
	  } else if (byteOffset > 0x7fffffff) {
	    byteOffset = 0x7fffffff
	  } else if (byteOffset < -0x80000000) {
	    byteOffset = -0x80000000
	  }
	  byteOffset = +byteOffset  // Coerce to Number.
	  if (isNaN(byteOffset)) {
	    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
	    byteOffset = dir ? 0 : (buffer.length - 1)
	  }

	  // Normalize byteOffset: negative offsets start from the end of the buffer
	  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
	  if (byteOffset >= buffer.length) {
	    if (dir) return -1
	    else byteOffset = buffer.length - 1
	  } else if (byteOffset < 0) {
	    if (dir) byteOffset = 0
	    else return -1
	  }

	  // Normalize val
	  if (typeof val === 'string') {
	    val = Buffer.from(val, encoding)
	  }

	  // Finally, search either indexOf (if dir is true) or lastIndexOf
	  if (Buffer.isBuffer(val)) {
	    // Special case: looking for empty string/buffer always fails
	    if (val.length === 0) {
	      return -1
	    }
	    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
	  } else if (typeof val === 'number') {
	    val = val & 0xFF // Search for a byte value [0-255]
	    if (Buffer.TYPED_ARRAY_SUPPORT &&
	        typeof Uint8Array.prototype.indexOf === 'function') {
	      if (dir) {
	        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
	      } else {
	        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
	      }
	    }
	    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
	  }

	  throw new TypeError('val must be string, number or Buffer')
	}

	function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
	  var indexSize = 1
	  var arrLength = arr.length
	  var valLength = val.length

	  if (encoding !== undefined) {
	    encoding = String(encoding).toLowerCase()
	    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
	        encoding === 'utf16le' || encoding === 'utf-16le') {
	      if (arr.length < 2 || val.length < 2) {
	        return -1
	      }
	      indexSize = 2
	      arrLength /= 2
	      valLength /= 2
	      byteOffset /= 2
	    }
	  }

	  function read (buf, i) {
	    if (indexSize === 1) {
	      return buf[i]
	    } else {
	      return buf.readUInt16BE(i * indexSize)
	    }
	  }

	  var i
	  if (dir) {
	    var foundIndex = -1
	    for (i = byteOffset; i < arrLength; i++) {
	      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
	        if (foundIndex === -1) foundIndex = i
	        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
	      } else {
	        if (foundIndex !== -1) i -= i - foundIndex
	        foundIndex = -1
	      }
	    }
	  } else {
	    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
	    for (i = byteOffset; i >= 0; i--) {
	      var found = true
	      for (var j = 0; j < valLength; j++) {
	        if (read(arr, i + j) !== read(val, j)) {
	          found = false
	          break
	        }
	      }
	      if (found) return i
	    }
	  }

	  return -1
	}

	Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
	  return this.indexOf(val, byteOffset, encoding) !== -1
	}

	Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
	  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
	}

	Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
	  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
	}

	function hexWrite (buf, string, offset, length) {
	  offset = Number(offset) || 0
	  var remaining = buf.length - offset
	  if (!length) {
	    length = remaining
	  } else {
	    length = Number(length)
	    if (length > remaining) {
	      length = remaining
	    }
	  }

	  // must be an even number of digits
	  var strLen = string.length
	  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

	  if (length > strLen / 2) {
	    length = strLen / 2
	  }
	  for (var i = 0; i < length; ++i) {
	    var parsed = parseInt(string.substr(i * 2, 2), 16)
	    if (isNaN(parsed)) return i
	    buf[offset + i] = parsed
	  }
	  return i
	}

	function utf8Write (buf, string, offset, length) {
	  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
	}

	function asciiWrite (buf, string, offset, length) {
	  return blitBuffer(asciiToBytes(string), buf, offset, length)
	}

	function latin1Write (buf, string, offset, length) {
	  return asciiWrite(buf, string, offset, length)
	}

	function base64Write (buf, string, offset, length) {
	  return blitBuffer(base64ToBytes(string), buf, offset, length)
	}

	function ucs2Write (buf, string, offset, length) {
	  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
	}

	Buffer.prototype.write = function write (string, offset, length, encoding) {
	  // Buffer#write(string)
	  if (offset === undefined) {
	    encoding = 'utf8'
	    length = this.length
	    offset = 0
	  // Buffer#write(string, encoding)
	  } else if (length === undefined && typeof offset === 'string') {
	    encoding = offset
	    length = this.length
	    offset = 0
	  // Buffer#write(string, offset[, length][, encoding])
	  } else if (isFinite(offset)) {
	    offset = offset | 0
	    if (isFinite(length)) {
	      length = length | 0
	      if (encoding === undefined) encoding = 'utf8'
	    } else {
	      encoding = length
	      length = undefined
	    }
	  // legacy write(string, encoding, offset, length) - remove in v0.13
	  } else {
	    throw new Error(
	      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
	    )
	  }

	  var remaining = this.length - offset
	  if (length === undefined || length > remaining) length = remaining

	  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
	    throw new RangeError('Attempt to write outside buffer bounds')
	  }

	  if (!encoding) encoding = 'utf8'

	  var loweredCase = false
	  for (;;) {
	    switch (encoding) {
	      case 'hex':
	        return hexWrite(this, string, offset, length)

	      case 'utf8':
	      case 'utf-8':
	        return utf8Write(this, string, offset, length)

	      case 'ascii':
	        return asciiWrite(this, string, offset, length)

	      case 'latin1':
	      case 'binary':
	        return latin1Write(this, string, offset, length)

	      case 'base64':
	        // Warning: maxLength not taken into account in base64Write
	        return base64Write(this, string, offset, length)

	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return ucs2Write(this, string, offset, length)

	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = ('' + encoding).toLowerCase()
	        loweredCase = true
	    }
	  }
	}

	Buffer.prototype.toJSON = function toJSON () {
	  return {
	    type: 'Buffer',
	    data: Array.prototype.slice.call(this._arr || this, 0)
	  }
	}

	function base64Slice (buf, start, end) {
	  if (start === 0 && end === buf.length) {
	    return base64.fromByteArray(buf)
	  } else {
	    return base64.fromByteArray(buf.slice(start, end))
	  }
	}

	function utf8Slice (buf, start, end) {
	  end = Math.min(buf.length, end)
	  var res = []

	  var i = start
	  while (i < end) {
	    var firstByte = buf[i]
	    var codePoint = null
	    var bytesPerSequence = (firstByte > 0xEF) ? 4
	      : (firstByte > 0xDF) ? 3
	      : (firstByte > 0xBF) ? 2
	      : 1

	    if (i + bytesPerSequence <= end) {
	      var secondByte, thirdByte, fourthByte, tempCodePoint

	      switch (bytesPerSequence) {
	        case 1:
	          if (firstByte < 0x80) {
	            codePoint = firstByte
	          }
	          break
	        case 2:
	          secondByte = buf[i + 1]
	          if ((secondByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
	            if (tempCodePoint > 0x7F) {
	              codePoint = tempCodePoint
	            }
	          }
	          break
	        case 3:
	          secondByte = buf[i + 1]
	          thirdByte = buf[i + 2]
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
	            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
	              codePoint = tempCodePoint
	            }
	          }
	          break
	        case 4:
	          secondByte = buf[i + 1]
	          thirdByte = buf[i + 2]
	          fourthByte = buf[i + 3]
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
	            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
	              codePoint = tempCodePoint
	            }
	          }
	      }
	    }

	    if (codePoint === null) {
	      // we did not generate a valid codePoint so insert a
	      // replacement char (U+FFFD) and advance only 1 byte
	      codePoint = 0xFFFD
	      bytesPerSequence = 1
	    } else if (codePoint > 0xFFFF) {
	      // encode to utf16 (surrogate pair dance)
	      codePoint -= 0x10000
	      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
	      codePoint = 0xDC00 | codePoint & 0x3FF
	    }

	    res.push(codePoint)
	    i += bytesPerSequence
	  }

	  return decodeCodePointsArray(res)
	}

	// Based on http://stackoverflow.com/a/22747272/680742, the browser with
	// the lowest limit is Chrome, with 0x10000 args.
	// We go 1 magnitude less, for safety
	var MAX_ARGUMENTS_LENGTH = 0x1000

	function decodeCodePointsArray (codePoints) {
	  var len = codePoints.length
	  if (len <= MAX_ARGUMENTS_LENGTH) {
	    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
	  }

	  // Decode in chunks to avoid "call stack size exceeded".
	  var res = ''
	  var i = 0
	  while (i < len) {
	    res += String.fromCharCode.apply(
	      String,
	      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
	    )
	  }
	  return res
	}

	function asciiSlice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)

	  for (var i = start; i < end; ++i) {
	    ret += String.fromCharCode(buf[i] & 0x7F)
	  }
	  return ret
	}

	function latin1Slice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)

	  for (var i = start; i < end; ++i) {
	    ret += String.fromCharCode(buf[i])
	  }
	  return ret
	}

	function hexSlice (buf, start, end) {
	  var len = buf.length

	  if (!start || start < 0) start = 0
	  if (!end || end < 0 || end > len) end = len

	  var out = ''
	  for (var i = start; i < end; ++i) {
	    out += toHex(buf[i])
	  }
	  return out
	}

	function utf16leSlice (buf, start, end) {
	  var bytes = buf.slice(start, end)
	  var res = ''
	  for (var i = 0; i < bytes.length; i += 2) {
	    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
	  }
	  return res
	}

	Buffer.prototype.slice = function slice (start, end) {
	  var len = this.length
	  start = ~~start
	  end = end === undefined ? len : ~~end

	  if (start < 0) {
	    start += len
	    if (start < 0) start = 0
	  } else if (start > len) {
	    start = len
	  }

	  if (end < 0) {
	    end += len
	    if (end < 0) end = 0
	  } else if (end > len) {
	    end = len
	  }

	  if (end < start) end = start

	  var newBuf
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    newBuf = this.subarray(start, end)
	    newBuf.__proto__ = Buffer.prototype
	  } else {
	    var sliceLen = end - start
	    newBuf = new Buffer(sliceLen, undefined)
	    for (var i = 0; i < sliceLen; ++i) {
	      newBuf[i] = this[i + start]
	    }
	  }

	  return newBuf
	}

	/*
	 * Need to make sure that buffer isn't trying to write out of bounds.
	 */
	function checkOffset (offset, ext, length) {
	  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
	  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
	}

	Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }

	  return val
	}

	Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    checkOffset(offset, byteLength, this.length)
	  }

	  var val = this[offset + --byteLength]
	  var mul = 1
	  while (byteLength > 0 && (mul *= 0x100)) {
	    val += this[offset + --byteLength] * mul
	  }

	  return val
	}

	Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  return this[offset]
	}

	Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return this[offset] | (this[offset + 1] << 8)
	}

	Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return (this[offset] << 8) | this[offset + 1]
	}

	Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return ((this[offset]) |
	      (this[offset + 1] << 8) |
	      (this[offset + 2] << 16)) +
	      (this[offset + 3] * 0x1000000)
	}

	Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset] * 0x1000000) +
	    ((this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    this[offset + 3])
	}

	Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }
	  mul *= 0x80

	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

	  return val
	}

	Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var i = byteLength
	  var mul = 1
	  var val = this[offset + --i]
	  while (i > 0 && (mul *= 0x100)) {
	    val += this[offset + --i] * mul
	  }
	  mul *= 0x80

	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

	  return val
	}

	Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  if (!(this[offset] & 0x80)) return (this[offset])
	  return ((0xff - this[offset] + 1) * -1)
	}

	Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset] | (this[offset + 1] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}

	Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset + 1] | (this[offset] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}

	Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset]) |
	    (this[offset + 1] << 8) |
	    (this[offset + 2] << 16) |
	    (this[offset + 3] << 24)
	}

	Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset] << 24) |
	    (this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    (this[offset + 3])
	}

	Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, true, 23, 4)
	}

	Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, false, 23, 4)
	}

	Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, true, 52, 8)
	}

	Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, false, 52, 8)
	}

	function checkInt (buf, value, offset, ext, max, min) {
	  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
	  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
	  if (offset + ext > buf.length) throw new RangeError('Index out of range')
	}

	Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    var maxBytes = Math.pow(2, 8 * byteLength) - 1
	    checkInt(this, value, offset, byteLength, maxBytes, 0)
	  }

	  var mul = 1
	  var i = 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    var maxBytes = Math.pow(2, 8 * byteLength) - 1
	    checkInt(this, value, offset, byteLength, maxBytes, 0)
	  }

	  var i = byteLength - 1
	  var mul = 1
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  this[offset] = (value & 0xff)
	  return offset + 1
	}

	function objectWriteUInt16 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
	    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
	      (littleEndian ? i : 1 - i) * 8
	  }
	}

	Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = (value & 0xff)
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}

	function objectWriteUInt32 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffffffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
	    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
	  }
	}

	Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset + 3] = (value >>> 24)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 1] = (value >>> 8)
	    this[offset] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1)

	    checkInt(this, value, offset, byteLength, limit - 1, -limit)
	  }

	  var i = 0
	  var mul = 1
	  var sub = 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
	      sub = 1
	    }
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1)

	    checkInt(this, value, offset, byteLength, limit - 1, -limit)
	  }

	  var i = byteLength - 1
	  var mul = 1
	  var sub = 0
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
	      sub = 1
	    }
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  if (value < 0) value = 0xff + value + 1
	  this[offset] = (value & 0xff)
	  return offset + 1
	}

	Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = (value & 0xff)
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 3] = (value >>> 24)
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (value < 0) value = 0xffffffff + value + 1
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}

	function checkIEEE754 (buf, value, offset, ext, max, min) {
	  if (offset + ext > buf.length) throw new RangeError('Index out of range')
	  if (offset < 0) throw new RangeError('Index out of range')
	}

	function writeFloat (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 23, 4)
	  return offset + 4
	}

	Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, true, noAssert)
	}

	Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, false, noAssert)
	}

	function writeDouble (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 52, 8)
	  return offset + 8
	}

	Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, true, noAssert)
	}

	Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, false, noAssert)
	}

	// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
	Buffer.prototype.copy = function copy (target, targetStart, start, end) {
	  if (!start) start = 0
	  if (!end && end !== 0) end = this.length
	  if (targetStart >= target.length) targetStart = target.length
	  if (!targetStart) targetStart = 0
	  if (end > 0 && end < start) end = start

	  // Copy 0 bytes; we're done
	  if (end === start) return 0
	  if (target.length === 0 || this.length === 0) return 0

	  // Fatal error conditions
	  if (targetStart < 0) {
	    throw new RangeError('targetStart out of bounds')
	  }
	  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
	  if (end < 0) throw new RangeError('sourceEnd out of bounds')

	  // Are we oob?
	  if (end > this.length) end = this.length
	  if (target.length - targetStart < end - start) {
	    end = target.length - targetStart + start
	  }

	  var len = end - start
	  var i

	  if (this === target && start < targetStart && targetStart < end) {
	    // descending copy from end
	    for (i = len - 1; i >= 0; --i) {
	      target[i + targetStart] = this[i + start]
	    }
	  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
	    // ascending copy from start
	    for (i = 0; i < len; ++i) {
	      target[i + targetStart] = this[i + start]
	    }
	  } else {
	    Uint8Array.prototype.set.call(
	      target,
	      this.subarray(start, start + len),
	      targetStart
	    )
	  }

	  return len
	}

	// Usage:
	//    buffer.fill(number[, offset[, end]])
	//    buffer.fill(buffer[, offset[, end]])
	//    buffer.fill(string[, offset[, end]][, encoding])
	Buffer.prototype.fill = function fill (val, start, end, encoding) {
	  // Handle string cases:
	  if (typeof val === 'string') {
	    if (typeof start === 'string') {
	      encoding = start
	      start = 0
	      end = this.length
	    } else if (typeof end === 'string') {
	      encoding = end
	      end = this.length
	    }
	    if (val.length === 1) {
	      var code = val.charCodeAt(0)
	      if (code < 256) {
	        val = code
	      }
	    }
	    if (encoding !== undefined && typeof encoding !== 'string') {
	      throw new TypeError('encoding must be a string')
	    }
	    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
	      throw new TypeError('Unknown encoding: ' + encoding)
	    }
	  } else if (typeof val === 'number') {
	    val = val & 255
	  }

	  // Invalid ranges are not set to a default, so can range check early.
	  if (start < 0 || this.length < start || this.length < end) {
	    throw new RangeError('Out of range index')
	  }

	  if (end <= start) {
	    return this
	  }

	  start = start >>> 0
	  end = end === undefined ? this.length : end >>> 0

	  if (!val) val = 0

	  var i
	  if (typeof val === 'number') {
	    for (i = start; i < end; ++i) {
	      this[i] = val
	    }
	  } else {
	    var bytes = Buffer.isBuffer(val)
	      ? val
	      : utf8ToBytes(new Buffer(val, encoding).toString())
	    var len = bytes.length
	    for (i = 0; i < end - start; ++i) {
	      this[i + start] = bytes[i % len]
	    }
	  }

	  return this
	}

	// HELPER FUNCTIONS
	// ================

	var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

	function base64clean (str) {
	  // Node strips out invalid characters like \n and \t from the string, base64-js does not
	  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
	  // Node converts strings with length < 2 to ''
	  if (str.length < 2) return ''
	  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
	  while (str.length % 4 !== 0) {
	    str = str + '='
	  }
	  return str
	}

	function stringtrim (str) {
	  if (str.trim) return str.trim()
	  return str.replace(/^\s+|\s+$/g, '')
	}

	function toHex (n) {
	  if (n < 16) return '0' + n.toString(16)
	  return n.toString(16)
	}

	function utf8ToBytes (string, units) {
	  units = units || Infinity
	  var codePoint
	  var length = string.length
	  var leadSurrogate = null
	  var bytes = []

	  for (var i = 0; i < length; ++i) {
	    codePoint = string.charCodeAt(i)

	    // is surrogate component
	    if (codePoint > 0xD7FF && codePoint < 0xE000) {
	      // last char was a lead
	      if (!leadSurrogate) {
	        // no lead yet
	        if (codePoint > 0xDBFF) {
	          // unexpected trail
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        } else if (i + 1 === length) {
	          // unpaired lead
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        }

	        // valid lead
	        leadSurrogate = codePoint

	        continue
	      }

	      // 2 leads in a row
	      if (codePoint < 0xDC00) {
	        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	        leadSurrogate = codePoint
	        continue
	      }

	      // valid surrogate pair
	      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
	    } else if (leadSurrogate) {
	      // valid bmp char, but last char was a lead
	      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	    }

	    leadSurrogate = null

	    // encode utf8
	    if (codePoint < 0x80) {
	      if ((units -= 1) < 0) break
	      bytes.push(codePoint)
	    } else if (codePoint < 0x800) {
	      if ((units -= 2) < 0) break
	      bytes.push(
	        codePoint >> 0x6 | 0xC0,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x10000) {
	      if ((units -= 3) < 0) break
	      bytes.push(
	        codePoint >> 0xC | 0xE0,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x110000) {
	      if ((units -= 4) < 0) break
	      bytes.push(
	        codePoint >> 0x12 | 0xF0,
	        codePoint >> 0xC & 0x3F | 0x80,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else {
	      throw new Error('Invalid code point')
	    }
	  }

	  return bytes
	}

	function asciiToBytes (str) {
	  var byteArray = []
	  for (var i = 0; i < str.length; ++i) {
	    // Node's code seems to be doing this and not & 0x7F..
	    byteArray.push(str.charCodeAt(i) & 0xFF)
	  }
	  return byteArray
	}

	function utf16leToBytes (str, units) {
	  var c, hi, lo
	  var byteArray = []
	  for (var i = 0; i < str.length; ++i) {
	    if ((units -= 2) < 0) break

	    c = str.charCodeAt(i)
	    hi = c >> 8
	    lo = c % 256
	    byteArray.push(lo)
	    byteArray.push(hi)
	  }

	  return byteArray
	}

	function base64ToBytes (str) {
	  return base64.toByteArray(base64clean(str))
	}

	function blitBuffer (src, dst, offset, length) {
	  for (var i = 0; i < length; ++i) {
	    if ((i + offset >= dst.length) || (i >= src.length)) break
	    dst[i + offset] = src[i]
	  }
	  return i
	}

	function isnan (val) {
	  return val !== val // eslint-disable-line no-self-compare
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(19).Buffer, (function() { return this; }())))

/***/ },
/* 20 */
/***/ function(module, exports) {

	'use strict'

	exports.byteLength = byteLength
	exports.toByteArray = toByteArray
	exports.fromByteArray = fromByteArray

	var lookup = []
	var revLookup = []
	var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

	var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
	for (var i = 0, len = code.length; i < len; ++i) {
	  lookup[i] = code[i]
	  revLookup[code.charCodeAt(i)] = i
	}

	revLookup['-'.charCodeAt(0)] = 62
	revLookup['_'.charCodeAt(0)] = 63

	function placeHoldersCount (b64) {
	  var len = b64.length
	  if (len % 4 > 0) {
	    throw new Error('Invalid string. Length must be a multiple of 4')
	  }

	  // the number of equal signs (place holders)
	  // if there are two placeholders, than the two characters before it
	  // represent one byte
	  // if there is only one, then the three characters before it represent 2 bytes
	  // this is just a cheap hack to not do indexOf twice
	  return b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0
	}

	function byteLength (b64) {
	  // base64 is 4/3 + up to two characters of the original data
	  return b64.length * 3 / 4 - placeHoldersCount(b64)
	}

	function toByteArray (b64) {
	  var i, j, l, tmp, placeHolders, arr
	  var len = b64.length
	  placeHolders = placeHoldersCount(b64)

	  arr = new Arr(len * 3 / 4 - placeHolders)

	  // if there are placeholders, only get up to the last complete 4 chars
	  l = placeHolders > 0 ? len - 4 : len

	  var L = 0

	  for (i = 0, j = 0; i < l; i += 4, j += 3) {
	    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)]
	    arr[L++] = (tmp >> 16) & 0xFF
	    arr[L++] = (tmp >> 8) & 0xFF
	    arr[L++] = tmp & 0xFF
	  }

	  if (placeHolders === 2) {
	    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4)
	    arr[L++] = tmp & 0xFF
	  } else if (placeHolders === 1) {
	    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2)
	    arr[L++] = (tmp >> 8) & 0xFF
	    arr[L++] = tmp & 0xFF
	  }

	  return arr
	}

	function tripletToBase64 (num) {
	  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
	}

	function encodeChunk (uint8, start, end) {
	  var tmp
	  var output = []
	  for (var i = start; i < end; i += 3) {
	    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
	    output.push(tripletToBase64(tmp))
	  }
	  return output.join('')
	}

	function fromByteArray (uint8) {
	  var tmp
	  var len = uint8.length
	  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
	  var output = ''
	  var parts = []
	  var maxChunkLength = 16383 // must be multiple of 3

	  // go through the array every three bytes, we'll deal with trailing stuff later
	  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
	    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
	  }

	  // pad the end with zeros, but make sure to not forget the extra bytes
	  if (extraBytes === 1) {
	    tmp = uint8[len - 1]
	    output += lookup[tmp >> 2]
	    output += lookup[(tmp << 4) & 0x3F]
	    output += '=='
	  } else if (extraBytes === 2) {
	    tmp = (uint8[len - 2] << 8) + (uint8[len - 1])
	    output += lookup[tmp >> 10]
	    output += lookup[(tmp >> 4) & 0x3F]
	    output += lookup[(tmp << 2) & 0x3F]
	    output += '='
	  }

	  parts.push(output)

	  return parts.join('')
	}


/***/ },
/* 21 */
/***/ function(module, exports) {

	exports.read = function (buffer, offset, isLE, mLen, nBytes) {
	  var e, m
	  var eLen = nBytes * 8 - mLen - 1
	  var eMax = (1 << eLen) - 1
	  var eBias = eMax >> 1
	  var nBits = -7
	  var i = isLE ? (nBytes - 1) : 0
	  var d = isLE ? -1 : 1
	  var s = buffer[offset + i]

	  i += d

	  e = s & ((1 << (-nBits)) - 1)
	  s >>= (-nBits)
	  nBits += eLen
	  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

	  m = e & ((1 << (-nBits)) - 1)
	  e >>= (-nBits)
	  nBits += mLen
	  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

	  if (e === 0) {
	    e = 1 - eBias
	  } else if (e === eMax) {
	    return m ? NaN : ((s ? -1 : 1) * Infinity)
	  } else {
	    m = m + Math.pow(2, mLen)
	    e = e - eBias
	  }
	  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
	}

	exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
	  var e, m, c
	  var eLen = nBytes * 8 - mLen - 1
	  var eMax = (1 << eLen) - 1
	  var eBias = eMax >> 1
	  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
	  var i = isLE ? 0 : (nBytes - 1)
	  var d = isLE ? 1 : -1
	  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

	  value = Math.abs(value)

	  if (isNaN(value) || value === Infinity) {
	    m = isNaN(value) ? 1 : 0
	    e = eMax
	  } else {
	    e = Math.floor(Math.log(value) / Math.LN2)
	    if (value * (c = Math.pow(2, -e)) < 1) {
	      e--
	      c *= 2
	    }
	    if (e + eBias >= 1) {
	      value += rt / c
	    } else {
	      value += rt * Math.pow(2, 1 - eBias)
	    }
	    if (value * c >= 2) {
	      e++
	      c /= 2
	    }

	    if (e + eBias >= eMax) {
	      m = 0
	      e = eMax
	    } else if (e + eBias >= 1) {
	      m = (value * c - 1) * Math.pow(2, mLen)
	      e = e + eBias
	    } else {
	      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
	      e = 0
	    }
	  }

	  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

	  e = (e << mLen) | m
	  eLen += mLen
	  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

	  buffer[offset + i - d] |= s * 128
	}


/***/ },
/* 22 */
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = Array.isArray || function (arr) {
	  return toString.call(arr) == '[object Array]';
	};


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	// NOTE: These type checking functions intentionally don't use `instanceof`
	// because it is fragile and can be easily faked with `Object.create()`.

	function isArray(arg) {
	  if (Array.isArray) {
	    return Array.isArray(arg);
	  }
	  return objectToString(arg) === '[object Array]';
	}
	exports.isArray = isArray;

	function isBoolean(arg) {
	  return typeof arg === 'boolean';
	}
	exports.isBoolean = isBoolean;

	function isNull(arg) {
	  return arg === null;
	}
	exports.isNull = isNull;

	function isNullOrUndefined(arg) {
	  return arg == null;
	}
	exports.isNullOrUndefined = isNullOrUndefined;

	function isNumber(arg) {
	  return typeof arg === 'number';
	}
	exports.isNumber = isNumber;

	function isString(arg) {
	  return typeof arg === 'string';
	}
	exports.isString = isString;

	function isSymbol(arg) {
	  return typeof arg === 'symbol';
	}
	exports.isSymbol = isSymbol;

	function isUndefined(arg) {
	  return arg === void 0;
	}
	exports.isUndefined = isUndefined;

	function isRegExp(re) {
	  return objectToString(re) === '[object RegExp]';
	}
	exports.isRegExp = isRegExp;

	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}
	exports.isObject = isObject;

	function isDate(d) {
	  return objectToString(d) === '[object Date]';
	}
	exports.isDate = isDate;

	function isError(e) {
	  return (objectToString(e) === '[object Error]' || e instanceof Error);
	}
	exports.isError = isError;

	function isFunction(arg) {
	  return typeof arg === 'function';
	}
	exports.isFunction = isFunction;

	function isPrimitive(arg) {
	  return arg === null ||
	         typeof arg === 'boolean' ||
	         typeof arg === 'number' ||
	         typeof arg === 'string' ||
	         typeof arg === 'symbol' ||  // ES6 symbol
	         typeof arg === 'undefined';
	}
	exports.isPrimitive = isPrimitive;

	exports.isBuffer = Buffer.isBuffer;

	function objectToString(o) {
	  return Object.prototype.toString.call(o);
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(19).Buffer))

/***/ },
/* 24 */
/***/ function(module, exports) {

	/* (ignored) */

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	// a duplex stream is just a stream that is both readable and writable.
	// Since JS doesn't have multiple prototypal inheritance, this class
	// prototypally inherits from Readable, and then parasitically from
	// Writable.

	module.exports = Duplex;

	/*<replacement>*/
	var objectKeys = Object.keys || function (obj) {
	  var keys = [];
	  for (var key in obj) keys.push(key);
	  return keys;
	}
	/*</replacement>*/


	/*<replacement>*/
	var util = __webpack_require__(23);
	util.inherits = __webpack_require__(15);
	/*</replacement>*/

	var Readable = __webpack_require__(17);
	var Writable = __webpack_require__(26);

	util.inherits(Duplex, Readable);

	forEach(objectKeys(Writable.prototype), function(method) {
	  if (!Duplex.prototype[method])
	    Duplex.prototype[method] = Writable.prototype[method];
	});

	function Duplex(options) {
	  if (!(this instanceof Duplex))
	    return new Duplex(options);

	  Readable.call(this, options);
	  Writable.call(this, options);

	  if (options && options.readable === false)
	    this.readable = false;

	  if (options && options.writable === false)
	    this.writable = false;

	  this.allowHalfOpen = true;
	  if (options && options.allowHalfOpen === false)
	    this.allowHalfOpen = false;

	  this.once('end', onend);
	}

	// the no-half-open enforcer
	function onend() {
	  // if we allow half-open state, or if the writable side ended,
	  // then we're ok.
	  if (this.allowHalfOpen || this._writableState.ended)
	    return;

	  // no more data can be written.
	  // But allow more writes to happen in this tick.
	  process.nextTick(this.end.bind(this));
	}

	function forEach (xs, f) {
	  for (var i = 0, l = xs.length; i < l; i++) {
	    f(xs[i], i);
	  }
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	// A bit simpler than readable streams.
	// Implement an async ._write(chunk, cb), and it'll handle all
	// the drain event emission and buffering.

	module.exports = Writable;

	/*<replacement>*/
	var Buffer = __webpack_require__(19).Buffer;
	/*</replacement>*/

	Writable.WritableState = WritableState;


	/*<replacement>*/
	var util = __webpack_require__(23);
	util.inherits = __webpack_require__(15);
	/*</replacement>*/

	var Stream = __webpack_require__(14);

	util.inherits(Writable, Stream);

	function WriteReq(chunk, encoding, cb) {
	  this.chunk = chunk;
	  this.encoding = encoding;
	  this.callback = cb;
	}

	function WritableState(options, stream) {
	  var Duplex = __webpack_require__(25);

	  options = options || {};

	  // the point at which write() starts returning false
	  // Note: 0 is a valid value, means that we always return false if
	  // the entire buffer is not flushed immediately on write()
	  var hwm = options.highWaterMark;
	  var defaultHwm = options.objectMode ? 16 : 16 * 1024;
	  this.highWaterMark = (hwm || hwm === 0) ? hwm : defaultHwm;

	  // object stream flag to indicate whether or not this stream
	  // contains buffers or objects.
	  this.objectMode = !!options.objectMode;

	  if (stream instanceof Duplex)
	    this.objectMode = this.objectMode || !!options.writableObjectMode;

	  // cast to ints.
	  this.highWaterMark = ~~this.highWaterMark;

	  this.needDrain = false;
	  // at the start of calling end()
	  this.ending = false;
	  // when end() has been called, and returned
	  this.ended = false;
	  // when 'finish' is emitted
	  this.finished = false;

	  // should we decode strings into buffers before passing to _write?
	  // this is here so that some node-core streams can optimize string
	  // handling at a lower level.
	  var noDecode = options.decodeStrings === false;
	  this.decodeStrings = !noDecode;

	  // Crypto is kind of old and crusty.  Historically, its default string
	  // encoding is 'binary' so we have to make this configurable.
	  // Everything else in the universe uses 'utf8', though.
	  this.defaultEncoding = options.defaultEncoding || 'utf8';

	  // not an actual buffer we keep track of, but a measurement
	  // of how much we're waiting to get pushed to some underlying
	  // socket or file.
	  this.length = 0;

	  // a flag to see when we're in the middle of a write.
	  this.writing = false;

	  // when true all writes will be buffered until .uncork() call
	  this.corked = 0;

	  // a flag to be able to tell if the onwrite cb is called immediately,
	  // or on a later tick.  We set this to true at first, because any
	  // actions that shouldn't happen until "later" should generally also
	  // not happen before the first write call.
	  this.sync = true;

	  // a flag to know if we're processing previously buffered items, which
	  // may call the _write() callback in the same tick, so that we don't
	  // end up in an overlapped onwrite situation.
	  this.bufferProcessing = false;

	  // the callback that's passed to _write(chunk,cb)
	  this.onwrite = function(er) {
	    onwrite(stream, er);
	  };

	  // the callback that the user supplies to write(chunk,encoding,cb)
	  this.writecb = null;

	  // the amount that is being written when _write is called.
	  this.writelen = 0;

	  this.buffer = [];

	  // number of pending user-supplied write callbacks
	  // this must be 0 before 'finish' can be emitted
	  this.pendingcb = 0;

	  // emit prefinish if the only thing we're waiting for is _write cbs
	  // This is relevant for synchronous Transform streams
	  this.prefinished = false;

	  // True if the error was already emitted and should not be thrown again
	  this.errorEmitted = false;
	}

	function Writable(options) {
	  var Duplex = __webpack_require__(25);

	  // Writable ctor is applied to Duplexes, though they're not
	  // instanceof Writable, they're instanceof Readable.
	  if (!(this instanceof Writable) && !(this instanceof Duplex))
	    return new Writable(options);

	  this._writableState = new WritableState(options, this);

	  // legacy.
	  this.writable = true;

	  Stream.call(this);
	}

	// Otherwise people can pipe Writable streams, which is just wrong.
	Writable.prototype.pipe = function() {
	  this.emit('error', new Error('Cannot pipe. Not readable.'));
	};


	function writeAfterEnd(stream, state, cb) {
	  var er = new Error('write after end');
	  // TODO: defer error events consistently everywhere, not just the cb
	  stream.emit('error', er);
	  process.nextTick(function() {
	    cb(er);
	  });
	}

	// If we get something that is not a buffer, string, null, or undefined,
	// and we're not in objectMode, then that's an error.
	// Otherwise stream chunks are all considered to be of length=1, and the
	// watermarks determine how many objects to keep in the buffer, rather than
	// how many bytes or characters.
	function validChunk(stream, state, chunk, cb) {
	  var valid = true;
	  if (!util.isBuffer(chunk) &&
	      !util.isString(chunk) &&
	      !util.isNullOrUndefined(chunk) &&
	      !state.objectMode) {
	    var er = new TypeError('Invalid non-string/buffer chunk');
	    stream.emit('error', er);
	    process.nextTick(function() {
	      cb(er);
	    });
	    valid = false;
	  }
	  return valid;
	}

	Writable.prototype.write = function(chunk, encoding, cb) {
	  var state = this._writableState;
	  var ret = false;

	  if (util.isFunction(encoding)) {
	    cb = encoding;
	    encoding = null;
	  }

	  if (util.isBuffer(chunk))
	    encoding = 'buffer';
	  else if (!encoding)
	    encoding = state.defaultEncoding;

	  if (!util.isFunction(cb))
	    cb = function() {};

	  if (state.ended)
	    writeAfterEnd(this, state, cb);
	  else if (validChunk(this, state, chunk, cb)) {
	    state.pendingcb++;
	    ret = writeOrBuffer(this, state, chunk, encoding, cb);
	  }

	  return ret;
	};

	Writable.prototype.cork = function() {
	  var state = this._writableState;

	  state.corked++;
	};

	Writable.prototype.uncork = function() {
	  var state = this._writableState;

	  if (state.corked) {
	    state.corked--;

	    if (!state.writing &&
	        !state.corked &&
	        !state.finished &&
	        !state.bufferProcessing &&
	        state.buffer.length)
	      clearBuffer(this, state);
	  }
	};

	function decodeChunk(state, chunk, encoding) {
	  if (!state.objectMode &&
	      state.decodeStrings !== false &&
	      util.isString(chunk)) {
	    chunk = new Buffer(chunk, encoding);
	  }
	  return chunk;
	}

	// if we're already writing something, then just put this
	// in the queue, and wait our turn.  Otherwise, call _write
	// If we return false, then we need a drain event, so set that flag.
	function writeOrBuffer(stream, state, chunk, encoding, cb) {
	  chunk = decodeChunk(state, chunk, encoding);
	  if (util.isBuffer(chunk))
	    encoding = 'buffer';
	  var len = state.objectMode ? 1 : chunk.length;

	  state.length += len;

	  var ret = state.length < state.highWaterMark;
	  // we must ensure that previous needDrain will not be reset to false.
	  if (!ret)
	    state.needDrain = true;

	  if (state.writing || state.corked)
	    state.buffer.push(new WriteReq(chunk, encoding, cb));
	  else
	    doWrite(stream, state, false, len, chunk, encoding, cb);

	  return ret;
	}

	function doWrite(stream, state, writev, len, chunk, encoding, cb) {
	  state.writelen = len;
	  state.writecb = cb;
	  state.writing = true;
	  state.sync = true;
	  if (writev)
	    stream._writev(chunk, state.onwrite);
	  else
	    stream._write(chunk, encoding, state.onwrite);
	  state.sync = false;
	}

	function onwriteError(stream, state, sync, er, cb) {
	  if (sync)
	    process.nextTick(function() {
	      state.pendingcb--;
	      cb(er);
	    });
	  else {
	    state.pendingcb--;
	    cb(er);
	  }

	  stream._writableState.errorEmitted = true;
	  stream.emit('error', er);
	}

	function onwriteStateUpdate(state) {
	  state.writing = false;
	  state.writecb = null;
	  state.length -= state.writelen;
	  state.writelen = 0;
	}

	function onwrite(stream, er) {
	  var state = stream._writableState;
	  var sync = state.sync;
	  var cb = state.writecb;

	  onwriteStateUpdate(state);

	  if (er)
	    onwriteError(stream, state, sync, er, cb);
	  else {
	    // Check if we're actually ready to finish, but don't emit yet
	    var finished = needFinish(stream, state);

	    if (!finished &&
	        !state.corked &&
	        !state.bufferProcessing &&
	        state.buffer.length) {
	      clearBuffer(stream, state);
	    }

	    if (sync) {
	      process.nextTick(function() {
	        afterWrite(stream, state, finished, cb);
	      });
	    } else {
	      afterWrite(stream, state, finished, cb);
	    }
	  }
	}

	function afterWrite(stream, state, finished, cb) {
	  if (!finished)
	    onwriteDrain(stream, state);
	  state.pendingcb--;
	  cb();
	  finishMaybe(stream, state);
	}

	// Must force callback to be called on nextTick, so that we don't
	// emit 'drain' before the write() consumer gets the 'false' return
	// value, and has a chance to attach a 'drain' listener.
	function onwriteDrain(stream, state) {
	  if (state.length === 0 && state.needDrain) {
	    state.needDrain = false;
	    stream.emit('drain');
	  }
	}


	// if there's something in the buffer waiting, then process it
	function clearBuffer(stream, state) {
	  state.bufferProcessing = true;

	  if (stream._writev && state.buffer.length > 1) {
	    // Fast case, write everything using _writev()
	    var cbs = [];
	    for (var c = 0; c < state.buffer.length; c++)
	      cbs.push(state.buffer[c].callback);

	    // count the one we are adding, as well.
	    // TODO(isaacs) clean this up
	    state.pendingcb++;
	    doWrite(stream, state, true, state.length, state.buffer, '', function(err) {
	      for (var i = 0; i < cbs.length; i++) {
	        state.pendingcb--;
	        cbs[i](err);
	      }
	    });

	    // Clear buffer
	    state.buffer = [];
	  } else {
	    // Slow case, write chunks one-by-one
	    for (var c = 0; c < state.buffer.length; c++) {
	      var entry = state.buffer[c];
	      var chunk = entry.chunk;
	      var encoding = entry.encoding;
	      var cb = entry.callback;
	      var len = state.objectMode ? 1 : chunk.length;

	      doWrite(stream, state, false, len, chunk, encoding, cb);

	      // if we didn't call the onwrite immediately, then
	      // it means that we need to wait until it does.
	      // also, that means that the chunk and cb are currently
	      // being processed, so move the buffer counter past them.
	      if (state.writing) {
	        c++;
	        break;
	      }
	    }

	    if (c < state.buffer.length)
	      state.buffer = state.buffer.slice(c);
	    else
	      state.buffer.length = 0;
	  }

	  state.bufferProcessing = false;
	}

	Writable.prototype._write = function(chunk, encoding, cb) {
	  cb(new Error('not implemented'));

	};

	Writable.prototype._writev = null;

	Writable.prototype.end = function(chunk, encoding, cb) {
	  var state = this._writableState;

	  if (util.isFunction(chunk)) {
	    cb = chunk;
	    chunk = null;
	    encoding = null;
	  } else if (util.isFunction(encoding)) {
	    cb = encoding;
	    encoding = null;
	  }

	  if (!util.isNullOrUndefined(chunk))
	    this.write(chunk, encoding);

	  // .end() fully uncorks
	  if (state.corked) {
	    state.corked = 1;
	    this.uncork();
	  }

	  // ignore unnecessary end() calls.
	  if (!state.ending && !state.finished)
	    endWritable(this, state, cb);
	};


	function needFinish(stream, state) {
	  return (state.ending &&
	          state.length === 0 &&
	          !state.finished &&
	          !state.writing);
	}

	function prefinish(stream, state) {
	  if (!state.prefinished) {
	    state.prefinished = true;
	    stream.emit('prefinish');
	  }
	}

	function finishMaybe(stream, state) {
	  var need = needFinish(stream, state);
	  if (need) {
	    if (state.pendingcb === 0) {
	      prefinish(stream, state);
	      state.finished = true;
	      stream.emit('finish');
	    } else
	      prefinish(stream, state);
	  }
	  return need;
	}

	function endWritable(stream, state, cb) {
	  state.ending = true;
	  finishMaybe(stream, state);
	  if (cb) {
	    if (state.finished)
	      process.nextTick(cb);
	    else
	      stream.once('finish', cb);
	  }
	  state.ended = true;
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	var Buffer = __webpack_require__(19).Buffer;

	var isBufferEncoding = Buffer.isEncoding
	  || function(encoding) {
	       switch (encoding && encoding.toLowerCase()) {
	         case 'hex': case 'utf8': case 'utf-8': case 'ascii': case 'binary': case 'base64': case 'ucs2': case 'ucs-2': case 'utf16le': case 'utf-16le': case 'raw': return true;
	         default: return false;
	       }
	     }


	function assertEncoding(encoding) {
	  if (encoding && !isBufferEncoding(encoding)) {
	    throw new Error('Unknown encoding: ' + encoding);
	  }
	}

	// StringDecoder provides an interface for efficiently splitting a series of
	// buffers into a series of JS strings without breaking apart multi-byte
	// characters. CESU-8 is handled as part of the UTF-8 encoding.
	//
	// @TODO Handling all encodings inside a single object makes it very difficult
	// to reason about this code, so it should be split up in the future.
	// @TODO There should be a utf8-strict encoding that rejects invalid UTF-8 code
	// points as used by CESU-8.
	var StringDecoder = exports.StringDecoder = function(encoding) {
	  this.encoding = (encoding || 'utf8').toLowerCase().replace(/[-_]/, '');
	  assertEncoding(encoding);
	  switch (this.encoding) {
	    case 'utf8':
	      // CESU-8 represents each of Surrogate Pair by 3-bytes
	      this.surrogateSize = 3;
	      break;
	    case 'ucs2':
	    case 'utf16le':
	      // UTF-16 represents each of Surrogate Pair by 2-bytes
	      this.surrogateSize = 2;
	      this.detectIncompleteChar = utf16DetectIncompleteChar;
	      break;
	    case 'base64':
	      // Base-64 stores 3 bytes in 4 chars, and pads the remainder.
	      this.surrogateSize = 3;
	      this.detectIncompleteChar = base64DetectIncompleteChar;
	      break;
	    default:
	      this.write = passThroughWrite;
	      return;
	  }

	  // Enough space to store all bytes of a single character. UTF-8 needs 4
	  // bytes, but CESU-8 may require up to 6 (3 bytes per surrogate).
	  this.charBuffer = new Buffer(6);
	  // Number of bytes received for the current incomplete multi-byte character.
	  this.charReceived = 0;
	  // Number of bytes expected for the current incomplete multi-byte character.
	  this.charLength = 0;
	};


	// write decodes the given buffer and returns it as JS string that is
	// guaranteed to not contain any partial multi-byte characters. Any partial
	// character found at the end of the buffer is buffered up, and will be
	// returned when calling write again with the remaining bytes.
	//
	// Note: Converting a Buffer containing an orphan surrogate to a String
	// currently works, but converting a String to a Buffer (via `new Buffer`, or
	// Buffer#write) will replace incomplete surrogates with the unicode
	// replacement character. See https://codereview.chromium.org/121173009/ .
	StringDecoder.prototype.write = function(buffer) {
	  var charStr = '';
	  // if our last write ended with an incomplete multibyte character
	  while (this.charLength) {
	    // determine how many remaining bytes this buffer has to offer for this char
	    var available = (buffer.length >= this.charLength - this.charReceived) ?
	        this.charLength - this.charReceived :
	        buffer.length;

	    // add the new bytes to the char buffer
	    buffer.copy(this.charBuffer, this.charReceived, 0, available);
	    this.charReceived += available;

	    if (this.charReceived < this.charLength) {
	      // still not enough chars in this buffer? wait for more ...
	      return '';
	    }

	    // remove bytes belonging to the current character from the buffer
	    buffer = buffer.slice(available, buffer.length);

	    // get the character that was split
	    charStr = this.charBuffer.slice(0, this.charLength).toString(this.encoding);

	    // CESU-8: lead surrogate (D800-DBFF) is also the incomplete character
	    var charCode = charStr.charCodeAt(charStr.length - 1);
	    if (charCode >= 0xD800 && charCode <= 0xDBFF) {
	      this.charLength += this.surrogateSize;
	      charStr = '';
	      continue;
	    }
	    this.charReceived = this.charLength = 0;

	    // if there are no more bytes in this buffer, just emit our char
	    if (buffer.length === 0) {
	      return charStr;
	    }
	    break;
	  }

	  // determine and set charLength / charReceived
	  this.detectIncompleteChar(buffer);

	  var end = buffer.length;
	  if (this.charLength) {
	    // buffer the incomplete character bytes we got
	    buffer.copy(this.charBuffer, 0, buffer.length - this.charReceived, end);
	    end -= this.charReceived;
	  }

	  charStr += buffer.toString(this.encoding, 0, end);

	  var end = charStr.length - 1;
	  var charCode = charStr.charCodeAt(end);
	  // CESU-8: lead surrogate (D800-DBFF) is also the incomplete character
	  if (charCode >= 0xD800 && charCode <= 0xDBFF) {
	    var size = this.surrogateSize;
	    this.charLength += size;
	    this.charReceived += size;
	    this.charBuffer.copy(this.charBuffer, size, 0, size);
	    buffer.copy(this.charBuffer, 0, 0, size);
	    return charStr.substring(0, end);
	  }

	  // or just emit the charStr
	  return charStr;
	};

	// detectIncompleteChar determines if there is an incomplete UTF-8 character at
	// the end of the given buffer. If so, it sets this.charLength to the byte
	// length that character, and sets this.charReceived to the number of bytes
	// that are available for this character.
	StringDecoder.prototype.detectIncompleteChar = function(buffer) {
	  // determine how many bytes we have to check at the end of this buffer
	  var i = (buffer.length >= 3) ? 3 : buffer.length;

	  // Figure out if one of the last i bytes of our buffer announces an
	  // incomplete char.
	  for (; i > 0; i--) {
	    var c = buffer[buffer.length - i];

	    // See http://en.wikipedia.org/wiki/UTF-8#Description

	    // 110XXXXX
	    if (i == 1 && c >> 5 == 0x06) {
	      this.charLength = 2;
	      break;
	    }

	    // 1110XXXX
	    if (i <= 2 && c >> 4 == 0x0E) {
	      this.charLength = 3;
	      break;
	    }

	    // 11110XXX
	    if (i <= 3 && c >> 3 == 0x1E) {
	      this.charLength = 4;
	      break;
	    }
	  }
	  this.charReceived = i;
	};

	StringDecoder.prototype.end = function(buffer) {
	  var res = '';
	  if (buffer && buffer.length)
	    res = this.write(buffer);

	  if (this.charReceived) {
	    var cr = this.charReceived;
	    var buf = this.charBuffer;
	    var enc = this.encoding;
	    res += buf.slice(0, cr).toString(enc);
	  }

	  return res;
	};

	function passThroughWrite(buffer) {
	  return buffer.toString(this.encoding);
	}

	function utf16DetectIncompleteChar(buffer) {
	  this.charReceived = buffer.length % 2;
	  this.charLength = this.charReceived ? 2 : 0;
	}

	function base64DetectIncompleteChar(buffer) {
	  this.charReceived = buffer.length % 3;
	  this.charLength = this.charReceived ? 3 : 0;
	}


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.


	// a transform stream is a readable/writable stream where you do
	// something with the data.  Sometimes it's called a "filter",
	// but that's not a great name for it, since that implies a thing where
	// some bits pass through, and others are simply ignored.  (That would
	// be a valid example of a transform, of course.)
	//
	// While the output is causally related to the input, it's not a
	// necessarily symmetric or synchronous transformation.  For example,
	// a zlib stream might take multiple plain-text writes(), and then
	// emit a single compressed chunk some time in the future.
	//
	// Here's how this works:
	//
	// The Transform stream has all the aspects of the readable and writable
	// stream classes.  When you write(chunk), that calls _write(chunk,cb)
	// internally, and returns false if there's a lot of pending writes
	// buffered up.  When you call read(), that calls _read(n) until
	// there's enough pending readable data buffered up.
	//
	// In a transform stream, the written data is placed in a buffer.  When
	// _read(n) is called, it transforms the queued up data, calling the
	// buffered _write cb's as it consumes chunks.  If consuming a single
	// written chunk would result in multiple output chunks, then the first
	// outputted bit calls the readcb, and subsequent chunks just go into
	// the read buffer, and will cause it to emit 'readable' if necessary.
	//
	// This way, back-pressure is actually determined by the reading side,
	// since _read has to be called to start processing a new chunk.  However,
	// a pathological inflate type of transform can cause excessive buffering
	// here.  For example, imagine a stream where every byte of input is
	// interpreted as an integer from 0-255, and then results in that many
	// bytes of output.  Writing the 4 bytes {ff,ff,ff,ff} would result in
	// 1kb of data being output.  In this case, you could write a very small
	// amount of input, and end up with a very large amount of output.  In
	// such a pathological inflating mechanism, there'd be no way to tell
	// the system to stop doing the transform.  A single 4MB write could
	// cause the system to run out of memory.
	//
	// However, even in such a pathological case, only a single written chunk
	// would be consumed, and then the rest would wait (un-transformed) until
	// the results of the previous transformed chunk were consumed.

	module.exports = Transform;

	var Duplex = __webpack_require__(25);

	/*<replacement>*/
	var util = __webpack_require__(23);
	util.inherits = __webpack_require__(15);
	/*</replacement>*/

	util.inherits(Transform, Duplex);


	function TransformState(options, stream) {
	  this.afterTransform = function(er, data) {
	    return afterTransform(stream, er, data);
	  };

	  this.needTransform = false;
	  this.transforming = false;
	  this.writecb = null;
	  this.writechunk = null;
	}

	function afterTransform(stream, er, data) {
	  var ts = stream._transformState;
	  ts.transforming = false;

	  var cb = ts.writecb;

	  if (!cb)
	    return stream.emit('error', new Error('no writecb in Transform class'));

	  ts.writechunk = null;
	  ts.writecb = null;

	  if (!util.isNullOrUndefined(data))
	    stream.push(data);

	  if (cb)
	    cb(er);

	  var rs = stream._readableState;
	  rs.reading = false;
	  if (rs.needReadable || rs.length < rs.highWaterMark) {
	    stream._read(rs.highWaterMark);
	  }
	}


	function Transform(options) {
	  if (!(this instanceof Transform))
	    return new Transform(options);

	  Duplex.call(this, options);

	  this._transformState = new TransformState(options, this);

	  // when the writable side finishes, then flush out anything remaining.
	  var stream = this;

	  // start out asking for a readable event once data is transformed.
	  this._readableState.needReadable = true;

	  // we have implemented the _read method, and done the other things
	  // that Readable wants before the first _read call, so unset the
	  // sync guard flag.
	  this._readableState.sync = false;

	  this.once('prefinish', function() {
	    if (util.isFunction(this._flush))
	      this._flush(function(er) {
	        done(stream, er);
	      });
	    else
	      done(stream);
	  });
	}

	Transform.prototype.push = function(chunk, encoding) {
	  this._transformState.needTransform = false;
	  return Duplex.prototype.push.call(this, chunk, encoding);
	};

	// This is the part where you do stuff!
	// override this function in implementation classes.
	// 'chunk' is an input chunk.
	//
	// Call `push(newChunk)` to pass along transformed output
	// to the readable side.  You may call 'push' zero or more times.
	//
	// Call `cb(err)` when you are done with this chunk.  If you pass
	// an error, then that'll put the hurt on the whole operation.  If you
	// never call cb(), then you'll never get another chunk.
	Transform.prototype._transform = function(chunk, encoding, cb) {
	  throw new Error('not implemented');
	};

	Transform.prototype._write = function(chunk, encoding, cb) {
	  var ts = this._transformState;
	  ts.writecb = cb;
	  ts.writechunk = chunk;
	  ts.writeencoding = encoding;
	  if (!ts.transforming) {
	    var rs = this._readableState;
	    if (ts.needTransform ||
	        rs.needReadable ||
	        rs.length < rs.highWaterMark)
	      this._read(rs.highWaterMark);
	  }
	};

	// Doesn't matter what the args are here.
	// _transform does all the work.
	// That we got here means that the readable side wants more data.
	Transform.prototype._read = function(n) {
	  var ts = this._transformState;

	  if (!util.isNull(ts.writechunk) && ts.writecb && !ts.transforming) {
	    ts.transforming = true;
	    this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
	  } else {
	    // mark that we need a transform, so that any data that comes in
	    // will get processed, now that we've asked for it.
	    ts.needTransform = true;
	  }
	};


	function done(stream, er) {
	  if (er)
	    return stream.emit('error', er);

	  // if there's nothing in the write buffer, then that means
	  // that nothing more will ever be provided
	  var ws = stream._writableState;
	  var ts = stream._transformState;

	  if (ws.length)
	    throw new Error('calling transform done when ws.length != 0');

	  if (ts.transforming)
	    throw new Error('calling transform done when still transforming');

	  return stream.push(null);
	}


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	// a passthrough stream.
	// basically just the most minimal sort of Transform stream.
	// Every written chunk gets output as-is.

	module.exports = PassThrough;

	var Transform = __webpack_require__(28);

	/*<replacement>*/
	var util = __webpack_require__(23);
	util.inherits = __webpack_require__(15);
	/*</replacement>*/

	util.inherits(PassThrough, Transform);

	function PassThrough(options) {
	  if (!(this instanceof PassThrough))
	    return new PassThrough(options);

	  Transform.call(this, options);
	}

	PassThrough.prototype._transform = function(chunk, encoding, cb) {
	  cb(null, chunk);
	};


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(26)


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(25)


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(28)


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(29)


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	var formatRegExp = /%[sdj%]/g;
	exports.format = function(f) {
	  if (!isString(f)) {
	    var objects = [];
	    for (var i = 0; i < arguments.length; i++) {
	      objects.push(inspect(arguments[i]));
	    }
	    return objects.join(' ');
	  }

	  var i = 1;
	  var args = arguments;
	  var len = args.length;
	  var str = String(f).replace(formatRegExp, function(x) {
	    if (x === '%%') return '%';
	    if (i >= len) return x;
	    switch (x) {
	      case '%s': return String(args[i++]);
	      case '%d': return Number(args[i++]);
	      case '%j':
	        try {
	          return JSON.stringify(args[i++]);
	        } catch (_) {
	          return '[Circular]';
	        }
	      default:
	        return x;
	    }
	  });
	  for (var x = args[i]; i < len; x = args[++i]) {
	    if (isNull(x) || !isObject(x)) {
	      str += ' ' + x;
	    } else {
	      str += ' ' + inspect(x);
	    }
	  }
	  return str;
	};


	// Mark that a method should not be used.
	// Returns a modified function which warns once by default.
	// If --no-deprecation is set, then it is a no-op.
	exports.deprecate = function(fn, msg) {
	  // Allow for deprecating things in the process of starting up.
	  if (isUndefined(global.process)) {
	    return function() {
	      return exports.deprecate(fn, msg).apply(this, arguments);
	    };
	  }

	  if (process.noDeprecation === true) {
	    return fn;
	  }

	  var warned = false;
	  function deprecated() {
	    if (!warned) {
	      if (process.throwDeprecation) {
	        throw new Error(msg);
	      } else if (process.traceDeprecation) {
	        console.trace(msg);
	      } else {
	        console.error(msg);
	      }
	      warned = true;
	    }
	    return fn.apply(this, arguments);
	  }

	  return deprecated;
	};


	var debugs = {};
	var debugEnviron;
	exports.debuglog = function(set) {
	  if (isUndefined(debugEnviron))
	    debugEnviron = process.env.NODE_DEBUG || '';
	  set = set.toUpperCase();
	  if (!debugs[set]) {
	    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
	      var pid = process.pid;
	      debugs[set] = function() {
	        var msg = exports.format.apply(exports, arguments);
	        console.error('%s %d: %s', set, pid, msg);
	      };
	    } else {
	      debugs[set] = function() {};
	    }
	  }
	  return debugs[set];
	};


	/**
	 * Echos the value of a value. Trys to print the value out
	 * in the best way possible given the different types.
	 *
	 * @param {Object} obj The object to print out.
	 * @param {Object} opts Optional options object that alters the output.
	 */
	/* legacy: obj, showHidden, depth, colors*/
	function inspect(obj, opts) {
	  // default options
	  var ctx = {
	    seen: [],
	    stylize: stylizeNoColor
	  };
	  // legacy...
	  if (arguments.length >= 3) ctx.depth = arguments[2];
	  if (arguments.length >= 4) ctx.colors = arguments[3];
	  if (isBoolean(opts)) {
	    // legacy...
	    ctx.showHidden = opts;
	  } else if (opts) {
	    // got an "options" object
	    exports._extend(ctx, opts);
	  }
	  // set default options
	  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
	  if (isUndefined(ctx.depth)) ctx.depth = 2;
	  if (isUndefined(ctx.colors)) ctx.colors = false;
	  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
	  if (ctx.colors) ctx.stylize = stylizeWithColor;
	  return formatValue(ctx, obj, ctx.depth);
	}
	exports.inspect = inspect;


	// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
	inspect.colors = {
	  'bold' : [1, 22],
	  'italic' : [3, 23],
	  'underline' : [4, 24],
	  'inverse' : [7, 27],
	  'white' : [37, 39],
	  'grey' : [90, 39],
	  'black' : [30, 39],
	  'blue' : [34, 39],
	  'cyan' : [36, 39],
	  'green' : [32, 39],
	  'magenta' : [35, 39],
	  'red' : [31, 39],
	  'yellow' : [33, 39]
	};

	// Don't use 'blue' not visible on cmd.exe
	inspect.styles = {
	  'special': 'cyan',
	  'number': 'yellow',
	  'boolean': 'yellow',
	  'undefined': 'grey',
	  'null': 'bold',
	  'string': 'green',
	  'date': 'magenta',
	  // "name": intentionally not styling
	  'regexp': 'red'
	};


	function stylizeWithColor(str, styleType) {
	  var style = inspect.styles[styleType];

	  if (style) {
	    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
	           '\u001b[' + inspect.colors[style][1] + 'm';
	  } else {
	    return str;
	  }
	}


	function stylizeNoColor(str, styleType) {
	  return str;
	}


	function arrayToHash(array) {
	  var hash = {};

	  array.forEach(function(val, idx) {
	    hash[val] = true;
	  });

	  return hash;
	}


	function formatValue(ctx, value, recurseTimes) {
	  // Provide a hook for user-specified inspect functions.
	  // Check that value is an object with an inspect function on it
	  if (ctx.customInspect &&
	      value &&
	      isFunction(value.inspect) &&
	      // Filter out the util module, it's inspect function is special
	      value.inspect !== exports.inspect &&
	      // Also filter out any prototype objects using the circular check.
	      !(value.constructor && value.constructor.prototype === value)) {
	    var ret = value.inspect(recurseTimes, ctx);
	    if (!isString(ret)) {
	      ret = formatValue(ctx, ret, recurseTimes);
	    }
	    return ret;
	  }

	  // Primitive types cannot have properties
	  var primitive = formatPrimitive(ctx, value);
	  if (primitive) {
	    return primitive;
	  }

	  // Look up the keys of the object.
	  var keys = Object.keys(value);
	  var visibleKeys = arrayToHash(keys);

	  if (ctx.showHidden) {
	    keys = Object.getOwnPropertyNames(value);
	  }

	  // IE doesn't make error fields non-enumerable
	  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
	  if (isError(value)
	      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
	    return formatError(value);
	  }

	  // Some type of object without properties can be shortcutted.
	  if (keys.length === 0) {
	    if (isFunction(value)) {
	      var name = value.name ? ': ' + value.name : '';
	      return ctx.stylize('[Function' + name + ']', 'special');
	    }
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    }
	    if (isDate(value)) {
	      return ctx.stylize(Date.prototype.toString.call(value), 'date');
	    }
	    if (isError(value)) {
	      return formatError(value);
	    }
	  }

	  var base = '', array = false, braces = ['{', '}'];

	  // Make Array say that they are Array
	  if (isArray(value)) {
	    array = true;
	    braces = ['[', ']'];
	  }

	  // Make functions say that they are functions
	  if (isFunction(value)) {
	    var n = value.name ? ': ' + value.name : '';
	    base = ' [Function' + n + ']';
	  }

	  // Make RegExps say that they are RegExps
	  if (isRegExp(value)) {
	    base = ' ' + RegExp.prototype.toString.call(value);
	  }

	  // Make dates with properties first say the date
	  if (isDate(value)) {
	    base = ' ' + Date.prototype.toUTCString.call(value);
	  }

	  // Make error with message first say the error
	  if (isError(value)) {
	    base = ' ' + formatError(value);
	  }

	  if (keys.length === 0 && (!array || value.length == 0)) {
	    return braces[0] + base + braces[1];
	  }

	  if (recurseTimes < 0) {
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    } else {
	      return ctx.stylize('[Object]', 'special');
	    }
	  }

	  ctx.seen.push(value);

	  var output;
	  if (array) {
	    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
	  } else {
	    output = keys.map(function(key) {
	      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
	    });
	  }

	  ctx.seen.pop();

	  return reduceToSingleString(output, base, braces);
	}


	function formatPrimitive(ctx, value) {
	  if (isUndefined(value))
	    return ctx.stylize('undefined', 'undefined');
	  if (isString(value)) {
	    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
	                                             .replace(/'/g, "\\'")
	                                             .replace(/\\"/g, '"') + '\'';
	    return ctx.stylize(simple, 'string');
	  }
	  if (isNumber(value))
	    return ctx.stylize('' + value, 'number');
	  if (isBoolean(value))
	    return ctx.stylize('' + value, 'boolean');
	  // For some reason typeof null is "object", so special case here.
	  if (isNull(value))
	    return ctx.stylize('null', 'null');
	}


	function formatError(value) {
	  return '[' + Error.prototype.toString.call(value) + ']';
	}


	function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
	  var output = [];
	  for (var i = 0, l = value.length; i < l; ++i) {
	    if (hasOwnProperty(value, String(i))) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
	          String(i), true));
	    } else {
	      output.push('');
	    }
	  }
	  keys.forEach(function(key) {
	    if (!key.match(/^\d+$/)) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
	          key, true));
	    }
	  });
	  return output;
	}


	function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
	  var name, str, desc;
	  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
	  if (desc.get) {
	    if (desc.set) {
	      str = ctx.stylize('[Getter/Setter]', 'special');
	    } else {
	      str = ctx.stylize('[Getter]', 'special');
	    }
	  } else {
	    if (desc.set) {
	      str = ctx.stylize('[Setter]', 'special');
	    }
	  }
	  if (!hasOwnProperty(visibleKeys, key)) {
	    name = '[' + key + ']';
	  }
	  if (!str) {
	    if (ctx.seen.indexOf(desc.value) < 0) {
	      if (isNull(recurseTimes)) {
	        str = formatValue(ctx, desc.value, null);
	      } else {
	        str = formatValue(ctx, desc.value, recurseTimes - 1);
	      }
	      if (str.indexOf('\n') > -1) {
	        if (array) {
	          str = str.split('\n').map(function(line) {
	            return '  ' + line;
	          }).join('\n').substr(2);
	        } else {
	          str = '\n' + str.split('\n').map(function(line) {
	            return '   ' + line;
	          }).join('\n');
	        }
	      }
	    } else {
	      str = ctx.stylize('[Circular]', 'special');
	    }
	  }
	  if (isUndefined(name)) {
	    if (array && key.match(/^\d+$/)) {
	      return str;
	    }
	    name = JSON.stringify('' + key);
	    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
	      name = name.substr(1, name.length - 2);
	      name = ctx.stylize(name, 'name');
	    } else {
	      name = name.replace(/'/g, "\\'")
	                 .replace(/\\"/g, '"')
	                 .replace(/(^"|"$)/g, "'");
	      name = ctx.stylize(name, 'string');
	    }
	  }

	  return name + ': ' + str;
	}


	function reduceToSingleString(output, base, braces) {
	  var numLinesEst = 0;
	  var length = output.reduce(function(prev, cur) {
	    numLinesEst++;
	    if (cur.indexOf('\n') >= 0) numLinesEst++;
	    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
	  }, 0);

	  if (length > 60) {
	    return braces[0] +
	           (base === '' ? '' : base + '\n ') +
	           ' ' +
	           output.join(',\n  ') +
	           ' ' +
	           braces[1];
	  }

	  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
	}


	// NOTE: These type checking functions intentionally don't use `instanceof`
	// because it is fragile and can be easily faked with `Object.create()`.
	function isArray(ar) {
	  return Array.isArray(ar);
	}
	exports.isArray = isArray;

	function isBoolean(arg) {
	  return typeof arg === 'boolean';
	}
	exports.isBoolean = isBoolean;

	function isNull(arg) {
	  return arg === null;
	}
	exports.isNull = isNull;

	function isNullOrUndefined(arg) {
	  return arg == null;
	}
	exports.isNullOrUndefined = isNullOrUndefined;

	function isNumber(arg) {
	  return typeof arg === 'number';
	}
	exports.isNumber = isNumber;

	function isString(arg) {
	  return typeof arg === 'string';
	}
	exports.isString = isString;

	function isSymbol(arg) {
	  return typeof arg === 'symbol';
	}
	exports.isSymbol = isSymbol;

	function isUndefined(arg) {
	  return arg === void 0;
	}
	exports.isUndefined = isUndefined;

	function isRegExp(re) {
	  return isObject(re) && objectToString(re) === '[object RegExp]';
	}
	exports.isRegExp = isRegExp;

	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}
	exports.isObject = isObject;

	function isDate(d) {
	  return isObject(d) && objectToString(d) === '[object Date]';
	}
	exports.isDate = isDate;

	function isError(e) {
	  return isObject(e) &&
	      (objectToString(e) === '[object Error]' || e instanceof Error);
	}
	exports.isError = isError;

	function isFunction(arg) {
	  return typeof arg === 'function';
	}
	exports.isFunction = isFunction;

	function isPrimitive(arg) {
	  return arg === null ||
	         typeof arg === 'boolean' ||
	         typeof arg === 'number' ||
	         typeof arg === 'string' ||
	         typeof arg === 'symbol' ||  // ES6 symbol
	         typeof arg === 'undefined';
	}
	exports.isPrimitive = isPrimitive;

	exports.isBuffer = __webpack_require__(35);

	function objectToString(o) {
	  return Object.prototype.toString.call(o);
	}


	function pad(n) {
	  return n < 10 ? '0' + n.toString(10) : n.toString(10);
	}


	var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
	              'Oct', 'Nov', 'Dec'];

	// 26 Feb 16:19:34
	function timestamp() {
	  var d = new Date();
	  var time = [pad(d.getHours()),
	              pad(d.getMinutes()),
	              pad(d.getSeconds())].join(':');
	  return [d.getDate(), months[d.getMonth()], time].join(' ');
	}


	// log is just a thin wrapper to console.log that prepends a timestamp
	exports.log = function() {
	  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
	};


	/**
	 * Inherit the prototype methods from one constructor into another.
	 *
	 * The Function.prototype.inherits from lang.js rewritten as a standalone
	 * function (not on Function.prototype). NOTE: If this file is to be loaded
	 * during bootstrapping this function needs to be rewritten using some native
	 * functions as prototype setup using normal JavaScript does not work as
	 * expected during bootstrapping (see mirror.js in r114903).
	 *
	 * @param {function} ctor Constructor function which needs to inherit the
	 *     prototype.
	 * @param {function} superCtor Constructor function to inherit prototype from.
	 */
	exports.inherits = __webpack_require__(36);

	exports._extend = function(origin, add) {
	  // Don't do anything if add isn't an object
	  if (!add || !isObject(add)) return origin;

	  var keys = Object.keys(add);
	  var i = keys.length;
	  while (i--) {
	    origin[keys[i]] = add[keys[i]];
	  }
	  return origin;
	};

	function hasOwnProperty(obj, prop) {
	  return Object.prototype.hasOwnProperty.call(obj, prop);
	}

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(2)))

/***/ },
/* 35 */
/***/ function(module, exports) {

	module.exports = function isBuffer(arg) {
	  return arg && typeof arg === 'object'
	    && typeof arg.copy === 'function'
	    && typeof arg.fill === 'function'
	    && typeof arg.readUInt8 === 'function';
	}

/***/ },
/* 36 */
/***/ function(module, exports) {

	if (typeof Object.create === 'function') {
	  // implementation from standard node.js 'util' module
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    ctor.prototype = Object.create(superCtor.prototype, {
	      constructor: {
	        value: ctor,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	  };
	} else {
	  // old school shim for old browsers
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    var TempCtor = function () {}
	    TempCtor.prototype = superCtor.prototype
	    ctor.prototype = new TempCtor()
	    ctor.prototype.constructor = ctor
	  }
	}


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	// compare and isBuffer taken from https://github.com/feross/buffer/blob/680e9e5e488f22aac27599a57dc844a6315928dd/index.js
	// original notice:

	/*!
	 * The buffer module from node.js, for the browser.
	 *
	 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
	 * @license  MIT
	 */
	function compare(a, b) {
	  if (a === b) {
	    return 0;
	  }

	  var x = a.length;
	  var y = b.length;

	  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
	    if (a[i] !== b[i]) {
	      x = a[i];
	      y = b[i];
	      break;
	    }
	  }

	  if (x < y) {
	    return -1;
	  }
	  if (y < x) {
	    return 1;
	  }
	  return 0;
	}
	function isBuffer(b) {
	  if (global.Buffer && typeof global.Buffer.isBuffer === 'function') {
	    return global.Buffer.isBuffer(b);
	  }
	  return !!(b != null && b._isBuffer);
	}

	// based on node assert, original notice:

	// http://wiki.commonjs.org/wiki/Unit_Testing/1.0
	//
	// THIS IS NOT TESTED NOR LIKELY TO WORK OUTSIDE V8!
	//
	// Originally from narwhal.js (http://narwhaljs.org)
	// Copyright (c) 2009 Thomas Robinson <280north.com>
	//
	// Permission is hereby granted, free of charge, to any person obtaining a copy
	// of this software and associated documentation files (the 'Software'), to
	// deal in the Software without restriction, including without limitation the
	// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
	// sell copies of the Software, and to permit persons to whom the Software is
	// furnished to do so, subject to the following conditions:
	//
	// The above copyright notice and this permission notice shall be included in
	// all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	// AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
	// ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
	// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

	var util = __webpack_require__(34);
	var hasOwn = Object.prototype.hasOwnProperty;
	var pSlice = Array.prototype.slice;
	var functionsHaveNames = (function () {
	  return function foo() {}.name === 'foo';
	}());
	function pToString (obj) {
	  return Object.prototype.toString.call(obj);
	}
	function isView(arrbuf) {
	  if (isBuffer(arrbuf)) {
	    return false;
	  }
	  if (typeof global.ArrayBuffer !== 'function') {
	    return false;
	  }
	  if (typeof ArrayBuffer.isView === 'function') {
	    return ArrayBuffer.isView(arrbuf);
	  }
	  if (!arrbuf) {
	    return false;
	  }
	  if (arrbuf instanceof DataView) {
	    return true;
	  }
	  if (arrbuf.buffer && arrbuf.buffer instanceof ArrayBuffer) {
	    return true;
	  }
	  return false;
	}
	// 1. The assert module provides functions that throw
	// AssertionError's when particular conditions are not met. The
	// assert module must conform to the following interface.

	var assert = module.exports = ok;

	// 2. The AssertionError is defined in assert.
	// new assert.AssertionError({ message: message,
	//                             actual: actual,
	//                             expected: expected })

	var regex = /\s*function\s+([^\(\s]*)\s*/;
	// based on https://github.com/ljharb/function.prototype.name/blob/adeeeec8bfcc6068b187d7d9fb3d5bb1d3a30899/implementation.js
	function getName(func) {
	  if (!util.isFunction(func)) {
	    return;
	  }
	  if (functionsHaveNames) {
	    return func.name;
	  }
	  var str = func.toString();
	  var match = str.match(regex);
	  return match && match[1];
	}
	assert.AssertionError = function AssertionError(options) {
	  this.name = 'AssertionError';
	  this.actual = options.actual;
	  this.expected = options.expected;
	  this.operator = options.operator;
	  if (options.message) {
	    this.message = options.message;
	    this.generatedMessage = false;
	  } else {
	    this.message = getMessage(this);
	    this.generatedMessage = true;
	  }
	  var stackStartFunction = options.stackStartFunction || fail;
	  if (Error.captureStackTrace) {
	    Error.captureStackTrace(this, stackStartFunction);
	  } else {
	    // non v8 browsers so we can have a stacktrace
	    var err = new Error();
	    if (err.stack) {
	      var out = err.stack;

	      // try to strip useless frames
	      var fn_name = getName(stackStartFunction);
	      var idx = out.indexOf('\n' + fn_name);
	      if (idx >= 0) {
	        // once we have located the function frame
	        // we need to strip out everything before it (and its line)
	        var next_line = out.indexOf('\n', idx + 1);
	        out = out.substring(next_line + 1);
	      }

	      this.stack = out;
	    }
	  }
	};

	// assert.AssertionError instanceof Error
	util.inherits(assert.AssertionError, Error);

	function truncate(s, n) {
	  if (typeof s === 'string') {
	    return s.length < n ? s : s.slice(0, n);
	  } else {
	    return s;
	  }
	}
	function inspect(something) {
	  if (functionsHaveNames || !util.isFunction(something)) {
	    return util.inspect(something);
	  }
	  var rawname = getName(something);
	  var name = rawname ? ': ' + rawname : '';
	  return '[Function' +  name + ']';
	}
	function getMessage(self) {
	  return truncate(inspect(self.actual), 128) + ' ' +
	         self.operator + ' ' +
	         truncate(inspect(self.expected), 128);
	}

	// At present only the three keys mentioned above are used and
	// understood by the spec. Implementations or sub modules can pass
	// other keys to the AssertionError's constructor - they will be
	// ignored.

	// 3. All of the following functions must throw an AssertionError
	// when a corresponding condition is not met, with a message that
	// may be undefined if not provided.  All assertion methods provide
	// both the actual and expected values to the assertion error for
	// display purposes.

	function fail(actual, expected, message, operator, stackStartFunction) {
	  throw new assert.AssertionError({
	    message: message,
	    actual: actual,
	    expected: expected,
	    operator: operator,
	    stackStartFunction: stackStartFunction
	  });
	}

	// EXTENSION! allows for well behaved errors defined elsewhere.
	assert.fail = fail;

	// 4. Pure assertion tests whether a value is truthy, as determined
	// by !!guard.
	// assert.ok(guard, message_opt);
	// This statement is equivalent to assert.equal(true, !!guard,
	// message_opt);. To test strictly for the value true, use
	// assert.strictEqual(true, guard, message_opt);.

	function ok(value, message) {
	  if (!value) fail(value, true, message, '==', assert.ok);
	}
	assert.ok = ok;

	// 5. The equality assertion tests shallow, coercive equality with
	// ==.
	// assert.equal(actual, expected, message_opt);

	assert.equal = function equal(actual, expected, message) {
	  if (actual != expected) fail(actual, expected, message, '==', assert.equal);
	};

	// 6. The non-equality assertion tests for whether two objects are not equal
	// with != assert.notEqual(actual, expected, message_opt);

	assert.notEqual = function notEqual(actual, expected, message) {
	  if (actual == expected) {
	    fail(actual, expected, message, '!=', assert.notEqual);
	  }
	};

	// 7. The equivalence assertion tests a deep equality relation.
	// assert.deepEqual(actual, expected, message_opt);

	assert.deepEqual = function deepEqual(actual, expected, message) {
	  if (!_deepEqual(actual, expected, false)) {
	    fail(actual, expected, message, 'deepEqual', assert.deepEqual);
	  }
	};

	assert.deepStrictEqual = function deepStrictEqual(actual, expected, message) {
	  if (!_deepEqual(actual, expected, true)) {
	    fail(actual, expected, message, 'deepStrictEqual', assert.deepStrictEqual);
	  }
	};

	function _deepEqual(actual, expected, strict, memos) {
	  // 7.1. All identical values are equivalent, as determined by ===.
	  if (actual === expected) {
	    return true;
	  } else if (isBuffer(actual) && isBuffer(expected)) {
	    return compare(actual, expected) === 0;

	  // 7.2. If the expected value is a Date object, the actual value is
	  // equivalent if it is also a Date object that refers to the same time.
	  } else if (util.isDate(actual) && util.isDate(expected)) {
	    return actual.getTime() === expected.getTime();

	  // 7.3 If the expected value is a RegExp object, the actual value is
	  // equivalent if it is also a RegExp object with the same source and
	  // properties (`global`, `multiline`, `lastIndex`, `ignoreCase`).
	  } else if (util.isRegExp(actual) && util.isRegExp(expected)) {
	    return actual.source === expected.source &&
	           actual.global === expected.global &&
	           actual.multiline === expected.multiline &&
	           actual.lastIndex === expected.lastIndex &&
	           actual.ignoreCase === expected.ignoreCase;

	  // 7.4. Other pairs that do not both pass typeof value == 'object',
	  // equivalence is determined by ==.
	  } else if ((actual === null || typeof actual !== 'object') &&
	             (expected === null || typeof expected !== 'object')) {
	    return strict ? actual === expected : actual == expected;

	  // If both values are instances of typed arrays, wrap their underlying
	  // ArrayBuffers in a Buffer each to increase performance
	  // This optimization requires the arrays to have the same type as checked by
	  // Object.prototype.toString (aka pToString). Never perform binary
	  // comparisons for Float*Arrays, though, since e.g. +0 === -0 but their
	  // bit patterns are not identical.
	  } else if (isView(actual) && isView(expected) &&
	             pToString(actual) === pToString(expected) &&
	             !(actual instanceof Float32Array ||
	               actual instanceof Float64Array)) {
	    return compare(new Uint8Array(actual.buffer),
	                   new Uint8Array(expected.buffer)) === 0;

	  // 7.5 For all other Object pairs, including Array objects, equivalence is
	  // determined by having the same number of owned properties (as verified
	  // with Object.prototype.hasOwnProperty.call), the same set of keys
	  // (although not necessarily the same order), equivalent values for every
	  // corresponding key, and an identical 'prototype' property. Note: this
	  // accounts for both named and indexed properties on Arrays.
	  } else if (isBuffer(actual) !== isBuffer(expected)) {
	    return false;
	  } else {
	    memos = memos || {actual: [], expected: []};

	    var actualIndex = memos.actual.indexOf(actual);
	    if (actualIndex !== -1) {
	      if (actualIndex === memos.expected.indexOf(expected)) {
	        return true;
	      }
	    }

	    memos.actual.push(actual);
	    memos.expected.push(expected);

	    return objEquiv(actual, expected, strict, memos);
	  }
	}

	function isArguments(object) {
	  return Object.prototype.toString.call(object) == '[object Arguments]';
	}

	function objEquiv(a, b, strict, actualVisitedObjects) {
	  if (a === null || a === undefined || b === null || b === undefined)
	    return false;
	  // if one is a primitive, the other must be same
	  if (util.isPrimitive(a) || util.isPrimitive(b))
	    return a === b;
	  if (strict && Object.getPrototypeOf(a) !== Object.getPrototypeOf(b))
	    return false;
	  var aIsArgs = isArguments(a);
	  var bIsArgs = isArguments(b);
	  if ((aIsArgs && !bIsArgs) || (!aIsArgs && bIsArgs))
	    return false;
	  if (aIsArgs) {
	    a = pSlice.call(a);
	    b = pSlice.call(b);
	    return _deepEqual(a, b, strict);
	  }
	  var ka = objectKeys(a);
	  var kb = objectKeys(b);
	  var key, i;
	  // having the same number of owned properties (keys incorporates
	  // hasOwnProperty)
	  if (ka.length !== kb.length)
	    return false;
	  //the same set of keys (although not necessarily the same order),
	  ka.sort();
	  kb.sort();
	  //~~~cheap key test
	  for (i = ka.length - 1; i >= 0; i--) {
	    if (ka[i] !== kb[i])
	      return false;
	  }
	  //equivalent values for every corresponding key, and
	  //~~~possibly expensive deep test
	  for (i = ka.length - 1; i >= 0; i--) {
	    key = ka[i];
	    if (!_deepEqual(a[key], b[key], strict, actualVisitedObjects))
	      return false;
	  }
	  return true;
	}

	// 8. The non-equivalence assertion tests for any deep inequality.
	// assert.notDeepEqual(actual, expected, message_opt);

	assert.notDeepEqual = function notDeepEqual(actual, expected, message) {
	  if (_deepEqual(actual, expected, false)) {
	    fail(actual, expected, message, 'notDeepEqual', assert.notDeepEqual);
	  }
	};

	assert.notDeepStrictEqual = notDeepStrictEqual;
	function notDeepStrictEqual(actual, expected, message) {
	  if (_deepEqual(actual, expected, true)) {
	    fail(actual, expected, message, 'notDeepStrictEqual', notDeepStrictEqual);
	  }
	}


	// 9. The strict equality assertion tests strict equality, as determined by ===.
	// assert.strictEqual(actual, expected, message_opt);

	assert.strictEqual = function strictEqual(actual, expected, message) {
	  if (actual !== expected) {
	    fail(actual, expected, message, '===', assert.strictEqual);
	  }
	};

	// 10. The strict non-equality assertion tests for strict inequality, as
	// determined by !==.  assert.notStrictEqual(actual, expected, message_opt);

	assert.notStrictEqual = function notStrictEqual(actual, expected, message) {
	  if (actual === expected) {
	    fail(actual, expected, message, '!==', assert.notStrictEqual);
	  }
	};

	function expectedException(actual, expected) {
	  if (!actual || !expected) {
	    return false;
	  }

	  if (Object.prototype.toString.call(expected) == '[object RegExp]') {
	    return expected.test(actual);
	  }

	  try {
	    if (actual instanceof expected) {
	      return true;
	    }
	  } catch (e) {
	    // Ignore.  The instanceof check doesn't work for arrow functions.
	  }

	  if (Error.isPrototypeOf(expected)) {
	    return false;
	  }

	  return expected.call({}, actual) === true;
	}

	function _tryBlock(block) {
	  var error;
	  try {
	    block();
	  } catch (e) {
	    error = e;
	  }
	  return error;
	}

	function _throws(shouldThrow, block, expected, message) {
	  var actual;

	  if (typeof block !== 'function') {
	    throw new TypeError('"block" argument must be a function');
	  }

	  if (typeof expected === 'string') {
	    message = expected;
	    expected = null;
	  }

	  actual = _tryBlock(block);

	  message = (expected && expected.name ? ' (' + expected.name + ').' : '.') +
	            (message ? ' ' + message : '.');

	  if (shouldThrow && !actual) {
	    fail(actual, expected, 'Missing expected exception' + message);
	  }

	  var userProvidedMessage = typeof message === 'string';
	  var isUnwantedException = !shouldThrow && util.isError(actual);
	  var isUnexpectedException = !shouldThrow && actual && !expected;

	  if ((isUnwantedException &&
	      userProvidedMessage &&
	      expectedException(actual, expected)) ||
	      isUnexpectedException) {
	    fail(actual, expected, 'Got unwanted exception' + message);
	  }

	  if ((shouldThrow && actual && expected &&
	      !expectedException(actual, expected)) || (!shouldThrow && actual)) {
	    throw actual;
	  }
	}

	// 11. Expected to throw an error:
	// assert.throws(block, Error_opt, message_opt);

	assert.throws = function(block, /*optional*/error, /*optional*/message) {
	  _throws(true, block, error, message);
	};

	// EXTENSION! This is annoying to write outside this module.
	assert.doesNotThrow = function(block, /*optional*/error, /*optional*/message) {
	  _throws(false, block, error, message);
	};

	assert.ifError = function(err) { if (err) throw err; };

	var objectKeys = Object.keys || function (obj) {
	  var keys = [];
	  for (var key in obj) {
	    if (hasOwn.call(obj, key)) keys.push(key);
	  }
	  return keys;
	};

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	exports.asyncMap = __webpack_require__(39)
	exports.bindActor = __webpack_require__(40)
	exports.chain = __webpack_require__(41)


/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {
	/*
	usage:

	// do something to a list of things
	asyncMap(myListOfStuff, function (thing, cb) { doSomething(thing.foo, cb) }, cb)
	// do more than one thing to each item
	asyncMap(list, fooFn, barFn, cb)

	*/

	module.exports = asyncMap

	function asyncMap () {
	  var steps = Array.prototype.slice.call(arguments)
	    , list = steps.shift() || []
	    , cb_ = steps.pop()
	  if (typeof cb_ !== "function") throw new Error(
	    "No callback provided to asyncMap")
	  if (!list) return cb_(null, [])
	  if (!Array.isArray(list)) list = [list]
	  var n = steps.length
	    , data = [] // 2d array
	    , errState = null
	    , l = list.length
	    , a = l * n
	  if (!a) return cb_(null, [])
	  function cb (er) {
	    if (er && !errState) errState = er

	    var argLen = arguments.length
	    for (var i = 1; i < argLen; i ++) if (arguments[i] !== undefined) {
	      data[i - 1] = (data[i - 1] || []).concat(arguments[i])
	    }
	    // see if any new things have been added.
	    if (list.length > l) {
	      var newList = list.slice(l)
	      a += (list.length - l) * n
	      l = list.length
	      process.nextTick(function () {
	        newList.forEach(function (ar) {
	          steps.forEach(function (fn) { fn(ar, cb) })
	        })
	      })
	    }

	    if (--a === 0) cb_.apply(null, [errState].concat(data))
	  }
	  // expect the supplied cb function to be called
	  // "n" times for each thing in the array.
	  list.forEach(function (ar) {
	    steps.forEach(function (fn) { fn(ar, cb) })
	  })
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 40 */
/***/ function(module, exports) {

	module.exports = bindActor
	function bindActor () {
	  var args = 
	        Array.prototype.slice.call
	        (arguments) // jswtf.
	    , obj = null
	    , fn
	  if (typeof args[0] === "object") {
	    obj = args.shift()
	    fn = args.shift()
	    if (typeof fn === "string")
	      fn = obj[ fn ]
	  } else fn = args.shift()
	  return function (cb) {
	    fn.apply(obj, args.concat(cb)) }
	}


/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = chain
	var bindActor = __webpack_require__(40)
	chain.first = {} ; chain.last = {}
	function chain (things, cb) {
	  var res = []
	  ;(function LOOP (i, len) {
	    if (i >= len) return cb(null,res)
	    if (Array.isArray(things[i]))
	      things[i] = bindActor.apply(null,
	        things[i].map(function(i){
	          return (i===chain.first) ? res[0]
	           : (i===chain.last)
	             ? res[res.length - 1] : i }))
	    if (!things[i]) return LOOP(i + 1, len)
	    things[i](function (er, data) {
	      if (er) return cb(er, res)
	      if (data !== undefined) res = res.concat(data)
	      LOOP(i + 1, len)
	    })
	  })(0, things.length) }


/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @preserve
	 * JS Implementation of incremental MurmurHash3 (r150) (as of May 10, 2013)
	 *
	 * @author <a href="mailto:jensyt@gmail.com">Jens Taylor</a>
	 * @see http://github.com/homebrewing/brauhaus-diff
	 * @author <a href="mailto:gary.court@gmail.com">Gary Court</a>
	 * @see http://github.com/garycourt/murmurhash-js
	 * @author <a href="mailto:aappleby@gmail.com">Austin Appleby</a>
	 * @see http://sites.google.com/site/murmurhash/
	 */
	(function(){
	    var cache;

	    // Call this function without `new` to use the cached object (good for
	    // single-threaded environments), or with `new` to create a new object.
	    //
	    // @param {string} key A UTF-16 or ASCII string
	    // @param {number} seed An optional positive integer
	    // @return {object} A MurmurHash3 object for incremental hashing
	    function MurmurHash3(key, seed) {
	        var m = this instanceof MurmurHash3 ? this : cache;
	        m.reset(seed)
	        if (typeof key === 'string' && key.length > 0) {
	            m.hash(key);
	        }

	        if (m !== this) {
	            return m;
	        }
	    };

	    // Incrementally add a string to this hash
	    //
	    // @param {string} key A UTF-16 or ASCII string
	    // @return {object} this
	    MurmurHash3.prototype.hash = function(key) {
	        var h1, k1, i, top, len;

	        len = key.length;
	        this.len += len;

	        k1 = this.k1;
	        i = 0;
	        switch (this.rem) {
	            case 0: k1 ^= len > i ? (key.charCodeAt(i++) & 0xffff) : 0;
	            case 1: k1 ^= len > i ? (key.charCodeAt(i++) & 0xffff) << 8 : 0;
	            case 2: k1 ^= len > i ? (key.charCodeAt(i++) & 0xffff) << 16 : 0;
	            case 3:
	                k1 ^= len > i ? (key.charCodeAt(i) & 0xff) << 24 : 0;
	                k1 ^= len > i ? (key.charCodeAt(i++) & 0xff00) >> 8 : 0;
	        }

	        this.rem = (len + this.rem) & 3; // & 3 is same as % 4
	        len -= this.rem;
	        if (len > 0) {
	            h1 = this.h1;
	            while (1) {
	                k1 = (k1 * 0x2d51 + (k1 & 0xffff) * 0xcc9e0000) & 0xffffffff;
	                k1 = (k1 << 15) | (k1 >>> 17);
	                k1 = (k1 * 0x3593 + (k1 & 0xffff) * 0x1b870000) & 0xffffffff;

	                h1 ^= k1;
	                h1 = (h1 << 13) | (h1 >>> 19);
	                h1 = (h1 * 5 + 0xe6546b64) & 0xffffffff;

	                if (i >= len) {
	                    break;
	                }

	                k1 = ((key.charCodeAt(i++) & 0xffff)) ^
	                     ((key.charCodeAt(i++) & 0xffff) << 8) ^
	                     ((key.charCodeAt(i++) & 0xffff) << 16);
	                top = key.charCodeAt(i++);
	                k1 ^= ((top & 0xff) << 24) ^
	                      ((top & 0xff00) >> 8);
	            }

	            k1 = 0;
	            switch (this.rem) {
	                case 3: k1 ^= (key.charCodeAt(i + 2) & 0xffff) << 16;
	                case 2: k1 ^= (key.charCodeAt(i + 1) & 0xffff) << 8;
	                case 1: k1 ^= (key.charCodeAt(i) & 0xffff);
	            }

	            this.h1 = h1;
	        }

	        this.k1 = k1;
	        return this;
	    };

	    // Get the result of this hash
	    //
	    // @return {number} The 32-bit hash
	    MurmurHash3.prototype.result = function() {
	        var k1, h1;
	        
	        k1 = this.k1;
	        h1 = this.h1;

	        if (k1 > 0) {
	            k1 = (k1 * 0x2d51 + (k1 & 0xffff) * 0xcc9e0000) & 0xffffffff;
	            k1 = (k1 << 15) | (k1 >>> 17);
	            k1 = (k1 * 0x3593 + (k1 & 0xffff) * 0x1b870000) & 0xffffffff;
	            h1 ^= k1;
	        }

	        h1 ^= this.len;

	        h1 ^= h1 >>> 16;
	        h1 = (h1 * 0xca6b + (h1 & 0xffff) * 0x85eb0000) & 0xffffffff;
	        h1 ^= h1 >>> 13;
	        h1 = (h1 * 0xae35 + (h1 & 0xffff) * 0xc2b20000) & 0xffffffff;
	        h1 ^= h1 >>> 16;

	        return h1 >>> 0;
	    };

	    // Reset the hash object for reuse
	    //
	    // @param {number} seed An optional positive integer
	    MurmurHash3.prototype.reset = function(seed) {
	        this.h1 = typeof seed === 'number' ? seed : 0;
	        this.rem = this.k1 = this.len = 0;
	        return this;
	    };

	    // A cached object to use. This can be safely used if you're in a single-
	    // threaded environment, otherwise you need to create new hashes to use.
	    cache = new MurmurHash3();

	    if (true) {
	        module.exports = MurmurHash3;
	    } else {
	        this.MurmurHash3 = MurmurHash3;
	    }
	}());


/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _CB = __webpack_require__(1);

	var _CB2 = _interopRequireDefault(_CB);

	var _socket = __webpack_require__(57);

	var _socket2 = _interopRequireDefault(_socket);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/*
	 CloudApp
	 */
	_CB2.default.CloudApp = _CB2.default.CloudApp || {};
	_CB2.default.CloudApp._isConnected = false;

	_CB2.default.CloudApp.init = function (serverUrl, applicationId, applicationKey, opts) {
	    //static function for initialisation of the app
	    if (!applicationKey) {
	        applicationKey = applicationId;
	        applicationId = serverUrl;
	    } else {
	        _CB2.default.apiUrl = serverUrl;
	    }

	    if ((typeof applicationKey === 'undefined' ? 'undefined' : _typeof(applicationKey)) === "object") {
	        opts = applicationKey;
	        applicationKey = applicationId;
	        applicationId = serverUrl;
	    }

	    _CB2.default.appId = applicationId;
	    _CB2.default.appKey = applicationKey;

	    if (opts && opts.disableRealtime === true) {
	        _CB2.default._isRealtimeDisabled = true;
	    } else {
	        _CB2.default.io = _socket2.default;
	        _CB2.default.Socket = _CB2.default.io(_CB2.default.apiUrl);
	    }
	    _CB2.default.CloudApp._isConnected = true;
	};

	_CB2.default.CloudApp.onConnect = function (functionToFire) {
	    //static function for initialisation of the app
	    _CB2.default._validate();

	    if (!_CB2.default.Socket) {
	        throw "Socket couldn't be found. Init app first.";
	    }

	    _CB2.default.Socket.on('connect', functionToFire);
	};

	_CB2.default.CloudApp.onDisconnect = function (functionToFire) {
	    //static function for initialisation of the app
	    _CB2.default._validate();

	    if (!_CB2.default.Socket) {
	        throw "Socket couldn't be found. Init app first.";
	    }

	    _CB2.default.Socket.on('disconnect', functionToFire);
	};

	_CB2.default.CloudApp.connect = function () {
	    //static function for initialisation of the app
	    _CB2.default._validate();

	    if (!_CB2.default.Socket) {
	        throw "Socket couldn't be found. Init app first.";
	    }

	    _CB2.default.Socket.connect();
	    _CB2.default.CloudApp._isConnected = true;
	};

	_CB2.default.CloudApp.disconnect = function () {
	    //static function for initialisation of the app
	    _CB2.default._validate();

	    if (!_CB2.default.Socket) {
	        throw "Socket couldn't be found. Init app first.";
	    }

	    _CB2.default.Socket.emit('socket-disconnect', _CB2.default.appId);
	    _CB2.default.CloudApp._isConnected = false;
	};

	exports.default = true;

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _CB = __webpack_require__(1);

	var _CB2 = _interopRequireDefault(_CB);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/*
	 Column.js
	 */
	_CB2.default.Column = function (columnName, dataType, required, unique) {
	    this.document = {};
	    if (columnName) {
	        _CB2.default._columnNameValidation(columnName);
	        this.document.name = columnName;
	        this.document._type = 'column';
	    }

	    if (dataType) {
	        _CB2.default._columnDataTypeValidation(dataType);
	        this.document.dataType = dataType;
	    } else {
	        this.document.dataType = "Text";
	    }

	    if (typeof required === 'boolean') {
	        this.document.required = required;
	    } else {
	        this.document.required = false;
	    }

	    if (typeof unique === 'boolean') {
	        this.document.unique = unique;
	    } else {
	        this.document.unique = false;
	    }

	    if (dataType === "Text") {
	        this.document.isSearchable = true;
	    }

	    this.document.relatedTo = null;
	    this.document.relationType = null;

	    this.document.isDeletable = true;
	    this.document.isEditable = true;
	    this.document.isRenamable = false;
	    this.document.editableByMasterKey = false;
	};

	Object.defineProperty(_CB2.default.Column.prototype, 'name', {
	    get: function get() {
	        return this.document.name;
	    },
	    set: function set(name) {
	        this.document.name = name;
	    }
	});

	Object.defineProperty(_CB2.default.Column.prototype, 'dataType', {
	    get: function get() {
	        return this.document.dataType;
	    },
	    set: function set(dataType) {
	        this.document.dataType = dataType;
	    }
	});

	Object.defineProperty(_CB2.default.Column.prototype, 'unique', {
	    get: function get() {
	        return this.document.unique;
	    },
	    set: function set(unique) {
	        this.document.unique = unique;
	    }
	});

	Object.defineProperty(_CB2.default.Column.prototype, 'relatedTo', {
	    get: function get() {
	        return this.document.relatedTo;
	    },
	    set: function set(relatedTo) {
	        this.document.relatedTo = relatedTo;
	    }
	});

	Object.defineProperty(_CB2.default.Column.prototype, 'required', {
	    get: function get() {
	        return this.document.required;
	    },
	    set: function set(required) {
	        this.document.required = required;
	    }
	});

	Object.defineProperty(_CB2.default.Column.prototype, 'editableByMasterKey', {
	    get: function get() {
	        return this.document.editableByMasterKey;
	    },
	    set: function set(editableByMasterKey) {
	        this.document.editableByMasterKey = editableByMasterKey;
	    }
	});

	Object.defineProperty(_CB2.default.Column.prototype, 'isSearchable', {
	    get: function get() {
	        return this.document.isSearchable;
	    },
	    set: function set(isSearchable) {
	        this.document.isSearchable = isSearchable;
	    }
	});

	exports.default = true;

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _CB = __webpack_require__(1);

	var _CB2 = _interopRequireDefault(_CB);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/*
	  CloudTable
	 */

	_CB2.default.CloudTable = function (tableName) {
	    //new table constructor

	    _CB2.default._tableValidation(tableName);
	    this.document = {};
	    this.document.name = tableName;
	    this.document.appId = _CB2.default.appId;
	    this.document._type = 'table';

	    if (tableName.toLowerCase() === "user") {
	        this.document.type = "user";
	        this.document.maxCount = 1;
	    } else if (tableName.toLowerCase() === "role") {
	        this.document.type = "role";
	        this.document.maxCount = 1;
	    } else if (tableName.toLowerCase() === "device") {
	        this.document.type = "device";
	        this.document.maxCount = 1;
	    } else {
	        this.document.type = "custom";
	        this.document.maxCount = 9999;
	    }
	    this.document.columns = _CB2.default._defaultColumns(this.document.type);
	};

	Object.defineProperty(_CB2.default.CloudTable.prototype, 'columns', {
	    get: function get() {
	        return this.document.columns;
	    }
	});

	Object.defineProperty(_CB2.default.CloudTable.prototype, 'name', {
	    get: function get() {
	        return this.document.name;
	    },
	    set: function set() {
	        throw "You can not rename a table";
	    }
	});

	Object.defineProperty(_CB2.default.CloudTable.prototype, 'id', {
	    get: function get() {
	        return this.document._id;
	    }
	});

	_CB2.default.CloudTable.prototype.addColumn = function (column) {
	    if (Object.prototype.toString.call(column) === '[object String]') {
	        var obj = new _CB2.default.Column(column);
	        column = obj;
	    }
	    if (Object.prototype.toString.call(column) === '[object Object]') {
	        if (_CB2.default._columnValidation(column, this)) this.document.columns.push(column);
	    } else if (Object.prototype.toString.call(column) === '[object Array]') {
	        for (var i = 0; i < column.length; i++) {
	            if (_CB2.default._columnValidation(column[i], this)) this.document.columns.push(column[i]);
	        }
	    }
	};

	_CB2.default.CloudTable.prototype.getColumn = function (columnName) {
	    if (Object.prototype.toString.call(columnName) !== '[object String]') {
	        throw "Should enter a columnName";
	    }
	    var columns = this.document.columns;
	    for (var i = 0; i < columns.length; i++) {
	        if (columns[i].name === columnName) return columns[i];
	    }
	    throw "Column Does Not Exists";
	};

	_CB2.default.CloudTable.prototype.updateColumn = function (column) {
	    if (Object.prototype.toString.call(column) === '[object Object]') {
	        if (_CB2.default._columnValidation(column, this)) {
	            var columns = this.document.columns;
	            for (var i = 0; i < columns.length; i++) {
	                if (columns[i].name === column.name) {
	                    columns[i] = column;
	                    this.document.columns = columns;
	                    break;
	                }
	            }
	        } else {
	            throw "Invalid Column";
	        }
	    } else {
	        throw "Invalid Column";
	    }
	};

	_CB2.default.CloudTable.prototype.deleteColumn = function (column) {
	    if (Object.prototype.toString.call(column) === '[object String]') {
	        var obj = new _CB2.default.Column(column);
	        column = obj;
	    }
	    if (Object.prototype.toString.call(column) === '[object Object]') {
	        if (_CB2.default._columnValidation(column, this)) {
	            var arr = [];
	            for (var i = 0; i < this.columns.length; i++) {
	                if (this.columns[i].name !== column.name) arr.push(this.columns[i]);
	            }
	            this.document.columns = arr;
	        }
	    } else if (Object.prototype.toString.call(column) === '[object Array]') {
	        var arr = [];
	        for (var i = 0; i < column.length; i++) {
	            if (_CB2.default._columnValidation(column[i], this)) {
	                for (var i = 0; i < this.columns.length; i++) {
	                    if (this.columns[i].name !== column[i].name) arr.push(this.columns[i]);
	                }
	                this.document.columns = arr;
	            }
	        }
	    }
	};

	/**
	 * Gets All the Tables from an App
	 *
	 * @param callback
	 * @returns {*}
	 */

	_CB2.default.CloudTable.getAll = function (callback) {
	    if (!_CB2.default.appId) {
	        throw "CB.appId is null.";
	    }

	    var def;
	    if (!callback) {
	        def = new _CB2.default.Promise();
	    }

	    var params = JSON.stringify({
	        key: _CB2.default.appKey
	    });

	    var url = _CB2.default.apiUrl + '/app/' + _CB2.default.appId + "/_getAll";
	    _CB2.default._request('POST', url, params, true).then(function (response) {
	        response = JSON.parse(response);
	        var obj = _CB2.default.fromJSON(response);
	        if (callback) {
	            callback.success(obj);
	        } else {
	            def.resolve(obj);
	        }
	    }, function (err) {
	        if (callback) {
	            callback.error(err);
	        } else {
	            def.reject(err);
	        }
	    });
	    if (!callback) {
	        return def;
	    }
	};

	/**
	 * Gets a table
	 *
	 * @param table
	 *  It is the CloudTable object
	 * @param callback
	 * @returns {*}
	 */

	_CB2.default.CloudTable.get = function (table, callback) {
	    if (Object.prototype.toString.call(table) === '[object String]') {
	        var obj = new _CB2.default.CloudTable(table);
	        table = obj;
	    }
	    if (Object.prototype.toString.call(table) === '[object Object]') {
	        {
	            if (!_CB2.default.appId) {
	                throw "CB.appId is null.";
	            }

	            var def;
	            if (!callback) {
	                def = new _CB2.default.Promise();
	            }

	            var params = JSON.stringify({
	                key: _CB2.default.appKey,
	                appId: _CB2.default.appId
	            });

	            var url = _CB2.default.apiUrl + '/app/' + _CB2.default.appId + "/" + table.document.name;
	            _CB2.default._request('POST', url, params, true).then(function (response) {
	                if (response === "null" || response === "") {
	                    obj = null;
	                } else {
	                    response = JSON.parse(response);
	                    var obj = _CB2.default.fromJSON(response);
	                }
	                if (callback) {
	                    callback.success(obj);
	                } else {
	                    def.resolve(obj);
	                }
	            }, function (err) {
	                if (callback) {
	                    callback.error(err);
	                } else {
	                    def.reject(err);
	                }
	            });
	            if (!callback) {
	                return def;
	            }
	        }
	    } else if (Object.prototype.toString.call(table) === '[object Array]') {
	        throw "cannot fetch array of tables";
	    }
	};

	/**
	 * Deletes a table from database.
	 *
	 * @param table
	 * @param callback
	 * @returns {*}
	 */

	_CB2.default.CloudTable.prototype.delete = function (callback) {
	    _CB2.default._validate();

	    var def;
	    if (!callback) {
	        def = new _CB2.default.Promise();
	    }

	    var params = JSON.stringify({
	        key: _CB2.default.appKey,
	        name: this.name,
	        method: "DELETE"
	    });

	    var thisObj = this;

	    var url = _CB2.default.apiUrl + '/app/' + _CB2.default.appId + "/" + this.name;

	    _CB2.default._request('PUT', url, params, true).then(function (response) {
	        if (callback) {
	            callback.success(thisObj);
	        } else {
	            def.resolve(thisObj);
	        }
	    }, function (err) {
	        if (callback) {
	            callback.error(err);
	        } else {
	            def.reject(err);
	        }
	    });

	    if (!callback) {
	        return def;
	    }
	};

	/**
	 * Saves a table
	 *
	 * @param callback
	 * @returns {*}
	 */

	_CB2.default.CloudTable.prototype.save = function (callback) {
	    var def;
	    if (!callback) {
	        def = new _CB2.default.Promise();
	    }
	    _CB2.default._validate();
	    var thisObj = this;
	    var params = JSON.stringify({
	        key: _CB2.default.appKey,
	        data: _CB2.default.toJSON(thisObj)
	    });

	    var thisObj = this;

	    var url = _CB2.default.apiUrl + '/app/' + _CB2.default.appId + "/" + thisObj.document.name;

	    _CB2.default._request('PUT', url, params, true).then(function (response) {
	        response = JSON.parse(response);
	        thisObj = _CB2.default.fromJSON(response);
	        if (callback) {
	            callback.success(thisObj);
	        } else {
	            def.resolve(thisObj);
	        }
	    }, function (err) {
	        if (callback) {
	            callback.error(err);
	        } else {
	            def.reject(err);
	        }
	    });

	    if (!callback) {
	        return def;
	    }
	};

	exports.default = true;

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _CB = __webpack_require__(1);

	var _CB2 = _interopRequireDefault(_CB);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	_CB2.default.ACL = function () {
	    //constructor for ACL class
	    this.document = {};
	    this.document['read'] = { "allow": { "user": ['all'], "role": [] }, "deny": { "user": [], "role": [] } }; //by default allow read access to "all"
	    this.document['write'] = { "allow": { "user": ['all'], "role": [] }, "deny": { "user": [], "role": [] } }; //by default allow write access to "all"
	    this.parent = null;
	};
	_CB2.default.ACL.prototype.setPublicWriteAccess = function (value) {
	    //for setting the public write access
	    if (value) {
	        //If asked to allow public write access
	        this.document['write']['allow']['user'] = ['all'];
	    } else {
	        var index = this.document['write']['allow']['user'].indexOf('all');
	        if (index > -1) {
	            this.document['write']['allow']['user'].splice(index, 1); //remove the "all" value from the "write" array of "this" object
	        }
	    }

	    if (this.parent) {
	        _CB2.default._modified(this.parent, 'ACL');
	    }
	};
	_CB2.default.ACL.prototype.setPublicReadAccess = function (value) {
	    //for setting the public read access

	    if (value) {
	        //If asked to allow public read access
	        this.document['read']['allow']['user'] = ['all'];
	    } else {
	        var index = this.document['read']['allow']['user'].indexOf('all');
	        if (index > -1) {
	            this.document['read']['allow']['user'].splice(index, 1); //remove the "all" value from the "read" array of "this" object
	        }
	    }

	    if (this.parent) {
	        _CB2.default._modified(this.parent, 'ACL');
	    }
	};
	_CB2.default.ACL.prototype.setUserWriteAccess = function (userId, value) {
	    //for setting the user write access

	    if (value) {
	        //If asked to allow user write access
	        //remove public write access.
	        var index = this.document['write']['allow']['user'].indexOf('all');
	        if (index > -1) {
	            this.document['write']['allow']['user'].splice(index, 1);
	        }
	        if (this.document['write']['allow']['user'].indexOf(userId) === -1) {
	            this.document['write']['allow']['user'].push(userId);
	        }
	    } else {
	        var index = this.document['write']['allow']['user'].indexOf(userId);
	        if (index > -1) {
	            this.document['write']['allow']['user'].splice(index, 1); //remove the "userId" value from the "write" array of "this" object
	        }
	        this.document['write']['deny']['user'].push(userId);
	    }

	    if (this.parent) {
	        _CB2.default._modified(this.parent, 'ACL');
	    }
	};
	_CB2.default.ACL.prototype.setUserReadAccess = function (userId, value) {
	    //for setting the user read access

	    if (value) {
	        //If asked to allow user read access
	        //remove public write access.
	        var index = this.document['read']['allow']['user'].indexOf('all');
	        if (index > -1) {
	            this.document['read']['allow']['user'].splice(index, 1);
	        }
	        if (this.document['read']['allow']['user'].indexOf(userId) === -1) {
	            this.document['read']['allow']['user'].push(userId);
	        }
	    } else {
	        var index = this.document['read']['allow']['user'].indexOf(userId);
	        if (index > -1) {
	            this.document['read']['allow']['user'].splice(index, 1); //remove the "userId" value from the "read" array of "this" object
	        }
	        this.document['read']['deny']['user'].push(userId);
	    }

	    if (this.parent) {
	        _CB2.default._modified(this.parent, 'ACL');
	    }
	};
	_CB2.default.ACL.prototype.setRoleWriteAccess = function (roleId, value) {

	    if (value) {
	        //remove public write access.
	        var index = this.document['write']['allow']['user'].indexOf('all');
	        if (index > -1) {
	            this.document['write']['allow']['user'].splice(index, 1);
	        }
	        if (this.document['write']['allow']['role'].indexOf(roleId) === -1) {
	            this.document['write']['allow']['role'].push(roleId);
	        }
	    } else {
	        var index = this.document['write']['allow']['role'].indexOf(roleId);
	        if (index > -1) {
	            this.document['write']['allow']['role'].splice(index, 1);
	        }
	        var index = this.document['write']['allow']['user'].indexOf('all');
	        if (index > -1) {
	            this.document['write']['allow']['user'].splice(index, 1);
	        }

	        this.document['write']['deny']['role'].push(roleId);
	    }

	    if (this.parent) {
	        _CB2.default._modified(this.parent, 'ACL');
	    }
	};
	_CB2.default.ACL.prototype.setRoleReadAccess = function (roleId, value) {

	    if (value) {
	        //remove public write access.
	        var index = this.document['read']['allow']['user'].indexOf('all');
	        if (index > -1) {
	            this.document['read']['allow']['user'].splice(index, 1);
	        }
	        if (this.document['read']['allow']['role'].indexOf(roleId) === -1) {
	            this.document['read']['allow']['role'].push(roleId);
	        }
	    } else {
	        var index = this.document['read']['allow']['role'].indexOf(roleId);
	        if (index > -1) {
	            this.document['read']['allow']['role'].splice(index, 1);
	        }
	        var index = this.document['read']['allow']['user'].indexOf('all');
	        if (index > -1) {
	            this.document['read']['allow']['user'].splice(index, 1);
	        }
	        this.document['read']['deny']['role'].push(roleId);
	    }

	    if (this.parent) {
	        _CB2.default._modified(this.parent, 'ACL');
	    }
	};

	exports.default = true;

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _CB = __webpack_require__(1);

	var _CB2 = _interopRequireDefault(_CB);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/*
	 *CloudGeoPoint
	 */

	_CB2.default.CloudGeoPoint = _CB2.default.CloudGeoPoint || function (longitude, latitude) {
	    if (!latitude && latitude !== 0 || !longitude && longitude !== 0) throw "Latitude or Longitude is empty.";

	    if (isNaN(latitude)) throw "Latitude " + latitude + " is not a number type.";

	    if (isNaN(longitude)) throw "Longitude " + longitude + " is not a number type.";

	    this.document = {};
	    this.document._type = "point";
	    this.document._isModified = true;
	    //The default datum for an earth-like sphere is WGS84. Coordinate-axis order is longitude, latitude.
	    if (Number(latitude) >= -90 && Number(latitude) <= 90 && Number(longitude) >= -180 && Number(longitude) <= 180) {
	        this.document.coordinates = [Number(longitude), Number(latitude)];
	        this.document.latitude = Number(latitude);
	        this.document.longitude = Number(longitude);
	    } else {
	        throw "latitude and longitudes are not in range";
	    }
	};

	Object.defineProperty(_CB2.default.CloudGeoPoint.prototype, 'latitude', {
	    get: function get() {
	        return this.document.coordinates[1];
	    },
	    set: function set(latitude) {
	        if (Number(latitude) >= -90 && Number(latitude) <= 90) {
	            this.document.latitude = Number(latitude);
	            this.document.coordinates[1] = Number(latitude);
	            this.document._isModified = true;
	        } else throw "Latitude is not in Range";
	    }
	});

	Object.defineProperty(_CB2.default.CloudGeoPoint.prototype, 'longitude', {
	    get: function get() {
	        return this.document.coordinates[0];
	    },
	    set: function set(longitude) {
	        if (Number(longitude) >= -180 && Number(longitude) <= 180) {
	            this.document.longitude = Number(longitude);
	            this.document.coordinates[0] = Number(longitude);
	            this.document._isModified = true;
	        } else throw "Longitude is not in Range";
	    }
	});

	_CB2.default.CloudGeoPoint.prototype.get = function (name) {
	    //for getting data of a particular column

	    return this.document[name];
	};

	_CB2.default.CloudGeoPoint.prototype.set = function (name, value) {
	    //for getting data of a particular column

	    if (name === 'latitude') {
	        if (Number(value) >= -90 && Number(value) <= 90) {
	            this.document.latitude = Number(value);
	            this.document.coordinates[1] = Number(value);
	            this.document._isModified = true;
	        } else throw "Latitude is not in Range";
	    } else {
	        if (Number(value) >= -180 && Number(value) <= 180) {
	            this.document.longitude = Number(value);
	            this.document.coordinates[0] = Number(value);
	            this.document._isModified = true;
	        } else throw "Latitude is not in Range";
	    }
	};
	_CB2.default.CloudGeoPoint.prototype.distanceInKMs = function (point) {

	    var earthRedius = 6371; //in Kilometer
	    return earthRedius * greatCircleFormula(this, point);
	};

	_CB2.default.CloudGeoPoint.prototype.distanceInMiles = function (point) {

	    var earthRedius = 3959; // in Miles
	    return earthRedius * greatCircleFormula(this, point);
	};

	_CB2.default.CloudGeoPoint.prototype.distanceInRadians = function (point) {

	    return greatCircleFormula(this, point);
	};

	function greatCircleFormula(thisObj, point) {

	    var dLat = (thisObj.document.coordinates[1] - point.document.coordinates[1]).toRad();
	    var dLon = (thisObj.document.coordinates[0] - point.document.coordinates[0]).toRad();
	    var lat1 = point.document.coordinates[1].toRad();
	    var lat2 = thisObj.document.coordinates[1].toRad();
	    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
	    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	    return c;
	}

	if (typeof Number.prototype.toRad === "undefined") {
	    Number.prototype.toRad = function () {
	        return this * Math.PI / 180;
	    };
	}

	exports.default = true;

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _CB = __webpack_require__(1);

	var _CB2 = _interopRequireDefault(_CB);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/*
	 CloudObject
	 */

	_CB2.default.CloudObject = function (tableName, id) {
	    //object for documents

	    this.document = {};
	    this.document._tableName = tableName; //the document object
	    this.document.ACL = new _CB2.default.ACL(); //ACL(s) of the document
	    this.document._type = 'custom';
	    this.document.expires = null;
	    this.document._hash = _CB2.default._generateHash();

	    if (!id) {
	        this.document._modifiedColumns = ['createdAt', 'updatedAt', 'ACL', 'expires'];
	        this.document._isModified = true;
	    } else {
	        this.document._modifiedColumns = [];
	        this.document._isModified = false;
	        this.document._id = id;
	    }
	};

	Object.defineProperty(_CB2.default.CloudObject.prototype, 'ACL', {
	    get: function get() {
	        return this.document.ACL;
	    },
	    set: function set(ACL) {
	        this.document.ACL = ACL;
	        this.document.ACL.parent = this;
	        _CB2.default._modified(this, 'ACL');
	    }
	});

	Object.defineProperty(_CB2.default.CloudObject.prototype, 'id', {
	    get: function get() {
	        return this.document._id;
	    }
	});

	Object.defineProperty(_CB2.default.CloudObject.prototype, 'createdAt', {
	    get: function get() {
	        return this.document.createdAt;
	    },
	    set: function set(createdAt) {
	        this.document.createdAt = createdAt;
	        _CB2.default._modified(this, 'createdAt');
	    }
	});

	Object.defineProperty(_CB2.default.CloudObject.prototype, 'updatedAt', {
	    get: function get() {
	        return this.document.updatedAt;
	    },
	    set: function set(updatedAt) {
	        this.document.updatedAt = updatedAt;
	        _CB2.default._modified(this, 'updatedAt');
	    }
	});

	/* For Expire of objects */
	Object.defineProperty(_CB2.default.CloudObject.prototype, 'expires', {
	    get: function get() {
	        return this.document.expires;
	    },
	    set: function set(expires) {
	        this.document.expires = expires;
	        _CB2.default._modified(this, 'expires');
	    }
	});

	/* This is Real time implementation of CloudObjects */
	_CB2.default.CloudObject.on = function (tableName, eventType, cloudQuery, callback, done) {

	    if (_CB2.default._isRealtimeDisabled) {
	        throw "Realtime is disbaled for this app.";
	    }

	    var def;

	    //shift variables.
	    if (cloudQuery && !(cloudQuery instanceof _CB2.default.CloudQuery)) {
	        //this is a function.
	        if (callback !== null && (typeof callback === 'undefined' ? 'undefined' : _typeof(callback)) === 'object') {
	            //callback is actually done.
	            done = callback;
	            callback = null;
	        }
	        callback = cloudQuery;
	        cloudQuery = null;
	    }

	    if (!done) {
	        def = new _CB2.default.Promise();
	    }

	    //validate query.
	    if (cloudQuery && cloudQuery instanceof _CB2.default.CloudQuery) {

	        if (cloudQuery.tableName !== tableName) {
	            throw "CloudQuery TableName and CloudNotification TableName should be same.";
	        }

	        if (cloudQuery.query) {
	            if (cloudQuery.query.$include.length > 0) {
	                throw "Include with CloudNotificaitons is not supported right now.";
	            }
	        }

	        if (Object.keys(cloudQuery.select).length > 0) {
	            throw "You cannot pass the query with select in CloudNotifications.";
	        }
	    }

	    tableName = tableName.toLowerCase();

	    if (eventType instanceof Array) {
	        //if event type is an array.
	        for (var i = 0; i < eventType.length; i++) {
	            _CB2.default.CloudObject.on(tableName, eventType[i], cloudQuery, callback);
	            if (done && done.success) done.success();else def.resolve();
	        }
	    } else {
	        eventType = eventType.toLowerCase();
	        if (eventType === 'created' || eventType === 'updated' || eventType === 'deleted') {

	            var payload = {
	                room: (_CB2.default.appId + 'table' + tableName + eventType).toLowerCase(),
	                sessionId: _CB2.default._getSessionId()
	            };

	            _CB2.default.Socket.emit('join-object-channel', payload);
	            _CB2.default.Socket.on((_CB2.default.appId + 'table' + tableName + eventType).toLowerCase(), function (data) {
	                //listen to events in custom channel.
	                data = _CB2.default.fromJSON(data);
	                if (cloudQuery && cloudQuery instanceof _CB2.default.CloudQuery && _CB2.default.CloudObject._validateNotificationQuery(data, cloudQuery)) callback(data);else if (!cloudQuery) callback(data);
	            });

	            if (done && done.success) done.success();else def.resolve();
	        } else {
	            throw 'created, updated, deleted are supported notification types.';
	        }
	    }

	    if (!done) {
	        return def;
	    }
	};

	_CB2.default.CloudObject.off = function (tableName, eventType, done) {

	    if (_CB2.default._isRealtimeDisabled) {
	        throw "Realtime is disbaled for this app.";
	    }

	    var def;

	    if (!done) {
	        def = new _CB2.default.Promise();
	    }

	    tableName = tableName.toLowerCase();

	    if (eventType instanceof Array) {
	        //if event type is an array.
	        for (var i = 0; i < eventType.length; i++) {
	            _CB2.default.CloudObject.off(tableName, eventType[i]);
	            if (done && done.success) done.success();else def.resolve();
	        }
	    } else {

	        eventType = eventType.toLowerCase();

	        if (eventType === 'created' || eventType === 'updated' || eventType === 'deleted') {
	            _CB2.default.Socket.emit('leave-object-channel', (_CB2.default.appId + 'table' + tableName + eventType).toLowerCase());
	            _CB2.default.Socket.removeAllListeners((_CB2.default.appId + 'table' + tableName + eventType).toLowerCase());
	            if (done && done.success) done.success();else def.resolve();
	        } else {
	            throw 'created, updated, deleted are supported notification types.';
	        }
	    }

	    if (!done) {
	        return def;
	    }
	};

	/* RealTime implementation ends here.  */

	_CB2.default.CloudObject.prototype.set = function (columnName, data) {
	    //for setting data for a particular column

	    var keywords = ['_tableName', '_type', 'operator'];

	    if (columnName === 'id' || columnName === '_id') throw "You cannot set the id of a CloudObject";

	    if (columnName === 'id') columnName = '_' + columnName;

	    if (keywords.indexOf(columnName) > -1) {
	        throw columnName + " is a keyword. Please choose a different column name.";
	    }
	    this.document[columnName] = data;
	    _CB2.default._modified(this, columnName);
	};

	_CB2.default.CloudObject.prototype.relate = function (columnName, objectTableName, objectId) {
	    //for setting data for a particular column

	    var keywords = ['_tableName', '_type', 'operator'];

	    if (columnName === 'id' || columnName === '_id') throw "You cannot set the id of a CloudObject";

	    if (columnName === 'id') throw "You cannot link an object to this column";

	    if (keywords.indexOf(columnName) > -1) {
	        throw columnName + " is a keyword. Please choose a different column name.";
	    }

	    this.document[columnName] = new _CB2.default.CloudObject(objectTableName, objectId);
	    _CB2.default._modified(this, columnName);
	};

	_CB2.default.CloudObject.prototype.get = function (columnName) {
	    //for getting data of a particular column

	    if (columnName === 'id') columnName = '_' + columnName;

	    return this.document[columnName];
	};

	_CB2.default.CloudObject.prototype.unset = function (columnName) {
	    //to unset the data of the column
	    this.document[columnName] = null;
	    _CB2.default._modified(this, columnName);
	};

	/**
	 * Saved CloudObject in Database.
	 * @param callback
	 * @returns {*}
	 */

	_CB2.default.CloudObject.prototype.save = function (callback) {
	    //save the document to the db
	    var def;
	    _CB2.default._validate();

	    if (!callback) {
	        def = new _CB2.default.Promise();
	    }
	    var thisObj = this;
	    _CB2.default._fileCheck(this).then(function (thisObj) {

	        var xmlhttp = _CB2.default._loadXml();
	        var params = JSON.stringify({
	            document: _CB2.default.toJSON(thisObj),
	            key: _CB2.default.appKey
	        });
	        var url = _CB2.default.apiUrl + "/data/" + _CB2.default.appId + '/' + thisObj.document._tableName;
	        _CB2.default._request('PUT', url, params).then(function (response) {
	            thisObj = _CB2.default.fromJSON(JSON.parse(response), thisObj);
	            if (callback) {
	                callback.success(thisObj);
	            } else {
	                def.resolve(thisObj);
	            }
	        }, function (err) {
	            if (callback) {
	                callback.error(err);
	            } else {
	                def.reject(err);
	            }
	        });
	    }, function (err) {
	        if (callback) {
	            callback.error(err);
	        } else {
	            def.reject(err);
	        }
	    });
	    if (!callback) {
	        return def;
	    }
	};

	_CB2.default.CloudObject.prototype.fetch = function (callback) {
	    //fetch the document from the db
	    if (!_CB2.default.appId) {
	        throw "CB.appId is null.";
	    }
	    if (!this.document._id) {
	        throw "Can't fetch an object which is not saved.";
	    }
	    var thisObj = this;
	    var def;
	    if (!callback) {
	        def = new _CB2.default.Promise();
	    }
	    var query = null;
	    if (thisObj.document._type === 'file') {
	        query = new _CB2.default.CloudQuery('_File');
	    } else {
	        query = new _CB2.default.CloudQuery(thisObj.document._tableName);
	    }
	    query.findById(thisObj.get('id')).then(function (res) {
	        if (!callback) {
	            def.resolve(res);
	        } else {
	            callback.success(res);
	        }
	    }, function (err) {
	        if (!callback) {
	            def.reject(err);
	        } else {
	            callback.error(err);
	        }
	    });

	    if (!callback) {
	        return def;
	    }
	};

	_CB2.default.CloudObject.prototype.delete = function (callback) {
	    //delete an object matching the objectId
	    if (!_CB2.default.appId) {
	        throw "CB.appId is null.";
	    }
	    if (!this.document._id) {
	        throw "You cannot delete an object which is not saved.";
	    }
	    var thisObj = this;
	    var def;
	    if (!callback) {
	        def = new _CB2.default.Promise();
	    }

	    var params = JSON.stringify({
	        key: _CB2.default.appKey,
	        document: _CB2.default.toJSON(thisObj),
	        method: "DELETE"
	    });

	    var url = _CB2.default.apiUrl + "/data/" + _CB2.default.appId + '/' + thisObj.document._tableName;

	    _CB2.default._request('PUT', url, params).then(function (response) {
	        thisObj = _CB2.default.fromJSON(JSON.parse(response), thisObj);
	        if (callback) {
	            callback.success(thisObj);
	        } else {
	            def.resolve(thisObj);
	        }
	    }, function (err) {
	        if (callback) {
	            callback.error(err);
	        } else {
	            def.reject(err);
	        }
	    });

	    if (!callback) {
	        return def;
	    }
	};

	_CB2.default.CloudObject.saveAll = function (array, callback) {

	    if (!array || array.constructor !== Array) {
	        throw "Array of CloudObjects is Null";
	    }

	    for (var i = 0; i < array.length; i++) {
	        if (!(array[i] instanceof _CB2.default.CloudObject)) {
	            throw "Should Be an Array of CloudObjects";
	        }
	    }

	    var def;
	    if (!callback) {
	        def = new _CB2.default.Promise();
	    }

	    _CB2.default._bulkObjFileCheck(array).then(function () {
	        var xmlhttp = _CB2.default._loadXml();
	        var params = JSON.stringify({
	            document: _CB2.default.toJSON(array),
	            key: _CB2.default.appKey
	        });
	        var url = _CB2.default.apiUrl + "/data/" + _CB2.default.appId + '/' + array[0]._tableName;
	        _CB2.default._request('PUT', url, params).then(function (response) {
	            var thisObj = _CB2.default.fromJSON(JSON.parse(response));
	            if (callback) {
	                callback.success(thisObj);
	            } else {
	                def.resolve(thisObj);
	            }
	        }, function (err) {
	            if (callback) {
	                callback.error(err);
	            } else {
	                def.reject(err);
	            }
	        });
	    }, function (err) {
	        if (callback) {
	            callback.error(err);
	        } else {
	            def.reject(err);
	        }
	    });

	    if (!callback) {
	        return def;
	    }
	};

	_CB2.default.CloudObject.deleteAll = function (array, callback) {

	    if (!array && array.constructor !== Array) {
	        throw "Array of CloudObjects is Null";
	    }

	    for (var i = 0; i < array.length; i++) {
	        if (!(array[i] instanceof _CB2.default.CloudObject)) {
	            throw "Should Be an Array of CloudObjects";
	        }
	    }

	    var def;
	    if (!callback) {
	        def = new _CB2.default.Promise();
	    }

	    var xmlhttp = _CB2.default._loadXml();
	    var params = JSON.stringify({
	        document: _CB2.default.toJSON(array),
	        key: _CB2.default.appKey,
	        method: "DELETE"
	    });
	    var url = _CB2.default.apiUrl + "/data/" + _CB2.default.appId + '/' + array[0]._tableName;
	    _CB2.default._request('PUT', url, params).then(function (response) {
	        var thisObj = _CB2.default.fromJSON(JSON.parse(response));
	        if (callback) {
	            callback.success(thisObj);
	        } else {
	            def.resolve(thisObj);
	        }
	    }, function (err) {
	        if (callback) {
	            callback.error(err);
	        } else {
	            def.reject(err);
	        }
	    });

	    if (!callback) {
	        return def;
	    }
	};

	/* Private Methods */
	_CB2.default.CloudObject._validateNotificationQuery = function (cloudObject, cloudQuery) {
	    //delete an object matching the objectId

	    if (!cloudQuery) throw "CloudQuery is null";

	    if (!cloudQuery.query) throw "There is no query in CloudQuery";

	    //validate query.
	    var query = cloudQuery.query;

	    if (cloudQuery.limit === 0) return false;

	    if (cloudQuery.skip > 0) {
	        --cloudQuery.skip;
	        return false;
	    }

	    //delete include
	    delete query.$include;

	    if (_CB2.default.CloudQuery._validateQuery(cloudObject, query)) {
	        //redice limit of CloudQuery.
	        --cloudQuery.limit;
	        return true;
	    } else {
	        return false;
	    }
	};

	exports.default = true;

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _CB = __webpack_require__(1);

	var _CB2 = _interopRequireDefault(_CB);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/*
	 CloudFiles
	 */

	_CB2.default.CloudFile = _CB2.default.CloudFile || function (file, data, type) {

	    if (Object.prototype.toString.call(file) === '[object File]' || Object.prototype.toString.call(file) === '[object Blob]') {

	        this.fileObj = file;
	        this.document = {
	            _id: null,
	            _type: 'file',
	            ACL: new _CB2.default.ACL(),
	            name: file && file.name && file.name !== "" ? file.name : 'unknown',
	            size: file.size,
	            url: null,
	            expires: null,
	            contentType: typeof file.type !== "undefined" && file.type !== "" ? file.type : 'unknown'
	        };
	    } else if (typeof file === "string") {
	        var regexp = RegExp("https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,}");
	        if (regexp.test(file)) {
	            this.document = {
	                _id: null,
	                _type: 'file',
	                ACL: new _CB2.default.ACL(),
	                name: '',
	                size: '',
	                url: file,
	                expires: null,
	                contentType: ''
	            };
	        } else {
	            if (data) {
	                this.data = data;
	                if (!type) {
	                    type = file.split('.')[file.split('.').length - 1];
	                }
	                this.document = {
	                    _id: null,
	                    _type: 'file',
	                    ACL: new _CB2.default.ACL(),
	                    name: file,
	                    size: '',
	                    url: null,
	                    expires: null,
	                    contentType: type
	                };
	            } else {
	                this.document = {
	                    _id: file,
	                    _type: 'file'
	                };
	            }
	        }
	    }
	};

	_CB2.default.CloudFile.prototype = Object.create(_CB2.default.CloudObject.prototype);

	Object.defineProperty(_CB2.default.CloudFile.prototype, 'type', {
	    get: function get() {
	        return this.document.contentType;
	    },
	    set: function set(type) {
	        this.document.contentType = type;
	    }
	});

	Object.defineProperty(_CB2.default.CloudFile.prototype, 'url', {
	    get: function get() {
	        return this.document.url;
	    },
	    set: function set(url) {
	        this.document.url = url;
	    }
	});

	Object.defineProperty(_CB2.default.CloudFile.prototype, 'size', {
	    get: function get() {
	        return this.document.size;
	    },
	    set: function set(size) {
	        this.document.size = size;
	    }
	});

	Object.defineProperty(_CB2.default.CloudFile.prototype, 'name', {
	    get: function get() {
	        return this.document.name;
	    },
	    set: function set(name) {
	        this.document.name = name;
	    }
	});

	/**
	 * Uploads File
	 *
	 * @param callback
	 * @returns {*}
	 */

	_CB2.default.CloudFile.prototype.save = function (callback) {

	    var def;

	    if (!callback) {
	        def = new _CB2.default.Promise();
	    }

	    var thisObj = this;

	    if (!this.fileObj && !this.data) throw "You cannot save a file which is null";

	    if (!this.data) {
	        var params = new FormData();
	        params.append("fileToUpload", this.fileObj);
	        params.append("key", _CB2.default.appKey);
	        params.append("fileObj", JSON.stringify(_CB2.default.toJSON(thisObj)));
	        var url = _CB2.default.apiUrl + '/file/' + _CB2.default.appId;

	        var uploadProgressCallback = null;

	        if (callback && callback.uploadProgress) {
	            uploadProgressCallback = callback.uploadProgress;
	        }

	        _CB2.default._request('POST', url, params, false, true, uploadProgressCallback).then(function (response) {
	            thisObj.document = JSON.parse(response);
	            if (callback) {
	                callback.success(thisObj);
	            } else {
	                def.resolve(thisObj);
	            }
	        }, function (err) {
	            if (callback) {
	                callback.error(err);
	            } else {
	                def.reject(err);
	            }
	        });
	    } else {
	        var data = this.data;
	        var params = JSON.stringify({
	            data: data,
	            fileObj: _CB2.default.toJSON(this),
	            key: _CB2.default.appKey
	        });
	        var url = _CB2.default.apiUrl + '/file/' + _CB2.default.appId;
	        var uploadProgressCallback = null;

	        if (callback && callback.uploadProgress) {
	            uploadProgressCallback = callback.uploadProgress;
	        }

	        _CB2.default._request('POST', url, params, null, null, uploadProgressCallback).then(function (response) {
	            thisObj.document = JSON.parse(response);
	            delete thisObj.data;
	            if (callback) {
	                callback.success(thisObj);
	            } else {
	                def.resolve(thisObj);
	            }
	        }, function (err) {
	            if (callback) {
	                callback.error(err);
	            } else {
	                def.reject(err);
	            }
	        });
	    }

	    if (!callback) {
	        return def;
	    }
	};

	/**
	 * Removes a file from Database.
	 *
	 * @param callback
	 * @returns {*}
	 */

	_CB2.default.CloudFile.prototype.delete = function (callback) {
	    var def;

	    if (!this.url) {
	        throw "You cannot delete a file which does not have an URL";
	    }
	    if (!callback) {
	        def = new _CB2.default.Promise();
	    }
	    var thisObj = this;

	    var params = JSON.stringify({
	        fileObj: _CB2.default.toJSON(thisObj),
	        key: _CB2.default.appKey,
	        method: "PUT"
	    });
	    var url = _CB2.default.apiUrl + '/file/' + _CB2.default.appId + '/' + this.document._id;

	    _CB2.default._request('PUT', url, params).then(function (response) {
	        thisObj.url = null;
	        if (callback) {
	            callback.success(thisObj);
	        } else {
	            def.resolve(thisObj);
	        }
	    }, function (err) {
	        if (callback) {
	            callback.error(err);
	        } else {
	            def.reject(err);
	        }
	    });

	    if (!callback) {
	        return def;
	    }
	};

	_CB2.default.CloudFile.prototype.getFileContent = function (callback) {

	    var def;

	    if (!this.url) {
	        throw "URL is null. Fetch this file object first using fetch()";
	    }
	    if (!callback) {
	        def = new _CB2.default.Promise();
	    }

	    var params = JSON.stringify({
	        key: _CB2.default.appKey
	    });
	    var url = this.url;

	    _CB2.default._request('GET', url, params).then(function (response) {
	        if (callback) {
	            callback.success(response);
	        } else {
	            def.resolve(response);
	        }
	    }, function (err) {
	        if (callback) {
	            callback.error(err);
	        } else {
	            def.reject(err);
	        }
	    });

	    if (!callback) {
	        return def;
	    }
	};

	exports.default = true;

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _CB = __webpack_require__(1);

	var _CB2 = _interopRequireDefault(_CB);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/*
	CloudQueue
	 */

	_CB2.default.CloudQueue = function (queueName, queueType) {

	    if (typeof queueName === 'undefined' || queueName == null) {
	        throw "Cannot create a queue with empty name";
	    }

	    this.document = {};
	    this.document.ACL = new _CB2.default.ACL(); //ACL(s) of the document
	    this.document._type = 'queue';
	    this.document.expires = null;
	    this.document.name = queueName;
	    this.document.retry = null;
	    this.document.subscribers = [];
	    this.document.messages = [];

	    if (queueType && queueType !== "push" && queueType !== "pull") {
	        throw "Type can be push or pull";
	    }
	    if (queueType) {
	        this.document.queueType = queueType;
	    } else {
	        this.document.queueType = "pull";
	    }
	};

	Object.defineProperty(_CB2.default.CloudQueue.prototype, 'retry', {
	    get: function get() {
	        return this.document.retry;
	    },
	    set: function set(retry) {

	        if (this.queueType !== "push") {
	            throw "Queue Type should be push to set this property";
	        }

	        this.document.retry = retry;
	        _CB2.default._modified(this, 'retry');
	    }
	});

	Object.defineProperty(_CB2.default.CloudQueue.prototype, 'size', {
	    get: function get() {
	        if (this.document.size) return this.document.size;else return 0;
	    }
	});

	Object.defineProperty(_CB2.default.CloudQueue.prototype, 'name', {
	    get: function get() {
	        return this.document.name;
	    }
	});

	Object.defineProperty(_CB2.default.CloudQueue.prototype, 'subscribers', {
	    get: function get() {
	        return this.document.subscribers;
	    }
	});

	Object.defineProperty(_CB2.default.CloudQueue.prototype, 'type', {
	    get: function get() {
	        return this.document.queueType;
	    },
	    set: function set(queueType) {
	        this.document.queueType = queueType;
	        _CB2.default._modified(this, 'queueType');
	    }
	});

	Object.defineProperty(_CB2.default.CloudQueue.prototype, 'ACL', {
	    get: function get() {
	        return this.document.ACL;
	    },
	    set: function set(ACL) {
	        this.document.ACL = ACL;
	        _CB2.default._modified(this, 'ACL');
	    }
	});

	Object.defineProperty(_CB2.default.CloudQueue.prototype, 'id', {
	    get: function get() {
	        return this.document._id;
	    }
	});

	Object.defineProperty(_CB2.default.CloudQueue.prototype, 'createdAt', {
	    get: function get() {
	        return this.document.createdAt;
	    }
	});

	Object.defineProperty(_CB2.default.CloudQueue.prototype, 'updatedAt', {
	    get: function get() {
	        return this.document.updatedAt;
	    }
	});

	Object.defineProperty(_CB2.default.CloudQueue.prototype, 'expires', {
	    get: function get() {
	        return this.document.expires;
	    },
	    set: function set(expires) {
	        this.document.expires = expires;
	        _CB2.default._modified(this, 'expires');
	    }
	});

	_CB2.default.CloudQueue.prototype.addMessage = function (queueMessage, callback) {

	    if (queueMessage == null) throw "Message cannot be null";

	    var def;
	    _CB2.default._validate();

	    if (!callback) {
	        def = new _CB2.default.Promise();
	    }

	    var messages = [];

	    if (queueMessage.constructor !== Array) {
	        messages.push(queueMessage);
	    } else {
	        messages = queueMessage;
	    }

	    for (var i = 0; i < messages.length; i++) {
	        if (!(messages[i] instanceof _CB2.default.QueueMessage)) {
	            messages[i] = new _CB2.default.QueueMessage(messages[i]);
	        }
	    }

	    this.document.messages = messages;

	    //PUT TO SERVER.
	    var thisObj = this;

	    var xmlhttp = _CB2.default._loadXml();

	    var params = JSON.stringify({
	        document: _CB2.default.toJSON(thisObj),
	        key: _CB2.default.appKey
	    });

	    var url = _CB2.default.apiUrl + "/queue/" + _CB2.default.appId + '/' + thisObj.document.name + '/message';

	    _CB2.default._request('PUT', url, params).then(function (response) {
	        var messages = _CB2.default.fromJSON(JSON.parse(response));
	        if (callback) {
	            callback.success(messages);
	        } else {
	            def.resolve(messages);
	        }
	    }, function (err) {
	        if (callback) {
	            callback.error(err);
	        } else {
	            def.reject(err);
	        }
	    });
	};

	_CB2.default.CloudQueue.prototype.updateMessage = function (queueMessage, callback) {

	    if (queueMessage == null) throw "Message cannot be null";

	    var def;
	    _CB2.default._validate();

	    if (!callback) {
	        def = new _CB2.default.Promise();
	    }

	    var messages = [];

	    if (queueMessage.constructor !== Array) {
	        if (!queueMessage.id) {
	            throw "Message cannot be updated because it has never been saved.";
	        } else {
	            messages.push(queueMessage);
	        }
	    } else {
	        messages = queueMessage;
	        for (var i = 0; i < messages.length; i++) {
	            if (!(messages[i] instanceof _CB2.default.QueueMessage)) {
	                throw "Message is not an instance of QueueMessage.";
	            }

	            if (!message[i].id) {
	                throw "Message cannot be updated because it has never been saved.";
	            }
	        }
	    }

	    return this.addMessage(queueMessage, callback);
	};

	_CB2.default.CloudQueue.prototype.getMessage = function (count, callback) {

	    var def;
	    _CB2.default._validate();

	    if (!callback) {
	        def = new _CB2.default.Promise();
	    }

	    if ((typeof count === 'undefined' ? 'undefined' : _typeof(count)) === 'object' && !callback) {
	        callback = count;
	        count = null;
	    }

	    if (!count) count = 1;

	    var thisObj = this;

	    var xmlhttp = _CB2.default._loadXml();

	    var params = JSON.stringify({
	        count: count,
	        key: _CB2.default.appKey
	    });

	    var url = _CB2.default.apiUrl + "/queue/" + _CB2.default.appId + '/' + thisObj.document.name + '/getMessage';

	    _CB2.default._request('POST', url, params).then(function (response) {

	        if (!response || response === "") {
	            response = null;
	        }

	        if (callback) {
	            callback.success(_CB2.default.fromJSON(JSON.parse(response)));
	        } else {
	            def.resolve(_CB2.default.fromJSON(JSON.parse(response)));
	        }
	    }, function (err) {
	        if (callback) {
	            callback.error(err);
	        } else {
	            def.reject(err);
	        }
	    });
	};

	_CB2.default.CloudQueue.prototype.getAllMessages = function (callback) {

	    var def;
	    _CB2.default._validate();

	    if (!callback) {
	        def = new _CB2.default.Promise();
	    }

	    if ((typeof count === 'undefined' ? 'undefined' : _typeof(count)) === 'object' && !callback) {
	        callback = count;
	        count = null;
	    }

	    var thisObj = this;

	    var xmlhttp = _CB2.default._loadXml();

	    var params = JSON.stringify({
	        key: _CB2.default.appKey
	    });

	    var url = _CB2.default.apiUrl + "/queue/" + _CB2.default.appId + '/' + thisObj.document.name + '/messages';

	    _CB2.default._request('POST', url, params).then(function (response) {

	        if (!response || response === "") {
	            response = null;
	        }

	        if (callback) {
	            callback.success(_CB2.default.fromJSON(JSON.parse(response)));
	        } else {
	            def.resolve(_CB2.default.fromJSON(JSON.parse(response)));
	        }
	    }, function (err) {
	        if (callback) {
	            callback.error(err);
	        } else {
	            def.reject(err);
	        }
	    });
	};

	_CB2.default.CloudQueue.prototype.getMessageById = function (id, callback) {
	    var def;

	    _CB2.default._validate();

	    if (!callback) {
	        def = new _CB2.default.Promise();
	    }

	    var xmlhttp = _CB2.default._loadXml();

	    var params = JSON.stringify({
	        key: _CB2.default.appKey
	    });

	    var url = _CB2.default.apiUrl + "/queue/" + _CB2.default.appId + '/' + this.document.name + '/message/' + id;

	    _CB2.default._request('POST', url, params).then(function (response) {

	        if (!response || response === "") {
	            response = null;
	        }

	        if (callback) {
	            callback.success(_CB2.default.fromJSON(JSON.parse(response)));
	        } else {
	            def.resolve(_CB2.default.fromJSON(JSON.parse(response)));
	        }
	    }, function (err) {
	        if (callback) {
	            callback.error(err);
	        } else {
	            def.reject(err);
	        }
	    });
	};

	_CB2.default.CloudQueue.prototype.get = function (callback) {
	    var def;

	    _CB2.default._validate();

	    if (!callback) {
	        def = new _CB2.default.Promise();
	    }

	    var xmlhttp = _CB2.default._loadXml();

	    var thisObj = this;

	    var params = JSON.stringify({
	        key: _CB2.default.appKey
	    });

	    var url = _CB2.default.apiUrl + "/queue/" + _CB2.default.appId + '/' + thisObj.document.name + '/';

	    _CB2.default._request('POST', url, params).then(function (response) {
	        if (callback) {
	            callback.success(_CB2.default.fromJSON(JSON.parse(response), thisObj));
	        } else {
	            def.resolve(_CB2.default.fromJSON(JSON.parse(response), thisObj));
	        }
	    }, function (err) {
	        if (callback) {
	            callback.error(err);
	        } else {
	            def.reject(err);
	        }
	    });
	};

	_CB2.default.CloudQueue.prototype.create = function (callback) {
	    var def;

	    _CB2.default._validate();

	    if (!callback) {
	        def = new _CB2.default.Promise();
	    }

	    var xmlhttp = _CB2.default._loadXml();

	    var thisObj = this;

	    var params = JSON.stringify({
	        key: _CB2.default.appKey,
	        document: _CB2.default.toJSON(thisObj)
	    });

	    var url = _CB2.default.apiUrl + "/queue/" + _CB2.default.appId + '/' + thisObj.document.name + '/create';

	    _CB2.default._request('POST', url, params).then(function (response) {
	        if (callback) {
	            callback.success(_CB2.default.fromJSON(JSON.parse(response), thisObj));
	        } else {
	            def.resolve(_CB2.default.fromJSON(JSON.parse(response), thisObj));
	        }
	    }, function (err) {
	        if (callback) {
	            callback.error(err);
	        } else {
	            def.reject(err);
	        }
	    });
	};

	_CB2.default.CloudQueue.prototype.addSubscriber = function (url, callback) {

	    var def;

	    _CB2.default._validate();

	    if (!callback) {
	        def = new _CB2.default.Promise();
	    }

	    var xmlhttp = _CB2.default._loadXml();

	    var tempSubscribers = this.document.subscribers;

	    this.document.subscribers = [];

	    if (url.constructor === Array) {
	        for (var i = 0; i < url.length; i++) {
	            this.document.subscribers.push(url[i]);
	        }
	    } else {
	        this.document.subscribers.push(url);
	    }

	    var params = JSON.stringify({
	        key: _CB2.default.appKey,
	        document: _CB2.default.toJSON(this)
	    });

	    var thisObj = this;

	    var url = _CB2.default.apiUrl + '/queue/' + _CB2.default.appId + '/' + thisObj.document.name + '/subscriber/';

	    _CB2.default._request('POST', url, params).then(function (response) {
	        thisObj = _CB2.default.fromJSON(JSON.parse(response), thisObj);
	        if (callback) {
	            callback.success(thisObj);
	        } else {
	            def.resolve(thisObj);
	        }
	    }, function (err) {
	        thisObj.document.subscribers = tempSubscribers;
	        if (callback) {
	            callback.error(err);
	        } else {
	            def.reject(err);
	        }
	    });
	};

	_CB2.default.CloudQueue.prototype.removeSubscriber = function (url, callback) {

	    var def;

	    _CB2.default._validate();

	    if (!callback) {
	        def = new _CB2.default.Promise();
	    }

	    var xmlhttp = _CB2.default._loadXml();

	    var tempSubscribers = this.document.subscribers;

	    this.document.subscribers = [];

	    if (url.constructor === Array) {
	        for (var i = 0; i < url.length; i++) {
	            this.document.subscribers.push(url[i]);
	        }
	    } else {
	        this.document.subscribers.push(url);
	    }

	    var thisObj = this;

	    var params = JSON.stringify({
	        key: _CB2.default.appKey,
	        document: _CB2.default.toJSON(thisObj),
	        method: "DELETE"
	    });

	    var url = _CB2.default.apiUrl + '/queue/' + _CB2.default.appId + '/' + thisObj.document.name + '/subscriber/';

	    _CB2.default._request('PUT', url, params).then(function (response) {
	        thisObj = _CB2.default.fromJSON(JSON.parse(response), thisObj);
	        if (callback) {
	            callback.success(thisObj);
	        } else {
	            def.resolve(thisObj);
	        }
	    }, function (err) {
	        this.document.subscribers = tempSubscribers;
	        if (callback) {
	            callback.error(err);
	        } else {
	            def.reject(err);
	        }
	    });
	};

	_CB2.default.CloudQueue.prototype.peekMessage = function (count, callback) {

	    var def;

	    _CB2.default._validate();

	    if (!callback) {
	        def = new _CB2.default.Promise();
	    }

	    if ((typeof count === 'undefined' ? 'undefined' : _typeof(count)) === 'object' && !callback) {
	        callback = count;
	        count = null;
	    }

	    if (!count) count = 1;

	    var xmlhttp = _CB2.default._loadXml();

	    var params = JSON.stringify({
	        key: _CB2.default.appKey,
	        count: count
	    });

	    var url = _CB2.default.apiUrl + "/queue/" + _CB2.default.appId + '/' + this.document.name + '/peekMessage';

	    _CB2.default._request('POST', url, params).then(function (response) {
	        if (callback) {
	            callback.success(_CB2.default.fromJSON(JSON.parse(response)));
	        } else {
	            def.resolve(_CB2.default.fromJSON(JSON.parse(response)));
	        }
	    }, function (err) {
	        if (callback) {
	            callback.error(err);
	        } else {
	            def.reject(err);
	        }
	    });
	};

	_CB2.default.CloudQueue.prototype.delete = function (callback) {
	    var def;

	    _CB2.default._validate();

	    if (!callback) {
	        def = new _CB2.default.Promise();
	    }

	    var xmlhttp = _CB2.default._loadXml();

	    var params = JSON.stringify({
	        key: _CB2.default.appKey,
	        document: _CB2.default.toJSON(this),
	        method: "DELETE"
	    });

	    var thisObj = this;

	    var url = _CB2.default.apiUrl + "/queue/" + _CB2.default.appId + '/' + thisObj.document.name;

	    _CB2.default._request('PUT', url, params).then(function (response) {
	        thisObj = _CB2.default.fromJSON(JSON.parse(response), thisObj);
	        if (callback) {
	            callback.success(thisObj);
	        } else {
	            def.resolve(thisObj);
	        }
	    }, function (err) {
	        if (callback) {
	            callback.error(err);
	        } else {
	            def.reject(err);
	        }
	    });
	};

	_CB2.default.CloudQueue.prototype.clear = function (callback) {
	    var def;

	    _CB2.default._validate();

	    if (!callback) {
	        def = new _CB2.default.Promise();
	    }

	    var xmlhttp = _CB2.default._loadXml();

	    var params = JSON.stringify({
	        key: _CB2.default.appKey,
	        document: _CB2.default.toJSON(this),
	        method: "DELETE"
	    });

	    var thisObj = this;

	    var url = _CB2.default.apiUrl + "/queue/" + _CB2.default.appId + '/' + thisObj.document.name + "/clear";

	    _CB2.default._request('PUT', url, params).then(function (response) {
	        thisObj = _CB2.default.fromJSON(JSON.parse(response), thisObj);
	        if (callback) {
	            callback.success(thisObj);
	        } else {
	            def.resolve(thisObj);
	        }
	    }, function (err) {
	        if (callback) {
	            callback.error(err);
	        } else {
	            def.reject(err);
	        }
	    });
	};

	_CB2.default.CloudQueue.prototype.refreshMessageTimeout = function (id, timeout, callback) {
	    var def;

	    _CB2.default._validate();

	    if (!callback) {
	        def = new _CB2.default.Promise();
	    }

	    if (!id) throw "Message Id cannot be null";

	    if (id instanceof _CB2.default.QueueMessage) {
	        if (!id.id) {
	            throw "Queue Message should have an id.";
	        } else {
	            id = id.id;
	        }
	    }

	    if (!callback && (timeout.success || timeout.error)) {
	        callback = timeout;
	        timeout = null;
	    }

	    var xmlhttp = _CB2.default._loadXml();

	    var params = JSON.stringify({
	        key: _CB2.default.appKey,
	        timeout: timeout
	    });

	    var thisObj = this;

	    var url = _CB2.default.apiUrl + "/queue/" + _CB2.default.appId + '/' + thisObj.document.name + "/" + id + "/refresh-message-timeout";

	    _CB2.default._request('PUT', url, params).then(function (response) {
	        if (callback) {
	            callback.success(_CB2.default.fromJSON(JSON.parse(response)));
	        } else {
	            def.resolve(_CB2.default.fromJSON(JSON.parse(response)));
	        }
	    }, function (err) {
	        if (callback) {
	            callback.error(err);
	        } else {
	            def.reject(err);
	        }
	    });
	};

	_CB2.default.CloudQueue.prototype.deleteMessage = function (id, callback) {
	    var def;

	    _CB2.default._validate();

	    if (!id || !(id instanceof _CB2.default.QueueMessage) && typeof id !== 'string') {
	        throw "Delete Message function should have id of the message or insance of QueueMessage as the first parameter. ";
	    }

	    if (id instanceof _CB2.default.QueueMessage) {
	        id = id.id;
	    }

	    if (!callback) {
	        def = new _CB2.default.Promise();
	    }

	    var xmlhttp = _CB2.default._loadXml();

	    var params = JSON.stringify({
	        key: _CB2.default.appKey,
	        method: "DELETE"
	    });

	    var thisObj = this;

	    var url = _CB2.default.apiUrl + "/queue/" + _CB2.default.appId + '/' + thisObj.document.name + "/message/" + id;

	    _CB2.default._request('PUT', url, params).then(function (response) {
	        if (callback) {
	            callback.success(_CB2.default.fromJSON(JSON.parse(response)));
	        } else {
	            def.resolve(_CB2.default.fromJSON(JSON.parse(response)));
	        }
	    }, function (err) {
	        if (callback) {
	            callback.error(err);
	        } else {
	            def.reject(err);
	        }
	    });
	};

	_CB2.default.CloudQueue.prototype.update = function (callback) {
	    var def;

	    _CB2.default._validate();

	    if (!callback) {
	        def = new _CB2.default.Promise();
	    }

	    var xmlhttp = _CB2.default._loadXml();

	    var thisObj = this;

	    var params = JSON.stringify({
	        key: _CB2.default.appKey,
	        document: _CB2.default.toJSON(thisObj)
	    });

	    var url = _CB2.default.apiUrl + "/queue/" + _CB2.default.appId + '/' + thisObj.document.name;

	    _CB2.default._request('PUT', url, params).then(function (response) {
	        if (callback) {
	            callback.success(_CB2.default.fromJSON(JSON.parse(response), thisObj));
	        } else {
	            def.resolve(_CB2.default.fromJSON(JSON.parse(response), thisObj));
	        }
	    }, function (err) {
	        if (callback) {
	            callback.error(err);
	        } else {
	            def.reject(err);
	        }
	    });
	};

	_CB2.default.CloudQueue.getAll = function (callback) {

	    var def;

	    _CB2.default._validate();

	    if (!callback) {
	        def = new _CB2.default.Promise();
	    }

	    var xmlhttp = _CB2.default._loadXml();

	    var thisObj = this;

	    var params = JSON.stringify({
	        key: _CB2.default.appKey
	    });

	    var url = _CB2.default.apiUrl + "/queue/" + _CB2.default.appId + '/';

	    _CB2.default._request('POST', url, params).then(function (response) {

	        if (response === "") {
	            response = null;
	        }

	        if (callback) {
	            callback.success(_CB2.default.fromJSON(JSON.parse(response)));
	        } else {
	            def.resolve(_CB2.default.fromJSON(JSON.parse(response)));
	        }
	    }, function (err) {
	        if (callback) {
	            callback.error(err);
	        } else {
	            def.reject(err);
	        }
	    });
	};

	_CB2.default.CloudQueue.get = function (queueName, callback) {
	    var queue = new _CB2.default.CloudQueue(queueName);
	    return queue.get(callback);
	};

	_CB2.default.CloudQueue.delete = function (queueName, callback) {
	    var queue = new _CB2.default.CloudQueue(queueName);
	    return queue.delete(callback);
	};

	_CB2.default.QueueMessage = function (data) {

	    this.document = {};
	    this.document.ACL = new _CB2.default.ACL(); //ACL(s) of the document
	    this.document._type = 'queue-message';
	    this.document.expires = null;
	    this.document.timeout = 1800; //30 mins by default.
	    this.document.delay = null;
	    this.document.message = data;
	    this.document._id = null;
	    this.document._modifiedColumns = ['createdAt', 'updatedAt', 'ACL', 'expires', 'timeout', 'delay', 'message'];
	    this.document._isModified = true;
	};

	Object.defineProperty(_CB2.default.QueueMessage.prototype, 'message', {
	    get: function get() {
	        return this.document.message;
	    },
	    set: function set(message) {
	        this.document.message = message;
	        _CB2.default._modified(this, 'message');
	    }
	});

	Object.defineProperty(_CB2.default.QueueMessage.prototype, 'ACL', {
	    get: function get() {
	        return this.document.ACL;
	    },
	    set: function set(ACL) {
	        this.document.ACL = ACL;
	        _CB2.default._modified(this, 'ACL');
	    }
	});

	Object.defineProperty(_CB2.default.QueueMessage.prototype, 'id', {
	    get: function get() {
	        return this.document._id;
	    }
	});

	Object.defineProperty(_CB2.default.QueueMessage.prototype, 'createdAt', {
	    get: function get() {
	        return this.document.createdAt;
	    },
	    set: function set(createdAt) {
	        this.document.createdAt = createdAt;
	        _CB2.default._modified(this, 'createdAt');
	    }
	});

	Object.defineProperty(_CB2.default.QueueMessage.prototype, 'updatedAt', {
	    get: function get() {
	        return this.document.updatedAt;
	    },
	    set: function set(updatedAt) {
	        this.document.updatedAt = updatedAt;
	        _CB2.default._modified(this, 'updatedAt');
	    }
	});

	Object.defineProperty(_CB2.default.QueueMessage.prototype, 'expires', {
	    get: function get() {
	        return this.document.expires;
	    },
	    set: function set(expires) {
	        this.document.expires = expires;
	        _CB2.default._modified(this, 'expires');
	    }
	});

	Object.defineProperty(_CB2.default.QueueMessage.prototype, 'timeout', {
	    get: function get() {
	        return this.document.timeout;
	    },
	    set: function set(timeout) {
	        this.document.timeout = timeout;
	        _CB2.default._modified(this, 'timeout');
	    }
	});

	Object.defineProperty(_CB2.default.QueueMessage.prototype, 'delay', {
	    get: function get() {
	        if (this.document.delay) return this.document.delay / 1000;else return 0;
	    },
	    set: function set(delay) {
	        delay *= 1000; //converting to seconds from milli seconds,
	        this.document.delay = delay;
	        _CB2.default._modified(this, 'delay');
	    }
	});

	exports.default = true;

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _CB = __webpack_require__(1);

	var _CB2 = _interopRequireDefault(_CB);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/*
	 CloudRole
	 */
	_CB2.default.CloudRole = _CB2.default.CloudRole || function (roleName) {
	    //calling the constructor.
	    if (!this.document) this.document = {};
	    this.document._tableName = 'Role';
	    this.document._type = 'role';
	    this.document.name = roleName;
	    this.document.expires = null;
	    this.document.ACL = new _CB2.default.ACL();
	    this.document.expires = null;
	    this.document._isModified = true;
	    this.document._modifiedColumns = ['createdAt', 'updatedAt', 'ACL', 'name', 'expires'];
	};

	_CB2.default.CloudRole.prototype = Object.create(_CB2.default.CloudObject.prototype);

	Object.defineProperty(_CB2.default.CloudRole.prototype, 'name', {
	    get: function get() {
	        return this.document.name;
	    },
	    set: function set(name) {
	        this.document.name = name;
	        _CB2.default._modified(this, name);
	    }
	});

	exports.default = true;

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _CB = __webpack_require__(1);

	var _CB2 = _interopRequireDefault(_CB);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/*
	 CloudUser
	 */
	_CB2.default.CloudUser = _CB2.default.CloudUser || function () {
	    if (!this.document) this.document = {};
	    this.document._tableName = 'User';
	    this.document.expires = null;
	    this.document._type = 'user';
	    this.document.expires = null;
	    this.document.ACL = new _CB2.default.ACL();
	    this.document._isModified = true;
	    this.document._modifiedColumns = ['createdAt', 'updatedAt', 'ACL', 'expires'];
	};

	//Description  : This function gets the current user from the server by taking the sessionId from querystring.
	//Params : 
	//returns : CloudUser object if the current user is still in session or null. 
	_CB2.default.CloudUser.getCurrentUser = function (callback) {

	    var def;
	    if (!callback) {
	        def = new _CB2.default.Promise();
	    }

	    //now call the signup API.
	    var params = JSON.stringify({
	        key: _CB2.default.appKey
	    });

	    var url = _CB2.default.apiUrl + "/user/" + _CB2.default.appId + "/currentUser";

	    _CB2.default._request('POST', url, params).then(function (response) {
	        var user = response;
	        if (response) {
	            try {
	                user = new _CB2.default.CloudUser();
	                _CB2.default.fromJSON(JSON.parse(response), user);
	                _CB2.default.CloudUser.current = user;
	                _CB2.default.CloudUser._setCurrentUser(user);
	            } catch (e) {}
	        }

	        if (callback) {
	            callback.success(user);
	        } else {
	            def.resolve(user);
	        }
	    }, function (err) {
	        if (callback) {
	            callback.error(err);
	        } else {
	            def.reject(err);
	        }
	    });

	    if (!callback) {
	        return def;
	    }
	};

	//Private Static fucntions

	//Description  : This function gets the current user from the cookie or from local storage.
	//Params : 
	//returns : CloudUser object if the current user is still in session or null. 
	_CB2.default.CloudUser._getCurrentUser = function () {
	    var content = _CB2.default._getCookie("CBCurrentUser");
	    if (content && content.length > 0) {
	        return _CB2.default.fromJSON(JSON.parse(content));
	    } else {
	        return null;
	    }
	};

	//Description  : This function saves the current user to the cookie or to local storage.
	//Params : @user - Instance of CB.CloudUser Object.
	//returns : void. 
	_CB2.default.CloudUser._setCurrentUser = function (user) {
	    //save the user to the cookie. 
	    if (!user) {
	        return;
	    }

	    //expiration time of 30 days.
	    _CB2.default._createCookie("CBCurrentUser", JSON.stringify(_CB2.default.toJSON(user)), 30 * 24 * 60 * 60 * 1000);
	};

	//Description  : This function saves the current user to the cookie or to local storage.
	//Params : @user - Instance of CB.CloudUser Object.
	//returns : void. 
	_CB2.default.CloudUser._removeCurrentUser = function () {
	    //save the user to the cookie. 
	    _CB2.default._deleteCookie("CBCurrentUser");
	};

	_CB2.default.CloudUser.resetPassword = function (email, callback) {

	    if (!email) {
	        throw "Email is required.";
	    }

	    var def;
	    if (!callback) {
	        def = new _CB2.default.Promise();
	    }

	    //now call the signup API.
	    var params = JSON.stringify({
	        email: email,
	        key: _CB2.default.appKey
	    });

	    var url = _CB2.default.apiUrl + "/user/" + _CB2.default.appId + "/resetPassword";

	    _CB2.default._request('POST', url, params).then(function (response) {
	        if (callback) {
	            callback.success();
	        } else {
	            def.resolve();
	        }
	    }, function (err) {
	        if (callback) {
	            callback.error(err);
	        } else {
	            def.reject(err);
	        }
	    });

	    if (!callback) {
	        return def;
	    }
	};

	_CB2.default.CloudUser.prototype = Object.create(_CB2.default.CloudObject.prototype);

	Object.defineProperty(_CB2.default.CloudUser.prototype, 'username', {
	    get: function get() {
	        return this.document.username;
	    },
	    set: function set(username) {
	        this.document.username = username;
	        _CB2.default._modified(this, 'username');
	    }
	});
	Object.defineProperty(_CB2.default.CloudUser.prototype, 'password', {
	    get: function get() {
	        return this.document.password;
	    },
	    set: function set(password) {
	        this.document.password = password;
	        _CB2.default._modified(this, 'password');
	    }
	});
	Object.defineProperty(_CB2.default.CloudUser.prototype, 'email', {
	    get: function get() {
	        return this.document.email;
	    },
	    set: function set(email) {
	        this.document.email = email;
	        _CB2.default._modified(this, 'email');
	    }
	});

	_CB2.default.CloudUser.current = _CB2.default.CloudUser._getCurrentUser();

	_CB2.default.CloudUser.prototype.signUp = function (callback) {

	    if (_CB2.default._isNode) {
	        throw "Error : You cannot signup the user on the server. Use CloudUser.save() instead.";
	    }

	    if (!this.document.username) {
	        throw "Username is not set.";
	    }
	    if (!this.document.password) {
	        throw "Password is not set.";
	    }
	    if (!this.document.email) {
	        throw "Email is not set.";
	    }
	    var thisObj = this;
	    var def;
	    if (!callback) {
	        def = new _CB2.default.Promise();
	    }
	    //now call the signup API.
	    var params = JSON.stringify({
	        document: _CB2.default.toJSON(thisObj),
	        key: _CB2.default.appKey
	    });
	    var url = _CB2.default.apiUrl + "/user/" + _CB2.default.appId + "/signup";

	    _CB2.default._request('POST', url, params).then(function (user) {

	        var response = null;
	        if (user && user != "") {
	            _CB2.default.fromJSON(JSON.parse(user), thisObj);
	            _CB2.default.CloudUser.current = thisObj;
	            _CB2.default.CloudUser._setCurrentUser(thisObj);
	            response = thisObj;
	        }

	        if (callback) {
	            callback.success(response);
	        } else {
	            def.resolve(response);
	        }
	    }, function (err) {
	        if (callback) {
	            callback.error(err);
	        } else {
	            def.reject(err);
	        }
	    });

	    if (!callback) {
	        return def;
	    }
	};

	_CB2.default.CloudUser.prototype.changePassword = function (oldPassword, newPassword, callback) {

	    var thisObj = this;
	    var def;
	    if (!callback) {
	        def = new _CB2.default.Promise();
	    }
	    //now call the signup API.
	    var params = JSON.stringify({
	        oldPassword: oldPassword,
	        newPassword: newPassword,
	        key: _CB2.default.appKey
	    });

	    var url = _CB2.default.apiUrl + "/user/" + _CB2.default.appId + "/changePassword";

	    _CB2.default._request('PUT', url, params).then(function (response) {
	        if (callback) {
	            callback.success(_CB2.default.fromJSON(JSON.parse(response), thisObj));
	        } else {
	            def.resolve(_CB2.default.fromJSON(JSON.parse(response), thisObj));
	        }
	    }, function (err) {
	        if (callback) {
	            callback.error(err);
	        } else {
	            def.reject(err);
	        }
	    });

	    if (!callback) {
	        return def;
	    }
	};

	_CB2.default.CloudUser.prototype.logIn = function (callback) {

	    if (_CB2.default._isNode) {
	        throw "Error : You cannot login the user on the server.";
	    }

	    if (!this.document.username) {
	        throw "Username is not set.";
	    }
	    if (!this.document.password) {
	        throw "Password is not set.";
	    }
	    var thisObj = this;
	    var def;
	    if (!callback) {
	        def = new _CB2.default.Promise();
	    }
	    //now call the signup API.
	    var params = JSON.stringify({
	        document: _CB2.default.toJSON(thisObj),
	        key: _CB2.default.appKey
	    });
	    var url = _CB2.default.apiUrl + "/user/" + _CB2.default.appId + "/login";

	    _CB2.default._request('POST', url, params).then(function (response) {
	        thisObj = _CB2.default.fromJSON(JSON.parse(response), thisObj);
	        _CB2.default.CloudUser.current = thisObj;
	        if (callback) {
	            callback.success(thisObj);
	        } else {
	            def.resolve(thisObj);
	        }
	        _CB2.default.CloudUser._setCurrentUser(thisObj);
	    }, function (err) {
	        if (callback) {
	            callback.error(err);
	        } else {
	            def.reject(err);
	        }
	    });

	    if (!callback) {
	        return def;
	    }
	};

	_CB2.default.CloudUser.authenticateWithProvider = function (dataJson, callback) {

	    if (_CB2.default._isNode) {
	        throw "Error : You cannot login the user on the server.";
	    }

	    var def;
	    if (!callback) {
	        def = new _CB2.default.Promise();
	    }

	    if (!dataJson) {
	        throw "data object is null.";
	    }

	    if (dataJson && !dataJson.provider) {
	        throw "provider is not set.";
	    }

	    if (dataJson && !dataJson.accessToken) {
	        throw "accessToken is not set.";
	    }

	    if (dataJson.provider.toLowerCase() === "twiter" && !dataJson.accessSecret) {
	        throw "accessSecret is required for provider twitter.";
	    }

	    var params = JSON.stringify({
	        provider: dataJson.provider,
	        accessToken: dataJson.accessToken,
	        accessSecret: dataJson.accessSecret,
	        key: _CB2.default.appKey
	    });

	    var url = _CB2.default.apiUrl + "/user/" + _CB2.default.appId + "/loginwithprovider";

	    _CB2.default._request('POST', url, params).then(function (response) {
	        var user = response;
	        if (response) {
	            try {
	                user = new _CB2.default.CloudUser();
	                _CB2.default.fromJSON(JSON.parse(response), user);
	                _CB2.default.CloudUser.current = user;
	                _CB2.default.CloudUser._setCurrentUser(user);
	            } catch (e) {}
	        }

	        if (callback) {
	            callback.success(user);
	        } else {
	            def.resolve(user);
	        }
	    }, function (err) {
	        if (callback) {
	            callback.error(err);
	        } else {
	            def.reject(err);
	        }
	    });

	    if (!callback) {
	        return def;
	    }
	};

	_CB2.default.CloudUser.prototype.logOut = function (callback) {

	    if (_CB2.default._isNode) {
	        throw "Error : You cannot logOut the user on the server.";
	    }

	    var thisObj = this;
	    var def;
	    if (!callback) {
	        def = new _CB2.default.Promise();
	    }
	    //now call the logout API.
	    var params = JSON.stringify({
	        document: _CB2.default.toJSON(thisObj),
	        key: _CB2.default.appKey
	    });
	    var url = _CB2.default.apiUrl + "/user/" + _CB2.default.appId + "/logout";

	    _CB2.default._request('POST', url, params).then(function (response) {
	        _CB2.default.fromJSON(JSON.parse(response), thisObj);
	        _CB2.default.CloudUser.current = null;
	        if (callback) {
	            callback.success(thisObj);
	        } else {
	            def.resolve(thisObj);
	        }
	        _CB2.default.CloudUser._removeCurrentUser();
	    }, function (err) {
	        if (callback) {
	            callback.error(err);
	        } else {
	            def.reject(err);
	        }
	    });

	    if (!callback) {
	        return def;
	    }
	};
	_CB2.default.CloudUser.prototype.addToRole = function (role, callback) {
	    if (!role) {
	        throw "Role is null";
	    }
	    var thisObj = this;
	    var def;
	    if (!callback) {
	        def = new _CB2.default.Promise();
	    }

	    //Call the addToRole API
	    var params = JSON.stringify({
	        user: _CB2.default.toJSON(thisObj),
	        role: _CB2.default.toJSON(role),
	        key: _CB2.default.appKey
	    });
	    var url = _CB2.default.apiUrl + "/user/" + _CB2.default.appId + "/addToRole";

	    _CB2.default._request('PUT', url, params).then(function (response) {
	        _CB2.default.fromJSON(JSON.parse(response), thisObj);
	        if (callback) {
	            callback.success(thisObj);
	        } else {
	            def.resolve(thisObj);
	        }
	    }, function (err) {
	        if (callback) {
	            callback.error(err);
	        } else {
	            def.reject(err);
	        }
	    });

	    if (!callback) {
	        return def;
	    }
	};
	_CB2.default.CloudUser.prototype.isInRole = function (role) {
	    if (!role) {
	        throw "role is null";
	    }

	    var roleArray = this.get('roles');
	    var userRoleIds = [];

	    if (roleArray && roleArray.length > 0) {
	        for (var i = 0; i < roleArray.length; ++i) {
	            userRoleIds.push(roleArray[i].document._id);
	        }
	    }

	    return userRoleIds.indexOf(role.document._id) >= 0;
	};

	_CB2.default.CloudUser.prototype.removeFromRole = function (role, callback) {
	    if (!role) {
	        throw "Role is null";
	    }
	    var thisObj = this;
	    var def;
	    if (!callback) {
	        def = new _CB2.default.Promise();
	    }
	    //now call the removeFromRole API.
	    var params = JSON.stringify({
	        user: _CB2.default.toJSON(thisObj),
	        role: _CB2.default.toJSON(role),
	        key: _CB2.default.appKey
	    });
	    var url = _CB2.default.apiUrl + "/user/" + _CB2.default.appId + "/removeFromRole";

	    _CB2.default._request('PUT', url, params).then(function (response) {
	        _CB2.default.fromJSON(JSON.parse(response), thisObj);
	        if (callback) {
	            callback.success(thisObj);
	        } else {
	            def.resolve(thisObj);
	        }
	    }, function (err) {
	        if (callback) {
	            callback.error(err);
	        } else {
	            def.reject(err);
	        }
	    });

	    if (!callback) {
	        return def;
	    }
	};

	exports.default = true;

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _CB = __webpack_require__(1);

	var _CB2 = _interopRequireDefault(_CB);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/*
	 CloudCache
	 */

	_CB2.default.CloudCache = function (cacheName) {
	    if (typeof cacheName === 'undefined' || cacheName === null || cacheName === '') {
	        throw "Cannot create a cache with empty name";
	    }
	    this.document = {};
	    this.document._tableName = "cache";
	    this.document.name = cacheName;
	    this.document.size = "";
	    this.document.items = [];
	};

	Object.defineProperty(_CB2.default.CloudCache.prototype, 'name', {
	    get: function get() {
	        return this.document.name;
	    }
	});

	Object.defineProperty(_CB2.default.CloudCache.prototype, 'size', {
	    get: function get() {
	        return this.document.size;
	    }
	});

	Object.defineProperty(_CB2.default.CloudCache.prototype, 'items', {
	    get: function get() {
	        return this.document.items;
	    }
	});

	_CB2.default.CloudCache.prototype.set = function (key, value, callback) {
	    var def;
	    _CB2.default._validate();

	    if (!callback) {
	        def = new _CB2.default.Promise();
	    }

	    if (typeof value === 'undefined') {
	        throw "Value cannot be undefined.";
	    }

	    var params = JSON.stringify({
	        key: _CB2.default.appKey,
	        item: value
	    });

	    var url = _CB2.default.apiUrl + '/cache/' + _CB2.default.appId + '/' + this.document.name + '/' + key;
	    _CB2.default._request('PUT', url, params, true).then(function (response) {
	        if (_CB2.default._isJsonString(response)) {
	            response = JSON.parse(response);
	        }

	        var obj = _CB2.default.fromJSON(response);
	        if (callback) {
	            callback.success(obj);
	        } else {
	            def.resolve(obj);
	        }
	    }, function (err) {
	        if (callback) {
	            callback.error(err);
	        } else {
	            def.reject(err);
	        }
	    });
	    if (!callback) {
	        return def;
	    }
	};

	_CB2.default.CloudCache.prototype.deleteItem = function (key, callback) {
	    var def;
	    _CB2.default._validate();

	    if (!callback) {
	        def = new _CB2.default.Promise();
	    }

	    var params = JSON.stringify({
	        key: _CB2.default.appKey,
	        method: "DELETE"
	    });

	    var url = _CB2.default.apiUrl + '/cache/' + _CB2.default.appId + '/' + this.document.name + '/item/' + key;
	    _CB2.default._request('PUT', url, params, true).then(function (response) {
	        if (_CB2.default._isJsonString(response)) {
	            response = JSON.parse(response);
	        }

	        var obj = _CB2.default.fromJSON(response);
	        if (callback) {
	            callback.success(obj);
	        } else {
	            def.resolve(obj);
	        }
	    }, function (err) {
	        if (callback) {
	            callback.error(err);
	        } else {
	            def.reject(err);
	        }
	    });
	    if (!callback) {
	        return def;
	    }
	};

	_CB2.default.CloudCache.prototype.create = function (callback) {
	    var def;
	    _CB2.default._validate();

	    if (!callback) {
	        def = new _CB2.default.Promise();
	    }

	    var params = JSON.stringify({
	        key: _CB2.default.appKey
	    });

	    var thisObj = this;

	    var url = _CB2.default.apiUrl + '/cache/' + _CB2.default.appId + '/' + this.document.name + '/create';
	    _CB2.default._request('POST', url, params, true).then(function (response) {
	        if (_CB2.default._isJsonString(response)) {
	            response = JSON.parse(response);
	        }
	        var obj = _CB2.default.fromJSON(response, thisObj);
	        if (callback) {
	            callback.success(obj);
	        } else {
	            def.resolve(obj);
	        }
	    }, function (err) {
	        if (callback) {
	            callback.error(err);
	        } else {
	            def.reject(err);
	        }
	    });
	    if (!callback) {
	        return def;
	    }
	};

	_CB2.default.CloudCache.prototype.get = function (key, callback) {

	    var def;
	    _CB2.default._validate();

	    if (!callback) {
	        def = new _CB2.default.Promise();
	    }

	    var params = JSON.stringify({
	        key: _CB2.default.appKey
	    });

	    var url = _CB2.default.apiUrl + '/cache/' + _CB2.default.appId + '/' + this.document.name + '/' + key + '/item';
	    _CB2.default._request('POST', url, params, true).then(function (response) {
	        if (_CB2.default._isJsonString(response)) {
	            response = JSON.parse(response);
	        }
	        var obj = _CB2.default.fromJSON(response);
	        if (callback) {
	            callback.success(obj);
	        } else {
	            def.resolve(obj);
	        }
	    }, function (err) {
	        if (callback) {
	            callback.error(err);
	        } else {
	            def.reject(err);
	        }
	    });
	    if (!callback) {
	        return def;
	    }
	};

	_CB2.default.CloudCache.prototype.getInfo = function (callback) {
	    var def;
	    _CB2.default._validate();

	    if (!callback) {
	        def = new _CB2.default.Promise();
	    }

	    var params = JSON.stringify({
	        key: _CB2.default.appKey
	    });

	    var thisObj = this;

	    var url = _CB2.default.apiUrl + '/cache/' + _CB2.default.appId + '/' + this.document.name;
	    _CB2.default._request('POST', url, params, true).then(function (response) {
	        if (_CB2.default._isJsonString(response)) {
	            response = JSON.parse(response);
	        }
	        var obj = _CB2.default.fromJSON(response, thisObj);
	        if (callback) {
	            callback.success(obj);
	        } else {
	            def.resolve(obj);
	        }
	    }, function (err) {
	        if (callback) {
	            callback.error(err);
	        } else {
	            def.reject(err);
	        }
	    });
	    if (!callback) {
	        return def;
	    }
	};

	_CB2.default.CloudCache.prototype.getItemsCount = function (callback) {
	    var def;
	    _CB2.default._validate();

	    if (!callback) {
	        def = new _CB2.default.Promise();
	    }

	    var params = JSON.stringify({
	        key: _CB2.default.appKey
	    });

	    var url = _CB2.default.apiUrl + '/cache/' + _CB2.default.appId + '/' + this.document.name + '/items/count';
	    _CB2.default._request('POST', url, params, true).then(function (response) {
	        if (_CB2.default._isJsonString(response)) {
	            response = JSON.parse(response);
	        }
	        var obj = _CB2.default.fromJSON(response);
	        if (callback) {
	            callback.success(obj);
	        } else {
	            def.resolve(obj);
	        }
	    }, function (err) {
	        if (callback) {
	            callback.error(err);
	        } else {
	            def.reject(err);
	        }
	    });
	    if (!callback) {
	        return def;
	    }
	};

	_CB2.default.CloudCache.prototype.getAll = function (callback) {
	    var def;
	    _CB2.default._validate();

	    if (!callback) {
	        def = new _CB2.default.Promise();
	    }

	    var thisObj = this;

	    var params = JSON.stringify({
	        key: _CB2.default.appKey
	    });
	    var url = _CB2.default.apiUrl + '/cache/' + _CB2.default.appId + '/' + this.document.name + '/items';
	    _CB2.default._request('POST', url, params, true).then(function (response) {
	        if (_CB2.default._isJsonString(response)) {
	            response = JSON.parse(response);
	        }
	        var obj = _CB2.default.fromJSON(response);

	        thisObj.document.items = obj;

	        if (callback) {
	            callback.success(obj);
	        } else {
	            def.resolve(obj);
	        }
	    }, function (err) {
	        if (callback) {
	            callback.error(err);
	        } else {
	            def.reject(err);
	        }
	    });
	    if (!callback) {
	        return def;
	    }
	};

	_CB2.default.CloudCache.prototype.clear = function (callback) {
	    var def;
	    _CB2.default._validate();

	    if (!callback) {
	        def = new _CB2.default.Promise();
	    }

	    var params = JSON.stringify({
	        key: _CB2.default.appKey,
	        method: "DELETE"
	    });

	    var thisObj = this;

	    var url = _CB2.default.apiUrl + '/cache/' + _CB2.default.appId + '/' + this.document.name + '/clear/items';
	    _CB2.default._request('PUT', url, params, true).then(function (response) {
	        if (_CB2.default._isJsonString(response)) {
	            response = JSON.parse(response);
	        }
	        var obj = _CB2.default.fromJSON(response, thisObj);
	        if (callback) {
	            callback.success(obj);
	        } else {
	            def.resolve(obj);
	        }
	    }, function (err) {
	        if (callback) {
	            callback.error(err);
	        } else {
	            def.reject(err);
	        }
	    });
	    if (!callback) {
	        return def;
	    }
	};

	_CB2.default.CloudCache.prototype.delete = function (callback) {
	    var def;
	    _CB2.default._validate();

	    if (!callback) {
	        def = new _CB2.default.Promise();
	    }

	    var params = JSON.stringify({
	        key: _CB2.default.appKey,
	        method: "DELETE"
	    });

	    var thisObj = this;

	    var url = _CB2.default.apiUrl + '/cache/' + _CB2.default.appId + '/' + this.document.name;
	    _CB2.default._request('PUT', url, params, true).then(function (response) {
	        if (_CB2.default._isJsonString(response)) {
	            response = JSON.parse(response);
	        }
	        var obj = _CB2.default.fromJSON(response, thisObj);
	        if (callback) {
	            callback.success(obj);
	        } else {
	            def.resolve(obj);
	        }
	    }, function (err) {
	        if (callback) {
	            callback.error(err);
	        } else {
	            def.reject(err);
	        }
	    });
	    if (!callback) {
	        return def;
	    }
	};

	_CB2.default.CloudCache.getAll = function (callback) {
	    var def;
	    _CB2.default._validate();

	    if (!callback) {
	        def = new _CB2.default.Promise();
	    }

	    var params = JSON.stringify({
	        key: _CB2.default.appKey
	    });

	    var url = _CB2.default.apiUrl + '/cache/' + _CB2.default.appId;
	    _CB2.default._request('POST', url, params, true).then(function (response) {
	        if (_CB2.default._isJsonString(response)) {
	            response = JSON.parse(response);
	        }
	        var obj = _CB2.default.fromJSON(response);
	        if (callback) {
	            callback.success(obj);
	        } else {
	            def.resolve(obj);
	        }
	    }, function (err) {
	        if (callback) {
	            callback.error(err);
	        } else {
	            def.reject(err);
	        }
	    });
	    if (!callback) {
	        return def;
	    }
	};

	_CB2.default.CloudCache.deleteAll = function (callback) {
	    var def;
	    _CB2.default._validate();

	    if (!callback) {
	        def = new _CB2.default.Promise();
	    }

	    var params = JSON.stringify({
	        key: _CB2.default.appKey,
	        method: "DELETE"
	    });

	    var url = _CB2.default.apiUrl + '/cache/' + _CB2.default.appId;
	    _CB2.default._request('PUT', url, params, true).then(function (response) {
	        if (_CB2.default._isJsonString(response)) {
	            response = JSON.parse(response);
	        }
	        var obj = _CB2.default.fromJSON(response);
	        if (callback) {
	            callback.success(obj);
	        } else {
	            def.resolve(obj);
	        }
	    }, function (err) {
	        if (callback) {
	            callback.error(err);
	        } else {
	            def.reject(err);
	        }
	    });
	    if (!callback) {
	        return def;
	    }
	};

	exports.default = true;

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _CB = __webpack_require__(1);

	var _CB2 = _interopRequireDefault(_CB);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/* CloudNotificiation */

	_CB2.default.CloudNotification = _CB2.default.CloudNotification || {};

	_CB2.default.CloudNotification.on = function (channelName, callback, done) {

	    if (_CB2.default._isRealtimeDisabled) {
	        throw "Realtime is disbaled for this app.";
	    }

	    _CB2.default._validate();

	    var def;

	    if (!done) {
	        def = new _CB2.default.Promise();
	    }

	    _CB2.default.Socket.emit('join-custom-channel', _CB2.default.appId + channelName);
	    _CB2.default.Socket.on(_CB2.default.appId + channelName, function (data) {
	        //listen to events in custom channel.
	        callback(data);
	    });

	    if (done && done.success) done.success();else def.resolve();

	    if (!done) {
	        return def;
	    }
	};

	_CB2.default.CloudNotification.off = function (channelName, done) {

	    if (_CB2.default._isRealtimeDisabled) {
	        throw "Realtime is disbaled for this app.";
	    }

	    _CB2.default._validate();

	    var def;

	    if (!done) {
	        def = new _CB2.default.Promise();
	    }

	    _CB2.default.Socket.emit('leave-custom-channel', _CB2.default.appId + channelName);
	    _CB2.default.Socket.removeAllListeners(_CB2.default.appId + channelName);
	    if (done && done.success) done.success();else def.resolve();

	    if (!done) {
	        return def;
	    }
	};

	_CB2.default.CloudNotification.publish = function (channelName, data, done) {

	    if (_CB2.default._isRealtimeDisabled) {
	        throw "Realtime is disbaled for this app.";
	    }

	    _CB2.default._validate();

	    var def;

	    if (!done) {
	        def = new _CB2.default.Promise();
	    }

	    _CB2.default.Socket.emit('publish-custom-channel', { channel: _CB2.default.appId + channelName, data: data });
	    if (done && done.success) done.success();else def.resolve();

	    if (!done) {
	        return def;
	    }
	};

	exports.default = true;

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _CB = __webpack_require__(1);

	var _CB2 = _interopRequireDefault(_CB);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/*CloudBoost Push Notifications*/

	_CB2.default.CloudPush = {};

	_CB2.default.CloudPush.send = function (data, query, callback) {

	    var tableName = "Device";

	    if (!_CB2.default.appId) {
	        throw "CB.appId is null.";
	    }
	    var def;
	    if (!callback) {
	        def = new _CB2.default.Promise();
	    }

	    if (!data) {
	        throw "data object is null.";
	    }
	    if (data && !data.message) {
	        throw "message is not set.";
	    }

	    //Query Set
	    if (query && Object.prototype.toString.call(query) == "[object Object]" && typeof query.success !== 'function') {
	        var pushQuery = query;
	    }
	    //Channels List
	    if (query && Object.prototype.toString.call(query) == "[object Array]" && typeof query.success !== 'function') {
	        var pushQuery = new _CB2.default.CloudQuery(tableName);
	        pushQuery.containedIn('channels', query);
	    }
	    //Single Channel    
	    if (query && Object.prototype.toString.call(query) == "[object String]" && typeof query.success !== 'function') {
	        var pushQuery = new _CB2.default.CloudQuery(tableName);
	        pushQuery.containedIn('channels', [query]);
	    }
	    //when query param is callback
	    if (query && Object.prototype.toString.call(query) == "[object Object]" && typeof query.success === 'function') {
	        callback = query;
	        var pushQuery = new _CB2.default.CloudQuery(tableName);
	    }
	    //No query param
	    if (!query) {
	        var pushQuery = new _CB2.default.CloudQuery(tableName);
	    }

	    var params = JSON.stringify({
	        query: pushQuery.query,
	        sort: pushQuery.sort,
	        limit: pushQuery.limit,
	        skip: pushQuery.skip,
	        key: _CB2.default.appKey,
	        data: data
	    });

	    var url = _CB2.default.apiUrl + "/push/" + _CB2.default.appId + '/send';

	    _CB2.default._request('POST', url, params).then(function (response) {
	        var object = response;
	        if (_CB2.default._isJsonString(response)) {
	            object = JSON.parse(response);
	        }

	        if (callback) {
	            callback.success(object);
	        } else {
	            def.resolve(object);
	        }
	    }, function (err) {

	        if (_CB2.default._isJsonString(err)) {
	            err = JSON.parse(err);
	        }

	        if (callback) {
	            callback.error(err);
	        } else {
	            def.reject(err);
	        }
	    });

	    if (!callback) {
	        return def;
	    }
	};

	_CB2.default.CloudPush.enableWebNotifications = function (callback) {

	    var def;
	    if (!callback) {
	        def = new _CB2.default.Promise();
	    }

	    //Check document
	    if (typeof document !== 'undefined') {

	        _CB2.default.CloudPush._requestBrowserNotifications().then(function (response) {

	            if ('serviceWorker' in navigator) {
	                return navigator.serviceWorker.register('serviceWorker.js', { scope: './' });
	            } else {
	                var noServerDef = new _CB2.default.Promise();
	                noServerDef.reject('Service workers aren\'t supported in this browser.');
	                return noServerDef;
	            }
	        }).then(function (registration) {

	            if (!registration.showNotification) {
	                var noServerDef = new _CB2.default.Promise();
	                noServerDef.reject('Notifications aren\'t supported on service workers.');
	                return noServerDef;
	            } else {
	                return _CB2.default.CloudPush._subscribe();
	            }
	        }).then(function (subscription) {

	            //PublicKey for secure connection with server
	            var browserKey = subscription.getKey ? subscription.getKey('p256dh') : '';
	            browserKey = browserKey ? btoa(String.fromCharCode.apply(null, new Uint8Array(browserKey))) : '';

	            //AuthKey for secure connection with server
	            var authKey = subscription.getKey ? subscription.getKey('auth') : '';
	            authKey = authKey ? btoa(String.fromCharCode.apply(null, new Uint8Array(authKey))) : '';

	            _CB2.default.CloudPush._addDevice(_CB2.default._getThisBrowserName(), subscription.endpoint, browserKey, authKey, {
	                success: function success(obj) {
	                    if (callback) {
	                        callback.success();
	                    } else {
	                        def.resolve();
	                    }
	                }, error: function error(_error) {
	                    if (callback) {
	                        callback.error(_error);
	                    } else {
	                        def.reject(_error);
	                    }
	                }
	            });
	        }, function (error) {
	            if (callback) {
	                callback.error(error);
	            } else {
	                def.reject(error);
	            }
	        });
	    } else {
	        if (callback) {
	            callback.error("Browser document not found");
	        } else {
	            def.reject("Browser document not found");
	        }
	    }

	    if (!callback) {
	        return def;
	    }
	};

	_CB2.default.CloudPush.disableWebNotifications = function (callback) {

	    var def;
	    if (!callback) {
	        def = new _CB2.default.Promise();
	    }

	    //Check document
	    if (typeof document !== 'undefined') {

	        _CB2.default.CloudPush._getSubscription().then(function (subscription) {

	            //No subscription 
	            if (!subscription) {
	                if (callback) {
	                    callback.success();
	                } else {
	                    def.resolve();
	                }
	            }

	            if (subscription) {
	                var promises = [];

	                //We have a subcription, so call unsubscribe on it
	                promises.push(subscription.unsubscribe());
	                //Remove Device Objects
	                promises.push(_CB2.default.CloudPush._deleteDevice(_CB2.default._getThisBrowserName(), subscription.endpoint));

	                _CB2.default.Promise.all(promises).then(function (successful) {
	                    if (callback) {
	                        callback.success();
	                    } else {
	                        def.resolve();
	                    }
	                }, function (error) {
	                    if (callback) {
	                        callback.error(error);
	                    } else {
	                        def.reject(error);
	                    }
	                });
	            }
	        }, function (error) {
	            if (callback) {
	                callback.error(error);
	            } else {
	                def.reject(error);
	            }
	        });
	    } else {
	        if (callback) {
	            callback.error("Browser document not found");
	        } else {
	            def.reject("Browser document not found");
	        }
	    }

	    if (!callback) {
	        return def;
	    }
	};

	_CB2.default.CloudPush._subscribe = function () {

	    var def = new _CB2.default.Promise();

	    // Check if push messaging is supported  
	    if (!('PushManager' in window)) {
	        return def.reject('Push messaging isn\'t supported.');
	    }

	    navigator.serviceWorker.ready.then(function (reg) {

	        reg.pushManager.getSubscription().then(function (subscription) {

	            if (!subscription) {
	                reg.pushManager.subscribe({ userVisibleOnly: true }).then(function (subscription) {
	                    def.resolve(subscription);
	                }).catch(function (err) {
	                    def.reject(err);
	                });
	            } else {
	                def.resolve(subscription);
	            }
	        }).catch(function (err) {
	            def.reject(err);
	        });
	    }, function (error) {
	        def.reject(error);
	    });

	    return def;
	};

	_CB2.default.CloudPush._getSubscription = function () {

	    var def = new _CB2.default.Promise();

	    navigator.serviceWorker.ready.then(function (reg) {

	        reg.pushManager.getSubscription().then(function (subscription) {

	            if (!subscription) {
	                def.resolve(null);
	            } else {
	                def.resolve(subscription);
	            }
	        }).catch(function (err) {
	            def.reject(err);
	        });
	    }, function (error) {
	        def.reject(error);
	    });

	    return def;
	};

	_CB2.default.CloudPush._requestBrowserNotifications = function () {

	    var def = new _CB2.default.Promise();

	    if (!("Notification" in window)) {
	        def.reject("This browser does not support system notifications");
	    } else if (Notification.permission === "granted") {

	        def.resolve("Permission granted");
	    } else if (Notification.permission !== 'denied') {

	        Notification.requestPermission(function (permission) {

	            if (permission === "granted") {
	                def.resolve("Permission granted");
	            }

	            if (permission === "denied") {
	                def.reject("Permission denied");
	            }
	        });
	    }

	    return def;
	};

	//save the device document to the db
	_CB2.default.CloudPush._addDevice = function (deviceOS, endPoint, browserKey, authKey, callback) {

	    var def;
	    _CB2.default._validate();

	    //Set Fields
	    var thisObj = new _CB2.default.CloudObject('Device');
	    thisObj.set('deviceOS', deviceOS);
	    thisObj.set('deviceToken', endPoint);
	    thisObj.set('metadata', { browserKey: browserKey, authKey: authKey });

	    if (!callback) {
	        def = new _CB2.default.Promise();
	    }

	    var xmlhttp = _CB2.default._loadXml();
	    var params = JSON.stringify({
	        document: _CB2.default.toJSON(thisObj),
	        key: _CB2.default.appKey
	    });

	    var url = _CB2.default.apiUrl + "/push/" + _CB2.default.appId;
	    _CB2.default._request('PUT', url, params).then(function (response) {
	        thisObj = _CB2.default.fromJSON(JSON.parse(response), thisObj);
	        if (callback) {
	            callback.success(thisObj);
	        } else {
	            def.resolve(thisObj);
	        }
	    }, function (err) {
	        if (callback) {
	            callback.error(err);
	        } else {
	            def.reject(err);
	        }
	    });

	    if (!callback) {
	        return def;
	    }
	};

	_CB2.default.CloudPush._deleteDevice = function (deviceOS, endPoint, callback) {
	    //delete an object matching the objectId
	    if (!_CB2.default.appId) {
	        throw "CB.appId is null.";
	    }

	    var def;
	    if (!callback) {
	        def = new _CB2.default.Promise();
	    }

	    var data = {
	        deviceOS: deviceOS,
	        deviceToken: endPoint
	    };

	    var params = JSON.stringify({
	        key: _CB2.default.appKey,
	        document: data,
	        method: "DELETE"
	    });

	    var url = _CB2.default.apiUrl + "/push/" + _CB2.default.appId;

	    _CB2.default._request('PUT', url, params).then(function (response) {
	        if (callback) {
	            callback.success(response);
	        } else {
	            def.resolve(response);
	        }
	    }, function (err) {
	        if (callback) {
	            callback.error(err);
	        } else {
	            def.reject(err);
	        }
	    });

	    if (!callback) {
	        return def;
	    }
	};

	exports.default = true;

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _CB = __webpack_require__(1);

	var _CB2 = _interopRequireDefault(_CB);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/*
	 CloudQuery
	 */
	_CB2.default.CloudQuery = function (tableName) {
	    //constructor for the class CloudQuery

	    if (!tableName) throw "Table Name cannot be null";

	    this.tableName = tableName;
	    this.query = {};
	    this.query.$include = [];
	    this.query.$includeList = [];
	    this.select = {};
	    this.sort = {};
	    this.skip = 0;
	    this.limit = 10; //default limit is 10
	};

	_CB2.default.CloudQuery.prototype.search = function (search, language, caseSensitive, diacriticSensitive) {

	    //Validations
	    if (typeof search !== "string") {
	        throw "First parameter is required and it should be a string.";
	    }

	    if (language !== null && typeof language !== "undefined" && typeof language !== "string") {
	        throw "Second parameter should be a string.";
	    }

	    if (caseSensitive !== null && typeof caseSensitive !== "undefined" && typeof caseSensitive !== "boolean") {
	        throw "Third parameter should be a boolean.";
	    }

	    if (diacriticSensitive !== null && typeof diacriticSensitive !== "undefined" && typeof diacriticSensitive !== "boolean") {
	        throw "Fourth parameter should be a boolean.";
	    }

	    //Set the fields
	    this.query["$text"] = {};
	    if (typeof search === "string") {
	        this.query["$text"]["$search"] = search;
	    }

	    if (language !== null && typeof language !== "undefined" && typeof language === "string") {
	        this.query["$text"]["$language"] = language;
	    }

	    if (caseSensitive !== null && typeof caseSensitive !== "undefined" && typeof caseSensitive === "boolean") {
	        this.query["$text"]["$caseSensitive"] = caseSensitive;
	    }

	    if (diacriticSensitive !== null && typeof diacriticSensitive !== "undefined" && typeof diacriticSensitive === "boolean") {
	        this.query["$text"]["$diacriticSensitive"] = diacriticSensitive;
	    }

	    return this;
	};

	// Logical operations
	_CB2.default.CloudQuery.or = function (obj1, obj2) {

	    var tableName;
	    var queryArray = [];

	    if (Object.prototype.toString.call(obj1) === "[object Array]") {
	        tableName = obj1[0].tableName;
	        for (var i = 0; i < obj1.length; ++i) {
	            if (obj1[i].tableName != tableName) {
	                throw "Table names are not same";
	                break;
	            }
	            if (!obj1[i] instanceof _CB2.default.CloudQuery) {
	                throw "Array items are not instanceof of CloudQuery";
	                break;
	            }
	            queryArray.push(obj1[i].query);
	        }
	    }

	    if (typeof obj2 !== 'undefined' && typeof obj1 !== 'undefined' && Object.prototype.toString.call(obj1) !== "[object Array]") {

	        if (Object.prototype.toString.call(obj2) === "[object Array]") {
	            throw "First and second parameter should be an instance of CloudQuery object";
	        }
	        if (!obj1.tableName === obj2.tableName) {
	            throw "Table names are not same";
	        }
	        if (!obj1 instanceof _CB2.default.CloudQuery) {
	            throw "Data passed is not an instance of CloudQuery";
	        }
	        if (!obj2 instanceof _CB2.default.CloudQuery) {
	            throw "Data passed is not an instance of CloudQuery";
	        }
	        tableName = obj1.tableName;
	        queryArray.push(obj1.query);
	        queryArray.push(obj2.query);
	    }
	    if (typeof tableName === 'undefined') {
	        throw "Invalid operation";
	    }
	    var obj = new _CB2.default.CloudQuery(tableName);
	    obj.query["$or"] = queryArray;
	    return obj;
	};

	_CB2.default.CloudQuery.prototype.equalTo = function (columnName, data) {

	    if (columnName === 'id') columnName = '_' + columnName;

	    if (data !== null) {
	        if (data.constructor === _CB2.default.CloudObject) {
	            columnName = columnName + '._id';
	            data = data.get('id');
	        }

	        this.query[columnName] = data;
	    } else {

	        //This is for people who code : obj.equalTo('column', null);
	        this.doesNotExists(columnName);
	    }

	    return this;
	};

	_CB2.default.CloudQuery.prototype.includeList = function (columnName) {
	    if (columnName === 'id') columnName = '_' + columnName;

	    this.query.$includeList.push(columnName);

	    return this;
	};

	_CB2.default.CloudQuery.prototype.include = function (columnName) {
	    if (columnName === 'id') columnName = '_' + columnName;

	    this.query.$include.push(columnName);

	    return this;
	};

	_CB2.default.CloudQuery.prototype.all = function (columnName) {
	    if (columnName === 'id') columnName = '_' + columnName;

	    this.query.$all = columnName;

	    return this;
	};

	_CB2.default.CloudQuery.prototype.any = function (columnName) {
	    if (columnName === 'id') columnName = '_' + columnName;

	    this.query.$any = columnName;

	    return this;
	};

	_CB2.default.CloudQuery.prototype.first = function (columnName) {
	    if (columnName === 'id') columnName = '_' + columnName;

	    this.query.$first = columnName;

	    return this;
	};

	_CB2.default.CloudQuery.prototype.notEqualTo = function (columnName, data) {
	    if (columnName === 'id') columnName = '_' + columnName;

	    if (data !== null) {

	        if (data.constructor === _CB2.default.CloudObject) {
	            columnName = columnName + '._id';
	            data = data.get('id');
	        }

	        this.query[columnName] = {
	            $ne: data
	        };
	    } else {
	        //This is for people who code : obj.notEqualTo('column', null);
	        this.exists(columnName);
	    }

	    return this;
	};
	_CB2.default.CloudQuery.prototype.greaterThan = function (columnName, data) {

	    if (columnName === 'id') columnName = '_' + columnName;

	    if (!this.query[columnName]) {
	        this.query[columnName] = {};
	    }
	    this.query[columnName]["$gt"] = data;

	    return this;
	};
	_CB2.default.CloudQuery.prototype.greaterThanEqualTo = function (columnName, data) {

	    if (columnName === 'id') columnName = '_' + columnName;

	    if (!this.query[columnName]) {
	        this.query[columnName] = {};
	    }
	    this.query[columnName]["$gte"] = data;

	    return this;
	};
	_CB2.default.CloudQuery.prototype.lessThan = function (columnName, data) {

	    if (columnName === 'id') columnName = '_' + columnName;

	    if (!this.query[columnName]) {
	        this.query[columnName] = {};
	    }
	    this.query[columnName]["$lt"] = data;

	    return this;
	};
	_CB2.default.CloudQuery.prototype.lessThanEqualTo = function (columnName, data) {

	    if (columnName === 'id') columnName = '_' + columnName;

	    if (!this.query[columnName]) {
	        this.query[columnName] = {};
	    }
	    this.query[columnName]["$lte"] = data;

	    return this;
	};

	//Sorting
	_CB2.default.CloudQuery.prototype.orderByAsc = function (columnName) {

	    if (columnName === 'id') columnName = '_' + columnName;

	    this.sort[columnName] = 1;

	    return this;
	};

	_CB2.default.CloudQuery.prototype.orderByDesc = function (columnName) {

	    if (columnName === 'id') columnName = '_' + columnName;

	    this.sort[columnName] = -1;

	    return this;
	};

	//Limit and skip
	_CB2.default.CloudQuery.prototype.setLimit = function (data) {

	    this.limit = data;
	    return this;
	};
	_CB2.default.CloudQuery.prototype.setSkip = function (data) {
	    this.skip = data;
	    return this;
	};

	_CB2.default.CloudQuery.prototype.paginate = function (pageNo, totalItemsInPage, callback) {

	    if (!_CB2.default.appId) {
	        throw "CB.appId is null.";
	    }
	    if (!this.tableName) {
	        throw "TableName is null.";
	    }
	    var def;
	    var callback;
	    if ((typeof callback === "undefined" ? "undefined" : _typeof(callback)) === 'object' && typeof callback.success === 'function') {
	        callback = callback;
	    }
	    if (!callback) {
	        def = new _CB2.default.Promise();
	    }

	    if (pageNo && (typeof pageNo === "undefined" ? "undefined" : _typeof(pageNo)) === 'object' && typeof pageNo.success === 'function') {
	        callback = pageNo;
	        pageNo = null;
	    }
	    if (totalItemsInPage && (typeof totalItemsInPage === "undefined" ? "undefined" : _typeof(totalItemsInPage)) === 'object' && typeof totalItemsInPage.success === 'function') {
	        callback = totalItemsInPage;
	        totalItemsInPage = null;
	    }

	    if (pageNo && typeof pageNo === 'number' && pageNo > 0) {
	        if (typeof totalItemsInPage === 'number' && totalItemsInPage > 0) {
	            var skip = pageNo * totalItemsInPage - totalItemsInPage;
	            this.setSkip(skip);
	            this.setLimit(totalItemsInPage);
	        }
	    }

	    if (totalItemsInPage && typeof totalItemsInPage === 'number' && totalItemsInPage > 0) {
	        this.setLimit(totalItemsInPage);
	    }
	    var thisObj = this;

	    var promises = [];
	    promises.push(this.find());

	    var countQuery = Object.create(this);
	    countQuery.setSkip(0);
	    countQuery.setLimit(99999999);

	    promises.push(countQuery.count());

	    _CB2.default.Promise.all(promises).then(function (list) {
	        var objectsList = null;
	        var count = null;
	        var totalPages = 0;

	        if (list && list.length > 0) {
	            objectsList = list[0];
	            count = list[1];
	            if (!count) {
	                count = 0;
	                totalPages = 0;
	            } else {
	                totalPages = Math.ceil(count / thisObj.limit);
	            }
	            if (totalPages && totalPages < 0) {
	                totalPages = 0;
	            }
	        }
	        if (callback) {
	            callback.success(objectsList, count, totalPages);
	        } else {
	            def.resolve(objectsList, count, totalPages);
	        }
	    }, function (error) {
	        if (callback) {
	            callback.error(error);
	        } else {
	            def.reject(error);
	        }
	    });

	    if (!callback) {
	        return def;
	    }
	};

	//select/deselect columns to show
	_CB2.default.CloudQuery.prototype.selectColumn = function (columnNames) {

	    if (Object.keys(this.select).length === 0) {
	        this.select = {
	            _id: 1,
	            createdAt: 1,
	            updatedAt: 1,
	            ACL: 1,
	            _type: 1,
	            _tableName: 1
	        };
	    }

	    if (Object.prototype.toString.call(columnNames) === '[object Object]') {
	        this.select = columnNames;
	    } else if (Object.prototype.toString.call(columnNames) === '[object Array]') {
	        for (var i = 0; i < columnNames.length; i++) {
	            this.select[columnNames[i]] = 1;
	        }
	    } else {
	        this.select[columnNames] = 1;
	    }

	    return this;
	};

	_CB2.default.CloudQuery.prototype.doNotSelectColumn = function (columnNames) {
	    if (Object.prototype.toString.call(columnNames) === '[object Object]') {
	        this.select = columnNames;
	    } else if (Object.prototype.toString.call(columnNames) === '[object Array]') {
	        for (var i = 0; i < columnNames.length; i++) {
	            this.select[columnNames[i]] = 0;
	        }
	    } else {
	        this.select[columnNames] = 0;
	    }

	    return this;
	};

	_CB2.default.CloudQuery.prototype.containedIn = function (columnName, data) {

	    var isCloudObject = false;

	    var CbData = [];
	    if (columnName === 'id') columnName = '_' + columnName;

	    if (Object.prototype.toString.call(data) === '[object Object]' && !data instanceof _CB2.default.CloudObject) {
	        //if object is passed as an argument
	        throw 'Array / value / CloudObject expected as an argument';
	    }

	    if (Object.prototype.toString.call(data) === '[object Array]') {
	        //if array is passed, then replace the whole

	        for (var i = 0; i < data.length; i++) {
	            if (data[i] instanceof _CB2.default.CloudObject) {
	                isCloudObject = true;
	                if (!data[i].id) {
	                    throw "CloudObject passed should be saved and should have an id before being passed to containedIn";
	                }
	                CbData.push(data[i].id);
	            }
	        }
	        if (CbData.length === 0) {
	            CbData = data;
	        }

	        if (isCloudObject) {
	            columnName = columnName + '._id';
	        }

	        if (!this.query[columnName]) {
	            this.query[columnName] = {};
	        }

	        this.query[columnName]["$in"] = CbData;
	        var thisObj = this;
	        if (typeof this.query[columnName]["$nin"] !== 'undefined') {
	            //for removing dublicates
	            CbData.forEach(function (val) {
	                if ((index = thisObj.query[columnName]["$nin"].indexOf(val)) >= 0) {
	                    thisObj.query[columnName]["$nin"].splice(index, 1);
	                }
	            });
	        }
	    } else {
	        //if the argument is a string then push if it is not present already


	        if (data instanceof _CB2.default.CloudObject) {

	            if (!data.id) {
	                throw "CloudObject passed should be saved and should have an id before being passed to containedIn";
	            }

	            columnName = columnName + '._id';
	            CbData = data.id;
	        } else CbData = data;

	        if (!this.query[columnName]) {
	            this.query[columnName] = {};
	        }

	        if (!this.query[columnName]["$in"]) {
	            this.query[columnName]["$in"] = [];
	        }
	        if (this.query[columnName]["$in"].indexOf(CbData) === -1) {
	            this.query[columnName]["$in"].push(CbData);
	        }
	        if (typeof this.query[columnName]["$nin"] !== 'undefined') {
	            if ((index = this.query[columnName]["$nin"].indexOf(CbData)) >= 0) {
	                this.query[columnName]["$nin"].splice(index, 1);
	            }
	        }
	    }

	    return this;
	};

	_CB2.default.CloudQuery.prototype.notContainedIn = function (columnName, data) {

	    var isCloudObject = false;

	    var CbData = [];
	    if (columnName === 'id') columnName = '_' + columnName;

	    if (Object.prototype.toString.call(data) === '[object Object]' && !data instanceof _CB2.default.CloudObject) {
	        //if object is passed as an argument
	        throw 'Array or string expected as an argument';
	    }

	    if (Object.prototype.toString.call(data) === '[object Array]') {
	        //if array is passed, then replace the whole

	        for (var i = 0; i < data.length; i++) {
	            if (data[i] instanceof _CB2.default.CloudObject) {
	                isCloudObject = true;
	                if (!data[i].id) {
	                    throw "CloudObject passed should be saved and should have an id before being passed to notContainedIn";
	                }

	                CbData.push(data[i].id);
	            }
	        }
	        if (CbData.length === 0) {
	            CbData = data;
	        }

	        if (isCloudObject) {
	            columnName = columnName + '._id';
	        }

	        if (!this.query[columnName]) {
	            this.query[columnName] = {};
	        }

	        this.query[columnName]["$nin"] = CbData;
	        if (typeof this.query[columnName]["$in"] !== 'undefined') {
	            //for removing duplicates
	            thisObj = this;
	            CbData.forEach(function (val) {
	                if ((index = thisObj.query[columnName]["$in"].indexOf(val)) >= 0) {
	                    thisObj.query[columnName]["$in"].splice(index, 1);
	                }
	            });
	        }
	    } else {
	        //if the argument is a string then push if it is not present already

	        if (data instanceof _CB2.default.CloudObject) {

	            if (!data.id) {
	                throw "CloudObject passed should be saved and should have an id before being passed to notContainedIn";
	            }

	            columnName = columnName + '._id';
	            CbData = data.id;
	        } else CbData = data;

	        if (!this.query[columnName]) {
	            this.query[columnName] = {};
	        }

	        if (!this.query[columnName]["$nin"]) {
	            this.query[columnName]["$nin"] = [];
	        }
	        if (this.query[columnName]["$nin"].indexOf(CbData) === -1) {
	            this.query[columnName]["$nin"].push(CbData);
	        }
	        if (typeof this.query[columnName]["$in"] !== 'undefined') {
	            if ((index = this.query[columnName]["$in"].indexOf(CbData)) >= 0) {
	                this.query[columnName]["$in"].splice(index, 1);
	            }
	        }
	    }

	    return this;
	};

	_CB2.default.CloudQuery.prototype.exists = function (columnName) {
	    if (columnName === 'id') columnName = '_' + columnName;

	    if (!this.query[columnName]) {
	        this.query[columnName] = {};
	    }
	    this.query[columnName]["$exists"] = true;

	    return this;
	};

	_CB2.default.CloudQuery.prototype.doesNotExists = function (columnName) {
	    if (columnName === 'id') columnName = '_' + columnName;

	    if (!this.query[columnName]) {
	        this.query[columnName] = {};
	    }
	    this.query[columnName]["$exists"] = false;

	    return this;
	};

	_CB2.default.CloudQuery.prototype.containsAll = function (columnName, data) {

	    var isCloudObject = false;

	    var CbData = [];

	    if (columnName === 'id') columnName = '_' + columnName;

	    if (Object.prototype.toString.call(data) === '[object Object]' && !data instanceof _CB2.default.CloudObject) {
	        //if object is passed as an argument
	        throw 'Array or string expected as an argument';
	    }

	    if (Object.prototype.toString.call(data) === '[object Array]') {
	        //if array is passed, then replace the whole


	        for (var i = 0; i < data.length; i++) {
	            if (data[i] instanceof _CB2.default.CloudObject) {

	                isCloudObject = true;

	                if (!data[i].id) {
	                    throw "CloudObject passed should be saved and should have an id before being passed to containsAll";
	                }

	                CbData.push(data[i].id);
	            }
	        }

	        if (CbData.length === 0) {
	            CbData = data;
	        }

	        if (isCloudObject) {
	            columnName = columnName + '._id';
	        }

	        if (!this.query[columnName]) {
	            this.query[columnName] = {};
	        }

	        this.query[columnName]["$all"] = CbData;
	    } else {
	        //if the argument is a string then push if it is not present already

	        if (data instanceof _CB2.default.CloudObject) {

	            if (!data.id) {
	                throw "CloudObject passed should be saved and should have an id before being passed to containsAll";
	            }

	            columnName = columnName + '._id';
	            CbData = data.id;
	        } else CbData = data;

	        if (!this.query[columnName]) {
	            this.query[columnName] = {};
	        }

	        if (!this.query[columnName]["$all"]) {
	            this.query[columnName]["$all"] = [];
	        }
	        if (this.query[columnName]["$all"].indexOf(CbData) === -1) {
	            this.query[columnName]["$all"].push(CbData);
	        }
	    }

	    return this;
	};

	_CB2.default.CloudQuery.prototype.startsWith = function (columnName, value) {
	    if (columnName === 'id') columnName = '_' + columnName;

	    var regex = '^' + value;
	    if (!this.query[columnName]) {
	        this.query[columnName] = {};
	    }

	    this.query[columnName]["$regex"] = regex;
	    this.query[columnName]["$options"] = 'im';

	    return this;
	};

	_CB2.default.CloudQuery.prototype.regex = function (columnName, value, isCaseInsensitive) {
	    if (columnName === 'id') columnName = '_' + columnName;

	    if (!this.query[columnName]) {
	        this.query[columnName] = {};
	    }

	    this.query[columnName]["$regex"] = value;

	    if (isCaseInsensitive) {
	        this.query[columnName]["$options"] = "i";
	    }

	    return this;
	};

	_CB2.default.CloudQuery.prototype.substring = function (columnName, value, isCaseInsensitive) {

	    if (typeof columnName === "string") {
	        columnName = [columnName];
	    }

	    for (var j = 0; j < columnName.length; j++) {
	        if (Object.prototype.toString.call(value) === '[object Array]' && value.length > 0) {
	            if (!this.query["$or"]) this.query["$or"] = [];
	            for (i = 0; i < value.length; i++) {
	                var obj = {};
	                obj[columnName[j]] = {};
	                obj[columnName[j]]["$regex"] = ".*" + value[i] + ".*";

	                if (isCaseInsensitive) {
	                    obj[columnName[j]]["$options"] = "i";
	                }

	                this.query["$or"].push(obj);
	            }
	        } else {
	            if (columnName.length === 1) {
	                this.regex(columnName[j], ".*" + value + ".*", isCaseInsensitive);
	            } else {
	                if (!this.query["$or"]) this.query["$or"] = [];
	                var obj = {};
	                obj[columnName[j]] = {};
	                obj[columnName[j]]["$regex"] = ".*" + value + ".*";

	                if (isCaseInsensitive) {
	                    obj[columnName[j]]["$options"] = "i";
	                }

	                this.query["$or"].push(obj);
	            }
	        }
	    }

	    return this;
	};

	//GeoPoint near query
	_CB2.default.CloudQuery.prototype.near = function (columnName, geoPoint, maxDistance, minDistance) {
	    if (!this.query[columnName]) {
	        this.query[columnName] = {};
	        this.query[columnName]['$near'] = {
	            '$geometry': { coordinates: geoPoint['document'].coordinates, type: 'Point' },
	            '$maxDistance': maxDistance,
	            '$minDistance': minDistance
	        };
	    }
	};

	//GeoPoint geoWithin query
	_CB2.default.CloudQuery.prototype.geoWithin = function (columnName, geoPoint, radius) {

	    if (!radius) {
	        var coordinates = [];
	        //extracting coordinates from each CloudGeoPoint Object
	        if (Object.prototype.toString.call(geoPoint) === '[object Array]') {
	            for (var i = 0; i < geoPoint.length; i++) {
	                if (geoPoint[i]['document'].hasOwnProperty('coordinates')) {
	                    coordinates[i] = geoPoint[i]['document']['coordinates'];
	                }
	            }
	        } else {
	            throw 'Invalid Parameter, coordinates should be an array of CloudGeoPoint Object';
	        }
	        //2dSphere needs first and last coordinates to be same for polygon type
	        //eg. for Triangle four coordinates need to pass, three points of triangle and fourth one should be same as first one
	        coordinates[coordinates.length] = coordinates[0];
	        var type = 'Polygon';
	        if (!this.query[columnName]) {
	            this.query[columnName] = {};
	            this.query[columnName]['$geoWithin'] = {};
	            this.query[columnName]['$geoWithin']['$geometry'] = {
	                'type': type,
	                'coordinates': [coordinates]
	            };
	        }
	    } else {
	        if (!this.query[columnName]) {
	            this.query[columnName] = {};
	            this.query[columnName]['$geoWithin'] = {
	                '$centerSphere': [geoPoint['document']['coordinates'], radius / 3963.2]
	            };
	        }
	    }
	};

	_CB2.default.CloudQuery.prototype.count = function (callback) {
	    if (!_CB2.default.appId) {
	        throw "CB.appId is null.";
	    }
	    if (!this.tableName) {
	        throw "TableName is null.";
	    }
	    var def;
	    if (!callback) {
	        def = new _CB2.default.Promise();
	    }
	    var thisObj = this;
	    var params = JSON.stringify({
	        query: thisObj.query,
	        limit: thisObj.limit,
	        skip: thisObj.skip,
	        key: _CB2.default.appKey
	    });
	    var url = _CB2.default.apiUrl + "/data/" + _CB2.default.appId + "/" + thisObj.tableName + '/count';

	    _CB2.default._request('POST', url, params).then(function (response) {
	        response = parseInt(response);
	        if (callback) {
	            callback.success(response);
	        } else {
	            def.resolve(response);
	        }
	    }, function (err) {
	        if (callback) {
	            callback.error(err);
	        } else {
	            def.reject(err);
	        }
	    });

	    if (!callback) {
	        return def;
	    }
	};

	_CB2.default.CloudQuery.prototype.distinct = function (keys, callback) {

	    if (keys === 'id') {
	        keys = '_id';
	    }

	    if (!_CB2.default.appId) {
	        throw "CB.appId is null.";
	    }
	    if (!this.tableName) {
	        throw "TableName is null.";
	    }
	    if (Object.prototype.toString.call(keys) !== '[object Array]' && keys.length <= 0) {
	        throw "keys should be array";
	    }
	    var def;
	    if (!callback) {
	        def = new _CB2.default.Promise();
	    }

	    var thisObj = this;

	    var params = JSON.stringify({
	        onKey: keys,
	        query: thisObj.query,
	        select: thisObj.select,
	        sort: thisObj.sort,
	        limit: thisObj.limit,
	        skip: thisObj.skip,
	        key: _CB2.default.appKey
	    });
	    var url = _CB2.default.apiUrl + "/data/" + _CB2.default.appId + "/" + thisObj.tableName + '/distinct';

	    _CB2.default._request('POST', url, params).then(function (response) {
	        var object = _CB2.default.fromJSON(JSON.parse(response));
	        if (callback) {
	            callback.success(object);
	        } else {
	            def.resolve(object);
	        }
	    }, function (err) {
	        if (callback) {
	            callback.error(err);
	        } else {
	            def.reject(err);
	        }
	    });

	    if (!callback) {
	        return def;
	    }
	};

	_CB2.default.CloudQuery.prototype.find = function (callback) {
	    //find the document(s) matching the given query
	    if (!_CB2.default.appId) {
	        throw "CB.appId is null.";
	    }
	    if (!this.tableName) {
	        throw "TableName is null.";
	    }
	    var def;
	    if (!callback) {
	        def = new _CB2.default.Promise();
	    }

	    var thisObj = this;

	    var xmlhttp = _CB2.default._loadXml();
	    var params = JSON.stringify({
	        query: thisObj.query,
	        select: thisObj.select,
	        sort: thisObj.sort,
	        limit: thisObj.limit,
	        skip: thisObj.skip,
	        key: _CB2.default.appKey
	    });

	    var url = _CB2.default.apiUrl + "/data/" + _CB2.default.appId + "/" + thisObj.tableName + '/find';

	    _CB2.default._request('POST', url, params).then(function (response) {
	        var object = _CB2.default.fromJSON(JSON.parse(response));
	        if (callback) {
	            callback.success(object);
	        } else {
	            def.resolve(object);
	        }
	    }, function (err) {
	        if (callback) {
	            callback.error(err);
	        } else {
	            def.reject(err);
	        }
	    });

	    if (!callback) {
	        return def;
	    }
	};

	_CB2.default.CloudQuery.prototype.get = function (objectId, callback) {
	    var query = new _CB2.default.CloudQuery(this.tableName);
	    return query.findById(objectId, callback);
	};

	_CB2.default.CloudQuery.prototype.findById = function (objectId, callback) {
	    //find the document(s) matching the given query

	    var thisObj = this;

	    if (!_CB2.default.appId) {
	        throw "CB.appId is null.";
	    }
	    if (!this.tableName) {
	        throw "TableName is null.";
	    }
	    var def;
	    if (!callback) {
	        def = new _CB2.default.Promise();
	    }

	    if (thisObj.skip && !thisObj.skip !== 0) {
	        throw "You cannot use skip and find object by Id in the same query";
	    }

	    if (thisObj.limit && thisObj.limit === 0) {
	        throw "You cannot use limit and find object by Id in the same query";
	    }

	    if (thisObj.sort && Object.getOwnPropertyNames(thisObj.sort).length > 0) {
	        throw "You cannot use sort and find object by Id in the same query";
	    }

	    thisObj.equalTo('id', objectId);

	    var params = JSON.stringify({
	        query: thisObj.query,
	        select: thisObj.select,
	        key: _CB2.default.appKey,
	        limit: 1,
	        skip: 0,
	        sort: {}
	    });

	    var url = _CB2.default.apiUrl + "/data/" + _CB2.default.appId + "/" + thisObj.tableName + '/find';

	    _CB2.default._request('POST', url, params).then(function (response) {
	        response = JSON.parse(response);
	        if (Object.prototype.toString.call(response) === '[object Array]') {
	            response = response[0];
	        }
	        if (callback) {
	            callback.success(_CB2.default.fromJSON(response));
	        } else {
	            def.resolve(_CB2.default.fromJSON(response));
	        }
	    }, function (err) {
	        if (callback) {
	            callback.error(err);
	        } else {
	            def.reject(err);
	        }
	    });

	    if (!callback) {
	        return def;
	    }
	};
	_CB2.default.CloudQuery.prototype.findOne = function (callback) {
	    //find a single document matching the given query
	    if (!_CB2.default.appId) {
	        throw "CB.appId is null.";
	    }
	    if (!this.tableName) {
	        throw "TableName is null.";
	    }
	    var def;
	    if (!callback) {
	        def = new _CB2.default.Promise();
	    }
	    var params = JSON.stringify({
	        query: this.query,
	        select: this.select,
	        sort: this.sort,
	        skip: this.skip,
	        key: _CB2.default.appKey
	    });
	    var url = _CB2.default.apiUrl + "/data/" + _CB2.default.appId + "/" + this.tableName + '/findOne';

	    _CB2.default._request('POST', url, params).then(function (response) {
	        var object = _CB2.default.fromJSON(JSON.parse(response));
	        if (callback) {
	            callback.success(object);
	        } else {
	            def.resolve(object);
	        }
	    }, function (err) {
	        if (callback) {
	            callback.error(err);
	        } else {
	            def.reject(err);
	        }
	    });

	    if (!callback) {
	        return def;
	    }
	};

	_CB2.default.CloudQuery._validateQuery = function (cloudObject, query) {
	    //validate query. 
	    for (var key in query) {

	        if (query[key]) {
	            var value = query[key];
	            if ((typeof value === "undefined" ? "undefined" : _typeof(value)) === 'object') {

	                if (key === '$or') {
	                    if (query[key].length > 0) {
	                        var isTrue = false;
	                        for (var i = 0; i < query[key].length; i++) {
	                            if (_CB2.default.CloudQuery._validateQuery(cloudObject, query[key][i])) {
	                                isTrue = true;
	                                break;
	                            }
	                        }

	                        if (!isTrue) {
	                            return false;
	                        }
	                    }
	                } else {

	                    for (var objectKeys in value) {
	                        //not equalTo query
	                        if (objectKeys === '$ne') {
	                            if (cloudObject.get(key) === query[key]['$ne']) {
	                                return false;
	                            }
	                        }

	                        //greater than
	                        if (objectKeys === '$gt') {
	                            if (cloudObject.get(key) <= query[key]['$gt']) {
	                                return false;
	                            }
	                        }

	                        //less than
	                        if (objectKeys === '$lt') {
	                            if (cloudObject.get(key) >= query[key]['$lt']) {
	                                return false;
	                            }
	                        }

	                        //greater than and equalTo. 
	                        if (objectKeys === '$gte') {
	                            if (cloudObject.get(key) < query[key]['$gte']) {
	                                return false;
	                            }
	                        }

	                        //less than and equalTo. 
	                        if (objectKeys === '$lte') {
	                            if (cloudObject.get(key) > query[key]['$lte']) {
	                                return false;
	                            }
	                        }

	                        //exists 
	                        if (objectKeys === '$exists') {
	                            if (query[key][objectKeys] && cloudObject.get(key)) {
	                                //do nothing.
	                            } else if (query[key][objectKeys] !== false) {
	                                return false;
	                            }
	                        }

	                        //doesNot exists. 
	                        if (objectKeys === '$exists') {
	                            if (!query[key][objectKeys] && cloudObject.get(key)) {
	                                return false;
	                            }
	                        }

	                        //startsWith. 
	                        if (objectKeys === '$regex') {

	                            var reg = new RegExp(query[key][objectKeys]);

	                            if (!query[key]['$options']) {
	                                if (!reg.test(cloudObject.get(key))) //test actial regex. 
	                                    return false;
	                            } else {
	                                if (query[key]['$options'] === 'im') {
	                                    //test starts with.
	                                    //starts with.
	                                    var value = trimStart('^', query[key][objectKeys]);
	                                    if (cloudObject.get(key).indexOf(value) !== 0) return false;
	                                }
	                            }
	                        }

	                        //containedIn. 
	                        if (objectKeys === '$in') {

	                            if (query[key][objectKeys]) {
	                                var arr = query[key][objectKeys];
	                                var value = null;
	                                if (key.indexOf('.') > -1) {
	                                    //for CloudObjects
	                                    value = cloudObject.get(key.substr(0, key.indexOf('.')));
	                                } else {
	                                    value = cloudObject.get(key);
	                                }

	                                if (Object.prototype.toString.call(value) === '[object Array]') {
	                                    var exists = false;
	                                    for (var i = 0; i < value.length; i++) {
	                                        if (value[i] instanceof _CB2.default.CloudObject) {
	                                            if (arr.indexOf(value[i].id) > -1) {
	                                                exists = true;
	                                                break;
	                                            }
	                                        } else {
	                                            if (arr.indexOf(value[i]) > -1) {
	                                                exists = true;
	                                                break;
	                                            }
	                                        }
	                                    }

	                                    if (!exists) {
	                                        return false;
	                                    }
	                                } else {
	                                    //if the element is not in the array then return false;
	                                    if (arr.indexOf(value) === -1) return false;
	                                }
	                            }
	                        }

	                        //doesNot containedIn. 
	                        if (objectKeys === '$nin') {
	                            if (query[key][objectKeys]) {
	                                var arr = query[key][objectKeys];
	                                var value = null;
	                                if (key.indexOf('.') > -1) {
	                                    //for CloudObjects
	                                    value = cloudObject.get(key.substr(0, key.indexOf('.')));
	                                } else {
	                                    value = cloudObject.get(key);
	                                }

	                                if (Object.prototype.toString.call(value) === '[object Array]') {
	                                    var exists = false;
	                                    for (var i = 0; i < value.length; i++) {
	                                        if (value[i] instanceof _CB2.default.CloudObject) {
	                                            if (arr.indexOf(value[i].id) !== -1) {
	                                                exists = true;
	                                                break;
	                                            }
	                                        } else {
	                                            if (arr.indexOf(value[i]) !== -1) {
	                                                exists = true;
	                                                break;
	                                            }
	                                        }
	                                    }

	                                    if (exists) {
	                                        return false;
	                                    }
	                                } else {
	                                    //if the element is not in the array then return false;
	                                    if (arr.indexOf(value) !== -1) return false;
	                                }
	                            }
	                        }

	                        //containsAll. 
	                        if (objectKeys === '$all') {
	                            if (query[key][objectKeys]) {
	                                var arr = query[key][objectKeys];
	                                var value = null;
	                                if (key.indexOf('.') > -1) {
	                                    //for CloudObjects
	                                    value = cloudObject.get(key.substr(0, key.indexOf('.')));
	                                } else {
	                                    value = cloudObject.get(key);
	                                }

	                                if (Object.prototype.toString.call(value) === '[object Array]') {
	                                    for (var i = 0; i < value.length; i++) {
	                                        if (value[i] instanceof _CB2.default.CloudObject) {
	                                            if (arr.indexOf(value[i].id) === -1) {
	                                                return false;
	                                            }
	                                        } else {
	                                            if (arr.indexOf(value[i]) === -1) {
	                                                return false;
	                                            }
	                                        }
	                                    }
	                                } else {
	                                    //if the element is not in the array then return false;
	                                    if (arr.indexOf(value) === -1) return false;
	                                }
	                            }
	                        }
	                    }
	                }
	            } else {
	                //it might be a plain equalTo query. 
	                if (key.indexOf('.') !== -1) {
	                    // for keys with "key._id" - This is for CloudObjects.
	                    var temp = key.substring(0, key.indexOf('.'));
	                    if (!cloudObject.get(temp)) {
	                        return false;
	                    }

	                    if (cloudObject.get(temp).id !== query[key]) {
	                        return false;
	                    }
	                } else {
	                    if (cloudObject.get(key) !== query[key]) {
	                        return false;
	                    }
	                }
	            }
	        }
	    }

	    return true;
	};

	exports.default = true;

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * Module dependencies.
	 */

	var url = __webpack_require__(58);
	var parser = __webpack_require__(63);
	var Manager = __webpack_require__(73);
	var debug = __webpack_require__(60)('socket.io-client');

	/**
	 * Module exports.
	 */

	module.exports = exports = lookup;

	/**
	 * Managers cache.
	 */

	var cache = exports.managers = {};

	/**
	 * Looks up an existing `Manager` for multiplexing.
	 * If the user summons:
	 *
	 *   `io('http://localhost/a');`
	 *   `io('http://localhost/b');`
	 *
	 * We reuse the existing instance based on same scheme/port/host,
	 * and we initialize sockets for each namespace.
	 *
	 * @api public
	 */

	function lookup (uri, opts) {
	  if (typeof uri === 'object') {
	    opts = uri;
	    uri = undefined;
	  }

	  opts = opts || {};

	  var parsed = url(uri);
	  var source = parsed.source;
	  var id = parsed.id;
	  var path = parsed.path;
	  var sameNamespace = cache[id] && path in cache[id].nsps;
	  var newConnection = opts.forceNew || opts['force new connection'] ||
	                      false === opts.multiplex || sameNamespace;

	  var io;

	  if (newConnection) {
	    debug('ignoring socket cache for %s', source);
	    io = Manager(source, opts);
	  } else {
	    if (!cache[id]) {
	      debug('new io instance for %s', source);
	      cache[id] = Manager(source, opts);
	    }
	    io = cache[id];
	  }
	  if (parsed.query && !opts.query) {
	    opts.query = parsed.query;
	  } else if (opts && 'object' === typeof opts.query) {
	    opts.query = encodeQueryString(opts.query);
	  }
	  return io.socket(parsed.path, opts);
	}
	/**
	 *  Helper method to parse query objects to string.
	 * @param {object} query
	 * @returns {string}
	 */
	function encodeQueryString (obj) {
	  var str = [];
	  for (var p in obj) {
	    if (obj.hasOwnProperty(p)) {
	      str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
	    }
	  }
	  return str.join('&');
	}
	/**
	 * Protocol version.
	 *
	 * @api public
	 */

	exports.protocol = parser.protocol;

	/**
	 * `connect`.
	 *
	 * @param {String} uri
	 * @api public
	 */

	exports.connect = lookup;

	/**
	 * Expose constructors for standalone build.
	 *
	 * @api public
	 */

	exports.Manager = __webpack_require__(73);
	exports.Socket = __webpack_require__(103);


/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {
	/**
	 * Module dependencies.
	 */

	var parseuri = __webpack_require__(59);
	var debug = __webpack_require__(60)('socket.io-client:url');

	/**
	 * Module exports.
	 */

	module.exports = url;

	/**
	 * URL parser.
	 *
	 * @param {String} url
	 * @param {Object} An object meant to mimic window.location.
	 *                 Defaults to window.location.
	 * @api public
	 */

	function url (uri, loc) {
	  var obj = uri;

	  // default to window.location
	  loc = loc || global.location;
	  if (null == uri) uri = loc.protocol + '//' + loc.host;

	  // relative path support
	  if ('string' === typeof uri) {
	    if ('/' === uri.charAt(0)) {
	      if ('/' === uri.charAt(1)) {
	        uri = loc.protocol + uri;
	      } else {
	        uri = loc.host + uri;
	      }
	    }

	    if (!/^(https?|wss?):\/\//.test(uri)) {
	      debug('protocol-less url %s', uri);
	      if ('undefined' !== typeof loc) {
	        uri = loc.protocol + '//' + uri;
	      } else {
	        uri = 'https://' + uri;
	      }
	    }

	    // parse
	    debug('parse %s', uri);
	    obj = parseuri(uri);
	  }

	  // make sure we treat `localhost:80` and `localhost` equally
	  if (!obj.port) {
	    if (/^(http|ws)$/.test(obj.protocol)) {
	      obj.port = '80';
	    } else if (/^(http|ws)s$/.test(obj.protocol)) {
	      obj.port = '443';
	    }
	  }

	  obj.path = obj.path || '/';

	  var ipv6 = obj.host.indexOf(':') !== -1;
	  var host = ipv6 ? '[' + obj.host + ']' : obj.host;

	  // define unique id
	  obj.id = obj.protocol + '://' + host + ':' + obj.port;
	  // define href
	  obj.href = obj.protocol + '://' + host + (loc && loc.port === obj.port ? '' : (':' + obj.port));

	  return obj;
	}

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 59 */
/***/ function(module, exports) {

	/**
	 * Parses an URI
	 *
	 * @author Steven Levithan <stevenlevithan.com> (MIT license)
	 * @api private
	 */

	var re = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;

	var parts = [
	    'source', 'protocol', 'authority', 'userInfo', 'user', 'password', 'host', 'port', 'relative', 'path', 'directory', 'file', 'query', 'anchor'
	];

	module.exports = function parseuri(str) {
	    var src = str,
	        b = str.indexOf('['),
	        e = str.indexOf(']');

	    if (b != -1 && e != -1) {
	        str = str.substring(0, b) + str.substring(b, e).replace(/:/g, ';') + str.substring(e, str.length);
	    }

	    var m = re.exec(str || ''),
	        uri = {},
	        i = 14;

	    while (i--) {
	        uri[parts[i]] = m[i] || '';
	    }

	    if (b != -1 && e != -1) {
	        uri.source = src;
	        uri.host = uri.host.substring(1, uri.host.length - 1).replace(/;/g, ':');
	        uri.authority = uri.authority.replace('[', '').replace(']', '').replace(/;/g, ':');
	        uri.ipv6uri = true;
	    }

	    return uri;
	};


/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {
	/**
	 * This is the web browser implementation of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */

	exports = module.exports = __webpack_require__(61);
	exports.log = log;
	exports.formatArgs = formatArgs;
	exports.save = save;
	exports.load = load;
	exports.useColors = useColors;
	exports.storage = 'undefined' != typeof chrome
	               && 'undefined' != typeof chrome.storage
	                  ? chrome.storage.local
	                  : localstorage();

	/**
	 * Colors.
	 */

	exports.colors = [
	  'lightseagreen',
	  'forestgreen',
	  'goldenrod',
	  'dodgerblue',
	  'darkorchid',
	  'crimson'
	];

	/**
	 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
	 * and the Firebug extension (any Firefox version) are known
	 * to support "%c" CSS customizations.
	 *
	 * TODO: add a `localStorage` variable to explicitly enable/disable colors
	 */

	function useColors() {
	  // is webkit? http://stackoverflow.com/a/16459606/376773
	  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
	  return (typeof document !== 'undefined' && 'WebkitAppearance' in document.documentElement.style) ||
	    // is firebug? http://stackoverflow.com/a/398120/376773
	    (window.console && (console.firebug || (console.exception && console.table))) ||
	    // is firefox >= v31?
	    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
	    (navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31);
	}

	/**
	 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
	 */

	exports.formatters.j = function(v) {
	  try {
	    return JSON.stringify(v);
	  } catch (err) {
	    return '[UnexpectedJSONParseError]: ' + err.message;
	  }
	};


	/**
	 * Colorize log arguments if enabled.
	 *
	 * @api public
	 */

	function formatArgs() {
	  var args = arguments;
	  var useColors = this.useColors;

	  args[0] = (useColors ? '%c' : '')
	    + this.namespace
	    + (useColors ? ' %c' : ' ')
	    + args[0]
	    + (useColors ? '%c ' : ' ')
	    + '+' + exports.humanize(this.diff);

	  if (!useColors) return args;

	  var c = 'color: ' + this.color;
	  args = [args[0], c, 'color: inherit'].concat(Array.prototype.slice.call(args, 1));

	  // the final "%c" is somewhat tricky, because there could be other
	  // arguments passed either before or after the %c, so we need to
	  // figure out the correct index to insert the CSS into
	  var index = 0;
	  var lastC = 0;
	  args[0].replace(/%[a-z%]/g, function(match) {
	    if ('%%' === match) return;
	    index++;
	    if ('%c' === match) {
	      // we only are interested in the *last* %c
	      // (the user may have provided their own)
	      lastC = index;
	    }
	  });

	  args.splice(lastC, 0, c);
	  return args;
	}

	/**
	 * Invokes `console.log()` when available.
	 * No-op when `console.log` is not a "function".
	 *
	 * @api public
	 */

	function log() {
	  // this hackery is required for IE8/9, where
	  // the `console.log` function doesn't have 'apply'
	  return 'object' === typeof console
	    && console.log
	    && Function.prototype.apply.call(console.log, console, arguments);
	}

	/**
	 * Save `namespaces`.
	 *
	 * @param {String} namespaces
	 * @api private
	 */

	function save(namespaces) {
	  try {
	    if (null == namespaces) {
	      exports.storage.removeItem('debug');
	    } else {
	      exports.storage.debug = namespaces;
	    }
	  } catch(e) {}
	}

	/**
	 * Load `namespaces`.
	 *
	 * @return {String} returns the previously persisted debug modes
	 * @api private
	 */

	function load() {
	  var r;
	  try {
	    return exports.storage.debug;
	  } catch(e) {}

	  // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
	  if (typeof process !== 'undefined' && 'env' in process) {
	    return process.env.DEBUG;
	  }
	}

	/**
	 * Enable namespaces listed in `localStorage.debug` initially.
	 */

	exports.enable(load());

	/**
	 * Localstorage attempts to return the localstorage.
	 *
	 * This is necessary because safari throws
	 * when a user disables cookies/localstorage
	 * and you attempt to access it.
	 *
	 * @return {LocalStorage}
	 * @api private
	 */

	function localstorage(){
	  try {
	    return window.localStorage;
	  } catch (e) {}
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * This is the common logic for both the Node.js and web browser
	 * implementations of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */

	exports = module.exports = debug.debug = debug;
	exports.coerce = coerce;
	exports.disable = disable;
	exports.enable = enable;
	exports.enabled = enabled;
	exports.humanize = __webpack_require__(62);

	/**
	 * The currently active debug mode names, and names to skip.
	 */

	exports.names = [];
	exports.skips = [];

	/**
	 * Map of special "%n" handling functions, for the debug "format" argument.
	 *
	 * Valid key names are a single, lowercased letter, i.e. "n".
	 */

	exports.formatters = {};

	/**
	 * Previously assigned color.
	 */

	var prevColor = 0;

	/**
	 * Previous log timestamp.
	 */

	var prevTime;

	/**
	 * Select a color.
	 *
	 * @return {Number}
	 * @api private
	 */

	function selectColor() {
	  return exports.colors[prevColor++ % exports.colors.length];
	}

	/**
	 * Create a debugger with the given `namespace`.
	 *
	 * @param {String} namespace
	 * @return {Function}
	 * @api public
	 */

	function debug(namespace) {

	  // define the `disabled` version
	  function disabled() {
	  }
	  disabled.enabled = false;

	  // define the `enabled` version
	  function enabled() {

	    var self = enabled;

	    // set `diff` timestamp
	    var curr = +new Date();
	    var ms = curr - (prevTime || curr);
	    self.diff = ms;
	    self.prev = prevTime;
	    self.curr = curr;
	    prevTime = curr;

	    // add the `color` if not set
	    if (null == self.useColors) self.useColors = exports.useColors();
	    if (null == self.color && self.useColors) self.color = selectColor();

	    var args = new Array(arguments.length);
	    for (var i = 0; i < args.length; i++) {
	      args[i] = arguments[i];
	    }

	    args[0] = exports.coerce(args[0]);

	    if ('string' !== typeof args[0]) {
	      // anything else let's inspect with %o
	      args = ['%o'].concat(args);
	    }

	    // apply any `formatters` transformations
	    var index = 0;
	    args[0] = args[0].replace(/%([a-z%])/g, function(match, format) {
	      // if we encounter an escaped % then don't increase the array index
	      if (match === '%%') return match;
	      index++;
	      var formatter = exports.formatters[format];
	      if ('function' === typeof formatter) {
	        var val = args[index];
	        match = formatter.call(self, val);

	        // now we need to remove `args[index]` since it's inlined in the `format`
	        args.splice(index, 1);
	        index--;
	      }
	      return match;
	    });

	    // apply env-specific formatting
	    args = exports.formatArgs.apply(self, args);

	    var logFn = enabled.log || exports.log || console.log.bind(console);
	    logFn.apply(self, args);
	  }
	  enabled.enabled = true;

	  var fn = exports.enabled(namespace) ? enabled : disabled;

	  fn.namespace = namespace;

	  return fn;
	}

	/**
	 * Enables a debug mode by namespaces. This can include modes
	 * separated by a colon and wildcards.
	 *
	 * @param {String} namespaces
	 * @api public
	 */

	function enable(namespaces) {
	  exports.save(namespaces);

	  var split = (namespaces || '').split(/[\s,]+/);
	  var len = split.length;

	  for (var i = 0; i < len; i++) {
	    if (!split[i]) continue; // ignore empty strings
	    namespaces = split[i].replace(/[\\^$+?.()|[\]{}]/g, '\\$&').replace(/\*/g, '.*?');
	    if (namespaces[0] === '-') {
	      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
	    } else {
	      exports.names.push(new RegExp('^' + namespaces + '$'));
	    }
	  }
	}

	/**
	 * Disable debug output.
	 *
	 * @api public
	 */

	function disable() {
	  exports.enable('');
	}

	/**
	 * Returns true if the given mode name is enabled, false otherwise.
	 *
	 * @param {String} name
	 * @return {Boolean}
	 * @api public
	 */

	function enabled(name) {
	  var i, len;
	  for (i = 0, len = exports.skips.length; i < len; i++) {
	    if (exports.skips[i].test(name)) {
	      return false;
	    }
	  }
	  for (i = 0, len = exports.names.length; i < len; i++) {
	    if (exports.names[i].test(name)) {
	      return true;
	    }
	  }
	  return false;
	}

	/**
	 * Coerce `val`.
	 *
	 * @param {Mixed} val
	 * @return {Mixed}
	 * @api private
	 */

	function coerce(val) {
	  if (val instanceof Error) return val.stack || val.message;
	  return val;
	}


/***/ },
/* 62 */
/***/ function(module, exports) {

	/**
	 * Helpers.
	 */

	var s = 1000
	var m = s * 60
	var h = m * 60
	var d = h * 24
	var y = d * 365.25

	/**
	 * Parse or format the given `val`.
	 *
	 * Options:
	 *
	 *  - `long` verbose formatting [false]
	 *
	 * @param {String|Number} val
	 * @param {Object} options
	 * @throws {Error} throw an error if val is not a non-empty string or a number
	 * @return {String|Number}
	 * @api public
	 */

	module.exports = function (val, options) {
	  options = options || {}
	  var type = typeof val
	  if (type === 'string' && val.length > 0) {
	    return parse(val)
	  } else if (type === 'number' && isNaN(val) === false) {
	    return options.long ?
				fmtLong(val) :
				fmtShort(val)
	  }
	  throw new Error('val is not a non-empty string or a valid number. val=' + JSON.stringify(val))
	}

	/**
	 * Parse the given `str` and return milliseconds.
	 *
	 * @param {String} str
	 * @return {Number}
	 * @api private
	 */

	function parse(str) {
	  str = String(str)
	  if (str.length > 10000) {
	    return
	  }
	  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(str)
	  if (!match) {
	    return
	  }
	  var n = parseFloat(match[1])
	  var type = (match[2] || 'ms').toLowerCase()
	  switch (type) {
	    case 'years':
	    case 'year':
	    case 'yrs':
	    case 'yr':
	    case 'y':
	      return n * y
	    case 'days':
	    case 'day':
	    case 'd':
	      return n * d
	    case 'hours':
	    case 'hour':
	    case 'hrs':
	    case 'hr':
	    case 'h':
	      return n * h
	    case 'minutes':
	    case 'minute':
	    case 'mins':
	    case 'min':
	    case 'm':
	      return n * m
	    case 'seconds':
	    case 'second':
	    case 'secs':
	    case 'sec':
	    case 's':
	      return n * s
	    case 'milliseconds':
	    case 'millisecond':
	    case 'msecs':
	    case 'msec':
	    case 'ms':
	      return n
	    default:
	      return undefined
	  }
	}

	/**
	 * Short format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */

	function fmtShort(ms) {
	  if (ms >= d) {
	    return Math.round(ms / d) + 'd'
	  }
	  if (ms >= h) {
	    return Math.round(ms / h) + 'h'
	  }
	  if (ms >= m) {
	    return Math.round(ms / m) + 'm'
	  }
	  if (ms >= s) {
	    return Math.round(ms / s) + 's'
	  }
	  return ms + 'ms'
	}

	/**
	 * Long format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */

	function fmtLong(ms) {
	  return plural(ms, d, 'day') ||
	    plural(ms, h, 'hour') ||
	    plural(ms, m, 'minute') ||
	    plural(ms, s, 'second') ||
	    ms + ' ms'
	}

	/**
	 * Pluralization helper.
	 */

	function plural(ms, n, name) {
	  if (ms < n) {
	    return
	  }
	  if (ms < n * 1.5) {
	    return Math.floor(ms / n) + ' ' + name
	  }
	  return Math.ceil(ms / n) + ' ' + name + 's'
	}


/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * Module dependencies.
	 */

	var debug = __webpack_require__(64)('socket.io-parser');
	var json = __webpack_require__(67);
	var Emitter = __webpack_require__(70);
	var binary = __webpack_require__(71);
	var isBuf = __webpack_require__(72);

	/**
	 * Protocol version.
	 *
	 * @api public
	 */

	exports.protocol = 4;

	/**
	 * Packet types.
	 *
	 * @api public
	 */

	exports.types = [
	  'CONNECT',
	  'DISCONNECT',
	  'EVENT',
	  'ACK',
	  'ERROR',
	  'BINARY_EVENT',
	  'BINARY_ACK'
	];

	/**
	 * Packet type `connect`.
	 *
	 * @api public
	 */

	exports.CONNECT = 0;

	/**
	 * Packet type `disconnect`.
	 *
	 * @api public
	 */

	exports.DISCONNECT = 1;

	/**
	 * Packet type `event`.
	 *
	 * @api public
	 */

	exports.EVENT = 2;

	/**
	 * Packet type `ack`.
	 *
	 * @api public
	 */

	exports.ACK = 3;

	/**
	 * Packet type `error`.
	 *
	 * @api public
	 */

	exports.ERROR = 4;

	/**
	 * Packet type 'binary event'
	 *
	 * @api public
	 */

	exports.BINARY_EVENT = 5;

	/**
	 * Packet type `binary ack`. For acks with binary arguments.
	 *
	 * @api public
	 */

	exports.BINARY_ACK = 6;

	/**
	 * Encoder constructor.
	 *
	 * @api public
	 */

	exports.Encoder = Encoder;

	/**
	 * Decoder constructor.
	 *
	 * @api public
	 */

	exports.Decoder = Decoder;

	/**
	 * A socket.io Encoder instance
	 *
	 * @api public
	 */

	function Encoder() {}

	/**
	 * Encode a packet as a single string if non-binary, or as a
	 * buffer sequence, depending on packet type.
	 *
	 * @param {Object} obj - packet object
	 * @param {Function} callback - function to handle encodings (likely engine.write)
	 * @return Calls callback with Array of encodings
	 * @api public
	 */

	Encoder.prototype.encode = function(obj, callback){
	  debug('encoding packet %j', obj);

	  if (exports.BINARY_EVENT == obj.type || exports.BINARY_ACK == obj.type) {
	    encodeAsBinary(obj, callback);
	  }
	  else {
	    var encoding = encodeAsString(obj);
	    callback([encoding]);
	  }
	};

	/**
	 * Encode packet as string.
	 *
	 * @param {Object} packet
	 * @return {String} encoded
	 * @api private
	 */

	function encodeAsString(obj) {
	  var str = '';
	  var nsp = false;

	  // first is type
	  str += obj.type;

	  // attachments if we have them
	  if (exports.BINARY_EVENT == obj.type || exports.BINARY_ACK == obj.type) {
	    str += obj.attachments;
	    str += '-';
	  }

	  // if we have a namespace other than `/`
	  // we append it followed by a comma `,`
	  if (obj.nsp && '/' != obj.nsp) {
	    nsp = true;
	    str += obj.nsp;
	  }

	  // immediately followed by the id
	  if (null != obj.id) {
	    if (nsp) {
	      str += ',';
	      nsp = false;
	    }
	    str += obj.id;
	  }

	  // json data
	  if (null != obj.data) {
	    if (nsp) str += ',';
	    str += json.stringify(obj.data);
	  }

	  debug('encoded %j as %s', obj, str);
	  return str;
	}

	/**
	 * Encode packet as 'buffer sequence' by removing blobs, and
	 * deconstructing packet into object with placeholders and
	 * a list of buffers.
	 *
	 * @param {Object} packet
	 * @return {Buffer} encoded
	 * @api private
	 */

	function encodeAsBinary(obj, callback) {

	  function writeEncoding(bloblessData) {
	    var deconstruction = binary.deconstructPacket(bloblessData);
	    var pack = encodeAsString(deconstruction.packet);
	    var buffers = deconstruction.buffers;

	    buffers.unshift(pack); // add packet info to beginning of data list
	    callback(buffers); // write all the buffers
	  }

	  binary.removeBlobs(obj, writeEncoding);
	}

	/**
	 * A socket.io Decoder instance
	 *
	 * @return {Object} decoder
	 * @api public
	 */

	function Decoder() {
	  this.reconstructor = null;
	}

	/**
	 * Mix in `Emitter` with Decoder.
	 */

	Emitter(Decoder.prototype);

	/**
	 * Decodes an ecoded packet string into packet JSON.
	 *
	 * @param {String} obj - encoded packet
	 * @return {Object} packet
	 * @api public
	 */

	Decoder.prototype.add = function(obj) {
	  var packet;
	  if ('string' == typeof obj) {
	    packet = decodeString(obj);
	    if (exports.BINARY_EVENT == packet.type || exports.BINARY_ACK == packet.type) { // binary packet's json
	      this.reconstructor = new BinaryReconstructor(packet);

	      // no attachments, labeled binary but no binary data to follow
	      if (this.reconstructor.reconPack.attachments === 0) {
	        this.emit('decoded', packet);
	      }
	    } else { // non-binary full packet
	      this.emit('decoded', packet);
	    }
	  }
	  else if (isBuf(obj) || obj.base64) { // raw binary data
	    if (!this.reconstructor) {
	      throw new Error('got binary data when not reconstructing a packet');
	    } else {
	      packet = this.reconstructor.takeBinaryData(obj);
	      if (packet) { // received final buffer
	        this.reconstructor = null;
	        this.emit('decoded', packet);
	      }
	    }
	  }
	  else {
	    throw new Error('Unknown type: ' + obj);
	  }
	};

	/**
	 * Decode a packet String (JSON data)
	 *
	 * @param {String} str
	 * @return {Object} packet
	 * @api private
	 */

	function decodeString(str) {
	  var p = {};
	  var i = 0;

	  // look up type
	  p.type = Number(str.charAt(0));
	  if (null == exports.types[p.type]) return error();

	  // look up attachments if type binary
	  if (exports.BINARY_EVENT == p.type || exports.BINARY_ACK == p.type) {
	    var buf = '';
	    while (str.charAt(++i) != '-') {
	      buf += str.charAt(i);
	      if (i == str.length) break;
	    }
	    if (buf != Number(buf) || str.charAt(i) != '-') {
	      throw new Error('Illegal attachments');
	    }
	    p.attachments = Number(buf);
	  }

	  // look up namespace (if any)
	  if ('/' == str.charAt(i + 1)) {
	    p.nsp = '';
	    while (++i) {
	      var c = str.charAt(i);
	      if (',' == c) break;
	      p.nsp += c;
	      if (i == str.length) break;
	    }
	  } else {
	    p.nsp = '/';
	  }

	  // look up id
	  var next = str.charAt(i + 1);
	  if ('' !== next && Number(next) == next) {
	    p.id = '';
	    while (++i) {
	      var c = str.charAt(i);
	      if (null == c || Number(c) != c) {
	        --i;
	        break;
	      }
	      p.id += str.charAt(i);
	      if (i == str.length) break;
	    }
	    p.id = Number(p.id);
	  }

	  // look up json data
	  if (str.charAt(++i)) {
	    p = tryParse(p, str.substr(i));
	  }

	  debug('decoded %s as %j', str, p);
	  return p;
	}

	function tryParse(p, str) {
	  try {
	    p.data = json.parse(str);
	  } catch(e){
	    return error();
	  }
	  return p; 
	};

	/**
	 * Deallocates a parser's resources
	 *
	 * @api public
	 */

	Decoder.prototype.destroy = function() {
	  if (this.reconstructor) {
	    this.reconstructor.finishedReconstruction();
	  }
	};

	/**
	 * A manager of a binary event's 'buffer sequence'. Should
	 * be constructed whenever a packet of type BINARY_EVENT is
	 * decoded.
	 *
	 * @param {Object} packet
	 * @return {BinaryReconstructor} initialized reconstructor
	 * @api private
	 */

	function BinaryReconstructor(packet) {
	  this.reconPack = packet;
	  this.buffers = [];
	}

	/**
	 * Method to be called when binary data received from connection
	 * after a BINARY_EVENT packet.
	 *
	 * @param {Buffer | ArrayBuffer} binData - the raw binary data received
	 * @return {null | Object} returns null if more binary data is expected or
	 *   a reconstructed packet object if all buffers have been received.
	 * @api private
	 */

	BinaryReconstructor.prototype.takeBinaryData = function(binData) {
	  this.buffers.push(binData);
	  if (this.buffers.length == this.reconPack.attachments) { // done with buffer list
	    var packet = binary.reconstructPacket(this.reconPack, this.buffers);
	    this.finishedReconstruction();
	    return packet;
	  }
	  return null;
	};

	/**
	 * Cleans up binary packet reconstruction variables.
	 *
	 * @api private
	 */

	BinaryReconstructor.prototype.finishedReconstruction = function() {
	  this.reconPack = null;
	  this.buffers = [];
	};

	function error(data){
	  return {
	    type: exports.ERROR,
	    data: 'parser error'
	  };
	}


/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * This is the web browser implementation of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */

	exports = module.exports = __webpack_require__(65);
	exports.log = log;
	exports.formatArgs = formatArgs;
	exports.save = save;
	exports.load = load;
	exports.useColors = useColors;
	exports.storage = 'undefined' != typeof chrome
	               && 'undefined' != typeof chrome.storage
	                  ? chrome.storage.local
	                  : localstorage();

	/**
	 * Colors.
	 */

	exports.colors = [
	  'lightseagreen',
	  'forestgreen',
	  'goldenrod',
	  'dodgerblue',
	  'darkorchid',
	  'crimson'
	];

	/**
	 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
	 * and the Firebug extension (any Firefox version) are known
	 * to support "%c" CSS customizations.
	 *
	 * TODO: add a `localStorage` variable to explicitly enable/disable colors
	 */

	function useColors() {
	  // is webkit? http://stackoverflow.com/a/16459606/376773
	  return ('WebkitAppearance' in document.documentElement.style) ||
	    // is firebug? http://stackoverflow.com/a/398120/376773
	    (window.console && (console.firebug || (console.exception && console.table))) ||
	    // is firefox >= v31?
	    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
	    (navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31);
	}

	/**
	 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
	 */

	exports.formatters.j = function(v) {
	  return JSON.stringify(v);
	};


	/**
	 * Colorize log arguments if enabled.
	 *
	 * @api public
	 */

	function formatArgs() {
	  var args = arguments;
	  var useColors = this.useColors;

	  args[0] = (useColors ? '%c' : '')
	    + this.namespace
	    + (useColors ? ' %c' : ' ')
	    + args[0]
	    + (useColors ? '%c ' : ' ')
	    + '+' + exports.humanize(this.diff);

	  if (!useColors) return args;

	  var c = 'color: ' + this.color;
	  args = [args[0], c, 'color: inherit'].concat(Array.prototype.slice.call(args, 1));

	  // the final "%c" is somewhat tricky, because there could be other
	  // arguments passed either before or after the %c, so we need to
	  // figure out the correct index to insert the CSS into
	  var index = 0;
	  var lastC = 0;
	  args[0].replace(/%[a-z%]/g, function(match) {
	    if ('%%' === match) return;
	    index++;
	    if ('%c' === match) {
	      // we only are interested in the *last* %c
	      // (the user may have provided their own)
	      lastC = index;
	    }
	  });

	  args.splice(lastC, 0, c);
	  return args;
	}

	/**
	 * Invokes `console.log()` when available.
	 * No-op when `console.log` is not a "function".
	 *
	 * @api public
	 */

	function log() {
	  // this hackery is required for IE8/9, where
	  // the `console.log` function doesn't have 'apply'
	  return 'object' === typeof console
	    && console.log
	    && Function.prototype.apply.call(console.log, console, arguments);
	}

	/**
	 * Save `namespaces`.
	 *
	 * @param {String} namespaces
	 * @api private
	 */

	function save(namespaces) {
	  try {
	    if (null == namespaces) {
	      exports.storage.removeItem('debug');
	    } else {
	      exports.storage.debug = namespaces;
	    }
	  } catch(e) {}
	}

	/**
	 * Load `namespaces`.
	 *
	 * @return {String} returns the previously persisted debug modes
	 * @api private
	 */

	function load() {
	  var r;
	  try {
	    r = exports.storage.debug;
	  } catch(e) {}
	  return r;
	}

	/**
	 * Enable namespaces listed in `localStorage.debug` initially.
	 */

	exports.enable(load());

	/**
	 * Localstorage attempts to return the localstorage.
	 *
	 * This is necessary because safari throws
	 * when a user disables cookies/localstorage
	 * and you attempt to access it.
	 *
	 * @return {LocalStorage}
	 * @api private
	 */

	function localstorage(){
	  try {
	    return window.localStorage;
	  } catch (e) {}
	}


/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * This is the common logic for both the Node.js and web browser
	 * implementations of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */

	exports = module.exports = debug;
	exports.coerce = coerce;
	exports.disable = disable;
	exports.enable = enable;
	exports.enabled = enabled;
	exports.humanize = __webpack_require__(66);

	/**
	 * The currently active debug mode names, and names to skip.
	 */

	exports.names = [];
	exports.skips = [];

	/**
	 * Map of special "%n" handling functions, for the debug "format" argument.
	 *
	 * Valid key names are a single, lowercased letter, i.e. "n".
	 */

	exports.formatters = {};

	/**
	 * Previously assigned color.
	 */

	var prevColor = 0;

	/**
	 * Previous log timestamp.
	 */

	var prevTime;

	/**
	 * Select a color.
	 *
	 * @return {Number}
	 * @api private
	 */

	function selectColor() {
	  return exports.colors[prevColor++ % exports.colors.length];
	}

	/**
	 * Create a debugger with the given `namespace`.
	 *
	 * @param {String} namespace
	 * @return {Function}
	 * @api public
	 */

	function debug(namespace) {

	  // define the `disabled` version
	  function disabled() {
	  }
	  disabled.enabled = false;

	  // define the `enabled` version
	  function enabled() {

	    var self = enabled;

	    // set `diff` timestamp
	    var curr = +new Date();
	    var ms = curr - (prevTime || curr);
	    self.diff = ms;
	    self.prev = prevTime;
	    self.curr = curr;
	    prevTime = curr;

	    // add the `color` if not set
	    if (null == self.useColors) self.useColors = exports.useColors();
	    if (null == self.color && self.useColors) self.color = selectColor();

	    var args = Array.prototype.slice.call(arguments);

	    args[0] = exports.coerce(args[0]);

	    if ('string' !== typeof args[0]) {
	      // anything else let's inspect with %o
	      args = ['%o'].concat(args);
	    }

	    // apply any `formatters` transformations
	    var index = 0;
	    args[0] = args[0].replace(/%([a-z%])/g, function(match, format) {
	      // if we encounter an escaped % then don't increase the array index
	      if (match === '%%') return match;
	      index++;
	      var formatter = exports.formatters[format];
	      if ('function' === typeof formatter) {
	        var val = args[index];
	        match = formatter.call(self, val);

	        // now we need to remove `args[index]` since it's inlined in the `format`
	        args.splice(index, 1);
	        index--;
	      }
	      return match;
	    });

	    if ('function' === typeof exports.formatArgs) {
	      args = exports.formatArgs.apply(self, args);
	    }
	    var logFn = enabled.log || exports.log || console.log.bind(console);
	    logFn.apply(self, args);
	  }
	  enabled.enabled = true;

	  var fn = exports.enabled(namespace) ? enabled : disabled;

	  fn.namespace = namespace;

	  return fn;
	}

	/**
	 * Enables a debug mode by namespaces. This can include modes
	 * separated by a colon and wildcards.
	 *
	 * @param {String} namespaces
	 * @api public
	 */

	function enable(namespaces) {
	  exports.save(namespaces);

	  var split = (namespaces || '').split(/[\s,]+/);
	  var len = split.length;

	  for (var i = 0; i < len; i++) {
	    if (!split[i]) continue; // ignore empty strings
	    namespaces = split[i].replace(/\*/g, '.*?');
	    if (namespaces[0] === '-') {
	      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
	    } else {
	      exports.names.push(new RegExp('^' + namespaces + '$'));
	    }
	  }
	}

	/**
	 * Disable debug output.
	 *
	 * @api public
	 */

	function disable() {
	  exports.enable('');
	}

	/**
	 * Returns true if the given mode name is enabled, false otherwise.
	 *
	 * @param {String} name
	 * @return {Boolean}
	 * @api public
	 */

	function enabled(name) {
	  var i, len;
	  for (i = 0, len = exports.skips.length; i < len; i++) {
	    if (exports.skips[i].test(name)) {
	      return false;
	    }
	  }
	  for (i = 0, len = exports.names.length; i < len; i++) {
	    if (exports.names[i].test(name)) {
	      return true;
	    }
	  }
	  return false;
	}

	/**
	 * Coerce `val`.
	 *
	 * @param {Mixed} val
	 * @return {Mixed}
	 * @api private
	 */

	function coerce(val) {
	  if (val instanceof Error) return val.stack || val.message;
	  return val;
	}


/***/ },
/* 66 */
/***/ function(module, exports) {

	/**
	 * Helpers.
	 */

	var s = 1000;
	var m = s * 60;
	var h = m * 60;
	var d = h * 24;
	var y = d * 365.25;

	/**
	 * Parse or format the given `val`.
	 *
	 * Options:
	 *
	 *  - `long` verbose formatting [false]
	 *
	 * @param {String|Number} val
	 * @param {Object} options
	 * @return {String|Number}
	 * @api public
	 */

	module.exports = function(val, options){
	  options = options || {};
	  if ('string' == typeof val) return parse(val);
	  return options.long
	    ? long(val)
	    : short(val);
	};

	/**
	 * Parse the given `str` and return milliseconds.
	 *
	 * @param {String} str
	 * @return {Number}
	 * @api private
	 */

	function parse(str) {
	  str = '' + str;
	  if (str.length > 10000) return;
	  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(str);
	  if (!match) return;
	  var n = parseFloat(match[1]);
	  var type = (match[2] || 'ms').toLowerCase();
	  switch (type) {
	    case 'years':
	    case 'year':
	    case 'yrs':
	    case 'yr':
	    case 'y':
	      return n * y;
	    case 'days':
	    case 'day':
	    case 'd':
	      return n * d;
	    case 'hours':
	    case 'hour':
	    case 'hrs':
	    case 'hr':
	    case 'h':
	      return n * h;
	    case 'minutes':
	    case 'minute':
	    case 'mins':
	    case 'min':
	    case 'm':
	      return n * m;
	    case 'seconds':
	    case 'second':
	    case 'secs':
	    case 'sec':
	    case 's':
	      return n * s;
	    case 'milliseconds':
	    case 'millisecond':
	    case 'msecs':
	    case 'msec':
	    case 'ms':
	      return n;
	  }
	}

	/**
	 * Short format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */

	function short(ms) {
	  if (ms >= d) return Math.round(ms / d) + 'd';
	  if (ms >= h) return Math.round(ms / h) + 'h';
	  if (ms >= m) return Math.round(ms / m) + 'm';
	  if (ms >= s) return Math.round(ms / s) + 's';
	  return ms + 'ms';
	}

	/**
	 * Long format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */

	function long(ms) {
	  return plural(ms, d, 'day')
	    || plural(ms, h, 'hour')
	    || plural(ms, m, 'minute')
	    || plural(ms, s, 'second')
	    || ms + ' ms';
	}

	/**
	 * Pluralization helper.
	 */

	function plural(ms, n, name) {
	  if (ms < n) return;
	  if (ms < n * 1.5) return Math.floor(ms / n) + ' ' + name;
	  return Math.ceil(ms / n) + ' ' + name + 's';
	}


/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module, global) {/*! JSON v3.3.2 | http://bestiejs.github.io/json3 | Copyright 2012-2014, Kit Cambridge | http://kit.mit-license.org */
	;(function () {
	  // Detect the `define` function exposed by asynchronous module loaders. The
	  // strict `define` check is necessary for compatibility with `r.js`.
	  var isLoader = "function" === "function" && __webpack_require__(69);

	  // A set of types used to distinguish objects from primitives.
	  var objectTypes = {
	    "function": true,
	    "object": true
	  };

	  // Detect the `exports` object exposed by CommonJS implementations.
	  var freeExports = objectTypes[typeof exports] && exports && !exports.nodeType && exports;

	  // Use the `global` object exposed by Node (including Browserify via
	  // `insert-module-globals`), Narwhal, and Ringo as the default context,
	  // and the `window` object in browsers. Rhino exports a `global` function
	  // instead.
	  var root = objectTypes[typeof window] && window || this,
	      freeGlobal = freeExports && objectTypes[typeof module] && module && !module.nodeType && typeof global == "object" && global;

	  if (freeGlobal && (freeGlobal["global"] === freeGlobal || freeGlobal["window"] === freeGlobal || freeGlobal["self"] === freeGlobal)) {
	    root = freeGlobal;
	  }

	  // Public: Initializes JSON 3 using the given `context` object, attaching the
	  // `stringify` and `parse` functions to the specified `exports` object.
	  function runInContext(context, exports) {
	    context || (context = root["Object"]());
	    exports || (exports = root["Object"]());

	    // Native constructor aliases.
	    var Number = context["Number"] || root["Number"],
	        String = context["String"] || root["String"],
	        Object = context["Object"] || root["Object"],
	        Date = context["Date"] || root["Date"],
	        SyntaxError = context["SyntaxError"] || root["SyntaxError"],
	        TypeError = context["TypeError"] || root["TypeError"],
	        Math = context["Math"] || root["Math"],
	        nativeJSON = context["JSON"] || root["JSON"];

	    // Delegate to the native `stringify` and `parse` implementations.
	    if (typeof nativeJSON == "object" && nativeJSON) {
	      exports.stringify = nativeJSON.stringify;
	      exports.parse = nativeJSON.parse;
	    }

	    // Convenience aliases.
	    var objectProto = Object.prototype,
	        getClass = objectProto.toString,
	        isProperty, forEach, undef;

	    // Test the `Date#getUTC*` methods. Based on work by @Yaffle.
	    var isExtended = new Date(-3509827334573292);
	    try {
	      // The `getUTCFullYear`, `Month`, and `Date` methods return nonsensical
	      // results for certain dates in Opera >= 10.53.
	      isExtended = isExtended.getUTCFullYear() == -109252 && isExtended.getUTCMonth() === 0 && isExtended.getUTCDate() === 1 &&
	        // Safari < 2.0.2 stores the internal millisecond time value correctly,
	        // but clips the values returned by the date methods to the range of
	        // signed 32-bit integers ([-2 ** 31, 2 ** 31 - 1]).
	        isExtended.getUTCHours() == 10 && isExtended.getUTCMinutes() == 37 && isExtended.getUTCSeconds() == 6 && isExtended.getUTCMilliseconds() == 708;
	    } catch (exception) {}

	    // Internal: Determines whether the native `JSON.stringify` and `parse`
	    // implementations are spec-compliant. Based on work by Ken Snyder.
	    function has(name) {
	      if (has[name] !== undef) {
	        // Return cached feature test result.
	        return has[name];
	      }
	      var isSupported;
	      if (name == "bug-string-char-index") {
	        // IE <= 7 doesn't support accessing string characters using square
	        // bracket notation. IE 8 only supports this for primitives.
	        isSupported = "a"[0] != "a";
	      } else if (name == "json") {
	        // Indicates whether both `JSON.stringify` and `JSON.parse` are
	        // supported.
	        isSupported = has("json-stringify") && has("json-parse");
	      } else {
	        var value, serialized = '{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}';
	        // Test `JSON.stringify`.
	        if (name == "json-stringify") {
	          var stringify = exports.stringify, stringifySupported = typeof stringify == "function" && isExtended;
	          if (stringifySupported) {
	            // A test function object with a custom `toJSON` method.
	            (value = function () {
	              return 1;
	            }).toJSON = value;
	            try {
	              stringifySupported =
	                // Firefox 3.1b1 and b2 serialize string, number, and boolean
	                // primitives as object literals.
	                stringify(0) === "0" &&
	                // FF 3.1b1, b2, and JSON 2 serialize wrapped primitives as object
	                // literals.
	                stringify(new Number()) === "0" &&
	                stringify(new String()) == '""' &&
	                // FF 3.1b1, 2 throw an error if the value is `null`, `undefined`, or
	                // does not define a canonical JSON representation (this applies to
	                // objects with `toJSON` properties as well, *unless* they are nested
	                // within an object or array).
	                stringify(getClass) === undef &&
	                // IE 8 serializes `undefined` as `"undefined"`. Safari <= 5.1.7 and
	                // FF 3.1b3 pass this test.
	                stringify(undef) === undef &&
	                // Safari <= 5.1.7 and FF 3.1b3 throw `Error`s and `TypeError`s,
	                // respectively, if the value is omitted entirely.
	                stringify() === undef &&
	                // FF 3.1b1, 2 throw an error if the given value is not a number,
	                // string, array, object, Boolean, or `null` literal. This applies to
	                // objects with custom `toJSON` methods as well, unless they are nested
	                // inside object or array literals. YUI 3.0.0b1 ignores custom `toJSON`
	                // methods entirely.
	                stringify(value) === "1" &&
	                stringify([value]) == "[1]" &&
	                // Prototype <= 1.6.1 serializes `[undefined]` as `"[]"` instead of
	                // `"[null]"`.
	                stringify([undef]) == "[null]" &&
	                // YUI 3.0.0b1 fails to serialize `null` literals.
	                stringify(null) == "null" &&
	                // FF 3.1b1, 2 halts serialization if an array contains a function:
	                // `[1, true, getClass, 1]` serializes as "[1,true,],". FF 3.1b3
	                // elides non-JSON values from objects and arrays, unless they
	                // define custom `toJSON` methods.
	                stringify([undef, getClass, null]) == "[null,null,null]" &&
	                // Simple serialization test. FF 3.1b1 uses Unicode escape sequences
	                // where character escape codes are expected (e.g., `\b` => `\u0008`).
	                stringify({ "a": [value, true, false, null, "\x00\b\n\f\r\t"] }) == serialized &&
	                // FF 3.1b1 and b2 ignore the `filter` and `width` arguments.
	                stringify(null, value) === "1" &&
	                stringify([1, 2], null, 1) == "[\n 1,\n 2\n]" &&
	                // JSON 2, Prototype <= 1.7, and older WebKit builds incorrectly
	                // serialize extended years.
	                stringify(new Date(-8.64e15)) == '"-271821-04-20T00:00:00.000Z"' &&
	                // The milliseconds are optional in ES 5, but required in 5.1.
	                stringify(new Date(8.64e15)) == '"+275760-09-13T00:00:00.000Z"' &&
	                // Firefox <= 11.0 incorrectly serializes years prior to 0 as negative
	                // four-digit years instead of six-digit years. Credits: @Yaffle.
	                stringify(new Date(-621987552e5)) == '"-000001-01-01T00:00:00.000Z"' &&
	                // Safari <= 5.1.5 and Opera >= 10.53 incorrectly serialize millisecond
	                // values less than 1000. Credits: @Yaffle.
	                stringify(new Date(-1)) == '"1969-12-31T23:59:59.999Z"';
	            } catch (exception) {
	              stringifySupported = false;
	            }
	          }
	          isSupported = stringifySupported;
	        }
	        // Test `JSON.parse`.
	        if (name == "json-parse") {
	          var parse = exports.parse;
	          if (typeof parse == "function") {
	            try {
	              // FF 3.1b1, b2 will throw an exception if a bare literal is provided.
	              // Conforming implementations should also coerce the initial argument to
	              // a string prior to parsing.
	              if (parse("0") === 0 && !parse(false)) {
	                // Simple parsing test.
	                value = parse(serialized);
	                var parseSupported = value["a"].length == 5 && value["a"][0] === 1;
	                if (parseSupported) {
	                  try {
	                    // Safari <= 5.1.2 and FF 3.1b1 allow unescaped tabs in strings.
	                    parseSupported = !parse('"\t"');
	                  } catch (exception) {}
	                  if (parseSupported) {
	                    try {
	                      // FF 4.0 and 4.0.1 allow leading `+` signs and leading
	                      // decimal points. FF 4.0, 4.0.1, and IE 9-10 also allow
	                      // certain octal literals.
	                      parseSupported = parse("01") !== 1;
	                    } catch (exception) {}
	                  }
	                  if (parseSupported) {
	                    try {
	                      // FF 4.0, 4.0.1, and Rhino 1.7R3-R4 allow trailing decimal
	                      // points. These environments, along with FF 3.1b1 and 2,
	                      // also allow trailing commas in JSON objects and arrays.
	                      parseSupported = parse("1.") !== 1;
	                    } catch (exception) {}
	                  }
	                }
	              }
	            } catch (exception) {
	              parseSupported = false;
	            }
	          }
	          isSupported = parseSupported;
	        }
	      }
	      return has[name] = !!isSupported;
	    }

	    if (!has("json")) {
	      // Common `[[Class]]` name aliases.
	      var functionClass = "[object Function]",
	          dateClass = "[object Date]",
	          numberClass = "[object Number]",
	          stringClass = "[object String]",
	          arrayClass = "[object Array]",
	          booleanClass = "[object Boolean]";

	      // Detect incomplete support for accessing string characters by index.
	      var charIndexBuggy = has("bug-string-char-index");

	      // Define additional utility methods if the `Date` methods are buggy.
	      if (!isExtended) {
	        var floor = Math.floor;
	        // A mapping between the months of the year and the number of days between
	        // January 1st and the first of the respective month.
	        var Months = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
	        // Internal: Calculates the number of days between the Unix epoch and the
	        // first day of the given month.
	        var getDay = function (year, month) {
	          return Months[month] + 365 * (year - 1970) + floor((year - 1969 + (month = +(month > 1))) / 4) - floor((year - 1901 + month) / 100) + floor((year - 1601 + month) / 400);
	        };
	      }

	      // Internal: Determines if a property is a direct property of the given
	      // object. Delegates to the native `Object#hasOwnProperty` method.
	      if (!(isProperty = objectProto.hasOwnProperty)) {
	        isProperty = function (property) {
	          var members = {}, constructor;
	          if ((members.__proto__ = null, members.__proto__ = {
	            // The *proto* property cannot be set multiple times in recent
	            // versions of Firefox and SeaMonkey.
	            "toString": 1
	          }, members).toString != getClass) {
	            // Safari <= 2.0.3 doesn't implement `Object#hasOwnProperty`, but
	            // supports the mutable *proto* property.
	            isProperty = function (property) {
	              // Capture and break the object's prototype chain (see section 8.6.2
	              // of the ES 5.1 spec). The parenthesized expression prevents an
	              // unsafe transformation by the Closure Compiler.
	              var original = this.__proto__, result = property in (this.__proto__ = null, this);
	              // Restore the original prototype chain.
	              this.__proto__ = original;
	              return result;
	            };
	          } else {
	            // Capture a reference to the top-level `Object` constructor.
	            constructor = members.constructor;
	            // Use the `constructor` property to simulate `Object#hasOwnProperty` in
	            // other environments.
	            isProperty = function (property) {
	              var parent = (this.constructor || constructor).prototype;
	              return property in this && !(property in parent && this[property] === parent[property]);
	            };
	          }
	          members = null;
	          return isProperty.call(this, property);
	        };
	      }

	      // Internal: Normalizes the `for...in` iteration algorithm across
	      // environments. Each enumerated key is yielded to a `callback` function.
	      forEach = function (object, callback) {
	        var size = 0, Properties, members, property;

	        // Tests for bugs in the current environment's `for...in` algorithm. The
	        // `valueOf` property inherits the non-enumerable flag from
	        // `Object.prototype` in older versions of IE, Netscape, and Mozilla.
	        (Properties = function () {
	          this.valueOf = 0;
	        }).prototype.valueOf = 0;

	        // Iterate over a new instance of the `Properties` class.
	        members = new Properties();
	        for (property in members) {
	          // Ignore all properties inherited from `Object.prototype`.
	          if (isProperty.call(members, property)) {
	            size++;
	          }
	        }
	        Properties = members = null;

	        // Normalize the iteration algorithm.
	        if (!size) {
	          // A list of non-enumerable properties inherited from `Object.prototype`.
	          members = ["valueOf", "toString", "toLocaleString", "propertyIsEnumerable", "isPrototypeOf", "hasOwnProperty", "constructor"];
	          // IE <= 8, Mozilla 1.0, and Netscape 6.2 ignore shadowed non-enumerable
	          // properties.
	          forEach = function (object, callback) {
	            var isFunction = getClass.call(object) == functionClass, property, length;
	            var hasProperty = !isFunction && typeof object.constructor != "function" && objectTypes[typeof object.hasOwnProperty] && object.hasOwnProperty || isProperty;
	            for (property in object) {
	              // Gecko <= 1.0 enumerates the `prototype` property of functions under
	              // certain conditions; IE does not.
	              if (!(isFunction && property == "prototype") && hasProperty.call(object, property)) {
	                callback(property);
	              }
	            }
	            // Manually invoke the callback for each non-enumerable property.
	            for (length = members.length; property = members[--length]; hasProperty.call(object, property) && callback(property));
	          };
	        } else if (size == 2) {
	          // Safari <= 2.0.4 enumerates shadowed properties twice.
	          forEach = function (object, callback) {
	            // Create a set of iterated properties.
	            var members = {}, isFunction = getClass.call(object) == functionClass, property;
	            for (property in object) {
	              // Store each property name to prevent double enumeration. The
	              // `prototype` property of functions is not enumerated due to cross-
	              // environment inconsistencies.
	              if (!(isFunction && property == "prototype") && !isProperty.call(members, property) && (members[property] = 1) && isProperty.call(object, property)) {
	                callback(property);
	              }
	            }
	          };
	        } else {
	          // No bugs detected; use the standard `for...in` algorithm.
	          forEach = function (object, callback) {
	            var isFunction = getClass.call(object) == functionClass, property, isConstructor;
	            for (property in object) {
	              if (!(isFunction && property == "prototype") && isProperty.call(object, property) && !(isConstructor = property === "constructor")) {
	                callback(property);
	              }
	            }
	            // Manually invoke the callback for the `constructor` property due to
	            // cross-environment inconsistencies.
	            if (isConstructor || isProperty.call(object, (property = "constructor"))) {
	              callback(property);
	            }
	          };
	        }
	        return forEach(object, callback);
	      };

	      // Public: Serializes a JavaScript `value` as a JSON string. The optional
	      // `filter` argument may specify either a function that alters how object and
	      // array members are serialized, or an array of strings and numbers that
	      // indicates which properties should be serialized. The optional `width`
	      // argument may be either a string or number that specifies the indentation
	      // level of the output.
	      if (!has("json-stringify")) {
	        // Internal: A map of control characters and their escaped equivalents.
	        var Escapes = {
	          92: "\\\\",
	          34: '\\"',
	          8: "\\b",
	          12: "\\f",
	          10: "\\n",
	          13: "\\r",
	          9: "\\t"
	        };

	        // Internal: Converts `value` into a zero-padded string such that its
	        // length is at least equal to `width`. The `width` must be <= 6.
	        var leadingZeroes = "000000";
	        var toPaddedString = function (width, value) {
	          // The `|| 0` expression is necessary to work around a bug in
	          // Opera <= 7.54u2 where `0 == -0`, but `String(-0) !== "0"`.
	          return (leadingZeroes + (value || 0)).slice(-width);
	        };

	        // Internal: Double-quotes a string `value`, replacing all ASCII control
	        // characters (characters with code unit values between 0 and 31) with
	        // their escaped equivalents. This is an implementation of the
	        // `Quote(value)` operation defined in ES 5.1 section 15.12.3.
	        var unicodePrefix = "\\u00";
	        var quote = function (value) {
	          var result = '"', index = 0, length = value.length, useCharIndex = !charIndexBuggy || length > 10;
	          var symbols = useCharIndex && (charIndexBuggy ? value.split("") : value);
	          for (; index < length; index++) {
	            var charCode = value.charCodeAt(index);
	            // If the character is a control character, append its Unicode or
	            // shorthand escape sequence; otherwise, append the character as-is.
	            switch (charCode) {
	              case 8: case 9: case 10: case 12: case 13: case 34: case 92:
	                result += Escapes[charCode];
	                break;
	              default:
	                if (charCode < 32) {
	                  result += unicodePrefix + toPaddedString(2, charCode.toString(16));
	                  break;
	                }
	                result += useCharIndex ? symbols[index] : value.charAt(index);
	            }
	          }
	          return result + '"';
	        };

	        // Internal: Recursively serializes an object. Implements the
	        // `Str(key, holder)`, `JO(value)`, and `JA(value)` operations.
	        var serialize = function (property, object, callback, properties, whitespace, indentation, stack) {
	          var value, className, year, month, date, time, hours, minutes, seconds, milliseconds, results, element, index, length, prefix, result;
	          try {
	            // Necessary for host object support.
	            value = object[property];
	          } catch (exception) {}
	          if (typeof value == "object" && value) {
	            className = getClass.call(value);
	            if (className == dateClass && !isProperty.call(value, "toJSON")) {
	              if (value > -1 / 0 && value < 1 / 0) {
	                // Dates are serialized according to the `Date#toJSON` method
	                // specified in ES 5.1 section 15.9.5.44. See section 15.9.1.15
	                // for the ISO 8601 date time string format.
	                if (getDay) {
	                  // Manually compute the year, month, date, hours, minutes,
	                  // seconds, and milliseconds if the `getUTC*` methods are
	                  // buggy. Adapted from @Yaffle's `date-shim` project.
	                  date = floor(value / 864e5);
	                  for (year = floor(date / 365.2425) + 1970 - 1; getDay(year + 1, 0) <= date; year++);
	                  for (month = floor((date - getDay(year, 0)) / 30.42); getDay(year, month + 1) <= date; month++);
	                  date = 1 + date - getDay(year, month);
	                  // The `time` value specifies the time within the day (see ES
	                  // 5.1 section 15.9.1.2). The formula `(A % B + B) % B` is used
	                  // to compute `A modulo B`, as the `%` operator does not
	                  // correspond to the `modulo` operation for negative numbers.
	                  time = (value % 864e5 + 864e5) % 864e5;
	                  // The hours, minutes, seconds, and milliseconds are obtained by
	                  // decomposing the time within the day. See section 15.9.1.10.
	                  hours = floor(time / 36e5) % 24;
	                  minutes = floor(time / 6e4) % 60;
	                  seconds = floor(time / 1e3) % 60;
	                  milliseconds = time % 1e3;
	                } else {
	                  year = value.getUTCFullYear();
	                  month = value.getUTCMonth();
	                  date = value.getUTCDate();
	                  hours = value.getUTCHours();
	                  minutes = value.getUTCMinutes();
	                  seconds = value.getUTCSeconds();
	                  milliseconds = value.getUTCMilliseconds();
	                }
	                // Serialize extended years correctly.
	                value = (year <= 0 || year >= 1e4 ? (year < 0 ? "-" : "+") + toPaddedString(6, year < 0 ? -year : year) : toPaddedString(4, year)) +
	                  "-" + toPaddedString(2, month + 1) + "-" + toPaddedString(2, date) +
	                  // Months, dates, hours, minutes, and seconds should have two
	                  // digits; milliseconds should have three.
	                  "T" + toPaddedString(2, hours) + ":" + toPaddedString(2, minutes) + ":" + toPaddedString(2, seconds) +
	                  // Milliseconds are optional in ES 5.0, but required in 5.1.
	                  "." + toPaddedString(3, milliseconds) + "Z";
	              } else {
	                value = null;
	              }
	            } else if (typeof value.toJSON == "function" && ((className != numberClass && className != stringClass && className != arrayClass) || isProperty.call(value, "toJSON"))) {
	              // Prototype <= 1.6.1 adds non-standard `toJSON` methods to the
	              // `Number`, `String`, `Date`, and `Array` prototypes. JSON 3
	              // ignores all `toJSON` methods on these objects unless they are
	              // defined directly on an instance.
	              value = value.toJSON(property);
	            }
	          }
	          if (callback) {
	            // If a replacement function was provided, call it to obtain the value
	            // for serialization.
	            value = callback.call(object, property, value);
	          }
	          if (value === null) {
	            return "null";
	          }
	          className = getClass.call(value);
	          if (className == booleanClass) {
	            // Booleans are represented literally.
	            return "" + value;
	          } else if (className == numberClass) {
	            // JSON numbers must be finite. `Infinity` and `NaN` are serialized as
	            // `"null"`.
	            return value > -1 / 0 && value < 1 / 0 ? "" + value : "null";
	          } else if (className == stringClass) {
	            // Strings are double-quoted and escaped.
	            return quote("" + value);
	          }
	          // Recursively serialize objects and arrays.
	          if (typeof value == "object") {
	            // Check for cyclic structures. This is a linear search; performance
	            // is inversely proportional to the number of unique nested objects.
	            for (length = stack.length; length--;) {
	              if (stack[length] === value) {
	                // Cyclic structures cannot be serialized by `JSON.stringify`.
	                throw TypeError();
	              }
	            }
	            // Add the object to the stack of traversed objects.
	            stack.push(value);
	            results = [];
	            // Save the current indentation level and indent one additional level.
	            prefix = indentation;
	            indentation += whitespace;
	            if (className == arrayClass) {
	              // Recursively serialize array elements.
	              for (index = 0, length = value.length; index < length; index++) {
	                element = serialize(index, value, callback, properties, whitespace, indentation, stack);
	                results.push(element === undef ? "null" : element);
	              }
	              result = results.length ? (whitespace ? "[\n" + indentation + results.join(",\n" + indentation) + "\n" + prefix + "]" : ("[" + results.join(",") + "]")) : "[]";
	            } else {
	              // Recursively serialize object members. Members are selected from
	              // either a user-specified list of property names, or the object
	              // itself.
	              forEach(properties || value, function (property) {
	                var element = serialize(property, value, callback, properties, whitespace, indentation, stack);
	                if (element !== undef) {
	                  // According to ES 5.1 section 15.12.3: "If `gap` {whitespace}
	                  // is not the empty string, let `member` {quote(property) + ":"}
	                  // be the concatenation of `member` and the `space` character."
	                  // The "`space` character" refers to the literal space
	                  // character, not the `space` {width} argument provided to
	                  // `JSON.stringify`.
	                  results.push(quote(property) + ":" + (whitespace ? " " : "") + element);
	                }
	              });
	              result = results.length ? (whitespace ? "{\n" + indentation + results.join(",\n" + indentation) + "\n" + prefix + "}" : ("{" + results.join(",") + "}")) : "{}";
	            }
	            // Remove the object from the traversed object stack.
	            stack.pop();
	            return result;
	          }
	        };

	        // Public: `JSON.stringify`. See ES 5.1 section 15.12.3.
	        exports.stringify = function (source, filter, width) {
	          var whitespace, callback, properties, className;
	          if (objectTypes[typeof filter] && filter) {
	            if ((className = getClass.call(filter)) == functionClass) {
	              callback = filter;
	            } else if (className == arrayClass) {
	              // Convert the property names array into a makeshift set.
	              properties = {};
	              for (var index = 0, length = filter.length, value; index < length; value = filter[index++], ((className = getClass.call(value)), className == stringClass || className == numberClass) && (properties[value] = 1));
	            }
	          }
	          if (width) {
	            if ((className = getClass.call(width)) == numberClass) {
	              // Convert the `width` to an integer and create a string containing
	              // `width` number of space characters.
	              if ((width -= width % 1) > 0) {
	                for (whitespace = "", width > 10 && (width = 10); whitespace.length < width; whitespace += " ");
	              }
	            } else if (className == stringClass) {
	              whitespace = width.length <= 10 ? width : width.slice(0, 10);
	            }
	          }
	          // Opera <= 7.54u2 discards the values associated with empty string keys
	          // (`""`) only if they are used directly within an object member list
	          // (e.g., `!("" in { "": 1})`).
	          return serialize("", (value = {}, value[""] = source, value), callback, properties, whitespace, "", []);
	        };
	      }

	      // Public: Parses a JSON source string.
	      if (!has("json-parse")) {
	        var fromCharCode = String.fromCharCode;

	        // Internal: A map of escaped control characters and their unescaped
	        // equivalents.
	        var Unescapes = {
	          92: "\\",
	          34: '"',
	          47: "/",
	          98: "\b",
	          116: "\t",
	          110: "\n",
	          102: "\f",
	          114: "\r"
	        };

	        // Internal: Stores the parser state.
	        var Index, Source;

	        // Internal: Resets the parser state and throws a `SyntaxError`.
	        var abort = function () {
	          Index = Source = null;
	          throw SyntaxError();
	        };

	        // Internal: Returns the next token, or `"$"` if the parser has reached
	        // the end of the source string. A token may be a string, number, `null`
	        // literal, or Boolean literal.
	        var lex = function () {
	          var source = Source, length = source.length, value, begin, position, isSigned, charCode;
	          while (Index < length) {
	            charCode = source.charCodeAt(Index);
	            switch (charCode) {
	              case 9: case 10: case 13: case 32:
	                // Skip whitespace tokens, including tabs, carriage returns, line
	                // feeds, and space characters.
	                Index++;
	                break;
	              case 123: case 125: case 91: case 93: case 58: case 44:
	                // Parse a punctuator token (`{`, `}`, `[`, `]`, `:`, or `,`) at
	                // the current position.
	                value = charIndexBuggy ? source.charAt(Index) : source[Index];
	                Index++;
	                return value;
	              case 34:
	                // `"` delimits a JSON string; advance to the next character and
	                // begin parsing the string. String tokens are prefixed with the
	                // sentinel `@` character to distinguish them from punctuators and
	                // end-of-string tokens.
	                for (value = "@", Index++; Index < length;) {
	                  charCode = source.charCodeAt(Index);
	                  if (charCode < 32) {
	                    // Unescaped ASCII control characters (those with a code unit
	                    // less than the space character) are not permitted.
	                    abort();
	                  } else if (charCode == 92) {
	                    // A reverse solidus (`\`) marks the beginning of an escaped
	                    // control character (including `"`, `\`, and `/`) or Unicode
	                    // escape sequence.
	                    charCode = source.charCodeAt(++Index);
	                    switch (charCode) {
	                      case 92: case 34: case 47: case 98: case 116: case 110: case 102: case 114:
	                        // Revive escaped control characters.
	                        value += Unescapes[charCode];
	                        Index++;
	                        break;
	                      case 117:
	                        // `\u` marks the beginning of a Unicode escape sequence.
	                        // Advance to the first character and validate the
	                        // four-digit code point.
	                        begin = ++Index;
	                        for (position = Index + 4; Index < position; Index++) {
	                          charCode = source.charCodeAt(Index);
	                          // A valid sequence comprises four hexdigits (case-
	                          // insensitive) that form a single hexadecimal value.
	                          if (!(charCode >= 48 && charCode <= 57 || charCode >= 97 && charCode <= 102 || charCode >= 65 && charCode <= 70)) {
	                            // Invalid Unicode escape sequence.
	                            abort();
	                          }
	                        }
	                        // Revive the escaped character.
	                        value += fromCharCode("0x" + source.slice(begin, Index));
	                        break;
	                      default:
	                        // Invalid escape sequence.
	                        abort();
	                    }
	                  } else {
	                    if (charCode == 34) {
	                      // An unescaped double-quote character marks the end of the
	                      // string.
	                      break;
	                    }
	                    charCode = source.charCodeAt(Index);
	                    begin = Index;
	                    // Optimize for the common case where a string is valid.
	                    while (charCode >= 32 && charCode != 92 && charCode != 34) {
	                      charCode = source.charCodeAt(++Index);
	                    }
	                    // Append the string as-is.
	                    value += source.slice(begin, Index);
	                  }
	                }
	                if (source.charCodeAt(Index) == 34) {
	                  // Advance to the next character and return the revived string.
	                  Index++;
	                  return value;
	                }
	                // Unterminated string.
	                abort();
	              default:
	                // Parse numbers and literals.
	                begin = Index;
	                // Advance past the negative sign, if one is specified.
	                if (charCode == 45) {
	                  isSigned = true;
	                  charCode = source.charCodeAt(++Index);
	                }
	                // Parse an integer or floating-point value.
	                if (charCode >= 48 && charCode <= 57) {
	                  // Leading zeroes are interpreted as octal literals.
	                  if (charCode == 48 && ((charCode = source.charCodeAt(Index + 1)), charCode >= 48 && charCode <= 57)) {
	                    // Illegal octal literal.
	                    abort();
	                  }
	                  isSigned = false;
	                  // Parse the integer component.
	                  for (; Index < length && ((charCode = source.charCodeAt(Index)), charCode >= 48 && charCode <= 57); Index++);
	                  // Floats cannot contain a leading decimal point; however, this
	                  // case is already accounted for by the parser.
	                  if (source.charCodeAt(Index) == 46) {
	                    position = ++Index;
	                    // Parse the decimal component.
	                    for (; position < length && ((charCode = source.charCodeAt(position)), charCode >= 48 && charCode <= 57); position++);
	                    if (position == Index) {
	                      // Illegal trailing decimal.
	                      abort();
	                    }
	                    Index = position;
	                  }
	                  // Parse exponents. The `e` denoting the exponent is
	                  // case-insensitive.
	                  charCode = source.charCodeAt(Index);
	                  if (charCode == 101 || charCode == 69) {
	                    charCode = source.charCodeAt(++Index);
	                    // Skip past the sign following the exponent, if one is
	                    // specified.
	                    if (charCode == 43 || charCode == 45) {
	                      Index++;
	                    }
	                    // Parse the exponential component.
	                    for (position = Index; position < length && ((charCode = source.charCodeAt(position)), charCode >= 48 && charCode <= 57); position++);
	                    if (position == Index) {
	                      // Illegal empty exponent.
	                      abort();
	                    }
	                    Index = position;
	                  }
	                  // Coerce the parsed value to a JavaScript number.
	                  return +source.slice(begin, Index);
	                }
	                // A negative sign may only precede numbers.
	                if (isSigned) {
	                  abort();
	                }
	                // `true`, `false`, and `null` literals.
	                if (source.slice(Index, Index + 4) == "true") {
	                  Index += 4;
	                  return true;
	                } else if (source.slice(Index, Index + 5) == "false") {
	                  Index += 5;
	                  return false;
	                } else if (source.slice(Index, Index + 4) == "null") {
	                  Index += 4;
	                  return null;
	                }
	                // Unrecognized token.
	                abort();
	            }
	          }
	          // Return the sentinel `$` character if the parser has reached the end
	          // of the source string.
	          return "$";
	        };

	        // Internal: Parses a JSON `value` token.
	        var get = function (value) {
	          var results, hasMembers;
	          if (value == "$") {
	            // Unexpected end of input.
	            abort();
	          }
	          if (typeof value == "string") {
	            if ((charIndexBuggy ? value.charAt(0) : value[0]) == "@") {
	              // Remove the sentinel `@` character.
	              return value.slice(1);
	            }
	            // Parse object and array literals.
	            if (value == "[") {
	              // Parses a JSON array, returning a new JavaScript array.
	              results = [];
	              for (;; hasMembers || (hasMembers = true)) {
	                value = lex();
	                // A closing square bracket marks the end of the array literal.
	                if (value == "]") {
	                  break;
	                }
	                // If the array literal contains elements, the current token
	                // should be a comma separating the previous element from the
	                // next.
	                if (hasMembers) {
	                  if (value == ",") {
	                    value = lex();
	                    if (value == "]") {
	                      // Unexpected trailing `,` in array literal.
	                      abort();
	                    }
	                  } else {
	                    // A `,` must separate each array element.
	                    abort();
	                  }
	                }
	                // Elisions and leading commas are not permitted.
	                if (value == ",") {
	                  abort();
	                }
	                results.push(get(value));
	              }
	              return results;
	            } else if (value == "{") {
	              // Parses a JSON object, returning a new JavaScript object.
	              results = {};
	              for (;; hasMembers || (hasMembers = true)) {
	                value = lex();
	                // A closing curly brace marks the end of the object literal.
	                if (value == "}") {
	                  break;
	                }
	                // If the object literal contains members, the current token
	                // should be a comma separator.
	                if (hasMembers) {
	                  if (value == ",") {
	                    value = lex();
	                    if (value == "}") {
	                      // Unexpected trailing `,` in object literal.
	                      abort();
	                    }
	                  } else {
	                    // A `,` must separate each object member.
	                    abort();
	                  }
	                }
	                // Leading commas are not permitted, object property names must be
	                // double-quoted strings, and a `:` must separate each property
	                // name and value.
	                if (value == "," || typeof value != "string" || (charIndexBuggy ? value.charAt(0) : value[0]) != "@" || lex() != ":") {
	                  abort();
	                }
	                results[value.slice(1)] = get(lex());
	              }
	              return results;
	            }
	            // Unexpected token encountered.
	            abort();
	          }
	          return value;
	        };

	        // Internal: Updates a traversed object member.
	        var update = function (source, property, callback) {
	          var element = walk(source, property, callback);
	          if (element === undef) {
	            delete source[property];
	          } else {
	            source[property] = element;
	          }
	        };

	        // Internal: Recursively traverses a parsed JSON object, invoking the
	        // `callback` function for each value. This is an implementation of the
	        // `Walk(holder, name)` operation defined in ES 5.1 section 15.12.2.
	        var walk = function (source, property, callback) {
	          var value = source[property], length;
	          if (typeof value == "object" && value) {
	            // `forEach` can't be used to traverse an array in Opera <= 8.54
	            // because its `Object#hasOwnProperty` implementation returns `false`
	            // for array indices (e.g., `![1, 2, 3].hasOwnProperty("0")`).
	            if (getClass.call(value) == arrayClass) {
	              for (length = value.length; length--;) {
	                update(value, length, callback);
	              }
	            } else {
	              forEach(value, function (property) {
	                update(value, property, callback);
	              });
	            }
	          }
	          return callback.call(source, property, value);
	        };

	        // Public: `JSON.parse`. See ES 5.1 section 15.12.2.
	        exports.parse = function (source, callback) {
	          var result, value;
	          Index = 0;
	          Source = "" + source;
	          result = get(lex());
	          // If a JSON string contains multiple tokens, it is invalid.
	          if (lex() != "$") {
	            abort();
	          }
	          // Reset the parser state.
	          Index = Source = null;
	          return callback && getClass.call(callback) == functionClass ? walk((value = {}, value[""] = result, value), "", callback) : result;
	        };
	      }
	    }

	    exports["runInContext"] = runInContext;
	    return exports;
	  }

	  if (freeExports && !isLoader) {
	    // Export for CommonJS environments.
	    runInContext(root, freeExports);
	  } else {
	    // Export for web browsers and JavaScript engines.
	    var nativeJSON = root.JSON,
	        previousJSON = root["JSON3"],
	        isRestored = false;

	    var JSON3 = runInContext(root, (root["JSON3"] = {
	      // Public: Restores the original value of the global `JSON` object and
	      // returns a reference to the `JSON3` object.
	      "noConflict": function () {
	        if (!isRestored) {
	          isRestored = true;
	          root.JSON = nativeJSON;
	          root["JSON3"] = previousJSON;
	          nativeJSON = previousJSON = null;
	        }
	        return JSON3;
	      }
	    }));

	    root.JSON = {
	      "parse": JSON3.parse,
	      "stringify": JSON3.stringify
	    };
	  }

	  // Export for asynchronous module loaders.
	  if (isLoader) {
	    !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
	      return JSON3;
	    }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  }
	}).call(this);

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(68)(module), (function() { return this; }())))

/***/ },
/* 68 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 69 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {module.exports = __webpack_amd_options__;

	/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ },
/* 70 */
/***/ function(module, exports) {

	
	/**
	 * Expose `Emitter`.
	 */

	module.exports = Emitter;

	/**
	 * Initialize a new `Emitter`.
	 *
	 * @api public
	 */

	function Emitter(obj) {
	  if (obj) return mixin(obj);
	};

	/**
	 * Mixin the emitter properties.
	 *
	 * @param {Object} obj
	 * @return {Object}
	 * @api private
	 */

	function mixin(obj) {
	  for (var key in Emitter.prototype) {
	    obj[key] = Emitter.prototype[key];
	  }
	  return obj;
	}

	/**
	 * Listen on the given `event` with `fn`.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */

	Emitter.prototype.on =
	Emitter.prototype.addEventListener = function(event, fn){
	  this._callbacks = this._callbacks || {};
	  (this._callbacks[event] = this._callbacks[event] || [])
	    .push(fn);
	  return this;
	};

	/**
	 * Adds an `event` listener that will be invoked a single
	 * time then automatically removed.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */

	Emitter.prototype.once = function(event, fn){
	  var self = this;
	  this._callbacks = this._callbacks || {};

	  function on() {
	    self.off(event, on);
	    fn.apply(this, arguments);
	  }

	  on.fn = fn;
	  this.on(event, on);
	  return this;
	};

	/**
	 * Remove the given callback for `event` or all
	 * registered callbacks.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */

	Emitter.prototype.off =
	Emitter.prototype.removeListener =
	Emitter.prototype.removeAllListeners =
	Emitter.prototype.removeEventListener = function(event, fn){
	  this._callbacks = this._callbacks || {};

	  // all
	  if (0 == arguments.length) {
	    this._callbacks = {};
	    return this;
	  }

	  // specific event
	  var callbacks = this._callbacks[event];
	  if (!callbacks) return this;

	  // remove all handlers
	  if (1 == arguments.length) {
	    delete this._callbacks[event];
	    return this;
	  }

	  // remove specific handler
	  var cb;
	  for (var i = 0; i < callbacks.length; i++) {
	    cb = callbacks[i];
	    if (cb === fn || cb.fn === fn) {
	      callbacks.splice(i, 1);
	      break;
	    }
	  }
	  return this;
	};

	/**
	 * Emit `event` with the given args.
	 *
	 * @param {String} event
	 * @param {Mixed} ...
	 * @return {Emitter}
	 */

	Emitter.prototype.emit = function(event){
	  this._callbacks = this._callbacks || {};
	  var args = [].slice.call(arguments, 1)
	    , callbacks = this._callbacks[event];

	  if (callbacks) {
	    callbacks = callbacks.slice(0);
	    for (var i = 0, len = callbacks.length; i < len; ++i) {
	      callbacks[i].apply(this, args);
	    }
	  }

	  return this;
	};

	/**
	 * Return array of callbacks for `event`.
	 *
	 * @param {String} event
	 * @return {Array}
	 * @api public
	 */

	Emitter.prototype.listeners = function(event){
	  this._callbacks = this._callbacks || {};
	  return this._callbacks[event] || [];
	};

	/**
	 * Check if this emitter has `event` handlers.
	 *
	 * @param {String} event
	 * @return {Boolean}
	 * @api public
	 */

	Emitter.prototype.hasListeners = function(event){
	  return !! this.listeners(event).length;
	};


/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/*global Blob,File*/

	/**
	 * Module requirements
	 */

	var isArray = __webpack_require__(18);
	var isBuf = __webpack_require__(72);

	/**
	 * Replaces every Buffer | ArrayBuffer in packet with a numbered placeholder.
	 * Anything with blobs or files should be fed through removeBlobs before coming
	 * here.
	 *
	 * @param {Object} packet - socket.io event packet
	 * @return {Object} with deconstructed packet and list of buffers
	 * @api public
	 */

	exports.deconstructPacket = function(packet){
	  var buffers = [];
	  var packetData = packet.data;

	  function _deconstructPacket(data) {
	    if (!data) return data;

	    if (isBuf(data)) {
	      var placeholder = { _placeholder: true, num: buffers.length };
	      buffers.push(data);
	      return placeholder;
	    } else if (isArray(data)) {
	      var newData = new Array(data.length);
	      for (var i = 0; i < data.length; i++) {
	        newData[i] = _deconstructPacket(data[i]);
	      }
	      return newData;
	    } else if ('object' == typeof data && !(data instanceof Date)) {
	      var newData = {};
	      for (var key in data) {
	        newData[key] = _deconstructPacket(data[key]);
	      }
	      return newData;
	    }
	    return data;
	  }

	  var pack = packet;
	  pack.data = _deconstructPacket(packetData);
	  pack.attachments = buffers.length; // number of binary 'attachments'
	  return {packet: pack, buffers: buffers};
	};

	/**
	 * Reconstructs a binary packet from its placeholder packet and buffers
	 *
	 * @param {Object} packet - event packet with placeholders
	 * @param {Array} buffers - binary buffers to put in placeholder positions
	 * @return {Object} reconstructed packet
	 * @api public
	 */

	exports.reconstructPacket = function(packet, buffers) {
	  var curPlaceHolder = 0;

	  function _reconstructPacket(data) {
	    if (data && data._placeholder) {
	      var buf = buffers[data.num]; // appropriate buffer (should be natural order anyway)
	      return buf;
	    } else if (isArray(data)) {
	      for (var i = 0; i < data.length; i++) {
	        data[i] = _reconstructPacket(data[i]);
	      }
	      return data;
	    } else if (data && 'object' == typeof data) {
	      for (var key in data) {
	        data[key] = _reconstructPacket(data[key]);
	      }
	      return data;
	    }
	    return data;
	  }

	  packet.data = _reconstructPacket(packet.data);
	  packet.attachments = undefined; // no longer useful
	  return packet;
	};

	/**
	 * Asynchronously removes Blobs or Files from data via
	 * FileReader's readAsArrayBuffer method. Used before encoding
	 * data as msgpack. Calls callback with the blobless data.
	 *
	 * @param {Object} data
	 * @param {Function} callback
	 * @api private
	 */

	exports.removeBlobs = function(data, callback) {
	  function _removeBlobs(obj, curKey, containingObject) {
	    if (!obj) return obj;

	    // convert any blob
	    if ((global.Blob && obj instanceof Blob) ||
	        (global.File && obj instanceof File)) {
	      pendingBlobs++;

	      // async filereader
	      var fileReader = new FileReader();
	      fileReader.onload = function() { // this.result == arraybuffer
	        if (containingObject) {
	          containingObject[curKey] = this.result;
	        }
	        else {
	          bloblessData = this.result;
	        }

	        // if nothing pending its callback time
	        if(! --pendingBlobs) {
	          callback(bloblessData);
	        }
	      };

	      fileReader.readAsArrayBuffer(obj); // blob -> arraybuffer
	    } else if (isArray(obj)) { // handle array
	      for (var i = 0; i < obj.length; i++) {
	        _removeBlobs(obj[i], i, obj);
	      }
	    } else if (obj && 'object' == typeof obj && !isBuf(obj)) { // and object
	      for (var key in obj) {
	        _removeBlobs(obj[key], key, obj);
	      }
	    }
	  }

	  var pendingBlobs = 0;
	  var bloblessData = data;
	  _removeBlobs(bloblessData);
	  if (!pendingBlobs) {
	    callback(bloblessData);
	  }
	};

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 72 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {
	module.exports = isBuf;

	/**
	 * Returns true if obj is a buffer or an arraybuffer.
	 *
	 * @api private
	 */

	function isBuf(obj) {
	  return (global.Buffer && global.Buffer.isBuffer(obj)) ||
	         (global.ArrayBuffer && obj instanceof ArrayBuffer);
	}

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * Module dependencies.
	 */

	var eio = __webpack_require__(74);
	var Socket = __webpack_require__(103);
	var Emitter = __webpack_require__(104);
	var parser = __webpack_require__(63);
	var on = __webpack_require__(106);
	var bind = __webpack_require__(107);
	var debug = __webpack_require__(60)('socket.io-client:manager');
	var indexOf = __webpack_require__(101);
	var Backoff = __webpack_require__(109);

	/**
	 * IE6+ hasOwnProperty
	 */

	var has = Object.prototype.hasOwnProperty;

	/**
	 * Module exports
	 */

	module.exports = Manager;

	/**
	 * `Manager` constructor.
	 *
	 * @param {String} engine instance or engine uri/opts
	 * @param {Object} options
	 * @api public
	 */

	function Manager (uri, opts) {
	  if (!(this instanceof Manager)) return new Manager(uri, opts);
	  if (uri && ('object' === typeof uri)) {
	    opts = uri;
	    uri = undefined;
	  }
	  opts = opts || {};

	  opts.path = opts.path || '/socket.io';
	  this.nsps = {};
	  this.subs = [];
	  this.opts = opts;
	  this.reconnection(opts.reconnection !== false);
	  this.reconnectionAttempts(opts.reconnectionAttempts || Infinity);
	  this.reconnectionDelay(opts.reconnectionDelay || 1000);
	  this.reconnectionDelayMax(opts.reconnectionDelayMax || 5000);
	  this.randomizationFactor(opts.randomizationFactor || 0.5);
	  this.backoff = new Backoff({
	    min: this.reconnectionDelay(),
	    max: this.reconnectionDelayMax(),
	    jitter: this.randomizationFactor()
	  });
	  this.timeout(null == opts.timeout ? 20000 : opts.timeout);
	  this.readyState = 'closed';
	  this.uri = uri;
	  this.connecting = [];
	  this.lastPing = null;
	  this.encoding = false;
	  this.packetBuffer = [];
	  this.encoder = new parser.Encoder();
	  this.decoder = new parser.Decoder();
	  this.autoConnect = opts.autoConnect !== false;
	  if (this.autoConnect) this.open();
	}

	/**
	 * Propagate given event to sockets and emit on `this`
	 *
	 * @api private
	 */

	Manager.prototype.emitAll = function () {
	  this.emit.apply(this, arguments);
	  for (var nsp in this.nsps) {
	    if (has.call(this.nsps, nsp)) {
	      this.nsps[nsp].emit.apply(this.nsps[nsp], arguments);
	    }
	  }
	};

	/**
	 * Update `socket.id` of all sockets
	 *
	 * @api private
	 */

	Manager.prototype.updateSocketIds = function () {
	  for (var nsp in this.nsps) {
	    if (has.call(this.nsps, nsp)) {
	      this.nsps[nsp].id = this.engine.id;
	    }
	  }
	};

	/**
	 * Mix in `Emitter`.
	 */

	Emitter(Manager.prototype);

	/**
	 * Sets the `reconnection` config.
	 *
	 * @param {Boolean} true/false if it should automatically reconnect
	 * @return {Manager} self or value
	 * @api public
	 */

	Manager.prototype.reconnection = function (v) {
	  if (!arguments.length) return this._reconnection;
	  this._reconnection = !!v;
	  return this;
	};

	/**
	 * Sets the reconnection attempts config.
	 *
	 * @param {Number} max reconnection attempts before giving up
	 * @return {Manager} self or value
	 * @api public
	 */

	Manager.prototype.reconnectionAttempts = function (v) {
	  if (!arguments.length) return this._reconnectionAttempts;
	  this._reconnectionAttempts = v;
	  return this;
	};

	/**
	 * Sets the delay between reconnections.
	 *
	 * @param {Number} delay
	 * @return {Manager} self or value
	 * @api public
	 */

	Manager.prototype.reconnectionDelay = function (v) {
	  if (!arguments.length) return this._reconnectionDelay;
	  this._reconnectionDelay = v;
	  this.backoff && this.backoff.setMin(v);
	  return this;
	};

	Manager.prototype.randomizationFactor = function (v) {
	  if (!arguments.length) return this._randomizationFactor;
	  this._randomizationFactor = v;
	  this.backoff && this.backoff.setJitter(v);
	  return this;
	};

	/**
	 * Sets the maximum delay between reconnections.
	 *
	 * @param {Number} delay
	 * @return {Manager} self or value
	 * @api public
	 */

	Manager.prototype.reconnectionDelayMax = function (v) {
	  if (!arguments.length) return this._reconnectionDelayMax;
	  this._reconnectionDelayMax = v;
	  this.backoff && this.backoff.setMax(v);
	  return this;
	};

	/**
	 * Sets the connection timeout. `false` to disable
	 *
	 * @return {Manager} self or value
	 * @api public
	 */

	Manager.prototype.timeout = function (v) {
	  if (!arguments.length) return this._timeout;
	  this._timeout = v;
	  return this;
	};

	/**
	 * Starts trying to reconnect if reconnection is enabled and we have not
	 * started reconnecting yet
	 *
	 * @api private
	 */

	Manager.prototype.maybeReconnectOnOpen = function () {
	  // Only try to reconnect if it's the first time we're connecting
	  if (!this.reconnecting && this._reconnection && this.backoff.attempts === 0) {
	    // keeps reconnection from firing twice for the same reconnection loop
	    this.reconnect();
	  }
	};

	/**
	 * Sets the current transport `socket`.
	 *
	 * @param {Function} optional, callback
	 * @return {Manager} self
	 * @api public
	 */

	Manager.prototype.open =
	Manager.prototype.connect = function (fn, opts) {
	  debug('readyState %s', this.readyState);
	  if (~this.readyState.indexOf('open')) return this;

	  debug('opening %s', this.uri);
	  this.engine = eio(this.uri, this.opts);
	  var socket = this.engine;
	  var self = this;
	  this.readyState = 'opening';
	  this.skipReconnect = false;

	  // emit `open`
	  var openSub = on(socket, 'open', function () {
	    self.onopen();
	    fn && fn();
	  });

	  // emit `connect_error`
	  var errorSub = on(socket, 'error', function (data) {
	    debug('connect_error');
	    self.cleanup();
	    self.readyState = 'closed';
	    self.emitAll('connect_error', data);
	    if (fn) {
	      var err = new Error('Connection error');
	      err.data = data;
	      fn(err);
	    } else {
	      // Only do this if there is no fn to handle the error
	      self.maybeReconnectOnOpen();
	    }
	  });

	  // emit `connect_timeout`
	  if (false !== this._timeout) {
	    var timeout = this._timeout;
	    debug('connect attempt will timeout after %d', timeout);

	    // set timer
	    var timer = setTimeout(function () {
	      debug('connect attempt timed out after %d', timeout);
	      openSub.destroy();
	      socket.close();
	      socket.emit('error', 'timeout');
	      self.emitAll('connect_timeout', timeout);
	    }, timeout);

	    this.subs.push({
	      destroy: function () {
	        clearTimeout(timer);
	      }
	    });
	  }

	  this.subs.push(openSub);
	  this.subs.push(errorSub);

	  return this;
	};

	/**
	 * Called upon transport open.
	 *
	 * @api private
	 */

	Manager.prototype.onopen = function () {
	  debug('open');

	  // clear old subs
	  this.cleanup();

	  // mark as open
	  this.readyState = 'open';
	  this.emit('open');

	  // add new subs
	  var socket = this.engine;
	  this.subs.push(on(socket, 'data', bind(this, 'ondata')));
	  this.subs.push(on(socket, 'ping', bind(this, 'onping')));
	  this.subs.push(on(socket, 'pong', bind(this, 'onpong')));
	  this.subs.push(on(socket, 'error', bind(this, 'onerror')));
	  this.subs.push(on(socket, 'close', bind(this, 'onclose')));
	  this.subs.push(on(this.decoder, 'decoded', bind(this, 'ondecoded')));
	};

	/**
	 * Called upon a ping.
	 *
	 * @api private
	 */

	Manager.prototype.onping = function () {
	  this.lastPing = new Date();
	  this.emitAll('ping');
	};

	/**
	 * Called upon a packet.
	 *
	 * @api private
	 */

	Manager.prototype.onpong = function () {
	  this.emitAll('pong', new Date() - this.lastPing);
	};

	/**
	 * Called with data.
	 *
	 * @api private
	 */

	Manager.prototype.ondata = function (data) {
	  this.decoder.add(data);
	};

	/**
	 * Called when parser fully decodes a packet.
	 *
	 * @api private
	 */

	Manager.prototype.ondecoded = function (packet) {
	  this.emit('packet', packet);
	};

	/**
	 * Called upon socket error.
	 *
	 * @api private
	 */

	Manager.prototype.onerror = function (err) {
	  debug('error', err);
	  this.emitAll('error', err);
	};

	/**
	 * Creates a new socket for the given `nsp`.
	 *
	 * @return {Socket}
	 * @api public
	 */

	Manager.prototype.socket = function (nsp, opts) {
	  var socket = this.nsps[nsp];
	  if (!socket) {
	    socket = new Socket(this, nsp, opts);
	    this.nsps[nsp] = socket;
	    var self = this;
	    socket.on('connecting', onConnecting);
	    socket.on('connect', function () {
	      socket.id = self.engine.id;
	    });

	    if (this.autoConnect) {
	      // manually call here since connecting evnet is fired before listening
	      onConnecting();
	    }
	  }

	  function onConnecting () {
	    if (!~indexOf(self.connecting, socket)) {
	      self.connecting.push(socket);
	    }
	  }

	  return socket;
	};

	/**
	 * Called upon a socket close.
	 *
	 * @param {Socket} socket
	 */

	Manager.prototype.destroy = function (socket) {
	  var index = indexOf(this.connecting, socket);
	  if (~index) this.connecting.splice(index, 1);
	  if (this.connecting.length) return;

	  this.close();
	};

	/**
	 * Writes a packet.
	 *
	 * @param {Object} packet
	 * @api private
	 */

	Manager.prototype.packet = function (packet) {
	  debug('writing packet %j', packet);
	  var self = this;
	  if (packet.query && packet.type === 0) packet.nsp += '?' + packet.query;

	  if (!self.encoding) {
	    // encode, then write to engine with result
	    self.encoding = true;
	    this.encoder.encode(packet, function (encodedPackets) {
	      for (var i = 0; i < encodedPackets.length; i++) {
	        self.engine.write(encodedPackets[i], packet.options);
	      }
	      self.encoding = false;
	      self.processPacketQueue();
	    });
	  } else { // add packet to the queue
	    self.packetBuffer.push(packet);
	  }
	};

	/**
	 * If packet buffer is non-empty, begins encoding the
	 * next packet in line.
	 *
	 * @api private
	 */

	Manager.prototype.processPacketQueue = function () {
	  if (this.packetBuffer.length > 0 && !this.encoding) {
	    var pack = this.packetBuffer.shift();
	    this.packet(pack);
	  }
	};

	/**
	 * Clean up transport subscriptions and packet buffer.
	 *
	 * @api private
	 */

	Manager.prototype.cleanup = function () {
	  debug('cleanup');

	  var subsLength = this.subs.length;
	  for (var i = 0; i < subsLength; i++) {
	    var sub = this.subs.shift();
	    sub.destroy();
	  }

	  this.packetBuffer = [];
	  this.encoding = false;
	  this.lastPing = null;

	  this.decoder.destroy();
	};

	/**
	 * Close the current socket.
	 *
	 * @api private
	 */

	Manager.prototype.close =
	Manager.prototype.disconnect = function () {
	  debug('disconnect');
	  this.skipReconnect = true;
	  this.reconnecting = false;
	  if ('opening' === this.readyState) {
	    // `onclose` will not fire because
	    // an open event never happened
	    this.cleanup();
	  }
	  this.backoff.reset();
	  this.readyState = 'closed';
	  if (this.engine) this.engine.close();
	};

	/**
	 * Called upon engine close.
	 *
	 * @api private
	 */

	Manager.prototype.onclose = function (reason) {
	  debug('onclose');

	  this.cleanup();
	  this.backoff.reset();
	  this.readyState = 'closed';
	  this.emit('close', reason);

	  if (this._reconnection && !this.skipReconnect) {
	    this.reconnect();
	  }
	};

	/**
	 * Attempt a reconnection.
	 *
	 * @api private
	 */

	Manager.prototype.reconnect = function () {
	  if (this.reconnecting || this.skipReconnect) return this;

	  var self = this;

	  if (this.backoff.attempts >= this._reconnectionAttempts) {
	    debug('reconnect failed');
	    this.backoff.reset();
	    this.emitAll('reconnect_failed');
	    this.reconnecting = false;
	  } else {
	    var delay = this.backoff.duration();
	    debug('will wait %dms before reconnect attempt', delay);

	    this.reconnecting = true;
	    var timer = setTimeout(function () {
	      if (self.skipReconnect) return;

	      debug('attempting reconnect');
	      self.emitAll('reconnect_attempt', self.backoff.attempts);
	      self.emitAll('reconnecting', self.backoff.attempts);

	      // check again for the case socket closed in above events
	      if (self.skipReconnect) return;

	      self.open(function (err) {
	        if (err) {
	          debug('reconnect attempt error');
	          self.reconnecting = false;
	          self.reconnect();
	          self.emitAll('reconnect_error', err.data);
	        } else {
	          debug('reconnect success');
	          self.onreconnect();
	        }
	      });
	    }, delay);

	    this.subs.push({
	      destroy: function () {
	        clearTimeout(timer);
	      }
	    });
	  }
	};

	/**
	 * Called upon successful reconnect.
	 *
	 * @api private
	 */

	Manager.prototype.onreconnect = function () {
	  var attempt = this.backoff.attempts;
	  this.reconnecting = false;
	  this.backoff.reset();
	  this.updateSocketIds();
	  this.emitAll('reconnect', attempt);
	};


/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	
	module.exports = __webpack_require__(75);


/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	
	module.exports = __webpack_require__(76);

	/**
	 * Exports parser
	 *
	 * @api public
	 *
	 */
	module.exports.parser = __webpack_require__(83);


/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * Module dependencies.
	 */

	var transports = __webpack_require__(77);
	var Emitter = __webpack_require__(91);
	var debug = __webpack_require__(95)('engine.io-client:socket');
	var index = __webpack_require__(101);
	var parser = __webpack_require__(83);
	var parseuri = __webpack_require__(59);
	var parsejson = __webpack_require__(102);
	var parseqs = __webpack_require__(92);

	/**
	 * Module exports.
	 */

	module.exports = Socket;

	/**
	 * Socket constructor.
	 *
	 * @param {String|Object} uri or options
	 * @param {Object} options
	 * @api public
	 */

	function Socket (uri, opts) {
	  if (!(this instanceof Socket)) return new Socket(uri, opts);

	  opts = opts || {};

	  if (uri && 'object' === typeof uri) {
	    opts = uri;
	    uri = null;
	  }

	  if (uri) {
	    uri = parseuri(uri);
	    opts.hostname = uri.host;
	    opts.secure = uri.protocol === 'https' || uri.protocol === 'wss';
	    opts.port = uri.port;
	    if (uri.query) opts.query = uri.query;
	  } else if (opts.host) {
	    opts.hostname = parseuri(opts.host).host;
	  }

	  this.secure = null != opts.secure ? opts.secure
	    : (global.location && 'https:' === location.protocol);

	  if (opts.hostname && !opts.port) {
	    // if no port is specified manually, use the protocol default
	    opts.port = this.secure ? '443' : '80';
	  }

	  this.agent = opts.agent || false;
	  this.hostname = opts.hostname ||
	    (global.location ? location.hostname : 'localhost');
	  this.port = opts.port || (global.location && location.port
	      ? location.port
	      : (this.secure ? 443 : 80));
	  this.query = opts.query || {};
	  if ('string' === typeof this.query) this.query = parseqs.decode(this.query);
	  this.upgrade = false !== opts.upgrade;
	  this.path = (opts.path || '/engine.io').replace(/\/$/, '') + '/';
	  this.forceJSONP = !!opts.forceJSONP;
	  this.jsonp = false !== opts.jsonp;
	  this.forceBase64 = !!opts.forceBase64;
	  this.enablesXDR = !!opts.enablesXDR;
	  this.timestampParam = opts.timestampParam || 't';
	  this.timestampRequests = opts.timestampRequests;
	  this.transports = opts.transports || ['polling', 'websocket'];
	  this.readyState = '';
	  this.writeBuffer = [];
	  this.prevBufferLen = 0;
	  this.policyPort = opts.policyPort || 843;
	  this.rememberUpgrade = opts.rememberUpgrade || false;
	  this.binaryType = null;
	  this.onlyBinaryUpgrades = opts.onlyBinaryUpgrades;
	  this.perMessageDeflate = false !== opts.perMessageDeflate ? (opts.perMessageDeflate || {}) : false;

	  if (true === this.perMessageDeflate) this.perMessageDeflate = {};
	  if (this.perMessageDeflate && null == this.perMessageDeflate.threshold) {
	    this.perMessageDeflate.threshold = 1024;
	  }

	  // SSL options for Node.js client
	  this.pfx = opts.pfx || null;
	  this.key = opts.key || null;
	  this.passphrase = opts.passphrase || null;
	  this.cert = opts.cert || null;
	  this.ca = opts.ca || null;
	  this.ciphers = opts.ciphers || null;
	  this.rejectUnauthorized = opts.rejectUnauthorized === undefined ? null : opts.rejectUnauthorized;
	  this.forceNode = !!opts.forceNode;

	  // other options for Node.js client
	  var freeGlobal = typeof global === 'object' && global;
	  if (freeGlobal.global === freeGlobal) {
	    if (opts.extraHeaders && Object.keys(opts.extraHeaders).length > 0) {
	      this.extraHeaders = opts.extraHeaders;
	    }

	    if (opts.localAddress) {
	      this.localAddress = opts.localAddress;
	    }
	  }

	  // set on handshake
	  this.id = null;
	  this.upgrades = null;
	  this.pingInterval = null;
	  this.pingTimeout = null;

	  // set on heartbeat
	  this.pingIntervalTimer = null;
	  this.pingTimeoutTimer = null;

	  this.open();
	}

	Socket.priorWebsocketSuccess = false;

	/**
	 * Mix in `Emitter`.
	 */

	Emitter(Socket.prototype);

	/**
	 * Protocol version.
	 *
	 * @api public
	 */

	Socket.protocol = parser.protocol; // this is an int

	/**
	 * Expose deps for legacy compatibility
	 * and standalone browser access.
	 */

	Socket.Socket = Socket;
	Socket.Transport = __webpack_require__(82);
	Socket.transports = __webpack_require__(77);
	Socket.parser = __webpack_require__(83);

	/**
	 * Creates transport of the given type.
	 *
	 * @param {String} transport name
	 * @return {Transport}
	 * @api private
	 */

	Socket.prototype.createTransport = function (name) {
	  debug('creating transport "%s"', name);
	  var query = clone(this.query);

	  // append engine.io protocol identifier
	  query.EIO = parser.protocol;

	  // transport name
	  query.transport = name;

	  // session id if we already have one
	  if (this.id) query.sid = this.id;

	  var transport = new transports[name]({
	    agent: this.agent,
	    hostname: this.hostname,
	    port: this.port,
	    secure: this.secure,
	    path: this.path,
	    query: query,
	    forceJSONP: this.forceJSONP,
	    jsonp: this.jsonp,
	    forceBase64: this.forceBase64,
	    enablesXDR: this.enablesXDR,
	    timestampRequests: this.timestampRequests,
	    timestampParam: this.timestampParam,
	    policyPort: this.policyPort,
	    socket: this,
	    pfx: this.pfx,
	    key: this.key,
	    passphrase: this.passphrase,
	    cert: this.cert,
	    ca: this.ca,
	    ciphers: this.ciphers,
	    rejectUnauthorized: this.rejectUnauthorized,
	    perMessageDeflate: this.perMessageDeflate,
	    extraHeaders: this.extraHeaders,
	    forceNode: this.forceNode,
	    localAddress: this.localAddress
	  });

	  return transport;
	};

	function clone (obj) {
	  var o = {};
	  for (var i in obj) {
	    if (obj.hasOwnProperty(i)) {
	      o[i] = obj[i];
	    }
	  }
	  return o;
	}

	/**
	 * Initializes transport to use and starts probe.
	 *
	 * @api private
	 */
	Socket.prototype.open = function () {
	  var transport;
	  if (this.rememberUpgrade && Socket.priorWebsocketSuccess && this.transports.indexOf('websocket') !== -1) {
	    transport = 'websocket';
	  } else if (0 === this.transports.length) {
	    // Emit error on next tick so it can be listened to
	    var self = this;
	    setTimeout(function () {
	      self.emit('error', 'No transports available');
	    }, 0);
	    return;
	  } else {
	    transport = this.transports[0];
	  }
	  this.readyState = 'opening';

	  // Retry with the next transport if the transport is disabled (jsonp: false)
	  try {
	    transport = this.createTransport(transport);
	  } catch (e) {
	    this.transports.shift();
	    this.open();
	    return;
	  }

	  transport.open();
	  this.setTransport(transport);
	};

	/**
	 * Sets the current transport. Disables the existing one (if any).
	 *
	 * @api private
	 */

	Socket.prototype.setTransport = function (transport) {
	  debug('setting transport %s', transport.name);
	  var self = this;

	  if (this.transport) {
	    debug('clearing existing transport %s', this.transport.name);
	    this.transport.removeAllListeners();
	  }

	  // set up transport
	  this.transport = transport;

	  // set up transport listeners
	  transport
	  .on('drain', function () {
	    self.onDrain();
	  })
	  .on('packet', function (packet) {
	    self.onPacket(packet);
	  })
	  .on('error', function (e) {
	    self.onError(e);
	  })
	  .on('close', function () {
	    self.onClose('transport close');
	  });
	};

	/**
	 * Probes a transport.
	 *
	 * @param {String} transport name
	 * @api private
	 */

	Socket.prototype.probe = function (name) {
	  debug('probing transport "%s"', name);
	  var transport = this.createTransport(name, { probe: 1 });
	  var failed = false;
	  var self = this;

	  Socket.priorWebsocketSuccess = false;

	  function onTransportOpen () {
	    if (self.onlyBinaryUpgrades) {
	      var upgradeLosesBinary = !this.supportsBinary && self.transport.supportsBinary;
	      failed = failed || upgradeLosesBinary;
	    }
	    if (failed) return;

	    debug('probe transport "%s" opened', name);
	    transport.send([{ type: 'ping', data: 'probe' }]);
	    transport.once('packet', function (msg) {
	      if (failed) return;
	      if ('pong' === msg.type && 'probe' === msg.data) {
	        debug('probe transport "%s" pong', name);
	        self.upgrading = true;
	        self.emit('upgrading', transport);
	        if (!transport) return;
	        Socket.priorWebsocketSuccess = 'websocket' === transport.name;

	        debug('pausing current transport "%s"', self.transport.name);
	        self.transport.pause(function () {
	          if (failed) return;
	          if ('closed' === self.readyState) return;
	          debug('changing transport and sending upgrade packet');

	          cleanup();

	          self.setTransport(transport);
	          transport.send([{ type: 'upgrade' }]);
	          self.emit('upgrade', transport);
	          transport = null;
	          self.upgrading = false;
	          self.flush();
	        });
	      } else {
	        debug('probe transport "%s" failed', name);
	        var err = new Error('probe error');
	        err.transport = transport.name;
	        self.emit('upgradeError', err);
	      }
	    });
	  }

	  function freezeTransport () {
	    if (failed) return;

	    // Any callback called by transport should be ignored since now
	    failed = true;

	    cleanup();

	    transport.close();
	    transport = null;
	  }

	  // Handle any error that happens while probing
	  function onerror (err) {
	    var error = new Error('probe error: ' + err);
	    error.transport = transport.name;

	    freezeTransport();

	    debug('probe transport "%s" failed because of error: %s', name, err);

	    self.emit('upgradeError', error);
	  }

	  function onTransportClose () {
	    onerror('transport closed');
	  }

	  // When the socket is closed while we're probing
	  function onclose () {
	    onerror('socket closed');
	  }

	  // When the socket is upgraded while we're probing
	  function onupgrade (to) {
	    if (transport && to.name !== transport.name) {
	      debug('"%s" works - aborting "%s"', to.name, transport.name);
	      freezeTransport();
	    }
	  }

	  // Remove all listeners on the transport and on self
	  function cleanup () {
	    transport.removeListener('open', onTransportOpen);
	    transport.removeListener('error', onerror);
	    transport.removeListener('close', onTransportClose);
	    self.removeListener('close', onclose);
	    self.removeListener('upgrading', onupgrade);
	  }

	  transport.once('open', onTransportOpen);
	  transport.once('error', onerror);
	  transport.once('close', onTransportClose);

	  this.once('close', onclose);
	  this.once('upgrading', onupgrade);

	  transport.open();
	};

	/**
	 * Called when connection is deemed open.
	 *
	 * @api public
	 */

	Socket.prototype.onOpen = function () {
	  debug('socket open');
	  this.readyState = 'open';
	  Socket.priorWebsocketSuccess = 'websocket' === this.transport.name;
	  this.emit('open');
	  this.flush();

	  // we check for `readyState` in case an `open`
	  // listener already closed the socket
	  if ('open' === this.readyState && this.upgrade && this.transport.pause) {
	    debug('starting upgrade probes');
	    for (var i = 0, l = this.upgrades.length; i < l; i++) {
	      this.probe(this.upgrades[i]);
	    }
	  }
	};

	/**
	 * Handles a packet.
	 *
	 * @api private
	 */

	Socket.prototype.onPacket = function (packet) {
	  if ('opening' === this.readyState || 'open' === this.readyState ||
	      'closing' === this.readyState) {
	    debug('socket receive: type "%s", data "%s"', packet.type, packet.data);

	    this.emit('packet', packet);

	    // Socket is live - any packet counts
	    this.emit('heartbeat');

	    switch (packet.type) {
	      case 'open':
	        this.onHandshake(parsejson(packet.data));
	        break;

	      case 'pong':
	        this.setPing();
	        this.emit('pong');
	        break;

	      case 'error':
	        var err = new Error('server error');
	        err.code = packet.data;
	        this.onError(err);
	        break;

	      case 'message':
	        this.emit('data', packet.data);
	        this.emit('message', packet.data);
	        break;
	    }
	  } else {
	    debug('packet received with socket readyState "%s"', this.readyState);
	  }
	};

	/**
	 * Called upon handshake completion.
	 *
	 * @param {Object} handshake obj
	 * @api private
	 */

	Socket.prototype.onHandshake = function (data) {
	  this.emit('handshake', data);
	  this.id = data.sid;
	  this.transport.query.sid = data.sid;
	  this.upgrades = this.filterUpgrades(data.upgrades);
	  this.pingInterval = data.pingInterval;
	  this.pingTimeout = data.pingTimeout;
	  this.onOpen();
	  // In case open handler closes socket
	  if ('closed' === this.readyState) return;
	  this.setPing();

	  // Prolong liveness of socket on heartbeat
	  this.removeListener('heartbeat', this.onHeartbeat);
	  this.on('heartbeat', this.onHeartbeat);
	};

	/**
	 * Resets ping timeout.
	 *
	 * @api private
	 */

	Socket.prototype.onHeartbeat = function (timeout) {
	  clearTimeout(this.pingTimeoutTimer);
	  var self = this;
	  self.pingTimeoutTimer = setTimeout(function () {
	    if ('closed' === self.readyState) return;
	    self.onClose('ping timeout');
	  }, timeout || (self.pingInterval + self.pingTimeout));
	};

	/**
	 * Pings server every `this.pingInterval` and expects response
	 * within `this.pingTimeout` or closes connection.
	 *
	 * @api private
	 */

	Socket.prototype.setPing = function () {
	  var self = this;
	  clearTimeout(self.pingIntervalTimer);
	  self.pingIntervalTimer = setTimeout(function () {
	    debug('writing ping packet - expecting pong within %sms', self.pingTimeout);
	    self.ping();
	    self.onHeartbeat(self.pingTimeout);
	  }, self.pingInterval);
	};

	/**
	* Sends a ping packet.
	*
	* @api private
	*/

	Socket.prototype.ping = function () {
	  var self = this;
	  this.sendPacket('ping', function () {
	    self.emit('ping');
	  });
	};

	/**
	 * Called on `drain` event
	 *
	 * @api private
	 */

	Socket.prototype.onDrain = function () {
	  this.writeBuffer.splice(0, this.prevBufferLen);

	  // setting prevBufferLen = 0 is very important
	  // for example, when upgrading, upgrade packet is sent over,
	  // and a nonzero prevBufferLen could cause problems on `drain`
	  this.prevBufferLen = 0;

	  if (0 === this.writeBuffer.length) {
	    this.emit('drain');
	  } else {
	    this.flush();
	  }
	};

	/**
	 * Flush write buffers.
	 *
	 * @api private
	 */

	Socket.prototype.flush = function () {
	  if ('closed' !== this.readyState && this.transport.writable &&
	    !this.upgrading && this.writeBuffer.length) {
	    debug('flushing %d packets in socket', this.writeBuffer.length);
	    this.transport.send(this.writeBuffer);
	    // keep track of current length of writeBuffer
	    // splice writeBuffer and callbackBuffer on `drain`
	    this.prevBufferLen = this.writeBuffer.length;
	    this.emit('flush');
	  }
	};

	/**
	 * Sends a message.
	 *
	 * @param {String} message.
	 * @param {Function} callback function.
	 * @param {Object} options.
	 * @return {Socket} for chaining.
	 * @api public
	 */

	Socket.prototype.write =
	Socket.prototype.send = function (msg, options, fn) {
	  this.sendPacket('message', msg, options, fn);
	  return this;
	};

	/**
	 * Sends a packet.
	 *
	 * @param {String} packet type.
	 * @param {String} data.
	 * @param {Object} options.
	 * @param {Function} callback function.
	 * @api private
	 */

	Socket.prototype.sendPacket = function (type, data, options, fn) {
	  if ('function' === typeof data) {
	    fn = data;
	    data = undefined;
	  }

	  if ('function' === typeof options) {
	    fn = options;
	    options = null;
	  }

	  if ('closing' === this.readyState || 'closed' === this.readyState) {
	    return;
	  }

	  options = options || {};
	  options.compress = false !== options.compress;

	  var packet = {
	    type: type,
	    data: data,
	    options: options
	  };
	  this.emit('packetCreate', packet);
	  this.writeBuffer.push(packet);
	  if (fn) this.once('flush', fn);
	  this.flush();
	};

	/**
	 * Closes the connection.
	 *
	 * @api private
	 */

	Socket.prototype.close = function () {
	  if ('opening' === this.readyState || 'open' === this.readyState) {
	    this.readyState = 'closing';

	    var self = this;

	    if (this.writeBuffer.length) {
	      this.once('drain', function () {
	        if (this.upgrading) {
	          waitForUpgrade();
	        } else {
	          close();
	        }
	      });
	    } else if (this.upgrading) {
	      waitForUpgrade();
	    } else {
	      close();
	    }
	  }

	  function close () {
	    self.onClose('forced close');
	    debug('socket closing - telling transport to close');
	    self.transport.close();
	  }

	  function cleanupAndClose () {
	    self.removeListener('upgrade', cleanupAndClose);
	    self.removeListener('upgradeError', cleanupAndClose);
	    close();
	  }

	  function waitForUpgrade () {
	    // wait for upgrade to finish since we can't send packets while pausing a transport
	    self.once('upgrade', cleanupAndClose);
	    self.once('upgradeError', cleanupAndClose);
	  }

	  return this;
	};

	/**
	 * Called upon transport error
	 *
	 * @api private
	 */

	Socket.prototype.onError = function (err) {
	  debug('socket error %j', err);
	  Socket.priorWebsocketSuccess = false;
	  this.emit('error', err);
	  this.onClose('transport error', err);
	};

	/**
	 * Called upon transport close.
	 *
	 * @api private
	 */

	Socket.prototype.onClose = function (reason, desc) {
	  if ('opening' === this.readyState || 'open' === this.readyState || 'closing' === this.readyState) {
	    debug('socket close with reason: "%s"', reason);
	    var self = this;

	    // clear timers
	    clearTimeout(this.pingIntervalTimer);
	    clearTimeout(this.pingTimeoutTimer);

	    // stop event from firing again for transport
	    this.transport.removeAllListeners('close');

	    // ensure transport won't stay open
	    this.transport.close();

	    // ignore further transport communication
	    this.transport.removeAllListeners();

	    // set ready state
	    this.readyState = 'closed';

	    // clear session id
	    this.id = null;

	    // emit close event
	    this.emit('close', reason, desc);

	    // clean buffers after, so users can still
	    // grab the buffers on `close` event
	    self.writeBuffer = [];
	    self.prevBufferLen = 0;
	  }
	};

	/**
	 * Filters upgrades, returning only those matching client transports.
	 *
	 * @param {Array} server upgrades
	 * @api private
	 *
	 */

	Socket.prototype.filterUpgrades = function (upgrades) {
	  var filteredUpgrades = [];
	  for (var i = 0, j = upgrades.length; i < j; i++) {
	    if (~index(this.transports, upgrades[i])) filteredUpgrades.push(upgrades[i]);
	  }
	  return filteredUpgrades;
	};

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * Module dependencies
	 */

	var XMLHttpRequest = __webpack_require__(78);
	var XHR = __webpack_require__(80);
	var JSONP = __webpack_require__(98);
	var websocket = __webpack_require__(99);

	/**
	 * Export transports.
	 */

	exports.polling = polling;
	exports.websocket = websocket;

	/**
	 * Polling transport polymorphic constructor.
	 * Decides on xhr vs jsonp based on feature detection.
	 *
	 * @api private
	 */

	function polling (opts) {
	  var xhr;
	  var xd = false;
	  var xs = false;
	  var jsonp = false !== opts.jsonp;

	  if (global.location) {
	    var isSSL = 'https:' === location.protocol;
	    var port = location.port;

	    // some user agents have empty `location.port`
	    if (!port) {
	      port = isSSL ? 443 : 80;
	    }

	    xd = opts.hostname !== location.hostname || port !== opts.port;
	    xs = opts.secure !== isSSL;
	  }

	  opts.xdomain = xd;
	  opts.xscheme = xs;
	  xhr = new XMLHttpRequest(opts);

	  if ('open' in xhr && !opts.forceJSONP) {
	    return new XHR(opts);
	  } else {
	    if (!jsonp) throw new Error('JSONP disabled');
	    return new JSONP(opts);
	  }
	}

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {// browser shim for xmlhttprequest module

	var hasCORS = __webpack_require__(79);

	module.exports = function (opts) {
	  var xdomain = opts.xdomain;

	  // scheme must be same when usign XDomainRequest
	  // http://blogs.msdn.com/b/ieinternals/archive/2010/05/13/xdomainrequest-restrictions-limitations-and-workarounds.aspx
	  var xscheme = opts.xscheme;

	  // XDomainRequest has a flow of not sending cookie, therefore it should be disabled as a default.
	  // https://github.com/Automattic/engine.io-client/pull/217
	  var enablesXDR = opts.enablesXDR;

	  // XMLHttpRequest can be disabled on IE
	  try {
	    if ('undefined' !== typeof XMLHttpRequest && (!xdomain || hasCORS)) {
	      return new XMLHttpRequest();
	    }
	  } catch (e) { }

	  // Use XDomainRequest for IE8 if enablesXDR is true
	  // because loading bar keeps flashing when using jsonp-polling
	  // https://github.com/yujiosaka/socke.io-ie8-loading-example
	  try {
	    if ('undefined' !== typeof XDomainRequest && !xscheme && enablesXDR) {
	      return new XDomainRequest();
	    }
	  } catch (e) { }

	  if (!xdomain) {
	    try {
	      return new global[['Active'].concat('Object').join('X')]('Microsoft.XMLHTTP');
	    } catch (e) { }
	  }
	};

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 79 */
/***/ function(module, exports) {

	
	/**
	 * Module exports.
	 *
	 * Logic borrowed from Modernizr:
	 *
	 *   - https://github.com/Modernizr/Modernizr/blob/master/feature-detects/cors.js
	 */

	try {
	  module.exports = typeof XMLHttpRequest !== 'undefined' &&
	    'withCredentials' in new XMLHttpRequest();
	} catch (err) {
	  // if XMLHttp support is disabled in IE then it will throw
	  // when trying to create
	  module.exports = false;
	}


/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * Module requirements.
	 */

	var XMLHttpRequest = __webpack_require__(78);
	var Polling = __webpack_require__(81);
	var Emitter = __webpack_require__(91);
	var inherit = __webpack_require__(93);
	var debug = __webpack_require__(95)('engine.io-client:polling-xhr');

	/**
	 * Module exports.
	 */

	module.exports = XHR;
	module.exports.Request = Request;

	/**
	 * Empty function
	 */

	function empty () {}

	/**
	 * XHR Polling constructor.
	 *
	 * @param {Object} opts
	 * @api public
	 */

	function XHR (opts) {
	  Polling.call(this, opts);
	  this.requestTimeout = opts.requestTimeout;

	  if (global.location) {
	    var isSSL = 'https:' === location.protocol;
	    var port = location.port;

	    // some user agents have empty `location.port`
	    if (!port) {
	      port = isSSL ? 443 : 80;
	    }

	    this.xd = opts.hostname !== global.location.hostname ||
	      port !== opts.port;
	    this.xs = opts.secure !== isSSL;
	  } else {
	    this.extraHeaders = opts.extraHeaders;
	  }
	}

	/**
	 * Inherits from Polling.
	 */

	inherit(XHR, Polling);

	/**
	 * XHR supports binary
	 */

	XHR.prototype.supportsBinary = true;

	/**
	 * Creates a request.
	 *
	 * @param {String} method
	 * @api private
	 */

	XHR.prototype.request = function (opts) {
	  opts = opts || {};
	  opts.uri = this.uri();
	  opts.xd = this.xd;
	  opts.xs = this.xs;
	  opts.agent = this.agent || false;
	  opts.supportsBinary = this.supportsBinary;
	  opts.enablesXDR = this.enablesXDR;

	  // SSL options for Node.js client
	  opts.pfx = this.pfx;
	  opts.key = this.key;
	  opts.passphrase = this.passphrase;
	  opts.cert = this.cert;
	  opts.ca = this.ca;
	  opts.ciphers = this.ciphers;
	  opts.rejectUnauthorized = this.rejectUnauthorized;
	  opts.requestTimeout = this.requestTimeout;

	  // other options for Node.js client
	  opts.extraHeaders = this.extraHeaders;

	  return new Request(opts);
	};

	/**
	 * Sends data.
	 *
	 * @param {String} data to send.
	 * @param {Function} called upon flush.
	 * @api private
	 */

	XHR.prototype.doWrite = function (data, fn) {
	  var isBinary = typeof data !== 'string' && data !== undefined;
	  var req = this.request({ method: 'POST', data: data, isBinary: isBinary });
	  var self = this;
	  req.on('success', fn);
	  req.on('error', function (err) {
	    self.onError('xhr post error', err);
	  });
	  this.sendXhr = req;
	};

	/**
	 * Starts a poll cycle.
	 *
	 * @api private
	 */

	XHR.prototype.doPoll = function () {
	  debug('xhr poll');
	  var req = this.request();
	  var self = this;
	  req.on('data', function (data) {
	    self.onData(data);
	  });
	  req.on('error', function (err) {
	    self.onError('xhr poll error', err);
	  });
	  this.pollXhr = req;
	};

	/**
	 * Request constructor
	 *
	 * @param {Object} options
	 * @api public
	 */

	function Request (opts) {
	  this.method = opts.method || 'GET';
	  this.uri = opts.uri;
	  this.xd = !!opts.xd;
	  this.xs = !!opts.xs;
	  this.async = false !== opts.async;
	  this.data = undefined !== opts.data ? opts.data : null;
	  this.agent = opts.agent;
	  this.isBinary = opts.isBinary;
	  this.supportsBinary = opts.supportsBinary;
	  this.enablesXDR = opts.enablesXDR;
	  this.requestTimeout = opts.requestTimeout;

	  // SSL options for Node.js client
	  this.pfx = opts.pfx;
	  this.key = opts.key;
	  this.passphrase = opts.passphrase;
	  this.cert = opts.cert;
	  this.ca = opts.ca;
	  this.ciphers = opts.ciphers;
	  this.rejectUnauthorized = opts.rejectUnauthorized;

	  // other options for Node.js client
	  this.extraHeaders = opts.extraHeaders;

	  this.create();
	}

	/**
	 * Mix in `Emitter`.
	 */

	Emitter(Request.prototype);

	/**
	 * Creates the XHR object and sends the request.
	 *
	 * @api private
	 */

	Request.prototype.create = function () {
	  var opts = { agent: this.agent, xdomain: this.xd, xscheme: this.xs, enablesXDR: this.enablesXDR };

	  // SSL options for Node.js client
	  opts.pfx = this.pfx;
	  opts.key = this.key;
	  opts.passphrase = this.passphrase;
	  opts.cert = this.cert;
	  opts.ca = this.ca;
	  opts.ciphers = this.ciphers;
	  opts.rejectUnauthorized = this.rejectUnauthorized;

	  var xhr = this.xhr = new XMLHttpRequest(opts);
	  var self = this;

	  try {
	    debug('xhr open %s: %s', this.method, this.uri);
	    xhr.open(this.method, this.uri, this.async);
	    try {
	      if (this.extraHeaders) {
	        xhr.setDisableHeaderCheck(true);
	        for (var i in this.extraHeaders) {
	          if (this.extraHeaders.hasOwnProperty(i)) {
	            xhr.setRequestHeader(i, this.extraHeaders[i]);
	          }
	        }
	      }
	    } catch (e) {}
	    if (this.supportsBinary) {
	      // This has to be done after open because Firefox is stupid
	      // http://stackoverflow.com/questions/13216903/get-binary-data-with-xmlhttprequest-in-a-firefox-extension
	      xhr.responseType = 'arraybuffer';
	    }

	    if ('POST' === this.method) {
	      try {
	        if (this.isBinary) {
	          xhr.setRequestHeader('Content-type', 'application/octet-stream');
	        } else {
	          xhr.setRequestHeader('Content-type', 'text/plain;charset=UTF-8');
	        }
	      } catch (e) {}
	    }

	    try {
	      xhr.setRequestHeader('Accept', '*/*');
	    } catch (e) {}

	    // ie6 check
	    if ('withCredentials' in xhr) {
	      xhr.withCredentials = true;
	    }

	    if (this.requestTimeout) {
	      xhr.timeout = this.requestTimeout;
	    }

	    if (this.hasXDR()) {
	      xhr.onload = function () {
	        self.onLoad();
	      };
	      xhr.onerror = function () {
	        self.onError(xhr.responseText);
	      };
	    } else {
	      xhr.onreadystatechange = function () {
	        if (4 !== xhr.readyState) return;
	        if (200 === xhr.status || 1223 === xhr.status) {
	          self.onLoad();
	        } else {
	          // make sure the `error` event handler that's user-set
	          // does not throw in the same tick and gets caught here
	          setTimeout(function () {
	            self.onError(xhr.status);
	          }, 0);
	        }
	      };
	    }

	    debug('xhr data %s', this.data);
	    xhr.send(this.data);
	  } catch (e) {
	    // Need to defer since .create() is called directly fhrom the constructor
	    // and thus the 'error' event can only be only bound *after* this exception
	    // occurs.  Therefore, also, we cannot throw here at all.
	    setTimeout(function () {
	      self.onError(e);
	    }, 0);
	    return;
	  }

	  if (global.document) {
	    this.index = Request.requestsCount++;
	    Request.requests[this.index] = this;
	  }
	};

	/**
	 * Called upon successful response.
	 *
	 * @api private
	 */

	Request.prototype.onSuccess = function () {
	  this.emit('success');
	  this.cleanup();
	};

	/**
	 * Called if we have data.
	 *
	 * @api private
	 */

	Request.prototype.onData = function (data) {
	  this.emit('data', data);
	  this.onSuccess();
	};

	/**
	 * Called upon error.
	 *
	 * @api private
	 */

	Request.prototype.onError = function (err) {
	  this.emit('error', err);
	  this.cleanup(true);
	};

	/**
	 * Cleans up house.
	 *
	 * @api private
	 */

	Request.prototype.cleanup = function (fromError) {
	  if ('undefined' === typeof this.xhr || null === this.xhr) {
	    return;
	  }
	  // xmlhttprequest
	  if (this.hasXDR()) {
	    this.xhr.onload = this.xhr.onerror = empty;
	  } else {
	    this.xhr.onreadystatechange = empty;
	  }

	  if (fromError) {
	    try {
	      this.xhr.abort();
	    } catch (e) {}
	  }

	  if (global.document) {
	    delete Request.requests[this.index];
	  }

	  this.xhr = null;
	};

	/**
	 * Called upon load.
	 *
	 * @api private
	 */

	Request.prototype.onLoad = function () {
	  var data;
	  try {
	    var contentType;
	    try {
	      contentType = this.xhr.getResponseHeader('Content-Type').split(';')[0];
	    } catch (e) {}
	    if (contentType === 'application/octet-stream') {
	      data = this.xhr.response || this.xhr.responseText;
	    } else {
	      if (!this.supportsBinary) {
	        data = this.xhr.responseText;
	      } else {
	        try {
	          data = String.fromCharCode.apply(null, new Uint8Array(this.xhr.response));
	        } catch (e) {
	          var ui8Arr = new Uint8Array(this.xhr.response);
	          var dataArray = [];
	          for (var idx = 0, length = ui8Arr.length; idx < length; idx++) {
	            dataArray.push(ui8Arr[idx]);
	          }

	          data = String.fromCharCode.apply(null, dataArray);
	        }
	      }
	    }
	  } catch (e) {
	    this.onError(e);
	  }
	  if (null != data) {
	    this.onData(data);
	  }
	};

	/**
	 * Check if it has XDomainRequest.
	 *
	 * @api private
	 */

	Request.prototype.hasXDR = function () {
	  return 'undefined' !== typeof global.XDomainRequest && !this.xs && this.enablesXDR;
	};

	/**
	 * Aborts the request.
	 *
	 * @api public
	 */

	Request.prototype.abort = function () {
	  this.cleanup();
	};

	/**
	 * Aborts pending requests when unloading the window. This is needed to prevent
	 * memory leaks (e.g. when using IE) and to ensure that no spurious error is
	 * emitted.
	 */

	Request.requestsCount = 0;
	Request.requests = {};

	if (global.document) {
	  if (global.attachEvent) {
	    global.attachEvent('onunload', unloadHandler);
	  } else if (global.addEventListener) {
	    global.addEventListener('beforeunload', unloadHandler, false);
	  }
	}

	function unloadHandler () {
	  for (var i in Request.requests) {
	    if (Request.requests.hasOwnProperty(i)) {
	      Request.requests[i].abort();
	    }
	  }
	}

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module dependencies.
	 */

	var Transport = __webpack_require__(82);
	var parseqs = __webpack_require__(92);
	var parser = __webpack_require__(83);
	var inherit = __webpack_require__(93);
	var yeast = __webpack_require__(94);
	var debug = __webpack_require__(95)('engine.io-client:polling');

	/**
	 * Module exports.
	 */

	module.exports = Polling;

	/**
	 * Is XHR2 supported?
	 */

	var hasXHR2 = (function () {
	  var XMLHttpRequest = __webpack_require__(78);
	  var xhr = new XMLHttpRequest({ xdomain: false });
	  return null != xhr.responseType;
	})();

	/**
	 * Polling interface.
	 *
	 * @param {Object} opts
	 * @api private
	 */

	function Polling (opts) {
	  var forceBase64 = (opts && opts.forceBase64);
	  if (!hasXHR2 || forceBase64) {
	    this.supportsBinary = false;
	  }
	  Transport.call(this, opts);
	}

	/**
	 * Inherits from Transport.
	 */

	inherit(Polling, Transport);

	/**
	 * Transport name.
	 */

	Polling.prototype.name = 'polling';

	/**
	 * Opens the socket (triggers polling). We write a PING message to determine
	 * when the transport is open.
	 *
	 * @api private
	 */

	Polling.prototype.doOpen = function () {
	  this.poll();
	};

	/**
	 * Pauses polling.
	 *
	 * @param {Function} callback upon buffers are flushed and transport is paused
	 * @api private
	 */

	Polling.prototype.pause = function (onPause) {
	  var self = this;

	  this.readyState = 'pausing';

	  function pause () {
	    debug('paused');
	    self.readyState = 'paused';
	    onPause();
	  }

	  if (this.polling || !this.writable) {
	    var total = 0;

	    if (this.polling) {
	      debug('we are currently polling - waiting to pause');
	      total++;
	      this.once('pollComplete', function () {
	        debug('pre-pause polling complete');
	        --total || pause();
	      });
	    }

	    if (!this.writable) {
	      debug('we are currently writing - waiting to pause');
	      total++;
	      this.once('drain', function () {
	        debug('pre-pause writing complete');
	        --total || pause();
	      });
	    }
	  } else {
	    pause();
	  }
	};

	/**
	 * Starts polling cycle.
	 *
	 * @api public
	 */

	Polling.prototype.poll = function () {
	  debug('polling');
	  this.polling = true;
	  this.doPoll();
	  this.emit('poll');
	};

	/**
	 * Overloads onData to detect payloads.
	 *
	 * @api private
	 */

	Polling.prototype.onData = function (data) {
	  var self = this;
	  debug('polling got data %s', data);
	  var callback = function (packet, index, total) {
	    // if its the first message we consider the transport open
	    if ('opening' === self.readyState) {
	      self.onOpen();
	    }

	    // if its a close packet, we close the ongoing requests
	    if ('close' === packet.type) {
	      self.onClose();
	      return false;
	    }

	    // otherwise bypass onData and handle the message
	    self.onPacket(packet);
	  };

	  // decode payload
	  parser.decodePayload(data, this.socket.binaryType, callback);

	  // if an event did not trigger closing
	  if ('closed' !== this.readyState) {
	    // if we got data we're not polling
	    this.polling = false;
	    this.emit('pollComplete');

	    if ('open' === this.readyState) {
	      this.poll();
	    } else {
	      debug('ignoring poll - transport state "%s"', this.readyState);
	    }
	  }
	};

	/**
	 * For polling, send a close packet.
	 *
	 * @api private
	 */

	Polling.prototype.doClose = function () {
	  var self = this;

	  function close () {
	    debug('writing close packet');
	    self.write([{ type: 'close' }]);
	  }

	  if ('open' === this.readyState) {
	    debug('transport open - closing');
	    close();
	  } else {
	    // in case we're trying to close while
	    // handshaking is in progress (GH-164)
	    debug('transport not open - deferring close');
	    this.once('open', close);
	  }
	};

	/**
	 * Writes a packets payload.
	 *
	 * @param {Array} data packets
	 * @param {Function} drain callback
	 * @api private
	 */

	Polling.prototype.write = function (packets) {
	  var self = this;
	  this.writable = false;
	  var callbackfn = function () {
	    self.writable = true;
	    self.emit('drain');
	  };

	  parser.encodePayload(packets, this.supportsBinary, function (data) {
	    self.doWrite(data, callbackfn);
	  });
	};

	/**
	 * Generates uri for connection.
	 *
	 * @api private
	 */

	Polling.prototype.uri = function () {
	  var query = this.query || {};
	  var schema = this.secure ? 'https' : 'http';
	  var port = '';

	  // cache busting is forced
	  if (false !== this.timestampRequests) {
	    query[this.timestampParam] = yeast();
	  }

	  if (!this.supportsBinary && !query.sid) {
	    query.b64 = 1;
	  }

	  query = parseqs.encode(query);

	  // avoid port if default for schema
	  if (this.port && (('https' === schema && Number(this.port) !== 443) ||
	     ('http' === schema && Number(this.port) !== 80))) {
	    port = ':' + this.port;
	  }

	  // prepend ? to query
	  if (query.length) {
	    query = '?' + query;
	  }

	  var ipv6 = this.hostname.indexOf(':') !== -1;
	  return schema + '://' + (ipv6 ? '[' + this.hostname + ']' : this.hostname) + port + this.path + query;
	};


/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module dependencies.
	 */

	var parser = __webpack_require__(83);
	var Emitter = __webpack_require__(91);

	/**
	 * Module exports.
	 */

	module.exports = Transport;

	/**
	 * Transport abstract constructor.
	 *
	 * @param {Object} options.
	 * @api private
	 */

	function Transport (opts) {
	  this.path = opts.path;
	  this.hostname = opts.hostname;
	  this.port = opts.port;
	  this.secure = opts.secure;
	  this.query = opts.query;
	  this.timestampParam = opts.timestampParam;
	  this.timestampRequests = opts.timestampRequests;
	  this.readyState = '';
	  this.agent = opts.agent || false;
	  this.socket = opts.socket;
	  this.enablesXDR = opts.enablesXDR;

	  // SSL options for Node.js client
	  this.pfx = opts.pfx;
	  this.key = opts.key;
	  this.passphrase = opts.passphrase;
	  this.cert = opts.cert;
	  this.ca = opts.ca;
	  this.ciphers = opts.ciphers;
	  this.rejectUnauthorized = opts.rejectUnauthorized;
	  this.forceNode = opts.forceNode;

	  // other options for Node.js client
	  this.extraHeaders = opts.extraHeaders;
	  this.localAddress = opts.localAddress;
	}

	/**
	 * Mix in `Emitter`.
	 */

	Emitter(Transport.prototype);

	/**
	 * Emits an error.
	 *
	 * @param {String} str
	 * @return {Transport} for chaining
	 * @api public
	 */

	Transport.prototype.onError = function (msg, desc) {
	  var err = new Error(msg);
	  err.type = 'TransportError';
	  err.description = desc;
	  this.emit('error', err);
	  return this;
	};

	/**
	 * Opens the transport.
	 *
	 * @api public
	 */

	Transport.prototype.open = function () {
	  if ('closed' === this.readyState || '' === this.readyState) {
	    this.readyState = 'opening';
	    this.doOpen();
	  }

	  return this;
	};

	/**
	 * Closes the transport.
	 *
	 * @api private
	 */

	Transport.prototype.close = function () {
	  if ('opening' === this.readyState || 'open' === this.readyState) {
	    this.doClose();
	    this.onClose();
	  }

	  return this;
	};

	/**
	 * Sends multiple packets.
	 *
	 * @param {Array} packets
	 * @api private
	 */

	Transport.prototype.send = function (packets) {
	  if ('open' === this.readyState) {
	    this.write(packets);
	  } else {
	    throw new Error('Transport not open');
	  }
	};

	/**
	 * Called upon open
	 *
	 * @api private
	 */

	Transport.prototype.onOpen = function () {
	  this.readyState = 'open';
	  this.writable = true;
	  this.emit('open');
	};

	/**
	 * Called with data.
	 *
	 * @param {String} data
	 * @api private
	 */

	Transport.prototype.onData = function (data) {
	  var packet = parser.decodePacket(data, this.socket.binaryType);
	  this.onPacket(packet);
	};

	/**
	 * Called with a decoded packet.
	 */

	Transport.prototype.onPacket = function (packet) {
	  this.emit('packet', packet);
	};

	/**
	 * Called upon close.
	 *
	 * @api private
	 */

	Transport.prototype.onClose = function () {
	  this.readyState = 'closed';
	  this.emit('close');
	};


/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * Module dependencies.
	 */

	var keys = __webpack_require__(84);
	var hasBinary = __webpack_require__(85);
	var sliceBuffer = __webpack_require__(86);
	var after = __webpack_require__(87);
	var utf8 = __webpack_require__(88);

	var base64encoder;
	if (global && global.ArrayBuffer) {
	  base64encoder = __webpack_require__(89);
	}

	/**
	 * Check if we are running an android browser. That requires us to use
	 * ArrayBuffer with polling transports...
	 *
	 * http://ghinda.net/jpeg-blob-ajax-android/
	 */

	var isAndroid = typeof navigator !== 'undefined' && /Android/i.test(navigator.userAgent);

	/**
	 * Check if we are running in PhantomJS.
	 * Uploading a Blob with PhantomJS does not work correctly, as reported here:
	 * https://github.com/ariya/phantomjs/issues/11395
	 * @type boolean
	 */
	var isPhantomJS = typeof navigator !== 'undefined' && /PhantomJS/i.test(navigator.userAgent);

	/**
	 * When true, avoids using Blobs to encode payloads.
	 * @type boolean
	 */
	var dontSendBlobs = isAndroid || isPhantomJS;

	/**
	 * Current protocol version.
	 */

	exports.protocol = 3;

	/**
	 * Packet types.
	 */

	var packets = exports.packets = {
	    open:     0    // non-ws
	  , close:    1    // non-ws
	  , ping:     2
	  , pong:     3
	  , message:  4
	  , upgrade:  5
	  , noop:     6
	};

	var packetslist = keys(packets);

	/**
	 * Premade error packet.
	 */

	var err = { type: 'error', data: 'parser error' };

	/**
	 * Create a blob api even for blob builder when vendor prefixes exist
	 */

	var Blob = __webpack_require__(90);

	/**
	 * Encodes a packet.
	 *
	 *     <packet type id> [ <data> ]
	 *
	 * Example:
	 *
	 *     5hello world
	 *     3
	 *     4
	 *
	 * Binary is encoded in an identical principle
	 *
	 * @api private
	 */

	exports.encodePacket = function (packet, supportsBinary, utf8encode, callback) {
	  if ('function' == typeof supportsBinary) {
	    callback = supportsBinary;
	    supportsBinary = false;
	  }

	  if ('function' == typeof utf8encode) {
	    callback = utf8encode;
	    utf8encode = null;
	  }

	  var data = (packet.data === undefined)
	    ? undefined
	    : packet.data.buffer || packet.data;

	  if (global.ArrayBuffer && data instanceof ArrayBuffer) {
	    return encodeArrayBuffer(packet, supportsBinary, callback);
	  } else if (Blob && data instanceof global.Blob) {
	    return encodeBlob(packet, supportsBinary, callback);
	  }

	  // might be an object with { base64: true, data: dataAsBase64String }
	  if (data && data.base64) {
	    return encodeBase64Object(packet, callback);
	  }

	  // Sending data as a utf-8 string
	  var encoded = packets[packet.type];

	  // data fragment is optional
	  if (undefined !== packet.data) {
	    encoded += utf8encode ? utf8.encode(String(packet.data)) : String(packet.data);
	  }

	  return callback('' + encoded);

	};

	function encodeBase64Object(packet, callback) {
	  // packet data is an object { base64: true, data: dataAsBase64String }
	  var message = 'b' + exports.packets[packet.type] + packet.data.data;
	  return callback(message);
	}

	/**
	 * Encode packet helpers for binary types
	 */

	function encodeArrayBuffer(packet, supportsBinary, callback) {
	  if (!supportsBinary) {
	    return exports.encodeBase64Packet(packet, callback);
	  }

	  var data = packet.data;
	  var contentArray = new Uint8Array(data);
	  var resultBuffer = new Uint8Array(1 + data.byteLength);

	  resultBuffer[0] = packets[packet.type];
	  for (var i = 0; i < contentArray.length; i++) {
	    resultBuffer[i+1] = contentArray[i];
	  }

	  return callback(resultBuffer.buffer);
	}

	function encodeBlobAsArrayBuffer(packet, supportsBinary, callback) {
	  if (!supportsBinary) {
	    return exports.encodeBase64Packet(packet, callback);
	  }

	  var fr = new FileReader();
	  fr.onload = function() {
	    packet.data = fr.result;
	    exports.encodePacket(packet, supportsBinary, true, callback);
	  };
	  return fr.readAsArrayBuffer(packet.data);
	}

	function encodeBlob(packet, supportsBinary, callback) {
	  if (!supportsBinary) {
	    return exports.encodeBase64Packet(packet, callback);
	  }

	  if (dontSendBlobs) {
	    return encodeBlobAsArrayBuffer(packet, supportsBinary, callback);
	  }

	  var length = new Uint8Array(1);
	  length[0] = packets[packet.type];
	  var blob = new Blob([length.buffer, packet.data]);

	  return callback(blob);
	}

	/**
	 * Encodes a packet with binary data in a base64 string
	 *
	 * @param {Object} packet, has `type` and `data`
	 * @return {String} base64 encoded message
	 */

	exports.encodeBase64Packet = function(packet, callback) {
	  var message = 'b' + exports.packets[packet.type];
	  if (Blob && packet.data instanceof global.Blob) {
	    var fr = new FileReader();
	    fr.onload = function() {
	      var b64 = fr.result.split(',')[1];
	      callback(message + b64);
	    };
	    return fr.readAsDataURL(packet.data);
	  }

	  var b64data;
	  try {
	    b64data = String.fromCharCode.apply(null, new Uint8Array(packet.data));
	  } catch (e) {
	    // iPhone Safari doesn't let you apply with typed arrays
	    var typed = new Uint8Array(packet.data);
	    var basic = new Array(typed.length);
	    for (var i = 0; i < typed.length; i++) {
	      basic[i] = typed[i];
	    }
	    b64data = String.fromCharCode.apply(null, basic);
	  }
	  message += global.btoa(b64data);
	  return callback(message);
	};

	/**
	 * Decodes a packet. Changes format to Blob if requested.
	 *
	 * @return {Object} with `type` and `data` (if any)
	 * @api private
	 */

	exports.decodePacket = function (data, binaryType, utf8decode) {
	  if (data === undefined) {
	    return err;
	  }
	  // String data
	  if (typeof data == 'string') {
	    if (data.charAt(0) == 'b') {
	      return exports.decodeBase64Packet(data.substr(1), binaryType);
	    }

	    if (utf8decode) {
	      data = tryDecode(data);
	      if (data === false) {
	        return err;
	      }
	    }
	    var type = data.charAt(0);

	    if (Number(type) != type || !packetslist[type]) {
	      return err;
	    }

	    if (data.length > 1) {
	      return { type: packetslist[type], data: data.substring(1) };
	    } else {
	      return { type: packetslist[type] };
	    }
	  }

	  var asArray = new Uint8Array(data);
	  var type = asArray[0];
	  var rest = sliceBuffer(data, 1);
	  if (Blob && binaryType === 'blob') {
	    rest = new Blob([rest]);
	  }
	  return { type: packetslist[type], data: rest };
	};

	function tryDecode(data) {
	  try {
	    data = utf8.decode(data);
	  } catch (e) {
	    return false;
	  }
	  return data;
	}

	/**
	 * Decodes a packet encoded in a base64 string
	 *
	 * @param {String} base64 encoded message
	 * @return {Object} with `type` and `data` (if any)
	 */

	exports.decodeBase64Packet = function(msg, binaryType) {
	  var type = packetslist[msg.charAt(0)];
	  if (!base64encoder) {
	    return { type: type, data: { base64: true, data: msg.substr(1) } };
	  }

	  var data = base64encoder.decode(msg.substr(1));

	  if (binaryType === 'blob' && Blob) {
	    data = new Blob([data]);
	  }

	  return { type: type, data: data };
	};

	/**
	 * Encodes multiple messages (payload).
	 *
	 *     <length>:data
	 *
	 * Example:
	 *
	 *     11:hello world2:hi
	 *
	 * If any contents are binary, they will be encoded as base64 strings. Base64
	 * encoded strings are marked with a b before the length specifier
	 *
	 * @param {Array} packets
	 * @api private
	 */

	exports.encodePayload = function (packets, supportsBinary, callback) {
	  if (typeof supportsBinary == 'function') {
	    callback = supportsBinary;
	    supportsBinary = null;
	  }

	  var isBinary = hasBinary(packets);

	  if (supportsBinary && isBinary) {
	    if (Blob && !dontSendBlobs) {
	      return exports.encodePayloadAsBlob(packets, callback);
	    }

	    return exports.encodePayloadAsArrayBuffer(packets, callback);
	  }

	  if (!packets.length) {
	    return callback('0:');
	  }

	  function setLengthHeader(message) {
	    return message.length + ':' + message;
	  }

	  function encodeOne(packet, doneCallback) {
	    exports.encodePacket(packet, !isBinary ? false : supportsBinary, true, function(message) {
	      doneCallback(null, setLengthHeader(message));
	    });
	  }

	  map(packets, encodeOne, function(err, results) {
	    return callback(results.join(''));
	  });
	};

	/**
	 * Async array map using after
	 */

	function map(ary, each, done) {
	  var result = new Array(ary.length);
	  var next = after(ary.length, done);

	  var eachWithIndex = function(i, el, cb) {
	    each(el, function(error, msg) {
	      result[i] = msg;
	      cb(error, result);
	    });
	  };

	  for (var i = 0; i < ary.length; i++) {
	    eachWithIndex(i, ary[i], next);
	  }
	}

	/*
	 * Decodes data when a payload is maybe expected. Possible binary contents are
	 * decoded from their base64 representation
	 *
	 * @param {String} data, callback method
	 * @api public
	 */

	exports.decodePayload = function (data, binaryType, callback) {
	  if (typeof data != 'string') {
	    return exports.decodePayloadAsBinary(data, binaryType, callback);
	  }

	  if (typeof binaryType === 'function') {
	    callback = binaryType;
	    binaryType = null;
	  }

	  var packet;
	  if (data == '') {
	    // parser error - ignoring payload
	    return callback(err, 0, 1);
	  }

	  var length = ''
	    , n, msg;

	  for (var i = 0, l = data.length; i < l; i++) {
	    var chr = data.charAt(i);

	    if (':' != chr) {
	      length += chr;
	    } else {
	      if ('' == length || (length != (n = Number(length)))) {
	        // parser error - ignoring payload
	        return callback(err, 0, 1);
	      }

	      msg = data.substr(i + 1, n);

	      if (length != msg.length) {
	        // parser error - ignoring payload
	        return callback(err, 0, 1);
	      }

	      if (msg.length) {
	        packet = exports.decodePacket(msg, binaryType, true);

	        if (err.type == packet.type && err.data == packet.data) {
	          // parser error in individual packet - ignoring payload
	          return callback(err, 0, 1);
	        }

	        var ret = callback(packet, i + n, l);
	        if (false === ret) return;
	      }

	      // advance cursor
	      i += n;
	      length = '';
	    }
	  }

	  if (length != '') {
	    // parser error - ignoring payload
	    return callback(err, 0, 1);
	  }

	};

	/**
	 * Encodes multiple messages (payload) as binary.
	 *
	 * <1 = binary, 0 = string><number from 0-9><number from 0-9>[...]<number
	 * 255><data>
	 *
	 * Example:
	 * 1 3 255 1 2 3, if the binary contents are interpreted as 8 bit integers
	 *
	 * @param {Array} packets
	 * @return {ArrayBuffer} encoded payload
	 * @api private
	 */

	exports.encodePayloadAsArrayBuffer = function(packets, callback) {
	  if (!packets.length) {
	    return callback(new ArrayBuffer(0));
	  }

	  function encodeOne(packet, doneCallback) {
	    exports.encodePacket(packet, true, true, function(data) {
	      return doneCallback(null, data);
	    });
	  }

	  map(packets, encodeOne, function(err, encodedPackets) {
	    var totalLength = encodedPackets.reduce(function(acc, p) {
	      var len;
	      if (typeof p === 'string'){
	        len = p.length;
	      } else {
	        len = p.byteLength;
	      }
	      return acc + len.toString().length + len + 2; // string/binary identifier + separator = 2
	    }, 0);

	    var resultArray = new Uint8Array(totalLength);

	    var bufferIndex = 0;
	    encodedPackets.forEach(function(p) {
	      var isString = typeof p === 'string';
	      var ab = p;
	      if (isString) {
	        var view = new Uint8Array(p.length);
	        for (var i = 0; i < p.length; i++) {
	          view[i] = p.charCodeAt(i);
	        }
	        ab = view.buffer;
	      }

	      if (isString) { // not true binary
	        resultArray[bufferIndex++] = 0;
	      } else { // true binary
	        resultArray[bufferIndex++] = 1;
	      }

	      var lenStr = ab.byteLength.toString();
	      for (var i = 0; i < lenStr.length; i++) {
	        resultArray[bufferIndex++] = parseInt(lenStr[i]);
	      }
	      resultArray[bufferIndex++] = 255;

	      var view = new Uint8Array(ab);
	      for (var i = 0; i < view.length; i++) {
	        resultArray[bufferIndex++] = view[i];
	      }
	    });

	    return callback(resultArray.buffer);
	  });
	};

	/**
	 * Encode as Blob
	 */

	exports.encodePayloadAsBlob = function(packets, callback) {
	  function encodeOne(packet, doneCallback) {
	    exports.encodePacket(packet, true, true, function(encoded) {
	      var binaryIdentifier = new Uint8Array(1);
	      binaryIdentifier[0] = 1;
	      if (typeof encoded === 'string') {
	        var view = new Uint8Array(encoded.length);
	        for (var i = 0; i < encoded.length; i++) {
	          view[i] = encoded.charCodeAt(i);
	        }
	        encoded = view.buffer;
	        binaryIdentifier[0] = 0;
	      }

	      var len = (encoded instanceof ArrayBuffer)
	        ? encoded.byteLength
	        : encoded.size;

	      var lenStr = len.toString();
	      var lengthAry = new Uint8Array(lenStr.length + 1);
	      for (var i = 0; i < lenStr.length; i++) {
	        lengthAry[i] = parseInt(lenStr[i]);
	      }
	      lengthAry[lenStr.length] = 255;

	      if (Blob) {
	        var blob = new Blob([binaryIdentifier.buffer, lengthAry.buffer, encoded]);
	        doneCallback(null, blob);
	      }
	    });
	  }

	  map(packets, encodeOne, function(err, results) {
	    return callback(new Blob(results));
	  });
	};

	/*
	 * Decodes data when a payload is maybe expected. Strings are decoded by
	 * interpreting each byte as a key code for entries marked to start with 0. See
	 * description of encodePayloadAsBinary
	 *
	 * @param {ArrayBuffer} data, callback method
	 * @api public
	 */

	exports.decodePayloadAsBinary = function (data, binaryType, callback) {
	  if (typeof binaryType === 'function') {
	    callback = binaryType;
	    binaryType = null;
	  }

	  var bufferTail = data;
	  var buffers = [];

	  var numberTooLong = false;
	  while (bufferTail.byteLength > 0) {
	    var tailArray = new Uint8Array(bufferTail);
	    var isString = tailArray[0] === 0;
	    var msgLength = '';

	    for (var i = 1; ; i++) {
	      if (tailArray[i] == 255) break;

	      if (msgLength.length > 310) {
	        numberTooLong = true;
	        break;
	      }

	      msgLength += tailArray[i];
	    }

	    if(numberTooLong) return callback(err, 0, 1);

	    bufferTail = sliceBuffer(bufferTail, 2 + msgLength.length);
	    msgLength = parseInt(msgLength);

	    var msg = sliceBuffer(bufferTail, 0, msgLength);
	    if (isString) {
	      try {
	        msg = String.fromCharCode.apply(null, new Uint8Array(msg));
	      } catch (e) {
	        // iPhone Safari doesn't let you apply to typed arrays
	        var typed = new Uint8Array(msg);
	        msg = '';
	        for (var i = 0; i < typed.length; i++) {
	          msg += String.fromCharCode(typed[i]);
	        }
	      }
	    }

	    buffers.push(msg);
	    bufferTail = sliceBuffer(bufferTail, msgLength);
	  }

	  var total = buffers.length;
	  buffers.forEach(function(buffer, i) {
	    callback(exports.decodePacket(buffer, binaryType, true), i, total);
	  });
	};

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 84 */
/***/ function(module, exports) {

	
	/**
	 * Gets the keys for an object.
	 *
	 * @return {Array} keys
	 * @api private
	 */

	module.exports = Object.keys || function keys (obj){
	  var arr = [];
	  var has = Object.prototype.hasOwnProperty;

	  for (var i in obj) {
	    if (has.call(obj, i)) {
	      arr.push(i);
	    }
	  }
	  return arr;
	};


/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {
	/*
	 * Module requirements.
	 */

	var isArray = __webpack_require__(18);

	/**
	 * Module exports.
	 */

	module.exports = hasBinary;

	/**
	 * Checks for binary data.
	 *
	 * Right now only Buffer and ArrayBuffer are supported..
	 *
	 * @param {Object} anything
	 * @api public
	 */

	function hasBinary(data) {

	  function _hasBinary(obj) {
	    if (!obj) return false;

	    if ( (global.Buffer && global.Buffer.isBuffer(obj)) ||
	         (global.ArrayBuffer && obj instanceof ArrayBuffer) ||
	         (global.Blob && obj instanceof Blob) ||
	         (global.File && obj instanceof File)
	        ) {
	      return true;
	    }

	    if (isArray(obj)) {
	      for (var i = 0; i < obj.length; i++) {
	          if (_hasBinary(obj[i])) {
	              return true;
	          }
	      }
	    } else if (obj && 'object' == typeof obj) {
	      if (obj.toJSON) {
	        obj = obj.toJSON();
	      }

	      for (var key in obj) {
	        if (Object.prototype.hasOwnProperty.call(obj, key) && _hasBinary(obj[key])) {
	          return true;
	        }
	      }
	    }

	    return false;
	  }

	  return _hasBinary(data);
	}

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 86 */
/***/ function(module, exports) {

	/**
	 * An abstraction for slicing an arraybuffer even when
	 * ArrayBuffer.prototype.slice is not supported
	 *
	 * @api public
	 */

	module.exports = function(arraybuffer, start, end) {
	  var bytes = arraybuffer.byteLength;
	  start = start || 0;
	  end = end || bytes;

	  if (arraybuffer.slice) { return arraybuffer.slice(start, end); }

	  if (start < 0) { start += bytes; }
	  if (end < 0) { end += bytes; }
	  if (end > bytes) { end = bytes; }

	  if (start >= bytes || start >= end || bytes === 0) {
	    return new ArrayBuffer(0);
	  }

	  var abv = new Uint8Array(arraybuffer);
	  var result = new Uint8Array(end - start);
	  for (var i = start, ii = 0; i < end; i++, ii++) {
	    result[ii] = abv[i];
	  }
	  return result.buffer;
	};


/***/ },
/* 87 */
/***/ function(module, exports) {

	module.exports = after

	function after(count, callback, err_cb) {
	    var bail = false
	    err_cb = err_cb || noop
	    proxy.count = count

	    return (count === 0) ? callback() : proxy

	    function proxy(err, result) {
	        if (proxy.count <= 0) {
	            throw new Error('after called too many times')
	        }
	        --proxy.count

	        // after first error, rest are passed to err_cb
	        if (err) {
	            bail = true
	            callback(err)
	            // future error callbacks will go to error handler
	            callback = err_cb
	        } else if (proxy.count === 0 && !bail) {
	            callback(null, result)
	        }
	    }
	}

	function noop() {}


/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module, global) {/*! https://mths.be/wtf8 v1.0.0 by @mathias */
	;(function(root) {

		// Detect free variables `exports`
		var freeExports = typeof exports == 'object' && exports;

		// Detect free variable `module`
		var freeModule = typeof module == 'object' && module &&
			module.exports == freeExports && module;

		// Detect free variable `global`, from Node.js or Browserified code,
		// and use it as `root`
		var freeGlobal = typeof global == 'object' && global;
		if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) {
			root = freeGlobal;
		}

		/*--------------------------------------------------------------------------*/

		var stringFromCharCode = String.fromCharCode;

		// Taken from https://mths.be/punycode
		function ucs2decode(string) {
			var output = [];
			var counter = 0;
			var length = string.length;
			var value;
			var extra;
			while (counter < length) {
				value = string.charCodeAt(counter++);
				if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
					// high surrogate, and there is a next character
					extra = string.charCodeAt(counter++);
					if ((extra & 0xFC00) == 0xDC00) { // low surrogate
						output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
					} else {
						// unmatched surrogate; only append this code unit, in case the next
						// code unit is the high surrogate of a surrogate pair
						output.push(value);
						counter--;
					}
				} else {
					output.push(value);
				}
			}
			return output;
		}

		// Taken from https://mths.be/punycode
		function ucs2encode(array) {
			var length = array.length;
			var index = -1;
			var value;
			var output = '';
			while (++index < length) {
				value = array[index];
				if (value > 0xFFFF) {
					value -= 0x10000;
					output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
					value = 0xDC00 | value & 0x3FF;
				}
				output += stringFromCharCode(value);
			}
			return output;
		}

		/*--------------------------------------------------------------------------*/

		function createByte(codePoint, shift) {
			return stringFromCharCode(((codePoint >> shift) & 0x3F) | 0x80);
		}

		function encodeCodePoint(codePoint) {
			if ((codePoint & 0xFFFFFF80) == 0) { // 1-byte sequence
				return stringFromCharCode(codePoint);
			}
			var symbol = '';
			if ((codePoint & 0xFFFFF800) == 0) { // 2-byte sequence
				symbol = stringFromCharCode(((codePoint >> 6) & 0x1F) | 0xC0);
			}
			else if ((codePoint & 0xFFFF0000) == 0) { // 3-byte sequence
				symbol = stringFromCharCode(((codePoint >> 12) & 0x0F) | 0xE0);
				symbol += createByte(codePoint, 6);
			}
			else if ((codePoint & 0xFFE00000) == 0) { // 4-byte sequence
				symbol = stringFromCharCode(((codePoint >> 18) & 0x07) | 0xF0);
				symbol += createByte(codePoint, 12);
				symbol += createByte(codePoint, 6);
			}
			symbol += stringFromCharCode((codePoint & 0x3F) | 0x80);
			return symbol;
		}

		function wtf8encode(string) {
			var codePoints = ucs2decode(string);
			var length = codePoints.length;
			var index = -1;
			var codePoint;
			var byteString = '';
			while (++index < length) {
				codePoint = codePoints[index];
				byteString += encodeCodePoint(codePoint);
			}
			return byteString;
		}

		/*--------------------------------------------------------------------------*/

		function readContinuationByte() {
			if (byteIndex >= byteCount) {
				throw Error('Invalid byte index');
			}

			var continuationByte = byteArray[byteIndex] & 0xFF;
			byteIndex++;

			if ((continuationByte & 0xC0) == 0x80) {
				return continuationByte & 0x3F;
			}

			// If we end up here, it’s not a continuation byte.
			throw Error('Invalid continuation byte');
		}

		function decodeSymbol() {
			var byte1;
			var byte2;
			var byte3;
			var byte4;
			var codePoint;

			if (byteIndex > byteCount) {
				throw Error('Invalid byte index');
			}

			if (byteIndex == byteCount) {
				return false;
			}

			// Read the first byte.
			byte1 = byteArray[byteIndex] & 0xFF;
			byteIndex++;

			// 1-byte sequence (no continuation bytes)
			if ((byte1 & 0x80) == 0) {
				return byte1;
			}

			// 2-byte sequence
			if ((byte1 & 0xE0) == 0xC0) {
				var byte2 = readContinuationByte();
				codePoint = ((byte1 & 0x1F) << 6) | byte2;
				if (codePoint >= 0x80) {
					return codePoint;
				} else {
					throw Error('Invalid continuation byte');
				}
			}

			// 3-byte sequence (may include unpaired surrogates)
			if ((byte1 & 0xF0) == 0xE0) {
				byte2 = readContinuationByte();
				byte3 = readContinuationByte();
				codePoint = ((byte1 & 0x0F) << 12) | (byte2 << 6) | byte3;
				if (codePoint >= 0x0800) {
					return codePoint;
				} else {
					throw Error('Invalid continuation byte');
				}
			}

			// 4-byte sequence
			if ((byte1 & 0xF8) == 0xF0) {
				byte2 = readContinuationByte();
				byte3 = readContinuationByte();
				byte4 = readContinuationByte();
				codePoint = ((byte1 & 0x0F) << 0x12) | (byte2 << 0x0C) |
					(byte3 << 0x06) | byte4;
				if (codePoint >= 0x010000 && codePoint <= 0x10FFFF) {
					return codePoint;
				}
			}

			throw Error('Invalid WTF-8 detected');
		}

		var byteArray;
		var byteCount;
		var byteIndex;
		function wtf8decode(byteString) {
			byteArray = ucs2decode(byteString);
			byteCount = byteArray.length;
			byteIndex = 0;
			var codePoints = [];
			var tmp;
			while ((tmp = decodeSymbol()) !== false) {
				codePoints.push(tmp);
			}
			return ucs2encode(codePoints);
		}

		/*--------------------------------------------------------------------------*/

		var wtf8 = {
			'version': '1.0.0',
			'encode': wtf8encode,
			'decode': wtf8decode
		};

		// Some AMD build optimizers, like r.js, check for specific condition patterns
		// like the following:
		if (
			true
		) {
			!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
				return wtf8;
			}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		}	else if (freeExports && !freeExports.nodeType) {
			if (freeModule) { // in Node.js or RingoJS v0.8.0+
				freeModule.exports = wtf8;
			} else { // in Narwhal or RingoJS v0.7.0-
				var object = {};
				var hasOwnProperty = object.hasOwnProperty;
				for (var key in wtf8) {
					hasOwnProperty.call(wtf8, key) && (freeExports[key] = wtf8[key]);
				}
			}
		} else { // in Rhino or a web browser
			root.wtf8 = wtf8;
		}

	}(this));

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(68)(module), (function() { return this; }())))

/***/ },
/* 89 */
/***/ function(module, exports) {

	/*
	 * base64-arraybuffer
	 * https://github.com/niklasvh/base64-arraybuffer
	 *
	 * Copyright (c) 2012 Niklas von Hertzen
	 * Licensed under the MIT license.
	 */
	(function(){
	  "use strict";

	  var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

	  // Use a lookup table to find the index.
	  var lookup = new Uint8Array(256);
	  for (var i = 0; i < chars.length; i++) {
	    lookup[chars.charCodeAt(i)] = i;
	  }

	  exports.encode = function(arraybuffer) {
	    var bytes = new Uint8Array(arraybuffer),
	    i, len = bytes.length, base64 = "";

	    for (i = 0; i < len; i+=3) {
	      base64 += chars[bytes[i] >> 2];
	      base64 += chars[((bytes[i] & 3) << 4) | (bytes[i + 1] >> 4)];
	      base64 += chars[((bytes[i + 1] & 15) << 2) | (bytes[i + 2] >> 6)];
	      base64 += chars[bytes[i + 2] & 63];
	    }

	    if ((len % 3) === 2) {
	      base64 = base64.substring(0, base64.length - 1) + "=";
	    } else if (len % 3 === 1) {
	      base64 = base64.substring(0, base64.length - 2) + "==";
	    }

	    return base64;
	  };

	  exports.decode =  function(base64) {
	    var bufferLength = base64.length * 0.75,
	    len = base64.length, i, p = 0,
	    encoded1, encoded2, encoded3, encoded4;

	    if (base64[base64.length - 1] === "=") {
	      bufferLength--;
	      if (base64[base64.length - 2] === "=") {
	        bufferLength--;
	      }
	    }

	    var arraybuffer = new ArrayBuffer(bufferLength),
	    bytes = new Uint8Array(arraybuffer);

	    for (i = 0; i < len; i+=4) {
	      encoded1 = lookup[base64.charCodeAt(i)];
	      encoded2 = lookup[base64.charCodeAt(i+1)];
	      encoded3 = lookup[base64.charCodeAt(i+2)];
	      encoded4 = lookup[base64.charCodeAt(i+3)];

	      bytes[p++] = (encoded1 << 2) | (encoded2 >> 4);
	      bytes[p++] = ((encoded2 & 15) << 4) | (encoded3 >> 2);
	      bytes[p++] = ((encoded3 & 3) << 6) | (encoded4 & 63);
	    }

	    return arraybuffer;
	  };
	})();


/***/ },
/* 90 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * Create a blob builder even when vendor prefixes exist
	 */

	var BlobBuilder = global.BlobBuilder
	  || global.WebKitBlobBuilder
	  || global.MSBlobBuilder
	  || global.MozBlobBuilder;

	/**
	 * Check if Blob constructor is supported
	 */

	var blobSupported = (function() {
	  try {
	    var a = new Blob(['hi']);
	    return a.size === 2;
	  } catch(e) {
	    return false;
	  }
	})();

	/**
	 * Check if Blob constructor supports ArrayBufferViews
	 * Fails in Safari 6, so we need to map to ArrayBuffers there.
	 */

	var blobSupportsArrayBufferView = blobSupported && (function() {
	  try {
	    var b = new Blob([new Uint8Array([1,2])]);
	    return b.size === 2;
	  } catch(e) {
	    return false;
	  }
	})();

	/**
	 * Check if BlobBuilder is supported
	 */

	var blobBuilderSupported = BlobBuilder
	  && BlobBuilder.prototype.append
	  && BlobBuilder.prototype.getBlob;

	/**
	 * Helper function that maps ArrayBufferViews to ArrayBuffers
	 * Used by BlobBuilder constructor and old browsers that didn't
	 * support it in the Blob constructor.
	 */

	function mapArrayBufferViews(ary) {
	  for (var i = 0; i < ary.length; i++) {
	    var chunk = ary[i];
	    if (chunk.buffer instanceof ArrayBuffer) {
	      var buf = chunk.buffer;

	      // if this is a subarray, make a copy so we only
	      // include the subarray region from the underlying buffer
	      if (chunk.byteLength !== buf.byteLength) {
	        var copy = new Uint8Array(chunk.byteLength);
	        copy.set(new Uint8Array(buf, chunk.byteOffset, chunk.byteLength));
	        buf = copy.buffer;
	      }

	      ary[i] = buf;
	    }
	  }
	}

	function BlobBuilderConstructor(ary, options) {
	  options = options || {};

	  var bb = new BlobBuilder();
	  mapArrayBufferViews(ary);

	  for (var i = 0; i < ary.length; i++) {
	    bb.append(ary[i]);
	  }

	  return (options.type) ? bb.getBlob(options.type) : bb.getBlob();
	};

	function BlobConstructor(ary, options) {
	  mapArrayBufferViews(ary);
	  return new Blob(ary, options || {});
	};

	module.exports = (function() {
	  if (blobSupported) {
	    return blobSupportsArrayBufferView ? global.Blob : BlobConstructor;
	  } else if (blobBuilderSupported) {
	    return BlobBuilderConstructor;
	  } else {
	    return undefined;
	  }
	})();

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * Expose `Emitter`.
	 */

	if (true) {
	  module.exports = Emitter;
	}

	/**
	 * Initialize a new `Emitter`.
	 *
	 * @api public
	 */

	function Emitter(obj) {
	  if (obj) return mixin(obj);
	};

	/**
	 * Mixin the emitter properties.
	 *
	 * @param {Object} obj
	 * @return {Object}
	 * @api private
	 */

	function mixin(obj) {
	  for (var key in Emitter.prototype) {
	    obj[key] = Emitter.prototype[key];
	  }
	  return obj;
	}

	/**
	 * Listen on the given `event` with `fn`.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */

	Emitter.prototype.on =
	Emitter.prototype.addEventListener = function(event, fn){
	  this._callbacks = this._callbacks || {};
	  (this._callbacks['$' + event] = this._callbacks['$' + event] || [])
	    .push(fn);
	  return this;
	};

	/**
	 * Adds an `event` listener that will be invoked a single
	 * time then automatically removed.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */

	Emitter.prototype.once = function(event, fn){
	  function on() {
	    this.off(event, on);
	    fn.apply(this, arguments);
	  }

	  on.fn = fn;
	  this.on(event, on);
	  return this;
	};

	/**
	 * Remove the given callback for `event` or all
	 * registered callbacks.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */

	Emitter.prototype.off =
	Emitter.prototype.removeListener =
	Emitter.prototype.removeAllListeners =
	Emitter.prototype.removeEventListener = function(event, fn){
	  this._callbacks = this._callbacks || {};

	  // all
	  if (0 == arguments.length) {
	    this._callbacks = {};
	    return this;
	  }

	  // specific event
	  var callbacks = this._callbacks['$' + event];
	  if (!callbacks) return this;

	  // remove all handlers
	  if (1 == arguments.length) {
	    delete this._callbacks['$' + event];
	    return this;
	  }

	  // remove specific handler
	  var cb;
	  for (var i = 0; i < callbacks.length; i++) {
	    cb = callbacks[i];
	    if (cb === fn || cb.fn === fn) {
	      callbacks.splice(i, 1);
	      break;
	    }
	  }
	  return this;
	};

	/**
	 * Emit `event` with the given args.
	 *
	 * @param {String} event
	 * @param {Mixed} ...
	 * @return {Emitter}
	 */

	Emitter.prototype.emit = function(event){
	  this._callbacks = this._callbacks || {};
	  var args = [].slice.call(arguments, 1)
	    , callbacks = this._callbacks['$' + event];

	  if (callbacks) {
	    callbacks = callbacks.slice(0);
	    for (var i = 0, len = callbacks.length; i < len; ++i) {
	      callbacks[i].apply(this, args);
	    }
	  }

	  return this;
	};

	/**
	 * Return array of callbacks for `event`.
	 *
	 * @param {String} event
	 * @return {Array}
	 * @api public
	 */

	Emitter.prototype.listeners = function(event){
	  this._callbacks = this._callbacks || {};
	  return this._callbacks['$' + event] || [];
	};

	/**
	 * Check if this emitter has `event` handlers.
	 *
	 * @param {String} event
	 * @return {Boolean}
	 * @api public
	 */

	Emitter.prototype.hasListeners = function(event){
	  return !! this.listeners(event).length;
	};


/***/ },
/* 92 */
/***/ function(module, exports) {

	/**
	 * Compiles a querystring
	 * Returns string representation of the object
	 *
	 * @param {Object}
	 * @api private
	 */

	exports.encode = function (obj) {
	  var str = '';

	  for (var i in obj) {
	    if (obj.hasOwnProperty(i)) {
	      if (str.length) str += '&';
	      str += encodeURIComponent(i) + '=' + encodeURIComponent(obj[i]);
	    }
	  }

	  return str;
	};

	/**
	 * Parses a simple querystring into an object
	 *
	 * @param {String} qs
	 * @api private
	 */

	exports.decode = function(qs){
	  var qry = {};
	  var pairs = qs.split('&');
	  for (var i = 0, l = pairs.length; i < l; i++) {
	    var pair = pairs[i].split('=');
	    qry[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
	  }
	  return qry;
	};


/***/ },
/* 93 */
/***/ function(module, exports) {

	
	module.exports = function(a, b){
	  var fn = function(){};
	  fn.prototype = b.prototype;
	  a.prototype = new fn;
	  a.prototype.constructor = a;
	};

/***/ },
/* 94 */
/***/ function(module, exports) {

	'use strict';

	var alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_'.split('')
	  , length = 64
	  , map = {}
	  , seed = 0
	  , i = 0
	  , prev;

	/**
	 * Return a string representing the specified number.
	 *
	 * @param {Number} num The number to convert.
	 * @returns {String} The string representation of the number.
	 * @api public
	 */
	function encode(num) {
	  var encoded = '';

	  do {
	    encoded = alphabet[num % length] + encoded;
	    num = Math.floor(num / length);
	  } while (num > 0);

	  return encoded;
	}

	/**
	 * Return the integer value specified by the given string.
	 *
	 * @param {String} str The string to convert.
	 * @returns {Number} The integer value represented by the string.
	 * @api public
	 */
	function decode(str) {
	  var decoded = 0;

	  for (i = 0; i < str.length; i++) {
	    decoded = decoded * length + map[str.charAt(i)];
	  }

	  return decoded;
	}

	/**
	 * Yeast: A tiny growing id generator.
	 *
	 * @returns {String} A unique id.
	 * @api public
	 */
	function yeast() {
	  var now = encode(+new Date());

	  if (now !== prev) return seed = 0, prev = now;
	  return now +'.'+ encode(seed++);
	}

	//
	// Map each character to its index.
	//
	for (; i < length; i++) map[alphabet[i]] = i;

	//
	// Expose the `yeast`, `encode` and `decode` functions.
	//
	yeast.encode = encode;
	yeast.decode = decode;
	module.exports = yeast;


/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {
	/**
	 * This is the web browser implementation of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */

	exports = module.exports = __webpack_require__(96);
	exports.log = log;
	exports.formatArgs = formatArgs;
	exports.save = save;
	exports.load = load;
	exports.useColors = useColors;
	exports.storage = 'undefined' != typeof chrome
	               && 'undefined' != typeof chrome.storage
	                  ? chrome.storage.local
	                  : localstorage();

	/**
	 * Colors.
	 */

	exports.colors = [
	  'lightseagreen',
	  'forestgreen',
	  'goldenrod',
	  'dodgerblue',
	  'darkorchid',
	  'crimson'
	];

	/**
	 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
	 * and the Firebug extension (any Firefox version) are known
	 * to support "%c" CSS customizations.
	 *
	 * TODO: add a `localStorage` variable to explicitly enable/disable colors
	 */

	function useColors() {
	  // is webkit? http://stackoverflow.com/a/16459606/376773
	  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
	  return (typeof document !== 'undefined' && 'WebkitAppearance' in document.documentElement.style) ||
	    // is firebug? http://stackoverflow.com/a/398120/376773
	    (window.console && (console.firebug || (console.exception && console.table))) ||
	    // is firefox >= v31?
	    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
	    (navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31);
	}

	/**
	 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
	 */

	exports.formatters.j = function(v) {
	  try {
	    return JSON.stringify(v);
	  } catch (err) {
	    return '[UnexpectedJSONParseError]: ' + err.message;
	  }
	};


	/**
	 * Colorize log arguments if enabled.
	 *
	 * @api public
	 */

	function formatArgs() {
	  var args = arguments;
	  var useColors = this.useColors;

	  args[0] = (useColors ? '%c' : '')
	    + this.namespace
	    + (useColors ? ' %c' : ' ')
	    + args[0]
	    + (useColors ? '%c ' : ' ')
	    + '+' + exports.humanize(this.diff);

	  if (!useColors) return args;

	  var c = 'color: ' + this.color;
	  args = [args[0], c, 'color: inherit'].concat(Array.prototype.slice.call(args, 1));

	  // the final "%c" is somewhat tricky, because there could be other
	  // arguments passed either before or after the %c, so we need to
	  // figure out the correct index to insert the CSS into
	  var index = 0;
	  var lastC = 0;
	  args[0].replace(/%[a-z%]/g, function(match) {
	    if ('%%' === match) return;
	    index++;
	    if ('%c' === match) {
	      // we only are interested in the *last* %c
	      // (the user may have provided their own)
	      lastC = index;
	    }
	  });

	  args.splice(lastC, 0, c);
	  return args;
	}

	/**
	 * Invokes `console.log()` when available.
	 * No-op when `console.log` is not a "function".
	 *
	 * @api public
	 */

	function log() {
	  // this hackery is required for IE8/9, where
	  // the `console.log` function doesn't have 'apply'
	  return 'object' === typeof console
	    && console.log
	    && Function.prototype.apply.call(console.log, console, arguments);
	}

	/**
	 * Save `namespaces`.
	 *
	 * @param {String} namespaces
	 * @api private
	 */

	function save(namespaces) {
	  try {
	    if (null == namespaces) {
	      exports.storage.removeItem('debug');
	    } else {
	      exports.storage.debug = namespaces;
	    }
	  } catch(e) {}
	}

	/**
	 * Load `namespaces`.
	 *
	 * @return {String} returns the previously persisted debug modes
	 * @api private
	 */

	function load() {
	  var r;
	  try {
	    return exports.storage.debug;
	  } catch(e) {}

	  // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
	  if (typeof process !== 'undefined' && 'env' in process) {
	    return process.env.DEBUG;
	  }
	}

	/**
	 * Enable namespaces listed in `localStorage.debug` initially.
	 */

	exports.enable(load());

	/**
	 * Localstorage attempts to return the localstorage.
	 *
	 * This is necessary because safari throws
	 * when a user disables cookies/localstorage
	 * and you attempt to access it.
	 *
	 * @return {LocalStorage}
	 * @api private
	 */

	function localstorage(){
	  try {
	    return window.localStorage;
	  } catch (e) {}
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * This is the common logic for both the Node.js and web browser
	 * implementations of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */

	exports = module.exports = debug.debug = debug;
	exports.coerce = coerce;
	exports.disable = disable;
	exports.enable = enable;
	exports.enabled = enabled;
	exports.humanize = __webpack_require__(97);

	/**
	 * The currently active debug mode names, and names to skip.
	 */

	exports.names = [];
	exports.skips = [];

	/**
	 * Map of special "%n" handling functions, for the debug "format" argument.
	 *
	 * Valid key names are a single, lowercased letter, i.e. "n".
	 */

	exports.formatters = {};

	/**
	 * Previously assigned color.
	 */

	var prevColor = 0;

	/**
	 * Previous log timestamp.
	 */

	var prevTime;

	/**
	 * Select a color.
	 *
	 * @return {Number}
	 * @api private
	 */

	function selectColor() {
	  return exports.colors[prevColor++ % exports.colors.length];
	}

	/**
	 * Create a debugger with the given `namespace`.
	 *
	 * @param {String} namespace
	 * @return {Function}
	 * @api public
	 */

	function debug(namespace) {

	  // define the `disabled` version
	  function disabled() {
	  }
	  disabled.enabled = false;

	  // define the `enabled` version
	  function enabled() {

	    var self = enabled;

	    // set `diff` timestamp
	    var curr = +new Date();
	    var ms = curr - (prevTime || curr);
	    self.diff = ms;
	    self.prev = prevTime;
	    self.curr = curr;
	    prevTime = curr;

	    // add the `color` if not set
	    if (null == self.useColors) self.useColors = exports.useColors();
	    if (null == self.color && self.useColors) self.color = selectColor();

	    var args = new Array(arguments.length);
	    for (var i = 0; i < args.length; i++) {
	      args[i] = arguments[i];
	    }

	    args[0] = exports.coerce(args[0]);

	    if ('string' !== typeof args[0]) {
	      // anything else let's inspect with %o
	      args = ['%o'].concat(args);
	    }

	    // apply any `formatters` transformations
	    var index = 0;
	    args[0] = args[0].replace(/%([a-z%])/g, function(match, format) {
	      // if we encounter an escaped % then don't increase the array index
	      if (match === '%%') return match;
	      index++;
	      var formatter = exports.formatters[format];
	      if ('function' === typeof formatter) {
	        var val = args[index];
	        match = formatter.call(self, val);

	        // now we need to remove `args[index]` since it's inlined in the `format`
	        args.splice(index, 1);
	        index--;
	      }
	      return match;
	    });

	    // apply env-specific formatting
	    args = exports.formatArgs.apply(self, args);

	    var logFn = enabled.log || exports.log || console.log.bind(console);
	    logFn.apply(self, args);
	  }
	  enabled.enabled = true;

	  var fn = exports.enabled(namespace) ? enabled : disabled;

	  fn.namespace = namespace;

	  return fn;
	}

	/**
	 * Enables a debug mode by namespaces. This can include modes
	 * separated by a colon and wildcards.
	 *
	 * @param {String} namespaces
	 * @api public
	 */

	function enable(namespaces) {
	  exports.save(namespaces);

	  var split = (namespaces || '').split(/[\s,]+/);
	  var len = split.length;

	  for (var i = 0; i < len; i++) {
	    if (!split[i]) continue; // ignore empty strings
	    namespaces = split[i].replace(/[\\^$+?.()|[\]{}]/g, '\\$&').replace(/\*/g, '.*?');
	    if (namespaces[0] === '-') {
	      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
	    } else {
	      exports.names.push(new RegExp('^' + namespaces + '$'));
	    }
	  }
	}

	/**
	 * Disable debug output.
	 *
	 * @api public
	 */

	function disable() {
	  exports.enable('');
	}

	/**
	 * Returns true if the given mode name is enabled, false otherwise.
	 *
	 * @param {String} name
	 * @return {Boolean}
	 * @api public
	 */

	function enabled(name) {
	  var i, len;
	  for (i = 0, len = exports.skips.length; i < len; i++) {
	    if (exports.skips[i].test(name)) {
	      return false;
	    }
	  }
	  for (i = 0, len = exports.names.length; i < len; i++) {
	    if (exports.names[i].test(name)) {
	      return true;
	    }
	  }
	  return false;
	}

	/**
	 * Coerce `val`.
	 *
	 * @param {Mixed} val
	 * @return {Mixed}
	 * @api private
	 */

	function coerce(val) {
	  if (val instanceof Error) return val.stack || val.message;
	  return val;
	}


/***/ },
/* 97 */
/***/ function(module, exports) {

	/**
	 * Helpers.
	 */

	var s = 1000
	var m = s * 60
	var h = m * 60
	var d = h * 24
	var y = d * 365.25

	/**
	 * Parse or format the given `val`.
	 *
	 * Options:
	 *
	 *  - `long` verbose formatting [false]
	 *
	 * @param {String|Number} val
	 * @param {Object} options
	 * @throws {Error} throw an error if val is not a non-empty string or a number
	 * @return {String|Number}
	 * @api public
	 */

	module.exports = function (val, options) {
	  options = options || {}
	  var type = typeof val
	  if (type === 'string' && val.length > 0) {
	    return parse(val)
	  } else if (type === 'number' && isNaN(val) === false) {
	    return options.long ?
				fmtLong(val) :
				fmtShort(val)
	  }
	  throw new Error('val is not a non-empty string or a valid number. val=' + JSON.stringify(val))
	}

	/**
	 * Parse the given `str` and return milliseconds.
	 *
	 * @param {String} str
	 * @return {Number}
	 * @api private
	 */

	function parse(str) {
	  str = String(str)
	  if (str.length > 10000) {
	    return
	  }
	  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(str)
	  if (!match) {
	    return
	  }
	  var n = parseFloat(match[1])
	  var type = (match[2] || 'ms').toLowerCase()
	  switch (type) {
	    case 'years':
	    case 'year':
	    case 'yrs':
	    case 'yr':
	    case 'y':
	      return n * y
	    case 'days':
	    case 'day':
	    case 'd':
	      return n * d
	    case 'hours':
	    case 'hour':
	    case 'hrs':
	    case 'hr':
	    case 'h':
	      return n * h
	    case 'minutes':
	    case 'minute':
	    case 'mins':
	    case 'min':
	    case 'm':
	      return n * m
	    case 'seconds':
	    case 'second':
	    case 'secs':
	    case 'sec':
	    case 's':
	      return n * s
	    case 'milliseconds':
	    case 'millisecond':
	    case 'msecs':
	    case 'msec':
	    case 'ms':
	      return n
	    default:
	      return undefined
	  }
	}

	/**
	 * Short format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */

	function fmtShort(ms) {
	  if (ms >= d) {
	    return Math.round(ms / d) + 'd'
	  }
	  if (ms >= h) {
	    return Math.round(ms / h) + 'h'
	  }
	  if (ms >= m) {
	    return Math.round(ms / m) + 'm'
	  }
	  if (ms >= s) {
	    return Math.round(ms / s) + 's'
	  }
	  return ms + 'ms'
	}

	/**
	 * Long format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */

	function fmtLong(ms) {
	  return plural(ms, d, 'day') ||
	    plural(ms, h, 'hour') ||
	    plural(ms, m, 'minute') ||
	    plural(ms, s, 'second') ||
	    ms + ' ms'
	}

	/**
	 * Pluralization helper.
	 */

	function plural(ms, n, name) {
	  if (ms < n) {
	    return
	  }
	  if (ms < n * 1.5) {
	    return Math.floor(ms / n) + ' ' + name
	  }
	  return Math.ceil(ms / n) + ' ' + name + 's'
	}


/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {
	/**
	 * Module requirements.
	 */

	var Polling = __webpack_require__(81);
	var inherit = __webpack_require__(93);

	/**
	 * Module exports.
	 */

	module.exports = JSONPPolling;

	/**
	 * Cached regular expressions.
	 */

	var rNewline = /\n/g;
	var rEscapedNewline = /\\n/g;

	/**
	 * Global JSONP callbacks.
	 */

	var callbacks;

	/**
	 * Noop.
	 */

	function empty () { }

	/**
	 * JSONP Polling constructor.
	 *
	 * @param {Object} opts.
	 * @api public
	 */

	function JSONPPolling (opts) {
	  Polling.call(this, opts);

	  this.query = this.query || {};

	  // define global callbacks array if not present
	  // we do this here (lazily) to avoid unneeded global pollution
	  if (!callbacks) {
	    // we need to consider multiple engines in the same page
	    if (!global.___eio) global.___eio = [];
	    callbacks = global.___eio;
	  }

	  // callback identifier
	  this.index = callbacks.length;

	  // add callback to jsonp global
	  var self = this;
	  callbacks.push(function (msg) {
	    self.onData(msg);
	  });

	  // append to query string
	  this.query.j = this.index;

	  // prevent spurious errors from being emitted when the window is unloaded
	  if (global.document && global.addEventListener) {
	    global.addEventListener('beforeunload', function () {
	      if (self.script) self.script.onerror = empty;
	    }, false);
	  }
	}

	/**
	 * Inherits from Polling.
	 */

	inherit(JSONPPolling, Polling);

	/*
	 * JSONP only supports binary as base64 encoded strings
	 */

	JSONPPolling.prototype.supportsBinary = false;

	/**
	 * Closes the socket.
	 *
	 * @api private
	 */

	JSONPPolling.prototype.doClose = function () {
	  if (this.script) {
	    this.script.parentNode.removeChild(this.script);
	    this.script = null;
	  }

	  if (this.form) {
	    this.form.parentNode.removeChild(this.form);
	    this.form = null;
	    this.iframe = null;
	  }

	  Polling.prototype.doClose.call(this);
	};

	/**
	 * Starts a poll cycle.
	 *
	 * @api private
	 */

	JSONPPolling.prototype.doPoll = function () {
	  var self = this;
	  var script = document.createElement('script');

	  if (this.script) {
	    this.script.parentNode.removeChild(this.script);
	    this.script = null;
	  }

	  script.async = true;
	  script.src = this.uri();
	  script.onerror = function (e) {
	    self.onError('jsonp poll error', e);
	  };

	  var insertAt = document.getElementsByTagName('script')[0];
	  if (insertAt) {
	    insertAt.parentNode.insertBefore(script, insertAt);
	  } else {
	    (document.head || document.body).appendChild(script);
	  }
	  this.script = script;

	  var isUAgecko = 'undefined' !== typeof navigator && /gecko/i.test(navigator.userAgent);

	  if (isUAgecko) {
	    setTimeout(function () {
	      var iframe = document.createElement('iframe');
	      document.body.appendChild(iframe);
	      document.body.removeChild(iframe);
	    }, 100);
	  }
	};

	/**
	 * Writes with a hidden iframe.
	 *
	 * @param {String} data to send
	 * @param {Function} called upon flush.
	 * @api private
	 */

	JSONPPolling.prototype.doWrite = function (data, fn) {
	  var self = this;

	  if (!this.form) {
	    var form = document.createElement('form');
	    var area = document.createElement('textarea');
	    var id = this.iframeId = 'eio_iframe_' + this.index;
	    var iframe;

	    form.className = 'socketio';
	    form.style.position = 'absolute';
	    form.style.top = '-1000px';
	    form.style.left = '-1000px';
	    form.target = id;
	    form.method = 'POST';
	    form.setAttribute('accept-charset', 'utf-8');
	    area.name = 'd';
	    form.appendChild(area);
	    document.body.appendChild(form);

	    this.form = form;
	    this.area = area;
	  }

	  this.form.action = this.uri();

	  function complete () {
	    initIframe();
	    fn();
	  }

	  function initIframe () {
	    if (self.iframe) {
	      try {
	        self.form.removeChild(self.iframe);
	      } catch (e) {
	        self.onError('jsonp polling iframe removal error', e);
	      }
	    }

	    try {
	      // ie6 dynamic iframes with target="" support (thanks Chris Lambacher)
	      var html = '<iframe src="javascript:0" name="' + self.iframeId + '">';
	      iframe = document.createElement(html);
	    } catch (e) {
	      iframe = document.createElement('iframe');
	      iframe.name = self.iframeId;
	      iframe.src = 'javascript:0';
	    }

	    iframe.id = self.iframeId;

	    self.form.appendChild(iframe);
	    self.iframe = iframe;
	  }

	  initIframe();

	  // escape \n to prevent it from being converted into \r\n by some UAs
	  // double escaping is required for escaped new lines because unescaping of new lines can be done safely on server-side
	  data = data.replace(rEscapedNewline, '\\\n');
	  this.area.value = data.replace(rNewline, '\\n');

	  try {
	    this.form.submit();
	  } catch (e) {}

	  if (this.iframe.attachEvent) {
	    this.iframe.onreadystatechange = function () {
	      if (self.iframe.readyState === 'complete') {
	        complete();
	      }
	    };
	  } else {
	    this.iframe.onload = complete;
	  }
	};

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * Module dependencies.
	 */

	var Transport = __webpack_require__(82);
	var parser = __webpack_require__(83);
	var parseqs = __webpack_require__(92);
	var inherit = __webpack_require__(93);
	var yeast = __webpack_require__(94);
	var debug = __webpack_require__(95)('engine.io-client:websocket');
	var BrowserWebSocket = global.WebSocket || global.MozWebSocket;
	var NodeWebSocket;
	if (typeof window === 'undefined') {
	  try {
	    NodeWebSocket = __webpack_require__(100);
	  } catch (e) { }
	}

	/**
	 * Get either the `WebSocket` or `MozWebSocket` globals
	 * in the browser or try to resolve WebSocket-compatible
	 * interface exposed by `ws` for Node-like environment.
	 */

	var WebSocket = BrowserWebSocket;
	if (!WebSocket && typeof window === 'undefined') {
	  WebSocket = NodeWebSocket;
	}

	/**
	 * Module exports.
	 */

	module.exports = WS;

	/**
	 * WebSocket transport constructor.
	 *
	 * @api {Object} connection options
	 * @api public
	 */

	function WS (opts) {
	  var forceBase64 = (opts && opts.forceBase64);
	  if (forceBase64) {
	    this.supportsBinary = false;
	  }
	  this.perMessageDeflate = opts.perMessageDeflate;
	  this.usingBrowserWebSocket = BrowserWebSocket && !opts.forceNode;
	  if (!this.usingBrowserWebSocket) {
	    WebSocket = NodeWebSocket;
	  }
	  Transport.call(this, opts);
	}

	/**
	 * Inherits from Transport.
	 */

	inherit(WS, Transport);

	/**
	 * Transport name.
	 *
	 * @api public
	 */

	WS.prototype.name = 'websocket';

	/*
	 * WebSockets support binary
	 */

	WS.prototype.supportsBinary = true;

	/**
	 * Opens socket.
	 *
	 * @api private
	 */

	WS.prototype.doOpen = function () {
	  if (!this.check()) {
	    // let probe timeout
	    return;
	  }

	  var uri = this.uri();
	  var protocols = void (0);
	  var opts = {
	    agent: this.agent,
	    perMessageDeflate: this.perMessageDeflate
	  };

	  // SSL options for Node.js client
	  opts.pfx = this.pfx;
	  opts.key = this.key;
	  opts.passphrase = this.passphrase;
	  opts.cert = this.cert;
	  opts.ca = this.ca;
	  opts.ciphers = this.ciphers;
	  opts.rejectUnauthorized = this.rejectUnauthorized;
	  if (this.extraHeaders) {
	    opts.headers = this.extraHeaders;
	  }
	  if (this.localAddress) {
	    opts.localAddress = this.localAddress;
	  }

	  try {
	    this.ws = this.usingBrowserWebSocket ? new WebSocket(uri) : new WebSocket(uri, protocols, opts);
	  } catch (err) {
	    return this.emit('error', err);
	  }

	  if (this.ws.binaryType === undefined) {
	    this.supportsBinary = false;
	  }

	  if (this.ws.supports && this.ws.supports.binary) {
	    this.supportsBinary = true;
	    this.ws.binaryType = 'nodebuffer';
	  } else {
	    this.ws.binaryType = 'arraybuffer';
	  }

	  this.addEventListeners();
	};

	/**
	 * Adds event listeners to the socket
	 *
	 * @api private
	 */

	WS.prototype.addEventListeners = function () {
	  var self = this;

	  this.ws.onopen = function () {
	    self.onOpen();
	  };
	  this.ws.onclose = function () {
	    self.onClose();
	  };
	  this.ws.onmessage = function (ev) {
	    self.onData(ev.data);
	  };
	  this.ws.onerror = function (e) {
	    self.onError('websocket error', e);
	  };
	};

	/**
	 * Writes data to socket.
	 *
	 * @param {Array} array of packets.
	 * @api private
	 */

	WS.prototype.write = function (packets) {
	  var self = this;
	  this.writable = false;

	  // encodePacket efficient as it uses WS framing
	  // no need for encodePayload
	  var total = packets.length;
	  for (var i = 0, l = total; i < l; i++) {
	    (function (packet) {
	      parser.encodePacket(packet, self.supportsBinary, function (data) {
	        if (!self.usingBrowserWebSocket) {
	          // always create a new object (GH-437)
	          var opts = {};
	          if (packet.options) {
	            opts.compress = packet.options.compress;
	          }

	          if (self.perMessageDeflate) {
	            var len = 'string' === typeof data ? global.Buffer.byteLength(data) : data.length;
	            if (len < self.perMessageDeflate.threshold) {
	              opts.compress = false;
	            }
	          }
	        }

	        // Sometimes the websocket has already been closed but the browser didn't
	        // have a chance of informing us about it yet, in that case send will
	        // throw an error
	        try {
	          if (self.usingBrowserWebSocket) {
	            // TypeError is thrown when passing the second argument on Safari
	            self.ws.send(data);
	          } else {
	            self.ws.send(data, opts);
	          }
	        } catch (e) {
	          debug('websocket closed before onclose event');
	        }

	        --total || done();
	      });
	    })(packets[i]);
	  }

	  function done () {
	    self.emit('flush');

	    // fake drain
	    // defer to next tick to allow Socket to clear writeBuffer
	    setTimeout(function () {
	      self.writable = true;
	      self.emit('drain');
	    }, 0);
	  }
	};

	/**
	 * Called upon close
	 *
	 * @api private
	 */

	WS.prototype.onClose = function () {
	  Transport.prototype.onClose.call(this);
	};

	/**
	 * Closes socket.
	 *
	 * @api private
	 */

	WS.prototype.doClose = function () {
	  if (typeof this.ws !== 'undefined') {
	    this.ws.close();
	  }
	};

	/**
	 * Generates uri for connection.
	 *
	 * @api private
	 */

	WS.prototype.uri = function () {
	  var query = this.query || {};
	  var schema = this.secure ? 'wss' : 'ws';
	  var port = '';

	  // avoid port if default for schema
	  if (this.port && (('wss' === schema && Number(this.port) !== 443) ||
	    ('ws' === schema && Number(this.port) !== 80))) {
	    port = ':' + this.port;
	  }

	  // append timestamp to URI
	  if (this.timestampRequests) {
	    query[this.timestampParam] = yeast();
	  }

	  // communicate binary support capabilities
	  if (!this.supportsBinary) {
	    query.b64 = 1;
	  }

	  query = parseqs.encode(query);

	  // prepend ? to query
	  if (query.length) {
	    query = '?' + query;
	  }

	  var ipv6 = this.hostname.indexOf(':') !== -1;
	  return schema + '://' + (ipv6 ? '[' + this.hostname + ']' : this.hostname) + port + this.path + query;
	};

	/**
	 * Feature detection for WebSocket.
	 *
	 * @return {Boolean} whether this transport is available.
	 * @api public
	 */

	WS.prototype.check = function () {
	  return !!WebSocket && !('__initialize' in WebSocket && this.name === WS.prototype.name);
	};

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 100 */
/***/ function(module, exports) {

	/* (ignored) */

/***/ },
/* 101 */
/***/ function(module, exports) {

	
	var indexOf = [].indexOf;

	module.exports = function(arr, obj){
	  if (indexOf) return arr.indexOf(obj);
	  for (var i = 0; i < arr.length; ++i) {
	    if (arr[i] === obj) return i;
	  }
	  return -1;
	};

/***/ },
/* 102 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * JSON parse.
	 *
	 * @see Based on jQuery#parseJSON (MIT) and JSON2
	 * @api private
	 */

	var rvalidchars = /^[\],:{}\s]*$/;
	var rvalidescape = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g;
	var rvalidtokens = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;
	var rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g;
	var rtrimLeft = /^\s+/;
	var rtrimRight = /\s+$/;

	module.exports = function parsejson(data) {
	  if ('string' != typeof data || !data) {
	    return null;
	  }

	  data = data.replace(rtrimLeft, '').replace(rtrimRight, '');

	  // Attempt to parse using the native JSON parser first
	  if (global.JSON && JSON.parse) {
	    return JSON.parse(data);
	  }

	  if (rvalidchars.test(data.replace(rvalidescape, '@')
	      .replace(rvalidtokens, ']')
	      .replace(rvalidbraces, ''))) {
	    return (new Function('return ' + data))();
	  }
	};
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * Module dependencies.
	 */

	var parser = __webpack_require__(63);
	var Emitter = __webpack_require__(104);
	var toArray = __webpack_require__(105);
	var on = __webpack_require__(106);
	var bind = __webpack_require__(107);
	var debug = __webpack_require__(60)('socket.io-client:socket');
	var hasBin = __webpack_require__(108);

	/**
	 * Module exports.
	 */

	module.exports = exports = Socket;

	/**
	 * Internal events (blacklisted).
	 * These events can't be emitted by the user.
	 *
	 * @api private
	 */

	var events = {
	  connect: 1,
	  connect_error: 1,
	  connect_timeout: 1,
	  connecting: 1,
	  disconnect: 1,
	  error: 1,
	  reconnect: 1,
	  reconnect_attempt: 1,
	  reconnect_failed: 1,
	  reconnect_error: 1,
	  reconnecting: 1,
	  ping: 1,
	  pong: 1
	};

	/**
	 * Shortcut to `Emitter#emit`.
	 */

	var emit = Emitter.prototype.emit;

	/**
	 * `Socket` constructor.
	 *
	 * @api public
	 */

	function Socket (io, nsp, opts) {
	  this.io = io;
	  this.nsp = nsp;
	  this.json = this; // compat
	  this.ids = 0;
	  this.acks = {};
	  this.receiveBuffer = [];
	  this.sendBuffer = [];
	  this.connected = false;
	  this.disconnected = true;
	  if (opts && opts.query) {
	    this.query = opts.query;
	  }
	  if (this.io.autoConnect) this.open();
	}

	/**
	 * Mix in `Emitter`.
	 */

	Emitter(Socket.prototype);

	/**
	 * Subscribe to open, close and packet events
	 *
	 * @api private
	 */

	Socket.prototype.subEvents = function () {
	  if (this.subs) return;

	  var io = this.io;
	  this.subs = [
	    on(io, 'open', bind(this, 'onopen')),
	    on(io, 'packet', bind(this, 'onpacket')),
	    on(io, 'close', bind(this, 'onclose'))
	  ];
	};

	/**
	 * "Opens" the socket.
	 *
	 * @api public
	 */

	Socket.prototype.open =
	Socket.prototype.connect = function () {
	  if (this.connected) return this;

	  this.subEvents();
	  this.io.open(); // ensure open
	  if ('open' === this.io.readyState) this.onopen();
	  this.emit('connecting');
	  return this;
	};

	/**
	 * Sends a `message` event.
	 *
	 * @return {Socket} self
	 * @api public
	 */

	Socket.prototype.send = function () {
	  var args = toArray(arguments);
	  args.unshift('message');
	  this.emit.apply(this, args);
	  return this;
	};

	/**
	 * Override `emit`.
	 * If the event is in `events`, it's emitted normally.
	 *
	 * @param {String} event name
	 * @return {Socket} self
	 * @api public
	 */

	Socket.prototype.emit = function (ev) {
	  if (events.hasOwnProperty(ev)) {
	    emit.apply(this, arguments);
	    return this;
	  }

	  var args = toArray(arguments);
	  var parserType = parser.EVENT; // default
	  if (hasBin(args)) { parserType = parser.BINARY_EVENT; } // binary
	  var packet = { type: parserType, data: args };

	  packet.options = {};
	  packet.options.compress = !this.flags || false !== this.flags.compress;

	  // event ack callback
	  if ('function' === typeof args[args.length - 1]) {
	    debug('emitting packet with ack id %d', this.ids);
	    this.acks[this.ids] = args.pop();
	    packet.id = this.ids++;
	  }

	  if (this.connected) {
	    this.packet(packet);
	  } else {
	    this.sendBuffer.push(packet);
	  }

	  delete this.flags;

	  return this;
	};

	/**
	 * Sends a packet.
	 *
	 * @param {Object} packet
	 * @api private
	 */

	Socket.prototype.packet = function (packet) {
	  packet.nsp = this.nsp;
	  this.io.packet(packet);
	};

	/**
	 * Called upon engine `open`.
	 *
	 * @api private
	 */

	Socket.prototype.onopen = function () {
	  debug('transport is open - connecting');

	  // write connect packet if necessary
	  if ('/' !== this.nsp) {
	    if (this.query) {
	      this.packet({type: parser.CONNECT, query: this.query});
	    } else {
	      this.packet({type: parser.CONNECT});
	    }
	  }
	};

	/**
	 * Called upon engine `close`.
	 *
	 * @param {String} reason
	 * @api private
	 */

	Socket.prototype.onclose = function (reason) {
	  debug('close (%s)', reason);
	  this.connected = false;
	  this.disconnected = true;
	  delete this.id;
	  this.emit('disconnect', reason);
	};

	/**
	 * Called with socket packet.
	 *
	 * @param {Object} packet
	 * @api private
	 */

	Socket.prototype.onpacket = function (packet) {
	  if (packet.nsp !== this.nsp) return;

	  switch (packet.type) {
	    case parser.CONNECT:
	      this.onconnect();
	      break;

	    case parser.EVENT:
	      this.onevent(packet);
	      break;

	    case parser.BINARY_EVENT:
	      this.onevent(packet);
	      break;

	    case parser.ACK:
	      this.onack(packet);
	      break;

	    case parser.BINARY_ACK:
	      this.onack(packet);
	      break;

	    case parser.DISCONNECT:
	      this.ondisconnect();
	      break;

	    case parser.ERROR:
	      this.emit('error', packet.data);
	      break;
	  }
	};

	/**
	 * Called upon a server event.
	 *
	 * @param {Object} packet
	 * @api private
	 */

	Socket.prototype.onevent = function (packet) {
	  var args = packet.data || [];
	  debug('emitting event %j', args);

	  if (null != packet.id) {
	    debug('attaching ack callback to event');
	    args.push(this.ack(packet.id));
	  }

	  if (this.connected) {
	    emit.apply(this, args);
	  } else {
	    this.receiveBuffer.push(args);
	  }
	};

	/**
	 * Produces an ack callback to emit with an event.
	 *
	 * @api private
	 */

	Socket.prototype.ack = function (id) {
	  var self = this;
	  var sent = false;
	  return function () {
	    // prevent double callbacks
	    if (sent) return;
	    sent = true;
	    var args = toArray(arguments);
	    debug('sending ack %j', args);

	    var type = hasBin(args) ? parser.BINARY_ACK : parser.ACK;
	    self.packet({
	      type: type,
	      id: id,
	      data: args
	    });
	  };
	};

	/**
	 * Called upon a server acknowlegement.
	 *
	 * @param {Object} packet
	 * @api private
	 */

	Socket.prototype.onack = function (packet) {
	  var ack = this.acks[packet.id];
	  if ('function' === typeof ack) {
	    debug('calling ack %s with %j', packet.id, packet.data);
	    ack.apply(this, packet.data);
	    delete this.acks[packet.id];
	  } else {
	    debug('bad ack %s', packet.id);
	  }
	};

	/**
	 * Called upon server connect.
	 *
	 * @api private
	 */

	Socket.prototype.onconnect = function () {
	  this.connected = true;
	  this.disconnected = false;
	  this.emit('connect');
	  this.emitBuffered();
	};

	/**
	 * Emit buffered events (received and emitted).
	 *
	 * @api private
	 */

	Socket.prototype.emitBuffered = function () {
	  var i;
	  for (i = 0; i < this.receiveBuffer.length; i++) {
	    emit.apply(this, this.receiveBuffer[i]);
	  }
	  this.receiveBuffer = [];

	  for (i = 0; i < this.sendBuffer.length; i++) {
	    this.packet(this.sendBuffer[i]);
	  }
	  this.sendBuffer = [];
	};

	/**
	 * Called upon server disconnect.
	 *
	 * @api private
	 */

	Socket.prototype.ondisconnect = function () {
	  debug('server disconnect (%s)', this.nsp);
	  this.destroy();
	  this.onclose('io server disconnect');
	};

	/**
	 * Called upon forced client/server side disconnections,
	 * this method ensures the manager stops tracking us and
	 * that reconnections don't get triggered for this.
	 *
	 * @api private.
	 */

	Socket.prototype.destroy = function () {
	  if (this.subs) {
	    // clean subscriptions to avoid reconnections
	    for (var i = 0; i < this.subs.length; i++) {
	      this.subs[i].destroy();
	    }
	    this.subs = null;
	  }

	  this.io.destroy(this);
	};

	/**
	 * Disconnects the socket manually.
	 *
	 * @return {Socket} self
	 * @api public
	 */

	Socket.prototype.close =
	Socket.prototype.disconnect = function () {
	  if (this.connected) {
	    debug('performing disconnect (%s)', this.nsp);
	    this.packet({ type: parser.DISCONNECT });
	  }

	  // remove socket from pool
	  this.destroy();

	  if (this.connected) {
	    // fire events
	    this.onclose('io client disconnect');
	  }
	  return this;
	};

	/**
	 * Sets the compress flag.
	 *
	 * @param {Boolean} if `true`, compresses the sending data
	 * @return {Socket} self
	 * @api public
	 */

	Socket.prototype.compress = function (compress) {
	  this.flags = this.flags || {};
	  this.flags.compress = compress;
	  return this;
	};


/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * Expose `Emitter`.
	 */

	if (true) {
	  module.exports = Emitter;
	}

	/**
	 * Initialize a new `Emitter`.
	 *
	 * @api public
	 */

	function Emitter(obj) {
	  if (obj) return mixin(obj);
	};

	/**
	 * Mixin the emitter properties.
	 *
	 * @param {Object} obj
	 * @return {Object}
	 * @api private
	 */

	function mixin(obj) {
	  for (var key in Emitter.prototype) {
	    obj[key] = Emitter.prototype[key];
	  }
	  return obj;
	}

	/**
	 * Listen on the given `event` with `fn`.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */

	Emitter.prototype.on =
	Emitter.prototype.addEventListener = function(event, fn){
	  this._callbacks = this._callbacks || {};
	  (this._callbacks['$' + event] = this._callbacks['$' + event] || [])
	    .push(fn);
	  return this;
	};

	/**
	 * Adds an `event` listener that will be invoked a single
	 * time then automatically removed.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */

	Emitter.prototype.once = function(event, fn){
	  function on() {
	    this.off(event, on);
	    fn.apply(this, arguments);
	  }

	  on.fn = fn;
	  this.on(event, on);
	  return this;
	};

	/**
	 * Remove the given callback for `event` or all
	 * registered callbacks.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */

	Emitter.prototype.off =
	Emitter.prototype.removeListener =
	Emitter.prototype.removeAllListeners =
	Emitter.prototype.removeEventListener = function(event, fn){
	  this._callbacks = this._callbacks || {};

	  // all
	  if (0 == arguments.length) {
	    this._callbacks = {};
	    return this;
	  }

	  // specific event
	  var callbacks = this._callbacks['$' + event];
	  if (!callbacks) return this;

	  // remove all handlers
	  if (1 == arguments.length) {
	    delete this._callbacks['$' + event];
	    return this;
	  }

	  // remove specific handler
	  var cb;
	  for (var i = 0; i < callbacks.length; i++) {
	    cb = callbacks[i];
	    if (cb === fn || cb.fn === fn) {
	      callbacks.splice(i, 1);
	      break;
	    }
	  }
	  return this;
	};

	/**
	 * Emit `event` with the given args.
	 *
	 * @param {String} event
	 * @param {Mixed} ...
	 * @return {Emitter}
	 */

	Emitter.prototype.emit = function(event){
	  this._callbacks = this._callbacks || {};
	  var args = [].slice.call(arguments, 1)
	    , callbacks = this._callbacks['$' + event];

	  if (callbacks) {
	    callbacks = callbacks.slice(0);
	    for (var i = 0, len = callbacks.length; i < len; ++i) {
	      callbacks[i].apply(this, args);
	    }
	  }

	  return this;
	};

	/**
	 * Return array of callbacks for `event`.
	 *
	 * @param {String} event
	 * @return {Array}
	 * @api public
	 */

	Emitter.prototype.listeners = function(event){
	  this._callbacks = this._callbacks || {};
	  return this._callbacks['$' + event] || [];
	};

	/**
	 * Check if this emitter has `event` handlers.
	 *
	 * @param {String} event
	 * @return {Boolean}
	 * @api public
	 */

	Emitter.prototype.hasListeners = function(event){
	  return !! this.listeners(event).length;
	};


/***/ },
/* 105 */
/***/ function(module, exports) {

	module.exports = toArray

	function toArray(list, index) {
	    var array = []

	    index = index || 0

	    for (var i = index || 0; i < list.length; i++) {
	        array[i - index] = list[i]
	    }

	    return array
	}


/***/ },
/* 106 */
/***/ function(module, exports) {

	
	/**
	 * Module exports.
	 */

	module.exports = on;

	/**
	 * Helper for subscriptions.
	 *
	 * @param {Object|EventEmitter} obj with `Emitter` mixin or `EventEmitter`
	 * @param {String} event name
	 * @param {Function} callback
	 * @api public
	 */

	function on (obj, ev, fn) {
	  obj.on(ev, fn);
	  return {
	    destroy: function () {
	      obj.removeListener(ev, fn);
	    }
	  };
	}


/***/ },
/* 107 */
/***/ function(module, exports) {

	/**
	 * Slice reference.
	 */

	var slice = [].slice;

	/**
	 * Bind `obj` to `fn`.
	 *
	 * @param {Object} obj
	 * @param {Function|String} fn or string
	 * @return {Function}
	 * @api public
	 */

	module.exports = function(obj, fn){
	  if ('string' == typeof fn) fn = obj[fn];
	  if ('function' != typeof fn) throw new Error('bind() requires a function');
	  var args = slice.call(arguments, 2);
	  return function(){
	    return fn.apply(obj, args.concat(slice.call(arguments)));
	  }
	};


/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {
	/*
	 * Module requirements.
	 */

	var isArray = __webpack_require__(18);

	/**
	 * Module exports.
	 */

	module.exports = hasBinary;

	/**
	 * Checks for binary data.
	 *
	 * Right now only Buffer and ArrayBuffer are supported..
	 *
	 * @param {Object} anything
	 * @api public
	 */

	function hasBinary(data) {

	  function _hasBinary(obj) {
	    if (!obj) return false;

	    if ( (global.Buffer && global.Buffer.isBuffer && global.Buffer.isBuffer(obj)) ||
	         (global.ArrayBuffer && obj instanceof ArrayBuffer) ||
	         (global.Blob && obj instanceof Blob) ||
	         (global.File && obj instanceof File)
	        ) {
	      return true;
	    }

	    if (isArray(obj)) {
	      for (var i = 0; i < obj.length; i++) {
	          if (_hasBinary(obj[i])) {
	              return true;
	          }
	      }
	    } else if (obj && 'object' == typeof obj) {
	      // see: https://github.com/Automattic/has-binary/pull/4
	      if (obj.toJSON && 'function' == typeof obj.toJSON) {
	        obj = obj.toJSON();
	      }

	      for (var key in obj) {
	        if (Object.prototype.hasOwnProperty.call(obj, key) && _hasBinary(obj[key])) {
	          return true;
	        }
	      }
	    }

	    return false;
	  }

	  return _hasBinary(data);
	}

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 109 */
/***/ function(module, exports) {

	
	/**
	 * Expose `Backoff`.
	 */

	module.exports = Backoff;

	/**
	 * Initialize backoff timer with `opts`.
	 *
	 * - `min` initial timeout in milliseconds [100]
	 * - `max` max timeout [10000]
	 * - `jitter` [0]
	 * - `factor` [2]
	 *
	 * @param {Object} opts
	 * @api public
	 */

	function Backoff(opts) {
	  opts = opts || {};
	  this.ms = opts.min || 100;
	  this.max = opts.max || 10000;
	  this.factor = opts.factor || 2;
	  this.jitter = opts.jitter > 0 && opts.jitter <= 1 ? opts.jitter : 0;
	  this.attempts = 0;
	}

	/**
	 * Return the backoff duration.
	 *
	 * @return {Number}
	 * @api public
	 */

	Backoff.prototype.duration = function(){
	  var ms = this.ms * Math.pow(this.factor, this.attempts++);
	  if (this.jitter) {
	    var rand =  Math.random();
	    var deviation = Math.floor(rand * this.jitter * ms);
	    ms = (Math.floor(rand * 10) & 1) == 0  ? ms - deviation : ms + deviation;
	  }
	  return Math.min(ms, this.max) | 0;
	};

	/**
	 * Reset the number of attempts.
	 *
	 * @api public
	 */

	Backoff.prototype.reset = function(){
	  this.attempts = 0;
	};

	/**
	 * Set the minimum duration
	 *
	 * @api public
	 */

	Backoff.prototype.setMin = function(min){
	  this.ms = min;
	};

	/**
	 * Set the maximum duration
	 *
	 * @api public
	 */

	Backoff.prototype.setMax = function(max){
	  this.max = max;
	};

	/**
	 * Set the jitter
	 *
	 * @api public
	 */

	Backoff.prototype.setJitter = function(jitter){
	  this.jitter = jitter;
	};



/***/ }
/******/ ])
});
;