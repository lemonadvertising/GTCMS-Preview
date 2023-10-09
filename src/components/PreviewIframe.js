import React, { useState, useEffect } from 'react';
import { Link } from "gatsby"
const IFrameComponent = ({ url }) => {
  const [isValidUrl, setIsValidUrl] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [reCheckUrl, setRecheckUrl] = useState(1);
  const [previewFailed, setPreviewFailed] = useState(false);
  useEffect(() => {
    const checkUrl = async () => {
      try {
        const response = await fetch(url, { method: 'HEAD' });
        // Check if status code is not 404 or other error status
        setIsValidUrl(response.ok);         
      } catch (error) {
        console.error('Failed to check URL:', error);
      } finally {
        setIsChecking(false);
      }
    };

    checkUrl();
        if(reCheckUrl < 2){
          if(isValidUrl === false){
           setTimeout( () =>{
            setRecheckUrl(reCheckUrl+1)
            checkUrl();  
           },1000)
          }
         }else{
          setPreviewFailed(true)         
         }
  }, [url, reCheckUrl]);



 


  const getPlayLoaderSvg = () => {
    return <div> 
       <h4>Please wait, preview is building</h4>
      <div className='previewSVGLoader'>
      <svg version="1.1" id="L2"  x="0px" y="0px"
      viewBox="0 0 100 100" enable-background="new 0 0 100 100">
    <circle fill="none" stroke="#4684a1" stroke-width="4" stroke-miterlimit="10" cx="50" cy="50" r="48"/>
    <line fill="none" stroke-linecap="round" stroke="#4684a1" stroke-width="4" stroke-miterlimit="10" x1="50" y1="50" x2="85" y2="50.5">
      <animateTransform 
           attributeName="transform" 
           dur="2s"
           type="rotate"
           from="0 50 50"
           to="360 50 50"
           repeatCount="indefinite" />
    </line>
    <line fill="none" stroke-linecap="round" stroke="#4684a1" stroke-width="4" stroke-miterlimit="10" x1="50" y1="50" x2="49.5" y2="74">
      <animateTransform 
           attributeName="transform" 
           dur="15s"
           type="rotate"
           from="0 50 50"
           to="360 50 50"
           repeatCount="indefinite" />
    </line>
    </svg>
    
    </div>
    <p>Hold On! We're Stitching Together Your Preview.</p>
    </div>
  }



  const getStopLoaderSvg = () => {
    return <div> 
            <h4>Oh no! The Build Hit a Roadblock</h4>
      <div className='previewSVGLoader previewSVGLoaderError'>
   <svg version="1.1" id="L2"  x="0px" y="0px"
      viewBox="0 0 100 100" enable-background="new 0 0 100 100">
    <circle fill="none" stroke="#4684a1" stroke-width="4" stroke-miterlimit="10" cx="50" cy="50" r="48"/>
    <line fill="none" stroke-linecap="round" stroke="#4684a1" stroke-width="4" stroke-miterlimit="10" x1="50" y1="50" x2="85" y2="50.5">
    
    </line>
    <line fill="none" stroke-linecap="round" stroke="#4684a1" stroke-width="4" stroke-miterlimit="10" x1="50" y1="50" x2="49.5" y2="74">
  
    </line>
    </svg>
    </div>
    <p>Unfortunately, it seems like building your preview didn't go as planned. <br/>Please refresh or update the post in WordPress</p>
    </div>
  }
  return (
    <div className='previewMainWrapper'>
       <div className='previewHeader'>        
        {isValidUrl ?<Link to={url} target='_blank'>Open in New Window</Link> : null}
        <Link to="javascript:window.location.href=window.location.href">Refresh The Page</Link>
        </div>


    <div className='previewIframeWrapper'>
      {isChecking ? (
          <div className='previewLoader firstLoader'>
              {
                getPlayLoaderSvg()
              }
            </div>

      ) : isValidUrl ? (
        <iframe className='previewIframe' src={url} title="Example IFrame" width="600" height="400">
          Your browser does not support iframes.
        </iframe>
      ) : (
        // <p>Error: Failed to load iframe content.</p>
    
    previewFailed === false ?
      <div className='previewLoader firstLoader'>
      {
        getPlayLoaderSvg()
    }
</div> :
<div className='previewLoader firstLoader'>
      {
        getStopLoaderSvg()
    }
</div>
      )}
    </div>
    </div>
  );
};

export default IFrameComponent;






// import React from 'react';




//   const getPlayLoaderSvg = () => {
//     return <div> 
//        <h4>Please wait, preview is building</h4>
//       <div className='previewSVGLoader'>
//       <svg version="1.1" id="L2"  x="0px" y="0px"
//       viewBox="0 0 100 100" enable-background="new 0 0 100 100">
//     <circle fill="none" stroke="#4684a1" stroke-width="4" stroke-miterlimit="10" cx="50" cy="50" r="48"/>
//     <line fill="none" stroke-linecap="round" stroke="#4684a1" stroke-width="4" stroke-miterlimit="10" x1="50" y1="50" x2="85" y2="50.5">
//       <animateTransform 
//            attributeName="transform" 
//            dur="2s"
//            type="rotate"
//            from="0 50 50"
//            to="360 50 50"
//            repeatCount="indefinite" />
//     </line>
//     <line fill="none" stroke-linecap="round" stroke="#4684a1" stroke-width="4" stroke-miterlimit="10" x1="50" y1="50" x2="49.5" y2="74">
//       <animateTransform 
//            attributeName="transform" 
//            dur="15s"
//            type="rotate"
//            from="0 50 50"
//            to="360 50 50"
//            repeatCount="indefinite" />
//     </line>
//     </svg>
    
//     </div>
//     <p>Hold On! We're Stitching Together Your Preview.</p>
//     </div>
//   }



// const IFrameComponent = ({ webHookStatus, url }) => {
//   return (
//     <>

//     {webHookStatus === "loading" ?
//     getPlayLoaderSvg(): 
//     webHookStatus ===  "success"?
//      <iframe className='previewIframe' src={url} title="Example IFrame" width="600" height="400">
// Your browser does not support iframes.
// </iframe>: 
//       webHookStatus ===  "error" ?
//       getPlayLoaderSvg():""}
//     </>
//   );
// }
// export default IFrameComponent;