import { NextPage } from 'next';
import React from 'react';
import { SignUpLoginForm } from '../components/SignUpLoginForm';

const SignUp: NextPage = () => {
	return <SignUpLoginForm formPurpose="signUp" />;
};
export default SignUp;
