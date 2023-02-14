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
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid "#282828"`,
  backgroundColor: "transparent",
  marginTop: '8px',
  borderRadius: '10px',
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' , color: 'white'}} />}
    {...props}
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
    return (
        <div>
          <ul className={styles.ul}>
            {memberList.map(function(member){
                let memberInfoHTML = "<ul><li>" + member[2] + "</li> <li>e-mail: " + member[3] + "</li><li>Job Title: " + member[4] + "</li><li>Occupation: " + member[5] + "</li></ul>" 
                if (member[1].toLowerCase().includes(input.toLowerCase())) {
                  return (
                      <Accordion>
                        <AccordionSummary>
                        <Typography sx={{ color: '#EFEFEF',width: '33%', flexShrink: 0 }}>
                          {member[1]}
                        </Typography>
                          <Typography sx={{ color: '#7C7C7C' }}>{member[4]}</Typography>
                        </AccordionSummary>
                        <AccordionDetails className={styles.accordionDetails}>
                          <ul className={styles.ul}>
                            <li>
                              {member[2]}
                            </li>
                            <li>
                              e-mail: {member[3]}
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