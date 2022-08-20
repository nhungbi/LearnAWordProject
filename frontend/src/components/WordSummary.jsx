
import Tooltip from 'react-bootstrap/Tooltip';
import WordCard from './WordCard';

import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

function WordSummary  ({word}) {
    // console.log(word)

    return (

        <div>
            <OverlayTrigger
          trigger="click"
          key="right"
          placement="right"
          overlay={
            <Popover id={`popover-positioned-right`}>
              <Popover.Header as="h3">{word.word}</Popover.Header>
              <Popover.Body>
                <WordCard word = {word} />
              </Popover.Body>
            </Popover>
          }
        >
          <Button variant="secondary">{word.word}</Button>
        </OverlayTrigger>

        </div>
    )


}

export default WordSummary