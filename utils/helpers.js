// Define all your custom helper functions
const helpers = {
  extend: function (name, context) {
    // Placeholder for custom 'extend' logic
    return context.fn(this);
  },
  block: function (name, options) {
    // Placeholder for custom 'block' logic
    return null; // Implement what 'block' should do
  },
  content: function () {
    // Placeholder for your 'content' helper
    return 'Some content';
  },
  formatDate: function (date) {
    // Format the date as a readable string
    return date.toLocaleDateString();
  },
  // ... any other custom helpers ...
};

// Directly export the helpers object
module.exports = helpers;
