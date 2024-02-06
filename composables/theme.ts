export const getUserTheme = () => {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? 'dark'
    : 'light'
}