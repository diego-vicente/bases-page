import { createRequire } from 'module';
import { viewRegistry, registerCustomViews } from './chunk-2AUMER56.js';
import { evaluate, evaluateFilter, resolvePropertyValue } from './chunk-GIL63DBV.js';

createRequire(import.meta.url);

// node_modules/github-slugger/regex.js
var regex = /[\0-\x1F!-,\.\/:-@\[-\^`\{-\xA9\xAB-\xB4\xB6-\xB9\xBB-\xBF\xD7\xF7\u02C2-\u02C5\u02D2-\u02DF\u02E5-\u02EB\u02ED\u02EF-\u02FF\u0375\u0378\u0379\u037E\u0380-\u0385\u0387\u038B\u038D\u03A2\u03F6\u0482\u0530\u0557\u0558\u055A-\u055F\u0589-\u0590\u05BE\u05C0\u05C3\u05C6\u05C8-\u05CF\u05EB-\u05EE\u05F3-\u060F\u061B-\u061F\u066A-\u066D\u06D4\u06DD\u06DE\u06E9\u06FD\u06FE\u0700-\u070F\u074B\u074C\u07B2-\u07BF\u07F6-\u07F9\u07FB\u07FC\u07FE\u07FF\u082E-\u083F\u085C-\u085F\u086B-\u089F\u08B5\u08C8-\u08D2\u08E2\u0964\u0965\u0970\u0984\u098D\u098E\u0991\u0992\u09A9\u09B1\u09B3-\u09B5\u09BA\u09BB\u09C5\u09C6\u09C9\u09CA\u09CF-\u09D6\u09D8-\u09DB\u09DE\u09E4\u09E5\u09F2-\u09FB\u09FD\u09FF\u0A00\u0A04\u0A0B-\u0A0E\u0A11\u0A12\u0A29\u0A31\u0A34\u0A37\u0A3A\u0A3B\u0A3D\u0A43-\u0A46\u0A49\u0A4A\u0A4E-\u0A50\u0A52-\u0A58\u0A5D\u0A5F-\u0A65\u0A76-\u0A80\u0A84\u0A8E\u0A92\u0AA9\u0AB1\u0AB4\u0ABA\u0ABB\u0AC6\u0ACA\u0ACE\u0ACF\u0AD1-\u0ADF\u0AE4\u0AE5\u0AF0-\u0AF8\u0B00\u0B04\u0B0D\u0B0E\u0B11\u0B12\u0B29\u0B31\u0B34\u0B3A\u0B3B\u0B45\u0B46\u0B49\u0B4A\u0B4E-\u0B54\u0B58-\u0B5B\u0B5E\u0B64\u0B65\u0B70\u0B72-\u0B81\u0B84\u0B8B-\u0B8D\u0B91\u0B96-\u0B98\u0B9B\u0B9D\u0BA0-\u0BA2\u0BA5-\u0BA7\u0BAB-\u0BAD\u0BBA-\u0BBD\u0BC3-\u0BC5\u0BC9\u0BCE\u0BCF\u0BD1-\u0BD6\u0BD8-\u0BE5\u0BF0-\u0BFF\u0C0D\u0C11\u0C29\u0C3A-\u0C3C\u0C45\u0C49\u0C4E-\u0C54\u0C57\u0C5B-\u0C5F\u0C64\u0C65\u0C70-\u0C7F\u0C84\u0C8D\u0C91\u0CA9\u0CB4\u0CBA\u0CBB\u0CC5\u0CC9\u0CCE-\u0CD4\u0CD7-\u0CDD\u0CDF\u0CE4\u0CE5\u0CF0\u0CF3-\u0CFF\u0D0D\u0D11\u0D45\u0D49\u0D4F-\u0D53\u0D58-\u0D5E\u0D64\u0D65\u0D70-\u0D79\u0D80\u0D84\u0D97-\u0D99\u0DB2\u0DBC\u0DBE\u0DBF\u0DC7-\u0DC9\u0DCB-\u0DCE\u0DD5\u0DD7\u0DE0-\u0DE5\u0DF0\u0DF1\u0DF4-\u0E00\u0E3B-\u0E3F\u0E4F\u0E5A-\u0E80\u0E83\u0E85\u0E8B\u0EA4\u0EA6\u0EBE\u0EBF\u0EC5\u0EC7\u0ECE\u0ECF\u0EDA\u0EDB\u0EE0-\u0EFF\u0F01-\u0F17\u0F1A-\u0F1F\u0F2A-\u0F34\u0F36\u0F38\u0F3A-\u0F3D\u0F48\u0F6D-\u0F70\u0F85\u0F98\u0FBD-\u0FC5\u0FC7-\u0FFF\u104A-\u104F\u109E\u109F\u10C6\u10C8-\u10CC\u10CE\u10CF\u10FB\u1249\u124E\u124F\u1257\u1259\u125E\u125F\u1289\u128E\u128F\u12B1\u12B6\u12B7\u12BF\u12C1\u12C6\u12C7\u12D7\u1311\u1316\u1317\u135B\u135C\u1360-\u137F\u1390-\u139F\u13F6\u13F7\u13FE-\u1400\u166D\u166E\u1680\u169B-\u169F\u16EB-\u16ED\u16F9-\u16FF\u170D\u1715-\u171F\u1735-\u173F\u1754-\u175F\u176D\u1771\u1774-\u177F\u17D4-\u17D6\u17D8-\u17DB\u17DE\u17DF\u17EA-\u180A\u180E\u180F\u181A-\u181F\u1879-\u187F\u18AB-\u18AF\u18F6-\u18FF\u191F\u192C-\u192F\u193C-\u1945\u196E\u196F\u1975-\u197F\u19AC-\u19AF\u19CA-\u19CF\u19DA-\u19FF\u1A1C-\u1A1F\u1A5F\u1A7D\u1A7E\u1A8A-\u1A8F\u1A9A-\u1AA6\u1AA8-\u1AAF\u1AC1-\u1AFF\u1B4C-\u1B4F\u1B5A-\u1B6A\u1B74-\u1B7F\u1BF4-\u1BFF\u1C38-\u1C3F\u1C4A-\u1C4C\u1C7E\u1C7F\u1C89-\u1C8F\u1CBB\u1CBC\u1CC0-\u1CCF\u1CD3\u1CFB-\u1CFF\u1DFA\u1F16\u1F17\u1F1E\u1F1F\u1F46\u1F47\u1F4E\u1F4F\u1F58\u1F5A\u1F5C\u1F5E\u1F7E\u1F7F\u1FB5\u1FBD\u1FBF-\u1FC1\u1FC5\u1FCD-\u1FCF\u1FD4\u1FD5\u1FDC-\u1FDF\u1FED-\u1FF1\u1FF5\u1FFD-\u203E\u2041-\u2053\u2055-\u2070\u2072-\u207E\u2080-\u208F\u209D-\u20CF\u20F1-\u2101\u2103-\u2106\u2108\u2109\u2114\u2116-\u2118\u211E-\u2123\u2125\u2127\u2129\u212E\u213A\u213B\u2140-\u2144\u214A-\u214D\u214F-\u215F\u2189-\u24B5\u24EA-\u2BFF\u2C2F\u2C5F\u2CE5-\u2CEA\u2CF4-\u2CFF\u2D26\u2D28-\u2D2C\u2D2E\u2D2F\u2D68-\u2D6E\u2D70-\u2D7E\u2D97-\u2D9F\u2DA7\u2DAF\u2DB7\u2DBF\u2DC7\u2DCF\u2DD7\u2DDF\u2E00-\u2E2E\u2E30-\u3004\u3008-\u3020\u3030\u3036\u3037\u303D-\u3040\u3097\u3098\u309B\u309C\u30A0\u30FB\u3100-\u3104\u3130\u318F-\u319F\u31C0-\u31EF\u3200-\u33FF\u4DC0-\u4DFF\u9FFD-\u9FFF\uA48D-\uA4CF\uA4FE\uA4FF\uA60D-\uA60F\uA62C-\uA63F\uA673\uA67E\uA6F2-\uA716\uA720\uA721\uA789\uA78A\uA7C0\uA7C1\uA7CB-\uA7F4\uA828-\uA82B\uA82D-\uA83F\uA874-\uA87F\uA8C6-\uA8CF\uA8DA-\uA8DF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA954-\uA95F\uA97D-\uA97F\uA9C1-\uA9CE\uA9DA-\uA9DF\uA9FF\uAA37-\uAA3F\uAA4E\uAA4F\uAA5A-\uAA5F\uAA77-\uAA79\uAAC3-\uAADA\uAADE\uAADF\uAAF0\uAAF1\uAAF7-\uAB00\uAB07\uAB08\uAB0F\uAB10\uAB17-\uAB1F\uAB27\uAB2F\uAB5B\uAB6A-\uAB6F\uABEB\uABEE\uABEF\uABFA-\uABFF\uD7A4-\uD7AF\uD7C7-\uD7CA\uD7FC-\uD7FF\uE000-\uF8FF\uFA6E\uFA6F\uFADA-\uFAFF\uFB07-\uFB12\uFB18-\uFB1C\uFB29\uFB37\uFB3D\uFB3F\uFB42\uFB45\uFBB2-\uFBD2\uFD3E-\uFD4F\uFD90\uFD91\uFDC8-\uFDEF\uFDFC-\uFDFF\uFE10-\uFE1F\uFE30-\uFE32\uFE35-\uFE4C\uFE50-\uFE6F\uFE75\uFEFD-\uFF0F\uFF1A-\uFF20\uFF3B-\uFF3E\uFF40\uFF5B-\uFF65\uFFBF-\uFFC1\uFFC8\uFFC9\uFFD0\uFFD1\uFFD8\uFFD9\uFFDD-\uFFFF]|\uD800[\uDC0C\uDC27\uDC3B\uDC3E\uDC4E\uDC4F\uDC5E-\uDC7F\uDCFB-\uDD3F\uDD75-\uDDFC\uDDFE-\uDE7F\uDE9D-\uDE9F\uDED1-\uDEDF\uDEE1-\uDEFF\uDF20-\uDF2C\uDF4B-\uDF4F\uDF7B-\uDF7F\uDF9E\uDF9F\uDFC4-\uDFC7\uDFD0\uDFD6-\uDFFF]|\uD801[\uDC9E\uDC9F\uDCAA-\uDCAF\uDCD4-\uDCD7\uDCFC-\uDCFF\uDD28-\uDD2F\uDD64-\uDDFF\uDF37-\uDF3F\uDF56-\uDF5F\uDF68-\uDFFF]|\uD802[\uDC06\uDC07\uDC09\uDC36\uDC39-\uDC3B\uDC3D\uDC3E\uDC56-\uDC5F\uDC77-\uDC7F\uDC9F-\uDCDF\uDCF3\uDCF6-\uDCFF\uDD16-\uDD1F\uDD3A-\uDD7F\uDDB8-\uDDBD\uDDC0-\uDDFF\uDE04\uDE07-\uDE0B\uDE14\uDE18\uDE36\uDE37\uDE3B-\uDE3E\uDE40-\uDE5F\uDE7D-\uDE7F\uDE9D-\uDEBF\uDEC8\uDEE7-\uDEFF\uDF36-\uDF3F\uDF56-\uDF5F\uDF73-\uDF7F\uDF92-\uDFFF]|\uD803[\uDC49-\uDC7F\uDCB3-\uDCBF\uDCF3-\uDCFF\uDD28-\uDD2F\uDD3A-\uDE7F\uDEAA\uDEAD-\uDEAF\uDEB2-\uDEFF\uDF1D-\uDF26\uDF28-\uDF2F\uDF51-\uDFAF\uDFC5-\uDFDF\uDFF7-\uDFFF]|\uD804[\uDC47-\uDC65\uDC70-\uDC7E\uDCBB-\uDCCF\uDCE9-\uDCEF\uDCFA-\uDCFF\uDD35\uDD40-\uDD43\uDD48-\uDD4F\uDD74\uDD75\uDD77-\uDD7F\uDDC5-\uDDC8\uDDCD\uDDDB\uDDDD-\uDDFF\uDE12\uDE38-\uDE3D\uDE3F-\uDE7F\uDE87\uDE89\uDE8E\uDE9E\uDEA9-\uDEAF\uDEEB-\uDEEF\uDEFA-\uDEFF\uDF04\uDF0D\uDF0E\uDF11\uDF12\uDF29\uDF31\uDF34\uDF3A\uDF45\uDF46\uDF49\uDF4A\uDF4E\uDF4F\uDF51-\uDF56\uDF58-\uDF5C\uDF64\uDF65\uDF6D-\uDF6F\uDF75-\uDFFF]|\uD805[\uDC4B-\uDC4F\uDC5A-\uDC5D\uDC62-\uDC7F\uDCC6\uDCC8-\uDCCF\uDCDA-\uDD7F\uDDB6\uDDB7\uDDC1-\uDDD7\uDDDE-\uDDFF\uDE41-\uDE43\uDE45-\uDE4F\uDE5A-\uDE7F\uDEB9-\uDEBF\uDECA-\uDEFF\uDF1B\uDF1C\uDF2C-\uDF2F\uDF3A-\uDFFF]|\uD806[\uDC3B-\uDC9F\uDCEA-\uDCFE\uDD07\uDD08\uDD0A\uDD0B\uDD14\uDD17\uDD36\uDD39\uDD3A\uDD44-\uDD4F\uDD5A-\uDD9F\uDDA8\uDDA9\uDDD8\uDDD9\uDDE2\uDDE5-\uDDFF\uDE3F-\uDE46\uDE48-\uDE4F\uDE9A-\uDE9C\uDE9E-\uDEBF\uDEF9-\uDFFF]|\uD807[\uDC09\uDC37\uDC41-\uDC4F\uDC5A-\uDC71\uDC90\uDC91\uDCA8\uDCB7-\uDCFF\uDD07\uDD0A\uDD37-\uDD39\uDD3B\uDD3E\uDD48-\uDD4F\uDD5A-\uDD5F\uDD66\uDD69\uDD8F\uDD92\uDD99-\uDD9F\uDDAA-\uDEDF\uDEF7-\uDFAF\uDFB1-\uDFFF]|\uD808[\uDF9A-\uDFFF]|\uD809[\uDC6F-\uDC7F\uDD44-\uDFFF]|[\uD80A\uD80B\uD80E-\uD810\uD812-\uD819\uD824-\uD82B\uD82D\uD82E\uD830-\uD833\uD837\uD839\uD83D\uD83F\uD87B-\uD87D\uD87F\uD885-\uDB3F\uDB41-\uDBFF][\uDC00-\uDFFF]|\uD80D[\uDC2F-\uDFFF]|\uD811[\uDE47-\uDFFF]|\uD81A[\uDE39-\uDE3F\uDE5F\uDE6A-\uDECF\uDEEE\uDEEF\uDEF5-\uDEFF\uDF37-\uDF3F\uDF44-\uDF4F\uDF5A-\uDF62\uDF78-\uDF7C\uDF90-\uDFFF]|\uD81B[\uDC00-\uDE3F\uDE80-\uDEFF\uDF4B-\uDF4E\uDF88-\uDF8E\uDFA0-\uDFDF\uDFE2\uDFE5-\uDFEF\uDFF2-\uDFFF]|\uD821[\uDFF8-\uDFFF]|\uD823[\uDCD6-\uDCFF\uDD09-\uDFFF]|\uD82C[\uDD1F-\uDD4F\uDD53-\uDD63\uDD68-\uDD6F\uDEFC-\uDFFF]|\uD82F[\uDC6B-\uDC6F\uDC7D-\uDC7F\uDC89-\uDC8F\uDC9A-\uDC9C\uDC9F-\uDFFF]|\uD834[\uDC00-\uDD64\uDD6A-\uDD6C\uDD73-\uDD7A\uDD83\uDD84\uDD8C-\uDDA9\uDDAE-\uDE41\uDE45-\uDFFF]|\uD835[\uDC55\uDC9D\uDCA0\uDCA1\uDCA3\uDCA4\uDCA7\uDCA8\uDCAD\uDCBA\uDCBC\uDCC4\uDD06\uDD0B\uDD0C\uDD15\uDD1D\uDD3A\uDD3F\uDD45\uDD47-\uDD49\uDD51\uDEA6\uDEA7\uDEC1\uDEDB\uDEFB\uDF15\uDF35\uDF4F\uDF6F\uDF89\uDFA9\uDFC3\uDFCC\uDFCD]|\uD836[\uDC00-\uDDFF\uDE37-\uDE3A\uDE6D-\uDE74\uDE76-\uDE83\uDE85-\uDE9A\uDEA0\uDEB0-\uDFFF]|\uD838[\uDC07\uDC19\uDC1A\uDC22\uDC25\uDC2B-\uDCFF\uDD2D-\uDD2F\uDD3E\uDD3F\uDD4A-\uDD4D\uDD4F-\uDEBF\uDEFA-\uDFFF]|\uD83A[\uDCC5-\uDCCF\uDCD7-\uDCFF\uDD4C-\uDD4F\uDD5A-\uDFFF]|\uD83B[\uDC00-\uDDFF\uDE04\uDE20\uDE23\uDE25\uDE26\uDE28\uDE33\uDE38\uDE3A\uDE3C-\uDE41\uDE43-\uDE46\uDE48\uDE4A\uDE4C\uDE50\uDE53\uDE55\uDE56\uDE58\uDE5A\uDE5C\uDE5E\uDE60\uDE63\uDE65\uDE66\uDE6B\uDE73\uDE78\uDE7D\uDE7F\uDE8A\uDE9C-\uDEA0\uDEA4\uDEAA\uDEBC-\uDFFF]|\uD83C[\uDC00-\uDD2F\uDD4A-\uDD4F\uDD6A-\uDD6F\uDD8A-\uDFFF]|\uD83E[\uDC00-\uDFEF\uDFFA-\uDFFF]|\uD869[\uDEDE-\uDEFF]|\uD86D[\uDF35-\uDF3F]|\uD86E[\uDC1E\uDC1F]|\uD873[\uDEA2-\uDEAF]|\uD87A[\uDFE1-\uDFFF]|\uD87E[\uDE1E-\uDFFF]|\uD884[\uDF4B-\uDFFF]|\uDB40[\uDC00-\uDCFF\uDDF0-\uDFFF]/g;
function slug(value, maintainCase) {
  if (typeof value !== "string") return "";
  value = value.toLowerCase();
  return value.replace(regex, "").replace(/ /g, "-");
}

// node_modules/preact/dist/preact.mjs
var n;
var l;
var u;
var w = [];
function k(l2, u3, t2) {
  var i2, r2, o2, e2 = {};
  for (o2 in u3) "key" == o2 ? i2 = u3[o2] : "ref" == o2 ? r2 = u3[o2] : e2[o2] = u3[o2];
  if (arguments.length > 2 && (e2.children = arguments.length > 3 ? n.call(arguments, 2) : t2), "function" == typeof l2 && null != l2.defaultProps) for (o2 in l2.defaultProps) void 0 === e2[o2] && (e2[o2] = l2.defaultProps[o2]);
  return x(l2, e2, i2, r2, null);
}
function x(n2, t2, i2, r2, o2) {
  var e2 = { type: n2, props: t2, key: i2, ref: r2, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: null == o2 ? ++u : o2, __i: -1, __u: 0 };
  return null != l.vnode && l.vnode(e2), e2;
}
function S(n2) {
  return n2.children;
}
n = w.slice, l = { __e: function(n2, l2, u3, t2) {
  for (var i2, r2, o2; l2 = l2.__; ) if ((i2 = l2.__c) && !i2.__) try {
    if ((r2 = i2.constructor) && null != r2.getDerivedStateFromError && (i2.setState(r2.getDerivedStateFromError(n2)), o2 = i2.__d), null != i2.componentDidCatch && (i2.componentDidCatch(n2, t2 || {}), o2 = i2.__d), o2) return i2.__E = i2;
  } catch (l3) {
    n2 = l3;
  }
  throw n2;
} }, u = 0, "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, Math.random().toString(8);

// node_modules/preact/jsx-runtime/dist/jsxRuntime.mjs
var f2 = 0;
function u2(e2, t2, n2, o2, i2, u3) {
  t2 || (t2 = {});
  var a2, c2, p2 = t2;
  if ("ref" in p2) for (c2 in p2 = {}, t2) "ref" == c2 ? a2 = t2[c2] : p2[c2] = t2[c2];
  var l2 = { type: e2, props: p2, key: n2, ref: a2, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: --f2, __i: -1, __u: 0, __source: i2, __self: u3 };
  if ("function" == typeof e2 && (a2 = e2.defaultProps)) for (c2 in a2) void 0 === p2[c2] && (p2[c2] = a2[c2]);
  return l.vnode && l.vnode(l2), l2;
}

// node_modules/@quartz-community/utils/dist/index.js
function simplifySlug(fp) {
  const res = stripSlashes(trimSuffix(fp, "index"), true);
  return res.length === 0 ? "/" : res;
}
function slugifyFilePath(fp, excludeExt) {
  fp = stripSlashes(fp);
  const ext = getFileExtension(fp);
  const withoutFileExt = fp.replace(new RegExp(ext + "$"), "");
  const finalExt = excludeExt || [".md", ".html", void 0].includes(ext) ? "" : ext;
  let slug2 = _sluggify(withoutFileExt);
  if (endsWith(slug2, "_index")) {
    slug2 = slug2.replace(/_index$/, "index");
  }
  const segments = slug2.split("/");
  if (segments.length >= 2 && segments[segments.length - 1] === segments[segments.length - 2]) {
    segments[segments.length - 1] = "index";
    slug2 = segments.join("/");
  }
  return slug2 + (finalExt ?? "");
}
function joinSegments(...args) {
  if (args.length === 0) {
    return "";
  }
  let joined = args.filter((segment) => segment !== "" && segment !== "/").map((segment) => stripSlashes(segment)).join("/");
  const first = args[0];
  const last = args[args.length - 1];
  if (first?.startsWith("/")) {
    joined = "/" + joined;
  }
  if (last?.endsWith("/")) {
    joined = joined + "/";
  }
  return joined;
}
function endsWith(s2, suffix) {
  return s2 === suffix || s2.endsWith("/" + suffix);
}
function trimSuffix(s2, suffix) {
  if (endsWith(s2, suffix)) {
    s2 = s2.slice(0, -suffix.length);
  }
  return s2;
}
function stripSlashes(s2, onlyStripPrefix) {
  if (s2.startsWith("/")) {
    s2 = s2.substring(1);
  }
  if (!onlyStripPrefix && s2.endsWith("/")) {
    s2 = s2.slice(0, -1);
  }
  return s2;
}
function getFileExtension(s2) {
  return s2.match(/\.[A-Za-z0-9]+$/)?.[0];
}
function isFolderPath(fplike) {
  return fplike.endsWith("/") || endsWith(fplike, "index") || endsWith(fplike, "index.md") || endsWith(fplike, "index.html");
}
function pathToRoot(slug2) {
  let rootPath = slug2.split("/").filter((x2) => x2 !== "").slice(0, -1).map((_2) => "..").join("/");
  if (rootPath.length === 0) {
    rootPath = ".";
  }
  return rootPath;
}
function resolveRelative(current, target) {
  const res = joinSegments(pathToRoot(current), simplifySlug(target));
  return res;
}
function splitAnchor(link) {
  const [fp, anchor] = link.split("#", 2);
  if (fp.endsWith(".pdf")) {
    return [fp, anchor === void 0 ? "" : `#${anchor}`];
  }
  const slugged = anchor === void 0 ? "" : "#" + slug(anchor);
  return [fp, slugged];
}
function transformInternalLink(link) {
  const [fplike, anchor] = splitAnchor(decodeURI(link));
  const segments = fplike.split("/").filter((x2) => x2.length > 0);
  const prefix = segments.filter(_isRelativeSegment).join("/");
  const fp = segments.filter((seg) => !_isRelativeSegment(seg) && seg !== "").join("/");
  const slugged = slugifyFilePath(fp);
  const simpleSlug = simplifySlug(slugged);
  const folderPath = isFolderPath(fplike) || isFolderPath(slugged);
  const joined = joinSegments(stripSlashes(prefix), stripSlashes(simpleSlug));
  const trail = folderPath ? "/" : "";
  const res = _addRelativeToStart(joined) + trail + anchor;
  return res;
}
function transformLink(src, target, opts) {
  const targetSlug = transformInternalLink(target);
  if (opts.strategy === "relative") {
    return targetSlug;
  } else {
    const effectiveSrc = !endsWith(src, "index") && opts.allSlugs.includes(`${src}/index`) ? `${src}/index` : src;
    const folderTail = isFolderPath(targetSlug) ? "/" : "";
    const canonicalSlug = stripSlashes(targetSlug.slice(".".length));
    const [targetCanonical, targetAnchor] = splitAnchor(canonicalSlug);
    if (opts.strategy === "shortest") {
      const isMultiSegment = targetCanonical.includes("/");
      const isFolderTarget = isFolderPath(targetSlug);
      const matchingFileNames = opts.allSlugs.filter((slug2) => {
        if (isMultiSegment) {
          if (slug2 === targetCanonical || slug2.endsWith("/" + targetCanonical)) {
            return true;
          }
          if (isFolderTarget) {
            const withIndex = targetCanonical + "/index";
            return slug2 === withIndex || slug2.endsWith("/" + withIndex);
          }
          return false;
        }
        const parts = slug2.split("/");
        const fileName = parts.at(-1);
        return targetCanonical === fileName;
      });
      if (matchingFileNames.length === 1) {
        const matchedSlug = matchingFileNames[0];
        return resolveRelative(effectiveSrc, matchedSlug) + targetAnchor;
      }
    }
    return joinSegments(pathToRoot(effectiveSrc), canonicalSlug) + folderTail;
  }
}
function slugifyPath(s2) {
  return s2.split("/").map(
    (segment) => segment.replace(/\s/g, "-").replace(/&/g, "-and-").replace(/%/g, "-percent").replace(/\?/g, "").replace(/#/g, "").toLowerCase()
  ).join("/").replace(/\/$/, "");
}
function _sluggify(s2) {
  return slugifyPath(s2);
}
function _isRelativeSegment(s2) {
  return /^\.{0,2}$/.test(s2);
}
function _addRelativeToStart(s2) {
  if (s2 === "") {
    s2 = ".";
  }
  if (!s2.startsWith(".")) {
    s2 = joinSegments(".", s2);
  }
  return s2;
}

// src/components/ViewSelector.tsx
function ViewSelector({ views, activeIndex }) {
  if (views.length <= 1) return null;
  return /* @__PURE__ */ u2("div", { class: "bases-view-tabs", role: "tablist", children: views.map((view, index) => /* @__PURE__ */ u2(
    "button",
    {
      type: "button",
      class: index === activeIndex ? "is-active" : "",
      "data-view-index": index,
      children: view.name ?? view.type
    }
  )) });
}

// src/resolver.ts
function normalizeStringArray(values) {
  if (!Array.isArray(values)) return [];
  return values.filter((value) => typeof value === "string");
}
function getFilePath(fileData, slug2) {
  if (typeof fileData.relativePath === "string") return fileData.relativePath;
  if (typeof fileData.filePath === "string") return fileData.filePath;
  return slug2 ? `${slug2}.md` : "";
}
function getFileName(path) {
  const lastSlash = path.lastIndexOf("/");
  return lastSlash >= 0 ? path.slice(lastSlash + 1) : path;
}
function getBaseName(path) {
  const fileName = getFileName(path);
  const dot = fileName.lastIndexOf(".");
  return dot > 0 ? fileName.slice(0, dot) : fileName;
}
function toDate(value) {
  if (value instanceof Date && !Number.isNaN(value.getTime())) return value;
  if (typeof value === "string") {
    const parsed = Date.parse(value);
    if (!Number.isNaN(parsed)) return new Date(parsed);
  }
  return void 0;
}
function buildFileProperties(fileData, slug2, frontmatter) {
  const filePath = getFilePath(fileData, slug2);
  const baseName = filePath ? getBaseName(filePath) : getBaseName(slug2);
  const name = baseName || slug2.split("/").pop() || "Untitled";
  const basename = baseName || slug2.split("/").pop() || "Untitled";
  const lastSlash = filePath.lastIndexOf("/");
  const folder = lastSlash >= 0 ? filePath.slice(0, lastSlash) : "";
  const lastDot = filePath.lastIndexOf(".");
  const ext = lastDot >= 0 ? filePath.slice(lastDot + 1) : "";
  const tags = normalizeStringArray(frontmatter.tags);
  const links = normalizeStringArray(fileData.links ?? fileData.outgoingLinks);
  const embeds = normalizeStringArray(fileData.embeds);
  const dates = fileData.dates;
  const ctime = toDate(dates?.created);
  const mtime = toDate(dates?.modified);
  return {
    name,
    basename,
    path: filePath,
    folder,
    ext,
    tags,
    links,
    embeds,
    created: ctime?.toISOString(),
    modified: mtime?.toISOString(),
    ctime,
    mtime
  };
}
function compareSort(a2, b2) {
  if (a2 === b2) return 0;
  if (a2 === void 0 || a2 === null) return 1;
  if (b2 === void 0 || b2 === null) return -1;
  if (typeof a2 === "number" && typeof b2 === "number") return a2 - b2;
  const dateA = typeof a2 === "string" ? Date.parse(a2) : NaN;
  const dateB = typeof b2 === "string" ? Date.parse(b2) : NaN;
  if (!Number.isNaN(dateA) && !Number.isNaN(dateB)) return dateA - dateB;
  return String(a2).localeCompare(String(b2));
}
function buildSortKeys(view) {
  if (view?.sort && view.sort.length > 0) return view.sort;
  if (view?.groupBy?.property) {
    return [{ property: view.groupBy.property, direction: view.groupBy.direction ?? "ASC" }];
  }
  if (view?.order && view.order.length > 0) {
    return view.order.map((property) => ({ property, direction: "ASC" }));
  }
  return [];
}
function sortEntries(entries, view) {
  const sortKeys = buildSortKeys(view);
  if (sortKeys.length === 0) return entries;
  return [...entries].sort((left, right) => {
    for (const key of sortKeys) {
      const sign = key.direction === "DESC" ? -1 : 1;
      const leftValue = resolvePropertyValue(key.property, {
        note: left.properties,
        file: left.fileProperties,
        formula: left.formulaValues
      });
      const rightValue = resolvePropertyValue(key.property, {
        note: right.properties,
        file: right.fileProperties,
        formula: right.formulaValues
      });
      const cmp = compareSort(leftValue, rightValue);
      if (cmp !== 0) return sign * cmp;
    }
    return 0;
  });
}
function resolveBasesEntries(basesData, allFiles, view, selfContext) {
  const entries = [];
  const formulas = basesData.formulas ?? {};
  const fileLookup = /* @__PURE__ */ new Map();
  for (const fd of allFiles) {
    if (fd.unlisted === true) continue;
    const fdSlug = typeof fd.slug === "string" ? fd.slug : "";
    if (!fdSlug) continue;
    const fdPath = getFilePath(fd, fdSlug);
    const fm = fd.frontmatter ?? {};
    const fp = buildFileProperties(fd, fdSlug, fm);
    const fileValue = { ...fp, properties: fm };
    fileLookup.set(fdPath, fileValue);
    const withoutExt = fdPath.replace(/\.md$/, "");
    if (withoutExt !== fdPath) fileLookup.set(withoutExt, fileValue);
    if (fdSlug && !fileLookup.has(fdSlug)) {
      fileLookup.set(fdSlug, fileValue);
    }
    const base = getBaseName(fdPath);
    if (base && !fileLookup.has(base)) {
      fileLookup.set(base, fileValue);
    }
  }
  for (const fileData of allFiles) {
    if (fileData.unlisted === true) continue;
    const slug2 = typeof fileData.slug === "string" ? fileData.slug : "";
    if (!slug2) continue;
    const filePath = typeof fileData.filePath === "string" ? fileData.filePath : "";
    if (filePath.endsWith(".base") || slug2.endsWith(".base")) continue;
    const frontmatter = fileData.frontmatter ?? {};
    const fileProperties = buildFileProperties(fileData, slug2, frontmatter);
    const context = {
      note: frontmatter,
      file: { ...fileProperties, properties: frontmatter },
      formula: {},
      self: selfContext,
      _fileLookup: fileLookup
    };
    for (const [name, expr] of Object.entries(formulas)) {
      context.formula[name] = evaluate(expr, context);
    }
    if (!evaluateFilter(basesData.filters, context)) continue;
    if (view?.filters && !evaluateFilter(view.filters, context)) continue;
    const title = typeof frontmatter.title === "string" ? frontmatter.title : fileProperties.basename || slug2.split("/").pop() || "Untitled";
    entries.push({
      slug: slug2,
      title,
      properties: frontmatter,
      fileProperties,
      formulaValues: context.formula
    });
  }
  const total = entries.length;
  const sorted = sortEntries(entries, view);
  const limited = view?.limit ? sorted.slice(0, view.limit) : sorted;
  return { entries: limited, total };
}

// src/i18n/locales/en-US.ts
var en_US_default = {
  components: {
    bases: {
      title: "Base",
      noData: "No data found.",
      noViews: "No views defined.",
      mapPlaceholder: "Map view is not available in static builds.",
      allNotes: "All notes",
      allEntries: "All entries",
      galleryView: "Gallery",
      boardView: "Board",
      noImage: "No image available",
      uncategorized: "Uncategorized",
      showingCount: "Showing {count} of {total} entries"
    }
  }
};

// src/i18n/index.ts
var locales = {
  "en-US": en_US_default
};
function i18n(locale) {
  return locales[locale] || en_US_default;
}

// src/components/shared/links.tsx
var WIKILINK_RE = /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g;
var MDLINK_RE = /\[([^\]]*)\]\(([^)]+)\)/g;
var URL_RE = /https?:\/\/[^\s<>]+/g;
function renderTextWithLinks(text, ctx) {
  const segments = [];
  const transformOpts = {
    strategy: ctx.linkResolution,
    allSlugs: ctx.allSlugs
  };
  for (const match of text.matchAll(WIKILINK_RE)) {
    const target = match[1] ?? "";
    const display = match[2] ?? target;
    const href = transformLink(ctx.slug, target, transformOpts);
    segments.push({
      start: match.index ?? 0,
      end: (match.index ?? 0) + match[0].length,
      node: /* @__PURE__ */ u2("a", { href, class: "internal", children: display })
    });
  }
  for (const match of text.matchAll(MDLINK_RE)) {
    const start = match.index ?? 0;
    const end = start + match[0].length;
    const overlaps = segments.some((segment) => start < segment.end && end > segment.start);
    if (overlaps) continue;
    const display = match[1] ?? "";
    const href = match[2] ?? "";
    const isExternal = href.startsWith("http://") || href.startsWith("https://");
    const resolvedHref = isExternal ? href : String(transformLink(ctx.slug, href, transformOpts));
    segments.push({
      start,
      end,
      node: /* @__PURE__ */ u2(
        "a",
        {
          href: resolvedHref,
          class: isExternal ? "external" : "internal",
          ...isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {},
          children: display || href
        }
      )
    });
  }
  for (const match of text.matchAll(URL_RE)) {
    const start = match.index ?? 0;
    const end = start + match[0].length;
    const overlaps = segments.some((segment) => start < segment.end && end > segment.start);
    if (overlaps) continue;
    segments.push({
      start,
      end,
      node: /* @__PURE__ */ u2("a", { href: match[0], class: "external", target: "_blank", rel: "noopener noreferrer", children: match[0] })
    });
  }
  if (segments.length === 0) return [text];
  segments.sort((a2, b2) => a2.start - b2.start);
  const result = [];
  let cursor = 0;
  for (const segment of segments) {
    if (segment.start > cursor) {
      result.push(text.slice(cursor, segment.start));
    }
    result.push(segment.node);
    cursor = segment.end;
  }
  if (cursor < text.length) {
    result.push(text.slice(cursor));
  }
  return result;
}

