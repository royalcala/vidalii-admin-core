import React from "react"
import AccountIcon from 'template-icons/AccountCircle';
import { TemplateContext } from '../admin/Admin.TopBar.Menu.many.rcontext'
import IconButton from 'template-core/IconButton';
import Badge from 'template-core/Badge';
import MenuItem from "template-core/MenuItem";
import Menu from 'template-core/Menu';
import { Session } from "./User.Session";

function SessionMenu() {
    const { closeSession } = React.useContext(Session)
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <IconButton aria-label="My Account" onClick={handleClick} color="inherit">
                <AccountIcon />
            </IconButton>
            <Menu
                id="myaccount-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={() => {
                    closeSession()
                }}>Logout</MenuItem>
            </Menu>
        </div>
    );
}

export default TemplateContext({
    desktopShown: <SessionMenu />,
    desktopHidden: (closeMenu) => <MenuItem onClick={closeMenu}>Title User</MenuItem>,
    mobil:
        <MenuItem>
            <IconButton aria-label="My Account" color="inherit">
                <Badge badgeContent={4} color="secondary">
                    <AccountIcon />
                </Badge>
            </IconButton>
            <p>My Account</p>
        </MenuItem>,


})
// export default TemplateContext({
//     title: 'User',
//     ariaLabel: 'this can be better a Component',
//     componentIcon: <AccountIcon />
// })