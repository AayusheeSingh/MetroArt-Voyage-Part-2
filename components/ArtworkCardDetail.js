import { Card, Button } from 'react-bootstrap';
import { useAtom } from 'jotai';
import { useState } from 'react';
import { favouritesAtom } from '../store';
import useSWR from 'swr';
import Error from 'next/error';

const ArtworkCardDetail = ({ objectID }) => {
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const [showAdded, setShowAdded] = useState(favouritesList.includes(objectID));
  const { data, error } = useSWR(objectID ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}` : null);

  if (error) {
    return <Error statusCode={404} />;
  }

  if (!data) {
    return null;
  }

  const { primaryImage, title, objectDate, classification, medium, artistDisplayName, creditLine, dimensions, artistWikidata_URL } = data;

  const favouritesClicked = () => {
    if (showAdded) {
      setFavouritesList(current => current.filter(fav => fav !== objectID));
      setShowAdded(false);
    } else {
      setFavouritesList(current => [...current, objectID]);
      setShowAdded(true);
    }
  };

  return (
    <Card style={{ width: '18rem' }}>
      {primaryImage && <Card.Img variant="top" src={primaryImage} />}
      <Card.Body>
        <Card.Title>{title || 'N/A'}</Card.Title>
        <Card.Text>
          <strong>Date:</strong> {objectDate || 'N/A'}<br />
          <strong>Classification:</strong> {classification || 'N/A'}<br />
          <strong>Medium:</strong> {medium || 'N/A'}<br /><br />
          <strong>Artist:</strong> {artistDisplayName || 'N/A'}{' '}
          {artistDisplayName && artistWikidata_URL && (
            <a href={artistWikidata_URL} target="_blank" rel="noreferrer">wiki</a>
          )}<br />
          <strong>Credit Line:</strong> {creditLine || 'N/A'}<br />
          <strong>Dimensions:</strong> {dimensions || 'N/A'}
        </Card.Text>
        <Button
          variant={showAdded ? 'primary' : 'outline-primary'}
          onClick={favouritesClicked}
        >
          {showAdded ? '+ Favourite (added)' : '+ Favourite'}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ArtworkCardDetail;
