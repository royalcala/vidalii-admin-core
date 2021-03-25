import React from 'react';
import { makeStyles, createStyles, Theme, } from 'template-core/styles';
import Drawer from 'template-core/Drawer';
import List from 'template-core/List';
import Divider from 'template-core/Divider';
import ListItem from 'template-core/ListItem';
import ListItemIcon from 'template-core/ListItemIcon';
import ListItemText from 'template-core/ListItemText';
import MenuIcon from 'template-icons/Menu';
import IconButton from 'template-core/IconButton';
import { Routes, Route } from '../routes/Routes.many.rcontext'
import Breadcrumbs from 'template-core/Breadcrumbs';
import Link from 'template-core/Link';
import Typography from 'template-core/Typography';
import ExpandMore from 'template-icons/ExpandMoreTwoTone';
import {
  useHistory
} from "react-router-dom";
const useStyles = makeStyles((theme: Theme) => createStyles({
  list: {
    width: 300,
  },
  fullList: {
    width: 'auto',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  breadcrumbs: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  titleSidebar: {
    textAlign: 'center'
  },
  nested: {
    paddingLeft: theme.spacing(4),
  }
}))


const Children = (value: Route, index: number, history: any, setStateDrawer: any) => {
  const to = (value?.parent || '') + '.' + value.name
  return (
    < ListItem button key={index} onClick={() => {
      setStateDrawer(false)
      history.push(to);
    }}>
      <ListItemIcon><value.Icon /></ListItemIcon>
      <ListItemText primary={value.name} />
    </ListItem>
  )
}
const GetParentChildren = (parent: string, history: any, setStateDrawer: any) => {
  return Routes.filter(value => value.parent === parent).map(
    (value, index) => Children(value, index, history, setStateDrawer)
  )
}
const GetRouteItems = (Routes: Route[], setStateItems: () => (a: Items) => void, history: any, setStateDrawer: any) => {
  const parentsPrinted: string[] = []
  return Routes.filter(value => value.sidebar === true)
    .sort(
      (a, b) => {
        if (a.name > b.name)
          return 1
        else if (a.name === b.name)
          return 0
        else
          return -1
      }
    ).map(
      (value, index) => {
        if (value.parent === null)
          return Children(value, index, history, setStateDrawer)
        else {
          //is Parent
          const found = parentsPrinted.find(printed => printed === value.parent)
          if (!found) {
            parentsPrinted.push(value.parent)
            return (
              < ListItem button key={index} onClick={
                () => {
                  setStateItems()({
                    breadcrum: `${value.parent}`,
                    items: GetParentChildren(value.parent as string, history, setStateDrawer)
                  })
                }
              }>
                <ListItemIcon><ExpandMore /></ListItemIcon>
                <ListItemText primary={value.parent} />
              </ListItem>
            )
          }
          else
            return null //is parent duplicated
        }
      }
    ).filter(n => n) //remove null
}

type Items = {
  breadcrum: string,
  items: JSX.Element[]
}
export default function SideBar() {
  let history = useHistory();
  const classes = useStyles();
  const [stateDrawer, setStateDrawer] = React.useState(false);

  //@ts-ignore
  const [stateItems, setStateItems] = React.useState<Items>({
    breadcrum: '',
    //@ts-ignore
    items: GetRouteItems(Routes, () => setStateItems, history, setStateDrawer)
  })
  const toggleDrawer = (
    event: any
  ) => {
    if (stateDrawer === false)
      setStateDrawer(true)
    else if (event.target.className === "MuiBackdrop-root")
      setStateDrawer(!stateDrawer)
  }


  return (
    <>
      <IconButton
        edge="start"
        className={classes.menuButton}
        color="inherit"
        aria-label="open drawer"
        onClick={toggleDrawer}
      >
        <Drawer anchor='left' open={stateDrawer}>
          <div
            role="presentation"
          >
            <h1 className={classes.titleSidebar}>Vidalii ERP</h1>
            <Breadcrumbs aria-label="breadcrumb" className={classes.breadcrumbs}>
              <Link color="inherit" href="#" onClick={
                () => {
                  setStateItems({
                    breadcrum: '',
                    items: GetRouteItems(Routes, () => setStateItems, history, setStateDrawer)
                  })
                }
              }>
                / Main
              </Link>
              {stateItems.breadcrum !== '' &&
                <Link color="inherit" href="#" >
                  <Typography color="textPrimary">{stateItems.breadcrum}</Typography>
                </Link>
              }


            </Breadcrumbs>
            <Divider />
            <List className={classes.list}>
              {stateItems.items}
            </List>
          </div >

        </Drawer>
        <MenuIcon />
      </IconButton>

    </>
  )
}
