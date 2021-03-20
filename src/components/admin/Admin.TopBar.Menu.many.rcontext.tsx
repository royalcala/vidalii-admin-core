import React from "react"
import MailIcon from 'template-icons/Mail';
import IconButton from 'template-core/IconButton';
import Badge from 'template-core/Badge';
import MenuItem from "template-core/MenuItem";

export type PropsComponentsCustom = {
    screen: 'desktop' | 'mobil',
    display: 'shown' | 'hidden',
    closeMenu: () => void,
}
const getContext = require.context(
    'components',
    true,
    /Admin\.TopBar\.Menu\..+\.context\.(tsx|js)$/
)
export const ListComponents = getContext.keys().map(dir => {
    //TODO ordered position here
    return getContext(dir).default as React.FunctionComponent<PropsComponentsCustom>
})
interface TopBarMenuProps {
    desktopShown: JSX.Element,
    desktopHidden: (close: () => void) => JSX.Element,
    mobil: JSX.Element
}

export function TemplateContext(
    props: TopBarMenuProps
    // { title, ariaLabel, componentIcon }: {
    //     title: string,
    //     ariaLabel: string,
    //     componentIcon: JSX.Element
    // }
) {
    return function ({ display, screen, closeMenu }: PropsComponentsCustom) {
        if (screen === 'desktop' && display === 'shown')
            return props.desktopShown
        // return (
        //     <IconButton aria-label={ariaLabel} color="inherit">
        //         <Badge badgeContent={4} color="secondary">
        //             {componentIcon}
        //         </Badge>
        //     </IconButton>
        // )
        if (screen === 'desktop' && display === 'hidden')
            return props.desktopHidden(closeMenu)
        // return <MenuItem onClick={closeMenu}>{title}</MenuItem>

        if (screen === 'mobil')
            return props.mobil
        // return (
        //     <MenuItem>
        //         <IconButton aria-label={ariaLabel} color="inherit">
        //             <Badge badgeContent={4} color="secondary">
        //                 {componentIcon}
        //             </Badge>
        //         </IconButton>
        //         <p>{title}</p>
        //     </MenuItem>
        // )
    }
}