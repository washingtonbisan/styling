module.exports = {
  extends: [
    "stylelint-config-standard",        // Standard CSS rules
    "stylelint-config-tailwindcss",     // Allows Tailwind's @apply, @tailwind etc
  ],
  plugins: [
    "stylelint-order",                  // Enforces property order (grouped logically)
  ],
  rules: {
    // Allow Tailwind directives without errors
    "at-rule-no-unknown": [true, {
      ignoreAtRules: [
        "tailwind", "apply", "variants", "responsive",
        "screen", "layer", "config"
      ]
    }],

    // CSS Modules: class names must be camelCase (e.g. .trackName not .track-name)
    "selector-class-pattern": [
      "^[a-z][a-zA-Z0-9]*$",
      { message: "CSS Module class names must be camelCase" }
    ],

    // Enforce logical property order: positioning → box model → typography → visual
    "order/properties-order": [
      ["position", "top", "right", "bottom", "left", "z-index"],
      ["display", "flex", "flex-direction", "align-items", "justify-content",
       "grid-template-columns", "gap", "width", "height", "padding", "margin"],
      ["font-size", "font-weight", "line-height", "color", "text-align"],
      ["background", "border", "border-radius", "box-shadow", "opacity",
       "transform", "transition", "animation"]
    ],

    // Allow CSS custom properties (our design tokens)
    "custom-property-pattern": "^[a-z][a-z0-9-]*$",

    // Disallow duplicate properties
    "declaration-block-no-duplicate-properties": true,

    // No empty blocks
    "block-no-empty": true,

    // Consistent hex color format
    "color-hex-length": "long",
  }
};