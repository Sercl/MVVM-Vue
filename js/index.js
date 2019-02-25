function Vue (options) {
    var self = this;
    this.data = options.data;
    this.methods = options.methods;

    Object.keys(this.data).forEach(function (key) {
        self.proxyKeys(key);
    });
    //监听data
    observe(this.data);
    new Compile(options.el, this);
    options.mounted.call(this); // 所有事情处理好后执行mounted函数
}

Vue.prototype = {
    proxyKeys: function (key) {
        var self = this;
        //在Vue实例上新增属性
        Object.defineProperty(this, key, {
            //不允许枚举
            enumerable: false,
            //可修改
            configurable: true,
            get: function () {
                return self.data[key];
            },
            set: function (newVal) {
                self.data[key] = newVal;
            },
        });
    },
};
