import React from 'react'
// prop-types
import T from 'prop-types'
// redux
import { useDispatch } from 'react-redux'
import { changeActiveFormStage } from 'redux/actions'
// router
import { Link } from 'react-router-dom'
// constants
import {
  ACCOUNT_FORM_STAGE,
  PROFILE_FORM_STAGE,
  CONTACTS_FORM_STAGE,
  CAPABILITIES_FORM_STAGE
} from 'constants.js'
// utils
import { parseDate, concatStyles } from 'utils'
// components
import AvatarImage from 'components/AvatarImage'
// assets
import { ReactComponent as EditIcon } from 'assets/icons/edit.svg'
// css
import classes from './UserInfo.module.css'

const UserInfo = ({ user }) => {
  const {
    userName,
    avatarData,
    password,
    firstName,
    lastName,
    birthDate,
    email,
    address,
    company,
    fax,
    facebookLink,
    phones,
    skills,
    hobbies,
    id
  } = user

  const dispatch = useDispatch()

  return (
    <div className={classes.userInfo}>
      <div className={classes.avatarCont}>
        <AvatarImage avatar={avatarData} />
      </div>
      <div className={classes.infoCont}>
        <div className={classes.sectionCont}>
          <div className={classes.sectionTitle}>
            <div>Account</div>
            <Link
              to={`/edit/${id}`}
              onClick={() =>
                dispatch(changeActiveFormStage(ACCOUNT_FORM_STAGE))
              }
            >
              <EditIcon className={classes.editIcon} />
            </Link>
          </div>
          <div className={classes.infoList}>
            <div className={classes.infoListItem}>
              <div className={classes.infoListItemTitle}>User name:</div>
              <div className={classes.infoListItemValue}>{userName}</div>
            </div>
            <div className={classes.infoListItem}>
              <div className={classes.infoListItemTitle}>Password:</div>
              <div className={classes.infoListItemValue}>{password}</div>
            </div>
          </div>
        </div>
        <div className={classes.sectionCont}>
          <div className={classes.sectionTitle}>
            <div>Person</div>
            <Link
              to={`/edit/${id}`}
              onClick={() =>
                dispatch(changeActiveFormStage(PROFILE_FORM_STAGE))
              }
            >
              <EditIcon className={classes.editIcon} />
            </Link>
          </div>
          <div className={classes.infoList}>
            <div className={classes.infoListItem}>
              <div className={classes.infoListItemTitle}>First name:</div>
              <div className={classes.infoListItemValue}>{firstName}</div>
            </div>
            <div className={classes.infoListItem}>
              <div className={classes.infoListItemTitle}>Last name:</div>
              <div className={classes.infoListItemValue}>{lastName}</div>
            </div>
            <div className={classes.infoListItem}>
              <div className={classes.infoListItemTitle}>Birth date:</div>
              <div className={classes.infoListItemValue}>
                {parseDate(birthDate)}
              </div>
            </div>
            <div className={classes.infoListItem}>
              <div className={classes.infoListItemTitle}>Email:</div>
              <div className={classes.infoListItemValue}>{email}</div>
            </div>
            <div className={classes.infoListItem}>
              <div className={classes.infoListItemTitle}>Address:</div>
              <div className={classes.infoListItemValue}>{address}</div>
            </div>
          </div>
        </div>
        <div className={classes.sectionCont}>
          <div className={classes.sectionTitle}>
            <div>Contacts</div>
            <Link
              to={`/edit/${id}`}
              onClick={() =>
                dispatch(changeActiveFormStage(CONTACTS_FORM_STAGE))
              }
            >
              <EditIcon className={classes.editIcon} />
            </Link>
          </div>
          <div className={classes.infoList}>
            <div className={classes.infoListItem}>
              <div className={classes.infoListItemTitle}>Company:</div>
              <div className={classes.infoListItemValue}>{company}</div>
            </div>
            <div className={classes.infoListItem}>
              <div className={classes.infoListItemTitle}>Fax:</div>
              <div className={classes.infoListItemValue}>{fax || 'N/A'}</div>
            </div>
            <div className={classes.infoListItem}>
              <div className={classes.infoListItemTitle}>Facebook link:</div>
              <div className={classes.infoListItemValue}>
                <a className={classes.link} href={facebookLink}>
                  facebook.com
                </a>
              </div>
            </div>
            {phones?.map((phone, i) => {
              if (phone)
                return (
                  <div className={classes.infoListItem} key={i}>
                    <div className={classes.infoListItemTitle}>
                      Phone#{i + 1}:
                    </div>
                    <div className={classes.infoListItemValue}>{phone}</div>
                  </div>
                )
            })}
          </div>
        </div>
        <div className={classes.sectionCont}>
          <div className={classes.sectionTitle}>
            <div>Capabilities</div>
            <Link
              to={`/edit/${id}`}
              onClick={() =>
                dispatch(changeActiveFormStage(CAPABILITIES_FORM_STAGE))
              }
            >
              <EditIcon className={classes.editIcon} />
            </Link>
          </div>
          <div className={classes.infoList}>
            <div className={classes.infoListItem}>
              <div className={classes.infoListItemTitle}>Skills:</div>
              <div
                className={concatStyles(
                  classes.infoListItemValue,
                  classes.skillsString
                )}
              >
                {skills?.map((item) => item.label).join(', ')}
              </div>
            </div>
            <div className={classes.infoListItem}>
              <div className={classes.infoListItemTitle}>Hobbies:</div>
              <div className={classes.infoListItemValue}>
                {hobbies
                  ?.filter((item) => item)
                  .map((item, idx) => (
                    <p className={classes.hobbiesItem} key={idx}>
                      {item}
                    </p>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

UserInfo.propTypes = {
  user: T.shape({
    userName: T.string,
    avatarData: T.string,
    password: T.string,
    firstName: T.string,
    lastName: T.string,
    birthDate: T.oneOfType([T.object, T.string]),
    email: T.string,
    address: T.string,
    company: T.string,
    fax: T.string,
    facebookLink: T.string,
    phones: T.arrayOf(T.string),
    skills: T.arrayOf(T.object),
    hobbies: T.array,
    id: T.number
  })
}

export default UserInfo
