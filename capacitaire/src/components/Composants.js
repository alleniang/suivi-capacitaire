import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Plateau  from './Plateau';
import CapacitairePlateau  from './CapacitairePlateau';
import BusinessUnit from './BusinessUnit';
import Programme from './Programme';
import Operation from './Operation';


export const Composants = () => {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="Capacitaire" value="1" />
                        <Tab label="Plateau" value="2" />
                        <Tab label="Opération" value="3" />
                        <Tab label="Programme" value="4" />
                        <Tab label="Business Unit" value="5" />
                    </TabList>
                </Box>
                <TabPanel value="1"><CapacitairePlateau/></TabPanel>
                <TabPanel value="2"><Plateau/></TabPanel>
                <TabPanel value="3"><Operation/></TabPanel>
                <TabPanel value="4"><Programme/></TabPanel>
                <TabPanel value="5"><BusinessUnit/></TabPanel>
            </TabContext>
        </Box>
    );
}
