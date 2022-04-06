import { FaSignInAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";

function Login() {
  // Initialize Form Data state
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Form data destructuring
  const { email, password } = formData;

  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );

  // useEfeect hook
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

    const userData = {
      email,
      password,
    };
    dispatch(login(userData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className='heading'>
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Please login to get support</p>
      </section>
      <section className='form'>
        <form method='post' onSubmit={onSubmit}>
          <div className='form-group'>
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
          </div>
          <div className='form-group'>
            <button className='btn btn-block'>Submit</button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Login;
