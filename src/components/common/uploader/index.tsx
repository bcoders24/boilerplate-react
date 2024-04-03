import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { Images } from '@/constants';
import { useRef, useState } from 'react';
import { uploadImageFn } from '@/services/api/media';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';

interface UploaderProps {
  openUpload: boolean;
  setOpenUpload: React.Dispatch<React.SetStateAction<boolean>>;
  setImgUrl: React.Dispatch<React.SetStateAction<string>>;
  accept?: string;
}

const ImgVidUploader = ({ openUpload, setOpenUpload, setImgUrl, accept }: UploaderProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [cropper, setCropper] = useState<any>(null);
  const [uploadProgress, setUploadProgress] = useState<any>(0);
  const [uploading, setUploading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const media = useRef<File | null>(null);

  const closeUploadModal = (value: boolean) => {
    setOpenUpload(value);
    setFile(null);
    setCropper(null);
  };

  const setMediaFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e?.target?.files[0];
      if (file.type && accept?.includes(file.type.split('/')[0])) {
        setFile(file ?? null);
      } else {
        toast.error('File not supported');
      }
    }
  };

  const uploadImage = async () => {
    setFile(null);
    setUploading(true);
    if (cropper) {
      const croppedFile = await fetch(cropper.getCroppedCanvas().toDataURL())
        .then((res) => res.blob())
        .then((blob) => {
          return new File([blob], file!.name, { type: file!.type });
        });
      if (croppedFile) {
        media.current = croppedFile;
        const formData = new FormData();
        formData.append('media', croppedFile);
        try {
          const { data } = await uploadImageFn(formData, setUploadProgress);
          if (data?.isSuccess) {
            setImgUrl(data?.data?.url);
            toast.success('File uploaded');
          } else {
            toast.error('Failed to upload file');
          }
        } catch (error) {
          if (error instanceof Error) {
            toast.error(error.message);
          }
        } finally {
          setOpenUpload(false);
          setUploadProgress(0);
          setUploading(false);
          media.current = null;
          setFile(null);
          setCropper(null);
        }
      }
    }
  };

  const uploadVideo = async () => {
    if (file) {
      setUploading(true);
      media.current = file;
      const formData = new FormData();
      formData.append('media', file);
      setFile(null);
      try {
        const { data } = await uploadImageFn(formData, setUploadProgress);
        if (data?.isSuccess) {
          setImgUrl(data?.data?.url);
          toast.success('Video Uploaded');
        } else {
          toast.error('Failed to upload file.');
        }
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        }
      } finally {
        setOpenUpload(false);
        setUploadProgress(0);
        setUploading(false);
        media.current = null;
        setFile(null);
        setCropper(null);
      }
    }
  };

  return (
    <Dialog open={openUpload} onOpenChange={uploadProgress === 0 ? closeUploadModal : undefined}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload File</DialogTitle>
        </DialogHeader>
        <div>
          {!file && !cropper && !uploading && (
            <form className="flex flex-col items-center">
              <input type="file" hidden={true} ref={fileInputRef} onChange={setMediaFile} />
              <img
                src={Images.UPLOAD}
                className="w-32 cursor-pointer object-cover"
                alt="upload-icon"
                onClick={() => fileInputRef.current?.click()}
              />
              <p className="mt-5 font-medium">Browse File to upload</p>
            </form>
          )}

          {file && file.type.startsWith('image') && (
            <div className="w-full h-full flex flex-col gap-y-4">
              <Cropper
                src={URL.createObjectURL(file)}
                style={{ height: '300px' }}
                initialAspectRatio={NaN}
                minCropBoxHeight={50}
                minCropBoxWidth={50}
                guides={false}
                background={false}
                checkOrientation={false}
                viewMode={1}
                dragMode="move"
                onInitialized={(instance: any) => {
                  setCropper(instance);
                }}
              />
              <div className="flex justify-center gap-x-4">
                <Button
                  onClick={() => {
                    setFile(null);
                    setCropper(null);
                  }}
                >
                  Cancel
                </Button>
                <Button onClick={uploadImage}>Upload</Button>
              </div>
            </div>
          )}

          {file && file.type.startsWith('video') && (
            <div className="w-full h-full flex flex-col gap-y-4">
              <video controls width="100%" height="auto">
                <source src={URL.createObjectURL(file)} type={file.type} />
                Your browser does not support the video tag.
              </video>
              <div className="flex justify-center gap-x-4">
                <Button
                  onClick={() => {
                    setFile(null);
                  }}
                >
                  Cancel
                </Button>
                <Button onClick={uploadVideo}>Upload</Button>
              </div>
            </div>
          )}

          <div className="flex justify-center">
            {uploading && uploadProgress <= 100 && (
              <div className="flex flex-col gap-2 justify-center items-center">
                <div className="text-center">
                  {media.current && (
                    <p className="text-base">
                      {media.current.name.length > 20
                        ? `${media.current.name.substring(0, 20)}...${media.current.name.slice(-4)}`
                        : media.current.name}
                    </p>
                  )}
                </div>
                <div className="flex items-center w-full">
                  <div className="w-full mr-1">
                    <Progress value={uploadProgress} />
                  </div>
                  <div className="min-w-10">
                    <p className="text-xs text-gray-500">{`${uploadProgress}%`}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImgVidUploader;
