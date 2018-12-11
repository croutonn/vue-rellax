import Rellax from 'rellax';
var _Vue; // tslint:disable-line variable-name
var instanceMap = new WeakMap();
var inserted = function (el, _a, vm) {
    var value = _a.value;
    instanceMap.set(el, new Rellax(el, value));
};
var destroy = function (el) {
    var instance = instanceMap.get(el);
    if (!instance) {
        return;
    }
    instance.destroy();
};
var unbind = function (el) {
    destroy(el);
};
var update = function (el, _a, vm) {
    var value = _a.value;
    destroy(el);
    instanceMap.set(el, new Rellax(el, value));
};
var install = function (InjectedVue) {
    if (process.env.NODE_ENV !== 'production' && _Vue) {
        throw new Error('[vue-rellax] Vue Rellax is already installed');
    }
    _Vue = InjectedVue;
    _Vue.directive('rellax', {
        inserted: inserted,
        update: update,
        unbind: unbind
    });
};
var plugin = {
    install: install
};
export default plugin;
