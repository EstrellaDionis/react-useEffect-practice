import React, { useState, useEffect } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const Login = (props) => {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [emailIsValid, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);


  //Lesson 114. VERY good and simple explanation of what's happening.
  //'effect running' will only show up once (when the component mounts)
  //'effect cleanup' will only show once the component is removed
  useEffect(() => {
    console.log('EFFECT RUNNING')

    return () => {
      console.log('EFFECT CLEANUP AKA CLEANUP FUNCTION')
    }
  }, [])

  //this runs when enteredEmail and/or enteredPassword are updated!
  //originally had setFormIsValid as a dependency BUT REMOVED because state-updating functions by default are insured by react to never change
  //this checks 500 milliseconds after user has stopped typing
  useEffect(() => {
    const identifier = setTimeout(() => {
      //this section of code now only runs once instead of checking every keystroke
      console.log('Checking form validity')
      setFormIsValid(
        enteredEmail.includes('@') && enteredPassword.trim().length > 6
      );
    }, 500)

    //this section runs with every keystroke
    //this is known as a cleanup function
    //if the dependencies are empty in a cleanup function (return function), it will run only when the component is REMOVED
    return () => {
      console.log('CLEANUP')
      clearTimeout(identifier) //clearing the setTimeout function above. Its clearing the timer before setting a new one
    }
  }, [enteredEmail, enteredPassword])

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
  };

  const validateEmailHandler = () => {
    setEmailIsValid(enteredEmail.includes('@'));
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(enteredEmail, enteredPassword);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={enteredEmail}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
