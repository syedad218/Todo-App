export const theme = {
  colors: {
    primary: "#6c5ce7",
    primaryLight: "#F3E7FF",
    primaryDark: "#5b4cdb",
    success: "#16A34A",
    successLight: "#DCFCE7",
    destructive: "#e74c3c",
    transparent: "transparent",
    skeleton: {
      lighter: "#f5f5f5",
      lightest: "#fafafa",
    },
    text: {
      success: "#16A34A",
      successDark: "#166434",
      primary: "#333",
      primaryDark: "#6B21A8",
      secondary: "#666",
      error: "#e74c3c",
    },
    background: {
      main: "#f8f9fd",
      card: "#ffffff",
      secondary: "#f0f0f0",
      light: "#F9FAFB",
    },
    border: "#eee",
  },
  borderRadius: {
    small: "0.5rem",
    medium: "0.75rem",
    large: "1rem",
    xlarge: "2rem",
  },
  shadows: {
    small: "0 2px 8px rgba(0, 0, 0, 0.06)",
    medium: "0 4px 12px rgba(0, 0, 0, 0.1)",
    large: "0 5px 20px rgba(0, 0, 0, 0.05)",
  },
  buttons: {
    width: {
      xs: "4rem", // 64px - for small actions
      sm: "6rem", // 96px - for compact buttons
      md: "8rem", // 128px - standard button width
      lg: "10rem", // 160px - for primary actions
      xl: "12rem", // 192px - for wide buttons
      auto: "auto", // for flexible width
    },
    height: {
      xs: "2rem",
      sm: "2.5rem",
      md: "3rem",
      lg: "3.5rem",
    },
  },
  spacing: {
    xs: "0.375rem",
    sm: "0.625rem",
    md: "1rem",
    lg: "1.25rem",
    xl: "1.5rem",
    xxl: "1.875rem",
  },
  transitions: {
    default: "all 0.3s ease",
  },
  typography: {
    fontSizes: {
      xsmall: "0.75rem",
      small: "0.875rem",
      regular: "1rem",
      medium: "1.25rem",
      large: "1.75rem",
    },
    fontWeights: {
      regular: 400,
      medium: 500,
      bold: 600,
      bolder: 700,
    },
  },
};

export type ThemeType = typeof theme;
