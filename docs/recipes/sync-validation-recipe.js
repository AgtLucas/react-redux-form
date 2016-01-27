import React from 'react';
import { connect } from 'react-redux';
import { Field, actions, getField } from 'react-redux-form';

import validator from 'validator';

import Recipe from '../components/recipe-component';

const code = `
import validator from 'validator';
import { Field } from 'react-redux-form';

const isRequired = (value) => !validator.isNull(value);

class UserForm extends React.Component {
  render() {
    let { user, userForm } = this.props;

    return (
      <form>
        <Field model="user.username"
          validators={{
            required: isRequired,
            length: (v) => v && v.length > 15
          }}
          validateOn="blur">
          <label>Username</label>
          <input type="text"/>

          { getField(userForm, 'username').errors.required
            && <div>Username is required</div>
          }
        </Field>

        <Field model="user.email"
          validators={{
            required: isRequired,
            email: validator.isEmail
          }}
          validateOn="blur">
          <label>Email</label>
          <input type="text" />

          { (getField(userForm, 'email').errors.required)
          && <div>Email address is required</div> }
          { (getField(userForm, 'email').errors.email)
          && <div>Must be valid email address</div> }
        </Field>

        <Field model="user.age"
          parser={(val) => +val}
          validators={{
            required: isRequired,
            number: validator.isInt,
            minAge: (age) => age >= 18
          }}
          validateOn="blur">
          <label>Age</label>
          <input type="text" />

          { (getField(userForm, 'age').errors.required)
          && <div>Age is required</div> }
          { (getField(userForm, 'age').errors.number)
          && <div>Age must be a number</div> }
          { (getField(userForm, 'age').errors.minAge)
          && <div>Must be 18 years or older</div> }
        </Field>
      </form>
    );
  }
}
`

const isRequired = (value) => !validator.isNull(value);

class SyncValidationRecipe extends React.Component {
  render() {
    let { user, userForm, dispatch } = this.props;

    console.log(getField(userForm, 'username'));

    return (
      <Recipe model="user" code={code}>
        <h2>Sync Validation</h2>
        <Field model="user.username"
          validators={{
            required: isRequired,
            length: (v) => v && v.length > 15
          }}
          validateOn="blur">
          <label>Username</label>
          <input type="text"/>
          { getField(userForm, 'username').errors.required
            && <div className="rsf-error">Username is required</div>
          }
        </Field>

        <Field model="user.email"
          validators={{
            required: isRequired,
            email: validator.isEmail
          }}
          validateOn="blur">
          <label>Email</label>
          <input type="text" />
          { (getField(userForm, 'email').errors.required)
          && <div className="rsf-error">Email address is required</div> }
          { (getField(userForm, 'email').errors.email)
          && <div className="rsf-error">Must be valid email address</div> }
        </Field>

        <Field model="user.age"
          parser={(val) => +val}
          validators={{
            required: isRequired,
            number: validator.isInt,
            minAge: (age) => age >= 18
          }}
          validateOn="blur">
          <label>Age</label>
          <input type="text" />
          { (getField(userForm, 'age').errors.required)
          && <div className="rsf-error">Age is required</div> }
          { (getField(userForm, 'age').errors.number)
          && <div className="rsf-error">Age must be a number</div> }
          { (getField(userForm, 'age').errors.minAge)
          && <div className="rsf-error">Must be 18 years or older</div> }
        </Field>
      </Recipe>
    );
  }
}

export default connect(s => s)(SyncValidationRecipe);
