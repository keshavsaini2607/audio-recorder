import api from "..";
import { API_ENDPOINTS } from "../../constants/endpoints";

export const getJobId = async (): Promise<string | any> => {
   try {
      const response = await api.get(API_ENDPOINTS.GET_JOB_ID);
      if (response && response.data) {
         return response.data;
      }
   } catch (error) {
      return error;
   }
};

export const saveStream = async (data: {
   transcript: string;
   jobId: string;
}): Promise<string | any> => {
   try {
      const response = await api.get(
         `${API_ENDPOINTS.SAVE_STREAM}?text=${data.transcript}&use_post_processor=false&job_id=${data.jobId}`
      );
      if (response && response.data) {
         return response.data;
      }
   } catch (error) {
      return error;
   }
};
