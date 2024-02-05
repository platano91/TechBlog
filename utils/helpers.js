const helpers = {
  extend: function (name, context) {
    // This function allows for the extension of templates in some templating engines.
    return context.fn(this);
  },

  block: function (name) {
    // This function is meant to define a block that can be overridden.
    // Since the implementation is not provided, it's a placeholder.
    // You should implement the logic based on your templating engine's needs.
  },

  content: function (name, options) {
    // This function is designed to handle content blocks.
    return options.fn(this);
  },

  formatDate: function (date) {
    // This function formats a JavaScript Date object into a readable string.
    // Ensure 'date' is a valid Date object to prevent runtime errors.
    if (!(date instanceof Date)) throw new TypeError("Invalid date");
    return date.toLocaleDateString();
  },
};

module.exports = helpers;
