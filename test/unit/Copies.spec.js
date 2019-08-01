import { shallowMount } from '@vue/test-utils'
import Copies from '@/components/Copies'

const instances = [{
  library: 'library1',
  place: 'place1',
  signature: 'signature1',
  status: 'Ausgeliehen - Fällig am: 24.6.2019'
}, {
  library: 'library2',
  place: 'place2',
  signature: 'signature2',
  status: 'verfügbar'
}, {
  library: 'library3',
  place: 'place3',
  signature: 'signature3',
  status: 'Nicht im Regal'
}, {
  library: 'library4',
  place: 'place4',
  signature: 'signature4',
  status: 'foo'
}, {
  library: 'library5',
  place: 'place5',
  signature: 'signature5',
  status: 'Ausgeliehen - Fällig am: 24.6.2119'
}, {
  library: 'library6',
  place: 'place6',
  status: 'verfügbar'
}]

describe('Copies.vue', () => {
  it('empty if loading', () => {
    const wrapper = shallowMount(Copies, {
      methods: {
        isDone: () => false
      }
    })

    expect(wrapper.find('div').exists()).toBeFalsy()
  })

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
        getPreferred: () => instances,
        getNotPreferred: () => instances
      }
    })

    // name of library
    expect(wrapper.findAll('.not-available td').at(0).text()).toEqual(instances[0].library)
    // days overdue
    expect(wrapper.findAll('.not-available td').at(1).text()).toMatch(new RegExp('^.*days overdue$'))
    // library
    expect(wrapper.findAll('tr').at(1).findAll('td').at(0).text()).toEqual(instances[1].library)
    // signature (place)
    expect(wrapper.findAll('tr').at(1).findAll('td').at(1).text()).toMatch(new RegExp(instances[1].signature + '.*(' + instances[1].place + ')', 's'))
    // lost
    expect(wrapper.findAll('tr').at(2).findAll('td').at(1).text()).toEqual('lost')
    // unknown status
    expect(wrapper.findAll('tr').at(3).findAll('td').at(1).text()).toEqual(instances[3].status)
    expect(wrapper.find('.placeholder > span:nth-child(3)').text()).toEqual(instances.map(e => e.library).join(', '))
    // days left
    expect(wrapper.findAll('tr').at(4).findAll('td').at(1).text()).toMatch(new RegExp('^.*days left$'))
    // no signature -> only place
    expect(wrapper.findAll('tr').at(5).findAll('td').at(1).text()).toEqual(instances[5].place)
  })
})
