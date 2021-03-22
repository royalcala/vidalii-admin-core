import React from 'react';
import { makeStyles, createStyles, Theme } from 'template-core/styles';
import Drawer from 'template-core/Drawer';
import List from 'template-core/List';
import Divider from 'template-core/Divider';
import ListItem from 'template-core/ListItem';
import ListItemIcon from 'template-core/ListItemIcon';
import ListItemText from 'template-core/ListItemText';
import InboxIcon from 'template-icons/MoveToInbox';
import MailIcon from 'template-icons/Mail';
import MenuIcon from 'template-icons/Menu';
import IconButton from 'template-core/IconButton';
import { Routes } from '../routes/Routes.many.rcontext'

const useStyles = makeStyles((theme: Theme) => createStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}))


export default function SideBar() {
  const classes = useStyles();
  const [state, setState] = React.useState(false);

  const toggleDrawer = (
    event: React.KeyboardEvent | React.MouseEvent,
  ) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setState(!state)
  };

  const list = () => (
    <div
    // className={clsx(classes.list, {
    //   [classes.fullList]: anchor === 'top' || anchor === 'bottom',
    // })}
    // role="presentation"
    // onClick={toggleDrawer(anchor, false)}
    // onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {Routes.map(({name,Icon}, index) => (
          <ListItem button key={name}>
            <ListItemIcon>{Icon}</ListItemIcon>
            <ListItemText primary={name} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <IconButton
      edge="start"
      className={classes.menuButton}
      color="inherit"
      aria-label="open drawer"
      onClick={toggleDrawer}
    >
      <MenuIcon />
      <Drawer anchor='left' open={state} >
        {list()}
      </Drawer>
    </IconButton>
  );
}
