import React, { useEffect } from "react";
import rec_start from "../../assets/record_start.svg";
import rec_stop from "../../assets/record_stop.svg";
import close_icon from "../../assets/close.svg";
import useAudioRecorder from "../../context/AudioRecorderState";
import SpeechRecognition, {
   useSpeechRecognition,
} from "react-speech-recognition";
import { saveStream } from "../../api/recorderJob";

const getImageForState = (state: "recording" | "paused" | "stopped") => {
   switch (state) {
      case "recording":
         return rec_stop;
      case "paused":
         return rec_start;
      case "stopped":
         return rec_start;
   }
};

const formatTime = (seconds: number): string => {
   const minutes = Math.floor(seconds / 60);
   const remainingSeconds = seconds % 60;
   return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
};

const RecorderControls = () => {
   const {
      recorderState,
      setRecorderState,
      setTranscription,
      transcription,
      jobId,
   } = useAudioRecorder();
   const [recTimer, setRecTimer] = React.useState(0);
   const {
      transcript,
      listening,
      resetTranscript,
      browserSupportsSpeechRecognition,
   } = useSpeechRecognition();

   const resetRecorder = () => {
      setRecorderState("stopped");
      setRecTimer(0);
      setTranscription("");
   };

   useEffect(() => {
      if (listening && transcript) {
         setTranscription(transcript);
      }
   }, [listening, transcript]);

   React.useEffect(() => {
      (async () => {
         if (recorderState === "recording") {
            SpeechRecognition.startListening({ continuous: true });
         } else if (recorderState === "stopped") {
            if (transcription && transcription.length > 0) {
               await saveStream({ transcript: transcription, jobId });
            }
            SpeechRecognition.stopListening();
            resetTranscript();
         }
      })();
   }, [recorderState, resetTranscript]);

   if (!browserSupportsSpeechRecognition) {
      return <span>Browser doesn't support speech recognition.</span>;
   }

   return (
      <div>
         <div className="flex items-center justify-center mt-4 gap-4">
            {recorderState !== "stopped" && (
               <span className="text-lg font-medium">
                  {formatTime(recTimer)}
               </span>
            )}
            <button
               onClick={() =>
                  setRecorderState(
                     recorderState === "stopped" ? "recording" : "stopped"
                  )
               }
               className="relative w-16 h-16 flex items-center justify-center"
            >
               <img
                  src={getImageForState(recorderState)}
                  alt="Record button"
                  width={64}
                  height={64}
                  className="cursor-pointer"
               />
            </button>
            {recorderState !== "stopped" && (
               <button
                  className="bg-transparent shadow-none w-max"
                  onClick={resetRecorder}
               >
                  <img
                     src={close_icon}
                     alt="Record button"
                     width={30}
                     height={30}
                     className="cursor-pointer"
                  />
               </button>
            )}
         </div>
      </div>
   );
};

export default RecorderControls;
