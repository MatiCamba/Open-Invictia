import { Box } from "@mui/material";
import { AccordionOpen } from "../components/AccordionOpen";
import wod1 from "../assets/24-1.jpg";
import wod2 from "../assets/24-2.jpg";
import wod3 from "../assets/24-3.jpg";
import wod211 from '../assets/wod211.png';

import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../firebase/config";
import { useEffect, useState } from "react";

export const CfOpenPage = () => {
  const [value241, setValue241] = useState("");
  const [value242, setValue242] = useState("");
  const [value243, setValue243] = useState("");

  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      const docRef = doc(db, "usuarios", user.uid);
      getDoc(docRef).then((docSnap) => {
        if (docSnap.exists()) {
          setValue241(docSnap.data()["WOD 24.1"]);
          setValue242(docSnap.data()["WOD 24.2"]);
          setValue243(docSnap.data()["WOD 24.3"]);
        }
      });
    }
  }, [auth]);

  return (
    <Box sx={{paddingTop: '5rem', paddingLeft:'10%'}}>
      <AccordionOpen header="WOD 24.1" details={[wod1, wod211]} value={value241} setValue={setValue241}/>
      <AccordionOpen header="WOD 24.2" details={wod2} value={value242} setValue={setValue242}/>
      <AccordionOpen header="WOD 24.3" details={wod3} value={value243} setValue={setValue243}/>
    </Box>
  );
};
