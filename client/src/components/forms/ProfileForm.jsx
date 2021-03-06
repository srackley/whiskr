import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import { updateUser, addItem, clearForm } from '../../store';
import { PersonalInfo } from './PersonalInfo';
import { PetPreferences } from './PetPreferences';
import { PetHistory } from './PetHistory';

// COMPONENT
class ProfileForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
    };
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.assignValue = this.assignValue.bind(this);
  }

  assignValue(inputName) {
    const { form, user } = this.props;
    const value = (form[inputName] && form[inputName].length)
      ? form[inputName]
      : user[inputName];
    return value;
  }

  nextPage(evt) {
    evt.preventDefault();
    this.setState({ page: this.state.page + 1 });
  }

  previousPage(evt) {
    evt.preventDefault();
    this.setState({ page: this.state.page - 1 });
  }

  render() {
    const {
      handleSubmit, handleChange, handleCheckbox, user, form, name, history,
    } = this.props;
    const { page } = this.state;
    return (
      <div className="splash">
        <div className="form animated flipInX">
          <div>
            {page === 1 && <PersonalInfo
              display={this.props.display}
              nextPage={this.nextPage}
              onChange={handleChange}
              defaultValue={this.assignValue}
              user={user}
              form={form}
            />}
            {page === 2 && <PetPreferences
              previousPage={this.previousPage}
              nextPage={this.nextPage}
              onCheck={handleCheckbox}
              form={form}
            />}
            {page === 3 && <PetHistory
              previousPage={this.previousPage}
              onChange={handleChange}
              onCheck={handleCheckbox}
              defaultValue={this.assignValue}
              submitForm={() => handleSubmit(user.id, form, name, history)}
              user={user}
              form={form}
            />}
          </div>
        </div>
      </div>
    );
  }
}

// CONTAINER
const mapCreateProfile = (state, ownProps) => ({
  user: state.currentUser,
  form: state.form,
  name: 'createProfile',
  display: 'Please Create Your Profile to Better Help Us Match You With Your Purrfect Companion',
  history: ownProps.history,
});

const mapUpdateProfile = (state, ownProps) => ({
  user: state.currentUser,
  form: state.form,
  name: 'updateProfile',
  display: 'Update Your Preferences for Better Matching',
  history: ownProps.history,
});

const mapDispatch = dispatch => ({
  handleChange(evt) {
    const key = evt.target.name;
    const value = evt.target.value;
    dispatch(addItem(key, value));
  },
  handleCheckbox(checkboxState, componentName) {
    const key =
      componentName === 'animalPreferences'
        ? 'animalPreferences'
        : 'otherPetTypes';
    const array = _.keys(_.pickBy(checkboxState));
    dispatch(addItem(key, array));
  },
  handleSubmit(userId, formState, name, history) {
    const redirect = name === 'createProfile'
      ? '/pets'
      : '/home';
    Promise.resolve(dispatch(updateUser(userId, formState)))
      .then(() => {
        dispatch(clearForm());
        history.push(redirect);
      })
      .catch(err => console.log(err));
  },
});

export const CreateProfile = withRouter(connect(mapCreateProfile, mapDispatch)(ProfileForm));
export const UpdateProfile = withRouter(connect(mapUpdateProfile, mapDispatch)(ProfileForm));
