import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ToastMessage = () => {
  const showToast = () => {
    toast.success('This is a toast message!');
  };

  return (
    <div>
      <button onClick={showToast}>Show Toast Message</button>
      <ToastContainer />
    </div>
  );
};

export default ToastMessage;