Created with CRA and migrated to Vite.

Klingon Ipsum is a simple React project to create random paragraphs of Klingon text. Each sentence is of random length, between 5 and 16 words long. Each paragraph is of random length, between 5 and 7 sentences in length. Paragraphs of less than 2 sentences are appended to the previous paragraph. Inspired by Hipster Ipsum.

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
