import { shallowMount } from '@vue/test-utils'
import Details from '@/components/Details'

const msg = 'msg'

describe('Details.vue', () => {
  it('renders placeholder', () => {
    const wrapper = shallowMount(Details, {
      computed: {
        data: () => ({
          details: []
        }),
        loading: () => ({
          msg
        })
      }
    })

    expect(wrapper.find('.placeholder').text()).toEqual(msg)
  })

  it('renders details', () => {
    const wrapper = shallowMount(Details, {
      computed: {
        data: () => ({
          details: {
            foo: 'bar',
            foo2: 'bar2'
          }
        })
      },
      methods: {
        sanitizeString: (key, value) => value
      }
    })

    expect(wrapper.findAll('tr').at(0).findAll('td').at(0).text()).toEqual('foo')
    expect(wrapper.findAll('tr').at(0).findAll('td').at(1).text()).toEqual('bar')
    expect(wrapper.findAll('tr').at(1).findAll('td').at(0).text()).toEqual('foo2')
    expect(wrapper.findAll('tr').at(1).findAll('td').at(1).text()).toEqual('bar2')
  })
})
