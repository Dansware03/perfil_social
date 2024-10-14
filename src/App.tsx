import React, { useState, useEffect } from 'react';
import { User, Image, Camera, Save, Instagram, Facebook } from 'lucide-react';

interface Photo {
  id: number;
  url: string;
}

interface ProfileData {
  name: string;
  description: string;
  profilePicture: string;
  photos: Photo[];
}

function App() {
  const [profileData, setProfileData] = useState<ProfileData>({
    name: 'Angela Vivas',
    description: 'Llevo más de 10 años practicando rugby, lo que me ha permitido participar en festivales y torneos importantes, representando a mi región y a mi país. Gracias al rugby, he vivido experiencias inolvidables, como viajar y compartir con personas de diferentes lugares. He llegado muy lejos gracias a mi dedicación y disciplina desde el momento en que comencé.',
    profilePicture: 'https://raw.githubusercontent.com/Dansware03/perfil_social/main/src/img/perfil.jpg',
    photos: [
      { id: 1, url: 'https://raw.githubusercontent.com/Dansware03/perfil_social/main/src/img/album(1).jpg' },
      { id: 2, url: 'https://raw.githubusercontent.com/Dansware03/perfil_social/main/src/img/album(2).jpg' },
      { id: 3, url: 'https://raw.githubusercontent.com/Dansware03/perfil_social/main/src/img/album(3).jpg' },
    ],
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem('profileData');
    if (savedData) {
      setProfileData(JSON.parse(savedData));
    }
  }, []);

  const saveProfileData = () => {
    localStorage.setItem('profileData', JSON.stringify(profileData));
    setIsEditing(false);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>, isProfilePicture: boolean) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (isProfilePicture) {
          setProfileData({ ...profileData, profilePicture: reader.result as string });
        } else {
          const newPhoto: Photo = { id: Date.now(), url: reader.result as string };
          setProfileData({ ...profileData, photos: [...profileData.photos, newPhoto] });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="relative h-48 bg-indigo-600">
          <img
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-32 h-32 rounded-full border-4 border-white object-cover"
            src={profileData.profilePicture}
            alt="Profile"
          />
          {isEditing && (
            <label className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-32 h-32 rounded-full bg-black bg-opacity-50 flex items-center justify-center cursor-pointer">
              <Camera className="w-8 h-8 text-white" />
              <input type="file" className="hidden" onChange={(e) => handleImageUpload(e, true)} accept="image/*" />
            </label>
          )}
        </div>
        <div className="pt-16 pb-8 px-6 text-center">
          {isEditing ? (
            <input
              className="text-3xl font-bold text-gray-900 text-center w-full"
              value={profileData.name}
              onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
            />
          ) : (
            <h1 className="text-3xl font-bold text-gray-900">{profileData.name}</h1>
          )}
          {isEditing ? (
            <textarea
              className="mt-2 text-gray-600 w-full"
              value={profileData.description}
              onChange={(e) => setProfileData({ ...profileData, description: e.target.value })}
            />
          ) : (
            <p className="mt-2 text-gray-600">{profileData.description}</p>
          )}

          {/* Redes Sociales */}
          <div className="mt-6 flex justify-center space-x-4">
            <a
              href="https://www.instagram.com/tu_perfil"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-colors"
            >
              <Instagram className="w-5 h-5 mr-2" />
              Instagram
            </a>
            <a
              href="https://www.facebook.com/tu_perfil"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <Facebook className="w-5 h-5 mr-2" />
              Facebook
            </a>
          </div>

          <div className="mt-6 flex justify-center space-x-4">
            {isEditing ? (
              <button
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                onClick={saveProfileData}
              >
                <Save className="w-5 h-5 mr-2" />
                Save Changes
              </button>
            ) : (
              <button
                className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                onClick={() => setIsEditing(true)}
              >
                <User className="w-5 h-5 mr-2" />
                Edit Profile
              </button>
            )}
          </div>
        </div>
        <div className="border-t border-gray-200 px-6 py-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Photo Album</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {profileData.photos.map((photo) => (
              <div key={photo.id} className="relative aspect-w-1 aspect-h-1">
                <img
                  src={photo.url}
                  alt={`Album photo ${photo.id}`}
                  className="object-cover rounded-lg"
                />
              </div>
            ))}
            {isEditing && (
              <label className="relative aspect-w-1 aspect-h-1 bg-gray-100 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors">
                <Image className="w-8 h-8 text-gray-400" />
                <input type="file" className="hidden" onChange={(e) => handleImageUpload(e, false)} accept="image/*" />
              </label>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
