import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
const PrivateRoute = ({ me, children }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (me === null) {
      navigate('/login');
    }
  }, [me]);

  return me !== null && children;
};

PrivateRoute.propTypes = {
  me: PropTypes.object,
  children: PropTypes.node.isRequired,
};
export default PrivateRoute;
