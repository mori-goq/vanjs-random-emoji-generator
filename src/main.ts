import van from 'vanjs-core'

import { emojiList } from './constants'

const { div, h1, label, button, input, span } = van.tags

const RandomEmojiGenerator = () => {
  const emojiCount = van.state(1)
  const randomEmojiText = van.state('')

  const generateRandomEmojiText = () => {
    const randomEmojiList = [...new Array(emojiCount.val).keys()].map(() => {
      const randomNumber = Math.floor(Math.random() * emojiList.length)
      return emojiList[randomNumber]
    })

    randomEmojiText.val = randomEmojiList.join('')
  }

  // init
  generateRandomEmojiText()

  return div(
    { class: 'random-emoji-generator' },
    h1('Random Emoji Generator'),
    div(
      { class: 'emoji-controls' },
      label({ for: 'emoji-count' }, 'Number of Emojis: '),
      input({
        id: 'emoji-count',
        type: 'number',
        value: emojiCount,
        oninput: (event: InputEvent) => {
          emojiCount.val = +(event.target as HTMLInputElement).value
        },
      }),
      button(
        {
          type: 'button',
          onclick: () => generateRandomEmojiText(),
        },
        'Generate',
      ),
    ),
    div({ class: 'emoji-display' }, span({ class: 'emoji' }, randomEmojiText)),
  )
}

van.add(document.getElementById('app')!, RandomEmojiGenerator())
