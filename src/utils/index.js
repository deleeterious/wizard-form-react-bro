export const concatStyles = (...classesArr) => classesArr.join(' ')

export const parseDate = (value) => {
  const date = new Date(value)
  return `${date.getDay()}.${date.getMonth() + 1}.${date.getFullYear()}`
}
