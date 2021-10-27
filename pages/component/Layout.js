import DashHeader from './DashHeader'
import Head from 'next/head'

export default function Layout({ children }) {

    return (
        <>
            <Head>
                <title>Performance Management</title>
                <link rel="icon" href="/image/favicon.ico" />
            </Head>
            <div className=' w-screen'>
                <DashHeader />
                {children}
            </div>
        </>

    )
}