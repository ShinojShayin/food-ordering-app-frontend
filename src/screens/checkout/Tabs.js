import React from 'react';  
import PropTypes from 'prop-types';  
import AppBar from '@material-ui/core/AppBar';  
import Tabs from '@material-ui/core/Tabs';  
import Tab from '@material-ui/core/Tab';  
import Typography from '@material-ui/core/Typography';  
import Box from '@material-ui/core/Box';  

function TabPanel(props) {  
  const { children, value, index, ...other } = props;  
  
  return (  
    <Typography  
      component="div"  
      role="tabpanel"  
      hidden={value !== index}  
      id={`simple-tabpanel-${index}`}  
      aria-labelledby={`simple-tab-${index}`}  
      {...other}  
    >  
      {value === index && <Box p={3}>{children}</Box>}  
    </Typography>  
  );  
}  
  
TabPanel.propTypes = {  
  children: PropTypes.node,  
  index: PropTypes.any.isRequired,  
  value: PropTypes.any.isRequired,  
};  
function testProps(index) {  
  return {  
    id: `simple-tab-${index}`,  
    'aria-controls': `simple-tabpanel-${index}`,  
  };  
}  
export default function TabsDemo() {  
  const [value, setValue] = React.useState(0);  
  
  const handleChange = (event, newValue) => {  
    setValue(newValue);  
  };  
  
  return (  
    <div>  
      <AppBar position="static">  
        <Tabs value={value} onChange={handleChange}>  
          <Tab label="Existing Address" {...testProps(0)} />  
          <Tab label="New Address" {...testProps(1)} />  
          {/* <Tab label="Contact" {...testProps(2)} />   */}
        </Tabs>  
      </AppBar>  
      <TabPanel value={value} index={0}>  
        Home  
      </TabPanel>  
      <TabPanel value={value} index={1}>  
        About   
      </TabPanel>  
    </div>  
  );  
}  