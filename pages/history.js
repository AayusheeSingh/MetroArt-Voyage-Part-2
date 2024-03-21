// pages/history.js
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '../store';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Button, Card, ListGroup } from 'react-bootstrap'; // Import Button, Card, and ListGroup from react-bootstrap

const History = () => {
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const router = useRouter();

  useEffect(() => {
    // Logic to update search history or handle any side effects
  }, [searchHistory]);

  // Function to parse search history
  const parseHistory = () => {
    let parsedHistory = [];

    searchHistory.forEach(h => {
      let params = new URLSearchParams(h);
      let obj = {};
      for (const key of params.keys()) {
        obj[key] = params.get(key);
      }
      parsedHistory.push(obj);
    });

    return parsedHistory;
  };

  // Function to handle history item click
  const historyClicked = (e, index) => {
    e.preventDefault();
    router.push(`/artwork?${searchHistory[index]}`);
  };

  // Function to handle history item removal
  const removeHistoryClicked = (e, index) => {
    e.stopPropagation(); // Stop event propagation
    setSearchHistory(current => {
      let updatedHistory = [...current];
      updatedHistory.splice(index, 1);
      return updatedHistory;
    });
  };

  const parsedHistory = parseHistory();

  return (
    <div>
      <h1>Search History</h1>
      {parsedHistory.length === 0 ? (
        <p>Nothing Here. Try searching for some artwork.</p>
      ) : (
        <ListGroup>
          {parsedHistory.map((historyItem, index) => (
            <ListGroup.Item key={index} onClick={(e) => historyClicked(e, index)}>
              <Card>
                <Card.Body>
                  {Object.keys(historyItem).map((key, i) => (
                    <span key={i}>
                      {key}: <strong>{historyItem[key]}</strong>&nbsp;
                    </span>
                  ))}
                </Card.Body>
                <Card.Footer>
                  <Button
                    className="float-end"
                    variant="danger"
                    size="sm"
                    onClick={(e) => removeHistoryClicked(e, index)}
                  >
                    &times;
                  </Button>
                </Card.Footer>
              </Card>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
  );
};

export default History;
