import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import {
  Dialog,
  DialogTitle,
  Stack,
  Typography,
  DialogContent,
  Box,
  LinearProgress,
} from "@mui/material";
import { Images } from "src/constants";
import Controls from "controls/Controls";
import CloseIcon from "@mui/icons-material/Cancel";
import toast from "react-hot-toast";
import { useRef } from "react";

const ImageUploader = ({
  openUpload,
  setOpenUpload,
  file,
  setFile,
  cropper,
  setCropper,
  uploadProgress,
  setUploadProgress,
  loadingCrop,
  setLoadingCrop,
  setUploadComplete,
  fileInputRef,
  setImgUrl,
}) => {
  const croppedImage = useRef<File | null>(null);

  const closeUploadModal = () => {
    setOpenUpload(false);
    setFile(null);
    setCropper(null);
  };

  const getNewImageUrl = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const getCropData = async () => {
    setFile(null);
    setLoadingCrop(true);
    if (cropper) {
      const croppedFile = await fetch(cropper.getCroppedCanvas().toDataURL())
        .then((res) => res.blob())
        .then((blob) => {
          return new File([blob], file.name, { type: file.type });
        });
      if (croppedFile) {
        croppedImage.current = croppedFile;
        const formData = new FormData();
        formData.append("media", croppedFile);
        try {
          // const response = await UploadImage(formData, (progressEvent) => {
          //   const percentCompleted = Math.round(
          //     (progressEvent.loaded * 100) / progressEvent.total
          //   );
          //   setUploadProgress(percentCompleted);
          // });
          // if (response?.isSuccess) {
          //   setImgUrl(response?.data?.url);
          //   setUploadProgress(0);
          //   setLoadingCrop(false);
          //   setUploadComplete(true);
          //   croppedImage.current = null;
          //   setOpenUpload(false);
          // } else {
          //   setUploadProgress(0);
          //   setLoadingCrop(false);
          //   croppedImage.current = null;
          //   closeUploadModal();
          // }
        } catch (error) {
          setUploadProgress(0);
          setLoadingCrop(false);
          closeUploadModal();
          croppedImage.current = null;
          toast.error("Failed to upload image");
        }
      }
    }
  };
  return (
    <Dialog
      open={openUpload}
      onClose={uploadProgress === 0 ? closeUploadModal : undefined}
      maxWidth="xs"
    >
      <DialogTitle>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography
            variant="subtitle1"
            component="span"
            fontWeight={500}
            style={{ flexGrow: 1 }}
          >
            Upload Image
          </Typography>
          <Controls.IconButton
            onClick={uploadProgress === 0 ? closeUploadModal : undefined}
          >
            <CloseIcon />
          </Controls.IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent
        dividers
        sx={{
          width: "300px",
          maxWidth: "360px",
        }}
      >
        {!file && !cropper && (
          <form className="flex flex-col items-center">
            <input
              type="file"
              accept="image/png, image/jpeg, image/jpg"
              hidden={true}
              ref={fileInputRef}
              onChange={getNewImageUrl}
            />
            <img
              src={Images.UPLOAD}
              className="w-40 cursor-pointer h-[10.5rem] object-cover"
              alt="upload-icon"
              onClick={() => fileInputRef.current.click()}
            />
            <Typography variant="body2" fontWeight={500} marginTop="20px">
              Browse File to upload
            </Typography>
          </form>
        )}

        {file && (
          <Box width="100%" height="100%">
            <Cropper
              src={URL.createObjectURL(file)}
              style={{ height: "160px", width: "100%" }}
              initialAspectRatio={NaN}
              minCropBoxHeight={50}
              minCropBoxWidth={50}
              guides={false}
              background={false}
              checkOrientation={false}
              viewMode={1}
              dragMode="move"
              onInitialized={(instance) => {
                setCropper(instance);
              }}
            />
            <Box
              display="flex"
              justifyContent="center"
              gap="16px"
              marginTop="16px"
            >
              <Controls.Button
                variant="outlined"
                sx={{
                  borderRadius: "20px !important",
                  padding: "3px 14px !important",
                }}
                onClick={() => {
                  setFile(null);
                  setCropper(null);
                }}
              >
                Cancel
              </Controls.Button>
              <Controls.Button
                sx={{
                  borderRadius: "20px !important",
                  padding: "3px 14px !important",
                }}
                onClick={getCropData}
              >
                Upload
              </Controls.Button>
            </Box>
          </Box>
        )}

        <Stack justifyContent="center">
          {loadingCrop && uploadProgress <= 100 && (
            <Stack justifyContent="center" alignItems="center">
              <Box textAlign="center">
                {croppedImage.current && (
                  <Typography>
                    {croppedImage.current?.name.length > 20
                      ? `${croppedImage.current?.name.substring(
                          0,
                          20
                        )}...${croppedImage.current?.name.slice(-4)}`
                      : croppedImage.current?.name}
                  </Typography>
                )}
              </Box>
              <Box
                sx={{ display: "flex", alignItems: "center", width: "100%" }}
              >
                <Box sx={{ width: "100%", mr: 1 }}>
                  <LinearProgress
                    sx={{ height: "10px", borderRadius: "5px" }}
                    variant="determinate"
                    value={uploadProgress}
                  />
                </Box>
                <Box>
                  <Typography
                    sx={{ minWidth: 35 }}
                    variant="body2"
                    color="text.secondary"
                  >{`${uploadProgress}%`}</Typography>
                </Box>
              </Box>
            </Stack>
          )}
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default ImageUploader;
