import {
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signOut,
	User,
} from 'firebase/auth';
import { useRouter } from 'next/router';
import React, {
	createContext,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react';
import { FireAuth } from '../firebase';

interface IAuth {
	user: User | null;
	SignUp: (email: string, password: string) => Promise<void>;
	SignIn: (email: string, password: string) => Promise<void>;
	SignOut: () => Promise<void>;
	error?: string | null;
	loading: boolean;
}
const AuthContext = createContext<IAuth>({
	user: null,
	SignUp: async () => {},
	SignIn: async () => {},
	SignOut: async () => {},
	error: null,
	loading: false,
});

interface AuthProps {
	children: React.ReactNode;
}
export const AuthProvider = ({ children }: AuthProps) => {
	const [loading, setLoading] = useState<boolean>(false);
	const [user, setUser] = useState<User | null>(null);
	const [error, seterror] = useState(null);
	const [initialLoading, setInitialLoading] = useState(true);
	const router = useRouter();

	useEffect(() => {
		onAuthStateChanged(FireAuth, (user) => {
			if (user) {
				setUser(user);
				setLoading(false);
			} else {
				setUser(null);
				setLoading(true);
				router.push('/login');
			}
			setInitialLoading(false);
		});
	}, [FireAuth]);

	// Sign Up
	const SignUp = async (email: string, password: string) => {
		setLoading(true);
		await createUserWithEmailAndPassword(FireAuth, email, password)
			.then((data) => {
				setUser(data.user);
				router.push('/');
			})
			.catch((error) => {
				alert(error?.message);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	// Sign In
	const SignIn = async (email: string, password: string) => {
		setLoading(true);
		await signInWithEmailAndPassword(FireAuth, email, password)
			.then((data) => {
				setUser(data.user);
				router.push('/');
			})
			.catch((error) => {
				error.message.includes('wrong-password')
					? alert('Invalid Credentials')
					: alert('Error. Please Try Again');
			})
			.finally(() => setLoading(false));
	};

	// SignOut
	const SignOut = async () => {
		setLoading(true);

		await signOut(FireAuth)
			.then(() => {
				setUser(null);
			})
			.catch((error) => alert(error?.message))
			.finally(() => setLoading(false));
	};

	const memoValue = useMemo(
		() => ({ loading, user, SignUp, SignIn, SignOut, error }),
		[user, loading, error]
	);

	return (
		<AuthContext.Provider value={memoValue}>
			{!initialLoading && children}
		</AuthContext.Provider>
	);
};

export default function useAuth() {
	return useContext(AuthContext);
}
