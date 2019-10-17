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
  // 4.6 ( 2.71 - 7.27 ) 22.06.2019 15:00 home
  // 10.75 ( 12.343, 13.529, 2.774, 4.503, 5.213, 26.137 ) 09.08.2019 home
  // 9.45 ( 3.776, 11.414, 3.99, 7.878, 6.539, 23.094 ) 16.10.2019 office
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
