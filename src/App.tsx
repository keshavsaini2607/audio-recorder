import { AudioRecorder } from "./components";
import useAudioRecorder from "./context/AudioRecorderState";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner"


function App() {
   const { jobId } = useAudioRecorder();

   const copyToClipboard = () => {
      if (jobId) {
         navigator.clipboard
            .writeText(jobId)
            .then(() => {
               toast.success("JobID copied to clipboard");
            })
            .catch((err) => {
               toast.error("Failed to copy text: ", err);
            });
      }
   };

   return (
      <div className="h-screen relative w-screen bg-gray-100 flex items-center justify-center">
         <div
            className="absolute top-5 right-5 bg-white shadow-md p-3 rounded-lg cursor-pointer hover:bg-gray-50"
            onClick={copyToClipboard}
            title="Click to copy Job ID"
         >
            <span>{jobId}</span>
         </div>
         <Toaster />
         <AudioRecorder />
      </div>
   );
}

export default App;
