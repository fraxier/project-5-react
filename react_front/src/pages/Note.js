import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingWheel from "../components/LoadingWheel";
import Utilities from "../Utilities";

export default function Note() {
  const { id } = useParams()
  const [pageData, setPageData] = useState()
  const [pageError, setPageError] = useState()

  useEffect(() => {
    fetch(Utilities.railsUrls.getNote(id), {credentials: 'include'})
    .then(res => res.json())
    .then(body => {
      if ('errors' in body) {
        setPageError(body.errors)
      } else {
        setPageData(body)
      }
    })
  }, [])

  if (pageData === undefined) return <LoadingWheel />

  return (
    <Typography>{pageData.content}</Typography>
  )
}