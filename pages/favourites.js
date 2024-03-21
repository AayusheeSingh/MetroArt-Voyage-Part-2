import { Container, Row, Col } from 'react-bootstrap';
import { useAtom } from 'jotai';
import { favouritesAtom } from '../store';
import ArtworkCard from '../components/ArtworkCard';

const Favourites = () => {
  const [favouritesList] = useAtom(favouritesAtom);

  return (
    <Container>
      <h1>Favourites</h1>
      {favouritesList.length === 0 ? (
        <p>Nothing Here. Try adding some new artwork to the list.</p>
      ) : (
        <Row>
          {favouritesList.map(objectID => (
            <Col key={objectID} xs={12} sm={6} md={4} lg={3}>
              <ArtworkCard objectID={objectID} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Favourites;
