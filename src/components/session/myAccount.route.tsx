import AccountIcon from 'template-icons/AccountCircleTwoTone';
import DocHeader from "../admin/Admin.Doc.Header";
import DocTabs, { Tab } from "../admin/Admin.Doc.Tabs";
import DocFooter from "components/admin/Admin.Doc.Footer";
import { Route } from 'components/routes/Routes.many.rcontext';

const getContext = require.context(
    'components',
    true,
    /myAccount\.route\.tab\..+\.(tsx|js)$/
)

export const Tabs = getContext.keys().map(dir => {
    return getContext(dir).default as Tab
})

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
        <>
            <DocHeader breadcrum={{ name: route.name, parent: route.parent, Icon: route.Icon }} />
            <DocTabs tabs={Tabs} />
            <DocFooter />
        </>
    )
}


