
import Card from 'react-bootstrap/Card';


function WordCard({word}) {
  return (
    <Card className="text-center word-cards">
      <Card.Header className = 'card-header'>Stems: {word.stems.map((stem, index)=> {
            if (index === word.stems.length -1) {
                return <span>{stem}</span>
            }
            return <span>{stem}, </span>
        })}</Card.Header>
      <Card.Body>
        <Card.Title> {word.speech} - {word.pronounciation} </Card.Title>
        <Card.Text>
          {word.definition}
        </Card.Text>
        <audio className= 'audio-summary' controls src={word.audio}>
        </audio>

      </Card.Body>
      <Card.Footer className="text-muted">Learned on {word.date_learned}</Card.Footer>
    </Card>
  );
}



export default WordCard;