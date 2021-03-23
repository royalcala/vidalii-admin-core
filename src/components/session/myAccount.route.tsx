import { Route } from "components/routes/Routes.many.rcontext";
import AccountIcon from 'template-icons/AccountCircleTwoTone';
import { useRouteMatch } from "react-router-dom";
const route: Route = {
    name: 'MyAccount',
    parent: 'System',
    sidebar: true,
    Icon: AccountIcon,
    Component: MyAccount
}
export default route

function MyAccount() {
    return (
        <div>My Account App</div>
    )
}


