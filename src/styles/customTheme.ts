import { StyleFunctionProps } from "@chakra-ui/theme-tools"
import { extendTheme } from "@chakra-ui/react"

// Version 1: Using objects
const theme = extendTheme({
  styles: {
    global: {
      // styles for the `body`
      body: {
        fontFamily: "Helvetica, arial, sans-serif",
        fontSize: "14px",
        lineHeight: "1.6",
        paddingTop: "10px",
        paddingBottom: "10px",
        padding: "30px",
        color: "#333",
        bg: "#f7f7f7",
      },
      // styles for the `a`
      a: {
        color: "teal.500",
        _hover: {
          textDecoration: "underline",
        },
      },
    },
  },
})

export default theme
