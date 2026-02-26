// import autoprefixer from "autoprefixer";
// import tailwindcss from "@tailwindcss/postcss";

// const isProduction = process.env.NODE_ENV === "production";

// export default {
//   plugins: [
//     tailwindcss({
//       config: "./tailwind.config.ts",
//     }),
//     autoprefixer,
//     ...(isProduction
//       ? [
//           require("cssnano")({
//             preset: [
//               "default",
//               {
//                 cssDeclarationSorter: false,
//                 mergeRules: false,
//               },
//             ],
//           }),
//         ]
//       : []),
//   ],
// };

import tailwindcss from "@tailwindcss/postcss";
import autoprefixer from "autoprefixer";

export default {
  plugins: [
    tailwindcss({
      config: "./tailwind.config.ts",
    }),
    autoprefixer,
  ],
};
