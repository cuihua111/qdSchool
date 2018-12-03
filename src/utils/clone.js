
/**
 * 对象 & 数组 - 深拷贝
 */

// 判断是否是对象（且不为null）
const isObject = data => {
  return data !== null && typeof data === 'object' && !Array.isArray(data)
}

// 判断是否是数组
const isArray = data => {
  return Array.isArray(data)
}

// 判断是否是一般数据类型或null
const isSimple = data => {
  return typeof data !== 'object' || data === null
}

/**
 * 对象深拷贝
 */
export const DeepCloneObj = (obj) => {
  let newObj = {}
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key]
      // 1. 如果value是简单类型
      if (isSimple(value)) {
        newObj[key] = value
      }
      // 2. 如果value是数组
      if (isArray(value)) {
        newObj[key] = DeepCloneArr(value)
      }
      // 3. 如果value是对象
      if (isObject(value)) {
        newObj[key] = DeepCloneObj(value)
      }
    }
  }
  return newObj
}

/**
 * 数组深拷贝
 */
export const DeepCloneArr = (arr) => {
  if (!arr.length) return []
  let newArr = []
  arr.forEach((value, index) => {
    // 1. 如果value是简单类型
    if (isSimple(value)) {
      newArr[index] = value
    }
    // 2. 如果value是数组
    if (isArray(value)) {
      newArr[index] = DeepCloneArr(value)
    }
    // 3. 如果value是对象
    if (isObject(value)) {
      newArr[index] = DeepCloneObj(value)
    }
  })
  return newArr
}
