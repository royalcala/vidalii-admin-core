import { Route } from "components/routes/Routes.many.rcontext";
import AccountIcon from 'template-icons/AccountCircle';

const route: Route = {
    name: 'Users',
    path: 'system/users',//  system/sub/hola
    sidebar: true,
    Icon: <AccountIcon />,
    Component: <Users />
}
export default route

export function Users() {
    return (
        <div>My Users App</div>
    )
}


