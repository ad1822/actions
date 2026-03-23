export { }

declare global {
  interface Window {
    __CONFIG__: {
      BASE_URL: string
    }
  }
}
