import React, { createContext, useContext, useEffect, useState } from 'react';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signInWithPopup,
	GoogleAuthProvider,
} from 'firebase/auth';
import { auth } from '../firebase/firebase.config';

const AuthContext = createContext();

const provider = new GoogleAuthProvider();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
	return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	const registerUser = async (email, password) => {
		return await createUserWithEmailAndPassword(auth, email, password);
	};

	const loginUser = async (email, password) => {
		return await signInWithEmailAndPassword(auth, email, password);
	};

	const signInWithGoogle = async () => {
		await signInWithPopup(auth, provider);
	};

	const logout = async () => {
		return await auth.signOut();
	};

	// Manage user state

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			setCurrentUser(user);
			setIsLoading(false);

			if (user) {
				const { email, displayName, photoURL } = user;

				const _userData = {
					email,
					username: displayName,
					photo: photoURL,
				};
			}
		});

		return () => unsubscribe();
	});

	return (
		<AuthContext.Provider
			value={{
				currentUser,
				registerUser,
				loginUser,
				signInWithGoogle,
				logout,
				isLoading,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
