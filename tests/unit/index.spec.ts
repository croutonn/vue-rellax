import { createLocalVue, mount } from '@vue/test-utils'
import { expect } from 'chai'
import { Rellax } from 'rellax'
import Vue, { CreateElement } from 'vue'
import Plugin from '../../src/'

const sleep = (time: number) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, time)
  })

const FoundationComponent = {
  name: 'Foundation',
  render(h: CreateElement) {
    return h('div', {
      style: {
        height: '5000px'
      }
    })
  }
}

describe('Plugin Tests', () => {
  it('Basic', async () => {
    const localVue = createLocalVue()
    localVue.use(Plugin)

    const exampleOptions: Rellax.RellaxOptions = {
      speed: -2
    }

    const ExampleComponent = {
      name: 'Example',
      render(h: CreateElement) {
        return h('div', {
          style: {
            height: '100px'
          },
          class: {
            example: true
          },
          directives: [
            {
              name: 'rellax',
              value: exampleOptions
            }
          ]
        })
      }
    }

    const wrapper = mount(
      {
        render(h: CreateElement) {
          return h('div', [h(ExampleComponent), h(FoundationComponent)])
        }
      },
      {
        localVue,
        attachToDocument: true
      }
    )

    // デフォルトスタイルシートの margin-top を 0　に
    document.body.style.marginTop = '0'

    // 垂直方向に 100px スクロール
    window.scrollTo(0, 100)

    // 60fps で setTimeout して位置更新しているので待つ
    await sleep(300)

    const example = wrapper.find('.example')

    expect(example.element.getBoundingClientRect().bottom === 0).to.equal(false)
  })
})
