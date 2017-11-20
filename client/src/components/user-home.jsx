import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { NavLink } from 'react-router-dom'

//COMPONENT

export const UserHome = (props) => {
  const {user} = props

  return (
    <div>
      <h3>Your Profile</h3>
      <div>
        <div>
          <h4>Email:</h4>
          <p>{user.email}</p> 
        </div>
        <div>
          <h4>Phone Number:</h4>
          <p>{user.phoneNumber}</p> 
        </div>
        <div>
          <h4>Zip Code:</h4>
          <p>{user.zipCode}</p> 
        </div>
        <div>
          <h4>Types of Animals You Prefer to Match With:</h4>
          {!user.animalPreferences.length
          ? <p>None</p>
          : <ul>{user.animalPreferences.map((animal, index) =>
              <li key={index}>{animal}</li>
            )}</ul> }
        </div>
        <div>
          <h4>Types of Animals You Currently Own:</h4>
          {!user.otherPetTypes.length 
          ? <p>None</p>
          : <ul>{user.otherPetTypes.map((animal, index) =>
              <li key={index}>{animal}</li>
            )}</ul>}
        </div>
        <div>
          <h4>You Have Young Children:</h4>
          <p>{user.hasYoungChildren ? 'Yes' : 'No'}</p> 
        </div>
        <div>
          <h4>Your Pet Owning History:</h4>
          <p>{user.petHistory}</p> 
        </div>
      </div>
      <div>
        <NavLink to="/updateProfile">
          <button>Edit Your Profile</button>
        </NavLink>
        <button disabled={true}>Delete Your Account</button>
      </div>
    </div>
  )
}


//CONTAINER
const mapState = (state) =>  ({ user: state.currentUser })



export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
