import React from "react";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  TwitterIcon,
  FacebookIcon,
  WhatsappIcon
} from "react-share";

const Share = props => {
  return (
    <div className="share-buttons">
      <FacebookShareButton url={window.location.href}>
        <FacebookIcon />
      </FacebookShareButton>
      <TwitterShareButton url={window.location.href}>
        <TwitterIcon />
      </TwitterShareButton>
      <WhatsappShareButton url={window.location.href}>
        <WhatsappIcon />
      </WhatsappShareButton>
    </div>
  );
};

export default Share;
