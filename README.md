Created with CRA and migrated to Vite.

Klingon Ipsum is a simple React project to create random paragraphs of Klingon text. Each sentence is of random length, between 5 and 16 words long. Each paragraph is of random length, between 5 and 7 sentences in length. Paragraphs of less than 2 sentences are appended to the previous paragraph. Inspired by Hipster Ipsum.

Changes 1/11/23

- Updated README.md
- Took the code to generate a word array, sentence lengths, add punctuation and generate paragraphs and made it async.
- The project is a bit of a mess right now, but I've added multiple temporary progress bars and the performance is good with async code
- One issue that was harming performance was a 'Forced reflow while executing JavaScript' violation warning
  - I fixed this by adding a boolean renderParagraphs to state
  - renderParagraphs is set to false when we start generating our word array - this is an enormous boost to performance
- other things to note
  - uuid being generated for each paragraph doesn't seem to harm performance noticeably
  - useFetch hook is not refetching data on every rerender, and won't by design
- now, unfortunately, the input is sluggish once text has been generated, so that's the next item to be addressed
  - there is high CPU usage AFTER all my processing is finished and words are being displayed, so that's the issue with input.
  - example: generating and rendering paragraphs containing 700,000 words. Entering text into the input box is causing the CPU spike.

Changes 31/10/23

- Updated README.md
- Added vite-plugin-pwa
- Updated styles to increased accessibility
- Removed console.logs to decrease horribility
- Added display swap to Google Fonts URL to avoid FOIT for CLS
- Added 512x512 png for PWA Lighthouse checks
- ## Inputting very large numbers of words results in a wait time, so let's make it async with progress bar?

Changes 30/10/23

- Updated README.md
- Added site.webmanifest.json
- Deleted manifest.json
- Moved uuid import and usage to App.jsx, which renders Paragraph.jsx
- Organized imports at head of App.jsx
- Added eslint
- Added prop-types

Changes 29/10/23

- Added Paragraph.jsx component to render each paragraph.
- Added uuid to generate unique keys for each Paragraph child element.
- Added dist to gitignore
- Updated README.md

### How to create a progress bar?

- we have a number of words
- each word has to be added to an array
- if we have 100 words, 1 word and a space represents 1% of progress
- we probably want to limit the number of rerenders but let's ignore it for now
-
