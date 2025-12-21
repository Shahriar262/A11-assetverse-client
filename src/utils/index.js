import axios from "axios";

// Image Upload to ImgBB
export const imgUpload = async (imgFile) => {
  const formData = new FormData();
  formData.append("image", imgFile);

  const { data } = await axios.post(
    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
    formData
  );

  return data?.data?.display_url;
};

// Save or update user to backend
export const saveOrUpdateUser = async (userData) => {
  const { data } = await axios.post(
    `${import.meta.env.VITE_API_URL}/user`,
    userData
  );
  return data;
};
