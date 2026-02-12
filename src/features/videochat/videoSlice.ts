import { createSlice, type PayloadAction} from "@reduxjs/toolkit";

export interface VideoState {
    status:'idle' | 'connected' | 'searching' | 'error',
    remoteSocketId : string | null;
    isMicMuted:boolean,
    isVideoOff:boolean

}
const initialState:VideoState = {
status:'idle',
remoteSocketId:null,
isMicMuted:false,
isVideoOff:false
}
const videoSlice = createSlice({
    name:'video',
   initialState,
    reducers:{

    setSearching:(state:VideoState)=>{
        state.status="searching";

    },
    setMatchFound:(state:VideoState,action:PayloadAction<string>)=>{
       state.status='connected';
       state.remoteSocketId=action.payload;
    },
    resetVideoState:(state:VideoState)=>{
        state.status='idle',
        state.remoteSocketId=null;
    },
    toggleMic:(state:VideoState)=>{
        state.isMicMuted = !state.isMicMuted
    }


    }
})
export const {setMatchFound,setSearching,resetVideoState,toggleMic} =  videoSlice.actions;
export default videoSlice.reducer