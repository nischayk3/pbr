import React from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";
import "./styles.scss";

const ErrorScreen = ({ img, title, content, buttonText, handleClick }) => {
  return (
    <div className="errorContainer">
      <div className="error-content">
        <img src={img} alt="UnAuthorised Error Screen" />
        {title && <h3>{title}</h3>}
        {content && <p>{content}</p>}
        {buttonText && (
          <Link to="/dashboard/workspace">
            <Button onClick={handleClick}>{buttonText}</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default ErrorScreen;
