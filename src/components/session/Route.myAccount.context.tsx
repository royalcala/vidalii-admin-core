import { Route } from "components/routes/Routes.many.rcontext";
import AccountIcon from 'template-icons/AccountCircle';

const route: Route = {
    name: 'My Account',
    nested: 'User',
    sidebar: true,
    Icon: <AccountIcon />,
    Component: <MyAccount />
}
export default route

export function MyAccount() {
    return (
        <div>My Account App</div>
    )
}


