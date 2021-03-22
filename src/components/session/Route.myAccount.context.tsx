import { Route } from "components/routes/Routes.many.rcontext";
import AccountIcon from 'template-icons/AccountCircleTwoTone';

const route: Route = {
    name: 'My Account',
    path: 'user',
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


