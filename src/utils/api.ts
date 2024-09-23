import Block from '../modules/Block'
import { StoreEvents, store } from '../modules/Store'

export const trim = (value: string, pattern?: string) => {
  let val = value.split(' ').join('')
  if (pattern) {
    const splittedpatern = pattern.split('')
    splittedpatern.map((iPat) => {
      val = val.split(iPat).join('')
    })
  }
  return val
}

// type Indexed<T = unknown> = {
//   [key in string]: T
// }

// const merge = (lhs: Indexed, rhs: Indexed): Indexed => {
//   const result: Indexed = { ...lhs }

//   Object.keys(rhs).forEach((key) => {
//     if (typeof rhs[key] === 'object' && rhs[key] !== null && !Array.isArray(rhs[key])) {
//       if (typeof lhs[key] === 'object' && lhs[key] !== null && !Array.isArray(lhs[key])) {
//         result[key] = merge(lhs[key] as Indexed, rhs[key] as Indexed)
//       } else {
//         result[key] = rhs[key]
//       }
//     } else {
//       result[key] = rhs[key]
//     }
//   })

//   return result
// }

export type Indexed<T = any> = {
  [key in string]: T
}

function merge(lhs: Indexed, rhs: Indexed): Indexed {
  for (let p in rhs) {
    if (!rhs.hasOwnProperty(p)) {
      continue
    }

    try {
      if (rhs[p].constructor === Object) {
        rhs[p] = merge(lhs[p] as Indexed, rhs[p] as Indexed)
      } else {
        lhs[p] = rhs[p]
      }
    } catch (e) {
      lhs[p] = rhs[p]
    }
  }

  return lhs
}

export function set(object: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
  if (typeof path !== 'string') {
    throw new Error('path must be string')
  }

  if (typeof object !== 'object') {
    return object
  }

  const splittedPath: string[] = path.split('.')
  const reducedObj = splittedPath.reduceRight<Indexed>((acc: Indexed, i: string, key: number) => {
    if (key === splittedPath.length - 1) {
      return { [i]: value }
    } else {
      return { [i]: acc }
    }
  }, {} as Indexed)

  return merge(object as Indexed, reducedObj)
}

export function isEqual(lhs: any, rhs: any): boolean {
  // Если оба значения не являются объектами, сравниваем их напрямую
  if (typeof lhs !== 'object' || typeof rhs !== 'object' || lhs === null || rhs === null) {
    return lhs === rhs
  }

  // Если у объектов разное количество ключей, они не равны
  const lhsKeys = Object.keys(lhs)
  const rhsKeys = Object.keys(rhs)

  if (lhsKeys.length !== rhsKeys.length) {
    return false
  }

  // Рекурсивно сравниваем каждый ключ и его значение
  for (let key of lhsKeys) {
    if (!rhs.hasOwnProperty(key)) {
      return false
    }

    const lhsValue = lhs[key]
    const rhsValue = rhs[key]

    // Рекурсивное сравнение вложенных объектов
    if (!isEqual(lhsValue, rhsValue)) {
      return false
    }
  }

  return true
}

function isArray(value: unknown): value is [] {
  return Array.isArray(value)
}

type PlainObject<T = unknown> = {
  [k in string]: T
}

function isPlainObject(value: unknown): value is PlainObject {
  return (
    typeof value === 'object' &&
    value !== null &&
    value.constructor === Object &&
    Object.prototype.toString.call(value) === '[object Object]'
  )
}

function isArrayOrObject(value: unknown): value is [] | PlainObject {
  return isPlainObject(value) || isArray(value)
}

export function cloneDeep(obj: any): any {
  if (isArray(obj)) {
    return obj.map((i) => cloneDeep(i))
  }

  if (isPlainObject(obj)) {
    const keys = Object.keys(obj)

    for (let key of keys) {
      if (isPlainObject(obj[key])) {
        return cloneDeep(obj[key])
      } else {
        return { ...obj, [key]: obj[key] }
      }
    }
  }

  return obj
}

/* мое решение
function stringifyObjHelper(data: StringIndexed | any, resultStr?: string): any {
  if (!isPlainObject(data) && resultStr) {
    return resultStr
  }
  const objKeys = Object.keys(data)
  for (let key of objKeys) {
    if (isPlainObject(data[key])) {
      return stringifyObjHelper(data[key], (resultStr || '') + `[${key}]`)
    } else {
      return stringifyObjHelper(null, (resultStr || '') + `[${key}]=${data[key]}`)
    }
  }
}

function queryStringify(data: StringIndexed): string | never {
  if (!isPlainObject(data)) {
    throw new Error('input must be an object')
  }

  const keys = Object.keys(data)

  return keys.reduce((acc, i, key) => {
    let result = ''
    if (isPlainObject(data[i])) {
      result = `${i}${stringifyObjHelper(data[i])}`
    } else if (isArray(data[i])) {
      result = (data[i] as any[]).reduce((acc, v, key) => {
        const calculated = acc + `${i}[${key}]=${v}`
        return (data[i] as any[]).length - 1 !== key ? calculated + '&' : calculated
      }, '')
    } else {
      result = `${i}=${data[i]}`
    }

    if (keys?.length - 1 === key) {
      return acc + result
    } else {
      return acc + result + '&'
    }
  }, '')
}

*/

////// Решение из учебника

function getKey(key: string, parentKey?: string) {
  return parentKey ? `${parentKey}[${key}]` : key
}

function getParams(data: PlainObject | [], parentKey?: string) {
  const result: [string, string][] = []

  for (const [key, value] of Object.entries(data)) {
    if (isArrayOrObject(value)) {
      result.push(...getParams(value, getKey(key, parentKey)))
    } else {
      result.push([getKey(key, parentKey), encodeURIComponent(String(value))])
    }
  }

  return result
}

export function queryString(data: PlainObject) {
  if (!isPlainObject(data)) {
    throw new Error('input must be an object')
  }

  return getParams(data)
    .map((arr) => arr.join('='))
    .join('&')
}

///////

export function connect(Component: typeof Block, mapStateToProps: (state: Indexed) => Indexed) {
  // используем class expression

  return class extends Component {
    constructor(props: any) {
      let state = mapStateToProps(store.getState())

      super({ ...props, ...state })

      // подписываемся на событие
      store.on(StoreEvents.Updated, () => {
        // при обновлении получаем новое состояние
        const newState = mapStateToProps(store.getState())

        // если что-то из используемых данных поменялось, обновляем компонент
        if (!isEqual(state, newState)) {
          this.setProps({ ...newState })
        }

        // не забываем сохранить новое состояние
        state = newState
      })
    }
  }
}
