export default {
  name: 'VueOxford',
  render (h) {
    const children = this.$slots.default || []

    let components = []
    if (children.length <= 1) {
      components = children
    } else if (children.length === 2) {
      components = children.concat()
      components.splice(1, 0, ' and ')
    } else {
      children.forEach((child, i) => {
        if (i < children.length - 2) {
          components.push(child, ', ')
        } else if (i === children.length - 2) {
          components.push(child, ', and ')
        } else {
          components.push(child)
        }
      })
    }

    return h('span', components)
  }
}