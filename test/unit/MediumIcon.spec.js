import { shallowMount } from '@vue/test-utils'
import MediumIcon from '@/components/icons/MediumIcon'
import { mediumIcons } from '@/utils/constants'

describe('MediumIcon.vue', () => {
  mediumIcons.map(el => {
    it('renders icon: ' + el.name, () => {
      const wrapper = shallowMount(MediumIcon, {
        propsData: {
          medium: el.name
        }
      })

      expect(wrapper.find('i').attributes('class')).toEqual(el.icon)
    })
  }
  )

  it('empty for unknown medium', () => {
    const wrapper = shallowMount(MediumIcon, {
      propsData: {
        medium: 'foo'
      }
    })

    expect(wrapper.find('i').exists()).toEqual(false)
  })
})
