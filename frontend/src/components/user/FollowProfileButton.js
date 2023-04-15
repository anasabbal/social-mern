import React from 'react'
import PropTypes from 'prop-types'
import userService from '../../service/user-service'
import { Button } from '@mui/material'


export default function FollowProfileButton(props){
    const followClick = () => {
        props.onButtonClick(userService.follow)
      }
      const unfollowClick = () => {
        props.onButtonClick(userService.unfollow)
      }
        return (<div>
          { props.following
            ? (<Button variant="contained" color="secondary" onClick={unfollowClick}>Unfollow</Button>)
            : (<Button variant="contained" color="primary" onClick={followClick}>Follow</Button>)
          }
        </div>)
    }
FollowProfileButton.propTypes = {
    following: PropTypes.bool.isRequired,
    onButtonClick: PropTypes.func.isRequired
}