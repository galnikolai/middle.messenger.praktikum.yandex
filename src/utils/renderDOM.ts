export function render(query: string, block: any) {
  const root: null | Element = document.querySelector(query)

  console.log('here')
  // Можно завязаться на реализации вашего класса Block

  if (root) {
    console.log(block.getContent())
    root.appendChild(block.getContent())
  }

  block.dispatchComponentDidMount()

  return root
}
