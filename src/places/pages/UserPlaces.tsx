import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PlaceList from '../components/PlaceList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { IUidParamTypes } from '../../interfaces/other/ReactRouter';
import { IPlaceItem } from '../../interfaces/places/place';
import { useHttpClient } from '../../shared/hooks/useHttp';

const UserPlaces: React.FC = () => {
  const [loadedPlaces, setLoadedPlaces] = useState<IPlaceItem[]>([]);
  const { isLoading, sendRequest, error, clearError } = useHttpClient();
  const { uid } = useParams<IUidParamTypes>();

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/api/places/user/${uid}`
        );
        setLoadedPlaces(responseData.places);
      } catch (err) {}
    };
    fetchPlaces();
  }, [sendRequest, uid]);

  const placeDeleteHandler = (deletedPlaceId: string) => {
    setLoadedPlaces((prevPlaces) =>
      prevPlaces.filter((place) => place.id !== deletedPlaceId)
    );
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && (
        <PlaceList items={loadedPlaces} onDelete={placeDeleteHandler} />
      )}
    </>
  );
};

export default UserPlaces;
