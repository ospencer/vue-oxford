export default {
  name: 'VueOxford',
  render (h) {
    let children = (this.$slots.default || []).filter(node => {
      if (typeof node.text === 'string' && !node.text.trim()) return false
      if (node.isComment) return false
      return true
    })

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

export const join = (strings=[]) => {
  switch (strings.length) {
    case 0: return ''
    case 1: return strings[0] || ''
    case 2: {
      const [first, second] = strings
      return `${first} and ${second}`
    }
    default: {
      const start = strings.slice(0, -1)
      const end = strings[strings.length - 1]
      return `${start.join(', ')}, and ${end}`
    }
  }
}
