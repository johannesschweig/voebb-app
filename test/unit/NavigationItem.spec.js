import { shallowMount } from '@vue/test-utils'
import NavigationItem from '@/components/NavigationItem'

const page = 'foo'
const icon = 'test'
const label = 'bar'

describe('NavigationItem.vue', () => {
  it('renders active style', () => {
    const wrapper = shallowMount(NavigationItem, {
      propsData: {
        page: page,
        label: label,
        icon: icon
      },
      computed: {
        currentPage: () => page
      }
    })

    expect(wrapper.find('div').attributes('class')).toEqual('active')
    expect(wrapper.find('i').attributes('class')).toEqual(icon)
    expect(wrapper.find('span').text()).toEqual(label)
  })

  it('renders inactive style', () => {
    const wrapper = shallowMount(NavigationItem, {
      propsData: {
        page: page,
        label: label,
        icon: icon
      },
      computed: {
        currentPage: () => 'bar'
      }
    })

    expect(wrapper.find('div').attributes('class')).toEqual('')
    expect(wrapper.find('i').attributes('class')).toEqual(icon)
    expect(wrapper.find('span').text()).toEqual(label)
  })
})
