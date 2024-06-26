import React, { useEffect, useRef, useState } from 'react';
import {  JitsiMeeting } from '@jitsi/react-sdk';
import toast  from 'react-hot-toast'; 
import { useSelector } from 'react-redux';


interface JistyVedioCallProps {}

const JistyVedioCall: React.FC<JistyVedioCallProps> = () => {
const userData=useSelector((state:any)=>state.persisted.user.userData)

    const apiRef :any= useRef();
    const [ logItems, updateLog ]:any = useState([]);
    const [ showNew, toggleShowNew ]:any = useState(false);
    const [ knockingParticipants, updateKnockingParticipants ]:any = useState([]);
    const [roomName, setRoomName] = useState(() => `JitsiMeetRoomNo${Math.random() * 100}-${Date.now()}`);
    console.log('the room nameis',roomName);

    

    const printEventOutput = (payload:any) => {
        updateLog((items:any) => [ ...items, JSON.stringify(payload) ]);
    };

    const handleAudioStatusChange = (payload:any, feature:any) => {
        if (payload.muted) {
            updateLog((items:any) => [ ...items, `${feature} off` ])
        } else {
            updateLog((items:any) => [ ...items, `${feature} on` ])
        }
    };

    const handleChatUpdates = (payload:any) => {
        if (payload.isOpen || !payload.unreadCount) {
            return;
        }
        apiRef.current.executeCommand('toggleChat');
        updateLog((items:any) => [ ...items, `you have ${payload.unreadCount} unread messages` ])
    };

    const handleKnockingParticipant = (payload:any) => {
        updateLog((items:any) => [ ...items, JSON.stringify(payload) ]);
        updateKnockingParticipants((participants:any) => [ ...participants, payload?.participant ])
    };

    
    const handleJitsiIFrameRef1 = (iframeRef:any) => {
        iframeRef.style.border = '1px solid #C1506D';
        iframeRef.style.position='fixed'
        iframeRef.style.background = '#3d3d3d';
        iframeRef.style.height = '99vh';
        iframeRef.style.width='92vw'
    };

   

  

    const handleApiReady = (apiObj:any) => {
        apiRef.current = apiObj;
        apiRef.current.on('knockingParticipant', handleKnockingParticipant);
        apiRef.current.on('audioMuteStatusChanged', (payload:any) => handleAudioStatusChange(payload, 'audio'));
        apiRef.current.on('videoMuteStatusChanged', (payload:any) => handleAudioStatusChange(payload, 'video'));
        apiRef.current.on('raiseHandUpdated', printEventOutput);
        apiRef.current.on('titleViewChanged', printEventOutput);
        apiRef.current.on('chatUpdated', handleChatUpdates);
        apiRef.current.on('knockingParticipant', handleKnockingParticipant);
    };

    const handleReadyToClose = () => {
        toast.error("ready to close")
       
        alert('Ready to close...');
    };

 
    
const user={
    displayName:userData?.finduser?.username,
    email:userData?.finduser?.email
}




    const renderSpinner = () => (
        <div style = {{
            fontFamily: 'sans-serif',
            textAlign: 'center'
        }}>
            Loading..
        </div>
    );

    


    return (
        <>
           
           <div className='z-50 w-full h-full '>
           <JitsiMeeting
                roomName = { roomName }
                spinner = { renderSpinner }
                configOverwrite = {{
                    subject: 'Group video call',
                    hideConferenceSubject: false,
                }}
                lang = 'eng'
                onApiReady = { externalApi => handleApiReady(externalApi) }
                onReadyToClose = { handleReadyToClose }
                getIFrameRef = { handleJitsiIFrameRef1 }
                userInfo={user}
                
                />
           </div>
            
        </>
    );
}

export default JistyVedioCall;