// import React from "react";
import s from "./style.module.css"
import { YouTubeProps } from "./types"

export default function YouTube({ id, title }: YouTubeProps) {
  return (
    <div className={s.embedContainer}>
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${id}`}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  )
}
