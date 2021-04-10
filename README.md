# Rollup Svelte SVG

Rollup plugin to transform SVGs into Svelte components.

It also optimizes your SVGs by running them thru
[svgo](https://github.com/svg/svgo).

## Note

This package is not published to NPM at this point in time.

## Usage

```svelte
<script>
  import MyIcon from 'assets/my-icon.svg';
</script>

<MyIcon width={42} height={42} />
```

## Setup

### `rollup.config.js`

```js
const svelteSVG = require("rollup-plugin-svelte-svg");

// Sapper
export default {
  client: {
    // ...
    plugins: [
      svelteSVG({ svgoConfig: {}, ssr: false });
    ]
  },
  server: {
    // ...
    plugins: [
      svelteSVG({ svgoConfig: {}, ssr: true });
    ]
  }
}
```

## Credits

This plugin is based on the work from the following projects:

- https://github.com/metafy-gg/vite-plugin-svelte-svg
- https://github.com/codefeathers/rollup-plugin-svelte-svg
- https://github.com/visualfanatic/vite-svg

## License

MIT
