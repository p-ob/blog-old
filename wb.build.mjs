import workboxBuild from "workbox-build";

// NOTE: This should be run *AFTER* all your assets are built
const buildSW = () => {
  // This will return a Promise
  return workboxBuild.generateSW({
    globDirectory: '_site',
    globPatterns: [
      '**/*.{html,json,js,css}',
    ],
    swDest: '_site/service-worker.js',
  });
};

buildSW();