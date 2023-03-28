import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import styles from './filter.module.css';
import { updateFilter } from './FilterSlice'
import { updateSecondFilter } from './FilterSlice';
import { updateInput } from './SearchSlice'
import { useSelector, useDispatch } from 'react-redux'

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const MyButton = ({ onClick }) => {
  const customButtonStyle = {
    backgroundColor: '#c4a57b',
    '&:hover': {
      backgroundColor: '#b3946e', // Adjust the color for the hover state if needed
    },
  };

  return (
    <Button variant="contained" sx={customButtonStyle} onClick={onClick}>
      Clear Filters
    </Button>
  );
};

const names = [
  'Graphic Design',
  'Visual Art',
  'Writing',
  'Community Organizing Skills',
  'Software Engineer/Developer',
  'Photography',
  'Cooking',
  'Bartending',
  'Barista Skills',
  'E-commerce Skills',
  'Marketing',
  'Accounting',
  'Music/Performance',
  'Law Advice',
  'Entrepreneur Advice',
  'Sales Skills/Advice',
  'Fashion Skills',
  'Sustainability Skills/Advice',
  'Theatre Advice/Performance',
  'Teach/Facilitate/Perform Movement/Yoga/Dance',
  'Coaching',
  'Woodworking Skills',
];

const interest = [
  'Food + Drink',
  'Woodworking',
  'Fiber Arts',
  'Painting',
  'Working with plants',
  'Music',
  'Language',
  'Reading/Writing',
  'Coding',
  'Graphic Design',
  'Sports',
  'Philanthropy',
  'Social/Racial Justice',
  'Movement/Yoga/Dance',
  'Games',
  'Fashion',
  'Leather Working',
  'Software Engineer/Developer',
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelectPlaceholder() {
  const theme = useTheme();
  const [personName1, setPersonName1] = React.useState([]);
  const [personName2, setPersonName2] = React.useState([]);

  
  const filterInput = useSelector((state) => state.filterInput.value)
  const searchInput = useSelector((state) => state.searchInput.value)
  const dispatch = useDispatch()

  const handleChange = (event) => {
    const { target: { value } } = event;
    setPersonName1(typeof value === 'string' ? value.split(',') : value);
    dispatch(updateInput(''))
    dispatch(updateFilter({ personName2: '' }));
    dispatch(updateFilter({ personName1: value }));
    setPersonName2([]);
  };
  
  const handleChange2 = (event) => {
    const { target: { value } } = event;
    setPersonName2(typeof value === 'string' ? value.split(',') : value);
    dispatch(updateInput(''))
    dispatch(updateFilter({ personName1: '' }));
    dispatch(updateFilter({ personName2: value }));
    setPersonName1([]);
  };
  

  return (
    <div className={styles.filter}>
      <div className={styles.dropdownContainer}>
        <div className={styles.dropdownWrapper}>
          <h1 className={styles.filterHeading}>i want to learn... </h1>
            <FormControl sx={{ m: 0, width: 300, mt: 0 }}>
              <Select
                displayEmpty
                value={personName1}
                onChange={handleChange}
                input={<OutlinedInput 
                  className={styles.dropdownBox}
                  classes={{ notchedOutline: styles.whiteInputLabel }}
                />}
                renderValue={(selected) => {
                  if (selected.length === 0) {
                    return <em >pick a skill!</em>;
                  }

                  return selected.join(', ');
                }}
                MenuProps={MenuProps}
                inputProps={{ 'aria-label': 'Without label' }}
              >
                <MenuItem disabled value="">
                  <em >Scroll through list</em>
                </MenuItem>
                {names.map((name) => (
                  <MenuItem
                    key={name}
                    value={name}
                    style={getStyles(name, personName1, theme)}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
      <div className={styles.dropdownWrapper}>
        <h1 className={styles.filterHeading}>i&apos;m interested in... </h1>
          <FormControl sx={{ m: 0, width: 300, mt: 0 }}>
            <Select
              displayEmpty
              value={personName2}
              onChange={handleChange2}
              input={<OutlinedInput 
                className={styles.dropdownBox}
                classes={{ notchedOutline: styles.whiteInputLabel }}
              />}
              renderValue={(selected) => {
                if (selected.length === 0) {
                  return <em >pick an interest!</em>;
                }

                return selected.join(', ');
              }}
              MenuProps={MenuProps}
              inputProps={{ 'aria-label': 'Without label' }}
            >
              <MenuItem disabled value="">
                <em >Scroll through list</em>
              </MenuItem>
              {interest.map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                  style={getStyles(name, personName2, theme)}
                >
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
      <MyButton variant="contained" color="#c4a57" onClick={() => {
            dispatch(updateFilter({ personName1: '' }));
            dispatch(updateFilter({ personName2: '' }));
            dispatch(updateInput(''));
        }} className={styles.clearFiltersButton} >
        Clear Filters
      </MyButton>
    
    </div>
  );
}