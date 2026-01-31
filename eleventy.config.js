const { DateTime } = require('luxon');

module.exports = function(eleventyConfig) {
  // Passthrough copy for static assets
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/fonts");
  eleventyConfig.addPassthroughCopy("src/lang-switch.css");
  eleventyConfig.addPassthroughCopy("src/lang-switch.js");
  eleventyConfig.addPassthroughCopy("src/adventure-map.js");
  eleventyConfig.addPassthroughCopy("src/.nojekyll");
  // Add a Luxon-based date formatter that outputs YYYY-MM-DD
  eleventyConfig.addFilter("postDate", function(dateObj) {
    if (!dateObj) return "";
    try {
      const dt = DateTime.fromJSDate(new Date(dateObj));
      return dt.toISODate(); // returns YYYY-MM-DD
    } catch (e) {
      return "";
    }
  });
  // Passthrough copy for article specific assets if any (though currently they seem to use root images/fonts)
  // We'll keep the structure simple.

  return {
    dir: {
      input: "src",
      output: "_site", // Standard output
      includes: "_includes"
    },
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk"
  };
};
