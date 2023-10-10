// import React, { useState, useEffect } from 'react';
// import PreviewIframe from "../components/PreviewIframe";

// export default function PreviewPage({location}) {

// const queryParams = new URLSearchParams(location.search);
// const postUrl = queryParams.get("wpslug");
// const mainUrl = location.origin;
// const previewUrl = mainUrl+"/"+postUrl+"/"

// return (
//      <div>
//         <PreviewIframe url={previewUrl}/>
//      </div>
//    );
// }

import React, { useState, useEffect } from 'react';
import PreviewIframe from "../components/PreviewIframe";
import axios from 'axios';

export default function PreviewPage({location}) {

const queryParams = new URLSearchParams(location.search);
const postUrl = queryParams.get("wpslug");
const mainUrl = location.origin;
const previewUrl = mainUrl+"/"+postUrl+"/"
  const [webhookData, setWebhookData] = useState(null);
  const [webHookSuccess, setWebHookSuccess] = useState("loading");
//   const [webHookSuccess, setWebHookSuccess] = useState(false);

  useEffect(() => {
    // Replace this URL with the actual webhook endpoint you want to receive data from
    const webhookEndpoint = 'https://4575-83-110-141-125.ngrok-free.app/__refresh';

    // You can use Axios or any other HTTP library to make a POST request to the webhook endpoint
    axios
      .post(webhookEndpoint)
      .then((response) => {
        // Handle the webhook data here
        console.log('Webhook Data:', response.data);

        // Update the webhook data in the component's state
        setWebhookData(response.data);
        setWebHookSuccess("success");
      })
      .catch((error) => {
        // Handle errors here
        console.error('Webhook Error:', error);
        setWebHookSuccess("error");
      });
  }, []); // Empty dependency array: Effect runs once after component mounts

  return (
    <div>
       <PreviewIframe webHookStatus={webHookSuccess}  error={false} url={webHookSuccess?previewUrl:""}/>            
    </div>
  );
}

