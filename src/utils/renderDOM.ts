export function render(query: string, block: any) {
  const root: null | Element = document.querySelector(query)

  if (root) {
    root.appendChild(block.getContent())
  }

  block.dispatchComponentDidMount()

  return root
}
