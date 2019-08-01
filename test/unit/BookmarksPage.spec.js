import { shallowMount } from '@vue/test-utils'
import BookmarksPage from '@/components/BookmarksPage'
import LoadingCircle from '@/components/icons/LoadingCircle'
import { INITIAL, LOADING } from '@/utils/constants'

const msg = 'placeholder-msg'
const lastUpdated = 'last-updated'

describe('BookmarksPage.vue', () => {
  it('renders placeholder if no bookmarks added', () => {
    const wrapper = shallowMount(BookmarksPage, {
      computed: {
        loading: () => ({
          status: INITIAL,
          msg
        }),
        detailsAvailable: () => false,
      }
    })

    expect(wrapper.find('span').text()).toEqual(msg)
  })

  it('displays last updated if details are available', () => {
    const wrapper = shallowMount(BookmarksPage, {
      computed: {
        data: () => [],
        lastUpdated: () => lastUpdated,
        detailsAvailable: () => true,
        getSortedBookmarks: () => []
      }
    })

    expect(wrapper.findAll('.last-updated .placeholder').at(1).text()).toEqual(lastUpdated)
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
})
