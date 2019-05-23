import { shallowMount } from '@vue/test-utils'
import BookmarkIcon from '@/components/icons/BookmarkIcon'

describe('BookmarkIcon.vue', () => {
  it('renders active icon', () => {
      const wrapper = shallowMount(BookmarkIcon, {
        propsData: {
          active: true,
          identifier: 'foo'
        }
      })

      expect(wrapper.find('i').attributes('class')).toEqual('fa-bookmark fa-lg fas')
  })

  it('renders inactive icon', () => {
      const wrapper = shallowMount(BookmarkIcon, {
        propsData: {
          active: false,
          identifier: 'foo'
        }
      })

      expect(wrapper.find('i').attributes('class')).toEqual('fa-bookmark fa-lg far')
  })
})