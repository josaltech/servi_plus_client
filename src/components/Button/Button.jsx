const Button = ({ children, text, ...otherProps }) => (
  <button type="button" className="btn btn-dark btn-lg" {...otherProps}>
    {text}
  </button>
);

export default Button;
