import VueOxford from './index.js'
import { mount, createLocalVue } from '@vue/test-utils'

const localVue = createLocalVue()
localVue.component('oxford', VueOxford)

function makeComponent(items) {
  return {
    data () {
      return { items }
    },
    template: `
      <div>
        Some things are <oxford>
          <span v-for="item of items">{{item}}</span>
        </oxford>.
      </div>
    `
  }
}

describe('VueOxford', () => {
  it('renders one item', () => {
    const Component = makeComponent(['good'])

    const wrapper = mount(Component, {
      localVue
    })

    expect(wrapper.text()).toEqual('Some things are good.')
  })

  it('renders two items', () => {
    const Component = makeComponent(['good', 'bad'])

    const wrapper = mount(Component, {
      localVue
    })

    expect(wrapper.text()).toEqual('Some things are good and bad.')
  })

  it('renders three items', () => {
    const Component = makeComponent(['good', 'bad', 'ugly'])

    const wrapper = mount(Component, {
      localVue
    })

    expect(wrapper.text()).toEqual('Some things are good, bad, and ugly.')
  })

  it('renders n items', () => {
    const Component = makeComponent(['good', 'bad', 'ugly', 'red', 'blue', 'green'])

    const wrapper = mount(Component, {
      localVue
    })

    expect(wrapper.text()).toEqual('Some things are good, bad, ugly, red, blue, and green.')
  })

  it('renders no items', () => {
    const Component = makeComponent([])

    const wrapper = mount(Component, {
      localVue
    })

    expect(wrapper.text()).toEqual('Some things are .')
  })
})