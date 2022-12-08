import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import LoadingWheel from "../components/LoadingWheel";
import Utilities from "../Utilities";

export default function Learning() {
  const { id } = useParams();
  const [pageData, setPageData] = useState()

  useEffect(() => {
    fetch(Utilities.urls.getLearning(id), {credentials: 'include'})
    .then(res => res.json())
    .then(body => setPageData(body.learning))
  }, [])
  console.log(pageData)
  if (pageData === undefined) return (<LoadingWheel />)

  return (
    <React.Fragment>
      <Typography variant="h4">{pageData.name}</Typography>
      
    </React.Fragment>
  )
}