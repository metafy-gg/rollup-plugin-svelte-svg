const fs = require("fs");
const { optimize } = require("svgo");
const svelte = require("svelte/compiler");

function compileSvg(source, filename, ssr) {
  const {
    js: { code, map },
  } = svelte.compile(source, {
    generate: ssr ? "ssr" : "dom",
    dev: process.env.NODE_ENV === "development",
    hydratable: true,
  });
  return { code, map };
}

function optimizeSvg(content, path, config = {}) {
  const { data } = optimize(content, {
    ...config,
    path,
  });
  return data;
}

module.exports = (options = {}) => {
  const { svgoConfig, ssr } = options;
  const svgRegex = /(\.svg)$/;
  const splitRegex = /(<svg.*?)(\/?>.*)/;

  return {
    name: "svelte-svg",
    transform(_, id) {
      const result = id.match(svgRegex);
      if (result && result[1] === ".svg") {
        const code = fs.readFileSync(id);
        let svg = optimizeSvg(code, id, svgoConfig);
        // Support any custom attributes
        const parts = splitRegex.exec(svg);
        if (parts === null) {
          console.error("[rollup-plugin-svelte-svg] Failed to parse:", id);
        } else {
          const [_, head, body] = parts;
          svg = `${head} {...$$props}${body}`;
        }
        // Compile with Svelte
        return compileSvg(svg, id, ssr);
      }
    },
  };
};
