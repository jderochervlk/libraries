;(() => {
  var e = {
      360: (e, n) => {
        var t, r, o
        ;(r = []),
          void 0 ===
            (o =
              "function" ==
              typeof (t = () => {
                function e(h) {
                  var m = {
                    single: (e, n, t) =>
                      e
                        ? (d(e) || (e = m.getPreparedSearch(e)),
                          n
                            ? (d(n) || (n = m.getPrepared(n)),
                              ((
                                t && void 0 !== t.allowTypo
                                  ? t.allowTypo
                                  : !h || void 0 === h.allowTypo || h.allowTypo
                              )
                                ? m.algorithm
                                : m.algorithmNoTypo)(e, n, e[0]))
                            : null)
                        : null,
                    go: (e, n, t) => {
                      if (!e) return o
                      var r = (e = m.prepareSearch(e))[0],
                        a =
                          (t && t.threshold) ||
                          (h && h.threshold) ||
                          -9007199254740991,
                        i =
                          (t && t.limit) || (h && h.limit) || 9007199254740991,
                        s = (
                          t && void 0 !== t.allowTypo
                            ? t.allowTypo
                            : !h || void 0 === h.allowTypo || h.allowTypo
                        )
                          ? m.algorithm
                          : m.algorithmNoTypo,
                        u = 0,
                        f = 0,
                        g = n.length
                      if (t && t.keys)
                        for (
                          var v = t.scoreFn || l,
                            y = t.keys,
                            w = y.length,
                            b = g - 1;
                          b >= 0;
                          --b
                        ) {
                          for (
                            var k = n[b], x = new Array(w), j = w - 1;
                            j >= 0;
                            --j
                          )
                            (T = c(k, (L = y[j])))
                              ? (d(T) || (T = m.getPrepared(T)),
                                (x[j] = s(e, T, r)))
                              : (x[j] = null)
                          x.obj = k
                          var I = v(x)
                          null !== I &&
                            (I < a ||
                              ((x.score = I),
                              u < i
                                ? (p.add(x), ++u)
                                : (++f, I > p.peek().score && p.replaceTop(x))))
                        }
                      else if (t && t.key) {
                        var L = t.key
                        for (b = g - 1; b >= 0; --b)
                          (T = c((k = n[b]), L)) &&
                            (d(T) || (T = m.getPrepared(T)),
                            null !== (B = s(e, T, r)) &&
                              (B.score < a ||
                                ((B = {
                                  target: B.target,
                                  _targetLowerCodes: null,
                                  _nextBeginningIndexes: null,
                                  score: B.score,
                                  indexes: B.indexes,
                                  obj: k,
                                }),
                                u < i
                                  ? (p.add(B), ++u)
                                  : (++f,
                                    B.score > p.peek().score &&
                                      p.replaceTop(B)))))
                      } else
                        for (b = g - 1; b >= 0; --b) {
                          var T, B
                          ;(T = n[b]) &&
                            (d(T) || (T = m.getPrepared(T)),
                            null !== (B = s(e, T, r)) &&
                              (B.score < a ||
                                (u < i
                                  ? (p.add(B), ++u)
                                  : (++f,
                                    B.score > p.peek().score &&
                                      p.replaceTop(B)))))
                        }
                      if (0 === u) return o
                      var E = new Array(u)
                      for (b = u - 1; b >= 0; --b) E[b] = p.poll()
                      return (E.total = u + f), E
                    },
                    goAsync: (e, t, r) => {
                      var a = !1,
                        i = new Promise((i, s) => {
                          if (!e) return i(o)
                          var p = (e = m.prepareSearch(e))[0],
                            f = u(),
                            g = t.length - 1,
                            v =
                              (r && r.threshold) ||
                              (h && h.threshold) ||
                              -9007199254740991,
                            y =
                              (r && r.limit) ||
                              (h && h.limit) ||
                              9007199254740991,
                            w = (
                              r && void 0 !== r.allowTypo
                                ? r.allowTypo
                                : !h || void 0 === h.allowTypo || h.allowTypo
                            )
                              ? m.algorithm
                              : m.algorithmNoTypo,
                            b = 0,
                            k = 0
                          function x() {
                            if (a) return s("canceled")
                            var u = Date.now()
                            if (r && r.keys)
                              for (
                                var h = r.scoreFn || l,
                                  j = r.keys,
                                  I = j.length;
                                g >= 0;
                                --g
                              ) {
                                for (
                                  var L = t[g], T = new Array(I), B = I - 1;
                                  B >= 0;
                                  --B
                                )
                                  (_ = c(L, (S = j[B])))
                                    ? (d(_) || (_ = m.getPrepared(_)),
                                      (T[B] = w(e, _, p)))
                                    : (T[B] = null)
                                T.obj = L
                                var E = h(T)
                                if (
                                  null !== E &&
                                  !(E < v) &&
                                  ((T.score = E),
                                  b < y
                                    ? (f.add(T), ++b)
                                    : (++k,
                                      E > f.peek().score && f.replaceTop(T)),
                                  g % 1e3 == 0 && Date.now() - u >= 10)
                                )
                                  return void (n
                                    ? setImmediate(x)
                                    : setTimeout(x))
                              }
                            else if (r && r.key) {
                              for (var S = r.key; g >= 0; --g)
                                if (
                                  (_ = c((L = t[g]), S)) &&
                                  (d(_) || (_ = m.getPrepared(_)),
                                  null !== (M = w(e, _, p)) &&
                                    !(M.score < v) &&
                                    ((M = {
                                      target: M.target,
                                      _targetLowerCodes: null,
                                      _nextBeginningIndexes: null,
                                      score: M.score,
                                      indexes: M.indexes,
                                      obj: L,
                                    }),
                                    b < y
                                      ? (f.add(M), ++b)
                                      : (++k,
                                        M.score > f.peek().score &&
                                          f.replaceTop(M)),
                                    g % 1e3 == 0 && Date.now() - u >= 10))
                                )
                                  return void (n
                                    ? setImmediate(x)
                                    : setTimeout(x))
                            } else
                              for (; g >= 0; --g) {
                                var _, M
                                if (
                                  (_ = t[g]) &&
                                  (d(_) || (_ = m.getPrepared(_)),
                                  null !== (M = w(e, _, p)) &&
                                    !(M.score < v) &&
                                    (b < y
                                      ? (f.add(M), ++b)
                                      : (++k,
                                        M.score > f.peek().score &&
                                          f.replaceTop(M)),
                                    g % 1e3 == 0 && Date.now() - u >= 10))
                                )
                                  return void (n
                                    ? setImmediate(x)
                                    : setTimeout(x))
                              }
                            if (0 === b) return i(o)
                            for (var C = new Array(b), N = b - 1; N >= 0; --N)
                              C[N] = f.poll()
                            ;(C.total = b + k), i(C)
                          }
                          n ? setImmediate(x) : x()
                        })
                      return (
                        (i.cancel = () => {
                          a = !0
                        }),
                        i
                      )
                    },
                    highlight: (e, n, t) => {
                      if (null === e) return null
                      void 0 === n && (n = "<b>"), void 0 === t && (t = "</b>")
                      for (
                        var r = "",
                          o = 0,
                          a = !1,
                          i = e.target,
                          s = i.length,
                          l = e.indexes,
                          c = 0;
                        c < s;
                        ++c
                      ) {
                        var d = i[c]
                        if (l[o] === c) {
                          if ((a || ((a = !0), (r += n)), ++o === l.length)) {
                            r += d + t + i.substr(c + 1)
                            break
                          }
                        } else a && ((a = !1), (r += t))
                        r += d
                      }
                      return r
                    },
                    prepare: (e) => {
                      if (e)
                        return {
                          target: e,
                          _targetLowerCodes: m.prepareLowerCodes(e),
                          _nextBeginningIndexes: null,
                          score: null,
                          indexes: null,
                          obj: null,
                        }
                    },
                    prepareSlow: (e) => {
                      if (e)
                        return {
                          target: e,
                          _targetLowerCodes: m.prepareLowerCodes(e),
                          _nextBeginningIndexes:
                            m.prepareNextBeginningIndexes(e),
                          score: null,
                          indexes: null,
                          obj: null,
                        }
                    },
                    prepareSearch: (e) => {
                      if (e) return m.prepareLowerCodes(e)
                    },
                    getPrepared: (e) => {
                      if (e.length > 999) return m.prepare(e)
                      var n = t.get(e)
                      return (
                        void 0 !== n || ((n = m.prepare(e)), t.set(e, n)), n
                      )
                    },
                    getPreparedSearch: (e) => {
                      if (e.length > 999) return m.prepareSearch(e)
                      var n = r.get(e)
                      return (
                        void 0 !== n || ((n = m.prepareSearch(e)), r.set(e, n)),
                        n
                      )
                    },
                    algorithm: (e, n, t) => {
                      for (
                        var r = n._targetLowerCodes,
                          o = e.length,
                          s = r.length,
                          l = 0,
                          c = 0,
                          d = 0,
                          u = 0;
                        ;
                      ) {
                        if (t === r[c]) {
                          if (((a[u++] = c), ++l === o)) break
                          t =
                            e[
                              0 === d
                                ? l
                                : d === l
                                  ? l + 1
                                  : d === l - 1
                                    ? l - 1
                                    : l
                            ]
                        }
                        if (++c >= s)
                          for (;;) {
                            if (l <= 1) return null
                            if (0 === d) {
                              if (t === e[--l]) continue
                              d = l
                            } else {
                              if (1 === d) return null
                              if ((t = e[1 + (l = --d)]) === e[l]) continue
                            }
                            c = a[(u = l) - 1] + 1
                            break
                          }
                      }
                      l = 0
                      var p = 0,
                        h = !1,
                        f = 0,
                        g = n._nextBeginningIndexes
                      null === g &&
                        (g = n._nextBeginningIndexes =
                          m.prepareNextBeginningIndexes(n.target))
                      var v = (c = 0 === a[0] ? 0 : g[a[0] - 1])
                      if (c !== s)
                        for (;;)
                          if (c >= s) {
                            if (l <= 0) {
                              if (++p > o - 2) break
                              if (e[p] === e[p + 1]) continue
                              c = v
                              continue
                            }
                            --l, (c = g[i[--f]])
                          } else if (
                            e[
                              0 === p
                                ? l
                                : p === l
                                  ? l + 1
                                  : p === l - 1
                                    ? l - 1
                                    : l
                            ] === r[c]
                          ) {
                            if (((i[f++] = c), ++l === o)) {
                              h = !0
                              break
                            }
                            ++c
                          } else c = g[c]
                      if (h)
                        var y = i,
                          w = f
                      else (y = a), (w = u)
                      for (var b = 0, k = -1, x = 0; x < o; ++x)
                        k !== (c = y[x]) - 1 && (b -= c), (k = c)
                      for (
                        h
                          ? 0 !== p && (b += -20)
                          : ((b *= 1e3), 0 !== d && (b += -20)),
                          b -= s - o,
                          n.score = b,
                          n.indexes = new Array(w),
                          x = w - 1;
                        x >= 0;
                        --x
                      )
                        n.indexes[x] = y[x]
                      return n
                    },
                    algorithmNoTypo: (e, n, t) => {
                      for (
                        var r = n._targetLowerCodes,
                          o = e.length,
                          s = r.length,
                          l = 0,
                          c = 0,
                          d = 0;
                        ;
                      ) {
                        if (t === r[c]) {
                          if (((a[d++] = c), ++l === o)) break
                          t = e[l]
                        }
                        if (++c >= s) return null
                      }
                      l = 0
                      var u = !1,
                        p = 0,
                        h = n._nextBeginningIndexes
                      if (
                        (null === h &&
                          (h = n._nextBeginningIndexes =
                            m.prepareNextBeginningIndexes(n.target)),
                        (c = 0 === a[0] ? 0 : h[a[0] - 1]) !== s)
                      )
                        for (;;)
                          if (c >= s) {
                            if (l <= 0) break
                            --l, (c = h[i[--p]])
                          } else if (e[l] === r[c]) {
                            if (((i[p++] = c), ++l === o)) {
                              u = !0
                              break
                            }
                            ++c
                          } else c = h[c]
                      if (u)
                        var f = i,
                          g = p
                      else (f = a), (g = d)
                      for (var v = 0, y = -1, w = 0; w < o; ++w)
                        y !== (c = f[w]) - 1 && (v -= c), (y = c)
                      for (
                        u || (v *= 1e3),
                          v -= s - o,
                          n.score = v,
                          n.indexes = new Array(g),
                          w = g - 1;
                        w >= 0;
                        --w
                      )
                        n.indexes[w] = f[w]
                      return n
                    },
                    prepareLowerCodes: (e) => {
                      for (
                        var n = e.length, t = [], r = e.toLowerCase(), o = 0;
                        o < n;
                        ++o
                      )
                        t[o] = r.charCodeAt(o)
                      return t
                    },
                    prepareBeginningIndexes: (e) => {
                      for (
                        var n = e.length, t = [], r = 0, o = !1, a = !1, i = 0;
                        i < n;
                        ++i
                      ) {
                        var s = e.charCodeAt(i),
                          l = s >= 65 && s <= 90,
                          c =
                            l || (s >= 97 && s <= 122) || (s >= 48 && s <= 57),
                          d = (l && !o) || !a || !c
                        ;(o = l), (a = c), d && (t[r++] = i)
                      }
                      return t
                    },
                    prepareNextBeginningIndexes: (e) => {
                      for (
                        var n = e.length,
                          t = m.prepareBeginningIndexes(e),
                          r = [],
                          o = t[0],
                          a = 0,
                          i = 0;
                        i < n;
                        ++i
                      )
                        o > i
                          ? (r[i] = o)
                          : ((o = t[++a]), (r[i] = void 0 === o ? n : o))
                      return r
                    },
                    cleanup: s,
                    new: e,
                  }
                  return m
                }
                var n = "undefined" == typeof window,
                  t = new Map(),
                  r = new Map(),
                  o = []
                o.total = 0
                var a = [],
                  i = []
                function s() {
                  t.clear(), r.clear(), (a = []), (i = [])
                }
                function l(e) {
                  for (
                    var n = -9007199254740991, t = e.length - 1;
                    t >= 0;
                    --t
                  ) {
                    var r = e[t]
                    if (null !== r) {
                      var o = r.score
                      o > n && (n = o)
                    }
                  }
                  return -9007199254740991 === n ? null : n
                }
                function c(e, n) {
                  var t = e[n]
                  if (void 0 !== t) return t
                  var r = n
                  Array.isArray(n) || (r = n.split("."))
                  for (var o = r.length, a = -1; e && ++a < o; ) e = e[r[a]]
                  return e
                }
                function d(e) {
                  return "object" == typeof e
                }
                var u = () => {
                    var e = [],
                      n = 0,
                      t = {}
                    function r() {
                      for (var t = 0, r = e[t], o = 1; o < n; ) {
                        var a = o + 1
                        ;(t = o),
                          a < n && e[a].score < e[o].score && (t = a),
                          (e[(t - 1) >> 1] = e[t]),
                          (o = 1 + (t << 1))
                      }
                      for (
                        var i = (t - 1) >> 1;
                        t > 0 && r.score < e[i].score;
                        i = ((t = i) - 1) >> 1
                      )
                        e[t] = e[i]
                      e[t] = r
                    }
                    return (
                      (t.add = (t) => {
                        var r = n
                        e[n++] = t
                        for (
                          var o = (r - 1) >> 1;
                          r > 0 && t.score < e[o].score;
                          o = ((r = o) - 1) >> 1
                        )
                          e[r] = e[o]
                        e[r] = t
                      }),
                      (t.poll = () => {
                        if (0 !== n) {
                          var t = e[0]
                          return (e[0] = e[--n]), r(), t
                        }
                      }),
                      (t.peek = (t) => {
                        if (0 !== n) return e[0]
                      }),
                      (t.replaceTop = (n) => {
                        ;(e[0] = n), r()
                      }),
                      t
                    )
                  },
                  p = u()
                return e()
              })
                ? t.apply(n, r)
                : t) || (e.exports = o)
      },
      228: function (e, n, t) {
        var r =
          (this && this.__values) ||
          ((e) => {
            var n = "function" == typeof Symbol && Symbol.iterator,
              t = n && e[n],
              r = 0
            if (t) return t.call(e)
            if (e && "number" == typeof e.length)
              return {
                next: () => (
                  e && r >= e.length && (e = void 0),
                  { value: e && e[r++], done: !e }
                ),
              }
            throw new TypeError(
              n ? "Object is not iterable." : "Symbol.iterator is not defined.",
            )
          })
        Object.defineProperty(n, "__esModule", { value: !0 })
        var o = t(734),
          a = t(304)
        ;(0, t(343).initTheme)(),
          window.addEventListener("load", () => {
            var e,
              n,
              t,
              i,
              s,
              l,
              c,
              d = localStorage.getItem("dropdowns")
                ? JSON.parse(localStorage.getItem("dropdowns") || "{}")
                : {},
              u = (e) => {
                var n =
                  null === (c = e.parentElement) || void 0 === c
                    ? void 0
                    : c.getElementsByClassName("collapsible-body")[0]
                if (!n) return { value: void 0 }
                var t = e.getElementsByClassName("collapsible-arrow")[0],
                  r = d[e.textContent || ""]
                !1 === r
                  ? (n.classList.remove("open"), t.classList.remove("open"))
                  : !0 === r &&
                    (n.classList.add("open"), t.classList.add("open")),
                  (e.onclick = () => {
                    ;(d[e.textContent || ""] = n.classList.toggle("open")),
                      localStorage.setItem("dropdowns", JSON.stringify(d)),
                      t && t.classList.toggle("open")
                  })
              }
            try {
              for (
                var p = r(
                    document.getElementsByClassName("collapsible-trigger"),
                  ),
                  h = p.next();
                !h.done;
                h = p.next()
              ) {
                var m = u(h.value)
                if ("object" == typeof m) return m.value
              }
            } catch (n) {
              e = { error: n }
            } finally {
              try {
                h && !h.done && (n = p.return) && n.call(p)
              } finally {
                if (e) throw e.error
              }
            }
            var f = (e) => {
              var n,
                t = e.getElementsByClassName("c-tooltip-content")[0]
              if (!t) return "continue"
              ;(e.onmouseover = () => {
                n && clearTimeout(n),
                  (n = setTimeout(() => {
                    t.classList.add("open")
                  }, 600))
              }),
                (e.onmouseleave = () => {
                  clearTimeout(n), t.classList.remove("open")
                })
            }
            try {
              for (
                var g = r(document.getElementsByClassName("c-tooltip")),
                  v = g.next();
                !v.done;
                v = g.next()
              ) {
                f(v.value)
              }
            } catch (e) {
              t = { error: e }
            } finally {
              try {
                v && !v.done && (i = g.return) && i.call(g)
              } finally {
                if (t) throw t.error
              }
            }
            var y = (e) => {
              for (
                var n = e.getElementsByClassName("tab-code-tab"),
                  t = e.getElementsByClassName("tab-code-code"),
                  r = n.length,
                  o = (e) => {
                    var o = n[e]
                    o.onclick = () => {
                      if (!o.classList.contains("selected")) {
                        o.classList.add("selected"),
                          (t[e].style.display = "block")
                        for (var a = 0; a < r; a++)
                          a !== e &&
                            (n[a].classList.remove("selected"),
                            (t[a].style.display = "none"))
                      }
                    }
                  },
                  a = 0;
                a < r;
                a++
              )
                o(a)
              n[0].classList.add("selected"), (t[0].style.display = "block")
            }
            try {
              for (
                var w = r(document.getElementsByClassName("tab-code")),
                  b = w.next();
                !b.done;
                b = w.next()
              ) {
                y(b.value)
              }
            } catch (e) {
              s = { error: e }
            } finally {
              try {
                b && !b.done && (l = w.return) && l.call(w)
              } finally {
                if (s) throw s.error
              }
            }
            var k = document.getElementById("branch-select")
            k &&
              (k.onchange = (e) => {
                var n = e.target
                window.ab && (window.depth += "../"),
                  "main" === n.value
                    ? (location.href = window.depth + "index.html")
                    : (location.href =
                        window.depth + "b." + n.value + "/index.html")
              })
            var x = document.getElementById("content-main"),
              j = document.getElementById("search-menu"),
              I = new URLSearchParams(window.location.search)
            I.has("search")
              ? j.classList.remove("d-none")
              : x.classList.remove("d-none"),
              (0, o.initSearch)(I, x, j)
            var L = document.getElementById("to-top"),
              T = document.getElementById("content")
            T.addEventListener("scroll", () => {
              T.scrollTop > 600 || T.scrollTop > 600
                ? (L.style.display = "block")
                : (L.style.display = "none")
            }),
              (L.onclick = () => T.scroll({ top: 0, behavior: "smooth" })),
              (0, a.initSidebar)(x)
          })
      },
      734: function (e, n, t) {
        var r =
            (this && this.__assign) ||
            function () {
              return (
                (r =
                  Object.assign ||
                  ((e) => {
                    for (var n, t = 1, r = arguments.length; t < r; t++)
                      for (var o in (n = arguments[t]))
                        Object.prototype.hasOwnProperty.call(n, o) &&
                          (e[o] = n[o])
                    return e
                  })),
                r.apply(this, arguments)
              )
            },
          o =
            (this && this.__awaiter) ||
            ((e, n, t, r) =>
              new (t || (t = Promise))((o, a) => {
                function i(e) {
                  try {
                    l(r.next(e))
                  } catch (e) {
                    a(e)
                  }
                }
                function s(e) {
                  try {
                    l(r.throw(e))
                  } catch (e) {
                    a(e)
                  }
                }
                function l(e) {
                  var n
                  e.done
                    ? o(e.value)
                    : ((n = e.value),
                      n instanceof t
                        ? n
                        : new t((e) => {
                            e(n)
                          })).then(i, s)
                }
                l((r = r.apply(e, n || [])).next())
              })),
          a =
            (this && this.__generator) ||
            ((e, n) => {
              var t,
                r,
                o,
                a,
                i = {
                  label: 0,
                  sent: () => {
                    if (1 & o[0]) throw o[1]
                    return o[1]
                  },
                  trys: [],
                  ops: [],
                }
              return (
                (a = { next: s(0), throw: s(1), return: s(2) }),
                "function" == typeof Symbol &&
                  (a[Symbol.iterator] = function () {
                    return this
                  }),
                a
              )
              function s(a) {
                return (s) =>
                  ((a) => {
                    if (t)
                      throw new TypeError("Generator is already executing.")
                    while (i)
                      try {
                        if (
                          ((t = 1),
                          r &&
                            (o =
                              2 & a[0]
                                ? r.return
                                : a[0]
                                  ? r.throw || ((o = r.return) && o.call(r), 0)
                                  : r.next) &&
                            !(o = o.call(r, a[1])).done)
                        )
                          return o
                        switch (
                          ((r = 0), o && (a = [2 & a[0], o.value]), a[0])
                        ) {
                          case 0:
                          case 1:
                            o = a
                            break
                          case 4:
                            return i.label++, { value: a[1], done: !1 }
                          case 5:
                            i.label++, (r = a[1]), (a = [0])
                            continue
                          case 7:
                            ;(a = i.ops.pop()), i.trys.pop()
                            continue
                          default:
                            if (
                              !((o = i.trys),
                              (o = o.length > 0 && o[o.length - 1]) ||
                                (6 !== a[0] && 2 !== a[0]))
                            ) {
                              i = 0
                              continue
                            }
                            if (
                              3 === a[0] &&
                              (!o || (a[1] > o[0] && a[1] < o[3]))
                            ) {
                              i.label = a[1]
                              break
                            }
                            if (6 === a[0] && i.label < o[1]) {
                              ;(i.label = o[1]), (o = a)
                              break
                            }
                            if (o && i.label < o[2]) {
                              ;(i.label = o[2]), i.ops.push(a)
                              break
                            }
                            o[2] && i.ops.pop(), i.trys.pop()
                            continue
                        }
                        a = n.call(e, i)
                      } catch (e) {
                        ;(a = [6, e]), (r = 0)
                      } finally {
                        t = o = 0
                      }
                    if (5 & a[0]) throw a[1]
                    return { value: a[0] ? a[1] : void 0, done: !0 }
                  })([a, s])
              }
            }),
          i =
            (this && this.__values) ||
            ((e) => {
              var n = "function" == typeof Symbol && Symbol.iterator,
                t = n && e[n],
                r = 0
              if (t) return t.call(e)
              if (e && "number" == typeof e.length)
                return {
                  next: () => (
                    e && r >= e.length && (e = void 0),
                    { value: e && e[r++], done: !e }
                  ),
                }
              throw new TypeError(
                n
                  ? "Object is not iterable."
                  : "Symbol.iterator is not defined.",
              )
            }),
          s =
            (this && this.__read) ||
            ((e, n) => {
              var t = "function" == typeof Symbol && e[Symbol.iterator]
              if (!t) return e
              var r,
                o,
                a = t.call(e),
                i = []
              try {
                while ((void 0 === n || n-- > 0) && !(r = a.next()).done)
                  i.push(r.value)
              } catch (e) {
                o = { error: e }
              } finally {
                try {
                  r && !r.done && (t = a.return) && t.call(a)
                } finally {
                  if (o) throw o.error
                }
              }
              return i
            }),
          l =
            (this && this.__spreadArray) ||
            ((e, n, t) => {
              if (t || 2 === arguments.length)
                for (var r, o = 0, a = n.length; o < a; o++)
                  (!r && o in n) ||
                    (r || (r = Array.prototype.slice.call(n, 0, o)),
                    (r[o] = n[o]))
              return e.concat(r || Array.prototype.slice.call(n))
            })
        Object.defineProperty(n, "__esModule", { value: !0 }),
          (n.initSearch = void 0)
        var c = t(360)
        function d(e, n) {
          return (e & n) === n
        }
        var u,
          p = "",
          h = []
        function m(e, n) {
          return o(this, void 0, void 0, function () {
            return a(this, (t) =>
              h
                ? ((p = e),
                  (u = ((e, n) =>
                    h
                      ? e.includes(".")
                        ? (0, c.go)(
                            e,
                            n.map((e) =>
                              r(r({}, e), {
                                oldName: e.name,
                                name: (e.obj || "") + "." + e.name,
                              }),
                            ),
                            {
                              key: "name",
                              allowTypo: !0,
                              limit: 100,
                              threshold: -6e3,
                            },
                          ).map(
                            (e) => (
                              (e.obj.highlighted = e.obj.oldName),
                              (e.obj.name = e.obj.oldName),
                              e.obj
                            ),
                          )
                        : (0, c.go)(e, n, {
                            key: "name",
                            allowTypo: !0,
                            limit: 100,
                            threshold: -6e3,
                          })
                            .concat()
                            .sort((e, n) =>
                              e.score < -5e3 || n.score > -1e3
                                ? 0
                                : e.obj.type - n.obj.type,
                            )
                            .map(
                              (e) => (
                                (e.obj.highlighted = (0, c.highlight)(
                                  e,
                                  '<span class="dotted-bottom">',
                                  "</span>",
                                )),
                                e.obj
                              ),
                            )
                      : [])(
                    e,
                    ((e, n) => {
                      var t,
                        r,
                        o = []
                      try {
                        for (
                          var a = i(n), s = a.next();
                          !s.done;
                          s = a.next()
                        ) {
                          var l = s.value
                          if (
                            (!e.thisModuleOnly.checked ||
                              !window.lm ||
                              l.path[0] === window.lm) &&
                            (e.privates.checked || !l.isPrivate) &&
                              (e.classes.checked || 0 !== l.type) &&
                              (e.interfaces.checked || 1 !== l.type) &&
                              (e.enums.checked || 2 !== l.type) &&
                              (e.functions.checked || 3 !== l.type) &&
                              (e.types.checked || 5 !== l.type) &&
                              (e.constants.checked || 4 !== l.type) &&
                            (e.properties.checked ||
                              (6 !== l.type && 7 !== l.type))
                          ) {
                            if (8 === l.type) {
                              if (!e.methods.checked) continue
                              if (!e.setters.checked && l.isSetter) continue
                              if (!e.getters.checked && l.isGetter) continue
                            }
                            ;(e.enumMembers.checked || 9 !== l.type) &&
                              o.push(l)
                          }
                        }
                      } catch (e) {
                        t = { error: e }
                      } finally {
                        try {
                          s && !s.done && (r = a.return) && r.call(a)
                        } finally {
                          if (t) throw t.error
                        }
                      }
                      return o
                    })(n, h),
                  )),
                  ((e) => {
                    var n = document.getElementById("search-result-list")
                    if (!e.length)
                      return void (n.innerHTML =
                        '<h1 class="text-center">No results!</h1>')
                    if (1 === e.length)
                      n.innerHTML =
                        "\n         <div>\n         " +
                        e.map((e) => f(e)).join("") +
                        "\n         </div>\n        "
                    else {
                      for (var t = "", r = "", o = 0; o < e.length; o++)
                        o % 2 != 0 ? (r += f(e[o])) : (t += f(e[o]))
                      n.innerHTML =
                        '\n    <div class="row">\n    <div class="col" style="max-width: 500px">\n    ' +
                        t +
                        '\n    </div>\n    <div class="col" style="max-width: 500px">\n    ' +
                        r +
                        "\n    </div>\n    </div>\n    "
                    }
                  })(u),
                  [2])
                : [2],
            )
          })
        }
        function f(e) {
          var n = e.path.slice(),
            t = ""
          switch (e.type) {
            case 0:
              t =
                '<div>\n            <span class="keyword">class</span>\n            <a href="' +
                window.depth +
                n.map((e) => "m." + e).join("/") +
                "/class/" +
                e.name +
                '.html" class="item-name object">' +
                e.highlighted +
                "</a>\n            " +
                (e.comment ? '<p class="docblock">' + e.comment + "</p>" : "") +
                "\n            " +
                (n.length
                  ? '<p class="docblock secondary">In ' + n.join("/") + "</p>"
                  : "") +
                "\n            </div>"
              break
            case 1:
              t =
                '<div>\n            <span class="keyword">interface</span>\n            <a href="' +
                window.depth +
                n.map((e) => "m." + e).join("/") +
                "/interface/" +
                e.name +
                '.html" class="item-name object">' +
                e.highlighted +
                "</a>\n            " +
                (e.comment ? '<p class="docblock">' + e.comment + "</p>" : "") +
                "\n            " +
                (n.length
                  ? '<p class="docblock secondary">In ' + n.join("/") + "</p>"
                  : "") +
                "\n            </div>"
              break
            case 2:
              t =
                '<div>\n            <span class="keyword">enum</span>\n            <a href="' +
                window.depth +
                n.map((e) => "m." + e).join("/") +
                "/enum/" +
                e.name +
                '.html" class="item-name object">' +
                e.highlighted +
                "</a>\n            " +
                (e.comment ? '<p class="docblock">' + e.comment + "</p>" : "") +
                "\n            " +
                (n.length
                  ? '<p class="docblock secondary">In ' + n.join("/") + "</p>"
                  : "") +
                "\n            </div>"
              break
            case 3:
              t =
                '<div>\n            <span class="keyword">function</span>\n            <a href="' +
                window.depth +
                n.map((e) => "m." + e).join("/") +
                "/function/" +
                e.name +
                '.html" class="item-name method-name">' +
                e.highlighted +
                "</a>\n            " +
                (n.length
                  ? '<p class="docblock secondary">In ' + n.join("/") + "</p>"
                  : "") +
                "\n            </div>"
              break
            case 5:
              t =
                '<div>\n            <span class="keyword">type</span>\n            <a href="' +
                window.depth +
                n.map((e) => "m." + e).join("/") +
                "/type/" +
                e.name +
                '.html" class="item-name object">' +
                e.highlighted +
                "</a>\n            " +
                (n.length
                  ? '<p class="docblock secondary">In ' + n.join("/") + "</p>"
                  : "") +
                "\n            </div>"
              break
            case 4:
              t =
                '<div>\n            <span class="keyword">const</span>\n            <a href="' +
                window.depth +
                n.map((e) => "m." + e).join("/") +
                "/constant/" +
                e.name +
                '.html" class="item-name object">' +
                e.highlighted +
                "</a>\n            " +
                (n.length
                  ? '<p class="docblock secondary">In ' + n.join("/") + "</p>"
                  : "") +
                "\n            </div>"
              break
            case 6:
              t =
                '<div>\n            <a href="' +
                window.depth +
                n.map((e) => "m." + e).join("/") +
                "/class/" +
                e.obj +
                ".html#." +
                e.name +
                '"><span class="item-name object">' +
                e.obj +
                '</span><span class="symbol">.</span><span class="item-name property-name">' +
                e.highlighted +
                "</span></a>\n            " +
                (e.comment ? '<p class="docblock">' + e.comment + "</p>" : "") +
                "\n            " +
                (n.length
                  ? '<p class="docblock secondary">In ' + n.join("/") + "</p>"
                  : "") +
                "\n            </div>"
              break
            case 8:
              t =
                '<div>\n            <a href="' +
                window.depth +
                n.map((e) => "m." + e).join("/") +
                "/class/" +
                e.obj +
                ".html#." +
                e.name +
                '">' +
                (e.isGetter ? '<span class="keyword">getter</span> ' : "") +
                (e.isSetter ? '<span class="keyword">setter</span> ' : "") +
                '<span class="item-name object">' +
                e.obj +
                '</span><span class="symbol">.</span><span class="item-name method-name">' +
                e.highlighted +
                "</span></a>\n            " +
                (e.comment ? '<p class="docblock">' + e.comment + "</p>" : "") +
                "\n            " +
                (n.length
                  ? '<p class="docblock secondary">In ' + n.join("/") + "</p>"
                  : "") +
                "\n            </div>"
              break
            case 7:
              t =
                '<div>\n            <a href="' +
                window.depth +
                n.map((e) => "m." + e).join("/") +
                "/interface/" +
                e.obj +
                ".html#." +
                e.name +
                '" class="item-name property-name"><span class="item-name object">' +
                e.obj +
                '</span><span class="symbol">.</span><span class="item-name property-name">' +
                e.highlighted +
                "</span></a>\n            " +
                (n.length
                  ? '<p class="docblock secondary">In ' + n.join("/") + "</p>"
                  : "") +
                "\n            </div>"
              break
            case 9:
              t =
                '<div>\n            <a href="' +
                window.depth +
                n.map((e) => "m." + e).join("/") +
                "/enum/" +
                e.obj +
                ".html#." +
                e.name +
                '"><span class="item-name object">' +
                e.obj +
                '</span><span class="symbol">.</span><span class="item-name item-name">' +
                e.highlighted +
                "</span></a>\n            " +
                (n.length
                  ? '<p class="docblock secondary">In ' + n.join("/") + "</p>"
                  : "") +
                "\n            </div>"
          }
          return '<div class="search-result">' + t + "</div>"
        }
        function g() {
          return o(this, void 0, void 0, function () {
            var e, n, t, r, o, c, u
            return a(this, (a) => {
              switch (a.label) {
                case 0:
                  return [
                    4,
                    fetch(window.depth + "assets/search.json", {
                      headers: { "Content-Type": "application/json" },
                    }),
                  ]
                case 1:
                  return [4, a.sent().json()]
                case 2:
                  ;(e = a.sent()), (n = e[1])
                  try {
                    for (t = i(e[0]), r = t.next(); !r.done; r = t.next())
                      (o = r.value),
                        h.push.apply(
                          h,
                          l(
                            [],
                            s(
                              o[1].map((e) => {
                                var t = e[3].map((e) => n[e])
                                return (
                                  h.push.apply(
                                    h,
                                    l(
                                      [],
                                      s(
                                        e[1].map((n) => {
                                          var r = s(n, 3),
                                            o = r[0],
                                            a = r[1],
                                            i = r[2]
                                          return {
                                            name: o,
                                            path: t,
                                            obj: e[0],
                                            type: 6,
                                            isPrivate: d(a, 4),
                                            comment: i,
                                          }
                                        }),
                                      ),
                                      !1,
                                    ),
                                  ),
                                  h.push.apply(
                                    h,
                                    l(
                                      [],
                                      s(
                                        e[2].map((n) => {
                                          var r = s(n, 3),
                                            o = r[0],
                                            a = r[1],
                                            i = r[2]
                                          return {
                                            name: o,
                                            path: t,
                                            obj: e[0],
                                            type: 8,
                                            isGetter: d(a, 1),
                                            isSetter: d(a, 2),
                                            isPrivate: d(a, 4),
                                            comment: i,
                                          }
                                        }),
                                      ),
                                      !1,
                                    ),
                                  ),
                                  {
                                    name: e[0],
                                    path: t,
                                    type: 0,
                                    comment: e[4],
                                  }
                                )
                              }),
                            ),
                            !1,
                          ),
                        ),
                        h.push.apply(
                          h,
                          l(
                            [],
                            s(
                              o[2].map((e) => {
                                var t = e[2].map((e) => n[e])
                                return (
                                  h.push.apply(
                                    h,
                                    l(
                                      [],
                                      s(
                                        e[1].map((n) => ({
                                          name: n,
                                          path: t,
                                          obj: e[0],
                                          type: 7,
                                        })),
                                      ),
                                      !1,
                                    ),
                                  ),
                                  {
                                    name: e[0],
                                    path: t,
                                    type: 1,
                                    comment: e[3],
                                  }
                                )
                              }),
                            ),
                            !1,
                          ),
                        ),
                        h.push.apply(
                          h,
                          l(
                            [],
                            s(
                              o[3].map((e) => {
                                var t = e[2].map((e) => n[e])
                                return (
                                  h.push.apply(
                                    h,
                                    l(
                                      [],
                                      s(
                                        e[1].map((n) => ({
                                          name: n,
                                          path: t,
                                          obj: e[0],
                                          type: 9,
                                        })),
                                      ),
                                      !1,
                                    ),
                                  ),
                                  {
                                    name: e[0],
                                    path: t,
                                    type: 2,
                                    comment: e[3],
                                  }
                                )
                              }),
                            ),
                            !1,
                          ),
                        ),
                        h.push.apply(
                          h,
                          l(
                            [],
                            s(
                              o[4].map((e) => ({
                                name: e[0],
                                path: e[1].map((e) => n[e]),
                                type: 5,
                              })),
                            ),
                            !1,
                          ),
                        ),
                        h.push.apply(
                          h,
                          l(
                            [],
                            s(
                              o[5].map((e) => ({
                                name: e[0],
                                path: e[1].map((e) => n[e]),
                                type: 3,
                              })),
                            ),
                            !1,
                          ),
                        ),
                        h.push.apply(
                          h,
                          l(
                            [],
                            s(
                              o[6].map((e) => ({
                                name: e[0],
                                path: e[1].map((e) => n[e]),
                                type: 4,
                              })),
                            ),
                            !1,
                          ),
                        )
                  } catch (e) {
                    c = { error: e }
                  } finally {
                    try {
                      r && !r.done && (u = t.return) && u.call(t)
                    } finally {
                      if (c) throw c.error
                    }
                  }
                  return [2]
              }
            })
          })
        }
        n.initSearch = function (e, n, t) {
          return o(this, void 0, void 0, function () {
            var r, i, s
            return a(this, (c) => {
              switch (c.label) {
                case 0:
                  return (r = document.getElementById("search"))
                    ? ((window.onkeypress = () => r.focus()),
                      ((d = {
                        classes: document.getElementById(
                          "search-option-classes",
                        ),
                        interfaces: document.getElementById(
                          "search-option-interfaces",
                        ),
                        enums: document.getElementById("search-option-enums"),
                        functions: document.getElementById(
                          "search-option-functions",
                        ),
                        constants: document.getElementById(
                          "search-option-constants",
                        ),
                        types: document.getElementById("search-option-types"),
                        properties: document.getElementById(
                          "search-option-properties",
                        ),
                        methods: document.getElementById(
                          "search-option-methods",
                        ),
                        enumMembers: document.getElementById(
                          "search-option-enum-members",
                        ),
                        thisModuleOnly: document.getElementById(
                          "search-option-this-module-only",
                        ),
                        setters: document.getElementById(
                          "search-option-setters",
                        ),
                        getters: document.getElementById(
                          "search-option-getters",
                        ),
                        privates: document.getElementById(
                          "search-option-privates",
                        ),
                      }).classes.onchange =
                        d.interfaces.onchange =
                        d.enums.onchange =
                        d.functions.onchange =
                        d.constants.onchange =
                        d.types.onchange =
                        d.properties.onchange =
                        d.methods.onchange =
                        d.enumMembers.onchange =
                        d.setters.onchange =
                        d.getters.onchange =
                        d.privates.onchange =
                        d.thisModuleOnly.onchange =
                          () => m(p, d)),
                      (i = d),
                      (window.onpopstate = (e) => {
                        e.state && e.state.search
                          ? (n.classList.add("d-none"),
                            t.classList.remove("d-none"),
                            m(e.state.search, i))
                          : (n.classList.remove("d-none"),
                            t.classList.add("d-none"))
                      }),
                      e.has("search")
                        ? ((s = e.get("search")), (r.value = s), [4, g()])
                        : [3, 2])
                    : [3, 5]
                case 1:
                  return c.sent(), m(s, i), [3, 4]
                case 2:
                  return [4, g()]
                case 3:
                  c.sent(), (c.label = 4)
                case 4:
                  ;(r.oninput = (e) =>
                    o(this, void 0, void 0, function () {
                      var r, o
                      return a(this, (a) => {
                        switch (a.label) {
                          case 0:
                            return (
                              (r = e.target),
                              (o = r.value.trim()).length
                                ? (history.pushState(
                                    { search: o },
                                    "",
                                    "?search=" + o,
                                  ),
                                  [4, m(o, i)])
                                : (t.classList.add("d-none"),
                                  n.classList.remove("d-none"),
                                  [2])
                            )
                          case 1:
                            return (
                              a.sent(),
                              n.classList.add("d-none"),
                              t.classList.remove("d-none"),
                              [2]
                            )
                        }
                      })
                    })),
                    (c.label = 5)
                case 5:
                  return [2]
              }
              var d
            })
          })
        }
      },
      304: (e, n) => {
        Object.defineProperty(n, "__esModule", { value: !0 }),
          (n.initSidebar = void 0)
        var t = ""
        n.initSidebar = (e) => {
          var n = document.getElementById("sidebar-arrow")
          if (n) {
            t = n.innerHTML
            var r = document.getElementById("sidebar")
            n.addEventListener("click", () => {
              r.classList.contains("d-block")
                ? (r.classList.remove("d-block"), (n.innerHTML = t))
                : (r.classList.add("d-block"),
                  (n.innerHTML =
                    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/></svg>'))
            }),
              e.addEventListener("click", (e) => {
                window.innerWidth > 680 ||
                  (r.classList.remove("d-block"), (n.innerHTML = t))
              })
          }
        }
      },
      343: (e, n) => {
        Object.defineProperty(n, "__esModule", { value: !0 }),
          (n.initTheme = void 0)
        var t,
          r = {
            dark: {
              icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-moon-fill" viewBox="0 0 16 16"><path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z"/></svg>',
              highlightTheme:
                "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.2.0/styles/atom-one-dark.min.css",
            },
            light: {
              icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-brightness-high-fill" viewBox="0 0 16 16"><path d="M12 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"/></svg>',
              highlightTheme:
                "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.2.0/styles/atom-one-light.min.css",
            },
          }
        function o(e, n, o, a) {
          ;(document.documentElement.dataset.theme = e),
            n && localStorage.setItem("theme", e),
            (t = e),
            a &&
              ("light" === e
                ? (o && (o.innerHTML = r.dark.icon),
                  (a.href = r.light.highlightTheme))
                : (o && (o.innerHTML = r.light.icon),
                  (a.href = r.dark.highlightTheme)))
        }
        function a() {
          return "dark" === t ? "light" : "dark"
        }
        n.initTheme = () => {
          var e = window.t || localStorage.getItem("theme")
          e ||
            (e = window.matchMedia("(prefers-color-scheme: dark)").matches
              ? "dark"
              : "light"),
            o(e, !1),
            window.addEventListener("load", () => {
              var e = document.getElementById("theme-icon"),
                n = document.getElementById("highlightTheme")
              ;(n.href = r[t].highlightTheme),
                window.t ||
                  ((e.innerHTML = r[a()].icon),
                  (e.onclick = () => o(a(), !0, e, n)))
            })
        }
      },
    },
    n = {}
  ;(function t(r) {
    var o = n[r]
    if (void 0 !== o) return o.exports
    var a = (n[r] = { exports: {} })
    return e[r].call(a.exports, a, a.exports, t), a.exports
  })(228)
})()
