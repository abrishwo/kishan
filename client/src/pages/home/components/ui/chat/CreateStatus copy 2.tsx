
import React, { useState, useRef, useEffect } from 'react';
import { get, upload } from '../../../../../services/crud';
import { useNavigate } from 'react-router-dom';
import { getUserId } from '../../../../../services/auth';
import { toast } from 'react-toastify';
import PageLoading from '../../../../../components/PageLoading';
import {
  validateImageSize,
  validateVideoLength,
  validateVideoSize,
} from '../../../../../services/validateFile';

// Define the configuration data type
interface ConfigData {
  [key: string]: {
    value: number;
    unit: string;
  };
}

const CreateStatus: React.FC = () => {
  const [postBtnDisabled, setPostBtnDisabled] = useState<boolean>(true);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [caption, setCaption] = useState<string>('');
  const [fileType, setFileType] = useState<'video' | 'image'>('image');
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [uploading, setUploading] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [configData, setConfigData] = useState<ConfigData>({});
  const [videoLength, setVideoLength] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const photoInputRef = useRef<HTMLInputElement | null>(null);
  const videoInputRef = useRef<HTMLInputElement | null>(null);
  const thumbnailInputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    getConfigurationData();
  }, []);

  useEffect(() => {
    if (selectedFile) {
      validateMedia();
    } else {
      setPostBtnDisabled(true);
      setErrorMessage('');
    }
  }, [selectedFile, videoLength, thumbnail]);

  const getConfigurationData = () => {
    setLoading(true);
    get('configuration', {
      keys: ['max_image_upload_size', 'max_video_upload_size', 'max_video_duration'],
    })
      .then((res) => {
        if (res.data?.length > 0) {
          const data: ConfigData = {};
          res.data.forEach((entry: { key: string; value: number; unit: string }) => {
            data[entry.key] = entry; // Ensure the structure matches ConfigData type
          });
          setConfigData(data);
        }
        setLoading(false);
      })
      .catch((e) => {
        console.error(e);
        setLoading(false);
      });
  };

  const openPhotoDialog = () => {
    if (photoInputRef.current) {
      photoInputRef.current.value = '';
      videoInputRef.current!.value = '';
      setFileType('image');
      photoInputRef.current.click();
    }
  };

  const openVideoDialog = () => {
    if (photoInputRef.current && videoInputRef.current && thumbnailInputRef.current) {
      photoInputRef.current.value = '';
      videoInputRef.current.value = '';
      thumbnailInputRef.current.value = '';
      setFileType('video');
      videoInputRef.current.click();
    }
  };

  const openThumbnailDialog = () => {
    if (thumbnailInputRef.current) {
      thumbnailInputRef.current.click();
    }
  };

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(event.target.files ? event.target.files[0] : null);
    setThumbnail(null);
  };

  const handleVideoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(event.target.files ? event.target.files[0] : null);
    setThumbnail(null);
  };

  const handleThumbnailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setThumbnail(event.target.files ? event.target.files[0] : null);
  };

  const handleCaptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCaption(e.target.value);
  };

  const handleUpload = () => {
    console.log("working")
    if (selectedFile && validateMedia()) {
    // if(selectedFile){
      const formData = new FormData();
      formData.append('files', 'selectedFile');
      formData.append('author', getUserId() ?? '');
      formData.append('caption', caption ?? '');
      formData.append('type', fileType??'');
      if (thumbnail) formData.append('thumbnail', thumbnail);

      setUploading(true);

      upload('post', formData, onUploadProgress)
        .then(() => {
          setUploading(false);
          toast.success('Status uploaded successfully');
          navigate('/home');
        })
        .catch((error) => {
          setUploading(false);
          toast.error(error.response?.data?.message ?? 'Error uploading status');
          console.error('Error uploading status:', error);
        });
    } else {
      toast.info('Unable to upload status!');
    }
  };

  const onUploadProgress = (event: ProgressEvent) => {
    setUploadProgress(Math.round((100 * event.loaded) / event.total));
  };

  const validateMedia = (): boolean => {
    let valid = false;
    let errorType: 'video_size' | 'video_duration' | 'image' | 'thumbnail' | null = null;

    if (selectedFile) {
      if (fileType === 'video') {
        valid = validateVideoSize(selectedFile, configData['max_video_upload_size']);
        errorType = !valid ? 'video_size' : null;

        if (valid && videoLength) {
          valid = validateVideoLength(videoLength, configData['max_video_duration']);
          errorType = !valid ? 'video_duration' : null;
        }

        if (thumbnail && valid) {
          valid = validateImageSize(thumbnail, configData['max_image_upload_size']);
          errorType = !valid ? 'thumbnail' : null;
        }
      } else {
        valid = validateImageSize(selectedFile, configData['max_image_upload_size']);
        errorType = !valid ? 'image' : null;
      }
    }

    setPostBtnDisabled(!valid);
    setErrorMessage(valid ? '' : getErrorMessage(errorType));
    return valid;
  };

  const getErrorMessage = (
    errorType: 'video_size' | 'video_duration' | 'image' | 'thumbnail' | null
  ): string => {
    if (!errorType) return '';

    switch (errorType) {
      case 'image':
        return `Maximum image size allowed is ${configData['max_image_upload_size'].value}${configData['max_image_upload_size'].unit}`;
      case 'thumbnail':
        return `Maximum thumbnail size allowed is ${configData['max_image_upload_size'].value}${configData['max_image_upload_size'].unit}`;
      case 'video_size':
        return `Maximum video size allowed is ${configData['max_video_upload_size'].value}${configData['max_video_upload_size'].unit}`;
      case 'video_duration':
        return `Maximum video duration allowed is ${configData['max_video_duration'].value}${configData['max_video_duration'].unit}`;
      default:
        return 'Unknown error';
    }
  };

  if (loading) {
    return <PageLoading />;
  }

  return (
    <div className="hidden lg:p-20 uk-open" id="create-status" uk-modal="">
    <div className="uk-modal-dialog tt relative overflow-hidden mx-auto bg-white shadow-xl rounded-lg md:w-[520px] w-full dark:bg-dark2">
      {/* Modal Header */}
      <div className="text-center py-4 border-b mb-0 dark:border-slate-700">
        <h2 className="text-sm font-medium text-black">Create Status</h2>
  
        {/* Close Button */}
        <button type="button" className="button-icon absolute top-0 right-0 m-2.5 uk-modal-close">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
  
      {/* Textarea Input */}
      <div className="space-y-5 mt-3 p-2">
        <textarea
          className="w-full !text-black placeholder:!text-black !bg-white !border-transparent focus:!border-transparent focus:!ring-transparent !font-normal !text-xl dark:!text-white dark:placeholder:!text-white dark:!bg-slate-800"
          rows={6}
          placeholder="What do you have in mind?"
          value={caption}
          onChange={()=>handleCaptionChange}
        ></textarea>
      </div>
  
      {/* File Input and Action Buttons */}
      <div className="flex items-center gap-2 text-sm py-2 px-4 font-medium flex-wrap">
        <input
          type="file"
          ref={photoInputRef}
          accept="image/*"
          className="hidden"
          onChange={handlePhotoChange}
        />
        <input
          type="file"
          ref={videoInputRef}
          accept="video/*"
          className="hidden"
          onChange={handleVideoChange}
        />
        <input
          type="file"
          ref={thumbnailInputRef}
          accept="image/*"
          className="hidden"
          onChange={handleThumbnailChange}
        />
        <button
          type="button"
          onClick={openPhotoDialog}
          className="flex items-center gap-1.5 bg-sky-50 text-sky-600 border-sky-100 rounded-full py-1 px-2 border-2 dark:bg-sky-950 dark:border-sky-900"
        >
          Image
        </button>
        <button
          type="button"
          onClick={openVideoDialog}
          className="flex items-center gap-1.5 bg-teal-50 text-teal-600 border-teal-100 rounded-full py-1 px-2 border-2 dark:bg-teal-950 dark:border-teal-900"
        >
          Video
        </button>
        {fileType === 'video' && (
          <button
            type="button"
            onClick={openThumbnailDialog}
            className="flex items-center gap-1.5 bg-orange-50 text-orange-600 border-orange-100 rounded-full py-1 px-2 border-2 dark:bg-yellow-950 dark:border-yellow-900"
          >
            Thumbnail
          </button>
        )}
        <button type="button" className="grid place-items-center w-8 h-8 text-xl rounded-full bg-secondery">
          More
        </button>
      </div>
  
      {/* Error Message Display */}
      {errorMessage && (
        <div className="text-red-500 text-sm py-2 px-4">{errorMessage}</div>
      )}
  
      {/* Upload Progress */}
      {uploading && (
        <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700 mt-2 mb-4">
          <div
            className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
            style={{ width: `${uploadProgress}%` }}
          >
            {uploadProgress}%
          </div>
        </div>
      )}
  
      {/* Dropdown Menu and Create Button */}
      <div className="p-5 flex justify-between items-center">
        <div>
          <button
            className="inline-flex items-center py-1 px-2.5 gap-1 font-medium text-sm rounded-full bg-slate-50 border-2 border-slate-100 group aria-expanded:bg-slate-100 aria-expanded: dark:text-white dark:bg-slate-700 dark:border-slate-600"
            type="button"
          >
            Everyone
          </button>
  
          <div
            className="p-2 bg-white rounded-lg shadow-lg text-black font-medium border border-slate-100 w-60 dark:bg-slate-700"
            uk-drop="offset:10;pos: bottom-left; reveal-left;animate-out: true; animation: uk-animation-scale-up uk-transform-origin-bottom-left ; mode:click"
          >
            <form>
              {['Everyone', 'Friends', 'Only me'].map((option, index) => (
                <label key={index}>
                  <input
                    type="radio"
                    name="radio-status"
                    className="peer appearance-none hidden"
                    defaultChecked={index === 0}
                  />
                  <div className="relative flex items-center justify-between cursor-pointer rounded-md p-2 px-3 hover:bg-secondery peer-checked:[&_.active]:block dark:bg-dark3">
                    <div className="text-sm">{option}</div>
                  </div>
                </label>
              ))}
            </form>
          </div>
        </div>
  
        {/* Create Status Button */}
        <div className="flex items-center gap-2">
          <button
            type="submit"
            className={`button ${postBtnDisabled ? 'bg-slate-700' : 'bg-blue-500'} text-white py-2 px-12 text-[14px]`}
            disabled={postBtnDisabled}
            onClick={handleUpload}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  </div>
  
  );
};

export default CreateStatus;


