import React from 'react';
import { makeStyles, Theme } from 'template-core/styles';
import AppBar from 'template-core/AppBar';
import Tabs from 'template-core/Tabs';
import Tab from 'template-core/Tab';
import Typography from 'template-core/Typography';
import Box from 'template-core/Box';
import type { Props as PropsHeader } from "./Admin.Doc.Header";


interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: any) {
    return {
        id: `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
}));
export type PropsTab = {
    mutation: PropsHeader['gql']['mutation']
}
export type Tab = {
    title: string,
    Component: Function
}


export default function DocTabs(props: { tabs: Tab[], mutation: PropsTab['mutation'] }) {
    const classes = useStyles();
    const [activeTab, setActiveTab] = React.useState(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setActiveTab(newValue);
    };

    const TabsLabel = props.tabs.sort(
        (a, b) => {
            if (a.title > b.title)
                return 1
            else if (a.title === b.title)
                return 0
            else
                return -1
        }
    ).map(
        (tab, index) => {
            return (
                <Tab label={tab.title} {...a11yProps(index)} />
            )
        }
    )
    const TabsContent = props.tabs.map(
        (tab, index) => {
            return (
                <TabPanel value={activeTab} index={index}>
                    <tab.Component mutation={props.mutation} />
                </TabPanel>
            )
        }
    )


    return (
        <div className={classes.root}>
            <AppBar position="static" color="default">
                <Tabs
                    value={activeTab}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs example"
                >
                    {TabsLabel}
                </Tabs>
            </AppBar>
            {TabsContent}
        </div>
    );
}
