var r = /^(\d+)x(\d+)$/;
// n是一个构造函数，它里面存放标准M3U8文件的一些属性和方法。
var AttrList = function (e) {
    for (var t in "string" == typeof e && (e = this.parseAttrList(e)),
        e)
        // t即key
        e.hasOwnProperty(t) && (this[t] = e[t])
};
// 设置n的原型，绑定一些方法
AttrList.prototype = {
    decimalInteger: function (e) {
        var t = parseInt(this[e], 10);
        return t > Number.MAX_SAFE_INTEGER ? 1 / 0 : t
    },
    // 将16进制转成10进制，按最大255分
    hexadecimalInteger: function (e) {
        if (this[e]) {
            var t = (this[e] || "0x").slice(2);
            t = (1 & t.length ? "0" : "") + t;
            for (var i = new Uint8Array(t.length / 2), r = 0; r < t.length / 2; r++)
                i[r] = parseInt(t.slice(2 * r, 2 * r + 2), 16);
            return i
        }
        return null
    },
    hexadecimalIntegerAsNumber: function (e) {
        var t = parseInt(this[e], 16);
        return t > Number.MAX_SAFE_INTEGER ? 1 / 0 : t
    },
    decimalFloatingPoint: function (e) {
        return parseFloat(this[e])
    },
    enumeratedString: function (e) {
        return this[e]
    },
    decimalResolution: function (e) {
        var t = r.exec(this[e]);
        if (null !== t)
            return {
                width: parseInt(t[1], 10),
                height: parseInt(t[2], 10)
            }
    },
    /**
     * 
     * @param {string} e e是字符串，但不确定其范围
     * @returns 一个对象
     */
    parseAttrList: function (e) {
        var t, i = {}, o = /\s*(.+?)\s*=((?:\".*?\")|.*?)(?:,|$)/g;
        for (o.lastIndex = 0; null !== (t = o.exec(e));) {
            // r是value t[0]是整个组 t[1]是key
            var r = t[2];
            0 === r.indexOf('"') && r.lastIndexOf('"') === r.length - 1 && (r = r.slice(1, -1)),
                i[t[1]] = r
        }
        return i
    }
}
