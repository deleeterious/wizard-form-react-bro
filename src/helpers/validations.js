import db from 'db'

const isUniquePropValidation = async (value, currentUser, prop) => {
  const users = await db.table('users').toArray()

  const foundUser = users.find((user) => user[prop] === value)

  if (foundUser) {
    if (foundUser[prop] !== currentUser[prop]) {
      return `This ${prop} is already used`
    }
  }

  return true
}

// Common validation

export const requiredValidation = () => ({ required: 'This field is required' })

// Account form validation

export const userNameValidation = (currentUser) => ({
  required: 'This field is required',
  validate: (value) => isUniquePropValidation(value, currentUser, 'userName')
})

export const passwordValidation = (passwordRepeat) => ({
  required: 'This field is required',
  // validate: (value) => passwordRepeat === value || "Password don't match",
  minLength: { value: 8, message: 'Password min length 8 symbols' },
  pattern: { value: /\d/, message: 'Password must have least 1 number' }
})

export const passwordRepeatValidation = (password) => ({
  required: 'This field is required',
  validate: (value) => value === password || "Password don't match"
})

// Profile form validation

export const birthDateValidation = () => ({
  validate: (value) =>
    new Date().getFullYear() - new Date(value).getFullYear() > 18 ||
    'You are under 18 years old'
})

export const emailValidation = (currentUser) => ({
  required: 'This field is required',
  pattern: {
    value: /\w+[@]\w+[.]\w+/,
    message: 'Invalid email'
  },
  validate: (value) => isUniquePropValidation(value, currentUser, 'email')
})

// Contacts form validation

export const faxValidation = () => ({
  pattern: {
    value: /(\+\d\d) (\(\d\d\d\)) \d\d\d \d\d \d\d/,
    message: 'Invalid fax number'
  }
})

export const phoneValidation = () => ({
  pattern: {
    value: /(\+\d\d) (\(\d\d\d\)) \d\d\d \d\d \d\d/,
    message: 'Invalid phone number'
  }
})

// Capabilities form validation

export const skillsValidation = () => ({
  validate: (value) => value?.length >= 3 || 'Choose three or more skills'
})

export const additionInfoValidation = () => ({
  maxLength: { value: 300, message: 'Max length 300 symbols' }
})
