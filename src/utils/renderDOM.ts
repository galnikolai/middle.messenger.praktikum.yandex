import { BlockProps } from '../modules/Block'

export function render(query: string, block: BlockProps) {
  const root: null | Element = document.querySelector(query)

  if (root) {
    root.innerHTML = ''
    root.appendChild(block.getContent())
  }

  block.dispatchComponentDidMount()

  return root
}