// src/components/shared/cell.tsx
function isFileValue(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const record = value;
  return typeof record.name === "string" && typeof record.basename === "string" && typeof record.path === "string" && typeof record.folder === "string" && typeof record.ext === "string";
}
function formatValue(value) {
  if (value === void 0 || value === null) return "";
  if (Array.isArray(value)) return value.map((item) => String(item)).join(", ");
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
}
function renderCellValue(value, ctx) {
  if (value === null || value === void 0) {
    return /* @__PURE__ */ u2("span", { class: "bases-empty", children: "\u2014" });
  }
  if (typeof value === "boolean") {
    return /* @__PURE__ */ u2("input", { type: "checkbox", checked: value, disabled: true });
  }
  if (typeof value === "number") {
    return /* @__PURE__ */ u2("span", { class: "bases-number", children: value });
  }
  if (typeof value === "string") {
    const parts = renderTextWithLinks(value, ctx);
    return /* @__PURE__ */ u2("span", { class: "bases-text", children: parts });
  }
  if (Array.isArray(value)) {
    const items = value.map((item, index) => /* @__PURE__ */ u2(S, { children: [
      index > 0 && /* @__PURE__ */ u2("span", { class: "bases-separator", children: ", " }),
      renderCellValue(item, ctx)
    ] }));
    return /* @__PURE__ */ u2("span", { class: "bases-list", children: items });
  }
  if (typeof value === "object") {
    if (isFileValue(value)) {
      const href = transformLink(
        ctx.slug,
        slugifyPath(value.path.replace(/\.md$/, "")),
        {
          strategy: ctx.linkResolution,
          allSlugs: ctx.allSlugs
        }
      );
      return /* @__PURE__ */ u2("a", { href, class: "internal", children: value.basename });
    }
    return /* @__PURE__ */ u2("code", { children: JSON.stringify(value) });
  }
  return String(value);
}
function isEmptyValue(value) {
  if (value === void 0 || value === null || value === "") return true;
  if (Array.isArray(value)) return value.length === 0;
  return false;
}
function getColumnLabel(column, basesData) {
  const config = basesData.properties?.[column];
  if (config?.displayName) return config.displayName;
  const segment = column.split(".").pop() ?? column;
  return segment.split("_").map((part) => part ? part.charAt(0).toUpperCase() + part.slice(1) : part).join(" ");
}
function getColumns(view, basesData, entries) {
  if (view.order && view.order.length > 0) return view.order;
  const columns = /* @__PURE__ */ new Set();
  columns.add("file.name");
  const propertyKeys = basesData.properties ? Object.keys(basesData.properties) : [];
  if (propertyKeys.length > 0) {
    propertyKeys.forEach((key) => {
      columns.add(key);
    });
  } else if (entries.length > 0) {
    const firstEntry = entries[0];
    if (firstEntry) {
      Object.keys(firstEntry.properties).forEach((key) => {
        columns.add(key);
      });
    }
  }
  return Array.from(columns);
}
function getNestedValue(value, path) {
  let current = value;
  for (const segment of path) {
    if (segment === "") continue;
    if (Array.isArray(current)) {
      const index = Number(segment);
      if (Number.isNaN(index)) return void 0;
      current = current[index];
      continue;
    }
    if (current && typeof current === "object") {
      const record = current;
      current = record[segment];
      continue;
    }
    return void 0;
  }
  return current;
}
function resolveEntryPropertyValue(column, entry) {
  if (column.startsWith("note.")) {
    return getNestedValue(entry.properties, column.slice(5).split("."));
  }
  if (column.startsWith("file.")) {
    return getNestedValue(entry.fileProperties, column.slice(5).split("."));
  }
  if (column.startsWith("formula.")) {
    return getNestedValue(entry.formulaValues, column.slice(8).split("."));
  }
  return getNestedValue(entry.properties, column.split("."));
}

