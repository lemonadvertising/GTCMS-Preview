import React, { useState, useEffect } from 'react';
import PreviewIframe from "../components/PreviewIframe";

export default function PreviewPage({location}) {

const queryParams = new URLSearchParams(location.search);
const postUrl = queryParams.get("wpslug");
const mainUrl = location.origin;
const previewUrl = mainUrl+"/"+postUrl+"/"

return (
     <div>
        <PreviewIframe url={previewUrl}/>
     </div>
   );
}
