import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import '@coreui/coreui/dist/css/coreui.min.css'
import AuthContextProvider from '@/app/context/AuthContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: '한국투자 커스텀 트레이딩 앱',
	description: 'app for stock trading',
}

export default function RootLayout({
									   children,
								   }: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ko">
		<body className={inter.className}>
		<AuthContextProvider>
			{children}
		</AuthContextProvider>
		</body>
		</html>
	)
}

