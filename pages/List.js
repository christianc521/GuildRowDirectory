import styles from "pages/list.module.css"
import Accordion from "../components/Accordion";
import React, { useState } from "react";
import { useSelector } from "react-redux";

export default function List({ memberList }) {
    const input = useSelector((state) => state.searchInput.value)
    return (
        <div>
          <ul>
            {memberList.map(function(member){
                let memberInfoHTML = "<ul><li>" + member[2] + "</li> <li>e-mail: " + member[3] + "</li><li>Job Title: " + member[4] + "</li><li>Occupation: " + member[5] + "</li></ul>" 
                if (member[1].toLowerCase().includes(input.toLowerCase())) {
                  return (
                    <div style={styles}>
                      <Accordion title={member[1]} content= {memberInfoHTML}/>
                    </div>
                  )
                }
              })}
          </ul>
        </div>
        
    )
}