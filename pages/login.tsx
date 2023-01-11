import { NextPage } from 'next';
import React from 'react';
import { SignUpLoginForm } from '../components/SignUpLoginForm';

const Login: NextPage = () => {
	return <SignUpLoginForm formPurpose="login" />;
};
export default Login;
