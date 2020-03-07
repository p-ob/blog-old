import workboxBuild from "workbox-build";

// NOTE: This should be run *AFTER* all your assets are built
const buildSW = async () => {
  // This will return a Promise
  try {
    const { count, size, warnings } = await workboxBuild.generateSW({
      globDirectory: "_site",
      globPatterns: ["**/*.{html,json,js,css}"],
      swDest: "_site/service-worker.js",
      clientsClaim: true,
      skipWaiting: true,
      runtimeCaching: [
        {
          // Match any request that ends with .png, .jpg, .jpeg or .svg.
          urlPattern: /\.(?:png|jpg|jpeg|svg)$/,
          // Apply a cache-first strategy.
          handler: "CacheFirst",
          options: {
            // Use a custom cache name.
            cacheName: "images",
            // Only cache 10 images.
            expiration: {
              maxEntries: 10
            }
          }
        }
      ]
    });
    for (const warning of warnings) {
      console.warn(warning);
    }
    console.log(`Precached ${count} files, totalling ${size} bytes.`);
  } catch (error) {
    return console.error(`Something went wrong: ${error}`);
  }
};

// TLA maybe someday
(async () => {
  await buildSW();
})();
