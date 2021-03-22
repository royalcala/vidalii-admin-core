import React from 'react';
import { fade, makeStyles, Theme, createStyles } from 'template-core/styles';
import AppBar from 'template-core/AppBar';
import Toolbar from 'template-core/Toolbar';
import IconButton from 'template-core/IconButton';
import Typography from 'template-core/Typography';
import InputBase from 'template-core/InputBase';
import SearchIcon from 'template-icons/Search';
import MoreIcon from 'template-icons/MoreVert';
import Menu from 'template-core/Menu';
import LeftDrawer from "./Admin.TopBar.Sidebar";
//Components array of Menu right
import { ListComponents as ListMenu } from './Admin.TopBar.Menu.many.rcontext'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        grow: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            display: 'none',
            [theme.breakpoints.up('sm')]: {
                display: 'block',
            },
        },
        search: {
            position: 'relative',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: fade(theme.palette.common.white, 0.15),
            '&:hover': {
                backgroundColor: fade(theme.palette.common.white, 0.25),
            },
            marginRight: theme.spacing(2),
            marginLeft: 0,
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                marginLeft: theme.spacing(3),
                width: 'auto',
            },
        },
        searchIcon: {
            padding: theme.spacing(0, 2),
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        inputRoot: {
            color: 'inherit',
        },
        inputInput: {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('md')]: {
                width: '20ch',
            },
        },
        sectionDesktop: {
            display: 'none',
            [theme.breakpoints.up('md')]: {
                display: 'flex',
            },
        },
        sectionMobile: {
            display: 'flex',
            [theme.breakpoints.up('md')]: {
                display: 'none',
            },
        },
    }),
);

export default function TopBar() {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const isMenuOpen = Boolean(anchorEl);
    const desktopMenuId = 'primary-search-account-menu';
    const mobileMenuId = 'primary-search-account-menu-mobile';

    const closeMobilMenu = () => {
        setMobileMoreAnchorEl(null);
    };
    const closeDesktopMenu = () => {
        setAnchorEl(null);
        closeMobilMenu();
    };

    const openDesktopMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    }
    const openMobilMenu = (event: React.MouseEvent<HTMLElement>) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };
    // console.log('ComponentsDynamic:', ComponentsDynamic)
    const renderDesktopMenuShown =
        //list.menu.slice(0, 3)
        // menuItems.slice(0, 3)
        ListMenu.slice(0, 3)
            .map(
                (Component, index) => {
                    return <Component display='shown' screen='desktop' closeMenu={closeDesktopMenu} key={index} />
                }
            )

    const renderDesktopMenuHidden = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={desktopMenuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={closeDesktopMenu}
        >
            {
                ListMenu.slice(3).map(
                    (Component,index) => {
                        return <Component display='hidden' screen='desktop' closeMenu={closeDesktopMenu} key={index} />
                    }
                )
            }
        </Menu>
    )

    const renderMobilMenuHidden = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMobileMenuOpen}
            onClose={closeMobilMenu}
        >
            {ListMenu.map(
                (Component,index) => <Component display='hidden' screen='mobil' closeMenu={closeMobilMenu} key={index} />
            )}
        </Menu>
    );

    // const [state, setState] = React.useState(false)
    return (
        <div className={classes.grow}>
            <AppBar position="static">
                <Toolbar variant="dense">
                    {/* <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="open drawer"
                    >
                        <MenuIcon />
                    </IconButton> */}
                    <LeftDrawer />
                    <Typography className={classes.title} variant="h6" noWrap>
                        Vidalii ERP
          </Typography>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </div>
                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                        {renderDesktopMenuShown}
                        <IconButton
                            aria-label="show more"
                            aria-controls={desktopMenuId}
                            aria-haspopup="true"
                            onClick={openDesktopMenu}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </div>
                    <div className={classes.sectionMobile}>
                        <IconButton
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={openMobilMenu}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            {renderDesktopMenuHidden}
            {renderMobilMenuHidden}
        </div>
    );
}
