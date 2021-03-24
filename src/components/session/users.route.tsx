import { Route } from "components/routes/Routes.many.rcontext";
import AccountIcon from 'template-icons/AccountCircle';
const route: Route = {
    name: 'Users',
    parent: 'System',
    sidebar: true,
    Icon: AccountIcon,
    Component: Users
}
export default route

function Users() {    
    return (
        <div>My Users App</div>
    )
}


