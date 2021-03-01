import React from "react"
import MailIcon from 'template-icons/Mail';
//change to pointer admin
import { TemplateContext } from '../admin/Admin.TopBar.Menu.many.rcontext'

export default TemplateContext({
    title: 'User',
    ariaLabel: 'this can be better a Component',
    componentIcon: <MailIcon />
})