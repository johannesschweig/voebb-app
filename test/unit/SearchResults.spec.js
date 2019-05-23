import { shallowMount } from "@vue/test-utils"
import SearchResults from '@/components/SearchResults'
import LoadingCircle from '@/components/icons/LoadingCircle'
import { INITIAL, LOADING, DONE } from '@/utils/constants'


    //     ...mapState({
    //         results: state => state.searchResults,
    //         loading: state => state.loading.searchResults,
    //         previewStatus: state => state.loading.preview.status,
    //         activeRow: state => state.preview.identifier
    //     }),
    //     ...mapGetters([
    //         'bookmarksList'
    //     ]),
const msg = 'loading-msg'

describe('SearchResults.vue', () => {

    it('renders search results if any', () => {
        const wrapper = shallowMount(SearchResults, {
        computed: {
            results: () => [
                { identifier: '01', title: 'foo', medium: 'Buch', name: 'blub', year: '1234', avail: 'test' },
                { identifier: '02', title: 'foo2', medium: 'Buch2', name: 'blub2', year: '1235', avail: 'test2', img: 'img'}
            ],
            loading: () => ({ status: DONE }),
            previewStatus: () => INITIAL,
            activeRow: () => '01',
            bookmarksList: () => []
        }
        })

        expect(wrapper.find(SearchResults).exists()).toBeTruthy()
        // correct text per row
        expect(wrapper.findAll('tr').at(0).find('td').text()).toMatch(/foo \(Buch\).*blub  -  1234/s)
        // highlights active row
        expect(wrapper.findAll('tr').at(0).attributes('class')).toEqual('active-row')
        // img src empty if attribute is missing
        expect(wrapper.findAll('tr').at(0).find('img').attributes('src')).toEqual('')
        // correct text per row
        expect(wrapper.findAll('tr').at(1).find('td').text()).toMatch(/foo2 \(Buch2\).*blub2  -  1235/s)
        // img src filled if attribute present
        expect(wrapper.findAll('tr').at(1).find('img').attributes('src')).toEqual('img')
        // root fills space if preview is not there
        expect(wrapper.find('.container').attributes('class')).toEqual('container fill-space')
    })

    it('displays placeholder', () => {
      const wrapper = shallowMount(SearchResults, {
        computed: {
          results: () => [],
          loading: () => ({ status: DONE, msg }),
          previewStatus: () => DONE,
        }
      })

      expect(wrapper.find('span.placeholder').text()).toEqual(msg)
      expect(wrapper.find('.container').attributes('class')).toEqual('container')
  })

  it('displays loading circle if loading', () => {
      const wrapper = shallowMount(SearchResults, {
        computed: {
          results: () => [],
          loading: () => ({ status: LOADING }),
          previewStatus: () => INITIAL,
        }
      })

      expect(wrapper.find(LoadingCircle).exists()).toBeTruthy()
  })
})