Created with CRA and migrated to Vite.

Klingon Ipsum is a simple React project to create random paragraphs of Klingon text. Each sentence is of random length, between 5 and 16 words long. Each paragraph is of random length, between 5 and 7 sentences in length. Paragraphs of less than 2 sentences are appended to the previous paragraph. Inspired by Hipster Ipsum. Now has a progress bar which is useful if generating a large number of paragraphs, e.g. 5 million-plus words.

## To Do

- add pagination
  - will address lag caused when rerendering large numbers of paragraphs as we type into the input box

## Next Commit

## 23/11/23

- Fixed issue where tests accessing local storage would fail
  - my fetch request was checking for local storage before making the request.
- Cleared local storage after each test is run.

## 22/11/23

- Added mock for uuid.
- Now getting act warning
- screen.debug is not rendering loading, but is rendering our loaded app
- added renderComponent to App.test.js
- added a test for input.

## 21/11/23

- Added jest, rtl, jest-dom.
- Updated .eslintrc.cjs.
- Added App.test.js.
- Added .babelrc, jest-setup.js, jest-polyfills.js, and msw.
- Almost kinda maybe at the point where I could write a test.

## 6/11/23

- Updated eslint config and vite.config.js so eslint is working with React
- Updated App.jsx, removed various 'progress' states. Progress.jsx component is rendered based on new boolean state variable 'updateProgress'.
- Text displayed for the Progress component is passed as a prop.
- added styles for Progress.jsx.
- Added Loading and Error logic to App.jsx to render the respective components.
- Deleted unused code from utils.js.
- Added styled components to Error, Loading and Progress for basic styling.

## Changes 5/11/23

- Fixed issue where we were getting 'undefined' as part of our output paragraphs
- Final issue arising from 'optimizing' code is we have a single orphaned line that is not being appended to the previous paragraph.

## Changes 4/11/23

- Updated README.md
- Removed click handlers from App.jsx for the individual steps of generating words, sentence lengths, sentences and paragraphs. This is all done in a single click handler
- the uuid is being recalculated every time the user inputs a number into the input box ... DOH!
- Removed lodash - no longer using debounce
- Added generateUuids to utils. Now our keys, UUIDs, are no longer calculated when rendering.
- Fixed issue when generating paragraphs that was introduced when I stopped using .every and switched to using a for loop.
- Optimized code a bit by pre-allocating arrays, setting arrays to null when finished with them, and setting array elements by index instead of using push().

## Changes 3/11/23

- Updated README.md
- moved generateParagraphs out of App.jsx and into a separate file in utils
  - it takes setProgressParagraphs as an arg now and returns tempText, which is an array of paragraphs
- moved generateSentenceLengths out of App.jsx and into separate file in utils
- moved generatePunctuation out of App.jsx into utils
- moved generateWordArray.js out of App.jsx into utils

## Changes 2/11/23

- Updated README.md
- I guess the CPU spike/lag is happening because the entire DOM is being rerendered every time you update the state
  - Doctor ChatGPT prescribes 'react-virtualized' or 'react-window'
- I tried lodash debounce to debounce the input, so state was only updated when you finish typing
  - this actually worked until you stop typing
  - if you type part of what you want and then pause and try to keep typing, it is still obvious that there is horrible lag
  - on the bright side, it is obviously the state update triggering the rerender that is the performance issue and so react-window or pagination is the answer

## Changes 1/11/23

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
  - example: generating and rendering paragraphs containing 700,000 words. Entering text into the input box is causing a CPU spike.

## Changes 31/10/23

- Updated README.md
- Added vite-plugin-pwa
- Updated styles to increased accessibility
- Removed console.logs to decrease horribility
- Added display swap to Google Fonts URL to avoid FOIT for CLS
- Added 512x512 png for PWA Lighthouse checks
- Inputting very large numbers of words results in a wait time, so let's make it async with progress bar?

## Changes 30/10/23

- Updated README.md
- Added site.webmanifest.json
- Deleted manifest.json
- Moved uuid import and usage to App.jsx, which renders Paragraph.jsx
- Organized imports at head of App.jsx
- Added eslint
- Added prop-types

## Changes 29/10/23

- Added Paragraph.jsx component to render each paragraph.
- Added uuid to generate unique keys for each Paragraph child element.
- Added dist to gitignore
- Updated README.md
