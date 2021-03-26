import React from 'react'
import AccountIcon from 'template-icons/AccountCircleTwoTone';
import { Route } from 'components/routes/Routes.many.rcontext';
import { Tab } from "../admin/Admin.Doc.Tabs";
import { Doc } from "../admin/Admin.Doc_";

const getTabs = require.context(
    'components',
    true,
    /myAccount\.route\.tab\..+\.(tsx|js)$/
)

const Tabs = getTabs.keys().map(dir => {
    return getTabs(dir).default as Tab
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
    return <Doc
        breadcrum={route}
        tabs={Tabs}
    />
}