// src/components/views/board.tsx
function formatMessage(template, values) {
  return Object.entries(values).reduce(
    (text, [key, value]) => text.replace(`{${key}}`, String(value)),
    template
  );
}
var BoardView = ({
  entries,
  view,
  basesData,
  total,
  locale,
  slug: slug2,
  allSlugs,
  linkResolution
}) => {
  const localeStrings = i18n(locale).components.bases;
  const groupProperty = view.groupBy?.property ?? view.boardProperty;
  const columns = getColumns(view, basesData, entries).filter((column) => column !== groupProperty);
  const groups = /* @__PURE__ */ new Map();
  const emptyLabel = groupProperty ? localeStrings.uncategorized : localeStrings.allEntries;
  const transformOpts = { strategy: linkResolution, allSlugs };
  for (const entry of entries) {
    const rawValue = groupProperty ? resolveEntryPropertyValue(groupProperty, entry) : void 0;
    const label = isEmptyValue(rawValue) ? emptyLabel : formatValue(rawValue);
    const key = label || emptyLabel;
    const existing = groups.get(key);
    if (existing) {
      existing.entries.push(entry);
    } else {
      groups.set(key, { label: key, entries: [entry] });
    }
  }
  if (groups.size === 0) {
    groups.set(localeStrings.allEntries, { label: localeStrings.allEntries, entries });
  }
  return /* @__PURE__ */ u2("div", { class: "bases-board-wrapper", children: [
    /* @__PURE__ */ u2("div", { class: "bases-view-meta", children: formatMessage(localeStrings.showingCount, {
      count: entries.length,
      total
    }) }),
    /* @__PURE__ */ u2("div", { class: "bases-board", children: Array.from(groups.values()).map((group) => /* @__PURE__ */ u2("div", { class: "bases-board-column", children: [
      /* @__PURE__ */ u2("div", { class: "bases-board-column-header", children: [
        /* @__PURE__ */ u2("span", { children: group.label }),
        /* @__PURE__ */ u2("span", { class: "bases-board-count", children: group.entries.length })
      ] }),
      /* @__PURE__ */ u2("div", { class: "bases-board-column-body", children: group.entries.map((entry) => {
        const ctx = { slug: slug2, allSlugs, linkResolution };
        return /* @__PURE__ */ u2("div", { class: "bases-board-card", children: [
          /* @__PURE__ */ u2(
            "a",
            {
              href: transformLink(slug2, entry.slug, transformOpts),
              class: "internal",
              "data-slug": entry.slug,
              children: entry.title
            }
          ),
          columns.length > 0 && /* @__PURE__ */ u2("div", { class: "bases-board-card-meta", children: columns.map((column) => {
            const value = resolveEntryPropertyValue(column, entry);
            if (isEmptyValue(value)) return null;
            return /* @__PURE__ */ u2("div", { class: "bases-board-card-row", children: [
              /* @__PURE__ */ u2("span", { class: "bases-board-card-label", children: getColumnLabel(column, basesData) }),
              /* @__PURE__ */ u2("span", { class: "bases-board-card-value", children: renderCellValue(value, ctx) })
            ] });
          }) })
        ] });
      }) })
    ] })) })
  ] });
};
var boardViewRegistration = {
  id: "board",
  name: "Board",
  icon: "columns",
  render: BoardView
};

