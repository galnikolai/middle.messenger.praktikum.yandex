import { BlockProps } from '../modules/Block'

export function render(query: string, block: BlockProps | null) {
  const root: null | Element = document.querySelector(query)

  if (root && block) {
    root.innerHTML = ''
    root.appendChild(block.getContent())
  }

  // block.dispatchComponentDidMount()

  return root
}
