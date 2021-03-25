import React from 'react';
import { makeStyles, createStyles, Theme } from 'template-core/styles';
import Paper from 'template-core/Paper';
import Grid from 'template-core/Grid';
import Box from 'template-core/Box';
import Breadcrumbs from 'template-core/Breadcrumbs';
import Link from 'template-core/Link';
import Typography from 'template-core/Typography';
import Button from 'template-core/Button';
import Workflow from "./Admin.Doc.Workflow";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(1),
            textAlign: 'left',
            color: theme.palette.text.secondary,
        },
        link: {
            display: 'flex',
        },
        icon: {
            marginRight: theme.spacing(0.5),
            width: 20,
            height: 20,
        },
        button: {
            marginRight: theme.spacing(0.5)
        }
    }),
);

export type Props = {
    breadcrum: {
        name: string,
        parent: null | string,
        Icon: Function
    },
    gql:{
        operationQuery:string,
        operationMutation:string,
        mutations:(()=>string)[],
        queries:(()=>string)[]
    }
}


export default function DocHeader({ breadcrum }: Props) {
    const classes = useStyles();

    const SaveDoc = () => {
        return (
            <>
                <Box m={1}>
                    <Breadcrumbs aria-label="breadcrumb">
                        {breadcrum?.parent !== null ?
                            <Link color="inherit" href="#" className={classes.link}>
                                {breadcrum.parent}
                            </Link>
                            : <Link color="inherit" href="#" className={classes.link}>
                                /
            </Link>
                        }
                        <Typography color="textPrimary" className={classes.link}>
                            <breadcrum.Icon className={classes.icon} />
                            {breadcrum.name}
                        </Typography>
                    </Breadcrumbs>
                </Box>
                < Box m={1} >
                    <Button variant="outlined" color="primary" className={classes.button}>
                        Save
                    </Button>
                    <Button color="secondary" className={classes.button}>
                        Discard
                    </Button>
                </Box >
            </>
        )
    }



    return (
        <div className={classes.root}>
            <Grid container >
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <Grid container >
                            <Grid item xs={2} >
                                <SaveDoc />
                            </Grid>
                            <Grid item xs={10}>
                                <Workflow />
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}