// src/components/views/cards.tsx
function formatMessage2(template, values) {
  return Object.entries(values).reduce(
    (text, [key, value]) => text.replace(`{${key}}`, String(value)),
    template
  );
}
var HEX_COLOR_RE = /^#(?:[0-9a-f]{3}){1,2}$/i;
var WIKILINK_RE2 = /^\[\[(.+?)(?:\|.*)?\]\]$/;
function resolveImageSrc(raw, opts) {
  if (!raw) return { src: "", isColor: false };
  if (HEX_COLOR_RE.test(raw)) {
    return { src: raw, isColor: true };
  }
  const wikiMatch = WIKILINK_RE2.exec(raw);
  if (wikiMatch?.[1]) {
    const target = wikiMatch[1].trim();
    const resolved = transformLink(opts.slug, target, {
      strategy: opts.linkResolution,
      allSlugs: opts.allSlugs
    });
    return { src: String(resolved), isColor: false };
  }
  return { src: raw, isColor: false };
}
var CardsView = ({
  entries,
  view,
  basesData,
  total,
  locale,
  slug: slug2,
  allSlugs,
  linkResolution
}) => {
  const imageProperty = typeof view.image === "string" ? view.image : void 0;
  const cardMetaColumns = view.order && view.order.length > 0 ? view.order.filter((column) => column !== imageProperty && column !== "file.name") : [];
  const localeStrings = i18n(locale).components.bases;
  const cardSize = view.cardSize;
  const aspectRatio = view.imageAspectRatio ?? view.cardAspect;
  const imageFit = view.imageFit === "contain" ? "contain" : "cover";
  const gridStyle = typeof cardSize === "number" && cardSize > 0 ? { gridTemplateColumns: `repeat(auto-fit, minmax(${cardSize}px, 1fr))` } : void 0;
  const imageOpts = { slug: slug2, allSlugs, linkResolution };
  const transformOpts = { strategy: linkResolution, allSlugs };
  return /* @__PURE__ */ u2("div", { class: "bases-cards-wrapper", children: [
    /* @__PURE__ */ u2("div", { class: "bases-view-meta", children: formatMessage2(localeStrings.showingCount, {
      count: entries.length,
      total
    }) }),
    /* @__PURE__ */ u2("div", { class: "bases-cards", style: gridStyle, children: entries.map((entry) => {
      const ctx = { slug: slug2, allSlugs, linkResolution };
      const imageValue = imageProperty ? resolveEntryPropertyValue(imageProperty, entry) : void 0;
      const rawImage = imageValue ? String(imageValue) : "";
      const { src: imageSrc, isColor } = resolveImageSrc(rawImage, imageOpts);
      const imageAspect = typeof aspectRatio === "number" && aspectRatio > 0 ? { aspectRatio: String(aspectRatio) } : void 0;
      const href = transformLink(slug2, entry.slug, transformOpts);
      return /* @__PURE__ */ u2("a", { href, class: "internal bases-card", "data-slug": entry.slug, children: [
        imageSrc && !isColor && /* @__PURE__ */ u2("div", { class: "bases-card-image", style: imageAspect, children: /* @__PURE__ */ u2(
          "img",
          {
            src: imageSrc,
            alt: entry.title,
            loading: "lazy",
            style: { objectFit: imageFit }
          }
        ) }),
        imageSrc && isColor && /* @__PURE__ */ u2(
          "div",
          {
            class: "bases-card-image bases-card-color",
            style: { ...imageAspect, backgroundColor: imageSrc }
          }
        ),
        /* @__PURE__ */ u2("div", { class: "bases-card-body", children: [
          /* @__PURE__ */ u2("span", { class: "bases-card-title", children: entry.title }),
          /* @__PURE__ */ u2("div", { class: "bases-card-meta", children: cardMetaColumns.map((column) => {
            const value = resolveEntryPropertyValue(column, entry);
            if (isEmptyValue(value)) return null;
            return /* @__PURE__ */ u2("div", { class: "bases-card-row", children: [
              /* @__PURE__ */ u2("span", { class: "bases-card-label", children: getColumnLabel(column, basesData) }),
              /* @__PURE__ */ u2("span", { class: "bases-card-value", children: renderCellValue(value, ctx) })
            ] });
          }) })
        ] })
      ] });
    }) })
  ] });
};
var cardsViewRegistration = {
  id: "cards",
  name: "Cards",
  icon: "layout-grid",
  render: CardsView
};

