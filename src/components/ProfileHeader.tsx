import React, { useState, useRef } from 'react';
import { Camera, Edit2, X } from 'lucide-react';
import ReactCrop, { Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

interface ProfileHeaderProps {
  userInfo: {
    name: string;
    description: string;
    profileImage: string;
  };
  onUpdateUserInfo: (info: { name: string; description: string; profileImage: string }) => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ userInfo, onUpdateUserInfo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempInfo, setTempInfo] = useState(userInfo);
  const [showFullImage, setShowFullImage] = useState(false);
  const [crop, setCrop] = useState<Crop>();
  const [tempImage, setTempImage] = useState<string | null>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const handleEdit = () => {
    setIsEditing(true);
    setTempInfo(userInfo);
  };

  const handleSave = () => {
    onUpdateUserInfo(tempInfo);
    setIsEditing(false);
    setTempImage(null);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCropComplete = (crop: Crop) => {
    if (imageRef.current && crop.width && crop.height) {
      const croppedImageUrl = getCroppedImg(
        imageRef.current,
        crop,
        'newFile.jpeg'
      );
      setTempInfo({ ...tempInfo, profileImage: croppedImageUrl });
    }
  };

  const getCroppedImg = (image: HTMLImageElement, crop: Crop, fileName: string) => {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height
      );
    }

    return canvas.toDataURL('image/jpeg');
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <div className="max-w-4xl mx-auto p-8">
        <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-8">
          <div className="flex-shrink-0">
            <div className="relative w-40 h-40">
              <img
                src={userInfo.profileImage}
                alt="Profile"
                className="w-full h-full rounded-full object-cover border-4 border-white cursor-pointer"
                onClick={() => setShowFullImage(true)}
              />
              {isEditing && (
                <label htmlFor="profileImage" className="absolute bottom-0 right-0 bg-white text-blue-500 p-2 rounded-full cursor-pointer shadow-lg">
                  <Camera size={24} />
                  <input
                    type="file"
                    id="profileImage"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
              )}
            </div>
          </div>
          <div className="flex-grow">
            <div className="mb-4">
              {isEditing ? (
                <input
                  type="text"
                  value={tempInfo.name}
                  onChange={(e) => setTempInfo({ ...tempInfo, name: e.target.value })}
                  className="text-3xl font-bold mb-2 w-full bg-transparent border-b border-white focus:outline-none"
                />
              ) : (
                <h1 className="text-3xl font-bold mb-2">{userInfo.name}</h1>
              )}
            </div>
            <div className="mb-4">
              {isEditing ? (
                <textarea
                  value={tempInfo.description}
                  onChange={(e) => setTempInfo({ ...tempInfo, description: e.target.value })}
                  className="w-full p-2 bg-white bg-opacity-20 rounded focus:outline-none"
                  rows={3}
                />
              ) : (
                <p className="text-lg opacity-90">{userInfo.description}</p>
              )}
            </div>
            <button
              onClick={isEditing ? handleSave : handleEdit}
              className="bg-white text-blue-500 px-6 py-2 rounded-full hover:bg-opacity-90 transition duration-300 shadow-lg"
            >
              {isEditing ? 'Guardar' : <Edit2 size={20} />}
            </button>
          </div>
        </div>
      </div>
      {showFullImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={() => setShowFullImage(false)}>
          <img src={userInfo.profileImage} alt="Profile" className="max-w-full max-h-full rounded-lg" />
        </div>
      )}
      {tempImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg max-w-2xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Recortar imagen</h2>
              <button onClick={() => setTempImage(null)} className="text-gray-600 hover:text-gray-800">
                <X size={24} />
              </button>
            </div>
            <ReactCrop
              crop={crop}
              onChange={(c) => setCrop(c)}
              onComplete={handleCropComplete}
              aspect={1}
              circularCrop
            >
              <img ref={imageRef} src={tempImage} alt="Temp" />
            </ReactCrop>
            <div className="flex justify-end mt-4 space-x-2">
              <button
                onClick={() => setTempImage(null)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileHeader;