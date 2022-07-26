declare module '*.hbs' {
  const template: (params?: unknown) => string
  export default template
}

declare module '*.jpg' {
  const content: string
  export default content
}

declare module '*.webp' {
  const content: string
  export default content
}
