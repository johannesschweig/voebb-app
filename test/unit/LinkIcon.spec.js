import { shallowMount } from '@vue/test-utils'
import LinkIcon from '@/components/icons/LinkIcon'

describe('LinkIcon.vue', () => {
  it('renders', () => {
    const wrapper = shallowMount(LinkIcon, {
      propsData: {
        identifier: 'foo'
      }
    })

    expect(wrapper.find('a').attributes('href')).toEqual('https://voebb.de/aDISWeb/app?service=direct/0/Home/$DirectLink&sp=SPROD00&sp=Sfoo')
    expect(wrapper.find('i').attributes('class')).toEqual('fas fa-lg fa-external-link-square-alt')
  })
})
