import React from 'react';
import { makeStyles, createStyles, Theme } from 'template-core/styles';
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


const searchRoutes = (startsWith: string) => {
  return Routes.filter(route => route.path.startsWith(startsWith))
}

const GetChildrenOrParent = (Routes:Route[]) => {
  return Routes.filter(value => value.sidebar === true)
  .map(
    value => {
      // if(value.path.split())
    }
  )


}

const getLevelsWithoutChildren = (Routes: Route[]) => {
  return Routes.filter(value => value.sidebar === true && value.path.split('/').length === 1).map(
    (value) => (
      < ListItem button key={value.name} >
        <ListItemIcon>{value.Icon}</ListItemIcon>
        <ListItemText primary={value.name} />
      </ListItem>
    )
  )
}
const getLevelsWithChildren = (Routes: Route[], setStateMenu: any) => {
  return Routes.filter(value => value.sidebar === true && value.path.split('/').length > 1).map(
    (value) => (
      < ListItem button key={value.path.split('/')[0]} onClick={() => {
        const nextRoutes = Routes.map(value => {
          const paths = value.path.split('/')
          delete paths[0]

          return ({
            ...value,
            path: paths.join('/')
          })
        })
        setStateMenu()({
          breadcrum: '/' + value.path.split('/')[0],
          levelsWithoutChildren: getLevelsWithoutChildren(nextRoutes),
          levelsWithChildren: getLevelsWithChildren(nextRoutes, setStateMenu)
        })

        //setNewList

      }}>
        <ListItemIcon><ExpandMore /></ListItemIcon>
        <ListItemText primary={value.path.split('/')[0]} />
      </ListItem>
    )
  )
}
export default function SideBar() {
  const classes = useStyles();
  const [stateDrawer, setStateDrawer] = React.useState(false);


  const [stateMenu, setStateMenu] = React.useState({
    breadcrum: '/',
    levelsWithoutChildren: getLevelsWithoutChildren(Routes),
    levelsWithChildren: getLevelsWithChildren(Routes, () => setStateMenu)
  })
  const toggleDrawer = (
    event: any
  ) => {
    if (stateDrawer === false)
      setStateDrawer(true)
    else if (event.target.className === "MuiBackdrop-root")
      setStateDrawer(!stateDrawer)
  }

  // const LevelsWithoutChildrensInitial = Routes.filter(value => value.sidebar === true && value.path.split('/').length === 1).map(
  //   (value) => (
  //     < ListItem button key={value.name} >
  //       <ListItemIcon>{value.Icon}</ListItemIcon>
  //       <ListItemText primary={value.name} />
  //     </ListItem>
  //   )
  // )

  // const LevelsWithChildrenInitial = Routes.filter(value => value.sidebar === true && value.path.split('/').length > 1).map(
  //   (value) => (
  //     < ListItem button key={value.path.split('/')[0]} onClick={() => {
  //       //update breadcrum with the next level
  //       // setStateMenu({
  //       //   breadcrum: '/' + value.path.split('/')[0],
  //       //   levels: []
  //       // })

  //       //setNewList

  //     }}>
  //       <ListItemIcon><ExpandMore /></ListItemIcon>
  //       <ListItemText primary={value.path.split('/')[0]} />
  //     </ListItem>
  //   )
  // )



  // return (<div
  //   role="presentation"
  // >
  //   <h1 className={classes.titleSidebar}>Vidalii ERP</h1>
  //   <Breadcrumbs aria-label="breadcrumb" className={classes.breadcrumbs}>
  //     <Link color="inherit" href="#" >
  //       {stateMenu.breadcrum}
  //     </Link>
  //     {/* <Link color="inherit" href="#" >
  //         Core
  // </Link>
  //       <Typography color="textPrimary">Breadcrumb</Typography> */}
  //   </Breadcrumbs>
  //   <Divider />
  //   <List className={classes.list}>
  //     {/* {LevelsWithoutChildrens}
  //     {LevelsWithChildren} */}
  //   </List>
  // </div >
  // )

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
              <Link color="inherit" href="#" >
                {stateMenu.breadcrum}
              </Link>
              {/* <Link color="inherit" href="#" >
            Core
    </Link>
          <Typography color="textPrimary">Breadcrumb</Typography> */}
            </Breadcrumbs>
            <Divider />
            <List className={classes.list}>
              {stateMenu.levelsWithChildren}
              {stateMenu.levelsWithoutChildren}
            </List>
          </div >

        </Drawer>
        <MenuIcon />
      </IconButton>

    </>
  )
}
