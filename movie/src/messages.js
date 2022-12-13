import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const successMessage = () => {
  toast.success("Congratulations you uploaded the movie", {
    position: toast.POSITION.TOP_CENTER,
  });
};

export const successMessageLogin = () => {
  toast.success("Congratulations you are logged in", {
    position: toast.POSITION.TOP_CENTER,
  });
};

export const successMessageRegister = () => {
  toast.success("Congratulations you are registered", {
    position: toast.POSITION.TOP_CENTER,
  });
};

export const errorMessage = () => {
  toast.error("Error invalid data!", {
    position: toast.POSITION.TOP_CENTER,
  });
};
