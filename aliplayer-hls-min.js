!function(t, e) {
    "object" == typeof exports && "object" == typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define([], e) : "object" == typeof exports ? exports.Hls = e() : t.Hls = e()
}(this, function() {
    return function(t) {
        function e(i) {
            if (r[i])
                return r[i].exports;
            var n = r[i] = {
                i: i,
                l: !1,
                exports: {}
            };
            return t[i].call(n.exports, n, n.exports, e),
            n.l = !0,
            n.exports
        }
        var r = {};
        return e.m = t,
        e.c = r,
        e.d = function(t, r, i) {
            e.o(t, r) || Object.defineProperty(t, r, {
                configurable: !1,
                enumerable: !0,
                get: i
            })
        }
        ,
        e.n = function(t) {
            var r = t && t.__esModule ? function() {
                return t.default
            }
            : function() {
                return t
            }
            ;
            return e.d(r, "a", r),
            r
        }
        ,
        e.o = function(t, e) {
            return Object.prototype.hasOwnProperty.call(t, e)
        }
        ,
        e.p = "/dist/",
        e(e.s = 67)
    }([function(t, e, r) {
        (function(i) {
            var n, o, a, s = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                return typeof t
            }
            : function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            }
            ;
            !function(r, i) {
                "object" === s(e) ? t.exports = e = i() : (o = [],
                n = i,
                void 0 !== (a = "function" == typeof n ? n.apply(e, o) : n) && (t.exports = a))
            }(0, function() {
                var t = t || function(t, e) {
                    var n;
                    if ("undefined" != typeof window && window.crypto && (n = window.crypto),
                    "undefined" != typeof self && self.crypto && (n = self.crypto),
                    "undefined" != typeof globalThis && globalThis.crypto && (n = globalThis.crypto),
                    !n && "undefined" != typeof window && window.msCrypto && (n = window.msCrypto),
                    !n && void 0 !== i && i.crypto && (n = i.crypto),
                    !n)
                        try {
                            n = r(94)
                        } catch (t) {}
                    var o = function() {
                        if (n) {
                            if ("function" == typeof n.getRandomValues)
                                try {
                                    return n.getRandomValues(new Uint32Array(1))[0]
                                } catch (t) {}
                            if ("function" == typeof n.randomBytes)
                                try {
                                    return n.randomBytes(4).readInt32LE()
                                } catch (t) {}
                        }
                        throw new Error("Native crypto module could not be used to get secure random number.")
                    }
                      , a = Object.create || function() {
                        function t() {}
                        return function(e) {
                            var r;
                            return t.prototype = e,
                            r = new t,
                            t.prototype = null,
                            r
                        }
                    }()
                      , s = {}
                      , u = s.lib = {}
                      , c = u.Base = function() {
                        return {
                            extend: function(t) {
                                var e = a(this);
                                return t && e.mixIn(t),
                                e.hasOwnProperty("init") && this.init !== e.init || (e.init = function() {
                                    e.$super.init.apply(this, arguments)
                                }
                                ),
                                e.init.prototype = e,
                                e.$super = this,
                                e
                            },
                            create: function() {
                                var t = this.extend();
                                return t.init.apply(t, arguments),
                                t
                            },
                            init: function() {},
                            mixIn: function(t) {
                                for (var e in t)
                                    t.hasOwnProperty(e) && (this[e] = t[e]);
                                t.hasOwnProperty("toString") && (this.toString = t.toString)
                            },
                            clone: function() {
                                return this.init.prototype.extend(this)
                            }
                        }
                    }()
                      , l = u.WordArray = c.extend({
                        init: function(t, e) {
                            t = this.words = t || [],
                            this.sigBytes = void 0 != e ? e : 4 * t.length
                        },
                        toString: function(t) {
                            return (t || f).stringify(this)
                        },
                        concat: function(t) {
                            var e = this.words
                              , r = t.words
                              , i = this.sigBytes
                              , n = t.sigBytes;
                            if (this.clamp(),
                            i % 4)
                                for (var o = 0; o < n; o++) {
                                    var a = r[o >>> 2] >>> 24 - o % 4 * 8 & 255;
                                    e[i + o >>> 2] |= a << 24 - (i + o) % 4 * 8
                                }
                            else
                                for (var s = 0; s < n; s += 4)
                                    e[i + s >>> 2] = r[s >>> 2];
                            return this.sigBytes += n,
                            this
                        },
                        clamp: function() {
                            var e = this.words
                              , r = this.sigBytes;
                            e[r >>> 2] &= 4294967295 << 32 - r % 4 * 8,
                            e.length = t.ceil(r / 4)
                        },
                        clone: function() {
                            var t = c.clone.call(this);
                            return t.words = this.words.slice(0),
                            t
                        },
                        random: function(t) {
                            for (var e = [], r = 0; r < t; r += 4)
                                e.push(o());
                            return new l.init(e,t)
                        }
                    })
                      , h = s.enc = {}
                      , f = h.Hex = {
                        stringify: function(t) {
                            for (var e = t.words, r = t.sigBytes, i = [], n = 0; n < r; n++) {
                                var o = e[n >>> 2] >>> 24 - n % 4 * 8 & 255;
                                i.push((o >>> 4).toString(16)),
                                i.push((15 & o).toString(16))
                            }
                            return i.join("")
                        },
                        parse: function(t) {
                            for (var e = t.length, r = [], i = 0; i < e; i += 2)
                                r[i >>> 3] |= parseInt(t.substr(i, 2), 16) << 24 - i % 8 * 4;
                            return new l.init(r,e / 2)
                        }
                    }
                      , d = h.Latin1 = {
                        stringify: function(t) {
                            for (var e = t.words, r = t.sigBytes, i = [], n = 0; n < r; n++) {
                                var o = e[n >>> 2] >>> 24 - n % 4 * 8 & 255;
                                i.push(String.fromCharCode(o))
                            }
                            return i.join("")
                        },
                        parse: function(t) {
                            for (var e = t.length, r = [], i = 0; i < e; i++)
                                r[i >>> 2] |= (255 & t.charCodeAt(i)) << 24 - i % 4 * 8;
                            return new l.init(r,e)
                        }
                    }
                      , p = h.Utf8 = {
                        stringify: function(t) {
                            try {
                                return decodeURIComponent(escape(d.stringify(t)))
                            } catch (t) {
                                throw new Error("Malformed UTF-8 data")
                            }
                        },
                        parse: function(t) {
                            return d.parse(unescape(encodeURIComponent(t)))
                        }
                    }
                      , y = u.BufferedBlockAlgorithm = c.extend({
                        reset: function() {
                            this._data = new l.init,
                            this._nDataBytes = 0
                        },
                        _append: function(t) {
                            "string" == typeof t && (t = p.parse(t)),
                            this._data.concat(t),
                            this._nDataBytes += t.sigBytes
                        },
                        _process: function(e) {
                            var r, i = this._data, n = i.words, o = i.sigBytes, a = this.blockSize, s = 4 * a, u = o / s;
                            u = e ? t.ceil(u) : t.max((0 | u) - this._minBufferSize, 0);
                            var c = u * a
                              , h = t.min(4 * c, o);
                            if (c) {
                                for (var f = 0; f < c; f += a)
                                    this._doProcessBlock(n, f);
                                r = n.splice(0, c),
                                i.sigBytes -= h
                            }
                            return new l.init(r,h)
                        },
                        clone: function() {
                            var t = c.clone.call(this);
                            return t._data = this._data.clone(),
                            t
                        },
                        _minBufferSize: 0
                    })
                      , g = (u.Hasher = y.extend({
                        cfg: c.extend(),
                        init: function(t) {
                            this.cfg = this.cfg.extend(t),
                            this.reset()
                        },
                        reset: function() {
                            y.reset.call(this),
                            this._doReset()
                        },
                        update: function(t) {
                            return this._append(t),
                            this._process(),
                            this
                        },
                        finalize: function(t) {
                            return t && this._append(t),
                            this._doFinalize()
                        },
                        blockSize: 16,
                        _createHelper: function(t) {
                            return function(e, r) {
                                return new t.init(r).finalize(e)
                            }
                        },
                        _createHmacHelper: function(t) {
                            return function(e, r) {
                                return new g.HMAC.init(t,r).finalize(e)
                            }
                        }
                    }),
                    s.algo = {});
                    return s
                }(Math);
                return t
            })
        }
        ).call(e, r(30))
    }
    , function(t, e, r) {
        var i, n, o, a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        }
        : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        }
        ;
        !function(s, u, c) {
            "object" === a(e) ? t.exports = e = u(r(0), r(6)) : (n = [r(0), r(6)],
            i = u,
            void 0 !== (o = "function" == typeof i ? i.apply(e, n) : i) && (t.exports = o))
        }(0, function(t) {
            t.lib.Cipher || function(e) {
                var r = t
                  , i = r.lib
                  , n = i.Base
                  , o = i.WordArray
                  , a = i.BufferedBlockAlgorithm
                  , s = r.enc
                  , u = (s.Utf8,
                s.Base64)
                  , c = r.algo
                  , l = c.EvpKDF
                  , h = i.Cipher = a.extend({
                    cfg: n.extend(),
                    createEncryptor: function(t, e) {
                        return this.create(this._ENC_XFORM_MODE, t, e)
                    },
                    createDecryptor: function(t, e) {
                        return this.create(this._DEC_XFORM_MODE, t, e)
                    },
                    init: function(t, e, r) {
                        this.cfg = this.cfg.extend(r),
                        this._xformMode = t,
                        this._key = e,
                        this.reset()
                    },
                    reset: function() {
                        a.reset.call(this),
                        this._doReset()
                    },
                    process: function(t) {
                        return this._append(t),
                        this._process()
                    },
                    finalize: function(t) {
                        return t && this._append(t),
                        this._doFinalize()
                    },
                    keySize: 4,
                    ivSize: 4,
                    _ENC_XFORM_MODE: 1,
                    _DEC_XFORM_MODE: 2,
                    _createHelper: function() {
                        function t(t) {
                            return "string" == typeof t ? _ : S
                        }
                        return function(e) {
                            return {
                                encrypt: function(r, i, n) {
                                    return t(i).encrypt(e, r, i, n)
                                },
                                decrypt: function(r, i, n) {
                                    return t(i).decrypt(e, r, i, n)
                                }
                            }
                        }
                    }()
                })
                  , f = (i.StreamCipher = h.extend({
                    _doFinalize: function() {
                        return this._process(!0)
                    },
                    blockSize: 1
                }),
                r.mode = {})
                  , d = i.BlockCipherMode = n.extend({
                    createEncryptor: function(t, e) {
                        return this.Encryptor.create(t, e)
                    },
                    createDecryptor: function(t, e) {
                        return this.Decryptor.create(t, e)
                    },
                    init: function(t, e) {
                        this._cipher = t,
                        this._iv = e
                    }
                })
                  , p = f.CBC = function() {
                    function t(t, r, i) {
                        var n, o = this._iv;
                        o ? (n = o,
                        this._iv = e) : n = this._prevBlock;
                        for (var a = 0; a < i; a++)
                            t[r + a] ^= n[a]
                    }
                    var r = d.extend();
                    return r.Encryptor = r.extend({
                        processBlock: function(e, r) {
                            var i = this._cipher
                              , n = i.blockSize;
                            t.call(this, e, r, n),
                            i.encryptBlock(e, r),
                            this._prevBlock = e.slice(r, r + n)
                        }
                    }),
                    r.Decryptor = r.extend({
                        processBlock: function(e, r) {
                            var i = this._cipher
                              , n = i.blockSize
                              , o = e.slice(r, r + n);
                            i.decryptBlock(e, r),
                            t.call(this, e, r, n),
                            this._prevBlock = o
                        }
                    }),
                    r
                }()
                  , y = r.pad = {}
                  , g = y.Pkcs7 = {
                    pad: function(t, e) {
                        for (var r = 4 * e, i = r - t.sigBytes % r, n = i << 24 | i << 16 | i << 8 | i, a = [], s = 0; s < i; s += 4)
                            a.push(n);
                        var u = o.create(a, i);
                        t.concat(u)
                    },
                    unpad: function(t) {
                        var e = 255 & t.words[t.sigBytes - 1 >>> 2];
                        t.sigBytes -= e
                    }
                }
                  , v = (i.BlockCipher = h.extend({
                    cfg: h.cfg.extend({
                        mode: p,
                        padding: g
                    }),
                    reset: function() {
                        var t;
                        h.reset.call(this);
                        var e = this.cfg
                          , r = e.iv
                          , i = e.mode;
                        this._xformMode == this._ENC_XFORM_MODE ? t = i.createEncryptor : (t = i.createDecryptor,
                        this._minBufferSize = 1),
                        this._mode && this._mode.__creator == t ? this._mode.init(this, r && r.words) : (this._mode = t.call(i, this, r && r.words),
                        this._mode.__creator = t)
                    },
                    _doProcessBlock: function(t, e) {
                        this._mode.processBlock(t, e)
                    },
                    _doFinalize: function() {
                        var t, e = this.cfg.padding;
                        return this._xformMode == this._ENC_XFORM_MODE ? (e.pad(this._data, this.blockSize),
                        t = this._process(!0)) : (t = this._process(!0),
                        e.unpad(t)),
                        t
                    },
                    blockSize: 4
                }),
                i.CipherParams = n.extend({
                    init: function(t) {
                        this.mixIn(t)
                    },
                    toString: function(t) {
                        return (t || this.formatter).stringify(this)
                    }
                }))
                  , m = r.format = {}
                  , b = m.OpenSSL = {
                    stringify: function(t) {
                        var e, r = t.ciphertext, i = t.salt;
                        return e = i ? o.create([1398893684, 1701076831]).concat(i).concat(r) : r,
                        e.toString(u)
                    },
                    parse: function(t) {
                        var e, r = u.parse(t), i = r.words;
                        return 1398893684 == i[0] && 1701076831 == i[1] && (e = o.create(i.slice(2, 4)),
                        i.splice(0, 4),
                        r.sigBytes -= 16),
                        v.create({
                            ciphertext: r,
                            salt: e
                        })
                    }
                }
                  , S = i.SerializableCipher = n.extend({
                    cfg: n.extend({
                        format: b
                    }),
                    encrypt: function(t, e, r, i) {
                        i = this.cfg.extend(i);
                        var n = t.createEncryptor(r, i)
                          , o = n.finalize(e)
                          , a = n.cfg;
                        return v.create({
                            ciphertext: o,
                            key: r,
                            iv: a.iv,
                            algorithm: t,
                            mode: a.mode,
                            padding: a.padding,
                            blockSize: t.blockSize,
                            formatter: i.format
                        })
                    },
                    decrypt: function(t, e, r, i) {
                        return i = this.cfg.extend(i),
                        e = this._parse(e, i.format),
                        t.createDecryptor(r, i).finalize(e.ciphertext)
                    },
                    _parse: function(t, e) {
                        return "string" == typeof t ? e.parse(t, this) : t
                    }
                })
                  , E = r.kdf = {}
                  , T = E.OpenSSL = {
                    execute: function(t, e, r, i) {
                        i || (i = o.random(8));
                        var n = l.create({
                            keySize: e + r
                        }).compute(t, i)
                          , a = o.create(n.words.slice(e), 4 * r);
                        return n.sigBytes = 4 * e,
                        v.create({
                            key: n,
                            iv: a,
                            salt: i
                        })
                    }
                }
                  , _ = i.PasswordBasedCipher = S.extend({
                    cfg: S.cfg.extend({
                        kdf: T
                    }),
                    encrypt: function(t, e, r, i) {
                        i = this.cfg.extend(i);
                        var n = i.kdf.execute(r, t.keySize, t.ivSize);
                        i.iv = n.iv;
                        var o = S.encrypt.call(this, t, e, n.key, i);
                        return o.mixIn(n),
                        o
                    },
                    decrypt: function(t, e, r, i) {
                        i = this.cfg.extend(i),
                        e = this._parse(e, i.format);
                        var n = i.kdf.execute(r, t.keySize, t.ivSize, e.salt);
                        return i.iv = n.iv,
                        S.decrypt.call(this, t, e, n.key, i)
                    }
                })
            }()
        })
    }
    , function(t, e, r) {
        "use strict";
        function i() {}
        function n(t, e) {
            return e = "[" + t + "] > " + e
        }
        function o(t) {
            var e = self.console[t];
            return e ? function() {
                for (var r = arguments.length, i = Array(r), o = 0; o < r; o++)
                    i[o] = arguments[o];
                i[0] && (i[0] = n(t, i[0])),
                e.apply(self.console, i)
            }
            : i
        }
        function a(t) {
            for (var e = arguments.length, r = Array(e > 1 ? e - 1 : 0), i = 1; i < e; i++)
                r[i - 1] = arguments[i];
            r.forEach(function(e) {
                c[e] = t[e] ? t[e].bind(t) : o(e)
            })
        }
        r.d(e, "a", function() {
            return l
        }),
        r.d(e, "b", function() {
            return h
        });
        var s = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        }
        : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        }
          , u = {
            trace: i,
            debug: i,
            log: i,
            warn: i,
            info: i,
            error: i
        }
          , c = u
          , l = function(t) {
            if (!0 === t || "object" === (void 0 === t ? "undefined" : s(t))) {
                a(t, "debug", "log", "info", "warn", "error");
                try {
                    c.log()
                } catch (t) {
                    c = u
                }
            } else
                c = u
        }
          , h = c
    }
    , function(t, e, r) {
        "use strict";
        var i = {
            MEDIA_ATTACHING: "hlsMediaAttaching",
            MEDIA_ATTACHED: "hlsMediaAttached",
            MEDIA_DETACHING: "hlsMediaDetaching",
            MEDIA_DETACHED: "hlsMediaDetached",
            BUFFER_RESET: "hlsBufferReset",
            BUFFER_CODECS: "hlsBufferCodecs",
            BUFFER_CREATED: "hlsBufferCreated",
            BUFFER_APPENDING: "hlsBufferAppending",
            BUFFER_APPENDED: "hlsBufferAppended",
            BUFFER_EOS: "hlsBufferEos",
            BUFFER_FLUSHING: "hlsBufferFlushing",
            BUFFER_FLUSHED: "hlsBufferFlushed",
            MANIFEST_LOADING: "hlsManifestLoading",
            MANIFEST_LOADED: "hlsManifestLoaded",
            MANIFEST_PARSED: "hlsManifestParsed",
            LEVEL_SWITCHING: "hlsLevelSwitching",
            LEVEL_SWITCHED: "hlsLevelSwitched",
            LEVEL_LOADING: "hlsLevelLoading",
            LEVEL_LOADED: "hlsLevelLoaded",
            LEVEL_UPDATED: "hlsLevelUpdated",
            LEVEL_PTS_UPDATED: "hlsLevelPtsUpdated",
            AUDIO_TRACKS_UPDATED: "hlsAudioTracksUpdated",
            AUDIO_TRACK_SWITCHING: "hlsAudioTrackSwitching",
            AUDIO_TRACK_SWITCHED: "hlsAudioTrackSwitched",
            AUDIO_TRACK_LOADING: "hlsAudioTrackLoading",
            AUDIO_TRACK_LOADED: "hlsAudioTrackLoaded",
            SUBTITLE_TRACKS_UPDATED: "hlsSubtitleTracksUpdated",
            SUBTITLE_TRACK_SWITCH: "hlsSubtitleTrackSwitch",
            SUBTITLE_TRACK_LOADING: "hlsSubtitleTrackLoading",
            SUBTITLE_TRACK_LOADED: "hlsSubtitleTrackLoaded",
            SUBTITLE_FRAG_PROCESSED: "hlsSubtitleFragProcessed",
            INIT_PTS_FOUND: "hlsInitPtsFound",
            FRAG_LOADING: "hlsFragLoading",
            FRAG_LOAD_PROGRESS: "hlsFragLoadProgress",
            FRAG_LOAD_EMERGENCY_ABORTED: "hlsFragLoadEmergencyAborted",
            FRAG_LOADED: "hlsFragLoaded",
            FRAG_DECRYPTED: "hlsFragDecrypted",
            FRAG_PARSING_INIT_SEGMENT: "hlsFragParsingInitSegment",
            FRAG_PARSING_USERDATA: "hlsFragParsingUserdata",
            FRAG_PARSING_METADATA: "hlsFragParsingMetadata",
            FRAG_PARSING_DATA: "hlsFragParsingData",
            FRAG_PARSED: "hlsFragParsed",
            FRAG_BUFFERED: "hlsFragBuffered",
            FRAG_CHANGED: "hlsFragChanged",
            FPS_DROP: "hlsFpsDrop",
            FPS_DROP_LEVEL_CAPPING: "hlsFpsDropLevelCapping",
            ERROR: "hlsError",
            DESTROYING: "hlsDestroying",
            KEY_LOADING: "hlsKeyLoading",
            KEY_LOADED: "hlsKeyLoaded",
            STREAM_STATE_TRANSITION: "hlsStreamStateTransition",
            DEFAULT_BANDWIDTH: "hlsDefaultBandWidth"
        };
        e.a = i
    }
    , function(t, e, r) {
        "use strict";
        r.d(e, "b", function() {
            return i
        }),
        r.d(e, "a", function() {
            return n
        });
        var i = {
            NETWORK_ERROR: "networkError",
            MEDIA_ERROR: "mediaError",
            KEY_SYSTEM_ERROR: "keySystemError",
            MUX_ERROR: "muxError",
            OTHER_ERROR: "otherError"
        }
          , n = {
            KEY_SYSTEM_NO_KEYS: "keySystemNoKeys",
            KEY_SYSTEM_NO_ACCESS: "keySystemNoAccess",
            KEY_SYSTEM_NO_SESSION: "keySystemNoSession",
            KEY_SYSTEM_LICENSE_REQUEST_FAILED: "keySystemLicenseRequestFailed",
            MANIFEST_LOAD_ERROR: "manifestLoadError",
            MANIFEST_LOAD_TIMEOUT: "manifestLoadTimeOut",
            MANIFEST_PARSING_ERROR: "manifestParsingError",
            MANIFEST_INCOMPATIBLE_CODECS_ERROR: "manifestIncompatibleCodecsError",
            LEVEL_LOAD_ERROR: "levelLoadError",
            LEVEL_LOAD_TIMEOUT: "levelLoadTimeOut",
            LEVEL_SWITCH_ERROR: "levelSwitchError",
            AUDIO_TRACK_LOAD_ERROR: "audioTrackLoadError",
            AUDIO_TRACK_LOAD_TIMEOUT: "audioTrackLoadTimeOut",
            FRAG_LOAD_ERROR: "fragLoadError",
            FRAG_LOAD_TIMEOUT: "fragLoadTimeOut",
            FRAG_DECRYPT_ERROR: "fragDecryptError",
            FRAG_PARSING_ERROR: "fragParsingError",
            REMUX_ALLOC_ERROR: "remuxAllocError",
            KEY_LOAD_ERROR: "keyLoadError",
            KEY_LOAD_TIMEOUT: "keyLoadTimeOut",
            BUFFER_ADD_CODEC_ERROR: "bufferAddCodecError",
            BUFFER_APPEND_ERROR: "bufferAppendError",
            BUFFER_APPENDING_ERROR: "bufferAppendingError",
            BUFFER_STALLED_ERROR: "bufferStalledError",
            BUFFER_FULL_ERROR: "bufferFullError",
            BUFFER_SEEK_OVER_HOLE: "bufferSeekOverHole",
            BUFFER_NUDGE_ON_STALL: "bufferNudgeOnStall",
            INTERNAL_EXCEPTION: "internalException"
        }
    }
    , function(t, e, r) {
        "use strict";
        function i(t, e) {
            if (!(t instanceof e))
                throw new TypeError("Cannot call a class as a function")
        }
        var n = r(2)
          , o = r(4)
          , a = r(3)
          , s = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        }
        : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        }
          , u = new Set(["hlsEventGeneric", "hlsHandlerDestroying", "hlsHandlerDestroyed"])
          , c = function() {
            function t(e) {
                i(this, t),
                this.hls = e,
                this.onEvent = this.onEvent.bind(this);
                for (var r = arguments.length, n = Array(r > 1 ? r - 1 : 0), o = 1; o < r; o++)
                    n[o - 1] = arguments[o];
                this.handledEvents = n,
                this.useGenericHandler = !0,
                this.registerListeners()
            }
            return t.prototype.destroy = function() {
                this.onHandlerDestroying(),
                this.unregisterListeners(),
                this.onHandlerDestroyed()
            }
            ,
            t.prototype.onHandlerDestroying = function() {}
            ,
            t.prototype.onHandlerDestroyed = function() {}
            ,
            t.prototype.isEventHandler = function() {
                return "object" === s(this.handledEvents) && this.handledEvents.length && "function" == typeof this.onEvent
            }
            ,
            t.prototype.registerListeners = function() {
                this.isEventHandler() && this.handledEvents.forEach(function(t) {
                    if (u.has(t))
                        throw new Error("Forbidden event-name: " + t);
                    this.hls.on(t, this.onEvent)
                }, this)
            }
            ,
            t.prototype.unregisterListeners = function() {
                this.isEventHandler() && this.handledEvents.forEach(function(t) {
                    this.hls.off(t, this.onEvent)
                }, this)
            }
            ,
            // 第一个函数跳转过来
            t.prototype.onEvent = function(t, e) {
                this.onEventGeneric(t, e)
            }
            ,
            t.prototype.onEventGeneric = function(t, e) {
                var r = function(t, e) {
                    // 这里把hls去掉了,并在前面加上了on,this指向observer
                    var r = "on" + t.replace("hls", "");
                    if ("function" != typeof this[r])
                        throw new Error("Event " + t + " has no generic handler in this " + this.constructor.name + " class (tried " + r + ")");
                    return this[r].bind(this, e)
                };
                try {
                    // 相当于调用了observer的对应函数,参数
                    // 第二个call没有提供this指向,严格模式下为undefined
                    r.call(this, t, e).call()
                } catch (e) {
                    n.b.error("An internal error happened while handling event " + t + '. Error message: "' + e.message + '". Here is a stacktrace:', e),
                    this.hls.trigger(a.a.ERROR, {
                        type: o.b.OTHER_ERROR,
                        details: o.a.INTERNAL_EXCEPTION,
                        fatal: !1,
                        event: t,
                        err: e
                    })
                }
            }
            ,
            t
        }();
        e.a = c
    }
    , function(t, e, r) {
        var i, n, o, a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        }
        : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        }
        ;
        !function(s, u, c) {
            "object" === a(e) ? t.exports = e = u(r(0), r(10), r(11)) : (n = [r(0), r(10), r(11)],
            i = u,
            void 0 !== (o = "function" == typeof i ? i.apply(e, n) : i) && (t.exports = o))
        }(0, function(t) {
            return function() {
                var e = t
                  , r = e.lib
                  , i = r.Base
                  , n = r.WordArray
                  , o = e.algo
                  , a = o.MD5
                  , s = o.EvpKDF = i.extend({
                    cfg: i.extend({
                        keySize: 4,
                        hasher: a,
                        iterations: 1
                    }),
                    init: function(t) {
                        this.cfg = this.cfg.extend(t)
                    },
                    compute: function(t, e) {
                        for (var r, i = this.cfg, o = i.hasher.create(), a = n.create(), s = a.words, u = i.keySize, c = i.iterations; s.length < u; ) {
                            r && o.update(r),
                            r = o.update(t).finalize(e),
                            o.reset();
                            for (var l = 1; l < c; l++)
                                r = o.finalize(r),
                                o.reset();
                            a.concat(r)
                        }
                        return a.sigBytes = 4 * u,
                        a
                    }
                });
                e.EvpKDF = function(t, e, r) {
                    return s.create(r).compute(t, e)
                }
            }(),
            t.EvpKDF
        })
    }
    , function(t, e, r) {
        var i, n, o, a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        }
        : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        }
        ;
        !function(s, u) {
            "object" === a(e) ? t.exports = e = u(r(0)) : (n = [r(0)],
            i = u,
            void 0 !== (o = "function" == typeof i ? i.apply(e, n) : i) && (t.exports = o))
        }(0, function(t) {
            return function() {
                function e(t, e, r) {
                    for (var i = [], o = 0, a = 0; a < e; a++)
                        if (a % 4) {
                            var s = r[t.charCodeAt(a - 1)] << a % 4 * 2
                              , u = r[t.charCodeAt(a)] >>> 6 - a % 4 * 2
                              , c = s | u;
                            i[o >>> 2] |= c << 24 - o % 4 * 8,
                            o++
                        }
                    return n.create(i, o)
                }
                var r = t
                  , i = r.lib
                  , n = i.WordArray
                  , o = r.enc;
                o.Base64 = {
                    stringify: function(t) {
                        var e = t.words
                          , r = t.sigBytes
                          , i = this._map;
                        t.clamp();
                        for (var n = [], o = 0; o < r; o += 3)
                            for (var a = e[o >>> 2] >>> 24 - o % 4 * 8 & 255, s = e[o + 1 >>> 2] >>> 24 - (o + 1) % 4 * 8 & 255, u = e[o + 2 >>> 2] >>> 24 - (o + 2) % 4 * 8 & 255, c = a << 16 | s << 8 | u, l = 0; l < 4 && o + .75 * l < r; l++)
                                n.push(i.charAt(c >>> 6 * (3 - l) & 63));
                        var h = i.charAt(64);
                        if (h)
                            for (; n.length % 4; )
                                n.push(h);
                        return n.join("")
                    },
                    parse: function(t) {
                        var r = t.length
                          , i = this._map
                          , n = this._reverseMap;
                        if (!n) {
                            n = this._reverseMap = [];
                            for (var o = 0; o < i.length; o++)
                                n[i.charCodeAt(o)] = o
                        }
                        var a = i.charAt(64);
                        if (a) {
                            var s = t.indexOf(a);
                            -1 !== s && (r = s)
                        }
                        return e(t, r, n)
                    },
                    _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
                }
            }(),
            t.enc.Base64
        })
    }
    , function(t, e, r) {
        var i, n, o, a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        }
        : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        }
        ;
        !function(s, u) {
            "object" === a(e) ? t.exports = e = u(r(0)) : (n = [r(0)],
            i = u,
            void 0 !== (o = "function" == typeof i ? i.apply(e, n) : i) && (t.exports = o))
        }(0, function(t) {
            return function(e) {
                function r(t, e, r, i, n, o, a) {
                    var s = t + (e & r | ~e & i) + n + a;
                    return (s << o | s >>> 32 - o) + e
                }
                function i(t, e, r, i, n, o, a) {
                    var s = t + (e & i | r & ~i) + n + a;
                    return (s << o | s >>> 32 - o) + e
                }
                function n(t, e, r, i, n, o, a) {
                    var s = t + (e ^ r ^ i) + n + a;
                    return (s << o | s >>> 32 - o) + e
                }
                function o(t, e, r, i, n, o, a) {
                    var s = t + (r ^ (e | ~i)) + n + a;
                    return (s << o | s >>> 32 - o) + e
                }
                var a = t
                  , s = a.lib
                  , u = s.WordArray
                  , c = s.Hasher
                  , l = a.algo
                  , h = [];
                !function() {
                    for (var t = 0; t < 64; t++)
                        h[t] = 4294967296 * e.abs(e.sin(t + 1)) | 0
                }();
                var f = l.MD5 = c.extend({
                    _doReset: function() {
                        this._hash = new u.init([1732584193, 4023233417, 2562383102, 271733878])
                    },
                    _doProcessBlock: function(t, e) {
                        for (var a = 0; a < 16; a++) {
                            var s = e + a
                              , u = t[s];
                            t[s] = 16711935 & (u << 8 | u >>> 24) | 4278255360 & (u << 24 | u >>> 8)
                        }
                        var c = this._hash.words
                          , l = t[e + 0]
                          , f = t[e + 1]
                          , d = t[e + 2]
                          , p = t[e + 3]
                          , y = t[e + 4]
                          , g = t[e + 5]
                          , v = t[e + 6]
                          , m = t[e + 7]
                          , b = t[e + 8]
                          , S = t[e + 9]
                          , E = t[e + 10]
                          , T = t[e + 11]
                          , _ = t[e + 12]
                          , w = t[e + 13]
                          , A = t[e + 14]
                          , R = t[e + 15]
                          , D = c[0]
                          , L = c[1]
                          , k = c[2]
                          , O = c[3];
                        D = r(D, L, k, O, l, 7, h[0]),
                        O = r(O, D, L, k, f, 12, h[1]),
                        k = r(k, O, D, L, d, 17, h[2]),
                        L = r(L, k, O, D, p, 22, h[3]),
                        D = r(D, L, k, O, y, 7, h[4]),
                        O = r(O, D, L, k, g, 12, h[5]),
                        k = r(k, O, D, L, v, 17, h[6]),
                        L = r(L, k, O, D, m, 22, h[7]),
                        D = r(D, L, k, O, b, 7, h[8]),
                        O = r(O, D, L, k, S, 12, h[9]),
                        k = r(k, O, D, L, E, 17, h[10]),
                        L = r(L, k, O, D, T, 22, h[11]),
                        D = r(D, L, k, O, _, 7, h[12]),
                        O = r(O, D, L, k, w, 12, h[13]),
                        k = r(k, O, D, L, A, 17, h[14]),
                        L = r(L, k, O, D, R, 22, h[15]),
                        D = i(D, L, k, O, f, 5, h[16]),
                        O = i(O, D, L, k, v, 9, h[17]),
                        k = i(k, O, D, L, T, 14, h[18]),
                        L = i(L, k, O, D, l, 20, h[19]),
                        D = i(D, L, k, O, g, 5, h[20]),
                        O = i(O, D, L, k, E, 9, h[21]),
                        k = i(k, O, D, L, R, 14, h[22]),
                        L = i(L, k, O, D, y, 20, h[23]),
                        D = i(D, L, k, O, S, 5, h[24]),
                        O = i(O, D, L, k, A, 9, h[25]),
                        k = i(k, O, D, L, p, 14, h[26]),
                        L = i(L, k, O, D, b, 20, h[27]),
                        D = i(D, L, k, O, w, 5, h[28]),
                        O = i(O, D, L, k, d, 9, h[29]),
                        k = i(k, O, D, L, m, 14, h[30]),
                        L = i(L, k, O, D, _, 20, h[31]),
                        D = n(D, L, k, O, g, 4, h[32]),
                        O = n(O, D, L, k, b, 11, h[33]),
                        k = n(k, O, D, L, T, 16, h[34]),
                        L = n(L, k, O, D, A, 23, h[35]),
                        D = n(D, L, k, O, f, 4, h[36]),
                        O = n(O, D, L, k, y, 11, h[37]),
                        k = n(k, O, D, L, m, 16, h[38]),
                        L = n(L, k, O, D, E, 23, h[39]),
                        D = n(D, L, k, O, w, 4, h[40]),
                        O = n(O, D, L, k, l, 11, h[41]),
                        k = n(k, O, D, L, p, 16, h[42]),
                        L = n(L, k, O, D, v, 23, h[43]),
                        D = n(D, L, k, O, S, 4, h[44]),
                        O = n(O, D, L, k, _, 11, h[45]),
                        k = n(k, O, D, L, R, 16, h[46]),
                        L = n(L, k, O, D, d, 23, h[47]),
                        D = o(D, L, k, O, l, 6, h[48]),
                        O = o(O, D, L, k, m, 10, h[49]),
                        k = o(k, O, D, L, A, 15, h[50]),
                        L = o(L, k, O, D, g, 21, h[51]),
                        D = o(D, L, k, O, _, 6, h[52]),
                        O = o(O, D, L, k, p, 10, h[53]),
                        k = o(k, O, D, L, E, 15, h[54]),
                        L = o(L, k, O, D, f, 21, h[55]),
                        D = o(D, L, k, O, b, 6, h[56]),
                        O = o(O, D, L, k, R, 10, h[57]),
                        k = o(k, O, D, L, v, 15, h[58]),
                        L = o(L, k, O, D, w, 21, h[59]),
                        D = o(D, L, k, O, y, 6, h[60]),
                        O = o(O, D, L, k, T, 10, h[61]),
                        k = o(k, O, D, L, d, 15, h[62]),
                        L = o(L, k, O, D, S, 21, h[63]),
                        c[0] = c[0] + D | 0,
                        c[1] = c[1] + L | 0,
                        c[2] = c[2] + k | 0,
                        c[3] = c[3] + O | 0
                    },
                    _doFinalize: function() {
                        var t = this._data
                          , r = t.words
                          , i = 8 * this._nDataBytes
                          , n = 8 * t.sigBytes;
                        r[n >>> 5] |= 128 << 24 - n % 32;
                        var o = e.floor(i / 4294967296)
                          , a = i;
                        r[15 + (n + 64 >>> 9 << 4)] = 16711935 & (o << 8 | o >>> 24) | 4278255360 & (o << 24 | o >>> 8),
                        r[14 + (n + 64 >>> 9 << 4)] = 16711935 & (a << 8 | a >>> 24) | 4278255360 & (a << 24 | a >>> 8),
                        t.sigBytes = 4 * (r.length + 1),
                        this._process();
                        for (var s = this._hash, u = s.words, c = 0; c < 4; c++) {
                            var l = u[c];
                            u[c] = 16711935 & (l << 8 | l >>> 24) | 4278255360 & (l << 24 | l >>> 8)
                        }
                        return s
                    },
                    clone: function() {
                        var t = c.clone.call(this);
                        return t._hash = this._hash.clone(),
                        t
                    }
                });
                a.MD5 = c._createHelper(f),
                a.HmacMD5 = c._createHmacHelper(f)
            }(Math),
            t.MD5
        })
    }
    , function(t, e, r) {
        var i, n, o, a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        }
        : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        }
        ;
        !function(s, u) {
            "object" === a(e) ? t.exports = e = u(r(0)) : (n = [r(0)],
            i = u,
            void 0 !== (o = "function" == typeof i ? i.apply(e, n) : i) && (t.exports = o))
        }(0, function(t) {
            return function(e) {
                var r = t
                  , i = r.lib
                  , n = i.Base
                  , o = i.WordArray
                  , a = r.x64 = {};
                a.Word = n.extend({
                    init: function(t, e) {
                        this.high = t,
                        this.low = e
                    }
                }),
                a.WordArray = n.extend({
                    init: function(t, e) {
                        t = this.words = t || [],
                        this.sigBytes = void 0 != e ? e : 8 * t.length
                    },
                    toX32: function() {
                        for (var t = this.words, e = t.length, r = [], i = 0; i < e; i++) {
                            var n = t[i];
                            r.push(n.high),
                            r.push(n.low)
                        }
                        return o.create(r, this.sigBytes)
                    },
                    clone: function() {
                        for (var t = n.clone.call(this), e = t.words = this.words.slice(0), r = e.length, i = 0; i < r; i++)
                            e[i] = e[i].clone();
                        return t
                    }
                })
            }(),
            t
        })
    }
    , function(t, e, r) {
        var i, n, o, a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        }
        : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        }
        ;
        !function(s, u) {
            "object" === a(e) ? t.exports = e = u(r(0)) : (n = [r(0)],
            i = u,
            void 0 !== (o = "function" == typeof i ? i.apply(e, n) : i) && (t.exports = o))
        }(0, function(t) {
            return function() {
                var e = t
                  , r = e.lib
                  , i = r.WordArray
                  , n = r.Hasher
                  , o = e.algo
                  , a = []
                  , s = o.SHA1 = n.extend({
                    _doReset: function() {
                        this._hash = new i.init([1732584193, 4023233417, 2562383102, 271733878, 3285377520])
                    },
                    _doProcessBlock: function(t, e) {
                        for (var r = this._hash.words, i = r[0], n = r[1], o = r[2], s = r[3], u = r[4], c = 0; c < 80; c++) {
                            if (c < 16)
                                a[c] = 0 | t[e + c];
                            else {
                                var l = a[c - 3] ^ a[c - 8] ^ a[c - 14] ^ a[c - 16];
                                a[c] = l << 1 | l >>> 31
                            }
                            var h = (i << 5 | i >>> 27) + u + a[c];
                            h += c < 20 ? 1518500249 + (n & o | ~n & s) : c < 40 ? 1859775393 + (n ^ o ^ s) : c < 60 ? (n & o | n & s | o & s) - 1894007588 : (n ^ o ^ s) - 899497514,
                            u = s,
                            s = o,
                            o = n << 30 | n >>> 2,
                            n = i,
                            i = h
                        }
                        r[0] = r[0] + i | 0,
                        r[1] = r[1] + n | 0,
                        r[2] = r[2] + o | 0,
                        r[3] = r[3] + s | 0,
                        r[4] = r[4] + u | 0
                    },
                    _doFinalize: function() {
                        var t = this._data
                          , e = t.words
                          , r = 8 * this._nDataBytes
                          , i = 8 * t.sigBytes;
                        return e[i >>> 5] |= 128 << 24 - i % 32,
                        e[14 + (i + 64 >>> 9 << 4)] = Math.floor(r / 4294967296),
                        e[15 + (i + 64 >>> 9 << 4)] = r,
                        t.sigBytes = 4 * e.length,
                        this._process(),
                        this._hash
                    },
                    clone: function() {
                        var t = n.clone.call(this);
                        return t._hash = this._hash.clone(),
                        t
                    }
                });
                e.SHA1 = n._createHelper(s),
                e.HmacSHA1 = n._createHmacHelper(s)
            }(),
            t.SHA1
        })
    }
    , function(t, e, r) {
        var i, n, o, a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        }
        : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        }
        ;
        !function(s, u) {
            "object" === a(e) ? t.exports = e = u(r(0)) : (n = [r(0)],
            i = u,
            void 0 !== (o = "function" == typeof i ? i.apply(e, n) : i) && (t.exports = o))
        }(0, function(t) {
            !function() {
                var e = t
                  , r = e.lib
                  , i = r.Base
                  , n = e.enc
                  , o = n.Utf8
                  , a = e.algo;
                a.HMAC = i.extend({
                    init: function(t, e) {
                        t = this._hasher = new t.init,
                        "string" == typeof e && (e = o.parse(e));
                        var r = t.blockSize
                          , i = 4 * r;
                        e.sigBytes > i && (e = t.finalize(e)),
                        e.clamp();
                        for (var n = this._oKey = e.clone(), a = this._iKey = e.clone(), s = n.words, u = a.words, c = 0; c < r; c++)
                            s[c] ^= 1549556828,
                            u[c] ^= 909522486;
                        n.sigBytes = a.sigBytes = i,
                        this.reset()
                    },
                    reset: function() {
                        var t = this._hasher;
                        t.reset(),
                        t.update(this._iKey)
                    },
                    update: function(t) {
                        return this._hasher.update(t),
                        this
                    },
                    finalize: function(t) {
                        var e = this._hasher
                          , r = e.finalize(t);
                        return e.reset(),
                        e.finalize(this._oKey.clone().concat(r))
                    }
                })
            }()
        })
    }
    , function(t, e, r) {
        (function(i) {
            !function(r, i) {
                t.exports = e = i()
            }(0, function() {
                var t = t || function(t, e) {
                    var n;
                    if ("undefined" != typeof window && window.crypto && (n = window.crypto),
                    "undefined" != typeof self && self.crypto && (n = self.crypto),
                    "undefined" != typeof globalThis && globalThis.crypto && (n = globalThis.crypto),
                    !n && "undefined" != typeof window && window.msCrypto && (n = window.msCrypto),
                    !n && void 0 !== i && i.crypto && (n = i.crypto),
                    !n)
                        try {
                            n = r(75)
                        } catch (t) {}
                    var o = function() {
                        if (n) {
                            if ("function" == typeof n.getRandomValues)
                                try {
                                    return n.getRandomValues(new Uint32Array(1))[0]
                                } catch (t) {}
                            if ("function" == typeof n.randomBytes)
                                try {
                                    return n.randomBytes(4).readInt32LE()
                                } catch (t) {}
                        }
                        throw new Error("Native crypto module could not be used to get secure random number.")
                    }
                      , a = Object.create || function() {
                        function t() {}
                        return function(e) {
                            var r;
                            return t.prototype = e,
                            r = new t,
                            t.prototype = null,
                            r
                        }
                    }()
                      , s = {}
                      , u = s.lib = {}
                      , c = u.Base = function() {
                        return {
                            extend: function(t) {
                                var e = a(this);
                                return t && e.mixIn(t),
                                e.hasOwnProperty("init") && this.init !== e.init || (e.init = function() {
                                    e.$super.init.apply(this, arguments)
                                }
                                ),
                                e.init.prototype = e,
                                e.$super = this,
                                e
                            },
                            create: function() {
                                var t = this.extend();
                                return t.init.apply(t, arguments),
                                t
                            },
                            init: function() {},
                            mixIn: function(t) {
                                for (var e in t)
                                    t.hasOwnProperty(e) && (this[e] = t[e]);
                                t.hasOwnProperty("toString") && (this.toString = t.toString)
                            },
                            clone: function() {
                                return this.init.prototype.extend(this)
                            }
                        }
                    }()
                      , l = u.WordArray = c.extend({
                        init: function(t, e) {
                            t = this.words = t || [],
                            this.sigBytes = void 0 != e ? e : 4 * t.length
                        },
                        toString: function(t) {
                            return (t || f).stringify(this)
                        },
                        concat: function(t) {
                            var e = this.words
                              , r = t.words
                              , i = this.sigBytes
                              , n = t.sigBytes;
                            if (this.clamp(),
                            i % 4)
                                for (var o = 0; o < n; o++) {
                                    var a = r[o >>> 2] >>> 24 - o % 4 * 8 & 255;
                                    e[i + o >>> 2] |= a << 24 - (i + o) % 4 * 8
                                }
                            else
                                for (var s = 0; s < n; s += 4)
                                    e[i + s >>> 2] = r[s >>> 2];
                            return this.sigBytes += n,
                            this
                        },
                        clamp: function() {
                            var e = this.words
                              , r = this.sigBytes;
                            e[r >>> 2] &= 4294967295 << 32 - r % 4 * 8,
                            e.length = t.ceil(r / 4)
                        },
                        clone: function() {
                            var t = c.clone.call(this);
                            return t.words = this.words.slice(0),
                            t
                        },
                        random: function(t) {
                            for (var e = [], r = 0; r < t; r += 4)
                                e.push(o());
                            return new l.init(e,t)
                        }
                    })
                      , h = s.enc = {}
                      , f = h.Hex = {
                        stringify: function(t) {
                            for (var e = t.words, r = t.sigBytes, i = [], n = 0; n < r; n++) {
                                var o = e[n >>> 2] >>> 24 - n % 4 * 8 & 255;
                                i.push((o >>> 4).toString(16)),
                                i.push((15 & o).toString(16))
                            }
                            return i.join("")
                        },
                        parse: function(t) {
                            for (var e = t.length, r = [], i = 0; i < e; i += 2)
                                r[i >>> 3] |= parseInt(t.substr(i, 2), 16) << 24 - i % 8 * 4;
                            return new l.init(r,e / 2)
                        }
                    }
                      , d = h.Latin1 = {
                        stringify: function(t) {
                            for (var e = t.words, r = t.sigBytes, i = [], n = 0; n < r; n++) {
                                var o = e[n >>> 2] >>> 24 - n % 4 * 8 & 255;
                                i.push(String.fromCharCode(o))
                            }
                            return i.join("")
                        },
                        parse: function(t) {
                            for (var e = t.length, r = [], i = 0; i < e; i++)
                                r[i >>> 2] |= (255 & t.charCodeAt(i)) << 24 - i % 4 * 8;
                            return new l.init(r,e)
                        }
                    }
                      , p = h.Utf8 = {
                        stringify: function(t) {
                            try {
                                return decodeURIComponent(escape(d.stringify(t)))
                            } catch (t) {
                                throw new Error("Malformed UTF-8 data")
                            }
                        },
                        parse: function(t) {
                            return d.parse(unescape(encodeURIComponent(t)))
                        }
                    }
                      , y = u.BufferedBlockAlgorithm = c.extend({
                        reset: function() {
                            this._data = new l.init,
                            this._nDataBytes = 0
                        },
                        _append: function(t) {
                            "string" == typeof t && (t = p.parse(t)),
                            this._data.concat(t),
                            this._nDataBytes += t.sigBytes
                        },
                        _process: function(e) {
                            var r, i = this._data, n = i.words, o = i.sigBytes, a = this.blockSize, s = 4 * a, u = o / s;
                            u = e ? t.ceil(u) : t.max((0 | u) - this._minBufferSize, 0);
                            var c = u * a
                              , h = t.min(4 * c, o);
                            if (c) {
                                for (var f = 0; f < c; f += a)
                                    this._doProcessBlock(n, f);
                                r = n.splice(0, c),
                                i.sigBytes -= h
                            }
                            return new l.init(r,h)
                        },
                        clone: function() {
                            var t = c.clone.call(this);
                            return t._data = this._data.clone(),
                            t
                        },
                        _minBufferSize: 0
                    })
                      , g = (u.Hasher = y.extend({
                        cfg: c.extend(),
                        init: function(t) {
                            this.cfg = this.cfg.extend(t),
                            this.reset()
                        },
                        reset: function() {
                            y.reset.call(this),
                            this._doReset()
                        },
                        update: function(t) {
                            return this._append(t),
                            this._process(),
                            this
                        },
                        finalize: function(t) {
                            return t && this._append(t),
                            this._doFinalize()
                        },
                        blockSize: 16,
                        _createHelper: function(t) {
                            return function(e, r) {
                                return new t.init(r).finalize(e)
                            }
                        },
                        _createHmacHelper: function(t) {
                            return function(e, r) {
                                return new g.HMAC.init(t,r).finalize(e)
                            }
                        }
                    }),
                    s.algo = {});
                    return s
                }(Math);
                return t
            })
        }
        ).call(e, r(30))
    }
    , function(t, e, r) {
        (function(t) {
            var r, i, n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                return typeof t
            }
            : function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            }
            ;
            !function(o) {
                var a = /^((?:[a-zA-Z0-9+\-.]+:)?)(\/\/[^\/\;?#]*)?(.*?)??(;.*?)?(\?.*?)?(#.*?)?$/
                  , s = /^([^\/;?#]*)(.*)$/
                  , u = /(?:\/|^)\.(?=\/)/g
                  , c = /(?:\/|^)\.\.\/(?!\.\.\/).*?(?=\/)/g
                  , l = {
                    buildAbsoluteURL: function(t, e, r) {
                        if (r = r || {},
                        t = t.trim(),
                        !(e = e.trim())) {
                            if (!r.alwaysNormalize)
                                return t;
                            var i = this.parseURL(t);
                            if (!o)
                                throw new Error("Error trying to parse base URL.");
                            return i.path = l.normalizePath(i.path),
                            l.buildURLFromParts(i)
                        }
                        var n = this.parseURL(e);
                        if (!n)
                            throw new Error("Error trying to parse relative URL.");
                        if (n.scheme)
                            return r.alwaysNormalize ? (n.path = l.normalizePath(n.path),
                            l.buildURLFromParts(n)) : e;
                        var o = this.parseURL(t);
                        if (!o)
                            throw new Error("Error trying to parse base URL.");
                        if (!o.netLoc && o.path && "/" !== o.path[0]) {
                            var a = s.exec(o.path);
                            o.netLoc = a[1],
                            o.path = a[2]
                        }
                        o.netLoc && !o.path && (o.path = "/");
                        var u = {
                            scheme: o.scheme,
                            netLoc: n.netLoc,
                            path: null,
                            params: n.params,
                            query: n.query,
                            fragment: n.fragment
                        };
                        if (!n.netLoc && (u.netLoc = o.netLoc,
                        "/" !== n.path[0]))
                            if (n.path) {
                                var c = o.path
                                  , h = c.substring(0, c.lastIndexOf("/") + 1) + n.path;
                                u.path = l.normalizePath(h)
                            } else
                                u.path = o.path,
                                n.params || (u.params = o.params,
                                n.query || (u.query = o.query));
                        return null === u.path && (u.path = r.alwaysNormalize ? l.normalizePath(n.path) : n.path),
                        l.buildURLFromParts(u)
                    },
                    parseURL: function(t) {
                        var e = a.exec(t);
                        return e ? {
                            scheme: e[1] || "",
                            netLoc: e[2] || "",
                            path: e[3] || "",
                            params: e[4] || "",
                            query: e[5] || "",
                            fragment: e[6] || ""
                        } : null
                    },
                    normalizePath: function(t) {
                        for (t = t.split("").reverse().join("").replace(u, ""); t.length !== (t = t.replace(c, "")).length; )
                            ;
                        return t.split("").reverse().join("")
                    },
                    buildURLFromParts: function(t) {
                        return t.scheme + t.netLoc + t.path + t.params + t.query + t.fragment
                    }
                };
                "object" === n(e) && "object" === n(t) ? t.exports = l : (r = [],
                void 0 !== (i = function() {
                    return l
                }
                .apply(e, r)) && (t.exports = i))
            }()
        }
        ).call(e, r(68)(t))
    }
    , function(t, e, r) {
        var i, n, o, a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        }
        : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        }
        ;
        !function(s, u) {
            "object" === a(e) ? t.exports = e = u(r(0)) : (n = [r(0)],
            i = u,
            void 0 !== (o = "function" == typeof i ? i.apply(e, n) : i) && (t.exports = o))
        }(0, function(t) {
            return function(e) {
                var r = t
                  , i = r.lib
                  , n = i.WordArray
                  , o = i.Hasher
                  , a = r.algo
                  , s = []
                  , u = [];
                !function() {
                    function t(t) {
                        return 4294967296 * (t - (0 | t)) | 0
                    }
                    for (var r = 2, i = 0; i < 64; )
                        (function(t) {
                            for (var r = e.sqrt(t), i = 2; i <= r; i++)
                                if (!(t % i))
                                    return !1;
                            return !0
                        }
                        )(r) && (i < 8 && (s[i] = t(e.pow(r, .5))),
                        u[i] = t(e.pow(r, 1 / 3)),
                        i++),
                        r++
                }();
                var c = []
                  , l = a.SHA256 = o.extend({
                    _doReset: function() {
                        this._hash = new n.init(s.slice(0))
                    },
                    _doProcessBlock: function(t, e) {
                        for (var r = this._hash.words, i = r[0], n = r[1], o = r[2], a = r[3], s = r[4], l = r[5], h = r[6], f = r[7], d = 0; d < 64; d++) {
                            if (d < 16)
                                c[d] = 0 | t[e + d];
                            else {
                                var p = c[d - 15]
                                  , y = (p << 25 | p >>> 7) ^ (p << 14 | p >>> 18) ^ p >>> 3
                                  , g = c[d - 2]
                                  , v = (g << 15 | g >>> 17) ^ (g << 13 | g >>> 19) ^ g >>> 10;
                                c[d] = y + c[d - 7] + v + c[d - 16]
                            }
                            var m = s & l ^ ~s & h
                              , b = i & n ^ i & o ^ n & o
                              , S = (i << 30 | i >>> 2) ^ (i << 19 | i >>> 13) ^ (i << 10 | i >>> 22)
                              , E = (s << 26 | s >>> 6) ^ (s << 21 | s >>> 11) ^ (s << 7 | s >>> 25)
                              , T = f + E + m + u[d] + c[d]
                              , _ = S + b;
                            f = h,
                            h = l,
                            l = s,
                            s = a + T | 0,
                            a = o,
                            o = n,
                            n = i,
                            i = T + _ | 0
                        }
                        r[0] = r[0] + i | 0,
                        r[1] = r[1] + n | 0,
                        r[2] = r[2] + o | 0,
                        r[3] = r[3] + a | 0,
                        r[4] = r[4] + s | 0,
                        r[5] = r[5] + l | 0,
                        r[6] = r[6] + h | 0,
                        r[7] = r[7] + f | 0
                    },
                    _doFinalize: function() {
                        var t = this._data
                          , r = t.words
                          , i = 8 * this._nDataBytes
                          , n = 8 * t.sigBytes;
                        return r[n >>> 5] |= 128 << 24 - n % 32,
                        r[14 + (n + 64 >>> 9 << 4)] = e.floor(i / 4294967296),
                        r[15 + (n + 64 >>> 9 << 4)] = i,
                        t.sigBytes = 4 * r.length,
                        this._process(),
                        this._hash
                    },
                    clone: function() {
                        var t = o.clone.call(this);
                        return t._hash = this._hash.clone(),
                        t
                    }
                });
                r.SHA256 = o._createHelper(l),
                r.HmacSHA256 = o._createHmacHelper(l)
            }(Math),
            t.SHA256
        })
    }
    , function(t, e, r) {
        var i, n, o, a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        }
        : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        }
        ;
        !function(s, u, c) {
            "object" === a(e) ? t.exports = e = u(r(0), r(9)) : (n = [r(0), r(9)],
            i = u,
            void 0 !== (o = "function" == typeof i ? i.apply(e, n) : i) && (t.exports = o))
        }(0, function(t) {
            return function() {
                function e() {
                    return a.create.apply(a, arguments)
                }
                var r = t
                  , i = r.lib
                  , n = i.Hasher
                  , o = r.x64
                  , a = o.Word
                  , s = o.WordArray
                  , u = r.algo
                  , c = [e(1116352408, 3609767458), e(1899447441, 602891725), e(3049323471, 3964484399), e(3921009573, 2173295548), e(961987163, 4081628472), e(1508970993, 3053834265), e(2453635748, 2937671579), e(2870763221, 3664609560), e(3624381080, 2734883394), e(310598401, 1164996542), e(607225278, 1323610764), e(1426881987, 3590304994), e(1925078388, 4068182383), e(2162078206, 991336113), e(2614888103, 633803317), e(3248222580, 3479774868), e(3835390401, 2666613458), e(4022224774, 944711139), e(264347078, 2341262773), e(604807628, 2007800933), e(770255983, 1495990901), e(1249150122, 1856431235), e(1555081692, 3175218132), e(1996064986, 2198950837), e(2554220882, 3999719339), e(2821834349, 766784016), e(2952996808, 2566594879), e(3210313671, 3203337956), e(3336571891, 1034457026), e(3584528711, 2466948901), e(113926993, 3758326383), e(338241895, 168717936), e(666307205, 1188179964), e(773529912, 1546045734), e(1294757372, 1522805485), e(1396182291, 2643833823), e(1695183700, 2343527390), e(1986661051, 1014477480), e(2177026350, 1206759142), e(2456956037, 344077627), e(2730485921, 1290863460), e(2820302411, 3158454273), e(3259730800, 3505952657), e(3345764771, 106217008), e(3516065817, 3606008344), e(3600352804, 1432725776), e(4094571909, 1467031594), e(275423344, 851169720), e(430227734, 3100823752), e(506948616, 1363258195), e(659060556, 3750685593), e(883997877, 3785050280), e(958139571, 3318307427), e(1322822218, 3812723403), e(1537002063, 2003034995), e(1747873779, 3602036899), e(1955562222, 1575990012), e(2024104815, 1125592928), e(2227730452, 2716904306), e(2361852424, 442776044), e(2428436474, 593698344), e(2756734187, 3733110249), e(3204031479, 2999351573), e(3329325298, 3815920427), e(3391569614, 3928383900), e(3515267271, 566280711), e(3940187606, 3454069534), e(4118630271, 4000239992), e(116418474, 1914138554), e(174292421, 2731055270), e(289380356, 3203993006), e(460393269, 320620315), e(685471733, 587496836), e(852142971, 1086792851), e(1017036298, 365543100), e(1126000580, 2618297676), e(1288033470, 3409855158), e(1501505948, 4234509866), e(1607167915, 987167468), e(1816402316, 1246189591)]
                  , l = [];
                !function() {
                    for (var t = 0; t < 80; t++)
                        l[t] = e()
                }();
                var h = u.SHA512 = n.extend({
                    _doReset: function() {
                        this._hash = new s.init([new a.init(1779033703,4089235720), new a.init(3144134277,2227873595), new a.init(1013904242,4271175723), new a.init(2773480762,1595750129), new a.init(1359893119,2917565137), new a.init(2600822924,725511199), new a.init(528734635,4215389547), new a.init(1541459225,327033209)])
                    },
                    _doProcessBlock: function(t, e) {
                        for (var r = this._hash.words, i = r[0], n = r[1], o = r[2], a = r[3], s = r[4], u = r[5], h = r[6], f = r[7], d = i.high, p = i.low, y = n.high, g = n.low, v = o.high, m = o.low, b = a.high, S = a.low, E = s.high, T = s.low, _ = u.high, w = u.low, A = h.high, R = h.low, D = f.high, L = f.low, k = d, O = p, x = y, I = g, C = v, P = m, B = b, M = S, N = E, F = T, U = _, G = w, j = A, H = R, K = D, V = L, z = 0; z < 80; z++) {
                            var q, W, Y = l[z];
                            if (z < 16)
                                W = Y.high = 0 | t[e + 2 * z],
                                q = Y.low = 0 | t[e + 2 * z + 1];
                            else {
                                var X = l[z - 15]
                                  , Z = X.high
                                  , Q = X.low
                                  , $ = (Z >>> 1 | Q << 31) ^ (Z >>> 8 | Q << 24) ^ Z >>> 7
                                  , J = (Q >>> 1 | Z << 31) ^ (Q >>> 8 | Z << 24) ^ (Q >>> 7 | Z << 25)
                                  , tt = l[z - 2]
                                  , et = tt.high
                                  , rt = tt.low
                                  , it = (et >>> 19 | rt << 13) ^ (et << 3 | rt >>> 29) ^ et >>> 6
                                  , nt = (rt >>> 19 | et << 13) ^ (rt << 3 | et >>> 29) ^ (rt >>> 6 | et << 26)
                                  , ot = l[z - 7]
                                  , at = ot.high
                                  , st = ot.low
                                  , ut = l[z - 16]
                                  , ct = ut.high
                                  , lt = ut.low;
                                q = J + st,
                                W = $ + at + (q >>> 0 < J >>> 0 ? 1 : 0),
                                q += nt,
                                W = W + it + (q >>> 0 < nt >>> 0 ? 1 : 0),
                                q += lt,
                                W = W + ct + (q >>> 0 < lt >>> 0 ? 1 : 0),
                                Y.high = W,
                                Y.low = q
                            }
                            var ht = N & U ^ ~N & j
                              , ft = F & G ^ ~F & H
                              , dt = k & x ^ k & C ^ x & C
                              , pt = O & I ^ O & P ^ I & P
                              , yt = (k >>> 28 | O << 4) ^ (k << 30 | O >>> 2) ^ (k << 25 | O >>> 7)
                              , gt = (O >>> 28 | k << 4) ^ (O << 30 | k >>> 2) ^ (O << 25 | k >>> 7)
                              , vt = (N >>> 14 | F << 18) ^ (N >>> 18 | F << 14) ^ (N << 23 | F >>> 9)
                              , mt = (F >>> 14 | N << 18) ^ (F >>> 18 | N << 14) ^ (F << 23 | N >>> 9)
                              , bt = c[z]
                              , St = bt.high
                              , Et = bt.low
                              , Tt = V + mt
                              , _t = K + vt + (Tt >>> 0 < V >>> 0 ? 1 : 0)
                              , Tt = Tt + ft
                              , _t = _t + ht + (Tt >>> 0 < ft >>> 0 ? 1 : 0)
                              , Tt = Tt + Et
                              , _t = _t + St + (Tt >>> 0 < Et >>> 0 ? 1 : 0)
                              , Tt = Tt + q
                              , _t = _t + W + (Tt >>> 0 < q >>> 0 ? 1 : 0)
                              , wt = gt + pt
                              , At = yt + dt + (wt >>> 0 < gt >>> 0 ? 1 : 0);
                            K = j,
                            V = H,
                            j = U,
                            H = G,
                            U = N,
                            G = F,
                            F = M + Tt | 0,
                            N = B + _t + (F >>> 0 < M >>> 0 ? 1 : 0) | 0,
                            B = C,
                            M = P,
                            C = x,
                            P = I,
                            x = k,
                            I = O,
                            O = Tt + wt | 0,
                            k = _t + At + (O >>> 0 < Tt >>> 0 ? 1 : 0) | 0
                        }
                        p = i.low = p + O,
                        i.high = d + k + (p >>> 0 < O >>> 0 ? 1 : 0),
                        g = n.low = g + I,
                        n.high = y + x + (g >>> 0 < I >>> 0 ? 1 : 0),
                        m = o.low = m + P,
                        o.high = v + C + (m >>> 0 < P >>> 0 ? 1 : 0),
                        S = a.low = S + M,
                        a.high = b + B + (S >>> 0 < M >>> 0 ? 1 : 0),
                        T = s.low = T + F,
                        s.high = E + N + (T >>> 0 < F >>> 0 ? 1 : 0),
                        w = u.low = w + G,
                        u.high = _ + U + (w >>> 0 < G >>> 0 ? 1 : 0),
                        R = h.low = R + H,
                        h.high = A + j + (R >>> 0 < H >>> 0 ? 1 : 0),
                        L = f.low = L + V,
                        f.high = D + K + (L >>> 0 < V >>> 0 ? 1 : 0)
                    },
                    _doFinalize: function() {
                        var t = this._data
                          , e = t.words
                          , r = 8 * this._nDataBytes
                          , i = 8 * t.sigBytes;
                        return e[i >>> 5] |= 128 << 24 - i % 32,
                        e[30 + (i + 128 >>> 10 << 5)] = Math.floor(r / 4294967296),
                        e[31 + (i + 128 >>> 10 << 5)] = r,
                        t.sigBytes = 4 * e.length,
                        this._process(),
                        this._hash.toX32()
                    },
                    clone: function() {
                        var t = n.clone.call(this);
                        return t._hash = this._hash.clone(),
                        t
                    },
                    blockSize: 32
                });
                r.SHA512 = n._createHelper(h),
                r.HmacSHA512 = n._createHmacHelper(h)
            }(),
            t.SHA512
        })
    }
    , function(t, e, r) {
        "use strict";
        var i = {
            search: function(t, e) {
                for (var r = 0, i = t.length - 1, n = null, o = null; r <= i; ) {
                    n = (r + i) / 2 | 0,
                    o = t[n];
                    var a = e(o);
                    if (a > 0)
                        r = n + 1;
                    else {
                        if (!(a < 0))
                            return o;
                        i = n - 1
                    }
                }
                return null
            }
        };
        e.a = i
    }
    , function(t, e, r) {
        "use strict";
        function i(t, e) {
            if (!(t instanceof e))
                throw new TypeError("Cannot call a class as a function")
        }
        r.d(e, "b", function() {
            return o
        });
        var n = function() {
            function t() {
                i(this, t)
            }
            return t.isHeader = function(t, e) {
                return e + 10 <= t.length && 73 === t[e] && 68 === t[e + 1] && 51 === t[e + 2] && t[e + 3] < 255 && t[e + 4] < 255 && t[e + 6] < 128 && t[e + 7] < 128 && t[e + 8] < 128 && t[e + 9] < 128
            }
            ,
            t.isFooter = function(t, e) {
                return e + 10 <= t.length && 51 === t[e] && 68 === t[e + 1] && 73 === t[e + 2] && t[e + 3] < 255 && t[e + 4] < 255 && t[e + 6] < 128 && t[e + 7] < 128 && t[e + 8] < 128 && t[e + 9] < 128
            }
            ,
            t.getID3Data = function(e, r) {
                for (var i = r, n = 0; t.isHeader(e, r); ) {
                    n += 10;
                    n += t._readSize(e, r + 6),
                    t.isFooter(e, r + 10) && (n += 10),
                    r += n
                }
                if (n > 0)
                    return e.subarray(i, i + n)
            }
            ,
            t._readSize = function(t, e) {
                var r = 0;
                return r = (127 & t[e]) << 21,
                r |= (127 & t[e + 1]) << 14,
                r |= (127 & t[e + 2]) << 7,
                r |= 127 & t[e + 3]
            }
            ,
            t.getTimeStamp = function(e) {
                for (var r = t.getID3Frames(e), i = 0; i < r.length; i++) {
                    var n = r[i];
                    if (t.isTimeStampFrame(n))
                        return t._readTimeStamp(n)
                }
            }
            ,
            t.isTimeStampFrame = function(t) {
                return t && "PRIV" === t.key && "com.apple.streaming.transportStreamTimestamp" === t.info
            }
            ,
            t._getFrameData = function(e) {
                var r = String.fromCharCode(e[0], e[1], e[2], e[3])
                  , i = t._readSize(e, 4);
                return {
                    type: r,
                    size: i,
                    data: e.subarray(10, 10 + i)
                }
            }
            ,
            t.getID3Frames = function(e) {
                for (var r = 0, i = []; t.isHeader(e, r); ) {
                    var n = t._readSize(e, r + 6);
                    r += 10;
                    for (var o = r + n; r + 8 < o; ) {
                        var a = t._getFrameData(e.subarray(r))
                          , s = t._decodeFrame(a);
                        s && i.push(s),
                        r += a.size + 10
                    }
                    t.isFooter(e, r) && (r += 10)
                }
                return i
            }
            ,
            t._decodeFrame = function(e) {
                return "PRIV" === e.type ? t._decodePrivFrame(e) : "T" === e.type[0] ? t._decodeTextFrame(e) : "W" === e.type[0] ? t._decodeURLFrame(e) : void 0
            }
            ,
            t._readTimeStamp = function(t) {
                if (8 === t.data.byteLength) {
                    var e = new Uint8Array(t.data)
                      , r = 1 & e[3]
                      , i = (e[4] << 23) + (e[5] << 15) + (e[6] << 7) + e[7];
                    return i /= 45,
                    r && (i += 47721858.84),
                    Math.round(i)
                }
            }
            ,
            t._decodePrivFrame = function(e) {
                if (!(e.size < 2)) {
                    var r = t._utf8ArrayToStr(e.data, !0)
                      , i = new Uint8Array(e.data.subarray(r.length + 1));
                    return {
                        key: e.type,
                        info: r,
                        data: i.buffer
                    }
                }
            }
            ,
            t._decodeTextFrame = function(e) {
                if (!(e.size < 2)) {
                    if ("TXXX" === e.type) {
                        var r = 1
                          , i = t._utf8ArrayToStr(e.data.subarray(r));
                        r += i.length + 1;
                        var n = t._utf8ArrayToStr(e.data.subarray(r));
                        return {
                            key: e.type,
                            info: i,
                            data: n
                        }
                    }
                    var o = t._utf8ArrayToStr(e.data.subarray(1));
                    return {
                        key: e.type,
                        data: o
                    }
                }
            }
            ,
            t._decodeURLFrame = function(e) {
                if ("WXXX" === e.type) {
                    if (e.size < 2)
                        return;
                    var r = 1
                      , i = t._utf8ArrayToStr(e.data.subarray(r));
                    r += i.length + 1;
                    var n = t._utf8ArrayToStr(e.data.subarray(r));
                    return {
                        key: e.type,
                        info: i,
                        data: n
                    }
                }
                var o = t._utf8ArrayToStr(e.data);
                return {
                    key: e.type,
                    data: o
                }
            }
            ,
            t._utf8ArrayToStr = function(t) {
                for (var e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1], r = t.length, i = void 0, n = void 0, o = void 0, a = "", s = 0; s < r; ) {
                    if (0 === (i = t[s++]) && e)
                        return a;
                    if (0 !== i && 3 !== i)
                        switch (i >> 4) {
                        case 0:
                        case 1:
                        case 2:
                        case 3:
                        case 4:
                        case 5:
                        case 6:
                        case 7:
                            a += String.fromCharCode(i);
                            break;
                        case 12:
                        case 13:
                            n = t[s++],
                            a += String.fromCharCode((31 & i) << 6 | 63 & n);
                            break;
                        case 14:
                            n = t[s++],
                            o = t[s++],
                            a += String.fromCharCode((15 & i) << 12 | (63 & n) << 6 | (63 & o) << 0)
                        }
                }
                return a
            }
            ,
            t
        }()
          , o = n._utf8ArrayToStr;
        e.a = n
    }
    , function(t, e, r) {
        "use strict";
        function i(t, e) {
            if (!(t instanceof e))
                throw new TypeError("Cannot call a class as a function")
        }
        var n = r(13)
          , o = r.n(n)
          , a = r(28)
          , s = function() {
            function t(t, e) {
                for (var r = 0; r < e.length; r++) {
                    var i = e[r];
                    i.enumerable = i.enumerable || !1,
                    i.configurable = !0,
                    "value"in i && (i.writable = !0),
                    Object.defineProperty(t, i.key, i)
                }
            }
            return function(e, r, i) {
                return r && t(e.prototype, r),
                i && t(e, i),
                e
            }
        }()
          , u = function() {
            function t() {
                var e;
                i(this, t),
                this._url = null,
                this._byteRange = null,
                this._decryptdata = null,
                this.tagList = [],
                this._elementaryStreams = (e = {},
                e[t.ElementaryStreamTypes.AUDIO] = !1,
                e[t.ElementaryStreamTypes.VIDEO] = !1,
                e)
            }
            return t.prototype.addElementaryStream = function(t) {
                this._elementaryStreams[t] = !0
            }
            ,
            t.prototype.hasElementaryStream = function(t) {
                return !0 === this._elementaryStreams[t]
            }
            ,
            t.prototype.createInitializationVector = function(t) {
                for (var e = new Uint8Array(16), r = 12; r < 16; r++)
                    e[r] = t >> 8 * (15 - r) & 255;
                return e
            }
            ,
            t.prototype.fragmentDecryptdataFromLevelkey = function(t, e) {
                var r = t;
                return t && t.method && t.uri && !t.iv && (r = new a.a,
                r.method = t.method,
                r.baseuri = t.baseuri,
                r.reluri = t.reluri,
                r.iv = this.createInitializationVector(e)),
                r
            }
            ,
            s(t, [{
                key: "url",
                get: function() {
                    return !this._url && this.relurl && (this._url = o.a.buildAbsoluteURL(this.baseurl, this.relurl, {
                        alwaysNormalize: !0
                    })),
                    this._url
                },
                set: function(t) {
                    this._url = t
                }
            }, {
                key: "programDateTime",
                get: function() {
                    return !this._programDateTime && this.rawProgramDateTime && (this._programDateTime = new Date(Date.parse(this.rawProgramDateTime))),
                    this._programDateTime
                }
            }, {
                key: "byteRange",
                get: function() {
                    if (!this._byteRange && !this.rawByteRange)
                        return [];
                    if (this._byteRange)
                        return this._byteRange;
                    var t = [];
                    if (this.rawByteRange) {
                        var e = this.rawByteRange.split("@", 2);
                        if (1 === e.length) {
                            var r = this.lastByteRangeEndOffset;
                            t[0] = r || 0
                        } else
                            t[0] = parseInt(e[1]);
                        t[1] = parseInt(e[0]) + t[0],
                        this._byteRange = t
                    }
                    return t
                }
            }, {
                key: "byteRangeStartOffset",
                get: function() {
                    return this.byteRange[0]
                }
            }, {
                key: "byteRangeEndOffset",
                get: function() {
                    return this.byteRange[1]
                }
            }, {
                key: "decryptdata",
                get: function() {
                    return this._decryptdata || (this._decryptdata = this.fragmentDecryptdataFromLevelkey(this.levelkey, this.sn)),
                    this._decryptdata
                }
            }, {
                key: "encrypted",
                get: function() {
                    return !(!this.decryptdata || null === this.decryptdata.uri || null !== this.decryptdata.key)
                }
            }], [{
                key: "ElementaryStreamTypes",
                get: function() {
                    return {
                        AUDIO: "audio",
                        VIDEO: "video"
                    }
                }
            }]),
            t
        }();
        e.a = u
    }
    , function(t, e, r) {
        "use strict";
        function i() {
            return new f(null)
        }
        function n(t, e) {
            return new f(t,e)
        }
        function o(t, e) {
            var r = S[t.charCodeAt(e)];
            return null == r ? -1 : r
        }
        function a(t) {
            var e = i();
            return e.fromInt(t),
            e
        }
        function s(t) {
            var e, r = 1;
            return 0 != (e = t >>> 16) && (t = e,
            r += 16),
            0 != (e = t >> 8) && (t = e,
            r += 8),
            0 != (e = t >> 4) && (t = e,
            r += 4),
            0 != (e = t >> 2) && (t = e,
            r += 2),
            0 != (e = t >> 1) && (t = e,
            r += 1),
            r
        }
        r.d(e, "a", function() {
            return f
        }),
        e.b = i,
        e.c = n;
        var u, c = r(32), l = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997], h = (1 << 26) / l[l.length - 1], f = function() {
            function t(t, e, r) {
                null != t && ("number" == typeof t ? this.fromNumber(t, e, r) : null == e && "string" != typeof t ? this.fromString(t, 256) : this.fromString(t, e))
            }
            return t.prototype.toString = function(t) {
                if (this.s < 0)
                    return "-" + this.negate().toString(t);
                var e;
                if (16 == t)
                    e = 4;
                else if (8 == t)
                    e = 3;
                else if (2 == t)
                    e = 1;
                else if (32 == t)
                    e = 5;
                else {
                    if (4 != t)
                        return this.toRadix(t);
                    e = 2
                }
                var r, i = (1 << e) - 1, n = !1, o = "", a = this.t, s = this.DB - a * this.DB % e;
                if (a-- > 0)
                    for (s < this.DB && (r = this[a] >> s) > 0 && (n = !0,
                    o = Object(c.b)(r)); a >= 0; )
                        s < e ? (r = (this[a] & (1 << s) - 1) << e - s,
                        r |= this[--a] >> (s += this.DB - e)) : (r = this[a] >> (s -= e) & i,
                        s <= 0 && (s += this.DB,
                        --a)),
                        r > 0 && (n = !0),
                        n && (o += Object(c.b)(r));
                return n ? o : "0"
            }
            ,
            t.prototype.negate = function() {
                var e = i();
                return t.ZERO.subTo(this, e),
                e
            }
            ,
            t.prototype.abs = function() {
                return this.s < 0 ? this.negate() : this
            }
            ,
            t.prototype.compareTo = function(t) {
                var e = this.s - t.s;
                if (0 != e)
                    return e;
                var r = this.t;
                if (0 != (e = r - t.t))
                    return this.s < 0 ? -e : e;
                for (; --r >= 0; )
                    if (0 != (e = this[r] - t[r]))
                        return e;
                return 0
            }
            ,
            t.prototype.bitLength = function() {
                return this.t <= 0 ? 0 : this.DB * (this.t - 1) + s(this[this.t - 1] ^ this.s & this.DM)
            }
            ,
            t.prototype.mod = function(e) {
                var r = i();
                return this.abs().divRemTo(e, null, r),
                this.s < 0 && r.compareTo(t.ZERO) > 0 && e.subTo(r, r),
                r
            }
            ,
            t.prototype.modPowInt = function(t, e) {
                var r;
                return r = t < 256 || e.isEven() ? new p(e) : new y(e),
                this.exp(t, r)
            }
            ,
            t.prototype.clone = function() {
                var t = i();
                return this.copyTo(t),
                t
            }
            ,
            t.prototype.intValue = function() {
                if (this.s < 0) {
                    if (1 == this.t)
                        return this[0] - this.DV;
                    if (0 == this.t)
                        return -1
                } else {
                    if (1 == this.t)
                        return this[0];
                    if (0 == this.t)
                        return 0
                }
                return (this[1] & (1 << 32 - this.DB) - 1) << this.DB | this[0]
            }
            ,
            t.prototype.byteValue = function() {
                return 0 == this.t ? this.s : this[0] << 24 >> 24
            }
            ,
            t.prototype.shortValue = function() {
                return 0 == this.t ? this.s : this[0] << 16 >> 16
            }
            ,
            t.prototype.signum = function() {
                return this.s < 0 ? -1 : this.t <= 0 || 1 == this.t && this[0] <= 0 ? 0 : 1
            }
            ,
            t.prototype.toByteArray = function() {
                var t = this.t
                  , e = [];
                e[0] = this.s;
                var r, i = this.DB - t * this.DB % 8, n = 0;
                if (t-- > 0)
                    for (i < this.DB && (r = this[t] >> i) != (this.s & this.DM) >> i && (e[n++] = r | this.s << this.DB - i); t >= 0; )
                        i < 8 ? (r = (this[t] & (1 << i) - 1) << 8 - i,
                        r |= this[--t] >> (i += this.DB - 8)) : (r = this[t] >> (i -= 8) & 255,
                        i <= 0 && (i += this.DB,
                        --t)),
                        0 != (128 & r) && (r |= -256),
                        0 == n && (128 & this.s) != (128 & r) && ++n,
                        (n > 0 || r != this.s) && (e[n++] = r);
                return e
            }
            ,
            t.prototype.equals = function(t) {
                return 0 == this.compareTo(t)
            }
            ,
            t.prototype.min = function(t) {
                return this.compareTo(t) < 0 ? this : t
            }
            ,
            t.prototype.max = function(t) {
                return this.compareTo(t) > 0 ? this : t
            }
            ,
            t.prototype.and = function(t) {
                var e = i();
                return this.bitwiseTo(t, c.d, e),
                e
            }
            ,
            t.prototype.or = function(t) {
                var e = i();
                return this.bitwiseTo(t, c.f, e),
                e
            }
            ,
            t.prototype.xor = function(t) {
                var e = i();
                return this.bitwiseTo(t, c.g, e),
                e
            }
            ,
            t.prototype.andNot = function(t) {
                var e = i();
                return this.bitwiseTo(t, c.e, e),
                e
            }
            ,
            t.prototype.not = function() {
                for (var t = i(), e = 0; e < this.t; ++e)
                    t[e] = this.DM & ~this[e];
                return t.t = this.t,
                t.s = ~this.s,
                t
            }
            ,
            t.prototype.shiftLeft = function(t) {
                var e = i();
                return t < 0 ? this.rShiftTo(-t, e) : this.lShiftTo(t, e),
                e
            }
            ,
            t.prototype.shiftRight = function(t) {
                var e = i();
                return t < 0 ? this.lShiftTo(-t, e) : this.rShiftTo(t, e),
                e
            }
            ,
            t.prototype.getLowestSetBit = function() {
                for (var t = 0; t < this.t; ++t)
                    if (0 != this[t])
                        return t * this.DB + Object(c.c)(this[t]);
                return this.s < 0 ? this.t * this.DB : -1
            }
            ,
            t.prototype.bitCount = function() {
                for (var t = 0, e = this.s & this.DM, r = 0; r < this.t; ++r)
                    t += Object(c.a)(this[r] ^ e);
                return t
            }
            ,
            t.prototype.testBit = function(t) {
                var e = Math.floor(t / this.DB);
                return e >= this.t ? 0 != this.s : 0 != (this[e] & 1 << t % this.DB)
            }
            ,
            t.prototype.setBit = function(t) {
                return this.changeBit(t, c.f)
            }
            ,
            t.prototype.clearBit = function(t) {
                return this.changeBit(t, c.e)
            }
            ,
            t.prototype.flipBit = function(t) {
                return this.changeBit(t, c.g)
            }
            ,
            t.prototype.add = function(t) {
                var e = i();
                return this.addTo(t, e),
                e
            }
            ,
            t.prototype.subtract = function(t) {
                var e = i();
                return this.subTo(t, e),
                e
            }
            ,
            t.prototype.multiply = function(t) {
                var e = i();
                return this.multiplyTo(t, e),
                e
            }
            ,
            t.prototype.divide = function(t) {
                var e = i();
                return this.divRemTo(t, e, null),
                e
            }
            ,
            t.prototype.remainder = function(t) {
                var e = i();
                return this.divRemTo(t, null, e),
                e
            }
            ,
            t.prototype.divideAndRemainder = function(t) {
                var e = i()
                  , r = i();
                return this.divRemTo(t, e, r),
                [e, r]
            }
            ,
            t.prototype.modPow = function(t, e) {
                var r, n, o = t.bitLength(), u = a(1);
                if (o <= 0)
                    return u;
                r = o < 18 ? 1 : o < 48 ? 3 : o < 144 ? 4 : o < 768 ? 5 : 6,
                n = o < 8 ? new p(e) : e.isEven() ? new g(e) : new y(e);
                var c = []
                  , l = 3
                  , h = r - 1
                  , f = (1 << r) - 1;
                if (c[1] = n.convert(this),
                r > 1) {
                    var d = i();
                    for (n.sqrTo(c[1], d); l <= f; )
                        c[l] = i(),
                        n.mulTo(d, c[l - 2], c[l]),
                        l += 2
                }
                var v, m, b = t.t - 1, S = !0, E = i();
                for (o = s(t[b]) - 1; b >= 0; ) {
                    for (o >= h ? v = t[b] >> o - h & f : (v = (t[b] & (1 << o + 1) - 1) << h - o,
                    b > 0 && (v |= t[b - 1] >> this.DB + o - h)),
                    l = r; 0 == (1 & v); )
                        v >>= 1,
                        --l;
                    if ((o -= l) < 0 && (o += this.DB,
                    --b),
                    S)
                        c[v].copyTo(u),
                        S = !1;
                    else {
                        for (; l > 1; )
                            n.sqrTo(u, E),
                            n.sqrTo(E, u),
                            l -= 2;
                        l > 0 ? n.sqrTo(u, E) : (m = u,
                        u = E,
                        E = m),
                        n.mulTo(E, c[v], u)
                    }
                    for (; b >= 0 && 0 == (t[b] & 1 << o); )
                        n.sqrTo(u, E),
                        m = u,
                        u = E,
                        E = m,
                        --o < 0 && (o = this.DB - 1,
                        --b)
                }
                return n.revert(u)
            }
            ,
            t.prototype.modInverse = function(e) {
                var r = e.isEven();
                if (this.isEven() && r || 0 == e.signum())
                    return t.ZERO;
                for (var i = e.clone(), n = this.clone(), o = a(1), s = a(0), u = a(0), c = a(1); 0 != i.signum(); ) {
                    for (; i.isEven(); )
                        i.rShiftTo(1, i),
                        r ? (o.isEven() && s.isEven() || (o.addTo(this, o),
                        s.subTo(e, s)),
                        o.rShiftTo(1, o)) : s.isEven() || s.subTo(e, s),
                        s.rShiftTo(1, s);
                    for (; n.isEven(); )
                        n.rShiftTo(1, n),
                        r ? (u.isEven() && c.isEven() || (u.addTo(this, u),
                        c.subTo(e, c)),
                        u.rShiftTo(1, u)) : c.isEven() || c.subTo(e, c),
                        c.rShiftTo(1, c);
                    i.compareTo(n) >= 0 ? (i.subTo(n, i),
                    r && o.subTo(u, o),
                    s.subTo(c, s)) : (n.subTo(i, n),
                    r && u.subTo(o, u),
                    c.subTo(s, c))
                }
                return 0 != n.compareTo(t.ONE) ? t.ZERO : c.compareTo(e) >= 0 ? c.subtract(e) : c.signum() < 0 ? (c.addTo(e, c),
                c.signum() < 0 ? c.add(e) : c) : c
            }
            ,
            t.prototype.pow = function(t) {
                return this.exp(t, new d)
            }
            ,
            t.prototype.gcd = function(t) {
                var e = this.s < 0 ? this.negate() : this.clone()
                  , r = t.s < 0 ? t.negate() : t.clone();
                if (e.compareTo(r) < 0) {
                    var i = e;
                    e = r,
                    r = i
                }
                var n = e.getLowestSetBit()
                  , o = r.getLowestSetBit();
                if (o < 0)
                    return e;
                for (n < o && (o = n),
                o > 0 && (e.rShiftTo(o, e),
                r.rShiftTo(o, r)); e.signum() > 0; )
                    (n = e.getLowestSetBit()) > 0 && e.rShiftTo(n, e),
                    (n = r.getLowestSetBit()) > 0 && r.rShiftTo(n, r),
                    e.compareTo(r) >= 0 ? (e.subTo(r, e),
                    e.rShiftTo(1, e)) : (r.subTo(e, r),
                    r.rShiftTo(1, r));
                return o > 0 && r.lShiftTo(o, r),
                r
            }
            ,
            t.prototype.isProbablePrime = function(t) {
                var e, r = this.abs();
                if (1 == r.t && r[0] <= l[l.length - 1]) {
                    for (e = 0; e < l.length; ++e)
                        if (r[0] == l[e])
                            return !0;
                    return !1
                }
                if (r.isEven())
                    return !1;
                for (e = 1; e < l.length; ) {
                    for (var i = l[e], n = e + 1; n < l.length && i < h; )
                        i *= l[n++];
                    for (i = r.modInt(i); e < n; )
                        if (i % l[e++] == 0)
                            return !1
                }
                return r.millerRabin(t)
            }
            ,
            t.prototype.copyTo = function(t) {
                for (var e = this.t - 1; e >= 0; --e)
                    t[e] = this[e];
                t.t = this.t,
                t.s = this.s
            }
            ,
            t.prototype.fromInt = function(t) {
                this.t = 1,
                this.s = t < 0 ? -1 : 0,
                t > 0 ? this[0] = t : t < -1 ? this[0] = t + this.DV : this.t = 0
            }
            ,
            t.prototype.fromString = function(e, r) {
                var i;
                if (16 == r)
                    i = 4;
                else if (8 == r)
                    i = 3;
                else if (256 == r)
                    i = 8;
                else if (2 == r)
                    i = 1;
                else if (32 == r)
                    i = 5;
                else {
                    if (4 != r)
                        return void this.fromRadix(e, r);
                    i = 2
                }
                this.t = 0,
                this.s = 0;
                for (var n = e.length, a = !1, s = 0; --n >= 0; ) {
                    var u = 8 == i ? 255 & +e[n] : o(e, n);
                    u < 0 ? "-" == e.charAt(n) && (a = !0) : (a = !1,
                    0 == s ? this[this.t++] = u : s + i > this.DB ? (this[this.t - 1] |= (u & (1 << this.DB - s) - 1) << s,
                    this[this.t++] = u >> this.DB - s) : this[this.t - 1] |= u << s,
                    (s += i) >= this.DB && (s -= this.DB))
                }
                8 == i && 0 != (128 & +e[0]) && (this.s = -1,
                s > 0 && (this[this.t - 1] |= (1 << this.DB - s) - 1 << s)),
                this.clamp(),
                a && t.ZERO.subTo(this, this)
            }
            ,
            t.prototype.clamp = function() {
                for (var t = this.s & this.DM; this.t > 0 && this[this.t - 1] == t; )
                    --this.t
            }
            ,
            t.prototype.dlShiftTo = function(t, e) {
                var r;
                for (r = this.t - 1; r >= 0; --r)
                    e[r + t] = this[r];
                for (r = t - 1; r >= 0; --r)
                    e[r] = 0;
                e.t = this.t + t,
                e.s = this.s
            }
            ,
            t.prototype.drShiftTo = function(t, e) {
                for (var r = t; r < this.t; ++r)
                    e[r - t] = this[r];
                e.t = Math.max(this.t - t, 0),
                e.s = this.s
            }
            ,
            t.prototype.lShiftTo = function(t, e) {
                for (var r = t % this.DB, i = this.DB - r, n = (1 << i) - 1, o = Math.floor(t / this.DB), a = this.s << r & this.DM, s = this.t - 1; s >= 0; --s)
                    e[s + o + 1] = this[s] >> i | a,
                    a = (this[s] & n) << r;
                for (var s = o - 1; s >= 0; --s)
                    e[s] = 0;
                e[o] = a,
                e.t = this.t + o + 1,
                e.s = this.s,
                e.clamp()
            }
            ,
            t.prototype.rShiftTo = function(t, e) {
                e.s = this.s;
                var r = Math.floor(t / this.DB);
                if (r >= this.t)
                    return void (e.t = 0);
                var i = t % this.DB
                  , n = this.DB - i
                  , o = (1 << i) - 1;
                e[0] = this[r] >> i;
                for (var a = r + 1; a < this.t; ++a)
                    e[a - r - 1] |= (this[a] & o) << n,
                    e[a - r] = this[a] >> i;
                i > 0 && (e[this.t - r - 1] |= (this.s & o) << n),
                e.t = this.t - r,
                e.clamp()
            }
            ,
            t.prototype.subTo = function(t, e) {
                for (var r = 0, i = 0, n = Math.min(t.t, this.t); r < n; )
                    i += this[r] - t[r],
                    e[r++] = i & this.DM,
                    i >>= this.DB;
                if (t.t < this.t) {
                    for (i -= t.s; r < this.t; )
                        i += this[r],
                        e[r++] = i & this.DM,
                        i >>= this.DB;
                    i += this.s
                } else {
                    for (i += this.s; r < t.t; )
                        i -= t[r],
                        e[r++] = i & this.DM,
                        i >>= this.DB;
                    i -= t.s
                }
                e.s = i < 0 ? -1 : 0,
                i < -1 ? e[r++] = this.DV + i : i > 0 && (e[r++] = i),
                e.t = r,
                e.clamp()
            }
            ,
            t.prototype.multiplyTo = function(e, r) {
                var i = this.abs()
                  , n = e.abs()
                  , o = i.t;
                for (r.t = o + n.t; --o >= 0; )
                    r[o] = 0;
                for (o = 0; o < n.t; ++o)
                    r[o + i.t] = i.am(0, n[o], r, o, 0, i.t);
                r.s = 0,
                r.clamp(),
                this.s != e.s && t.ZERO.subTo(r, r)
            }
            ,
            t.prototype.squareTo = function(t) {
                for (var e = this.abs(), r = t.t = 2 * e.t; --r >= 0; )
                    t[r] = 0;
                for (r = 0; r < e.t - 1; ++r) {
                    var i = e.am(r, e[r], t, 2 * r, 0, 1);
                    (t[r + e.t] += e.am(r + 1, 2 * e[r], t, 2 * r + 1, i, e.t - r - 1)) >= e.DV && (t[r + e.t] -= e.DV,
                    t[r + e.t + 1] = 1)
                }
                t.t > 0 && (t[t.t - 1] += e.am(r, e[r], t, 2 * r, 0, 1)),
                t.s = 0,
                t.clamp()
            }
            ,
            t.prototype.divRemTo = function(e, r, n) {
                var o = e.abs();
                if (!(o.t <= 0)) {
                    var a = this.abs();
                    if (a.t < o.t)
                        return null != r && r.fromInt(0),
                        void (null != n && this.copyTo(n));
                    null == n && (n = i());
                    var u = i()
                      , c = this.s
                      , l = e.s
                      , h = this.DB - s(o[o.t - 1]);
                    h > 0 ? (o.lShiftTo(h, u),
                    a.lShiftTo(h, n)) : (o.copyTo(u),
                    a.copyTo(n));
                    var f = u.t
                      , d = u[f - 1];
                    if (0 != d) {
                        var p = d * (1 << this.F1) + (f > 1 ? u[f - 2] >> this.F2 : 0)
                          , y = this.FV / p
                          , g = (1 << this.F1) / p
                          , v = 1 << this.F2
                          , m = n.t
                          , b = m - f
                          , S = null == r ? i() : r;
                        for (u.dlShiftTo(b, S),
                        n.compareTo(S) >= 0 && (n[n.t++] = 1,
                        n.subTo(S, n)),
                        t.ONE.dlShiftTo(f, S),
                        S.subTo(u, u); u.t < f; )
                            u[u.t++] = 0;
                        for (; --b >= 0; ) {
                            var E = n[--m] == d ? this.DM : Math.floor(n[m] * y + (n[m - 1] + v) * g);
                            if ((n[m] += u.am(0, E, n, b, 0, f)) < E)
                                for (u.dlShiftTo(b, S),
                                n.subTo(S, n); n[m] < --E; )
                                    n.subTo(S, n)
                        }
                        null != r && (n.drShiftTo(f, r),
                        c != l && t.ZERO.subTo(r, r)),
                        n.t = f,
                        n.clamp(),
                        h > 0 && n.rShiftTo(h, n),
                        c < 0 && t.ZERO.subTo(n, n)
                    }
                }
            }
            ,
            t.prototype.invDigit = function() {
                if (this.t < 1)
                    return 0;
                var t = this[0];
                if (0 == (1 & t))
                    return 0;
                var e = 3 & t;
                return e = e * (2 - (15 & t) * e) & 15,
                e = e * (2 - (255 & t) * e) & 255,
                e = e * (2 - ((65535 & t) * e & 65535)) & 65535,
                e = e * (2 - t * e % this.DV) % this.DV,
                e > 0 ? this.DV - e : -e
            }
            ,
            t.prototype.isEven = function() {
                return 0 == (this.t > 0 ? 1 & this[0] : this.s)
            }
            ,
            t.prototype.exp = function(e, r) {
                if (e > 4294967295 || e < 1)
                    return t.ONE;
                var n = i()
                  , o = i()
                  , a = r.convert(this)
                  , u = s(e) - 1;
                for (a.copyTo(n); --u >= 0; )
                    if (r.sqrTo(n, o),
                    (e & 1 << u) > 0)
                        r.mulTo(o, a, n);
                    else {
                        var c = n;
                        n = o,
                        o = c
                    }
                return r.revert(n)
            }
            ,
            t.prototype.chunkSize = function(t) {
                return Math.floor(Math.LN2 * this.DB / Math.log(t))
            }
            ,
            t.prototype.toRadix = function(t) {
                if (null == t && (t = 10),
                0 == this.signum() || t < 2 || t > 36)
                    return "0";
                var e = this.chunkSize(t)
                  , r = Math.pow(t, e)
                  , n = a(r)
                  , o = i()
                  , s = i()
                  , u = "";
                for (this.divRemTo(n, o, s); o.signum() > 0; )
                    u = (r + s.intValue()).toString(t).substr(1) + u,
                    o.divRemTo(n, o, s);
                return s.intValue().toString(t) + u
            }
            ,
            t.prototype.fromRadix = function(e, r) {
                this.fromInt(0),
                null == r && (r = 10);
                for (var i = this.chunkSize(r), n = Math.pow(r, i), a = !1, s = 0, u = 0, c = 0; c < e.length; ++c) {
                    var l = o(e, c);
                    l < 0 ? "-" == e.charAt(c) && 0 == this.signum() && (a = !0) : (u = r * u + l,
                    ++s >= i && (this.dMultiply(n),
                    this.dAddOffset(u, 0),
                    s = 0,
                    u = 0))
                }
                s > 0 && (this.dMultiply(Math.pow(r, s)),
                this.dAddOffset(u, 0)),
                a && t.ZERO.subTo(this, this)
            }
            ,
            t.prototype.fromNumber = function(e, r, i) {
                if ("number" == typeof r)
                    if (e < 2)
                        this.fromInt(1);
                    else
                        for (this.fromNumber(e, i),
                        this.testBit(e - 1) || this.bitwiseTo(t.ONE.shiftLeft(e - 1), c.f, this),
                        this.isEven() && this.dAddOffset(1, 0); !this.isProbablePrime(r); )
                            this.dAddOffset(2, 0),
                            this.bitLength() > e && this.subTo(t.ONE.shiftLeft(e - 1), this);
                else {
                    var n = []
                      , o = 7 & e;
                    n.length = 1 + (e >> 3),
                    r.nextBytes(n),
                    o > 0 ? n[0] &= (1 << o) - 1 : n[0] = 0,
                    this.fromString(n, 256)
                }
            }
            ,
            t.prototype.bitwiseTo = function(t, e, r) {
                var i, n, o = Math.min(t.t, this.t);
                for (i = 0; i < o; ++i)
                    r[i] = e(this[i], t[i]);
                if (t.t < this.t) {
                    for (n = t.s & this.DM,
                    i = o; i < this.t; ++i)
                        r[i] = e(this[i], n);
                    r.t = this.t
                } else {
                    for (n = this.s & this.DM,
                    i = o; i < t.t; ++i)
                        r[i] = e(n, t[i]);
                    r.t = t.t
                }
                r.s = e(this.s, t.s),
                r.clamp()
            }
            ,
            t.prototype.changeBit = function(e, r) {
                var i = t.ONE.shiftLeft(e);
                return this.bitwiseTo(i, r, i),
                i
            }
            ,
            t.prototype.addTo = function(t, e) {
                for (var r = 0, i = 0, n = Math.min(t.t, this.t); r < n; )
                    i += this[r] + t[r],
                    e[r++] = i & this.DM,
                    i >>= this.DB;
                if (t.t < this.t) {
                    for (i += t.s; r < this.t; )
                        i += this[r],
                        e[r++] = i & this.DM,
                        i >>= this.DB;
                    i += this.s
                } else {
                    for (i += this.s; r < t.t; )
                        i += t[r],
                        e[r++] = i & this.DM,
                        i >>= this.DB;
                    i += t.s
                }
                e.s = i < 0 ? -1 : 0,
                i > 0 ? e[r++] = i : i < -1 && (e[r++] = this.DV + i),
                e.t = r,
                e.clamp()
            }
            ,
            t.prototype.dMultiply = function(t) {
                this[this.t] = this.am(0, t - 1, this, 0, 0, this.t),
                ++this.t,
                this.clamp()
            }
            ,
            t.prototype.dAddOffset = function(t, e) {
                if (0 != t) {
                    for (; this.t <= e; )
                        this[this.t++] = 0;
                    for (this[e] += t; this[e] >= this.DV; )
                        this[e] -= this.DV,
                        ++e >= this.t && (this[this.t++] = 0),
                        ++this[e]
                }
            }
            ,
            t.prototype.multiplyLowerTo = function(t, e, r) {
                var i = Math.min(this.t + t.t, e);
                for (r.s = 0,
                r.t = i; i > 0; )
                    r[--i] = 0;
                for (var n = r.t - this.t; i < n; ++i)
                    r[i + this.t] = this.am(0, t[i], r, i, 0, this.t);
                for (var n = Math.min(t.t, e); i < n; ++i)
                    this.am(0, t[i], r, i, 0, e - i);
                r.clamp()
            }
            ,
            t.prototype.multiplyUpperTo = function(t, e, r) {
                --e;
                var i = r.t = this.t + t.t - e;
                for (r.s = 0; --i >= 0; )
                    r[i] = 0;
                for (i = Math.max(e - this.t, 0); i < t.t; ++i)
                    r[this.t + i - e] = this.am(e - i, t[i], r, 0, 0, this.t + i - e);
                r.clamp(),
                r.drShiftTo(1, r)
            }
            ,
            t.prototype.modInt = function(t) {
                if (t <= 0)
                    return 0;
                var e = this.DV % t
                  , r = this.s < 0 ? t - 1 : 0;
                if (this.t > 0)
                    if (0 == e)
                        r = this[0] % t;
                    else
                        for (var i = this.t - 1; i >= 0; --i)
                            r = (e * r + this[i]) % t;
                return r
            }
            ,
            t.prototype.millerRabin = function(e) {
                var r = this.subtract(t.ONE)
                  , n = r.getLowestSetBit();
                if (n <= 0)
                    return !1;
                var o = r.shiftRight(n);
                (e = e + 1 >> 1) > l.length && (e = l.length);
                for (var a = i(), s = 0; s < e; ++s) {
                    a.fromInt(l[Math.floor(Math.random() * l.length)]);
                    var u = a.modPow(o, this);
                    if (0 != u.compareTo(t.ONE) && 0 != u.compareTo(r)) {
                        for (var c = 1; c++ < n && 0 != u.compareTo(r); )
                            if (u = u.modPowInt(2, this),
                            0 == u.compareTo(t.ONE))
                                return !1;
                        if (0 != u.compareTo(r))
                            return !1
                    }
                }
                return !0
            }
            ,
            t.prototype.square = function() {
                var t = i();
                return this.squareTo(t),
                t
            }
            ,
            t.prototype.gcda = function(t, e) {
                var r = this.s < 0 ? this.negate() : this.clone()
                  , i = t.s < 0 ? t.negate() : t.clone();
                if (r.compareTo(i) < 0) {
                    var n = r;
                    r = i,
                    i = n
                }
                var o = r.getLowestSetBit()
                  , a = i.getLowestSetBit();
                if (a < 0)
                    return void e(r);
                o < a && (a = o),
                a > 0 && (r.rShiftTo(a, r),
                i.rShiftTo(a, i));
                var s = function t() {
                    (o = r.getLowestSetBit()) > 0 && r.rShiftTo(o, r),
                    (o = i.getLowestSetBit()) > 0 && i.rShiftTo(o, i),
                    r.compareTo(i) >= 0 ? (r.subTo(i, r),
                    r.rShiftTo(1, r)) : (i.subTo(r, i),
                    i.rShiftTo(1, i)),
                    r.signum() > 0 ? setTimeout(t, 0) : (a > 0 && i.lShiftTo(a, i),
                    setTimeout(function() {
                        e(i)
                    }, 0))
                };
                setTimeout(s, 10)
            }
            ,
            t.prototype.fromNumberAsync = function(e, r, i, n) {
                if ("number" == typeof r)
                    if (e < 2)
                        this.fromInt(1);
                    else {
                        this.fromNumber(e, i),
                        this.testBit(e - 1) || this.bitwiseTo(t.ONE.shiftLeft(e - 1), c.f, this),
                        this.isEven() && this.dAddOffset(1, 0);
                        var o = this
                          , a = function i() {
                            o.dAddOffset(2, 0),
                            o.bitLength() > e && o.subTo(t.ONE.shiftLeft(e - 1), o),
                            o.isProbablePrime(r) ? setTimeout(function() {
                                n()
                            }, 0) : setTimeout(i, 0)
                        };
                        setTimeout(a, 0)
                    }
                else {
                    var s = []
                      , u = 7 & e;
                    s.length = 1 + (e >> 3),
                    r.nextBytes(s),
                    u > 0 ? s[0] &= (1 << u) - 1 : s[0] = 0,
                    this.fromString(s, 256)
                }
            }
            ,
            t
        }(), d = function() {
            function t() {}
            return t.prototype.convert = function(t) {
                return t
            }
            ,
            t.prototype.revert = function(t) {
                return t
            }
            ,
            t.prototype.mulTo = function(t, e, r) {
                t.multiplyTo(e, r)
            }
            ,
            t.prototype.sqrTo = function(t, e) {
                t.squareTo(e)
            }
            ,
            t
        }(), p = function() {
            function t(t) {
                this.m = t
            }
            return t.prototype.convert = function(t) {
                return t.s < 0 || t.compareTo(this.m) >= 0 ? t.mod(this.m) : t
            }
            ,
            t.prototype.revert = function(t) {
                return t
            }
            ,
            t.prototype.reduce = function(t) {
                t.divRemTo(this.m, null, t)
            }
            ,
            t.prototype.mulTo = function(t, e, r) {
                t.multiplyTo(e, r),
                this.reduce(r)
            }
            ,
            t.prototype.sqrTo = function(t, e) {
                t.squareTo(e),
                this.reduce(e)
            }
            ,
            t
        }(), y = function() {
            function t(t) {
                this.m = t,
                this.mp = t.invDigit(),
                this.mpl = 32767 & this.mp,
                this.mph = this.mp >> 15,
                this.um = (1 << t.DB - 15) - 1,
                this.mt2 = 2 * t.t
            }
            return t.prototype.convert = function(t) {
                var e = i();
                return t.abs().dlShiftTo(this.m.t, e),
                e.divRemTo(this.m, null, e),
                t.s < 0 && e.compareTo(f.ZERO) > 0 && this.m.subTo(e, e),
                e
            }
            ,
            t.prototype.revert = function(t) {
                var e = i();
                return t.copyTo(e),
                this.reduce(e),
                e
            }
            ,
            t.prototype.reduce = function(t) {
                for (; t.t <= this.mt2; )
                    t[t.t++] = 0;
                for (var e = 0; e < this.m.t; ++e) {
                    var r = 32767 & t[e]
                      , i = r * this.mpl + ((r * this.mph + (t[e] >> 15) * this.mpl & this.um) << 15) & t.DM;
                    for (r = e + this.m.t,
                    t[r] += this.m.am(0, i, t, e, 0, this.m.t); t[r] >= t.DV; )
                        t[r] -= t.DV,
                        t[++r]++
                }
                t.clamp(),
                t.drShiftTo(this.m.t, t),
                t.compareTo(this.m) >= 0 && t.subTo(this.m, t)
            }
            ,
            t.prototype.mulTo = function(t, e, r) {
                t.multiplyTo(e, r),
                this.reduce(r)
            }
            ,
            t.prototype.sqrTo = function(t, e) {
                t.squareTo(e),
                this.reduce(e)
            }
            ,
            t
        }(), g = function() {
            function t(t) {
                this.m = t,
                this.r2 = i(),
                this.q3 = i(),
                f.ONE.dlShiftTo(2 * t.t, this.r2),
                this.mu = this.r2.divide(t)
            }
            return t.prototype.convert = function(t) {
                if (t.s < 0 || t.t > 2 * this.m.t)
                    return t.mod(this.m);
                if (t.compareTo(this.m) < 0)
                    return t;
                var e = i();
                return t.copyTo(e),
                this.reduce(e),
                e
            }
            ,
            t.prototype.revert = function(t) {
                return t
            }
            ,
            t.prototype.reduce = function(t) {
                for (t.drShiftTo(this.m.t - 1, this.r2),
                t.t > this.m.t + 1 && (t.t = this.m.t + 1,
                t.clamp()),
                this.mu.multiplyUpperTo(this.r2, this.m.t + 1, this.q3),
                this.m.multiplyLowerTo(this.q3, this.m.t + 1, this.r2); t.compareTo(this.r2) < 0; )
                    t.dAddOffset(1, this.m.t + 1);
                for (t.subTo(this.r2, t); t.compareTo(this.m) >= 0; )
                    t.subTo(this.m, t)
            }
            ,
            t.prototype.mulTo = function(t, e, r) {
                t.multiplyTo(e, r),
                this.reduce(r)
            }
            ,
            t.prototype.sqrTo = function(t, e) {
                t.squareTo(e),
                this.reduce(e)
            }
            ,
            t
        }(), v = "undefined" != typeof navigator;
        v && "Microsoft Internet Explorer" == navigator.appName ? (f.prototype.am = function(t, e, r, i, n, o) {
            for (var a = 32767 & e, s = e >> 15; --o >= 0; ) {
                var u = 32767 & this[t]
                  , c = this[t++] >> 15
                  , l = s * u + c * a;
                u = a * u + ((32767 & l) << 15) + r[i] + (1073741823 & n),
                n = (u >>> 30) + (l >>> 15) + s * c + (n >>> 30),
                r[i++] = 1073741823 & u
            }
            return n
        }
        ,
        u = 30) : v && "Netscape" != navigator.appName ? (f.prototype.am = function(t, e, r, i, n, o) {
            for (; --o >= 0; ) {
                var a = e * this[t++] + r[i] + n;
                n = Math.floor(a / 67108864),
                r[i++] = 67108863 & a
            }
            return n
        }
        ,
        u = 26) : (f.prototype.am = function(t, e, r, i, n, o) {
            for (var a = 16383 & e, s = e >> 14; --o >= 0; ) {
                var u = 16383 & this[t]
                  , c = this[t++] >> 14
                  , l = s * u + c * a;
                u = a * u + ((16383 & l) << 14) + r[i] + n,
                n = (u >> 28) + (l >> 14) + s * c,
                r[i++] = 268435455 & u
            }
            return n
        }
        ,
        u = 28),
        f.prototype.DB = u,
        f.prototype.DM = (1 << u) - 1,
        f.prototype.DV = 1 << u;
        f.prototype.FV = Math.pow(2, 52),
        f.prototype.F1 = 52 - u,
        f.prototype.F2 = 2 * u - 52;
        var m, b, S = [];
        for (m = "0".charCodeAt(0),
        b = 0; b <= 9; ++b)
            S[m++] = b;
        for (m = "a".charCodeAt(0),
        b = 10; b < 36; ++b)
            S[m++] = b;
        for (m = "A".charCodeAt(0),
        b = 10; b < 36; ++b)
            S[m++] = b;
        f.ZERO = a(0),
        f.ONE = a(1)
    }
    , function(t, e, r) {
        "use strict";
        function i(t, e) {
            if (!(t instanceof e))
                throw new TypeError("Cannot call a class as a function")
        }
        function n(t, e) {
            if (!t)
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !e || "object" != typeof e && "function" != typeof e ? t : e
        }
        function o(t, e) {
            if ("function" != typeof e && null !== e)
                throw new TypeError("Super expression must either be null or a function, not " + typeof e);
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }),
            e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }
        r.d(e, "a", function() {
            return u
        }),
        r.d(e, "b", function() {
            return c
        });
        var a = r(5)
          , s = r(3)
          , u = {
            NOT_LOADED: "NOT_LOADED",
            APPENDING: "APPENDING",
            PARTIAL: "PARTIAL",
            OK: "OK"
        }
          , c = function(t) {
            function e(r) {
                i(this, e);
                var o = n(this, t.call(this, r, s.a.BUFFER_APPENDED, s.a.FRAG_BUFFERED, s.a.FRAG_LOADED));
                return o.bufferPadding = .2,
                o.fragments = Object.create(null),
                o.timeRanges = Object.create(null),
                o.config = r.config,
                o
            }
            return o(e, t),
            e.prototype.destroy = function() {
                this.fragments = Object.create(null),
                this.timeRanges = Object.create(null),
                this.config = null,
                a.a.prototype.destroy.call(this),
                t.prototype.destroy.call(this)
            }
            ,
            e.prototype.getBufferedFrag = function(t, e) {
                var r = this.fragments
                  , i = Object.keys(r).filter(function(i) {
                    var n = r[i];
                    if (n.body.type !== e)
                        return !1;
                    if (!n.buffered)
                        return !1;
                    var o = n.body;
                    return o.startPTS <= t && t <= o.endPTS
                });
                if (0 === i.length)
                    return null;
                var n = i.pop();
                return r[n].body
            }
            ,
            e.prototype.detectEvictedFragments = function(t, e) {
                var r = this
                  , i = void 0
                  , n = void 0;
                Object.keys(this.fragments).forEach(function(o) {
                    var a = r.fragments[o];
                    if (!0 === a.buffered) {
                        var s = a.range[t];
                        if (s) {
                            i = s.time;
                            for (var u = 0; u < i.length; u++)
                                if (n = i[u],
                                !1 === r.isTimeBuffered(n.startPTS, n.endPTS, e)) {
                                    r.removeFragment(a.body);
                                    break
                                }
                        }
                    }
                })
            }
            ,
            e.prototype.detectPartialFragments = function(t) {
                var e = this
                  , r = this.getFragmentKey(t)
                  , i = this.fragments[r];
                i && (i.buffered = !0,
                Object.keys(this.timeRanges).forEach(function(r) {
                    if (!0 === t.hasElementaryStream(r)) {
                        var n = e.timeRanges[r];
                        i.range[r] = e.getBufferedTimes(t.startPTS, t.endPTS, n)
                    }
                }))
            }
            ,
            e.prototype.getBufferedTimes = function(t, e, r) {
                for (var i = [], n = void 0, o = void 0, a = !1, s = 0; s < r.length; s++) {
                    if (n = r.start(s) - this.bufferPadding,
                    o = r.end(s) + this.bufferPadding,
                    t >= n && e <= o) {
                        i.push({
                            startPTS: Math.max(t, r.start(s)),
                            endPTS: Math.min(e, r.end(s))
                        });
                        break
                    }
                    if (t < o && e > n)
                        i.push({
                            startPTS: Math.max(t, r.start(s)),
                            endPTS: Math.min(e, r.end(s))
                        }),
                        a = !0;
                    else if (e <= n)
                        break
                }
                return {
                    time: i,
                    partial: a
                }
            }
            ,
            e.prototype.getFragmentKey = function(t) {
                return t.type + "_" + t.level + "_" + t.urlId + "_" + t.sn
            }
            ,
            e.prototype.getPartialFragment = function(t) {
                var e = this
                  , r = void 0
                  , i = void 0
                  , n = void 0
                  , o = null
                  , a = 0;
                return Object.keys(this.fragments).forEach(function(s) {
                    var u = e.fragments[s];
                    e.isPartial(u) && (i = u.body.startPTS - e.bufferPadding,
                    n = u.body.endPTS + e.bufferPadding,
                    t >= i && t <= n && (r = Math.min(t - i, n - t),
                    a <= r && (o = u.body,
                    a = r)))
                }),
                o
            }
            ,
            e.prototype.getState = function(t) {
                var e = this.getFragmentKey(t)
                  , r = this.fragments[e]
                  , i = u.NOT_LOADED;
                return void 0 !== r && (i = r.buffered ? !0 === this.isPartial(r) ? u.PARTIAL : u.OK : u.APPENDING),
                i
            }
            ,
            e.prototype.isPartial = function(t) {
                return !0 === t.buffered && (void 0 !== t.range.video && !0 === t.range.video.partial || void 0 !== t.range.audio && !0 === t.range.audio.partial)
            }
            ,
            e.prototype.isTimeBuffered = function(t, e, r) {
                for (var i = void 0, n = void 0, o = 0; o < r.length; o++) {
                    if (i = r.start(o) - this.bufferPadding,
                    n = r.end(o) + this.bufferPadding,
                    t >= i && e <= n)
                        return !0;
                    if (e <= i)
                        return !1
                }
                return !1
            }
            ,
            // 第三个onFragLoaded 跳转
            e.prototype.onFragLoaded = function(t) {
                var e = t.frag;
                if (!isNaN(e.sn) && !e.bitrateTest) {
                    var r = this.getFragmentKey(e)
                      , i = {
                        body: e,
                        range: Object.create(null),
                        buffered: !1
                    };
                    this.fragments[r] = i
                }
            }
            ,
            e.prototype.onBufferAppended = function(t) {
                var e = this;
                this.timeRanges = t.timeRanges,
                Object.keys(this.timeRanges).forEach(function(t) {
                    var r = e.timeRanges[t];
                    e.detectEvictedFragments(t, r)
                })
            }
            ,
            e.prototype.onFragBuffered = function(t) {
                this.detectPartialFragments(t.frag)
            }
            ,
            e.prototype.hasFragment = function(t) {
                var e = this.getFragmentKey(t);
                return void 0 !== this.fragments[e]
            }
            ,
            e.prototype.removeFragment = function(t) {
                var e = this.getFragmentKey(t);
                delete this.fragments[e]
            }
            ,
            e.prototype.removeAllFragments = function() {
                this.fragments = Object.create(null)
            }
            ,
            e
        }(a.a)
    }
    , function(t, e, r) {
        "use strict";
        function i(t, e) {
            if (!(t instanceof e))
                throw new TypeError("Cannot call a class as a function")
        }
        r.d(e, "a", function() {
            return n
        });
        var n = function() {
            function t() {
                i(this, t)
            }
            return t.isBuffered = function(t, e) {
                try {
                    if (t)
                        for (var r = t.buffered, i = 0; i < r.length; i++)
                            if (e >= r.start(i) && e <= r.end(i))
                                return !0
                } catch (t) {}
                return !1
            }
            ,
            t.bufferInfo = function(t, e, r) {
                try {
                    if (t) {
                        var i = t.buffered
                          , n = []
                          , o = void 0;
                        for (o = 0; o < i.length; o++)
                            n.push({
                                start: i.start(o),
                                end: i.end(o)
                            });
                        return this.bufferedInfo(n, e, r)
                    }
                } catch (t) {}
                return {
                    len: 0,
                    start: e,
                    end: e,
                    nextStart: void 0
                }
            }
            ,
            t.bufferedInfo = function(t, e, r) {
                var i = []
                  , n = void 0
                  , o = void 0
                  , a = void 0
                  , s = void 0
                  , u = void 0;
                for (t.sort(function(t, e) {
                    var r = t.start - e.start;
                    return r || e.end - t.end
                }),
                u = 0; u < t.length; u++) {
                    var c = i.length;
                    if (c) {
                        var l = i[c - 1].end;
                        t[u].start - l < r ? t[u].end > l && (i[c - 1].end = t[u].end) : i.push(t[u])
                    } else
                        i.push(t[u])
                }
                for (u = 0,
                n = 0,
                o = a = e; u < i.length; u++) {
                    var h = i[u].start
                      , f = i[u].end;
                    if (e + r >= h && e < f)
                        o = h,
                        a = f,
                        n = a - e;
                    else if (e + r < h) {
                        s = h;
                        break
                    }
                }
                return {
                    len: n,
                    start: o,
                    end: a,
                    nextStart: s
                }
            }
            ,
            t
        }()
    }
    , function(t, e) {
        function r() {
            this._events = this._events || {},
            this._maxListeners = this._maxListeners || void 0
        }
        function i(t) {
            return "function" == typeof t
        }
        function n(t) {
            return "number" == typeof t
        }
        function o(t) {
            return "object" === (void 0 === t ? "undefined" : s(t)) && null !== t
        }
        function a(t) {
            return void 0 === t
        }
        var s = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        }
        : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        }
        ;
        t.exports = r,
        r.EventEmitter = r,
        r.prototype._events = void 0,
        r.prototype._maxListeners = void 0,
        r.defaultMaxListeners = 10,
        r.prototype.setMaxListeners = function(t) {
            if (!n(t) || t < 0 || isNaN(t))
                throw TypeError("n must be a positive number");
            return this._maxListeners = t,
            this
        }
        ,
        // emit跳转处，t是事件名
        r.prototype.emit = function(t) {
            var e, r, n, s, u, c;
            // _events 是一个对象，记录了各个事件对应的回调函数列表
            if (this._events || (this._events = {}),
            "error" === t && (!this._events.error || o(this._events.error) && !this._events.error.length)) {
                if ((e = arguments[1])instanceof Error)
                    throw e;
                var l = new Error('Uncaught, unspecified "error" event. (' + e + ")");
                throw l.context = e,
                l
            }
            // r是事件对应的值(listener函数列表/listener/空),
            // a函数判断是否为空
            if (r = this._events[t],a(r))
                return !1;
            // i函数判断是否为function
            if (i(r))
                switch (arguments.length) {
                    case 1:
                        r.call(this);
                        break;
                    case 2:
                        r.call(this, arguments[1]);
                        break;
                    case 3:
                        r.call(this, arguments[1], arguments[2]);
                        break;
                    default:
                        s = Array.prototype.slice.call(arguments, 1),
                        r.apply(this, s)
                }
            // o函数判断是否为对象
            else if (o(r))
                // s为arguments去掉首元素的数组
                for (s = Array.prototype.slice.call(arguments, 1),
                // c为r的深拷贝
                c = r.slice(),

                n = c.length,

                u = 0; u < n; u++)
                // 挨个通过obesever调用这些listener
                    c[u].apply(this, s);
            return !0
        }
        ,
        r.prototype.addListener = function(t, e) {
            var n;
            if (!i(e))
                throw TypeError("listener must be a function");
            return this._events || (this._events = {}),
            this._events.newListener && this.emit("newListener", t, i(e.listener) ? e.listener : e),
            this._events[t] ? o(this._events[t]) ? this._events[t].push(e) : this._events[t] = [this._events[t], e] : this._events[t] = e,
            o(this._events[t]) && !this._events[t].warned && (n = a(this._maxListeners) ? r.defaultMaxListeners : this._maxListeners) && n > 0 && this._events[t].length > n && (this._events[t].warned = !0,
            console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.", this._events[t].length),
            "function" == typeof console.trace && console.trace()),
            this
        }
        ,
        r.prototype.on = r.prototype.addListener,
        r.prototype.once = function(t, e) {
            function r() {
                this.removeListener(t, r),
                n || (n = !0,
                e.apply(this, arguments))
            }
            if (!i(e))
                throw TypeError("listener must be a function");
            var n = !1;
            return r.listener = e,
            this.on(t, r),
            this
        }
        ,
        r.prototype.removeListener = function(t, e) {
            var r, n, a, s;
            if (!i(e))
                throw TypeError("listener must be a function");
            if (!this._events || !this._events[t])
                return this;
            if (r = this._events[t],
            a = r.length,
            n = -1,
            r === e || i(r.listener) && r.listener === e)
                delete this._events[t],
                this._events.removeListener && this.emit("removeListener", t, e);
            else if (o(r)) {
                for (s = a; s-- > 0; )
                    if (r[s] === e || r[s].listener && r[s].listener === e) {
                        n = s;
                        break
                    }
                if (n < 0)
                    return this;
                1 === r.length ? (r.length = 0,
                delete this._events[t]) : r.splice(n, 1),
                this._events.removeListener && this.emit("removeListener", t, e)
            }
            return this
        }
        ,
        r.prototype.removeAllListeners = function(t) {
            var e, r;
            if (!this._events)
                return this;
            if (!this._events.removeListener)
                return 0 === arguments.length ? this._events = {} : this._events[t] && delete this._events[t],
                this;
            if (0 === arguments.length) {
                for (e in this._events)
                    "removeListener" !== e && this.removeAllListeners(e);
                return this.removeAllListeners("removeListener"),
                this._events = {},
                this
            }
            if (r = this._events[t],
            i(r))
                this.removeListener(t, r);
            else if (r)
                for (; r.length; )
                    this.removeListener(t, r[r.length - 1]);
            return delete this._events[t],
            this
        }
        ,
        r.prototype.listeners = function(t) {
            return this._events && this._events[t] ? i(this._events[t]) ? [this._events[t]] : this._events[t].slice() : []
        }
        ,
        r.prototype.listenerCount = function(t) {
            if (this._events) {
                var e = this._events[t];
                if (i(e))
                    return 1;
                if (e)
                    return e.length
            }
            return 0
        }
        ,
        r.listenerCount = function(t, e) {
            return t.listenerCount(e)
        }
    }
    , function(t, e, r) {
        "use strict";
        function i(t, e) {
            if (!(t instanceof e))
                throw new TypeError("Cannot call a class as a function")
        }
        var n = r(97)
          , o = r(98)
          , a = r(99)
          , s = r(4)
          , u = r(2)
          , c = function() {
            function t(e, r) {
                var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}
                  , o = n.removePKCS7Padding
                  , a = void 0 === o || o;
                if (i(this, t),
                this.logEnabled = !0,
                this.observer = e,
                this.config = r,
                this.removePKCS7Padding = a,
                a)
                    try {
                        var s = crypto || self.crypto;
                        this.subtle = s.subtle || s.webkitSubtle
                    } catch (t) {}
                this.disableWebCrypto = !this.subtle
            }
            return t.prototype.isSync = function() {
                return this.disableWebCrypto && this.config.enableSoftwareAES
            }
            ,
            t.prototype.decrypt = function(t, e, r, i) {
                var s = this;
                if (this.disableWebCrypto && this.config.enableSoftwareAES) {
                    this.logEnabled && (u.b.log("JS AES decrypt"),
                    this.logEnabled = !1);
                    var c = this.decryptor;
                    c || (this.decryptor = c = new a.a),
                    c.expandKey(e),
                    i(c.decrypt(t, 0, r, this.removePKCS7Padding))
                } else {
                    this.logEnabled && (u.b.log("WebCrypto AES decrypt"),
                    this.logEnabled = !1);
                    var l = this.subtle;
                    this.key !== e && (this.key = e,
                    this.fastAesKey = new o.a(l,e)),
                    this.fastAesKey.expandKey().then(function(o) {
                        new n.a(l,r).decrypt(t, o).catch(function(n) {
                            s.onWebCryptoError(n, t, e, r, i)
                        }).then(function(t) {
                            i(t)
                        })
                    }).catch(function(n) {
                        s.onWebCryptoError(n, t, e, r, i)
                    })
                }
            }
            ,
            t.prototype.onWebCryptoError = function(t, e, r, i, n) {
                this.config.enableSoftwareAES ? (u.b.log("WebCrypto Error, disable WebCrypto API"),
                this.disableWebCrypto = !0,
                this.logEnabled = !0,
                this.decrypt(e, r, i, n)) : (u.b.error("decrypting error : " + t.message),
                this.observer.trigger(Event.ERROR, {
                    type: s.b.MEDIA_ERROR,
                    details: s.a.FRAG_DECRYPT_ERROR,
                    fatal: !0,
                    reason: t.message
                }))
            }
            ,
            t.prototype.destroy = function() {
                var t = this.decryptor;
                t && (t.destroy(),
                this.decryptor = void 0)
            }
            ,
            t
        }();
        e.a = c
    }
    , function(t, e, r) {
        "use strict";
        function i() {
            if ("undefined" != typeof window)
                return window.MediaSource || window.WebKitMediaSource
        }
        e.a = i
    }
    , function(t, e, r) {
        "use strict";
        function i(t, e) {
            if (!(t instanceof e))
                throw new TypeError("Cannot call a class as a function")
        }
        function n(t, e) {
            if (!t)
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !e || "object" != typeof e && "function" != typeof e ? t : e
        }
        function o(t, e) {
            if ("function" != typeof e && null !== e)
                throw new TypeError("Super expression must either be null or a function, not " + typeof e);
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }),
            e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }
        var a = r(5)
          , s = function(t) {
            function e(r) {
                i(this, e);
                for (var o = arguments.length, a = Array(o > 1 ? o - 1 : 0), s = 1; s < o; s++)
                    a[s - 1] = arguments[s];
                var u = n(this, t.call.apply(t, [this, r].concat(a)));
                return u._tickInterval = null,
                u._tickTimer = null,
                u._tickCallCount = 0,
                u._boundTick = u.tick.bind(u),
                u
            }
            return o(e, t),
            e.prototype.onHandlerDestroying = function() {
                this.clearNextTick(),
                this.clearInterval()
            }
            ,
            e.prototype.hasInterval = function() {
                return !!this._tickInterval
            }
            ,
            e.prototype.hasNextTick = function() {
                return !!this._tickTimer
            }
            ,
            e.prototype.setInterval = function(t) {
                function e(e) {
                    return t.apply(this, arguments)
                }
                return e.toString = function() {
                    return t.toString()
                }
                ,
                e
            }(function(t) {
                return !this._tickInterval && (this._tickInterval = setInterval(this._boundTick, t),
                !0)
            }),
            e.prototype.clearInterval = function(t) {
                function e() {
                    return t.apply(this, arguments)
                }
                return e.toString = function() {
                    return t.toString()
                }
                ,
                e
            }(function() {
                return !!this._tickInterval && (clearInterval(this._tickInterval),
                this._tickInterval = null,
                !0)
            }),
            e.prototype.clearNextTick = function() {
                return !!this._tickTimer && (clearTimeout(this._tickTimer),
                this._tickTimer = null,
                !0)
            }
            ,
            e.prototype.tick = function() {
                1 === ++this._tickCallCount && (this.doTick(),
                this._tickCallCount > 1 && (this.clearNextTick(),
                this._tickTimer = setTimeout(this._boundTick, 0)),
                this._tickCallCount = 0)
            }
            ,
            e.prototype.doTick = function() {}
            ,
            e
        }(a.a);
        e.a = s
    }
    , function(t, e, r) {
        "use strict";
        function i(t, e) {
            if (!(t instanceof e))
                throw new TypeError("Cannot call a class as a function")
        }
        function n(t, e) {
            if (!t)
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !e || "object" != typeof e && "function" != typeof e ? t : e
        }
        function o(t, e) {
            if ("function" != typeof e && null !== e)
                throw new TypeError("Super expression must either be null or a function, not " + typeof e);
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }),
            e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }
        var a = r(3)
          , s = r(5)
          , u = r(4)
          , c = r(2)
          , l = r(27)
          , h = r(69)
          , f = function() {
            function t(t, e) {
                for (var r = 0; r < e.length; r++) {
                    var i = e[r];
                    i.enumerable = i.enumerable || !1,
                    i.configurable = !0,
                    "value"in i && (i.writable = !0),
                    Object.defineProperty(t, i.key, i)
                }
            }
            return function(e, r, i) {
                return r && t(e.prototype, r),
                i && t(e, i),
                e
            }
        }()
          , d = {
            MANIFEST: "manifest",
            LEVEL: "level",
            AUDIO_TRACK: "audioTrack",
            SUBTITLE_TRACK: "subtitleTrack"
        }
          , p = {
            MAIN: "main",
            AUDIO: "audio",
            SUBTITLE: "subtitle"
        }
          , y = function(t) {
            function e(r) {
                i(this, e);
                var o = n(this, t.call(this, r, a.a.MANIFEST_LOADING, a.a.LEVEL_LOADING, a.a.AUDIO_TRACK_LOADING, a.a.SUBTITLE_TRACK_LOADING));
                return o.loaders = {},
                o
            }
            return o(e, t),
            e.canHaveQualityLevels = function(t) {
                return t !== d.AUDIO_TRACK && t !== d.SUBTITLE_TRACK
            }
            ,
            e.mapContextToLevelType = function(t) {
                switch (t.type) {
                case d.AUDIO_TRACK:
                    return p.AUDIO;
                case d.SUBTITLE_TRACK:
                    return p.SUBTITLE;
                default:
                    return p.MAIN
                }
            }
            ,
            e.getResponseUrl = function(t, e) {
                var r = t.url;
                return void 0 !== r && 0 !== r.indexOf("data:") || (r = e.url),
                r
            }
            ,
            e.prototype.createInternalLoader = function(t) {
                var e = this.hls.config
                  , r = e.pLoader
                  , i = e.loader
                  , n = r || i
                  , o = new n(e);
                return t.loader = o,
                this.loaders[t.type] = o,
                o
            }
            ,
            e.prototype.getInternalLoader = function(t) {
                return this.loaders[t.type]
            }
            ,
            e.prototype.resetInternalLoader = function(t) {
                this.loaders[t] && delete this.loaders[t]
            }
            ,
            e.prototype.destroyInternalLoaders = function() {
                for (var t in this.loaders) {
                    var e = this.loaders[t];
                    e && e.destroy(),
                    this.resetInternalLoader(t)
                }
            }
            ,
            e.prototype.destroy = function() {
                this.destroyInternalLoaders(),
                t.prototype.destroy.call(this)
            }
            ,
            e.prototype.onManifestLoading = function(t) {
                t && t.url && this.load(t.url, {
                    type: d.MANIFEST
                })
            }
            ,
            e.prototype.onLevelLoading = function(t) {
                this.load(t.url, {
                    type: d.LEVEL,
                    level: t.level,
                    id: t.id
                })
            }
            ,
            e.prototype.onAudioTrackLoading = function(t) {
                this.load(t.url, {
                    type: d.AUDIO_TRACK,
                    id: t.id
                })
            }
            ,
            e.prototype.onSubtitleTrackLoading = function(t) {
                this.load(t.url, {
                    type: d.SUBTITLE_TRACK,
                    id: t.id
                })
            }
            ,
            e.prototype.load = function(t, e) {
                var r = this.hls.config
                  , i = this.getInternalLoader(e);
                if (i) {
                    var n = i.context;
                    if (n && n.url === t)
                        return c.b.trace("playlist request ongoing"),
                        !1;
                    c.b.warn("aborting previous loader for type: " + e.type),
                    i.abort()
                }
                var o = void 0
                  , a = void 0
                  , s = void 0
                  , u = void 0;
                switch (e.type) {
                case d.MANIFEST:
                    o = r.manifestLoadingMaxRetry,
                    a = r.manifestLoadingTimeOut,
                    s = r.manifestLoadingRetryDelay,
                    u = r.manifestLoadingMaxRetryTimeout;
                    break;
                case d.LEVEL:
                    o = 0,
                    a = r.levelLoadingTimeOut;
                    break;
                default:
                    o = r.levelLoadingMaxRetry,
                    a = r.levelLoadingTimeOut,
                    s = r.levelLoadingRetryDelay,
                    u = r.levelLoadingMaxRetryTimeout,
                    c.b.log("Playlist loader for " + e.type + " " + (e.level || e.id))
                }
                i = this.createInternalLoader(e),
                e.url = t,
                e.responseType = e.responseType || "";
                var l = void 0
                  , h = void 0;
                return l = {
                    timeout: a,
                    maxRetry: o,
                    retryDelay: s,
                    maxRetryDelay: u
                },
                h = {
                    onSuccess: this.loadsuccess.bind(this),
                    onError: this.loaderror.bind(this),
                    onTimeout: this.loadtimeout.bind(this)
                },
                i.load(e, l, h),
                !0
            }
            ,
            e.prototype.loadsuccess = function(t, e, r) {
                var i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : null;
                if (r.isSidxRequest)
                    return this._handleSidxRequest(t, r),
                    void this._handlePlaylistLoaded(t, e, r, i);
                this.resetInternalLoader(r.type);
                var n = t.data;
                if (e.tload = performance.now(),
                0 !== n.indexOf("#EXTM3U"))
                    return void this._handleManifestParsingError(t, r, "no EXTM3U delimiter", i);
                n.indexOf("#EXTINF:") > 0 || n.indexOf("#EXT-X-TARGETDURATION:") > 0 ? this._handleTrackOrLevelPlaylist(t, e, r, i) : this._handleMasterPlaylist(t, e, r, i)
            }
            ,
            e.prototype.loaderror = function(t, e) {
                var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null;
                this._handleNetworkError(e, r)
            }
            ,
            e.prototype.loadtimeout = function(t, e) {
                var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null;
                this._handleNetworkError(e, r, !0)
            }
            ,
            e.prototype._handleMasterPlaylist = function(t, r, i, n) {
                var o = this.hls
                  , s = t.data
                  , u = e.getResponseUrl(t, i)
                  , l = h.a.parseMasterPlaylist(s, u);
                if (!l.length)
                    return void this._handleManifestParsingError(t, i, "no level found in manifest", n);
                var f = l.map(function(t) {
                    return {
                        id: t.attrs.AUDIO,
                        codec: t.audioCodec
                    }
                })
                  , d = h.a.parseMasterPlaylistMedia(s, u, "AUDIO", f)
                  , p = h.a.parseMasterPlaylistMedia(s, u, "SUBTITLES");
                if (d.length) {
                    var y = !1;
                    d.forEach(function(t) {
                        t.url || (y = !0)
                    }),
                    !1 === y && l[0].audioCodec && !l[0].attrs.AUDIO && (c.b.log("audio codec signaled in quality level, but no embedded audio track signaled, create one"),
                    d.unshift({
                        type: "main",
                        name: "main"
                    }))
                }
                o.trigger(a.a.MANIFEST_LOADED, {
                    levels: l,
                    audioTracks: d,
                    subtitles: p,
                    url: u,
                    stats: r,
                    networkDetails: n
                })
            }
            ,
            e.prototype._handleTrackOrLevelPlaylist = function(t, r, i, n) {
                var o = this.hls
                  , s = i.id
                  , u = i.level
                  , c = i.type
                  , l = e.getResponseUrl(t, i)
                  , f = isNaN(s) ? 0 : s
                  , p = isNaN(u) ? f : u
                  , y = e.mapContextToLevelType(i)
                  , g = h.a.parseLevelPlaylist(t.data, l, p, y, f);
                if (g.tload = r.tload,
                c === d.MANIFEST) {
                    var v = {
                        url: l,
                        details: g
                    };
                    o.trigger(a.a.MANIFEST_LOADED, {
                        levels: [v],
                        audioTracks: [],
                        url: l,
                        stats: r,
                        networkDetails: n
                    })
                }
                if (r.tparsed = performance.now(),
                g.needSidxRanges) {
                    var m = g.initSegment.url;
                    return void this.load(m, {
                        isSidxRequest: !0,
                        type: c,
                        level: u,
                        levelDetails: g,
                        id: s,
                        rangeStart: 0,
                        rangeEnd: 2048,
                        responseType: "arraybuffer"
                    })
                }
                i.levelDetails = g,
                this._handlePlaylistLoaded(t, r, i, n)
            }
            ,
            e.prototype._handleSidxRequest = function(t, e) {
                var r = l.a.parseSegmentIndex(new Uint8Array(t.data));
                r.references.forEach(function(t, r) {
                    var i = t.info
                      , n = e.levelDetails.fragments[r];
                    0 === n.byteRange.length && (n.rawByteRange = String(1 + i.end - i.start) + "@" + String(i.start))
                }),
                e.levelDetails.initSegment.rawByteRange = String(r.moovEndOffset) + "@0"
            }
            ,
            e.prototype._handleManifestParsingError = function(t, e, r, i) {
                this.hls.trigger(a.a.ERROR, {
                    type: u.b.NETWORK_ERROR,
                    details: u.a.MANIFEST_PARSING_ERROR,
                    fatal: !0,
                    url: t.url,
                    reason: r,
                    networkDetails: i
                })
            }
            ,
            e.prototype._handleNetworkError = function(t, e) {
                var r = arguments.length > 2 && void 0 !== arguments[2] && arguments[2]
                  , i = void 0
                  , n = void 0
                  , o = this.getInternalLoader(t);
                switch (t.type) {
                case d.MANIFEST:
                    i = r ? u.a.MANIFEST_LOAD_TIMEOUT : u.a.MANIFEST_LOAD_ERROR,
                    n = !0;
                    break;
                case d.LEVEL:
                    i = r ? u.a.LEVEL_LOAD_TIMEOUT : u.a.LEVEL_LOAD_ERROR,
                    n = !1;
                    break;
                case d.AUDIO_TRACK:
                    i = r ? u.a.AUDIO_TRACK_LOAD_TIMEOUT : u.a.AUDIO_TRACK_LOAD_ERROR,
                    n = !1;
                    break;
                default:
                    n = !1
                }
                o && (o.abort(),
                this.resetInternalLoader(t.type)),
                this.hls.trigger(a.a.ERROR, {
                    type: u.b.NETWORK_ERROR,
                    details: i,
                    fatal: n,
                    url: o.url,
                    loader: o,
                    context: t,
                    networkDetails: e
                })
            }
            ,
            e.prototype._handlePlaylistLoaded = function(t, r, i, n) {
                var o = i.type
                  , s = i.level
                  , u = i.id
                  , c = i.levelDetails;
                if (!c.targetduration)
                    return void this._handleManifestParsingError(t, i, "invalid target duration", n);
                if (e.canHaveQualityLevels(i.type))
                    this.hls.trigger(a.a.LEVEL_LOADED, {
                        details: c,
                        level: s || 0,
                        id: u || 0,
                        stats: r,
                        networkDetails: n
                    });
                else
                    switch (o) {
                    case d.AUDIO_TRACK:
                        this.hls.trigger(a.a.AUDIO_TRACK_LOADED, {
                            details: c,
                            id: u,
                            stats: r,
                            networkDetails: n
                        });
                        break;
                    case d.SUBTITLE_TRACK:
                        this.hls.trigger(a.a.SUBTITLE_TRACK_LOADED, {
                            details: c,
                            id: u,
                            stats: r,
                            networkDetails: n
                        })
                    }
            }
            ,
            f(e, null, [{
                key: "ContextType",
                get: function() {
                    return d
                }
            }, {
                key: "LevelType",
                get: function() {
                    return p
                }
            }]),
            e
        }(s.a);
        e.a = y
    }
    , function(t, e, r) {
        "use strict";
        function i(t, e) {
            if (!(t instanceof e))
                throw new TypeError("Cannot call a class as a function")
        }
        var n = r(2)
          , o = r(3)
          , a = Math.pow(2, 32) - 1
          , s = function() {
            function t(e, r) {
                i(this, t),
                this.observer = e,
                this.remuxer = r
            }
            return t.prototype.resetTimeStamp = function(t) {
                this.initPTS = t
            }
            ,
            t.prototype.resetInitSegment = function(e, r, i, n) {
                if (e && e.byteLength) {
                    var a = this.initData = t.parseInitSegment(e);
                    null == r && (r = "mp4a.40.5"),
                    null == i && (i = "avc1.42e01e");
                    var s = {};
                    a.audio && a.video ? s.audiovideo = {
                        container: "video/mp4",
                        codec: r + "," + i,
                        initSegment: n ? e : null
                    } : (a.audio && (s.audio = {
                        container: "audio/mp4",
                        codec: r,
                        initSegment: n ? e : null
                    }),
                    a.video && (s.video = {
                        container: "video/mp4",
                        codec: i,
                        initSegment: n ? e : null
                    })),
                    this.observer.trigger(o.a.FRAG_PARSING_INIT_SEGMENT, {
                        tracks: s
                    })
                } else
                    r && (this.audioCodec = r),
                    i && (this.videoCodec = i)
            }
            ,
            t.probe = function(e) {
                return t.findBox({
                    data: e,
                    start: 0,
                    end: Math.min(e.length, 16384)
                }, ["moof"]).length > 0
            }
            ,
            t.bin2str = function(t) {
                return String.fromCharCode.apply(null, t)
            }
            ,
            t.readUint16 = function(t, e) {
                t.data && (e += t.start,
                t = t.data);
                var r = t[e] << 8 | t[e + 1];
                return r < 0 ? 65536 + r : r
            }
            ,
            t.readUint32 = function(t, e) {
                t.data && (e += t.start,
                t = t.data);
                var r = t[e] << 24 | t[e + 1] << 16 | t[e + 2] << 8 | t[e + 3];
                return r < 0 ? 4294967296 + r : r
            }
            ,
            t.writeUint32 = function(t, e, r) {
                t.data && (e += t.start,
                t = t.data),
                t[e] = r >> 24,
                t[e + 1] = r >> 16 & 255,
                t[e + 2] = r >> 8 & 255,
                t[e + 3] = 255 & r
            }
            ,
            t.findBox = function(e, r) {
                var i = []
                  , n = void 0
                  , o = void 0
                  , a = void 0
                  , s = void 0
                  , u = void 0
                  , c = void 0
                  , l = void 0;
                if (e.data ? (c = e.start,
                s = e.end,
                e = e.data) : (c = 0,
                s = e.byteLength),
                !r.length)
                    return null;
                for (n = c; n < s; )
                    o = t.readUint32(e, n),
                    a = t.bin2str(e.subarray(n + 4, n + 8)),
                    l = o > 1 ? n + o : s,
                    a === r[0] && (1 === r.length ? i.push({
                        data: e,
                        start: n + 8,
                        end: l
                    }) : (u = t.findBox({
                        data: e,
                        start: n + 8,
                        end: l
                    }, r.slice(1)),
                    u.length && (i = i.concat(u)))),
                    n = l;
                return i
            }
            ,
            t.parseSegmentIndex = function(e) {
                var r = t.findBox(e, ["moov"])[0]
                  , i = r ? r.end : null
                  , n = 0
                  , o = t.findBox(e, ["sidx"])
                  , a = void 0;
                if (!o || !o[0])
                    return null;
                a = [],
                o = o[0];
                var s = o.data[0];
                n = 0 === s ? 8 : 16;
                var u = t.readUint32(o, n);
                n += 4;
                n += 0 === s ? 8 : 16,
                n += 2;
                var c = o.end + 0
                  , l = t.readUint16(o, n);
                n += 2;
                for (var h = 0; h < l; h++) {
                    var f = n
                      , d = t.readUint32(o, f);
                    f += 4;
                    var p = 2147483647 & d;
                    if (1 === (2147483648 & d) >>> 31)
                        return void console.warn("SIDX has hierarchical references (not supported)");
                    var y = t.readUint32(o, f);
                    f += 4,
                    a.push({
                        referenceSize: p,
                        subsegmentDuration: y,
                        info: {
                            duration: y / u,
                            start: c,
                            end: c + p - 1
                        }
                    }),
                    c += p,
                    f += 4,
                    n = f
                }
                return {
                    earliestPresentationTime: 0,
                    timescale: u,
                    version: s,
                    referencesCount: l,
                    references: a,
                    moovEndOffset: i
                }
            }
            ,
            t.parseInitSegment = function(e) {
                var r = [];
                return t.findBox(e, ["moov", "trak"]).forEach(function(e) {
                    var i = t.findBox(e, ["tkhd"])[0];
                    if (i) {
                        var o = i.data[i.start]
                          , a = 0 === o ? 12 : 20
                          , s = t.readUint32(i, a)
                          , u = t.findBox(e, ["mdia", "mdhd"])[0];
                        if (u) {
                            o = u.data[u.start],
                            a = 0 === o ? 12 : 20;
                            var c = t.readUint32(u, a)
                              , l = t.findBox(e, ["mdia", "hdlr"])[0];
                            if (l) {
                                var h = t.bin2str(l.data.subarray(l.start + 8, l.start + 12))
                                  , f = {
                                    soun: "audio",
                                    vide: "video"
                                }[h];
                                if (f) {
                                    var d = t.findBox(e, ["mdia", "minf", "stbl", "stsd"]);
                                    if (d.length) {
                                        d = d[0];
                                        var p = t.bin2str(d.data.subarray(d.start + 12, d.start + 16));
                                        n.b.log("MP4Demuxer:" + f + ":" + p + " found")
                                    }
                                    r[s] = {
                                        timescale: c,
                                        type: f
                                    },
                                    r[f] = {
                                        timescale: c,
                                        id: s
                                    }
                                }
                            }
                        }
                    }
                }),
                r
            }
            ,
            t.getStartDTS = function(e, r) {
                var i = void 0
                  , n = void 0
                  , o = void 0;
                return i = t.findBox(r, ["moof", "traf"]),
                n = [].concat.apply([], i.map(function(r) {
                    return t.findBox(r, ["tfhd"]).map(function(i) {
                        var n = void 0
                          , o = void 0;
                        return n = t.readUint32(i, 4),
                        o = e[n].timescale || 9e4,
                        t.findBox(r, ["tfdt"]).map(function(e) {
                            var r = void 0
                              , i = void 0;
                            return r = e.data[e.start],
                            i = t.readUint32(e, 4),
                            1 === r && (i *= Math.pow(2, 32),
                            i += t.readUint32(e, 8)),
                            i
                        })[0] / o
                    })
                })),
                o = Math.min.apply(null, n),
                isFinite(o) ? o : 0
            }
            ,
            t.offsetStartDTS = function(e, r, i) {
                t.findBox(r, ["moof", "traf"]).map(function(r) {
                    return t.findBox(r, ["tfhd"]).map(function(n) {
                        var o = t.readUint32(n, 4)
                          , s = e[o].timescale || 9e4;
                        t.findBox(r, ["tfdt"]).map(function(e) {
                            var r = e.data[e.start]
                              , n = t.readUint32(e, 4);
                            if (0 === r)
                                t.writeUint32(e, 4, n - i * s);
                            else {
                                n *= Math.pow(2, 32),
                                n += t.readUint32(e, 8),
                                n -= i * s,
                                n = Math.max(n, 0);
                                var o = Math.floor(n / (a + 1))
                                  , u = Math.floor(n % (a + 1));
                                t.writeUint32(e, 4, o),
                                t.writeUint32(e, 8, u)
                            }
                        })
                    })
                })
            }
            ,
            t.prototype.append = function(e, r, i, n) {
                var a = this.initData;
                a || (this.resetInitSegment(e, this.audioCodec, this.videoCodec, !1),
                a = this.initData);
                var s = void 0
                  , u = this.initPTS;
                if (void 0 === u) {
                    var c = t.getStartDTS(a, e);
                    this.initPTS = u = c - r,
                    this.observer.trigger(o.a.INIT_PTS_FOUND, {
                        initPTS: u
                    })
                }
                t.offsetStartDTS(a, e, u),
                s = t.getStartDTS(a, e),
                this.remuxer.remux(a.audio, a.video, null, null, s, i, n, e)
            }
            ,
            t.prototype.destroy = function() {}
            ,
            t
        }();
        e.a = s
    }
    , function(t, e, r) {
        "use strict";
        function i(t, e) {
            if (!(t instanceof e))
                throw new TypeError("Cannot call a class as a function")
        }
        var n = r(13)
          , o = r.n(n)
          , a = function() {
            function t(t, e) {
                for (var r = 0; r < e.length; r++) {
                    var i = e[r];
                    i.enumerable = i.enumerable || !1,
                    i.configurable = !0,
                    "value"in i && (i.writable = !0),
                    Object.defineProperty(t, i.key, i)
                }
            }
            return function(e, r, i) {
                return r && t(e.prototype, r),
                i && t(e, i),
                e
            }
        }()
          , s = function() {
            function t() {
                i(this, t),
                this.method = null,
                this.key = null,
                this.iv = null,
                this._uri = null
            }
            return a(t, [{
                key: "uri",
                get: function() {
                    return !this._uri && this.reluri && (this._uri = o.a.buildAbsoluteURL(this.baseuri, this.reluri, {
                        alwaysNormalize: !0
                    })),
                    this._uri
                }
            }]),
            t
        }();
        e.a = s
    }
    , function(t, e, r) {
        "use strict";
        function i(t, e) {
            var r = o[e];
            return !!r && !0 === r[t.slice(0, 4)]
        }
        function n(t, e) {
            return MediaSource.isTypeSupported((e || "video") + '/mp4;codecs="' + t + '"')
        }
        r.d(e, "b", function() {
            return i
        }),
        r.d(e, "a", function() {
            return n
        });
        var o = {
            audio: {
                a3ds: !0,
                "ac-3": !0,
                "ac-4": !0,
                alac: !0,
                alaw: !0,
                dra1: !0,
                "dts+": !0,
                "dts-": !0,
                dtsc: !0,
                dtse: !0,
                dtsh: !0,
                "ec-3": !0,
                enca: !0,
                g719: !0,
                g726: !0,
                m4ae: !0,
                mha1: !0,
                mha2: !0,
                mhm1: !0,
                mhm2: !0,
                mlpa: !0,
                mp4a: !0,
                "raw ": !0,
                Opus: !0,
                samr: !0,
                sawb: !0,
                sawp: !0,
                sevc: !0,
                sqcp: !0,
                ssmv: !0,
                twos: !0,
                ulaw: !0
            },
            video: {
                avc1: !0,
                avc2: !0,
                avc3: !0,
                avc4: !0,
                avcp: !0,
                drac: !0,
                dvav: !0,
                dvhe: !0,
                encv: !0,
                hev1: !0,
                hvc1: !0,
                mjp2: !0,
                mp4v: !0,
                mvc1: !0,
                mvc2: !0,
                mvc3: !0,
                mvc4: !0,
                resv: !0,
                rv60: !0,
                s263: !0,
                svc1: !0,
                svc2: !0,
                "vc-1": !0,
                vp08: !0,
                vp09: !0
            }
        }
    }
    , function(t, e) {
        var r, i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        }
        : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        }
        ;
        r = function() {
            return this
        }();
        try {
            r = r || Function("return this")() || (0,
            eval)("this")
        } catch (t) {
            "object" === ("undefined" == typeof window ? "undefined" : i(window)) && (r = window)
        }
        t.exports = r
    }
    , function(t, e, r) {
        "use strict";
        function i(t) {
            var e, r, i = "";
            for (e = 0; e + 3 <= t.length; e += 3)
                r = parseInt(t.substring(e, e + 3), 16),
                i += a.charAt(r >> 6) + a.charAt(63 & r);
            for (e + 1 == t.length ? (r = parseInt(t.substring(e, e + 1), 16),
            i += a.charAt(r << 2)) : e + 2 == t.length && (r = parseInt(t.substring(e, e + 2), 16),
            i += a.charAt(r >> 2) + a.charAt((3 & r) << 4)); (3 & i.length) > 0; )
                i += s;
            return i
        }
        function n(t) {
            var e, r = "", i = 0, n = 0;
            for (e = 0; e < t.length && t.charAt(e) != s; ++e) {
                var u = a.indexOf(t.charAt(e));
                u < 0 || (0 == i ? (r += Object(o.b)(u >> 2),
                n = 3 & u,
                i = 1) : 1 == i ? (r += Object(o.b)(n << 2 | u >> 4),
                n = 15 & u,
                i = 2) : 2 == i ? (r += Object(o.b)(n),
                r += Object(o.b)(u >> 2),
                n = 3 & u,
                i = 3) : (r += Object(o.b)(n << 2 | u >> 4),
                r += Object(o.b)(15 & u),
                i = 0))
            }
            return 1 == i && (r += Object(o.b)(n << 2)),
            r
        }
        e.b = i,
        e.a = n;
        var o = r(32)
          , a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
          , s = "="
    }
    , function(t, e, r) {
        "use strict";
        function i(t) {
            return l.charAt(t)
        }
        function n(t, e) {
            return t & e
        }
        function o(t, e) {
            return t | e
        }
        function a(t, e) {
            return t ^ e
        }
        function s(t, e) {
            return t & ~e
        }
        function u(t) {
            if (0 == t)
                return -1;
            var e = 0;
            return 0 == (65535 & t) && (t >>= 16,
            e += 16),
            0 == (255 & t) && (t >>= 8,
            e += 8),
            0 == (15 & t) && (t >>= 4,
            e += 4),
            0 == (3 & t) && (t >>= 2,
            e += 2),
            0 == (1 & t) && ++e,
            e
        }
        function c(t) {
            for (var e = 0; 0 != t; )
                t &= t - 1,
                ++e;
            return e
        }
        e.b = i,
        e.d = n,
        e.f = o,
        e.g = a,
        e.e = s,
        e.c = u,
        e.a = c;
        var l = "0123456789abcdefghijklmnopqrstuvwxyz"
    }
    , function(t, e, r) {
        var i, n, o, a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        }
        : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        }
        ;
        !function(s, u) {
            "object" === a(e) ? t.exports = e = u(r(0)) : (n = [r(0)],
            i = u,
            void 0 !== (o = "function" == typeof i ? i.apply(e, n) : i) && (t.exports = o))
        }(0, function(t) {
            return function() {
                if ("function" == typeof ArrayBuffer) {
                    var e = t
                      , r = e.lib
                      , i = r.WordArray
                      , n = i.init;
                    (i.init = function(t) {
                        if (t instanceof ArrayBuffer && (t = new Uint8Array(t)),
                        (t instanceof Int8Array || "undefined" != typeof Uint8ClampedArray && t instanceof Uint8ClampedArray || t instanceof Int16Array || t instanceof Uint16Array || t instanceof Int32Array || t instanceof Uint32Array || t instanceof Float32Array || t instanceof Float64Array) && (t = new Uint8Array(t.buffer,t.byteOffset,t.byteLength)),
                        t instanceof Uint8Array) {
                            for (var e = t.byteLength, r = [], i = 0; i < e; i++)
                                r[i >>> 2] |= t[i] << 24 - i % 4 * 8;
                            n.call(this, r, e)
                        } else
                            n.apply(this, arguments)
                    }
                    ).prototype = i
                }
            }(),
            t.lib.WordArray
        })
    }
    , function(t, e, r) {
        var i, n, o, a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        }
        : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        }
        ;
        !function(s, u) {
            "object" === a(e) ? t.exports = e = u(r(0)) : (n = [r(0)],
            i = u,
            void 0 !== (o = "function" == typeof i ? i.apply(e, n) : i) && (t.exports = o))
        }(0, function(t) {
            return function() {
                function e(t) {
                    return t << 8 & 4278255360 | t >>> 8 & 16711935
                }
                var r = t
                  , i = r.lib
                  , n = i.WordArray
                  , o = r.enc;
                o.Utf16 = o.Utf16BE = {
                    stringify: function(t) {
                        for (var e = t.words, r = t.sigBytes, i = [], n = 0; n < r; n += 2) {
                            var o = e[n >>> 2] >>> 16 - n % 4 * 8 & 65535;
                            i.push(String.fromCharCode(o))
                        }
                        return i.join("")
                    },
                    parse: function(t) {
                        for (var e = t.length, r = [], i = 0; i < e; i++)
                            r[i >>> 1] |= t.charCodeAt(i) << 16 - i % 2 * 16;
                        return n.create(r, 2 * e)
                    }
                };
                o.Utf16LE = {
                    stringify: function(t) {
                        for (var r = t.words, i = t.sigBytes, n = [], o = 0; o < i; o += 2) {
                            var a = e(r[o >>> 2] >>> 16 - o % 4 * 8 & 65535);
                            n.push(String.fromCharCode(a))
                        }
                        return n.join("")
                    },
                    parse: function(t) {
                        for (var r = t.length, i = [], o = 0; o < r; o++)
                            i[o >>> 1] |= e(t.charCodeAt(o) << 16 - o % 2 * 16);
                        return n.create(i, 2 * r)
                    }
                }
            }(),
            t.enc.Utf16
        })
    }
    , function(t, e, r) {
        var i, n, o, a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        }
        : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        }
        ;
        !function(s, u) {
            "object" === a(e) ? t.exports = e = u(r(0)) : (n = [r(0)],
            i = u,
            void 0 !== (o = "function" == typeof i ? i.apply(e, n) : i) && (t.exports = o))
        }(0, function(t) {
            return function() {
                function e(t, e, r) {
                    for (var i = [], o = 0, a = 0; a < e; a++)
                        if (a % 4) {
                            var s = r[t.charCodeAt(a - 1)] << a % 4 * 2
                              , u = r[t.charCodeAt(a)] >>> 6 - a % 4 * 2
                              , c = s | u;
                            i[o >>> 2] |= c << 24 - o % 4 * 8,
                            o++
                        }
                    return n.create(i, o)
                }
                var r = t
                  , i = r.lib
                  , n = i.WordArray
                  , o = r.enc;
                o.Base64url = {
                    stringify: function(t) {
                        var e = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1]
                          , r = t.words
                          , i = t.sigBytes
                          , n = e ? this._safe_map : this._map;
                        t.clamp();
                        for (var o = [], a = 0; a < i; a += 3)
                            for (var s = r[a >>> 2] >>> 24 - a % 4 * 8 & 255, u = r[a + 1 >>> 2] >>> 24 - (a + 1) % 4 * 8 & 255, c = r[a + 2 >>> 2] >>> 24 - (a + 2) % 4 * 8 & 255, l = s << 16 | u << 8 | c, h = 0; h < 4 && a + .75 * h < i; h++)
                                o.push(n.charAt(l >>> 6 * (3 - h) & 63));
                        var f = n.charAt(64);
                        if (f)
                            for (; o.length % 4; )
                                o.push(f);
                        return o.join("")
                    },
                    parse: function(t) {
                        var r = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1]
                          , i = t.length
                          , n = r ? this._safe_map : this._map
                          , o = this._reverseMap;
                        if (!o) {
                            o = this._reverseMap = [];
                            for (var a = 0; a < n.length; a++)
                                o[n.charCodeAt(a)] = a
                        }
                        var s = n.charAt(64);
                        if (s) {
                            var u = t.indexOf(s);
                            -1 !== u && (i = u)
                        }
                        return e(t, i, o)
                    },
                    _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
                    _safe_map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"
                }
            }(),
            t.enc.Base64url
        })
    }
    , function(t, e, r) {
        var i, n, o, a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        }
        : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        }
        ;
        !function(s, u, c) {
            "object" === a(e) ? t.exports = e = u(r(0), r(14)) : (n = [r(0), r(14)],
            i = u,
            void 0 !== (o = "function" == typeof i ? i.apply(e, n) : i) && (t.exports = o))
        }(0, function(t) {
            return function() {
                var e = t
                  , r = e.lib
                  , i = r.WordArray
                  , n = e.algo
                  , o = n.SHA256
                  , a = n.SHA224 = o.extend({
                    _doReset: function() {
                        this._hash = new i.init([3238371032, 914150663, 812702999, 4144912697, 4290775857, 1750603025, 1694076839, 3204075428])
                    },
                    _doFinalize: function() {
                        var t = o._doFinalize.call(this);
                        return t.sigBytes -= 4,
                        t
                    }
                });
                e.SHA224 = o._createHelper(a),
                e.HmacSHA224 = o._createHmacHelper(a)
            }(),
            t.SHA224
        })
    }
    , function(t, e, r) {
        var i, n, o, a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        }
        : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        }
        ;
        !function(s, u, c) {
            "object" === a(e) ? t.exports = e = u(r(0), r(9), r(15)) : (n = [r(0), r(9), r(15)],
            i = u,
            void 0 !== (o = "function" == typeof i ? i.apply(e, n) : i) && (t.exports = o))
        }(0, function(t) {
            return function() {
                var e = t
                  , r = e.x64
                  , i = r.Word
                  , n = r.WordArray
                  , o = e.algo
                  , a = o.SHA512
                  , s = o.SHA384 = a.extend({
                    _doReset: function() {
                        this._hash = new n.init([new i.init(3418070365,3238371032), new i.init(1654270250,914150663), new i.init(2438529370,812702999), new i.init(355462360,4144912697), new i.init(1731405415,4290775857), new i.init(2394180231,1750603025), new i.init(3675008525,1694076839), new i.init(1203062813,3204075428)])
                    },
                    _doFinalize: function() {
                        var t = a._doFinalize.call(this);
                        return t.sigBytes -= 16,
                        t
                    }
                });
                e.SHA384 = a._createHelper(s),
                e.HmacSHA384 = a._createHmacHelper(s)
            }(),
            t.SHA384
        })
    }
    , function(t, e, r) {
        var i, n, o, a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        }
        : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        }
        ;
        !function(s, u, c) {
            "object" === a(e) ? t.exports = e = u(r(0), r(9)) : (n = [r(0), r(9)],
            i = u,
            void 0 !== (o = "function" == typeof i ? i.apply(e, n) : i) && (t.exports = o))
        }(0, function(t) {
            return function(e) {
                var r = t
                  , i = r.lib
                  , n = i.WordArray
                  , o = i.Hasher
                  , a = r.x64
                  , s = a.Word
                  , u = r.algo
                  , c = []
                  , l = []
                  , h = [];
                !function() {
                    for (var t = 1, e = 0, r = 0; r < 24; r++) {
                        c[t + 5 * e] = (r + 1) * (r + 2) / 2 % 64;
                        var i = e % 5
                          , n = (2 * t + 3 * e) % 5;
                        t = i,
                        e = n
                    }
                    for (var t = 0; t < 5; t++)
                        for (var e = 0; e < 5; e++)
                            l[t + 5 * e] = e + (2 * t + 3 * e) % 5 * 5;
                    for (var o = 1, a = 0; a < 24; a++) {
                        for (var u = 0, f = 0, d = 0; d < 7; d++) {
                            if (1 & o) {
                                var p = (1 << d) - 1;
                                p < 32 ? f ^= 1 << p : u ^= 1 << p - 32
                            }
                            128 & o ? o = o << 1 ^ 113 : o <<= 1
                        }
                        h[a] = s.create(u, f)
                    }
                }();
                var f = [];
                !function() {
                    for (var t = 0; t < 25; t++)
                        f[t] = s.create()
                }();
                var d = u.SHA3 = o.extend({
                    cfg: o.cfg.extend({
                        outputLength: 512
                    }),
                    _doReset: function() {
                        for (var t = this._state = [], e = 0; e < 25; e++)
                            t[e] = new s.init;
                        this.blockSize = (1600 - 2 * this.cfg.outputLength) / 32
                    },
                    _doProcessBlock: function(t, e) {
                        for (var r = this._state, i = this.blockSize / 2, n = 0; n < i; n++) {
                            var o = t[e + 2 * n]
                              , a = t[e + 2 * n + 1];
                            o = 16711935 & (o << 8 | o >>> 24) | 4278255360 & (o << 24 | o >>> 8),
                            a = 16711935 & (a << 8 | a >>> 24) | 4278255360 & (a << 24 | a >>> 8);
                            var s = r[n];
                            s.high ^= a,
                            s.low ^= o
                        }
                        for (var u = 0; u < 24; u++) {
                            for (var d = 0; d < 5; d++) {
                                for (var p = 0, y = 0, g = 0; g < 5; g++) {
                                    var s = r[d + 5 * g];
                                    p ^= s.high,
                                    y ^= s.low
                                }
                                var v = f[d];
                                v.high = p,
                                v.low = y
                            }
                            for (var d = 0; d < 5; d++)
                                for (var m = f[(d + 4) % 5], b = f[(d + 1) % 5], S = b.high, E = b.low, p = m.high ^ (S << 1 | E >>> 31), y = m.low ^ (E << 1 | S >>> 31), g = 0; g < 5; g++) {
                                    var s = r[d + 5 * g];
                                    s.high ^= p,
                                    s.low ^= y
                                }
                            for (var T = 1; T < 25; T++) {
                                var p, y, s = r[T], _ = s.high, w = s.low, A = c[T];
                                A < 32 ? (p = _ << A | w >>> 32 - A,
                                y = w << A | _ >>> 32 - A) : (p = w << A - 32 | _ >>> 64 - A,
                                y = _ << A - 32 | w >>> 64 - A);
                                var R = f[l[T]];
                                R.high = p,
                                R.low = y
                            }
                            var D = f[0]
                              , L = r[0];
                            D.high = L.high,
                            D.low = L.low;
                            for (var d = 0; d < 5; d++)
                                for (var g = 0; g < 5; g++) {
                                    var T = d + 5 * g
                                      , s = r[T]
                                      , k = f[T]
                                      , O = f[(d + 1) % 5 + 5 * g]
                                      , x = f[(d + 2) % 5 + 5 * g];
                                    s.high = k.high ^ ~O.high & x.high,
                                    s.low = k.low ^ ~O.low & x.low
                                }
                            var s = r[0]
                              , I = h[u];
                            s.high ^= I.high,
                            s.low ^= I.low
                        }
                    },
                    _doFinalize: function() {
                        var t = this._data
                          , r = t.words
                          , i = (this._nDataBytes,
                        8 * t.sigBytes)
                          , o = 32 * this.blockSize;
                        r[i >>> 5] |= 1 << 24 - i % 32,
                        r[(e.ceil((i + 1) / o) * o >>> 5) - 1] |= 128,
                        t.sigBytes = 4 * r.length,
                        this._process();
                        for (var a = this._state, s = this.cfg.outputLength / 8, u = s / 8, c = [], l = 0; l < u; l++) {
                            var h = a[l]
                              , f = h.high
                              , d = h.low;
                            f = 16711935 & (f << 8 | f >>> 24) | 4278255360 & (f << 24 | f >>> 8),
                            d = 16711935 & (d << 8 | d >>> 24) | 4278255360 & (d << 24 | d >>> 8),
                            c.push(d),
                            c.push(f)
                        }
                        return new n.init(c,s)
                    },
                    clone: function() {
                        for (var t = o.clone.call(this), e = t._state = this._state.slice(0), r = 0; r < 25; r++)
                            e[r] = e[r].clone();
                        return t
                    }
                });
                r.SHA3 = o._createHelper(d),
                r.HmacSHA3 = o._createHmacHelper(d)
            }(Math),
            t.SHA3
        })
    }
    , function(t, e, r) {
        var i, n, o, a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        }
        : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        }
        ;
        !function(s, u) {
            "object" === a(e) ? t.exports = e = u(r(0)) : (n = [r(0)],
            i = u,
            void 0 !== (o = "function" == typeof i ? i.apply(e, n) : i) && (t.exports = o))
        }(0, function(t) {
            /** @preserve
 (c) 2012 by Cédric Mesnil. All rights reserved.
 	Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
 	    - Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
     - Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
 	THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
            return function(e) {
                function r(t, e, r) {
                    return t ^ e ^ r
                }
                function i(t, e, r) {
                    return t & e | ~t & r
                }
                function n(t, e, r) {
                    return (t | ~e) ^ r
                }
                function o(t, e, r) {
                    return t & r | e & ~r
                }
                function a(t, e, r) {
                    return t ^ (e | ~r)
                }
                function s(t, e) {
                    return t << e | t >>> 32 - e
                }
                var u = t
                  , c = u.lib
                  , l = c.WordArray
                  , h = c.Hasher
                  , f = u.algo
                  , d = l.create([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8, 3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2, 4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13])
                  , p = l.create([5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13, 8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14, 12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11])
                  , y = l.create([11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12, 11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12, 9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6])
                  , g = l.create([8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11, 9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5, 15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8, 8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11])
                  , v = l.create([0, 1518500249, 1859775393, 2400959708, 2840853838])
                  , m = l.create([1352829926, 1548603684, 1836072691, 2053994217, 0])
                  , b = f.RIPEMD160 = h.extend({
                    _doReset: function() {
                        this._hash = l.create([1732584193, 4023233417, 2562383102, 271733878, 3285377520])
                    },
                    _doProcessBlock: function(t, e) {
                        for (var u = 0; u < 16; u++) {
                            var c = e + u
                              , l = t[c];
                            t[c] = 16711935 & (l << 8 | l >>> 24) | 4278255360 & (l << 24 | l >>> 8)
                        }
                        var h, f, b, S, E, T, _, w, A, R, D = this._hash.words, L = v.words, k = m.words, O = d.words, x = p.words, I = y.words, C = g.words;
                        T = h = D[0],
                        _ = f = D[1],
                        w = b = D[2],
                        A = S = D[3],
                        R = E = D[4];
                        for (var P, u = 0; u < 80; u += 1)
                            P = h + t[e + O[u]] | 0,
                            P += u < 16 ? r(f, b, S) + L[0] : u < 32 ? i(f, b, S) + L[1] : u < 48 ? n(f, b, S) + L[2] : u < 64 ? o(f, b, S) + L[3] : a(f, b, S) + L[4],
                            P |= 0,
                            P = s(P, I[u]),
                            P = P + E | 0,
                            h = E,
                            E = S,
                            S = s(b, 10),
                            b = f,
                            f = P,
                            P = T + t[e + x[u]] | 0,
                            P += u < 16 ? a(_, w, A) + k[0] : u < 32 ? o(_, w, A) + k[1] : u < 48 ? n(_, w, A) + k[2] : u < 64 ? i(_, w, A) + k[3] : r(_, w, A) + k[4],
                            P |= 0,
                            P = s(P, C[u]),
                            P = P + R | 0,
                            T = R,
                            R = A,
                            A = s(w, 10),
                            w = _,
                            _ = P;
                        P = D[1] + b + A | 0,
                        D[1] = D[2] + S + R | 0,
                        D[2] = D[3] + E + T | 0,
                        D[3] = D[4] + h + _ | 0,
                        D[4] = D[0] + f + w | 0,
                        D[0] = P
                    },
                    _doFinalize: function() {
                        var t = this._data
                          , e = t.words
                          , r = 8 * this._nDataBytes
                          , i = 8 * t.sigBytes;
                        e[i >>> 5] |= 128 << 24 - i % 32,
                        e[14 + (i + 64 >>> 9 << 4)] = 16711935 & (r << 8 | r >>> 24) | 4278255360 & (r << 24 | r >>> 8),
                        t.sigBytes = 4 * (e.length + 1),
                        this._process();
                        for (var n = this._hash, o = n.words, a = 0; a < 5; a++) {
                            var s = o[a];
                            o[a] = 16711935 & (s << 8 | s >>> 24) | 4278255360 & (s << 24 | s >>> 8)
                        }
                        return n
                    },
                    clone: function() {
                        var t = h.clone.call(this);
                        return t._hash = this._hash.clone(),
                        t
                    }
                });
                u.RIPEMD160 = h._createHelper(b),
                u.HmacRIPEMD160 = h._createHmacHelper(b)
            }(Math),
            t.RIPEMD160
        })
    }
    , function(t, e, r) {
        var i, n, o, a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        }
        : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        }
        ;
        !function(s, u, c) {
            "object" === a(e) ? t.exports = e = u(r(0), r(10), r(11)) : (n = [r(0), r(10), r(11)],
            i = u,
            void 0 !== (o = "function" == typeof i ? i.apply(e, n) : i) && (t.exports = o))
        }(0, function(t) {
            return function() {
                var e = t
                  , r = e.lib
                  , i = r.Base
                  , n = r.WordArray
                  , o = e.algo
                  , a = o.SHA1
                  , s = o.HMAC
                  , u = o.PBKDF2 = i.extend({
                    cfg: i.extend({
                        keySize: 4,
                        hasher: a,
                        iterations: 1
                    }),
                    init: function(t) {
                        this.cfg = this.cfg.extend(t)
                    },
                    compute: function(t, e) {
                        for (var r = this.cfg, i = s.create(r.hasher, t), o = n.create(), a = n.create([1]), u = o.words, c = a.words, l = r.keySize, h = r.iterations; u.length < l; ) {
                            var f = i.update(e).finalize(a);
                            i.reset();
                            for (var d = f.words, p = d.length, y = f, g = 1; g < h; g++) {
                                y = i.finalize(y),
                                i.reset();
                                for (var v = y.words, m = 0; m < p; m++)
                                    d[m] ^= v[m]
                            }
                            o.concat(f),
                            c[0]++
                        }
                        return o.sigBytes = 4 * l,
                        o
                    }
                });
                e.PBKDF2 = function(t, e, r) {
                    return u.create(r).compute(t, e)
                }
            }(),
            t.PBKDF2
        })
    }
    , function(t, e, r) {
        var i, n, o, a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        }
        : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        }
        ;
        !function(s, u, c) {
            "object" === a(e) ? t.exports = e = u(r(0), r(1)) : (n = [r(0), r(1)],
            i = u,
            void 0 !== (o = "function" == typeof i ? i.apply(e, n) : i) && (t.exports = o))
        }(0, function(t) {
            return t.mode.CFB = function() {
                function e(t, e, r, i) {
                    var n, o = this._iv;
                    o ? (n = o.slice(0),
                    this._iv = void 0) : n = this._prevBlock,
                    i.encryptBlock(n, 0);
                    for (var a = 0; a < r; a++)
                        t[e + a] ^= n[a]
                }
                var r = t.lib.BlockCipherMode.extend();
                return r.Encryptor = r.extend({
                    processBlock: function(t, r) {
                        var i = this._cipher
                          , n = i.blockSize;
                        e.call(this, t, r, n, i),
                        this._prevBlock = t.slice(r, r + n)
                    }
                }),
                r.Decryptor = r.extend({
                    processBlock: function(t, r) {
                        var i = this._cipher
                          , n = i.blockSize
                          , o = t.slice(r, r + n);
                        e.call(this, t, r, n, i),
                        this._prevBlock = o
                    }
                }),
                r
            }(),
            t.mode.CFB
        })
    }
    , function(t, e, r) {
        var i, n, o, a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        }
        : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        }
        ;
        !function(s, u, c) {
            "object" === a(e) ? t.exports = e = u(r(0), r(1)) : (n = [r(0), r(1)],
            i = u,
            void 0 !== (o = "function" == typeof i ? i.apply(e, n) : i) && (t.exports = o))
        }(0, function(t) {
            return t.mode.CTR = function() {
                var e = t.lib.BlockCipherMode.extend()
                  , r = e.Encryptor = e.extend({
                    processBlock: function(t, e) {
                        var r = this._cipher
                          , i = r.blockSize
                          , n = this._iv
                          , o = this._counter;
                        n && (o = this._counter = n.slice(0),
                        this._iv = void 0);
                        var a = o.slice(0);
                        r.encryptBlock(a, 0),
                        o[i - 1] = o[i - 1] + 1 | 0;
                        for (var s = 0; s < i; s++)
                            t[e + s] ^= a[s]
                    }
                });
                return e.Decryptor = r,
                e
            }(),
            t.mode.CTR
        })
    }
    , function(t, e, r) {
        var i, n, o, a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        }
        : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        }
        ;
        !function(s, u, c) {
            "object" === a(e) ? t.exports = e = u(r(0), r(1)) : (n = [r(0), r(1)],
            i = u,
            void 0 !== (o = "function" == typeof i ? i.apply(e, n) : i) && (t.exports = o))
        }(0, function(t) {
            /** @preserve
  * Counter block mode compatible with  Dr Brian Gladman fileenc.c
  * derived from CryptoJS.mode.CTR
  * Jan Hruby jhruby.web@gmail.com
  */
            return t.mode.CTRGladman = function() {
                function e(t) {
                    if (255 == (t >> 24 & 255)) {
                        var e = t >> 16 & 255
                          , r = t >> 8 & 255
                          , i = 255 & t;
                        255 === e ? (e = 0,
                        255 === r ? (r = 0,
                        255 === i ? i = 0 : ++i) : ++r) : ++e,
                        t = 0,
                        t += e << 16,
                        t += r << 8,
                        t += i
                    } else
                        t += 1 << 24;
                    return t
                }
                function r(t) {
                    return 0 === (t[0] = e(t[0])) && (t[1] = e(t[1])),
                    t
                }
                var i = t.lib.BlockCipherMode.extend()
                  , n = i.Encryptor = i.extend({
                    processBlock: function(t, e) {
                        var i = this._cipher
                          , n = i.blockSize
                          , o = this._iv
                          , a = this._counter;
                        o && (a = this._counter = o.slice(0),
                        this._iv = void 0),
                        r(a);
                        var s = a.slice(0);
                        i.encryptBlock(s, 0);
                        for (var u = 0; u < n; u++)
                            t[e + u] ^= s[u]
                    }
                });
                return i.Decryptor = n,
                i
            }(),
            t.mode.CTRGladman
        })
    }
    , function(t, e, r) {
        var i, n, o, a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        }
        : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        }
        ;
        !function(s, u, c) {
            "object" === a(e) ? t.exports = e = u(r(0), r(1)) : (n = [r(0), r(1)],
            i = u,
            void 0 !== (o = "function" == typeof i ? i.apply(e, n) : i) && (t.exports = o))
        }(0, function(t) {
            return t.mode.OFB = function() {
                var e = t.lib.BlockCipherMode.extend()
                  , r = e.Encryptor = e.extend({
                    processBlock: function(t, e) {
                        var r = this._cipher
                          , i = r.blockSize
                          , n = this._iv
                          , o = this._keystream;
                        n && (o = this._keystream = n.slice(0),
                        this._iv = void 0),
                        r.encryptBlock(o, 0);
                        for (var a = 0; a < i; a++)
                            t[e + a] ^= o[a]
                    }
                });
                return e.Decryptor = r,
                e
            }(),
            t.mode.OFB
        })
    }
    , function(t, e, r) {
        var i, n, o, a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        }
        : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        }
        ;
        !function(s, u, c) {
            "object" === a(e) ? t.exports = e = u(r(0), r(1)) : (n = [r(0), r(1)],
            i = u,
            void 0 !== (o = "function" == typeof i ? i.apply(e, n) : i) && (t.exports = o))
        }(0, function(t) {
            return t.mode.ECB = function() {
                var e = t.lib.BlockCipherMode.extend();
                return e.Encryptor = e.extend({
                    processBlock: function(t, e) {
                        this._cipher.encryptBlock(t, e)
                    }
                }),
                e.Decryptor = e.extend({
                    processBlock: function(t, e) {
                        this._cipher.decryptBlock(t, e)
                    }
                }),
                e
            }(),
            t.mode.ECB
        })
    }
    , function(t, e, r) {
        var i, n, o, a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        }
        : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        }
        ;
        !function(s, u, c) {
            "object" === a(e) ? t.exports = e = u(r(0), r(1)) : (n = [r(0), r(1)],
            i = u,
            void 0 !== (o = "function" == typeof i ? i.apply(e, n) : i) && (t.exports = o))
        }(0, function(t) {
            return t.pad.AnsiX923 = {
                pad: function(t, e) {
                    var r = t.sigBytes
                      , i = 4 * e
                      , n = i - r % i
                      , o = r + n - 1;
                    t.clamp(),
                    t.words[o >>> 2] |= n << 24 - o % 4 * 8,
                    t.sigBytes += n
                },
                unpad: function(t) {
                    var e = 255 & t.words[t.sigBytes - 1 >>> 2];
                    t.sigBytes -= e
                }
            },
            t.pad.Ansix923
        })
    }
    , function(t, e, r) {
        var i, n, o, a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        }
        : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        }
        ;
        !function(s, u, c) {
            "object" === a(e) ? t.exports = e = u(r(0), r(1)) : (n = [r(0), r(1)],
            i = u,
            void 0 !== (o = "function" == typeof i ? i.apply(e, n) : i) && (t.exports = o))
        }(0, function(t) {
            return t.pad.Iso10126 = {
                pad: function(e, r) {
                    var i = 4 * r
                      , n = i - e.sigBytes % i;
                    e.concat(t.lib.WordArray.random(n - 1)).concat(t.lib.WordArray.create([n << 24], 1))
                },
                unpad: function(t) {
                    var e = 255 & t.words[t.sigBytes - 1 >>> 2];
                    t.sigBytes -= e
                }
            },
            t.pad.Iso10126
        })
    }
    , function(t, e, r) {
        var i, n, o, a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        }
        : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        }
        ;
        !function(s, u, c) {
            "object" === a(e) ? t.exports = e = u(r(0), r(1)) : (n = [r(0), r(1)],
            i = u,
            void 0 !== (o = "function" == typeof i ? i.apply(e, n) : i) && (t.exports = o))
        }(0, function(t) {
            return t.pad.Iso97971 = {
                pad: function(e, r) {
                    e.concat(t.lib.WordArray.create([2147483648], 1)),
                    t.pad.ZeroPadding.pad(e, r)
                },
                unpad: function(e) {
                    t.pad.ZeroPadding.unpad(e),
                    e.sigBytes--
                }
            },
            t.pad.Iso97971
        })
    }
    , function(t, e, r) {
        var i, n, o, a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        }
        : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        }
        ;
        !function(s, u, c) {
            "object" === a(e) ? t.exports = e = u(r(0), r(1)) : (n = [r(0), r(1)],
            i = u,
            void 0 !== (o = "function" == typeof i ? i.apply(e, n) : i) && (t.exports = o))
        }(0, function(t) {
            return t.pad.ZeroPadding = {
                pad: function(t, e) {
                    var r = 4 * e;
                    t.clamp(),
                    t.sigBytes += r - (t.sigBytes % r || r)
                },
                unpad: function(t) {
                    for (var e = t.words, r = t.sigBytes - 1, r = t.sigBytes - 1; r >= 0; r--)
                        if (e[r >>> 2] >>> 24 - r % 4 * 8 & 255) {
                            t.sigBytes = r + 1;
                            break
                        }
                }
            },
            t.pad.ZeroPadding
        })
    }
    , function(t, e, r) {
        var i, n, o, a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        }
        : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        }
        ;
        !function(s, u, c) {
            "object" === a(e) ? t.exports = e = u(r(0), r(1)) : (n = [r(0), r(1)],
            i = u,
            void 0 !== (o = "function" == typeof i ? i.apply(e, n) : i) && (t.exports = o))
        }(0, function(t) {
            return t.pad.NoPadding = {
                pad: function() {},
                unpad: function() {}
            },
            t.pad.NoPadding
        })
    }
    , function(t, e, r) {
        var i, n, o, a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        }
        : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        }
        ;
        !function(s, u, c) {
            "object" === a(e) ? t.exports = e = u(r(0), r(1)) : (n = [r(0), r(1)],
            i = u,
            void 0 !== (o = "function" == typeof i ? i.apply(e, n) : i) && (t.exports = o))
        }(0, function(t) {
            return function(e) {
                var r = t
                  , i = r.lib
                  , n = i.CipherParams
                  , o = r.enc
                  , a = o.Hex
                  , s = r.format;
                s.Hex = {
                    stringify: function(t) {
                        return t.ciphertext.toString(a)
                    },
                    parse: function(t) {
                        var e = a.parse(t);
                        return n.create({
                            ciphertext: e
                        })
                    }
                }
            }(),
            t.format.Hex
        })
    }
    , function(t, e, r) {
        var i, n, o, a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        }
        : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        }
        ;
        !function(s, u, c) {
            "object" === a(e) ? t.exports = e = u(r(0), r(7), r(8), r(6), r(1)) : (n = [r(0), r(7), r(8), r(6), r(1)],
            i = u,
            void 0 !== (o = "function" == typeof i ? i.apply(e, n) : i) && (t.exports = o))
        }(0, function(t) {
            return function() {
                var e = t
                  , r = e.lib
                  , i = r.BlockCipher
                  , n = e.algo
                  , o = []
                  , a = []
                  , s = []
                  , u = []
                  , c = []
                  , l = []
                  , h = []
                  , f = []
                  , d = []
                  , p = [];
                !function() {
                    for (var t = [], e = 0; e < 256; e++)
                        t[e] = e < 128 ? e << 1 : e << 1 ^ 283;
                    for (var r = 0, i = 0, e = 0; e < 256; e++) {
                        var n = i ^ i << 1 ^ i << 2 ^ i << 3 ^ i << 4;
                        n = n >>> 8 ^ 255 & n ^ 99,
                        o[r] = n,
                        a[n] = r;
                        var y = t[r]
                          , g = t[y]
                          , v = t[g]
                          , m = 257 * t[n] ^ 16843008 * n;
                        s[r] = m << 24 | m >>> 8,
                        u[r] = m << 16 | m >>> 16,
                        c[r] = m << 8 | m >>> 24,
                        l[r] = m;
                        var m = 16843009 * v ^ 65537 * g ^ 257 * y ^ 16843008 * r;
                        h[n] = m << 24 | m >>> 8,
                        f[n] = m << 16 | m >>> 16,
                        d[n] = m << 8 | m >>> 24,
                        p[n] = m,
                        r ? (r = y ^ t[t[t[v ^ y]]],
                        i ^= t[t[i]]) : r = i = 1
                    }
                }();
                var y = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54]
                  , g = n.AES = i.extend({
                    _doReset: function() {
                        var t;
                        if (!this._nRounds || this._keyPriorReset !== this._key) {
                            for (var e = this._keyPriorReset = this._key, r = e.words, i = e.sigBytes / 4, n = this._nRounds = i + 6, a = 4 * (n + 1), s = this._keySchedule = [], u = 0; u < a; u++)
                                u < i ? s[u] = r[u] : (t = s[u - 1],
                                u % i ? i > 6 && u % i == 4 && (t = o[t >>> 24] << 24 | o[t >>> 16 & 255] << 16 | o[t >>> 8 & 255] << 8 | o[255 & t]) : (t = t << 8 | t >>> 24,
                                t = o[t >>> 24] << 24 | o[t >>> 16 & 255] << 16 | o[t >>> 8 & 255] << 8 | o[255 & t],
                                t ^= y[u / i | 0] << 24),
                                s[u] = s[u - i] ^ t);
                            for (var c = this._invKeySchedule = [], l = 0; l < a; l++) {
                                var u = a - l;
                                if (l % 4)
                                    var t = s[u];
                                else
                                    var t = s[u - 4];
                                c[l] = l < 4 || u <= 4 ? t : h[o[t >>> 24]] ^ f[o[t >>> 16 & 255]] ^ d[o[t >>> 8 & 255]] ^ p[o[255 & t]]
                            }
                        }
                    },
                    encryptBlock: function(t, e) {
                        this._doCryptBlock(t, e, this._keySchedule, s, u, c, l, o)
                    },
                    decryptBlock: function(t, e) {
                        var r = t[e + 1];
                        t[e + 1] = t[e + 3],
                        t[e + 3] = r,
                        this._doCryptBlock(t, e, this._invKeySchedule, h, f, d, p, a);
                        var r = t[e + 1];
                        t[e + 1] = t[e + 3],
                        t[e + 3] = r
                    },
                    _doCryptBlock: function(t, e, r, i, n, o, a, s) {
                        for (var u = this._nRounds, c = t[e] ^ r[0], l = t[e + 1] ^ r[1], h = t[e + 2] ^ r[2], f = t[e + 3] ^ r[3], d = 4, p = 1; p < u; p++) {
                            var y = i[c >>> 24] ^ n[l >>> 16 & 255] ^ o[h >>> 8 & 255] ^ a[255 & f] ^ r[d++]
                              , g = i[l >>> 24] ^ n[h >>> 16 & 255] ^ o[f >>> 8 & 255] ^ a[255 & c] ^ r[d++]
                              , v = i[h >>> 24] ^ n[f >>> 16 & 255] ^ o[c >>> 8 & 255] ^ a[255 & l] ^ r[d++]
                              , m = i[f >>> 24] ^ n[c >>> 16 & 255] ^ o[l >>> 8 & 255] ^ a[255 & h] ^ r[d++];
                            c = y,
                            l = g,
                            h = v,
                            f = m
                        }
                        var y = (s[c >>> 24] << 24 | s[l >>> 16 & 255] << 16 | s[h >>> 8 & 255] << 8 | s[255 & f]) ^ r[d++]
                          , g = (s[l >>> 24] << 24 | s[h >>> 16 & 255] << 16 | s[f >>> 8 & 255] << 8 | s[255 & c]) ^ r[d++]
                          , v = (s[h >>> 24] << 24 | s[f >>> 16 & 255] << 16 | s[c >>> 8 & 255] << 8 | s[255 & l]) ^ r[d++]
                          , m = (s[f >>> 24] << 24 | s[c >>> 16 & 255] << 16 | s[l >>> 8 & 255] << 8 | s[255 & h]) ^ r[d++];
                        t[e] = y,
                        t[e + 1] = g,
                        t[e + 2] = v,
                        t[e + 3] = m
                    },
                    keySize: 8
                });
                e.AES = i._createHelper(g)
            }(),
            t.AES
        })
    }
    , function(t, e, r) {
        var i, n, o, a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        }
        : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        }
        ;
        !function(s, u, c) {
            "object" === a(e) ? t.exports = e = u(r(0), r(7), r(8), r(6), r(1)) : (n = [r(0), r(7), r(8), r(6), r(1)],
            i = u,
            void 0 !== (o = "function" == typeof i ? i.apply(e, n) : i) && (t.exports = o))
        }(0, function(t) {
            return function() {
                function e(t, e) {
                    var r = (this._lBlock >>> t ^ this._rBlock) & e;
                    this._rBlock ^= r,
                    this._lBlock ^= r << t
                }
                function r(t, e) {
                    var r = (this._rBlock >>> t ^ this._lBlock) & e;
                    this._lBlock ^= r,
                    this._rBlock ^= r << t
                }
                var i = t
                  , n = i.lib
                  , o = n.WordArray
                  , a = n.BlockCipher
                  , s = i.algo
                  , u = [57, 49, 41, 33, 25, 17, 9, 1, 58, 50, 42, 34, 26, 18, 10, 2, 59, 51, 43, 35, 27, 19, 11, 3, 60, 52, 44, 36, 63, 55, 47, 39, 31, 23, 15, 7, 62, 54, 46, 38, 30, 22, 14, 6, 61, 53, 45, 37, 29, 21, 13, 5, 28, 20, 12, 4]
                  , c = [14, 17, 11, 24, 1, 5, 3, 28, 15, 6, 21, 10, 23, 19, 12, 4, 26, 8, 16, 7, 27, 20, 13, 2, 41, 52, 31, 37, 47, 55, 30, 40, 51, 45, 33, 48, 44, 49, 39, 56, 34, 53, 46, 42, 50, 36, 29, 32]
                  , l = [1, 2, 4, 6, 8, 10, 12, 14, 15, 17, 19, 21, 23, 25, 27, 28]
                  , h = [{
                    0: 8421888,
                    268435456: 32768,
                    536870912: 8421378,
                    805306368: 2,
                    1073741824: 512,
                    1342177280: 8421890,
                    1610612736: 8389122,
                    1879048192: 8388608,
                    2147483648: 514,
                    2415919104: 8389120,
                    2684354560: 33280,
                    2952790016: 8421376,
                    3221225472: 32770,
                    3489660928: 8388610,
                    3758096384: 0,
                    4026531840: 33282,
                    134217728: 0,
                    402653184: 8421890,
                    671088640: 33282,
                    939524096: 32768,
                    1207959552: 8421888,
                    1476395008: 512,
                    1744830464: 8421378,
                    2013265920: 2,
                    2281701376: 8389120,
                    2550136832: 33280,
                    2818572288: 8421376,
                    3087007744: 8389122,
                    3355443200: 8388610,
                    3623878656: 32770,
                    3892314112: 514,
                    4160749568: 8388608,
                    1: 32768,
                    268435457: 2,
                    536870913: 8421888,
                    805306369: 8388608,
                    1073741825: 8421378,
                    1342177281: 33280,
                    1610612737: 512,
                    1879048193: 8389122,
                    2147483649: 8421890,
                    2415919105: 8421376,
                    2684354561: 8388610,
                    2952790017: 33282,
                    3221225473: 514,
                    3489660929: 8389120,
                    3758096385: 32770,
                    4026531841: 0,
                    134217729: 8421890,
                    402653185: 8421376,
                    671088641: 8388608,
                    939524097: 512,
                    1207959553: 32768,
                    1476395009: 8388610,
                    1744830465: 2,
                    2013265921: 33282,
                    2281701377: 32770,
                    2550136833: 8389122,
                    2818572289: 514,
                    3087007745: 8421888,
                    3355443201: 8389120,
                    3623878657: 0,
                    3892314113: 33280,
                    4160749569: 8421378
                }, {
                    0: 1074282512,
                    16777216: 16384,
                    33554432: 524288,
                    50331648: 1074266128,
                    67108864: 1073741840,
                    83886080: 1074282496,
                    100663296: 1073758208,
                    117440512: 16,
                    134217728: 540672,
                    150994944: 1073758224,
                    167772160: 1073741824,
                    184549376: 540688,
                    201326592: 524304,
                    218103808: 0,
                    234881024: 16400,
                    251658240: 1074266112,
                    8388608: 1073758208,
                    25165824: 540688,
                    41943040: 16,
                    58720256: 1073758224,
                    75497472: 1074282512,
                    92274688: 1073741824,
                    109051904: 524288,
                    125829120: 1074266128,
                    142606336: 524304,
                    159383552: 0,
                    176160768: 16384,
                    192937984: 1074266112,
                    209715200: 1073741840,
                    226492416: 540672,
                    243269632: 1074282496,
                    260046848: 16400,
                    268435456: 0,
                    285212672: 1074266128,
                    301989888: 1073758224,
                    318767104: 1074282496,
                    335544320: 1074266112,
                    352321536: 16,
                    369098752: 540688,
                    385875968: 16384,
                    402653184: 16400,
                    419430400: 524288,
                    436207616: 524304,
                    452984832: 1073741840,
                    469762048: 540672,
                    486539264: 1073758208,
                    503316480: 1073741824,
                    520093696: 1074282512,
                    276824064: 540688,
                    293601280: 524288,
                    310378496: 1074266112,
                    327155712: 16384,
                    343932928: 1073758208,
                    360710144: 1074282512,
                    377487360: 16,
                    394264576: 1073741824,
                    411041792: 1074282496,
                    427819008: 1073741840,
                    444596224: 1073758224,
                    461373440: 524304,
                    478150656: 0,
                    494927872: 16400,
                    511705088: 1074266128,
                    528482304: 540672
                }, {
                    0: 260,
                    1048576: 0,
                    2097152: 67109120,
                    3145728: 65796,
                    4194304: 65540,
                    5242880: 67108868,
                    6291456: 67174660,
                    7340032: 67174400,
                    8388608: 67108864,
                    9437184: 67174656,
                    10485760: 65792,
                    11534336: 67174404,
                    12582912: 67109124,
                    13631488: 65536,
                    14680064: 4,
                    15728640: 256,
                    524288: 67174656,
                    1572864: 67174404,
                    2621440: 0,
                    3670016: 67109120,
                    4718592: 67108868,
                    5767168: 65536,
                    6815744: 65540,
                    7864320: 260,
                    8912896: 4,
                    9961472: 256,
                    11010048: 67174400,
                    12058624: 65796,
                    13107200: 65792,
                    14155776: 67109124,
                    15204352: 67174660,
                    16252928: 67108864,
                    16777216: 67174656,
                    17825792: 65540,
                    18874368: 65536,
                    19922944: 67109120,
                    20971520: 256,
                    22020096: 67174660,
                    23068672: 67108868,
                    24117248: 0,
                    25165824: 67109124,
                    26214400: 67108864,
                    27262976: 4,
                    28311552: 65792,
                    29360128: 67174400,
                    30408704: 260,
                    31457280: 65796,
                    32505856: 67174404,
                    17301504: 67108864,
                    18350080: 260,
                    19398656: 67174656,
                    20447232: 0,
                    21495808: 65540,
                    22544384: 67109120,
                    23592960: 256,
                    24641536: 67174404,
                    25690112: 65536,
                    26738688: 67174660,
                    27787264: 65796,
                    28835840: 67108868,
                    29884416: 67109124,
                    30932992: 67174400,
                    31981568: 4,
                    33030144: 65792
                }, {
                    0: 2151682048,
                    65536: 2147487808,
                    131072: 4198464,
                    196608: 2151677952,
                    262144: 0,
                    327680: 4198400,
                    393216: 2147483712,
                    458752: 4194368,
                    524288: 2147483648,
                    589824: 4194304,
                    655360: 64,
                    720896: 2147487744,
                    786432: 2151678016,
                    851968: 4160,
                    917504: 4096,
                    983040: 2151682112,
                    32768: 2147487808,
                    98304: 64,
                    163840: 2151678016,
                    229376: 2147487744,
                    294912: 4198400,
                    360448: 2151682112,
                    425984: 0,
                    491520: 2151677952,
                    557056: 4096,
                    622592: 2151682048,
                    688128: 4194304,
                    753664: 4160,
                    819200: 2147483648,
                    884736: 4194368,
                    950272: 4198464,
                    1015808: 2147483712,
                    1048576: 4194368,
                    1114112: 4198400,
                    1179648: 2147483712,
                    1245184: 0,
                    1310720: 4160,
                    1376256: 2151678016,
                    1441792: 2151682048,
                    1507328: 2147487808,
                    1572864: 2151682112,
                    1638400: 2147483648,
                    1703936: 2151677952,
                    1769472: 4198464,
                    1835008: 2147487744,
                    1900544: 4194304,
                    1966080: 64,
                    2031616: 4096,
                    1081344: 2151677952,
                    1146880: 2151682112,
                    1212416: 0,
                    1277952: 4198400,
                    1343488: 4194368,
                    1409024: 2147483648,
                    1474560: 2147487808,
                    1540096: 64,
                    1605632: 2147483712,
                    1671168: 4096,
                    1736704: 2147487744,
                    1802240: 2151678016,
                    1867776: 4160,
                    1933312: 2151682048,
                    1998848: 4194304,
                    2064384: 4198464
                }, {
                    0: 128,
                    4096: 17039360,
                    8192: 262144,
                    12288: 536870912,
                    16384: 537133184,
                    20480: 16777344,
                    24576: 553648256,
                    28672: 262272,
                    32768: 16777216,
                    36864: 537133056,
                    40960: 536871040,
                    45056: 553910400,
                    49152: 553910272,
                    53248: 0,
                    57344: 17039488,
                    61440: 553648128,
                    2048: 17039488,
                    6144: 553648256,
                    10240: 128,
                    14336: 17039360,
                    18432: 262144,
                    22528: 537133184,
                    26624: 553910272,
                    30720: 536870912,
                    34816: 537133056,
                    38912: 0,
                    43008: 553910400,
                    47104: 16777344,
                    51200: 536871040,
                    55296: 553648128,
                    59392: 16777216,
                    63488: 262272,
                    65536: 262144,
                    69632: 128,
                    73728: 536870912,
                    77824: 553648256,
                    81920: 16777344,
                    86016: 553910272,
                    90112: 537133184,
                    94208: 16777216,
                    98304: 553910400,
                    102400: 553648128,
                    106496: 17039360,
                    110592: 537133056,
                    114688: 262272,
                    118784: 536871040,
                    122880: 0,
                    126976: 17039488,
                    67584: 553648256,
                    71680: 16777216,
                    75776: 17039360,
                    79872: 537133184,
                    83968: 536870912,
                    88064: 17039488,
                    92160: 128,
                    96256: 553910272,
                    100352: 262272,
                    104448: 553910400,
                    108544: 0,
                    112640: 553648128,
                    116736: 16777344,
                    120832: 262144,
                    124928: 537133056,
                    129024: 536871040
                }, {
                    0: 268435464,
                    256: 8192,
                    512: 270532608,
                    768: 270540808,
                    1024: 268443648,
                    1280: 2097152,
                    1536: 2097160,
                    1792: 268435456,
                    2048: 0,
                    2304: 268443656,
                    2560: 2105344,
                    2816: 8,
                    3072: 270532616,
                    3328: 2105352,
                    3584: 8200,
                    3840: 270540800,
                    128: 270532608,
                    384: 270540808,
                    640: 8,
                    896: 2097152,
                    1152: 2105352,
                    1408: 268435464,
                    1664: 268443648,
                    1920: 8200,
                    2176: 2097160,
                    2432: 8192,
                    2688: 268443656,
                    2944: 270532616,
                    3200: 0,
                    3456: 270540800,
                    3712: 2105344,
                    3968: 268435456,
                    4096: 268443648,
                    4352: 270532616,
                    4608: 270540808,
                    4864: 8200,
                    5120: 2097152,
                    5376: 268435456,
                    5632: 268435464,
                    5888: 2105344,
                    6144: 2105352,
                    6400: 0,
                    6656: 8,
                    6912: 270532608,
                    7168: 8192,
                    7424: 268443656,
                    7680: 270540800,
                    7936: 2097160,
                    4224: 8,
                    4480: 2105344,
                    4736: 2097152,
                    4992: 268435464,
                    5248: 268443648,
                    5504: 8200,
                    5760: 270540808,
                    6016: 270532608,
                    6272: 270540800,
                    6528: 270532616,
                    6784: 8192,
                    7040: 2105352,
                    7296: 2097160,
                    7552: 0,
                    7808: 268435456,
                    8064: 268443656
                }, {
                    0: 1048576,
                    16: 33555457,
                    32: 1024,
                    48: 1049601,
                    64: 34604033,
                    80: 0,
                    96: 1,
                    112: 34603009,
                    128: 33555456,
                    144: 1048577,
                    160: 33554433,
                    176: 34604032,
                    192: 34603008,
                    208: 1025,
                    224: 1049600,
                    240: 33554432,
                    8: 34603009,
                    24: 0,
                    40: 33555457,
                    56: 34604032,
                    72: 1048576,
                    88: 33554433,
                    104: 33554432,
                    120: 1025,
                    136: 1049601,
                    152: 33555456,
                    168: 34603008,
                    184: 1048577,
                    200: 1024,
                    216: 34604033,
                    232: 1,
                    248: 1049600,
                    256: 33554432,
                    272: 1048576,
                    288: 33555457,
                    304: 34603009,
                    320: 1048577,
                    336: 33555456,
                    352: 34604032,
                    368: 1049601,
                    384: 1025,
                    400: 34604033,
                    416: 1049600,
                    432: 1,
                    448: 0,
                    464: 34603008,
                    480: 33554433,
                    496: 1024,
                    264: 1049600,
                    280: 33555457,
                    296: 34603009,
                    312: 1,
                    328: 33554432,
                    344: 1048576,
                    360: 1025,
                    376: 34604032,
                    392: 33554433,
                    408: 34603008,
                    424: 0,
                    440: 34604033,
                    456: 1049601,
                    472: 1024,
                    488: 33555456,
                    504: 1048577
                }, {
                    0: 134219808,
                    1: 131072,
                    2: 134217728,
                    3: 32,
                    4: 131104,
                    5: 134350880,
                    6: 134350848,
                    7: 2048,
                    8: 134348800,
                    9: 134219776,
                    10: 133120,
                    11: 134348832,
                    12: 2080,
                    13: 0,
                    14: 134217760,
                    15: 133152,
                    2147483648: 2048,
                    2147483649: 134350880,
                    2147483650: 134219808,
                    2147483651: 134217728,
                    2147483652: 134348800,
                    2147483653: 133120,
                    2147483654: 133152,
                    2147483655: 32,
                    2147483656: 134217760,
                    2147483657: 2080,
                    2147483658: 131104,
                    2147483659: 134350848,
                    2147483660: 0,
                    2147483661: 134348832,
                    2147483662: 134219776,
                    2147483663: 131072,
                    16: 133152,
                    17: 134350848,
                    18: 32,
                    19: 2048,
                    20: 134219776,
                    21: 134217760,
                    22: 134348832,
                    23: 131072,
                    24: 0,
                    25: 131104,
                    26: 134348800,
                    27: 134219808,
                    28: 134350880,
                    29: 133120,
                    30: 2080,
                    31: 134217728,
                    2147483664: 131072,
                    2147483665: 2048,
                    2147483666: 134348832,
                    2147483667: 133152,
                    2147483668: 32,
                    2147483669: 134348800,
                    2147483670: 134217728,
                    2147483671: 134219808,
                    2147483672: 134350880,
                    2147483673: 134217760,
                    2147483674: 134219776,
                    2147483675: 0,
                    2147483676: 133120,
                    2147483677: 2080,
                    2147483678: 131104,
                    2147483679: 134350848
                }]
                  , f = [4160749569, 528482304, 33030144, 2064384, 129024, 8064, 504, 2147483679]
                  , d = s.DES = a.extend({
                    _doReset: function() {
                        for (var t = this._key, e = t.words, r = [], i = 0; i < 56; i++) {
                            var n = u[i] - 1;
                            r[i] = e[n >>> 5] >>> 31 - n % 32 & 1
                        }
                        for (var o = this._subKeys = [], a = 0; a < 16; a++) {
                            for (var s = o[a] = [], h = l[a], i = 0; i < 24; i++)
                                s[i / 6 | 0] |= r[(c[i] - 1 + h) % 28] << 31 - i % 6,
                                s[4 + (i / 6 | 0)] |= r[28 + (c[i + 24] - 1 + h) % 28] << 31 - i % 6;
                            s[0] = s[0] << 1 | s[0] >>> 31;
                            for (var i = 1; i < 7; i++)
                                s[i] = s[i] >>> 4 * (i - 1) + 3;
                            s[7] = s[7] << 5 | s[7] >>> 27
                        }
                        for (var f = this._invSubKeys = [], i = 0; i < 16; i++)
                            f[i] = o[15 - i]
                    },
                    encryptBlock: function(t, e) {
                        this._doCryptBlock(t, e, this._subKeys)
                    },
                    decryptBlock: function(t, e) {
                        this._doCryptBlock(t, e, this._invSubKeys)
                    },
                    _doCryptBlock: function(t, i, n) {
                        this._lBlock = t[i],
                        this._rBlock = t[i + 1],
                        e.call(this, 4, 252645135),
                        e.call(this, 16, 65535),
                        r.call(this, 2, 858993459),
                        r.call(this, 8, 16711935),
                        e.call(this, 1, 1431655765);
                        for (var o = 0; o < 16; o++) {
                            for (var a = n[o], s = this._lBlock, u = this._rBlock, c = 0, l = 0; l < 8; l++)
                                c |= h[l][((u ^ a[l]) & f[l]) >>> 0];
                            this._lBlock = u,
                            this._rBlock = s ^ c
                        }
                        var d = this._lBlock;
                        this._lBlock = this._rBlock,
                        this._rBlock = d,
                        e.call(this, 1, 1431655765),
                        r.call(this, 8, 16711935),
                        r.call(this, 2, 858993459),
                        e.call(this, 16, 65535),
                        e.call(this, 4, 252645135),
                        t[i] = this._lBlock,
                        t[i + 1] = this._rBlock
                    },
                    keySize: 2,
                    ivSize: 2,
                    blockSize: 2
                });
                i.DES = a._createHelper(d);
                var p = s.TripleDES = a.extend({
                    _doReset: function() {
                        var t = this._key
                          , e = t.words;
                        if (2 !== e.length && 4 !== e.length && e.length < 6)
                            throw new Error("Invalid key length - 3DES requires the key length to be 64, 128, 192 or >192.");
                        var r = e.slice(0, 2)
                          , i = e.length < 4 ? e.slice(0, 2) : e.slice(2, 4)
                          , n = e.length < 6 ? e.slice(0, 2) : e.slice(4, 6);
                        this._des1 = d.createEncryptor(o.create(r)),
                        this._des2 = d.createEncryptor(o.create(i)),
                        this._des3 = d.createEncryptor(o.create(n))
                    },
                    encryptBlock: function(t, e) {
                        this._des1.encryptBlock(t, e),
                        this._des2.decryptBlock(t, e),
                        this._des3.encryptBlock(t, e)
                    },
                    decryptBlock: function(t, e) {
                        this._des3.decryptBlock(t, e),
                        this._des2.encryptBlock(t, e),
                        this._des1.decryptBlock(t, e)
                    },
                    keySize: 6,
                    ivSize: 2,
                    blockSize: 2
                });
                i.TripleDES = a._createHelper(p)
            }(),
            t.TripleDES
        })
    }
    , function(t, e, r) {
        var i, n, o, a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        }
        : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        }
        ;
        !function(s, u, c) {
            "object" === a(e) ? t.exports = e = u(r(0), r(7), r(8), r(6), r(1)) : (n = [r(0), r(7), r(8), r(6), r(1)],
            i = u,
            void 0 !== (o = "function" == typeof i ? i.apply(e, n) : i) && (t.exports = o))
        }(0, function(t) {
            return function() {
                function e() {
                    for (var t = this._S, e = this._i, r = this._j, i = 0, n = 0; n < 4; n++) {
                        e = (e + 1) % 256,
                        r = (r + t[e]) % 256;
                        var o = t[e];
                        t[e] = t[r],
                        t[r] = o,
                        i |= t[(t[e] + t[r]) % 256] << 24 - 8 * n
                    }
                    return this._i = e,
                    this._j = r,
                    i
                }
                var r = t
                  , i = r.lib
                  , n = i.StreamCipher
                  , o = r.algo
                  , a = o.RC4 = n.extend({
                    _doReset: function() {
                        for (var t = this._key, e = t.words, r = t.sigBytes, i = this._S = [], n = 0; n < 256; n++)
                            i[n] = n;
                        for (var n = 0, o = 0; n < 256; n++) {
                            var a = n % r
                              , s = e[a >>> 2] >>> 24 - a % 4 * 8 & 255;
                            o = (o + i[n] + s) % 256;
                            var u = i[n];
                            i[n] = i[o],
                            i[o] = u
                        }
                        this._i = this._j = 0
                    },
                    _doProcessBlock: function(t, r) {
                        t[r] ^= e.call(this)
                    },
                    keySize: 8,
                    ivSize: 0
                });
                r.RC4 = n._createHelper(a);
                var s = o.RC4Drop = a.extend({
                    cfg: a.cfg.extend({
                        drop: 192
                    }),
                    _doReset: function() {
                        a._doReset.call(this);
                        for (var t = this.cfg.drop; t > 0; t--)
                            e.call(this)
                    }
                });
                r.RC4Drop = n._createHelper(s)
            }(),
            t.RC4
        })
    }
    , function(t, e, r) {
        var i, n, o, a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        }
        : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        }
        ;
        !function(s, u, c) {
            "object" === a(e) ? t.exports = e = u(r(0), r(7), r(8), r(6), r(1)) : (n = [r(0), r(7), r(8), r(6), r(1)],
            i = u,
            void 0 !== (o = "function" == typeof i ? i.apply(e, n) : i) && (t.exports = o))
        }(0, function(t) {
            return function() {
                function e() {
                    for (var t = this._X, e = this._C, r = 0; r < 8; r++)
                        s[r] = e[r];
                    e[0] = e[0] + 1295307597 + this._b | 0,
                    e[1] = e[1] + 3545052371 + (e[0] >>> 0 < s[0] >>> 0 ? 1 : 0) | 0,
                    e[2] = e[2] + 886263092 + (e[1] >>> 0 < s[1] >>> 0 ? 1 : 0) | 0,
                    e[3] = e[3] + 1295307597 + (e[2] >>> 0 < s[2] >>> 0 ? 1 : 0) | 0,
                    e[4] = e[4] + 3545052371 + (e[3] >>> 0 < s[3] >>> 0 ? 1 : 0) | 0,
                    e[5] = e[5] + 886263092 + (e[4] >>> 0 < s[4] >>> 0 ? 1 : 0) | 0,
                    e[6] = e[6] + 1295307597 + (e[5] >>> 0 < s[5] >>> 0 ? 1 : 0) | 0,
                    e[7] = e[7] + 3545052371 + (e[6] >>> 0 < s[6] >>> 0 ? 1 : 0) | 0,
                    this._b = e[7] >>> 0 < s[7] >>> 0 ? 1 : 0;
                    for (var r = 0; r < 8; r++) {
                        var i = t[r] + e[r]
                          , n = 65535 & i
                          , o = i >>> 16
                          , a = ((n * n >>> 17) + n * o >>> 15) + o * o
                          , c = ((4294901760 & i) * i | 0) + ((65535 & i) * i | 0);
                        u[r] = a ^ c
                    }
                    t[0] = u[0] + (u[7] << 16 | u[7] >>> 16) + (u[6] << 16 | u[6] >>> 16) | 0,
                    t[1] = u[1] + (u[0] << 8 | u[0] >>> 24) + u[7] | 0,
                    t[2] = u[2] + (u[1] << 16 | u[1] >>> 16) + (u[0] << 16 | u[0] >>> 16) | 0,
                    t[3] = u[3] + (u[2] << 8 | u[2] >>> 24) + u[1] | 0,
                    t[4] = u[4] + (u[3] << 16 | u[3] >>> 16) + (u[2] << 16 | u[2] >>> 16) | 0,
                    t[5] = u[5] + (u[4] << 8 | u[4] >>> 24) + u[3] | 0,
                    t[6] = u[6] + (u[5] << 16 | u[5] >>> 16) + (u[4] << 16 | u[4] >>> 16) | 0,
                    t[7] = u[7] + (u[6] << 8 | u[6] >>> 24) + u[5] | 0
                }
                var r = t
                  , i = r.lib
                  , n = i.StreamCipher
                  , o = r.algo
                  , a = []
                  , s = []
                  , u = []
                  , c = o.Rabbit = n.extend({
                    _doReset: function() {
                        for (var t = this._key.words, r = this.cfg.iv, i = 0; i < 4; i++)
                            t[i] = 16711935 & (t[i] << 8 | t[i] >>> 24) | 4278255360 & (t[i] << 24 | t[i] >>> 8);
                        var n = this._X = [t[0], t[3] << 16 | t[2] >>> 16, t[1], t[0] << 16 | t[3] >>> 16, t[2], t[1] << 16 | t[0] >>> 16, t[3], t[2] << 16 | t[1] >>> 16]
                          , o = this._C = [t[2] << 16 | t[2] >>> 16, 4294901760 & t[0] | 65535 & t[1], t[3] << 16 | t[3] >>> 16, 4294901760 & t[1] | 65535 & t[2], t[0] << 16 | t[0] >>> 16, 4294901760 & t[2] | 65535 & t[3], t[1] << 16 | t[1] >>> 16, 4294901760 & t[3] | 65535 & t[0]];
                        this._b = 0;
                        for (var i = 0; i < 4; i++)
                            e.call(this);
                        for (var i = 0; i < 8; i++)
                            o[i] ^= n[i + 4 & 7];
                        if (r) {
                            var a = r.words
                              , s = a[0]
                              , u = a[1]
                              , c = 16711935 & (s << 8 | s >>> 24) | 4278255360 & (s << 24 | s >>> 8)
                              , l = 16711935 & (u << 8 | u >>> 24) | 4278255360 & (u << 24 | u >>> 8)
                              , h = c >>> 16 | 4294901760 & l
                              , f = l << 16 | 65535 & c;
                            o[0] ^= c,
                            o[1] ^= h,
                            o[2] ^= l,
                            o[3] ^= f,
                            o[4] ^= c,
                            o[5] ^= h,
                            o[6] ^= l,
                            o[7] ^= f;
                            for (var i = 0; i < 4; i++)
                                e.call(this)
                        }
                    },
                    _doProcessBlock: function(t, r) {
                        var i = this._X;
                        e.call(this),
                        a[0] = i[0] ^ i[5] >>> 16 ^ i[3] << 16,
                        a[1] = i[2] ^ i[7] >>> 16 ^ i[5] << 16,
                        a[2] = i[4] ^ i[1] >>> 16 ^ i[7] << 16,
                        a[3] = i[6] ^ i[3] >>> 16 ^ i[1] << 16;
                        for (var n = 0; n < 4; n++)
                            a[n] = 16711935 & (a[n] << 8 | a[n] >>> 24) | 4278255360 & (a[n] << 24 | a[n] >>> 8),
                            t[r + n] ^= a[n]
                    },
                    blockSize: 4,
                    ivSize: 2
                });
                r.Rabbit = n._createHelper(c)
            }(),
            t.Rabbit
        })
    }
    , function(t, e, r) {
        var i, n, o, a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        }
        : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        }
        ;
        !function(s, u, c) {
            "object" === a(e) ? t.exports = e = u(r(0), r(7), r(8), r(6), r(1)) : (n = [r(0), r(7), r(8), r(6), r(1)],
            i = u,
            void 0 !== (o = "function" == typeof i ? i.apply(e, n) : i) && (t.exports = o))
        }(0, function(t) {
            return function() {
                function e() {
                    for (var t = this._X, e = this._C, r = 0; r < 8; r++)
                        s[r] = e[r];
                    e[0] = e[0] + 1295307597 + this._b | 0,
                    e[1] = e[1] + 3545052371 + (e[0] >>> 0 < s[0] >>> 0 ? 1 : 0) | 0,
                    e[2] = e[2] + 886263092 + (e[1] >>> 0 < s[1] >>> 0 ? 1 : 0) | 0,
                    e[3] = e[3] + 1295307597 + (e[2] >>> 0 < s[2] >>> 0 ? 1 : 0) | 0,
                    e[4] = e[4] + 3545052371 + (e[3] >>> 0 < s[3] >>> 0 ? 1 : 0) | 0,
                    e[5] = e[5] + 886263092 + (e[4] >>> 0 < s[4] >>> 0 ? 1 : 0) | 0,
                    e[6] = e[6] + 1295307597 + (e[5] >>> 0 < s[5] >>> 0 ? 1 : 0) | 0,
                    e[7] = e[7] + 3545052371 + (e[6] >>> 0 < s[6] >>> 0 ? 1 : 0) | 0,
                    this._b = e[7] >>> 0 < s[7] >>> 0 ? 1 : 0;
                    for (var r = 0; r < 8; r++) {
                        var i = t[r] + e[r]
                          , n = 65535 & i
                          , o = i >>> 16
                          , a = ((n * n >>> 17) + n * o >>> 15) + o * o
                          , c = ((4294901760 & i) * i | 0) + ((65535 & i) * i | 0);
                        u[r] = a ^ c
                    }
                    t[0] = u[0] + (u[7] << 16 | u[7] >>> 16) + (u[6] << 16 | u[6] >>> 16) | 0,
                    t[1] = u[1] + (u[0] << 8 | u[0] >>> 24) + u[7] | 0,
                    t[2] = u[2] + (u[1] << 16 | u[1] >>> 16) + (u[0] << 16 | u[0] >>> 16) | 0,
                    t[3] = u[3] + (u[2] << 8 | u[2] >>> 24) + u[1] | 0,
                    t[4] = u[4] + (u[3] << 16 | u[3] >>> 16) + (u[2] << 16 | u[2] >>> 16) | 0,
                    t[5] = u[5] + (u[4] << 8 | u[4] >>> 24) + u[3] | 0,
                    t[6] = u[6] + (u[5] << 16 | u[5] >>> 16) + (u[4] << 16 | u[4] >>> 16) | 0,
                    t[7] = u[7] + (u[6] << 8 | u[6] >>> 24) + u[5] | 0
                }
                var r = t
                  , i = r.lib
                  , n = i.StreamCipher
                  , o = r.algo
                  , a = []
                  , s = []
                  , u = []
                  , c = o.RabbitLegacy = n.extend({
                    _doReset: function() {
                        var t = this._key.words
                          , r = this.cfg.iv
                          , i = this._X = [t[0], t[3] << 16 | t[2] >>> 16, t[1], t[0] << 16 | t[3] >>> 16, t[2], t[1] << 16 | t[0] >>> 16, t[3], t[2] << 16 | t[1] >>> 16]
                          , n = this._C = [t[2] << 16 | t[2] >>> 16, 4294901760 & t[0] | 65535 & t[1], t[3] << 16 | t[3] >>> 16, 4294901760 & t[1] | 65535 & t[2], t[0] << 16 | t[0] >>> 16, 4294901760 & t[2] | 65535 & t[3], t[1] << 16 | t[1] >>> 16, 4294901760 & t[3] | 65535 & t[0]];
                        this._b = 0;
                        for (var o = 0; o < 4; o++)
                            e.call(this);
                        for (var o = 0; o < 8; o++)
                            n[o] ^= i[o + 4 & 7];
                        if (r) {
                            var a = r.words
                              , s = a[0]
                              , u = a[1]
                              , c = 16711935 & (s << 8 | s >>> 24) | 4278255360 & (s << 24 | s >>> 8)
                              , l = 16711935 & (u << 8 | u >>> 24) | 4278255360 & (u << 24 | u >>> 8)
                              , h = c >>> 16 | 4294901760 & l
                              , f = l << 16 | 65535 & c;
                            n[0] ^= c,
                            n[1] ^= h,
                            n[2] ^= l,
                            n[3] ^= f,
                            n[4] ^= c,
                            n[5] ^= h,
                            n[6] ^= l,
                            n[7] ^= f;
                            for (var o = 0; o < 4; o++)
                                e.call(this)
                        }
                    },
                    _doProcessBlock: function(t, r) {
                        var i = this._X;
                        e.call(this),
                        a[0] = i[0] ^ i[5] >>> 16 ^ i[3] << 16,
                        a[1] = i[2] ^ i[7] >>> 16 ^ i[5] << 16,
                        a[2] = i[4] ^ i[1] >>> 16 ^ i[7] << 16,
                        a[3] = i[6] ^ i[3] >>> 16 ^ i[1] << 16;
                        for (var n = 0; n < 4; n++)
                            a[n] = 16711935 & (a[n] << 8 | a[n] >>> 24) | 4278255360 & (a[n] << 24 | a[n] >>> 8),
                            t[r + n] ^= a[n]
                    },
                    blockSize: 4,
                    ivSize: 2
                });
                r.RabbitLegacy = n._createHelper(c)
            }(),
            t.RabbitLegacy
        })
    }
    , function(t, e, r) {
        /*! MIT License. Copyright 2015-2018 Richard Moore <me@ricmoo.com>. See LICENSE.txt. */
        !function(e) {
            "use strict";
            function r(t) {
                return parseInt(t) === t
            }
            function i(t) {
                if (!r(t.length))
                    return !1;
                for (var e = 0; e < t.length; e++)
                    if (!r(t[e]) || t[e] < 0 || t[e] > 255)
                        return !1;
                return !0
            }
            function n(t, e) {
                if (t.buffer && "Uint8Array" === t.name)
                    return e && (t = t.slice ? t.slice() : Array.prototype.slice.call(t)),
                    t;
                if (Array.isArray(t)) {
                    if (!i(t))
                        throw new Error("Array contains invalid value: " + t);
                    return new Uint8Array(t)
                }
                if (r(t.length) && i(t))
                    return new Uint8Array(t);
                throw new Error("unsupported array-like object")
            }
            function o(t) {
                return new Uint8Array(t)
            }
            function a(t, e, r, i, n) {
                null == i && null == n || (t = t.slice ? t.slice(i, n) : Array.prototype.slice.call(t, i, n)),
                e.set(t, r)
            }
            function s(t) {
                for (var e = [], r = 0; r < t.length; r += 4)
                    e.push(t[r] << 24 | t[r + 1] << 16 | t[r + 2] << 8 | t[r + 3]);
                return e
            }
            function u(t) {
                t = n(t, !0);
                var e = 16 - t.length % 16
                  , r = o(t.length + e);
                a(t, r);
                for (var i = t.length; i < r.length; i++)
                    r[i] = e;
                return r
            }
            function c(t) {
                if (t = n(t, !0),
                t.length < 16)
                    throw new Error("PKCS#7 invalid length");
                var e = t[t.length - 1];
                if (e > 16)
                    throw new Error("PKCS#7 padding byte out of range");
                for (var r = t.length - e, i = 0; i < e; i++)
                    if (t[r + i] !== e)
                        throw new Error("PKCS#7 invalid padding byte");
                var s = o(r);
                return a(t, s, 0, 0, r),
                s
            }
            var l = function() {
                function t(t) {
                    var e = []
                      , r = 0;
                    for (t = encodeURI(t); r < t.length; ) {
                        var i = t.charCodeAt(r++);
                        37 === i ? (e.push(parseInt(t.substr(r, 2), 16)),
                        r += 2) : e.push(i)
                    }
                    return n(e)
                }
                function e(t) {
                    for (var e = [], r = 0; r < t.length; ) {
                        var i = t[r];
                        i < 128 ? (e.push(String.fromCharCode(i)),
                        r++) : i > 191 && i < 224 ? (e.push(String.fromCharCode((31 & i) << 6 | 63 & t[r + 1])),
                        r += 2) : (e.push(String.fromCharCode((15 & i) << 12 | (63 & t[r + 1]) << 6 | 63 & t[r + 2])),
                        r += 3)
                    }
                    return e.join("")
                }
                return {
                    toBytes: t,
                    fromBytes: e
                }
            }()
              , h = function() {
                function t(t) {
                    for (var e = [], r = 0; r < t.length; r += 2)
                        e.push(parseInt(t.substr(r, 2), 16));
                    return e
                }
                function e(t) {
                    for (var e = [], i = 0; i < t.length; i++) {
                        var n = t[i];
                        e.push(r[(240 & n) >> 4] + r[15 & n])
                    }
                    return e.join("")
                }
                var r = "0123456789abcdef";
                return {
                    toBytes: t,
                    fromBytes: e
                }
            }()
              , f = {
                16: 10,
                24: 12,
                32: 14
            }
              , d = [1, 2, 4, 8, 16, 32, 64, 128, 27, 54, 108, 216, 171, 77, 154, 47, 94, 188, 99, 198, 151, 53, 106, 212, 179, 125, 250, 239, 197, 145]
              , p = [99, 124, 119, 123, 242, 107, 111, 197, 48, 1, 103, 43, 254, 215, 171, 118, 202, 130, 201, 125, 250, 89, 71, 240, 173, 212, 162, 175, 156, 164, 114, 192, 183, 253, 147, 38, 54, 63, 247, 204, 52, 165, 229, 241, 113, 216, 49, 21, 4, 199, 35, 195, 24, 150, 5, 154, 7, 18, 128, 226, 235, 39, 178, 117, 9, 131, 44, 26, 27, 110, 90, 160, 82, 59, 214, 179, 41, 227, 47, 132, 83, 209, 0, 237, 32, 252, 177, 91, 106, 203, 190, 57, 74, 76, 88, 207, 208, 239, 170, 251, 67, 77, 51, 133, 69, 249, 2, 127, 80, 60, 159, 168, 81, 163, 64, 143, 146, 157, 56, 245, 188, 182, 218, 33, 16, 255, 243, 210, 205, 12, 19, 236, 95, 151, 68, 23, 196, 167, 126, 61, 100, 93, 25, 115, 96, 129, 79, 220, 34, 42, 144, 136, 70, 238, 184, 20, 222, 94, 11, 219, 224, 50, 58, 10, 73, 6, 36, 92, 194, 211, 172, 98, 145, 149, 228, 121, 231, 200, 55, 109, 141, 213, 78, 169, 108, 86, 244, 234, 101, 122, 174, 8, 186, 120, 37, 46, 28, 166, 180, 198, 232, 221, 116, 31, 75, 189, 139, 138, 112, 62, 181, 102, 72, 3, 246, 14, 97, 53, 87, 185, 134, 193, 29, 158, 225, 248, 152, 17, 105, 217, 142, 148, 155, 30, 135, 233, 206, 85, 40, 223, 140, 161, 137, 13, 191, 230, 66, 104, 65, 153, 45, 15, 176, 84, 187, 22]
              , y = [82, 9, 106, 213, 48, 54, 165, 56, 191, 64, 163, 158, 129, 243, 215, 251, 124, 227, 57, 130, 155, 47, 255, 135, 52, 142, 67, 68, 196, 222, 233, 203, 84, 123, 148, 50, 166, 194, 35, 61, 238, 76, 149, 11, 66, 250, 195, 78, 8, 46, 161, 102, 40, 217, 36, 178, 118, 91, 162, 73, 109, 139, 209, 37, 114, 248, 246, 100, 134, 104, 152, 22, 212, 164, 92, 204, 93, 101, 182, 146, 108, 112, 72, 80, 253, 237, 185, 218, 94, 21, 70, 87, 167, 141, 157, 132, 144, 216, 171, 0, 140, 188, 211, 10, 247, 228, 88, 5, 184, 179, 69, 6, 208, 44, 30, 143, 202, 63, 15, 2, 193, 175, 189, 3, 1, 19, 138, 107, 58, 145, 17, 65, 79, 103, 220, 234, 151, 242, 207, 206, 240, 180, 230, 115, 150, 172, 116, 34, 231, 173, 53, 133, 226, 249, 55, 232, 28, 117, 223, 110, 71, 241, 26, 113, 29, 41, 197, 137, 111, 183, 98, 14, 170, 24, 190, 27, 252, 86, 62, 75, 198, 210, 121, 32, 154, 219, 192, 254, 120, 205, 90, 244, 31, 221, 168, 51, 136, 7, 199, 49, 177, 18, 16, 89, 39, 128, 236, 95, 96, 81, 127, 169, 25, 181, 74, 13, 45, 229, 122, 159, 147, 201, 156, 239, 160, 224, 59, 77, 174, 42, 245, 176, 200, 235, 187, 60, 131, 83, 153, 97, 23, 43, 4, 126, 186, 119, 214, 38, 225, 105, 20, 99, 85, 33, 12, 125]
              , g = [3328402341, 4168907908, 4000806809, 4135287693, 4294111757, 3597364157, 3731845041, 2445657428, 1613770832, 33620227, 3462883241, 1445669757, 3892248089, 3050821474, 1303096294, 3967186586, 2412431941, 528646813, 2311702848, 4202528135, 4026202645, 2992200171, 2387036105, 4226871307, 1101901292, 3017069671, 1604494077, 1169141738, 597466303, 1403299063, 3832705686, 2613100635, 1974974402, 3791519004, 1033081774, 1277568618, 1815492186, 2118074177, 4126668546, 2211236943, 1748251740, 1369810420, 3521504564, 4193382664, 3799085459, 2883115123, 1647391059, 706024767, 134480908, 2512897874, 1176707941, 2646852446, 806885416, 932615841, 168101135, 798661301, 235341577, 605164086, 461406363, 3756188221, 3454790438, 1311188841, 2142417613, 3933566367, 302582043, 495158174, 1479289972, 874125870, 907746093, 3698224818, 3025820398, 1537253627, 2756858614, 1983593293, 3084310113, 2108928974, 1378429307, 3722699582, 1580150641, 327451799, 2790478837, 3117535592, 0, 3253595436, 1075847264, 3825007647, 2041688520, 3059440621, 3563743934, 2378943302, 1740553945, 1916352843, 2487896798, 2555137236, 2958579944, 2244988746, 3151024235, 3320835882, 1336584933, 3992714006, 2252555205, 2588757463, 1714631509, 293963156, 2319795663, 3925473552, 67240454, 4269768577, 2689618160, 2017213508, 631218106, 1269344483, 2723238387, 1571005438, 2151694528, 93294474, 1066570413, 563977660, 1882732616, 4059428100, 1673313503, 2008463041, 2950355573, 1109467491, 537923632, 3858759450, 4260623118, 3218264685, 2177748300, 403442708, 638784309, 3287084079, 3193921505, 899127202, 2286175436, 773265209, 2479146071, 1437050866, 4236148354, 2050833735, 3362022572, 3126681063, 840505643, 3866325909, 3227541664, 427917720, 2655997905, 2749160575, 1143087718, 1412049534, 999329963, 193497219, 2353415882, 3354324521, 1807268051, 672404540, 2816401017, 3160301282, 369822493, 2916866934, 3688947771, 1681011286, 1949973070, 336202270, 2454276571, 201721354, 1210328172, 3093060836, 2680341085, 3184776046, 1135389935, 3294782118, 965841320, 831886756, 3554993207, 4068047243, 3588745010, 2345191491, 1849112409, 3664604599, 26054028, 2983581028, 2622377682, 1235855840, 3630984372, 2891339514, 4092916743, 3488279077, 3395642799, 4101667470, 1202630377, 268961816, 1874508501, 4034427016, 1243948399, 1546530418, 941366308, 1470539505, 1941222599, 2546386513, 3421038627, 2715671932, 3899946140, 1042226977, 2521517021, 1639824860, 227249030, 260737669, 3765465232, 2084453954, 1907733956, 3429263018, 2420656344, 100860677, 4160157185, 470683154, 3261161891, 1781871967, 2924959737, 1773779408, 394692241, 2579611992, 974986535, 664706745, 3655459128, 3958962195, 731420851, 571543859, 3530123707, 2849626480, 126783113, 865375399, 765172662, 1008606754, 361203602, 3387549984, 2278477385, 2857719295, 1344809080, 2782912378, 59542671, 1503764984, 160008576, 437062935, 1707065306, 3622233649, 2218934982, 3496503480, 2185314755, 697932208, 1512910199, 504303377, 2075177163, 2824099068, 1841019862, 739644986]
              , v = [2781242211, 2230877308, 2582542199, 2381740923, 234877682, 3184946027, 2984144751, 1418839493, 1348481072, 50462977, 2848876391, 2102799147, 434634494, 1656084439, 3863849899, 2599188086, 1167051466, 2636087938, 1082771913, 2281340285, 368048890, 3954334041, 3381544775, 201060592, 3963727277, 1739838676, 4250903202, 3930435503, 3206782108, 4149453988, 2531553906, 1536934080, 3262494647, 484572669, 2923271059, 1783375398, 1517041206, 1098792767, 49674231, 1334037708, 1550332980, 4098991525, 886171109, 150598129, 2481090929, 1940642008, 1398944049, 1059722517, 201851908, 1385547719, 1699095331, 1587397571, 674240536, 2704774806, 252314885, 3039795866, 151914247, 908333586, 2602270848, 1038082786, 651029483, 1766729511, 3447698098, 2682942837, 454166793, 2652734339, 1951935532, 775166490, 758520603, 3000790638, 4004797018, 4217086112, 4137964114, 1299594043, 1639438038, 3464344499, 2068982057, 1054729187, 1901997871, 2534638724, 4121318227, 1757008337, 0, 750906861, 1614815264, 535035132, 3363418545, 3988151131, 3201591914, 1183697867, 3647454910, 1265776953, 3734260298, 3566750796, 3903871064, 1250283471, 1807470800, 717615087, 3847203498, 384695291, 3313910595, 3617213773, 1432761139, 2484176261, 3481945413, 283769337, 100925954, 2180939647, 4037038160, 1148730428, 3123027871, 3813386408, 4087501137, 4267549603, 3229630528, 2315620239, 2906624658, 3156319645, 1215313976, 82966005, 3747855548, 3245848246, 1974459098, 1665278241, 807407632, 451280895, 251524083, 1841287890, 1283575245, 337120268, 891687699, 801369324, 3787349855, 2721421207, 3431482436, 959321879, 1469301956, 4065699751, 2197585534, 1199193405, 2898814052, 3887750493, 724703513, 2514908019, 2696962144, 2551808385, 3516813135, 2141445340, 1715741218, 2119445034, 2872807568, 2198571144, 3398190662, 700968686, 3547052216, 1009259540, 2041044702, 3803995742, 487983883, 1991105499, 1004265696, 1449407026, 1316239930, 504629770, 3683797321, 168560134, 1816667172, 3837287516, 1570751170, 1857934291, 4014189740, 2797888098, 2822345105, 2754712981, 936633572, 2347923833, 852879335, 1133234376, 1500395319, 3084545389, 2348912013, 1689376213, 3533459022, 3762923945, 3034082412, 4205598294, 133428468, 634383082, 2949277029, 2398386810, 3913789102, 403703816, 3580869306, 2297460856, 1867130149, 1918643758, 607656988, 4049053350, 3346248884, 1368901318, 600565992, 2090982877, 2632479860, 557719327, 3717614411, 3697393085, 2249034635, 2232388234, 2430627952, 1115438654, 3295786421, 2865522278, 3633334344, 84280067, 33027830, 303828494, 2747425121, 1600795957, 4188952407, 3496589753, 2434238086, 1486471617, 658119965, 3106381470, 953803233, 334231800, 3005978776, 857870609, 3151128937, 1890179545, 2298973838, 2805175444, 3056442267, 574365214, 2450884487, 550103529, 1233637070, 4289353045, 2018519080, 2057691103, 2399374476, 4166623649, 2148108681, 387583245, 3664101311, 836232934, 3330556482, 3100665960, 3280093505, 2955516313, 2002398509, 287182607, 3413881008, 4238890068, 3597515707, 975967766]
              , m = [1671808611, 2089089148, 2006576759, 2072901243, 4061003762, 1807603307, 1873927791, 3310653893, 810573872, 16974337, 1739181671, 729634347, 4263110654, 3613570519, 2883997099, 1989864566, 3393556426, 2191335298, 3376449993, 2106063485, 4195741690, 1508618841, 1204391495, 4027317232, 2917941677, 3563566036, 2734514082, 2951366063, 2629772188, 2767672228, 1922491506, 3227229120, 3082974647, 4246528509, 2477669779, 644500518, 911895606, 1061256767, 4144166391, 3427763148, 878471220, 2784252325, 3845444069, 4043897329, 1905517169, 3631459288, 827548209, 356461077, 67897348, 3344078279, 593839651, 3277757891, 405286936, 2527147926, 84871685, 2595565466, 118033927, 305538066, 2157648768, 3795705826, 3945188843, 661212711, 2999812018, 1973414517, 152769033, 2208177539, 745822252, 439235610, 455947803, 1857215598, 1525593178, 2700827552, 1391895634, 994932283, 3596728278, 3016654259, 695947817, 3812548067, 795958831, 2224493444, 1408607827, 3513301457, 0, 3979133421, 543178784, 4229948412, 2982705585, 1542305371, 1790891114, 3410398667, 3201918910, 961245753, 1256100938, 1289001036, 1491644504, 3477767631, 3496721360, 4012557807, 2867154858, 4212583931, 1137018435, 1305975373, 861234739, 2241073541, 1171229253, 4178635257, 33948674, 2139225727, 1357946960, 1011120188, 2679776671, 2833468328, 1374921297, 2751356323, 1086357568, 2408187279, 2460827538, 2646352285, 944271416, 4110742005, 3168756668, 3066132406, 3665145818, 560153121, 271589392, 4279952895, 4077846003, 3530407890, 3444343245, 202643468, 322250259, 3962553324, 1608629855, 2543990167, 1154254916, 389623319, 3294073796, 2817676711, 2122513534, 1028094525, 1689045092, 1575467613, 422261273, 1939203699, 1621147744, 2174228865, 1339137615, 3699352540, 577127458, 712922154, 2427141008, 2290289544, 1187679302, 3995715566, 3100863416, 339486740, 3732514782, 1591917662, 186455563, 3681988059, 3762019296, 844522546, 978220090, 169743370, 1239126601, 101321734, 611076132, 1558493276, 3260915650, 3547250131, 2901361580, 1655096418, 2443721105, 2510565781, 3828863972, 2039214713, 3878868455, 3359869896, 928607799, 1840765549, 2374762893, 3580146133, 1322425422, 2850048425, 1823791212, 1459268694, 4094161908, 3928346602, 1706019429, 2056189050, 2934523822, 135794696, 3134549946, 2022240376, 628050469, 779246638, 472135708, 2800834470, 3032970164, 3327236038, 3894660072, 3715932637, 1956440180, 522272287, 1272813131, 3185336765, 2340818315, 2323976074, 1888542832, 1044544574, 3049550261, 1722469478, 1222152264, 50660867, 4127324150, 236067854, 1638122081, 895445557, 1475980887, 3117443513, 2257655686, 3243809217, 489110045, 2662934430, 3778599393, 4162055160, 2561878936, 288563729, 1773916777, 3648039385, 2391345038, 2493985684, 2612407707, 505560094, 2274497927, 3911240169, 3460925390, 1442818645, 678973480, 3749357023, 2358182796, 2717407649, 2306869641, 219617805, 3218761151, 3862026214, 1120306242, 1756942440, 1103331905, 2578459033, 762796589, 252780047, 2966125488, 1425844308, 3151392187, 372911126]
              , b = [1667474886, 2088535288, 2004326894, 2071694838, 4075949567, 1802223062, 1869591006, 3318043793, 808472672, 16843522, 1734846926, 724270422, 4278065639, 3621216949, 2880169549, 1987484396, 3402253711, 2189597983, 3385409673, 2105378810, 4210693615, 1499065266, 1195886990, 4042263547, 2913856577, 3570689971, 2728590687, 2947541573, 2627518243, 2762274643, 1920112356, 3233831835, 3082273397, 4261223649, 2475929149, 640051788, 909531756, 1061110142, 4160160501, 3435941763, 875846760, 2779116625, 3857003729, 4059105529, 1903268834, 3638064043, 825316194, 353713962, 67374088, 3351728789, 589522246, 3284360861, 404236336, 2526454071, 84217610, 2593830191, 117901582, 303183396, 2155911963, 3806477791, 3958056653, 656894286, 2998062463, 1970642922, 151591698, 2206440989, 741110872, 437923380, 454765878, 1852748508, 1515908788, 2694904667, 1381168804, 993742198, 3604373943, 3014905469, 690584402, 3823320797, 791638366, 2223281939, 1398011302, 3520161977, 0, 3991743681, 538992704, 4244381667, 2981218425, 1532751286, 1785380564, 3419096717, 3200178535, 960056178, 1246420628, 1280103576, 1482221744, 3486468741, 3503319995, 4025428677, 2863326543, 4227536621, 1128514950, 1296947098, 859002214, 2240123921, 1162203018, 4193849577, 33687044, 2139062782, 1347481760, 1010582648, 2678045221, 2829640523, 1364325282, 2745433693, 1077985408, 2408548869, 2459086143, 2644360225, 943212656, 4126475505, 3166494563, 3065430391, 3671750063, 555836226, 269496352, 4294908645, 4092792573, 3537006015, 3452783745, 202118168, 320025894, 3974901699, 1600119230, 2543297077, 1145359496, 387397934, 3301201811, 2812801621, 2122220284, 1027426170, 1684319432, 1566435258, 421079858, 1936954854, 1616945344, 2172753945, 1330631070, 3705438115, 572679748, 707427924, 2425400123, 2290647819, 1179044492, 4008585671, 3099120491, 336870440, 3739122087, 1583276732, 185277718, 3688593069, 3772791771, 842159716, 976899700, 168435220, 1229577106, 101059084, 606366792, 1549591736, 3267517855, 3553849021, 2897014595, 1650632388, 2442242105, 2509612081, 3840161747, 2038008818, 3890688725, 3368567691, 926374254, 1835907034, 2374863873, 3587531953, 1313788572, 2846482505, 1819063512, 1448540844, 4109633523, 3941213647, 1701162954, 2054852340, 2930698567, 134748176, 3132806511, 2021165296, 623210314, 774795868, 471606328, 2795958615, 3031746419, 3334885783, 3907527627, 3722280097, 1953799400, 522133822, 1263263126, 3183336545, 2341176845, 2324333839, 1886425312, 1044267644, 3048588401, 1718004428, 1212733584, 50529542, 4143317495, 235803164, 1633788866, 892690282, 1465383342, 3115962473, 2256965911, 3250673817, 488449850, 2661202215, 3789633753, 4177007595, 2560144171, 286339874, 1768537042, 3654906025, 2391705863, 2492770099, 2610673197, 505291324, 2273808917, 3924369609, 3469625735, 1431699370, 673740880, 3755965093, 2358021891, 2711746649, 2307489801, 218961690, 3217021541, 3873845719, 1111672452, 1751693520, 1094828930, 2576986153, 757954394, 252645662, 2964376443, 1414855848, 3149649517, 370555436]
              , S = [1374988112, 2118214995, 437757123, 975658646, 1001089995, 530400753, 2902087851, 1273168787, 540080725, 2910219766, 2295101073, 4110568485, 1340463100, 3307916247, 641025152, 3043140495, 3736164937, 632953703, 1172967064, 1576976609, 3274667266, 2169303058, 2370213795, 1809054150, 59727847, 361929877, 3211623147, 2505202138, 3569255213, 1484005843, 1239443753, 2395588676, 1975683434, 4102977912, 2572697195, 666464733, 3202437046, 4035489047, 3374361702, 2110667444, 1675577880, 3843699074, 2538681184, 1649639237, 2976151520, 3144396420, 4269907996, 4178062228, 1883793496, 2403728665, 2497604743, 1383856311, 2876494627, 1917518562, 3810496343, 1716890410, 3001755655, 800440835, 2261089178, 3543599269, 807962610, 599762354, 33778362, 3977675356, 2328828971, 2809771154, 4077384432, 1315562145, 1708848333, 101039829, 3509871135, 3299278474, 875451293, 2733856160, 92987698, 2767645557, 193195065, 1080094634, 1584504582, 3178106961, 1042385657, 2531067453, 3711829422, 1306967366, 2438237621, 1908694277, 67556463, 1615861247, 429456164, 3602770327, 2302690252, 1742315127, 2968011453, 126454664, 3877198648, 2043211483, 2709260871, 2084704233, 4169408201, 0, 159417987, 841739592, 504459436, 1817866830, 4245618683, 260388950, 1034867998, 908933415, 168810852, 1750902305, 2606453969, 607530554, 202008497, 2472011535, 3035535058, 463180190, 2160117071, 1641816226, 1517767529, 470948374, 3801332234, 3231722213, 1008918595, 303765277, 235474187, 4069246893, 766945465, 337553864, 1475418501, 2943682380, 4003061179, 2743034109, 4144047775, 1551037884, 1147550661, 1543208500, 2336434550, 3408119516, 3069049960, 3102011747, 3610369226, 1113818384, 328671808, 2227573024, 2236228733, 3535486456, 2935566865, 3341394285, 496906059, 3702665459, 226906860, 2009195472, 733156972, 2842737049, 294930682, 1206477858, 2835123396, 2700099354, 1451044056, 573804783, 2269728455, 3644379585, 2362090238, 2564033334, 2801107407, 2776292904, 3669462566, 1068351396, 742039012, 1350078989, 1784663195, 1417561698, 4136440770, 2430122216, 775550814, 2193862645, 2673705150, 1775276924, 1876241833, 3475313331, 3366754619, 270040487, 3902563182, 3678124923, 3441850377, 1851332852, 3969562369, 2203032232, 3868552805, 2868897406, 566021896, 4011190502, 3135740889, 1248802510, 3936291284, 699432150, 832877231, 708780849, 3332740144, 899835584, 1951317047, 4236429990, 3767586992, 866637845, 4043610186, 1106041591, 2144161806, 395441711, 1984812685, 1139781709, 3433712980, 3835036895, 2664543715, 1282050075, 3240894392, 1181045119, 2640243204, 25965917, 4203181171, 4211818798, 3009879386, 2463879762, 3910161971, 1842759443, 2597806476, 933301370, 1509430414, 3943906441, 3467192302, 3076639029, 3776767469, 2051518780, 2631065433, 1441952575, 404016761, 1942435775, 1408749034, 1610459739, 3745345300, 2017778566, 3400528769, 3110650942, 941896748, 3265478751, 371049330, 3168937228, 675039627, 4279080257, 967311729, 135050206, 3635733660, 1683407248, 2076935265, 3576870512, 1215061108, 3501741890]
              , E = [1347548327, 1400783205, 3273267108, 2520393566, 3409685355, 4045380933, 2880240216, 2471224067, 1428173050, 4138563181, 2441661558, 636813900, 4233094615, 3620022987, 2149987652, 2411029155, 1239331162, 1730525723, 2554718734, 3781033664, 46346101, 310463728, 2743944855, 3328955385, 3875770207, 2501218972, 3955191162, 3667219033, 768917123, 3545789473, 692707433, 1150208456, 1786102409, 2029293177, 1805211710, 3710368113, 3065962831, 401639597, 1724457132, 3028143674, 409198410, 2196052529, 1620529459, 1164071807, 3769721975, 2226875310, 486441376, 2499348523, 1483753576, 428819965, 2274680428, 3075636216, 598438867, 3799141122, 1474502543, 711349675, 129166120, 53458370, 2592523643, 2782082824, 4063242375, 2988687269, 3120694122, 1559041666, 730517276, 2460449204, 4042459122, 2706270690, 3446004468, 3573941694, 533804130, 2328143614, 2637442643, 2695033685, 839224033, 1973745387, 957055980, 2856345839, 106852767, 1371368976, 4181598602, 1033297158, 2933734917, 1179510461, 3046200461, 91341917, 1862534868, 4284502037, 605657339, 2547432937, 3431546947, 2003294622, 3182487618, 2282195339, 954669403, 3682191598, 1201765386, 3917234703, 3388507166, 0, 2198438022, 1211247597, 2887651696, 1315723890, 4227665663, 1443857720, 507358933, 657861945, 1678381017, 560487590, 3516619604, 975451694, 2970356327, 261314535, 3535072918, 2652609425, 1333838021, 2724322336, 1767536459, 370938394, 182621114, 3854606378, 1128014560, 487725847, 185469197, 2918353863, 3106780840, 3356761769, 2237133081, 1286567175, 3152976349, 4255350624, 2683765030, 3160175349, 3309594171, 878443390, 1988838185, 3704300486, 1756818940, 1673061617, 3403100636, 272786309, 1075025698, 545572369, 2105887268, 4174560061, 296679730, 1841768865, 1260232239, 4091327024, 3960309330, 3497509347, 1814803222, 2578018489, 4195456072, 575138148, 3299409036, 446754879, 3629546796, 4011996048, 3347532110, 3252238545, 4270639778, 915985419, 3483825537, 681933534, 651868046, 2755636671, 3828103837, 223377554, 2607439820, 1649704518, 3270937875, 3901806776, 1580087799, 4118987695, 3198115200, 2087309459, 2842678573, 3016697106, 1003007129, 2802849917, 1860738147, 2077965243, 164439672, 4100872472, 32283319, 2827177882, 1709610350, 2125135846, 136428751, 3874428392, 3652904859, 3460984630, 3572145929, 3593056380, 2939266226, 824852259, 818324884, 3224740454, 930369212, 2801566410, 2967507152, 355706840, 1257309336, 4148292826, 243256656, 790073846, 2373340630, 1296297904, 1422699085, 3756299780, 3818836405, 457992840, 3099667487, 2135319889, 77422314, 1560382517, 1945798516, 788204353, 1521706781, 1385356242, 870912086, 325965383, 2358957921, 2050466060, 2388260884, 2313884476, 4006521127, 901210569, 3990953189, 1014646705, 1503449823, 1062597235, 2031621326, 3212035895, 3931371469, 1533017514, 350174575, 2256028891, 2177544179, 1052338372, 741876788, 1606591296, 1914052035, 213705253, 2334669897, 1107234197, 1899603969, 3725069491, 2631447780, 2422494913, 1635502980, 1893020342, 1950903388, 1120974935]
              , T = [2807058932, 1699970625, 2764249623, 1586903591, 1808481195, 1173430173, 1487645946, 59984867, 4199882800, 1844882806, 1989249228, 1277555970, 3623636965, 3419915562, 1149249077, 2744104290, 1514790577, 459744698, 244860394, 3235995134, 1963115311, 4027744588, 2544078150, 4190530515, 1608975247, 2627016082, 2062270317, 1507497298, 2200818878, 567498868, 1764313568, 3359936201, 2305455554, 2037970062, 1047239e3, 1910319033, 1337376481, 2904027272, 2892417312, 984907214, 1243112415, 830661914, 861968209, 2135253587, 2011214180, 2927934315, 2686254721, 731183368, 1750626376, 4246310725, 1820824798, 4172763771, 3542330227, 48394827, 2404901663, 2871682645, 671593195, 3254988725, 2073724613, 145085239, 2280796200, 2779915199, 1790575107, 2187128086, 472615631, 3029510009, 4075877127, 3802222185, 4107101658, 3201631749, 1646252340, 4270507174, 1402811438, 1436590835, 3778151818, 3950355702, 3963161475, 4020912224, 2667994737, 273792366, 2331590177, 104699613, 95345982, 3175501286, 2377486676, 1560637892, 3564045318, 369057872, 4213447064, 3919042237, 1137477952, 2658625497, 1119727848, 2340947849, 1530455833, 4007360968, 172466556, 266959938, 516552836, 0, 2256734592, 3980931627, 1890328081, 1917742170, 4294704398, 945164165, 3575528878, 958871085, 3647212047, 2787207260, 1423022939, 775562294, 1739656202, 3876557655, 2530391278, 2443058075, 3310321856, 547512796, 1265195639, 437656594, 3121275539, 719700128, 3762502690, 387781147, 218828297, 3350065803, 2830708150, 2848461854, 428169201, 122466165, 3720081049, 1627235199, 648017665, 4122762354, 1002783846, 2117360635, 695634755, 3336358691, 4234721005, 4049844452, 3704280881, 2232435299, 574624663, 287343814, 612205898, 1039717051, 840019705, 2708326185, 793451934, 821288114, 1391201670, 3822090177, 376187827, 3113855344, 1224348052, 1679968233, 2361698556, 1058709744, 752375421, 2431590963, 1321699145, 3519142200, 2734591178, 188127444, 2177869557, 3727205754, 2384911031, 3215212461, 2648976442, 2450346104, 3432737375, 1180849278, 331544205, 3102249176, 4150144569, 2952102595, 2159976285, 2474404304, 766078933, 313773861, 2570832044, 2108100632, 1668212892, 3145456443, 2013908262, 418672217, 3070356634, 2594734927, 1852171925, 3867060991, 3473416636, 3907448597, 2614737639, 919489135, 164948639, 2094410160, 2997825956, 590424639, 2486224549, 1723872674, 3157750862, 3399941250, 3501252752, 3625268135, 2555048196, 3673637356, 1343127501, 4130281361, 3599595085, 2957853679, 1297403050, 81781910, 3051593425, 2283490410, 532201772, 1367295589, 3926170974, 895287692, 1953757831, 1093597963, 492483431, 3528626907, 1446242576, 1192455638, 1636604631, 209336225, 344873464, 1015671571, 669961897, 3375740769, 3857572124, 2973530695, 3747192018, 1933530610, 3464042516, 935293895, 3454686199, 2858115069, 1863638845, 3683022916, 4085369519, 3292445032, 875313188, 1080017571, 3279033885, 621591778, 1233856572, 2504130317, 24197544, 3017672716, 3835484340, 3247465558, 2220981195, 3060847922, 1551124588, 1463996600]
              , _ = [4104605777, 1097159550, 396673818, 660510266, 2875968315, 2638606623, 4200115116, 3808662347, 821712160, 1986918061, 3430322568, 38544885, 3856137295, 718002117, 893681702, 1654886325, 2975484382, 3122358053, 3926825029, 4274053469, 796197571, 1290801793, 1184342925, 3556361835, 2405426947, 2459735317, 1836772287, 1381620373, 3196267988, 1948373848, 3764988233, 3385345166, 3263785589, 2390325492, 1480485785, 3111247143, 3780097726, 2293045232, 548169417, 3459953789, 3746175075, 439452389, 1362321559, 1400849762, 1685577905, 1806599355, 2174754046, 137073913, 1214797936, 1174215055, 3731654548, 2079897426, 1943217067, 1258480242, 529487843, 1437280870, 3945269170, 3049390895, 3313212038, 923313619, 679998e3, 3215307299, 57326082, 377642221, 3474729866, 2041877159, 133361907, 1776460110, 3673476453, 96392454, 878845905, 2801699524, 777231668, 4082475170, 2330014213, 4142626212, 2213296395, 1626319424, 1906247262, 1846563261, 562755902, 3708173718, 1040559837, 3871163981, 1418573201, 3294430577, 114585348, 1343618912, 2566595609, 3186202582, 1078185097, 3651041127, 3896688048, 2307622919, 425408743, 3371096953, 2081048481, 1108339068, 2216610296, 0, 2156299017, 736970802, 292596766, 1517440620, 251657213, 2235061775, 2933202493, 758720310, 265905162, 1554391400, 1532285339, 908999204, 174567692, 1474760595, 4002861748, 2610011675, 3234156416, 3693126241, 2001430874, 303699484, 2478443234, 2687165888, 585122620, 454499602, 151849742, 2345119218, 3064510765, 514443284, 4044981591, 1963412655, 2581445614, 2137062819, 19308535, 1928707164, 1715193156, 4219352155, 1126790795, 600235211, 3992742070, 3841024952, 836553431, 1669664834, 2535604243, 3323011204, 1243905413, 3141400786, 4180808110, 698445255, 2653899549, 2989552604, 2253581325, 3252932727, 3004591147, 1891211689, 2487810577, 3915653703, 4237083816, 4030667424, 2100090966, 865136418, 1229899655, 953270745, 3399679628, 3557504664, 4118925222, 2061379749, 3079546586, 2915017791, 983426092, 2022837584, 1607244650, 2118541908, 2366882550, 3635996816, 972512814, 3283088770, 1568718495, 3499326569, 3576539503, 621982671, 2895723464, 410887952, 2623762152, 1002142683, 645401037, 1494807662, 2595684844, 1335535747, 2507040230, 4293295786, 3167684641, 367585007, 3885750714, 1865862730, 2668221674, 2960971305, 2763173681, 1059270954, 2777952454, 2724642869, 1320957812, 2194319100, 2429595872, 2815956275, 77089521, 3973773121, 3444575871, 2448830231, 1305906550, 4021308739, 2857194700, 2516901860, 3518358430, 1787304780, 740276417, 1699839814, 1592394909, 2352307457, 2272556026, 188821243, 1729977011, 3687994002, 274084841, 3594982253, 3613494426, 2701949495, 4162096729, 322734571, 2837966542, 1640576439, 484830689, 1202797690, 3537852828, 4067639125, 349075736, 3342319475, 4157467219, 4255800159, 1030690015, 1155237496, 2951971274, 1757691577, 607398968, 2738905026, 499347990, 3794078908, 1011452712, 227885567, 2818666809, 213114376, 3034881240, 1455525988, 3414450555, 850817237, 1817998408, 3092726480]
              , w = [0, 235474187, 470948374, 303765277, 941896748, 908933415, 607530554, 708780849, 1883793496, 2118214995, 1817866830, 1649639237, 1215061108, 1181045119, 1417561698, 1517767529, 3767586992, 4003061179, 4236429990, 4069246893, 3635733660, 3602770327, 3299278474, 3400528769, 2430122216, 2664543715, 2362090238, 2193862645, 2835123396, 2801107407, 3035535058, 3135740889, 3678124923, 3576870512, 3341394285, 3374361702, 3810496343, 3977675356, 4279080257, 4043610186, 2876494627, 2776292904, 3076639029, 3110650942, 2472011535, 2640243204, 2403728665, 2169303058, 1001089995, 899835584, 666464733, 699432150, 59727847, 226906860, 530400753, 294930682, 1273168787, 1172967064, 1475418501, 1509430414, 1942435775, 2110667444, 1876241833, 1641816226, 2910219766, 2743034109, 2976151520, 3211623147, 2505202138, 2606453969, 2302690252, 2269728455, 3711829422, 3543599269, 3240894392, 3475313331, 3843699074, 3943906441, 4178062228, 4144047775, 1306967366, 1139781709, 1374988112, 1610459739, 1975683434, 2076935265, 1775276924, 1742315127, 1034867998, 866637845, 566021896, 800440835, 92987698, 193195065, 429456164, 395441711, 1984812685, 2017778566, 1784663195, 1683407248, 1315562145, 1080094634, 1383856311, 1551037884, 101039829, 135050206, 437757123, 337553864, 1042385657, 807962610, 573804783, 742039012, 2531067453, 2564033334, 2328828971, 2227573024, 2935566865, 2700099354, 3001755655, 3168937228, 3868552805, 3902563182, 4203181171, 4102977912, 3736164937, 3501741890, 3265478751, 3433712980, 1106041591, 1340463100, 1576976609, 1408749034, 2043211483, 2009195472, 1708848333, 1809054150, 832877231, 1068351396, 766945465, 599762354, 159417987, 126454664, 361929877, 463180190, 2709260871, 2943682380, 3178106961, 3009879386, 2572697195, 2538681184, 2236228733, 2336434550, 3509871135, 3745345300, 3441850377, 3274667266, 3910161971, 3877198648, 4110568485, 4211818798, 2597806476, 2497604743, 2261089178, 2295101073, 2733856160, 2902087851, 3202437046, 2968011453, 3936291284, 3835036895, 4136440770, 4169408201, 3535486456, 3702665459, 3467192302, 3231722213, 2051518780, 1951317047, 1716890410, 1750902305, 1113818384, 1282050075, 1584504582, 1350078989, 168810852, 67556463, 371049330, 404016761, 841739592, 1008918595, 775550814, 540080725, 3969562369, 3801332234, 4035489047, 4269907996, 3569255213, 3669462566, 3366754619, 3332740144, 2631065433, 2463879762, 2160117071, 2395588676, 2767645557, 2868897406, 3102011747, 3069049960, 202008497, 33778362, 270040487, 504459436, 875451293, 975658646, 675039627, 641025152, 2084704233, 1917518562, 1615861247, 1851332852, 1147550661, 1248802510, 1484005843, 1451044056, 933301370, 967311729, 733156972, 632953703, 260388950, 25965917, 328671808, 496906059, 1206477858, 1239443753, 1543208500, 1441952575, 2144161806, 1908694277, 1675577880, 1842759443, 3610369226, 3644379585, 3408119516, 3307916247, 4011190502, 3776767469, 4077384432, 4245618683, 2809771154, 2842737049, 3144396420, 3043140495, 2673705150, 2438237621, 2203032232, 2370213795]
              , A = [0, 185469197, 370938394, 487725847, 741876788, 657861945, 975451694, 824852259, 1483753576, 1400783205, 1315723890, 1164071807, 1950903388, 2135319889, 1649704518, 1767536459, 2967507152, 3152976349, 2801566410, 2918353863, 2631447780, 2547432937, 2328143614, 2177544179, 3901806776, 3818836405, 4270639778, 4118987695, 3299409036, 3483825537, 3535072918, 3652904859, 2077965243, 1893020342, 1841768865, 1724457132, 1474502543, 1559041666, 1107234197, 1257309336, 598438867, 681933534, 901210569, 1052338372, 261314535, 77422314, 428819965, 310463728, 3409685355, 3224740454, 3710368113, 3593056380, 3875770207, 3960309330, 4045380933, 4195456072, 2471224067, 2554718734, 2237133081, 2388260884, 3212035895, 3028143674, 2842678573, 2724322336, 4138563181, 4255350624, 3769721975, 3955191162, 3667219033, 3516619604, 3431546947, 3347532110, 2933734917, 2782082824, 3099667487, 3016697106, 2196052529, 2313884476, 2499348523, 2683765030, 1179510461, 1296297904, 1347548327, 1533017514, 1786102409, 1635502980, 2087309459, 2003294622, 507358933, 355706840, 136428751, 53458370, 839224033, 957055980, 605657339, 790073846, 2373340630, 2256028891, 2607439820, 2422494913, 2706270690, 2856345839, 3075636216, 3160175349, 3573941694, 3725069491, 3273267108, 3356761769, 4181598602, 4063242375, 4011996048, 3828103837, 1033297158, 915985419, 730517276, 545572369, 296679730, 446754879, 129166120, 213705253, 1709610350, 1860738147, 1945798516, 2029293177, 1239331162, 1120974935, 1606591296, 1422699085, 4148292826, 4233094615, 3781033664, 3931371469, 3682191598, 3497509347, 3446004468, 3328955385, 2939266226, 2755636671, 3106780840, 2988687269, 2198438022, 2282195339, 2501218972, 2652609425, 1201765386, 1286567175, 1371368976, 1521706781, 1805211710, 1620529459, 2105887268, 1988838185, 533804130, 350174575, 164439672, 46346101, 870912086, 954669403, 636813900, 788204353, 2358957921, 2274680428, 2592523643, 2441661558, 2695033685, 2880240216, 3065962831, 3182487618, 3572145929, 3756299780, 3270937875, 3388507166, 4174560061, 4091327024, 4006521127, 3854606378, 1014646705, 930369212, 711349675, 560487590, 272786309, 457992840, 106852767, 223377554, 1678381017, 1862534868, 1914052035, 2031621326, 1211247597, 1128014560, 1580087799, 1428173050, 32283319, 182621114, 401639597, 486441376, 768917123, 651868046, 1003007129, 818324884, 1503449823, 1385356242, 1333838021, 1150208456, 1973745387, 2125135846, 1673061617, 1756818940, 2970356327, 3120694122, 2802849917, 2887651696, 2637442643, 2520393566, 2334669897, 2149987652, 3917234703, 3799141122, 4284502037, 4100872472, 3309594171, 3460984630, 3545789473, 3629546796, 2050466060, 1899603969, 1814803222, 1730525723, 1443857720, 1560382517, 1075025698, 1260232239, 575138148, 692707433, 878443390, 1062597235, 243256656, 91341917, 409198410, 325965383, 3403100636, 3252238545, 3704300486, 3620022987, 3874428392, 3990953189, 4042459122, 4227665663, 2460449204, 2578018489, 2226875310, 2411029155, 3198115200, 3046200461, 2827177882, 2743944855]
              , R = [0, 218828297, 437656594, 387781147, 875313188, 958871085, 775562294, 590424639, 1750626376, 1699970625, 1917742170, 2135253587, 1551124588, 1367295589, 1180849278, 1265195639, 3501252752, 3720081049, 3399941250, 3350065803, 3835484340, 3919042237, 4270507174, 4085369519, 3102249176, 3051593425, 2734591178, 2952102595, 2361698556, 2177869557, 2530391278, 2614737639, 3145456443, 3060847922, 2708326185, 2892417312, 2404901663, 2187128086, 2504130317, 2555048196, 3542330227, 3727205754, 3375740769, 3292445032, 3876557655, 3926170974, 4246310725, 4027744588, 1808481195, 1723872674, 1910319033, 2094410160, 1608975247, 1391201670, 1173430173, 1224348052, 59984867, 244860394, 428169201, 344873464, 935293895, 984907214, 766078933, 547512796, 1844882806, 1627235199, 2011214180, 2062270317, 1507497298, 1423022939, 1137477952, 1321699145, 95345982, 145085239, 532201772, 313773861, 830661914, 1015671571, 731183368, 648017665, 3175501286, 2957853679, 2807058932, 2858115069, 2305455554, 2220981195, 2474404304, 2658625497, 3575528878, 3625268135, 3473416636, 3254988725, 3778151818, 3963161475, 4213447064, 4130281361, 3599595085, 3683022916, 3432737375, 3247465558, 3802222185, 4020912224, 4172763771, 4122762354, 3201631749, 3017672716, 2764249623, 2848461854, 2331590177, 2280796200, 2431590963, 2648976442, 104699613, 188127444, 472615631, 287343814, 840019705, 1058709744, 671593195, 621591778, 1852171925, 1668212892, 1953757831, 2037970062, 1514790577, 1463996600, 1080017571, 1297403050, 3673637356, 3623636965, 3235995134, 3454686199, 4007360968, 3822090177, 4107101658, 4190530515, 2997825956, 3215212461, 2830708150, 2779915199, 2256734592, 2340947849, 2627016082, 2443058075, 172466556, 122466165, 273792366, 492483431, 1047239e3, 861968209, 612205898, 695634755, 1646252340, 1863638845, 2013908262, 1963115311, 1446242576, 1530455833, 1277555970, 1093597963, 1636604631, 1820824798, 2073724613, 1989249228, 1436590835, 1487645946, 1337376481, 1119727848, 164948639, 81781910, 331544205, 516552836, 1039717051, 821288114, 669961897, 719700128, 2973530695, 3157750862, 2871682645, 2787207260, 2232435299, 2283490410, 2667994737, 2450346104, 3647212047, 3564045318, 3279033885, 3464042516, 3980931627, 3762502690, 4150144569, 4199882800, 3070356634, 3121275539, 2904027272, 2686254721, 2200818878, 2384911031, 2570832044, 2486224549, 3747192018, 3528626907, 3310321856, 3359936201, 3950355702, 3867060991, 4049844452, 4234721005, 1739656202, 1790575107, 2108100632, 1890328081, 1402811438, 1586903591, 1233856572, 1149249077, 266959938, 48394827, 369057872, 418672217, 1002783846, 919489135, 567498868, 752375421, 209336225, 24197544, 376187827, 459744698, 945164165, 895287692, 574624663, 793451934, 1679968233, 1764313568, 2117360635, 1933530610, 1343127501, 1560637892, 1243112415, 1192455638, 3704280881, 3519142200, 3336358691, 3419915562, 3907448597, 3857572124, 4075877127, 4294704398, 3029510009, 3113855344, 2927934315, 2744104290, 2159976285, 2377486676, 2594734927, 2544078150]
              , D = [0, 151849742, 303699484, 454499602, 607398968, 758720310, 908999204, 1059270954, 1214797936, 1097159550, 1517440620, 1400849762, 1817998408, 1699839814, 2118541908, 2001430874, 2429595872, 2581445614, 2194319100, 2345119218, 3034881240, 3186202582, 2801699524, 2951971274, 3635996816, 3518358430, 3399679628, 3283088770, 4237083816, 4118925222, 4002861748, 3885750714, 1002142683, 850817237, 698445255, 548169417, 529487843, 377642221, 227885567, 77089521, 1943217067, 2061379749, 1640576439, 1757691577, 1474760595, 1592394909, 1174215055, 1290801793, 2875968315, 2724642869, 3111247143, 2960971305, 2405426947, 2253581325, 2638606623, 2487810577, 3808662347, 3926825029, 4044981591, 4162096729, 3342319475, 3459953789, 3576539503, 3693126241, 1986918061, 2137062819, 1685577905, 1836772287, 1381620373, 1532285339, 1078185097, 1229899655, 1040559837, 923313619, 740276417, 621982671, 439452389, 322734571, 137073913, 19308535, 3871163981, 4021308739, 4104605777, 4255800159, 3263785589, 3414450555, 3499326569, 3651041127, 2933202493, 2815956275, 3167684641, 3049390895, 2330014213, 2213296395, 2566595609, 2448830231, 1305906550, 1155237496, 1607244650, 1455525988, 1776460110, 1626319424, 2079897426, 1928707164, 96392454, 213114376, 396673818, 514443284, 562755902, 679998e3, 865136418, 983426092, 3708173718, 3557504664, 3474729866, 3323011204, 4180808110, 4030667424, 3945269170, 3794078908, 2507040230, 2623762152, 2272556026, 2390325492, 2975484382, 3092726480, 2738905026, 2857194700, 3973773121, 3856137295, 4274053469, 4157467219, 3371096953, 3252932727, 3673476453, 3556361835, 2763173681, 2915017791, 3064510765, 3215307299, 2156299017, 2307622919, 2459735317, 2610011675, 2081048481, 1963412655, 1846563261, 1729977011, 1480485785, 1362321559, 1243905413, 1126790795, 878845905, 1030690015, 645401037, 796197571, 274084841, 425408743, 38544885, 188821243, 3613494426, 3731654548, 3313212038, 3430322568, 4082475170, 4200115116, 3780097726, 3896688048, 2668221674, 2516901860, 2366882550, 2216610296, 3141400786, 2989552604, 2837966542, 2687165888, 1202797690, 1320957812, 1437280870, 1554391400, 1669664834, 1787304780, 1906247262, 2022837584, 265905162, 114585348, 499347990, 349075736, 736970802, 585122620, 972512814, 821712160, 2595684844, 2478443234, 2293045232, 2174754046, 3196267988, 3079546586, 2895723464, 2777952454, 3537852828, 3687994002, 3234156416, 3385345166, 4142626212, 4293295786, 3841024952, 3992742070, 174567692, 57326082, 410887952, 292596766, 777231668, 660510266, 1011452712, 893681702, 1108339068, 1258480242, 1343618912, 1494807662, 1715193156, 1865862730, 1948373848, 2100090966, 2701949495, 2818666809, 3004591147, 3122358053, 2235061775, 2352307457, 2535604243, 2653899549, 3915653703, 3764988233, 4219352155, 4067639125, 3444575871, 3294430577, 3746175075, 3594982253, 836553431, 953270745, 600235211, 718002117, 367585007, 484830689, 133361907, 251657213, 2041877159, 1891211689, 1806599355, 1654886325, 1568718495, 1418573201, 1335535747, 1184342925]
              , L = function t(e) {
                if (!(this instanceof t))
                    throw Error("AES must be instanitated with `new`");
                Object.defineProperty(this, "key", {
                    value: n(e, !0)
                }),
                this._prepare()
            };
            L.prototype._prepare = function() {
                var t = f[this.key.length];
                if (null == t)
                    throw new Error("invalid key size (must be 16, 24 or 32 bytes)");
                this._Ke = [],
                this._Kd = [];
                for (var e = 0; e <= t; e++)
                    this._Ke.push([0, 0, 0, 0]),
                    this._Kd.push([0, 0, 0, 0]);
                for (var r, i = 4 * (t + 1), n = this.key.length / 4, o = s(this.key), e = 0; e < n; e++)
                    r = e >> 2,
                    this._Ke[r][e % 4] = o[e],
                    this._Kd[t - r][e % 4] = o[e];
                for (var a, u = 0, c = n; c < i; ) {
                    if (a = o[n - 1],
                    o[0] ^= p[a >> 16 & 255] << 24 ^ p[a >> 8 & 255] << 16 ^ p[255 & a] << 8 ^ p[a >> 24 & 255] ^ d[u] << 24,
                    u += 1,
                    8 != n)
                        for (var e = 1; e < n; e++)
                            o[e] ^= o[e - 1];
                    else {
                        for (var e = 1; e < n / 2; e++)
                            o[e] ^= o[e - 1];
                        a = o[n / 2 - 1],
                        o[n / 2] ^= p[255 & a] ^ p[a >> 8 & 255] << 8 ^ p[a >> 16 & 255] << 16 ^ p[a >> 24 & 255] << 24;
                        for (var e = n / 2 + 1; e < n; e++)
                            o[e] ^= o[e - 1]
                    }
                    for (var l, h, e = 0; e < n && c < i; )
                        l = c >> 2,
                        h = c % 4,
                        this._Ke[l][h] = o[e],
                        this._Kd[t - l][h] = o[e++],
                        c++
                }
                for (var l = 1; l < t; l++)
                    for (var h = 0; h < 4; h++)
                        a = this._Kd[l][h],
                        this._Kd[l][h] = w[a >> 24 & 255] ^ A[a >> 16 & 255] ^ R[a >> 8 & 255] ^ D[255 & a]
            }
            ,
            L.prototype.encrypt = function(t) {
                if (16 != t.length)
                    throw new Error("invalid plaintext size (must be 16 bytes)");
                for (var e = this._Ke.length - 1, r = [0, 0, 0, 0], i = s(t), n = 0; n < 4; n++)
                    i[n] ^= this._Ke[0][n];
                for (var a = 1; a < e; a++) {
                    for (var n = 0; n < 4; n++)
                        r[n] = g[i[n] >> 24 & 255] ^ v[i[(n + 1) % 4] >> 16 & 255] ^ m[i[(n + 2) % 4] >> 8 & 255] ^ b[255 & i[(n + 3) % 4]] ^ this._Ke[a][n];
                    i = r.slice()
                }
                for (var u, c = o(16), n = 0; n < 4; n++)
                    u = this._Ke[e][n],
                    c[4 * n] = 255 & (p[i[n] >> 24 & 255] ^ u >> 24),
                    c[4 * n + 1] = 255 & (p[i[(n + 1) % 4] >> 16 & 255] ^ u >> 16),
                    c[4 * n + 2] = 255 & (p[i[(n + 2) % 4] >> 8 & 255] ^ u >> 8),
                    c[4 * n + 3] = 255 & (p[255 & i[(n + 3) % 4]] ^ u);
                return c
            }
            ,
            L.prototype.decrypt = function(t) {
                if (16 != t.length)
                    throw new Error("invalid ciphertext size (must be 16 bytes)");
                for (var e = this._Kd.length - 1, r = [0, 0, 0, 0], i = s(t), n = 0; n < 4; n++)
                    i[n] ^= this._Kd[0][n];
                for (var a = 1; a < e; a++) {
                    for (var n = 0; n < 4; n++)
                        r[n] = S[i[n] >> 24 & 255] ^ E[i[(n + 3) % 4] >> 16 & 255] ^ T[i[(n + 2) % 4] >> 8 & 255] ^ _[255 & i[(n + 1) % 4]] ^ this._Kd[a][n];
                    i = r.slice()
                }
                for (var u, c = o(16), n = 0; n < 4; n++)
                    u = this._Kd[e][n],
                    c[4 * n] = 255 & (y[i[n] >> 24 & 255] ^ u >> 24),
                    c[4 * n + 1] = 255 & (y[i[(n + 3) % 4] >> 16 & 255] ^ u >> 16),
                    c[4 * n + 2] = 255 & (y[i[(n + 2) % 4] >> 8 & 255] ^ u >> 8),
                    c[4 * n + 3] = 255 & (y[255 & i[(n + 1) % 4]] ^ u);
                return c
            }
            ;
            var k = function t(e) {
                if (!(this instanceof t))
                    throw Error("AES must be instanitated with `new`");
                this.description = "Electronic Code Block",
                this.name = "ecb",
                this._aes = new L(e)
            };
            k.prototype.encrypt = function(t) {
                if (t = n(t),
                t.length % 16 != 0)
                    throw new Error("invalid plaintext size (must be multiple of 16 bytes)");
                for (var e = o(t.length), r = o(16), i = 0; i < t.length; i += 16)
                    a(t, r, 0, i, i + 16),
                    r = this._aes.encrypt(r),
                    a(r, e, i);
                return e
            }
            ,
            k.prototype.decrypt = function(t) {
                if (t = n(t),
                t.length % 16 != 0)
                    throw new Error("invalid ciphertext size (must be multiple of 16 bytes)");
                for (var e = o(t.length), r = o(16), i = 0; i < t.length; i += 16)
                    a(t, r, 0, i, i + 16),
                    r = this._aes.decrypt(r),
                    a(r, e, i);
                return e
            }
            ;
            var O = function t(e, r) {
                if (!(this instanceof t))
                    throw Error("AES must be instanitated with `new`");
                if (this.description = "Cipher Block Chaining",
                this.name = "cbc",
                r) {
                    if (16 != r.length)
                        throw new Error("invalid initialation vector size (must be 16 bytes)")
                } else
                    r = o(16);
                this._lastCipherblock = n(r, !0),
                this._aes = new L(e)
            };
            O.prototype.encrypt = function(t) {
                if (t = n(t),
                t.length % 16 != 0)
                    throw new Error("invalid plaintext size (must be multiple of 16 bytes)");
                for (var e = o(t.length), r = o(16), i = 0; i < t.length; i += 16) {
                    a(t, r, 0, i, i + 16);
                    for (var s = 0; s < 16; s++)
                        r[s] ^= this._lastCipherblock[s];
                    this._lastCipherblock = this._aes.encrypt(r),
                    a(this._lastCipherblock, e, i)
                }
                return e
            }
            ,
            O.prototype.decrypt = function(t) {
                if (t = n(t),
                t.length % 16 != 0)
                    throw new Error("invalid ciphertext size (must be multiple of 16 bytes)");
                for (var e = o(t.length), r = o(16), i = 0; i < t.length; i += 16) {
                    a(t, r, 0, i, i + 16),
                    r = this._aes.decrypt(r);
                    for (var s = 0; s < 16; s++)
                        e[i + s] = r[s] ^ this._lastCipherblock[s];
                    a(t, this._lastCipherblock, 0, i, i + 16)
                }
                return e
            }
            ;
            var x = function t(e, r, i) {
                if (!(this instanceof t))
                    throw Error("AES must be instanitated with `new`");
                if (this.description = "Cipher Feedback",
                this.name = "cfb",
                r) {
                    if (16 != r.length)
                        throw new Error("invalid initialation vector size (must be 16 size)")
                } else
                    r = o(16);
                i || (i = 1),
                this.segmentSize = i,
                this._shiftRegister = n(r, !0),
                this._aes = new L(e)
            };
            x.prototype.encrypt = function(t) {
                if (t.length % this.segmentSize != 0)
                    throw new Error("invalid plaintext size (must be segmentSize bytes)");
                for (var e, r = n(t, !0), i = 0; i < r.length; i += this.segmentSize) {
                    e = this._aes.encrypt(this._shiftRegister);
                    for (var o = 0; o < this.segmentSize; o++)
                        r[i + o] ^= e[o];
                    a(this._shiftRegister, this._shiftRegister, 0, this.segmentSize),
                    a(r, this._shiftRegister, 16 - this.segmentSize, i, i + this.segmentSize)
                }
                return r
            }
            ,
            x.prototype.decrypt = function(t) {
                if (t.length % this.segmentSize != 0)
                    throw new Error("invalid ciphertext size (must be segmentSize bytes)");
                for (var e, r = n(t, !0), i = 0; i < r.length; i += this.segmentSize) {
                    e = this._aes.encrypt(this._shiftRegister);
                    for (var o = 0; o < this.segmentSize; o++)
                        r[i + o] ^= e[o];
                    a(this._shiftRegister, this._shiftRegister, 0, this.segmentSize),
                    a(t, this._shiftRegister, 16 - this.segmentSize, i, i + this.segmentSize)
                }
                return r
            }
            ;
            var I = function t(e, r) {
                if (!(this instanceof t))
                    throw Error("AES must be instanitated with `new`");
                if (this.description = "Output Feedback",
                this.name = "ofb",
                r) {
                    if (16 != r.length)
                        throw new Error("invalid initialation vector size (must be 16 bytes)")
                } else
                    r = o(16);
                this._lastPrecipher = n(r, !0),
                this._lastPrecipherIndex = 16,
                this._aes = new L(e)
            };
            I.prototype.encrypt = function(t) {
                for (var e = n(t, !0), r = 0; r < e.length; r++)
                    16 === this._lastPrecipherIndex && (this._lastPrecipher = this._aes.encrypt(this._lastPrecipher),
                    this._lastPrecipherIndex = 0),
                    e[r] ^= this._lastPrecipher[this._lastPrecipherIndex++];
                return e
            }
            ,
            I.prototype.decrypt = I.prototype.encrypt;
            var C = function t(e) {
                if (!(this instanceof t))
                    throw Error("Counter must be instanitated with `new`");
                0 === e || e || (e = 1),
                "number" == typeof e ? (this._counter = o(16),
                this.setValue(e)) : this.setBytes(e)
            };
            C.prototype.setValue = function(t) {
                if ("number" != typeof t || parseInt(t) != t)
                    throw new Error("invalid counter value (must be an integer)");
                if (t > Number.MAX_SAFE_INTEGER)
                    throw new Error("integer value out of safe range");
                for (var e = 15; e >= 0; --e)
                    this._counter[e] = t % 256,
                    t = parseInt(t / 256)
            }
            ,
            C.prototype.setBytes = function(t) {
                if (t = n(t, !0),
                16 != t.length)
                    throw new Error("invalid counter bytes size (must be 16 bytes)");
                this._counter = t
            }
            ,
            C.prototype.increment = function() {
                for (var t = 15; t >= 0; t--) {
                    if (255 !== this._counter[t]) {
                        this._counter[t]++;
                        break
                    }
                    this._counter[t] = 0
                }
            }
            ;
            var P = function t(e, r) {
                if (!(this instanceof t))
                    throw Error("AES must be instanitated with `new`");
                this.description = "Counter",
                this.name = "ctr",
                r instanceof C || (r = new C(r)),
                this._counter = r,
                this._remainingCounter = null,
                this._remainingCounterIndex = 16,
                this._aes = new L(e)
            };
            P.prototype.encrypt = function(t) {
                for (var e = n(t, !0), r = 0; r < e.length; r++)
                    16 === this._remainingCounterIndex && (this._remainingCounter = this._aes.encrypt(this._counter._counter),
                    this._remainingCounterIndex = 0,
                    this._counter.increment()),
                    e[r] ^= this._remainingCounter[this._remainingCounterIndex++];
                return e
            }
            ,
            P.prototype.decrypt = P.prototype.encrypt;
            var B = {
                AES: L,
                Counter: C,
                ModeOfOperation: {
                    ecb: k,
                    cbc: O,
                    cfb: x,
                    ofb: I,
                    ctr: P
                },
                utils: {
                    hex: h,
                    utf8: l
                },
                padding: {
                    pkcs7: {
                        pad: u,
                        strip: c
                    }
                },
                _arrayTest: {
                    coerceArray: n,
                    createArray: o,
                    copyArray: a
                }
            };
            t.exports = B
        }()
    }
    , function(t, e, r) {
        "use strict";
        function i(t, e) {
            if (!(t instanceof e))
                throw new TypeError("Cannot call a class as a function")
        }
        var n = r(22)
          , o = r.n(n)
          , a = r(96)
          , s = r.n(a)
          , u = r(3)
          , c = r(59)
          , l = r(2)
          , h = r(4)
          , f = r(24)
          , d = function() {
            function t(t, e) {
                for (var r = 0; r < e.length; r++) {
                    var i = e[r];
                    i.enumerable = i.enumerable || !1,
                    i.configurable = !0,
                    "value"in i && (i.writable = !0),
                    Object.defineProperty(t, i.key, i)
                }
            }
            return function(e, r, i) {
                return r && t(e.prototype, r),
                i && t(e, i),
                e
            }
        }()
          , p = Object(f.a)()
          , y = function() {
            function t(e, r) {
                i(this, t),
                this.hls = e,
                this.id = r;
                var n = this.observer = new o.a
                  , a = e.config;
                n.trigger = function(t) {
                    for (var e = arguments.length, r = Array(e > 1 ? e - 1 : 0), i = 1; i < e; i++)
                        r[i - 1] = arguments[i];
                    n.emit.apply(n, [t, t].concat(r))
                }
                ,
                n.off = function(t) {
                    for (var e = arguments.length, r = Array(e > 1 ? e - 1 : 0), i = 1; i < e; i++)
                        r[i - 1] = arguments[i];
                    n.removeListener.apply(n, [t].concat(r))
                }
                ;
                var f = function(t, r) {
                    r = r || {},
                    r.frag = this.frag,
                    r.id = this.id,
                    e.trigger(t, r)
                }
                .bind(this);
                n.on(u.a.FRAG_DECRYPTED, f),
                n.on(u.a.FRAG_PARSING_INIT_SEGMENT, f),
                n.on(u.a.FRAG_PARSING_DATA, f),
                n.on(u.a.FRAG_PARSED, f),
                n.on(u.a.ERROR, f),
                n.on(u.a.FRAG_PARSING_METADATA, f),
                n.on(u.a.FRAG_PARSING_USERDATA, f),
                n.on(u.a.INIT_PTS_FOUND, f);
                var d = {
                    mp4: p.isTypeSupported("video/mp4"),
                    mpeg: p.isTypeSupported("audio/mpeg"),
                    mp3: p.isTypeSupported('audio/mp4; codecs="mp3"')
                }
                  , y = navigator.vendor;
                if (a.enableWorker && "undefined" != typeof Worker) {
                    l.b.log("demuxing in webworker");
                    var g = void 0;
                    try {
                        g = this.w = s()(109),
                        this.onwmsg = this.onWorkerMessage.bind(this),
                        g.addEventListener("message", this.onwmsg),
                        g.onerror = function(t) {
                            e.trigger(u.a.ERROR, {
                                type: h.b.OTHER_ERROR,
                                details: h.a.INTERNAL_EXCEPTION,
                                fatal: !0,
                                event: "demuxerWorker",
                                err: {
                                    message: t.message + " (" + t.filename + ":" + t.lineno + ")"
                                }
                            })
                        }
                        ,
                        g.postMessage({
                            cmd: "init",
                            typeSupported: d,
                            vendor: y,
                            id: r,
                            config: JSON.stringify(a),
                            streamUrl: this.streamUrl
                        })
                    } catch (t) {
                        l.b.error("error while initializing DemuxerWorker, fallback on DemuxerInline"),
                        g && URL.revokeObjectURL(g.objectURL),
                        this.demuxer = new c.a(n,d,a,y,this.streamUrl),
                        this.w = void 0
                    }
                } else
                    this.demuxer = new c.a(n,d,a,y,this.streamUrl)
            }
            return t.prototype.destroy = function() {
                var t = this.w;
                if (t)
                    t.removeEventListener("message", this.onwmsg),
                    t.terminate(),
                    this.w = null;
                else {
                    var e = this.demuxer;
                    e && (e.destroy(),
                    this.demuxer = null)
                }
                var r = this.observer;
                r && (r.removeAllListeners(),
                this.observer = null)
            }
            ,
            // 第四个onFragLoaded跳转过来的
            t.prototype.push = function(t, e, r, i, n, o, a, s) {
                var u = this.w
                  , c = isNaN(n.startDTS) ? n.start : n.startDTS
                  , h = n.decryptdata
                  , f = this.frag
                  , d = !(f && n.cc === f.cc)
                  , p = !(f && n.level === f.level)
                  , y = f && n.sn === f.sn + 1
                  , g = !p && y;
                if (d && l.b.log(this.id + ":discontinuity detected"),
                p && l.b.log(this.id + ":switch detected"),
                this.frag = n,
                u)
                    u.postMessage({
                        cmd: "demux",
                        data: t,
                        decryptdata: h,
                        initSegment: e,
                        audioCodec: r,
                        videoCodec: i,
                        timeOffset: c,
                        discontinuity: d,
                        trackSwitch: p,
                        contiguous: g,
                        duration: o,
                        accurateTimeOffset: a,
                        defaultInitPTS: s
                    }, t instanceof ArrayBuffer ? [t] : []);
                else {
                    var v = this.demuxer;
                    v && v.push(t, h, e, r, i, c, d, p, g, o, a, s)
                }
            }
            ,
            t.prototype.onWorkerMessage = function(t) {
                var e = t.data
                  , r = this.hls;
                switch (e.event) {
                case "init":
                    URL.revokeObjectURL(this.w.objectURL);
                    break;
                case u.a.FRAG_PARSING_DATA:
                    e.data.data1 = new Uint8Array(e.data1),
                    e.data2 && (e.data.data2 = new Uint8Array(e.data2));
                default:
                    e.data = e.data || {},
                    e.data.frag = this.frag,
                    e.data.id = this.id,
                    r.trigger(e.event, e.data)
                }
            }
            ,
            d(t, [{
                key: "streamUrl",
                get: function() {
                    return this.hls && this.hls.streamController && this.hls.streamController.fragCurrent ? this.hls.streamController.fragCurrent.baseurl : ""
                }
            }]),
            t
        }();
        e.a = y
    }
    , function(t, e, r) {
        "use strict";
        function i(t, e) {
            if (!(t instanceof e))
                throw new TypeError("Cannot call a class as a function")
        }
        var n = r(3)
          , o = r(4)
          , a = r(23)
          , s = r(100)
          , u = r(27)
          , c = r(101)
          , l = r(104)
          , h = r(105)
          , f = r(108)
          , d = function() {
            function t(e, r, n, o, a) {
                i(this, t),
                this.observer = e,
                this.typeSupported = r,
                this.config = n,
                this.vendor = o,
                this.url = a
            }
            return t.prototype.destroy = function() {
                var t = this.demuxer;
                t && t.destroy()
            }
            ,
            t.prototype.push = function(t, e, r, i, o, s, u, c, l, h, f, d) {
                if (t.byteLength > 0 && null != e && null != e.key && "AES-128" === e.method) {
                    var p = this.decrypter;
                    null == p && (p = this.decrypter = new a.a(this.observer,this.config));
                    var y = this
                      , g = void 0;
                    try {
                        g = performance.now()
                    } catch (t) {
                        g = Date.now()
                    }
                    p.decrypt(t, e.key.buffer, e.iv.buffer, function(t) {
                        var a = void 0;
                        try {
                            a = performance.now()
                        } catch (t) {
                            a = Date.now()
                        }
                        y.observer.trigger(n.a.FRAG_DECRYPTED, {
                            stats: {
                                tstart: g,
                                tdecrypt: a
                            }
                        }),
                        y.pushDecrypted(new Uint8Array(t), e, new Uint8Array(r), i, o, s, u, c, l, h, f, d)
                    })
                } else
                    this.pushDecrypted(new Uint8Array(t), e, new Uint8Array(r), i, o, s, u, c, l, h, f, d)
            }
            ,
            t.prototype.pushDecrypted = function(t, e, r, i, a, d, p, y, g, v, m, b) {
                var S = this.demuxer;
                if (!S || (p || y) && !this.probe(t)) {
                    for (var E = this.observer, T = this.typeSupported, _ = this.config, w = [{
                        demux: c.a,
                        remux: h.a
                    }, {
                        demux: u.a,
                        remux: f.a
                    }, {
                        demux: s.a,
                        remux: h.a
                    }, {
                        demux: l.a,
                        remux: h.a
                    }], A = 0, R = w.length; A < R; A++) {
                        var D = w[A]
                          , L = D.demux.probe;
                        if (L(t)) {
                            var k = this.remuxer = new D.remux(E,_,T,this.vendor);
                            S = new D.demux(E,k,_,T,this.url),
                            this.probe = L;
                            break
                        }
                    }
                    if (!S)
                        return void E.trigger(n.a.ERROR, {
                            type: o.b.MEDIA_ERROR,
                            details: o.a.FRAG_PARSING_ERROR,
                            fatal: !0,
                            reason: "no demux matching with content found"
                        });
                    this.demuxer = S
                }
                var O = this.remuxer;
                (p || y) && (S.resetInitSegment(r, i, a, v),
                O.resetInitSegment()),
                p && (S.resetTimeStamp(b),
                O.resetTimeStamp(b)),
                "function" == typeof S.setDecryptData && S.setDecryptData(e),
                S.append(t, d, g, m)
            }
            ,
            t
        }();
        e.a = d
    }
    , function(t, e, r) {
        "use strict";
        function i(t, e, r, i) {
            var n = void 0
              , o = void 0
              , a = void 0
              , s = void 0
              , u = void 0
              , c = navigator.userAgent.toLowerCase()
              , l = i
              , h = [96e3, 88200, 64e3, 48e3, 44100, 32e3, 24e3, 22050, 16e3, 12e3, 11025, 8e3, 7350];
            return n = 1 + ((192 & e[r + 2]) >>> 6),
            (o = (60 & e[r + 2]) >>> 2) > h.length - 1 ? void t.trigger(Event.ERROR, {
                type: p.b.MEDIA_ERROR,
                details: p.a.FRAG_PARSING_ERROR,
                fatal: !0,
                reason: "invalid ADTS sampling index:" + o
            }) : (s = (1 & e[r + 2]) << 2,
            s |= (192 & e[r + 3]) >>> 6,
            d.b.log("manifest codec:" + i + ",ADTS data:type:" + n + ",sampleingIndex:" + o + "[" + h[o] + "Hz],channelConfig:" + s),
            /firefox/i.test(c) ? o >= 6 ? (n = 5,
            u = new Array(4),
            a = o - 3) : (n = 2,
            u = new Array(2),
            a = o) : -1 !== c.indexOf("android") ? (n = 2,
            u = new Array(2),
            a = o) : (n = 5,
            u = new Array(4),
            i && (-1 !== i.indexOf("mp4a.40.29") || -1 !== i.indexOf("mp4a.40.5")) || !i && o >= 6 ? a = o - 3 : ((i && -1 !== i.indexOf("mp4a.40.2") && (o >= 6 && 1 === s || /vivaldi/i.test(c)) || !i && 1 === s) && (n = 2,
            u = new Array(2)),
            a = o)),
            u[0] = n << 3,
            u[0] |= (14 & o) >> 1,
            u[1] |= (1 & o) << 7,
            u[1] |= s << 3,
            5 === n && (u[1] |= (14 & a) >> 1,
            u[2] = (1 & a) << 7,
            u[2] |= 8,
            u[3] = 0),
            {
                config: u,
                samplerate: h[o],
                channelCount: s,
                codec: "mp4a.40." + n,
                manifestCodec: l
            })
        }
        function n(t, e) {
            return 255 === t[e] && 240 == (246 & t[e + 1])
        }
        function o(t, e) {
            return 1 & t[e + 1] ? 7 : 9
        }
        function a(t, e) {
            return (3 & t[e + 3]) << 11 | t[e + 4] << 3 | (224 & t[e + 5]) >>> 5
        }
        function s(t, e) {
            return !!(e + 1 < t.length && n(t, e))
        }
        function u(t, e) {
            if (e + 1 < t.length && n(t, e)) {
                var r = o(t, e)
                  , i = r;
                e + 5 < t.length && (i = a(t, e));
                var s = e + i;
                if (s === t.length || s + 1 < t.length && n(t, s))
                    return !0
            }
            return !1
        }
        function c(t, e, r, n, o) {
            if (!t.samplerate) {
                var a = i(e, r, n, o);
                t.config = a.config,
                t.samplerate = a.samplerate,
                t.channelCount = a.channelCount,
                t.codec = a.codec,
                t.manifestCodec = a.manifestCodec,
                d.b.log("parsed codec:" + t.codec + ",rate:" + a.samplerate + ",nb channel:" + a.channelCount)
            }
        }
        function l(t) {
            return 9216e4 / t
        }
        function h(t, e, r, i, n) {
            var s = void 0
              , u = void 0
              , c = void 0
              , l = t.length;
            if (s = o(t, e),
            u = a(t, e),
            (u -= s) > 0 && e + s + u <= l)
                return c = r + i * n,
                {
                    headerLength: s,
                    frameLength: u,
                    stamp: c
                }
        }
        function f(t, e, r, i, n) {
            var o = l(t.samplerate)
              , a = h(e, r, i, n, o);
            if (a) {
                var s = a.stamp
                  , u = a.headerLength
                  , c = a.frameLength
                  , f = {
                    unit: e.subarray(r + u, r + u + c),
                    pts: s,
                    dts: s
                };
                return t.samples.push(f),
                t.len += c,
                {
                    sample: f,
                    length: c + u
                }
            }
        }
        e.d = s,
        e.e = u,
        e.c = c,
        e.b = l,
        e.a = f;
        var d = r(2)
          , p = r(4)
    }
    , function(t, e, r) {
        "use strict";
        var i = {
            BitratesMap: [32, 64, 96, 128, 160, 192, 224, 256, 288, 320, 352, 384, 416, 448, 32, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320, 384, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320, 32, 48, 56, 64, 80, 96, 112, 128, 144, 160, 176, 192, 224, 256, 8, 16, 24, 32, 40, 48, 56, 64, 80, 96, 112, 128, 144, 160],
            SamplingRateMap: [44100, 48e3, 32e3, 22050, 24e3, 16e3, 11025, 12e3, 8e3],
            SamplesCoefficients: [[0, 72, 144, 12], [0, 0, 0, 0], [0, 72, 144, 12], [0, 144, 144, 12]],
            BytesInSlot: [0, 1, 1, 4],
            appendFrame: function(t, e, r, i, n) {
                if (!(r + 24 > e.length)) {
                    var o = this.parseHeader(e, r);
                    if (o && r + o.frameLength <= e.length) {
                        var a = 9e4 * o.samplesPerFrame / o.sampleRate
                          , s = i + n * a
                          , u = {
                            unit: e.subarray(r, r + o.frameLength),
                            pts: s,
                            dts: s
                        };
                        return t.config = [],
                        t.channelCount = o.channelCount,
                        t.samplerate = o.sampleRate,
                        t.samples.push(u),
                        t.len += o.frameLength,
                        {
                            sample: u,
                            length: o.frameLength
                        }
                    }
                }
            },
            parseHeader: function(t, e) {
                var r = t[e + 1] >> 3 & 3
                  , n = t[e + 1] >> 1 & 3
                  , o = t[e + 2] >> 4 & 15
                  , a = t[e + 2] >> 2 & 3
                  , s = t[e + 2] >> 1 & 1;
                if (1 !== r && 0 !== o && 15 !== o && 3 !== a) {
                    var u = 3 === r ? 3 - n : 3 === n ? 3 : 4
                      , c = 1e3 * i.BitratesMap[14 * u + o - 1]
                      , l = 3 === r ? 0 : 2 === r ? 1 : 2
                      , h = i.SamplingRateMap[3 * l + a]
                      , f = t[e + 3] >> 6 == 3 ? 1 : 2
                      , d = i.SamplesCoefficients[r][n]
                      , p = i.BytesInSlot[n]
                      , y = 8 * d * p;
                    return {
                        sampleRate: h,
                        channelCount: f,
                        frameLength: parseInt(d * c / h + s, 10) * p,
                        samplesPerFrame: y
                    }
                }
            },
            isHeaderPattern: function(t, e) {
                return 255 === t[e] && 224 == (224 & t[e + 1]) && 0 != (6 & t[e + 1])
            },
            isHeader: function(t, e) {
                return !!(e + 1 < t.length && this.isHeaderPattern(t, e))
            },
            probe: function(t, e) {
                if (e + 1 < t.length && this.isHeaderPattern(t, e)) {
                    var r = this.parseHeader(t, e)
                      , i = 4;
                    r && r.frameLength && (i = r.frameLength);
                    var n = e + i;
                    if (n === t.length || n + 1 < t.length && this.isHeaderPattern(t, n))
                        return !0
                }
                return !1
            }
        };
        e.a = i
    }
    , function(t, e, r) {
        "use strict";
        function i(t, e, r) {
            var i = t[e]
              , n = t[r]
              , o = n.startPTS;
            isNaN(o) ? n.start = r > e ? i.start + i.duration : Math.max(i.start - n.duration, 0) : r > e ? (i.duration = o - i.start,
            i.duration < 0 && a.b.warn("negative duration computed for frag " + i.sn + ",level " + i.level + ", there should be some duration drift between playlist and fragment!")) : (n.duration = i.start - o,
            n.duration < 0 && a.b.warn("negative duration computed for frag " + n.sn + ",level " + n.level + ", there should be some duration drift between playlist and fragment!"))
        }
        function n(t, e, r, n, o, a) {
            var s = r;
            if (!isNaN(e.startPTS)) {
                var u = Math.abs(e.startPTS - r);
                isNaN(e.deltaPTS) ? e.deltaPTS = u : e.deltaPTS = Math.max(u, e.deltaPTS),
                s = Math.max(r, e.startPTS),
                r = Math.min(r, e.startPTS),
                n = Math.max(n, e.endPTS),
                o = Math.min(o, e.startDTS),
                a = Math.max(a, e.endDTS)
            }
            var c = r - e.start;
            e.start = e.startPTS = r,
            e.maxStartPTS = s,
            e.endPTS = n,
            e.startDTS = o,
            e.endDTS = a,
            e.duration = n - r;
            var l = e.sn;
            if (!t || l < t.startSN || l > t.endSN)
                return 0;
            var h = void 0
              , f = void 0
              , d = void 0;
            for (h = l - t.startSN,
            f = t.fragments,
            f[h] = e,
            d = h; d > 0; d--)
                i(f, d, d - 1);
            for (d = h; d < f.length - 1; d++)
                i(f, d, d + 1);
            return t.PTSKnown = !0,
            c
        }
        function o(t, e) {
            var r = Math.max(t.startSN, e.startSN) - e.startSN
              , i = Math.min(t.endSN, e.endSN) - e.startSN
              , o = e.startSN - t.startSN
              , s = t.fragments
              , u = e.fragments
              , c = 0
              , l = void 0;
            if (e.initSegment && t.initSegment && (e.initSegment = t.initSegment),
            i < r)
                return void (e.PTSKnown = !1);
            for (var h = r; h <= i; h++) {
                var f = s[o + h]
                  , d = u[h];
                d && f && (c = f.cc - d.cc,
                isNaN(f.startPTS) || (d.start = d.startPTS = f.startPTS,
                d.endPTS = f.endPTS,
                d.duration = f.duration,
                d.backtracked = f.backtracked,
                d.dropped = f.dropped,
                l = d))
            }
            if (c)
                for (a.b.log("discontinuity sliding from playlist, take drift into account"),
                h = 0; h < u.length; h++)
                    u[h].cc += c;
            if (l)
                n(e, l, l.startPTS, l.endPTS, l.startDTS, l.endDTS);
            else if (o >= 0 && o < s.length) {
                var p = s[o].start;
                for (h = 0; h < u.length; h++)
                    u[h].start += p
            }
            e.PTSKnown = t.PTSKnown
        }
        e.b = n,
        e.a = o;
        var a = r(2)
    }
    , function(t, e, r) {
        "use strict";
        var i = {
            toString: function(t) {
                for (var e = "", r = t.length, i = 0; i < r; i++)
                    e += "[" + t.start(i).toFixed(3) + "," + t.end(i).toFixed(3) + "]";
                return e
            }
        };
        e.a = i
    }
    , function(t, e, r) {
        "use strict";
        function i(t, e) {
            for (var r = null, i = 0; i < t.length; i += 1) {
                var n = t[i];
                if (n && n.cc === e) {
                    r = n;
                    break
                }
            }
            return r
        }
        function n(t, e) {
            return c.a.search(t, function(t) {
                return t.cc < e ? 1 : t.cc > e ? -1 : 0
            })
        }
        function o(t, e, r) {
            var i = !1;
            return e && e.details && r && (r.endCC > r.startCC || t && t.cc < r.startCC) && (i = !0),
            i
        }
        function a(t, e) {
            var r = t.fragments
              , n = e.fragments;
            if (!n.length || !r.length)
                return void l.b.log("No fragments to align");
            var o = i(r, n[0].cc);
            return !o || o && !o.startPTS ? void l.b.log("No frag in previous level to align on") : o
        }
        function s(t, e) {
            e.fragments.forEach(function(e) {
                if (e) {
                    var r = e.start + t;
                    e.start = e.startPTS = r,
                    e.endPTS = r + e.duration
                }
            }),
            e.PTSKnown = !0
        }
        function u(t, e, r) {
            if (o(t, e, r)) {
                var i = a(e.details, r);
                i && (l.b.log("Adjusting PTS using last level due to CC increase within current level"),
                s(i.start, r))
            }
            if (!1 === r.PTSKnown && e && e.details && e.details.fragments && e.details.fragments.length) {
                var n = e.details.programDateTime
                  , u = r.programDateTime
                  , c = (u - n) / 1e3 + e.details.fragments[0].start;
                isNaN(c) || (l.b.log("adjusting PTS using programDateTime delta, sliding:" + c.toFixed(3)),
                s(c, r))
            }
        }
        e.b = n,
        e.a = u;
        var c = r(16)
          , l = r(2)
    }
    , function(t, e, r) {
        "use strict";
        function i(t, e) {
            var r = null;
            try {
                r = new window.Event("addtrack")
            } catch (t) {
                r = document.createEvent("Event"),
                r.initEvent("addtrack", !1, !1)
            }
            r.track = t,
            e.dispatchEvent(r)
        }
        function n(t) {
            if (t && t.cues)
                for (; t.cues.length > 0; )
                    t.removeCue(t.cues[0])
        }
        e.b = i,
        e.a = n
    }
    , function(t, e, r) {
        "use strict";
        function i() {
            this.window = window,
            this.state = "INITIAL",
            this.buffer = "",
            this.decoder = new l,
            this.regionList = []
        }
        function n(t) {
            function e(t, e, r, i) {
                return 3600 * (0 | t) + 60 * (0 | e) + (0 | r) + (0 | i) / 1e3
            }
            var r = t.match(/^(\d+):(\d{2})(:\d{2})?\.(\d{3})/);
            return r ? r[3] ? e(r[1], r[2], r[3].replace(":", ""), r[4]) : r[1] > 59 ? e(r[1], r[2], 0, r[4]) : e(0, r[1], r[2], r[4]) : null
        }
        function o() {
            this.values = Object.create(null)
        }
        function a(t, e, r, i) {
            var n = i ? t.split(i) : [t];
            for (var o in n)
                if ("string" == typeof n[o]) {
                    var a = n[o].split(r);
                    if (2 === a.length) {
                        var s = a[0]
                          , u = a[1];
                        e(s, u)
                    }
                }
        }
        function s(t, e, r) {
            function i() {
                var e = n(t);
                if (null === e)
                    throw new Error("Malformed timestamp: " + u);
                return t = t.replace(/^[^\sa-zA-Z-]+/, ""),
                e
            }
            function s() {
                t = t.replace(/^\s+/, "")
            }
            var u = t;
            if (s(),
            e.startTime = i(),
            s(),
            "--\x3e" !== t.substr(0, 3))
                throw new Error("Malformed time stamp (time stamps must be separated by '--\x3e'): " + u);
            t = t.substr(3),
            s(),
            e.endTime = i(),
            s(),
            function(t, e) {
                var i = new o;
                a(t, function(t, e) {
                    switch (t) {
                    case "region":
                        for (var n = r.length - 1; n >= 0; n--)
                            if (r[n].id === e) {
                                i.set(t, r[n].region);
                                break
                            }
                        break;
                    case "vertical":
                        i.alt(t, e, ["rl", "lr"]);
                        break;
                    case "line":
                        var o = e.split(",")
                          , a = o[0];
                        i.integer(t, a),
                        i.percent(t, a) && i.set("snapToLines", !1),
                        i.alt(t, a, ["auto"]),
                        2 === o.length && i.alt("lineAlign", o[1], ["start", f, "end"]);
                        break;
                    case "position":
                        o = e.split(","),
                        i.percent(t, o[0]),
                        2 === o.length && i.alt("positionAlign", o[1], ["start", f, "end", "line-left", "line-right", "auto"]);
                        break;
                    case "size":
                        i.percent(t, e);
                        break;
                    case "align":
                        i.alt(t, e, ["start", f, "end", "left", "right"])
                    }
                }, /:/, /\s/),
                e.region = i.get("region", null),
                e.vertical = i.get("vertical", "");
                var n = i.get("line", "auto");
                "auto" === n && -1 === h.line && (n = -1),
                e.line = n,
                e.lineAlign = i.get("lineAlign", "start"),
                e.snapToLines = i.get("snapToLines", !0),
                e.size = i.get("size", 100),
                e.align = i.get("align", f);
                var s = i.get("position", "auto");
                "auto" === s && 50 === h.position && (s = "start" === e.align || "left" === e.align ? 0 : "end" === e.align || "right" === e.align ? 100 : 50),
                e.position = s
            }(t, e)
        }
        function u(t) {
            return t.replace(/<br(?: \/)?>/gi, "\n")
        }
        r.d(e, "b", function() {
            return u
        });
        var c = r(125)
          , l = function() {
            return {
                decode: function(t) {
                    if (!t)
                        return "";
                    if ("string" != typeof t)
                        throw new Error("Error - expected string data.");
                    return decodeURIComponent(encodeURIComponent(t))
                }
            }
        };
        o.prototype = {
            set: function(t, e) {
                this.get(t) || "" === e || (this.values[t] = e)
            },
            get: function(t, e, r) {
                return r ? this.has(t) ? this.values[t] : e[r] : this.has(t) ? this.values[t] : e
            },
            has: function(t) {
                return t in this.values
            },
            alt: function(t, e, r) {
                for (var i = 0; i < r.length; ++i)
                    if (e === r[i]) {
                        this.set(t, e);
                        break
                    }
            },
            integer: function(t, e) {
                /^-?\d+$/.test(e) && this.set(t, parseInt(e, 10))
            },
            percent: function(t, e) {
                return !!(e.match(/^([\d]{1,3})(\.[\d]*)?%$/) && (e = parseFloat(e)) >= 0 && e <= 100) && (this.set(t, e),
                !0)
            }
        };
        var h = new c.a(0,0,0)
          , f = "middle" === h.align ? "middle" : "center";
        i.prototype = {
            parse: function(t) {
                function e() {
                    var t = r.buffer
                      , e = 0;
                    for (t = u(t); e < t.length && "\r" !== t[e] && "\n" !== t[e]; )
                        ++e;
                    var i = t.substr(0, e);
                    return "\r" === t[e] && ++e,
                    "\n" === t[e] && ++e,
                    r.buffer = t.substr(e),
                    i
                }
                var r = this;
                t && (r.buffer += r.decoder.decode(t, {
                    stream: !0
                }));
                try {
                    var i = void 0;
                    if ("INITIAL" === r.state) {
                        if (!/\r\n|\n/.test(r.buffer))
                            return this;
                        i = e();
                        var n = i.match(/^(ï»¿)?WEBVTT([ \t].*)?$/);
                        if (!n || !n[0])
                            throw new Error("Malformed WebVTT signature.");
                        r.state = "HEADER"
                    }
                    for (var o = !1; r.buffer; ) {
                        if (!/\r\n|\n/.test(r.buffer))
                            return this;
                        switch (o ? o = !1 : i = e(),
                        r.state) {
                        case "HEADER":
                            /:/.test(i) ? function(t) {
                                a(t, function(t, e) {
                                    switch (t) {
                                    case "Region":
                                        console.log("parse region", e)
                                    }
                                }, /:/)
                            }(i) : i || (r.state = "ID");
                            continue;
                        case "NOTE":
                            i || (r.state = "ID");
                            continue;
                        case "ID":
                            if (/^NOTE($|[ \t])/.test(i)) {
                                r.state = "NOTE";
                                break
                            }
                            if (!i)
                                continue;
                            if (r.cue = new c.a(0,0,""),
                            r.state = "CUE",
                            -1 === i.indexOf("--\x3e")) {
                                r.cue.id = i;
                                continue
                            }
                        case "CUE":
                            try {
                                s(i, r.cue, r.regionList)
                            } catch (t) {
                                r.cue = null,
                                r.state = "BADCUE";
                                continue
                            }
                            r.state = "CUETEXT";
                            continue;
                        case "CUETEXT":
                            var l = -1 !== i.indexOf("--\x3e");
                            if (!i || l && (o = !0)) {
                                r.oncue && r.oncue(r.cue),
                                r.cue = null,
                                r.state = "ID";
                                continue
                            }
                            r.cue.text && (r.cue.text += "\n"),
                            r.cue.text += i;
                            continue;
                        case "BADCUE":
                            i || (r.state = "ID");
                            continue
                        }
                    }
                } catch (t) {
                    "CUETEXT" === r.state && r.cue && r.oncue && r.oncue(r.cue),
                    r.cue = null,
                    r.state = "INITIAL" === r.state ? "BADWEBVTT" : "BADCUE"
                }
                return this
            },
            flush: function() {
                var t = this;
                try {
                    if (t.buffer += t.decoder.decode(),
                    (t.cue || "HEADER" === t.state) && (t.buffer += "\n\n",
                    t.parse()),
                    "INITIAL" === t.state)
                        throw new Error("Malformed WebVTT signature.")
                } catch (t) {
                    throw t
                }
                return t.onflush && t.onflush(),
                this
            }
        },
        e.a = i
    }
    , function(t, e, r) {
        "use strict";
        function i(t, e) {
            if (!(t instanceof e))
                throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var n = r(13)
          , o = r.n(n)
          , a = r(4)
          , s = r(26)
          , u = r(71)
          , c = r(72)
          , l = r(20)
          , h = r(95)
          , f = r(111)
          , d = r(112)
          , p = r(113)
          , y = r(2)
          , g = r(114)
          , v = r(3)
          , m = r(22)
          , b = r.n(m)
          , S = function() {
            function t(t, e) {
                for (var r = 0; r < e.length; r++) {
                    var i = e[r];
                    i.enumerable = i.enumerable || !1,
                    i.configurable = !0,
                    "value"in i && (i.writable = !0),
                    Object.defineProperty(t, i.key, i)
                }
            }
            return function(e, r, i) {
                return r && t(e.prototype, r),
                i && t(e, i),
                e
            }
        }();
        r(134);
        var E = function() {
            function t() {
                var e = this
                  , r = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                i(this, t);
                var n = t.DefaultConfig;
                if ((r.liveSyncDurationCount || r.liveMaxLatencyDurationCount) && (r.liveSyncDuration || r.liveMaxLatencyDuration))
                    throw new Error("Illegal hls.js config: don't mix up liveSyncDurationCount/liveMaxLatencyDurationCount and liveSyncDuration/liveMaxLatencyDuration");
                for (var o in n)
                    o in r || (r[o] = n[o]);
                if (void 0 !== r.liveMaxLatencyDurationCount && r.liveMaxLatencyDurationCount <= r.liveSyncDurationCount)
                    throw new Error('Illegal hls.js config: "liveMaxLatencyDurationCount" must be gt "liveSyncDurationCount"');
                if (void 0 !== r.liveMaxLatencyDuration && (r.liveMaxLatencyDuration <= r.liveSyncDuration || void 0 === r.liveSyncDuration))
                    throw new Error('Illegal hls.js config: "liveMaxLatencyDuration" must be gt "liveSyncDuration"');
                Object(y.a)(r.debug),
                this.config = r,
                this._autoLevelCapping = -1;
                var a = this.observer = new b.a;
                // trigger跳转到此处
                a.trigger = function(t) {
                    for (var e = arguments.length, r = Array(e > 1 ? e - 1 : 0), i = 1; i < e; i++)
                    // r是除事件名以外的参数数组
                        r[i - 1] = arguments[i];
                    // 等价于a.emit(t,t,...r)
                    a.emit.apply(a, [t, t].concat(r))
                }
                ,
                a.off = function(t) {
                    for (var e = arguments.length, r = Array(e > 1 ? e - 1 : 0), i = 1; i < e; i++)
                        r[i - 1] = arguments[i];
                    a.removeListener.apply(a, [t].concat(r))
                }
                ,
                this.on = a.on.bind(a),
                this.off = a.off.bind(a),
                this.trigger = a.trigger.bind(a);
                var p = this.abrController = new r.abrController(this)
                  , g = new r.bufferController(this)
                  , v = new r.capLevelController(this)
                  , m = new r.fpsController(this)
                  , S = new s.a(this)
                  , E = new u.a(this)
                  , T = new c.a(this)
                  , _ = new d.a(this)
                  , w = this.levelController = new f.a(this)
                  , A = new l.b(this)
                  , R = this.streamController = new h.a(this,A)
                  , D = [w, R]
                  , L = r.audioStreamController;
                L && D.push(new L(this,A)),
                this.networkControllers = D;
                var k = [S, E, T, p, g, v, m, _, A];
                if (L = r.audioTrackController) {
                    var O = new L(this);
                    this.audioTrackController = O,
                    k.push(O)
                }
                if (L = r.subtitleTrackController) {
                    var x = new L(this);
                    this.subtitleTrackController = x,
                    k.push(x)
                }
                if (L = r.emeController) {
                    var I = new L(this);
                    this.emeController = I,
                    k.push(I)
                }
                [r.subtitleStreamController, r.timelineController].forEach(function(t) {
                    t && k.push(new t(e))
                }),
                this.coreComponents = k
            }
            return t.isSupported = function() {
                return Object(p.a)()
            }
            ,
            S(t, null, [{
                key: "version",
                get: function() {
                    return "9.0.0"
                }
            }, {
                key: "Events",
                get: function() {
                    return v.a
                }
            }, {
                key: "ErrorTypes",
                get: function() {
                    return a.b
                }
            }, {
                key: "ErrorDetails",
                get: function() {
                    return a.a
                }
            }, {
                key: "DefaultConfig",
                get: function() {
                    return t.defaultConfig ? t.defaultConfig : g.a
                },
                set: function(e) {
                    t.defaultConfig = e
                }
            }]),
            t.prototype.destroy = function() {
                y.b.log("destroy"),
                this.trigger(v.a.DESTROYING),
                this.detachMedia(),
                this.coreComponents.concat(this.networkControllers).forEach(function(t) {
                    t.destroy()
                }),
                this.url = null,
                this.observer.removeAllListeners(),
                this._autoLevelCapping = -1
            }
            ,
            t.prototype.attachMedia = function(t) {
                y.b.log("attachMedia"),
                this.media = t,
                this.trigger(v.a.MEDIA_ATTACHING, {
                    media: t
                })
            }
            ,
            t.prototype.detachMedia = function() {
                y.b.log("detachMedia"),
                this.trigger(v.a.MEDIA_DETACHING),
                this.media = null
            }
            ,
            t.prototype.loadSource = function(t) {
                t = o.a.buildAbsoluteURL(window.location.href, t, {
                    alwaysNormalize: !0
                }),
                y.b.log("loadSource:" + t),
                this.url = t,
                this.trigger(v.a.MANIFEST_LOADING, {
                    url: t
                })
            }
            ,
            t.prototype.startLoad = function() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : -1;
                y.b.log("startLoad(" + t + ")"),
                this.networkControllers.forEach(function(e) {
                    e.startLoad(t)
                })
            }
            ,
            t.prototype.stopLoad = function() {
                y.b.log("stopLoad"),
                this.networkControllers.forEach(function(t) {
                    t.stopLoad()
                })
            }
            ,
            t.prototype.swapAudioCodec = function() {
                y.b.log("swapAudioCodec"),
                this.streamController.swapAudioCodec()
            }
            ,
            t.prototype.recoverMediaError = function() {
                y.b.log("recoverMediaError");
                var t = this.media;
                this.detachMedia(),
                this.attachMedia(t)
            }
            ,
            S(t, [{
                key: "levels",
                get: function() {
                    return this.levelController.levels
                },
                set: function(t) {
                    return this.levelController.levels = t
                }
            }, {
                key: "currentLevel",
                get: function() {
                    return this.streamController.currentLevel
                },
                set: function(t) {
                    y.b.log("set currentLevel:" + t),
                    this.loadLevel = t,
                    this.config.seamlessHandover ? this.streamController.nextLevelSwitch() : this.streamController.immediateLevelSwitch()
                }
            }, {
                key: "nextLevel",
                get: function() {
                    return this.streamController.nextLevel
                },
                set: function(t) {
                    y.b.log("set nextLevel:" + t),
                    this.levelController.manualLevel = t,
                    this.streamController.nextLevelSwitch()
                }
            }, {
                key: "loadLevel",
                get: function() {
                    return this.levelController.level
                },
                set: function(t) {
                    y.b.log("set loadLevel:" + t),
                    this.levelController.manualLevel = t
                }
            }, {
                key: "nextLoadLevel",
                get: function() {
                    return this.levelController.nextLoadLevel
                },
                set: function(t) {
                    this.levelController.nextLoadLevel = t
                }
            }, {
                key: "firstLevel",
                get: function() {
                    return Math.max(this.levelController.firstLevel, this.minAutoLevel)
                },
                set: function(t) {
                    y.b.log("set firstLevel:" + t),
                    this.levelController.firstLevel = t
                }
            }, {
                key: "startLevel",
                get: function() {
                    return this.levelController.startLevel
                },
                set: function(t) {
                    y.b.log("set startLevel:" + t);
                    var e = this;
                    -1 !== t && (t = Math.max(t, e.minAutoLevel)),
                    e.levelController.startLevel = t
                }
            }, {
                key: "autoLevelCapping",
                get: function() {
                    return this._autoLevelCapping
                },
                set: function(t) {
                    y.b.log("set autoLevelCapping:" + t),
                    this._autoLevelCapping = t
                }
            }, {
                key: "autoLevelEnabled",
                get: function() {
                    return -1 === this.levelController.manualLevel
                }
            }, {
                key: "manualLevel",
                get: function() {
                    return this.levelController.manualLevel
                }
            }, {
                key: "minAutoLevel",
                get: function() {
                    for (var t = this, e = t.levels, r = t.config.minAutoBitrate, i = e ? e.length : 0, n = 0; n < i; n++) {
                        if ((e[n].realBitrate ? Math.max(e[n].realBitrate, e[n].bitrate) : e[n].bitrate) > r)
                            return n
                    }
                    return 0
                }
            }, {
                key: "maxAutoLevel",
                get: function() {
                    var t = this
                      , e = t.levels
                      , r = t.autoLevelCapping;
                    return -1 === r && e && e.length ? e.length - 1 : r
                }
            }, {
                key: "nextAutoLevel",
                get: function() {
                    var t = this;
                    return Math.min(Math.max(t.abrController.nextAutoLevel, t.minAutoLevel), t.maxAutoLevel)
                },
                set: function(t) {
                    var e = this;
                    e.abrController.nextAutoLevel = Math.max(e.minAutoLevel, t)
                }
            }, {
                key: "audioTracks",
                get: function() {
                    var t = this.audioTrackController;
                    return t ? t.audioTracks : []
                }
            }, {
                key: "audioTrack",
                get: function() {
                    var t = this.audioTrackController;
                    return t ? t.audioTrack : -1
                },
                set: function(t) {
                    var e = this.audioTrackController;
                    e && (e.audioTrack = t)
                }
            }, {
                key: "liveSyncPosition",
                get: function() {
                    return this.streamController.liveSyncPosition
                }
            }, {
                key: "subtitleTracks",
                get: function() {
                    var t = this.subtitleTrackController;
                    return t ? t.subtitleTracks : []
                }
            }, {
                key: "subtitleTrack",
                get: function() {
                    var t = this.subtitleTrackController;
                    return t ? t.subtitleTrack : -1
                },
                set: function(t) {
                    var e = this.subtitleTrackController;
                    e && (e.subtitleTrack = t)
                }
            }, {
                key: "subtitleDisplay",
                get: function() {
                    var t = this.subtitleTrackController;
                    return !!t && t.subtitleDisplay
                },
                set: function(t) {
                    var e = this.subtitleTrackController;
                    e && (e.subtitleDisplay = t)
                }
            }]),
            t
        }();
        e.default = E
    }
    , function(t, e) {
        t.exports = function(t) {
            return t.webpackPolyfill || (t.deprecate = function() {}
            ,
            t.paths = [],
            t.children || (t.children = []),
            Object.defineProperty(t, "loaded", {
                enumerable: !0,
                get: function() {
                    return t.l
                }
            }),
            Object.defineProperty(t, "id", {
                enumerable: !0,
                get: function() {
                    return t.i
                }
            }),
            t.webpackPolyfill = 1),
            t
        }
    }
    , function(t, e, r) {
        "use strict";
        function i(t, e) {
            if (!(t instanceof e))
                throw new TypeError("Cannot call a class as a function")
        }
        var n = r(13)
          , o = r.n(n)
          , a = r(18)
          , s = r(28)
          , u = r(70)
          , c = r(2)
          , l = r(29)
          , h = /#EXT-X-STREAM-INF:([^\n\r]*)[\r\n]+([^\r\n]+)/g
          , f = /#EXT-X-MEDIA:(.*)/g
          , d = new RegExp([/#EXTINF:\s*(\d*(?:\.\d+)?)(?:,(.*)\s+)?/.source, /|(?!#)(\S+)/.source, /|#EXT-X-BYTERANGE:*(.+)/.source, /|#EXT-X-PROGRAM-DATE-TIME:(.+)/.source, /|#.*/.source].join(""),"g")
          , p = /(?:(?:#(EXTM3U))|(?:#EXT-X-(PLAYLIST-TYPE):(.+))|(?:#EXT-X-(MEDIA-SEQUENCE): *(\d+))|(?:#EXT-X-(TARGETDURATION): *(\d+))|(?:#EXT-X-(KEY):(.+))|(?:#EXT-X-(START):(.+))|(?:#EXT-X-(ENDLIST))|(?:#EXT-X-(DISCONTINUITY-SEQ)UENCE:(\d+))|(?:#EXT-X-(DIS)CONTINUITY))|(?:#EXT-X-(VERSION):(\d+))|(?:#EXT-X-(MAP):(.+))|(?:(#)(.*):(.*))|(?:(#)(.*))(?:.*)\r?\n?/
          , y = /\.(mp4|m4s|m4v|m4a)$/i
          , g = function() {
            function t() {
                i(this, t)
            }
            return t.findGroup = function(t, e) {
                if (!t)
                    return null;
                for (var r = null, i = 0; i < t.length; i++) {
                    var n = t[i];
                    n.id === e && (r = n)
                }
                return r
            }
            ,
            t.convertAVC1ToAVCOTI = function(t) {
                var e = void 0
                  , r = t.split(".");
                return r.length > 2 ? (e = r.shift() + ".",
                e += parseInt(r.shift()).toString(16),
                e += ("000" + parseInt(r.shift()).toString(16)).substr(-4)) : e = t,
                e
            }
            ,
            t.resolve = function(t, e) {
                return o.a.buildAbsoluteURL(e, t, {
                    alwaysNormalize: !0
                })
            }
            ,
            t.parseMasterPlaylist = function(e, r) {
                var i = []
                  , n = void 0;
                for (h.lastIndex = 0; null != (n = h.exec(e)); ) {
                    var o = {}
                      , a = o.attrs = new u.a(n[1]);
                    o.url = t.resolve(n[2], r);
                    var s = a.decimalResolution("RESOLUTION");
                    s && (o.width = s.width,
                    o.height = s.height),
                    o.bitrate = a.decimalInteger("AVERAGE-BANDWIDTH") || a.decimalInteger("BANDWIDTH"),
                    o.name = a.NAME,
                    function(t, e) {
                        ["video", "audio"].forEach(function(r) {
                            var i = t.filter(function(t) {
                                return Object(l.b)(t, r)
                            });
                            if (i.length) {
                                var n = i.filter(function(t) {
                                    return 0 === t.lastIndexOf("avc1", 0) || 0 === t.lastIndexOf("mp4a", 0)
                                });
                                e[r + "Codec"] = n.length > 0 ? n[0] : i[0],
                                t = t.filter(function(t) {
                                    return -1 === i.indexOf(t)
                                })
                            }
                        }),
                        e.unknownCodecs = t
                    }([].concat((a.CODECS || "").split(/[ ,]+/)), o),
                    o.videoCodec && -1 !== o.videoCodec.indexOf("avc1") && (o.videoCodec = t.convertAVC1ToAVCOTI(o.videoCodec)),
                    i.push(o)
                }
                return i
            }
            ,
            t.parseMasterPlaylistMedia = function(e, r, i) {
                var n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : []
                  , o = void 0
                  , a = []
                  , s = 0;
                for (f.lastIndex = 0; null !== (o = f.exec(e)); ) {
                    var c = {}
                      , l = new u.a(o[1]);
                    if (l.TYPE === i) {
                        if (c.groupId = l["GROUP-ID"],
                        c.name = l.NAME,
                        c.type = i,
                        c.default = "YES" === l.DEFAULT,
                        c.autoselect = "YES" === l.AUTOSELECT,
                        c.forced = "YES" === l.FORCED,
                        l.URI && (c.url = t.resolve(l.URI, r)),
                        c.lang = l.LANGUAGE,
                        c.name || (c.name = c.lang),
                        n.length) {
                            var h = t.findGroup(n, c.groupId);
                            c.audioCodec = h ? h.codec : n[0].codec
                        }
                        c.id = s++,
                        a.push(c)
                    }
                }
                return a
            }
            ,
            t.parseLevelPlaylist = function(t, e, r, i, n) {
                var o = 0
                  , l = 0
                  , h = {
                    type: null,
                    version: null,
                    url: e,
                    fragments: [],
                    live: !0,
                    startSN: 0
                }
                  , f = new s.a
                  , g = 0
                  , v = null
                  , m = new a.a
                  , b = void 0
                  , S = void 0;
                for (d.lastIndex = 0; null !== (b = d.exec(t)); ) {
                    var E = b[1];
                    if (E) {
                        m.duration = parseFloat(E);
                        var T = (" " + b[2]).slice(1);
                        m.title = T || null,
                        m.tagList.push(T ? ["INF", E, T] : ["INF", E])
                    } else if (b[3]) {
                        if (!isNaN(m.duration)) {
                            var _ = o++;
                            m.type = i,
                            m.start = l,
                            m.levelkey = f,
                            m.sn = _,
                            m.level = r,
                            m.cc = g,
                            m.urlId = n,
                            m.baseurl = e,
                            m.relurl = (" " + b[3]).slice(1),
                            h.programDateTime && (v ? m.rawProgramDateTime ? m.pdt = Date.parse(m.rawProgramDateTime) : m.pdt = v.pdt + 1e3 * v.duration : m.pdt = h.programDateTime,
                            m.endPdt = m.pdt + 1e3 * m.duration),
                            h.fragments.push(m),
                            v = m,
                            l += m.duration,
                            m = new a.a
                        }
                    } else if (b[4]) {
                        if (m.rawByteRange = (" " + b[4]).slice(1),
                        v) {
                            var w = v.byteRangeEndOffset;
                            w && (m.lastByteRangeEndOffset = w)
                        }
                    } else if (b[5])
                        m.rawProgramDateTime = (" " + b[5]).slice(1),
                        m.tagList.push(["PROGRAM-DATE-TIME", m.rawProgramDateTime]),
                        void 0 === h.programDateTime && (h.programDateTime = new Date(Date.parse(b[5])) - 1e3 * l);
                    else {
                        for (b = b[0].match(p),
                        S = 1; S < b.length && void 0 === b[S]; S++)
                            ;
                        var A = (" " + b[S + 1]).slice(1)
                          , R = (" " + b[S + 2]).slice(1);
                        switch (b[S]) {
                        case "#":
                            m.tagList.push(R ? [A, R] : [A]);
                            break;
                        case "PLAYLIST-TYPE":
                            h.type = A.toUpperCase();
                            break;
                        case "MEDIA-SEQUENCE":
                            o = h.startSN = parseInt(A);
                            break;
                        case "TARGETDURATION":
                            h.targetduration = parseFloat(A);
                            break;
                        case "VERSION":
                            h.version = parseInt(A);
                            break;
                        case "EXTM3U":
                            break;
                        case "ENDLIST":
                            h.live = !1;
                            break;
                        case "DIS":
                            g++,
                            m.tagList.push(["DIS"]);
                            break;
                        case "DISCONTINUITY-SEQ":
                            g = parseInt(A);
                            break;
                        case "KEY":
                            var D = A
                              , L = new u.a(D)
                              , k = L.enumeratedString("METHOD")
                              , O = L.URI
                              , x = L.hexadecimalInteger("IV");
                            k && (f = new s.a,
                            O && ["AES-128", "SAMPLE-AES", "SAMPLE-AES-CENC"].indexOf(k) >= 0 && (f.method = k,
                            f.baseuri = e,
                            f.reluri = O,
                            f.key = null,
                            f.iv = x));
                            break;
                        case "START":
                            var I = A
                              , C = new u.a(I)
                              , P = C.decimalFloatingPoint("TIME-OFFSET");
                            isNaN(P) || (h.startTimeOffset = P);
                            break;
                        case "MAP":
                            var B = new u.a(A);
                            m.relurl = B.URI,
                            m.rawByteRange = B.BYTERANGE,
                            m.baseurl = e,
                            m.level = r,
                            m.type = i,
                            m.sn = "initSegment",
                            h.initSegment = m,
                            m = new a.a;
                            break;
                        default:
                            c.b.warn("line parsed but not handled: " + b)
                        }
                    }
                }
                return m = v,
                m && !m.relurl && (h.fragments.pop(),
                l -= m.duration),
                h.totalduration = l,
                h.averagetargetduration = l / h.fragments.length,
                h.endSN = o - 1,
                h.startCC = h.fragments[0] ? h.fragments[0].cc : 0,
                h.endCC = g,
                !h.initSegment && h.fragments.length && h.fragments.every(function(t) {
                    return y.test(t.relurl)
                }) && (c.b.warn("MP4 fragments found but no init segment (probably no MAP, incomplete M3U8), trying to fetch SIDX"),
                m = new a.a,
                m.relurl = h.fragments[0].relurl,
                m.baseurl = e,
                m.level = r,
                m.type = i,
                m.sn = "initSegment",
                h.initSegment = m,
                h.needSidxRanges = !0),
                h
            }
            ,
            t
        }();
        e.a = g
    }
    , function(t, e, r) {
        "use strict";
        function i(t, e) {
            if (!(t instanceof e))
                throw new TypeError("Cannot call a class as a function")
        }
        var n = /^(\d+)x(\d+)$/
          , o = /\s*(.+?)\s*=((?:\".*?\")|.*?)(?:,|$)/g
          , a = function() {
            function t(e) {
                i(this, t),
                "string" == typeof e && (e = t.parseAttrList(e));
                for (var r in e)
                    e.hasOwnProperty(r) && (this[r] = e[r])
            }
            return t.prototype.decimalInteger = function(t) {
                var e = parseInt(this[t], 10);
                return e > Number.MAX_SAFE_INTEGER ? 1 / 0 : e
            }
            ,
            t.prototype.hexadecimalInteger = function(t) {
                if (this[t]) {
                    var e = (this[t] || "0x").slice(2);
                    e = (1 & e.length ? "0" : "") + e;
                    for (var r = new Uint8Array(e.length / 2), i = 0; i < e.length / 2; i++)
                        r[i] = parseInt(e.slice(2 * i, 2 * i + 2), 16);
                    return r
                }
                return null
            }
            ,
            t.prototype.hexadecimalIntegerAsNumber = function(t) {
                var e = parseInt(this[t], 16);
                return e > Number.MAX_SAFE_INTEGER ? 1 / 0 : e
            }
            ,
            t.prototype.decimalFloatingPoint = function(t) {
                return parseFloat(this[t])
            }
            ,
            t.prototype.enumeratedString = function(t) {
                return this[t]
            }
            ,
            t.prototype.decimalResolution = function(t) {
                var e = n.exec(this[t]);
                if (null !== e)
                    return {
                        width: parseInt(e[1], 10),
                        height: parseInt(e[2], 10)
                    }
            }
            ,
            t.parseAttrList = function(t) {
                var e = void 0
                  , r = {};
                for (o.lastIndex = 0; null !== (e = o.exec(t)); ) {
                    var i = e[2];
                    0 === i.indexOf('"') && i.lastIndexOf('"') === i.length - 1 && (i = i.slice(1, -1)),
                    r[e[1]] = i
                }
                return r
            }
            ,
            t
        }();
        e.a = a
    }
    , function(t, e, r) {
        "use strict";
        function i(t, e) {
            if (!(t instanceof e))
                throw new TypeError("Cannot call a class as a function")
        }
        function n(t, e) {
            if (!t)
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !e || "object" != typeof e && "function" != typeof e ? t : e
        }
        function o(t, e) {
            if ("function" != typeof e && null !== e)
                throw new TypeError("Super expression must either be null or a function, not " + typeof e);
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }),
            e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }
        var a = r(3)
          , s = r(5)
          , u = r(4)
          , c = r(2)
          , l = function(t) {
            function e(r) {
                i(this, e);
                var o = n(this, t.call(this, r, a.a.FRAG_LOADING));
                return o.loaders = {},
                o.count = 0,
                o.fragRetryTimer = null,
                o
            }
            return o(e, t),
            e.prototype.destroy = function() {
                var e = this.loaders;
                for (var r in e) {
                    var i = e[r];
                    i && i.destroy()
                }
                this.loaders = {},
                this.count = 0,
                this.clearRetryTimer(),
                t.prototype.destroy.call(this)
            }
            ,
            e.prototype.onFragLoading = function(t) {
                var e = t.frag
                  , r = e.type
                  , i = this.loaders
                  , n = this.hls.config
                  , o = n.fLoader
                  , a = n.loader;
                e.loaded = 0;
                var s = i[r];
                s && (c.b.warn("abort previous fragment loader for type: " + r),
                s.abort()),
                s = i[r] = e.loader = n.fLoader ? new o(n) : new a(n);
                var u = void 0
                  , l = void 0
                  , h = void 0;
                u = {
                    url: e.url,
                    frag: e,
                    responseType: "arraybuffer",
                    progressData: !1
                };
                var f = e.byteRangeStartOffset
                  , d = e.byteRangeEndOffset;
                isNaN(f) || isNaN(d) || (u.rangeStart = f,
                u.rangeEnd = d),
                l = {
                    timeout: n.fragLoadingTimeOut,
                    maxRetry: 0,
                    retryDelay: 0,
                    maxRetryDelay: n.fragLoadingMaxRetryTimeout
                },
                h = {
                    onSuccess: this.loadsuccess.bind(this),
                    onError: this.loaderror.bind(this),
                    onTimeout: this.loadtimeout.bind(this),
                    onProgress: this.loadprogress.bind(this)
                },
                s.load(u, l, h)
            }
            ,
            e.prototype.loadsuccess = function(t, e, r) {
                var i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : null
                  , n = t.data
                  , o = r.frag;
                o.loader = void 0,
                this.loaders[o.type] = void 0,
                this.hls.trigger(a.a.FRAG_LOADED, {
                    payload: n,
                    frag: o,
                    stats: e,
                    networkDetails: i
                })
            }
            ,
            e.prototype.loaderror = function(t, e) {
                var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null;
                this.retryfragment(t, e, r, u.a.FRAG_LOAD_ERROR)
            }
            ,
            e.prototype.loadtimeout = function(t, e) {
                var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null;
                this.retryfragment(null, e, r, u.a.FRAG_LOAD_TIMEOUT)
            }
            ,
            e.prototype.clearRetryTimer = function() {
                this.fragRetryTimer && (clearTimeout(this.fragRetryTimer),
                this.fragRetryTimer = null)
            }
            ,
            e.prototype.retryfragment = function(t, e) {
                var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null
                  , i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : null
                  , n = e.loader
                  , o = this.hls.config.fragLoadingRetryDelay;
                n && n.abort();
                var s = this;
                this.count <= 3 ? (this.clearRetryTimer(),
                this.fragRetryTimer = setTimeout(function() {
                    s.loaders[e.type ? e.type : e.frag.type].reload()
                }, o > 1e3 ? o : 1e3),
                this.count++) : (this.loaders[e.type ? e.type : e.frag.type] = void 0,
                t ? this.hls.trigger(a.a.ERROR, {
                    type: u.b.NETWORK_ERROR,
                    details: i,
                    fatal: !1,
                    frag: e.frag,
                    response: t,
                    networkDetails: r
                }) : this.hls.trigger(a.a.ERROR, {
                    type: u.b.NETWORK_ERROR,
                    details: i,
                    fatal: !1,
                    frag: e.frag,
                    networkDetails: r
                }),
                this.count = 0)
            }
            ,
            e.prototype.loadprogress = function(t, e, r) {
                var i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : null
                  , n = e.frag;
                n.loaded = t.loaded,
                this.hls.trigger(a.a.FRAG_LOAD_PROGRESS, {
                    frag: n,
                    stats: t,
                    networkDetails: i
                })
            }
            ,
            e
        }(s.a);
        e.a = l
    }
    , function(t, e, r) {
        "use strict";
        function i(t, e) {
            if (!(t instanceof e))
                throw new TypeError("Cannot call a class as a function")
        }
        function n(t, e) {
            if (!t)
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !e || "object" != typeof e && "function" != typeof e ? t : e
        }
        function o(t, e) {
            if ("function" != typeof e && null !== e)
                throw new TypeError("Super expression must either be null or a function, not " + typeof e);
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }),
            e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }
        var a = r(3)
          , s = r(5)
          , u = r(4)
          , c = r(2)
          , l = r(73)
          , h = r.n(l)
          , f = r(80)
          , d = r(93)
          , p = r.n(d)
          , y = r(57)
          , g = function(t) {
            function e(r) {
                i(this, e);
                var o = n(this, t.call(this, r, a.a.KEY_LOADING));
                return o.loaders = {},
                o.decryptkey = null,
                o.decrypturl = null,
                o.aliyunUri = "",
                o.isAliyunEncrypt = !1,
                o.PUBLIC_KEY = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqFw8es0P7jNhIt5beGmwKSD/PJ7sLyTBTi3WmPDMnbmmfqpkSc9PvkfOAGubd9LcGpKMxiP+EZv4Wrj0fB3HbSfGf5eSdn6GrEhYTWppnnIZLhN7AfHewxZMpyCla9aWGJW2DSo0B93zFZdeDiW5w6MvZ9ukCian2d1AyIl2MKLoT1P3yH4KxMdhA3wTSm+KikVKDrMco5YdwWzZudHefbMZlC9tuuiQS2v13r5k9KmcxoHBuirsPzBbSn9BtK4rqsDOeZkAkvkiYP+4nYx/1HhPvRLMS69Txu+j7Pc7BAcrMQiUSxI6+PJ3gMDM5Db4K/zL0m6SqCBbDvmGm31bkQIDAQAB",
                o
            }
            return o(e, t),
            e.prototype.destroy = function() {
                for (var t in this.loaders) {
                    var e = this.loaders[t];
                    e && e.destroy()
                }
                this.loaders = {},
                s.a.prototype.destroy.call(this)
            }
            ,
            e.prototype.onKeyLoading = function(t) {
                var e = t.frag
                  , r = e.type
                  , i = this.loaders[r]
                  , n = e.decryptdata
                  , o = n.uri
                  , s = "";
                if (n.reluri && (s = this._parseAliyunEncrypt(n.reluri),
                o = s || n.uri),
                o !== this.decrypturl || null === this.decryptkey) {
                    var u = this.hls.config;
                    i && (c.b.warn("abort previous key loader for type:" + r),
                    i.abort()),
                    e.loader = this.loaders[r] = new u.loader(u),
                    this.decrypturl = o,
                    this.decryptkey = null;
                    var l = void 0
                      , h = void 0
                      , f = void 0;
                    l = {
                        url: o,
                        frag: e,
                        responseType: "arraybuffer"
                    },
                    h = {
                        timeout: u.fragLoadingTimeOut,
                        maxRetry: u.fragLoadingMaxRetry,
                        retryDelay: u.fragLoadingRetryDelay,
                        maxRetryDelay: u.fragLoadingMaxRetryTimeout
                    },
                    f = {
                        onSuccess: this.loadsuccess.bind(this),
                        onError: this.loaderror.bind(this),
                        onTimeout: this.loadtimeout.bind(this)
                    },
                    e.loader.load(l, h, f)
                } else
                    this.decryptkey && (e.decryptdata.key = this.decryptkey,
                    this.hls.trigger(a.a.KEY_LOADED, {
                        frag: e
                    }))
            }
            ,
            e.prototype.loadsuccess = function(t, e, r) {
                var i = null;
                if (this.isAliyunEncrypt) {
                    var n = this._decodeUtf8(t.data)
                      , o = JSON.parse(n);
                    o && o.Random && o.Plaintext && (i = this._sce_dlgtqred(this.r1, o.Random, o.Plaintext))
                }
                var s = r.frag;
                this.decryptkey = s.decryptdata.key = new Uint8Array(i || t.data),
                console.log("decryptkey:", this.decryptkey),
                s.loader = void 0,
                this.loaders[s.type] = void 0,
                this.hls.trigger(a.a.KEY_LOADED, {
                    frag: s
                })
            }
            ,
            e.prototype.loaderror = function(t, e) {
                var r = e.frag
                  , i = r.loader;
                i && i.abort(),
                this.loaders[e.type] = void 0,
                this.hls.trigger(a.a.ERROR, {
                    type: u.b.NETWORK_ERROR,
                    details: u.a.KEY_LOAD_ERROR,
                    fatal: !1,
                    frag: r,
                    response: t
                })
            }
            ,
            e.prototype.loadtimeout = function(t, e) {
                var r = e.frag
                  , i = r.loader;
                i && i.abort(),
                this.loaders[e.type] = void 0,
                this.hls.trigger(a.a.ERROR, {
                    type: u.b.NETWORK_ERROR,
                    details: u.a.KEY_LOAD_TIMEOUT,
                    fatal: !1,
                    frag: r
                })
            }
            ,
            e.prototype._parseAliyunEncrypt = function(t) {
                if (t && t.indexOf("metadata=type=aliyun") >= 0)
                    for (var e = t.split(";"), r = 0; r < e.length; ++r)
                        if (e[r]) {
                            var i = e[r].indexOf("=");
                            if (i >= 0) {
                                var n = e[r].substring(0, i);
                                if ("uri" == n) {
                                    if (this.aliyunUri === e[r])
                                        return this.decrypturl;
                                    var o = e[r].substring(i + 1, e[r].length);
                                    if ((i = o.indexOf("?")) >= 0) {
                                        var a = o.substring(i + 1, o.length);
                                        if ((i = a.indexOf("=")) > 0) {
                                            var s = a.substring(0, i)
                                              , u = a.substring(i + 1, a.length)
                                              , c = this.getParams(s, u);
                                            return this.isAliyunEncrypt = !0,
                                            this.aliyunUri = e[r],
                                            "https://live.aliyuncs.com?" + c
                                        }
                                    }
                                }
                            }
                        }
                return ""
            }
            ,
            e.prototype.getParams = function(t, e) {
                var r = this.hls.config.stream;
                this.r1 = this._sce_r_skjhfnck();
                var i = new f.a;
                i.setPublicKey("-----BEGIN PUBLIC KEY-----" + this.PUBLIC_KEY + "-----END PUBLIC KEY-----");
                var n = i.encrypt(this.r1 + r)
                  , o = {
                    Action: "DecryptKey",
                    Domain: this.hls.config.domain,
                    App: this.hls.config.app,
                    Stream: r,
                    SecurityToken: this.hls.config.securityToken,
                    Version: "2016-11-01",
                    Rand: n,
                    AccessKeyId: this.hls.config.accessKeyId,
                    SignatureMethod: "HMAC-SHA1",
                    Timestamp: this._ISODateString(new Date),
                    SignatureVersion: "1.0",
                    Format: "JSON",
                    SignatureNonce: String(h.a.randomUUID()),
                    RegionId: this.hls.config.regionId
                };
                o[t] = e;
                var a = this.hls.config.accessKeySecret;
                return h.a.makeUTF8sort(o, "=", "&") + "&Signature=" + h.a.AliyunEncodeURI(h.a.makeChangeSiga(o, a))
            }
            ,
            e.prototype._ISODateString = function(t) {
                function e(t) {
                    return t < 10 ? "0" + t : t
                }
                return t.getUTCFullYear() + "-" + e(t.getUTCMonth() + 1) + "-" + e(t.getUTCDate()) + "T" + e(t.getUTCHours()) + ":" + e(t.getUTCMinutes()) + ":" + e(t.getUTCSeconds()) + "Z"
            }
            ,
            e.prototype._decodeUtf8 = function(t) {
                var e = ""
                  , r = 0
                  , i = 0
                  , n = 0
                  , o = 0
                  , a = new Uint8Array(t);
                for (a.length >= 3 && 239 === a[0] && 187 === a[1] && 191 === a[2] && (r = 3); r < a.length; )
                    if ((i = a[r]) < 128)
                        e += String.fromCharCode(i),
                        r++;
                    else if (i > 191 && i < 224) {
                        if (r + 1 >= a.length)
                            throw "UTF-8 Decode failed. Two byte character was truncated.";
                        n = a[r + 1],
                        e += String.fromCharCode((31 & i) << 6 | 63 & n),
                        r += 2
                    } else {
                        if (r + 2 >= a.length)
                            throw "UTF-8 Decode failed. Multi byte character was truncated.";
                        n = a[r + 1],
                        o = a[r + 2],
                        e += String.fromCharCode((15 & i) << 12 | (63 & n) << 6 | 63 & o),
                        r += 3
                    }
                return e
            }
            ,
            e.prototype._sce_r_skjhfnck = function(t) {
                var e = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz234567890";
                t = t || 16;
                for (var r = e.length, i = "", n = 0; n < t; n++)
                    i += e.charAt(Math.floor(Math.random() * r));
                return i
            }
            ,
            e.prototype._sce_dlgtqred = function(t, e, r) {
                var i = p.a.MD5(t)
                  , n = i.toString().substring(8, 24)
                  , o = p.a.enc.Utf8.parse(n);
                e = e.replace(/[\r\n]/g, "");
                var a = p.a.AES.decrypt(e, o, {
                    iv: o,
                    mode: p.a.mode.CBC,
                    padding: p.a.pad.Pkcs7
                })
                  , s = a.toString(p.a.enc.Utf8)
                  , u = p.a.MD5(t + s)
                  , c = u.toString().substring(8, 24)
                  , l = p.a.enc.Utf8.parse(c)
                  , h = p.a.AES.decrypt(r, l, {
                    iv: o,
                    mode: p.a.mode.CBC,
                    padding: p.a.pad.Pkcs7
                })
                  , f = h.toString(p.a.enc.Utf8)
                  , d = p.a.enc.Base64.parse(f).toString();
                return console.log("plainText:", d),
                d = y.utils.hex.toBytes(d)
            }
            ,
            e
        }(s.a);
        e.a = g
    }
    , function(t, e, r) {
        var n = r(74)
          , o = r(78)
          , a = r(79);
        t.exports.randomUUID = function() {
            for (var t = [], e = "0123456789abcdef", r = 0; r < 36; r++)
                t[r] = e.substr(Math.floor(16 * Math.random()), 1);
            return t[14] = "4",
            t[19] = e.substr(3 & t[19] | 8, 1),
            t[8] = t[13] = t[18] = t[23] = "-",
            t.join("")
        }
        ,
        t.exports.returnUTCDate = function() {
            var t = new Date
              , e = t.getUTCFullYear()
              , r = t.getUTCMonth()
              , i = t.getUTCDate()
              , n = t.getUTCHours()
              , o = t.getUTCMinutes()
              , a = t.getUTCSeconds()
              , s = t.getUTCMilliseconds();
            return Date.UTC(e, r, i, n, o, a, s)
        }
        ,
        t.exports.AliyunEncodeURI = function(t) {
            var e = encodeURIComponent(t);
            return e = e.replace("+", "%2B"),
            e = e.replace("*", "%2A"),
            e = e.replace("%7E", "~")
        }
        ,
        t.exports.makesort = function(t, e, r) {
            if (!t)
                throw new Error("PrismPlayer Error: vid should not be null!");
            var i = [];
            for (var n in t)
                i.push(n);
            for (var o = i.sort(), a = "", s = o.length, n = 0; n < s; n++)
                "" == a ? a = o[n] + e + t[o[n]] : a += r + o[n] + e + t[o[n]];
            return a
        }
        ,
        t.exports.makeUTF8sort = function(e, r, i) {
            if (!e)
                throw new Error("PrismPlayer Error: vid should not be null!");
            var n = [];
            for (var o in e)
                n.push(o);
            for (var a = n.sort(), s = "", u = a.length, o = 0; o < u; o++) {
                var c = t.exports.AliyunEncodeURI(a[o])
                  , l = t.exports.AliyunEncodeURI(e[a[o]]);
                "" == s ? s = c + r + l : s += i + c + r + l
            }
            return s
        }
        ,
        t.exports.makeChangeSiga = function(e, r, i) {
            if (!e)
                throw new Error("PrismPlayer Error: vid should not be null!");
            return i || (i = "GET"),
            o.stringify(n(i + "&" + t.exports.AliyunEncodeURI("/") + "&" + t.exports.AliyunEncodeURI(t.exports.makeUTF8sort(e, "=", "&")), r + "&"))
        }
        ,
        t.exports.ISODateString = function(t) {
            function e(t) {
                return t < 10 ? "0" + t : t
            }
            return t.getUTCFullYear() + "-" + e(t.getUTCMonth() + 1) + "-" + e(t.getUTCDate()) + "T" + e(t.getUTCHours()) + ":" + e(t.getUTCMinutes()) + ":" + e(t.getUTCSeconds()) + "Z"
        }
        ,
        t.exports.encPlayAuth = function(t) {
            var t = a.stringify(o.parse(t));
            if (!t)
                throw new Error("playuth参数解析为空");
            return JSON.parse(t)
        }
        ,
        t.exports.encRsa = function() {}
        ,
        t.exports.stringToArray = function(t) {
            for (var e = new ArrayBuffer(2 * t.length), r = new Uint16Array(e), i = 0, n = t.length; i < n; i++)
                r[i] = t.charCodeAt(i);
            return r
        }
        ,
        t.exports.Uint8ArrayToString = function(t) {
            for (var e = "", r = 0; r < t.length; r++)
                e += String.fromCharCode(t[r]);
            return e
        }
        ,
        t.exports.arrayToString = function(t) {
            var e = new Uint16Array(t.buffer);
            return String.fromCharCode.apply(null, e)
        }
        ,
        t.exports.base64DecodeUint8Array = function(t) {
            var e = window.atob(t)
              , r = e.length
              , n = new Uint8Array(new ArrayBuffer(r));
            for (i = 0; i < r; i++)
                n[i] = e.charCodeAt(i);
            return n
        }
        ,
        t.exports.base64EncodeUint8Array = function(t) {
            for (var e, r, i, n, o, a, s, u = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", c = "", l = 0; l < t.length; )
                e = t[l++],
                r = l < t.length ? t[l++] : Number.NaN,
                i = l < t.length ? t[l++] : Number.NaN,
                n = e >> 2,
                o = (3 & e) << 4 | r >> 4,
                a = (15 & r) << 2 | i >> 6,
                s = 63 & i,
                isNaN(r) ? a = s = 64 : isNaN(i) && (s = 64),
                c += u.charAt(n) + u.charAt(o) + u.charAt(a) + u.charAt(s);
            return c
        }
    }
    , function(t, e, r) {
        !function(i, n, o) {
            t.exports = e = n(r(12), r(76), r(77))
        }(0, function(t) {
            return t.HmacSHA1
        })
    }
    , function(t, e) {}
    , function(t, e, r) {
        !function(i, n) {
            t.exports = e = n(r(12))
        }(0, function(t) {
            return function() {
                var e = t
                  , r = e.lib
                  , i = r.WordArray
                  , n = r.Hasher
                  , o = e.algo
                  , a = []
                  , s = o.SHA1 = n.extend({
                    _doReset: function() {
                        this._hash = new i.init([1732584193, 4023233417, 2562383102, 271733878, 3285377520])
                    },
                    _doProcessBlock: function(t, e) {
                        for (var r = this._hash.words, i = r[0], n = r[1], o = r[2], s = r[3], u = r[4], c = 0; c < 80; c++) {
                            if (c < 16)
                                a[c] = 0 | t[e + c];
                            else {
                                var l = a[c - 3] ^ a[c - 8] ^ a[c - 14] ^ a[c - 16];
                                a[c] = l << 1 | l >>> 31
                            }
                            var h = (i << 5 | i >>> 27) + u + a[c];
                            h += c < 20 ? 1518500249 + (n & o | ~n & s) : c < 40 ? 1859775393 + (n ^ o ^ s) : c < 60 ? (n & o | n & s | o & s) - 1894007588 : (n ^ o ^ s) - 899497514,
                            u = s,
                            s = o,
                            o = n << 30 | n >>> 2,
                            n = i,
                            i = h
                        }
                        r[0] = r[0] + i | 0,
                        r[1] = r[1] + n | 0,
                        r[2] = r[2] + o | 0,
                        r[3] = r[3] + s | 0,
                        r[4] = r[4] + u | 0
                    },
                    _doFinalize: function() {
                        var t = this._data
                          , e = t.words
                          , r = 8 * this._nDataBytes
                          , i = 8 * t.sigBytes;
                        return e[i >>> 5] |= 128 << 24 - i % 32,
                        e[14 + (i + 64 >>> 9 << 4)] = Math.floor(r / 4294967296),
                        e[15 + (i + 64 >>> 9 << 4)] = r,
                        t.sigBytes = 4 * e.length,
                        this._process(),
                        this._hash
                    },
                    clone: function() {
                        var t = n.clone.call(this);
                        return t._hash = this._hash.clone(),
                        t
                    }
                });
                e.SHA1 = n._createHelper(s),
                e.HmacSHA1 = n._createHmacHelper(s)
            }(),
            t.SHA1
        })
    }
    , function(t, e, r) {
        !function(i, n) {
            t.exports = e = n(r(12))
        }(0, function(t) {
            !function() {
                var e = t
                  , r = e.lib
                  , i = r.Base
                  , n = e.enc
                  , o = n.Utf8
                  , a = e.algo;
                a.HMAC = i.extend({
                    init: function(t, e) {
                        t = this._hasher = new t.init,
                        "string" == typeof e && (e = o.parse(e));
                        var r = t.blockSize
                          , i = 4 * r;
                        e.sigBytes > i && (e = t.finalize(e)),
                        e.clamp();
                        for (var n = this._oKey = e.clone(), a = this._iKey = e.clone(), s = n.words, u = a.words, c = 0; c < r; c++)
                            s[c] ^= 1549556828,
                            u[c] ^= 909522486;
                        n.sigBytes = a.sigBytes = i,
                        this.reset()
                    },
                    reset: function() {
                        var t = this._hasher;
                        t.reset(),
                        t.update(this._iKey)
                    },
                    update: function(t) {
                        return this._hasher.update(t),
                        this
                    },
                    finalize: function(t) {
                        var e = this._hasher
                          , r = e.finalize(t);
                        return e.reset(),
                        e.finalize(this._oKey.clone().concat(r))
                    }
                })
            }()
        })
    }
    , function(t, e, r) {
        !function(i, n) {
            t.exports = e = n(r(12))
        }(0, function(t) {
            return function() {
                function e(t, e, r) {
                    for (var i = [], o = 0, a = 0; a < e; a++)
                        if (a % 4) {
                            var s = r[t.charCodeAt(a - 1)] << a % 4 * 2
                              , u = r[t.charCodeAt(a)] >>> 6 - a % 4 * 2
                              , c = s | u;
                            i[o >>> 2] |= c << 24 - o % 4 * 8,
                            o++
                        }
                    return n.create(i, o)
                }
                var r = t
                  , i = r.lib
                  , n = i.WordArray
                  , o = r.enc;
                o.Base64 = {
                    stringify: function(t) {
                        var e = t.words
                          , r = t.sigBytes
                          , i = this._map;
                        t.clamp();
                        for (var n = [], o = 0; o < r; o += 3)
                            for (var a = e[o >>> 2] >>> 24 - o % 4 * 8 & 255, s = e[o + 1 >>> 2] >>> 24 - (o + 1) % 4 * 8 & 255, u = e[o + 2 >>> 2] >>> 24 - (o + 2) % 4 * 8 & 255, c = a << 16 | s << 8 | u, l = 0; l < 4 && o + .75 * l < r; l++)
                                n.push(i.charAt(c >>> 6 * (3 - l) & 63));
                        var h = i.charAt(64);
                        if (h)
                            for (; n.length % 4; )
                                n.push(h);
                        return n.join("")
                    },
                    parse: function(t) {
                        var r = t.length
                          , i = this._map
                          , n = this._reverseMap;
                        if (!n) {
                            n = this._reverseMap = [];
                            for (var o = 0; o < i.length; o++)
                                n[i.charCodeAt(o)] = o
                        }
                        var a = i.charAt(64);
                        if (a) {
                            var s = t.indexOf(a);
                            -1 !== s && (r = s)
                        }
                        return e(t, r, n)
                    },
                    _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
                }
            }(),
            t.enc.Base64
        })
    }
    , function(t, e, r) {
        !function(i, n) {
            t.exports = e = n(r(12))
        }(0, function(t) {
            return t.enc.Utf8
        })
    }
    , function(t, e, r) {
        "use strict";
        var i = r(81);
        e.a = i.a
    }
    , function(t, e, r) {
        "use strict";
        (function(t) {
            r.d(e, "a", function() {
                return s
            });
            var i, n = r(31), o = r(83), a = void 0 !== t ? null === (i = t.env) || void 0 === i ? void 0 : i.npm_package_version : void 0, s = function() {
                function t(t) {
                    void 0 === t && (t = {}),
                    t = t || {},
                    this.default_key_size = t.default_key_size ? parseInt(t.default_key_size, 10) : 1024,
                    this.default_public_exponent = t.default_public_exponent || "010001",
                    this.log = t.log || !1,
                    this.key = null
                }
                return t.prototype.setKey = function(t) {
                    this.log && this.key && console.warn("A key was already set, overriding existing."),
                    this.key = new o.a(t)
                }
                ,
                t.prototype.setPrivateKey = function(t) {
                    this.setKey(t)
                }
                ,
                t.prototype.setPublicKey = function(t) {
                    this.setKey(t)
                }
                ,
                t.prototype.decrypt = function(t) {
                    try {
                        return this.getKey().decrypt(Object(n.a)(t))
                    } catch (t) {
                        return !1
                    }
                }
                ,
                t.prototype.encrypt = function(t) {
                    try {
                        return Object(n.b)(this.getKey().encrypt(t))
                    } catch (t) {
                        return !1
                    }
                }
                ,
                t.prototype.sign = function(t, e, r) {
                    try {
                        return Object(n.b)(this.getKey().sign(t, e, r))
                    } catch (t) {
                        return !1
                    }
                }
                ,
                t.prototype.verify = function(t, e, r) {
                    try {
                        return this.getKey().verify(t, Object(n.a)(e), r)
                    } catch (t) {
                        return !1
                    }
                }
                ,
                t.prototype.getKey = function(t) {
                    if (!this.key) {
                        if (this.key = new o.a,
                        t && "[object Function]" === {}.toString.call(t))
                            return void this.key.generateAsync(this.default_key_size, this.default_public_exponent, t);
                        this.key.generate(this.default_key_size, this.default_public_exponent)
                    }
                    return this.key
                }
                ,
                t.prototype.getPrivateKey = function() {
                    return this.getKey().getPrivateKey()
                }
                ,
                t.prototype.getPrivateKeyB64 = function() {
                    return this.getKey().getPrivateBaseKeyB64()
                }
                ,
                t.prototype.getPublicKey = function() {
                    return this.getKey().getPublicKey()
                }
                ,
                t.prototype.getPublicKeyB64 = function() {
                    return this.getKey().getPublicBaseKeyB64()
                }
                ,
                t.version = a,
                t
            }()
        }
        ).call(e, r(82))
    }
    , function(t, e) {
        function r() {
            throw new Error("setTimeout has not been defined")
        }
        function i() {
            throw new Error("clearTimeout has not been defined")
        }
        function n(t) {
            if (l === setTimeout)
                return setTimeout(t, 0);
            if ((l === r || !l) && setTimeout)
                return l = setTimeout,
                setTimeout(t, 0);
            try {
                return l(t, 0)
            } catch (e) {
                try {
                    return l.call(null, t, 0)
                } catch (e) {
                    return l.call(this, t, 0)
                }
            }
        }
        function o(t) {
            if (h === clearTimeout)
                return clearTimeout(t);
            if ((h === i || !h) && clearTimeout)
                return h = clearTimeout,
                clearTimeout(t);
            try {
                return h(t)
            } catch (e) {
                try {
                    return h.call(null, t)
                } catch (e) {
                    return h.call(this, t)
                }
            }
        }
        function a() {
            y && d && (y = !1,
            d.length ? p = d.concat(p) : g = -1,
            p.length && s())
        }
        function s() {
            if (!y) {
                var t = n(a);
                y = !0;
                for (var e = p.length; e; ) {
                    for (d = p,
                    p = []; ++g < e; )
                        d && d[g].run();
                    g = -1,
                    e = p.length
                }
                d = null,
                y = !1,
                o(t)
            }
        }
        function u(t, e) {
            this.fun = t,
            this.array = e
        }
        function c() {}
        var l, h, f = t.exports = {};
        !function() {
            try {
                l = "function" == typeof setTimeout ? setTimeout : r
            } catch (t) {
                l = r
            }
            try {
                h = "function" == typeof clearTimeout ? clearTimeout : i
            } catch (t) {
                h = i
            }
        }();
        var d, p = [], y = !1, g = -1;
        f.nextTick = function(t) {
            var e = new Array(arguments.length - 1);
            if (arguments.length > 1)
                for (var r = 1; r < arguments.length; r++)
                    e[r - 1] = arguments[r];
            p.push(new u(t,e)),
            1 !== p.length || y || n(s)
        }
        ,
        u.prototype.run = function() {
            this.fun.apply(null, this.array)
        }
        ,
        f.title = "browser",
        f.browser = !0,
        f.env = {},
        f.argv = [],
        f.version = "",
        f.versions = {},
        f.on = c,
        f.addListener = c,
        f.once = c,
        f.off = c,
        f.removeListener = c,
        f.removeAllListeners = c,
        f.emit = c,
        f.prependListener = c,
        f.prependOnceListener = c,
        f.listeners = function(t) {
            return []
        }
        ,
        f.binding = function(t) {
            throw new Error("process.binding is not supported")
        }
        ,
        f.cwd = function() {
            return "/"
        }
        ,
        f.chdir = function(t) {
            throw new Error("process.chdir is not supported")
        }
        ,
        f.umask = function() {
            return 0
        }
    }
    , function(t, e, r) {
        "use strict";
        r.d(e, "a", function() {
            return h
        });
        var i = r(31)
          , n = r(84)
          , o = r(85)
          , a = r(86)
          , s = r(88)
          , u = r(19)
          , c = r(91)
          , l = this && this.__extends || function() {
            var t = function(e, r) {
                return (t = Object.setPrototypeOf || {
                    __proto__: []
                }instanceof Array && function(t, e) {
                    t.__proto__ = e
                }
                || function(t, e) {
                    for (var r in e)
                        Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r])
                }
                )(e, r)
            };
            return function(e, r) {
                function i() {
                    this.constructor = e
                }
                if ("function" != typeof r && null !== r)
                    throw new TypeError("Class extends value " + String(r) + " is not a constructor or null");
                t(e, r),
                e.prototype = null === r ? Object.create(r) : (i.prototype = r.prototype,
                new i)
            }
        }()
          , h = function(t) {
            function e(r) {
                var i = t.call(this) || this;
                return r && ("string" == typeof r ? i.parseKey(r) : (e.hasPrivateKeyProperty(r) || e.hasPublicKeyProperty(r)) && i.parsePropertiesFrom(r)),
                i
            }
            return l(e, t),
            e.prototype.parseKey = function(t) {
                try {
                    var e = 0
                      , r = 0
                      , i = /^\s*(?:[0-9A-Fa-f][0-9A-Fa-f]\s*)+$/
                      , s = i.test(t) ? n.a.decode(t) : o.a.unarmor(t)
                      , c = a.a.decode(s);
                    if (3 === c.sub.length && (c = c.sub[2].sub[0]),
                    9 === c.sub.length) {
                        e = c.sub[1].getHexStringValue(),
                        this.n = Object(u.c)(e, 16),
                        r = c.sub[2].getHexStringValue(),
                        this.e = parseInt(r, 16);
                        var l = c.sub[3].getHexStringValue();
                        this.d = Object(u.c)(l, 16);
                        var h = c.sub[4].getHexStringValue();
                        this.p = Object(u.c)(h, 16);
                        var f = c.sub[5].getHexStringValue();
                        this.q = Object(u.c)(f, 16);
                        var d = c.sub[6].getHexStringValue();
                        this.dmp1 = Object(u.c)(d, 16);
                        var p = c.sub[7].getHexStringValue();
                        this.dmq1 = Object(u.c)(p, 16);
                        var y = c.sub[8].getHexStringValue();
                        this.coeff = Object(u.c)(y, 16)
                    } else {
                        if (2 !== c.sub.length)
                            return !1;
                        if (c.sub[0].sub) {
                            var g = c.sub[1]
                              , v = g.sub[0];
                            e = v.sub[0].getHexStringValue(),
                            this.n = Object(u.c)(e, 16),
                            r = v.sub[1].getHexStringValue(),
                            this.e = parseInt(r, 16)
                        } else
                            e = c.sub[0].getHexStringValue(),
                            this.n = Object(u.c)(e, 16),
                            r = c.sub[1].getHexStringValue(),
                            this.e = parseInt(r, 16)
                    }
                    return !0
                } catch (t) {
                    return !1
                }
            }
            ,
            e.prototype.getPrivateBaseKey = function() {
                var t = {
                    array: [new c.a.asn1.DERInteger({
                        int: 0
                    }), new c.a.asn1.DERInteger({
                        bigint: this.n
                    }), new c.a.asn1.DERInteger({
                        int: this.e
                    }), new c.a.asn1.DERInteger({
                        bigint: this.d
                    }), new c.a.asn1.DERInteger({
                        bigint: this.p
                    }), new c.a.asn1.DERInteger({
                        bigint: this.q
                    }), new c.a.asn1.DERInteger({
                        bigint: this.dmp1
                    }), new c.a.asn1.DERInteger({
                        bigint: this.dmq1
                    }), new c.a.asn1.DERInteger({
                        bigint: this.coeff
                    })]
                };
                return new c.a.asn1.DERSequence(t).getEncodedHex()
            }
            ,
            e.prototype.getPrivateBaseKeyB64 = function() {
                return Object(i.b)(this.getPrivateBaseKey())
            }
            ,
            e.prototype.getPublicBaseKey = function() {
                var t = new c.a.asn1.DERSequence({
                    array: [new c.a.asn1.DERObjectIdentifier({
                        oid: "1.2.840.113549.1.1.1"
                    }), new c.a.asn1.DERNull]
                })
                  , e = new c.a.asn1.DERSequence({
                    array: [new c.a.asn1.DERInteger({
                        bigint: this.n
                    }), new c.a.asn1.DERInteger({
                        int: this.e
                    })]
                })
                  , r = new c.a.asn1.DERBitString({
                    hex: "00" + e.getEncodedHex()
                });
                return new c.a.asn1.DERSequence({
                    array: [t, r]
                }).getEncodedHex()
            }
            ,
            e.prototype.getPublicBaseKeyB64 = function() {
                return Object(i.b)(this.getPublicBaseKey())
            }
            ,
            e.wordwrap = function(t, e) {
                if (e = e || 64,
                !t)
                    return t;
                var r = "(.{1," + e + "})( +|$\n?)|(.{1," + e + "})";
                return t.match(RegExp(r, "g")).join("\n")
            }
            ,
            e.prototype.getPrivateKey = function() {
                var t = "-----BEGIN RSA PRIVATE KEY-----\n";
                return t += e.wordwrap(this.getPrivateBaseKeyB64()) + "\n",
                t += "-----END RSA PRIVATE KEY-----"
            }
            ,
            e.prototype.getPublicKey = function() {
                var t = "-----BEGIN PUBLIC KEY-----\n";
                return t += e.wordwrap(this.getPublicBaseKeyB64()) + "\n",
                t += "-----END PUBLIC KEY-----"
            }
            ,
            e.hasPublicKeyProperty = function(t) {
                return t = t || {},
                t.hasOwnProperty("n") && t.hasOwnProperty("e")
            }
            ,
            e.hasPrivateKeyProperty = function(t) {
                return t = t || {},
                t.hasOwnProperty("n") && t.hasOwnProperty("e") && t.hasOwnProperty("d") && t.hasOwnProperty("p") && t.hasOwnProperty("q") && t.hasOwnProperty("dmp1") && t.hasOwnProperty("dmq1") && t.hasOwnProperty("coeff")
            }
            ,
            e.prototype.parsePropertiesFrom = function(t) {
                this.n = t.n,
                this.e = t.e,
                t.hasOwnProperty("d") && (this.d = t.d,
                this.p = t.p,
                this.q = t.q,
                this.dmp1 = t.dmp1,
                this.dmq1 = t.dmq1,
                this.coeff = t.coeff)
            }
            ,
            e
        }(s.a)
    }
    , function(t, e, r) {
        "use strict";
        r.d(e, "a", function() {
            return n
        });
        var i, n = {
            decode: function(t) {
                var e;
                if (void 0 === i) {
                    var r = "0123456789ABCDEF"
                      , n = " \f\n\r\t \u2028\u2029";
                    for (i = {},
                    e = 0; e < 16; ++e)
                        i[r.charAt(e)] = e;
                    for (r = r.toLowerCase(),
                    e = 10; e < 16; ++e)
                        i[r.charAt(e)] = e;
                    for (e = 0; e < n.length; ++e)
                        i[n.charAt(e)] = -1
                }
                var o = []
                  , a = 0
                  , s = 0;
                for (e = 0; e < t.length; ++e) {
                    var u = t.charAt(e);
                    if ("=" == u)
                        break;
                    if (-1 != (u = i[u])) {
                        if (void 0 === u)
                            throw new Error("Illegal character at offset " + e);
                        a |= u,
                        ++s >= 2 ? (o[o.length] = a,
                        a = 0,
                        s = 0) : a <<= 4
                    }
                }
                if (s)
                    throw new Error("Hex encoding incomplete: 4 bits missing");
                return o
            }
        }
    }
    , function(t, e, r) {
        "use strict";
        r.d(e, "a", function() {
            return n
        });
        var i, n = {
            decode: function(t) {
                var e;
                if (void 0 === i) {
                    var r = "= \f\n\r\t \u2028\u2029";
                    for (i = Object.create(null),
                    e = 0; e < 64; ++e)
                        i["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(e)] = e;
                    for (i["-"] = 62,
                    i._ = 63,
                    e = 0; e < r.length; ++e)
                        i[r.charAt(e)] = -1
                }
                var n = []
                  , o = 0
                  , a = 0;
                for (e = 0; e < t.length; ++e) {
                    var s = t.charAt(e);
                    if ("=" == s)
                        break;
                    if (-1 != (s = i[s])) {
                        if (void 0 === s)
                            throw new Error("Illegal character at offset " + e);
                        o |= s,
                        ++a >= 4 ? (n[n.length] = o >> 16,
                        n[n.length] = o >> 8 & 255,
                        n[n.length] = 255 & o,
                        o = 0,
                        a = 0) : o <<= 6
                    }
                }
                switch (a) {
                case 1:
                    throw new Error("Base64 encoding incomplete: at least 2 bits missing");
                case 2:
                    n[n.length] = o >> 10;
                    break;
                case 3:
                    n[n.length] = o >> 16,
                    n[n.length] = o >> 8 & 255
                }
                return n
            },
            re: /-----BEGIN [^-]+-----([A-Za-z0-9+\/=\s]+)-----END [^-]+-----|begin-base64[^\n]+\n([A-Za-z0-9+\/=\s]+)====/,
            unarmor: function(t) {
                var e = n.re.exec(t);
                if (e)
                    if (e[1])
                        t = e[1];
                    else {
                        if (!e[2])
                            throw new Error("RegExp out of sync");
                        t = e[2]
                    }
                return n.decode(t)
            }
        }
    }
    , function(t, e, r) {
        "use strict";
        function i(t, e) {
            return t.length > e && (t = t.substring(0, e) + o),
            t
        }
        r.d(e, "a", function() {
            return c
        });
        var n = r(87)
          , o = "…"
          , a = /^(\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/
          , s = /^(\d\d\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/
          , u = function() {
            function t(e, r) {
                this.hexDigits = "0123456789ABCDEF",
                e instanceof t ? (this.enc = e.enc,
                this.pos = e.pos) : (this.enc = e,
                this.pos = r)
            }
            return t.prototype.get = function(t) {
                if (void 0 === t && (t = this.pos++),
                t >= this.enc.length)
                    throw new Error("Requesting byte offset ".concat(t, " on a stream of length ").concat(this.enc.length));
                return "string" == typeof this.enc ? this.enc.charCodeAt(t) : this.enc[t]
            }
            ,
            t.prototype.hexByte = function(t) {
                return this.hexDigits.charAt(t >> 4 & 15) + this.hexDigits.charAt(15 & t)
            }
            ,
            t.prototype.hexDump = function(t, e, r) {
                for (var i = "", n = t; n < e; ++n)
                    if (i += this.hexByte(this.get(n)),
                    !0 !== r)
                        switch (15 & n) {
                        case 7:
                            i += "  ";
                            break;
                        case 15:
                            i += "\n";
                            break;
                        default:
                            i += " "
                        }
                return i
            }
            ,
            t.prototype.isASCII = function(t, e) {
                for (var r = t; r < e; ++r) {
                    var i = this.get(r);
                    if (i < 32 || i > 176)
                        return !1
                }
                return !0
            }
            ,
            t.prototype.parseStringISO = function(t, e) {
                for (var r = "", i = t; i < e; ++i)
                    r += String.fromCharCode(this.get(i));
                return r
            }
            ,
            t.prototype.parseStringUTF = function(t, e) {
                for (var r = "", i = t; i < e; ) {
                    var n = this.get(i++);
                    r += n < 128 ? String.fromCharCode(n) : n > 191 && n < 224 ? String.fromCharCode((31 & n) << 6 | 63 & this.get(i++)) : String.fromCharCode((15 & n) << 12 | (63 & this.get(i++)) << 6 | 63 & this.get(i++))
                }
                return r
            }
            ,
            t.prototype.parseStringBMP = function(t, e) {
                for (var r, i, n = "", o = t; o < e; )
                    r = this.get(o++),
                    i = this.get(o++),
                    n += String.fromCharCode(r << 8 | i);
                return n
            }
            ,
            t.prototype.parseTime = function(t, e, r) {
                var i = this.parseStringISO(t, e)
                  , n = (r ? a : s).exec(i);
                return n ? (r && (n[1] = +n[1],
                n[1] += +n[1] < 70 ? 2e3 : 1900),
                i = n[1] + "-" + n[2] + "-" + n[3] + " " + n[4],
                n[5] && (i += ":" + n[5],
                n[6] && (i += ":" + n[6],
                n[7] && (i += "." + n[7]))),
                n[8] && (i += " UTC",
                "Z" != n[8] && (i += n[8],
                n[9] && (i += ":" + n[9]))),
                i) : "Unrecognized time: " + i
            }
            ,
            t.prototype.parseInteger = function(t, e) {
                for (var r, i = this.get(t), o = i > 127, a = o ? 255 : 0, s = ""; i == a && ++t < e; )
                    i = this.get(t);
                if (0 === (r = e - t))
                    return o ? -1 : 0;
                if (r > 4) {
                    for (s = i,
                    r <<= 3; 0 == (128 & (+s ^ a)); )
                        s = +s << 1,
                        --r;
                    s = "(" + r + " bit)\n"
                }
                o && (i -= 256);
                for (var u = new n.a(i), c = t + 1; c < e; ++c)
                    u.mulAdd(256, this.get(c));
                return s + u.toString()
            }
            ,
            t.prototype.parseBitString = function(t, e, r) {
                for (var n = this.get(t), o = (e - t - 1 << 3) - n, a = "(" + o + " bit)\n", s = "", u = t + 1; u < e; ++u) {
                    for (var c = this.get(u), l = u == e - 1 ? n : 0, h = 7; h >= l; --h)
                        s += c >> h & 1 ? "1" : "0";
                    if (s.length > r)
                        return a + i(s, r)
                }
                return a + s
            }
            ,
            t.prototype.parseOctetString = function(t, e, r) {
                if (this.isASCII(t, e))
                    return i(this.parseStringISO(t, e), r);
                var n = e - t
                  , a = "(" + n + " byte)\n";
                r /= 2,
                n > r && (e = t + r);
                for (var s = t; s < e; ++s)
                    a += this.hexByte(this.get(s));
                return n > r && (a += o),
                a
            }
            ,
            t.prototype.parseOID = function(t, e, r) {
                for (var o = "", a = new n.a, s = 0, u = t; u < e; ++u) {
                    var c = this.get(u);
                    if (a.mulAdd(128, 127 & c),
                    s += 7,
                    !(128 & c)) {
                        if ("" === o)
                            if ((a = a.simplify())instanceof n.a)
                                a.sub(80),
                                o = "2." + a.toString();
                            else {
                                var l = a < 80 ? a < 40 ? 0 : 1 : 2;
                                o = l + "." + (a - 40 * l)
                            }
                        else
                            o += "." + a.toString();
                        if (o.length > r)
                            return i(o, r);
                        a = new n.a,
                        s = 0
                    }
                }
                return s > 0 && (o += ".incomplete"),
                o
            }
            ,
            t
        }()
          , c = function() {
            function t(t, e, r, i, n) {
                if (!(i instanceof l))
                    throw new Error("Invalid tag value.");
                this.stream = t,
                this.header = e,
                this.length = r,
                this.tag = i,
                this.sub = n
            }
            return t.prototype.typeName = function() {
                switch (this.tag.tagClass) {
                case 0:
                    switch (this.tag.tagNumber) {
                    case 0:
                        return "EOC";
                    case 1:
                        return "BOOLEAN";
                    case 2:
                        return "INTEGER";
                    case 3:
                        return "BIT_STRING";
                    case 4:
                        return "OCTET_STRING";
                    case 5:
                        return "NULL";
                    case 6:
                        return "OBJECT_IDENTIFIER";
                    case 7:
                        return "ObjectDescriptor";
                    case 8:
                        return "EXTERNAL";
                    case 9:
                        return "REAL";
                    case 10:
                        return "ENUMERATED";
                    case 11:
                        return "EMBEDDED_PDV";
                    case 12:
                        return "UTF8String";
                    case 16:
                        return "SEQUENCE";
                    case 17:
                        return "SET";
                    case 18:
                        return "NumericString";
                    case 19:
                        return "PrintableString";
                    case 20:
                        return "TeletexString";
                    case 21:
                        return "VideotexString";
                    case 22:
                        return "IA5String";
                    case 23:
                        return "UTCTime";
                    case 24:
                        return "GeneralizedTime";
                    case 25:
                        return "GraphicString";
                    case 26:
                        return "VisibleString";
                    case 27:
                        return "GeneralString";
                    case 28:
                        return "UniversalString";
                    case 30:
                        return "BMPString"
                    }
                    return "Universal_" + this.tag.tagNumber.toString();
                case 1:
                    return "Application_" + this.tag.tagNumber.toString();
                case 2:
                    return "[" + this.tag.tagNumber.toString() + "]";
                case 3:
                    return "Private_" + this.tag.tagNumber.toString()
                }
            }
            ,
            t.prototype.content = function(t) {
                if (void 0 === this.tag)
                    return null;
                void 0 === t && (t = 1 / 0);
                var e = this.posContent()
                  , r = Math.abs(this.length);
                if (!this.tag.isUniversal())
                    return null !== this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseOctetString(e, e + r, t);
                switch (this.tag.tagNumber) {
                case 1:
                    return 0 === this.stream.get(e) ? "false" : "true";
                case 2:
                    return this.stream.parseInteger(e, e + r);
                case 3:
                    return this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseBitString(e, e + r, t);
                case 4:
                    return this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseOctetString(e, e + r, t);
                case 6:
                    return this.stream.parseOID(e, e + r, t);
                case 16:
                case 17:
                    return null !== this.sub ? "(" + this.sub.length + " elem)" : "(no elem)";
                case 12:
                    return i(this.stream.parseStringUTF(e, e + r), t);
                case 18:
                case 19:
                case 20:
                case 21:
                case 22:
                case 26:
                    return i(this.stream.parseStringISO(e, e + r), t);
                case 30:
                    return i(this.stream.parseStringBMP(e, e + r), t);
                case 23:
                case 24:
                    return this.stream.parseTime(e, e + r, 23 == this.tag.tagNumber)
                }
                return null
            }
            ,
            t.prototype.toString = function() {
                return this.typeName() + "@" + this.stream.pos + "[header:" + this.header + ",length:" + this.length + ",sub:" + (null === this.sub ? "null" : this.sub.length) + "]"
            }
            ,
            t.prototype.toPrettyString = function(t) {
                void 0 === t && (t = "");
                var e = t + this.typeName() + " @" + this.stream.pos;
                if (this.length >= 0 && (e += "+"),
                e += this.length,
                this.tag.tagConstructed ? e += " (constructed)" : !this.tag.isUniversal() || 3 != this.tag.tagNumber && 4 != this.tag.tagNumber || null === this.sub || (e += " (encapsulates)"),
                e += "\n",
                null !== this.sub) {
                    t += "  ";
                    for (var r = 0, i = this.sub.length; r < i; ++r)
                        e += this.sub[r].toPrettyString(t)
                }
                return e
            }
            ,
            t.prototype.posStart = function() {
                return this.stream.pos
            }
            ,
            t.prototype.posContent = function() {
                return this.stream.pos + this.header
            }
            ,
            t.prototype.posEnd = function() {
                return this.stream.pos + this.header + Math.abs(this.length)
            }
            ,
            t.prototype.toHexString = function() {
                return this.stream.hexDump(this.posStart(), this.posEnd(), !0)
            }
            ,
            t.decodeLength = function(t) {
                var e = t.get()
                  , r = 127 & e;
                if (r == e)
                    return r;
                if (r > 6)
                    throw new Error("Length over 48 bits not supported at position " + (t.pos - 1));
                if (0 === r)
                    return null;
                e = 0;
                for (var i = 0; i < r; ++i)
                    e = 256 * e + t.get();
                return e
            }
            ,
            t.prototype.getHexStringValue = function() {
                var t = this.toHexString()
                  , e = 2 * this.header
                  , r = 2 * this.length;
                return t.substr(e, r)
            }
            ,
            t.decode = function(e) {
                var r;
                r = e instanceof u ? e : new u(e,0);
                var i = new u(r)
                  , n = new l(r)
                  , o = t.decodeLength(r)
                  , a = r.pos
                  , s = a - i.pos
                  , c = null
                  , h = function() {
                    var e = [];
                    if (null !== o) {
                        for (var i = a + o; r.pos < i; )
                            e[e.length] = t.decode(r);
                        if (r.pos != i)
                            throw new Error("Content size is not correct for container starting at offset " + a)
                    } else
                        try {
                            for (; ; ) {
                                var n = t.decode(r);
                                if (n.tag.isEOC())
                                    break;
                                e[e.length] = n
                            }
                            o = a - r.pos
                        } catch (t) {
                            throw new Error("Exception while decoding undefined length content: " + t)
                        }
                    return e
                };
                if (n.tagConstructed)
                    c = h();
                else if (n.isUniversal() && (3 == n.tagNumber || 4 == n.tagNumber))
                    try {
                        if (3 == n.tagNumber && 0 != r.get())
                            throw new Error("BIT STRINGs with unused bits cannot encapsulate.");
                        c = h();
                        for (var f = 0; f < c.length; ++f)
                            if (c[f].tag.isEOC())
                                throw new Error("EOC is not supposed to be actual content.")
                    } catch (t) {
                        c = null
                    }
                if (null === c) {
                    if (null === o)
                        throw new Error("We can't skip over an invalid tag with undefined length at offset " + a);
                    r.pos = a + Math.abs(o)
                }
                return new t(i,s,o,n,c)
            }
            ,
            t
        }()
          , l = function() {
            function t(t) {
                var e = t.get();
                if (this.tagClass = e >> 6,
                this.tagConstructed = 0 != (32 & e),
                this.tagNumber = 31 & e,
                31 == this.tagNumber) {
                    var r = new n.a;
                    do {
                        e = t.get(),
                        r.mulAdd(128, 127 & e)
                    } while (128 & e);
                    this.tagNumber = r.simplify()
                }
            }
            return t.prototype.isUniversal = function() {
                return 0 === this.tagClass
            }
            ,
            t.prototype.isEOC = function() {
                return 0 === this.tagClass && 0 === this.tagNumber
            }
            ,
            t
        }()
    }
    , function(t, e, r) {
        "use strict";
        r.d(e, "a", function() {
            return i
        });
        var i = function() {
            function t(t) {
                this.buf = [+t || 0]
            }
            return t.prototype.mulAdd = function(t, e) {
                var r, i, n = this.buf, o = n.length;
                for (r = 0; r < o; ++r)
                    i = n[r] * t + e,
                    i < 1e13 ? e = 0 : (e = 0 | i / 1e13,
                    i -= 1e13 * e),
                    n[r] = i;
                e > 0 && (n[r] = e)
            }
            ,
            t.prototype.sub = function(t) {
                var e, r, i = this.buf, n = i.length;
                for (e = 0; e < n; ++e)
                    r = i[e] - t,
                    r < 0 ? (r += 1e13,
                    t = 1) : t = 0,
                    i[e] = r;
                for (; 0 === i[i.length - 1]; )
                    i.pop()
            }
            ,
            t.prototype.toString = function(t) {
                if (10 != (t || 10))
                    throw new Error("only base 10 is supported");
                for (var e = this.buf, r = e[e.length - 1].toString(), i = e.length - 2; i >= 0; --i)
                    r += (1e13 + e[i]).toString().substring(1);
                return r
            }
            ,
            t.prototype.valueOf = function() {
                for (var t = this.buf, e = 0, r = t.length - 1; r >= 0; --r)
                    e = 1e13 * e + t[r];
                return e
            }
            ,
            t.prototype.simplify = function() {
                var t = this.buf;
                return 1 == t.length ? t[0] : this
            }
            ,
            t
        }()
    }
    , function(t, e, r) {
        "use strict";
        function i(t, e) {
            if (e < t.length + 22)
                return console.error("Message too long for RSA"),
                null;
            for (var r = e - t.length - 6, i = "", n = 0; n < r; n += 2)
                i += "ff";
            var o = "0001" + i + "00" + t;
            return Object(u.c)(o, 16)
        }
        function n(t, e) {
            if (e < t.length + 11)
                return console.error("Message too long for RSA"),
                null;
            for (var r = [], i = t.length - 1; i >= 0 && e > 0; ) {
                var n = t.charCodeAt(i--);
                n < 128 ? r[--e] = n : n > 127 && n < 2048 ? (r[--e] = 63 & n | 128,
                r[--e] = n >> 6 | 192) : (r[--e] = 63 & n | 128,
                r[--e] = n >> 6 & 63 | 128,
                r[--e] = n >> 12 | 224)
            }
            r[--e] = 0;
            for (var o = new c.a, a = []; e > 2; ) {
                for (a[0] = 0; 0 == a[0]; )
                    o.nextBytes(a);
                r[--e] = a[0]
            }
            return r[--e] = 2,
            r[--e] = 0,
            new u.a(r)
        }
        function o(t, e) {
            for (var r = t.toByteArray(), i = 0; i < r.length && 0 == r[i]; )
                ++i;
            if (r.length - i != e - 1 || 2 != r[i])
                return null;
            for (++i; 0 != r[i]; )
                if (++i >= r.length)
                    return null;
            for (var n = ""; ++i < r.length; ) {
                var o = 255 & r[i];
                o < 128 ? n += String.fromCharCode(o) : o > 191 && o < 224 ? (n += String.fromCharCode((31 & o) << 6 | 63 & r[i + 1]),
                ++i) : (n += String.fromCharCode((15 & o) << 12 | (63 & r[i + 1]) << 6 | 63 & r[i + 2]),
                i += 2)
            }
            return n
        }
        function a(t) {
            return h[t] || ""
        }
        function s(t) {
            for (var e in h)
                if (h.hasOwnProperty(e)) {
                    var r = h[e]
                      , i = r.length;
                    if (t.substr(0, i) == r)
                        return t.substr(i)
                }
            return t
        }
        r.d(e, "a", function() {
            return l
        });
        var u = r(19)
          , c = r(89)
          , l = function() {
            function t() {
                this.n = null,
                this.e = 0,
                this.d = null,
                this.p = null,
                this.q = null,
                this.dmp1 = null,
                this.dmq1 = null,
                this.coeff = null
            }
            return t.prototype.doPublic = function(t) {
                return t.modPowInt(this.e, this.n)
            }
            ,
            t.prototype.doPrivate = function(t) {
                if (null == this.p || null == this.q)
                    return t.modPow(this.d, this.n);
                for (var e = t.mod(this.p).modPow(this.dmp1, this.p), r = t.mod(this.q).modPow(this.dmq1, this.q); e.compareTo(r) < 0; )
                    e = e.add(this.p);
                return e.subtract(r).multiply(this.coeff).mod(this.p).multiply(this.q).add(r)
            }
            ,
            t.prototype.setPublic = function(t, e) {
                null != t && null != e && t.length > 0 && e.length > 0 ? (this.n = Object(u.c)(t, 16),
                this.e = parseInt(e, 16)) : console.error("Invalid RSA public key")
            }
            ,
            t.prototype.encrypt = function(t) {
                var e = this.n.bitLength() + 7 >> 3
                  , r = n(t, e);
                if (null == r)
                    return null;
                var i = this.doPublic(r);
                if (null == i)
                    return null;
                for (var o = i.toString(16), a = o.length, s = 0; s < 2 * e - a; s++)
                    o = "0" + o;
                return o
            }
            ,
            t.prototype.setPrivate = function(t, e, r) {
                null != t && null != e && t.length > 0 && e.length > 0 ? (this.n = Object(u.c)(t, 16),
                this.e = parseInt(e, 16),
                this.d = Object(u.c)(r, 16)) : console.error("Invalid RSA private key")
            }
            ,
            t.prototype.setPrivateEx = function(t, e, r, i, n, o, a, s) {
                null != t && null != e && t.length > 0 && e.length > 0 ? (this.n = Object(u.c)(t, 16),
                this.e = parseInt(e, 16),
                this.d = Object(u.c)(r, 16),
                this.p = Object(u.c)(i, 16),
                this.q = Object(u.c)(n, 16),
                this.dmp1 = Object(u.c)(o, 16),
                this.dmq1 = Object(u.c)(a, 16),
                this.coeff = Object(u.c)(s, 16)) : console.error("Invalid RSA private key")
            }
            ,
            t.prototype.generate = function(t, e) {
                var r = new c.a
                  , i = t >> 1;
                this.e = parseInt(e, 16);
                for (var n = new u.a(e,16); ; ) {
                    for (; this.p = new u.a(t - i,1,r),
                    0 != this.p.subtract(u.a.ONE).gcd(n).compareTo(u.a.ONE) || !this.p.isProbablePrime(10); )
                        ;
                    for (; this.q = new u.a(i,1,r),
                    0 != this.q.subtract(u.a.ONE).gcd(n).compareTo(u.a.ONE) || !this.q.isProbablePrime(10); )
                        ;
                    if (this.p.compareTo(this.q) <= 0) {
                        var o = this.p;
                        this.p = this.q,
                        this.q = o
                    }
                    var a = this.p.subtract(u.a.ONE)
                      , s = this.q.subtract(u.a.ONE)
                      , l = a.multiply(s);
                    if (0 == l.gcd(n).compareTo(u.a.ONE)) {
                        this.n = this.p.multiply(this.q),
                        this.d = n.modInverse(l),
                        this.dmp1 = this.d.mod(a),
                        this.dmq1 = this.d.mod(s),
                        this.coeff = this.q.modInverse(this.p);
                        break
                    }
                }
            }
            ,
            t.prototype.decrypt = function(t) {
                var e = Object(u.c)(t, 16)
                  , r = this.doPrivate(e);
                return null == r ? null : o(r, this.n.bitLength() + 7 >> 3)
            }
            ,
            t.prototype.generateAsync = function(t, e, r) {
                var i = new c.a
                  , n = t >> 1;
                this.e = parseInt(e, 16);
                var o = new u.a(e,16)
                  , a = this
                  , s = function e() {
                    var s = function() {
                        if (a.p.compareTo(a.q) <= 0) {
                            var t = a.p;
                            a.p = a.q,
                            a.q = t
                        }
                        var i = a.p.subtract(u.a.ONE)
                          , n = a.q.subtract(u.a.ONE)
                          , s = i.multiply(n);
                        0 == s.gcd(o).compareTo(u.a.ONE) ? (a.n = a.p.multiply(a.q),
                        a.d = o.modInverse(s),
                        a.dmp1 = a.d.mod(i),
                        a.dmq1 = a.d.mod(n),
                        a.coeff = a.q.modInverse(a.p),
                        setTimeout(function() {
                            r()
                        }, 0)) : setTimeout(e, 0)
                    }
                      , c = function t() {
                        a.q = Object(u.b)(),
                        a.q.fromNumberAsync(n, 1, i, function() {
                            a.q.subtract(u.a.ONE).gcda(o, function(e) {
                                0 == e.compareTo(u.a.ONE) && a.q.isProbablePrime(10) ? setTimeout(s, 0) : setTimeout(t, 0)
                            })
                        })
                    }
                      , l = function e() {
                        a.p = Object(u.b)(),
                        a.p.fromNumberAsync(t - n, 1, i, function() {
                            a.p.subtract(u.a.ONE).gcda(o, function(t) {
                                0 == t.compareTo(u.a.ONE) && a.p.isProbablePrime(10) ? setTimeout(c, 0) : setTimeout(e, 0)
                            })
                        })
                    };
                    setTimeout(l, 0)
                };
                setTimeout(s, 0)
            }
            ,
            t.prototype.sign = function(t, e, r) {
                var n = a(r)
                  , o = n + e(t).toString()
                  , s = i(o, this.n.bitLength() / 4);
                if (null == s)
                    return null;
                var u = this.doPrivate(s);
                if (null == u)
                    return null;
                var c = u.toString(16);
                return 0 == (1 & c.length) ? c : "0" + c
            }
            ,
            t.prototype.verify = function(t, e, r) {
                var i = Object(u.c)(e, 16)
                  , n = this.doPublic(i);
                return null == n ? null : s(n.toString(16).replace(/^1f+00/, "")) == r(t).toString()
            }
            ,
            t
        }()
          , h = {
            md2: "3020300c06082a864886f70d020205000410",
            md5: "3020300c06082a864886f70d020505000410",
            sha1: "3021300906052b0e03021a05000414",
            sha224: "302d300d06096086480165030402040500041c",
            sha256: "3031300d060960864801650304020105000420",
            sha384: "3041300d060960864801650304020205000430",
            sha512: "3051300d060960864801650304020305000440",
            ripemd160: "3021300906052b2403020105000414"
        }
    }
    , function(t, e, r) {
        "use strict";
        function i() {
            if (null == n) {
                for (n = Object(a.a)(); o < a.b; ) {
                    var t = Math.floor(65536 * Math.random());
                    s[o++] = 255 & t
                }
                for (n.init(s),
                o = 0; o < s.length; ++o)
                    s[o] = 0;
                o = 0
            }
            return n.next()
        }
        r.d(e, "a", function() {
            return f
        });
        var n, o, a = r(90), s = null;
        if (null == s) {
            s = [],
            o = 0;
            var u = void 0;
            if ("undefined" != typeof window && window.crypto && window.crypto.getRandomValues) {
                var c = new Uint32Array(256);
                for (window.crypto.getRandomValues(c),
                u = 0; u < c.length; ++u)
                    s[o++] = 255 & c[u]
            }
            var l = 0
              , h = function t(e) {
                if ((l = l || 0) >= 256 || o >= a.b)
                    return void (window.removeEventListener ? window.removeEventListener("mousemove", t, !1) : window.detachEvent && window.detachEvent("onmousemove", t));
                try {
                    var r = e.x + e.y;
                    s[o++] = 255 & r,
                    l += 1
                } catch (t) {}
            };
            "undefined" != typeof window && (window.addEventListener ? window.addEventListener("mousemove", h, !1) : window.attachEvent && window.attachEvent("onmousemove", h))
        }
        var f = function() {
            function t() {}
            return t.prototype.nextBytes = function(t) {
                for (var e = 0; e < t.length; ++e)
                    t[e] = i()
            }
            ,
            t
        }()
    }
    , function(t, e, r) {
        "use strict";
        function i() {
            return new n
        }
        e.a = i,
        r.d(e, "b", function() {
            return o
        });
        var n = function() {
            function t() {
                this.i = 0,
                this.j = 0,
                this.S = []
            }
            return t.prototype.init = function(t) {
                var e, r, i;
                for (e = 0; e < 256; ++e)
                    this.S[e] = e;
                for (r = 0,
                e = 0; e < 256; ++e)
                    r = r + this.S[e] + t[e % t.length] & 255,
                    i = this.S[e],
                    this.S[e] = this.S[r],
                    this.S[r] = i;
                this.i = 0,
                this.j = 0
            }
            ,
            t.prototype.next = function() {
                var t;
                return this.i = this.i + 1 & 255,
                this.j = this.j + this.S[this.i] & 255,
                t = this.S[this.i],
                this.S[this.i] = this.S[this.j],
                this.S[this.j] = t,
                this.S[t + this.S[this.i] & 255]
            }
            ,
            t
        }()
          , o = 256
    }
    , function(t, e, r) {
        "use strict";
        r.d(e, "a", function() {
            return o
        });
        var i = r(19)
          , n = r(92)
          , o = {};
        void 0 !== o.asn1 && o.asn1 || (o.asn1 = {}),
        o.asn1.ASN1Util = new function() {
            this.integerToByteHex = function(t) {
                var e = t.toString(16);
                return e.length % 2 == 1 && (e = "0" + e),
                e
            }
            ,
            this.bigIntToMinTwosComplementsHex = function(t) {
                var e = t.toString(16);
                if ("-" != e.substr(0, 1))
                    e.length % 2 == 1 ? e = "0" + e : e.match(/^[0-7]/) || (e = "00" + e);
                else {
                    var r = e.substr(1)
                      , n = r.length;
                    n % 2 == 1 ? n += 1 : e.match(/^[0-7]/) || (n += 2);
                    for (var o = "", a = 0; a < n; a++)
                        o += "f";
                    e = new i.a(o,16).xor(t).add(i.a.ONE).toString(16).replace(/^-/, "")
                }
                return e
            }
            ,
            this.getPEMStringFromHex = function(t, e) {
                return hextopem(t, e)
            }
            ,
            this.newObject = function(t) {
                var e = o
                  , r = e.asn1
                  , i = r.DERBoolean
                  , n = r.DERInteger
                  , a = r.DERBitString
                  , s = r.DEROctetString
                  , u = r.DERNull
                  , c = r.DERObjectIdentifier
                  , l = r.DEREnumerated
                  , h = r.DERUTF8String
                  , f = r.DERNumericString
                  , d = r.DERPrintableString
                  , p = r.DERTeletexString
                  , y = r.DERIA5String
                  , g = r.DERUTCTime
                  , v = r.DERGeneralizedTime
                  , m = r.DERSequence
                  , b = r.DERSet
                  , S = r.DERTaggedObject
                  , E = r.ASN1Util.newObject
                  , T = Object.keys(t);
                if (1 != T.length)
                    throw "key of param shall be only one.";
                var _ = T[0];
                if (-1 == ":bool:int:bitstr:octstr:null:oid:enum:utf8str:numstr:prnstr:telstr:ia5str:utctime:gentime:seq:set:tag:".indexOf(":" + _ + ":"))
                    throw "undefined key: " + _;
                if ("bool" == _)
                    return new i(t[_]);
                if ("int" == _)
                    return new n(t[_]);
                if ("bitstr" == _)
                    return new a(t[_]);
                if ("octstr" == _)
                    return new s(t[_]);
                if ("null" == _)
                    return new u(t[_]);
                if ("oid" == _)
                    return new c(t[_]);
                if ("enum" == _)
                    return new l(t[_]);
                if ("utf8str" == _)
                    return new h(t[_]);
                if ("numstr" == _)
                    return new f(t[_]);
                if ("prnstr" == _)
                    return new d(t[_]);
                if ("telstr" == _)
                    return new p(t[_]);
                if ("ia5str" == _)
                    return new y(t[_]);
                if ("utctime" == _)
                    return new g(t[_]);
                if ("gentime" == _)
                    return new v(t[_]);
                if ("seq" == _) {
                    for (var w = t[_], A = [], R = 0; R < w.length; R++) {
                        var D = E(w[R]);
                        A.push(D)
                    }
                    return new m({
                        array: A
                    })
                }
                if ("set" == _) {
                    for (var w = t[_], A = [], R = 0; R < w.length; R++) {
                        var D = E(w[R]);
                        A.push(D)
                    }
                    return new b({
                        array: A
                    })
                }
                if ("tag" == _) {
                    var L = t[_];
                    if ("[object Array]" === Object.prototype.toString.call(L) && 3 == L.length) {
                        var k = E(L[2]);
                        return new S({
                            tag: L[0],
                            explicit: L[1],
                            obj: k
                        })
                    }
                    var O = {};
                    if (void 0 !== L.explicit && (O.explicit = L.explicit),
                    void 0 !== L.tag && (O.tag = L.tag),
                    void 0 === L.obj)
                        throw "obj shall be specified for 'tag'.";
                    return O.obj = E(L.obj),
                    new S(O)
                }
            }
            ,
            this.jsonToASN1HEX = function(t) {
                return this.newObject(t).getEncodedHex()
            }
        }
        ,
        o.asn1.ASN1Util.oidHexToInt = function(t) {
            for (var e = "", r = parseInt(t.substr(0, 2), 16), n = Math.floor(r / 40), o = r % 40, e = n + "." + o, a = "", s = 2; s < t.length; s += 2) {
                var u = parseInt(t.substr(s, 2), 16)
                  , c = ("00000000" + u.toString(2)).slice(-8);
                if (a += c.substr(1, 7),
                "0" == c.substr(0, 1)) {
                    e = e + "." + new i.a(a,2).toString(10),
                    a = ""
                }
            }
            return e
        }
        ,
        o.asn1.ASN1Util.oidIntToHex = function(t) {
            var e = function(t) {
                var e = t.toString(16);
                return 1 == e.length && (e = "0" + e),
                e
            };
            if (!t.match(/^[0-9.]+$/))
                throw "malformed oid string: " + t;
            var r = ""
              , n = t.split(".")
              , o = 40 * parseInt(n[0]) + parseInt(n[1]);
            r += e(o),
            n.splice(0, 2);
            for (var a = 0; a < n.length; a++)
                r += function(t) {
                    var r = ""
                      , n = new i.a(t,10)
                      , o = n.toString(2)
                      , a = 7 - o.length % 7;
                    7 == a && (a = 0);
                    for (var s = "", u = 0; u < a; u++)
                        s += "0";
                    o = s + o;
                    for (var u = 0; u < o.length - 1; u += 7) {
                        var c = o.substr(u, 7);
                        u != o.length - 7 && (c = "1" + c),
                        r += e(parseInt(c, 2))
                    }
                    return r
                }(n[a]);
            return r
        }
        ,
        o.asn1.ASN1Object = function() {
            this.getLengthHexFromValue = function() {
                if (void 0 === this.hV || null == this.hV)
                    throw "this.hV is null or undefined.";
                if (this.hV.length % 2 == 1)
                    throw "value hex must be even length: n=" + "".length + ",v=" + this.hV;
                var t = this.hV.length / 2
                  , e = t.toString(16);
                if (e.length % 2 == 1 && (e = "0" + e),
                t < 128)
                    return e;
                var r = e.length / 2;
                if (r > 15)
                    throw "ASN.1 length too long to represent by 8x: n = " + t.toString(16);
                return (128 + r).toString(16) + e
            }
            ,
            this.getEncodedHex = function() {
                return (null == this.hTLV || this.isModified) && (this.hV = this.getFreshValueHex(),
                this.hL = this.getLengthHexFromValue(),
                this.hTLV = this.hT + this.hL + this.hV,
                this.isModified = !1),
                this.hTLV
            }
            ,
            this.getValueHex = function() {
                return this.getEncodedHex(),
                this.hV
            }
            ,
            this.getFreshValueHex = function() {
                return ""
            }
        }
        ,
        o.asn1.DERAbstractString = function(t) {
            o.asn1.DERAbstractString.superclass.constructor.call(this);
            this.getString = function() {
                return this.s
            }
            ,
            this.setString = function(t) {
                this.hTLV = null,
                this.isModified = !0,
                this.s = t,
                this.hV = stohex(this.s)
            }
            ,
            this.setStringHex = function(t) {
                this.hTLV = null,
                this.isModified = !0,
                this.s = null,
                this.hV = t
            }
            ,
            this.getFreshValueHex = function() {
                return this.hV
            }
            ,
            void 0 !== t && ("string" == typeof t ? this.setString(t) : void 0 !== t.str ? this.setString(t.str) : void 0 !== t.hex && this.setStringHex(t.hex))
        }
        ,
        n.a.lang.extend(o.asn1.DERAbstractString, o.asn1.ASN1Object),
        o.asn1.DERAbstractTime = function(t) {
            o.asn1.DERAbstractTime.superclass.constructor.call(this);
            this.localDateToUTC = function(t) {
                return utc = t.getTime() + 6e4 * t.getTimezoneOffset(),
                new Date(utc)
            }
            ,
            this.formatDate = function(t, e, r) {
                var i = this.zeroPadding
                  , n = this.localDateToUTC(t)
                  , o = String(n.getFullYear());
                "utc" == e && (o = o.substr(2, 2));
                var a = i(String(n.getMonth() + 1), 2)
                  , s = i(String(n.getDate()), 2)
                  , u = i(String(n.getHours()), 2)
                  , c = i(String(n.getMinutes()), 2)
                  , l = i(String(n.getSeconds()), 2)
                  , h = o + a + s + u + c + l;
                if (!0 === r) {
                    var f = n.getMilliseconds();
                    if (0 != f) {
                        var d = i(String(f), 3);
                        d = d.replace(/[0]+$/, ""),
                        h = h + "." + d
                    }
                }
                return h + "Z"
            }
            ,
            this.zeroPadding = function(t, e) {
                return t.length >= e ? t : new Array(e - t.length + 1).join("0") + t
            }
            ,
            this.getString = function() {
                return this.s
            }
            ,
            this.setString = function(t) {
                this.hTLV = null,
                this.isModified = !0,
                this.s = t,
                this.hV = stohex(t)
            }
            ,
            this.setByDateValue = function(t, e, r, i, n, o) {
                var a = new Date(Date.UTC(t, e - 1, r, i, n, o, 0));
                this.setByDate(a)
            }
            ,
            this.getFreshValueHex = function() {
                return this.hV
            }
        }
        ,
        n.a.lang.extend(o.asn1.DERAbstractTime, o.asn1.ASN1Object),
        o.asn1.DERAbstractStructured = function(t) {
            o.asn1.DERAbstractString.superclass.constructor.call(this);
            this.setByASN1ObjectArray = function(t) {
                this.hTLV = null,
                this.isModified = !0,
                this.asn1Array = t
            }
            ,
            this.appendASN1Object = function(t) {
                this.hTLV = null,
                this.isModified = !0,
                this.asn1Array.push(t)
            }
            ,
            this.asn1Array = new Array,
            void 0 !== t && void 0 !== t.array && (this.asn1Array = t.array)
        }
        ,
        n.a.lang.extend(o.asn1.DERAbstractStructured, o.asn1.ASN1Object),
        o.asn1.DERBoolean = function() {
            o.asn1.DERBoolean.superclass.constructor.call(this),
            this.hT = "01",
            this.hTLV = "0101ff"
        }
        ,
        n.a.lang.extend(o.asn1.DERBoolean, o.asn1.ASN1Object),
        o.asn1.DERInteger = function(t) {
            o.asn1.DERInteger.superclass.constructor.call(this),
            this.hT = "02",
            this.setByBigInteger = function(t) {
                this.hTLV = null,
                this.isModified = !0,
                this.hV = o.asn1.ASN1Util.bigIntToMinTwosComplementsHex(t)
            }
            ,
            this.setByInteger = function(t) {
                var e = new i.a(String(t),10);
                this.setByBigInteger(e)
            }
            ,
            this.setValueHex = function(t) {
                this.hV = t
            }
            ,
            this.getFreshValueHex = function() {
                return this.hV
            }
            ,
            void 0 !== t && (void 0 !== t.bigint ? this.setByBigInteger(t.bigint) : void 0 !== t.int ? this.setByInteger(t.int) : "number" == typeof t ? this.setByInteger(t) : void 0 !== t.hex && this.setValueHex(t.hex))
        }
        ,
        n.a.lang.extend(o.asn1.DERInteger, o.asn1.ASN1Object),
        o.asn1.DERBitString = function(t) {
            if (void 0 !== t && void 0 !== t.obj) {
                var e = o.asn1.ASN1Util.newObject(t.obj);
                t.hex = "00" + e.getEncodedHex()
            }
            o.asn1.DERBitString.superclass.constructor.call(this),
            this.hT = "03",
            this.setHexValueIncludingUnusedBits = function(t) {
                this.hTLV = null,
                this.isModified = !0,
                this.hV = t
            }
            ,
            this.setUnusedBitsAndHexValue = function(t, e) {
                if (t < 0 || 7 < t)
                    throw "unused bits shall be from 0 to 7: u = " + t;
                var r = "0" + t;
                this.hTLV = null,
                this.isModified = !0,
                this.hV = r + e
            }
            ,
            this.setByBinaryString = function(t) {
                t = t.replace(/0+$/, "");
                var e = 8 - t.length % 8;
                8 == e && (e = 0);
                for (var r = 0; r <= e; r++)
                    t += "0";
                for (var i = "", r = 0; r < t.length - 1; r += 8) {
                    var n = t.substr(r, 8)
                      , o = parseInt(n, 2).toString(16);
                    1 == o.length && (o = "0" + o),
                    i += o
                }
                this.hTLV = null,
                this.isModified = !0,
                this.hV = "0" + e + i
            }
            ,
            this.setByBooleanArray = function(t) {
                for (var e = "", r = 0; r < t.length; r++)
                    1 == t[r] ? e += "1" : e += "0";
                this.setByBinaryString(e)
            }
            ,
            this.newFalseArray = function(t) {
                for (var e = new Array(t), r = 0; r < t; r++)
                    e[r] = !1;
                return e
            }
            ,
            this.getFreshValueHex = function() {
                return this.hV
            }
            ,
            void 0 !== t && ("string" == typeof t && t.toLowerCase().match(/^[0-9a-f]+$/) ? this.setHexValueIncludingUnusedBits(t) : void 0 !== t.hex ? this.setHexValueIncludingUnusedBits(t.hex) : void 0 !== t.bin ? this.setByBinaryString(t.bin) : void 0 !== t.array && this.setByBooleanArray(t.array))
        }
        ,
        n.a.lang.extend(o.asn1.DERBitString, o.asn1.ASN1Object),
        o.asn1.DEROctetString = function(t) {
            if (void 0 !== t && void 0 !== t.obj) {
                var e = o.asn1.ASN1Util.newObject(t.obj);
                t.hex = e.getEncodedHex()
            }
            o.asn1.DEROctetString.superclass.constructor.call(this, t),
            this.hT = "04"
        }
        ,
        n.a.lang.extend(o.asn1.DEROctetString, o.asn1.DERAbstractString),
        o.asn1.DERNull = function() {
            o.asn1.DERNull.superclass.constructor.call(this),
            this.hT = "05",
            this.hTLV = "0500"
        }
        ,
        n.a.lang.extend(o.asn1.DERNull, o.asn1.ASN1Object),
        o.asn1.DERObjectIdentifier = function(t) {
            var e = function(t) {
                var e = t.toString(16);
                return 1 == e.length && (e = "0" + e),
                e
            }
              , r = function(t) {
                var r = ""
                  , n = new i.a(t,10)
                  , o = n.toString(2)
                  , a = 7 - o.length % 7;
                7 == a && (a = 0);
                for (var s = "", u = 0; u < a; u++)
                    s += "0";
                o = s + o;
                for (var u = 0; u < o.length - 1; u += 7) {
                    var c = o.substr(u, 7);
                    u != o.length - 7 && (c = "1" + c),
                    r += e(parseInt(c, 2))
                }
                return r
            };
            o.asn1.DERObjectIdentifier.superclass.constructor.call(this),
            this.hT = "06",
            this.setValueHex = function(t) {
                this.hTLV = null,
                this.isModified = !0,
                this.s = null,
                this.hV = t
            }
            ,
            this.setValueOidString = function(t) {
                if (!t.match(/^[0-9.]+$/))
                    throw "malformed oid string: " + t;
                var i = ""
                  , n = t.split(".")
                  , o = 40 * parseInt(n[0]) + parseInt(n[1]);
                i += e(o),
                n.splice(0, 2);
                for (var a = 0; a < n.length; a++)
                    i += r(n[a]);
                this.hTLV = null,
                this.isModified = !0,
                this.s = null,
                this.hV = i
            }
            ,
            this.setValueName = function(t) {
                var e = o.asn1.x509.OID.name2oid(t);
                if ("" === e)
                    throw "DERObjectIdentifier oidName undefined: " + t;
                this.setValueOidString(e)
            }
            ,
            this.getFreshValueHex = function() {
                return this.hV
            }
            ,
            void 0 !== t && ("string" == typeof t ? t.match(/^[0-2].[0-9.]+$/) ? this.setValueOidString(t) : this.setValueName(t) : void 0 !== t.oid ? this.setValueOidString(t.oid) : void 0 !== t.hex ? this.setValueHex(t.hex) : void 0 !== t.name && this.setValueName(t.name))
        }
        ,
        n.a.lang.extend(o.asn1.DERObjectIdentifier, o.asn1.ASN1Object),
        o.asn1.DEREnumerated = function(t) {
            o.asn1.DEREnumerated.superclass.constructor.call(this),
            this.hT = "0a",
            this.setByBigInteger = function(t) {
                this.hTLV = null,
                this.isModified = !0,
                this.hV = o.asn1.ASN1Util.bigIntToMinTwosComplementsHex(t)
            }
            ,
            this.setByInteger = function(t) {
                var e = new i.a(String(t),10);
                this.setByBigInteger(e)
            }
            ,
            this.setValueHex = function(t) {
                this.hV = t
            }
            ,
            this.getFreshValueHex = function() {
                return this.hV
            }
            ,
            void 0 !== t && (void 0 !== t.int ? this.setByInteger(t.int) : "number" == typeof t ? this.setByInteger(t) : void 0 !== t.hex && this.setValueHex(t.hex))
        }
        ,
        n.a.lang.extend(o.asn1.DEREnumerated, o.asn1.ASN1Object),
        o.asn1.DERUTF8String = function(t) {
            o.asn1.DERUTF8String.superclass.constructor.call(this, t),
            this.hT = "0c"
        }
        ,
        n.a.lang.extend(o.asn1.DERUTF8String, o.asn1.DERAbstractString),
        o.asn1.DERNumericString = function(t) {
            o.asn1.DERNumericString.superclass.constructor.call(this, t),
            this.hT = "12"
        }
        ,
        n.a.lang.extend(o.asn1.DERNumericString, o.asn1.DERAbstractString),
        o.asn1.DERPrintableString = function(t) {
            o.asn1.DERPrintableString.superclass.constructor.call(this, t),
            this.hT = "13"
        }
        ,
        n.a.lang.extend(o.asn1.DERPrintableString, o.asn1.DERAbstractString),
        o.asn1.DERTeletexString = function(t) {
            o.asn1.DERTeletexString.superclass.constructor.call(this, t),
            this.hT = "14"
        }
        ,
        n.a.lang.extend(o.asn1.DERTeletexString, o.asn1.DERAbstractString),
        o.asn1.DERIA5String = function(t) {
            o.asn1.DERIA5String.superclass.constructor.call(this, t),
            this.hT = "16"
        }
        ,
        n.a.lang.extend(o.asn1.DERIA5String, o.asn1.DERAbstractString),
        o.asn1.DERUTCTime = function(t) {
            o.asn1.DERUTCTime.superclass.constructor.call(this, t),
            this.hT = "17",
            this.setByDate = function(t) {
                this.hTLV = null,
                this.isModified = !0,
                this.date = t,
                this.s = this.formatDate(this.date, "utc"),
                this.hV = stohex(this.s)
            }
            ,
            this.getFreshValueHex = function() {
                return void 0 === this.date && void 0 === this.s && (this.date = new Date,
                this.s = this.formatDate(this.date, "utc"),
                this.hV = stohex(this.s)),
                this.hV
            }
            ,
            void 0 !== t && (void 0 !== t.str ? this.setString(t.str) : "string" == typeof t && t.match(/^[0-9]{12}Z$/) ? this.setString(t) : void 0 !== t.hex ? this.setStringHex(t.hex) : void 0 !== t.date && this.setByDate(t.date))
        }
        ,
        n.a.lang.extend(o.asn1.DERUTCTime, o.asn1.DERAbstractTime),
        o.asn1.DERGeneralizedTime = function(t) {
            o.asn1.DERGeneralizedTime.superclass.constructor.call(this, t),
            this.hT = "18",
            this.withMillis = !1,
            this.setByDate = function(t) {
                this.hTLV = null,
                this.isModified = !0,
                this.date = t,
                this.s = this.formatDate(this.date, "gen", this.withMillis),
                this.hV = stohex(this.s)
            }
            ,
            this.getFreshValueHex = function() {
                return void 0 === this.date && void 0 === this.s && (this.date = new Date,
                this.s = this.formatDate(this.date, "gen", this.withMillis),
                this.hV = stohex(this.s)),
                this.hV
            }
            ,
            void 0 !== t && (void 0 !== t.str ? this.setString(t.str) : "string" == typeof t && t.match(/^[0-9]{14}Z$/) ? this.setString(t) : void 0 !== t.hex ? this.setStringHex(t.hex) : void 0 !== t.date && this.setByDate(t.date),
            !0 === t.millis && (this.withMillis = !0))
        }
        ,
        n.a.lang.extend(o.asn1.DERGeneralizedTime, o.asn1.DERAbstractTime),
        o.asn1.DERSequence = function(t) {
            o.asn1.DERSequence.superclass.constructor.call(this, t),
            this.hT = "30",
            this.getFreshValueHex = function() {
                for (var t = "", e = 0; e < this.asn1Array.length; e++) {
                    t += this.asn1Array[e].getEncodedHex()
                }
                return this.hV = t,
                this.hV
            }
        }
        ,
        n.a.lang.extend(o.asn1.DERSequence, o.asn1.DERAbstractStructured),
        o.asn1.DERSet = function(t) {
            o.asn1.DERSet.superclass.constructor.call(this, t),
            this.hT = "31",
            this.sortFlag = !0,
            this.getFreshValueHex = function() {
                for (var t = new Array, e = 0; e < this.asn1Array.length; e++) {
                    var r = this.asn1Array[e];
                    t.push(r.getEncodedHex())
                }
                return 1 == this.sortFlag && t.sort(),
                this.hV = t.join(""),
                this.hV
            }
            ,
            void 0 !== t && void 0 !== t.sortflag && 0 == t.sortflag && (this.sortFlag = !1)
        }
        ,
        n.a.lang.extend(o.asn1.DERSet, o.asn1.DERAbstractStructured),
        o.asn1.DERTaggedObject = function(t) {
            o.asn1.DERTaggedObject.superclass.constructor.call(this),
            this.hT = "a0",
            this.hV = "",
            this.isExplicit = !0,
            this.asn1Object = null,
            this.setASN1Object = function(t, e, r) {
                this.hT = e,
                this.isExplicit = t,
                this.asn1Object = r,
                this.isExplicit ? (this.hV = this.asn1Object.getEncodedHex(),
                this.hTLV = null,
                this.isModified = !0) : (this.hV = null,
                this.hTLV = r.getEncodedHex(),
                this.hTLV = this.hTLV.replace(/^../, e),
                this.isModified = !1)
            }
            ,
            this.getFreshValueHex = function() {
                return this.hV
            }
            ,
            void 0 !== t && (void 0 !== t.tag && (this.hT = t.tag),
            void 0 !== t.explicit && (this.isExplicit = t.explicit),
            void 0 !== t.obj && (this.asn1Object = t.obj,
            this.setASN1Object(this.isExplicit, this.hT, this.asn1Object)))
        }
        ,
        n.a.lang.extend(o.asn1.DERTaggedObject, o.asn1.ASN1Object)
    }
    , function(t, e, r) {
        "use strict";
        r.d(e, "a", function() {
            return i
        });
        /*!
Copyright (c) 2011, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 2.9.0
*/
        var i = {};
        i.lang = {
            extend: function(t, e, r) {
                if (!e || !t)
                    throw new Error("YAHOO.lang.extend failed, please check that all dependencies are included.");
                var i = function() {};
                if (i.prototype = e.prototype,
                t.prototype = new i,
                t.prototype.constructor = t,
                t.superclass = e.prototype,
                e.prototype.constructor == Object.prototype.constructor && (e.prototype.constructor = e),
                r) {
                    var n;
                    for (n in r)
                        t.prototype[n] = r[n];
                    var o = function() {}
                      , a = ["toString", "valueOf"];
                    try {
                        /MSIE/.test(navigator.userAgent) && (o = function(t, e) {
                            for (n = 0; n < a.length; n += 1) {
                                var r = a[n]
                                  , i = e[r];
                                "function" == typeof i && i != Object.prototype[r] && (t[r] = i)
                            }
                        }
                        )
                    } catch (t) {}
                    o(t.prototype, r)
                }
            }
        }
    }
    , function(t, e, r) {
        var i, n, o, a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        }
        : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        }
        ;
        !function(s, u, c) {
            "object" === a(e) ? t.exports = e = u(r(0), r(9), r(33), r(34), r(7), r(35), r(8), r(10), r(14), r(36), r(15), r(37), r(38), r(39), r(11), r(40), r(6), r(1), r(41), r(42), r(43), r(44), r(45), r(46), r(47), r(48), r(49), r(50), r(51), r(52), r(53), r(54), r(55), r(56)) : (n = [r(0), r(9), r(33), r(34), r(7), r(35), r(8), r(10), r(14), r(36), r(15), r(37), r(38), r(39), r(11), r(40), r(6), r(1), r(41), r(42), r(43), r(44), r(45), r(46), r(47), r(48), r(49), r(50), r(51), r(52), r(53), r(54), r(55), r(56)],
            i = u,
            void 0 !== (o = "function" == typeof i ? i.apply(e, n) : i) && (t.exports = o))
        }(0, function(t) {
            return t
        })
    }
    , function(t, e) {}
    , function(t, e, r) {
        "use strict";
        function i(t, e) {
            if (!(t instanceof e))
                throw new TypeError("Cannot call a class as a function")
        }
        function n(t, e) {
            if (!t)
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !e || "object" != typeof e && "function" != typeof e ? t : e
        }
        function o(t, e) {
            if ("function" != typeof e && null !== e)
                throw new TypeError("Super expression must either be null or a function, not " + typeof e);
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }),
            e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }
        var a = r(16)
          , s = r(21)
          , u = r(58)
          , c = r(3)
          , l = r(20)
          , h = r(18)
          , f = r(26)
          , d = r(62)
          , p = r(63)
          , y = r(4)
          , g = r(2)
          , v = r(64)
          , m = r(25)
          , b = r(110)
          , S = function() {
            function t(t, e) {
                for (var r = 0; r < e.length; r++) {
                    var i = e[r];
                    i.enumerable = i.enumerable || !1,
                    i.configurable = !0,
                    "value"in i && (i.writable = !0),
                    Object.defineProperty(t, i.key, i)
                }
            }
            return function(e, r, i) {
                return r && t(e.prototype, r),
                i && t(e, i),
                e
            }
        }()
          , E = {
            STOPPED: "STOPPED",
            IDLE: "IDLE",
            KEY_LOADING: "KEY_LOADING",
            FRAG_LOADING: "FRAG_LOADING",
            FRAG_LOADING_WAITING_RETRY: "FRAG_LOADING_WAITING_RETRY",
            WAITING_LEVEL: "WAITING_LEVEL",
            PARSING: "PARSING",
            PARSED: "PARSED",
            BUFFER_FLUSHING: "BUFFER_FLUSHING",
            ENDED: "ENDED",
            ERROR: "ERROR"
        }
          , T = function(t) {
            function e(r, o) {
                i(this, e);
                var a = n(this, t.call(this, r, c.a.MEDIA_ATTACHED, c.a.MEDIA_DETACHING, c.a.MANIFEST_LOADING, c.a.MANIFEST_PARSED, c.a.LEVEL_LOADED, c.a.KEY_LOADED, c.a.FRAG_LOADED, c.a.FRAG_LOAD_EMERGENCY_ABORTED, c.a.FRAG_PARSING_INIT_SEGMENT, c.a.FRAG_PARSING_DATA, c.a.FRAG_PARSED, c.a.ERROR, c.a.AUDIO_TRACK_SWITCHING, c.a.AUDIO_TRACK_SWITCHED, c.a.BUFFER_CREATED, c.a.BUFFER_APPENDED, c.a.BUFFER_FLUSHED));
                return a.fragmentTracker = o,
                a.config = r.config,
                a.audioCodecSwap = !1,
                a._state = E.STOPPED,
                a.stallReported = !1,
                a
            }
            return o(e, t),
            e.prototype.onHandlerDestroying = function() {
                this.stopLoad()
            }
            ,
            e.prototype.onHandlerDestroyed = function() {
                this.state = E.STOPPED,
                this.fragmentTracker = null
            }
            ,
            e.prototype.startLoad = function(t) {
                if (this.levels) {
                    var e = this.lastCurrentTime
                      , r = this.hls;
                    if (this.stopLoad(),
                    this.setInterval(100),
                    this.level = -1,
                    this.fragLoadError = 0,
                    !this.startFragRequested) {
                        var i = r.startLevel;
                        -1 === i && (i = 0,
                        this.bitrateTest = !0),
                        this.level = r.nextLoadLevel = i,
                        this.loadedmetadata = !1
                    }
                    e > 0 && -1 === t && (g.b.log("override startPosition with lastCurrentTime @" + e.toFixed(3)),
                    t = e),
                    this.state = E.IDLE,
                    this.nextLoadPosition = this.startPosition = this.lastCurrentTime = t,
                    this.tick()
                } else
                    this.forceStartLoad = !0,
                    this.state = E.STOPPED
            }
            ,
            e.prototype.stopLoad = function() {
                this.forceStartLoad = !1;
                var t = this.fragCurrent;
                t && (t.loader && t.loader.abort(),
                this.fragmentTracker.removeFragment(t)),
                this.demuxer && (this.demuxer.destroy(),
                this.demuxer = null),
                this.fragCurrent = null,
                this.fragPrevious = null,
                this.clearInterval(),
                this.clearNextTick(),
                this.state = E.STOPPED
            }
            ,
            e.prototype.doTick = function() {
                switch (this.state) {
                case E.BUFFER_FLUSHING:
                    this.fragLoadError = 0;
                    break;
                case E.IDLE:
                    this._doTickIdle();
                    break;
                case E.WAITING_LEVEL:
                    var t = this.levels[this.level];
                    t && t.details && (this.state = E.IDLE);
                    break;
                case E.FRAG_LOADING_WAITING_RETRY:
                    var e = performance.now()
                      , r = this.retryDate;
                    (!r || e >= r || this.media && this.media.seeking) && (g.b.log("mediaController: retryDate reached, switch back to IDLE state"),
                    this.state = E.IDLE);
                    break;
                case E.ERROR:
                case E.STOPPED:
                case E.FRAG_LOADING:
                case E.PARSING:
                case E.PARSED:
                case E.ENDED:
                }
                this._checkBuffer(),
                this._checkFragmentChanged()
            }
            ,
            e.prototype._doTickIdle = function() {
                var t = this.hls
                  , e = t.config
                  , r = this.media;
                if (void 0 !== this.levelLastLoaded && (r || !this.startFragRequested && e.startFragPrefetch)) {
                    var i = void 0;
                    i = this.loadedmetadata ? r.currentTime : this.nextLoadPosition;
                    var n = t.nextLoadLevel
                      , o = this.levels[n];
                    if (o) {
                        var a = o.bitrate
                          , u = void 0;
                        u = a ? Math.max(8 * e.maxBufferSize / a, e.maxBufferLength) : e.maxBufferLength,
                        u = Math.min(u, e.maxMaxBufferLength);
                        var l = s.a.bufferInfo(this.mediaBuffer ? this.mediaBuffer : r, i, e.maxBufferHole)
                          , h = l.len;
                        if (!(h >= u)) {
                            g.b.trace("buffer length of " + h.toFixed(3) + " is below max of " + u.toFixed(3) + ". checking for more payload ..."),
                            this.level = t.nextLoadLevel = n;
                            var f = o.details;
                            if (void 0 === f || !0 === f.live && this.levelLastLoaded !== n)
                                return void (this.state = E.WAITING_LEVEL);
                            var d = this.fragPrevious;
                            if (!f.live && d && !d.backtracked && d.sn === f.endSN && !l.nextStart) {
                                if (Math.min(r.duration, d.start + d.duration) - Math.max(l.end, d.start) <= Math.max(.2, d.duration)) {
                                    var p = {};
                                    return this.altAudio && (p.type = "video"),
                                    this.hls.trigger(c.a.BUFFER_EOS, p),
                                    void (this.state = E.ENDED)
                                }
                            }
                            this._fetchPayloadOrEos(i, l, f)
                        }
                    }
                }
            }
            ,
            e.prototype._fetchPayloadOrEos = function(t, e, r) {
                var i = this.fragPrevious
                  , n = this.level
                  , o = r.fragments
                  , a = o.length;
                if (0 !== a) {
                    var s = o[0].start
                      , u = o[a - 1].start + o[a - 1].duration
                      , c = e.end
                      , l = void 0;
                    if (r.initSegment && !r.initSegment.data)
                        l = r.initSegment;
                    else if (r.live) {
                        var h = this.config.initialLiveManifestSize;
                        if (a < h)
                            return void g.b.warn("Can not start playback of a level, reason: not enough fragments " + a + " < " + h);
                        if (null === (l = this._ensureFragmentAtLivePoint(r, c, s, u, i, o, a)))
                            return
                    } else
                        c < s && (l = o[0]);
                    l || (l = this._findFragment(s, i, a, o, c, u, r)),
                    l && (l.encrypted ? (g.b.log("Loading key for " + l.sn + " of [" + r.startSN + " ," + r.endSN + "],level " + n),
                    this._loadKey(l)) : (g.b.log("Loading " + l.sn + " of [" + r.startSN + " ," + r.endSN + "],level " + n + ", currentTime:" + t.toFixed(3) + ",bufferEnd:" + c.toFixed(3)),
                    this._loadFragment(l)))
                }
            }
            ,
            e.prototype._ensureFragmentAtLivePoint = function(t, e, r, i, n, o, s) {
                var u = this.hls.config
                  , c = this.media
                  , l = void 0
                  , h = void 0 !== u.liveMaxLatencyDuration ? u.liveMaxLatencyDuration : u.liveMaxLatencyDurationCount * t.targetduration;
                if (e < Math.max(r - u.maxFragLookUpTolerance, i - h)) {
                    var f = this.liveSyncPosition = this.computeLivePosition(r, t);
                    g.b.log("buffer end: " + e.toFixed(3) + " is located too far from the end of live sliding playlist, reset currentTime to : " + f.toFixed(3)),
                    e = f,
                    c && c.readyState && c.duration > f && (c.currentTime = f),
                    this.nextLoadPosition = f
                }
                if (t.PTSKnown && e > i && c && c.readyState)
                    return null;
                if (this.startFragRequested && !t.PTSKnown) {
                    if (n)
                        if (t.programDateTime)
                            l = Object(b.b)(o, n.endPdt + 1);
                        else {
                            var d = n.sn + 1;
                            if (d >= t.startSN && d <= t.endSN) {
                                var p = o[d - t.startSN];
                                n.cc === p.cc && (l = p,
                                g.b.log("live playlist, switching playlist, load frag with next SN: " + l.sn))
                            }
                            l || (l = a.a.search(o, function(t) {
                                return n.cc - t.cc
                            })) && g.b.log("live playlist, switching playlist, load frag with same CC: " + l.sn)
                        }
                    l || (l = o[Math.min(s - 1, Math.round(s / 2))],
                    g.b.log("live playlist, switching playlist, unknown, load middle frag : " + l.sn))
                }
                return l
            }
            ,
            e.prototype._findFragment = function(t, e, r, i, n, o, a) {
                var s = this.hls.config
                  , u = void 0
                  , c = void 0;
                if (n < o ? a.programDateTime ? (c = Object(b.b)(i, Object(b.a)(t, n, a))) && !Object(b.d)(n, s.maxFragLookUpTolerance, c) || (g.b.warn("Frag found by PDT search did not fit within tolerance; falling back to finding by SN"),
                c = function() {
                    return Object(b.c)(e, i, n, o, s.maxFragLookUpTolerance)
                }()) : c = Object(b.c)(e, i, n, o, s.maxFragLookUpTolerance) : c = i[r - 1],
                c) {
                    u = c;
                    var l = u.sn - a.startSN
                      , h = e && u.level === e.level
                      , f = i[l - 1]
                      , d = i[l + 1];
                    if (e && u.sn === e.sn)
                        if (h && !u.backtracked)
                            if (u.sn < a.endSN) {
                                var p = e.deltaPTS;
                                p && p > s.maxBufferHole && e.dropped && l ? (u = f,
                                g.b.warn("SN just loaded, with large PTS gap between audio and video, maybe frag is not starting with a keyframe ? load previous one to try to overcome this")) : (u = d,
                                g.b.log("SN just loaded, load next one: " + u.sn))
                            } else
                                u = null;
                        else
                            u.backtracked && (d && d.backtracked ? (g.b.warn("Already backtracked from fragment " + d.sn + ", will not backtrack to fragment " + u.sn + ". Loading fragment " + d.sn),
                            u = d) : (g.b.warn("Loaded fragment with dropped frames, backtracking 1 segment to find a keyframe"),
                            u.dropped = 0,
                            f ? (u = f,
                            u.backtracked = !0) : l && (u = null)))
                }
                return u
            }
            ,
            e.prototype._loadKey = function(t) {
                this.state = E.KEY_LOADING,
                this.hls.trigger(c.a.KEY_LOADING, {
                    frag: t
                })
            }
            ,
            e.prototype._loadFragment = function(t) {
                var e = this.fragmentTracker.getState(t);
                this.fragCurrent = t,
                this.startFragRequested = !0,
                isNaN(t.sn) || t.bitrateTest || (this.nextLoadPosition = t.start + t.duration),
                t.backtracked || e === l.a.NOT_LOADED || e === l.a.PARTIAL ? (t.autoLevel = this.hls.autoLevelEnabled,
                t.bitrateTest = this.bitrateTest,
                this.hls.trigger(c.a.FRAG_LOADING, {
                    frag: t
                }),
                this.demuxer || (this.demuxer = new u.a(this.hls,"main")),
                this.state = E.FRAG_LOADING) : e === l.a.APPENDING && this._reduceMaxBufferLength(t.duration) && this.fragmentTracker.removeFragment(t)
            }
            ,
            e.prototype.getBufferedFrag = function(t) {
                return this.fragmentTracker.getBufferedFrag(t, f.a.LevelType.MAIN)
            }
            ,
            e.prototype.followingBufferedFrag = function(t) {
                return t ? this.getBufferedFrag(t.endPTS + .5) : null
            }
            ,
            e.prototype._checkFragmentChanged = function() {
                var t = void 0
                  , e = void 0
                  , r = this.media;
                if (r && r.readyState && !1 === r.seeking && (e = r.currentTime,
                e > this.lastCurrentTime && (this.lastCurrentTime = e),
                s.a.isBuffered(r, e) ? t = this.getBufferedFrag(e) : s.a.isBuffered(r, e + .1) && (t = this.getBufferedFrag(e + .1)),
                t)) {
                    var i = t;
                    if (i !== this.fragPlaying) {
                        this.hls.trigger(c.a.FRAG_CHANGED, {
                            frag: i
                        });
                        var n = i.level;
                        this.fragPlaying && this.fragPlaying.level === n || this.hls.trigger(c.a.LEVEL_SWITCHED, {
                            level: n
                        }),
                        this.fragPlaying = i
                    }
                }
            }
            ,
            e.prototype.immediateLevelSwitch = function() {
                if (g.b.log("immediateLevelSwitch"),
                !this.immediateSwitch) {
                    this.immediateSwitch = !0;
                    var t = this.media
                      , e = void 0;
                    t ? (e = t.paused,
                    t.pause()) : e = !0,
                    this.previouslyPaused = e
                }
                var r = this.fragCurrent;
                r && r.loader && r.loader.abort(),
                this.fragCurrent = null,
                this.flushMainBuffer(0, Number.POSITIVE_INFINITY)
            }
            ,
            e.prototype.immediateLevelSwitchEnd = function() {
                var t = this.media;
                t && t.buffered.length && (this.immediateSwitch = !1,
                s.a.isBuffered(t, t.currentTime) && (t.currentTime -= 1e-4),
                this.previouslyPaused || t.play())
            }
            ,
            e.prototype.nextLevelSwitch = function() {
                var t = this.media;
                if (t && t.readyState) {
                    var e = void 0
                      , r = void 0
                      , i = void 0;
                    if (r = this.getBufferedFrag(t.currentTime),
                    r && r.startPTS > 1 && this.flushMainBuffer(0, r.startPTS - 1),
                    t.paused)
                        e = 0;
                    else {
                        var n = this.hls.nextLoadLevel
                          , o = this.levels[n]
                          , a = this.fragLastKbps;
                        e = a && this.fragCurrent ? this.fragCurrent.duration * o.bitrate / (1e3 * a) + 1 : 0
                    }
                    if ((i = this.getBufferedFrag(t.currentTime + e)) && (i = this.followingBufferedFrag(i))) {
                        var s = this.fragCurrent;
                        s && s.loader && s.loader.abort(),
                        this.fragCurrent = null,
                        this.flushMainBuffer(i.maxStartPTS, Number.POSITIVE_INFINITY)
                    }
                }
            }
            ,
            e.prototype.flushMainBuffer = function(t, e) {
                this.state = E.BUFFER_FLUSHING;
                var r = {
                    startOffset: t,
                    endOffset: e
                };
                this.altAudio && (r.type = "video"),
                this.hls.trigger(c.a.BUFFER_FLUSHING, r)
            }
            ,
            e.prototype.onMediaAttached = function(t) {
                var e = this.media = this.mediaBuffer = t.media;
                this.onvseeking = this.onMediaSeeking.bind(this),
                this.onvseeked = this.onMediaSeeked.bind(this),
                this.onvended = this.onMediaEnded.bind(this),
                e.addEventListener("seeking", this.onvseeking),
                e.addEventListener("seeked", this.onvseeked),
                e.addEventListener("ended", this.onvended);
                var r = this.config;
                this.levels && r.autoStartLoad && this.hls.startLoad(r.startPosition)
            }
            ,
            e.prototype.onMediaDetaching = function() {
                var t = this.media;
                t && t.ended && (g.b.log("MSE detaching and video ended, reset startPosition"),
                this.startPosition = this.lastCurrentTime = 0);
                var e = this.levels;
                e && e.forEach(function(t) {
                    t.details && t.details.fragments.forEach(function(t) {
                        t.backtracked = void 0
                    })
                }),
                t && (t.removeEventListener("seeking", this.onvseeking),
                t.removeEventListener("seeked", this.onvseeked),
                t.removeEventListener("ended", this.onvended),
                this.onvseeking = this.onvseeked = this.onvended = null),
                this.media = this.mediaBuffer = null,
                this.loadedmetadata = !1,
                this.stopLoad()
            }
            ,
            e.prototype.onMediaSeeking = function() {
                var t = this.media
                  , e = t ? t.currentTime : void 0
                  , r = this.config;
                isNaN(e) || g.b.log("media seeking to " + e.toFixed(3));
                var i = this.mediaBuffer ? this.mediaBuffer : t
                  , n = s.a.bufferInfo(i, e, this.config.maxBufferHole);
                if (this.state === E.FRAG_LOADING) {
                    var o = this.fragCurrent;
                    if (0 === n.len && o) {
                        var a = r.maxFragLookUpTolerance
                          , u = o.start - a
                          , c = o.start + o.duration + a;
                        e < u || e > c ? (o.loader && (g.b.log("seeking outside of buffer while fragment load in progress, cancel fragment load"),
                        o.loader.abort()),
                        this.fragCurrent = null,
                        this.fragPrevious = null,
                        this.state = E.IDLE) : g.b.log("seeking outside of buffer but within currently loaded fragment range")
                    }
                } else
                    this.state === E.ENDED && (0 === n.len && (this.fragPrevious = 0),
                    this.state = E.IDLE);
                t && (this.lastCurrentTime = e),
                this.loadedmetadata || (this.nextLoadPosition = this.startPosition = e),
                this.tick()
            }
            ,
            e.prototype.onMediaSeeked = function() {
                var t = this.media
                  , e = t ? t.currentTime : void 0;
                isNaN(e) || g.b.log("media seeked to " + e.toFixed(3)),
                this.tick()
            }
            ,
            e.prototype.onMediaEnded = function() {
                g.b.log("media ended"),
                this.startPosition = this.lastCurrentTime = 0
            }
            ,
            e.prototype.onManifestLoading = function() {
                g.b.log("trigger BUFFER_RESET"),
                this.hls.trigger(c.a.BUFFER_RESET),
                this.fragmentTracker.removeAllFragments(),
                this.stalled = !1,
                this.startPosition = this.lastCurrentTime = 0
            }
            ,
            e.prototype.onManifestParsed = function(t) {
                var e = !1
                  , r = !1
                  , i = void 0;
                t.levels.forEach(function(t) {
                    (i = t.audioCodec) && (-1 !== i.indexOf("mp4a.40.2") && (e = !0),
                    -1 !== i.indexOf("mp4a.40.5") && (r = !0))
                }),
                this.audioCodecSwitch = e && r,
                this.audioCodecSwitch && g.b.log("both AAC/HE-AAC audio found in levels; declaring level codec as HE-AAC"),
                this.levels = t.levels,
                this.startFragRequested = !1;
                var n = this.config;
                (n.autoStartLoad || this.forceStartLoad) && this.hls.startLoad(n.startPosition)
            }
            ,
            e.prototype.onLevelLoaded = function(t) {
                var e = t.details
                  , r = t.level
                  , i = this.levels[this.levelLastLoaded]
                  , n = this.levels[r]
                  , o = e.totalduration
                  , a = 0;
                if (g.b.log("level " + r + " loaded [" + e.startSN + "," + e.endSN + "],duration:" + o),
                e.live) {
                    var s = n.details;
                    s && e.fragments.length > 0 ? (d.a(s, e),
                    a = e.fragments[0].start,
                    this.liveSyncPosition = this.computeLivePosition(a, s),
                    e.PTSKnown && !isNaN(a) ? g.b.log("live playlist sliding:" + a.toFixed(3)) : (g.b.log("live playlist - outdated PTS, unknown sliding"),
                    Object(v.a)(this.fragPrevious, i, e))) : (g.b.log("live playlist - first load, unknown sliding"),
                    e.PTSKnown = !1,
                    Object(v.a)(this.fragPrevious, i, e))
                } else
                    e.PTSKnown = !1;
                if (n.details = e,
                this.levelLastLoaded = r,
                this.hls.trigger(c.a.LEVEL_UPDATED, {
                    details: e,
                    level: r
                }),
                !1 === this.startFragRequested) {
                    if (-1 === this.startPosition || -1 === this.lastCurrentTime) {
                        var u = e.startTimeOffset;
                        isNaN(u) ? e.live ? (this.startPosition = this.computeLivePosition(a, e),
                        g.b.log("configure startPosition to " + this.startPosition)) : this.startPosition = 0 : (u < 0 && (g.b.log("negative start time offset " + u + ", count from end of last fragment"),
                        u = a + o + u),
                        g.b.log("start time offset found in playlist, adjust startPosition to " + u),
                        this.startPosition = u),
                        this.lastCurrentTime = this.startPosition
                    }
                    this.nextLoadPosition = this.startPosition
                }
                this.state === E.WAITING_LEVEL && (this.state = E.IDLE),
                this.tick()
            }
            ,
            e.prototype.onKeyLoaded = function() {
                this.state === E.KEY_LOADING && (this.state = E.IDLE,
                this.tick())
            }
            ,
            // 第四个onFragLoaded 跳转
            e.prototype.onFragLoaded = function(t) {
                // 这个fragCurrent应该是在之前的hlsFragLoading事件中初始化了
                var e = this.fragCurrent
                  , r = t.frag;
                if (this.state === E.FRAG_LOADING && e && "main" === r.type && r.level === e.level && r.sn === e.sn) {
                    var i = t.stats
                      , n = this.levels[e.level]
                      , o = n.details;
                    if (g.b.log("Loaded  " + e.sn + " of [" + o.startSN + " ," + o.endSN + "],level " + e.level),
                    this.bitrateTest = !1,
                    this.stats = i,
                    !0 === r.bitrateTest && this.hls.nextLoadLevel)
                        this.state = E.IDLE,
                        this.startFragRequested = !1,
                        i.tparsed = i.tbuffered = performance.now(),
                        this.hls.trigger(c.a.FRAG_BUFFERED, {
                            stats: i,
                            frag: e,
                            id: "main"
                        }),
                        this.tick();
                    else if ("initSegment" === r.sn)
                        this.state = E.IDLE,
                        i.tparsed = i.tbuffered = performance.now(),
                        o.initSegment.data = t.payload,
                        this.hls.trigger(c.a.FRAG_BUFFERED, {
                            stats: i,
                            frag: e,
                            id: "main"
                        }),
                        this.tick();
                    else {
                        this.state = E.PARSING;
                        var a = o.totalduration
                          , s = e.level
                          , l = e.sn
                          , h = this.config.defaultAudioCodec || n.audioCodec;
                        this.audioCodecSwap && (g.b.log("swapping playlist audio codec"),
                        void 0 === h && (h = this.lastAudioCodec),
                        h && (h = -1 !== h.indexOf("mp4a.40.5") ? "mp4a.40.2" : "mp4a.40.5")),
                        this.pendingBuffering = !0,
                        this.appended = !1,
                        g.b.log("Parsing " + l + " of [" + o.startSN + " ," + o.endSN + "],level " + s + ", cc " + e.cc);
                        var f = this.demuxer;
                        f || (f = this.demuxer = new u.a(this.hls,"main"));
                        var d = this.media
                          , p = d && d.seeking
                          , y = !p && (o.PTSKnown || !o.live)
                          , v = o.initSegment ? o.initSegment.data : [];
                        //   payload
                        f.push(t.payload, v, h, n.videoCodec, e, a, y, void 0)
                    }
                }
                this.fragLoadError = 0
            }
            ,
            e.prototype.onFragParsingInitSegment = function(t) {
                var e = this.fragCurrent
                  , r = t.frag;
                if (e && "main" === t.id && r.sn === e.sn && r.level === e.level && this.state === E.PARSING) {
                    var i = t.tracks
                      , n = void 0
                      , o = void 0;
                    if (i.audio && this.altAudio && delete i.audio,
                    o = i.audio) {
                        var a = this.levels[this.level].audioCodec
                          , s = navigator.userAgent.toLowerCase();
                        a && this.audioCodecSwap && (g.b.log("swapping playlist audio codec"),
                        a = -1 !== a.indexOf("mp4a.40.5") ? "mp4a.40.2" : "mp4a.40.5"),
                        this.audioCodecSwitch && 1 !== o.metadata.channelCount && -1 === s.indexOf("firefox") && (a = "mp4a.40.5"),
                        -1 !== s.indexOf("android") && "audio/mpeg" !== o.container && (a = "mp4a.40.2",
                        g.b.log("Android: force audio codec to " + a)),
                        o.levelCodec = a,
                        o.id = t.id
                    }
                    o = i.video,
                    o && (o.levelCodec = this.levels[this.level].videoCodec,
                    o.id = t.id),
                    this.hls.trigger(c.a.BUFFER_CODECS, i);
                    for (n in i) {
                        o = i[n],
                        g.b.log("main track:" + n + ",container:" + o.container + ",codecs[level/parsed]=[" + o.levelCodec + "/" + o.codec + "]");
                        var u = o.initSegment;
                        u && (this.appended = !0,
                        this.pendingBuffering = !0,
                        this.hls.trigger(c.a.BUFFER_APPENDING, {
                            type: n,
                            data: u,
                            parent: "main",
                            content: "initSegment"
                        }))
                    }
                    this.tick()
                }
            }
            ,
            e.prototype.onFragParsingData = function(t) {
                var e = this
                  , r = this.fragCurrent
                  , i = t.frag;
                if (r && "main" === t.id && i.sn === r.sn && i.level === r.level && ("audio" !== t.type || !this.altAudio) && this.state === E.PARSING) {
                    var n = this.levels[this.level]
                      , o = r;
                    if (isNaN(t.endPTS) && (t.endPTS = t.startPTS + r.duration,
                    t.endDTS = t.startDTS + r.duration),
                    !0 === t.hasAudio && o.addElementaryStream(h.a.ElementaryStreamTypes.AUDIO),
                    !0 === t.hasVideo && o.addElementaryStream(h.a.ElementaryStreamTypes.VIDEO),
                    g.b.log("Parsed " + t.type + ",PTS:[" + t.startPTS.toFixed(3) + "," + t.endPTS.toFixed(3) + "],DTS:[" + t.startDTS.toFixed(3) + "/" + t.endDTS.toFixed(3) + "],nb:" + t.nb + ",dropped:" + (t.dropped || 0)),
                    "video" === t.type)
                        if (o.dropped = t.dropped,
                        o.dropped)
                            if (o.backtracked)
                                g.b.warn("Already backtracked on this fragment, appending with the gap", o.sn);
                            else {
                                var a = n.details;
                                if (!a || o.sn !== a.startSN)
                                    return g.b.warn("missing video frame(s), backtracking fragment", o.sn),
                                    this.fragmentTracker.removeFragment(o),
                                    o.backtracked = !0,
                                    this.nextLoadPosition = t.startPTS,
                                    this.state = E.IDLE,
                                    this.fragPrevious = o,
                                    void this.tick();
                                g.b.warn("missing video frame(s) on first frag, appending with gap", o.sn)
                            }
                        else
                            o.backtracked = !1;
                    var s = d.b(n.details, o, t.startPTS, t.endPTS, t.startDTS, t.endDTS)
                      , u = this.hls;
                    u.trigger(c.a.LEVEL_PTS_UPDATED, {
                        details: n.details,
                        level: this.level,
                        drift: s,
                        type: t.type,
                        start: t.startPTS,
                        end: t.endPTS
                    }),
                    [t.data1, t.data2].forEach(function(r) {
                        r && r.length && e.state === E.PARSING && (e.appended = !0,
                        e.pendingBuffering = !0,
                        u.trigger(c.a.BUFFER_APPENDING, {
                            type: t.type,
                            data: r,
                            parent: "main",
                            content: "data"
                        }))
                    }),
                    this.tick()
                }
            }
            ,
            e.prototype.onFragParsed = function(t) {
                var e = this.fragCurrent
                  , r = t.frag;
                e && "main" === t.id && r.sn === e.sn && r.level === e.level && this.state === E.PARSING && (this.stats.tparsed = performance.now(),
                this.state = E.PARSED,
                this._checkAppendedParsed())
            }
            ,
            e.prototype.onAudioTrackSwitching = function(t) {
                var e = !!t.url
                  , r = t.id;
                if (!e) {
                    if (this.mediaBuffer !== this.media) {
                        g.b.log("switching on main audio, use media.buffered to schedule main fragment loading"),
                        this.mediaBuffer = this.media;
                        var i = this.fragCurrent;
                        i.loader && (g.b.log("switching to main audio track, cancel main fragment load"),
                        i.loader.abort()),
                        this.fragCurrent = null,
                        this.fragPrevious = null,
                        this.demuxer && (this.demuxer.destroy(),
                        this.demuxer = null),
                        this.state = E.IDLE
                    }
                    var n = this.hls;
                    n.trigger(c.a.BUFFER_FLUSHING, {
                        startOffset: 0,
                        endOffset: Number.POSITIVE_INFINITY,
                        type: "audio"
                    }),
                    n.trigger(c.a.AUDIO_TRACK_SWITCHED, {
                        id: r
                    }),
                    this.altAudio = !1
                }
            }
            ,
            e.prototype.onAudioTrackSwitched = function(t) {
                var e = t.id
                  , r = !!this.hls.audioTracks[e].url;
                if (r) {
                    var i = this.videoBuffer;
                    i && this.mediaBuffer !== i && (g.b.log("switching on alternate audio, use video.buffered to schedule main fragment loading"),
                    this.mediaBuffer = i)
                }
                this.altAudio = r,
                this.tick()
            }
            ,
            e.prototype.onBufferCreated = function(t) {
                var e = t.tracks
                  , r = void 0
                  , i = void 0
                  , n = !1;
                for (var o in e) {
                    var a = e[o];
                    "main" === a.id ? (i = o,
                    r = a,
                    "video" === o && (this.videoBuffer = e[o].buffer)) : n = !0
                }
                n && r ? (g.b.log("alternate track found, use " + i + ".buffered to schedule main fragment loading"),
                this.mediaBuffer = r.buffer) : this.mediaBuffer = this.media
            }
            ,
            e.prototype.onBufferAppended = function(t) {
                if ("main" === t.parent) {
                    var e = this.state;
                    e !== E.PARSING && e !== E.PARSED || (this.pendingBuffering = t.pending > 0,
                    this._checkAppendedParsed())
                }
            }
            ,
            e.prototype._checkAppendedParsed = function() {
                if (!(this.state !== E.PARSED || this.appended && this.pendingBuffering)) {
                    var t = this.fragCurrent;
                    if (t) {
                        var e = this.mediaBuffer ? this.mediaBuffer : this.media;
                        g.b.log("main buffered : " + p.a.toString(e.buffered)),
                        this.fragPrevious = t;
                        var r = this.stats;
                        r.tbuffered = performance.now(),
                        this.fragLastKbps = Math.round(8 * r.total / (r.tbuffered - r.tfirst)),
                        this.hls.trigger(c.a.FRAG_BUFFERED, {
                            stats: r,
                            frag: t,
                            id: "main"
                        }),
                        this.state = E.IDLE
                    }
                    this.tick()
                }
            }
            ,
            e.prototype.onError = function(t) {
                var e = t.frag || this.fragCurrent;
                if (!e || "main" === e.type) {
                    var r = !!this.media && s.a.isBuffered(this.media, this.media.currentTime) && s.a.isBuffered(this.media, this.media.currentTime + .5);
                    switch (t.details) {
                    case y.a.FRAG_LOAD_ERROR:
                    case y.a.FRAG_LOAD_TIMEOUT:
                    case y.a.KEY_LOAD_ERROR:
                    case y.a.KEY_LOAD_TIMEOUT:
                        if (!t.fatal)
                            if (this.fragLoadError + 1 <= this.config.fragLoadingMaxRetry) {
                                var i = Math.min(Math.pow(2, this.fragLoadError) * this.config.fragLoadingRetryDelay, this.config.fragLoadingMaxRetryTimeout);
                                g.b.warn("mediaController: frag loading failed, retry in " + i + " ms"),
                                this.retryDate = performance.now() + i,
                                this.loadedmetadata || (this.startFragRequested = !1,
                                this.nextLoadPosition = this.startPosition),
                                this.fragLoadError++,
                                this.state = E.FRAG_LOADING_WAITING_RETRY
                            } else
                                g.b.error("mediaController: " + t.details + " reaches max retry, redispatch as fatal ..."),
                                t.fatal = !0,
                                this.state = E.ERROR;
                        break;
                    case y.a.LEVEL_LOAD_ERROR:
                    case y.a.LEVEL_LOAD_TIMEOUT:
                        this.state !== E.ERROR && (t.fatal ? (this.state = E.ERROR,
                        g.b.warn("streamController: " + t.details + ",switch to " + this.state + " state ...")) : t.levelRetry || this.state !== E.WAITING_LEVEL || (this.state = E.IDLE));
                        break;
                    case y.a.BUFFER_FULL_ERROR:
                        "main" !== t.parent || this.state !== E.PARSING && this.state !== E.PARSED || (r ? (this._reduceMaxBufferLength(this.config.maxBufferLength),
                        this.state = E.IDLE) : (g.b.warn("buffer full error also media.currentTime is not buffered, flush everything"),
                        this.fragCurrent = null,
                        this.flushMainBuffer(0, Number.POSITIVE_INFINITY)))
                    }
                }
            }
            ,
            e.prototype._reduceMaxBufferLength = function(t) {
                var e = this.config;
                return e.maxMaxBufferLength >= t && (e.maxMaxBufferLength /= 2,
                g.b.warn("main:reduce max buffer length to " + e.maxMaxBufferLength + "s"),
                !0)
            }
            ,
            e.prototype._checkBuffer = function() {
                var t = this.config
                  , e = this.media;
                if (e && 0 !== e.readyState) {
                    var r = e.currentTime
                      , i = this.mediaBuffer ? this.mediaBuffer : e
                      , n = i.buffered;
                    if (!this.loadedmetadata && n.length)
                        this.loadedmetadata = !0,
                        this._seekToStartPos();
                    else if (this.immediateSwitch)
                        this.immediateLevelSwitchEnd();
                    else {
                        var o = !(e.paused && e.readyState > 1 || e.ended || 0 === e.buffered.length)
                          , a = performance.now();
                        if (r !== this.lastCurrentTime)
                            this.stallReported && (g.b.warn("playback not stuck anymore @" + r + ", after " + Math.round(a - this.stalled) + "ms"),
                            this.stallReported = !1),
                            this.stalled = null,
                            this.nudgeRetry = 0;
                        else if (o) {
                            var u = a - this.stalled
                              , c = s.a.bufferInfo(e, r, t.maxBufferHole);
                            if (!this.stalled)
                                return void (this.stalled = a);
                            u >= 1e3 && this._reportStall(c.len),
                            this._tryFixBufferStall(c, u)
                        }
                    }
                }
            }
            ,
            e.prototype.onFragLoadEmergencyAborted = function() {
                this.state = E.IDLE,
                this.loadedmetadata || (this.startFragRequested = !1,
                this.nextLoadPosition = this.startPosition),
                this.tick()
            }
            ,
            e.prototype.onBufferFlushed = function() {
                var t = this.mediaBuffer ? this.mediaBuffer : this.media;
                t && this.fragmentTracker.detectEvictedFragments(h.a.ElementaryStreamTypes.VIDEO, t.buffered),
                this.state = E.IDLE,
                this.fragPrevious = null
            }
            ,
            e.prototype.swapAudioCodec = function() {
                this.audioCodecSwap = !this.audioCodecSwap
            }
            ,
            e.prototype.computeLivePosition = function(t, e) {
                var r = void 0 !== this.config.liveSyncDuration ? this.config.liveSyncDuration : this.config.liveSyncDurationCount * e.targetduration;
                return t + Math.max(0, e.totalduration - r)
            }
            ,
            e.prototype._tryFixBufferStall = function(t, e) {
                var r = this.config
                  , i = this.media
                  , n = i.currentTime
                  , o = this.fragmentTracker.getPartialFragment(n);
                o && this._trySkipBufferHole(o),
                t.len > .5 && e > 1e3 * r.highBufferWatchdogPeriod && (this.stalled = null,
                this._tryNudgeBuffer())
            }
            ,
            e.prototype._reportStall = function(t) {
                var e = this.hls
                  , r = this.media;
                this.stallReported || (this.stallReported = !0,
                g.b.warn("Playback stalling at @" + r.currentTime + " due to low buffer"),
                e.trigger(c.a.ERROR, {
                    type: y.b.MEDIA_ERROR,
                    details: y.a.BUFFER_STALLED_ERROR,
                    fatal: !1,
                    buffer: t
                }))
            }
            ,
            e.prototype._trySkipBufferHole = function(t) {
                for (var e = this.hls, r = this.media, i = r.currentTime, n = 0, o = 0; o < r.buffered.length; o++) {
                    var a = r.buffered.start(o);
                    if (i >= n && i < a)
                        return r.currentTime = Math.max(a, r.currentTime + .1),
                        g.b.warn("skipping hole, adjusting currentTime from " + i + " to " + r.currentTime),
                        this.stalled = null,
                        void e.trigger(c.a.ERROR, {
                            type: y.b.MEDIA_ERROR,
                            details: y.a.BUFFER_SEEK_OVER_HOLE,
                            fatal: !1,
                            reason: "fragment loaded with buffer holes, seeking from " + i + " to " + r.currentTime,
                            frag: t
                        });
                    n = r.buffered.end(o)
                }
            }
            ,
            e.prototype._tryNudgeBuffer = function() {
                var t = this.config
                  , e = this.hls
                  , r = this.media
                  , i = r.currentTime
                  , n = (this.nudgeRetry || 0) + 1;
                if (this.nudgeRetry = n,
                n < t.nudgeMaxRetry) {
                    var o = i + n * t.nudgeOffset;
                    g.b.log("adjust currentTime from " + i + " to " + o),
                    r.currentTime = o,
                    e.trigger(c.a.ERROR, {
                        type: y.b.MEDIA_ERROR,
                        details: y.a.BUFFER_NUDGE_ON_STALL,
                        fatal: !1
                    })
                } else
                    g.b.error("still stuck in high buffer @" + i + " after " + t.nudgeMaxRetry + ", raise fatal error"),
                    e.trigger(c.a.ERROR, {
                        type: y.b.MEDIA_ERROR,
                        details: y.a.BUFFER_STALLED_ERROR,
                        fatal: !0
                    })
            }
            ,
            e.prototype._seekToStartPos = function() {
                var t = this.media
                  , e = t.currentTime
                  , r = t.seeking ? e : this.startPosition;
                e !== r && (g.b.log("target start position not buffered, seek to buffered.start(0) " + r + " from current time " + e + " "),
                t.currentTime = r)
            }
            ,
            S(e, [{
                key: "state",
                set: function(t) {
                    if (this.state !== t) {
                        var e = this.state;
                        this._state = t,
                        g.b.log("main stream:" + e + "->" + t),
                        this.hls.trigger(c.a.STREAM_STATE_TRANSITION, {
                            previousState: e,
                            nextState: t
                        })
                    }
                },
                get: function() {
                    return this._state
                }
            }, {
                key: "currentLevel",
                get: function() {
                    var t = this.media;
                    if (t) {
                        var e = this.getBufferedFrag(t.currentTime);
                        if (e)
                            return e.level
                    }
                    return -1
                }
            }, {
                key: "nextBufferedFrag",
                get: function() {
                    var t = this.media;
                    return t ? this.followingBufferedFrag(this.getBufferedFrag(t.currentTime)) : null
                }
            }, {
                key: "nextLevel",
                get: function() {
                    var t = this.nextBufferedFrag;
                    return t ? t.level : -1
                }
            }, {
                key: "liveSyncPosition",
                get: function() {
                    return this._liveSyncPosition
                },
                set: function(t) {
                    this._liveSyncPosition = t
                }
            }]),
            e
        }(m.a);
        e.a = T
    }
    , function(t, e, r) {
        function i(t) {
            function e(i) {
                if (r[i])
                    return r[i].exports;
                var n = r[i] = {
                    i: i,
                    l: !1,
                    exports: {}
                };
                return t[i].call(n.exports, n, n.exports, e),
                n.l = !0,
                n.exports
            }
            var r = {};
            e.m = t,
            e.c = r,
            e.i = function(t) {
                return t
            }
            ,
            e.d = function(t, r, i) {
                e.o(t, r) || Object.defineProperty(t, r, {
                    configurable: !1,
                    enumerable: !0,
                    get: i
                })
            }
            ,
            e.n = function(t) {
                var r = t && t.__esModule ? function() {
                    return t.default
                }
                : function() {
                    return t
                }
                ;
                return e.d(r, "a", r),
                r
            }
            ,
            e.o = function(t, e) {
                return Object.prototype.hasOwnProperty.call(t, e)
            }
            ,
            e.p = "/",
            e.oe = function(t) {
                throw console.error(t),
                t
            }
            ;
            var i = e(e.s = ENTRY_MODULE);
            return i.default || i
        }
        function n(t) {
            return (t + "").replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&")
        }
        function o(t, e, i) {
            var o = {};
            o[i] = [];
            var a = e.toString()
              , s = a.match(/^function\s?\(\w+,\s*\w+,\s*(\w+)\)/);
            if (!s)
                return o;
            for (var l, h = s[1], f = new RegExp("(\\\\n|\\W)" + n(h) + c,"g"); l = f.exec(a); )
                "dll-reference" !== l[3] && o[i].push(l[3]);
            for (f = new RegExp("\\(" + n(h) + '\\("(dll-reference\\s(' + u + '))"\\)\\)' + c,"g"); l = f.exec(a); )
                t[l[2]] || (o[i].push(l[1]),
                t[l[2]] = r(l[1]).m),
                o[l[2]] = o[l[2]] || [],
                o[l[2]].push(l[4]);
            return o
        }
        function a(t) {
            return Object.keys(t).reduce(function(e, r) {
                return e || t[r].length > 0
            }, !1)
        }
        function s(t, e) {
            for (var r = {
                main: [e]
            }, i = {
                main: []
            }, n = {
                main: {}
            }; a(r); )
                for (var s = Object.keys(r), u = 0; u < s.length; u++) {
                    var c = s[u]
                      , l = r[c]
                      , h = l.pop();
                    if (n[c] = n[c] || {},
                    !n[c][h] && t[c][h]) {
                        n[c][h] = !0,
                        i[c] = i[c] || [],
                        i[c].push(h);
                        for (var f = o(t, t[c][h], c), d = Object.keys(f), p = 0; p < d.length; p++)
                            r[d[p]] = r[d[p]] || [],
                            r[d[p]] = r[d[p]].concat(f[d[p]])
                    }
                }
            return i
        }
        var u = "[\\.|\\-|\\+|\\w|/|@]+"
          , c = "\\((/\\*.*?\\*/)?s?.*?(" + u + ").*?\\)";
        t.exports = function(t, e) {
            e = e || {};
            var n = {
                main: r.m
            }
              , o = e.all ? {
                main: Object.keys(n)
            } : s(n, t)
              , a = "";
            Object.keys(o).filter(function(t) {
                return "main" !== t
            }).forEach(function(t) {
                for (var e = 0; o[t][e]; )
                    e++;
                o[t].push(e),
                n[t][e] = "(function(module, exports, __webpack_require__) { module.exports = __webpack_require__; })",
                a = a + "var " + t + " = (" + i.toString().replace("ENTRY_MODULE", JSON.stringify(e)) + ")({" + o[t].map(function(e) {
                    return JSON.stringify(e) + ": " + n[t][e].toString()
                }).join(",") + "});\n"
            }),
            a = a + "(" + i.toString().replace("ENTRY_MODULE", JSON.stringify(t)) + ")({" + o.main.map(function(t) {
                return JSON.stringify(t) + ": " + n.main[t].toString()
            }).join(",") + "})(self);";
            var u = new window.Blob([a],{
                type: "text/javascript"
            });
            if (e.bare)
                return u;
            var c = window.URL || window.webkitURL || window.mozURL || window.msURL
              , l = c.createObjectURL(u)
              , h = new window.Worker(l);
            return h.objectURL = l,
            h
        }
    }
    , function(t, e, r) {
        "use strict";
        function i(t, e) {
            if (!(t instanceof e))
                throw new TypeError("Cannot call a class as a function")
        }
        var n = function() {
            function t(e, r) {
                i(this, t),
                this.subtle = e,
                this.aesIV = r
            }
            return t.prototype.decrypt = function(t, e) {
                return this.subtle.decrypt({
                    name: "AES-CBC",
                    iv: this.aesIV
                }, e, t)
            }
            ,
            t
        }();
        e.a = n
    }
    , function(t, e, r) {
        "use strict";
        function i(t, e) {
            if (!(t instanceof e))
                throw new TypeError("Cannot call a class as a function")
        }
        var n = function() {
            function t(e, r) {
                i(this, t),
                this.subtle = e,
                this.key = r
            }
            return t.prototype.expandKey = function() {
                return this.subtle.importKey("raw", this.key, {
                    name: "AES-CBC"
                }, !1, ["encrypt", "decrypt"])
            }
            ,
            t
        }();
        e.a = n
    }
    , function(t, e, r) {
        "use strict";
        function i(t, e) {
            if (!(t instanceof e))
                throw new TypeError("Cannot call a class as a function")
        }
        function n(t) {
            var e = t.byteLength
              , r = e && new DataView(t).getUint8(e - 1);
            return r ? t.slice(0, e - r) : t
        }
        var o = function() {
            function t() {
                i(this, t),
                this.rcon = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54],
                this.subMix = [new Uint32Array(256), new Uint32Array(256), new Uint32Array(256), new Uint32Array(256)],
                this.invSubMix = [new Uint32Array(256), new Uint32Array(256), new Uint32Array(256), new Uint32Array(256)],
                this.sBox = new Uint32Array(256),
                this.invSBox = new Uint32Array(256),
                this.key = new Uint32Array(0),
                this.initTable()
            }
            return t.prototype.uint8ArrayToUint32Array_ = function(t) {
                for (var e = new DataView(t), r = new Uint32Array(4), i = 0; i < 4; i++)
                    r[i] = e.getUint32(4 * i);
                return r
            }
            ,
            t.prototype.initTable = function() {
                var t = this.sBox
                  , e = this.invSBox
                  , r = this.subMix
                  , i = r[0]
                  , n = r[1]
                  , o = r[2]
                  , a = r[3]
                  , s = this.invSubMix
                  , u = s[0]
                  , c = s[1]
                  , l = s[2]
                  , h = s[3]
                  , f = new Uint32Array(256)
                  , d = 0
                  , p = 0
                  , y = 0;
                for (y = 0; y < 256; y++)
                    f[y] = y < 128 ? y << 1 : y << 1 ^ 283;
                for (y = 0; y < 256; y++) {
                    var g = p ^ p << 1 ^ p << 2 ^ p << 3 ^ p << 4;
                    g = g >>> 8 ^ 255 & g ^ 99,
                    t[d] = g,
                    e[g] = d;
                    var v = f[d]
                      , m = f[v]
                      , b = f[m]
                      , S = 257 * f[g] ^ 16843008 * g;
                    i[d] = S << 24 | S >>> 8,
                    n[d] = S << 16 | S >>> 16,
                    o[d] = S << 8 | S >>> 24,
                    a[d] = S,
                    S = 16843009 * b ^ 65537 * m ^ 257 * v ^ 16843008 * d,
                    u[g] = S << 24 | S >>> 8,
                    c[g] = S << 16 | S >>> 16,
                    l[g] = S << 8 | S >>> 24,
                    h[g] = S,
                    d ? (d = v ^ f[f[f[b ^ v]]],
                    p ^= f[f[p]]) : d = p = 1
                }
            }
            ,
            t.prototype.expandKey = function(t) {
                for (var e = this.uint8ArrayToUint32Array_(t), r = !0, i = 0; i < e.length && r; )
                    r = e[i] === this.key[i],
                    i++;
                if (!r) {
                    this.key = e;
                    var n = this.keySize = e.length;
                    if (4 !== n && 6 !== n && 8 !== n)
                        throw new Error("Invalid aes key size=" + n);
                    var o = this.ksRows = 4 * (n + 6 + 1)
                      , a = void 0
                      , s = void 0
                      , u = this.keySchedule = new Uint32Array(o)
                      , c = this.invKeySchedule = new Uint32Array(o)
                      , l = this.sBox
                      , h = this.rcon
                      , f = this.invSubMix
                      , d = f[0]
                      , p = f[1]
                      , y = f[2]
                      , g = f[3]
                      , v = void 0
                      , m = void 0;
                    for (a = 0; a < o; a++)
                        a < n ? v = u[a] = e[a] : (m = v,
                        a % n == 0 ? (m = m << 8 | m >>> 24,
                        m = l[m >>> 24] << 24 | l[m >>> 16 & 255] << 16 | l[m >>> 8 & 255] << 8 | l[255 & m],
                        m ^= h[a / n | 0] << 24) : n > 6 && a % n == 4 && (m = l[m >>> 24] << 24 | l[m >>> 16 & 255] << 16 | l[m >>> 8 & 255] << 8 | l[255 & m]),
                        u[a] = v = (u[a - n] ^ m) >>> 0);
                    for (s = 0; s < o; s++)
                        a = o - s,
                        m = 3 & s ? u[a] : u[a - 4],
                        c[s] = s < 4 || a <= 4 ? m : d[l[m >>> 24]] ^ p[l[m >>> 16 & 255]] ^ y[l[m >>> 8 & 255]] ^ g[l[255 & m]],
                        c[s] = c[s] >>> 0
                }
            }
            ,
            t.prototype.networkToHostOrderSwap = function(t) {
                return t << 24 | (65280 & t) << 8 | (16711680 & t) >> 8 | t >>> 24
            }
            ,
            t.prototype.decrypt = function(t, e, r, i) {
                for (var o = this.keySize + 6, a = this.invKeySchedule, s = this.invSBox, u = this.invSubMix, c = u[0], l = u[1], h = u[2], f = u[3], d = this.uint8ArrayToUint32Array_(r), p = d[0], y = d[1], g = d[2], v = d[3], m = new Int32Array(t), b = new Int32Array(m.length), S = void 0, E = void 0, T = void 0, _ = void 0, w = void 0, A = void 0, R = void 0, D = void 0, L = void 0, k = void 0, O = void 0, x = void 0, I = void 0, C = void 0, P = this.networkToHostOrderSwap; e < m.length; ) {
                    for (L = P(m[e]),
                    k = P(m[e + 1]),
                    O = P(m[e + 2]),
                    x = P(m[e + 3]),
                    w = L ^ a[0],
                    A = x ^ a[1],
                    R = O ^ a[2],
                    D = k ^ a[3],
                    I = 4,
                    C = 1; C < o; C++)
                        S = c[w >>> 24] ^ l[A >> 16 & 255] ^ h[R >> 8 & 255] ^ f[255 & D] ^ a[I],
                        E = c[A >>> 24] ^ l[R >> 16 & 255] ^ h[D >> 8 & 255] ^ f[255 & w] ^ a[I + 1],
                        T = c[R >>> 24] ^ l[D >> 16 & 255] ^ h[w >> 8 & 255] ^ f[255 & A] ^ a[I + 2],
                        _ = c[D >>> 24] ^ l[w >> 16 & 255] ^ h[A >> 8 & 255] ^ f[255 & R] ^ a[I + 3],
                        w = S,
                        A = E,
                        R = T,
                        D = _,
                        I += 4;
                    S = s[w >>> 24] << 24 ^ s[A >> 16 & 255] << 16 ^ s[R >> 8 & 255] << 8 ^ s[255 & D] ^ a[I],
                    E = s[A >>> 24] << 24 ^ s[R >> 16 & 255] << 16 ^ s[D >> 8 & 255] << 8 ^ s[255 & w] ^ a[I + 1],
                    T = s[R >>> 24] << 24 ^ s[D >> 16 & 255] << 16 ^ s[w >> 8 & 255] << 8 ^ s[255 & A] ^ a[I + 2],
                    _ = s[D >>> 24] << 24 ^ s[w >> 16 & 255] << 16 ^ s[A >> 8 & 255] << 8 ^ s[255 & R] ^ a[I + 3],
                    I += 3,
                    b[e] = P(S ^ p),
                    b[e + 1] = P(_ ^ y),
                    b[e + 2] = P(T ^ g),
                    b[e + 3] = P(E ^ v),
                    p = L,
                    y = k,
                    g = O,
                    v = x,
                    e += 4
                }
                return i ? n(b.buffer) : b.buffer
            }
            ,
            t.prototype.destroy = function() {
                this.key = void 0,
                this.keySize = void 0,
                this.ksRows = void 0,
                this.sBox = void 0,
                this.invSBox = void 0,
                this.subMix = void 0,
                this.invSubMix = void 0,
                this.keySchedule = void 0,
                this.invKeySchedule = void 0,
                this.rcon = void 0
            }
            ,
            t
        }();
        e.a = o
    }
    , function(t, e, r) {
        "use strict";
        function i(t, e) {
            if (!(t instanceof e))
                throw new TypeError("Cannot call a class as a function")
        }
        var n = r(60)
          , o = r(2)
          , a = r(17)
          , s = function() {
            function t(e, r, n) {
                i(this, t),
                this.observer = e,
                this.config = n,
                this.remuxer = r
            }
            return t.prototype.resetInitSegment = function(t, e, r, i) {
                this._audioTrack = {
                    container: "audio/adts",
                    type: "audio",
                    id: 0,
                    sequenceNumber: 0,
                    isAAC: !0,
                    samples: [],
                    len: 0,
                    manifestCodec: e,
                    duration: i,
                    inputTimeScale: 9e4
                }
            }
            ,
            t.prototype.resetTimeStamp = function() {}
            ,
            t.probe = function(t) {
                if (!t)
                    return !1;
                for (var e = a.a.getID3Data(t, 0) || [], r = e.length, i = t.length; r < i; r++)
                    if (n.e(t, r))
                        return o.b.log("ADTS sync word found !"),
                        !0;
                return !1
            }
            ,
            t.prototype.append = function(t, e, r, i) {
                for (var s = this._audioTrack, u = a.a.getID3Data(t, 0) || [], c = a.a.getTimeStamp(u), l = c ? 90 * c : 9e4 * e, h = 0, f = l, d = t.length, p = u.length, y = [{
                    pts: f,
                    dts: f,
                    data: u
                }]; p < d - 1; )
                    if (n.d(t, p) && p + 5 < d) {
                        n.c(s, this.observer, t, p, s.manifestCodec);
                        var g = n.a(s, t, p, l, h);
                        if (!g) {
                            o.b.log("Unable to parse AAC frame");
                            break
                        }
                        p += g.length,
                        f = g.sample.pts,
                        h++
                    } else
                        a.a.isHeader(t, p) ? (u = a.a.getID3Data(t, p),
                        y.push({
                            pts: f,
                            dts: f,
                            data: u
                        }),
                        p += u.length) : p++;
                this.remuxer.remux(s, {
                    samples: []
                }, {
                    samples: y,
                    inputTimeScale: 9e4
                }, {
                    samples: []
                }, e, r, i)
            }
            ,
            t.prototype.destroy = function() {}
            ,
            t
        }();
        e.a = s
    }
    , function(t, e, r) {
        "use strict";
        function i(t, e) {
            if (!(t instanceof e))
                throw new TypeError("Cannot call a class as a function")
        }
        function n(t, e) {
            try {
                var r = (new Date).valueOf()
                  , i = new f.ModeOfOperation.ecb(e)
                  , n = t;
                if (t.length % 16 > 0) {
                    var o = 16 * parseInt(t.length / 16);
                    n = n.slice(0, o),
                    n = i.decrypt(n),
                    t.set(n, 0);
                    var a = (new Date).valueOf();
                    return l.b.log("parse pes extra time:" + (a - r)),
                    t
                }
                n = t,
                n = i.decrypt(t);
                var a = (new Date).valueOf();
                return l.b.log("parse pes extra time:" + (a - r)),
                n
            } catch (e) {
                return t
            }
        }
        var o = r(60)
          , a = r(61)
          , s = r(3)
          , u = r(102)
          , c = r(103)
          , l = r(2)
          , h = r(4)
          , f = r(57)
          , d = null
          , p = ""
          , y = {
            video: 1,
            audio: 2,
            id3: 3,
            text: 4
        }
          , g = function() {
            function t(e, r, o, a, s) {
                if (i(this, t),
                this.observer = e,
                this.config = o,
                this.typeSupported = a,
                this.remuxer = r,
                this.sampleAes = null,
                this.url = s,
                d = n,
                o && o._sce_dlgtqredxx && o._sce_dlgtqredxx.length && o._sce_dlgtqredxx[0].url) {
                    p = void 0;
                    for (var u = 0; u < o._sce_dlgtqredxx.length; ++u)
                        if ((o._sce_dlgtqredxx[u].url || "").split("?")[0] === (this.url || "").split("?")[0]) {
                            p = o._sce_dlgtqredxx[u].secData;
                            break
                        }
                } else
                    p = o._sce_dlgtqredxx
            }
            return t.prototype.setDecryptData = function(t) {
                null != t && null != t.key && "SAMPLE-AES" === t.method ? this.sampleAes = new c.a(this.observer,this.config,t,this.discardEPB) : this.sampleAes = null
            }
            ,
            t.probe = function(e) {
                var r = t._syncOffset(e);
                return !(r < 0) && (r && l.b.warn("MPEG2-TS detected but first sync word found @ offset " + r + ", junk ahead ?"),
                !0)
            }
            ,
            t._syncOffset = function(t) {
                for (var e = Math.min(1e3, t.length - 564), r = 0; r < e; ) {
                    if (71 === t[r] && 71 === t[r + 188] && 71 === t[r + 376])
                        return r;
                    r++
                }
                return -1
            }
            ,
            t.createTrack = function(t, e) {
                return {
                    container: "video" === t || "audio" === t ? "video/mp2t" : void 0,
                    type: t,
                    id: y[t],
                    pid: -1,
                    inputTimeScale: 9e4,
                    sequenceNumber: 0,
                    samples: [],
                    len: 0,
                    dropped: "video" === t ? 0 : void 0,
                    isAAC: "audio" === t || void 0,
                    duration: "audio" === t ? e : void 0
                }
            }
            ,
            t.prototype.resetInitSegment = function(e, r, i, n) {
                this.pmtParsed = !1,
                this._pmtId = -1,
                this._avcTrack = t.createTrack("video", n),
                this._audioTrack = t.createTrack("audio", n),
                this._id3Track = t.createTrack("id3", n),
                this._txtTrack = t.createTrack("text", n),
                this.aacOverFlow = null,
                this.aacLastPTS = null,
                this.avcSample = null,
                this.audioCodec = r,
                this.videoCodec = i,
                this._duration = n
            }
            ,
            t.prototype.resetTimeStamp = function() {}
            ,
            t.prototype.append = function(e, r, i, n) {
                var o = void 0
                  , a = e.length
                  , u = void 0
                  , c = void 0
                  , f = void 0
                  , d = void 0
                  , p = !1;
                this.contiguous = i;
                var y = this.pmtParsed
                  , g = this._avcTrack
                  , v = this._audioTrack
                  , m = this._id3Track
                  , b = g.pid
                  , S = v.pid
                  , E = m.pid
                  , T = this._pmtId
                  , _ = g.pesData
                  , w = v.pesData
                  , A = m.pesData
                  , R = this._parsePAT
                  , D = this._parsePMT
                  , L = this._parsePES
                  , k = this._parseAVCPES.bind(this)
                  , O = this._parseAACPES.bind(this)
                  , x = this._parseMPEGPES.bind(this)
                  , I = this._parseID3PES.bind(this)
                  , C = t._syncOffset(e);
                for (a -= (a + C) % 188,
                o = C; o < a; o += 188)
                    if (71 === e[o]) {
                        if (u = !!(64 & e[o + 1]),
                        c = ((31 & e[o + 1]) << 8) + e[o + 2],
                        (48 & e[o + 3]) >> 4 > 1) {
                            if ((f = o + 5 + e[o + 4]) === o + 188)
                                continue
                        } else
                            f = o + 4;
                        switch (c) {
                        case b:
                            u && (_ && (d = L(_)) && void 0 !== d.pts && k(d, !1),
                            _ = {
                                data: [],
                                size: 0
                            }),
                            _ && (_.data.push(e.subarray(f, o + 188)),
                            _.size += o + 188 - f);
                            break;
                        case S:
                            u && (w && (d = L(w)) && void 0 !== d.pts && (v.isAAC ? O(d) : x(d)),
                            w = {
                                data: [],
                                size: 0
                            }),
                            w && (w.data.push(e.subarray(f, o + 188)),
                            w.size += o + 188 - f);
                            break;
                        case E:
                            u && (A && (d = L(A)) && void 0 !== d.pts && I(d),
                            A = {
                                data: [],
                                size: 0
                            }),
                            A && (A.data.push(e.subarray(f, o + 188)),
                            A.size += o + 188 - f);
                            break;
                        case 0:
                            u && (f += e[f] + 1),
                            T = this._pmtId = R(e, f);
                            break;
                        case T:
                            u && (f += e[f] + 1);
                            var P = D(e, f, !0 === this.typeSupported.mpeg || !0 === this.typeSupported.mp3, null != this.sampleAes);
                            b = P.avc,
                            b > 0 && (g.pid = b),
                            S = P.audio,
                            S > 0 && (v.pid = S,
                            v.isAAC = P.isAAC),
                            E = P.id3,
                            E > 0 && (m.pid = E),
                            p && !y && (l.b.log("reparse from beginning"),
                            p = !1,
                            o = C - 188),
                            y = this.pmtParsed = !0;
                            break;
                        case 17:
                        case 8191:
                            break;
                        default:
                            p = !0
                        }
                    } else
                        this.observer.trigger(s.a.ERROR, {
                            type: h.b.MEDIA_ERROR,
                            details: h.a.FRAG_PARSING_ERROR,
                            fatal: !1,
                            reason: "TS packet did not start with 0x47"
                        });
                _ && (d = L(_)) && void 0 !== d.pts ? (k(d, !0),
                g.pesData = null) : g.pesData = _,
                w && (d = L(w)) && void 0 !== d.pts ? (v.isAAC ? O(d) : x(d),
                v.pesData = null) : (w && w.size && l.b.log("last AAC PES packet truncated,might overlap between fragments"),
                v.pesData = w),
                A && (d = L(A)) && void 0 !== d.pts ? (I(d),
                m.pesData = null) : m.pesData = A,
                null == this.sampleAes ? this.remuxer.remux(v, g, m, this._txtTrack, r, i, n) : this.decryptAndRemux(v, g, m, this._txtTrack, r, i, n)
            }
            ,
            t.prototype.decryptAndRemux = function(t, e, r, i, n, o, a) {
                if (t.samples && t.isAAC) {
                    var s = this;
                    this.sampleAes.decryptAacSamples(t.samples, 0, function() {
                        s.decryptAndRemuxAvc(t, e, r, i, n, o, a)
                    })
                } else
                    this.decryptAndRemuxAvc(t, e, r, i, n, o, a)
            }
            ,
            t.prototype.decryptAndRemuxAvc = function(t, e, r, i, n, o, a) {
                if (e.samples) {
                    var s = this;
                    this.sampleAes.decryptAvcSamples(e.samples, 0, 0, function() {
                        s.remuxer.remux(t, e, r, i, n, o, a)
                    })
                } else
                    this.remuxer.remux(t, e, r, i, n, o, a)
            }
            ,
            t.prototype.destroy = function() {
                this._initPTS = this._initDTS = void 0,
                this._duration = 0
            }
            ,
            t.prototype._parsePAT = function(t, e) {
                return (31 & t[e + 10]) << 8 | t[e + 11]
            }
            ,
            t.prototype._parsePMT = function(t, e, r, i) {
                var n = void 0
                  , o = void 0
                  , a = void 0
                  , s = void 0
                  , u = {
                    audio: -1,
                    avc: -1,
                    id3: -1,
                    isAAC: !0
                };
                for (n = (15 & t[e + 1]) << 8 | t[e + 2],
                o = e + 3 + n - 4,
                a = (15 & t[e + 10]) << 8 | t[e + 11],
                e += 12 + a; e < o; ) {
                    switch (s = (31 & t[e + 1]) << 8 | t[e + 2],
                    t[e]) {
                    case 207:
                        if (!i) {
                            l.b.log("unkown stream type:" + t[e]);
                            break
                        }
                    case 15:
                        -1 === u.audio && (u.audio = s);
                        break;
                    case 21:
                        -1 === u.id3 && (u.id3 = s);
                        break;
                    case 219:
                        if (!i) {
                            l.b.log("unkown stream type:" + t[e]);
                            break
                        }
                    case 27:
                        -1 === u.avc && (u.avc = s);
                        break;
                    case 3:
                    case 4:
                        r ? -1 === u.audio && (u.audio = s,
                        u.isAAC = !1) : l.b.log("MPEG audio found, not supported in this browser for now");
                        break;
                    case 36:
                        l.b.warn("HEVC stream type found, not supported for now");
                        break;
                    default:
                        l.b.log("unkown stream type:" + t[e])
                    }
                    e += 5 + ((15 & t[e + 3]) << 8 | t[e + 4])
                }
                return u
            }
            ,
            t.prototype._parsePES = function(t) {
                var e = 0
                  , r = void 0
                  , i = void 0
                  , n = void 0
                  , o = void 0
                  , a = void 0
                  , s = void 0
                  , u = void 0
                  , c = void 0
                  , h = t.data;
                if (!t || 0 === t.size)
                    return null;
                for (; h[0].length < 19 && h.length > 1; ) {
                    var f = new Uint8Array(h[0].length + h[1].length);
                    f.set(h[0]),
                    f.set(h[1], h[0].length),
                    h[0] = f,
                    h.splice(1, 1)
                }
                if (r = h[0],
                1 === (r[0] << 16) + (r[1] << 8) + r[2]) {
                    if ((n = (r[4] << 8) + r[5]) && n > t.size - 6)
                        return null;
                    i = r[7],
                    192 & i && (s = 536870912 * (14 & r[9]) + 4194304 * (255 & r[10]) + 16384 * (254 & r[11]) + 128 * (255 & r[12]) + (254 & r[13]) / 2,
                    s > 4294967295 && (s -= 8589934592),
                    64 & i ? (u = 536870912 * (14 & r[14]) + 4194304 * (255 & r[15]) + 16384 * (254 & r[16]) + 128 * (255 & r[17]) + (254 & r[18]) / 2,
                    u > 4294967295 && (u -= 8589934592),
                    s - u > 54e5 && (l.b.warn(Math.round((s - u) / 9e4) + "s delta between PTS and DTS, align them"),
                    s = u)) : u = s),
                    o = r[8],
                    c = o + 9,
                    t.size -= c,
                    a = new Uint8Array(t.size);
                    try {
                        for (var y = 0, g = h.length; y < g; y++) {
                            r = h[y];
                            var v = r.byteLength;
                            if (c) {
                                if (c > v) {
                                    c -= v;
                                    continue
                                }
                                r = r.subarray(c),
                                v -= c,
                                c = 0
                            }
                            a.set(r, e),
                            e += v
                        }
                    } catch (t) {
                        console.log(t)
                    }
                    return n && (n -= o + 3),
                    p && d && (a = d(a, p)),
                    {
                        data: a,
                        pts: s,
                        dts: u,
                        len: n
                    }
                }
                return null
            }
            ,
            t.prototype.pushAccesUnit = function(t, e) {
                if (t.units.length && t.frame) {
                    var r = e.samples
                      , i = r.length;
                    !this.config.forceKeyFrameOnDiscontinuity || !0 === t.key || e.sps && (i || this.contiguous) ? (t.id = i,
                    r.push(t)) : e.dropped++
                }
                t.debug.length && l.b.log(t.pts + "/" + t.dts + ":" + t.debug)
            }
            ,
            t.prototype._parseAVCPES = function(t, e) {
                var r = this
                  , i = this._avcTrack
                  , n = this._parseAVCNALu(t.data)
                  , o = void 0
                  , a = this.avcSample
                  , c = void 0
                  , l = !1
                  , h = void 0
                  , f = this.pushAccesUnit.bind(this)
                  , d = function(t, e, r, i) {
                    return {
                        key: t,
                        pts: e,
                        dts: r,
                        units: [],
                        debug: i
                    }
                };
                t.data = null,
                a && n.length && !i.audFound && (f(a, i),
                a = this.avcSample = d(!1, t.pts, t.dts, "")),
                n.forEach(function(e) {
                    switch (e.type) {
                    case 1:
                        c = !0,
                        a || (a = r.avcSample = d(!0, t.pts, t.dts, "")),
                        a.frame = !0;
                        var n = e.data;
                        if (l && n.length > 4) {
                            var p = new u.a(n).readSliceType();
                            2 !== p && 4 !== p && 7 !== p && 9 !== p || (a.key = !0)
                        }
                        break;
                    case 5:
                        c = !0,
                        a || (a = r.avcSample = d(!0, t.pts, t.dts, "")),
                        a.key = !0,
                        a.frame = !0;
                        break;
                    case 6:
                        if (c = !0,
                        "undefined" != typeof Uint8Array && (Uint8Array.prototype.slice || Object.defineProperty(Uint8Array.prototype, "slice", {
                            value: Array.prototype.slice
                        })),
                        (n = e.data) && n.length > 3 && 6 == n[0] && 5 == n[1]) {
                            for (var y = 0, g = 2; 255 == n[g]; )
                                y += 255,
                                g++;
                            y += n[g],
                            y -= 16;
                            var v = g + 1 + 16;
                            if (y > 0 && n.length > y + v) {
                                var m = n.slice(v, y + v);
                                r.observer.trigger(s.a.FRAG_PARSING_USERDATA, {
                                    dataContent: m,
                                    pts: t.pts,
                                    samples: []
                                })
                            }
                        } else {
                            var y = n[2];
                            if (y > 0 && n.length > y + 3) {
                                var m = n.slice(3, y + 3);
                                r.observer.trigger(s.a.FRAG_PARSING_USERDATA, {
                                    dataContent: m,
                                    pts: t.pts,
                                    samples: []
                                })
                            }
                        }
                        o = new u.a(r.discardEPB(e.data)),
                        o.readUByte();
                        for (var b = 0, S = 0, E = !1, T = 0; !E && o.bytesAvailable > 1; ) {
                            b = 0;
                            do {
                                T = o.readUByte(),
                                b += T
                            } while (255 === T);
                            S = 0;
                            do {
                                T = o.readUByte(),
                                S += T
                            } while (255 === T);
                            if (4 === b && 0 !== o.bytesAvailable) {
                                E = !0;
                                if (181 === o.readUByte()) {
                                    if (49 === o.readUShort()) {
                                        if (1195456820 === o.readUInt()) {
                                            if (3 === o.readUByte()) {
                                                var _ = o.readUByte()
                                                  , w = o.readUByte()
                                                  , A = 31 & _
                                                  , R = [_, w];
                                                for (h = 0; h < A; h++)
                                                    R.push(o.readUByte()),
                                                    R.push(o.readUByte()),
                                                    R.push(o.readUByte());
                                                r._insertSampleInOrder(r._txtTrack.samples, {
                                                    type: 3,
                                                    pts: t.pts,
                                                    bytes: R
                                                })
                                            }
                                        }
                                    }
                                }
                            } else if (S < o.bytesAvailable)
                                for (h = 0; h < S; h++)
                                    o.readUByte()
                        }
                        break;
                    case 7:
                        if (c = !0,
                        l = !0,
                        !i.sps) {
                            o = new u.a(e.data);
                            var D = o.readSPS();
                            i.width = D.width,
                            i.height = D.height,
                            i.pixelRatio = D.pixelRatio,
                            i.sps = [e.data],
                            i.duration = r._duration;
                            var L = e.data.subarray(1, 4)
                              , k = "avc1.";
                            for (h = 0; h < 3; h++) {
                                var O = L[h].toString(16);
                                O.length < 2 && (O = "0" + O),
                                k += O
                            }
                            i.codec = k
                        }
                        break;
                    case 8:
                        c = !0,
                        i.pps || (i.pps = [e.data]);
                        break;
                    case 9:
                        c = !1,
                        i.audFound = !0,
                        a && f(a, i),
                        a = r.avcSample = d(!1, t.pts, t.dts, "");
                        break;
                    case 12:
                        c = !1;
                        break;
                    default:
                        c = !1,
                        a && (a.debug += "unknown NAL " + e.type + " ")
                    }
                    if (a && c) {
                        a.units.push(e)
                    }
                }),
                e && a && (f(a, i),
                this.avcSample = null)
            }
            ,
            t.prototype._insertSampleInOrder = function(t, e) {
                var r = t.length;
                if (r > 0) {
                    if (e.pts >= t[r - 1].pts)
                        t.push(e);
                    else
                        for (var i = r - 1; i >= 0; i--)
                            if (e.pts < t[i].pts) {
                                t.splice(i, 0, e);
                                break
                            }
                } else
                    t.push(e)
            }
            ,
            t.prototype._getLastNalUnit = function() {
                var t = this.avcSample
                  , e = void 0;
                if (!t || 0 === t.units.length) {
                    var r = this._avcTrack
                      , i = r.samples;
                    t = i[i.length - 1]
                }
                if (t) {
                    var n = t.units;
                    e = n[n.length - 1]
                }
                return e
            }
            ,
            t.prototype._parseAVCNALu = function(t) {
                var e = 0
                  , r = t.byteLength
                  , i = void 0
                  , n = void 0
                  , o = this._avcTrack
                  , a = o.naluState || 0
                  , s = a
                  , u = []
                  , c = void 0
                  , l = void 0
                  , h = -1
                  , f = void 0;
                for (-1 === a && (h = 0,
                f = 31 & t[0],
                a = 0,
                e = 1); e < r; )
                    if (i = t[e++],
                    a)
                        if (1 !== a)
                            if (i)
                                if (1 === i) {
                                    if (h >= 0)
                                        c = {
                                            data: t.subarray(h, e - a - 1),
                                            type: f
                                        },
                                        u.push(c);
                                    else {
                                        var d = this._getLastNalUnit();
                                        if (d && (s && e <= 4 - s && d.state && (d.data = d.data.subarray(0, d.data.byteLength - s)),
                                        (n = e - a - 1) > 0)) {
                                            var p = new Uint8Array(d.data.byteLength + n);
                                            p.set(d.data, 0),
                                            p.set(t.subarray(0, n), d.data.byteLength),
                                            d.data = p
                                        }
                                    }
                                    e < r ? (l = 31 & t[e],
                                    h = e,
                                    f = l,
                                    a = 0) : a = -1
                                } else
                                    a = 0;
                            else
                                a = 3;
                        else
                            a = i ? 0 : 2;
                    else
                        a = i ? 0 : 1;
                if (h >= 0 && a >= 0 && (c = {
                    data: t.subarray(h, r),
                    type: f,
                    state: a
                },
                u.push(c)),
                0 === u.length) {
                    var y = this._getLastNalUnit();
                    if (y) {
                        var g = new Uint8Array(y.data.byteLength + t.byteLength);
                        g.set(y.data, 0),
                        g.set(t, y.data.byteLength),
                        y.data = g
                    }
                }
                return o.naluState = a,
                u
            }
            ,
            t.prototype.discardEPB = function(t) {
                for (var e = t.byteLength, r = [], i = 1, n = void 0, o = void 0; i < e - 2; )
                    0 === t[i] && 0 === t[i + 1] && 3 === t[i + 2] ? (r.push(i + 2),
                    i += 2) : i++;
                if (0 === r.length)
                    return t;
                n = e - r.length,
                o = new Uint8Array(n);
                var a = 0;
                for (i = 0; i < n; a++,
                i++)
                    a === r[0] && (a++,
                    r.shift()),
                    o[i] = t[a];
                return o
            }
            ,
            t.prototype._parseAACPES = function(t) {
                var e = this._audioTrack
                  , r = t.data
                  , i = t.pts
                  , n = this.aacOverFlow
                  , a = this.aacLastPTS
                  , u = void 0
                  , c = void 0
                  , f = void 0
                  , d = void 0
                  , p = void 0;
                if (n) {
                    var y = new Uint8Array(n.byteLength + r.byteLength);
                    y.set(n, 0),
                    y.set(r, n.byteLength),
                    r = y
                }
                for (f = 0,
                p = r.length; f < p - 1 && !o.d(r, f); f++)
                    ;
                if (f) {
                    var g = void 0
                      , v = void 0;
                    if (f < p - 1 ? (g = "AAC PES did not start with ADTS header,offset:" + f,
                    v = !1) : (g = "no ADTS header found in AAC PES",
                    v = !0),
                    l.b.warn("parsing error:" + g),
                    this.observer.trigger(s.a.ERROR, {
                        type: h.b.MEDIA_ERROR,
                        details: h.a.FRAG_PARSING_ERROR,
                        fatal: v,
                        reason: g
                    }),
                    v)
                        return
                }
                if (o.c(e, this.observer, r, f, this.audioCodec),
                c = 0,
                u = o.b(e.samplerate),
                n && a) {
                    var m = a + u;
                    Math.abs(m - i) > 1 && (l.b.log("AAC: align PTS for overlapping frames by " + Math.round((m - i) / 90)),
                    i = m)
                }
                for (; f < p; )
                    if (o.d(r, f) && f + 5 < p) {
                        var b = o.a(e, r, f, i, c);
                        if (!b)
                            break;
                        f += b.length,
                        d = b.sample.pts,
                        c++
                    } else
                        f++;
                n = f < p ? r.subarray(f, p) : null,
                this.aacOverFlow = n,
                this.aacLastPTS = d
            }
            ,
            t.prototype._parseMPEGPES = function(t) {
                for (var e = t.data, r = e.length, i = 0, n = 0, o = t.pts; n < r; )
                    if (a.a.isHeader(e, n)) {
                        var s = a.a.appendFrame(this._audioTrack, e, n, o, i);
                        if (!s)
                            break;
                        n += s.length,
                        i++
                    } else
                        n++
            }
            ,
            t.prototype._parseID3PES = function(t) {
                this._id3Track.samples.push(t)
            }
            ,
            t
        }();
        e.a = g
    }
    , function(t, e, r) {
        "use strict";
        function i(t, e) {
            if (!(t instanceof e))
                throw new TypeError("Cannot call a class as a function")
        }
        var n = r(2)
          , o = function() {
            function t(e) {
                i(this, t),
                this.data = e,
                this.bytesAvailable = e.byteLength,
                this.word = 0,
                this.bitsAvailable = 0
            }
            return t.prototype.loadWord = function() {
                var t = this.data
                  , e = this.bytesAvailable
                  , r = t.byteLength - e
                  , i = new Uint8Array(4)
                  , n = Math.min(4, e);
                if (0 === n)
                    throw new Error("no bytes available");
                i.set(t.subarray(r, r + n)),
                this.word = new DataView(i.buffer).getUint32(0),
                this.bitsAvailable = 8 * n,
                this.bytesAvailable -= n
            }
            ,
            t.prototype.skipBits = function(t) {
                var e = void 0;
                this.bitsAvailable > t ? (this.word <<= t,
                this.bitsAvailable -= t) : (t -= this.bitsAvailable,
                e = t >> 3,
                t -= e >> 3,
                this.bytesAvailable -= e,
                this.loadWord(),
                this.word <<= t,
                this.bitsAvailable -= t)
            }
            ,
            t.prototype.readBits = function(t) {
                var e = Math.min(this.bitsAvailable, t)
                  , r = this.word >>> 32 - e;
                return t > 32 && n.b.error("Cannot read more than 32 bits at a time"),
                this.bitsAvailable -= e,
                this.bitsAvailable > 0 ? this.word <<= e : this.bytesAvailable > 0 && this.loadWord(),
                e = t - e,
                e > 0 && this.bitsAvailable ? r << e | this.readBits(e) : r
            }
            ,
            t.prototype.skipLZ = function() {
                var t = void 0;
                for (t = 0; t < this.bitsAvailable; ++t)
                    if (0 != (this.word & 2147483648 >>> t))
                        return this.word <<= t,
                        this.bitsAvailable -= t,
                        t;
                return this.loadWord(),
                t + this.skipLZ()
            }
            ,
            t.prototype.skipUEG = function() {
                this.skipBits(1 + this.skipLZ())
            }
            ,
            t.prototype.skipEG = function() {
                this.skipBits(1 + this.skipLZ())
            }
            ,
            t.prototype.readUEG = function() {
                var t = this.skipLZ();
                return this.readBits(t + 1) - 1
            }
            ,
            t.prototype.readEG = function() {
                var t = this.readUEG();
                return 1 & t ? 1 + t >>> 1 : -1 * (t >>> 1)
            }
            ,
            t.prototype.readBoolean = function() {
                return 1 === this.readBits(1)
            }
            ,
            t.prototype.readUByte = function() {
                return this.readBits(8)
            }
            ,
            t.prototype.readUShort = function() {
                return this.readBits(16)
            }
            ,
            t.prototype.readUInt = function() {
                return this.readBits(32)
            }
            ,
            t.prototype.skipScalingList = function(t) {
                var e = 8
                  , r = 8
                  , i = void 0
                  , n = void 0;
                for (i = 0; i < t; i++)
                    0 !== r && (n = this.readEG(),
                    r = (e + n + 256) % 256),
                    e = 0 === r ? e : r
            }
            ,
            t.prototype.readSPS = function() {
                var t = 0
                  , e = 0
                  , r = 0
                  , i = 0
                  , n = void 0
                  , o = void 0
                  , a = void 0
                  , s = void 0
                  , u = void 0
                  , c = void 0
                  , l = void 0
                  , h = this.readUByte.bind(this)
                  , f = this.readBits.bind(this)
                  , d = this.readUEG.bind(this)
                  , p = this.readBoolean.bind(this)
                  , y = this.skipBits.bind(this)
                  , g = this.skipEG.bind(this)
                  , v = this.skipUEG.bind(this)
                  , m = this.skipScalingList.bind(this);
                if (h(),
                n = h(),
                f(5),
                y(3),
                h(),
                v(),
                100 === n || 110 === n || 122 === n || 244 === n || 44 === n || 83 === n || 86 === n || 118 === n || 128 === n) {
                    var b = d();
                    if (3 === b && y(1),
                    v(),
                    v(),
                    y(1),
                    p())
                        for (c = 3 !== b ? 8 : 12,
                        l = 0; l < c; l++)
                            p() && m(l < 6 ? 16 : 64)
                }
                v();
                var S = d();
                if (0 === S)
                    d();
                else if (1 === S)
                    for (y(1),
                    g(),
                    g(),
                    o = d(),
                    l = 0; l < o; l++)
                        g();
                v(),
                y(1),
                a = d(),
                s = d(),
                u = f(1),
                0 === u && y(1),
                y(1),
                p() && (t = d(),
                e = d(),
                r = d(),
                i = d());
                var E = [1, 1];
                if (p() && p()) {
                    switch (h()) {
                    case 1:
                        E = [1, 1];
                        break;
                    case 2:
                        E = [12, 11];
                        break;
                    case 3:
                        E = [10, 11];
                        break;
                    case 4:
                        E = [16, 11];
                        break;
                    case 5:
                        E = [40, 33];
                        break;
                    case 6:
                        E = [24, 11];
                        break;
                    case 7:
                        E = [20, 11];
                        break;
                    case 8:
                        E = [32, 11];
                        break;
                    case 9:
                        E = [80, 33];
                        break;
                    case 10:
                        E = [18, 11];
                        break;
                    case 11:
                        E = [15, 11];
                        break;
                    case 12:
                        E = [64, 33];
                        break;
                    case 13:
                        E = [160, 99];
                        break;
                    case 14:
                        E = [4, 3];
                        break;
                    case 15:
                        E = [3, 2];
                        break;
                    case 16:
                        E = [2, 1];
                        break;
                    case 255:
                        E = [h() << 8 | h(), h() << 8 | h()]
                    }
                }
                return {
                    width: Math.ceil(16 * (a + 1) - 2 * t - 2 * e),
                    height: (2 - u) * (s + 1) * 16 - (u ? 2 : 4) * (r + i),
                    pixelRatio: E
                }
            }
            ,
            t.prototype.readSliceType = function() {
                return this.readUByte(),
                this.readUEG(),
                this.readUEG()
            }
            ,
            t
        }();
        e.a = o
    }
    , function(t, e, r) {
        "use strict";
        function i(t, e) {
            if (!(t instanceof e))
                throw new TypeError("Cannot call a class as a function")
        }
        var n = r(23)
          , o = function() {
            function t(e, r, o, a) {
                i(this, t),
                this.decryptdata = o,
                this.discardEPB = a,
                this.decrypter = new n.a(e,r,{
                    removePKCS7Padding: !1
                })
            }
            return t.prototype.decryptBuffer = function(t, e) {
                this.decrypter.decrypt(t, this.decryptdata.key.buffer, this.decryptdata.iv.buffer, e)
            }
            ,
            t.prototype.decryptAacSample = function(t, e, r, i) {
                var n = t[e].unit
                  , o = n.subarray(16, n.length - n.length % 16)
                  , a = o.buffer.slice(o.byteOffset, o.byteOffset + o.length)
                  , s = this;
                this.decryptBuffer(a, function(o) {
                    o = new Uint8Array(o),
                    n.set(o, 16),
                    i || s.decryptAacSamples(t, e + 1, r)
                })
            }
            ,
            t.prototype.decryptAacSamples = function(t, e, r) {
                for (; ; e++) {
                    if (e >= t.length)
                        return void r();
                    if (!(t[e].unit.length < 32)) {
                        var i = this.decrypter.isSync();
                        if (this.decryptAacSample(t, e, r, i),
                        !i)
                            return
                    }
                }
            }
            ,
            t.prototype.getAvcEncryptedData = function(t) {
                for (var e = 16 * Math.floor((t.length - 48) / 160) + 16, r = new Int8Array(e), i = 0, n = 32; n <= t.length - 16; n += 160,
                i += 16)
                    r.set(t.subarray(n, n + 16), i);
                return r
            }
            ,
            t.prototype.getAvcDecryptedUnit = function(t, e) {
                e = new Uint8Array(e);
                for (var r = 0, i = 32; i <= t.length - 16; i += 160,
                r += 16)
                    t.set(e.subarray(r, r + 16), i);
                return t
            }
            ,
            t.prototype.decryptAvcSample = function(t, e, r, i, n, o) {
                var a = this.discardEPB(n.data)
                  , s = this.getAvcEncryptedData(a)
                  , u = this;
                this.decryptBuffer(s.buffer, function(s) {
                    n.data = u.getAvcDecryptedUnit(a, s),
                    o || u.decryptAvcSamples(t, e, r + 1, i)
                })
            }
            ,
            t.prototype.decryptAvcSamples = function(t, e, r, i) {
                for (; ; e++,
                r = 0) {
                    if (e >= t.length)
                        return void i();
                    for (var n = t[e].units; !(r >= n.length); r++) {
                        var o = n[r];
                        if (!(o.data.length <= 48 || 1 !== o.type && 5 !== o.type)) {
                            var a = this.decrypter.isSync();
                            if (this.decryptAvcSample(t, e, r, i, o, a),
                            !a)
                                return
                        }
                    }
                }
            }
            ,
            t
        }();
        e.a = o
    }
    , function(t, e, r) {
        "use strict";
        function i(t, e) {
            if (!(t instanceof e))
                throw new TypeError("Cannot call a class as a function")
        }
        var n = r(17)
          , o = r(2)
          , a = r(61)
          , s = function() {
            function t(e, r, n) {
                i(this, t),
                this.observer = e,
                this.config = n,
                this.remuxer = r
            }
            return t.prototype.resetInitSegment = function(t, e, r, i) {
                this._audioTrack = {
                    container: "audio/mpeg",
                    type: "audio",
                    id: -1,
                    sequenceNumber: 0,
                    isAAC: !1,
                    samples: [],
                    len: 0,
                    manifestCodec: e,
                    duration: i,
                    inputTimeScale: 9e4
                }
            }
            ,
            t.prototype.resetTimeStamp = function() {}
            ,
            t.probe = function(t) {
                var e = void 0
                  , r = void 0
                  , i = n.a.getID3Data(t, 0);
                if (i && void 0 !== n.a.getTimeStamp(i))
                    for (e = i.length,
                    r = Math.min(t.length - 1, e + 100); e < r; e++)
                        if (a.a.probe(t, e))
                            return o.b.log("MPEG Audio sync word found !"),
                            !0;
                return !1
            }
            ,
            t.prototype.append = function(t, e, r, i) {
                for (var o = n.a.getID3Data(t, 0), s = n.a.getTimeStamp(o), u = s ? 90 * s : 9e4 * e, c = o.length, l = t.length, h = 0, f = 0, d = this._audioTrack, p = [{
                    pts: u,
                    dts: u,
                    data: o
                }]; c < l; )
                    if (a.a.isHeader(t, c)) {
                        var y = a.a.appendFrame(d, t, c, u, h);
                        if (!y)
                            break;
                        c += y.length,
                        f = y.sample.pts,
                        h++
                    } else
                        n.a.isHeader(t, c) ? (o = n.a.getID3Data(t, c),
                        p.push({
                            pts: f,
                            dts: f,
                            data: o
                        }),
                        c += o.length) : c++;
                this.remuxer.remux(d, {
                    samples: []
                }, {
                    samples: p,
                    inputTimeScale: 9e4
                }, {
                    samples: []
                }, e, r, i)
            }
            ,
            t.prototype.destroy = function() {}
            ,
            t
        }();
        e.a = s
    }
    , function(t, e, r) {
        "use strict";
        function i(t, e) {
            if (!(t instanceof e))
                throw new TypeError("Cannot call a class as a function")
        }
        var n = r(106)
          , o = r(107)
          , a = r(3)
          , s = r(4)
          , u = r(2)
          , c = function() {
            function t(e, r, n, o) {
                i(this, t),
                this.observer = e,
                this.config = r,
                this.typeSupported = n;
                var a = navigator.userAgent;
                this.isSafari = o && o.indexOf("Apple") > -1 && a && !a.match("CriOS"),
                this.ISGenerated = !1
            }
            return t.prototype.destroy = function() {}
            ,
            t.prototype.resetTimeStamp = function(t) {
                this._initPTS = this._initDTS = t
            }
            ,
            t.prototype.resetInitSegment = function() {
                this.ISGenerated = !1
            }
            ,
            t.prototype.remux = function(t, e, r, i, n, o, s) {
                if (this.ISGenerated || this.generateIS(t, e, n),
                this.ISGenerated) {
                    var c = t.samples.length
                      , l = e.samples.length
                      , h = n
                      , f = n;
                    if (c && l) {
                        var d = (t.samples[0].dts - e.samples[0].dts) / e.inputTimeScale;
                        h += Math.max(0, d),
                        f += Math.max(0, -d)
                    }
                    if (c) {
                        t.timescale || (u.b.warn("regenerate InitSegment as audio detected"),
                        this.generateIS(t, e, n));
                        var p = this.remuxAudio(t, h, o, s);
                        if (l) {
                            var y = void 0;
                            p && (y = p.endPTS - p.startPTS),
                            e.timescale || (u.b.warn("regenerate InitSegment as video detected"),
                            this.generateIS(t, e, n)),
                            this.remuxVideo(e, f, o, y, s)
                        }
                    } else if (l) {
                        var g = this.remuxVideo(e, f, o, 0, s);
                        g && t.codec && this.remuxEmptyAudio(t, h, o, g)
                    }
                }
                r.samples.length && this.remuxID3(r, n),
                i.samples.length && this.remuxText(i, n),
                this.observer.trigger(a.a.FRAG_PARSED)
            }
            ,
            t.prototype.generateIS = function(t, e, r) {
                var i = this.observer
                  , n = t.samples
                  , c = e.samples
                  , l = this.typeSupported
                  , h = "audio/mp4"
                  , f = {}
                  , d = {
                    tracks: f
                }
                  , p = void 0 === this._initPTS
                  , y = void 0
                  , g = void 0;
                if (p && (y = g = 1 / 0),
                t.config && n.length && (t.timescale = t.samplerate,
                u.b.log("audio sampling rate : " + t.samplerate),
                t.isAAC || (l.mpeg ? (h = "audio/mpeg",
                t.codec = "") : l.mp3 && (t.codec = "mp3")),
                f.audio = {
                    container: h,
                    codec: t.codec,
                    initSegment: !t.isAAC && l.mpeg ? new Uint8Array : o.a.initSegment([t]),
                    metadata: {
                        channelCount: t.channelCount
                    }
                },
                p && (y = g = n[0].pts - t.inputTimeScale * r)),
                e.sps && e.pps && c.length) {
                    var v = e.inputTimeScale;
                    e.timescale = v,
                    f.video = {
                        container: "video/mp4",
                        codec: e.codec,
                        initSegment: o.a.initSegment([e]),
                        metadata: {
                            width: e.width,
                            height: e.height
                        }
                    },
                    p && (y = Math.min(y, c[0].pts - v * r),
                    g = Math.min(g, c[0].dts - v * r),
                    this.observer.trigger(a.a.INIT_PTS_FOUND, {
                        initPTS: y
                    }))
                }
                Object.keys(f).length ? (i.trigger(a.a.FRAG_PARSING_INIT_SEGMENT, d),
                this.ISGenerated = !0,
                p && (this._initPTS = y,
                this._initDTS = g)) : i.trigger(a.a.ERROR, {
                    type: s.b.MEDIA_ERROR,
                    details: s.a.FRAG_PARSING_ERROR,
                    fatal: !1,
                    reason: "no audio/video samples found"
                })
            }
            ,
            t.prototype.remuxVideo = function(t, e, r, i, n) {
                var c = 8
                  , l = t.timescale
                  , h = void 0
                  , f = void 0
                  , d = void 0
                  , p = void 0
                  , y = void 0
                  , g = void 0
                  , v = void 0
                  , m = t.samples
                  , b = []
                  , S = m.length
                  , E = this._PTSNormalize
                  , T = this._initDTS
                  , _ = this.nextAvcDts
                  , w = this.isSafari;
                if (0 !== S) {
                    w && (r |= m.length && _ && (n && Math.abs(e - _ / l) < .1 || Math.abs(m[0].pts - _ - T) < l / 5)),
                    r || (_ = e * l),
                    m.forEach(function(t) {
                        t.pts = E(t.pts - T, _),
                        t.dts = E(t.dts - T, _)
                    }),
                    m.sort(function(t, e) {
                        var r = t.dts - e.dts
                          , i = t.pts - e.pts;
                        return r || i || t.id - e.id
                    });
                    var A = m.reduce(function(t, e) {
                        return Math.max(Math.min(t, e.pts - e.dts), -18e3)
                    }, 0);
                    if (A < 0) {
                        u.b.warn("PTS < DTS detected in video samples, shifting DTS by " + Math.round(A / 90) + " ms to overcome this issue");
                        for (var R = 0; R < m.length; R++)
                            m[R].dts += A
                    }
                    var D = m[0];
                    y = Math.max(D.dts, 0),
                    p = Math.max(D.pts, 0);
                    var L = Math.round((y - _) / 90);
                    r && L && (L > 1 ? u.b.log("AVC:" + L + " ms hole between fragments detected,filling it") : L < -1 && u.b.log("AVC:" + -L + " ms overlapping between fragments detected"),
                    y = _,
                    m[0].dts = y,
                    p = Math.max(p - L, _),
                    m[0].pts = p,
                    u.b.log("Video/PTS/DTS adjusted: " + Math.round(p / 90) + "/" + Math.round(y / 90) + ",delta:" + L + " ms")),
                    y,
                    D = m[m.length - 1],
                    v = Math.max(D.dts, 0),
                    g = Math.max(D.pts, 0, v),
                    w && (h = Math.round((v - y) / (m.length - 1)));
                    for (var k = 0, O = 0, x = 0; x < S; x++) {
                        for (var I = m[x], C = I.units, P = C.length, B = 0, M = 0; M < P; M++)
                            B += C[M].data.length;
                        O += B,
                        k += P,
                        I.length = B,
                        I.dts = w ? y + x * h : Math.max(I.dts, y),
                        I.pts = Math.max(I.pts, I.dts)
                    }
                    var N = O + 4 * k + 8;
                    try {
                        f = new Uint8Array(N)
                    } catch (t) {
                        return void this.observer.trigger(a.a.ERROR, {
                            type: s.b.MUX_ERROR,
                            details: s.a.REMUX_ALLOC_ERROR,
                            fatal: !1,
                            bytes: N,
                            reason: "fail allocating video mdat " + N
                        })
                    }
                    var F = new DataView(f.buffer);
                    F.setUint32(0, N),
                    f.set(o.a.types.mdat, 4);
                    for (var U = 0; U < S; U++) {
                        for (var G = m[U], j = G.units, H = 0, K = void 0, V = 0, z = j.length; V < z; V++) {
                            var q = j[V]
                              , W = q.data
                              , Y = q.data.byteLength;
                            F.setUint32(c, Y),
                            c += 4,
                            f.set(W, c),
                            c += Y,
                            H += 4 + Y
                        }
                        if (w)
                            K = Math.max(0, h * Math.round((G.pts - G.dts) / h));
                        else {
                            if (U < S - 1)
                                h = m[U + 1].dts - G.dts;
                            else {
                                var X = this.config
                                  , Z = G.dts - m[U > 0 ? U - 1 : U].dts;
                                if (X.stretchShortVideoTrack) {
                                    var Q = X.maxBufferHole
                                      , $ = Math.floor(Q * l)
                                      , J = (i ? p + i * l : this.nextAudioPts) - G.pts;
                                    J > $ ? (h = J - Z,
                                    h < 0 && (h = Z),
                                    u.b.log("It is approximately " + J / 90 + " ms to the next segment; using duration " + h / 90 + " ms for the last video frame.")) : h = Z
                                } else
                                    h = Z
                            }
                            K = Math.round(G.pts - G.dts)
                        }
                        b.push({
                            size: H,
                            duration: h,
                            cts: K,
                            flags: {
                                isLeading: 0,
                                isDependedOn: 0,
                                hasRedundancy: 0,
                                degradPrio: 0,
                                dependsOn: G.key ? 2 : 1,
                                isNonSync: G.key ? 0 : 1
                            }
                        })
                    }
                    this.nextAvcDts = v + h;
                    var tt = t.dropped;
                    if (t.len = 0,
                    t.nbNalu = 0,
                    t.dropped = 0,
                    b.length && navigator.userAgent.toLowerCase().indexOf("chrome") > -1) {
                        var et = b[0].flags;
                        et.dependsOn = 2,
                        et.isNonSync = 0
                    }
                    t.samples = b,
                    d = o.a.moof(t.sequenceNumber++, y, t),
                    t.samples = [];
                    var rt = {
                        data1: d,
                        data2: f,
                        startPTS: p / l,
                        endPTS: (g + h) / l,
                        startDTS: y / l,
                        endDTS: this.nextAvcDts / l,
                        type: "video",
                        hasAudio: !1,
                        hasVideo: !0,
                        nb: b.length,
                        dropped: tt
                    };
                    return this.observer.trigger(a.a.FRAG_PARSING_DATA, rt),
                    rt
                }
            }
            ,
            t.prototype.remuxAudio = function(t, e, r, i) {
                var c = t.inputTimeScale
                  , l = t.timescale
                  , h = c / l
                  , f = t.isAAC ? 1024 : 1152
                  , d = f * h
                  , p = this._PTSNormalize
                  , y = this._initDTS
                  , g = !t.isAAC && this.typeSupported.mpeg
                  , v = void 0
                  , m = void 0
                  , b = void 0
                  , S = void 0
                  , E = void 0
                  , T = void 0
                  , _ = void 0
                  , w = t.samples
                  , A = []
                  , R = this.nextAudioPts;
                if (r |= w.length && R && (i && Math.abs(e - R / c) < .1 || Math.abs(w[0].pts - R - y) < 20 * d),
                w.forEach(function(t) {
                    t.pts = t.dts = p(t.pts - y, e * c)
                }),
                w = w.filter(function(t) {
                    return t.pts >= 0
                }),
                0 !== w.length) {
                    if (r || (R = i ? e * c : w[0].pts),
                    t.isAAC)
                        for (var D = this.config.maxAudioFramesDrift, L = 0, k = R; L < w.length; ) {
                            var O, x = w[L], I = x.pts;
                            O = I - k;
                            var C = Math.abs(1e3 * O / c);
                            if (O <= -D * d)
                                u.b.warn("Dropping 1 audio frame @ " + (k / c).toFixed(3) + "s due to " + Math.round(C) + " ms overlap."),
                                w.splice(L, 1),
                                t.len -= x.unit.length;
                            else if (O >= D * d && C < 1e4 && k) {
                                var P = Math.round(O / d);
                                u.b.warn("Injecting " + P + " audio frame @ " + (k / c).toFixed(3) + "s due to " + Math.round(1e3 * O / c) + " ms gap.");
                                for (var B = 0; B < P; B++) {
                                    var M = Math.max(k, 0);
                                    b = n.a.getSilentFrame(t.manifestCodec || t.codec, t.channelCount),
                                    b || (u.b.log("Unable to get silent frame for given audio codec; duplicating last frame instead."),
                                    b = x.unit.subarray()),
                                    w.splice(L, 0, {
                                        unit: b,
                                        pts: M,
                                        dts: M
                                    }),
                                    t.len += b.length,
                                    k += d,
                                    L++
                                }
                                x.pts = x.dts = k,
                                k += d,
                                L++
                            } else
                                Math.abs(O),
                                x.pts = x.dts = k,
                                k += d,
                                L++
                        }
                    for (var N = 0, F = w.length; N < F; N++) {
                        var U = w[N]
                          , G = U.unit
                          , j = U.pts;
                        if (void 0 !== _)
                            m.duration = Math.round((j - _) / h);
                        else {
                            var H = Math.round(1e3 * (j - R) / c)
                              , K = 0;
                            if (r && t.isAAC && H) {
                                if (H > 0 && H < 1e4)
                                    K = Math.round((j - R) / d),
                                    u.b.log(H + " ms hole between AAC samples detected,filling it"),
                                    K > 0 && (b = n.a.getSilentFrame(t.manifestCodec || t.codec, t.channelCount),
                                    b || (b = G.subarray()),
                                    t.len += K * b.length);
                                else if (H < -12) {
                                    u.b.log("drop overlapping AAC sample, expected/parsed/delta:" + (R / c).toFixed(3) + "s/" + (j / c).toFixed(3) + "s/" + -H + "ms"),
                                    t.len -= G.byteLength;
                                    continue
                                }
                                j = R
                            }
                            if (T = j,
                            !(t.len > 0))
                                return;
                            var V = g ? t.len : t.len + 8;
                            v = g ? 0 : 8;
                            try {
                                S = new Uint8Array(V)
                            } catch (t) {
                                return void this.observer.trigger(a.a.ERROR, {
                                    type: s.b.MUX_ERROR,
                                    details: s.a.REMUX_ALLOC_ERROR,
                                    fatal: !1,
                                    bytes: V,
                                    reason: "fail allocating audio mdat " + V
                                })
                            }
                            if (!g) {
                                new DataView(S.buffer).setUint32(0, V),
                                S.set(o.a.types.mdat, 4)
                            }
                            for (var z = 0; z < K; z++)
                                b = n.a.getSilentFrame(t.manifestCodec || t.codec, t.channelCount),
                                b || (u.b.log("Unable to get silent frame for given audio codec; duplicating this frame instead."),
                                b = G.subarray()),
                                S.set(b, v),
                                v += b.byteLength,
                                m = {
                                    size: b.byteLength,
                                    cts: 0,
                                    duration: 1024,
                                    flags: {
                                        isLeading: 0,
                                        isDependedOn: 0,
                                        hasRedundancy: 0,
                                        degradPrio: 0,
                                        dependsOn: 1
                                    }
                                },
                                A.push(m)
                        }
                        S.set(G, v);
                        var q = G.byteLength;
                        v += q,
                        m = {
                            size: q,
                            cts: 0,
                            duration: 0,
                            flags: {
                                isLeading: 0,
                                isDependedOn: 0,
                                hasRedundancy: 0,
                                degradPrio: 0,
                                dependsOn: 1
                            }
                        },
                        A.push(m),
                        _ = j
                    }
                    var W = 0
                      , Y = A.length;
                    if (Y >= 2 && (W = A[Y - 2].duration,
                    m.duration = W),
                    Y) {
                        this.nextAudioPts = R = _ + h * W,
                        t.len = 0,
                        t.samples = A,
                        E = g ? new Uint8Array : o.a.moof(t.sequenceNumber++, T / h, t),
                        t.samples = [];
                        var X = T / c
                          , Z = R / c
                          , Q = {
                            data1: E,
                            data2: S,
                            startPTS: X,
                            endPTS: Z,
                            startDTS: X,
                            endDTS: Z,
                            type: "audio",
                            hasAudio: !0,
                            hasVideo: !1,
                            nb: Y
                        };
                        return this.observer.trigger(a.a.FRAG_PARSING_DATA, Q),
                        Q
                    }
                    return null
                }
            }
            ,
            t.prototype.remuxEmptyAudio = function(t, e, r, i) {
                var o = t.inputTimeScale
                  , a = t.samplerate ? t.samplerate : o
                  , s = o / a
                  , c = this.nextAudioPts
                  , l = (void 0 !== c ? c : i.startDTS * o) + this._initDTS
                  , h = i.endDTS * o + this._initDTS
                  , f = 1024 * s
                  , d = Math.ceil((h - l) / f)
                  , p = n.a.getSilentFrame(t.manifestCodec || t.codec, t.channelCount);
                if (u.b.warn("remux empty Audio"),
                !p)
                    return void u.b.trace("Unable to remuxEmptyAudio since we were unable to get a silent frame for given audio codec!");
                for (var y = [], g = 0; g < d; g++) {
                    var v = l + g * f;
                    y.push({
                        unit: p,
                        pts: v,
                        dts: v
                    }),
                    t.len += p.length
                }
                t.samples = y,
                this.remuxAudio(t, e, r)
            }
            ,
            t.prototype.remuxID3 = function(t, e) {
                var r = t.samples.length
                  , i = void 0
                  , n = t.inputTimeScale
                  , o = this._initPTS
                  , s = this._initDTS;
                if (r) {
                    for (var u = 0; u < r; u++)
                        i = t.samples[u],
                        i.pts = (i.pts - o) / n,
                        i.dts = (i.dts - s) / n;
                    this.observer.trigger(a.a.FRAG_PARSING_METADATA, {
                        samples: t.samples
                    })
                }
                t.samples = [],
                e = e
            }
            ,
            t.prototype.remuxText = function(t, e) {
                t.samples.sort(function(t, e) {
                    return t.pts - e.pts
                });
                var r = t.samples.length
                  , i = void 0
                  , n = t.inputTimeScale
                  , o = this._initPTS;
                if (r) {
                    for (var s = 0; s < r; s++)
                        i = t.samples[s],
                        i.pts = (i.pts - o) / n;
                    this.observer.trigger(a.a.FRAG_PARSING_USERDATA, {
                        samples: t.samples
                    })
                }
                t.samples = [],
                e = e
            }
            ,
            t.prototype._PTSNormalize = function(t, e) {
                var r = void 0;
                if (void 0 === e)
                    return t;
                for (r = e < t ? -8589934592 : 8589934592; Math.abs(t - e) > 4294967296; )
                    t += r;
                return t
            }
            ,
            t
        }();
        e.a = c
    }
    , function(t, e, r) {
        "use strict";
        function i(t, e) {
            if (!(t instanceof e))
                throw new TypeError("Cannot call a class as a function")
        }
        var n = function() {
            function t() {
                i(this, t)
            }
            return t.getSilentFrame = function(t, e) {
                switch (t) {
                case "mp4a.40.2":
                    if (1 === e)
                        return new Uint8Array([0, 200, 0, 128, 35, 128]);
                    if (2 === e)
                        return new Uint8Array([33, 0, 73, 144, 2, 25, 0, 35, 128]);
                    if (3 === e)
                        return new Uint8Array([0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 142]);
                    if (4 === e)
                        return new Uint8Array([0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 128, 44, 128, 8, 2, 56]);
                    if (5 === e)
                        return new Uint8Array([0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 130, 48, 4, 153, 0, 33, 144, 2, 56]);
                    if (6 === e)
                        return new Uint8Array([0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 130, 48, 4, 153, 0, 33, 144, 2, 0, 178, 0, 32, 8, 224]);
                    break;
                default:
                    if (1 === e)
                        return new Uint8Array([1, 64, 34, 128, 163, 78, 230, 128, 186, 8, 0, 0, 0, 28, 6, 241, 193, 10, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 94]);
                    if (2 === e)
                        return new Uint8Array([1, 64, 34, 128, 163, 94, 230, 128, 186, 8, 0, 0, 0, 0, 149, 0, 6, 241, 161, 10, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 94]);
                    if (3 === e)
                        return new Uint8Array([1, 64, 34, 128, 163, 94, 230, 128, 186, 8, 0, 0, 0, 0, 149, 0, 6, 241, 161, 10, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 94])
                }
                return null
            }
            ,
            t
        }();
        e.a = n
    }
    , function(t, e, r) {
        "use strict";
        function i(t, e) {
            if (!(t instanceof e))
                throw new TypeError("Cannot call a class as a function")
        }
        var n = Math.pow(2, 32) - 1
          , o = function() {
            function t() {
                i(this, t)
            }
            return t.init = function() {
                t.types = {
                    avc1: [],
                    avcC: [],
                    btrt: [],
                    dinf: [],
                    dref: [],
                    esds: [],
                    ftyp: [],
                    hdlr: [],
                    mdat: [],
                    mdhd: [],
                    mdia: [],
                    mfhd: [],
                    minf: [],
                    moof: [],
                    moov: [],
                    mp4a: [],
                    ".mp3": [],
                    mvex: [],
                    mvhd: [],
                    pasp: [],
                    sdtp: [],
                    stbl: [],
                    stco: [],
                    stsc: [],
                    stsd: [],
                    stsz: [],
                    stts: [],
                    tfdt: [],
                    tfhd: [],
                    traf: [],
                    trak: [],
                    trun: [],
                    trex: [],
                    tkhd: [],
                    vmhd: [],
                    smhd: []
                };
                var e = void 0;
                for (e in t.types)
                    t.types.hasOwnProperty(e) && (t.types[e] = [e.charCodeAt(0), e.charCodeAt(1), e.charCodeAt(2), e.charCodeAt(3)]);
                var r = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 118, 105, 100, 101, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 86, 105, 100, 101, 111, 72, 97, 110, 100, 108, 101, 114, 0])
                  , i = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 115, 111, 117, 110, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 83, 111, 117, 110, 100, 72, 97, 110, 100, 108, 101, 114, 0]);
                t.HDLR_TYPES = {
                    video: r,
                    audio: i
                };
                var n = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 12, 117, 114, 108, 32, 0, 0, 0, 1])
                  , o = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0]);
                t.STTS = t.STSC = t.STCO = o,
                t.STSZ = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
                t.VMHD = new Uint8Array([0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0]),
                t.SMHD = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0]),
                t.STSD = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1]);
                var a = new Uint8Array([105, 115, 111, 109])
                  , s = new Uint8Array([97, 118, 99, 49])
                  , u = new Uint8Array([0, 0, 0, 1]);
                t.FTYP = t.box(t.types.ftyp, a, u, a, s),
                t.DINF = t.box(t.types.dinf, t.box(t.types.dref, n))
            }
            ,
            t.box = function(t) {
                for (var e = Array.prototype.slice.call(arguments, 1), r = 8, i = e.length, n = i, o = void 0; i--; )
                    r += e[i].byteLength;
                for (o = new Uint8Array(r),
                o[0] = r >> 24 & 255,
                o[1] = r >> 16 & 255,
                o[2] = r >> 8 & 255,
                o[3] = 255 & r,
                o.set(t, 4),
                i = 0,
                r = 8; i < n; i++)
                    o.set(e[i], r),
                    r += e[i].byteLength;
                return o
            }
            ,
            t.hdlr = function(e) {
                return t.box(t.types.hdlr, t.HDLR_TYPES[e])
            }
            ,
            t.mdat = function(e) {
                return t.box(t.types.mdat, e)
            }
            ,
            t.mdhd = function(e, r) {
                r *= e;
                var i = Math.floor(r / (n + 1))
                  , o = Math.floor(r % (n + 1));
                return t.box(t.types.mdhd, new Uint8Array([1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 3, e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, 255 & e, i >> 24, i >> 16 & 255, i >> 8 & 255, 255 & i, o >> 24, o >> 16 & 255, o >> 8 & 255, 255 & o, 85, 196, 0, 0]))
            }
            ,
            t.mdia = function(e) {
                return t.box(t.types.mdia, t.mdhd(e.timescale, e.duration), t.hdlr(e.type), t.minf(e))
            }
            ,
            t.mfhd = function(e) {
                return t.box(t.types.mfhd, new Uint8Array([0, 0, 0, 0, e >> 24, e >> 16 & 255, e >> 8 & 255, 255 & e]))
            }
            ,
            t.minf = function(e) {
                return "audio" === e.type ? t.box(t.types.minf, t.box(t.types.smhd, t.SMHD), t.DINF, t.stbl(e)) : t.box(t.types.minf, t.box(t.types.vmhd, t.VMHD), t.DINF, t.stbl(e))
            }
            ,
            t.moof = function(e, r, i) {
                return t.box(t.types.moof, t.mfhd(e), t.traf(i, r))
            }
            ,
            t.moov = function(e) {
                for (var r = e.length, i = []; r--; )
                    i[r] = t.trak(e[r]);
                return t.box.apply(null, [t.types.moov, t.mvhd(e[0].timescale, e[0].duration)].concat(i).concat(t.mvex(e)))
            }
            ,
            t.mvex = function(e) {
                for (var r = e.length, i = []; r--; )
                    i[r] = t.trex(e[r]);
                return t.box.apply(null, [t.types.mvex].concat(i))
            }
            ,
            t.mvhd = function(e, r) {
                r *= e;
                var i = Math.floor(r / (n + 1))
                  , o = Math.floor(r % (n + 1))
                  , a = new Uint8Array([1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 3, e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, 255 & e, i >> 24, i >> 16 & 255, i >> 8 & 255, 255 & i, o >> 24, o >> 16 & 255, o >> 8 & 255, 255 & o, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 64, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 255, 255, 255, 255]);
                return t.box(t.types.mvhd, a)
            }
            ,
            t.sdtp = function(e) {
                var r = e.samples || []
                  , i = new Uint8Array(4 + r.length)
                  , n = void 0
                  , o = void 0;
                for (o = 0; o < r.length; o++)
                    n = r[o].flags,
                    i[o + 4] = n.dependsOn << 4 | n.isDependedOn << 2 | n.hasRedundancy;
                return t.box(t.types.sdtp, i)
            }
            ,
            t.stbl = function(e) {
                return t.box(t.types.stbl, t.stsd(e), t.box(t.types.stts, t.STTS), t.box(t.types.stsc, t.STSC), t.box(t.types.stsz, t.STSZ), t.box(t.types.stco, t.STCO))
            }
            ,
            t.avc1 = function(e) {
                var r = []
                  , i = []
                  , n = void 0
                  , o = void 0
                  , a = void 0;
                for (n = 0; n < e.sps.length; n++)
                    o = e.sps[n],
                    a = o.byteLength,
                    r.push(a >>> 8 & 255),
                    r.push(255 & a),
                    r = r.concat(Array.prototype.slice.call(o));
                for (n = 0; n < e.pps.length; n++)
                    o = e.pps[n],
                    a = o.byteLength,
                    i.push(a >>> 8 & 255),
                    i.push(255 & a),
                    i = i.concat(Array.prototype.slice.call(o));
                var s = t.box(t.types.avcC, new Uint8Array([1, r[3], r[4], r[5], 255, 224 | e.sps.length].concat(r).concat([e.pps.length]).concat(i)))
                  , u = e.width
                  , c = e.height
                  , l = e.pixelRatio[0]
                  , h = e.pixelRatio[1];
                return t.box(t.types.avc1, new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, u >> 8 & 255, 255 & u, c >> 8 & 255, 255 & c, 0, 72, 0, 0, 0, 72, 0, 0, 0, 0, 0, 0, 0, 1, 18, 100, 97, 105, 108, 121, 109, 111, 116, 105, 111, 110, 47, 104, 108, 115, 46, 106, 115, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24, 17, 17]), s, t.box(t.types.btrt, new Uint8Array([0, 28, 156, 128, 0, 45, 198, 192, 0, 45, 198, 192])), t.box(t.types.pasp, new Uint8Array([l >> 24, l >> 16 & 255, l >> 8 & 255, 255 & l, h >> 24, h >> 16 & 255, h >> 8 & 255, 255 & h])))
            }
            ,
            t.esds = function(t) {
                var e = t.config.length;
                return new Uint8Array([0, 0, 0, 0, 3, 23 + e, 0, 1, 0, 4, 15 + e, 64, 21, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5].concat([e]).concat(t.config).concat([6, 1, 2]))
            }
            ,
            t.mp4a = function(e) {
                var r = e.samplerate;
                return t.box(t.types.mp4a, new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, e.channelCount, 0, 16, 0, 0, 0, 0, r >> 8 & 255, 255 & r, 0, 0]), t.box(t.types.esds, t.esds(e)))
            }
            ,
            t.mp3 = function(e) {
                var r = e.samplerate;
                return t.box(t.types[".mp3"], new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, e.channelCount, 0, 16, 0, 0, 0, 0, r >> 8 & 255, 255 & r, 0, 0]))
            }
            ,
            t.stsd = function(e) {
                return "audio" === e.type ? e.isAAC || "mp3" !== e.codec ? t.box(t.types.stsd, t.STSD, t.mp4a(e)) : t.box(t.types.stsd, t.STSD, t.mp3(e)) : t.box(t.types.stsd, t.STSD, t.avc1(e))
            }
            ,
            t.tkhd = function(e) {
                var r = e.id
                  , i = e.duration * e.timescale
                  , o = e.width
                  , a = e.height
                  , s = Math.floor(i / (n + 1))
                  , u = Math.floor(i % (n + 1));
                return t.box(t.types.tkhd, new Uint8Array([1, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 3, r >> 24 & 255, r >> 16 & 255, r >> 8 & 255, 255 & r, 0, 0, 0, 0, s >> 24, s >> 16 & 255, s >> 8 & 255, 255 & s, u >> 24, u >> 16 & 255, u >> 8 & 255, 255 & u, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 64, 0, 0, 0, o >> 8 & 255, 255 & o, 0, 0, a >> 8 & 255, 255 & a, 0, 0]))
            }
            ,
            t.traf = function(e, r) {
                var i = t.sdtp(e)
                  , o = e.id
                  , a = Math.floor(r / (n + 1))
                  , s = Math.floor(r % (n + 1));
                return t.box(t.types.traf, t.box(t.types.tfhd, new Uint8Array([0, 0, 0, 0, o >> 24, o >> 16 & 255, o >> 8 & 255, 255 & o])), t.box(t.types.tfdt, new Uint8Array([1, 0, 0, 0, a >> 24, a >> 16 & 255, a >> 8 & 255, 255 & a, s >> 24, s >> 16 & 255, s >> 8 & 255, 255 & s])), t.trun(e, i.length + 16 + 20 + 8 + 16 + 8 + 8), i)
            }
            ,
            t.trak = function(e) {
                return e.duration = e.duration || 4294967295,
                t.box(t.types.trak, t.tkhd(e), t.mdia(e))
            }
            ,
            t.trex = function(e) {
                var r = e.id;
                return t.box(t.types.trex, new Uint8Array([0, 0, 0, 0, r >> 24, r >> 16 & 255, r >> 8 & 255, 255 & r, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1]))
            }
            ,
            t.trun = function(e, r) {
                var i = e.samples || []
                  , n = i.length
                  , o = 12 + 16 * n
                  , a = new Uint8Array(o)
                  , s = void 0
                  , u = void 0
                  , c = void 0
                  , l = void 0
                  , h = void 0
                  , f = void 0;
                for (r += 8 + o,
                a.set([0, 0, 15, 1, n >>> 24 & 255, n >>> 16 & 255, n >>> 8 & 255, 255 & n, r >>> 24 & 255, r >>> 16 & 255, r >>> 8 & 255, 255 & r], 0),
                s = 0; s < n; s++)
                    u = i[s],
                    c = u.duration,
                    l = u.size,
                    h = u.flags,
                    f = u.cts,
                    a.set([c >>> 24 & 255, c >>> 16 & 255, c >>> 8 & 255, 255 & c, l >>> 24 & 255, l >>> 16 & 255, l >>> 8 & 255, 255 & l, h.isLeading << 2 | h.dependsOn, h.isDependedOn << 6 | h.hasRedundancy << 4 | h.paddingValue << 1 | h.isNonSync, 61440 & h.degradPrio, 15 & h.degradPrio, f >>> 24 & 255, f >>> 16 & 255, f >>> 8 & 255, 255 & f], 12 + 16 * s);
                return t.box(t.types.trun, a)
            }
            ,
            t.initSegment = function(e) {
                t.types || t.init();
                var r = t.moov(e)
                  , i = void 0;
                return i = new Uint8Array(t.FTYP.byteLength + r.byteLength),
                i.set(t.FTYP),
                i.set(r, t.FTYP.byteLength),
                i
            }
            ,
            t
        }();
        e.a = o
    }
    , function(t, e, r) {
        "use strict";
        function i(t, e) {
            if (!(t instanceof e))
                throw new TypeError("Cannot call a class as a function")
        }
        var n = r(3)
          , o = function() {
            function t(e) {
                i(this, t),
                this.observer = e
            }
            return t.prototype.destroy = function() {}
            ,
            t.prototype.resetTimeStamp = function() {}
            ,
            t.prototype.resetInitSegment = function() {}
            ,
            t.prototype.remux = function(t, e, r, i, o, a, s, u) {
                var c = this.observer
                  , l = "";
                t && (l += "audio"),
                e && (l += "video"),
                c.trigger(n.a.FRAG_PARSING_DATA, {
                    data1: u,
                    startPTS: o,
                    startDTS: o,
                    type: l,
                    hasAudio: !!t,
                    hasVideo: !!e,
                    nb: 1,
                    dropped: 0
                }),
                c.trigger(n.a.FRAG_PARSED)
            }
            ,
            t
        }();
        e.a = o
    }
    , function(t, e, r) {
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var i = r(59)
          , n = r(3)
          , o = r(2)
          , a = r(22)
          , s = r.n(a)
          , u = function(t) {
            var e = new s.a;
            e.trigger = function(t) {
                for (var r = arguments.length, i = Array(r > 1 ? r - 1 : 0), n = 1; n < r; n++)
                    i[n - 1] = arguments[n];
                e.emit.apply(e, [t, t].concat(i))
            }
            ,
            e.off = function(t) {
                for (var r = arguments.length, i = Array(r > 1 ? r - 1 : 0), n = 1; n < r; n++)
                    i[n - 1] = arguments[n];
                e.removeListener.apply(e, [t].concat(i))
            }
            ;
            var r = function(e, r) {
                t.postMessage({
                    event: e,
                    data: r
                })
            };
            t.addEventListener("message", function(n) {
                var a = n.data;
                switch (a.cmd) {
                case "init":
                    var s = JSON.parse(a.config);
                    t.demuxer = new i.a(e,a.typeSupported,s,a.vendor,a.streamUrl);
                    try {
                        Object(o.a)(!0 === s.debug)
                    } catch (t) {
                        console.warn("demuxerWorker: unable to enable logs")
                    }
                    r("init", null);
                    break;
                case "demux":
                    t.demuxer.push(a.data, a.decryptdata, a.initSegment, a.audioCodec, a.videoCodec, a.timeOffset, a.discontinuity, a.trackSwitch, a.contiguous, a.duration, a.accurateTimeOffset, a.defaultInitPTS)
                }
            }),
            e.on(n.a.FRAG_DECRYPTED, r),
            e.on(n.a.FRAG_PARSING_INIT_SEGMENT, r),
            e.on(n.a.FRAG_PARSED, r),
            e.on(n.a.ERROR, r),
            e.on(n.a.FRAG_PARSING_METADATA, r),
            e.on(n.a.FRAG_PARSING_USERDATA, r),
            e.on(n.a.INIT_PTS_FOUND, r),
            e.on(n.a.FRAG_PARSING_DATA, function(e, r) {
                var i = []
                  , n = {
                    event: e,
                    data: r
                };
                r.data1 && (n.data1 = r.data1.buffer,
                i.push(r.data1.buffer),
                delete r.data1),
                r.data2 && (n.data2 = r.data2.buffer,
                i.push(r.data2.buffer),
                delete r.data2),
                t.postMessage(n, i)
            })
        };
        e.default = u
    }
    , function(t, e, r) {
        "use strict";
        function i() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0
              , e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0
              , r = arguments[2]
              , i = 0;
            if (r.programDateTime) {
                var n = Date.parse(r.programDateTime);
                isNaN(n) || (i = 1e3 * e + n - 1e3 * t)
            }
            return i
        }
        function n(t) {
            var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
            if (!Array.isArray(t) || !t.length || null === e)
                return null;
            if (e < t[0].pdt)
                return null;
            if (e >= t[t.length - 1].endPdt)
                return null;
            for (var r = 0; r < t.length; ++r) {
                var i = t[r];
                if (e < i.endPdt)
                    return i
            }
            return null
        }
        function o(t, e) {
            var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0
              , i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0
              , n = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 0
              , o = void 0
              , u = t ? e[t.sn - e[0].sn + 1] : null;
            return r < i && (r > i - n && (n = 0),
            o = u && !a(r, n, u) ? u : s.a.search(e, a.bind(null, r, n))),
            o
        }
        function a() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0
              , e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0
              , r = arguments[2]
              , i = Math.min(e, r.duration + (r.deltaPTS ? r.deltaPTS : 0));
            return r.start + r.duration - i <= t ? 1 : r.start - i > t && r.start ? -1 : 0
        }
        e.a = i,
        e.b = n,
        e.c = o,
        e.d = a;
        var s = r(16)
    }
    , function(t, e, r) {
        "use strict";
        function i(t, e) {
            if (!(t instanceof e))
                throw new TypeError("Cannot call a class as a function")
        }
        function n(t, e) {
            if (!t)
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !e || "object" != typeof e && "function" != typeof e ? t : e
        }
        function o(t, e) {
            if ("function" != typeof e && null !== e)
                throw new TypeError("Super expression must either be null or a function, not " + typeof e);
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }),
            e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }
        var a = r(3)
          , s = r(5)
          , u = r(2)
          , c = r(4)
          , l = r(29)
          , h = function() {
            function t(t, e) {
                for (var r = 0; r < e.length; r++) {
                    var i = e[r];
                    i.enumerable = i.enumerable || !1,
                    i.configurable = !0,
                    "value"in i && (i.writable = !0),
                    Object.defineProperty(t, i.key, i)
                }
            }
            return function(e, r, i) {
                return r && t(e.prototype, r),
                i && t(e, i),
                e
            }
        }()
          , f = function(t) {
            function e(r) {
                i(this, e);
                var o = n(this, t.call(this, r, a.a.MANIFEST_LOADED, a.a.LEVEL_LOADED, a.a.FRAG_LOADED, a.a.ERROR));
                return o.canload = !1,
                o.currentLevelIndex = null,
                o.manualLevelIndex = -1,
                o.timer = null,
                o
            }
            return o(e, t),
            e.prototype.onHandlerDestroying = function() {
                this.cleanTimer(),
                this.manualLevelIndex = -1
            }
            ,
            e.prototype.cleanTimer = function() {
                null !== this.timer && (clearTimeout(this.timer),
                this.timer = null)
            }
            ,
            e.prototype.startLoad = function() {
                var t = this._levels;
                this.canload = !0,
                this.levelRetryCount = 0,
                t && t.forEach(function(t) {
                    t.loadError = 0;
                    var e = t.details;
                    e && e.live && (t.details = void 0)
                }),
                null !== this.timer && this.loadLevel()
            }
            ,
            e.prototype.stopLoad = function() {
                this.canload = !1
            }
            ,
            e.prototype.onManifestLoaded = function(t) {
                var e = []
                  , r = void 0
                  , i = {}
                  , n = null
                  , o = !1
                  , s = !1
                  , h = /chrome|firefox/.test(navigator.userAgent.toLowerCase())
                  , f = [];
                if (t.levels.forEach(function(t) {
                    t.loadError = 0,
                    t.fragmentError = !1,
                    o = o || !!t.videoCodec,
                    s = s || !!t.audioCodec || !(!t.attrs || !t.attrs.AUDIO),
                    !0 === h && t.audioCodec && -1 !== t.audioCodec.indexOf("mp4a.40.34") && (t.audioCodec = void 0),
                    void 0 !== t.bitrate && (n = i[t.bitrate]),
                    n ? n.url.push(t.url) : (t.url = [t.url],
                    t.urlId = 0,
                    void 0 !== t.bitrate && (i[t.bitrate] = t),
                    e.push(t))
                }),
                !0 === o && !0 === s && (e = e.filter(function(t) {
                    return !!t.videoCodec
                })),
                e = e.filter(function(t) {
                    var e = t.audioCodec
                      , r = t.videoCodec;
                    return (!e || Object(l.a)(e)) && (!r || Object(l.a)(r))
                }),
                t.audioTracks && (f = t.audioTracks.filter(function(t) {
                    return !t.audioCodec || Object(l.a)(t.audioCodec, "audio")
                })),
                e.length > 0) {
                    if (e.sort(function(t, e) {
                        return t.bitrate - e.bitrate
                    }),
                    this.hls && this.hls.config && this.hls.config.defaultBandwidth) {
                        var d = -1
                          , p = 0
                          , y = 0;
                        for (d = 0; d < e.length; ++d)
                            if (e[d].attrs) {
                                if ((y = e[d].attrs.BANDWIDTH ? e[d].attrs.BANDWIDTH : 0) == this.hls.config.defaultBandwidth) {
                                    r = e[d].bitrate;
                                    break
                                }
                                if (y > this.hls.config.defaultBandwidth) {
                                    0 === p || Math.abs(y - this.hls.config.defaultBandwidth) < Math.abs(this.hls.config.defaultBandwidth - p) ? r = e[d].bitrate : (--d,
                                    r = e[d - 1].bitrate);
                                    break
                                }
                                d + 1 === e.length && (r = e[d].bitrate),
                                p = y
                            }
                        d === e.length ? void 0 != (r = e[0].bitrate) && this.hls.trigger(a.a.DEFAULT_BANDWIDTH, e[0]) : (r = e[d].bitrate,
                        this.manualLevel = d,
                        this.hls.trigger(a.a.DEFAULT_BANDWIDTH, e[d]))
                    } else
                        r = e[0].bitrate;
                    this._levels = e;
                    for (var g = 0; g < e.length; g++)
                        if (e[g].bitrate === r) {
                            this._firstLevel = g,
                            u.b.log("manifest loaded," + e.length + " level(s) found, first bitrate:" + r);
                            break
                        }
                    this.hls.trigger(a.a.MANIFEST_PARSED, {
                        levels: e,
                        audioTracks: f,
                        firstLevel: this._firstLevel,
                        stats: t.stats,
                        audio: s,
                        video: o,
                        altAudio: f.length > 0 && o
                    })
                } else
                    this.hls.trigger(a.a.ERROR, {
                        type: c.b.MEDIA_ERROR,
                        details: c.a.MANIFEST_INCOMPATIBLE_CODECS_ERROR,
                        fatal: !0,
                        url: this.hls.url,
                        reason: "no level with compatible codecs found in manifest"
                    })
            }
            ,
            e.prototype.setLevelInternal = function(t) {
                var e = this._levels
                  , r = this.hls;
                if (t >= 0 && t < e.length) {
                    if (this.cleanTimer(),
                    this.currentLevelIndex !== t) {
                        u.b.log("switching to level " + t),
                        this.currentLevelIndex = t;
                        var i = e[t];
                        i.level = t,
                        r.trigger(a.a.LEVEL_SWITCHING, i)
                    }
                    var n = e[t]
                      , o = n.details;
                    if (!o || !0 === o.live) {
                        var s = n.urlId;
                        r.trigger(a.a.LEVEL_LOADING, {
                            url: n.url[s],
                            level: t,
                            id: s
                        })
                    }
                } else
                    r.trigger(a.a.ERROR, {
                        type: c.b.OTHER_ERROR,
                        details: c.a.LEVEL_SWITCH_ERROR,
                        level: t,
                        fatal: !1,
                        reason: "invalid level idx"
                    })
            }
            ,
            e.prototype.onError = function(t) {
                if (!0 === t.fatal)
                    return void (t.type === c.b.NETWORK_ERROR && this.cleanTimer());
                var e = !1
                  , r = !1
                  , i = void 0;
                switch (t.details) {
                case c.a.FRAG_LOAD_ERROR:
                case c.a.FRAG_LOAD_TIMEOUT:
                case c.a.KEY_LOAD_ERROR:
                case c.a.KEY_LOAD_TIMEOUT:
                    i = t.frag.level,
                    r = !0;
                    break;
                case c.a.LEVEL_LOAD_ERROR:
                case c.a.LEVEL_LOAD_TIMEOUT:
                    i = t.context.level,
                    e = !0;
                    break;
                case c.a.REMUX_ALLOC_ERROR:
                    i = t.level,
                    e = !0
                }
                void 0 !== i && this.recoverLevel(t, i, e, r)
            }
            ,
            e.prototype.recoverLevel = function(t, e, r, i) {
                var n = this
                  , o = this.hls.config
                  , a = t.details
                  , s = this._levels[e]
                  , c = void 0
                  , l = void 0
                  , h = void 0;
                if (s.loadError++,
                s.fragmentError = i,
                !0 === r) {
                    if (!(this.levelRetryCount + 1 <= o.levelLoadingMaxRetry))
                        return u.b.error("level controller, cannot recover from " + a + " error"),
                        this.currentLevelIndex = null,
                        this.cleanTimer(),
                        void (t.fatal = !0);
                    l = Math.min(Math.pow(2, this.levelRetryCount) * o.levelLoadingRetryDelay, o.levelLoadingMaxRetryTimeout),
                    this.timer = setTimeout(function() {
                        return n.loadLevel()
                    }, l),
                    t.levelRetry = !0,
                    this.levelRetryCount++,
                    u.b.warn("level controller, " + a + ", retry in " + l + " ms, current retry count is " + this.levelRetryCount)
                }
                !0 !== r && !0 !== i || (c = s.url.length,
                c > 1 && s.loadError < c ? (u.b.warn("level controller, " + a + " for level " + e + ": switching to redundant stream id " + s.urlId),
                s.urlId = (s.urlId + 1) % c,
                s.details = void 0) : -1 === this.manualLevelIndex ? (h = 0 === e ? this._levels.length - 1 : e - 1,
                u.b.warn("level controller, " + a + ": switch to " + h),
                this.hls.nextAutoLevel = this.currentLevelIndex = h) : !0 === i && (u.b.warn("level controller, " + a + ": reload a fragment"),
                this.currentLevelIndex = null))
            }
            ,
            // 第二个
            e.prototype.onFragLoaded = function(t) {
                var e = t.frag;
                if (void 0 !== e && "main" === e.type) {
                    var r = this._levels[e.level];
                    void 0 !== r && (r.fragmentError = !1,
                    r.loadError = 0,
                    this.levelRetryCount = 0)
                }
            }
            ,
            e.prototype.onLevelLoaded = function(t) {
                var e = this
                  , r = t.level;
                if (r === this.currentLevelIndex) {
                    var i = this._levels[r];
                    !1 === i.fragmentError && (i.loadError = 0,
                    this.levelRetryCount = 0);
                    var n = t.details;
                    if (n.live) {
                        var o = 1e3 * (n.averagetargetduration ? n.averagetargetduration : n.targetduration)
                          , a = o
                          , s = i.details;
                        s && n.endSN === s.endSN && (a /= 2,
                        u.b.log("same live playlist, reload twice faster")),
                        a -= performance.now() - t.stats.trequest,
                        a = Math.max(o / 2, Math.round(a)),
                        u.b.log("live playlist, reload in " + Math.round(a) + " ms"),
                        this.cleanTimer(),
                        this.timer = setTimeout(function() {
                            return e.loadLevel()
                        }, a)
                    } else
                        this.cleanTimer()
                }
            }
            ,
            e.prototype.loadLevel = function() {
                var t = void 0
                  , e = void 0;
                null !== this.currentLevelIndex && !0 === this.canload && void 0 !== (t = this._levels[this.currentLevelIndex]) && t.url.length > 0 && (e = t.urlId,
                this.hls.trigger(a.a.LEVEL_LOADING, {
                    url: t.url[e],
                    level: this.currentLevelIndex,
                    id: e
                }))
            }
            ,
            h(e, [{
                key: "levels",
                get: function() {
                    return this._levels
                },
                set: function(t) {
                    this._levels = t
                }
            }, {
                key: "level",
                get: function() {
                    return this.currentLevelIndex
                },
                set: function(t) {
                    var e = this._levels;
                    e && (t = Math.min(t, e.length - 1),
                    this.currentLevelIndex === t && void 0 !== e[t].details || this.setLevelInternal(t))
                }
            }, {
                key: "manualLevel",
                get: function() {
                    return this.manualLevelIndex
                },
                set: function(t) {
                    this.manualLevelIndex = t,
                    void 0 === this._startLevel && (this._startLevel = t),
                    -1 !== t && (this.level = t)
                }
            }, {
                key: "firstLevel",
                get: function() {
                    return this._firstLevel
                },
                set: function(t) {
                    this._firstLevel = t
                }
            }, {
                key: "startLevel",
                get: function() {
                    if (void 0 === this._startLevel) {
                        var t = this.hls.config.startLevel;
                        return void 0 !== t ? t : this._firstLevel
                    }
                    return this._startLevel
                },
                set: function(t) {
                    this._startLevel = t
                }
            }, {
                key: "nextLoadLevel",
                get: function() {
                    return -1 !== this.manualLevelIndex ? this.manualLevelIndex : this.hls.nextAutoLevel
                },
                set: function(t) {
                    this.level = t,
                    -1 === this.manualLevelIndex && (this.hls.nextAutoLevel = t)
                }
            }]),
            e
        }(s.a);
        e.a = f
    }
    , function(t, e, r) {
        "use strict";
        function i(t, e) {
            if (!(t instanceof e))
                throw new TypeError("Cannot call a class as a function")
        }
        function n(t, e) {
            if (!t)
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !e || "object" != typeof e && "function" != typeof e ? t : e
        }
        function o(t, e) {
            if ("function" != typeof e && null !== e)
                throw new TypeError("Super expression must either be null or a function, not " + typeof e);
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }),
            e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }
        var a = r(3)
          , s = r(5)
          , u = r(17)
          , c = r(65)
          , l = function(t) {
            function e(r) {
                i(this, e);
                var o = n(this, t.call(this, r, a.a.MEDIA_ATTACHED, a.a.MEDIA_DETACHING, a.a.FRAG_PARSING_METADATA));
                return o.id3Track = void 0,
                o.media = void 0,
                o
            }
            return o(e, t),
            e.prototype.destroy = function() {
                s.a.prototype.destroy.call(this)
            }
            ,
            e.prototype.onMediaAttached = function(t) {
                this.media = t.media,
                this.media
            }
            ,
            e.prototype.onMediaDetaching = function() {
                Object(c.a)(this.id3Track),
                this.id3Track = void 0,
                this.media = void 0
            }
            ,
            e.prototype.getID3Track = function(t) {
                for (var e = 0; e < t.length; e++) {
                    var r = t[e];
                    if ("metadata" === r.kind && "id3" === r.label)
                        return Object(c.b)(r, this.media),
                        r
                }
                return this.media.addTextTrack("metadata", "id3")
            }
            ,
            e.prototype.onFragParsingMetadata = function(t) {
                var e = t.frag
                  , r = t.samples;
                this.id3Track || (this.id3Track = this.getID3Track(this.media.textTracks),
                this.id3Track.mode = "hidden");
                for (var i = window.WebKitDataCue || window.VTTCue || window.TextTrackCue, n = 0; n < r.length; n++) {
                    var o = u.a.getID3Frames(r[n].data);
                    if (o) {
                        var a = r[n].pts
                          , s = n < r.length - 1 ? r[n + 1].pts : e.endPTS;
                        a === s && (s += 1e-4);
                        for (var c = 0; c < o.length; c++) {
                            var l = o[c];
                            if (!u.a.isTimeStampFrame(l)) {
                                var h = new i(a,s,"");
                                h.value = l,
                                this.id3Track.addCue(h)
                            }
                        }
                    }
                }
            }
            ,
            e
        }(s.a);
        e.a = l
    }
    , function(t, e, r) {
        "use strict";
        function i() {
            var t = Object(n.a)()
              , e = window.SourceBuffer || window.WebKitSourceBuffer
              , r = t && "function" == typeof t.isTypeSupported && t.isTypeSupported('video/mp4; codecs="avc1.42E01E,mp4a.40.2"')
              , i = !e || e.prototype && "function" == typeof e.prototype.appendBuffer && "function" == typeof e.prototype.remove;
            return !!r && !!i
        }
        e.a = i;
        var n = r(24)
    }
    , function(t, e, r) {
        "use strict";
        r.d(e, "a", function() {
            return g
        });
        var i = r(115)
          , n = r(118)
          , o = r(119)
          , a = r(120)
          , s = r(121)
          , u = r(122)
          , c = r(123)
          , l = r(124)
          , h = r(126)
          , f = r(130)
          , d = r(131)
          , p = r(132)
          , y = r(133)
          , g = {
            autoStartLoad: !0,
            startPosition: -1,
            defaultAudioCodec: void 0,
            debug: !1,
            capLevelOnFPSDrop: !1,
            capLevelToPlayerSize: !1,
            initialLiveManifestSize: 1,
            maxBufferLength: 30,
            maxBufferSize: 6e7,
            maxBufferHole: .5,
            lowBufferWatchdogPeriod: .5,
            highBufferWatchdogPeriod: 3,
            nudgeOffset: .1,
            nudgeMaxRetry: 3,
            maxFragLookUpTolerance: .25,
            liveSyncDurationCount: 3,
            liveMaxLatencyDurationCount: 1 / 0,
            liveSyncDuration: void 0,
            liveMaxLatencyDuration: void 0,
            liveDurationInfinity: !1,
            maxMaxBufferLength: 600,
            enableWorker: !0,
            enableSoftwareAES: !0,
            manifestLoadingTimeOut: 1e4,
            manifestLoadingMaxRetry: 1,
            manifestLoadingRetryDelay: 1e3,
            manifestLoadingMaxRetryTimeout: 64e3,
            startLevel: void 0,
            levelLoadingTimeOut: 1e4,
            levelLoadingMaxRetry: 4,
            levelLoadingRetryDelay: 1e3,
            levelLoadingMaxRetryTimeout: 64e3,
            fragLoadingTimeOut: 2e4,
            fragLoadingMaxRetry: 6,
            fragLoadingRetryDelay: 1e3,
            fragLoadingMaxRetryTimeout: 64e3,
            startFragPrefetch: !1,
            fpsDroppedMonitoringPeriod: 5e3,
            fpsDroppedMonitoringThreshold: .2,
            appendErrorMaxRetry: 3,
            hlsFrameChasing: !1,
            chasingFirstParagraph: 20,
            chasingSecondParagraph: 40,
            chasingFirstSpeed: 1.1,
            chasingSecondSpeed: 1.2,
            loader: s.a,
            fLoader: void 0,
            pLoader: void 0,
            xhrSetup: void 0,
            licenseXhrSetup: void 0,
            abrController: i.a,
            bufferController: n.a,
            capLevelController: o.a,
            fpsController: a.a,
            stretchShortVideoTrack: !1,
            maxAudioFramesDrift: 1,
            forceKeyFrameOnDiscontinuity: !0,
            abrEwmaFastLive: 3,
            abrEwmaSlowLive: 9,
            abrEwmaFastVoD: 3,
            abrEwmaSlowVoD: 9,
            abrEwmaDefaultEstimate: 5e5,
            abrBandWidthFactor: .95,
            abrBandWidthUpFactor: .7,
            abrMaxWithRealBitrate: !1,
            abrBandWidthUpCacheTime: 15,
            maxStarvationDelay: 4,
            maxLoadingDelay: 4,
            minAutoBitrate: 0,
            emeEnabled: !1,
            widevineLicenseUrl: void 0,
            requestMediaKeySystemAccessFunc: y.a
        };
        g.subtitleStreamController = d.a,
        g.subtitleTrackController = f.a,
        g.timelineController = h.a,
        g.cueHandler = l,
        g.enableCEA708Captions = !0,
        g.enableWebVTT = !0,
        g.captionsTextTrack1Label = "English",
        g.captionsTextTrack1LanguageCode = "en",
        g.captionsTextTrack2Label = "Spanish",
        g.captionsTextTrack2LanguageCode = "es",
        g.subtitleLoadInterval = 8,
        g.audioStreamController = c.a,
        g.audioTrackController = u.a,
        g.emeController = p.a
    }
    , function(t, e, r) {
        "use strict";
        function i(t, e) {
            if (!(t instanceof e))
                throw new TypeError("Cannot call a class as a function")
        }
        function n(t, e) {
            if (!t)
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !e || "object" != typeof e && "function" != typeof e ? t : e
        }
        function o(t, e) {
            if ("function" != typeof e && null !== e)
                throw new TypeError("Super expression must either be null or a function, not " + typeof e);
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }),
            e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }
        var a = r(3)
          , s = r(5)
          , u = r(21)
          , c = r(4)
          , l = r(2)
          , h = r(116)
          , f = function() {
            function t(t, e) {
                for (var r = 0; r < e.length; r++) {
                    var i = e[r];
                    i.enumerable = i.enumerable || !1,
                    i.configurable = !0,
                    "value"in i && (i.writable = !0),
                    Object.defineProperty(t, i.key, i)
                }
            }
            return function(e, r, i) {
                return r && t(e.prototype, r),
                i && t(e, i),
                e
            }
        }()
          , d = function(t) {
            function e(r) {
                i(this, e);
                var o = n(this, t.call(this, r, a.a.FRAG_LOADING, a.a.FRAG_LOADED, a.a.FRAG_BUFFERED, a.a.ERROR));
                return o.lastLoadedFragLevel = 0,
                o._nextAutoLevel = -1,
                o.hls = r,
                o.timer = null,
                o._bwEstimator = null,
                o.onCheck = o._abandonRulesCheck.bind(o),
                o
            }
            return o(e, t),
            e.prototype.destroy = function() {
                this.clearTimer(),
                s.a.prototype.destroy.call(this)
            }
            ,
            e.prototype.onFragLoading = function(t) {
                var e = t.frag;
                if ("main" === e.type && (this.timer || (this.fragCurrent = e,
                this.timer = setInterval(this.onCheck, 100)),
                !this._bwEstimator)) {
                    var r = this.hls
                      , i = t.frag.level
                      , n = r.levels[i].details.live
                      , o = r.config
                      , a = void 0
                      , s = void 0;
                    n ? (a = o.abrEwmaFastLive,
                    s = o.abrEwmaSlowLive) : (a = o.abrEwmaFastVoD,
                    s = o.abrEwmaSlowVoD),
                    this._bwEstimator = new h.a(r,s,a,o.abrEwmaDefaultEstimate)
                }
            }
            ,
            e.prototype._abandonRulesCheck = function() {
                var t = this.hls
                  , e = t.media
                  , r = this.fragCurrent
                  , i = t.minAutoLevel
                  , n = r.loader;
                if (!n || n.stats && n.stats.aborted)
                    return l.b.warn("frag loader destroy or aborted, disarm abandonRules"),
                    this.clearTimer(),
                    void (this._nextAutoLevel = -1);
                var o = n.stats;
                if (e && o && (!e.paused && 0 !== e.playbackRate || !e.readyState) && r.autoLevel && r.level) {
                    var s = performance.now() - o.trequest
                      , c = Math.abs(e.playbackRate);
                    if (s > 500 * r.duration / c) {
                        var h = t.levels
                          , f = Math.max(1, o.bw ? o.bw / 8 : 1e3 * o.loaded / s)
                          , d = h[r.level]
                          , p = d.realBitrate ? Math.max(d.realBitrate, d.bitrate) : d.bitrate
                          , y = o.total ? o.total : Math.max(o.loaded, Math.round(r.duration * p / 8))
                          , g = e.currentTime
                          , v = (y - o.loaded) / f
                          , m = (u.a.bufferInfo(e, g, t.config.maxBufferHole).end - g) / c;
                        if (m < 2 * r.duration / c && v > m) {
                            var b = void 0
                              , S = void 0;
                            for (S = r.level - 1; S > i; S--) {
                                var E = h[S].realBitrate ? Math.max(h[S].realBitrate, h[S].bitrate) : h[S].bitrate;
                                if ((b = r.duration * E / (6.4 * f)) < m)
                                    break
                            }
                            b < v && (l.b.warn("loading too slow, abort fragment loading and switch to level " + S + ":fragLoadedDelay[" + S + "]<fragLoadedDelay[" + (r.level - 1) + "];bufferStarvationDelay:" + b.toFixed(1) + "<" + v.toFixed(1) + ":" + m.toFixed(1)),
                            t.nextLoadLevel = S,
                            this._bwEstimator.sample(s, o.loaded),
                            n.abort(),
                            this.clearTimer(),
                            t.trigger(a.a.FRAG_LOAD_EMERGENCY_ABORTED, {
                                frag: r,
                                stats: o
                            }))
                        }
                    }
                }
            }
            ,
            // 第一个onFragLoaded 跳转 t:{frag,networkDetails,payload:ArrayBuffer,stats}
            e.prototype.onFragLoaded = function(t) {
                var e = t.frag;
                if ("main" === e.type && !isNaN(e.sn)) {
                    if (this.clearTimer(),
                    this.lastLoadedFragLevel = e.level,
                    this._nextAutoLevel = -1,
                    this.hls.config.abrMaxWithRealBitrate) {
                        var r = this.hls.levels[e.level]
                          , i = (r.loaded ? r.loaded.bytes : 0) + t.stats.loaded
                          , n = (r.loaded ? r.loaded.duration : 0) + t.frag.duration;
                        r.loaded = {
                            bytes: i,
                            duration: n
                        },
                        r.realBitrate = Math.round(8 * i / n)
                    }
                    if (t.frag.bitrateTest) {
                        var o = t.stats;
                        o.tparsed = o.tbuffered = o.tload,
                        this.onFragBuffered(t)
                    }
                }
            }
            ,
            e.prototype.onFragBuffered = function(t) {
                var e = t.stats
                  , r = t.frag;
                if (!(!0 === e.aborted || "main" !== r.type || isNaN(r.sn) || r.bitrateTest && e.tload !== e.tbuffered)) {
                    var i = e.tparsed - e.trequest;
                    l.b.log("latency/loading/parsing/append/kbps:" + Math.round(e.tfirst - e.trequest) + "/" + Math.round(e.tload - e.tfirst) + "/" + Math.round(e.tparsed - e.tload) + "/" + Math.round(e.tbuffered - e.tparsed) + "/" + Math.round(8 * e.loaded / (e.tbuffered - e.trequest))),
                    this._bwEstimator.sample(i, e.loaded),
                    e.bwEstimate = this._bwEstimator.getEstimate(),
                    r.bitrateTest ? this.bitrateTestDelay = i / 1e3 : this.bitrateTestDelay = 0
                }
            }
            ,
            e.prototype.onError = function(t) {
                switch (t.details) {
                case c.a.FRAG_LOAD_ERROR:
                case c.a.FRAG_LOAD_TIMEOUT:
                    this.clearTimer()
                }
            }
            ,
            e.prototype.clearTimer = function() {
                clearInterval(this.timer),
                this.timer = null
            }
            ,
            e.prototype._findBestLevel = function(t, e, r, i, n, o, a, s, u) {
                for (var c = n; c >= i; c--) {
                    var h = u[c]
                      , f = h.details
                      , d = f ? f.totalduration / f.fragments.length : e
                      , p = !!f && f.live
                      , y = void 0;
                    y = c <= t ? a * r : s * r;
                    var g = u[c].realBitrate ? Math.max(u[c].realBitrate, u[c].bitrate) : u[c].bitrate
                      , v = g * d / y;
                    if (l.b.trace("level/adjustedbw/bitrate/avgDuration/maxFetchDuration/fetchDuration: " + c + "/" + Math.round(y) + "/" + g + "/" + d + "/" + o + "/" + v),
                    y > g && (!v || p && !this.bitrateTestDelay || v < o) && (c < t || o > this.hls.config.abrBandWidthUpCacheTime))
                        return c
                }
                return -1
            }
            ,
            f(e, [{
                key: "nextAutoLevel",
                get: function() {
                    var t = this._nextAutoLevel
                      , e = this._bwEstimator;
                    if (!(-1 === t || e && e.canEstimate()))
                        return t;
                    var r = this._nextABRAutoLevel;
                    return -1 !== t && (r = Math.min(t, r)),
                    r
                },
                set: function(t) {
                    this._nextAutoLevel = t
                }
            }, {
                key: "_nextABRAutoLevel",
                get: function() {
                    var t = this.hls
                      , e = t.maxAutoLevel
                      , r = t.levels
                      , i = t.config
                      , n = t.minAutoLevel
                      , o = t.media
                      , a = this.lastLoadedFragLevel
                      , s = this.fragCurrent ? this.fragCurrent.duration : 0
                      , c = o ? o.currentTime : 0
                      , h = o && 0 !== o.playbackRate ? Math.abs(o.playbackRate) : 1
                      , f = this._bwEstimator ? this._bwEstimator.getEstimate() : i.abrEwmaDefaultEstimate
                      , d = (u.a.bufferInfo(o, c, i.maxBufferHole).end - c) / h
                      , p = this._findBestLevel(a, s, f, n, e, d, i.abrBandWidthFactor, i.abrBandWidthUpFactor, r);
                    if (p >= 0)
                        return p;
                    l.b.trace("rebuffering expected to happen, lets try to find a quality level minimizing the rebuffering");
                    var y = s ? Math.min(s, i.maxStarvationDelay) : i.maxStarvationDelay
                      , g = i.abrBandWidthFactor
                      , v = i.abrBandWidthUpFactor;
                    if (0 === d) {
                        var m = this.bitrateTestDelay;
                        if (m) {
                            y = (s ? Math.min(s, i.maxLoadingDelay) : i.maxLoadingDelay) - m,
                            l.b.trace("bitrate test took " + Math.round(1e3 * m) + "ms, set first fragment max fetchDuration to " + Math.round(1e3 * y) + " ms"),
                            g = v = 1
                        }
                    }
                    return p = this._findBestLevel(a, s, f, n, e, d + y, g, v, r),
                    Math.max(p, 0)
                }
            }]),
            e
        }(s.a);
        e.a = d
    }
    , function(t, e, r) {
        "use strict";
        function i(t, e) {
            if (!(t instanceof e))
                throw new TypeError("Cannot call a class as a function")
        }
        var n = r(117)
          , o = function() {
            function t(e, r, o, a) {
                i(this, t),
                this.hls = e,
                this.defaultEstimate_ = a,
                this.minWeight_ = .001,
                this.minDelayMs_ = 50,
                this.slow_ = new n.a(r),
                this.fast_ = new n.a(o)
            }
            return t.prototype.sample = function(t, e) {
                t = Math.max(t, this.minDelayMs_);
                var r = 8e3 * e / t
                  , i = t / 1e3;
                this.fast_.sample(i, r),
                this.slow_.sample(i, r)
            }
            ,
            t.prototype.canEstimate = function() {
                var t = this.fast_;
                return t && t.getTotalWeight() >= this.minWeight_
            }
            ,
            t.prototype.getEstimate = function() {
                return this.canEstimate() ? Math.min(this.fast_.getEstimate(), this.slow_.getEstimate()) : this.defaultEstimate_
            }
            ,
            t.prototype.destroy = function() {}
            ,
            t
        }();
        e.a = o
    }
    , function(t, e, r) {
        "use strict";
        function i(t, e) {
            if (!(t instanceof e))
                throw new TypeError("Cannot call a class as a function")
        }
        var n = function() {
            function t(e) {
                i(this, t),
                this.alpha_ = e ? Math.exp(Math.log(.5) / e) : 0,
                this.estimate_ = 0,
                this.totalWeight_ = 0
            }
            return t.prototype.sample = function(t, e) {
                var r = Math.pow(this.alpha_, t);
                this.estimate_ = e * (1 - r) + r * this.estimate_,
                this.totalWeight_ += t
            }
            ,
            t.prototype.getTotalWeight = function() {
                return this.totalWeight_
            }
            ,
            t.prototype.getEstimate = function() {
                if (this.alpha_) {
                    var t = 1 - Math.pow(this.alpha_, this.totalWeight_);
                    return this.estimate_ / t
                }
                return this.estimate_
            }
            ,
            t
        }();
        e.a = n
    }
    , function(t, e, r) {
        "use strict";
        function i(t, e) {
            if (!(t instanceof e))
                throw new TypeError("Cannot call a class as a function")
        }
        function n(t, e) {
            if (!t)
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !e || "object" != typeof e && "function" != typeof e ? t : e
        }
        function o(t, e) {
            if ("function" != typeof e && null !== e)
                throw new TypeError("Super expression must either be null or a function, not " + typeof e);
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }),
            e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }
        var a = r(3)
          , s = r(5)
          , u = r(2)
          , c = r(4)
          , l = r(24)
          , h = Object(l.a)()
          , f = function(t) {
            function e(r) {
                i(this, e);
                var o = n(this, t.call(this, r, a.a.MEDIA_ATTACHING, a.a.MEDIA_DETACHING, a.a.MANIFEST_PARSED, a.a.BUFFER_RESET, a.a.BUFFER_APPENDING, a.a.BUFFER_CODECS, a.a.BUFFER_EOS, a.a.BUFFER_FLUSHING, a.a.LEVEL_PTS_UPDATED, a.a.LEVEL_UPDATED));
                return o._msDuration = null,
                o._levelDuration = null,
                o._live = null,
                o._objectUrl = null,
                o.onsbue = o.onSBUpdateEnd.bind(o),
                o.onsbe = o.onSBUpdateError.bind(o),
                o.pendingTracks = {},
                o.tracks = {},
                o
            }
            return o(e, t),
            e.prototype.destroy = function() {
                s.a.prototype.destroy.call(this)
            }
            ,
            e.prototype.onLevelPtsUpdated = function(t) {
                var e = t.type
                  , r = this.tracks.audio;
                if ("audio" === e && r && "audio/mpeg" === r.container) {
                    var i = this.sourceBuffer.audio;
                    if (Math.abs(i.timestampOffset - t.start) > .1) {
                        var n = i.updating;
                        try {
                            i.abort()
                        } catch (t) {
                            n = !0,
                            u.b.warn("can not abort audio buffer: " + t)
                        }
                        n ? this.audioTimestampOffset = t.start : (u.b.warn("change mpeg audio timestamp offset from " + i.timestampOffset + " to " + t.start),
                        i.timestampOffset = t.start)
                    }
                }
            }
            ,
            e.prototype.onManifestParsed = function(t) {
                var e = t.audio
                  , r = t.video || t.levels.length && t.altAudio
                  , i = 0;
                t.altAudio && (e || r) && (i = (e ? 1 : 0) + (r ? 1 : 0),
                u.b.log(i + " sourceBuffer(s) expected")),
                this.sourceBufferNb = i
            }
            ,
            e.prototype.onMediaAttaching = function(t) {
                var e = this.media = t.media;
                if (e) {
                    var r = this.mediaSource = new h;
                    this.onmso = this.onMediaSourceOpen.bind(this),
                    this.onmse = this.onMediaSourceEnded.bind(this),
                    this.onmsc = this.onMediaSourceClose.bind(this),
                    r.addEventListener("sourceopen", this.onmso),
                    r.addEventListener("sourceended", this.onmse),
                    r.addEventListener("sourceclose", this.onmsc),
                    e.src = URL.createObjectURL(r),
                    this._objectUrl = e.src
                }
            }
            ,
            e.prototype.onMediaDetaching = function() {
                u.b.log("media source detaching");
                var t = this.mediaSource;
                if (t) {
                    if ("open" === t.readyState)
                        try {
                            t.endOfStream()
                        } catch (t) {
                            u.b.warn("onMediaDetaching:" + t.message + " while calling endOfStream")
                        }
                    t.removeEventListener("sourceopen", this.onmso),
                    t.removeEventListener("sourceended", this.onmse),
                    t.removeEventListener("sourceclose", this.onmsc),
                    this.media && (URL.revokeObjectURL(this._objectUrl),
                    this.media.src === this._objectUrl ? (this.media.removeAttribute("src"),
                    this.media.load()) : u.b.warn("media.src was changed by a third party - skip cleanup")),
                    this.mediaSource = null,
                    this.media = null,
                    this._objectUrl = null,
                    this.pendingTracks = {},
                    this.tracks = {},
                    this.sourceBuffer = {},
                    this.flushRange = [],
                    this.segments = [],
                    this.appended = 0
                }
                this.onmso = this.onmse = this.onmsc = null,
                this.hls.trigger(a.a.MEDIA_DETACHED)
            }
            ,
            e.prototype.onMediaSourceOpen = function() {
                u.b.log("media source opened"),
                this.hls.trigger(a.a.MEDIA_ATTACHED, {
                    media: this.media
                });
                var t = this.mediaSource;
                t && t.removeEventListener("sourceopen", this.onmso),
                this.checkPendingTracks()
            }
            ,
            e.prototype.checkPendingTracks = function() {
                var t = this.pendingTracks
                  , e = Object.keys(t).length;
                e && (this.sourceBufferNb <= e || 0 === this.sourceBufferNb) && (this.createSourceBuffers(t),
                this.pendingTracks = {},
                this.doAppending())
            }
            ,
            e.prototype.onMediaSourceClose = function() {
                u.b.log("media source closed")
            }
            ,
            e.prototype.onMediaSourceEnded = function() {
                u.b.log("media source ended")
            }
            ,
            e.prototype.onSBUpdateEnd = function() {
                if (this.audioTimestampOffset) {
                    var t = this.sourceBuffer.audio;
                    u.b.warn("change mpeg audio timestamp offset from " + t.timestampOffset + " to " + this.audioTimestampOffset),
                    t.timestampOffset = this.audioTimestampOffset,
                    delete this.audioTimestampOffset
                }
                this._needsFlush && this.doFlush(),
                this._needsEos && this.checkEos(),
                this.appending = !1;
                var e = this.parent
                  , r = this.segments.reduce(function(t, r) {
                    return r.parent === e ? t + 1 : t
                }, 0)
                  , i = {}
                  , n = this.sourceBuffer;
                for (var o in n)
                    i[o] = n[o].buffered;
                this.hls.trigger(a.a.BUFFER_APPENDED, {
                    parent: e,
                    pending: r,
                    timeRanges: i
                }),
                this._needsFlush || this.doAppending(),
                this.updateMediaElementDuration()
            }
            ,
            e.prototype.onSBUpdateError = function(t) {
                u.b.error("sourceBuffer error:", t),
                this.hls.trigger(a.a.ERROR, {
                    type: c.b.MEDIA_ERROR,
                    details: c.a.BUFFER_APPENDING_ERROR,
                    fatal: !1
                })
            }
            ,
            e.prototype.onBufferReset = function() {
                var t = this.sourceBuffer;
                for (var e in t) {
                    var r = t[e];
                    try {
                        this.mediaSource.removeSourceBuffer(r),
                        r.removeEventListener("updateend", this.onsbue),
                        r.removeEventListener("error", this.onsbe)
                    } catch (t) {}
                }
                this.sourceBuffer = {},
                this.flushRange = [],
                this.segments = [],
                this.appended = 0
            }
            ,
            e.prototype.onBufferCodecs = function(t) {
                if (0 === Object.keys(this.sourceBuffer).length) {
                    for (var e in t)
                        this.pendingTracks[e] = t[e];
                    var r = this.mediaSource;
                    r && "open" === r.readyState && this.checkPendingTracks()
                }
            }
            ,
            e.prototype.createSourceBuffers = function(t) {
                var e = this.sourceBuffer
                  , r = this.mediaSource;
                for (var i in t)
                    if (!e[i]) {
                        var n = t[i]
                          , o = n.levelCodec || n.codec
                          , s = n.container + ";codecs=" + o;
                        u.b.log("creating sourceBuffer(" + s + ")");
                        try {
                            var l = e[i] = r.addSourceBuffer(s);
                            l.addEventListener("updateend", this.onsbue),
                            l.addEventListener("error", this.onsbe),
                            this.tracks[i] = {
                                codec: o,
                                container: n.container
                            },
                            n.buffer = l
                        } catch (t) {
                            u.b.error("error while trying to add sourceBuffer:" + t.message),
                            this.hls.trigger(a.a.ERROR, {
                                type: c.b.MEDIA_ERROR,
                                details: c.a.BUFFER_ADD_CODEC_ERROR,
                                fatal: !1,
                                err: t,
                                mimeType: s
                            })
                        }
                    }
                this.hls.trigger(a.a.BUFFER_CREATED, {
                    tracks: t
                })
            }
            ,
            e.prototype.onBufferAppending = function(t) {
                this._needsFlush || (this.segments ? this.segments.push(t) : this.segments = [t],
                this.doAppending())
            }
            ,
            e.prototype.onBufferAppendFail = function(t) {
                u.b.error("sourceBuffer error:", t.event),
                this.hls.trigger(a.a.ERROR, {
                    type: c.b.MEDIA_ERROR,
                    details: c.a.BUFFER_APPENDING_ERROR,
                    fatal: !1
                })
            }
            ,
            e.prototype.onBufferEos = function(t) {
                var e = this.sourceBuffer
                  , r = t.type;
                for (var i in e)
                    r && i !== r || e[i].ended || (e[i].ended = !0,
                    u.b.log(i + " sourceBuffer now EOS"));
                this.checkEos()
            }
            ,
            e.prototype.checkEos = function() {
                var t = this.sourceBuffer
                  , e = this.mediaSource;
                if (!e || "open" !== e.readyState)
                    return void (this._needsEos = !1);
                for (var r in t) {
                    var i = t[r];
                    if (!i.ended)
                        return;
                    if (i.updating)
                        return void (this._needsEos = !0)
                }
                u.b.log("all media data available, signal endOfStream() to MediaSource and stop loading fragment");
                try {
                    e.endOfStream()
                } catch (t) {
                    u.b.warn("exception while calling mediaSource.endOfStream()")
                }
                this._needsEos = !1
            }
            ,
            e.prototype.onBufferFlushing = function(t) {
                this.flushRange && (this.flushRange.push({
                    start: t.startOffset,
                    end: t.endOffset,
                    type: t.type
                }),
                this.flushBufferCounter = 0,
                this.doFlush())
            }
            ,
            e.prototype.onLevelUpdated = function(t) {
                var e = t.details;
                e.fragments.length > 0 && (this._levelDuration = e.totalduration + e.fragments[0].start,
                this._live = e.live,
                this.updateMediaElementDuration())
            }
            ,
            e.prototype.updateMediaElementDuration = function() {
                var t = this.hls.config
                  , e = void 0;
                if (null !== this._levelDuration && this.media && this.mediaSource && this.sourceBuffer && 0 !== this.media.readyState && "open" === this.mediaSource.readyState) {
                    for (var r in this.sourceBuffer)
                        if (!0 === this.sourceBuffer[r].updating)
                            return;
                    e = this.media.duration,
                    null === this._msDuration && (this._msDuration = this.mediaSource.duration),
                    !0 === this._live && !0 === t.liveDurationInfinity ? (u.b.log("Media Source duration is set to Infinity"),
                    this._msDuration = this.mediaSource.duration = 1 / 0) : (this._levelDuration > this._msDuration && this._levelDuration > e || e === 1 / 0 || isNaN(e)) && (u.b.log("Updating Media Source duration to " + this._levelDuration.toFixed(3)),
                    this._msDuration = this.mediaSource.duration = this._levelDuration)
                }
            }
            ,
            e.prototype.doFlush = function() {
                for (; this.flushRange.length; ) {
                    var t = this.flushRange[0];
                    if (!this.flushBuffer(t.start, t.end, t.type))
                        return void (this._needsFlush = !0);
                    this.flushRange.shift(),
                    this.flushBufferCounter = 0
                }
                if (0 === this.flushRange.length) {
                    this._needsFlush = !1;
                    var e = 0
                      , r = this.sourceBuffer;
                    try {
                        for (var i in r)
                            e += r[i].buffered.length
                    } catch (t) {
                        u.b.error("error while accessing sourceBuffer.buffered")
                    }
                    this.appended = e,
                    this.hls.trigger(a.a.BUFFER_FLUSHED)
                }
            }
            ,
            e.prototype.doAppending = function() {
                var t = this.hls
                  , e = this.sourceBuffer
                  , r = this.segments;
                if (Object.keys(e).length) {
                    if (this.media.error)
                        return this.segments = [],
                        void u.b.error("trying to append although a media error occured, flush segment and abort");
                    if (this.appending)
                        return;
                    if (this.hls.media && this.mediaSource.duration && this.hls.config.hlsFrameChasing) {
                        var i = this.mediaSource.duration - this.hls.media.currentTime;
                        i <= this.hls.config.chasingFirstParagraph ? this.hls.media.playbackRate = 1 : i >= this.hls.config.chasingSecondParagraph ? this.hls.media.playbackRate = this.hls.config.chasingSecondSpeed : this.hls.media.playbackRate = this.hls.config.chasingFirstSpeed
                    }
                    if (r && r.length) {
                        var n = r.shift();
                        try {
                            var o = n.type
                              , s = e[o];
                            s ? s.updating ? r.unshift(n) : (s.ended = !1,
                            this.parent = n.parent,
                            s.appendBuffer(n.data),
                            this.appendError = 0,
                            this.appended++,
                            this.appending = !0) : this.onSBUpdateEnd()
                        } catch (e) {
                            u.b.error("error while trying to append buffer:" + e.message),
                            r.unshift(n);
                            var l = {
                                type: c.b.MEDIA_ERROR,
                                parent: n.parent
                            };
                            22 !== e.code ? (this.appendError ? this.appendError++ : this.appendError = 1,
                            l.details = c.a.BUFFER_APPEND_ERROR,
                            this.appendError > t.config.appendErrorMaxRetry ? (u.b.log("fail " + t.config.appendErrorMaxRetry + " times to append segment in sourceBuffer"),
                            r = [],
                            l.fatal = !0,
                            t.trigger(a.a.ERROR, l)) : (l.fatal = !1,
                            t.trigger(a.a.ERROR, l))) : (this.segments = [],
                            l.details = c.a.BUFFER_FULL_ERROR,
                            l.fatal = !1,
                            t.trigger(a.a.ERROR, l))
                        }
                    }
                }
            }
            ,
            e.prototype.flushBuffer = function(t, e, r) {
                var i = void 0
                  , n = void 0
                  , o = void 0
                  , a = void 0
                  , s = void 0
                  , c = void 0
                  , l = this.sourceBuffer;
                if (Object.keys(l).length) {
                    if (u.b.log("flushBuffer,pos/start/end: " + this.media.currentTime.toFixed(3) + "/" + t + "/" + e),
                    this.flushBufferCounter < this.appended) {
                        for (var h in l)
                            if (!r || h === r) {
                                if (i = l[h],
                                i.ended = !1,
                                i.updating)
                                    return u.b.warn("cannot flush, sb updating in progress"),
                                    !1;
                                try {
                                    for (n = 0; n < i.buffered.length; n++)
                                        if (o = i.buffered.start(n),
                                        a = i.buffered.end(n),
                                        -1 !== navigator.userAgent.toLowerCase().indexOf("firefox") && e === Number.POSITIVE_INFINITY ? (s = t,
                                        c = e) : (s = Math.max(o, t),
                                        c = Math.min(a, e)),
                                        Math.min(c, a) - s > .5)
                                            return this.flushBufferCounter++,
                                            u.b.log("flush " + h + " [" + s + "," + c + "], of [" + o + "," + a + "], pos:" + this.media.currentTime),
                                            i.remove(s, c),
                                            !1
                                } catch (t) {
                                    u.b.warn("exception while accessing sourcebuffer, it might have been removed from MediaSource")
                                }
                            }
                    } else
                        u.b.warn("abort flushing too many retries");
                    u.b.log("buffer flushed")
                }
                return !0
            }
            ,
            e
        }(s.a);
        e.a = f
    }
    , function(t, e, r) {
        "use strict";
        function i(t, e) {
            if (!(t instanceof e))
                throw new TypeError("Cannot call a class as a function")
        }
        function n(t, e) {
            if (!t)
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !e || "object" != typeof e && "function" != typeof e ? t : e
        }
        function o(t, e) {
            if ("function" != typeof e && null !== e)
                throw new TypeError("Super expression must either be null or a function, not " + typeof e);
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }),
            e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }
        var a = r(3)
          , s = r(5)
          , u = function() {
            function t(t, e) {
                for (var r = 0; r < e.length; r++) {
                    var i = e[r];
                    i.enumerable = i.enumerable || !1,
                    i.configurable = !0,
                    "value"in i && (i.writable = !0),
                    Object.defineProperty(t, i.key, i)
                }
            }
            return function(e, r, i) {
                return r && t(e.prototype, r),
                i && t(e, i),
                e
            }
        }()
          , c = function(t) {
            function e(r) {
                i(this, e);
                var o = n(this, t.call(this, r, a.a.FPS_DROP_LEVEL_CAPPING, a.a.MEDIA_ATTACHING, a.a.MANIFEST_PARSED, a.a.BUFFER_CODECS));
                return o.autoLevelCapping = Number.POSITIVE_INFINITY,
                o.firstLevel = null,
                o.levels = [],
                o.media = null,
                o.restrictedLevels = [],
                o.timer = null,
                o
            }
            return o(e, t),
            e.prototype.destroy = function() {
                this.hls.config.capLevelToPlayerSize && (this.media = null,
                this._stopCapping())
            }
            ,
            e.prototype.onFpsDropLevelCapping = function(t) {
                e.isLevelAllowed(t.droppedLevel, this.restrictedLevels) && this.restrictedLevels.push(t.droppedLevel)
            }
            ,
            e.prototype.onMediaAttaching = function(t) {
                this.media = t.media instanceof HTMLVideoElement ? t.media : null
            }
            ,
            e.prototype.onManifestParsed = function(t) {
                var e = this.hls;
                this.restrictedLevels = [],
                this.levels = t.levels,
                this.firstLevel = t.firstLevel,
                e.config.capLevelToPlayerSize && (t.video || t.levels.length && t.altAudio) && this._startCapping()
            }
            ,
            e.prototype.onBufferCodecs = function(t) {
                this.hls.config.capLevelToPlayerSize && t.video && this._startCapping()
            }
            ,
            e.prototype.onLevelsUpdated = function(t) {
                this.levels = t.levels
            }
            ,
            e.prototype.detectPlayerSize = function() {
                if (this.media) {
                    var t = this.levels ? this.levels.length : 0;
                    if (t) {
                        var e = this.hls;
                        e.autoLevelCapping = this.getMaxLevel(t - 1),
                        e.autoLevelCapping > this.autoLevelCapping && e.streamController.nextLevelSwitch(),
                        this.autoLevelCapping = e.autoLevelCapping
                    }
                }
            }
            ,
            e.prototype.getMaxLevel = function(t) {
                var r = this;
                if (!this.levels)
                    return -1;
                var i = this.levels.filter(function(i, n) {
                    return e.isLevelAllowed(n, r.restrictedLevels) && n <= t
                });
                return e.getMaxLevelByMediaSize(i, this.mediaWidth, this.mediaHeight)
            }
            ,
            e.prototype._startCapping = function() {
                this.timer || (this.autoLevelCapping = Number.POSITIVE_INFINITY,
                this.hls.firstLevel = this.getMaxLevel(this.firstLevel),
                clearInterval(this.timer),
                this.timer = setInterval(this.detectPlayerSize.bind(this), 1e3),
                this.detectPlayerSize())
            }
            ,
            e.prototype._stopCapping = function() {
                this.restrictedLevels = [],
                this.firstLevel = null,
                this.autoLevelCapping = Number.POSITIVE_INFINITY,
                this.timer && (this.timer = clearInterval(this.timer),
                this.timer = null)
            }
            ,
            e.isLevelAllowed = function(t) {
                return -1 === (arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : []).indexOf(t)
            }
            ,
            e.getMaxLevelByMediaSize = function(t, e, r) {
                if (!t || t && !t.length)
                    return -1;
                for (var i = t.length - 1, n = 0; n < t.length; n += 1) {
                    var o = t[n];
                    if ((o.width >= e || o.height >= r) && function(t, e) {
                        return !e || (t.width !== e.width || t.height !== e.height)
                    }(o, t[n + 1])) {
                        i = n;
                        break
                    }
                }
                return i
            }
            ,
            u(e, [{
                key: "mediaWidth",
                get: function() {
                    var t = void 0
                      , r = this.media;
                    return r && (t = r.width || r.clientWidth || r.offsetWidth,
                    t *= e.contentScaleFactor),
                    t
                }
            }, {
                key: "mediaHeight",
                get: function() {
                    var t = void 0
                      , r = this.media;
                    return r && (t = r.height || r.clientHeight || r.offsetHeight,
                    t *= e.contentScaleFactor),
                    t
                }
            }], [{
                key: "contentScaleFactor",
                get: function() {
                    var t = 1;
                    try {
                        t = window.devicePixelRatio
                    } catch (t) {}
                    return t
                }
            }]),
            e
        }(s.a);
        e.a = c
    }
    , function(t, e, r) {
        "use strict";
        function i(t, e) {
            if (!(t instanceof e))
                throw new TypeError("Cannot call a class as a function")
        }
        function n(t, e) {
            if (!t)
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !e || "object" != typeof e && "function" != typeof e ? t : e
        }
        function o(t, e) {
            if ("function" != typeof e && null !== e)
                throw new TypeError("Super expression must either be null or a function, not " + typeof e);
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }),
            e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }
        var a = r(3)
          , s = r(5)
          , u = r(2)
          , c = function(t) {
            function e(r) {
                return i(this, e),
                n(this, t.call(this, r, a.a.MEDIA_ATTACHING))
            }
            return o(e, t),
            e.prototype.destroy = function() {
                this.timer && clearInterval(this.timer),
                this.isVideoPlaybackQualityAvailable = !1
            }
            ,
            e.prototype.onMediaAttaching = function(t) {
                var e = this.hls.config;
                if (e.capLevelOnFPSDrop) {
                    "function" == typeof (this.video = t.media instanceof HTMLVideoElement ? t.media : null).getVideoPlaybackQuality && (this.isVideoPlaybackQualityAvailable = !0),
                    clearInterval(this.timer),
                    this.timer = setInterval(this.checkFPSInterval.bind(this), e.fpsDroppedMonitoringPeriod)
                }
            }
            ,
            e.prototype.checkFPS = function(t, e, r) {
                var i = performance.now();
                if (e) {
                    if (this.lastTime) {
                        var n = i - this.lastTime
                          , o = r - this.lastDroppedFrames
                          , s = e - this.lastDecodedFrames
                          , c = 1e3 * o / n
                          , l = this.hls;
                        if (l.trigger(a.a.FPS_DROP, {
                            currentDropped: o,
                            currentDecoded: s,
                            totalDroppedFrames: r
                        }),
                        c > 0 && o > l.config.fpsDroppedMonitoringThreshold * s) {
                            var h = l.currentLevel;
                            u.b.warn("drop FPS ratio greater than max allowed value for currentLevel: " + h),
                            h > 0 && (-1 === l.autoLevelCapping || l.autoLevelCapping >= h) && (h -= 1,
                            l.trigger(a.a.FPS_DROP_LEVEL_CAPPING, {
                                level: h,
                                droppedLevel: l.currentLevel
                            }),
                            l.autoLevelCapping = h,
                            l.streamController.nextLevelSwitch())
                        }
                    }
                    this.lastTime = i,
                    this.lastDroppedFrames = r,
                    this.lastDecodedFrames = e
                }
            }
            ,
            e.prototype.checkFPSInterval = function() {
                var t = this.video;
                if (t)
                    if (this.isVideoPlaybackQualityAvailable) {
                        var e = t.getVideoPlaybackQuality();
                        this.checkFPS(t, e.totalVideoFrames, e.droppedVideoFrames)
                    } else
                        this.checkFPS(t, t.webkitDecodedFrameCount, t.webkitDroppedFrameCount)
            }
            ,
            e
        }(s.a);
        e.a = c
    }
    , function(t, e, r) {
        "use strict";
        function i(t, e) {
            if (!(t instanceof e))
                throw new TypeError("Cannot call a class as a function")
        }
        var n = r(2)
          , o = function() {
            function t(e) {
                i(this, t),
                e && e.xhrSetup && (this.xhrSetup = e.xhrSetup)
            }
            return t.prototype.destroy = function() {
                this.abort(),
                this.loader = null
            }
            ,
            t.prototype.abort = function() {
                var t = this.loader;
                t && 4 !== t.readyState && (this.stats.aborted = !0,
                t.abort()),
                window.clearTimeout(this.requestTimeout),
                this.requestTimeout = null,
                window.clearTimeout(this.retryTimeout),
                this.retryTimeout = null
            }
            ,
            t.prototype.load = function(t, e, r) {
                this.context = t,
                this.config = e,
                this.callbacks = r,
                this.retryDelay = e.retryDelay,
                this.reload()
            }
            ,
            t.prototype.reload = function() {
                this.stats = {
                    trequest: performance.now(),
                    retry: 0
                },
                this.loadInternal()
            }
            ,
            t.prototype.loadInternal = function() {
                var t = void 0
                  , e = this.context;
                t = this.loader = new XMLHttpRequest;
                var r = this.stats;
                r.tfirst = 0,
                r.loaded = 0;
                var i = this.xhrSetup;
                try {
                    if (i)
                        try {
                            i(t, e.url)
                        } catch (r) {
                            t.open("GET", e.url, !0),
                            i(t, e.url)
                        }
                    t.readyState || t.open("GET", e.url, !0)
                } catch (r) {
                    return void this.callbacks.onError({
                        code: t.status,
                        text: r.message
                    }, e, t)
                }
                e.rangeEnd && t.setRequestHeader("Range", "bytes=" + e.rangeStart + "-" + (e.rangeEnd - 1)),
                t.onreadystatechange = this.readystatechange.bind(this),
                t.onprogress = this.loadprogress.bind(this),
                t.responseType = e.responseType,
                this.requestTimeout = window.setTimeout(this.loadtimeout.bind(this), this.config.timeout),
                t.send()
            }
            ,
            t.prototype.readystatechange = function(t) {
                var e = t.currentTarget
                  , r = e.readyState
                  , i = this.stats
                  , o = this.context
                  , a = this.config;
                if (!i.aborted && r >= 2)
                    if (window.clearTimeout(this.requestTimeout),
                    0 === i.tfirst && (i.tfirst = Math.max(performance.now(), i.trequest)),
                    4 === r) {
                        var s = e.status;
                        if (s >= 200 && s < 300) {
                            i.tload = Math.max(i.tfirst, performance.now());
                            var u = void 0
                              , c = void 0;
                            "arraybuffer" === o.responseType ? (u = e.response,
                            c = u.byteLength) : (u = e.responseText,
                            c = u.length),
                            i.loaded = i.total = c;
                            var l = {
                                url: e.responseURL,
                                data: u
                            };
                            this.callbacks.onSuccess(l, i, o, e)
                        } else
                            i.retry >= a.maxRetry || s >= 400 && s < 499 ? (n.b.error(s + " while loading " + o.url),
                            this.callbacks.onError({
                                code: s,
                                text: e.statusText
                            }, o, e)) : (n.b.warn(s + " while loading " + o.url + ", retrying in " + this.retryDelay + "..."),
                            this.destroy(),
                            this.retryTimeout = window.setTimeout(this.loadInternal.bind(this), this.retryDelay),
                            this.retryDelay = Math.min(2 * this.retryDelay, a.maxRetryDelay),
                            i.retry++)
                    } else
                        this.requestTimeout = window.setTimeout(this.loadtimeout.bind(this), a.timeout)
            }
            ,
            t.prototype.loadtimeout = function() {
                n.b.warn("timeout while loading " + this.context.url),
                this.callbacks.onTimeout(this.stats, this.context, null)
            }
            ,
            t.prototype.loadprogress = function(t) {
                var e = t.currentTarget
                  , r = this.stats;
                r.loaded = t.loaded,
                t.lengthComputable && (r.total = t.total);
                var i = this.callbacks.onProgress;
                i && i(r, this.context, null, e)
            }
            ,
            t
        }();
        e.a = o
    }
    , function(t, e, r) {
        "use strict";
        function i(t, e) {
            if (!(t instanceof e))
                throw new TypeError("Cannot call a class as a function")
        }
        function n(t, e) {
            if (!t)
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !e || "object" != typeof e && "function" != typeof e ? t : e
        }
        function o(t, e) {
            if ("function" != typeof e && null !== e)
                throw new TypeError("Super expression must either be null or a function, not " + typeof e);
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }),
            e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }
        var a = r(3)
          , s = r(5)
          , u = r(2)
          , c = r(4)
          , l = function() {
            function t(t, e) {
                for (var r = 0; r < e.length; r++) {
                    var i = e[r];
                    i.enumerable = i.enumerable || !1,
                    i.configurable = !0,
                    "value"in i && (i.writable = !0),
                    Object.defineProperty(t, i.key, i)
                }
            }
            return function(e, r, i) {
                return r && t(e.prototype, r),
                i && t(e, i),
                e
            }
        }()
          , h = function(t) {
            function e(r) {
                i(this, e);
                var o = n(this, t.call(this, r, a.a.MANIFEST_LOADING, a.a.MANIFEST_PARSED, a.a.AUDIO_TRACK_LOADED, a.a.ERROR));
                return o.ticks = 0,
                o.ontick = o.tick.bind(o),
                o
            }
            return o(e, t),
            e.prototype.destroy = function() {
                this.cleanTimer(),
                s.a.prototype.destroy.call(this)
            }
            ,
            e.prototype.cleanTimer = function() {
                this.timer && (clearTimeout(this.timer),
                this.timer = null)
            }
            ,
            e.prototype.tick = function() {
                1 === ++this.ticks && (this.doTick(),
                this.ticks > 1 && setTimeout(this.tick, 1),
                this.ticks = 0)
            }
            ,
            e.prototype.doTick = function() {
                this.updateTrack(this.trackId)
            }
            ,
            e.prototype.onError = function(t) {
                t.fatal && t.type === c.b.NETWORK_ERROR && this.cleanTimer()
            }
            ,
            e.prototype.onManifestLoading = function() {
                this.tracks = [],
                this.trackId = -1
            }
            ,
            e.prototype.onManifestParsed = function(t) {
                var e = this
                  , r = t.audioTracks || []
                  , i = !1;
                this.tracks = r,
                this.hls.trigger(a.a.AUDIO_TRACKS_UPDATED, {
                    audioTracks: r
                });
                var n = 0;
                r.forEach(function(t) {
                    if (t.default && !i)
                        return e.audioTrack = n,
                        void (i = !0);
                    n++
                }),
                !1 === i && r.length && (u.b.log("no default audio track defined, use first audio track as default"),
                this.audioTrack = 0)
            }
            ,
            e.prototype.onAudioTrackLoaded = function(t) {
                t.id < this.tracks.length && (u.b.log("audioTrack " + t.id + " loaded"),
                this.tracks[t.id].details = t.details,
                t.details.live && !this.timer && (this.timer = setInterval(this.ontick, 1e3 * t.details.targetduration)),
                !t.details.live && this.timer && this.cleanTimer())
            }
            ,
            e.prototype.setAudioTrackInternal = function(t) {
                if (t >= 0 && t < this.tracks.length) {
                    this.cleanTimer(),
                    this.trackId = t,
                    u.b.log("switching to audioTrack " + t);
                    var e = this.tracks[t]
                      , r = this.hls
                      , i = e.type
                      , n = e.url
                      , o = {
                        id: t,
                        type: i,
                        url: n
                    };
                    r.trigger(a.a.AUDIO_TRACK_SWITCHING, o);
                    var s = e.details;
                    !n || void 0 !== s && !0 !== s.live || (u.b.log("(re)loading playlist for audioTrack " + t),
                    r.trigger(a.a.AUDIO_TRACK_LOADING, {
                        url: n,
                        id: t
                    }))
                }
            }
            ,
            e.prototype.updateTrack = function(t) {
                if (t >= 0 && t < this.tracks.length) {
                    this.cleanTimer(),
                    this.trackId = t,
                    u.b.log("updating audioTrack " + t);
                    var e = this.tracks[t]
                      , r = e.url
                      , i = e.details;
                    !r || void 0 !== i && !0 !== i.live || (u.b.log("(re)loading playlist for audioTrack " + t),
                    this.hls.trigger(a.a.AUDIO_TRACK_LOADING, {
                        url: r,
                        id: t
                    }))
                }
            }
            ,
            l(e, [{
                key: "audioTracks",
                get: function() {
                    return this.tracks
                }
            }, {
                key: "audioTrack",
                get: function() {
                    return this.trackId
                },
                set: function(t) {
                    this.trackId === t && void 0 !== this.tracks[t].details || this.setAudioTrackInternal(t)
                }
            }]),
            e
        }(s.a);
        e.a = h
    }
    , function(t, e, r) {
        "use strict";
        function i(t, e) {
            if (!(t instanceof e))
                throw new TypeError("Cannot call a class as a function")
        }
        function n(t, e) {
            if (!t)
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !e || "object" != typeof e && "function" != typeof e ? t : e
        }
        function o(t, e) {
            if ("function" != typeof e && null !== e)
                throw new TypeError("Super expression must either be null or a function, not " + typeof e);
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }),
            e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }
        var a = r(16)
          , s = r(21)
          , u = r(58)
          , c = r(3)
          , l = r(62)
          , h = r(63)
          , f = r(4)
          , d = r(2)
          , p = r(64)
          , y = r(25)
          , g = r(20)
          , v = r(18)
          , m = function() {
            function t(t, e) {
                for (var r = 0; r < e.length; r++) {
                    var i = e[r];
                    i.enumerable = i.enumerable || !1,
                    i.configurable = !0,
                    "value"in i && (i.writable = !0),
                    Object.defineProperty(t, i.key, i)
                }
            }
            return function(e, r, i) {
                return r && t(e.prototype, r),
                i && t(e, i),
                e
            }
        }()
          , b = {
            STOPPED: "STOPPED",
            STARTING: "STARTING",
            IDLE: "IDLE",
            PAUSED: "PAUSED",
            KEY_LOADING: "KEY_LOADING",
            FRAG_LOADING: "FRAG_LOADING",
            FRAG_LOADING_WAITING_RETRY: "FRAG_LOADING_WAITING_RETRY",
            WAITING_TRACK: "WAITING_TRACK",
            PARSING: "PARSING",
            PARSED: "PARSED",
            BUFFER_FLUSHING: "BUFFER_FLUSHING",
            ENDED: "ENDED",
            ERROR: "ERROR",
            WAITING_INIT_PTS: "WAITING_INIT_PTS"
        }
          , S = function(t) {
            function e(r, o) {
                i(this, e);
                var a = n(this, t.call(this, r, c.a.MEDIA_ATTACHED, c.a.MEDIA_DETACHING, c.a.AUDIO_TRACKS_UPDATED, c.a.AUDIO_TRACK_SWITCHING, c.a.AUDIO_TRACK_LOADED, c.a.KEY_LOADED, c.a.FRAG_LOADED, c.a.FRAG_PARSING_INIT_SEGMENT, c.a.FRAG_PARSING_DATA, c.a.FRAG_PARSED, c.a.ERROR, c.a.BUFFER_RESET, c.a.BUFFER_CREATED, c.a.BUFFER_APPENDED, c.a.BUFFER_FLUSHED, c.a.INIT_PTS_FOUND));
                return a.fragmentTracker = o,
                a.config = r.config,
                a.audioCodecSwap = !1,
                a._state = b.STOPPED,
                a.initPTS = [],
                a.waitingFragment = null,
                a.videoTrackCC = null,
                a
            }
            return o(e, t),
            e.prototype.onHandlerDestroying = function() {
                this.stopLoad()
            }
            ,
            e.prototype.onHandlerDestroyed = function() {
                this.state = b.STOPPED,
                this.fragmentTracker = null
            }
            ,
            e.prototype.onInitPtsFound = function(t) {
                var e = t.id
                  , r = t.frag.cc
                  , i = t.initPTS;
                "main" === e && (this.initPTS[r] = i,
                this.videoTrackCC = r,
                d.b.log("InitPTS for cc: " + r + " found from video track: " + i),
                this.state === b.WAITING_INIT_PTS && this.tick())
            }
            ,
            e.prototype.startLoad = function(t) {
                if (this.tracks) {
                    var e = this.lastCurrentTime;
                    this.stopLoad(),
                    this.setInterval(100),
                    this.fragLoadError = 0,
                    e > 0 && -1 === t ? (d.b.log("audio:override startPosition with lastCurrentTime @" + e.toFixed(3)),
                    this.state = b.IDLE) : (this.lastCurrentTime = this.startPosition ? this.startPosition : t,
                    this.state = b.STARTING),
                    this.nextLoadPosition = this.startPosition = this.lastCurrentTime,
                    this.tick()
                } else
                    this.startPosition = t,
                    this.state = b.STOPPED
            }
            ,
            e.prototype.stopLoad = function() {
                var t = this.fragCurrent;
                t && (t.loader && t.loader.abort(),
                this.fragmentTracker.removeFragment(t)),
                this.demuxer && (this.demuxer.destroy(),
                this.demuxer = null),
                this.fragCurrent = null,
                this.fragPrevious = null,
                this.clearInterval(),
                this.clearNextTick(),
                this.state = b.STOPPED
            }
            ,
            e.prototype.doTick = function() {
                var t = void 0
                  , e = void 0
                  , r = void 0
                  , i = this.hls
                  , n = i.config;
                switch (this.state) {
                case b.ERROR:
                case b.PAUSED:
                case b.BUFFER_FLUSHING:
                    break;
                case b.STARTING:
                    this.state = b.WAITING_TRACK,
                    this.loadedmetadata = !1;
                    break;
                case b.IDLE:
                    var o = this.tracks;
                    if (!o)
                        break;
                    if (!this.media && (this.startFragRequested || !n.startFragPrefetch))
                        break;
                    if (this.loadedmetadata)
                        t = this.media.currentTime;
                    else if (void 0 === (t = this.nextLoadPosition))
                        break;
                    var u = this.mediaBuffer ? this.mediaBuffer : this.media
                      , l = this.videoBuffer ? this.videoBuffer : this.media
                      , h = s.a.bufferInfo(u, t, n.maxBufferHole)
                      , f = s.a.bufferInfo(l, t, n.maxBufferHole)
                      , y = h.len
                      , v = h.end
                      , m = this.fragPrevious
                      , S = Math.min(n.maxBufferLength, n.maxMaxBufferLength)
                      , E = Math.max(S, f.len)
                      , T = this.audioSwitch
                      , _ = this.trackId;
                    if ((y < E || T) && _ < o.length) {
                        if (void 0 === (r = o[_].details)) {
                            this.state = b.WAITING_TRACK;
                            break
                        }
                        if (!T && !r.live && m && m.sn === r.endSN && !h.nextStart && (!this.media.seeking || this.media.duration - v < m.duration / 2)) {
                            this.hls.trigger(c.a.BUFFER_EOS, {
                                type: "audio"
                            }),
                            this.state = b.ENDED;
                            break
                        }
                        var w = r.fragments
                          , A = w.length
                          , R = w[0].start
                          , D = w[A - 1].start + w[A - 1].duration
                          , L = void 0;
                        if (T)
                            if (r.live && !r.PTSKnown)
                                d.b.log("switching audiotrack, live stream, unknown PTS,load first fragment"),
                                v = 0;
                            else if (v = t,
                            r.PTSKnown && t < R) {
                                if (!(h.end > R || h.nextStart))
                                    return;
                                d.b.log("alt audio track ahead of main track, seek to start of alt audio track"),
                                this.media.currentTime = R + .05
                            }
                        if (r.initSegment && !r.initSegment.data)
                            L = r.initSegment;
                        else if (v <= R) {
                            if (L = w[0],
                            null !== this.videoTrackCC && L.cc !== this.videoTrackCC && (L = Object(p.b)(w, this.videoTrackCC)),
                            r.live && L.loadIdx && L.loadIdx === this.fragLoadIdx) {
                                var k = h.nextStart ? h.nextStart : R;
                                return d.b.log("no alt audio available @currentTime:" + this.media.currentTime + ", seeking @" + (k + .05)),
                                void (this.media.currentTime = k + .05)
                            }
                        } else {
                            var O = void 0
                              , x = n.maxFragLookUpTolerance
                              , I = m ? w[m.sn - w[0].sn + 1] : void 0
                              , C = function(t) {
                                var e = Math.min(x, t.duration);
                                return t.start + t.duration - e <= v ? 1 : t.start - e > v && t.start ? -1 : 0
                            };
                            v < D ? (v > D - x && (x = 0),
                            O = I && !C(I) ? I : a.a.search(w, C)) : O = w[A - 1],
                            O && (L = O,
                            R = O.start,
                            m && L.level === m.level && L.sn === m.sn && (L.sn < r.endSN ? (L = w[L.sn + 1 - r.startSN],
                            d.b.log("SN just loaded, load next one: " + L.sn)) : L = null))
                        }
                        L && (L.encrypted ? (d.b.log("Loading key for " + L.sn + " of [" + r.startSN + " ," + r.endSN + "],track " + _),
                        this.state = b.KEY_LOADING,
                        i.trigger(c.a.KEY_LOADING, {
                            frag: L
                        })) : (d.b.log("Loading " + L.sn + ", cc: " + L.cc + " of [" + r.startSN + " ," + r.endSN + "],track " + _ + ", currentTime:" + t + ",bufferEnd:" + v.toFixed(3)),
                        (T || this.fragmentTracker.getState(L) === g.a.NOT_LOADED) && (this.fragCurrent = L,
                        this.startFragRequested = !0,
                        isNaN(L.sn) || (this.nextLoadPosition = L.start + L.duration),
                        i.trigger(c.a.FRAG_LOADING, {
                            frag: L
                        }),
                        this.state = b.FRAG_LOADING)))
                    }
                    break;
                case b.WAITING_TRACK:
                    e = this.tracks[this.trackId],
                    e && e.details && (this.state = b.IDLE);
                    break;
                case b.FRAG_LOADING_WAITING_RETRY:
                    var P = performance.now()
                      , B = this.retryDate;
                    u = this.media;
                    var M = u && u.seeking;
                    (!B || P >= B || M) && (d.b.log("audioStreamController: retryDate reached, switch back to IDLE state"),
                    this.state = b.IDLE);
                    break;
                case b.WAITING_INIT_PTS:
                    var N = this.videoTrackCC;
                    if (void 0 === this.initPTS[N])
                        break;
                    var F = this.waitingFragment;
                    if (F) {
                        var U = F.frag.cc;
                        N !== U ? (e = this.tracks[this.trackId],
                        e.details && e.details.live && (d.b.warn("Waiting fragment CC (" + U + ") does not match video track CC (" + N + ")"),
                        this.waitingFragment = null,
                        this.state = b.IDLE)) : (this.state = b.FRAG_LOADING,
                        this.onFragLoaded(this.waitingFragment),
                        this.waitingFragment = null)
                    } else
                        this.state = b.IDLE;
                    break;
                case b.STOPPED:
                case b.FRAG_LOADING:
                case b.PARSING:
                case b.PARSED:
                case b.ENDED:
                }
            }
            ,
            e.prototype.onMediaAttached = function(t) {
                var e = this.media = this.mediaBuffer = t.media;
                this.onvseeking = this.onMediaSeeking.bind(this),
                this.onvended = this.onMediaEnded.bind(this),
                e.addEventListener("seeking", this.onvseeking),
                e.addEventListener("ended", this.onvended);
                var r = this.config;
                this.tracks && r.autoStartLoad && this.startLoad(r.startPosition)
            }
            ,
            e.prototype.onMediaDetaching = function() {
                var t = this.media;
                t && t.ended && (d.b.log("MSE detaching and video ended, reset startPosition"),
                this.startPosition = this.lastCurrentTime = 0),
                t && (t.removeEventListener("seeking", this.onvseeking),
                t.removeEventListener("ended", this.onvended),
                this.onvseeking = this.onvseeked = this.onvended = null),
                this.media = this.mediaBuffer = this.videoBuffer = null,
                this.loadedmetadata = !1,
                this.stopLoad()
            }
            ,
            e.prototype.onMediaSeeking = function() {
                this.state === b.ENDED && (this.state = b.IDLE),
                this.media && (this.lastCurrentTime = this.media.currentTime),
                this.tick()
            }
            ,
            e.prototype.onMediaEnded = function() {
                this.startPosition = this.lastCurrentTime = 0
            }
            ,
            e.prototype.onAudioTracksUpdated = function(t) {
                d.b.log("audio tracks updated"),
                this.tracks = t.audioTracks
            }
            ,
            e.prototype.onAudioTrackSwitching = function(t) {
                var e = !!t.url;
                this.trackId = t.id,
                this.fragCurrent = null,
                this.state = b.PAUSED,
                this.waitingFragment = null,
                e ? this.setInterval(100) : this.demuxer && (this.demuxer.destroy(),
                this.demuxer = null),
                e && (this.audioSwitch = !0,
                this.state = b.IDLE),
                this.tick()
            }
            ,
            e.prototype.onAudioTrackLoaded = function(t) {
                var e = t.details
                  , r = t.id
                  , i = this.tracks[r]
                  , n = e.totalduration
                  , o = 0;
                if (d.b.log("track " + r + " loaded [" + e.startSN + "," + e.endSN + "],duration:" + n),
                e.live) {
                    var a = i.details;
                    a && e.fragments.length > 0 ? (l.a(a, e),
                    o = e.fragments[0].start,
                    e.PTSKnown ? d.b.log("live audio playlist sliding:" + o.toFixed(3)) : d.b.log("live audio playlist - outdated PTS, unknown sliding")) : (e.PTSKnown = !1,
                    d.b.log("live audio playlist - first load, unknown sliding"))
                } else
                    e.PTSKnown = !1;
                if (i.details = e,
                !this.startFragRequested) {
                    if (-1 === this.startPosition) {
                        var s = e.startTimeOffset;
                        isNaN(s) ? this.startPosition = 0 : (d.b.log("start time offset found in playlist, adjust startPosition to " + s),
                        this.startPosition = s)
                    }
                    this.nextLoadPosition = this.startPosition
                }
                this.state === b.WAITING_TRACK && (this.state = b.IDLE),
                this.tick()
            }
            ,
            e.prototype.onKeyLoaded = function() {
                this.state === b.KEY_LOADING && (this.state = b.IDLE,
                this.tick())
            }
            ,
            // 第五个 onFragLoaded 跳转
            e.prototype.onFragLoaded = function(t) {
                var e = this.fragCurrent
                  , r = t.frag;
                if (this.state === b.FRAG_LOADING && e && "audio" === r.type && r.level === e.level && r.sn === e.sn) {
                    var i = this.tracks[this.trackId]
                      , n = i.details
                      , o = n.totalduration
                      , a = e.level
                      , s = e.sn
                      , l = e.cc
                      , h = this.config.defaultAudioCodec || i.audioCodec || "mp4a.40.2"
                      , f = this.stats = t.stats;
                    if ("initSegment" === s)
                        this.state = b.IDLE,
                        f.tparsed = f.tbuffered = performance.now(),
                        n.initSegment.data = t.payload,
                        this.hls.trigger(c.a.FRAG_BUFFERED, {
                            stats: f,
                            frag: e,
                            id: "audio"
                        }),
                        this.tick();
                    else {
                        this.state = b.PARSING,
                        this.appended = !1,
                        this.demuxer || (this.demuxer = new u.a(this.hls,"audio"));
                        var p = this.initPTS[l]
                          , y = n.initSegment ? n.initSegment.data : [];
                        if (n.initSegment || void 0 !== p) {
                            this.pendingBuffering = !0,
                            d.b.log("Demuxing " + s + " of [" + n.startSN + " ," + n.endSN + "],track " + a);
                            this.demuxer.push(t.payload, y, h, null, e, o, !1, p)
                        } else
                            d.b.log("unknown video PTS for continuity counter " + l + ", waiting for video PTS before demuxing audio frag " + s + " of [" + n.startSN + " ," + n.endSN + "],track " + a),
                            this.waitingFragment = t,
                            this.state = b.WAITING_INIT_PTS
                    }
                }
                this.fragLoadError = 0
            }
            ,
            e.prototype.onFragParsingInitSegment = function(t) {
                var e = this.fragCurrent
                  , r = t.frag;
                if (e && "audio" === t.id && r.sn === e.sn && r.level === e.level && this.state === b.PARSING) {
                    var i = t.tracks
                      , n = void 0;
                    if (i.video && delete i.video,
                    n = i.audio) {
                        n.levelCodec = n.codec,
                        n.id = t.id,
                        this.hls.trigger(c.a.BUFFER_CODECS, i),
                        d.b.log("audio track:audio,container:" + n.container + ",codecs[level/parsed]=[" + n.levelCodec + "/" + n.codec + "]");
                        var o = n.initSegment;
                        if (o) {
                            var a = {
                                type: "audio",
                                data: o,
                                parent: "audio",
                                content: "initSegment"
                            };
                            this.audioSwitch ? this.pendingData = [a] : (this.appended = !0,
                            this.pendingBuffering = !0,
                            this.hls.trigger(c.a.BUFFER_APPENDING, a))
                        }
                        this.tick()
                    }
                }
            }
            ,
            e.prototype.onFragParsingData = function(t) {
                var e = this
                  , r = this.fragCurrent
                  , i = t.frag;
                if (r && "audio" === t.id && "audio" === t.type && i.sn === r.sn && i.level === r.level && this.state === b.PARSING) {
                    var n = this.trackId
                      , o = this.tracks[n]
                      , a = this.hls;
                    isNaN(t.endPTS) && (t.endPTS = t.startPTS + r.duration,
                    t.endDTS = t.startDTS + r.duration),
                    r.addElementaryStream(v.a.ElementaryStreamTypes.AUDIO),
                    d.b.log("parsed " + t.type + ",PTS:[" + t.startPTS.toFixed(3) + "," + t.endPTS.toFixed(3) + "],DTS:[" + t.startDTS.toFixed(3) + "/" + t.endDTS.toFixed(3) + "],nb:" + t.nb),
                    l.b(o.details, r, t.startPTS, t.endPTS);
                    var s = this.audioSwitch
                      , u = this.media
                      , h = !1;
                    if (s && u)
                        if (u.readyState) {
                            var p = u.currentTime;
                            d.b.log("switching audio track : currentTime:" + p),
                            p >= t.startPTS && (d.b.log("switching audio track : flushing all audio"),
                            this.state = b.BUFFER_FLUSHING,
                            a.trigger(c.a.BUFFER_FLUSHING, {
                                startOffset: 0,
                                endOffset: Number.POSITIVE_INFINITY,
                                type: "audio"
                            }),
                            h = !0,
                            this.audioSwitch = !1,
                            a.trigger(c.a.AUDIO_TRACK_SWITCHED, {
                                id: n
                            }))
                        } else
                            this.audioSwitch = !1,
                            a.trigger(c.a.AUDIO_TRACK_SWITCHED, {
                                id: n
                            });
                    var y = this.pendingData;
                    if (!y)
                        return console.warn("Apparently attempt to enqueue media payload without codec initialization data upfront"),
                        void a.trigger(c.a.ERROR, {
                            type: f.b.MEDIA_ERROR,
                            details: null,
                            fatal: !0
                        });
                    this.audioSwitch || ([t.data1, t.data2].forEach(function(e) {
                        e && e.length && y.push({
                            type: t.type,
                            data: e,
                            parent: "audio",
                            content: "data"
                        })
                    }),
                    !h && y.length && (y.forEach(function(t) {
                        e.state === b.PARSING && (e.pendingBuffering = !0,
                        e.hls.trigger(c.a.BUFFER_APPENDING, t))
                    }),
                    this.pendingData = [],
                    this.appended = !0)),
                    this.tick()
                }
            }
            ,
            e.prototype.onFragParsed = function(t) {
                var e = this.fragCurrent
                  , r = t.frag;
                e && "audio" === t.id && r.sn === e.sn && r.level === e.level && this.state === b.PARSING && (this.stats.tparsed = performance.now(),
                this.state = b.PARSED,
                this._checkAppendedParsed())
            }
            ,
            e.prototype.onBufferReset = function() {
                this.mediaBuffer = this.videoBuffer = null,
                this.loadedmetadata = !1
            }
            ,
            e.prototype.onBufferCreated = function(t) {
                var e = t.tracks.audio;
                e && (this.mediaBuffer = e.buffer,
                this.loadedmetadata = !0),
                t.tracks.video && (this.videoBuffer = t.tracks.video.buffer)
            }
            ,
            e.prototype.onBufferAppended = function(t) {
                if ("audio" === t.parent) {
                    var e = this.state;
                    e !== b.PARSING && e !== b.PARSED || (this.pendingBuffering = t.pending > 0,
                    this._checkAppendedParsed())
                }
            }
            ,
            e.prototype._checkAppendedParsed = function() {
                if (!(this.state !== b.PARSED || this.appended && this.pendingBuffering)) {
                    var t = this.fragCurrent
                      , e = this.stats
                      , r = this.hls;
                    if (t) {
                        this.fragPrevious = t,
                        e.tbuffered = performance.now(),
                        r.trigger(c.a.FRAG_BUFFERED, {
                            stats: e,
                            frag: t,
                            id: "audio"
                        });
                        var i = this.mediaBuffer ? this.mediaBuffer : this.media;
                        d.b.log("audio buffered : " + h.a.toString(i.buffered)),
                        this.audioSwitch && this.appended && (this.audioSwitch = !1,
                        r.trigger(c.a.AUDIO_TRACK_SWITCHED, {
                            id: this.trackId
                        })),
                        this.state = b.IDLE
                    }
                    this.tick()
                }
            }
            ,
            e.prototype.onError = function(t) {
                var e = t.frag;
                if (!e || "audio" === e.type)
                    switch (t.details) {
                    case f.a.FRAG_LOAD_ERROR:
                    case f.a.FRAG_LOAD_TIMEOUT:
                        if (!t.fatal) {
                            var r = this.fragLoadError;
                            r ? r++ : r = 1;
                            var i = this.config;
                            if (r <= i.fragLoadingMaxRetry) {
                                this.fragLoadError = r;
                                var n = Math.min(Math.pow(2, r - 1) * i.fragLoadingRetryDelay, i.fragLoadingMaxRetryTimeout);
                                d.b.warn("audioStreamController: frag loading failed, retry in " + n + " ms"),
                                this.retryDate = performance.now() + n,
                                this.state = b.FRAG_LOADING_WAITING_RETRY
                            } else
                                d.b.error("audioStreamController: " + t.details + " reaches max retry, redispatch as fatal ..."),
                                t.fatal = !0,
                                this.state = b.ERROR
                        }
                        break;
                    case f.a.AUDIO_TRACK_LOAD_ERROR:
                    case f.a.AUDIO_TRACK_LOAD_TIMEOUT:
                    case f.a.KEY_LOAD_ERROR:
                    case f.a.KEY_LOAD_TIMEOUT:
                        this.state !== b.ERROR && (this.state = t.fatal ? b.ERROR : b.IDLE,
                        d.b.warn("audioStreamController: " + t.details + " while loading frag,switch to " + this.state + " state ..."));
                        break;
                    case f.a.BUFFER_FULL_ERROR:
                        if ("audio" === t.parent && (this.state === b.PARSING || this.state === b.PARSED)) {
                            var o = this.mediaBuffer
                              , a = this.media.currentTime;
                            if (o && s.a.isBuffered(o, a) && s.a.isBuffered(o, a + .5)) {
                                var u = this.config;
                                u.maxMaxBufferLength >= u.maxBufferLength && (u.maxMaxBufferLength /= 2,
                                d.b.warn("audio:reduce max buffer length to " + u.maxMaxBufferLength + "s")),
                                this.state = b.IDLE
                            } else
                                d.b.warn("buffer full error also media.currentTime is not buffered, flush audio buffer"),
                                this.fragCurrent = null,
                                this.state = b.BUFFER_FLUSHING,
                                this.hls.trigger(c.a.BUFFER_FLUSHING, {
                                    startOffset: 0,
                                    endOffset: Number.POSITIVE_INFINITY,
                                    type: "audio"
                                })
                        }
                    }
            }
            ,
            e.prototype.onBufferFlushed = function() {
                var t = this
                  , e = this.pendingData;
                e && e.length ? (d.b.log("appending pending audio data on Buffer Flushed"),
                e.forEach(function(e) {
                    t.hls.trigger(c.a.BUFFER_APPENDING, e)
                }),
                this.appended = !0,
                this.pendingData = [],
                this.state = b.PARSED) : (this.state = b.IDLE,
                this.fragPrevious = null,
                this.tick())
            }
            ,
            m(e, [{
                key: "state",
                set: function(t) {
                    if (this.state !== t) {
                        var e = this.state;
                        this._state = t,
                        d.b.log("audio stream:" + e + "->" + t)
                    }
                },
                get: function() {
                    return this._state
                }
            }]),
            e
        }(y.a);
        e.a = S
    }
    , function(t, e, r) {
        "use strict";
        function i(t, e, r, i) {
            for (var o = void 0, a = void 0, s = void 0, u = void 0, c = void 0, l = window.VTTCue || window.TextTrackCue, h = 0; h < i.rows.length; h++)
                if (o = i.rows[h],
                s = !0,
                u = 0,
                c = "",
                !o.isEmpty()) {
                    for (var f = 0; f < o.chars.length; f++)
                        o.chars[f].uchar.match(/\s/) && s ? u++ : (c += o.chars[f].uchar,
                        s = !1);
                    o.cueStartTime = e,
                    e === r && (r += 1e-4),
                    a = new l(e,r,Object(n.b)(c.trim())),
                    u >= 16 ? u-- : u++,
                    navigator.userAgent.match(/Firefox\//) ? a.line = h + 1 : a.line = h > 7 ? h - 2 : h + 1,
                    a.align = "left",
                    a.position = Math.max(0, Math.min(100, u / 32 * 100 + (navigator.userAgent.match(/Firefox\//) ? 50 : 0))),
                    t.addCue(a)
                }
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        }),
        e.newCue = i;
        var n = r(66)
    }
    , function(t, e, r) {
        "use strict";
        e.a = function() {
            function t(t) {
                return "string" == typeof t && (!!o[t.toLowerCase()] && t.toLowerCase())
            }
            function e(t) {
                return "string" == typeof t && (!!a[t.toLowerCase()] && t.toLowerCase())
            }
            function r(t) {
                for (var e = 1; e < arguments.length; e++) {
                    var r = arguments[e];
                    for (var i in r)
                        t[i] = r[i]
                }
                return t
            }
            function i(i, o, a) {
                var s = this
                  , u = function() {
                    if ("undefined" != typeof navigator)
                        return /MSIE\s8\.0/.test(navigator.userAgent)
                }()
                  , c = {};
                u ? s = document.createElement("custom") : c.enumerable = !0,
                s.hasBeenReset = !1;
                var l = ""
                  , h = !1
                  , f = i
                  , d = o
                  , p = a
                  , y = null
                  , g = ""
                  , v = !0
                  , m = "auto"
                  , b = "start"
                  , S = 50
                  , E = "middle"
                  , T = 50
                  , _ = "middle";
                if (Object.defineProperty(s, "id", r({}, c, {
                    get: function() {
                        return l
                    },
                    set: function(t) {
                        l = "" + t
                    }
                })),
                Object.defineProperty(s, "pauseOnExit", r({}, c, {
                    get: function() {
                        return h
                    },
                    set: function(t) {
                        h = !!t
                    }
                })),
                Object.defineProperty(s, "startTime", r({}, c, {
                    get: function() {
                        return f
                    },
                    set: function(t) {
                        if ("number" != typeof t)
                            throw new TypeError("Start time must be set to a number.");
                        f = t,
                        this.hasBeenReset = !0
                    }
                })),
                Object.defineProperty(s, "endTime", r({}, c, {
                    get: function() {
                        return d
                    },
                    set: function(t) {
                        if ("number" != typeof t)
                            throw new TypeError("End time must be set to a number.");
                        d = t,
                        this.hasBeenReset = !0
                    }
                })),
                Object.defineProperty(s, "text", r({}, c, {
                    get: function() {
                        return p
                    },
                    set: function(t) {
                        p = "" + t,
                        this.hasBeenReset = !0
                    }
                })),
                Object.defineProperty(s, "region", r({}, c, {
                    get: function() {
                        return y
                    },
                    set: function(t) {
                        y = t,
                        this.hasBeenReset = !0
                    }
                })),
                Object.defineProperty(s, "vertical", r({}, c, {
                    get: function() {
                        return g
                    },
                    set: function(e) {
                        var r = t(e);
                        if (!1 === r)
                            throw new SyntaxError("An invalid or illegal string was specified.");
                        g = r,
                        this.hasBeenReset = !0
                    }
                })),
                Object.defineProperty(s, "snapToLines", r({}, c, {
                    get: function() {
                        return v
                    },
                    set: function(t) {
                        v = !!t,
                        this.hasBeenReset = !0
                    }
                })),
                Object.defineProperty(s, "line", r({}, c, {
                    get: function() {
                        return m
                    },
                    set: function(t) {
                        if ("number" != typeof t && t !== n)
                            throw new SyntaxError("An invalid number or illegal string was specified.");
                        m = t,
                        this.hasBeenReset = !0
                    }
                })),
                Object.defineProperty(s, "lineAlign", r({}, c, {
                    get: function() {
                        return b
                    },
                    set: function(t) {
                        var r = e(t);
                        if (!r)
                            throw new SyntaxError("An invalid or illegal string was specified.");
                        b = r,
                        this.hasBeenReset = !0
                    }
                })),
                Object.defineProperty(s, "position", r({}, c, {
                    get: function() {
                        return S
                    },
                    set: function(t) {
                        if (t < 0 || t > 100)
                            throw new Error("Position must be between 0 and 100.");
                        S = t,
                        this.hasBeenReset = !0
                    }
                })),
                Object.defineProperty(s, "positionAlign", r({}, c, {
                    get: function() {
                        return E
                    },
                    set: function(t) {
                        var r = e(t);
                        if (!r)
                            throw new SyntaxError("An invalid or illegal string was specified.");
                        E = r,
                        this.hasBeenReset = !0
                    }
                })),
                Object.defineProperty(s, "size", r({}, c, {
                    get: function() {
                        return T
                    },
                    set: function(t) {
                        if (t < 0 || t > 100)
                            throw new Error("Size must be between 0 and 100.");
                        T = t,
                        this.hasBeenReset = !0
                    }
                })),
                Object.defineProperty(s, "align", r({}, c, {
                    get: function() {
                        return _
                    },
                    set: function(t) {
                        var r = e(t);
                        if (!r)
                            throw new SyntaxError("An invalid or illegal string was specified.");
                        _ = r,
                        this.hasBeenReset = !0
                    }
                })),
                s.displayState = void 0,
                u)
                    return s
            }
            if ("undefined" != typeof window && window.VTTCue)
                return window.VTTCue;
            var n = "auto"
              , o = {
                "": !0,
                lr: !0,
                rl: !0
            }
              , a = {
                start: !0,
                middle: !0,
                end: !0,
                left: !0,
                right: !0
            };
            return i.prototype.getCueAsHTML = function() {
                return window.WebVTT.convertCueToDOMTree(window, this.text)
            }
            ,
            i
        }()
    }
    , function(t, e, r) {
        "use strict";
        function i(t, e) {
            if (!(t instanceof e))
                throw new TypeError("Cannot call a class as a function")
        }
        function n(t, e) {
            if (!t)
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !e || "object" != typeof e && "function" != typeof e ? t : e
        }
        function o(t, e) {
            if ("function" != typeof e && null !== e)
                throw new TypeError("Super expression must either be null or a function, not " + typeof e);
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }),
            e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }
        function a(t, e) {
            return t && t.label === e.name && !(t.textTrack1 || t.textTrack2)
        }
        function s(t, e, r, i) {
            return Math.min(e, i) - Math.max(t, r)
        }
        var u = r(3)
          , c = r(5)
          , l = r(127)
          , h = r(128)
          , f = r(129)
          , d = r(2)
          , p = r(65)
          , y = function(t) {
            function e(r) {
                i(this, e);
                var o = n(this, t.call(this, r, u.a.MEDIA_ATTACHING, u.a.MEDIA_DETACHING, u.a.FRAG_PARSING_USERDATA, u.a.FRAG_DECRYPTED, u.a.MANIFEST_LOADING, u.a.MANIFEST_LOADED, u.a.FRAG_LOADED, u.a.LEVEL_SWITCHING, u.a.INIT_PTS_FOUND));
                if (o.hls = r,
                o.config = r.config,
                o.enabled = !0,
                o.Cues = r.config.cueHandler,
                o.textTracks = [],
                o.tracks = [],
                o.unparsedVttFrags = [],
                o.initPTS = void 0,
                o.cueRanges = [],
                o.captionsTracks = {},
                o.captionsProperties = {
                    textTrack1: {
                        label: o.config.captionsTextTrack1Label,
                        languageCode: o.config.captionsTextTrack1LanguageCode
                    },
                    textTrack2: {
                        label: o.config.captionsTextTrack2Label,
                        languageCode: o.config.captionsTextTrack2LanguageCode
                    }
                },
                o.config.enableCEA708Captions) {
                    var a = new h.a(o,"textTrack1")
                      , s = new h.a(o,"textTrack2");
                    o.cea608Parser = new l.a(0,a,s)
                }
                return o
            }
            return o(e, t),
            e.prototype.addCues = function(t, e, r, i) {
                for (var n = this.cueRanges, o = !1, a = n.length; a--; ) {
                    var u = n[a]
                      , c = s(u[0], u[1], e, r);
                    if (c >= 0 && (u[0] = Math.min(u[0], e),
                    u[1] = Math.max(u[1], r),
                    o = !0,
                    c / (r - e) > .5))
                        return
                }
                o || n.push([e, r]),
                this.Cues.newCue(this.captionsTracks[t], e, r, i)
            }
            ,
            e.prototype.onInitPtsFound = function(t) {
                var e = this;
                void 0 === this.initPTS && (this.initPTS = t.initPTS),
                this.unparsedVttFrags.length && (this.unparsedVttFrags.forEach(function(t) {
                    e.onFragLoaded(t)
                }),
                this.unparsedVttFrags = [])
            }
            ,
            e.prototype.getExistingTrack = function(t) {
                var e = this.media;
                if (e)
                    for (var r = 0; r < e.textTracks.length; r++) {
                        var i = e.textTracks[r];
                        if (i[t])
                            return i
                    }
                return null
            }
            ,
            e.prototype.createCaptionsTrack = function(t) {
                var e = this.captionsProperties[t]
                  , r = e.label
                  , i = e.languageCode
                  , n = this.captionsTracks;
                if (!n[t]) {
                    var o = this.getExistingTrack(t);
                    if (o)
                        n[t] = o,
                        Object(p.a)(n[t]),
                        Object(p.b)(n[t], this.media);
                    else {
                        var a = this.createTextTrack("captions", r, i);
                        a && (a[t] = !0,
                        n[t] = a)
                    }
                }
            }
            ,
            e.prototype.createTextTrack = function(t, e, r) {
                var i = this.media;
                if (i)
                    return i.addTextTrack(t, e, r)
            }
            ,
            e.prototype.destroy = function() {
                c.a.prototype.destroy.call(this)
            }
            ,
            e.prototype.onMediaAttaching = function(t) {
                this.media = t.media,
                this._cleanTracks()
            }
            ,
            e.prototype.onMediaDetaching = function() {
                var t = this.captionsTracks;
                Object.keys(t).forEach(function(e) {
                    Object(p.a)(t[e]),
                    delete t[e]
                })
            }
            ,
            e.prototype.onManifestLoading = function() {
                this.lastSn = -1,
                this.prevCC = -1,
                this.vttCCs = {
                    ccOffset: 0,
                    presentationOffset: 0
                },
                this._cleanTracks()
            }
            ,
            e.prototype._cleanTracks = function() {
                var t = this.media;
                if (t) {
                    var e = t.textTracks;
                    if (e)
                        for (var r = 0; r < e.length; r++)
                            Object(p.a)(e[r])
                }
            }
            ,
            e.prototype.onManifestLoaded = function(t) {
                var e = this;
                if (this.textTracks = [],
                this.unparsedVttFrags = this.unparsedVttFrags || [],
                this.initPTS = void 0,
                this.cueRanges = [],
                this.config.enableWebVTT) {
                    this.tracks = t.subtitles || [];
                    var r = this.media ? this.media.textTracks : [];
                    this.tracks.forEach(function(t, i) {
                        var n = void 0;
                        if (i < r.length) {
                            var o = r[i];
                            a(o, t) && (n = o)
                        }
                        n || (n = e.createTextTrack("subtitles", t.name, t.lang)),
                        t.default ? n.mode = e.hls.subtitleDisplay ? "showing" : "hidden" : n.mode = "disabled",
                        e.textTracks.push(n)
                    })
                }
            }
            ,
            e.prototype.onLevelSwitching = function() {
                this.enabled = "NONE" !== this.hls.currentLevel.closedCaptions
            }
            ,
            e.prototype.onFragLoaded = function(t) {
                var e = t.frag
                  , r = t.payload;
                if ("main" === e.type) {
                    var i = e.sn;
                    if (i !== this.lastSn + 1) {
                        var n = this.cea608Parser;
                        n && n.reset()
                    }
                    this.lastSn = i
                } else if ("subtitle" === e.type)
                    if (r.byteLength) {
                        if (void 0 === this.initPTS)
                            return void this.unparsedVttFrags.push(t);
                        var o = e.decryptdata;
                        null != o && null != o.key && "AES-128" === o.method || this._parseVTTs(e, r)
                    } else
                        this.hls.trigger(u.a.SUBTITLE_FRAG_PROCESSED, {
                            success: !1,
                            frag: e
                        })
            }
            ,
            e.prototype._parseVTTs = function(t, e) {
                var r = this.vttCCs;
                r[t.cc] || (r[t.cc] = {
                    start: t.start,
                    prevCC: this.prevCC,
                    new: !0
                },
                this.prevCC = t.cc);
                var i = this.textTracks
                  , n = this.hls;
                f.a.parse(e, this.initPTS, r, t.cc, function(e) {
                    var r = i[t.trackId];
                    if ("disabled" === r.mode)
                        return void n.trigger(u.a.SUBTITLE_FRAG_PROCESSED, {
                            success: !1,
                            frag: t
                        });
                    e.forEach(function(t) {
                        if (!r.cues.getCueById(t.id))
                            try {
                                r.addCue(t)
                            } catch (i) {
                                var e = new window.TextTrackCue(t.startTime,t.endTime,t.text);
                                e.id = t.id,
                                r.addCue(e)
                            }
                    }),
                    n.trigger(u.a.SUBTITLE_FRAG_PROCESSED, {
                        success: !0,
                        frag: t
                    })
                }, function(e) {
                    d.b.log("Failed to parse VTT cue: " + e),
                    n.trigger(u.a.SUBTITLE_FRAG_PROCESSED, {
                        success: !1,
                        frag: t
                    })
                })
            }
            ,
            e.prototype.onFragDecrypted = function(t) {
                var e = t.payload
                  , r = t.frag;
                if ("subtitle" === r.type) {
                    if (void 0 === this.initPTS)
                        return void this.unparsedVttFrags.push(t);
                    this._parseVTTs(r, e)
                }
            }
            ,
            e.prototype.onFragParsingUserdata = function(t) {
                if (this.enabled && this.config.enableCEA708Captions)
                    for (var e = 0; e < t.samples.length; e++) {
                        var r = this.extractCea608Data(t.samples[e].bytes);
                        this.cea608Parser.addData(t.samples[e].pts, r)
                    }
            }
            ,
            e.prototype.extractCea608Data = function(t) {
                for (var e = 31 & t[0], r = 2, i = void 0, n = void 0, o = void 0, a = void 0, s = void 0, u = [], c = 0; c < e; c++)
                    i = t[r++],
                    n = 127 & t[r++],
                    o = 127 & t[r++],
                    a = 0 != (4 & i),
                    s = 3 & i,
                    0 === n && 0 === o || a && 0 === s && (u.push(n),
                    u.push(o));
                return u
            }
            ,
            e
        }(c.a);
        e.a = y
    }
    , function(t, e, r) {
        "use strict";
        function i(t, e) {
            if (!(t instanceof e))
                throw new TypeError("Cannot call a class as a function")
        }
        var n = {
            42: 225,
            92: 233,
            94: 237,
            95: 243,
            96: 250,
            123: 231,
            124: 247,
            125: 209,
            126: 241,
            127: 9608,
            128: 174,
            129: 176,
            130: 189,
            131: 191,
            132: 8482,
            133: 162,
            134: 163,
            135: 9834,
            136: 224,
            137: 32,
            138: 232,
            139: 226,
            140: 234,
            141: 238,
            142: 244,
            143: 251,
            144: 193,
            145: 201,
            146: 211,
            147: 218,
            148: 220,
            149: 252,
            150: 8216,
            151: 161,
            152: 42,
            153: 8217,
            154: 9473,
            155: 169,
            156: 8480,
            157: 8226,
            158: 8220,
            159: 8221,
            160: 192,
            161: 194,
            162: 199,
            163: 200,
            164: 202,
            165: 203,
            166: 235,
            167: 206,
            168: 207,
            169: 239,
            170: 212,
            171: 217,
            172: 249,
            173: 219,
            174: 171,
            175: 187,
            176: 195,
            177: 227,
            178: 205,
            179: 204,
            180: 236,
            181: 210,
            182: 242,
            183: 213,
            184: 245,
            185: 123,
            186: 125,
            187: 92,
            188: 94,
            189: 95,
            190: 124,
            191: 8764,
            192: 196,
            193: 228,
            194: 214,
            195: 246,
            196: 223,
            197: 165,
            198: 164,
            199: 9475,
            200: 197,
            201: 229,
            202: 216,
            203: 248,
            204: 9487,
            205: 9491,
            206: 9495,
            207: 9499
        }
          , o = function(t) {
            var e = t;
            return n.hasOwnProperty(t) && (e = n[t]),
            String.fromCharCode(e)
        }
          , a = 15
          , s = 100
          , u = {
            17: 1,
            18: 3,
            21: 5,
            22: 7,
            23: 9,
            16: 11,
            19: 12,
            20: 14
        }
          , c = {
            17: 2,
            18: 4,
            21: 6,
            22: 8,
            23: 10,
            19: 13,
            20: 15
        }
          , l = {
            25: 1,
            26: 3,
            29: 5,
            30: 7,
            31: 9,
            24: 11,
            27: 12,
            28: 14
        }
          , h = {
            25: 2,
            26: 4,
            29: 6,
            30: 8,
            31: 10,
            27: 13,
            28: 15
        }
          , f = ["white", "green", "blue", "cyan", "red", "yellow", "magenta", "black", "transparent"]
          , d = {
            verboseFilter: {
                DATA: 3,
                DEBUG: 3,
                INFO: 2,
                WARNING: 2,
                TEXT: 1,
                ERROR: 0
            },
            time: null,
            verboseLevel: 0,
            setTime: function(t) {
                this.time = t
            },
            log: function(t, e) {
                var r = this.verboseFilter[t];
                this.verboseLevel >= r && console.log(this.time + " [" + t + "] " + e)
            }
        }
          , p = function(t) {
            for (var e = [], r = 0; r < t.length; r++)
                e.push(t[r].toString(16));
            return e
        }
          , y = function() {
            function t(e, r, n, o, a) {
                i(this, t),
                this.foreground = e || "white",
                this.underline = r || !1,
                this.italics = n || !1,
                this.background = o || "black",
                this.flash = a || !1
            }
            return t.prototype.reset = function() {
                this.foreground = "white",
                this.underline = !1,
                this.italics = !1,
                this.background = "black",
                this.flash = !1
            }
            ,
            t.prototype.setStyles = function(t) {
                for (var e = ["foreground", "underline", "italics", "background", "flash"], r = 0; r < e.length; r++) {
                    var i = e[r];
                    t.hasOwnProperty(i) && (this[i] = t[i])
                }
            }
            ,
            t.prototype.isDefault = function() {
                return "white" === this.foreground && !this.underline && !this.italics && "black" === this.background && !this.flash
            }
            ,
            t.prototype.equals = function(t) {
                return this.foreground === t.foreground && this.underline === t.underline && this.italics === t.italics && this.background === t.background && this.flash === t.flash
            }
            ,
            t.prototype.copy = function(t) {
                this.foreground = t.foreground,
                this.underline = t.underline,
                this.italics = t.italics,
                this.background = t.background,
                this.flash = t.flash
            }
            ,
            t.prototype.toString = function() {
                return "color=" + this.foreground + ", underline=" + this.underline + ", italics=" + this.italics + ", background=" + this.background + ", flash=" + this.flash
            }
            ,
            t
        }()
          , g = function() {
            function t(e, r, n, o, a, s) {
                i(this, t),
                this.uchar = e || " ",
                this.penState = new y(r,n,o,a,s)
            }
            return t.prototype.reset = function() {
                this.uchar = " ",
                this.penState.reset()
            }
            ,
            t.prototype.setChar = function(t, e) {
                this.uchar = t,
                this.penState.copy(e)
            }
            ,
            t.prototype.setPenState = function(t) {
                this.penState.copy(t)
            }
            ,
            t.prototype.equals = function(t) {
                return this.uchar === t.uchar && this.penState.equals(t.penState)
            }
            ,
            t.prototype.copy = function(t) {
                this.uchar = t.uchar,
                this.penState.copy(t.penState)
            }
            ,
            t.prototype.isEmpty = function() {
                return " " === this.uchar && this.penState.isDefault()
            }
            ,
            t
        }()
          , v = function() {
            function t() {
                i(this, t),
                this.chars = [];
                for (var e = 0; e < s; e++)
                    this.chars.push(new g);
                this.pos = 0,
                this.currPenState = new y
            }
            return t.prototype.equals = function(t) {
                for (var e = !0, r = 0; r < s; r++)
                    if (!this.chars[r].equals(t.chars[r])) {
                        e = !1;
                        break
                    }
                return e
            }
            ,
            t.prototype.copy = function(t) {
                for (var e = 0; e < s; e++)
                    this.chars[e].copy(t.chars[e])
            }
            ,
            t.prototype.isEmpty = function() {
                for (var t = !0, e = 0; e < s; e++)
                    if (!this.chars[e].isEmpty()) {
                        t = !1;
                        break
                    }
                return t
            }
            ,
            t.prototype.setCursor = function(t) {
                this.pos !== t && (this.pos = t),
                this.pos < 0 ? (d.log("ERROR", "Negative cursor position " + this.pos),
                this.pos = 0) : this.pos > s && (d.log("ERROR", "Too large cursor position " + this.pos),
                this.pos = s)
            }
            ,
            t.prototype.moveCursor = function(t) {
                var e = this.pos + t;
                if (t > 1)
                    for (var r = this.pos + 1; r < e + 1; r++)
                        this.chars[r].setPenState(this.currPenState);
                this.setCursor(e)
            }
            ,
            t.prototype.backSpace = function() {
                this.moveCursor(-1),
                this.chars[this.pos].setChar(" ", this.currPenState)
            }
            ,
            t.prototype.insertChar = function(t) {
                t >= 144 && this.backSpace();
                var e = o(t);
                if (this.pos >= s)
                    return void d.log("ERROR", "Cannot insert " + t.toString(16) + " (" + e + ") at position " + this.pos + ". Skipping it!");
                this.chars[this.pos].setChar(e, this.currPenState),
                this.moveCursor(1)
            }
            ,
            t.prototype.clearFromPos = function(t) {
                var e = void 0;
                for (e = t; e < s; e++)
                    this.chars[e].reset()
            }
            ,
            t.prototype.clear = function() {
                this.clearFromPos(0),
                this.pos = 0,
                this.currPenState.reset()
            }
            ,
            t.prototype.clearToEndOfRow = function() {
                this.clearFromPos(this.pos)
            }
            ,
            t.prototype.getTextString = function() {
                for (var t = [], e = !0, r = 0; r < s; r++) {
                    var i = this.chars[r].uchar;
                    " " !== i && (e = !1),
                    t.push(i)
                }
                return e ? "" : t.join("")
            }
            ,
            t.prototype.setPenStyles = function(t) {
                this.currPenState.setStyles(t),
                this.chars[this.pos].setPenState(this.currPenState)
            }
            ,
            t
        }()
          , m = function() {
            function t() {
                i(this, t),
                this.rows = [];
                for (var e = 0; e < a; e++)
                    this.rows.push(new v);
                this.currRow = a - 1,
                this.nrRollUpRows = null,
                this.reset()
            }
            return t.prototype.reset = function() {
                for (var t = 0; t < a; t++)
                    this.rows[t].clear();
                this.currRow = a - 1
            }
            ,
            t.prototype.equals = function(t) {
                for (var e = !0, r = 0; r < a; r++)
                    if (!this.rows[r].equals(t.rows[r])) {
                        e = !1;
                        break
                    }
                return e
            }
            ,
            t.prototype.copy = function(t) {
                for (var e = 0; e < a; e++)
                    this.rows[e].copy(t.rows[e])
            }
            ,
            t.prototype.isEmpty = function() {
                for (var t = !0, e = 0; e < a; e++)
                    if (!this.rows[e].isEmpty()) {
                        t = !1;
                        break
                    }
                return t
            }
            ,
            t.prototype.backSpace = function() {
                this.rows[this.currRow].backSpace()
            }
            ,
            t.prototype.clearToEndOfRow = function() {
                this.rows[this.currRow].clearToEndOfRow()
            }
            ,
            t.prototype.insertChar = function(t) {
                this.rows[this.currRow].insertChar(t)
            }
            ,
            t.prototype.setPen = function(t) {
                this.rows[this.currRow].setPenStyles(t)
            }
            ,
            t.prototype.moveCursor = function(t) {
                this.rows[this.currRow].moveCursor(t)
            }
            ,
            t.prototype.setCursor = function(t) {
                d.log("INFO", "setCursor: " + t),
                this.rows[this.currRow].setCursor(t)
            }
            ,
            t.prototype.setPAC = function(t) {
                d.log("INFO", "pacData = " + JSON.stringify(t));
                var e = t.row - 1;
                if (this.nrRollUpRows && e < this.nrRollUpRows - 1 && (e = this.nrRollUpRows - 1),
                this.nrRollUpRows && this.currRow !== e) {
                    for (var r = 0; r < a; r++)
                        this.rows[r].clear();
                    var i = this.currRow + 1 - this.nrRollUpRows
                      , n = this.lastOutputScreen;
                    if (n) {
                        var o = n.rows[i].cueStartTime;
                        if (o && o < d.time)
                            for (var s = 0; s < this.nrRollUpRows; s++)
                                this.rows[e - this.nrRollUpRows + s + 1].copy(n.rows[i + s])
                    }
                }
                this.currRow = e;
                var u = this.rows[this.currRow];
                if (null !== t.indent) {
                    var c = t.indent
                      , l = Math.max(c - 1, 0);
                    u.setCursor(t.indent),
                    t.color = u.chars[l].penState.foreground
                }
                var h = {
                    foreground: t.color,
                    underline: t.underline,
                    italics: t.italics,
                    background: "black",
                    flash: !1
                };
                this.setPen(h)
            }
            ,
            t.prototype.setBkgData = function(t) {
                d.log("INFO", "bkgData = " + JSON.stringify(t)),
                this.backSpace(),
                this.setPen(t),
                this.insertChar(32)
            }
            ,
            t.prototype.setRollUpRows = function(t) {
                this.nrRollUpRows = t
            }
            ,
            t.prototype.rollUp = function() {
                if (null === this.nrRollUpRows)
                    return void d.log("DEBUG", "roll_up but nrRollUpRows not set yet");
                d.log("TEXT", this.getDisplayText());
                var t = this.currRow + 1 - this.nrRollUpRows
                  , e = this.rows.splice(t, 1)[0];
                e.clear(),
                this.rows.splice(this.currRow, 0, e),
                d.log("INFO", "Rolling up")
            }
            ,
            t.prototype.getDisplayText = function(t) {
                t = t || !1;
                for (var e = [], r = "", i = -1, n = 0; n < a; n++) {
                    var o = this.rows[n].getTextString();
                    o && (i = n + 1,
                    t ? e.push("Row " + i + ": '" + o + "'") : e.push(o.trim()))
                }
                return e.length > 0 && (r = t ? "[" + e.join(" | ") + "]" : e.join("\n")),
                r
            }
            ,
            t.prototype.getTextAndFormat = function() {
                return this.rows
            }
            ,
            t
        }()
          , b = function() {
            function t(e, r) {
                i(this, t),
                this.chNr = e,
                this.outputFilter = r,
                this.mode = null,
                this.verbose = 0,
                this.displayedMemory = new m,
                this.nonDisplayedMemory = new m,
                this.lastOutputScreen = new m,
                this.currRollUpRow = this.displayedMemory.rows[a - 1],
                this.writeScreen = this.displayedMemory,
                this.mode = null,
                this.cueStartTime = null
            }
            return t.prototype.reset = function() {
                this.mode = null,
                this.displayedMemory.reset(),
                this.nonDisplayedMemory.reset(),
                this.lastOutputScreen.reset(),
                this.currRollUpRow = this.displayedMemory.rows[a - 1],
                this.writeScreen = this.displayedMemory,
                this.mode = null,
                this.cueStartTime = null,
                this.lastCueEndTime = null
            }
            ,
            t.prototype.getHandler = function() {
                return this.outputFilter
            }
            ,
            t.prototype.setHandler = function(t) {
                this.outputFilter = t
            }
            ,
            t.prototype.setPAC = function(t) {
                this.writeScreen.setPAC(t)
            }
            ,
            t.prototype.setBkgData = function(t) {
                this.writeScreen.setBkgData(t)
            }
            ,
            t.prototype.setMode = function(t) {
                t !== this.mode && (this.mode = t,
                d.log("INFO", "MODE=" + t),
                "MODE_POP-ON" === this.mode ? this.writeScreen = this.nonDisplayedMemory : (this.writeScreen = this.displayedMemory,
                this.writeScreen.reset()),
                "MODE_ROLL-UP" !== this.mode && (this.displayedMemory.nrRollUpRows = null,
                this.nonDisplayedMemory.nrRollUpRows = null),
                this.mode = t)
            }
            ,
            t.prototype.insertChars = function(t) {
                for (var e = 0; e < t.length; e++)
                    this.writeScreen.insertChar(t[e]);
                var r = this.writeScreen === this.displayedMemory ? "DISP" : "NON_DISP";
                d.log("INFO", r + ": " + this.writeScreen.getDisplayText(!0)),
                "MODE_PAINT-ON" !== this.mode && "MODE_ROLL-UP" !== this.mode || (d.log("TEXT", "DISPLAYED: " + this.displayedMemory.getDisplayText(!0)),
                this.outputDataUpdate())
            }
            ,
            t.prototype.ccRCL = function() {
                d.log("INFO", "RCL - Resume Caption Loading"),
                this.setMode("MODE_POP-ON")
            }
            ,
            t.prototype.ccBS = function() {
                d.log("INFO", "BS - BackSpace"),
                "MODE_TEXT" !== this.mode && (this.writeScreen.backSpace(),
                this.writeScreen === this.displayedMemory && this.outputDataUpdate())
            }
            ,
            t.prototype.ccAOF = function() {}
            ,
            t.prototype.ccAON = function() {}
            ,
            t.prototype.ccDER = function() {
                d.log("INFO", "DER- Delete to End of Row"),
                this.writeScreen.clearToEndOfRow(),
                this.outputDataUpdate()
            }
            ,
            t.prototype.ccRU = function(t) {
                d.log("INFO", "RU(" + t + ") - Roll Up"),
                this.writeScreen = this.displayedMemory,
                this.setMode("MODE_ROLL-UP"),
                this.writeScreen.setRollUpRows(t)
            }
            ,
            t.prototype.ccFON = function() {
                d.log("INFO", "FON - Flash On"),
                this.writeScreen.setPen({
                    flash: !0
                })
            }
            ,
            t.prototype.ccRDC = function() {
                d.log("INFO", "RDC - Resume Direct Captioning"),
                this.setMode("MODE_PAINT-ON")
            }
            ,
            t.prototype.ccTR = function() {
                d.log("INFO", "TR"),
                this.setMode("MODE_TEXT")
            }
            ,
            t.prototype.ccRTD = function() {
                d.log("INFO", "RTD"),
                this.setMode("MODE_TEXT")
            }
            ,
            t.prototype.ccEDM = function() {
                d.log("INFO", "EDM - Erase Displayed Memory"),
                this.displayedMemory.reset(),
                this.outputDataUpdate(!0)
            }
            ,
            t.prototype.ccCR = function() {
                d.log("CR - Carriage Return"),
                this.writeScreen.rollUp(),
                this.outputDataUpdate(!0)
            }
            ,
            t.prototype.ccENM = function() {
                d.log("INFO", "ENM - Erase Non-displayed Memory"),
                this.nonDisplayedMemory.reset()
            }
            ,
            t.prototype.ccEOC = function() {
                if (d.log("INFO", "EOC - End Of Caption"),
                "MODE_POP-ON" === this.mode) {
                    var t = this.displayedMemory;
                    this.displayedMemory = this.nonDisplayedMemory,
                    this.nonDisplayedMemory = t,
                    this.writeScreen = this.nonDisplayedMemory,
                    d.log("TEXT", "DISP: " + this.displayedMemory.getDisplayText())
                }
                this.outputDataUpdate(!0)
            }
            ,
            t.prototype.ccTO = function(t) {
                d.log("INFO", "TO(" + t + ") - Tab Offset"),
                this.writeScreen.moveCursor(t)
            }
            ,
            t.prototype.ccMIDROW = function(t) {
                var e = {
                    flash: !1
                };
                if (e.underline = t % 2 == 1,
                e.italics = t >= 46,
                e.italics)
                    e.foreground = "white";
                else {
                    var r = Math.floor(t / 2) - 16
                      , i = ["white", "green", "blue", "cyan", "red", "yellow", "magenta"];
                    e.foreground = i[r]
                }
                d.log("INFO", "MIDROW: " + JSON.stringify(e)),
                this.writeScreen.setPen(e)
            }
            ,
            t.prototype.outputDataUpdate = function() {
                var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0]
                  , e = d.time;
                null !== e && this.outputFilter && (null !== this.cueStartTime || this.displayedMemory.isEmpty() ? this.displayedMemory.equals(this.lastOutputScreen) || (this.outputFilter.newCue && (this.outputFilter.newCue(this.cueStartTime, e, this.lastOutputScreen),
                !0 === t && this.outputFilter.dispatchCue && this.outputFilter.dispatchCue()),
                this.cueStartTime = this.displayedMemory.isEmpty() ? null : e) : this.cueStartTime = e,
                this.lastOutputScreen.copy(this.displayedMemory))
            }
            ,
            t.prototype.cueSplitAtTime = function(t) {
                this.outputFilter && (this.displayedMemory.isEmpty() || (this.outputFilter.newCue && this.outputFilter.newCue(this.cueStartTime, t, this.displayedMemory),
                this.cueStartTime = t))
            }
            ,
            t
        }()
          , S = function() {
            function t(e, r, n) {
                i(this, t),
                this.field = e || 1,
                this.outputs = [r, n],
                this.channels = [new b(1,r), new b(2,n)],
                this.currChNr = -1,
                this.lastCmdA = null,
                this.lastCmdB = null,
                this.bufferedData = [],
                this.startTime = null,
                this.lastTime = null,
                this.dataCounters = {
                    padding: 0,
                    char: 0,
                    cmd: 0,
                    other: 0
                }
            }
            return t.prototype.getHandler = function(t) {
                return this.channels[t].getHandler()
            }
            ,
            t.prototype.setHandler = function(t, e) {
                this.channels[t].setHandler(e)
            }
            ,
            t.prototype.addData = function(t, e) {
                var r = void 0
                  , i = void 0
                  , n = void 0
                  , o = !1;
                this.lastTime = t,
                d.setTime(t);
                for (var a = 0; a < e.length; a += 2)
                    if (i = 127 & e[a],
                    n = 127 & e[a + 1],
                    0 !== i || 0 !== n) {
                        if (d.log("DATA", "[" + p([e[a], e[a + 1]]) + "] -> (" + p([i, n]) + ")"),
                        r = this.parseCmd(i, n),
                        r || (r = this.parseMidrow(i, n)),
                        r || (r = this.parsePAC(i, n)),
                        r || (r = this.parseBackgroundAttributes(i, n)),
                        !r && (o = this.parseChars(i, n)))
                            if (this.currChNr && this.currChNr >= 0) {
                                var s = this.channels[this.currChNr - 1];
                                s.insertChars(o)
                            } else
                                d.log("WARNING", "No channel found yet. TEXT-MODE?");
                        r ? this.dataCounters.cmd += 2 : o ? this.dataCounters.char += 2 : (this.dataCounters.other += 2,
                        d.log("WARNING", "Couldn't parse cleaned data " + p([i, n]) + " orig: " + p([e[a], e[a + 1]])))
                    } else
                        this.dataCounters.padding += 2
            }
            ,
            t.prototype.parseCmd = function(t, e) {
                var r = null
                  , i = (20 === t || 28 === t) && e >= 32 && e <= 47
                  , n = (23 === t || 31 === t) && e >= 33 && e <= 35;
                if (!i && !n)
                    return !1;
                if (t === this.lastCmdA && e === this.lastCmdB)
                    return this.lastCmdA = null,
                    this.lastCmdB = null,
                    d.log("DEBUG", "Repeated command (" + p([t, e]) + ") is dropped"),
                    !0;
                r = 20 === t || 23 === t ? 1 : 2;
                var o = this.channels[r - 1];
                return 20 === t || 28 === t ? 32 === e ? o.ccRCL() : 33 === e ? o.ccBS() : 34 === e ? o.ccAOF() : 35 === e ? o.ccAON() : 36 === e ? o.ccDER() : 37 === e ? o.ccRU(2) : 38 === e ? o.ccRU(3) : 39 === e ? o.ccRU(4) : 40 === e ? o.ccFON() : 41 === e ? o.ccRDC() : 42 === e ? o.ccTR() : 43 === e ? o.ccRTD() : 44 === e ? o.ccEDM() : 45 === e ? o.ccCR() : 46 === e ? o.ccENM() : 47 === e && o.ccEOC() : o.ccTO(e - 32),
                this.lastCmdA = t,
                this.lastCmdB = e,
                this.currChNr = r,
                !0
            }
            ,
            t.prototype.parseMidrow = function(t, e) {
                var r = null;
                if ((17 === t || 25 === t) && e >= 32 && e <= 47) {
                    if ((r = 17 === t ? 1 : 2) !== this.currChNr)
                        return d.log("ERROR", "Mismatch channel in midrow parsing"),
                        !1;
                    return this.channels[r - 1].ccMIDROW(e),
                    d.log("DEBUG", "MIDROW (" + p([t, e]) + ")"),
                    !0
                }
                return !1
            }
            ,
            t.prototype.parsePAC = function(t, e) {
                var r = null
                  , i = null
                  , n = (t >= 17 && t <= 23 || t >= 25 && t <= 31) && e >= 64 && e <= 127
                  , o = (16 === t || 24 === t) && e >= 64 && e <= 95;
                if (!n && !o)
                    return !1;
                if (t === this.lastCmdA && e === this.lastCmdB)
                    return this.lastCmdA = null,
                    this.lastCmdB = null,
                    !0;
                r = t <= 23 ? 1 : 2,
                i = e >= 64 && e <= 95 ? 1 === r ? u[t] : l[t] : 1 === r ? c[t] : h[t];
                var a = this.interpretPAC(i, e);
                return this.channels[r - 1].setPAC(a),
                this.lastCmdA = t,
                this.lastCmdB = e,
                this.currChNr = r,
                !0
            }
            ,
            t.prototype.interpretPAC = function(t, e) {
                var r = e
                  , i = {
                    color: null,
                    italics: !1,
                    indent: null,
                    underline: !1,
                    row: t
                };
                return r = e > 95 ? e - 96 : e - 64,
                i.underline = 1 == (1 & r),
                r <= 13 ? i.color = ["white", "green", "blue", "cyan", "red", "yellow", "magenta", "white"][Math.floor(r / 2)] : r <= 15 ? (i.italics = !0,
                i.color = "white") : i.indent = 4 * Math.floor((r - 16) / 2),
                i
            }
            ,
            t.prototype.parseChars = function(t, e) {
                var r = null
                  , i = null
                  , n = null;
                if (t >= 25 ? (r = 2,
                n = t - 8) : (r = 1,
                n = t),
                n >= 17 && n <= 19) {
                    var a = e;
                    a = 17 === n ? e + 80 : 18 === n ? e + 112 : e + 144,
                    d.log("INFO", "Special char '" + o(a) + "' in channel " + r),
                    i = [a]
                } else
                    t >= 32 && t <= 127 && (i = 0 === e ? [t] : [t, e]);
                if (i) {
                    var s = p(i);
                    d.log("DEBUG", "Char codes =  " + s.join(",")),
                    this.lastCmdA = null,
                    this.lastCmdB = null
                }
                return i
            }
            ,
            t.prototype.parseBackgroundAttributes = function(t, e) {
                var r = void 0
                  , i = void 0
                  , n = void 0
                  , o = void 0
                  , a = (16 === t || 24 === t) && e >= 32 && e <= 47
                  , s = (23 === t || 31 === t) && e >= 45 && e <= 47;
                return !(!a && !s) && (r = {},
                16 === t || 24 === t ? (i = Math.floor((e - 32) / 2),
                r.background = f[i],
                e % 2 == 1 && (r.background = r.background + "_semi")) : 45 === e ? r.background = "transparent" : (r.foreground = "black",
                47 === e && (r.underline = !0)),
                n = t < 24 ? 1 : 2,
                o = this.channels[n - 1],
                o.setBkgData(r),
                this.lastCmdA = null,
                this.lastCmdB = null,
                !0)
            }
            ,
            t.prototype.reset = function() {
                for (var t = 0; t < this.channels.length; t++)
                    this.channels[t] && this.channels[t].reset();
                this.lastCmdA = null,
                this.lastCmdB = null
            }
            ,
            t.prototype.cueSplitAtTime = function(t) {
                for (var e = 0; e < this.channels.length; e++)
                    this.channels[e] && this.channels[e].cueSplitAtTime(t)
            }
            ,
            t
        }();
        e.a = S
    }
    , function(t, e, r) {
        "use strict";
        function i(t, e) {
            if (!(t instanceof e))
                throw new TypeError("Cannot call a class as a function")
        }
        var n = function() {
            function t(e, r) {
                i(this, t),
                this.timelineController = e,
                this.trackName = r,
                this.startTime = null,
                this.endTime = null,
                this.screen = null
            }
            return t.prototype.dispatchCue = function() {
                null !== this.startTime && (this.timelineController.addCues(this.trackName, this.startTime, this.endTime, this.screen),
                this.startTime = null)
            }
            ,
            t.prototype.newCue = function(t, e, r) {
                (null === this.startTime || this.startTime > t) && (this.startTime = t),
                this.endTime = e,
                this.screen = r,
                this.timelineController.createCaptionsTrack(this.trackName)
            }
            ,
            t
        }();
        e.a = n
    }
    , function(t, e, r) {
        "use strict";
        var i = r(66)
          , n = r(17)
          , o = function(t, e, r) {
            return t.substr(r || 0, e.length) === e
        }
          , a = function(t) {
            var e = parseInt(t.substr(-3))
              , r = parseInt(t.substr(-6, 2))
              , i = parseInt(t.substr(-9, 2))
              , n = t.length > 9 ? parseInt(t.substr(0, t.indexOf(":"))) : 0;
            return isNaN(e) || isNaN(r) || isNaN(i) || isNaN(n) ? -1 : (e += 1e3 * r,
            e += 6e4 * i,
            e += 36e5 * n)
        }
          , s = function(t) {
            for (var e = 5381, r = t.length; r; )
                e = 33 * e ^ t.charCodeAt(--r);
            return (e >>> 0).toString()
        }
          , u = function(t, e, r) {
            var i = t[e]
              , n = t[i.prevCC];
            if (!n || !n.new && i.new)
                return t.ccOffset = t.presentationOffset = i.start,
                void (i.new = !1);
            for (; n && n.new; )
                t.ccOffset += i.start - n.start,
                i.new = !1,
                i = n,
                n = t[i.prevCC];
            t.presentationOffset = r
        }
          , c = {
            parse: function(t, e, r, c, l, h) {
                var f = /\r\n|\n\r|\n|\r/g
                  , d = Object(n.b)(new Uint8Array(t)).trim().replace(f, "\n").split("\n")
                  , p = "00:00.000"
                  , y = 0
                  , g = 0
                  , v = 0
                  , m = []
                  , b = void 0
                  , S = !0
                  , E = new i.a;
                E.oncue = function(t) {
                    var e = r[c]
                      , i = r.ccOffset;
                    e && e.new && (void 0 !== g ? i = r.ccOffset = e.start : u(r, c, v)),
                    v && (i = v + r.ccOffset - r.presentationOffset),
                    t.startTime += i - g,
                    t.endTime += i - g,
                    t.id = s(t.startTime.toString()) + s(t.endTime.toString()) + s(t.text),
                    t.text = decodeURIComponent(encodeURIComponent(t.text)),
                    t.endTime > 0 && m.push(t)
                }
                ,
                E.onparsingerror = function(t) {
                    b = t
                }
                ,
                E.onflush = function() {
                    if (b && h)
                        return void h(b);
                    l(m)
                }
                ,
                d.forEach(function(t) {
                    if (S) {
                        if (o(t, "X-TIMESTAMP-MAP=")) {
                            S = !1,
                            t.substr(16).split(",").forEach(function(t) {
                                o(t, "LOCAL:") ? p = t.substr(6) : o(t, "MPEGTS:") && (y = parseInt(t.substr(7)))
                            });
                            try {
                                e = e < 0 ? e + 8589934592 : e,
                                y -= e,
                                g = a(p) / 1e3,
                                v = y / 9e4,
                                -1 === g && (b = new Error("Malformed X-TIMESTAMP-MAP: " + t))
                            } catch (e) {
                                b = new Error("Malformed X-TIMESTAMP-MAP: " + t)
                            }
                            return
                        }
                        "" === t && (e > 0 && (g = e / 9e4),
                        S = !1)
                    }
                    E.parse(t + "\n")
                }),
                E.flush()
            }
        };
        e.a = c
    }
    , function(t, e, r) {
        "use strict";
        function i(t, e) {
            if (!(t instanceof e))
                throw new TypeError("Cannot call a class as a function")
        }
        function n(t, e) {
            if (!t)
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !e || "object" != typeof e && "function" != typeof e ? t : e
        }
        function o(t, e) {
            if ("function" != typeof e && null !== e)
                throw new TypeError("Super expression must either be null or a function, not " + typeof e);
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }),
            e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }
        function a(t) {
            for (var e = [], r = 0; r < t.length; r++)
                "subtitles" === t[r].kind && e.push(t[r]);
            return e
        }
        var s = r(3)
          , u = r(5)
          , c = r(2)
          , l = function() {
            function t(t, e) {
                for (var r = 0; r < e.length; r++) {
                    var i = e[r];
                    i.enumerable = i.enumerable || !1,
                    i.configurable = !0,
                    "value"in i && (i.writable = !0),
                    Object.defineProperty(t, i.key, i)
                }
            }
            return function(e, r, i) {
                return r && t(e.prototype, r),
                i && t(e, i),
                e
            }
        }()
          , h = function(t) {
            function e(r) {
                i(this, e);
                var o = n(this, t.call(this, r, s.a.MEDIA_ATTACHED, s.a.MEDIA_DETACHING, s.a.MANIFEST_LOADING, s.a.MANIFEST_LOADED, s.a.SUBTITLE_TRACK_LOADED));
                return o.tracks = [],
                o.trackId = -1,
                o.media = null,
                o.subtitleDisplay = !0,
                o
            }
            return o(e, t),
            e.prototype._onTextTracksChanged = function() {
                if (this.media) {
                    for (var t = -1, e = a(this.media.textTracks), r = 0; r < e.length; r++)
                        if ("hidden" === e[r].mode)
                            t = r;
                        else if ("showing" === e[r].mode) {
                            t = r;
                            break
                        }
                    this.subtitleTrack = t
                }
            }
            ,
            e.prototype.destroy = function() {
                u.a.prototype.destroy.call(this)
            }
            ,
            e.prototype.onMediaAttached = function(t) {
                var e = this;
                this.media = t.media,
                this.media && (this.queuedDefaultTrack && (this.subtitleTrack = this.queuedDefaultTrack,
                delete this.queuedDefaultTrack),
                this.trackChangeListener = this._onTextTracksChanged.bind(this),
                this.useTextTrackPolling = !(this.media.textTracks && "onchange"in this.media.textTracks),
                this.useTextTrackPolling ? this.subtitlePollingInterval = setInterval(function() {
                    e.trackChangeListener()
                }, 500) : this.media.textTracks.addEventListener("change", this.trackChangeListener))
            }
            ,
            e.prototype.onMediaDetaching = function() {
                this.media && (this.useTextTrackPolling ? clearInterval(this.subtitlePollingInterval) : this.media.textTracks.removeEventListener("change", this.trackChangeListener),
                this.media = null)
            }
            ,
            e.prototype.onManifestLoading = function() {
                this.tracks = [],
                this.trackId = -1
            }
            ,
            e.prototype.onManifestLoaded = function(t) {
                var e = this
                  , r = t.subtitles || [];
                this.tracks = r,
                this.trackId = -1,
                this.hls.trigger(s.a.SUBTITLE_TRACKS_UPDATED, {
                    subtitleTracks: r
                }),
                r.forEach(function(t) {
                    t.default && (e.media ? e.subtitleTrack = t.id : e.queuedDefaultTrack = t.id)
                })
            }
            ,
            e.prototype.onTick = function() {
                var t = this.trackId
                  , e = this.tracks[t];
                if (e) {
                    var r = e.details;
                    r && !0 !== r.live || (c.b.log("(re)loading playlist for subtitle track " + t),
                    this.hls.trigger(s.a.SUBTITLE_TRACK_LOADING, {
                        url: e.url,
                        id: t
                    }))
                }
            }
            ,
            e.prototype.onSubtitleTrackLoaded = function(t) {
                var e = this;
                if (t.id < this.tracks.length) {
                    if (c.b.log("subtitle track " + t.id + " loaded"),
                    this.tracks[t.id].details = t.details,
                    t.details.live && !this.timer) {
                        var r = Math.min(this.hls.config.subtitleLoadInterval, t.details.targetduration);
                        this.timer = setInterval(function() {
                            e.onTick()
                        }, 1e3 * r, this)
                    }
                    !t.details.live && this.timer && this._stopTimer()
                }
            }
            ,
            e.prototype.setSubtitleTrackInternal = function(t) {
                var e = this.hls
                  , r = this.tracks;
                if (!("number" != typeof t || t < -1 || t >= r.length) && (this._stopTimer(),
                this.trackId = t,
                c.b.log("switching to subtitle track " + t),
                e.trigger(s.a.SUBTITLE_TRACK_SWITCH, {
                    id: t
                }),
                -1 !== t)) {
                    var i = r[t]
                      , n = i.details;
                    n && !n.live || (c.b.log("(re)loading playlist for subtitle track " + t),
                    e.trigger(s.a.SUBTITLE_TRACK_LOADING, {
                        url: i.url,
                        id: t
                    }))
                }
            }
            ,
            e.prototype._stopTimer = function() {
                this.timer && (clearInterval(this.timer),
                this.timer = null)
            }
            ,
            e.prototype._toggleTrackModes = function(t) {
                var e = this.media
                  , r = this.subtitleDisplay
                  , i = this.trackId;
                if (e) {
                    var n = a(e.textTracks);
                    if (-1 === t)
                        [].slice.call(n).forEach(function(t) {
                            t.mode = "disabled"
                        });
                    else {
                        var o = n[i];
                        o && (o.mode = "disabled")
                    }
                    var s = n[t];
                    s && (s.mode = r ? "showing" : "hidden")
                }
            }
            ,
            l(e, [{
                key: "subtitleTracks",
                get: function() {
                    return this.tracks
                }
            }, {
                key: "subtitleTrack",
                get: function() {
                    return this.trackId
                },
                set: function(t) {
                    this.trackId !== t && (this._toggleTrackModes(t),
                    this.setSubtitleTrackInternal(t))
                }
            }]),
            e
        }(u.a);
        e.a = h
    }
    , function(t, e, r) {
        "use strict";
        function i(t, e) {
            if (!(t instanceof e))
                throw new TypeError("Cannot call a class as a function")
        }
        function n(t, e) {
            if (!t)
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !e || "object" != typeof e && "function" != typeof e ? t : e
        }
        function o(t, e) {
            if ("function" != typeof e && null !== e)
                throw new TypeError("Super expression must either be null or a function, not " + typeof e);
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }),
            e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }
        var a = r(3)
          , s = r(2)
          , u = r(23)
          , c = r(25)
          , l = {
            STOPPED: "STOPPED",
            IDLE: "IDLE",
            KEY_LOADING: "KEY_LOADING",
            FRAG_LOADING: "FRAG_LOADING"
        }
          , h = function(t) {
            function e(r) {
                i(this, e);
                var o = n(this, t.call(this, r, a.a.MEDIA_ATTACHED, a.a.ERROR, a.a.KEY_LOADED, a.a.FRAG_LOADED, a.a.SUBTITLE_TRACKS_UPDATED, a.a.SUBTITLE_TRACK_SWITCH, a.a.SUBTITLE_TRACK_LOADED, a.a.SUBTITLE_FRAG_PROCESSED));
                return o.config = r.config,
                o.vttFragSNsProcessed = {},
                o.vttFragQueues = void 0,
                o.currentlyProcessing = null,
                o.state = l.STOPPED,
                o.currentTrackId = -1,
                o.decrypter = new u.a(r.observer,r.config),
                o
            }
            return o(e, t),
            e.prototype.onHandlerDestroyed = function() {
                this.state = l.STOPPED
            }
            ,
            e.prototype.clearVttFragQueues = function() {
                var t = this;
                this.vttFragQueues = {},
                this.tracks.forEach(function(e) {
                    t.vttFragQueues[e.id] = []
                })
            }
            ,
            e.prototype.nextFrag = function() {
                if (null === this.currentlyProcessing && this.currentTrackId > -1 && this.vttFragQueues[this.currentTrackId].length) {
                    var t = this.currentlyProcessing = this.vttFragQueues[this.currentTrackId].shift();
                    this.fragCurrent = t,
                    this.hls.trigger(a.a.FRAG_LOADING, {
                        frag: t
                    }),
                    this.state = l.FRAG_LOADING
                }
            }
            ,
            e.prototype.onSubtitleFragProcessed = function(t) {
                t.success && this.vttFragSNsProcessed[t.frag.trackId].push(t.frag.sn),
                this.currentlyProcessing = null,
                this.state = l.IDLE,
                this.nextFrag()
            }
            ,
            e.prototype.onMediaAttached = function() {
                this.state = l.IDLE
            }
            ,
            e.prototype.onError = function(t) {
                var e = t.frag;
                e && "subtitle" !== e.type || this.currentlyProcessing && (this.currentlyProcessing = null,
                this.nextFrag())
            }
            ,
            e.prototype.doTick = function() {
                var t = this;
                switch (this.state) {
                case l.IDLE:
                    var e = this.tracks
                      , r = this.currentTrackId
                      , i = this.vttFragSNsProcessed[r]
                      , n = this.vttFragQueues[r]
                      , o = this.currentlyProcessing ? this.currentlyProcessing.sn : -1
                      , u = function(t) {
                        return i.indexOf(t.sn) > -1
                    }
                      , c = function(t) {
                        return n.some(function(e) {
                            return e.sn === t.sn
                        })
                    };
                    if (!e)
                        break;
                    var h;
                    if (r < e.length && (h = e[r].details),
                    void 0 === h)
                        break;
                    h.fragments.forEach(function(e) {
                        u(e) || e.sn === o || c(e) || (e.encrypted ? (s.b.log("Loading key for " + e.sn),
                        t.state = l.KEY_LOADING,
                        t.hls.trigger(a.a.KEY_LOADING, {
                            frag: e
                        })) : (e.trackId = r,
                        n.push(e),
                        t.nextFrag()))
                    })
                }
            }
            ,
            e.prototype.onSubtitleTracksUpdated = function(t) {
                var e = this;
                s.b.log("subtitle tracks updated"),
                this.tracks = t.subtitleTracks,
                this.clearVttFragQueues(),
                this.vttFragSNsProcessed = {},
                this.tracks.forEach(function(t) {
                    e.vttFragSNsProcessed[t.id] = []
                })
            }
            ,
            e.prototype.onSubtitleTrackSwitch = function(t) {
                if (this.currentTrackId = t.id,
                this.tracks && -1 !== this.currentTrackId) {
                    var e = this.tracks[this.currentTrackId];
                    e && e.details && this.tick()
                }
            }
            ,
            e.prototype.onSubtitleTrackLoaded = function() {
                this.tick()
            }
            ,
            e.prototype.onKeyLoaded = function() {
                this.state === l.KEY_LOADING && (this.state = l.IDLE,
                this.tick())
            }
            ,
            // 第六个 onFragLoaded 跳转
            e.prototype.onFragLoaded = function(t) {
                var e = this.fragCurrent
                  , r = t.frag.decryptdata
                  , i = t.frag
                  , n = this.hls;
                if (this.state === l.FRAG_LOADING && e && "subtitle" === t.frag.type && e.sn === t.frag.sn && t.payload.byteLength > 0 && null != r && null != r.key && "AES-128" === r.method) {
                    var o = void 0;
                    try {
                        o = performance.now()
                    } catch (t) {
                        o = Date.now()
                    }
                    this.decrypter.decrypt(t.payload, r.key.buffer, r.iv.buffer, function(t) {
                        var e = void 0;
                        try {
                            e = performance.now()
                        } catch (t) {
                            e = Date.now()
                        }
                        n.trigger(a.a.FRAG_DECRYPTED, {
                            frag: i,
                            payload: t,
                            stats: {
                                tstart: o,
                                tdecrypt: e
                            }
                        })
                    })
                }
            }
            ,
            e
        }(c.a);
        e.a = h
    }
    , function(t, e, r) {
        "use strict";
        function i(t, e) {
            if (!(t instanceof e))
                throw new TypeError("Cannot call a class as a function")
        }
        function n(t, e) {
            if (!t)
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !e || "object" != typeof e && "function" != typeof e ? t : e
        }
        function o(t, e) {
            if ("function" != typeof e && null !== e)
                throw new TypeError("Super expression must either be null or a function, not " + typeof e);
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }),
            e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }
        var a = r(5)
          , s = r(3)
          , u = r(4)
          , c = r(2)
          , l = function() {
            function t(t, e) {
                for (var r = 0; r < e.length; r++) {
                    var i = e[r];
                    i.enumerable = i.enumerable || !1,
                    i.configurable = !0,
                    "value"in i && (i.writable = !0),
                    Object.defineProperty(t, i.key, i)
                }
            }
            return function(e, r, i) {
                return r && t(e.prototype, r),
                i && t(e, i),
                e
            }
        }()
          , h = {
            WIDEVINE: "com.widevine.alpha",
            PLAYREADY: "com.microsoft.playready"
        }
          , f = function(t, e, r) {
            var i = {
                videoCapabilities: []
            };
            return e.forEach(function(t) {
                i.videoCapabilities.push({
                    contentType: 'video/mp4; codecs="' + t + '"'
                })
            }),
            [i]
        }
          , d = function(t, e, r) {
            switch (t) {
            case h.WIDEVINE:
                return f(0, r);
            default:
                throw Error("Unknown key-system: " + t)
            }
        }
          , p = function(t) {
            function e(r) {
                i(this, e);
                var o = n(this, t.call(this, r, s.a.MEDIA_ATTACHED, s.a.MANIFEST_PARSED));
                return o._widevineLicenseUrl = r.config.widevineLicenseUrl,
                o._licenseXhrSetup = r.config.licenseXhrSetup,
                o._emeEnabled = r.config.emeEnabled,
                o._requestMediaKeySystemAccess = r.config.requestMediaKeySystemAccessFunc,
                o._mediaKeysList = [],
                o._media = null,
                o._hasSetMediaKeys = !1,
                o._isMediaEncrypted = !1,
                o._requestLicenseFailureCount = 0,
                o
            }
            return o(e, t),
            e.prototype.getLicenseServerUrl = function(t) {
                var e = void 0;
                switch (t) {
                case h.WIDEVINE:
                    e = this._widevineLicenseUrl;
                    break;
                default:
                    e = null
                }
                return e || (c.b.error('No license server URL configured for key-system "' + t + '"'),
                this.hls.trigger(s.a.ERROR, {
                    type: u.b.KEY_SYSTEM_ERROR,
                    details: u.a.KEY_SYSTEM_LICENSE_REQUEST_FAILED,
                    fatal: !0
                })),
                e
            }
            ,
            e.prototype._attemptKeySystemAccess = function(t, e, r) {
                var i = this
                  , n = d(t, 0, r);
                if (!n)
                    return void c.b.warn("Can not create config for key-system (maybe because platform is not supported):", t);
                c.b.log("Requesting encrypted media key-system access"),
                this.requestMediaKeySystemAccess(t, n).then(function(e) {
                    i._onMediaKeySystemAccessObtained(t, e)
                }).catch(function(e) {
                    c.b.error('Failed to obtain key-system "' + t + '" access:', e)
                })
            }
            ,
            e.prototype._onMediaKeySystemAccessObtained = function(t, e) {
                var r = this;
                c.b.log('Access for key-system "' + t + '" obtained');
                var i = {
                    mediaKeys: null,
                    mediaKeysSession: null,
                    mediaKeysSessionInitialized: !1,
                    mediaKeySystemAccess: e,
                    mediaKeySystemDomain: t
                };
                this._mediaKeysList.push(i),
                e.createMediaKeys().then(function(e) {
                    i.mediaKeys = e,
                    c.b.log('Media-keys created for key-system "' + t + '"'),
                    r._onMediaKeysCreated()
                }).catch(function(t) {
                    c.b.error("Failed to create media-keys:", t)
                })
            }
            ,
            e.prototype._onMediaKeysCreated = function() {
                var t = this;
                this._mediaKeysList.forEach(function(e) {
                    e.mediaKeysSession || (e.mediaKeysSession = e.mediaKeys.createSession(),
                    t._onNewMediaKeySession(e.mediaKeysSession))
                })
            }
            ,
            e.prototype._onNewMediaKeySession = function(t) {
                var e = this;
                c.b.log("New key-system session " + t.sessionId),
                t.addEventListener("message", function(r) {
                    e._onKeySessionMessage(t, r.message)
                }, !1)
            }
            ,
            e.prototype._onKeySessionMessage = function(t, e) {
                c.b.log("Got EME message event, creating license request"),
                this._requestLicense(e, function(e) {
                    c.b.log("Received license data, updating key-session"),
                    t.update(e)
                })
            }
            ,
            e.prototype._onMediaEncrypted = function(t, e) {
                c.b.log('Media is encrypted using "' + t + '" init data type'),
                this._isMediaEncrypted = !0,
                this._mediaEncryptionInitDataType = t,
                this._mediaEncryptionInitData = e,
                this._attemptSetMediaKeys(),
                this._generateRequestWithPreferredKeySession()
            }
            ,
            e.prototype._attemptSetMediaKeys = function() {
                if (!this._hasSetMediaKeys) {
                    var t = this._mediaKeysList[0];
                    if (!t || !t.mediaKeys)
                        return c.b.error("Fatal: Media is encrypted but no CDM access or no keys have been obtained yet"),
                        void this.hls.trigger(s.a.ERROR, {
                            type: u.b.KEY_SYSTEM_ERROR,
                            details: u.a.KEY_SYSTEM_NO_KEYS,
                            fatal: !0
                        });
                    c.b.log("Setting keys for encrypted media"),
                    this._media.setMediaKeys(t.mediaKeys),
                    this._hasSetMediaKeys = !0
                }
            }
            ,
            e.prototype._generateRequestWithPreferredKeySession = function() {
                var t = this
                  , e = this._mediaKeysList[0];
                if (!e)
                    return c.b.error("Fatal: Media is encrypted but not any key-system access has been obtained yet"),
                    void this.hls.trigger(s.a.ERROR, {
                        type: u.b.KEY_SYSTEM_ERROR,
                        details: u.a.KEY_SYSTEM_NO_ACCESS,
                        fatal: !0
                    });
                if (e.mediaKeysSessionInitialized)
                    return void c.b.warn("Key-Session already initialized but requested again");
                var r = e.mediaKeysSession;
                r || (c.b.error("Fatal: Media is encrypted but no key-session existing"),
                this.hls.trigger(s.a.ERROR, {
                    type: u.b.KEY_SYSTEM_ERROR,
                    details: u.a.KEY_SYSTEM_NO_SESSION,
                    fatal: !0
                }));
                var i = this._mediaEncryptionInitDataType
                  , n = this._mediaEncryptionInitData;
                c.b.log('Generating key-session request for "' + i + '" init data type'),
                e.mediaKeysSessionInitialized = !0,
                r.generateRequest(i, n).then(function() {
                    c.b.debug("Key-session generation succeeded")
                }).catch(function(e) {
                    c.b.error("Error generating key-session request:", e),
                    t.hls.trigger(s.a.ERROR, {
                        type: u.b.KEY_SYSTEM_ERROR,
                        details: u.a.KEY_SYSTEM_NO_SESSION,
                        fatal: !1
                    })
                })
            }
            ,
            e.prototype._createLicenseXhr = function(t, e, r) {
                var i = new XMLHttpRequest
                  , n = this._licenseXhrSetup;
                try {
                    if (n)
                        try {
                            n(i, t)
                        } catch (e) {
                            i.open("POST", t, !0),
                            n(i, t)
                        }
                    i.readyState || i.open("POST", t, !0)
                } catch (t) {
                    return c.b.error("Error setting up key-system license XHR", t),
                    void this.hls.trigger(s.a.ERROR, {
                        type: u.b.KEY_SYSTEM_ERROR,
                        details: u.a.KEY_SYSTEM_LICENSE_REQUEST_FAILED,
                        fatal: !0
                    })
                }
                return i.responseType = "arraybuffer",
                i.onreadystatechange = this._onLicenseRequestReadyStageChange.bind(this, i, t, e, r),
                i
            }
            ,
            e.prototype._onLicenseRequestReadyStageChange = function(t, e, r, i) {
                switch (t.readyState) {
                case 4:
                    if (200 === t.status)
                        this._requestLicenseFailureCount = 0,
                        c.b.log("License request succeeded"),
                        i(t.response);
                    else {
                        if (c.b.error("License Request XHR failed (" + e + "). Status: " + t.status + " (" + t.statusText + ")"),
                        ++this._requestLicenseFailureCount <= 3) {
                            var n = 3 - this._requestLicenseFailureCount + 1;
                            return c.b.warn("Retrying license request, " + n + " attempts left"),
                            void this._requestLicense(r, i)
                        }
                        this.hls.trigger(s.a.ERROR, {
                            type: u.b.KEY_SYSTEM_ERROR,
                            details: u.a.KEY_SYSTEM_LICENSE_REQUEST_FAILED,
                            fatal: !0
                        })
                    }
                }
            }
            ,
            e.prototype._generateLicenseRequestChallenge = function(t, e) {
                var r = void 0;
                return t.mediaKeySystemDomain === h.PLAYREADY ? c.b.error("PlayReady is not supported (yet)") : t.mediaKeySystemDomain === h.WIDEVINE ? r = e : c.b.error("Unsupported key-system:", t.mediaKeySystemDomain),
                r
            }
            ,
            e.prototype._requestLicense = function(t, e) {
                c.b.log("Requesting content license for key-system");
                var r = this._mediaKeysList[0];
                if (!r)
                    return c.b.error("Fatal error: Media is encrypted but no key-system access has been obtained yet"),
                    void this.hls.trigger(s.a.ERROR, {
                        type: u.b.KEY_SYSTEM_ERROR,
                        details: u.a.KEY_SYSTEM_NO_ACCESS,
                        fatal: !0
                    });
                var i = this.getLicenseServerUrl(r.mediaKeySystemDomain)
                  , n = this._createLicenseXhr(i, t, e);
                c.b.log("Sending license request to URL: " + i),
                n.send(this._generateLicenseRequestChallenge(r, t))
            }
            ,
            e.prototype.onMediaAttached = function(t) {
                var e = this;
                if (this._emeEnabled) {
                    var r = t.media;
                    this._media = r,
                    r.addEventListener("encrypted", function(t) {
                        e._onMediaEncrypted(t.initDataType, t.initData)
                    })
                }
            }
            ,
            e.prototype.onManifestParsed = function(t) {
                if (this._emeEnabled) {
                    var e = t.levels.map(function(t) {
                        return t.audioCodec
                    })
                      , r = t.levels.map(function(t) {
                        return t.videoCodec
                    });
                    this._attemptKeySystemAccess(h.WIDEVINE, e, r)
                }
            }
            ,
            l(e, [{
                key: "requestMediaKeySystemAccess",
                get: function() {
                    if (!this._requestMediaKeySystemAccess)
                        throw new Error("No requestMediaKeySystemAccess function configured");
                    return this._requestMediaKeySystemAccess
                }
            }]),
            e
        }(a.a);
        e.a = p
    }
    , function(t, e, r) {
        "use strict";
        r.d(e, "a", function() {
            return i
        });
        var i = function() {
            return "undefined" != typeof window && window.navigator && window.navigator.requestMediaKeySystemAccess ? window.navigator.requestMediaKeySystemAccess.bind(window.navigator) : null
        }()
    }
    , function(t, e) {
        /*! http://mths.be/endswith v0.2.0 by @mathias */
        String.prototype.endsWith || function() {
            "use strict";
            var t = function() {
                try {
                    var t = {}
                      , e = Object.defineProperty
                      , r = e(t, t, t) && e
                } catch (t) {}
                return r
            }()
              , e = {}.toString
              , r = function(t) {
                if (null == this)
                    throw TypeError();
                var r = String(this);
                if (t && "[object RegExp]" == e.call(t))
                    throw TypeError();
                var i = r.length
                  , n = String(t)
                  , o = n.length
                  , a = i;
                if (arguments.length > 1) {
                    var s = arguments[1];
                    void 0 !== s && (a = s ? Number(s) : 0) != a && (a = 0)
                }
                var u = Math.min(Math.max(a, 0), i)
                  , c = u - o;
                if (c < 0)
                    return !1;
                for (var l = -1; ++l < o; )
                    if (r.charCodeAt(c + l) != n.charCodeAt(l))
                        return !1;
                return !0
            };
            t ? t(String.prototype, "endsWith", {
                value: r,
                configurable: !0,
                writable: !0
            }) : String.prototype.endsWith = r
        }()
    }
    ]).default
});
//# sourceMappingURL=aliplayer-hls-min.js.map
