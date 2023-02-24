import { useSelector, useDispatch } from 'react-redux'
import { updateMember } from '../components/MemberSlice'

const {GoogleAuth} = require('google-auth-library');
const {google} = require('googleapis');

export async function getStaticProps() {
    
    const memberInput = useSelector((state) => state.memberInput.value)
    const dispatch = useDispatch()

    const auth = new GoogleAuth({
        scopes: 'https://www.googleapis.com/auth/spreadsheets',
      });
    const sheets = google.sheets({ version: 'v4', auth});
    const range = 'FormResponses1!A2:L300';

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SHEET_ID,
      range,
    });

    const numRows = response.data.values ? response.data.values.length : 0;
    console.log(`${numRows} rows retrieved.`);
    
    const memberList = []; //storing all members in a single array
    let memberInfo = {
      timestamp: "",
      fullName: "",
      pronouns: "",
      email: "",
      jobTitle: "",
      occupation: "",
      otherOccupation: "",
      interests: "",
      otherInterests: "",
      skills: "",
      otherSkills: "",
      consent: ""
    }

    const [timestamp, fullName] = response.data.values[numRows - 1];
    for (let i = 0; i < numRows; i++) {
     
      memberInfo = response.data.values[i];

      if (memberInfo[11] == "No") {
        continue;
      }

      if (memberInfo[6] != "") {
        memberInfo[5] = memberInfo[6];
      }
      memberList.push(memberInfo);
    }

    dispatch(updateInput(memberList))
}