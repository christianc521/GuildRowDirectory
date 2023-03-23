import styles from "pages/list.module.css"
// import Accordion from "../components/Accordion";
import React, { useState } from "react";
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
    return (
        <div className={styles.list}>
          <ul className={styles.ul}>
            {memberList.map(function(member, index){
                let memberInfoHTML = "<ul><li>" + member[2] + "</li> <li>e-mail: " + member[3] + "</li><li>Job Title: " + member[4] + "</li><li>Occupation: " + member[5] + "</li></ul>" 
                if ((member[1].toLowerCase().includes(input.toLowerCase())) && (member[9].toLowerCase().includes(filter.toLowerCase()))) {
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
                            <li>
                              {member[2]}
                            </li>
                            <li>
                              Occupation: {member[5]}
                            </li>
                            <li>
                              Interests: {member[7]}
                            </li>
                            <li>
                              Skills I want to share: {member[9]}
                            </li>
                            <li>
                              {member[3]}
                            </li>
                          </ul>
                        </AccordionDetails>
                      </Accordion>
                    
                  )
                }
              })}
          </ul>
        </div>
        
    )
}