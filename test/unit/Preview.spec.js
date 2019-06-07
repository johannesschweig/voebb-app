import { shallowMount } from '@vue/test-utils'
import Preview from '@/components/Preview'
import LoadingCircle from '@/components/icons/LoadingCircle'
import { LOADING, DONE } from '@/utils/constants'

const msg = 'foo'
const library = 'library'

describe('Preview.vue', () => {
  it('displays loading msg', () => {
    const wrapper = shallowMount(Preview, {
      computed: {
        data: () => ({ details: [] }),
        loading: () => ({ msg })
      }
    })

    expect(wrapper.find('span').text()).toEqual(msg)
  })

  it('displays details table', () => {
    const wrapper = shallowMount(Preview, {
      computed: {
        data: () => ({ details: [
          { 'foo': 'bar' },
          { 'foo2': 'bar2' }
        ]}),
        loading: () => ({ })
      }
    })

    expect(wrapper.findAll('td').at(0).text()).toEqual('foo')
    expect(wrapper.findAll('td').at(1).text()).toEqual('bar')
    expect(wrapper.findAll('td').at(2).text()).toEqual('foo2')
    expect(wrapper.findAll('td').at(3).text()).toEqual('bar2')
  })

  it('displays availability table', () => {
    const wrapper = shallowMount(Preview, {
      computed: {
        data: () => ({ details: [],
          availability: [
            { library, place: 'place', signature: 'sig', orderStatus: 'os', status: 'status' },
            { library: 'another library', place: 'another place', signature: 'another signature', orderStatus: 'another os', status: 'another status' }
          ] }),
        loading: () => ({ status: DONE, msg }),
        getPreferredLibraries: () => library
      }
    })

    expect(wrapper.findAll('td').at(0).text()).toEqual(library)
    expect(wrapper.findAll('td').at(1).text()).toEqual('place')
    expect(wrapper.findAll('td').at(2).text()).toEqual('sig')
    expect(wrapper.findAll('td').at(3).text()).toEqual('os')
    expect(wrapper.findAll('td').at(4).text()).toEqual('status')
    // s modifier for regex to match also newline characters
    expect(wrapper.find('div.placeholder').text()).toMatch(/Available in:.*another library,/s)
  })

  it('displays placeholder if availabilities are empty', () => {
    const wrapper = shallowMount(Preview, {
      computed: {
        data: () => ({ details: [], availability: [] }),
        loading: () => ({ status: DONE, msg })
      }
    })

    expect(wrapper.findAll('span.placeholder').at(1).text()).toEqual('Not available in any libraries.')
  })

  it('displays loading circle if loading', () => {
    const wrapper = shallowMount(Preview, {
      computed: {
        data: () => ({ details: [] }),
        loading: () => ({ status: LOADING, msg })
      }
    })

    expect(wrapper.find(LoadingCircle).exists()).toBeTruthy()
  })
})
