import { FaUser } from "react-icons/fa";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { register, reset } from "../features/auth/authSlice";

function Register() {
  // Initialize Form Data state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  // Form data destructuring
  const { name, email, password, password2 } = formData;

  // Dispatch hook initialization
  const dispatch = useDispatch();

  // Set naviage
  const navigate = useNavigate();

  // useSelector hook initialization
  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    // Redirect when logged in
    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [isError, isSuccess, user, message, navigate, dispatch]);

  // On change input form data
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // On Submit Form
  const onSubmit = (e) => {
    e.preventDefault();

    // Match password
    if (password !== password2) {
      toast.error("Passwords do not match");
    } else {
      const userData = {
        name,
        email,
        password,
      };
      dispatch(register(userData));
    }
  };

  return (
    <>
      <section className='heading'>
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please create an account</p>
      </section>
      <section className='form'>
        <form method='post' onSubmit={onSubmit}>
          <div className='form-group'>
            <input
              className='form-control'
              type='text'
              id='name'
              name='name'
              value={name}
              required
              placeholder='Enter your name'
              onChange={onChange}
            />
            <input
              type='email'
              value={email}
              id='email'
              name='email'
              required
              placeholder='Enter your email'
              onChange={onChange}
            />
            <input
              type='password'
              value={password}
              name='password'
              id='password'
              required
              placeholder='Enter password'
              onChange={onChange}
            />
            <input
              type='password'
              value={password2}
              name='password2'
              id='password2'
              required
              placeholder='Confirm password'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <button className='btn btn-block'>Submit</button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Register;
