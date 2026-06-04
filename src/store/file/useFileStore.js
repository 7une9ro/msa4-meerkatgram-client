import {defineStore} from "pinia";
import myAxios from "../../api/myAxios.js";

const useFileStore = defineStore('fileStore', () => {
  // 1. State
  
  // 2. Getter
  
  // 3. Action
  const uploadFile = async (file) => {
    try {
      const url = '/api/files/profiles';
      
      // FormData 객체 생성
      const data = new FormData();
      // FormData 객체에 파일 추가
      data.append('file', file);
      
      // 요청 설정
      const config = {
        // 헤더 설정 - multipart/form-data
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      
      // 파일 업로드 요청
      const res = await myAxios.post(url, data, config);
      return res.data.data.fileUri;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  
  return {
    uploadFile
  }
});

export default useFileStore;