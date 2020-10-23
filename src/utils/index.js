import faker from 'faker'

export const concatStyles = (...classesArr) => classesArr.join(' ')

export const parseDate = (value) => {
  const date = new Date(value)
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
}

export const formatToRelativeTime = (value) => {
  // const passedTime = new Date(new Date() - new Date(2019, 8, 19, 9, 30, 0, 0))
  const passedTime = new Date(new Date() - value)

  if (passedTime.getUTCFullYear() - 1970) {
    return passedTime.getUTCFullYear() > 1
      ? `${passedTime.getUTCFullYear()} years ago`
      : `${passedTime.getUTCFullYear()} year ago`
  }
  if (passedTime.getUTCMonth()) {
    return passedTime.getUTCMonth() > 1
      ? `${passedTime.getUTCMonth()} months ago`
      : `${passedTime.getUTCMonth()} month ago`
  }
  if (passedTime.getUTCDate() - 1) {
    return passedTime.getUTCDate() - 1 > 1
      ? `${passedTime.getUTCDate() - 1} days ago`
      : `${passedTime.getUTCDate() - 1} day ago`
  }
  if (passedTime.getUTCHours()) {
    return `${passedTime.getUTCHours()} hours ago`
  }

  if (passedTime.getMinutes() >= 5)
    return `${passedTime.getMinutes()} minutes ago`
  if (passedTime.getMinutes() < 1) return 'just now'
  if (passedTime.getMinutes() < 5) return 'few minutes ago'
}

export class FakeUser {
  constructor() {
    this.additionInfo = faker.lorem.words(15)
    this.address = faker.address.city()
    this.avatarData = faker.image.imageUrl()
    this.birthDate = faker.date.recent()
    this.company = faker.company.companyName()
    this.email = faker.internet.email()
    this.facebookLink = faker.internet.url()
    this.fax = faker.phone.phoneNumber('+38 (###) ### ## ##')
    this.firstName = faker.name.firstName()
    this.gender = faker.name.gender()
    this.githubLink = faker.internet.url()
    this.hobbies = [
      faker.random.boolean(),
      faker.random.boolean(),
      faker.random.boolean(),
      faker.random.boolean(),
      faker.random.boolean(),
      faker.random.boolean()
    ]
    this.language = { value: 'null', label: faker.random.word() }
    this.lastName = faker.name.lastName()
    this.lastUpdate = new Date()
    this.password = 'password1'
    this.passwordRepeat = 'password1'
    this.phones = [faker.phone.phoneNumber('+38 (###) ### ## ##')]
    this.skills = [
      { value: 'null', label: faker.random.word() },
      { value: 'null', label: faker.random.word() },
      { value: 'null', label: faker.random.word() }
    ]
    this.userName = faker.random.word()
  }
}
