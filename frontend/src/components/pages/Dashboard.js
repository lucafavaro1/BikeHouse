import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack  from '@mui/material/Stack';
import '../css/Dashboard.css'
import { Button, Divider, Toolbar } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { logout} from "../../features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};


function Dashboard() {

  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  return (
    <Box
      className="dashboard"
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', minHeight: '70vh'}}
    >
      <Stack sx = {{borderRight: 1, borderColor: 'divider',}}>
        <Typography
          variant="h6"
          sx={{
            m: 2,
            p:2,
            display: { xs: 'none', md: 'inline' },
            fontFamily: 'monospace',
            fontWeight: 700,
            color: '#2e6076',
            textDecoration: 'none',
            fontSize: 30,
            borderBottom: 3,
            borderColor: 'divider',
          }}
        >
          My Dashboard
        </Typography>
      <Tabs
        orientation="vertical"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
      >
        <Tab label="Account" />
        <Tab label="Payment Settings"/>
        <Tab label="Notifications" />
        <Tab label="Support" />

      </Tabs>
      <Toolbar sx = {{m:2, p:2, borderBottom: 3,  borderColor: 'divider',}}/>

      <Button
        variant='outlined'
        onClick={handleLogout}
        wid
        endIcon={<LogoutIcon sx = {{display: 'flex'}}/>}
        sx={{ m: 2, mx:'auto', p:2, width: 'fit-content', alignItems: 'flex-center', color: '#2e6076', display: 'flex', fontSize: 'small', borderColor: '#2e6076', ':hover': {color: '#2e6076'}  }}
        >
          Log Out
      </Button>
      </Stack>
      <Divider />
      <TabPanel value={value} index={0}>
        Item One
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
      <TabPanel value={value} index={3}>
        Item Four
      </TabPanel>
      <TabPanel value={value} index={4}>
        Item Five
      </TabPanel>
      <TabPanel value={value} index={5}>
        Item Six
      </TabPanel>
      <TabPanel value={value} index={6}>
        Item Seven
      </TabPanel>
    </Box>
  );
}

export default Dashboard;