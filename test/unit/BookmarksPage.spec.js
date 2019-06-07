import { shallowMount } from '@vue/test-utils'
import BookmarksPage from '@/components/BookmarksPage'
import LoadingCircle from '@/components/icons/LoadingCircle'
import { INITIAL, LOADING } from '@/utils/constants'

const title = 'moby dick'
const library = 'mitte'
const signature = 'FFFFFF'
const lastUpdated = '2019'
const msg = 'foo'

describe('BookmarksPage.vue', () => {
  it('renders', () => {
    const wrapper = shallowMount(BookmarksPage, {
      computed: {
        data: () => [{ identifier: 'foo', details: [{ Titel: title }], availability: [{ library: library, signature: signature, availability: 'bar', status: 'foo' }] }],
        lastUpdated: () => lastUpdated,
        detailsAvailable: () => true,
        getPreferredLibraries: () => library
      }
    })

    expect(wrapper.find('table').exists()).toBeTruthy()
    expect(wrapper.find('.title').text()).toEqual(title)
    expect(wrapper.find('.library').text()).toEqual(library)
    expect(wrapper.find('.signature').text()).toEqual(signature)
    expect(wrapper.findAll('.placeholder').at(1).text()).toEqual(lastUpdated)
  })

  it('displays loading circle while loading', () => {
    const wrapper = shallowMount(BookmarksPage, {
      computed: {
        loading: () => ({ status: LOADING, msg: msg }),
        detailsAvailable: () => false
      }
    })

    expect(wrapper.find(LoadingCircle).exists()).toBeTruthy()
  })

  it('displays placeholder if no bookmarks added', () => {
    const wrapper = shallowMount(BookmarksPage, {
      computed: {
        loading: () => ({ status: INITIAL, msg: msg }),
        detailsAvailable: () => false
      }
    })

    expect(wrapper.find('span').text()).toEqual(msg)
  })
})
