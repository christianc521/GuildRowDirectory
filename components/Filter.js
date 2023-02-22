import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import styles from './filter.module.css';
import { updateFilter } from './FilterSlice'
import { useSelector, useDispatch } from 'react-redux'
import { brotliDecompress } from 'zlib';

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
  const [personName, setPersonName] = React.useState([]);
  const filterInput = useSelector((state) => state.filterInput.value)
  const dispatch = useDispatch()

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
    console.log("filter output: ", event.target.value)
    dispatch(updateFilter(event.target.value))
  };

  return (
    <div className={styles.filter}>
      <h1 className={styles.filterHeading}>Members want to share their expertise! <br></br> Filter by a skill you want to learn:</h1>
      <FormControl sx={{ m: 1, width: 300, mt: 3 }}>
        <Select
          displayEmpty
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput />}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em>I want to learn...</em>;
            }

            return selected.join(', ');
          }}
          MenuProps={MenuProps}
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem disabled value="">
            <em>Scroll through list</em>
          </MenuItem>
          {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, personName, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}