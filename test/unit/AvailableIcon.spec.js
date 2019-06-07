import { shallowMount } from '@vue/test-utils'
import AvailableIcon from '@/components/icons/AvailableIcon'

// returns a string of the date in two days in the format d.m.yyyy (e.g. 13.6.2019)
function getDateString () {
  let date = new Date(new Date().getTime() + (2 * 24 * 60 * 60 * 1000))
  date = date.toLocaleDateString('en-US').split('/')
  return date[1] + '.' + date[0] + '.' + date[2]
}

describe('AvailableIcon.vue', () => {
  it('renders check if available', () => {
    const wrapper = shallowMount(AvailableIcon, {
      propsData: {
        avail: 'verfügbar'
      }
    })

    expect(wrapper.find('i').attributes('class')).toEqual('far fa-lg fa-check-circle')
  })

  it('renders cross if not available', () => {
    const wrapper = shallowMount(AvailableIcon, {
      propsData: {
        avail: 'ist zur Zeit nicht verfügbar'
      }
    })

    expect(wrapper.find('i').attributes('class')).toEqual('fas fa-lg fa-times')
  })

  it('renders question mark if only link to full preview', () => {
    const wrapper = shallowMount(AvailableIcon, {
      propsData: {
        avail: 'siehe Vollanzeige'
      }
    })

    expect(wrapper.find('i').attributes('class')).toEqual('fas fa-lg fa-question')
  })

  it('renders clock with days if borrowed', () => {
    const wrapper = shallowMount(AvailableIcon, {
      propsData: {
        avail: 'Ausgeliehen - Fällig am: ' + getDateString()
      }
    })

    expect(wrapper.find('i').attributes('class')).toEqual('far fa-clock')
    expect(wrapper.find('div').text()).toEqual('(2)')
  })

  it('renders text if unknown', () => {
    const wrapper = shallowMount(AvailableIcon, {
      propsData: {
        avail: 'foo'
      }
    })

    expect(wrapper.find('span').text()).toEqual('foo')
  })
})
