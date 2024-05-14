import { Helmet } from 'react-helmet-async'

export function AppLayout() {
    return (
        <>
            <Helmet title='Dashboard' />
            <h1>Dashboard</h1>
        </>
    )
}