const data = { alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', number: '0123456789' }

export const randomize = (
  type: 'alphabet' | 'number' = 'alphabet',
  length: number = 2,
) => {
  const items = data[type].split('')

  const value = []

  for (let index = 0; index < length; index++) {
    value.push(items[Math.floor(Math.random() * items.length)])
  }

  return value.join('')
}

export const generatePin = () => {
  const alphabet = randomize('alphabet', 2)
  const number = randomize('number', 4)

  return `${alphabet}${number}`
}
