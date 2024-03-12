import { createTheme } from "@mantine/core";

const theme = createTheme({
  colors: {
    brand: [
      "#ebffff",
      "#d8fdfd",
      "#aafdfd",
      "#7dfdfc",
      "#62fcfc",
      "#56fcfc",
      "#4efdfc",
      "#41e1e1",
      "#30c8c8",
      "#00adad",
    ],
  },
  primaryColor: "brand",
  primaryShade: 9,
});

export default theme;
