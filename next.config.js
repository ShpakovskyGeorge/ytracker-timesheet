const webpack = require("webpack");

const withTM = require("next-transpile-modules")([
  "@adobe/react-spectrum",
  "@react-spectrum/actiongroup",
  "@react-spectrum/breadcrumbs",
  "@react-spectrum/badge",
  "@react-spectrum/button",
  "@react-spectrum/buttongroup",
  "@react-spectrum/calendar",
  "@react-spectrum/checkbox",
  "@react-spectrum/combobox",
  "@react-spectrum/contextualhelp",
  "@react-spectrum/datepicker",
  "@react-spectrum/dialog",
  "@react-spectrum/divider",
  "@react-spectrum/form",
  "@react-spectrum/icon",
  "@react-spectrum/illustratedmessage",
  "@react-spectrum/image",
  "@react-spectrum/label",
  "@react-spectrum/labeledvalue",
  "@react-spectrum/layout",
  "@react-spectrum/link",
  "@react-spectrum/list",
  "@react-spectrum/listbox",
  "@react-spectrum/menu",
  "@react-spectrum/meter",
  "@react-spectrum/numberfield",
  "@react-spectrum/overlays",
  "@react-spectrum/picker",
  "@react-spectrum/progress",
  "@react-spectrum/provider",
  "@react-spectrum/radio",
  "@react-spectrum/slider",
  "@react-spectrum/searchfield",
  "@react-spectrum/statuslight",
  "@react-spectrum/switch",
  "@react-spectrum/table",
  "@react-spectrum/tabs",
  "@react-spectrum/text",
  "@react-spectrum/textfield",
  "@react-spectrum/theme-dark",
  "@react-spectrum/theme-default",
  "@react-spectrum/theme-light",
  "@react-spectrum/tooltip",
  "@react-spectrum/view",
  "@react-spectrum/well" ,
  "@spectrum-icons/illustrations",
  "@spectrum-icons/ui",
  "@spectrum-icons/workflow",
]);

/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  output: "standalone",

  compiler: {
    styledComponents: true,
  },

  webpack(config) {
    config.plugins.push(
      new webpack.DefinePlugin({
        __version: JSON.stringify(process.env.npm_package_version),
      }),
    );

    return config;
  },
};

module.exports = withTM({
  ...nextConfig,
});