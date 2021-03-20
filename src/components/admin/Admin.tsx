import React, { useContext } from 'react';
import { makeStyles, Theme, createStyles } from 'template-core/styles';
import TopBar from './Admin.TopBar'
import Drawer from './Admin.Drawer'
export const useStyles = makeStyles(
  (theme: Theme) =>
    createStyles({
      grow: {
        flexGrow: 1,
      }
    })
)

export default function Admin() {
  const classes = useStyles()

  return (
    <div className={classes.grow}>
      <TopBar />
      <Drawer />
    </div>
  );
}

