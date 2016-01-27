import React from 'react';
import { connect } from 'react-redux';
import { Field, getField } from 'react-redux-form';

import Recipe from '../components/recipe-component';

const code = `
import { Field } from 'react-redux-form';

function isAvailable(value, done) {
  setTimeout(() => {
    done(value !== 'davidkpiano')
  }, 1000);
}

class UserForm extends React.Component {
  render() {
    let { userForm } = this.props;

    return (
      <form>
        <h2>Async Blur Validation</h2>
        <p>Try not to type in my username, "davidkpiano." I've already claimed it.</p>
        <Field model="user.username"
          asyncValidators={{
            available: isAvailable
          }}
          asyncValidateOn="blur">
          <label htmlFor="">Username</label>
          <input type="text" />
        </Field>
        { getField(userForm, 'username').pending
          ? <div>Checking username...</div>
          : getField(userForm, 'username').errors.available
            ? <div>Sorry, that username isn't available.</div>
            : getField(userForm, 'username').touched
              && <div>That username looks great!</div>
        }
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    userForm: state.userForm
  }
}

export default connect(mapStateToProps)(UserForm);
`

function isAvailable(value, done) {
  setTimeout(() => {
    done(value !== 'davidkpiano')
  }, 1000);
}

class AsyncBlurValidationRecipe extends React.Component {
  render() {
    let { user, userForm } = this.props;

    console.log(userForm.fields['username']);

    return (
      <Recipe model="user" code={code}>
        <h2>Async Blur Validation</h2>
        <p>Try not to type in my username, "davidkpiano." I've already claimed it.</p>
        <Field model="user.username"
          asyncValidators={{
            available: isAvailable
          }}
          asyncValidateOn="blur">
          <label htmlFor="">Username</label>
          <input type="text" />
        </Field>
        { getField(userForm, 'username').pending
          ? <div className="rsf-error">Checking username...</div>
          : getField(userForm, 'username').errors.available
            ? <div className="rsf-error">Sorry, that username isn't available.</div>
            : getField(userForm, 'username').touched
              && <div className="rsf-success">That username looks great!</div>
        }
      </Recipe>
    );
  }
}

export default connect(s => s)(AsyncBlurValidationRecipe);
