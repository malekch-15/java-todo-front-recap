import {Navigate, Outlet} from "react-router-dom";
type Props={
    user:string|undefined
}
export default function ProtectedRoute(props: Props) {

    if (props.user === undefined) {
        return <div>Loading...</div>
    }

    return (
        props.user ? <Outlet /> : <Navigate to = "/" />
    )
}