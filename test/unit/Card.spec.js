import { shallowMount, RouterLinkStub } from '@vue/test-utils'
import Card from '@/components/Card'

const row = {
  title: 'title',
  medium: 'medium',
  name: 'name',
  year: 'year',
  availability: 'available',
  identifier: 'identifier'
}
const img = 'img'

describe('Card.vue', () => {
  it('renders for Search', () => {
    const wrapper = shallowMount(Card, {
      propsData: {
        row: {
          ...row,
          img
        },
        wrapper: 'Search'
      },
      stubs: {
        RouterLink: RouterLinkStub
      }
    })

    expect(wrapper.find('.card').exists()).toBeTruthy()
    expect(wrapper.find('img').attributes('src')).toEqual(img)
    expect(wrapper.find('.title').text()).toEqual(`${row.title} (${row.medium})`)
    expect(wrapper.find('.subtitle').text()).toEqual(`${row.name} - ${row.year}`)
  })

  it('renders for Bookmarks', () => {
    const wrapper = shallowMount(Card, {
      propsData: {
        row,
        wrapper: 'Bookmarks'
      },
      stubs: {
        RouterLink: RouterLinkStub
      }
    })

    expect(wrapper.find('.card').exists()).toBeTruthy()
    expect(wrapper.find('.title').text()).toEqual(`${row.title} (${row.medium})`)
    expect(wrapper.find('.subtitle').text()).toEqual(`${row.name} - ${row.year}`)
    expect(wrapper.find('span').text()).toEqual(row.availability)
  })

  it('correct class if not available', () => {
    const wrapper = shallowMount(Card, {
      propsData: {
        row: {
          ...row,
          availability: 'foo'
        },
        wrapper: 'Bookmarks'
      },
      stubs: {
        RouterLink: RouterLinkStub
      }
    })

    expect(wrapper.find('.card.not-available').exists()).toBeTruthy()
  })
})
