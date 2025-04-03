import React from "react";
import { Keyboard } from "lucide-react";
import RecorderControls from "../RecorderControls";
import AudioTranscript from "../AudioTranscript";
import useAudioRecorder from "../../context/AudioRecorderState";
import record_animation from "../../assets/voice_anim.gif";
import { getJobId } from "../../api/recorderJob";
import recording_img from "../../assets/recording.svg";

export const AudioRecorder = () => {
   const { recorderState, setJobId } = useAudioRecorder();

   React.useEffect(() => {
      (async () => {
         const jId = await getJobId();
         if (jId && typeof jId === "string") {
            setJobId(jId);
         }
      })();
   }, []);
   return (
      <div className="p-4 rounded-lg bg-white w-full md:w-[40vw] max-w-[600px] min-w-[300px] mx-auto">
         <div className="flex items-center justify-between">
            <span className="text-base sm:text-lg">Voice to Text</span>
            <Keyboard className="w-5 h-5 sm:w-6 sm:h-6" />
         </div>

         <div>
            {recorderState === "recording" && (
               <div className="mt-4 w-full flex flex-col items-center justify-center gap-2">
                  <img 
                     src={recording_img} 
                     alt="Recording" 
                     className="w-[60%] sm:w-max max-w-[200px]" 
                  />
                  <img
                     src={record_animation}
                     alt="Recording"
                     className="w-full h-auto object-cover max-h-[60px] sm:max-h-[100px]"
                  />
               </div>
            )}
         </div>

         <RecorderControls />

         <div className="mt-6 sm:mt-10">
            <AudioTranscript />
         </div>
      </div>
   );
};
