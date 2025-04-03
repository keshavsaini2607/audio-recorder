import { Textarea } from "../ui/textarea";
import useAudioRecorder from "../../context/AudioRecorderState";

const AudioTranscript = () => {
   const { transcription } = useAudioRecorder();
   return (
      <div>
         <Textarea
            placeholder="Transcribed Text"
            className="h-[200px]"
            disabled
            defaultValue={transcription}
         />
      </div>
   );
};

export default AudioTranscript;
