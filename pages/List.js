import styles from "pages/list.module.css"
// import Accordion from "../components/Accordion";
import React, { useState, useEffect } from "react";
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { useSelector } from "react-redux";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} {...props} />
))(({ theme }) => ({
  border: `1px solid "#282828"`,
  backgroundColor: "transparent",
  marginTop: '8px',
  borderRadius: '0.6rem',
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    {...props}
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' , color: '#7C7C7C'}} />}
  />
))(({ theme }) => ({
  backgroundColor: "#282828",
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
    color: 'white',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
  backgroundColor: "#B8B8B8",
}));


export default function List({ memberList }) {
    const input = useSelector((state) => state.searchInput.value)
    const filter = useSelector((state) => state.filterInput.value)
    // const filteredMembers = memberList.filter((member) => {
    //   const nameMatch =
    //     input === 'initialkey12345' ||
    //     member[1].toLowerCase().includes(input.toLowerCase());
    //   const filterMatch =  (member[1].toLowerCase().includes(input.toLowerCase()) &&
    //                         member[9].toLowerCase().includes(filter.personName1.toLowerCase()) &&
    //                         member[7].toLowerCase().includes(filter.personName2.toLowerCase()));

    //   return nameMatch && filterMatch;
      
    // });

    return (
        <div className={styles.list}>
          <ul className={styles.ul}>
            {memberList && memberList.map(function (member, index) {
              const nameMatch = member[1].toLowerCase().includes(input.toLowerCase());
              const filterMatch = ((member[1].toLowerCase().includes(input.toLowerCase())) &&
                                  member[9].toLowerCase().includes(filter.personName1.toLowerCase()) &&
                                  member[7].toLowerCase().includes(filter.personName2.toLowerCase()));
  
              if (input === "initialkey12345") {
                if (filterMatch) {
                  return renderMember(member, index, styles);
                }
              }
              else if (nameMatch && filterMatch) {
                  return renderMember(member, index, styles);
              }
            })}
          </ul>
        </div>
    )
}

function renderMember(member, index, styles) {
  return (
    <Accordion key={index}>
                      <AccordionSummary>
                      <Typography sx={{ color: '#EFEFEF',width: '24%', flexShrink: 0, fontWeight: 'bold', paddingLeft: '10px' }}>
                        {member[1]}
                      </Typography>
                        <Typography sx={{ color: '#7C7C7C' }}>{member[4]}</Typography>
                      </AccordionSummary>
                      <AccordionDetails className={styles.accordionDetails}>
                        <ul className={styles.content}>
                          <li className={styles.pronouns}>
                            {member[2]}
                          </li>
                          <li className={styles.category}>
                            Interests
                          </li>
                          <li>
                            {member[7]}
                          </li>
                          <li className={styles.category}>
                            Skills
                          </li>
                          <li>
                            {member[9]}
                          </li>
                          <li className={styles.email}>
                            {member[3]}
                          </li>
                        </ul>
                      </AccordionDetails>
                    </Accordion> 
  )
}