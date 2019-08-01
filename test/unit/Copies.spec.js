import { shallowMount } from '@vue/test-utils'
import Copies from '@/components/Copies'

const instance = {
  library: 'library1',
  place: 'place1',
  signature: 'signature1',
  status: 'Ausgeliehen - Fällig am: 24.6.2019'
}

const instance2 = {
  library: 'library2',
  place: 'place2',
  signature: 'signature2',
  status: 'Verfügbar'
}

describe('Copies.vue', () => {
  it('renders placeholder', () => {
    const wrapper = shallowMount(Copies, {
      computed: {
        data: () => ({
          copies: []
        })
      },
      methods: {
        isDone: () => true,
        getPreferred: () => [],
        getNotPreferred: () => []
      }
    })

    expect(wrapper.find('.placeholder').text()).toEqual('Not available in any libraries.')
  })

  it('renders preferred and not preferred libraries', () => {
    const wrapper = shallowMount(Copies, {
      computed: {
        data: () => ({
          copies: []
        })
      },
      methods: {
        isDone: () => true,
        getPreferred: () => ([
          instance,
          instance2
        ]),
        getNotPreferred: () => []
      }
    })

    expect(wrapper.findAll('.not-available td').at(0).text()).toEqual(instance.library)
    expect(wrapper.findAll('.not-available td').at(1).text()).toMatch(new RegExp('^.*days left$'))
    expect(wrapper.findAll('tr').at(1).findAll('td').at(0).text()).toMatch(new RegExp(instance2.library + '\\n.*\\n.*(' + instance2.place + ')', 's'))
    expect(wrapper.findAll('tr').at(1).findAll('td').at(1).text()).toEqual(instance2.signature)
  })
})
