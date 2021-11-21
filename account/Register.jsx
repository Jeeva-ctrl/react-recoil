import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

export { Register };

function Register({ history }) {
  const validationSchema = Yup.object().shape({
    firstname: Yup.string().required('First name is required'),
    lastname: Yup.string().required('Last name is required'),
    username: Yup.string().required('User Name is required'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be atleast 6 characters'),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors, isSubmitting } = formState;

  const submitForm = (data) => {
    console.log({ data });
  };

  return (
    <div className="card m-3">
      <h4 className="card-header">Registration </h4>
      <div className="card-body">
        <form onSubmit={handleSubmit(submitForm)}>
          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              {...register('firstname')}
              className={`form-control ${errors.firstname ? 'is-invalid' : ''}`}
              name="firstname"
            />
            <div className="invalid-feedback">{errors.firstname?.message}</div>
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              {...register('lastname')}
              className={`form-control ${errors.lastname ? 'is-invalid' : ''}`}
              name="lastname"
            />
            <div className="invalid-feedback">{errors.lastname?.message}</div>
          </div>
          <div className="form-group">
            <label>User Name</label>
            <input
              type="text"
              {...register('username')}
              className={`form-control ${errors.username ? 'is-invalid' : ''}`}
              name="username"
            />
            <div className="invalid-feedback">{errors.username?.message}</div>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              {...register('password')}
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              name="password"
            />
            <div className="invalid-feedback">{errors.password?.message}</div>
          </div>
          <button disabled={isSubmitting} className="btn btn-primary">
            {isSubmitting && (
              <span className="spinner-border spinner-border-sm mr-1"></span>
            )}
            Register
          </button>
          <Link to="login" className="btn btn-link">
            Cancel
          </Link>
        </form>
      </div>
    </div>
  );
}
