import { shallowMount } from '@vue/test-utils'
import SearchField from '@/components/SearchField'

describe('SearchField.vue', () => {
  it('renders', () => {
    const wrapper = shallowMount(SearchField)

    expect(wrapper.find('h1').text()).toEqual('Search')
    expect(wrapper.find('input').attributes('placeholder')).toEqual('Search for books, cds...')
  })
})
