# voebb-app

> An electron-vue project

### Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:9080
npm run dev

# build electron application for production
npm run build


# lint all JS/Vue component files in `src/`
npm run lint

```

## Tests
### Unit tests
Run unit tests with `npm run unit`. Run individual tests (e.g. SettingsPage) with `npm run unit SettingsPage`. Exclude tests with `npm run unit -- --testPathIgnorePatterns file.spec.js`. Keep unit tests constantly running when on file change `npm run unit -- --watch`.
### E2E tests
Run e2e tests with `npm run e2e`. Individual tests can be ran by adding a `-g` parameter in the npm script in the `package.json` (e.g. `...mocha test/e2e -g Search`).

---

This project was generated with [electron-vue](https://github.com/SimulatedGREG/electron-vue)@[8fae476](https://github.com/SimulatedGREG/electron-vue/tree/8fae4763e9d225d3691b627e83b9e09b56f6c935) using [vue-cli](https://github.com/vuejs/vue-cli). Documentation about the original structure can be found [here](https://simulatedgreg.gitbooks.io/electron-vue/content/index.html).
