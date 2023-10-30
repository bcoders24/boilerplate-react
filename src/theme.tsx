import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: "#3f50b5",
      dark: "#002884",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
    },
  },
  typography: {
    fontFamily: ["Poppins", "sans-serif"].join(","),
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    button: {
      textTransform: "none",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        "*": {
          margin: 0,
          padding: 0,
          boxSizing: "border-box",
        },
        html: {
          width: "100%",
          height: "100%",
          WebkitOverflowScrolling: "touch",
        },
        body: {
          width: "100%",
          height: "100%",
        },
        "#root": {
          width: "100%",
          height: "100%",
        },
        input: {
          "&[type=number]": {
            MozAppearance: "textfield",
            "&::-webkit-outer-spin-button": {
              margin: 0,
              WebkitAppearance: "none",
            },
            "&::-webkit-inner-spin-button": {
              margin: 0,
              WebkitAppearance: "none",
            },
          },
        },
        img: {
          display: "block",
          maxWidth: "100%",
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          height: "30px",
          borderRadius: "20px",
          padding: "0 16px",
        },
      },
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
        disableTouchRipple: true,
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          background: "none",
          padding: 0,
          "&:hover": {
            background: "none",
          },
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        input: {
          "-webkit-appearance": "none",
          appearance: "none",
        },
      },
    },
    MuiInputBase: {},
    MuiRadio: {
      styleOverrides: {
        root: {
          background: "none",
          paddingTop: "4px",
          paddingBottom: 0,
          "&:hover": {
            background: "none",
          },
        },
      },
    },
    MuiInputLabel: {
      defaultProps: {
        sx: {
          fontSize: "13px",
        },
        style: {
          color: "grey",
        },
      },
    },
    MuiOutlinedInput: {
      defaultProps: {
        sx: {
          fontSize: "13px",
        },
      },
    },
    MuiFormLabel: {
      defaultProps: {
        sx: {
          fontSize: "13px",
        },
      },
    },
    MuiTypography: {
      defaultProps: {
        sx: {
          // fontSize: "13px",
        },
      },
      styleOverrides: {
        root: {
          // color: "black",
        },
      },
    },
    MuiFormHelperText: {
      defaultProps: {
        sx: {
          marginX: 0,
          marginY: 0,
        },
      },
    },
    MuiMenuItem: {
      defaultProps: {
        sx: {
          fontSize: "12px !important",
          flexShrink: 0,
        },
      },
      styleOverrides: {
        root: {
          //       justifyContent: "center",
          // "&:hover": {
          //   color: 'red',
          // },
          // "&:hover .MuiListItemIcon-root": {
          //   color: "red",
          // },
        },
      },
    },
    MuiDialogContentText: {
      styleOverrides: {
        root: {
          fontSize: "12px",
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        label: {
          fontSize: "13px",
        },
      },
    },
  },
});
