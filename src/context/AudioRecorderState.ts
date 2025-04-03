import { create } from "zustand";

interface AudioRecorderState {
   recorderState: "recording" | "paused" | "stopped";
   setRecorderState: (state: "recording" | "paused" | "stopped") => void;
   recordTimer: number;
   setRecordTimer: (timer: number) => void;
   transcription: string;
   setTranscription: (transcription: string) => void;
   jobId: string;
   setJobId: (jobId: string) => void;
}

const useAudioRecorder = create<AudioRecorderState>((set) => ({
   recorderState: "stopped",
   setRecorderState: (state) => set(() => ({ recorderState: state })),
   recordTimer: 0,
   setRecordTimer: (timer) =>
      set((state) => ({
         recordTimer:
            state.recorderState === "recording"
               ? state.recordTimer + timer
               : state.recordTimer,
      })),
   transcription: "",
   setTranscription: (transcription) =>
      set(() => ({
         transcription: transcription,
      })),
   jobId: "",
   setJobId: (jobId) => set(() => ({ jobId: jobId })),
}));

export default useAudioRecorder;
