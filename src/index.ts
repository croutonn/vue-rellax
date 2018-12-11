import Rellax, { RellaxInstance } from 'rellax'
import Vue, {
  DirectiveFunction,
  PluginFunction,
  PluginObject,
  VNode
} from 'vue'

let _Vue: typeof Vue // tslint:disable-line variable-name

const instanceMap = new WeakMap<HTMLElement, RellaxInstance>()

const inserted: DirectiveFunction = (el, { value }, vm) => {
  if (value === false) { return }

  instanceMap.set(el, new Rellax(el, value))
}

const destroy = (el: HTMLElement) => {
  const instance = instanceMap.get(el)
  if (!instance) {
    return
  }
  instance.destroy()
}

const unbind: DirectiveFunction = el => {
  destroy(el)
}

const update: DirectiveFunction = (el, { value }, vm) => {
  destroy(el)
  if (value === false) { return }
  instanceMap.set(el, new Rellax(el, value))
}

const install: PluginFunction<void> = (InjectedVue: typeof Vue) => {
  if (process.env.NODE_ENV !== 'production' && _Vue) {
    throw new Error('[vue-rellax] Vue Rellax is already installed')
  }

  _Vue = InjectedVue

  _Vue.directive('rellax', {
    inserted,
    update,
    unbind
  })
}

const plugin: PluginObject<void> = {
  install
}

export default plugin
