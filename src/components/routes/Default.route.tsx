import { Route } from "components/routes/Routes.many.rcontext";
import AccountIcon from 'template-icons/AccountCircle';
const route: Route = {
    name: '/',
    parent: null,
    sidebar: false,
    Icon: AccountIcon,
    Component: Default
}
export default route

function Default() {
    return (
        <div>My Default Page</div>
    )
}


