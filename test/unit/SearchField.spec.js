import { shallowMount } from '@vue/test-utils'
import SearchField from '@/components/SearchField'
import Sorter from '@/components/Sorter'

describe('SearchField.vue', () => {
  it('renders', () => {
    const wrapper = shallowMount(SearchField, {
      computed: {
        multipleResultsAvailable: () => false
      }
    })

    expect(wrapper.find('h1').text()).toEqual('Search')
    expect(wrapper.find('input').attributes('placeholder')).toEqual('Search for books, cds...')
  })

  it('renders Sorter if multiple results available', () => {
    const wrapper = shallowMount(SearchField, {
      data () {
        return {
          SEARCH_PAGE_CRITERIONS: []
        }
      },
      computed: {
        multipleResultsAvailable: () => true,
        sorterSorting: () => 'foo'
      }
    })

    expect(wrapper.find(Sorter).exists()).toBeTruthy()
  })
})