// src/components/views/gallery.tsx
function formatMessage3(template, values) {
  return Object.entries(values).reduce(
    (text, [key, value]) => text.replace(`{${key}}`, String(value)),
    template
  );
}
var GalleryView = ({
  entries,
  view,
  total,
  locale,
  slug: slug2,
  allSlugs,
  linkResolution
}) => {
  const imageProperty = typeof view.image === "string" ? view.image : void 0;
  const localeStrings = i18n(locale).components.bases;
  const columns = typeof view.cardSize === "number" && view.cardSize > 0 ? Math.round(view.cardSize) : 3;
  const gridStyle = { gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` };
  const imageOpts = { slug: slug2, allSlugs, linkResolution };
  const transformOpts = { strategy: linkResolution, allSlugs };
  return /* @__PURE__ */ u2("div", { class: "bases-gallery-wrapper", children: [
    /* @__PURE__ */ u2("div", { class: "bases-view-meta", children: formatMessage3(localeStrings.showingCount, {
      count: entries.length,
      total
    }) }),
    /* @__PURE__ */ u2("div", { class: "bases-gallery", style: gridStyle, children: entries.map((entry) => {
      const imageValue = imageProperty ? resolveEntryPropertyValue(imageProperty, entry) : void 0;
      const rawImage = imageValue ? String(imageValue) : "";
      const { src: imageSrc, isColor } = resolveImageSrc(rawImage, imageOpts);
      return /* @__PURE__ */ u2("div", { class: "bases-gallery-item", children: [
        /* @__PURE__ */ u2("div", { class: "bases-gallery-image", children: imageSrc && !isColor ? /* @__PURE__ */ u2("img", { src: imageSrc, alt: entry.title, loading: "lazy" }) : imageSrc && isColor ? /* @__PURE__ */ u2("span", { class: "bases-gallery-placeholder", style: { background: imageSrc } }) : /* @__PURE__ */ u2(
          "span",
          {
            class: "bases-gallery-placeholder",
            role: "img",
            "aria-label": localeStrings.noImage
          }
        ) }),
        /* @__PURE__ */ u2("div", { class: "bases-gallery-title", children: /* @__PURE__ */ u2(
          "a",
          {
            href: transformLink(slug2, entry.slug, transformOpts),
            class: "internal",
            "data-slug": entry.slug,
            children: entry.title
          }
        ) })
      ] });
    }) })
  ] });
};
var galleryViewRegistration = {
  id: "gallery",
  name: "Gallery",
  icon: "image",
  render: GalleryView
};

// src/components/views/list.tsx
function formatMessage4(template, values) {
  return Object.entries(values).reduce(
    (text, [key, value]) => text.replace(`{${key}}`, String(value)),
    template
  );
}
var ListView = ({
  entries,
  view,
  basesData,
  total,
  locale,
  slug: slug2,
  allSlugs,
  linkResolution
}) => {
  const columns = getColumns(view, basesData, entries);
  const localeStrings = i18n(locale).components.bases;
  const transformOpts = { strategy: linkResolution, allSlugs };
  return /* @__PURE__ */ u2("div", { class: "bases-list-wrapper", children: [
    /* @__PURE__ */ u2("div", { class: "bases-view-meta", children: formatMessage4(localeStrings.showingCount, {
      count: entries.length,
      total
    }) }),
    /* @__PURE__ */ u2("div", { class: "bases-list-group", children: /* @__PURE__ */ u2("div", { class: "bases-list-group-list", children: entries.map((entry) => {
      const ctx = { slug: slug2, allSlugs, linkResolution };
      const primaryColumn = columns[0] ?? "file.name";
      const secondaryColumns = columns.slice(1);
      const primaryValue = primaryColumn === "file.name" ? /* @__PURE__ */ u2(
        "a",
        {
          href: transformLink(slug2, entry.slug, transformOpts),
          class: "internal",
          "data-slug": entry.slug,
          children: entry.title
        }
      ) : renderCellValue(resolveEntryPropertyValue(primaryColumn, entry), ctx);
      const secondaryItems = [];
      for (const column of secondaryColumns) {
        const value = resolveEntryPropertyValue(column, entry);
        if (isEmptyValue(value)) continue;
        secondaryItems.push(
          /* @__PURE__ */ u2("span", { class: "bases-list-property", children: /* @__PURE__ */ u2("span", { class: "bases-rendered-value", children: renderCellValue(value, ctx) }) })
        );
      }
      return /* @__PURE__ */ u2("div", { class: "bases-list-item", children: /* @__PURE__ */ u2("div", { class: "bases-list-item-properties", children: [
        /* @__PURE__ */ u2("span", { class: "bases-list-property", children: [
          /* @__PURE__ */ u2("span", { class: "list-bullet", children: "-" }),
          /* @__PURE__ */ u2("span", { class: "bases-rendered-value", children: primaryValue })
        ] }),
        secondaryItems.map((item) => /* @__PURE__ */ u2(S, { children: [
          /* @__PURE__ */ u2("span", { class: "bases-list-separator", children: ", " }),
          item
        ] }))
      ] }) });
    }) }) })
  ] });
};
var listViewRegistration = {
  id: "list",
  name: "List",
  icon: "list",
  render: ListView
};

// src/components/shared/summary.tsx
function computeSummary(values, summary) {
  const nonEmpty = values.filter((value) => value !== void 0 && value !== null && value !== "");
  if (summary === "Empty") return String(values.length - nonEmpty.length);
  if (summary === "Filled") return String(nonEmpty.length);
  if (summary === "Checked") return String(values.filter((value) => value === true).length);
  if (summary === "Unchecked") return String(values.filter((value) => value === false).length);
  if (summary === "Unique") return String(new Set(values.map((value) => String(value))).size);
  const numeric = nonEmpty.map((value) => typeof value === "number" ? value : Number(value)).filter((value) => !Number.isNaN(value));
  if (numeric.length === 0) return summary;
  if (summary === "Sum") return String(numeric.reduce((acc, value) => acc + value, 0));
  if (summary === "Average")
    return String(numeric.reduce((acc, value) => acc + value, 0) / numeric.length);
  if (summary === "Min") return String(Math.min(...numeric));
  if (summary === "Max") return String(Math.max(...numeric));
  if (summary === "Range") return String(Math.max(...numeric) - Math.min(...numeric));
  if (summary === "Median") {
    const sorted = [...numeric].sort((a2, b2) => a2 - b2);
    const mid = Math.floor(sorted.length / 2);
    const upper = sorted[mid] ?? 0;
    const lower = sorted[mid - 1] ?? upper;
    const median = sorted.length % 2 === 0 ? (lower + upper) / 2 : upper;
    return String(median);
  }
  if (summary === "Stddev") {
    const mean = numeric.reduce((acc, value) => acc + value, 0) / numeric.length;
    const variance = numeric.reduce((acc, value) => acc + Math.pow(value - mean, 2), 0) / numeric.length;
    return String(Math.sqrt(variance));
  }
  return summary;
}

// src/components/views/table.tsx
function formatMessage5(template, values) {
  return Object.entries(values).reduce(
    (text, [key, value]) => text.replace(`{${key}}`, String(value)),
    template
  );
}
function groupEntries(entries, groupProperty, emptyLabel) {
  if (!groupProperty) return null;
  const groups = /* @__PURE__ */ new Map();
  for (const entry of entries) {
    const rawValue = resolveEntryPropertyValue(groupProperty, entry);
    const label = isEmptyValue(rawValue) ? emptyLabel : formatValue(rawValue);
    const key = label || emptyLabel;
    const existing = groups.get(key);
    if (existing) {
      existing.push(entry);
    } else {
      groups.set(key, [entry]);
    }
  }
  return groups.size > 0 ? groups : null;
}
function renderRow(entry, columns, view, slug2, allSlugs, linkResolution) {
  const transformOpts = { strategy: linkResolution, allSlugs };
  const ctx = { slug: slug2, allSlugs, linkResolution };
  return /* @__PURE__ */ u2("tr", { children: columns.map((column) => {
    const value = resolveEntryPropertyValue(column, entry);
    const display = formatValue(value);
    const isPrimary = column === "file.name" || column === "title";
    const columnWidth = view.columnSize?.[column];
    const style = columnWidth ? { width: `${columnWidth}px`, minWidth: `${columnWidth}px` } : void 0;
    return /* @__PURE__ */ u2("td", { "data-value": display, style, children: isPrimary ? /* @__PURE__ */ u2(
      "a",
      {
        href: transformLink(slug2, entry.slug, transformOpts),
        class: "internal",
        "data-slug": entry.slug,
        children: display || entry.title
      }
    ) : renderCellValue(value, ctx) });
  }) });
}
var TableView = ({
  entries,
  view,
  basesData,
  total,
  locale,
  slug: slug2,
  allSlugs,
  linkResolution
}) => {
  const columns = getColumns(view, basesData, entries);
  const summaries = view.summaries ?? {};
  const hasSummary = Object.keys(summaries).length > 0;
  const localeStrings = i18n(locale).components.bases;
  const groupProperty = view.groupBy?.property;
  const groupPropertyLabel = groupProperty ? getColumnLabel(groupProperty, basesData) : "";
  const groups = groupEntries(entries, groupProperty, localeStrings.uncategorized);
  return /* @__PURE__ */ u2("div", { class: "bases-table-wrapper", children: [
    /* @__PURE__ */ u2("div", { class: "bases-view-meta", children: formatMessage5(localeStrings.showingCount, {
      count: entries.length,
      total
    }) }),
    /* @__PURE__ */ u2("table", { class: "bases-table", "data-view-type": "table", children: [
      /* @__PURE__ */ u2("thead", { children: /* @__PURE__ */ u2("tr", { children: columns.map((column) => {
        const columnWidth = view.columnSize?.[column];
        const style = columnWidth ? { width: `${columnWidth}px`, minWidth: `${columnWidth}px` } : void 0;
        return /* @__PURE__ */ u2("th", { "data-column": column, "data-sortable": "true", style, children: [
          getColumnLabel(column, basesData),
          /* @__PURE__ */ u2("span", { class: "bases-sort-indicator", "aria-hidden": "true" })
        ] });
      }) }) }),
      /* @__PURE__ */ u2("tbody", { children: groups ? Array.from(groups.entries()).map(([label, groupEntries2]) => /* @__PURE__ */ u2(S, { children: [
        /* @__PURE__ */ u2("tr", { class: "bases-table-group-header", children: /* @__PURE__ */ u2("td", { colSpan: columns.length, children: [
          groupPropertyLabel && /* @__PURE__ */ u2("span", { class: "bases-table-group-property", children: [
            groupPropertyLabel,
            " "
          ] }),
          /* @__PURE__ */ u2("span", { class: "bases-table-group-label", children: label }),
          /* @__PURE__ */ u2("span", { class: "bases-table-group-count", children: groupEntries2.length })
        ] }) }),
        groupEntries2.map(
          (entry) => renderRow(entry, columns, view, slug2, allSlugs, linkResolution)
        )
      ] })) : entries.map(
        (entry) => renderRow(entry, columns, view, slug2, allSlugs, linkResolution)
      ) }),
      hasSummary && /* @__PURE__ */ u2("tfoot", { children: /* @__PURE__ */ u2("tr", { class: "bases-summary-row", children: columns.map((column) => {
        const summary = summaries[column];
        if (!summary) return /* @__PURE__ */ u2("td", {});
        const values = entries.map((entry) => resolveEntryPropertyValue(column, entry));
        return /* @__PURE__ */ u2("td", { children: computeSummary(values, summary) });
      }) }) })
    ] })
  ] });
};
var tableViewRegistration = {
  id: "table",
  name: "Table",
  icon: "table",
  render: TableView
};

// src/components/views/index.ts
function registerBuiltinViews() {
  viewRegistry.register(tableViewRegistration);
  viewRegistry.register(listViewRegistration);
  viewRegistry.register(cardsViewRegistration);
  viewRegistry.register(galleryViewRegistration);
  viewRegistry.register(boardViewRegistration);
}

// src/components/styles/bases.scss
var bases_default = ".bases-page {\n  width: 100%;\n  max-width: 100%;\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n  overflow: hidden;\n}\n\n.bases-view-tabs {\n  display: flex;\n  gap: 8px;\n  flex-wrap: wrap;\n}\n.bases-view-tabs button {\n  border: 1px solid var(--lightgray);\n  background: var(--light);\n  color: var(--darkgray);\n  padding: 6px 12px;\n  border-radius: 999px;\n  cursor: pointer;\n  font-size: 0.9rem;\n}\n.bases-view-tabs button.is-active {\n  background: var(--secondary);\n  color: var(--light);\n  border-color: var(--secondary);\n}\n\n.bases-view-container {\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n}\n\n.bases-view {\n  display: none;\n}\n.bases-view.is-active {\n  display: block;\n}\n\n.bases-view-meta {\n  font-size: 0.85rem;\n  color: var(--gray);\n  margin-bottom: 8px;\n}\n\n.bases-table-wrapper {\n  width: 100%;\n  overflow-x: auto;\n}\n\n.bases-table {\n  width: 100%;\n  border-collapse: collapse;\n  border: 1px solid var(--lightgray);\n  border-radius: 8px;\n  overflow: hidden;\n}\n.bases-table th,\n.bases-table td {\n  padding: 10px 12px;\n  text-align: left;\n  border-bottom: 1px solid var(--lightgray);\n  font-size: 0.9rem;\n}\n.bases-table thead th {\n  position: sticky;\n  top: 0;\n  background: var(--light);\n  color: var(--dark);\n  font-weight: 600;\n  cursor: pointer;\n}\n.bases-table tbody tr:nth-child(even) {\n  background: var(--lightgray);\n}\n.bases-table td .bases-empty {\n  padding: 0;\n  border: 0;\n  background: none;\n  color: var(--gray);\n  display: inline;\n}\n.bases-table td code {\n  font-size: 0.85em;\n  padding: 0.1rem 0.3rem;\n  border-radius: 3px;\n  background: var(--highlight);\n  word-break: break-all;\n}\n.bases-table td .bases-list {\n  flex-direction: row;\n  flex-wrap: wrap;\n  gap: 4px;\n}\n\n.bases-sort-indicator {\n  display: inline-block;\n  width: 8px;\n  height: 8px;\n  margin-left: 6px;\n  border-right: 2px solid transparent;\n  border-bottom: 2px solid transparent;\n}\n\nth.is-sorted-asc .bases-sort-indicator {\n  border-right-color: var(--darkgray);\n  border-bottom-color: var(--darkgray);\n  transform: rotate(-45deg);\n}\n\nth.is-sorted-desc .bases-sort-indicator {\n  border-right-color: var(--darkgray);\n  border-bottom-color: var(--darkgray);\n  transform: rotate(135deg);\n}\n\n.bases-summary-row td {\n  background: var(--light);\n  font-weight: 600;\n  color: var(--darkgray);\n}\n\n.bases-table-group-header td {\n  background: var(--lightgray);\n  font-weight: 600;\n  padding: 8px 12px;\n  border-bottom: 2px solid var(--gray);\n}\n\n.bases-table-group-property {\n  color: var(--gray);\n  font-weight: 400;\n}\n\n.bases-table-group-label {\n  margin-right: 8px;\n}\n\n.bases-table-group-count {\n  background: var(--light);\n  color: var(--darkgray);\n  border-radius: 999px;\n  padding: 2px 8px;\n  font-size: 0.75rem;\n  font-weight: 400;\n}\n\n.bases-separator {\n  color: var(--gray);\n}\n\n.bases-number {\n  font-variant-numeric: tabular-nums;\n}\n\n.bases-list {\n  display: inline-flex;\n  flex-wrap: wrap;\n  gap: 4px;\n}\n\n.bases-list-group {\n  width: 100%;\n}\n\n.bases-list-group-list {\n  display: flex;\n  flex-direction: column;\n}\n\n.bases-list-item {\n  padding: 2px 0;\n}\n\n.bases-list-item-properties {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: baseline;\n  gap: 0;\n}\n\n.bases-list-property {\n  display: inline-flex;\n  align-items: baseline;\n  gap: 4px;\n}\n\n.list-bullet {\n  color: var(--darkgray);\n  user-select: none;\n}\n\n.bases-list-separator {\n  color: var(--gray);\n  margin-right: 4px;\n}\n\n.bases-rendered-value {\n  display: inline;\n}\n\n.bases-cards {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(min(220px, 100%), 1fr));\n  gap: 16px;\n}\n\n.bases-card {\n  border: 1px solid var(--lightgray);\n  border-radius: 12px;\n  overflow: hidden;\n  background: var(--light);\n  display: flex;\n  flex-direction: column;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);\n  color: inherit;\n  text-decoration: none;\n  transition: box-shadow 0.15s ease;\n}\n.bases-card:hover {\n  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.14);\n}\n\n.bases-card-image {\n  overflow: hidden;\n  background: var(--lightgray);\n}\n.bases-card-image img {\n  width: 100%;\n  height: 100%;\n  display: block;\n  object-fit: cover;\n}\n\n.bases-card-color {\n  min-height: 60px;\n}\n\n.bases-card-title {\n  font-weight: 600;\n  color: var(--dark);\n}\n\n.bases-card-body {\n  padding: 12px;\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n\n.bases-card-meta {\n  display: grid;\n  gap: 4px;\n}\n\n.bases-card-row {\n  display: flex;\n  justify-content: space-between;\n  font-size: 0.8rem;\n  color: var(--darkgray);\n}\n\n.bases-card-label {\n  color: var(--gray);\n}\n\n.bases-map-placeholder {\n  padding: 24px;\n  border: 1px dashed var(--lightgray);\n  border-radius: 12px;\n  background: var(--light);\n}\n\n.bases-map-message {\n  color: var(--darkgray);\n  margin-top: 12px;\n}\n\n.bases-empty {\n  padding: 24px;\n  text-align: center;\n  color: var(--darkgray);\n  border: 1px dashed var(--lightgray);\n  border-radius: 12px;\n  background: var(--light);\n}\n\n.bases-gallery {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(min(200px, 100%), 1fr));\n  gap: 16px;\n}\n\n.bases-gallery-item {\n  position: relative;\n  border-radius: 12px;\n  overflow: hidden;\n  border: 1px solid var(--lightgray);\n  background: var(--light);\n}\n\n.bases-gallery-image {\n  aspect-ratio: 4/3;\n  overflow: hidden;\n  background: var(--lightgray);\n}\n\n.bases-gallery-image img,\n.bases-gallery-placeholder {\n  width: 100%;\n  height: 100%;\n  display: block;\n  object-fit: cover;\n}\n\n.bases-gallery-placeholder {\n  background: linear-gradient(135deg, var(--lightgray), var(--highlight));\n}\n\n.bases-gallery-title {\n  position: absolute;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  padding: 10px 12px;\n  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.65) 100%);\n  color: var(--light);\n  font-weight: 600;\n}\n\n.bases-gallery-title a {\n  color: inherit;\n}\n\n.bases-board {\n  display: flex;\n  gap: 16px;\n  overflow-x: auto;\n  padding-bottom: 4px;\n}\n\n.bases-board-column {\n  min-width: min(250px, 80vw);\n  flex-shrink: 0;\n  border: 1px solid var(--lightgray);\n  border-radius: 12px;\n  background: var(--light);\n  display: flex;\n  flex-direction: column;\n}\n\n.bases-board-column-header {\n  position: sticky;\n  top: 0;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 8px;\n  padding: 10px 12px;\n  font-weight: 600;\n  background: var(--light);\n  border-bottom: 1px solid var(--lightgray);\n  z-index: 1;\n}\n\n.bases-board-count {\n  background: var(--lightgray);\n  color: var(--darkgray);\n  border-radius: 999px;\n  padding: 2px 8px;\n  font-size: 0.75rem;\n}\n\n.bases-board-column-body {\n  padding: 8px;\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n\n.bases-board-card {\n  border: 1px solid var(--lightgray);\n  border-radius: 10px;\n  background: var(--light);\n  padding: 10px 12px;\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.08);\n}\n\n.bases-board-card-meta {\n  display: grid;\n  gap: 4px;\n  font-size: 0.8rem;\n  color: var(--darkgray);\n}\n\n.bases-board-card-row {\n  display: flex;\n  justify-content: space-between;\n  gap: 8px;\n}\n\n.bases-board-card-label {\n  color: var(--gray);\n}";

// src/components/scripts/bases.inline.ts
var bases_inline_default = `function v(e,t){let n=e.querySelectorAll(".bases-view-tabs button"),r=e.querySelectorAll(".bases-view");n.forEach(s=>{s.classList.toggle("is-active",s.dataset.viewIndex===String(t))}),r.forEach(s=>{s.classList.toggle("is-active",s.dataset.viewIndex===String(t))})}function f(e,t){let n=Number(e),r=Number(t);return!Number.isNaN(n)&&!Number.isNaN(r)?n-r:String(e).localeCompare(String(t))}function b(e,t,n){let r=e.querySelector("tbody");if(!r)return;let s=Array.from(r.querySelectorAll("tr"));s.sort((c,o)=>{let a=c.children[t],u=o.children[t],i=a?.dataset?.value??a?.textContent??"",l=u?.dataset?.value??u?.textContent??"";return f(i,l)}),n==="desc"&&s.reverse(),s.forEach(c=>{r.appendChild(c)})}function m(e,t){e.querySelectorAll(".bases-table").forEach(r=>{let s=r.querySelectorAll("th[data-sortable='true']");s.forEach((c,o)=>{let a=()=>{let i=(c.dataset.sortDirection||"none")==="asc"?"desc":"asc";s.forEach(l=>{l!==c&&(l.dataset.sortDirection="none"),l.classList.remove("is-sorted-asc","is-sorted-desc")}),c.dataset.sortDirection=i,c.classList.toggle("is-sorted-asc",i==="asc"),c.classList.toggle("is-sorted-desc",i==="desc"),b(r,o,i)};c.addEventListener("click",a),t.push(()=>c.removeEventListener("click",a))})})}function E(e,t){let n=e.querySelectorAll(".bases-view-tabs button");if(n.length===0)return;let r=parseInt(e.dataset.initialView||"0",10);v(e,Number.isNaN(r)?0:r),n.forEach(s=>{let c=()=>{let o=parseInt(s.dataset.viewIndex||"0",10);v(e,Number.isNaN(o)?0:o)};s.addEventListener("click",c),t.push(()=>s.removeEventListener("click",c))})}function d(){let e=document.querySelectorAll(".bases-page");if(e.length===0)return;let t=[];e.forEach(n=>{E(n,t),m(n,t)}),window.addCleanup&&window.addCleanup(()=>{t.forEach(n=>{n()})})}document.addEventListener("nav",()=>{d()});document.addEventListener("render",()=>{d()});d();
`;

// src/components/BasesBody.tsx
var builtinViewsRegistered = false;
var BasesBody_default = ((opts) => {
  const Component = (props) => {
    const locale = props.cfg?.locale ?? "en-US";
    const localeStrings = i18n(locale).components.bases;
    const fileData = props.fileData;
    const basesData = fileData.basesData;
    const basesOptions = fileData.basesOptions ?? opts;
    const basesSelfContext = fileData.basesSelfContext;
    const slug2 = props.fileData.slug ?? "";
    const rawSlugs = props.ctx?.allSlugs ?? [];
    const baseSlugs = new Set(rawSlugs.filter((s2) => s2.endsWith(".base")));
    const baseAliases = new Set([...baseSlugs].map((s2) => s2.replace(/\.base$/, "")));
    const allSlugs = rawSlugs.filter((s2) => !baseSlugs.has(s2) && !baseAliases.has(s2));
    const linkResolution = basesOptions?.linkResolution ?? "shortest";
    if (!basesData) {
      return /* @__PURE__ */ u2("div", { class: "bases-page bases-empty", children: localeStrings.noData });
    }
    const views = basesData.views ?? [];
    if (views.length === 0) {
      return /* @__PURE__ */ u2("div", { class: "bases-page bases-empty", children: localeStrings.noViews });
    }
    const preferredType = basesOptions?.defaultViewType ?? "table";
    const initialIndex = Math.max(
      0,
      views.findIndex((view) => view.type === preferredType)
    );
    if (!builtinViewsRegistered) {
      registerBuiltinViews();
      builtinViewsRegistered = true;
    }
    if (basesOptions?.customViews) {
      registerCustomViews(basesOptions.customViews);
    }
    const activeTypes = new Set(views.map((v2) => v2.type));
    const viewCssChunks = [];
    for (const typeId of activeTypes) {
      const reg = viewRegistry.get(typeId);
      if (reg?.css) viewCssChunks.push(reg.css);
    }
    return /* @__PURE__ */ u2("div", { class: "bases-page", "data-initial-view": initialIndex, children: [
      viewCssChunks.length > 0 && /* @__PURE__ */ u2("style", { dangerouslySetInnerHTML: { __html: viewCssChunks.join("\n") } }),
      /* @__PURE__ */ u2(ViewSelector, { views, activeIndex: initialIndex, locale }),
      /* @__PURE__ */ u2("div", { class: "bases-view-container", children: views.map((view, index) => {
        const { entries, total } = resolveBasesEntries(
          basesData,
          props.allFiles,
          view,
          basesSelfContext
        );
        const registration = viewRegistry.get(view.type);
        const Renderer = registration?.render;
        return /* @__PURE__ */ u2(
          "div",
          {
            class: `bases-view ${index === initialIndex ? "is-active" : ""}`,
            "data-view-index": index,
            "data-view-type": view.type,
            children: entries.length === 0 ? /* @__PURE__ */ u2("div", { class: "bases-empty", children: localeStrings.noData }) : Renderer ? /* @__PURE__ */ u2(
              Renderer,
              {
                entries,
                view,
                basesData,
                total,
                locale,
                slug: slug2,
                allSlugs,
                linkResolution,
                options: registration.options
              }
            ) : /* @__PURE__ */ u2("div", { class: "bases-empty", children: [
              "Unknown view type: ",
              view.type
            ] })
          }
        );
      }) })
    ] });
  };
  Component.css = bases_default;
  const viewScripts = viewRegistry.getAll().map((reg) => reg.afterDOMLoaded).filter((s2) => typeof s2 === "string" && s2.length > 0);
  Component.afterDOMLoaded = [bases_inline_default, ...viewScripts];
  return Component;
});

export { BasesBody_default, S, ViewSelector, i18n, k, l, registerBuiltinViews, resolveBasesEntries, slugifyFilePath, slugifyPath, transformLink };
//# sourceMappingURL=chunk-XCYIFVJU.js.map
//# sourceMappingURL=chunk-XCYIFVJU.js.map