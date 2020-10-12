// Common validation

export const requiredValidation = () => ({ required: 'This field is required' })

// Account form validation

export const avatarValidation = () => ({
  validate: (value) =>
    value.length === 0 || +value[0].size < 1e6 || 'File size is more than 1MB'
})

export const userNameValidation = (users) => ({
  required: 'This field is required',
  validate: (value) =>
    !users.find((user) => user.userName === value) ||
    'This username is already used'
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

export const emailValidation = (users) => ({
  required: 'This field is required',
  validate: (value) =>
    !users.find((user) => user.email === value) || 'This email is already used'
})

// Contacts form validation

export const faxValidation = () => ({
  pattern: {
    value: /(\+\d\d) (\(\d\d\d\)) \d\d\d \d\d \d\d/,
    message: 'Invalid phone number'
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
  validate: (value) => value.length >= 3 || 'Choose three or more skills'
})

export const additionInfoValidation = () => ({
  maxLength: { value: 300, message: 'Max length 300 symbols' }
})
