import preprocess from 'svelte-preprocess'

export default {
  // Consult https://svelte.dev/docs#compile-time-svelte-preprocess
  // for more information about preprocessors
  preprocess: preprocess({
    scss: {
      prependData: `@import './src/styles/global.scss';`
    }
  })
}
