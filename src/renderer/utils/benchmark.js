import { search } from './requests.js'

function getTimeDiff (start) {
  return (new Date() - start) / 1000
}

async function aSearch (term) {
  let start = new Date()
  await search(term)
  return getTimeDiff(start)
}

// rounds the number to two digits
function roundTwo (num) {
  return Math.round(num * 100) / 100
}

export async function benchmark () {
  // time: 3-5s 18.06.2019 14:00 office
  // time: 2-8s 18.06.2019 22:00 home
  // 3.81 ( 2.68 - 5.25 ) 19.06.2019 23:00 home
  let terms = ['vuillard', 'biene maja', 'karlson vom dach', '1945', 'gespür für schnee', 'kochen und backen']
  let timeDiffs = []
  for (const term of terms) {
    console.log('starting with', term)
    timeDiffs.push(await aSearch(term))
  }
  // calculate stats
  let mean = roundTwo(timeDiffs.reduce((a, b) => a + b, 0) / timeDiffs.length)
  let min = roundTwo(Math.min(...timeDiffs))
  let max = roundTwo(Math.max(...timeDiffs))
  console.log('mean:', mean, '(', min, '-', max, ')')
  console.log(timeDiffs)
}
