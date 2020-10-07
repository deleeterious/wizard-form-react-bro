import React from 'react'
// router
import { Link } from 'react-router-dom'
// components
import AvatarImage from 'components/AvatarImage'
// assets
import { ReactComponent as EditIcon } from 'assets/icons/edit.svg'
// css
import classes from './UserInfo.module.css'
import { useDispatch } from 'react-redux'
import { changeActiveFormStage } from 'redux/actions'

const UserInfo = ({ user }) => {
  const {
    userName,
    avatar,
    password,
    firstName,
    lastName,
    birthDate,
    email,
    address,
    company,
    fax,
    facebookLink,
    phone,
    skills,
    id
  } = user
  console.log(user)
  const dispatch = useDispatch()
  return (
    <div className={classes.userInfo}>
      <div className={classes.avatarCont}>
        <AvatarImage avatar={avatar} />
      </div>
      <div className={classes.infoCont}>
        <div className={classes.sectionCont}>
          <div className={classes.sectionTitle}>
            <div>Account</div>
            <Link
              to={`/edit/${id}`}
              onClick={() => dispatch(changeActiveFormStage(1))}
            >
              <EditIcon />
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
              onClick={() => dispatch(changeActiveFormStage(2))}
            >
              <EditIcon />
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
              <div className={classes.infoListItemValue}>{birthDate}</div>
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
              onClick={() => dispatch(changeActiveFormStage(3))}
            >
              <EditIcon />
            </Link>
          </div>
          <div className={classes.infoList}>
            <div className={classes.infoListItem}>
              <div className={classes.infoListItemTitle}>Company:</div>
              <div className={classes.infoListItemValue}>{company}</div>
            </div>
            <div className={classes.infoListItem}>
              <div className={classes.infoListItemTitle}>Fax:</div>
              <div className={classes.infoListItemValue}>{fax}</div>
            </div>
            <div className={classes.infoListItem}>
              <div className={classes.infoListItemTitle}>Facebook link:</div>
              <div className={classes.infoListItemValue}>{facebookLink}</div>
            </div>
            <div className={classes.infoListItem}>
              <div className={classes.infoListItemTitle}>Phone#1:</div>
              <div className={classes.infoListItemValue}>{phone}</div>
            </div>
          </div>
        </div>
        <div className={classes.sectionCont}>
          <div className={classes.sectionTitle}>
            <div>Capabilities</div>
            <Link
              to={`/edit/${id}`}
              onClick={() => dispatch(changeActiveFormStage(4))}
            >
              <EditIcon />
            </Link>
          </div>
          <div className={classes.infoList}>
            <div className={classes.infoListItem}>
              <div className={classes.infoListItemTitle}>Skills:</div>
              <div className={classes.infoListItemValue}>
                {skills?.map((item) => item.label).join(', ')}
              </div>
            </div>
            <div className={classes.infoListItem}>
              <div className={classes.infoListItemTitle}>Hobbies:</div>
              <div className={classes.infoListItemValue}>Hobbies</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserInfo
