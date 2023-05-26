import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import ResponsiveAppBar from '../HomeScreen/Appbar';
import { loadLoggedInUserIfAny } from '../HomeScreen/utils';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { CheckCircleOutline, RadioButtonUnchecked } from '@mui/icons-material';
import { backendUrl } from '../urlResolver';
import { useNavigate } from 'react-router-dom';


const BioOptions = (props) => {
  const navigator = useNavigate();
  const [selectedOption, setSelectedOption] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  const userData = loadLoggedInUserIfAny();

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleAgeSelect = (event) => {
    setAge(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const data = {
        autobioid: props.autobioid,
        email: userData.email,
        expected_length: selectedOption,
        age: age,
        name: name
      };
  
      const response = await fetch(backendUrl+'/setAutoBioDetails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
  
      if (response.ok) {
        const result = await response.json();
        console.log('API response:', result);
        navigator('/mainEditor', { state: { autobioid: props.autobioid }});
        // Perform any additional actions here
      } else {
        console.error('API request failed:', response.status);
        // Handle error case
      }
    } catch (error) {
      console.error('An error occurred:', error);
      // Handle error case
    }
  };

  return (
    <div>
      <ResponsiveAppBar userData={userData} />
      <div style={{ marginTop: '40px' }}>
        <Card
          sx={{
            textAlign: 'center',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)', // Strong shadow
            border: '1px solid rgba(0, 0, 0, 0.1)', // Light border
            backgroundColor: '#F5F5F5', // Off-white color
            maxWidth: 600, // Increased width
            margin: '0 auto', // Center align
          }}
        >
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Choose Expected Length:
            </Typography>
            <IconButton
              onClick={() => handleOptionSelect('Small')}
              color={selectedOption === 'Small' ? 'primary' : 'default'}
            >
              {selectedOption === 'Small' ? (
                <CheckCircleOutline fontSize="large" />
              ) : (
                <RadioButtonUnchecked fontSize="large" />
              )}
              <Typography variant="subtitle1">Small</Typography>
            </IconButton>
            <IconButton
              onClick={() => handleOptionSelect('Medium')}
              color={selectedOption === 'Medium' ? 'primary' : 'default'}
            >
              {selectedOption === 'Medium' ? (
                <CheckCircleOutline fontSize="large" />
              ) : (
                <RadioButtonUnchecked fontSize="large" />
              )}
              <Typography variant="subtitle1">Medium</Typography>
            </IconButton>
            <IconButton
              onClick={() => handleOptionSelect('Large')}
              color={selectedOption === 'Large' ? 'primary' : 'default'}
            >
              {selectedOption === 'Large' ? (
                <CheckCircleOutline fontSize="large" />
              ) : (
                <RadioButtonUnchecked fontSize="large" />
              )}
              <Typography variant="subtitle1">Large</Typography>
            </IconButton>
            <IconButton
              onClick={() => handleOptionSelect('Comprehensive')}
              color={selectedOption === 'Comprehensive' ? 'primary' : 'default'}
            >
              {selectedOption === 'Comprehensive' ? (
                <CheckCircleOutline fontSize="large" />
              ) : (
                <RadioButtonUnchecked fontSize="large" />
              )}
              <Typography variant="subtitle1">Comprehensive</Typography>
            </IconButton>
            <Typography variant="h5" gutterBottom>
              Enter Your Name:
            </Typography>
            <input
              type="text"
              value={name}
              onChange={handleNameChange}
              placeholder="Your name"
              style={{ width: '100%', marginBottom: '20px', padding: '10px' }}
            />
            
            <Typography variant="h5" gutterBottom>
              Choose Your Age:
            </Typography>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <label style={{ display: 'flex', alignItems: 'center', marginRight: '20px' }}>
                <input
                  type="radio"
                  value="18-25"
                  checked={age === '18-25'}
                  onChange={handleAgeSelect}
                  style={{ marginRight: '5px' }}
                />
                <span style={{ fontWeight: age === '18-25' ? 'bold' : 'normal' }}><Typography variant="subtitle1">18-25</Typography></span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', marginRight: '20px' }}>
                <input
                  type="radio"
                  value="26-35"
                  checked={age === '26-35'}
                  onChange={handleAgeSelect}
                  style={{ marginRight: '5px' }}
                />
                <span style={{ fontWeight: age === '26-35' ? 'bold' : 'normal' }}><Typography variant="subtitle1">26-45</Typography></span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', marginRight: '20px' }}>
                <input
                  type="radio"
                  value="36-45"
                  checked={age === '36-45'}
                  onChange={handleAgeSelect}
                  style={{ marginRight: '5px' }}
                />
                <span style={{ fontWeight: age === '36-45' ? 'bold' : 'normal' }}><Typography variant="subtitle1">36-45</Typography></span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', marginRight: '20px' }}>
                <input
                  type="radio"
                  value="46+"
                  checked={age === '46+'}
                  onChange={handleAgeSelect}
                  style={{ marginRight: '5px' }}
                />
                <span style={{ fontWeight: age === '46+' ? 'bold' : 'normal' }}><Typography variant="subtitle1">46+</Typography></span>
              </label>
            </div>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={!selectedOption || !name || !age}
              onClick={handleFormSubmit}
              style={{ marginTop: '20px' }}
            >
              Get Started
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BioOptions;
