import React from 'react'
import "./header.css"
import headerImage from "../../assets/header.jpg"
export default function Header() {
  return (
    <div className="header">
      <div className="headerTitles">
        <span className="headerTitleSm">Success Stories</span>

      </div>
      <img
        className="headerImg"
        src={headerImage}
        alt=""
      />
    </div>
  )
}
