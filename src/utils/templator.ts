export const compile = (
  template: string,
  values: {
    [key: string]: string
  }
) => {
  return template.replace(/{{(\w+)}}/g, (match, key) => {
    return values[key] !== undefined ? values[key] : match
  })
}
