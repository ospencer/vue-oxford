import VueOxford, { join } from './index.js'
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

  it("doesn't consider comments or whitespace", () => {
    const Component = { 
      template: `
        <oxford>
          <span>1</span>
          <span>2</span>
          <span>3</span><span>4</span>
          <!-- This is a comment -->
          <span>5</span>
        </oxford>
      `
    }

    const wrapper = mount(Component, {
      localVue
    })

    expect(wrapper.text()).toEqual('1, 2, 3, 4, and 5')
  })
})

describe('join', () => {
  it('handles an empty array', () => {
    expect(join()).toEqual('')
    expect(join([])).toEqual('')
  })

  it('joins one item', () => {
    expect(join(['red'])).toEqual('red')
  })

  it('joins two items', () => {
    expect(join(['red', 'blue'])).toEqual('red and blue')
  })

  it('joins three items', () => {
    expect(join(['red', 'blue', 'green'])).toEqual('red, blue, and green')
  })

  it('joins many items', () => {
    expect(join(['red', 'blue', 'green', 'pink'])).toEqual('red, blue, green, and pink')
    expect(join(['red', 'blue', 'green', 'pink', 'yellow', 'aqua'])).toEqual('red, blue, green, pink, yellow, and aqua')
  })

  it('joins with conjunction', () => {
    expect(join([], 'or')).toEqual('')
    expect(join(['red', 'blue'], 'or')).toEqual('red or blue')
    expect(join(['red', 'blue', 'green'], 'or')).toEqual('red, blue, or green')
  })
})
