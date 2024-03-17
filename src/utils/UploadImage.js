import axios from "axios";
import { API } from "../API/API";
// crop = fit or Pad 
export const UploadImage = async (file, crop) => {
  const formData = new FormData();
  formData.append("file", file);
  try {
    const response = await axios.post(API.Image_Upload, formData, {
      params: {
        crop,
      },
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const image_url = response.data.image_url;
    return image_url;
  } catch (error) {
    console.error(error);
  }
};
